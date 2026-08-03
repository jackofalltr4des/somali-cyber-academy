-- Fix 1: Revoke anon execute from handle_new_user_referral
REVOKE EXECUTE ON FUNCTION public.handle_new_user_referral() FROM anon;

-- Fix 2: Revoke authenticated execute from approve_payment_and_process_referral
-- (Only service_role should call it; admin server fn uses service role)
REVOKE EXECUTE ON FUNCTION public.approve_payment_and_process_referral(uuid, uuid, text) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.approve_payment_and_process_referral(uuid, uuid, text) TO service_role;

-- Fix 3: Revoke authenticated execute from has_role
-- (Only service_role should call it; admin checks use service role)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
