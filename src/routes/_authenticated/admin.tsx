import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Award, BookOpen, CircleCheck as CheckCircle2, DollarSign, Loader as Loader2, Users, Circle as XCircle } from "lucide-react";
import { PageShell } from "@/components/site/Shell";
import { getAdminData, adminPaymentAction, adminReferralAction, adminUpdateRole } from "@/lib/payments.functions";
import { modules, totalLessons } from "@/lib/curriculum";
import { labCatalog } from "@/lib/labs";
import { providerLabel } from "@/lib/pricing";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — SomTrust Cyber Academy" },
      { name: "description", content: "Maamul ardayda, lacag-bixinta, shahaadada iyo analytics." },
      { property: "og:title", content: "Admin Panel — SomTrust Cyber Academy" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AdminPage,
});

type Tab = "overview" | "students" | "payments" | "referrals" | "certificates" | "courses";

function AdminPage() {
  const fetchData = useServerFn(getAdminData);
  const { data, isLoading, error } = useQuery({ queryKey: ["admin"], queryFn: () => fetchData() });
  const [tab, setTab] = useState<Tab>("overview");

  if (isLoading) {
    return (
      <PageShell>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Waa la soo dejinayaa...
        </p>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <h1 className="font-display text-2xl font-bold">Maamul</h1>
        <p className="mt-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error.message.includes("Forbidden")
            ? "Akoonkaagu ma lihi awood maamule (admin)."
            : "Khalad dhacay."}
        </p>
        <Link to="/dashboard" className="mt-4 inline-block text-primary hover:underline">
          ← Dashboard
        </Link>
      </PageShell>
    );
  }

  if (!data) return null;

  const pendingPayments = data.payments.filter((p) => p.status === "pending");
  const approvedPayments = data.payments.filter((p) => p.status === "approved");
  const totalRevenue = approvedPayments.reduce((n, p) => n + Number(p.amount_usd), 0);
  const earnedReferrals = data.referrals.filter((r) => r.status === "earned");
  const unpaidCommission = earnedReferrals.reduce((n, r) => n + Number(r.commission_usd), 0);

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: "overview", label: "Dhamaan" },
    { id: "students", label: "Ardayda", badge: data.students.length },
    { id: "payments", label: "Lacag-bixinta", badge: pendingPayments.length },
    { id: "referrals", label: "Referral-yada" },
    { id: "certificates", label: "Shahaadada" },
    { id: "courses", label: "Courses" },
  ];

  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold">Admin Panel</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Maamul ardayda, lacag-bixinta, shahaadada iyo analytics-ka platform-ka.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:bg-accent"
            }`}
          >
            {t.label}
            {t.badge ? (
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs">{t.badge}</span>
            ) : null}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="mt-8 space-y-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={<Users className="size-4" />} label="Ardayda" value={String(data.students.length)} />
            <StatCard icon={<DollarSign className="size-4" />} label="Dakhli guud" value={`$${totalRevenue.toFixed(2)}`} />
            <StatCard icon={<BookOpen className="size-4" />} label="Casharro dhamaystiran" value={String(data.progress.length)} />
            <StatCard icon={<Award className="size-4" />} label="Shahaado la bixiyay" value={String(data.certificates.length)} />
          </div>

          {pendingPayments.length > 0 && (
            <div className="bento-card p-6">
              <h2 className="font-display text-lg font-bold">Lacag-bixin sugitaan ah</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {pendingPayments.length} lacag-bixin ayaa sugta xaqiijinta.
              </p>
              <button
                onClick={() => setTab("payments")}
                className="mt-3 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Eeg iyo xaqiiji
              </button>
            </div>
          )}

          {earnedReferrals.length > 0 && (
            <div className="bento-card p-6">
              <h2 className="font-display text-lg font-bold">Commission la bixinayo</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                ${unpaidCommission.toFixed(2)} commission ayaa la sugaya bixinta.
              </p>
              <button
                onClick={() => setTab("referrals")}
                className="mt-3 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Eeg referral-yada
              </button>
            </div>
          )}
        </div>
      )}

      {tab === "students" && <StudentsTab students={data.students} progress={data.progress} labs={data.labs} />}
      {tab === "payments" && <PaymentsTab payments={data.payments} />}
      {tab === "referrals" && <ReferralsTab referrals={data.referrals} />}
      {tab === "certificates" && <CertificatesTab certificates={data.certificates} />}
      {tab === "courses" && <CoursesTab />}
    </PageShell>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bento-card p-5">
      <span className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon} {label}
      </span>
      <p className="mt-2 font-display text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}

function StudentsTab({
  students,
  progress,
  labs,
}: {
  students: { id: string; display_name: string; city: string | null; goal: string | null; created_at: string }[];
  progress: { user_id: string }[];
  labs: { user_id: string; passed: boolean }[];
}) {
  return (
    <div className="mt-6">
      <div className="bento-card overflow-x-auto p-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-3 py-2">Magaca</th>
              <th className="px-3 py-2">Magaalada</th>
              <th className="px-3 py-2">Casharro</th>
              <th className="px-3 py-2">Labs</th>
              <th className="px-3 py-2">Taariikhda</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => {
              const lessonCount = progress.filter((p) => p.user_id === s.id).length;
              const labCount = labs.filter((l) => l.user_id === s.id && l.passed).length;
              return (
                <tr key={s.id} className="border-t border-border/60">
                  <td className="px-3 py-2 font-semibold">{s.display_name || "—"}</td>
                  <td className="px-3 py-2 text-muted-foreground">{s.city || "—"}</td>
                  <td className="px-3 py-2">{lessonCount}/{totalLessons}</td>
                  <td className="px-3 py-2">{labCount}/{labCatalog.length}</td>
                  <td className="px-3 py-2 text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaymentsTab({
  payments,
}: {
  payments: {
    id: string;
    user_id: string;
    item_type: string;
    item_slug: string;
    amount_usd: number;
    provider: string;
    transaction_id: string;
    status: string;
    admin_note: string | null;
    created_at: string;
  }[];
}) {
  const queryClient = useQueryClient();
  const approve = useServerFn(adminPaymentAction);
  const [busy, setBusy] = useState<string | null>(null);

  async function action(paymentId: string, action: "approve" | "reject") {
    setBusy(paymentId);
    try {
      await approve({ data: { paymentId, action } });
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mt-6 space-y-3">
      {payments.length === 0 ? (
        <p className="text-sm text-muted-foreground">Wax lacag-bixin ah ma jirto.</p>
      ) : (
        payments.map((p) => (
          <div key={p.id} className="bento-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold capitalize">
                  {p.item_type === "course" ? "Course" : p.item_type === "exam" ? "Imtixaanka" : "Shahaadada"}
                  {" · "}${p.amount_usd}
                </p>
                <p className="text-xs text-muted-foreground">
                  {providerLabel(p.provider)} · TXID: {p.transaction_id} · {new Date(p.created_at).toLocaleDateString()}
                </p>
                {p.admin_note && (
                  <p className="mt-1 text-xs text-muted-foreground">Maamul: {p.admin_note}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    p.status === "approved"
                      ? "bg-success/15 text-success"
                      : p.status === "rejected"
                        ? "bg-destructive/15 text-destructive"
                        : "bg-warning/15 text-warning"
                  }`}
                >
                  {p.status === "approved" ? "La oggolaaday" : p.status === "rejected" ? "La diiday" : "Sugitaan"}
                </span>
                {p.status === "pending" && (
                  <>
                    <button
                      onClick={() => action(p.id, "approve")}
                      disabled={busy === p.id}
                      className="flex items-center gap-1.5 rounded-lg bg-success/15 px-3 py-1.5 text-xs font-semibold text-success hover:bg-success/25 disabled:opacity-50"
                    >
                      <CheckCircle2 className="size-3.5" /> Oggolee
                    </button>
                    <button
                      onClick={() => action(p.id, "reject")}
                      disabled={busy === p.id}
                      className="flex items-center gap-1.5 rounded-lg bg-destructive/15 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/25 disabled:opacity-50"
                    >
                      <XCircle className="size-3.5" /> Diidi
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function ReferralsTab({
  referrals,
}: {
  referrals: {
    id: string;
    referrer_id: string;
    referred_id: string;
    referral_code: string;
    commission_usd: number;
    status: string;
    earned_at: string | null;
    paid_at: string | null;
    created_at: string;
  }[];
}) {
  const queryClient = useQueryClient();
  const markPaid = useServerFn(adminReferralAction);
  const [busy, setBusy] = useState<string | null>(null);

  async function pay(referralId: string) {
    setBusy(referralId);
    try {
      await markPaid({ data: { referralId, action: "mark_paid" } });
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mt-6">
      <div className="bento-card overflow-x-auto p-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-3 py-2">Referrer</th>
              <th className="px-3 py-2">Arday</th>
              <th className="px-3 py-2">Commission</th>
              <th className="px-3 py-2">Xaaladda</th>
              <th className="px-3 py-2">Taariikhda</th>
              <th className="px-3 py-2">Ficil</th>
            </tr>
          </thead>
          <tbody>
            {referrals.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">
                  Wax referral ah ma jirto.
                </td>
              </tr>
            ) : (
              referrals.map((r) => (
                <tr key={r.id} className="border-t border-border/60">
                  <td className="px-3 py-2 font-mono text-xs">{r.referrer_id.slice(0, 8)}</td>
                  <td className="px-3 py-2 font-mono text-xs">{r.referred_id.slice(0, 8)}</td>
                  <td className="px-3 py-2 font-semibold">${Number(r.commission_usd).toFixed(2)}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-xs font-semibold ${
                        r.status === "paid"
                          ? "text-success"
                          : r.status === "earned"
                            ? "text-primary"
                            : "text-muted-foreground"
                      }`}
                    >
                      {r.status === "pending" ? "Sugitaan" : r.status === "earned" ? "La kasbay" : "La bixiyay"}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                  <td className="px-3 py-2">
                    {r.status === "earned" && (
                      <button
                        onClick={() => pay(r.id)}
                        disabled={busy === r.id}
                        className="rounded-lg bg-success/15 px-3 py-1.5 text-xs font-semibold text-success hover:bg-success/25 disabled:opacity-50"
                      >
                        Bixi commission
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CertificatesTab({
  certificates,
}: {
  certificates: { id: string; user_id: string; title: string; score: number; issued_at: string }[];
}) {
  return (
    <div className="mt-6">
      <div className="bento-card overflow-x-auto p-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-3 py-2">Lambarka</th>
              <th className="px-3 py-2">Magaca Shahaadada</th>
              <th className="px-3 py-2">Dhibco</th>
              <th className="px-3 py-2">Taariikhda</th>
              <th className="px-3 py-2">Xaqiijin</th>
            </tr>
          </thead>
          <tbody>
            {certificates.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                  Wax shahaado ah ma jirto.
                </td>
              </tr>
            ) : (
              certificates.map((c) => (
                <tr key={c.id} className="border-t border-border/60">
                  <td className="px-3 py-2 font-mono font-semibold">{c.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-3 py-2">{c.title}</td>
                  <td className="px-3 py-2 font-semibold">{c.score}%</td>
                  <td className="px-3 py-2 text-muted-foreground">{new Date(c.issued_at).toLocaleDateString()}</td>
                  <td className="px-3 py-2">
                    <Link
                      to="/verify"
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Eeg xaqiijinta
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CoursesTab() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {modules.map((m, i) => (
        <div key={m.slug} className="bento-card p-5">
          <p className="font-mono text-xs text-muted-foreground">Module {String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 font-display font-bold">{m.title}</h3>
          <p className="text-xs text-primary">{m.english}</p>
          <p className="mt-2 text-sm text-muted-foreground">{m.lessons} cashar · {m.hours} saac</p>
          <Link
            to="/courses/$module"
            params={{ module: m.slug }}
            className="mt-3 inline-block text-xs font-semibold text-primary hover:underline"
          >
            Eeg module-ka
          </Link>
        </div>
      ))}
    </div>
  );
}
