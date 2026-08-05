import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, FlaskConical, Lock } from "lucide-react";
import { findPath } from "@/lib/paths";
import { findModule } from "@/lib/curriculum";
import { labCatalog } from "@/lib/labs";

export const Route = createFileRoute("/paths/$path")({
  head: ({ params }) => {
    const path = findPath(params.path);
    const title = `${path?.english ?? "Career path"} — SomTrust Cyber Academy`;
    const description = (
      path?.tagline ?? "Waddo xirfad cybersecurity af Soomaali."
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

  loader: ({ params }) => {
    console.log("PATH PARAM:", params.path);
    console.log("FOUND PATH:", findPath(params.path));
    return null;
  },

  errorComponent: () => (
    <>
      <h1 className="font-display text-2xl font-bold">Khalad dhacay</h1>
      <Link
        to="/paths"
        className="mt-4 inline-block text-primary hover:underline"
      >
        ← Career paths
      </Link>
    </>
  ),

  notFoundComponent: () => (
    <>
      <h1 className="font-display text-2xl font-bold">Waddo lama helin</h1>
      <Link
        to="/paths"
        className="mt-4 inline-block text-primary hover:underline"
      >
        ← Career paths
      </Link>
    </>
  ),

  component: PathDetail,
});

function PathDetail() {
  const { path: slug } = Route.useParams();
  const path = findPath(slug);

  if (!path) {
    return <div>Path not found</div>;
  }

  const labs = labCatalog.filter((l) => path.labSlugs.includes(l.slug));

  return (
    <>
      <Link
        to="/paths"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Career paths
      </Link>

      <header className="mt-4">
        <h1 className="font-display text-3xl font-bold">{path.title}</h1>
        <p className="mt-1 text-primary">{path.english}</p>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {path.tagline}
        </p>

        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">
            Heerka: {path.level}
          </span>

          {path.certs.map((c) => (
            <span
              key={c}
              className="rounded-full bg-primary/15 px-3 py-1 font-semibold text-primary"
            >
              {c}
            </span>
          ))}
        </div>
      </header>

      <section className="mt-9">
        <h2 className="font-display text-xl font-bold">
          Koorsooyinka waddada
        </h2>

        <ol className="mt-4 space-y-3">
          {path.courses.map((c, i) => {
            const mod = c.moduleSlug
              ? findModule(c.moduleSlug)
              : undefined;

            return (
              <li
                key={c.slug}
                className="bento-card flex items-center justify-between gap-4 p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-xs font-bold text-primary">
                    {i + 1}
                  </span>

                  <div>
                    <p className="font-semibold">{c.title}</p>

                    <p className="text-xs text-muted-foreground">
                      {c.english}
                      {mod
                        ? ` · ${mod.lessons} casharro · ${mod.hours}h`
                        : ""}
                    </p>
                  </div>
                </div>

                {mod ? (
                  <Link
                    to="/courses/$module"
                    params={{ module: mod.slug }}
                    className="flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
                  >
                    <BookOpen className="size-3.5" /> Bilow
                  </Link>
                ) : (
                  <span className="flex shrink-0 items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground">
                    <Lock className="size-3.5" /> Coming soon
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {labs.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold">
            Labs-ka waddada
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {labs.map((l) => (
              <Link
                key={l.slug}
                to="/labs/$labSlug"
                params={{ labSlug: l.slug }}
                className="bento-card p-5 transition-colors hover:border-primary/50"
              >
                <p className="flex items-center gap-2 text-xs text-primary">
                  <FlaskConical className="size-3.5" /> {l.level}
                </p>

                <p className="mt-2 font-semibold">{l.title}</p>
                <p className="text-xs text-muted-foreground">
                  {l.english}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="bento-card mt-10 p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold">
          <CheckCircle2 className="size-5 text-primary" /> Natiijada
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {path.outcome}
        </p>

        <Link
          to="/careers"
          className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
        >
          Eeg roadmap-ka shahaadooyinka →
        </Link>
      </section>
    </>
  );
}