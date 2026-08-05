import { modules, type Module } from "./curriculum";
import { labCatalog } from "./labs";
import { moduleProgress, quizAverage, type LabRow, type ProgressRow } from "./progress";

export type PathCourse = {
  slug: string;
  title: string;
  english: string;
  /** Available courses reference a real module slug in curriculum.ts */
  moduleSlug?: string;
  hours?: number;
};

export type CareerPath = {
  slug: string;
  title: string;
  english: string;
  tagline: string;
  level: "Bilow" | "Dhexe" | "Sare";
  status: "live" | "soon";
  outcome: string;
  certs: string[];
  labSlugs: string[];
  courses: PathCourse[];
};

/** SOC Analyst path — maps 1:1 onto the 10 real modules (24 lessons) in curriculum.ts */
const socCourses: PathCourse[] = [
  {
    slug: "aasaaska-it",
    title: "Aasaaska IT & Kombiyuutarka",
    english: "IT & Computer Fundamentals",
    moduleSlug: "aasaaska-it",
  },
  {
    slug: "networking",
    title: "Networking Analyst-ka",
    english: "Networking for Analysts",
    moduleSlug: "networking",
  },
  {
    slug: "linux",
    title: "Linux for SOC",
    english: "Linux for SOC",
    moduleSlug: "linux",
  },
  {
    slug: "security-fundamentals",
    title: "Aasaaska Amniga",
    english: "Security Fundamentals",
    moduleSlug: "security-fundamentals",
  },
  {
    slug: "phishing",
    title: "Phishing & Email Security",
    english: "Phishing & Email Security",
    moduleSlug: "phishing",
  },
  {
    slug: "soc-operations",
    title: "SOC Operations",
    english: "SOC Operations",
    moduleSlug: "soc-operations",
  },
  {
    slug: "siem-detection",
    title: "SIEM & Log Analysis",
    english: "SIEM & Log Analysis",
    moduleSlug: "siem-detection",
  },
  {
    slug: "incident-response",
    title: "Incident Response",
    english: "Incident Response",
    moduleSlug: "incident-response",
  },
  {
    slug: "threat-intelligence",
    title: "Threat Intelligence",
    english: "Threat Intelligence & OSINT",
    moduleSlug: "threat-intelligence",
  },
  {
    slug: "threat-hunting",
    title: "Threat Hunting",
    english: "Threat Hunting & Advanced Detection",
    moduleSlug: "threat-hunting",
  },
];

export const careerPathList: CareerPath[] = [
  {
    slug: "soc-analyst",
    title: "Waddada SOC Analyst",
    english: "SOC Analyst Path",
    tagline:
      "Waddada ugu dhakhsaha badan shaqo cybersecurity: triage alerts, falanqee logs, oo qor warbixin incident ah.",
    level: "Bilow",
    status: "live",
    outcome: "Junior / Tier 1 SOC Analyst — monitoring, triage iyo incident reporting.",
    certs: ["ISC2 CC", "CompTIA Security+", "Blue Team Level 1"],
    labSlugs: labCatalog.map((l) => l.slug),
    courses: socCourses,
  },
  {
    slug: "ethical-hacking",
    title: "Waddada Ethical Hacking",
    english: "Ethical Hacking Path",
    tagline: "Offensive security: reconnaissance, scanning, web vulnerabilities iyo penetration testing.",
    level: "Dhexe",
    status: "soon",
    outcome: "Junior Penetration Tester / Security Analyst (offensive).",
    certs: ["eJPT", "CompTIA PenTest+"],
    labSlugs: [],
    courses: [
      { slug: "security-fundamentals", title: "Aasaaska Amniga", english: "Security Fundamentals", moduleSlug: "security-fundamentals" },
      { slug: "reconnaissance", title: "Reconnaissance", english: "Reconnaissance & OSINT" },
      { slug: "nmap", title: "Nmap & Scanning", english: "Nmap & Network Scanning" },
      { slug: "web-security", title: "Web Security", english: "Web Application Security" },
      { slug: "owasp-top-10", title: "OWASP Top 10", english: "OWASP Top 10" },
      { slug: "burp-suite", title: "Burp Suite", english: "Burp Suite" },
      { slug: "vulnerability-testing", title: "Vulnerability Testing", english: "Vulnerability Assessment" },
      { slug: "pentest-basics", title: "Penetration Testing Basics", english: "Penetration Testing Basics" },
    ],
  },
  {
    slug: "digital-forensics",
    title: "Waddada Digital Forensics",
    english: "Digital Forensics Path",
    tagline: "Ururinta caddaynta, disk iyo memory forensics, iyo warbixinno baaritaan ah.",
    level: "Dhexe",
    status: "soon",
    outcome: "Digital Forensics Analyst / DFIR support.",
    certs: ["GCFA (long-term)", "Blue Team Level 1"],
    labSlugs: [],
    courses: [
      { slug: "evidence-collection", title: "Ururinta Caddaynta", english: "Evidence Collection & Chain of Custody" },
      { slug: "disk-forensics", title: "Disk Forensics", english: "Disk Forensics" },
      { slug: "memory-forensics", title: "Memory Forensics", english: "Memory Forensics" },
      { slug: "investigation-reports", title: "Warbixinno Baaritaan", english: "Investigation Reports" },
    ],
  },
  {
    slug: "cloud-security",
    title: "Waddada Cloud Security",
    english: "Cloud Security Path",
    tagline: "Amniga cloud-ka: identity, misconfigurations, monitoring iyo cloud incident response.",
    level: "Sare",
    status: "soon",
    outcome: "Cloud Security Analyst / SecOps Engineer.",
    certs: ["AZ-500", "AWS Security Specialty"],
    labSlugs: [],
    courses: [
      { slug: "cloud-fundamentals", title: "Aasaaska Cloud-ka", english: "Cloud Fundamentals" },
      { slug: "identity-management", title: "Identity Management", english: "Identity & Access Management" },
      { slug: "cloud-threats", title: "Cloud Threats", english: "Cloud Threats" },
      { slug: "cloud-monitoring", title: "Monitoring", english: "Cloud Monitoring" },
      { slug: "cloud-incident-response", title: "Cloud Incident Response", english: "Cloud Incident Response" },
    ],
  },
];

export function findPath(slug: string) {
  return careerPathList.find((p) => p.slug === slug);
}

export function pathModules(path: CareerPath): Module[] {
  return path.courses
    .map((c) => (c.moduleSlug ? modules.find((m) => m.slug === c.moduleSlug) : undefined))
    .filter((m): m is Module => Boolean(m));
}

export function pathProgress(path: CareerPath, rows: ProgressRow[]) {
  const mods = pathModules(path);
  const total = mods.reduce((n, m) => n + m.lessons, 0);
  const done = mods.reduce((n, m) => n + moduleProgress(m.slug, rows).done, 0);
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0, available: mods.length, courses: path.courses.length };
}

/** Next unfinished lesson in a path — powers "resume learning". */
export function nextLesson(path: CareerPath, rows: ProgressRow[]) {
  for (const mod of pathModules(path)) {
    for (const lesson of mod.lessonList) {
      const done = rows.some((r) => r.module_slug === mod.slug && r.lesson_slug === lesson.slug);
      if (!done) return { module: mod, lesson };
    }
  }
  return null;
}

export function nextLab(path: CareerPath, labs: LabRow[]) {
  const slugs = path.labSlugs;
  return (
    labCatalog.find((l) => slugs.includes(l.slug) && !labs.some((r) => r.lab_slug === l.slug && r.passed)) ?? null
  );
}

/** Consecutive-day study streak from lesson completion timestamps. */
export function learningStreak(rows: { completed_at?: string | null }[]) {
  const days = new Set(
    rows
      .map((r) => (r.completed_at ? new Date(r.completed_at).toISOString().slice(0, 10) : null))
      .filter((d): d is string => Boolean(d)),
  );
  if (!days.size) return 0;

  const today = new Date();
  const key = (d: Date) => d.toISOString().slice(0, 10);
  let cursor = new Date(today);
  if (!days.has(key(cursor))) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
    if (!days.has(key(cursor))) return 0;
  }
  let streak = 0;
  while (days.has(key(cursor))) {
    streak += 1;
    cursor = new Date(cursor);
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

export function recommendedNext(rows: ProgressRow[], labs: LabRow[]) {
  const soc = careerPathList[0]!;
  const lesson = nextLesson(soc, rows);
  if (lesson) return { kind: "lesson" as const, ...lesson };
  const lab = nextLab(soc, labs);
  if (lab) return { kind: "lab" as const, lab };
  return { kind: "certificate" as const, average: quizAverage(rows) };
}

export const labCategories = [
  { id: "soc", label: "SOC", slugs: ["log-analysis-ssh", "suspicious-ip", "incident-report-lab"] },
  { id: "email", label: "Email / Phishing", slugs: ["phishing-investigation"] },
  { id: "linux", label: "Linux", slugs: [] },
  { id: "networking", label: "Networking", slugs: [] },
  { id: "web", label: "Web Security", slugs: [] },
  { id: "forensics", label: "Digital Forensics", slugs: [] },
];
