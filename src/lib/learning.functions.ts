import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const EnrollInput = z.object({ moduleSlug: z.string().min(1).max(80) });
const LessonInput = z.object({
  moduleSlug: z.string().min(1).max(80),
  lessonSlug: z.string().min(1).max(80),
  quizScore: z.number().int().min(0).max(50),
  quizTotal: z.number().int().min(0).max(50),
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
      isAdmin: (roles.data ?? []).some((r) => r.role === "admin"),
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
    const existing = await supabase
      .from("lesson_progress")
      .select("id, quiz_score")
      .eq("user_id", userId)
      .eq("module_slug", data.moduleSlug)
      .eq("lesson_slug", data.lessonSlug)
      .maybeSingle();

    if (existing.data) {
      const best = Math.max(existing.data.quiz_score ?? 0, data.quizScore);
      const { error } = await supabase
        .from("lesson_progress")
        .update({ quiz_score: best, quiz_total: data.quizTotal, completed_at: new Date().toISOString() })
        .eq("id", existing.data.id);
      if (error) throw new Error(error.message);
      return { ok: true, best };
    }

    const { error } = await supabase.from("lesson_progress").insert({
      user_id: userId,
      module_slug: data.moduleSlug,
      lesson_slug: data.lessonSlug,
      quiz_score: data.quizScore,
      quiz_total: data.quizTotal,
    });
    if (error) throw new Error(error.message);
    return { ok: true, best: data.quizScore };
  });

export const submitLab = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => LabInput.parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("lab_submissions").insert({
      user_id: context.userId,
      lab_slug: data.labSlug,
      answers: data.answers,
      report: data.report,
      score: data.score,
      total: data.total,
      passed: data.passed,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const issueCertificate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => CertInput.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const existing = await supabase
      .from("certificates")
      .select("*")
      .eq("user_id", userId)
      .eq("track", data.track)
      .maybeSingle();
    if (existing.data) return existing.data;

    const { data: row, error } = await supabase
      .from("certificates")
      .insert({ user_id: userId, track: data.track, title: data.title, score: data.score })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const getAdminAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (roleError) throw new Error(roleError.message);
    if (!isAdmin) throw new Error("Forbidden: admin access required");

    const [profiles, enrollments, progress, labs, certs] = await Promise.all([
      supabase.from("profiles").select("id, display_name, city, goal, weekly_hours, created_at"),
      supabase.from("enrollments").select("user_id, module_slug, created_at"),
      supabase.from("lesson_progress").select("user_id, module_slug, lesson_slug, quiz_score, quiz_total, completed_at"),
      supabase.from("lab_submissions").select("user_id, lab_slug, score, total, passed, created_at"),
      supabase.from("certificates").select("user_id, track, title, score, issued_at"),
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
