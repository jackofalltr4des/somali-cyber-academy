-- Fix: enrollments uses created_at not enrolled_at, and there's no modules table
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
  pay_item_type text;
  pay_item_slug text;
BEGIN
  SELECT user_id, item_type::text, item_slug INTO pay_user_id, pay_item_type, pay_item_slug
  FROM public.payments WHERE id = _payment_id;
  IF pay_user_id IS NULL THEN
    RAISE EXCEPTION 'Payment not found';
  END IF;

  -- Update payment status
  UPDATE public.payments
  SET status = 'approved', reviewed_by = _admin_id, reviewed_at = now(), admin_note = _note
  WHERE id = _payment_id;

  -- Auto-enroll: course -> enroll in that module; exam -> enroll in all 8 modules
  IF pay_item_type = 'course' THEN
    INSERT INTO public.enrollments (user_id, module_slug)
    VALUES (pay_user_id, pay_item_slug)
    ON CONFLICT (user_id, module_slug) DO NOTHING;
  ELSIF pay_item_type = 'exam' THEN
    INSERT INTO public.enrollments (user_id, module_slug)
    VALUES
      (pay_user_id, 'aasaaska-it'),
      (pay_user_id, 'networking'),
      (pay_user_id, 'linux-maamul'),
      (pay_user_id, 'soc-fundamentals'),
      (pay_user_id, 'siem-iyo-log-analysis'),
      (pay_user_id, 'threat-intelligence'),
      (pay_user_id, 'incident-response'),
      (pay_user_id, 'capstone-soc')
    ON CONFLICT (user_id, module_slug) DO NOTHING;
  END IF;

  -- Process referral commission
  UPDATE public.referrals
  SET status = 'earned', earned_at = now()
  WHERE referred_id = pay_user_id AND status = 'pending';
END;
$$;

REVOKE EXECUTE ON FUNCTION public.approve_payment_and_process_referral(uuid, uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.approve_payment_and_process_referral(uuid, uuid, text) TO authenticated, service_role;
