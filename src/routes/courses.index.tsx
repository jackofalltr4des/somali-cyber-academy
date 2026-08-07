import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Clock, Layers } from "lucide-react";
import { modules } from "@/lib/curriculum";
import { ethicalHackingModules } from "@/lib/ethical-hacking-curriculum";
import { digitalForensicsModules } from "@/lib/digital-forensics-curriculum";
import { cloudSecurityModules } from "@/lib/cloud-security-curriculum";
import { toolDeepDiveModules } from "@/lib/tool-deep-dives";

const pathModuleSlugs = new Set(
  [...modules, ...ethicalHackingModules, ...digitalForensicsModules, ...cloudSecurityModules].map(
    (m) => m.slug,
  ),
);

const allModules = [
  ...modules,
  ...ethicalHackingModules,
  ...digitalForensicsModules,
  ...cloudSecurityModules,
  ...toolDeepDiveModules,
];
const allLessons = allModules.reduce((n, m) => n + m.lessons, 0);
const allHours = allModules.reduce((n, m) => n + m.hours, 0);

const title = "Course Catalog — SomTrust Cyber Academy";
const description =
  "Dhammaan koorsooyinka: SOC Analyst, Ethical Hacking, Digital Forensics, Cloud Security, iyo Tool Deep-Dives bilaash ah — af Soomaali oo leh ereyada farsamada Ingiriisiga.";

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
          Dhammaan{" "}
          <span className="text-gradient-indigo">
            Koorsooyinka
          </span>
        </h1>

        <p className="mt-3 text-muted-foreground">
          {allModules.length} module, {allLessons} cashar, {allHours} saac.
          Sharraxaad af Soomaali oo leh ereyada farsamada Ingiriisiga —
          sida shaqada dhabta ah.
        </p>
      </header>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {allModules.map((m, i) => {
          const isFree = !pathModuleSlugs.has(m.slug);
          return (
            <Link
              key={m.slug}
              to="/courses/$module"
              params={{ module: m.slug }}
              className="bento-card group flex flex-col p-6 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${stageColor[m.stage]}`}
                  >
                    {m.stage}
                  </span>
                  {isFree && (
                    <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-semibold text-success">
                      Bilaash
                    </span>
                  )}
                </div>

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
          );
        })}
      </div>
    </>
  );
}
