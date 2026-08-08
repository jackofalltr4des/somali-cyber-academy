-- Follow-up to 20260807170000_lock_down_client_writes.sql: that migration
-- targeted policy names (*_insert_own, *_update_own) that don't match what
-- was actually created for enrollments, lesson_progress, and
-- lab_submissions in the original schema migration — those three tables
-- use a single FOR ALL policy named *_own instead. DROP POLICY IF EXISTS
-- is a silent no-op on a name mismatch, so if that's what happened here,
-- those three tables' original permissive policies are still active.
--
-- This migration is safe to run regardless of which naming turned out to
-- be correct: it drops every plausible policy name variant (a no-op for
-- ones that don't exist) and explicitly revokes DELETE too, which the
-- original migration didn't touch on any of the three tables even though
-- their original GRANT statements included it.

-- enrollments
DROP POLICY IF EXISTS "enrollments_own" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_insert_own" ON public.enrollments;
REVOKE INSERT, UPDATE, DELETE ON public.enrollments FROM authenticated;

-- lesson_progress
DROP POLICY IF EXISTS "lesson_progress_own" ON public.lesson_progress;
DROP POLICY IF EXISTS "lesson_progress_insert_own" ON public.lesson_progress;
DROP POLICY IF EXISTS "lesson_progress_update_own" ON public.lesson_progress;
REVOKE INSERT, UPDATE, DELETE ON public.lesson_progress FROM authenticated;

-- lab_submissions
DROP POLICY IF EXISTS "lab_submissions_own" ON public.lab_submissions;
DROP POLICY IF EXISTS "lab_submissions_insert_own" ON public.lab_submissions;
REVOKE INSERT, UPDATE, DELETE ON public.lab_submissions FROM authenticated;

-- Belt-and-suspenders: re-affirm DELETE is closed on the tables the prior
-- migration did name correctly, in case a DELETE grant/policy exists on
-- any of them that wasn't part of what I've seen.
REVOKE DELETE ON public.certificates FROM authenticated;
REVOKE DELETE ON public.exam_attempts FROM authenticated;
REVOKE DELETE ON public.payments FROM authenticated;
REVOKE DELETE ON public.referrals FROM authenticated;
