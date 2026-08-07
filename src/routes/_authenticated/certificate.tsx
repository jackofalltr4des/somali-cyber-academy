import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  Award,
  Lock,
  ShieldCheck,
  Terminal,
  Fingerprint,
  Cloud,
} from "lucide-react";
import { PageShell } from "@/components/site/Shell";
import { getStudentData, issueCertificate } from "@/lib/learning.functions";
import { certificateEligibility, CERT_TRACKS } from "@/lib/progress";

export const Route = createFileRoute("/_authenticated/certificate")({
  head: () => ({
    meta: [
      { title: "Shahaadooyinka — SomTrust Cyber Academy" },
      {
        name: "description",
        content:
          "Hel shahaadooyinka SomTrust marka aad dhammeyso casharrada iyo labs-ka waddo kasta — SOC Analyst, Ethical Hacking, Digital Forensics, Cloud Security.",
      },
      { property: "og:title", content: "Shahaadooyinka — SomTrust Cyber Academy" },
      {
        property: "og:description",
        content: "Shahaadooyinka professional-ka ah ee SomTrust Cyber Academy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CertificatePage,
});

/** Visual identity per track — icon + accent color classes. */
const TRACK_THEME: Record<
  string,
  {
    icon: typeof ShieldCheck;
    text: string;
    border: string;
    bg: string;
    glow: string;
    ring: string;
  }
> = {
  "soc-analyst": {
    icon: ShieldCheck,
    text: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/15",
    glow: "color-mix(in oklab, var(--primary) 22%, transparent)",
    ring: "bg-primary",
  },
  "ethical-hacking": {
    icon: Terminal,
    text: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/15",
    glow: "color-mix(in oklab, #fb923c 22%, transparent)",
    ring: "bg-orange-500",
  },
  "digital-forensics": {
    icon: Fingerprint,
    text: "text-cyan-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/15",
    glow: "color-mix(in oklab, #22d3ee 22%, transparent)",
    ring: "bg-cyan-500",
  },
  "cloud-security": {
    icon: Cloud,
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/15",
    glow: "color-mix(in oklab, #34d399 22%, transparent)",
    ring: "bg-emerald-500",
  },
};

function CertificatePage() {
  const fetchData = useServerFn(getStudentData);
  const issue = useServerFn(issueCertificate);
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["student"], queryFn: () => fetchData() });

  const [active, setActive] = useState(CERT_TRACKS[0].slug);
  const def = CERT_TRACKS.find((t) => t.slug === active)!;
  const theme = TRACK_THEME[active];
  const Icon = theme.icon;

  const progress = data?.progress ?? [];
  const labs = data?.labs ?? [];
  const examResults = data?.examResults ?? [];
  const elig = certificateEligibility(active, progress, labs, examResults);
  const cert = (data?.certificates ?? []).find((c) => c.track === def.track);

  async function claim() {
    await issue({ data: { track: def.track, title: def.title, score: elig.score } });
    await queryClient.invalidateQueries({ queryKey: ["student"] });
  }

  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold">Shahaadooyinka</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Waddo kasta oo aad dhammeysato waxay leedahay shahaado gooni ah. Dooro
        waddada si aad u aragto horumarkaaga iyo shuruudaha soo hara.
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {CERT_TRACKS.map((t) => {
          const isActive = t.slug === active;
          const tTheme = TRACK_THEME[t.slug];
          const TIcon = tTheme.icon;
          const earned = (data?.certificates ?? []).some((c) => c.track === t.track);
          return (
            <button
              key={t.slug}
              type="button"
              onClick={() => setActive(t.slug)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                isActive
                  ? `${tTheme.border} ${tTheme.bg} ${tTheme.text}`
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              <TIcon className="size-3.5" />
              {t.shortTitle}
              {earned && <Award className="size-3.5" />}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className={`bento-card relative overflow-hidden p-10 text-center ${theme.border}`}>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at top, ${theme.glow}, transparent 60%)`,
            }}
          />
          <div className={`absolute inset-x-0 top-0 h-1 ${theme.ring}`} />

          <div className="relative">
            <span
              className={`mx-auto flex size-16 items-center justify-center rounded-2xl ${theme.bg} ${theme.text}`}
            >
              <Icon className="size-8" />
            </span>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              SomTrust Cyber Academy
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold">{def.title}</h2>
            <p className={`mt-6 font-display text-xl ${theme.text}`}>
              {data?.profile?.display_name || "Magacaaga"}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {cert
                ? `Serial: ${cert.id.slice(0, 8).toUpperCase()} · ${new Date(cert.issued_at).toLocaleDateString()}`
                : "Ma weli lahelin — dhammeystir shuruudaha"}
            </p>
          </div>
        </div>

        <aside className="bento-card p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Shuruudaha
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {elig.reqs.map((r) => (
              <li key={r.label} className="flex items-start justify-between gap-3">
                <span className="flex items-start gap-2">
                  <span className={r.ok ? "text-success" : "text-muted-foreground"}>
                    {r.ok ? "✓" : "○"}
                  </span>
                  <span className={r.ok ? "text-foreground" : "text-muted-foreground"}>
                    {r.label}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">{r.value}</span>
              </li>
            ))}
          </ul>

          {!elig.reqs[2]?.ok && (
            <Link
              to="/exam/$pathSlug"
              params={{ pathSlug: active }}
              className="mt-4 block rounded-xl border border-primary/40 bg-primary/10 px-4 py-2.5 text-center text-sm font-semibold text-primary hover:bg-primary/15"
            >
              Qaado imtixaanka →
            </Link>
          )}

          {cert ? (
            <button
              onClick={() => window.print()}
              className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Soo daabac / Download PDF
            </button>
          ) : (
            <button
              onClick={claim}
              disabled={!elig.eligible}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {!elig.eligible && <Lock className="size-4" />} Qaado shahaadada
            </button>
          )}
        </aside>
      </div>

      {cert && (
        <div className="bento-card mt-6 p-5">
          <p className="text-sm text-muted-foreground">
            Xaqiijinta shahaadada:{" "}
            <Link to="/verify" className="font-semibold text-primary hover:underline">
              Eeg bogga xaqiijinta →
            </Link>
          </p>
        </div>
      )}
    </PageShell>
  );
}
