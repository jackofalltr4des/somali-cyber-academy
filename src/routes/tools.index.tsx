import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Wrench } from "lucide-react";
import { toolDeepDiveModules } from "@/lib/tool-deep-dives";

const title = "Tool Deep-Dives — SomTrust Cyber Academy";
const description =
  "Baro tools-ka industry-gu ugu isticmaalo badan qoto dheer ahaan — Wireshark, Nmap, Burp Suite, Metasploit, CyberChef, Splunk, Hashcat iyo OSINT tools.";

export const Route = createFileRoute("/tools/")({
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
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <>
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-1 text-xs text-muted-foreground">
        <Wrench className="size-3.5 text-primary" /> Tool Deep-Dives
      </span>

      <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
        Tools-ka industry-ga
      </h1>

      <p className="mt-3 max-w-2xl text-muted-foreground">
        Koorso kastaa waxay diiradda saartaa tool hal ah oo qoto dheer ah —
        ku habboon marka aad hore u dhammaystirtay waddo xirfad ah, ama
        aad doonayso in aad si gaar ah u xoojiso tool gaar ah.
      </p>

      <div className="mt-9 grid gap-5 md:grid-cols-2">
        {toolDeepDiveModules.map((mod) => (
          <div key={mod.slug} className="bento-card flex flex-col p-6">
            <div>
              <h2 className="font-display text-xl font-bold">{mod.title}</h2>
              <p className="text-sm text-primary">{mod.english}</p>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              {mod.outcome}
            </p>

            <dl className="mt-5 grid grid-cols-3 gap-3 text-xs">
              <Meta k="Heerka" v={mod.stage} />
              <Meta k="Casharro" v={`${mod.lessons}`} />
              <Meta k="Saacado" v={`${mod.hours}h`} />
            </dl>

            <Link
              to="/courses/$module"
              params={{ module: mod.slug }}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Fur koorsada <ArrowRight className="size-4" />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-surface p-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="mt-0.5 font-display text-base font-bold text-foreground">
        {v}
      </dd>
    </div>
  );
}
