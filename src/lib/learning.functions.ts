import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { findModule } from "@/lib/curriculum";
import { findLab } from "@/lib/labs";
import { findExamBank } from "@/lib/exam-bank";
import { certificateEligibility, CERT_TRACKS } from "@/lib/progress";
import { careerPathList, pathModules, learningStreak } from "@/lib/paths";
import { POINTS, labPoints } from "@/lib/points";
import type { ProgressRow, LabRow, ExamResultRow } from "@/lib/progress";

const EnrollInput = z.object({ moduleSlug: z.string().min(1).max(80) });
const LessonInput = z.object({
  moduleSlug: z.string().min(1).max(80),
  lessonSlug: z.string().min(1).max(80),
  quizScore: z.number().int().min(0).max(50),
  quizTotal: z.number().int().min(0).max(50),
  quizAnswers: z.record(z.string(), z.number().int().min(-1).max(10)).optional(),
});
const LabInput = z.object({
  labSlug: z.string().min(1).max(80),
  answers: z.record(z.string(), z.number().int().min(-1).max(10)),
  report: z.string().max(6000),
  score: z.number().int().min(0).max(50),
  total: z.number().int().min(0).max(50),
  passed: z.boolean(),
});
const ExamInput = z.object({
  pathSlug: z.string().min(1).max(80),
  answers: z.record(z.string(), z.number().int().min(-1).max(10)),
  score: z.number().int().min(0).max(60),
  total: z.number().int().min(0).max(60),
  passed: z.boolean(),
});
const CertInput = z.object({
  track: z.string().min(1).max(80),
  title: z.string().min(1).max(160),
  score: z.number().int().min(0).max(100),
});
const ProfileInput = z.object({
  displayName: z.string().trim().min(2).max(60),
  city: z.string().trim().max(60).optional(),
  goal: z.string().trim().max(200).optional(),
  weeklyHours: z.number().int().min(1).max(60),
});
const UsernameInput = z.object({
  username: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9_]{3,20}$/, "3-20 xaraf, kaliya letters/numbers/underscore"),
});

/**
 * Awards points idempotently: the unique constraint on
 * (user_id, action_type, reference_slug) means a duplicate award is a
 * no-op, not an error — safe to call even if the same action somehow
 * fires twice.
 */
async function awardPoints(
  supabase: any,
  userId: string,
  actionType: string,
  referenceSlug: string,
  points: number,
) {
  if (points <= 0) return;
  await supabase
    .from("points_ledger")
    .insert({ user_id: userId, action_type: actionType, reference_slug: referenceSlug, points })
    .select()
    .maybeSingle();
  // Errors here (including unique-violation duplicates) are intentionally
  // swallowed — points are a bonus layer, never something that should be
  // able to fail the underlying lesson/lab/exam completion.
}

export const getStudentData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [
      profile,
      enrollments,
      progress,
      labs,
      examAttempts,
      certs,
      roles,
      payments,
      referrals,
      referralCode,
      points,
    ] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("enrollments").select("*").eq("user_id", userId),
      supabase.from("lesson_progress").select("*").eq("user_id", userId).order("completed_at", { ascending: false }),
      supabase.from("lab_submissions").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("exam_attempts").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("certificates").select("*").eq("user_id", userId),
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase.from("payments").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("referrals").select("*").eq("referrer_id", userId).order("created_at", { ascending: false }),
      supabase.from("referral_codes").select("code").eq("user_id", userId).maybeSingle(),
      supabase.from("points_ledger").select("*").eq("user_id", userId),
    ]);

    const err =
      profile.error ??
      enrollments.error ??
      progress.error ??
      labs.error ??
      examAttempts.error ??
      certs.error ??
      roles.error ??
      payments.error ??
      referrals.error ??
      referralCode.error ??
      points.error;
    if (err) throw new Error(err.message);

    return {
      userId,
      email: (context.claims["email"] as string | undefined) ?? "",
      profile: profile.data,
      enrollments: enrollments.data ?? [],
      progress: progress.data ?? [],
      labs: labs.data ?? [],
      examResults: examAttempts.data ?? [],
      certificates: certs.data ?? [],
     isAdmin: (roles.data ?? []).some(
  (r) => r.role === "admin" || r.role === "super_admin"
),
      payments: payments.data ?? [],
      referrals: referrals.data ?? [],
      referralCode: referralCode.data?.code ?? null,
      points: points.data ?? [],
    };
  });

/**
 * Public leaderboard: top 5 only, username + total points, tie-broken by
 * earliest account creation. No auth required — this is meant to be
 * visible to logged-out visitors too.
 */
export const getLeaderboard = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("public_leaderboard")
    .select("username, total_points, account_created_at")
    .order("total_points", { ascending: false })
    .order("account_created_at", { ascending: true })
    .limit(5);
  if (error) throw new Error(error.message);
  return { entries: data ?? [] };
});

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ProfileInput.parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("profiles").upsert({
      id: context.userId,
      display_name: data.displayName,
      city: data.city ?? null,
      goal: data.goal ?? null,
      weekly_hours: data.weeklyHours,
      updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Separate from saveProfile since username has DB-level uniqueness that can fail. */
export const saveUsername = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => UsernameInput.parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("profiles")
      .update({ username: data.username, updated_at: new Date().toISOString() })
      .eq("id", context.userId);
    if (error) {
      if (error.message.includes("username_format")) throw new Error("Username qaab khaldan ah.");
      if (error.message.includes("profiles_username_unique_ci")) throw new Error("Username-kan hore ayaa loo isticmaalay.");
      throw new Error(error.message);
    }
    return { ok: true };
  });

export const enrollModule = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => EnrollInput.parse(d))
  .handler(async ({ data, context }) => {
    const existing = await context.supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", context.userId)
      .eq("module_slug", data.moduleSlug)
      .maybeSingle();
    if (existing.data) return { ok: true, already: true };

    const { error } = await context.supabase
      .from("enrollments")
      .insert({ user_id: context.userId, module_slug: data.moduleSlug });
    if (error) throw new Error(error.message);
    return { ok: true, already: false };
  });

export const completeLesson = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => LessonInput.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    // Server-side quiz score validation
    const mod = findModule(data.moduleSlug);
    const lesson = mod?.lessonList.find((l) => l.slug === data.lessonSlug);
    if (!mod || !lesson) throw new Error("Invalid lesson");
    const realScore = lesson.quiz.filter((q, i) => data.quizAnswers?.[String(i)] === q.answer).length;
    const realTotal = lesson.quiz.length;
    if (data.quizScore > realScore) throw new Error("Score mismatch");
    if (data.quizTotal !== realTotal) throw new Error("Quiz total mismatch");

    const existing = await supabase
      .from("lesson_progress")
      .select("id, quiz_score")
      .eq("user_id", userId)
      .eq("module_slug", data.moduleSlug)
      .eq("lesson_slug", data.lessonSlug)
      .maybeSingle();

    const isFirstCompletion = !existing.data;
    const nowIso = new Date().toISOString();

    if (existing.data) {
      const best = Math.max(existing.data.quiz_score ?? 0, realScore);
      const { error } = await supabase
        .from("lesson_progress")
        .update({ quiz_score: best, quiz_total: realTotal, completed_at: nowIso })
        .eq("id", existing.data.id);
      if (error) throw new Error(error.message);
      return { ok: true, best };
    }

    const { error } = await supabase.from("lesson_progress").insert({
      user_id: userId,
      module_slug: data.moduleSlug,
      lesson_slug: data.lessonSlug,
      quiz_score: realScore,
      quiz_total: realTotal,
      completed_at: nowIso,
    });
    if (error) throw new Error(error.message);

    if (isFirstCompletion) {
      // Lesson + quiz points (merged — this app has no separate quiz-only event)
      const quizBonus = realTotal > 0 ? POINTS.QUIZ_BASE + POINTS.quizScoreBonus(realScore / realTotal) : 0;
      await awardPoints(
        supabase,
        userId,
        "lesson_complete",
        `${data.moduleSlug}/${data.lessonSlug}`,
        POINTS.LESSON_BASE + quizBonus,
      );

      // Fetch full progress history once, used for module/path/streak checks below
      const allProgress = await supabase
        .from("lesson_progress")
        .select("module_slug, lesson_slug, completed_at")
        .eq("user_id", userId);
      const rows = (allProgress.data ?? []) as ProgressRow[];

      // Module completion bonus
      const moduleDone = mod.lessonList.every((l) =>
        rows.some((r) => r.module_slug === mod.slug && r.lesson_slug === l.slug),
      );
      if (moduleDone) {
        await awardPoints(supabase, userId, "module_complete", mod.slug, POINTS.MODULE_COMPLETE_BONUS);
      }

      // Path completion bonus — check every live path containing this module
      for (const path of careerPathList.filter((p) => p.status === "live")) {
        const mods = pathModules(path);
        if (!mods.some((m) => m.slug === mod.slug)) continue;
        const pathDone = mods.every((m) =>
          m.lessonList.every((l) => rows.some((r) => r.module_slug === m.slug && r.lesson_slug === l.slug)),
        );
        if (pathDone) {
          await awardPoints(supabase, userId, "path_complete", path.slug, POINTS.PATH_COMPLETE_BONUS);
        }
      }

      // Daily activity + streak milestone (once per calendar day)
      const today = nowIso.slice(0, 10);
      const streak = learningStreak(rows);
      await awardPoints(
        supabase,
        userId,
        "daily_activity",
        today,
        POINTS.DAILY_ACTIVITY + POINTS.streakDayBonus(streak),
      );
      if (streak === 7) await awardPoints(supabase, userId, "streak_milestone", "7", POINTS.STREAK_MILESTONE_7);
      if (streak === 30) await awardPoints(supabase, userId, "streak_milestone", "30", POINTS.STREAK_MILESTONE_30);
      if (streak === 100) await awardPoints(supabase, userId, "streak_milestone", "100", POINTS.STREAK_MILESTONE_100);
    }

    return { ok: true, best: realScore };
  });

export const submitLab = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => LabInput.parse(d))
  .handler(async ({ data, context }) => {
    // Server-side lab score validation
    const lab = findLab(data.labSlug);
    if (!lab) throw new Error("Invalid lab");
    const realScore = lab.questions.filter((q) => data.answers?.[q.id] === q.answer).length;
    const realTotal = lab.questions.length;
    const realPassed = realScore >= Math.ceil(realTotal * 0.75);
    if (data.score > realScore) throw new Error("Score mismatch");
    if (data.total !== realTotal) throw new Error("Total mismatch");
    if (data.passed !== realPassed) throw new Error("Pass status mismatch");
    if (data.report.trim().length < 40) throw new Error("Report too short");

    const { error } = await context.supabase.from("lab_submissions").insert({
      user_id: context.userId,
      lab_slug: data.labSlug,
      answers: data.answers,
      report: data.report,
      score: realScore,
      total: realTotal,
      passed: realPassed,
    });
    if (error) throw new Error(error.message);

    if (realPassed) {
      const points = labPoints((lab as any).taskType) + POINTS.LAB_REPORT_BONUS;
      await awardPoints(context.supabase, context.userId, "lab_pass", data.labSlug, points);
    }

    return { ok: true, score: realScore, total: realTotal, passed: realPassed };
  });

/**
 * Requires an `exam_attempts` table: id, user_id, path_slug, score, total,
 * passed, answers (jsonb), created_at.
 */
export const submitExam = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ExamInput.parse(d))
  .handler(async ({ data, context }) => {
    // Server-side exam score validation — never trust the client's claimed score
    const bank = findExamBank(data.pathSlug);
    if (!bank) throw new Error("Invalid exam path");
    const realScore = bank.questions.filter((q) => data.answers?.[q.id] === q.answer).length;
    const realTotal = bank.questions.length;
    const realPassed = Math.round((realScore / realTotal) * 100) >= bank.passingPercent;
    if (data.score > realScore) throw new Error("Score mismatch");
    if (data.total !== realTotal) throw new Error("Total mismatch");
    if (data.passed !== realPassed) throw new Error("Pass status mismatch");

    const { error } = await context.supabase.from("exam_attempts").insert({
      user_id: context.userId,
      path_slug: data.pathSlug,
      answers: data.answers,
      score: realScore,
      total: realTotal,
      passed: realPassed,
    });
    if (error) throw new Error(error.message);

    if (realPassed) {
      await awardPoints(context.supabase, context.userId, "exam_pass", data.pathSlug, POINTS.EXAM_PASSED);
    }

    return { ok: true, score: realScore, total: realTotal, passed: realPassed };
  });

export const issueCertificate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => CertInput.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const def = CERT_TRACKS.find((t) => t.track === data.track);
    if (!def) throw new Error("Invalid track");

    // Server-side eligibility check
    const [progressRes, labsRes, examRes] = await Promise.all([
      supabase.from("lesson_progress").select("*").eq("user_id", userId),
      supabase.from("lab_submissions").select("*").eq("user_id", userId),
      supabase.from("exam_attempts").select("*").eq("user_id", userId),
    ]);
    if (progressRes.error) throw new Error(progressRes.error.message);
    if (labsRes.error) throw new Error(labsRes.error.message);
    if (examRes.error) throw new Error(examRes.error.message);

    const progressRows = (progressRes.data ?? []).map((r) => ({
      module_slug: r.module_slug,
      lesson_slug: r.lesson_slug,
      quiz_score: r.quiz_score,
      quiz_total: r.quiz_total,
      completed_at: r.completed_at,
    })) as ProgressRow[];
    const labRows = (labsRes.data ?? []).map((r) => ({
      lab_slug: r.lab_slug,
      score: r.score,
      total: r.total,
      passed: r.passed,
    })) as LabRow[];
    const examRows = (examRes.data ?? []).map((r) => ({
      path_slug: r.path_slug,
      score: r.score,
      total: r.total,
      passed: r.passed,
      created_at: r.created_at,
    })) as ExamResultRow[];

    const elig = certificateEligibility(def.slug, progressRows, labRows, examRows);
    if (!elig.eligible) throw new Error("Not eligible for certificate");

    const existing = await supabase
      .from("certificates")
      .select("*")
      .eq("user_id", userId)
      .eq("track", data.track)
      .maybeSingle();
    if (existing.data) return existing.data;

    const { data: row, error } = await supabase
      .from("certificates")
      .insert({ user_id: userId, track: data.track, title: data.title, score: elig.score })
      .select("*")
      .single();
    if (error) throw new Error(error.message);

    await awardPoints(supabase, userId, "certificate_earned", data.track, POINTS.CERTIFICATE_EARNED);

    return row;
  });

export const getAdminAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
  const { data: roles, error: roleError } = await supabase
  .from("user_roles")
  .select("role")
  .eq("user_id", userId);

if (roleError) throw new Error(roleError.message);

const isAdmin = (roles ?? []).some(
  (r) => r.role === "admin" || r.role === "super_admin"
);

if (!isAdmin) throw new Error("Forbidden: admin access required");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [profiles, enrollments, progress, labs, certs] = await Promise.all([
      supabaseAdmin.from("profiles").select("id, display_name, city, goal, weekly_hours, created_at"),
      supabaseAdmin.from("enrollments").select("user_id, module_slug, created_at"),
      supabaseAdmin.from("lesson_progress").select("user_id, module_slug, lesson_slug, quiz_score, quiz_total, completed_at"),
      supabaseAdmin.from("lab_submissions").select("user_id, lab_slug, score, total, passed, created_at"),
      supabaseAdmin.from("certificates").select("user_id, track, title, score, issued_at"),
    ]);

    const err = profiles.error ?? enrollments.error ?? progress.error ?? labs.error ?? certs.error;
    if (err) throw new Error(err.message);

    return {
      students: profiles.data ?? [],
      enrollments: enrollments.data ?? [],
      progress: progress.data ?? [],
      labs: labs.data ?? [],
      certificates: certs.data ?? [],
    };
  });
