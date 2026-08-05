import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { findModule } from "@/lib/curriculum";
import { findLab } from "@/lib/labs";
import { certificateEligibility } from "@/lib/progress";
import type { ProgressRow, LabRow } from "@/lib/progress";

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

export const getStudentData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [profile, enrollments, progress, labs, certs, roles, payments, referrals, referralCode] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("enrollments").select("*").eq("user_id", userId),
      supabase.from("lesson_progress").select("*").eq("user_id", userId).order("completed_at", { ascending: false }),
      supabase.from("lab_submissions").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("certificates").select("*").eq("user_id", userId),
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase.from("payments").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("referrals").select("*").eq("referrer_id", userId).order("created_at", { ascending: false }),
      supabase.from("referral_codes").select("code").eq("user_id", userId).maybeSingle(),
    ]);

    const err =
      profile.error ?? enrollments.error ?? progress.error ?? labs.error ?? certs.error ?? roles.error ?? payments.error ?? referrals.error ?? referralCode.error;
    if (err) throw new Error(err.message);

    return {
      userId,
      email: (context.claims["email"] as string | undefined) ?? "",
      profile: profile.data,
      enrollments: enrollments.data ?? [],
      progress: progress.data ?? [],
      labs: labs.data ?? [],
      certificates: certs.data ?? [],
     isAdmin: (roles.data ?? []).some(
  (r) => r.role === "admin" || r.role === "super_admin"
),
      payments: payments.data ?? [],
      referrals: referrals.data ?? [],
      referralCode: referralCode.data?.code ?? null,
    };
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

    if (existing.data) {
      const best = Math.max(existing.data.quiz_score ?? 0, realScore);
      const { error } = await supabase
        .from("lesson_progress")
        .update({ quiz_score: best, quiz_total: realTotal, completed_at: new Date().toISOString() })
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
    });
    if (error) throw new Error(error.message);
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
    return { ok: true, score: realScore, total: realTotal, passed: realPassed };
  });

export const issueCertificate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => CertInput.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    // Server-side eligibility check
    const [progressRes, labsRes] = await Promise.all([
      supabase.from("lesson_progress").select("*").eq("user_id", userId),
      supabase.from("lab_submissions").select("*").eq("user_id", userId),
    ]);
    if (progressRes.error) throw new Error(progressRes.error.message);
    if (labsRes.error) throw new Error(labsRes.error.message);

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

    const elig = certificateEligibility(progressRows, labRows);
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
