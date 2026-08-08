import { describe, it, expect } from "vitest";
import { certificateEligibility, trackModules, trackLabSlugs } from "./progress";
import type { ProgressRow, LabRow, ExamResultRow } from "./progress";

const PATH_SLUG = "soc-analyst";

/** Builds a synthetic "100% complete" progress/lab set from the real, current curriculum data. */
function fullProgress(): ProgressRow[] {
  return trackModules(PATH_SLUG).flatMap((m) =>
    m.lessonList.map((l) => ({
      module_slug: m.slug,
      lesson_slug: l.slug,
      quiz_score: 0,
      quiz_total: 0,
    })),
  );
}

function fullLabs(): LabRow[] {
  return trackLabSlugs(PATH_SLUG).map((slug) => ({
    lab_slug: slug,
    score: 10,
    total: 10,
    passed: true,
  }));
}

const passedExam: ExamResultRow[] = [{ path_slug: PATH_SLUG, score: 60, total: 60, passed: true }];

// C1/C3: certificateEligibility is the function issueCertificate calls to
// decide whether to mint a certificate. These prove a certificate can't be
// obtained from partial or forged-looking state — each requirement
// (lessons, labs, exam) genuinely gates eligibility on its own.
describe("certificateEligibility (C1/C3 — certificate cannot be forged from partial state)", () => {
  it("is not eligible with zero progress", () => {
    expect(certificateEligibility(PATH_SLUG, [], [], []).eligible).toBe(false);
  });

  it("is not eligible with full lessons+labs but no passed exam", () => {
    const result = certificateEligibility(PATH_SLUG, fullProgress(), fullLabs(), []);
    expect(result.eligible).toBe(false);
  });

  it("is not eligible with a passed exam alone (no lesson/lab completion)", () => {
    const result = certificateEligibility(PATH_SLUG, [], [], passedExam);
    expect(result.eligible).toBe(false);
  });

  it("is eligible only once lessons, labs, and exam are all complete", () => {
    const result = certificateEligibility(PATH_SLUG, fullProgress(), fullLabs(), passedExam);
    expect(result.eligible).toBe(true);
    expect(result.reqs.every((r) => r.ok)).toBe(true);
  });
});
