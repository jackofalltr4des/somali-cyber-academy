import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Clock, Lock, ShieldAlert, Trophy } from "lucide-react";
import { PageShell } from "@/components/site/Shell";
import { findExamBank } from "@/lib/exam-bank";
import { CERT_TRACKS } from "@/lib/progress";
import { PRICING } from "@/lib/pricing";
import { getStudentData, submitExam } from "@/lib/learning.functions";

export const Route = createFileRoute("/_authenticated/exam/$pathSlug")({
  head: ({ params }) => {
    const bank = findExamBank(params.pathSlug);
    const title = `${bank?.title ?? "Imtixaan"} — SomTrust Cyber Academy`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `Imtixaanka kama dambaysta ah ee ${bank?.title ?? "waddada"} — ${bank?.timeMinutes ?? 60} daqiiqo, ${bank?.passingPercent ?? 70}% ayaa loo baahan yahay.`,
        },
        { property: "og:title", content: title },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: ExamPage,
});

function ExamPage() {
  const { pathSlug } = Route.useParams();
  const bank = findExamBank(pathSlug);
  const def = CERT_TRACKS.find((t) => t.slug === pathSlug);

  const fetchData = useServerFn(getStudentData);
  const submit = useServerFn(submitExam);
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["student"], queryFn: () => fetchData() });

  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; total: number; passed: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Gated against the payments table: item_type='exam', item_slug=path
  // slug, status='approved' — matches the real payments schema (see
  // approve_payment_and_process_referral in Supabase migrations).
  const hasPaidExam =
    (data?.payments ?? []).some(
      (p: any) => p.item_type === "exam" && p.item_slug === pathSlug && p.status === "approved",
    ) ?? false;

  useEffect(() => {
    if (!started || result) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          void finish();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, result]);

  if (!bank || !def) {
    return (
      <PageShell>
        <h1 className="font-display text-2xl font-bold">Imtixaan lama helin</h1>
        <Link to="/certificate" className="mt-4 inline-block text-primary hover:underline">
          ← Shahaadooyinka
        </Link>
      </PageShell>
    );
  }

  function begin() {
    setStarted(true);
    setSecondsLeft(bank!.timeMinutes * 60);
  }

  async function finish() {
    if (timerRef.current) clearInterval(timerRef.current);
    setBusy(true);
    try {
      const total = bank!.questions.length;
      const score = bank!.questions.filter((q) => answers[q.id] === q.answer).length;
      const passed = Math.round((score / total) * 100) >= bank!.passingPercent;
      await submit({
        data: { pathSlug: bank!.pathSlug, score, total, passed, answers },
      });
      setResult({ score, total, passed });
      await queryClient.invalidateQueries({ queryKey: ["student"] });
    } finally {
      setBusy(false);
    }
  }

  const mm = Math.floor(secondsLeft / 60);
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const answeredCount = Object.keys(answers).length;

  return (
    <PageShell>
      <Link to="/certificate" className="text-sm text-muted-foreground hover:text-foreground">
        ← Shahaadooyinka
      </Link>

      <header className="mt-4">
        <h1 className="font-display text-3xl font-bold">{bank.title}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {bank.questions.length} su'aalood · {bank.timeMinutes} daqiiqo · {bank.passingPercent}% ayaa loo baahan yahay in la gudbo.
        </p>
      </header>

      {!hasPaidExam ? (
        <div className="bento-card mt-8 flex flex-col items-center gap-4 p-10 text-center">
          <Lock className="size-8 text-muted-foreground" />
          <div>
            <p className="font-display text-lg font-bold">Imtixaankan waa mid la iibsado</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Waa in aad bixisaa ${PRICING.exam} ka hor inaad qaadato imtixaankan. Bogga lacag-bixinta ka bilow.
            </p>
          </div>
          <Link
            to="/payments"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Aad bogga lacag-bixinta
          </Link>
        </div>
      ) : !started ? (
        <div className="bento-card mt-8 flex flex-col items-center gap-4 p-10 text-center">
          <ShieldAlert className="size-8 text-primary" />
          <div>
            <p className="font-display text-lg font-bold">Diyaar ma u tahay?</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Marka aad bilowdo, waqtigu wuu socon doonaa ({bank.timeMinutes} daqiiqo). Kama noqon kartid dib
              markaad bilowdo — hubi inaad diyaar tahay.
            </p>
          </div>
          <button
            onClick={begin}
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Bilow imtixaanka
          </button>
        </div>
      ) : result ? (
        <div className="bento-card mt-8 flex flex-col items-center gap-4 p-10 text-center">
          <Trophy className={`size-10 ${result.passed ? "text-success" : "text-muted-foreground"}`} />
          <div>
            <p className="font-display text-xl font-bold">
              {result.passed ? "Waad ku guuleysatay!" : "Ma gudbin — isku day mar kale"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Dhibcahaaga: <strong>{result.score}/{result.total}</strong> (
              {Math.round((result.score / result.total) * 100)}%)
            </p>
          </div>
          <Link
            to="/certificate"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Eeg shahaadada
          </Link>
        </div>
      ) : (
        <>
          <div className="sticky top-20 z-10 mt-6 flex items-center justify-between rounded-2xl border border-border bg-background/95 px-5 py-3 backdrop-blur">
            <span className="text-sm text-muted-foreground">
              {answeredCount}/{bank.questions.length} la jawaabay
            </span>
            <span className="flex items-center gap-2 font-mono text-sm font-semibold text-primary">
              <Clock className="size-4" /> {mm}:{ss}
            </span>
          </div>

          <div className="mt-6 space-y-6">
            {bank.questions.map((q, qi) => (
              <div key={q.id} className="bento-card p-6">
                <p className="font-semibold">
                  {qi + 1}. {q.q}
                </p>
                <div className="mt-3 space-y-2">
                  {q.options.map((opt, oi) => {
                    const selected = answers[q.id] === oi;
                    return (
                      <button
                        key={oi}
                        type="button"
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                        className={`flex w-full rounded-xl border px-4 py-2.5 text-left text-sm transition-colors ${
                          selected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:bg-accent"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={finish}
              disabled={busy || answeredCount < bank.questions.length}
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              Gudbi imtixaanka
            </button>
          </div>
        </>
      )}
    </PageShell>
  );
}
