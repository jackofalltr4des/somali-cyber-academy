import type { Module } from "./curriculum";

const m = (
  mod: Omit<Module, "lessons" | "topics"> & { topics?: string[] },
): Module => ({
  ...mod,
  topics: mod.topics ?? mod.lessonList.map((l) => l.english),
  lessons: mod.lessonList.length,
});

export const digitalForensicsModules: Module[] = [
  m({
    id: "df1",
    slug: "digital-forensics-fundamentals",
    stage: "Dhexe",
    title: "Aasaaska Digital Forensics",
    english: "Digital Forensics Fundamentals",
    hours: 2,

    outcome:
      "Waxaad fahmi doontaa mabaadi'da forensics-ka, xeerarka sharciga ah, noocyada caddaynta, order of volatility, iyo sida lab-ka forensics loo dhiso.",

    topics: [
      "What is Digital Forensics?",
      "Locard's Exchange Principle",
      "Legal Framework & Search Warrants",
      "Types of Digital Evidence",
      "Order of Volatility",
      "Forensic Lab & Toolset Setup",
      "Fundamentals Capstone Review",
    ],

    lessonList: [

      {
        slug: "what-is-digital-forensics",
        title: "Waa Maxay Digital Forensics?",
        english: "What is Digital Forensics?",
        minutes: 10,

        summary:
          "Faham qeexitaanka digital forensics, noocyada takhasuska, iyo doorka forensic analyst-ka.",

        sections: [
          {
            h: "Qeexitaanka Digital Forensics",
            p:
            "Digital forensics waa cilmiga lagu ururiyo, lagu ilaaliyo, lagu falanqeeyo, oo lagu soo bandhigo caddayn dhijitaal ah si loo taageero baaritaan sharci ah ama shirkadeed. Ujeeddadu waa in la sameeyo taas iyada oo aan la beddelin xogta asalka ah."
          },
          {
            h: "Digital Forensics vs Incident Response",
            p:
            "Incident response-ku wuxuu diiradda saaraa xalinta iyo joojinta dhaqso ah ee dhacdada. Digital forensics-ku wuxuu diiradda saaraa ururinta caddayn si loo maxkamadeeyo ama si sax ah loo falanqeeyo — labaduba way isdhex maraan laakiin waxay leeyihiin ujeeddooyin kala duwan."
          },
          {
            h: "Noocyada Takhasuska Forensics",
            p:
            "Disk forensics (computers, storage), Network forensics (traffic), Memory forensics (RAM), Mobile forensics (phones), Malware forensics (analysis), iyo Cloud forensics (SaaS/IaaS environments). Koorsadan waxaan ku daboolaynaa dhammaan qaybahan."
          },
          {
            h: "Doorka Forensic Analyst-ka",
            p:
            "Forensic analyst wuxuu ka shaqeeyaa law enforcement, shirkadaha DFIR, ama corporate security teams. Shaqadiisu waxay ku jirtaa ururinta caddayn, falanqaynta, qorista warbixin, iyo mararka qaar marag-furid maxkamad."
          }
        ],

        terms: [
          { term: "Digital Forensics", def: "Cilmiga ururinta, ilaalinta iyo falanqaynta caddayn dhijitaal ah." },
          { term: "Evidence Integrity", def: "Xaqiijinta in caddaynta aan la beddelin marka la ururinayo." },
          { term: "DFIR", def: "Digital Forensics and Incident Response — isku darka labada." }
        ],

        quiz: [
          {
            q: "Digital forensics ujeeddadeeda ugu weyn waa?",
            options: [
              "Ururinta iyo falanqaynta caddayn iyada oo aan la beddelin xogta asalka ah",
              "Kaliya xalinta dhaqso ah ee incident-ka",
              "Kaliya sameynta backup",
              "Kaliya beddelidda hardware"
            ],
            answer: 0,
            explain: "Forensics-ku wuxuu diiradda saaraa integrity-ga caddaynta si loo taageero baaritaan."
          },
          {
            q: "Farqiga incident response iyo digital forensics waa?",
            options: [
              "IR wuxuu diiradda saaraa xalinta dhaqso ah, forensics wuxuu diiradda saaraa caddaynta maxkamadeed",
              "Isku mid",
              "Forensics ma khuseeyo IR",
              "IR waa qayb ka mid ah forensics oo keliya"
            ],
            answer: 0,
            explain: "Labaduba way isdhex maraan laakiin ujeeddooyinku way kala duwan yihiin."
          },
          {
            q: "Memory forensics wuxuu diiradda saaraa?",
            options: ["RAM", "Disk storage", "Network traffic", "Mobile devices"],
            answer: 0,
            explain: "Memory forensics-ku wuxuu falanqeeyaa xogta ku jirta RAM waqtiga la qabtay."
          },
          {
            q: "Forensic analyst wuxuu ka shaqeyn karaa?",
            options: [
              "Law enforcement, DFIR firms, ama corporate security teams",
              "Kaliya law enforcement",
              "Kaliya shirkadaha software-ka",
              "Kaliya universities"
            ],
            answer: 0,
            explain: "Forensics skills waxaa loo baahan yahay meelo kala duwan."
          }
        ],

        exercise: {
          title: "Forensics Specialization Mapping",
          steps: [
            "Liis garee 6 noocyada takhasuska forensics.",
            "Nooc kasta u qor tusaale scenario ah oo loo isticmaali lahaa.",
            "Sharax farqiga incident response iyo forensics.",
            "Sharax doorarka kala duwan ee forensic analyst uu qaadan karo."
          ],
          deliverable: "Digital forensics specialization overview."
        }
      },


      {
        slug: "locards-exchange-principle",
        title: "Mabda'a Locard's Exchange",
        english: "Locard's Exchange Principle",
        minutes: 12,

        summary:
          "Faham mabda'a asaasiga ah ee forensics-ka guud — 'every contact leaves a trace' — iyo sida uu ugu dabaqmo dijitaalka.",

        sections: [
          {
            h: "Waa Maxay Locard's Exchange Principle?",
            p:
            "Locard's Exchange Principle (asal ahaan forensic science dhabta ah) wuxuu sheegayaa 'every contact leaves a trace' — nin kastoo wax taabtaa wuxuu ka tagayaa calaamad, wuxuuna sidoo kale qaadanayaa mid. Mabda'aan waxaa loo dabaqaa dijitaalka."
          },
          {
            h: "Sida Mabda'aan Ugu Dabaqmo Dijitaalka",
            p:
            "Marka attacker uu galo system, wuxuu ka tagaa artifacts (logs, timestamps, files) — wuxuuna qaadanayaa macluumaad (system info, network topology). Xitaa attempts la tirtiray waxay ka tagaan trace-yo (deleted file remnants, log gaps)."
          },
          {
            h: "Tusaale Dhijitaal ah",
            p:
            "Malware oo la fuliyay wuxuu ka tagayaa: registry keys, prefetch files, network connections, iyo memory artifacts. Xitaa haddii attacker-ku uu tirtiro malware-ka file-ka, artifacts-yadan way harayaan."
          },
          {
            h: "Sababta Mabda'aan Muhiim u Yahay Analyst-ka",
            p:
            "Mabda'aan wuxuu xaqiijinayaa in weligeed jiri doonto calaamad la raadin karo — shaqada analyst-ku waa inuu raadiyo oo helo trace-yadan, xitaa marka attacker-ku isku dayay inuu qariyo."
          }
        ],

        terms: [
          { term: "Locard's Exchange Principle", def: "Mabda' sheegaya in kontaakto kasta uu ka tago calaamad." },
          { term: "Artifact", def: "Trace/calaamad ka hartay dhaqan dijitaal ah." },
          { term: "Trace Evidence", def: "Caddayn yar oo ka hartay dhacdo." }
        ],

        quiz: [
          {
            q: "Locard's Exchange Principle wuxuu sheegayaa?",
            options: [
              "Kontaakto kasta wuxuu ka tagaa calaamad",
              "Ma jirto calaamad marnaba",
              "Kaliya files-ka la tirtiray ayaa calaamad ka tagaan",
              "Waa mabda' kaliya khuseeya crime scenes dhabta ah"
            ],
            answer: 0,
            explain: "Mabda'aan waa saldhig u ah forensics-ka oo dhan."
          },
          {
            q: "Malware oo file-kiisa la tirtiray wuxuu weli ka tagi karaa?",
            options: [
              "Registry keys, prefetch iyo memory artifacts",
              "Wax kasta oo dhan waa la tirtiraa si buuxda",
              "Ma jiro calaamad ka hartay",
              "Kaliya IP address"
            ],
            answer: 0,
            explain: "Xitaa file la tirtiray, artifacts kale ayaa weli hara."
          },
          {
            q: "Sababta mabda'aan muhiim u yahay analyst-ka waa?",
            options: [
              "Wuxuu xaqiijinayaa in trace jiri doonto oo la raadin karo",
              "Wuxuu kordhinayaa CPU speed",
              "Wuxuu ka saarayaa baahida la raadiyo",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Fahamka mabda'aan wuxuu kuu sheegayaa in weligeed la heli karo calaamad."
          }
        ],

        exercise: {
          title: "Locard's Principle in Digital Contexts",
          steps: [
            "Xulo 3 attacker actions (phishing, malware execution, data exfiltration).",
            "Action kasta u qor artifacts laga yaabo inuu ka tago.",
            "Sharax sida trace-yadan loo raadin lahaa.",
            "Sharax sababta xitaa deletion aanu si buuxda u tirtirayn evidence."
          ],
          deliverable: "Locard's principle application notes."
        }
      },


      {
        slug: "legal-framework-search-warrants",
        title: "Xeerarka Sharciga ah & Search Warrants",
        english: "Legal Framework and Search Warrants",
        minutes: 13,

        summary:
          "Faham xeerarka sharciga ah ee forensics-ka, search warrants, iyo sababta admissibility-du ay muhiim u tahay.",

        sections: [
          {
            h: "Sababta Sharciga Muhiim u Yahay",
            p:
            "Caddayn dhijitaal ah oo aan si sax ah loo ururin waxay noqon kartaa 'inadmissible' (aan la aqbali karin) maxkamadda — xitaa haddii ay caddeynayso dembiga, khaladaad hab-ku (procedural) ayaa keeni kara in caddaynta la diido."
          },
          {
            h: "Search Warrants & Authorization",
            p:
            "Law enforcement-ku waxay u baahan yihiin search warrant si ay u helaan access legal ah caddaynta. Corporate investigations-ku waxay u baahan yihiin authorization gaar ah (employee agreements, company policy). Weligaa ha baarin system aadan haysan authorization sharci ah."
          },
          {
            h: "Admissibility Standards",
            p:
            "Si caddayn loo aqbalo maxkamad, waa in ay ahaato: relevant (la xiriirta case-ka), authentic (la caddeyn karo asalkeeda), iyo reliable (chain of custody sax ah leh). Daubert Standard iyo Frye Standard waa tusaalayaal xeerar caalami ah oo forensic evidence lagu qiimeeyo."
          },
          {
            h: "Privacy Laws & Cross-Border Considerations",
            p:
            "Xogta shakhsiga ah waxaa ku xiran privacy laws sida GDPR (Europe). Investigations-ka caalamiga ah waxay u baahan yihiin la socodka xeerarka dal kasta — data-ku waa laga yaabaa inuu ku jiro jurisdiction kale."
          }
        ],

        terms: [
          { term: "Search Warrant", def: "Oggolaansho sharci ah oo law enforcement u siinaya inay baaraan." },
          { term: "Admissibility", def: "Haddii caddaynta la aqbali karo maxkamad." },
          { term: "Chain of Custody", def: "Diiwaanka dhaq-dhaqaaqa caddaynta laga bilaabo ururinta." }
        ],

        quiz: [
          {
            q: "Caddayn aan si sax ah loo ururin waxay noqon kartaa?",
            options: [
              "Inadmissible (aan la aqbali karin) maxkamadda",
              "Weligeed la aqbali doonaa",
              "Ka fiican caddayn sax ah",
              "Ma jiro cawaaqib"
            ],
            answer: 0,
            explain: "Procedural errors waxay keeni karaan in caddaynta la diido, xitaa haddii ay dhab tahay."
          },
          {
            q: "Corporate investigations-ku waxay u baahan yihiin?",
            options: [
              "Authorization gaar ah (employee agreements, company policy)",
              "Search warrant law enforcement ah oo keliya",
              "Wax authorization ah looma baahna",
              "Kaliya IT department approval"
            ],
            answer: 0,
            explain: "Shirkadaha waxay leeyihiin xeerar authorization gaar ah oo ka duwan law enforcement."
          },
          {
            q: "Admissibility-gu wuxuu u baahan yahay caddaynta inay ahaato?",
            options: [
              "Relevant, authentic, reliable",
              "Kaliya la ururiyay degdeg ah",
              "Kaliya digital ah",
              "Ma jiraan shuruudo"
            ],
            answer: 0,
            explain: "Saddexdan shuruudood waa aasaaska admissibility standards-ka."
          },
          {
            q: "GDPR sababta ay khusayso digital forensics waa?",
            options: [
              "Waxay xaddidaa sida xogta shakhsiga ah loo maareeyo, gaar ahaan Europe",
              "Ma khuseeyo forensics marnaba",
              "Waa kaliya US law",
              "Waxay kaliya khusaysaa email"
            ],
            answer: 0,
            explain: "Privacy laws-ku waxay saameeyaan sida investigations-ku u qaataan xogta shakhsiga ah."
          }
        ],

        exercise: {
          title: "Legal Framework Review",
          steps: [
            "Sharax sababta chain of custody uu u xiriiro admissibility.",
            "Qor tusaale scenario ah oo search warrant loo baahan yahay iyo mid kale oo corporate authorization loo baahan yahay.",
            "Sharax saddexda shuruudood ee admissibility.",
            "Sharax sababta cross-border investigations ay adag yihiin."
          ],
          deliverable: "Legal framework study notes."
        }
      },


      {
        slug: "types-of-digital-evidence",
        title: "Noocyada Caddaynta Dhijitaalka ah",
        english: "Types of Digital Evidence",
        minutes: 15,

        summary:
          "Faham kala duwanaanshaha caddaynta dhijitaalka ah — volatile vs non-volatile, direct vs circumstantial.",

        sections: [
          {
            h: "Volatile vs Non-Volatile Evidence",
            p:
            "Volatile evidence (RAM, network connections, running processes) waxay lumaan marka nidaamka la damiyo. Non-volatile evidence (disk data, files, logs kaydsan) way sii jirtaan xitaa nidaamku damaan yahay."
          },
          {
            h: "Direct vs Circumstantial Evidence",
            p:
            "Direct evidence si toos ah ayay u caddeeyaan dhacdo (tusaale: video CCTV ah oo muujinaya qofka). Circumstantial evidence waxay soo jeedisaa dhacdo iyada oo aan si toos ah u caddeynayn (tusaale: login logs oo muujinaya user account la isticmaalay)."
          },
          {
            h: "Best Evidence Rule",
            p:
            "Best Evidence Rule wuxuu sheegayaa in copy sax ah (forensic image) loo isticmaalo halkii original hardware-ka la taaban lahaa — original-ka waa in la ilaaliyaa, forensic image-ka ayaa la falanqeeyaa."
          },
          {
            h: "Digital Evidence Sources",
            p:
            "Computers/laptops, mobile devices, cloud storage, IoT devices, network devices, iyo removable media (USB drives, external HDDs). Investigator-ku waa inuu tixgeliyo dhammaan sources-kan marka uu baarayo."
          }
        ],

        terms: [
          { term: "Volatile Evidence", def: "Caddayn lumi karta marka nidaamka la damiyo (RAM, connections)." },
          { term: "Non-Volatile Evidence", def: "Caddayn sii jirta xitaa nidaamku damaan yahay." },
          { term: "Best Evidence Rule", def: "Mabda' sheegaya isticmaalka forensic image halkii original-ka." }
        ],

        quiz: [
          {
            q: "Tusaale volatile evidence ah waa?",
            options: ["RAM", "Files kaydsan disk-ka", "Backup tapes", "Archived emails"],
            answer: 0,
            explain: "RAM way lumaysaa marka nidaamku damaan yahay."
          },
          {
            q: "Login logs oo muujinaya user account waa tusaale?",
            options: ["Direct evidence", "Circumstantial evidence", "Ma jiro evidence type", "Volatile evidence oo keliya"],
            answer: 1,
            explain: "Logs-ku si toos ah uma caddeeyaan qofka, laakiin waxay soo jeedin karaan."
          },
          {
            q: "Best Evidence Rule wuxuu sheegayaa?",
            options: [
              "Isticmaal forensic image, ilaali original-ka",
              "Waligeed isticmaal original-ka oo keliya",
              "Ma jiro qaanuun sidan",
              "Tirtir original-ka kadib image-ga"
            ],
            answer: 0,
            explain: "Image-ka forensic-ku waa la falanqeeyaa, original-ku waa la ilaaliyaa."
          },
          {
            q: "Sources-ka caddaynta dhijitaalka ah waxaa ka mid ah?",
            options: [
              "Computers, mobile devices, cloud, IoT devices",
              "Kaliya computers",
              "Kaliya mobile devices",
              "Kaliya cloud storage"
            ],
            answer: 0,
            explain: "Digital evidence sources-ku waa kuwo faro badan oo kala duwan."
          }
        ],

        exercise: {
          title: "Evidence Classification Practice",
          steps: [
            "Xulo 6 tusaale evidence ah oo scenario incident ah.",
            "Kala saar volatile/non-volatile mid kasta.",
            "Kala saar direct/circumstantial mid kasta.",
            "Sharax sababta Best Evidence Rule loo dabaqi lahaa."
          ],
          deliverable: "Evidence classification worksheet."
        }
      },


      {
        slug: "order-of-volatility-df",
        title: "Order of Volatility",
        english: "Order of Volatility",
        minutes: 11,

        summary:
          "Faham qoto dheer heerarka order of volatility iyo sababta tartiibku uu muhiim u yahay evidence collection.",

        sections: [
          {
            h: "Heerarka Order of Volatility",
            p:
            "1) CPU registers/cache (nanoseconds). 2) RAM (minutes-hours). 3) Network state/routing tables. 4) Running processes. 5) Disk. 6) Remote logging/monitoring data. 7) Physical configuration/network topology. 8) Archival media/backups."
          },
          {
            h: "Sababta Tartiibku Uu Muhiim u Yahay",
            p:
            "Marka la ururinayo evidence, waa in la bilaabo waxa ugu dhaqso badan ee luma. Haddii aad marka hore disk-ka image-gareyso oo aad qaadatid RAM dambe, xogta RAM-ku way iska beddeli kartaa ama way lumaan kartaa — order-ka ayaa lagu ilaalinayaa maximum evidence."
          },
          {
            h: "Impact-ka Real-World ah",
            p:
            "Fileless malware wuxuu ku noolyahay RAM oo keliya — haddii aan memory la qabanin ka hor la damiyo mashiinka, evidence-kaas wuu lumayaa waligiis. Sidaas darteed, memory acquisition waa marka badan tallaabo ugu horreysa ee dhabta ah."
          },
          {
            h: "Balancing Speed & Thoroughness",
            p:
            "Xaaladaha production-ka ah, waa in la isku dheellitiraa u baahanka in xogta la ilaaliyo iyo baahida in business-ku uu sii socdo. Marmarka qaarkood, decision-ka isolation vs. live capture waa in laga fikiraa qoto dheer."
          }
        ],

        terms: [
          { term: "Order of Volatility", def: "Tartiibka la ururiyo evidence, laga bilaabo mid ugu dhaqso badan ee luma." },
          { term: "Fileless Malware", def: "Malware ku noolaada memory-ga oo keliya, aan file disk ku jirin." }
        ],

        quiz: [
          {
            q: "Kee ka mid ah kuwan ka ugu horreeya order of volatility?",
            options: ["CPU registers/cache", "Disk", "Backups", "Network topology"],
            answer: 0,
            explain: "CPU registers/cache waa kuwa ugu dhaqso badan ee luma."
          },
          {
            q: "Fileless malware sababtoo ah muhiim u yahay in memory la qabto ka hor damiyaa?",
            options: [
              "Malware-ku wuxuu ku noolaadaa memory-ga oo keliya, wuxuu lumayaa marka la damiyo",
              "Malware-ku disk-ka ayuu ku jiraa",
              "Ma jiro isticmaal",
              "Waa kaliya theoretical"
            ],
            answer: 0,
            explain: "Evidence-kan waa mid aan la heli karin haddii memory aan la qabanin ka hor damidda."
          },
          {
            q: "Sababta order of volatility loo raaco waa?",
            options: [
              "Si loo ilaaliyo evidence-ka ugu badan ka hor uu lumo",
              "Si loo kordhiyo speed-ka scan-ka",
              "Ma jiro sabab",
              "Si loo yareeyo storage"
            ],
            answer: 0,
            explain: "Ururinta habka khaldan waxay keeni kartaa evidence loss ah oo aan la soo celin karin."
          }
        ],

        exercise: {
          title: "Order of Volatility Application",
          steps: [
            "Qor 8-da heerarka order of volatility.",
            "Xulo scenario (ransomware suspected).",
            "Naqshadee collection plan-ka oo raacaya order-ka.",
            "Sharax sababta memory-ga marka hore loo qaadan lahaa."
          ],
          deliverable: "Evidence collection order plan."
        }
      },


      {
        slug: "forensic-lab-toolset-setup",
        title: "Forensic Lab & Toolset Setup",
        english: "Forensic Lab and Toolset Setup",
        minutes: 14,

        summary:
          "Baro sida forensic lab loo dhiso iyo tools-ka aasaasiga ah ee industry-gu isticmaalo.",

        sections: [
          {
            h: "Forensic Workstation Requirements",
            p:
            "Forensic workstation wuxuu u baahan yahay storage badan (evidence images waa kuwo waaweyn), write-blockers (hardware/software), oo isolated network (si aan evidence-ku ugu xirnayn internet-ka)."
          },
          {
            h: "Free & Open-Source Tools",
            p:
            "Autopsy (disk analysis GUI), Volatility (memory analysis), Wireshark (network), SIFT Workstation (Linux forensics distro leh tools badan), Eric Zimmerman Tools (Windows artifacts parsing)."
          },
          {
            h: "Commercial Tools Overview",
            p:
            "FTK (Forensic Toolkit), EnCase, iyo Cellebrite (mobile forensics) waa tools commercial ah oo industry-gu si weyn u isticmaalo — waxay bixiyaan automation iyo support badan, laakiin waa qaali."
          },
          {
            h: "Write-Blockers & Evidence Handling",
            p:
            "Write-blocker (hardware ama software) wuxuu ka hortagaa in wax laga beddelo original evidence-ka marka la image-gareynayo. Waligaa ha ku shaqayn evidence original ah — had iyo jeer isticmaal forensic image."
          }
        ],

        terms: [
          { term: "Write-Blocker", def: "Qalab ka hortaga wax laga beddelo original evidence." },
          { term: "Autopsy", def: "Tool bilaash ah oo GUI leh oo disk forensics ah." },
          { term: "SIFT Workstation", def: "Linux distro leh forensics tools badan oo horay loo rakibay." }
        ],

        quiz: [
          {
            q: "Sababta forensic workstation loo baahan yahay isolated network waa?",
            options: [
              "Si aan evidence-ku ugu xirnayn internet-ka ama la beddelin",
              "Si loo kordhiyo internet speed",
              "Si loo yareeyo storage",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Isolation-ku wuxuu ilaaliyaa evidence-ka integrity-giisa."
          },
          {
            q: "Autopsy waa?",
            options: [
              "Tool bilaash ah oo GUI ah oo disk forensics ah",
              "Tool memory forensics oo keliya",
              "Tool mobile forensics oo keliya",
              "Hardware write-blocker"
            ],
            answer: 0,
            explain: "Autopsy waa mid ka mid ah tools-ka ugu caansan disk analysis-ka."
          },
          {
            q: "Write-blocker wuxuu sameeyaa?",
            options: [
              "Ka hortagaa in wax laga beddelo original evidence marka la image-gareynayo",
              "Wuxuu kordhinayaa xawaaraha imaging-ka",
              "Wuxuu tirtiraa deleted files",
              "Wuxuu encrypt gareeyaa disk-ka"
            ],
            answer: 0,
            explain: "Write-blocker-ku wuxuu xaqiijinayaa evidence integrity."
          },
          {
            q: "Sababta la isticmaalo forensic image halkii original evidence-ka la taaban lahaa waa?",
            options: [
              "Si loo ilaaliyo original-ka oo loo yareeyo khatarta wax laga beddelo",
              "Si loo kordhiyo speed",
              "Waa waajib sharci ah oo keliya",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Original evidence-ka waa in la ilaaliyaa si buuxda, falanqaynta ha lagu sameeyo image-ka."
          }
        ],

        exercise: {
          title: "Forensic Toolset Research",
          steps: [
            "Liis garee 5 open-source forensic tools iyo shaqadooda.",
            "Sharax farqiga commercial iyo open-source tools.",
            "Sharax sababta write-blocker uu muhiim u yahay.",
            "Naqshadee liis workstation requirements ah oo lab yar ah."
          ],
          deliverable: "Forensic toolset reference sheet."
        }
      },


      {
        slug: "fundamentals-capstone-review",
        title: "Fundamentals — Capstone Review",
        english: "Digital Forensics Fundamentals Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee full scenario planning oo forensic investigation ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Shirkad tusaale ah ayaa hesha alert ah in laptop maamule ah uu leeyahay dhaqdhaqaaq shaki leh. Waxaad la yeelaneysaa authorization aad ku qabato investigation forensic ah."
          },
          {
            h: "Legal & Authorization Check",
            p:
            "Ka hor wax kasta oo la sameeyo, xaqiiji authorization-ka. Sharax noocyada authorization ee corporate vs law enforcement."
          },
          {
            h: "Evidence Identification",
            p:
            "Aqoonso noocyada evidence-ka laga yaabo in la ururiyo (volatile/non-volatile) iyo order-ka collection-ka."
          },
          {
            h: "Toolset Planning",
            p:
            "Naqshadee liis tools-ka aad u baahan lahayd investigation-kan (memory acquisition, disk imaging, write-blockers)."
          }
        ],

        terms: [
          { term: "Investigation Planning", def: "Habka la naqshadeeyo baaritaan forensic ah ka hor la bilaabo." }
        ],

        quiz: [
          {
            q: "Tallaabada ugu horreysa ee investigation kasta waa?",
            options: [
              "Xaqiijinta authorization-ka",
              "Isla markiiba disk imaging",
              "Warbixinta",
              "Tirtirida logs"
            ],
            answer: 0,
            explain: "Waa waajib in authorization la xaqiijiyo ka hor wax kasta oo kale."
          },
          {
            q: "Order of volatility-gu wuxuu hagaa?",
            options: [
              "Tartiibka evidence collection-ka",
              "Reporting format-ka",
              "Legal authorization",
              "Tool selection oo keliya"
            ],
            answer: 0,
            explain: "Order-ku wuxuu xaqiijinayaa in evidence-ka ugu dhaqso badan la ururiyo marka hore."
          },
          {
            q: "Toolset planning-ku waa in uu ku jiro?",
            options: [
              "Memory acquisition, disk imaging, write-blockers",
              "Kaliya antivirus",
              "Kaliya backup software",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Investigation buuxa wuxuu u baahan yahay tools kala duwan oo phase kasta."
          }
        ],

        exercise: {
          title: "Full Investigation Planning Document",
          steps: [
            "Xaqiiji authorization-ka scenario-ga (corporate).",
            "Aqoonso 5 noocyada evidence-ka laga yaabo in la helo.",
            "Naqshadee order of volatility collection plan.",
            "Liis garee toolset-ka aad u baahan lahayd (portfolio-ready)."
          ],
          deliverable: "Investigation planning document (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "df2",
    slug: "evidence-collection-chain-of-custody",
    stage: "Dhexe",
    title: "Evidence Collection & Chain of Custody",
    english: "Evidence Collection & Chain of Custody",
    hours: 1,

    outcome:
      "Waxaad si adag u fahmi doontaa chain of custody, evidence collection procedures, write-blockers, hashing iyo documentation standards.",

    topics: [
      "Chain of Custody Fundamentals",
      "Evidence Collection Procedures",
      "Write-Blockers & Imaging Basics",
      "Hashing & Integrity Verification",
      "Evidence Documentation & Labeling",
      "Handling Evidence at the Scene",
      "Evidence Collection Capstone",
    ],

    lessonList: [

      {
        slug: "chain-of-custody-fundamentals",
        title: "Aasaaska Chain of Custody",
        english: "Chain of Custody Fundamentals",
        minutes: 12,

        summary:
          "Faham qoto dheer chain of custody — waxa uu ka kooban yahay iyo sababta uu waajib u yahay.",

        sections: [
          {
            h: "Waa Maxay Chain of Custody?",
            p:
            "Chain of custody waa diiwaanka isku xigxiga ee muujinaya cidda qaadatay evidence-ka, goorma, halkee la geeyay, iyo cidda gacanta ku haysay marka kasta. Waa in aan ay jirin 'gaps' waqti ah oo aan la sharxin."
          },
          {
            h: "Qaybaha Chain of Custody Log",
            p:
            "Description evidence-ka, item number/serial, waqtiga la ururiyay, magaca qofka ururiyay, meesha laga ururiyay, hash value, iyo diiwaanka wareejinta (transfer) mid kasta oo cid u wareejisay cid kale."
          },
          {
            h: "Sababta Gaps-ku U Halis Yihiin",
            p:
            "Haddii chain-ku jabo (tusaale, evidence oo maalin gudaheed aan la ogeyn cidda haysta), defense attorney-gu wuxuu ku doodi karaa evidence-ka in la beddelay — taasoo ka dhigi karta evidence-ka mid aan la aqbali karin."
          },
          {
            h: "Digital Chain of Custody",
            p:
            "Marka la falanqeynayo digital evidence, hash values (SHA256) ayaa loo isticmaalaa in la caddeeyo forensic image-ku uusan isbeddelin. Hash-ka waa in la diiwaan geliyaa marka la sameynayo image-ka iyo mar kasta oo la falanqeynayo."
          }
        ],

        terms: [
          { term: "Chain of Custody", def: "Diiwaanka isku xigxiga ee dhaqdhaqaaqa evidence-ka." },
          { term: "Custody Gap", def: "Waqti aan la sharxin oo cidda evidence-ka haysay aan la ogayn." },
          { term: "Hash Value", def: "Astaan lagu xaqiijiyo integrity-ga file/image-ka." }
        ],

        quiz: [
          {
            q: "Chain of custody waa?",
            options: [
              "Diiwaanka isku xigxiga ee cidda haysay evidence-ka waqti kasta",
              "Kaliya magaca qofka ururiyay evidence-ka",
              "Kaliya taariikhda la ururiyay",
              "Ma jiro qeexid gaar ah"
            ],
            answer: 0,
            explain: "Chain of custody-gu waa dhammaan dhaqdhaqaaqa ee evidence-ka."
          },
          {
            q: "Custody gap wuxuu keeni karaa?",
            options: [
              "Evidence-ka in maxkamad lagu shakiyo",
              "Kordhinta evidence quality",
              "Wax dhib ah ma jiraan",
              "Kaliya delay yar"
            ],
            answer: 0,
            explain: "Gap-ku wuxuu u ogolaadaa defense inay ka doodaan evidence-ka wax laga beddelay."
          },
          {
            q: "Hash value digital evidence ahaan waxaa loo isticmaalaa?",
            options: [
              "Xaqiijinta in image-ku uusan isbeddelin",
              "Encrypt gareynta evidence-ka",
              "Kaydinta backup",
              "Beddelidda file format"
            ],
            answer: 0,
            explain: "SHA256 hash-ku wuxuu caddeeyaa integrity-ga."
          },
          {
            q: "Chain of custody log-ku waa in uu ku jiro?",
            options: [
              "Description, item number, waqti, magaca qofka, hash value",
              "Kaliya magaca qofka",
              "Kaliya waqtiga",
              "Ma jiraan shuruudo"
            ],
            answer: 0,
            explain: "Documentation dhamaystiran waa muhiim si loo ilaaliyo integrity-ga sharciga ah."
          }
        ],

        exercise: {
          title: "Chain of Custody Documentation",
          steps: [
            "Naqshadee chain of custody log template.",
            "Buuxi tusaale: laptop evidence ah oo qaaday analyst-ka, gudbisay lab-ka.",
            "Sharax sida gap la iska ilaaliyo.",
            "Sharax sida hash value loogu daro documentation-ka."
          ],
          deliverable: "Chain of custody log template + tusaale buuxa."
        }
      },


      {
        slug: "evidence-collection-procedures",
        title: "Habraacyada Ururinta Evidence",
        english: "Evidence Collection Procedures",
        minutes: 10,

        summary:
          "Baro habraacyada standard-ka ah ee la raaco marka digital evidence la ururinayo.",

        sections: [
          {
            h: "Pre-Collection Planning",
            p:
            "Ka hor collection, waxaad u baahan tahay: authorization xaqiijisan, tools/equipment diyaar ah, oo qorshe cad oo tilmaamaya sida la sameyn doono order of volatility."
          },
          {
            h: "Live System vs Powered-Off Collection",
            p:
            "Live collection (memory ka hor damidda) wuxuu ilaalinayaa volatile evidence, laakiin wuxuu khatar gelin karaa system-ka wax laga beddelo. Powered-off collection wuxuu ilaalinayaa disk state-ka laakiin wuxuu lumin karaa memory."
          },
          {
            h: "Standard Operating Procedures (SOPs)",
            p:
            "Shirkadaha waaweyn waxay leeyihiin SOPs qoran oo qeexaya tallaabooyinka sax ah ee collection kasta — consistency-gu wuxuu yareeyaa qaladaad, wuxuuna kordhinayaa admissibility."
          },
          {
            h: "Multiple Evidence Sources",
            p:
            "Investigation-ku badanaa wuxuu daboolaa devices badan (laptop, phone, cloud accounts). Waa in la sameeyo collection plan oo kala saaraya mudnaanta iyo tartiibka mid kasta."
          }
        ],

        terms: [
          { term: "SOP", def: "Standard Operating Procedure — hab qoran oo la raaco si joogto ah." },
          { term: "Live Collection", def: "Ururinta evidence system-ku shaqeynayo (aan la damin)." }
        ],

        quiz: [
          {
            q: "Live collection sababta loo doorto marmarka qaarkood waa?",
            options: [
              "Si loo ilaaliyo volatile evidence sida memory-ga",
              "Si loo yareeyo waqtiga",
              "Waa mid keliya la isticmaalo",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Memory iyo state-ka joogto ah way lumaan haddii mashiinka la damiyo marka hore."
          },
          {
            q: "SOPs faa'iidadooda ugu weyn waa?",
            options: [
              "Yareynta qaladaadka iyo kordhinta admissibility",
              "Kordhinta waqtiga la qaato",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo law enforcement"
            ],
            answer: 0,
            explain: "Consistency wuxuu kordhinayaa kalsoonida caddaynta."
          },
          {
            q: "Pre-collection planning waa in ay ku jirto?",
            options: [
              "Authorization, tools, qorshe order of volatility ah",
              "Kaliya taariikhda",
              "Kaliya magaca qofka",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Diyaarinta hore waxay yareysaa qaladaad marka collection-ku bilaabmo."
          }
        ],

        exercise: {
          title: "Collection Procedure Design",
          steps: [
            "Xulo scenario (laptop, phone, cloud account saameeyay).",
            "Naqshadee collection order iyadoo lagu saleynayo volatility.",
            "Go'aami live ama powered-off collection mid kasta device.",
            "Qor SOP gaaban oo lagu raaco."
          ],
          deliverable: "Evidence collection procedure document."
        }
      },


      {
        slug: "write-blockers-imaging-basics",
        title: "Write-Blockers & Imaging Basics",
        english: "Write-Blockers and Disk Imaging Basics",
        minutes: 13,

        summary:
          "Faham sida write-blockers u shaqeeyaan iyo aasaaska disk imaging (bit-by-bit copying).",

        sections: [
          {
            h: "Hardware vs Software Write-Blockers",
            p:
            "Hardware write-blockers waa qalab jireed oo u dhexeeya disk-ka iyo forensic workstation-ka, kuwas oo si joogto ah u xannibaya write commands. Software write-blockers waa configuration OS-level ah oo isku shaqo sameeya."
          },
          {
            h: "Bit-by-Bit (Forensic) Imaging",
            p:
            "Forensic image (bit-by-bit copy) wuxuu nuqul ka sameeyaa dhammaan bits-ka disk-ka, oo ay ku jiraan unallocated space (halka files la tirtiray ee weli jiraan). Tani way ka duwan tahay backup caadi ah (files oo keliya)."
          },
          {
            h: "Imaging Formats",
            p:
            "Raw (dd) waa qaab fudud oo bit-copy ah. E01 (EnCase) wuxuu ku daraa metadata iyo compression. AFF (Advanced Forensic Format) waa qaab open-source ah. Format-ka kasta wuxuu leeyahay faa'iidooyin/qasab."
          },
          {
            h: "Verification After Imaging",
            p:
            "Kadib imaging-ka, waa waajib in la xisaabiyo hash (SHA256) source-ka iyo image-ka labadaba, oo la barbardhigo — haddii ay isku mid yihiin, image-ku waa forensically sound."
          }
        ],

        terms: [
          { term: "Bit-by-Bit Imaging", def: "Nuqul buuxa oo bits-ka disk-ka oo dhan ah, unallocated space-na ku jira." },
          { term: "E01", def: "Format imaging ah oo EnCase isticmaalo, leh metadata." },
          { term: "Unallocated Space", def: "Meesha disk-ka ee aan la isticmaalin, laakiin data hore ku jira." }
        ],

        quiz: [
          {
            q: "Forensic image (bit-by-bit) ka duwan yahay backup caadi ah sababtoo ah?",
            options: [
              "Wuxuu ku daraa unallocated space, ma aha files oo keliya",
              "Waa mid ka fudud",
              "Isku mid",
              "Wuxuu kaydiyaa kaliya files nuqul ah"
            ],
            answer: 0,
            explain: "Forensic image-ku wuxuu ka mid yahay dhammaan bits-ka, halka backup-ku uu kaliya files kaydiyo."
          },
          {
            q: "Kadib imaging-ka, tallaabada waajibka ah waa?",
            options: [
              "Xisaabinta hash source iyo image, barbardhigga labadaba",
              "Tirtirida original-ka",
              "Kordhinta storage",
              "Ma jirto tallaabo dheeraad ah"
            ],
            answer: 0,
            explain: "Hash verification-ku wuxuu caddeeyaa integrity-ga image-ka."
          },
          {
            q: "Hardware write-blocker wuxuu sameeyaa?",
            options: [
              "Xannibaya write commands si joogto ah oo qalab jireed ah",
              "Wuxuu tirtiraa data",
              "Wuxuu kordhinayaa speed",
              "Wuxuu encrypt gareeyaa disk"
            ],
            answer: 0,
            explain: "Write-blocker-ku wuxuu ilaaliyaa original-ka wax laga beddelo."
          }
        ],

        exercise: {
          title: "Imaging Process Documentation",
          steps: [
            "Sharax farqiga hardware iyo software write-blockers.",
            "Sharax tallaabooyinka bit-by-bit imaging (concept ahaan).",
            "Sharax farqiga raw, E01, iyo AFF formats.",
            "Naqshadee verification checklist kadib imaging."
          ],
          deliverable: "Disk imaging process documentation."
        }
      },


      {
        slug: "hashing-integrity-verification",
        title: "Hashing & Integrity Verification",
        english: "Hashing and Integrity Verification",
        minutes: 10,

        summary:
          "Faham qoto dheer sida hashing algorithms u shaqeeyaan iyo sababta ay muhiim u yihiin evidence integrity.",

        sections: [
          {
            h: "Waa Maxay Hashing?",
            p:
            "Hash function waa algorithm soo saarta 'fingerprint' gaar ah (string dherer go'an leh) oo file kasta u gaar ah. Xitaa isbeddel yar (hal bit) wuxuu si buuxda u beddelaa hash-ka soo baxa."
          },
          {
            h: "MD5, SHA1 vs SHA256",
            p:
            "MD5 iyo SHA1 waa algorithms hore, hadda la ogaaday inay leeyihiin collisions (laba file oo kala duwan oo isla hash leh) — waxaa loo isticmaalaa dhawr forensics goobood weli, laakiin SHA256 ayaa maanta standard-ka ah."
          },
          {
            h: "Hashing in Practice",
            p:
            "Marka forensic image la sameeyo, hash-ka source (original) iyo image-ka labadaba waa la xisaabiyaa. Waqti kasta oo la falanqeeyo mustaqbalka, hash-ka dib ayaa loo xisaabiyaa si loo xaqiijiyo aan wax isbeddelin."
          },
          {
            h: "File-Level Hashing for Known Files",
            p:
            "Hash databases (NSRL — National Software Reference Library) waxaa loo isticmaalaa in la kala saaro known-good files (system files caadiga ah) iyo files aan la yaqaan (potentially interesting), taasoo yareysa waqtiga baaritaanka."
          }
        ],

        terms: [
          { term: "Hash Function", def: "Algorithm soo saarta fingerprint gaar ah oo file u gaar ah." },
          { term: "Collision", def: "Marka laba file kala duwan ay isla hash leeyihiin." },
          { term: "NSRL", def: "Database hash-yada known files ah oo la isticmaalo si loo kala saaro." }
        ],

        quiz: [
          {
            q: "Isbeddel hal bit ah oo file ah wuxuu sameeyaa?",
            options: [
              "Wuxuu si buuxda u beddelaa hash-ka soo baxa",
              "Ma saameeyo hash-ka",
              "Wuxuu kaliya beddelaa qayb hash-ka ah",
              "Wuxuu tirtiraa file-ka"
            ],
            answer: 0,
            explain: "Hash functions-ku waa 'avalanche effect' leh — isbeddel yar = hash gebi ahaanba kala duwan."
          },
          {
            q: "SHA256 waa?",
            options: [
              "Standard-ka casriga ah ee hashing forensics ah",
              "Algorithm duugoobay oo aan la isticmaalin",
              "Encryption algorithm oo keliya",
              "Compression tool"
            ],
            answer: 0,
            explain: "SHA256 ayaa maanta loo isticmaalaa evidence integrity."
          },
          {
            q: "NSRL database-ku waxay caawisaa?",
            options: [
              "Kala saaridda known-good files iyo files aan la yaqaan si loo yareeyo baaritaanka",
              "Encrypt gareynta files",
              "Sameynta backup",
              "Beddelidda file names"
            ],
            answer: 0,
            explain: "NSRL wuxuu yareeyaa waqtiga baaritaanka isaga oo ka saaraya files caadiga ah."
          },
          {
            q: "Collision hashing ahaan waa?",
            options: [
              "Laba file kala duwan oo isla hash leh",
              "File la tirtiray",
              "Encryption jabtay",
              "Backup guuldarraystay"
            ],
            answer: 0,
            explain: "MD5/SHA1 waxaa lagu ogaaday collisions, sidaas darteed SHA256 ayaa la doorbidaa."
          }
        ],

        exercise: {
          title: "Hashing Practice",
          steps: [
            "Sharax sida hash-ku u beddelmo marka file la beddelo.",
            "Sharax farqiga MD5, SHA1 iyo SHA256.",
            "Sharax sida NSRL loo isticmaali lahaa investigation.",
            "Naqshadee hash verification checklist forensic image ah."
          ],
          deliverable: "Hashing and integrity verification notes."
        }
      },


      {
        slug: "evidence-documentation-labeling",
        title: "Evidence Documentation & Labeling",
        english: "Evidence Documentation and Labeling",
        minutes: 12,

        summary:
          "Baro sida evidence loo documentgareeyo, loo labelgareeyo, oo loo kaydiyo si sax ah.",

        sections: [
          {
            h: "Evidence Tags & Labels",
            p:
            "Item kasta oo la ururiyo waa in uu leeyahay label unique ah (case number, item number, date/time, cidda ururisay). Labels-ku waa in ay ahaadaan kuwo aan si fudud u tirtirmi karin ama u beddelmi karin."
          },
          {
            h: "Photography & Scene Documentation",
            p:
            "Ka hor wax la taabto, qaado sawirro faahfaahsan oo muujinaya xaaladda asalka ah (screen state, cables, physical layout). Sawirradan waxay taageeraan documentation-ka guud."
          },
          {
            h: "Evidence Storage & Physical Security",
            p:
            "Evidence-ka jireed (laptops, drives) waa in la kaydiyaa meel ammaan ah oo leh access xaddidan (evidence locker/room), oo access-ka mid kasta la diiwaan geliyo."
          },
          {
            h: "Digital Evidence Repository",
            p:
            "Forensic images waa in la kaydiyaa storage encrypted ah oo backup leh. Access-ka digital evidence-ka waa in la xakameeyo permissions, oo dhammaan access attempts la diiwaan geliyo (audit logs)."
          }
        ],

        terms: [
          { term: "Evidence Tag", def: "Label unique ah oo item kasta lagu calaamadeeyo." },
          { term: "Evidence Locker", def: "Meel ammaan ah oo evidence jireed lagu kaydiyo." }
        ],

        quiz: [
          {
            q: "Evidence label kasta waa in uu ku jiro?",
            options: [
              "Case number, item number, date/time, cidda ururisay",
              "Kaliya magaca file-ka",
              "Kaliya taariikhda",
              "Ma jiraan shuruudo"
            ],
            answer: 0,
            explain: "Labels dhamaystiran waxay taageeraan chain of custody-ga."
          },
          {
            q: "Sababta sawirro loo qaato ka hor wax la taabto waa?",
            options: [
              "Si loo diiwaan geliyo xaaladda asalka ah",
              "Si loo kordhiyo file size",
              "Ma jiro sabab",
              "Kaliya loo isticmaalo social media"
            ],
            answer: 0,
            explain: "Documentation-ka sawirka wuxuu caddeeyaa xaaladda scene-ka ka hor wax la beddelo."
          },
          {
            q: "Digital evidence repository waa in uu ahaado?",
            options: [
              "Encrypted, backup leh, access xaddidan",
              "Furan qof kasta",
              "Aan backup lahayn",
              "Ma jiraan shuruudo"
            ],
            answer: 0,
            explain: "Security-ga repository-ga wuxuu ilaaliyaa integrity iyo confidentiality-ga evidence-ka."
          }
        ],

        exercise: {
          title: "Evidence Documentation Practice",
          steps: [
            "Naqshadee evidence tag template.",
            "Qor checklist sawir-qaadista scene-ka.",
            "Sharax sida evidence locker loo maareeyo.",
            "Naqshadee digital evidence repository access policy gaaban."
          ],
          deliverable: "Evidence documentation and storage plan."
        }
      },


      {
        slug: "handling-evidence-at-scene",
        title: "Handling Evidence at the Scene",
        english: "Handling Digital Evidence at the Scene",
        minutes: 13,

        summary:
          "Faham tallaabooyinka la raaco marka la joogo scene dhabta ah oo evidence dhijitaal ah leh.",

        sections: [
          {
            h: "Initial Scene Assessment",
            p:
            "Marka aad gaadho scene, marka hore go'aami: mashiinka miyuu shaqeynayaa? Miyuu ku xiran yahay network-ka? Waa maxay devices-ka kale ee la ururin karo?"
          },
          {
            h: "To Pull or Not to Pull the Plug",
            p:
            "Suicide-ka electricity-ga si toos ah (pulling the plug) wuxuu ilaalinayaa disk state-ka (tusaale ransomware oo weli encrypt gareynaya), laakiin wuxuu lumin memory-ga. Go'aan-kani wuxuu ku xiran yahay scenario-ga gaarka ah."
          },
          {
            h: "Isolating Network Access",
            p:
            "Haddii mashiinka la doonayo in la sii shaqeeyo (memory acquisition ka hor), waa in network-ka la go'doomiyo (unplug cable ama disable wifi) si loo joojiyo remote wipe ama faafitaan dheeraad ah — laakiin la iska ilaaliyo inuu triggern sameeyo malware wax dheeraad ah."
          },
          {
            h: "Multiple Device Prioritization",
            p:
            "Marka scene-ku leeyahay devices badan, mudnaan siin devices-ka volatile evidence badan ku haya (mashiinka shaqeynaya) marka hore, kadibna devices-ka off ah."
          }
        ],

        terms: [
          { term: "Pull the Plug", def: "Xiritaanka koronto si toos ah loo joojiyo mashiinka." },
          { term: "Network Isolation", def: "Go'doominta mashiinka network-ka si loo joojiyo faafitaan dheeraad ah." }
        ],

        quiz: [
          {
            q: "Marka la ogaado ransomware weli encrypt gareynayo, tallaabo lagu tixgelin karo waa?",
            options: [
              "Pull the plug si loo joojiyo encryption-ka intuu sii socdo",
              "Sug ilaa uu dhammaystiro encryption-ka",
              "Iska dhaaf mashiinka",
              "Isla markiiba tirtir dhammaan files"
            ],
            answer: 0,
            explain: "Joojinta koronto-du waxay joojin kartaa faafitaanka encryption-ka, in kastoo ay lumineyso memory."
          },
          {
            q: "Network isolation ujeeddadeeda waa?",
            options: [
              "Joojinta remote wipe ama faafitaan dheeraad ah",
              "Kordhinta xawaaraha",
              "Ma jiro sabab",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Isolation-ku wuxuu joojinayaa attacker-ka inuu sii wado control-ka."
          },
          {
            q: "Marka devices badan scene-ku leeyahay, mudnaanta koowaad waa?",
            options: [
              "Devices-ka volatile evidence badan ku haya (shaqeynaya)",
              "Devices-ka off ah oo keliya",
              "Devices-ka ugu qaali badan",
              "Ma jirto mudnaan"
            ],
            answer: 0,
            explain: "Volatile evidence-ka waa la ilaaliyaa marka hore, sababtoo ah way lumaan kartaa."
          }
        ],

        exercise: {
          title: "Scene Handling Scenario",
          steps: [
            "Xulo scenario (ransomware la ogaaday, mashiinka weli shaqeynaya).",
            "Go'aami: pull the plug ama sii shaqee — sharax sababta.",
            "Sharax sida network isolation loo sameeyo.",
            "Naqshadee mudnaan collection ah haddii 3 devices ay jiraan."
          ],
          deliverable: "Scene handling decision document."
        }
      },


      {
        slug: "evidence-collection-capstone",
        title: "Evidence Collection — Capstone",
        english: "Evidence Collection Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — naqshadee full evidence collection response oo scenario dhab ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad hesha alert ah in laptop maamule ah uu leeyahay dhaqdhaqaaq shaki leh — mashiinku wuu shaqeynayaa, wuxuuna ku xiran yahay network-ka shirkadda."
          },
          {
            h: "Assessment & Authorization",
            p:
            "Xaqiiji authorization-ka ka hor wax kasta oo kale. Sharax go'aankaaga pull the plug vs live collection."
          },
          {
            h: "Collection Order",
            p:
            "Naqshadee order of volatility collection plan buuxa oo daboolaya memory, network state, iyo disk."
          },
          {
            h: "Documentation",
            p:
            "Naqshadee chain of custody log buuxa oo daboolaya dhammaan evidence-ka la ururiyay iyo hash values-kooda."
          }
        ],

        terms: [
          { term: "Full Collection Response", def: "Habraaca isugu jira assessment, order of volatility, iyo documentation." }
        ],

        quiz: [
          {
            q: "Ka hor collection-ka scenario-gan, tallaabada koowaad waa?",
            options: [
              "Xaqiijinta authorization-ka",
              "Isla markiiba imaging",
              "Xiritaanka koronto",
              "Warbixinta"
            ],
            answer: 0,
            explain: "Authorization waa waajib ka hor tallaabo kasta oo kale."
          },
          {
            q: "Chain of custody log-ku warbixinta ugu dambaysa waa in uu ku jiro?",
            options: [
              "Dhammaan evidence-ka la ururiyay iyo hash values",
              "Kaliya magaca laptop-ka",
              "Kaliya waqtiga",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Documentation dhamaystiran ayaa taageertaa admissibility-ga."
          },
          {
            q: "Sababta collection order-ku muhiim u yahay scenario-gan waa?",
            options: [
              "Mashiinku wuu shaqeynayaa — volatile evidence sida memory waa in la ilaaliyaa marka hore",
              "Ma jiro sabab",
              "Order-ku kaliya theoretical",
              "Waqtiga oo keliya ayaa muhiim"
            ],
            answer: 0,
            explain: "Mashiin shaqeynaya wuxuu bixiyaa volatile evidence oo lumi karta."
          }
        ],

        exercise: {
          title: "Full Evidence Collection Response",
          steps: [
            "Xaqiiji authorization-ka scenario-ga.",
            "Go'aami pull the plug vs live collection, sharax sababta.",
            "Naqshadee order of volatility collection plan buuxa.",
            "Samee chain of custody log oo daboolaya dhammaan evidence-ka (portfolio-ready)."
          ],
          deliverable: "Full evidence collection response plan (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "df3",
    slug: "disk-forensics-file-systems",
    stage: "Sare",
    title: "Disk Forensics & File Systems",
    english: "Disk Forensics & File Systems",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa file systems (FAT/NTFS/EXT), MFT parsing, deleted file recovery, imaging tools iyo file carving.",

    topics: [
      "File System Fundamentals: FAT & NTFS",
      "NTFS Deep Dive: MFT",
      "EXT Filesystem & Linux Forensics",
      "Deleted File Recovery",
      "Disk Imaging Tools: FTK, Autopsy",
      "File Carving Techniques",
      "Disk Forensics Capstone",
    ],

    lessonList: [

      {
        slug: "file-system-fundamentals-fat-ntfs",
        title: "File System Fundamentals: FAT & NTFS",
        english: "File System Fundamentals: FAT and NTFS",
        minutes: 15,

        summary:
          "Faham sida file systems u kaydiyaan xogta, iyo farqiga FAT iyo NTFS.",

        sections: [
          {
            h: "Waa Maxay File System?",
            p:
            "File system waa habka OS-ku u maareeyo sida files loo kaydiyo, loo helo, oo loo maareeyo disk-ka. Wuxuu kaydiyaa files-ka laftooda iyo metadata (magac, size, timestamps, location disk-ka)."
          },
          {
            h: "FAT (File Allocation Table)",
            p:
            "FAT waa file system fudud oo hore, weli loo isticmaalo USB drives iyo SD cards. Wuxuu isticmaalaa table si uu u la socdo clusters-ka file kasta isticmaalo. FAT32 wuxuu xaddidan yahay file size (4GB max)."
          },
          {
            h: "NTFS (New Technology File System)",
            p:
            "NTFS waa file system-ka standard-ka ah ee Windows casriga ah. Wuxuu taageeraa permissions, encryption, journaling (transaction log), iyo file sizes waaweyn. Wuxuu isticmaalaa Master File Table (MFT) si uu u maareeyo metadata."
          },
          {
            h: "Sectors, Clusters & Allocation",
            p:
            "Disk-ku wuxuu u qaybsan yahay sectors (badanaa 512 bytes). Clusters waa isku darka sectors dhawr ah oo file system-ku u isticmaalo unit-ka ugu yar ee allocation. File-ku wuxuu isticmaalaa clusters badan iyadoo lagu saleynayo size-kiisa."
          }
        ],

        terms: [
          { term: "FAT", def: "File Allocation Table — file system fudud, hore." },
          { term: "NTFS", def: "New Technology File System — standard-ka Windows casriga ah." },
          { term: "Cluster", def: "Isku darka sectors ee unit-ka ugu yar ee allocation." }
        ],

        quiz: [
          {
            q: "NTFS ka duwan tahay FAT sababtoo ah?",
            options: [
              "Wuxuu taageeraa permissions, encryption iyo journaling",
              "Waa mid ka fudud",
              "Ma taageero file sizes waaweyn",
              "Waa mid ka duugoobay"
            ],
            answer: 0,
            explain: "NTFS waa file system casri ah oo leh features badan oo security ah."
          },
          {
            q: "MFT waxaa loo isticmaalaa?",
            options: [
              "Maareynta metadata-ga files-ka NTFS volume-ka",
              "Kaydinta backup",
              "Encrypt gareynta disk-ka",
              "Beddelidda password"
            ],
            answer: 0,
            explain: "Master File Table waa xarunta metadata-ga NTFS."
          },
          {
            q: "Cluster waa?",
            options: [
              "Isku darka sectors dhawr ah oo ah unit-ka ugu yar ee allocation",
              "File hal ah",
              "Directory hal ah",
              "Backup file"
            ],
            answer: 0,
            explain: "File system-ku wuxuu u qaybiyaa disk-ka clusters, ma aha sectors kali ah."
          },
          {
            q: "FAT32 wuxuu xaddidan yahay?",
            options: [
              "File size (4GB max)",
              "Storage capacity oo dhan",
              "Number of files",
              "Ma jirto xaddidnaan"
            ],
            answer: 0,
            explain: "FAT32 file kasta ma dhaafi karo 4GB."
          }
        ],

        exercise: {
          title: "File System Comparison",
          steps: [
            "Naqshadee jaantus barbardhig ah FAT iyo NTFS.",
            "Sharax sababta NTFS uu ka fiican yahay forensics ahaan.",
            "Sharax sida sectors iyo clusters isugu shaqeeyaan.",
            "Qor 3 forensic artifacts oo NTFS bixiso oo FAT aan bixinayn."
          ],
          deliverable: "File system comparison sheet."
        }
      },


      {
        slug: "ntfs-deep-dive-mft",
        title: "NTFS Deep Dive: Master File Table",
        english: "NTFS Deep Dive: Master File Table (MFT)",
        minutes: 11,

        summary:
          "Sii qoto dheeree fahamkaaga MFT, timestamps, iyo sida NTFS artifacts loo falanqeeyo forensics ahaan.",

        sections: [
          {
            h: "MFT Entries",
            p:
            "MFT wuxuu leeyahay entry (record) file/folder kasta oo NTFS volume-ka ku jira, oo ay ku jiraan kuwa la tirtiray (in kastoo entry-gu la 'reuse' gareyn karo). Entry kastaa wuxuu ka kooban yahay attributes sida $STANDARD_INFORMATION iyo $FILE_NAME."
          },
          {
            h: "MACB Timestamps",
            p:
            "Modified (M), Accessed (A), Created (C/B — 'Born'/entry created). Timestamps-kani waxay bixiyaan macluumaad muhiim ah oo timeline dhisidda ah — laakiin waxaa jira laba nooc ($STANDARD_INFO vs $FILE_NAME) oo mararka qaarkood is khilaafi kara (timestomping indicator)."
          },
          {
            h: "$LogFile & USN Journal",
            p:
            "$LogFile waa NTFS transaction journal — wuxuu diiwaan geliyaa changes disk-ka lagu sameeyay dhawaanahan. USN Journal (Update Sequence Number) wuxuu la socdaa isbeddellada files-ka — labaduba waa artifacts qiimo badan oo forensic timeline ah."
          },
          {
            h: "Resident vs Non-Resident Data",
            p:
            "Files-ka aad u yar (< 700 bytes) waxay kaydin karaan xogtooda si toos ah MFT entry-ga gudihiisa (resident). Files-ka waaweyn waxay isticmaalaan clusters kale (non-resident), MFT-guna wuxuu tilmaamaa halka ay ku jiraan."
          }
        ],

        terms: [
          { term: "MFT Entry", def: "Record file/folder kasta oo NTFS volume-ka ku jira." },
          { term: "MACB Timestamps", def: "Modified, Accessed, Created, Born timestamps." },
          { term: "USN Journal", def: "Diiwaanka isbeddellada files-ka NTFS." }
        ],

        quiz: [
          {
            q: "MACB timestamps waxay tilmaamaan?",
            options: [
              "Modified, Accessed, Created, Born",
              "Kaliya waqtiga la tirtiray",
              "Kaliya size-ka file-ka",
              "Kaliya owner-ka"
            ],
            answer: 0,
            explain: "MACB waa afarta nooc ee timestamp ee file kasta."
          },
          {
            q: "Khilaaf u dhexeeya $STANDARD_INFO iyo $FILE_NAME timestamps wuxuu tilmaamayaa?",
            options: [
              "Timestomping suurtagal ah (attacker beddelay timestamps)",
              "Caadi",
              "Backup process",
              "Update Windows"
            ],
            answer: 0,
            explain: "Khilaafka labadan attribute waa calaamad caan ah oo anti-forensics ah."
          },
          {
            q: "USN Journal waxay diiwaan gelisaa?",
            options: [
              "Isbeddellada files-ka NTFS volume-ka",
              "Kaliya login events",
              "Kaliya network traffic",
              "Kaliya passwords"
            ],
            answer: 0,
            explain: "USN Journal waa artifact qiimo badan oo file activity timeline ah."
          },
          {
            q: "Resident data macnaheedu waa?",
            options: [
              "Xog yar oo si toos ah kaydsan MFT entry-ga gudihiisa",
              "Xog kaydsan cloud-ka",
              "Xog la tirtiray",
              "Xog encrypted ah oo keliya"
            ],
            answer: 0,
            explain: "Files aad u yar waxay ku kaydsan yihiin MFT-ka laftiisa."
          }
        ],

        exercise: {
          title: "MFT Timeline Analysis Practice",
          steps: [
            "Sharax afarta MACB timestamps.",
            "Sharax sida timestomping loo ogaan karo (khilaaf attributes).",
            "Sharax farqiga $LogFile iyo USN Journal.",
            "Naqshadee timeline tusaale ah oo isticmaala MACB timestamps 3 files ah."
          ],
          deliverable: "MFT and timestamp analysis notes."
        }
      },


      {
        slug: "ext-filesystem-linux-forensics",
        title: "EXT Filesystem & Linux Forensics",
        english: "EXT Filesystem and Linux Forensics",
        minutes: 14,

        summary:
          "Faham sida EXT filesystem (Linux) u shaqeeyo iyo sida ay uga duwan tahay NTFS forensics ahaan.",

        sections: [
          {
            h: "EXT2/3/4 Overview",
            p:
            "EXT (Extended File System) waa file system-ka ugu caansan Linux. EXT4 (casriga ah) wuxuu taageeraa journaling, files waaweyn, iyo performance hagaagsan. Superblock wuxuu kaydiyaa metadata guud ee filesystem-ka."
          },
          {
            h: "Inodes",
            p:
            "Halka NTFS uu isticmaalo MFT entries, EXT wuxuu isticmaalaa inodes — structure kasta oo file/folder ka kooban permissions, owner, timestamps, iyo pointers ilaa data blocks. Inode-ku ma haysto file-ka magaciisa — magaca wuxuu ku jiraa directory entry."
          },
          {
            h: "Linux Timestamps",
            p:
            "EXT4 wuxuu taageeraa atime (access), mtime (modification), ctime (metadata change), iyo crtime (creation — EXT4 oo keliya). Kuwan waa u dhigma MACB Windows-ka, laakiin habka lagu falanqeeyo way ka duwan yahay."
          },
          {
            h: "Linux Forensic Tools",
            p:
            "The Sleuth Kit (TSK) wuxuu bixiyaa command-line tools EXT filesystem analysis ah. Autopsy (GUI-ga TSK) wuxuu taageeraa labadaba NTFS iyo EXT."
          }
        ],

        terms: [
          { term: "Inode", def: "Structure EXT filesystem ah oo ka kooban metadata file/folder." },
          { term: "Superblock", def: "Kaydinta metadata guud ee filesystem-ka." },
          { term: "The Sleuth Kit", def: "Tools command-line ah oo forensic filesystem analysis ah." }
        ],

        quiz: [
          {
            q: "Inode EXT filesystem ahaan u dhigma?",
            options: [
              "MFT entry NTFS",
              "Superblock",
              "Backup file",
              "Registry key"
            ],
            answer: 0,
            explain: "Labaduba waxay kaydiyaan metadata file kasta."
          },
          {
            q: "crtime EXT4 wuxuu tilmaamaa?",
            options: [
              "Waqtiga file-ka la sameeyay (creation) — EXT4 oo keliya taageeraysa",
              "Waqtiga kaliya la akhriyay",
              "Waqtiga la tirtiray",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "crtime waa timestamp cusub oo EXT4 ku daray, aan EXT2/3 lahayn."
          },
          {
            q: "The Sleuth Kit waxaa loo isticmaalaa?",
            options: [
              "Command-line forensic filesystem analysis",
              "Malware sameynta",
              "Network scanning",
              "Password cracking"
            ],
            answer: 0,
            explain: "TSK waa mid ka mid ah tools-ka ugu caansan filesystem forensics."
          },
          {
            q: "Superblock wuxuu kaydiyaa?",
            options: [
              "Metadata guud ee filesystem-ka",
              "Kaliya files individual",
              "Kaliya user accounts",
              "Kaliya passwords"
            ],
            answer: 0,
            explain: "Superblock-ku waa xarunta metadata-ga filesystem-ka oo dhan."
          }
        ],

        exercise: {
          title: "EXT vs NTFS Forensics Comparison",
          steps: [
            "Naqshadee jaantus barbardhig ah inode iyo MFT entry.",
            "Sharax afarta Linux timestamps (atime, mtime, ctime, crtime).",
            "Sharax sida The Sleuth Kit loo isticmaali lahaa.",
            "Sharax sababta Autopsy loo isticmaalo labadaba filesystem types."
          ],
          deliverable: "EXT vs NTFS forensics comparison sheet."
        }
      },


      {
        slug: "deleted-file-recovery",
        title: "Dib-u-Soo Celinta Files La Tirtiray",
        english: "Deleted File Recovery",
        minutes: 12,

        summary:
          "Faham sida files la tirtiray loo soo celin karo, iyo xaaladaha ay soo celintu suurtagal tahay.",

        sections: [
          {
            h: "Waxa Dhaca Marka File La Tirtiro",
            p:
            "Marka file la tirtiro (Recycle Bin la nadiifiyo), file system-ku badanaa wuxuu kaliya calaamadeeyaa clusters-ka 'available' — data-ku weli wuu jiraa ilaa uu wax kale ku qoro (overwrite)."
          },
          {
            h: "Recovery Feasibility",
            p:
            "Sida deggan overwriting-ka, deleted files waxay noqon karaan: fully recoverable (aan la overwrite gareyn), partially recoverable (qayb ka mid ah clusters-ka overwritten), ama unrecoverable (dhammaan clusters-ka overwritten). Waqti ka dib tirtiritaanka ayaa ka dhigan mudnaan."
          },
          {
            h: "MFT Entry Recovery",
            p:
            "NTFS, xitaa haddii data-ga file-ka la overwrite gareeyay, MFT entry-ga (magaca file-ka, timestamps) waxaa laga yaabaa in weli laga heli karo — taasoo bixin karta macluumaad qiimo leh xitaa haddii xog dhabta ah aan la soo celin karin."
          },
          {
            h: "Anti-Forensic Deletion Methods",
            p:
            "Secure deletion tools (shred, sdelete) waxay overwrite gareeyaan data-ga marar badan si loo joojiyo soo celinta. Fahamka calaamadahan wuxuu caawiyaa analyst-ka inuu ogaado haddii attacker-ku isku dayay inuu qariyo evidence."
          }
        ],

        terms: [
          { term: "Overwriting", def: "Marka data cusub lagu qoro clusters-ka file la tirtiray isticmaali jiray." },
          { term: "Secure Deletion", def: "Tirtiritaan si joogto ah loo overwrite gareeyo, si aan loo soo celin karin." }
        ],

        quiz: [
          {
            q: "Marka file la tirtiro, data-gu?",
            options: [
              "Weli wuu jiraa ilaa uu wax kale ku qoro (overwrite)",
              "Isla markiiba wuu tirmayaa gebi ahaanba",
              "Waxaa loo diraa cloud-ka",
              "Waxaa la encrypt gareeyaa"
            ],
            answer: 0,
            explain: "Tirtiritaanka caadiga ahi wuxuu kaliya calaamadeeyaa space-ka 'available'."
          },
          {
            q: "Sababta MFT entry laga yaabo in la soo celin karo xitaa haddii data-gu overwritten yahay waa?",
            options: [
              "Entry-ga metadata-ga waa qayb ka duwan data-ga file-ka",
              "MFT-ga marnaba lama tirtiro",
              "Ma jiro sababi ah",
              "MFT waa backup"
            ],
            answer: 0,
            explain: "Metadata iyo data-gu waa qaybo kala duwan oo laga yaabo inay overwrite ku dhacaan waqtiyo kala duwan."
          },
          {
            q: "Secure deletion tools sida shred waxay sameeyaan?",
            options: [
              "Overwrite gareeyaan data-ga marar badan si aan loo soo celin karin",
              "Waxay backup sameeyaan",
              "Waxay encrypt gareeyaan oo keliya",
              "Wax kama beddelaan"
            ],
            answer: 0,
            explain: "Secure deletion-ku wuxuu ka dhigayaa recovery mid aan macquul ahayn."
          },
          {
            q: "Waqtiga u dhexeeya tirtiritaanka iyo soo celinta wuxuu saameeyaa?",
            options: [
              "Fursadda recovery-ga — waqti dheer = fursad overwrite ah oo kordhaysa",
              "Wax dhib ah ma jiraan",
              "Wuxuu kaliya saameeyaa file names",
              "Ma jiro saameyn"
            ],
            answer: 0,
            explain: "Waqti dheer oo la sinjiro overwriting-gu waa mid dhici kara."
          }
        ],

        exercise: {
          title: "Deleted File Recovery Concepts",
          steps: [
            "Sharax waxa dhaca marka file la tirtiro NTFS.",
            "Sharax saddexda xaalado ee recovery feasibility.",
            "Sharax sababta MFT entry laga yaabo in la soo celin karo xitaa haddii data lumay.",
            "Sharax sida secure deletion loo ogaan karo (calaamado)."
          ],
          deliverable: "Deleted file recovery concepts notes."
        }
      },


      {
        slug: "disk-imaging-tools-ftk-autopsy",
        title: "Disk Imaging Tools: FTK & Autopsy",
        english: "Disk Imaging Tools: FTK Imager and Autopsy",
        minutes: 10,

        summary:
          "Baro sida FTK Imager iyo Autopsy loo isticmaalo disk imaging iyo analysis.",

        sections: [
          {
            h: "FTK Imager",
            p:
            "FTK Imager waa tool bilaash ah oo AccessData ka sameeyay, loo isticmaalo disk imaging iyo preview asaasi ah. Wuxuu taageeraa formats badan (E01, raw/dd), wuxuuna bixiyaa hash verification si toos ah."
          },
          {
            h: "Autopsy Workflow",
            p:
            "Autopsy waa GUI-ga The Sleuth Kit. Workflow-ka: 1) Samee case cusub. 2) Ku dar data source (image file). 3) Xulo modules (file analysis, keyword search, iwm). 4) Falanqee results-ka view kala duwan."
          },
          {
            h: "Timeline Analysis in Autopsy",
            p:
            "Autopsy wuxuu bixiyaa timeline view isku daraya dhammaan MACB timestamps files-ka case-ka oo dhan — taasoo u ogolaanaysa analyst inuu si degdeg ah u aragto dhaqdhaqaaqa system-ka waqti gaar ah."
          },
          {
            h: "Keyword Search & Filtering",
            p:
            "Labada tools-ba waxay bixiyaan keyword search (raadinta text specific ah dhammaan files-ka) iyo filtering (file type, size, hash). Kuwaan waa muhiim marka la baarayo files xasaasi ah qadar badan gudahood."
          }
        ],

        terms: [
          { term: "FTK Imager", def: "Tool bilaash ah oo disk imaging ah oo AccessData sameeyay." },
          { term: "Autopsy", def: "GUI-ga The Sleuth Kit, tool disk analysis ah." }
        ],

        quiz: [
          {
            q: "FTK Imager waxaa loo isticmaalaa?",
            options: [
              "Disk imaging iyo preview asaasi ah",
              "Malware analysis oo keliya",
              "Network scanning",
              "Password cracking"
            ],
            answer: 0,
            explain: "FTK Imager waa tool imaging ah oo caan ah."
          },
          {
            q: "Autopsy workflow-ku wuxuu bilaabmaa?",
            options: [
              "Samaynta case cusub",
              "Isla markiiba warbixinta",
              "Tirtirida evidence",
              "Password cracking"
            ],
            answer: 0,
            explain: "Case creation waa tallaabada koowaad ee Autopsy."
          },
          {
            q: "Timeline analysis Autopsy ahaan wuxuu isku daraa?",
            options: [
              "Dhammaan MACB timestamps files-ka case-ka",
              "Kaliya hal file",
              "Kaliya network logs",
              "Kaliya user accounts"
            ],
            answer: 0,
            explain: "Timeline view-gu wuxuu bixiyaa muuqaal guud oo dhaqdhaqaaqa system-ka."
          },
          {
            q: "Keyword search-ku muhiim u yahay sababtoo ah?",
            options: [
              "Wuxuu u ogolaadaa raadinta degdeg ah files xasaasi ah qadar badan gudahood",
              "Wuxuu tirtiraa files",
              "Wuxuu encrypt gareeyaa evidence",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Manual review dhammaan files ma suurtagal aha — search-ku waa muhiim."
          }
        ],

        exercise: {
          title: "Imaging & Analysis Tool Practice",
          steps: [
            "Sharax tallaabooyinka FTK Imager imaging-ka.",
            "Sharax 4-da tallaabo ee Autopsy workflow-ga.",
            "Sharax faa'iidada timeline analysis-ka.",
            "Naqshadee keyword search list tusaale investigation ah."
          ],
          deliverable: "Disk imaging tools practice notes."
        }
      },


      {
        slug: "file-carving-techniques",
        title: "File Carving Techniques",
        english: "File Carving Techniques",
        minutes: 13,

        summary:
          "Faham sida file carving loo isticmaalo si loo soo celiyo files iyada oo aan filesystem metadata la isticmaalin.",

        sections: [
          {
            h: "Waa Maxay File Carving?",
            p:
            "File carving waa technique lagu soo celiyo files iyada oo aan la isticmaalin filesystem metadata (MFT entries, directory structure) — waxaa loo isticmaalaa marka metadata-du ay lumeen ama la overwrite gareeyay, laakiin data-gu weli jiro."
          },
          {
            h: "File Signatures (Magic Numbers)",
            p:
            "File kasta wuxuu leeyahay 'magic number' (bytes gaar ah bilowga file-ka ku yaal) oo lagu aqoonsado nooca file-ka (tusaale: JPEG wuxuu bilaabaa FF D8 FF, PDF wuxuu bilaabaa %PDF). Carving tools waxay raadiyaan signatures-kan disk raw-ka oo dhan."
          },
          {
            h: "Header/Footer Carving",
            p:
            "Habka ugu fudud ee carving-ku wuxuu raadiyaa header (bilowga file signature) iyo footer (dhamaadka signature, haddii uu jiro). Xogta u dhaxaysa waa la soo saaraa file cusub ahaan."
          },
          {
            h: "Fragmentation Challenges",
            p:
            "Files-ka fragmented (aan si joogto ah u kaydsanayn hal meel) waxay adkeeyaan carving-ka — habab horumarsan (smart carving) waxay isticmaalaan file structure knowledge si loo isku xiro fragments-ka si sax ah."
          }
        ],

        terms: [
          { term: "File Carving", def: "Habka lagu soo celiyo files iyada oo aan filesystem metadata la isticmaalin." },
          { term: "Magic Number", def: "Bytes gaar ah bilowga file-ka ku yaal oo lagu aqoonsado nooca." },
          { term: "Fragmentation", def: "Marka file-ku aan si joogto ah ugu kaydsanin disk-ka." }
        ],

        quiz: [
          {
            q: "File carving waxaa loo isticmaalaa marka?",
            options: [
              "Metadata-du lumeen ama la overwrite gareeyay, laakiin data-gu weli jiro",
              "Metadata-du weli sax yihiin",
              "File-ku weligiis ma jirin",
              "Backup ayaa jira"
            ],
            answer: 0,
            explain: "Carving-ku wuxuu ka shaqeeyaa data raw-ka, ma isticmaalo metadata."
          },
          {
            q: "Magic number waa?",
            options: [
              "Bytes gaar ah bilowga file-ka ku yaal oo lagu aqoonsado nooca",
              "Password file-ka",
              "Size-ka file-ka",
              "Owner-ka file-ka"
            ],
            answer: 0,
            explain: "JPEG, PDF, iyo formats kale waxay leeyihiin signatures gaar ah."
          },
          {
            q: "Fragmented files carving-ka waxay ka dhigaan?",
            options: [
              "Mid ka adag, waxaa loo baahan yahay smart carving techniques",
              "Mid ka fudud",
              "Ma saameeyaan carving-ka",
              "Mid aan suurtagal ahayn gebi ahaanba"
            ],
            answer: 0,
            explain: "Fragmentation-ku wuxuu adkeeyaa isku xirka bytes-ka si sax ah."
          },
          {
            q: "Header/footer carving-ku wuxuu raadiyaa?",
            options: [
              "Bilowga iyo dhamaadka file signature",
              "Kaliya bilowga",
              "Kaliya dhamaadka",
              "Kaliya magaca file-ka"
            ],
            answer: 0,
            explain: "Xogta u dhaxaysa header iyo footer waa la soo saaraa."
          }
        ],

        exercise: {
          title: "File Carving Practice",
          steps: [
            "Liis garee 5 magic numbers (JPEG, PDF, ZIP, PNG, iwm).",
            "Sharax habka header/footer carving.",
            "Sharax sida fragmentation ay adkeyso carving-ka.",
            "Sharax marka file carving loo isticmaali lahaa halkii MFT recovery."
          ],
          deliverable: "File carving reference sheet."
        }
      },


      {
        slug: "disk-forensics-capstone",
        title: "Disk Forensics — Full Capstone",
        english: "Disk Forensics Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee full disk investigation oo laptop suspicious ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad haysataa forensic image laptop maamule ah oo la shakiyay in xog la xaday. Waa in aad falanqeyso file system-ka, timeline-ka, iyo deleted files."
          },
          {
            h: "File System Analysis",
            p:
            "Aqoonso file system-ka (NTFS), naqshadee approach-ka MFT parsing iyo timeline building."
          },
          {
            h: "Deleted File Investigation",
            p:
            "Sharax habka aad ugu raadin lahayd files la tirtiray oo xasaasi ah, iyadoo lagu adeegsanayo file carving haddii metadata lumay."
          },
          {
            h: "Reporting",
            p:
            "Isku dar findings-ka warbixin structured ah oo daboolaya file system findings, timeline, iyo deleted file recovery results."
          }
        ],

        terms: [
          { term: "Full Disk Investigation", def: "Baaritaan isugu jira file system, timeline, iyo deleted file analysis." }
        ],

        quiz: [
          {
            q: "Marka la baarayo laptop suspicious ah, tallaabada koowaad waa?",
            options: [
              "Aqoonsiga file system-ka iyo naqshadaynta approach-ka",
              "Isla markiiba tirtirida evidence",
              "Warbixinta",
              "Ka baxsan lab-ka"
            ],
            answer: 0,
            explain: "Waa in la fahmo qaab-dhismeedka ka hor la baaro."
          },
          {
            q: "File carving waxaa loo isticmaali lahaa scenario-gan haddii?",
            options: [
              "Metadata-ga files-ka xasaasi ah la overwrite gareeyay ama lumay",
              "Metadata-du weli sax yihiin oo dhan",
              "Ma loo baahna carving marnaba",
              "Backup ayaa la heli karaa"
            ],
            answer: 0,
            explain: "Carving-ku wuxuu ka shaqeeyaa marka metadata aan la haysan."
          },
          {
            q: "Warbixinta ugu dambaysa waa in ay ku jirto?",
            options: [
              "File system findings, timeline, deleted file recovery results",
              "Kaliya magaca file-ka la xaday",
              "Kaliya lambarka case-ka",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Report dhamaystiran wuxuu u baahan yahay findings oo dhan si loo taageero go'aanka."
          }
        ],

        exercise: {
          title: "Full Disk Investigation Report",
          steps: [
            "Naqshadee approach-ka file system analysis (NTFS, MFT).",
            "Sharax sida timeline loo dhisi lahaa MACB timestamps.",
            "Naqshadee deleted file recovery/carving strategy.",
            "Diyaari warbixin buuxda oo findings, timeline, iyo recommendations leh (portfolio-ready)."
          ],
          deliverable: "Full disk forensics investigation report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "df4",
    slug: "windows-forensic-artifacts-deep-dive",
    stage: "Sare",
    title: "Windows Forensic Artifacts Deep Dive",
    english: "Windows Forensic Artifacts Deep Dive",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa Registry forensics, Prefetch/Shimcache, Event Logs, LNK files, browser forensics, iyo USB device forensics.",

    topics: [
      "Windows Registry Forensics",
      "Prefetch, Shimcache & Amcache",
      "Windows Event Log Deep Dive",
      "LNK Files & Jump Lists",
      "Browser Forensics on Windows",
      "USB Device Forensics",
      "Windows Artifacts Capstone",
    ],

    lessonList: [

      {
        slug: "windows-registry-forensics",
        title: "Windows Registry Forensics",
        english: "Windows Registry Forensics",
        minutes: 10,

        summary:
          "Faham qoto dheer structure-ka Registry-ga iyo keys-ka forensic value-ga leh.",

        sections: [
          {
            h: "Registry Hives",
            p:
            "Registry-ga wuxuu ka kooban yahay hives: SAM (user accounts), SYSTEM (configuration), SOFTWARE (installed programs), SECURITY, iyo NTUSER.DAT (settings user gaar ah). Hives-kani waxay ku kaydsan yihiin files disk-ka ku jira, ma aha kaliya memory."
          },
          {
            h: "UserAssist Key",
            p:
            "UserAssist wuxuu diiwaan geliyaa programs GUI ah oo user-ku furay, oo ay ku jiraan tirada jeer ee la fuliyay iyo waqtiga ugu dambeeyay. Values-ka waa ROT13 encoded — waa in la decode gareeyaa ka hor la akhriyo."
          },
          {
            h: "ShellBags & RecentDocs",
            p:
            "ShellBags waxay diiwaan geliyaan folders user-ku booqday (xitaa removable drives ama network shares oo aan hadda jirin). RecentDocs wuxuu diiswaan geliyaa files-ka ugu dambeeyay ee la furay."
          },
          {
            h: "Run Keys & Startup Locations",
            p:
            "HKLM/HKCU...CurrentVersion\\Run waa meel caan ah oo programs otomaatig uga bilaabaan. Sidoo kale RunOnce, Winlogon, iyo Services keys waxay bixiyaan persistence locations dheeraad ah oo forensic analyst-ku baaro."
          }
        ],

        terms: [
          { term: "Registry Hive", def: "Qayb weyn oo Registry ah (SAM, SYSTEM, SOFTWARE, iwm)." },
          { term: "UserAssist", def: "Key diiwaan geliya programs GUI ah oo la fuliyay." },
          { term: "ShellBags", def: "Key diiwaan geliya folders user-ku booqday." }
        ],

        quiz: [
          {
            q: "NTUSER.DAT wuxuu kaydiyaa?",
            options: [
              "Settings user gaar ah",
              "System-wide configuration",
              "Installed programs oo keliya",
              "Network settings oo keliya"
            ],
            answer: 0,
            explain: "NTUSER.DAT waa hive-ka user gaarka ah, ka duwan SYSTEM/SOFTWARE hives-ka guud."
          },
          {
            q: "UserAssist values-ka waxaa lagu encode gareeyaa?",
            options: ["ROT13", "Base64", "MD5", "AES"],
            answer: 0,
            explain: "ROT13 waa cipher fudud oo UserAssist isticmaalo — waa in la decode gareeyaa."
          },
          {
            q: "ShellBags waxay diiwaan geliyaan?",
            options: [
              "Folders user-ku booqday, xitaa kuwa aan hadda jirin",
              "Kaliya files la tirtiray",
              "Kaliya passwords",
              "Kaliya network connections"
            ],
            answer: 0,
            explain: "ShellBags waxay bixiyaan evidence ku saabsan folder navigation, xitaa removable media."
          },
          {
            q: "Run keys forensic value-gooda waa?",
            options: [
              "Waxay muujiyaan programs persistence loo isticmaalo",
              "Waxay kaydiyaan passwords",
              "Waxay muujiyaan network traffic",
              "Ma jiro forensic value"
            ],
            answer: 0,
            explain: "Malware badan wuxuu isticmaalaa Run keys si uu ugu sii jiro system-ka."
          }
        ],

        exercise: {
          title: "Registry Forensics Reference",
          steps: [
            "Liis garee 6 registry hives iyo waxa ay kaydiyaan.",
            "Sharax sida UserAssist loo decode gareeyo.",
            "Sharax faa'iidada ShellBags investigation ahaan.",
            "Naqshadee checklist Run keys iyo persistence locations."
          ],
          deliverable: "Windows Registry forensics reference sheet."
        }
      },


      {
        slug: "prefetch-shimcache-amcache",
        title: "Prefetch, Shimcache & Amcache",
        english: "Prefetch, Shimcache, and Amcache",
        minutes: 12,

        summary:
          "Faham saddexda artifact ee muhiimka ah ee execution evidence bixiya — Prefetch, Shimcache, Amcache.",

        sections: [
          {
            h: "Prefetch Files",
            p:
            "Windows wuxuu abuuraa .pf files (C:\\Windows\\Prefetch) marka program la fuliyo, si loo dedejiyo bilowga xigga. Files-kani waxay kaydiyaan magaca executable-ka, run count, iyo timestamps (last run, tirada run-yada oo dhan)."
          },
          {
            h: "Shimcache (AppCompatCache)",
            p:
            "Shimcache wuxuu diiwaan geliyaa metadata executables la fuliyay (magaca, size, last modified time), laakiin ma bixiyo run count ama execution timestamp toos ah — waa mid ka duwan Prefetch."
          },
          {
            h: "Amcache",
            p:
            "Amcache.hve waa file registry-style ah oo diiwaan geliya executables la fuliyay, oo ay ku jiraan SHA1 hash — waxay bixisaa macluumaad qiimo badan si loo aqoonsado files shaki leh, xitaa haddii la tirtiray disk-ka."
          },
          {
            h: "Combining Artifacts for Execution Evidence",
            p:
            "Marka la isku daro Prefetch (run count/timing), Shimcache (metadata) iyo Amcache (hash), analyst-ku wuxuu dhisi karaa 'execution evidence' xoog leh — xitaa haddii malware-ka file-kiisa laga tirtiray disk-ka."
          }
        ],

        terms: [
          { term: "Prefetch", def: "Windows artifact bixiya run count iyo timing execution ah." },
          { term: "Shimcache", def: "AppCompatCache — diiwaan geliya metadata executables la fuliyay." },
          { term: "Amcache", def: "File bixiya SHA1 hash executables la fuliyay." }
        ],

        quiz: [
          {
            q: "Prefetch files waxay kaydiyaan?",
            options: [
              "Run count iyo last run timestamp",
              "Kaliya password",
              "Kaliya network connections",
              "Kaliya registry keys"
            ],
            answer: 0,
            explain: "Prefetch wuxuu bixiyaa evidence tira execution ah iyo waqti."
          },
          {
            q: "Shimcache ka duwan yahay Prefetch sababtoo ah?",
            options: [
              "Ma bixiyo run count ama execution timestamp toos ah",
              "Isku mid",
              "Shimcache wuxuu ka bixiyaa faahfaahin badan",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Shimcache wuxuu diiwaan geliyaa metadata oo keliya, ma bixiyo tira/waqti sida Prefetch."
          },
          {
            q: "Amcache faa'iidadeeda ugu weyn waa?",
            options: [
              "SHA1 hash executables ah — muhiim aqoonsiga files shaki leh",
              "Wuxuu tirtiraa malware",
              "Wuxuu sameeyaa backup",
              "Ma jiro faa'iido gaar ah"
            ],
            answer: 0,
            explain: "Hash-ku wuxuu u ogolaadaa la barbardhigo threat intel databases."
          },
          {
            q: "Sababta saddexda artifact isla mar loo isticmaalo waa?",
            options: [
              "Si loo dhiso execution evidence xoog leh, xitaa file la tirtiray",
              "Si loo kordhiyo storage",
              "Ma jiro faa'iido isku darka",
              "Kaliya loo baahan yahay hal artifact"
            ],
            answer: 0,
            explain: "Isku darku wuxuu bixiyaa caddayn xoog badan oo dhamaystiran."
          }
        ],

        exercise: {
          title: "Execution Evidence Reference",
          steps: [
            "Sharax waxa Prefetch, Shimcache iyo Amcache mid kasta bixiyo.",
            "Naqshadee jaantus barbardhig ah saddexda artifact.",
            "Sharax sida hash-ka Amcache loogu isticmaali lahaa threat intel.",
            "Sharax sababta saddexda isla mar loo isticmaalo investigation dhab ah."
          ],
          deliverable: "Execution evidence artifacts reference sheet."
        }
      },


      {
        slug: "windows-event-log-deep-dive",
        title: "Windows Event Log Deep Dive",
        english: "Windows Event Log Deep Dive",
        minutes: 13,

        summary:
          "Sii qoto dheeree fahamkaaga Event Log forensics — EVTX structure iyo Event IDs forensics-specific ah.",

        sections: [
          {
            h: "EVTX File Structure",
            p:
            "Windows Event Logs waxaa lagu kaydiyaa .evtx files (C:\\Windows\\System32\\winevt\\Logs). Format-kani waa XML-based — tools sida Event Viewer ama parsers command-line ah waa loo baahan yahay in la akhriyo."
          },
          {
            h: "Log Clearing & Recovery",
            p:
            "Marka attacker uu 'nadiifiyo' event log-ka (Event ID 1102), fragments-ka .evtx files hore laga yaabo in laga heli karo unallocated space-ka — carving techniques waxaa loo isticmaali karaa si loo soo celiyo evidence la tirtiray."
          },
          {
            h: "Additional Forensic Event IDs",
            p:
            "Event ID 4634 (logoff), 4648 (explicit credential logon), 4104 (PowerShell script block logging), 7045 (service installed), 4698 (scheduled task created) — kuwaan waxay ku daraan qaybaha dheeraadka ah ee Event IDs hore aad u baratay SOC-ga."
          },
          {
            h: "Multiple Log Correlation",
            p:
            "Forensic investigator-yadu waxay isku daraan Security, System, Application, iyo Application-specific logs (PowerShell operational, Sysmon haddii uu jiro) si ay u dhisaan timeline dhamaystiran, ma aha hal log oo keliya."
          }
        ],

        terms: [
          { term: "EVTX", def: "Format XML-based ah oo Windows Event Logs lagu kaydiyo." },
          { term: "Log Recovery", def: "Habka la soo celiyo fragments logs la tirtiray unallocated space-ka." }
        ],

        quiz: [
          {
            q: "EVTX format-ku waa?",
            options: ["XML-based", "Plain text", "Binary encrypted", "CSV"],
            answer: 0,
            explain: "EVTX waa format XML-based ah oo u baahan tools gaar ah in la akhriyo."
          },
          {
            q: "Marka attacker uu nadiifiyo event log-ka, forensic analyst-ku wuxuu tijaabin karaa?",
            options: [
              "Carving unallocated space si loo soo celiyo fragments",
              "Iska dhaaf, evidence-ku weligiis wuu tirmay",
              "Kaliya sug backup",
              "Ma jiro tallaabo la qaadan karo"
            ],
            answer: 0,
            explain: "Fragments-ku waxay hari karaan xitaa log-ka oo la 'nadiifiyay'."
          },
          {
            q: "Event ID 4104 wuxuu la xiriiraa?",
            options: [
              "PowerShell script block logging",
              "Login guulaystay",
              "User cusub la abuuray",
              "Service la joojiyay"
            ],
            answer: 0,
            explain: "4104 wuxuu diiwaan geliyaa waxa PowerShell scripts-ku ku jiraan."
          },
          {
            q: "Sababta multiple log correlation muhiim u yahay waa?",
            options: [
              "Si loo dhiso timeline dhamaystiran, ma aha hal log oo keliya",
              "Si loo kordhiyo storage",
              "Ma jiro faa'iido",
              "Kaliya loo baahan yahay hal log"
            ],
            answer: 0,
            explain: "Log kastaa wuxuu bixiyaa dhinac kala duwan oo dhacdada ah."
          }
        ],

        exercise: {
          title: "Event Log Forensics Deep Dive",
          steps: [
            "Liis garee 5 Event IDs forensic value leh oo aan hore loo sharaxin SOC path-ka.",
            "Sharax sida log recovery loo sameeyo kadib clearing.",
            "Naqshadee correlation plan (Security + System + PowerShell logs) scenario ah.",
            "Sharax sababta EVTX format uu u baahan yahay tools gaar ah."
          ],
          deliverable: "Windows Event Log deep dive notes."
        }
      },


      {
        slug: "lnk-files-jump-lists",
        title: "LNK Files & Jump Lists",
        english: "LNK Files and Jump Lists",
        minutes: 15,

        summary:
          "Faham sida LNK files (shortcuts) iyo Jump Lists u bixiyaan evidence ku saabsan file access.",

        sections: [
          {
            h: "LNK Files (Shortcuts)",
            p:
            "Windows wuxuu si otomaatig ah u abuuraa LNK file marka user-ku furo document ka mid ah Recent Items. LNK-ku wuxuu ku jiraa: original file path, timestamps, iyo mararka qaarkood MAC address-ka device-ka lagu sameeyay LNK-ka."
          },
          {
            h: "LNK Forensic Value",
            p:
            "Xitaa haddii original file-ka la tirtiray ama la geeyay USB drive oo aan hadda jirin, LNK-ku wuxuu weli caddeynayaa in file-kaas la furay iyo goorma — caadi ahaan waxaa loo isticmaalaa in la caddeeyo user activity."
          },
          {
            h: "Jump Lists",
            p:
            "Jump Lists waxay diiwaan geliyaan files-ka ugu dambeeyay ee app-yada taskbar-ka lagu isticmaalay (tusaale: Word, Excel). Waxay kaydiyaan macluumaad la mid ah LNK, laakiin app-specific ah."
          },
          {
            h: "Investigation Applications",
            p:
            "LNK iyo Jump Lists waxay caawiyaan xaqiijinta haddii user gaar ah uu galay file xasaasi ah (data theft cases), ama haddii uu isticmaalay removable media si xog looga saaro (USB exfiltration cases)."
          }
        ],

        terms: [
          { term: "LNK File", def: "Shortcut Windows ah oo si otomaatig u abuurmo Recent Items." },
          { term: "Jump List", def: "Diiwaanka files-ka ugu dambeeyay app gaar ah lagu isticmaalay." }
        ],

        quiz: [
          {
            q: "LNK file waxaa lagu abuuraa?",
            options: [
              "Marka user-ku furo document Recent Items ku jira",
              "Kaliya marka file la tirtiro",
              "Kaliya marka backup la sameeyo",
              "Ma jiro tallaabo taas keenta"
            ],
            answer: 0,
            explain: "Windows-ku si otomaatig ah ayuu u abuuraa LNK marka file la furo."
          },
          {
            q: "LNK file value-giisu ka jiraa xitaa haddii original file la tirtiro sababtoo ah?",
            options: [
              "LNK-ku waa metadata ka duwan file-ka laftiisa",
              "LNK-ku waa backup ka mid ah file-ka",
              "Ma jiro sabab",
              "LNK-ku sidoo kale wuu tirmayaa"
            ],
            answer: 0,
            explain: "LNK-ku waxaa u gaar ah timestamps iyo path — ma aha file-ka laftiisa."
          },
          {
            q: "Jump Lists waxay diiwaan geliyaan?",
            options: [
              "Files-ka ugu dambeeyay ee app gaar ah lagu isticmaalay",
              "Kaliya passwords",
              "Kaliya network connections",
              "Kaliya emails"
            ],
            answer: 0,
            explain: "Jump Lists waa app-specific, u eg LNK laakiin taskbar."
          },
          {
            q: "LNK/Jump Lists waxay caawiyaan xaalado?",
            options: [
              "USB exfiltration ama data theft investigation",
              "Kaliya network forensics",
              "Kaliya malware analysis",
              "Ma jiro isticmaal forensic ah"
            ],
            answer: 0,
            explain: "Kuwan waxay caddeeyaan file access history user gaar ah."
          }
        ],

        exercise: {
          title: "LNK & Jump List Investigation",
          steps: [
            "Sharax sida LNK file loo isticmaali lahaa data theft case.",
            "Sharax sida Jump List uga duwan tahay LNK.",
            "Naqshadee scenario ah oo USB exfiltration ah oo LNK evidence isticmaala.",
            "Sharax macluumaadka forensic value-ga leh oo LNK bixiyo."
          ],
          deliverable: "LNK and Jump List investigation notes."
        }
      },


      {
        slug: "browser-forensics-windows",
        title: "Browser Forensics on Windows",
        english: "Browser Forensics on Windows",
        minutes: 11,

        summary:
          "Faham sida browser artifacts (history, downloads, cookies) loo falanqeeyo forensics ahaan.",

        sections: [
          {
            h: "Browser History & Downloads",
            p:
            "Browsers (Chrome, Edge, Firefox) waxay kaydiyaan history iyo download records databases SQLite ah. Tools sida DB Browser for SQLite ama forensic-specific tools waxaa loo isticmaalaa in la falanqeeyo."
          },
          {
            h: "Cookies & Session Data",
            p:
            "Cookies waxay bixiyaan evidence websites la booqday iyo mararka qaarkood session tokens (haddii aan la encrypt gareyn). Kuwaan waxay caawiyaan xaqiijinta authentication ama tracking user activity."
          },
          {
            h: "Cache & Local Storage",
            p:
            "Browser cache-ku wuxuu kaydiyaa files (images, scripts) websites-ka. Local storage/IndexedDB waxay kaydiyaan xog application-specific ah — kuwaan waxay bixin karaan evidence dheeraad ah oo history caadiga ah ka baxsan."
          },
          {
            h: "Private Browsing Considerations",
            p:
            "Private/incognito browsing wuxuu ka hortagaa in history/cookies si joogto ah loo kaydiyo, laakiin traces waxay weli ku hari karaan memory (marka session-ku socdo), DNS cache, ama network logs."
          }
        ],

        terms: [
          { term: "Browser History Database", def: "SQLite database kaydiya websites la booqday." },
          { term: "Private Browsing", def: "Mode aan si joogto ah u kaydinin history, laakiin traces way hari karaan." }
        ],

        quiz: [
          {
            q: "Browser history badanaa waxaa lagu kaydiyaa?",
            options: [
              "Databases SQLite ah",
              "Files XML ah oo keliya",
              "Registry oo keliya",
              "Files text plain ah oo keliya"
            ],
            answer: 0,
            explain: "Browsers casriga ah waxay isticmaalaan SQLite si loo kaydiyo history."
          },
          {
            q: "Private browsing wuxuu ka hortagaa?",
            options: [
              "History/cookies si joogto ah in loo kaydiyo",
              "Dhammaan traces in la ka tago gebi ahaanba",
              "Internet-ka in la isticmaalo",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Private browsing kuma joojiyo dhammaan traces — memory/DNS cache way hari karaan."
          },
          {
            q: "Local storage/IndexedDB waxay kaydiyaan?",
            options: [
              "Xog application-specific ah oo ka baxsan history caadiga ah",
              "Kaliya passwords",
              "Kaliya cookies",
              "Ma jiro macno gaar ah"
            ],
            answer: 0,
            explain: "Kuwan waxay bixiyaan evidence dheeraad ah oo web app-yada gaarka ah ah."
          },
          {
            q: "Cache-ku wuxuu kaydiyaa?",
            options: [
              "Files (images, scripts) websites-ka la booqday",
              "Kaliya passwords",
              "Kaliya email content",
              "Kaliya network settings"
            ],
            answer: 0,
            explain: "Cache-ku wuxuu ka dhigayaa website loading mid ka dhaqso badan, wuxuuna bixiyaa evidence."
          }
        ],

        exercise: {
          title: "Browser Forensics Analysis",
          steps: [
            "Sharax sida browser history SQLite loo falanqeeyo.",
            "Sharax sida cookies loogu isticmaali lahaa xaqiijinta authentication.",
            "Sharax traces private browsing hari karo.",
            "Naqshadee scenario ah oo browser forensics muhiim u ah (phishing click investigation)."
          ],
          deliverable: "Browser forensics analysis notes."
        }
      },


      {
        slug: "usb-device-forensics",
        title: "USB Device Forensics",
        english: "USB Device Forensics",
        minutes: 14,

        summary:
          "Faham sida Windows loo diiwaan geliyo USB devices oo la xiray, iyo sida loo baaro data exfiltration.",

        sections: [
          {
            h: "USB Device Registry Artifacts",
            p:
            "Windows wuxuu diiwaan geliyaa dhammaan USB devices oo hore loo xiray Registry (SYSTEM\\CurrentControlSet\\Enum\\USBSTOR) — oo ay ku jiraan device serial number, first/last connected timestamps, iyo vendor/product ID."
          },
          {
            h: "Drive Letter & Volume Information",
            p:
            "Registry-ka MountedDevices wuxuu isku xiraa USB device-ka drive letter-kii loo siiyay. Volume Serial Number-ku wuxuu kuu ogolaadaa in aad si sax ah u aqoonsato device gaar ah, xitaa haddii uu markale la xiro computer kale."
          },
          {
            h: "Correlating USB Connection with File Activity",
            p:
            "Marka la isku daro USB connection timestamps iyo LNK files/Jump Lists muddo isla mid ah, waxaad caddeyn kartaa in files gaar ah loo koobiyeeyay USB device-ka — muhiim data exfiltration cases."
          },
          {
            h: "USB Forensics in Insider Threat Cases",
            p:
            "Insider threat investigations badanaa waxay ku salaysan yihiin USB forensics: shaqaale ka bixi doona shirkadda oo USB drive ku xiray, kadibna koobiyeeyay files xasaasi ah — chain of USB + file access + timeline ayaa caddeeya niyad-xumada (intent)."
          }
        ],

        terms: [
          { term: "USBSTOR", def: "Registry key diiwaan geliya USB storage devices hore loo xiray." },
          { term: "Volume Serial Number", def: "Aqoonsi gaar ah oo USB device kasta leeyahay." }
        ],

        quiz: [
          {
            q: "USBSTOR registry key wuxuu diiwaan geliyaa?",
            options: [
              "Dhammaan USB devices hore loo xiray, oo ay ku jiraan serial numbers",
              "Kaliya USB device hadda ku xiran",
              "Kaliya passwords",
              "Kaliya network devices"
            ],
            answer: 0,
            explain: "USBSTOR wuxuu ku hayaa taariikh dheer oo USB devices ah."
          },
          {
            q: "Volume Serial Number faa'iidadeeda waa?",
            options: [
              "Aqoonsiga device gaarka ah, xitaa haddii uu la xiro computer kale",
              "Waxaa lagu beddelaa mar walba",
              "Waa mid u dhigma dhammaan USB devices",
              "Ma jiro isticmaal forensic ah"
            ],
            answer: 0,
            explain: "Serial number-ku waa mid gaar ah oo caawiya aqoonsiga device-ka."
          },
          {
            q: "Isku darka USB connection timestamps iyo LNK files waxay caddeeyaan?",
            options: [
              "Files gaar ah oo laga yaabo in loo koobiyeeyay USB device-ka",
              "Ma jiro xiriir labadan",
              "Kaliya waqtiga USB-ga la xiray",
              "Kaliya magaca file-ka"
            ],
            answer: 0,
            explain: "Correlation-ku wuxuu caddeeyaa data exfiltration suurtagalka ah."
          },
          {
            q: "USB forensics muhiim u tahay xaaladaha?",
            options: [
              "Insider threat cases",
              "Kaliya external attacks",
              "Kaliya web app attacks",
              "Ma jiro isticmaal gaar ah"
            ],
            answer: 0,
            explain: "Insider threats badanaa waxay isticmaalaan USB drives si xog looga saaro."
          }
        ],

        exercise: {
          title: "USB Forensics Case Study",
          steps: [
            "Sharax registry keys muhiimka ah ee USB forensics.",
            "Naqshadee scenario insider threat ah oo USB isticmaala.",
            "Sharax sida timeline loo dhisi lahaa USB connection + file access.",
            "Qor go'aan: intent la muujin karo mise kaliya coincidence."
          ],
          deliverable: "USB device forensics case study."
        }
      },


      {
        slug: "windows-artifacts-capstone",
        title: "Windows Artifacts — Full Capstone",
        english: "Windows Artifacts Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee full Windows artifact investigation oo insider threat ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Shaqaale ka bixi doona shirkadda ayaa la shakiyay inuu xog xaday isaga oo USB drive isticmaalay. Waxaad haysataa forensic image laptop-kiisa."
          },
          {
            h: "Registry & Execution Evidence",
            p:
            "Naqshadee approach-ka Registry (UserAssist, ShellBags) iyo execution evidence (Prefetch, Shimcache, Amcache) si loo aqoonsado dhaqdhaqaaqa shaqaalaha."
          },
          {
            h: "USB & File Access Correlation",
            p:
            "Sharax sida USBSTOR, LNK files, iyo Jump Lists loo isku dari lahaa si loo dhiso timeline USB connection + file access ah."
          },
          {
            h: "Comprehensive Timeline",
            p:
            "Isku dar dhammaan artifacts-ka (Registry, Event Logs, USB, LNK) timeline dhamaystiran oo muujinaya intent-ka shaqaalaha."
          }
        ],

        terms: [
          { term: "Comprehensive Timeline", def: "Timeline isku daraya dhammaan Windows artifacts si loo caddeeyo dhacdo." }
        ],

        quiz: [
          {
            q: "Investigation-kan, artifact-yada ugu qiimaha badan waa?",
            options: [
              "USBSTOR, LNK files, Jump Lists",
              "Kaliya Prefetch",
              "Kaliya Event Logs",
              "Ma jiro artifact gaar ah"
            ],
            answer: 0,
            explain: "Kuwaan si toos ah ayay ula xiriiraan USB exfiltration scenario-ga."
          },
          {
            q: "Comprehensive timeline-ku wuxuu isku daraa?",
            options: [
              "Registry, Event Logs, USB, LNK artifacts",
              "Kaliya hal artifact",
              "Kaliya interview shaqaalaha",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Isku darka artifacts badan ayaa dhisaya caddayn xoog leh."
          },
          {
            q: "Warbixinta ugu dambaysa waa in ay muujiso?",
            options: [
              "Intent-ka shaqaalaha iyadoo lagu saleynayo timeline correlation",
              "Kaliya magaca shaqaalaha",
              "Kaliya taariikhda uu ka bixi doono",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Evidence-ku waa in uu taageeraa go'aan cad oo intent ku saabsan."
          }
        ],

        exercise: {
          title: "Full Windows Artifact Investigation",
          steps: [
            "Naqshadee approach-ka Registry iyo execution evidence.",
            "Sharax correlation-ka USB + LNK + Jump Lists.",
            "Samee comprehensive timeline (concept ahaan) isku darta artifacts-ka.",
            "Diyaari warbixin buuxda oo insider threat case-kan sharaxaysa (portfolio-ready)."
          ],
          deliverable: "Full Windows artifacts investigation report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "df5",
    slug: "memory-forensics",
    stage: "Sare",
    title: "Memory Forensics",
    english: "Memory Forensics",
    hours: 1,

    outcome:
      "Waxaad si adag u fahmi doontaa memory acquisition, Volatility framework, process analysis, network connections, iyo malware memory artifacts.",

    topics: [
      "Memory Forensics Fundamentals",
      "Memory Acquisition Techniques",
      "Volatility Framework Basics",
      "Process Analysis in Memory",
      "Network Connections in Memory",
      "Malware Memory Artifacts",
      "Memory Forensics Capstone",
    ],

    lessonList: [

      {
        slug: "memory-forensics-fundamentals-df",
        title: "Aasaaska Memory Forensics",
        english: "Memory Forensics Fundamentals",
        minutes: 12,

        summary:
          "Faham sababta memory forensics muhiim u yahay iyo waxa laga heli karo RAM.",

        sections: [
          {
            h: "Sababta Memory Forensics Muhiim u Tahay",
            p:
            "Malware casriga ah (fileless malware) wuxuu badanaa ku noolyahay memory-ga oo keliya, aan disk-ka wax raad ah ka tagin. Memory forensics waa habka kaliya ee lagu aqoonsan karo threats-kan."
          },
          {
            h: "Waxa Laga Heli Karo Memory",
            p:
            "Processes-ka socda (oo ay ku jiraan hidden/injected processes), network connections, loaded DLLs, command history, encryption keys aan la encrypt gareyn (weli memory-ga ku jira), iyo credentials plain text ah."
          },
          {
            h: "Memory Structure Basics",
            p:
            "Memory-gu wuxuu ka kooban yahay physical memory (RAM chips) iyo virtual memory (address space OS-ku siiyo process kasta). Kernel space wuxuu ku jiraa OS core-ka, user space wuxuu ku jiraa applications."
          },
          {
            h: "Memory Forensics Use Cases",
            p:
            "Malware detection (fileless malware), credential extraction (mararka la ilaaliyo password extraction), rootkit detection (kernel-level hiding), iyo encryption key recovery (marka BitLocker ama ransomware la baarayo)."
          }
        ],

        terms: [
          { term: "Fileless Malware", def: "Malware ku noolaada memory-ga oo keliya, aan disk-ka wax raad ah ka tagin." },
          { term: "Kernel Space", def: "Qaybta memory-ga ee OS core-ku ku jiro." },
          { term: "User Space", def: "Qaybta memory-ga ee applications-ku ku shaqeeyaan." }
        ],

        quiz: [
          {
            q: "Sababta memory forensics muhiim u yahay fileless malware waa?",
            options: [
              "Malware-kaas ma leh disk-based artifacts, kaliya memory ayuu ku jiraa",
              "Memory forensics waa mid ka fudud",
              "Ma jiro sabab gaar ah",
              "Fileless malware ma jirto dhab ahaan"
            ],
            answer: 0,
            explain: "Memory-gu waa meesha kaliya ee threats-kan laga heli karo."
          },
          {
            q: "Memory-ga waxaa laga heli karaa?",
            options: [
              "Processes, network connections, credentials plain text ah",
              "Kaliya deleted files",
              "Kaliya registry keys",
              "Kaliya browser history"
            ],
            answer: 0,
            explain: "Memory-gu wuxuu bixiyaa dhinac aad qiimo u leh oo digital forensics ah."
          },
          {
            q: "Kernel space waa?",
            options: [
              "Qaybta OS core-ku ku jiro",
              "Qaybta applications-ku ku shaqeeyaan",
              "Kaliya loo isticmaalo drivers",
              "Ma jiro qaybtan"
            ],
            answer: 0,
            explain: "Kernel space waa heerka ugu sarreeya OS-ka, ka duwan user space."
          },
          {
            q: "Rootkit detection sababta ay u baahan tahay memory forensics waa?",
            options: [
              "Rootkits waxay isku qariyaan kernel-level, disk-based tools ma ogaan karaan",
              "Rootkits marnaba ma jiraan",
              "Disk forensics ayaa ku filan",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Kernel-level hiding waa mid aan la ogaan karin habab caadi ah oo disk-based ah."
          }
        ],

        exercise: {
          title: "Memory Forensics Use Case Mapping",
          steps: [
            "Liis garee 5 waxyaabo laga heli karo memory.",
            "Sharax sida fileless malware uga fogaado disk forensics.",
            "Sharax farqiga kernel space iyo user space.",
            "Naqshadee 4 use cases oo memory forensics muhiim u ah."
          ],
          deliverable: "Memory forensics use case overview."
        }
      },


      {
        slug: "memory-acquisition-techniques",
        title: "Habka Memory Acquisition",
        english: "Memory Acquisition Techniques",
        minutes: 10,

        summary:
          "Baro sida memory dumps loo sameeyo, iyo tools-ka aasaasiga ah ee memory acquisition.",

        sections: [
          {
            h: "Memory Acquisition Tools",
            p:
            "FTK Imager (bixiya memory capture feature), Magnet RAM Capture, DumpIt, iyo WinPmem waa tools bilaash ah oo lagu qabto memory dumps. Tools-kan waxay abuuraan file (RAW ama specific format) oo ka kooban dhammaan RAM waqtigaas."
          },
          {
            h: "Live Acquisition Challenges",
            p:
            "Marka memory la qabanayo mashiin shaqeynaya, tool-ku laftiisu wuxuu isticmaalaa memory (footprint), taasoo dhici karta inay wax yar u beddesho memory-ga la falanqeynayo. Waa in la doorto tool leh footprint yar."
          },
          {
            h: "Virtual Machine Memory Snapshots",
            p:
            "Haddii system-ku VM yahay, snapshot-ka VM-ku wuxuu si otomaatig ah u kaydiyaa memory state-ka — habkan waa mid ka fudud oo aan tools dheeraad ah u baahnayn, laakiin waa ka duwan yahay bare-metal (physical) mashiinka."
          },
          {
            h: "Cloud & Remote Acquisition",
            p:
            "Cloud environments (AWS, Azure) waxay leeyihiin habab gaar ah oo memory acquisition ah — badanaa iyadoo la isticmaalayo snapshot APIs ama agent-based tools. Remote acquisition waxay u baahan tahay network access iyo trust siyaasado gaar ah."
          }
        ],

        terms: [
          { term: "Memory Dump", def: "File ka kooban dhammaan RAM waqtiga la qabtay." },
          { term: "Footprint", def: "Saameynta tool-ku uu ku yeesho memory-ga marka uu shaqeeyo." }
        ],

        quiz: [
          {
            q: "Sababta tool footprint uu muhiim u yahay memory acquisition waa?",
            options: [
              "Footprint weyn wuxuu beddeli karaa memory-ga la falanqeynayo",
              "Ma jiro saameyn",
              "Footprint-gu wuxuu kordhinayaa speed",
              "Kaliya loo isticmaalo VMs"
            ],
            answer: 0,
            explain: "Tool-ku laftiisu wuxuu isticmaalaa memory intii uu shaqeynayo."
          },
          {
            q: "VM snapshot-ku wuxuu si otomaatig ah u kaydiyaa?",
            options: [
              "Memory state-ka VM-ka",
              "Kaliya disk-ka",
              "Kaliya network settings",
              "Ma jiro memory kaydinta"
            ],
            answer: 0,
            explain: "Snapshots waxay bixiyaan hab fudud oo memory acquisition ah VMs."
          },
          {
            q: "Cloud memory acquisition badanaa waxay isticmaashaa?",
            options: [
              "Snapshot APIs ama agent-based tools",
              "Physical write-blockers",
              "Kaliya USB drives",
              "Ma jiro hab gaar ah"
            ],
            answer: 0,
            explain: "Cloud environments-ku waxay u baahan yihiin habab u gaar ah."
          },
          {
            q: "Live acquisition wuxuu ka duwan yahay?",
            options: [
              "Powered-off system-ka, sababtoo ah mashiinka wuu shaqeynayaa",
              "Isku mid VM snapshot",
              "Ma jiro farqi",
              "Kaliya cloud ayaa isticmaala"
            ],
            answer: 0,
            explain: "Live acquisition-ku wuxuu ka dhacaa mashiin shaqeynaya, khatar iyo footprint labadaba leh."
          }
        ],

        exercise: {
          title: "Memory Acquisition Planning",
          steps: [
            "Liis garee 3 memory acquisition tools bilaash ah.",
            "Sharax sida footprint-ku u saameeyo natiijada.",
            "Sharax farqiga VM snapshot iyo bare-metal acquisition.",
            "Naqshadee acquisition plan scenario cloud-based ah."
          ],
          deliverable: "Memory acquisition planning guide."
        }
      },


      {
        slug: "volatility-framework-basics",
        title: "Volatility Framework Basics",
        english: "Volatility Framework Basics",
        minutes: 13,

        summary:
          "Baro sida Volatility (tool-ka ugu caansan memory analysis) u shaqeeyo, iyo plugins-ka aasaasiga ah.",

        sections: [
          {
            h: "Waa Maxay Volatility?",
            p:
            "Volatility waa framework Python-based ah, bilaash ah oo lagu falanqeeyo memory dumps. Waa tool-ka ugu caansan digital forensics industry-ga — wuxuu taageeraa Windows, Linux, iyo macOS memory formats."
          },
          {
            h: "Profile Identification",
            p:
            "Ka hor analysis, Volatility waa in uu ogaado 'profile'-ka (OS version, architecture) ee memory dump-ka — habkan wuxuu u ogolaadaa Volatility inuu si sax ah u fasiro structures-ka memory-ga."
          },
          {
            h: "Common Plugins",
            p:
            "pslist/pstree (liis processes), netscan (connections network), dlllist (DLLs process kasta), cmdline (command line arguments), filescan (files memory ku jira), malfind (raadinta injected code shaki leh)."
          },
          {
            h: "Volatility Workflow Example",
            p:
            "1) Ogaan profile-ka. 2) pslist si loo aragto processes. 3) netscan si loo helo connections shaki leh. 4) malfind si loo raadiyo injected code. 5) Falanqee process gaar ah oo shaki leh iyadoo lagu adeegsanayo dlllist/cmdline."
          }
        ],

        terms: [
          { term: "Volatility", def: "Framework Python-based ah, bilaash ah, oo memory forensics ah." },
          { term: "Profile", def: "OS version/architecture ee memory dump-ka, loo baahan yahay parsing sax ah." },
          { term: "Malfind", def: "Plugin raadiya injected code shaki leh memory-ga gudihiisa." }
        ],

        quiz: [
          {
            q: "Volatility waa?",
            options: [
              "Framework bilaash ah oo memory forensics ah",
              "Tool disk imaging ah",
              "Network scanner",
              "Password cracker"
            ],
            answer: 0,
            explain: "Volatility waa mid ka mid ah tools-ka ugu caansan memory analysis."
          },
          {
            q: "Profile identification sababta loo sameeyo waa?",
            options: [
              "Si Volatility u fasiro structures-ka memory-ga si sax ah",
              "Si loo kordhiyo speed",
              "Ma jiro sabab",
              "Kaliya loo baahan yahay Linux"
            ],
            answer: 0,
            explain: "OS versions kala duwan waxay leeyihiin memory structures kala duwan."
          },
          {
            q: "malfind plugin-ku wuxuu raadiyaa?",
            options: [
              "Injected code shaki leh memory-ga gudihiisa",
              "Kaliya network connections",
              "Kaliya passwords",
              "Kaliya files disk-ka"
            ],
            answer: 0,
            explain: "malfind waa plugin muhiim ah oo malware detection ah."
          },
          {
            q: "pstree plugin-ku wuxuu muujiyaa?",
            options: [
              "Processes-ka iyo parent-child relationships",
              "Kaliya IP addresses",
              "Kaliya file names",
              "Kaliya registry keys"
            ],
            answer: 0,
            explain: "pstree wuxuu bixiyaa muuqaal hierarchical ah oo processes ah."
          }
        ],

        exercise: {
          title: "Volatility Workflow Practice",
          steps: [
            "Sharax habka profile identification (concept ahaan).",
            "Liis garee 5 plugins Volatility oo caan ah iyo shaqadooda.",
            "Naqshadee workflow 5-tallaabo ah oo malware memory investigation ah.",
            "Sharax sababta malfind uu muhiim u yahay."
          ],
          deliverable: "Volatility workflow reference sheet."
        }
      },


      {
        slug: "process-analysis-memory",
        title: "Process Analysis Memory Gudaheeda",
        english: "Process Analysis in Memory",
        minutes: 10,

        summary:
          "Faham sida processes shaki leh loogu ogaan karo memory dump gudaheeda.",

        sections: [
          {
            h: "Normal vs Suspicious Process Trees",
            p:
            "Windows-ku wuxuu leeyahay parent-child relationships caadi ah (tusaale: explorer.exe wuxuu dhalaa programs user-ku furay). Process aan lahayn parent caadi ah (tusaale svchost.exe oo aan dhalan services.exe) waa red flag."
          },
          {
            h: "Process Hollowing & Injection",
            p:
            "Process hollowing waa marka attacker uu bilaabo process legit ah, kadibna uu ka saaro code-kiisa asalka ah oo uu geliyo code khaldan. Memory forensics-ku wuxuu ogaan karaa tani iyada oo la eegayo memory regions aan u dhigmin file-ka disk-ka ku jira."
          },
          {
            h: "Suspicious Process Names & Locations",
            p:
            "Processes-ka magacooda u eg system-ka caadiga ah (tusaale svch0st.exe halkii svchost.exe) ama ka socda meelo aan caadi ahayn (%TEMP%, %APPDATA%) waa calaamado shaki leh oo la baaro."
          },
          {
            h: "Comparing Process Memory to Disk",
            p:
            "Process kasta oo memory ku jira waa in la barbardhigo file-kiisa disk-ka ku jira (haddii uu jiro) — khilaaf u dhexeeya labadan (tusaale hash kala duwan) wuxuu muujin karaa in code-ka la beddelay memory-ga gudihiisa (injection)."
          }
        ],

        terms: [
          { term: "Process Hollowing", def: "Technique lagu bilaabo process legit ah oo code khaldan lagu geliyo." },
          { term: "Process Injection", def: "Gelinta code khaldan process legit ah oo shaqeynaya." }
        ],

        quiz: [
          {
            q: "svchost.exe oo aan dhalan services.exe waa calaamad?",
            options: [
              "Suspicious parent-child relationship",
              "Caadi",
              "Backup process",
              "Update Windows"
            ],
            answer: 0,
            explain: "svchost.exe caadi ahaan waxaa dhala services.exe — khilaaf waa red flag."
          },
          {
            q: "Process hollowing waa maxay?",
            options: [
              "Marka process legit ah la 'hollow' gareeyo oo code khaldan lagu geliyo",
              "Tirtirida process",
              "Backup process",
              "Update software"
            ],
            answer: 0,
            explain: "Process hollowing waa technique defense evasion ah oo caan ah."
          },
          {
            q: "svch0st.exe (0 halkii o) waa tusaale?",
            options: [
              "Malware iska dhigaya system process legit ah",
              "Process legit ah",
              "Backup file",
              "Antivirus"
            ],
            answer: 0,
            explain: "Magacyo isku eg (typosquatting) waa hab caan ah oo malware isticmaalo."
          },
          {
            q: "Sababta process memory loo barbardhigo file disk-ka ku jira waa?",
            options: [
              "Si loo ogaado haddii code-ka la beddelay (injection)",
              "Si loo kordhiyo speed",
              "Ma jiro sabab",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Khilaaf u dhexeeya wuxuu muujiyaa in memory-ga la beddelay."
          }
        ],

        exercise: {
          title: "Suspicious Process Identification",
          steps: [
            "Xulo 3 tusaale process names typosquatted ah.",
            "Sharax sida parent-child relationships loo baaro.",
            "Sharax habka process hollowing uu u shaqeeyo.",
            "Naqshadee checklist lagu ogaan karo processes shaki leh memory dump gudaheeda."
          ],
          deliverable: "Suspicious process analysis checklist."
        }
      },


      {
        slug: "network-connections-memory",
        title: "Network Connections Memory Gudaheeda",
        english: "Network Connections in Memory",
        minutes: 12,

        summary:
          "Faham sida network connections loo falanqeeyo memory dump gudaheeda si loo helo C2 communication.",

        sections: [
          {
            h: "Network Artifacts in Memory",
            p:
            "Memory-gu wuxuu kaydiyaa connections network ah oo hore (xitaa kuwo hadda xiran), oo ay ku jiraan source/destination IPs, ports, iyo process-ka la xiriira connection-kaas."
          },
          {
            h: "Identifying C2 Beaconing in Memory",
            p:
            "Halka firewall logs ay muujiyaan pattern (waqti/frequency), memory-gu wuxuu bixiyaa context dheeraad ah — process-kee ayaa la xiriira connection-kaas, iyo command line-ka process-kaas."
          },
          {
            h: "DNS Cache in Memory",
            p:
            "Memory-gu wuxuu kaydiyaa DNS cache — domains hore loo weydiiyay, oo ay ku jiraan kuwa laga yaabo in la tirtiray ka hor disk-ka logs-kiisa. Tani waa artifact qiimo leh marka la baarayo malicious domains."
          },
          {
            h: "Correlating Network + Process Data",
            p:
            "Isku darka netscan (connections) iyo pslist/dlllist (process details) wuxuu u ogolaadaa analyst inuu si dhab ah u aqoonsado process-ka masuulka ka ah connection C2 ah, ma aha kaliya IP-ga."
          }
        ],

        terms: [
          { term: "DNS Cache", def: "Kaydinta domains hore loo weydiiyay memory-ga gudihiisa." },
          { term: "netscan", def: "Volatility plugin muujiya network connections memory ah." }
        ],

        quiz: [
          {
            q: "Memory-gu wuxuu bixiyaa context dheeraad ah oo network connections ah sababtoo ah?",
            options: [
              "Wuxuu isku daraa connection-ka process-ka masuulka ka ah",
              "Firewall logs waa mid ka fiican marwalba",
              "Ma jiro faa'iido",
              "Memory-gu ma bixiyo network data"
            ],
            answer: 0,
            explain: "Firewall logs waxay bixiyaan IP/port, memory-gu wuxuu ku daraa process attribution."
          },
          {
            q: "DNS cache memory-ga qiimo leh sababtoo ah?",
            options: [
              "Waxay muujin kartaa domains la tirtiray disk logs-ka",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup",
              "DNS cache marnaba lama tirtirin"
            ],
            answer: 0,
            explain: "Memory DNS cache-ku wuxuu bixiyaa evidence dheeraad ah oo aan disk logs lahayn."
          },
          {
            q: "netscan plugin-ku wuxuu muujiyaa?",
            options: [
              "Network connections memory dump-ka ah",
              "Kaliya files",
              "Kaliya processes",
              "Kaliya registry keys"
            ],
            answer: 0,
            explain: "netscan waa plugin Volatility ah oo network-specific ah."
          }
        ],

        exercise: {
          title: "Network + Process Correlation",
          steps: [
            "Sharax sida netscan loogu isticmaali lahaa C2 detection.",
            "Sharax sida DNS cache memory-ga uu bixiyo evidence.",
            "Naqshadee scenario ah oo isku darta network + process data.",
            "Sharax sababta correlation-ku uu ka fiican yahay hal data source oo keliya."
          ],
          deliverable: "Network connections in memory analysis notes."
        }
      },


      {
        slug: "malware-memory-artifacts",
        title: "Malware Memory Artifacts",
        english: "Malware Memory Artifacts",
        minutes: 13,

        summary:
          "Faham calaamadaha malware ee memory dump gudaheeda muuqda, iyo sida loo aqoonsado.",

        sections: [
          {
            h: "Memory Indicators of Malware",
            p:
            "Processes aan lahayn parent legit ah, DLLs aan la load gareyn habka caadiga ah (unlinked modules), memory regions leh permissions aan caadi ahayn (RWX — read/write/execute isla mar), iyo strings shaki leh (C2 URLs, encoded commands)."
          },
          {
            h: "API Hooking Detection",
            p:
            "Malware badan wuxuu 'hook' gareeyaa Windows API functions si uu u qariyo dhaqankiisa (tusaale: qarinta process-ka liiska pslist). Memory forensics tools waxay ogaan karaan hooks-kan iyagoo eegaya function pointers oo aan u dhigmin baseline caadiga ah."
          },
          {
            h: "Extracting Malware from Memory",
            p:
            "Marka process shaki leh la aqoonsado, Volatility plugins (procdump, memdump) waxaa loo isticmaali karaa in la soo saaro executable-ka memory-ga gudihiisa, si loogu diro sandbox/analysis dheeraad ah."
          },
          {
            h: "Rootkit Detection in Memory",
            p:
            "Rootkits waxay isku dayaan inay isku qariyaan kernel-level, taasoo ka dhigaysa in disk-based tools aysan ogaan karin. Memory forensics-ku wuxuu isticmaalaa cross-view detection (barbardhig u dhexeeya API results iyo raw memory structures) si loo ogaado khilaaf."
          }
        ],

        terms: [
          { term: "API Hooking", def: "Technique malware isticmaalo si uu u qariyo dhaqankiisa API-yada gudahood." },
          { term: "RWX Memory", def: "Memory region leh read/write/execute permissions isla mar — shaki leh." },
          { term: "Cross-View Detection", def: "Barbardhigga API results iyo raw memory si loo ogaado rootkits." }
        ],

        quiz: [
          {
            q: "Memory region leh RWX permissions waa?",
            options: [
              "Calaamad shaki leh oo la baaro",
              "Caadi ahaan",
              "Waa mid la filayo dhammaan processes",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "RWX (read/write/execute isla mar) waa aan caadi ahayn oo malware indicator ah."
          },
          {
            q: "API hooking waxaa loo isticmaalaa?",
            options: [
              "Si malware-ku u qariyo dhaqankiisa",
              "Si loo kordhiyo performance",
              "Si loo sameeyo backup",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "Rootkits/malware waxay hook gareeyaan APIs si ay uga qariyaan detection."
          },
          {
            q: "Cross-view detection waxay isticmaashaa?",
            options: [
              "Barbardhigga API results iyo raw memory structures",
              "Kaliya network logs",
              "Kaliya disk hashes",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "Khilaaf u dhexeeya labadan wuxuu muujiyaa rootkit hiding."
          },
          {
            q: "procdump/memdump plugins-ka Volatility waxay u isticmaalaan?",
            options: [
              "Soo saarista executable-ka process shaki leh memory ah",
              "Xiritaanka network",
              "Sameynta backup",
              "Beddelidda password"
            ],
            answer: 0,
            explain: "Kuwaan waxay u ogolaadaan analysis dheeraad ah (sandbox) executable-ka la soo saaray."
          }
        ],

        exercise: {
          title: "Malware Memory Artifact Hunt",
          steps: [
            "Liis garee 5 memory indicators oo malware ah.",
            "Sharax sida API hooking loo ogaan karo.",
            "Sharax habka cross-view detection ee rootkits.",
            "Naqshadee checklist lagu baaro malware memory artifacts."
          ],
          deliverable: "Malware memory artifacts checklist."
        }
      },


      {
        slug: "memory-forensics-capstone",
        title: "Memory Forensics — Full Capstone",
        english: "Memory Forensics Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee full memory investigation oo fileless malware ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Endpoint-ka finance-ka wuxuu bixiyay alert antivirus ah oo aan waxba ogaan — laakiin analyst-ku wuxuu shakiyaa fileless malware. Waxaad haysataa memory dump laptop-kaas."
          },
          {
            h: "Acquisition & Profile",
            p:
            "Sharax sida memory acquisition loo sameeyay (tool-ka la doortay) iyo sida profile identification loo sameeyo."
          },
          {
            h: "Process & Network Analysis",
            p:
            "Naqshadee approach-ka pslist/pstree, malfind, iyo netscan si loo aqoonsado process shaki leh iyo connections C2 ah."
          },
          {
            h: "Extraction & Reporting",
            p:
            "Sharax sida process-ka shaki leh loo soo saari lahaa (procdump), oo isku dar findings-ka warbixin dhamaystiran."
          }
        ],

        terms: [
          { term: "Full Memory Investigation", def: "Habraaca isugu jira acquisition, process analysis, network analysis, iyo extraction." }
        ],

        quiz: [
          {
            q: "Fileless malware suspected, tallaabada koowaad waa?",
            options: [
              "Memory acquisition",
              "Isla markiiba disk imaging",
              "Warbixinta",
              "Xiritaanka network"
            ],
            answer: 0,
            explain: "Memory-gu waa halka fileless malware laga heli karo — waa in la qabtaa marka hore."
          },
          {
            q: "malfind + netscan isla mar loo isticmaalo waxay caawiyaan?",
            options: [
              "Aqoonsiga process shaki leh iyo connections-kiisa C2",
              "Kaliya disk imaging",
              "Kaliya backup",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Isku darka labadan wuxuu dhisaa muuqaal buuxa oo malware behavior ah."
          },
          {
            q: "Warbixinta ugu dambaysa waa in ay ku jirto?",
            options: [
              "Process/network findings, extraction results, IOCs",
              "Kaliya magaca antivirus-ka",
              "Kaliya waqtiga alert-ka",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Findings dhamaystiran ayaa taageera go'aan iyo containment."
          }
        ],

        exercise: {
          title: "Full Memory Forensics Investigation",
          steps: [
            "Sharax sida memory acquisition-ka loo sameeyay (concept ahaan).",
            "Naqshadee analysis plan (pslist, malfind, netscan).",
            "Sharax sida process-ka shaki leh loo soo saari lahaa (procdump).",
            "Diyaari warbixin buuxda oo IOCs iyo recommendations leh (portfolio-ready)."
          ],
          deliverable: "Full memory forensics investigation report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "df6",
    slug: "network-forensics",
    stage: "Sare",
    title: "Network Forensics",
    english: "Network Forensics",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa packet capture analysis, NetFlow, DNS/HTTP forensic analysis, iyo sida traffic encrypted loo maareeyo.",

    topics: [
      "Network Forensics Fundamentals",
      "Packet Capture Analysis with Wireshark",
      "NetFlow Analysis",
      "DNS & HTTP Forensic Analysis",
      "Encrypted Traffic Challenges",
      "Network Forensics Reconstruction",
      "Network Forensics Capstone",
    ],

    lessonList: [

      {
        slug: "network-forensics-fundamentals",
        title: "Aasaaska Network Forensics",
        english: "Network Forensics Fundamentals",
        minutes: 15,

        summary:
          "Faham qeexitaanka network forensics iyo sida uga duwan tahay network monitoring caadiga ah.",

        sections: [
          {
            h: "Waa Maxay Network Forensics?",
            p:
            "Network forensics waa ururinta, kaydinta, iyo falanqaynta traffic-ka network-ka si loo taageero baaritaan security ah. Waxay ka duwan tahay monitoring caadiga ah (real-time alerting) sababtoo ah waxay diiradda saartaa in la dib-u-eego dhacdooyin hore."
          },
          {
            h: "Full Packet Capture vs Flow Data",
            p:
            "Full packet capture (PCAP) wuxuu kaydiyaa packet kasta oo dhammaystiran, oo ay ku jiraan payload-ka — wuxuu bixiyaa faahfaahin buuxa laakiin storage badan u baahan yahay. Flow data (NetFlow) waxay kaydiyaan kaliya metadata (source/dest, bytes, duration) — storage yar, faahfaahin yar."
          },
          {
            h: "Network Forensics Data Sources",
            p:
            "Full packet capture systems, NetFlow/sFlow collectors, firewall logs, proxy logs, DNS logs, iyo IDS/IPS alerts — mid kasta wuxuu bixiyaa dhinac kala duwan oo network activity ah."
          },
          {
            h: "Legal Considerations in Network Forensics",
            p:
            "Ka reebitaanka traffic-ka employees-ka waxay ku xiran tahay xeerarka privacy iyo consent-ka shirkadda. Waa muhiim in la fahmo policies-ka monitoring-ka ka hor la bilaabo capture."
          }
        ],

        terms: [
          { term: "PCAP", def: "Full packet capture, oo ay ku jiraan payload-ka packets-ka." },
          { term: "NetFlow", def: "Flow metadata (source/dest, bytes, duration) aan payload lahayn." }
        ],

        quiz: [
          {
            q: "Farqiga PCAP iyo NetFlow waa?",
            options: [
              "PCAP wuxuu kaydiyaa payload buuxa, NetFlow wuxuu kaydiyaa metadata oo keliya",
              "Isku mid",
              "NetFlow wuxuu ka fiican yahay dhammaan xaaladaha",
              "PCAP ma khuseeyo forensics"
            ],
            answer: 0,
            explain: "PCAP wuxuu bixiyaa faahfaahin buuxa, NetFlow wuxuu bixiyaa muuqaal guud oo storage yar leh."
          },
          {
            q: "Network forensics ka duwan yahay monitoring caadiga ah sababtoo ah?",
            options: [
              "Waxay diiradda saartaa dib-u-eegista dhacdooyin hore",
              "Isku mid",
              "Monitoring-ku ma jirto",
              "Forensics-ku waa mid real-time ah oo keliya"
            ],
            answer: 0,
            explain: "Forensics-ku waa habka dib-u-eegista, ma aha real-time alerting oo keliya."
          },
          {
            q: "Sababta legal considerations muhiim u yihiin network forensics waa?",
            options: [
              "Privacy iyo consent policies waxay xaddidaan sida monitoring-ku u dhaco",
              "Ma jiro sabab legal ah",
              "Kaliya law enforcement ayaa khuseeya",
              "Network forensics waligeed sharci ma leh"
            ],
            answer: 0,
            explain: "Monitoring-ka employees-ka waa in loo hoggaansamo xeerarka privacy."
          }
        ],

        exercise: {
          title: "Network Forensics Data Sources Mapping",
          steps: [
            "Liis garee 5 data sources ee network forensics.",
            "Sharax farqiga PCAP iyo NetFlow, gaar ahaan faa'iidooyinka/qasabka.",
            "Sharax scenario ah oo PCAP ugu habboon iyo mid NetFlow ugu habboon.",
            "Sharax legal considerations muhiimka ah."
          ],
          deliverable: "Network forensics data sources overview."
        }
      },


      {
        slug: "packet-capture-analysis-wireshark-df",
        title: "Packet Capture Analysis with Wireshark",
        english: "Packet Capture Analysis with Wireshark",
        minutes: 11,

        summary:
          "Sii qoto dheeree Wireshark skills-kaaga forensics ahaan — filters, follow stream, iyo export objects.",

        sections: [
          {
            h: "Advanced Display Filters",
            p:
            "Filters sida http.request.method==\"POST\", tcp.flags.syn==1 && tcp.flags.ack==0 (SYN packets oo keliya), ama ip.addr==X.X.X.X waxay u ogolaadaan analyst inuu si degdeg ah u helo traffic gaar ah malaayiin packets gudahood."
          },
          {
            h: "Follow TCP/HTTP Stream",
            p:
            "'Follow Stream' feature-ka Wireshark wuxuu isku daraa dhammaan packets isla conversation-ka, kuna muujiyaa xogta sida qof uu la akhrin lahaa — muhiim marka la eegayo HTTP requests/responses ama chat protocols."
          },
          {
            h: "Export Objects",
            p:
            "Wireshark wuxuu u oggolaadaa File > Export Objects si loo soo saaro files (images, documents, executables) oo ka soo baxay HTTP/FTP traffic — muhiim marka la baarayo malware downloads ama data exfiltration."
          },
          {
            h: "Statistics & Conversations",
            p:
            "Statistics menu-ga wuxuu bixiyaa Conversations (liis dhammaan IP pairs iyo bytes u dhaxeeya), Protocol Hierarchy (breakdown protocols ah), iyo IO Graphs (muuqaal waqti ah oo traffic volume ah) — kuwaan waxay caawiyaan baseline iyo anomaly detection."
          }
        ],

        terms: [
          { term: "Follow Stream", def: "Feature Wireshark ah oo isku dara conversation packets oo dhan." },
          { term: "Export Objects", def: "Feature lagu soo saaro files traffic-ka gudihiisa." }
        ],

        quiz: [
          {
            q: "Follow Stream faa'iidadeeda ugu weyn waa?",
            options: [
              "Isku darista conversation packets si loo akhriyo sida qof kale",
              "Tirtirida packets",
              "Kordhinta speed capture-ka",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Wuxuu ka dhigaa akhriska HTTP/chat traffic mid fudud."
          },
          {
            q: "Export Objects waxaa loo isticmaalaa?",
            options: [
              "Soo saarista files ka soo baxay traffic (malware, documents)",
              "Xiritaanka capture-ka",
              "Beddelidda filters",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "Files-ka ka soo baxay HTTP/FTP waxaa lagu soo saari karaa si toos ah."
          },
          {
            q: "tcp.flags.syn==1 && tcp.flags.ack==0 filter-ku wuxuu muujiyaa?",
            options: [
              "SYN packets oo keliya (connection attempts cusub)",
              "Dhammaan traffic",
              "Kaliya HTTP traffic",
              "Kaliya DNS queries"
            ],
            answer: 0,
            explain: "Filter-kani wuxuu kala saaraa packets bilowga connection ah."
          },
          {
            q: "IO Graphs waxay bixiyaan?",
            options: [
              "Muuqaal waqti ah oo traffic volume ah",
              "Kaliya IP addresses",
              "Kaliya port numbers",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "IO Graphs waxay caawiyaan baseline iyo anomaly detection visual ahaan."
          }
        ],

        exercise: {
          title: "Advanced Wireshark Practice",
          steps: [
            "Qor 3 display filters advanced ah oo aad isticmaali lahayd.",
            "Sharax habka Follow Stream loo isticmaalo.",
            "Sharax marka Export Objects loo isticmaali lahaa (scenario).",
            "Sharax sida Statistics menu loogu isticmaali lahaa baseline analysis."
          ],
          deliverable: "Advanced Wireshark techniques reference sheet."
        }
      },


      {
        slug: "netflow-analysis",
        title: "NetFlow Analysis",
        english: "NetFlow Analysis",
        minutes: 14,

        summary:
          "Faham sida NetFlow data loo falanqeeyo si loo ogaado patterns network-ka oo dhan.",

        sections: [
          {
            h: "NetFlow Fields",
            p:
            "NetFlow record kasta wuxuu ka kooban yahay: source/destination IP, source/destination port, protocol, bytes, packets, iyo start/end time. Ma jiro payload — kaliya 'who talked to whom, when, and how much'."
          },
          {
            h: "Sababta NetFlow Loo Isticmaalo",
            p:
            "Full packet capture ma suurtagal aha network-yada waaweyn (storage aad u badan). NetFlow wuxuu u ogolaadaa la socodka traffic patterns network-ka oo dhan muddo dheer, iyada oo storage yar la isticmaalayo."
          },
          {
            h: "Detecting Anomalies with NetFlow",
            p:
            "Data volume aan caadi ahayn (upload weyn oo dhawaan bilaabmay), connections cusub oo ka yimid host aan caadi ahayn, ama traffic dalal aan la filayn — kuwan oo dhan waxaa lagu ogaan karaa NetFlow data iyada oo aan la baahnayn payload."
          },
          {
            h: "NetFlow Tools",
            p:
            "SiLK, nfdump, iyo commercial tools sida SolarWinds waxaa loo isticmaalaa NetFlow collection iyo analysis. Kuwan waxay bixiyaan queries iyo visualization NetFlow data-ka."
          }
        ],

        terms: [
          { term: "NetFlow Record", def: "Metadata connection ah, aan payload lahayn." },
          { term: "nfdump", def: "Tool bilaash ah oo NetFlow analysis ah." }
        ],

        quiz: [
          {
            q: "NetFlow record-ku wuxuu ka kooban yahay?",
            options: [
              "Source/dest IP, port, protocol, bytes, waqti",
              "Payload buuxa",
              "Passwords",
              "File contents"
            ],
            answer: 0,
            explain: "NetFlow waa metadata oo keliya, ma bixiyo payload."
          },
          {
            q: "Sababta NetFlow loo isticmaalo halkii PCAP la isticmaali lahaa waa?",
            options: [
              "Storage yar oo u ogolaanaya la socodka muddo dheer",
              "Wuxuu bixiyaa faahfaahin badan",
              "Ma jiro faa'iido",
              "Waa mid la joojiyay"
            ],
            answer: 0,
            explain: "Networks waaweyn kuma filna full packet capture — NetFlow waa xal storage-friendly ah."
          },
          {
            q: "Data volume weyn oo dhawaan bilaabmay wuxuu tilmaamayaa?",
            options: [
              "Suurtagal exfiltration ama anomaly u baahan baaritaan",
              "Caadi",
              "Backup",
              "Update software"
            ],
            answer: 0,
            explain: "Anomalies-ka volume-ka waa signal muhiim ah oo NetFlow bixiyo."
          },
          {
            q: "nfdump waa?",
            options: [
              "Tool bilaash ah oo NetFlow analysis ah",
              "Tool memory forensics ah",
              "Tool disk imaging ah",
              "Password cracker"
            ],
            answer: 0,
            explain: "nfdump waa tool caan ah oo NetFlow data-ka lagu falanqeeyo."
          }
        ],

        exercise: {
          title: "NetFlow Anomaly Detection",
          steps: [
            "Sharax farqiga NetFlow iyo full packet capture.",
            "Liis garee 3 anomalies NetFlow lagu ogaan karo.",
            "Sharax sababta storage-ku uu u yahay factor muhiim ah.",
            "Naqshadee query concept ah oo raadinaya top talkers (IP-yada ugu badan traffic)."
          ],
          deliverable: "NetFlow analysis notes."
        }
      },


      {
        slug: "dns-http-forensic-analysis",
        title: "DNS & HTTP Forensic Analysis",
        english: "DNS and HTTP Forensic Analysis",
        minutes: 12,

        summary:
          "Faham qoto dheer sida DNS iyo HTTP logs loo falanqeeyo forensics ahaan.",

        sections: [
          {
            h: "DNS Query Logs",
            p:
            "DNS logs waxay diiwaan geliyaan domain kasta oo la weydiiyay, waqtiga, iyo host-ka weydiiyay. Domains cusub oo dhawaan la diiwaan geliyay, subdomains random ah (DGA — Domain Generation Algorithm), ama qadar aad u badan oo TXT queries ah waa red flags."
          },
          {
            h: "Domain Generation Algorithms (DGA)",
            p:
            "Malware casriga ah wuxuu isticmaalaa DGA si uu u sameeyo domains random ah maalin kasta (C2 resilience ahaan) — DNS logs waxay muujin karaan pattern: qadar badan oo NXDOMAIN (domain aan jirin) responses ah oo isku mid ah waqti gaaban."
          },
          {
            h: "HTTP Request/Response Analysis",
            p:
            "HTTP logs waxay bixiyaan: User-Agent (identify browser/tool), Referer (halka request-ka ka yimid), status codes, iyo response sizes. Traffic C2 ah badanaa wuxuu leeyahay User-Agent aan caadi ahayn ama beacon patterns joogto ah."
          },
          {
            h: "Proxy Logs & Web Filtering",
            p:
            "Proxy servers waxay kaydiyaan dhammaan web requests employees-ku sameeyaan, ay ku jiraan URLs buuxa (xitaa HTTPS metadata). Kuwaan waa source qiimo leh oo la baaro phishing clicks ama data exfiltration via web."
          }
        ],

        terms: [
          { term: "DGA", def: "Domain Generation Algorithm — habka malware-ku ku sameeyo domains random ah." },
          { term: "NXDOMAIN", def: "DNS response muujinaya domain aan jirin." }
        ],

        quiz: [
          {
            q: "Qadar badan oo NXDOMAIN responses ah oo isku mid ah waqti gaaban waxay muujin kartaa?",
            options: [
              "DGA malware oo raadinaya C2 server",
              "Caadi",
              "Backup DNS",
              "Update software"
            ],
            answer: 0,
            explain: "DGA-based malware wuxuu tijaabiyaa domains badan, badankood aan jirin."
          },
          {
            q: "User-Agent aan caadi ahayn HTTP traffic ahaan wuxuu tilmaamayaa?",
            options: [
              "Traffic C2 suurtagal ah",
              "Website caadi ah",
              "Backup process",
              "Update Windows"
            ],
            answer: 0,
            explain: "Malware badan wuxuu isticmaalaa User-Agent gaar ah oo ka duwan browsers caadiga ah."
          },
          {
            q: "Proxy logs waa qiimo leh sababtoo ah?",
            options: [
              "Waxay kaydiyaan URLs buuxa, xitaa HTTPS metadata",
              "Waxay kaydiyaan passwords oo keliya",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Proxy logs waa source muhiim ah oo web activity investigation ah."
          },
          {
            q: "DGA waxaa loo isticmaalaa?",
            options: [
              "Sida malware-ku ugu sii jiro C2 resilience marka domains la block-gareeyo",
              "Sida website-yadu u dhisan yihiin",
              "Sida backup loo sameeyo",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "DGA wuxuu ka dhigaa malware mid adag in la joojiyo iyada oo la block-gareynayo hal domain."
          }
        ],

        exercise: {
          title: "DNS/HTTP Forensic Investigation",
          steps: [
            "Sharax calaamadaha DGA-based malware DNS logs gudahood.",
            "Sharax sida User-Agent loo isticmaali lahaa C2 detection.",
            "Sharax faa'iidada proxy logs.",
            "Naqshadee investigation plan phishing click case ah oo DNS/HTTP logs isticmaala."
          ],
          deliverable: "DNS and HTTP forensic analysis notes."
        }
      },


      {
        slug: "encrypted-traffic-challenges",
        title: "Encrypted Traffic Challenges",
        english: "Encrypted Traffic Challenges",
        minutes: 10,

        summary:
          "Faham sida encryption uga adkeeyo network forensics-ka, iyo habab la isticmaalo si loo maareeyo.",

        sections: [
          {
            h: "Sababta Encryption Uga Adkeeyo Forensics",
            p:
            "HTTPS/TLS wuxuu qariyaa payload-ka packets-ka — analyst-ku ma arki karo content-ka dhabta ah. Tani waa mid wanaagsan privacy ahaan, laakiin waxay adkeeysaa in la ogaado waxa dhabta ah dhacaya traffic-ka gudihiisa."
          },
          {
            h: "Metadata Analysis (Analysis Without Decryption)",
            p:
            "Xitaa aan la furin content-ka, waxaa la falanqeyn karaa: destination IP/domain (SNI - Server Name Indication), packet sizes/timing (JA3 fingerprinting), iyo certificate details. Kuwaan waxay bixiyaan macluumaad muhiim ah aan decryption loo baahnayn."
          },
          {
            h: "SSL/TLS Inspection (Corporate Networks)",
            p:
            "Shirkadaha qaarkood waxay hirgeliyaan SSL inspection (man-in-the-middle proxy) si loo eego traffic-ka encrypted ah — tani waxay u baahan tahay certificate corporate ah oo la rakibay devices-ka, waxayna kicin kartaa privacy concerns."
          },
          {
            h: "JA3 Fingerprinting",
            p:
            "JA3 waa technique lagu aqoonsado clients/malware iyadoo lagu adeegsanayo sida TLS handshake-ku u eg yahay (cipher suites, extensions) — malware badan wuxuu leeyahay JA3 fingerprint gaar ah oo ka duwan browsers caadiga ah, xitaa haddii traffic-ku encrypted yahay."
          }
        ],

        terms: [
          { term: "SNI", def: "Server Name Indication — domain-ka la arki karo TLS handshake gudihiisa, xitaa encrypted." },
          { term: "JA3 Fingerprinting", def: "Habka lagu aqoonsado clients iyadoo lagu adeegsanayo TLS handshake pattern." }
        ],

        quiz: [
          {
            q: "SNI wuxuu u oggolaadaa analyst inuu arko?",
            options: [
              "Domain-ka la xiriirayo, xitaa haddii traffic-ku encrypted yahay",
              "Content-ka buuxa ee traffic-ka",
              "Password-ka user-ka",
              "Ma jiro macluumaad la heli karo"
            ],
            answer: 0,
            explain: "SNI waa qayb TLS handshake ah oo aan encrypted ahayn."
          },
          {
            q: "JA3 fingerprinting waxay isticmaashaa?",
            options: [
              "Pattern-ka TLS handshake si loo aqoonsado clients/malware",
              "Content-ka encrypted",
              "Passwords",
              "IP addresses oo keliya"
            ],
            answer: 0,
            explain: "JA3 wuxuu bixiyaa aqoonsi iyada oo aan decryption loo baahnayn."
          },
          {
            q: "SSL inspection corporate networks-ka waxay u baahan tahay?",
            options: [
              "Certificate corporate ah oo devices-ka la rakibay",
              "Wax kama baahna",
              "Kaliya firewall",
              "Kaliya antivirus"
            ],
            answer: 0,
            explain: "MITM proxy-gu wuxuu u baahan yahay in devices-ku aamino certificate-ka."
          },
          {
            q: "Metadata analysis encrypted traffic ahaan wuxuu u ogolaadaa analyst inuu?",
            options: [
              "Falanqeeyo destination/timing/certificate iyada oo aan content la furin",
              "Wax kasta uu falanqeeyo sida traffic aan encrypted ahayn",
              "Wax uu falanqeeyo ma jiraan",
              "Kaliya passwords uu helo"
            ],
            answer: 0,
            explain: "Metadata-ku wuxuu weli bixiyaa macluumaad qiimo leh."
          }
        ],

        exercise: {
          title: "Encrypted Traffic Analysis Approach",
          steps: [
            "Sharax sababta HTTPS uga adkeeyo forensics-ka.",
            "Sharax sida SNI loo isticmaali lahaa xitaa traffic encrypted ah.",
            "Sharax habka JA3 fingerprinting.",
            "Sharax faa'iido iyo qasab SSL inspection corporate network ah."
          ],
          deliverable: "Encrypted traffic analysis approach notes."
        }
      },


      {
        slug: "network-forensics-reconstruction",
        title: "Network Forensics Reconstruction",
        english: "Network Forensics Reconstruction",
        minutes: 13,

        summary:
          "Faham sida dhacdo network ah loo dib-u-dhiso iyadoo la isticmaalayo multiple data sources.",

        sections: [
          {
            h: "Timeline Reconstruction",
            p:
            "Isku darka firewall logs, DNS logs, proxy logs, iyo PCAP (haddii la haysto) wuxuu u ogolaadaa analyst inuu dhiso timeline dhamaystiran: recon → initial access → C2 → lateral movement → exfiltration."
          },
          {
            h: "Reconstructing File Transfers",
            p:
            "Haddii PCAP la haysto, files-ka la soo dejiyay ama la exfiltrate gareeyay waxaa lagu soo celin karaa (Export Objects Wireshark). Haddii kaliya NetFlow la haysto, waxaad kaliya go'aamin kartaa qadarka data-ga la wareejiyay, ma aha content-ka."
          },
          {
            h: "Attribution Challenges",
            p:
            "IP addresses waxay noqon karaan compromised infrastructure ama VPN/proxy — attribution 100% ah waa mid adag. Behavior patterns (TTPs) badanaa waa mid ka kalsooni badan IP addresses gaarka ah."
          },
          {
            h: "Multi-Source Correlation Example",
            p:
            "Tusaale: DNS log wuxuu muujiyaa query domain shaki ah → firewall log wuxuu muujiyaa connection isla domain-kaas → PCAP wuxuu muujiyaa data upload weyn → endpoint log wuxuu muujiyaa process-ka la xiriira. Afartan waxay isku dhisaan case dhamaystiran."
          }
        ],

        terms: [
          { term: "Timeline Reconstruction", def: "Habka la dhiso taariikh dhamaystiran oo dhacdo laga bilaabo bilowga." },
          { term: "Multi-Source Correlation", def: "Isku darka logs kala duwan si loo dhiso muuqaal buuxa." }
        ],

        quiz: [
          {
            q: "Timeline reconstruction-ku wuxuu isku daraa?",
            options: [
              "Firewall, DNS, proxy logs iyo PCAP",
              "Kaliya hal log source",
              "Kaliya interview shaqaalaha",
              "Ma jiro isku darid loo baahan yahay"
            ],
            answer: 0,
            explain: "Data sources badan waxay dhisaan muuqaal buuxa oo weerarka ah."
          },
          {
            q: "Attribution 100% ah waa mid adag sababtoo ah?",
            options: [
              "IP addresses waxay noqon karaan compromised infrastructure ama VPN",
              "Attribution waa mid fudud marwalba",
              "Ma jiro sabab",
              "IP addresses waligeed sax yihiin"
            ],
            answer: 0,
            explain: "Attacker-yadu waxay isticmaalaan infrastructure dhexdhexaad ah si loo qariyo asalka."
          },
          {
            q: "Multi-source correlation faa'iidadeeda ugu weyn waa?",
            options: [
              "Dhisidda case dhamaystiran oo aan hal source ku tiirsanayn",
              "Kordhinta storage",
              "Ma jiro faa'iido",
              "Kaliya loo baahan yahay compliance"
            ],
            answer: 0,
            explain: "Log kastaa wuxuu bixiyaa dhinac kala duwan oo dhacdada oo dhan."
          }
        ],

        exercise: {
          title: "Full Timeline Reconstruction",
          steps: [
            "Xulo scenario weerar ah (recon → C2 → exfiltration).",
            "Naqshadee liis data sources aad isticmaali lahayd marxalad kasta.",
            "Dhis timeline concept ah oo isku darta sources-ka.",
            "Sharax sababta attribution ay tahay mid adag scenario-gan."
          ],
          deliverable: "Network forensics reconstruction timeline."
        }
      },


      {
        slug: "network-forensics-capstone",
        title: "Network Forensics — Full Capstone",
        english: "Network Forensics Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee full network investigation oo data exfiltration ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "SIEM-ku wuxuu muujinayaa DNS queries badan oo aan caadi ahayn oo ka socda workstation hal ah, oo ay ku xigto data upload weyn oo dhawaan bilaabmay."
          },
          {
            h: "Data Source Correlation",
            p:
            "Naqshadee plan-ka isticmaalka DNS logs, NetFlow, iyo (haddii la haysto) PCAP si loo aqoonsado nooca weerarka."
          },
          {
            h: "Encrypted Traffic Handling",
            p:
            "Sharax sida SNI/JA3 loo isticmaali lahaa haddii traffic-ku encrypted yahay."
          },
          {
            h: "Full Reconstruction",
            p:
            "Isku dar findings-ka timeline dhamaystiran, oo qor warbixin sharaxaysa DGA suspected, C2 communication, iyo data exfiltration estimate."
          }
        ],

        terms: [
          { term: "Full Network Investigation", def: "Habraaca isugu jira multi-source correlation iyo timeline reconstruction." }
        ],

        quiz: [
          {
            q: "DNS queries badan oo aan caadi ahayn waxay muujin kartaan?",
            options: [
              "DGA-based malware C2",
              "Caadi",
              "Backup",
              "Update software"
            ],
            answer: 0,
            explain: "Pattern-kan waa mid caan ah oo DGA malware ah."
          },
          {
            q: "Data upload weyn dhawaan bilaabmay isla waqtiga DNS anomaly-ga wuxuu tilmaamayaa?",
            options: [
              "Data exfiltration suurtagal ah",
              "Backup caadi ah",
              "Update Windows",
              "Antivirus scan"
            ],
            answer: 0,
            explain: "Correlation-ka waqtiga ayaa kaa caawinaya inaad go'aamiso dhacdada."
          },
          {
            q: "Warbixinta ugu dambaysa waa in ay ku jirto?",
            options: [
              "Timeline, IOCs, exfiltration estimate",
              "Kaliya magaca workstation-ka",
              "Kaliya waqtiga alert-ka",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Findings dhamaystiran waa muhiim si loo taageero go'aan iyo response."
          }
        ],

        exercise: {
          title: "Full Network Forensics Investigation",
          steps: [
            "Naqshadee data source correlation plan (DNS, NetFlow, PCAP).",
            "Sharax sida encrypted traffic loo maareeyo haddii uu jiro.",
            "Dhis timeline dhamaystiran oo weerarka ah.",
            "Diyaari warbixin buuxda oo IOCs iyo exfiltration estimate leh (portfolio-ready)."
          ],
          deliverable: "Full network forensics investigation report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "df7",
    slug: "linux-macos-forensics",
    stage: "Sare",
    title: "Linux & macOS Forensics",
    english: "Linux & macOS Forensics",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa Linux log analysis forensics ahaan, persistence mechanisms, iyo macOS artifacts sida Spotlight iyo Time Machine.",

    topics: [
      "Linux Forensics Fundamentals",
      "Linux Log Analysis for Forensics",
      "Linux Persistence Forensics",
      "macOS Forensics Fundamentals",
      "macOS Artifacts: Spotlight & Time Machine",
      "Cross-Platform Forensics Challenges",
      "Linux & macOS Capstone",
    ],

    lessonList: [

      {
        slug: "linux-forensics-fundamentals",
        title: "Aasaaska Linux Forensics",
        english: "Linux Forensics Fundamentals",
        minutes: 10,

        summary:
          "Faham qeexitaanka Linux forensics iyo sida uga duwan tahay Windows forensics.",

        sections: [
          {
            h: "Linux Forensics vs Windows Forensics",
            p:
            "Linux ma leh MFT ama Registry — waxaa jira inodes iyo config files text-based ah. Timestamps-ka waxay ka duwan yihiin (atime/mtime/ctime, ma jiro 'created' universal ah EXT2/3 gudahood). Forensic tools-ku waa in ay taageeraan labadaba filesystem types."
          },
          {
            h: "Key Linux Directories for Forensics",
            p:
            "/var/log (logs), /etc (configuration, users), /home (user data), /tmp (temporary files, malware favorite), /root (root's home), /proc (runtime process information — virtual filesystem)."
          },
          {
            h: "/proc Filesystem",
            p:
            "/proc waa filesystem virtual ah oo bixiya macluumaad runtime ah oo ku saabsan kernel-ka iyo processes-ka (live system). Marka mashiinku shaqeynayo, /proc/[PID]/ wuxuu bixiyaa faahfaahin process kasta — command line, open files, memory maps."
          },
          {
            h: "Bash History & Shell Artifacts",
            p:
            ".bash_history (ama zsh_history) wuxuu diiwaan geliyaa amarrada user-ku fuliyay — evidence qiimo leh, laakiin attacker-yadu si fudud ayey u tirtiri karaan ama u xannibi karaan (unset HISTFILE)."
          }
        ],

        terms: [
          { term: "/proc", def: "Filesystem virtual ah oo bixiya macluumaad runtime kernel/processes ah." },
          { term: "bash_history", def: "File diiwaan geliya amarrada user-ku fuliyay shell-ka." }
        ],

        quiz: [
          {
            q: "Linux ma leh MFT ama Registry sababtoo ah?",
            options: [
              "Wuxuu isticmaalaa inodes iyo config files text-based ah",
              "Linux ma leh filesystem",
              "Wuxuu isticmaalaa NTFS",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Linux-ku wuxuu isticmaalaa qaab-dhismeed ka duwan Windows."
          },
          {
            q: "/proc filesystem-ku wuxuu bixiyaa?",
            options: [
              "Macluumaad runtime ah oo kernel/processes ah",
              "Files kaydsan si joogto ah",
              "Backup data",
              "Kaliya user passwords"
            ],
            answer: 0,
            explain: "/proc waa virtual filesystem, wuxuu ka jiraa kaliya inta mashiinku shaqeynayo."
          },
          {
            q: "Attacker-yadu waxay ka fogaan karaan bash_history iyagoo?",
            options: [
              "Unset HISTFILE ama tirtiro file-ka",
              "Ma jirto hab loo ilaaliyo",
              "Waligeed lama tirtiro",
              "Bash history-ga si otomaatig ah ayaa u backup gareysa"
            ],
            answer: 0,
            explain: "Techniques anti-forensic ah waxay xannibi karaan history logging-ka."
          },
          {
            q: "/tmp waa meel loo aqoonsaday?",
            options: [
              "Temporary files, malware favorite",
              "User passwords",
              "System logs oo keliya",
              "Backup permanent ah"
            ],
            answer: 0,
            explain: "/tmp waa meel kaydinta ku meel gaarka ah, oo malware badan u jecel yahay."
          }
        ],

        exercise: {
          title: "Linux Forensics Directory Mapping",
          steps: [
            "Liis garee 6 directories Linux ah oo forensic value leh.",
            "Sharax sida /proc uga duwan yahay directories kale.",
            "Sharax sida bash_history loo isticmaali lahaa investigation.",
            "Sharax sababta attacker-yadu ay isku dayaan inay tirtiraan history."
          ],
          deliverable: "Linux forensics directory reference sheet."
        }
      },


      {
        slug: "linux-log-analysis-forensics",
        title: "Linux Log Analysis Forensics Ahaan",
        english: "Linux Log Analysis for Forensics",
        minutes: 12,

        summary:
          "Sii qoto dheeree fahamkaaga Linux logs forensics ahaan — journald, syslog, iyo application-specific logs.",

        sections: [
          {
            h: "journald & systemd Logs",
            p:
            "Systemd distributions casriga ah waxay isticmaalaan journald (binary format) halkii text logs caadiga ah. journalctl command-ku waa loo baahan yahay in la akhriyo — wuxuu bixiyaa filtering awood badan (waqti, unit, priority)."
          },
          {
            h: "Application-Specific Logs",
            p:
            "Web servers (Apache/Nginx access.log, error.log), databases (MySQL/PostgreSQL logs), iyo mail servers (mail.log) waxay bixiyaan evidence application-level ah oo dheeraad ah oo system logs ka baxsan."
          },
          {
            h: "Log Rotation & Retention",
            p:
            "Linux logs waxay si joogto ah u 'rotate' garaan (logrotate) — logs hore waxay noqdaan compressed archives (.gz). Waa muhiim in la fahmo retention policy si loo ogaado ilaa waqti la gaarsiin karo timeline-ka."
          },
          {
            h: "Timestamp Timezone Considerations",
            p:
            "Linux servers badanaa waxay isticmaalaan UTC, laakiin qaarkood way isticmaalaan local timezone. Marka la dhisayo timeline, waa waajib in la xaqiijiyo timezone-ka server kasta si loo iska ilaaliyo khaladaad."
          }
        ],

        terms: [
          { term: "journald", def: "System logging Linux ah oo binary format ah, la akhriyo journalctl." },
          { term: "logrotate", def: "Tool maamula rotation-ka logs-ka Linux." }
        ],

        quiz: [
          {
            q: "journald logs waxaa lagu akhriyaa?",
            options: [
              "journalctl command",
              "cat command oo keliya",
              "Notepad",
              "Excel"
            ],
            answer: 0,
            explain: "journald waa binary format, u baahan tool gaar ah."
          },
          {
            q: "logrotate waxay sameeyaan?",
            options: [
              "Compress gareeya oo maareeya logs hore",
              "Tirtiraan logs oo dhan",
              "Kaydiyaan backup",
              "Encrypt gareeyaan logs"
            ],
            answer: 0,
            explain: "Logs waxay noqdaan compressed archives si loo yareeyo storage."
          },
          {
            q: "Sababta timezone la xaqiijiyo timeline dhisidda muhiim u tahay waa?",
            options: [
              "Si loo iska ilaaliyo khaladaad marka logs server kala duwan la isku daro",
              "Ma jiro sabab",
              "Timezone-ku waligiis waa UTC",
              "Kaliya loo baahan yahay compliance"
            ],
            answer: 0,
            explain: "Server-yo kala duwan waxay isticmaali karaan timezones kala duwan."
          },
          {
            q: "Application-specific logs waxaa ka mid ah?",
            options: [
              "Apache access.log, MySQL logs",
              "Kaliya system logs",
              "Kaliya kernel logs",
              "Ma jiraan"
            ],
            answer: 0,
            explain: "Applications-ku waxay kaydiyaan logs-kooda gaarka ah oo dheeraad ah."
          }
        ],

        exercise: {
          title: "Linux Log Analysis Practice",
          steps: [
            "Sharax farqiga journald iyo syslog caadiga ah.",
            "Liis garee 4 application-specific logs iyo qiimahooda.",
            "Sharax sida logrotate uu u saameeyo timeline building.",
            "Sharax sababta timezone la xaqiijiyo."
          ],
          deliverable: "Linux log analysis practice notes."
        }
      },


      {
        slug: "linux-persistence-forensics",
        title: "Linux Persistence Forensics",
        english: "Linux Persistence Forensics",
        minutes: 13,

        summary:
          "Baro sida persistence mechanisms Linux loo baaro forensics ahaan (deeper than SOC investigation level).",

        sections: [
          {
            h: "Systemd Service Persistence",
            p:
            "Attacker-yadu waxay abuuraan systemd services cusub (/etc/systemd/system/) si ay malware-kooda ugu sii shaqeeyaan dib u shidista kaddib. Forensic analyst-ku wuxuu baaraa services-ka la abuuray ama la beddelay dhawaanahan (timestamps)."
          },
          {
            h: "Cron & At Jobs Forensics",
            p:
            "Marka lagu daro user crontabs (/var/spool/cron/), system-wide cron (/etc/cron.d/, /etc/crontab), waxaa jira 'at' jobs (hal-mar scheduled tasks) oo sidoo kale la baari karo persistence ahaan."
          },
          {
            h: "Shell Profile Persistence",
            p:
            "~/.bashrc, ~/.bash_profile, /etc/profile.d/ waa meelo dheeraad ah oo commands lagu qari karo si ay u fuliyaan mar kasta oo shell la furo. Forensic review-gu waa in uu daboolo files-kan oo dhan."
          },
          {
            h: "Kernel Module Persistence (Rootkits)",
            p:
            "Loadable Kernel Modules (LKM) waxaa loo isticmaali karaa in la sameeyo rootkit heer kernel ah — kuwaan waa kuwa ugu adag in la ogaado, sababtoo ah waxay isku qariyaan heer aad u sarreeya. lsmod command-ku wuxuu liis gareeyaa modules-ka la load gareeyay."
          }
        ],

        terms: [
          { term: "Systemd Service Persistence", def: "Persistence iyada oo la adeegsanayo systemd unit files cusub." },
          { term: "LKM", def: "Loadable Kernel Module — laga yaabo in loo isticmaalo rootkits." }
        ],

        quiz: [
          {
            q: "Systemd service cusub oo dhawaan la abuuray wuxuu tilmaamayaa?",
            options: [
              "Persistence suurtagal ah — u baahan baaritaan",
              "Caadi ahaan",
              "Update software",
              "Backup process"
            ],
            answer: 0,
            explain: "Services cusub, gaar ahaan kuwo aan la aqoon, waa red flag."
          },
          {
            q: "LKM-yada waxaa loo isticmaali karaa?",
            options: [
              "Sameynta rootkits heer kernel ah",
              "Kaliya update kernel",
              "Kaliya loo isticmaalo drivers legit ah",
              "Ma jiro isticmaal khaldan"
            ],
            answer: 0,
            explain: "Kernel modules waxay leeyihiin awood sare, taasoo ka dhigaysa rootkit vector caan ah."
          },
          {
            q: "~/.bashrc oo la beddelay wuxuu u ogolaan karaa?",
            options: [
              "Amarro khaldan in ay fuliyaan mar kasta oo shell la furo",
              "Backup automation oo keliya",
              "Wax dhib ah ma jiraan",
              "Kaliya loo isticmaalo aesthetics"
            ],
            answer: 0,
            explain: "Shell profiles waa meel caan ah oo persistence lagu sameeyo."
          },
          {
            q: "lsmod command-ku wuxuu muujiyaa?",
            options: [
              "Kernel modules la load gareeyay",
              "Kaliya user accounts",
              "Kaliya network connections",
              "Kaliya files disk-ka"
            ],
            answer: 0,
            explain: "lsmod waa amar muhiim ah oo rootkit hunting ah."
          }
        ],

        exercise: {
          title: "Linux Persistence Hunt (Forensics-Level)",
          steps: [
            "Liis garee 5 persistence locations Linux ah.",
            "Sharax sida systemd services loo baaro (timestamps).",
            "Sharax habka LKM rootkits u shaqeeyaan.",
            "Naqshadee checklist buuxa oo Linux persistence forensics ah."
          ],
          deliverable: "Linux persistence forensics checklist."
        }
      },


      {
        slug: "macos-forensics-fundamentals",
        title: "Aasaaska macOS Forensics",
        english: "macOS Forensics Fundamentals",
        minutes: 15,

        summary:
          "Faham qeexitaanka macOS forensics iyo file system-ka APFS.",

        sections: [
          {
            h: "APFS (Apple File System)",
            p:
            "APFS waa file system-ka casriga ah ee macOS/iOS (bilaa 2017). Wuxuu taageeraa snapshots, encryption native ah, iyo space sharing volumes u dhexeeya. Wuxuu ka duwan yahay HFS+ (file system-kii hore)."
          },
          {
            h: "macOS System Structure",
            p:
            "/Applications (installed apps), /Library (system-wide settings), /Users/[user]/Library (user-specific settings/data), /System (macOS core files). Library folders-ku waa meelaha ugu qiimaha badan forensics ahaan."
          },
          {
            h: "System Integrity Protection (SIP)",
            p:
            "SIP waa security feature macOS ah oo xaddida wax kasta oo beddela files system-ka muhiimka ah, xitaa root user. Forensic analyst-ku waa in uu ogaado SIP saameynta ay ku yeelan karto acquisition-ka."
          },
          {
            h: "macOS Unified Logging",
            p:
            "macOS wuxuu isticmaalaa Unified Logging System (bilaa El Capitan) — logs binary format ah oo bixiya faahfaahin badan oo system activity ah, la akhriyo iyada oo la isticmaalayo log command ama tools forensic ah."
          }
        ],

        terms: [
          { term: "APFS", def: "Apple File System — file system casriga ah ee macOS/iOS." },
          { term: "SIP", def: "System Integrity Protection — feature xaddida beddelka files muhiimka ah." }
        ],

        quiz: [
          {
            q: "APFS ka duwan tahay HFS+ sababtoo ah?",
            options: [
              "Wuxuu taageeraa snapshots iyo encryption native ah",
              "Waa mid ka duqoobay",
              "Ma taageero macOS casriga ah",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "APFS waa file system casri ah oo leh features badan."
          },
          {
            q: "SIP macnaheedu waa?",
            options: [
              "System Integrity Protection — xaddida beddelka files muhiimka ah",
              "Nooc encryption ah oo keliya",
              "Tool imaging ah",
              "Antivirus macOS"
            ],
            answer: 0,
            explain: "SIP wuxuu ilaaliyaa system files xitaa root user."
          },
          {
            q: "/Users/[user]/Library waxay kaydiyaan?",
            options: [
              "Settings/data user-specific ah",
              "Kaliya applications",
              "Kaliya backup",
              "Kaliya kernel files"
            ],
            answer: 0,
            explain: "Library folders-ku waa meelaha ugu qiimaha badan forensics ahaan."
          },
          {
            q: "macOS Unified Logging System-ku wuxuu bixiyaa?",
            options: [
              "Faahfaahin badan oo system activity ah, binary format",
              "Kaliya user passwords",
              "Kaliya network traffic",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Unified logging-ku wuxuu ka mid yahay artifacts qiimaha badan macOS forensics ah."
          }
        ],

        exercise: {
          title: "macOS Forensics Fundamentals Review",
          steps: [
            "Sharax sida APFS uga duwan tahay HFS+.",
            "Liis garee 4 directories macOS ah oo forensic value leh.",
            "Sharax saameynta SIP ee acquisition-ka.",
            "Sharax habka Unified Logging System loo isticmaalo."
          ],
          deliverable: "macOS forensics fundamentals notes."
        }
      },


      {
        slug: "macos-artifacts-spotlight-timemachine",
        title: "macOS Artifacts: Spotlight & Time Machine",
        english: "macOS Artifacts: Spotlight and Time Machine",
        minutes: 11,

        summary:
          "Faham sida Spotlight index-ku iyo Time Machine backups-ku u bixiyaan evidence qiimo leh.",

        sections: [
          {
            h: "Spotlight Index",
            p:
            "Spotlight waa search engine macOS ah oo index gareeya files/metadata si search-ku u noqdo mid degdeg ah. Index-kani (.spotlight-V100) wuxuu weli kaydin karaa macluumaad ku saabsan files la tirtiray — artifact qiimo leh."
          },
          {
            h: "Spotlight Metadata & mdls Command",
            p:
            "mdls command-ku wuxuu muujiyaa metadata faahfaahsan file kasta oo Spotlight index gareeyay — waxaa ka mid ah kMDItemLastUsedDate (goorma file-ka ugu dambeyay la isticmaalay), muhiim marka la baarayo user activity."
          },
          {
            h: "Time Machine Backups",
            p:
            "Time Machine waa backup system macOS ah oo si joogto ah u kaydiya snapshots waqti kala duwan. Waxaa laga heli karaa forensic evidence xitaa haddii files hore la tirtiray system-ka hadda ka jira, laakiin ay weli ku jiraan backup snapshots hore."
          },
          {
            h: "Recovering Deleted Data via Time Machine",
            p:
            "Marka file la tirtiro macOS-ka hadda ka jira, Time Machine backups hore laga yaabo inay weli ka jiraan file-kaas. Forensic analyst-ku wuxuu baaraa snapshots kala duwan si loo helo versions hore ee files-ka."
          }
        ],

        terms: [
          { term: "Spotlight", def: "Search engine macOS ah oo index gareeya files/metadata." },
          { term: "Time Machine", def: "Backup system macOS ah oo snapshots waqti kala duwan kaydiya." }
        ],

        quiz: [
          {
            q: "Spotlight index-ku wuxuu weli kaydin karaa macluumaad?",
            options: [
              "Files la tirtiray — artifact qiimo leh",
              "Kaliya files hadda jira",
              "Kaliya passwords",
              "Kaliya network connections"
            ],
            answer: 0,
            explain: "Spotlight metadata badanaa way ka harsan tahay xitaa file-ka la tirtiro kadib."
          },
          {
            q: "mdls command-ku wuxuu muujiyaa?",
            options: [
              "Metadata faahfaahsan file kasta oo Spotlight index gareeyay",
              "Network connections",
              "Passwords",
              "Backup status oo keliya"
            ],
            answer: 0,
            explain: "mdls wuxuu bixiyaa faahfaahin qiimo leh forensics ahaan."
          },
          {
            q: "Time Machine backups waxay caawiyaan?",
            options: [
              "Soo celinta files la tirtiray marka snapshot hore la haysto",
              "Kaliya encryption",
              "Kaliya network security",
              "Ma jiro faa'iido forensic ah"
            ],
            answer: 0,
            explain: "Snapshots hore waxay bixiyaan version files-ka ka hor la tirtiro."
          },
          {
            q: "kMDItemLastUsedDate wuxuu muujiyaa?",
            options: [
              "Goorma file-ka ugu dambeyay la isticmaalay",
              "Goorma file-ka la abuuray oo keliya",
              "Owner-ka file-ka",
              "Size-ka file-ka"
            ],
            answer: 0,
            explain: "Tani waa metadata attribute qiimo leh oo user activity ah."
          }
        ],

        exercise: {
          title: "macOS Artifacts Investigation Practice",
          steps: [
            "Sharax sida Spotlight index loo isticmaali lahaa investigation.",
            "Sharax command mdls faa'iidadiisa.",
            "Sharax sida Time Machine loo isticmaali lahaa data recovery.",
            "Naqshadee scenario ah oo user tirtiray file xasaasi ah, sharax sida loo soo celin lahaa."
          ],
          deliverable: "macOS artifacts investigation notes."
        }
      },


      {
        slug: "cross-platform-forensics-challenges",
        title: "Cross-Platform Forensics Challenges",
        english: "Cross-Platform Forensics Challenges",
        minutes: 14,

        summary:
          "Faham caqabadaha ka imaan kara investigations-ka daboola OS kala duwan.",

        sections: [
          {
            h: "Multi-OS Environments",
            p:
            "Shirkadaha casriga ah waxay isticmaalaan Windows, macOS iyo Linux isku mar (BYOD, developer machines, servers). Investigation-yada badanaa waxay u baahan yihiin analyst inuu yaqaan dhammaan saddexda platform."
          },
          {
            h: "Timestamp Standardization",
            p:
            "OS kastaa wuxuu leeyahay habka uu u kaydiyo timestamps (Windows FILETIME, Unix epoch, iwm). Marka la dhisayo timeline isku dara devices kala duwan, waa waajib in la beddelo dhammaan hal format (UTC) si loo iska ilaaliyo khaladaad."
          },
          {
            h: "Tool Compatibility",
            p:
            "Ma dhammaan forensic tools ayaa taageera dhammaan filesystems/OS. The Sleuth Kit iyo Autopsy waxay taageeraan multiple filesystems, laakiin qaar kale (Windows-specific parsers) kuma shaqeeyaan Linux/macOS artifacts."
          },
          {
            h: "Cloud & Hybrid Environments",
            p:
            "Marka lagu daro devices jireed, xogta waxaa laga yaabaa inay ku jirto cloud services (Google Workspace, Microsoft 365, iCloud) — investigation buuxa waxay u baahan tahay in la daboolo labadaba device-level iyo cloud-level evidence."
          }
        ],

        terms: [
          { term: "Timestamp Standardization", def: "Beddelidda dhammaan timestamps hal format (UTC) si loo iska ilaaliyo khaladaad." },
          { term: "Hybrid Environment", def: "Isku darka device jireed iyo cloud services." }
        ],

        quiz: [
          {
            q: "Sababta timestamp standardization muhiim u tahay waa?",
            options: [
              "Devices kala duwan waxay isticmaalaan formats kala duwan, isku dar UTC ayaa ka hortagta khaladaad",
              "Ma jiro sabab",
              "Timestamps-ku waligood isku mid yihiin",
              "Kaliya loo baahan yahay Windows"
            ],
            answer: 0,
            explain: "Cross-platform timelines-ku waxay u baahan yihiin standardization si loo iska ilaaliyo qaladaad."
          },
          {
            q: "The Sleuth Kit iyo Autopsy waxay taageeraan?",
            options: [
              "Multiple filesystems (NTFS, EXT, APFS)",
              "Kaliya NTFS",
              "Kaliya EXT",
              "Kaliya cloud storage"
            ],
            answer: 0,
            explain: "Tools cross-platform ah waxay muhiim u yihiin investigations-ka multi-OS ah."
          },
          {
            q: "Hybrid environment investigation-ku waa in uu daboolaa?",
            options: [
              "Device-level iyo cloud-level evidence",
              "Kaliya device-level",
              "Kaliya cloud-level",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Xogta casriga ah waxay ku jiraan meelo badan oo kala duwan."
          }
        ],

        exercise: {
          title: "Cross-Platform Investigation Planning",
          steps: [
            "Xulo scenario ah oo Windows, macOS iyo cloud devices leh.",
            "Naqshadee approach-ka timestamp standardization.",
            "Liis garee tools-ka taageera platform kasta.",
            "Sharax sida cloud evidence loogu darsan lahaa investigation-ka."
          ],
          deliverable: "Cross-platform investigation plan."
        }
      },


      {
        slug: "linux-macos-capstone",
        title: "Linux & macOS — Full Capstone",
        english: "Linux and macOS Forensics Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee full cross-platform investigation.",

        sections: [
          {
            h: "Scenario",
            p:
            "Shirkad tusaale ah ayaa hesha alert ah oo la xiriira developer server Linux ah iyo laptop macOS ah oo isku mar loo isticmaalay data exfiltration."
          },
          {
            h: "Linux Server Investigation",
            p:
            "Naqshadee approach-ka logs (journald), persistence hunt (systemd, cron), iyo bash history."
          },
          {
            h: "macOS Laptop Investigation",
            p:
            "Naqshadee approach-ka Spotlight metadata, Time Machine snapshots, iyo Unified Logging."
          },
          {
            h: "Cross-Platform Correlation",
            p:
            "Isku dar timeline-ka labada system, isticmaal timestamp standardization (UTC) si loo dhiso muuqaal buuxa."
          }
        ],

        terms: [
          { term: "Cross-Platform Investigation", def: "Baaritaan isugu jira devices OS kala duwan leh." }
        ],

        quiz: [
          {
            q: "Linux server investigation-ka, artifact-yada ugu qiimaha badan waa?",
            options: [
              "journald logs, systemd/cron persistence, bash_history",
              "Kaliya Spotlight",
              "Kaliya Time Machine",
              "Ma jiro artifact gaar ah"
            ],
            answer: 0,
            explain: "Kuwaan waa artifacts-ka forensics-ka Linux ugu muhiimsan."
          },
          {
            q: "macOS laptop investigation-ka waxaa ka mid ah?",
            options: [
              "Spotlight metadata, Time Machine, Unified Logging",
              "Kaliya bash_history",
              "Kaliya journald",
              "Ma jiro artifact gaar ah"
            ],
            answer: 0,
            explain: "Kuwaan waa artifacts macOS-specific ah."
          },
          {
            q: "Cross-platform correlation-ku wuxuu u baahan yahay?",
            options: [
              "Timestamp standardization (UTC)",
              "Kaliya hal timezone",
              "Ma loo baahna standardization",
              "Kaliya loo baahan yahay hal OS"
            ],
            answer: 0,
            explain: "Timestamp format kala duwan waxay keeni karaan khaladaad haddii aan la beddelin hal standard."
          }
        ],

        exercise: {
          title: "Full Cross-Platform Investigation",
          steps: [
            "Naqshadee Linux server investigation approach (logs, persistence).",
            "Naqshadee macOS laptop investigation approach (Spotlight, Time Machine).",
            "Isku dar timeline-ka labada system iyadoo lagu adeegsanayo UTC.",
            "Diyaari warbixin buuxda oo cross-platform findings leh (portfolio-ready)."
          ],
          deliverable: "Full cross-platform forensics investigation report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "df8",
    slug: "mobile-device-forensics",
    stage: "Sare",
    title: "Mobile Device Forensics",
    english: "Mobile Device Forensics",
    hours: 1,

    outcome:
      "Waxaad si adag u fahmi doontaa iOS/Android forensics fundamentals, mobile app data artifacts, acquisition methods, iyo caqabadaha sharciga ah.",

    topics: [
      "Mobile Forensics Fundamentals",
      "iOS Forensics Basics",
      "Android Forensics Basics",
      "Mobile App Data Artifacts",
      "Mobile Acquisition Methods",
      "Mobile Forensics Legal Challenges",
      "Mobile Forensics Capstone",
    ],

    lessonList: [

      {
        slug: "mobile-forensics-fundamentals",
        title: "Aasaaska Mobile Forensics",
        english: "Mobile Forensics Fundamentals",
        minutes: 12,

        summary:
          "Faham sababta mobile forensics ay tahay takhasus gooni ah, iyo caqabadaha unique ah.",

        sections: [
          {
            h: "Sababta Mobile Forensics Ay Takhasus Tahay",
            p:
            "Mobile devices waxay leeyihiin encryption default ah oo xoog leh, hardware proprietary ah, iyo cloud sync joogto ah — kuwaan waxay ka dhigaan mobile forensics mid ka duwan disk forensics caadiga ah, si gaar ah u baahan aqoon iyo tools."
          },
          {
            h: "Data Available on Mobile Devices",
            p:
            "Call logs, SMS/messages, contacts, GPS location history, photos/videos (leh metadata GPS), app data, iyo browsing history — mobile devices badanaa waxay bixiyaan xog shakhsi ah oo ka badan laptop caadi ah."
          },
          {
            h: "Encryption Challenges",
            p:
            "iOS iyo Android casriga ah waxay leeyihiin full-disk encryption oo default ah oo la xiriira PIN/password/biometric. Haddii aan la haysan credentials, forensic acquisition-ku waxay noqon kartaa mid aad u adag ama aan macquul ahayn."
          },
          {
            h: "Mobile Forensics Toolset Overview",
            p:
            "Cellebrite UFED iyo Magnet AXIOM waa tools commercial ah oo caan ah oo mobile forensics ah. Kuwaan waxay bixiyaan acquisition, parsing, iyo analysis capabilities aad u dhamaystiran, laakiin waa kuwo qaali ah."
          }
        ],

        terms: [
          { term: "Full-Disk Encryption (Mobile)", def: "Encryption default ah oo iOS/Android ku jira, xiran PIN/password." },
          { term: "Cellebrite UFED", def: "Tool commercial ah oo caan ah oo mobile forensics ah." }
        ],

        quiz: [
          {
            q: "Sababta mobile forensics uu takhasus u yahay waa?",
            options: [
              "Encryption default ah, hardware proprietary ah, cloud sync",
              "Waa mid ka fudud disk forensics",
              "Ma jiro caqabado gaar ah",
              "Mobile devices ma leh xog qiimo leh"
            ],
            answer: 0,
            explain: "Caqabadahan waxay u baahan yihiin aqoon iyo tools gaar ah."
          },
          {
            q: "Mobile devices waxay bixiyaan xog?",
            options: [
              "Call logs, GPS location, app data, photos leh metadata",
              "Kaliya email",
              "Kaliya passwords",
              "Ma jiro xog qiimo leh"
            ],
            answer: 0,
            explain: "Mobile devices badanaa waxay leeyihiin xog shakhsi ah oo faro badan."
          },
          {
            q: "Haddii aan la haysan credentials mobile device-ka, acquisition waxay noqon kartaa?",
            options: [
              "Mid aad u adag ama aan macquul ahayn",
              "Mid fudud marwalba",
              "Mid aan loo baahnayn",
              "Ma jiro saameyn"
            ],
            answer: 0,
            explain: "Encryption xoog leh wuxuu ka dhigaa access mid adag."
          },
          {
            q: "Cellebrite UFED waa?",
            options: [
              "Tool commercial ah oo mobile forensics ah",
              "Malware nooc ah",
              "Network scanner",
              "Password cracker"
            ],
            answer: 0,
            explain: "Waa mid ka mid ah tools-ka ugu caansan mobile forensics industry-ga."
          }
        ],

        exercise: {
          title: "Mobile Forensics Landscape Overview",
          steps: [
            "Liis garee 6 noocyada xogta mobile devices bixiyaan.",
            "Sharax sababta encryption uu u yahay caqabad weyn.",
            "Sharax farqiga mobile forensics iyo disk forensics caadiga ah.",
            "Liis garee 2 commercial tools oo mobile forensics ah."
          ],
          deliverable: "Mobile forensics landscape overview."
        }
      },


      {
        slug: "ios-forensics-basics",
        title: "iOS Forensics Basics",
        english: "iOS Forensics Basics",
        minutes: 10,

        summary:
          "Faham aasaaska iOS forensics — backup extraction, keychain, iyo artifacts muhiimka ah.",

        sections: [
          {
            h: "iTunes/Finder Backups",
            p:
            "iOS devices waxay abuuraan backups iyada oo la isticmaalayo iTunes (Windows) ama Finder (macOS casriga ah). Backups-kani, haddii aan encrypted lahayn, waxay u ogolaadaan analyst inuu helo qayb badan oo xogta device-ka ah iyada oo aan device-ka la taaban."
          },
          {
            h: "iOS Keychain",
            p:
            "Keychain wuxuu kaydiyaa passwords, tokens, iyo certificates encrypted ahaan. Marka la falanqeynayo unencrypted backup, keychain waxaa la falanqeyn karaa si loo helo credentials qiimo leh (app passwords, WiFi passwords)."
          },
          {
            h: "iOS File System Structure",
            p:
            "iOS wuxuu isticmaalaa APFS. Files-ka muhiimka ah waxaa ka mid ah: SMS database (sms.db), Photos database, Safari history, iyo Health app data — dhammaantood SQLite databases ah oo la falanqeyn karo."
          },
          {
            h: "iOS Security Features Impact",
            p:
            "Secure Enclave (hardware-based key storage) iyo Data Protection classes waxay xaddidaan sida xogta loo heli karo, xitaa jailbroken devices. Waa muhiim in la fahmo saameynta features-kan investigation-ka."
          }
        ],

        terms: [
          { term: "iOS Keychain", def: "Kaydinta encrypted ee passwords/tokens iOS ah." },
          { term: "Secure Enclave", def: "Hardware-based key storage iOS ah oo xaddida access-ka." }
        ],

        quiz: [
          {
            q: "iTunes/Finder backups haddii aan encrypted lahayn waxay u ogolaadaan?",
            options: [
              "Analyst inuu helo qayb badan xogta iyada oo aan device-ka la taaban",
              "Wax kasta oo iOS device-ka gudaha ku jira",
              "Ma jiro faa'iido",
              "Kaliya photos"
            ],
            answer: 0,
            explain: "Unencrypted backups waa source qiimo leh oo forensic evidence ah."
          },
          {
            q: "iOS Keychain wuxuu kaydiyaa?",
            options: [
              "Passwords, tokens, certificates encrypted ahaan",
              "Kaliya photos",
              "Kaliya SMS messages",
              "Kaliya call logs"
            ],
            answer: 0,
            explain: "Keychain waa xarunta credentials ee iOS."
          },
          {
            q: "sms.db waa?",
            options: [
              "SQLite database SMS messages kaydiya",
              "Malware file",
              "Network configuration",
              "Backup encryption key"
            ],
            answer: 0,
            explain: "iOS wuxuu isticmaalaa SQLite databases xog badan."
          },
          {
            q: "Secure Enclave wuxuu xaddidaa?",
            options: [
              "Sida xogta loo heli karo, xitaa jailbroken devices",
              "Speed-ka device-ka",
              "Battery life",
              "Ma jiro saameyn forensic ah"
            ],
            answer: 0,
            explain: "Secure Enclave waa layer security ah oo hardware-based ah."
          }
        ],

        exercise: {
          title: "iOS Forensics Artifact Review",
          steps: [
            "Sharax faa'iidada iTunes/Finder backups investigation ahaan.",
            "Liis garee 3 xog qiimo leh oo Keychain ka heli karo.",
            "Liis garee 4 SQLite databases muhiim ah iOS gudaheeda.",
            "Sharax saameynta Secure Enclave ee acquisition-ka."
          ],
          deliverable: "iOS forensics artifact reference sheet."
        }
      },


      {
        slug: "android-forensics-basics",
        title: "Android Forensics Basics",
        english: "Android Forensics Basics",
        minutes: 13,

        summary:
          "Faham aasaaska Android forensics — ADB, app data, iyo artifacts muhiimka ah.",

        sections: [
          {
            h: "Android Debug Bridge (ADB)",
            p:
            "ADB waa command-line tool loo isticmaalo in la la xiriiro Android devices developer/debugging ahaan. Marka USB debugging la shido oo authorized, ADB waxaa loo isticmaali karaa in la sameeyo logical extraction xog ah."
          },
          {
            h: "Android File System Structure",
            p:
            "Android wuxuu isticmaalaa EXT4 (badanaa). /data/data/[package_name]/ wuxuu kaydiyaa app data (SQLite databases, shared preferences, files) app kasta oo la rakibay."
          },
          {
            h: "Android App Data Locations",
            p:
            "SharedPreferences (settings app-specific ah, XML format), SQLite databases (messages, contacts, cache), iyo internal/external storage (photos, downloads) — dhammaantood waa artifacts qiimo leh app-specific ah."
          },
          {
            h: "Android Security Considerations",
            p:
            "Android encryption iyo Google Play Protect waxay xaddidaan access-ka, sida iOS. Root access (haddii la helo authorized) wuxuu u ogolaadaa access buuxa filesystem-ka, laakiin wuxuu beddeli karaa xogta haddii aan si taxadar leh loo maareynin."
          }
        ],

        terms: [
          { term: "ADB", def: "Android Debug Bridge — tool command-line ah oo devices la xiriira." },
          { term: "SharedPreferences", def: "Settings app-specific ah oo XML format ah Android gudaheeda." }
        ],

        quiz: [
          {
            q: "ADB waxaa loo isticmaalaa?",
            options: [
              "La xiriirka Android devices developer/debugging ahaan",
              "Encrypt gareynta disk-ka",
              "Sameynta backup iOS",
              "Password cracking"
            ],
            answer: 0,
            explain: "ADB waa tool developer ah oo forensics-ku sidoo kale isticmaalo."
          },
          {
            q: "/data/data/[package_name]/ wuxuu kaydiyaa?",
            options: [
              "App data (databases, shared preferences, files)",
              "Kaliya system files",
              "Kaliya photos",
              "Kaliya call logs"
            ],
            answer: 0,
            explain: "App kasta wuxuu leeyahay directory u gaar ah oo xogtiisa ah."
          },
          {
            q: "SharedPreferences waa?",
            options: [
              "Settings app-specific ah, XML format",
              "Malware nooc ah",
              "Network configuration",
              "Backup file"
            ],
            answer: 0,
            explain: "SharedPreferences waa habka apps-ku u kaydiyaan settings fudud."
          },
          {
            q: "Root access authorized ahaan wuxuu u ogolaadaa?",
            options: [
              "Access buuxa filesystem-ka, laakiin khatar u leh integrity haddii aan taxadar la yeelan",
              "Wax kasta oo aan khatar lahayn",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo gaming"
            ],
            answer: 0,
            explain: "Root access-ku wuxuu bixiyaa awood, laakiin waxaa la taxaddaraa evidence integrity."
          }
        ],

        exercise: {
          title: "Android Forensics Artifact Review",
          steps: [
            "Sharax sida ADB loo isticmaali lahaa logical extraction.",
            "Sharax structure-ka /data/data/[package_name]/.",
            "Liis garee 3 app data locations Android ah.",
            "Sharax caqabadaha root access uu keeni karo evidence integrity ahaan."
          ],
          deliverable: "Android forensics artifact reference sheet."
        }
      },


      {
        slug: "mobile-app-data-artifacts",
        title: "Mobile App Data Artifacts",
        english: "Mobile App Data Artifacts",
        minutes: 10,

        summary:
          "Faham sida apps caanka ah (messaging, social media) u kaydiyaan xogtooda, iyo sida loo falanqeeyo.",

        sections: [
          {
            h: "Messaging App Artifacts",
            p:
            "WhatsApp, Signal, iyo Telegram waxay kaydiyaan messages SQLite databases ah — qaarkood encrypted (WhatsApp encrypted backups), qaarkood aan encrypted ahayn. Media files (photos/videos la dirsaday) waxay ku kaydsan yihiin folders gaar ah."
          },
          {
            h: "Social Media App Artifacts",
            p:
            "Instagram, Facebook, iyo TikTok waxay kaydiyaan cache data, cookies session ah, iyo mararka qaarkood draft posts ama messages aan la dirin. Kuwaan waxay bixiyaan evidence xitaa haddii user-ku uu tirtiray post-ka rasmiga ah."
          },
          {
            h: "GPS & Location Data in Apps",
            p:
            "Apps badan (maps, social media, camera) waxay kaydiyaan location history metadata gudaheeda — photos-ka EXIF data-diisu wuxuu bixin karaa GPS coordinates exact ah halka sawirka la qaaday."
          },
          {
            h: "App-Specific Analysis Challenges",
            p:
            "Apps-ka messaging ee encryption end-to-end leh (Signal) waxay ka dhigaan message content-ka aan la heli karin iyada oo aan device-ka la haysan (marka aan server-side access la haysan). Waxaa la falanqayn karaa kaliya metadata (who, when — ma aha what)."
          }
        ],

        terms: [
          { term: "End-to-End Encryption", def: "Encryption keliya sender/receiver la fahmi karo, ma aha server." },
          { term: "EXIF Data", def: "Metadata sawirku ku qarsoon yahay, oo ay ku jiraan GPS coordinates." }
        ],

        quiz: [
          {
            q: "End-to-end encryption apps (Signal) waxay ka dhigaan?",
            options: [
              "Message content-ka aan la heli karin iyada oo aan device la haysan",
              "Messages-ka in la aqbali karin",
              "Ma jiro saameyn",
              "Messages-ku waligood way sugan yihiin plain text"
            ],
            answer: 0,
            explain: "Encryption-ku wuxuu xaddidaa access-ka content-ka."
          },
          {
            q: "EXIF data sawirka wuxuu bixin karaa?",
            options: [
              "GPS coordinates exact ah halka sawirka la qaaday",
              "Password-ka user-ka",
              "Network settings",
              "Ma jiro macluumaad"
            ],
            answer: 0,
            explain: "EXIF metadata waa qayb qiimo leh oo mobile forensics ah."
          },
          {
            q: "Social media apps waxay bixin karaan evidence xitaa haddii?",
            options: [
              "Post-ka la tirtiray rasmiga ah, laakiin cache-ku weli jiraa",
              "Wax kasta la tirtiray, evidence-ku sidoo kale wuu tirmayaa",
              "Ma jiro macluumaad kaydsan",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Cache/draft data waxay hari karaan xitaa kadib deletion rasmiga ah."
          },
          {
            q: "Messaging apps encryption ahaan waxaa laga heli karaa metadata ah?",
            options: [
              "Who, when — ma aha what (content)",
              "Content-ka buuxa",
              "Ma jiro macluumaad la heli karo",
              "Kaliya passwords"
            ],
            answer: 0,
            explain: "Metadata-ku wuxuu ka jiraa xitaa haddii content-ku encrypted yahay."
          }
        ],

        exercise: {
          title: "Mobile App Artifact Analysis",
          steps: [
            "Xulo 3 apps caanka ah (messaging, social media).",
            "App kasta u qor artifacts laga yaabo in la helo.",
            "Sharax faa'iidada EXIF data investigation ahaan.",
            "Sharax caqabadaha end-to-end encryption apps ee investigation-ka."
          ],
          deliverable: "Mobile app data artifacts reference sheet."
        }
      },


      {
        slug: "mobile-acquisition-methods",
        title: "Mobile Acquisition Methods",
        english: "Mobile Acquisition Methods",
        minutes: 12,

        summary:
          "Faham noocyada acquisition-ka mobile devices — logical, physical, iyo file system.",

        sections: [
          {
            h: "Logical Acquisition",
            p:
            "Logical acquisition wuxuu soo saaraa xog iyada oo la isticmaalayo APIs standard-ka ah (contacts, messages, call logs) — mid ka fudud oo aan u baahnayn root/jailbreak, laakiin aan lahayn deleted data ama app-specific databases."
          },
          {
            h: "Physical Acquisition",
            p:
            "Physical acquisition wuxuu soo saaraa bit-by-bit copy dhammaan storage-ka — daboolaya unallocated space (deleted data suurtagal ah). Wuxuu badanaa u baahan yahay root/jailbreak, wuxuuna adag yahay devices casriga ah oo encrypted ah."
          },
          {
            h: "File System Acquisition",
            p:
            "File system acquisition waa mid u dhexeeya labada kale — wuxuu soo saaraa file system-ka oo dhan (dhammaan files iyo directories) iyada oo aan daboolin unallocated space. Waa mid caan ah devices casriga ah oo encrypted ah."
          },
          {
            h: "Choosing the Right Acquisition Method",
            p:
            "Doorashada waxay ku xiran tahay: nooca device-ka, OS version-ka, access-ka (locked/unlocked), iyo waxa loo baahan yahay (deleted data ma loo baahan yahay?). Physical acquisition-ku wuxuu bixiyaa faahfaahin ugu badan laakiin waa mid ugu adag in la fuliyo."
          }
        ],

        terms: [
          { term: "Logical Acquisition", def: "Soo saarista xog APIs standard ah, mid fudud laakiin xaddidan." },
          { term: "Physical Acquisition", def: "Bit-by-bit copy dhammaan storage, daboolaya unallocated space." },
          { term: "File System Acquisition", def: "Soo saarista file system-ka oo dhan, aan daboolin unallocated space." }
        ],

        quiz: [
          {
            q: "Logical acquisition-ku ma bixiyo?",
            options: [
              "Deleted data ama app-specific databases",
              "Contacts",
              "Call logs",
              "Messages standard-ka ah"
            ],
            answer: 0,
            explain: "Logical acquisition-ku wuxuu isticmaalaa APIs standard ah, xaddidan."
          },
          {
            q: "Physical acquisition-ku wuxuu daboolaa?",
            options: [
              "Unallocated space (deleted data suurtagal ah)",
              "Kaliya files hadda jira",
              "Kaliya contacts",
              "Kaliya cloud data"
            ],
            answer: 0,
            explain: "Physical waa nooca ugu faahfaahsan, laakiin ugu adag in la fuliyo."
          },
          {
            q: "File system acquisition waa mid u dhexeeya sababtoo ah?",
            options: [
              "Wuxuu soo saaraa files/directories oo dhan, aan daboolin unallocated",
              "Isku mid physical acquisition",
              "Isku mid logical acquisition",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Waa balance u dhexeeya faahfaahinta iyo fudaydka."
          },
          {
            q: "Doorashada acquisition method-ka waxay ku xiran tahay?",
            options: [
              "Device type, OS version, access, iyo needs-ka investigation-ka",
              "Kaliya rabitaanka analyst-ka",
              "Kaliya budget-ka",
              "Ma jiro factors"
            ],
            answer: 0,
            explain: "Factors badan ayaa go'aamiya habka ugu habboon."
          }
        ],

        exercise: {
          title: "Acquisition Method Selection",
          steps: [
            "Sharax saddexda nooc ee mobile acquisition.",
            "Xulo 3 scenarios kala duwan, mid kasta u dooro method ugu habboon.",
            "Sharax sababaha doorashada kasta.",
            "Sharax caqabadaha physical acquisition devices casriga ah."
          ],
          deliverable: "Mobile acquisition method selection guide."
        }
      },


      {
        slug: "mobile-forensics-legal-challenges",
        title: "Mobile Forensics Legal Challenges",
        english: "Mobile Forensics Legal Challenges",
        minutes: 13,

        summary:
          "Faham caqabadaha sharciga ah ee mobile forensics — privacy, compelled unlocking, iyo BYOD.",

        sections: [
          {
            h: "Compelled Unlocking Debates",
            p:
            "Xeerarka kala duwan waxay leeyihiin qaabab kala duwan oo ku saabsan haddii law enforcement uu ku qasbi karo qof inuu furo device-kiisa (fingerprint vs password waxay leeyihiin xeerar kala duwan meelo badan)."
          },
          {
            h: "BYOD (Bring Your Own Device) Challenges",
            p:
            "Marka investigation-ku daboolo shaqaale isticmaala telefoonkiisa gaarka ah shaqada (BYOD), xadka u dhexeeya xogta personal iyo corporate wuxuu keenaa caqabado sharci ah oo la xiriira privacy."
          },
          {
            h: "Cross-Border Mobile Data",
            p:
            "Cloud backups (iCloud, Google) waxay badanaa kaydsan yihiin servers dal kale ku yaal — access-ku waxaa loo baahan yahay legal process (MLAT — Mutual Legal Assistance Treaty) haddii xogtu ku jirto jurisdiction kale."
          },
          {
            h: "Employer-Owned vs Personal Devices",
            p:
            "Corporate-owned devices (leh policy cad) waxay leeyihiin xeerar privacy ka duwan personal devices — waa muhiim in la fahmo ownership-ka iyo policy-ga ka hor la baaro device kasta."
          }
        ],

        terms: [
          { term: "BYOD", def: "Bring Your Own Device — shaqaale isticmaala telefoon shakhsi ah shaqada." },
          { term: "MLAT", def: "Mutual Legal Assistance Treaty — habka la helo xog dal kale ku taal." }
        ],

        quiz: [
          {
            q: "Compelled unlocking wuxuu ku xiran yahay?",
            options: [
              "Xeerarka jurisdiction-ka iyo nooca unlocking (fingerprint vs password)",
              "Ma jiro xeerar",
              "Waligeed waa legal",
              "Waligeed waa illegal"
            ],
            answer: 0,
            explain: "Xeerarku waxay kala duwan yihiin meel kasta iyo nooca method-ka."
          },
          {
            q: "BYOD wuxuu keenaa caqabado?",
            options: [
              "Xadka u dhexeeya xogta personal iyo corporate",
              "Ma jiro caqabado",
              "Kaliya technical caqabado",
              "Kaliya cost caqabado"
            ],
            answer: 0,
            explain: "Privacy-ga shakhsiga ah waa in la ixtiraamo xitaa investigation gudaheeda."
          },
          {
            q: "MLAT waxaa loo isticmaalaa?",
            options: [
              "Helitaanka xog dal kale ku taal si legal ah",
              "Encrypt gareynta xogta",
              "Backup xogta",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "Cross-border investigations waxay u baahan yihiin proses legal ah."
          },
          {
            q: "Corporate-owned devices waxay leeyihiin?",
            options: [
              "Xeerar privacy ka duwan personal devices",
              "Isku xeerar personal devices",
              "Ma jiro xeerar gaar ah",
              "Kaliya xeerar IT department"
            ],
            answer: 0,
            explain: "Ownership-ka waa factor muhiim ah oo legal framework-ka ku saabsan."
          }
        ],

        exercise: {
          title: "Mobile Legal Challenges Review",
          steps: [
            "Sharax caqabadaha compelled unlocking.",
            "Sharax sida BYOD u adkeeyo investigations.",
            "Sharax marka MLAT loo baahan yahay.",
            "Sharax farqiga corporate-owned iyo personal devices legal ahaan."
          ],
          deliverable: "Mobile forensics legal challenges notes."
        }
      },


      {
        slug: "mobile-forensics-capstone",
        title: "Mobile Forensics — Full Capstone",
        english: "Mobile Forensics Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee full mobile investigation oo insider threat ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Shaqaale la shakiyay data theft ayaa haystay telefoon corporate-owned ah (Android). Waxaad haysataa authorization aad ku samayso forensic investigation."
          },
          {
            h: "Legal & Authorization Check",
            p:
            "Xaqiiji ownership-ka (corporate-owned) iyo authorization-ka BYOD policy la xiriira."
          },
          {
            h: "Acquisition Method Selection",
            p:
            "Go'aami method-ka acquisition-ka ugu habboon (logical/physical/file system) iyadoo lagu saleynayo access-ka la haysto."
          },
          {
            h: "Artifact Analysis",
            p:
            "Naqshadee approach-ka falanqaynta app data, messages, iyo location history si loo helo evidence data theft ah."
          }
        ],

        terms: [
          { term: "Full Mobile Investigation", def: "Baaritaan isugu jira legal check, acquisition, iyo artifact analysis." }
        ],

        quiz: [
          {
            q: "Ka hor acquisition-ka, tallaabada koowaad waa?",
            options: [
              "Xaqiijinta ownership-ka iyo authorization",
              "Isla markiiba physical acquisition",
              "Warbixinta",
              "Tirtirida device-ka"
            ],
            answer: 0,
            explain: "Legal check-ku waa waajib ka hor wax kasta oo kale."
          },
          {
            q: "Corporate-owned device sababtoo ah acquisition-ku ka fudud yahay BYOD?",
            options: [
              "Privacy concerns-ku waa ka yar yihiin, policy-gu cad yahay",
              "Ma jiro farqi",
              "Corporate devices waligood ma encrypted",
              "BYOD waligood ma khuseeyo forensics"
            ],
            answer: 0,
            explain: "Ownership-ka cad-cad wuxuu fududeeyaa xaqiijinta authorization."
          },
          {
            q: "Warbixinta ugu dambaysa waa in ay ku jirto?",
            options: [
              "Acquisition method, artifacts la helay, go'aan data theft ah",
              "Kaliya magaca shaqaalaha",
              "Kaliya lambarka telefoonka",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Findings dhamaystiran waa muhiim si loo taageero go'aan iyo tallaabooyin xiga."
          }
        ],

        exercise: {
          title: "Full Mobile Forensics Investigation",
          steps: [
            "Xaqiiji ownership iyo authorization scenario-ga.",
            "Go'aami acquisition method-ka ugu habboon, sharax sababta.",
            "Naqshadee artifact analysis plan (messages, app data, location).",
            "Diyaari warbixin buuxda oo findings iyo recommendations leh (portfolio-ready)."
          ],
          deliverable: "Full mobile forensics investigation report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "df9",
    slug: "malware-analysis-anti-forensics",
    stage: "Sare",
    title: "Malware Analysis & Anti-Forensics",
    english: "Malware Analysis & Anti-Forensics",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa malware analysis forensics-specific, anti-forensics techniques, timestomping, steganography, iyo encrypted containers.",

    topics: [
      "Malware Analysis for Forensics",
      "Anti-Forensics Techniques",
      "Timestomping Detection",
      "Steganography & Hidden Data",
      "Encrypted Container Forensics",
      "Rootkit Detection Forensics",
      "Anti-Forensics Capstone",
    ],

    lessonList: [

      {
        slug: "malware-analysis-for-forensics",
        title: "Malware Analysis for Forensics",
        english: "Malware Analysis for Forensics",
        minutes: 15,

        summary:
          "Faham sida malware analysis loo isticmaalo forensics context gudaheeda, ka duwan pure malware research.",

        sections: [
          {
            h: "Forensics-Focused Malware Analysis",
            p:
            "Halka malware researchers-ku diiradda saarayaan sida malware-ku u shaqeeyo guud ahaan, forensic analyst-ku wuxuu diiradda saaraa: goorma malware-kan la fuliyay system-kan, sidee, iyo maxaa uu sameeyay (impact-ka gaarka ah)."
          },
          {
            h: "Static vs Dynamic Analysis in Forensic Context",
            p:
            "Static analysis (strings, hash lookup, PE header analysis) waa mid degdeg ah oo ammaan ah. Dynamic analysis (sandbox execution) wuxuu bixiyaa faahfaahin dheeraad ah, laakiin waa in la sameeyo environment go'doonsan si loo iska ilaaliyo re-infection."
          },
          {
            h: "Correlating Malware with System Artifacts",
            p:
            "Marka malware la aqoonsado, waa in la isku daro Prefetch (goorma la fuliyay), Registry (persistence), Event Logs (process creation), iyo Network logs (C2 communication) si loo dhiso full timeline-ka impact-ka."
          },
          {
            h: "Malware Attribution in Forensic Reports",
            p:
            "Forensic reports-ku badanaa ma sameeyaan attribution xoog ah (kee ayaa geli lahaa) — waxay diiradda saaraan facts (malware family, behavior, impact) halkii ay sheegi lahaayeen attacker specific ah oo aan la caddeyn karin."
          }
        ],

        terms: [
          { term: "Forensics-Focused Analysis", def: "Malware analysis diiradda saarta impact iyo timeline, ma aha kaliya behavior guud." }
        ],

        quiz: [
          {
            q: "Forensic analyst-ku wuxuu diiradda saaraa?",
            options: [
              "Goorma malware la fuliyay, sidee, iyo impact-ka gaarka ah",
              "Kaliya sida malware-ku guud ahaan u shaqeeyo",
              "Kaliya code-ka source-ka ah",
              "Ma jiro diiradda gaar ah"
            ],
            answer: 0,
            explain: "Forensics-ku wuxuu isku xiraa malware-ka dhacdada gaarka ah."
          },
          {
            q: "Sababta dynamic analysis loo sameeyo environment go'doonsan waa?",
            options: [
              "Si loo iska ilaaliyo re-infection ama faafitaan dheeraad ah",
              "Si loo kordhiyo speed",
              "Ma jiro sabab",
              "Waa waajib legal ah oo keliya"
            ],
            answer: 0,
            explain: "Sandbox go'doonsan wuxuu ilaaliyaa environment-ka production-ka ah."
          },
          {
            q: "Correlating malware iyo system artifacts waxay ka caawiyaan?",
            options: [
              "Dhisidda full timeline-ka impact-ka",
              "Kordhinta storage",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo antivirus"
            ],
            answer: 0,
            explain: "Isku darka artifacts-ku wuxuu bixiyaa muuqaal buuxa."
          },
          {
            q: "Forensic reports-ku badanaa maxay ka fogaadaan?",
            options: [
              "Attribution xoog ah oo aan la caddeyn karin",
              "Facts la caddeyn karo",
              "Timeline",
              "Impact assessment"
            ],
            answer: 0,
            explain: "Reports-ku waxay diiradda saaraan waxa la caddeyn karo."
          }
        ],

        exercise: {
          title: "Forensic Malware Analysis Approach",
          steps: [
            "Sharax farqiga forensics-focused analysis iyo malware research guud.",
            "Sharax sababta static analysis loo bilaabo marka hore.",
            "Naqshadee correlation plan (Prefetch + Registry + Event Logs + Network).",
            "Sharax sababta attribution xoog ah aan loo dalbanayn reports."
          ],
          deliverable: "Forensic malware analysis approach guide."
        }
      },


      {
        slug: "anti-forensics-techniques",
        title: "Anti-Forensics Techniques",
        english: "Anti-Forensics Techniques",
        minutes: 11,

        summary:
          "Faham habab caan ah oo attackers isticmaalaan si ay uga fogaadaan ama u qariyaan forensic investigation.",

        sections: [
          {
            h: "Data Wiping & Secure Deletion",
            p:
            "Tools sida sdelete ama shred waxay overwrite gareeyaan data marar badan si aan loo soo celin karin. Attacker-yadu waxay isticmaalaan kuwan kadib operations-kooda si ay u tirtiraan evidence."
          },
          {
            h: "Log Manipulation & Deletion",
            p:
            "Event log clearing (Event ID 1102), Linux log editing (beddelidda auth.log), ama disabling logging marka hore — dhammaantood waa techniques caan ah oo la joojiyo detection/investigation."
          },
          {
            h: "Encryption as Anti-Forensics",
            p:
            "Attacker-yadu waxay isticmaalaan encryption (files, communications) si loo qariyo content-ka, xitaa haddii files-ka la helo. Haddii aan key la haysan, content-ku wuxuu noqdaa mid aan la falanqeyn karin."
          },
          {
            h: "Trail Obfuscation",
            p:
            "Isticmaalka multiple hops (VPN → Tor → compromised server), living off the land techniques (tools legit ah), iyo false flags (isku dayo lagu eedeeyo party kale) waa dhammaantood habab lagu qariyo asalka weerarka."
          }
        ],

        terms: [
          { term: "Trail Obfuscation", def: "Isku dayga lagu qariyo asalka/tariiqda weerarka." },
          { term: "False Flag", def: "Isku dayga lagu eedeeyo party kale weerarka." }
        ],

        quiz: [
          {
            q: "Secure deletion tools sida sdelete waxay sameeyaan?",
            options: [
              "Overwrite gareeyaan data marar badan si aan loo soo celin karin",
              "Waxay backup sameeyaan",
              "Waxay encrypt gareeyaan oo keliya",
              "Wax kama beddelaan"
            ],
            answer: 0,
            explain: "Overwriting-ku wuxuu ka dhigaa recovery mid aan macquul ahayn."
          },
          {
            q: "Encryption sida anti-forensics technique waxay?",
            options: [
              "Qaridaa content-ka xitaa haddii files la helo",
              "Tirtirtaa files gebi ahaanba",
              "Ma jiro isticmaal anti-forensic ah",
              "Waxay kordhisaa detection"
            ],
            answer: 0,
            explain: "Encryption-ka aan key la haysan wuxuu ka dhigaa data mid aan la falanqeyn karin."
          },
          {
            q: "Living off the land techniques waxay adkeeyaan detection sababtoo ah?",
            options: [
              "Waxay isticmaalaan tools legit ah oo horay ugu jira system-ka",
              "Waxay isticmaalaan malware custom ah oo la ogaan karo",
              "Ma jiro isticmaal anti-forensic ah",
              "Waxay kaydiyaan logs badan"
            ],
            answer: 0,
            explain: "Tools legit ah waxay isku qarshiyaan admin activity caadi ah."
          },
          {
            q: "False flag operation waa?",
            options: [
              "Isku dayga lagu eedeeyo party kale weerarka",
              "Malware nooc ah",
              "Backup technique",
              "Encryption method"
            ],
            answer: 0,
            explain: "Attacker-yada advanced-ku waxay isku dayaan inay marin habaabiyaan attribution."
          }
        ],

        exercise: {
          title: "Anti-Forensics Awareness Study",
          steps: [
            "Liis garee 4 anti-forensics techniques.",
            "Sharax sida secure deletion loo ogaan karo (calaamado).",
            "Sharax sida encryption uga adkeeyo forensics-ka.",
            "Sharax tusaale false flag operation ah."
          ],
          deliverable: "Anti-forensics techniques awareness document."
        }
      },


      {
        slug: "timestomping-detection",
        title: "Timestomping Detection",
        english: "Timestomping Detection",
        minutes: 14,

        summary:
          "Faham qoto dheer sida timestomping loo sameeyo iyo sida forensic analyst uu ku ogaado.",

        sections: [
          {
            h: "Waa Maxay Timestomping?",
            p:
            "Timestomping waa technique lagu beddelo file timestamps (created, modified, accessed) si loo qariyo waqtiga dhabta ah ee dhaqan khaldan la sameeyay — tools sida timestomp.exe waxay u ogolaadaan attacker inuu si dhab ah u beddelo MACB timestamps."
          },
          {
            h: "Detecting Timestomping via MFT Attributes",
            p:
            "NTFS wuxuu leeyahay laba attribute oo timestamps ah: $STANDARD_INFORMATION (fudud in la beddelo, wuxuu muuqdaa Explorer) iyo $FILE_NAME (adag in la beddelo). Khilaaf u dhexeeya labadan waa calaamad xoog leh oo timestomping ah."
          },
          {
            h: "Log Correlation for Timestomp Detection",
            p:
            "Xitaa haddii file timestamps la beddelay, USN Journal iyo $LogFile ($LogFile transaction log) waxay diiwaan geliyaan waqtiga dhabta ah ee isbeddelku dhacay — waxaana loo isticmaali karaa in la barbardhigo file timestamps ee la beddelay."
          },
          {
            h: "Real-World Timestomping Indicators",
            p:
            "File-timestamps oo si sax ah isugu mid ah (tusaale dhammaan 00:00:00 seconds), timestamps ka horreeya OS install date-ka, ama files-ka isla folder-ka oo leh timestamps kala fog oo aan macquul ahayn — dhammaantood waa red flags."
          }
        ],

        terms: [
          { term: "Timestomping", def: "Beddelidda file timestamps si loo qariyo waqtiga dhabta ah." },
          { term: "$STANDARD_INFORMATION", def: "Attribute NTFS ah oo timestamps ah, fudud in la beddelo." },
          { term: "$FILE_NAME", def: "Attribute NTFS ah oo timestamps ah, adag in la beddelo." }
        ],

        quiz: [
          {
            q: "Timestomping waa maxay?",
            options: [
              "Beddelidda file timestamps si loo qariyo waqtiga dhabta ah",
              "Tirtirida files",
              "Encrypt gareynta files",
              "Backup files"
            ],
            answer: 0,
            explain: "Timestomping waa nooc anti-forensics ah oo diiradda saara timestamps."
          },
          {
            q: "Khilaaf u dhexeeya $STANDARD_INFORMATION iyo $FILE_NAME wuxuu tilmaamayaa?",
            options: [
              "Timestomping suurtagal ah",
              "Caadi ahaan",
              "Backup process",
              "Update software"
            ],
            answer: 0,
            explain: "Attacker-yadu badanaa waxay kaliya beddelaan $STANDARD_INFORMATION, ma taaban $FILE_NAME."
          },
          {
            q: "USN Journal/$LogFile waxay caawiyaan detection-ka timestomping sababtoo ah?",
            options: [
              "Waxay diiwaan geliyaan waqtiga dhabta ah ee isbeddelku dhacay",
              "Waxay tirtiraan timestamps",
              "Ma jiro faa'iido",
              "Waxay encrypt gareeyaan files"
            ],
            answer: 0,
            explain: "Journals-ku waxay bixiyaan independent record oo la barbardhigi karo."
          },
          {
            q: "Timestamps oo dhammaan 00:00:00 seconds ah waa calaamad?",
            options: [
              "Timestomping suurtagal ah",
              "Caadi ahaan",
              "Backup",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "Timestamps caadiga ahi kama yimaadaan seconds precise round numbers ah."
          }
        ],

        exercise: {
          title: "Timestomping Detection Practice",
          steps: [
            "Sharax habka timestomping tools u shaqeeyaan.",
            "Sharax sida $STANDARD_INFORMATION iyo $FILE_NAME loo barbardhigo.",
            "Sharax sida USN Journal loo isticmaali lahaa verification.",
            "Liis garee 3 red flags oo timestomping muujiya."
          ],
          deliverable: "Timestomping detection checklist."
        }
      },


      {
        slug: "steganography-hidden-data",
        title: "Steganography & Hidden Data",
        english: "Steganography and Hidden Data",
        minutes: 12,

        summary:
          "Faham sida xogta loo qarin karo files kale gudahood (steganography) iyo sida loo ogaado.",

        sections: [
          {
            h: "Waa Maxay Steganography?",
            p:
            "Steganography waa cilmiga lagu qariyo xog file kale gudihiisa (tusaale: text file oo lagu qariyo sawir) si aysan u muuqan in xog qarsoon ay jirto — ka duwan encryption (oo muujisa in wax qarsoon yahay, laakiin aan la akhrin karin)."
          },
          {
            h: "Common Steganography Techniques",
            p:
            "LSB (Least Significant Bit) steganography wuxuu beddelaa bits-ka ugu yar qiimaha leh pixels-ka sawirka, isaga oo aan si la taaban karo u beddelin muuqaalka — data-ka qarsoon wuxuu ku jiraa bits-kaas."
          },
          {
            h: "Detecting Steganography",
            p:
            "File size oo aan caadi ahayn (sawir 'yar' oo leh file size weyn), statistical analysis (LSB patterns aan caadi ahayn), iyo tools specific ah (StegExpose, zsteg) waxaa loo isticmaali karaa in la ogaado steganography."
          },
          {
            h: "Steganography in Malware & Exfiltration",
            p:
            "Attacker-yadu waxay isticmaalaan steganography si ay u qariyaan malware payloads sawirro gudahood (images malicious ah oo u eg kuwo caadi ah), ama si ay xog uga exfiltrate gareeyaan iyada oo aan la ogaan (data hidden images la upload gareeyay)."
          }
        ],

        terms: [
          { term: "Steganography", def: "Cilmiga lagu qariyo xog file kale gudihiisa." },
          { term: "LSB Steganography", def: "Technique beddesha bits-ka ugu yar qiimaha leh pixels-ka." }
        ],

        quiz: [
          {
            q: "Steganography ka duwan tahay encryption sababtoo ah?",
            options: [
              "Steganography wuxuu qariyaa in xog qarsoon jirto, encryption wuxuu muujiyaa laakiin qariyaa content",
              "Isku mid",
              "Steganography waa mid ka fiican marwalba",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Farqigu waa ujeeddo: steganography wuxuu qariyaa existence-ka, encryption wuxuu qariyaa content."
          },
          {
            q: "LSB steganography wuxuu beddelaa?",
            options: [
              "Bits-ka ugu yar qiimaha leh pixels-ka",
              "Dhammaan bits-ka sawirka",
              "Metadata oo keliya",
              "File size-ka oo keliya"
            ],
            answer: 0,
            explain: "Beddelidda bits-kan waa la taaban karin muuqaalka sawirka."
          },
          {
            q: "File size aan caadi ahayn (sawir yar leh file size weyn) waa?",
            options: [
              "Calaamad steganography suurtagal ah",
              "Caadi ahaan",
              "Ma jiro macno",
              "Compression normal ah"
            ],
            answer: 0,
            explain: "Data qarsoon wuxuu kordhin karaa file size-ka aan caadi ahayn."
          },
          {
            q: "Attacker-yadu steganography u isticmaalaan?",
            options: [
              "Qaridda malware payloads ama exfiltration",
              "Kaliya art project",
              "Ma jiro isticmaal khaldan",
              "Kaliya backup"
            ],
            answer: 0,
            explain: "Steganography waa technique caan ah oo defense evasion ah."
          }
        ],

        exercise: {
          title: "Steganography Detection Awareness",
          steps: [
            "Sharax farqiga steganography iyo encryption.",
            "Sharax habka LSB steganography u shaqeeyo.",
            "Liis garee 3 calaamado steganography suurtagal ah.",
            "Sharax sida attacker-yadu steganography u isticmaali lahaayeen exfiltration."
          ],
          deliverable: "Steganography detection awareness notes."
        }
      },


      {
        slug: "encrypted-container-forensics",
        title: "Encrypted Container Forensics",
        english: "Encrypted Container Forensics",
        minutes: 10,

        summary:
          "Faham sida encrypted containers (BitLocker, VeraCrypt) loo baaro forensics ahaan.",

        sections: [
          {
            h: "Full-Disk Encryption (BitLocker, FileVault)",
            p:
            "BitLocker (Windows) iyo FileVault (macOS) waxay encrypt gareeyaan disk-ka oo dhan. Haddii recovery key ama password la haysan, disk-ka waa la furi karaa forensically — haddii kale, xogtu waa mid aan la heli karin."
          },
          {
            h: "VeraCrypt & Hidden Volumes",
            p:
            "VeraCrypt wuxuu bixiyaa 'hidden volumes' — volume qarsoon oo ku jira volume kale oo la furay. Xitaa haddii attacker-ku furo volume-ka bannaanka ah (decoy), volume-ka hoose ee qarsoon wuu weli sugan yahay — mid aad u adag in la ogaado in uu jiro."
          },
          {
            h: "Key Recovery Strategies",
            p:
            "Memory forensics (RAM-ka wuxuu weli haysan karaa encryption keys haddii container-ku furan yahay), password cracking (haddii password fudud la isticmaalay), iyo evidence kale (sticky notes, password managers) waxaa loo isticmaali karaa in la helo access."
          },
          {
            h: "Legal Considerations for Compelled Decryption",
            p:
            "Sida compelled unlocking mobile devices, xeerarka dal kale waxay kala duwan yihiin haddii qof la qasbi karo inuu bixiyo encryption password/key investigation gudaheeda — waa qayb muhiim ah oo la fahmo ka hor investigation la bilaabo."
          }
        ],

        terms: [
          { term: "Hidden Volume", def: "Volume qarsoon oo VeraCrypt ku jira volume kale oo la furay." },
          { term: "Compelled Decryption", def: "Qasabka qof inuu bixiyo encryption keys/passwords." }
        ],

        quiz: [
          {
            q: "Haddii recovery key aan la haysan, BitLocker-encrypted disk-ku waa?",
            options: [
              "Aan la heli karin forensically",
              "Si fudud loo furi karaa",
              "Ma jiro encryption dhab ah",
              "Waligeed la furi karaa"
            ],
            answer: 0,
            explain: "Full-disk encryption oo xoog leh wuxuu ka dhigaa access mid adag/aan macquul ahayn."
          },
          {
            q: "Hidden volume VeraCrypt ah wuxuu bixiyaa?",
            options: [
              "Layer qarsoon oo aad u adag in la ogaado in uu jiro",
              "Encryption ka daciif ah",
              "Ma jiro faa'iido",
              "Backup oo keliya"
            ],
            answer: 0,
            explain: "Hidden volumes waa mid ka mid ah techniques anti-forensic-ka ugu adag."
          },
          {
            q: "Memory forensics wuxuu caawin karaa encrypted containers sababtoo ah?",
            options: [
              "RAM-ku wuxuu weli haysan karaa keys haddii container-ku furan yahay",
              "Memory ma khuseeyo encryption",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo disk"
            ],
            answer: 0,
            explain: "Keys-ka waxay ku jiraan memory intii container-ku furan yahay."
          },
          {
            q: "Compelled decryption legal xeerarkeedu waxay?",
            options: [
              "Kala duwan yihiin dal kasta",
              "Waligood isku mid yihiin",
              "Ma jiraan xeerar",
              "Waligood waa illegal"
            ],
            answer: 0,
            explain: "Jurisdiction-ka waa factor muhiim ah oo la fahmo ka hor investigation la bilaabo."
          }
        ],

        exercise: {
          title: "Encrypted Container Investigation Approach",
          steps: [
            "Sharax farqiga BitLocker/FileVault iyo VeraCrypt.",
            "Sharax habka hidden volumes u shaqeeyaan VeraCrypt.",
            "Liis garee 3 key recovery strategies.",
            "Sharax sababta legal considerations muhiim u yihiin compelled decryption."
          ],
          deliverable: "Encrypted container forensics approach notes."
        }
      },


      {
        slug: "rootkit-detection-forensics",
        title: "Rootkit Detection Forensics",
        english: "Rootkit Detection Forensics",
        minutes: 13,

        summary:
          "Faham habab la isticmaalo si loo ogaado rootkits forensics ahaan.",

        sections: [
          {
            h: "Rootkit Types",
            p:
            "User-mode rootkits (isku qariyaan heer application ah, mid ka fudud in la ogaado), Kernel-mode rootkits (isku qariyaan heer OS core ah, aad u adag), iyo Bootkit (isku qariyaan bilowga boot process-ka, adkaanaya xitaa reinstall OS)."
          },
          {
            h: "Behavioral Indicators",
            p:
            "Performance issues aan sabab lahayn, files/processes muuqda tools qaar laakiin aan muuqan kuwo kale, network connections aan la ogeyn — dhammaantood waa signals suspicious ah oo rootkit possibility ah."
          },
          {
            h: "Offline Analysis for Rootkit Detection",
            p:
            "Habka ugu wanaagsan ee rootkit detection waa offline analysis — image-gareyn disk-ka/memory-ga, kadibna falanqaynta iyada oo aan OS-ka 'jabsan' la isticmaalin (sababtoo ah rootkit-ku wuxuu beddeli karaa natiijada tools-ka running system-ka)."
          },
          {
            h: "Bootkit Detection Challenges",
            p:
            "Bootkits waxay isku qariyaan Master Boot Record (MBR) ama UEFI firmware — kuwaan waxay adkeeyaan detection sababtoo ah way ka jiraan boot process-ka kaddib OS-ka oo aan dib loo rakibin. Specialized tools waxaa loo baahan yahay boot sector analysis."
          }
        ],

        terms: [
          { term: "Kernel-Mode Rootkit", def: "Rootkit isku qariya heer OS core ah, aad u adag in la ogaado." },
          { term: "Bootkit", def: "Rootkit isku qariya bilowga boot process-ka (MBR/UEFI)." }
        ],

        quiz: [
          {
            q: "Kernel-mode rootkits ka adag yihiin user-mode rootkits sababtoo ah?",
            options: [
              "Waxay isku qariyaan heer OS core ah",
              "Waxay isku qariyaan heer application ah oo keliya",
              "Ma jiro farqi",
              "Kernel-mode waa mid ka fudud"
            ],
            answer: 0,
            explain: "Heer sare oo access ah wuxuu adkeeyaa detection-ka."
          },
          {
            q: "Sababta offline analysis loo doorto rootkit detection waa?",
            options: [
              "Rootkit-ku wuxuu beddeli karaa natiijada tools-ka running system-ka",
              "Waa mid ka dhaqso badan",
              "Ma jiro sabab",
              "Kaliya offline loo isticmaalo compliance"
            ],
            answer: 0,
            explain: "Live system-ka rootkit-ku ku jiro, natiijooyinka scan-kuma laha la aamini karo."
          },
          {
            q: "Bootkits waxay isku qariyaan?",
            options: [
              "Master Boot Record (MBR) ama UEFI firmware",
              "Kaliya files disk-ka",
              "Kaliya memory",
              "Kaliya registry"
            ],
            answer: 0,
            explain: "Bootkits waxay ka jiraan boot process-ka, ka hor OS-ka oo dhan."
          },
          {
            q: "Bootkits waxay adkeeyaan xitaa marka?",
            options: [
              "OS-ka dib loo rakibo",
              "Backup la sameeyo",
              "Antivirus la update gareeyo",
              "Password la beddelo"
            ],
            answer: 0,
            explain: "Boot sector infection-ku wuxuu ka jiraa xitaa OS reinstall."
          }
        ],

        exercise: {
          title: "Rootkit Detection Strategy",
          steps: [
            "Sharax saddexda nooc ee rootkits.",
            "Liis garee 4 behavioral indicators oo rootkit possibility ah.",
            "Sharax sababta offline analysis loo doorto.",
            "Sharax caqabadaha bootkit detection."
          ],
          deliverable: "Rootkit detection strategy guide."
        }
      },


      {
        slug: "anti-forensics-capstone",
        title: "Anti-Forensics — Full Capstone",
        english: "Anti-Forensics Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee full investigation oo attacker isticmaalay anti-forensics.",

        sections: [
          {
            h: "Scenario",
            p:
            "Investigation-ka server-ka la jebiyay, waxaad ogaataa in Event Log la nadiifiyay (1102), file timestamps ay u muuqdaan mid la yaabo, oo container encrypted ah oo la helay disk-ka."
          },
          {
            h: "Log Recovery & Timestomp Detection",
            p:
            "Naqshadee approach-ka log recovery (unallocated space) iyo timestomp detection ($STANDARD_INFORMATION vs $FILE_NAME)."
          },
          {
            h: "Encrypted Container Handling",
            p:
            "Sharax sida aad u tijaabin lahayd key recovery (memory forensics, ama legal process)."
          },
          {
            h: "Comprehensive Anti-Forensics Report",
            p:
            "Isku dar findings-ka warbixin sharaxaysa dhammaan anti-forensics techniques la isticmaalay iyo sida aad uga adkaatay."
          }
        ],

        terms: [
          { term: "Anti-Forensics Investigation", def: "Investigation ku salaysan aqoonsiga iyo ka adkaanshaha anti-forensics techniques." }
        ],

        quiz: [
          {
            q: "Log clearing (1102) la ogaaday, tallaabada xigta waa?",
            options: [
              "Tijaabinta log recovery unallocated space",
              "Iska dhaaf, evidence-ku wuu tirmay",
              "Isla markiiba warbixinta",
              "Xiritaanka investigation-ka"
            ],
            answer: 0,
            explain: "Fragments waxay weli hari karaan xitaa log clearing kadib."
          },
          {
            q: "Timestomping suspected, xaqiijintu waxay ku salaysan tahay?",
            options: [
              "Barbardhigga $STANDARD_INFORMATION iyo $FILE_NAME",
              "Kaliya eegista file-ka",
              "Kaliya interview shaqaalaha",
              "Ma jiro hab la xaqiijin karo"
            ],
            answer: 0,
            explain: "Khilaafka labadan attributes waa proof anti-forensics ah."
          },
          {
            q: "Encrypted container-ka helay, tallaabada la tixgelin karo waa?",
            options: [
              "Tijaabinta memory forensics haddii container-ku furan yahay",
              "Iska dhaaf gebi ahaanba",
              "Isla markiiba tirtir",
              "Ma jiro tallaabo la qaadan karo"
            ],
            answer: 0,
            explain: "Memory-gu wuxuu haysan karaa keys haddii container-ku hore u furnaa."
          }
        ],

        exercise: {
          title: "Full Anti-Forensics Investigation",
          steps: [
            "Naqshadee log recovery approach-ka.",
            "Xaqiiji timestomping iyadoo la barbardhigayo attributes.",
            "Naqshadee encrypted container handling strategy.",
            "Diyaari warbixin buuxda oo dhammaan anti-forensics techniques sharaxaysa (portfolio-ready)."
          ],
          deliverable: "Full anti-forensics investigation report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "df10",
    slug: "forensic-reporting-testimony-capstone",
    stage: "Sare",
    title: "Forensic Reporting, Testimony & Capstone",
    english: "Forensic Reporting, Testimony & Capstone",
    hours: 2,

    outcome:
      "Waxaad dhammaystiri doontaa forensic report writing, expert witness testimony prep, career readiness, iyo full end-to-end capstone investigation.",

    topics: [
      "Forensic Report Writing",
      "Expert Witness Testimony",
      "Forensic Case Management",
      "Career Paths & Certifications in Forensics",
      "Building Your Forensics Portfolio",
      "Interview Prep for Forensics Roles",
      "Final Capstone: Full Investigation",
    ],

    lessonList: [

      {
        slug: "forensic-report-writing",
        title: "Forensic Report Writing",
        english: "Forensic Report Writing",
        minutes: 10,

        summary:
          "Baro qaab-dhismeedka forensic report professional ah oo maxkamad ama maamul loo qori karo.",

        sections: [
          {
            h: "Forensic Report Structure",
            p:
            "Executive Summary, Scope & Methodology, Evidence Summary (chain of custody), Findings (detailed, technical), Timeline, Conclusions, iyo Appendices (raw data, screenshots, hash values)."
          },
          {
            h: "Objectivity & Fact-Based Language",
            p:
            "Forensic reports waa in ay ahaadaan kuwo aad u objective ah — kala saar 'the evidence shows' iyo 'I believe' — waa in la isticmaalo facts la caddeyn karo, ma aha opinions aan la taageerin evidence."
          },
          {
            h: "Methodology Documentation",
            p:
            "Report-ku waa in uu sharaxaa habka la raacay (tools, versions, steps) si qof kale (peer reviewer ama defense expert) uu u dib-u-sameyn karo baaritaanka isla natiijada."
          },
          {
            h: "Report Peer Review",
            p:
            "Forensic labs professional ah waxay leeyihiin proses peer review ah — analyst kale wuxuu dib u eegayaa findings-ka iyo methodology-ga ka hor report-ku uu noqdo mid rasmi ah, si loo yareeyo qaladaad."
          }
        ],

        terms: [
          { term: "Peer Review", def: "Dib u eegista analyst kale ee findings ka hor report rasmi ah." },
          { term: "Objective Language", def: "Luqad ku salaysan facts, ma aha opinions aan taageerin." }
        ],

        quiz: [
          {
            q: "Forensic report-ku waa in uu isticmaalo?",
            options: [
              "Fact-based language ('the evidence shows')",
              "Opinions aan la taageerin evidence",
              "Guesses",
              "Speculation"
            ],
            answer: 0,
            explain: "Objectivity waa muhiim si loo taageero admissibility iyo credibility."
          },
          {
            q: "Sababta methodology documentation muhiim u tahay waa?",
            options: [
              "Si qof kale uu u dib-u-sameyn karo baaritaanka isla natiijada",
              "Si loo kordhiyo bogagga report-ka",
              "Ma jiro sabab",
              "Kaliya loo baahan yahay compliance"
            ],
            answer: 0,
            explain: "Reproducibility-ku waa asaas muhiim ah oo scientific rigor ah."
          },
          {
            q: "Peer review process-ku wuxuu yareeyaa?",
            options: [
              "Qaladaad findings/methodology gudaheeda",
              "Waqtiga la qaato",
              "Ma jiro faa'iido",
              "Kordhinta cost-ka oo keliya"
            ],
            answer: 0,
            explain: "Analyst kale wuxuu ka helaa qaladaadka ka hor report-ku noqdo rasmi ah."
          },
          {
            q: "Executive summary-gu waa in uu?",
            options: [
              "Ku koobo findings-ka guud, luqad fudud",
              "Ku jiro dhammaan raw data",
              "Kaliya loo qoro judges",
              "Aad u dheer yahay"
            ],
            answer: 0,
            explain: "Audience kala duwan (maamul vs technical) waa in loo adeegaa qaybo kala duwan."
          }
        ],

        exercise: {
          title: "Forensic Report Structure Practice",
          steps: [
            "Naqshadee full report structure (qaybo oo dhan).",
            "Qor tusaale executive summary 4 sadar ah scenario forensic ah.",
            "Sharax farqiga fact-based iyo opinion-based language.",
            "Sharax faa'iidada peer review process-ka."
          ],
          deliverable: "Forensic report structure template + tusaale."
        }
      },


      {
        slug: "expert-witness-testimony",
        title: "Expert Witness Testimony",
        english: "Expert Witness Testimony",
        minutes: 12,

        summary:
          "Faham qaabka marag-furidda expert-ka maxkamadda, iyo sida loo diyaargaroobo.",

        sections: [
          {
            h: "Qualifying as an Expert Witness",
            p:
            "Maxkamadda waa in ay aqbasho qofka sida expert ah — kaas oo ku salaysan experience, education, certifications, iyo publications/track record. Voir dire process-ku wuxuu tijaabiyaa qualifications-kaas ka hor testimony-gu bilaabmo."
          },
          {
            h: "Direct Examination & Cross-Examination",
            p:
            "Direct examination waxaa sameeya lawyer-ka ku dalbaday expert-ka, si loo bandhigo findings-ka si organized ah. Cross-examination waxaa sameeya lawyer-ka kale, badanaa isku dayaya inuu shakiyo methodology-ga ama qualifications-ka."
          },
          {
            h: "Communicating Technical Findings to Lay Audiences",
            p:
            "Expert witness-ku waa in uu sharraxo findings technical ah luqad juror-ku fahmi karo — isticmaal analogies fudud, ka fogow jargon aan la sharxin, oo isticmaal visuals (diagrams, timelines) marka macquul ah."
          },
          {
            h: "Maintaining Composure Under Cross-Examination",
            p:
            "Defense attorneys waxay isku dayi karaan inay shakiyaan methodology-ga ama qualifications-kaaga. Waa muhiim in la sii wado calm, la sii jawaabo su'aalaha si toos ah, oo aan la aamin lahayn su'aalo aan la fahmin."
          }
        ],

        terms: [
          { term: "Voir Dire", def: "Proses lagu tijaabiyo qualifications-ka expert-ka ka hor testimony." },
          { term: "Cross-Examination", def: "Su'aalaha lawyer-ka kale, badanaa shakiya findings-ka." }
        ],

        quiz: [
          {
            q: "Voir dire waa?",
            options: [
              "Proses lagu tijaabiyo qualifications-ka expert-ka",
              "Nooc report-ka",
              "Tool forensic ah",
              "Ma jiro macno legal ah"
            ],
            answer: 0,
            explain: "Waa marxalad muhiim ah ka hor testimony-gu bilaabmo."
          },
          {
            q: "Sababta expert-ku uu ka fogaado jargon aan la sharxin waa?",
            options: [
              "Jury-du waa in ay fahmaan findings-ka",
              "Jargon-ku wuxuu muujiyaa aqoon sare",
              "Ma jiro sabab",
              "Waa waajib legal ah"
            ],
            answer: 0,
            explain: "Communication effective ah waa muhiim si loo taageero go'aanka jury-ga."
          },
          {
            q: "Cross-examination badanaa waxay isku dayaan?",
            options: [
              "Shakiga methodology-ga ama qualifications-ka expert-ka",
              "Ammaanidda expert-ka",
              "Kaydinta backup",
              "Ma jiro ujeeddo"
            ],
            answer: 0,
            explain: "Defense-ku wuxuu isku dayaa inuu yareeyo credibility-ga testimony-ga."
          },
          {
            q: "Maintaining composure muhiim u tahay sababtoo ah?",
            options: [
              "Ka jawaabista su'aalo cadaadis leh waxay kordhisaa credibility",
              "Ma jiro sabab",
              "Kaliya loo baahan yahay professional dress",
              "Waa optional"
            ],
            answer: 0,
            explain: "Calmness-ku wuxuu muujiyaa kalsooni iyo professionalism."
          }
        ],

        exercise: {
          title: "Expert Testimony Preparation",
          steps: [
            "Sharax proses-ka voir dire.",
            "Sharax farqiga direct iyo cross-examination.",
            "Qor tusaale sharraxaad ah oo finding technical ah luqad fudud ku qoran (juror-friendly).",
            "Naqshadee 3 tips lagu sii hayo composure cross-examination gudaheeda."
          ],
          deliverable: "Expert witness testimony preparation guide."
        }
      },


      {
        slug: "forensic-case-management",
        title: "Forensic Case Management",
        english: "Forensic Case Management",
        minutes: 13,

        summary:
          "Faham sida cases forensic ah loo maareeyo laga bilaabo intake ilaa xiritaanka.",

        sections: [
          {
            h: "Case Intake & Prioritization",
            p:
            "Marka case cusub la helo, waa in la go'aamiyo: severity/urgency, resources loo baahan yahay, iyo deadline (haddii uu jiro, tusaale legal deadlines). Case management systems (tusaale TheHive) waxaa loo isticmaalaa in la la socdo."
          },
          {
            h: "Evidence Tracking Throughout the Case",
            p:
            "Chain of custody-ga waa in la sii wado laga bilaabo intake ilaa xiritaanka case-ka — item kasta oo evidence ah waa in la la socdo dhammaan phases-ka investigation-ka."
          },
          {
            h: "Case Documentation Standards",
            p:
            "Case notes joogto ah (case log) waa in la haysto laga bilaabo maalinta koowaad — waxay taageeraan report-writing dambe iyo testimony haddii loo baahdo."
          },
          {
            h: "Case Closure & Archival",
            p:
            "Marka case-ku dhammaado, evidence-ka waa in la kaydiyaa (retention period-ka la xiriira xeerarka), oo case file-ku la xiro si sax ah — oo ay ku jiraan dhammaan documentation, reports, iyo evidence logs."
          }
        ],

        terms: [
          { term: "Case Intake", def: "Marxaladda hore ee case cusub la helo lana kala saaro mudnaanta." },
          { term: "Case Log", def: "Diiwaanka joogtada ah ee dhaqdhaqaaqa case-ka." }
        ],

        quiz: [
          {
            q: "Case intake-ka, waxa la go'aamiyaa waxaa ka mid ah?",
            options: [
              "Severity, resources, deadlines",
              "Kaliya magaca case-ka",
              "Kaliya lambarka case-ka",
              "Ma jiraan factors la tixgelin karo"
            ],
            answer: 0,
            explain: "Prioritization-ku wuxuu hagaa habka resources loo qoondeeyo."
          },
          {
            q: "Chain of custody waa in la sii wado?",
            options: [
              "Laga bilaabo intake ilaa xiritaanka case-ka",
              "Kaliya intii collection-ku socdo",
              "Kaliya kadib xiritaanka",
              "Ma jiro shuruud joogto ah"
            ],
            answer: 0,
            explain: "Gap kasta oo custody ah wuxuu khatar galinayaa admissibility-ga."
          },
          {
            q: "Case log-ga sababta uu muhiim u yahay waa?",
            options: [
              "Wuxuu taageeraa report-writing dambe iyo testimony",
              "Waa optional",
              "Ma jiro sabab",
              "Kaliya loo baahan yahay backup"
            ],
            answer: 0,
            explain: "Notes joogto ah waxay hubiyaan aan la iloobin faahfaahin muhiim ah."
          },
          {
            q: "Case closure-ka, evidence-ka waa in la?",
            options: [
              "Kaydiyaa muddo (retention period) iyadoo lagu saleynayo xeerarka",
              "Isla markiiba tirtiraa",
              "Ku daraa case kale",
              "Ma jiro proses gaar ah"
            ],
            answer: 0,
            explain: "Retention requirements waxay ku xiran yihiin xeerarka jurisdiction-ka."
          }
        ],

        exercise: {
          title: "Case Management Workflow Design",
          steps: [
            "Naqshadee workflow case intake ilaa closure.",
            "Sharax sida chain of custody loo sii wado case-ka oo dhan.",
            "Qor tusaale case log entry ah.",
            "Sharax sida retention policy loo dabaqi lahaa case xagta."
          ],
          deliverable: "Forensic case management workflow."
        }
      },


      {
        slug: "career-paths-certifications-forensics",
        title: "Career Paths & Certifications in Forensics",
        english: "Career Paths and Certifications in Forensics",
        minutes: 15,

        summary:
          "Faham career paths-ka digital forensics iyo certifications-ka muhiimka ah.",

        sections: [
          {
            h: "Digital Forensics Career Roles",
            p:
            "Digital Forensics Analyst (entry-level), Forensic Investigator (law enforcement), DFIR Consultant (private sector), Malware Analyst (specialized), iyo Forensic Lab Manager (senior) — waddo kasta waxay leedahay path xirfad oo kala duwan."
          },
          {
            h: "Entry-Level Certifications",
            p:
            "CompTIA Security+ waa foundational. GCFE (GIAC Certified Forensic Examiner) waa entry-level forensics-specific. eCIR (eLearnSecurity Certified Incident Responder) waa mid kale oo hands-on ah."
          },
          {
            h: "Advanced Certifications",
            p:
            "GCFA (GIAC Certified Forensic Analyst) waa mid heer sare ah oo caan ah. EnCE (EnCase Certified Examiner) waa certification tool-specific ah. CCE (Certified Computer Examiner) waa mid kale oo la aqoonsaday."
          },
          {
            h: "Building Experience",
            p:
            "CTF competitions (forensics category), open-source case studies, iyo volunteer work (non-profits u baahan digital forensics support) waa habab lagu dhiso experience xitaa ka hor shaqo rasmi ah."
          }
        ],

        terms: [
          { term: "GCFA", def: "GIAC Certified Forensic Analyst — certification heer sare ah." },
          { term: "GCFE", def: "GIAC Certified Forensic Examiner — certification entry-level ah." }
        ],

        quiz: [
          {
            q: "GCFE waa nooca certification?",
            options: [
              "Entry-level forensics-specific",
              "Advanced pentesting",
              "Cloud security",
              "Malware development"
            ],
            answer: 0,
            explain: "GCFE waa qaab wanaagsan oo lagu bilaabo forensics career."
          },
          {
            q: "GCFA marka la barbardhigo GCFE waa?",
            options: [
              "Heer sare ah",
              "Heer hoose ah",
              "Isku mid",
              "Ma khuseeyo forensics"
            ],
            answer: 0,
            explain: "GCFA waa certification advanced ah oo forensic analysis ah."
          },
          {
            q: "CTF competitions waxay caawiyaan?",
            options: [
              "Dhisidda experience xitaa ka hor shaqo rasmi ah",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo fun",
              "Kaliya loo baahan yahay professionals"
            ],
            answer: 0,
            explain: "Practical experience-ku wuxuu muujiyaa xirfado dhab ah."
          },
          {
            q: "DFIR Consultant badanaa wuxuu ka shaqeeyaa?",
            options: [
              "Private sector",
              "Kaliya law enforcement",
              "Kaliya government",
              "Kaliya non-profits"
            ],
            answer: 0,
            explain: "DFIR consultants waxay bixiyaan adeeg shirkadaha kala duwan."
          }
        ],

        exercise: {
          title: "Career Path Planning",
          steps: [
            "Xulo hal career role oo digital forensics ah.",
            "Naqshadee certification roadmap 12-bilood ah.",
            "Liis garee 2 habab lagu dhisi lahaa experience ka hor shaqo rasmi ah.",
            "Sharax sababta doorashadaada career role-ka."
          ],
          deliverable: "Personal forensics career plan."
        }
      },


      {
        slug: "building-forensics-portfolio",
        title: "Building Your Forensics Portfolio",
        english: "Building Your Forensics Portfolio",
        minutes: 11,

        summary:
          "Baro sida loo dhiso portfolio xirfadeed oo digital forensics ah oo employers ay arki karaan.",

        sections: [
          {
            h: "Sababta Portfolio Muhiim u Yahay Forensics",
            p:
            "Forensics roles badanaa waxay u baahan yihiin practical demonstration — portfolio-gu wuxuu muujiyaa awoodda dhabta ah, gaar ahaan haddii aadan lahayn experience shaqo oo hore."
          },
          {
            h: "Waxa Portfolio-gu Ku Jiro",
            p:
            "3-5 investigation reports (labs-ka aad ugu fiican), 1-2 malware analysis samples (concept ahaan), CTF write-ups (haddii aad qaadatay competitions), iyo case studies aad qortay iyadoo la isticmaalayo public datasets."
          },
          {
            h: "Using Public Datasets & CTFs",
            p:
            "DFRWS Challenge datasets, NIST CFReDS, iyo CTF platforms (CyberDefenders, HackTheBox forensics challenges) waxay bixiyaan scenarios dhab ah oo la falanqeyn karo iyada oo aan xog dhab ah oo shirkad ah la khatar gelin."
          },
          {
            h: "Sanitizing & Presenting Work",
            p:
            "Waligaa ha isticmaalin xog dhab ah oo shirkad ah portfolio-ga gudihiisa. Isticmaal data tusaale ah ama public datasets oo keliya. Naqshadee GitHub repo ama website oo cad oo si fiican u qoran."
          }
        ],

        terms: [
          { term: "Public Dataset", def: "Xog forensics ah oo dadweynaha loo bandhigay barasho ahaan." },
          { term: "CTF Write-up", def: "Sharraxaad qoraal ah oo sida CTF challenge loo xaliyay." }
        ],

        quiz: [
          {
            q: "Sababta portfolio-gu muhiim u yahay forensics roles waa?",
            options: [
              "Practical demonstration ayaa loo baahan yahay, gaar ahaan la'aanta experience",
              "Waa shuruud rasmi ah oo interview",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo social media"
            ],
            answer: 0,
            explain: "Employers-yadu waxay rabaan inay arkaan hands-on skills."
          },
          {
            q: "Public datasets sida DFRWS Challenge waxay bixiyaan?",
            options: [
              "Scenarios dhab ah oo la falanqeyn karo aan khatar gelinayn xog shirkad",
              "Xog shirkad dhab ah",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo research academic"
            ],
            answer: 0,
            explain: "Public datasets waa xal ammaan ah oo portfolio building ah."
          },
          {
            q: "Portfolio-gu waa in uu marnaba ku jiro?",
            options: [
              "Xog dhab ah oo shirkad gaar ah (confidential)",
              "Public datasets",
              "CTF write-ups",
              "Labs-kaaga ugu fiican"
            ],
            answer: 0,
            explain: "Marnaba ha bandhigin xog dhab ah oo confidential ah."
          }
        ],

        exercise: {
          title: "Forensics Portfolio Planning",
          steps: [
            "Dib u eeg dhammaan labs-ka aad dhammaystay module-yada hore.",
            "Xulo 4 labs ugu fiican oo aad ku darto portfolio-ga.",
            "Raadi hal public dataset (concept ahaan) aad ku darsan lahayd portfolio-ga.",
            "Naqshadee structure GitHub repo ah."
          ],
          deliverable: "Digital forensics portfolio plan."
        }
      },


      {
        slug: "interview-prep-forensics",
        title: "Interview Prep for Forensics Roles",
        english: "Interview Preparation for Forensics Roles",
        minutes: 14,

        summary:
          "Diyaari nafaqaysiga interview-yada digital forensics roles-ka, technical iyo behavioral labadaba.",

        sections: [
          {
            h: "Common Technical Questions",
            p:
            "'Sharax order of volatility', 'Farqiga MFT entry iyo inode', 'Sida timestomping loo ogaado', 'Sharax habka chain of custody-du u shaqeeyo' — diyaari jawaabo gaaban oo cad ah su'aalahan oo kale ah."
          },
          {
            h: "Scenario-Based Questions",
            p:
            "'Waxaad hesha forensic image laptop ah, maxaad marka hore samayn lahayd?' — jawaabta waa in ay muujiso process-kaaga methodology-ga, ma aha kaliya xaqiiqooyin technical ah."
          },
          {
            h: "Legal & Ethical Scenario Questions",
            p:
            "'Waxaad heshay evidence ka baxsan scope-ka authorization-ka, maxaad samaynaysaa?' — jawaabtu waa in ay muujiso fahamka xeerarka iyo ethics-ka, ma aha kaliya technical skills."
          },
          {
            h: "Presenting Your Portfolio in Interviews",
            p:
            "Diyaari sida aad u sharraxi lahayd portfolio-gaaga — walk through hal case study ah oo faahfaahsan, muujinaya process-kaaga laga bilaabo evidence collection ilaa reporting."
          }
        ],

        terms: [
          { term: "Scenario-Based Interview", def: "Su'aal la weydiiyo oo tijaabinaya habka aad u fikirto scenario dhab ah." }
        ],

        quiz: [
          {
            q: "Scenario-based questions waxay tijaabiyaan?",
            options: [
              "Process-kaaga methodology-ga, ma aha kaliya facts technical ah",
              "Kaliya typing speed",
              "Kaliya aqoon academic ah",
              "Ma jiro ujeeddo"
            ],
            answer: 0,
            explain: "Interviewers-yadu waxay rabaan inay arkaan habka aad u fikirto."
          },
          {
            q: "Su'aal ku saabsan evidence ka baxsan scope-ka waxay tijaabisaa?",
            options: [
              "Fahamka xeerarka iyo ethics",
              "Kaliya technical skills",
              "Kaliya typing speed",
              "Ma jiro ujeeddo"
            ],
            answer: 0,
            explain: "Ethics iyo legal awareness waa muhiim forensics roles ahaan."
          },
          {
            q: "Portfolio presentation-ka, waa in aad?",
            options: [
              "Walk through hal case study faahfaahsan",
              "Kaliya sheegto magacyada labs-ka",
              "Aad u dheer u sharraxdo dhammaan labs-ka",
              "Ma loo baahna faahfaahin"
            ],
            answer: 0,
            explain: "Faahfaahin qoto dheer hal case ah ayaa ka fiican liis kooban."
          }
        ],

        exercise: {
          title: "Forensics Interview Practice",
          steps: [
            "Qor jawaabo 5 technical questions oo kor lagu sharaxay-la mid ah.",
            "Diyaari jawaab su'aal scenario-based ah (laptop investigation).",
            "Diyaari jawaab su'aal ethics ah (evidence ka baxsan scope).",
            "Naqshadee sida aad u sharraxi lahayd hal case study portfolio-gaaga ka mid ah."
          ],
          deliverable: "Forensics interview practice sheet."
        }
      },


      {
        slug: "final-capstone-full-investigation",
        title: "Final Capstone: Full Investigation",
        english: "Final Capstone: Full End-to-End Investigation",
        minutes: 15,

        summary:
          "Isku dar dhammaan xirfadaha koorsadan oo dhan — baar, xaqiiji, oo qor warbixin insider threat case dhamaystiran.",

        sections: [
          {
            h: "Scenario Overview",
            p:
            "Shaqaale ka bixi doona shirkadda ayaa la shakiyay inuu xog xaday laptop shirkadda leh iyo mobile device shakhsi ah oo BYOD ku jira. Waxaad haysataa authorization buuxa aad ku samayso investigation forensic ah."
          },
          {
            h: "Evidence Collection & Chain of Custody",
            p:
            "Isticmaal xirfadaha modules 1-2 si aad u xaqiijiso authorization, u ururiso evidence (order of volatility), oo u dhiso chain of custody log dhamaystiran."
          },
          {
            h: "Multi-Source Forensic Analysis",
            p:
            "Isticmaal xirfadaha disk (module 3), Windows artifacts (module 4), memory (module 5), network (module 6), iyo mobile (module 8) si aad u falanqeyso dhammaan sources-ka evidence-ka ah."
          },
          {
            h: "Anti-Forensics Detection & Reporting",
            p:
            "Xaqiiji haddii attacker-ku isticmaalay anti-forensics techniques (module 9). Ugu dambeyn, isticmaal xirfadaha module 10 si aad u qorto full forensic report oo executive summary, findings, timeline, iyo conclusions leh."
          }
        ],

        terms: [
          { term: "End-to-End Forensic Investigation", def: "Baaritaan isugu jira dhammaan xirfadaha forensics laga bilaabo collection ilaa reporting." }
        ],

        quiz: [
          {
            q: "Full investigation-kan wuxuu isku darayaa?",
            options: [
              "Dhammaan xirfadaha module-yada hore (collection, disk, Windows, memory, network, mobile, anti-forensics, reporting)",
              "Kaliya disk forensics",
              "Kaliya mobile forensics",
              "Kaliya reporting"
            ],
            answer: 0,
            explain: "Capstone-ku wuxuu isku daraa dhammaan waxa aad baratay 10-ka module."
          },
          {
            q: "Marka la bilaabo scenario-ga, waxa ugu horreeya waa?",
            options: [
              "Xaqiijinta authorization-ka",
              "Isla markiiba disk imaging",
              "Warbixinta",
              "Interview shaqaalaha"
            ],
            answer: 0,
            explain: "Authorization waa waajib ka hor wax kasta oo kale."
          },
          {
            q: "Sababta capstone-kani muhiim u yahay portfolio-gaaga waa?",
            options: [
              "Wuxuu muujiyaa awoodaada dhammaystirka process-ka forensics oo dhan",
              "Wuxuu kaliya muujiyaa aqoon academic ah",
              "Ma jiro faa'iido",
              "Wuxuu kaliya muujiyaa typing speed"
            ],
            answer: 0,
            explain: "Employers-yadu waxay rabaan inay arkaan awoodda dhammaystirka investigation oo dhan."
          }
        ],

        exercise: {
          title: "Full End-to-End Forensic Investigation",
          steps: [
            "Xaqiiji authorization-ka scenario-ga (corporate laptop + BYOD mobile).",
            "Naqshadee evidence collection plan oo daboolaya order of volatility.",
            "Falanqee sources-ka kala duwan (disk, Windows artifacts, memory, network, mobile).",
            "Xaqiiji haddii anti-forensics la isticmaalay.",
            "Diyaari full forensic report oo executive summary, findings, timeline, iyo conclusions leh (final portfolio centerpiece)."
          ],
          deliverable: "Complete end-to-end forensic investigation report (final portfolio centerpiece)."
        }
      },

    ],
  }),
];

export function findDFModule(slug: string) {
  return digitalForensicsModules.find((x) => x.slug === slug);
}

export function findDFLesson(moduleSlug: string, lessonSlug: string) {
  const mod = findDFModule(moduleSlug);
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

export const digitalForensicsTotalLessons = digitalForensicsModules.reduce((n, x) => n + x.lessons, 0);
export const digitalForensicsTotalHours = digitalForensicsModules.reduce((n, x) => n + x.hours, 0);
