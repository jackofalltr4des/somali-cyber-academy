-- Adds the +20 points-per-referral award (platform plan doc) to the same
-- function that already marks a referral 'earned' on payment approval.
-- Uses RETURNING to capture exactly which referral rows just transitioned
-- to 'earned', then awards points to each referrer for those rows —
-- ON CONFLICT DO NOTHING makes it idempotent even if this ever ran twice.

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

  UPDATE public.payments
  SET status = 'approved', reviewed_by = _admin_id, reviewed_at = now(), admin_note = _note
  WHERE id = _payment_id;

  IF pay_item_type = 'course' THEN
    INSERT INTO public.enrollments (user_id, module_slug)
    SELECT pay_user_id, slug
    FROM unnest(
      CASE pay_item_slug
        WHEN 'soc-analyst' THEN ARRAY[
          'it-computer-fundamentals',
          'networking-security-fundamentals',
          'linux-for-soc',
          'windows-active-directory-soc',
          'threats-malware-social-engineering',
          'soc-operations-alert-triage',
          'siem-log-analysis-detection',
          'threat-intelligence-attck',
          'incident-response-forensics',
          'capstone-career-readiness'
        ]
        WHEN 'ethical-hacking' THEN ARRAY[
          'offensive-security-fundamentals',
          'reconnaissance-osint',
          'nmap-network-scanning',
          'web-application-security',
          'owasp-top-10',
          'burp-suite',
          'vulnerability-assessment',
          'penetration-testing-basics'
        ]
        WHEN 'digital-forensics' THEN ARRAY[
          'digital-forensics-fundamentals',
          'evidence-collection-chain-of-custody',
          'disk-forensics-file-systems',
          'windows-forensic-artifacts-deep-dive',
          'memory-forensics',
          'network-forensics',
          'linux-macos-forensics',
          'mobile-device-forensics',
          'malware-analysis-anti-forensics',
          'forensic-reporting-testimony-capstone'
        ]
        WHEN 'cloud-security' THEN ARRAY[
          'cloud-security-fundamentals',
          'cloud-identity-access-management',
          'cloud-network-security',
          'cloud-storage-data-security',
          'cloud-compute-security',
          'cloud-threats-attack-vectors',
          'cloud-monitoring-logging',
          'cloud-compliance-governance',
          'cloud-incident-response',
          'cloud-security-capstone-career'
        ]
        ELSE ARRAY[]::text[]
      END
    ) AS slug
    ON CONFLICT (user_id, module_slug) DO NOTHING;
  END IF;
  -- 'exam' purchases: no enrollment action needed. Exam access is gated
  -- directly against payments (item_type='exam', item_slug=path_slug,
  -- status='approved') in exam.$pathSlug.tsx.

  -- Mark pending referrals as earned, and award the referrer +20 points
  -- for each one that just transitioned (platform plan doc: "Successful
  -- referral (paid signup): 20 points, on top of the $3 cash payout").
  WITH updated_referrals AS (
    UPDATE public.referrals
    SET status = 'earned', earned_at = now()
    WHERE referred_id = pay_user_id AND status = 'pending'
    RETURNING id, referrer_id
  )
  INSERT INTO public.points_ledger (user_id, action_type, reference_slug, points)
  SELECT referrer_id, 'referral_earned', id::text, 20
  FROM updated_referrals
  ON CONFLICT (user_id, action_type, reference_slug) DO NOTHING;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.approve_payment_and_process_referral(uuid, uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.approve_payment_and_process_referral(uuid, uuid, text) TO service_role;
