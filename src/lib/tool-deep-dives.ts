import type { Module } from "./curriculum";

const m = (
  mod: Omit<Module, "lessons" | "topics"> & { topics?: string[] },
): Module => ({
  ...mod,
  topics: mod.topics ?? mod.lessonList.map((l) => l.english),
  lessons: mod.lessonList.length,
});

/**
 * Standalone Tool Deep-Dive courses — NOT part of any career path.
 * Each entry uses the same Module shape as career-path modules, so
 * findModule()/findLesson() in curriculum.ts can resolve these once
 * toolDeepDiveModules is added to the fallback chain there.
 */
export const toolDeepDiveModules: Module[] = [
  m({
    id: "td-wireshark",
    slug: "wireshark-deep-dive",
    stage: "Dhexe",
    title: "Wireshark Deep Dive",
    english: "Wireshark Deep Dive",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa Wireshark — capture/display filters, protocol analysis, stream following, iyo investigation dhab ah.",

    topics: [
      "Wireshark Fundamentals & Interface",
      "Capture Filters vs Display Filters",
      "Protocol Analysis: TCP & UDP",
      "HTTP/HTTPS Traffic Analysis",
      "DNS Analysis in Wireshark",
      "Following Streams & Extracting Files",
      "Statistics & IO Graphs",
      "Wireshark Capstone: Full Investigation",
    ],

    lessonList: [

      {
        slug: "wireshark-fundamentals-interface",
        title: "Wireshark Fundamentals & Interface",
        english: "Wireshark Fundamentals and Interface",
        minutes: 13,

        summary:
          "Faham interface-ka Wireshark iyo mabaadi'da asaasiga ah ee packet capture.",

        sections: [
          {
            h: "Waa Maxay Wireshark?",
            p:
            "Wireshark waa network protocol analyzer bilaash ah oo ugu caansan adduunka — wuxuu u oggolaadaa in la qabto oo la falanqeeyo traffic-ka network-ka heer packet ah, muhiim ah troubleshooting iyo security investigation labadaba."
          },
          {
            h: "Interface-ka Wireshark",
            p:
            "Packet List (liis packets ah, hal sadar hal packet), Packet Details (faahfaahin layer kasta oo packet-ka ah), iyo Packet Bytes (raw hex/ASCII view) — saddexdan panel waxay isku dhisaan interface-ka aasaasiga ah."
          },
          {
            h: "Starting a Capture",
            p:
            "Xulashada interface-ka saxda ah (Ethernet, WiFi) waa tallaabada koowaad. Capture-ku wuxuu bilaabmaa isla markiiba marka la doorto interface-ka — waa muhiim in la xasuusto in la joojiyo capture-ka marka loo baahdo (Stop button)."
          },
          {
            h: "Color Coding in Wireshark",
            p:
            "Wireshark wuxuu si otomaatig ah u midab-koodeeyaa packets (green = TCP, light blue = UDP, black = errors) — coloring rules-kan waxay dedejinayaan aqoonsiga traffic types kala duwan iyada oo aan la akhriyin qoraal kasta."
          }
        ],

        terms: [
          { term: "Packet Capture", def: "Ururinta traffic-ka network-ka heer packet ah." },
          { term: "Packet Details Pane", def: "Panel muujiya faahfaahin layer kasta oo packet-ka ah." }
        ],

        quiz: [
          {
            q: "Wireshark waa?",
            options: [
              "Network protocol analyzer bilaash ah",
              "Firewall hardware",
              "Antivirus software",
              "Password manager"
            ],
            answer: 0,
            explain: "Wireshark waa tool-ka ugu caansan packet analysis-ka."
          },
          {
            q: "Packet List panel-ku wuxuu muujiyaa?",
            options: [
              "Liis packets ah, hal sadar hal packet",
              "Kaliya hal packet oo faahfaahsan",
              "Kaliya settings-ka",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "Packet List-ku waa overview-ga guud ee capture-ka."
          },
          {
            q: "Color coding-ka Wireshark (green=TCP) wuxuu caawiyaa?",
            options: [
              "Aqoonsiga degdegga ah ee traffic types kala duwan",
              "Kordhinta speed-ka capture-ka",
              "Ma jiro faa'iido",
              "Encrypt gareynta traffic-ka"
            ],
            answer: 0,
            explain: "Visual cues waxay dedejinayaan falanqaynta."
          },
          {
            q: "Ka hor la bilaabo capture, waa in la xushaa?",
            options: [
              "Interface-ka saxda ah (Ethernet/WiFi)",
              "Kaliya filter-ka",
              "Ma jiro tallaabo hore",
              "Kaliya destination IP-ga"
            ],
            answer: 0,
            explain: "Interface-ka qaldan wuxuu keeni karaa in aan traffic-ka la qabanin."
          }
        ],

        exercise: {
          title: "Wireshark Setup & First Capture",
          steps: [
            "Rakib Wireshark (haddii aan horay loo rakibin).",
            "Xulo interface-kaaga network-ka, bilaab capture asaasi ah.",
            "Booqo website hal ah, kadib joojinta capture-ka.",
            "Aqoonso 5 packets kala duwan oo colors kala duwan leh, sharax macnahooda."
          ],
          deliverable: "First capture screenshot + color coding notes."
        }
      },


      {
        slug: "capture-filters-vs-display-filters",
        title: "Capture Filters vs Display Filters",
        english: "Capture Filters vs Display Filters",
        minutes: 14,

        summary:
          "Faham farqiga muhiimka ah ee u dhexeeya capture filters iyo display filters.",

        sections: [
          {
            h: "Capture Filters",
            p:
            "Capture filters waxay xaddidaan waxa la qabanayo intii capture-ku socdo (tusaale: host 192.168.1.1). Syntax-kani wuxuu ku dhisan yahay BPF (Berkeley Packet Filter) — mid ka duwan display filter syntax."
          },
          {
            h: "Display Filters",
            p:
            "Display filters waxay xaddidaan waxa la arki karo capture-ga la qabtay kadib (tusaale: http.request.method==\"POST\"). Kuwan waa kuwa ugu badan la isticmaalo, sababtoo ah waxaad qabataa wax kasta oo aad dib ugu soo noqoto."
          },
          {
            h: "Common Display Filter Syntax",
            p:
            "ip.addr==X.X.X.X (IP gaar ah), tcp.port==80 (port gaar ah), http (HTTP traffic oo keliya), dns (DNS queries oo keliya), tcp.flags.syn==1 (SYN packets). AND/OR/NOT waxaa lagu isku dari karaa filters badan."
          },
          {
            h: "Sababta Capture Filters Loo Isticmaalo",
            p:
            "Capture filters waxay muhiim u yihiin marka storage-ku xaddidan yahay ama traffic-ku aad u badan yahay — waxay yareeyaan cabbirka file-ka la qabtay, laakiin waxay khatar gelin karaan in la seego traffic-ka aan la filaynin."
          }
        ],

        terms: [
          { term: "BPF", def: "Berkeley Packet Filter — syntax-ka capture filters-ka." },
          { term: "Display Filter", def: "Filter xaddida waxa la arki karo capture-ga kadib." }
        ],

        quiz: [
          {
            q: "Capture filters waxay xaddidaan?",
            options: [
              "Waxa la qabanayo intii capture-ku socdo",
              "Waxa la arki karo kadib",
              "Ma jiro farqi",
              "Kaliya display-ga"
            ],
            answer: 0,
            explain: "Capture filters-ku waxay ka shaqeeyaan waqtiga qabashada."
          },
          {
            q: "http.request.method==\"POST\" waa tusaale?",
            options: [
              "Display filter",
              "Capture filter",
              "Labadaba",
              "Ma jiro nooc"
            ],
            answer: 0,
            explain: "Display filters waxay isticmaalaan syntax field.subfield==value."
          },
          {
            q: "Sababta capture filters loo isticmaalo waa?",
            options: [
              "Storage xaddidan ama traffic aad u badan",
              "Waligeed waa waajib",
              "Ma jiro sabab",
              "Kaliya loo isticmaalo testing"
            ],
            answer: 0,
            explain: "Waxay yareeyaan cabbirka data-ga la qabtay."
          },
          {
            q: "Display filters-ku waa kuwa ugu badan la isticmaalo sababtoo ah?",
            options: [
              "Waxaad qabataa wax kasta, dib ugu soo noqotaa marka loo baahdo",
              "Waa kuwa kaliya jira",
              "Ma jiro sabab",
              "Waa waajib"
            ],
            answer: 0,
            explain: "Flexibility-gu wuxuu u ogolaadaa in la eego dhinacyo kala duwan post-capture."
          }
        ],

        exercise: {
          title: "Filter Syntax Practice",
          steps: [
            "Qor capture filter host IP gaar ah.",
            "Qor 3 display filters (IP, port, protocol).",
            "Isku day filter isugu jira AND (tusaale ip.addr + tcp.port).",
            "Sharax marka aad isticmaali lahayd capture filter halkii display filter."
          ],
          deliverable: "Filter syntax cheat sheet."
        }
      },


      {
        slug: "protocol-analysis-tcp-udp",
        title: "Protocol Analysis: TCP & UDP",
        english: "Protocol Analysis: TCP and UDP",
        minutes: 15,

        summary:
          "Sii qoto dheeree falanqaynta TCP three-way handshake iyo UDP traffic Wireshark gudaheeda.",

        sections: [
          {
            h: "TCP Three-Way Handshake in Wireshark",
            p:
            "SYN (client → server), SYN-ACK (server → client), ACK (client → server) — Wireshark wuxuu si cad u muujiyaa saddexdan packet isku xigxiga. Filter: tcp.flags.syn==1 wuxuu kuu tusi karaa bilowyada connections cusub."
          },
          {
            h: "TCP Flags & Connection States",
            p:
            "FIN (xiritaan caadi ah), RST (xiritaan lama filaan ah), PSH (data la diray isla markiiba), URG (data degdeg ah) — flags-kan waxay bixiyaan macluumaad muhiim ah oo connection state ah."
          },
          {
            h: "UDP Traffic Characteristics",
            p:
            "UDP (connectionless) ma laha handshake sida TCP. DNS, DHCP, iyo streaming media badanaa waxay isticmaalaan UDP. Filter 'udp' wuxuu kuu tusi karaa dhammaan UDP traffic-ka."
          },
          {
            h: "Retransmissions & TCP Analysis Flags",
            p:
            "Wireshark wuxuu si otomaatig ah u calaamadeeyaa 'TCP Retransmission' (packet dib loo diray, laga yaabo packet loss), 'Duplicate ACK', iyo 'Out-of-Order' — kuwaan waa signs network issues ah."
          }
        ],

        terms: [
          { term: "Three-Way Handshake", def: "SYN, SYN-ACK, ACK — bilowga TCP connection." },
          { term: "TCP Retransmission", def: "Packet dib loo diray, calaamad packet loss ah." }
        ],

        quiz: [
          {
            q: "Three-way handshake-ka tartiibkiisu waa?",
            options: ["SYN, SYN-ACK, ACK", "ACK, SYN, SYN-ACK", "SYN-ACK, SYN, ACK", "Ma jiro tartiib"],
            answer: 0,
            explain: "Kani waa tartiibka standard-ka ah ee TCP connection bilowga."
          },
          {
            q: "RST flag-ku wuxuu muujiyaa?",
            options: [
              "Xiritaan lama filaan ah",
              "Xiritaan caadi ah",
              "Bilow connection",
              "Data urgent ah"
            ],
            answer: 0,
            explain: "RST wuxuu joojiyaa connection si degdeg ah, ma aha graceful."
          },
          {
            q: "UDP ka duwan tahay TCP sababtoo ah?",
            options: [
              "Waa connectionless, ma laha handshake",
              "Waa ka sii amaan badan",
              "Ma jiro farqi",
              "UDP waa TCP kale"
            ],
            answer: 0,
            explain: "UDP-ku ma xaqiijiyo delivery, wuu ka fudud yahay TCP."
          },
          {
            q: "TCP Retransmission calaamad Wireshark ah waxay muujisaa?",
            options: [
              "Packet loss suurtagal ah",
              "Connection caadi ah",
              "Encryption",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "Wireshark wuxuu si otomaatig ah u ogaadaa issues-kan."
          }
        ],

        exercise: {
          title: "TCP/UDP Analysis Practice",
          steps: [
            "Filter tcp.flags.syn==1, aqoonso connections cusub capture-gaaga.",
            "Raadi packet leh RST flag, sharax sababta suurtagalka ah.",
            "Filter 'udp', liis garee 3 protocols UDP isticmaala.",
            "Raadi (haddii jira) TCP Retransmission packet, sharax macnaheeda."
          ],
          deliverable: "TCP/UDP protocol analysis notes."
        }
      },


      {
        slug: "http-https-traffic-analysis",
        title: "HTTP/HTTPS Traffic Analysis",
        english: "HTTP/HTTPS Traffic Analysis",
        minutes: 14,

        summary:
          "Faham sida HTTP traffic loo falanqeeyo Wireshark, iyo xaddidaadaha HTTPS.",

        sections: [
          {
            h: "HTTP Request/Response in Wireshark",
            p:
            "Filter 'http' wuxuu kuu tusi karaa dhammaan HTTP traffic. Packet Details-ka, waxaad arki kartaa method (GET/POST), headers, iyo (haddii aan encrypted ahayn) response body-ga oo dhan — plain text ahaan."
          },
          {
            h: "Extracting Credentials from HTTP (Educational)",
            p:
            "Marka HTTP la isticmaalo (ma aha HTTPS) login forms, credentials waxay u socdaan plain text ahaan — tani waa sababta HTTPS uu u yahay muhiim, oo Wireshark wuxuu si toos ah u muujin karaa ujeeddadan (educational lab environments oo keliya)."
          },
          {
            h: "HTTPS Limitations",
            p:
            "HTTPS/TLS wuxuu encrypt gareeyaa payload-ka — Wireshark ma arki karo content-ka gudaha (URLs, form data). Waxaad arki kartaa metadata (SNI — Server Name Indication, certificate details) oo keliya."
          },
          {
            h: "Decrypting TLS (Advanced, Lab-Only)",
            p:
            "Haddii aad haysato SSLKEYLOGFILE (environment variable browser-ku soo saaro), Wireshark wuxuu u isticmaali karaa inuu decrypt gareeyo TLS traffic lab environment go'doonsan gudihiisa — kani waa technique advanced ah oo aan la isticmaalin production traffic."
          }
        ],

        terms: [
          { term: "SSLKEYLOGFILE", def: "Environment variable bixisa TLS session keys, loo isticmaalo decryption lab-ka." },
          { term: "SNI", def: "Server Name Indication — domain muuqda TLS handshake, xitaa encrypted." }
        ],

        quiz: [
          {
            q: "HTTP (ma aha HTTPS) credentials waxay u socdaan?",
            options: [
              "Plain text ahaan, la arki karo Wireshark",
              "Encrypted marwalba",
              "Ma jiro macluumaad la heli karo",
              "Base64 oo keliya"
            ],
            answer: 0,
            explain: "Kani waa sababta HTTPS loo isticmaalo — HTTP-ku wax kama qariyo."
          },
          {
            q: "HTTPS traffic Wireshark ahaan wuxuu muujiyaa?",
            options: [
              "Metadata oo keliya (SNI, certificate), ma aha content buuxa",
              "Content buuxa sida HTTP",
              "Wax kasta oo la arki karo",
              "Ma jiro macluumaad la heli karo gebi ahaanba"
            ],
            answer: 0,
            explain: "Encryption-ku wuxuu qariyaa payload-ka, metadata-ku wuu jiraa."
          },
          {
            q: "SSLKEYLOGFILE waxaa loo isticmaalaa?",
            options: [
              "Decrypt gareynta TLS traffic lab environment gudaheeda",
              "Kordhinta speed-ka network-ka",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Kani waa technique advanced ah oo lab-ka gudihiisa oo keliya la isticmaalo."
          }
        ],

        exercise: {
          title: "HTTP/HTTPS Analysis Practice",
          steps: [
            "Filter 'http' capture-gaaga, eeg method/headers packet-yada.",
            "Xulo packet HTTP ah, aqoonso response status code-ka.",
            "Filter 'tls' ama 'ssl', sharax waxa aad arki karto marka la barbardhigo HTTP.",
            "Sharax sababta HTTPS ay muhiim u tahay marka la barbardhigo waxa aad HTTP ka aragtay."
          ],
          deliverable: "HTTP/HTTPS traffic analysis notes."
        }
      },


      {
        slug: "dns-analysis-wireshark",
        title: "DNS Analysis in Wireshark",
        english: "DNS Analysis in Wireshark",
        minutes: 12,

        summary:
          "Faham sida DNS queries/responses loo falanqeeyo Wireshark gudaheeda.",

        sections: [
          {
            h: "DNS Query & Response Structure",
            p:
            "Filter 'dns' wuxuu kuu tusi karaa dhammaan DNS traffic. Query packet-ku wuxuu ku jiraa domain la weydiiyay; response packet-ku wuxuu ku jiraa IP address-ka (A record) ama macluumaad kale (MX, TXT, CNAME)."
          },
          {
            h: "Identifying Suspicious DNS Activity",
            p:
            "Domains random-looking ah (DGA-style), qadar badan oo NXDOMAIN responses ah, ama TXT queries badan oo isku dhow waqti ahaan waa calaamado shaki leh oo lagu ogaan karo Wireshark filters."
          },
          {
            h: "DNS over HTTPS (DoH) Visibility Gap",
            p:
            "Modern browsers waxay isticmaali karaan DoH (DNS encrypted HTTPS gudaheeda) — kani wuxuu qariyaa DNS queries Wireshark filter 'dns' caadiga ah, sababtoo ah traffic-ku wuxuu u muuqdaa HTTPS oo keliya."
          },
          {
            h: "Filtering DNS by Response Type",
            p:
            "dns.flags.response==1 (responses oo keliya), dns.qry.type==1 (A records oo keliya), dns.flags.rcode==3 (NXDOMAIN responses) waa filters muhiim ah oo DNS-specific ah."
          }
        ],

        terms: [
          { term: "NXDOMAIN", def: "DNS response muujinaya domain aan jirin." },
          { term: "DoH", def: "DNS over HTTPS — DNS encrypted, qarinaya queries Wireshark ka." }
        ],

        quiz: [
          {
            q: "DoH (DNS over HTTPS) wuxuu qariyaa?",
            options: [
              "DNS queries Wireshark filter 'dns' caadiga ah",
              "Wax kasta oo network-ka ah",
              "Ma jiro saameyn",
              "Kaliya HTTP traffic"
            ],
            answer: 0,
            explain: "DoH-traffic wuxuu u muuqdaa HTTPS oo keliya, ma aha DNS."
          },
          {
            q: "dns.flags.rcode==3 filter-ku wuxuu muujiyaa?",
            options: [
              "NXDOMAIN responses",
              "A records oo keliya",
              "Queries oo keliya",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "rcode 3 waa code-ka NXDOMAIN."
          },
          {
            q: "Domains random-looking ah waxay tilmaamayaan?",
            options: [
              "DGA-based malware suurtagal ah",
              "Caadi ahaan",
              "Backup DNS",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "DGA malware wuxuu isticmaalaa domains random ah C2 ahaan."
          }
        ],

        exercise: {
          title: "DNS Analysis Practice",
          steps: [
            "Filter 'dns', eeg queries/responses capture-gaaga.",
            "Sharax sida NXDOMAIN loo ogaan karo filter ahaan.",
            "Sharax sababta DoH uu u yahay caqabad Wireshark analysis ah.",
            "Qor 2 filters DNS-specific ah oo aad isticmaali lahayd."
          ],
          deliverable: "DNS analysis reference notes."
        }
      },


      {
        slug: "following-streams-extracting-files",
        title: "Following Streams & Extracting Files",
        english: "Following Streams and Extracting Files",
        minutes: 13,

        summary:
          "Faham sida Follow Stream iyo Export Objects loo isticmaalo forensic/investigation ahaan.",

        sections: [
          {
            h: "Follow TCP Stream",
            p:
            "Right-click packet → Follow → TCP Stream wuxuu isku daraa dhammaan packets isla conversation-ka, kuna muujiyaa xogta sida qof uu la akhrin lahaa — muhiim marka la eegayo HTTP requests/responses ama chat protocols."
          },
          {
            h: "Follow HTTP Stream",
            p:
            "Follow HTTP Stream wuxuu si gaar ah u organize gareeyaa HTTP conversation-ka (request iyo response kala saaran) — mid ka fudud in la akhriyo marka la barbardhigo raw TCP stream."
          },
          {
            h: "Export Objects",
            p:
            "File > Export Objects > HTTP wuxuu u oggolaadaa in la soo saaro files (images, documents, executables) oo ka soo baxay HTTP traffic — muhiim marka la baarayo malware downloads."
          },
          {
            h: "Investigation Use Cases",
            p:
            "Follow Stream + Export Objects waxay isugu jiraan marka la baarayo: phishing link click (soo saarista landing page HTML), malware download (soo saarista file-ka executable), ama data exfiltration (soo saarista files-ka la upload gareeyay)."
          }
        ],

        terms: [
          { term: "Follow Stream", def: "Isku darista conversation packets si loo akhriyo sida qof kale." },
          { term: "Export Objects", def: "Soo saarista files traffic-ka gudihiisa." }
        ],

        quiz: [
          {
            q: "Follow TCP Stream wuxuu sameeyaa?",
            options: [
              "Isku daraa conversation packets si loo akhriyo",
              "Tirtiraa packets",
              "Encrypt gareeyaa traffic",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Wuxuu ka dhigaa akhriska conversation mid fudud."
          },
          {
            q: "Export Objects waxaa loo isticmaalaa?",
            options: [
              "Soo saarista files ka soo baxay HTTP traffic",
              "Xiritaanka capture-ka",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Files-ka malware downloads ah waxaa lagu soo saari karaa."
          },
          {
            q: "Follow HTTP Stream ka duwan yahay TCP Stream sababtoo ah?",
            options: [
              "Wuxuu si gaar ah u organize gareeyaa HTTP conversation-ka",
              "Isku mid",
              "Ma jiro farqi",
              "HTTP Stream waa mid ka daciifsan"
            ],
            answer: 0,
            explain: "HTTP-specific parsing-ku wuxuu ka dhigayaa akhriska mid ka fudud."
          }
        ],

        exercise: {
          title: "Stream Following & Extraction Practice",
          steps: [
            "Xulo TCP packet HTTP ah, isticmaal Follow TCP Stream.",
            "Barbardhig Follow HTTP Stream isla conversation-ka.",
            "Sharax sida Export Objects loo isticmaali lahaa malware download case.",
            "Naqshadee scenario ah oo Follow Stream + Export Objects isku daraya."
          ],
          deliverable: "Stream following and extraction practice notes."
        }
      },


      {
        slug: "wireshark-statistics-io-graphs",
        title: "Statistics & IO Graphs",
        english: "Statistics and IO Graphs",
        minutes: 12,

        summary:
          "Faham sida Statistics menu-ga loo isticmaalo baseline iyo anomaly analysis ahaan.",

        sections: [
          {
            h: "Protocol Hierarchy",
            p:
            "Statistics > Protocol Hierarchy wuxuu bixiyaa breakdown percentage-based ah oo protocols-ka capture-ka ka jira — degdeg ahaan waxaad ka helaysaa muuqaal guud (tusaale: 80% HTTP, 15% DNS, 5% kale)."
          },
          {
            h: "Conversations",
            p:
            "Statistics > Conversations wuxuu liis gareeyaa dhammaan IP pairs iyo bytes/packets u dhaxeeya — 'sort by bytes' wuxuu kuu tusi karaa 'top talkers' (connections-ka ugu badan data-ha)."
          },
          {
            h: "IO Graphs",
            p:
            "Statistics > IO Graph wuxuu muujiyaa traffic volume waqti ahaan (visual graph) — spikes lama filaan ah waxay tilmaamayaan anomalies (tusaale exfiltration ama DDoS)."
          },
          {
            h: "Endpoints",
            p:
            "Statistics > Endpoints wuxuu liis gareeyaa dhammaan IP addresses/MAC addresses ka jira capture-ka, oo ay ku jiraan bytes sent/received — muhiim marka la aqoonsanayo hosts kala duwan network-ka."
          }
        ],

        terms: [
          { term: "Protocol Hierarchy", def: "Breakdown percentage-based ah oo protocols capture-ka." },
          { term: "Top Talkers", def: "Connections-ka ugu badan data-ha ka dhexeeya." }
        ],

        quiz: [
          {
            q: "Protocol Hierarchy wuxuu bixiyaa?",
            options: [
              "Breakdown percentage-based ah oo protocols-ka",
              "Kaliya IP addresses",
              "Kaliya ports",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Muuqaal degdeg ah oo guud ah capture-ka wuxuu bixiyaa."
          },
          {
            q: "IO Graphs waxay muujiyaan?",
            options: [
              "Traffic volume waqti ahaan (visual)",
              "Kaliya protocol names",
              "Ma jiro faa'iido",
              "Kaliya passwords"
            ],
            answer: 0,
            explain: "Spikes-ka waxay tilmaamayaan anomalies suurtagal ah."
          },
          {
            q: "Conversations statistics-ku wuxuu kaa caawiyaa aqoonsiga?",
            options: [
              "Top talkers (connections-ka ugu badan data)",
              "Kaliya protocol types",
              "Ma jiro faa'iido",
              "Kaliya encryption status"
            ],
            answer: 0,
            explain: "Sort by bytes wuxuu muujiyaa connections-ka ugu weyn."
          }
        ],

        exercise: {
          title: "Statistics & Baseline Analysis",
          steps: [
            "Eeg Protocol Hierarchy capture-gaaga, sharax breakdown-ka.",
            "Eeg Conversations, aqoonso top talker.",
            "Eeg IO Graph, sharax haddii spikes ay jiraan.",
            "Eeg Endpoints, liis garee 3 hosts la aqoonsaday."
          ],
          deliverable: "Statistics and baseline analysis notes."
        }
      },


      {
        slug: "wireshark-capstone-full-investigation",
        title: "Wireshark Capstone: Full Investigation",
        english: "Wireshark Capstone: Full Investigation",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay — samee full network investigation Wireshark oo dhamaystiran.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad haysataa PCAP file oo laga soo qaaday workstation shaki leh. Waa in aad falanqeyso traffic-ka oo dhan si aad u aqoonsato haddii compromise dhacay."
          },
          {
            h: "Systematic Approach",
            p:
            "1) Protocol Hierarchy (muuqaal guud). 2) Conversations (top talkers). 3) DNS filter (domains shaki leh). 4) HTTP filter (downloads/uploads). 5) Follow Stream findings xiisaha leh."
          },
          {
            h: "Building the Timeline",
            p:
            "Isku dar findings-ka (DNS queries, HTTP downloads, unusual connections) timeline dhamaystiran oo muujinaya dhacdada laga bilaabo bilowga ilaa dhamaadka."
          },
          {
            h: "Documentation",
            p:
            "Export Objects files xiisaha leh, qaado screenshots filters muhiimka ah, oo isku dar warbixin sharaxaysa findings-ka iyo IOCs (IPs, domains, files)."
          }
        ],

        terms: [
          { term: "Full PCAP Investigation", def: "Falanqayn isugu jirta statistics, filters, iyo stream following." }
        ],

        quiz: [
          {
            q: "Investigation-ka tallaabada koowaad waa?",
            options: [
              "Protocol Hierarchy — muuqaal guud",
              "Isla markiiba Export Objects",
              "Warbixinta",
              "Xiritaanka Wireshark"
            ],
            answer: 0,
            explain: "Muuqaal guud ayaa hagaya baaritaanka faahfaahsan."
          },
          {
            q: "Timeline-ku wuxuu isku daraa?",
            options: [
              "DNS queries, HTTP downloads, unusual connections",
              "Kaliya hal data source",
              "Ma jiro isku darid loo baahan yahay",
              "Kaliya passwords"
            ],
            answer: 0,
            explain: "Isku darka findings-ka wuxuu dhisaa muuqaal buuxa."
          },
          {
            q: "Export Objects capstone-kan waxaa loo isticmaali karaa?",
            options: [
              "Soo saarista files xiisaha leh (documents, executables) evidence ahaan",
              "Kaliya statistics eegista",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Files-ka la soo saaray waa evidence taageera warbixinta."
          },
        ],

        exercise: {
          title: "Full Wireshark Investigation",
          steps: [
            "Naqshadee approach-ka (Protocol Hierarchy → Conversations → DNS → HTTP → Follow Stream).",
            "Aqoonso findings-ka xiisaha leh (domains, downloads, connections).",
            "Dhis timeline dhamaystiran.",
            "Diyaari warbixin buuxda oo IOCs leh (portfolio-ready)."
          ],
          deliverable: "Full Wireshark investigation report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "td-nmap",
    slug: "nmap-mastery",
    stage: "Dhexe",
    title: "Nmap Mastery",
    english: "Nmap Mastery",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa Nmap heer sare ah — scanning techniques, NSE scripting, performance tuning, iyo evasion advanced ah.",

    topics: [
      "Nmap Installation & Basic Syntax",
      "Host Discovery Techniques",
      "Port Scanning Deep Dive",
      "Service, Version & OS Fingerprinting",
      "Nmap Scripting Engine Mastery",
      "Timing & Performance Optimization",
      "Firewall & IDS Evasion",
      "Nmap Mastery Capstone",
    ],

    lessonList: [

      {
        slug: "nmap-installation-basic-syntax",
        title: "Nmap Installation & Basic Syntax",
        english: "Nmap Installation and Basic Syntax",
        minutes: 12,

        summary:
          "Faham sida Nmap loo rakibo, iyo syntax-ka aasaasiga ah ee amarrada.",

        sections: [
          {
            h: "Installing Nmap",
            p:
            "Nmap wuxuu si horay ugu rakiban yahay Kali Linux. Distributions kale (Ubuntu, macOS, Windows) waxay u baahan yihiin install manual ah (apt install nmap, brew install nmap, ama installer Windows ah)."
          },
          {
            h: "Basic Command Structure",
            p:
            "nmap [scan type] [options] [target] — tusaale: nmap -sS -p 80,443 192.168.1.1. Targets waxay noqon karaan single IP, hostname, range (192.168.1.1-50), ama CIDR (192.168.1.0/24)."
          },
          {
            h: "Target Specification Options",
            p:
            "-iL file.txt (akhri targets file gudaha), --exclude IP (ka reeb IP gaar ah), -iR N (random targets N tiro ah — kaliya loo isticmaalo research authorized ah)."
          },
          {
            h: "Getting Help",
            p:
            "nmap -h wuxuu bixiyaa summary degdeg ah. man nmap wuxuu bixiyaa documentation dhamaystiran. Nmap version-ku waa muhiim in la hubiyo (nmap --version) sababtoo ah features cusub waxay ku dhacaan versions cusub."
          }
        ],

        terms: [
          { term: "CIDR Notation", def: "Qaab lagu qeexo subnet oo dhan (tusaale /24)." },
          { term: "Target Specification", def: "Habka la qeexo host(s) la scan-gareynayo." }
        ],

        quiz: [
          {
            q: "Nmap command structure-ku waa?",
            options: [
              "nmap [scan type] [options] [target]",
              "nmap [target] [scan type]",
              "Ma jiro structure gaar ah",
              "nmap [options] oo keliya"
            ],
            answer: 0,
            explain: "Tartiibkan waa standard-ka Nmap syntax."
          },
          {
            q: "-iL flag-ku wuxuu sameeyaa?",
            options: [
              "Akhriyaa targets file gudaha",
              "Ka reebaa IP gaar ah",
              "Random targets",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "-iL waa 'input list' — targets badan file gudaha ku jira."
          },
          {
            q: "CIDR /24 wuxuu qeexayaa?",
            options: [
              "Subnet 256 addresses ah",
              "Hal IP address",
              "Ma jiro macno",
              "10 addresses"
            ],
            answer: 0,
            explain: "/24 waa subnet mask standard-ka ah oo 256 addresses leh."
          }
        ],

        exercise: {
          title: "Nmap Setup & Syntax Practice",
          steps: [
            "Xaqiiji Nmap version-kaaga (nmap --version).",
            "Qor tusaale command ah oo scan gareeya single IP.",
            "Qor tusaale command ah oo scan gareeya CIDR range.",
            "Sharax farqiga -iL iyo -iR."
          ],
          deliverable: "Nmap syntax reference sheet."
        }
      },


      {
        slug: "host-discovery-techniques",
        title: "Host Discovery Techniques",
        english: "Host Discovery Techniques",
        minutes: 13,

        summary:
          "Sii qoto dheeree habab kala duwan oo host discovery ah — ka baxsan ping caadiga ah.",

        sections: [
          {
            h: "ICMP Echo (Ping) Discovery",
            p:
            "Nmap default-ka ahaan wuxuu isku dayaa ICMP echo (ping) si loo ogaado host-yada nool ka hor scanning-ka la bilaabo. -sn wuxuu sameeyaa 'ping scan' oo keliya, aan port scanning lahayn."
          },
          {
            h: "TCP SYN/ACK Discovery",
            p:
            "Firewalls badan waxay block-gareeyaan ICMP. -PS (TCP SYN ping) iyo -PA (TCP ACK ping) waxay isticmaalaan TCP packets si loo ogaado host-yada, xitaa marka ICMP la block-gareeyay."
          },
          {
            h: "UDP & ARP Discovery",
            p:
            "-PU (UDP ping) wuxuu ku habboon yahay hosts leh UDP services furan. -PR (ARP ping) waa habka ugu sax badan local network gudaheeda, sababtoo ah ARP kuma xirna firewalls IP-level ah."
          },
          {
            h: "Skipping Host Discovery (-Pn)",
            p:
            "-Pn wuxuu ka boodaa host discovery gebi ahaanba, isaga oo u malaynaya dhammaan targets inay nool yihiin — muhiim marka aad hore u ogtahay host-ku inuu jiro, laakiin uu block-gareynayo dhammaan discovery methods."
          }
        ],

        terms: [
          { term: "-sn", def: "Ping scan oo keliya, aan port scanning lahayn." },
          { term: "-Pn", def: "Ka boodo host discovery, u maley dhammaan targets nool." }
        ],

        quiz: [
          {
            q: "-sn flag-ku wuxuu sameeyaa?",
            options: [
              "Ping scan oo keliya, aan port scanning",
              "Full port scan",
              "OS detection",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "-sn waa host discovery oo keliya."
          },
          {
            q: "-PR (ARP ping) waa habka ugu sax badan sababtoo ah?",
            options: [
              "Local network gudaheeda, ma xirna firewalls IP-level ah",
              "Wuxuu ka dhaqso badan yahay dhammaan",
              "Ma jiro sabab",
              "Kaliya loo isticmaalo remote networks"
            ],
            answer: 0,
            explain: "ARP-ku wuxuu ka shaqeeyaa layer 2, firewalls IP-level ah kuma xirna."
          },
          {
            q: "-Pn waxaa loo isticmaalaa marka?",
            options: [
              "Hore loo ogyahay host-ku inuu jiro, laakiin discovery la block-gareeyay",
              "Marwalba waa waajib",
              "Ma jiro isticmaal",
              "Kaliya UDP scans"
            ],
            answer: 0,
            explain: "-Pn wuxuu ka boodaa marka discovery aan la aamini karin."
          }
        ],

        exercise: {
          title: "Host Discovery Practice",
          steps: [
            "Sharax farqiga -PS iyo -PA.",
            "Sharax sababta -PR ugu sax badan tahay local network.",
            "Qor tusaale scenario ah oo -Pn loo isticmaali lahaa.",
            "Naqshadee host discovery strategy subnet 192.168.1.0/24 ah."
          ],
          deliverable: "Host discovery techniques reference."
        }
      },


      {
        slug: "port-scanning-deep-dive",
        title: "Port Scanning Deep Dive",
        english: "Port Scanning Deep Dive",
        minutes: 15,

        summary:
          "Sii qoto dheeree scan types-ka Nmap oo dhan — SYN, Connect, UDP, iyo kuwa aan caadiga ahayn.",

        sections: [
          {
            h: "SYN Scan (-sS) — Deep Dive",
            p:
            "SYN scan waa default-ka Nmap marka la haysto root/admin privileges. Wuxuu dhisaa half-open connections — ka dhaqso badan TCP Connect, ka tagaya logs ka yar sababtoo ah connection-ku marnaba ma dhammaystirmo."
          },
          {
            h: "TCP Connect Scan (-sT) — When to Use",
            p:
            "Marka aan la haysan raw socket privileges (non-root user), -sT waa mid keliya la isticmaali karo. Wuxuu dhammaystiraa three-way handshake buuxa, taasoo ka tagaysa logs badan applications-ka."
          },
          {
            h: "UDP Scan (-sU) Optimization",
            p:
            "UDP scans way ka gaabis badan yihiin TCP (timeout-yo dheer). Isticmaal --top-ports si loo xaddido ports-ka la scan-gareynayo, ma aha dhammaan 65535 — waxay dedejinayaan scan-ka si aad u macquul ah."
          },
          {
            h: "NULL, FIN & Xmas Scans (Advanced)",
            p:
            "-sN (NULL), -sF (FIN), -sX (Xmas) waxay isticmaalaan RFC behavior si ay uga gudbaan firewalls fudud — closed ports waxay ku jawaabaan RST, open/filtered waxay iska indho tiraan. Kuwan uma shaqeeyaan Windows targets (RFC-compliance ka duwan)."
          }
        ],

        terms: [
          { term: "Half-Open Connection", def: "Connection aan la dhammaystirin, SYN scan isticmaasho." },
          { term: "--top-ports", def: "Xaddidaad UDP/TCP scan ports-ka ugu badan la isticmaalo." }
        ],

        quiz: [
          {
            q: "SYN scan (-sS) ka tagaa logs ka yar sababtoo ah?",
            options: [
              "Connection-ku marnaba ma dhammaystirmo",
              "Waa mid ka gaabis TCP Connect",
              "Ma jiro sabab",
              "Waa encrypted"
            ],
            answer: 0,
            explain: "Half-open connection-ku ma keeno application-level logging."
          },
          {
            q: "--top-ports flag-ku wuxuu dedejiyaa UDP scans sababtoo ah?",
            options: [
              "Wuxuu xaddidaa ports-ka la scan-gareynayo, ma aha dhammaan 65535",
              "Wuxuu kordhinayaa timeout-ka",
              "Ma jiro faa'iido",
              "Wuxuu kaliya loo isticmaalo TCP"
            ],
            answer: 0,
            explain: "Xaddidaad ports-ku wuxuu badanaa yareeyaa waqtiga la qaato."
          },
          {
            q: "NULL/FIN/Xmas scans uma shaqeeyaan Windows sababtoo ah?",
            options: [
              "RFC-compliance-ka Windows-ku wuu ka duwan yahay",
              "Windows kuma leh ports",
              "Ma jiro sabab",
              "Waa mid la joojiyay"
            ],
            answer: 0,
            explain: "Windows-ku uma jawaabo si la mid ah RFC behavior-ka standard-ka ah."
          }
        ],

        exercise: {
          title: "Port Scan Type Selection",
          steps: [
            "Sharax marka SYN scan loo doorto TCP Connect.",
            "Naqshadee UDP scan command ah oo --top-ports isticmaala.",
            "Sharax sababta NULL/FIN/Xmas aysan Windows u shaqeynayn.",
            "Xulo 3 scenarios, mid kasta u dooro scan type ugu habboon."
          ],
          deliverable: "Port scan type selection guide."
        }
      },


      {
        slug: "service-version-os-fingerprinting-deep",
        title: "Service, Version & OS Fingerprinting",
        english: "Service, Version and OS Fingerprinting",
        minutes: 14,

        summary:
          "Sii qoto dheeree version detection intensity iyo OS fingerprinting accuracy.",

        sections: [
          {
            h: "Version Detection Intensity",
            p:
            "--version-intensity [0-9] wuxuu xakameeyaa qoto dheeraanta version detection-ka — 0 (degdeg, probes yar), 9 (dhammaystiran, probes badan, gaabis). Default-ku waa 7, balance u dhexeeya speed iyo accuracy."
          },
          {
            h: "OS Fingerprinting Accuracy",
            p:
            "-O wuxuu isticmaalaa TCP/IP stack fingerprinting (habka OS-ku ugu jawaabo packets kala duwan). Accuracy-gu wuxuu ku xiran yahay in ugu yaraan hal open iyo hal closed port la helay — --osscan-guess wuxuu bixiyaa qiyaasyo xitaa marka aan la hubin 100%."
          },
          {
            h: "Aggressive Scan (-A) Components",
            p:
            "-A wuxuu isku daraa -O (OS detection) + -sV (version detection) + -sC (default scripts) + --traceroute — dhammaan hal command ah, laakiin waa mid 'loud' oo si fudud loo ogaan karo."
          },
          {
            h: "Version Detection Against Non-Standard Ports",
            p:
            "Service-yada ku socda ports non-standard ah (tusaale HTTP port 8080 halkii 80) way ka adkaan karaan version detection heuristic-based caadiga ah — -sV wuxuu weli isku dayaa inuu probe gareeyo, ma aha in kaliya la eego port number-ka."
          }
        ],

        terms: [
          { term: "Version Intensity", def: "Xakamaynta qoto dheeraanta version detection probes." },
          { term: "--osscan-guess", def: "Bixinta qiyaasyo OS ah xitaa marka aan la hubin 100%." }
        ],

        quiz: [
          {
            q: "--version-intensity 9 marka la barbardhigo 0 waa?",
            options: [
              "Dhammaystiran, probes badan, gaabis",
              "Degdeg, probes yar",
              "Isku mid",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Intensity sare wuxuu bixiyaa accuracy sare, laakiin waqti dheer qaata."
          },
          {
            q: "OS fingerprinting accuracy-gu wuxuu ku xiran yahay?",
            options: [
              "Hal open iyo hal closed port oo la helay",
              "Kaliya open ports",
              "Ma jiro shuruud",
              "Kaliya UDP ports"
            ],
            answer: 0,
            explain: "Xaqiijin buuxa wuxuu u baahan yahay labada nooc ee ports."
          },
          {
            q: "-A flag-ku wuxuu isku daraa?",
            options: [
              "-O, -sV, -sC, --traceroute",
              "Kaliya -O",
              "Kaliya -sV",
              "Ma jiro isku darid"
            ],
            answer: 0,
            explain: "-A waa 'aggressive' — wuxuu isku daraa dhammaan features-ka waaweyn."
          }
        ],

        exercise: {
          title: "Fingerprinting Accuracy Practice",
          steps: [
            "Sharax farqiga --version-intensity 0 iyo 9.",
            "Sharax shuruudaha OS fingerprinting accuracy sare.",
            "Qor tusaale command ah oo -A isticmaala.",
            "Sharax caqabadaha version detection ports non-standard ah."
          ],
          deliverable: "Service/OS fingerprinting reference notes."
        }
      },


      {
        slug: "nmap-scripting-engine-mastery",
        title: "Nmap Scripting Engine Mastery",
        english: "Nmap Scripting Engine Mastery",
        minutes: 15,

        summary:
          "Sii qoto dheeree NSE — script categories, targeted usage, iyo script arguments.",

        sections: [
          {
            h: "NSE Script Categories Recap & Depth",
            p:
            "auth, broadcast, brute, default, discovery, dos, exploit, external, fuzzer, intrusive, malware, safe, version, vuln — 14 categories, mid kasta oo leh purpose gaar ah. --script-help [script] wuxuu bixiyaa faahfaahin script gaar ah."
          },
          {
            h: "Targeted Script Usage",
            p:
            "Halkii la isticmaali lahaa --script vuln (dhammaan vuln scripts, gaabis), habka professional-ku wuxuu ahaa in la doorto scripts gaar ah iyadoo lagu saleynayo services la helay (tusaale --script smb-vuln* haddii SMB la helay oo keliya)."
          },
          {
            h: "Script Arguments",
            p:
            "Scripts qaarkood waxay aqbalaan arguments custom ah: --script-args user=admin,pass=admin123 (tusaale ftp-brute). Kani wuxuu u ogolaadaa customization dheeraad ah scripts-ka la isticmaalayo."
          },
          {
            h: "Writing a Minimal Custom Script (Overview)",
            p:
            "NSE scripts waxaa lagu qoraa Lua, kuna kaydsan /usr/share/nmap/scripts/. Structure-ku wuxuu ka kooban yahay: description, categories, portrule/hostrule (goorma la fuliyo), iyo action function-ka fulinaya logic-ka."
          }
        ],

        terms: [
          { term: "Script Arguments", def: "Parameters custom ah oo NSE scripts la siin karo." },
          { term: "portrule/hostrule", def: "Function qeexaya goorma NSE script uu fulayo." }
        ],

        quiz: [
          {
            q: "Targeted script usage (halkii --script vuln guud) waxay?",
            options: [
              "Dedejisaa scanning-ka, yareysaa noise-ka",
              "Kordhisaa waqtiga oo keliya",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo UDP"
            ],
            answer: 0,
            explain: "Scripts targeted ah waa habka professional-ka ah ee la doorto."
          },
          {
            q: "--script-args waxaa loo isticmaalaa?",
            options: [
              "Siinta parameters custom ah scripts-ka",
              "Xiritaanka Nmap",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo -A"
            ],
            answer: 0,
            explain: "Customization-ku wuxuu u ogolaadaa scripts flexible ahaan."
          },
          {
            q: "NSE scripts waxaa lagu qoraa?",
            options: ["Lua", "Python", "JavaScript", "C++"],
            answer: 0,
            explain: "Lua waa luqadda NSE scripts."
          }
        ],

        exercise: {
          title: "NSE Advanced Usage Practice",
          steps: [
            "Liis garee 14-da category ee NSE scripts.",
            "Qor tusaale command ah oo scripts targeted ah isticmaala (SMB-specific).",
            "Sharax tusaale --script-args ah.",
            "Sharax structure-ka asaasiga ah ee NSE script hal ah."
          ],
          deliverable: "NSE mastery reference sheet."
        }
      },


      {
        slug: "nmap-timing-performance-optimization",
        title: "Timing & Performance Optimization",
        english: "Timing and Performance Optimization",
        minutes: 13,

        summary:
          "Faham sida timing templates iyo performance options loo optimize gareeyo scans-ka.",

        sections: [
          {
            h: "Timing Templates Deep Dive",
            p:
            "-T0 (paranoid, 5 min u dhexeeya probes), -T1 (sneaky), -T2 (polite), -T3 (normal, default), -T4 (aggressive, badanaa loo isticmaalo networks fiican), -T5 (insane, gaabis, laakiin loss-prone)."
          },
          {
            h: "Parallel Scanning Options",
            p:
            "--min-parallelism iyo --max-parallelism waxay xakameeyaan tirada probes isla mar la diro — kordhinta parallelism wuxuu dedejinayaa scan-ka, laakiin wuxuu kordhinayaa noise-ka iyo khatarta results incomplete ah."
          },
          {
            h: "Timeout & Retry Tuning",
            p:
            "--host-timeout wuxuu xaddidaa waqtiga ugu badan host hal ah loo qaato. --max-retries wuxuu xakameeyaa tirada isku dayada dib loo diro packets aan jawaab helin — yareyntoodu way dedejin kartaa, laakiin way kordhin kartaa false negatives."
          },
          {
            h: "Balancing Speed & Accuracy",
            p:
            "Networks-ka waaweyn (thousands of hosts) waxay u baahan yihiin -T4 ama custom tuning si loo dhammaystiro waqti macquul ah. Engagements-ka stealth-required ah waxay u baahan yihiin -T1/-T2, iyaga oo aqoonsanaya waqtiga dheer."
          }
        ],

        terms: [
          { term: "Timing Template", def: "Settings go'aamiya xawaaraha/muuqashada scan-ka." },
          { term: "Parallelism", def: "Tirada probes isla mar la diro." }
        ],

        quiz: [
          {
            q: "-T4 marka la barbardhigo -T1 waa?",
            options: [
              "Ka dhaqso badan, ka sii muuqda",
              "Ka gaabis, ka qarsoon",
              "Isku mid",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Timing templates sare waxay bixiyaan speed, laakiin waxay kordhiyaan detectability."
          },
          {
            q: "Kordhinta parallelism-ka wuxuu?",
            options: [
              "Dedejiyaa scan-ka, kordhiya noise-ka",
              "Gaabisaa scan-ka oo keliya",
              "Ma jiro saameyn",
              "Wuxuu kaliya saameeyaa UDP"
            ],
            answer: 0,
            explain: "Speed vs noise waa trade-off muhiim ah."
          },
          {
            q: "Engagement stealth-required ah wuxuu u baahan yahay?",
            options: [
              "-T1/-T2 (gaabis, qarsoon)",
              "-T4/-T5 (dhaqso, muuqda)",
              "Ma jiro timing gaar ah",
              "Kaliya UDP scans"
            ],
            answer: 0,
            explain: "Stealth-ku wuxuu u baahan yahay waqti dheer si loo yareeyo detection."
          }
        ],

        exercise: {
          title: "Timing Optimization Practice",
          steps: [
            "Sharax 6-da timing templates iyo isticmaalkooda.",
            "Naqshadee scan command ah oo network waaweyn ku habboon (-T4).",
            "Naqshadee scan command ah oo stealth-required ah (-T1).",
            "Sharax trade-off-ka u dhexeeya speed iyo accuracy."
          ],
          deliverable: "Timing and performance optimization guide."
        }
      },


      {
        slug: "firewall-ids-evasion-nmap-advanced",
        title: "Firewall & IDS Evasion (Advanced)",
        english: "Firewall and IDS Evasion (Advanced)",
        minutes: 14,

        summary:
          "Sii qoto dheeree evasion techniques advanced ah — fragmentation, decoys, iyo source spoofing.",

        sections: [
          {
            h: "Packet Fragmentation Deep Dive",
            p:
            "-f wuxuu kala jaraa packets 8-byte fragments ah. -ff wuxuu kala jaraa 16-byte fragments (ka yar oo ka adag in la ogaado). --mtu [value] wuxuu u ogolaadaa custom fragment sizes."
          },
          {
            h: "Decoy Scanning Deep Dive",
            p:
            "-D decoy1,decoy2,ME,decoy3 wuxuu ku daraa IP-yo been ah scan-ka, 'ME' wuxuu qeexayaa halka IP-gaaga dhabta ah uu ku jiro liiska. Decoys-ku waa in ay noqdaan IP-yo jira (aan la exploit-gareyn), si aan loo kicin traffic dib-jawaab ah oo shaki leh."
          },
          {
            h: "Source Port & MAC Spoofing",
            p:
            "--source-port 53 (ama --spoof-mac) waxay isku daydaan inay ka dhigaan scan-ka mid u eg traffic 'trusted' ah — MAC spoofing waxaa loo isticmaali karaa kaliya local network gudaheeda (Layer 2)."
          },
          {
            h: "Idle (Zombie) Scan",
            p:
            "-sI (Idle scan) wuxuu isticmaalaa 'zombie' host si uu si dhab ah scanner-ku source IP-giisa uga qariyo — habkani waa mid technical ah oo u baahan zombie host leh predictable IP ID sequence."
          }
        ],

        terms: [
          { term: "Decoy Scanning", def: "Ku darista IP-yo been ah si la is-jugleeyo." },
          { term: "Idle (Zombie) Scan", def: "Scan isticmaala zombie host si source-ka loo qariyo." }
        ],

        quiz: [
          {
            q: "-D decoy1,decoy2,ME,decoy3, 'ME' macnaheedu waa?",
            options: [
              "Halka IP-gaaga dhabta ah uu ku jiro liiska decoys",
              "Decoy fudud oo kale",
              "Ma jiro macno",
              "Target-ka scan-ka"
            ],
            answer: 0,
            explain: "ME wuxuu qeexayaa position-kaaga liiska decoys dhexdiisa."
          },
          {
            q: "Decoys-ku waa in ay noqdaan?",
            options: [
              "IP-yo jira (aan la exploit-gareyn)",
              "IP-yo aan jirin gebi ahaanba",
              "Ma jiro shuruud",
              "Kaliya IP-gaaga"
            ],
            answer: 0,
            explain: "IP-yo aan jirin waxay kicin karaan network errors oo shaki leh."
          },
          {
            q: "Idle scan (-sI) ujeeddadeedu waa?",
            options: [
              "Qarinta source IP-ga scanner-ka dhabta ah",
              "Dedejinta scan-ka",
              "Ma jiro faa'iido",
              "Kaliya UDP scanning"
            ],
            answer: 0,
            explain: "Zombie host-ku wuxuu ka dhigayaa in target-ku u maleeyo zombie-ga inuu yahay scanner-ka."
          }
        ],

        exercise: {
          title: "Advanced Evasion Techniques Study",
          steps: [
            "Sharax farqiga -f iyo -ff.",
            "Qor tusaale decoy scan command ah.",
            "Sharax habka idle scan u shaqeeyo (concept ahaan).",
            "Sharax sababta evasion techniques loo isticmaalo kaliya authorized engagements."
          ],
          deliverable: "Advanced evasion techniques study notes."
        }
      },


      {
        slug: "nmap-mastery-capstone",
        title: "Nmap Mastery Capstone",
        english: "Nmap Mastery Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay — naqshadee full scanning methodology heer advanced ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad qaadanaysaa authorized external assessment subnet /22 ah (1024 IPs) oo leh waqti xaddidan. Waa in aad naqshadeyso methodology efficient laakiin comprehensive ah."
          },
          {
            h: "Phased Approach",
            p:
            "Phase 1: Fast host discovery (-sn -T4). Phase 2: Top ports scan hosts nool ah (--top-ports 1000). Phase 3: Deep scan (-A) kaliya hosts xiisaha leh. Phase 4: Targeted NSE scripts services la helay."
          },
          {
            h: "Documentation & Output",
            p:
            "Isticmaal -oA dhammaan phases si loo kaydiyo natiijooyinka formats badan (normal, XML, grepable) — XML-ku wuxuu u ogolaadaa tools kale (Metasploit) inay si toos ah u akhriyaan natiijooyinka."
          },
          {
            h: "Reporting",
            p:
            "Isku dar findings-ka dhammaan phases warbixin structured ah oo daboolaya: hosts nool, ports/services la helay, OS fingerprints, iyo vulnerabilities suspected ah (NSE vuln scripts)."
          }
        ],

        terms: [
          { term: "Phased Scanning Methodology", def: "Approach isugu jira discovery, broad scan, deep scan, iyo targeted scripts." }
        ],

        quiz: [
          {
            q: "Subnet /22 waaweyn ah, phase-ka koowaad waa?",
            options: [
              "Fast host discovery si loo aqoonsado hosts nool",
              "Isla markiiba deep scan hosts oo dhan",
              "NSE vuln scripts oo keliya",
              "Ma jiro phase hore"
            ],
            answer: 0,
            explain: "Discovery-ku wuxuu yareeyaa waqtiga lagu qaato phases dambe."
          },
          {
            q: "-oA flag-ku wuxuu bixiyaa?",
            options: [
              "Output formats badan isla mar (normal, XML, grepable)",
              "Kaliya normal output",
              "Ma jiro faa'iido",
              "Kaliya XML"
            ],
            answer: 0,
            explain: "Format-yada badan waxay u adeegaan human iyo automated analysis."
          },
          {
            q: "XML output-ku muhiim u yahay sababtoo ah?",
            options: [
              "Tools kale (Metasploit) way si toos ah u akhriyi karaan",
              "Waa mid ka fudud in la akhriyo bini'aadam ahaan",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Automation-ku wuxuu u baahan yahay structured data sida XML."
          }
        ],

        exercise: {
          title: "Full Advanced Scanning Methodology",
          steps: [
            "Naqshadee Phase 1: fast discovery command subnet /22 ah.",
            "Naqshadee Phase 2: top ports scan hosts nool ah.",
            "Naqshadee Phase 3-4: deep scan + targeted NSE scripts.",
            "Diyaari warbixin buuxda oo findings dhammaan phases isku darta (portfolio-ready)."
          ],
          deliverable: "Full Nmap scanning methodology report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "td-burp",
    slug: "burp-suite-deep-dive",
    stage: "Sare",
    title: "Burp Suite Deep Dive",
    english: "Burp Suite Deep Dive",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa Burp Suite heer sare ah — full workflow, advanced Repeater/Intruder, active scanning, session handling, iyo extensions.",

    topics: [
      "Full Burp Suite Workflow",
      "Target & Site Map Mastery",
      "Repeater Advanced Techniques",
      "Intruder Attack Types Deep Dive",
      "Burp Scanner: Active & Passive",
      "Session Handling & Macros",
      "Burp Extensions & BApp Store",
      "Burp Suite Capstone: Full Assessment",
    ],

    lessonList: [

      {
        slug: "burp-suite-full-workflow",
        title: "Full Burp Suite Workflow",
        english: "Full Burp Suite Workflow",
        minutes: 13,

        summary:
          "Faham workflow-ka dhamaystiran ee professional pentester uu Burp Suite ku isticmaalo.",

        sections: [
          {
            h: "Professional Testing Workflow",
            p:
            "1) Configure scope (Target tab). 2) Passive crawl (browse manually, Burp records). 3) Manual testing (Repeater specific parameters). 4) Automated scanning (Scanner, Pro version). 5) Reporting findings."
          },
          {
            h: "Configuring Scope",
            p:
            "Target > Scope wuxuu u ogolaadaa in la qeexo domains/URLs khusaya assessment-ka — 'Show only in-scope items' filter-ka wuxuu ka saaraa noise-ka third-party domains ah (analytics, CDNs) oo aan khusaynayn."
          },
          {
            h: "Proxy History Organization",
            p:
            "HTTP History-ga waxaa lagu filter gareyn karaa method, status code, ama MIME type — filtering-kani wuxuu kaa caawiyaa inaad diiradda saarto requests-ka xiisaha leh (POST requests, JSON responses)."
          },
          {
            h: "Community vs Professional Workflow Differences",
            p:
            "Community edition-ku wuxuu u baahan yahay manual testing intensive ah (Repeater/Intruder gaabis). Professional-ku wuxuu ku daraa Scanner automated ah, Intruder xawli sare leh, iyo Collaborator (out-of-band detection)."
          }
        ],

        terms: [
          { term: "Scope Configuration", def: "Qeexitaanka domains/URLs khusaya assessment-ka." },
          { term: "Proxy History", def: "Diiwaanka dhammaan requests/responses la falgashay." }
        ],

        quiz: [
          {
            q: "Testing workflow-ka professional-ku wuxuu bilaabmaa?",
            options: [
              "Configure scope",
              "Isla markiiba Scanner automated ah",
              "Reporting",
              "Extensions installation"
            ],
            answer: 0,
            explain: "Scope-ku wuxuu xaddidaa waxa la baaro, muhiim ah legal/ethical ahaan."
          },
          {
            q: "'Show only in-scope items' filter-ku wuxuu ka saaraa?",
            options: [
              "Noise third-party domains ah (analytics, CDNs)",
              "Dhammaan requests",
              "Ma jiro faa'iido",
              "Kaliya HTTPS traffic"
            ],
            answer: 0,
            explain: "Filtering-ku wuxuu dedejinayaa analysis-ka."
          },
          {
            q: "Professional edition-ku wuxuu ku daraa Community?",
            options: [
              "Scanner automated ah, Intruder xawli sare, Collaborator",
              "Kaliya Repeater",
              "Ma jiro farqi",
              "Kaliya Proxy"
            ],
            answer: 0,
            explain: "Pro-gu wuxuu bixiyaa automation aad u badan."
          }
        ],

        exercise: {
          title: "Workflow Setup Practice",
          steps: [
            "Naqshadee scope configuration app tusaale ah.",
            "Sharax sida HTTP History loo filter gareeyo (POST requests oo keliya).",
            "Sharax farqiga Community iyo Professional workflow.",
            "Naqshadee 5-tallaabo ee testing workflow-ka professional ah."
          ],
          deliverable: "Burp Suite workflow reference guide."
        }
      },


      {
        slug: "target-site-map-mastery",
        title: "Target & Site Map Mastery",
        english: "Target and Site Map Mastery",
        minutes: 12,

        summary:
          "Faham sida Site Map loo isticmaalo attack surface mapping heer sare ah.",

        sections: [
          {
            h: "Site Map Tree Structure",
            p:
            "Site Map-ku wuxuu bixiyaa muuqaal hierarchical ah oo application-ka oo dhan — folders/endpoints waxaa loo abaabulaa qaab URL structure ah, taasoo fududeynaysa aqoonsiga areas aan la baarin."
          },
          {
            h: "Content Discovery",
            p:
            "Engagement > Discover Content (Pro) wuxuu si automatic ah u raadiyaa endpoints aan la ogeyn (iyada oo la isticmaalayo common paths/wordlists) — muhiim marka application-ku uu leeyahay hidden functionality."
          },
          {
            h: "Comparing Requests (Diff)",
            p:
            "Site Map wuxuu u oggolaadaa in la barbardhigo laba responses (Compare feature) — muhiim marka la baarayo authorization differences (tusaale: user A vs user B responses isla endpoint-ka)."
          },
          {
            h: "Highlighting & Annotating",
            p:
            "Requests waxaa lagu annotate gareyn karaa (comments, colors) Site Map gudaheeda — kani wuxuu fududeeyaa la socodka progress-ka assessment weyn oo endpoints badan leh."
          }
        ],

        terms: [
          { term: "Site Map", def: "Muuqaal hierarchical ah oo application attack surface ah." },
          { term: "Content Discovery", def: "Raadinta automatic ah ee endpoints aan la ogeyn." }
        ],

        quiz: [
          {
            q: "Site Map-ku wuxuu bixiyaa?",
            options: [
              "Muuqaal hierarchical ah oo application-ka oo dhan",
              "Kaliya hal request",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Structure-ku wuxuu fududeeyaa aqoonsiga areas aan la baarin."
          },
          {
            q: "Content Discovery (Pro) waxaa loo isticmaalaa?",
            options: [
              "Raadinta endpoints aan la ogeyn automatic ahaan",
              "Encrypt gareynta traffic",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Hidden functionality-ka waxay bixiyaan attack surface dheeraad ah."
          },
          {
            q: "Compare feature-ku muhiim u yahay marka?",
            options: [
              "La baarayo authorization differences (user A vs B)",
              "Kaliya loo isticmaalo speed testing",
              "Ma jiro faa'iido",
              "Kaliya HTTPS traffic"
            ],
            answer: 0,
            explain: "IDOR/access control issues waxaa lagu ogaan karaa diff-ka."
          }
        ],

        exercise: {
          title: "Site Map Analysis Practice",
          steps: [
            "Sharax sida Site Map loo isticmaali lahaa attack surface mapping.",
            "Sharax marka Content Discovery loo isticmaali lahaa.",
            "Sharax habka Compare feature loo isticmaalo access control testing.",
            "Naqshadee annotation strategy assessment weyn ah."
          ],
          deliverable: "Site Map mastery notes."
        }
      },


      {
        slug: "repeater-advanced-techniques",
        title: "Repeater Advanced Techniques",
        english: "Repeater Advanced Techniques",
        minutes: 14,

        summary:
          "Sii qoto dheeree Repeater — tabs organization, iyo testing complex payloads.",

        sections: [
          {
            h: "Multiple Repeater Tabs",
            p:
            "Send to Repeater marar badan wuxuu abuuraa tabs kala duwan — waxaa loo isticmaali karaa in la barbardhigo payloads badan isla parameter-ka, ama la la socdo endpoints kala duwan isla mar."
          },
          {
            h: "Testing SQLi Payloads Systematically",
            p:
            "Repeater-ka gudihiisa, waxaad tijaabin kartaa payloads isku xigxig ah (' → error, ' OR '1'='1 → bypass, ' AND SLEEP(5)-- → time-based) si loo xaqiijiyo nooca SQLi-ga taxane ahaan, ma aha random."
          },
          {
            h: "Response Rendering",
            p:
            "Repeater wuxuu bixiyaa 'Render' tab (haddii response-ku HTML yahay) — kani wuxuu u oggolaadaa in la arko sida response-ku u muuqan lahaa browser dhab ah, muhiim XSS confirmation ahaan."
          },
          {
            h: "Keyboard Shortcuts & Efficiency",
            p:
            "Ctrl+R (send request), Ctrl+Space (auto-complete headers), iyo shortcuts kale waxay dedejinayaan testing-ka manual ah — professional-yadu waxay isticmaalaan kuwan si ay u yareeyaan waqtiga la qaato."
          }
        ],

        terms: [
          { term: "Systematic Payload Testing", def: "Tijaabinta payloads isku xigxig ah si loo xaqiijiyo vulnerability." },
          { term: "Response Rendering", def: "Feature Repeater ah oo tusa response-ka browser-style ahaan." }
        ],

        quiz: [
          {
            q: "Systematic SQLi testing-ku wuxuu bilaabmaa?",
            options: [
              "Single quote (') si loo xaqiijiyo error",
              "Isla markiiba UNION SELECT",
              "Ma jiro tartiib",
              "Kaliya time-based payloads"
            ],
            answer: 0,
            explain: "Error confirmation waa tallaabada koowaad ee taxane ahaan."
          },
          {
            q: "Response Rendering feature-ku muhiim u yahay?",
            options: [
              "XSS confirmation, la arko sida browser u muuqan lahaa",
              "SQLi testing oo keliya",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Rendering-ku wuxuu xaqiijiyaa in script-ku dhab ahaan fulayo."
          },
          {
            q: "Multiple Repeater tabs waxay u oggolaadaan?",
            options: [
              "Barbardhigga payloads badan ama la socodka endpoints kala duwan",
              "Kaliya hal request testing",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo Intruder"
            ],
            answer: 0,
            explain: "Organization-ku wuxuu fududeeyaa testing complex ah."
          }
        ],

        exercise: {
          title: "Advanced Repeater Practice",
          steps: [
            "Naqshadee systematic SQLi testing sequence (error → bypass → time-based).",
            "Sharax sida Response Rendering loo isticmaali lahaa XSS confirmation.",
            "Isticmaal multiple tabs si aad u barbardhigto 2 payloads.",
            "Liis garee 3 keyboard shortcuts Repeater-ka dedejiya."
          ],
          deliverable: "Advanced Repeater techniques notes."
        }
      },


      {
        slug: "intruder-attack-types-deep-dive",
        title: "Intruder Attack Types Deep Dive",
        english: "Intruder Attack Types Deep Dive",
        minutes: 15,

        summary:
          "Sii qoto dheeree afarta attack type ee Intruder, iyo payload processing rules.",

        sections: [
          {
            h: "Sniper — Deep Dive",
            p:
            "Sniper wuxuu tijaabiyaa hal position, hal wordlist — haddii positions badan la calaamadeeyo, Sniper wuxuu tijaabiyaa mid kasta gooni ahaan (ma aha isku mar). Waxaa loo isticmaalaa fuzzing parameter hal ah."
          },
          {
            h: "Cluster Bomb — Deep Dive",
            p:
            "Cluster bomb wuxuu tijaabiyaa dhammaan combinations positions badan iyo wordlists badan — haddii aad haysato 2 positions iyo 100 values kasta, wuxuu sameeyaa 10,000 requests (100x100). Waqti dheer u baahan."
          },
          {
            h: "Payload Processing Rules",
            p:
            "Payload processing (Add prefix/suffix, Encode, Hash) waxaa lagu dabaqi karaa payloads-ka ka hor la diro — tusaale: Base64 encode automatic ah payload kasta, ama URL-encode special characters."
          },
          {
            h: "Grep - Match & Extract",
            p:
            "Options tab-ka, 'Grep - Match' wuxuu calaamadeeyaa responses ku jira string gaar ah (tusaale 'Welcome'). 'Grep - Extract' wuxuu soo saaraa xog gaar ah response kasta (tusaale session tokens) — muhiim automation dheeraad ah."
          }
        ],

        terms: [
          { term: "Payload Processing", def: "Beddelidda payloads ka hor la diro (encode, hash, prefix)." },
          { term: "Grep - Extract", def: "Soo saarista xog gaar ah response kasta Intruder gudaheeda." }
        ],

        quiz: [
          {
            q: "Cluster bomb 2 positions iyo 100 values leh wuxuu sameeyaa?",
            options: [
              "10,000 requests (100x100)",
              "200 requests (100+100)",
              "100 requests",
              "Ma jiro xisaab la sameeyo"
            ],
            answer: 0,
            explain: "Cluster bomb wuxuu tijaabiyaa dhammaan combinations-ka."
          },
          {
            q: "Payload processing (encode/hash) waxaa lagu dabaqaa?",
            options: [
              "Payloads-ka ka hor la diro",
              "Responses-ka kadib la helo",
              "Ma jiro isticmaal",
              "Kaliya headers-ka"
            ],
            answer: 0,
            explain: "Processing-ku wuxuu beddelaa payload-ka wax uu diro."
          },
          {
            q: "Grep - Extract waxaa loo isticmaalaa?",
            options: [
              "Soo saarista xog gaar ah response kasta (automation)",
              "Xannibaadda requests",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo Sniper"
            ],
            answer: 0,
            explain: "Extraction-ku wuxuu fududeeyaa analysis-ka results-ka badan."
          }
        ],

        exercise: {
          title: "Intruder Attack Type Selection",
          steps: [
            "Sharax sababta Sniper loo doorto fuzzing parameter hal ah.",
            "Xisaabi tirada requests Cluster bomb 3 positions x 50 values ah samayn lahaa.",
            "Sharax tusaale payload processing ah (Base64 encode).",
            "Sharax faa'iidada Grep - Extract automation dheeraad ah."
          ],
          deliverable: "Intruder attack types deep dive notes."
        }
      },


      {
        slug: "burp-scanner-active-passive",
        title: "Burp Scanner: Active & Passive",
        english: "Burp Scanner: Active and Passive",
        minutes: 13,

        summary:
          "Faham farqiga passive iyo active scanning Burp Scanner (Pro) gudaheeda.",

        sections: [
          {
            h: "Passive Scanning",
            p:
            "Passive scanning wuxuu falanqeeyaa requests/responses aad hore u sameysay (browsing caadi ah) iyada oo aan traffic dheeraad ah la dirin — wuxuu ogaadaa issues sida missing security headers, information disclosure."
          },
          {
            h: "Active Scanning",
            p:
            "Active scanning wuxuu si toos ah u diraa payloads (SQLi, XSS test payloads) endpoints la xushay — wuxuu ka dhigayaa noise badan, laakiin wuxuu ogaan karaa vulnerabilities aan passive-ku ogaan karin."
          },
          {
            h: "Scan Configuration & Audit Optimization",
            p:
            "Scan configurations waxaa lagu customize gareyn karaa (kaliya SQLi checks, ama kaliya XSS checks) — kani wuxuu dedejinayaa scans-ka large applications ah, iyada oo aan la sugin dhammaan checks-ka la fulinayo."
          },
          {
            h: "Reviewing Scanner Findings",
            p:
            "Scanner findings-ku waa in la manual verify gareeyo — automated scanners waxay soo saari karaan false positives, gaar ahaan business logic vulnerabilities aysan ogaan karin gabi ahaanba."
          }
        ],

        terms: [
          { term: "Passive Scanning", def: "Falanqaynta traffic hore, aan traffic dheeraad ah dirin." },
          { term: "Active Scanning", def: "Dirista payloads si toos ah endpoints la xushay." }
        ],

        quiz: [
          {
            q: "Passive scanning wuxuu ogaadaa?",
            options: [
              "Missing security headers, information disclosure",
              "SQLi kaliya",
              "Ma jiro vulnerability",
              "Kaliya XSS"
            ],
            answer: 0,
            explain: "Passive-ku wuxuu falanqeeyaa xogta jirta, ma diro traffic cusub."
          },
          {
            q: "Active scanning wuxuu ka dhigayaa?",
            options: [
              "Noise badan, laakiin ogaan kara vulnerabilities dheeraad ah",
              "Noise yar",
              "Ma jiro farqi passive",
              "Waligeed waa mid qarsoon"
            ],
            answer: 0,
            explain: "Payloads-ka la diro waxay dhaliyaan traffic aad u badan."
          },
          {
            q: "Scanner findings waa in la?",
            options: [
              "Manual verify gareeyo, sababtoo ah false positives suurtagal ah",
              "Aaminaa 100%, aan verification loo baahnayn",
              "Iska indho tiro",
              "Kaliya loo isticmaalo reporting"
            ],
            answer: 0,
            explain: "Automated tools uma ogaan karaan business logic context."
          }
        ],

        exercise: {
          title: "Scanner Configuration Practice",
          steps: [
            "Sharax farqiga passive iyo active scanning.",
            "Naqshadee scan configuration ah oo SQLi checks oo keliya.",
            "Sharax sababta findings-ku loo verify gareeyo manual ahaan.",
            "Sharax marka aad isticmaali lahayd passive oo keliya (stealth engagement)."
          ],
          deliverable: "Burp Scanner configuration and review notes."
        }
      },


      {
        slug: "session-handling-macros",
        title: "Session Handling & Macros",
        english: "Session Handling and Macros",
        minutes: 14,

        summary:
          "Faham sida session handling rules iyo macros loo isticmaalo testing applications leh complex authentication.",

        sections: [
          {
            h: "Sababta Session Handling Loo Baahan Yahay",
            p:
            "Applications badan waxay isticmaalaan CSRF tokens ama session tokens oo isbeddela request kasta — automated testing (Scanner, Intruder) wuxuu jabin doonaa haddii aan session-ka la maamulin si otomaatig ah."
          },
          {
            h: "Session Handling Rules",
            p:
            "Project Options > Sessions wuxuu u oggolaadaa in la naqshadeeyo rules (tusaale: 'update cookie automatically', 'run macro haddii session dhacday') — kuwaan waxay xakameeyaan sida Burp ula dhaqmo session state-ka."
          },
          {
            h: "Recording a Macro",
            p:
            "Macro waa sequence requests ah (tusaale login flow) oo Burp uu dib u fulin karo si toos ah — waxaa loo isticmaalaa in la helo CSRF token cusub ama in la re-authenticate gareeyo automatic ahaan."
          },
          {
            h: "Applying Macros to Scanner/Intruder",
            p:
            "Marka macro la dhiso, waxaa loo isticmaali karaa Scanner (si loo hubiyo session-ku uu shid yahay scan-ka oo dhan) ama Intruder (si loo re-authenticate gareeyo haddii session dhaco intruder attack ka dhexeeya)."
          }
        ],

        terms: [
          { term: "Session Handling Rule", def: "Rule xakamaysa sida Burp ula dhaqmo session state-ka." },
          { term: "Macro", def: "Sequence requests ah oo Burp uu dib u fulin karo automatic ahaan." }
        ],

        quiz: [
          {
            q: "Automated testing (Scanner/Intruder) wuxuu jabin karaa sababtoo ah?",
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
            q: "Macros waxaa loo dabaqi karaa?",
            options: [
              "Scanner iyo Intruder si session-ku ugu shido testing-ka oo dhan",
              "Kaliya Repeater",
              "Ma jiro isticmaal",
              "Kaliya proxy history"
            ],
            answer: 0,
            explain: "Re-authentication automatic ah waa muhiim automated testing ahaan."
          }
        ],

        exercise: {
          title: "Session Handling Setup Practice",
          steps: [
            "Sharax sababta session handling loo baahan yahay applications CSRF leh.",
            "Naqshadee macro (concept ahaan) login flow ah.",
            "Sharax sida session handling rule loo dabaqi lahaa Scanner.",
            "Sharax scenario ah oo macro loo baahan yahay Intruder attack dheer."
          ],
          deliverable: "Session handling and macros setup guide."
        }
      },


      {
        slug: "burp-extensions-bapp-store-deep",
        title: "Burp Extensions & BApp Store",
        english: "Burp Extensions and BApp Store",
        minutes: 12,

        summary:
          "Sii qoto dheeree extensions-ka Burp — installation, iyo extensions caanka ah oo dheeraad ah.",

        sections: [
          {
            h: "Installing Extensions",
            p:
            "Extender tab > BApp Store wuxuu liis gareeyaa extensions la heli karo, oo ay ku jiraan reviews/ratings — extensions-ku waxaa lagu qori karaa Java, Python (Jython), ama Ruby (JRuby)."
          },
          {
            h: "Autorize Deep Dive",
            p:
            "Autorize (aad hore u aragtay) wuxuu automate gareeyaa access control testing — configuration-ku wuxuu u baahan yahay in la geliyo session token(s) user(s) heerar hoose leh, kadibna wuxuu automatic-ka u dib-diraa requests."
          },
          {
            h: "Additional Useful Extensions",
            p:
            "JSON Web Tokens (JWT decode/edit), Turbo Intruder (race condition testing xawli sare leh), Param Miner (raadinta hidden parameters), iyo Logger++ (advanced logging/filtering) waa extensions muhiim ah oo dheeraad ah."
          },
          {
            h: "Writing a Simple Extension (Overview)",
            p:
            "Extensions-ka fudud waxaa lagu qori karaa Python (Jython) — waxay isticmaalaan Burp Extender API si ay ula xiriiraan HTTP traffic, ku darsan custom tabs, ama automate gareeyaan tasks specific ah."
          }
        ],

        terms: [
          { term: "BApp Store", def: "Marketplace extensions Burp Suite ah." },
          { term: "JWT", def: "JSON Web Token — format token authentication ah la extension-ka decode/edit gareeyo." }
        ],

        quiz: [
          {
            q: "BApp Store waxaa lagu qori karaa extensions?",
            options: [
              "Java, Python (Jython), Ruby (JRuby)",
              "Kaliya Java",
              "Kaliya Python",
              "Ma jiro luqad la qeexay"
            ],
            answer: 0,
            explain: "Burp-ku wuxuu taageeraa luqado badan extensions ahaan."
          },
          {
            q: "Param Miner waxaa loo isticmaalaa?",
            options: [
              "Raadinta hidden parameters",
              "Password cracking",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Hidden parameters waxay bixiyaan attack surface dheeraad ah."
          },
          {
            q: "Turbo Intruder waxaa loo isticmaalaa?",
            options: [
              "Race condition testing xawli sare leh",
              "Kaliya JSON decoding",
              "Ma jiro isticmaal",
              "Kaliya logging"
            ],
            answer: 0,
            explain: "Xawli-ga sarena wuxuu u ogolaadaa timing-sensitive attacks."
          }
        ],

        exercise: {
          title: "Extensions Research & Setup",
          steps: [
            "Liis garee 4 extensions dheeraad ah oo aan hore lagu sharaxin (JWT, Turbo Intruder, Param Miner, Logger++).",
            "Sharax shaqada extension kasta.",
            "Sharax sida Autorize loo configure gareeyo.",
            "Sharax sida extension fudud loogu qori lahaa Python (concept ahaan)."
          ],
          deliverable: "Burp extensions research notes."
        }
      },


      {
        slug: "burp-suite-capstone-full-assessment",
        title: "Burp Suite Capstone: Full Assessment",
        english: "Burp Suite Capstone: Full Assessment",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay — samee full web app assessment Burp Suite heer sare ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad qaadanaysaa full authorized web app pentest oo leh authentication complex ah (CSRF tokens, session management). Waxaad isticmaalaysaa Burp Suite si buuxda."
          },
          {
            h: "Setup & Configuration",
            p:
            "Naqshadee scope, macro login flow ah, iyo session handling rules ka hor testing la bilaabo."
          },
          {
            h: "Manual & Automated Testing",
            p:
            "Isticmaal Repeater systematic testing endpoints xiisaha leh, kadibna Scanner (haddii Pro ah) configuration targeted ah."
          },
          {
            h: "Extensions & Reporting",
            p:
            "Isticmaal extensions ku habboon (Autorize access control testing), oo isku dar findings-ka warbixin professional ah."
          }
        ],

        terms: [
          { term: "Full Burp Assessment", def: "Assessment isugu jira setup, manual/automated testing, extensions, reporting." }
        ],

        quiz: [
          {
            q: "Application leh CSRF tokens complex ah, setup-ka waa in uu ku jiro?",
            options: [
              "Macro login flow + session handling rules",
              "Kaliya scope configuration",
              "Ma jiro setup dheeraad ah",
              "Kaliya extensions"
            ],
            answer: 0,
            explain: "Automated testing-ku wuxuu u baahan yahay session maamul si sax ah."
          },
          {
            q: "Autorize extension-ku wuxuu ku habboon yahay?",
            options: [
              "Access control testing automated ahaan",
              "Kaliya SQLi testing",
              "Ma jiro isticmaal",
              "Kaliya JWT decoding"
            ],
            answer: 0,
            explain: "IDOR/broken access control-ku waa focus-ka Autorize."
          },
          {
            q: "Warbixinta ugu dambaysa Burp assessment-ka waa in ay ku jirto?",
            options: [
              "Evidence (requests/responses), severity, remediation",
              "Kaliya liis endpoints la baaray",
              "Ma jiro shuruud",
              "Kaliya screenshots interface-ka"
            ],
            answer: 0,
            explain: "Report professional ah wuxuu u baahan yahay evidence iyo context."
          },
        ],

        exercise: {
          title: "Full Burp Suite Assessment",
          steps: [
            "Naqshadee scope + macro + session handling setup.",
            "Naqshadee manual testing plan (Repeater systematic).",
            "Naqshadee scanner configuration (haddii Pro) + relevant extensions.",
            "Diyaari warbixin buuxda oo findings, evidence, iyo remediation leh (portfolio-ready)."
          ],
          deliverable: "Full Burp Suite assessment report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "td-metasploit",
    slug: "metasploit-framework-deep-dive",
    stage: "Sare",
    title: "Metasploit Framework Deep Dive",
    english: "Metasploit Framework Deep Dive",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa Metasploit heer sare ah — architecture, auxiliary modules, payload engineering, database workspace, iyo automation.",

    topics: [
      "Metasploit Architecture Overview",
      "Auxiliary Modules Deep Dive",
      "Exploit Modules & Payload Selection",
      "Meterpreter Post-Exploitation",
      "Metasploit Database & Workspace",
      "msfvenom & Custom Payloads",
      "Resource Scripts & Automation",
      "Metasploit Capstone: Full Engagement",
    ],

    lessonList: [

      {
        slug: "metasploit-architecture-overview",
        title: "Metasploit Architecture Overview",
        english: "Metasploit Architecture Overview",
        minutes: 12,

        summary:
          "Faham qaab-dhismeedka Metasploit Framework — modules, libraries, iyo interfaces.",

        sections: [
          {
            h: "Module Types",
            p:
            "Exploits (code isticmaala vulnerability), Payloads (waxa la fulinayo kadib exploit), Auxiliary (scanning/enumeration, aan lahayn payload), Post (post-exploitation actions), iyo Encoders (obfuscation payloads)."
          },
          {
            h: "Framework Libraries",
            p:
            "Rex (Ruby Extension library — networking, protocols primitives), Msf::Core (core functionality), iyo Msf::Base (user-friendly wrappers) — layers-kan waxay dhisaan framework-ka oo dhan."
          },
          {
            h: "Interfaces: msfconsole vs msfdb vs Armitage",
            p:
            "msfconsole waa interface-ka ugu caansan (command-line). msfdb wuxuu maamulaa database-ka. Armitage (GUI, hore) wuxuu bixiyaa muuqaal visual ah, laakiin ma sii cusboonaysiin sida msfconsole."
          },
          {
            h: "Module Naming Convention",
            p:
            "exploit/platform/service/exploit_name (tusaale exploit/windows/smb/ms17_010_eternalblue) — naming convention-kan wuxuu fududeeyaa raadinta modules platform/service gaar ah."
          }
        ],

        terms: [
          { term: "Auxiliary Module", def: "Module scanning/enumeration ah, aan lahayn payload." },
          { term: "Rex Library", def: "Ruby Extension library — networking primitives Metasploit." }
        ],

        quiz: [
          {
            q: "Auxiliary modules-ku uma laha?",
            options: ["Payload", "Scanning capability", "Enumeration capability", "Configuration options"],
            answer: 0,
            explain: "Auxiliary-ku waa scanning/enumeration oo keliya, ma exploit-gareeyo."
          },
          {
            q: "msfconsole waa?",
            options: [
              "Interface-ka ugu caansan Metasploit (command-line)",
              "Database management tool",
              "GUI oo keliya",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "msfconsole waa entry point-ka ugu badan la isticmaalo."
          },
          {
            q: "Module naming convention-ku (exploit/platform/service/name) wuxuu?",
            options: [
              "Fududeeyaa raadinta modules platform/service gaar ah",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo documentation",
              "Wuxuu xakameeyaa access"
            ],
            answer: 0,
            explain: "Structure-ku wuxuu ka dhigayaa search-ka mid organized ah."
          }
        ],

        exercise: {
          title: "Metasploit Architecture Review",
          steps: [
            "Liis garee 5 module types Metasploit.",
            "Sharax farqiga exploit iyo auxiliary module.",
            "Sharax naming convention tusaale exploit ah.",
            "Sharax faa'iidada msfconsole marka la barbardhigo Armitage."
          ],
          deliverable: "Metasploit architecture reference sheet."
        }
      },


      {
        slug: "auxiliary-modules-deep-dive",
        title: "Auxiliary Modules Deep Dive",
        english: "Auxiliary Modules Deep Dive",
        minutes: 13,

        summary:
          "Faham sida auxiliary modules loo isticmaalo scanning, enumeration, iyo brute forcing.",

        sections: [
          {
            h: "Scanner Modules",
            p:
            "auxiliary/scanner/portscan/tcp (port scanning), auxiliary/scanner/smb/smb_version (SMB version detection), auxiliary/scanner/http/http_version — dhammaantood waa scanners specific ah oo Metasploit ku dhisan."
          },
          {
            h: "Using set/setg for Options",
            p:
            "set RHOSTS 10.10.14.0/24 wuxuu qeexayaa targets. setg (global) wuxuu dabaqayaa option-ka modules oo dhan session-ka gudihiisa, ma aha module hal ah oo keliya — dedejinaya workflow marka module badan la isticmaalayo target isku mid ah."
          },
          {
            h: "Brute Force Auxiliary Modules",
            p:
            "auxiliary/scanner/ssh/ssh_login, auxiliary/scanner/ftp/ftp_login waxay bixiyaan brute forcing built-in ah — USER_FILE/PASS_FILE options waxay siiyaan wordlists loo isticmaalo."
          },
          {
            h: "Running Modules Against Multiple Targets",
            p:
            "RHOSTS wuxuu aqbalaa ranges (10.10.14.1-50), CIDR (10.10.14.0/24), ama file (file:targets.txt) — auxiliary modules waxay si fudud ugu shaqeeyaan multiple targets isla mar."
          }
        ],

        terms: [
          { term: "setg", def: "Set global — dabaqidda option modules oo dhan session-ka." },
          { term: "Brute Force Module", def: "Auxiliary module tijaabisa credentials badan." }
        ],

        quiz: [
          {
            q: "setg ka duwan yahay set sababtoo ah?",
            options: [
              "Wuxuu dabaqayaa option modules oo dhan, ma aha hal module",
              "Isku mid",
              "setg waa mid ka gaabis",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Global settings-ku waxay dedejinayaan workflow modules badan."
          },
          {
            q: "auxiliary/scanner/ssh/ssh_login waxaa loo isticmaalaa?",
            options: [
              "Brute forcing SSH credentials",
              "Exploitation SSH",
              "Ma jiro isticmaal",
              "Kaliya version detection"
            ],
            answer: 0,
            explain: "USER_FILE/PASS_FILE options waxay bixiyaan wordlists."
          },
          {
            q: "RHOSTS wuxuu aqbalaa?",
            options: [
              "Ranges, CIDR, ama file targets",
              "Kaliya hal IP",
              "Ma jiro flexibility",
              "Kaliya hostname"
            ],
            answer: 0,
            explain: "Flexibility-gu wuxuu u ogolaadaa multiple targets."
          }
        ],

        exercise: {
          title: "Auxiliary Modules Practice",
          steps: [
            "Liis garee 3 scanner auxiliary modules iyo shaqadooda.",
            "Sharax farqiga set iyo setg.",
            "Qor tusaale command ah oo brute force auxiliary module isticmaala.",
            "Sharax sida RHOSTS loo qeexi lahaa targets badan."
          ],
          deliverable: "Auxiliary modules reference sheet."
        }
      },


      {
        slug: "exploit-modules-payload-selection",
        title: "Exploit Modules & Payload Selection",
        english: "Exploit Modules and Payload Selection",
        minutes: 14,

        summary:
          "Faham sida payloads loo doorto oo loo hagaajiyo exploits-ka.",

        sections: [
          {
            h: "Payload Types",
            p:
            "Singles (self-contained, tusaale shell_reverse_tcp), Stagers (yar, soo dejiya stage-2), Stages (payload weyn sida meterpreter oo staged ah). show payloads wuxuu liis gareeyaa payloads compatible ah exploit-ka la doortay."
          },
          {
            h: "Bind vs Reverse Shells",
            p:
            "Bind shell wuxuu sugaa connections target-ka (attacker-ku wuu la xiriiraa). Reverse shell wuxuu target-ka ka dirayaa connection attacker-ka — reverse-ku waa mid ka badan loo isticmaalo, sababtoo ah firewalls badanaa waxay xannibaan inbound connections."
          },
          {
            h: "Payload Compatibility",
            p:
            "Payload waa in uu la jaanqaadaa exploit-ka architecture (x86/x64) iyo platform (windows/linux) — show payloads (kadib use exploit) wuxuu kaliya liis gareeyaa kuwa compatible ah, taasoo ka hortagta khaladaad."
          },
          {
            h: "Encoders & AV Evasion (Educational)",
            p:
            "Encoders (tusaale shikata_ga_nai) waxay obfuscate gareeyaan payload-ka si loo yareeyo signature-based detection — waxaa muhiim ah in la ogaado in AV casriga ahi uu isticmaalo behavior-based detection, encoders keligood kuma filna evasion buuxa."
          }
        ],

        terms: [
          { term: "Stager/Stage", def: "Payload yar (stager) soo dejiya payload weyn (stage)." },
          { term: "Reverse Shell", def: "Shell target-ka ka dirayaa connection attacker-ka." }
        ],

        quiz: [
          {
            q: "Reverse shell waa mid ka badan loo isticmaalo sababtoo ah?",
            options: [
              "Firewalls badanaa waxay xannibaan inbound connections",
              "Waa mid ka gaabis",
              "Ma jiro sabab",
              "Bind shell waligiis wuu adag yahay"
            ],
            answer: 0,
            explain: "Outbound connections badanaa waa mid la oggol yahay firewalls."
          },
          {
            q: "show payloads (kadib use exploit) wuxuu liis gareeyaa?",
            options: [
              "Payloads compatible ah exploit-ka la doortay",
              "Dhammaan payloads jira",
              "Ma jiro filtering",
              "Kaliya reverse shells"
            ],
            answer: 0,
            explain: "Compatibility filtering-ku wuxuu ka hortagaa khaladaad."
          },
          {
            q: "Encoders keligood kuma filna sababtoo ah?",
            options: [
              "AV casriga ahi wuxuu isticmaalaa behavior-based detection",
              "Waligeed way shaqeeyaan",
              "Ma jiro sabab",
              "Encoders marnaba lama isticmaalo"
            ],
            answer: 0,
            explain: "Signature-based evasion oo keliya kuma filna AV casriga ah."
          }
        ],

        exercise: {
          title: "Payload Selection Practice",
          steps: [
            "Sharax farqiga singles, stagers, iyo stages.",
            "Sharax sababta reverse shell loo doorto bind shell.",
            "Sharax sida payload compatibility loo hubiyo.",
            "Sharax xaddidaadaha encoders AV evasion ahaan."
          ],
          deliverable: "Payload selection reference guide."
        }
      },


      {
        slug: "meterpreter-post-exploitation",
        title: "Meterpreter Post-Exploitation",
        english: "Meterpreter Post-Exploitation",
        minutes: 15,

        summary:
          "Sii qoto dheeree Meterpreter commands post-exploitation ah.",

        sections: [
          {
            h: "File System Commands",
            p:
            "pwd/cd/ls (navigation), download/upload (file transfer), search -f *.txt (raadinta files) — dhammaan waxay ka shaqeeyaan memory-ga, aan disk-ka target-ka la taaban si aan la ogaan."
          },
          {
            h: "System Information & Privilege",
            p:
            "sysinfo (OS details), getuid (current user), getprivs (privileges la haysto), iyo getsystem (isku day privilege escalation automatic ah, marar badan kaliya Windows)."
          },
          {
            h: "Screenshot & Webcam (Educational)",
            p:
            "screenshot (qaado sawir screen-ka), webcam_list/webcam_snap (haddii la oggol yahay) — kuwaan waxaa loo isticmaali karaa kaliya authorized engagements gudahood, waxayna bixiyaan evidence impact-ka."
          },
          {
            h: "Pivoting Through Meterpreter",
            p:
            "run autoroute -s 10.10.20.0/24 wuxuu u ogolaadaa attacker inuu 'pivot' gareeyo (ka gudbo) internal network kale oo aan si toos ah loo geli karin — muhiim multi-network engagements ahaan."
          }
        ],

        terms: [
          { term: "getsystem", def: "Meterpreter command isku daya privilege escalation automatic ah." },
          { term: "Pivoting", def: "Ka gudbidda internal network kale iyada oo Meterpreter la isticmaalayo." }
        ],

        quiz: [
          {
            q: "Meterpreter file commands waxay ka shaqeeyaan?",
            options: [
              "Memory-ga, aan disk-ka la taaban si aan la ogaan",
              "Disk-ka oo keliya",
              "Ma jiro farqi",
              "Network-ka oo keliya"
            ],
            answer: 0,
            explain: "In-memory operations way ka fudud yihiin in la ogaado."
          },
          {
            q: "getsystem wuxuu isku dayaa?",
            options: [
              "Privilege escalation automatic ah",
              "Data exfiltration",
              "Ma jiro shaqo",
              "File encryption"
            ],
            answer: 0,
            explain: "Kani waa technique-yo caan ah oo Windows privesc ah isku daya."
          },
          {
            q: "autoroute waxaa loo isticmaalaa?",
            options: [
              "Pivoting internal network kale",
              "File download",
              "Ma jiro isticmaal",
              "Screenshot"
            ],
            answer: 0,
            explain: "Pivoting-ku wuxuu ballaadhiyaa access-ka network-yada kale."
          }
        ],

        exercise: {
          title: "Meterpreter Command Practice",
          steps: [
            "Liis garee 5 file system commands Meterpreter.",
            "Sharax sida getsystem u shaqeeyo (concept ahaan).",
            "Sharax sababta screenshot/webcam kaliya loo isticmaalo authorized.",
            "Sharax sida pivoting loo isticmaali lahaa internal network kale."
          ],
          deliverable: "Meterpreter post-exploitation command reference."
        }
      },


      {
        slug: "metasploit-database-workspace",
        title: "Metasploit Database & Workspace",
        english: "Metasploit Database and Workspace",
        minutes: 12,

        summary:
          "Faham sida database-ka Metasploit loo isticmaalo si loo maareeyo engagement data.",

        sections: [
          {
            h: "Setting Up the Database",
            p:
            "msfdb init wuxuu dejiyaa PostgreSQL database-ka. db_status wuxuu xaqiijiyaa xiriirka. Database-ku wuxuu kaydiyaa hosts, services, vulnerabilities, iyo credentials la helay — muhiim engagement waaweyn ah."
          },
          {
            h: "Workspaces",
            p:
            "workspace -a client_a wuxuu abuuraa workspace cusub — kani wuxuu u oggolaadaa in la kala saaro data engagements kala duwan (client A vs client B), iyada oo aan is-qasin."
          },
          {
            h: "Importing Nmap Results",
            p:
            "db_import scan.xml wuxuu geliyaa natiijooyinka Nmap (XML format) database-ka Metasploit — kani wuxuu u ogolaadaa in la isticmaalo Nmap findings si toos ah modules Metasploit ah, iyada oo aan la scan-gareyn markale."
          },
          {
            h: "Querying Stored Data",
            p:
            "hosts (liis hosts la helay), services (services la helay), vulns (vulnerabilities la aqoonsaday), creds (credentials la helay) — commands-kan waxay u oggolaadaan in la eego data la ururiyay markii kasta."
          }
        ],

        terms: [
          { term: "Workspace", def: "Qayb database ah oo kala saarta data engagements kala duwan." },
          { term: "db_import", def: "Command geliya natiijooyinka scans dibadeed (Nmap) database-ka." }
        ],

        quiz: [
          {
            q: "Workspaces waxay u oggolaadaan?",
            options: [
              "Kala saaridda data engagements kala duwan",
              "Kordhinta speed-ka scanning",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Organization-ku wuxuu ka hortagaa is-qasidda data clients kala duwan."
          },
          {
            q: "db_import scan.xml wuxuu sameeyaa?",
            options: [
              "Geliyaa natiijooyinka Nmap database-ka Metasploit",
              "Tirtiraa database-ka",
              "Ma jiro isticmaal",
              "Sameeyaa backup"
            ],
            answer: 0,
            explain: "Import-ku wuxuu ka hortagaa in markale la scan-gareeyo."
          },
          {
            q: "vulns command-ku wuxuu muujiyaa?",
            options: [
              "Vulnerabilities la aqoonsaday database-ka",
              "Kaliya hosts",
              "Kaliya credentials",
              "Ma jiro macluumaad"
            ],
            answer: 0,
            explain: "Database queries-yadu waxay bixiyaan macluumaad kaydsan."
          }
        ],

        exercise: {
          title: "Database & Workspace Practice",
          steps: [
            "Sharax sida msfdb init loo dejiyo database-ka.",
            "Sharax faa'iidada workspaces engagements badan.",
            "Sharax sida db_import loo isticmaali lahaa Nmap results.",
            "Liis garee 4 commands database queries ah."
          ],
          deliverable: "Metasploit database and workspace guide."
        }
      },


      {
        slug: "msfvenom-custom-payloads",
        title: "msfvenom & Custom Payloads",
        english: "msfvenom and Custom Payloads",
        minutes: 14,

        summary:
          "Faham sida msfvenom loo isticmaalo si loo dhiso custom payloads.",

        sections: [
          {
            h: "msfvenom Syntax",
            p:
            "msfvenom -p [payload] LHOST=[ip] LPORT=[port] -f [format] -o [output] — tusaale: msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.14.5 LPORT=4444 -f exe -o payload.exe."
          },
          {
            h: "Output Formats",
            p:
            "exe (Windows executable), elf (Linux executable), war (Java web app), apk (Android), macho (macOS), raw (bytes oo aan format lahayn) — format-ku wuxuu ku xiran yahay target platform-ka."
          },
          {
            h: "Combining with Encoders",
            p:
            "-e [encoder] -i [iterations] wuxuu ku daraa encoding payload-ka — tusaale -e x86/shikata_ga_nai -i 5 wuxuu 5 jeer encode gareynayaa. Sida hore la sharaxay, encoding oo keliya kuma filna evasion casri ah."
          },
          {
            h: "Legitimate Use Cases",
            p:
            "Custom payloads waxaa loo isticmaalaa authorized penetration testing (tijaabinta AV/EDR detection capability), red team exercises, iyo security tool development — waligeed authorization sharci ah."
          }
        ],

        terms: [
          { term: "msfvenom", def: "Tool lagu dhiso custom payloads Metasploit ah." },
          { term: "Output Format", def: "Nooca file-ka payload-ku noqonayo (exe, elf, apk, iwm)." }
        ],

        quiz: [
          {
            q: "msfvenom syntax-ka, -p flag-ku wuxuu qeexayaa?",
            options: ["Payload-ka la doorto", "Output format-ka", "LHOST-ka", "Encoder-ka"],
            answer: 0,
            explain: "-p waa payload selection."
          },
          {
            q: "-f apk waxaa loo isticmaalaa?",
            options: ["Android target", "Windows target", "Linux target", "macOS target"],
            answer: 0,
            explain: "APK format waa Android application packages."
          },
          {
            q: "Custom payloads waligood waa in ay ku salaysan yihiin?",
            options: [
              "Authorization sharci ah",
              "Ma jiro shuruud",
              "Kaliya educational purposes aan la xaqiijin",
              "Kaliya CTF competitions"
            ],
            answer: 0,
            explain: "Weligeed waa in la haysto authorization ka hor loo isticmaalo."
          }
        ],

        exercise: {
          title: "msfvenom Payload Creation Practice",
          steps: [
            "Qor tusaale msfvenom command ah oo Windows exe payload sameeya.",
            "Sharax farqiga output formats-ka (exe, elf, apk).",
            "Sharax sida encoder loogu daro command-ka.",
            "Liis garee 3 legitimate use cases oo custom payloads ah."
          ],
          deliverable: "msfvenom payload creation reference."
        }
      },


      {
        slug: "resource-scripts-automation",
        title: "Resource Scripts & Automation",
        english: "Resource Scripts and Automation",
        minutes: 13,

        summary:
          "Faham sida resource scripts loo isticmaalo si loo automate gareeyo Metasploit workflows.",

        sections: [
          {
            h: "Waa Maxay Resource Scripts?",
            p:
            "Resource scripts (.rc files) waa liis amarro msfconsole ah oo la fulin karo si otomaatig ah — msfconsole -r script.rc wuxuu bilaabaa msfconsole isaga oo fulinaya amarrada script-ka gudihiisa."
          },
          {
            h: "Automating Repetitive Tasks",
            p:
            "Tusaale resource script: use exploit/X, set RHOSTS Y, set PAYLOAD Z, exploit -j (background job) — waxaa loo isticmaali karaa in la automate gareeyo exploit isla mid ah oo la fuliyo targets badan."
          },
          {
            h: "Chaining Modules with Scripts",
            p:
            "Resource scripts waxay u oggolaadaan in la isku xiro auxiliary scan → exploit → post-exploitation modules hal script ah, iyada oo aan loo baahnayn in la geliyo amarro gacanta ah mid kasta."
          },
          {
            h: "Ruby Scripting (Advanced)",
            p:
            "Resource scripts waxay taageeraan Ruby code (marka la bilaabo <ruby> tag) — kani wuxuu u ogolaadaa logic complex ah (loops, conditionals) oo ka baxsan amarro fudud oo isku xigxiga ah."
          }
        ],

        terms: [
          { term: "Resource Script", def: "File (.rc) ah oo liis amarro msfconsole ah, la automate gareyn karo." }
        ],

        quiz: [
          {
            q: "msfconsole -r script.rc wuxuu sameeyaa?",
            options: [
              "Bilaabaa msfconsole isaga oo fulinaya amarrada script-ka",
              "Tirtiraa database-ka",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Automation-ku wuxuu yareeyaa waqtiga la qaato repetitive tasks."
          },
          {
            q: "Resource scripts waxay u oggolaadaan?",
            options: [
              "Isku xirka auxiliary → exploit → post-exploitation hal script ah",
              "Kaliya hal module fulinta",
              "Ma jiro chaining",
              "Kaliya database queries"
            ],
            answer: 0,
            explain: "Chaining-ku wuxuu automate gareeyaa workflows dhamaystiran."
          },
          {
            q: "Ruby scripting (<ruby> tag) wuxuu u oggolaadaa?",
            options: [
              "Logic complex ah (loops, conditionals)",
              "Kaliya amarro fudud",
              "Ma jiro faa'iido",
              "Kaliya database access"
            ],
            answer: 0,
            explain: "Ruby-gu wuxuu bixiyaa awood dheeraad ah resource scripts-ka."
          }
        ],

        exercise: {
          title: "Resource Script Practice",
          steps: [
            "Qor tusaale resource script ah (concept ahaan) oo exploit isku mid ah u automate gareeya 3 targets.",
            "Sharax sida chaining loo sameeyo auxiliary → exploit → post.",
            "Sharax faa'iidada Ruby scripting resource scripts gudahood.",
            "Sharax scenario ah oo automation-ku uu waqti badan kaa keydin lahaa."
          ],
          deliverable: "Resource scripts automation guide."
        }
      },


      {
        slug: "metasploit-capstone-full-engagement",
        title: "Metasploit Capstone: Full Engagement",
        english: "Metasploit Capstone: Full Engagement",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay — naqshadee full Metasploit engagement heer sare ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad qaadanaysaa authorized internal pentest lab environment ah. Waa in aad isticmaasho Metasploit si buuxda — laga bilaabo recon ilaa post-exploitation, iyadoo la isticmaalayo database/workspace organization."
          },
          {
            h: "Recon & Database Setup",
            p:
            "Naqshadee workspace cusub, import Nmap results, oo isticmaal auxiliary scanners si loo helo faahfaahin dheeraad ah."
          },
          {
            h: "Exploitation Planning",
            p:
            "Iyadoo lagu saleynayo findings-ka, xulo exploit + payload ku habboon (reverse shell, architecture-matched)."
          },
          {
            h: "Post-Exploitation & Documentation",
            p:
            "Isticmaal Meterpreter si loo aqoonsado impact-ka (sysinfo, getuid, file access). Isku dar dhammaan findings-ka database-ka gudihiisa, oo diyaari warbixin."
          }
        ],

        terms: [
          { term: "Full Metasploit Engagement", def: "Habraaca isugu jira database, exploitation, iyo post-exploitation." }
        ],

        quiz: [
          {
            q: "Engagement-ka, tallaabada koowaad waa?",
            options: [
              "Naqshadaynta workspace + database import",
              "Isla markiiba exploitation",
              "Warbixinta",
              "msfvenom payload creation"
            ],
            answer: 0,
            explain: "Organization-ku wuxuu taageeraa engagement oo dhan."
          },
          {
            q: "Payload selection-ku waa in uu ku salaysan yahay?",
            options: [
              "Architecture-matched (x86/x64) iyo platform (windows/linux)",
              "Kaliya reverse shell marwalba",
              "Ma jiro shuruud",
              "Kaliya bind shell"
            ],
            answer: 0,
            explain: "Compatibility-gu wuxuu ka hortagaa khaladaad exploitation."
          },
          {
            q: "Post-exploitation documentation-ku waa in uu ku jiro?",
            options: [
              "sysinfo, getuid, files la helay — impact-ka la caddeeyo",
              "Kaliya magaca exploit-ka",
              "Ma jiro shuruud",
              "Kaliya waqtiga la qaatay"
            ],
            answer: 0,
            explain: "Evidence-ku waa muhiim si loo caddeeyo impact-ka dhabta ah."
          },
        ],

        exercise: {
          title: "Full Metasploit Engagement Simulation",
          steps: [
            "Naqshadee workspace + database import plan.",
            "Sharax auxiliary scanners aad isticmaali lahayd recon dheeraad ah.",
            "Xulo exploit + payload scenario-ga ku habboon, sharax sababta.",
            "Naqshadee post-exploitation checklist (Meterpreter commands) + documentation plan (portfolio-ready)."
          ],
          deliverable: "Full Metasploit engagement report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "td-cyberchef",
    slug: "cyberchef-deep-dive",
    stage: "Dhexe",
    title: "CyberChef Deep Dive",
    english: "CyberChef Deep Dive",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa CyberChef — encoding/decoding, encryption/hashing, regex extraction, iyo malware analysis recipes.",

    topics: [
      "CyberChef Interface & Recipe Basics",
      "Encoding & Decoding Operations",
      "Encryption & Hashing Operations",
      "Data Format Conversion",
      "Regex Extraction in CyberChef",
      "Malware Analysis with CyberChef",
      "Building Complex Recipes",
      "CyberChef Capstone: Decode Challenge",
    ],

    lessonList: [

      {
        slug: "cyberchef-interface-recipe-basics",
        title: "CyberChef Interface & Recipe Basics",
        english: "CyberChef Interface and Recipe Basics",
        minutes: 12,

        summary:
          "Faham interface-ka CyberChef iyo mabaadi'da asaasiga ah ee 'recipes'.",

        sections: [
          {
            h: "Waa Maxay CyberChef?",
            p:
            "CyberChef waa 'Cyber Swiss Army Knife' — web app bilaash ah (GCHQ ka sameeyay) oo bixiya operations badan (encoding, encryption, hashing, compression) oo la isku dhufan karo 'recipes' ahaan, aan koodh la baahnayn."
          },
          {
            h: "Interface Layout",
            p:
            "Operations (bidix, liis dhammaan operations available ah), Recipe (bar dhexe, operations la doortay isku xigxig), Input (kore midig, xogta la geliyayo), Output (hoose midig, natiijada)."
          },
          {
            h: "Building a Simple Recipe",
            p:
            "Drag operation (tusaale 'From Base64') Operations-ka Recipe-ga — geli xogta encoded ah Input-ka, Output-ku wuxuu si toos ah (real-time) u muujiyaa natiijada, aan la baahnayn 'Run' button run-run ah."
          },
          {
            h: "Saving & Loading Recipes",
            p:
            "Recipes waxaa lagu kaydin karaa (save icon) URL-ka Recipe-ga si loo wadaago, ama loo kaydiyo favorites-ka. Kani wuxuu u ogolaadaa in la dib-u-isticmaalo recipes badan la isticmaalo."
          }
        ],

        terms: [
          { term: "Recipe", def: "Isku xigxiga operations CyberChef ah, la isku dhufan karo." },
          { term: "Operations", def: "Individual functions (encode, hash, iwm) CyberChef bixiso." }
        ],

        quiz: [
          {
            q: "CyberChef waa?",
            options: [
              "Web app bilaash ah oo bixiya operations encoding/encryption",
              "Malware nooc ah",
              "Network scanner",
              "Password manager"
            ],
            answer: 0,
            explain: "'Cyber Swiss Army Knife' waa magaca lagu yaqaan CyberChef."
          },
          {
            q: "Recipe-gu waa?",
            options: [
              "Isku xigxiga operations la isku dhufan karo",
              "Kaliya hal operation",
              "Ma jiro macno",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Operations badan waxaa lagu isku dari karaa recipe hal ah."
          },
          {
            q: "Output-ku CyberChef ahaan wuxuu?",
            options: [
              "Si toos ah (real-time) u muujiyaa natiijada",
              "U baahan yahay 'Run' button",
              "Ma jiro output",
              "Kaliya loo isticmaalo save"
            ],
            answer: 0,
            explain: "Real-time updates-ku waa mid ka mid ah faa'iidooyinka CyberChef."
          }
        ],

        exercise: {
          title: "CyberChef First Recipe",
          steps: [
            "Fur CyberChef (browser-ka).",
            "Dhis recipe fudud oo 'From Base64' isticmaala.",
            "Geli text Base64-encoded ah, eeg output-ka.",
            "Sharax sida recipe loo kaydin lahaa dib u isticmaal ahaan."
          ],
          deliverable: "First CyberChef recipe screenshot."
        }
      },


      {
        slug: "encoding-decoding-operations",
        title: "Encoding & Decoding Operations",
        english: "Encoding and Decoding Operations",
        minutes: 14,

        summary:
          "Faham operations-ka encoding/decoding ee ugu badan la isticmaalo forensics/malware analysis.",

        sections: [
          {
            h: "Base64 & Base32",
            p:
            "From/To Base64 waa operations-ka ugu badan la isticmaalo — malware/attackers waxay isticmaalaan Base64 si ay u qariyaan strings (URLs, commands) detection tools fudud ah. Base32 waa mid ka yar caan, laakiin la mid ah."
          },
          {
            h: "Hex & URL Encoding",
            p:
            "From/To Hex waa muhiim malware analysis ahaan (byte sequences). URL Decode wuxuu furaa %XX encoded characters (tusaale %20 = space) — muhiim marka la falanqeynayo URLs suspicious ah."
          },
          {
            h: "ROT13 & Caesar Cipher",
            p:
            "ROT13 waa cipher fudud (Registry UserAssist keys AWS isticmaasho, sida aad hore u baratay). ROT13 Brute Force wuxuu isku dayaa dhammaan rotations 26-ka ah, muhiim marka aan la hubin nooca cipher-ka."
          },
          {
            h: "Chaining Multiple Encodings",
            p:
            "Malware badan wuxuu isticmaalaa layers badan (Base64 → Hex → Base64 dib mar kale) si loo qariyo — CyberChef-ka Recipe-gu wuxuu u ogolaadaa in la isku daro operations badan si loo furo layer kasta isku xigxig ah."
          }
        ],

        terms: [
          { term: "Base64", def: "Encoding scheme ah oo binary data u beddela text." },
          { term: "ROT13", def: "Cipher fudud oo letters 13 meel u wareejiya." }
        ],

        quiz: [
          {
            q: "Attackers waxay isticmaalaan Base64 sababtoo ah?",
            options: [
              "Si ay u qariyaan strings detection tools fudud ah",
              "Waa mid encryption ah oo xoog leh",
              "Ma jiro sabab",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Base64 waa encoding, ma aha encryption — waxay kaliya qariyaan aragti fudud."
          },
          {
            q: "ROT13 Brute Force wuxuu isku dayaa?",
            options: [
              "Dhammaan rotations 26-ka ah",
              "Kaliya hal rotation",
              "Ma jiro isku day",
              "Kaliya Base64"
            ],
            answer: 0,
            explain: "Brute force-ku wuxuu tijaabiyaa dhammaan possibilities marka aan la hubin."
          },
          {
            q: "Malware layers badan (Base64 → Hex → Base64) waxay u baahan yihiin?",
            options: [
              "Isku darka operations badan CyberChef Recipe gudihiisa",
              "Kaliya hal operation",
              "Ma jiro hab loo furo",
              "Kaliya manual decoding"
            ],
            answer: 0,
            explain: "Chaining-ku wuxuu u ogolaadaa furitaanka layer kasta si isku xigxig ah."
          }
        ],

        exercise: {
          title: "Encoding/Decoding Practice",
          steps: [
            "Dhis recipe furaya Base64 string tusaale ah.",
            "Isticmaal From Hex string hex-encoded ah.",
            "Isticmaal ROT13, sharax marka loo isticmaali lahaa Brute Force.",
            "Naqshadee recipe chained ah (Base64 → Hex) tusaale ah."
          ],
          deliverable: "Encoding/decoding operations practice notes."
        }
      },


      {
        slug: "encryption-hashing-operations",
        title: "Encryption & Hashing Operations",
        english: "Encryption and Hashing Operations",
        minutes: 13,

        summary:
          "Faham operations-ka encryption/hashing CyberChef gudihiisa.",

        sections: [
          {
            h: "Hashing Operations",
            p:
            "MD5, SHA1, SHA256 operations waxay soo saaraan hash values file/text ah — muhiim marka la baarayo malware (hash comparison threat intel-ka), ama xaqiijinta integrity file-ka."
          },
          {
            h: "AES Encrypt/Decrypt",
            p:
            "AES Encrypt/Decrypt operations waxay u ogolaadaan encryption/decryption AES key la yaqaan — malware analysts waxay isticmaalaan kani marka ay helaan encryption keys malware sample-ka ka soo baxay."
          },
          {
            h: "XOR Operations",
            p:
            "XOR waa operation caan ah oo malware isticmaalo obfuscation ahaan (fudud, xawli sare leh). XOR Brute Force wuxuu isku dayaa keys yaryar (1-4 bytes) si loo furo XOR-obfuscated data aan key-giisa la ogeyn."
          },
          {
            h: "Detecting Hash Types",
            p:
            "'Detect Hash' operation-ku wuxuu isku dayaa inuu aqoonsado nooca hash-ka (MD5=32 chars, SHA1=40 chars, SHA256=64 chars) iyadoo lagu saleynayo dherer-ka string-ka la geliyay."
          }
        ],

        terms: [
          { term: "XOR Brute Force", def: "Isku daygga keys yaryar si loo furo XOR-obfuscated data." },
          { term: "AES", def: "Advanced Encryption Standard — encryption algorithm caan ah." }
        ],

        quiz: [
          {
            q: "Hashing operations waxaa loo isticmaalaa?",
            options: [
              "Xaqiijinta integrity ama comparison threat intel-ka",
              "Encrypt gareynta xogta si dib loogu furo",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo compression"
            ],
            answer: 0,
            explain: "Hashing waa one-way, ma aha reversible sida encryption."
          },
          {
            q: "XOR waa operation caan ah malware ahaan sababtoo ah?",
            options: [
              "Fudud, xawli sare leh obfuscation ahaan",
              "Waa mid adag oo xoog leh",
              "Ma jiro sabab",
              "Kaliya loo isticmaalo compression"
            ],
            answer: 0,
            explain: "XOR-ku wuxuu bixiyaa obfuscation degdeg ah, ma aha security dhab ah."
          },
          {
            q: "Detect Hash operation-ku wuxuu ku salaysan yahay?",
            options: [
              "Dherer-ka string-ka la geliyay (32/40/64 chars)",
              "Content-ka string-ka",
              "Ma jiro hab la aqoonsado",
              "Kaliya manual identification"
            ],
            answer: 0,
            explain: "Hash types-ku waxay leeyihiin dherer standard ah."
          }
        ],

        exercise: {
          title: "Encryption/Hashing Practice",
          steps: [
            "Xisaabi SHA256 hash text tusaale ah.",
            "Sharax marka AES Decrypt loo isticmaali lahaa (key la yaqaan).",
            "Sharax habka XOR Brute Force u shaqeeyo.",
            "Isticmaal Detect Hash hash tusaale ah, xaqiiji nooca."
          ],
          deliverable: "Encryption and hashing operations notes."
        }
      },


      {
        slug: "data-format-conversion",
        title: "Data Format Conversion",
        english: "Data Format Conversion",
        minutes: 12,

        summary:
          "Faham sida CyberChef loo isticmaalo data formats kala duwan dhexdooda beddelidda.",

        sections: [
          {
            h: "JSON Beautify/Minify",
            p:
            "JSON Beautify wuxuu ka dhigayaa JSON minified ah mid akhrin fudud leh (indentation, line breaks). Minify-gu wuxuu sameeyaa lidka — muhiim marka la falanqeynayo API responses ama config files."
          },
          {
            h: "CSV to JSON & Table Operations",
            p:
            "CSV to JSON wuxuu beddelaa CSV data format JSON ah — muhiim marka la falanqeynayo logs export-gareeyay CSV ahaan oo loo baahan yahay format structured ah analysis dheeraad ah."
          },
          {
            h: "Timestamp Conversion",
            p:
            "From/To UNIX Timestamp waxay beddesha Unix epoch time (tirooyin) date/time la akhriyi karo — muhiim forensics ahaan marka la falanqeynayo logs leh timestamps raw ah."
          },
          {
            h: "IP Address Operations",
            p:
            "Parse IPv4/IPv6 address, IP address to hex, iyo change IP format waxay caawiyaan marka la falanqeynayo logs leh IP addresses formats kala duwan (hex-encoded, decimal, standard notation)."
          }
        ],

        terms: [
          { term: "UNIX Timestamp", def: "Tirooyin tilmaamaya waqti (seconds since 1970)." },
          { term: "JSON Beautify", def: "Ka dhigidda JSON minified ah mid akhrin fudud leh." }
        ],

        quiz: [
          {
            q: "From UNIX Timestamp waxay beddeshaa?",
            options: [
              "Epoch time (tirooyin) → date/time la akhriyi karo",
              "Date → epoch time",
              "Ma jiro beddelaad",
              "Kaliya loo isticmaalo JSON"
            ],
            answer: 0,
            explain: "From wuxuu ka soo saaraa human-readable format tirada."
          },
          {
            q: "CSV to JSON waxaa loo isticmaalaa?",
            options: [
              "Beddelidda CSV data format structured JSON ah",
              "Encrypt gareynta CSV",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Format structured ah wuxuu fududeeyaa analysis dheeraad ah."
          },
          {
            q: "IP address operations waxay caawiyaan?",
            options: [
              "Falanqaynta logs IP addresses formats kala duwan leh",
              "Ma jiro faa'iido",
              "Kaliya encryption",
              "Kaliya loo isticmaalo hashing"
            ],
            answer: 0,
            explain: "Formats kala duwan (hex, decimal) waxay u baahan yihiin conversion."
          }
        ],

        exercise: {
          title: "Data Format Conversion Practice",
          steps: [
            "Isticmaal JSON Beautify JSON minified tusaale ah.",
            "Isticmaal From UNIX Timestamp epoch time tusaale ah.",
            "Isticmaal CSV to JSON qayb CSV data ah.",
            "Sharax marka IP address operations loo isticmaali lahaa."
          ],
          deliverable: "Data format conversion practice notes."
        }
      },


      {
        slug: "regex-extraction-cyberchef",
        title: "Regex Extraction in CyberChef",
        english: "Regex Extraction in CyberChef",
        minutes: 14,

        summary:
          "Faham sida regular expressions loo isticmaalo si loo soo saaro xog gaar ah data waaweyn gudahood.",

        sections: [
          {
            h: "Extract IP Addresses",
            p:
            "Extract IP Addresses operation-ku wuxuu si automatic ah uga soo saaraa dhammaan IPv4/IPv6 addresses text weyn gudaheeda — muhiim marka la falanqeynayo logs weyn oo IOCs loo baahan yahay."
          },
          {
            h: "Extract Emails & URLs",
            p:
            "Extract Email Addresses iyo Extract URLs waxay si isku mid ah uga soo saaraan pattern-yada la yaqaan text-ka — muhiim marka la falanqeynayo phishing emails ama malware configs."
          },
          {
            h: "Custom Regex with 'Regular Expression' Operation",
            p:
            "Regular Expression operation-ku wuxuu u ogolaadaa custom patterns (tusaale [A-Fa-f0-9]{32} — MD5 hash pattern) — flexibility-kani wuxuu u ogolaadaa extraction xog aan operations built-in ah lahayn."
          },
          {
            h: "Extract Hashes",
            p:
            "Extract Hashes operation-ku wuxuu si automatic ah u aqoonsadaa oo soo saaraa hash values (MD5/SHA1/SHA256) text weyn gudaheeda — muhiim marka la falanqeynayo malware reports ama IOC lists."
          }
        ],

        terms: [
          { term: "Regular Expression (Regex)", def: "Pattern lagu raadiyo/soo saaro xog gaar ah text gudaheeda." },
          { term: "IOC Extraction", def: "Soo saarista Indicators of Compromise (IPs, hashes, domains) text weyn." }
        ],

        quiz: [
          {
            q: "Extract IP Addresses operation-ku wuxuu sameeyaa?",
            options: [
              "Si automatic ah uga soo saaraa dhammaan IP addresses text-ka",
              "Encrypt gareeyaa IPs",
              "Ma jiro isticmaal",
              "Kaliya IPv4"
            ],
            answer: 0,
            explain: "Automation-ku wuxuu dedejinayaa IOC extraction."
          },
          {
            q: "[A-Fa-f0-9]{32} regex pattern-ku wuxuu u dhigmaa?",
            options: ["MD5 hash", "SHA256 hash", "IP address", "Email address"],
            answer: 0,
            explain: "MD5 waa 32 hex characters."
          },
          {
            q: "Extract Hashes operation-ku muhiim u yahay marka?",
            options: [
              "La falanqeynayo malware reports/IOC lists",
              "Kaliya loo isticmaalo backup",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo network scanning"
            ],
            answer: 0,
            explain: "Automation-ku wuxuu yareeyaa manual extraction waqtiga."
          }
        ],

        exercise: {
          title: "Regex Extraction Practice",
          steps: [
            "Isticmaal Extract IP Addresses text sample ah oo IPs badan leh.",
            "Isticmaal Extract Emails/URLs text tusaale ah.",
            "Qor custom regex pattern MD5 hash u dhigma.",
            "Isticmaal Extract Hashes report malware tusaale ah."
          ],
          deliverable: "Regex extraction practice notes."
        }
      },


      {
        slug: "malware-analysis-with-cyberchef",
        title: "Malware Analysis with CyberChef",
        english: "Malware Analysis with CyberChef",
        minutes: 15,

        summary:
          "Faham sida CyberChef loo isticmaalo static malware analysis workflows.",

        sections: [
          {
            h: "Deobfuscating PowerShell Scripts",
            p:
            "PowerShell malware badanaa wuxuu isticmaalaa -EncodedCommand (Base64). Recipe: From Base64 → Decode text (UTF-16LE, sababtoo ah PowerShell wuxuu isticmaalaa UTF-16) wuxuu furaa script-ka asalka ah."
          },
          {
            h: "Extracting Strings from Binaries",
            p:
            "Extract Strings operation-ku (min length threshold) wuxuu ka soo saaraa human-readable strings binary files raw ahaan — muhiim marka la baarayo malware samples si loo helo C2 URLs, file paths, ama error messages."
          },
          {
            h: "Analyzing Malicious Documents",
            p:
            "Office documents (macros) badanaa waxay ku qariyaan payloads VBA macros gudahood — CyberChef-ka waxaa loo isticmaali karaa in la falanqeeyo strings/encoded content laga soo saaray macro-yada (kadib extraction tool kale)."
          },
          {
            h: "Building a Malware Triage Recipe",
            p:
            "Recipe tusaale ah: Extract Strings → Extract URLs → Extract IP Addresses → Extract Hashes — hal recipe ah oo dhammaystiran, oo si degdeg ah kaa siinaya IOCs muhiimka ah sample-ka."
          }
        ],

        terms: [
          { term: "Deobfuscation", def: "Ka saarista qarinta (obfuscation) code-ka si loo arko asalka." },
          { term: "Malware Triage Recipe", def: "Recipe isku daraya operations badan si loo helo IOCs degdeg ah." }
        ],

        quiz: [
          {
            q: "PowerShell -EncodedCommand deobfuscation-ku wuxuu u baahan yahay?",
            options: [
              "From Base64 → Decode text (UTF-16LE)",
              "Kaliya From Base64",
              "Kaliya XOR",
              "Ma jiro recipe loo baahan yahay"
            ],
            answer: 0,
            explain: "PowerShell-ku wuxuu isticmaalaa UTF-16 encoding, u baahan step dheeraad ah."
          },
          {
            q: "Extract Strings operation-ku wuxuu ka soo saaraa?",
            options: [
              "Human-readable strings binary raw ah",
              "Kaliya IP addresses",
              "Ma jiro isticmaal",
              "Kaliya JSON data"
            ],
            answer: 0,
            explain: "Strings-ku waxay bixiyaan macluumaad qiimo leh sida C2 URLs."
          },
          {
            q: "Malware triage recipe (Extract Strings → URLs → IPs → Hashes) wuxuu bixiyaa?",
            options: [
              "IOCs muhiimka ah sample-ka si degdeg ah",
              "Kaliya hal IOC type",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo encoding"
            ],
            answer: 0,
            explain: "Recipe hal ah wuxuu dhammaystiraa analysis degdeg ah."
          }
        ],

        exercise: {
          title: "Malware Triage Recipe Building",
          steps: [
            "Naqshadee recipe deobfuscate gareeya PowerShell -EncodedCommand.",
            "Sharax sida Extract Strings loo isticmaali lahaa binary sample.",
            "Dhis malware triage recipe (Extract Strings → URLs → IPs → Hashes).",
            "Sharax sida recipe-kan loo isticmaali lahaa sample dhab ah."
          ],
          deliverable: "Malware analysis CyberChef recipe collection."
        }
      },


      {
        slug: "building-complex-recipes",
        title: "Building Complex Recipes",
        english: "Building Complex Recipes",
        minutes: 13,

        summary:
          "Faham sida recipes complex ah loo naqshadeeyo — conditional logic iyo forking.",

        sections: [
          {
            h: "Fork Operation",
            p:
            "Fork operation-ku wuxuu u kala qaybiyaa input-ka (iyadoo lagu saleynayo delimiter, tusaale newline) qaybo, kadibna wuxuu dabaqaa operations-ka soo socda hal kasta si gooni ah — muhiim marka la falanqeynayo liis xog ah (IOCs badan)."
          },
          {
            h: "Subsection Operation",
            p:
            "Subsection wuxuu u oggolaadaa in operations la dabaqo kaliya qayb ka mid ah input-ka (regex la match gareeyay), halkii dhammaan input-ka la beddeli lahaa — muhiim precision editing ahaan."
          },
          {
            h: "Register Operation",
            p:
            "Register wuxuu 'xasuustaa' xog laga soo saaray step hore (regex capture group), loona isticmaali karo steps dambe recipe-ga gudihiisa — u ogolaanaya logic dynamic ah recipes-ka."
          },
          {
            h: "Comments & Documentation in Recipes",
            p:
            "Comment operation-ku wuxuu u ogolaadaa in lagu daro sharraxaad recipe-ga gudihiisa (aan saameynayn output-ka) — muhiim marka la wadaagayo recipes complex ah team members kale."
          }
        ],

        terms: [
          { term: "Fork", def: "Operation u kala qaybisa input qaybo, dabaqa operations mid kasta." },
          { term: "Register", def: "Operation xasuusta xog laga soo saaray, loo isticmaalo steps dambe." }
        ],

        quiz: [
          {
            q: "Fork operation-ku wuxuu sameeyaa?",
            options: [
              "U kala qaybiyaa input qaybo, dabaqa operations mid kasta",
              "Isku daraa input-ka oo dhan",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo hashing"
            ],
            answer: 0,
            explain: "Fork-ku muhiim u yahay liis xog ah oo kala duwan."
          },
          {
            q: "Register operation-ku wuxuu u ogolaadaa?",
            options: [
              "Xasuusidda xog si loo isticmaalo steps dambe",
              "Tirtirida xogta",
              "Ma jiro faa'iido",
              "Kaliya encryption"
            ],
            answer: 0,
            explain: "Dynamic logic-ku wuxuu u baahan yahay xasuusin xog."
          },
          {
            q: "Subsection operation-ku waxaa loo isticmaalaa?",
            options: [
              "Dabaqidda operations kaliya qayb ka mid ah input-ka",
              "Dabaqidda operations input-ka oo dhan",
              "Ma jiro farqi Fork",
              "Kaliya loo isticmaalo hashing"
            ],
            answer: 0,
            explain: "Precision-ku wuxuu u baahan yahay Subsection halkii dhammaan la beddelo."
          }
        ],

        exercise: {
          title: "Complex Recipe Building",
          steps: [
            "Naqshadee recipe Fork isticmaala liis IPs ah (newline-separated).",
            "Sharax marka Subsection loo isticmaali lahaa.",
            "Sharax habka Register uu u shaqeeyo (concept ahaan).",
            "Ku dar comments recipe-gaaga sharraxaad ah."
          ],
          deliverable: "Complex recipe building notes."
        }
      },


      {
        slug: "cyberchef-capstone-decode-challenge",
        title: "CyberChef Capstone: Decode Challenge",
        english: "CyberChef Capstone: Decode Challenge",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay — samee full decode challenge oo layers badan leh.",

        sections: [
          {
            h: "Scenario",
            p:
            "Malware analyst-ku wuxuu kaa siiyay string obfuscated ah oo laga soo saaray malware sample. Waa in aad furto layers-ka oo dhan si aad u hesho IOCs asalka ah (C2 IP:port ama domain)."
          },
          {
            h: "Layer Identification",
            p:
            "Aqoonso layer kasta (Base64? Hex? XOR?) iyadoo lagu eegayo pattern-ka string-ka — Base64 wuxuu isticmaalaa A-Z, a-z, 0-9, +/=. Hex wuxuu isticmaalaa 0-9, A-F oo keliya."
          },
          {
            h: "Building the Full Recipe",
            p:
            "Isku dar operations-ka si isku xigxig ah (tusaale From Base64 → From Hex) ilaa aad hesho output cad oo akhrin fudud leh — output-ku badanaa waa IP:port ama URL C2 ah."
          },
          {
            h: "Documenting the Decode Process",
            p:
            "Qor recipe-ga buuxa (operations tartiibkooda), IOC-ga la helay, iyo sharraxaad sababta layer kasta loo doortay — kani wuxuu u adeegaa qof kale inuu dib u sameeyo furitaanka isla natiijada."
          }
        ],

        terms: [
          { term: "Layer Identification", def: "Aqoonsiga nooca encoding/encryption kasta layer-ka gudihiisa." }
        ],

        quiz: [
          {
            q: "Base64 string-ku wuxuu isticmaalaa characters?",
            options: ["A-Z, a-z, 0-9, +/=", "Kaliya 0-9", "Kaliya A-F", "Ma jiro pattern"],
            answer: 0,
            explain: "Base64 alphabet-ku waa standard-ka la aqoonsan karo."
          },
          {
            q: "Documentation-ka decode process-ka muhiim u yahay sababtoo ah?",
            options: [
              "Qof kale wuxuu dib u sameyn karaa isla natiijada",
              "Ma jiro sabab",
              "Kaliya loo baahan yahay compliance",
              "Kordhinta speed oo keliya"
            ],
            answer: 0,
            explain: "Reproducibility-ku waa muhiim forensics/malware analysis ahaan."
          },
          {
            q: "IOC-ga (C2 IP:port) la helay kadib decode-ka waa in uu ku jiro?",
            options: [
              "Warbixinta ugu dambaysa, si loo isticmaalo containment/detection",
              "Kaliya recipe-ga la isticmaalay",
              "Ma jiro shuruud",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "IOCs-ku waa natiijada qiimaha leh ee decode process-ka."
          },
        ],

        exercise: {
          title: "Full Decode Challenge",
          steps: [
            "Aqoonso layer-ka koowaad ee string-ka obfuscated (pattern recognition).",
            "Dhis recipe furaya layer-kaas.",
            "Sii wad ilaa aad hesho output cad (IOC).",
            "Diyaari documentation buuxa oo recipe + IOC + sababaha leh (portfolio-ready)."
          ],
          deliverable: "Full CyberChef decode challenge writeup (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "td-splunk",
    slug: "splunk-siem-fundamentals-deep-dive",
    stage: "Sare",
    title: "Splunk / SIEM Fundamentals Deep Dive",
    english: "Splunk / SIEM Fundamentals Deep Dive",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa Splunk architecture, SPL search language, dashboards, alerts, iyo data onboarding.",

    topics: [
      "Splunk Architecture Overview",
      "SPL: Search Processing Language Basics",
      "Splunk Fields & Extraction",
      "Splunk Statistical Commands",
      "Building Splunk Dashboards",
      "Splunk Alerts & Correlation Searches",
      "Splunk Data Onboarding",
      "Splunk Capstone: Investigation",
    ],

    lessonList: [

      {
        slug: "splunk-architecture-overview",
        title: "Splunk Architecture Overview",
        english: "Splunk Architecture Overview",
        minutes: 13,

        summary:
          "Faham qaab-dhismeedka Splunk — indexers, forwarders, iyo search heads.",

        sections: [
          {
            h: "Waa Maxay Splunk?",
            p:
            "Splunk waa SIEM (Security Information and Event Management) platform caan ah oo la ururiyo, la falanqeeyo, oo la muuqdo machine data (logs) — waa mid ka mid ah tools-ka ugu badan la isticmaalo SOC industry-ga."
          },
          {
            h: "Forwarders",
            p:
            "Universal Forwarder waa agent light-weight ah oo ku shaqeeya endpoints/servers, kaas oo diraya logs Splunk indexer-ka. Heavy Forwarder wuxuu bixiyaa parsing/filtering dheeraad ah ka hor la diro."
          },
          {
            h: "Indexers",
            p:
            "Indexer-ku wuxuu kaydiyaa oo index gareeyaa data-ha soo socda — indexing-ku wuxuu ka dhigayaa search-ka mid dhaqso badan, iyada oo aan la baahnayn in la scan-gareeyo raw logs marka la search gareeyo."
          },
          {
            h: "Search Heads",
            p:
            "Search Head-ku waa interface-ka user-ku ku search gareeyo oo ku dhiso dashboards — deployments waaweyn waxay isticmaalaan Search Head Cluster (SHC) si loo maareeyo load-ka users badan."
          }
        ],

        terms: [
          { term: "Forwarder", def: "Agent diraya logs endpoint/server ka Splunk indexer-ka." },
          { term: "Indexer", def: "Component kaydiya oo index gareeya data-ha soo socda." }
        ],

        quiz: [
          {
            q: "Universal Forwarder waa?",
            options: [
              "Agent light-weight ah oo diraya logs",
              "Interface-ka search-ka",
              "Database storage",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "Forwarder-ku wuxuu ku shaqeeyaa endpoints, ma aha search interface."
          },
          {
            q: "Indexing-ku wuxuu ka dhigayaa search-ka?",
            options: [
              "Mid dhaqso badan, aan la baahnayn scan raw logs",
              "Mid ka gaabis",
              "Ma jiro saameyn",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Index structure-ku wuxuu dedejinayaa retrieval-ka data-ha."
          },
          {
            q: "Search Head Cluster (SHC) waxaa loo isticmaalaa?",
            options: [
              "Maamulka load-ka users badan deployments waaweyn",
              "Kaliya hal user",
              "Ma jiro isticmaal",
              "Kaliya storage"
            ],
            answer: 0,
            explain: "SHC-du waxay ballaadhinaysaa search capacity-ga."
          }
        ],

        exercise: {
          title: "Splunk Architecture Review",
          steps: [
            "Sharax farqiga Universal iyo Heavy Forwarder.",
            "Sharax doorka Indexer-ka.",
            "Sharax doorka Search Head-ka.",
            "Naqshadee diagram fudud oo saddexda component isku xira."
          ],
          deliverable: "Splunk architecture overview notes."
        }
      },


      {
        slug: "spl-search-processing-language-basics",
        title: "SPL: Search Processing Language Basics",
        english: "SPL: Search Processing Language Basics",
        minutes: 15,

        summary:
          "Faham syntax-ka aasaasiga ah ee SPL — search commands iyo pipes.",

        sections: [
          {
            h: "Basic Search Syntax",
            p:
            "index=main sourcetype=access_combined status=404 wuxuu raadiyaa events index 'main' ah, sourcetype gaar ah, iyo status code 404 — search terms multiple waxaa si otomaatig ah loo isku daraa (AND implicit)."
          },
          {
            h: "The Pipe (|) Operator",
            p:
            "SPL wuxuu isticmaalaa pipes (|) si loo isku xiro commands isku xigxig ah — natiijada command hore waxay noqotaa input-ka command xigga, la mid ah Unix pipes."
          },
          {
            h: "Time Range Selection",
            p:
            "Time range picker-ka (kore midig) wuxuu xaddidaa waqtiga la search gareynayo — earliest=-24h latest=now waxaa lagu qori karaa search-ka gudihiisa toos ahaan, halkii la isticmaali lahaa UI picker-ka."
          },
          {
            h: "Boolean Operators & Wildcards",
            p:
            "AND/OR/NOT waxaa si toos ah loo isticmaali karaa (AND-ku waa default). Wildcards (*) waxay u oggolaadaan pattern matching (tusaale error* wuxuu u dhigmaa error, errors, error_log)."
          }
        ],

        terms: [
          { term: "SPL", def: "Search Processing Language — query language-ka Splunk." },
          { term: "Pipe (|)", def: "Operator isku xira commands isku xigxig ah SPL gudaheeda." }
        ],

        quiz: [
          {
            q: "Pipe (|) operator-ku SPL ahaan wuxuu sameeyaa?",
            options: [
              "Isku xiraa commands, natiijada hore noqota input-ka xigga",
              "Xannibaa search-ka",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo time filtering"
            ],
            answer: 0,
            explain: "Chaining-ku waa saldhig u ah SPL syntax-ka."
          },
          {
            q: "index=main status=404 (labo terms) waxay ku isku daraan?",
            options: ["AND implicit", "OR implicit", "Ma isku daraan", "NOT"],
            answer: 0,
            explain: "Terms badan default ahaan waa AND."
          },
          {
            q: "earliest=-24h latest=now wuxuu xaddidaa?",
            options: [
              "Waqtiga la search gareynayo (24 saacadood la soo dhaafay)",
              "Tirada events la soo celin",
              "Ma jiro isticmaal",
              "Kaliya index-ka"
            ],
            answer: 0,
            explain: "Time range-ku waa qayb muhiim ah oo search kasta ah."
          }
        ],

        exercise: {
          title: "SPL Basics Practice",
          steps: [
            "Qor tusaale search ah oo index/sourcetype/status isticmaala.",
            "Sharax sida pipe operator-ka loo isticmaalo commands isku xigxig ah.",
            "Qor tusaale earliest/latest time range ah.",
            "Sharax farqiga AND (default) iyo OR explicit ah."
          ],
          deliverable: "SPL basics reference sheet."
        }
      },


      {
        slug: "splunk-fields-extraction",
        title: "Splunk Fields & Extraction",
        english: "Splunk Fields and Extraction",
        minutes: 13,

        summary:
          "Faham sida fields loo soo saaro raw events, iyo automatic vs manual extraction.",

        sections: [
          {
            h: "Automatic Field Extraction",
            p:
            "Splunk wuxuu si otomaatig ah u soo saaraa fields caan ah (source, host, sourcetype, iyo key=value pairs raw event-ka gudihiisa) — kani wuxuu u ogolaadaa search-ka field=value iyada oo aan regex la baahnayn."
          },
          {
            h: "rex Command (Manual Extraction)",
            p:
            "| rex field=_raw \"user=(?<username>\\w+)\" wuxuu si manual ah u soo saaraa field cusub ('username') iyadoo lagu adeegsanayo regex — muhiim marka field-ku aan si otomaatig ah loo aqoonsan."
          },
          {
            h: "Field Extraction with Interactive Field Extractor (IFX)",
            p:
            "Splunk Web-ku wuxuu bixiyaa GUI (IFX) lagu dhiso field extractions iyada oo aan regex la qorin gacanta ah — waxaad xushaa text sample-ka, Splunk-na wuxuu automatic ahaan u soo saaraa regex-ka."
          },
          {
            h: "Persistent vs Search-Time Extraction",
            p:
            "Field extractions waxaa lagu kaydin karaa permanent ahaan (props.conf/transforms.conf, khusaya sourcetype-ka oo dhan mustaqbalka), ama kaliya search-ka hadda socda (rex command, ku meel gaadh)."
          }
        ],

        terms: [
          { term: "rex Command", def: "SPL command lagu soo saaro field cusub regex ahaan." },
          { term: "IFX", def: "Interactive Field Extractor — GUI lagu dhiso extractions." }
        ],

        quiz: [
          {
            q: "Automatic field extraction wuxuu soo saaraa?",
            options: [
              "Source, host, sourcetype, key=value pairs",
              "Kaliya source",
              "Ma jiro extraction otomaatig ah",
              "Kaliya timestamps"
            ],
            answer: 0,
            explain: "Splunk-ku wuxuu si otomaatig ah u falanqeeyaa event structure caadiga ah."
          },
          {
            q: "rex command-ku waxaa loo isticmaalaa?",
            options: [
              "Soo saarista field manual ahaan regex ahaan",
              "Xiritaanka search-ka",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo dashboards"
            ],
            answer: 0,
            explain: "Fields aan otomaatig loo aqoonsan waxay u baahan yihiin rex."
          },
          {
            q: "Persistent field extraction (props.conf) marka la barbardhigo rex command waa?",
            options: [
              "Khusaysa sourcetype-ka oo dhan mustaqbalka, ma aha kaliya search hadda",
              "Isku mid",
              "Ka gaabis",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Configuration files waxay bixiyaan extraction joogto ah."
          }
        ],

        exercise: {
          title: "Field Extraction Practice",
          steps: [
            "Sharax sida automatic field extraction u shaqeeyo.",
            "Qor tusaale rex command ah oo username field soo saarta.",
            "Sharax sida IFX loo isticmaali lahaa GUI ahaan.",
            "Sharax farqiga persistent iyo search-time extraction."
          ],
          deliverable: "Field extraction reference notes."
        }
      },


      {
        slug: "splunk-statistical-commands",
        title: "Splunk Statistical Commands",
        english: "Splunk Statistical Commands",
        minutes: 14,

        summary:
          "Faham commands-ka statistics ee ugu badan la isticmaalo — stats, timechart, top.",

        sections: [
          {
            h: "stats Command",
            p:
            "| stats count by src_ip wuxuu tirinayaa events src_ip kasta, natiijadana u soo bandhigaya table ahaan. Functions kale: sum(), avg(), max(), min(), dc() (distinct count)."
          },
          {
            h: "timechart Command",
            p:
            "| timechart span=1h count by status wuxuu dhisaa time-series data (graph-ready) — muhiim marka la doonayo in la aragto trends waqti ahaan (tusaale failed logins saacad kasta)."
          },
          {
            h: "top & rare Commands",
            p:
            "| top src_ip wuxuu muujiyaa values-ka ugu badan (default 10) field gaar ah. | rare src_ip wuxuu muujiyaa values-ka ugu yar — muhiim anomaly detection ahaan (IP aan caadi ahayn oo mar keliya la arkay)."
          },
          {
            h: "eval Command for Calculated Fields",
            p:
            "| eval risk_score=count*severity wuxuu abuuraa field cusub oo ku salaysan xisaab (calculation) fields kale — u ogolaanaya logic custom ah searches-ka gudahood."
          }
        ],

        terms: [
          { term: "stats", def: "Command tirinaya/isku darta events, results table ahaan bixiya." },
          { term: "timechart", def: "Command dhisa time-series data graph-ready ah." }
        ],

        quiz: [
          {
            q: "stats count by src_ip wuxuu sameeyaa?",
            options: [
              "Tirinayaa events src_ip kasta",
              "Tirtiraa events",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo dashboards"
            ],
            answer: 0,
            explain: "Aggregation-ku waa shaqada asaasiga ah ee stats."
          },
          {
            q: "rare command-ku muhiim u yahay sababtoo ah?",
            options: [
              "Wuxuu muujiyaa values-ka ugu yar — anomaly detection",
              "Wuxuu muujiyaa values-ka ugu badan",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Events dhif ah waxay noqon karaan calaamado shaki leh."
          },
          {
            q: "eval command-ku wuxuu u oggolaadaa?",
            options: [
              "Abuurista fields cusub oo ku salaysan calculations",
              "Tirtirida fields",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo time filtering"
            ],
            answer: 0,
            explain: "Custom logic-ku wuxuu u baahan yahay eval."
          }
        ],

        exercise: {
          title: "Statistical Commands Practice",
          steps: [
            "Qor tusaale stats command ah oo count by field isticmaala.",
            "Qor tusaale timechart command ah oo span=1h isticmaala.",
            "Sharax farqiga top iyo rare.",
            "Qor tusaale eval command ah oo field cusub abuurta."
          ],
          deliverable: "Statistical commands reference sheet."
        }
      },


      {
        slug: "building-splunk-dashboards",
        title: "Building Splunk Dashboards",
        english: "Building Splunk Dashboards",
        minutes: 12,

        summary:
          "Faham sida dashboards loo dhiso si loo muuqdo security metrics.",

        sections: [
          {
            h: "Creating a Dashboard",
            p:
            "Save As Dashboard Panel (kadib search) wuxuu u ogolaadaa in search hal la keydiyo panel ahaan dashboard gudihiisa — dashboards badanaa waxay isku daraan panels badan (charts, tables, single values)."
          },
          {
            h: "Visualization Types",
            p:
            "Column/Bar charts (comparison), Line charts (trends waqti ahaan), Pie charts (proportions), Single Value (metric muhiim ah, tusaale 'Failed Logins Today'), Table (raw data structured ah)."
          },
          {
            h: "Dashboard Studio vs Classic Dashboards",
            p:
            "Dashboard Studio (casriga ah) wuxuu bixiyaa drag-and-drop, layout flexible ah. Classic Dashboards waxay isticmaalaan XML — mid ka duqoobay, laakiin weli caan ku ah environments legacy ah."
          },
          {
            h: "Dashboard for SOC Use Cases",
            p:
            "SOC dashboard tusaale ah: panel 1 (failed logins timechart), panel 2 (top source IPs), panel 3 (alert count by severity), panel 4 (recent critical events table) — muuqaal degdeg ah oo shift kasta la eego."
          }
        ],

        terms: [
          { term: "Dashboard Panel", def: "Qayb dashboard ah oo search hal ka soo bandhigta." },
          { term: "Dashboard Studio", def: "Editor casri ah oo dashboards drag-and-drop ah." }
        ],

        quiz: [
          {
            q: "Single Value visualization-ku ku habboon yahay?",
            options: [
              "Metric muhiim ah (tusaale Failed Logins Today)",
              "Trends waqti ahaan",
              "Comparison values badan",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "Single number-ku wuxuu si degdeg ah u muujiyaa status."
          },
          {
            q: "SOC dashboard tusaale ahaan waa in uu ku jiro?",
            options: [
              "Failed logins, top IPs, alert severity, recent critical events",
              "Kaliya hal panel",
              "Ma jiro shuruud",
              "Kaliya loo isticmaalo billing"
            ],
            answer: 0,
            explain: "Panels badan waxay bixiyaan muuqaal dhamaystiran."
          },
          {
            q: "Dashboard Studio marka la barbardhigo Classic waa?",
            options: [
              "Drag-and-drop, layout flexible",
              "XML-based oo keliya",
              "Isku mid",
              "Ka duqoobay Classic"
            ],
            answer: 0,
            explain: "Studio-gu waa editor casri ah oo user-friendly ah."
          }
        ],

        exercise: {
          title: "SOC Dashboard Design",
          steps: [
            "Naqshadee 4 panels SOC dashboard ah.",
            "Xulo visualization type panel kasta (chart/table/single value).",
            "Sharax sababta doorashada visualization-ka panel kasta.",
            "Sharax farqiga Dashboard Studio iyo Classic Dashboards."
          ],
          deliverable: "SOC dashboard design plan."
        }
      },


      {
        slug: "splunk-alerts-correlation-searches",
        title: "Splunk Alerts & Correlation Searches",
        english: "Splunk Alerts and Correlation Searches",
        minutes: 14,

        summary:
          "Faham sida alerts loo naqshadeeyo, iyo mabaadi'da correlation searches.",

        sections: [
          {
            h: "Creating an Alert",
            p:
            "Save As Alert (kadib search) wuxuu u ogolaadaa in search la fuliyo joogtada ah (schedule, tusaale every 5 min) — haddii natiijadu buuxiso trigger condition (tusaale count > 10), alert-ku wuu shaqeeyaa."
          },
          {
            h: "Alert Actions",
            p:
            "Send email, run script, ama add to triggered alerts list — actions-kani waa waxa dhaca marka alert-ku shaqeeyo. Integration-ka SOAR platforms waxaa loo isticmaali karaa automated response ahaan."
          },
          {
            h: "Correlation Searches",
            p:
            "Correlation search waa search complex ah oo isku daraya multiple data sources/conditions si loo ogaado pattern attack ah (tusaale: login guuldarraystay 5 jeer + login guulaystay + IP aan caadi ahayn = brute force success suspected)."
          },
          {
            h: "Reducing False Positive Alerts",
            p:
            "Alert thresholds-ku waa in la tuning gareeyo joogtada ah — throttling (xaddidaadda tirada alerts la diro muddo go'an) iyo suppression rules (known-good patterns) waxay yareeyaan alert fatigue."
          }
        ],

        terms: [
          { term: "Correlation Search", def: "Search isku darta multiple conditions si loo ogaado pattern attack ah." },
          { term: "Alert Throttling", def: "Xaddidaadda tirada alerts la diro muddo go'an, yareyn noise-ka." }
        ],

        quiz: [
          {
            q: "Correlation search waxay isku daraan?",
            options: [
              "Multiple data sources/conditions si loo ogaado pattern",
              "Kaliya hal condition",
              "Ma jiro isku darid",
              "Kaliya loo isticmaalo dashboards"
            ],
            answer: 0,
            explain: "Attack patterns-ku badanaa waxay u baahan yihiin evidence badan."
          },
          {
            q: "Alert throttling waxaa loo isticmaalaa?",
            options: [
              "Yareynta alert fatigue iyadoo la xaddidayo tirada alerts",
              "Kordhinta alerts",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo dashboards"
            ],
            answer: 0,
            explain: "Alerts badan oo aan xaddidnayn waxay keenaan analyst-yadu inay iska indho tiraan."
          },
          {
            q: "Alert actions waxaa ka mid ah?",
            options: [
              "Send email, run script, SOAR integration",
              "Kaliya email",
              "Ma jiro action available",
              "Kaliya loo isticmaalo dashboards"
            ],
            answer: 0,
            explain: "Actions-yadu waxay u oggolaadaan response automated ahaan."
          }
        ],

        exercise: {
          title: "Alert & Correlation Search Design",
          steps: [
            "Naqshadee alert (concept ahaan) trigger condition ah (count > threshold).",
            "Xulo alert action ku habboon (email, script).",
            "Naqshadee correlation search fudud (failed + success login isku dhow).",
            "Sharax sida throttling loo isticmaali lahaa alert-kan."
          ],
          deliverable: "Alert and correlation search design document."
        }
      },


      {
        slug: "splunk-data-onboarding",
        title: "Splunk Data Onboarding",
        english: "Splunk Data Onboarding",
        minutes: 12,

        summary:
          "Faham habka data sources cusub loogu daro Splunk (log ingestion).",

        sections: [
          {
            h: "Adding a New Data Source",
            p:
            "Settings > Add Data wuxuu bixiyaa wizard u ogolaada la geliyo data files, network sources (syslog UDP/TCP), ama forwarders — sourcetype-ka waa in si sax ah loo qeexo si Splunk uu si sax ah u falanqeeyo format-ka."
          },
          {
            h: "Sourcetypes",
            p:
            "Sourcetype wuxuu qeexayaa qaab-dhismeedka data-ha (tusaale access_combined web logs ahaan, ama windows:security Event Logs ahaan) — sourcetype qaldan wuxuu keeni karaa parsing khaldan (timestamps qaldan, fields aan la aqoonsan)."
          },
          {
            h: "Index Design Considerations",
            p:
            "Data types kala duwan (firewall logs, application logs, endpoint logs) waxaa loo geliyaa indexes kala duwan — kani wuxuu u ogolaadaa access control granular ah iyo retention policies kala duwan data type kasta."
          },
          {
            h: "Data Onboarding Best Practices",
            p:
            "Test onboarding-ka data yar ka hor la ballaadhiyo production-ka oo dhan. Xaqiiji timestamps-ka si sax ah loo falanqeeyo (timezone). Verify field extraction-ka events sample ah ka hor go'aan buuxa."
          }
        ],

        terms: [
          { term: "Sourcetype", def: "Qeexitaanka qaab-dhismeedka data-ha loo geliyo Splunk." },
          { term: "Index Design", def: "Naqshaynta kala saarista data types indexes kala duwan." }
        ],

        quiz: [
          {
            q: "Sourcetype qaldan wuxuu keeni karaa?",
            options: [
              "Parsing khaldan (timestamps/fields aan sax ahayn)",
              "Ma jiro saameyn",
              "Kordhinta speed oo keliya",
              "Kaliya UI issue"
            ],
            answer: 0,
            explain: "Format-ka data-ha waa in si sax ah loo qeexo."
          },
          {
            q: "Data types kala duwan waxay u baahan yihiin?",
            options: [
              "Indexes kala duwan (access control, retention granular ah)",
              "Isla index hal ah marwalba",
              "Ma jiro xaddidaad",
              "Kaliya hal sourcetype"
            ],
            answer: 0,
            explain: "Separation-ku wuxuu bixiyaa control granular ah."
          },
          {
            q: "Test onboarding data yar ka hor production waa?",
            options: [
              "Best practice si loo iska ilaaliyo qaladaad ballaaran",
              "Ma loo baahna",
              "Kaliya loo isticmaalo compliance",
              "Waqti lumis oo keliya"
            ],
            answer: 0,
            explain: "Testing hore wuxuu ka hortagaa dhibaatooyin production-ka ah."
          }
        ],

        exercise: {
          title: "Data Onboarding Planning",
          steps: [
            "Sharax tallaabooyinka Add Data wizard-ka.",
            "Sharax sababta sourcetype loo qeexo si sax ah.",
            "Naqshadee index design (3 data types, indexes kala duwan).",
            "Liis garee 3 best practices onboarding ahaan."
          ],
          deliverable: "Splunk data onboarding plan."
        }
      },


      {
        slug: "splunk-capstone-investigation",
        title: "Splunk Capstone: Investigation",
        english: "Splunk Capstone: Investigation",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay — samee full investigation Splunk SPL isticmaalaya.",

        sections: [
          {
            h: "Scenario",
            p:
            "SOC-ga wuxuu u baahan yahay investigation ah brute force suspected ah — waa in aad isticmaasho SPL si aad u xaqiijiso oo u dhisto dashboard/alert future incidents ah."
          },
          {
            h: "Search Development",
            p:
            "Naqshadee SPL search ah oo raadinaya failed logins (index=main sourcetype=auth action=failure), kadibna stats count by src_ip, user."
          },
          {
            h: "Correlation & Timeline",
            p:
            "Isku dar failed logins iyo successful login isla IP-ga (correlation logic), dhis timeline SPL ahaan (timechart) oo muujinaya pattern-ka."
          },
          {
            h: "Alert & Dashboard Creation",
            p:
            "Naqshadee alert (concept ahaan) mustaqbalka similar incidents-ka loo ogaado, iyo dashboard panel la socda brute force attempts joogtada ah."
          }
        ],

        terms: [
          { term: "Full SIEM Investigation", def: "Habraaca isugu jira search development, correlation, alerting, dashboards." }
        ],

        quiz: [
          {
            q: "Investigation-ka, tallaabada koowaad waa?",
            options: [
              "Naqshaynta SPL search raadinaya failed logins",
              "Isla markiiba dashboard creation",
              "Alert-ka oo keliya",
              "Ma jiro tallaabo hore"
            ],
            answer: 0,
            explain: "Search-ku waa saldhig u ah investigation oo dhan."
          },
          {
            q: "Correlation-ka (failed + success isla IP) wuxuu caawiyaa?",
            options: [
              "Xaqiijinta brute force success suspected",
              "Kaliya counting events",
              "Ma jiro faa'iido",
              "Kaliya dashboard building"
            ],
            answer: 0,
            explain: "Pattern-ku wuxuu muujiyaa xiriirka u dhexeeya dhacdooyinka."
          },
          {
            q: "Dashboard/alert la naqshadeeyay kadib investigation-ka ujeeddadiisu waa?",
            options: [
              "Ogaanshaha degdeg ah ee incidents la mid ah mustaqbalka",
              "Kaliya documentation historical ah",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo billing"
            ],
            answer: 0,
            explain: "Detection-ka mustaqbalka ayaa u baahan proactive monitoring."
          },
        ],

        exercise: {
          title: "Full Splunk Investigation",
          steps: [
            "Naqshadee SPL search failed logins ah (stats count by src_ip, user).",
            "Naqshadee correlation logic (failed + success isla IP).",
            "Dhis timeline (concept ahaan timechart) pattern-ka muujinaya.",
            "Naqshadee alert + dashboard panel (portfolio-ready)."
          ],
          deliverable: "Full Splunk investigation report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "td-hashcat",
    slug: "hashcat-password-cracking-deep-dive",
    stage: "Sare",
    title: "Hashcat & Password Cracking Deep Dive",
    english: "Hashcat & Password Cracking Deep Dive",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa password hashing, Hashcat modes/attacks, mask/rule-based cracking, iyo GPU optimization.",

    topics: [
      "Password Hashing Fundamentals",
      "Hashcat Installation & Modes",
      "Dictionary Attacks & Wordlists",
      "Mask Attacks & Rule-Based Cracking",
      "Combinator & Hybrid Attacks",
      "GPU Acceleration & Performance",
      "Password Cracking Ethics & Legal",
      "Hashcat Capstone Challenge",
    ],

    lessonList: [

      {
        slug: "password-hashing-fundamentals",
        title: "Password Hashing Fundamentals",
        english: "Password Hashing Fundamentals",
        minutes: 13,

        summary:
          "Faham sida passwords loo kaydiyo hash ahaan, iyo sababta cracking loo suurtagal yahay.",

        sections: [
          {
            h: "Sababta Passwords Loo Hash Gareeyo",
            p:
            "Applications-ku ma kaydiyaan passwords plaintext ahaan (khatar weyn haddii database la xaday) — waxay kaydiyaan hash-ka password-ka. Marka user-ku soo galo, password-kiisa la hash gareeyo, la barbardhigana hash-ka kaydsan."
          },
          {
            h: "Salting",
            p:
            "Salt waa xog random ah oo lagu daro password-ka ka hor hash-ka la sameeyo — kani wuxuu ka hortagaa rainbow table attacks (precomputed hashes) sababtoo ah user kasta wuxuu leeyahay salt gaar ah, xitaa haddii passwords-ku isku mid yihiin."
          },
          {
            h: "Hash Algorithms: Fast vs Slow",
            p:
            "Fast hashes (MD5, SHA1, NTLM) waxay ku habboon yihiin integrity checks, laakiin waa daciif password hashing ahaan (si degdeg ah loo crack gareyn karaa). Slow hashes (bcrypt, scrypt, Argon2) waxay si ula kac ah u gaabis yihiin, muhiim ah password security."
          },
          {
            h: "Why Cracking is Possible",
            p:
            "Marka aad haysato hash (tusaale database la xaday), waxaad tijaabin kartaa passwords badan (guesses), oo la barbardhigo hash kasta — haddii hash-ku isku mid yahay, password-kaas ayaad heshay. Xawli-gu wuxuu ku xiran yahay algorithm-ka speed-kiisa."
          }
        ],

        terms: [
          { term: "Salt", def: "Xog random ah oo lagu daro password-ka ka hor hashing." },
          { term: "Rainbow Table", def: "Precomputed hashes lookup ah, salting-ku ka hortagaa." }
        ],

        quiz: [
          {
            q: "Salt-ku wuxuu ka hortagaa?",
            options: [
              "Rainbow table attacks (precomputed hashes)",
              "Brute force gebi ahaanba",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo encryption"
            ],
            answer: 0,
            explain: "User kasta oo leh salt gaar ah wuxuu ka dhigayaa precomputed tables aan waxtar lahayn."
          },
          {
            q: "bcrypt/scrypt/Argon2 waa hashes?",
            options: [
              "Gaabis, muhiim password security ahaan",
              "Fast, ku habboon integrity checks",
              "Ma jiro farqi MD5",
              "Kaliya loo isticmaalo encryption"
            ],
            answer: 0,
            explain: "Slow hashes-ku waxay yareeyaan xawaaraha cracking-ka."
          },
          {
            q: "MD5/SHA1 ku habboon yihiin password hashing sababtoo ah?",
            options: [
              "Way daciif yihiin — fast hashes waa si degdeg ah loo crack gareyn karaa",
              "Waa kuwa ugu fiican password hashing ahaan",
              "Ma jiro farqi",
              "Waligeed ammaan"
            ],
            answer: 0,
            explain: "Fast hashes-ku waa daciif password hashing ahaan, xitaa haddii ay ku fiican yihiin integrity."
          }
        ],

        exercise: {
          title: "Password Hashing Fundamentals Review",
          steps: [
            "Sharax sababta passwords aan loo kaydin plaintext ahaan.",
            "Sharax sida salt uga hortago rainbow tables.",
            "Sharax farqiga fast iyo slow hashes.",
            "Liis garee 2 tusaale fast hash iyo 2 slow hash."
          ],
          deliverable: "Password hashing fundamentals notes."
        }
      },


      {
        slug: "hashcat-installation-modes",
        title: "Hashcat Installation & Modes",
        english: "Hashcat Installation and Modes",
        minutes: 13,

        summary:
          "Faham sida Hashcat loo rakibo, iyo hash modes-ka la isticmaalo.",

        sections: [
          {
            h: "Installing Hashcat",
            p:
            "Hashcat wuxuu si horay ugu rakiban yahay Kali Linux. Wuxuu u baahan yahay GPU drivers (NVIDIA CUDA, AMD OpenCL) si loo isticmaalo GPU acceleration — hashcat -I wuxuu liis gareeyaa devices la heli karo."
          },
          {
            h: "Hash Mode Numbers",
            p:
            "-m [mode] wuxuu qeexayaa nooca hash-ka: 0 (MD5), 100 (SHA1), 1400 (SHA256), 1000 (NTLM), 1800 (sha512crypt), 3200 (bcrypt) — hashcat --help wuxuu liis gareeyaa dhammaan modes-ka la taageero."
          },
          {
            h: "hashID & --identify",
            p:
            "Marka aan la hubin nooca hash-ka, hashcat --identify hash.txt wuxuu isku dayaa inuu soo jeediyo modes suurtagal ah — tools kale sida hashID waxay bixiyaan analysis la mid ah."
          },
          {
            h: "Attack Mode Numbers",
            p:
            "-a [mode] wuxuu qeexayaa nooca weerarka: 0 (dictionary/straight), 1 (combinator), 3 (mask/brute force), 6 (hybrid wordlist+mask), 7 (hybrid mask+wordlist)."
          }
        ],

        terms: [
          { term: "Hash Mode (-m)", def: "Number qeexaya nooca hash-ka Hashcat ku falanqeeyo." },
          { term: "Attack Mode (-a)", def: "Number qeexaya nooca weerarka (dictionary, mask, iwm)." }
        ],

        quiz: [
          {
            q: "-m 1000 waxa uu u dhigmaa?",
            options: ["NTLM", "MD5", "bcrypt", "SHA256"],
            answer: 0,
            explain: "1000 waa mode number-ka NTLM (Windows hashes)."
          },
          {
            q: "--identify waxaa loo isticmaalaa?",
            options: [
              "Isku dayga in la soo jeediyo modes suurtagal ah hash aan la hubin",
              "Cracking-ka toos ah",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo GPU testing"
            ],
            answer: 0,
            explain: "Mode-ka qaldan wuxuu keeni doonaa cracking guuldarraysta."
          },
          {
            q: "-a 3 attack mode-ku waa?",
            options: ["Mask/brute force", "Dictionary", "Combinator", "Ma jiro nooc"],
            answer: 0,
            explain: "Mode 3 waa mask attacks/brute force."
          }
        ],

        exercise: {
          title: "Hashcat Setup Practice",
          steps: [
            "Xaqiiji GPU devices Hashcat ku arkayo (hashcat -I).",
            "Liis garee 4 hash modes iyo hash types u dhigma.",
            "Sharax sida --identify loo isticmaali lahaa.",
            "Liis garee 4 attack modes (-a) iyo macnahooda."
          ],
          deliverable: "Hashcat setup and modes reference."
        }
      },


      {
        slug: "dictionary-attacks-wordlists",
        title: "Dictionary Attacks & Wordlists",
        english: "Dictionary Attacks and Wordlists",
        minutes: 12,

        summary:
          "Faham sida dictionary attacks u shaqeeyaan iyo wordlists caanka ah.",

        sections: [
          {
            h: "Basic Dictionary Attack",
            p:
            "hashcat -m 0 -a 0 hash.txt wordlist.txt wuxuu tijaabiyaa password kasta wordlist-ka gudihiisa — mid ka fudud oo dhaqso badan haddii password-ku ku jiro wordlist-ka."
          },
          {
            h: "Common Wordlists",
            p:
            "rockyou.txt (14 milyan+ passwords, laga xaday breach-kii RockYou 2009), SecLists (collection ballaaran oo GitHub ku yaal), iyo wordlists custom ah (OSINT-based, khusaya organization gaar ah)."
          },
          {
            h: "Wordlist Quality vs Quantity",
            p:
            "Wordlist weyn (millions) wuxuu qaadan karaa waqti dheer, laakiin ma xaqiijinayo natiijo. Wordlists targeted ah (khusaya region/company/industry) badanaa way ka waxtar badan yihiin wordlists generic ah oo waaweyn."
          },
          {
            h: "Custom Wordlist Generation",
            p:
            "CeWL wuxuu ka soo saaraa words website organization-ka ka mid ah (company-specific terms). Combining tools (crunch, cupp) waxay abuuraan wordlists custom ah iyadoo lagu saleynayo pattern-yo (tusaale birth years, company name variations)."
          }
        ],

        terms: [
          { term: "rockyou.txt", def: "Wordlist caan ah oo ka soo baxay breach RockYou 2009." },
          { term: "CeWL", def: "Tool ka soo saara words website organization ka mid ah." }
        ],

        quiz: [
          {
            q: "rockyou.txt waa?",
            options: [
              "Wordlist caan ah oo ka soo baxay breach dhab ah",
              "Wordlist synthetic ah oo aan dhab ahayn",
              "Ma jiro macluumaad",
              "Encryption algorithm"
            ],
            answer: 0,
            explain: "Passwords dhab ah oo user-yadu isticmaalaan ayaa ka mid ah rockyou.txt."
          },
          {
            q: "Wordlists targeted ah (company-specific) marka la barbardhigo generic waxay?",
            options: [
              "Badanaa ka waxtar badan yihiin",
              "Waligeed ka liita",
              "Ma jiro farqi",
              "Kaliya loo isticmaalo testing"
            ],
            answer: 0,
            explain: "Passwords-ku badanaa waxay ku salaysan yihiin context organization-ka."
          },
          {
            q: "CeWL waxaa loo isticmaalaa?",
            options: [
              "Ka soo saarista words website organization ka mid ah",
              "Cracking-ka toos ah",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo GPU testing"
            ],
            answer: 0,
            explain: "Company-specific terms waxay dhistaan wordlist targeted ah."
          }
        ],

        exercise: {
          title: "Dictionary Attack Planning",
          steps: [
            "Qor tusaale command ah oo dictionary attack ah (mode 0, attack 0).",
            "Sharax farqiga rockyou.txt iyo SecLists.",
            "Sharax sababta wordlist targeted ah uu ka waxtar badan yahay.",
            "Sharax sida CeWL loo isticmaali lahaa wordlist custom ah."
          ],
          deliverable: "Dictionary attack and wordlist reference."
        }
      },


      {
        slug: "mask-attacks-rules-based-cracking",
        title: "Mask Attacks & Rule-Based Cracking",
        english: "Mask Attacks and Rule-Based Cracking",
        minutes: 15,

        summary:
          "Faham mask attacks iyo rule-based cracking — habab horumarsan oo ka fiican brute force fudud.",

        sections: [
          {
            h: "Mask Attack Syntax",
            p:
            "?l (lowercase), ?u (uppercase), ?d (digit), ?s (special), ?a (all). Tusaale: ?u?l?l?l?l?d?d wuxuu qeexayaa pattern (hal capital, 4 lowercase, 2 digits) — sida 'Pass12'."
          },
          {
            h: "Sababta Mask Attacks Ka Fiican Yihiin Brute Force Buuxa",
            p:
            "Brute force buuxa wuxuu tijaabiyaa dhammaan combinations (aad u badan). Mask attacks waxay ka faa'iidaystaan pattern-yada password caadiga ah (capital bilowga, digits dhamaadka) — waxay yareeyaan search space aad u ballaaran."
          },
          {
            h: "Rule-Based Attacks",
            p:
            "Rules (best64.rule, rockyou-30000.rule) waxay dabaqaan transformations wordlist kasta (tusaale: 'password' → 'Password1', 'p@ssword', 'password123') — waxay ballaadhiyaan wordlist hal ah iyada oo aan la kordhinayn cabbirka file-ka."
          },
          {
            h: "Combining Mask & Wordlist (Hybrid)",
            p:
            "-a 6 (hybrid wordlist+mask): wordlist.txt ?d?d?d wuxuu ku daraa 3 digits dhamaadka password kasta wordlist-ka — muhiim marka la ogaado password base-ka laakiin aan la hubin suffix-ka (tusaale year)."
          }
        ],

        terms: [
          { term: "Mask Attack", def: "Attack isticmaala pattern-ka structure-ka password-ka (?l?u?d?s)." },
          { term: "Rule-Based Attack", def: "Dabaqidda transformations wordlist kasta si loo ballaadhiyo." }
        ],

        quiz: [
          {
            q: "?u?l?l?l?l?d?d mask-ku wuxuu qeexayaa?",
            options: [
              "Capital + 4 lowercase + 2 digits",
              "Kaliya lowercase",
              "Ma jiro pattern",
              "Kaliya digits"
            ],
            answer: 0,
            explain: "Mask characters kastaa waa qayb pattern-ka."
          },
          {
            q: "Mask attacks ka fiican yihiin brute force buuxa sababtoo ah?",
            options: [
              "Waxay ka faa'iidaystaan pattern-yada caadiga ah, yareysaa search space",
              "Waa mid ka gaabis marwalba",
              "Ma jiro farqi",
              "Waligeed waa mid liita"
            ],
            answer: 0,
            explain: "Targeted patterns-ku waxay yareeyaan combinations la tijaabin karo."
          },
          {
            q: "Rule-based attacks waxay ballaadhiyaan?",
            options: [
              "Wordlist hal ah iyada oo aan cabbirka file-ka la kordhinayn",
              "Kaliya mask attacks",
              "Ma jiro faa'iido",
              "Kaliya dictionary attacks aan wax laga beddelin"
            ],
            answer: 0,
            explain: "Transformations-ku waxay dhaliyaan guesses badan hal wordlist ah."
          }
        ],

        exercise: {
          title: "Mask & Rule-Based Attack Practice",
          steps: [
            "Qor mask pattern ah oo u dhigma 'Word2024'.",
            "Sharax sida rule file (best64.rule) uu ballaadhiyo wordlist.",
            "Qor tusaale hybrid attack command ah (-a 6).",
            "Sharax marka mask attacks loo doorto dictionary attacks."
          ],
          deliverable: "Mask and rule-based attack reference sheet."
        }
      },


      {
        slug: "combinator-hybrid-attacks",
        title: "Combinator & Hybrid Attacks",
        english: "Combinator and Hybrid Attacks",
        minutes: 12,

        summary:
          "Faham sida combinator attacks iyo hybrid strategies loo isticmaalo passwords complex ah.",

        sections: [
          {
            h: "Combinator Attack",
            p:
            "-a 1 (combinator) wuxuu isku daraa laba wordlist (word1 + word2, tusaale 'Summer' + '2024' = 'Summer2024') — muhiim passwords ah oo laba erey isku xigxig ah, sida 'CorrectHorseBatteryStaple'."
          },
          {
            h: "Combinator Rules",
            p:
            "-j/-k options waxay u ogolaadaan rules la dabaqo wordlist labaad ama koowaad ka hor la isku daro — kani wuxuu kordhinayaa flexibility marka la isticmaalayo combinator attacks."
          },
          {
            h: "Choosing Between Attack Strategies",
            p:
            "Password unknown gebi ahaanba: dictionary → rules → hybrid → mask (tartiibkan si loo yareeyo waqtiga). Password format la yaqaan (tusaale 8-char alphanumeric): mask attack toos ah."
          },
          {
            h: "Attack Strategy Prioritization",
            p:
            "Professional-yadu waxay bilaabaan dictionary+rules (fastest, highest success rate common passwords ahaan), kadibna waxay u gudbaan mask/brute force kaliya haddii dictionary uusan shaqeynin."
          }
        ],

        terms: [
          { term: "Combinator Attack", def: "Isku darka laba wordlist (word1+word2)." }
        ],

        quiz: [
          {
            q: "Combinator attack (-a 1) wuxuu sameeyaa?",
            options: [
              "Isku daraa laba wordlist (word1 + word2)",
              "Kaliya hal wordlist",
              "Ma jiro isticmaal",
              "Kaliya mask attacks"
            ],
            answer: 0,
            explain: "Passwords laba-erey ah waxaa lagu crack gareyn karaa habkan."
          },
          {
            q: "Attack strategy priority-gu wuxuu bilaabmaa?",
            options: [
              "Dictionary + rules (fastest, highest success)",
              "Mask attacks toos ah",
              "Ma jiro tartiib",
              "Kaliya brute force"
            ],
            answer: 0,
            explain: "Common passwords-ku waxay ku jiraan wordlists — waa mid dhaqso ah."
          },
          {
            q: "Password format la yaqaan (8-char alphanumeric) wuxuu ku habboon yahay?",
            options: [
              "Mask attack toos ah",
              "Combinator oo keliya",
              "Ma jiro strategy ku habboon",
              "Kaliya dictionary"
            ],
            answer: 0,
            explain: "Structure la yaqaan wuxuu u ogolaadaa mask targeted ah."
          }
        ],

        exercise: {
          title: "Attack Strategy Selection Practice",
          steps: [
            "Sharax sida combinator attack u shaqeeyo.",
            "Naqshadee attack strategy priority list (dictionary → hybrid → mask).",
            "Xulo 3 scenarios, mid kasta u dooro strategy ugu habboon.",
            "Sharax sababta professional-yadu ay ku bilaabaan dictionary+rules."
          ],
          deliverable: "Attack strategy selection guide."
        }
      },


      {
        slug: "gpu-acceleration-performance",
        title: "GPU Acceleration & Performance",
        english: "GPU Acceleration and Performance",
        minutes: 13,

        summary:
          "Faham sida GPU acceleration u dedejiyo cracking-ka, iyo performance tuning.",

        sections: [
          {
            h: "Why GPUs are Faster than CPUs",
            p:
            "GPUs waxay leeyihiin thousands of cores (parallel processing), halka CPUs ay leeyihiin cores yar oo xoog badan — hashing (operation simple ah oo la celceliyo) waa mid ku habboon parallel processing."
          },
          {
            h: "Benchmarking",
            p:
            "hashcat -b wuxuu tijaabiyaa xawaaraha hardware-kaaga hash types kala duwan — natiijadu waxay bixisaa hashes/second, taasoo kaa caawinaysa inaad qiyaasto waqtiga cracking-ka."
          },
          {
            h: "Workload Profiles",
            p:
            "-w [1-4] wuxuu xakameeyaa workload-ka GPU-ga (1=low, 4=nightmare) — workload sare wuxuu dedejinayaa cracking-ka, laakiin wuxuu ka dhigayaa system-ka mid aan la isticmaali karin dhinacyo kale."
          },
          {
            h: "Time Estimation for Different Hash Types",
            p:
            "Fast hashes (MD5, NTLM) — millions/billions hashes/second GPU casri ah. Slow hashes (bcrypt) — kaliya thousands/second — kani wuxuu ka dhigayaa cracking waqti aad u dheer, xitaa GPU xoog leh."
          }
        ],

        terms: [
          { term: "Workload Profile", def: "Settings xakamaya intensity-ga GPU-ga cracking ahaan." },
          { term: "Benchmarking", def: "Tijaabinta xawaaraha hardware-ka hash types kala duwan." }
        ],

        quiz: [
          {
            q: "GPUs ka dhaqso badan yihiin CPUs hashing ahaan sababtoo ah?",
            options: [
              "Thousands of cores, parallel processing",
              "Waa mid ka jaban",
              "Ma jiro sabab",
              "GPUs marwalba ka fiican yihiin dhammaan tasks"
            ],
            answer: 0,
            explain: "Hashing-ku waa operation ku habboon parallel processing."
          },
          {
            q: "hashcat -b waxaa loo isticmaalaa?",
            options: [
              "Tijaabinta xawaaraha hardware-ka",
              "Cracking-ka toos ah",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo mask attacks"
            ],
            answer: 0,
            explain: "Benchmarking-ku wuxuu kaa caawiyaa waqti qiyaasid."
          },
          {
            q: "bcrypt marka la barbardhigo MD5 waa?",
            options: [
              "Aad uga gaabis, kaliya thousands/second",
              "Isku mid xawaare ahaan",
              "Ka dhaqso badan",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Slow hashes-ku waxay ka dhigaan cracking mid aad u adag."
          }
        ],

        exercise: {
          title: "GPU Performance Practice",
          steps: [
            "Sharax sababta GPUs ay ka dhaqso badan yihiin CPUs.",
            "Sharax sida hashcat -b loo isticmaalo.",
            "Sharax workload profiles-ka (1-4) iyo trade-offs-kooda.",
            "Barbardhig xawaaraha qiyaasan MD5 vs bcrypt."
          ],
          deliverable: "GPU acceleration and performance notes."
        }
      },


      {
        slug: "password-cracking-ethics-legal",
        title: "Password Cracking Ethics & Legal",
        english: "Password Cracking Ethics and Legal",
        minutes: 12,

        summary:
          "Faham xeerarka sharciga ah iyo ethics-ka la xiriira password cracking.",

        sections: [
          {
            h: "Authorization Requirements",
            p:
            "Password cracking waligeed waa in loo sameeyo kaliya authorized engagements (pentest scope, ama audit internal ah organization-kaaga) — cracking passwords aan authorization lahayn waa dembi meelo badan."
          },
          {
            h: "Handling Cracked Passwords",
            p:
            "Passwords la crack gareeyay waa in la maamulo si ammaan ah (encrypted storage, access xaddidan) — waa xog xasaasi ah oo aan lagu wadaagi karin qof kasta, xitaa report-ka gudihiisa (waxaa loo isticmaali karaa masking)."
          },
          {
            h: "Reporting Weak Passwords",
            p:
            "Marka assessment loo sameeyo password strength, warbixinta waa in ay diiradda saarto statistics guud (tusaale '23% of passwords cracked in under 1 hour'), ma aha in la liis gareeyo passwords/users specific ah publicly."
          },
          {
            h: "Legitimate Use Cases",
            p:
            "Password audits (xaqiijinta policy enforcement), penetration testing (post-exploitation credential access), iyo forensics (helitaanka access files encrypted ah investigation ahaan legal) waa dhammaantood use cases sharci ah."
          }
        ],

        terms: [
          { term: "Password Audit", def: "Tijaabinta strength passwords organization ah, authorized ahaan." }
        ],

        quiz: [
          {
            q: "Password cracking waligeed waa in loo sameeyo?",
            options: [
              "Authorized engagements oo keliya",
              "Qof kasta wuxuu sameyn karaa xor ah",
              "Ma jiro shuruud",
              "Kaliya CTF competitions"
            ],
            answer: 0,
            explain: "Aan authorization la haysan waa dembi meelo badan."
          },
          {
            q: "Warbixinta password audit-ka waa in ay?",
            options: [
              "Diiradda saarto statistics guud, ma aha passwords specific ah",
              "Liis gareyso passwords/users publicly",
              "Ma jiro shuruud",
              "Kaliya loo qoro management"
            ],
            answer: 0,
            explain: "Privacy-ga users-ka waa in la ilaaliyaa xitaa audit gudaheeda."
          },
          {
            q: "Passwords la crack gareeyay waa in la maamulo?",
            options: [
              "Si ammaan ah (encrypted, access xaddidan)",
              "Si xor ah, aan xaddidnayn",
              "Ma jiro shuruud",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Xogtan waa xasaasi ah oo u baahan ilaalin."
          }
        ],

        exercise: {
          title: "Ethics & Legal Review",
          steps: [
            "Sharax sababta authorization uu u yahay waajib.",
            "Sharax sida passwords la crack gareeyay loo maamuli lahaa si ammaan ah.",
            "Naqshadee format warbixin (statistics guud, ma aha specific passwords).",
            "Liis garee 3 legitimate use cases password cracking ah."
          ],
          deliverable: "Password cracking ethics and legal notes."
        }
      },


      {
        slug: "hashcat-capstone-challenge",
        title: "Hashcat Capstone Challenge",
        english: "Hashcat Capstone Challenge",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay — naqshadee full password audit strategy.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad la dalbaday inaad samayso authorized password audit organization ah — hash dump la helay (NTLM), 500 users ah. Waa in aad naqshadeyso approach efficient ah."
          },
          {
            h: "Attack Strategy Design",
            p:
            "Naqshadee tartiibka: 1) Dictionary + rules (dhaqso ah). 2) Combinator (passwords laba-erey ah). 3) Mask attacks (patterns caadiga ah, tusaale Company2024!)."
          },
          {
            h: "Time & Resource Planning",
            p:
            "Iyadoo lagu saleynayo GPU benchmarking, xisaabi waqtiga qiyaasan phase kasta — hash type (NTLM, fast) wuxuu u ogolaadaa attempts badan waqti gaaban."
          },
          {
            h: "Reporting",
            p:
            "Diyaari warbixin: percentage passwords la crack gareeyay, common patterns la helay (tusaale season+year), talooyin (password policy, MFA, banned password lists)."
          }
        ],

        terms: [
          { term: "Password Audit Strategy", def: "Naqshad isugu jirta attack tartiib, waqti planning, iyo reporting." }
        ],

        quiz: [
          {
            q: "500 users-ka NTLM hashes, attack strategy-gu wuxuu bilaabmaa?",
            options: [
              "Dictionary + rules (dhaqso ah, common passwords)",
              "Isla markiiba mask attacks buuxa",
              "Ma jiro tartiib",
              "Kaliya brute force"
            ],
            answer: 0,
            explain: "Dictionary-gu wuxuu heli karaa passwords badan si degdeg ah."
          },
          {
            q: "Warbixinta ugu dambaysa waa in ay ku jirto?",
            options: [
              "Percentage cracked, common patterns, talooyin policy",
              "Kaliya liis passwords specific ah",
              "Ma jiro shuruud",
              "Kaliya magacyada users"
            ],
            answer: 0,
            explain: "Statistics guud iyo recommendations ayaa qiimo leh, ma aha exposure users."
          },
          {
            q: "GPU benchmarking-ka ka hor attack-ka la bilaabo waxay caawisaa?",
            options: [
              "Qiyaasidda waqtiga loo baahan yahay phase kasta",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo cost tracking",
              "Kordhinta security-ga oo keliya"
            ],
            answer: 0,
            explain: "Time estimation-ku wuxuu hagaa resource planning-ka."
          },
        ],

        exercise: {
          title: "Full Password Audit Strategy",
          steps: [
            "Naqshadee attack strategy tartiib ah (dictionary → combinator → mask).",
            "Xisaabi (qiyaas) waqtiga phase kasta iyadoo lagu saleynayo NTLM speed.",
            "Naqshadee findings format (percentage, patterns, ma aha specific passwords).",
            "Diyaari recommendations (policy, MFA, banned lists) (portfolio-ready)."
          ],
          deliverable: "Full password audit strategy report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "td-osint",
    slug: "osint-tools-deep-dive",
    stage: "Dhexe",
    title: "OSINT Tools Deep Dive",
    english: "OSINT Tools Deep Dive",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa OSINT methodology iyo tools-ka heer sare ah — Shodan, crt.sh, theHarvester, Maltego, iyo Google Dorking.",

    topics: [
      "OSINT Methodology Overview",
      "Shodan Mastery",
      "crt.sh & Certificate Transparency Mastery",
      "theHarvester Deep Dive",
      "Maltego Basics & Link Analysis",
      "Advanced Google Dorking",
      "OSINT Framework & Tool Selection",
      "OSINT Capstone: Full Profile",
    ],

    lessonList: [

      {
        slug: "osint-methodology-overview",
        title: "OSINT Methodology Overview",
        english: "OSINT Methodology Overview",
        minutes: 12,

        summary:
          "Faham habraaca structured ah ee OSINT professional-ku raaco.",

        sections: [
          {
            h: "OSINT Collection Cycle",
            p:
            "Planning (waxa la doonayo), Collection (ururinta xogta), Processing (kala saaridda xogta muhiimka ah), Analysis (dhisidda muuqaal guud), Dissemination (wadaagidda findings) — kani waa cycle intelligence-ka guud, la dabaqay OSINT-ka."
          },
          {
            h: "Categories of OSINT Sources",
            p:
            "Social media (LinkedIn, Twitter/X, Facebook), technical (DNS, certificates, Shodan), documents (PDFs, metadata), iyo dark web (breach data, forums) — sources kala duwan waxay bixiyaan dhinacyo kala duwan."
          },
          {
            h: "OSINT Framework (osintframework.com)",
            p:
            "OSINT Framework waa website u kala qaybiya tools OSINT ah categories ahaan (username, email, domain, iwm) — waa resource qiimo leh marka la doonayo tool ku habboon task gaar ah."
          },
          {
            h: "Legal & Ethical Boundaries",
            p:
            "OSINT-ku wuxuu isticmaalaa xog public ah, laakiin isticmaalkiisu waa in uu ku jiro scope authorized ah — aggregation-ka xogta shakhsi ah (doxxing-style) waa khatar legal/ethical ah xitaa haddii xogtu tahay public."
          }
        ],

        terms: [
          { term: "OSINT Collection Cycle", def: "Planning, Collection, Processing, Analysis, Dissemination." },
          { term: "OSINT Framework", def: "Website u kala qaybiya tools OSINT ah categories ahaan." }
        ],

        quiz: [
          {
            q: "OSINT Collection Cycle-ka, tallaabada koowaad waa?",
            options: ["Planning", "Collection", "Analysis", "Dissemination"],
            answer: 0,
            explain: "Planning-ku wuxuu qeexayaa waxa la doonayo ka hor collection-ka."
          },
          {
            q: "OSINT Framework website-ku wuxuu bixiyaa?",
            options: [
              "Kala qaybinta tools categories ahaan",
              "Tool hal ah oo dhamaystiran",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Muuqaal guud oo tools-ka ka mid ah waa faa'iidada ugu weyn."
          },
          {
            q: "Aggregation xog shakhsi ah (doxxing-style) waa?",
            options: [
              "Khatar legal/ethical ah xitaa haddii xogtu tahay public",
              "Ammaan gebi ahaanba, sababtoo ah waa public",
              "Ma jiro khatar",
              "Kaliya loo isticmaalo research academic"
            ],
            answer: 0,
            explain: "Isticmaalka scope-ka ka baxsan waa khatar ethical ah."
          }
        ],

        exercise: {
          title: "OSINT Methodology Review",
          steps: [
            "Sharax shanta tallaabo ee OSINT Collection Cycle.",
            "Liis garee 4 categories oo OSINT sources ah.",
            "Sharax faa'iidada OSINT Framework website.",
            "Sharax farqiga OSINT authorized ah iyo doxxing."
          ],
          deliverable: "OSINT methodology overview notes."
        }
      },


      {
        slug: "shodan-mastery",
        title: "Shodan Mastery",
        english: "Shodan Mastery",
        minutes: 14,

        summary:
          "Sii qoto dheeree Shodan search operators iyo use cases advanced ah.",

        sections: [
          {
            h: "Shodan Search Operators",
            p:
            "country:SO (dal gaar ah), org:\"Company Name\" (organization), port:22 (port gaar ah), product:nginx (software gaar ah), before:/after: (date filtering) — operators-kan waxaa lagu isku dari karaa filtering precise ah."
          },
          {
            h: "Shodan Filters for Vulnerability Discovery",
            p:
            "vuln:CVE-2021-XXXX wuxuu raadiyaa devices leh CVE gaar ah (Shodan membership loo baahan yahay). has_screenshot:true wuxuu muujiyaa devices leh screenshots (VNC, RDP interfaces) — muhiim risk visualization ahaan."
          },
          {
            h: "Shodan Maps & Trends",
            p:
            "Shodan Maps wuxuu bixiyaa muuqaal geographic ah oo query results ah — Shodan Trends wuxuu bixiyaa historical data (isbeddelka tirada devices exposed waqti ahaan), muhiim tracking organization-ka."
          },
          {
            h: "Shodan CLI & API",
            p:
            "shodan search [query] wuxuu u ogolaadaa command-line access. Shodan API-gu wuxuu u ogolaadaa integration automated ah scripts/tools kale, muhiim marka la doonayo monitoring joogto ah."
          }
        ],

        terms: [
          { term: "Shodan Operators", def: "Filters (country:, org:, port:) lagu precision gareeyo searches." },
          { term: "Shodan Trends", def: "Historical data isbeddelka devices exposed waqti ahaan." }
        ],

        quiz: [
          {
            q: "vuln:CVE-2021-XXXX filter-ku wuxuu raadiyaa?",
            options: [
              "Devices leh CVE gaar ah",
              "Devices oo dhan",
              "Ma jiro isticmaal",
              "Kaliya screenshots"
            ],
            answer: 0,
            explain: "CVE-specific search-ku wuxuu ka caawiyaa exposure assessment."
          },
          {
            q: "has_screenshot:true waxaa loo isticmaalaa?",
            options: [
              "Muujinta devices leh screenshots (VNC/RDP)",
              "Kaliya country filtering",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo API"
            ],
            answer: 0,
            explain: "Visual confirmation-ku wuxuu caawiyaa risk assessment."
          },
          {
            q: "Shodan Trends wuxuu bixiyaa?",
            options: [
              "Historical data isbeddelka devices exposed waqti ahaan",
              "Kaliya snapshot hadda",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo CLI"
            ],
            answer: 0,
            explain: "Tracking-ku wuxuu caawiyaa la socodka exposure organization-ka."
          }
        ],

        exercise: {
          title: "Shodan Advanced Search Practice",
          steps: [
            "Qor tusaale Shodan query ah oo country + port isku daraya.",
            "Sharax sida vuln: filter loo isticmaali lahaa.",
            "Sharax faa'iidada Shodan Maps/Trends.",
            "Sharax farqiga Shodan CLI iyo API."
          ],
          deliverable: "Shodan mastery reference sheet."
        }
      },


      {
        slug: "crtsh-certificate-transparency-mastery",
        title: "crt.sh & Certificate Transparency Mastery",
        english: "crt.sh and Certificate Transparency Mastery",
        minutes: 12,

        summary:
          "Sii qoto dheeree certificate transparency logs iyo sida crt.sh loo isticmaalo heer sare ah.",

        sections: [
          {
            h: "Certificate Transparency (CT) Deep Dive",
            p:
            "Waxaa loo baahan yahay dhammaan public SSL certificates in la diiwaan geliyo CT logs (standard-ka industry-ga) — kani wuxuu ka dhigayaa CT logs source muhiim ah oo aan la joojin karin (subdomain enumeration)."
          },
          {
            h: "crt.sh Query Syntax",
            p:
            "%.example.com (wildcard, dhammaan subdomains), example.com (exact match), iyo id: [certificate ID] (single cert details) — queries-kan waxay bixiyaan levels kala duwan oo faahfaahin ah."
          },
          {
            h: "Identifying New Infrastructure",
            p:
            "Certificates cusub oo la bixiyay dhawaan waxay tilmaami karaan infrastructure cusub (staging environments, acquisitions cusub) — monitoring joogto ah crt.sh wuxuu u ogolaadaa la socodka attack surface isbeddelka."
          },
          {
            h: "Alternative CT Log Tools",
            p:
            "censys.io wuxuu bixiyaa search la mid ah CT logs iyo internet-scan data. Certificate Transparency Monitor tools waxay bixiyaan alerts automatic ah marka certificate cusub la bixiyo domain la la socdo."
          }
        ],

        terms: [
          { term: "Certificate Transparency (CT)", def: "Standard industry ah oo diiwaan geliya SSL certificates public ahaan." }
        ],

        quiz: [
          {
            q: "Dhammaan public SSL certificates waa in ay?",
            options: [
              "Diiwaan geliyaan CT logs (standard industry ah)",
              "Ma jiro shuruud",
              "Waligeed private yihiin",
              "Kaliya loo isticmaalo internal"
            ],
            answer: 0,
            explain: "CT-gu waa waajib CAs oo dhan raacaan."
          },
          {
            q: "%.example.com crt.sh query-gu wuxuu bixiyaa?",
            options: [
              "Dhammaan subdomains example.com",
              "Kaliya root domain",
              "Ma jiro natiijo",
              "Kaliya certificates expired"
            ],
            answer: 0,
            explain: "Wildcard-ku wuxuu ballaadhiyaa search-ka."
          },
          {
            q: "Certificates cusub oo dhawaan la bixiyay waxay tilmaami karaan?",
            options: [
              "Infrastructure cusub (staging, acquisitions)",
              "Ma jiro macluumaad",
              "Waligeed waa false positive",
              "Kaliya renewal certificates hore"
            ],
            answer: 0,
            explain: "Infrastructure cusub-ku wuxuu u baahan yahay certificates cusub."
          }
        ],

        exercise: {
          title: "Certificate Transparency Advanced Practice",
          steps: [
            "Sharax sababta CT logs aan la joojin karin.",
            "Qor 2 tusaale crt.sh query syntax ah.",
            "Sharax sida certificates cusub loo isticmaali lahaa infrastructure tracking.",
            "Sharax farqiga crt.sh iyo censys.io."
          ],
          deliverable: "Certificate transparency mastery notes."
        }
      },


      {
        slug: "theharvester-deep-dive",
        title: "theHarvester Deep Dive",
        english: "theHarvester Deep Dive",
        minutes: 13,

        summary:
          "Sii qoto dheeree theHarvester — data sources badan iyo output analysis.",

        sections: [
          {
            h: "theHarvester Data Sources",
            p:
            "-b google,bing,linkedin,duckduckgo (search engines badan), -b all (dhammaan sources) — sources kala duwan waxay bixiyaan coverage kala duwan, mararka qaarkood natiijooyin kala duwan isla domain-ka."
          },
          {
            h: "Combining Sources for Comprehensive Coverage",
            p:
            "Hal source (tusaale google oo keliya) waxaa laga yaabaa inuu seego emails/subdomains. Isticmaalka sources badan (-b google,bing,linkedin,crtsh) wuxuu bixiyaa muuqaal ballaaran, in kastoo waqti dheer qaadan karo."
          },
          {
            h: "DNS Brute Force Integration",
            p:
            "-c (DNS brute force) wuxuu isku daraa subdomain enumeration wordlist-based ah — kani wuxuu ku daraa layer OSINT-ka (passive) iyo active enumeration isku mar."
          },
          {
            h: "Output Formats & Reporting",
            p:
            "-f output.html/.xml wuxuu keydiyaa natiijooyinka format structured ah — HTML wuxuu ku habboon yahay reports human-readable ah, XML wuxuu ku habboon yahay automation/integration tools kale."
          }
        ],

        terms: [
          { term: "Data Source Coverage", def: "Isticmaalka sources badan si loo helo muuqaal ballaaran." }
        ],

        quiz: [
          {
            q: "-b all flag-ku wuxuu sameeyaa?",
            options: [
              "Isticmaalaa dhammaan data sources la heli karo",
              "Kaliya Google",
              "Ma jiro isticmaal",
              "Kaliya DNS brute force"
            ],
            answer: 0,
            explain: "Coverage ballaaran wuxuu u baahan yahay sources badan."
          },
          {
            q: "Sababta sources badan la isku daro waa?",
            options: [
              "Hal source waxaa laga yaabo inuu seego xog",
              "Ma jiro sabab",
              "Waqti kaliya",
              "Kaliya loo isticmaalo testing"
            ],
            answer: 0,
            explain: "Comprehensive coverage-ku wuxuu u baahan yahay sources kala duwan."
          },
          {
            q: "-c (DNS brute force) wuxuu ku daraa?",
            options: [
              "Active enumeration passive OSINT-ka kore",
              "Kaliya passive recon",
              "Ma jiro faa'iido",
              "Kaliya email harvesting"
            ],
            answer: 0,
            explain: "Isku darka labada technique-ku wuxuu ballaadhiyaa natiijooyinka."
          }
        ],

        exercise: {
          title: "theHarvester Advanced Practice",
          steps: [
            "Qor tusaale command ah oo sources badan isticmaala.",
            "Sharax sababta sources badan loo isticmaalo halkii hal source.",
            "Sharax sida -c DNS brute force loo isticmaali lahaa.",
            "Sharax farqiga output HTML iyo XML formats."
          ],
          deliverable: "theHarvester deep dive reference."
        }
      },


      {
        slug: "maltego-basics-link-analysis",
        title: "Maltego Basics & Link Analysis",
        english: "Maltego Basics and Link Analysis",
        minutes: 15,

        summary:
          "Faham aasaaska Maltego — entities, transforms, iyo link analysis visual ah.",

        sections: [
          {
            h: "Waa Maxay Maltego?",
            p:
            "Maltego waa tool link analysis ah oo visual ah — wuxuu u oggolaadaa in la isku xiro entities (domains, emails, IPs, people) 'graph' ahaan, muujinaya xiriirrada u dhexeeya data points kala duwan."
          },
          {
            h: "Entities",
            p:
            "Entity waa data point (Domain, Email Address, Person, IP Address, Phone Number, iwm) — Maltego wuxuu bixiyaa entity types built-in ah, waxaana lagu dari karaa custom entities."
          },
          {
            h: "Transforms",
            p:
            "Transform waa 'query' automatic ah oo entity ka soo saara entities dheeraad ah (tusaale: Domain → 'To DNS Name' transform wuxuu soo saaraa subdomains). Transforms-ku waxay isticmaalaan APIs (Shodan, VirusTotal, iwm) sources ahaan."
          },
          {
            h: "Building a Graph",
            p:
            "Bilaab entity hal ah (tusaale domain), run transforms si loo ballaadhiyo graph-ka — entities cusub oo la soo saaray waxaa lagu run gareyn karaa transforms dheeraad ah, taasoo dhisaysa network xiriirro ah oo ballaaran."
          }
        ],

        terms: [
          { term: "Entity (Maltego)", def: "Data point (domain, email, person) Maltego graph gudaheeda." },
          { term: "Transform", def: "Query automatic ah oo entity ka soo saara entities dheeraad ah." }
        ],

        quiz: [
          {
            q: "Maltego waa?",
            options: [
              "Tool link analysis ah oo visual ah",
              "Password cracker",
              "Network scanner",
              "SIEM platform"
            ],
            answer: 0,
            explain: "Graph-based visualization-ku waa faa'iidada ugu weyn Maltego."
          },
          {
            q: "Transform-ku wuxuu sameeyaa?",
            options: [
              "Query automatic ah soo saarta entities dheeraad ah",
              "Tirtiraa entities",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo encryption"
            ],
            answer: 0,
            explain: "Transforms-ku waa 'engine'-ka Maltego automation-ka."
          },
          {
            q: "Domain → 'To DNS Name' transform wuxuu soo saaraa?",
            options: ["Subdomains", "Emails", "IP addresses oo keliya", "Ma jiro natiijo"],
            answer: 0,
            explain: "Transform-kan wuxuu ballaadhiyaa domain-ka subdomains ahaan."
          }
        ],

        exercise: {
          title: "Maltego Concept Practice",
          steps: [
            "Sharax farqiga Entity iyo Transform.",
            "Naqshadee graph concept ah oo domain hal ah bilaabma.",
            "Sharax sida transforms isku xigxig ah loo isticmaali lahaa (domain → subdomain → IP).",
            "Sharax faa'iidada visual link analysis marka la barbardhigo liis text ah."
          ],
          deliverable: "Maltego basics and link analysis notes."
        }
      },


      {
        slug: "advanced-google-dorking",
        title: "Advanced Google Dorking",
        english: "Advanced Google Dorking",
        minutes: 13,

        summary:
          "Sii qoto dheeree Google dorking operators advanced ah iyo Google Hacking Database.",

        sections: [
          {
            h: "Advanced Operators",
            p:
            "intitle: (title page), inurl: (URL text), filetype: (file extension), site: (domain-specific), cache: (Google cached version), link: (pages linking to URL) — isku darka operators badan wuxuu bixiyaa precision sare."
          },
          {
            h: "Finding Exposed Files & Directories",
            p:
            "site:example.com filetype:pdf 'confidential' wuxuu raadiyaa PDFs khusaya domain-ka oo leh eray gaar ah. intitle:\"index of\" site:example.com wuxuu raadiyaa directories exposed ah."
          },
          {
            h: "Google Hacking Database (GHDB)",
            p:
            "GHDB (exploit-db.com/google-hacking-database) waa collection dorks pre-made ah, kala saaran categories ahaan (files containing passwords, vulnerable servers, iwm) — resource qiimo leh oo aan lagama maarmaan aha in la dhiso dorks cusub markasta."
          },
          {
            h: "Combining Dorks with Other OSINT",
            p:
            "Google dorking waxaa lagu isku dari karaa OSINT sources kale — tusaale: helitaanka email format LinkedIn kadib, kadib dorking loo raadiyo documents leh emails la mid ah pattern-kaas."
          }
        ],

        terms: [
          { term: "GHDB", def: "Google Hacking Database — collection dorks pre-made ah." }
        ],

        quiz: [
          {
            q: "site:example.com filetype:pdf 'confidential' wuxuu raadiyaa?",
            options: [
              "PDFs khusaya domain-ka oo leh eray gaar ah",
              "Dhammaan PDFs internet-ka",
              "Ma jiro natiijo",
              "Kaliya subdomains"
            ],
            answer: 0,
            explain: "Isku darka operators-ku wuxuu bixiyaa precision sare."
          },
          {
            q: "GHDB waxay bixisaa?",
            options: [
              "Collection dorks pre-made ah, categories ahaan",
              "Kaliya hal dork",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Resource-kan wuxuu yareeyaa baahida dorks cusub la dhiso."
          },
          {
            q: "intitle:\"index of\" wuxuu raadiyaa?",
            options: [
              "Directories exposed ah",
              "Kaliya PDFs",
              "Ma jiro isticmaal",
              "Kaliya email addresses"
            ],
            answer: 0,
            explain: "Directory listing exposed-ku waa finding caan ah."
          }
        ],

        exercise: {
          title: "Advanced Dorking Practice",
          steps: [
            "Qor tusaale dork ah oo site: + filetype: isku daraya.",
            "Raadi GHDB, aqoonso 3 dork categories.",
            "Sharax sida dorking loogu daro OSINT sources kale.",
            "Naqshadee 3 dorks custom ah scenario tusaale ah."
          ],
          deliverable: "Advanced Google dorking reference sheet."
        }
      },


      {
        slug: "osint-framework-tool-selection",
        title: "OSINT Framework & Tool Selection",
        english: "OSINT Framework and Tool Selection",
        minutes: 12,

        summary:
          "Faham sida loo doorto tool-ka saxda ah task OSINT kasta.",

        sections: [
          {
            h: "Matching Tool to Task",
            p:
            "Domain recon → crt.sh, Shodan. Email/username → theHarvester, Sherlock. Visual link analysis → Maltego. File-based recon → Google dorking, ExifTool metadata. Task kastaa wuxuu leeyahay tools ku habboon."
          },
          {
            h: "Combining Multiple Tools",
            p:
            "OSINT professional-ku marnaba isticmaalo hal tool oo keliya — workflow caadi ah: Shodan (infrastructure) → crt.sh (subdomains) → theHarvester (emails) → Maltego (visualize dhammaan xiriirrada)."
          },
          {
            h: "Automation vs Manual Verification",
            p:
            "Tools automated ah waxay bixiyaan speed, laakiin findings-ka waa in la manual verify gareeyo — false positives (subdomains duqoobay, emails aan shaqeynayn) waa caadi automated tools ahaan."
          },
          {
            h: "Documenting OSINT Findings",
            p:
            "Findings kasta waa in la diiwaan geliyo source-kiisa (tools/date), sababtoo ah OSINT-ku wuu isbeddelaa waqti ahaan — screenshot-yo iyo timestamps waa muhiim reproducibility ahaan."
          }
        ],

        terms: [
          { term: "OSINT Workflow", def: "Isku xirka tools badan si loo helo muuqaal ballaaran." }
        ],

        quiz: [
          {
            q: "OSINT professional-ku marnaba wuxuu isticmaalaa?",
            options: [
              "Tools badan si loo helo muuqaal ballaaran",
              "Hal tool oo keliya",
              "Ma jiro tool loo baahan yahay",
              "Kaliya manual research"
            ],
            answer: 0,
            explain: "Coverage ballaaran wuxuu u baahan yahay tools kala duwan."
          },
          {
            q: "Findings automated ah waa in la?",
            options: [
              "Manual verify gareeyo (false positives suurtagal ah)",
              "Aaminaa 100% iyada oo aan la hubin",
              "Ma jiro shuruud",
              "Kaliya loo isticmaalo reporting"
            ],
            answer: 0,
            explain: "Automation-ku ma bixiyo accuracy 100% marwalba."
          },
          {
            q: "Documentation-ka OSINT findings waa in ay ku jirto?",
            options: [
              "Source (tool/date), sababtoo ah OSINT-ku waa isbeddelo",
              "Kaliya natiijada",
              "Ma jiro shuruud",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Reproducibility-ku wuxuu u baahan yahay context sida source/date."
          }
        ],

        exercise: {
          title: "Tool Selection Workflow Design",
          steps: [
            "Naqshadee workflow isugu jira 4 tools (Shodan, crt.sh, theHarvester, Maltego).",
            "Sharax sababta hal tool aanu ku filnayn.",
            "Sharax sida false positives loo verify gareeyo.",
            "Naqshadee documentation format findings OSINT ah."
          ],
          deliverable: "OSINT tool selection workflow guide."
        }
      },


      {
        slug: "osint-capstone-full-profile",
        title: "OSINT Capstone: Full Profile",
        english: "OSINT Capstone: Full Profile",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay — samee full OSINT profile organization tusaale ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad qaadanaysaa authorized external recon assessment shirkad tusaale ah. Waa in aad isticmaasho dhammaan tools-ka aad baratay si aad u dhisto muuqaal ballaaran."
          },
          {
            h: "Infrastructure Recon",
            p:
            "Isticmaal Shodan (exposed services) iyo crt.sh (subdomains) si aad u aqoonsato attack surface-ka technical-ka ah."
          },
          {
            h: "People & Email Recon",
            p:
            "Isticmaal theHarvester (emails) iyo LinkedIn-style research (employees) si aad u dhisto profile human-ka ah."
          },
          {
            h: "Visualization & Reporting",
            p:
            "Isticmaal Maltego (concept ahaan) si aad u dhisto graph isku xira dhammaan findings-ka, oo diyaari warbixin comprehensive ah."
          }
        ],

        terms: [
          { term: "Full OSINT Profile", def: "Profile isugu jira infrastructure, people, iyo visualization." }
        ],

        quiz: [
          {
            q: "Full OSINT profile-ku wuxuu isku daraa?",
            options: [
              "Infrastructure recon (Shodan/crt.sh) + people recon (theHarvester) + visualization (Maltego)",
              "Kaliya hal tool",
              "Ma jiro isku darid",
              "Kaliya Google dorking"
            ],
            answer: 0,
            explain: "Muuqaal ballaaran wuxuu u baahan yahay tools kala duwan."
          },
          {
            q: "Documentation-ka warbixinta ugu dambaysa waa in ay ku jirto?",
            options: [
              "Sources la isticmaalay, findings, attack surface summary",
              "Kaliya liis tools",
              "Ma jiro shuruud",
              "Kaliya screenshots"
            ],
            answer: 0,
            explain: "Report dhamaystiran wuxuu u baahan yahay context iyo findings labadaba."
          },
          {
            q: "Attack surface summary-ga warbixinta ugu dambaysa waa in uu?",
            options: [
              "Isku daro findings-ka technical iyo human-ka labadaba",
              "Kaliya technical findings",
              "Ma jiro shuruud",
              "Kaliya loo isticmaalo social media"
            ],
            answer: 0,
            explain: "Muuqaal dhamaystiran wuxuu u baahan yahay dhinacyada oo dhan."
          },
        ],

        exercise: {
          title: "Full OSINT Profile Building",
          steps: [
            "Isticmaal Shodan + crt.sh si aad u dhisto infrastructure recon.",
            "Isticmaal theHarvester si aad u dhisto people/email recon.",
            "Naqshadee graph concept ah (Maltego-style) isku xira findings-ka.",
            "Diyaari full OSINT report oo attack surface summary leh (portfolio-ready)."
          ],
          deliverable: "Full OSINT profile report (portfolio-ready)."
        }
      },

    ],
  }),
];

export function findToolDeepDive(slug: string) {
  return toolDeepDiveModules.find((x) => x.slug === slug);
}

export function findToolDeepDiveLesson(moduleSlug: string, lessonSlug: string) {
  const mod = findToolDeepDive(moduleSlug);
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

export const toolDeepDiveTotalLessons = toolDeepDiveModules.reduce((n, x) => n + x.lessons, 0);
export const toolDeepDiveTotalHours = toolDeepDiveModules.reduce((n, x) => n + x.hours, 0);
