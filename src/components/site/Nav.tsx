import { ShieldHalf } from "lucide-react";

const links = [
  { label: "Manhajka", href: "#manhaj" },
  { label: "Labs", href: "#labs" },
  { label: "SOC Track", href: "#soc" },
  { label: "Su'aalo", href: "#faq" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary glow-ring">
            <ShieldHalf className="size-5" />
          </span>
          <span className="font-display text-base font-bold tracking-tight">
            Cyber<span className="text-primary">Soomaali</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#manhaj"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Bilow Bilaash
        </a>
      </div>
    </header>
  );
}
