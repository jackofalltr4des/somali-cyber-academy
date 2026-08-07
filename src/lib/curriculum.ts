import { labCatalog } from "./labs";
import { ethicalHackingModules } from "./ethical-hacking-curriculum";
import { digitalForensicsModules } from "./digital-forensics-curriculum";
import { cloudSecurityModules } from "./cloud-security-curriculum";
import { toolDeepDiveModules } from "./tool-deep-dives";

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
    slug: "it-computer-fundamentals",
    stage: "Aasaas",
    title: "Aasaaska IT & Kombiyuutarka",
    english: "IT & Computer Fundamentals",
    hours: 2,

    outcome:
      "Waxaad fahmi doontaa hardware, operating systems, filesystems, command line, users, networking iyo logs. Waxaad yeelan doontaa saldhig adag oo SOC Analyst looga baahan yahay.",

    topics: [
      "Computer Hardware",
      "Operating Systems",
      "Filesystems",
      "Networking Basics",
      "Cybersecurity Fundamentals",
      "Virtualization & Cloud",
      "Basic Security Tools",
      "Authentication & Access Control",
      "Security Monitoring & Alerts",
    ],

    lessonList: [

      {
        slug: "computer-hardware-basics",
        title: "Qaybaha Kombiyuutarka & Hardware",
        english: "Computer Hardware Fundamentals",
        minutes: 10,

        summary:
          "Baro sida computer-ku u dhisan yahay, CPU, RAM, storage, firmware iyo boot process.",

        sections: [
          {
            h: "Waa maxay Computer?",
            p:
            "Computer waa nidaam isku daraya hardware iyo software. Hardware waa qaybaha jirka sida CPU, RAM, motherboard iyo storage. Software waa barnaamijyada ku shaqeeya hardware-ka. Cybersecurity analyst waa inuu fahmaa halka xogtu ku jirto iyo sida nidaamku u shaqeeyo."
          },
          {
            h: "CPU - Processor-ka",
            p:
            "CPU (Central Processing Unit) waa qaybta fulisa instructions-ka. Waxay leedahay cores iyo threads kuwaas oo oggolaanaya hawlo badan. SOC analyst wuxuu eegaa CPU usage marka uu baarayo processes shaki leh ama malware."
          },
          {
            h: "RAM iyo Memory",
            p:
            "RAM waa temporary memory lagu hayo xogta programs-ka socda. Marka computer la damiyo xogta RAM way lumaysaa. Digital forensics waxay isticmaashaa memory analysis si loo helo malware, credentials iyo processes qarsoon."
          },
          {
            h: "Storage iyo Data",
            p:
            "SSD iyo HDD waa meelaha xogta joogtada ah lagu kaydiyo. Operating system, applications iyo files waxay ku jiraan storage. Analyst-ku wuxuu baarayaa storage si uu u helo evidence."
          },
          {
            h: "Firmware iyo Boot Process",
            p:
            "BIOS/UEFI firmware ayaa bilaaba computer-ka. Secure Boot wuxuu hubiyaa in software la aamini karo uu bilaabanayo. Weerarrada firmware waxay noqon karaan kuwo adag sababtoo ah waxay ku dhacaan heer hoose."
          }
        ],

        terms: [
          { term: "CPU", def: "Qaybta fulisa instructions-ka computer-ka." },
          { term: "RAM", def: "Memory ku meel gaar ah oo kaydisa xogta shaqada." },
          { term: "SSD", def: "Storage degdeg ah oo xogta joogtada ah lagu hayo." },
          { term: "Firmware", def: "Software hoose oo maamula hardware." },
          { term: "BIOS/UEFI", def: "Firmware bilaaba computer-ka marka la shido." }
        ],

        quiz: [
          {
            q: "CPU shaqadeeda ugu weyn waa?",
            options: ["Kaydinta files", "Fulinta instructions", "Maamulka users", "Sameynta internet"],
            answer: 1,
            explain: "CPU waxay fulisaa amarada software-ka."
          },
          {
            q: "RAM waa noocee memory?",
            options: ["Permanent storage", "Temporary memory", "Network device", "Firewall"],
            answer: 1,
            explain: "RAM waxay hayaa xogta inta computer-ku shaqeynayo."
          },
          {
            q: "SOC analyst wuxuu baarayaa RAM sababtoo ah?",
            options: ["Si loo helo malware iyo evidence", "Si loo beddelo CPU", "Si loo sameeyo website", "Si loo kordhiyo internet"],
            answer: 0,
            explain: "Memory analysis waa qayb muhiim ah oo digital forensics ah."
          },
          {
            q: "Firmware wuxuu ku shaqeeyaa?",
            options: ["Heerka hardware-ka hoose", "Kaliya browser", "Email system", "Cloud storage"],
            answer: 0,
            explain: "Firmware wuxuu isku xiraa hardware iyo software hoose."
          }
        ],

        exercise: {
          title: "Hardware Inventory Lab",
          steps: [
            "Hel CPU model-ka computer-kaaga.",
            "Qor RAM capacity-ga.",
            "Ogow SSD ama HDD.",
            "Hubi BIOS version.",
            "Samee hardware report."
          ],
          deliverable: "Hardware Inventory Report"
        }
      },


      {
        slug: "operating-systems",
        title: "Operating Systems Fundamentals",
        english: "Operating Systems Deep Dive",
        minutes: 12,

        summary:
          "Faham Windows, Linux, kernel, processes, services, boot process iyo sida SOC analysts uga baaran karaan operating systems.",

        sections: [
          {
            h: "Waa maxay Operating System?",
            p:
            "Operating System (OS) waa software-ka maamula xiriirka u dhexeeya hardware iyo applications. OS-ku wuxuu maamulaa CPU, memory, storage, users iyo security controls. Tusaalooyinka ugu waaweyn waa Windows, Linux iyo macOS."
          },
          {
            h: "Kernel iyo User Mode",
            p:
            "Kernel waa qaybta ugu muhiimsan ee operating system-ka. Waxay leedahay awood ay si toos ah ula xiriirto hardware. Applications-ka caadiga ah waxay ku shaqeeyaan user mode si ay uga fogaadaan inay si toos ah u dhaawacaan system-ka."
          },
          {
            h: "Windows Fundamentals",
            p:
            "Windows waa operating system aad looga isticmaalo shirkadaha. SOC analyst waa inuu yaqaan Event Viewer, Registry, Services, Scheduled Tasks, Users, Task Manager iyo Windows Defender si uu u baaro incidents."
          },
          {
            h: "Linux Fundamentals",
            p:
            "Linux waxaa si weyn loogu isticmaalaa servers iyo cybersecurity tools. Analyst-ku waa inuu fahmaa terminal-ka, file structure-ka, permissions, processes iyo services sida systemd."
          },
          {
            h: "Processes iyo Services",
            p:
            "Process waa program hadda socda. Service waa process background ku shaqeeya oo badanaa bilaabma marka system-ka shido. Malware badan waxay isku dayaan inay abuuraan services ama processes qarsoon si ay u sii joogaan system-ka."
          },
          {
            h: "SOC Analyst iyo Operating System Investigation",
            p:
            "Marka alert yimaado, analyst-ku wuxuu eegaa operating system-ka: yaa galay system-ka, maxaa socda, processes kee ayaa cusub, services kee ayaa la beddelay iyo maxay logs sheegayaan."
          }
        ],

        terms: [
          { term: "Operating System", def: "Software maamula hardware iyo applications." },
          { term: "Kernel", def: "Qaybta dhexe ee OS-ka ee la xiriirta hardware." },
          { term: "Process", def: "Program hadda socda." },
          { term: "Service", def: "Program background ku shaqeeya." },
          { term: "Registry", def: "Database-ka Windows oo kaydiya configuration." }
        ],

        quiz: [
          {
            q: "Shaqada ugu weyn ee Operating System waa?",
            options: ["Inuu maamulo hardware iyo software", "Inuu sameeyo internet", "Inuu beddelo CPU", "Inuu noqdo antivirus"],
            answer: 0,
            explain: "OS wuxuu isku xiraa hardware, applications iyo users."
          },
          {
            q: "Kernel waa maxay?",
            options: ["Browser", "Qaybta dhexe ee OS-ka", "Storage device", "Password manager"],
            answer: 1,
            explain: "Kernel waa qaybta ugu muhiimsan ee OS."
          },
          {
            q: "SOC analyst wuxuu baarayaa processes sababtoo ah?",
            options: ["Si loo ogaado activity shaki leh", "Si loo kordhiyo RAM", "Si loo sameeyo games", "Si loo beddelo motherboard"],
            answer: 0,
            explain: "Processes aan caadi ahayn waxay noqon karaan malware."
          },
          {
            q: "Windows tool kee ayaa lagu arkaa system events?",
            options: ["Paint", "Event Viewer", "Calculator", "Notepad"],
            answer: 1,
            explain: "Event Viewer wuxuu muujinayaa Windows logs."
          },
          {
            q: "Linux waxaa badanaa loo isticmaalaa?",
            options: ["Servers iyo cybersecurity tools", "Kaliya games", "Kaliya phones", "Kaliya printers"],
            answer: 0,
            explain: "Linux waa muhiim servers iyo security environments."
          }
        ],

        exercise: {
          title: "Operating System Investigation Lab",
          steps: [
            "Fur Task Manager ama Linux terminal.",
            "Qor 10 processes socda.",
            "Aqoonso services muhiim ah.",
            "Hubi user accounts.",
            "Qor waxyaabaha aan caadiga ahayn."
          ],
          deliverable: "Operating System Investigation Report"
        }
      },


      {
        slug: "files-filesystems",
        title: "Files & File Systems",
        english: "Filesystems, Storage and Permissions",
        minutes: 13,

        summary:
          "Baro sida files loo kaydiyo, NTFS, Linux filesystem, permissions, metadata iyo sababta ay muhiim ugu yihiin cybersecurity.",

        sections: [
          {
            h: "Waa maxay File?",
            p:
            "File waa ururin xog ah oo lagu kaydiyo storage. Files waxay leeyihiin magac, extension, size, timestamps iyo permissions. Analyst-ku wuxuu isticmaalaa metadata si uu u fahmo waxa dhacay."
          },
          {
            h: "File Systems",
            p:
            "Operating systems waxay isticmaalaan file systems si ay u habeeyaan xogta. Windows badanaa wuxuu isticmaalaa NTFS halka Linux isticmaalo EXT4 iyo file systems kale."
          },
          {
            h: "Windows NTFS",
            p:
            "NTFS wuxuu taageeraa permissions, encryption, file metadata iyo journaling. SOC analyst wuxuu baarayaa NTFS artifacts sida timestamps, deleted files iyo user activity."
          },
          {
            h: "Linux File Structure",
            p:
            "Linux wuxuu leeyahay structure gaar ah. /etc waxaa ku jira configuration, /var/log waxaa ku jira logs, /home waxaa ku jira users files, /tmp waxaa lagu kaydiyaa temporary files."
          },
          {
            h: "Permissions iyo Security",
            p:
            "Permissions waxay go'aamiyaan cidda akhrin karta, qori karta ama fulin karta file. Permissions khaldan waxay keeni karaan privilege escalation."
          },
          {
            h: "File Metadata iyo Investigation",
            p:
            "Metadata sida creation time, modification time iyo access time waxay caawiyaan analyst-ka marka uu sameynayo timeline incident."
          }
        ],

        terms: [
          { term: "NTFS", def: "Windows file system." },
          { term: "EXT4", def: "Linux file system." },
          { term: "Metadata", def: "Xog sharaxaysa file sida waqtiga iyo size." },
          { term: "Permission", def: "Xeerka qeexaya cidda file isticmaali karta." },
          { term: "Privilege Escalation", def: "Helitaanka awood ka badan tii loo oggolaaday." }
        ],

        quiz: [
          {
            q: "NTFS waxaa isticmaala?",
            options: ["Windows", "Linux kaliya", "Android", "Router"],
            answer: 0,
            explain: "NTFS waa Windows file system."
          },
          {
            q: "/var/log Linux waxaa laga helaa?",
            options: ["Games", "Logs", "Photos", "Passwords"],
            answer: 1,
            explain: "Linux logs badankood waxay ku jiraan /var/log."
          },
          {
            q: "Permission khaldan wuxuu keeni karaa?",
            options: ["Privilege escalation", "CPU cusub", "Internet degdeg ah", "Battery cusub"],
            answer: 0,
            explain: "Attackers waxay isticmaali karaan permissions khaldan."
          },
          {
            q: "Metadata maxay caawisaa analyst-ka?",
            options: ["Fahamka file history iyo timeline", "Kordhinta RAM", "Sameynta password", "Beddelka OS"],
            answer: 0,
            explain: "Metadata waxay bixisaa evidence."
          }
        ],

        exercise: {
          title: "Filesystem Investigation Lab",
          steps: [
            "Raadi files cusub oo la sameeyay.",
            "Hubi hidden files.",
            "Eeg permissions.",
            "Raadi suspicious files.",
            "Samee investigation notes."
          ],
          deliverable: "Filesystem Investigation Report"
        }
      },


      {
        slug: "networking-basics",
        title: "Aasaaska Networking",
        english: "Networking Fundamentals",
        minutes: 15,

        summary:
          "Baro sida computers-ku u wada xiriiraan, IP addresses, ports, protocols iyo sababta networking muhiim ugu yahay cybersecurity.",

        sections: [
          {
            h: "Waa maxay Network?",
            p:
            "Network waa isku xirka laba ama in ka badan oo devices ah si ay xog u wadaagaan. Internet-ka laftiisu waa network aad u weyn oo isku xira malaayiin computers. SOC analyst waa inuu fahmaa sida traffic-ku u socdo si uu u ogaado dhaqdhaqaaq aan caadi ahayn."
          },
          {
            h: "IP Address iyo MAC Address",
            p:
            "IP address waa cinwaanka logical-ka ee device-ka network-ka ku jira. MAC address waa aqoonsiga hardware-ka network interface-ka. Marka baaritaan dhacdo, analyst-ku wuxuu isticmaalaa IP addresses si uu u raadiyo meesha traffic-ku ka yimid."
          },
          {
            h: "Protocols iyo Ports",
            p:
            "Protocols waa xeerarka ay devices isticmaalaan si ay u wada xiriiraan. HTTP/HTTPS waxaa loo isticmaalaa websites, DNS wuxuu turjumaa domain names una beddelaa IP addresses, SSH wuxuu bixiya remote access. Ports waxay tilmaamaan adeegga la isticmaalayo."
          },
          {
            h: "Security Connection",
            p:
            "Attackers waxay isticmaalaan networking si ay u galaan systems, u diraan malware ama u xadaan xog. SOC analyst wuxuu baarayaa suspicious IPs, open ports iyo network connections."
          }
        ],

        terms: [
          { term: "IP Address", def: "Cinwaan lagu aqoonsado device network ku jira." },
          { term: "Protocol", def: "Xeerarka lagu hago isgaarsiinta network." },
          { term: "Port", def: "Lambar tilmaamaya adeeg network isticmaala." },
          { term: "DNS", def: "System magaca domain-ka ugu beddela IP address." }
        ],

        quiz: [
          {
            q: "IP address maxay tahay?",
            options: ["Password user", "Cinwaan device network ku jira", "Nooca CPU", "File system"],
            answer: 1,
            explain: "IP address wuxuu aqoonsadaa device-ka network-ka."
          },
          {
            q: "DNS maxay qabataa?",
            options: ["Waxay kaydisaa passwords", "Waxay beddeshaa RAM", "Waxay domain u beddeshaa IP address", "Waxay sameysaa firewall"],
            answer: 2,
            explain: "DNS wuxuu isku xiraa magacyada websites iyo IP addresses."
          },
          {
            q: "SOC analyst sababtee ugu baahan yahay networking?",
            options: ["Si uu u ogaado suspicious traffic", "Si uu u sameeyo graphics", "Si uu u beddelo hardware", "Si uu u qoro documents"],
            answer: 0,
            explain: "Network analysis waa qayb muhiim ah oo incident investigation ah."
          }
        ],

        exercise: {
          title: "Network Discovery Exercise",
          steps: [
            "Hubi IP address-ka computer-kaaga adigoo isticmaalaya ipconfig ama ifconfig.",
            "Qor gateway-gaaga.",
            "Ogow 3 ports oo caan ah iyo adeegyada isticmaala.",
            "Sharax sida attacker u isticmaali karo network knowledge."
          ],
          deliverable: "Basic network investigation report."
        }
      },


      {
        slug: "cybersecurity-basics",
        title: "Aasaaska Cybersecurity",
        english: "Cybersecurity Fundamentals",
        minutes: 11,

        summary:
          "Faham fikradaha ugu muhiimsan cybersecurity sida CIA Triad, threats, vulnerabilities iyo risk.",

        sections: [
          {
            h: "CIA Triad",
            p:
            "CIA Triad waa saddexda tiir ee cybersecurity: Confidentiality (sirta xogta), Integrity (xog aan la beddelin), Availability (xog iyo adeeg la heli karo). Analyst kasta waa inuu fahmaa saddexdan."
          },
          {
            h: "Threat, Vulnerability iyo Risk",
            p:
            "Threat waa wax keeni kara dhaawac sida attacker ama malware. Vulnerability waa meel daciif ah oo la isticmaali karo. Risk waa isku darka fursadda iyo saameynta dhibaatada."
          },
          {
            h: "Defense Mindset",
            p:
            "Cybersecurity ma aha kaliya tools. Waa fahamka sida attackers u fikiraan, sida systems loo ilaaliyo iyo sida loo baaro marka wax dhacaan."
          },
          {
            h: "SOC Analyst Role",
            p:
            "SOC analyst wuxuu la socdaa alerts, baarayaa suspicious activity, ururinayaa evidence wuxuuna caawiyaa yareynta khatarta."
          }
        ],

        terms: [
          { term: "Confidentiality", def: "Ilaalinta xogta si aan cid aan loo oggolaan u arkin." },
          { term: "Integrity", def: "Xogta oo sax ah oo aan la beddelin." },
          { term: "Availability", def: "Adeegyada iyo xogta oo la heli karo marka loo baahan yahay." },
          { term: "Vulnerability", def: "Daciifnimo nidaam ku jirta." }
        ],

        quiz: [
          {
            q: "CIA Triad maxay ka kooban tahay?",
            options: ["CPU, Internet, Application", "Confidentiality, Integrity, Availability", "Cloud, Identity, Access", "Computer, Information, Account"],
            answer: 1,
            explain: "CIA Triad waa aasaaska cybersecurity."
          },
          {
            q: "Vulnerability waa maxay?",
            options: ["Daciifnimo la isticmaali karo", "Firewall", "Password adag", "Backup"],
            answer: 0,
            explain: "Attackers waxay ka faa'iidaystaan vulnerabilities."
          },
          {
            q: "SOC analyst shaqadiisa ugu weyn waa?",
            options: ["Baaritaan iyo monitoring threats", "Samaynta computers", "Naqshadaynta websites", "Iibinta software"],
            answer: 0,
            explain: "SOC analyst wuxuu diiradda saaraa ogaanshaha iyo jawaabta threats."
          }
        ],

        exercise: {
          title: "Risk Analysis Practice",
          steps: [
            "Dooro hal system (computer, email ama website).",
            "Qor 3 threats.",
            "Qor 3 vulnerabilities.",
            "Qiimee risk-ka ugu weyn."
          ],
          deliverable: "Cybersecurity risk assessment."
        }
      },


      {
        slug: "virtualization-cloud-basics",
        title: "Virtualization iyo Cloud Aasaas",
        english: "Virtualization & Cloud Fundamentals",
        minutes: 14,

        summary:
          "Baro virtual machines, cloud services iyo sababta ay muhiim ugu yihiin cybersecurity.",

        sections: [
          {
            h: "Waa maxay Virtualization?",
            p:
            "Virtualization waxay ogolaataa hal physical computer inuu sameeyo computers badan oo virtual ah. Virtual machine wuxuu leeyahay operating system, storage iyo network u gaar ah."
          },
          {
            h: "Cloud Computing",
            p:
            "Cloud wuxuu bixiya resources sida servers, storage iyo databases iyadoo aan shirkaddu iibsan hardware badan. Tusaalooyinka waxaa ka mid ah AWS, Azure iyo Google Cloud."
          },
          {
            h: "Security Challenges",
            p:
            "Cloud-ka wuxuu leeyahay khataro sida misconfigured permissions, exposed storage iyo account compromise. SOC analyst waa inuu fahmaa logs iyo access controls cloud."
          }
        ],

        terms: [
          { term: "Virtual Machine", def: "Computer software ahaan loo sameeyay oo ku shaqeeya hardware kale." },
          { term: "Cloud", def: "Adeegyo IT oo internet-ka laga helo." },
          { term: "Hypervisor", def: "Software maamula virtual machines." }
        ],

        quiz: [
          {
            q: "Virtual machine waa maxay?",
            options: ["Computer software ahaan u shaqeeya", "Password", "Firewall", "Network cable"],
            answer: 0,
            explain: "VM waa system virtual ah oo ku shaqeeya physical hardware."
          },
          {
            q: "Mid ka mid ah cloud security risks waa?",
            options: ["Misconfigured permissions", "Keyboard jaban", "Screen brightness", "Mouse"],
            answer: 0,
            explain: "Permissions khaldan waxay keeni karaan data exposure."
          },
          {
            q: "SOC analyst cloud-ka wuxuu baarayaa?",
            options: ["Logs iyo access activity", "Midabka website-ka", "Battery", "Printer"],
            answer: 0,
            explain: "Cloud logs waxay muhiim u yihiin detection."
          }
        ],

        exercise: {
          title: "Virtualization Research",
          steps: [
            "Samee liis 3 cloud providers.",
            "Sharax waxa VM tahay.",
            "Qor 3 cloud security risks."
          ],
          deliverable: "Cloud security notes."
        }
      },


      {
        slug: "basic-security-tools",
        title: "Qalabka Aasaasiga ah ee Security",
        english: "Basic Cybersecurity Tools",
        minutes: 12,

        summary:
          "Baro tools-ka aasaasiga ah ee cybersecurity analyst isticmaalo sida antivirus, firewall, Wireshark iyo vulnerability scanners.",

        sections: [
          {
            h: "Security Tools Maxay Tahay?",
            p:
            "Cybersecurity tools waa software caawiya ilaalinta, monitoring-ka iyo baaritaanka systems. Tool ma beddelo analyst-ka — analyst-ka ayaa fahma xogta tool-ku soo saaro."
          },
          {
            h: "Firewall iyo Antivirus",
            p:
            "Firewall wuxuu xakameeyaa network traffic-ka soo galaya iyo baxaya iyadoo lagu salaynayo rules. Antivirus wuxuu raadiyaa malware isagoo isticmaalaya signatures iyo behavioral detection."
          },
          {
            h: "Wireshark iyo Network Analysis",
            p:
            "Wireshark waa packet analyzer loo isticmaalo in lagu arko traffic network. SOC analyst wuxuu isticmaali karaa si uu u baaro connections shaki leh, protocols iyo communication-ka u dhexeeya systems."
          },
          {
            h: "Vulnerability Scanners",
            p:
            "Tools sida vulnerability scanners waxay raadiyaan daciifnimooyin systems-ka ku jira. Natiijooyinka waa in analyst-ku fahmaa oo qiimeeyaa, ma aha inuu si indho la'aan ah u aamino."
          }
        ],

        terms: [
          { term: "Firewall", def: "Qalab xakameeya network traffic iyadoo la adeegsanayo rules." },
          { term: "Antivirus", def: "Software ogaada oo ka hortaga malware." },
          { term: "Packet", def: "Qayb yar oo xog network lagu diro." },
          { term: "Vulnerability Scanner", def: "Tool raadiya daciifnimooyin security." }
        ],

        quiz: [
          {
            q: "Firewall shaqadiisa waa?",
            options: ["Xakamaynta network traffic", "Kaydinta files", "Samaynta passwords", "Beddelidda CPU"],
            answer: 0,
            explain: "Firewall wuxuu go'aamiyaa traffic la oggol yahay iyo mid la diiday."
          },
          {
            q: "Wireshark waxaa loo isticmaalaa?",
            options: ["Network packet analysis", "Video editing", "File compression", "Operating system installation"],
            answer: 0,
            explain: "Wireshark wuxuu qabtaa packet capture iyo analysis."
          },
          {
            q: "Tool natiijo keeno analyst-ku waa inuu?",
            options: ["Fahmo oo xaqiijiyo natiijada", "Si toos ah u aamino", "Tirtiraa system-ka", "Iska indho tiro"],
            answer: 0,
            explain: "Tools waxay bixiyaan xog, analyst-kuna wuxuu sameeyaa go'aan."
          }
        ],

        exercise: {
          title: "Security Tool Familiarization",
          steps: [
            "Baro waxa firewall sameeyo.",
            "Fur Wireshark oo eeg sample traffic.",
            "Qor 5 security tools iyo shaqadooda.",
            "Sharax tool kasta sida SOC analyst u isticmaali karo."
          ],
          deliverable: "Security tools reference sheet."
        }
      },


      {
        slug: "authentication-access-control",
        title: "Authentication iyo Access Control",
        english: "Authentication & Access Control Fundamentals",
        minutes: 10,

        summary:
          "Faham sida users loo xaqiijiyo, loo oggolaado iyo sida access loo ilaaliyo.",

        sections: [
          {
            h: "Authentication",
            p:
            "Authentication waa habka lagu xaqiijiyo qofka ama device-ka isku dayaya inuu galo system. Tusaalooyinka waxaa ka mid ah passwords, biometrics iyo multi-factor authentication."
          },
          {
            h: "Authorization",
            p:
            "Authorization waxay go'aamisaa waxa user-ka xaq loo siiyay inuu sameeyo kadib marka la xaqiijiyo. Tusaale: user caadi ah ma laha awood uu ku beddelo system settings."
          },
          {
            h: "Principle of Least Privilege",
            p:
            "Least privilege wuxuu sheegayaa in user ama application la siiyo kaliya awoodda uu u baahan yahay. Tani waxay yareysaa dhaawaca haddii account la jebiyo."
          },
          {
            h: "SOC Investigation",
            p:
            "SOC analyst wuxuu baarayaa login attempts, failed authentications, suspicious locations iyo privilege changes si uu u ogaado account compromise."
          }
        ],

        terms: [
          { term: "Authentication", def: "Xaqiijinta aqoonsiga user ama device." },
          { term: "Authorization", def: "Go'aaminta awoodda user-ka." },
          { term: "MFA", def: "Multi-Factor Authentication — xaqiijin ka badan hal hab." },
          { term: "Least Privilege", def: "Siinta user-ka awoodda ugu yar ee uu u baahan yahay." }
        ],

        quiz: [
          {
            q: "Authentication maxay qabataa?",
            options: ["Waxay xaqiijisaa aqoonsiga", "Waxay sameysaa backup", "Waxay kordhisaa RAM", "Waxay beddeshaa IP"],
            answer: 0,
            explain: "Authentication waxay xaqiijisaa qofka ama device-ka."
          },
          {
            q: "Least privilege sababta loo isticmaalo waa?",
            options: ["In la yareeyo khatarta haddii account la jebiyo", "In user walba admin noqdo", "In password la tirtiro", "In network la joojiyo"],
            answer: 0,
            explain: "Awood yar waxay yaraynaysaa saameynta breach."
          },
          {
            q: "SOC analyst wuxuu baarayaa failed logins sababtoo ah?",
            options: ["Waxay muujin karaan brute force ama account attack", "Waxay beddelaan hardware", "Waxay hagaajiyaan screen", "Waxay sameeyaan software"],
            answer: 0,
            explain: "Failed authentication patterns waxay muujin karaan weerar."
          }
        ],

        exercise: {
          title: "Account Security Review",
          steps: [
            "Samee tusaale 5 users ah.",
            "Kala saar admin iyo standard users.",
            "Qor cid kasta permissions-keeda.",
            "Soo jeedi hagaajin security."
          ],
          deliverable: "Access control review."
        }
      },


      {
        slug: "security-monitoring-basics",
        title: "Security Monitoring iyo Alerts",
        english: "Security Monitoring Fundamentals",
        minutes: 13,

        summary:
          "Baro sida SOC analyst u isticmaalo monitoring, alerts iyo events si uu u ogaado threats.",

        sections: [
          {
            h: "Security Monitoring",
            p:
            "Monitoring waa la socodka joogtada ah ee systems, networks iyo applications si loo ogaado dhaqdhaqaaq aan caadi ahayn."
          },
          {
            h: "Alerts iyo Events",
            p:
            "Event waa dhacdo la diiwaangeliyay. Alert waa digniin kasoo baxda marka system-ku arko activity u baahan baaritaan."
          },
          {
            h: "False Positive iyo False Negative",
            p:
            "False positive waa alert u muuqda khatar laakiin aan khatar ahayn. False negative waa threat dhab ah oo aan la ogaan."
          },
          {
            h: "SOC Workflow",
            p:
            "SOC analyst wuxuu helaa alert, wuxuu sameeyaa triage, ururiyaa evidence, qiimeeyaa saameynta kadibna go'aamiyaa tallaabada xigta."
          }
        ],

        terms: [
          { term: "Alert", def: "Digniin muujinaysa activity u baahan baaritaan." },
          { term: "Event", def: "Dhacdo lagu diiwaangeliyay system." },
          { term: "False Positive", def: "Alert khaldan oo aan ahayn threat dhab ah." },
          { term: "Triage", def: "Qiimeynta iyo kala hormarinta alerts." }
        ],

        quiz: [
          {
            q: "Farqiga event iyo alert waa?",
            options: ["Event waa dhacdo, alert waa digniin baaritaan u baahan", "Isku mid", "Alert waa hardware", "Event waa password"],
            answer: 0,
            explain: "Events waa records, alerts waa notifications."
          },
          {
            q: "False positive waa?",
            options: ["Alert aan threat dhab ah ahayn", "Weerar guuleystay", "Backup", "Password"],
            answer: 0,
            explain: "False positive wuxuu keenaa alert laakiin khatar ma jirto."
          },
          {
            q: "Tallaabada koowaad marka SOC analyst helo alert waa?",
            options: ["Triage iyo baaritaan", "Dami internet-ka mar walba", "Tirtir computer-ka", "Iska dhaaf"],
            answer: 0,
            explain: "Analyst-ku marka hore wuxuu qiimeeyaa alert-ka."
          }
        ],

        exercise: {
          title: "SOC Alert Investigation",
          steps: [
            "Qaado sample alert.",
            "Qor waxa dhacay.",
            "Kala saar true positive ama false positive.",
            "Samee analyst notes."
          ],
          deliverable: "SOC alert investigation report."
        }
      },

    ],
  }),
  m({
    id: "m2",
    slug: "networking-security-fundamentals",
    stage: "Dhexe",
    title: "Networking & Security Fundamentals",
    english: "Networking and Security Fundamentals",
    hours: 2,

    outcome:
      "Waxaad fahmi doontaa sida networks u shaqeeyaan, TCP/IP, OSI model, IP addressing, ports, DNS, HTTP/HTTPS, firewalls, packet analysis iyo sida SOC Analyst uu u baaro network threats.",

    topics: [
      "TCP/IP",
      "OSI Model",
      "IP Addressing & Subnetting",
      "Ports & Protocols",
      "DNS Security",
      "HTTP/HTTPS & Web Security",
      "Firewalls",
      "Wireshark & Packet Analysis",
      "Network Monitoring & Threat Detection",
    ],

    lessonList: [

      {
        slug: "tcp-ip-networking",
        title: "TCP/IP iyo Networking Deep Dive",
        english: "TCP/IP Networking Fundamentals",
        minutes: 10,

        summary:
          "Baro sida computers-ku u wada xiriiraan adigoo fahmaya TCP/IP model, packets iyo network communication.",

        sections: [
          {
            h: "Waa maxay Network Communication?",
            p:
            "Network communication waa habka devices ay xog isku dhaafsadaan. Xogta waxaa loo kala diraa packets kuwaas oo mara networks kala duwan ilaa ay gaaraan destination-kooda."
          },
          {
            h: "TCP/IP Model",
            p:
            "TCP/IP waa model-ka ugu badan ee internet-ka isticmaalo. Wuxuu ka kooban yahay layers maamula sida data loo diyaariyo, loo diro iyo loo helo."
          },
          {
            h: "Packets iyo Data Transfer",
            p:
            "Marka xog la diro, waxaa loo kala jaraa packets. Packet kasta wuxuu leeyahay information sida source IP, destination IP iyo protocol."
          },
          {
            h: "SOC Analyst Connection",
            p:
            "SOC analyst wuxuu baarayaa network traffic si uu u ogaado connections aan caadi ahayn, malware communication iyo data exfiltration."
          }
        ],

        terms: [
          { term: "Packet", def: "Qayb yar oo xog ah oo network lagu diro." },
          { term: "TCP", def: "Protocol hubiya in xog si sax ah loo gaarsiiyo." },
          { term: "IP", def: "Protocol masuul ka ah addressing iyo routing." },
          { term: "Network Traffic", def: "Xogta dhex marta network." }
        ],

        quiz: [
          {
            q: "Internet-ka wuxuu inta badan isticmaalaa model kee?",
            options: ["TCP/IP", "HTML", "CPU", "BIOS"],
            answer: 0,
            explain: "TCP/IP waa aasaaska communication-ka internet-ka."
          },
          {
            q: "Packet waa maxay?",
            options: ["Qayb xog ah oo network lagu diro", "Password", "Firewall", "Operating system"],
            answer: 0,
            explain: "Data waxaa loo kala diraa packets."
          },
          {
            q: "SOC analyst wuxuu baarayaa network traffic sababtoo ah?",
            options: [
              "Si uu u ogaado threats iyo suspicious activity",
              "Si uu u beddelo CPU",
              "Si uu u sameeyo games",
              "Si uu u kordhiyo RAM"
            ],
            answer: 0,
            explain: "Traffic analysis waa qayb muhiim ah oo SOC investigation ah."
          }
        ],

        exercise: {
          title: "Network Traffic Analysis",
          steps: [
            "Baro IP address-ka computer-kaaga.",
            "Aqoonso TCP iyo UDP.",
            "Qor 5 network protocols.",
            "Sharax sida attacker u isticmaali karo network."
          ],
          deliverable: "Basic network analysis report."
        }
      },


      {
        slug: "osi-model-networking",
        title: "OSI Model iyo Network Communication",
        english: "OSI Model Fundamentals",
        minutes: 12,

        summary:
          "Baro 7-da layers ee OSI model iyo sida data ugu socoto network-ka.",

        sections: [
          {
            h: "Waa maxay OSI Model?",
            p:
            "OSI Model waa framework sharaxaya sida computers-ku u wada xiriiraan. Waxay u kala qaybisaa communication-ka 7 layers si ay u fududeyso fahamka iyo troubleshooting-ka."
          },
          {
            h: "7 Layers ee OSI",
            p:
            "Layers-ka OSI waa Physical, Data Link, Network, Transport, Session, Presentation iyo Application. Layer kasta wuxuu leeyahay shaqo gaar ah."
          },
          {
            h: "Network Layer iyo Transport Layer",
            p:
            "Network Layer wuxuu maamulaa addressing iyo routing isagoo isticmaala IP. Transport Layer wuxuu maamulaa communication-ka TCP iyo UDP."
          },
          {
            h: "SOC Analyst iyo OSI",
            p:
            "SOC analyst wuxuu isticmaalaa OSI model si uu u fahmo meesha dhibaatadu ka jirto. Tusaale ahaan packet aan caadi ahayn waxaa lagu baarayaa layers kala duwan."
          }
        ],

        terms: [
          { term: "OSI Model", def: "Qaab 7 layers ah oo sharaxa network communication." },
          { term: "Layer", def: "Qayb ka mid ah OSI model oo leh shaqo gaar ah." },
          { term: "Routing", def: "Habka packets loogu diro destination sax ah." },
          { term: "Transport Layer", def: "Layer maamula TCP iyo UDP communication." }
        ],

        quiz: [
          {
            q: "OSI Model imisa layers ayuu leeyahay?",
            options: ["5", "7", "10", "3"],
            answer: 1,
            explain: "OSI Model wuxuu leeyahay 7 layers."
          },
          {
            q: "Layer kee ayaa isticmaala IP addressing?",
            options: ["Network Layer", "Physical Layer", "Application Layer", "Presentation Layer"],
            answer: 0,
            explain: "Network Layer wuxuu qabtaa addressing iyo routing."
          },
          {
            q: "TCP iyo UDP waxay ku jiraan layer kee?",
            options: ["Transport Layer", "Physical Layer", "Data Link Layer", "Application Layer"],
            answer: 0,
            explain: "TCP iyo UDP waa Transport Layer protocols."
          },
          {
            q: "SOC analyst sababtee u isticmaalaa OSI model?",
            options: [
              "Si uu u fahmo halka dhibaatada network ka jirto",
              "Si uu u beddelo hardware",
              "Si uu u sameeyo passwords",
              "Si uu u rakibo games"
            ],
            answer: 0,
            explain: "OSI model wuxuu caawiyaa troubleshooting iyo investigation."
          }
        ],

        exercise: {
          title: "OSI Model Practice",
          steps: [
            "Qor 7-da OSI layers.",
            "Ku qor protocol kasta layer-kiisa.",
            "Sharax halka IP iyo TCP ka shaqeeyaan.",
            "Samee network troubleshooting example."
          ],
          deliverable: "OSI model study report."
        }
      },


      {
        slug: "ip-addressing-subnetting",
        title: "IP Addressing iyo Subnetting",
        english: "IP Addressing and Subnetting Fundamentals",
        minutes: 13,

        summary:
          "Baro IPv4, IPv6, subnetting, private iyo public IP addresses iyo sida SOC analyst u isticmaalo IP information baaritaanka.",

        sections: [
          {
            h: "Waa maxay IP Address?",
            p:
            "IP address waa aqoonsi loo siiyo device ku jira network. Wuxuu u oggolaanayaa computers inay is helaan oo ay xog is dhaafsadaan. SOC analyst wuxuu isticmaalaa IP addresses si uu u raadiyo halka traffic ka yimid."
          },
          {
            h: "IPv4 iyo IPv6",
            p:
            "IPv4 waa nooca IP ee ugu badan ee la isticmaalo wuxuuna leeyahay 32-bit address sida 192.168.1.10. IPv6 waa nooc cusub oo leh addresses badan si loo daboolo baahida internet-ka sii koraya."
          },
          {
            h: "Private iyo Public IP Addresses",
            p:
            "Private IP waxaa loo isticmaalaa gudaha network-ka sida guryaha iyo shirkadaha. Public IP waa cinwaanka internet-ka lagu arko. Router-ka badanaa wuxuu isku xiraa labada dhinac."
          },
          {
            h: "Subnetting",
            p:
            "Subnetting waa habka network weyn loogu qaybiyo networks yaryar. Waxay caawisaa maamulka, security iyo kala saaridda systems. SOC analyst wuxuu fahmaa subnet si uu u ogaado halka device ku yaal."
          },
          {
            h: "SOC Analyst Connection",
            p:
            "Marka la baarayo incident, analyst wuxuu eegaa source IP, destination IP, subnet iyo network range si uu u fahmo communication-ka dhacay."
          }
        ],

        terms: [
          { term: "IPv4", def: "Nooca IP address ee isticmaala 32-bit." },
          { term: "IPv6", def: "Nooca cusub ee IP address leh space aad u weyn." },
          { term: "Private IP", def: "IP gudaha network-ka lagu isticmaalo." },
          { term: "Public IP", def: "IP internet-ka laga arko." },
          { term: "Subnet", def: "Qayb yar oo laga sameeyo network weyn." }
        ],

        quiz: [
          {
            q: "IP address maxay qabataa?",
            options: [
              "Waxay aqoonsataa device network ku jira",
              "Waxay kaydisaa passwords",
              "Waxay beddeshaa CPU",
              "Waxay noqotaa firewall"
            ],
            answer: 0,
            explain: "IP address wuxuu aqoonsadaa device-ka si uu network ula xiriiro."
          },
          {
            q: "IPv4 wuxuu leeyahay imisa bits?",
            options: ["16", "32", "64", "128"],
            answer: 1,
            explain: "IPv4 waa 32-bit addressing system."
          },
          {
            q: "Private IP waxaa badanaa loo isticmaalaa?",
            options: ["Gudaha network-ka", "Internet-ka oo dhan", "Kaliya websites", "Kaliya servers cloud"],
            answer: 0,
            explain: "Private IP waxaa loo isticmaalaa gudaha LAN networks."
          },
          {
            q: "SOC analyst wuxuu eegaa source IP sababtoo ah?",
            options: [
              "Si uu u ogaado meesha traffic ka yimid",
              "Si uu u kordhiyo RAM",
              "Si uu u sameeyo user",
              "Si uu u rakibo OS"
            ],
            answer: 0,
            explain: "Source IP wuxuu caawiyaa raadinta asalka connection-ka."
          }
        ],

        exercise: {
          title: "IP Address Investigation",
          steps: [
            "Hel IP address-ka computer-kaaga.",
            "Kala saar private iyo public IP.",
            "Baro subnet-ka network-kaaga.",
            "Qor sida attacker IP loo baaro."
          ],
          deliverable: "IP addressing investigation report."
        }
      },


      {
        slug: "ports-protocols",
        title: "Ports iyo Network Protocols",
        english: "Ports and Network Protocol Fundamentals",
        minutes: 15,

        summary:
          "Baro ports, common protocols, TCP, UDP iyo sida SOC analyst u isticmaalo protocol analysis marka uu baarayo network activity.",

        sections: [
          {
            h: "Waa maxay Port?",
            p:
            "Port waa lambar loo isticmaalo in lagu aqoonsado adeeg ama application ku shaqeynaya network. Device kasta wuxuu yeelan karaa services badan oo ports kala duwan isticmaala."
          },
          {
            h: "TCP iyo UDP",
            p:
            "TCP waa protocol hubiya in data si sax ah oo nidaamsan loo gaarsiiyo. UDP waa ka dhaqso badan yahay laakiin ma hubiyo delivery. Labadaba waxaa loo isticmaalaa xaalado kala duwan."
          },
          {
            h: "Common Network Ports",
            p:
            "Port 80 waxaa isticmaala HTTP, port 443 HTTPS, port 22 SSH, port 53 DNS, iyo port 3389 Remote Desktop Protocol. SOC analyst waa inuu yaqaan ports-ka caanka ah si uu u ogaado activity aan caadi ahayn."
          },
          {
            h: "Suspicious Port Activity",
            p:
            "Attackers mararka qaar waxay isticmaalaan ports si ay u helaan remote access ama u diraan malware communication. Analyst-ku wuxuu baarayaa ports furan iyo connections socda."
          },
          {
            h: "SOC Analyst Connection",
            p:
            "Marka alert yimaado, analyst wuxuu eegaa source IP, destination IP, port iyo protocol si uu u fahmo waxa dhacay."
          }
        ],

        terms: [
          { term: "Port", def: "Lambar tilmaamaya adeeg network isticmaala." },
          { term: "TCP", def: "Protocol hubiya delivery sax ah oo data ah." },
          { term: "UDP", def: "Protocol degdeg ah oo aan hubin delivery." },
          { term: "SSH", def: "Protocol remote access oo ammaan ah." },
          { term: "DNS", def: "Protocol domain names u beddela IP addresses." }
        ],

        quiz: [
          {
            q: "Port maxaa loo isticmaalaa?",
            options: ["In lagu aqoonsado adeeg network", "In lagu kaydiyo files", "In lagu kordhiyo RAM", "In lagu beddelo CPU"],
            answer: 0,
            explain: "Ports waxay tilmaamaan services-ka network isticmaala."
          },
          {
            q: "HTTPS badanaa isticmaalaa port kee?",
            options: ["22", "53", "443", "3389"],
            answer: 2,
            explain: "HTTPS wuxuu isticmaalaa port 443."
          },
          {
            q: "Farqiga TCP iyo UDP waa?",
            options: [
              "TCP hubiyaa delivery, UDP waa ka fudud oo degdeg badan",
              "Labadu isku mid bay yihiin",
              "UDP waa storage",
              "TCP waa firewall"
            ],
            answer: 0,
            explain: "TCP wuxuu diiradda saaraa reliability, UDP speed."
          },
          {
            q: "SOC analyst wuxuu baarayaa ports sababtoo ah?",
            options: [
              "Si uu u ogaado suspicious services iyo connections",
              "Si uu u sameeyo graphics",
              "Si uu u beddelo hardware",
              "Si uu u rakibo games"
            ],
            answer: 0,
            explain: "Port analysis wuxuu caawiyaa detection-ka threats."
          }
        ],

        exercise: {
          title: "Port Analysis Lab",
          steps: [
            "Baro 10 common ports.",
            "Hubi ports furan computer-kaaga.",
            "Aqoonso adeeg kasta oo isticmaala port.",
            "Qor ports laga yaabo inay khatar yihiin."
          ],
          deliverable: "Network port analysis report."
        }
      },


      {
        slug: "dns-security",
        title: "DNS iyo Domain Security",
        english: "DNS Security Fundamentals",
        minutes: 11,

        summary:
          "Baro sida DNS u shaqeeyo, DNS records, DNS attacks iyo sida SOC analyst u baaro DNS traffic si uu u ogaado domains shaki leh.",

        sections: [
          {
            h: "Waa maxay DNS?",
            p:
            "DNS (Domain Name System) waa nidaam u beddela magacyada websites sida google.com IP addresses. Computer-ku wuxuu isticmaalaa DNS si uu u helo meesha uu u dirayo request-ka."
          },
          {
            h: "DNS Records",
            p:
            "DNS wuxuu leeyahay records kala duwan sida A record oo isku xira domain iyo IPv4 address, AAAA record oo isticmaala IPv6, MX record oo maamula email servers, iyo CNAME oo sameeya aliases."
          },
          {
            h: "DNS Attacks",
            p:
            "Attackers waxay isticmaali karaan DNS attacks sida DNS spoofing (beddelidda response-ka DNS si user loo marin habaabiyo), DNS hijacking iyo DNS tunneling (xog qarsoodi ah oo lagu gudbiyo DNS traffic)."
          },
          {
            h: "SOC Analyst iyo DNS Investigation",
            p:
            "SOC analyst wuxuu eegaa DNS queries si uu u ogaado domains shaki leh, malware communication (beaconing) iyo connections aan caadi ahayn. Domain cusub oo si isdaba joog ah loo weydiiyo waa red flag."
          }
        ],

        terms: [
          { term: "DNS", def: "System domain names ugu beddela IP addresses." },
          { term: "A Record", def: "DNS record isku xira domain iyo IPv4 address." },
          { term: "DNS Spoofing", def: "Weerar beddela DNS response si user loo marin habaabiyo." },
          { term: "DNS Tunneling", def: "Hab xog loogu gudbiyo DNS traffic si qarsoodi ah." }
        ],

        quiz: [
          {
            q: "DNS shaqadiisa ugu weyn waa?",
            options: ["Domain u beddelidda IP address", "Kordhinta RAM", "Maamulka CPU", "Kaydinta files"],
            answer: 0,
            explain: "DNS wuxuu isku xiraa domain names iyo IP addresses."
          },
          {
            q: "DNS tunneling waxaa loo isticmaali karaa?",
            options: ["In xog loo qariyo DNS traffic dhexdiisa", "In RAM la kordhiyo", "In OS la rakibo", "In password la sameeyo"],
            answer: 0,
            explain: "Attackers waxay DNS u isticmaali karaan communication qarsoon."
          },
          {
            q: "SOC analyst wuxuu baarayaa DNS queries sababtoo ah?",
            options: ["Si uu u ogaado suspicious domains", "Si uu u beddelo hardware", "Si uu u sameeyo website", "Si uu u kordhiyo storage"],
            answer: 0,
            explain: "DNS analysis wuxuu caawiyaa ogaanshaha malware."
          },
          {
            q: "Domain cusub oo 2 maalmood jir ah oo iska dhigaya bangi waa?",
            options: ["Red flag u baahan baaritaan", "Caadi", "Xoog u ah CPU", "Firewall rule"],
            answer: 0,
            explain: "Domains cusub oo la mid ah brands caanka ah waa calaamad phishing suurtagal ah."
          }
        ],

        exercise: {
          title: "DNS Investigation Lab",
          steps: [
            "Raadi DNS queries computer-kaaga (nslookup ama dig).",
            "Baro 3 DNS record types.",
            "Aqoonso sida domain cusub loo baari lahaa.",
            "Samee DNS investigation notes."
          ],
          deliverable: "DNS security investigation report."
        }
      },


      {
        slug: "http-https-web-security",
        title: "HTTP, HTTPS iyo Web Traffic",
        english: "HTTP and HTTPS Security Fundamentals",
        minutes: 14,

        summary:
          "Faham sida web traffic u shaqeeyo, HTTP methods, HTTPS encryption iyo web-based attacks.",

        sections: [
          {
            h: "HTTP iyo HTTPS",
            p:
            "HTTP waa protocol loo isticmaalo communication-ka browser iyo server. HTTPS waa HTTP oo lagu daray encryption iyadoo la adeegsanayo TLS si xogta loo ilaaliyo."
          },
          {
            h: "HTTP Methods",
            p:
            "HTTP wuxuu leeyahay methods sida GET oo lagu codsado xog, POST oo lagu diro xog, PUT oo lagu cusbooneysiiyo xog iyo DELETE oo lagu tirtiro xog."
          },
          {
            h: "Web Attacks",
            p:
            "Attackers waxay bartilmaameedsan karaan websites iyagoo isticmaalaya SQL Injection, Cross-Site Scripting (XSS) iyo authentication attacks."
          },
          {
            h: "SOC Analyst Web Investigation",
            p:
            "SOC analyst wuxuu baarayaa web logs, suspicious requests, URLs iyo HTTP status codes si uu u ogaado weerarro."
          }
        ],

        terms: [
          { term: "HTTP", def: "Protocol browser iyo server isku xiriiriya." },
          { term: "HTTPS", def: "HTTP leh encryption TLS." },
          { term: "TLS", def: "Technology ilaalisa communication encryption." },
          { term: "SQL Injection", def: "Weerar lagu geliyo database commands aan la oggolayn." }
        ],

        quiz: [
          {
            q: "HTTPS maxaa kaga duwan HTTP?",
            options: ["Waxay leedahay encryption", "Ma isticmaasho network", "Waa storage", "Waa operating system"],
            answer: 0,
            explain: "HTTPS waxay isticmaashaa TLS si ay u ilaaliso xogta."
          },
          {
            q: "GET method waxaa loo isticmaalaa?",
            options: ["Codsiga xog", "Tirtirka computer", "Beddelka CPU", "Firewall creation"],
            answer: 0,
            explain: "GET wuxuu codsadaa resources server-ka."
          },
          {
            q: "SOC analyst web logs u isticmaalaa?",
            options: ["Inuu ogaado suspicious requests", "Inuu kordhiyo RAM", "Inuu rakibo OS", "Inuu sameeyo games"],
            answer: 0,
            explain: "Web logs waxay bixiyaan evidence weerarrada."
          }
        ],

        exercise: {
          title: "Web Traffic Analysis",
          steps: [
            "Baro HTTP status codes.",
            "Aqoonso GET iyo POST requests.",
            "Raadi suspicious URLs.",
            "Samee web investigation report."
          ],
          deliverable: "HTTP traffic analysis report."
        }
      },


      {
        slug: "firewalls-network-security",
        title: "Firewalls iyo Network Security Controls",
        english: "Firewall Fundamentals",
        minutes: 12,

        summary:
          "Baro firewall types, rules, network segmentation iyo sida firewalls u ilaaliyaan networks.",

        sections: [
          {
            h: "Waa maxay Firewall?",
            p:
            "Firewall waa security control xakameeya network traffic soo galaya iyo baxaya. Wuxuu isticmaalaa rules si uu u ogolaado ama u diido connections."
          },
          {
            h: "Firewall Types",
            p:
            "Waxaa jira types kala duwan sida network firewall, host firewall, stateful firewall (la socda xaaladda connections) iyo application firewall (eegaya app-ka iyo user-ka)."
          },
          {
            h: "Firewall Rules",
            p:
            "Firewall rules waxay ku salaysan yihiin source IP, destination IP, ports iyo protocols. Rule khaldan wuxuu keeni karaa security problems."
          },
          {
            h: "Network Segmentation",
            p:
            "Segmentation waxay kala qaybisaa network si haddii hal qayb la jebiyo aysan attacker-ku si fudud ugu gudbin meel kasta."
          },
          {
            h: "SOC Analyst Connection",
            p:
            "SOC analyst wuxuu baarayaa firewall logs, blocked connections iyo suspicious traffic si uu u ogaado attacks."
          }
        ],

        terms: [
          { term: "Firewall", def: "Qalab xakameeya network traffic." },
          { term: "Rule", def: "Xeer go'aamiya traffic la oggol yahay ama la diiday." },
          { term: "Stateful Firewall", def: "Firewall la socda xaaladda connections." },
          { term: "Segmentation", def: "Kala qaybinta network si loo yareeyo risk." },
          { term: "Firewall Log", def: "Record muujinaya firewall activity." }
        ],

        quiz: [
          {
            q: "Firewall shaqadiisa ugu weyn waa?",
            options: ["Xakamaynta network traffic", "Kaydinta files", "Kordhinta RAM", "Samaynta users"],
            answer: 0,
            explain: "Firewall wuxuu maamulaa connections iyadoo la adeegsanayo rules."
          },
          {
            q: "Firewall rule wuxuu isticmaali karaa?",
            options: ["IP addresses iyo ports", "CPU temperature", "Screen size", "Keyboard"],
            answer: 0,
            explain: "Rules waxay ku salaysan yihiin network information."
          },
          {
            q: "Sababta network segmentation loo isticmaalo waa?",
            options: [
              "Si haddii hal qayb la jebiyo, attacker-ku aanu si fudud u gudbin meel kale",
              "Si loo kordhiyo internet speed",
              "Si loo beddelo hardware",
              "Si loo sameeyo backup"
            ],
            answer: 0,
            explain: "Segmentation waxay xannibaysaa lateral movement."
          },
          {
            q: "SOC analyst wuxuu eegaa firewall logs sababtoo ah?",
            options: ["Si uu u ogaado suspicious traffic", "Si uu u beddelo hardware", "Si uu u sameeyo websites", "Si uu u kordhiyo storage"],
            answer: 0,
            explain: "Firewall logs waxay bixiyaan evidence."
          }
        ],

        exercise: {
          title: "Firewall Analysis Lab",
          steps: [
            "Baro 5 firewall rules.",
            "Faham allow iyo deny traffic.",
            "Akhri sample firewall logs.",
            "Samee security notes."
          ],
          deliverable: "Firewall analysis report."
        }
      },


      {
        slug: "wireshark-packet-analysis",
        title: "Wireshark iyo Packet Analysis",
        english: "Wireshark Network Analysis",
        minutes: 10,

        summary:
          "Baro sida loo isticmaalo Wireshark si loo qabto loona baaro network packets, protocols iyo suspicious traffic.",

        sections: [
          {
            h: "Waa maxay Wireshark?",
            p:
            "Wireshark waa packet analyzer loo isticmaalo qabashada iyo baaritaanka network traffic. SOC analyst wuxuu isticmaalaa si uu u arko waxa dhex maraya network-ka."
          },
          {
            h: "Packet Capture",
            p:
            "Packet capture waa habka lagu qabto xogta ku socota network. Packet kasta wuxuu leeyahay information sida source IP, destination IP, protocol iyo data."
          },
          {
            h: "Filters gudaha Wireshark",
            p:
            "Wireshark wuxuu leeyahay filters kaa caawiya inaad hesho traffic gaar ah. Tusaale ahaan waxaad raadin kartaa TCP traffic, DNS queries ama IP gaar ah."
          },
          {
            h: "Traffic Investigation",
            p:
            "SOC analyst wuxuu isticmaalaa Wireshark si uu u ogaado malware communication, suspicious connections, failed connections iyo data exfiltration."
          },
          {
            h: "Security Limitations",
            p:
            "Encrypted traffic sida HTTPS waxay qarin kartaa content-ka data. Analyst-ku wuxuu isticmaalaa metadata sida IP addresses, ports iyo timing si uu u sameeyo analysis."
          }
        ],

        terms: [
          { term: "Wireshark", def: "Tool lagu qabto laguna baaro network packets." },
          { term: "Packet Capture", def: "Habka lagu duubo network traffic." },
          { term: "Filter", def: "Hab lagu kala saaro traffic gaar ah." },
          { term: "Protocol", def: "Xeerarka communication-ka network." },
          { term: "Metadata", def: "Xog sharaxaysa traffic sida IP iyo ports." }
        ],

        quiz: [
          {
            q: "Wireshark waxaa loo isticmaalaa?",
            options: ["Packet analysis", "Video editing", "Password storage", "Hardware repair"],
            answer: 0,
            explain: "Wireshark waa network packet analyzer."
          },
          {
            q: "Packet wuxuu ka kooban yahay?",
            options: ["Source IP, destination IP iyo protocol information", "Kaliya password", "Kaliya files", "CPU information"],
            answer: 0,
            explain: "Packets waxay leeyihiin network information."
          },
          {
            q: "SOC analyst Wireshark u isticmaalaa?",
            options: ["Inuu baaro suspicious network activity", "Inuu kordhiyo RAM", "Inuu sameeyo website", "Inuu beddelo OS"],
            answer: 0,
            explain: "Wireshark wuxuu caawiyaa incident investigation."
          },
          {
            q: "HTTPS traffic maxaa dhib ka dhigi kara analysis?",
            options: ["Encryption", "CPU speed", "Screen size", "Storage"],
            answer: 0,
            explain: "Encryption waxay qarin kartaa content-ka traffic."
          }
        ],

        exercise: {
          title: "Wireshark Packet Investigation",
          steps: [
            "Rakib Wireshark ama isticmaal sample capture.",
            "Qabso network traffic.",
            "Kala saar DNS iyo TCP traffic.",
            "Raadi suspicious connections.",
            "Qor analyst findings."
          ],
          deliverable: "Wireshark packet analysis report."
        }
      },


      {
        slug: "network-monitoring-detection",
        title: "Network Monitoring iyo Threat Detection",
        english: "Network Monitoring and Threat Detection",
        minutes: 13,

        summary:
          "Baro sida SOC analyst u isticmaalo monitoring, IOC-yada iyo network data si uu u ogaado threats.",

        sections: [
          {
            h: "Waa maxay Network Monitoring?",
            p:
            "Network monitoring waa la socodka joogtada ah ee network traffic, devices iyo connections si loo ogaado dhibaatooyin ama weerarro."
          },
          {
            h: "Indicators of Compromise (IOC)",
            p:
            "IOC waa calaamado muujin kara in system la jebiyay. Tusaalooyinka waxaa ka mid ah suspicious IP addresses, malware hashes, unusual domains iyo traffic aan caadi ahayn."
          },
          {
            h: "Network Alerts",
            p:
            "Security tools waxay abuuraan alerts marka ay arkaan activity shaki leh. Analyst-ku waa inuu qiimeeyaa alert-ka oo kala saaraa true positive iyo false positive."
          },
          {
            h: "Threat Detection Process",
            p:
            "SOC analyst wuxuu raacaa hab: hel alert, samee triage, ururi evidence, baar traffic, qiimee saameynta kadibna qor report."
          },
          {
            h: "Continuous Improvement",
            p:
            "Monitoring fiican wuxuu u baahan yahay rules wanaagsan, threat intelligence iyo fahamka normal network behavior."
          }
        ],

        terms: [
          { term: "IOC", def: "Calaamad muujin karta compromise." },
          { term: "Threat Detection", def: "Habka lagu ogaado khataraha security." },
          { term: "Triage", def: "Kala hormarinta iyo qiimeynta alerts." },
          { term: "False Positive", def: "Alert u muuqda threat laakiin aan ahayn." },
          { term: "Threat Intelligence", def: "Xog ku saabsan threats iyo attackers." }
        ],

        quiz: [
          {
            q: "Network monitoring maxay qabataa?",
            options: ["La socodka traffic iyo activity", "Beddelidda CPU", "Sameynta hardware", "Kaydinta passwords"],
            answer: 0,
            explain: "Monitoring wuxuu caawiyaa ogaanshaha suspicious activity."
          },
          {
            q: "IOC waa?",
            options: ["Calaamad muujin karta attack", "Network cable", "Operating system", "Password"],
            answer: 0,
            explain: "IOC waxay caawisaa incident detection."
          },
          {
            q: "SOC analyst marka alert yimaado wuxuu marka hore sameeyaa?",
            options: ["Triage iyo baaritaan", "Dami dhammaan systems", "Tirtir files", "Bedel hardware"],
            answer: 0,
            explain: "Analyst-ku wuxuu marka hore qiimeeyaa alert-ka."
          },
          {
            q: "False positive waa?",
            options: ["Alert aan threat dhab ah ahayn", "Weerar guuleystay", "Backup", "Firewall"],
            answer: 0,
            explain: "False positive waa digniin khaldan."
          }
        ],

        exercise: {
          title: "Network Threat Detection Lab",
          steps: [
            "Qaado sample network alert.",
            "Aqoonso IOC-yada.",
            "Baar source IP iyo destination.",
            "Go'aami true positive ama false positive.",
            "Samee analyst report."
          ],
          deliverable: "Network threat detection report."
        }
      },

    ],
  }),
  m({
    id: "m3",
    slug: "linux-for-soc",
    stage: "Dhexe",
    title: "Linux ee SOC Analyst-ka",
    english: "Linux for SOC Analysts",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa Linux command line, users, permissions, processes, logs iyo sida SOC analyst uga baaro Linux servers marka incident dhaco.",

    topics: [
      "Linux Shell & Commands",
      "Filesystem & Permissions",
      "Users & Groups",
      "Process Management",
      "Logs & Syslog",
      "Networking Tools",
      "Persistence Techniques",
      "Privilege Escalation Basics",
      "Linux Log Analysis Lab",
    ],

    lessonList: [

      {
        slug: "linux-fundamentals-shell",
        title: "Aasaaska Linux Shell",
        english: "Linux Shell Fundamentals",
        minutes: 10,

        summary:
          "Baro terminal-ka Linux, amarrada aasaasiga ah iyo sababta Linux muhiim ugu yahay SOC analyst.",

        sections: [
          {
            h: "Sababta Linux Muhiim U Yahay SOC-ga",
            p:
            "Server-yada badankood, tools-ka security (SIEM, IDS, forensics tools) iyo cloud infrastructure-ka waxay ku shaqeeyaan Linux. SOC analyst-yadu waxay u baahan yihiin inay ku shaqeeyaan terminal-ka iyagoo aan lahayn desktop (headless systems)."
          },
          {
            h: "Shell iyo Terminal",
            p:
            "Shell waa barnaamij aqbala amarada user-ka kuna fulinaya operating system-ka. Bash waa shell-ka ugu caansan Linux. Terminal waa window-ga aad ku qorto amarada."
          },
          {
            h: "Amarrada Aasaasiga ah",
            p:
            "pwd (halka aad joogto), ls (liis files), cd (u gudub directory), cat (akhri file), mkdir (samee directory), rm (tirtir), cp (nuqul), mv (dhaqaajin/rename). Amarradan waa saldhigga shaqada Linux."
          },
          {
            h: "Pipes iyo Redirection",
            p:
            "Pipe (|) wuxuu output-ka amar u diraa amar kale — tusaale: cat file.log | grep 'error'. Redirection (> iyo >>) waxay output-ka ku qoraan file halkii ay screen-ka ku muuqan lahaayeen."
          },
          {
            h: "SOC Usage",
            p:
            "Analyst-ku wuxuu isticmaalaa command line si uu degdeg u shaandheeyo malaayiin sadar oo log ah — waa mid ka dhaqso badan GUI marka xogta badan tahay."
          }
        ],

        terms: [
          { term: "Shell", def: "Barnaamij aqbala oo fuliya amarada user-ka." },
          { term: "Bash", def: "Shell-ka ugu caansan Linux." },
          { term: "Pipe (|)", def: "Wuxuu output-ka amar u diraa amar kale." },
          { term: "Redirection", def: "Habka output-ka loogu qoro file halkii screen-ka." }
        ],

        quiz: [
          {
            q: "Sababta Linux muhiim ugu yahay SOC analyst waa?",
            options: [
              "Server-yada badan, security tools iyo cloud waxay ku shaqeeyaan Linux",
              "Linux waa mid fudud oo keliya loo isticmaalo games",
              "Linux ma taageero networking",
              "Windows oo keliya ayaa loo isticmaalaa security"
            ],
            answer: 0,
            explain: "Linux waa aasaas u ah infrastructure-ka casriga ah ee servers iyo security tools."
          },
          {
            q: "Pipe (|) shaqadiisa waa?",
            options: [
              "Output amar u diraa amar kale",
              "Tirtira files",
              "Sameysa users",
              "Xakameeya CPU"
            ],
            answer: 0,
            explain: "Pipe wuxuu isku xiraa amarro badan hal xariiq ah."
          },
          {
            q: "Amarkee ayaa liistaya files directory-ga aad ku jirto?",
            options: ["cd", "ls", "rm", "pwd"],
            answer: 1,
            explain: "ls wuxuu liistaa content-ka directory-ga."
          }
        ],

        exercise: {
          title: "Shell Basics Practice",
          steps: [
            "Fur terminal, isticmaal pwd si aad u aragto halka aad joogto.",
            "Samee directory cusub oo magaciisu yahay 'soc-lab' (mkdir).",
            "U gudub directory-gaas (cd).",
            "Samee file yar oo qor xog ah, kadibna isticmaal cat si aad u aragto.",
            "Isticmaal pipe si aad ugu shaandheyso hal eray file-kaas."
          ],
          deliverable: "Screenshot iyo liiska amarrada aad isticmaashay."
        }
      },


      {
        slug: "linux-filesystem-permissions",
        title: "Linux Filesystem & Permissions",
        english: "Linux Filesystem and Permissions",
        minutes: 12,

        summary:
          "Faham structure-ka Linux filesystem, permissions (rwx) iyo sida weeraryahannadu u isticmaalaan permissions khaldan.",

        sections: [
          {
            h: "Linux Directory Structure",
            p:
            "/ waa root. /etc wuxuu leeyahay configuration files. /var/log wuxuu leeyahay logs. /home wuxuu leeyahay user files. /tmp waa temporary files — meel weeraryahannadu jecel yihiin inay malware ku qariyaan. /bin iyo /usr/bin waxay leeyihiin programs."
          },
          {
            h: "Permissions (rwx)",
            p:
            "File kasta wuxuu leeyahay permissions saddex heer ah: owner, group, others. r (read), w (write), x (execute). chmod 755 tusaale ahaan wuxuu siinayaa owner-ka rwx, group iyo others r-x."
          },
          {
            h: "Special Permissions",
            p:
            "SUID (chmod 4755) wuxuu ka dhigayaa program-ka inuu u shaqeeyo sida owner-ka (badanaa root) — weeraryahannadu waxay raadiyaan SUID binaries si ay awood ugu kordhsadaan."
          },
          {
            h: "Ownership",
            p:
            "chown wuxuu beddelaa cidda leh file-ka (owner). chgrp wuxuu beddelaa group-ka. Analyst-ku wuxuu baarayaa files leh ownership aan caadi ahayn."
          }
        ],

        terms: [
          { term: "rwx", def: "Read, Write, Execute — saddexda permission ee file." },
          { term: "chmod", def: "Amar lagu beddelo permissions file." },
          { term: "SUID", def: "Bit u ogolaanaya program-ka inuu u shaqeeyo sida owner-kiisa." },
          { term: "/tmp", def: "Meel temporary files ah oo malware badan ku qarsoonaadaan." }
        ],

        quiz: [
          {
            q: "/var/log Linux waxaa badanaa laga helaa?",
            options: ["Games", "Logs", "Passwords", "Images"],
            answer: 1,
            explain: "Linux logs badankood waxay ku jiraan /var/log."
          },
          {
            q: "SUID bit-ku muxuu sameeyaa?",
            options: [
              "Program-ka wuxuu u shaqeeyaa sida owner-kiisa (badanaa root)",
              "Wuxuu kordhiyaa CPU speed",
              "Wuxuu tirtiraa file-ka",
              "Wuxuu xiraa internet-ka"
            ],
            answer: 0,
            explain: "SUID wuxuu bixiyaa awood gaar ah — weeraryahannada ayaa raadiya inay ka faa'iidaystaan."
          },
          {
            q: "chmod 755 macnaheedu waa?",
            options: [
              "Owner rwx, group iyo others r-x",
              "Kaliya root ayaa akhrin kara",
              "File-ku wuu tirtirmayaa",
              "File-ku wuu qarsoonaadaa"
            ],
            answer: 0,
            explain: "755 waa permission caan ah oo bixiya full access owner-ka, read+execute kuwa kale."
          }
        ],

        exercise: {
          title: "Permissions Investigation Lab",
          steps: [
            "Samee file cusub, hubi permissions-kiisa hore (ls -l).",
            "Isticmaal chmod si aad u beddesho permissions-ka.",
            "Raadi (find) SUID binaries system-kaaga: find / -perm -4000 -type f 2>/dev/null.",
            "Qor 3 files aad u malaynayso inay ahaayeen suspicious haddii la arko SUID."
          ],
          deliverable: "Permissions investigation report."
        }
      },


      {
        slug: "linux-users-groups",
        title: "Linux Users & Groups",
        english: "Linux Users and Group Management",
        minutes: 13,

        summary:
          "Faham sida Linux u maamulo users, groups, sudo iyo sababta UID 0 muhiim u yahay security.",

        sections: [
          {
            h: "Users iyo /etc/passwd",
            p:
            "Isticmaale kasta wuxuu leeyahay UID. UID 0 waa root (awood buuxda). /etc/passwd waxay hayaan macluumaadka isticmaalaha, /etc/shadow-na hashes-ka password-ka."
          },
          {
            h: "Groups",
            p:
            "Users waxay ku jiri karaan groups si loo maamulo permissions si guud. Tusaale: group 'sudo' wuxuu siinayaa members-kiisa awood admin."
          },
          {
            h: "sudo",
            p:
            "sudo wuxuu ogolaadaa isticmaale caadi ah inuu amar sida root u fuliyo — waxaana la diiwaan geliyaa /var/log/auth.log. 'sudo su -' oo habeen dhexe ka yimid IP shisheeye waa alert."
          },
          {
            h: "SOC Investigation",
            p:
            "Marka la baarayo suspected compromise, analyst-ku wuxuu baarayaa: user cusub oo UID 0 leh (backdoor suurtagal ah), members-ka group sudo, iyo login attempts aan caadi ahayn."
          }
        ],

        terms: [
          { term: "UID 0", def: "Root — awood buuxda nidaamka." },
          { term: "/etc/shadow", def: "File-ka hashes-ka password-yada." },
          { term: "sudo", def: "Amar u oggolaanaya user inuu amar sida root u fuliyo." },
          { term: "Group", def: "Ururinta users-ka loo maamulo permissions guud." }
        ],

        quiz: [
          {
            q: "Isticmaale cusub oo UID 0 leh oo ku jira /etc/passwd waa?",
            options: [
              "Caadi — waa service account",
              "Backdoor suurtagal ah — baar isla markiiba",
              "Cilad graphics ah",
              "Waa hab lagu dedejiyo boot-ka"
            ],
            answer: 1,
            explain: "UID 0 = root. Kaliya root ayaa yeelan kara UID 0."
          },
          {
            q: "sudo commands-ka waxaa lagu diiwaan geliyaa?",
            options: ["/var/log/auth.log", "/tmp", "/home", "/etc/hosts"],
            answer: 0,
            explain: "auth.log wuxuu diiwaan geliyaa authentication iyo sudo activity."
          },
          {
            q: "Sababta analyst-ku uu u baaro group sudo members waa?",
            options: [
              "Si uu u ogaado cidda leh awood admin",
              "Si uu u beddelo CPU",
              "Si uu u sameeyo backup",
              "Si uu u kordhiyo RAM"
            ],
            answer: 0,
            explain: "Members-ka sudo waxay leeyihiin awood weyn — kordhinta lama filaanka ah waa red flag."
          }
        ],

        exercise: {
          title: "User & Group Audit",
          steps: [
            "Liis garee dhammaan users: cut -d: -f1,3 /etc/passwd",
            "Raadi UID 0 kale marka lagu daro root.",
            "Liis garee members-ka group-ka sudo.",
            "Qor warbixin: user kasta, awoodiisa, iyo go'aan (normal/needs review)."
          ],
          deliverable: "User security audit report."
        }
      },


      {
        slug: "linux-process-management",
        title: "Process Management ee Linux",
        english: "Linux Process Management",
        minutes: 15,

        summary:
          "Baro sida Linux u maamulo processes iyo services, iyo sida analyst uga baaro process shaki leh.",

        sections: [
          {
            h: "Processes",
            p:
            "Process waa program socda oo leh PID (Process ID) iyo parent process. Amarka ps aux wuxuu liistaa processes-ka socda."
          },
          {
            h: "Parent-Child Relationship",
            p:
            "SOC analyst-ku had iyo jeer wuxuu eegaa 'parent-child relationship': tusaale, apache oo dhalay bash shell waa calaamad shaki leh (suspicious), maxaa yeelay web server caadi ahaan ma furo shell."
          },
          {
            h: "systemd iyo Services",
            p:
            "systemd waa system la isticmaalo si loo maamulo services (background processes). systemctl status, systemctl list-units waa amarro caan ah oo lagu eego services socda."
          },
          {
            h: "Killing Processes",
            p:
            "kill iyo pkill waxaa loo isticmaalaa in la joojiyo process shaki leh — laakiin ka hor waa in la ururiyaa evidence (PID, command line, network connections) ka hor inta aan la joojin."
          }
        ],

        terms: [
          { term: "PID", def: "Process ID — lambar gaar ah oo loo siiyo process kasta." },
          { term: "ps aux", def: "Amar liistaya dhammaan processes-ka socda." },
          { term: "systemd", def: "System maamula services-ka Linux." },
          { term: "Parent Process", def: "Process-ka dhalay process-ka kale." }
        ],

        quiz: [
          {
            q: "Apache oo dhalay bash shell waa?",
            options: [
              "Calaamad caadi ah",
              "Suspicious parent-child chain — u baahan baaritaan",
              "Cilad hardware ah",
              "Update software"
            ],
            answer: 1,
            explain: "Web server oo furaya shell waa indicator caan ah oo compromise ah."
          },
          {
            q: "Amarkee ayaa liistaya processes-ka socda?",
            options: ["ls", "ps aux", "cd", "mkdir"],
            answer: 1,
            explain: "ps aux wuxuu muujiyaa dhammaan processes-ka."
          },
          {
            q: "Ka hor inta aan process shaki leh la joojin, waa in la?",
            options: [
              "Ururiyaa evidence (PID, connections)",
              "Isla markiiba la kill gareeyo",
              "Si toos ah la iska indho tiro",
              "La restart gareeyo mashiinka"
            ],
            answer: 0,
            explain: "Evidence collection waa muhiim ka hor tirtirid ama joojin."
          }
        ],

        exercise: {
          title: "Process Investigation Lab",
          steps: [
            "Isticmaal ps aux si aad u aragto processes-ka socda.",
            "Aqoonso 5 processes aad garanayso iyo 3 aadan garanayn.",
            "Isticmaal systemctl list-units si aad u aragto services.",
            "Qor jaantus PID, magac, parent process, go'aan."
          ],
          deliverable: "Process investigation report."
        }
      },


      {
        slug: "linux-logs-syslog",
        title: "Linux Logs & Syslog",
        english: "Linux Logs and Syslog",
        minutes: 11,

        summary:
          "Baro meelaha logs-ku ku jiraan, syslog, iyo sida looga helo calaamadaha weerarka.",

        sections: [
          {
            h: "Meelaha Log-yada",
            p:
            "/var/log/auth.log (Debian/Ubuntu) ama /var/log/secure (RHEL) — login iyo sudo. /var/log/syslog — nidaamka. /var/log/apache2/access.log — web traffic."
          },
          {
            h: "Calaamadaha Weerarka",
            p:
            "'Failed password for root from 45.x.x.x' oo si isdaba joog ah u soo noqonaysa = brute force. Haddii ay ku xigto 'Accepted password' isla IP-ga = guul weerar (compromise)."
          },
          {
            h: "grep iyo Log Filtering",
            p:
            "grep 'Failed password' auth.log | awk '{print \$11}' | sort | uniq -c | sort -nr — amarkani wuxuu tiriyaa IP-yada ugu badan ee isku dayay login."
          },
          {
            h: "Timeline Building",
            p:
            "Had iyo jeer isticmaal UTC waqti oo samee timeline: waqtiga ugu horreeya ee shaki leh, waqtiga login-ka guuleystay, waxa xiga (commands, files, users cusub)."
          }
        ],

        terms: [
          { term: "auth.log", def: "Log-ga login-ka iyo sudo ee Debian/Ubuntu." },
          { term: "Brute Force", def: "Isku day badan oo password ah ilaa mid shaqeeyo." },
          { term: "syslog", def: "System log-ka guud ee Linux." },
          { term: "Timeline", def: "Kala horeynta dhacdooyinka waqtiga ah." }
        ],

        quiz: [
          {
            q: "10,000 'Failed password' oo ay ku xigto 1 'Accepted password' isla IP macnaheedu waa?",
            options: [
              "Brute force guuleystay — incident",
              "Isticmaale ilaaway password-ka",
              "Cilad server",
              "Waa log rotation"
            ],
            answer: 0,
            explain: "Waa successful brute force — isla markiiba go'doomi account-ka."
          },
          {
            q: "Login logs Debian/Ubuntu waxaa laga helaa?",
            options: ["/var/log/auth.log", "/home", "/tmp", "/etc/hosts"],
            answer: 0,
            explain: "auth.log waa meesha login iyo sudo activity."
          },
          {
            q: "Sababta timeline UTC loo isticmaalo waa?",
            options: [
              "Si loo yareeyo jahwareerka timezone ee dhacdooyinka",
              "Si loo kordhiyo speed-ka",
              "Si loo tirtiro logs",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "UTC wuxuu isku xiraa dhacdooyinka server kala duwan si isku mid ah."
          }
        ],

        exercise: {
          title: "Auth Log Investigation",
          steps: [
            "grep 'Failed password' auth.log | awk '{print \$11}' | sort | uniq -c | sort -nr | head",
            "Hubi haddii mid ka mid ah IP-yadaas uu leeyahay 'Accepted password'.",
            "Samee timeline UTC ah.",
            "Qor go'aan: compromise ma dhacay?"
          ],
          deliverable: "Auth log investigation report."
        }
      },


      {
        slug: "linux-networking-tools",
        title: "Linux Networking Tools",
        english: "Linux Networking Tools",
        minutes: 14,

        summary:
          "Baro amarrada networking Linux sida ss, netstat, iyo curl loo isticmaalo baaritaanka.",

        sections: [
          {
            h: "ss iyo netstat",
            p:
            "ss -tunap iyo netstat -tunap waxay muujiyaan xiriirrada network-ka furan iyo services-ka la xiriira. Analyst-ku wuxuu raadiyaa listeners aan la aqoon."
          },
          {
            h: "ip iyo Network Config",
            p:
            "ip a wuxuu muujiyaa IP addresses-ka interfaces-ka. ip route wuxuu muujiyaa routing table-ka."
          },
          {
            h: "curl iyo wget",
            p:
            "curl iyo wget waxaa loo isticmaalaa in la soo dejiyo content web ah command line-ka. Malware badan wuxuu isticmaalaa curl si uu u soo dejiyo payloads dheeraad ah."
          },
          {
            h: "lsof -i",
            p:
            "lsof -i wuxuu muujiyaa file-yada furan ee network-ka la xiriira — waxay caawisaa aqoonsiga process-ka isticmaalaya connection gaar ah."
          }
        ],

        terms: [
          { term: "ss", def: "Amar muujiya xiriirrada network-ka furan." },
          { term: "lsof -i", def: "Amar muujiya files furan ee network-ka la xiriira." },
          { term: "curl", def: "Tool lagu soo dejiyo content web ah command line-ka." }
        ],

        quiz: [
          {
            q: "ss -tunap waxay muujisaa?",
            options: [
              "Xiriirrada network-ka furan",
              "Files kaydsan",
              "Users-ka system-ka",
              "CPU temperature"
            ],
            answer: 0,
            explain: "ss wuxuu bixiyaa macluumaad ku saabsan network connections."
          },
          {
            q: "Malware badan curl wuxuu u isticmaalaa?",
            options: [
              "Si uu u soo dejiyo payloads dheeraad ah",
              "Si uu u sameeyo backup",
              "Si uu u beddelo permissions",
              "Si uu u xiro internet-ka"
            ],
            answer: 0,
            explain: "curl waa tool caan ah oo lagu soo dejiyo malware dheeraad ah."
          },
          {
            q: "lsof -i waxay caawisaa?",
            options: [
              "Aqoonsiga process-ka isticmaalaya connection gaar ah",
              "Kaydinta files",
              "Sameynta users",
              "Beddelidda CPU"
            ],
            answer: 0,
            explain: "lsof -i wuxuu isku xiraa network connections iyo processes."
          }
        ],

        exercise: {
          title: "Network Command Lab",
          steps: [
            "Isticmaal ss -tunap si aad u aragto connections furan.",
            "Isticmaal ip a si aad u aragto IP-gaaga.",
            "Raadi hal connection oo aad u malaynayso inuu shaki leh yahay.",
            "Sharax sababta."
          ],
          deliverable: "Network tools practice report."
        }
      },


      {
        slug: "linux-persistence-techniques",
        title: "Persistence Techniques ee Linux",
        english: "Linux Persistence Techniques",
        minutes: 12,

        summary:
          "Faham meelaha weeraryahanku isku qariyo si uu ugu soo laabto mashiinka Linux dib u shidista kaddib.",

        sections: [
          {
            h: "Cron Jobs",
            p:
            "crontab -l (user) iyo /etc/cron.* (system) waa meelo caan ah oo persistence ah. Cron job cusub oo 5 daqiiqo kasta ku shaqeeya script /tmp ku jira waa red flag."
          },
          {
            h: "systemd Services",
            p:
            "systemd services cusub (/etc/systemd/system/*.service) oo fulinaya script /tmp ku jira waa persistence technique caan ah."
          },
          {
            h: ".bashrc iyo Startup Files",
            p:
            "~/.bashrc, ~/.bash_profile iyo /etc/rc.local waxaa lagu qari karaa amarro si ay u fuliyaan mar kasta oo user galo ama system-ka bilaabmo."
          },
          {
            h: "SSH Keys",
            p:
            "Weeraryahannadu waxay ku dari karaan SSH key naftooda ~/.ssh/authorized_keys si ay mar kasta u geli karaan mashiinka iyagoo aan password u baahnayn."
          }
        ],

        terms: [
          { term: "Persistence", def: "Habka weeraryahanku uu ugu sii jiro mashiinka dib u shidista kaddib." },
          { term: "Cron Job", def: "Hawl si otomaatig ah waqti go'an u socota." },
          { term: "authorized_keys", def: "File-ka SSH keys-ka la aqbalay ee isticmaalaha." }
        ],

        quiz: [
          {
            q: "Cron job cusub oo 5 daqiiqo kasta ku shaqeeya script /tmp ku jira waa?",
            options: [
              "Backup caadi ah",
              "Persistence shaki leh — baar oo go'doomi",
              "Update nidaamka",
              "Log rotation"
            ],
            answer: 1,
            explain: "/tmp + cron = qaab persistence caan ah."
          },
          {
            q: "SSH key oo aan la aqoon oo ku jira authorized_keys waa?",
            options: [
              "Persistence suurtagal ah — attacker wuxuu heli karaa access aan password u baahnayn",
              "Caadi",
              "Backup",
              "Cilad system"
            ],
            answer: 0,
            explain: "authorized_keys oo la beddelay waa calaamad weyn oo compromise ah."
          },
          {
            q: "Meelaha startup files (.bashrc) waxay muhiim u yihiin sababtoo ah?",
            options: [
              "Waxaa lagu qari karaa amarro si ay mar kasta u fuliyaan",
              "Waxay kaydiyaan passwords",
              "Waxay maamulaan CPU",
              "Waxay noqdaan firewall"
            ],
            answer: 0,
            explain: "Startup files waa meel caan ah oo persistence ah."
          }
        ],

        exercise: {
          title: "Persistence Hunt Lab",
          steps: [
            "Liis garee cron jobs-ka dhammaan users-ka.",
            "Eeg systemd services-ka la beddelay dhawaanahan.",
            "Hubi authorized_keys files-ka home directories-ka.",
            "Samee checklist buuxa oo leh natiijooyin."
          ],
          deliverable: "Persistence investigation checklist."
        }
      },


      {
        slug: "linux-privilege-escalation-basics",
        title: "Privilege Escalation Basics",
        english: "Linux Privilege Escalation Fundamentals",
        minutes: 10,

        summary:
          "Faham sida attackers ugu kordhiyaan awooda Linux systems, iyo sida analyst uga baaro.",

        sections: [
          {
            h: "Waa Maxay Privilege Escalation?",
            p:
            "Privilege escalation waa marka attacker uu helo awood ka badan tii loo oggolaaday — tusaale user caadi ah oo noqda root."
          },
          {
            h: "SUID Binaries",
            p:
            "find / -perm -4000 -type f 2>/dev/null wuxuu raadiyaa SUID binaries. Qaar SUID binaries ah oo aan caadi ahayn (aan la rakibin package manager) waa shaki leh."
          },
          {
            h: "Sudo Misconfigurations",
            p:
            "sudo -l wuxuu muujiyaa waxa user-ku sudo u fulin karo. Haddii user-ku uu sudo u fulin karo amar sida vim ama less oo aan xaddid lahayn, wuxuu ka bixi karaa shell root ah."
          },
          {
            h: "Kernel Exploits",
            p:
            "Kernel vulnerabilities aan la patch-gareyn waxay awood u siin karaan attacker inuu root helo. Sidaas darteed patching joogtada ah ayaa muhiim ah."
          }
        ],

        terms: [
          { term: "Privilege Escalation", def: "Helitaanka awood ka badan tii loo oggolaaday." },
          { term: "SUID Binary", def: "Program u shaqeeya sida owner-kiisa (badanaa root)." },
          { term: "sudo -l", def: "Amar muujiya waxa user-ku sudo u fulin karo." }
        ],

        quiz: [
          {
            q: "Privilege escalation waa maxay?",
            options: [
              "Helitaanka awood ka badan tii loo oggolaaday",
              "Kaydinta files",
              "Kordhinta RAM",
              "Sameynta backup"
            ],
            answer: 0,
            explain: "Waa habka attacker uu ugu gudbo user caadi ah ilaa root."
          },
          {
            q: "sudo -l waxay muujisaa?",
            options: [
              "Waxa user-ku sudo u fulin karo",
              "Files kaydsan",
              "Network connections",
              "CPU usage"
            ],
            answer: 0,
            explain: "sudo -l wuxuu liistaa amarrada user-ku u oggolaaday."
          },
          {
            q: "Sababta kernel patching muhiim u yahay waa?",
            options: [
              "Vulnerabilities aan la patch-gareyn waxay u oggolaan karaan privilege escalation",
              "Wuxuu kordhiyaa RAM",
              "Wuxuu hagaajiyaa graphics",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Kernel exploits waa hab caan ah oo lagu helo root access."
          }
        ],

        exercise: {
          title: "Privilege Escalation Awareness Lab",
          steps: [
            "Isticmaal find si aad u raadiso SUID binaries.",
            "Isticmaal sudo -l si aad u aragto awoodaaga sudo.",
            "Sharax sida SUID binary khaldan loo isticmaali karo si loo helo root.",
            "Qor 3 talooyin lagu yareeyo privilege escalation risk."
          ],
          deliverable: "Privilege escalation awareness report."
        }
      },


      {
        slug: "linux-log-analysis-lab",
        title: "Linux Log Analysis — Full Investigation Lab",
        english: "Linux Log Analysis Capstone Lab",
        minutes: 13,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee investigation buuxa oo Linux server ah oo laga yaabo in la jebiyay.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad hesha alert ah in server-kaaga Linux uu leeyahay CPU usage aan caadi ahayn iyo xiriir network ah oo aan la aqoon. Shaqadaadu waa inaad baarto oo aad go'aamiso in incident dhab ah dhacay."
          },
          {
            h: "Baaritaanka Talaabo Talaabo",
            p:
            "1) ps aux si aad u aragto processes-ka. 2) ss -tunap si aad u aragto connections. 3) grep auth.log si aad u raadiso login attempts aan caadi ahayn. 4) find persistence mechanisms (cron, systemd, authorized_keys). 5) Xaqiiji users iyo permissions."
          },
          {
            h: "Ururinta Evidence",
            p:
            "Qor dhammaan PID-yada, IP-yada, users-ka iyo files-ka aad heshay. Samee timeline UTC ah oo muujinaya sida dhacdooyinku isugu xigxigeen."
          },
          {
            h: "Go'aan iyo Warbixin",
            p:
            "Ku dhammayso: waa incident dhab ah mise false positive? Haddii dhab ah tahay, qor talooyin containment (go'doomi mashiinka, xir accounts, tirtir persistence)."
          }
        ],

        terms: [
          { term: "Full Investigation", def: "Baaritaan isugu jira process, network, logs iyo persistence checks." },
          { term: "Containment", def: "Joojinta faafitaanka incident-ka." }
        ],

        quiz: [
          {
            q: "Tallaabada koowaad marka aad baarayso server laga yaabo inuu jabay waa?",
            options: [
              "Ururinta context: processes, connections, logs",
              "Isla markiiba dami server-ka",
              "Iska dhaaf alert-ka",
              "Beddel dhammaan passwords iyada oo aan la baarin"
            ],
            answer: 0,
            explain: "Marka hore waa in la fahmaa xaalada ka hor go'aan la gaaro."
          },
          {
            q: "Sababta timeline UTC muhiim u yahay investigation waa?",
            options: [
              "Waxay isku xirtaa dhacdooyinka si sax ah",
              "Waxay kordhisaa RAM",
              "Waxay tirtirtaa logs",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Timeline wuxuu muujiyaa sida weerarku u dhacay talaabo talaabo."
          },
          {
            q: "Haddii aad hesho persistence mechanism (cron shaki leh) waa in?",
            options: [
              "Lagu daro warbixinta oo lagu tirtiro containment-ka",
              "La iska dhaafo",
              "Kaliya la sheego IT",
              "La sugo maalin dambe"
            ],
            answer: 0,
            explain: "Persistence waa qayb muhiim ah oo eradication ah."
          }
        ],

        exercise: {
          title: "Full Linux Incident Investigation",
          steps: [
            "Isticmaal ps aux, ss -tunap, iyo grep auth.log si aad u ururiso evidence.",
            "Raadi persistence mechanisms (cron, systemd, SSH keys).",
            "Samee timeline UTC ah oo dhammaystiran.",
            "Qor go'aan: true positive ama false positive.",
            "Ku dar talooyin containment iyo eradication haddii loo baahdo."
          ],
          deliverable: "Full Linux incident investigation report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "m4",
    slug: "windows-active-directory-soc",
    stage: "Dhexe",
    title: "Windows & Active Directory ee SOC Analyst-ka",
    english: "Windows & Active Directory for SOC Analysts",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa Windows internals, Event Logs, Active Directory, PowerShell iyo sida SOC analyst uga baaro weerarrada ku dhacaan environments-ka Windows/AD-ga.",

    topics: [
      "Windows Fundamentals for SOC",
      "Windows Event Logs & Event IDs",
      "Active Directory Fundamentals",
      "Authentication: Kerberos & NTLM",
      "Windows Services & Scheduled Tasks",
      "Windows Registry & Persistence",
      "PowerShell for SOC Analysts",
      "Common Windows & AD Attacks",
      "Windows Investigation Capstone Lab",
    ],

    lessonList: [

      {
        slug: "windows-fundamentals-soc",
        title: "Windows Fundamentals ee SOC-ga",
        english: "Windows Fundamentals for SOC Analysts",
        minutes: 10,

        summary:
          "Baro qaybaha muhiimka ah ee Windows oo SOC analyst la xiriira: Task Manager, Event Viewer, Services iyo Registry.",

        sections: [
          {
            h: "Sababta Windows Muhiim U Yahay SOC-ga",
            p:
            "Shirkadaha badankood waxay isticmaalaan Windows desktops iyo servers, gaar ahaan Active Directory environments. SOC analyst-yadu waqti badan ayay ku qaataan baaritaanka Windows systems marka incident dhaco."
          },
          {
            h: "Task Manager & Resource Monitor",
            p:
            "Task Manager wuxuu muujiyaa processes, CPU/memory usage iyo startup programs. Resource Monitor wuxuu bixiyaa faahfaahin dheeraad ah oo ku saabsan network activity iyo disk usage per-process."
          },
          {
            h: "Event Viewer — Hordhac",
            p:
            "Event Viewer waa tool-ka ugu muhiimsan ee SOC analyst Windows-ka ku baaro. Wuxuu kaydiyaa Security, System, Application logs — kuwaas oo leh Event IDs gaar ah oo calaamadeeya dhacdo kasta."
          },
          {
            h: "Services & Registry — Hordhac",
            p:
            "Services.msc wuxuu muujiyaa background services-ka socda. Registry (regedit) waa database-ka Windows kaydiya configuration — malware badan wuxuu isticmaalaa Registry si uu ugu sii jiro system-ka (persistence)."
          }
        ],

        terms: [
          { term: "Task Manager", def: "Tool muujiya processes iyo resource usage." },
          { term: "Event Viewer", def: "Tool lagu eego Windows logs (Security, System, Application)." },
          { term: "Services.msc", def: "Console lagu maamulo Windows services." },
          { term: "Registry", def: "Database Windows kaydiya configuration iyo settings." }
        ],

        quiz: [
          {
            q: "Windows tool kee ayaa lagu eegaa Security, System iyo Application logs?",
            options: ["Task Manager", "Event Viewer", "Notepad", "Paint"],
            answer: 1,
            explain: "Event Viewer waa tool-ka aasaasiga ah ee lagu baaro Windows logs."
          },
          {
            q: "Registry sababta malware ay muhiim ugu tahay waa?",
            options: [
              "Waxaa lagu isticmaali karaa persistence (ugu sii jiritaanka system-ka)",
              "Waxay kordhisaa CPU speed",
              "Waxay noqotaa antivirus",
              "Waxay kaydisaa passwords oo keliya"
            ],
            answer: 0,
            explain: "Malware badan wuxuu isticmaalaa Registry run keys si uu ugu sii jiro system-ka dib u shidista kaddib."
          },
          {
            q: "Resource Monitor wuxuu bixiyaa faahfaahin dheeraad ah oo ku saabsan?",
            options: ["Network iyo disk activity per-process", "Wallpaper settings", "Keyboard language", "Screen resolution"],
            answer: 0,
            explain: "Resource Monitor wuxuu muujiyaa faahfaahin xogeed dheeri ah oo Task Manager ka sii qoto dheer."
          }
        ],

        exercise: {
          title: "Windows Tools Familiarization Lab",
          steps: [
            "Fur Task Manager, aqoonso 5 processes socda.",
            "Fur Event Viewer, eeg Security log-ka.",
            "Fur Services.msc, liis garee 5 services socda.",
            "Qor sharraxaad gaaban oo ku saabsan tool kasta iyo sida SOC analyst u isticmaali karo."
          ],
          deliverable: "Windows tools reference sheet."
        }
      },


      {
        slug: "windows-event-logs-ids",
        title: "Windows Event Logs & Event IDs",
        english: "Windows Event Logs and Key Event IDs",
        minutes: 12,

        summary:
          "Xifdiso Event IDs-ka ugu muhiimsan ee SOC analyst isticmaalo si uu u ogaado login activity, user changes iyo privilege changes.",

        sections: [
          {
            h: "Waa Maxay Event ID?",
            p:
            "Event ID waa lambar gaar ah oo Windows u siiyo dhacdo kasta oo la diiwaan geliyay. Event IDs waxay u oggolaadaan analyst inuu si degdeg ah u aqoonsado nooca dhacdada iyada oo aan la akhrin qoraal dheer."
          },
          {
            h: "Event IDs-ka Login-ka",
            p:
            "4624 = login guulaystay. 4625 = login guuldarraystay. 4634 = logoff. 4648 = login iyadoo la isticmaalayo credentials kale (mararka qaar caadi, laakiin waa in la baaraa). Sequence ah oo badan 4625 oo ay ku xigto hal 4624 waa brute force guuleystay."
          },
          {
            h: "Event IDs-ka Users & Groups",
            p:
            "4720 = user account cusub la abuuray. 4728 = user lagu daray group security-enabled global. 4732 = user lagu daray group local. 4672 = special privileges (admin rights) la siiyay login cusub. Kuwan waa red flags haddii aanay la fileynin."
          },
          {
            h: "Event IDs-ka Kale ee Muhiimka ah",
            p:
            "4688 = process cusub la abuuray (waxaa lagula xiriiraan command line auditing). 4697 = service cusub la rakibay. 1102 = security audit log la nadiifiyay (attacker-yadu waxay tirtiraan logs si ay u qariyaan calaamadooda)."
          },
          {
            h: "SOC Investigation Workflow",
            p:
            "Marka la baarayo suspected compromise, analyst-ku wuxuu marka hore filter gareeyaa Security log-ka Event IDs 4624/4625/4672/4720 si uu u dhisto timeline-ka login activity-ga."
          }
        ],

        terms: [
          { term: "Event ID 4624", def: "Login guulaystay." },
          { term: "Event ID 4625", def: "Login guuldarraystay." },
          { term: "Event ID 4672", def: "Special privileges (admin) la siiyay login cusub." },
          { term: "Event ID 4720", def: "User account cusub la abuuray." },
          { term: "Event ID 1102", def: "Security audit log la nadiifiyay — calaamad shaki leh." }
        ],

        quiz: [
          {
            q: "Event ID 4624 macnaheedu waa?",
            options: ["Login guulaystay", "Login guuldarraystay", "User la tirtiray", "Service la joojiyay"],
            answer: 0,
            explain: "4624 = successful logon; 4625 = failed logon."
          },
          {
            q: "Event ID 1102 sababta uu muhiim u yahay waa?",
            options: [
              "Wuxuu muujiyaa in security log la nadiifiyay — attackers waxay tirtiraan evidence",
              "Wuxuu muujiyaa update software",
              "Wuxuu muujiyaa backup guulaystay",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Attackers waxay tirtiraan logs si ay u qariyaan waxa ay sameeyeen — 1102 waa red flag weyn."
          },
          {
            q: "Event ID 4672 wuxuu muujiyaa?",
            options: [
              "Special privileges (admin rights) la siiyay login cusub",
              "Backup guulaystay",
              "Printer la xiray",
              "Wifi la xiray"
            ],
            answer: 0,
            explain: "4672 wuxuu la socdaa login-yada leh awood admin — muhiim in la baaro."
          },
          {
            q: "Sequence ah oo badan 4625 oo ay ku xigto 4624 isla account macnaheedu waa?",
            options: [
              "Brute force guuleystay",
              "Password la beddelay",
              "Update software",
              "Backup"
            ],
            answer: 0,
            explain: "Login guuldarro badan oo ay ku xigto guul waa calaamad caan ah oo brute force ah."
          }
        ],

        exercise: {
          title: "Event ID Reference Lab",
          steps: [
            "Fur Event Viewer → Windows Logs → Security.",
            "Filter Event ID 4624 iyo 4625, tirtir waxa aad aragto.",
            "Raadi Event ID 4720 (users cusub) haddii ay jiraan.",
            "Samee jaantus 8 Event IDs muhiimka ah iyo macnahooda."
          ],
          deliverable: "Windows Event ID reference sheet."
        }
      },


      {
        slug: "active-directory-fundamentals",
        title: "Active Directory Fundamentals",
        english: "Active Directory Fundamentals",
        minutes: 13,

        summary:
          "Faham sida Active Directory u maamusho users, computers iyo permissions shirkad dhexdeeda.",

        sections: [
          {
            h: "Waa Maxay Active Directory?",
            p:
            "Active Directory (AD) waa directory service Microsoft ah oo maamusha users, computers, groups iyo resources shabakad shirkadeed dhexdeeda. Ugu badan shirkadaha waaweyn waxay ku shaqeeyaan AD."
          },
          {
            h: "Domain Controller",
            p:
            "Domain Controller (DC) waa server maamula AD database-ka. Marka user-ku login gareeyo computer domain ku jira, DC-gu ayaa xaqiijiya credentials-ka."
          },
          {
            h: "Organizational Units iyo Group Policy",
            p:
            "Organizational Units (OUs) waxay u kala qaybiyaan users iyo computers si loo maamulo. Group Policy Objects (GPOs) waxay dejiyaan settings (security policies, software) si otomaatig ah loogu dabaqo users/computers OU gaar ah."
          },
          {
            h: "AD Attack Surface",
            p:
            "AD waa target aad muhiim ugu ah attackers — haddii Domain Controller la jebiyo, attacker-ku wuxuu heli karaa control buuxa shabakadda oo dhan. Sidaas darteed AD security waa mid aad muhiim ugu ah SOC."
          }
        ],

        terms: [
          { term: "Active Directory", def: "Directory service maamusha users, computers iyo resources." },
          { term: "Domain Controller", def: "Server maamula AD database-ka oo xaqiijiya login-yada." },
          { term: "OU", def: "Organizational Unit — qayb loo kala saaro users/computers AD." },
          { term: "GPO", def: "Group Policy Object — settings otomaatig loo dabaqo." }
        ],

        quiz: [
          {
            q: "Domain Controller shaqadiisu waa?",
            options: [
              "Xaqiijinta credentials iyo maamulka AD database",
              "Kaydinta email",
              "Sameynta websites",
              "Encrypt gareynta disk-ka"
            ],
            answer: 0,
            explain: "DC-gu wuxuu maamulaa authentication iyo AD data oo dhan."
          },
          {
            q: "Sababta Domain Controller uu target muhiim u yahay attackers waa?",
            options: [
              "Haddii la jebiyo, attacker wuxuu heli karaa control buuxa network-ka",
              "Wuxuu leeyahay CPU degdeg ah",
              "Wuxuu leeyahay storage badan",
              "Ma jiro sabab gaar ah"
            ],
            answer: 0,
            explain: "DC compromise = full domain compromise — 'crown jewel' ee network-ka."
          },
          {
            q: "GPO waxa ay sameeyaan?",
            options: [
              "Waxay dejiyaan settings otomaatig loo dabaqo users/computers",
              "Waxay kaydiyaan passwords",
              "Waxay noqdaan antivirus",
              "Waxay xakameeyaan CPU"
            ],
            answer: 0,
            explain: "GPOs waxay push-gareeyaan configuration iyo security policies si otomaatig ah."
          }
        ],

        exercise: {
          title: "Active Directory Concepts Review",
          steps: [
            "Sharax farqiga u dhexeeya AD user iyo AD computer object.",
            "Qor sababta Domain Controller uu muhiim u yahay security.",
            "Sharax tusaale GPO ah oo lagu adeegsan karo security (tusaale: password policy).",
            "Qor 3 sababood oo AD u yahay target caan ah attackers."
          ],
          deliverable: "Active Directory fundamentals notes."
        }
      },


      {
        slug: "kerberos-ntlm-authentication",
        title: "Authentication: Kerberos & NTLM",
        english: "Windows Authentication: Kerberos and NTLM",
        minutes: 15,

        summary:
          "Faham sida Windows authentication u shaqeeyo iyagoo isticmaalaya Kerberos iyo NTLM, iyo sababta ay muhiim ugu yihiin attack detection.",

        sections: [
          {
            h: "NTLM",
            p:
            "NTLM waa protocol authentication oo hore, oo weli la isticmaalo xaalado qaar. Waxay isticmaashaa challenge-response — mana isticmaasho encryption xoog leh sida Kerberos."
          },
          {
            h: "Kerberos",
            p:
            "Kerberos waa protocol authentication casri ah oo AD isticmaasho. Wuxuu isticmaalaa 'tickets' (TGT — Ticket Granting Ticket) halkii uu password kasta u diri lahaa network-ka."
          },
          {
            h: "Kerberos Process (Fudud)",
            p:
            "1) User wuxuu weydiistaa TGT Domain Controller-ka (KDC). 2) DC wuxuu bixiyaa TGT. 3) User wuxuu isticmaalaa TGT si uu u weydiisto service tickets adeegyada kale. Habkani wuxuu yareeyaa marar password la isticmaalo network-ka."
          },
          {
            h: "Sababta Analyst-ku U Fahmo Labadan",
            p:
            "Weerarro caan ah sida Pass-the-Hash (NTLM) iyo Kerberoasting/Golden Ticket (Kerberos) waxay ka faa'iidaystaan daciifnimooyinka labadan protocol. Fahamka sida ay u shaqeeyaan waa asaaska ogaanshaha weerarradan."
          }
        ],

        terms: [
          { term: "NTLM", def: "Protocol authentication oo hore, aan lahayn encryption xoog leh." },
          { term: "Kerberos", def: "Protocol authentication casri ah oo isticmaala tickets." },
          { term: "TGT", def: "Ticket Granting Ticket — ticket koowaad Kerberos bixiyo." },
          { term: "KDC", def: "Key Distribution Center — qeyb Domain Controller ah oo bixisa tickets." }
        ],

        quiz: [
          {
            q: "Kerberos wuxuu isticmaalaa halkii uu password mar walba u diri lahaa network-ka?",
            options: ["Tickets", "Passwords cad", "IP addresses", "MAC addresses"],
            answer: 0,
            explain: "Kerberos wuxuu isticmaalaa TGT iyo service tickets halkii password la iska diri lahaa."
          },
          {
            q: "NTLM marka la barbardhigo Kerberos waa?",
            options: [
              "Mid ka hooseeya security ahaan",
              "Mid ka horumarsan Kerberos",
              "Isku mid",
              "Ma la isticmaalo Windows"
            ],
            answer: 0,
            explain: "NTLM waa protocol hore oo aan lahayn encryption xoog u dhiganta Kerberos."
          },
          {
            q: "KDC waa qeyb ka mid ah?",
            options: ["Domain Controller", "User workstation", "Firewall", "Antivirus"],
            answer: 0,
            explain: "KDC (Key Distribution Center) wuxuu ku jiraa Domain Controller-ka."
          }
        ],

        exercise: {
          title: "Authentication Concepts Practice",
          steps: [
            "Sharax farqiga u dhexeeya NTLM iyo Kerberos.",
            "Qor talaabooyinka TGT process-ka Kerberos.",
            "Sharax sababta Kerberos loo tixgeliyo mid ka ammaan badan NTLM.",
            "Qor 2 weerar oo bartilmaameedsada authentication protocols-kan."
          ],
          deliverable: "Authentication protocols study notes."
        }
      },


      {
        slug: "windows-services-scheduled-tasks",
        title: "Windows Services & Scheduled Tasks",
        english: "Windows Services and Scheduled Tasks",
        minutes: 11,

        summary:
          "Baro sida services iyo scheduled tasks Windows u shaqeeyaan, iyo sida attackers ay u isticmaalaan persistence.",

        sections: [
          {
            h: "Windows Services",
            p:
            "Services waa programs background ku socda oo aan u baahnayn user interaction. Waxay bilaabmaan marka Windows shido. services.msc wuxuu muujiyaa liiska services-ka."
          },
          {
            h: "Scheduled Tasks",
            p:
            "Task Scheduler wuxuu u oggolaadaa programs inay si otomaatig ah ugu shaqeeyaan waqti la go'aamiyay ama dhacdo la go'aamiyay (tusaale: marka user login gareeyo)."
          },
          {
            h: "Persistence iyadoo la Adeegsanayo Services & Tasks",
            p:
            "Attackers waxay abuuraan services cusub ama scheduled tasks si ay malware-kooda ugu sii shaqeeyo dib u shidista kaddib. Service ama task magaciisu u eg yahay mid rasmi ah (tusaale: 'WindowsUpdateHelper') laakiin aan la aqoon waa red flag."
          },
          {
            h: "SOC Investigation",
            p:
            "Analyst-ku wuxuu baarayaa services/tasks cusub oo la abuuray dhawaanahan, oo fulinaya files ka socda meelo aan caadi ahayn sida %TEMP% ama AppData."
          }
        ],

        terms: [
          { term: "Windows Service", def: "Program background ku socda oo bilaabma marka Windows shido." },
          { term: "Task Scheduler", def: "Tool u oggolaanaya tasks inay otomaatig u shaqeeyaan." },
          { term: "Persistence", def: "Habka malware-ku ugu sii jiro system-ka dib u shidista kaddib." }
        ],

        quiz: [
          {
            q: "Service ama task magaciisu u eg yahay rasmi laakiin aan la aqoon waa?",
            options: [
              "Persistence suurtagal ah — u baahan baaritaan",
              "Caadi",
              "Update Windows",
              "Antivirus scan"
            ],
            answer: 0,
            explain: "Attackers waxay isticmaalaan magacyo iska dhigaya kuwo rasmi ah si ay u qariyaan malware."
          },
          {
            q: "Task Scheduler waxaa loo isticmaali karaa?",
            options: [
              "In malware si otomaatig ah ugu shaqeeyo waqti go'an",
              "In CPU la kordhiyo",
              "In files la tirtiro joogtada ah",
              "In screen la hagaajiyo"
            ],
            answer: 0,
            explain: "Attackers waxay isticmaalaan scheduled tasks si ay persistence u helaan."
          },
          {
            q: "Service ka socda %TEMP% ama AppData waa?",
            options: [
              "Shaki leh — meelahan waa temporary ama user-specific, ma aha meel caadi ah oo services rasmi ah ka socdaan",
              "Caadi ahaan",
              "Waa tusaale service rasmi ah",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Services rasmi ah waxay badanaa ka socdaan System32 — %TEMP%/AppData waa red flag."
          }
        ],

        exercise: {
          title: "Services & Tasks Investigation Lab",
          steps: [
            "Fur services.msc, liis garee 10 services.",
            "Fur Task Scheduler, eeg tasks-ka jira.",
            "Raadi services/tasks aan caadi ahayn oo magacooda cajiib ah.",
            "Qor go'aan: normal ama needs review."
          ],
          deliverable: "Services and tasks investigation report."
        }
      },


      {
        slug: "windows-registry-persistence",
        title: "Windows Registry & Persistence",
        english: "Windows Registry and Persistence Techniques",
        minutes: 14,

        summary:
          "Faham structure-ka Registry-ga iyo meelaha ugu caansan ee malware isticmaalo si uu ugu sii jiro system-ka.",

        sections: [
          {
            h: "Registry Structure",
            p:
            "Registry waxaa loo qaybiyaa hives sida HKEY_LOCAL_MACHINE (HKLM) iyo HKEY_CURRENT_USER (HKCU). Waxay kaydiyaan settings-ka system-ka, applications iyo users."
          },
          {
            h: "Run Keys — Meesha Ugu Caansan ee Persistence",
            p:
            "HKLM\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run iyo HKCU version-kiisu waa meelo caan ah oo malware ku dari karo programs si ay ugu shaqeeyaan mar kasta oo user login gareeyo."
          },
          {
            h: "Meelaha Kale ee Persistence",
            p:
            "Startup folder (shell:startup), Winlogon keys, iyo services registry entries waa dhammaantood meelo dheeraad ah oo persistence lagu sameeyo."
          },
          {
            h: "Tools SOC Isticmaalo",
            p:
            "Autoruns (Sysinternals) waa tool caan ah oo muujiya dhammaan meelaha programs otomaatig uga bilaabmi karaan — mid ka muhiimsan tools-ka SOC baaritaanka Windows."
          }
        ],

        terms: [
          { term: "Registry Hive", def: "Qayb weyn oo Registry ah sida HKLM ama HKCU." },
          { term: "Run Key", def: "Registry location caan ah oo persistence ah." },
          { term: "Autoruns", def: "Sysinternals tool muujiya dhammaan autostart locations." }
        ],

        quiz: [
          {
            q: "Registry Run Keys waxay caawiyaan?",
            options: [
              "Programs inay si otomaatig ah ugu shaqeeyaan login kasta",
              "Kordhinta CPU speed",
              "Kaydinta files",
              "Xiritaanka internet-ka"
            ],
            answer: 0,
            explain: "Run keys waa meel caan ah oo malware ku isticmaalo si uu ugu sii jiro."
          },
          {
            q: "Autoruns tool waxaa loo isticmaalaa?",
            options: [
              "In la muujiyo dhammaan autostart locations",
              "In la sameeyo backup",
              "In la beddelo password",
              "In la kordhiyo RAM"
            ],
            answer: 0,
            explain: "Autoruns wuxuu bixiyaa view guud oo dhammaan persistence mechanisms ah."
          },
          {
            q: "HKLM vs HKCU farqigoodu waa?",
            options: [
              "HKLM waa system-wide settings, HKCU waa settings user gaar ah",
              "Labaduba isku mid",
              "HKCU waa kaliya admin",
              "HKLM ma jirto Windows"
            ],
            answer: 0,
            explain: "HKLM wuxuu saameeyaa dhammaan users, HKCU wuxuu saameeyaa user hadda gelay oo keliya."
          }
        ],

        exercise: {
          title: "Registry Persistence Hunt",
          steps: [
            "Fur regedit oo aad u gudub Run key HKLM.",
            "Qor programs ku jira Run key-gaaga.",
            "Sharax cida ay kasta yihiin (caadi ama aan la garanayn).",
            "Sharax sida Autoruns tool uga fiican yahay eegista regedit gacanta."
          ],
          deliverable: "Registry persistence investigation notes."
        }
      },


      {
        slug: "powershell-for-soc",
        title: "PowerShell ee SOC Analyst-ka",
        english: "PowerShell for SOC Analysts",
        minutes: 12,

        summary:
          "Baro aasaaska PowerShell, cmdlets caan ah iyo sababta ay tahay hab caan ah oo attackers isticmaalaan.",

        sections: [
          {
            h: "Waa Maxay PowerShell?",
            p:
            "PowerShell waa shell iyo scripting language awood badan oo Windows ku dhex jira. Waxaa loo isticmaalaa maamulka system-ka, laakiin sidoo kale waa qalab caan ah oo attackers isticmaalaan (\\\"living off the land\\\")."
          },
          {
            h: "Cmdlets Aasaasiga ah",
            p:
            "Get-Process (liis processes), Get-Service (liis services), Get-EventLog (akhri logs), Get-ChildItem (liis files, u dhigma ls). PowerShell cmdlets waxay raacaan qaab Verb-Noun."
          },
          {
            h: "Sababta Attackers PowerShell Jecel Yihiin",
            p:
            "PowerShell wuxuu si toos ah ugala shaqeeyaa memory (fileless malware), wuxuu ku jiraa Windows kasta (aan la baahnayn install), waana mid awood badan. Encoded commands (-EncodedCommand) waxaa loo isticmaalaa in la qariyo waxa la fulinayo."
          },
          {
            h: "PowerShell Logging",
            p:
            "Script Block Logging iyo Module Logging (Event ID 4104) waxay muujiyaan waxa PowerShell command-yadu ku jiraan — muhiim ah in la dabo la yahay marka la baarayo malicious activity."
          }
        ],

        terms: [
          { term: "PowerShell", def: "Shell iyo scripting language awood badan oo Windows ku dhex jira." },
          { term: "Cmdlet", def: "Amar PowerShell ah oo raacaya qaab Verb-Noun." },
          { term: "Fileless Malware", def: "Malware ku shaqeeya memory-ga kaliya, aan file dhulka ku jirin lahayn." },
          { term: "Event ID 4104", def: "PowerShell Script Block Logging event." }
        ],

        quiz: [
          {
            q: "Sababta attackers PowerShell jecel yihiin waa?",
            options: [
              "Waxay awood u leedahay memory-ga si toos ah, kumana baahna install",
              "Waa mid aad u gaabis oo aan awood badnayn",
              "Kaliya waxaa loo isticmaali karaa websites",
              "Ma shaqeyso Windows kasta"
            ],
            answer: 0,
            explain: "PowerShell wuxuu u oggolaadaa fileless attacks iyo living-off-the-land techniques."
          },
          {
            q: "Event ID 4104 waxay la xiriirtaa?",
            options: ["PowerShell Script Block Logging", "Login guulaystay", "Firewall rule", "Backup"],
            answer: 0,
            explain: "4104 wuxuu diiwaan geliyaa waxa PowerShell script-yadu ku jiraan."
          },
          {
            q: "-EncodedCommand waxaa loo isticmaalaa?",
            options: [
              "In la qariyo waxa command-ka fulinayo",
              "In la kordhiyo speed",
              "In la sameeyo backup",
              "In la beddelo IP"
            ],
            answer: 0,
            explain: "Encoded commands waa qaab caan ah oo lagu qariyo scripts khaldan."
          }
        ],

        exercise: {
          title: "PowerShell Basics Practice",
          steps: [
            "Fur PowerShell, isticmaal Get-Process si aad u aragto processes.",
            "Isticmaal Get-Service si aad u aragto services.",
            "Baro Get-EventLog ama Get-WinEvent oo aqoonso syntax-kiisa.",
            "Sharax sababta encoded commands loo tixgeliyo shaki leh."
          ],
          deliverable: "PowerShell fundamentals practice sheet."
        }
      },


      {
        slug: "common-windows-ad-attacks",
        title: "Weerarrada Caanka ah ee Windows & AD",
        english: "Common Windows and Active Directory Attacks",
        minutes: 10,

        summary:
          "Faham weerarrada AD ugu caansan sida Pass-the-Hash, Kerberoasting iyo Golden Ticket — iyo sida loo ogaado.",

        sections: [
          {
            h: "Pass-the-Hash (PtH)",
            p:
            "Pass-the-Hash waa weerar attacker isticmaalo NTLM hash password-ka (halkii uu password cad u baahan lahaa) si uu isugu ekaysiiyo user kale. Wuxuu ka faa'iidaystaa daciifnimo NTLM ah."
          },
          {
            h: "Kerberoasting",
            p:
            "Kerberoasting waa weerar attacker weydiisto Kerberos service tickets accounts leh Service Principal Names (SPNs), kadibna offline u jebiyo (crack) password-ka hash-kiisa. Service accounts leh passwords daciif ah waa target ugu badan."
          },
          {
            h: "Golden Ticket",
            p:
            "Golden Ticket waa weerar heer sare ah oo attacker uu isticmaalo krbtgt account hash-kiisa si uu u sameeyo Kerberos tickets aan xadidan — awood buuxda oo domain-ka ah, xitaa passwords la beddelo."
          },
          {
            h: "Lateral Movement",
            p:
            "Marka attacker uu helo access mashiin hal ah, wuxuu isticmaalaa techniques (PtH, RDP, PsExec) si uu ugu gudbo systems kale network-ka gudihiisa — habkan waxaa loo yaqaan lateral movement."
          },
          {
            h: "Detection Signals",
            p:
            "SOC analyst wuxuu raadiyaa: Kerberos ticket requests badan oo aad u degdeg ah (Kerberoasting), Event ID 4769 oo isku celcelin badan, login-yo aan caadi ahayn admin accounts, iyo krbtgt password reset frequency."
          }
        ],

        terms: [
          { term: "Pass-the-Hash", def: "Weerar isticmaala NTLM hash halkii password cad." },
          { term: "Kerberoasting", def: "Weerar weydiista service tickets si loo jebiyo offline password service accounts." },
          { term: "Golden Ticket", def: "Weerar heer sare ah oo isticmaala krbtgt hash si loo helo awood buuxda domain-ka." },
          { term: "Lateral Movement", def: "Habka attacker uga gudbo mashiin kale network-ka gudihiisa." }
        ],

        quiz: [
          {
            q: "Pass-the-Hash wuxuu ka faa'iidaystaa?",
            options: [
              "Daciifnimo NTLM authentication ah",
              "Firewall misconfigurations",
              "Weak WiFi passwords",
              "Outdated antivirus"
            ],
            answer: 0,
            explain: "PtH wuxuu isticmaalaa NTLM hash halkii password cad loo baahnaa."
          },
          {
            q: "Kerberoasting wuxuu bartilmaameedsadaa?",
            options: [
              "Service accounts leh SPNs iyo passwords daciif ah",
              "Kaliya admin accounts",
              "Kaliya guest accounts",
              "Router hardware"
            ],
            answer: 0,
            explain: "Service accounts oo leh passwords daciif ah waa target ugu badan Kerberoasting."
          },
          {
            q: "Golden Ticket wuxuu isticmaalaa?",
            options: [
              "krbtgt account hash",
              "Firewall rules",
              "DNS records",
              "SSH keys"
            ],
            answer: 0,
            explain: "Golden Ticket wuxuu ka dhashaa krbtgt hash compromise, siinaya awood buuxda domain-ka."
          },
          {
            q: "Lateral movement waa maxay?",
            options: [
              "Habka attacker uga gudbo mashiin kale network-ka gudihiisa",
              "Beddelidda IP address",
              "Kordhinta RAM",
              "Sameynta backup"
            ],
            answer: 0,
            explain: "Attacker-yadu waxay isticmaalaan lateral movement si ay u gaaraan targets qaali ah sida Domain Controller-ka."
          }
        ],

        exercise: {
          title: "AD Attack Awareness Lab",
          steps: [
            "Sharax habka Pass-the-Hash ku shaqeeyo talaabo talaabo.",
            "Sharax sababta service accounts leh passwords daciif ah ay khatar u yihiin (Kerberoasting).",
            "Qor 3 detection signals SOC analyst uu raadin lahaa Kerberoasting.",
            "Sharax sababta Golden Ticket loo tixgeliyo weerar aad u halis ah."
          ],
          deliverable: "AD attack techniques study report."
        }
      },


      {
        slug: "windows-investigation-capstone-lab",
        title: "Windows Investigation — Full Capstone Lab",
        english: "Windows Investigation Capstone Lab",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee investigation buuxa oo Windows/AD environment ah oo laga yaabo in la jebiyay.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad hesha alert ah in user account admin ah uu leeyahay login habeenkii ah oo aan caadi ahayn, ka dibna user cusub oo lagu daray group-ka Domain Admins. Shaqadaadu waa inaad baarto oo aad go'aamiso saameynta."
          },
          {
            h: "Baaritaanka Talaabo Talaabo",
            p:
            "1) Event Viewer: filter Event ID 4624 admin account-ka si aad u aragto waqtiga login-ka iyo source IP. 2) Raadi Event ID 4720/4728 si aad u aragto user cusub iyo group changes. 3) Hubi Event ID 4672 (special privileges). 4) Raadi 1102 (log clearing) iyo 4104 (PowerShell activity shaki leh)."
          },
          {
            h: "Ururinta Evidence",
            p:
            "Qor waqtiga UTC ee dhacdo kasta, source IP, account-ka la isticmaalay iyo waxa la bedelay (group membership, permissions). Samee timeline cad."
          },
          {
            h: "Go'aan iyo Warbixin",
            p:
            "Ku dhammayso: waa privilege escalation dhab ah mise activity admin oo caadi ah (tusaale: maintenance window)? Haddii dhab ah tahay, qor talooyin containment: xir account-ka, dib-u-celi group membership, beddel krbtgt password (haddii Golden Ticket laga shakiyo)."
          }
        ],

        terms: [
          { term: "Privilege Escalation Investigation", def: "Baaritaan diiradda saaraya kordhinta awood aan la oggolayn." },
          { term: "Containment", def: "Joojinta faafitaanka incident-ka." }
        ],

        quiz: [
          {
            q: "Marka la baarayo user cusub oo lagu daray Domain Admins, tallaabada koowaad waa?",
            options: [
              "Ururi context: Event IDs 4624/4720/4728/4672 si loo dhiso timeline",
              "Isla markiiba tirtir account-ka aan wax baaritaan ah",
              "Iska dhaaf alert-ka",
              "Dami Domain Controller-ka"
            ],
            answer: 0,
            explain: "Marka hore waa in la fahmaa xaalada oo dhan ka hor tallaabo la qaado."
          },
          {
            q: "Event ID 1102 oo la arko investigation-ka dhexdiisa waa?",
            options: [
              "Red flag weyn — attacker laga yaabaa inuu tirtiray evidence",
              "Caadi",
              "Backup guulaystay",
              "Update Windows"
            ],
            answer: 0,
            explain: "Log clearing waa hab attackers isticmaalaan si ay u qariyaan waxa ay sameeyeen."
          },
          {
            q: "Haddii Golden Ticket laga shakiyo, tallaabo muhiim ah waa?",
            options: [
              "Beddelidda krbtgt password (labo jeer)",
              "Dib u shidid mashiin hal ah",
              "Tirtirid antivirus",
              "Xiritaanka DNS"
            ],
            answer: 0,
            explain: "krbtgt password reset (labo jeer si loo hubiyo) waa tallaabo caan ah oo lagu joojiyo Golden Ticket abuse."
          }
        ],

        exercise: {
          title: "Full Windows/AD Incident Investigation",
          steps: [
            "Isticmaal Event Viewer si aad u ururiso dhammaan Event IDs muhiimka ah (4624, 4625, 4672, 4720, 4728, 1102, 4104).",
            "Samee timeline UTC ah oo dhammaystiran.",
            "Go'aami: true positive (privilege escalation) ama false positive.",
            "Qor talooyin containment iyo eradication.",
            "Diyaari warbixin loo qoray maamulka (executive summary) iyo mid farsamo (technical detail)."
          ],
          deliverable: "Full Windows/AD incident investigation report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "m5",
    slug: "threats-malware-social-engineering",
    stage: "Dhexe",
    title: "Threats, Malware & Social Engineering",
    english: "Threats, Malware & Social Engineering",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa noocyada malware-ka, sida ransomware-ku u shaqeeyo, phishing/BEC/smishing, social engineering tactics iyo sida SOC analyst uga baaro dhacdooyinka la xiriira.",

    topics: [
      "Malware Fundamentals & Types",
      "Malware Behavior & Static/Dynamic Analysis Basics",
      "Ransomware Deep Dive",
      "Phishing Anatomy & Email Header Analysis",
      "Business Email Compromise (BEC)",
      "Smishing, Vishing & Mobile Fraud",
      "Social Engineering Tactics",
      "OSINT Awareness & Self-Protection",
      "Threats & Social Engineering Capstone Lab",
    ],

    lessonList: [

      {
        slug: "malware-fundamentals-types",
        title: "Aasaaska Malware & Noocyada",
        english: "Malware Fundamentals & Types",
        minutes: 13,

        summary:
          "Baro noocyada malware-ka, sida ay u kala shaqeeyaan iyo sababta SOC analyst uu u baahan yahay inuu kala saaro noocyadan.",

        sections: [
          {
            h: "Waa Maxay Malware?",
            p:
            "Malware (malicious software) waa barnaamij loo sameeyay si uu dhaawac u geysto, xog u xado, ama awood aan la oggolayn u helo system-ka. Malware kasta wuxuu leeyahay ujeeddo gaar ah — kuwaas oo aad muhiim ugu ah analyst-ka inuu kala saaro."
          },
          {
            h: "Virus, Worm iyo Trojan",
            p:
            "Virus wuxuu isku dhejiyaa files kale una baahan yahay in la fuliyo si uu u faafo. Worm wuxuu is-faafiyaa network-ka isagoo aan u baahnayn user interaction. Trojan wuxuu iska dhigayaa program wanaagsan halka gudaha uu leeyahay code khaldan."
          },
          {
            h: "Ransomware, Spyware iyo Rootkit",
            p:
            "Ransomware wuxuu encrypt-gareeyaa xogta oo lacag ka codsadaa furitaankeeda. Spyware/Infostealer wuxuu xadaa credentials, cookies iyo macluumaad kale oo shakhsi ah. Rootkit wuxuu isku qariyaa heerka kernel si uu uga fogaado ogaanshaha."
          },
          {
            h: "Botnet iyo C2",
            p:
            "Botnet agent wuxuu mashiinka ka dhigaa qayb ka mid ah network attacker-ku maamulo. Malware badan wuxuu la xiriiraa Command & Control (C2) server si uu amarro uga helo iyo xog u diro."
          }
        ],

        terms: [
          { term: "Worm", def: "Malware is-faafiya network-ga isagoo aan u baahnayn user interaction." },
          { term: "Trojan", def: "Malware iska dhigaya program wanaagsan." },
          { term: "Rootkit", def: "Malware isku qariya heerka kernel." },
          { term: "C2 (Command & Control)", def: "Server-ka weeraryahanka ee amarrada u dira malware-ka." }
        ],

        quiz: [
          {
            q: "Malware is-faafiya network-ga isagoo aan u baahnayn isticmaale waa?",
            options: ["Worm", "Trojan", "Adware", "Keylogger"],
            answer: 0,
            explain: "Worm-ku waa is-faafiye (self-propagating), Trojan-ku ma isku faafo."
          },
          {
            q: "Malware iska dhigaya program wanaagsan halka gudaha khaldan yahay waa?",
            options: ["Trojan", "Worm", "Rootkit", "Botnet"],
            answer: 0,
            explain: "Trojan wuxuu isku ekaysiiyaa program legit ah."
          },
          {
            q: "C2 server sababta uu muhiim u yahay waa?",
            options: [
              "Wuxuu bixiyaa amarro malware-ka una diraa xog attacker-ka",
              "Wuxuu ilaaliyaa antivirus-ka",
              "Wuxuu sameeyaa backup",
              "Wuxuu kordhiyaa RAM"
            ],
            answer: 0,
            explain: "C2 waa xariiqda isgaarsiinta ee malware-ka iyo attacker-ka."
          }
        ],

        exercise: {
          title: "Malware Type Classification",
          steps: [
            "Xulo 5 malware families oo caan ah (raadi internet-ka).",
            "Kala saar nooc kasta: virus, worm, trojan, ransomware, ama spyware.",
            "Qor sida nooc kasta u faafo iyo waxa uu ku dhaco.",
            "Sharax habka analyst-ku u kala saari lahaa noocyadan."
          ],
          deliverable: "Malware classification reference sheet."
        }
      },


      {
        slug: "malware-behavior-analysis-basics",
        title: "Malware Behavior & Basic Analysis",
        english: "Malware Behavior and Static/Dynamic Analysis Basics",
        minutes: 10,

        summary:
          "Faham farqiga static iyo dynamic analysis, iyo calaamadaha malware-ku badanaa muujiyo marka uu shaqeeyo.",

        sections: [
          {
            h: "Static vs Dynamic Analysis",
            p:
            "Static analysis waa baaritaanka file-ka iyada oo aan la fulinayn — hash, strings, metadata. Dynamic analysis waa fulinta malware-ka meel go'doonsan (sandbox/VM) si loo arko waxa uu sameeyo."
          },
          {
            h: "Indicators of Compromise (IOCs)",
            p:
            "IOCs waa calaamado la yaqaan oo muujin kara malware — file hashes (MD5, SHA256), IP addresses, domains, registry keys iyo mutex names. SOC analyst wuxuu isku dhufaya IOCs threat intel feeds si uu u ogaado haddii la aqoonsaday."
          },
          {
            h: "Sandbox Analysis",
            p:
            "Sandbox waa environment go'doonsan (VM ama tool sida Any.Run/Cuckoo) oo malware lagu fulin karo si khatar la'aan ah si loo arko network calls, file changes iyo registry modifications."
          },
          {
            h: "Behavioral Red Flags",
            p:
            "Process oo isku dayaya inuu is-qariyo (process hollowing), amarro PowerShell oo encoded ah, xiriirro C2 ah oo joogto ah, iyo files oo lagu kaydiyo %TEMP% waa dhammaantood calaamado shaki leh."
          }
        ],

        terms: [
          { term: "Static Analysis", def: "Baaritaanka file-ka iyada oo aan la fulinayn." },
          { term: "Dynamic Analysis", def: "Fulinta malware-ka meel go'doonsan si loo arko dhaqankiisa." },
          { term: "IOC", def: "Indicator of Compromise — calaamad la yaqaan oo malware muujisa." },
          { term: "Sandbox", def: "Environment go'doonsan oo lagu tijaabiyo malware." }
        ],

        quiz: [
          {
            q: "Farqiga static iyo dynamic analysis waa?",
            options: [
              "Static waa baaritaan aan fulin ahayn, dynamic waa fulinta malware-ka si loo daawado",
              "Isku mid",
              "Static waa mid khatar ah, dynamic waa mid ammaan ah",
              "Dynamic ma isticmaasho VM"
            ],
            answer: 0,
            explain: "Static-ku wuxuu eegaa file-ka; dynamic-ku wuxuu fuliyaa si loo arko dhaqanka."
          },
          {
            q: "Sandbox sababta loo isticmaalo waa?",
            options: [
              "Si malware loogu fulin karo meel go'doonsan oo aan halis gelinayn network dhabta ah",
              "Si loo kordhiyo CPU speed",
              "Si loo sameeyo backup",
              "Si loo beddelo IP address"
            ],
            answer: 0,
            explain: "Sandbox-ku wuxuu ilaaliyaa environment dhabta ah."
          },
          {
            q: "Process hollowing waa?",
            options: [
              "Habka malware-ku isugu qariyo process legit ah",
              "Backup process",
              "Update software",
              "Antivirus scan"
            ],
            answer: 0,
            explain: "Process hollowing waa technique defense evasion ah oo caan ah."
          }
        ],

        exercise: {
          title: "IOC Research Lab",
          steps: [
            "Xulo malware sample magaciisa (public threat report ka raadi, tusaale VirusTotal report).",
            "Qor 3 IOCs (hash, IP, ama domain) oo la xiriira.",
            "Sharax sida SOC analyst u isticmaali lahaa IOCs-kaas SIEM-ka.",
            "Qor 2 behavioral red flags oo aad ka akhrisay report-ka."
          ],
          deliverable: "IOC research notes."
        }
      },


      {
        slug: "ransomware-deep-dive",
        title: "Ransomware Deep Dive",
        english: "Ransomware Deep Dive",
        minutes: 12,

        summary:
          "Faham sida ransomware-ku u faafo, kill chain-kiisa iyo tallaabooyinka SOC-gu qaado marka uu dhaco.",

        sections: [
          {
            h: "Sida Ransomware-ku u Shaqeeyo",
            p:
            "Ransomware wuxuu ku bilaabmaa initial access (phishing, RDP brute force, ama vulnerability exploitation), wuxuu ku sii socdaa lateral movement, wuxuu tirtiraa backups, kadibna encrypt-gareeyaa files-ka oo codsadaa lacag (ransom) furitaankeeda."
          },
          {
            h: "Double Extortion",
            p:
            "Ransomware casriga ah wuxuu isticmaalaa 'double extortion' — xogta ka hor inta aan la encrypt-gareyn, waxaa la xaday. Haddii shirkaddu diido inay bixiso, attacker-ku wuxuu ku hanjabaa inuu xogta si guud u daabaco."
          },
          {
            h: "Calaamadaha Hore",
            p:
            "Ka hor encryption-ka, waxaa jira calaamado: backup deletion commands (vssadmin delete shadows), disabling antivirus, mass file access oo degdeg ah, iyo lateral movement oo aad u badan waqti gaaban gudahood."
          },
          {
            h: "SOC Response",
            p:
            "Haddii ransomware la ogaado inuu bilaabmayo, tallaabada ugu degdegsan waa containment — go'doomi host-yada saameeyay (network isolation) si loo joojiyo faafitaanka ka hor inta uusan gaarin systems kale."
          }
        ],

        terms: [
          { term: "Double Extortion", def: "Ransomware xog ka xadaya ka hor inta uusan encrypt-gareyn, ku hanjabaya daabacaad." },
          { term: "Shadow Copies", def: "Backup-yada Windows ee ransomware-ku badanaa tirtiro." },
          { term: "Initial Access", def: "Tallaabada ugu horreysa ee attacker galo network-ka." }
        ],

        quiz: [
          {
            q: "Double extortion macnaheedu waa?",
            options: [
              "Xog la xaday oo lagu hanjabo daabacaad, marka lagu daro encryption",
              "Labo malware oo isku mar shaqeeya",
              "Lacag laba jeer la bixiyo",
              "Backup laba jeer la sameeyo"
            ],
            answer: 0,
            explain: "Ransomware casriga ah wuxuu isticmaalaa labo cadaadis: encryption + xog daabacaad."
          },
          {
            q: "vssadmin delete shadows command-ku wuxuu tirtiraa?",
            options: [
              "Windows backup shadow copies",
              "Antivirus definitions",
              "Network drivers",
              "User accounts"
            ],
            answer: 0,
            explain: "Ransomware wuxuu tirtiraa shadow copies si loo joojiyo dib-u-celinta xogta."
          },
          {
            q: "Tallaabada ugu degdegsan marka ransomware la ogaado waa?",
            options: [
              "Containment — go'doomi host-yada saameeyay",
              "Bixi lacagta ransom-ka",
              "Sug ilaa maalinta xigta",
              "Tirtir dhammaan logs"
            ],
            answer: 0,
            explain: "Joojinta faafitaanka ayaa mudnaanta koowaad."
          }
        ],

        exercise: {
          title: "Ransomware Tabletop Exercise",
          steps: [
            "Sheeko: file server ayaa la arkay files badan oo si degdeg ah la beddelay (extensions cusub).",
            "Qor 5 tallaabo oo aad qaadi lahayd saacadda 1-aad.",
            "Sharax sababta aan la bixin lahayn ransom-ka isla markiiba.",
            "Qor cida la ogeysiinayo (IT, maamul, sharci)."
          ],
          deliverable: "Ransomware incident response plan (1 bog ah)."
        }
      },


      {
        slug: "phishing-anatomy-header-analysis",
        title: "Phishing Anatomy & Email Header Analysis",
        english: "Phishing Anatomy and Email Header Analysis",
        minutes: 13,

        summary:
          "Baro calaamadaha phishing email-ka iyo sida loo falanqeeyo headers si loo xaqiijiyo asalka email-ka.",

        sections: [
          {
            h: "Calaamadaha Phishing",
            p:
            "Degdeg iyo cabsi ('account-kaaga waa la xiraya'), salaan guud ('Dear Customer'), display name khiyaano ah, link-yo qariya URL dhabta ah, attachments (.html, .iso, .zip), khaladaad luqadeed, codsi lacag ama gift cards."
          },
          {
            h: "SPF, DKIM iyo DMARC",
            p:
            "SPF wuxuu hubiyaa in server-ku xaq u leeyahay inuu u diro email domain-kaas. DKIM wuxuu isticmaalaa digital signature. DMARC wuxuu qeexayaa siyaasadda haddii labadaas ku dhacaan. 'spf=fail dkim=none dmarc=fail' waa calaamad weyn oo shaki leh."
          },
          {
            h: "Falanqaynta Link-yada",
            p:
            "Waligaa ha gujin link-ga. Fiiri domain-ka dhabta ah ee ka horreeya '/' saddexaad — bank.so.login-secure.xyz domain-kiisu waa login-secure.xyz, ma aha bank.so. Isticmaal URLScan.io ama VirusTotal si aad u falanqeyso links si ammaan ah."
          },
          {
            h: "Return-Path iyo Received Chain",
            p:
            "Eeg Return-Path iyo From header — ma isku mid baa? Received chain-ka wuxuu muujinayaa server-yada dhab ah ee email-ku maray."
          }
        ],

        terms: [
          { term: "SPF", def: "Hubinta in server-ku uu xaq u leeyahay inuu u diro email domain-kaas." },
          { term: "DKIM", def: "Digital signature lagu xaqiijiyo email-ka." },
          { term: "DMARC", def: "Siyaasadda sheegaysa waxa lagu sameeyo email SPF/DKIM ku dhacay." },
          { term: "Display Name Spoofing", def: "Magaca la muujiyo oo been ah, laakiin email-ku waa mid kale." }
        ],

        quiz: [
          {
            q: "Domain-kee ayaa dhabta ah ee URL-kan: https://bank.so.login-secure.xyz/verify ?",
            options: ["bank.so", "login-secure.xyz", "verify", "https"],
            answer: 1,
            explain: "Domain-ka dhabta ah waa labada qaybood ee ugu dambeeya: login-secure.xyz."
          },
          {
            q: "Header-kee ayaa muujinaya natiijada SPF/DKIM?",
            options: ["Subject", "Authentication-Results", "MIME-Version", "Content-Type"],
            answer: 1,
            explain: "Authentication-Results wuxuu muujiyaa spf=, dkim=, dmarc=."
          },
          {
            q: "'spf=fail dkim=none dmarc=fail' waa?",
            options: [
              "Calaamad weyn oo phishing suurtagal ah",
              "Caadi",
              "Update software",
              "Backup guulaystay"
            ],
            answer: 0,
            explain: "Guuldarrooyinka authentication oo dhan ay wada dhacaan waa red flag weyn."
          },
          {
            q: "Habka ugu ammaan ah ee link phishing la falanqeeyo waa?",
            options: [
              "Isticmaal URLScan.io ama VM go'doonsan, hana gujinin toos ahaan",
              "Gujii link-ga si degdeg ah",
              "U dir email-ka jawaab",
              "Iska dhaaf oo dib u eeg"
            ],
            answer: 0,
            explain: "Waligaa ha gujin links-ka phishing-ka lagu shakiyo si toos ah."
          }
        ],

        exercise: {
          title: "Phishing Email Triage",
          steps: [
            "Qaado email tusaale ah oo phishing ah.",
            "Soo saar: sender, Return-Path, SPF/DKIM/DMARC, links, attachments.",
            "Go'aami: phishing / spam / legit.",
            "Qor talooyin: block sender, delete, isticmaale la baro."
          ],
          deliverable: "Phishing triage report (1 bog ah)."
        }
      },


      {
        slug: "business-email-compromise",
        title: "Business Email Compromise (BEC)",
        english: "Business Email Compromise",
        minutes: 15,

        summary:
          "Faham sida BEC scams u shaqeeyaan iyo sababta ay khasaare weyn ku yihiin shirkadaha.",

        sections: [
          {
            h: "Waa Maxay BEC?",
            p:
            "Business Email Compromise (BEC) waa khiyaano email shirkadeed lagu doonayo lacag wareejin. Attacker-ku wuxuu iska dhigaa madax sare (CEO/CFO) ama supplier oo dalbanaya wareejin lacag oo degdeg ah."
          },
          {
            h: "Nooca BEC",
            p:
            "CEO Fraud (madaxa oo email diraya finance-ka), Invoice Fraud (supplier been ah oo beddelay account bank), Attorney Impersonation (iska dhigid qareen si loo saameeyo cadaadis). BEC badankood ma isticmaalo malware — waa khiyaano bini'aadmi ah oo kaliya."
          },
          {
            h: "Sababta BEC uu Khatar u Yahay",
            p:
            "BEC ma bartilmaameedsado technical vulnerabilities — waxay bartilmaameedsataa dabeecadda user-ka: cabsi, degdeg iyo caqiido authority. Sidaas darteed email filters-yadu badanaa ma qabtaan (ma jiraan malware ama links)."
          },
          {
            h: "Difaaca",
            p:
            "Xaqiijin channel kale ah (wicitaan lambar rasmi ah, ha ku jawaabin email-ka). Nidaam cad oo lacag wareejin ah oo u baahan laba qof (dual approval). Ka digtoonow codsiyada degdeg ah ee lacag."
          }
        ],

        terms: [
          { term: "BEC", def: "Khiyaano email shirkadeed lagu doonayo lacag wareejin." },
          { term: "CEO Fraud", def: "BEC nooc ah oo iska dhigaya madax sare." },
          { term: "Out-of-band Verification", def: "Xaqiijin channel kale ah oo ka duwan email-ka la helay." }
        ],

        quiz: [
          {
            q: "BEC badankeedu waxay isticmaashaa?",
            options: [
              "Khiyaano bini'aadmi ah, ma isticmaasho malware",
              "Malware casri ah",
              "Ransomware",
              "DDoS attacks"
            ],
            answer: 0,
            explain: "BEC waxay ku salaysan tahay khiyaano iyo cadaadis, ma aha technical exploit."
          },
          {
            q: "Difaaca ugu wanaagsan ee BEC waa?",
            options: [
              "Xaqiijin channel kale ah (wicitaan lambar la yaqaan)",
              "Si dhakhso ah u sameyso amarka madaxa",
              "U dir email-ka IT-ga oo sug",
              "Ku dar madaxa CC"
            ],
            answer: 0,
            explain: "Out-of-band verification ayaa joojisa BEC intooda badan."
          },
          {
            q: "Sababta email filters-yadu aanay si fiican ugu qaban BEC waa?",
            options: [
              "BEC ma leh malware ama links shaki leh",
              "BEC waa mid casri ah oo aan la ogaan karin",
              "BEC waligeed lama ogaan karo",
              "Filters-yadu ma shaqeeyaan"
            ],
            answer: 0,
            explain: "BEC waa qoraal fiican oo aan lahayn technical indicators caadiga ah."
          }
        ],

        exercise: {
          title: "BEC Scenario Analysis",
          steps: [
            "Akhri tusaale email BEC ah (samee mid tusaale ah).",
            "Aqoonso calaamadaha BEC-ga (degdeg, authority, secrecy).",
            "Qor sida aad u xaqiijin lahayd codsiga ka hor inaad falceliso.",
            "Naqshadee policy gaaban oo lacag wareejin ku saabsan."
          ],
          deliverable: "BEC awareness brief."
        }
      },


      {
        slug: "smishing-vishing-mobile-fraud",
        title: "Smishing, Vishing & Mobile Fraud",
        english: "Smishing, Vishing and Mobile-Based Fraud",
        minutes: 11,

        summary:
          "Baro khiyaamooyinka SMS iyo wicitaanka telefoonka, gaar ahaan kuwa la xiriira mobile money.",

        sections: [
          {
            h: "Smishing",
            p:
            "SMS sheegaya 'Waxaad ku guulaysatay abaalmarin' ama 'Lacag qalad ah ayaa laguu diray, fadlan celi'. Xeeladda 'reverse transfer' waa mid caan ah oo bulshada Soomaaliyeed saameeya — waxay sheegaan inay lacag khalad ku direen, adna waad celisaa, laakiin lacagtii hore weligeed ma iman."
          },
          {
            h: "Vishing",
            p:
            "Wicitaan ka yimid 'adeegga macmiilka' oo ku weydiinaya PIN-kaaga ama code-ka SMS. Xeer: shirkad dhab ah waligeed kuma weydiiso PIN ama OTP. OTP la wadaago = account la waayay."
          },
          {
            h: "Mobile Money Fraud",
            p:
            "Attacker-yadu waxay bartilmaameedsadaan agents-ka iyo users-ka mobile money adigoo iska dhigaya adeegga rasmiga ah. SIM swap waa nooc kale oo weerar ah oo lagu xado lambarka telefoonka si loo helo SMS codes."
          },
          {
            h: "Sida loo Warbixiyo iyo loo Ilaaliyo",
            p:
            "Kaydso screenshot, lambarka, waqtiga iyo transaction ID. La xiriir shirkadda adeegga isla markiiba, xannib lambarka, oo ka digniin qoyska."
          }
        ],

        terms: [
          { term: "Smishing", def: "Phishing SMS ah." },
          { term: "Vishing", def: "Phishing telefoon wicitaan ah." },
          { term: "SIM Swap", def: "Weerar lagu xado lambarka telefoonka si loo helo SMS codes." },
          { term: "OTP", def: "Code hal mar la isticmaalo — waligaa ha wadaagin." }
        ],

        quiz: [
          {
            q: "Qof wuxuu ku leeyahay 'lacag khalad ah ayaan kuu diray, fadlan celi'. Maxaad samaynaysaa?",
            options: [
              "Hubi taariikhda transaction-kaaga oo la xiriir shirkadda adeegga",
              "Isla markiiba celi",
              "U dir lacag dheeraad ah",
              "U dir PIN-kaaga si ay u hubiyaan"
            ],
            answer: 0,
            explain: "Xaqiiji rasiidka rasmiga ah — reverse-transfer scam waa mid caan ah."
          },
          {
            q: "SIM swap waxay attacker-ka siisaa?",
            options: [
              "Awood uu ku helo SMS codes-ka user-ka",
              "Awood uu ku helo email-ka",
              "Awood uu ku helo computer-ka",
              "Awood uu ku helo bank card-ka"
            ],
            answer: 0,
            explain: "SIM swap wuxuu u oggolaadaa attacker inuu helo OTP/SMS verification."
          },
          {
            q: "Shirkad rasmi ah ma weydiiso?",
            options: ["PIN ama OTP marnaba", "Magacaaga", "Email-kaaga", "Lambarkaaga account"],
            answer: 0,
            explain: "PIN/OTP waa xog aan la wadaagi karin — shirkad rasmi ah kuma weydiiso."
          }
        ],

        exercise: {
          title: "Mobile Fraud Awareness",
          steps: [
            "Ka soo ururi 2-3 tusaale SMS/wicitaan khiyaano ah oo la yaqaan.",
            "Aqoonso xeeladda cadaadiska ee la isticmaalay (degdeg, cabsi, faa'iido).",
            "Qor jawaab ammaan ah oo la gaarsiin karo bulshada.",
            "Naqshadee poster ama post gaaban oo wacyi gelin ah."
          ],
          deliverable: "Mobile fraud awareness poster/notes."
        }
      },


      {
        slug: "social-engineering-tactics",
        title: "Social Engineering Tactics",
        english: "Social Engineering Tactics",
        minutes: 14,

        summary:
          "Faham xeeladaha social engineering-ka iyo sababta uu ku guuleysto isagoo aan isticmaalin technical exploits.",

        sections: [
          {
            h: "Pretexting iyo Authority",
            p:
            "Pretexting waa sheeko been ah oo lagu kalsoonigeliyo qofka (tusaale: 'Waxaan ka soo wacayaa IT department'). Authority waa iska dhigidda madax ama qof awood leh si dadka ay u fuliyaan amar aan la su'aalin."
          },
          {
            h: "Baiting iyo Quid Pro Quo",
            p:
            "Baiting waa USB la iska daayo meel la arki karo (magaciisu wuxuu yahay 'Salary_2026.xlsx') si dadka ay u geliyaan computer-kooda. Quid pro quo waa 'adeeg beddelkiis' — attacker-ku wuxuu bixiyaa caawimaad si uu wax uga helo."
          },
          {
            h: "Tailgating iyo Urgency/Scarcity",
            p:
            "Tailgating waa ku daba galida albaabka ammaanka qof kale iyada oo aan badge la haysan. Urgency iyo scarcity waa isticmaalka waqti xaddidan ('24 saac oo keliya') si loo joojiyo fikirka fiican ee dadka."
          },
          {
            h: "OSINT ee Social Engineering-ka",
            p:
            "Weerarka wuxuu ku bilaabmaa cilmi-baaris: LinkedIn (magacyada iyo jagooyinka), Facebook (asxaabta, taariikhda dhalashada), website-ka shirkadda (email format), sawirro (badge, screen). Macluumaadkan waxaa loo isticmaalaa pretext dhab u eg."
          },
          {
            h: "Culture Ammaan Ah",
            p:
            "Culture wanaagsan waa mid ay qofka soo sheega qalad lagu ammaano, lama canaanto — sababta oo ah cabsida canaanashada waxay keeni kartaa in incidents aan la sheegin."
          }
        ],

        terms: [
          { term: "Pretexting", def: "Sheeko been ah oo lagu kalsoonigeliyo qofka." },
          { term: "Tailgating", def: "Ku daba galida albaabka ammaanka qof kale." },
          { term: "Baiting", def: "USB ama qalab la iska daayo si dadka loo sasabo." },
          { term: "OSINT", def: "Macluumaad furan oo laga ururiyo internet-ka." }
        ],

        quiz: [
          {
            q: "Pretexting waa maxay?",
            options: [
              "Sheeko been ah oo lagu kalsoonigeliyo qofka",
              "Malware nooc ah",
              "Firewall rule",
              "Backup technique"
            ],
            answer: 0,
            explain: "Pretexting waa scenario been ah oo loo sameeyo si loo helo kalsooni."
          },
          {
            q: "Urgency iyo scarcity waxay ku saameeyaan?",
            options: [
              "Fikirka fiican ee qofka, iyagoo cadaadin ku sameeya inuu si degdeg ah u falceliyo",
              "CPU-ga computer-ka",
              "Firewall rules",
              "Network bandwidth"
            ],
            answer: 0,
            explain: "Cadaadiska waqtiga wuxuu joojiyaa fikirka taxadarka leh."
          },
          {
            q: "Sababta culture ammaan ah muhiim u tahay waa?",
            options: [
              "Si dadka aan uga baqin inay soo sheegaan qaladaadka",
              "Si loo canaanto dadka",
              "Si loo yareeyo shaqaalaha",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Cabsida canaanashada waxay keeni kartaa in incidents la qariyo."
          }
        ],

        exercise: {
          title: "Social Engineering Self-Assessment",
          steps: [
            "Isku raadi magacaaga Google iyo social media.",
            "Qor macluumaadka weeraryahan uu isticmaali karo si uu pretext dhab u eg u sameeyo.",
            "Beddel privacy settings-ka oo dib u qiimee.",
            "Qor liis ah waxa aad qarisay iyo sababta."
          ],
          deliverable: "OSINT self-assessment report."
        }
      },


      {
        slug: "osint-awareness-self-protection",
        title: "OSINT Awareness & Self-Protection",
        english: "OSINT Awareness and Self-Protection",
        minutes: 12,

        summary:
          "Faham sida OSINT-ka loo isticmaalo weerarka iyo sida shakhsi ahaaneed loo ilaaliyo xogta.",

        sections: [
          {
            h: "OSINT ee Weerarka",
            p:
            "Attacker-yadu waxay isticmaalaan OSINT si ay u aqoonsadaan targets (employees, roles, technology stack), u fahmaan qaab-dhismeedka shirkadda, una helaan macluumaad shakhsi ah oo lagu dhisi karo pretext."
          },
          {
            h: "Meelaha Macluumaadka Laga Helo",
            p:
            "LinkedIn (jagooyinka, colleagues), job postings (technology stack), company website (email format, org chart), social media (personal details, travel plans), iyo public records."
          },
          {
            h: "Digital Footprint Reduction",
            p:
            "Yaree waxa aad si guud u soo bandhigto. Hubi privacy settings-ka social media. Ka fikir waxa profile-kaaga sheegayo ku saabsan xilkaaga iyo tools-ka aad isticmaasho."
          },
          {
            h: "Corporate OSINT Hygiene",
            p:
            "Shirkadaha waxay u baahan yihiin inay xaddidaan macluumaadka la daabaco (email format, org structure), oo ay tababaraan shaqaalaha inay ka digtoonaadaan waxa ay bandhigaan."
          }
        ],

        terms: [
          { term: "Digital Footprint", def: "Macluumaadka guud ee laga heli karo shakhsi ka jira internet-ka." },
          { term: "Attack Surface (Human)", def: "Macluumaadka bini'aadmiga ah ee la isticmaali karo weerar." }
        ],

        quiz: [
          {
            q: "Attacker-yadu OSINT ugu isticmaalaan?",
            options: [
              "In ay aqoonsadaan targets una dhisaan pretext dhab u eg",
              "In ay sameeyaan malware",
              "In ay beddelaan firewall rules",
              "In ay kordhiyaan RAM"
            ],
            answer: 0,
            explain: "OSINT waa tallaabada reconnaissance ee ugu horreysa."
          },
          {
            q: "Job postings ay muujin karaan attacker-ka?",
            options: [
              "Technology stack-ka shirkadda",
              "Passwords-ka users-ka",
              "IP addresses gaar ah",
              "Bank account numbers"
            ],
            answer: 0,
            explain: "Job postings badanaa waxay sheegaan tools-ka shirkaddu isticmaasho."
          },
          {
            q: "Digital footprint reduction waxay caawisaa?",
            options: [
              "Yareynta macluumaadka attacker-ku isticmaali karo",
              "Kordhinta CPU",
              "Kordhinta internet speed",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "In yar oo la soo bandhigo ayaa ka dhigaya pretexting mid ka adag."
          }
        ],

        exercise: {
          title: "Corporate OSINT Hygiene Review",
          steps: [
            "Dooro shirkad tusaale ah (ama mid aad taqaan).",
            "Raadi 5 macluumaad OSINT oo laga heli karo public-ka (job postings, LinkedIn, iwm).",
            "Sharax sida macluumaadkaas loo isticmaali karo pretext.",
            "Soo jeedi 3 talooyin loo yareeyo exposure-ka."
          ],
          deliverable: "OSINT hygiene assessment."
        }
      },


      {
        slug: "threats-social-engineering-capstone",
        title: "Threats & Social Engineering — Capstone Lab",
        english: "Threats and Social Engineering Capstone Lab",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee investigation buuxa oo phishing-to-ransomware incident ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Shaqaale ayaa furay email phishing ah oo leh attachment. Ka dib, endpoint-kiisa waxaa laga arkay PowerShell activity aan caadi ahayn, kadibna files server-ka shirkadda waxaa la arkay oo la encrypt-gareeyay."
          },
          {
            h: "Baaritaanka Talaabo Talaabo",
            p:
            "1) Falanqee email-ka phishing-ka ahaa: headers, sender, attachment. 2) Baar endpoint-ka: processes, PowerShell logs (Event ID 4104). 3) Raadi lateral movement iyo shadow copy deletion. 4) Xaqiiji server-ka la encrypt-gareeyay iyo baaxadda saameynta."
          },
          {
            h: "Kill Chain Mapping",
            p:
            "Map dhacdada ATT&CK kill chain: Initial Access (phishing) → Execution (macro/PowerShell) → Defense Evasion → Lateral Movement → Impact (ransomware encryption)."
          },
          {
            h: "Go'aan iyo Warbixin",
            p:
            "Diyaari warbixin buuxda oo leh: timeline UTC, IOCs (email sender, hash, C2 IP), scope (hosts/users saameeyay), containment steps la qaaday, iyo talooyin ka hortagga mustaqbalka (email filtering, MFA, backup testing)."
          }
        ],

        terms: [
          { term: "Kill Chain Mapping", def: "Habka dhacdo loogu qaybiyo tallaabooyinka ATT&CK ee weerarka." },
          { term: "Scope", def: "Baaxadda saameynta incident-ka (hosts, users, xog)." }
        ],

        quiz: [
          {
            q: "Marka phishing → ransomware la baarayo, tallaabada koowaad waa?",
            options: [
              "Falanqaynta email-ka asalka ah iyo attachment-ka",
              "Isla markiiba bixinta ransom-ka",
              "Tirtirid dhammaan files-ka",
              "Iska indho tirid alert-ka"
            ],
            answer: 0,
            explain: "Waa in la fahmaa asalka weerarka ka hor la baaro saameynta."
          },
          {
            q: "Kill chain mapping wuxuu caawiyaa?",
            options: [
              "Fahamka sida weerarku talaabo talaabo ugu dhacay",
              "Kordhinta RAM",
              "Sameynta backup",
              "Beddelidda password"
            ],
            answer: 0,
            explain: "Kill chain-ku wuxuu muujiyaa dhacdada laga bilaabo initial access ilaa impact."
          },
          {
            q: "Warbixinta ugu dambaysa waa in ay ku darto?",
            options: [
              "Timeline, IOCs, scope, containment iyo talooyin ka hortag",
              "Kaliya magaca shaqaalaha khaldamay",
              "Kaliya lacagta la lumiyay",
              "Ma jiro waxa lagu daraa"
            ],
            answer: 0,
            explain: "Warbixin dhamaystiran waxay u baahan tahay dhammaan qaybahan si loo hagaajiyo mustaqbalka."
          }
        ],

        exercise: {
          title: "Full Phishing-to-Ransomware Investigation",
          steps: [
            "Falanqee email tusaale ah oo phishing ah (headers, links, attachment).",
            "Sameey timeline UTC ah oo bilaabma email-ka ilaa ransomware-ka.",
            "Map dhacdada ATT&CK kill chain-ka.",
            "Qor scope-ka saameynta iyo containment steps.",
            "Diyaari warbixin dhamaystiran oo executive summary iyo technical detail leh (portfolio-ready)."
          ],
          deliverable: "Full incident investigation report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "m6",
    slug: "soc-operations-alert-triage",
    stage: "Sare",
    title: "Hawlgalka SOC & Alert Triage",
    english: "SOC Operations & Alert Triage",
    hours: 1,

    outcome:
      "Waxaad fahmi doontaa qaab-dhismeedka SOC-ga, workflow-ga triage-ga, MITRE ATT&CK, documentation iyo metrics-ka lagu qiimeeyo SOC performance.",

    topics: [
      "SOC Structure & Tiers",
      "Alert Triage Workflow",
      "MITRE ATT&CK Framework",
      "Ticketing & Documentation",
      "SOC Metrics & KPIs",
      "SOC Tools Ecosystem",
      "SOC Triage Capstone Lab",
    ],

    lessonList: [

      {
        slug: "soc-structure-tiers",
        title: "Qaab-dhismeedka SOC & Tiers",
        english: "SOC Structure and Analyst Tiers",
        minutes: 10,

        summary:
          "Faham sida SOC-gu u dhisan yahay, doorka Tier 1/2/3 iyo maalinta shaqo ee analyst-ka.",

        sections: [
          {
            h: "Qaab-dhismeedka SOC",
            p:
            "Tier 1 (triage — alerts, hubinta bilowga ah), Tier 2 (baaris qoto dheer), Tier 3/Threat Hunter (raadin firfircoon), Incident Responder, SOC Manager, Detection Engineer. SOC badan waxay shaqeeyaan 24/7 shifts ah."
          },
          {
            h: "Maalinta Tier 1",
            p:
            "Bilow shift handover — akhri waxa dhacay shift-kii hore. Eeg alert queue-ga, ka bilow severity sare. Waqti ahaan, ha ku hafan hal alert — SLA ayaa jira oo waqti xaddidan leh."
          },
          {
            h: "Escalation Path",
            p:
            "Tier 1 wuxuu u gudbiyaa Tier 2 haddii alert-ku u baahan yahay baaris dheeraad ah. Tier 2 wuxuu u gudbiyaa Incident Response Team haddii la xaqiijiyo incident dhab ah. Fahamka escalation path-ka waa muhiim si aan waqti loo lumin."
          },
          {
            h: "24/7 Shift Coverage",
            p:
            "SOC-yada waaweyn waxay u qaybiyaan shifts si ay u ilaaliyaan monitoring joogto ah. Follow-the-sun model-ku wuxuu isticmaalaa teams ku yaal timezone kala duwan si loo hubiyo coverage 24 saac ah."
          }
        ],

        terms: [
          { term: "Triage", def: "Kala saarista alerts-ka: waxa muhiimka ah iyo waxa aan ahayn." },
          { term: "SLA", def: "Waqtiga la ballanqaaday ee lagu jawaabo alert." },
          { term: "Escalation", def: "U gudbinta arrin heer sare (Tier 2/3)." },
          { term: "Follow-the-Sun", def: "Qaab SOC coverage ah oo isticmaala teams timezone kala duwan." }
        ],

        quiz: [
          {
            q: "Waa maxay shaqada ugu weyn ee Tier 1 analyst?",
            options: [
              "Triage alerts, ururi context, go'aami true/false positive",
              "Dib u dhis network-ga",
              "Qor malware",
              "Maamul miisaaniyadda"
            ],
            answer: 0,
            explain: "Tier 1 waa qaybta ugu horreysa ee alerts-ka baarta."
          },
          {
            q: "SLA waa maxay?",
            options: [
              "Waqtiga la ballanqaaday ee lagu jawaabo alert",
              "Nooca malware ah",
              "Server-ka SIEM",
              "Firewall rule"
            ],
            answer: 0,
            explain: "SLA wuxuu qeexayaa waqtiga ugu dambeeya ee jawaab la bixin karo."
          },
          {
            q: "Follow-the-sun model waxay u isticmaashaa?",
            options: [
              "Coverage 24 saac ah iyada oo la isticmaalayo teams timezone kala duwan",
              "Kaydinta backup",
              "Update software",
              "Beddelka hardware"
            ],
            answer: 0,
            explain: "Follow-the-sun wuxuu u oggolaadaa SOC-ga inuu joogto u shaqeeyo."
          }
        ],

        exercise: {
          title: "Shift Handover Practice",
          steps: [
            "Qaado 3 alert oo tusaale ah.",
            "Mid kasta u qor xaalada, waxa la sameeyay, iyo waxa dhiman.",
            "Ku soo koob 5 sadar oo shift-ka xiga u qoran.",
            "Sharax escalation path-ka haddii alert-yadan mid ka mid ah u baahan yahay Tier 2."
          ],
          deliverable: "Handover note oo 8-10 sadar ah."
        }
      },


      {
        slug: "alert-triage-workflow",
        title: "Workflow-ga Alert Triage-ga",
        english: "The Alert Triage Workflow",
        minutes: 13,

        summary:
          "Baro nidaam 6-tallaabo ah oo aad alert kasta ku baari karto si isku mid ah oo waxtar leh.",

        sections: [
          {
            h: "6-da Tallaabo",
            p:
            "1) Fahan alert-ka (rule-kee? maxuu tijaabinayaa?). 2) Ururi context: user, host, IP, waqti UTC, process. 3) Hubi baseline: caadi ma tahay? 4) Enrich: VirusTotal, AbuseIPDB, threat intel. 5) Go'aami: true positive/false positive/benign true positive. 6) Ficil: xir, escalate, ama bilow incident."
          },
          {
            h: "Su'aalaha Muhiimka ah",
            p:
            "Yaa? (user/host) Maxaa? (ficilka) Goorma? (timeline UTC) Xagee? (source/destination) Sidee? (technique) Waa maxay saameynta? Haddii aadan ka jawaabi karin su'aalahaas, wali ma dhamaystirin triage-ga."
          },
          {
            h: "Marka la Escalate",
            p:
            "Escalate haddii: caddayn jirto in weerarku guuleystay, xog xasaasi ah la taabtay, ransomware calaamado, admin account la isticmaalay si aan caadi ahayn, ama aad shaki weyn qabto laakiin aadan hubin. Waligaa ha ka baqin escalation."
          },
          {
            h: "Alert Fatigue",
            p:
            "Analyst-yadu waxay la kulmaan qadar badan oo alerts ah maalintii — mararka qaar boqolaal. Alert fatigue wuxuu keeni karaa in true positives la seego. Tuning-ka rules-ka waa muhiim si loo yareeyo noise-ka."
          }
        ],

        terms: [
          { term: "Benign True Positive", def: "Waa dhab, laakiin waa hawl shaqo caadi ah (tusaale: admin tijaabo)." },
          { term: "Enrichment", def: "Ku darista macluumaad dheeraad ah alert-ka." },
          { term: "Alert Fatigue", def: "Daal ka dhasha alerts badan oo aan macno lahayn." }
        ],

        quiz: [
          {
            q: "Alert: 'Impossible travel' — user Muqdisho 10:00 UTC, Beijing 10:20 UTC. Tallaabada koowaad?",
            options: [
              "Ururi context: ma VPN baa? Hubi login-yada, oo escalate haddii uu guuleystay",
              "Xir alert-ka, waa false positive",
              "Tirtir account-ka",
              "Sug 24 saac"
            ],
            answer: 0,
            explain: "Xaqiiji VPN/proxy marka hore, kadibna eeg guulaha login-ka."
          },
          {
            q: "Marka aad qorayso ticket, waqtiga waa in lagu qoraa?",
            options: ["UTC", "Waqtiga maxalliga ah", "Waqti kasta", "Ma muhiima"],
            answer: 0,
            explain: "UTC ayaa ka fogaynaya jahwareerka timeline-ka."
          },
          {
            q: "Alert fatigue wuxuu keeni karaa?",
            options: [
              "In true positives dhab ah la seego",
              "In CPU la kordhiyo",
              "In backup la sameeyo",
              "In network la joojiyo"
            ],
            answer: 0,
            explain: "Alerts badan oo aan macno lahayn ayaa daaliya analyst-ka."
          }
        ],

        exercise: {
          title: "Samee Playbook",
          steps: [
            "Xulo alert nooc ah (tusaale: brute force SSH).",
            "Qor 6-da tallaabo si faahfaahsan.",
            "Ku dar shuruudaha escalation-ka iyo template ticket."
          ],
          deliverable: "Playbook 1 bog ah oo la isticmaali karo."
        }
      },


      {
        slug: "mitre-attack-framework",
        title: "MITRE ATT&CK Framework",
        english: "MITRE ATT&CK Framework",
        minutes: 10,

        summary:
          "Luqadda caalamiga ah ee lagu sharraxo dhaqanka weeraryahannada — muhiim u ah documentation iyo detection engineering.",

        sections: [
          {
            h: "Tactics & Techniques",
            p:
            "ATT&CK waxay u kala qaybisaa weerarka Tactics (ujeeddada: Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, C2, Exfiltration, Impact) iyo Techniques (tusaale T1566 Phishing)."
          },
          {
            h: "Isticmaalka Tier 1",
            p:
            "Marka aad qorayso ticket, ku dar technique ID: 'User uu furay attachment macro leh (T1566.001) taasoo dhalisay PowerShell (T1059.001)'. Tani waxay ka dhigaysaa warbixintaada mid la barbardhigi karo."
          },
          {
            h: "ATT&CK Navigator & Coverage Gaps",
            p:
            "Team-yadu waxay isticmaalaan ATT&CK Navigator si ay u muujiyaan techniques-ka ay ogaan karaan iyo kuwa aanay ogaan karin (coverage map). Tani waxay caddaynaysaa halka lagu baahan yahay log source cusub ama rule cusub."
          },
          {
            h: "Sub-techniques",
            p:
            "Technique kasta wuxuu leeyahay sub-techniques oo faahfaahsan. Tusaale: T1059 (Command and Scripting Interpreter) wuxuu leeyahay T1059.001 (PowerShell), T1059.003 (Windows Command Shell), iwm."
          }
        ],

        terms: [
          { term: "Tactic", def: "Ujeeddada weeraryahanka (tusaale: Persistence)." },
          { term: "Technique", def: "Habka uu ujeeddada ku gaaro (tusaale: Scheduled Task)." },
          { term: "Sub-technique", def: "Faahfaahin dheeraad ah oo technique-ka ka mid ah." },
          { term: "Coverage Map", def: "Muuqaal muujinaya techniques la ogaan karo iyo kuwa aan." }
        ],

        quiz: [
          {
            q: "T1566 waa technique la xiriira?",
            options: ["Phishing", "Backup", "Patching", "Encryption at rest"],
            answer: 0,
            explain: "T1566 = Phishing (Initial Access)."
          },
          {
            q: "Tactic-kee ayaa ku saabsan sidii weeraryahanku u sii joogi lahaa nidaamka?",
            options: ["Persistence", "Discovery", "Collection", "Impact"],
            answer: 0,
            explain: "Persistence = sii joogitaanka dib-u-shidista kadib."
          },
          {
            q: "ATT&CK Navigator waxaa loo isticmaalaa?",
            options: [
              "In la muujiyo techniques coverage-ga iyo gaps-ka",
              "In la sameeyo malware",
              "In la beddelo IP",
              "In la kordhiyo RAM"
            ],
            answer: 0,
            explain: "Navigator wuxuu bixiyaa muuqaal guud oo detection coverage ah."
          }
        ],

        exercise: {
          title: "Map Incident ATT&CK",
          steps: [
            "Qaado incident tusaale ah (phishing → credential theft → lateral movement).",
            "Tallaabo kasta u hel tactic iyo technique ID.",
            "Mid kasta u qor detection source (email gateway, EDR, SIEM)."
          ],
          deliverable: "Jaantus: tallaabo → technique → log source."
        }
      },


      {
        slug: "ticketing-documentation",
        title: "Ticketing & Documentation",
        english: "Ticketing and Documentation Best Practices",
        minutes: 12,

        summary:
          "Faham sababta documentation muhiim u yahay iyo sida ticket wanaagsan loo qoro.",

        sections: [
          {
            h: "Sababta Documentation Muhiim u Tahay",
            p:
            "Haddii aan la qorin, ma dhicin. Ticket kasta wuxuu u baahan yahay: waxa dhacay, marka, cida saameysay, waxa aad hubisay, caddaymaha (evidence), go'aankaaga iyo talaabooyinka xiga."
          },
          {
            h: "Ticket Anatomy",
            p:
            "Title cad oo koobsan, Severity level, Timeline (UTC), Affected assets, Evidence (screenshots, log excerpts, IOCs), Analysis/Reasoning, Resolution/Next steps. Ticket wanaagsan wuxuu u ogolaanayaa qof kale inuu fahmo dhacdada 6 bilood kadib."
          },
          {
            h: "Ticketing Systems",
            p:
            "Tools sida Jira, ServiceNow, ama TheHive ayaa loo isticmaalaa in la maamulo alerts iyo incidents. Kala saaridda severity (P1-P4) waxay caawisaa in mudnaanta si sax ah loo qeexo."
          }
        ],

        terms: [
          { term: "Severity Level", def: "Heerka halista ee ticket ka muujiya, tusaale P1 (ugu daran) ilaa P4." },
          { term: "TheHive", def: "Tool caan ah oo lagu maamulo incidents iyo cases." }
        ],

        quiz: [
          {
            q: "Analyst-ka wanaagsan waa qofka?",
            options: [
              "Warbixintiisa cid kale fahmi karto 6 bilood kadib",
              "Ugu dhaqso badan qofka",
              "Aan qorin wax dheeraad ah",
              "Kaliya kuwa jecel typing-ga"
            ],
            answer: 0,
            explain: "Documentation-ka fiican wuxuu u ogolaadaa in mustaqbalka qof kale fahmo dhacdada."
          },
          {
            q: "Ticket kasta waa in ay ku jirto?",
            options: [
              "Timeline, evidence, go'aan iyo talaabooyinka xiga",
              "Kaliya magaca analyst-ka",
              "Kaliya waqtiga la furay",
              "Kaliya severity level"
            ],
            answer: 0,
            explain: "Ticket dhamaystiran wuxuu u baahan yahay dhammaan qaybahan."
          },
          {
            q: "P1 severity macnaheedu waa?",
            options: [
              "Halka ugu daran/mudnaanta ugu sarreysa",
              "Halka ugu hooseysa",
              "Backup guulaystay",
              "Update software"
            ],
            answer: 0,
            explain: "P1 waa severity-ga ugu sarreeya oo u baahan falcelinta ugu degdegga badan."
          }
        ],

        exercise: {
          title: "Write a Full Ticket",
          steps: [
            "Xulo alert tusaale ah (brute force ama phishing).",
            "Qor ticket buuxa oo leh dhammaan qaybaha (title, severity, timeline, evidence, analysis, resolution).",
            "Ku dar technique ID MITRE ATT&CK ah."
          ],
          deliverable: "Sample SOC ticket (portfolio-ready)."
        }
      },


      {
        slug: "soc-metrics-kpis",
        title: "SOC Metrics & KPIs",
        english: "SOC Metrics and Key Performance Indicators",
        minutes: 13,

        summary:
          "Faham metrics-ka SOC-gu isticmaalo si loo qiimeeyo waxtarka iyo waqtiga jawaabta.",

        sections: [
          {
            h: "MTTD & MTTR",
            p:
            "Mean Time to Detect (MTTD) waa celceliska waqtiga laga qaato dhacdada ilaa la ogaado. Mean Time to Respond (MTTR) waa celceliska waqtiga laga qaato ogaanshaha ilaa xalinta. Labaduba waa muhiim si loo yareeyo."
          },
          {
            h: "SLA Compliance",
            p:
            "SLA compliance rate waxay muujinaysaa boqolkiiba alerts la jawaabay waqtiga la ballanqaaday gudihiisa. Rate hooseeya wuxuu muujin karaa in SOC-gu la qabsan waayay culeyska."
          },
          {
            h: "False Positive Rate",
            p:
            "In alerts badan oo false positive ah ay jiraan waxay muujinaysaa in rules-ka loo baahan yahay tuning. False positive rate sare ayaa keena alert fatigue oo yareeya waxtarka."
          },
          {
            h: "Analyst Performance vs Team Performance",
            p:
            "Metrics-ku waa in loo isticmaalo si loo hagaajiyo nidaamka guud, ma aha si loo canaanto analyst gaar ah — culture-ka SOC-gu waa in uu ahaadaa mid la barto, aan ahayn mid la cabsado."
          }
        ],

        terms: [
          { term: "MTTD", def: "Mean Time to Detect — celceliska waqtiga la ogaado dhacdo." },
          { term: "MTTR", def: "Mean Time to Respond — celceliska waqtiga xalinta dhacdo." },
          { term: "False Positive Rate", def: "Boqolkiiba alerts ah oo aan dhab ahayn." }
        ],

        quiz: [
          {
            q: "MTTD waxay qiimeysaa?",
            options: [
              "Celceliska waqtiga la ogaado dhacdo",
              "Celceliska CPU usage",
              "Tirada users-ka",
              "Qaddarka storage-ka"
            ],
            answer: 0,
            explain: "MTTD = Mean Time to Detect."
          },
          {
            q: "False positive rate sare wuxuu keeni karaa?",
            options: [
              "Alert fatigue oo yareeya waxtarka",
              "Kordhinta RAM",
              "Kordhinta CPU speed",
              "Wax dhib ah ma jiraan"
            ],
            answer: 0,
            explain: "Rules aan la tuning gareyn waxay dhaliyaan qadar badan oo false positive ah."
          },
          {
            q: "Metrics-ka SOC waa in loo isticmaalo?",
            options: [
              "Si loo hagaajiyo nidaamka guud",
              "Si loo canaanto analyst gaar ah",
              "Si loo eryo shaqaalaha",
              "Ma jiraan faa'iido"
            ],
            answer: 0,
            explain: "Metrics wanaagsan waxay taageeraan hagaajinta nidaamka, ma aha canaanashada shaqsiyaadka."
          }
        ],

        exercise: {
          title: "SOC Metrics Analysis",
          steps: [
            "Samee data tusaale ah oo leh 10 alerts, waqtiga detection iyo response.",
            "Xisaabi MTTD iyo MTTR celceliska.",
            "Sharax sida metrics-kan loo isticmaali lahaa si loo hagaajiyo SOC-ga."
          ],
          deliverable: "SOC metrics summary."
        }
      },


      {
        slug: "soc-tools-ecosystem",
        title: "SOC Tools Ecosystem",
        english: "The SOC Tools Ecosystem",
        minutes: 15,

        summary:
          "Guud ahaan eeg tools-ka SOC-gu isticmaalo — SIEM, SOAR, EDR — iyo sida ay isugu shaqeeyaan.",

        sections: [
          {
            h: "SIEM",
            p:
            "Security Information and Event Management (SIEM) wuxuu ururiyaa oo falanqeeyaa logs ka imanaya sources kala duwan si loo helo alerts. Tusaalayaal: Splunk, Elastic, Microsoft Sentinel, QRadar."
          },
          {
            h: "SOAR",
            p:
            "Security Orchestration, Automation and Response (SOAR) wuxuu otomaatig gareeyaa tallaabooyin caadi ah (tusaale: enrichment, blocking IP) si loo yareeyo waqtiga jawaabta iyo hawsha gacanta ee analyst-ka."
          },
          {
            h: "EDR",
            p:
            "Endpoint Detection and Response (EDR) wuxuu la socdaa endpoint-yada (laptops, servers) si toos ah, wuxuu bixiyaa telemetry qoto dheer oo ka badan antivirus caadi ah, wuxuuna awoodaa in uu si otomaatig ah u go'doomiyo host."
          },
          {
            h: "Sida Tools-ku Isugu Shaqeeyaan",
            p:
            "Alert SIEM ka yimid wuxuu keeni karaa SOAR playbook otomaatig ah oo enrich-gareeya IP-ga (VirusTotal), kadibna EDR wuxuu bixiyaa faahfaahin process-level ah — dhammaan waxaa isugu keena Tier 1 marka uu sameynayo triage."
          }
        ],

        terms: [
          { term: "SIEM", def: "Security Information and Event Management." },
          { term: "SOAR", def: "Security Orchestration, Automation and Response." },
          { term: "EDR", def: "Endpoint Detection and Response." }
        ],

        quiz: [
          {
            q: "SIEM shaqadiisu waa?",
            options: [
              "Ururinta iyo falanqaynta logs si loo helo alerts",
              "Otomaatig gareynta tallaabooyinka",
              "La socodka endpoint-yada oo keliya",
              "Kaydinta backup"
            ],
            answer: 0,
            explain: "SIEM waa xarunta ururinta iyo correlation-ka logs."
          },
          {
            q: "SOAR wuxuu caawiyaa?",
            options: [
              "Otomaatig gareynta tallaabooyinka caadiga ah si loo yareeyo waqtiga jawaabta",
              "Kaydinta files",
              "Sameynta hardware",
              "Beddelidda CPU"
            ],
            answer: 0,
            explain: "SOAR wuxuu automate gareeyaa playbooks."
          },
          {
            q: "EDR ka duwan yahay antivirus caadi ah sababtoo ah?",
            options: [
              "Wuxuu bixiyaa telemetry qoto dheer oo endpoint-level ah oo awoodda go'doomin",
              "Wuxuu ka jaban yahay",
              "Ma baahna internet",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "EDR wuxuu bixiyaa xog qoto dheer oo ka badan antivirus signature-based ah."
          }
        ],

        exercise: {
          title: "SOC Toolchain Mapping",
          steps: [
            "Naqshadee alert oo bilaabma SIEM.",
            "Sharax sida SOAR u automate gareyn lahaa enrichment.",
            "Sharax waxa EDR bixin lahaa oo dheeraad ah.",
            "Qor sida Tier 1 analyst-ku u isticmaali lahaa dhammaan saddexda tools."
          ],
          deliverable: "SOC toolchain flow diagram (text-based)."
        }
      },


      {
        slug: "soc-triage-capstone-lab",
        title: "SOC Triage — Full Capstone Lab",
        english: "SOC Triage Capstone Lab",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee triage buuxa oo alerts badan ah, kala hormari, oo qor tickets.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad hesha 5 alerts isku mar ah: (1) failed logins badan admin account ah, (2) PowerShell encoded command endpoint kale, (3) DNS query domain cusub ah, (4) file upload weyn habeenkii, (5) user cusub oo lagu daray group Domain Admins."
          },
          {
            h: "Prioritization",
            p:
            "Isticmaal severity iyo potential impact si aad u kala hormariso alerts-ka 5-ta. Ka bilow kan ugu khatarta badan (tusaale: privilege escalation) ka hor inta aadan eegin kuwa ugu yar ee shaki ah."
          },
          {
            h: "Triage Kasta",
            p:
            "Alert kasta ku dabaq 6-da tallaabo (fahan, ururi context, hubi baseline, enrich, go'aami, ficil). Ku dar MITRE ATT&CK technique ID mid kasta."
          },
          {
            h: "Escalation Decisions",
            p:
            "Go'aami kee ka mid ah 5-ta alert baa u baahan escalation Tier 2/IR team, iyo kee lagu xiri karo triage-level-ka."
          }
        ],

        terms: [
          { term: "Prioritization", def: "Kala hormarinta alerts-ka iyadoo lagu saleynayo severity/impact." }
        ],

        quiz: [
          {
            q: "Marka 5 alerts isku mar yimaadaan, tallaabada koowaad waa?",
            options: [
              "Kala hormarinta iyadoo lagu saleynayo severity iyo potential impact",
              "Kala baaritaanka si isku mid ah, mid kasta isla waqtiga",
              "Iska dhaaf 4-ta oo baar mid keliya",
              "Xir dhammaan si toos ah"
            ],
            answer: 0,
            explain: "Prioritization ayaa u ogolaanaya analyst inuu diiradda saaro khatarta ugu weyn marka hore."
          },
          {
            q: "Alert-kee (5-ta ka mid ah) baa ugu horreyn lahaa escalation?",
            options: [
              "User cusub oo lagu daray Domain Admins",
              "DNS query domain cusub ah",
              "Failed logins yar",
              "File upload caadi ah"
            ],
            answer: 0,
            explain: "Privilege escalation ee Domain Admins waa mid heer sare ah oo degdeg u baahan."
          },
          {
            q: "Sababta MITRE ATT&CK technique ID lagu daro ticket kasta waa?",
            options: [
              "Si warbixinta loo dhigo mid la barbardhigi karo oo la xisaabin karo",
              "Si loo kordhiyo RAM",
              "Si loo tirtiro logs",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "ATT&CK mapping wuxuu ka dhigayaa reporting mid standard ah."
          }
        ],

        exercise: {
          title: "Multi-Alert Triage Simulation",
          steps: [
            "Kala hormari 5-ta alert scenario-ga sare.",
            "Alert kasta ku samee triage buuxa (6-da tallaabo).",
            "Qor ticket kasta oo leh MITRE ATT&CK mapping.",
            "Go'aami kee u baahan yahay escalation, kee lagu xiri karo."
          ],
          deliverable: "Multi-alert triage report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "m7",
    slug: "siem-log-analysis-detection",
    stage: "Sare",
    title: "SIEM, Log Analysis & Detection Engineering",
    english: "SIEM, Log Analysis & Detection Engineering",
    hours: 1,

    outcome:
      "Waxaad qori kartaa SIEM queries, samayn kartaa correlation rules, oo fahmi doontaa Sigma iyo tuning si loo yareeyo false positives.",

    topics: [
      "SIEM Fundamentals & Pipeline",
      "Writing Effective Queries",
      "Correlation Rules & Detection Logic",
      "Sigma & Detection Engineering",
      "Alert Tuning & False Positive Reduction",
      "SIEM Detection Capstone Lab",
    ],

    lessonList: [

      {
        slug: "siem-fundamentals-pipeline",
        title: "SIEM Fundamentals & Pipeline",
        english: "SIEM Fundamentals and Data Pipeline",
        minutes: 11,

        summary:
          "Baro sida log-yada loo ururiyo, loo normalize gareeyo, alerts-na looga dhaliyo.",

        sections: [
          {
            h: "Pipeline-ka SIEM",
            p:
            "Collection (agents, syslog, API) → Normalization (parsing → fields sida src_ip, user, event_id) → Correlation (rules) → Alerting → Dashboard/Reporting. Tusaalayaal: Splunk, Elastic/Wazuh, Microsoft Sentinel, QRadar."
          },
          {
            h: "Log Sources Muhiimka ah",
            p:
            "Windows Security Events, Sysmon, firewall, proxy/DNS, EDR, cloud audit logs, VPN. Log source la'aan = detection la'aan. Marka aad naqshadeyneyso SOC, waxaad marka hore go'aamisaa log sources-ka muhiimka ah."
          },
          {
            h: "Normalization",
            p:
            "Log-yada kala duwan (Windows, Linux, firewall) waxay leeyihiin formats kala duwan. Normalization wuxuu u beddelaa hal qaab si loo fududeeyo search-ka iyo correlation-ka."
          },
          {
            h: "Ingestion Rate & Cost",
            p:
            "SIEM-yada intooda badan waxay ku qaataan lacag iyadoo lagu saleynayo qaddarka data ee la geliyo (ingestion). Naqshadaynta smart-ka ah waxay xushaa log sources-ka muhiimka ah halkii ay geli lahayd wax walba."
          }
        ],

        terms: [
          { term: "Ingestion", def: "Habka logs-ku ugu galaan SIEM-ka." },
          { term: "Normalization", def: "Log-yada kala duwan lagu beddelo hal qaab." },
          { term: "Sysmon", def: "Tool Microsoft ah oo bixiya telemetry qoto dheer." }
        ],

        quiz: [
          {
            q: "Tallaabada ugu horreysa ee SIEM pipeline waa?",
            options: ["Collection", "Alerting", "Reporting", "Containment"],
            answer: 0,
            explain: "Marka hore log-yada ayaa la ururiyaa."
          },
          {
            q: "Normalization sababta loo isticmaalo waa?",
            options: [
              "Si logs kala duwan loo beddelo hal qaab si search loo fududeeyo",
              "Si loo kordhiyo storage",
              "Si loo tirtiro logs",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Normalization wuxuu ka dhigayaa search iyo correlation mid fudud."
          },
          {
            q: "Log source la'aan wuxuu keenaa?",
            options: [
              "Detection la'aan qaybtaas ah",
              "Kordhinta CPU",
              "Yareynta cost-ka",
              "Wax dhib ah ma jiraan"
            ],
            answer: 0,
            explain: "Haddii aan log source la haysan, dhacdo taas ku dhacaysa lama ogaan karo."
          }
        ],

        exercise: {
          title: "SIEM Architecture Design",
          steps: [
            "Naqshadee shirkad tusaale ah oo leh 50 employee.",
            "Liis garee 6 log sources muhiim u ah.",
            "Sharax pipeline-ka: collection ilaa alerting.",
            "Sharax sida cost-ku u kordhi karo haddii dhammaan log-yada la geliyo."
          ],
          deliverable: "SIEM architecture plan (1 bog ah)."
        }
      },


      {
        slug: "writing-effective-queries",
        title: "Writing Effective SIEM Queries",
        english: "Writing Effective SIEM Queries",
        minutes: 14,

        summary:
          "Baro sida loo qoro queries wax ku ool ah SIEM kala duwan (Splunk SPL, KQL).",

        sections: [
          {
            h: "Qaabka Query-ga",
            p:
            "Query kasta: filter (waqti + source) → search terms → aggregation → sort. Bilow ballaaran, kadibna cidhiidhi. Waqti ahaan xaddid search-ga si aad uga fogaato natiijooyin aan la baahnayn."
          },
          {
            h: "Splunk SPL Tusaale",
            p:
            "index=windows EventCode=4625 | stats count by src_ip, user | sort -count — query-gani wuxuu tiriyaa login-guuldarrooyinka IP kasta iyo user, kadibna wuxuu kala saaraa kuwa ugu badan."
          },
          {
            h: "KQL Tusaale",
            p:
            "SecurityEvent | where EventID == 4625 | summarize count() by IpAddress, Account — KQL (Kusto Query Language) waa luqadda Microsoft Sentinel/Defender isticmaalo."
          },
          {
            h: "Stack Counting & Outliers",
            p:
            "Stack counting (tirinta qiyamka kala duwan) waa tabo aad u xoog badan oo lagu ogaado naadirnimada — tusaale, process 1 keliya oo isticmaala isla command line waxay noqon kartaa outlier."
          }
        ],

        terms: [
          { term: "SPL", def: "Search Processing Language — luqadda Splunk." },
          { term: "KQL", def: "Kusto Query Language — Microsoft Sentinel/Defender." },
          { term: "Stack Counting", def: "Tirinta inta jeer ee qiime kasta soo baxay si loo helo kuwa naadirka ah." }
        ],

        quiz: [
          {
            q: "Habka wanaagsan ee query-ga bilowga waa?",
            options: [
              "Bilow ballaaran, kadibna cidhiidhi",
              "Bilow mid aad u cidhiidhsan",
              "Ha isticmaalin waqti filter",
              "Ha isticmaalin aggregation"
            ],
            answer: 0,
            explain: "Bilow ballaaran ayaa kaa caawinaya inaad aragto natiijooyinka guud ka hor cidhiidhinta."
          },
          {
            q: "KQL waxaa loo isticmaalaa?",
            options: [
              "Microsoft Sentinel/Defender",
              "Splunk oo keliya",
              "Wazuh oo keliya",
              "Linux command line"
            ],
            answer: 0,
            explain: "KQL waa luqadda Microsoft security tools-kiisa."
          },
          {
            q: "Stack counting wuxuu caawiyaa in la ogaado?",
            options: [
              "Qiyamka naadirka ah oo u baahan baaritaan",
              "Qiyamka ugu badan ee caadiga ah",
              "CPU usage",
              "Storage capacity"
            ],
            answer: 0,
            explain: "Naadirnimadu waxay badanaa muujisaa shaki leh."
          }
        ],

        exercise: {
          title: "Query Writing Practice",
          steps: [
            "Qor query brute force ah (4625 stats by IP).",
            "Query users cusub (4720).",
            "Query PowerShell encoded (Sysmon Event 1).",
            "Query xiriir dibadda ah oo waaweyn (bytes out).",
            "Qor sharraxaad Soomaali ah oo leh query kasta."
          ],
          deliverable: "File ah 5 query oo leh sharraxaad."
        }
      },


      {
        slug: "correlation-rules-detection-logic",
        title: "Correlation Rules & Detection Logic",
        english: "Correlation Rules and Detection Logic",
        minutes: 12,

        summary:
          "Faham sida correlation rules-ku u isku xiraan dhacdooyin kala duwan si loo helo alerts wax ku ool ah.",

        sections: [
          {
            h: "Waa Maxay Correlation?",
            p:
            "Correlation waa isku xirka dhacdooyin badan si loo helo pattern ka weyn hal event. Tusaale: 20 x Event 4625 oo 5 daqiiqo gudahood ah oo ay ku xigto 4624 isla account = brute force success."
          },
          {
            h: "Threshold-Based Rules",
            p:
            "Rules-ka threshold-based waxay bilaabaan alert marka qiyaas gaar ah la gaaro (tusaale: 10+ failed logins 5 daqiiqo gudahood). Threshold-ka waa in la tuning gareeyaa si loo yareeyo false positives."
          },
          {
            h: "Sequence-Based Rules",
            p:
            "Rules-ka sequence-based waxay eegaan dhacdooyinka isku xigxiga heerkooda saxda ah — tusaale, 'process cusub oo dhalay network connection kadib file creation' waxay muujin kartaa malware behavior."
          },
          {
            h: "Rule Design Best Practices",
            p:
            "Rule kasta wuxuu u baahan yahay: title cad, log source, detection logic, severity, expected false positives, iyo ATT&CK mapping. Rule-ka wanaagsan wuxuu leeyahay ujeeddo cad iyo tallaabo cad oo analyst-ku qaadi karo."
          }
        ],

        terms: [
          { term: "Correlation", def: "Isku xirka dhacdooyin badan si loo helo pattern." },
          { term: "Threshold Rule", def: "Rule bilaabma marka qiyaas gaar ah la gaaro." },
          { term: "Sequence Rule", def: "Rule eegaya dhacdooyin isku xigxiga heerkooda saxda ah." }
        ],

        quiz: [
          {
            q: "Correlation waa maxay?",
            options: [
              "Isku xirka dhacdooyin badan si loo helo pattern ka weyn hal event",
              "Kaydinta hal log",
              "Kaliya tirinta logs",
              "Beddelidda IP"
            ],
            answer: 0,
            explain: "Correlation-ku wuxuu isku xiraa dhacdooyin si loo helo waxa dhabta ah dhacaya."
          },
          {
            q: "Threshold-based rule tusaale ah waa?",
            options: [
              "10+ failed logins 5 daqiiqo gudahood",
              "Hal login guulaystay",
              "User cusub oo la abuuray",
              "Password beddelka"
            ],
            answer: 0,
            explain: "Threshold rules waxay ku salaysan yihiin qiyaas gaar ah."
          },
          {
            q: "Rule kasta waa in ay ku jirto?",
            options: [
              "ATT&CK mapping, severity iyo expected false positives",
              "Kaliya title",
              "Kaliya log source",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Rule dhamaystiran wuxuu u baahan yahay qaybaha oo dhan si loo fahmo oo loo tuning gareeyo."
          }
        ],

        exercise: {
          title: "Design a Correlation Rule",
          steps: [
            "Xulo dhaqan shaki leh (tusaale: user cusub oo lagu daray Domain Admins).",
            "Naqshadee correlation logic-ka (log sources, threshold ama sequence).",
            "Qor severity iyo ATT&CK mapping.",
            "Sharax 2 false positives suurtagal ah."
          ],
          deliverable: "Correlation rule design document."
        }
      },


      {
        slug: "sigma-detection-engineering",
        title: "Sigma & Detection Engineering",
        english: "Sigma Rules and Detection Engineering",
        minutes: 10,

        summary:
          "Baro Sigma — qaab-dhismeedka rules-ka guud ee la wadaagi karo SIEM kala duwan.",

        sections: [
          {
            h: "Waa Maxay Sigma?",
            p:
            "Sigma waa qaab YAML ah oo generic ah oo detection rules loogu qoro, loona beddeli karo Splunk, Elastic ama Sentinel. Tani waxay ka dhigaysaa detection-ka mid la wadaagi karo bulshada dhexdeeda."
          },
          {
            h: "Qaybaha Sigma Rule",
            p:
            "title, id, description, logsource (product, category), detection (selection + condition), falsepositives, level (severity), tags (ATT&CK mapping)."
          },
          {
            h: "SigmaHQ Community",
            p:
            "Bulshada SigmaHQ waxay leedahay kumanaan rule oo bilaash ah oo aad wax ka baran karto ama isticmaali karto — mid ka wanaagsan meelaha lagu bilaabo detection engineering."
          },
          {
            h: "Detection Engineering Lifecycle",
            p:
            "Naqshadaynta rule → tijaabinta (staging/monitor mode) → tuning → deployment → monitoring joogtada ah → dib u eegis marka behavior-ka weeraryahannadu isbeddelo."
          }
        ],

        terms: [
          { term: "Sigma", def: "Qaab guud oo YAML ah oo detection rules loogu qoro." },
          { term: "SigmaHQ", def: "Bulshada online ee wadaagta Sigma rules bilaash ah." },
          { term: "Detection Engineering", def: "Habka la naqshadeeyo, la tijaabiyo lana hagaajiyo detection rules." }
        ],

        quiz: [
          {
            q: "Sigma faa'iidadeeda ugu weyn waa?",
            options: [
              "Waa qaab generic ah oo loo beddeli karo SIEM kala duwan",
              "Waxay kaliya u shaqeysaa Splunk",
              "Waxay kaliya u shaqeysaa Windows",
              "Ma bixiso false positive info"
            ],
            answer: 0,
            explain: "Sigma wuxuu ka dhigayaa detection-ka mid portable ah."
          },
          {
            q: "Sigma rule wuxuu ku daraa?",
            options: [
              "Falsepositives iyo level (severity)",
              "Kaliya title",
              "Kaliya IP",
              "Kaliya password"
            ],
            answer: 0,
            explain: "Sigma rule dhamaystiran wuxuu bixiyaa faahfaahin dheeraad ah."
          },
          {
            q: "Detection engineering lifecycle wuxuu bilaabmaa?",
            options: [
              "Naqshadaynta rule-ka",
              "Deployment-ka toos ah",
              "Tirtirida logs",
              "Beddelidda hardware"
            ],
            answer: 0,
            explain: "Lifecycle-ku wuxuu bilaabmaa naqshadayn, kadibna tijaabin, tuning, deployment."
          }
        ],

        exercise: {
          title: "Write a Sigma Rule",
          steps: [
            "Xulo dhaqan (tusaale: user cusub oo lagu daray group-ka Administrators).",
            "Qor Sigma YAML: logsource, detection, condition, level.",
            "Qor 3 false positive suurtogal ah iyo exclusions.",
            "Ku dar ATT&CK tag."
          ],
          deliverable: "File Sigma ah oo dhamaystiran."
        }
      },


      {
        slug: "alert-tuning-false-positive-reduction",
        title: "Alert Tuning & False Positive Reduction",
        english: "Alert Tuning and False Positive Reduction",
        minutes: 13,

        summary:
          "Faham sida rule-ka loo hagaajiyo si loo yareeyo alerts been ah, iyada oo aan la seegin threats dhab ah.",

        sections: [
          {
            h: "Monitor Mode",
            p:
            "Rule cusub kasta wuxuu bilaabmaa 'monitor mode' (aan alert dirayn oo keliya diiwaan gelinaya). Eeg 1-2 toddobaad, tiri false positives, kadibna go'aami haddii rule-ku diyaar u yahay in la shido."
          },
          {
            h: "Exclusions & Allow-listing",
            p:
            "Ku dar exclusions (service accounts, scanner IP-yada, software rasmi ah) si loo yareeyo false positives iyada oo aan la yaraynayn detection capability-ga dhabta ah."
          },
          {
            h: "Balancing Sensitivity",
            p:
            "Rule aad u sensitive ah wuxuu keenaa alert fatigue. Rule aad u loose ah wuxuu seegayaa threats dhab ah (false negative). Waa in la helo balance u dhexeeya labadan."
          },
          {
            h: "Continuous Tuning",
            p:
            "Tuning maaha hal-mar oo la sameeyo — waa habraac joogto ah. Marka environment-ku isbeddelo (software cusub, users cusub), rules-ku waa inay la socdaan isbeddelkaas."
          }
        ],

        terms: [
          { term: "Monitor Mode", def: "Xaaladda rule cusub uu diiwaan geliyo laakiin aan alert dirayn." },
          { term: "Allow-listing", def: "Liiska waxyaabaha caadiga ah ee laga reebo detection." },
          { term: "False Negative", def: "Threat dhab ah oo aan la ogaan." }
        ],

        quiz: [
          {
            q: "Rule cusub oo 500 alert maalintii dhaliya waa in?",
            options: [
              "La tuun-gareeyo (tuning) ama la joojiyo — alert fatigue waa khatar",
              "La daayo sidiisa",
              "Severity-giisa la kordhiyo",
              "Analyst kale loo diro"
            ],
            answer: 0,
            explain: "Alert fatigue wuxuu keenaa in weerarrada dhabta ah la seego."
          },
          {
            q: "Monitor mode faa'iidadiisu waa?",
            options: [
              "In rule-ka lagu tijaabiyo iyada oo aan lala dhibin analysts alerts been ah",
              "In alert-yada si toos ah loo xiro",
              "In CPU la kordhiyo",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Monitor mode wuxuu u ogolaadaa in la tiriyo false positives ka hor go'shid."
          },
          {
            q: "False negative waa maxay?",
            options: [
              "Threat dhab ah oo aan la ogaan",
              "Alert khaldan oo aan threat ahayn",
              "Backup guulaystay",
              "Update software"
            ],
            answer: 0,
            explain: "False negative waa marka rule uu seego weerar dhab ah."
          }
        ],

        exercise: {
          title: "Tuning Simulation",
          steps: [
            "Xulo rule tusaale ah oo dhaliya false positives badan.",
            "Aqoonso 3 sababood oo false positives ah.",
            "Naqshadee exclusions si loo yareeyo them.",
            "Sharax sida aad u xaqiijin lahayd inaadan seegin threats dhab ah."
          ],
          deliverable: "Alert tuning plan."
        }
      },


      {
        slug: "siem-detection-capstone-lab",
        title: "SIEM & Detection — Full Capstone Lab",
        english: "SIEM and Detection Engineering Capstone Lab",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — naqshadee, qor, oo tuning garee detection rule dhamaystiran.",

        sections: [
          {
            h: "Scenario",
            p:
            "Shirkaddaadu waxay rabtaa detection rule cusub oo ogaanaya Kerberoasting attempts (marka user gaar ah uu weydiisto qadar aad u badan oo service tickets ah waqti gaaban gudihiisa)."
          },
          {
            h: "Naqshadaynta Rule-ka",
            p:
            "Go'aami log source-ka (Windows Security Event ID 4769), threshold-ka (tusaale: 10+ TGS requests 5 daqiiqo gudahood isla account), iyo exclusions (service accounts caadiga ah oo joogto weydiiya)."
          },
          {
            h: "Qorista Sigma Rule",
            p:
            "Qor Sigma YAML buuxa oo leh title, logsource, detection, condition, level, falsepositives iyo ATT&CK tag (T1558.003 - Kerberoasting)."
          },
          {
            h: "Tuning iyo Deployment Plan",
            p:
            "Sharax sida aad u bilaabi lahayd monitor mode, waqtiga aad u sugi lahayd (1-2 toddobaad), iyo sida aad u go'aamin lahayd in rule-ku diyaar u yahay in la shido."
          }
        ],

        terms: [
          { term: "Kerberoasting Detection", def: "Rule ogaanaysa qadar aad u badan oo TGS requests ah." }
        ],

        quiz: [
          {
            q: "Kerberoasting detection rule-ku wuxuu eegaa?",
            options: [
              "Qadar aad u badan oo service ticket requests ah isla account waqti gaaban gudihiisa",
              "Login-ka caadiga ah",
              "Backup activity",
              "DNS queries oo caadi ah"
            ],
            answer: 0,
            explain: "Kerberoasting waxay muujisaa qadar aad u badan oo TGS requests ah."
          },
          {
            q: "Event ID-kee ayaa la xiriira TGS requests?",
            options: ["4769", "4624", "4720", "1102"],
            answer: 0,
            explain: "4769 waa Kerberos Service Ticket request event."
          },
          {
            q: "Sababta exclusions loo daro rule-kan waa?",
            options: [
              "Si loo yareeyo false positives service accounts caadiga ah",
              "Si loo kordhiyo alerts",
              "Si loo tirtiro rule-ka",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Service accounts qaarkood si caadi ah ayay u weydiiyaan service tickets badan."
          }
        ],

        exercise: {
          title: "Full Detection Rule Development",
          steps: [
            "Naqshadee rule-ka Kerberoasting detection-ka.",
            "Qor Sigma YAML buuxa.",
            "Sharax monitor mode plan-ka iyo tuning steps.",
            "Diyaari warbixin loo qoray SOC Manager oo sharaxaya rule-ka iyo faa'iidadiisa (portfolio-ready)."
          ],
          deliverable: "Full detection rule package (Sigma + deployment plan)."
        }
      },

    ],
  }),
  m({
    id: "m8",
    slug: "threat-intelligence-attck",
    stage: "Sare",
    title: "Threat Intelligence & MITRE ATT&CK",
    english: "Threat Intelligence & MITRE ATT&CK",
    hours: 2,

    outcome:
      "Waxaad fahmi doontaa threat intelligence lifecycle, IOCs/TTPs, threat actor profiling, OSINT iyo qorista threat intel reports.",

    topics: [
      "Threat Intelligence Fundamentals",
      "IOCs & TTPs Deep Dive",
      "MITRE ATT&CK Deep Dive",
      "Threat Actor Profiling",
      "OSINT for Threat Intelligence",
      "Threat Intel Report Writing",
      "Threat Intelligence Capstone Lab",
    ],

    lessonList: [

      {
        slug: "threat-intelligence-fundamentals",
        title: "Aasaaska Threat Intelligence",
        english: "Threat Intelligence Fundamentals",
        minutes: 10,

        summary:
          "Baro threat intelligence lifecycle-ka iyo noocyada kala duwan ee intelligence-ka.",

        sections: [
          {
            h: "Waa Maxay Threat Intelligence?",
            p:
            "Threat intelligence waa xog la ururiyo, la falanqeeyo, lana isticmaalo si loo fahmo khataraha cybersecurity, attackers iyo hababka ay isticmaalaan. Ujeeddadu waa in la hormariyo defense-ka iyada oo la fahmo cadowga."
          },
          {
            h: "Intelligence Lifecycle",
            p:
            "1) Planning & Direction (maxaa loo baahan yahay?). 2) Collection (xog la ururiyo). 3) Processing (xogta la habeeyo). 4) Analysis (macnaha la helo). 5) Dissemination (natiijada la wadaago). 6) Feedback."
          },
          {
            h: "Noocyada Intelligence",
            p:
            "Strategic (maamulka sare, trends guud), Operational (campaign-specific, planning), Tactical (IOCs, TTPs — analyst-ka SOC ugu isticmaalo). Tactical intelligence ayaa ah nooca Tier 1/2 analyst-ku badanaa la kulmo."
          },
          {
            h: "Sida SOC Analyst U Isticmaalo",
            p:
            "SOC analysts waxay isticmaalaan threat intelligence si ay u baaritaan alerts (ma jira IOC la yaqaan?), u aqoonsadaan patterns, una hagaajiyaan detection rules iyadoo lagu saleynayo TTPs cusub."
          }
        ],

        terms: [
          { term: "Threat Intelligence", def: "Xog la ururiyo lana falanqeeyo si loo fahmo khataraha." },
          { term: "Tactical Intelligence", def: "IOCs iyo TTPs — nooca SOC analyst-ku badanaa isticmaalo." },
          { term: "Intelligence Lifecycle", def: "Habraaca 6-tallaabo ah ee intelligence-ka laga sameeyo." }
        ],

        quiz: [
          {
            q: "Threat intelligence ujeeddadeeda ugu weyn waa?",
            options: [
              "In la fahmo cadowga si defense-ka loo hagaajiyo",
              "In la sameeyo malware",
              "In la kordhiyo RAM",
              "In la beddelo hardware"
            ],
            answer: 0,
            explain: "Intelligence-ka waxaa loo isticmaalaa in la fahmo oo laga hortago threats."
          },
          {
            q: "Tactical intelligence waa nooca?",
            options: [
              "IOCs iyo TTPs oo SOC analyst-ku isticmaalo",
              "Kaliya maamulka sare u qoran",
              "Kaliya trends caalami ah",
              "Backup data"
            ],
            answer: 0,
            explain: "Tactical intelligence waa nooca ugu isticmaalka badan SOC-ga."
          },
          {
            q: "Tallaabada ugu horreysa ee intelligence lifecycle waa?",
            options: ["Planning & Direction", "Dissemination", "Feedback", "Processing"],
            answer: 0,
            explain: "Waa in la go'aamiyo maxaa loo baahan yahay ka hor collection-ka."
          }
        ],

        exercise: {
          title: "Intelligence Lifecycle Mapping",
          steps: [
            "Xulo threat gaar ah (tusaale: ransomware group cusub).",
            "Sharax sida 6-da tallaabo loogu dabaqi lahaa xaaladdaas.",
            "Kala saar tusaalayaal strategic, operational, iyo tactical intelligence."
          ],
          deliverable: "Intelligence lifecycle case study."
        }
      },


      {
        slug: "iocs-ttps-deep-dive",
        title: "IOCs & TTPs Deep Dive",
        english: "IOCs and TTPs Deep Dive",
        minutes: 12,

        summary:
          "Faham qoto dheer noocyada IOCs iyo sida TTPs ugu adag yihiin inay attacker-yadu beddelaan.",

        sections: [
          {
            h: "Noocyada IOCs",
            p:
            "File hashes (MD5, SHA1, SHA256), IP addresses, domains/URLs, email addresses, registry keys, mutex names. IOCs waa 'atomic' — waxay fudud yihiin in attacker-ku beddelo (tusaale: IP cusub)."
          },
          {
            h: "Pyramid of Pain",
            p:
            "Pyramid of Pain wuxuu muujiyaa heerarka: Hash values (fudud in la beddelo) → IP Addresses → Domain Names → Network/Host Artifacts → Tools → TTPs (adag in la beddelo). TTPs-ka waa kuwa ugu qiimaha badan detection ahaan."
          },
          {
            h: "TTPs (Tactics, Techniques, Procedures)",
            p:
            "TTPs waxay sharaxaan sida attacker-ku u shaqeeyo — habka guud (Tactic), qaabka gaarka ah (Technique), iyo faahfaahinta implementation-ka (Procedure). Beddelidda TTPs waa mid adag oo qaali ah attacker-ka."
          },
          {
            h: "Sababta TTPs ay ka fiican yihiin IOCs",
            p:
            "Detection ku salaysan IOCs (hash, IP) way fudud tahay in la ka gudbo — attacker-ku wuxuu keliya beddelaa hash-ka ama IP-ga. Detection ku salaysan TTPs (behavior) ayaa ka adag attacker-ka in uu ka gudbo, sababtoo ah waa habka uu ku shaqeeyo."
          }
        ],

        terms: [
          { term: "Pyramid of Pain", def: "Framework muujiya heerarka indicators, halka ugu sarreysa ay adag tahay attacker in uu beddelo." },
          { term: "TTP", def: "Tactics, Techniques and Procedures — dhaqanka weeraryahanka." },
          { term: "Atomic Indicator", def: "IOC fudud oo attacker-ku si dhakhso ah u beddeli karo (hash, IP)." }
        ],

        quiz: [
          {
            q: "Pyramid of Pain, heerkee ayaa ugu adag attacker-ku inuu beddelo?",
            options: ["TTPs", "Hash values", "IP addresses", "Domain names"],
            answer: 0,
            explain: "TTPs waa habka attacker-ku ku shaqeeyo — beddelkiisu waa mid qaali ah."
          },
          {
            q: "Sababta detection TTP-based ka fiican yahay IOC-based waa?",
            options: [
              "Attacker-ku si fudud uma beddeli karo habka uu ku shaqeeyo",
              "TTP-ku waa mid fudud in la ogaado",
              "IOC-ku ma jiro faa'iido",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Behavior-based detection ayaa ka adkaanaya attacker in uu ka gudbo."
          },
          {
            q: "Hash value waa mid?",
            options: [
              "Fudud in attacker-ku beddelo",
              "Adag in attacker-ku beddelo",
              "Aan waligeed beddelmayn",
              "Kaliya loo isticmaalo IP"
            ],
            answer: 0,
            explain: "Hash-ku wuxuu beddelmaa marka file-ka wax laga beddelo, xitaa yar."
          }
        ],

        exercise: {
          title: "Pyramid of Pain Application",
          steps: [
            "Xulo malware campaign report (public source).",
            "Kala saar IOCs-ka la helay heerarka Pyramid of Pain.",
            "Aqoonso TTPs-ka la sheegay report-ka.",
            "Sharax sababta detection rule TTP-based uu ka waxtar badan yahay mid IOC-based ah keliya."
          ],
          deliverable: "Pyramid of Pain analysis."
        }
      },


      {
        slug: "mitre-attck-deep-dive",
        title: "MITRE ATT&CK Deep Dive",
        english: "MITRE ATT&CK Framework Deep Dive",
        minutes: 13,

        summary:
          "Sii qoto dheeree fahamkaaga ATT&CK — Groups, Software, Navigator iyo threat intel application.",

        sections: [
          {
            h: "ATT&CK Groups",
            p:
            "MITRE waxay dokumenteeyaan threat actor groups la yaqaan (tusaale APT29, FIN7) iyagoo leh TTPs specific ah. Threat intel analyst-yadu waxay isticmaalaan macluumaadkan si ay u fahmaan kee groups ayaa u badan inuu bartilmaameedsado industry-gooda."
          },
          {
            h: "ATT&CK Software",
            p:
            "ATT&CK waxay sidoo kale dokumenteeyaan malware iyo tools-ka la isticmaalo (tusaale Cobalt Strike, Mimikatz) iyagoo leh techniques ay taageeraan."
          },
          {
            h: "ATT&CK for ICS iyo Cloud",
            p:
            "Marka lagu daro Enterprise matrix, ATT&CK waxay leedahay matrices gaar ah oo loogu talagalay Industrial Control Systems (ICS) iyo Cloud environments — mid kasta oo leh techniques u gaar ah."
          },
          {
            h: "Threat Intel + ATT&CK Application",
            p:
            "Marka aad akhrinayso threat report, map TTPs-ka lagu sheegay ATT&CK techniques. Tani waxay kuu ogolaanaysaa inaad barbardhigto kala duwanaanshaha groups, oo aad go'aamiso detection coverage-gaaga."
          }
        ],

        terms: [
          { term: "ATT&CK Group", def: "Threat actor la dokumenteeyay oo leh TTPs specific ah." },
          { term: "ATT&CK Software", def: "Malware/tools la dokumenteeyay oo la xiriira techniques gaar ah." },
          { term: "ICS Matrix", def: "ATT&CK matrix gaar ah oo loogu talagalay Industrial Control Systems." }
        ],

        quiz: [
          {
            q: "ATT&CK Groups waxay dokumenteeyaan?",
            options: [
              "Threat actors la yaqaan iyo TTPs-kooda",
              "Kaliya malware",
              "Kaliya IP addresses",
              "Kaliya passwords"
            ],
            answer: 0,
            explain: "Groups-ku waa profiles ah oo threat actors ah."
          },
          {
            q: "Sababta la isku daro threat report TTPs iyo ATT&CK techniques waa?",
            options: [
              "Si loo barbardhigo groups kala duwan lana go'aamiyo detection coverage",
              "Si loo kordhiyo RAM",
              "Si loo tirtiro logs",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Mapping-ku wuxuu kaa caawiyaa fahamka gaps-ka detection-kaaga."
          },
          {
            q: "ATT&CK waxay leedahay matrices gaar ah oo loogu talagalay?",
            options: [
              "ICS iyo Cloud, marka lagu daro Enterprise",
              "Kaliya Windows",
              "Kaliya mobile",
              "Kaliya email"
            ],
            answer: 0,
            explain: "ATT&CK waxay ballaadhisay si ay u daboosho environments kala duwan."
          }
        ],

        exercise: {
          title: "Threat Actor Group Research",
          steps: [
            "Xulo hal ATT&CK Group (tusaale: search 'MITRE ATT&CK groups').",
            "Liis garee 5 techniques ay isticmaalaan.",
            "Sharax industry-ga ay badanaa bartilmaameedsadaan.",
            "Qor 2 detection rules aad soo jeedin lahayd iyadoo lagu saleynayo TTPs-kooda."
          ],
          deliverable: "Threat actor group profile."
        }
      },


      {
        slug: "threat-actor-profiling",
        title: "Threat Actor Profiling",
        english: "Threat Actor Profiling",
        minutes: 15,

        summary:
          "Faham noocyada threat actors iyo sida loo sameeyo profile faahfaahsan.",

        sections: [
          {
            h: "Noocyada Threat Actors",
            p:
            "Nation-state (APTs — advanced, resourced, ujeeddo geopolitical), Cybercriminals (ujeeddo lacag), Hacktivists (ujeeddo siyaasadeed/bulsho), Insider Threats (shaqaale ama qof leh access), Script Kiddies (aqoon yar, tools la helo)."
          },
          {
            h: "Motivation & Capability",
            p:
            "Marka aad profile-gareynayso threat actor, waxaad eegtaa: motivation-kooda (maxay rabaan?), capability-gooda (sidee ay u xirfad badan yihiin?), iyo resources-kooda (maxay heystaan?)."
          },
          {
            h: "Diamond Model",
            p:
            "Diamond Model wuxuu isku xiraa afar qaybood: Adversary (cadow), Capability (awoodda), Infrastructure (server-yada C2, iwm), Victim (target-ka). Afartan waxay isku xiraan si loo fahmo weerarka oo dhan."
          },
          {
            h: "Sida Profile-ka loo Isticmaalo",
            p:
            "SOC analyst wuxuu isticmaalaa threat actor profiles si uu u go'aamiyo kee weerar ayaa ugu badan inuu bartilmaameedsado shirkaddiisa, taasoo caawinaysa naqshadaynta defense priorities."
          }
        ],

        terms: [
          { term: "APT", def: "Advanced Persistent Threat — threat actor heer sare ah, badanaa nation-state." },
          { term: "Insider Threat", def: "Khatar ka timaada qof leh access sharci ah (shaqaale)." },
          { term: "Diamond Model", def: "Framework isku xira Adversary, Capability, Infrastructure, Victim." }
        ],

        quiz: [
          {
            q: "APT waa gaaban u ah?",
            options: ["Advanced Persistent Threat", "Automatic Protection Tool", "Attack Prevention Technique", "Advanced Packet Transfer"],
            answer: 0,
            explain: "APT waa Advanced Persistent Threat, badanaa nation-state actors."
          },
          {
            q: "Diamond Model wuxuu isku xiraa?",
            options: [
              "Adversary, Capability, Infrastructure, Victim",
              "Firewall, Antivirus, VPN, Backup",
              "SIEM, SOAR, EDR, IDS",
              "TCP, UDP, IP, DNS"
            ],
            answer: 0,
            explain: "Diamond Model waa framework caan ah oo threat intelligence-ka lagu isticmaalo."
          },
          {
            q: "Insider threat waa?",
            options: [
              "Khatar ka timaada qof leh access sharci ah",
              "Threat ka yimid internet-ka oo dhan",
              "Malware nooc ah",
              "Firewall rule"
            ],
            answer: 0,
            explain: "Insider threats waxay ka yimaadaan shaqaale ama qof leh access la oggol yahay."
          }
        ],

        exercise: {
          title: "Diamond Model Application",
          steps: [
            "Xulo incident tusaale ah (real ama hypothetical).",
            "Buuxi Diamond Model-ka: Adversary, Capability, Infrastructure, Victim.",
            "Sharax motivation-ka adversary-ga.",
            "Qor sida profile-kan loo isticmaali lahaa si loo hagaajiyo defense priorities."
          ],
          deliverable: "Diamond Model case analysis."
        }
      },


      {
        slug: "osint-threat-intelligence",
        title: "OSINT for Threat Intelligence",
        english: "OSINT for Threat Intelligence",
        minutes: 11,

        summary:
          "Baro sida OSINT loo isticmaalo threat research, iyo tools-ka caan ah.",

        sections: [
          {
            h: "OSINT Sources for Threat Intel",
            p:
            "Threat intel blogs (shirkadaha security), Twitter/X (researchers-ka wax badan wadaagaan), GitHub (malware analysis repos), VirusTotal, security conferences (talks iyo papers), CVE databases."
          },
          {
            h: "Threat Intel Sharing Platforms",
            p:
            "MISP (Malware Information Sharing Platform) waa tool bulsho ah oo lagu wadaago IOCs iyo threat data. AlienVault OTX waa platform kale oo bilaash ah oo threat intel feeds bixiya."
          },
          {
            h: "Verifying Sources",
            p:
            "Ma dhammaan OSINT-ku waa la aamini karaa — waa muhiim in la hubiyo source-ka (shirkad la yaqaan? research firm caan ah?), la barbardhigo sources kale, oo la eego waqtiga la daabacay (dated info-gu wuu noqon karaa mid aan hadda saxnayn)."
          },
          {
            h: "Building a Feed Strategy",
            p:
            "SOC yar-yar badanaa kuma filna resources ay ku sameeyaan intelligence gaar ah — waxay ku tiirsan yihiin feeds bilaash ah (OTX, abuse.ch) iyo shirkadaha threat intel commercial ah (marka miisaaniyaddu u oggolaato)."
          }
        ],

        terms: [
          { term: "MISP", def: "Malware Information Sharing Platform." },
          { term: "OTX", def: "AlienVault Open Threat Exchange — feed threat intel bilaash ah." },
          { term: "CVE", def: "Common Vulnerabilities and Exposures — database vulnerabilities la yaqaan." }
        ],

        quiz: [
          {
            q: "MISP waxaa loo isticmaalaa?",
            options: [
              "Wadaagida IOCs iyo threat data bulshada dhexdeeda",
              "Sameynta malware",
              "Backup files",
              "Beddelidda password"
            ],
            answer: 0,
            explain: "MISP waa platform community-driven threat sharing ah."
          },
          {
            q: "Sababta la hubiyo source-ka OSINT waa?",
            options: [
              "Ma dhammaan OSINT waa la aamini karaa — accuracy way kala duwan tahay",
              "OSINT waligeed waa sax",
              "Ma jiro sabab in la hubiyo",
              "OSINT waa mid keliya"
            ],
            answer: 0,
            explain: "Verification-ku waa muhiim si loo yareeyo qaladaad."
          },
          {
            q: "CVE waa maxay?",
            options: [
              "Database vulnerabilities la yaqaan",
              "Malware nooc ah",
              "Firewall software",
              "SIEM tool"
            ],
            answer: 0,
            explain: "CVE waa Common Vulnerabilities and Exposures."
          }
        ],

        exercise: {
          title: "OSINT Threat Research",
          steps: [
            "Raadi threat intel blog cusub (search 'latest threat intelligence report').",
            "Aqoonso threat actor ama campaign lagu sheegay.",
            "Soo saar 3 IOCs ama TTPs.",
            "Sharax sida aad u hubin lahayd source-kan sax yahay."
          ],
          deliverable: "OSINT threat research summary."
        }
      },


      {
        slug: "threat-intel-report-writing",
        title: "Threat Intel Report Writing",
        english: "Threat Intelligence Report Writing",
        minutes: 14,

        summary:
          "Baro qaab-dhismeedka threat intel report wanaagsan oo maamulka iyo technical teams labadaba u qoran.",

        sections: [
          {
            h: "Qaab-dhismeedka Report-ka",
            p:
            "Executive Summary (3-5 sadar), Threat Overview (waa maxay?), TTPs & IOCs, Impact Assessment, Recommendations (gaaban, dhexdhexaad, dheer). Report-ku waa in uu u adeegaa audience kala duwan."
          },
          {
            h: "Audience Awareness",
            p:
            "Maamulka wuxuu rabaa: saameyn ganacsi, go'aan la rabo. Technical teams waxay rabaan: IOCs, detection guidance, technical detail. Report-ku waa in uu ka jawaabo labadaba, laakiin qaybo kala duwan."
          },
          {
            h: "Actionable Recommendations",
            p:
            "Talo kastaa waa inay noqotaa mid la fulin karo oo mudnaan leh: 'Ku dar IOCs-kan blocklist-ka firewall-ka 48 saac gudahood (owner: Network Team)'. Talo aan lahayn owner iyo waqti weligeed lama fuliyo."
          },
          {
            h: "TLP (Traffic Light Protocol)",
            p:
            "TLP waa qaab lagu calaamadeeyo heerka qarsoodiga ee macluumaadka: RED (kaliya qof gaar ah), AMBER (organization-ka gudihiisa), GREEN (community-ka), CLEAR (dadweynaha). Report kasta waa in loo qeexo TLP level-kiisa."
          }
        ],

        terms: [
          { term: "Executive Summary", def: "Soo koobid maamulka loo qoray oo aan farsamo badan lahayn." },
          { term: "TLP", def: "Traffic Light Protocol — qaab calaamadeeya heerka qarsoodiga macluumaadka." },
          { term: "Actionable Recommendation", def: "Talo leh owner iyo waqti go'an." }
        ],

        quiz: [
          {
            q: "Executive summary waa in loo qoraa?",
            options: [
              "Luqad fudud oo maamulku fahmi karo",
              "Farsamo yaqaanno keliya",
              "Log qoraal ah",
              "Code"
            ],
            answer: 0,
            explain: "Maamulku wuxuu u baahan yahay saameyn iyo go'aan, ma aha faahfaahin farsamo."
          },
          {
            q: "TLP:RED macnaheedu waa?",
            options: [
              "Kaliya qof gaar ah/meeting ha laga baxin",
              "Dadweynaha oo dhan",
              "Community-ka",
              "Organization-ka gudihiisa"
            ],
            answer: 0,
            explain: "TLP:RED waa heerka ugu qarsoon ee TLP-ga."
          },
          {
            q: "Talo wanaagsan waxay leedahay?",
            options: [
              "Owner iyo waqti go'an",
              "Erayo badan",
              "Diagram keliya",
              "Magac shakhsi la eedeeyay"
            ],
            answer: 0,
            explain: "Actionable = cid mas'uul ah + waqti."
          }
        ],

        exercise: {
          title: "Write a Threat Intel Report",
          steps: [
            "Isticmaal threat actor ama campaign aad horay u baratay module-kan.",
            "Qor executive summary 4 sadar ah.",
            "Liis garee TTPs iyo IOCs.",
            "Ku dar 3 recommendations oo owner iyo waqti leh.",
            "Calaamadi TLP level-ka report-ka."
          ],
          deliverable: "Full threat intelligence report (portfolio-ready)."
        }
      },


      {
        slug: "threat-intelligence-capstone-lab",
        title: "Threat Intelligence — Full Capstone Lab",
        english: "Threat Intelligence Capstone Lab",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee threat intel research buuxa oo campaign dhab ah ku saabsan.",

        sections: [
          {
            h: "Scenario",
            p:
            "SOC Manager-kaagu wuxuu ku waydiiyay inaad research gareyso threat actor cusub oo bartilmaameedsanaya industry-ga shirkaddaadu ka tirsan tahay, oo aad soo bandhigto findings-kaaga team-ka."
          },
          {
            h: "Research Phase",
            p:
            "Isticmaal OSINT (threat intel blogs, MITRE ATT&CK, public reports) si aad u ururiso macluumaad ku saabsan threat actor-kan: motivation, TTPs, targets, IOCs."
          },
          {
            h: "Analysis Phase",
            p:
            "Buuxi Diamond Model-ka. Map TTPs-ka ATT&CK techniques. Kala saar IOCs Pyramid of Pain heerarkooda."
          },
          {
            h: "Reporting Phase",
            p:
            "Qor threat intel report buuxa oo leh executive summary, threat overview, TTPs/IOCs, impact assessment iyo recommendations owner/waqti leh. Calaamadi TLP level."
          }
        ],

        terms: [
          { term: "Full Threat Research", def: "Habraaca isugu jira OSINT, Diamond Model, ATT&CK mapping iyo reporting." }
        ],

        quiz: [
          {
            q: "Tallaabada ugu horreysa ee full threat research waa?",
            options: [
              "Research phase — ururinta macluumaad OSINT ah",
              "Qorista report-ka toos ah",
              "Xiritaanka accounts",
              "Beddelidda firewall rules"
            ],
            answer: 0,
            explain: "Waa in la ururiyaa macluumaad ka hor la falanqeeyo."
          },
          {
            q: "Diamond Model-ka gudihiisa, 'Infrastructure' wuxuu ka mid yahay?",
            options: [
              "Server-yada C2 attacker-ku isticmaalo",
              "Kaliya target-ka",
              "Kaliya motivation-ka",
              "Kaliya malware-ka"
            ],
            answer: 0,
            explain: "Infrastructure-ku waxaa ka mid ah C2 servers iyo hosting attacker-ku isticmaalo."
          },
          {
            q: "TLP level-ka waxaa loo daraa report-ka si?",
            options: [
              "Loo qeexo heerka qarsoodiga macluumaadka",
              "Loo kordhiyo bogagga",
              "Loo tirtiro logs",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "TLP wuxuu hagaa cidda macluumaadka la wadaagi karo."
          }
        ],

        exercise: {
          title: "Full Threat Intelligence Research Project",
          steps: [
            "Xulo threat actor ama malware campaign dhab ah (public threat report).",
            "Ururi macluumaad OSINT ah oo dhamaystiran.",
            "Buuxi Diamond Model iyo ATT&CK mapping.",
            "Qor threat intel report buuxa (executive summary + technical detail).",
            "Diyaari presentation gaaban (5 dhibco) oo team-ka loo bandhigi karo."
          ],
          deliverable: "Full threat intelligence research package (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "m9",
    slug: "incident-response-forensics",
    stage: "Sare",
    title: "Incident Response & Digital Forensics",
    english: "Incident Response & Digital Forensics",
    hours: 1,

    outcome:
      "Waxaad maamuli kartaa incident tallaabo-tallaabo (NIST lifecycle), ururin kartaa evidence si sax ah, oo qori kartaa warbixin incident xirfad leh.",

    topics: [
      "NIST Incident Response Lifecycle",
      "Evidence Collection & Chain of Custody",
      "Memory & Disk Forensics Basics",
      "Windows Forensic Artifacts",
      "Incident Report Writing",
      "Tabletop Exercises & IR Planning",
      "IR & Forensics Capstone Lab",
    ],

    lessonList: [

      {
        slug: "nist-ir-lifecycle",
        title: "NIST Incident Response Lifecycle",
        english: "NIST Incident Response Lifecycle",
        minutes: 12,

        summary:
          "Afarta wejiga ee jawaab-celinta dhacdooyinka iyo waxa la sameeyo weji kasta.",

        sections: [
          {
            h: "Preparation",
            p:
            "Playbooks, contact list, tools, backups la tijaabiyay, logging shaqaynaya, iyo tababar. Preparation-ka ayaa go'aaminaya haddii incident-ku noqonayo 2 saac mise 2 toddobaad."
          },
          {
            h: "Detection & Analysis",
            p:
            "Xaqiiji incident-ka, go'aami scope (immisa host? immisa account?), samee timeline, ururi IOCs, qiimee saameynta (data, availability, sharci). Halkan analyst-ka Tier 1/2 ayaa shaqada ugu badan qabta."
          },
          {
            h: "Containment, Eradication, Recovery",
            p:
            "Containment: go'doomi host-ka (network isolation), xir accounts, block IOCs — laakiin ilaali caddaymaha. Eradication: ka saar malware, dami persistence, beddel passwords. Recovery: dib u soo celi ka dib xaqiijin, la soco si dhow."
          },
          {
            h: "Lessons Learned",
            p:
            "Kulan kadib incident-ka: waxa shaqeeyay iyo waxa la hagaajinayo. Root cause analysis, timeline review, iyo update-ka playbooks-ka waxay ka mid yihiin tallaabooyinka wejiga afraad."
          }
        ],

        terms: [
          { term: "Containment", def: "Joojinta faafitaanka incident-ka." },
          { term: "Eradication", def: "Ka saarista weeraryahanka iyo malware-kiisa." },
          { term: "Lessons Learned", def: "Kulan kadib incident-ka lagu hagaajinayo nidaamka." }
        ],

        quiz: [
          {
            q: "Ransomware ayaa faafaya. Tallaabada ugu degdegsan?",
            options: [
              "Containment — go'doomi host-yada saameeyay",
              "Warbixin qor",
              "Sug ilaa subax",
              "Bixi lacagta madaxfurashada"
            ],
            answer: 0,
            explain: "Joojinta faafitaanka ayaa mudnaanta koowaad — kadibna baaritaan."
          },
          {
            q: "Weji kasta kadib waa in la sameeyo?",
            options: [
              "Lessons learned si loo hagaajiyo",
              "Wax lama sameeyo",
              "Software cusub la iibsado",
              "Analyst la eryo"
            ],
            answer: 0,
            explain: "Lessons learned waa wejiga afraad ee NIST."
          },
          {
            q: "Preparation phase-ka wuxuu ka kooban yahay?",
            options: [
              "Playbooks, tools, backups, tababar",
              "Kaliya baaritaanka incident dhab ah",
              "Kaliya containment",
              "Kaliya reporting"
            ],
            answer: 0,
            explain: "Preparation waa u diyaarinta ka hor incident-ku inuu dhaco."
          }
        ],

        exercise: {
          title: "Tabletop Exercise",
          steps: [
            "Sheeko: laptop maamule ayaa la qariyay (ransomware).",
            "Qor waxa aad samaynayso saacadda 1-aad, 4-aad iyo 24-aad.",
            "Qor cida la ogeysiinayo (IT, maamul, macaamiil, sharci)."
          ],
          deliverable: "Plan 1 bog ah oo waqti ku salaysan."
        }
      },


      {
        slug: "evidence-chain-of-custody",
        title: "Evidence Collection & Chain of Custody",
        english: "Evidence Collection and Chain of Custody",
        minutes: 10,

        summary:
          "Sida caddaymaha loo ururiyo si aan loo halleyn — chain of custody iyo order of volatility.",

        sections: [
          {
            h: "Order of Volatility",
            p:
            "Ka bilow waxa ugu dhaqso badan ee luma: registers/cache → memory (RAM) → network connections → processes → disk → backups → archives. Haddii aad damiso mashiinka, waxaad lumisay memory-ga."
          },
          {
            h: "Chain of Custody",
            p:
            "Diiwaan gali: yaa qaaday, goorma, halkee la dhigay, yaa gacanta ku hayay. Isticmaal hash (SHA256) si aad u caddayso in image-ku isbeddelin. Haddii chain-ku jabo, caddayntu maxkamad kuma shaqayn karto."
          },
          {
            h: "Forensic Imaging",
            p:
            "Marka la sameynayo forensic image (nuqul dhamaystiran oo disk ah), waxaa la isticmaalaa write-blocker si loo hubiyo in original evidence-ka aan la beddelin. Tools sida FTK Imager ama dd waa caan."
          },
          {
            h: "Documentation Standards",
            p:
            "Evidence log kasta waa in uu ku jiro: description, location la ka helay, waqtiga la qaaday, qofka qaaday, hash value, iyo dhammaan wareejinta (transfers) ee la sameeyay."
          }
        ],

        terms: [
          { term: "Chain of Custody", def: "Diiwaanka dhaq-dhaqaaqa caddaynta." },
          { term: "Hash (SHA256)", def: "Astaan lagu xaqiijiyo in file-ku isbeddelin." },
          { term: "Write-Blocker", def: "Qalab hardware ah oo ka hortagta wax laga beddelo original evidence." }
        ],

        quiz: [
          {
            q: "Kee ayaa ugu horreeya order of volatility?",
            options: ["RAM/memory", "Disk image", "Backup tapes", "Archives"],
            answer: 0,
            explain: "Memory-gu waa mid si dhakhso ah u luma — marka hore ayaa la qaadaa."
          },
          {
            q: "Sababta write-blocker loo isticmaalo waa?",
            options: [
              "Si loo hubiyo in original evidence-ka aan la beddelin",
              "Si loo kordhiyo speed",
              "Si loo sameeyo backup",
              "Si loo beddelo IP"
            ],
            answer: 0,
            explain: "Write-blocker wuxuu ka hortagaa wax kasta oo la qori lahaa disk-ka asalka ah."
          },
          {
            q: "Haddii chain of custody-ga uu jabo, natiijadu waa?",
            options: [
              "Caddayntu maxkamad kuma shaqayn karto",
              "Wax dhib ah ma jiraan",
              "Evidence-ku wuu hagaagaa",
              "Backup si otomaatig ah ayaa loo sameeyaa"
            ],
            answer: 0,
            explain: "Chain of custody-ga oo jaban wuxuu keenaa in caddaynta la shaki galo."
          }
        ],

        exercise: {
          title: "Evidence Log Practice",
          steps: [
            "Samee template chain of custody ah.",
            "Buuxi tusaale: qaadista log file, hash, waqti, qofka.",
            "Ku darso 5 artifact oo aad ururin lahayd host Windows ah.",
            "Sharax order of volatility ee 5-tan artifact."
          ],
          deliverable: "Chain of custody template + tusaale buuxa."
        }
      },


      {
        slug: "memory-disk-forensics-basics",
        title: "Memory & Disk Forensics Basics",
        english: "Memory and Disk Forensics Basics",
        minutes: 13,

        summary:
          "Hordhac memory forensics iyo disk forensics — waxa laga helo iyo tools aasaasiga ah.",

        sections: [
          {
            h: "Memory Forensics",
            p:
            "Memory (RAM) capture wuxuu bixiyaa processes-ka socda, network connections, credentials aan la encrypt-gareyn, iyo malware fileless ah oo aan disk-ka ku jirin. Tools sida Volatility ayaa loo isticmaalaa in la falanqeeyo memory dumps."
          },
          {
            h: "Disk Forensics",
            p:
            "Disk image-ku wuxuu bixiyaa files la tirtiray (deleted files), timestamps, browser history, iyo file system metadata. Tools sida Autopsy ama FTK ayaa loo isticmaalaa disk analysis."
          },
          {
            h: "Timeline Analysis",
            p:
            "Isku darka memory iyo disk artifacts waxay u ogolaataa analyst inuu sameeyo timeline dhamaystiran — waqtiga file-ka la sameeyay, waqtiga process-ka la fuliyay, iyo waqtiga network connection-ka la sameeyay."
          },
          {
            h: "Anti-Forensics Awareness",
            p:
            "Attacker-yada qaarkood waxay isku dayaan inay tirtiraan ama beddelaan evidence (log clearing, timestomping — beddelidda file timestamps). Analyst-ku waa inuu ka digtoonaado calaamadahan."
          }
        ],

        terms: [
          { term: "Memory Dump", def: "Nuqul ka mid ah xogta RAM-ka waqtigaas." },
          { term: "Volatility", def: "Tool caan ah oo lagu falanqeeyo memory dumps." },
          { term: "Timestomping", def: "Beddelidda file timestamps si loo qariyo dhaqan." }
        ],

        quiz: [
          {
            q: "Memory forensics wuxuu bixiyaa?",
            options: [
              "Processes, network connections iyo credentials aan encrypted ahayn",
              "Kaliya files la tirtiray",
              "Kaliya browser history",
              "Kaliya backup"
            ],
            answer: 0,
            explain: "Memory-gu wuxuu hayaa xog aan disk-ka lagu heli karin."
          },
          {
            q: "Timestomping waa maxay?",
            options: [
              "Beddelidda file timestamps si loo qariyo dhaqan",
              "Sameynta backup",
              "Kordhinta CPU",
              "Beddelidda IP"
            ],
            answer: 0,
            explain: "Attacker-yadu waxay beddelaan timestamps si ay uga fogaadaan detection."
          },
          {
            q: "Volatility waxaa loo isticmaalaa?",
            options: [
              "Falanqaynta memory dumps",
              "Sameynta disk image",
              "Xiritaanka network",
              "Beddelidda password"
            ],
            answer: 0,
            explain: "Volatility waa tool caan ah oo memory analysis ah."
          }
        ],

        exercise: {
          title: "Forensics Tool Familiarization",
          steps: [
            "Baro waxa Volatility sameeyo (iyada oo aan la fulin).",
            "Sharax farqiga memory iyo disk forensics.",
            "Liis garee 5 artifacts oo laga heli karo memory image.",
            "Sharax sida timestomping loo ogaan karo."
          ],
          deliverable: "Forensics basics study notes."
        }
      },


      {
        slug: "windows-forensic-artifacts",
        title: "Windows Forensic Artifacts",
        english: "Windows Forensic Artifacts",
        minutes: 10,

        summary:
          "Baro artifacts-ka Windows ee muhiimka ah ee forensic investigation-ku isticmaalo.",

        sections: [
          {
            h: "Prefetch & Shimcache",
            p:
            "Prefetch files (.pf) waxay muujiyaan programs la fuliyay iyo waqtiyada la fuliyay. Shimcache/AmCache waxay bixiyaan macluumaad ku saabsan executables la fuliyay, xitaa haddii la tirtiray."
          },
          {
            h: "Registry Artifacts",
            p:
            "Run keys (persistence), UserAssist (programs GUI ah user-ku furay), ShellBags (folders user-ku booqday), RecentDocs — dhammaantood waxay bixiyaan evidence ku saabsan user activity."
          },
          {
            h: "Event Logs iyo $MFT",
            p:
            "Windows Event Logs (Security, System, Application) waa source-ka ugu weyn ee evidence-ka. $MFT (Master File Table) wuxuu kaydiyaa metadata dhammaan files-ka NTFS volume-ka, oo ay ku jiraan kuwo la tirtiray."
          },
          {
            h: "Browser Artifacts",
            p:
            "Browser history, downloads, cookies iyo cache waxay bixiyaan evidence ku saabsan websites user-ku booqday iyo files la soo dejiyay — muhiim marka la baarayo phishing ama data exfiltration."
          }
        ],

        terms: [
          { term: "Prefetch", def: "Windows artifact muujinaya program-yada la fuliyay." },
          { term: "$MFT", def: "Master File Table — kaydinta metadata dhammaan files NTFS." },
          { term: "ShellBags", def: "Registry artifact muujinaya folders user-ku booqday." }
        ],

        quiz: [
          {
            q: "Prefetch files waxay muujiyaan?",
            options: [
              "Programs la fuliyay iyo waqtiyada la fuliyay",
              "Kaliya browser history",
              "Kaliya email",
              "Kaliya passwords"
            ],
            answer: 0,
            explain: "Prefetch waa artifact muhiim ah oo execution evidence ah."
          },
          {
            q: "$MFT wuxuu kaydiyaa?",
            options: [
              "Metadata dhammaan files NTFS volume-ka, xitaa kuwa la tirtiray",
              "Kaliya user passwords",
              "Kaliya network connections",
              "Kaliya RAM data"
            ],
            answer: 0,
            explain: "$MFT waa xarunta metadata-ga NTFS filesystem."
          },
          {
            q: "ShellBags waxay muujiyaan?",
            options: [
              "Folders user-ku booqday",
              "Websites la booqday",
              "Emails la diray",
              "Passwords la isticmaalay"
            ],
            answer: 0,
            explain: "ShellBags waa registry artifact folder navigation ah."
          }
        ],

        exercise: {
          title: "Windows Artifacts Reference Sheet",
          steps: [
            "Samee jaantus 8 Windows forensic artifacts.",
            "Mid kasta u qor waxa uu bixiyo oo evidence ah.",
            "Sharax sida artifact kasta loogu isticmaali lahaa timeline dhisidda.",
            "Qor tusaale scenario ah oo artifact kasta muhiim ku noqon lahaa."
          ],
          deliverable: "Windows forensic artifacts reference sheet."
        }
      },


      {
        slug: "incident-report-writing",
        title: "Qorista Warbixinta Incident-ka",
        english: "Writing the Incident Report",
        minutes: 12,

        summary:
          "Qaab-dhismeedka warbixinta xirfadeed ee maamulka iyo tikniyoolajiyada labadaba u qoran.",

        sections: [
          {
            h: "Qaab-dhismeedka",
            p:
            "1) Executive summary. 2) Timeline UTC. 3) Scope & impact. 4) Root cause. 5) Caddaymaha (IOCs, log excerpts). 6) Tallaabooyinka la qaaday. 7) Talooyinka (gaaban, dhexdhexaad, dheer)."
          },
          {
            h: "Luqadda",
            p:
            "Qor xaqiiqooyin, ha qorin malo. Kala saar 'waxaan ogaanay' iyo 'waxaan u malaynaynaa'. Isticmaal waqti UTC, ID cad (hostnames, usernames), iyo tirooyin. Ha eedayn shakhsi — diiradda saar nidaamka."
          },
          {
            h: "Root Cause Analysis",
            p:
            "Root cause ma aha kaliya 'user-ku wuxuu gujiyay link' — waxay sii dheer tahay: sababta filtering-ka email-ku uusan qaban, sababta MFA aan jirin, sababta backup-ku aan shaqaynayn. 5 Whys technique waa mid caan ah."
          },
          {
            h: "Talooyinka",
            p:
            "Talo kastaa waa inay noqotaa mid la fulin karo oo mudnaan leh: 'Ku shid MFA dhammaan accounts-ka admin-ka 30 maalmood gudahood (owner: IT Manager)'."
          }
        ],

        terms: [
          { term: "Root Cause Analysis", def: "Baaritaanka sababta asaasiga ah ee incident-ka keentay." },
          { term: "5 Whys", def: "Technique la weydiiyo 'maxaa keenay?' shan jeer si loo helo root cause." }
        ],

        quiz: [
          {
            q: "Executive summary waa in loo qoraa?",
            options: [
              "Luqad fudud oo maamulku fahmi karo",
              "Farsamo yaqaanno keliya",
              "Log qoraal ah",
              "Code"
            ],
            answer: 0,
            explain: "Maamulku wuxuu u baahan yahay saameyn iyo go'aan, ma aha faahfaahin farsamo."
          },
          {
            q: "5 Whys technique waxaa loo isticmaalaa?",
            options: [
              "In la helo root cause dhabta ah",
              "In la kordhiyo RAM",
              "In la tirtiro logs",
              "In la beddelo IP"
            ],
            answer: 0,
            explain: "5 Whys waa hab lagu qoto dheereeyo baaritaanka sababta."
          },
          {
            q: "Warbixin wanaagsan waa in ay?",
            options: [
              "Kala saarto xaqiiqooyin iyo malo",
              "Kaliya malo ku salaysan",
              "Kaliya jargon farsamo ah",
              "Aan lahayn timeline"
            ],
            answer: 0,
            explain: "Xaqiiqooyinka iyo malo-yinka waa in kala saaran yihiin si aan loo marin habaabin."
          }
        ],

        exercise: {
          title: "Qor Warbixin Buuxda",
          steps: [
            "Isticmaal mid ka mid ah labs-ka aad dhammaysay module-yadan hore.",
            "Qor 7-da qaybood ee warbixinta.",
            "Isticmaal 5 Whys si aad u helo root cause.",
            "Ku dar 3 talo oo owner iyo waqti leh."
          ],
          deliverable: "Warbixin 2 bog ah oo portfolio-gaaga gali karto."
        }
      },


      {
        slug: "tabletop-exercises-ir-planning",
        title: "Tabletop Exercises & IR Planning",
        english: "Tabletop Exercises and IR Planning",
        minutes: 13,

        summary:
          "Faham sida tabletop exercises loo qorsheeyo loona qabto si SOC-gu u diyaargaroobo incidents dhab ah.",

        sections: [
          {
            h: "Waa Maxay Tabletop Exercise?",
            p:
            "Tabletop exercise waa simulation aan-technical ah oo team-ku ku dhex fikirto sida ay u jawaabi lahaayeen scenario incident ah — iyada oo aan systems dhab ah la taaban. Wuxuu u ogolaadaa team-ka inuu tijaabiyo playbooks iyada oo aan halis lahayn."
          },
          {
            h: "Naqshadaynta Exercise-ka",
            p:
            "Xulo scenario dhab u eg (ransomware, data breach, insider threat). Samee inject points (macluumaad cusub oo la geliyo si scenario-hu u sii socdo). Ku dar decision points oo team-ku go'aan ka gaadhaan."
          },
          {
            h: "Roles iyo Facilitation",
            p:
            "U qoondee doorar (facilitator, participants ka socda roles kala duwan sida IT, legal, PR, management). Facilitator-ku wuxuu maamulaa socodka exercise-ka, wuxuuna diiwaan geliyaa observations."
          },
          {
            h: "After-Action Review",
            p:
            "Kadib exercise-ka, samee after-action review: waxa shaqeeyay, waxa aan shaqeynin, iyo waxa la hagaajinayo playbooks-ka. Update-ka joogtada ah ee playbooks-ka ayaa muhiim ah."
          }
        ],

        terms: [
          { term: "Tabletop Exercise", def: "Simulation aan-technical ah oo lagu tijaabiyo IR playbooks." },
          { term: "Inject Point", def: "Macluumaad cusub oo lagu geliyo scenario-ga si uu u sii socdo." },
          { term: "After-Action Review", def: "Dib u eegis kadib exercise-ka si loo hagaajiyo playbooks-ka." }
        ],

        quiz: [
          {
            q: "Tabletop exercise faa'iidadeeda ugu weyn waa?",
            options: [
              "Tijaabinta playbooks iyada oo aan halis lahayn",
              "Sameynta backup dhab ah",
              "Xiritaanka network dhab ah",
              "Beddelidda hardware"
            ],
            answer: 0,
            explain: "Waxay u ogolaataa team-ka inuu barto iyada oo aan systems dhab ah la taaban."
          },
          {
            q: "After-action review waxay caawisaa?",
            options: [
              "Hagaajinta playbooks-ka iyadoo lagu saleynayo waxa la bartay",
              "Kordhinta RAM",
              "Tirtirida logs",
              "Beddelidda IP"
            ],
            answer: 0,
            explain: "Review-gu wuxuu caawiyaa in mustaqbalka la hagaajiyo."
          },
          {
            q: "Facilitator-ka doorkiisu waa?",
            options: [
              "Maamulka socodka exercise-ka iyo diiwaangelinta observations",
              "Kaliya eegista",
              "Sameynta malware",
              "Beddelidda password"
            ],
            answer: 0,
            explain: "Facilitator-ku wuxuu hagaa exercise-ka."
          }
        ],

        exercise: {
          title: "Design a Tabletop Exercise",
          steps: [
            "Xulo scenario (tusaale: insider threat oo xog xaday).",
            "Naqshadee 3 inject points oo scenario-ga sii socda.",
            "U qoondee doorar 4 participants ah.",
            "Sharax after-action review questions aad weydiin lahayd kadib."
          ],
          deliverable: "Tabletop exercise design document."
        }
      },


      {
        slug: "ir-forensics-capstone-lab",
        title: "IR & Forensics — Full Capstone Lab",
        english: "Incident Response and Forensics Capstone Lab",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee incident response buuxa oo leh evidence collection iyo reporting.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad hesha alert ah in employee-ka finance-ka uu furay phishing email, ka dibna endpoint-kiisa waxaa laga arkay PowerShell activity iyo xiriir C2 ah. 2 saacadood kadib, files server-ka shirkadda waxaa la arkay oo la encrypt-gareeyay."
          },
          {
            h: "NIST Lifecycle Application",
            p:
            "Raac 4-ta weji: Detection & Analysis (baar endpoint-ka, hel scope), Containment (go'doomi host-yada saameeyay), Eradication (ka saar malware, dami persistence), Recovery (dib u soo celi systems)."
          },
          {
            h: "Evidence Collection",
            p:
            "Sii kaydi order of volatility: qaado memory dump ka hor inaad dami mashiinka, samee disk image, diiwaan geli chain of custody dhammaan evidence-ka la ururiyay."
          },
          {
            h: "Reporting",
            p:
            "Diyaari warbixin buuxda oo leh executive summary, timeline UTC, root cause analysis (5 Whys), evidence summary, iyo recommendations owner/waqti leh."
          }
        ],

        terms: [
          { term: "Full IR Cycle", def: "Baaritaan isugu jira dhammaan 4-ta weji ee NIST lifecycle-ka." }
        ],

        quiz: [
          {
            q: "Marka la baarayo incident-kan, tallaabada koowaad waa?",
            options: [
              "Detection & Analysis — baar endpoint-ka oo hel scope-ka",
              "Isla markiiba bixinta ransom",
              "Tirtirid dhammaan files",
              "Iska indho tirid alert-ka"
            ],
            answer: 0,
            explain: "Waa in la fahmaa xaalada ka hor la qaado tallaabooyin kale."
          },
          {
            q: "Memory dump waa in la qaadaa marka?",
            options: [
              "Ka hor inta aan mashiinka la damin",
              "Ka dib marka mashiinka la damiyo",
              "Kaliya haddii loo baahdo dib",
              "Waligeed lama qaado"
            ],
            answer: 0,
            explain: "Memory-gu wuxuu lumaa marka mashiinka la damiyo — waa in la qaadaa ka hor."
          },
          {
            q: "Warbixinta ugu dambaysa waa in ay ku jirto?",
            options: [
              "Root cause analysis iyo recommendations owner/waqti leh",
              "Kaliya magaca employee-ga khaldamay",
              "Kaliya lacagta lumay",
              "Ma jiro waxa lagu daraa"
            ],
            answer: 0,
            explain: "Warbixin dhamaystiran waxay u baahan tahay root cause iyo actionable recommendations."
          }
        ],

        exercise: {
          title: "Full Incident Response Simulation",
          steps: [
            "Raac 4-ta weji ee NIST lifecycle-ka scenario-ga sare.",
            "Samee timeline UTC ah oo dhammaystiran.",
            "Diiwaan geli chain of custody evidence-ka la ururiyay.",
            "Samee root cause analysis 5 Whys ah.",
            "Diyaari warbixin buuxda (executive summary + technical detail, portfolio-ready)."
          ],
          deliverable: "Full incident response & forensics report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "m10",
    slug: "capstone-career-readiness",
    stage: "Sare",
    title: "Capstone & Career Readiness",
    english: "Capstone & Career Readiness",
    hours: 2,

    outcome:
      "Waxaad dhammaystiri doontaa end-to-end incident simulation, dhisi doontaa portfolio xirfadeed, oo diyaar u noqon doontaa interview-yada SOC Analyst Tier 1.",

    topics: [
      "End-to-End Incident Simulation",
      "Building Your SOC Portfolio",
      "Resume & LinkedIn for SOC Analysts",
      "Certification Roadmap",
      "Interview Prep: Technical Questions",
      "Interview Prep: Behavioral & Scenario Questions",
      "Final Capstone Project",
    ],

    lessonList: [

      {
        slug: "end-to-end-incident-simulation",
        title: "End-to-End Incident Simulation",
        english: "End-to-End Incident Simulation",
        minutes: 15,

        summary:
          "Isku dar dhammaan xirfadaha aad baratay 9-da module ee hore — baar, xaqiiji, oo xal incident dhamaystiran oo kala duwan.",

        sections: [
          {
            h: "Scenario Overview",
            p:
            "Shirkad tusaale ah ayaa hesha alert ah in employee uu furay phishing email. Waxaad la socon doontaa dhacdada laga bilaabo email-ka ilaa incident-ka oo la xaliyay, adigoo isticmaalaya xirfadaha dhammaan module-yada hore."
          },
          {
            h: "Networking iyo Endpoint Investigation",
            p:
            "Isticmaal xirfadaha networking (m2) iyo Windows/Linux (m3, m4) si aad u baarto traffic-ka iyo endpoint-ka saameeyay. Aqoonso IOCs iyo process chains shaki leh."
          },
          {
            h: "Threat Analysis iyo Intelligence",
            p:
            "Isticmaal xirfadaha threats/social engineering (m5) si aad u falanqeyso email-ka phishing-ka ahaa. Isticmaal threat intelligence (m8) si aad u aqoonsato haddii TTPs-ku la mid yihiin threat actor la yaqaan."
          },
          {
            h: "SOC Workflow iyo Detection",
            p:
            "Isticmaal triage workflow (m6) si aad alert-ka u kala hormariso. Isticmaal SIEM/detection skills (m7) si aad u qorto queries lagu ogaan karo dhaqan la mid ah mustaqbalka."
          },
          {
            h: "Incident Response & Reporting",
            p:
            "Ugu dambeyn, isticmaal IR/forensics (m9) si aad u ururiso evidence, u xalliso incident-ka, oo u qorto warbixin buuxa oo dhamaystiran."
          }
        ],

        terms: [
          { term: "End-to-End Investigation", def: "Baaritaan isku daraya dhammaan xirfadaha SOC analyst-ka laga bilaabo detection ilaa reporting." }
        ],

        quiz: [
          {
            q: "End-to-end simulation-ku wuxuu isku darayaa?",
            options: [
              "Dhammaan xirfadaha module-yada hore (networking, endpoint, threat, SIEM, IR)",
              "Kaliya networking",
              "Kaliya forensics",
              "Kaliya reporting"
            ],
            answer: 0,
            explain: "Capstone-ku wuxuu isku daraa dhammaan waxa aad baratay."
          },
          {
            q: "Marka la bilaabo scenario-ga, waxa ugu horreeya waa?",
            options: [
              "Falanqaynta email-ka asalka ah",
              "Warbixinta ugu dambaysa",
              "Xiritaanka accounts oo dhan",
              "Beddelidda hardware"
            ],
            answer: 0,
            explain: "Waa in la fahmaa asalka weerarka ka hor la baaro saameynta."
          },
          {
            q: "Sababta simulation-kani muhiim u yahay portfolio-gaaga waa?",
            options: [
              "Wuxuu muujiyaa awoodaada dhammaystirka process-ka SOC oo dhan",
              "Wuxuu kaliya muujiyaa aqoon academic ah",
              "Ma jiro faa'iido",
              "Wuxuu kaliya muujiyaa typing speed"
            ],
            answer: 0,
            explain: "Employers-yadu waxay rabaan inay arkaan awoodda dhammaystirka investigation oo dhan."
          }
        ],

        exercise: {
          title: "Full Incident Simulation",
          steps: [
            "Akhri scenario-ga phishing-to-ransomware ah.",
            "Baar network traffic, endpoint activity iyo email headers.",
            "Aqoonso IOCs iyo map ATT&CK techniques.",
            "Xaliyi incident-ka (containment, eradication, recovery).",
            "Qor warbixin buuxa oo dhamaystiran (portfolio centerpiece)."
          ],
          deliverable: "Complete end-to-end incident investigation (portfolio centerpiece)."
        }
      },


      {
        slug: "building-soc-portfolio",
        title: "Building Your SOC Portfolio",
        english: "Building Your SOC Portfolio",
        minutes: 11,

        summary:
          "Baro sida loo ururiyo labs-ka aad dhammaystay oo loo dhiso portfolio xirfadeed oo employers ay arki karaan.",

        sections: [
          {
            h: "Sababta Portfolio Muhiim u Yahay",
            p:
            "SOC Analyst Tier 1 jobs badanaa waxay u baahan yihiin 0-1 sano oo experience ah. Portfolio wuxuu kuu ogolaadaa inaad muujiso xirfado dhab ah, xitaa haddii aadan lahayn shaqo hore oo cybersecurity ah."
          },
          {
            h: "Waxa Portfolio-gu Ku Jiro",
            p:
            "3-5 incident investigation reports (labs-kaaga ugu fiican), 1-2 detection rules (Sigma), sample SOC tickets, iyo threat intel report. Xushi kuwa ugu tayada sarreeya, ma aha dhammaan labs-kaaga."
          },
          {
            h: "Sida Loo Bandhigo",
            p:
            "GitHub repo ama website shakhsi ah waa habab caan ah. Sanitize xogta xasaasi ah (isticmaal data tusaale ah, ha isticmaalin xog dhab ah oo shirkad ah). Ku dar README wax ka sheegaya sidii aad u baratay."
          },
          {
            h: "Continuous Improvement",
            p:
            "Portfolio-gu maaha mid la dhammeeyo hal mar. Sii dar labs cusub marka aad wax cusub barato, oo hagaaji reports-ka hore marka aad xirfado cusub heshid."
          }
        ],

        terms: [
          { term: "Portfolio", def: "Ururinta labs/reports la muujiyo si loo caddeeyo xirfadaha." },
          { term: "Sanitize", def: "Ka saarida xog xasaasi ah ka hor la bandhigo." }
        ],

        quiz: [
          {
            q: "Sababta portfolio muhiim u yahay SOC Analyst cusub waa?",
            options: [
              "Wuxuu muujiyaa xirfado dhab ah xitaa la'aanta experience",
              "Wuxuu bedelayaa shahaado",
              "Waa shuruud rasmi ah oo interview",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Portfolio-gu wuxuu caddeeyaa hands-on skills."
          },
          {
            q: "Sanitize macnaheedu waa?",
            options: [
              "Ka saarista xog xasaasi ah ka hor la bandhigo",
              "Sameynta backup",
              "Tirtirida labs oo dhan",
              "Kordhinta CPU"
            ],
            answer: 0,
            explain: "Marnaba ha bandhigin xog dhab ah oo xasaasi ah oo shirkad ka soo jeeda."
          },
          {
            q: "Portfolio-gu waa in uu ahaadaa?",
            options: [
              "Kuwa ugu tayada sarreeya, ma aha dhammaan labs-ka",
              "Dhammaan labs-ka aan la kala saarin",
              "Kaliya hal lab",
              "Kaliya certificates"
            ],
            answer: 0,
            explain: "Quality over quantity — xushi kuwa ugu fiican."
          }
        ],

        exercise: {
          title: "Portfolio Planning",
          steps: [
            "Dib u eeg dhammaan labs-ka aad dhammaystay module-yada hore.",
            "Xulo 5 labs ugu fiican oo aad ku darto portfolio-ga.",
            "Naqshadee structure GitHub repo ama website ah.",
            "Qor README hordhac ah oo sharaxaya waddadaada barashada."
          ],
          deliverable: "Portfolio structure plan + list of selected labs."
        }
      },


      {
        slug: "resume-linkedin-soc-analysts",
        title: "Resume & LinkedIn for SOC Analysts",
        english: "Resume and LinkedIn for SOC Analysts",
        minutes: 14,

        summary:
          "Baro sida loo qoro resume iyo LinkedIn profile oo SOC Analyst recruiters ay u soo jeedaan.",

        sections: [
          {
            h: "Resume Structure",
            p:
            "Summary gaaban (2-3 sadar), Technical Skills (SIEM, tools, protocols), Projects/Labs (portfolio-gaaga), Certifications, Education. Haddii aadan lahayn experience shaqo, ku dar labs iyo projects meesha experience-ka."
          },
          {
            h: "Keyword Optimization",
            p:
            "Job descriptions-yada SOC Analyst waxay isticmaalaan keywords sida 'SIEM', 'incident response', 'threat detection', 'MITRE ATT&CK'. Ku dar keywords-kan resume-gaaga (haddii ay run yihiin) si ATS (Applicant Tracking Systems) uu kuu ogaado."
          },
          {
            h: "LinkedIn Profile",
            p:
            "Headline cad ('Aspiring SOC Analyst | CompTIA Security+ | Threat Detection'). Summary sharaxaya waddadaada. Ku dar labs/projects sida 'Featured' section. La xiriir cybersecurity professionals si aad u ballaadhiso network-kaaga."
          },
          {
            h: "Avoiding Common Mistakes",
            p:
            "Ha sheegin xirfado aadan lahayn. Ha ku qorin jargon aadan fahmin. Hubi typos-ka. Resume-gu waa in uu ahaado hal bog (entry-level ahaan)."
          }
        ],

        terms: [
          { term: "ATS", def: "Applicant Tracking System — software falanqeeya resumes keywords ahaan." },
          { term: "Keyword Optimization", def: "Ku darista erayo la yaqaan job description-yada si loo ogaado." }
        ],

        quiz: [
          {
            q: "Haddii aadan lahayn experience shaqo, ku beddel?",
            options: [
              "Labs iyo projects meesha experience-ka",
              "Wax walba ka tag banaan",
              "Been sheeg",
              "Ha buuxin resume-ga"
            ],
            answer: 0,
            explain: "Labs-ka waxay muujiyaan xirfado dhab ah."
          },
          {
            q: "ATS waa maxay?",
            options: [
              "Software falanqeeya resumes keywords ahaan",
              "Nooc SIEM ah",
              "Malware nooc ah",
              "Firewall tool"
            ],
            answer: 0,
            explain: "ATS waxay marka hore falanqeysaa resumes ka hor inuu qof dhab ah eego."
          },
          {
            q: "Sababta la iska ilaaliyo jargon aan la fahmin waa?",
            options: [
              "Waxay muujin kartaa aqoon aan run ahayn",
              "Waa muhiim in la isticmaalo si kasta",
              "Ma jiro sabab",
              "Waa qaab caan ah"
            ],
            answer: 0,
            explain: "Interview-ku wuu ku weydiin karaa jargon-ka aad isticmaashay."
          }
        ],

        exercise: {
          title: "Build Your Resume & LinkedIn",
          steps: [
            "Qor resume 1-bog ah oo ku salaysan structure-ka kor ku sharaxan.",
            "Ku dar 3-5 keywords job descriptions SOC Analyst ah.",
            "Naqshadee LinkedIn headline iyo summary.",
            "Dib u eeg oo hubi typos iyo sax naxwe."
          ],
          deliverable: "Draft resume + LinkedIn profile outline."
        }
      },


      {
        slug: "certification-roadmap",
        title: "Certification Roadmap",
        english: "Certification Roadmap for SOC Analysts",
        minutes: 12,

        summary:
          "Faham certifications-ka SOC Analyst career path-ka muhiim u ah iyo habka la raaco.",

        sections: [
          {
            h: "Entry-Level Certifications",
            p:
            "ISC2 Certified in Cybersecurity (CC) — bilaash, aasaasi. CompTIA A+/ITF+ — aasaaska IT. Kuwan waxay muujiyaan aqoon aasaasi ah si loo bilaabo career-ga."
          },
          {
            h: "Tier 1 SOC Analyst Certifications",
            p:
            "CompTIA Security+ waa mid ka mid ah certification-yada ugu caansan ee SOC Analyst Tier 1 shaqooyinka ka codsan. Waxay daboolaan security concepts, threats, iyo risk management aasaasiga ah."
          },
          {
            h: "Advancing: Blue Team Certifications",
            p:
            "Marka aad hesho experience, waxaad tixgelin kartaa Blue Team Level 1 (BTL1) — practical, hands-on, oo diiradda saaraya SOC skills dhab ah. GCIH (GIAC Certified Incident Handler) waa mid heer sare ah."
          },
          {
            h: "Sida Loo Dooranayo",
            p:
            "Ha isku dayin inaad hesho certifications badan isla mar. Xulo hal certification, baro si fiican, kadibna samee lab-yo taageera aqoonta. Certification kaliya lama filna — waa in lala socodsiiyaa portfolio-ga."
          }
        ],

        terms: [
          { term: "ISC2 CC", def: "Certified in Cybersecurity — certification bilaash ah oo aasaasi ah." },
          { term: "Security+", def: "CompTIA certification caan ah oo SOC Analyst Tier 1 ah." },
          { term: "BTL1", def: "Blue Team Level 1 — certification hands-on ah oo SOC skills ah." }
        ],

        quiz: [
          {
            q: "ISC2 CC waa?",
            options: [
              "Certification bilaash ah oo aasaasi ah",
              "Certification qaali ah oo heer sare ah",
              "Nooc SIEM ah",
              "Malware nooc ah"
            ],
            answer: 0,
            explain: "ISC2 CC waa entry-level oo bilaash ah."
          },
          {
            q: "Security+ waxay daboolaan?",
            options: [
              "Security concepts, threats iyo risk management aasaasiga ah",
              "Kaliya networking",
              "Kaliya programming",
              "Kaliya hardware repair"
            ],
            answer: 0,
            explain: "Security+ waa foundational cybersecurity certification."
          },
          {
            q: "Habka ugu fiican ee certifications loo raaco waa?",
            options: [
              "Hal mar hal certification, oo lala socodsiiyo labs",
              "Dhammaan isla mar",
              "In aan la sameyn labs",
              "Kaliya certification qaali ah"
            ],
            answer: 0,
            explain: "Focus-ku wuxuu ka dhigayaa barashada mid go'an oo qoto dheer."
          }
        ],

        exercise: {
          title: "Certification Planning",
          steps: [
            "Xulo certification aad ku bilaabi lahayd (ISC2 CC ama Security+).",
            "Raadi syllabus-ka certification-kaas.",
            "Naqshadee study plan 8-12 toddobaad ah.",
            "Isku xir plan-kaaga labs-ka aad horay u dhammaystay."
          ],
          deliverable: "Personal certification study plan."
        }
      },


      {
        slug: "interview-prep-technical",
        title: "Interview Prep: Technical Questions",
        english: "Interview Preparation: Technical Questions",
        minutes: 10,

        summary:
          "Diyaari nafaqaysiga su'aalaha technical ee ugu badan interview-yada SOC Analyst Tier 1.",

        sections: [
          {
            h: "Su'aalaha Networking iyo Windows/Linux",
            p:
            "'Sharax three-way handshake', 'Farqiga TCP iyo UDP', 'Event ID 4625 macnaheedu waa maxay?', 'Sharax sida aad u baari lahayd suspicious PowerShell'. Diyaari jawaabo gaaban oo cad."
          },
          {
            h: "Su'aalaha SIEM iyo Detection",
            p:
            "'Sharax sida aad u qori lahayd query brute force ah', 'Waa maxay false positive iyo sidee loo tuning gareeyaa?', 'Sharax MITRE ATT&CK oo kooban'."
          },
          {
            h: "Scenario-Based Technical Questions",
            p:
            "'Waxaad aragtaa 100 failed login isla user 5 daqiiqo gudahood, maxaad samaynaysaa?' — jawaabta waa in ay muujiso process-kaaga triage, ma aha kaliya jawaab kooban."
          },
          {
            h: "STAR Method for Technical Answers",
            p:
            "Situation, Task, Action, Result — xitaa su'aalaha technical, isticmaal qaab structured ah si aad u muujiso habka aad u fikirto, ma aha kaliya xaqiiqooyinka aad taqaan."
          }
        ],

        terms: [
          { term: "STAR Method", def: "Situation, Task, Action, Result — qaab jawaab structured ah." }
        ],

        quiz: [
          {
            q: "Marka su'aal scenario ah lagu weydiiyo, jawaabtu waa in ay muujiso?",
            options: [
              "Process-kaaga triage, ma aha kaliya jawaab kooban",
              "Kaliya hal eray",
              "Kaliya 'waan ogahay'",
              "Su'aal kale oo kale ah"
            ],
            answer: 0,
            explain: "Interviewers-yadu waxay rabaan inay arkaan sida aad u fikirto."
          },
          {
            q: "STAR Method-ku waxay taageeraan?",
            options: [
              "Qaab jawaab structured ah oo muujinaya process-ka fikirka",
              "Kaliya jawaabo gaaban",
              "Kaliya su'aalaha behavioral",
              "Ma jiro faa'iido technical questions"
            ],
            answer: 0,
            explain: "STAR wuxuu u fiicanyahay dhammaan noocyada su'aalaha, gaar ahaan scenario-based."
          },
          {
            q: "Diyaarinta su'aalaha technical waxay u baahan tahay?",
            options: [
              "Practice jawaabo gaaban oo cad ah",
              "Kaliya cram-ka xogta habeenkii ka hor",
              "In la iska daayo diyaarin",
              "Kaliya akhrinta theory"
            ],
            answer: 0,
            explain: "Practice-ku wuxuu kordhiyaa kalsoonida iyo cadaynta jawaabaha."
          }
        ],

        exercise: {
          title: "Technical Interview Practice",
          steps: [
            "Qor jawaabo 5 su'aalood oo technical ah oo ka mid ah kuwa kor lagu sharaxay.",
            "Isticmaal STAR method su'aal scenario ah.",
            "La wadaag jawaabahaaga qof kale (peer) oo feedback ka hel.",
            "Hagaaji jawaabahaaga iyadoo lagu saleynayo feedback-ka."
          ],
          deliverable: "Technical interview Q&A practice sheet."
        }
      },


      {
        slug: "interview-prep-behavioral",
        title: "Interview Prep: Behavioral & Scenario Questions",
        english: "Interview Preparation: Behavioral and Scenario Questions",
        minutes: 13,

        summary:
          "Diyaari su'aalaha behavioral iyo scenario-based ee interview-yada SOC-gu badanaa weydiiyaan.",

        sections: [
          {
            h: "Su'aalaha Behavioral Caanka ah",
            p:
            "'Sheeg waqti aad khalad samaysay oo aad ka baratay', 'Sida aad u maamusho pressure marka alerts badan isku mar yimaadaan', 'Sheeg waqti aad khilaaf la yeelatay coworker'."
          },
          {
            h: "Sababta Behavioral Questions Muhiim u Yihiin",
            p:
            "SOC waa environment pressure-badan — employers waxay rabaan inay arkaan sida aad u maamusho stress, sida aad wax uga barato khaladaad, iyo sida aad ula shaqeyso team."
          },
          {
            h: "Ethics & Integrity Scenarios",
            p:
            "'Waxaad aragtaa colleague oo tallaabooyin aan sax ahayn qaadaya, maxaad samaynaysaa?' Jawaabtu waa in ay muujiso integrity iyo ilaalinta xeerarka, iyada oo aan cadaawad la aasaasin."
          },
          {
            h: "Culture Fit Questions",
            p:
            "'Sababta aad u doorbidayso SOC Analyst?' 'Sidee aad u baratay cybersecurity?' Jawaabahaan waa fursad aad ku muujiso xamaasadaada iyo waddadaada barashada."
          }
        ],

        terms: [
          { term: "Culture Fit", def: "Habka employer-ku u qiimeeyo isku duwidda dabeecadaada iyo shirkadda." }
        ],

        quiz: [
          {
            q: "Sababta employers-yadu weydiiyaan behavioral questions waa?",
            options: [
              "Si ay u ogaadaan sida aad u maamusho pressure iyo team",
              "Si ay u ogaadaan aqoontaada technical oo keliya",
              "Si ay u tijaabiyaan typing speed",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "SOC-gu waa environment pressure-badan oo team-based ah."
          },
          {
            q: "Marka lagu weydiiyo colleague oo khaldan tallaabo qaadaya, jawaabtu waa in ay?",
            options: [
              "Muujiso integrity iyada oo aan cadaawad la aasaasin",
              "Iska indho tirto oo aan wax sheegin",
              "Si xun u eedeeyo colleague-ga",
              "Ka baqo inuu sheego"
            ],
            answer: 0,
            explain: "Integrity iyo professionalism waa muhiim marka la sheegayo qaladaad."
          },
          {
            q: "Su'aal culture fit tusaale ah waa?",
            options: [
              "'Sababta aad u doorbidayso SOC Analyst?'",
              "'Sharax three-way handshake'",
              "'Waa maxay Event ID 4625?'",
              "'Qor query brute force ah'"
            ],
            answer: 0,
            explain: "Culture fit questions waxay eegaan motivation-ka iyo xamaasadda."
          }
        ],

        exercise: {
          title: "Behavioral Interview Practice",
          steps: [
            "Qor jawaabo STAR-based ah oo saddex su'aalood behavioral ah.",
            "Diyaari jawaab su'aal ethics scenario ah.",
            "Diyaari jawaab 'sababta SOC Analyst' oo shakhsi ah.",
            "La wadaag oo feedback ka hel qof kale."
          ],
          deliverable: "Behavioral interview practice sheet."
        }
      },


      {
        slug: "final-capstone-project",
        title: "Final Capstone Project",
        english: "Final Capstone Project",
        minutes: 15,

        summary:
          "Dhammaystir portfolio-gaaga oo dhamaystiran, oo diyaari codsi shaqo oo buuxa isticmaalaya dhammaan waxa aad barataye.",

        sections: [
          {
            h: "Portfolio Finalization",
            p:
            "Isku dar dhammaan labs-ka, reports-ka, iyo detection rules-ka aad sameysay barnaamijka oo dhan. Kala saar kuwa ugu fiican, hagaaji formatting-ka, oo hubi in dhammaan links-ku shaqeeyaan."
          },
          {
            h: "Final Report: Career Readiness Self-Assessment",
            p:
            "Qor self-assessment ah oo daboola: xirfadaha aad heshay module kasta, kuwa aad u baahan tahay sii xoojin, iyo qorshe barasho ah oo 3-bilood ah oo lagu sii horumariyo xirfadahaas."
          },
          {
            h: "Mock Job Application",
            p:
            "Raadi job posting dhab ah oo SOC Analyst Tier 1 ah. Ku habeyn resume-gaaga si uu ugu habboon yahay job description-kaas. Diyaari cover letter gaaban oo isticmaala keywords-ka job-ka."
          },
          {
            h: "Next Steps",
            p:
            "Naqshadee qorshe 90-maalmood ah: certifications aad rabto inaad barato, labs dheeraad ah aad sameyn lahayd, networking events/communities aad ku biirto (LinkedIn groups, Discord servers, local meetups)."
          }
        ],

        terms: [
          { term: "Career Readiness", def: "Heerka diyaarinta guud ee shaqo raadinta iyo interview-yada." }
        ],

        quiz: [
          {
            q: "Portfolio finalization waxay ka kooban tahay?",
            options: [
              "Kala saarista labs-ka ugu fiican, hagaajinta formatting",
              "Ku darista dhammaan labs iyada oo aan kala saarin",
              "Tirtirida dhammaan labs-ka",
              "Kaliya certificates la ku daro"
            ],
            answer: 0,
            explain: "Quality curation ayaa ka dhigaysa portfolio-ga mid xoog leh."
          },
          {
            q: "Sababta mock job application loo sameeyo waa?",
            options: [
              "Si loo tijaabiyo sida resume-ga loogu habeeyo job dhab ah",
              "Si loo helo shaqo isla markiiba",
              "Ma jiro faa'iido",
              "Si loo kordhiyo CPU"
            ],
            answer: 0,
            explain: "Tijaabinta dhab ah waxay kaa diyaarisaa codsiga rasmiga ah."
          },
          {
            q: "Qorshaha 90-maalmood ee 'next steps' waa in uu ku jiro?",
            options: [
              "Certifications, labs dheeraad ah iyo networking",
              "Kaliya fasax",
              "Kaliya certifications",
              "Ma jiro qorshe loo baahan yahay"
            ],
            answer: 0,
            explain: "Qorshe dhamaystiran wuxuu daboolaa dhammaan qaybaha horumarka career-ga."
          }
        ],

        exercise: {
          title: "Final Portfolio & Career Plan",
          steps: [
            "Dhammaystir portfolio-gaaga (labs, reports, detection rules).",
            "Qor self-assessment ah oo daboola dhammaan 10-ka module.",
            "Xulo job posting dhab ah oo SOC Analyst Tier 1 ah, ku habeyn resume-gaaga.",
            "Naqshadee qorshe 90-maalmood ah oo horumarinta career-ga ah."
          ],
          deliverable: "Complete portfolio + career readiness plan (final deliverable of the program)."
        }
      },

    ],
  }),
];

export const totalLessons = modules.reduce((n, x) => n + x.lessons, 0);
export const totalHours = modules.reduce((n, x) => n + x.hours, 0);

export function findModule(slug: string) {
  return (
    modules.find((x) => x.slug === slug) ??
    ethicalHackingModules.find((x) => x.slug === slug) ??
    digitalForensicsModules.find((x) => x.slug === slug) ??
    cloudSecurityModules.find((x) => x.slug === slug) ??
    toolDeepDiveModules.find((x) => x.slug === slug)
  );
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
