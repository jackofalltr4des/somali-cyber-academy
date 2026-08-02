import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ShieldCheck, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Brand } from "@/components/site/Shell";
import { totalHours, totalLessons } from "@/lib/curriculum";

const searchSchema = z.object({
  mode: z.enum(["login", "signup"]).catch("login"),
});

const title = "Gal / Isdiiwaangeli — SomTrust Cyber Academy";
const description =
  "Samee akoon bilaash ah oo bilow tababarka cybersecurity af Soomaali: 24 cashar, 4 SOC labs iyo AI Cyber Mentor.";

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
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
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(mode === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const parsed = z
      .object({
        email: z.string().trim().email("Email-ka ma saxna").max(255),
        password: z.string().min(8, "Password-ku waa inuu ka badan yahay 8 xaraf").max(72),
        displayName: isSignup
          ? z.string().trim().min(2, "Magaca waa inuu ka badan yahay 2 xaraf").max(60)
          : z.string().optional(),
      })
      .safeParse({ email, password, displayName });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Xog khaldan");
      return;
    }

    setBusy(true);
    try {
      if (isSignup) {
        const { data, error: err } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: parsed.data.displayName },
          },
        });
        if (err) throw err;
        if (!data.session) {
          setNotice(
            "Waan kuu dirnay email xaqiijin ah. Fadlan fur email-kaaga oo guji link-ga si aad akoonkaaga u hawlgeliso.",
          );
          return;
        }
        navigate({ to: "/dashboard", replace: true });
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (err) throw err;
        navigate({ to: "/dashboard", replace: true });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Wax qalad ah dhacay";
      setError(
        msg.includes("Invalid login credentials")
          ? "Email ama password khaldan."
          : msg.includes("already registered")
            ? "Email-kan hore ayaa loo diiwaangeliyay. Fadlan gal."
            : msg,
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen bg-background text-foreground lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between border-r border-border/70 bg-surface p-10 lg:flex">
        <Brand />
        <div>
          <h1 className="font-display text-3xl font-bold leading-tight">
            Ku soo dhawow <span className="text-gradient-indigo">SomTrust Cyber Academy</span>
          </h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Professional Cybersecurity Training in Somali + English. Bilow ilaa Junior SOC Analyst —
            casharro, labs dhab ah, iyo AI Cyber Mentor.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: `${totalLessons}`, v: "Casharro" },
              { k: `${totalHours}h`, v: "Manhaj" },
              { k: "4", v: "SOC Labs" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-border/70 bg-card p-4">
                <dt className="font-display text-2xl font-bold text-primary">{s.k}</dt>
                <dd className="text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-primary" /> Xogtaada waa la ilaaliyaa — akoon kastaa
          wuxuu arkaa horumarkiisa oo keliya.
        </p>
      </div>

      <div className="flex flex-col justify-center px-5 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="lg:hidden">
            <Brand />
          </div>
          <h2 className="mt-8 font-display text-2xl font-bold lg:mt-0">
            {isSignup ? "Samee akoon bilaash ah" : "Gal akoonkaaga"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSignup
              ? "Diiwaangelinta waxay qaadataa 30 ilbiriqsi."
              : "Sii wad halkii aad ka joogsatay."}
          </p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            {isSignup && (
              <Field label="Magacaaga buuxa">
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Amina Hassan"
                  maxLength={60}
                  className="input-base"
                  autoComplete="name"
                />
              </Field>
            )}
            <Field label="Email">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="magac@tusaale.so"
                maxLength={255}
                className="input-base"
                autoComplete="email"
              />
            </Field>
            <Field label="Password">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Ugu yaraan 8 xaraf"
                maxLength={72}
                className="input-base"
                autoComplete={isSignup ? "new-password" : "current-password"}
              />
            </Field>

            {error && (
              <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
            {notice && (
              <p className="rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-foreground">
                {notice}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy && <Loader2 className="size-4 animate-spin" />}
              {isSignup ? "Samee akoon" : "Gal"}
            </button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            {isSignup ? "Akoon hore ma leedahay?" : "Akoon ma lihi?"}{" "}
            <button
              onClick={() => {
                setIsSignup((v) => !v);
                setError(null);
                setNotice(null);
              }}
              className="font-semibold text-primary hover:underline"
            >
              {isSignup ? "Gal" : "Isdiiwaangeli"}
            </button>
          </p>
          <p className="mt-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              ← Ku noqo bogga hore
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
