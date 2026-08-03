import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Award, BookOpen, Flame, FlaskConical, PlayCircle, Route as RouteIcon, Sparkles } from "lucide-react";
import { PageShell } from "@/components/site/Shell";
import { getStudentData } from "@/lib/learning.functions";
import { findModule, modules, totalLessons } from "@/lib/curriculum";
import { labCatalog } from "@/lib/labs";
import { moduleProgress, overallProgress, quizAverage, badges as computeBadges } from "@/lib/progress";
import { careerPathList, learningStreak, pathProgress, recommendedNext } from "@/lib/paths";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard-ka Ardayga — SomTrust Cyber Academy" },
      {
        name: "description",
        content: "Eeg horumarkaaga: casharrada dhammaystiran, celceliska quiz-yada, labs, streak iyo badges.",
      },
      { property: "og:title", content: "Dashboard-ka Ardayga — SomTrust Cyber Academy" },
      { property: "og:description", content: "Horumarka barashada cybersecurity af Soomaali." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const fetchData = useServerFn(getStudentData);
  const { data, isLoading } = useQuery({ queryKey: ["student"], queryFn: () => fetchData() });

  const progress = data?.progress ?? [];
  const labs = data?.labs ?? [];
  const certs = data?.certificates ?? [];
  const overall = overallProgress(progress);
  const avg = quizAverage(progress);
  const badges = computeBadges(progress, labs, certs.length).filter((b) => b.earned);
  const streak = learningStreak(progress);
  const next = recommendedNext(progress, labs);
  const socPath = careerPathList[0]!;
  const socProgress = pathProgress(socPath, progress);

  const quizHistory = [...progress]
    .filter((r) => r.quiz_total > 0)
    .sort((a, b) => (b.completed_at ?? "").localeCompare(a.completed_at ?? ""))
    .slice(0, 8);

  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold">
        Salaan, {data?.profile?.display_name || "Arday"} 👋
      </h1>
      <p className="mt-2 text-muted-foreground">
        {isLoading ? "Waa la soo raraya..." : `Waxaad dhammaystirtay ${overall.done}/${totalLessons} cashar.`}
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<BookOpen className="size-4" />} label="Casharro" value={`${overall.done}/${totalLessons}`} />
        <Stat icon={<Sparkles className="size-4" />} label="Celcelis quiz" value={`${avg}%`} />
        <Stat
          icon={<FlaskConical className="size-4" />}
          label="Labs la gudbay"
          value={`${new Set(labs.filter((l) => l.passed).map((l) => l.lab_slug)).size}/${labCatalog.length}`}
        />
        <Stat icon={<Flame className="size-4" />} label="Streak" value={streak ? `${streak} maalmood` : "0"} />
      </div>

      <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-surface-raised">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${overall.percent}%` }} />
      </div>

      {/* Resume learning */}
      <section className="bento-card mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
            <PlayCircle className="size-4" /> Sii wad barashada
          </p>
          {next.kind === "lesson" ? (
            <>
              <p className="mt-2 font-display text-lg font-bold">{next.lesson.title}</p>
              <p className="text-sm text-muted-foreground">
                {next.module.title} · {next.lesson.english}
              </p>
            </>
          ) : next.kind === "lab" ? (
            <>
              <p className="mt-2 font-display text-lg font-bold">{next.lab.title}</p>
              <p className="text-sm text-muted-foreground">Lab: {next.lab.english}</p>
            </>
          ) : (
            <>
              <p className="mt-2 font-display text-lg font-bold">Waxaad diyaar u tahay shahaadada</p>
              <p className="text-sm text-muted-foreground">Celceliskaaga quiz: {next.average}%</p>
            </>
          )}
        </div>
        {next.kind === "lesson" ? (
          <Link
            to="/learn/$module/$lesson"
            params={{ module: next.module.slug, lesson: next.lesson.slug }}
            className="shrink-0 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Sii wad
          </Link>
        ) : next.kind === "lab" ? (
          <Link
            to="/labs/$labSlug"
            params={{ labSlug: next.lab.slug }}
            className="shrink-0 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Fur lab-ka
          </Link>
        ) : (
          <Link to="/certificate" className="shrink-0 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            Shahaadada
          </Link>
        )}
      </section>

      {/* Career path progress */}
      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Waddada xirfaddaada</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {careerPathList.map((p) => {
            const pp = pathProgress(p, progress);
            return (
              <Link
                key={p.slug}
                to="/paths/$path"
                params={{ path: p.slug }}
                className="bento-card p-5 transition-colors hover:border-primary/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 font-display font-semibold">
                    <RouteIcon className="size-4 text-primary" /> {p.english}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {p.status === "live" ? `${pp.percent}%` : "Coming soon"}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-raised">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${pp.percent}%` }} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {pp.available}/{pp.courses} koorsooyin diyaar
                </p>
              </Link>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Waddada SOC Analyst: {socProgress.done}/{socProgress.total} casharro la dhammeeyay.
        </p>
      </section>

      <h2 className="mt-10 font-display text-xl font-bold">Modules-kaaga</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {modules.map((m) => {
          const p = moduleProgress(m.slug, progress);
          return (
            <Link
              key={m.slug}
              to="/courses/$module"
              params={{ module: m.slug }}
              className="bento-card p-5 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display font-semibold">{m.title}</h3>
                <span className="text-xs text-muted-foreground">
                  {p.done}/{p.total}
                </span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-raised">
                <div className="h-full rounded-full bg-primary" style={{ width: `${p.percent}%` }} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quiz history */}
      {quizHistory.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold">Taariikhda quiz-yada</h2>
          <div className="bento-card mt-4 overflow-x-auto p-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-3 py-2">Cashar</th>
                  <th className="px-3 py-2">Module</th>
                  <th className="px-3 py-2">Dhibco</th>
                  <th className="px-3 py-2">Taariikh</th>
                </tr>
              </thead>
              <tbody>
                {quizHistory.map((r) => {
                  const mod = findModule(r.module_slug);
                  const lesson = mod?.lessonList.find((l) => l.slug === r.lesson_slug);
                  const pct = Math.round((r.quiz_score / r.quiz_total) * 100);
                  return (
                    <tr key={`${r.module_slug}/${r.lesson_slug}`} className="border-t border-border/60">
                      <td className="px-3 py-2">{lesson?.title ?? r.lesson_slug}</td>
                      <td className="px-3 py-2 text-muted-foreground">{mod?.title ?? r.module_slug}</td>
                      <td className="px-3 py-2">
                        <span className={pct >= 80 ? "font-semibold text-primary" : "text-muted-foreground"}>
                          {r.quiz_score}/{r.quiz_total} · {pct}%
                        </span>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">
                        {r.completed_at ? new Date(r.completed_at).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {badges.length > 0 && (
        <>
          <h2 className="mt-10 flex items-center gap-2 font-display text-xl font-bold">
            <Award className="size-5 text-primary" /> Badges
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {badges.map((b) => (
              <span key={b.id} className="bento-card px-4 py-3 text-sm">
                <span className="font-display font-semibold">{b.name}</span>
                <span className="block text-xs text-muted-foreground">{b.somali}</span>
              </span>
            ))}
          </div>
        </>
      )}
    </PageShell>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bento-card p-5">
      <span className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon} {label}
      </span>
      <p className="mt-2 font-display text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}
