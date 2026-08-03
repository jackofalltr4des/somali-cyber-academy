import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock, Route as RouteIcon } from "lucide-react";
import { PageShell } from "@/components/site/Shell";
import { careerPathList, pathModules } from "@/lib/paths";

const title = "Career Paths — SomTrust Cyber Academy";
const description =
  "Dooro waddo xirfad cybersecurity: SOC Analyst, Ethical Hacking, Digital Forensics iyo Cloud Security — af Soomaali oo leh ereyo Ingiriisi ah.";

export const Route = createFileRoute("/paths")({
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
  component: PathsPage,
});

function PathsPage() {
  return (
    <PageShell>
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-1 text-xs text-muted-foreground">
        <RouteIcon className="size-3.5 text-primary" /> Learning paths
      </span>
      <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Waddooyinka xirfadda</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Waddo kastaa waxay leedahay heer adkaan, liis koorsooyin ah, nidaam barasho la talis ah iyo natiijo
        shaqo. Waddada <strong className="text-foreground">SOC Analyst</strong> ayaa hadda diyaar ah oo buuxda.
      </p>

      <div className="mt-9 grid gap-5 md:grid-cols-2">
        {careerPathList.map((p) => {
          const available = pathModules(p).length;
          return (
            <div key={p.slug} className="bento-card flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold">{p.title}</h2>
                  <p className="text-sm text-primary">{p.english}</p>
                </div>
                <span
                  className={
                    p.status === "live"
                      ? "rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary"
                      : "flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  }
                >
                  {p.status === "live" ? "Diyaar" : <><Lock className="size-3" /> Coming soon</>}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.tagline}</p>
              <dl className="mt-5 grid grid-cols-3 gap-3 text-xs">
                <Meta k="Heerka" v={p.level} />
                <Meta k="Koorsooyin" v={`${p.courses.length}`} />
                <Meta k="Diyaar" v={`${available}`} />
              </dl>
              <p className="mt-4 text-xs text-muted-foreground">
                <strong className="text-foreground">Natiijada shaqo:</strong> {p.outcome}
              </p>
              <Link
                to="/paths/$path"
                params={{ path: p.slug }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Eeg waddada <ArrowRight className="size-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-surface p-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="mt-0.5 font-display text-base font-bold text-foreground">{v}</dd>
    </div>
  );
}
