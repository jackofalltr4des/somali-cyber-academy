-- Points ledger: one immutable row per point-earning event. Points are
-- summed from this table (never a single mutable counter), and a unique
-- constraint on (user_id, action_type, reference_slug) makes every action
-- award exactly once, no matter how many times it's retried — the
-- anti-farming requirement from the platform plan doc.
create table points_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  action_type text not null,
  reference_slug text not null,
  points int not null,
  created_at timestamptz not null default now(),
  unique (user_id, action_type, reference_slug)
);

alter table points_ledger enable row level security;

create policy "Users can view their own points"
  on points_ledger for select
  using (auth.uid() = user_id);

-- No insert policy for authenticated users — points are only ever awarded
-- by server functions running as service_role (via learning.functions.ts),
-- never inserted directly by the client. This is the actual anti-cheat
-- enforcement: a technically-savvy user cannot fake points via dev tools
-- because RLS blocks direct inserts entirely.
grant select on points_ledger to authenticated;
grant all on points_ledger to service_role;

-- Username: unique, case-insensitive, 3-20 chars, letters/numbers/underscore
-- only, enforced at the database level (not just in the app). Must exist
-- before the view below, which selects it.
alter table public.profiles add column username text;

alter table public.profiles
  add constraint username_format
  check (username is null or username ~ '^[A-Za-z0-9_]{3,20}$');

create unique index profiles_username_unique_ci
  on public.profiles (lower(username))
  where username is not null;

-- Public leaderboard view: username + total points only (no PII), used by
-- the public /leaderboard page. Tie-break on earliest account creation is
-- handled in the query that reads this, not baked into the view.
create view public_leaderboard as
select
  p.id as user_id,
  p.username,
  coalesce(sum(pl.points), 0) as total_points,
  u.created_at as account_created_at
from public.profiles p
join auth.users u on u.id = p.id
left join points_ledger pl on pl.user_id = p.id
where p.username is not null
group by p.id, p.username, u.created_at;

grant select on public_leaderboard to anon, authenticated;
