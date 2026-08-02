export type LabQuestion = {
  id: string;
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

export type Lab = {
  slug: string;
  title: string;
  somali: string;
  english: string;
  level: "Bilow" | "Dhexe" | "Sare";
  minutes: number;
  scenario: string;
  objectives: string[];
  artifactTitle: string;
  artifact: string;
  questions: LabQuestion[];
  reportPrompt: string;
};

export const labCatalog: Lab[] = [
  {
    slug: "log-analysis-ssh",
    title: "Log Analysis: SSH Brute Force",
    somali: "Falanqaynta Log-ga: Weerar SSH ah",
    english: "Log Analysis: SSH Brute Force",
    level: "Bilow",
    minutes: 25,
    scenario:
      "Server Ubuntu ah oo web hosting ah ayaa alert soo saaray habeenkii. Waxaa lagu siiyay qayb ka mid ah /var/log/auth.log. Go'aami haddii weerarku guuleystay.",
    objectives: [
      "Kala saar failed iyo accepted logins",
      "Hel IP-ga weerarayay iyo account-ka la beddelay",
      "Samee timeline UTC ah",
      "Go'aami haddii compromise dhacay",
    ],
    artifactTitle: "/var/log/auth.log (qayb)",
    artifact: `Mar 14 22:14:02 web01 sshd[2211]: Failed password for root from 45.148.10.72 port 51122 ssh2
Mar 14 22:14:05 web01 sshd[2213]: Failed password for root from 45.148.10.72 port 51130 ssh2
Mar 14 22:14:09 web01 sshd[2216]: Failed password for admin from 45.148.10.72 port 51140 ssh2
Mar 14 22:19:44 web01 sshd[2401]: Failed password for deploy from 45.148.10.72 port 52001 ssh2
Mar 14 22:19:51 web01 sshd[2404]: Accepted password for deploy from 45.148.10.72 port 52010 ssh2
Mar 14 22:20:12 web01 sudo:  deploy : TTY=pts/0 ; PWD=/home/deploy ; USER=root ; COMMAND=/usr/bin/useradd -u 0 -o svcupdate
Mar 14 22:21:03 web01 sshd[2450]: Accepted publickey for svcupdate from 45.148.10.72 port 52122 ssh2
Mar 14 22:23:40 web01 CRON[2510]: (svcupdate) CMD (/tmp/.upd/beacon.sh)`,
    questions: [
      {
        id: "q1",
        q: "Account-kee ayuu weeraryahanku ku guuleystay?",
        options: ["root", "admin", "deploy", "svcupdate"],
        answer: 2,
        explain: "'Accepted password for deploy' ayaa muujinaya guusha 22:19:51 UTC.",
      },
      {
        id: "q2",
        q: "Maxaa ka dhigaya 'useradd -u 0 -o svcupdate' arrin aad u halis ah?",
        options: [
          "Waa backup account caadi ah",
          "Waxay abuurtay isticmaale UID 0 leh — root kale (backdoor)",
          "Waxay tirtirtay users-ka",
          "Waa update nidaam",
        ],
        answer: 1,
        explain: "UID 0 = root. Kani waa persistence/privilege escalation.",
      },
      {
        id: "q3",
        q: "Cron job-ka /tmp/.upd/beacon.sh wuxuu tilmaamayaa?",
        options: ["Backup", "Persistence iyo C2 beaconing", "Log rotation", "Patch"],
        answer: 1,
        explain: "Script qarsoon /tmp ku jira oo si joogto ah socda = persistence + C2.",
      },
      {
        id: "q4",
        q: "Tallaabada ugu horreysa ee containment?",
        options: [
          "Dib u shid server-ka",
          "Go'doomi host-ka, xir accounts-ka deploy iyo svcupdate, block IP-ga",
          "Tirtir auth.log",
          "Sug ilaa subax",
        ],
        answer: 1,
        explain: "Go'doomi + xir accounts + block IOC, iyadoo caddaymaha la ilaalinayo.",
      },
    ],
    reportPrompt:
      "Qor warbixin gaaban: timeline UTC, account-yada saameeyay, IOCs (IP, file, user), iyo 3 talo.",
  },
  {
    slug: "phishing-investigation",
    title: "Phishing Investigation",
    somali: "Baaritaanka Email Phishing",
    english: "Phishing Investigation",
    level: "Bilow",
    minutes: 25,
    scenario:
      "Shaqaale ayaa email soo gudbiyay isaga oo su'aal ka qabo. Falanqee header-yada iyo link-ka, kadibna go'aami.",
    objectives: [
      "Falanqee sender iyo Return-Path",
      "Fasir natiijooyinka SPF/DKIM/DMARC",
      "Hel domain-ka dhabta ah ee link-ga",
      "Qor go'aan iyo tallaabooyin",
    ],
    artifactTitle: "Email headers & body",
    artifact: `From: "Salaam Bank Support" <support@salaam-bank.so>
Return-Path: <bounce@mail-delivery-247.top>
Authentication-Results: spf=fail (sender IP is 91.213.8.44) dkim=none dmarc=fail
Received: from mail-delivery-247.top (91.213.8.44) by mx.company.so; Mar 20 08:12:04 +0000
Subject: URGENT: Account-kaaga waa la xiraya 24 saac gudahood
Reply-To: verify@mail-delivery-247.top

Dear Customer,
Waxaan ogaannay dhaqdhaqaaq shaki leh. Fadlan xaqiiji account-kaaga isla markiiba:
https://salaam-bank.so.verify-login.top/session?id=8813
Haddii kale account-kaagu wuu xirmayaa.`,
    questions: [
      {
        id: "q1",
        q: "Waa kee domain-ka dhabta ah ee link-ga?",
        options: ["salaam-bank.so", "verify-login.top", "session", "company.so"],
        answer: 1,
        explain: "Domain-ka dhabta ah waa verify-login.top; salaam-bank.so waa subdomain khiyaano ah.",
      },
      {
        id: "q2",
        q: "'spf=fail dkim=none dmarc=fail' macnaheedu waa?",
        options: [
          "Email-ku wuu hubaal yahay",
          "Sender-ku ma xaqiijin karo — calaamad spoofing ah",
          "Server-ku wuu jaban yahay",
          "Wax macno ah ma leh",
        ],
        answer: 1,
        explain: "Saddexdaas oo dhan guuldarraystay waa spoofing indicator xoog leh.",
      },
      {
        id: "q3",
        q: "Waa maxay tallaabada saxda ah ee link-ka?",
        options: [
          "Guji si aad u hubiso",
          "Ha gujin — falanqee URLScan/VirusTotal ama VM go'doonsan",
          "U dir asxaabtaada",
          "Ku qor browser-ka telefoonkaaga",
        ],
        answer: 1,
        explain: "Waligaa ha gujin link phishing ah host shaqada ah.",
      },
      {
        id: "q4",
        q: "Talooyinka ugu muhiimsan kadib xaqiijinta?",
        options: [
          "Block sender/domain, ka saar mailboxes-ka, hubi cidda gujisay, reset passwords haddii loo baahdo",
          "Iska tirtir email-ka keliya",
          "Ka digniin qofka soo diray",
          "Wax lama sameeyo",
        ],
        answer: 0,
        explain: "Containment: block, purge, hubi clicks, reset credentials.",
      },
    ],
    reportPrompt:
      "Qor triage note: sender, indicators, domain-ka dhabta ah, cidda saameysay, iyo tallaabooyinka.",
  },
  {
    slug: "suspicious-ip",
    title: "Suspicious IP Investigation",
    somali: "Baaritaanka IP Shaki leh",
    english: "Suspicious IP Investigation",
    level: "Dhexe",
    minutes: 30,
    scenario:
      "Firewall-ku wuxuu muujinayaa in workstation gudaha ah si joogto ah ula xiriirto IP dibadeed. Go'aami haddii tani tahay C2 beaconing.",
    objectives: [
      "Ogaado qaabka beaconing-ka",
      "Enrich IP-ga (reputation, ASN, dal)",
      "Qiimee data exfiltration",
      "Talo bixi containment",
    ],
    artifactTitle: "Firewall connection log",
    artifact: `time(UTC)  src_ip        dst_ip         dst_port  bytes_out  bytes_in
09:00:12   10.20.4.55    185.234.72.19  443       1120       340
09:05:13   10.20.4.55    185.234.72.19  443       1108       352
09:10:12   10.20.4.55    185.234.72.19  443       1131       344
09:15:14   10.20.4.55    185.234.72.19  443       1119       351
09:20:12   10.20.4.55    185.234.72.19  443       1124       349
09:41:55   10.20.4.55    185.234.72.19  443       48211904   512
09:42:10   10.20.4.55    52.96.10.4     443       8210       19340`,
    questions: [
      {
        id: "q1",
        q: "Maxaa ugu muujinaya beaconing xogtan?",
        options: [
          "Port 443 la isticmaalay",
          "Xiriir 5 daqiiqo kasta oo isku eg oo cabbir la mid ah",
          "IP-ga waa mid dibadeed",
          "Bytes_in yar",
        ],
        answer: 1,
        explain: "Waqti joogto ah (interval) + cabbir isku mid = calaamad C2 caadi ah.",
      },
      {
        id: "q2",
        q: "Sadarka 09:41:55 (48 MB oo baxaya) wuxuu tilmaamayaa?",
        options: ["Update Windows", "Data exfiltration suurtogal ah", "Backup caadi ah", "DNS query"],
        answer: 1,
        explain: "Upload weyn oo ku socda C2 = exfiltration — kordhi mudnaanta.",
      },
      {
        id: "q3",
        q: "Enrichment-kee ayaa ugu waxtar badan?",
        options: [
          "Reputation (AbuseIPDB/VirusTotal), ASN/hosting, WHOIS iyo threat intel",
          "Cabbirka disk-ka host-ka",
          "Nooca browser-ka",
          "Qaddarka RAM",
        ],
        answer: 0,
        explain: "IP enrichment waxay caddaysaa haddii uu la xiriiro C2 la yaqaan.",
      },
      {
        id: "q4",
        q: "Containment habboon?",
        options: [
          "Block IP-ga, go'doomi host-ka 10.20.4.55, qaado memory image, escalate Tier 2",
          "Dami firewall-ka",
          "Ka codso isticmaalaha inuu dib u shido",
          "Sug 48 saac",
        ],
        answer: 0,
        explain: "Block + isolate + ilaali caddaymaha + escalate.",
      },
    ],
    reportPrompt:
      "Qor warbixin: qaabka beaconing, waqtiga exfiltration, IOCs, iyo talooyinka containment.",
  },
  {
    slug: "incident-report-lab",
    title: "Incident Report Writing",
    somali: "Qorista Warbixinta Dhacdada",
    english: "Incident Report Writing",
    level: "Dhexe",
    minutes: 35,
    scenario:
      "Account maamule ayaa la waayay (compromised) iyadoo phishing loo isticmaalay. Waxaa lagu siiyay xaqiiqooyinka. Qor warbixin xirfadeed.",
    objectives: [
      "Samee timeline UTC",
      "Sharax root cause",
      "Qiimee scope iyo impact",
      "Qor talooyin owner iyo waqti leh",
    ],
    artifactTitle: "Xaqiiqooyinka la ururiyay",
    artifact: `08:12 UTC  Email phishing ah ayaa la gaarsiiyay 14 mailbox
08:31 UTC  Isticmaalaha a.hassan wuxuu gujiyay link-ga oo geliyay credentials
08:34 UTC  Login guulaystay Microsoft 365 min IP 91.213.8.44 (Netherlands)
08:36 UTC  Rule mailbox cusub: dhammaan emails-ka leh "invoice" loo diray folder RSS
09:02 UTC  17 email BEC ah loo diray macaamiisha, lacag wareejin lagu dalbanayo
09:40 UTC  SOC ayaa alert helay (impossible travel) oo bilaabay baaritaan
09:55 UTC  Session-nada la xiray, password la beddelay, MFA la shiday`,
    questions: [
      {
        id: "q1",
        q: "Root cause-ka waa?",
        options: [
          "Firewall oo qaldan",
          "Credential phishing oo aan MFA lahayn account maamule",
          "Malware USB ah",
          "Server oo duugoobay",
        ],
        answer: 1,
        explain: "Link phishing + credentials + MFA la'aan ayaa keenay compromise-ka.",
      },
      {
        id: "q2",
        q: "Mailbox rule-ka cusub ujeeddadiisu waxay ahayd?",
        options: [
          "Nidaamin email-ka",
          "Qarinta jawaabaha si BEC-gu aan la ogaan",
          "Kordhinta xawaaraha",
          "Backup",
        ],
        answer: 1,
        explain: "Rules-ka qarinta waa qaab caan ah oo BEC ah (defense evasion).",
      },
      {
        id: "q3",
        q: "Impact-ka ugu weyn?",
        options: [
          "Khasaare maaliyadeed macaamiisha iyo sumcad, xog la helay",
          "Disk oo buuxsamay",
          "Internet oo gaabis ah",
          "Printer oo shaqo diiday",
        ],
        answer: 0,
        explain: "17 email BEC ah oo macaamiisha loo diray = khatar lacag iyo sumcad.",
      },
      {
        id: "q4",
        q: "Talada ugu mudnaanta sarreysa?",
        options: [
          "MFA khasab ah dhammaan accounts-ka (owner: IT Manager, 14 maalmood)",
          "Beddel logo-ga shirkadda",
          "Iibso server cusub",
          "Ka joogso email-ka",
        ],
        answer: 0,
        explain: "MFA ayaa si toos ah joojinaysa root cause-ka.",
      },
    ],
    reportPrompt:
      "Qor warbixin buuxda: executive summary, timeline, scope/impact, root cause, IOCs, tallaabooyin, iyo 3 talo owner+waqti leh.",
  },
];

export function findLab(slug: string) {
  return labCatalog.find((l) => l.slug === slug) ?? null;
}
