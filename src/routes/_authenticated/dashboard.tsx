import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Award, BookOpen, FlaskConical, Sparkles } from "lucide-react";
import { PageShell } from "@/components/site/Shell";
import { getStudentData } from "@/lib/learning.functions";
import { modules, totalLessons } from "@/lib/curriculum";
import { moduleProgress, overallProgress, quizAverage, badges as computeBadges } from "@/lib/progress";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard-ka Ardayga — SomTrust Cyber Academy" },
      {
        name: "description",
        content: "Eeg horumarkaaga: casharrada dhammaystiran, celceliska quiz-yada, labs iyo badges.",
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
  const overall = overallProgress(progress);
  const avg = quizAverage(progress);
  const badges = computeBadges(progress, labs, 0).filter((b) => b.earned);

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
        <Stat icon={<FlaskConical className="size-4" />} label="Labs la gudbay" value={`${labs.filter((l) => l.passed).length}/4`} />
        <Stat icon={<Award className="size-4" />} label="Badges" value={`${badges.length}`} />
      </div>

      <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-surface-raised">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${overall.percent}%` }} />
      </div>

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

      {badges.length > 0 && (
        <>
          <h2 className="mt-10 font-display text-xl font-bold">Badges</h2>
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
