-- Server-side rate limiting for sensitive server functions (submitPayment,
-- submitExam, submitLab, completeLesson, issueCertificate, admin actions).
-- Postgres-backed rather than in-memory, because this app runs on
-- Cloudflare Workers (confirmed via .output/server/wrangler.json) — an
-- inherently multi-instance runtime where in-memory state (like the
-- existing /api/chat limiter) cannot coordinate across isolates. Postgres
-- is the one shared source of truth every instance already talks to.
--
-- Design: one row per (user, action, window). The atomic
-- INSERT ... ON CONFLICT DO UPDATE ... RETURNING below is what makes this
-- correct under concurrency — Postgres serializes concurrent writes to
-- the same conflicting row, so two requests from the same user landing on
-- two different Worker instances at the same instant still count
-- correctly, with no lost updates.
create table public.rate_limit_counters (
  user_id uuid not null references auth.users(id) on delete cascade,
  action text not null,
  window_start timestamptz not null,
  count int not null default 1,
  primary key (user_id, action, window_start)
);

alter table public.rate_limit_counters enable row level security;
-- No policy for authenticated/anon at all — default-deny, same pattern as
-- points_ledger (20260807140000_points_badges_username.sql). Only
-- service_role, via check_rate_limit() below, ever reads or writes this
-- table.
grant all on public.rate_limit_counters to service_role;

-- Returns true if the call is allowed (and atomically counts it), false
-- if the caller is over the limit for this window. Window boundaries are
-- computed from Postgres's own now(), not a caller-supplied timestamp —
-- no client or Worker clock is trusted for rate-limit bucketing.
create or replace function public.check_rate_limit(
  p_user_id uuid,
  p_action text,
  p_window_seconds int,
  p_limit int
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_window_start timestamptz;
  v_count int;
begin
  v_window_start := to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);

  insert into public.rate_limit_counters (user_id, action, window_start, count)
  values (p_user_id, p_action, v_window_start, 1)
  on conflict (user_id, action, window_start)
  do update set count = rate_limit_counters.count + 1
  returning count into v_count;

  return v_count <= p_limit;
end;
$$;

-- Only server functions (via supabaseAdmin, service role) may call this —
-- never the client directly. p_user_id always comes from the
-- server-verified JWT subject (context.userId in requireSupabaseAuth),
-- never client-supplied input, so there is no way to spoof another
-- user's rate-limit identity even if this were reachable from the
-- client, which it isn't.
revoke all on function public.check_rate_limit(uuid, text, int, int) from public, anon, authenticated;
grant execute on function public.check_rate_limit(uuid, text, int, int) to service_role;
