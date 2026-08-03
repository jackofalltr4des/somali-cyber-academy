-- Drop and recreate handle_new_user_referral with minimal grants
DROP FUNCTION IF EXISTS public.handle_new_user_referral() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user_referral()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
new_code text;
BEGIN
new_code := substring(md5(random()::text || NEW.id::text), 1, 8);
INSERT INTO public.referral_codes (user_id, code)
VALUES (NEW.id, new_code)
ON CONFLICT (user_id) DO NOTHING;
RETURN NEW;
END;
$function$;

-- Only service_role should be able to execute (trigger runs as definer)
REVOKE EXECUTE ON FUNCTION public.handle_new_user_referral() FROM PUBLIC, anon, authenticated;
-- No grant needed - trigger fires as SECURITY DEFINER regardless
