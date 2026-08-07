export type CareerStage = {
  stage: string;
  role: string;
  months: string;
  somali: string;
  skills: string[];
  certs: string[];
};

export type CareerCert = {
  name: string;
  full: string;
  level: string;
  somali: string;
  prep: string;
};

export type PathCareerRoadmap = {
  stages: CareerStage[];
  certs: CareerCert[];
};

/**
 * Career roadmap detail, keyed by CareerPath.slug (see lib/paths.ts).
 * Only paths with real curriculum content (status: "live") have an entry
 * here. careers.$path.tsx shows a "coming soon" state for any path slug
 * that isn't present in this record. Add the roadmap here in the same pass
 * a path flips from "soon" to "live".
 */
export const careerRoadmaps: Record<string, PathCareerRoadmap> = {
  "soc-analyst": {
    stages: [
      {
        stage: "1. Beginner",
        role: "IT Foundations",
        months: "Bilo 0–2",
        somali:
          "Baro aasaaska kombiyuutarka iyo networking-ka. Halkan ka bilow Module 1 (IT & Computer Fundamentals) iyo Module 2 (Networking & Security Fundamentals).",
        skills: ["Hardware & OS", "TCP/IP, DNS, HTTP", "Firewalls & Wireshark", "CIA Triad"],
        certs: ["CompTIA ITF+ (ikhtiyaari)"],
      },
      {
        stage: "2. Junior SOC Analyst (Tier 1)",
        role: "SOC Analyst — Tier 1",
        months: "Bilo 2–6",
        somali:
          "Kani waa yoolka ugu dhow. Baro Linux, Windows/Active Directory, threats/malware/social engineering, iyo SOC operations & alert triage (Modules 3–6).",
        skills: ["Linux & Windows investigation", "Alert triage", "Phishing analysis", "MITRE ATT&CK basics", "Ticketing & documentation"],
        certs: ["ISC2 CC", "CompTIA Security+"],
      },
      {
        stage: "3. Security Analyst (Tier 2)",
        role: "Security / Detection Analyst",
        months: "Bilo 6–12",
        somali:
          "Baro SIEM & detection engineering, threat intelligence, iyo incident response/digital forensics (Modules 7–9). Waxaad qortaa detection rules oo hore u qaadaysaa dhacdooyinka.",
        skills: ["SIEM queries & Sigma rules", "Threat intelligence & IOCs", "Digital forensics basics", "NIST IR lifecycle", "Chain of custody"],
        certs: ["Blue Team Level 1", "CompTIA CySA+"],
      },
      {
        stage: "4. Career Ready & Advanced",
        role: "Specialization",
        months: "Bilo 12+",
        somali:
          "Dhammaystir Module 10 (Capstone & Career Readiness): portfolio, resume, interview prep. Kadibna dooro takhasus — Digital Forensics, Cloud Security, ama GRC.",
        skills: ["Portfolio & incident reports", "Interview prep", "Cloud security basics", "GRC & audit"],
        certs: ["GCIH", "AZ-500 / AWS Security", "ISO 27001 LA"],
      },
    ],
    certs: [
      {
        name: "ISC2 CC",
        full: "Certified in Cybersecurity",
        level: "Entry",
        somali:
          "Shahaadada ugu fudud oo caalami ah oo bilaash ah. Waxay daboolaysaa security principles, access control, network security iyo operations.",
        prep: "Module 1–4 + quizzes",
      },
      {
        name: "CompTIA Security+",
        full: "SY0-701",
        level: "Core",
        somali:
          "Shahaadada ugu badan ee shaqooyinka SOC Tier 1 loo dalbado. Waxay daboolaysaa threats, architecture, operations iyo governance.",
        prep: "Module 1–6 + dhammaan labs-ka",
      },
      {
        name: "Blue Team Level 1",
        full: "BTL1",
        level: "Practical",
        somali:
          "Imtixaan hands-on ah oo diiradda saaraya SOC skills dhab ah — log analysis, phishing investigation, digital forensics.",
        prep: "Module 3–9 + capstone labs",
      },
      {
        name: "SOC Analyst Role",
        full: "Junior / Tier 1 SOC Analyst position",
        level: "Career",
        somali:
          "Yoolka ugu weyn: shaqo Tier 1. Waxaa laga rabaa triage, log analysis, warbixin qorista iyo shaqo shift ah. Portfolio-ga Module 10 wuxuu caddaymaha bixiyaa.",
        prep: "Shahaadada SomTrust (10 modules) + portfolio",
      },
    ],
  },

  "ethical-hacking": {
    stages: [
      {
        stage: "1. Beginner",
        role: "Offensive Security Foundations",
        months: "Bilo 0–2",
        somali:
          "Baro qaab-dhismeedka penetration testing, xeerarka sharciga ah (Rules of Engagement), cyber kill chain-ka, iyo sida loo dhiso lab ammaan ah (Module 1).",
        skills: ["Pentest methodology types", "Legal & ethical scope", "Cyber Kill Chain", "Kali Linux lab setup"],
        certs: [],
      },
      {
        stage: "2. Junior Penetration Tester",
        role: "Reconnaissance & Scanning",
        months: "Bilo 2–4",
        somali:
          "Baro OSINT, passive/active reconnaissance, DNS enumeration, iyo Nmap scanning techniques faahfaahsan (Modules 2–3).",
        skills: ["OSINT tools (Shodan, theHarvester)", "Subdomain enumeration", "Nmap scan types & NSE", "Firewall/IDS evasion basics"],
        certs: [],
      },
      {
        stage: "3. Web Application & Vulnerability Testing",
        role: "Web App Pentester",
        months: "Bilo 4–8",
        somali:
          "Baro SQL injection, XSS, CSRF/SSRF/IDOR, OWASP Top 10 oo dhamaystiran, Burp Suite, iyo vulnerability assessment professional ah (Modules 4–7).",
        skills: ["SQLi & XSS exploitation", "OWASP Top 10 testing methodology", "Burp Suite Repeater/Intruder", "CVE/CVSS scoring & reporting"],
        certs: ["eJPT"],
      },
      {
        stage: "4. Penetration Tester & Advanced",
        role: "Penetration Tester",
        months: "Bilo 8+",
        somali:
          "Dhammaystir PTES methodology, Metasploit exploitation basics, privilege escalation, iyo full pentest reporting (Module 8). Kadibna dooro takhasus — OSCP path, red teaming, ama bug bounty.",
        skills: ["Metasploit & Meterpreter", "Privilege escalation (Linux/Windows)", "Post-exploitation & attack chaining", "Attack narrative reporting"],
        certs: ["CompTIA PenTest+", "OSCP (long-term)"],
      },
    ],
    certs: [
      {
        name: "eJPT",
        full: "eLearnSecurity Junior Penetration Tester",
        level: "Entry",
        somali:
          "Imtixaan practical ah oo hands-on. Waxay caddaysaa xirfadaha network scanning, exploitation aasaasi ah iyo web attacks.",
        prep: "Module 1–4 + labs",
      },
      {
        name: "CompTIA PenTest+",
        full: "PT0-002",
        level: "Core",
        somali:
          "Shahaado caalami ah oo daboosha planning/scoping, vulnerability assessment, exploitation, iyo reporting — u dhigma PTES methodology.",
        prep: "Module 1–7 + dhammaan labs-ka",
      },
      {
        name: "Junior Penetration Tester Role",
        full: "Junior Penetration Tester / Security Analyst (offensive) position",
        level: "Career",
        somali:
          "Yoolka ugu weyn: shaqo pentesting entry-level ah. Portfolio-ga Module 8 (full engagement report) wuxuu caddaymaha bixiyaa.",
        prep: "Shahaadada SomTrust (8 modules) + full pentest report portfolio",
      },
    ],
  },

  "digital-forensics": {
    stages: [
      {
        stage: "1. Beginner",
        role: "Forensics Foundations",
        months: "Bilo 0–2",
        somali:
          "Baro mabaadi'da forensics-ka (Locard's Exchange Principle), xeerarka sharciga ah, order of volatility, iyo evidence collection/chain of custody sax ah (Modules 1–2).",
        skills: ["Legal framework & search warrants", "Order of volatility", "Chain of custody", "Write-blockers & disk imaging"],
        certs: [],
      },
      {
        stage: "2. Junior Forensic Analyst",
        role: "Disk & Windows Artifacts Analyst",
        months: "Bilo 2–6",
        somali:
          "Baro file systems (NTFS/EXT), MFT parsing, deleted file recovery, Windows Registry forensics, Prefetch/Shimcache/Amcache, iyo Event Log deep dive (Modules 3–4).",
        skills: ["MFT & timeline analysis", "Registry forensics (UserAssist, ShellBags)", "Prefetch/Shimcache/Amcache", "USB device forensics"],
        certs: ["GCFE"],
      },
      {
        stage: "3. Forensic Analyst (Specialized)",
        role: "Memory, Network & Mobile Forensics",
        months: "Bilo 6–12",
        somali:
          "Baro memory forensics (Volatility), network forensics (Wireshark, NetFlow), Linux/macOS forensics, iyo mobile device forensics (iOS/Android) (Modules 5–8).",
        skills: ["Volatility & memory acquisition", "Network traffic reconstruction", "Cross-platform forensics", "Mobile acquisition methods"],
        certs: ["GCFA"],
      },
      {
        stage: "4. Career Ready & Advanced",
        role: "DFIR Specialist / Expert Witness",
        months: "Bilo 12+",
        somali:
          "Dhammaystir malware analysis/anti-forensics detection (timestomping, steganography, rootkits) iyo forensic reporting/expert witness testimony (Modules 9–10). Kadibna dooro takhasus — malware analysis, ama law enforcement DFIR.",
        skills: ["Anti-forensics detection", "Forensic report writing", "Expert witness testimony prep", "Case management"],
        certs: ["Blue Team Level 1", "EnCE (long-term)"],
      },
    ],
    certs: [
      {
        name: "GCFE",
        full: "GIAC Certified Forensic Examiner",
        level: "Entry",
        somali:
          "Certification entry-level ah oo forensics-specific ah — diiradda saarta Windows forensics iyo browser/artifact analysis.",
        prep: "Module 1–4 + labs",
      },
      {
        name: "GCFA",
        full: "GIAC Certified Forensic Analyst",
        level: "Advanced",
        somali:
          "Certification heer sare ah oo caan ah, diiradda saarta incident response iyo advanced forensic analysis (memory, network, anti-forensics).",
        prep: "Module 1–9 + dhammaan labs-ka",
      },
      {
        name: "Blue Team Level 1",
        full: "BTL1",
        level: "Practical",
        somali:
          "Imtixaan hands-on ah oo ay ku jirto qayb forensics ah — la wadaago SOC path-ka.",
        prep: "Module 2–9 + capstone labs",
      },
      {
        name: "Digital Forensics Analyst Role",
        full: "Digital Forensics Analyst / DFIR support position",
        level: "Career",
        somali:
          "Yoolka ugu weyn: shaqo DFIR ah oo private sector ama law enforcement ah. Portfolio-ga Module 10 (full end-to-end investigation) wuxuu caddaymaha bixiyaa.",
        prep: "Shahaadada SomTrust (10 modules) + full investigation report portfolio",
      },
    ],
  },

  "cloud-security": {
    stages: [
      {
        stage: "1. Beginner",
        role: "Cloud Fundamentals",
        months: "Bilo 0–3",
        somali:
          "Baro shared responsibility model-ka, cloud service/deployment models, iyo IAM fundamentals (roles, policies, MFA) (Modules 1–2).",
        skills: ["Shared responsibility model", "IAM policies & least privilege", "MFA & identity federation", "AWS/Azure/GCP terminology"],
        certs: [],
      },
      {
        stage: "2. Junior Cloud Security Engineer",
        role: "Cloud Security Analyst",
        months: "Bilo 3–8",
        somali:
          "Baro network security (VPC/NSGs), data/storage security (encryption, S3), iyo compute security (VMs, containers, Kubernetes, serverless) (Modules 3–5).",
        skills: ["VPC/network segmentation", "Encryption at rest/in transit", "Container & Kubernetes security", "CI/CD pipeline security"],
        certs: ["AZ-500", "AWS Security Specialty"],
      },
      {
        stage: "3. Cloud Security Engineer",
        role: "Cloud Security Engineer / SecOps",
        months: "Bilo 8–14",
        somali:
          "Baro cloud attack patterns/MITRE ATT&CK, monitoring (CloudTrail, GuardDuty, SIEM integration), iyo compliance/governance (CSPM, policy as code) (Modules 6–8).",
        skills: ["MITRE ATT&CK for Cloud", "CSPM & continuous compliance", "SIEM integration", "Policy as code (Terraform/OPA)"],
        certs: ["AZ-500", "AWS Security Specialty"],
      },
      {
        stage: "4. Career Ready & Advanced",
        role: "Cloud Security Architect / DevSecOps",
        months: "Bilo 14+",
        somali:
          "Dhammaystir cloud incident response (Module 9) iyo career readiness/capstone (Module 10). Kadibna dooro takhasus — Cloud Security Architect, DevSecOps Engineer, ama multi-cloud specialist.",
        skills: ["Cloud IR lifecycle & containment", "Multi-account/multi-cloud IR", "Portfolio & interview prep", "Architecture design"],
        certs: ["AWS Security Specialty (advanced)", "CCSP (long-term)"],
      },
    ],
    certs: [
      {
        name: "AZ-500",
        full: "Microsoft Azure Security Technologies",
        level: "Core",
        somali:
          "Shahaado Azure-specific ah oo daboosha identity/access, platform protection, security operations, iyo data protection.",
        prep: "Module 1–9 + dhammaan labs-ka",
      },
      {
        name: "AWS Security Specialty",
        full: "AWS Certified Security – Specialty",
        level: "Advanced",
        somali:
          "Shahaado AWS heer sare ah oo daboosha Incident Response, Logging/Monitoring, Infrastructure Security, IAM, iyo Data Protection.",
        prep: "Module 1–9 + dhammaan labs-ka",
      },
      {
        name: "Cloud Security Engineer Role",
        full: "Cloud Security Analyst / Engineer / SecOps position",
        level: "Career",
        somali:
          "Yoolka ugu weyn: shaqo cloud security ah AWS, Azure, ama multi-cloud environments. Portfolio-ga Module 10 (full cloud security assessment) wuxuu caddaymaha bixiyaa.",
        prep: "Shahaadada SomTrust (10 modules) + full cloud security assessment portfolio",
      },
    ],
  },
};
