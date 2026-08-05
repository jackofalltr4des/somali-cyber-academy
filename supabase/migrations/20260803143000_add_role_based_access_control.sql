-- Add RBAC roles and tighten admin-level RLS policies

  
-- Attach a default student role to every new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)))
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Super admin should inherit admin-level access for all RLS policies that previously depended on admin

-- 1. user_roles
DROP POLICY IF EXISTS user_roles_admin_select_all ON public.user_roles;
CREATE POLICY "user_roles_admin_select_all" ON public.user_roles
  FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

DROP POLICY IF EXISTS user_roles_admin_insert ON public.user_roles;
CREATE POLICY "user_roles_admin_insert" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

DROP POLICY IF EXISTS user_roles_admin_update ON public.user_roles;
CREATE POLICY "user_roles_admin_update" ON public.user_roles
  FOR UPDATE TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  )
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

DROP POLICY IF EXISTS user_roles_admin_delete ON public.user_roles;
CREATE POLICY "user_roles_admin_delete" ON public.user_roles
  FOR DELETE TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

-- 2. certificates
DROP POLICY IF EXISTS certificates_admin_select_all ON public.certificates;
CREATE POLICY "certificates_admin_select_all" ON public.certificates
  FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

DROP POLICY IF EXISTS certificates_admin_delete ON public.certificates;
CREATE POLICY "certificates_admin_delete" ON public.certificates
  FOR DELETE TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

-- 3. profiles
DROP POLICY IF EXISTS profiles_admin_select_all ON public.profiles;
CREATE POLICY "profiles_admin_select_all" ON public.profiles
  FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

-- 4. enrollments
DROP POLICY IF EXISTS enrollments_admin_select_all ON public.enrollments;
CREATE POLICY "enrollments_admin_select_all" ON public.enrollments
  FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

DROP POLICY IF EXISTS enrollments_admin_delete ON public.enrollments;
CREATE POLICY "enrollments_admin_delete" ON public.enrollments
  FOR DELETE TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

-- 5. lesson_progress
DROP POLICY IF EXISTS lesson_progress_admin_select_all ON public.lesson_progress;
CREATE POLICY "lesson_progress_admin_select_all" ON public.lesson_progress
  FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

DROP POLICY IF EXISTS lesson_progress_admin_delete ON public.lesson_progress;
CREATE POLICY "lesson_progress_admin_delete" ON public.lesson_progress
  FOR DELETE TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

-- 6. lab_submissions
DROP POLICY IF EXISTS lab_submissions_admin_select_all ON public.lab_submissions;
CREATE POLICY "lab_submissions_admin_select_all" ON public.lab_submissions
  FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

DROP POLICY IF EXISTS lab_submissions_admin_delete ON public.lab_submissions;
CREATE POLICY "lab_submissions_admin_delete" ON public.lab_submissions
  FOR DELETE TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

-- 7. payments
DROP POLICY IF EXISTS payments_admin_select_all ON public.payments;
CREATE POLICY "payments_admin_select_all" ON public.payments
  FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

DROP POLICY IF EXISTS payments_admin_update ON public.payments;
CREATE POLICY "payments_admin_update" ON public.payments
  FOR UPDATE TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  )
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

-- 8. referrals
DROP POLICY IF EXISTS referrals_admin_select_all ON public.referrals;
CREATE POLICY "referrals_admin_select_all" ON public.referrals
  FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

DROP POLICY IF EXISTS referrals_admin_update ON public.referrals;
CREATE POLICY "referrals_admin_update" ON public.referrals
  FOR UPDATE TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  )
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  );

-- 9. payment proof storage
DROP POLICY IF EXISTS payment_proofs_admin_read_all ON storage.objects;
CREATE POLICY "payment_proofs_admin_read_all" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'payment-proofs'
    AND (
      public.has_role(auth.uid(), 'admin')
      OR public.has_role(auth.uid(), 'super_admin')
    )
  );
