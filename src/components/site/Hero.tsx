import heroMesh from "@/assets/hero-mesh.jpg";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <img
        src={heroMesh}
        alt="Network-ka isku xiran ee ammaanka macluumaadka"
        width={1600}
        height={1000}
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-30 mix-blend-screen"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
      <div className="grid-noise pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-20 md:pb-20 md:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-primary-glow" />
          Waxbarasho af Soomaali · ereyo Ingiriisi ah
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">
          Baro <span className="text-gradient-indigo">Cybersecurity</span> af Soomaali,
          bilow ilaa SOC Analyst
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Manhaj dhammaystiran: aasaaska kombiyuutarka, networking, Linux, phishing,
          khiyaamada online, SIEM, threat detection iyo incident response — oo dhan
          lagu sharxay af Soomaali oo leh labs practical ah.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="/auth?mode=signup"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground glow-ring transition-opacity hover:opacity-90"
          >
            Bilow hadda <ArrowRight className="size-4" />
          </a>
          <a
            href="#manhaj"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/50"
          >
            Eeg manhajka
          </a>
        </div>
      </div>
    </section>
  );
}
