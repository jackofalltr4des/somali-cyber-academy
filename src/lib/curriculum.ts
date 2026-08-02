export type Module = {
  id: string;
  stage: "Aasaas" | "Dhexe" | "Sare";
  title: string;
  english: string;
  lessons: number;
  hours: number;
  topics: string[];
};

export const modules: Module[] = [
  {
    id: "m1",
    stage: "Aasaas",
    title: "Aasaaska Kombiyuutarka",
    english: "Computer Fundamentals",
    lessons: 12,
    hours: 6,
    topics: ["Hardware & Software", "Operating Systems", "File systems", "CLI"],
  },
  {
    id: "m2",
    stage: "Aasaas",
    title: "Networking-ka",
    english: "Networking Basics",
    lessons: 14,
    hours: 9,
    topics: ["IP & Subnetting", "TCP/UDP", "DNS", "Firewalls", "Wireshark"],
  },
  {
    id: "m3",
    stage: "Aasaas",
    title: "Linux Aasaasi",
    english: "Linux Essentials",
    lessons: 16,
    hours: 10,
    topics: ["Bash", "Permissions", "Users & groups", "Logs", "systemd"],
  },
  {
    id: "m4",
    stage: "Aasaas",
    title: "Aasaaska Cybersecurity",
    english: "Cybersecurity Basics",
    lessons: 10,
    hours: 5,
    topics: ["CIA Triad", "Threats & risk", "Malware types", "Defense in depth"],
  },
  {
    id: "m5",
    stage: "Aasaas",
    title: "Ammaanka Password-ka",
    english: "Password Security",
    lessons: 8,
    hours: 3,
    topics: ["Password managers", "MFA / 2FA", "Hashing", "Credential stuffing"],
  },
  {
    id: "m6",
    stage: "Dhexe",
    title: "Phishing & Khiyaamo Online",
    english: "Phishing & Online Scams",
    lessons: 12,
    hours: 5,
    topics: ["Email analysis", "Smishing", "Mobile money fraud", "Reporting"],
  },
  {
    id: "m7",
    stage: "Dhexe",
    title: "Internet Ammaan ah",
    english: "Safe Browsing & Privacy",
    lessons: 9,
    hours: 4,
    topics: ["HTTPS & certs", "Browser hygiene", "VPN", "Social media safety"],
  },
  {
    id: "m8",
    stage: "Dhexe",
    title: "Social Engineering",
    english: "Social Engineering",
    lessons: 10,
    hours: 5,
    topics: ["Pretexting", "Vishing", "OSINT", "Awareness training"],
  },
  {
    id: "m9",
    stage: "Sare",
    title: "Xirfadaha SOC Analyst",
    english: "SOC Analyst Skills",
    lessons: 18,
    hours: 14,
    topics: ["Tier 1 triage", "Alert handling", "MITRE ATT&CK", "Ticketing"],
  },
  {
    id: "m10",
    stage: "Sare",
    title: "SIEM & Log Analysis",
    english: "SIEM & Log Analysis",
    lessons: 15,
    hours: 12,
    topics: ["Splunk", "Elastic / Wazuh", "Queries", "Dashboards"],
  },
  {
    id: "m11",
    stage: "Sare",
    title: "Ogaanshaha Khataraha",
    english: "Threat Detection",
    lessons: 13,
    hours: 11,
    topics: ["Detection rules", "IOC hunting", "Sigma rules", "Threat intel"],
  },
  {
    id: "m12",
    stage: "Sare",
    title: "Jawaab-celinta Dhacdooyinka",
    english: "Incident Response",
    lessons: 12,
    hours: 10,
    topics: ["NIST IR lifecycle", "Containment", "Forensics 101", "Reporting"],
  },
];

export const labs = [
  {
    title: "Phishing Email Triage",
    somali: "Baar email khiyaamo ah oo af Soomaali ah.",
    level: "Aasaas",
  },
  {
    title: "Wireshark Packet Hunt",
    somali: "Raadi traffic-ga shaki leh ee network-ga.",
    level: "Dhexe",
  },
  {
    title: "Linux Log Investigation",
    somali: "Ka hel calaamadaha weerarka /var/log.",
    level: "Dhexe",
  },
  {
    title: "SIEM Alert Triage (Wazuh)",
    somali: "Ka shaqee alert-yada sida Tier 1 analyst.",
    level: "Sare",
  },
  {
    title: "Ransomware Incident Drill",
    somali: "Maamul dhacdo ransomware ah tallaabo tallaabo.",
    level: "Sare",
  },
  {
    title: "Password Cracking Ethics Lab",
    somali: "Fahan itaal-darrada password-yada.",
    level: "Aasaas",
  },
];

export const careerPaths = [
  { role: "SOC Analyst (Tier 1)", cert: "CompTIA Security+", months: 6 },
  { role: "IT Support / Helpdesk", cert: "CompTIA A+ / ITF+", months: 3 },
  { role: "Junior Threat Analyst", cert: "Blue Team Level 1", months: 9 },
  { role: "Incident Responder", cert: "SANS GCIH path", months: 12 },
];

export const faqs = [
  {
    q: "Ma waxbarasho af Soomaali ah baa?",
    a: "Haa. Casharrada oo dhan waxaa lagu sharxay af Soomaali, laakiin ereyada farsamada (phishing, SIEM, firewall) waxaa lagu ilaalinayaa Ingiriisi si aad u diyaargarowdo shaqada caalamiga ah iyo imtixaannada shahaadada.",
  },
  {
    q: "Miyaan u baahanahay aqoon hore?",
    a: "Maya. Waxaan ka bilaabaynaa aasaaska kombiyuutarka. Haddii aad garanayso wax yar, waad boodi kartaa module-yada aasaasiga ah.",
  },
  {
    q: "Computer ma u baahanahay?",
    a: "Casharrada waxaad ka daawan kartaa telefoonka. Labs-ka qaarkood waxay u fiican yihiin laptop, laakiin waxaan bixinnaa jawaab kale oo browser-based ah.",
  },
  {
    q: "Shaqo ma heli karaa?",
    a: "Waddada SOC Analyst waxay ku diyaarinaysaa Security+ iyo xirfado Tier 1 triage, oo ay weheliso portfolio labs iyo tababar interview ah.",
  },
];
