/**
 * Server-side rate limiting, backed by the check_rate_limit() Postgres
 * function (20260808120000_rate_limit_counters.sql). Postgres-backed
 * rather than in-memory because this app runs on Cloudflare Workers — an
 * inherently multi-instance runtime where in-memory counters (like the
 * existing /api/chat limiter) can't coordinate across isolates. Postgres
 * is the one shared source of truth every instance already talks to, and
 * the underlying INSERT ... ON CONFLICT DO UPDATE is atomic, so
 * concurrent requests from the same user landing on different instances
 * still count correctly.
 *
 * Centralized limits: one entry per protected action, so limits are easy
 * to audit/tune in one place instead of hunting through each server
 * function.
 */
export const RATE_LIMITS = {
  submitPayment: { windowSeconds: 10 * 60, limit: 5 },
  submitExam: { windowSeconds: 60 * 60, limit: 3 },
  submitLab: { windowSeconds: 15 * 60, limit: 10 },
  completeLesson: { windowSeconds: 5 * 60, limit: 20 },
  issueCertificate: { windowSeconds: 10 * 60, limit: 10 },
  adminAction: { windowSeconds: 5 * 60, limit: 30 },
} as const;

export type RateLimitAction = keyof typeof RATE_LIMITS;

/**
 * Checks and atomically increments the caller's rate-limit counter for
 * `action` (optionally scoped further, e.g. by exam path or lab slug, via
 * `scope`). `userId` must always be the server-verified subject from
 * requireSupabaseAuth's JWT check — never a client-supplied value — so
 * there is no request field that can be changed to evade this.
 *
 * Throws a friendly, localized error on rejection. Never surfaces the
 * underlying Postgres/RPC error message to the caller: on an unexpected
 * RPC error (not a normal "over limit" result), this fails OPEN — logs
 * server-side and allows the request through. Rate limiting here is a
 * defense-in-depth abuse control, not the primary security boundary
 * (entitlement checks, server-side grading, and RLS are unaffected
 * either way) — a transient rate-limiter issue should not be able to
 * block a legitimate payment or exam submission.
 */
export async function enforceRateLimit(
  userId: string,
  action: RateLimitAction,
  scope?: string,
): Promise<void> {
  const { windowSeconds, limit } = RATE_LIMITS[action];
  const key = scope ? `${action}:${scope}` : action;

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.rpc("check_rate_limit", {
    p_user_id: userId,
    p_action: key,
    p_window_seconds: windowSeconds,
    p_limit: limit,
  });

  if (error) {
    console.error("[rate-limit]", error);
    return;
  }

  if (!data) {
    throw new Error("Waad soo dirtay codsi badan oo dhow. Fadlan sug in yar kadib isku day.");
  }
}
