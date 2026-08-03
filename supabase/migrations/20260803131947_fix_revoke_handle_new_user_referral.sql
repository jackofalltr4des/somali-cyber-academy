-- Revoke execute from handle_new_user_referral for anon and authenticated
-- This is a trigger function that should only be called by the trigger, not via RPC
REVOKE EXECUTE ON FUNCTION public.handle_new_user_referral() FROM anon, authenticated;
