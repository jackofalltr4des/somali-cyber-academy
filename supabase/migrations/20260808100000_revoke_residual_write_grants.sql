-- Closes two residual gaps found during the post-hardening production
-- readiness audit (Findings A & B). Both are currently inert (no RLS
-- policy exists for these commands on either table, so RLS already
-- default-denies them) — this is defense-in-depth, matching the pattern
-- already applied to every other sensitive table in
-- 20260807170000_lock_down_client_writes.sql /
-- 20260807190000_lock_down_client_writes_hardened.sql, neither of which
-- happened to touch these two grants.
--
-- Finding A: payments and referrals still had UPDATE granted to
-- authenticated. No UPDATE policy exists for a regular user on either
-- table (only the admin-gated payments_admin_update /
-- referrals_admin_update policies do), so this was not exploitable by a
-- regular user — but it meant an already-admin account could UPDATE
-- these tables directly from their own browser session, bypassing the
-- audited approve_payment_and_process_referral() RPC and
-- adminReferralAction's service-role path entirely. The app itself never
-- issues an authenticated-role UPDATE on either table (confirmed by
-- reading payments.functions.ts — adminPaymentAction/adminReferralAction
-- both use supabaseAdmin), so revoking this has zero effect on any
-- working feature.
REVOKE UPDATE ON public.payments FROM authenticated;
REVOKE UPDATE ON public.referrals FROM authenticated;

-- Finding B: role_change_audit (created in
-- 20260807180000_role_escalation_guard.sql) was only ever explicitly
-- GRANTed SELECT to authenticated — INSERT/UPDATE/DELETE were left at
-- whatever the project's default privileges were, unlike every other
-- table touched by that migration. The table is written exclusively by
-- adminUpdateRole() via supabaseAdmin (service role), so authenticated
-- never needs write access. Revoking it closes an audit-log-tampering
-- path that would otherwise open the moment anyone ever added a
-- permissive policy without separately checking the grant.
REVOKE INSERT, UPDATE, DELETE ON public.role_change_audit FROM authenticated;
