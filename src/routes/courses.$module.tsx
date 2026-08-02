import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, BookOpen, CheckCircle2, Clock, Target } from "lucide-react";
import { PageShell } from "@/components/site/Shell";
import { findModule, modules } from "@/lib/curriculum";
import { getStudentData, enrollModule } from "@/lib/learning.functions";
import { moduleProgress } from "@/lib/progress";
import { useSessionUser } from "@/hooks/useSessionUser";

export const Route = createFileRoute("/courses/$module")({
  head: ({ params }) => {
    const mod = findModule(params.module);
    const title = mod ? `${mod.english} — SomTrust Cyber Academy` : "Module — SomTrust Cyber Academy";
    const description = mod?.outcome ?? "Module cybersecurity af Soomaali ah.";
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 155) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ModulePage,
});

function ModulePage() {
  const { module: slug } = Route.useParams();
  const mod = findModule(slug);
  const { user } = useSessionUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchData = useServerFn(getStudentData);
  const enroll = useServerFn(enrollModule);

  const { data } = useQuery({
    queryKey: ["student"],
    queryFn: () => fetchData(),
    enabled: !!user,
  });

  if (!mod) {
    return (
      <PageShell>
        <h1 className="font-display text-2xl font-bold">Module lama helin</h1>
        <Link to="/courses" className="mt-4 inline-block text-primary hover:underline">
          ← Dhammaan courses
        </Link>
      </PageShell>
    );
  }

  const enrolled = (data?.enrollments ?? []).some((e) => e.module_slug === mod.slug);
  const prog = moduleProgress(mod.slug, data?.progress ?? []);
  const index = modules.findIndex((m) => m.slug === mod.slug);

  async function handleEnroll() {
    if (!user) {
      navigate({ to: "/auth", search: { mode: "signup" } });
      return;
    }
    await enroll({ data: { moduleSlug: mod!.slug } });
    await queryClient.invalidateQueries({ queryKey: ["student"] });
  }

  return (
    <PageShell>
      <Link to="/courses" className="text-sm text-muted-foreground hover:text-foreground">
        ← Course catalog
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="bento-card p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Module {String(index + 1).padStart(2, "0")} · {mod.stage}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold">{mod.title}</h1>
          <p className="text-primary">{mod.english}</p>
          <p className="mt-4 text-muted-foreground">{mod.outcome}</p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BookOpen className="size-4" /> {mod.lessons} cashar
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> {mod.hours} saac
            </span>
            <span className="flex items-center gap-1.5">
              <Target className="size-4" /> {prog.done}/{prog.total} dhammaystiran
            </span>
          </div>

          <div className="mt-6">
            {enrolled ? (
              <Link
                to="/learn/$module/$lesson"
                params={{ module: mod.slug, lesson: mod.lessonList[0]!.slug }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Sii wad barashada <ArrowRight className="size-4" />
              </Link>
            ) : (
              <button
                onClick={handleEnroll}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Isdiiwaangeli module-kan <ArrowRight className="size-4" />
              </button>
            )}
          </div>
        </div>

        <aside className="bento-card p-7">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Mawduucyada
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {mod.topics.map((t) => (
              <li key={t} className="flex gap-2 text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /> {t}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <h2 className="mt-10 font-display text-xl font-bold">Casharrada</h2>
      <div className="mt-4 space-y-3">
        {mod.lessonList.map((l, i) => {
          const done = (data?.progress ?? []).some(
            (p) => p.module_slug === mod.slug && p.lesson_slug === l.slug,
          );
          return (
            <Link
              key={l.slug}
              to="/learn/$module/$lesson"
              params={{ module: mod.slug, lesson: l.slug }}
              className="bento-card flex items-start gap-4 p-5 transition-colors hover:border-primary/50"
            >
              <span
                className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                  done ? "bg-success/20 text-success" : "bg-primary/15 text-primary"
                }`}
              >
                {done ? <CheckCircle2 className="size-4" /> : i + 1}
              </span>
              <span className="flex-1">
                <span className="block font-display font-semibold">{l.title}</span>
                <span className="block text-xs text-primary">{l.english}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{l.summary}</span>
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">{l.minutes} daq</span>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
