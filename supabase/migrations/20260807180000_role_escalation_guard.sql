-- Phase 4 security hardening: close the admin -> super_admin
-- privilege-escalation hole (C4).
--
-- Vulnerability: user_roles_admin_insert (and the matching update/delete
-- policies) allowed anyone with 'admin' OR 'super_admin' to write ANY row
-- to user_roles, including {user_id: self, role: 'super_admin'}. Because
-- this was enforced only by "does the caller have some admin-tier role",
-- not "which role is being granted, and to whom", a plain admin could
-- self-promote to super_admin directly from the browser — completely
-- bypassing adminUpdateRole()'s application-layer logic (which had the
-- identical gap and is fixed separately in payments.functions.ts).
--
-- Fix: remove direct client writes to user_roles entirely (same pattern as
-- Phase 1 / points_ledger) and route every role change through
-- adminUpdateRole(), which now enforces: only a super_admin may grant or
-- revoke admin/super_admin tier roles, and no one may change their own
-- role. Reads (select own / admin select-all) are unaffected.

DROP POLICY IF EXISTS "user_roles_admin_insert" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_admin_update" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_admin_delete" ON public.user_roles;
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM authenticated;

-- Audit trail for role changes, written exclusively by adminUpdateRole()
-- via the service-role client — same no-direct-insert pattern as
-- points_ledger. Kept separate from user_roles' own rows because a revoke
-- deletes the user_roles row but must not erase the fact that it happened.
CREATE TABLE public.role_change_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  action text NOT NULL CHECK (action IN ('grant', 'revoke')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.role_change_audit ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.role_change_audit TO authenticated;
GRANT ALL ON public.role_change_audit TO service_role;

CREATE POLICY "role_change_audit_super_admin_select" ON public.role_change_audit
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'super_admin'::app_role));
