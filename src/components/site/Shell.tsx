import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { ShieldHalf, Menu, X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSessionUser } from "@/hooks/useSessionUser";
import { cn } from "@/lib/utils";

export function Brand({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary glow-ring">
        <ShieldHalf className="size-5" />
      </span>
      <span className="font-display text-base font-bold leading-tight tracking-tight">
        Som<span className="text-primary">Trust</span>
        <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Cyber Academy
        </span>
      </span>
    </Link>
  );
}

const publicLinks = [
  { label: "Courses", to: "/courses" as const },
  { label: "Labs", to: "/labs" as const },
  { label: "Careers", to: "/careers" as const },
];

const studentLinks = [
  { label: "Dashboard", to: "/dashboard" as const },
  { label: "Courses", to: "/courses" as const },
  { label: "Labs", to: "/labs" as const },
  { label: "AI Mentor", to: "/mentor" as const },
  { label: "Certificate", to: "/certificate" as const },
  { label: "Careers", to: "/careers" as const },
];

export function SiteHeader() {
  const { user, loading } = useSessionUser();
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const links = user ? studentLinks : publicLinks;

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await router.invalidate();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Brand />

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {loading ? null : user ? (
            <button
              onClick={signOut}
              className="rounded-xl border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent"
            >
              Ka bax
            </button>
          ) : (
            <>
              <Link to="/auth" search={{ mode: "login" }} className="text-sm text-muted-foreground hover:text-foreground">
                Gal
              </Link>
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Bilow Bilaash
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden rounded-lg border border-border p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background/95 px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <button onClick={signOut} className="mt-1 text-left text-sm font-semibold text-primary">
                Ka bax
              </button>
            ) : (
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground"
              >
                Bilow Bilaash
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display font-semibold text-foreground">SomTrust Cyber Academy</p>
        <p>Professional Cybersecurity Training in Somali + English</p>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
      <SiteFooter />
    </div>
  );
}
