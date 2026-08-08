import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { PRICING, type PaymentItemType, type PaymentProviderId } from "./pricing";
import { requireAdmin, canManageRole } from "@/lib/admin-auth";
import { enforceRateLimit } from "@/lib/rate-limit";

const PaymentInput = z.object({
  itemType: z.enum(["course", "exam", "certificate"]),
  itemSlug: z.string().min(1).max(80),
  provider: z.enum(["zaad", "edahab"]),
  phone: z.string().max(20).optional(),
  transactionId: z.string().min(3).max(60),
  proofUrl: z.string().max(500).optional(),
});

const ReferralInput = z.object({
  referralCode: z.string().min(4).max(20),
});

const AdminPaymentActionInput = z.object({
  paymentId: z.string().uuid(),
  action: z.enum(["approve", "reject"]),
  note: z.string().max(500).optional(),
});

const AdminReferralActionInput = z.object({
  referralId: z.string().uuid(),
  action: z.enum(["mark_paid"]),
});

const AdminRoleInput = z.object({
  userId: z.string().uuid(),
  role: z.enum(["admin", "student", "super_admin"]),
  action: z.enum(["grant", "revoke"]).default("grant"),
});

export const getPaymentsAndReferrals = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [payments, referralsAsReferrer, referralCode] = await Promise.all([
      supabase
        .from("payments")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
      supabase
        .from("referrals")
        .select("*")
        .eq("referrer_id", userId)
        .order("created_at", { ascending: false }),
      supabase.from("referral_codes").select("code").eq("user_id", userId).maybeSingle(),
    ]);

    const err = payments.error ?? referralsAsReferrer.error ?? referralCode.error;
    if (err) throw new Error(err.message);

    return {
      payments: payments.data ?? [],
      referrals: referralsAsReferrer.data ?? [],
      referralCode: referralCode.data?.code ?? null,
    };
  });

export const submitPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => PaymentInput.parse(d))
  .handler(async ({ data, context }) => {
    await enforceRateLimit(context.userId, "submitPayment");

    const amount = PRICING[data.itemType];
    if (!amount) throw new Error("Invalid item type");

    // Check for duplicate pending payment for the same item
    const { data: existing } = await context.supabase
      .from("payments")
      .select("id")
      .eq("user_id", context.userId)
      .eq("item_type", data.itemType)
      .eq("item_slug", data.itemSlug)
      .eq("status", "pending")
      .maybeSingle();
    if (existing)
      throw new Error("Sugitaan lacag-bixin aad hadda jirta item-kan. Fadlan sug xaqiijinta.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("payments").insert({
      user_id: context.userId,
      item_type: data.itemType,
      item_slug: data.itemSlug,
      amount_usd: amount,
      provider: data.provider,
      phone: data.phone ?? null,
      transaction_id: data.transactionId,
      proof_url: data.proofUrl ?? null,
      status: "pending",
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const submitReferral = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ReferralInput.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: codeRow } = await supabase
      .from("referral_codes")
      .select("user_id, code")
      .eq("code", data.referralCode)
      .maybeSingle();

    if (!codeRow) throw new Error("Referral code not found");
    if (codeRow.user_id === userId) throw new Error("Cannot refer yourself");

    const existing = await supabase
      .from("referrals")
      .select("id")
      .eq("referred_id", userId)
      .maybeSingle();
    if (existing.data) return { ok: true, already: true };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("referrals").insert({
      referrer_id: codeRow.user_id,
      referred_id: userId,
      referral_code: data.referralCode,
      status: "pending",
    });
    if (error) throw new Error(error.message);
    return { ok: true, already: false };
  });

// Same stopgap as ADMIN_LIST_LIMIT in learning.functions.ts — no
// pagination UI exists yet (M4), so every admin listing query is capped
// and ordered by recency rather than returning an unbounded result set.
const ADMIN_LIST_LIMIT = 500;

export const getAdminData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await requireAdmin(supabase, userId);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [payments, referrals, profiles, certs, progress, labs] = await Promise.all([
      supabaseAdmin
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(ADMIN_LIST_LIMIT),
      supabaseAdmin
        .from("referrals")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(ADMIN_LIST_LIMIT),
      supabaseAdmin
        .from("profiles")
        .select("id, display_name, city, goal, weekly_hours, created_at")
        .order("created_at", { ascending: false })
        .limit(ADMIN_LIST_LIMIT),
      supabaseAdmin
        .from("certificates")
        .select("*")
        .order("issued_at", { ascending: false })
        .limit(ADMIN_LIST_LIMIT),
      supabaseAdmin
        .from("lesson_progress")
        .select("user_id, module_slug, lesson_slug, quiz_score, quiz_total, completed_at")
        .order("completed_at", { ascending: false })
        .limit(ADMIN_LIST_LIMIT),
      supabaseAdmin
        .from("lab_submissions")
        .select("user_id, lab_slug, score, total, passed, created_at")
        .order("created_at", { ascending: false })
        .limit(ADMIN_LIST_LIMIT),
    ]);

    const err =
      payments.error ??
      referrals.error ??
      profiles.error ??
      certs.error ??
      progress.error ??
      labs.error;
    if (err) throw new Error(err.message);

    return {
      payments: payments.data ?? [],
      referrals: referrals.data ?? [],
      students: profiles.data ?? [],
      certificates: certs.data ?? [],
      progress: progress.data ?? [],
      labs: labs.data ?? [],
    };
  });

export const adminPaymentAction = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => AdminPaymentActionInput.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await enforceRateLimit(userId, "adminAction");
    await requireAdmin(supabase, userId);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    if (data.action === "approve") {
      const { error } = await supabaseAdmin.rpc("approve_payment_and_process_referral", {
        _payment_id: data.paymentId,
        _admin_id: userId,
        ...(data.note !== undefined ? { _note: data.note } : {}),
      });
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin
        .from("payments")
        .update({
          status: "rejected",
          reviewed_by: userId,
          reviewed_at: new Date().toISOString(),
          admin_note: data.note ?? null,
        })
        .eq("id", data.paymentId);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const adminReferralAction = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => AdminReferralActionInput.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await enforceRateLimit(userId, "adminAction");
    await requireAdmin(supabase, userId);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("referrals")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("id", data.referralId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminUpdateRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => AdminRoleInput.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await enforceRateLimit(userId, "adminAction");
    const callerRoles = await requireAdmin(supabase, userId);

    // C4: see canManageRole (unit-tested in admin-auth.test.ts) — no one
    // can change their own role, and only a super_admin can grant/revoke
    // admin or super_admin tier roles.
    const decision = canManageRole(callerRoles, userId, data.userId, data.role);
    if (!decision.allowed) throw new Error(decision.reason);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const existing = await supabaseAdmin
      .from("user_roles")
      .select("id")
      .eq("user_id", data.userId)
      .eq("role", data.role)
      .maybeSingle();

    if (data.action === "revoke") {
      if (!existing.data) return { ok: true, already: true };
      const { error } = await supabaseAdmin.from("user_roles").delete().eq("id", existing.data.id);
      if (error) throw new Error(error.message);
    } else {
      if (existing.data) return { ok: true, already: true };
      const { error } = await supabaseAdmin.from("user_roles").insert({
        user_id: data.userId,
        role: data.role,
      });
      if (error) throw new Error(error.message);
    }

    // Audit trail (Phase 4): every successful grant/revoke is recorded,
    // independent of user_roles' own row history (which a revoke deletes).
    await supabaseAdmin.from("role_change_audit").insert({
      actor_id: userId,
      target_user_id: data.userId,
      role: data.role,
      action: data.action,
    });

    return { ok: true, already: false };
  });
