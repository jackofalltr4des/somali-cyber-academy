import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { careerPathList } from "./paths";

export type EntitlementKind = "course" | "exam";

/**
 * The one place that answers "has this user paid for X". Every server
 * function that gates access to paid content must call checkUserEntitlement
 * (or hasApprovedPayment for a non-throwing check) instead of re-deriving
 * its own payment check — client-supplied payment/enrollment state (e.g.
 * what a route reads off getStudentData for UI) must never be trusted as
 * the actual gate.
 *
 * "course" entitlement covers every module/lesson/lab in that career path
 * (payments.tsx sells whole paths, not individual modules — see
 * 20260807130000_fix_payment_enrollment_and_exam_slugs.sql). "exam"
 * entitlement covers that path's final exam and, transitively, the
 * certificate that requires passing it.
 */
export async function hasApprovedPayment(
  supabase: SupabaseClient<Database>,
  userId: string,
  kind: EntitlementKind,
  pathSlug: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("payments")
    .select("id")
    .eq("user_id", userId)
    .eq("item_type", kind)
    .eq("item_slug", pathSlug)
    .eq("status", "approved")
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return Boolean(data);
}

/** Throws if the user does not hold an approved payment for this path. */
export async function checkUserEntitlement(
  supabase: SupabaseClient<Database>,
  userId: string,
  kind: EntitlementKind,
  pathSlug: string,
): Promise<void> {
  const ok = await hasApprovedPayment(supabase, userId, kind, pathSlug);
  if (!ok) {
    throw new Error(
      kind === "exam"
        ? "Waa inaad bixisaa imtixaankan ka hor. Bogga lacag-bixinta ka bilow."
        : "Waa inaad bixisaa waddadan ka hor. Bogga lacag-bixinta ka bilow.",
    );
  }
}

/** The career path (if any) that a given module belongs to. */
export function pathForModule(moduleSlug: string): string | null {
  for (const path of careerPathList) {
    if (path.courses.some((c) => c.moduleSlug === moduleSlug)) return path.slug;
  }
  return null;
}

/** The career path (if any) that a given lab belongs to. */
export function pathForLab(labSlug: string): string | null {
  for (const path of careerPathList) {
    if (path.labSlugs.includes(labSlug)) return path.slug;
  }
  return null;
}
