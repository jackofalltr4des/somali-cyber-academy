import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, ArrowRight, Briefcase, GraduationCap } from "lucide-react";
import { PageShell } from "@/components/site/Shell";

const title = "Career Roadmap & Certifications — SomTrust Cyber Academy";
const description =
  "Waddo shaqo cybersecurity: Beginner → Junior SOC Analyst → Security Analyst → Advanced. ISC2 CC, CompTIA Security+, eJPT iyo SOC Analyst path.";

export const Route = createFileRoute("/careers")({
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
  component: CareersPage,
});

const stages = [
  {
    stage: "1. Beginner",
    role: "IT Foundations",
    months: "Bilo 0–3",
    somali:
      "Baro aasaaska kombiyuutarka, networking, Linux iyo security basics. Halkan ka bilow modules 1–3 ee academy-ga.",
    skills: ["Hardware & OS", "TCP/IP, DNS, HTTP", "Linux CLI", "CIA Triad", "Password security & MFA"],
    certs: ["CompTIA ITF+ (ikhtiyaari)", "Google IT Support (ikhtiyaari)"],
  },
  {
    stage: "2. Junior SOC Analyst (Tier 1)",
    role: "SOC Analyst — Tier 1",
    months: "Bilo 3–9",
    somali:
      "Kani waa yoolka ugu dhow. Waxaad qabanaysaa alert triage, log analysis, phishing investigation iyo escalation. Modules 4–8 + dhammaan labs-ka.",
    skills: ["Alert triage", "SIEM queries", "Log analysis", "Phishing analysis", "IOC enrichment", "Incident reporting"],
    certs: ["ISC2 CC", "CompTIA Security+"],
  },
  {
    stage: "3. Security Analyst (Tier 2)",
    role: "Security / Detection Analyst",
    months: "Bilo 9–18",
    somali:
      "Waxaad u gudubtaa threat hunting, detection engineering iyo incident response oo dhameystiran. Waxaad qortaa detection rules oo hore u qaadaysaa dhacdooyinka.",
    skills: ["Threat hunting", "Detection engineering (Sigma)", "DFIR basics", "MITRE ATT&CK mapping", "Automation/scripting"],
    certs: ["Blue Team Level 1", "CompTIA CySA+", "GCIH"],
  },
  {
    stage: "4. Advanced Paths",
    role: "Specialization",
    months: "Bilo 18+",
    somali:
      "Dooro takhasus: Offensive Security (pentesting), Incident Response/Forensics, Cloud Security, ama GRC.",
    skills: ["Penetration testing", "Malware analysis", "Cloud security (AWS/Azure)", "GRC & audit"],
    certs: ["eJPT → eCPPT / OSCP", "GCFA", "AZ-500 / AWS Security", "ISO 27001 LA"],
  },
];

const certs = [
  {
    name: "ISC2 CC",
    full: "Certified in Cybersecurity",
    level: "Entry",
    somali:
      "Shahaadada ugu fudud oo caalami ah. Waxay daboolaysaa security principles, access control, network security iyo operations. Fiican in laga bilaabo.",
    prep: "Modules 1–5 + quizzes",
  },
  {
    name: "CompTIA Security+",
    full: "SY0-701",
    level: "Core",
    somali:
      "Shahaadada ugu badan ee shaqooyinka SOC Tier 1 loo dalbado. Waxay daboolaysaa threats, architecture, operations iyo governance.",
    prep: "Modules 1–8 + dhammaan labs-ka",
  },
  {
    name: "eJPT",
    full: "eLearnSecurity Junior Penetration Tester",
    level: "Offensive",
    somali:
      "Imtixaan practical ah oo hands-on. Waxay caddaysaa xirfadaha network scanning, exploitation aasaasi ah iyo web attacks.",
    prep: "Linux module + tababar dheeraad ah",
  },
  {
    name: "SOC Analyst Role",
    full: "Junior SOC Analyst position",
    level: "Career",
    somali:
      "Yoolka ugu weyn: shaqo Tier 1. Waxaa laga rabaa triage, log analysis, warbixin qorista iyo shaqo shift ah. Portfolio labs-ka academy-ga wuxuu caddaymaha bixiyaa.",
    prep: "Shahaadada SomTrust + 4 labs report",
  },
];

function CareersPage() {
  return (
    <PageShell>
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Career Roadmap</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Waddada <span className="text-gradient-indigo">shaqada cybersecurity</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Beginner → Junior SOC Analyst → Security Analyst → Advanced Paths. Tallaabo tallaabo, oo leh
          shahaadooyinka saxda ah waqti kasta.
        </p>
      </header>

      <div className="mt-10 space-y-5">
        {stages.map((s, i) => (
          <div key={s.stage} className="bento-card grid gap-6 p-7 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 font-display font-bold text-primary">
                {i + 1}
              </span>
              <h2 className="mt-4 font-display text-xl font-bold">{s.stage}</h2>
              <p className="text-sm text-primary">{s.role}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.months}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{s.somali}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.skills.map((k) => (
                  <span key={k} className="rounded-full bg-surface-raised px-3 py-1 text-xs text-foreground">
                    {k}
                  </span>
                ))}
              </div>
              <ul className="mt-4 space-y-1.5 text-sm">
                {s.certs.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-muted-foreground">
                    <Award className="size-4 text-primary" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold">Shahaadooyinka muhiimka ah</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {certs.map((c) => (
          <div key={c.name} className="bento-card p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold">{c.name}</h3>
                <p className="text-xs text-primary">{c.full}</p>
              </div>
              <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary">
                {c.level}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{c.somali}</p>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <GraduationCap className="size-4 text-primary" /> Diyaarinta: {c.prep}
            </p>
          </div>
        ))}
      </div>

      <div className="bento-card mt-10 flex flex-col items-start justify-between gap-4 p-7 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-xl font-bold">Bilow waddadaada maanta</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Isdiiwaangeli module-ka koowaad oo qaado labs-ka SOC-ga.
          </p>
        </div>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          <Briefcase className="size-4" /> Fur courses <ArrowRight className="size-4" />
        </Link>
      </div>
    </PageShell>
  );
}
