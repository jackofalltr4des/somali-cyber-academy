import { modules, totalLessons } from "./curriculum";
import { labCatalog } from "./labs";

export type ProgressRow = {
  module_slug: string;
  lesson_slug: string;
  quiz_score: number;
  quiz_total: number;
};
export type LabRow = { lab_slug: string; score: number; total: number; passed: boolean };

export function moduleProgress(moduleSlug: string, rows: ProgressRow[]) {
  const mod = modules.find((m) => m.slug === moduleSlug);
  if (!mod) return { done: 0, total: 0, percent: 0 };
  const done = mod.lessonList.filter((l) =>
    rows.some((r) => r.module_slug === moduleSlug && r.lesson_slug === l.slug),
  ).length;
  return { done, total: mod.lessons, percent: Math.round((done / mod.lessons) * 100) };
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

export const CERT_TRACK = "junior-soc-analyst";
export const CERT_TITLE = "SomTrust Certified Junior SOC Analyst";

export function certificateEligibility(progress: ProgressRow[], labs: LabRow[]) {
  const overall = overallProgress(progress);
  const passed = labsPassed(labs);
  const avg = quizAverage(progress);
  const reqs = [
    { label: "Dhammee 100% casharrada (24 lessons)", ok: overall.percent >= 100, value: `${overall.percent}%` },
    { label: `Guuleyso dhammaan ${labCatalog.length} labs-ka`, ok: passed >= labCatalog.length, value: `${passed}/${labCatalog.length}` },
    { label: "Celceliska quiz 80% ama ka badan", ok: avg >= 80, value: `${avg}%` },
  ];
  return { reqs, eligible: reqs.every((r) => r.ok), score: Math.round((overall.percent + avg) / 2) };
}
