import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { PageShell } from "@/components/site/Shell";
import { findLab } from "@/lib/labs";
import { submitLab } from "@/lib/learning.functions";

export const Route = createFileRoute("/_authenticated/labs/$labSlug")({
  head: ({ params }) => {
    const lab = findLab(params.labSlug);
    const title = `${lab?.english ?? "Lab"} — SomTrust Cyber Academy`;
    return {
      meta: [
        { title },
        { name: "description", content: (lab?.scenario ?? "SOC lab").slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: (lab?.scenario ?? "SOC lab").slice(0, 155) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: LabPage,
});

function LabPage() {
  const { labSlug } = Route.useParams();
  const lab = findLab(labSlug);
  const queryClient = useQueryClient();
  const submit = useServerFn(submitLab);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [report, setReport] = useState("");
  const [result, setResult] = useState<{ score: number; total: number; passed: boolean } | null>(null);
  const [busy, setBusy] = useState(false);

  if (!lab) {
    return (
      <PageShell>
        <h1 className="font-display text-2xl font-bold">Lab lama helin</h1>
        <Link to="/labs" className="mt-4 inline-block text-primary hover:underline">
          ← Labs
        </Link>
      </PageShell>
    );
  }

  const score = lab.questions.filter((q) => answers[q.id] === q.answer).length;

  async function finish() {
    setBusy(true);
    try {
      const total = lab!.questions.length;
      const passed = score >= Math.ceil(total * 0.75);
      await submit({
        data: { labSlug: lab!.slug, answers, report: report.trim(), score, total, passed },
      });
      setResult({ score, total, passed });
      await queryClient.invalidateQueries({ queryKey: ["student"] });
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <Link to="/labs" className="text-sm text-muted-foreground hover:text-foreground">
        ← Labs
      </Link>

      <header className="mt-4">
        <h1 className="font-display text-3xl font-bold">{lab.somali}</h1>
        <p className="text-sm text-primary">{lab.english}</p>
        <p className="mt-3 max-w-2xl text-muted-foreground">{lab.scenario}</p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section className="bento-card p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
            {lab.artifactTitle}
          </h2>
          <pre className="mt-4 max-h-[420px] overflow-auto rounded-xl bg-surface p-4 text-xs leading-relaxed text-foreground">
            {lab.artifact}
          </pre>
        </section>

        <aside className="bento-card p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Objectives
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {lab.objectives.map((o) => (
              <li key={o}>• {o}</li>
            ))}
          </ul>
        </aside>
      </div>

      <section className="bento-card mt-6 p-6">
        <h2 className="font-display text-xl font-bold">Su'aalaha falanqaynta</h2>
        <div className="mt-5 space-y-6">
          {lab.questions.map((q, qi) => (
            <div key={q.id}>
              <p className="font-semibold">
                {qi + 1}. {q.q}
              </p>
              <div className="mt-3 space-y-2">
                {q.options.map((opt, oi) => {
                  const selected = answers[q.id] === oi;
                  const correct = result && oi === q.answer;
                  const wrong = result && selected && oi !== q.answer;
                  return (
                    <button
                      key={oi}
                      onClick={() => !result && setAnswers((a) => ({ ...a, [q.id]: oi }))}
                      className={`flex w-full rounded-xl border px-4 py-2.5 text-left text-sm transition-colors ${
                        correct
                          ? "border-success/60 bg-success/10"
                          : wrong
                            ? "border-destructive/60 bg-destructive/10"
                            : selected
                              ? "border-primary bg-primary/10"
                              : "border-border hover:bg-accent"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {result && <p className="mt-2 text-xs text-muted-foreground">{q.explain}</p>}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="font-display text-lg font-bold">Warbixinta (Report)</h3>
          <p className="mt-1 text-sm text-muted-foreground">{lab.reportPrompt}</p>
          <textarea
            value={report}
            onChange={(e) => setReport(e.target.value)}
            rows={8}
            maxLength={4000}
            disabled={!!result}
            placeholder="Timeline (UTC), findings, IOCs, talooyin..."
            className="input-base mt-3 font-mono text-xs"
          />
        </div>

        {result ? (
          <p className="mt-5 rounded-xl border border-border bg-surface px-4 py-3 text-sm">
            Dhibcahaaga: <strong>{result.score}/{result.total}</strong> —{" "}
            {result.passed ? "Waad gudubtay lab-ka ✅" : "Isku day mar kale ❌"}
          </p>
        ) : (
          <button
            onClick={finish}
            disabled={busy || Object.keys(answers).length < lab.questions.length || report.trim().length < 40}
            className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            Gudbi lab-ka
          </button>
        )}
      </section>
    </PageShell>
  );
}
