import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock, Briefcase } from "lucide-react";
import { careerPathList } from "@/lib/paths";
import { careerRoadmaps } from "@/lib/careerRoadmaps";

const title = "Career Roadmaps — SomTrust Cyber Academy";
const description =
  "Dooro waddo shaqo cybersecurity oo leh roadmap tallaabo tallaabo ah: SOC Analyst ama Ethical Hacking — af Soomaali oo leh ereyo Ingiriisi ah.";

export const Route = createFileRoute("/careers/")({
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
  component: CareersIndexPage,
});

function CareersIndexPage() {
  return (
    <>
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-1 text-xs text-muted-foreground">
        <Briefcase className="size-3.5 text-primary" /> Career Roadmaps
      </span>

      <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
        Waddada <span className="text-gradient-indigo">shaqada cybersecurity</span>
      </h1>

      <p className="mt-3 max-w-2xl text-muted-foreground">
        Waddo kastaa waxay leedahay roadmap gaarkeeda ah: Beginner → Tier 1 →
        Advanced, oo leh shahaadooyinka saxda ah waqti kasta. Dooro waddada
        aad raadinayso.
      </p>

      <div className="mt-9 grid gap-5 md:grid-cols-2">
        {careerPathList.map((p) => {
          const hasRoadmap = Boolean(careerRoadmaps[p.slug]);

          return (
            <Link
              key={p.slug}
              to="/careers/$path"
              params={{ path: p.slug }}
              className="bento-card flex flex-col p-6 transition-colors hover:border-primary/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold">{p.title}</h2>
                  <p className="text-sm text-primary">{p.english}</p>
                </div>

                <span
                  className={
                    hasRoadmap
                      ? "rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary"
                      : "flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  }
                >
                  {hasRoadmap ? (
                    "Diyaar"
                  ) : (
                    <>
                      <Lock className="size-3" /> Coming soon
                    </>
                  )}
                </span>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">{p.tagline}</p>

              <p className="mt-4 text-xs text-muted-foreground">
                <strong className="text-foreground">Natiijada shaqo:</strong>{" "}
                {p.outcome}
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                Eeg roadmap-ka <ArrowRight className="size-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
