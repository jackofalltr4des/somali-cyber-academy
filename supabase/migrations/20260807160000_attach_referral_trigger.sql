-- The handle_new_user_referral() function has existed since an earlier
-- migration, but no migration ever actually attached it as a trigger on
-- auth.users — meaning it has never run for a single user, ever. No user
-- has a referral_codes row, so referralCode is always null client-side,
-- and the referral link can never generate. This is very likely the
-- entire cause of "the referral link won't generate."
--
-- DROP + CREATE (not CREATE OR REPLACE — triggers don't support that) so
-- this is safe to run even if a differently-named version exists already.
DROP TRIGGER IF EXISTS on_auth_user_created_referral ON auth.users;

CREATE TRIGGER on_auth_user_created_referral
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_referral();

-- Backfill: give every existing user a referral code too, not just future
-- signups — same pattern as the earlier user_roles backfill migration.
INSERT INTO public.referral_codes (user_id, code)
SELECT u.id, substring(md5(random()::text || u.id::text), 1, 8)
FROM auth.users AS u
WHERE NOT EXISTS (
  SELECT 1 FROM public.referral_codes rc WHERE rc.user_id = u.id
)
ON CONFLICT (user_id) DO NOTHING;
