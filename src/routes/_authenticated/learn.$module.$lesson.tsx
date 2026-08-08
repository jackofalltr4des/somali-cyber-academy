import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { findModule, findLesson } from "@/lib/curriculum";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CircleCheck as CheckCircle2,
  Clock,
  Lock,
  Loader as Loader2,
} from "lucide-react";
import { PageShell } from "@/components/site/Shell";
import { completeLesson, getStudentData } from "@/lib/learning.functions";
import { pathForModule } from "@/lib/entitlement";

export const Route = createFileRoute("/_authenticated/learn/$module/$lesson")({
  head: ({ params }) => {
    const lesson = findModule(params.module)?.lessonList.find((l) => l.slug === params.lesson);

    const title = `${lesson?.english ?? "Cashar"} — SomTrust Cyber Academy`;

    return {
      meta: [
        { title },
        {
          name: "description",
          content: (lesson?.summary ?? "Cashar cybersecurity").slice(0, 155),
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: (lesson?.summary ?? "Cashar cybersecurity").slice(0, 155),
        },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: LessonPage,
});

function LessonPage() {
  const { module: moduleSlug, lesson: lessonSlug } = Route.useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const submit = useServerFn(completeLesson);
  const fetchData = useServerFn(getStudentData);
  const { data, isLoading } = useQuery({ queryKey: ["student"], queryFn: () => fetchData() });

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [graded, setGraded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const result = findLesson(moduleSlug, lessonSlug);

  const mod = result?.mod;
  const lesson = result?.lesson;

  useEffect(() => {
    setAnswers({});
    setGraded(false);
    setError(null);
  }, [lessonSlug]);

  if (!result || !mod || !lesson) {
    return (
      <PageShell>
        <h1 className="font-display text-2xl font-bold">Casharka lama helin</h1>
      </PageShell>
    );
  }

  // Course access control (C2): the real enforcement is server-side in
  // completeLesson (see src/lib/entitlement.ts) — this just avoids showing
  // paid lesson content/quiz to a student who hasn't paid for this path.
  const pathSlug = pathForModule(mod.slug);
  const hasPaidCourse = pathSlug
    ? ((data?.payments ?? []) as { item_type: string; item_slug: string; status: string }[]).some(
        (p) => p.item_type === "course" && p.item_slug === pathSlug && p.status === "approved",
      )
    : true;

  if (isLoading) {
    return (
      <PageShell>
        <div className="flex items-center gap-2 py-16 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Soo dejinaya...
        </div>
      </PageShell>
    );
  }

  if (!hasPaidCourse) {
    return (
      <PageShell>
        <Link
          to="/courses/$module"
          params={{ module: mod.slug }}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {mod.title}
        </Link>
        <div className="bento-card mt-8 flex flex-col items-center gap-4 p-10 text-center">
          <Lock className="size-8 text-muted-foreground" />
          <div>
            <p className="font-display text-lg font-bold">Casharkan waa mid la iibsado</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Waa in aad bixisaa waddadan ka hor inaad casharradeeda barato. Bogga lacag-bixinta ka
              bilow.
            </p>
          </div>
          <Link
            to="/payments"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Aad bogga lacag-bixinta
          </Link>
        </div>
      </PageShell>
    );
  }

  const quiz = lesson.quiz;

  const score = quiz.filter((q, i) => answers[String(i)] === q.answer).length;

  const idx = mod.lessonList.findIndex((l) => l.slug === lesson.slug);

  const prev = idx > 0 ? mod.lessonList[idx - 1] : null;

  const next = idx < mod.lessonList.length - 1 ? mod.lessonList[idx + 1] : null;

  async function finish() {
    setBusy(true);
    setError(null);

    try {
      await submit({
        data: {
          moduleSlug: mod.slug,
          lessonSlug: lesson.slug,
          quizScore: score,
          quizTotal: quiz.length,
          quizAnswers: answers,
        },
      });

      await queryClient.invalidateQueries({
        queryKey: ["student"],
      });

      if (next) {
        navigate({
          to: "/learn/$module/$lesson",
          params: {
            module: mod.slug,
            lesson: next.slug,
          },
        });
      } else {
        navigate({
          to: "/dashboard",
        });
      }
    } catch (err) {
      console.error("Failed to submit lesson completion:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Wax baa qaldamay markii la kaydinayay natiijadaada. Fadlan isku day mar kale.",
      );
    } finally {
      setBusy(false);
    }
  }

  function goPrev() {
    if (!prev) return;

    navigate({
      to: "/learn/$module/$lesson",
      params: {
        module: mod.slug,
        lesson: prev.slug,
      },
    });
  }

  return (
    <PageShell>
      <Link
        to="/courses/$module"
        params={{ module: mod.slug }}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← {mod.title}
      </Link>

      <article className="bento-card mt-4 p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold">{lesson.title}</h1>

            <p className="text-sm text-primary">{lesson.english}</p>
          </div>

          <span className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <Clock className="size-3.5" />
            {lesson.minutes} daqiiqo
          </span>
        </div>

        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
          {lesson.sections.map((sec) => (
            <div key={sec.h}>
              <h2 className="font-display text-base font-bold text-foreground">{sec.h}</h2>

              <p className="mt-1">{sec.p}</p>
            </div>
          ))}
        </div>

        {lesson.terms.length > 0 && (
          <div className="mt-7 rounded-2xl border border-border/70 bg-surface p-5">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Key terms
            </h2>

            <dl className="mt-3 space-y-2 text-sm">
              {lesson.terms.map((t) => (
                <div key={t.term}>
                  <dt className="font-semibold text-foreground">{t.term}</dt>
                  <dd className="text-muted-foreground">{t.def}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {lesson.exercise && (
          <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5">
            <h2 className="font-display text-sm font-bold text-primary">Tababar (Exercise)</h2>

            <p className="mt-2 text-sm font-semibold text-foreground">{lesson.exercise.title}</p>

            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {lesson.exercise.steps.map((st, i) => (
                <li key={i}>• {st}</li>
              ))}
            </ul>

            <p className="mt-2 text-xs text-muted-foreground">
              Deliverable: {lesson.exercise.deliverable}
            </p>
          </div>
        )}
      </article>

      <section className="bento-card mt-6 p-7">
        <h2 className="font-display text-xl font-bold">Quiz</h2>

        <div className="mt-5 space-y-6">
          {quiz.map((q, qi) => (
            <div key={qi}>
              <p className="font-semibold">
                {qi + 1}. {q.q}
              </p>

              <div className="mt-3 space-y-2">
                {q.options.map((opt, oi) => {
                  const selected = answers[String(qi)] === oi;
                  const correct = graded && oi === q.answer;
                  const wrong = graded && selected && oi !== q.answer;

                  return (
                    <button
                      key={oi}
                      type="button"
                      aria-pressed={selected}
                      onClick={() =>
                        !graded &&
                        setAnswers((a) => ({
                          ...a,
                          [String(qi)]: oi,
                        }))
                      }
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm ${
                        correct
                          ? "border-success/60 bg-success/10"
                          : wrong
                            ? "border-destructive/60 bg-destructive/10"
                            : selected
                              ? "border-primary bg-primary/10"
                              : "border-border hover:bg-accent"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {graded && <p className="mt-2 text-xs text-muted-foreground">{q.explain}</p>}
            </div>
          ))}
        </div>

        {error && <p className="mt-4 text-sm font-medium text-destructive">{error}</p>}

        <div className="mt-7 flex flex-wrap items-center gap-4">
          {!graded ? (
            <button
              type="button"
              onClick={() => setGraded(true)}
              disabled={Object.keys(answers).length < quiz.length}
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              Hubi jawaabaha
            </button>
          ) : (
            <>
              <p className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="size-4 text-success" />
                Dhibcahaaga: {score}/{quiz.length}
              </p>

              <button
                type="button"
                onClick={finish}
                disabled={busy}
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                {busy ? "..." : next ? "Dhammaystir & cashar xiga" : "Dhammaystir module-ka"}
              </button>
            </>
          )}
        </div>
      </section>

      <nav className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={!prev}
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-40"
        >
          <ArrowLeft className="size-4" />
          Cashar hore
        </button>

        <span className="text-xs text-muted-foreground">
          Cashar {idx + 1} / {mod.lessonList.length}
        </span>

        {next ? (
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/learn/$module/$lesson",
                params: {
                  module: mod.slug,
                  lesson: next.slug,
                },
              })
            }
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold"
          >
            Cashar xiga
            <ArrowRight className="size-4" />
          </button>
        ) : (
          <Link
            to="/courses/$module"
            params={{ module: mod.slug }}
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold"
          >
            Dhammaystir
            <CheckCircle2 className="size-4" />
          </Link>
        )}
      </nav>
    </PageShell>
  );
}
