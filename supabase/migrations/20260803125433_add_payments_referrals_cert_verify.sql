/*
# Add payments, referrals, and certificate verification

## Overview
1. Payment system for course access (Zaad/eDahab mobile money)
2. Affiliate/referral system with $2 commission per paid student
3. Certificate verification (public lookup by certificate ID)

## New Tables
- payments: student payments (item_type, provider, amount, status, proof)
- referrals: referrer->referred relationships with commission tracking
- referral_codes: unique 8-char code per student

## Security
- RLS on all new tables, students see own data, admins see all
- Certificate verification is public (anon can SELECT by ID)
- Storage bucket payment-proofs (private) with upload/read policies
*/

-- =========================================================
-- 1. ENUMS
-- =========================================================

DO $$ BEGIN
  CREATE TYPE public.payment_item_type AS ENUM ('course', 'exam', 'certificate');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.payment_provider AS ENUM ('zaad', 'edahab');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.payment_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.referral_status AS ENUM ('pending', 'earned', 'paid');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- =========================================================
-- 2. PAYMENTS TABLE
-- =========================================================

CREATE TABLE IF NOT EXISTS public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type public.payment_item_type NOT NULL,
  item_slug text NOT NULL,
  amount_usd numeric(10,2) NOT NULL,
  provider public.payment_provider NOT NULL,
  phone text,
  transaction_id text NOT NULL,
  proof_url text,
  status public.payment_status NOT NULL DEFAULT 'pending',
  admin_note text,
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;

DROP POLICY IF EXISTS "payments_select_own" ON public.payments;
CREATE POLICY "payments_select_own" ON public.payments
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "payments_insert_own" ON public.payments;
CREATE POLICY "payments_insert_own" ON public.payments
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "payments_admin_select_all" ON public.payments;
CREATE POLICY "payments_admin_select_all" ON public.payments
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "payments_admin_update" ON public.payments;
CREATE POLICY "payments_admin_update" ON public.payments
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- 3. REFERRAL CODES TABLE
-- =========================================================

CREATE TABLE IF NOT EXISTS public.referral_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  code text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.referral_codes TO authenticated;
GRANT ALL ON public.referral_codes TO service_role;

DROP POLICY IF EXISTS "referral_codes_select_own" ON public.referral_codes;
CREATE POLICY "referral_codes_select_own" ON public.referral_codes
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "referral_codes_admin_select_all" ON public.referral_codes;
CREATE POLICY "referral_codes_admin_select_all" ON public.referral_codes
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- 4. REFERRALS TABLE
-- =========================================================

CREATE TABLE IF NOT EXISTS public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code text NOT NULL,
  commission_usd numeric(10,2) NOT NULL DEFAULT 2.00,
  status public.referral_status NOT NULL DEFAULT 'pending',
  earned_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT ON public.referrals TO authenticated;
GRANT ALL ON public.referrals TO service_role;

DROP POLICY IF EXISTS "referrals_select_as_referrer" ON public.referrals;
CREATE POLICY "referrals_select_as_referrer" ON public.referrals
  FOR SELECT TO authenticated USING (auth.uid() = referrer_id);

DROP POLICY IF EXISTS "referrals_select_as_referred" ON public.referrals;
CREATE POLICY "referrals_select_as_referred" ON public.referrals
  FOR SELECT TO authenticated USING (auth.uid() = referred_id);

DROP POLICY IF EXISTS "referrals_insert_own" ON public.referrals;
CREATE POLICY "referrals_insert_own" ON public.referrals
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = referred_id);

DROP POLICY IF EXISTS "referrals_admin_select_all" ON public.referrals;
CREATE POLICY "referrals_admin_select_all" ON public.referrals
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "referrals_admin_update" ON public.referrals;
CREATE POLICY "referrals_admin_update" ON public.referrals
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- 5. CERTIFICATE VERIFICATION (public read by ID)
-- =========================================================

DROP POLICY IF EXISTS "certificates_public_verify" ON public.certificates;
CREATE POLICY "certificates_public_verify" ON public.certificates
  FOR SELECT TO anon, authenticated USING (true);

-- =========================================================
-- 6. STORAGE BUCKET for payment proofs
-- =========================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', false)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "payment_proofs_upload_own" ON storage.objects;
CREATE POLICY "payment_proofs_upload_own" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'payment-proofs' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "payment_proofs_read_own" ON storage.objects;
CREATE POLICY "payment_proofs_read_own" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'payment-proofs' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "payment_proofs_admin_read_all" ON storage.objects;
CREATE POLICY "payment_proofs_admin_read_all" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'payment-proofs' AND public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- 7. FUNCTION: auto-generate referral code on signup
-- =========================================================

CREATE OR REPLACE FUNCTION public.handle_new_user_referral()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_code text;
BEGIN
  new_code := substring(md5(random()::text || NEW.id::text), 1, 8);
  INSERT INTO public.referral_codes (user_id, code)
  VALUES (NEW.id, new_code)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_referral ON auth.users;
CREATE TRIGGER on_auth_user_created_referral
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_referral();

-- =========================================================
-- 8. FUNCTION: approve payment and process referral
-- =========================================================

CREATE OR REPLACE FUNCTION public.approve_payment_and_process_referral(
  _payment_id uuid,
  _admin_id uuid,
  _note text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  pay_user_id uuid;
BEGIN
  SELECT user_id INTO pay_user_id FROM public.payments WHERE id = _payment_id;
  IF pay_user_id IS NULL THEN
    RAISE EXCEPTION 'Payment not found';
  END IF;

  UPDATE public.payments
  SET status = 'approved', reviewed_by = _admin_id, reviewed_at = now(), admin_note = _note
  WHERE id = _payment_id;

  UPDATE public.referrals
  SET status = 'earned', earned_at = now()
  WHERE referred_id = pay_user_id AND status = 'pending';
END;
$$;

REVOKE EXECUTE ON FUNCTION public.approve_payment_and_process_referral(uuid, uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.approve_payment_and_process_referral(uuid, uuid, text) TO authenticated, service_role;
