import { labCatalog } from "./labs";

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

export type Lesson = {
  slug: string;
  title: string;
  english: string;
  minutes: number;
  summary: string;
  sections: { h: string; p: string }[];
  terms: { term: string; def: string }[];
  quiz: QuizQuestion[];
  exercise?: { title: string; steps: string[]; deliverable: string } | null;
};

export type Module = {
  id: string;
  slug: string;
  stage: "Aasaas" | "Dhexe" | "Sare";
  title: string;
  english: string;
  hours: number;
  outcome: string;
  topics: string[];
  lessonList: Lesson[];
  lessons: number;
};

const m = (
  mod: Omit<Module, "lessons" | "topics"> & { topics?: string[] },
): Module => ({
  ...mod,
  topics: mod.topics ?? mod.lessonList.map((l) => l.english),
  lessons: mod.lessonList.length,
});

export const modules: Module[] = [
  m({
    id: "m1",
    slug: "aasaaska-it",
    stage: "Aasaas",
    title: "Aasaaska IT & Kombiyuutarka",
    english: "IT & Computer Fundamentals",
    hours: 6,
    outcome:
      "Waxaad garanaysaa sida kombiyuutarka, operating system-ka iyo file system-ku u shaqeeyaan — aasaaska loo baahan yahay analyst kasta.",
    lessonList: [
      {
        slug: "hardware-iyo-os",
        title: "Hardware, OS iyo Processes",
        english: "Hardware, OS and Processes",
        minutes: 25,
        summary:
          "Sida CPU, memory, disk iyo operating system-ku u wada shaqeeyaan — iyo sababta analyst-ku u baahan yahay inuu fahmo process-yada.",
        sections: [
          {
            h: "Qaybaha kombiyuutarka",
            p: "CPU wuxuu fuliyaa amarrada (instructions). RAM (memory) waxay ku hayaan xogta la isticmaalayo hadda — waa volatile, waxay lumtaa marka la damiyo. Disk (HDD/SSD) waa storage joogto ah. Weerarka qaar, sida fileless malware, waxay ku noolaadaan RAM oo keliya, taasi waa sababta forensics-ku u qaado 'memory capture' ka hor inta aan la damin mashiinka.",
          },
          {
            h: "Operating System",
            p: "Operating System (OS) waa layer-ka u dhexeeya hardware-ka iyo app-yada. Wuxuu maamulaa processes, memory, users iyo permissions. Windows, Linux iyo macOS dhammaantood waxay leeyihiin kernel (qeybta xukunta) iyo user space (halka app-yadu ka shaqeeyaan). Malware badan wuxuu isku dayaa inuu ka gudbo user space una gudbo kernel si uu u qariyo naftiisa (rootkit).",
          },
          {
            h: "Process iyo Service",
            p: "Process waa program socda oo leh PID (Process ID) iyo parent process. SOC analyst-ku had iyo jeer wuxuu eegaa 'parent-child relationship': tusaale, WINWORD.EXE oo dhalay powershell.exe waa calaamad shaki leh (suspicious), maxaa yeelay Word caadi ahaan ma furo PowerShell. Service-yadu waa processes background ku socda oo bilaabma marka la shido mashiinka.",
          },
        ],
        terms: [
          { term: "Volatile memory", def: "Memory-ga lumaya marka korontada la damiyo (RAM)." },
          { term: "Kernel", def: "Xudunta OS-ka ee maamusha hardware-ka iyo permissions-ka." },
          { term: "Parent process", def: "Process-ka dhalay process-ka kale." },
        ],
        quiz: [
          {
            q: "Waa maxay sababta memory (RAM) loo qabtaa ka hor inta aan la damin mashiin la weeraray?",
            options: [
              "Sababtoo ah RAM-ku waa volatile, xogtiisu way lumaysaa",
              "Sababtoo ah RAM-ku waa mid weyn oo raqiis ah",
              "Sababtoo ah disk-ka lama akhrin karo",
              "Sababtoo ah OS-ku wuu xannibayaa disk-ka",
            ],
            answer: 0,
            explain:
              "RAM waa volatile — fileless malware iyo credentials-ka ku jira memory-ga way baaba'ayaan marka la damiyo mashiinka.",
          },
          {
            q: "Winword.exe ayaa dhalay powershell.exe. Maxaad ka fikiraysaa?",
            options: [
              "Waa arrin caadi ah, iska dhaaf",
              "Waa suspicious parent-child chain — baar macro malware",
              "Waa cilad hardware ah",
              "Waa update Windows ah",
            ],
            answer: 1,
            explain:
              "Office apps oo furaya script interpreters waa indicator caan ah oo macro-based phishing ah.",
          },
        ],
        exercise: {
          title: "Baaris process ah oo mashiinkaaga ah",
          steps: [
            "Fur Task Manager (Windows) ama ku qor 'ps aux' terminal-ka Linux.",
            "Xulo 5 process oo aad garanayso 5 kalena aadan garanayn.",
            "Raadi magacyada aadan garanayn internet-ka — ma legit baa mise shaki leh?",
            "Qor liis ah PID, magac, iyo parent process.",
          ],
          deliverable: "Jaantus (table) ah 10 process oo leh go'aankaaga: normal / needs review.",
        },
      },
      {
        slug: "cli-iyo-file-system",
        title: "Command Line & File System",
        english: "Command Line & File System",
        minutes: 30,
        summary: "Bar amarrada aasaasiga ah ee CLI-ga — waa aaladda ugu muhiimsan analyst-ka.",
        sections: [
          {
            h: "Maxay CLI muhiim u tahay?",
            p: "SOC analyst-yadu waxay ku shaqeeyaan server-yo aan lahayn desktop (headless). CLI-gu wuxuu kuu ogolaanayaa inaad si degdeg ah u shaandhayso (filter) malaayiin sadar oo log ah. Amar hal sadar ah ayaa badanaa ka dhaqso badan 20 daqiiqo oo gujin ah.",
          },
          {
            h: "Amarrada aasaasiga ah",
            p: "pwd (halkee joogaa), ls (liis), cd (u gudub), cat (akhri file), less (akhri si tartiib ah), grep (raadi qoraal), wc -l (tiri sadarrada), head/tail (bilowga/dhamaadka). Windows: dir, type, findstr, Get-Content. Xariiqda pipe '|' waxay natiijada amar u gudbisaa amar kale: cat auth.log | grep 'Failed password' | wc -l.",
          },
          {
            h: "File system-ka & meelaha muhiimka ah",
            p: "Linux: /etc (config), /var/log (logs), /home (users), /tmp (files ku meel gaar ah — meel weeraryahannadu jecel yihiin). Windows: C:\\Windows\\System32, C:\\Users\\<user>\\AppData (halka malware badan uu isku qariyo), iyo Event Logs.",
          },
        ],
        terms: [
          { term: "grep", def: "Amar Linux ah oo raadinaya qoraal ku jira file-yada." },
          { term: "pipe (|)", def: "Wuxuu output-ka amar u diraa amar kale." },
          { term: "/var/log", def: "Meesha Linux uu ku kaydiyo log-yada nidaamka." },
        ],
        quiz: [
          {
            q: "Amarkee ayaa tiriya inta jeer ee 'Failed password' ku soo baxday auth.log?",
            options: [
              "cat auth.log | grep 'Failed password' | wc -l",
              "ls -la auth.log",
              "cd /var/log",
              "rm auth.log",
            ],
            answer: 0,
            explain: "grep wuu shaandhaynayaa, wc -l wuu tirinayaa sadarrada.",
          },
          {
            q: "Meeshee ayaa Linux ku kaydiyaa log-yada nidaamka?",
            options: ["/home", "/var/log", "/tmp", "/etc/passwd"],
            answer: 1,
            explain: "/var/log waa meesha caadiga ah ee log-yada.",
          },
        ],
        exercise: {
          title: "Shaandhee log terminal-ka",
          steps: [
            "Soo deji ama abuur file log ah oo tijaabo ah.",
            "Isticmaal grep si aad u hesho sadarrada leh 'error' ama 'failed'.",
            "Isticmaal sort | uniq -c si aad u hesho IP-yada ugu badan.",
            "Qor amarrada aad isticmaashay.",
          ],
          deliverable: "Screenshot iyo liiska amarrada aad qortay.",
        },
      },
      {
        slug: "virtualization-lab",
        title: "Dhis Lab-kaaga (Virtualization)",
        english: "Build Your Home Lab",
        minutes: 20,
        summary: "Sida aad u dhisto lab ammaan ah adigoo isticmaalaya virtual machines.",
        sections: [
          {
            h: "Waa maxay VM?",
            p: "Virtual Machine (VM) waa kombiyuutar software ah oo ku dul socda kombiyuutarkaaga. Waxaad ku tijaabin kartaa malware ama tools cusub adigoo aan halis gelinayn mashiinkaaga dhabta ah. Isticmaal VirtualBox ama VMware Workstation Player (bilaash).",
          },
          {
            h: "Lab-ka SOC-ga bilowga ah",
            p: "1) Ubuntu Desktop — tools iyo bash. 2) Windows 10 evaluation VM — sysmon iyo event logs. 3) Security Onion ama Wazuh — SIEM. Ku xir dhammaan network 'Host-Only' ah si aan malware-ku internet-ka u gaarin.",
          },
          {
            h: "Snapshot & ammaan",
            p: "Ka hor inta aadan wax tijaabin, qaado snapshot. Haddii wax qaldamaan, ku noqo snapshot-ka. Waligaa ha ku shaqayn malware mashiinkaaga shakhsiga ah, hana isticmaalin isla network-ga qoyskaaga.",
          },
        ],
        terms: [
          { term: "Hypervisor", def: "Software-ka maamula virtual machines-ka (VirtualBox, VMware)." },
          { term: "Snapshot", def: "Kaydinta xaaladda VM-ka si aad dib ugu noqoto." },
          { term: "Host-only network", def: "Network go'doonsan oo aan internet-ka gaarin." },
        ],
        quiz: [
          {
            q: "Maxay tahay tallaabada ugu horreysa ka hor tijaabinta malware VM gudaheeda?",
            options: [
              "Ku xir internet-ka si dhab ah",
              "Qaado snapshot oo isticmaal host-only network",
              "Dami antivirus-ka mashiinkaaga dhabta ah",
              "U wareeji file-yada shaqada VM-ka",
            ],
            answer: 1,
            explain: "Snapshot + network go'doonsan ayaa ka ilaalinaya khasaare.",
          },
        ],
        exercise: {
          title: "Ku rakib Ubuntu VM",
          steps: [
            "Rakib VirtualBox.",
            "Soo deji Ubuntu Desktop ISO.",
            "Samee VM leh 2 CPU, 4GB RAM, 40GB disk, host-only adapter.",
            "Qaado snapshot magaciisu yahay 'clean'.",
          ],
          deliverable: "Screenshot VM-ka socda iyo snapshot-ka la abuuray.",
        },
      },
    ],
  }),
  m({
    id: "m2",
    slug: "networking",
    stage: "Aasaas",
    title: "Networking-ka Analyst-ka",
    english: "Networking for Analysts",
    hours: 9,
    outcome:
      "Waxaad fahmi kartaa traffic-ga network-ga, port-yada, DNS iyo sida weerarku ugu dhex socdo.",
    lessonList: [
      {
        slug: "tcp-ip-iyo-ports",
        title: "TCP/IP, Ports & Protocols",
        english: "TCP/IP, Ports & Protocols",
        minutes: 30,
        summary: "Model-ka TCP/IP, farqiga TCP iyo UDP, iyo port-yada muhiimka ah ee analyst-ku xifdiyo.",
        sections: [
          {
            h: "Layers-ka",
            p: "TCP/IP wuxuu leeyahay 4 layer: Link (Ethernet/Wi-Fi), Internet (IP), Transport (TCP/UDP), Application (HTTP, DNS, SMTP). Marka aad baarayso alert, waxaad isweydiinaysaa: layer-kee ayay dhibaatadu ka jirtaa? IP shaki leh (Internet layer) mise HTTP request xun (Application layer)?",
          },
          {
            h: "TCP vs UDP",
            p: "TCP waa xiriir hubaal ah (three-way handshake: SYN, SYN-ACK, ACK) — HTTP, SSH, SMTP. UDP ma hubiyo, waa dhaqso — DNS, DHCP, VoIP. Weeraryahannadu waxay isticmaalaan UDP DNS tunneling si ay xog u dhufsadaan (exfiltration) iyagoo iska dhigaya traffic caadi ah.",
          },
          {
            h: "Port-yada muhiimka ah",
            p: "20/21 FTP, 22 SSH, 23 Telnet (khatar), 25 SMTP, 53 DNS, 80 HTTP, 110 POP3, 143 IMAP, 389 LDAP, 443 HTTPS, 445 SMB (ransomware jecel), 3306 MySQL, 3389 RDP (brute force ugu badan). Marka aad aragto 3389 oo internet-ka u furan, taasi waa risk weyn.",
          },
        ],
        terms: [
          { term: "Three-way handshake", def: "SYN → SYN-ACK → ACK: sida TCP xiriir u bilaabo." },
          { term: "Port 445 (SMB)", def: "File sharing Windows — ransomware badan halkaas ayuu ku faafaa." },
          { term: "DNS tunneling", def: "Xog laga dhuumiyo DNS queries si loo baxsho firewall-ka." },
        ],
        quiz: [
          {
            q: "Port 3389 oo internet-ka u furan waa?",
            options: [
              "Caadi, waa web traffic",
              "RDP oo halis brute-force ah — waa in la xaddido",
              "DNS server",
              "Mail server",
            ],
            answer: 1,
            explain: "3389 waa RDP; internet-ka ha loo furin — isticmaal VPN iyo MFA.",
          },
          {
            q: "Protocol-kee ayaa DNS caadi ahaan isticmaala?",
            options: ["TCP 443", "UDP 53", "TCP 22", "UDP 3389"],
            answer: 1,
            explain: "DNS wuxuu isticmaalaa UDP 53 (TCP 53 waxaa loo isticmaalaa xog waaweyn).",
          },
        ],
        exercise: {
          title: "Sawir network-gaaga",
          steps: [
            "Isticmaal 'ipconfig /all' ama 'ip a' si aad u hesho IP-gaaga, gateway iyo DNS.",
            "Ku qor 'netstat -ano' (Windows) ama 'ss -tunap' (Linux) si aad u aragto xiriirrada furan.",
            "Xulo saddex xiriir oo baar port-kooda iyo process-kooda.",
          ],
          deliverable: "Jaantus: local IP, remote IP, port, process, go'aan (normal/shaki).",
        },
      },
      {
        slug: "dns-http-tls",
        title: "DNS, HTTP & TLS",
        english: "DNS, HTTP & TLS",
        minutes: 28,
        summary: "Sida magacyada loo turjumo IP, sida HTTP requests u shaqeeyaan, iyo waxa TLS ilaaliyo.",
        sections: [
          {
            h: "DNS",
            p: "DNS wuxuu magaca (bank.so) u beddelaa IP. Record-yada muhiimka ah: A (IPv4), AAAA (IPv6), MX (mail), TXT (SPF/DKIM), CNAME (alias), NS. Baaritaanka phishing waxaad had iyo jeer eegtaa: goorma ayaa domain-ka la diiwaan geliyay? Domain 3 maalmood jir ah oo ku ekaanaya bangi waa red flag weyn.",
          },
          {
            h: "HTTP",
            p: "Request wuxuu leeyahay method (GET, POST), path, headers (User-Agent, Referer, Cookie) iyo body. Response wuxuu leeyahay status code: 200 (guul), 301/302 (redirect), 401/403 (diidmo), 404, 500. Weerarka web-ka waxaad ka aragtaa URL-yo cajiib ah sida /login.php?id=1' OR '1'='1 (SQL injection).",
          },
          {
            h: "TLS/HTTPS",
            p: "TLS wuxuu bixiyaa encryption, integrity iyo authentication (certificate). Qufulku (padlock) macnihiisu maaha 'website-kani waa daacad' — wuxuu keliya ka dhigan yahay 'xiriirku waa qarsoon yahay'. Phishing site-yo badan ayaa haysta HTTPS. Had iyo jeer eeg domain-ka, ha eegin qufulka oo kaliya.",
          },
        ],
        terms: [
          { term: "MX record", def: "Wuxuu tilmaamaa server-ka email-ka ee domain-ka." },
          { term: "WHOIS", def: "Diiwaanka muujinaya goorta iyo cidda diiwaan gelisay domain-ka." },
          { term: "Status 302", def: "Redirect — phishing badan ayaa isticmaala redirect chains." },
        ],
        quiz: [
          {
            q: "Website leh HTTPS waa mid ammaan ah oo la aamini karo?",
            options: [
              "Haa, qufulku wuxuu caddaynayaa daacadnimo",
              "Maya, HTTPS wuxuu keliya qarinayaa xiriirka — phishing sidoo kale wuu heli karaa",
              "Haa, haddii Chrome uu muujiyo",
              "Maya, HTTPS waa mid duugoobay",
            ],
            answer: 1,
            explain: "Certificate-yadu waa bilaash (Let's Encrypt); phishing badan waa HTTPS.",
          },
          {
            q: "Record-kee ayaa lagu hubiyaa SPF-ka email-ka?",
            options: ["A", "MX", "TXT", "CNAME"],
            answer: 2,
            explain: "SPF, DKIM iyo DMARC waxay ku jiraan TXT records.",
          },
        ],
        exercise: {
          title: "OSINT domain",
          steps: [
            "Xulo domain shaki leh ama tusaale (tusaale: example-login-secure.com).",
            "Isticmaal nslookup/dig si aad u hesho A iyo MX records.",
            "Eeg WHOIS taariikhda diiwaangelinta.",
            "Ku baar VirusTotal ama URLScan.",
          ],
          deliverable: "Warbixin gaaban: IP, taariikh, hosting, go'aan.",
        },
      },
      {
        slug: "firewall-ids-ips",
        title: "Firewall, IDS & IPS",
        english: "Firewall, IDS & IPS",
        minutes: 25,
        summary: "Sida difaacyada network-ku u shaqeeyaan iyo sida alert-yada uga yimaadaan.",
        sections: [
          {
            h: "Firewall",
            p: "Firewall wuxuu ogolaadaa/diidaa traffic iyadoo lagu saleeyay rules (source IP, destination, port, protocol). Next-Generation Firewall (NGFW) wuxuu sidoo kale eegaa app-ka iyo user-ka. Log-yada firewall-ku waa isha ugu horreysa ee lagu ogaanayo 'beaconing' — mashiin si joogto ah ugu xiraya IP shisheeye 60 sekan kasta.",
          },
          {
            h: "IDS vs IPS",
            p: "IDS (Intrusion Detection System) wuu arkaa oo digniin bixiyaa — passive. IPS (Prevention) wuu joojiyaa traffic-ka — inline. Suricata iyo Snort waa tusaalayaal. Rule-yada waxay sameeyaan alert marka pattern la arko, tusaale signature ransomware ah oo SMB ah.",
          },
          {
            h: "False positive",
            p: "Alert kasta maaha weerar. Analyst-ka Tier 1 shaqadiisa ugu weyn waa kala saarista true positive iyo false positive. Waxaad isweydiinaysaa: ma jirtaa sabab shaqo oo caadi ah? Ma isku mid baa qaabkani iyo baseline-ka?",
          },
        ],
        terms: [
          { term: "Beaconing", def: "Xiriir joogto ah oo malware u sameeyo server-ka C2." },
          { term: "Signature", def: "Qaab la yaqaan oo lagu ogaado weerar." },
          { term: "Baseline", def: "Waxa loo tixgeliyo caadi ah network-ga gudihiisa." },
        ],
        quiz: [
          {
            q: "Waa maxay farqiga IDS iyo IPS?",
            options: [
              "IDS wuu joojiyaa, IPS wuu ogaadaa",
              "IDS wuu ogaadaa oo digniin bixiyaa, IPS wuu joojiyaa",
              "Isku mid bay yihiin",
              "IPS waa firewall software ah oo kaliya",
            ],
            answer: 1,
            explain: "IDS = detect only; IPS = detect + block (inline).",
          },
        ],
        exercise: {
          title: "Falanqee firewall log",
          steps: [
            "Qaado 200 sadar oo firewall log ah (tusaale ama lab).",
            "Tiri destination IP-yada ugu badan.",
            "Raadi mashiin si joogto ah u xiraya isla IP-ga (beaconing).",
            "Qor xaqiiqooyinka iyo talooyinkaaga.",
          ],
          deliverable: "Liis ah 3 IP shaki leh iyo sababta.",
        },
      },
    ],
  }),
  m({
    id: "m3",
    slug: "linux",
    stage: "Aasaas",
    title: "Linux ee SOC-ga",
    english: "Linux for SOC",
    hours: 10,
    outcome: "Waxaad maamuli kartaa users, permissions iyo log-yada Linux server-ka.",
    lessonList: [
      {
        slug: "users-permissions",
        title: "Users, Groups & Permissions",
        english: "Users, Groups & Permissions",
        minutes: 26,
        summary: "Sida Linux u maamulo cidda wax gali karta — iyo sida weeraryahanku u kordhiyo awoodda.",
        sections: [
          {
            h: "Users iyo /etc/passwd",
            p: "Isticmaale kasta wuxuu leeyahay UID. UID 0 waa root (awood buuxda). /etc/passwd waxay hayaan macluumaadka isticmaalaha, /etc/shadow-na hashes-ka password-ka (root oo keliya ayaa akhrin kara). Haddii aad aragto isticmaale cusub oo UID 0 leh, taasi waa backdoor.",
          },
          {
            h: "Permissions",
            p: "rwx (read, write, execute) waxaa loo qoondeeyaa owner, group, others: chmod 755 = owner rwx, kuwa kale r-x. Special bit-ka SUID (chmod 4755) wuxuu ka dhigayaa program-ka inuu u shaqeeyo sida owner-ka (badanaa root). Weeraryahannadu waxay raadiyaan SUID binaries si ay awood ugu kordhsadaan (privilege escalation).",
          },
          {
            h: "sudo",
            p: "sudo wuxuu ogolaadaa in isticmaale caadi ah uu amar sida root u fuliyo — waxaana la diiwaan geliyaa /var/log/auth.log. Baar cidda sudo isticmaashay iyo waqtiga. 'sudo su -' oo habeen dhexe ka yimid IP shisheeye waa alert.",
          },
        ],
        terms: [
          { term: "UID 0", def: "Root — awood buuxda nidaamka." },
          { term: "SUID", def: "Bit u ogolaanaya program-ka inuu u shaqeeyo sida owner-kiisa." },
          { term: "/etc/shadow", def: "File-ka hashes-ka password-yada." },
        ],
        quiz: [
          {
            q: "Isticmaale cusub oo UID 0 leh oo ku jira /etc/passwd waa?",
            options: [
              "Caadi — waa service account",
              "Backdoor suurtagal ah — baar isla markiiba",
              "Cilad graphics ah",
              "Waa hab lagu dedejiyo boot-ka",
            ],
            answer: 1,
            explain: "UID 0 = root. Kaliya root ayaa yeelan kara UID 0.",
          },
          {
            q: "Amarkee ayaa lagu raadiyaa SUID binaries?",
            options: [
              "find / -perm -4000 -type f 2>/dev/null",
              "ls -l /home",
              "cat /etc/hosts",
              "ps aux",
            ],
            answer: 0,
            explain: "-perm -4000 wuxuu raadiyaa SUID bit-ka.",
          },
        ],
        exercise: {
          title: "Hubi ammaanka isticmaalayaasha",
          steps: [
            "Liis garee dhammaan users-ka: cut -d: -f1,3 /etc/passwd",
            "Raadi UID 0 kale marka lagu daro root.",
            "Liis garee members-ka group-ka sudo.",
            "Raadi SUID binaries oo aan caadi ahayn.",
          ],
          deliverable: "Warbixin ah waxa aad heshay iyo talooyin.",
        },
      },
      {
        slug: "linux-logs",
        title: "Log-yada Linux",
        english: "Linux Logs",
        minutes: 28,
        summary: "Meesha log-yadu ku jiraan iyo sida looga helo calaamadaha weerarka.",
        sections: [
          {
            h: "Meelaha log-yada",
            p: "/var/log/auth.log (Debian/Ubuntu) ama /var/log/secure (RHEL) — login iyo sudo. /var/log/syslog — nidaamka. /var/log/apache2/access.log — web. journalctl -u ssh — systemd services. Marka aad baarayso xatooyo (breach), auth.log ayaa ah meesha ugu horreysa.",
          },
          {
            h: "Calaamadaha weerarka",
            p: "'Failed password for root from 45.x.x.x' oo si isdaba joog ah u soo noqonaysa = brute force. Haddii ay ku xigto 'Accepted password' isla IP-ga = guul weerar (compromise). 'Accepted publickey' oo aan la aqoon = key la geliyay authorized_keys.",
          },
          {
            h: "Timeline",
            p: "Had iyo jeer isticmaal UTC waqti oo samee timeline: waqtiga ugu horreeya ee shaki leh, waqtiga login-ka guuleystay, waxa xiga (commands, files, users cusub). Timeline cad ayaa ah muhiimadda warbixinta incident-ka.",
          },
        ],
        terms: [
          { term: "auth.log", def: "Log-ga login-ka iyo sudo ee Debian/Ubuntu." },
          { term: "Brute force", def: "Isku day badan oo password ah ilaa mid shaqeeyo." },
          { term: "authorized_keys", def: "File-ka SSH keys-ka la aqbalay ee isticmaalaha." },
        ],
        quiz: [
          {
            q: "10,000 'Failed password' oo ay ku xigto 1 'Accepted password' isla IP macnaheedu waa?",
            options: [
              "Brute force guuleystay — incident",
              "Isticmaale ilaaway password-ka",
              "Cilad server",
              "Waa log rotation",
            ],
            answer: 0,
            explain: "Waa successful brute force — isla markiiba go'doomi account-ka.",
          },
        ],
        exercise: {
          title: "Baar auth.log",
          steps: [
            "grep 'Failed password' auth.log | awk '{print $11}' | sort | uniq -c | sort -nr | head",
            "Hubi haddii mid ka mid ah IP-yadaas uu leeyahay 'Accepted password'.",
            "Samee timeline UTC ah.",
          ],
          deliverable: "Timeline iyo go'aan: compromise ma dhacay?",
        },
      },
      {
        slug: "persistence-linux",
        title: "Persistence & Baaritaan",
        english: "Persistence & Triage",
        minutes: 24,
        summary: "Meelaha weeraryahanku isku qariyo si uu ugu soo laabto mashiinka.",
        sections: [
          {
            h: "Cron & systemd",
            p: "crontab -l (user) iyo /etc/cron.* (system) waa meelo caan ah oo persistence ah. systemd services cusub (/etc/systemd/system/*.service) oo fulinaya script /tmp ku jira waa red flag. Hubi sidoo kale ~/.bashrc iyo /etc/rc.local.",
          },
          {
            h: "Network & processes",
            p: "ss -tunap — eeg listener-yada aan la aqoon. lsof -i — file-yada furan ee network-ka. Process socda oo ka socda /tmp ama /dev/shm waa mid aad u shaki badan.",
          },
          {
            h: "Isbeddellada file-yada",
            p: "find / -mtime -1 -type f 2>/dev/null wuxuu muujinayaa file-yada 24-kii saac ee la soo dhaafay wax laga beddelay. Barbardhig hashes-ka (sha256sum) haddii aad haysato baseline.",
          },
        ],
        terms: [
          { term: "Persistence", def: "Habka weeraryahanku uu ugu sii jiro mashiinka dib u shidista kaddib." },
          { term: "/dev/shm", def: "Memory filesystem — meel malware badan ku shaqeeyo." },
          { term: "Cron job", def: "Hawl si otomaatig ah waqti go'an u socota." },
        ],
        quiz: [
          {
            q: "Cron job cusub oo 5 daqiiqo kasta ku shaqeeya script /tmp ku jira waa?",
            options: [
              "Backup caadi ah",
              "Persistence shaki leh — baar oo go'doomi",
              "Update nidaamka",
              "Log rotation",
            ],
            answer: 1,
            explain: "/tmp + cron = qaab persistence caan ah.",
          },
        ],
        exercise: {
          title: "Persistence hunt",
          steps: [
            "Liis garee cron jobs-ka dhammaan users-ka.",
            "Eeg systemd services-ka la beddelay 7-dii maalmood.",
            "Raadi processes-ka ka socda /tmp ama /dev/shm.",
          ],
          deliverable: "Checklist buuxa oo leh natiijooyin.",
        },
      },
    ],
  }),
  m({
    id: "m4",
    slug: "security-fundamentals",
    stage: "Aasaas",
    title: "Aasaaska Cybersecurity",
    english: "Security Fundamentals",
    hours: 5,
    outcome: "Waxaad garanaysaa CIA triad, threat actors, risk iyo qaab-dhismeedka difaaca.",
    lessonList: [
      {
        slug: "cia-triad",
        title: "CIA Triad & Risk",
        english: "CIA Triad & Risk",
        minutes: 22,
        summary: "Saddexda tiir ee ammaanka macluumaadka iyo sida risk loo qiyaaso.",
        sections: [
          {
            h: "CIA",
            p: "Confidentiality (qarsoodi) — kaliya cidda oggolaanshaha leh ayaa arki karta. Integrity (dhabnimo) — xogtu ma beddelmin. Availability (helitaan) — nidaamku wuu shaqeeyaa marka loo baahdo. Ransomware wuxuu weeraraa Availability iyo Confidentiality; xog la beddelay bank-ka wuxuu weeraraa Integrity.",
          },
          {
            h: "Risk",
            p: "Risk = Threat × Vulnerability × Impact. Ma jiro ammaan 100%. Waxaad go'aansanaysaa: aqbal (accept), yaree (mitigate), wareeji (transfer/insurance) ama iska ilaali (avoid). Waxaan marka hore difaacnaa hantida ugu qiimaha badan (crown jewels).",
          },
          {
            h: "Defense in depth",
            p: "Layer badan: awareness training, email filtering, endpoint protection (EDR), network segmentation, MFA, backups, monitoring (SIEM). Haddii layer-ku mid ka guuldareysto, kuwa kale ayaa joojinaya.",
          },
        ],
        terms: [
          { term: "Threat actor", def: "Cidda weerarka geysanaysa (criminal, insider, state)." },
          { term: "Vulnerability", def: "Nuglaan nidaamka ku jirta oo la isticmaali karo." },
          { term: "Mitigation", def: "Tallaabo lagu yareynayo khatarta." },
        ],
        quiz: [
          {
            q: "Ransomware wuxuu si toos ah u weeraraa?",
            options: ["Availability", "Kaliya Integrity", "Kaliya physical security", "Ma jiro"],
            answer: 0,
            explain: "Xogta la qariyay lama heli karo — Availability (iyo Confidentiality haddii la xado).",
          },
          {
            q: "Risk waxaa lagu qiyaasaa?",
            options: [
              "Threat × Vulnerability × Impact",
              "Tirada firewalls",
              "Qiimaha software-ka",
              "Tirada shaqaalaha",
            ],
            answer: 0,
            explain: "Waa saddexda arrimood ee la isku dhufto.",
          },
        ],
        exercise: {
          title: "Risk register yar",
          steps: [
            "Liis garee 5 hanti (assets) muhiim ah oo shirkad yar leedahay.",
            "Mid kasta u qor threat, vulnerability iyo impact (1-5).",
            "Xisaabi risk score oo kala hormari.",
          ],
          deliverable: "Risk register 5 sadar ah.",
        },
      },
      {
        slug: "malware-iyo-attack-types",
        title: "Malware & Noocyada Weerarka",
        english: "Malware & Attack Types",
        minutes: 24,
        summary: "Ka bar noocyada malware-ka iyo weerarrada ugu badan ee analyst-ku la kulmo.",
        sections: [
          {
            h: "Noocyada malware",
            p: "Virus (isku dhejiya file), Worm (is-faafiya network), Trojan (iska dhigaya program wanaagsan), Ransomware (qariya xogta), Spyware/Infostealer (xada credentials), Rootkit (isku qariya kernel), Botnet agent (mashiinka ka dhiga qalab weerar).",
          },
          {
            h: "Weerarrada caanka ah",
            p: "Phishing iyo BEC (Business Email Compromise), credential stuffing, brute force, SQL injection, XSS, man-in-the-middle, DDoS, supply chain. Bilowga weerarrada intooda badan waa email ama credential la xaday.",
          },
          {
            h: "Kill chain",
            p: "Recon → Weaponization → Delivery → Exploitation → Installation → Command & Control → Actions on Objectives. Analyst-ku wuxuu isku dayaa inuu joojiyo weerarka sida ugu horreysa ee suurtogalka ah — go'doominta email-ka delivery-ga ah way ka jaban tahay soo kabashada ransomware.",
          },
        ],
        terms: [
          { term: "C2 (Command & Control)", def: "Server-ka weeraryahanka ee amarrada u dira malware-ka." },
          { term: "Infostealer", def: "Malware xadaya passwords, cookies iyo wallets." },
          { term: "BEC", def: "Khiyaano email shirkadeed lagu doonayo lacag wareejin." },
        ],
        quiz: [
          {
            q: "Malware is-faafiya network-ga isagoo aan u baahnayn isticmaale waa?",
            options: ["Worm", "Trojan", "Adware", "Keylogger"],
            answer: 0,
            explain: "Worm-ku waa is-faafiye (self-propagating).",
          },
          {
            q: "Tallaabada ugu horreysa ee kill chain waa?",
            options: ["Reconnaissance", "Installation", "Exfiltration", "C2"],
            answer: 0,
            explain: "Recon — ururinta macluumaadka bartilmaameedka.",
          },
        ],
        exercise: {
          title: "Map weerar kill chain",
          steps: [
            "Xulo weerar caan ah (tusaale: phishing → ransomware).",
            "Mid kasta oo ka mid ah 7-da tallaabo u qor waxa dhacaya.",
            "Mid kasta u qor hal control oo joojin kara.",
          ],
          deliverable: "Jaantus 7 sadar ah: tallaabo, ficil, control.",
        },
      },
      {
        slug: "password-security",
        title: "Ammaanka Password-ka & MFA",
        english: "Password Security & MFA",
        minutes: 20,
        summary: "Sida passwords loo xado, sida hashing u shaqeeyo, iyo sababta MFA muhiim u tahay.",
        sections: [
          {
            h: "Hashing",
            p: "Password-yadu waa in aan la kaydin qoraal cad. Waxaa la kaydiyaa hash (bcrypt, Argon2) oo leh salt. MD5 iyo SHA1 waa duugoobay. Marka database la xado, hashes daciif ah si dhakhso ah ayaa loo jebiyaa (cracking) iyadoo la isticmaalayo wordlists sida rockyou.txt.",
          },
          {
            h: "Credential stuffing",
            p: "Dadku isla password ayay ku isticmaalaan meelo badan. Marka site la xado, weeraryahannadu isla emails/passwords-kaas ayay ku tijaabiyaan Facebook, email iyo bangiyada. Xalku: password kala duwan meel kasta + password manager (Bitwarden, 1Password).",
          },
          {
            h: "MFA",
            p: "MFA waxay ku daraysaa layer labaad: app (TOTP) ama security key. SMS waa ka wanaagsan waxba la'aan laakiin waa la weerari karaa SIM swap. Ka digtoonow 'MFA fatigue' — marka lagu soo daadiyo push notifications ilaa aad riixdo Approve.",
          },
        ],
        terms: [
          { term: "Salt", def: "Qoraal random ah oo lagu daro password-ka ka hor hashing." },
          { term: "TOTP", def: "Lambar 6-god ah oo 30 sekan kasta beddelma (Google/Microsoft Authenticator)." },
          { term: "SIM swap", def: "Weerar lagu xado lambarka telefoonka si loo helo SMS codes." },
        ],
        quiz: [
          {
            q: "Habkee ugu wanaagsan ee lagu kaydiyo passwords database?",
            options: ["Plain text", "MD5", "bcrypt/Argon2 + salt", "Base64"],
            answer: 2,
            explain: "bcrypt/Argon2 waa slow hashes oo salt leh — way adkeeyaan cracking.",
          },
          {
            q: "MFA fatigue attack waa?",
            options: [
              "Isticmaalaha oo daalay password-yada",
              "Push notification badan ilaa isticmaaluhu Approve riixo",
              "Battery-ga telefoonka oo dhamaaday",
              "Firewall oo xannibay MFA",
            ],
            answer: 1,
            explain: "Xalku waa number matching iyo xaddidaadda push-yada.",
          },
        ],
        exercise: {
          title: "Hubi ammaanka accounts-kaaga",
          steps: [
            "Ku hubi emailkaaga haveibeenpwned.com.",
            "Rakib password manager oo beddel 5 password oo la isku celiyay.",
            "Ku shid MFA email, social media iyo mobile money.",
          ],
          deliverable: "Checklist ah accounts-ka aad ammaanisay.",
        },
      },
    ],
  }),
  m({
    id: "m5",
    slug: "phishing",
    stage: "Dhexe",
    title: "Phishing & Khiyaamo Online",
    english: "Phishing & Online Fraud",
    hours: 6,
    outcome: "Waxaad baari kartaa email phishing ah oo aad qori kartaa go'aan iyo talooyin.",
    lessonList: [
      {
        slug: "phishing-anatomy",
        title: "Qaab-dhismeedka Email Phishing",
        english: "Anatomy of a Phishing Email",
        minutes: 26,
        summary: "Calaamadaha iyo sida loo falanqeeyo header-yada email-ka.",
        sections: [
          {
            h: "Calaamadaha",
            p: "Degdeg iyo cabsi ('account-kaaga waa la xiraya 24 saac'), salaan guud ('Dear Customer'), display name khiyaano ah oo aan la mid ahayn email-ka dhabta ah, link-yo qariya URL dhabta ah, attachments (.html, .iso, .zip oo leh .exe), khaladaad luqadeed, iyo codsi si degdeg ah lacag ama gift cards loo diro.",
          },
          {
            h: "Header analysis",
            p: "Eeg Return-Path iyo From — ma isku mid baa? Received chain-ka wuxuu muujinayaa server-yada dhab ah. Hubi SPF, DKIM iyo DMARC natiijooyinka: 'spf=fail dkim=none dmarc=fail' waa calaamad weyn. Authentication-Results header-ka ayaa kuu sheegaya.",
          },
          {
            h: "Falanqaynta link-yada",
            p: "Waligaa ha gujin link-ga. Nuqul (copy) oo ku falanqee URLScan.io ama VirusTotal, ama isticmaal VM go'doonsan. Fiiri domain-ka dhabta ah ee ka horreeya '/' saddexaad. bank.so.login-secure.xyz waa domain-kiisu login-secure.xyz — ma aha bank.so.",
          },
        ],
        terms: [
          { term: "SPF", def: "Hubinta in server-ku uu xaq u leeyahay inuu u diro email domain-kaas." },
          { term: "DMARC", def: "Siyaasadda sheegaysa waxa lagu sameeyo email SPF/DKIM ku dhacay." },
          { term: "Display name spoofing", def: "Magaca la muujiyo oo been ah, laakiin email-ku waa mid kale." },
        ],
        quiz: [
          {
            q: "Domain-kee ayaa dhabta ah ee URL-kan: https://bank.so.login-secure.xyz/verify ?",
            options: ["bank.so", "login-secure.xyz", "verify", "https"],
            answer: 1,
            explain: "Domain-ka dhabta ah waa labada qaybood ee ugu dambeeya: login-secure.xyz.",
          },
          {
            q: "Header-kee ayaa muujinaya natiijada SPF/DKIM?",
            options: ["Subject", "Authentication-Results", "MIME-Version", "Content-Type"],
            answer: 1,
            explain: "Authentication-Results wuxuu muujiyaa spf=, dkim=, dmarc=.",
          },
        ],
        exercise: {
          title: "Triage email",
          steps: [
            "Qaado email tusaale ah oo phishing ah.",
            "Soo saar: sender, Return-Path, SPF/DKIM/DMARC, links, attachments.",
            "Go'aami: phishing / spam / legit.",
            "Qor talooyin: block sender, delete, isticmaale la baro.",
          ],
          deliverable: "Warbixin triage ah oo 1 bog ah.",
        },
      },
      {
        slug: "smishing-mobile-money",
        title: "Smishing & Khiyaamada Mobile Money",
        english: "Smishing & Mobile Money Fraud",
        minutes: 22,
        summary: "Khiyaamooyinka SMS iyo mobile money ee ugu badan bulshada Soomaaliyeed.",
        sections: [
          {
            h: "Smishing",
            p: "SMS sheegaya 'Waxaad ku guulaysatay abaalmarin' ama 'Lacag qalad ah ayaa laguu diray, fadlan celi'. Weeraryahanku wuxuu isticmaalaa degdeg iyo xishood. Xeeladda 'reverse transfer' waa mid caan ah: waxay sheegaan inay lacag khalad ku direen, adna waad celisaa — laakiin lacagtii hore weligeed ma iman.",
          },
          {
            h: "Vishing & PIN",
            p: "Wicitaan ka yimid 'adeegga macmiilka' oo ku weydiinaya PIN-kaaga ama code-ka SMS. Xeer: shirkad dhab ah waligeed kuma weydiiso PIN ama OTP. OTP la wadaago = account la waayay.",
          },
          {
            h: "Sida loo warbixiyo",
            p: "Kaydso screenshot, lambarka, waqtiga iyo transaction ID. La xiriir shirkadda adeegga isla markiiba, xannib lambarka, oo ka digniin qoyska. Bulshada dhexdeeda, wacyi gelinta ayaa ah difaaca ugu xoogan.",
          },
        ],
        terms: [
          { term: "Smishing", def: "Phishing SMS ah." },
          { term: "Vishing", def: "Phishing telefoon wicitaan ah." },
          { term: "OTP", def: "Code hal mar la isticmaalo — waligaa ha wadaagin." },
        ],
        quiz: [
          {
            q: "Qof wuxuu ku leeyahay 'lacag khalad ah ayaan kuu diray, fadlan celi'. Maxaad samaynaysaa?",
            options: [
              "Isla markiiba celi",
              "Hubi taariikhda transaction-kaaga oo la xiriir shirkadda adeegga",
              "U dir lacag dheeraad ah",
              "U dir PIN-kaaga si ay u hubiyaan",
            ],
            answer: 1,
            explain: "Xaqiiji rasiidka rasmiga ah — reverse-transfer scam waa mid caan ah.",
          },
        ],
        exercise: {
          title: "Ururi 3 farriimood oo khiyaano ah",
          steps: [
            "Ka soo ururi SMS/WhatsApp khiyaano ah adiga ama qoyskaaga.",
            "Mid kasta u qor xeeladda cadaadiska ee la isticmaalay.",
            "Qor jawaab ammaan ah oo la gaarsiin karo bulshada.",
          ],
          deliverable: "Poster ama post gaaban oo wacyi gelin ah.",
        },
      },
      {
        slug: "social-engineering",
        title: "Social Engineering",
        english: "Social Engineering",
        minutes: 24,
        summary: "Sida weeraryahannadu u weeraraan dadka, ma aha kombiyuutarka.",
        sections: [
          {
            h: "Xeeladaha",
            p: "Pretexting (sheeko been ah), baiting (USB la iska daayo), quid pro quo (adeeg beddelkiis), tailgating (albaabka lagu daba galo), authority (iska dhigid madax), scarcity iyo urgency. Weeraryahannadu waxay isticmaalaan dabeecadda bini'aadamka: kalsooni, cabsi iyo caawimaad.",
          },
          {
            h: "OSINT",
            p: "Weerarka wuxuu ku bilaabmaa cilmi-baaris: LinkedIn (magacyada iyo jagooyinka), Facebook (asxaabta, taariikhda dhalashada), website-ka shirkadda (email format), sawirro (badge, screen). Yaree waxa aad si guud u soo bandhigto.",
          },
          {
            h: "Difaaca",
            p: "Xaqiiji marwalba adigoo isticmaalaya channel kale (wac lambarka rasmiga ah, ha ku jawaabin email-ka). Nidaam cad oo lacag wareejin ah oo u baahan laba qof. Tababar joogto ah iyo phishing simulation. Culture: qofka soo sheega qalad waa in la amaano, la ma canaanto.",
          },
        ],
        terms: [
          { term: "Pretexting", def: "Sheeko been ah oo lagu kalsoonigeliyo qofka." },
          { term: "Tailgating", def: "Ku daba galida albaabka ammaanka qof kale." },
          { term: "OSINT", def: "Macluumaad furan oo laga ururiyo internet-ka." },
        ],
        quiz: [
          {
            q: "Difaaca ugu wanaagsan ee BEC (madaxa oo lacag ku dalbanaya email) waa?",
            options: [
              "Si dhakhso ah u sameyso amarka madaxa",
              "Xaqiijin channel kale ah (wicitaan lambar la yaqaan)",
              "U dir email-ka IT-ga oo sug",
              "Ku dar madaxa CC",
            ],
            answer: 1,
            explain: "Out-of-band verification ayaa joojisa BEC intooda badan.",
          },
        ],
        exercise: {
          title: "OSINT is-qiimayn",
          steps: [
            "Isku raadi magacaaga Google iyo social media.",
            "Qor macluumaadka weeraryahan uu isticmaali karo.",
            "Beddel privacy settings-ka oo dib u qiimee.",
          ],
          deliverable: "Liis ah waxa aad qarisay iyo sababta.",
        },
      },
    ],
  }),
  m({
    id: "m6",
    slug: "soc-operations",
    stage: "Sare",
    title: "Hawlgalka SOC & Tier 1 Triage",
    english: "SOC Operations & Tier 1 Triage",
    hours: 12,
    outcome: "Waxaad u shaqayn kartaa sida Tier 1 analyst: triage alerts, escalation iyo documentation.",
    lessonList: [
      {
        slug: "soc-roles",
        title: "SOC-ga & Doorka Tier 1",
        english: "The SOC and the Tier 1 Role",
        minutes: 22,
        summary: "Sida SOC-gu u dhisan yahay iyo waxa maalintaada shaqo ka kooban tahay.",
        sections: [
          {
            h: "Qaab-dhismeedka",
            p: "Tier 1 (triage — alerts, hubinta bilowga ah), Tier 2 (baaris qoto dheer), Tier 3 / Threat Hunter (raadin firfircoon), Incident Responder, SOC Manager, Detection Engineer. SOC badan waxay shaqeeyaan 24/7 shifts ah, iyagoo isticmaalaya SIEM, EDR, SOAR iyo ticketing system.",
          },
          {
            h: "Maalinta Tier 1",
            p: "Bilow shift handover — akhri waxa dhacay shift-kii hore. Eeg alert queue-ga, ka bilow severity sare. Alert kasta: fahan, ururi context (user, host, IP, waqti), go'aami (true/false positive), qor natiijada, escalate haddii loo baahdo. Waqti ahaan, ha ku hafan hal alert — SLA ayaa jira.",
          },
          {
            h: "Documentation",
            p: "Haddii aan la qorin, ma dhicin. Ticket kasta wuxuu u baahan yahay: waxa dhacay, marka, cida saameysay, waxa aad hubisay, caddaymaha (evidence), go'aankaaga iyo talaabooyinka xiga. Analyst-ka wanaagsan waa qofka warbixintiisa cid kale fahmi karto 6 bilood kadib.",
          },
        ],
        terms: [
          { term: "Triage", def: "Kala saarista alerts-ka: waxa muhiimka ah iyo waxa aan ahayn." },
          { term: "SLA", def: "Waqtiga la ballanqaaday ee lagu jawaabo alert." },
          { term: "Escalation", def: "U gudbinta arrin heer sare (Tier 2/3)." },
        ],
        quiz: [
          {
            q: "Waa maxay shaqada ugu weyn ee Tier 1 analyst?",
            options: [
              "Dib u dhis network-ga",
              "Triage alerts, ururi context, go'aami true/false positive",
              "Qor malware",
              "Maamul miisaaniyadda",
            ],
            answer: 1,
            explain: "Tier 1 waa qaybta ugu horreysa ee alerts-ka baarta.",
          },
        ],
        exercise: {
          title: "Qor shift handover",
          steps: [
            "Qaado 3 alert oo tusaale ah.",
            "Mid kasta u qor xaalada, waxa la sameeyay, iyo waxa dhiman.",
            "Ku soo koob 5 sadar oo shift-ka xiga u qoran.",
          ],
          deliverable: "Handover note oo 5-10 sadar ah.",
        },
      },
      {
        slug: "mitre-attack",
        title: "MITRE ATT&CK",
        english: "MITRE ATT&CK Framework",
        minutes: 26,
        summary: "Luqadda caalamiga ah ee lagu sharraxo dhaqanka weeraryahannada.",
        sections: [
          {
            h: "Tactics & Techniques",
            p: "ATT&CK waxay u kala qaybisaa weerarka Tactics (ujeeddada: Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, C2, Exfiltration, Impact) iyo Techniques (sida: T1566 Phishing, T1059 Command and Scripting Interpreter).",
          },
          {
            h: "Isticmaalka Tier 1",
            p: "Marka aad qorayso ticket, ku dar technique ID: 'User uu furay attachment macro leh (T1566.001) taasoo dhalisay PowerShell (T1059.001)'. Tani waxay ka dhigaysaa warbixintaada mid la barbardhigi karo, la xisaabin karo, lana isticmaali karo detection engineering.",
          },
          {
            h: "Detection gap",
            p: "Team-yadu waxay isticmaalaan ATT&CK Navigator si ay u muujiyaan techniques-ka ay ogaan karaan iyo kuwa aanay ogaan karin (coverage map). Tani waxay caddaynaysaa halka lagu baahan yahay log source cusub ama rule cusub.",
          },
        ],
        terms: [
          { term: "Tactic", def: "Ujeeddada weeraryahanka (tusaale: Persistence)." },
          { term: "Technique", def: "Habka uu ujeeddada ku gaaro (tusaale: Scheduled Task)." },
          { term: "TTP", def: "Tactics, Techniques and Procedures — dhaqanka weeraryahanka." },
        ],
        quiz: [
          {
            q: "T1566 waa technique la xiriira?",
            options: ["Phishing", "Backup", "Patching", "Encryption at rest"],
            answer: 0,
            explain: "T1566 = Phishing (Initial Access).",
          },
          {
            q: "Tactic-kee ayaa ku saabsan sidii weeraryahanku u sii joogi lahaa nidaamka?",
            options: ["Discovery", "Persistence", "Collection", "Impact"],
            answer: 1,
            explain: "Persistence = sii joogitaanka dib-u-shidista kadib.",
          },
        ],
        exercise: {
          title: "Map incident ATT&CK",
          steps: [
            "Qaado incident tusaale ah (phishing → credential theft → lateral movement).",
            "Tallaabo kasta u hel tactic iyo technique ID.",
            "Mid kasta u qor detection source (email gateway, EDR, SIEM).",
          ],
          deliverable: "Jaantus: tallaabo → technique → log source.",
        },
      },
      {
        slug: "alert-triage-workflow",
        title: "Workflow-ga Triage-ga",
        english: "Alert Triage Workflow",
        minutes: 28,
        summary: "Nidaam 6-tallaabo ah oo aad alert kasta ku baari karto si isku mid ah.",
        sections: [
          {
            h: "Nidaamka",
            p: "1) Fahan alert-ka (rule-kee? maxuu tijaabinayaa?). 2) Ururi context: user, host, IP, waqti UTC, process. 3) Hubi baseline: caadi ma tahay? 4) Enrich: VirusTotal, AbuseIPDB, threat intel, asset owner. 5) Go'aami: true positive / false positive / benign true positive. 6) Ficil: xir, escalate, ama bilow incident.",
          },
          {
            h: "Su'aalaha muhiimka ah",
            p: "Yaa? (user/host) Maxaa? (ficilka) Goorma? (timeline UTC) Xagee? (source/destination) Sidee? (technique) Waa maxay saameynta? Haddii aadan ka jawaabi karin su'aalahaas, wali ma dhamaystirin triage-ga.",
          },
          {
            h: "Marka la escalate",
            p: "Escalate haddii: caddayn jirto in weerarku guuleystay (successful login ka dib brute force), xog xasaasi ah la taabtay, ransomware calaamado, admin account la isticmaalay si aan caadi ahayn, ama aad shaki weyn qabto laakiin aadan hubin. Waligaa ha ka baqin escalation — halis waa in la wadaago.",
          },
        ],
        terms: [
          { term: "Benign true positive", def: "Waa dhab, laakiin waa hawl shaqo caadi ah (tusaale: admin tijaabo)." },
          { term: "Enrichment", def: "Ku darista macluumaad dheeraad ah alert-ka." },
          { term: "IOC", def: "Indicator of Compromise: IP, hash, domain shaki leh." },
        ],
        quiz: [
          {
            q: "Alert: 'Impossible travel' — user Muqdisho 10:00 UTC, Beijing 10:20 UTC. Tallaabada koowaad?",
            options: [
              "Xir alert-ka, waa false positive",
              "Ururi context: ma VPN baa? Hubi login-yada, oo escalate haddii uu guuleystay",
              "Tirtir account-ka",
              "Sug 24 saac",
            ],
            answer: 1,
            explain: "Xaqiiji VPN/proxy marka hore, kadibna eeg guulaha login-ka.",
          },
          {
            q: "Marka aad qorayso ticket, waqtiga waa in lagu qoraa?",
            options: ["Waqtiga maxalliga ah", "UTC", "Waqti kasta", "Ma muhiima"],
            answer: 1,
            explain: "UTC ayaa ka fogaynaya jahwareerka timeline-ka.",
          },
        ],
        exercise: {
          title: "Samee playbook",
          steps: [
            "Xulo alert nooc ah (tusaale: brute force SSH).",
            "Qor 6-da tallaabo si faahfaahsan.",
            "Ku dar shuruudaha escalation-ka iyo template ticket.",
          ],
          deliverable: "Playbook 1 bog ah oo la isticmaali karo.",
        },
      },
    ],
  }),
  m({
    id: "m7",
    slug: "siem-detection",
    stage: "Sare",
    title: "SIEM, Log Analysis & Detection",
    english: "SIEM, Log Analysis & Detection",
    hours: 12,
    outcome: "Waxaad ka raadin kartaa SIEM-ka, ku qori kartaa queries, oo aad fahmi kartaa detection rules.",
    lessonList: [
      {
        slug: "siem-aasaas",
        title: "Waa maxay SIEM?",
        english: "SIEM Fundamentals",
        minutes: 24,
        summary: "Sida log-yada loo ururiyo, loo normalize gareeyo, alerts-na looga dhaliyo.",
        sections: [
          {
            h: "Pipeline-ka",
            p: "Collection (agents, syslog, API) → Normalization (parsing → fields sida src_ip, user, event_id) → Correlation (rules) → Alerting → Dashboard/Reporting. Tusaalayaal: Splunk, Elastic/Wazuh, Microsoft Sentinel, QRadar. Wazuh iyo Elastic waa bilaash oo ku fiican barashada.",
          },
          {
            h: "Log sources muhiim ah",
            p: "Windows Security Events (4624 login guulaystay, 4625 guuldarreystay, 4720 user cusub, 4672 admin rights), Sysmon (1 process create, 3 network, 11 file create), firewall, proxy/DNS, EDR, cloud audit logs, VPN. Log source la'aan = detection la'aan.",
          },
          {
            h: "Correlation",
            p: "Rule-ku wuxuu isku xiraa dhacdooyin: 20 x 4625 oo 5 daqiiqo gudahood ah oo ay ku xigto 4624 isla account = brute force success. Kani waa sababta SIEM-ku uga fiican yahay eegista log kasta gooni.",
          },
        ],
        terms: [
          { term: "Event ID 4625", def: "Windows: login guuldarraystay." },
          { term: "Sysmon", def: "Tool Microsoft ah oo bixiya telemetry qoto dheer." },
          { term: "Normalization", def: "Log-yada kala duwan lagu beddelo hal qaab." },
        ],
        quiz: [
          {
            q: "Event ID 4624 macnaheedu waa?",
            options: [
              "Login guulaystay",
              "Login guuldarraystay",
              "User la tirtiray",
              "Service la joojiyay",
            ],
            answer: 0,
            explain: "4624 = successful logon; 4625 = failed logon.",
          },
          {
            q: "Tallaabada ugu horreysa ee SIEM pipeline waa?",
            options: ["Alerting", "Collection", "Reporting", "Containment"],
            answer: 1,
            explain: "Marka hore log-yada ayaa la ururiyaa.",
          },
        ],
        exercise: {
          title: "Ku rakib Wazuh lab-kaaga",
          steps: [
            "Rakib Wazuh (docker ama VM).",
            "Ku xir agent Windows/Linux VM ah.",
            "Samee login guuldarro ah shan jeer oo raadi alert-ka.",
          ],
          deliverable: "Screenshot alert-ka Wazuh iyo fields-ka muhiimka ah.",
        },
      },
      {
        slug: "queries-iyo-hunting",
        title: "Queries & Threat Hunting",
        english: "Queries & Threat Hunting",
        minutes: 30,
        summary: "Sida loo qoro queries wax ku ool ah iyo sida loo bilaabo hunt hypothesis ku salaysan.",
        sections: [
          {
            h: "Qaabka query-ga",
            p: "Query kasta: filter (waqti + source) → search terms → aggregation → sort. Splunk: index=windows EventCode=4625 | stats count by src_ip, user | sort -count. KQL: SecurityEvent | where EventID == 4625 | summarize count() by IpAddress, Account. Bilow ballaaran, kadibna cidhiidhi.",
          },
          {
            h: "Hunting",
            p: "Hunt-ku wuxuu ku bilaabmaa hypothesis: 'Haddii weeraryahan uu isticmaalo PowerShell encoded commands, waxaan ku arki lahaa Sysmon Event 1 oo leh -enc'. Ka dib waad baaraysaa, waana rumaynaysaa ama diidaysaa. Natiijada wanaagsan ee hunt-ka waa detection rule cusub.",
          },
          {
            h: "Baseline & outliers",
            p: "Raadi waxa naadirka ah: user cusub oo galay 10 server 1 saac gudahood, process magaciisu yahay svch0st.exe, xiriir ku socda dal aan shirkaddu ganacsi ku lahayn, ama data upload weyn habeenkii. 'Stack counting' (tirinta qiyamka kala duwan) waa tabo aad u xoog badan.",
          },
        ],
        terms: [
          { term: "KQL", def: "Kusto Query Language — Microsoft Sentinel/Defender." },
          { term: "Stack counting", def: "Tirinta inta jeer ee qiime kasta soo baxay si loo helo kuwa naadirka ah." },
          { term: "Hypothesis hunt", def: "Baaris ku salaysan malo la tijaabinayo." },
        ],
        quiz: [
          {
            q: "Hunt wanaagsan wuxuu ku bilaabmaa?",
            options: [
              "Alert cusub",
              "Hypothesis cad oo la tijaabin karo",
              "Ticket furan",
              "Firewall rule",
            ],
            answer: 1,
            explain: "Hunting waa proactive: malo → xog → xaqiijin.",
          },
          {
            q: "PowerShell '-enc' oo lagu arko Sysmon Event 1 waa?",
            options: [
              "Encoded command — badanaa qarin (defense evasion)",
              "Encryption caadi ah",
              "Amar update ah",
              "Wax macno ah ma leh",
            ],
            answer: 0,
            explain: "Encoded commands waa qaab caan ah oo lagu qariyo script-yada xun.",
          },
        ],
        exercise: {
          title: "Qor 5 query",
          steps: [
            "Qor query brute force ah (4625 stats by IP).",
            "Query users cusub (4720).",
            "Query PowerShell encoded (Sysmon 1).",
            "Query xiriir dibadda ah oo waaweyn (bytes out).",
            "Query login-yada saacadaha shaqada ka baxsan.",
          ],
          deliverable: "File ah 5 query oo leh sharraxaad Soomaali ah.",
        },
      },
      {
        slug: "detection-rules",
        title: "Detection Rules & Sigma",
        english: "Detection Rules & Sigma",
        minutes: 26,
        summary: "Sida rule-yada loo qoro, loo tijaabiyo, false positive-na loo yareeyo.",
        sections: [
          {
            h: "Qaybaha rule-ka",
            p: "Rule kasta: title, description, log source, detection logic (selection + condition), false positives la filayo, severity, iyo ATT&CK mapping. Rule-ka wanaagsan wuxuu leeyahay ujeeddo cad iyo tallaabo cad oo analyst-ku qaadi karo.",
          },
          {
            h: "Sigma",
            p: "Sigma waa qaab YAML ah oo generic ah oo loo beddeli karo Splunk, Elastic ama Sentinel. Tani waxay ka dhigaysaa detection-ka mid la wadaagi karo. Bulshada (SigmaHQ) waxay leedahay kumanaan rule oo bilaash ah oo aad wax ka baran karto.",
          },
          {
            h: "Tuning",
            p: "Rule cusub kasta wuxuu bilaabmaa 'monitor mode'. Eeg 1-2 toddobaad, tiri false positives, kadibna ku dar exclusions (service accounts, scanner IP-yada, software rasmi ah). Rule aad u buuqsan wuxuu keenaa alert fatigue — waana sida weerarrada dhabta ah loo seego.",
          },
        ],
        terms: [
          { term: "Sigma", def: "Qaab guud oo YAML ah oo detection rules loogu qoro." },
          { term: "Tuning", def: "Hagaajinta rule-ka si loo yareeyo alerts been ah." },
          { term: "Alert fatigue", def: "Daal ka dhasha alerts badan oo aan macno lahayn." },
        ],
        quiz: [
          {
            q: "Rule cusub oo 500 alert maalintii dhaliya waa in?",
            options: [
              "La daayo sidiisa",
              "La tuun-gareeyo (tuning) ama la joojiyo — alert fatigue waa khatar",
              "Severity-giisa la kordhiyo",
              "Analyst kale loo diro",
            ],
            answer: 1,
            explain: "Alert fatigue wuxuu keenaa in weerarrada dhabta ah la seego.",
          },
        ],
        exercise: {
          title: "Qor rule Sigma ah",
          steps: [
            "Xulo dhaqan (tusaale: user cusub oo lagu daray group-ka Administrators).",
            "Qor Sigma YAML: logsource, detection, condition, level.",
            "Qor 3 false positive suurtogal ah iyo exclusions.",
          ],
          deliverable: "File Sigma ah oo dhamaystiran.",
        },
      },
    ],
  }),
  m({
    id: "m8",
    slug: "incident-response",
    stage: "Sare",
    title: "Incident Response & Warbixin",
    english: "Incident Response & Reporting",
    hours: 10,
    outcome:
      "Waxaad maamuli kartaa incident tallaabo tallaabo oo aad qori kartaa warbixin xirfad leh.",
    lessonList: [
      {
        slug: "nist-lifecycle",
        title: "NIST IR Lifecycle",
        english: "NIST IR Lifecycle",
        minutes: 26,
        summary: "Afarta wejiga ee jawaab-celinta dhacdooyinka iyo waxa la sameeyo weji kasta.",
        sections: [
          {
            h: "Preparation",
            p: "Playbooks, contact list, tools, backups la tijaabiyay, logging shaqaynaya, iyo tababar. Preparation-ka ayaa go'aaminaya haddii incident-ku noqonayo 2 saac mise 2 toddobaad.",
          },
          {
            h: "Detection & Analysis",
            p: "Xaqiiji incident-ka, go'aami scope (immisa host? immisa account?), samee timeline, ururi IOCs, qiimee saameynta (data, availability, sharci). Halkan analyst-ka Tier 1/2 ayaa shaqada ugu badan qabta.",
          },
          {
            h: "Containment, Eradication, Recovery",
            p: "Containment: go'doomi host-ka (network isolation), xir accounts, block IOCs — laakiin ilaali caddaymaha. Eradication: ka saar malware, dami persistence, beddel passwords. Recovery: dib u soo celi ka dib xaqiijin, la soco si dhow. Ugu dambeyn: Lessons Learned — waxa shaqeeyay iyo waxa la hagaajinayo.",
          },
        ],
        terms: [
          { term: "Containment", def: "Joojinta faafitaanka incident-ka." },
          { term: "Eradication", def: "Ka saarista weeraryahanka iyo malware-kiisa." },
          { term: "Lessons learned", def: "Kulan kadib incident-ka lagu hagaajinayo nidaamka." },
        ],
        quiz: [
          {
            q: "Ransomware ayaa faafaya. Tallaabada ugu degdegsan?",
            options: [
              "Warbixin qor",
              "Containment — go'doomi host-yada saameeyay",
              "Sug ilaa subax",
              "Bixi lacagta madaxfurashada",
            ],
            answer: 1,
            explain: "Joojinta faafitaanka ayaa mudnaanta koowaad — kadibna baaritaan.",
          },
          {
            q: "Weji kasta kadib waa in la sameeyo?",
            options: [
              "Lessons learned si loo hagaajiyo",
              "Wax lama sameeyo",
              "Software cusub la iibsado",
              "Analyst la eryo",
            ],
            answer: 0,
            explain: "Lessons learned waa wejiga afraad ee NIST.",
          },
        ],
        exercise: {
          title: "Tabletop exercise",
          steps: [
            "Sheeko: laptop maamule ayaa la qariyay (ransomware).",
            "Qor waxa aad samaynayso saacadda 1-aad, 4-aad iyo 24-aad.",
            "Qor cida la ogeysiinayo (IT, maamul, macaamiil, sharci).",
          ],
          deliverable: "Plan 1 bog ah oo waqti ku salaysan.",
        },
      },
      {
        slug: "evidence-forensics",
        title: "Caddaymaha & Forensics 101",
        english: "Evidence & Forensics 101",
        minutes: 24,
        summary: "Sida caddaymaha loo ururiyo si aan loo halleyn — chain of custody.",
        sections: [
          {
            h: "Order of volatility",
            p: "Ka bilow waxa ugu dhaqso badan ee luma: registers/cache → memory (RAM) → network connections → processes → disk → backups → archives. Haddii aad damiso mashiinka, waxaad lumisay memory-ga.",
          },
          {
            h: "Chain of custody",
            p: "Diiwaan gali: yaa qaaday, goorma, halkee la dhigay, yaa gacanta ku hayay. Isticmaal hash (SHA256) si aad u caddayso in image-ku isbeddelin. Haddii chain-ku jabo, caddayntu maxkamad kuma shaqayn karto.",
          },
          {
            h: "Artifacts muhiim ah",
            p: "Windows: Event logs, prefetch, registry run keys, scheduled tasks, browser history, $MFT. Linux: bash_history, auth.log, cron, systemd units. Cloud: audit logs, sign-in logs, OAuth grants.",
          },
        ],
        terms: [
          { term: "Chain of custody", def: "Diiwaanka dhaq-dhaqaaqa caddaynta." },
          { term: "Hash (SHA256)", def: "Astaan lagu xaqiijiyo in file-ku isbeddelin." },
          { term: "Prefetch", def: "Windows artifact muujinaya program-yada la fuliyay." },
        ],
        quiz: [
          {
            q: "Kee ayaa ugu horreeya order of volatility?",
            options: ["Disk image", "RAM/memory", "Backup tapes", "Archives"],
            answer: 1,
            explain: "Memory-gu waa mid si dhakhso ah u luma — marka hore ayaa la qaadaa.",
          },
        ],
        exercise: {
          title: "Evidence log",
          steps: [
            "Samee template chain of custody ah.",
            "Buuxi tusaale: qaadista log file, hash, waqti, qofka.",
            "Ku darso 5 artifact oo aad ururin lahayd host Windows ah.",
          ],
          deliverable: "Template + tusaale buuxa.",
        },
      },
      {
        slug: "incident-report",
        title: "Qorista Warbixinta Incident-ka",
        english: "Writing the Incident Report",
        minutes: 28,
        summary: "Qaab-dhismeedka warbixinta xirfadeed ee maamulka iyo tikniyoolajiyada labadaba u qoran.",
        sections: [
          {
            h: "Qaab-dhismeedka",
            p: "1) Executive summary (3-5 sadar, luqad fudud). 2) Timeline UTC. 3) Scope & impact (hosts, users, xog). 4) Root cause. 5) Caddaymaha (IOCs, log excerpts). 6) Tallaabooyinka la qaaday. 7) Talooyinka (gaaban, dhexdhexaad, dheer). Xanuunka ugu weyn ee warbixinnada waa jargon badan oo aan maamulku fahmi karin.",
          },
          {
            h: "Luqadda",
            p: "Qor xaqiiqooyin, ha qorin malo. Kala saar 'waxaan ogaanay' iyo 'waxaan u malaynaynaa'. Isticmaal waqti UTC, ID cad (hostnames, usernames), iyo tirooyin. Ha eedayn shakhsi — diiradda saar nidaamka.",
          },
          {
            h: "Talooyinka",
            p: "Talo kastaa waa inay noqotaa mid la fulin karo oo mudnaan leh: 'Ku shid MFA dhammaan accounts-ka admin-ka 30 maalmood gudahood (owner: IT Manager)'. Talo aan lahayn owner iyo waqti weligeed lama fuliyo.",
          },
        ],
        terms: [
          { term: "Executive summary", def: "Soo koobid maamulka loo qoray oo aan farsamo badan lahayn." },
          { term: "Root cause", def: "Sababta asaasiga ah ee incident-ka keentay." },
          { term: "Actionable recommendation", def: "Talo leh owner iyo waqti go'an." },
        ],
        quiz: [
          {
            q: "Executive summary waa in loo qoraa?",
            options: [
              "Farsamo yaqaanno keliya",
              "Luqad fudud oo maamulku fahmi karo",
              "Log qoraal ah",
              "Code",
            ],
            answer: 1,
            explain: "Maamulku wuxuu u baahan yahay saameyn iyo go'aan, ma aha faahfaahin farsamo.",
          },
          {
            q: "Talo wanaagsan waxay leedahay?",
            options: [
              "Owner iyo waqti go'an",
              "Erayo badan",
              "Diagram keliya",
              "Magac shakhsi la eedeeyay",
            ],
            answer: 0,
            explain: "Actionable = cid mas'uul ah + waqti.",
          },
        ],
        exercise: {
          title: "Qor warbixin buuxda",
          steps: [
            "Isticmaal mid ka mid ah labs-ka aad dhammaysay.",
            "Qor 7-da qaybood ee warbixinta.",
            "Ku dar 3 talo oo owner iyo waqti leh.",
          ],
          deliverable: "Warbixin 2 bog ah oo portfolio-gaaga gali karto.",
        },
      },
    ],
  }),
  m({
    id: "m9",
    slug: "threat-intelligence",
    title: "Threat Intelligence",
    english: "Threat Intelligence & OSINT",
    stage: "Sare",
    hours: 10,
    outcome:
      "Waxaad fahmi kartaa threat intelligence, IOCs, OSINT iyo sida xogta khataraha loo isticmaalo SOC-ga.",

    lessonList: [
      {
        slug: "threat-intelligence-basics",
        title: "Aasaaska Threat Intelligence",
        english: "Threat Intelligence Fundamentals",
        minutes: 45,
        summary:
          "Baro threat actors, campaigns, IOC, TTP iyo sida SOC analysts u isticmaalaan threat intelligence.",

        sections: [
          {
            h: "Waa maxay Threat Intelligence?",
            p: "Threat intelligence waa xog la ururiyo lana falanqeeyo si loo fahmo khataraha cybersecurity, attackers iyo hababka ay isticmaalaan."
          },
          {
            h: "Threat Actors iyo Campaigns",
            p: "Threat actors waa shaqsiyaad ama kooxo sameeya weerarro. Campaign waa weerar qorshaysan oo leh ujeedo gaar ah."
          },
          {
            h: "Sida SOC Analyst u isticmaalo Intelligence",
            p: "SOC analysts waxay isticmaalaan threat intelligence si ay u baaritaan alerts, u aqoonsadaan IOC-yada una hagaajiyaan difaaca."
          },
        ],

        terms: [
          {
            term: "IOC",
            def: "Indicator of Compromise — calaamad muujinaysa dhaqdhaqaaq ama weerar shaki leh."
          },
          {
            term: "TTP",
            def: "Tactics, Techniques and Procedures ay isticmaalaan attackers."
          },
          {
            term: "Threat Actor",
            def: "Qof ama koox fulisa weerarro cybersecurity."
          },
        ],

        quiz: [
          {
            q: "IOC maxay tahay?",
            options: [
              "Nooc firewall ah",
              "Calaamad muujinaysa weerar",
              "Operating system"
            ],
            answer: 1,
            explain:
              "IOC waa calaamad sida IP address, domain ama hash oo muujin karta weerar."
          },
        ],

        exercise: {
          title: "Threat Intelligence Analysis",
          steps: [
            "Aqoonso threat actor.",
            "Raadi indicators of compromise.",
            "Qor threat intelligence report."
          ],
          deliverable: "Threat Intelligence Report",
        },
      },

      {
        slug: "iocs-and-mitre",
        title: "IOCs iyo MITRE ATT&CK",
        english: "IOCs, TTPs & MITRE ATT&CK",
        minutes: 45,
        summary:
          "Faham indicators of compromise, TTPs iyo MITRE ATT&CK framework.",

        sections: [
          {
            h: "Indicators of Compromise",
            p: "IOC waa xog tilmaamaysa in nidaam laga yaabo inuu weerar ku dhacay sida IP addresses, domains, hashes iyo URLs."
          },
          {
            h: "MITRE ATT&CK Framework",
            p: "MITRE ATT&CK waa framework lagu fahmo tactics iyo techniques ay isticmaalaan attackers."
          },
          {
            h: "Isticmaalka SOC",
            p: "SOC analysts waxay isticmaalaan MITRE si ay u fahmaan weerarka una sameeyaan detection rules."
          },
        ],

        terms: [
          {
            term: "MITRE ATT&CK",
            def: "Framework sharaxaya tactics iyo techniques attackers isticmaalaan."
          },
          {
            term: "Hash",
            def: "Aqoonsi gaar ah oo lagu xaqiijiyo file."
          },
          {
            term: "Tactic",
            def: "Ujeedada guud ee attacker-ka sida persistence ama credential access."
          },
        ],

        quiz: [
          {
            q: "MITRE ATT&CK maxaa loo isticmaalaa?",
            options: [
              "In lagu fahmo farsamooyinka attackers",
              "In lagu sameeyo website",
              "In lagu beddelo passwords"
            ],
            answer: 0,
            explain:
              "MITRE ATT&CK wuxuu caawiyaa analysts inay fahmaan habka attackers u shaqeeyaan."
          },
        ],

        exercise: {
          title: "IOC Investigation",
          steps: [
            "Dooro IOC sample ah.",
            "Falanqee khatartiisa.",
            "Samee analyst notes."
          ],
          deliverable: "IOC Investigation Report",
        },
      },

      {
        slug: "osint-intelligence-report",
        title: "OSINT iyo Intelligence Reports",
        english: "OSINT & Intelligence Reporting",
        minutes: 40,
        summary:
          "Baro sida xog furan loo ururiyo loona sameeyo threat intelligence report.",

        sections: [
          {
            h: "Waa maxay OSINT?",
            p: "OSINT waa Open Source Intelligence, xog laga helo ilo dadweyne sida websites, databases iyo warbaahinta."
          },
          {
            h: "Xog ururin",
            p: "Analyst-ku wuxuu isticmaalaa ilo kala duwan si uu u fahmo threat actors iyo khataraha."
          },
          {
            h: "Threat Intelligence Report",
            p: "Warbixin wanaagsan waxay leedahay summary, findings, evidence iyo talooyin difaac."
          },
        ],

        terms: [
          {
            term: "OSINT",
            def: "Open Source Intelligence — xog laga helo ilo furan."
          },
          {
            term: "Threat Report",
            def: "Warbixin sharaxaysa khatar ama weerar cybersecurity."
          },
        ],

        quiz: [
          {
            q: "OSINT maxay ka dhigan tahay?",
            options: [
              "Open Source Intelligence",
              "Online Security Internal Tool",
              "Operating System Network"
            ],
            answer: 0,
            explain:
              "OSINT waa xog laga ururiyo ilo dadweyne."
          },
        ],

        exercise: {
          title: "OSINT Intelligence Report",
          steps: [
            "Ururi xog furan.",
            "Qiimee threat actor.",
            "Qor report."
          ],
          deliverable: "OSINT Intelligence Report",
        },
      },
    ],
  }),
  m({
    id: "m10",
    slug: "threat-hunting",
    title: "Threat Hunting",
    english: "Threat Hunting & Advanced Detection",
    stage: "Sare",
    hours: 12,
    outcome:
      "Waxaad samayn kartaa threat hunting, SIEM investigation iyo baaritaan horumarsan.",
    lessonList: [
      {
        slug: "threat-hunting-methodology",
        title: "Habka Threat Hunting",
        english: "Threat Hunting Methodology",
        summary:
          "Baro sida SOC analyst-ku u raadiyo khataraha qarsoon.",
        minutes: 45,

        sections: [
          {
            h: "Threat Hunting Waa Maxay?",
            p: "Threat hunting waa hab firfircoon oo lagu raadiyo khataraha qarsoon ka hor inta aysan dhaawac keenin."
          },
          {
            h: "Threat Hunting Methodology",
            p: "SOC analyst-ku wuxuu isticmaalaa hypotheses, logs, SIEM queries iyo evidence si uu u helo attackers."
          }
        ],

        terms: [
          {
            term: "Hypothesis",
            def: "Fikrad ama su'aal lagu bilaabo baaritaanka threat hunting."
          },
          {
            term: "IOC",
            def: "Indicator of Compromise waa calaamad muujinaysa weerar ama malware."
          }
        ],

        exercise: {
          title: "Samee Threat Hunt",
          steps: [
            "Dooro suspicious activity",
            "Raadi logs",
            "Samee query SIEM",
            "Qor findings"
          ],
          deliverable: "Threat hunting notes"
        },

        quiz: [
          {
            q: "Waa maxay Threat Hunting?",
            options: [
              "Raadinta khataraha qarsoon",
              "Samaynta website",
              "Rakibidda Windows",
              "Maareynta password"
            ],
            answer: 0,
            explain: "Threat hunting waa raadinta firfircoon ee threats."
          }
        ]
      },

      {
        slug: "advanced-siem-hunting",
        title: "SIEM Hunting",
        english: "Advanced SIEM Investigation",
        summary:
          "Isticmaal logs iyo queries si aad u hesho dhaqdhaqaaqyo shaki leh.",
        minutes: 50,

        sections: [
          {
            h: "SIEM Investigation",
            p: "SIEM wuxuu ururiyaa logs si SOC analyst-ku u baaro dhacdooyinka."
          }
        ],

        terms: [],
        exercise: null,

        quiz: [
          {
            q: "Maxay SIEM qabataa?",
            options: [
              "Ururinta iyo falanqaynta logs",
              "Samaynta games",
              "Editing videos",
              "Hosting websites"
            ],
            answer: 0,
            explain: "SIEM wuxuu kaa caawiyaa monitoring iyo investigation."
          }
        ]
      },

      {
        slug: "threat-hunting-report",
        title: "Warbixinta Threat Hunting",
        english: "Threat Hunting Report",
        summary:
          "Qor findings, evidence iyo talooyinka difaaca.",
        minutes: 45,

        sections: [
          {
            h: "Threat Hunting Report",
            p: "Warbixintu waxay sharaxdaa findings, evidence iyo recommendations."
          }
        ],

        terms: [],
        exercise: null,

        quiz: [
          {
            q: "Maxaa lagu daraa threat hunting report?",
            options: [
              "Evidence iyo findings",
              "Sawiro random",
              "Password",
              "Game files"
            ],
            answer: 0,
            explain: "Report-ku wuxuu leeyahay evidence iyo recommendations."
          }
        ]
      }
    ],
  }),
];

export const totalLessons = modules.reduce((n, x) => n + x.lessons, 0);
export const totalHours = modules.reduce((n, x) => n + x.hours, 0);

export function findModule(slug: string) {
  return modules.find((x) => x.slug === slug);
}

export function findLesson(moduleSlug: string, lessonSlug: string) {
  const mod = findModule(moduleSlug);
  const lesson = mod?.lessonList.find((l) => l.slug === lessonSlug);
  if (!mod || !lesson) return null;
  const index = mod.lessonList.indexOf(lesson);
  return {
    mod,
    lesson,
    prev: mod.lessonList[index - 1] ?? null,
    next: mod.lessonList[index + 1] ?? null,
  };
}

export const labs = labCatalog.map((l) => ({
  slug: l.slug,
  title: l.title,
  somali: l.somali,
  level: l.level,
}));

export const careerPaths = [
  { role: "IT Support / Helpdesk", cert: "CompTIA A+ / ITF+", months: 3 },
  { role: "SOC Analyst (Tier 1)", cert: "ISC2 CC → CompTIA Security+", months: 6 },
  { role: "Junior Penetration Tester", cert: "eJPT", months: 9 },
  { role: "Incident Responder", cert: "Blue Team Level 1 / GCIH", months: 12 },
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
    a: "Casharrada waxaad ka akhrin kartaa telefoonka. Labs-ka qaarkood waxay u fiican yihiin laptop, laakiin dhammaan labs-ka platform-ka waxaa lagu qabsan karaa browser-ka.",
  },
  {
    q: "Shaqo ma heli karaa?",
    a: "Waddada SOC Analyst waxay ku diyaarinaysaa ISC2 CC, Security+ iyo xirfado Tier 1 triage, oo ay weheliso portfolio labs iyo warbixinno dhab ah.",
  },
];