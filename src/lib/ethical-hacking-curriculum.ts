import type { Module } from "./curriculum";

const m = (
  mod: Omit<Module, "lessons" | "topics"> & { topics?: string[] },
): Module => ({
  ...mod,
  topics: mod.topics ?? mod.lessonList.map((l) => l.english),
  lessons: mod.lessonList.length,
});

export const ethicalHackingModules: Module[] = [
  m({
    id: "eh1",
    slug: "offensive-security-fundamentals",
    stage: "Dhexe",
    title: "Aasaaska Offensive Security",
    english: "Offensive Security Fundamentals",
    hours: 1,

    outcome:
      "Waxaad fahmi doontaa qaab-dhismeedka penetration testing, xeerarka sharciga ah, cyber kill chain-ka, iyo sida loo dhiso lab ammaan ah oo tijaabo lagu sameeyo.",

    topics: [
      "CIA Triad from an Attacker's Perspective",
      "Types of Penetration Testing",
      "Legal & Ethical Considerations",
      "Cyber Kill Chain & Attack Lifecycle",
      "Building Your Pentest Lab",
      "Offensive Security Capstone",
    ],

    lessonList: [

      {
        slug: "cia-triad-attacker-perspective",
        title: "CIA Triad — Aragtida Attacker-ka",
        english: "CIA Triad from an Attacker's Perspective",
        minutes: 10,

        summary:
          "Faham CIA Triad-ka iyada oo laga eegayo aragtida attacker-ka, ma aha defender-ka oo keliya.",

        sections: [
          {
            h: "Sababta Pentesting Muhiim u Yahay",
            p:
            "Marka defender-yadu ku diiradda saarayaan ilaalinta CIA (Confidentiality, Integrity, Availability), penetration tester-yadu waxay diiradda saaraan sida attacker dhab ah loo jebin lahaa layers-kaas ilaalada ah. Pentest ma aha kaliya tools — waa mindset."
          },
          {
            h: "Attack Surface iyo Attack Vectors",
            p:
            "Attack surface waa dhammaan meelaha weerar laga furan karo (network services, web apps, users, physical access). Attack vector waa habka gaarka ah ee weerarka lagu fuliyo (phishing, exploit, misconfiguration). Pentester-ku wuxuu marka hore soo koobaa attack surface-ka target-ka."
          },
          {
            h: "Red Team vs Blue Team vs Purple Team",
            p:
            "Red Team (offensive) waxay tijaabiyaan defenses-ka iyagoo iska dhigaya attacker dhab ah. Blue Team (defensive) waa SOC/IR teams-ka. Purple Team waa isku darka labada — red team-ku wuxuu la wadaagaa blue team-ka natiijooyinka si labaduba u hormariyaan."
          },
          {
            h: "Threat Modeling Aasaas",
            p:
            "Ka hor inaad bilowdo pentest, waxaad su'aasho: yaa target-kan bartilmaameedsan lahaa (threat actors)? Maxay rabaan? Sidee ay ku geli lahaayeen? Threat modeling wuxuu kaa caawiyaa inaad diiradda saarto meelaha ugu khatarta badan."
          }
        ],

        terms: [
          { term: "Attack Surface", def: "Dhammaan meelaha weerar laga furan karo target-ka." },
          { term: "Attack Vector", def: "Habka gaarka ah ee weerarka lagu fuliyo." },
          { term: "Red Team", def: "Team-ka offensive-ka ee iska dhigaya attacker dhab ah." },
          { term: "Purple Team", def: "Isku darka red iyo blue team si labaduba loo hormariyo." }
        ],

        quiz: [
          {
            q: "Attack surface waa maxay?",
            options: [
              "Dhammaan meelaha weerar laga furan karo target-ka",
              "Kaliya IP address-ka target-ka",
              "Kaliya password-ka admin-ka",
              "Kaliya firewall rules-ka"
            ],
            answer: 0,
            explain: "Attack surface waxay ka kooban tahay network services, web apps, users, iyo physical access oo dhan."
          },
          {
            q: "Purple team-ku wuxuu sameeyaa?",
            options: [
              "Isku daraya red iyo blue team si labaduba loo hormariyo",
              "Kaliya offensive testing",
              "Kaliya defensive monitoring",
              "Ma jiro sababaha loo isticmaalo"
            ],
            answer: 0,
            explain: "Purple team-ku wuxuu xoojiyaa isgaarsiinta u dhaxaysa red iyo blue teams."
          },
          {
            q: "Pentester-ku maxaa marka hore sameeyaa ka hor tijaabinta?",
            options: [
              "Wuxuu soo koobaa attack surface-ka target-ka",
              "Wuxuu isla markiiba weeraraa server-ka",
              "Wuxuu iska dhaafaa scope-ka",
              "Wuxuu tirtiraa logs-ka"
            ],
            answer: 0,
            explain: "Fahamka attack surface-ka waa tallaabada ugu horreysa ee planning-ka."
          },
          {
            q: "Threat modeling wuxuu ka caawiyaa analyst-ka inuu?",
            options: [
              "Diiradda saaro meelaha ugu khatarta badan",
              "Iska indho tiro khataraha",
              "Kordhiyo CPU-ga",
              "Beddelo hardware-ka"
            ],
            answer: 0,
            explain: "Threat modeling waxay hagaysaa mudnaanta baaritaanka."
          }
        ],

        exercise: {
          title: "Attack Surface Mapping",
          steps: [
            "Xulo shirkad tusaale ah (fictional).",
            "Liis garee 8 attack surface elements (websites, email, wifi, employees, iwm).",
            "Kala saar attack vectors 3 ka mid ah elements-kaas.",
            "Sharax sida threat modeling loogu dabaqi lahaa xaaladdan."
          ],
          deliverable: "Attack surface mapping document."
        }
      },


      {
        slug: "types-of-penetration-testing",
        title: "Noocyada Penetration Testing",
        english: "Types of Penetration Testing",
        minutes: 12,

        summary:
          "Faham black box, white box iyo grey box testing, marka lagu daro noocyada kale ee pentest.",

        sections: [
          {
            h: "Black Box, White Box & Grey Box",
            p:
            "Black box: tester-ku wax kasta ma yaqaan target-ka (u eg attacker dibadda ah). White box: tester-ku wuxuu haystaa access buuxa (source code, network diagrams — u eg insider). Grey box: heer dhexdhexaad ah (tusaale: credentials caadi ah oo la siiyay)."
          },
          {
            h: "External vs Internal Testing",
            p:
            "External pentest wuxuu diiradda saaraa systems internet-ka ka muuqda (public-facing). Internal pentest wuxuu simulate gareeyaa attacker oo horay u galay network-ka (tusaale: insider ama phishing la guuleystay), isagoo eegaya lateral movement."
          },
          {
            h: "Web App, Network, iyo Wireless Pentesting",
            p:
            "Web application pentest wuxuu diiradda saaraa vulnerabilities-ka apps-ka (OWASP Top 10). Network pentest wuxuu eegaa infrastructure-ka (servers, firewalls, routers). Wireless pentest wuxuu eegaa WiFi security (WPA2/3 misconfigurations)."
          },
          {
            h: "Social Engineering Testing",
            p:
            "Social engineering pentest wuxuu tijaabiyaa dabeecadda bini'aadmiga ah — phishing simulations, physical security tests (tailgating), iyo vishing calls, iyada oo la oggol yahay (authorized) shirkadda."
          }
        ],

        terms: [
          { term: "Black Box", def: "Pentest aan lahayn macluumaad hore oo target-ka ku saabsan." },
          { term: "White Box", def: "Pentest leh access buuxa (source code, diagrams)." },
          { term: "Grey Box", def: "Pentest heer dhexdhexaad ah oo macluumaad qayb ah la siiyay." }
        ],

        quiz: [
          {
            q: "Black box testing waa?",
            options: [
              "Tester aan lahayn macluumaad hore oo target-ka ku saabsan",
              "Tester leh source code buuxa",
              "Tester leh admin access",
              "Tester leh diagrams oo dhan"
            ],
            answer: 0,
            explain: "Black box wuxuu simulate gareeyaa attacker dibadda ah oo aan wax yaqaan."
          },
          {
            q: "Internal pentest wuxuu diiradda saaraa?",
            options: [
              "Lateral movement iyagoo simulate gareynaya attacker horay u galay",
              "Kaliya websites public-facing ah",
              "Kaliya wireless networks",
              "Kaliya social engineering"
            ],
            answer: 0,
            explain: "Internal pentest wuxuu eegaa waxa dhici kara marka attacker horay u jiro network-ka."
          },
          {
            q: "Grey box testing waxay ku salaysan tahay?",
            options: [
              "Heer dhexdhexaad ah oo macluumaad qayb ah (tusaale credentials) la siiyay",
              "Aqoon buuxda",
              "Aqoon eber ah",
              "Ma jiro qayb macluumaad ah"
            ],
            answer: 0,
            explain: "Grey box waa isku darka black iyo white box."
          },
          {
            q: "Social engineering testing waa in ay ahaato?",
            options: [
              "Authorized shirkadda ka hor la sameeyo",
              "Aan la ogaysiinin ciduna",
              "Waligeed aan la sameyn",
              "Kaliya technical testing"
            ],
            answer: 0,
            explain: "Waa muhiim in scope iyo authorization la helo ka hor social engineering tests."
          }
        ],

        exercise: {
          title: "Pentest Type Selection",
          steps: [
            "Akhri 3 scenarios kala duwan (tusaale: shirkad rabaan ay ogaadaan haddii employee-yadu ay ku dhacaan phishing).",
            "Scenario kasta u xulo nooca pentest-ka ugu habboon (black/white/grey box, internal/external, social engineering).",
            "Sharax sababta doorashadaada scenario kasta."
          ],
          deliverable: "Pentest type recommendation report."
        }
      },


      {
        slug: "legal-ethical-considerations",
        title: "Xeerarka Sharciga ah & Ethics-ka",
        english: "Legal & Ethical Considerations",
        minutes: 13,

        summary:
          "Faham sababta authorization uu yahay muhiim, Rules of Engagement, iyo cawaaqibka sharciga ah ee pentesting-ka aan sharciga ahayn.",

        sections: [
          {
            h: "Authorization Waa Waajib",
            p:
            "Weligaa ha tijaabin system aadan haysan written authorization. Pentesting oo aan authorization lahayn waa dembi (unauthorized computer access) meelo badan oo adduunka ah, xitaa haddii ujeeddadu wanaagsan tahay."
          },
          {
            h: "Rules of Engagement (RoE)",
            p:
            "RoE waa dukumeenti qeexaya: scope (systems la oggol yahay), timing (goorma), techniques la oggol yahay/aan la oggolayn (tusaale DoS ma la oggol yahay?), iyo contact info emergency ah haddii wax qaldamaan."
          },
          {
            h: "Scope Creep",
            p:
            "Scope creep waa marka tester-ku uu dhaafo systems la oggol yahay. Xitaa haddii aad si fudud u dhex marto system aan scope-ka ku jirin, waa in aad joojiso oo la xiriirto client-ka — ha sii wadin."
          },
          {
            h: "Responsible Disclosure",
            p:
            "Haddii aad heshid vulnerability shirkad aadan la shaqeyn (tusaale: bug bounty ama accidental discovery), responsible disclosure waxay dhigan tahay inaad si khusuusi ah ula soo xiriirto shirkadda ka hor inaad wax dadweynaha ka sheegto."
          }
        ],

        terms: [
          { term: "Rules of Engagement (RoE)", def: "Dukumeenti qeexaya scope, timing iyo techniques la oggol yahay." },
          { term: "Scope Creep", def: "Marka tester-ku uu dhaafo systems la oggol yahay." },
          { term: "Responsible Disclosure", def: "Habka khusuusiga ah ee vulnerability loogu sheego shirkadda." }
        ],

        quiz: [
          {
            q: "Pentesting oo aan authorization lahayn waa?",
            options: [
              "Dembi meelo badan oo adduunka ah",
              "Caadi haddii ujeeddadu wanaagsan tahay",
              "Sharci ah marwalba",
              "Ma jiro cawaaqib"
            ],
            answer: 0,
            explain: "Written authorization waa waajib, kahor wax kasta oo tijaabo ah."
          },
          {
            q: "Scope creep waa maxay?",
            options: [
              "Marka tester-ku uu dhaafo systems la oggol yahay",
              "Kordhinta miisaaniyadda",
              "Kordhinta waqtiga pentest-ka",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "Scope creep waa khatar sharci ah oo la iska ilaaliyo."
          },
          {
            q: "RoE ku jira?",
            options: [
              "Scope, timing, techniques la oggol yahay",
              "Kaliya magaca client-ka",
              "Kaliya lacagta la bixinayo",
              "Kaliya waqtiga guriga"
            ],
            answer: 0,
            explain: "RoE waa dukumeenti qeexaya xadka pentest-ka."
          },
          {
            q: "Responsible disclosure waxay u baahan tahay?",
            options: [
              "In shirkadda khusuusi loola soo xiriiro ka hor daabacaad guud",
              "In dadweynaha isla markiiba loo sheego",
              "In wax la iska indho tiro",
              "In vulnerability la iibiyo dark web"
            ],
            answer: 0,
            explain: "Responsible disclosure waxay siisaa shirkadda fursad ay ku hagaajiyaan ka hor daabacaad."
          }
        ],

        exercise: {
          title: "Draft a Rules of Engagement",
          steps: [
            "Xulo shirkad tusaale ah oo rabta pentest.",
            "Qor RoE buuxa: scope, timing, oggolaanshaha DoS testing, emergency contacts.",
            "Ku dar clause ku saabsan sida loola macaamilo scope creep haddii ay dhacdo.",
            "Sharax sida aad u xaqiijin lahayd inaad haysato authorization qoraal ah."
          ],
          deliverable: "Sample Rules of Engagement document."
        }
      },


      {
        slug: "cyber-kill-chain-attack-lifecycle",
        title: "Cyber Kill Chain & Attack Lifecycle",
        english: "Cyber Kill Chain and Attack Lifecycle",
        minutes: 15,

        summary:
          "Faham 7-da tallaabo ee Cyber Kill Chain iyo sida ATT&CK loo isticmaalo offensive planning.",

        sections: [
          {
            h: "7-da Tallaabo ee Kill Chain",
            p:
            "1) Reconnaissance. 2) Weaponization. 3) Delivery. 4) Exploitation. 5) Installation. 6) Command & Control (C2). 7) Actions on Objectives. Pentester-yadu waxay simulate gareeyaan tallaabooyinkan si ay u tijaabiyaan detection capability-ga defender-ka."
          },
          {
            h: "MITRE ATT&CK for Offense",
            p:
            "Halka blue team-ku uu isticmaalo ATT&CK detection ahaan, red team-ku wuxuu isticmaalaa si uu u naqshadeeyo weerarka: kee techniques ayaa la tijaabin doonaa, iyo maxaa la filayaa haddii detection la maro."
          },
          {
            h: "Assumed Breach Methodology",
            p:
            "Nooc penetration testing ah oo casri ah wuxuu bilaabmaa 'assumed breach' — tester-ku wuxuu bilaabmaa halka attacker uu horay u jiro internal network-ka (skip-gareyn Initial Access), diiradda saarayo lateral movement iyo privilege escalation."
          },
          {
            h: "Living off the Land (LotL)",
            p:
            "Pentester-yada casriga ah waxay isticmaalaan tools legit ah oo horay ugu jira systems-ka (PowerShell, PsExec, WMI) halkii ay isticmaali lahaayeen malware custom ah — habkani wuxuu ka dhigaa detection-ka mid adag."
          }
        ],

        terms: [
          { term: "Kill Chain", def: "7-da tallaabo ee weerarka laga bilaabo recon ilaa actions on objectives." },
          { term: "Assumed Breach", def: "Testing methodology bilaabma halka attacker uu horay u jiro network-ka." },
          { term: "Living off the Land (LotL)", def: "Isticmaalka tools legit ah si loo yareeyo detection." }
        ],

        quiz: [
          {
            q: "Tallaabada ugu horreysa ee Cyber Kill Chain waa?",
            options: ["Reconnaissance", "Exploitation", "Installation", "Weaponization"],
            answer: 0,
            explain: "Recon waa tallaabada ugu horreysa — ururinta macluumaad."
          },
          {
            q: "Assumed breach methodology wuxuu bilaabmaa?",
            options: [
              "Halka attacker uu horay u jiro internal network-ka",
              "Recon-ka dibadda ah oo keliya",
              "Kaliya social engineering",
              "Kaliya wireless testing"
            ],
            answer: 0,
            explain: "Assumed breach wuxuu ka bilaabmaa xaaladda internal, diiradda saarayo post-exploitation."
          },
          {
            q: "Living off the Land (LotL) wuxuu ka dhigaa detection?",
            options: [
              "Mid adag, sababtoo ah tools-ku waa kuwa legit ah",
              "Mid aad u fudud",
              "Mid aan suurtagal ahayn",
              "Ma jiro saameyn"
            ],
            answer: 0,
            explain: "Tools legit ah waxay ka dhigaan attacker behavior mid u eg admin caadi ah."
          },
          {
            q: "C2 (Command & Control) ku jirtaa Kill Chain-ka?",
            options: ["Tallaabada 6-aad", "Tallaabada 1-aad", "Tallaabada 2-aad", "Tallaabada 7-aad"],
            answer: 0,
            explain: "C2 wuxuu ku xigaa Installation-ka, ka hor Actions on Objectives."
          }
        ],

        exercise: {
          title: "Map an Attack to the Kill Chain",
          steps: [
            "Xulo weerar tusaale ah (phishing → ransomware).",
            "Map dhacdada 7-da tallaabo ee Kill Chain.",
            "Sharax sida red team-ku u simulate gareyn lahaa tallaabo kasta.",
            "Aqoonso hal LotL technique aad isticmaali lahayd tallaabada C2."
          ],
          deliverable: "Kill chain mapping exercise."
        }
      },


      {
        slug: "attacker-mindset-tradecraft",
        title: "Attacker Mindset & Tradecraft",
        english: "Attacker Mindset and Tradecraft",
        minutes: 13,

        summary:
          "Faham sida attacker-yada xirfadleyda ah ay u fikiraan iyo OPSEC-ga ay isticmaalaan intii engagement socdo.",

        sections: [
          {
            h: "Adversary Emulation vs Random Testing",
            p:
            "Pentester xirfad leh ma isticmaalo tools random ah — wuxuu emulate gareeyaa threat actor gaar ah (tusaale APT profile), isagoo raacaya TTPs (Tactics, Techniques, Procedures) la yaqaan si natiijadu u noqoto mid dhab ah oo defense-ku uu ka faa'iidaysto."
          },
          {
            h: "OPSEC for Pentesters",
            p:
            "Operational Security (OPSEC) waxay u baahan tahay in la yareeyo noise-ka (logs, alerts) intii engagement-ku socdo — kani wuxuu ka caawiyaa in la tijaabiyo detection capability-ga dhabta ah blue team-ka, ma aha in loo tijaabiyo si aan la aqoon."
          },
          {
            h: "Assumption of Breach Thinking",
            p:
            "Pentester-ku wuxuu had iyo jeer fikiraa: 'Haddii aan hore u jiray, maxaan sameyn lahaa?' — fikirkani wuxuu kaa caawiyaa inaad aragto system-ka aragtida attacker-ka, ma aha aragtida defender-ka."
          },
          {
            h: "Documentation During Engagement",
            p:
            "Xitaa marka aad degdeg u samaynayso, waa muhiim in la haysto notes joogto ah (commands la isticmaalay, waqtiyada, natiijooyinka) — kani wuxuu fududeeyaa reporting-ka dambe iyo attack narrative-ga."
          }
        ],

        terms: [
          { term: "Adversary Emulation", def: "Tijaabinta threat actor gaar ah TTPs isaga oo la raacayo." },
          { term: "OPSEC", def: "Operational Security — yareynta noise-ka la ogaan karo." }
        ],

        quiz: [
          {
            q: "Adversary emulation ka duwan tahay random testing sababtoo ah?",
            options: [
              "Wuxuu raacaa TTPs threat actor gaar ah, natiijadu waa mid dhab ah",
              "Isku mid",
              "Random testing ayaa ka fiican",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Emulation-ku wuxuu bixiyaa natiijo la xiriirta khataraha dhabta ah shirkadda ka hor imaan karta."
          },
          {
            q: "OPSEC intii engagement socdo waxay ka caawisaa?",
            options: [
              "Tijaabinta detection capability-ga dhabta ah blue team-ka",
              "Kordhinta noise-ka si loo ogaado",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo reporting"
            ],
            answer: 0,
            explain: "Haddii aad si fudud loo ogaado, ma tijaabinaysid detection-ka dhabta ah."
          },
          {
            q: "'Assumption of breach' thinking-ku wuxuu bixiyaa?",
            options: [
              "Aragtida attacker-ka, ma aha kaliya defender-ka",
              "Kaliya defender-ka aragtidiisa",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo forensics"
            ],
            answer: 0,
            explain: "Fikirkani wuxuu kordhinayaa waxa aad ka heli karto system-ka."
          }
        ],

        exercise: {
          title: "Adversary Emulation Planning",
          steps: [
            "Xulo threat actor profile fictional ah (TTPs asaasi ah).",
            "Sharax sida OPSEC loo dabaqi lahaa engagement-kaas.",
            "Qor tusaale notes ah oo aad qori lahayd intii scanning socdo.",
            "Sharax sababta assumption-of-breach thinking uu muhiim u yahay."
          ],
          deliverable: "Adversary emulation planning notes."
        }
      },

      {
        slug: "building-pentest-lab",
        title: "Dhis Lab-kaaga Pentest",
        english: "Building Your Penetration Testing Lab",
        minutes: 11,

        summary:
          "Baro sida loo dhiso lab ammaan ah oo Kali Linux, vulnerable VMs, iyo network segmentation ku jiraan.",

        sections: [
          {
            h: "Kali Linux",
            p:
            "Kali Linux waa distribution Linux ah oo horay ugu rakiban tools-ka pentesting (Nmap, Metasploit, Burp Suite, Wireshark). Waa OS-ka standard-ka ah ee industry-ga pentesting."
          },
          {
            h: "Vulnerable VMs for Practice",
            p:
            "Metasploitable, DVWA (Damn Vulnerable Web Application), iyo VulnHub/HackTheBox machines waa VMs si ula talaal loo naqshadeeyay inay leeyihiin vulnerabilities si loo tijaabiyo si ammaan ah."
          },
          {
            h: "Network Isolation",
            p:
            "Lab-kaaga waa in uu ku shaqeeyo Host-Only ama Internal network hypervisor-kaaga si aan vulnerable VMs-ku u helin internet-ka ama network-ga guriga/shirkadda. Marnaba lab-kaaga kuma xirin production network."
          },
          {
            h: "Snapshot Management",
            p:
            "Qaado snapshot 'clean' ah ka hor tijaabo kasta. Haddii wax khaldamaan (VM la jebiyo si joogto ah), waxaad si degdeg ah ugu noqon kartaa xaalad hore."
          }
        ],

        terms: [
          { term: "Kali Linux", def: "Distribution Linux ah oo horay ugu rakiban tools pentesting." },
          { term: "DVWA", def: "Damn Vulnerable Web Application — app la naqshadeeyay si loo tijaabiyo." },
          { term: "Host-Only Network", def: "Network go'doonsan oo aan internet-ka gaarin." }
        ],

        quiz: [
          {
            q: "Kali Linux waa?",
            options: [
              "Distribution Linux ah oo horay ugu rakiban pentesting tools",
              "Antivirus software",
              "Firewall hardware",
              "Web browser"
            ],
            answer: 0,
            explain: "Kali waa OS standard-ka pentesting industry-ga."
          },
          {
            q: "DVWA waxaa loo isticmaalaa?",
            options: [
              "Tijaabinta web vulnerabilities si ammaan ah",
              "Backup files",
              "Encrypt gareynta disk",
              "Network monitoring"
            ],
            answer: 0,
            explain: "DVWA waa app ula talaal u leh vulnerabilities barasho ahaan."
          },
          {
            q: "Sababta lab-ku uu isticmaalo Host-Only network waa?",
            options: [
              "Si loo hubiyo vulnerable VMs-ku aanay internet-ka helin",
              "Si loo kordhiyo speed",
              "Si loo yareeyo storage",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Isolation-ku wuxuu ka hortagaa in VM-ku wax u dhaawaco network-ka dibadda ah."
          },
          {
            q: "Snapshot 'clean' ah waxaa loo qaataa?",
            options: [
              "Ka hor tijaabo kasta si aad ugu noqon karto xaalad hore",
              "Kaliya hal mar sanadkii",
              "Marnaba looma baahna",
              "Ka dib tijaabo kasta oo keliya"
            ],
            answer: 0,
            explain: "Snapshot-ku wuxuu u ogolaadaa dib-u-celin degdeg ah haddii VM-ku jabo."
          }
        ],

        exercise: {
          title: "Set Up Your Pentest Lab",
          steps: [
            "Rakib VirtualBox ama VMware.",
            "Soo deji Kali Linux ISO/VM.",
            "Soo deji Metasploitable ama DVWA.",
            "Naqshadee Host-Only network isku xira labada VM.",
            "Qaado snapshot magaciisu yahay 'clean-start' labadaba VM."
          ],
          deliverable: "Screenshot lab-ka socda + snapshot-ka la abuuray."
        }
      },


      {
        slug: "offensive-security-capstone",
        title: "Offensive Security — Capstone",
        english: "Offensive Security Fundamentals Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — naqshadee full pentest engagement iyada oo la bilaabo scoping.",

        sections: [
          {
            h: "Scenario",
            p:
            "Shirkad yar ayaa kula soo xiriirtay si aad u samayso external + web application pentest. Waxay leeyihiin hal web app iyo 5 servers internet-ka ka muuqda."
          },
          {
            h: "Scoping & RoE",
            p:
            "Naqshadee RoE buuxa oo qeexaya scope (systems-ka), timing, techniques la oggol yahay, iyo emergency contact."
          },
          {
            h: "Methodology Selection",
            p:
            "Go'aami nooca pentest-ka (black/grey box) iyo sababta. Sharax sida aad u isticmaali lahayd Kill Chain-ka si aad u naqshadeyso approach-kaaga."
          },
          {
            h: "Lab Preparation",
            p:
            "Sharax sida lab-kaaga (Kali + vulnerable VMs) loogu isticmaali lahaa si aad u tijaabiso techniques ka hor inaad ku fulido environment-ka dhabta ah."
          }
        ],

        terms: [
          { term: "Engagement Scoping", def: "Habka la go'aamiyo xadka iyo qaabka pentest-ka." }
        ],

        quiz: [
          {
            q: "Tallaabada ugu horreysa ee engagement kasta waa?",
            options: [
              "Scoping & RoE",
              "Isla markiiba exploitation",
              "Warbixinta",
              "C2 setup"
            ],
            answer: 0,
            explain: "Scope-ku wuxuu dejiyaa xadka sharciga ah ee shaqada."
          },
          {
            q: "Sababta lab preparation muhiim u tahay ka hor engagement dhabta ah waa?",
            options: [
              "Si loo tijaabiyo techniques ammaan ahaan",
              "Si loo yareeyo miisaaniyadda",
              "Si loo kordhiyo waqtiga",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Tijaabinta lab-ka waxay yareysaa khaladaad marka la gaadho system dhabta ah."
          },
          {
            q: "Grey box testing tan scenario-ga la mid ah wuxuu u baahan yahay?",
            options: [
              "Macluumaad qayb ah oo client-ku bixiyo",
              "Aqoon buuxda system-ka",
              "Aqoon eber ah",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Grey box wuxuu ku salaysan yahay macluumaad qayb ah."
          }
        ],

        exercise: {
          title: "Full Engagement Planning Document",
          steps: [
            "Qor RoE buuxa scenario-ga sare.",
            "Xulo methodology (black/grey box) oo sharax sababta.",
            "Naqshadee kill chain approach-ka pentest-kan.",
            "Liis garee tools-ka lab-kaaga aad isticmaali lahayd marxalad kasta."
          ],
          deliverable: "Full engagement planning document (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "eh2",
    slug: "reconnaissance-osint",
    stage: "Dhexe",
    title: "Reconnaissance & OSINT",
    english: "Reconnaissance & OSINT",
    hours: 1,

    outcome:
      "Waxaad si adag u fahmi doontaa passive iyo active recon, OSINT tools, DNS enumeration iyo people/social media recon.",

    topics: [
      "Passive vs Active Reconnaissance",
      "OSINT Techniques & Tools",
      "DNS Recon & Subdomain Enumeration",
      "Social Media & People Recon",
      "WHOIS & Certificate Transparency",
      "Reconnaissance Capstone Lab",
    ],

    lessonList: [

      {
        slug: "passive-vs-active-recon",
        title: "Passive vs Active Reconnaissance",
        english: "Passive vs Active Reconnaissance",
        minutes: 14,

        summary:
          "Faham farqiga passive iyo active recon, iyo sababta pentester-yadu marka hore u bilaabaan passive.",

        sections: [
          {
            h: "Passive Reconnaissance",
            p:
            "Passive recon waa ururinta macluumaad iyada oo aan si toos ah loogu xiriirin target-ka (public records, social media, search engines). Target-ku ma ogaan karo in la baarayo — waa mid ammaan ah oo aan la ogaan karin."
          },
          {
            h: "Active Reconnaissance",
            p:
            "Active recon waxay ku lug leedahay isku xiriirka toos ah target-ka (port scanning, DNS queries, banner grabbing). Tani way ogaan kartaa logs-ka target-ka — sidaas darteed waa in la sameeyo kaliya kadib authorization."
          },
          {
            h: "OSINT Framework",
            p:
            "Pentester-yadu waxay isticmaalaan OSINT framework structured ah: 1) Company info (employees, tech stack), 2) Domain info (subdomains, DNS), 3) Email addresses, 4) Leaked credentials, 5) Social media presence."
          },
          {
            h: "Google Dorking",
            p:
            "Google dorking waa isticmaalka search operators advanced ah si loo helo macluumaad qarsoon: site:example.com filetype:pdf, intitle:'index of', inurl:admin — waxay kaa caawin karaan inaad hesho files exposed ah ama login pages."
          }
        ],

        terms: [
          { term: "Passive Recon", def: "Ururinta macluumaad iyada oo aan si toos ah loogu xiriirin target-ka." },
          { term: "Active Recon", def: "Isku xiriirka toos ah target-ka si macluumaad loo helo." },
          { term: "Google Dorking", def: "Isticmaalka search operators advanced ah si macluumaad qarsoon loo helo." }
        ],

        quiz: [
          {
            q: "Passive recon sababta loo isticmaalo marka hore waa?",
            options: [
              "Target-ku ma ogaan karo in la baarayo",
              "Waa ka dhaqso badan yahay",
              "Waa mid kaliya la isticmaalo",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Passive recon wuxuu yareeyaa khatarta in la ogaado."
          },
          {
            q: "Active recon waxay khatar u tahay sababtoo ah?",
            options: [
              "Way ogaan kartaa logs-ka target-ka",
              "Way ka dhaqso badan tahay passive",
              "Ma bixiso macluumaad qiimo leh",
              "Ma jiro khatar"
            ],
            answer: 0,
            explain: "Isku xiriirka toos ah wuxuu tagayaa logs — u baahan authorization."
          },
          {
            q: "site:example.com filetype:pdf waa tusaale ah?",
            options: ["Google Dork", "Active scanning", "Social engineering", "Exploit code"],
            answer: 0,
            explain: "Waa Google dork si loo helo files PDF ah domain gaar ah."
          },
          {
            q: "OSINT framework-ka, tallaabada ugu horreysa waa?",
            options: [
              "Company info (employees, tech stack)",
              "Exploitation",
              "Password cracking",
              "C2 setup"
            ],
            answer: 0,
            explain: "Waa in la fahmo shirkadda ka hor la baaro domains iyo emails."
          }
        ],

        exercise: {
          title: "Passive Recon Practice",
          steps: [
            "Xulo shirkad tusaale ah (fictional ama public information oo keliya).",
            "Isticmaal Google dorking si aad u raadiso files exposed ah.",
            "Aqoonso tech stack-ka laga yaabo inay isticmaalaan (job postings).",
            "Qor sharraxaad sababta labadan hab ay yihiin passive."
          ],
          deliverable: "Passive recon findings report."
        }
      },


      {
        slug: "osint-techniques-tools",
        title: "OSINT Techniques & Tools",
        english: "OSINT Techniques and Tools",
        minutes: 12,

        summary:
          "Baro tools-ka OSINT ee caanka ah — Shodan, theHarvester, Maltego — iyo sida loo isticmaalo.",

        sections: [
          {
            h: "Shodan",
            p:
            "Shodan waa search engine loogu talagalay devices internet-ka ku xiran (IoT, servers, cameras). Waxaad ku raadin kartaa 'apache country:SO' si aad u hesho servers Apache ah oo Soomaaliya ku yaal."
          },
          {
            h: "theHarvester",
            p:
            "theHarvester waa tool command-line ah oo ururiya emails, subdomains, iyo names shirkad domain gaar ah. Tusaale: theHarvester -d example.com -b google,linkedin."
          },
          {
            h: "Maltego",
            p:
            "Maltego waa tool visual ah oo isku xira macluumaad OSINT (domains, IPs, emails, social media) sida graph — waxay caawisaa in la arko xiriirrada u dhexeeya data points kala duwan."
          },
          {
            h: "Have I Been Pwned & Breach Data",
            p:
            "Have I Been Pwned (HIBP) wuxuu muujiyaa haddii email la helay data breaches hore. Pentester-yadu waxay isticmaalaan macluumaadkan si ay u ogaadaan haddii credentials la yaqaan ay ku dhici karto ama u helaan context dheeraad ah."
          }
        ],

        terms: [
          { term: "Shodan", def: "Search engine loogu talagalay devices internet-ka ku xiran." },
          { term: "theHarvester", def: "Tool ururiya emails, subdomains iyo names." },
          { term: "Maltego", def: "Tool visual ah oo isku xira macluumaad OSINT." }
        ],

        quiz: [
          {
            q: "Shodan waxaa loo isticmaalaa?",
            options: [
              "Raadinta devices internet-ka ku xiran",
              "Sameynta websites",
              "Encrypt gareynta files",
              "Beddelidda password"
            ],
            answer: 0,
            explain: "Shodan waa search engine gaar u ah devices ku xiran internet-ka."
          },
          {
            q: "theHarvester -d example.com -b google,linkedin wuxuu sameeyaa?",
            options: [
              "Ururiya emails/subdomains domain-kan iyada oo la isticmaalayo google iyo linkedin sources",
              "Wuxuu tirtiraa domain-ka",
              "Wuxuu sameeyaa backup",
              "Wuxuu beddelaa DNS records"
            ],
            answer: 0,
            explain: "-d wuxuu qeexayaa domain-ka, -b wuxuu qeexayaa sources-ka."
          },
          {
            q: "Have I Been Pwned wuxuu muujiyaa?",
            options: [
              "Haddii email la helay data breaches hore",
              "Password-ka user-ka",
              "IP address-ka user-ka",
              "Location-ka user-ka"
            ],
            answer: 0,
            explain: "HIBP waa database breach data ah."
          },
          {
            q: "Maltego faa'iidadeeda ugu weyn waa?",
            options: [
              "Muujinta xiriirrada u dhexeeya data points OSINT ah",
              "Scanning ports",
              "Exploitation",
              "Password cracking"
            ],
            answer: 0,
            explain: "Maltego wuxuu bixiyaa visual mapping ee macluumaadka."
          }
        ],

        exercise: {
          title: "OSINT Tool Practice",
          steps: [
            "Baro syntax-ka theHarvester (aan la fulin haddii aan la haysan authorization).",
            "Sharax sida Shodan loo isticmaali lahaa si loo helo exposed devices.",
            "Sharax farqiga Maltego iyo theHarvester.",
            "Qor liis 5 OSINT tools oo kale iyo shaqadooda."
          ],
          deliverable: "OSINT tools reference sheet."
        }
      },


      {
        slug: "dns-recon-subdomain-enumeration",
        title: "DNS Recon & Subdomain Enumeration",
        english: "DNS Recon and Subdomain Enumeration",
        minutes: 10,

        summary:
          "Faham sida DNS records loo baaro iyo sida subdomains loo helo — habab la wadaago attack surface-ka.",

        sections: [
          {
            h: "DNS Record Types Muhiimka ah",
            p:
            "A/AAAA (IP addresses), MX (mail servers), NS (name servers), TXT (SPF, verification records), CNAME (aliases). Pentester-ku wuxuu isticmaalaa dig ama nslookup si uu u helo records-kan."
          },
          {
            h: "Subdomain Enumeration",
            p:
            "Subdomains badanaa waxay muujiyaan attack surface ballaaran (dev.example.com, staging.example.com, api.example.com). Tools sida Sublist3r, Amass, ama crt.sh waxaa loo isticmaalaa in la helo subdomains."
          },
          {
            h: "Zone Transfer Attempts",
            p:
            "DNS Zone Transfer (AXFR) waa misconfiguration ah oo haddii uu jiro, wuxuu siin karaa attacker liis buuxa oo dhammaan DNS records-ka domain-ka. dig axfr @nameserver domain.com — badanaa waxaa la joojiyay laakiin weli waa in la tijaabiyo."
          },
          {
            h: "Certificate Transparency Logs",
            p:
            "Marka SSL certificate la bixiyo domain, waxaa lagu diiwaan geliyaa Certificate Transparency logs (public). crt.sh waa website loogu isticmaalo in la raadiyo dhammaan certificates la bixiyay domain gaar ah — habkani wuxuu muujiyaa subdomains aan la ogaan."
          }
        ],

        terms: [
          { term: "Subdomain Enumeration", def: "Habka la helo subdomains-ka domain-ka target-ka." },
          { term: "Zone Transfer (AXFR)", def: "Misconfiguration siin kara attacker liis buuxa DNS records." },
          { term: "Certificate Transparency", def: "Public logs muujiya SSL certificates la bixiyay." }
        ],

        quiz: [
          {
            q: "Subdomain enumeration muhiimaddeedu waa?",
            options: [
              "Waxay muujisaa attack surface ballaaran (dev, staging, api subdomains)",
              "Waxay tirtirtaa DNS records",
              "Waxay xakameysaa firewall",
              "Waxay beddeshaa IP"
            ],
            answer: 0,
            explain: "Subdomains-ku badanaa waa meelo ka hoosaysa security-gooda ka hooseeya production."
          },
          {
            q: "DNS Zone Transfer (AXFR) haddii misconfigured yahay wuxuu siin karaa?",
            options: [
              "Attacker liis buuxa DNS records domain-ka",
              "Attacker admin access",
              "Attacker database passwords",
              "Attacker source code"
            ],
            answer: 0,
            explain: "AXFR waa nooc misconfiguration ah oo halis ah haddii uu furan yahay dadweynaha."
          },
          {
            q: "crt.sh waxaa loo isticmaalaa?",
            options: [
              "Raadinta certificates la bixiyay domain gaar ah si loo helo subdomains",
              "Scanning ports",
              "Password cracking",
              "Exploitation"
            ],
            answer: 0,
            explain: "Certificate Transparency logs waxay muujiyaan subdomains aan la ogaan."
          },
          {
            q: "MX record wuxuu tilmaamaa?",
            options: ["Mail servers", "Web servers", "DNS servers", "Firewall rules"],
            answer: 0,
            explain: "MX waa Mail Exchange record."
          }
        ],

        exercise: {
          title: "DNS Recon Lab",
          steps: [
            "Isticmaal dig ama nslookup si aad u hesho A, MX, iyo TXT records domain tusaale ah.",
            "Sharax sida aad u isticmaali lahayd crt.sh si aad u hesho subdomains.",
            "Qor sida Zone Transfer loo tijaabin lahaa (syntax kaliya, ha fulin authorization la'aan).",
            "Naqshadee jaantus subdomains laga yaabo in shirkad tusaale ah leedahay."
          ],
          deliverable: "DNS recon findings sheet."
        }
      },


      {
        slug: "social-media-people-recon",
        title: "Social Media & People Recon",
        english: "Social Media and People Reconnaissance",
        minutes: 13,

        summary:
          "Baro sida social media loo baaro si loo diyaariyo social engineering ama employee attack surface mapping.",

        sections: [
          {
            h: "LinkedIn Recon",
            p:
            "LinkedIn wuxuu bixiyaa: magacyada shaqaalaha, jagooyinka, email format (haddii la aqoonsan structure-ka), iyo technology stack (job postings). Pentester-yadu waxay isticmaalaan macluumaadkan si ay u dhistaan target lists ee phishing simulations."
          },
          {
            h: "Email Format Discovery",
            p:
            "Haddii aad ogaato hal email dhab ah (tusaale: john.doe@example.com), waxaad ka soo qaadan kartaa formula-ha (first.last@domain) si aad u sameyso guesses email addresses-ka shaqaalaha kale ee la aqoonsan magacooda."
          },
          {
            h: "Social Media OSINT",
            p:
            "Facebook, Twitter/X, Instagram waxay muujin karaan: waqtiga fasaxa, technologies la isticmaalo (badges photos), iyo relationships shaqsi ah oo lagu isticmaali karo pretexting."
          },
          {
            h: "Metadata Analysis",
            p:
            "Files (PDFs, images) badanaa waxay ku jiraan metadata (author name, software version, GPS location sawirada). Tools sida ExifTool waxaa lagu falanqeeyaa metadata-kan — mid ka mid ah OSINT sources-ka la iska ilaawo."
          }
        ],

        terms: [
          { term: "Email Format Discovery", def: "Ogaanshaha qaabka email-ka shirkad si loo sameeyo guesses kale." },
          { term: "Metadata", def: "Xog ku qarsoon files sida author name iyo GPS location." },
          { term: "ExifTool", def: "Tool lagu falanqeeyo metadata files ah." }
        ],

        quiz: [
          {
            q: "Email format discovery waxay u ogolaataa attacker?",
            options: [
              "Sameynta guesses email addresses shaqaalaha kale",
              "Xadhig ka jebinta password-ka",
              "Xiritaanka accounts",
              "Beddelidda MFA"
            ],
            answer: 0,
            explain: "Haddii hal formula la ogaado, waxaa laga soo qaadan karaa email addresses kale."
          },
          {
            q: "ExifTool waxaa loo isticmaalaa?",
            options: [
              "Falanqaynta metadata files-ka (author, GPS, iwm)",
              "Scanning ports",
              "Sameynta password",
              "Xiritaanka network"
            ],
            answer: 0,
            explain: "ExifTool wuxuu soo saaraa metadata qarsoon files gudahood."
          },
          {
            q: "LinkedIn recon wuxuu bixiyaa attacker-ka?",
            options: [
              "Magacyada shaqaalaha, jagooyinka iyo tech stack",
              "Kaliya lambarka telefoonka",
              "Kaliya passwords",
              "Kaliya bank account numbers"
            ],
            answer: 0,
            explain: "LinkedIn waa source aad muhiim u ah employee/org mapping."
          },
          {
            q: "Sawirro la wadaago social media, GPS metadata-koodu wuxuu muujin karaa?",
            options: [
              "Location-ka sawirka la qaaday",
              "Password-ka user-ka",
              "IP address-ka user-ka",
              "Bank details-ka user-ka"
            ],
            answer: 0,
            explain: "Metadata sawirku wuxuu ku qarsoomi karaa GPS coordinates."
          }
        ],

        exercise: {
          title: "People Recon Practice",
          steps: [
            "Xulo qof public ah (tusaale: CEO shirkad public ah).",
            "Aqoonso macluumaad public ah oo LinkedIn ka jira.",
            "Sharax sida email format loo soo qaadan lahaa.",
            "Qor talooyin 3 ah oo lagu ilaaliyo employees-ka social engineering."
          ],
          deliverable: "People recon awareness report."
        }
      },


      {
        slug: "email-username-enumeration",
        title: "Email Harvesting & Username Enumeration",
        english: "Email Harvesting and Username Enumeration",
        minutes: 12,

        summary:
          "Sii qoto dheeree email format discovery iyo sida usernames loo aqoonsado platforms kala duwan.",

        sections: [
          {
            h: "Automated Email Harvesting",
            p:
            "Tools sida Hunter.io ama theHarvester waxay ururiyaan emails domain gaar ah iyada oo la isticmaalayo search engines, PGP key servers, iyo social media — waxay bixiyaan list target ah phishing simulations ama social engineering ahaan."
          },
          {
            h: "Username Enumeration Across Platforms",
            p:
            "Marka la ogaado hal username (tusaale LinkedIn), tools sida Sherlock waxay baaraan platforms badan (Twitter, GitHub, Instagram) si loo aqoonsado accounts isla qofka — waxay bixiyaan muuqaal ballaaran oo digital footprint ah."
          },
          {
            h: "Breach Data Correlation",
            p:
            "Isticmaalka Have I Been Pwned iyo breach databases kale, waxaad ku aqoonsan kartaa haddii employee-yada ay ku jireen breaches hore — credentials la xaday laga yaabo inay wali ku shaqeeyaan (password reuse)."
          },
          {
            h: "Ethical Considerations",
            p:
            "Xitaa in kastoo macluumaadkani uu yahay public, isticmaalkiisa waa in uu ku jiraa scope-ka authorized — OSINT-ku ma noqonayo 'free pass' si loo xad-gudbo privacy-ga shakhsi ahaaneed."
          }
        ],

        terms: [
          { term: "Email Harvesting", def: "Ururinta automated ah ee emails domain gaar ah." },
          { term: "Username Enumeration", def: "Raadinta accounts isla qof platforms badan." }
        ],

        quiz: [
          {
            q: "Sherlock-style tools waxay sameeyaan?",
            options: [
              "Baaraan platforms badan si loo aqoonsado accounts isla qofka",
              "Waxay tirtiraan accounts",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Kuwaan waxay dhisaan muuqaal ballaaran oo digital footprint ah."
          },
          {
            q: "Breach data correlation waxay caawisaa?",
            options: [
              "Aqoonsiga haddii credentials employee la xaday hore u jireen breaches",
              "Xatooyada credentials cusub",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Password reuse-ku wuxuu ka dhigayaa credentials hore mid weli khatar ah."
          },
          {
            q: "OSINT public data ahaan waa in la isticmaalo?",
            options: [
              "Kaliya scope-ka authorized gudihiisa",
              "Si xor ah, ma jiro xaddid",
              "Ma jiro sabab ethical ah",
              "Kaliya law enforcement"
            ],
            answer: 0,
            explain: "Public availability kuma filna in xad-gudub la sameeyo privacy-ga."
          }
        ],

        exercise: {
          title: "Email/Username OSINT Practice",
          steps: [
            "Sharax sida email harvesting loo sameeyo (concept ahaan).",
            "Sharax sida username enumeration loo isticmaali lahaa.",
            "Sharax faa'iidada breach data correlation.",
            "Qor 2 ethical considerations OSINT-kan la xiriira."
          ],
          deliverable: "Email/username OSINT reference notes."
        }
      },

      {
        slug: "whois-certificate-transparency",
        title: "WHOIS & Domain Intelligence",
        english: "WHOIS and Domain Intelligence",
        minutes: 10,

        summary:
          "Faham WHOIS lookups iyo sida domain intelligence-ka loo isticmaalo reconnaissance.",

        sections: [
          {
            h: "WHOIS Lookups",
            p:
            "WHOIS wuxuu bixiyaa macluumaad ku saabsan domain registration: registrant name (haddii aan privacy la isticmaalin), registrar, creation date, expiration date, iyo name servers."
          },
          {
            h: "Domain Age as an Indicator",
            p:
            "Domain aad u cusub (dhawaan la diiwaan geliyay) wuxuu noqon karaa red flag marka la baarayo phishing — laakiin marka la sameynayo recon offensive ahaan, domain age-ka target-ka wuxuu kuu sheegi karaa waqtiga shirkaddu jirtay."
          },
          {
            h: "WHOIS Privacy iyo Limitations",
            p:
            "GDPR iyo privacy laws kale ayaa keenay in domain registrars badankood ay qariyaan registrant info-ga. Sidaas darteed WHOIS-ku maanta wuxuu bixiyaa macluumaad ka yar sidii hore."
          },
          {
            h: "Related Domain Discovery",
            p:
            "Marka aad hesho macluumaad WHOIS ah (tusaale: email registrant-ka), waxaad isticmaali kartaa 'reverse WHOIS' si aad u hesho domains kale oo isla qofka/shirkadda diiwaan gelisay — muhiim marka la baarayo shirkado weyn oo leh domains badan."
          }
        ],

        terms: [
          { term: "WHOIS", def: "Diiwaanka muujinaya macluumaadka registration-ka domain-ka." },
          { term: "Reverse WHOIS", def: "Raadinta domains kale oo isla qofka/shirkadda diiwaan gelisay." }
        ],

        quiz: [
          {
            q: "WHOIS wuxuu bixiyaa?",
            options: [
              "Macluumaad domain registration ah",
              "Password-ka website-ka",
              "Source code-ka website-ka",
              "Server IP oo keliya"
            ],
            answer: 0,
            explain: "WHOIS wuxuu daboolaa registrant, registrar iyo taariikhaha."
          },
          {
            q: "GDPR waxay saameysay WHOIS sidee?",
            options: [
              "Way qarisay macluumaadka registrant badanaa",
              "Way bilaashisay WHOIS oo dhan",
              "Ma jiro saameyn",
              "Way kordhisay macluumaadka la bixiyo"
            ],
            answer: 0,
            explain: "Privacy laws waxay yareeyeen macluumaadka WHOIS bixiyo."
          },
          {
            q: "Reverse WHOIS waxaa loo isticmaalaa?",
            options: [
              "Raadinta domains kale oo isla qofka diiwaan gelisay",
              "Xakamaynta DNS",
              "Beddelidda registrant",
              "Sameynta backup"
            ],
            answer: 0,
            explain: "Reverse WHOIS wuxuu muujiyaa portfolio domain-yada shirkad."
          }
        ],

        exercise: {
          title: "Domain Intelligence Gathering",
          steps: [
            "Isticmaal WHOIS lookup domain public ah.",
            "Aqoonso registrar-ka iyo taariikhda diiwaan gelinta.",
            "Sharax sida reverse WHOIS loo isticmaali lahaa.",
            "Qor sababta domain age-gu muhiim u yahay recon-ka."
          ],
          deliverable: "Domain intelligence summary."
        }
      },


      {
        slug: "reconnaissance-capstone-lab",
        title: "Reconnaissance — Full Capstone Lab",
        english: "Reconnaissance Capstone Lab",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee full OSINT recon report oo target tusaale ah ku saabsan.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad hesha authorization aad ku samayso passive + active recon shirkad tusaale ah, ka hor pentest dhab ah oo bilaabmaya toddobaadka soo socda."
          },
          {
            h: "Passive Recon Phase",
            p:
            "Isticmaal Google dorking, Shodan, theHarvester, WHOIS iyo LinkedIn si aad u ururiso macluumaad iyada oo aan si toos ah loogu xiriirin target-ka."
          },
          {
            h: "Active Recon Phase (Authorized)",
            p:
            "Isticmaal DNS lookups, subdomain enumeration, iyo certificate transparency si aad u ballaadhiso attack surface map-kaaga."
          },
          {
            h: "Reporting",
            p:
            "Isku dar dhammaan findings-kaaga warbixin structured ah: company overview, subdomains la helay, employees/emails la aqoonsaday, technology stack, iyo attack surface summary."
          }
        ],

        terms: [
          { term: "Full Recon Report", def: "Warbixin isku darta passive iyo active recon findings." }
        ],

        quiz: [
          {
            q: "Active recon-ka waa in la sameeyo marka?",
            options: [
              "Kadib marka la helo authorization",
              "Ka hor authorization",
              "Waligeed la iska daayo",
              "Kaliya haddii la doonayo"
            ],
            answer: 0,
            explain: "Active recon wuxuu isku xiriiraa target-ka, u baahan yahay authorization ka hor."
          },
          {
            q: "Recon report-ku waa in uu ku jiro?",
            options: [
              "Subdomains, employees/emails, tech stack, attack surface summary",
              "Kaliya IP address hal ah",
              "Kaliya magaca shirkadda",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Warbixin dhamaystiran waxay taageertaa marxaladaha xiga ee pentest-ka."
          },
          {
            q: "Sababta passive loo bilaabo ka hor active waa?",
            options: [
              "Waa mid ammaan ah oo aan la ogaan karin",
              "Waa mid ka dhaqso badan",
              "Ma jiro sabab",
              "Passive waa mid keliya loo isticmaalo"
            ],
            answer: 0,
            explain: "Passive-ku wuxuu yareeyaa khatarta la ogaado ka hor active recon."
          }
        ],

        exercise: {
          title: "Full OSINT Recon Report",
          steps: [
            "Isticmaal dhammaan techniques passive-ka module-kan (Google dorking, Shodan, WHOIS, LinkedIn).",
            "Sharax sida aad u samayn lahayd active recon (DNS, subdomains) haddii authorization la helay.",
            "Isku dar findings-ka warbixin structured ah.",
            "Ku dar attack surface summary iyo recommendations pentest-ka xiga."
          ],
          deliverable: "Full OSINT reconnaissance report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "eh3",
    slug: "nmap-network-scanning",
    stage: "Sare",
    title: "Nmap & Network Scanning",
    english: "Nmap & Network Scanning",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa Nmap scan types, service/OS detection, NSE scripts iyo habka firewall/IDS evasion.",

    topics: [
      "Nmap Fundamentals & Scan Types",
      "Port Scanning Techniques",
      "Service & OS Detection",
      "Nmap Scripting Engine (NSE)",
      "Evading Detection: Firewalls & IDS",
      "Scanning Capstone Lab",
    ],

    lessonList: [

      {
        slug: "nmap-fundamentals-scan-types",
        title: "Nmap Fundamentals & Scan Types",
        english: "Nmap Fundamentals and Scan Types",
        minutes: 12,

        summary:
          "Baro aasaaska Nmap iyo noocyada scans-ka ugu caansan.",

        sections: [
          {
            h: "Waa Maxay Nmap?",
            p:
            "Nmap (Network Mapper) waa tool bilaash ah oo loo isticmaalo host discovery, port scanning, service detection iyo OS fingerprinting. Waa tool-ka aasaasiga ah ee network pentesting oo dhan."
          },
          {
            h: "TCP Connect Scan (-sT)",
            p:
            "TCP Connect scan wuxuu dhammaystiraa three-way handshake buuxa (SYN, SYN-ACK, ACK). Wuxuu u baahan yahay raw socket permissions oo yar, laakiin wuxuu ka tagayaa logs badan (mid ka fudud in la ogaado)."
          },
          {
            h: "SYN Scan (-sS)",
            p:
            "SYN scan (badanaa 'stealth scan' la yiraahdo) wuxuu diraa SYN keliya, oo haddii SYN-ACK la helo, wuxuu ku jawaabaa RST halkii uu dhamaystiri lahaa handshake-ka. Waxay ka tagaysaa logs ka yar TCP Connect, laakiin u baahan root/admin privileges."
          },
          {
            h: "UDP Scan (-sU)",
            p:
            "UDP scan wuxuu tijaabiyaa ports UDP ah (DNS, DHCP, SNMP). Way ka gaabis badan tahay TCP scanning sababtoo ah UDP lacks response caadi ah — ICMP unreachable messages ayaa loo isticmaalaa in la go'aamiyo closed vs open|filtered."
          }
        ],

        terms: [
          { term: "SYN Scan", def: "Nooc scan ah oo aan dhamaystirin three-way handshake — mid ka 'stealth' badan." },
          { term: "TCP Connect Scan", def: "Scan dhammaystira handshake buuxa, ka tagta logs badan." },
          { term: "UDP Scan", def: "Scan tijaabiya ports UDP ah, way ka gaabis badan tahay TCP." }
        ],

        quiz: [
          {
            q: "SYN scan (-sS) sababta loo yiraahdo 'stealth' waa?",
            options: [
              "Ma dhammaystirin three-way handshake-ka buuxa",
              "Waa mid aan la ogaan karin marnaba",
              "Ma isticmaasho TCP",
              "Waa mid xawli aan lahayn"
            ],
            answer: 0,
            explain: "Waxay dhistaa half-open connection oo aan buuxin, taasoo ka tagaysa evidence yar."
          },
          {
            q: "SYN scan wuxuu u baahan yahay?",
            options: [
              "Root/admin privileges",
              "User caadi ah oo keliya",
              "Guest account",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "SYN scan-ku wuxuu u baahan yahay raw socket access, taasoo u baahan admin/root."
          },
          {
            q: "UDP scan way ka gaabis badan tahay TCP sababtoo ah?",
            options: [
              "UDP lacks response caadi ah, ICMP unreachable ayaa loo isticmaalaa",
              "UDP ma taageero scanning",
              "UDP waa mid la joojiyay",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "La'aanta response degdeg ah wuxuu ku qasbaa Nmap inuu sugo timeout."
          },
          {
            q: "TCP Connect scan waxay ka tagtaa?",
            options: [
              "Logs badan, sababtoo ah wuxuu dhammaystiraa connection buuxa",
              "Logs aad u yar",
              "Wax logs ah ma jiraan",
              "Kaliya UDP logs"
            ],
            answer: 0,
            explain: "Connection dhammaystiran waxay muujin kartaa log-yada application-ka."
          }
        ],

        exercise: {
          title: "Nmap Scan Types Reference",
          steps: [
            "Sharax farqiga -sT, -sS iyo -sU.",
            "Qor sida syntax-ku u eg yahay scan kasta.",
            "Sharax marka aad isticmaali lahayd nooc kasta (scenario).",
            "Ku qor sababta authorization loo baahan yahay ka hor scanning kasta."
          ],
          deliverable: "Nmap scan types reference sheet."
        }
      },


      {
        slug: "port-scanning-techniques",
        title: "Port Scanning Techniques",
        english: "Port Scanning Techniques",
        minutes: 13,

        summary:
          "Sii qoto dheeree fahamkaaga scan techniques kala duwan — NULL, FIN, Xmas, iyo timing options.",

        sections: [
          {
            h: "NULL, FIN & Xmas Scans",
            p:
            "NULL scan (-sN) ma dirto flags kasta. FIN scan (-sF) wuxuu dirayaa FIN flag oo keliya. Xmas scan (-sX) wuxuu dirayaa FIN, PSH, URG (sida geed Xmas ah 'muuqda'). Kuwan waxay ka faa'iidaystaan RFC behavior — closed ports waxay jawaabaan RST, open/filtered ports waxay iska indho tiraan."
          },
          {
            h: "Timing Templates (-T0 ilaa -T5)",
            p:
            "Nmap wuxuu leeyahay 6 timing templates: -T0 (paranoid, ugu gaabis, ugu ammaan badan detection ahaan) ilaa -T5 (insane, ugu dhaqso badan, ugu muuqda badan). -T3 waa default. Pentester-yadu waxay isticmaalaan -T2 ama -T1 marka la doonayo la ogaan la'aan."
          },
          {
            h: "Port Range & Target Specification",
            p:
            "-p- wuxuu scan gareeyaa dhammaan 65535 ports. -p 80,443 wuxuu scan gareeyaa ports gaar ah. -iL targets.txt wuxuu ka akhriyaa liis targets ah file. CIDR notation (192.168.1.0/24) waxaa loo isticmaalaa subnet oo dhan."
          },
          {
            h: "Output Formats",
            p:
            "-oN (normal), -oX (XML, muhiim tools kale sida Metasploit), -oG (grepable, legacy), -oA (dhammaan saddexda isla mar). Documentation-ka professional pentest waa in la isticmaalo -oX ama -oA."
          }
        ],

        terms: [
          { term: "NULL Scan", def: "Scan aan dirin flags kasta, isticmaala RFC behavior." },
          { term: "Timing Template", def: "Settings (-T0 ilaa -T5) go'aamiya xawaaraha iyo muuqashada scan-ka." },
          { term: "CIDR Notation", def: "Qaab lagu qeexo subnet oo dhan (tusaale /24)." }
        ],

        quiz: [
          {
            q: "-T0 timing template waa?",
            options: [
              "Paranoid — ugu gaabis oo ugu ammaan badan detection ahaan",
              "Ugu dhaqso badan",
              "Default-ka Nmap",
              "Waa kaliya loo isticmaalo UDP"
            ],
            answer: 0,
            explain: "T0 wuxuu ka dhigaa scan-ka mid aad u gaabis si loo yareeyo IDS detection."
          },
          {
            q: "-p- flag-ku wuxuu sameeyaa?",
            options: [
              "Scan gareeyaa dhammaan 65535 ports",
              "Scan gareeyaa hal port oo keliya",
              "Wuxuu joojiyaa scan-ka",
              "Wuxuu beddelaa IP-ga"
            ],
            answer: 0,
            explain: "-p- waa gaaban u ah dhammaan port range-ka."
          },
          {
            q: "-oX output format-ku wuxuu bixiyaa?",
            options: [
              "XML output, muhiim tools kale sida Metasploit",
              "Normal text keliya",
              "Backup file",
              "Encrypted output"
            ],
            answer: 0,
            explain: "XML wuxuu u ogolaadaa tools kale inay akhriyaan natiijada si automated ah."
          },
          {
            q: "NULL, FIN iyo Xmas scans waxay ka faa'iidaystaan?",
            options: [
              "RFC behavior — closed ports jawaabaan RST",
              "Awoodda admin",
              "UDP protocol",
              "DNS records"
            ],
            answer: 0,
            explain: "Kuwan waxay isticmaalaan sida TCP/IP stack-ku ku jawaabo flags aan caadi ahayn."
          }
        ],

        exercise: {
          title: "Advanced Scanning Practice",
          steps: [
            "Sharax syntax-ka NULL, FIN, iyo Xmas scans.",
            "Sharax marka aad isticmaali lahayd -T1 halkii -T4.",
            "Qor tusaale command ah oo scan gareeya subnet 192.168.1.0/24 oo output-ka XML ah bixiya.",
            "Sharax sababta -oA loo isticmaalo professional engagements."
          ],
          deliverable: "Advanced scanning syntax cheat sheet."
        }
      },


      {
        slug: "service-os-detection",
        title: "Service & OS Detection",
        english: "Service and OS Detection",
        minutes: 15,

        summary:
          "Faham sida Nmap loo isticmaalo si loo aqoonsado services-ka iyo operating system-ka target-ka.",

        sections: [
          {
            h: "Service Version Detection (-sV)",
            p:
            "-sV wuxuu isku daya inuu aqoonsado version-ka software-ka ku shaqeynaya port kasta (tusaale Apache 2.4.41). Macluumaadkan waa muhiim si loo helo known vulnerabilities version-kaas la xiriira."
          },
          {
            h: "OS Fingerprinting (-O)",
            p:
            "-O wuxuu isticmaalaa TCP/IP stack fingerprinting (habka OS-ku ugu jawaabo packets aan caadi ahayn) si loo qiyaaso OS-ka (Windows, Linux, kernel version). Natiijadu waa qiyaas, ma aha xaqiiq 100%."
          },
          {
            h: "Banner Grabbing",
            p:
            "Banner grabbing waa habka la aqoonsado service info iyada oo la isku xiro port-ka si toos ah (tusaale nc target 22 si loo arko SSH banner-ka). Nmap wuxuu automate gareeyaa habkan -sV isaga."
          },
          {
            h: "Aggressive Scan (-A)",
            p:
            "-A wuxuu isku daraa OS detection, version detection, script scanning, iyo traceroute hal command ah. Waa mid degdeg u ah in la isticmaalo, laakiin waa mid aad u muuqda (loud) detection ahaan."
          }
        ],

        terms: [
          { term: "Service Version Detection", def: "Aqoonsiga version-ka software ku shaqeynaya port kasta." },
          { term: "OS Fingerprinting", def: "Qiyaasidda OS-ka target-ka iyada oo la eegayo TCP/IP behavior." },
          { term: "Banner Grabbing", def: "Habka isku xirka toos ah port si service info loo helo." }
        ],

        quiz: [
          {
            q: "-sV wuxuu isku dayaa inuu aqoonsado?",
            options: [
              "Version-ka software-ka ku shaqeynaya port kasta",
              "Password-ka user-ka",
              "IP address-ka router-ka",
              "MAC address-ka"
            ],
            answer: 0,
            explain: "Version detection wuxuu caawiyaa la aqoonsado vulnerabilities-ka la xiriira."
          },
          {
            q: "-O flag-ku wuxuu sameeyaa?",
            options: [
              "Wuxuu qiyaasaa operating system-ka target-ka",
              "Wuxuu tirtiraa OS-ka",
              "Wuxuu update gareeyaa OS-ka",
              "Ma jiro shaqo"
            ],
            answer: 0,
            explain: "OS fingerprinting-ku waa qiyaas, ma aha xaqiiqo 100%."
          },
          {
            q: "-A flag-ku wuxuu isku daraa?",
            options: [
              "OS detection, version detection, script scanning, traceroute",
              "Kaliya port scanning",
              "Kaliya UDP scanning",
              "Kaliya banner grabbing"
            ],
            answer: 0,
            explain: "-A waa 'aggressive' — wuxuu bixiyaa macluumaad badan hal command ah."
          },
          {
            q: "Sababta -A loo tixgeliyo 'loud' waa?",
            options: [
              "Wuxuu dhaliyaa traffic badan oo IDS-yada si fudud u ogaan karaan",
              "Wuxuu ka dhaqso badan yahay dhammaan scans",
              "Ma bixiso macluumaad",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Isku darka scans badan hal mar ayaa keena traffic la ogaan karo."
          }
        ],

        exercise: {
          title: "Service & OS Detection Practice",
          steps: [
            "Sharax syntax -sV iyo -O.",
            "Sharax sida version detection uga caawin karto vulnerability research.",
            "Sharax farqiga -A iyo isticmaalka manual ah ee -sV -O -sC.",
            "Sharax marka aad ka fogaan lahayd -A (stealth engagements)."
          ],
          deliverable: "Service/OS detection notes."
        }
      },


      {
        slug: "nmap-scripting-engine-nse",
        title: "Nmap Scripting Engine (NSE)",
        english: "Nmap Scripting Engine (NSE)",
        minutes: 11,

        summary:
          "Baro sida NSE scripts loo isticmaalo si loo ballaadhiyo awoodda Nmap — vuln detection ilaa brute force.",

        sections: [
          {
            h: "Waa Maxay NSE?",
            p:
            "Nmap Scripting Engine (NSE) waa framework u oggolaanaya scripts (Lua language) in lagu daro Nmap si loo sameeyo baaritaan dheeraad ah — vulnerability detection, brute forcing, ama service-specific enumeration."
          },
          {
            h: "Script Categories",
            p:
            "auth (authentication bypass tests), vuln (vulnerability detection), brute (brute force), discovery (macluumaad dheeraad ah), safe (aan halis lahayn), intrusive (laga yaabo inuu crash-gareeyo service)."
          },
          {
            h: "Common NSE Commands",
            p:
            "nmap --script vuln target — wuxuu isticmaalaa dhammaan scripts vuln-ka ah. nmap --script http-title target — wuxuu soo saaraa title-ka web page-ka. nmap --script smb-vuln* target — wuxuu baaraa SMB vulnerabilities."
          },
          {
            h: "Writing Custom Scripts (Overview)",
            p:
            "NSE scripts waxaa lagu qoraa Lua, kuna kaydsan /usr/share/nmap/scripts/. Professional pentester-yadu mararka qaar waxay qoraan custom scripts si loo baaro vulnerabilities gaar ah oo aan horay loo qorin."
          }
        ],

        terms: [
          { term: "NSE", def: "Nmap Scripting Engine — framework scripts lagu daro Nmap." },
          { term: "Script Category", def: "Kala saarista NSE scripts (auth, vuln, brute, iwm)." }
        ],

        quiz: [
          {
            q: "nmap --script vuln target wuxuu sameeyaa?",
            options: [
              "Isticmaalaa dhammaan scripts vulnerability detection ah",
              "Wuxuu joojiyaa dhammaan services",
              "Wuxuu tirtiraa vulnerabilities",
              "Wuxuu update gareeyaa software"
            ],
            answer: 0,
            explain: "vuln category-gu wuxuu isku daraa scripts kala duwan oo baaraya vulnerabilities."
          },
          {
            q: "Script category 'intrusive' macnaheedu waa?",
            options: [
              "Laga yaabo inuu crash-gareeyo service-ka",
              "Waa mid ammaan ah oo aan halis lahayn",
              "Waa kaliya discovery",
              "Waa kaliya brute force"
            ],
            answer: 0,
            explain: "Intrusive scripts waxay khatar gelin karaan stability-ga target-ka."
          },
          {
            q: "NSE scripts waxaa lagu qoraa?",
            options: ["Lua", "Python", "JavaScript", "C++"],
            answer: 0,
            explain: "Lua waa luqadda NSE scripts loo qoro."
          },
          {
            q: "smb-vuln* scripts waxay baaraan?",
            options: [
              "SMB vulnerabilities",
              "Web application vulnerabilities",
              "DNS vulnerabilities",
              "Email vulnerabilities"
            ],
            answer: 0,
            explain: "SMB scripts waxay diiradda saaraan Windows file sharing protocol-ka."
          }
        ],

        exercise: {
          title: "NSE Script Practice",
          steps: [
            "Liis garee 5 NSE script categories iyo sharraxaad kasta.",
            "Qor tusaale command ah oo isticmaala --script http-enum.",
            "Sharax farqiga safe iyo intrusive scripts.",
            "Sharax sababta la isticmaali lahayn safe scripts marka la doonayo la ogaan la'aan."
          ],
          deliverable: "NSE scripting reference sheet."
        }
      },


      {
        slug: "service-enumeration-deep-dive",
        title: "Service Enumeration Deep Dive",
        english: "Service Enumeration Deep Dive",
        minutes: 14,

        summary:
          "Sii qoto dheeree enumeration-ka services caanka ah — SMB, FTP, iyo manual banner grabbing.",

        sections: [
          {
            h: "SMB Enumeration",
            p:
            "enum4linux iyo smbclient waxaa loo isticmaalaa in la baaro SMB shares (Windows file sharing) — waxay bixiyaan macluumaad users, groups, iyo shares la heli karo, mararka qaarkood iyada oo aan authentication loo baahnayn (null sessions)."
          },
          {
            h: "FTP & Anonymous Access",
            p:
            "FTP servers waxay mararka qaarkood u oggol yihiin 'anonymous' login — tijaabinta anonymous access waa tallaabo asaasi ah, sababtoo ah waxay siin kartaa access files ka horreysay authentication buuxa."
          },
          {
            h: "Manual Banner Grabbing",
            p:
            "netcat (nc target port) waxaa loo isticmaalaa si toos ah loola xiriiro service-ka si loo arko banner-ka — habkani wuxuu bixiyaa xaqiijin manual ah oo Nmap version detection-ka taageera."
          },
          {
            h: "Enumeration Wordlists & Automation",
            p:
            "Tools sida enum4linux-ng iyo automation scripts waxay isku daraan dhawr enumeration steps hal command ah — muhiim marka la baarayo environment ballaaran oo hosts badan leh."
          }
        ],

        terms: [
          { term: "Null Session", def: "SMB connection aan authentication loo baahnayn." },
          { term: "Banner Grabbing", def: "Isku xirka toos ah service si loo arko version info." }
        ],

        quiz: [
          {
            q: "enum4linux waxaa loo isticmaalaa?",
            options: [
              "Baaritaanka SMB shares, users, groups",
              "Web application testing",
              "Password cracking",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "SMB enumeration waa qayb muhiim ah oo Windows environment recon ah."
          },
          {
            q: "FTP anonymous access tijaabintiisu waa muhiim sababtoo ah?",
            options: [
              "Waxay siin kartaa access files ka horreysay authentication buuxa",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup",
              "Waa waajib FTP kasta"
            ],
            answer: 0,
            explain: "Misconfiguration-kani waa hab caan ah oo initial access ah."
          },
          {
            q: "netcat banner grabbing wuxuu bixiyaa?",
            options: [
              "Xaqiijin manual ah oo Nmap version detection taageera",
              "Automation buuxa",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo files transfer"
            ],
            answer: 0,
            explain: "Manual verification-ku wuxuu xoojiyaa natiijooyinka automated tools."
          }
        ],

        exercise: {
          title: "Service Enumeration Practice",
          steps: [
            "Sharax sida enum4linux loo isticmaali lahaa SMB enumeration.",
            "Sharax habka FTP anonymous access loo tijaabin lahaa.",
            "Qor tusaale netcat command ah oo banner grab gareynaya.",
            "Sharax faa'iidada automation scripts environment ballaaran ah."
          ],
          deliverable: "Service enumeration reference sheet."
        }
      },

      {
        slug: "evading-detection-firewalls-ids",
        title: "Evading Detection: Firewalls & IDS",
        english: "Evading Detection: Firewalls and IDS",
        minutes: 14,

        summary:
          "Faham techniques-ka loo isticmaalo si loo yareeyo detection marka la scan-gareynayo, iyo sababaha ethical ee la xiriira.",

        sections: [
          {
            h: "Fragmentation (-f)",
            p:
            "-f wuxuu kala jarayaa packets-ka qaybo yaryar si uu uga fogaado firewalls/IDS-yada fudud ee eegaya packet headers buuxa. Firewalls casriga ah waxay badanaa reassemble gareeyaan packets-ka ka hor inay falanqeeyaan."
          },
          {
            h: "Decoy Scanning (-D)",
            p:
            "-D wuxuu ku daraa IP addresses been ah (decoys) scan-ka si target-ku uu u arko traffic ka yimid IP-yo badan, isagoo ka adkeynaya in la ogaado kee ka mid ah IP-yada uu yahay scanner-ka dhabta ah."
          },
          {
            h: "Source Port Manipulation",
            p:
            "--source-port 53 wuxuu isku dayaa inuu ka dhigo scan-ka mid u eg traffic DNS ah (port 53), sababtoo ah firewalls-yada qaarkood si caadi ah ayay u oggolaadaan traffic ka yimid ports 'trusted' ah."
          },
          {
            h: "Sababaha Ethical",
            p:
            "Evasion techniques waxaa loo isticmaalaa kaliya authorized engagements gudahood — ujeeddadu waa in la tijaabiyo detection capability-ga defender-ka (waa qayb ka mid ah pentest-ka), ma aha in xad-gudub la sameeyo."
          }
        ],

        terms: [
          { term: "Fragmentation", def: "Kala jaridda packets qaybo yaryar si loo yareeyo detection." },
          { term: "Decoy Scanning", def: "Ku darista IP addresses been ah si la ogaan la'aan loo helo." }
        ],

        quiz: [
          {
            q: "-f flag-ku wuxuu sameeyaa?",
            options: [
              "Kala jaraa packets qaybo yaryar si loo yareeyo detection",
              "Wuxuu xawligeliyaa scan-ka",
              "Wuxuu joojiyaa scan-ka",
              "Wuxuu beddelaa target-ka"
            ],
            answer: 0,
            explain: "Fragmentation-ku wuxuu isku dayaa inuu ka gudbo firewalls fudud."
          },
          {
            q: "Decoy scanning (-D) wuxuu sameeyaa?",
            options: [
              "Ku daraa IP addresses been ah si la is-jugleeyo",
              "Wuxuu tirtiraa IP-ga dhabta ah",
              "Wuxuu xakameeyaa firewall-ka",
              "Wuxuu beddelaa DNS"
            ],
            answer: 0,
            explain: "Decoys waxay ka adkeeyaan defender-ka inuu ogaado scanner-ka dhabta ah."
          },
          {
            q: "Sababta evasion techniques loo isticmaalo authorized pentest gudahood waa?",
            options: [
              "Si loo tijaabiyo detection capability-ga defender-ka",
              "Si loo xad-gudbo shirkadda",
              "Si loo qariyo dembi",
              "Ma jiro sabab sharci ah"
            ],
            answer: 0,
            explain: "Evasion-ka waa qayb legitimate ah oo pentest ah marka la oggol yahay."
          },
          {
            q: "--source-port 53 wuxuu isku dayaa?",
            options: [
              "Inuu ka dhigo scan-ka mid u eg traffic DNS trusted ah",
              "Inuu joojiyo DNS-ka",
              "Inuu beddelo DNS records",
              "Inuu tirtiro DNS cache"
            ],
            answer: 0,
            explain: "Firewalls-yada qaarkood si caadi ah ayay u aamintaan ports 'trusted' ah sida 53."
          }
        ],

        exercise: {
          title: "Evasion Techniques Study",
          steps: [
            "Sharax syntax -f, -D, iyo --source-port.",
            "Sharax sababta firewalls casriga ah aysan si fudud ugu maqnayn evasion-kan.",
            "Qor 3 sababood oo ethical ah oo la isticmaalo evasion authorized engagement gudahood.",
            "Sharax cawaaqibka haddii evasion la isticmaalo aan authorization lahayn."
          ],
          deliverable: "Evasion techniques study notes."
        }
      },


      {
        slug: "scanning-capstone-lab",
        title: "Network Scanning — Full Capstone Lab",
        english: "Network Scanning Capstone Lab",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — naqshadee full scanning methodology oo authorized engagement ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad haysataa authorization aad ku samayso network scan buuxa subnet /24 ah oo leh 20+ hosts. Waa in aad soo saarto liis dhamaystiran oo services, versions iyo suspected OS ah."
          },
          {
            h: "Phase 1: Host Discovery",
            p:
            "Naqshadee command host discovery ah (-sn) si aad u hesho hosts-ka nool subnet-ka gudihiisa ka hor inaad bilowdo port scanning."
          },
          {
            h: "Phase 2: Port & Service Scanning",
            p:
            "Naqshadee command isugu jira SYN scan, service detection, iyo output XML ah — ku ballaaran dhammaan ports (-p-)."
          },
          {
            h: "Phase 3: Targeted NSE Scripts",
            p:
            "Iyadoo lagu saleynayo services-ka la helay (tusaale SMB, HTTP), naqshadee NSE scripts specific ah oo lagu baari lahaa vulnerabilities."
          }
        ],

        terms: [
          { term: "Scanning Methodology", def: "Habraaca isugu jira host discovery, port scanning iyo NSE scripts." }
        ],

        quiz: [
          {
            q: "Tallaabada ugu horreysa ee scanning methodology waa?",
            options: [
              "Host discovery — ogaanshaha hosts-ka nool",
              "NSE vulnerability scripts",
              "OS fingerprinting",
              "Banner grabbing"
            ],
            answer: 0,
            explain: "Marka hore waa in la ogaado hosts-ka jira ka hor la scan-gareeyo ports."
          },
          {
            q: "-sn flag-ku wuxuu sameeyaa?",
            options: [
              "Host discovery oo keliya, aan port scan lahayn",
              "Full port scan",
              "OS detection oo keliya",
              "NSE scripts oo keliya"
            ],
            answer: 0,
            explain: "-sn (ping scan) wuxuu ogaadaa hosts-ka nool iyada oo aan ports la scan-gareyn."
          },
          {
            q: "NSE scripts targeted ah waa in loo isticmaalo?",
            options: [
              "Kadib marka services-ka la helay, iyadoo lagu saleynayo waxa la helay",
              "Ka hor scanning kasta",
              "Waligeed la iska daayo",
              "Kaliya UDP services"
            ],
            answer: 0,
            explain: "Targeted approach wuxuu yareeyaa noise-ka oo hagaajiyaa waxtarka."
          }
        ],

        exercise: {
          title: "Full Scanning Methodology Plan",
          steps: [
            "Naqshadee command host discovery ah subnet 192.168.1.0/24 ah.",
            "Naqshadee full port + service scan command ah oo output XML bixiya.",
            "Iyadoo lagu saleynayo services la yaabo la helay (SSH, HTTP, SMB), xulo 3 NSE scripts la isticmaali lahaa.",
            "Isku dar dhammaan saddexda phase warbixin scanning methodology ah."
          ],
          deliverable: "Full scanning methodology document (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "eh4",
    slug: "web-application-security",
    stage: "Sare",
    title: "Web Application Security",
    english: "Web Application Security",
    hours: 1,

    outcome:
      "Waxaad si adag u fahmi doontaa SQL injection, XSS, authentication attacks, iyo CSRF/SSRF/IDOR — asaaska web app pentesting.",

    topics: [
      "How Web Apps Work & Attack Surface",
      "SQL Injection Deep Dive",
      "Cross-Site Scripting (XSS)",
      "Authentication & Session Attacks",
      "CSRF, SSRF & IDOR",
      "Web App Security Capstone",
    ],

    lessonList: [

      {
        slug: "how-web-apps-work-attack-surface",
        title: "Sida Web Apps u Shaqeeyaan & Attack Surface",
        english: "How Web Apps Work and Attack Surface",
        minutes: 12,

        summary:
          "Faham request/response cycle-ka, client-server architecture, iyo meelaha attack surface-ka web app-ku ka kooban yahay.",

        sections: [
          {
            h: "Request/Response Cycle",
            p:
            "Browser wuxuu diraa HTTP request (method, headers, body). Server wuxuu ku jawaabaa response (status code, headers, body). Fahamka cycle-kan waa aasaaska dhammaan web attacks."
          },
          {
            h: "Client-Side vs Server-Side",
            p:
            "Client-side (JavaScript, HTML, CSS) wuxuu ku shaqeeyaa browser-ka user-ka — attacker-ku wuu arki karaa oo beddeli karaa. Server-side (backend logic, database queries) waa halka validation-ka dhabta ah waa in uu ka dhaco — 'never trust the client'."
          },
          {
            h: "Web App Attack Surface",
            p:
            "Input fields (forms, URL parameters), Cookies/Sessions, APIs, File uploads, Authentication mechanisms, Third-party integrations. Attacker kastaa wuxuu diiradda saaraa meelaha xogta user-ku geliyo ama la beddeli karo."
          },
          {
            h: "HTTP Methods & Status Codes",
            p:
            "GET (soo qaad), POST (dir xog), PUT (cusbooneysii), DELETE (tirtir). Status codes: 200 (guul), 301/302 (redirect), 401 (unauthorized), 403 (forbidden), 404 (not found), 500 (server error). Fahamkoodu waa muhiim marka la falanqeynayo application behavior."
          }
        ],

        terms: [
          { term: "Attack Surface (Web)", def: "Meelaha web app-ku input-ka user-ku geliyo ama la beddeli karo." },
          { term: "Never Trust the Client", def: "Principle sheegaya in validation dhabta ah ay ku dhacdo server-side." }
        ],

        quiz: [
          {
            q: "Sababta 'never trust the client' loo yiraahdo waa?",
            options: [
              "Attacker-ku wuu beddeli karaa client-side code",
              "Client-side ma jiro",
              "Server-ku waligeed ma khaldamo",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Validation dhabta ah waa in uu ku dhaco server-side, ma aha JavaScript oo browser-ka ku socda."
          },
          {
            q: "Status code 403 macnaheedu waa?",
            options: ["Forbidden", "Not found", "Server error", "Guul"],
            answer: 0,
            explain: "403 wuxuu muujiyaa in user-ku uusan lahayn oggolaansho."
          },
          {
            q: "Attack surface web app ah wuxuu ka kooban yahay?",
            options: [
              "Input fields, cookies, APIs, file uploads",
              "Kaliya server hardware",
              "Kaliya CPU-ga",
              "Kaliya network cables"
            ],
            answer: 0,
            explain: "Dhammaan meelaha xogta la geliyo ama la beddeli karo waa attack surface."
          },
          {
            q: "GET method waxaa loo isticmaalaa?",
            options: [
              "Soo qaadista xog server-ka",
              "Tirtirka xog",
              "Cusbooneysiinta xog",
              "Kaliya login"
            ],
            answer: 0,
            explain: "GET wuxuu codsadaa resources server-ka, badanaa aan wax beddelin."
          }
        ],

        exercise: {
          title: "Attack Surface Mapping",
          steps: [
            "Xulo web app tusaale ah (fictional).",
            "Liis garee 6 attack surface elements (login form, search bar, iwm).",
            "Element kasta u qor waxa uu qaadan karo input xasaasi ah.",
            "Sharax sida validation loo hubin lahaa server-side."
          ],
          deliverable: "Web app attack surface map."
        }
      },


      {
        slug: "sql-injection-deep-dive",
        title: "SQL Injection Deep Dive",
        english: "SQL Injection Deep Dive",
        minutes: 10,

        summary:
          "Faham qoto dheer sida SQL injection u shaqeeyo, noocyada kala duwan, iyo sida loo ilaaliyo.",

        sections: [
          {
            h: "Waa Maxay SQL Injection?",
            p:
            "SQL Injection (SQLi) waa marka attacker uu ku geliyo SQL commands input field oo application-ku aan si sax ah u sanitize gareyn. Tusaale: ' OR '1'='1 waxay bypass gareyn kartaa login form iyada oo aan password sax ah la haysan."
          },
          {
            h: "In-Band SQLi (Union-Based & Error-Based)",
            p:
            "Union-based SQLi wuxuu isticmaalaa UNION SELECT si uu results-ka database kale ugu daro output-ka page-ka. Error-based SQLi wuxuu ka faa'iidaystaa error messages database-ku soo saaro si macluumaad loo helo."
          },
          {
            h: "Blind SQLi (Boolean & Time-Based)",
            p:
            "Blind SQLi waxaa loo isticmaalaa marka application-ku uusan tusin results-ka toos ah. Boolean-based wuxuu eegaa isbeddel page-ka (true/false response). Time-based wuxuu isticmaalaa SLEEP() si loo ogaado haddii condition-ku run yahay (waqtiga response-ku sii dheeraaday)."
          },
          {
            h: "Prevention: Parameterized Queries",
            p:
            "Xalka ugu wanaagsan ee SQLi waa parameterized queries (prepared statements) — halkii la isku dari lahaa user input query-ga si toos ah, database driver-ku wuxuu u kala saaraa code-ka iyo xogta. Input sanitization iyo least privilege database accounts waa layers dheeraad ah."
          }
        ],

        terms: [
          { term: "SQL Injection", def: "Weerar lagu geliyo SQL commands input field oo aan sanitize lahayn." },
          { term: "Blind SQLi", def: "SQLi aan application-ku tusin results toos ah — la isticmaalo boolean/time-based." },
          { term: "Parameterized Query", def: "Habka ugu wanaagsan ee looga hortago SQLi." }
        ],

        quiz: [
          {
            q: "' OR '1'='1 waa tusaale ah oo?",
            options: [
              "SQL injection payload oo bypass gareyn kara login",
              "Password sax ah",
              "Username caadi ah",
              "URL parameter caadi ah"
            ],
            answer: 0,
            explain: "'1'='1' had iyo jeer waa true, taasoo bypass gareysa authentication logic-ga."
          },
          {
            q: "Time-based blind SQLi wuxuu isticmaalaa?",
            options: [
              "SLEEP() si loo ogaado condition-ka iyada oo lagu eegayo waqtiga response-ka",
              "Error messages toos ah",
              "UNION SELECT",
              "Kaliya GET requests"
            ],
            answer: 0,
            explain: "Marka waqtiga response-ku sii dheeraado, taasi waxay muujisaa condition-ku inuu run yahay."
          },
          {
            q: "Xalka ugu wanaagsan ee SQLi waa?",
            options: [
              "Parameterized queries (prepared statements)",
              "Ka saarista kaliya quotes",
              "Xiritaanka database-ka",
              "Ka saarista dhammaan input validation"
            ],
            answer: 0,
            explain: "Parameterized queries waxay kala saaraan code-ka iyo xogta si automatic ah."
          },
          {
            q: "Union-based SQLi wuxuu isticmaalaa?",
            options: [
              "UNION SELECT si uu results database kale ugu daro output-ka",
              "Kaliya boolean logic",
              "Kaliya time delays",
              "Kaliya error messages"
            ],
            answer: 0,
            explain: "UNION-ku wuxuu isku daraa natiijooyinka labo queries ah."
          },
          {
            q: "Sababta least privilege database accounts muhiim u yahay waa?",
            options: [
              "Yareeya saameynta haddii SQLi laga faa'iidaysto",
              "Kordhiya speed-ka database-ka",
              "Ka saaraan baahida validation",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Account leh awood xaddidan wuxuu yareeyaa waxa attacker-ku sameyn karo."
          }
        ],

        exercise: {
          title: "SQL Injection Analysis (DVWA)",
          steps: [
            "Isticmaal DVWA lab-kaaga (authorized, environment-kaaga gaarka ah).",
            "Tijaabi payload asaasi ah oo login form ah.",
            "Sharax sida union-based SQLi u shaqayn lahayd tusaale kale.",
            "Qor recommendation-yo lagu ilaaliyo application-ka."
          ],
          deliverable: "SQL injection lab report."
        }
      },


      {
        slug: "cross-site-scripting-xss",
        title: "Cross-Site Scripting (XSS)",
        english: "Cross-Site Scripting (XSS)",
        minutes: 13,

        summary:
          "Faham noocyada XSS — Reflected, Stored, DOM-based — iyo sida loo ilaaliyo.",

        sections: [
          {
            h: "Waa Maxay XSS?",
            p:
            "Cross-Site Scripting (XSS) waa marka attacker uu ku geliyo JavaScript khaldan web page oo user kale ku fuliyo browser-kiisa. Tusaale asaasi ah: <script>alert('XSS')</script>."
          },
          {
            h: "Reflected XSS",
            p:
            "Reflected XSS wuxuu ka dhacaa marka payload-ku ku jiro request-ka (tusaale URL parameter), server-kuna uu ku celiyo response-ka iyada oo aan la sanitize gareyn. Attacker-ku wuxuu u baahan yahay victim inuu gujiyo link khaldan."
          },
          {
            h: "Stored XSS",
            p:
            "Stored XSS waa mid ka halis badan — payload-ka waxaa lagu kaydiyaa database-ka (tusaale comment section), waxaana loo fuliyaa qof kasta oo booqda page-kaas, iyada oo aan link gaar ah loo baahnayn."
          },
          {
            h: "DOM-Based XSS iyo Cookie Theft",
            p:
            "DOM-based XSS wuxuu ka dhacaa client-side JavaScript oo aan si sax ah u handle-gareyn user input. XSS badanaa waxaa loo isticmaalaa in la xado session cookies (document.cookie), taasoo u ogolaanaysa attacker inuu account-ka victim-ka ka gudbo."
          },
          {
            h: "Prevention: Output Encoding & CSP",
            p:
            "Output encoding (beddelidda <, > iyo characters kale HTML entities) waxay ka hortagaan browser-ka inuu u fasiro user input sida code ah. Content Security Policy (CSP) waa header xaddidaya meesha scripts-ku ka soo shaqayn karaan."
          }
        ],

        terms: [
          { term: "Reflected XSS", def: "XSS ku jira request-ka, u baahan victim inuu gujiyo link khaldan." },
          { term: "Stored XSS", def: "XSS lagu kaydiyay database-ka, loo fuliyo qof kasta booqda." },
          { term: "CSP", def: "Content Security Policy — header xaddidaya meesha scripts ka shaqeeyaan." }
        ],

        quiz: [
          {
            q: "Stored XSS ka halis badan tahay Reflected XSS sababtoo ah?",
            options: [
              "Waxaa loo fuliyaa qof kasta booqda page-ka, aan link gaar ah loo baahnayn",
              "Waa mid ka fudud in la hirgeliyo",
              "Waa mid keliya database-ka saameeya",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Stored XSS wuxuu saameeyaa users badan iyada oo aan interaction gaar ah loo baahnayn."
          },
          {
            q: "document.cookie badanaa waxaa loo isticmaalaa XSS attacks-ka si loo?",
            options: [
              "Xado session cookies si loo gudbo account-ka",
              "Beddelo IP address",
              "Tirtiro database-ka",
              "Kordhiyo CPU speed"
            ],
            answer: 0,
            explain: "Session hijacking waa nooc caan ah oo XSS impact ah."
          },
          {
            q: "CSP header-ku wuxuu xaddidaa?",
            options: [
              "Meesha scripts-ku ka soo shaqayn karaan",
              "Speed-ka website-ka",
              "Tirada users-ka",
              "Storage-ka server-ka"
            ],
            answer: 0,
            explain: "CSP wuxuu ka hortagaa scripts unauthorized ah inay shaqeeyaan."
          },
          {
            q: "DOM-based XSS wuxuu ka dhacaa?",
            options: [
              "Client-side JavaScript oo aan si sax ah u handle-gareyn user input",
              "Server-side database queries",
              "Network layer",
              "DNS resolution"
            ],
            answer: 0,
            explain: "DOM-based XSS-ku wuxuu ku dhacaa browser-ka, ma marin server-ka."
          },
          {
            q: "Output encoding waxay ka hortagtaa?",
            options: [
              "Browser-ka inuu u fasiro user input sida code ah",
              "Database-ka inuu shaqeeyo",
              "Network-ka inuu xiriiro",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Encoding wuxuu beddelaa characters khaldan HTML entities ah."
          }
        ],

        exercise: {
          title: "XSS Testing Practice (DVWA)",
          steps: [
            "Isticmaal DVWA lab-kaaga, tijaabi reflected XSS payload asaasi ah.",
            "Sharax farqiga u dhexeeya stored iyo reflected XSS scenario-gan.",
            "Sharax sida attacker-ku u xadi lahaa session cookie (concept ahaan).",
            "Qor recommendation-yo (output encoding, CSP) lagu ilaaliyo."
          ],
          deliverable: "XSS testing lab report."
        }
      },


      {
        slug: "authentication-session-attacks",
        title: "Authentication & Session Attacks",
        english: "Authentication and Session Attacks",
        minutes: 10,

        summary:
          "Faham weerarrada authentication iyo session management — brute force, credential stuffing, session hijacking.",

        sections: [
          {
            h: "Brute Force & Credential Stuffing",
            p:
            "Brute force wuxuu isku dayaa passwords badan account hal ah. Credential stuffing wuxuu isticmaalaa username/password combos laga xaday breaches hore, isaga oo ku tijaabinaya sites kale (isticmaalka user-ku password isku mid ah meelo badan)."
          },
          {
            h: "Weak Password Policies",
            p:
            "Applications aan qeexin password complexity requirements, aan lahayn account lockout ka dib isku dayo badan oo guuldarraystay, ama aan bixin MFA waxay noqdaan targets fudud brute force ah."
          },
          {
            h: "Session Management Vulnerabilities",
            p:
            "Session IDs oo la saadaali karo (predictable), session fixation (attacker-ku wuxuu qeexayaa session ID victim-ka ka hor login), iyo session tokens oo aan expire-gareynayn waqti macquul ah waa vulnerabilities caan ah."
          },
          {
            h: "Multi-Factor Authentication Bypass",
            p:
            "Xitaa MFA waxaa jira habab loo bypass gareyn karo: MFA fatigue (push notifications badan ilaa user-ku uu Approve gujiyo), SIM swapping (SMS-based MFA), ama session token theft (marka MFA la maro hal mar)."
          }
        ],

        terms: [
          { term: "Credential Stuffing", def: "Isticmaalka credentials laga xaday breaches sites kale." },
          { term: "Session Fixation", def: "Attacker qeexaya session ID victim-ka ka hor login." },
          { term: "MFA Fatigue", def: "Weerar push notifications badan si loo dhaliyo approval khaldan." }
        ],

        quiz: [
          {
            q: "Credential stuffing waxay ka faa'iidaysataa?",
            options: [
              "Isticmaalka user-ku password isku mid ah meelo badan",
              "Kaliya SQL injection",
              "Kaliya XSS",
              "Kaliya DNS spoofing"
            ],
            answer: 0,
            explain: "Attackers waxay ku tijaabiyaan credentials la xaday sites kale."
          },
          {
            q: "Session fixation waa?",
            options: [
              "Attacker qeexaya session ID victim-ka ka hor login",
              "Xadidda dhammaan sessions",
              "Beddelidda password-ka",
              "Kordhinta session timeout"
            ],
            answer: 0,
            explain: "Attacker-ku wuxuu ku qasbaa victim-ka inuu isticmaalo session ID uu horay u yaqaan."
          },
          {
            q: "MFA fatigue attack-ku wuxuu isticmaalaa?",
            options: [
              "Push notifications badan ilaa user-ku Approve gujiyo",
              "Kaliya brute force password",
              "Kaliya XSS",
              "Kaliya SQL injection"
            ],
            answer: 0,
            explain: "Cadaadis joogto ah wuxuu dhalin karaa in user-ku uu gujiyo approve iyada oo uusan doonayn."
          },
          {
            q: "Account lockout ka dib isku dayo guuldarraystay wuxuu ka hortagaa?",
            options: [
              "Brute force attacks",
              "SQL injection",
              "XSS",
              "DNS spoofing"
            ],
            answer: 0,
            explain: "Lockout-ku wuxuu ka dhigaa brute force mid aan waxtar lahayn."
          }
        ],

        exercise: {
          title: "Authentication Security Review",
          steps: [
            "Xulo application tusaale ah (fictional).",
            "Qor password policy soo jeedin ah (complexity, lockout, MFA).",
            "Sharax sida session tokens loo hubin lahaa in ay unpredictable yihiin.",
            "Sharax 2 habab MFA loo bypass gareyn karo iyo sida looga hortago."
          ],
          deliverable: "Authentication security review."
        }
      },


      {
        slug: "file-upload-command-injection",
        title: "File Upload & Command Injection",
        english: "File Upload and Command Injection",
        minutes: 14,

        summary:
          "Faham sida unrestricted file upload iyo OS command injection u shaqeeyaan web apps gudahood.",

        sections: [
          {
            h: "Unrestricted File Upload",
            p:
            "Marka web app-ku aanu si sax ah u xaqiijin nooca file-ka la upload gareynayo (extension, content-type, magic bytes), attacker-ku wuxuu upload gareyn karaa web shell (.php, .aspx) si uu u helo remote code execution."
          },
          {
            h: "Bypass Techniques",
            p:
            "Double extensions (shell.php.jpg), content-type spoofing, iyo null byte injection (shell.php%00.jpg — filesystems hore) waa habab caan ah oo lagu dhaafo validation daciifka ah."
          },
          {
            h: "OS Command Injection",
            p:
            "Command injection wuxuu ka dhacaa marka web app-ku isticmaalo user input command system-ka (tusaale ping tool). Payload: ; cat /etc/passwd ama && whoami wuxuu ku daraa commands dheeraad ah amarka asalka ah."
          },
          {
            h: "Prevention",
            p:
            "File uploads: whitelist extensions, hubi magic bytes, kaydi files server-ka ka baxsan web root. Command injection: iska ilaali system calls user input toos ah, isticmaal parameterized APIs halkii shell commands."
          }
        ],

        terms: [
          { term: "Web Shell", def: "File script ah oo attacker u ogolaada remote code execution." },
          { term: "Command Injection", def: "Ku darista commands dheeraad ah amarka system-ka asalka ah." }
        ],

        quiz: [
          {
            q: "Double extension bypass (shell.php.jpg) waxay isku daydaa?",
            options: [
              "Ka gudubka validation daciifka ah ee extension-ka",
              "Kordhinta file size",
              "Ma jiro isticmaal",
              "Encrypt gareynta file-ka"
            ],
            answer: 0,
            explain: "Validation-yada daciifka ah waxay eegaan extension-ka ugu dambeeya oo keliya, mararka qaarkood khaldan."
          },
          {
            q: "'; cat /etc/passwd' payload-ku waa tusaale?",
            options: [
              "Command Injection",
              "SQL Injection",
              "XSS",
              "CSRF"
            ],
            answer: 0,
            explain: "Ku darista commands additional ah system-ka waa command injection."
          },
          {
            q: "Xalka file upload security-ga waa?",
            options: [
              "Whitelist extensions, hubi magic bytes, kaydi ka baxsan web root",
              "Kaliya blacklist extensions khaldan",
              "Ma jiro xal",
              "Kaliya kordhinta file size limit"
            ],
            answer: 0,
            explain: "Whitelist approach-ku waa mid ka ammaan badan blacklist."
          }
        ],

        exercise: {
          title: "File Upload & Injection Analysis",
          steps: [
            "Sharax sida web shell loo upload gareyn lahaa validation daciif ah.",
            "Liis garee 3 bypass techniques.",
            "Sharax tusaale command injection payload ah.",
            "Naqshadee remediation checklist labadaba vulnerabilities."
          ],
          deliverable: "File upload and command injection analysis notes."
        }
      },

      {
        slug: "csrf-ssrf-idor",
        title: "CSRF, SSRF & IDOR",
        english: "CSRF, SSRF and IDOR",
        minutes: 12,

        summary:
          "Faham saddexda vulnerability caanka ah ee web apps — Cross-Site Request Forgery, Server-Side Request Forgery, iyo Insecure Direct Object Reference.",

        sections: [
          {
            h: "CSRF (Cross-Site Request Forgery)",
            p:
            "CSRF wuxuu ku qasbaa browser-ka victim-ka inuu diro request oo aan uu ogayn website login gareystay (tusaale: beddelidda email-ka account-ka). Wuxuu u shaqeeyaa sababtoo ah browser-ku si automatic ah ayuu ku daraa session cookies request kasta."
          },
          {
            h: "CSRF Prevention: Anti-CSRF Tokens",
            p:
            "Xalka ugu wanaagsan ee CSRF waa anti-CSRF tokens — token gaar ah oo unique ah oo form kasta lagu daro, server-kuna uu xaqiijiyo ka hor uu fuliyo action-ka. SameSite cookie attribute waa layer dheeraad ah."
          },
          {
            h: "SSRF (Server-Side Request Forgery)",
            p:
            "SSRF wuxuu ka dhacaa marka attacker-ku uu ku qasbo server-ka inuu diro request halkii uu isticmaali lahaa. Tusaale: image URL field oo la isticmaalo si loo gaaro internal services (http://169.254.169.254/ — cloud metadata endpoint) aan dibadda ka muuqan."
          },
          {
            h: "IDOR (Insecure Direct Object Reference)",
            p:
            "IDOR wuxuu ka dhacaa marka application-ku isku halleeyo user input (tusaale ID number URL-ka) iyada oo aan la hubin haddii user-ku xaq u leeyahay object-kaas. Tusaale: /invoice?id=1001 → beddel 1002 si aad u aragto invoice qof kale — haddii aan authorization la hubin, waa IDOR."
          }
        ],

        terms: [
          { term: "CSRF", def: "Weerar ku qasbaya browser-ka victim inuu diro request aan la ogeyn." },
          { term: "SSRF", def: "Weerar ku qasbaya server-ka inuu diro request halkii attacker-ku doonayo." },
          { term: "IDOR", def: "Marka application-ku aan hubin authorization ID/object user-ku weydiisto." }
        ],

        quiz: [
          {
            q: "CSRF wuxuu u shaqeeyaa sababtoo ah?",
            options: [
              "Browser-ku si automatic ah ayuu ku daraa session cookies request kasta",
              "User-ku wuxuu si toos ah u geliyaa password",
              "Server-ku ma leh authentication",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Browser behavior-ka cookies-ka ayaa CSRF u shaqaynaya."
          },
          {
            q: "SameSite cookie attribute wuxuu ka hortagaa?",
            options: [
              "CSRF, isaga oo xaddidaya marka cookies la diro cross-site",
              "SQL injection",
              "XSS",
              "DNS spoofing"
            ],
            answer: 0,
            explain: "SameSite wuxuu joojiyaa cookies inay dhex maraan cross-site requests."
          },
          {
            q: "SSRF tusaale caan ah waa?",
            options: [
              "Isticmaalka image URL field si loo gaaro cloud metadata endpoint",
              "Ku gelinta script HTML page ah",
              "Isku dayo password badan",
              "Diirinta email khiyaano ah"
            ],
            answer: 0,
            explain: "Cloud metadata endpoints waa targets caan ah oo SSRF ah."
          },
          {
            q: "/invoice?id=1001 → beddel 1002, haddii aad aragto invoice qof kale, waa nooc?",
            options: ["IDOR", "SQL injection", "XSS", "CSRF"],
            answer: 0,
            explain: "Waa IDOR marka authorization aan la hubin object-ka user-ku weydiisto."
          },
          {
            q: "Xalka ugu wanaagsan ee IDOR waa?",
            options: [
              "Hubinta authorization user kasta ka hor uu helo access object-ka",
              "Ka saarista authentication oo dhan",
              "Kaydinta IDs sida random string aan la saadaali karin oo keliya",
              "Ma jiro xal"
            ],
            answer: 0,
            explain: "Authorization checks (access control) waa xalka asaasiga ah — random IDs kaliya kuma filna."
          }
        ],

        exercise: {
          title: "CSRF/SSRF/IDOR Analysis",
          steps: [
            "Sharax sida CSRF attack-ku u shaqayn lahaa form beddelidda email ah.",
            "Naqshadee anti-CSRF token flow.",
            "Sharax tusaale SSRF ah oo la xiriira cloud metadata.",
            "Tijaabi IDOR concept ahaan (beddelidda URL parameter, sharax waxa aad u fiirsan lahayd)."
          ],
          deliverable: "CSRF/SSRF/IDOR vulnerability analysis."
        }
      },


      {
        slug: "web-app-security-capstone",
        title: "Web App Security — Capstone",
        english: "Web Application Security Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee full web app assessment oo authorized lab environment ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad haysataa authorization aad ku samayso web application penetration test DVWA-style app ah. Waa in aad baarto SQLi, XSS, authentication iyo access control vulnerabilities."
          },
          {
            h: "Testing Methodology",
            p:
            "Raac approach structured ah: 1) Map application (pages, forms, parameters). 2) Test input validation (SQLi, XSS). 3) Test authentication/session management. 4) Test access control (IDOR)."
          },
          {
            h: "Documentation",
            p:
            "Vulnerability kasta oo la helay, diyaari: description, steps to reproduce, impact (severity), iyo remediation recommendation."
          },
          {
            h: "Prioritization",
            p:
            "Isticmaal CVSS-style thinking si aad u kala hormariso vulnerabilities-ka (Critical/High/Medium/Low) iyadoo lagu saleynayo exploitability iyo impact."
          }
        ],

        terms: [
          { term: "Web App Assessment", def: "Baaritaan structured ah oo daboola input validation, auth, iyo access control." }
        ],

        quiz: [
          {
            q: "Testing methodology-gu wuxuu bilaabmaa?",
            options: [
              "Mapping application-ka (pages, forms, parameters)",
              "Isla markiiba exploitation",
              "Warbixinta ugu dambaysa",
              "Password cracking"
            ],
            answer: 0,
            explain: "Waa in la fahmo application-ka ka hor la baaro vulnerabilities."
          },
          {
            q: "Vulnerability report kasta waa in uu ku jiro?",
            options: [
              "Description, steps to reproduce, impact, remediation",
              "Kaliya magaca vulnerability-ga",
              "Kaliya CVSS score",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Warbixin dhamaystiran waxay taageertaa developers-ka inay hagaajiyaan."
          },
          {
            q: "Prioritization-ku wuxuu ku salaysan yahay?",
            options: [
              "Exploitability iyo impact",
              "Kaliya magaca vulnerability-ga",
              "Kaliya waqtiga la helay",
              "Ma jiro salax"
            ],
            answer: 0,
            explain: "Severity-gu wuxuu isku daraa sida fudud u ah in la isticmaalo iyo saameynta."
          }
        ],

        exercise: {
          title: "Full Web App Penetration Test",
          steps: [
            "Map DVWA lab-kaaga (pages, forms, parameters).",
            "Tijaabi SQLi, XSS iyo authentication vulnerabilities.",
            "Tijaabi access control (IDOR) haddii uu jiro.",
            "Diyaari full vulnerability report oo leh severity ratings iyo remediation (portfolio-ready)."
          ],
          deliverable: "Full web application penetration test report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "eh5",
    slug: "owasp-top-10",
    stage: "Sare",
    title: "OWASP Top 10",
    english: "OWASP Top 10",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa dhammaan 10-ka OWASP category ee 2021, sida loo baaro mid kasta, iyo methodology testing ah.",

    topics: [
      "OWASP A01-A03: Access Control, Crypto, Injection",
      "OWASP A04-A06: Design, Misconfig, Components",
      "OWASP A07-A10: Auth, Integrity, Logging, SSRF",
      "OWASP Testing Methodology",
      "OWASP Capstone Lab",
    ],

    lessonList: [

      {
        slug: "owasp-a01-a03",
        title: "OWASP A01-A03",
        english: "OWASP A01: Broken Access Control, A02: Cryptographic Failures, A03: Injection",
        minutes: 13,

        summary:
          "Faham saddexda category ugu horreysa ee OWASP Top 10 2021 — kuwa ugu badan ee la helo real-world apps.",

        sections: [
          {
            h: "A01: Broken Access Control",
            p:
            "Broken access control waa marka users ay sameyn karaan ficillo aan loo oggolayn (tusaale: standard user oo helaya admin functions, ama IDOR oo laga eegi karo xogta users kale). Waa category-ga ugu badan ee la helo OWASP 2021."
          },
          {
            h: "A02: Cryptographic Failures",
            p:
            "Cryptographic failures waxay ka mid yihiin: xog xasaasi ah oo aan encrypt-gareyn (passwords plain text ah), encryption algorithms duugoobay (MD5, SHA1 loo isticmaalo passwords), iyo TLS/SSL misconfigurations."
          },
          {
            h: "A03: Injection",
            p:
            "Injection waxaa ka mid ah SQL injection, Command Injection, LDAP Injection, iyo NoSQL Injection — dhammaantood waxay ka dhacaan marka user input aan si sax ah loo sanitize gareyn ka hor loo isticmaalo interpreter/query."
          },
          {
            h: "Command Injection Tusaale",
            p:
            "Haddii web app-ku isticmaalo user input command system-ka (tusaale: ping tool web-based ah), attacker-ku wuxuu ku dari karaa ; cat /etc/passwd si uu u fuliyo command dheeraad ah — waa nooc injection ah oo ka baxsan SQL."
          }
        ],

        terms: [
          { term: "Broken Access Control", def: "A01 — marka users ay sameyn karaan ficillo aan loo oggolayn." },
          { term: "Cryptographic Failures", def: "A02 — xog aan si sax ah loo encrypt-gareyn ama algorithms duugoobay." },
          { term: "Command Injection", def: "Injection nooc ah oo lagu fuliyo commands system-ka." }
        ],

        quiz: [
          {
            q: "A01: Broken Access Control waa category-ga?",
            options: [
              "Ugu badan ee la helo OWASP 2021",
              "Ugu yar ee la helo",
              "Aan la isticmaalin",
              "Kaliya theoretical ah"
            ],
            answer: 0,
            explain: "Access control issues waa kuwa ugu badan ee real-world apps ah."
          },
          {
            q: "MD5 loo isticmaalo password hashing waa tusaale ah oo?",
            options: [
              "Cryptographic Failure (A02)",
              "Injection (A03)",
              "Broken Access Control (A01)",
              "Ma jiro qalad"
            ],
            answer: 0,
            explain: "MD5 waa algorithm duugoobay oo aan ku habooneyn password hashing."
          },
          {
            q: "; cat /etc/passwd ku darista input field wuxuu tusinayaa?",
            options: [
              "Command Injection",
              "XSS",
              "CSRF",
              "SSRF"
            ],
            answer: 0,
            explain: "Ku darista commands additional ah system-ka waa command injection."
          },
          {
            q: "IDOR wuxuu ka mid yahay category-kee?",
            options: [
              "A01: Broken Access Control",
              "A02: Cryptographic Failures",
              "A03: Injection",
              "Ma jiro"
            ],
            answer: 0,
            explain: "IDOR waa nooc access control failure ah."
          }
        ],

        exercise: {
          title: "A01-A03 Vulnerability Identification",
          steps: [
            "Xulo application tusaale ah (fictional).",
            "Sharax tusaale kasta oo A01, A02, A03 ah oo laga yaabo inuu jiro.",
            "Naqshadee test cases 2 ah category kasta.",
            "Sharax remediation kasta."
          ],
          deliverable: "A01-A03 vulnerability checklist."
        }
      },


      {
        slug: "owasp-a04-a06",
        title: "OWASP A04-A06",
        english: "OWASP A04: Insecure Design, A05: Security Misconfiguration, A06: Vulnerable Components",
        minutes: 15,

        summary:
          "Faham category-yada la xiriira naqshadaynta, configuration-ka iyo dependencies-ka aan la update gareyn.",

        sections: [
          {
            h: "A04: Insecure Design",
            p:
            "Insecure design waa qalad ka dhaca marxaladda naqshadaynta, ma aha implementation-ka — tusaale: system aan lahayn rate limiting login attempts, ama business logic aan tixgelin abuse cases."
          },
          {
            h: "A05: Security Misconfiguration",
            p:
            "Misconfiguration waxaa ka mid ah: default credentials aan la beddelin, error messages faahfaahsan oo dadweynaha muuqda, directory listing furan, iyo unnecessary features/services oo shaqeeya."
          },
          {
            h: "A06: Vulnerable & Outdated Components",
            p:
            "Marka application-ku isticmaalo libraries/frameworks leh known vulnerabilities (tusaale version duugoobay oo Log4j ah), taasi waxay siisaa attacker path fudud. Software Composition Analysis (SCA) tools waxaa loo isticmaalo in la ogaado."
          },
          {
            h: "Threat Modeling as Prevention",
            p:
            "A04 waxaa looga hortagaa threat modeling marxaladda naqshadaynta — su'aasho 'sidee attacker-ku u isticmaali karaa feature-kan si khaldan?' ka hor development-ku inuu bilaabmo."
          }
        ],

        terms: [
          { term: "Insecure Design", def: "A04 — qalad ka dhaca marxaladda naqshadaynta." },
          { term: "Security Misconfiguration", def: "A05 — settings khaldan sida default credentials." },
          { term: "SCA", def: "Software Composition Analysis — tool ogaanaya vulnerable dependencies." }
        ],

        quiz: [
          {
            q: "Insecure Design (A04) waxay ka duwan tahay Security Misconfiguration (A05) sababtoo ah?",
            options: [
              "A04 waa qalad naqshadeyn ah, A05 waa qalad configuration ah",
              "Isku mid",
              "A04 waa configuration, A05 waa naqshadeyn",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "A04 waxay ka dhacdaa design phase-ka, A05 waxay ka dhacdaa deployment/config."
          },
          {
            q: "Default credentials aan la beddelin waa tusaale?",
            options: [
              "Security Misconfiguration (A05)",
              "Insecure Design (A04)",
              "Injection (A03)",
              "XSS"
            ],
            answer: 0,
            explain: "Default credentials waa misconfiguration caan ah."
          },
          {
            q: "SCA tools waxay ogaadaan?",
            options: [
              "Vulnerable dependencies/libraries la isticmaalo",
              "Passwords la xaday",
              "Network traffic shaki leh",
              "Email phishing"
            ],
            answer: 0,
            explain: "SCA waxay falanqeeyaan dependencies-ka software-ka."
          },
          {
            q: "Threat modeling waxaa loo isticmaalaa in laga hortago?",
            options: [
              "A04: Insecure Design",
              "A02: Cryptographic Failures oo keliya",
              "A03: Injection oo keliya",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "Threat modeling wuxuu ka hortagaa design flaws ka hor development-ku inuu bilaabmo."
          }
        ],

        exercise: {
          title: "A04-A06 Configuration Review",
          steps: [
            "Liis garee 5 common misconfigurations (A05).",
            "Sharax sida SCA tool loo isticmaali lahaa A06 la baaro.",
            "Naqshadee threat model gaaban oo feature login ah (A04 prevention).",
            "Qor recommendation-yo saddexda category."
          ],
          deliverable: "A04-A06 security review checklist."
        }
      },


      {
        slug: "owasp-a07-a10",
        title: "OWASP A07-A10",
        english: "OWASP A07: Auth Failures, A08: Integrity Failures, A09: Logging Failures, A10: SSRF",
        minutes: 11,

        summary:
          "Dhammaystir fahamkaaga OWASP Top 10 2021 iyadoo la eegayo afartan category ee ugu dambeeya.",

        sections: [
          {
            h: "A07: Identification & Authentication Failures",
            p:
            "Waxaa ka mid ah: weak password policies, session management khaldan, iyo credential stuffing la'aanta protection. Waa isku darka waxa hore loogu yaqaanay 'Broken Authentication'."
          },
          {
            h: "A08: Software & Data Integrity Failures",
            p:
            "Waxaa ka mid ah: CI/CD pipelines aan la xaqiijin, updates aan digital signature lahayn (attacker-ku wuxuu beddeli karaa update-ka), iyo insecure deserialization (xog serialized ah oo aan la xaqiijin ka hor la fuliyo)."
          },
          {
            h: "A09: Security Logging & Monitoring Failures",
            p:
            "Haddii application-ku uusan diiwaan gelin dhacdooyinka muhiimka ah (failed logins, access control failures), attacks-ku waxay dhici karaan iyada oo aan la ogaan — waa sababta A09 ay muhiim u tahay SOC/pentest labadaba."
          },
          {
            h: "A10: Server-Side Request Forgery (SSRF)",
            p:
            "SSRF (aad ka baratay module hore) waxaa lagu daray OWASP Top 10 2021 sababtoo ah cusub ahaanshaheeda cloud environments-ka, halka attacker-ku uu ka faa'iidaysto server-ka si uu u gaaro internal resources."
          }
        ],

        terms: [
          { term: "Insecure Deserialization", def: "Xog serialized ah oo aan la xaqiijin ka hor la fuliyo." },
          { term: "Logging & Monitoring Failure", def: "A09 — waxaa ka dhaca marka dhacdooyinka aan la diiwaan gelin." }
        ],

        quiz: [
          {
            q: "A07 waxay isku daraa waxa hore loo yaqaanay?",
            options: ["Broken Authentication", "Injection", "XSS", "CSRF"],
            answer: 0,
            explain: "A07 waxay ka kooban tahay identification iyo authentication failures."
          },
          {
            q: "Insecure deserialization waa nooca?",
            options: ["A08: Software & Data Integrity Failures", "A07", "A09", "A10"],
            answer: 0,
            explain: "Deserialization waa qayb ka mid ah data integrity concerns."
          },
          {
            q: "A09 sababta muhiim u yahay SOC labadaba waa?",
            options: [
              "Haddii aan la diiwaan gelin, attacks waxay dhici karaan iyada oo aan la ogaan",
              "Ma jiro saameyn",
              "Kaliya pentest ayaa khusaysa",
              "Kaliya developers ayaa khusaysa"
            ],
            answer: 0,
            explain: "Logging failures waxay saameeyaan detection capability-ga oo dhan."
          },
          {
            q: "SSRF waxaa lagu daray OWASP 2021 sababtoo ah?",
            options: [
              "Cusub ahaanshaheeda cloud environments-ka",
              "Waa mid duugoobay oo dib loo daray",
              "Ma jiro sabab gaar ah",
              "Waa nooc XSS ah"
            ],
            answer: 0,
            explain: "Cloud metadata endpoints waxay ka dhigeen SSRF khatar sii kordheysa."
          }
        ],

        exercise: {
          title: "A07-A10 Case Study",
          steps: [
            "Xulo hal breach dhab ah oo public ah oo la xiriira mid ka mid ah A07-A10.",
            "Sharax sida category-gan uu u saameeyay breach-ka.",
            "Qor 2 recommendation oo remediation ah.",
            "Isku dar dhammaan 10-ka OWASP category jaantus 1-bog ah."
          ],
          deliverable: "OWASP A07-A10 case study + full Top 10 summary sheet."
        }
      },


      {
        slug: "insecure-deserialization-deep-dive",
        title: "Insecure Deserialization Deep Dive",
        english: "Insecure Deserialization Deep Dive",
        minutes: 14,

        summary:
          "Sii qoto dheeree fahamkaaga insecure deserialization — nooc vulnerability ah oo A08 ka mid ah.",

        sections: [
          {
            h: "Serialization vs Deserialization",
            p:
            "Serialization waa beddelidda object (memory) qaab la kaydin karo/la diri karo (bytes, JSON, XML). Deserialization waa habka lidka ah — soo celinta object-ka. Marka user input aan la xaqiijin la deserialize gareeyo, waa khatar."
          },
          {
            h: "Exploitation Impact",
            p:
            "Insecure deserialization waxay u oggolaan kartaa remote code execution, sababtoo ah object-ka la soo celinayo wuxuu yeelan karaa magic methods (tusaale __wakeup() PHP, readObject() Java) oo si otomaatig ah u fuliya code marka la deserialize gareeyo."
          },
          {
            h: "Common Vulnerable Patterns",
            p:
            "PHP unserialize() oo user input toos ah la siiyo, Java ObjectInputStream oo data untrusted la akhriyo, iyo Python pickle.loads() waa dhammaantood patterns caan ah oo deserialization vulnerable ah."
          },
          {
            h: "Prevention",
            p:
            "Ka fogow deserializing untrusted data gebi ahaanba haddii macquul ah — isticmaal data formats fudud sida JSON (aan lahayn magic methods), ama isticmaal signing/integrity checks (HMAC) ka hor deserialization."
          }
        ],

        terms: [
          { term: "Deserialization", def: "Soo celinta object bytes/format kaydsan ka." },
          { term: "Magic Method", def: "Function si otomaatig ah u fuliya deserialization ahaan." }
        ],

        quiz: [
          {
            q: "Insecure deserialization waxay u oggolaan kartaa?",
            options: [
              "Remote code execution iyada oo la isticmaalayo magic methods",
              "Kaliya data corruption",
              "Ma jiro khatar",
              "Kaliya performance issues"
            ],
            answer: 0,
            explain: "Magic methods-ku waxay si otomaatig ah u fuliyaan code deserialization ka dib."
          },
          {
            q: "PHP unserialize() user input toos ah waa?",
            options: [
              "Pattern caan ah oo vulnerable ah",
              "Best practice",
              "Ma jiro khatar",
              "Waajib PHP apps oo dhan"
            ],
            answer: 0,
            explain: "Input aan xaqiijin lahayn waa in aan la deserialize gareyn."
          },
          {
            q: "Xalka ugu wanaagsan waa?",
            options: [
              "Ka fogow deserializing untrusted data, isticmaal JSON + signing",
              "Kaliya encrypt gareynta data",
              "Ma jiro xal",
              "Kaliya kordhinta logging"
            ],
            answer: 0,
            explain: "JSON fudud (aan lahayn magic methods) waa mid ka ammaan badan."
          }
        ],

        exercise: {
          title: "Deserialization Vulnerability Review",
          steps: [
            "Sharax farqiga serialization iyo deserialization.",
            "Sharax sida magic methods loo exploit-gareeyn karo.",
            "Liis garee 3 patterns vulnerable ah (PHP, Java, Python).",
            "Sharax xalka ugu wanaagsan ee prevention."
          ],
          deliverable: "Insecure deserialization review notes."
        }
      },

      {
        slug: "api-security-owasp-api-top-10",
        title: "API Security & OWASP API Top 10",
        english: "API Security and OWASP API Top 10",
        minutes: 15,

        summary:
          "Faham OWASP API Security Top 10 — vulnerabilities gaarka ah ee APIs (REST/GraphQL) leeyihiin.",

        sections: [
          {
            h: "Sababta APIs Ay Leeyihiin Category Gooni Ah",
            p:
            "OWASP wuxuu sameeyay list gooni ah API Security Top 10 sababtoo ah APIs waxay leeyihiin patterns weerar gaar ah oo ka duwan web apps caadiga ah — modern apps badankood waxay ku shaqeeyaan APIs (mobile backends, microservices)."
          },
          {
            h: "Broken Object Level Authorization (BOLA)",
            p:
            "BOLA (API1) waa IDOR-ka APIs — marka user-ku beddelo ID-ga object-ka request-ka (tusaale /api/users/123 → /api/users/124) oo API-du aanu hubin authorization, waa mid ka mid ah vulnerabilities-ka ugu badan APIs."
          },
          {
            h: "Excessive Data Exposure & Mass Assignment",
            p:
            "Excessive Data Exposure (API3) waxay dhacdaa marka API-gu soo celiyo fields aan loo baahnayn client-side ahaan (relying on frontend inuu filter gareeyo). Mass Assignment (API6) waxay u oggolaataa user inuu beddelo fields aan loo oggolayn (tusaale isAdmin=true request body-ga)."
          },
          {
            h: "Rate Limiting & Resource Consumption",
            p:
            "Lack of Resources & Rate Limiting (API4) waxay u ogolaataan attacker inuu ku dhufto API-ga requests aan xaddidnayn — DoS suurtagal ah, ama brute force authentication endpoints."
          }
        ],

        terms: [
          { term: "BOLA", def: "Broken Object Level Authorization — IDOR-ka APIs." },
          { term: "Mass Assignment", def: "U oggolaanshaha user inuu beddelo fields aan loo oggolayn." }
        ],

        quiz: [
          {
            q: "BOLA (API1) waa nooca?",
            options: [
              "IDOR-ka APIs — beddelidda object ID aan authorization la hubin",
              "SQL injection API ah",
              "XSS API ah",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "BOLA waa vulnerability-ka ugu badan APIs Top 10 gudaheeda."
          },
          {
            q: "Mass Assignment (API6) waxay u oggolaataa?",
            options: [
              "User inuu beddelo fields aan loo oggolayn (tusaale isAdmin)",
              "Kaliya read access",
              "Ma jiro khatar",
              "Kaliya loo isticmaalo testing"
            ],
            answer: 0,
            explain: "Fields aan xaddidnayn request body-ga waa khatar privilege escalation ah."
          },
          {
            q: "Rate limiting la'aantiisu (API4) waxay u ogolaataa?",
            options: [
              "DoS ama brute force authentication endpoints",
              "Ma jiro khatar",
              "Kaliya performance issue",
              "Kaliya cost issue"
            ],
            answer: 0,
            explain: "Requests aan xaddidnayn waa khatar sare oo abuse ah."
          }
        ],

        exercise: {
          title: "API Security Review Practice",
          steps: [
            "Sharax sababta APIs ay leeyihiin OWASP list gooni ah.",
            "Qor tusaale BOLA vulnerability ah (URL parameter beddelan).",
            "Sharax farqiga excessive data exposure iyo mass assignment.",
            "Naqshadee rate limiting policy asaasi ah API endpoint ah."
          ],
          deliverable: "API security review reference sheet."
        }
      },

      {
        slug: "owasp-testing-methodology",
        title: "OWASP Testing Methodology",
        english: "OWASP Testing Guide Methodology",
        minutes: 14,

        summary:
          "Faham sida OWASP Testing Guide loo isticmaalo si loo naqshadeeyo assessment structured ah.",

        sections: [
          {
            h: "OWASP Testing Guide (OTG)",
            p:
            "OWASP Testing Guide waa dokumeenti bilaash ah oo bixiya methodology dhamaystiran oo lagu tijaabiyo web applications — waxay daboolaan information gathering, configuration testing, authentication testing, iyo business logic testing."
          },
          {
            h: "Information Gathering Phase",
            p:
            "Ka hor la bilaabo active testing, ururi macluumaad: technology stack (headers, error messages), application entry points, iyo sitemap. Tani waxay isku xirtaa xirfadaha recon-ka aad hore u baratay."
          },
          {
            h: "Configuration & Deployment Testing",
            p:
            "Baar: HTTP methods la oggol yahay (tusaale PUT/DELETE oo aan loo baahnayn), TLS/SSL configuration, HTTP security headers (CSP, X-Frame-Options), iyo file extensions oo muujin kara technology stack."
          },
          {
            h: "Business Logic Testing",
            p:
            "Business logic testing waa mid ka duwan technical vulnerabilities — waxay eegtaa haddii process-ka application-ku uu leeyahay khaladaad logic ah (tusaale: la bypass gareyn karo tallaabo payment ah, ama price manipulation)."
          }
        ],

        terms: [
          { term: "OWASP Testing Guide", def: "Dokumeenti bilaash ah oo methodology web app testing ah bixiya." },
          { term: "Business Logic Testing", def: "Baaritaanka khaladaadka process-ka application-ku, ma aha technical bugs oo keliya." }
        ],

        quiz: [
          {
            q: "OWASP Testing Guide wuxuu bixiyaa?",
            options: [
              "Methodology dhamaystiran oo lagu tijaabiyo web applications",
              "Tool automated ah oo scan gareeya",
              "Malware samples",
              "Kaliya checklist gaaban"
            ],
            answer: 0,
            explain: "OTG waa framework structured ah, ma aha tool automated ah oo keliya."
          },
          {
            q: "Business logic testing wuxuu ka duwan yahay technical vulnerability testing sababtoo ah?",
            options: [
              "Wuxuu eegaa khaladaadka process-ka, ma aha bugs technical ah",
              "Isku mid",
              "Business logic ma jirto",
              "Waa mid keliya la iska daayo"
            ],
            answer: 0,
            explain: "Business logic flaws waa kuwo la xiriira habka application-ku u shaqeeyo, ma aha code bugs caadi ah."
          },
          {
            q: "Configuration testing wuxuu baaraa?",
            options: [
              "HTTP methods, TLS config, security headers",
              "Kaliya passwords",
              "Kaliya IP addresses",
              "Kaliya database schemas"
            ],
            answer: 0,
            explain: "Configuration testing wuxuu diiradda saaraa deployment settings."
          },
          {
            q: "Information gathering phase-ku wuxuu isku xiraa?",
            options: [
              "Xirfadaha recon-ka aad hore u baratay",
              "Kaliya password cracking",
              "Kaliya social engineering",
              "Ma jiro xiriir"
            ],
            answer: 0,
            explain: "Recon-ku waa saldhig u ah web app testing methodology-ga."
          }
        ],

        exercise: {
          title: "OWASP Testing Guide Application",
          steps: [
            "Xulo web app tusaale ah (fictional).",
            "Naqshadee checklist information gathering ah.",
            "Naqshadee 3 configuration tests.",
            "Naqshadee 2 business logic test cases."
          ],
          deliverable: "OWASP methodology application checklist."
        }
      },


      {
        slug: "owasp-capstone-lab",
        title: "OWASP — Full Capstone Lab",
        english: "OWASP Top 10 Capstone Lab",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee full OWASP-based assessment oo dhamaystiran.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad haysataa authorization aad ku samayso assessment structured ah oo daboolaya dhammaan 10-ka OWASP category, isticmaalka DVWA ama vulnerable app kale oo lab-kaaga ku jira."
          },
          {
            h: "Systematic Testing",
            p:
            "Category kasta, samee vaaris koobsan iyadoo la isticmaalo OWASP Testing Guide methodology. Diiwaan geli natiijooyinka mid kasta — jira ama ma jiro."
          },
          {
            h: "Risk Rating",
            p:
            "Vulnerability kasta oo la helay, siin severity rating (Critical/High/Medium/Low) iyadoo lagu saleynayo exploitability iyo business impact."
          },
          {
            h: "Final Report",
            p:
            "Isku dar dhammaan findings-ka warbixin buuxda oo leh executive summary, findings kala saaran severity, iyo remediation roadmap."
          }
        ],

        terms: [
          { term: "OWASP-Based Assessment", def: "Assessment structured ah oo daboola dhammaan 10-ka category." }
        ],

        quiz: [
          {
            q: "OWASP-based assessment waa in ay daboosho?",
            options: [
              "Dhammaan 10-ka category iyadoo systematic ah",
              "Kaliya SQLi",
              "Kaliya XSS",
              "Kaliya authentication"
            ],
            answer: 0,
            explain: "Assessment dhamaystiran waa in ay daboosho oo dhan si aan wax loo dhaafin."
          },
          {
            q: "Risk rating-ku wuxuu ku salaysan yahay?",
            options: [
              "Exploitability iyo business impact",
              "Kaliya magaca vulnerability-ga",
              "Kaliya waqtiga la helay",
              "Ma jiro salax"
            ],
            answer: 0,
            explain: "Prioritization-ku wuxuu isku daraa fudaydka exploitation-ka iyo saameynta."
          },
          {
            q: "Final report-ku waa in uu ku jiro?",
            options: [
              "Executive summary, findings, remediation roadmap",
              "Kaliya raw scan output",
              "Kaliya magacyada categories",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Warbixin professional ah waxay u baahan tahay qaybo dhamaystiran."
          }
        ],

        exercise: {
          title: "Full OWASP Top 10 Assessment",
          steps: [
            "Baar DVWA lab-kaaga dhammaan 10-ka OWASP category (systematic ahaan).",
            "Diiwaan geli natiijada category kasta (jira/ma jiro, severity).",
            "Sameey risk rating dhammaan findings-ka la helay.",
            "Diyaari full assessment report oo leh executive summary iyo remediation roadmap (portfolio-ready)."
          ],
          deliverable: "Full OWASP Top 10 assessment report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "eh6",
    slug: "burp-suite",
    stage: "Sare",
    title: "Burp Suite",
    english: "Burp Suite",
    hours: 1,

    outcome:
      "Waxaad si adag u fahmi doontaa Burp Suite Proxy, Repeater, Intruder iyo extensions — tool-ka aasaasiga ah ee web app pentesting.",

    topics: [
      "Burp Suite Fundamentals & Setup",
      "Proxy & Intercepting Requests",
      "Repeater & Intruder Attacks",
      "Burp Extensions & Automation",
      "Burp Suite Capstone Lab",
    ],

    lessonList: [

      {
        slug: "burp-suite-fundamentals-setup",
        title: "Burp Suite Fundamentals & Setup",
        english: "Burp Suite Fundamentals and Setup",
        minutes: 12,

        summary:
          "Baro sida Burp Suite loo rakibo, browser-ka loo proxy-gareeyo, iyo certificate-ka loo isticmaalo HTTPS traffic.",

        sections: [
          {
            h: "Waa Maxay Burp Suite?",
            p:
            "Burp Suite waa platform pentesting web apps ah oo ka kooban qaybo badan: Proxy (intercept traffic), Repeater (dib u dir requests), Intruder (automated attacks), Scanner (automated vulnerability detection — Pro version). Community edition waa bilaash."
          },
          {
            h: "Browser Proxy Configuration",
            p:
            "Si Burp loo isticmaalo, waxaad u baahan tahay inaad browser-kaaga u dejiso inuu isticmaalo Burp sida proxy (badanaa 127.0.0.1:8080). Marka la dejiyo, dhammaan traffic-ka browser-ku wuxuu marayaa Burp ka hor uu gaaro internet-ka."
          },
          {
            h: "Installing the Burp Certificate",
            p:
            "Si Burp loo arko HTTPS traffic (encrypted), waa in la soo dejiyo oo la rakibo Burp's CA certificate browser-ka. Tani waxay u ogolaataa Burp inuu 'dhex galo' xiriirka (man-in-the-middle, ha loo isticmaalin authorized testing gudaha)."
          },
          {
            h: "Community vs Professional Edition",
            p:
            "Community edition wuxuu bixiyaa Proxy, Repeater, Intruder (xawli xaddidan), iyo Decoder/Comparer. Professional edition wuxuu ku daraa Scanner (automated), Intruder xawli sare leh, iyo extensions BApp Store-ka."
          }
        ],

        terms: [
          { term: "Burp Proxy", def: "Qaybta Burp ee intercept-gareysa traffic-ka browser-server dhexdiisa." },
          { term: "Burp CA Certificate", def: "Certificate loo baahan yahay si Burp loo arko HTTPS traffic." }
        ],

        quiz: [
          {
            q: "Burp Proxy-ga default port-kiisu waa?",
            options: ["8080", "80", "443", "22"],
            answer: 0,
            explain: "127.0.0.1:8080 waa default proxy listener-ka Burp."
          },
          {
            q: "Sababta Burp CA certificate loo rakibo waa?",
            options: [
              "Si Burp loo arko HTTPS traffic encrypted ah",
              "Si loo kordhiyo speed-ka",
              "Si loo xakameeyo firewall",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Aan certificate-ka la rakibin, Burp ma fahmi karo traffic-ka encrypted."
          },
          {
            q: "Community edition-ka Burp wuxuu bixiyaa?",
            options: [
              "Proxy, Repeater, Intruder (xawli xaddidan)",
              "Kaliya Proxy",
              "Automated Scanner buuxa",
              "Ma jiro qaybo bilaash ah"
            ],
            answer: 0,
            explain: "Community waa bilaash laakiin Scanner-ka automated-ka Pro-ga oo keliya ku jira."
          },
          {
            q: "Marka browser-ka loo proxy-gareeyo Burp, traffic-ku wuxuu?",
            options: [
              "Marayaa Burp ka hor uu gaaro internet-ka",
              "Si toos ah ayuu ugu gudbayaa internet-ka",
              "Waligeed ma gaadhi karo",
              "Waa in la damiyaa browser-ka"
            ],
            answer: 0,
            explain: "Proxy configuration-ku wuxuu dhex mariyaa traffic-ka Burp."
          }
        ],

        exercise: {
          title: "Burp Suite Setup",
          steps: [
            "Soo deji oo rakib Burp Suite Community Edition.",
            "Dejinta browser-kaaga (Firefox recommended) inuu isticmaalo 127.0.0.1:8080.",
            "Soo deji oo rakib Burp CA certificate.",
            "Xaqiiji setup-kaaga adigoo eegaya HTTP History Burp gudihiisa marka aad browse gareyso website tusaale ah."
          ],
          deliverable: "Screenshot Burp setup-kaaga oo shaqeynaya."
        }
      },


      {
        slug: "proxy-intercepting-requests",
        title: "Proxy & Intercepting Requests",
        english: "Proxy and Intercepting Requests",
        minutes: 10,

        summary:
          "Baro sida requests loo intercept-gareeyo, la beddelo, oo lala fuliyo Burp Proxy.",

        sections: [
          {
            h: "Intercept Tab",
            p:
            "Marka Intercept-ku 'On' yahay, Burp wuxuu joojiyaa request kasta oo aad dirto ka hor inuu gaaro server-ka — waxay kuu ogolaataa inaad eegto oo beddesho request-ka ka hor Forward-ka."
          },
          {
            h: "Modifying Requests On-the-Fly",
            p:
            "Tani waxay kaa caawin kartaa inaad beddesho parameters (tusaale price value, user ID), headers, ama cookies ka hor server-ku uu helo request-ka — habka aad ku tijaabin karto vulnerabilities sida IDOR ama price manipulation."
          },
          {
            h: "HTTP History",
            p:
            "HTTP History tab-ku wuxuu kaydiyaa dhammaan requests/responses aad la falgashay browsing session-kaaga — waxaad ku noqon kartaa inaad eegto request kasta, xitaa haddii aad Forward gareysay iyada oo aan la beddelin."
          },
          {
            h: "Site Map",
            p:
            "Target > Site Map wuxuu bixiyaa view structured ah oo dhammaan URLs/pages aad booqatay — muhiim marka aad naqshadeynayso attack surface iyo aad rabto inaad ka fikirto meelaha aan weli la baarin."
          }
        ],

        terms: [
          { term: "Intercept", def: "Habka Burp uu joojiyo request ka hor uu gaaro server-ka." },
          { term: "HTTP History", def: "Kaydinta dhammaan requests/responses session-ka." },
          { term: "Site Map", def: "View structured ah oo URLs/pages la booqday." }
        ],

        quiz: [
          {
            q: "Intercept-ku 'On' yahay macnaheedu waa?",
            options: [
              "Burp wuxuu joojiyaa request kasta ka hor uu gaaro server-ka",
              "Burp wuxuu si toos ah u gudbiyaa dhammaan requests",
              "Burp wuxuu damiyaa proxy-ga",
              "Ma jiro macno gaar ah"
            ],
            answer: 0,
            explain: "Intercept On wuxuu u ogolaadaa inaad eegto/beddesho ka hor Forward."
          },
          {
            q: "HTTP History waxay kaydisaa?",
            options: [
              "Dhammaan requests/responses session-ka",
              "Kaliya requests khaldan",
              "Kaliya passwords",
              "Kaliya cookies"
            ],
            answer: 0,
            explain: "Waxay bixisaa log dhamaystiran oo browsing session-ka aad ku sameysay."
          },
          {
            q: "Site Map wuxuu bixiyaa?",
            options: [
              "View structured ah oo URLs la booqday",
              "Kaliya password list",
              "Network topology",
              "Server hardware specs"
            ],
            answer: 0,
            explain: "Site Map wuxuu kaa caawiyaa attack surface mapping."
          },
          {
            q: "Beddelidda price value request-ka gudihiisa ka hor Forward waa tijaabin?",
            options: [
              "Price manipulation vulnerability",
              "SQL injection oo keliya",
              "DNS spoofing",
              "MFA bypass"
            ],
            answer: 0,
            explain: "Beddelidda values request-ka gudihiisa waa hab caan ah oo lagu tijaabiyo business logic flaws."
          }
        ],

        exercise: {
          title: "Intercepting & Modifying Requests",
          steps: [
            "Shid Intercept, browse gareyso DVWA lab-kaaga.",
            "Eeg request-yada la intercept-gareeyay, aqoonso parameters muhiim ah.",
            "Sharax (concept ahaan) sida aad u beddeli lahayd parameter ID ah si aad u tijaabiso IDOR.",
            "Eeg Site Map, sharax attack surface-ka aad ka aragto."
          ],
          deliverable: "Intercepted requests analysis notes."
        }
      },


      {
        slug: "repeater-intruder-attacks",
        title: "Repeater & Intruder Attacks",
        english: "Repeater and Intruder Attacks",
        minutes: 13,

        summary:
          "Baro sida Repeater loo isticmaalo manual testing, iyo Intruder loo isticmaalo automated attacks.",

        sections: [
          {
            h: "Repeater — Manual Testing",
            p:
            "Repeater wuxuu kuu ogolaadaa inaad ku dirto request isla mid oo beddelan marar badan, si aad u tijaabiso payloads kala duwan (tusaale SQLi payloads) iyada oo aan loo baahnayn inaad browser-ka mar walba isku dayo."
          },
          {
            h: "Intruder — Attack Types",
            p:
            "Sniper (hal position, wordlist mid ah), Battering ram (positions badan, isla payload mid ah), Pitchfork (positions badan, wordlists kala duwan isku mid), Cluster bomb (positions badan, dhammaan combinations)."
          },
          {
            h: "Intruder Use Cases",
            p:
            "Brute force login forms (Sniper, wordlist passwords), fuzzing parameters (Sniper, wordlist payloads XSS/SQLi ah), testing multiple accounts isla mar (Pitchfork, username+password lists labadaba)."
          },
          {
            h: "Payload Types & Encoding",
            p:
            "Intruder wuxuu taageeraa payload types kala duwan: Simple list, Numbers, Dates, iyo Custom. URL-encoding otomaatig ah wuxuu ka hortagaa in payloads-ku jabiyaan request format-ka."
          }
        ],

        terms: [
          { term: "Repeater", def: "Tool lagu diro request isla mid oo beddelan marar badan." },
          { term: "Intruder", def: "Tool automated ah oo lagu tijaabiyo payloads badan." },
          { term: "Sniper Attack", def: "Intruder attack type — hal position, wordlist mid ah." }
        ],

        quiz: [
          {
            q: "Repeater-ka faa'iidadiisu waa?",
            options: [
              "Dirista request isla mid oo beddelan marar badan si loo tijaabiyo payloads",
              "Automated brute forcing",
              "Sameynta reports",
              "Scanning network"
            ],
            answer: 0,
            explain: "Repeater-ku waa manual testing tool, ma aha automated."
          },
          {
            q: "Sniper attack type-ku wuxuu isticmaalaa?",
            options: [
              "Hal position, wordlist mid ah",
              "Positions badan, wordlists kala duwan",
              "Dhammaan combinations",
              "Ma jiro payloads"
            ],
            answer: 0,
            explain: "Sniper waa nooca ugu fudud — hal position keliya."
          },
          {
            q: "Pitchfork attack type-ku wuxuu ku habboon yahay?",
            options: [
              "Testing multiple accounts isla mar (username+password lists labadaba)",
              "Testing hal password oo keliya",
              "Sameynta backup",
              "Scanning ports"
            ],
            answer: 0,
            explain: "Pitchfork wuxuu isticmaalaa wordlists kala duwan isku mid ah positions kala duwan."
          },
          {
            q: "Sababta URL-encoding otomaatig ah loo isticmaalo Intruder waa?",
            options: [
              "Si loo hubiyo payloads-ku aanay jabin request format-ka",
              "Si loo xawligeliyo attack-ka",
              "Si loo qariyo attack-ka dhammaystiran",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Encoding-ku wuxuu ilaaliyaa syntax-ka HTTP request-ka."
          },
          {
            q: "Cluster bomb attack type-ku wuxuu sameeyaa?",
            options: [
              "Tijaabiyaa dhammaan combinations positions badan iyo wordlists badan",
              "Kaliya hal combination",
              "Kaliya password hal ah",
              "Ma jiro combinations"
            ],
            answer: 0,
            explain: "Cluster bomb-ku waa mid ka waaweyn testing-ahaan, wuxuu tijaabiyaa combinations oo dhan."
          }
        ],

        exercise: {
          title: "Repeater & Intruder Practice",
          steps: [
            "Isticmaal Repeater, dib u dir request oo beddel parameter (concept ahaan lab-kaaga).",
            "Sharax farqiga Sniper, Battering ram, Pitchfork iyo Cluster bomb.",
            "Naqshadee Intruder attack (concept ahaan) oo brute force gareynaya login form wordlist ah.",
            "Sharax sababta la doorbido nooc kasta scenario gaar ah."
          ],
          deliverable: "Repeater/Intruder practice notes."
        }
      },


      {
        slug: "burp-suite-scanner-automation",
        title: "Burp Suite Scanner & Automation",
        english: "Burp Suite Scanner and Automation",
        minutes: 13,

        summary:
          "Faham sida Burp Suite Scanner (Pro) loo isticmaalo vulnerability scanning automated ah.",

        sections: [
          {
            h: "Active vs Passive Scanning",
            p:
            "Passive scanning wuxuu falanqeeyaa traffic aad hore u sameysay browsing ahaan, aan payloads dheeraad ah la dirin. Active scanning wuxuu si toos ah u diraa payloads (SQLi, XSS test strings) endpoints la xushay si loo ogaado vulnerabilities."
          },
          {
            h: "Scan Configuration",
            p:
            "Scan configurations waxaa lagu customize gareyn karaa — kaliya SQLi checks, ama kaliya XSS checks — kani wuxuu dedejinayaa scanning-ka applications waaweyn, iyada oo aan la sugin dhammaan checks-yada oo dhan."
          },
          {
            h: "Reviewing Scanner Findings",
            p:
            "Scanner findings-ku waa in la manual verify gareeyo — automated scanners waxay soo saari karaan false positives, gaar ahaan business logic vulnerabilities aysan si buuxda u fahmi karin."
          },
          {
            h: "Scanning Ethics & Rate Limiting",
            p:
            "Active scanning wuxuu dhalin karaa traffic aad u badan production servers — waa muhiim in la xakameeyo scan speed/threads si aan production-ka loo saameyn, gaar ahaan authorized engagements-ka."
          }
        ],

        terms: [
          { term: "Active Scanning", def: "Dirista payloads si toos ah endpoints la xushay." },
          { term: "Scan Configuration", def: "Customization-ka checks-yada scanner-ku fulinayo." }
        ],

        quiz: [
          {
            q: "Active scanning ka duwan tahay passive sababtoo ah?",
            options: [
              "Wuxuu si toos ah u diraa payloads, ma aha falanqaynta traffic hore",
              "Isku mid",
              "Passive-ku waa mid ka xoog badan",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Active-ku wuxuu ka dhigayaa noise badan, laakiin wuxuu ogaan karaa vulnerabilities dheeraad ah."
          },
          {
            q: "Scan configuration customization-ku muhiim u yahay sababtoo ah?",
            options: [
              "Wuxuu dedejinayaa scanning applications waaweyn",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo reporting",
              "Wuxuu kordhinayaa waqtiga"
            ],
            answer: 0,
            explain: "Targeted checks-ku waa ka dhaqso badan yihiin dhammaan checks-yada."
          },
          {
            q: "Rate limiting active scanning ahaan muhiim u yahay?",
            options: [
              "Si aan production-ka loo saameyn",
              "Ma jiro sabab",
              "Kordhinta accuracy oo keliya",
              "Kaliya loo isticmaalo billing"
            ],
            answer: 0,
            explain: "Traffic aad u badan wuxuu khatar gelin karaa performance-ka production-ka."
          }
        ],

        exercise: {
          title: "Scanner Configuration Practice",
          steps: [
            "Sharax farqiga active iyo passive scanning.",
            "Naqshadee scan configuration ah oo SQLi checks oo keliya.",
            "Sharax sababta findings-ku loo verify gareeyo manual ahaan.",
            "Sharax sida rate limiting loogu isticmaali lahaa active scan."
          ],
          deliverable: "Burp Scanner configuration notes."
        }
      },

      {
        slug: "burp-suite-macros-session-handling",
        title: "Burp Suite Macros & Session Handling",
        english: "Burp Suite Macros and Session Handling",
        minutes: 14,

        summary:
          "Faham sida session handling rules iyo macros loo isticmaalo testing applications leh authentication complex ah.",

        sections: [
          {
            h: "Sababta Session Handling Loo Baahan Yahay",
            p:
            "Applications badan waxay isticmaalaan CSRF tokens ama session tokens oo isbeddela request kasta — automated testing (Intruder, Scanner) wuxuu jabin doonaa haddii session-ka aan si otomaatig ah loo maamulin."
          },
          {
            h: "Recording a Macro",
            p:
            "Macro waa sequence requests ah (tusaale login flow) oo Burp uu dib u fulin karo si toos ah — waxaa loo isticmaalaa in la helo CSRF token cusub ama in la re-authenticate gareeyo automatic ahaan intii testing socoto."
          },
          {
            h: "Session Handling Rules",
            p:
            "Project Options > Sessions wuxuu u oggolaadaa in la naqshadeeyo rules (tusaale: 'update cookie automatically', 'run macro haddii session dhacday') — kuwaan waxay xakameeyaan sida Burp ula dhaqmo session state-ka."
          },
          {
            h: "Applying to Intruder Attacks",
            p:
            "Marka macro la dhiso, waxaa loo isticmaali karaa Intruder si loo re-authenticate gareeyo haddii session dhaco intii attack dheer socoto — muhiim marka attack-ku qaadanayo waqti dheer oo session-ku dhici karo."
          }
        ],

        terms: [
          { term: "Macro (Burp)", def: "Sequence requests ah oo dib loo fulin karo automatic ahaan." },
          { term: "Session Handling Rule", def: "Rule xakamaysa sida Burp ula dhaqmo session state-ka." }
        ],

        quiz: [
          {
            q: "Automated testing wuxuu jabin karaa sababtoo ah?",
            options: [
              "CSRF/session tokens isbeddela request kasta",
              "Ma jiro sabab",
              "Automated tools waligood way jabaan",
              "Kaliya loo isticmaalo manual testing"
            ],
            answer: 0,
            explain: "Tokens dynamic ah waxay u baahan yihiin maamul gaar ah."
          },
          {
            q: "Macro-gu wuxuu bixiyaa?",
            options: [
              "Sequence requests ah oo dib loo fulin karo automatic ahaan",
              "Encrypt gareynta traffic",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Login flows waxaa loo automate gareeyaa macros."
          },
          {
            q: "Session handling rule loogu daro Intruder attack dheer sababtoo ah?",
            options: [
              "Re-authenticate gareynta haddii session dhaco intii attack-ku socoto",
              "Kordhinta xawaaraha oo keliya",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo Scanner"
            ],
            answer: 0,
            explain: "Attack dheer wuxuu khatar u yahay session expiry."
          }
        ],

        exercise: {
          title: "Session Handling Setup Practice",
          steps: [
            "Sharax sababta session handling loo baahan yahay applications CSRF leh.",
            "Naqshadee macro (concept ahaan) login flow ah.",
            "Sharax sida session handling rule loo dabaqi lahaa Intruder.",
            "Sharax scenario ah oo macro loo baahan yahay attack dheer."
          ],
          deliverable: "Session handling and macros setup guide."
        }
      },

      {
        slug: "burp-extensions-automation",
        title: "Burp Extensions & Automation",
        english: "Burp Extensions and Automation",
        minutes: 10,

        summary:
          "Faham sida BApp Store extensions loo isticmaalo si loo ballaadhiyo awoodda Burp.",

        sections: [
          {
            h: "BApp Store",
            p:
            "BApp Store waa marketplace extensions ah oo Burp Suite Professional gudihiisa ku jira (qaarkood way ku shaqeeyaan Community-ba). Waxay bixiyaan awood dheeraad ah sida Logger++, Autorize, iyo Turbo Intruder."
          },
          {
            h: "Autorize — Testing Access Control",
            p:
            "Autorize waa extension automate gareysa access control testing — wuxuu si otomaatig ah u dib-diraa requests iyada oo la isticmaalayo session token user-ka hooseeya, si loo ogaado haddii uu heli karo access aan loo oggolayn (IDOR/broken access control)."
          },
          {
            h: "Logger++",
            p:
            "Logger++ wuxuu bixiyaa view faahfaahsan oo dhammaan requests, waxaana lagu filter gareyn karaa qaabab kala duwan — mid ka wanaagsan HTTP History caadiga ah marka aad baarayso qadar aad u badan oo requests ah."
          },
          {
            h: "Turbo Intruder",
            p:
            "Turbo Intruder waa extension awood badan oo loogu talagalay high-speed attacks — waxaa loo isticmaalaa xaalado gaar ah sida race condition testing, halka Intruder caadiga ahi uusan ku filnayn xawli ahaan."
          }
        ],

        terms: [
          { term: "BApp Store", def: "Marketplace extensions ah oo Burp Suite gudihiisa ku jira." },
          { term: "Autorize", def: "Extension automate gareysa access control testing." }
        ],

        quiz: [
          {
            q: "Autorize waxaa loo isticmaalaa?",
            options: [
              "Automate gareynta access control testing (IDOR/broken access)",
              "Sameynta backup",
              "Encrypt gareynta traffic",
              "Beddelidda IP address"
            ],
            answer: 0,
            explain: "Autorize wuxuu si otomaatig ah u tijaabiyaa authorization checks."
          },
          {
            q: "Logger++ ka fiican yahay HTTP History caadiga ah marka?",
            options: [
              "Xaalado qadar aad u badan oo requests ah la baarayo",
              "Kaliya hal request la baarayo",
              "Waligeed kama fiicna",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Logger++ wuxuu bixiyaa filtering capabilities dheeraad ah."
          },
          {
            q: "Turbo Intruder waxaa loo isticmaalaa marka?",
            options: [
              "Loo baahdo attacks xawli sare leh (tusaale race conditions)",
              "Kaliya manual testing fudud",
              "Kaliya reporting",
              "Kaliya recon"
            ],
            answer: 0,
            explain: "Turbo Intruder wuxuu bixiyaa xawli aad u sarreeya Intruder caadiga ah."
          }
        ],

        exercise: {
          title: "Extension Research",
          steps: [
            "Raadi BApp Store, aqoonso 3 extensions kale oo aan kor lagu sharaxin.",
            "Sharax shaqada extension kasta.",
            "Sharax sida Autorize loo isticmaali lahaa lab-kaaga si loo tijaabiyo IDOR.",
            "Qor liis 5 extensions oo ku habboon web app pentesting."
          ],
          deliverable: "Burp extensions research summary."
        }
      },


      {
        slug: "burp-suite-capstone-lab",
        title: "Burp Suite — Full Capstone Lab",
        english: "Burp Suite Capstone Lab",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee full web app testing session Burp Suite oo dhamaystiran.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad haysataa authorization aad Burp Suite ku baarto DVWA ama vulnerable app kale — isticmaal Proxy, Repeater iyo Intruder si aad u ogaato vulnerabilities."
          },
          {
            h: "Proxy Mapping",
            p:
            "Isticmaal Proxy si aad u browse gareyso application-ka oo dhan, dhis Site Map buuxa oo muujinaya attack surface-ka."
          },
          {
            h: "Manual Testing with Repeater",
            p:
            "Xulo 3 requests xiiso leh (login, search, ID-based lookup), tijaabi payloads kala duwan Repeater gudihiisa."
          },
          {
            h: "Automated Testing with Intruder",
            p:
            "Naqshadee Intruder attack (Sniper) oo tijaabiya wordlist yar oo XSS/SQLi payloads ah parameter la aqoonsaday."
          }
        ],

        terms: [
          { term: "Full Burp Session", def: "Testing isugu jira Proxy mapping, Repeater manual testing, iyo Intruder automation." }
        ],

        quiz: [
          {
            q: "Full Burp testing session-ku wuxuu bilaabmaa?",
            options: [
              "Proxy mapping — dhisidda Site Map",
              "Isla markiiba Intruder attacks",
              "Warbixinta ugu dambaysa",
              "Extensions installation"
            ],
            answer: 0,
            explain: "Marka hore waa in la fahmo application-ka oo dhan ka hor testing targeted ah."
          },
          {
            q: "Repeater waxaa loo isticmaalaa marka?",
            options: [
              "Manual, focused testing hal request ah",
              "Automated bulk testing",
              "Reporting",
              "Recon"
            ],
            answer: 0,
            explain: "Repeater-ku ku habboon yahay tijaabin gaar ah oo focused ah."
          },
          {
            q: "Warbixinta ugu dambaysa Burp session-ka waa in ay ku jirto?",
            options: [
              "Vulnerabilities la helay, requests/responses evidence, remediation",
              "Kaliya screenshot Burp interface-ka",
              "Kaliya magaca application-ka",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Evidence-ku waa muhiim si loo caddeeyo findings-ka."
          }
        ],

        exercise: {
          title: "Full Burp Suite Testing Session",
          steps: [
            "Proxy-map DVWA lab-kaaga oo dhan.",
            "Isticmaal Repeater si aad u tijaabiso 3 parameters xiiso leh.",
            "Naqshadee Intruder attack (Sniper) parameter la aqoonsaday.",
            "Diyaari warbixin testing session-ka oo leh evidence (requests/responses) iyo findings (portfolio-ready)."
          ],
          deliverable: "Full Burp Suite testing session report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "eh7",
    slug: "vulnerability-assessment",
    stage: "Sare",
    title: "Vulnerability Assessment",
    english: "Vulnerability Assessment",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa vulnerability scanning, CVE/CVSS scoring, verification iyo qorista vulnerability reports professional ah.",

    topics: [
      "Vulnerability Assessment Fundamentals",
      "Vulnerability Scanners: Nessus & OpenVAS",
      "CVE & CVSS Scoring",
      "False Positives & Verification",
      "Vulnerability Report Writing",
      "Vulnerability Assessment Capstone",
    ],

    lessonList: [

      {
        slug: "vulnerability-assessment-fundamentals",
        title: "Aasaaska Vulnerability Assessment",
        english: "Vulnerability Assessment Fundamentals",
        minutes: 12,

        summary:
          "Faham farqiga vulnerability assessment iyo penetration testing, iyo qaab-dhismeedka assessment process-ka.",

        sections: [
          {
            h: "Vulnerability Assessment vs Penetration Testing",
            p:
            "Vulnerability assessment waa ballaaran, automated ahaan — ujeeddadu waa in la helo iyo la liis gareeyo dhammaan vulnerabilities suurtagalka ah. Penetration testing waa mid qoto dheer, manual ahaan — ujeeddadu waa in la exploit-gareeyo si loo caddeeyo real-world impact."
          },
          {
            h: "Assessment Process",
            p:
            "1) Planning & Scoping. 2) Discovery (asset inventory). 3) Scanning (automated tools). 4) Analysis (verification, false positive removal). 5) Reporting. 6) Remediation tracking."
          },
          {
            h: "Types of Vulnerability Assessments",
            p:
            "Network-based (infrastructure devices), Host-based (individual servers/workstations), Application-based (software vulnerabilities), Database assessments (misconfigurations, weak access controls)."
          },
          {
            h: "Continuous vs Point-in-Time Assessment",
            p:
            "Point-in-time assessment waa snapshot hal mar ah. Continuous assessment (vulnerability management program) wuxuu si joogto ah u scan gareeyaa, muhiim ah sababtoo ah vulnerabilities cusub waxay soo baxaan maalin kasta."
          }
        ],

        terms: [
          { term: "Vulnerability Assessment", def: "Baaritaan ballaaran oo automated ah oo helo liis vulnerabilities ah." },
          { term: "Vulnerability Management", def: "Barnaamij joogto ah oo la socda, la scan gareeyo, lana hagaajiyo vulnerabilities." }
        ],

        quiz: [
          {
            q: "Farqiga vulnerability assessment iyo penetration testing waa?",
            options: [
              "Assessment waa ballaaran/automated, pentest waa qoto dheer/manual leh exploitation",
              "Isku mid",
              "Assessment waa manual, pentest waa automated",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Pentest wuxuu caddeeyaa impact-ka dhabta ah, assessment wuxuu liis gareeyaa suurtagalnimada."
          },
          {
            q: "Continuous assessment muhiim u tahay sababtoo ah?",
            options: [
              "Vulnerabilities cusub waxay soo baxaan maalin kasta",
              "Waa mid ka jaban point-in-time",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo compliance"
            ],
            answer: 0,
            explain: "Landscape-ka threats-ku had iyo jeer wuu isbeddelayaa."
          },
          {
            q: "Tallaabada ugu dambaysa ee assessment process-ka waa?",
            options: [
              "Remediation tracking",
              "Planning",
              "Discovery",
              "Scanning"
            ],
            answer: 0,
            explain: "Assessment-ku ma dhammaan haddii aan la la socon in vulnerabilities la xaliyay."
          }
        ],

        exercise: {
          title: "Assessment Planning",
          steps: [
            "Xulo shirkad tusaale ah leh 30 servers.",
            "Naqshadee assessment plan (scope, timeline, types la sameyn lahaa).",
            "Sharax farqiga network-based iyo application-based assessment tan scenario-ga.",
            "Sharax sababta continuous assessment loo soo jeedin lahaa."
          ],
          deliverable: "Vulnerability assessment plan."
        }
      },


      {
        slug: "vulnerability-scanners-nessus-openvas",
        title: "Vulnerability Scanners: Nessus & OpenVAS",
        english: "Vulnerability Scanners: Nessus and OpenVAS",
        minutes: 13,

        summary:
          "Baro sida vulnerability scanners caanka ah loo isticmaalo si loo helo vulnerabilities si otomaatig ah.",

        sections: [
          {
            h: "Nessus",
            p:
            "Nessus (Tenable) waa mid ka mid ah vulnerability scanners-ka ugu caansan industry-ga — leh version bilaash ah (Nessus Essentials) oo xaddidan iyo mid commercial ah. Wuxuu bixiyaa plugins kumanaan ah oo daboola vulnerabilities kala duwan."
          },
          {
            h: "OpenVAS",
            p:
            "OpenVAS waa open-source alternative Nessus, ku dhisan Greenbone. Wuxuu bixiyaa vulnerability scanning bilaash ah, wuxuuna ku habboon yahay labs iyo shirkadaha aan awoodin licenses commercial ah."
          },
          {
            h: "Scan Configuration",
            p:
            "Scans-ka waa in la naqshadeeyo si loogu habboonaado ujeeddada: authenticated scans (credentials la geliyo, natiijo faahfaahsan) vs unauthenticated (u eg attacker dibadda ah, natiijo ka yar)."
          },
          {
            h: "Interpreting Scan Results",
            p:
            "Scanner-yadu waxay soo saaraan qadar aad u badan oo findings ah, kuwaas oo u baahan analyst inuu falanqeeyo. Severity (Critical/High/Medium/Low), CVE references, iyo remediation guidance ayaa la eegaa."
          }
        ],

        terms: [
          { term: "Nessus", def: "Vulnerability scanner caan ah oo Tenable ka sameeyay." },
          { term: "OpenVAS", def: "Vulnerability scanner open-source ah." },
          { term: "Authenticated Scan", def: "Scan la geliyo credentials, natiijo ka faahfaahsan." }
        ],

        quiz: [
          {
            q: "Authenticated scan-ku wuxuu ka duwan yahay unauthenticated sababtoo ah?",
            options: [
              "Waxaa la geliyaa credentials, natiijadu waa mid ka faahfaahsan",
              "Waa mid ka fudud",
              "Ma jiro farqi",
              "Waa mid ka gaabis"
            ],
            answer: 0,
            explain: "Access buuxa wuxuu u ogolaadaa scanner-ka inuu eego meelo dheeraad ah."
          },
          {
            q: "OpenVAS waa?",
            options: [
              "Vulnerability scanner open-source ah",
              "Web browser",
              "Firewall hardware",
              "Antivirus software"
            ],
            answer: 0,
            explain: "OpenVAS waa alternative bilaash ah oo Nessus u dhigma."
          },
          {
            q: "Scan results-ka waxaa lagu falanqeeyaa?",
            options: [
              "Severity, CVE references, remediation guidance",
              "Kaliya magaca server-ka",
              "Kaliya waqtiga scan-ka",
              "Ma jiro faahfaahin"
            ],
            answer: 0,
            explain: "Qaybahan waxay ku caawiyaan analyst-ka in la kala hormariyo."
          },
          {
            q: "Nessus Essentials waa?",
            options: [
              "Version bilaash ah oo xaddidan",
              "Version commercial ah oo keliya",
              "Kaliya open-source",
              "Ma jiro version bilaash ah"
            ],
            answer: 0,
            explain: "Nessus wuxuu bixiyaa version bilaash ah oo IPs xaddidan leh."
          }
        ],

        exercise: {
          title: "Scanner Configuration Practice",
          steps: [
            "Sharax farqiga Nessus iyo OpenVAS.",
            "Naqshadee (concept ahaan) authenticated scan config-ga subnet lab-kaaga ah.",
            "Sharax sida aad u falanqayn lahayd findings-ka scanner-ku soo saaro.",
            "Qor 3 sababood oo authenticated scans loo isticmaalo."
          ],
          deliverable: "Vulnerability scanner configuration notes."
        }
      },


      {
        slug: "cve-cvss-scoring",
        title: "CVE & CVSS Scoring",
        english: "CVE and CVSS Scoring",
        minutes: 15,

        summary:
          "Faham sida CVE-yada loo diiwaan geliyo iyo sida CVSS score-ku u sheekeeyo severity-ga vulnerability.",

        sections: [
          {
            h: "Waa Maxay CVE?",
            p:
            "Common Vulnerabilities and Exposures (CVE) waa database dadweynaha ah oo diiwaan geliya vulnerabilities la yaqaan, mid kasta oo leh ID gaar ah (tusaale CVE-2024-12345). CVE-yadu waxay u oggolaadaan industry-ga inay isku sheekeeyaan isla vulnerability."
          },
          {
            h: "CVSS Score Components",
            p:
            "CVSS (Common Vulnerability Scoring System) wuxuu bixiyaa score 0-10. Base Score wuxuu ka kooban yahay: Attack Vector, Attack Complexity, Privileges Required, User Interaction, iyo Impact (Confidentiality, Integrity, Availability)."
          },
          {
            h: "Severity Ranges",
            p:
            "None (0.0), Low (0.1-3.9), Medium (4.0-6.9), High (7.0-8.9), Critical (9.0-10.0). Critical vulnerabilities (tusaale remote code execution aan authentication u baahnayn) waxay u baahan yihiin xal degdeg ah."
          },
          {
            h: "Contextualizing CVSS with Business Impact",
            p:
            "CVSS score-ku waa mid generic ah — analyst-ku waa inuu ku daro context business-ka gaarka ah. Vulnerability CVSS 7.0 ah oo ku taal system aan muhiim ahayn ayaa laga yaabaa inay ka hoosayso mudnaan mid CVSS 6.0 ah oo ku taal system muhiim ah (crown jewel)."
          }
        ],

        terms: [
          { term: "CVE", def: "Common Vulnerabilities and Exposures — database vulnerabilities la yaqaan." },
          { term: "CVSS", def: "Common Vulnerability Scoring System — score 0-10 severity-ga muujiya." }
        ],

        quiz: [
          {
            q: "CVE ID kasta wuxuu?",
            options: [
              "Gaar u yahay vulnerability hal ah",
              "Waa mid guud oo dhammaan vulnerabilities la wadaago",
              "Waa random",
              "Ma jiro qaab"
            ],
            answer: 0,
            explain: "CVE ID waa unique identifier vulnerability kasta."
          },
          {
            q: "CVSS score 9.5 wuxuu ka mid yahay heerka?",
            options: ["Critical", "Low", "Medium", "None"],
            answer: 0,
            explain: "9.0-10.0 waa Critical range-ka."
          },
          {
            q: "Sababta business context loo daro CVSS score waa?",
            options: [
              "Score generic-ku maanta muujin karo saameynta dhabta ah shirkad gaar ah",
              "CVSS score-ku waligeed sax ma aha",
              "Ma jiro sabab",
              "CVSS waa mid la iska daayo"
            ],
            answer: 0,
            explain: "Asset-ka muhiimka ah wuxuu beddeli karaa mudnaanta xitaa haddii score-ku hooseeyo."
          },
          {
            q: "CVSS Base Score-ka waxaa ka mid ah?",
            options: [
              "Attack Vector, Attack Complexity, Privileges Required",
              "Kaliya magaca vulnerability-ga",
              "Kaliya waqtiga la helay",
              "Kaliya vendor-ka"
            ],
            answer: 0,
            explain: "Components-kan waxay isku dhufaan si loo helo score-ka."
          }
        ],

        exercise: {
          title: "CVSS Scoring Practice",
          steps: [
            "Raadi CVE cusub ah oo public (tusaale search 'recent CVE critical').",
            "Aqoonso CVSS score-kiisa iyo components-ka.",
            "Sharax sida business context uu u beddeli karo mudnaanta.",
            "Qor jaantus 5 CVEs ah oo severity kala duwan leh."
          ],
          deliverable: "CVE/CVSS research sheet."
        }
      },


      {
        slug: "false-positives-verification",
        title: "False Positives & Verification",
        english: "False Positives and Manual Verification",
        minutes: 11,

        summary:
          "Faham sababta scanners-ku ay soo saaraan false positives iyo sida loo xaqiijiyo findings manually.",

        sections: [
          {
            h: "Sababta False Positives u Dhacaan",
            p:
            "Scanners-yadu waxay ku salaysan yihiin signatures/banners — mararka qaar version banner wuxuu muujiyaa software duugoobay, laakiin patch-ku wuxuu horay u socday iyada oo aan banner-ka la beddelin (backporting)."
          },
          {
            h: "Manual Verification Process",
            p:
            "Findings kasta oo Critical/High ah, waa in manually la xaqiijiyo ka hor loo geliyo warbixinta ugu dambaysa. Tani waxay ka mid noqon kartaa: version check gacanta ah, tijaabin exploit-ga (haddii safe), ama la xiriirid vendor-ka."
          },
          {
            h: "False Negative Risk",
            p:
            "Marka la yareynayo false positives, waa in la ka digtoonaado false negatives (vulnerabilities dhab ah oo la seego). Waa balance u dhexeeya accuracy iyo comprehensiveness."
          },
          {
            h: "Documenting Verification Steps",
            p:
            "Marka finding la xaqiijiyo (ama la diido sida false positive), diiwaan geli sida — tani waxay taageertaa audit trail-ka oo ka caawisaa reviewer-yada kale inay fahmaan sababta go'aanka."
          }
        ],

        terms: [
          { term: "False Positive", def: "Finding scanner-ku soo saaray oo aan dhab ahayn." },
          { term: "False Negative", def: "Vulnerability dhab ah oo scanner-ku uu seego." },
          { term: "Manual Verification", def: "Habka la xaqiijiyo findings gacanta ah ka hor warbixinta." }
        ],

        quiz: [
          {
            q: "False positive sababaha ugu badan waa?",
            options: [
              "Version banner oo aan la beddelin xitaa patch kadib (backporting)",
              "Scanner-ku waligeed sax ma aha",
              "Network-ku wuu jabay",
              "Ma jiro sabab caadi ah"
            ],
            answer: 0,
            explain: "Backporting-ku wuxuu ka dhigaa banner-ka mid marin habaabin."
          },
          {
            q: "Sababta manual verification loo sameeyo findings Critical/High ah waa?",
            options: [
              "Si loo xaqiijiyo ka hor warbixinta ugu dambaysa",
              "Si loo yareeyo waqtiga scan-ka",
              "Si loo tirtiro findings dhammaantood",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Findings heer sare ah waxay u baahan yihiin xaqiijin sababtoo ah waxay saameyn kartaa priorities-ka."
          },
          {
            q: "False negative waa maxay?",
            options: [
              "Vulnerability dhab ah oo scanner-ku uu seego",
              "Finding aan dhab ahayn",
              "Scanner oo aan shaqeynayn",
              "Report aan la qorin"
            ],
            answer: 0,
            explain: "False negative-ku waa khatar ka sii daran false positive, sababtoo ah threat dhab ah baa la seegayaa."
          },
          {
            q: "Sababta documentation-ka verification steps-ku muhiim u yahay waa?",
            options: [
              "Waxay taageertaa audit trail iyo fahamka go'aanka",
              "Ma jiro faa'iido",
              "Kaliya loo baahan yahay legal reasons",
              "Kaliya loo baahan yahay backup"
            ],
            answer: 0,
            explain: "Documentation-ku wuxuu u ogolaadaa reviewers kale inay fahmaan sababta."
          }
        ],

        exercise: {
          title: "False Positive Analysis",
          steps: [
            "Xulo finding tusaale ah oo scanner-ku soo saaray (fictional).",
            "Naqshadee 3 tallaabo aad ku xaqiijin lahayd manually.",
            "Sharax sida backporting u dhici karto scenario-gan.",
            "Qor go'aan ah: true positive ama false positive, oo sharax sababta."
          ],
          deliverable: "Manual verification case study."
        }
      },


      {
        slug: "web-vulnerability-scanners-fuzzing",
        title: "Web Vulnerability Scanners & Fuzzing",
        english: "Web Vulnerability Scanners and Fuzzing",
        minutes: 14,

        summary:
          "Faham sida tools sida Nikto, Gobuster, iyo ffuf loo isticmaalo web vulnerability discovery.",

        sections: [
          {
            h: "Nikto — Web Server Scanner",
            p:
            "Nikto wuxuu si degdeg ah u baaraa web servers misconfigurations caan ah (default files, outdated software, dangerous files/scripts) — mid ka fudud oo degdeg ah, laakiin noise badan (waxaa laga yaabaa false positives)."
          },
          {
            h: "Directory & File Fuzzing (Gobuster/dirb)",
            p:
            "Gobuster/dirb waxay isticmaalaan wordlists si ay u raadiyaan directories/files aan si toos ah loo linkin website-ka (tusaale /admin, /backup, /.git) — muhiim helitaanka hidden functionality ama sensitive files."
          },
          {
            h: "ffuf — Fast Web Fuzzer",
            p:
            "ffuf (Fast Web Fuzzer) waa tool xawli sare leh oo loo isticmaalo fuzzing (directories, parameters, subdomains, iwm) — wuxuu u ogolaadaa filtering natiijooyinka iyadoo lagu saleynayo response codes/sizes."
          },
          {
            h: "Interpreting Fuzzing Results",
            p:
            "Response codes (200 OK = jira, 403 Forbidden = jira laakiin xaddidan, 404 = ma jiro) waxay kaa caawiyaan kala saaridda natiijooyinka. Response size differences waxay sidoo kale muujin karaan endpoints jira oo khaldan loo jawaabay."
          }
        ],

        terms: [
          { term: "Directory Fuzzing", def: "Raadinta directories/files aan si toos ah loo linkin, wordlist ahaan." },
          { term: "ffuf", def: "Fast Web Fuzzer — tool xawli sare leh oo fuzzing ah." }
        ],

        quiz: [
          {
            q: "Nikto waxaa loo isticmaalaa?",
            options: [
              "Baaritaanka degdegga ah ee web server misconfigurations",
              "Password cracking",
              "Network scanning",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "Nikto-gu wuxuu diiradda saaraa web server-ka configuration-kiisa."
          },
          {
            q: "Directory fuzzing (Gobuster) waxay raadisaa?",
            options: [
              "Directories/files aan si toos ah loo linkin website-ka",
              "Kaliya homepage-ka",
              "Ma jiro isticmaal",
              "Kaliya SSL certificates"
            ],
            answer: 0,
            explain: "Hidden functionality-ka waxaa lagu ogaan karaa fuzzing-ka."
          },
          {
            q: "Response code 403 (Forbidden) marka fuzzing la sameynayo wuxuu tilmaamayaa?",
            options: [
              "Endpoint-ku wuu jiraa, laakiin access-ku waa xaddidan",
              "Endpoint-ku ma jiro gebi ahaanba",
              "Ma jiro macluumaad",
              "Server-ku wuu dhacay"
            ],
            answer: 0,
            explain: "403 waxay ka duwan tahay 404 — endpoint jira, access xaddidan."
          }
        ],

        exercise: {
          title: "Fuzzing Tools Practice",
          steps: [
            "Sharax sida Nikto loo isticmaalo web server misconfigurations.",
            "Qor tusaale Gobuster command ah oo directory fuzzing ah.",
            "Sharax faa'iidada ffuf marka la barbardhigo Gobuster.",
            "Sharax sida response codes loo fasiro fuzzing results ahaan."
          ],
          deliverable: "Web vulnerability scanning and fuzzing reference sheet."
        }
      },

      {
        slug: "vulnerability-report-writing",
        title: "Vulnerability Report Writing",
        english: "Vulnerability Report Writing",
        minutes: 14,

        summary:
          "Baro sida vulnerability report professional ah loo qoro oo maamulka iyo technical teams labadaba u adeegto.",

        sections: [
          {
            h: "Report Structure",
            p:
            "Executive Summary, Scope & Methodology, Findings Summary (table severity ah), Detailed Findings (kal kasta), Risk Rating Methodology, Recommendations, Appendices (raw scan data)."
          },
          {
            h: "Detailed Finding Format",
            p:
            "Finding kasta: Title, Severity/CVSS score, Affected Assets, Description, Evidence (screenshot/output), Business Impact, Remediation Steps, References (CVE, vendor advisories)."
          },
          {
            h: "Writing Clear Remediation Guidance",
            p:
            "Remediation-ku waa in uu ahaado mid specific ah, ma aha guud: 'Update Apache to version 2.4.58 or later' halkii 'Update software'. Ku dar timeline soo jeedin ah iyadoo lagu saleynayo severity."
          },
          {
            h: "Executive Summary for Non-Technical Audiences",
            p:
            "Executive summary-gu waa in uu daboolo: tirada findings severity kasta, khatarta guud ee business-ka, iyo talooyinka ugu waaweyn — dhammaan luqad aan farsamo ahayn oo maamulku fahmi karo."
          }
        ],

        terms: [
          { term: "Detailed Finding", def: "Qaybta report-ka ee sharaxda vulnerability hal ah oo faahfaahsan." },
          { term: "Remediation Guidance", def: "Talooyinka gaarka ah ee lagu xaliyo vulnerability-ga." }
        ],

        quiz: [
          {
            q: "Remediation guidance-ku waa in uu ahaado?",
            options: [
              "Specific (tusaale version cad), ma aha guud",
              "Aad u guud si loo daboolo dhammaan xaaladaha",
              "Aan la qorin",
              "Kaliya loo qoro developers"
            ],
            answer: 0,
            explain: "Specificity-du waxay ka dhigtaa remediation-ka mid la fulin karo."
          },
          {
            q: "Executive summary-gu waa in uu ahaado?",
            options: [
              "Luqad aan farsamo ahayn oo maamulku fahmi karo",
              "Farsamo yaqaanno oo keliya",
              "Kaliya raw data",
              "Kaliya code snippets"
            ],
            answer: 0,
            explain: "Maamulku ma baahna faahfaahin technical, wuxuu rabaa risk iyo go'aan."
          },
          {
            q: "Detailed finding kasta waa in uu ku jiro?",
            options: [
              "Evidence, business impact, remediation, references",
              "Kaliya title",
              "Kaliya severity",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Faahfaahin buuxa waa muhiim si loo caddeeyo oo loo xalliyo."
          }
        ],

        exercise: {
          title: "Write a Full Vulnerability Report",
          steps: [
            "Isticmaal 2-3 findings aad module-yadan hore ka heshay (fictional ama lab).",
            "Qor executive summary 4 sadar ah.",
            "Qor detailed finding buuxa hal vulnerability ah (title, CVSS, evidence, remediation).",
            "Ku dar table findings summary ah oo severity kasta muujinaya."
          ],
          deliverable: "Full vulnerability assessment report (portfolio-ready)."
        }
      },


      {
        slug: "vulnerability-assessment-capstone",
        title: "Vulnerability Assessment — Capstone",
        english: "Vulnerability Assessment Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — naqshadee, fuli (concept ahaan), oo warbixin buuxa qor.",

        sections: [
          {
            h: "Scenario",
            p:
            "Shirkad tusaale ah ayaa kula soo xiriirtay si aad u sameyso vulnerability assessment 15 servers ah. Waxay leeyihiin miisaaniyad xaddidan, marka waxaad isticmaali doontaa OpenVAS (bilaash)."
          },
          {
            h: "Planning",
            p:
            "Naqshadee scope, timeline iyo authenticated vs unauthenticated approach-ka."
          },
          {
            h: "Simulated Findings Analysis",
            p:
            "Xulo 5 findings tusaale ah (fictional, kala duwan severity), samee verification analysis mid kasta, oo kala saar true/false positive."
          },
          {
            h: "Full Reporting",
            p:
            "Diyaari warbixin buuxda oo leh executive summary, findings table, detailed findings, iyo remediation roadmap 30/60/90-maalmood ah."
          }
        ],

        terms: [
          { term: "Remediation Roadmap", def: "Qorshe waqti-salaysan oo lagu xaliyo findings-ka." }
        ],

        quiz: [
          {
            q: "Remediation roadmap 30/60/90 macnaheedu waa?",
            options: [
              "Qorshe kala saaraya waqtiga la xalinayo findings kala duwan",
              "Kaliya waqtiga scan-ka",
              "Kaliya budget breakdown",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "Critical-ku wuxuu heli lahaa 30 maalmood, Medium 90, iwm."
          },
          {
            q: "Miisaaniyad xaddidan sababta loo dooran lahaa OpenVAS waa?",
            options: [
              "Waa bilaash, ma aha commercial sida Nessus Pro",
              "Waa mid ka fiican dhammaan",
              "Ma jiro sabab",
              "OpenVAS ma shaqeeyo"
            ],
            answer: 0,
            explain: "Budget constraints waxay khusaysaa doorashada tools."
          },
          {
            q: "Simulated findings analysis-ku wuxuu tijaabiyaa?",
            options: [
              "Awoodda la kala saaro true iyo false positives",
              "Kaliya typing speed",
              "Kaliya UI navigation",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Fahamka verification-ku waa xirfad muhiim ah."
          }
        ],

        exercise: {
          title: "Full Vulnerability Assessment Project",
          steps: [
            "Naqshadee assessment plan 15 servers scenario-ga.",
            "Xulo 5 simulated findings, samee verification analysis mid kasta.",
            "Kala saar true/false positive iyo sababta.",
            "Diyaari full report oo leh remediation roadmap 30/60/90-maalmood ah (portfolio-ready)."
          ],
          deliverable: "Full vulnerability assessment project (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "eh8",
    slug: "penetration-testing-basics",
    stage: "Sare",
    title: "Penetration Testing Basics",
    english: "Penetration Testing Basics",
    hours: 1,

    outcome:
      "Waxaad si adag u fahmi doontaa PTES methodology, exploitation basics (Metasploit), privilege escalation, post-exploitation iyo qorista full pentest reports.",

    topics: [
      "Penetration Testing Methodology (PTES)",
      "Exploitation Basics with Metasploit",
      "Privilege Escalation Basics",
      "Post-Exploitation & Persistence",
      "Penetration Test Reporting",
      "Final Penetration Testing Capstone",
    ],

    lessonList: [

      {
        slug: "pentest-methodology-ptes",
        title: "Penetration Testing Methodology (PTES)",
        english: "Penetration Testing Execution Standard (PTES)",
        minutes: 12,

        summary:
          "Faham 7-da qaybood ee PTES — standard-ka industry-ga ah ee lagu qabto pentest professional ah.",

        sections: [
          {
            h: "7-da Qaybood ee PTES",
            p:
            "1) Pre-engagement Interactions. 2) Intelligence Gathering. 3) Threat Modeling. 4) Vulnerability Analysis. 5) Exploitation. 6) Post Exploitation. 7) Reporting. Isku darka dhammaan module-yada hore ee koorsadan waxay isku dhistaan qaybahan."
          },
          {
            h: "Pre-Engagement Interactions",
            p:
            "Kulanka client-ka: scope, RoE, timeline, emergency contacts, iyo goals-ka business-ka (ma aha kaliya technical). Kani waa marxaladda muhiimka ah ee hore ka baratay module 1."
          },
          {
            h: "Vulnerability Analysis vs Exploitation",
            p:
            "Vulnerability Analysis (aad ka baratay module 7) waa in la helo oo la xaqiijiyo vulnerabilities. Exploitation waa marxaladda tijaabinta si dhab ah — u isticmaalka vulnerability-ga si loo helo access aan la oggolayn."
          },
          {
            h: "Cycle-ka Iterative-ka ah",
            p:
            "PTES-ku maaha hab tallaabo-hal-mar ah — post-exploitation-ka wuxuu badanaa kaa keenaa targets cusub oo dib loo baaro, taasoo dib u celisa vulnerability analysis iyo exploitation phases-ka."
          }
        ],

        terms: [
          { term: "PTES", def: "Penetration Testing Execution Standard — 7-da qaybood ee methodology-ga." },
          { term: "Pre-Engagement", def: "Marxaladda hore ee scoping iyo RoE lagu dejiyo." }
        ],

        quiz: [
          {
            q: "PTES-ka, tallaabada ugu horreysa waa?",
            options: [
              "Pre-engagement Interactions",
              "Exploitation",
              "Reporting",
              "Post Exploitation"
            ],
            answer: 0,
            explain: "Scoping iyo RoE waa in la dejiyaa ka hor wax kasta oo kale."
          },
          {
            q: "Farqiga vulnerability analysis iyo exploitation waa?",
            options: [
              "Analysis wuxuu helaa/xaqiijiyaa, exploitation wuxuu si dhab ah u isticmaalaa",
              "Isku mid",
              "Exploitation wuxuu kaliya helaa",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Exploitation-ku waa tallaabo action-based ah oo ka sii dambeysa analysis-ka."
          },
          {
            q: "PTES sababta uu u yahay iterative waa?",
            options: [
              "Post-exploitation-ku wuxuu kaa keenaa targets cusub oo dib loo baaro",
              "Waa mid hal-mar ah oo aan dib loo noqonayn",
              "Ma jiro sabab",
              "Waa kaliya technical process"
            ],
            answer: 0,
            explain: "Marka access la helo, waxaa laga yaabaa systems cusub oo baaris u baahan."
          }
        ],

        exercise: {
          title: "PTES Methodology Mapping",
          steps: [
            "Qor 7-da qaybood ee PTES.",
            "Isku xir qaybaha module-yada hore aad baratay (recon = intelligence gathering, iwm).",
            "Sharax sababta pre-engagement uu muhiim u yahay.",
            "Sharax tusaale ah oo iterative cycle-ka ah (post-exploitation → target cusub)."
          ],
          deliverable: "PTES methodology mapping document."
        }
      },


      {
        slug: "exploitation-basics-metasploit",
        title: "Exploitation Basics with Metasploit",
        english: "Exploitation Basics with Metasploit",
        minutes: 10,

        summary:
          "Baro aasaaska Metasploit Framework — exploits, payloads iyo sida loo isticmaalo si ammaan ah lab environment gudihiisa.",

        sections: [
          {
            h: "Metasploit Framework Overview",
            p:
            "Metasploit waa framework awood badan oo bixiya exploits ready-made ah, payloads, iyo post-exploitation tools. Wuxuu kaydiyaa exploits kumanaan ah oo la keydiyay database-kiisa (msfconsole)."
          },
          {
            h: "Exploits, Payloads & Auxiliary Modules",
            p:
            "Exploit waa code-ka isticmaala vulnerability-ga. Payload waa waxa la fulinayo kadib exploitation-ka guuleystay (tusaale: reverse shell). Auxiliary modules waxay bixiyaan scanning/enumeration, aan lahayn payload."
          },
          {
            h: "Meterpreter",
            p:
            "Meterpreter waa payload advanced ah oo bixiya post-exploitation capabilities badan — file system access, keylogging, screenshot, privilege escalation modules — dhammaantood iyada oo aan disk-ka la taaban (in-memory)."
          },
          {
            h: "Basic Metasploit Workflow",
            p:
            "1) search [vulnerability/CVE]. 2) use [exploit path]. 3) set RHOSTS, LHOST, PAYLOAD. 4) exploit. Habkani waa asaasiga isticmaalka Metasploit lab environment authorized ah gudihiisa."
          }
        ],

        terms: [
          { term: "Exploit", def: "Code-ka isticmaala vulnerability si loo helo access." },
          { term: "Payload", def: "Waxa la fulinayo kadib exploitation-ka guuleystay." },
          { term: "Meterpreter", def: "Payload advanced ah oo bixiya post-exploitation capabilities in-memory ah." }
        ],

        quiz: [
          {
            q: "Payload waa maxay?",
            options: [
              "Waxa la fulinayo kadib exploitation-ka guuleystay",
              "Code-ka isticmaala vulnerability",
              "Scanner-ka network-ka",
              "Firewall rule"
            ],
            answer: 0,
            explain: "Payload-ku waa 'natiijada' exploit-ka guuleystay — sida reverse shell."
          },
          {
            q: "Meterpreter faa'iidadeeda ugu weyn waa?",
            options: [
              "Wuxuu ka shaqeeyaa memory-ga (in-memory), aan disk-ka la taaban",
              "Wuxuu u baahan yahay disk access buuxa",
              "Wuxuu kaliya scan gareeyaa",
              "Ma jiro faa'iido gaar ah"
            ],
            answer: 0,
            explain: "In-memory execution-ku wuxuu yareeyaa evidence disk-ka ku hara."
          },
          {
            q: "Auxiliary modules waxay bixiyaan?",
            options: [
              "Scanning/enumeration, aan lahayn payload",
              "Kaliya exploits",
              "Kaliya payloads",
              "Kaliya reporting"
            ],
            answer: 0,
            explain: "Auxiliary modules-ku waxay ku habboon yihiin recon, ma aha exploitation."
          },
          {
            q: "RHOSTS iyo LHOST waxay tilmaamaan?",
            options: [
              "RHOSTS = target, LHOST = attacker (loo dhigo listener)",
              "Labaduba target-ka",
              "Labaduba attacker-ka",
              "Ma jiro macno gaar ah"
            ],
            answer: 0,
            explain: "RHOSTS waa 'remote host' target-ka, LHOST waa 'local host' attacker-ka."
          },
          {
            q: "Metasploit waa in loo isticmaalo?",
            options: [
              "Kaliya lab environment authorized ah gudihiisa",
              "System kasta aan authorization lahayn",
              "Waligeed la iska daayo",
              "Kaliya production systems"
            ],
            answer: 0,
            explain: "Exploitation tools waxaa kaliya loo isticmaalaa authorized engagements/labs gudahood."
          }
        ],

        exercise: {
          title: "Metasploit Fundamentals Study",
          steps: [
            "Sharax farqiga exploit, payload iyo auxiliary module.",
            "Qor 4-da tallaabo ee basic Metasploit workflow-ga.",
            "Sharax faa'iidada Meterpreter marka la barbardhigo shell caadi ah.",
            "Sharax sababta authorization ay muhiim u tahay ka hor Metasploit la isticmaalo."
          ],
          deliverable: "Metasploit fundamentals notes."
        }
      },


      {
        slug: "privilege-escalation-pentest",
        title: "Privilege Escalation Basics",
        english: "Privilege Escalation for Penetration Testers",
        minutes: 13,

        summary:
          "Faham habab caan ah oo Windows iyo Linux privilege escalation ah, aragtida attacker-ka.",

        sections: [
          {
            h: "Sababta Privilege Escalation Muhiim u Tahay",
            p:
            "Marka pentester uu helo initial access (badanaa user account fudud), wuxuu u baahan yahay inuu kordhiyo awooddiisa (admin/root) si uu u caddeeyo full impact-ka — access mahdoodka ah kama filna."
          },
          {
            h: "Linux Privilege Escalation Techniques",
            p:
            "SUID/SGID binaries misconfigured, sudo misconfigurations (sudo -l), cron jobs writable ah oo root u shaqeeya, kernel exploits, iyo weak file permissions (world-writable config files)."
          },
          {
            h: "Windows Privilege Escalation Techniques",
            p:
            "Unquoted service paths, weak service permissions, AlwaysInstallElevated registry key, token impersonation (Potato attacks), iyo missing patches leh known local exploits."
          },
          {
            h: "Automated Enumeration Tools",
            p:
            "LinPEAS (Linux) iyo WinPEAS (Windows) waa scripts automate gareeya baaritaanka meelaha privilege escalation suurtagalka ah — waxay soo saaraan output faahfaahsan oo pentester-ku falanqeeyo."
          }
        ],

        terms: [
          { term: "SUID/SGID", def: "Permissions bixiya program awood owner-kiisa (badanaa root)." },
          { term: "LinPEAS", def: "Script automate gareeya baaritaanka Linux privilege escalation." },
          { term: "Token Impersonation", def: "Windows technique isticmaala tokens si loo iska dhigo user kale." }
        ],

        quiz: [
          {
            q: "Sababta pentester-ku uu u baahan yahay privilege escalation waa?",
            options: [
              "Si uu u caddeeyo full impact-ka, access mahdoodka ah kama filna",
              "Si uu u kordhiyo speed-ka",
              "Waa optional oo aan muhiim ahayn",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Admin/root access ayaa muujin karta khatarta ugu weyn."
          },
          {
            q: "sudo -l waxay muujisaa?",
            options: [
              "Waxa user-ku sudo u fulin karo",
              "Password-ka root",
              "Network connections",
              "Disk space"
            ],
            answer: 0,
            explain: "Misconfigurations sudo-ga waxaa lagu ogaan karaa amarkan."
          },
          {
            q: "LinPEAS waxaa loo isticmaalaa?",
            options: [
              "Automate gareynta baaritaanka Linux privilege escalation",
              "Windows scanning oo keliya",
              "Web app testing",
              "Network mapping"
            ],
            answer: 0,
            explain: "LinPEAS wuxuu si automatic ah u baaraa meelaha privesc ee Linux."
          },
          {
            q: "AlwaysInstallElevated registry key-gu wuxuu u oggolaadaa?",
            options: [
              "MSI installers inay ku shaqeeyaan awood SYSTEM ah, xitaa user caadi ah",
              "Kaliya admin inuu install gareeyo",
              "Kaliya applications signed ah",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "Misconfiguration-kan wuxuu u ogolaadaa privilege escalation fudud."
          }
        ],

        exercise: {
          title: "Privilege Escalation Enumeration",
          steps: [
            "Liis garee 5 Linux privesc techniques.",
            "Liis garee 5 Windows privesc techniques.",
            "Sharax sida LinPEAS/WinPEAS loo isticmaali lahaa (concept ahaan).",
            "Sharax tallaabooyinka aad qaadi lahayd haddii aad hesho SUID binary aan caadi ahayn."
          ],
          deliverable: "Privilege escalation techniques reference sheet."
        }
      },


      {
        slug: "post-exploitation-persistence",
        title: "Post-Exploitation & Persistence",
        english: "Post-Exploitation and Persistence",
        minutes: 10,

        summary:
          "Faham waxa dhaca kadib exploitation-ka guuleystay — lateral movement, data exfiltration simulation, iyo persistence testing.",

        sections: [
          {
            h: "Post-Exploitation Goals",
            p:
            "Kadib access la helay, pentester-ku wuxuu eegaa: maxaa access-kan u oggolaanayaa? (lateral movement suurtagal ma ah?), macluumaad muhiim ah miyaa la heli karaa? (data la 'exfiltrate' gareyn lahaa, simulation ahaan)."
          },
          {
            h: "Lateral Movement Simulation",
            p:
            "Marka la helo credentials ama access token, pentester-ku wuxuu tijaabiyaa inuu uga gudbo systems kale (Pass-the-Hash, RDP, SSH keys) — muujinaya sida attacker dhab ah u sii ballaadhin lahaa access-kiisa."
          },
          {
            h: "Persistence Testing",
            p:
            "Pentester-yadu waxay tijaabiyaan (authorized) persistence mechanisms (scheduled tasks, services, registry run keys) si ay u caddeeyaan haddii defender-ku ogaan karo — waxaa la tirtiraa marka engagement-ku dhammaado (cleanup)."
          },
          {
            h: "Data Sensitivity Discovery (Simulated)",
            p:
            "Pentester-yadu waxay eegaan (aan xaqiiq ahaan la xadin) haddii ay heli karaan files xasaasi ah (financial records, PII, source code) si loo caddeeyo business impact-ka — waa in la sheego oo la ilaaliyo, ma aha in la exfiltrate gareeyo dhab ahaan."
          }
        ],

        terms: [
          { term: "Lateral Movement", def: "Habka attacker uga gudbo systems kale network-ka gudihiisa." },
          { term: "Pass-the-Hash", def: "Technique isticmaala NTLM hash halkii password cad." },
          { term: "Cleanup", def: "Ka saarista dhammaan persistence mechanisms engagement-ku dhammaado kadib." }
        ],

        quiz: [
          {
            q: "Post-exploitation-ka ujeeddadiisu waa?",
            options: [
              "Fahamka waxa access-ku u oggolaanayo (lateral movement, data access)",
              "Kaliya sameynta backup",
              "Kaliya scanning",
              "Ma jiro ujeeddo"
            ],
            answer: 0,
            explain: "Post-exploitation-ku wuxuu muujiyaa full impact-ka business-ka."
          },
          {
            q: "Cleanup marka engagement-ku dhammaado waa muhiim sababtoo ah?",
            options: [
              "Persistence mechanisms-ka la tijaabiyay waa in la tirtiro",
              "Waa optional",
              "Ma jiro sabab",
              "Client-kaaga ayaa iska tirtira"
            ],
            answer: 0,
            explain: "Ku dayn persistence mechanisms wuxuu u yeeli karaa security risk mustaqbalka."
          },
          {
            q: "Data sensitivity discovery (simulated) macnaheedu waa?",
            options: [
              "Eegista haddii files xasaasi ah la heli karo, aan xaqiiq ahaan la xadin",
              "Xatooyada dhabta ah ee xogta",
              "Tirtirida files",
              "Encrypt gareynta files"
            ],
            answer: 0,
            explain: "Pentest-ku wuxuu caddeeyaa access, ma sameeyo dhab ahaan xatooyo."
          },
          {
            q: "Pass-the-Hash technique-ku wuxuu isticmaalaa?",
            options: [
              "NTLM hash halkii password cad loo baahnaa",
              "SSH keys oo keliya",
              "Kerberos tickets oo keliya",
              "Certificate files"
            ],
            answer: 0,
            explain: "PtH waa technique caan ah oo lateral movement Windows ah."
          }
        ],

        exercise: {
          title: "Post-Exploitation Planning",
          steps: [
            "Sharax 3 goals post-exploitation-ka ah.",
            "Naqshadee (concept ahaan) lateral movement scenario Pass-the-Hash isticmaalaya.",
            "Sharax sababta cleanup uu muhiim u yahay.",
            "Qor 2 sababood oo data sensitivity discovery loo simulate gareeyo, ma la xado dhab ahaan."
          ],
          deliverable: "Post-exploitation planning notes."
        }
      },


      {
        slug: "password-attacks-credential-access",
        title: "Password Attacks & Credential Access",
        english: "Password Attacks and Credential Access",
        minutes: 15,

        summary:
          "Faham habab kala duwan oo credential access ah — hash cracking, password spraying, iyo credential stuffing.",

        sections: [
          {
            h: "Hash Cracking Basics (Hashcat/John)",
            p:
            "Marka pentest-ku helo password hashes (tusaale kadib privilege escalation), hashcat ama John the Ripper waxaa loo isticmaalaa in la crack gareeyo — dictionary attacks (rockyou.txt) waa habka ugu dhaqso badan common passwords ahaan."
          },
          {
            h: "Password Spraying",
            p:
            "Password spraying wuxuu tijaabiyaa hal password caan ah (tusaale 'Summer2026!') accounts badan — mid ka duwan brute force (hal account, passwords badan), sababtoo ah wuxuu ka fogaanayaa account lockout policies."
          },
          {
            h: "Credential Stuffing",
            p:
            "Credential stuffing wuxuu isticmaalaa credentials laga xaday breach kale (leaked databases) si loo tijaabiyo isla credentials-ka target cusub — waxay ka faa'iidaystaa password reuse-ka user-yada."
          },
          {
            h: "Detection & Defense",
            p:
            "MFA waa xalka ugu xoogga badan (xitaa password la helay marnaba lama isticmaali karo iyada oo aan MFA la marin). Account lockout policies, rate limiting, iyo monitoring failed login patterns waxay ka hortagaan spraying/stuffing."
          }
        ],

        terms: [
          { term: "Password Spraying", def: "Tijaabinta hal password caan ah accounts badan." },
          { term: "Credential Stuffing", def: "Isticmaalka credentials laga xaday breach kale." }
        ],

        quiz: [
          {
            q: "Password spraying ka duwan tahay brute force sababtoo ah?",
            options: [
              "Hal password, accounts badan — ka fogaanaya lockout policies",
              "Accounts badan, password hal ah — isku mid",
              "Ma jiro farqi",
              "Spraying waa mid ka gaabis"
            ],
            answer: 0,
            explain: "Brute force-ku wuxuu diiradda saaraa hal account, spraying-na accounts badan."
          },
          {
            q: "Credential stuffing wuxuu ka faa'iidaystaa?",
            options: [
              "Password reuse-ka user-yada services kala duwan",
              "Vulnerabilities technical ah oo keliya",
              "Ma jiro faa'iido",
              "Kaliya network misconfigurations"
            ],
            answer: 0,
            explain: "Users-ku badanaa waxay isticmaalaan isla password services badan."
          },
          {
            q: "Xalka ugu xoogga badan ee ka hortagga password attacks-ka waa?",
            options: [
              "MFA",
              "Password complexity requirements oo keliya",
              "Kaliya encryption",
              "Ma jiro xal la helay"
            ],
            answer: 0,
            explain: "MFA-gu wuxuu xannibaa access xitaa password la helay."
          }
        ],

        exercise: {
          title: "Credential Access Techniques Review",
          steps: [
            "Sharax farqiga password spraying iyo brute force.",
            "Sharax sida credential stuffing u shaqeeyo.",
            "Qor tusaale hashcat command ah oo dictionary attack ah.",
            "Naqshadee defense checklist (MFA, lockout, monitoring)."
          ],
          deliverable: "Password attacks and credential access reference."
        }
      },

      {
        slug: "pentest-reporting",
        title: "Penetration Test Reporting",
        english: "Penetration Test Reporting",
        minutes: 12,

        summary:
          "Baro qaab-dhismeedka full pentest report — mid ka duwan vulnerability assessment report, leh narrative iyo attack chains.",

        sections: [
          {
            h: "Pentest Report vs Vulnerability Assessment Report",
            p:
            "Pentest report wuxuu daboolaa attack narrative (sida access loo helay talaabo-talaabo), ma aha kaliya liis vulnerabilities ah. Wuxuu muujiyaa sida vulnerabilities kala duwan isugu jiraan (chaining) si loo gaaro impact weyn."
          },
          {
            h: "Attack Narrative & Kill Chain",
            p:
            "Qeybta 'Attack Narrative' waxay sharaxdaa dhacdada: 'Waxaan ku bilaabnay email phishing simulation ah, kaas oo dhalisay credential shaqaale ah, kaas oo aan ku isticmaalnay VPN access, kaas oo noo oggolaaday lateral movement ilaa Domain Controller-ka.'"
          },
          {
            h: "Executive Summary for Leadership",
            p:
            "Maamulka wuxuu rabaa: heerka guud ee risk-ka ('shirkaddu waxay ku jirtaa halis Critical ah'), dhawr goals ugu waaweyn oo la gaadhay (tusaale: domain admin la helay), iyo talooyin ugu waaweyn 3-5 ah."
          },
          {
            h: "Technical Findings & Evidence",
            p:
            "Qaybta technical-ku waa in ay ku jirto: command-yada la isticmaalay, screenshots, iyo output-ka tools-ka — si qof kale (blue team) uu u fahmo oo u sameeyo dib-u-tijaabin (retest) kadib remediation."
          }
        ],

        terms: [
          { term: "Attack Narrative", def: "Sharaxaad talaabo-talaabo ah oo sida access loo helay." },
          { term: "Attack Chaining", def: "Isku xirka vulnerabilities kala duwan si loo gaaro impact weyn." }
        ],

        quiz: [
          {
            q: "Pentest report-ku ka duwan yahay vulnerability assessment report sababtoo ah?",
            options: [
              "Wuxuu daboolaa attack narrative iyo chaining, ma aha liis oo keliya",
              "Isku mid",
              "Pentest report kama darsana findings",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Attack narrative-ku wuxuu muujiyaa sida vulnerabilities kala duwan isugu jiraan."
          },
          {
            q: "Attack chaining waa?",
            options: [
              "Isku xirka vulnerabilities kala duwan si loo gaaro impact weyn",
              "Hal vulnerability oo keliya",
              "Kaliya scanning",
              "Kaliya reporting"
            ],
            answer: 0,
            explain: "Vulnerabilities laba ah oo Low ah waxay isugu jiri karaan si ay u dhaliyaan Critical impact."
          },
          {
            q: "Executive summary-gu waa in uu ku jiro?",
            options: [
              "Heerka guud ee risk-ka iyo goals la gaadhay",
              "Kaliya command-yada isticmaalay",
              "Kaliya raw scan output",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Maamulku wuxuu rabaa summary, ma aha faahfaahin technical."
          },
          {
            q: "Technical findings-ka muhiim u yahay in ay ku jiraan commands/output sababtoo ah?",
            options: [
              "Si blue team uu u sameeyo dib-u-tijaabin kadib remediation",
              "Si loo kordhiyo bogagga report-ka",
              "Ma jiro sabab",
              "Kaliya loo qoro archive"
            ],
            answer: 0,
            explain: "Reproducibility-ku waa muhiim si loo xaqiijiyo remediation-ku uu shaqeeyay."
          }
        ],

        exercise: {
          title: "Write an Attack Narrative",
          steps: [
            "Isku xir 3 findings tusaale ah (recon + web vuln + privilege escalation).",
            "Qor attack narrative talaabo-talaabo ah oo isku xirta.",
            "Qor executive summary 4 sadar ah oo risk-ka guud sharaxaya.",
            "Naqshadee technical findings section hal finding ah oo leh evidence placeholder."
          ],
          deliverable: "Attack narrative + executive summary draft."
        }
      },


      {
        slug: "final-pentest-capstone",
        title: "Final Penetration Testing Capstone",
        english: "Final Penetration Testing Capstone",
        minutes: 15,

        summary:
          "Isku dar dhammaan xirfadaha koorsadan oo dhan — naqshadee, fuli (concept ahaan), oo qor full pentest report.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad haysataa authorization aad ku samayso full penetration test shirkad tusaale ah — laga bilaabo recon ilaa reporting, isticmaalka dhammaan xirfadaha koorsadan oo dhan (8 module)."
          },
          {
            h: "Phase 1-3: Recon & Scanning",
            p:
            "Naqshadee OSINT/recon plan (module 2), Nmap scanning strategy (module 3), oo aqoonso attack surface-ka."
          },
          {
            h: "Phase 4-5: Vulnerability Analysis & Exploitation",
            p:
            "Naqshadee vulnerability assessment approach (module 7), aqoonso web app vulnerabilities suurtagalka ah (modules 4-6), oo sharax (concept ahaan) exploitation path-ka Metasploit isticmaalaya."
          },
          {
            h: "Phase 6-7: Post-Exploitation & Reporting",
            p:
            "Sharax privilege escalation iyo lateral movement suurtagalka ah, kadibna isku dar dhammaan findings-ka full pentest report oo leh attack narrative iyo executive summary."
          }
        ],

        terms: [
          { term: "Full Engagement Simulation", def: "Isku darka dhammaan 7-da qaybood ee PTES scenario hal ah." }
        ],

        quiz: [
          {
            q: "Full pentest simulation-ku wuxuu isku daraa?",
            options: [
              "Dhammaan xirfadaha 8-da module ee koorsadan",
              "Kaliya scanning",
              "Kaliya reporting",
              "Kaliya exploitation"
            ],
            answer: 0,
            explain: "Capstone-ku wuxuu isku daraa recon, scanning, web security, exploitation, iyo reporting."
          },
          {
            q: "Marka aad naqshadeynayso full engagement, waxa ugu horreeya waa?",
            options: [
              "Scope iyo RoE (pre-engagement)",
              "Isla markiiba exploitation",
              "Reporting",
              "Metasploit setup"
            ],
            answer: 0,
            explain: "PTES-ku wuxuu bilaabmaa pre-engagement — waa in aad ku celceliso module 1."
          },
          {
            q: "Report-ka ugu dambeeya waa in uu isku daro?",
            options: [
              "Attack narrative isku xirta dhammaan phases-ka",
              "Kaliya raw scan output",
              "Kaliya CVSS scores",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Report-ka dhamaystiran wuxuu muujiyaa sida weerarku isugu socday laga bilaabo recon ilaa impact."
          }
        ],

        exercise: {
          title: "Full Penetration Test Simulation & Report",
          steps: [
            "Naqshadee scope iyo RoE scenario-ga (Module 1 skills).",
            "Naqshadee recon + scanning plan (Module 2-3 skills).",
            "Aqoonso web app vulnerabilities suurtagalka ah (Module 4-6 skills).",
            "Sharax vulnerability analysis + exploitation path (Module 7-8 skills).",
            "Diyaari full penetration test report oo leh attack narrative, executive summary, technical findings iyo remediation roadmap (final portfolio centerpiece)."
          ],
          deliverable: "Complete penetration test report — final program deliverable (portfolio centerpiece)."
        }
      },

    ],
  }),
];

export function findEHModule(slug: string) {
  return ethicalHackingModules.find((x) => x.slug === slug);
}

export function findEHLesson(moduleSlug: string, lessonSlug: string) {
  const mod = findEHModule(moduleSlug);
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

export const ethicalHackingTotalLessons = ethicalHackingModules.reduce((n, x) => n + x.lessons, 0);
export const ethicalHackingTotalHours = ethicalHackingModules.reduce((n, x) => n + x.hours, 0);
