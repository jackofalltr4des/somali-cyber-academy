-- Fix RLS: Split FOR ALL policies into separate CRUD policies
-- This prevents users from DELETE/UPDATE on tables that should be insert-once or admin-only

-- 1. enrollments: drop FOR ALL, add separate SELECT/INSERT only (no self-UPDATE, no self-DELETE)
DROP POLICY IF EXISTS enrollments_own ON public.enrollments;
CREATE POLICY "enrollments_admin_delete" ON public.enrollments
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "enrollments_select_own" ON public.enrollments
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "enrollments_insert_own" ON public.enrollments
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- 2. lab_submissions: drop FOR ALL, add separate SELECT/INSERT only
DROP POLICY IF EXISTS lab_submissions_own ON public.lab_submissions;
CREATE POLICY "lab_submissions_admin_delete" ON public.lab_submissions
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "lab_submissions_select_own" ON public.lab_submissions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "lab_submissions_insert_own" ON public.lab_submissions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- 3. lesson_progress: drop FOR ALL, add separate SELECT/INSERT/UPDATE
DROP POLICY IF EXISTS lesson_progress_own ON public.lesson_progress;
CREATE POLICY "lesson_progress_admin_delete" ON public.lesson_progress
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "lesson_progress_select_own" ON public.lesson_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "lesson_progress_insert_own" ON public.lesson_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "lesson_progress_update_own" ON public.lesson_progress
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 4. certificates: add admin DELETE
DROP POLICY IF EXISTS certificates_admin_delete ON public.certificates;
CREATE POLICY "certificates_admin_delete" ON public.certificates
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- 5. user_roles: add admin INSERT/UPDATE/DELETE
DROP POLICY IF EXISTS user_roles_admin_insert ON public.user_roles;
CREATE POLICY "user_roles_admin_insert" ON public.user_roles
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
DROP POLICY IF EXISTS user_roles_admin_update ON public.user_roles;
CREATE POLICY "user_roles_admin_update" ON public.user_roles
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
DROP POLICY IF EXISTS user_roles_admin_delete ON public.user_roles;
CREATE POLICY "user_roles_admin_delete" ON public.user_roles
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- 6. referral_codes: add INSERT own
DROP POLICY IF EXISTS referral_codes_insert_own ON public.referral_codes;
CREATE POLICY "referral_codes_insert_own" ON public.referral_codes
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
