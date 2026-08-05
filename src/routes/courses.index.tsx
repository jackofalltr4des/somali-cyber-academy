import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Clock, Layers } from "lucide-react";
import { modules, totalHours, totalLessons } from "@/lib/curriculum";

const title = "Course Catalog — SomTrust Cyber Academy";
const description =
  "8 module oo Junior SOC Analyst ah: aasaaska IT, networking, Linux, cybersecurity basics, phishing, SIEM, threat detection iyo incident response — af Soomaali.";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoursesIndexPage,
});

const stageColor: Record<string, string> = {
  Aasaas: "bg-primary/15 text-primary",
  Dhexe: "bg-warning/15 text-warning",
  Sare: "bg-success/15 text-success",
};

function CoursesIndexPage() {
  return (
    <>
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Course Catalog
        </p>

        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Manhajka{" "}
          <span className="text-gradient-indigo">
            Junior SOC Analyst
          </span>
        </h1>

        <p className="mt-3 text-muted-foreground">
          {modules.length} module, {totalLessons} cashar, {totalHours} saac.
          Sharraxaad af Soomaali oo leh ereyada farsamada Ingiriisiga —
          sida shaqada dhabta ah.
        </p>
      </header>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((m, i) => (
          <Link
            key={m.slug}
            to="/courses/$module"
            params={{ module: m.slug }}
            className="bento-card group flex flex-col p-6 transition-colors hover:border-primary/50"
          >
            <div className="flex items-center justify-between">
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${stageColor[m.stage]}`}
              >
                {m.stage}
              </span>

              <span className="font-display text-xs text-muted-foreground">
                Module {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <h2 className="mt-4 font-display text-lg font-bold leading-snug">
              {m.title}
            </h2>

            <p className="text-sm text-primary">
              {m.english}
            </p>

            <p className="mt-3 flex-1 text-sm text-muted-foreground">
              {m.outcome}
            </p>

            <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <BookOpen className="size-3.5" />
                {m.lessons} cashar
              </span>

              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {m.hours}h
              </span>

              <span className="ml-auto flex items-center gap-1.5 font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                <Layers className="size-3.5" />
                Fur
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}