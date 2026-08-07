import { careerPathList } from "./paths";
import { pathProgress, learningStreak } from "./paths";
import type { ProgressRow, LabRow } from "./progress";

export type BadgeCategory = "tool" | "investigation" | "forensics" | "cloud" | "milestone";

export type BadgeDef = {
  id: string;
  name: string;
  somali: string;
  category: BadgeCategory;
  earned: boolean;
  hint: string;
};

function labPassed(labs: LabRow[], slug: string): boolean {
  return labs.some((l) => l.lab_slug === slug && l.passed);
}

function allLabsPassed(labs: LabRow[], slugs: string[]): boolean {
  return slugs.every((s) => labPassed(labs, s));
}

export function computeBadges(params: {
  progress: ProgressRow[];
  labs: LabRow[];
  certsCount: number;
  referralsEarnedCount: number;
}): BadgeDef[] {
  const { progress, labs, certsCount, referralsEarnedCount } = params;
  const streak = learningStreak(progress);
  const anyLabPassed = labs.some((l) => l.passed);

  const badges: BadgeDef[] = [
    // Tool-specific
    {
      id: "nmap-navigator",
      name: "Nmap Navigator",
      somali: "Nmap Navigator",
      category: "tool",
      earned: labPassed(labs, "nmap-command-practice"),
      hint: "Dhammayso lab-ka Nmap Command Practice.",
    },
    {
      id: "brute-force-breaker",
      name: "Brute Force Breaker",
      somali: "Brute Force Breaker",
      category: "tool",
      earned: labPassed(labs, "hydra-brute-force-practice"),
      hint: "Dhammayso lab-ka Hydra Brute Force Practice.",
    },
    {
      id: "hash-cracker",
      name: "Hash Cracker",
      somali: "Hash Cracker",
      category: "tool",
      earned: labPassed(labs, "hashcat-crack-practice"),
      hint: "Dhammayso lab-ka Hashcat Crack Practice.",
    },
    {
      id: "metasploit-operator",
      name: "Metasploit Operator",
      somali: "Metasploit Operator",
      category: "tool",
      earned: labPassed(labs, "metasploit-exploitation-practice"),
      hint: "Dhammayso lab-ka Metasploit Exploitation Practice.",
    },
    {
      id: "burp-suite-specialist",
      name: "Burp Suite Specialist",
      somali: "Burp Suite Specialist",
      category: "tool",
      earned: labPassed(labs, "burp-suite-idor-analysis"),
      hint: "Dhammayso lab-ka Burp Suite IDOR Analysis.",
    },
    {
      id: "cyberchef-decoder",
      name: "CyberChef Decoder",
      somali: "CyberChef Decoder",
      category: "tool",
      earned: labPassed(labs, "cyberchef-decode-c2"),
      hint: "Dhammayso lab-ka CyberChef Decode C2.",
    },
    {
      id: "virustotal-analyst",
      name: "VirusTotal Analyst",
      somali: "VirusTotal Analyst",
      category: "tool",
      earned: labPassed(labs, "virustotal-hash-lookup"),
      hint: "Dhammayso lab-ka VirusTotal Hash Lookup.",
    },
    {
      id: "shodan-scout",
      name: "Shodan Scout",
      somali: "Shodan Scout",
      category: "tool",
      earned: labPassed(labs, "shodan-exposed-service-recon"),
      hint: "Dhammayso lab-ka Shodan Exposed Service Recon.",
    },
    {
      id: "recon-specialist",
      name: "Recon Specialist",
      somali: "Recon Specialist",
      category: "tool",
      earned: allLabsPassed(labs, ["crtsh-subdomain-enum", "osint-recon-planning"]),
      hint: "Dhammayso crt.sh Subdomain Enum iyo OSINT Recon Planning labaduba.",
    },

    // Investigation / SOC
    {
      id: "log-hunter",
      name: "Log Hunter",
      somali: "Log Hunter",
      category: "investigation",
      earned: labPassed(labs, "log-analysis-ssh"),
      hint: "Dhammayso lab-ka SSH Log Analysis.",
    },
    {
      id: "phishing-sleuth",
      name: "Phishing Sleuth",
      somali: "Phishing Sleuth",
      category: "investigation",
      earned: labPassed(labs, "phishing-investigation"),
      hint: "Dhammayso lab-ka Phishing Investigation.",
    },
    {
      id: "c2-tracker",
      name: "C2 Tracker",
      somali: "C2 Tracker",
      category: "investigation",
      earned: labPassed(labs, "suspicious-ip"),
      hint: "Dhammayso lab-ka Suspicious IP.",
    },
    {
      id: "incident-scribe",
      name: "Incident Scribe",
      somali: "Incident Scribe",
      category: "investigation",
      earned: labPassed(labs, "incident-report-lab"),
      hint: "Dhammayso lab-ka Incident Report.",
    },
    {
      id: "playbook-pro",
      name: "Playbook Pro",
      somali: "Playbook Pro",
      category: "investigation",
      earned: labPassed(labs, "phishing-playbook-execution"),
      hint: "Dhammayso lab-ka Phishing Playbook Execution.",
    },
    {
      id: "escalation-expert",
      name: "Escalation Expert",
      somali: "Escalation Expert",
      category: "investigation",
      earned: labPassed(labs, "escalation-decision-practice"),
      hint: "Dhammayso lab-ka Escalation Decision Practice.",
    },
    {
      id: "fraud-investigator",
      name: "Fraud Investigator",
      somali: "Fraud Investigator",
      category: "investigation",
      earned: allLabsPassed(labs, ["sim-swap-fraud-investigation", "ussd-mobile-money-phishing"]),
      hint: "Dhammayso SIM Swap Fraud iyo USSD Mobile Money Phishing labaduba.",
    },

    // Digital Forensics
    {
      id: "timeline-builder",
      name: "Timeline Builder",
      somali: "Timeline Builder",
      category: "forensics",
      earned: labPassed(labs, "mft-timeline-analysis"),
      hint: "Dhammayso lab-ka MFT Timeline Analysis.",
    },
    {
      id: "memory-detective",
      name: "Memory Detective",
      somali: "Memory Detective",
      category: "forensics",
      earned: labPassed(labs, "memory-dump-process-triage"),
      hint: "Dhammayso lab-ka Memory Dump Process Triage.",
    },
    {
      id: "malware-triager",
      name: "Malware Triager",
      somali: "Malware Triager",
      category: "forensics",
      earned: labPassed(labs, "malware-static-triage"),
      hint: "Dhammayso lab-ka Malware Static Triage.",
    },
    {
      id: "anti-forensics-buster",
      name: "Anti-Forensics Buster",
      somali: "Anti-Forensics Buster",
      category: "forensics",
      earned: labPassed(labs, "windows-event-log-clearing-detection"),
      hint: "Dhammayso lab-ka Windows Event Log Clearing Detection.",
    },
    {
      id: "dfir-veteran",
      name: "DFIR Veteran",
      somali: "DFIR Veteran",
      category: "forensics",
      earned: labPassed(labs, "dfir-full-scenario-triage"),
      hint: "Dhammayso lab-ka capstone-ka DFIR Full Scenario Triage.",
    },

    // Cloud Security
    {
      id: "cloud-auditor",
      name: "Cloud Auditor",
      somali: "Cloud Auditor",
      category: "cloud",
      earned: labPassed(labs, "iam-policy-privilege-audit"),
      hint: "Dhammayso lab-ka IAM Policy Privilege Audit.",
    },
    {
      id: "bucket-guardian",
      name: "Bucket Guardian",
      somali: "Bucket Guardian",
      category: "cloud",
      earned: labPassed(labs, "s3-bucket-exposure-triage"),
      hint: "Dhammayso lab-ka S3 Bucket Exposure Triage.",
    },
    {
      id: "cloudtrail-tracker",
      name: "CloudTrail Tracker",
      somali: "CloudTrail Tracker",
      category: "cloud",
      earned: labPassed(labs, "cloudtrail-suspicious-api-analysis"),
      hint: "Dhammayso lab-ka CloudTrail Suspicious API Analysis.",
    },
    {
      id: "cloud-ir-commander",
      name: "Cloud IR Commander",
      somali: "Cloud IR Commander",
      category: "cloud",
      earned: labPassed(labs, "multi-account-ir-scenario"),
      hint: "Dhammayso lab-ka capstone-ka Multi-Account IR Scenario.",
    },

    // Milestone / meta
    {
      id: "first-blood",
      name: "First Blood",
      somali: "First Blood",
      category: "milestone",
      earned: anyLabPassed,
      hint: "Dhammayso lab-kaaga ugu horreeya.",
    },
    ...careerPathList
      .filter((p) => p.status === "live")
      .map((p) => ({
        id: `path-finisher-${p.slug}`,
        name: `Path Finisher — ${p.english}`,
        somali: `Path Finisher — ${p.title}`,
        category: "milestone" as const,
        earned: pathProgress(p, progress).percent >= 100,
        hint: `Dhammayso 100% waddada ${p.title}.`,
      })),
    {
      id: "streak-starter",
      name: "Streak Starter",
      somali: "Streak Starter",
      category: "milestone",
      earned: streak >= 7,
      hint: "Gaar 7 maalmood oo isku xigxiga ah oo aad wax barato.",
    },
    {
      id: "consistency-king-queen",
      name: "Consistency King/Queen",
      somali: "Consistency King/Queen",
      category: "milestone",
      earned: streak >= 30,
      hint: "Gaar 30 maalmood oo isku xigxiga ah oo aad wax barato.",
    },
    {
      id: "iron-analyst",
      name: "Iron Analyst",
      somali: "Iron Analyst",
      category: "milestone",
      earned: streak >= 100,
      hint: "Gaar 100 maalmood oo isku xigxiga ah oo aad wax barato.",
    },
    {
      id: "referral-recruiter",
      name: "Referral Recruiter",
      somali: "Referral Recruiter",
      category: "milestone",
      earned: referralsEarnedCount >= 1,
      hint: "Hel referral kaaga ugu horreeya oo lacag bixiyay.",
    },
  ];

  void certsCount; // reserved for a future "Certified x4" style badge if wanted
  return badges;
}
