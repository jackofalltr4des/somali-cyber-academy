import { modules, type Module } from "./curriculum";
import { ethicalHackingModules } from "./ethical-hacking-curriculum";
import { digitalForensicsModules } from "./digital-forensics-curriculum";
import { cloudSecurityModules } from "./cloud-security-curriculum";
import { labCatalog } from "./labs";
import { moduleProgress, quizAverage, type LabRow, type ProgressRow } from "./progress";

export type PathCourse = {
  slug: string;
  title: string;
  english: string;
  /** Available courses reference a real module slug in curriculum.ts or ethical-hacking-curriculum.ts */
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

/**
 * All modules currently reachable via findModule/findLesson, used only to
 * validate that a moduleSlug actually resolves before we treat a course as
 * "available" in pathModules(). Keep this list in sync with the same
 * fallback chain used in curriculum.ts's findModule().
 */
const allKnownModules: Module[] = [...modules, ...ethicalHackingModules, ...digitalForensicsModules, ...cloudSecurityModules];

/**
 * SOC Analyst path — derived directly from curriculum.ts so this list can
 * never drift out of sync with the real modules again.
 */
const socCourses: PathCourse[] = modules.map((m) => ({
  slug: m.slug,
  title: m.title,
  english: m.english,
  moduleSlug: m.slug,
  hours: m.hours,
}));

/**
 * Ethical Hacking path — derived directly from ethical-hacking-curriculum.ts,
 * same self-syncing pattern as socCourses.
 */
const ehCourses: PathCourse[] = ethicalHackingModules.map((m) => ({
  slug: m.slug,
  title: m.title,
  english: m.english,
  moduleSlug: m.slug,
  hours: m.hours,
}));

/**
 * Digital Forensics path — derived directly from digital-forensics-curriculum.ts,
 * same self-syncing pattern as socCourses/ehCourses.
 */
const dfCourses: PathCourse[] = digitalForensicsModules.map((m) => ({
  slug: m.slug,
  title: m.title,
  english: m.english,
  moduleSlug: m.slug,
  hours: m.hours,
}));

/**
 * Cloud Security path — derived directly from cloud-security-curriculum.ts,
 * same self-syncing pattern as socCourses/ehCourses/dfCourses.
 */
const csCourses: PathCourse[] = cloudSecurityModules.map((m) => ({
  slug: m.slug,
  title: m.title,
  english: m.english,
  moduleSlug: m.slug,
  hours: m.hours,
}));

const socLabSlugs = [
  "log-analysis-ssh",
  "phishing-investigation",
  "suspicious-ip",
  "incident-report-lab",
  "windows-event-log-triage",
  "dns-tunneling-detection",
  "malware-static-triage",
  "cyberchef-decode-c2",
  "virustotal-hash-lookup",
  "sim-swap-fraud-investigation",
  "ussd-mobile-money-phishing",
  "phishing-playbook-execution",
  "escalation-decision-practice",
];

const ethicalHackingLabSlugs = [
  "nmap-scan-risk-triage",
  "linux-privesc-hunt",
  "web-log-sql-injection",
  "burp-suite-idor-analysis",
  "osint-recon-planning",
  "vulnerability-cvss-triage",
  "metasploit-exploitation-log",
  "nmap-command-practice",
  "hydra-brute-force-practice",
  "hashcat-crack-practice",
  "metasploit-exploitation-practice",
  "shodan-exposed-service-recon",
  "crtsh-subdomain-enum",
];

const digitalForensicsLabSlugs = [
  "mft-timeline-analysis",
  "memory-dump-process-triage",
  "usb-exfiltration-correlation",
  "steganography-detection-lab",
  "windows-event-log-clearing-detection",
  "prefetch-execution-timeline",
  "bitlocker-key-recovery-scenario",
  "dfir-full-scenario-triage",
];

const cloudSecurityLabSlugs = [
  "s3-bucket-exposure-triage",
  "iam-policy-privilege-audit",
  "security-group-misconfig-hunt",
  "cloudtrail-suspicious-api-analysis",
  "container-image-vulnerability-scan",
  "cloud-cost-anomaly-security-investigation",
  "cloud-dr-plan-gap-analysis",
  "multi-account-ir-scenario",
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
    labSlugs: socLabSlugs,
    courses: socCourses,
  },
  {
    slug: "ethical-hacking",
    title: "Waddada Ethical Hacking",
    english: "Ethical Hacking Path",
    tagline: "Offensive security: reconnaissance, scanning, web vulnerabilities iyo penetration testing.",
    level: "Dhexe",
    status: "live",
    outcome: "Junior Penetration Tester / Security Analyst (offensive).",
    certs: ["eJPT", "CompTIA PenTest+"],
    labSlugs: ethicalHackingLabSlugs,
    courses: ehCourses,
  },
  {
    slug: "digital-forensics",
    title: "Waddada Digital Forensics",
    english: "Digital Forensics Path",
    tagline: "Ururinta caddaynta, disk iyo memory forensics, iyo warbixinno baaritaan ah.",
    level: "Dhexe",
    status: "live",
    outcome: "Digital Forensics Analyst / DFIR support.",
    certs: ["GCFE", "GCFA", "Blue Team Level 1"],
    labSlugs: digitalForensicsLabSlugs,
    courses: dfCourses,
  },
  {
    slug: "cloud-security",
    title: "Waddada Cloud Security",
    english: "Cloud Security Path",
    tagline: "Amniga cloud-ka: identity, misconfigurations, monitoring iyo cloud incident response.",
    level: "Sare",
    status: "live",
    outcome: "Cloud Security Analyst / SecOps Engineer.",
    certs: ["AZ-500", "AWS Security Specialty"],
    labSlugs: cloudSecurityLabSlugs,
    courses: csCourses,
  },
  {
    slug: "grc-compliance",
    title: "Waddada GRC & Compliance",
    english: "GRC & Compliance Analyst Path",
    tagline: "Governance, risk, iyo compliance: policy, audits, iyo maamulka risk-ka organization-ka.",
    level: "Dhexe",
    status: "soon",
    outcome: "GRC Analyst / Compliance Analyst / Risk Analyst.",
    certs: ["ISC2 CGRC", "CompTIA Security+", "ISO 27001 Lead Implementer"],
    labSlugs: [],
    courses: [
      { slug: "grc-fundamentals", title: "Aasaaska GRC", english: "GRC Fundamentals" },
      { slug: "risk-management", title: "Maamulka Risk-ka", english: "Risk Management" },
      { slug: "compliance-frameworks", title: "Compliance Frameworks", english: "Compliance Frameworks (ISO 27001, SOC 2, NIST)" },
      { slug: "audit-fundamentals", title: "Aasaaska Audit-ka", english: "Audit Fundamentals" },
      { slug: "grc-capstone", title: "Capstone GRC", english: "GRC Capstone & Career Readiness" },
    ],
  },
  {
    slug: "appsec",
    title: "Waddada Application Security",
    english: "Application Security (AppSec) Engineer Path",
    tagline: "Amniga software-ka: secure code review, SAST/DAST, iyo isku darka security development lifecycle.",
    level: "Sare",
    status: "soon",
    outcome: "Application Security Engineer / AppSec Analyst.",
    certs: ["GWEB", "CSSLP", "CompTIA PenTest+"],
    labSlugs: [],
    courses: [
      { slug: "appsec-fundamentals", title: "Aasaaska AppSec", english: "AppSec Fundamentals" },
      { slug: "secure-code-review", title: "Secure Code Review", english: "Secure Code Review" },
      { slug: "sast-dast-tools", title: "SAST/DAST Tools", english: "SAST/DAST Tools" },
      { slug: "secure-sdlc", title: "Secure SDLC", english: "Secure Software Development Lifecycle" },
      { slug: "appsec-capstone", title: "Capstone AppSec", english: "AppSec Capstone & Career Readiness" },
    ],
  },
  {
    slug: "malware-analysis",
    title: "Waddada Malware Analysis",
    english: "Malware Analysis & Reverse Engineering Path",
    tagline: "Falanqaynta malware qoto dheer ah: static/dynamic analysis, disassembly, iyo reverse engineering.",
    level: "Sare",
    status: "soon",
    outcome: "Malware Analyst / Reverse Engineer.",
    certs: ["GREM", "GCFA"],
    labSlugs: [],
    courses: [
      { slug: "malware-analysis-fundamentals", title: "Aasaaska Malware Analysis", english: "Malware Analysis Fundamentals" },
      { slug: "static-analysis-deep", title: "Static Analysis Qoto Dheer", english: "Static Analysis Deep Dive" },
      { slug: "dynamic-analysis-sandboxing", title: "Dynamic Analysis & Sandboxing", english: "Dynamic Analysis & Sandboxing" },
      { slug: "disassembly-reverse-engineering", title: "Disassembly & Reverse Engineering", english: "Disassembly & Reverse Engineering" },
      { slug: "malware-analysis-capstone", title: "Capstone Malware Analysis", english: "Malware Analysis Capstone & Career Readiness" },
    ],
  },
  {
    slug: "red-team",
    title: "Waddada Red Team Operations",
    english: "Red Team Operator Path",
    tagline: "Adversary simulation heer sare ah: C2 frameworks, evasion advanced ah, iyo full engagement operations.",
    level: "Sare",
    status: "soon",
    outcome: "Red Team Operator / Adversary Simulation Specialist.",
    certs: ["OSCP", "CRTO"],
    labSlugs: [],
    courses: [
      { slug: "red-team-fundamentals", title: "Aasaaska Red Team", english: "Red Team Fundamentals" },
      { slug: "c2-frameworks", title: "C2 Frameworks", english: "Command & Control (C2) Frameworks" },
      { slug: "advanced-evasion", title: "Advanced Evasion", english: "Advanced Evasion Techniques" },
      { slug: "adversary-simulation", title: "Adversary Simulation", english: "Adversary Simulation & Emulation" },
      { slug: "red-team-capstone", title: "Capstone Red Team", english: "Red Team Capstone & Career Readiness" },
    ],
  },
  {
    slug: "security-architecture",
    title: "Waddada Security Architecture",
    english: "Security Architecture & Engineering Path",
    tagline: "Naqshaynta systems ammaan ah: zero trust, defense in depth, iyo enterprise security design.",
    level: "Sare",
    status: "soon",
    outcome: "Security Architect / Security Engineer.",
    certs: ["CISSP", "SABSA"],
    labSlugs: [],
    courses: [
      { slug: "security-architecture-fundamentals", title: "Aasaaska Security Architecture", english: "Security Architecture Fundamentals" },
      { slug: "zero-trust-design", title: "Zero Trust Design", english: "Zero Trust Architecture Design" },
      { slug: "enterprise-security-patterns", title: "Enterprise Security Patterns", english: "Enterprise Security Design Patterns" },
      { slug: "security-engineering", title: "Security Engineering", english: "Security Engineering Practices" },
      { slug: "security-architecture-capstone", title: "Capstone Security Architecture", english: "Security Architecture Capstone & Career Readiness" },
    ],
  },
  {
    slug: "iam-specialist",
    title: "Waddada IAM Specialist",
    english: "Identity & Access Management (IAM) Specialist Path",
    tagline: "Maamulka identity-ga: SSO, MFA, privileged access management, iyo IAM governance enterprise ah.",
    level: "Dhexe",
    status: "soon",
    outcome: "IAM Analyst / IAM Engineer.",
    certs: ["CIAM", "SailPoint IdentityIQ"],
    labSlugs: [],
    courses: [
      { slug: "iam-fundamentals-path", title: "Aasaaska IAM", english: "IAM Fundamentals" },
      { slug: "sso-federation-path", title: "SSO & Federation", english: "SSO & Identity Federation" },
      { slug: "privileged-access-management-path", title: "Privileged Access Management", english: "Privileged Access Management (PAM)" },
      { slug: "iam-governance", title: "IAM Governance", english: "IAM Governance & Lifecycle Management" },
      { slug: "iam-capstone-path", title: "Capstone IAM", english: "IAM Capstone & Career Readiness" },
    ],
  },
];

export function findPath(slug: string) {
  return careerPathList.find((p) => p.slug === slug);
}

export function pathModules(path: CareerPath): Module[] {
  return path.courses
    .map((c) => (c.moduleSlug ? allKnownModules.find((m) => m.slug === c.moduleSlug) : undefined))
    .filter((m): m is Module => Boolean(m));
}

export function pathProgress(path: CareerPath, rows: ProgressRow[]) {
  const mods = pathModules(path);
  const total = mods.reduce((n, m) => n + m.lessons, 0);
  const done = mods.reduce((n, m) => n + moduleProgress(m.slug, rows).done, 0);
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0, available: mods.length, courses: path.courses.length };
}

/**
 * Lesson completion aggregated across every live career path — replaces
 * relying on curriculum.ts's SOC-only `totalLessons` for dashboard-wide
 * stats, which undercounted anyone also doing EH/DF/CS.
 */
export function allLiveProgress(rows: ProgressRow[]) {
  const livePaths = careerPathList.filter((p) => p.status === "live");
  let done = 0;
  let total = 0;
  for (const path of livePaths) {
    const pp = pathProgress(path, rows);
    done += pp.done;
    total += pp.total;
  }
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
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
  const livePaths = careerPathList.filter((p) => p.status === "live");

  // Resume whichever path the student has actual progress in — not always
  // SOC Analyst. A student may be well into Ethical Hacking, Digital
  // Forensics, or Cloud Security with zero SOC activity.
  const started = livePaths.find((p) => {
    const modSlugs = new Set(pathModules(p).map((m) => m.slug));
    return rows.some((r) => modSlugs.has(r.module_slug));
  });
  const ordered = started ? [started, ...livePaths.filter((p) => p !== started)] : livePaths;

  for (const path of ordered) {
    const lesson = nextLesson(path, rows);
    if (lesson) return { kind: "lesson" as const, path, ...lesson };
    const lab = nextLab(path, labs);
    if (lab) return { kind: "lab" as const, path, lab };
  }

  // Every live path's lessons and labs are complete.
  const fallback = started ?? livePaths[0]!;
  return { kind: "certificate" as const, path: fallback, average: quizAverage(rows) };
}

export const labCategories = [
  { id: "soc", label: "SOC", slugs: ["log-analysis-ssh", "suspicious-ip", "incident-report-lab"] },
  { id: "email", label: "Email / Phishing", slugs: ["phishing-investigation"] },
  { id: "linux", label: "Linux", slugs: [] },
  { id: "networking", label: "Networking", slugs: [] },
  { id: "web", label: "Web Security", slugs: [] },
  { id: "forensics", label: "Digital Forensics", slugs: [] },
];
