import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  DollarSign,
  Flame,
  FlaskConical,
  Gift,
  CirclePlay as PlayCircle,
  Route as RouteIcon,
  Sparkles,
  Users,
} from "lucide-react";
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
  const payments = data?.payments ?? [];
  const referrals = data?.referrals ?? [];
  const overall = overallProgress(progress);
  const avg = quizAverage(progress);
  const badges = computeBadges(progress, labs, certs.length).filter((b) => b.earned);
  const streak = learningStreak(progress);
  const next = recommendedNext(progress, labs);
  const socPath = careerPathList[0]!;
  const socProgress = pathProgress(socPath, progress);

  const earnedReferrals = referrals.filter((r) => r.status === "earned" || r.status === "paid");
  const totalCommission = earnedReferrals.reduce((n, r) => n + Number(r.commission_usd), 0);
  const passedLabs = new Set(labs.filter((l) => l.passed).map((l) => l.lab_slug)).size;

  const quizHistory = [...progress]
    .filter((r) => r.quiz_total > 0)
    .sort((a, b) => (b.completed_at ?? "").localeCompare(a.completed_at ?? ""))
    .slice(0, 5);

  const recentPayments = payments.slice(0, 3);

  // Recent activity: combine progress + labs, sort by date
  const recentActivity = [
    ...progress.map((p) => ({
      type: "lesson" as const,
      date: p.completed_at ?? "",
      label: (() => {
        const mod = findModule(p.module_slug);
        const lesson = mod?.lessonList.find((l) => l.slug === p.lesson_slug);
        return lesson?.title ?? p.lesson_slug;
      })(),
    })),
    ...labs.map((l) => ({
      type: "lab" as const,
      date: l.created_at ?? "",
      label: labCatalog.find((lb) => lb.slug === l.lab_slug)?.title ?? l.lab_slug,
    })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold">
        Salaan, {data?.profile?.display_name || "Arday"}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {isLoading ? "Waa la soo raraya..." : `Waxaad dhammaystirtay ${overall.done}/${totalLessons} cashar.`}
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<BookOpen className="size-4" />} label="Casharro" value={`${overall.done}/${totalLessons}`} />
        <Stat icon={<Sparkles className="size-4" />} label="Celcelis quiz" value={`${avg}%`} />
        <Stat icon={<FlaskConical className="size-4" />} label="Labs la gudbay" value={`${passedLabs}/${labCatalog.length}`} />
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

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Career path progress */}
        <section>
          <h2 className="font-display text-xl font-bold">Waddada xirfaddaada</h2>
          <div className="mt-4 space-y-3">
            {careerPathList.map((p) => {
              const pp = pathProgress(p, progress);
              return (
                <Link
                  key={p.slug}
                  to="/paths/$path"
                  params={{ path: p.slug }}
                  className="bento-card flex items-center justify-between gap-3 p-5 transition-colors hover:border-primary/50"
                >
                  <div className="flex items-center gap-3">
                    <RouteIcon className="size-4 text-primary" />
                    <div>
                      <p className="font-display font-semibold">{p.english}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.status === "live" ? `${pp.available}/${pp.courses} koorsooyin` : "Coming soon"}
                      </p>
                    </div>
                  </div>
                  {p.status === "live" && (
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-raised">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${pp.percent}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-primary">{pp.percent}%</span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Referral earnings */}
        <section>
          <h2 className="flex items-center gap-2 font-display text-xl font-bold">
            <Gift className="size-5 text-primary" /> Referral earnings
          </h2>
          <div className="bento-card mt-4 p-5">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="size-3" /> Arday
                </p>
                <p className="mt-1 font-display text-xl font-bold text-primary">{referrals.length}</p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <DollarSign className="size-3" /> La kasbay
                </p>
                <p className="mt-1 font-display text-xl font-bold text-primary">${totalCommission.toFixed(2)}</p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle2 className="size-3" /> La bixiyay
                </p>
                <p className="mt-1 font-display text-xl font-bold text-success">
                  ${referrals.filter((r) => r.status === "paid").reduce((n, r) => n + Number(r.commission_usd), 0).toFixed(2)}
                </p>
              </div>
            </div>
            <Link
              to="/referrals"
              className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Eeg referral system →
            </Link>
          </div>
        </section>
      </div>

      {/* Modules */}
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

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Recent activity */}
        <section>
          <h2 className="font-display text-xl font-bold">Halababka dhawaan</h2>
          <div className="bento-card mt-4 p-4">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-muted-foreground">Wax halabab ah ma jirto.</p>
            ) : (
              <ul className="space-y-3">
                {recentActivity.map((a, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    {a.type === "lesson" ? (
                      <BookOpen className="size-4 shrink-0 text-primary" />
                    ) : (
                      <FlaskConical className="size-4 shrink-0 text-primary" />
                    )}
                    <span className="flex-1 truncate">{a.label}</span>
                    {a.date && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" /> {new Date(a.date).toLocaleDateString()}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Payment history */}
        <section>
          <h2 className="font-display text-xl font-bold">Lacag-bixinta dhawaan</h2>
          <div className="bento-card mt-4 p-4">
            {recentPayments.length === 0 ? (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Wax lacag-bixin ah ma jirto.</p>
                <Link
                  to="/payments"
                  className="mt-3 inline-block rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Bixi lacag
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {recentPayments.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="capitalize">
                      {p.item_type === "course" ? "Course" : p.item_type === "exam" ? "Imtixaanka" : "Shahaadada"}
                    </span>
                    <span className="font-semibold">${p.amount_usd}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        p.status === "approved"
                          ? "bg-success/15 text-success"
                          : p.status === "rejected"
                            ? "bg-destructive/15 text-destructive"
                            : "bg-warning/15 text-warning"
                      }`}
                    >
                      {p.status === "approved" ? "Oggolaaday" : p.status === "rejected" ? "La diiday" : "Sugitaan"}
                    </span>
                  </li>
                ))}
                <li>
                  <Link to="/payments" className="text-sm font-semibold text-primary hover:underline">
                    Eeg dhammaan →
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </section>
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
