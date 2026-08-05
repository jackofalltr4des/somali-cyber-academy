-- Backfill missing user_roles records for existing authenticated users

INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'student'
FROM auth.users AS u
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_roles ur WHERE ur.user_id = u.id
)
ON CONFLICT (user_id, role) DO NOTHING;
