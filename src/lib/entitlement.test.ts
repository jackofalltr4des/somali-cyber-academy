import { describe, it, expect } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { pathForModule, pathForLab, hasApprovedPayment, checkUserEntitlement } from "./entitlement";
import { careerPathList } from "./paths";

describe("pathForModule / pathForLab", () => {
  it("resolves a real module slug to its owning career path", () => {
    const path = careerPathList.find((p) => p.status === "live" && p.courses.length > 0)!;
    const moduleSlug = path.courses[0]!.moduleSlug!;
    expect(pathForModule(moduleSlug)).toBe(path.slug);
  });

  it("resolves a real lab slug to its owning career path", () => {
    const path = careerPathList.find((p) => p.status === "live" && p.labSlugs.length > 0)!;
    expect(pathForLab(path.labSlugs[0]!)).toBe(path.slug);
  });

  it("returns null for a module/lab slug that doesn't belong to any path", () => {
    expect(pathForModule("not-a-real-module")).toBeNull();
    expect(pathForLab("not-a-real-lab")).toBeNull();
  });
});

/** Minimal fluent stand-in for the Supabase query builder used by hasApprovedPayment. */
function mockSupabase(row: { id: string } | null): SupabaseClient<Database> {
  const builder = {
    select: () => builder,
    eq: () => builder,
    limit: () => builder,
    maybeSingle: async () => ({ data: row, error: null }),
  };
  return { from: () => builder } as unknown as SupabaseClient<Database>;
}

// C1: this is the function every paywalled server action (enrollModule,
// completeLesson, submitLab, submitExam, issueCertificate) calls before
// doing anything — proving it actually distinguishes paid from unpaid is
// proving the paywall holds at the application layer.
describe("hasApprovedPayment / checkUserEntitlement (C1 — paywall enforcement)", () => {
  it("hasApprovedPayment is true when an approved payment row exists", async () => {
    const supabase = mockSupabase({ id: "payment-1" });
    await expect(hasApprovedPayment(supabase, "user-1", "course", "soc-analyst")).resolves.toBe(
      true,
    );
  });

  it("hasApprovedPayment is false for an unpaid user (no matching row)", async () => {
    const supabase = mockSupabase(null);
    await expect(hasApprovedPayment(supabase, "user-1", "course", "soc-analyst")).resolves.toBe(
      false,
    );
  });

  it("checkUserEntitlement throws for an unpaid user — blocks course access", async () => {
    const supabase = mockSupabase(null);
    await expect(
      checkUserEntitlement(supabase, "user-1", "course", "soc-analyst"),
    ).rejects.toThrow();
  });

  it("checkUserEntitlement throws for an unpaid user — blocks exam access", async () => {
    const supabase = mockSupabase(null);
    await expect(checkUserEntitlement(supabase, "user-1", "exam", "soc-analyst")).rejects.toThrow();
  });

  it("checkUserEntitlement resolves without throwing for a paid user", async () => {
    const supabase = mockSupabase({ id: "payment-1" });
    await expect(
      checkUserEntitlement(supabase, "user-1", "exam", "soc-analyst"),
    ).resolves.toBeUndefined();
  });
});
