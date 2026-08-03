import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Award, Lock } from "lucide-react";
import { PageShell } from "@/components/site/Shell";
import { getStudentData, issueCertificate } from "@/lib/learning.functions";
import { certificateEligibility, CERT_TITLE, CERT_TRACK } from "@/lib/progress";

export const Route = createFileRoute("/_authenticated/certificate")({
  head: () => ({
    meta: [
      { title: "Shahaadada — SomTrust Cyber Academy" },
      {
        name: "description",
        content: "Hel shahaadada SomTrust Certified Junior SOC Analyst marka aad dhammeyso casharrada iyo labs-ka.",
      },
      { property: "og:title", content: "Shahaadada — SomTrust Cyber Academy" },
      { property: "og:description", content: "SomTrust Certified Junior SOC Analyst certificate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CertificatePage,
});

function CertificatePage() {
  const fetchData = useServerFn(getStudentData);
  const issue = useServerFn(issueCertificate);
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["student"], queryFn: () => fetchData() });

  const progress = data?.progress ?? [];
  const labs = data?.labs ?? [];
  const elig = certificateEligibility(progress, labs);
  const cert = (data?.certificates ?? [])[0];

  async function claim() {
    await issue({ data: { track: CERT_TRACK, title: CERT_TITLE, score: elig.score } });
    await queryClient.invalidateQueries({ queryKey: ["student"] });
  }

  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold">Shahaadada</h1>
      <p className="mt-2 text-muted-foreground">{CERT_TITLE}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="bento-card relative overflow-hidden p-10 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_60%)]" />
          <div className="relative">
            <Award className="mx-auto size-10 text-primary" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              SomTrust Cyber Academy
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold">{CERT_TITLE}</h2>
            <p className="mt-6 font-display text-xl text-primary">
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
              <li key={r.label} className="flex items-start gap-2">
                <span className={r.ok ? "text-success" : "text-muted-foreground"}>
                  {r.ok ? "✓" : "○"}
                </span>
                <span className={r.ok ? "text-foreground" : "text-muted-foreground"}>{r.label}</span>
              </li>
            ))}
          </ul>

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
