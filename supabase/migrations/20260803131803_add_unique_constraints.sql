-- Add unique constraint on certificates (user_id, track) to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS certificates_user_track_unique
  ON public.certificates (user_id, track);

-- Add unique constraint on enrollments (user_id, module_slug) to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS enrollments_user_module_unique
  ON public.enrollments (user_id, module_slug);

-- Add unique constraint on lesson_progress (user_id, module_slug, lesson_slug)
CREATE UNIQUE INDEX IF NOT EXISTS lesson_progress_user_lesson_unique
  ON public.lesson_progress (user_id, module_slug, lesson_slug);

-- Add unique constraint on referrals (referred_id) — one referral per student
CREATE UNIQUE INDEX IF NOT EXISTS referrals_referred_unique
  ON public.referrals (referred_id);

-- Add unique constraint on referral_codes (user_id) — one code per user
CREATE UNIQUE INDEX IF NOT EXISTS referral_codes_user_unique
  ON public.referral_codes (user_id);
