import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getPlatformStats } from "@/lib/learning.functions";
import {
  Activity,
  BrainCircuit,
  FlaskConical,
  GraduationCap,
  Languages,
  Radar,
  ShieldCheck,
  Terminal,
  TrendingUp,
} from "lucide-react";

const stageColor: Record<string, string> = {
  Aasaas: "bg-success/15 text-success",
  Dhexe: "bg-warning/15 text-warning",
  Sare: "bg-primary/20 text-primary-glow",
};

/**
 * Shared across every Bento section (same queryKey → React Query dedupes
 * to a single network call). Sourced from getPlatformStats — see that
 * function's doc comment for why the homepage fetches this instead of
 * statically importing curriculum.ts (H3 perf fix).
 */
function usePlatformStats() {
  const fetchStats = useServerFn(getPlatformStats);
  const { data } = useQuery({ queryKey: ["platform-stats"], queryFn: () => fetchStats() });
  return data;
}

export function BentoOverview() {
  const stats = usePlatformStats();
  const moduleCount = stats?.moduleCount ?? 0;
  const totalLessons = stats?.totalLessons ?? 0;
  const totalHours = stats?.totalHours ?? 0;
  const labSummaries = stats?.labSummaries ?? [];
  const careerPaths = stats?.careerPaths ?? [];

  return (
    <section id="labs" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-primary-glow">
          Platform-ka
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Wax kasta oo aad u baahan tahay, hal meel
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        <article className="bento-card col-span-1 p-6 md:col-span-4">
          <div className="grid-noise pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
              <GraduationCap className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold">{moduleCount} Module oo isku xiran</h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Laga bilaabo hardware-ka ilaa incident response — {totalLessons} cashar, {totalHours}{" "}
              saac oo video iyo qoraal af Soomaali ah.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { k: String(totalLessons), v: "Cashar" },
                { k: `${totalHours}h`, v: "Waqti" },
                { k: String(labSummaries.length), v: "Lab" },
              ].map((s) => (
                <div key={s.v} className="rounded-xl border border-border bg-background/40 p-3">
                  <p className="font-display text-2xl font-bold text-gradient-indigo">{s.k}</p>
                  <p className="text-xs text-muted-foreground">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="bento-card col-span-1 p-6 md:col-span-2">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
            <Languages className="size-6" />
          </span>
          <h3 className="mt-5 text-lg font-semibold">Somali-first, English terms</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Sharraxaad af Soomaali ah, ereyada farsamada Ingiriisi ah — si aad u gudubto
            imtixaannada caalamiga ah.
          </p>
          <p className="mt-4 rounded-lg border border-border bg-background/40 p-3 font-mono text-xs text-muted-foreground">
            "Firewall waa dabin ilaaliye — wuxuu filter-gareeya traffic-ga."
          </p>
        </article>

        <article className="bento-card col-span-1 p-6 md:col-span-2">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
            <Terminal className="size-6" />
          </span>
          <h3 className="mt-5 text-lg font-semibold">Labs Practical</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Ku shaqee aalado dhabta ah: Wireshark, Wazuh, Splunk, Linux.
          </p>
          <ul className="mt-4 space-y-2">
            {labSummaries.slice(0, 4).map((l) => (
              <li
                key={l.title}
                className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background/40 px-3 py-2"
              >
                <span className="truncate text-xs font-medium">{l.title}</span>
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${stageColor[l.level]}`}
                >
                  {l.level}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="bento-card col-span-1 p-6 md:col-span-2">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
            <Activity className="size-6" />
          </span>
          <h3 className="mt-5 text-lg font-semibold">Horumarkaaga</h3>
          <p className="mt-2 text-sm text-muted-foreground">Track module kasta iyo streak-gaaga.</p>
          <div className="mt-5 space-y-3">
            {[
              { n: "Networking", p: 72 },
              { n: "Linux", p: 45 },
              { n: "SOC Skills", p: 18 },
            ].map((b) => (
              <div key={b.n}>
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>{b.n}</span>
                  <span>{b.p}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-background/70">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${b.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="bento-card col-span-1 p-6 md:col-span-2">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
            <BrainCircuit className="size-6" />
          </span>
          <h3 className="mt-5 text-lg font-semibold">AI Mentor Soomaali</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Weydii su'aalo af Soomaali 24/7, hel tusaalayaal iyo tababar interview.
          </p>
          <div className="mt-4 space-y-2 text-xs">
            <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary/25 px-3 py-2">
              Waa maxay farqiga IDS iyo IPS?
            </p>
            <p className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm border border-border bg-background/50 px-3 py-2 text-muted-foreground">
              IDS wuu ogaadaa oo digniin bixiyaa; IPS wuu joojiyaa weerarka...
            </p>
          </div>
        </article>

        <article id="soc" className="bento-card col-span-1 p-6 md:col-span-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
            <Radar className="size-6" />
          </span>
          <h3 className="mt-5 text-lg font-semibold">SOC Track & Certifications</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Waddo cad oo shaqo ilaa Tier 1 analyst.
          </p>
          <ul className="mt-5 divide-y divide-border">
            {careerPaths.map((c) => (
              <li key={c.role} className="flex items-center justify-between gap-3 py-2.5">
                <div>
                  <p className="text-sm font-medium">{c.role}</p>
                  <p className="text-xs text-muted-foreground">{c.cert}</p>
                </div>
                <span className="shrink-0 rounded-md bg-secondary px-2 py-1 text-[11px] font-semibold text-secondary-foreground">
                  {c.months} bilood
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="bento-card col-span-1 p-6 md:col-span-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
            <FlaskConical className="size-6" />
          </span>
          <h3 className="mt-5 text-lg font-semibold">Dhammaan Labs-ka</h3>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {labSummaries.map((l) => (
              <div key={l.title} className="rounded-xl border border-border bg-background/40 p-3">
                <p className="text-xs font-semibold">{l.title}</p>
                <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{l.somali}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export function Curriculum() {
  const stages = ["Aasaas", "Dhexe", "Sare"] as const;
  const stats = usePlatformStats();
  const moduleSummaries = stats?.moduleSummaries ?? [];

  return (
    <section id="manhaj" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-primary-glow">
            Manhajka
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Bilow ilaa xirfadle: {moduleSummaries.length} module
          </h2>
        </div>
        <div className="flex gap-2">
          {stages.map((s) => (
            <span
              key={s}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${stageColor[s]}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {moduleSummaries.map((m, i) => (
          <article key={m.id} className="bento-card p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${stageColor[m.stage]}`}
              >
                {m.stage}
              </span>
            </div>
            <h3 className="mt-3 text-base font-semibold">{m.title}</h3>
            <p className="text-xs text-primary-glow">{m.english}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {m.topics.map((t) => (
                <li
                  key={t}
                  className="rounded-md border border-border bg-background/40 px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{m.lessons} cashar</span>
              <span className="size-1 rounded-full bg-border" />
              <span>{m.hours} saac</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Faq() {
  const stats = usePlatformStats();
  const faqs = stats?.faqs ?? [];

  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 py-16 md:py-24">
      <h2 className="mb-8 text-3xl font-bold md:text-4xl">Su'aalo badanaa la weydiiyo</h2>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="bento-card group p-5">
            <summary className="cursor-pointer list-none font-display text-base font-semibold">
              {f.q}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 text-center">
        <span className="flex items-center gap-2 font-display text-sm font-bold">
          <ShieldCheck className="size-4 text-primary" /> CyberSoomaali
        </span>
        <p className="text-xs text-muted-foreground">
          Waxbarasho cybersecurity af Soomaali ah — bilow ilaa SOC analyst.
        </p>
        <a href="/verify" className="text-xs font-semibold text-primary hover:underline">
          Xaqiiji Shahaadada
        </a>
      </div>
    </footer>
  );
}

export function Highlights() {
  const stats = usePlatformStats();
  const labCount = stats?.labCount ?? 0;
  const items = [
    { icon: TrendingUp, k: "Somali-first", v: "Casharro af Soomaali ah" },
    { icon: Terminal, k: "Hands-on", v: `${labCount} lab practical ah` },
    { icon: Radar, k: "SOC-ready", v: "SIEM, triage, IR" },
  ];
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-5 sm:grid-cols-3">
      {items.map((it) => (
        <div
          key={it.k}
          className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary-glow">
            <it.icon className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold">{it.k}</p>
            <p className="text-xs text-muted-foreground">{it.v}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
