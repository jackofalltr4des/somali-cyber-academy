-- Phase 1 security hardening: the database becomes the final authority.
--
-- Vulnerability: certificates, payments, enrollments, lesson_progress,
-- lab_submissions, exam_attempts, and referrals all had an "insert own"
-- (and, for lesson_progress, an "update own") RLS policy that only
-- checked auth.uid() = user_id / referred_id. None of them validated the
-- payload's business meaning, so any authenticated browser could forge a
-- passing exam attempt, a paid certificate, an "approved" payment, a
-- passing lab, or an earned referral commission directly via
-- supabase.from(...).insert(...) in devtools — completely bypassing the
-- score/eligibility recomputation the server functions perform.
--
-- Fix: remove every authenticated INSERT/UPDATE policy on these tables
-- and revoke the matching table-level grants, so RLS denies ALL direct
-- client writes. This matches the points_ledger pattern already in the
-- codebase (see 20260807140000_points_badges_username.sql): the only way
-- in is now the service-role client used inside server functions, which
-- perform the real validation. Reads (select own / admin select-all /
-- public certificate verification) are unaffected. service_role keeps
-- full access via the existing "GRANT ALL ... TO service_role" grants.

-- certificates
DROP POLICY IF EXISTS "certificates_insert_own" ON public.certificates;
REVOKE INSERT ON public.certificates FROM authenticated;

-- payments
DROP POLICY IF EXISTS "payments_insert_own" ON public.payments;
REVOKE INSERT ON public.payments FROM authenticated;

-- enrollments
DROP POLICY IF EXISTS "enrollments_insert_own" ON public.enrollments;
REVOKE INSERT ON public.enrollments FROM authenticated;

-- lesson_progress
DROP POLICY IF EXISTS "lesson_progress_insert_own" ON public.lesson_progress;
DROP POLICY IF EXISTS "lesson_progress_update_own" ON public.lesson_progress;
REVOKE INSERT, UPDATE ON public.lesson_progress FROM authenticated;

-- lab_submissions
DROP POLICY IF EXISTS "lab_submissions_insert_own" ON public.lab_submissions;
REVOKE INSERT, UPDATE ON public.lab_submissions FROM authenticated;

-- exam_attempts — same forgery pattern; feeds certificate eligibility
-- directly, so a forged row here is a direct certificate forgery.
DROP POLICY IF EXISTS "Users can insert their own exam attempts" ON public.exam_attempts;
REVOKE INSERT ON public.exam_attempts FROM authenticated;

-- referrals — same forgery pattern; a forged row could self-assign a
-- referrer or set status directly.
DROP POLICY IF EXISTS "referrals_insert_own" ON public.referrals;
REVOKE INSERT ON public.referrals FROM authenticated;
