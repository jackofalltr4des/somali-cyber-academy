import { findModule, modules, totalLessons } from "./curriculum";
import { labCatalog } from "./labs";
import { careerPathList, pathModules } from "./paths";

export type ProgressRow = {
  module_slug: string;
  lesson_slug: string;
  quiz_score: number;
  quiz_total: number;
  completed_at?: string | null;
};
export type LabRow = { lab_slug: string; score: number; total: number; passed: boolean };

export function moduleProgress(moduleSlug: string, rows: ProgressRow[]) {
  const mod = findModule(moduleSlug);
  if (!mod) return { done: 0, total: 0, percent: 0 };
  const done = mod.lessonList.filter((l) =>
    rows.some((r) => r.module_slug === moduleSlug && r.lesson_slug === l.slug),
  ).length;
  return {
    done,
    total: mod.lessons,
    percent: mod.lessons ? Math.round((done / mod.lessons) * 100) : 0,
  };
}

export function overallProgress(rows: ProgressRow[]) {
  const done = new Set(rows.map((r) => `${r.module_slug}/${r.lesson_slug}`)).size;
  return { done, total: totalLessons, percent: Math.round((done / totalLessons) * 100) };
}

export function quizAverage(rows: ProgressRow[]) {
  const scored = rows.filter((r) => r.quiz_total > 0);
  if (!scored.length) return 0;
  const sum = scored.reduce((n, r) => n + r.quiz_score / r.quiz_total, 0);
  return Math.round((sum / scored.length) * 100);
}

export function labsPassed(rows: LabRow[]) {
  return new Set(rows.filter((r) => r.passed).map((r) => r.lab_slug)).size;
}

export type Badge = {
  id: string;
  name: string;
  somali: string;
  earned: boolean;
  hint: string;
};

export function badges(progress: ProgressRow[], labs: LabRow[], certs: number): Badge[] {
  const overall = overallProgress(progress);
  const passed = labsPassed(labs);
  const avg = quizAverage(progress);
  const modulesDone = modules.filter((m) => moduleProgress(m.slug, progress).percent === 100).length;

  return [
    {
      id: "first-step",
      name: "First Step",
      somali: "Cashar kowaad la dhammeeyay",
      earned: overall.done >= 1,
      hint: "Dhammee cashar kasta mid ah.",
    },
    {
      id: "fundamentals",
      name: "Fundamentals",
      somali: "Module dhan la dhammeeyay",
      earned: modulesDone >= 1,
      hint: "Dhammee dhammaan casharrada module keliya.",
    },
    {
      id: "quiz-master",
      name: "Quiz Master",
      somali: "Celceliska quiz 90%+",
      earned: avg >= 90 && overall.done >= 5,
      hint: "Hel 90%+ celcelis ah 5 quiz kadib.",
    },
    {
      id: "first-lab",
      name: "Lab Analyst",
      somali: "Lab kowaad la guuleystay",
      earned: passed >= 1,
      hint: "Guuleyso lab kasta mid ah (70%+).",
    },
    {
      id: "soc-ready",
      name: "SOC Ready",
      somali: "Dhammaan labs-ka la guuleystay",
      earned: passed >= labCatalog.length,
      hint: `Guuleyso dhammaan ${labCatalog.length} labs-ka.`,
    },
    {
      id: "halfway",
      name: "Halfway Hero",
      somali: "50% manhajka",
      earned: overall.percent >= 50,
      hint: "Gaar 50% manhajka guud.",
    },
    {
      id: "graduate",
      name: "Graduate",
      somali: "Manhajka oo dhan",
      earned: overall.percent >= 100,
      hint: "Dhammee 100% casharrada.",
    },
    {
      id: "certified",
      name: "Certified",
      somali: "Shahaado la helay",
      earned: certs >= 1,
      hint: "Buuxi shuruudaha shahaadada.",
    },
  ];
}

/**
 * Legacy single-track constants — kept for backward compatibility with any
 * other file that may still import these directly. The certificate page now
 * uses CERT_TRACKS below instead.
 */
export const CERT_TRACK = "junior-soc-analyst";
export const CERT_TITLE = "SomTrust Certified Junior SOC Analyst";

/**
 * One entry per career path that has a certificate. `slug` matches the
 * CareerPath.slug in paths.ts (used to look up modules/labs for that path).
 * `track` is the stable identifier stored in the certificates table row.
 */
export type CertTrackDef = {
  slug: string;
  track: string;
  title: string;
  shortTitle: string;
};

export const CERT_TRACKS: CertTrackDef[] = [
  {
    slug: "soc-analyst",
    track: "junior-soc-analyst",
    title: "SomTrust Certified Junior SOC Analyst",
    shortTitle: "SOC Analyst",
  },
  {
    slug: "ethical-hacking",
    track: "ethical-hacking-associate",
    title: "SomTrust Certified Ethical Hacking Associate",
    shortTitle: "Ethical Hacking",
  },
  {
    slug: "digital-forensics",
    track: "digital-forensics-analyst",
    title: "SomTrust Certified Digital Forensics Analyst",
    shortTitle: "Digital Forensics",
  },
  {
    slug: "cloud-security",
    track: "cloud-security-associate",
    title: "SomTrust Certified Cloud Security Associate",
    shortTitle: "Cloud Security",
  },
];

/** All modules belonging to a given career path (by CareerPath.slug). */
export function trackModules(pathSlug: string) {
  const path = careerPathList.find((p) => p.slug === pathSlug);
  if (!path) return [];
  return pathModules(path);
}

/** Lab slugs belonging to a given career path (by CareerPath.slug). */
export function trackLabSlugs(pathSlug: string): string[] {
  const path = careerPathList.find((p) => p.slug === pathSlug);
  return path?.labSlugs ?? [];
}

/** Lesson completion, scoped to one career path's modules only. */
export function trackProgress(pathSlug: string, rows: ProgressRow[]) {
  const mods = trackModules(pathSlug);
  const modSlugs = new Set(mods.map((m) => m.slug));
  const total = mods.reduce((n, m) => n + m.lessons, 0);
  const done = new Set(
    rows
      .filter((r) => modSlugs.has(r.module_slug))
      .map((r) => `${r.module_slug}/${r.lesson_slug}`),
  ).size;
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

/** Quiz average, scoped to one career path's lessons only. */
export function trackQuizAverage(pathSlug: string, rows: ProgressRow[]) {
  const modSlugs = new Set(trackModules(pathSlug).map((m) => m.slug));
  const scored = rows.filter((r) => modSlugs.has(r.module_slug) && r.quiz_total > 0);
  if (!scored.length) return 0;
  const sum = scored.reduce((n, r) => n + r.quiz_score / r.quiz_total, 0);
  return Math.round((sum / scored.length) * 100);
}

/** Labs passed, scoped to one career path's lab list only. */
export function trackLabsPassed(pathSlug: string, labs: LabRow[]) {
  const slugs = new Set(trackLabSlugs(pathSlug));
  return new Set(
    labs.filter((r) => r.passed && slugs.has(r.lab_slug)).map((r) => r.lab_slug),
  ).size;
}

/**
 * One row per exam attempt. This shape assumes a Supabase table (e.g.
 * exam_attempts) with path_slug/score/total/passed/taken_at columns — adjust
 * to match your actual schema if it differs.
 */
export type ExamResultRow = {
  path_slug: string;
  score: number;
  total: number;
  passed: boolean;
  created_at?: string | null;
};

/** Whether the student has ever passed the exam for this path. */
export function examPassed(pathSlug: string, examResults: ExamResultRow[]): boolean {
  return examResults.some((r) => r.path_slug === pathSlug && r.passed);
}

/** The highest-scoring attempt for this path, if any. */
export function bestExamResult(
  pathSlug: string,
  examResults: ExamResultRow[],
): ExamResultRow | undefined {
  const attempts = examResults.filter((r) => r.path_slug === pathSlug);
  if (!attempts.length) return undefined;
  return attempts.reduce((best, r) =>
    r.score / r.total > best.score / best.total ? r : best,
  );
}

/**
 * Certificate eligibility for a given career path. pathSlug matches
 * CareerPath.slug / CertTrackDef.slug (e.g. "soc-analyst", "cloud-security").
 *
 * Requires: 100% of lessons, 100% of labs passed, and a passed final exam
 * (see exam-bank.ts) — the exam replaces quiz-average as the certification
 * gate, since it's the one thing that's actually proctored/timed and paid
 * for, while lesson quizzes remain free practice.
 */
export function certificateEligibility(
  pathSlug: string,
  progress: ProgressRow[],
  labs: LabRow[],
  examResults: ExamResultRow[] = [],
) {
  const def = CERT_TRACKS.find((c) => c.slug === pathSlug) ?? CERT_TRACKS[0];
  const prog = trackProgress(pathSlug, progress);
  const labSlugs = trackLabSlugs(pathSlug);
  const passed = trackLabsPassed(pathSlug, labs);
  const exam = bestExamResult(pathSlug, examResults);
  const examOk = examPassed(pathSlug, examResults);
  const examPercent = exam ? Math.round((exam.score / exam.total) * 100) : 0;

  const reqs = [
    {
      label: `Dhammee 100% casharrada (${prog.total} lessons)`,
      ok: prog.total > 0 && prog.percent >= 100,
      value: `${prog.percent}%`,
    },
    {
      label: `Guuleyso dhammaan ${labSlugs.length} labs-ka`,
      ok: labSlugs.length > 0 && passed >= labSlugs.length,
      value: `${passed}/${labSlugs.length}`,
    },
    {
      label: "Ku guuleyso imtixaanka kama dambaysta ah (70%+)",
      ok: examOk,
      value: exam ? `${examPercent}%` : "Aan la qabanin",
    },
  ];

  return {
    track: def.track,
    title: def.title,
    reqs,
    eligible: reqs.every((r) => r.ok),
    score: Math.round((prog.percent + examPercent) / 2),
  };
}
