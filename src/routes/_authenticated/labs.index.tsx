import { createFileRoute, Link } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import { labCatalog } from "@/lib/labs";

export const Route = createFileRoute("/_authenticated/labs/")({
  component: LabsIndexPage,
});

function LabsIndexPage() {
  return (
    <>
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Security Labs
        </p>

        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Cyber Labs
        </h1>

        <p className="mt-3 text-muted-foreground">
          Ku tababar xirfadaha cybersecurity adigoo adeegsanaya labs dhab ah:
          log analysis, investigation, threat detection iyo incident response.
        </p>
      </header>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {labCatalog.map((lab) => (
          <Link
            key={lab.slug}
            to="/labs/$labSlug"
            params={{ labSlug: lab.slug }}
            className="bento-card p-6 transition-colors hover:border-primary/50"
          >
            <div className="flex items-center gap-2 text-xs text-primary">
              <FlaskConical className="size-4" />
              {lab.level}
            </div>

            <h2 className="mt-3 font-display text-xl font-bold">
              {lab.title}
            </h2>

            <p className="mt-1 text-sm text-primary">
              {lab.english}
            </p>

            <p className="mt-3 text-sm text-muted-foreground">
              {lab.scenario}
            </p>

            <p className="mt-4 text-sm font-semibold text-primary">
              Fur lab-ka →
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}