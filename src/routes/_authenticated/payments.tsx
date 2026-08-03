import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { CircleCheck as CheckCircle2, Clock, Loader as Loader2, Circle as XCircle } from "lucide-react";
import { PageShell } from "@/components/site/Shell";
import { getPaymentsAndReferrals, submitPayment } from "@/lib/payments.functions";
import { PRICING, PAYMENT_PROVIDERS, type PaymentProviderId } from "@/lib/pricing";
import { supabase } from "@/integrations/supabase/client";
import { modules } from "@/lib/curriculum";

export const Route = createFileRoute("/_authenticated/payments")({
  head: () => ({
    meta: [
      { title: "Lacag-bixinta — SomTrust Cyber Academy" },
      {
        name: "description",
        content: "Bixi lacag course-ka, imtixaanka ama shahaadada adigoo isticmaalaya Zaad ama eDahab.",
      },
      { property: "og:title", content: "Lacag-bixinta — SomTrust Cyber Academy" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PaymentsPage,
});

function PaymentsPage() {
  const fetchData = useServerFn(getPaymentsAndReferrals);
  const pay = useServerFn(submitPayment);
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["payments"], queryFn: () => fetchData() });

  const [itemType, setItemType] = useState<"course" | "exam" | "certificate">("course");
  const [itemSlug, setItemSlug] = useState(modules[0]!.slug);
  const [provider, setProvider] = useState<PaymentProviderId>("zaad");
  const [phone, setPhone] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const amount = PRICING[itemType];

  async function uploadProof(): Promise<string | null> {
    if (!proofFile) return null;
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return null;
    const ext = proofFile.name.split(".").pop() ?? "jpg";
    const path = `${userId}/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("payment-proofs").upload(path, proofFile, {
      contentType: proofFile.type,
    });
    if (upErr) throw new Error(upErr.message);
    return path;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMsg(null);
    if (transactionId.trim().length < 3) {
      setError("Fadlan geli Transaction ID-ka.");
      return;
    }
    setBusy(true);
    try {
      const proofUrl = await uploadProof();
      await pay({
        data: {
          itemType,
          itemSlug: itemType === "course" ? itemSlug : "full",
          provider,
          phone: phone.trim() || undefined,
          transactionId: transactionId.trim(),
          proofUrl: proofUrl ?? undefined,
        },
      });
      await queryClient.invalidateQueries({ queryKey: ["payments"] });
      setMsg("Lacag-bixintaada waa la soo diray. Maamulku wuu xaqiijin doonaa 1-24 saac gudahood.");
      setTransactionId("");
      setProofFile(null);
      setPhone("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Khalad dhacay");
    } finally {
      setBusy(false);
    }
  }

  const myPayments = data?.payments ?? [];
  const provider_ = PAYMENT_PROVIDERS.find((p) => p.id === provider)!;

  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold">Lacag-bixinta</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Bixi lacag course-ka, imtixaanka ama shahaadada PDF ah. Ka dooro Zaad ama eDahab.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <form onSubmit={submit} className="bento-card space-y-5 p-6">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Nooca lacag-bixinta
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(["course", "exam", "certificate"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setItemType(t)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                    itemType === t
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  {t === "course" ? "Course" : t === "exam" ? "Imtixaanka" : "Shahaadada"}
                  <span className="mt-1 block text-xs text-muted-foreground">${PRICING[t]}</span>
                </button>
              ))}
            </div>
          </div>

          {itemType === "course" && (
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Course-ka
              </span>
              <select
                value={itemSlug}
                onChange={(e) => setItemSlug(e.target.value)}
                className="input-base"
              >
                {modules.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.title} ({m.english})
                  </option>
                ))}
              </select>
            </label>
          )}

          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Aaladda lacag-bixinta
            </span>
            <div className="grid grid-cols-2 gap-2">
              {PAYMENT_PROVIDERS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProvider(p.id)}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                    provider === p.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Tilmaamaha lacag-bixinta ({provider_.label})
            </p>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              {provider_.instructions.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-3 rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
              Qaddarka: ${amount}
            </p>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Lambarka telefoonka (4 god oo dambe)
            </span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={4}
              placeholder="6789"
              className="input-base"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Transaction ID
            </span>
            <input
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              maxLength={60}
              placeholder="TX123456789"
              className="input-base"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Sawirka rasiidka (ikhtiyaari)
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground"
            />
          </label>

          {error && (
            <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          {msg && (
            <p className="rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-foreground">
              {msg}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {busy && <Loader2 className="size-4 animate-spin" />}
            Soo dir lacag-bixinta (${amount})
          </button>
        </form>

        <aside>
          <h2 className="font-display text-lg font-bold">Taariikhda lacag-bixinta</h2>
          <div className="mt-4 space-y-3">
            {myPayments.length === 0 ? (
              <p className="text-sm text-muted-foreground">Wax lacag-bixin ah ma jirto.</p>
            ) : (
              myPayments.map((p) => (
                <div key={p.id} className="bento-card p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold capitalize">
                      {p.item_type === "course" ? "Course" : p.item_type === "exam" ? "Imtixaanka" : "Shahaadada"}
                    </span>
                    <span
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        p.status === "approved"
                          ? "bg-success/15 text-success"
                          : p.status === "rejected"
                            ? "bg-destructive/15 text-destructive"
                            : "bg-warning/15 text-warning"
                      }`}
                    >
                      {p.status === "approved" && <CheckCircle2 className="size-3" />}
                      {p.status === "rejected" && <XCircle className="size-3" />}
                      {p.status === "pending" && <Clock className="size-3" />}
                      {p.status === "approved" ? "La oggolaaday" : p.status === "rejected" ? "La diiday" : "Sugitaan"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    ${p.amount_usd} · {p.provider} · {new Date(p.created_at).toLocaleDateString()}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">TXID: {p.transaction_id}</p>
                  {p.admin_note && (
                    <p className="mt-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs text-muted-foreground">
                      Maamul: {p.admin_note}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
