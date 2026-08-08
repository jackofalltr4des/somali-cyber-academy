import { describe, it, expect } from "vitest";
import { computeBadges } from "./badges";
import type { ProgressRow, LabRow } from "./progress";

const empty: {
  progress: ProgressRow[];
  labs: LabRow[];
  certsCount: number;
  referralsEarnedCount: number;
} = { progress: [], labs: [], certsCount: 0, referralsEarnedCount: 0 };

describe("computeBadges", () => {
  it("first-blood is only earned once any lab is passed", () => {
    expect(computeBadges(empty).find((b) => b.id === "first-blood")!.earned).toBe(false);

    const withLab = computeBadges({
      ...empty,
      labs: [{ lab_slug: "log-analysis-ssh", score: 5, total: 5, passed: true }],
    });
    expect(withLab.find((b) => b.id === "first-blood")!.earned).toBe(true);
  });

  it("a tool badge requires that specific lab, not just any passed lab", () => {
    const wrongLab = computeBadges({
      ...empty,
      labs: [{ lab_slug: "some-other-lab", score: 5, total: 5, passed: true }],
    });
    expect(wrongLab.find((b) => b.id === "nmap-navigator")!.earned).toBe(false);

    const rightLab = computeBadges({
      ...empty,
      labs: [{ lab_slug: "nmap-command-practice", score: 5, total: 5, passed: true }],
    });
    expect(rightLab.find((b) => b.id === "nmap-navigator")!.earned).toBe(true);
  });

  it("a lab that exists but hasn't passed does not earn its badge", () => {
    const failed = computeBadges({
      ...empty,
      labs: [{ lab_slug: "nmap-command-practice", score: 1, total: 5, passed: false }],
    });
    expect(failed.find((b) => b.id === "nmap-navigator")!.earned).toBe(false);
  });

  it("referral-recruiter tracks referralsEarnedCount, not certsCount or progress", () => {
    expect(computeBadges(empty).find((b) => b.id === "referral-recruiter")!.earned).toBe(false);
    expect(
      computeBadges({ ...empty, referralsEarnedCount: 1 }).find(
        (b) => b.id === "referral-recruiter",
      )!.earned,
    ).toBe(true);
  });
});
