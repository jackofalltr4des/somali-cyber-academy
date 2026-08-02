import { createFileRoute, Link } from "@tanstack/react-router";
import { FlaskConical, Clock } from "lucide-react";
import { PageShell } from "@/components/site/Shell";
import { labCatalog } from "@/lib/labs";

export const Route = createFileRoute("/_authenticated/labs")({
  head: () => ({
    meta: [
      { title: "SOC Labs — SomTrust Cyber Academy" },
      {
        name: "description",
        content: "4 lab SOC ah oo dhab ah: log analysis, phishing investigation, suspicious IP iyo incident reporting.",
      },
      { property: "og:title", content: "SOC Labs — SomTrust Cyber Academy" },
      { property: "og:description", content: "Tababar hands-on ah oo SOC Tier 1 ah af Soomaali." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LabsPage,
});

function LabsPage() {
  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold">
        Cybersecurity <span className="text-gradient-indigo">Labs</span>
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Labs dhab ah oo leh log-yo, email headers iyo firewall data. Falanqee, ka jawaab su'aalaha, oo
        qor warbixin sida SOC Analyst.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {labCatalog.map((lab) => (
          <Link
            key={lab.slug}
            to="/labs/$labSlug"
            params={{ labSlug: lab.slug }}
            className="bento-card p-6 transition-colors hover:border-primary/50"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary">
                {lab.level}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5" /> {lab.minutes} daq
              </span>
            </div>
            <h2 className="mt-4 font-display text-lg font-bold">{lab.somali}</h2>
            <p className="text-sm text-primary">{lab.english}</p>
            <p className="mt-3 text-sm text-muted-foreground">{lab.scenario}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <FlaskConical className="size-4" /> Bilow lab-ka
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
