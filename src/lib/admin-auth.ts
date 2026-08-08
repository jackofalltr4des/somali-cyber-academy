import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type CallerRoles = { isAdmin: boolean; isSuperAdmin: boolean };

/**
 * Single source of truth for "what admin-tier roles does this caller
 * have" — was previously copy-pasted (fetch user_roles, check
 * admin/super_admin) six times across learning.functions.ts and
 * payments.functions.ts, which is exactly how a fix like C4 risks getting
 * applied inconsistently across call sites.
 */
export async function getCallerRoles(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<CallerRoles> {
  const { data: roles, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  const set = new Set((roles ?? []).map((r) => r.role));
  return {
    isAdmin: set.has("admin") || set.has("super_admin"),
    isSuperAdmin: set.has("super_admin"),
  };
}

/** Throws unless the caller has admin or super_admin. Returns both flags for further checks. */
export async function requireAdmin(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<CallerRoles> {
  const roles = await getCallerRoles(supabase, userId);
  if (!roles.isAdmin) throw new Error("Forbidden: admin access required");
  return roles;
}

/** Throws unless the caller has super_admin specifically. */
export async function requireSuperAdmin(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<CallerRoles> {
  const roles = await getCallerRoles(supabase, userId);
  if (!roles.isSuperAdmin) throw new Error("Forbidden: super_admin access required");
  return roles;
}

export type AppRole = "admin" | "student" | "super_admin";

/**
 * The C4 fix, as a pure decision function so it's directly unit-testable
 * without a database: no one can change their own role, and only a
 * super_admin can grant or revoke admin/super_admin tier roles. Used by
 * adminUpdateRole in payments.functions.ts.
 */
export function canManageRole(
  caller: CallerRoles,
  callerUserId: string,
  targetUserId: string,
  role: AppRole,
): { allowed: true } | { allowed: false; reason: string } {
  if (!caller.isAdmin) return { allowed: false, reason: "Forbidden: admin access required" };
  if (targetUserId === callerUserId) {
    return { allowed: false, reason: "Forbidden: cannot change your own role" };
  }
  const privilegedRole = role === "admin" || role === "super_admin";
  if (privilegedRole && !caller.isSuperAdmin) {
    return {
      allowed: false,
      reason: "Forbidden: only a super_admin can grant or revoke admin or super_admin roles",
    };
  }
  return { allowed: true };
}
