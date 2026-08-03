import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Award, Search, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const title = "Xaqiiji Shahaadada — SomTrust Cyber Academy";
const description = "Xaqiiji shahaadada SomTrust Cyber Academy adigoo galinaya lambarka shahaadada.";

export const Route = createFileRoute("/verify")({
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
  component: VerifyPage,
});

type CertResult = {
  id: string;
  title: string;
  score: number;
  issued_at: string;
} | null;

function VerifyPage() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState<CertResult>(undefined);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(undefined);
    const trimmed = certId.trim();
    if (!trimmed) return;
    setBusy(true);
    try {
      const { data, error: err } = await supabase
        .from("certificates")
        .select("id, title, score, issued_at")
        .eq("id", trimmed)
        .maybeSingle();
      if (err) throw err;
      setResult(data);
    } catch {
      setError("Khalad dhacay. Fadlan isku day mar kale.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center gap-2.5 px-5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <ShieldCheck className="size-5" />
          </span>
          <span className="font-display text-base font-bold">SomTrust Cyber Academy</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-12">
        <h1 className="font-display text-3xl font-bold">Xaqiiji Shahaadada</h1>
        <p className="mt-2 text-muted-foreground">
          Geli lambarka shahaadada si aad u xaqiijiso in dhab yahay.
        </p>

        <form onSubmit={search} className="mt-6 flex gap-3">
          <input
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            placeholder="Fadlan geli lambarka shahaadada"
            className="input-base"
            maxLength={100}
          />
          <button
            type="submit"
            disabled={busy}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            <Search className="size-4" /> Raadi
          </button>
        </form>

        {error && (
          <p className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {result === null && !busy && certId.trim() && (
          <div className="bento-card mt-6 p-6 text-center">
            <p className="font-display text-lg font-bold text-destructive">Shahaadada lama helin</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Lambarka aad gelisay waa khalad ama shahaadadaas ma jirto.
            </p>
          </div>
        )}

        {result && (
          <div className="bento-card mt-6 relative overflow-hidden p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_60%)]" />
            <div className="relative text-center">
              <Award className="mx-auto size-10 text-primary" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                SomTrust Cyber Academy
              </p>
              <h2 className="mt-3 font-display text-xl font-bold">{result.title}</h2>
              <p className="mt-2 text-sm text-success">Shahaadada waa saxda</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-left text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Lambarka</dt>
                  <dd className="font-mono font-semibold">{result.id.slice(0, 8).toUpperCase()}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Dhibco</dt>
                  <dd className="font-semibold">{result.score}%</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Taariikhda</dt>
                  <dd className="font-semibold">{new Date(result.issued_at).toLocaleDateString()}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Xaaladda</dt>
                  <dd className="font-semibold text-success">La xaqiijiyay</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
