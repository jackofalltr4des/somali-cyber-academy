import { describe, it, expect } from "vitest";
import { canManageRole, type CallerRoles } from "./admin-auth";

const admin: CallerRoles = { isAdmin: true, isSuperAdmin: false };
const superAdmin: CallerRoles = { isAdmin: true, isSuperAdmin: true };
const student: CallerRoles = { isAdmin: false, isSuperAdmin: false };

// C4: an admin self-escalating to super_admin. These are the exact rules
// adminUpdateRole enforces server-side (payments.functions.ts) — kept
// here as a pure function so the security rule itself is testable without
// a database or auth middleware.
describe("canManageRole (C4 — admin self-escalation)", () => {
  it("a plain admin cannot grant super_admin to someone else", () => {
    expect(canManageRole(admin, "admin-1", "target-1", "super_admin").allowed).toBe(false);
  });

  it("a plain admin cannot grant admin to someone else", () => {
    expect(canManageRole(admin, "admin-1", "target-1", "admin").allowed).toBe(false);
  });

  it("a plain admin can manage the student tier", () => {
    expect(canManageRole(admin, "admin-1", "target-1", "student").allowed).toBe(true);
  });

  it("no one can change their own role, even a super_admin", () => {
    expect(canManageRole(superAdmin, "sa-1", "sa-1", "admin").allowed).toBe(false);
    expect(canManageRole(admin, "admin-1", "admin-1", "student").allowed).toBe(false);
  });

  it("a super_admin can grant super_admin or admin to someone else", () => {
    expect(canManageRole(superAdmin, "sa-1", "target-1", "super_admin").allowed).toBe(true);
    expect(canManageRole(superAdmin, "sa-1", "target-1", "admin").allowed).toBe(true);
  });

  it("a non-admin caller is rejected outright, regardless of target role", () => {
    expect(canManageRole(student, "student-1", "target-1", "student").allowed).toBe(false);
  });
});
