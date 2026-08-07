import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, ArrowRight, Briefcase, GraduationCap, Lock } from "lucide-react";
import { findPath } from "@/lib/paths";
import { careerRoadmaps } from "@/lib/careerRoadmaps";

export const Route = createFileRoute("/careers/$path")({
  head: ({ params }) => {
    const path = findPath(params.path);
    const title = `${path?.english ?? "Career Roadmap"} — SomTrust Cyber Academy`;
    const description = (
      path?.tagline ?? "Waddo shaqo cybersecurity af Soomaali."
    ).slice(0, 155);

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },

  notFoundComponent: () => (
    <>
      <h1 className="font-display text-2xl font-bold">Waddo lama helin</h1>
      <Link to="/careers" className="mt-4 inline-block text-primary hover:underline">
        ← Career roadmaps
      </Link>
    </>
  ),

  component: CareerPathDetail,
});

function CareerPathDetail() {
  const { path: slug } = Route.useParams();
  const path = findPath(slug);
  const roadmap = careerRoadmaps[slug];

  if (!path) {
    return (
      <>
        <h1 className="font-display text-2xl font-bold">Waddo lama helin</h1>
        <Link to="/careers" className="mt-4 inline-block text-primary hover:underline">
          ← Career roadmaps
        </Link>
      </>
    );
  }

  return (
    <>
      <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground">
        ← Career roadmaps
      </Link>

      <header className="mt-4 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Career Roadmap
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          {path.title}
        </h1>
        <p className="mt-1 text-primary">{path.english}</p>
        <p className="mt-3 text-muted-foreground">{path.tagline}</p>
      </header>

      {!roadmap ? (
        <div className="bento-card mt-9 flex flex-col items-start gap-3 p-7">
          <span className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            <Lock className="size-3.5" /> Coming soon
          </span>
          <p className="text-sm text-muted-foreground">
            Roadmap-ka waddadan weli lama diyaarin. Marka koorsooyinka
            waddadan la dhammeeyo, roadmap-kan wuu soo baxayaa halkan.
          </p>
          <Link
            to="/paths/$path"
            params={{ path: path.slug }}
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Eeg waddada koorsooyinka <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-10 space-y-5">
            {roadmap.stages.map((s, i) => (
              <div key={s.stage} className="bento-card grid gap-6 p-7 lg:grid-cols-[1fr_1.4fr]">
                <div>
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 font-display font-bold text-primary">
                    {i + 1}
                  </span>
                  <h2 className="mt-4 font-display text-xl font-bold">{s.stage}</h2>
                  <p className="text-sm text-primary">{s.role}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.months}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{s.somali}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.skills.map((k) => (
                      <span key={k} className="rounded-full bg-surface-raised px-3 py-1 text-xs text-foreground">
                        {k}
                      </span>
                    ))}
                  </div>
                  {s.certs.length > 0 && (
                    <ul className="mt-4 space-y-1.5 text-sm">
                      {s.certs.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-muted-foreground">
                          <Award className="size-4 text-primary" /> {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-display text-2xl font-bold">
            Shahaadooyinka muhiimka ah
          </h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {roadmap.certs.map((c) => (
              <div key={c.name} className="bento-card p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold">{c.name}</h3>
                    <p className="text-xs text-primary">{c.full}</p>
                  </div>
                  <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    {c.level}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{c.somali}</p>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <GraduationCap className="size-4 text-primary" /> Diyaarinta: {c.prep}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="bento-card mt-10 flex flex-col items-start justify-between gap-4 p-7 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-xl font-bold">
            Bilow waddadaada maanta
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Isdiiwaangeli koorsada koowaad ee {path.title}.
          </p>
        </div>
        <Link
          to="/paths/$path"
          params={{ path: path.slug }}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          <Briefcase className="size-4" /> Fur koorsooyinka <ArrowRight className="size-4" />
        </Link>
      </div>
    </>
  );
}
