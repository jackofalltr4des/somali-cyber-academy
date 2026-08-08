-- Prevents two simultaneously-active payment claims (pending or approved)
-- from citing the identical transaction_id for the same provider — closes
-- the transaction-ID-reuse gap found in the post-hardening production
-- readiness audit. Scoped to (provider, transaction_id) rather than
-- transaction_id alone, since Zaad and eDahab generate transaction IDs
-- independently and an unscoped constraint risks a false-positive
-- collision between two genuinely different real payments from different
-- providers.
--
-- Deliberately a PARTIAL index (WHERE status IN ('pending','approved')),
-- not a full uniqueness constraint: submitPayment's existing duplicate
-- check already only blocks resubmission while a prior claim for the same
-- item is 'pending' — a user can already resubmit after an admin rejects
-- a claim. Excluding 'rejected' rows from this index extends that same,
-- already-established behavior to transaction_id instead of introducing
-- new behavior: a transaction_id becomes reusable again the instant a
-- claim citing it is rejected.
--
-- Verified before writing this migration: zero existing rows in
-- payments (fresh check), so this applies with zero possibility of a
-- conflict against existing data.
CREATE UNIQUE INDEX payments_active_txid_unique
  ON public.payments (provider, transaction_id)
  WHERE status IN ('pending', 'approved');
