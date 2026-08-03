import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Loader2, MailCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/site/Shell";

const title = "Password reset — SomTrust Cyber Academy";
const description = "Dib u deji password-kaaga SomTrust Cyber Academy adigoo isticmaalaya email-kaaga.";

export const Route = createFileRoute("/forgot-password")({
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
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = z.string().trim().email().max(255).safeParse(email);
    if (!parsed.success) {
      setError("Email-ka ma saxna.");
      return;
    }
    setBusy(true);
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(parsed.data, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (err) throw err;
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Wax qalad ah dhacay");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-md">
        <h1 className="font-display text-2xl font-bold">Password-ka waa la ilaaway?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Geli email-ka akoonkaaga, waxaan kuu dirnaa link dib u dejin ah.
        </p>

        {sent ? (
          <div className="bento-card mt-6 flex gap-3 p-5">
            <MailCheck className="size-5 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              Waan dirnay email. Fur email-kaaga oo guji link-ga si aad password cusub u dejiso.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Email
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                maxLength={255}
                className="input-base"
                autoComplete="email"
                placeholder="magac@tusaale.so"
              />
            </label>
            {error && (
              <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {busy && <Loader2 className="size-4 animate-spin" />} Dir link-ga
            </button>
          </form>
        )}

        <p className="mt-6 text-sm">
          <Link to="/auth" search={{ mode: "login" }} className="text-muted-foreground hover:text-foreground">
            ← Ku noqo galitaanka
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
