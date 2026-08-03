import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { CircleCheck as CheckCircle2, Clock, Copy, Gift, Users } from "lucide-react";
import { PageShell } from "@/components/site/Shell";
import { getPaymentsAndReferrals, submitReferral } from "@/lib/payments.functions";

export const Route = createFileRoute("/_authenticated/referrals")({
  head: () => ({
    meta: [
      { title: "Referral System — SomTrust Cyber Academy" },
      {
        name: "description",
        content: "Wadaag link-kaaga referral ah oo hel $2 commission arday kasta oo lacag bixiya.",
      },
      { property: "og:title", content: "Referral System — SomTrust Cyber Academy" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ReferralsPage,
});

function ReferralsPage() {
  const fetchData = useServerFn(getPaymentsAndReferrals);
  const refer = useServerFn(submitReferral);
  const { data } = useQuery({ queryKey: ["payments"], queryFn: () => fetchData() });
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const referralCode = data?.referralCode ?? "";
  const referrals = data?.referrals ?? [];
  const earned = referrals.filter((r) => r.status === "earned" || r.status === "paid");
  const totalCommission = earned.reduce((n, r) => n + Number(r.commission_usd), 0);
  const paidCommission = referrals
    .filter((r) => r.status === "paid")
    .reduce((n, r) => n + Number(r.commission_usd), 0);

  const referralLink = referralCode
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/auth?mode=signup&ref=${referralCode}`
    : "";

  async function copyLink() {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function applyReferral(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMsg(null);
    try {
      const res = await refer({ data: { referralCode: code.trim() } });
      if (res.already) setMsg("Hore ayaad la xirantay referral-kan.");
      else setMsg("Referral-ka waa la xaqiijiyay. Mahadsanid!");
      setCode("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Khalad dhacay");
    }
  }

  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold">
        Referral <span className="text-gradient-indigo">System</span>
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Wadaag link-kaaga ardayga kale. Arday kasta oo lacag bixiyo, waxaad helaysaa $2 commission.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <div className="bento-card p-5">
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="size-4" /> Ardayada la casumay
          </span>
          <p className="mt-2 font-display text-2xl font-bold text-primary">{referrals.length}</p>
        </div>
        <div className="bento-card p-5">
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <Gift className="size-4" /> Commission la kasbay
          </span>
          <p className="mt-2 font-display text-2xl font-bold text-primary">${totalCommission.toFixed(2)}</p>
        </div>
        <div className="bento-card p-5">
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="size-4" /> La bixiyay
          </span>
          <p className="mt-2 font-display text-2xl font-bold text-success">${paidCommission.toFixed(2)}</p>
        </div>
      </div>

      <section className="bento-card mt-8 p-6">
        <h2 className="font-display text-lg font-bold">Link-kaaga referral ah</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Wadaag link-kan asxaabtaada. Markay isdiiwaangelan oo lacag bixiyo, $2 ayaa lagu darayaa account-kaaga.
        </p>
        <div className="mt-4 flex gap-3">
          <input
            readOnly
            value={referralLink || "Sug..." }
            className="input-base font-mono text-xs"
          />
          <button
            onClick={copyLink}
            disabled={!referralLink}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            <Copy className="size-4" /> {copied ? "La wadaagay!" : "Koobiyee"}
          </button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Code-kaaga: <span className="font-mono font-semibold text-primary">{referralCode || "..."}</span>
        </p>
      </section>

      <section className="bento-card mt-6 p-6">
        <h2 className="font-display text-lg font-bold">Geli referral code</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Haddii qof kuu siiyay referral code, halkan geli si aad u xiraan.
        </p>
        <form onSubmit={applyReferral} className="mt-4 flex gap-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Referral code"
            maxLength={20}
            className="input-base"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Xiro
          </button>
        </form>
        {error && (
          <p className="mt-3 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        {msg && (
          <p className="mt-3 rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-foreground">
            {msg}
          </p>
        )}
      </section>

      {referrals.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-bold">Taariikhda referral-yada</h2>
          <div className="bento-card mt-4 overflow-x-auto p-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-3 py-2">Arday</th>
                  <th className="px-3 py-2">Commission</th>
                  <th className="px-3 py-2">Xaaladda</th>
                  <th className="px-3 py-2">Taariikhda</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((r) => (
                  <tr key={r.id} className="border-t border-border/60">
                    <td className="px-3 py-2 font-mono text-xs">{r.referred_id.slice(0, 8)}</td>
                    <td className="px-3 py-2 font-semibold">${Number(r.commission_usd).toFixed(2)}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`flex items-center gap-1.5 text-xs font-semibold ${
                          r.status === "paid"
                            ? "text-success"
                            : r.status === "earned"
                              ? "text-primary"
                              : "text-muted-foreground"
                        }`}
                      >
                        {r.status === "pending" && <Clock className="size-3" />}
                        {r.status === "earned" && <CheckCircle2 className="size-3" />}
                        {r.status === "paid" && <CheckCircle2 className="size-3" />}
                        {r.status === "pending" ? "Sugitaan" : r.status === "earned" ? "La kasbay" : "La bixiyay"}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </PageShell>
  );
}
