import type { Module } from "./curriculum";

const m = (
  mod: Omit<Module, "lessons" | "topics"> & { topics?: string[] },
): Module => ({
  ...mod,
  topics: mod.topics ?? mod.lessonList.map((l) => l.english),
  lessons: mod.lessonList.length,
});

export const cloudSecurityModules: Module[] = [
  m({
    id: "cs1",
    slug: "cloud-security-fundamentals",
    stage: "Sare",
    title: "Aasaaska Cloud Security",
    english: "Cloud Security Fundamentals",
    hours: 2,

    outcome:
      "Waxaad fahmi doontaa shared responsibility model-ka, cloud service/deployment models, iyo mabaadi'da asaasiga ah ee amniga cloud-ka.",

    topics: [
      "What is Cloud Computing?",
      "Shared Responsibility Model",
      "Cloud Service Models: IaaS, PaaS, SaaS",
      "Cloud Deployment Models",
      "Cloud Security Principles",
      "AWS vs Azure vs GCP Overview",
      "Fundamentals Capstone Review",
    ],

    lessonList: [

      {
        slug: "what-is-cloud-computing",
        title: "Waa Maxay Cloud Computing?",
        english: "What is Cloud Computing?",
        minutes: 10,

        summary:
          "Faham qeexitaanka cloud computing iyo sida uu uga duwan yahay on-premise infrastructure.",

        sections: [
          {
            h: "Qeexitaanka Cloud Computing",
            p:
            "Cloud computing waa bixinta resources-ka computing (servers, storage, databases, networking) internet-ka iyada oo lagu bixinayo 'on-demand', halkii la iibsan lahaa oo la maamuli lahaa hardware jireed."
          },
          {
            h: "On-Premise vs Cloud",
            p:
            "On-premise infrastructure-ku waa hardware/data centers shirkaddu leedahay oo ay maamusho. Cloud-ku wuxuu wax ka beddelaa kharashka (CapEx → OpEx), scalability-ga, iyo doorka security-ga — vendor-ku wuxuu maamulaa qaybo ka mid ah security-ga."
          },
          {
            h: "Sababta Cloud Security Ay Takhasus Tahay",
            p:
            "Amniga cloud-ku wuxuu leeyahay caqabado gaar ah: misconfigurations (habka ugu badan ee cloud breaches ku dhacaan), identity-centric security (IAM waa 'perimeter cusub'), iyo la wadaagista responsibility vendor-ka iyo customer-ka."
          },
          {
            h: "Multi-Cloud & Hybrid Environments",
            p:
            "Shirkadaha badan waxay isticmaalaan cloud providers badan (AWS + Azure) ama isku daraan on-premise iyo cloud (hybrid). Kani wuxuu kordhinayaa complexity-ga security-ga, waxaana loo baahan yahay hab-dhac isku mid ah oo la maamulo."
          }
        ],

        terms: [
          { term: "Cloud Computing", def: "Bixinta resources computing internet-ka on-demand ahaan." },
          { term: "CapEx vs OpEx", def: "Kharash hore la bixiyo (hardware) vs kharash joogto ah (subscription)." },
          { term: "Hybrid Cloud", def: "Isku darka on-premise iyo cloud infrastructure." }
        ],

        quiz: [
          {
            q: "Cloud computing wuxuu ka beddelaa kharashka shirkadda?",
            options: [
              "CapEx (hardware iibsiga) → OpEx (subscription joogto ah)",
              "OpEx → CapEx",
              "Ma jiro isbeddel kharash",
              "Wuxuu kaliya kordhinayaa kharashka"
            ],
            answer: 0,
            explain: "Cloud-ku wuxuu ka dhigayaa infrastructure kharash joogto ah halkii hore loo bixin lahaa."
          },
          {
            q: "Sababta misconfigurations ay yihiin habka ugu badan ee cloud breaches ku dhacaan waa?",
            options: [
              "Customer-ku waa mas'uul security-ga configuration-ka gudihiisa (shared responsibility)",
              "Cloud providers-yadu ma bixiyaan security",
              "Ma jiro sabab",
              "Cloud-ku waligiis waa mid aan ammaan ahayn"
            ],
            answer: 0,
            explain: "Customer-ku wuxuu mas'uul ka yahay habka uu u dejiyo resources-ka — khaladaad configuration ah ayaa ugu badan."
          },
          {
            q: "IAM loo yiraahdo 'perimeter cusub' cloud-ka gudihiisa sababtoo ah?",
            options: [
              "Ma jiro perimeter network jireed sida on-premise, identity-gu waa control-ka aasaasiga ah",
              "IAM ma khuseeyo cloud-ka",
              "Firewalls-ku waa control-ka aasaasiga ah weli",
              "Ma jiro sabab"
            ],
            answer: 0,
            explain: "Cloud-ka gudihiisa, access-ku wuxuu ku salaysan yahay identity, ma aha network location."
          },
          {
            q: "Multi-cloud strategy wuxuu kordhinayaa?",
            options: [
              "Complexity-ga security-ga oo u baahan hab-dhac isku mid ah",
              "Wuxuu si toos ah u yareeyaa risk-ka",
              "Ma jiro saameyn security ah",
              "Wuxuu ka saarayaa baahida IAM"
            ],
            answer: 0,
            explain: "Providers kala duwan waxay leeyihiin tools/configurations kala duwan, taasoo adkeynaysa consistency."
          }
        ],

        exercise: {
          title: "Cloud Fundamentals Overview",
          steps: [
            "Sharax farqiga on-premise iyo cloud infrastructure.",
            "Sharax sababta misconfigurations ay yihiin khatarta ugu badan.",
            "Sharax macnaha 'IAM waa perimeter cusub'.",
            "Liis garee 3 caqabado security ah oo multi-cloud environments leeyihiin."
          ],
          deliverable: "Cloud computing fundamentals overview."
        }
      },


      {
        slug: "shared-responsibility-model",
        title: "Shared Responsibility Model",
        english: "Shared Responsibility Model",
        minutes: 12,

        summary:
          "Faham qoto dheer shared responsibility model-ka — waxa vendor-ku maamulo iyo waxa customer-ku maamulo.",

        sections: [
          {
            h: "Waa Maxay Shared Responsibility Model?",
            p:
            "Shared Responsibility Model wuxuu qeexayaa mas'uuliyadaha u kala qaybsan cloud provider-ka (tusaale AWS, Azure) iyo customer-ka. Provider-ku wuxuu mas'uul ka yahay 'security OF the cloud', customer-ku 'security IN the cloud'."
          },
          {
            h: "IaaS, PaaS, SaaS — Sida Responsibility-du U Kala Duwan Tahay",
            p:
            "IaaS (tusaale EC2): customer-ku wuxuu mas'uul ka yahay OS, applications, data, iyo network config. PaaS: provider-ku wuxuu maamulaa runtime-ka; customer-ku wuxuu diiradda saaraa app iyo data. SaaS: provider-ku wuxuu maamulaa wax kasta marka laga reebo user access iyo data classification."
          },
          {
            h: "Customer-Ka Mas'uuliyadiisa (Kaliya IaaS Tusaale ah)",
            p:
            "Data encryption, identity & access management, operating system patching, network traffic protection, iyo application-level security — dhammaantood waa mas'uuliyad customer-ka, xitaa haddii uu ku shaqeeyo cloud-ka."
          },
          {
            h: "Provider-Ka Mas'uuliyadiisa",
            p:
            "Physical security data centers-ka, infrastructure hardware/network globally, iyo hypervisor security (isolation-ka VMs-ka u dhexeeya) — kuwaan waa mas'uuliyad provider-ka, customer-ku ma awoodo inuu wax ka beddelo."
          }
        ],

        terms: [
          { term: "Shared Responsibility Model", def: "Qeexitaanka mas'uuliyadaha u kala qaybsan provider-ka iyo customer-ka." },
          { term: "Security OF the Cloud", def: "Mas'uuliyadda provider-ka — infrastructure, physical security." },
          { term: "Security IN the Cloud", def: "Mas'uuliyadda customer-ka — data, IAM, configuration." }
        ],

        quiz: [
          {
            q: "'Security OF the cloud' waa mas'uuliyad?",
            options: ["Provider-ka", "Customer-ka", "Labadaba si isku mid ah", "Ma jiro mas'uul"],
            answer: 0,
            explain: "Provider-ku wuxuu maamulaa infrastructure iyo physical security."
          },
          {
            q: "IaaS gudaheeda, customer-ku mas'uul ka yahay?",
            options: [
              "OS, applications, data, network config",
              "Physical hardware oo keliya",
              "Hypervisor-ka oo keliya",
              "Wax kasta oo dhan"
            ],
            answer: 0,
            explain: "IaaS-ku wuxuu siiyaa customer-ka awood/mas'uuliyad ugu badan marka la barbardhigo PaaS/SaaS."
          },
          {
            q: "SaaS gudaheeda, provider-ku wuxuu maamulaa wax kasta marka laga reebo?",
            options: [
              "User access iyo data classification",
              "Wax kasta, customer ma laha mas'uuliyad",
              "Kaliya hardware",
              "Ma jiro qayb customer-ku maamulo"
            ],
            answer: 0,
            explain: "Xitaa SaaS gudaheeda, customer-ku weli wuxuu mas'uul ka yahay cidda access u leh iyo xogta la kaydiyo."
          },
          {
            q: "Sababta shared responsibility model-ka loo fahmo si sax ah waa?",
            options: [
              "Si aan la iska filin in vendor-ku maamulo wax uusan maamulin (misconfig risk)",
              "Ma jiro sabab",
              "Kaliya loo baahan yahay compliance",
              "Wuxuu ka saarayaa baahida encryption"
            ],
            answer: 0,
            explain: "Fahamka khaldan wuxuu keeni karaa security gaps aan la ogeyn."
          }
        ],

        exercise: {
          title: "Shared Responsibility Mapping",
          steps: [
            "Naqshadee jaantus IaaS/PaaS/SaaS ah oo muujinaya mas'uuliyadaha.",
            "Xulo 5 security controls, kala saar provider vs customer mas'uuliyad.",
            "Sharax khatarta ka imaan karta fahamka khaldan ee model-kan.",
            "Sharax tusaale breach ah oo ka dhashay customer misconfiguration."
          ],
          deliverable: "Shared responsibility model mapping sheet."
        }
      },


      {
        slug: "cloud-service-models",
        title: "Cloud Service Models: IaaS, PaaS, SaaS",
        english: "Cloud Service Models: IaaS, PaaS, and SaaS",
        minutes: 13,

        summary:
          "Faham qoto dheer saddexda service model ee cloud-ka iyo tusaalayaal dhab ah.",

        sections: [
          {
            h: "IaaS (Infrastructure as a Service)",
            p:
            "IaaS wuxuu bixiyaa virtualized computing resources internet-ka (servers, storage, networking). Tusaalayaal: AWS EC2, Azure Virtual Machines. Customer-ku wuxuu maamulaa OS ilaa application layers."
          },
          {
            h: "PaaS (Platform as a Service)",
            p:
            "PaaS wuxuu bixiyaa platform lagu dhiso, lagu tijaabiyo, oo lagu deploy gareeyo applications, iyada oo aan loo baahnayn in la maamulo infrastructure hoose. Tusaalayaal: AWS Elastic Beanstalk, Azure App Service."
          },
          {
            h: "SaaS (Software as a Service)",
            p:
            "SaaS wuxuu bixiyaa software applications si toos ah internet-ka (subscription-based). Tusaalayaal: Microsoft 365, Salesforce, Google Workspace. Customer-ku ma maamulo infrastructure ama code, kaliya data iyo user access."
          },
          {
            h: "Doorashada Model-ka Saxda ah",
            p:
            "IaaS wuxuu siiyaa control ugu badan, laakiin mas'uuliyad ugu badan. SaaS wuxuu siiyaa fudayd ugu badan, laakiin control ugu yar. Doorashadu waxay ku xiran tahay baahida shirkadda iyo heerka security team-ku awoodo inuu maamulo."
          }
        ],

        terms: [
          { term: "IaaS", def: "Infrastructure as a Service — virtualized computing resources." },
          { term: "PaaS", def: "Platform as a Service — platform loo dhiso apps, aan infrastructure la maamulin." },
          { term: "SaaS", def: "Software as a Service — applications subscription-based ah." }
        ],

        quiz: [
          {
            q: "AWS EC2 waa tusaale?",
            options: ["IaaS", "PaaS", "SaaS", "Ma jiro category"],
            answer: 0,
            explain: "EC2 wuxuu bixiyaa virtual machines — customer-ku wuxuu maamulaa OS."
          },
          {
            q: "Microsoft 365 waa tusaale?",
            options: ["SaaS", "IaaS", "PaaS", "Ma jiro category"],
            answer: 0,
            explain: "M365 waa software subscription-based ah oo si toos ah loo isticmaalo."
          },
          {
            q: "PaaS-ka faa'iidadiisu waa?",
            options: [
              "Aan loo baahnayn in la maamulo infrastructure hoose",
              "Control ugu badan ee infrastructure",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo databases"
            ],
            answer: 0,
            explain: "PaaS-ku wuxuu u ogolaadaa developers-ka inay diiradda saaraan code-ka oo keliya."
          },
          {
            q: "IaaS wuxuu siiyaa customer-ka?",
            options: [
              "Control ugu badan, mas'uuliyad ugu badan",
              "Control ugu yar, mas'uuliyad ugu yar",
              "Isku mid SaaS",
              "Ma jiro control"
            ],
            answer: 0,
            explain: "IaaS-ku wuxuu siiyaa awood buuxa OS ilaa application, laakiin mas'uuliyad la mid ah."
          }
        ],

        exercise: {
          title: "Service Model Selection Practice",
          steps: [
            "Sharax saddexda service models iyo tusaalayaal dhab ah.",
            "Xulo 3 scenarios shirkadeed, mid kasta u dooro service model ugu habboon.",
            "Sharax sababta doorashada kasta.",
            "Naqshadee jaantus barbardhig control vs responsibility saddexda model."
          ],
          deliverable: "Cloud service model selection guide."
        }
      },


      {
        slug: "cloud-deployment-models",
        title: "Cloud Deployment Models",
        english: "Cloud Deployment Models",
        minutes: 15,

        summary:
          "Faham noocyada deployment models-ka cloud-ka — public, private, hybrid, iyo multi-cloud.",

        sections: [
          {
            h: "Public Cloud",
            p:
            "Public cloud-ku wuxuu bixiyaa resources dadweynaha oo dhan (AWS, Azure, GCP). Infrastructure-ku waa la wadaagaa customers badan (multi-tenant), laakiin waxaa jira isolation logical ah customer kasta dhexdiisa."
          },
          {
            h: "Private Cloud",
            p:
            "Private cloud-ku waa infrastructure gaar ah oo hal organization u isticmaasho — laga yaabo inuu ku jiro on-premise ama uu maamulo third-party provider. Wuxuu bixiyaa control iyo customization sare, laakiin qaali ah."
          },
          {
            h: "Hybrid Cloud",
            p:
            "Hybrid cloud-ku wuxuu isku daraa public iyo private cloud (ama on-premise), iyada oo xogta iyo applications-ku u dhaqaaqi karaan labada dhexdood. Wuxuu u oggolaadaa flexibility (burst to cloud) iyada oo la ilaalinayo control-ka xogta xasaasiga ah."
          },
          {
            h: "Community Cloud & Multi-Cloud",
            p:
            "Community cloud-ku waa infrastructure la wadaago organizations dhawr ah oo leh baahiyo isku mid ah (tusaale government agencies). Multi-cloud-ku wuxuu isticmaalaa providers badan (AWS + Azure) si loo yareeyo vendor lock-in ama loo isticmaalo faa'iidooyinka kala duwan."
          }
        ],

        terms: [
          { term: "Multi-Tenant", def: "Infrastructure la wadaago customers badan, isolation logical ah leh." },
          { term: "Vendor Lock-In", def: "Ku tiirsanaanta provider hal ah, taasoo adkeynaysa in la beddelo." }
        ],

        quiz: [
          {
            q: "Public cloud-ku wuxuu isticmaalaa?",
            options: [
              "Multi-tenant model, isolation logical ah",
              "Hal customer oo keliya",
              "Ma jiro isolation",
              "Kaliya on-premise"
            ],
            answer: 0,
            explain: "Customers badan waxay wadaagaan infrastructure-ka isla mar, laakiin si go'doonsan."
          },
          {
            q: "Hybrid cloud-ku wuxuu u ogolaadaa?",
            options: [
              "Flexibility iyada oo la ilaalinayo control-ka xogta xasaasiga ah",
              "Kaliya public cloud isticmaal",
              "Kaliya private cloud isticmaal",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Hybrid-ku wuxuu isku daraa faa'iidooyinka labada dhinac."
          },
          {
            q: "Multi-cloud strategy-gu wuxuu yareeyaa?",
            options: [
              "Vendor lock-in",
              "Security risk oo dhan",
              "Complexity",
              "Cost oo dhan"
            ],
            answer: 0,
            explain: "Providers badan waxay yareeyaan ku tiirsanaanta hal vendor, laakiin waxay kordhiyaan complexity."
          },
          {
            q: "Private cloud-ku wuxuu bixiyaa?",
            options: [
              "Control iyo customization sare, laakiin qaali",
              "Kharash ugu jaban",
              "Ma jiro control",
              "Kaliya loo isticmaalo startups"
            ],
            answer: 0,
            explain: "Infrastructure gaarka ah wuxuu siiyaa control badan, laakiin kharash sare leh."
          }
        ],

        exercise: {
          title: "Deployment Model Decision Matrix",
          steps: [
            "Sharax afarta deployment models.",
            "Naqshadee decision matrix (compliance, cost, control) mid kasta.",
            "Xulo scenario government agency ah, dooro deployment model ugu habboon.",
            "Sharax sababta multi-cloud loo doorto shirkado waaweyn."
          ],
          deliverable: "Cloud deployment model decision matrix."
        }
      },


      {
        slug: "cloud-security-principles",
        title: "Cloud Security Principles",
        english: "Cloud Security Principles",
        minutes: 11,

        summary:
          "Faham mabaadi'da asaasiga ah ee amniga cloud-ka — defense in depth, least privilege, iyo automation.",

        sections: [
          {
            h: "Defense in Depth Cloud-ka Gudihiisa",
            p:
            "Defense in depth cloud-ku wuxuu isku daraa layers badan: network security (VPC/security groups), identity (IAM), data (encryption), application (WAF), iyo monitoring (logging/alerting) — hal layer keliya kuma filna."
          },
          {
            h: "Principle of Least Privilege",
            p:
            "Users/services waa in la siiyaa kaliya permissions-ka ugu yar ee loo baahan yahay shaqadooda. Cloud-ka gudihiisa, over-permissioned IAM roles waa mid ka mid ah misconfigurations-ka ugu badan."
          },
          {
            h: "Automation & Infrastructure as Code (IaC)",
            p:
            "Infrastructure as Code (Terraform, CloudFormation) wuxuu u oggolaadaa security controls in lagu qoro code, taasoo yareysa human error, kordhinaysa consistency, waxayna u ogolaataa security scanning automated ah (code review ka hor deployment)."
          },
          {
            h: "Zero Trust in Cloud Environments",
            p:
            "Zero Trust wuxuu qeexayaa 'never trust, always verify' — xitaa gudaha network-ka, request/user/device kastaa waa in la xaqiijiyo. Cloud-ku wuxuu ku habboon yahay zero trust sababtoo ah ma jiro perimeter jireed la aamini karo."
          }
        ],

        terms: [
          { term: "Defense in Depth", def: "Isticmaalka layers badan oo security ah, ma aha hal control." },
          { term: "Infrastructure as Code (IaC)", def: "Qorista infrastructure configuration sida code." },
          { term: "Zero Trust", def: "Mabda' 'never trust, always verify' — xaqiijin joogto ah." }
        ],

        quiz: [
          {
            q: "Defense in depth wuxuu isku daraa?",
            options: [
              "Layers badan oo security ah (network, identity, data, monitoring)",
              "Hal control oo keliya",
              "Kaliya firewall",
              "Kaliya encryption"
            ],
            answer: 0,
            explain: "Layer kasta wuxuu bixiyaa ilaalin, haddii mid guuldarraysto kuwa kale way sii jiraan."
          },
          {
            q: "Over-permissioned IAM roles waa?",
            options: [
              "Misconfiguration caan ah oo la iska ilaaliyo",
              "Caadi ahaan",
              "Best practice",
              "Ma jiro khatar"
            ],
            answer: 0,
            explain: "Least privilege-ka la'aantiisu waa risk badan oo cloud environments ah."
          },
          {
            q: "IaC (Terraform, CloudFormation) faa'iidadeeda ugu weyn waa?",
            options: [
              "Yareynta human error iyo kordhinta consistency",
              "Kordhinta kharashka",
              "Ma jiro faa'iido security ah",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Code-based infrastructure wuxuu u oggolaadaa review iyo automated scanning."
          },
          {
            q: "Zero Trust mabda'giisu waa?",
            options: [
              "Never trust, always verify",
              "Trust dhammaan gudaha network-ka",
              "Kaliya external threats la xaqiijiyo",
              "Ma jiro verification loo baahan yahay"
            ],
            answer: 0,
            explain: "Zero Trust-ku wuxuu xaqiijiyaa request/user/device kasta, xitaa gudaha."
          }
        ],

        exercise: {
          title: "Cloud Security Principles Application",
          steps: [
            "Naqshadee defense in depth layers 5 ah oo cloud environment ah.",
            "Sharax tusaale over-permissioned IAM role ah oo la hagaajiyay least privilege.",
            "Sharax faa'iidada IaC security scanning ahaan.",
            "Sharax sida Zero Trust loogu dabaqi lahaa cloud API access."
          ],
          deliverable: "Cloud security principles application guide."
        }
      },


      {
        slug: "aws-azure-gcp-overview",
        title: "AWS vs Azure vs GCP Overview",
        english: "AWS vs Azure vs GCP Overview",
        minutes: 14,

        summary:
          "Faham qoto dheer saddexda provider-ka ugu waaweyn iyo terminology-gooda kala duwan.",

        sections: [
          {
            h: "AWS (Amazon Web Services)",
            p:
            "AWS waa provider-ka ugu weyn market share ahaan. Key services: EC2 (compute), S3 (storage), IAM (identity), VPC (networking), CloudTrail (logging). Terminology: 'IAM roles', 'security groups', 'buckets'."
          },
          {
            h: "Microsoft Azure",
            p:
            "Azure wuxuu si xoog leh ula xiriiraa enterprise Microsoft environments (Active Directory integration). Key services: Virtual Machines, Blob Storage, Entra ID (hore loo yiqiin Azure AD), Virtual Network, Azure Monitor."
          },
          {
            h: "Google Cloud Platform (GCP)",
            p:
            "GCP wuxuu caan ku yahay data analytics iyo Kubernetes (GCP-ku wuxuu abuuray Kubernetes). Key services: Compute Engine, Cloud Storage, Cloud IAM, VPC, Cloud Logging."
          },
          {
            h: "Terminology Mapping u Dhexeeya Providers",
            p:
            "AWS 'Security Groups' = Azure 'Network Security Groups (NSGs)'. AWS 'S3 Bucket' = Azure 'Blob Storage Container'. AWS 'IAM Role' = Azure 'Managed Identity'. Fahamka mapping-kan wuxuu caawiyaa multi-cloud security professionals."
          }
        ],

        terms: [
          { term: "AWS IAM", def: "Identity and Access Management — AWS service-ka aqoonsiga." },
          { term: "Azure Entra ID", def: "Identity service Azure ah (hore Azure AD)." }
        ],

        quiz: [
          {
            q: "AWS 'Security Groups' waxay u dhigmaan Azure?",
            options: [
              "Network Security Groups (NSGs)",
              "Blob Storage",
              "Managed Identity",
              "Ma jiro u dhigma"
            ],
            answer: 0,
            explain: "Labaduba waa firewall rules resource-level ah."
          },
          {
            q: "GCP wuxuu caan ku yahay?",
            options: [
              "Data analytics iyo Kubernetes",
              "Enterprise Active Directory integration",
              "Kaliya storage",
              "Ma jiro takhasus gaar ah"
            ],
            answer: 0,
            explain: "Google waa asal ahaan Kubernetes-ka abuuray, GCP-na waa horyaraha data analytics-ka."
          },
          {
            q: "Azure wuxuu si xoog leh ula xiriiraa?",
            options: [
              "Enterprise Microsoft environments (AD integration)",
              "Kaliya startups",
              "Kaliya data analytics",
              "Ma jiro isku xiriir gaar ah"
            ],
            answer: 0,
            explain: "Shirkadaha isticmaala Microsoft 365/AD waxay badanaa doortaan Azure."
          },
          {
            q: "AWS S3 Bucket wuxuu u dhigmaa Azure?",
            options: [
              "Blob Storage Container",
              "Virtual Machine",
              "Security Group",
              "IAM Role"
            ],
            answer: 0,
            explain: "Labaduba waa object storage services."
          }
        ],

        exercise: {
          title: "Multi-Cloud Terminology Mapping",
          steps: [
            "Naqshadee jaantus terminology mapping AWS/Azure/GCP ah (10 terms).",
            "Sharax takhasuska kala duwan ee saddexda provider.",
            "Xulo scenario shirkad ah, sharax sababta provider la doorto.",
            "Sharax faa'iidada fahamka terminology mapping-ka professional multi-cloud ah."
          ],
          deliverable: "Multi-cloud terminology reference sheet."
        }
      },


      {
        slug: "cloud-fundamentals-capstone",
        title: "Fundamentals — Capstone Review",
        english: "Cloud Security Fundamentals Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — naqshadee cloud security assessment plan asaasi ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Shirkad tusaale ah ayaa u guuraysa cloud-ka (AWS) marka ugu horreysa. Waxaad tahay security consultant-ka la dalbaday inuu naqshadeeyo approach-ka asaasiga ah."
          },
          {
            h: "Shared Responsibility Assessment",
            p:
            "Sharax mas'uuliyadaha shirkadda (customer) marka la barbardhigo AWS (provider), iyadoo la isticmaalayo service model-ka (IaaS/PaaS/SaaS) ay isticmaali doonaan."
          },
          {
            h: "Deployment Model Selection",
            p:
            "Naqshadee talo deployment model ah (public/hybrid) iyadoo lagu saleynayo baahida shirkadda."
          },
          {
            h: "Security Principles Application",
            p:
            "Sharax sida defense in depth, least privilege, iyo IaC loogu dabaqi lahaa migration-kan."
          }
        ],

        terms: [
          { term: "Cloud Migration Planning", def: "Naqshadaynta approach-ka security ka hor migration cloud ah." }
        ],

        quiz: [
          {
            q: "Marka shirkad u guurayso cloud, tallaabada ugu horreysa waa?",
            options: [
              "Fahamka shared responsibility model-ka service model-ka la doortay",
              "Isla markiiba migration-ka",
              "Warbixinta ugu dambaysa",
              "Ka baxsan planning-ka"
            ],
            answer: 0,
            explain: "Fahamka mas'uuliyadaha waa saldhig u ah planning-ka oo dhan."
          },
          {
            q: "Deployment model selection-ku wuxuu ku salaysan yahay?",
            options: [
              "Baahida shirkadda (compliance, cost, control)",
              "Kaliya cost-ka",
              "Kaliya cid la weydiiyay",
              "Ma jiro factors"
            ],
            answer: 0,
            explain: "Factors badan ayaa go'aamiya deployment model-ka ugu habboon."
          },
          {
            q: "IaC-ga migration-ka lagu daro wuxuu bixiyaa?",
            options: [
              "Consistency iyo yaraynta human error",
              "Ma jiro faa'iido",
              "Kaliya kordhinta cost",
              "Kaliya loo baahan yahay compliance"
            ],
            answer: 0,
            explain: "IaC-ku wuxuu ka dhigayaa security controls kuwo la isku halayn karo oo automated ah."
          }
        ],

        exercise: {
          title: "Cloud Migration Security Plan",
          steps: [
            "Sharax shared responsibility breakdown-ka scenario-ga (AWS, service model la doortay).",
            "Xulo deployment model, sharax sababta.",
            "Naqshadee 3 security principles (defense in depth, least privilege, IaC) migration-ka lagu dabaqi lahaa.",
            "Diyaari cloud security assessment plan asaasi ah (portfolio-ready)."
          ],
          deliverable: "Cloud migration security assessment plan (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "cs2",
    slug: "cloud-identity-access-management",
    stage: "Sare",
    title: "Cloud Identity & Access Management",
    english: "Cloud Identity & Access Management",
    hours: 1,

    outcome:
      "Waxaad si adag u fahmi doontaa IAM policies, roles, MFA, federation, iyo privilege escalation risks cloud-ka gudihiisa.",

    topics: [
      "IAM Fundamentals",
      "IAM Policies & Permissions",
      "Roles vs Users vs Groups",
      "Multi-Factor Authentication (MFA)",
      "Identity Federation & SSO",
      "Privileged Access Management",
      "IAM Capstone",
    ],

    lessonList: [

      {
        slug: "iam-fundamentals-cloud",
        title: "Aasaaska IAM Cloud-ka",
        english: "IAM Fundamentals",
        minutes: 12,

        summary:
          "Faham qeexitaanka IAM iyo sababta uu u yahay control-ka aasaasiga ah ee cloud security.",

        sections: [
          {
            h: "Waa Maxay IAM?",
            p:
            "Identity and Access Management (IAM) waa framework lagu maamulo cidda leh access (authentication) iyo waxa ay samayn karaan (authorization) resources cloud ah. Waa control-ka aasaasiga ah ee cloud security."
          },
          {
            h: "Authentication vs Authorization",
            p:
            "Authentication waxay xaqiijisaa cidda ay tahay user-ku (login, MFA). Authorization waxay go'aamisaa waxa user-kaas la oggol yahay inuu sameeyo (permissions, policies). Labaduba waa kuwo la isku daray, laakiin kala duwan."
          },
          {
            h: "Principle of Least Privilege Cloud-ka",
            p:
            "IAM policies waa in ay siiyaan kaliya permissions-ka waajibka ah. Wildcard permissions (tusaale '*' actions oo dhan resources oo dhan) waa mid ka mid ah misconfigurations-ka ugu daran ee cloud IAM."
          },
          {
            h: "IAM Attack Surface",
            p:
            "Credentials la xaday (access keys), roles over-permissioned ah, iyo trust relationships aan la maamulin waa dhammaantood attack vectors caan ah. Breaches cloud-ka badankood waxay ku bilaabmaan IAM misconfiguration ama credential theft."
          }
        ],

        terms: [
          { term: "IAM", def: "Identity and Access Management — framework maamula access-ka." },
          { term: "Authentication", def: "Xaqiijinta cidda ay tahay user-ku." },
          { term: "Authorization", def: "Go'aaminta waxa user-ku la oggol yahay inuu sameeyo." }
        ],

        quiz: [
          {
            q: "Authentication waa?",
            options: [
              "Xaqiijinta cidda ay tahay user-ku",
              "Go'aaminta waxa la oggol yahay",
              "Isku mid authorization",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "Authentication-ku wuxuu ka horreeyaa authorization-ka."
          },
          {
            q: "Wildcard permissions ('*') waxay ka dhigan yihiin?",
            options: [
              "Misconfiguration caan ah oo halis ah",
              "Best practice",
              "Waajib IAM policy kasta",
              "Ma jiro khatar"
            ],
            answer: 0,
            explain: "Wildcards waxay siiyaan access aad u ballaaran, ka horjeeda least privilege."
          },
          {
            q: "Breaches cloud-ka badankood waxay ku bilaabmaan?",
            options: [
              "IAM misconfiguration ama credential theft",
              "Kaliya physical attacks",
              "Kaliya hardware failures",
              "Ma jiro pattern gaar ah"
            ],
            answer: 0,
            explain: "Identity-ku waa attack surface-ka ugu badan cloud environments-ka."
          },
          {
            q: "IAM waa control-ka aasaasiga ah sababtoo ah?",
            options: [
              "Cloud-ka gudihiisa access-ku wuxuu ku salaysan yahay identity, ma aha network perimeter",
              "Ma jiro sabab gaar ah",
              "IAM waa optional",
              "Network security ayaa ka muhiimsan"
            ],
            answer: 0,
            explain: "IAM waa saldhigga amniga cloud-ka, sababtoo ah ma jiro perimeter jireed."
          }
        ],

        exercise: {
          title: "IAM Fundamentals Review",
          steps: [
            "Sharax farqiga authentication iyo authorization.",
            "Qor tusaale IAM policy leh wildcard permission, sharax khatarta.",
            "Liis garee 3 IAM attack vectors caan ah.",
            "Sharax sababta IAM loo yiraahdo control-ka aasaasiga ah."
          ],
          deliverable: "IAM fundamentals notes."
        }
      },


      {
        slug: "iam-policies-permissions",
        title: "IAM Policies & Permissions",
        english: "IAM Policies and Permissions",
        minutes: 10,

        summary:
          "Faham qoto dheer sida IAM policies loo qoro iyo loo falanqeeyo, tusaale AWS/Azure ah.",

        sections: [
          {
            h: "Policy Structure (AWS JSON Example)",
            p:
            "AWS IAM policies waxay isticmaalaan JSON structure: Effect (Allow/Deny), Action (waxa la oggol yahay), Resource (halka lagu dabaqayo), iyo Condition (shuruudo dheeraad ah, tusaale IP restriction)."
          },
          {
            h: "Identity-Based vs Resource-Based Policies",
            p:
            "Identity-based policies waxay ku xiran yihiin user/role/group (waxa ay samayn karaan). Resource-based policies waxay ku xiran yihiin resource-ka (tusaale S3 bucket policy — cidda access u leh bucket-kaas)."
          },
          {
            h: "Policy Evaluation Logic",
            p:
            "Marka policies badan isku dhacaan, 'explicit deny' had iyo jeer wuu ka adkaadaa 'allow' — xitaa haddii policy kale uu oggol yahay action-ka, hal explicit deny ayaa diidaya."
          },
          {
            h: "Common Policy Misconfigurations",
            p:
            "Public S3 buckets (Resource policy oo Principal '*' leh), overly permissive trust policies (roles la aamini karo qof kasta), iyo policies aan la audit-gareyn muddo dheer — dhammaantood waa khaladaad caan ah."
          }
        ],

        terms: [
          { term: "IAM Policy", def: "Document JSON-based ah oo qeexaya permissions." },
          { term: "Explicit Deny", def: "Deny cad oo ka adkaada allow kasta oo kale." },
          { term: "Resource-Based Policy", def: "Policy ku xiran resource-ka (tusaale S3 bucket)." }
        ],

        quiz: [
          {
            q: "AWS IAM policy JSON-ka wuxuu ka kooban yahay?",
            options: [
              "Effect, Action, Resource, Condition",
              "Kaliya username",
              "Kaliya password",
              "Kaliya IP address"
            ],
            answer: 0,
            explain: "Qaybahan waxay isku dhisaan policy-ga qeexaya waxa la oggol yahay/diidan yahay."
          },
          {
            q: "Explicit deny wuxuu sameeyaa?",
            options: [
              "Wuxuu ka adkaadaa allow kasta oo kale, xitaa haddii policy kale oggol yahay",
              "Waxaa la iska indho tiraa",
              "Wuxuu u baahan yahay allow kale si uu u shaqeeyo",
              "Ma jiro saameyn"
            ],
            answer: 0,
            explain: "Explicit deny waa 'final say' policy evaluation-ka gudihiisa."
          },
          {
            q: "Public S3 bucket (Principal '*') waa?",
            options: [
              "Misconfiguration halis ah oo qof kasta u oggolaanaya access",
              "Best practice",
              "Waajib dhammaan buckets",
              "Ma jiro khatar"
            ],
            answer: 0,
            explain: "Wildcard principal wuxuu u oggolaadaa qof kasta internet-ka access."
          },
          {
            q: "Resource-based policy tusaale ah waa?",
            options: [
              "S3 bucket policy",
              "IAM user permissions",
              "MFA settings",
              "VPC configuration"
            ],
            answer: 0,
            explain: "Bucket policy-gu wuxuu ku xiran yahay resource-ka (bucket-ka), ma aha user-ka."
          }
        ],

        exercise: {
          title: "IAM Policy Analysis Practice",
          steps: [
            "Qor tusaale IAM policy JSON ah oo Allow leh.",
            "Sharax sida explicit deny loogu darsan lahaa policy kale.",
            "Aqoonso 3 common misconfigurations.",
            "Sharax farqiga identity-based iyo resource-based policies."
          ],
          deliverable: "IAM policy analysis reference sheet."
        }
      },


      {
        slug: "roles-users-groups",
        title: "Roles vs Users vs Groups",
        english: "Roles vs Users vs Groups",
        minutes: 13,

        summary:
          "Faham farqiga IAM roles, users, iyo groups, iyo marka kasta la isticmaalo.",

        sections: [
          {
            h: "IAM Users",
            p:
            "IAM user waa identity gaar ah oo person ama application u gaar ah, oo leh credentials joogto ah (password/access keys). Waxaa loo isticmaalaa marka access joogto ah loo baahan yahay hal entity ah."
          },
          {
            h: "IAM Roles",
            p:
            "IAM role wuxuu bixiyaa temporary credentials, oo aan la xiriirin user gaar ah — waxaa loo isticmaalaa services (tusaale EC2 instance uu access u leh S3), ama cross-account access, ama federation."
          },
          {
            h: "IAM Groups",
            p:
            "IAM groups waxay u oggolaadaan in la isku daro users leh baahiyo permissions isku mid ah (tusaale 'Developers' group). Policies waxaa lagu dabaqaa group-ka, dhammaan members-ka waxay dhaxlaan permissions-kaas."
          },
          {
            h: "Best Practice: Roles Over Long-Term Credentials",
            p:
            "Security best practice-ku wuxuu talinayaa in la isticmaalo roles (temporary credentials) halkii la isticmaali lahaa long-term access keys — sababtoo ah access keys oo la xaday way sii shaqeyn karaan ilaa la baabi'iyo, halka temporary credentials ay si otomaatig ah u dhacaan."
          }
        ],

        terms: [
          { term: "IAM Role", def: "Identity bixisa temporary credentials, aan user gaar ah lahayn." },
          { term: "IAM Group", def: "Isku darka users leh permissions isku mid ah." }
        ],

        quiz: [
          {
            q: "IAM role-ku wuxuu bixiyaa?",
            options: [
              "Temporary credentials",
              "Long-term password oo keliya",
              "Kaliya access keys joogto ah",
              "Ma jiro credentials"
            ],
            answer: 0,
            explain: "Roles-ku waxay bixiyaan credentials ku meel gaadh ah, mid ka ammaan badan."
          },
          {
            q: "IAM groups waxay u oggolaadaan?",
            options: [
              "Isku darka users leh baahiyo permissions isku mid ah",
              "Kaliya hal user",
              "Kaliya services",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "Groups-ku waxay fududeeyaan maamulka permissions users badan."
          },
          {
            q: "Sababta roles loo doorbido long-term access keys waa?",
            options: [
              "Temporary credentials si otomaatig ah ayay u dhacaan, mid ka ammaan badan",
              "Roles waa kuwo ka gaabis",
              "Ma jiro farqi security ah",
              "Access keys marnaba lama xado"
            ],
            answer: 0,
            explain: "Access keys oo la xaday way sii shaqeyn karaan ilaa la baabi'iyo — roles-ku waxay xaddidaan khatartan."
          },
          {
            q: "EC2 instance uu u baahan yahay access S3 wuxuu isticmaali lahaa?",
            options: [
              "IAM role, ma aha access keys hard-coded ah",
              "Password shakhsi ah",
              "Ma jiro hab loo isticmaalo",
              "Kaliya user account"
            ],
            answer: 0,
            explain: "Roles-ku waa best practice service-to-service access ahaan."
          }
        ],

        exercise: {
          title: "IAM Structure Design",
          steps: [
            "Naqshadee IAM structure shirkad tusaale ah (users, groups, roles).",
            "Sharax marka role loo isticmaali lahaa halkii user.",
            "Sharax faa'iidada groups maamulka permissions.",
            "Sharax sababta roles ay ka ammaan badan yihiin access keys hard-coded ah."
          ],
          deliverable: "IAM structure design document."
        }
      },


      {
        slug: "multi-factor-authentication-cloud",
        title: "Multi-Factor Authentication (MFA)",
        english: "Multi-Factor Authentication (MFA)",
        minutes: 10,

        summary:
          "Faham qoto dheer MFA cloud-ka gudihiisa iyo sida loo hirgeliyo si sax ah.",

        sections: [
          {
            h: "Sababta MFA Muhiim u Yahay",
            p:
            "MFA wuxuu ku daraa layer security ah oo dheeraad ah password-ka — xitaa haddii password la xaday (phishing/breach), attacker-ku ma awoodo inuu galo iyada oo aan factor-ka labaad la haysan."
          },
          {
            h: "Noocyada MFA",
            p:
            "SMS/voice (mid ka daciifsan, la exploit-gareyn karo SIM swapping), authenticator apps (TOTP — Time-based One-Time Password, sida Google Authenticator), iyo hardware security keys (FIDO2/U2F, sida YubiKey — mid ka ammaan badan)."
          },
          {
            h: "MFA Root/Admin Accounts",
            p:
            "Root accounts (AWS) ama Global Admin accounts (Azure) waa in ay had iyo jeer lahaadaan MFA — kuwaan waa accounts-ka awoodda ugu sarreysa, khatartoodu waa ugu weyn haddii la xaday."
          },
          {
            h: "MFA Bypass Risks",
            p:
            "MFA fatigue attacks (push notifications badan ilaa la approve gareeyo), SIM swapping (SMS-based), iyo session token theft (marka MFA la maro hal mar) waa habab attacker-yadu ku dhaafaan MFA."
          }
        ],

        terms: [
          { term: "TOTP", def: "Time-based One-Time Password — MFA method authenticator apps isticmaalaan." },
          { term: "FIDO2/U2F", def: "Standard hardware security keys ah, ah nooca MFA ugu ammaan badan." }
        ],

        quiz: [
          {
            q: "SMS-based MFA waa mid ka daciifsan sababtoo ah?",
            options: [
              "SIM swapping waa la exploit-gareyn karaa",
              "Ma jiro khatar",
              "SMS waa mid ka ammaan badan",
              "SMS ma shaqeeyo"
            ],
            answer: 0,
            explain: "SIM swapping attacks-yadu waxay u oggolaadaan attacker inuu helo SMS codes."
          },
          {
            q: "Root/Global Admin accounts waa in ay?",
            options: [
              "Had iyo jeer lahaadaan MFA",
              "Aan MFA loo baahnayn",
              "Kaliya password fudud",
              "Ma jiro shuruud gaar ah"
            ],
            answer: 0,
            explain: "Accounts-ka awoodda ugu sarreysa waa in aad ilaaliyaan si gaar ah."
          },
          {
            q: "Hardware security keys (FIDO2) waa nooca MFA?",
            options: [
              "Ugu ammaan badan",
              "Ugu daciifsan",
              "Aan la isticmaalin cloud-ka",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "FIDO2 waa standard-ka ugu adag in la bypass gareeyo."
          },
          {
            q: "MFA fatigue attack-ku wuxuu isticmaalaa?",
            options: [
              "Push notifications badan ilaa user-ku approve gareeyo",
              "Kaliya brute force password",
              "Kaliya SQL injection",
              "Ma jiro technique"
            ],
            answer: 0,
            explain: "Cadaadis joogto ah wuxuu dhalin karaa in user-ku uu gujiyo approve iyada oo uusan doonayn."
          }
        ],

        exercise: {
          title: "MFA Implementation Planning",
          steps: [
            "Sharax saddexda nooc ee MFA iyo heerarka ammaankooda.",
            "Naqshadee MFA policy shirkad tusaale ah (root/admin accounts).",
            "Sharax habka MFA fatigue attacks u shaqeeyaan.",
            "Talo bixi hardware keys admin accounts-ka ugu muhiimsan."
          ],
          deliverable: "MFA implementation plan."
        }
      },


      {
        slug: "identity-federation-sso",
        title: "Identity Federation & SSO",
        english: "Identity Federation and SSO",
        minutes: 12,

        summary:
          "Faham sida federation iyo SSO u shaqeeyaan cloud environments-ka, iyo standards-ka la isticmaalo.",

        sections: [
          {
            h: "Waa Maxay Identity Federation?",
            p:
            "Identity federation wuxuu u oggolaadaa users-ka inay isticmaalaan identity provider hal ah (tusaale corporate Active Directory) si ay u helaan access systems/cloud services badan, iyada oo aan loo baahnayn credentials kala duwan system kasta."
          },
          {
            h: "SAML & OAuth/OIDC",
            p:
            "SAML (Security Assertion Markup Language) waa standard XML-based ah oo badanaa loo isticmaalo enterprise SSO. OAuth 2.0/OIDC (OpenID Connect) waa standards JSON-based ah oo casri ah, badanaa loo isticmaalo web/mobile apps."
          },
          {
            h: "Single Sign-On (SSO) Benefits",
            p:
            "SSO wuxuu yareeyaa 'password fatigue' (users-ku ma baahna inay xasuustaan passwords badan), wuxuu dhiseeyaa centralized access control, wuxuuna fududeeyaa deprovisioning (marka shaqaale ka baxo, hal account ayaa la xiraa, ma aha kuwo badan)."
          },
          {
            h: "Federation Security Risks",
            p:
            "Haddii identity provider-ka (IdP) la jebiyo, attacker-ku wuxuu heli karaa access dhammaan systems-ka federated ah — sidaas darteed IdP-gu waa in uu leeyahay security xoog ah oo ah, MFA waajib ah."
          }
        ],

        terms: [
          { term: "Identity Federation", def: "Isticmaalka identity provider hal ah oo access u siiya systems badan." },
          { term: "SAML", def: "Standard XML-based ah oo enterprise SSO." },
          { term: "OIDC", def: "OpenID Connect — standard casri ah oo web/mobile apps ah." }
        ],

        quiz: [
          {
            q: "Identity federation wuxuu u oggolaadaa?",
            options: [
              "Isticmaalka identity provider hal ah oo access u siiya systems badan",
              "Isticmaalka password kala duwan system kasta",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo hal app"
            ],
            answer: 0,
            explain: "Federation-ku wuxuu yareeyaa baahida credentials kala duwan."
          },
          {
            q: "SAML iyo OIDC labaduba waa?",
            options: [
              "Standards federation/SSO ah",
              "Encryption algorithms",
              "Malware types",
              "Network protocols oo keliya"
            ],
            answer: 0,
            explain: "Labaduba waa standards lagu maamulo authentication federated ah."
          },
          {
            q: "SSO faa'iidadeeda ugu weyn waa?",
            options: [
              "Yareynta password fatigue iyo fududaynta deprovisioning",
              "Kordhinta password-yada loo baahan yahay",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo mobile apps"
            ],
            answer: 0,
            explain: "SSO wuxuu fududeeyaa maamulka access-ka centralized ahaan."
          },
          {
            q: "Haddii IdP la jebiyo, khatartu waa?",
            options: [
              "Attacker-ku wuxuu heli karaa access dhammaan systems-ka federated ah",
              "Kaliya hal system ayaa saameysan",
              "Ma jiro khatar",
              "Federation-ku si otomaatig ah ayuu u joogsadaa"
            ],
            answer: 0,
            explain: "IdP waa single point of failure — waa in uu leeyahay security xoog ah."
          }
        ],

        exercise: {
          title: "Federation & SSO Planning",
          steps: [
            "Sharax farqiga SAML iyo OIDC.",
            "Naqshadee SSO architecture shirkad tusaale ah.",
            "Sharax faa'iidooyinka centralized deprovisioning.",
            "Sharax sababta IdP uu u baahan yahay MFA waajib ah."
          ],
          deliverable: "Identity federation and SSO plan."
        }
      },


      {
        slug: "privileged-access-management",
        title: "Privileged Access Management",
        english: "Privileged Access Management",
        minutes: 13,

        summary:
          "Faham sida privileged accounts loo maamulo si ammaan ah cloud environments-ka gudahood.",

        sections: [
          {
            h: "Waa Maxay Privileged Access Management (PAM)?",
            p:
            "PAM waa mabaadi'da iyo tools-ka lagu maamulo, lagu ilaaliyo, oo lagu la socdo accounts-ka awoodda sare leh (admin, root) — sababtoo ah accounts-kani waa targets-ka ugu qiimaha badan attacker-yada."
          },
          {
            h: "Just-in-Time (JIT) Access",
            p:
            "JIT access wuxuu siiyaa privileged access kaliya waqti xaddidan (tusaale 1 saac) marka loo baahdo, halkii la siin lahaa access joogto ah — tani waxay yareysaa 'standing privileges' oo attacker uu exploit-gareyn karo."
          },
          {
            h: "Privileged Access Workstations (PAW)",
            p:
            "Admin/root accounts-ka waa in laga isticmaalo dedicated workstations (PAW) — go'doonsan internet browsing/email caadiga ah — si loo yareeyo khatarta compromise iyada oo la adeegsanayo phishing ama malware."
          },
          {
            h: "Session Monitoring & Recording",
            p:
            "Sessions-ka privileged accounts waa in la la socdo oo la duub — haddii account la jebiyo, activity-ga waa la falanqeyn karaa, waxayna sidoo kale u adeegtaa deterrent ahaan insider threats."
          }
        ],

        terms: [
          { term: "PAM", def: "Privileged Access Management — maamulka accounts awoodda sare leh." },
          { term: "Just-in-Time (JIT) Access", def: "Access ku meel gaadh ah, loo siiyay waqti xaddidan." },
          { term: "PAW", def: "Privileged Access Workstation — go'doonsan browsing caadiga ah." }
        ],

        quiz: [
          {
            q: "JIT access wuxuu yareeyaa?",
            options: [
              "Standing privileges oo attacker uu exploit-gareyn karo",
              "Waqtiga la isticmaalo cloud-ka",
              "Ma jiro faa'iido security ah",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Access ku meel gaadh ah wuxuu yareeyaa window-ka opportunity ee attacker-ka."
          },
          {
            q: "Privileged Access Workstation (PAW) waa?",
            options: [
              "Workstation gaar ah oo go'doonsan browsing/email caadiga ah",
              "Workstation caadi ah oo dhammaan employees isticmaalaan",
              "Kaliya laptop personal ah",
              "Ma jiro macno gaar ah"
            ],
            answer: 0,
            explain: "PAW-yadu waxay yareeyaan khatarta compromise iyada oo laga fogaanayo browsing caadiga ah."
          },
          {
            q: "Session monitoring privileged accounts ahaan waxay bixisaa?",
            options: [
              "Awoodda in la falanqeeyo activity haddii account la jebiyo",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo compliance",
              "Kordhinta speed-ka"
            ],
            answer: 0,
            explain: "Duubista sessions-ku waxay taageertaa investigation dambe."
          },
          {
            q: "Sababta PAM muhiim u yahay waa?",
            options: [
              "Privileged accounts waa targets-ka ugu qiimaha badan attacker-yada",
              "Ma jiro sabab gaar ah",
              "Kaliya loo baahan yahay compliance",
              "Accounts caadiga ah ayaa ka muhiimsan"
            ],
            answer: 0,
            explain: "Compromise-ka privileged account-ku wuxuu siiyaa attacker awood buuxa."
          }
        ],

        exercise: {
          title: "PAM Strategy Design",
          steps: [
            "Sharax faa'iidada JIT access halkii standing privileges.",
            "Naqshadee PAW policy admin accounts shirkad ah.",
            "Sharax sida session monitoring loogu isticmaali lahaa investigation.",
            "Naqshadee PAM strategy buuxa shirkad tusaale ah."
          ],
          deliverable: "Privileged access management strategy."
        }
      },


      {
        slug: "iam-capstone",
        title: "IAM — Full Capstone",
        english: "IAM Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — naqshadee IAM security review shirkad tusaale ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad la dalbaday inaad samayso IAM security review shirkad AWS isticmaasho. Waxaad heshay: wildcard policies, users leh access keys joogto ah oo aan MFA lahayn, iyo root account oo aan MFA lahayn."
          },
          {
            h: "Findings Prioritization",
            p:
            "Kala hormari findings-ka (root account aan MFA lahayn ugu horreeya, kadibna wildcard policies, kadibna users aan MFA lahayn)."
          },
          {
            h: "Remediation Plan",
            p:
            "Naqshadee remediation: MFA root account, hagaaji wildcard policies (least privilege), beddel long-term access keys roles ah."
          },
          {
            h: "Ongoing Governance",
            p:
            "Talo bixi habka joogtada ah ee IAM audits (tusaale 90 maalmood kasta) si loo iska ilaaliyo dib u dhac mustaqbalka."
          }
        ],

        terms: [
          { term: "IAM Security Review", def: "Baaritaan dhamaystiran oo IAM configuration ah oo raadinaya misconfigurations." }
        ],

        quiz: [
          {
            q: "Findings-ka scenario-gan, mudnaanta koowaad waa?",
            options: [
              "Root account aan MFA lahayn",
              "Wildcard policies",
              "Users aan MFA lahayn",
              "Ma jirto mudnaan"
            ],
            answer: 0,
            explain: "Root account waa awoodda ugu sarreysa — khatartiisu waa ugu weyn."
          },
          {
            q: "Remediation-ka access keys joogto ah waa?",
            options: [
              "Beddel roles (temporary credentials)",
              "Kaliya beddel password-ka",
              "Ka saar MFA",
              "Ma jiro remediation loo baahan yahay"
            ],
            answer: 0,
            explain: "Roles-ku waa best practice halkii access keys joogto ah."
          },
          {
            q: "IAM audits joogtada ah (90 maalmood) waxay ka hortagaan?",
            options: [
              "Dib u dhac (drift) misconfigurations mustaqbalka ah",
              "Ma jiro faa'iido",
              "Kaliya loo baahan yahay hal mar",
              "Kordhinta cost-ka oo keliya"
            ],
            answer: 0,
            explain: "Environments-ku had iyo jeer way isbeddelayaan — audits joogtada ah waa muhiim."
          }
        ],

        exercise: {
          title: "Full IAM Security Review",
          steps: [
            "Kala hormari findings-ka scenario-ga (root MFA, wildcard, users MFA).",
            "Naqshadee remediation plan finding kasta.",
            "Naqshadee ongoing governance/audit schedule.",
            "Diyaari warbixin IAM security review ah (portfolio-ready)."
          ],
          deliverable: "Full IAM security review report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "cs3",
    slug: "cloud-network-security",
    stage: "Sare",
    title: "Cloud Network Security",
    english: "Cloud Network Security",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa VPC/VNet architecture, security groups/NSGs, network segmentation, iyo DDoS protection cloud-ka gudihiisa.",

    topics: [
      "VPC & Virtual Network Fundamentals",
      "Security Groups & NSGs",
      "Network Segmentation & Subnets",
      "VPN & Private Connectivity",
      "DDoS Protection & WAF",
      "Network Traffic Monitoring",
      "Network Security Capstone",
    ],

    lessonList: [

      {
        slug: "vpc-vnet-fundamentals",
        title: "VPC & Virtual Network Fundamentals",
        english: "VPC and Virtual Network Fundamentals",
        minutes: 15,

        summary:
          "Faham qeexitaanka VPC (AWS) / VNet (Azure) iyo qaab-dhismeedka network-ka cloud-ka.",

        sections: [
          {
            h: "Waa Maxay VPC/VNet?",
            p:
            "Virtual Private Cloud (AWS) ama Virtual Network (Azure) waa network go'doonsan oo customer-ku ka dhex abuuro cloud provider-ka — wuxuu u oggolaadaa control buuxa IP ranges, subnets, iyo routing, isaga oo go'doonsan customers kale."
          },
          {
            h: "CIDR Blocks & IP Addressing",
            p:
            "VPC/VNet waxay isticmaalaan CIDR notation (tusaale 10.0.0.0/16) si loo qeexo IP range-ka. Planning-ka CIDR-ku waa muhiim si loo iska ilaaliyo overlap marka VPCs la isku xiro (peering) ama la isku daro on-premise."
          },
          {
            h: "Public vs Private Subnets",
            p:
            "Public subnet-ku wuxuu leeyahay route internet gateway ah (accessible internet-ka). Private subnet-ku ma laha route toos ah internet-ka — resources-ka (tusaale databases) waa in la geliyo private subnets si loo yareeyo exposure."
          },
          {
            h: "Route Tables & Internet Gateways",
            p:
            "Route tables waxay go'aamiyaan halka traffic-ku u socdo subnet kasta. Internet Gateway (AWS) / Internet-facing load balancer (Azure) waa components u oggolaada traffic inbound/outbound internet-ka."
          }
        ],

        terms: [
          { term: "VPC/VNet", def: "Network go'doonsan oo customer-ku ka dhex abuuro cloud-ka." },
          { term: "CIDR Block", def: "Notation lagu qeexo IP address range-ka." },
          { term: "Public Subnet", def: "Subnet leh route internet gateway ah." }
        ],

        quiz: [
          {
            q: "VPC/VNet wuxuu u oggolaadaa customer-ka?",
            options: [
              "Control buuxa IP ranges, subnets, routing, isaga oo go'doonsan",
              "Ma jiro control",
              "Kaliya IP address hal ah",
              "Kaliya loo isticmaalo storage"
            ],
            answer: 0,
            explain: "VPC/VNet waa network logical ah oo customer-ku dhisi karo sida uu doonayo."
          },
          {
            q: "Resources xasaasi ah (databases) waa in la geliyaa?",
            options: [
              "Private subnets, aan route toos ah internet-ka lahayn",
              "Public subnets, si loo helo internet-ka",
              "Ma jiro farqi",
              "Kaliya loo geliyo VPC hal ah"
            ],
            answer: 0,
            explain: "Private subnets-ku waxay yareeyaan exposure-ka resources-ka xasaasiga ah."
          },
          {
            q: "CIDR planning muhiim u tahay sababtoo ah?",
            options: [
              "Si loo iska ilaaliyo IP overlap marka VPCs la isku xiro",
              "Ma jiro sabab",
              "Kaliya loo isticmaalo compliance",
              "Kordhinta speed-ka"
            ],
            answer: 0,
            explain: "Overlap-ku wuxuu adkeeyaa peering ama hybrid connectivity."
          },
          {
            q: "Internet Gateway waxaa loo isticmaalaa?",
            options: [
              "U ogolaanaya traffic inbound/outbound internet-ka",
              "Kaliya internal traffic",
              "Ma jiro isticmaal",
              "Kaliya encryption"
            ],
            answer: 0,
            explain: "IGW waa component-ka u oggolaada VPC-ga inuu la xiriiro internet-ka."
          }
        ],

        exercise: {
          title: "VPC Architecture Design",
          steps: [
            "Naqshadee VPC CIDR block (tusaale 10.0.0.0/16).",
            "Kala saar public/private subnets, sharax sababta.",
            "Sharax faa'iidada CIDR planning fiican.",
            "Naqshadee route table asaasi ah public subnet ah."
          ],
          deliverable: "VPC architecture design document."
        }
      },


      {
        slug: "security-groups-nsgs",
        title: "Security Groups & NSGs",
        english: "Security Groups and NSGs",
        minutes: 11,

        summary:
          "Faham qoto dheer sida security groups/NSGs u shaqeeyaan iyo farqiga u dhexeeya network ACLs.",

        sections: [
          {
            h: "Security Groups (AWS)",
            p:
            "Security Groups waa firewall stateful ah oo resource-level ah (instance kasta). Stateful macnaheedu waa: haddii inbound traffic la oggol yahay, outbound response-ka si otomaatig ah ayaa loo oggol yahay — aan loo baahnayn rule labaad."
          },
          {
            h: "Network Security Groups (Azure)",
            p:
            "NSGs Azure ah waxay u shaqeeyaan si la mid ah — waxaa lagu dabaqi karaa subnet-level ama NIC-level (network interface). Rules-ku waxay ka kooban yihiin: priority, source/destination, port, protocol, allow/deny."
          },
          {
            h: "Stateful vs Stateless Filtering",
            p:
            "Security Groups/NSGs waa stateful (return traffic si otomaatig ah loo oggol yahay). Network ACLs (AWS) waa stateless — waa in la qeexaa rules labadaba inbound iyo outbound si sax ah, xitaa return traffic."
          },
          {
            h: "Common Security Group Misconfigurations",
            p:
            "Rules oggolaanaya 0.0.0.0/0 (internet-ka oo dhan) ports xasaasi ah (SSH 22, RDP 3389), overly permissive outbound rules, iyo unused security groups oo aan la nadiifin — dhammaantood waa khaladaad caan ah."
          }
        ],

        terms: [
          { term: "Security Group", def: "Firewall stateful ah oo resource-level ah AWS." },
          { term: "NSG", def: "Network Security Group — Azure firewall subnet/NIC-level ah." },
          { term: "Stateful Filtering", def: "Return traffic si otomaatig ah loo oggol yahay." }
        ],

        quiz: [
          {
            q: "Security Groups waa stateful macnaheedu waa?",
            options: [
              "Return traffic si otomaatig ah ayaa loo oggol yahay",
              "Rules-ku waligood waa la qeexaa",
              "Ma jiro macno gaar ah",
              "Waa stateless"
            ],
            answer: 0,
            explain: "Stateful-ku wuxuu fududeeyaa rule management marka la barbardhigo stateless."
          },
          {
            q: "0.0.0.0/0 SSH port 22 la oggol yahay waa?",
            options: [
              "Misconfiguration halis ah oo internet-ka oo dhan u oggolaanaya",
              "Best practice",
              "Waajib configuration",
              "Ma jiro khatar"
            ],
            answer: 0,
            explain: "SSH-ka internet-ka oo dhan u furan waa target caan ah oo brute force ah."
          },
          {
            q: "Network ACLs (stateless) waxay u baahan yihiin?",
            options: [
              "Rules la qeexo labadaba inbound iyo outbound, xitaa return traffic",
              "Kaliya inbound rules",
              "Ma jiro rules loo baahan yahay",
              "Isku mid security groups"
            ],
            answer: 0,
            explain: "Stateless-ku ma xasuusto connection state-ka — waa in dhammaan la qeexo."
          },
          {
            q: "NSGs Azure ah waxaa lagu dabaqi karaa?",
            options: [
              "Subnet-level ama NIC-level",
              "Kaliya subnet-level",
              "Kaliya NIC-level",
              "Kaliya VNet-level"
            ],
            answer: 0,
            explain: "Flexibility-gan wuxuu u ogolaadaa granular control."
          }
        ],

        exercise: {
          title: "Security Group Rules Audit",
          steps: [
            "Qor tusaale security group rules ah (leh khalad 0.0.0.0/0 SSH ah).",
            "Sharax sida aad u hagaajin lahayd khaladkaas.",
            "Sharax farqiga stateful iyo stateless filtering.",
            "Naqshadee checklist audit ah security groups/NSGs."
          ],
          deliverable: "Security group audit checklist."
        }
      },


      {
        slug: "network-segmentation-subnets",
        title: "Network Segmentation & Subnets",
        english: "Network Segmentation and Subnets",
        minutes: 14,

        summary:
          "Faham sida network segmentation cloud-ka loo naqshadeeyo si loo yareeyo blast radius.",

        sections: [
          {
            h: "Sababta Segmentation Muhiim u Tahay",
            p:
            "Network segmentation wuxuu u kala qaybiyaa environment-ka qaybo (tiers) — tusaale web tier, application tier, database tier — si haddii qayb la jebiyo, attacker-ku uusan si fudud ugu gudbi karin qaybaha kale (lateral movement)."
          },
          {
            h: "Three-Tier Architecture",
            p:
            "Web tier (public-facing, load balancers), Application tier (private, business logic), Database tier (private ugu go'doonsan, kaliya app tier ayaa access u leh). Traffic-ku wuxuu socdaa hal tier ilaa tan xigta oo keliya."
          },
          {
            h: "Micro-Segmentation",
            p:
            "Micro-segmentation wuxuu u kala qaybiyaa granular ahaan (workload kasta ama service kasta), ma aha kaliya tiers waaweyn — Zero Trust principles ayaa lagu dabaqaa heer aad u faahfaahsan."
          },
          {
            h: "Blast Radius Reduction",
            p:
            "Segmentation-ku wuxuu yareeyaa 'blast radius' — haddii attacker uu jebiyo hal workload, segmentation-ku wuxuu ka hortagaa inuu si fudud ugu gudbo dhammaan environment-ka."
          }
        ],

        terms: [
          { term: "Network Segmentation", def: "U kala qaybinta network-ka qaybo si loo yareeyo lateral movement." },
          { term: "Blast Radius", def: "Baaxadda saameynta haddii qayb la jebiyo." },
          { term: "Micro-Segmentation", def: "Segmentation heer aad u faahfaahsan, workload kasta." }
        ],

        quiz: [
          {
            q: "Network segmentation-ku wuxuu yareeyaa?",
            options: [
              "Blast radius haddii qayb la jebiyo (lateral movement)",
              "Speed-ka network-ka",
              "Ma jiro faa'iido",
              "Kaliya cost-ka"
            ],
            answer: 0,
            explain: "Segmentation-ku wuxuu xaddidaa sida attacker uu ugu gudbi karo qaybaha kale."
          },
          {
            q: "Three-tier architecture-ka, database tier-ku wuxuu leeyahay access?",
            options: [
              "Kaliya application tier",
              "Internet-ka si toos ah",
              "Dhammaan tiers",
              "Ma jiro access"
            ],
            answer: 0,
            explain: "Database tier-ku waa mid ugu go'doonsan, kaliya app tier ayaa access u leh."
          },
          {
            q: "Micro-segmentation wuxuu ka duwan yahay tier-based segmentation sababtoo ah?",
            options: [
              "Wuxuu u kala qaybiyaa granular ahaan (workload kasta)",
              "Isku mid",
              "Wuxuu ka waaweyn yahay tiers",
              "Ma jiro farqi"
            ],
            answer: 0,
            explain: "Micro-segmentation wuxuu tagaa heer aad u faahfaahsan, Zero Trust ku salaysan."
          },
          {
            q: "Blast radius reduction ujeeddadeedu waa?",
            options: [
              "Xaddidaad saameynta breach hal qayb ah",
              "Kordhinta speed",
              "Ma jiro ujeeddo",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Yaraynta saameynta waa ujeeddada ugu weyn ee segmentation."
          }
        ],

        exercise: {
          title: "Network Segmentation Design",
          steps: [
            "Naqshadee three-tier architecture (web, app, database).",
            "Sharax traffic flow-ka la oggol yahay tier kasta.",
            "Sharax faa'iidada micro-segmentation halkii tier-based oo keliya.",
            "Sharax sida segmentation-ku u yareeyo blast radius scenario breach ah."
          ],
          deliverable: "Network segmentation architecture design."
        }
      },


      {
        slug: "vpn-private-connectivity",
        title: "VPN & Private Connectivity",
        english: "VPN and Private Connectivity",
        minutes: 12,

        summary:
          "Faham habab kala duwan oo si ammaan ah loogu xiriiro on-premise iyo cloud.",

        sections: [
          {
            h: "Site-to-Site VPN",
            p:
            "Site-to-site VPN wuxuu si ammaan ah u xidhaa on-premise network-ka cloud VPC/VNet-ka, traffic-na wuxuu u socdaa internet-ka public-ka ah oo encrypted ah (IPsec tunnel)."
          },
          {
            h: "Direct Connect / ExpressRoute",
            p:
            "AWS Direct Connect / Azure ExpressRoute waxay bixiyaan xiriir dedicated ah (private line), aan marin internet-ka public-ka ah — mid ka ammaan iyo reliable badan, laakiin qaali."
          },
          {
            h: "VPC Peering & Transit Gateway",
            p:
            "VPC Peering wuxuu si toos ah u xidhaa laba VPC (private connectivity), laakiin ma scale gareyn VPCs badan. Transit Gateway (AWS) / Virtual WAN (Azure) wuxuu bixiyaa hub-and-spoke model VPCs badan si fudud loo isku xiro."
          },
          {
            h: "Bastion Hosts & Jump Boxes",
            p:
            "Bastion host waa server go'doonsan oo loo isticmaalo access private resources (tusaale SSH database server private subnet ku jira) — access-ku wuxuu marayaa bastion-ka, ma aha direct exposure internet-ka."
          }
        ],

        terms: [
          { term: "Site-to-Site VPN", def: "Xiriir encrypted ah oo on-premise cloud-ka ku xidha." },
          { term: "Direct Connect/ExpressRoute", def: "Xiriir dedicated ah, aan marin internet-ka public-ka ah." },
          { term: "Bastion Host", def: "Server go'doonsan oo loo isticmaalo access resources private ah." }
        ],

        quiz: [
          {
            q: "Site-to-site VPN traffic-ku wuxuu u socdaa?",
            options: [
              "Internet-ka public-ka ah, laakiin encrypted (IPsec)",
              "Xiriir dedicated ah oo keliya",
              "Ma jiro encryption",
              "Kaliya cloud-ka gudihiisa"
            ],
            answer: 0,
            explain: "VPN-ku wuxuu isticmaalaa internet-ka, laakiin encryption ayaa ilaaliya data-ga."
          },
          {
            q: "Direct Connect/ExpressRoute faa'iidadooda ugu weyn waa?",
            options: [
              "Reliability iyo ammaan sare, aan marin internet-ka public-ka ah",
              "Kaliya jaban",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Dedicated line-ku wuxuu bixiyaa performance iyo security sare, laakiin qaali."
          },
          {
            q: "Bastion host waxaa loo isticmaalaa?",
            options: [
              "Access resources private ah iyada oo aan direct exposure internet-ka lahayn",
              "Encrypt gareynta data-ga",
              "Storage backup",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "Bastion-ku waa single entry point la maamulo si ammaan ah."
          },
          {
            q: "Transit Gateway faa'iidadeeda waa?",
            options: [
              "Hub-and-spoke model VPCs badan si fudud loo isku xiro",
              "Kaliya laba VPC isku xiraysa",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo on-premise"
            ],
            answer: 0,
            explain: "Transit Gateway-gu wuxuu scale gareynayaa marka la barbardhigo VPC Peering."
          }
        ],

        exercise: {
          title: "Connectivity Architecture Planning",
          steps: [
            "Xulo scenario (shirkad yar vs enterprise), dooro VPN ama Direct Connect.",
            "Sharax sababta doorashada.",
            "Naqshadee bastion host access flow database private ah.",
            "Sharax marka Transit Gateway loo isticmaali lahaa halkii VPC Peering."
          ],
          deliverable: "Private connectivity architecture plan."
        }
      },


      {
        slug: "ddos-protection-waf",
        title: "DDoS Protection & WAF",
        english: "DDoS Protection and WAF",
        minutes: 10,

        summary:
          "Faham sida DDoS protection iyo Web Application Firewall (WAF) loo isticmaalo cloud-ka gudihiisa.",

        sections: [
          {
            h: "DDoS Attacks Cloud-ka Gudihiisa",
            p:
            "Distributed Denial of Service (DDoS) waxay isku dayaan inay ka buuxiyaan resources (bandwidth, compute) si legitimate traffic-ku aanu u gaarin. Cloud providers waxay bixiyaan built-in DDoS protection (AWS Shield, Azure DDoS Protection)."
          },
          {
            h: "Layer 3/4 vs Layer 7 DDoS",
            p:
            "Layer 3/4 (network/transport) attacks waxay ka buuxiyaan bandwidth (volumetric). Layer 7 (application) attacks waxay bartilmaameedsadaan application logic (tusaale HTTP flood) — labaduba u baahan yihiin protections kala duwan."
          },
          {
            h: "Web Application Firewall (WAF)",
            p:
            "WAF wuxuu falanqeeyaa HTTP/HTTPS traffic wuxuuna xannibaa requests khaldan (SQLi, XSS payloads) ka hor inay gaaraan application-ka. AWS WAF, Azure Application Gateway WAF waa tusaalayaal."
          },
          {
            h: "Rate Limiting & Auto-Scaling",
            p:
            "Rate limiting wuxuu xaddidaa tirada requests IP kasta muddo la go'aamiyay. Auto-scaling wuxuu u ogolaadaa infrastructure-ka inuu si otomaatig ah u kordho marka traffic-ku kordho — labaduba waxay caawiyaan DDoS resilience."
          }
        ],

        terms: [
          { term: "DDoS", def: "Distributed Denial of Service — weerar isku daya inuu ka buuxiyo resources." },
          { term: "WAF", def: "Web Application Firewall — xannibaya requests khaldan HTTP/HTTPS." }
        ],

        quiz: [
          {
            q: "Layer 7 DDoS attacks waxay bartilmaameedsadaan?",
            options: [
              "Application logic (tusaale HTTP flood)",
              "Kaliya bandwidth",
              "Kaliya physical hardware",
              "Ma jiro target gaar ah"
            ],
            answer: 0,
            explain: "Layer 7 attacks waxay ka duwan yihiin volumetric Layer 3/4 attacks."
          },
          {
            q: "WAF wuxuu xannibaa?",
            options: [
              "Requests khaldan (SQLi, XSS payloads) HTTP/HTTPS traffic gudaheeda",
              "Dhammaan traffic",
              "Kaliya SSH traffic",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "WAF-ku wuxuu falanqeeyaa application-layer traffic-ka."
          },
          {
            q: "Rate limiting waxaa loo isticmaalaa?",
            options: [
              "Xaddidaadda tirada requests IP kasta muddo go'an",
              "Kordhinta traffic-ka",
              "Ma jiro isticmaal",
              "Kaliya encryption"
            ],
            answer: 0,
            explain: "Rate limiting-ku wuxuu ka hortagaa hal source inuu ka buuxiyo resources."
          },
          {
            q: "Auto-scaling wuxuu caawiyaa DDoS resilience sababtoo ah?",
            options: [
              "Infrastructure-ku si otomaatig ah wuu kordhaa marka traffic-ku kordho",
              "Wuxuu joojiyaa dhammaan traffic",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo cost saving"
            ],
            answer: 0,
            explain: "Scaling-ku wuxuu ka caawiyaa in la maareeyo traffic-ka kordhay, in kastoo aanu keliya xal ahayn."
          }
        ],

        exercise: {
          title: "DDoS & WAF Protection Planning",
          steps: [
            "Sharax farqiga Layer 3/4 iyo Layer 7 DDoS attacks.",
            "Naqshadee WAF rules asaasi ah (SQLi/XSS blocking).",
            "Sharax faa'iidada rate limiting.",
            "Naqshadee DDoS protection strategy shirkad e-commerce ah."
          ],
          deliverable: "DDoS and WAF protection plan."
        }
      },


      {
        slug: "network-traffic-monitoring",
        title: "Network Traffic Monitoring",
        english: "Network Traffic Monitoring",
        minutes: 13,

        summary:
          "Faham sida network traffic cloud-ka loo la socdo iyo tools-ka la isticmaalo.",

        sections: [
          {
            h: "VPC Flow Logs / NSG Flow Logs",
            p:
            "Flow logs waxay diiwaan geliyaan metadata network traffic ah (source/dest IP, port, protocol, accept/reject) — la mid ah NetFlow, waxaana loo isticmaalaa anomaly detection iyo troubleshooting."
          },
          {
            h: "Cloud-Native IDS/IPS",
            p:
            "Cloud providers waxay bixiyaan intrusion detection services (AWS GuardDuty, Azure Network Watcher) oo si automatic ah u falanqeeya traffic patterns si loo ogaado threats — machine learning-based anomaly detection badanaa."
          },
          {
            h: "Traffic Mirroring",
            p:
            "Traffic mirroring (VPC Traffic Mirroring, Azure Packet Capture) wuxuu u oggolaadaa in la koobiyeeyo traffic si loo falanqeeyo (deep packet inspection) iyada oo aan la saameynin production traffic-ka dhabta ah."
          },
          {
            h: "Centralizing Logs for Analysis",
            p:
            "Flow logs kala duwan (VPCs badan, accounts badan) waa in la isku daro central logging solution (tusaale CloudWatch Logs, Log Analytics workspace, ama SIEM) si loo dhiso muuqaal guud oo network-ka oo dhan."
          }
        ],

        terms: [
          { term: "VPC Flow Logs", def: "Diiwaanka metadata traffic-ka VPC-ka gudihiisa." },
          { term: "Traffic Mirroring", def: "Koobiyaynta traffic si loo falanqeeyo, aan production-ka la saameynin." }
        ],

        quiz: [
          {
            q: "VPC Flow Logs waxay diiwaan geliyaan?",
            options: [
              "Metadata traffic (IP, port, protocol, accept/reject)",
              "Payload buuxa packets-ka",
              "Passwords",
              "File contents"
            ],
            answer: 0,
            explain: "Flow logs waa metadata oo keliya, la mid ah NetFlow."
          },
          {
            q: "AWS GuardDuty waa?",
            options: [
              "Cloud-native intrusion detection service",
              "Encryption tool",
              "Backup service",
              "Storage service"
            ],
            answer: 0,
            explain: "GuardDuty wuxuu si automatic ah u falanqeeyaa traffic patterns."
          },
          {
            q: "Traffic mirroring faa'iidadeeda waa?",
            options: [
              "Deep packet inspection aan la saameynin production traffic",
              "Kordhinta traffic-ka",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Mirroring-ku wuxuu bixiyaa faahfaahin dheeraad ah iyada oo aan risk lahayn."
          },
          {
            q: "Sababta central logging muhiim u yahay waa?",
            options: [
              "Si loo dhiso muuqaal guud oo VPCs/accounts badan ah",
              "Ma jiro sabab",
              "Kaliya loo baahan yahay hal VPC",
              "Kordhinta cost oo keliya"
            ],
            answer: 0,
            explain: "Logs go'doonsan waxay adkeeyaan la socodka guud."
          }
        ],

        exercise: {
          title: "Network Monitoring Setup",
          steps: [
            "Sharax sida Flow Logs loo shido VPC/subnet ah.",
            "Sharax faa'iidada cloud-native IDS (GuardDuty/Network Watcher).",
            "Sharax marka traffic mirroring loo isticmaali lahaa.",
            "Naqshadee central logging architecture VPCs badan ah."
          ],
          deliverable: "Network traffic monitoring setup guide."
        }
      },


      {
        slug: "network-security-capstone",
        title: "Network Security — Full Capstone",
        english: "Network Security Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — naqshadee full network security architecture.",

        sections: [
          {
            h: "Scenario",
            p:
            "Waxaad naqshadeynaysaa network architecture shirkad e-commerce ah oo AWS isticmaasho — leh web app, application servers, iyo database."
          },
          {
            h: "VPC & Segmentation Design",
            p:
            "Naqshadee VPC CIDR, three-tier subnets (public/private), iyo security groups tier kasta."
          },
          {
            h: "Connectivity & Protection",
            p:
            "Naqshadee bastion host access, WAF rules, iyo DDoS protection strategy."
          },
          {
            h: "Monitoring Setup",
            p:
            "Naqshadee Flow Logs iyo cloud-native IDS setup network-ka oo dhan."
          }
        ],

        terms: [
          { term: "Full Network Architecture", def: "Naqshad isugu jirta VPC, segmentation, connectivity, iyo monitoring." }
        ],

        quiz: [
          {
            q: "E-commerce scenario-gan, database tier-ku waa in uu ku jiro?",
            options: [
              "Private subnet, aan direct internet access lahayn",
              "Public subnet",
              "Ma jiro subnet loo baahan yahay",
              "Kaliya on-premise"
            ],
            answer: 0,
            explain: "Data xasaasi ah waa in la ilaaliyaa exposure internet-ka."
          },
          {
            q: "WAF-gu wuxuu ka hortagaa scenario-gan?",
            options: [
              "SQLi/XSS attacks e-commerce app-ka",
              "Kaliya DDoS",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "E-commerce apps waa targets caan ah oo web attacks ah."
          },
          {
            q: "Monitoring setup-ku muhiim u yahay sababtoo ah?",
            options: [
              "Si loo ogaado anomalies iyo threats dhaqso ahaan",
              "Ma jiro sabab",
              "Kaliya loo baahan yahay compliance",
              "Kordhinta speed oo keliya"
            ],
            answer: 0,
            explain: "Visibility-gu waa muhiim si loo ogaado weerar ka hor inuu impact weyn yeesho."
          }
        ],

        exercise: {
          title: "Full Network Security Architecture",
          steps: [
            "Naqshadee VPC/subnet design (three-tier) e-commerce scenario-ga.",
            "Naqshadee security groups tier kasta.",
            "Naqshadee WAF + DDoS protection strategy.",
            "Naqshadee monitoring setup (Flow Logs + IDS) (portfolio-ready)."
          ],
          deliverable: "Full cloud network security architecture (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "cs4",
    slug: "cloud-storage-data-security",
    stage: "Sare",
    title: "Cloud Storage & Data Security",
    english: "Cloud Storage & Data Security",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa storage security (S3/Blob), encryption at rest/in transit, data classification, iyo backup/disaster recovery.",

    topics: [
      "Object Storage Security (S3/Blob)",
      "Encryption at Rest & In Transit",
      "Key Management Services",
      "Data Classification & DLP",
      "Database Security in the Cloud",
      "Backup & Disaster Recovery",
      "Storage Security Capstone",
    ],

    lessonList: [

      {
        slug: "object-storage-security",
        title: "Object Storage Security (S3/Blob)",
        english: "Object Storage Security (S3/Blob)",
        minutes: 10,

        summary:
          "Faham qoto dheer sida S3 buckets iyo Blob storage loo ilaaliyo, iyo khaladaadka caan ah.",

        sections: [
          {
            h: "S3 Bucket Basics",
            p:
            "Amazon S3 (Simple Storage Service) wuxuu kaydiyaa 'objects' buckets gudahood. Bucket kastaa wuxuu leeyahay magac globally unique ah, wuxuuna u baahan yahay policies/permissions si loo xakameeyo access."
          },
          {
            h: "Public Bucket Exposure — The #1 Cloud Misconfiguration",
            p:
            "Public S3 buckets (accessible internet-ka oo dhan) waa mid ka mid ah misconfigurations-ka ugu caansan oo cloud breaches ku dhaca. Breaches waaweyn (tusaale Capital One-style incidents) badanaa waxay ku bilaabmaan bucket exposure."
          },
          {
            h: "Block Public Access Settings",
            p:
            "AWS wuxuu bixiyaa 'Block Public Access' settings account-level ah oo default-ka ah wuxuu xannibaa public access, xitaa haddii bucket policy uu ku qoran yahay oggolaansho — layer dheeraad ah oo protection ah."
          },
          {
            h: "Bucket Policies & ACLs",
            p:
            "Bucket policies (JSON-based, resource-level) iyo ACLs (Access Control Lists, legacy) labaduba waxay xakameeyaan access-ka bucket-ka — AWS wuxuu talinayaa bucket policies + IAM policies halkii ACLs (mid duqoobay)."
          }
        ],

        terms: [
          { term: "S3 Bucket", def: "Container kaydiya objects Amazon S3 gudaheeda." },
          { term: "Block Public Access", def: "Setting account-level ah oo xannibaya public access." }
        ],

        quiz: [
          {
            q: "Public S3 buckets waa?",
            options: [
              "Mid ka mid ah misconfigurations-ka ugu caansan ee cloud breaches",
              "Best practice",
              "Waajib bucket kasta",
              "Ma jiro khatar"
            ],
            answer: 0,
            explain: "Breaches waaweyn badanaa waxay ku bilaabmaan bucket exposure."
          },
          {
            q: "Block Public Access setting-ku wuxuu bixiyaa?",
            options: [
              "Layer dheeraad ah oo xannibaya public access, xitaa haddii policy uu oggol yahay",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo compliance",
              "Wuxuu u ogolaadaa public access"
            ],
            answer: 0,
            explain: "Setting-kani waa safety net dheeraad ah oo account-level ah."
          },
          {
            q: "AWS wuxuu talinayaa?",
            options: [
              "Bucket policies + IAM policies halkii ACLs",
              "Kaliya ACLs",
              "Ma jiro talo gaar ah",
              "Kaliya public access"
            ],
            answer: 0,
            explain: "ACLs waa legacy, policies-yada casriga ah ayaa la doorbidaa."
          },
          {
            q: "Bucket magaciisu waa?",
            options: [
              "Globally unique",
              "Region-specific oo keliya",
              "Account-specific oo keliya",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Bucket names-ku waa unique dhammaan AWS accounts globally."
          }
        ],

        exercise: {
          title: "S3 Security Audit Practice",
          steps: [
            "Sharax sababta public buckets ay yihiin khatar weyn.",
            "Sharax sida Block Public Access loo shido.",
            "Qor tusaale bucket policy ah oo access xaddidan (specific IAM role).",
            "Naqshadee checklist audit ah S3 buckets shirkad ah."
          ],
          deliverable: "S3/Blob storage security audit checklist."
        }
      },


      {
        slug: "encryption-at-rest-in-transit",
        title: "Encryption at Rest & In Transit",
        english: "Encryption at Rest and In Transit",
        minutes: 12,

        summary:
          "Faham qoto dheer noocyada encryption-ka cloud-ka gudihiisa iyo marka mid kasta loo isticmaalo.",

        sections: [
          {
            h: "Encryption at Rest",
            p:
            "Encryption at rest wuxuu ilaaliyaa data-ga kaydsan (disk, database, storage) — cloud providers waxay bixiyaan server-side encryption default ah (AWS SSE-S3), ama customer-managed keys (SSE-KMS) heer control sare leh."
          },
          {
            h: "Encryption in Transit",
            p:
            "Encryption in transit wuxuu ilaaliyaa data-ga intii uu socdo network-ka (TLS/SSL). Waajib TLS 1.2+ dhammaan connections-ka — connections aan encrypted ahayn (HTTP, FTP) waa in laga fogaado."
          },
          {
            h: "Client-Side Encryption",
            p:
            "Client-side encryption wuxuu encrypt gareeyaa data-ga ka hor inuu gaaro cloud-ka — cloud provider-ku marnaba ma arki karo plaintext data-ga. Waxaa loo isticmaalaa xog aad u xasaasi ah oo xitaa provider-ka laga hor tago."
          },
          {
            h: "Encryption Everywhere Strategy",
            p:
            "Best practice-ku wuxuu ahaa 'encrypt everywhere' — encryption at rest + in transit + (haddii macquul ah) client-side, si loo helo defense in depth xataa haddii hal layer uu guuldarraysto."
          }
        ],

        terms: [
          { term: "Encryption at Rest", def: "Ilaalinta data-ga kaydsan storage/database." },
          { term: "Encryption in Transit", def: "Ilaalinta data-ga intii uu socdo network-ka (TLS)." },
          { term: "Client-Side Encryption", def: "Encryption ka dhaca ka hor data-gu gaaro cloud-ka." }
        ],

        quiz: [
          {
            q: "Encryption at rest wuxuu ilaaliyaa?",
            options: [
              "Data-ga kaydsan (disk, database, storage)",
              "Data-ga intii uu socdo network-ka oo keliya",
              "Ma jiro isticmaal",
              "Kaliya passwords"
            ],
            answer: 0,
            explain: "At rest-ku wuxuu diiradda saaraa data-ga xaaladda kaydsan."
          },
          {
            q: "TLS 1.2+ waa waajib sababtoo ah?",
            options: [
              "Ilaalinta data-ga intii uu socdo network-ka",
              "Kaliya loo isticmaalo storage",
              "Ma jiro sabab",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Encryption in transit-ku wuxuu ka hortagaa interception."
          },
          {
            q: "Client-side encryption wuxuu u ogolaadaa?",
            options: [
              "Cloud provider marnaba ma arki karo plaintext data-ga",
              "Provider-ku wuxuu arki karaa dhammaan data-ga",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Data-gu waa encrypted ka hor inuu gaaro cloud-ka."
          },
          {
            q: "'Encrypt everywhere' strategy-ga ujeeddadiisu waa?",
            options: [
              "Defense in depth xataa haddii hal layer uu guuldarraysto",
              "Kaliya loo isticmaalo compliance",
              "Ma jiro faa'iido",
              "Kordhinta cost oo keliya"
            ],
            answer: 0,
            explain: "Layers badan oo encryption ah waxay ilaaliyaan xataa marka mid guuldarraysto."
          }
        ],

        exercise: {
          title: "Encryption Strategy Design",
          steps: [
            "Sharax farqiga at rest, in transit, iyo client-side encryption.",
            "Xulo scenario xog xasaasi ah (financial data), naqshadee encryption strategy.",
            "Sharax sababta TLS 1.2+ loo isticmaalo dhammaan connections.",
            "Naqshadee 'encrypt everywhere' checklist shirkad ah."
          ],
          deliverable: "Cloud encryption strategy document."
        }
      },


      {
        slug: "key-management-services",
        title: "Key Management Services",
        english: "Key Management Services",
        minutes: 13,

        summary:
          "Faham sida encryption keys loo maamulo si ammaan ah cloud-ka gudihiisa (AWS KMS, Azure Key Vault).",

        sections: [
          {
            h: "Waa Maxay KMS?",
            p:
            "Key Management Service (AWS KMS, Azure Key Vault) waa service loo isticmaalo abuuritaanka, maamulka, iyo xakamaynta encryption keys — sida customer-managed keys u shaqeeyaan encryption/decryption operations."
          },
          {
            h: "Customer-Managed vs Provider-Managed Keys",
            p:
            "Provider-managed keys (default) waxaa maamula cloud provider-ka, si fudud loo isticmaalo laakiin control yar. Customer-managed keys (CMK) waxaa maamula customer-ku — control sare (rotation, access policies, audit)."
          },
          {
            h: "Key Rotation",
            p:
            "Key rotation joogtada ah (automatic ama manual) wuxuu yareeyaa khatarta haddii key la jebiyo — sababtoo ah key-gu wuxuu leeyahay 'lifespan' xaddidan, wuxuuna yareeyaa waqtiga attacker-ku isticmaali karo key la xaday."
          },
          {
            h: "Hardware Security Modules (HSM)",
            p:
            "Cloud HSM (AWS CloudHSM, Azure Dedicated HSM) waa hardware go'doonsan oo dedicated ah oo keys-ka lagu kaydiyo — heerka ugu sarreeya ee security-ga, badanaa loo isticmaalo compliance requirements (tusaale FIPS 140-2)."
          }
        ],

        terms: [
          { term: "KMS", def: "Key Management Service — maamulka encryption keys." },
          { term: "CMK", def: "Customer-Managed Key — key uu customer-ku maamulo." },
          { term: "HSM", def: "Hardware Security Module — hardware go'doonsan oo keys kaydiya." }
        ],

        quiz: [
          {
            q: "Customer-managed keys (CMK) waxay siiyaan?",
            options: [
              "Control sare (rotation, access policies, audit)",
              "Control yar marka la barbardhigo provider-managed",
              "Ma jiro control",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "CMK-yadu waxay siiyaan customer-ka awood buuxa maamulka."
          },
          {
            q: "Key rotation joogtada ah wuxuu yareeyaa?",
            options: [
              "Waqtiga attacker-ku isticmaali karo key la xaday",
              "Speed-ka encryption",
              "Ma jiro faa'iido",
              "Kordhinta cost oo keliya"
            ],
            answer: 0,
            explain: "Key-gu wuxuu leeyahay lifespan xaddidan marka la rotate gareeyo."
          },
          {
            q: "Cloud HSM waxaa loo isticmaalaa?",
            options: [
              "Compliance requirements (FIPS 140-2) iyo heerka ugu sarreeya security",
              "Kaliya storage",
              "Ma jiro isticmaal gaar ah",
              "Kaliya backup"
            ],
            answer: 0,
            explain: "HSM-yada dedicated ah waa xalka heerka ugu sarreeya."
          },
          {
            q: "KMS ujeeddadeedu waa?",
            options: [
              "Abuuritaanka, maamulka iyo xakamaynta encryption keys",
              "Kaliya storage data",
              "Ma jiro ujeeddo",
              "Kaliya network monitoring"
            ],
            answer: 0,
            explain: "KMS waa service central ah oo encryption keys lagu maareeyo."
          }
        ],

        exercise: {
          title: "Key Management Strategy",
          steps: [
            "Sharax farqiga provider-managed iyo customer-managed keys.",
            "Sharax faa'iidada key rotation joogtada ah.",
            "Xulo scenario compliance ah (FIPS 140-2), sharax sababta HSM loo isticmaali lahaa.",
            "Naqshadee key management policy shirkad tusaale ah."
          ],
          deliverable: "Key management strategy document."
        }
      },


      {
        slug: "data-classification-dlp",
        title: "Data Classification & DLP",
        english: "Data Classification and DLP",
        minutes: 15,

        summary:
          "Faham sida xogta loo kala saaro heerar (classification) iyo sida DLP loo isticmaalo ilaalinta.",

        sections: [
          {
            h: "Data Classification Levels",
            p:
            "Public (aan xasaasi ahayn), Internal (shirkadda gudaheeda), Confidential (xasaasi, tusaale employee data), iyo Restricted (aad u xasaasi, tusaale financial/health records) — heer kastaa wuxuu leeyahay controls kala duwan."
          },
          {
            h: "Sababta Classification Muhiim u Tahay",
            p:
            "Aan xogta la kala saarin heerar, waa adag tahay in la go'aamiyo heerka encryption/access control-ka loo baahan yahay. Classification-ku wuxuu hagaa security controls-ka iyo compliance requirements."
          },
          {
            h: "Data Loss Prevention (DLP)",
            p:
            "DLP tools waxay si automatic ah u falanqeeyaan data-ga (email, files, uploads) si loo ogaado xog xasaasi ah (credit card numbers, SSNs) oo laga yaabo inay ka baxaan organization-ka, waxayna xannibi karaan ama alert-gareyn."
          },
          {
            h: "Cloud-Native DLP Tools",
            p:
            "AWS Macie (S3 data discovery/classification), Azure Purview (data governance) waa tools cloud-native ah oo si automatic ah u aqoonsada xog xasaasi ah storage-ka gudihiisa, waxayna bixiyaan alerts marka policy-yada la jebiyo."
          }
        ],

        terms: [
          { term: "Data Classification", def: "Kala saaridda xogta heerar (Public, Internal, Confidential, Restricted)." },
          { term: "DLP", def: "Data Loss Prevention — ogaanshaha/xannibidda data xasaasi ah oo baxaya." }
        ],

        quiz: [
          {
            q: "Data classification-ku wuxuu hagaa?",
            options: [
              "Security controls-ka iyo compliance requirements",
              "Kaliya speed-ka storage",
              "Ma jiro faa'iido",
              "Kaliya cost-ka"
            ],
            answer: 0,
            explain: "Heerka classification-ku wuxuu go'aamiyaa encryption/access loo baahan yahay."
          },
          {
            q: "DLP tools waxay ogaadaan?",
            options: [
              "Xog xasaasi ah (credit cards, SSNs) oo laga yaabo inay ka baxaan organization-ka",
              "Kaliya malware",
              "Ma jiro isticmaal",
              "Kaliya network traffic"
            ],
            answer: 0,
            explain: "DLP-ku wuxuu falanqeeyaa content-ka si loo ogaado xog xasaasi ah."
          },
          {
            q: "AWS Macie waxaa loo isticmaalaa?",
            options: [
              "Data discovery/classification S3 gudaheeda",
              "Network security",
              "Compute management",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "Macie wuxuu si automatic ah u aqoonsadaa xog xasaasi ah S3 buckets."
          },
          {
            q: "Data 'Restricted' heerkeedu waxay u baahan tahay?",
            options: [
              "Controls-ka ugu sarreeya (encryption, access xaddidan)",
              "Controls-ka ugu hoosaysa",
              "Ma loo baahna control",
              "Isku mid public data"
            ],
            answer: 0,
            explain: "Xogta aad u xasaasiga ah waxay u baahan tahay ilaalin heer sare ah."
          }
        ],

        exercise: {
          title: "Data Classification & DLP Design",
          steps: [
            "Naqshadee 4-da heer classification (tusaalayaal kasta).",
            "Sharax controls-ka la dabaqi lahaa heer kasta.",
            "Sharax sida DLP loo isticmaali lahaa xog credit card ah.",
            "Naqshadee DLP policy asaasi ah organization tusaale ah."
          ],
          deliverable: "Data classification and DLP policy document."
        }
      },


      {
        slug: "database-security-cloud",
        title: "Database Security in the Cloud",
        english: "Database Security in the Cloud",
        minutes: 11,

        summary:
          "Faham sida managed databases (RDS, Cosmos DB) loo ilaaliyo cloud-ka gudihiisa.",

        sections: [
          {
            h: "Managed Database Services",
            p:
            "AWS RDS, Azure SQL Database waa managed database services — provider-ku wuxuu maamulaa patching, backups, iyo high availability, customer-ku wuxuu diiradda saaraa data iyo access control."
          },
          {
            h: "Database Network Isolation",
            p:
            "Databases waa in laga geliyaa private subnets (ma aha public internet-ka), oo access-ku uu kaliya ka yimaado application tier-ka — direct internet access database-ka waa red flag weyn."
          },
          {
            h: "Database Authentication & Access",
            p:
            "IAM database authentication (halkii static passwords) wuxuu u oggolaadaa temporary credentials database access ahaan. Least privilege database users (ma aha root/admin dhammaan applications) waa best practice."
          },
          {
            h: "Database Encryption & Auditing",
            p:
            "Encryption at rest (TDE — Transparent Data Encryption) waa default-ka ah managed databases badankood. Database auditing (query logs) wuxuu la socdaa access/changes, muhiim ah forensics iyo compliance ahaan."
          }
        ],

        terms: [
          { term: "Managed Database", def: "Database provider-ku maamulo patching/backups/HA." },
          { term: "TDE", def: "Transparent Data Encryption — encryption at rest default ah." }
        ],

        quiz: [
          {
            q: "Databases waa in la geliyaa?",
            options: [
              "Private subnets, ma aha public internet direct access",
              "Public subnets si loo helo access fudud",
              "Ma jiro farqi",
              "Kaliya on-premise"
            ],
            answer: 0,
            explain: "Direct internet access database-ka waa risk weyn."
          },
          {
            q: "IAM database authentication faa'iidadeeda waa?",
            options: [
              "Temporary credentials halkii static passwords",
              "Kaliya loo isticmaalo backup",
              "Ma jiro faa'iido",
              "Kordhinta speed oo keliya"
            ],
            answer: 0,
            explain: "Temporary credentials waa mid ka ammaan badan static passwords."
          },
          {
            q: "TDE waa?",
            options: [
              "Transparent Data Encryption — encryption at rest default ah",
              "Nooc network security ah",
              "Backup tool",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "TDE-gu wuxuu encrypt gareeyaa database files automatically."
          },
          {
            q: "Database auditing (query logs) muhiim u yahay sababtoo ah?",
            options: [
              "Forensics iyo compliance ahaan",
              "Ma jiro sabab",
              "Kaliya loo isticmaalo performance",
              "Kordhinta storage oo keliya"
            ],
            answer: 0,
            explain: "Query logs waxay bixiyaan evidence access/changes database-ka."
          }
        ],

        exercise: {
          title: "Database Security Review",
          steps: [
            "Sharax sababta database-ku uu u baahan yahay private subnet.",
            "Sharax faa'iidada IAM database authentication.",
            "Sharax sida TDE loo isticmaalo.",
            "Naqshadee database security checklist managed RDS ah."
          ],
          deliverable: "Cloud database security review checklist."
        }
      },


      {
        slug: "backup-disaster-recovery",
        title: "Backup & Disaster Recovery",
        english: "Backup and Disaster Recovery",
        minutes: 14,

        summary:
          "Faham qoto dheer strategies-ka backup iyo disaster recovery cloud-ka gudihiisa.",

        sections: [
          {
            h: "Backup Strategies",
            p:
            "Automated snapshots (regular intervals), cross-region replication (ilaalinta region outage), iyo immutable backups (aan la beddeli karin, ka hortagaya ransomware) waa dhammaantood strategies muhiim ah."
          },
          {
            h: "RTO & RPO",
            p:
            "Recovery Time Objective (RTO) waa waqtiga la qaadan karo dib-u-soo celinta system-ka kadib disaster. Recovery Point Objective (RPO) waa qadarka data-ga loo isticmaali karo lumin (waqtiga u dhexeeya backups). Labaduba waa muhiim planning-ka DR ahaan."
          },
          {
            h: "Ransomware-Resistant Backups",
            p:
            "Immutable backups (S3 Object Lock, Azure Immutable Blob Storage) waxay ka hortagaan in ransomware uu encrypt gareeyo ama tirtiro backups-ka — xitaa haddii attacker-ku helo admin access, backups-ku waa la ilaaliyaa muddo la qeexay."
          },
          {
            h: "Disaster Recovery Testing",
            p:
            "DR plan-ku wax kuma tarto haddii aan la tijaabin — tabletop exercises iyo full DR drills (isku day dhabta ah oo failover ah) waa in la sameeyo joogtada ah si loo xaqiijiyo plan-ku inuu shaqeynayo marka dhab ahaan loo baahdo."
          }
        ],

        terms: [
          { term: "RTO", def: "Recovery Time Objective — waqtiga dib-u-soo celinta." },
          { term: "RPO", def: "Recovery Point Objective — qadarka data lumin la oggol yahay." },
          { term: "Immutable Backup", def: "Backup aan la beddeli karin ama la tirtiri karin muddo la qeexay." }
        ],

        quiz: [
          {
            q: "RTO wuxuu qeexayaa?",
            options: [
              "Waqtiga la qaadan karo dib-u-soo celinta system-ka",
              "Qadarka data lumin",
              "Ma jiro qeexid",
              "Kaliya cost-ka backup"
            ],
            answer: 0,
            explain: "RTO-gu wuxuu diiradda saaraa downtime-ka la oggol yahay."
          },
          {
            q: "RPO wuxuu qeexayaa?",
            options: [
              "Qadarka data-ga loo isticmaali karo lumin (waqtiga u dhexeeya backups)",
              "Waqtiga dib-u-soo celinta",
              "Ma jiro qeexid",
              "Kaliya cost-ka"
            ],
            answer: 0,
            explain: "RPO-gu wuxuu diiradda saaraa data loss-ka la oggol yahay."
          },
          {
            q: "Immutable backups waxay ka hortagaan?",
            options: [
              "Ransomware inuu encrypt gareeyo ama tirtiro backups-ka",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo compliance",
              "Kordhinta storage cost oo keliya"
            ],
            answer: 0,
            explain: "Immutability-gu wuxuu ilaaliyaa backups xitaa admin access la helo."
          },
          {
            q: "DR testing sababta loo sameeyo joogtada ah waa?",
            options: [
              "Si loo xaqiijiyo plan-ku inuu shaqeynayo marka dhab ahaan loo baahdo",
              "Ma jiro sabab",
              "Kaliya loo baahan yahay hal mar",
              "Kordhinta cost oo keliya"
            ],
            answer: 0,
            explain: "Plan aan la tijaabin waa mid aan la aamini karin."
          }
        ],

        exercise: {
          title: "Backup & DR Strategy Design",
          steps: [
            "Xulo scenario shirkad ah, go'aami RTO/RPO targets.",
            "Naqshadee backup strategy (automated snapshots, cross-region).",
            "Sharax faa'iidada immutable backups ransomware-ka ka hortagga.",
            "Naqshadee DR testing schedule (tabletop + full drills)."
          ],
          deliverable: "Backup and disaster recovery strategy."
        }
      },


      {
        slug: "storage-security-capstone",
        title: "Storage Security — Full Capstone",
        english: "Storage Security Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — naqshadee full data security strategy shirkad ah.",

        sections: [
          {
            h: "Scenario",
            p:
            "Shirkad healthcare ah (xog xasaasi ah oo bukaan ah) ayaa u guuraysa cloud-ka. Waxaad naqshadeynaysaa full data security strategy."
          },
          {
            h: "Storage & Classification",
            p:
            "Naqshadee S3/Blob security (private buckets, block public access) iyo data classification (Restricted level bukaanka xogtiisa)."
          },
          {
            h: "Encryption & Key Management",
            p:
            "Naqshadee encryption at rest/in transit strategy iyo customer-managed keys (CMK) plan."
          },
          {
            h: "Backup & DR",
            p:
            "Naqshadee RTO/RPO targets iyo immutable backup strategy healthcare compliance ahaan."
          }
        ],

        terms: [
          { term: "Full Data Security Strategy", def: "Naqshad isugu jirta storage, encryption, classification, backup/DR." }
        ],

        quiz: [
          {
            q: "Healthcare data scenario-gan, classification level-ku waa?",
            options: [
              "Restricted (aad u xasaasi)",
              "Public",
              "Internal oo keliya",
              "Ma jiro classification loo baahan yahay"
            ],
            answer: 0,
            explain: "Xog bukaan ah waa mid ugu xasaasiga badan, u baahan controls ugu sarreeya."
          },
          {
            q: "Encryption strategy-gu waa in uu daboolaa?",
            options: [
              "At rest, in transit, iyo customer-managed keys",
              "Kaliya at rest",
              "Kaliya in transit",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Encrypt everywhere strategy waa muhiim xog xasaasi ah."
          },
          {
            q: "Immutable backups scenario-gan waxay ilaaliyaan?",
            options: [
              "Xogta bukaanka ransomware-ka ka hor",
              "Ma jiro faa'iido",
              "Kaliya cost-ka",
              "Kaliya speed-ka"
            ],
            answer: 0,
            explain: "Healthcare data waa target caan ah oo ransomware ah."
          }
        ],

        exercise: {
          title: "Full Data Security Strategy",
          steps: [
            "Naqshadee S3/Blob security + data classification (healthcare scenario).",
            "Naqshadee encryption strategy + KMS/CMK plan.",
            "Naqshadee database security (managed RDS, private subnet).",
            "Diyaari backup/DR strategy oo RTO/RPO leh (portfolio-ready)."
          ],
          deliverable: "Full cloud data security strategy (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "cs5",
    slug: "cloud-compute-security",
    stage: "Sare",
    title: "Cloud Compute Security",
    english: "Cloud Compute Security",
    hours: 1,

    outcome:
      "Waxaad si adag u fahmi doontaa VM/instance security, container security, serverless security, iyo CI/CD pipeline security.",

    topics: [
      "Virtual Machine & Instance Security",
      "Container Security Fundamentals",
      "Kubernetes Security",
      "Serverless Security",
      "CI/CD Pipeline Security",
      "Patch Management in the Cloud",
      "Compute Security Capstone",
    ],

    lessonList: [

      {
        slug: "vm-instance-security",
        title: "Virtual Machine & Instance Security",
        english: "Virtual Machine and Instance Security",
        minutes: 12,

        summary:
          "Faham sida VMs/instances loo ilaaliyo — hardening, golden images, iyo metadata service risks.",

        sections: [
          {
            h: "OS Hardening",
            p:
            "Hardening wuxuu ka kooban yahay: ka saarista services aan la isticmaalin, update joogtada ah, xannibaadda ports aan loo baahnayn, iyo dejinta logging. Golden images (pre-hardened templates) waxay xaqiijiyaan consistency instances cusub oo dhan."
          },
          {
            h: "Instance Metadata Service (IMDS)",
            p:
            "Cloud instances waxay heli karaan metadata (oo ay ku jiraan IAM credentials) iyada oo la isticmaalayo internal endpoint (169.254.169.254). SSRF vulnerabilities web app-yada waxay u ogolaadaan attacker inuu xado credentials-kan (Capital One breach-style)."
          },
          {
            h: "IMDSv2 & Metadata Protection",
            p:
            "IMDSv2 (AWS) wuxuu u baahan yahay session-oriented requests (token-based) halkii simple GET requests — tani waxay adkeeysaa SSRF exploitation, sababtoo ah attacker-ku ma awoodo inuu si fudud u weydiiyo metadata endpoint-ka."
          },
          {
            h: "Instance Isolation & Anti-Malware",
            p:
            "Instances waa in la go'doomiyo (security groups, subnets) iyadoo lagu daray endpoint detection/anti-malware. Auto-scaling groups-ku waa in ay isticmaalaan golden images hardened ah, ma aha instances manual ah oo drift-gareysta."
          }
        ],

        terms: [
          { term: "Golden Image", def: "Template pre-hardened ah oo instances cusub laga sameeyo." },
          { term: "IMDS", def: "Instance Metadata Service — endpoint bixiya credentials/config." },
          { term: "SSRF", def: "Server-Side Request Forgery — vulnerability lagu xado metadata credentials." }
        ],

        quiz: [
          {
            q: "IMDSv2 wuxuu adkeeyaa?",
            options: [
              "SSRF exploitation, sababtoo ah session-token loo baahan yahay",
              "Ma jiro faa'iido",
              "Wuxuu fududeeyaa SSRF",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Token-based requests waa adag in SSRF vulnerability la exploit-gareeyo."
          },
          {
            q: "SSRF vulnerability web app ah wuxuu u ogolaan karaa attacker?",
            options: [
              "Xatooyo IAM credentials metadata service-ka",
              "Kaliya database access",
              "Ma jiro khatar",
              "Kaliya loo isticmaalo debugging"
            ],
            answer: 0,
            explain: "SSRF-ku wuxuu u oggolaadaa server-ka inuu weydiiyo metadata endpoint-ka halkii attacker."
          },
          {
            q: "Golden images faa'iidadooda waa?",
            options: [
              "Consistency iyo hardening instances cusub oo dhan",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup",
              "Kordhinta cost oo keliya"
            ],
            answer: 0,
            explain: "Templates pre-hardened ah waxay xaqiijiyaan security baseline joogto ah."
          },
          {
            q: "Auto-scaling groups waa in ay isticmaalaan?",
            options: [
              "Golden images hardened ah",
              "Instances manual ah oo drift-gareysta",
              "Ma jiro shuruud",
              "Kaliya kuwo aan hardened ahayn"
            ],
            answer: 0,
            explain: "Golden images-ku waxay xaqiijiyaan security consistency scaling-ka gudihiisa."
          }
        ],

        exercise: {
          title: "VM Security Hardening Practice",
          steps: [
            "Liis garee 5 hardening steps VM cusub ah.",
            "Sharax habka SSRF loo isticmaali karo IMDS credentials xatooyo.",
            "Sharax sida IMDSv2 uga adkeeyo weerarkan.",
            "Naqshadee golden image checklist shirkad ah."
          ],
          deliverable: "VM/instance security hardening checklist."
        }
      },


      {
        slug: "container-security-fundamentals",
        title: "Container Security Fundamentals",
        english: "Container Security Fundamentals",
        minutes: 10,

        summary:
          "Faham qeexitaanka containers iyo security risks-ka gaarka ah ee Docker/containers leeyihiin.",

        sections: [
          {
            h: "Waa Maxay Containers?",
            p:
            "Containers (Docker) waxay xirmaan application-ka iyo dependencies-kiisa hal unit ah oo isolated ah. Waxay ka duwan yihiin VMs — containers waxay wadaagaan host OS kernel-ka, halka VMs ay leeyihiin OS gooni ah."
          },
          {
            h: "Container Image Security",
            p:
            "Image scanning (tools sida Trivy, Clair) waxay ogaadaan vulnerabilities dependencies-ka container image-ka gudihiisa ka hor deployment. Base images-ku waa in ay ka yimaadaan sources la aamini karo (official images), ma aha kuwo random ah."
          },
          {
            h: "Container Runtime Security",
            p:
            "Containers waa in aysan u socon 'privileged mode' (full host access), iyo waa in la xaddidaa resources (CPU/memory limits) si loo ka hortago 'noisy neighbor' ama resource exhaustion attacks."
          },
          {
            h: "Container Escape Risks",
            p:
            "'Container escape' waa marka attacker uu ka baxo container-ka isolated ah uu galo host system-ka — badanaa waxaa sababa privileged containers, kernel vulnerabilities, ama misconfigured volume mounts (tusaale docker.sock exposed)."
          }
        ],

        terms: [
          { term: "Container Escape", def: "Marka attacker uu ka baxo container-ka isolated uu galo host-ka." },
          { term: "Image Scanning", def: "Falanqaynta vulnerabilities container image-ka ka hor deployment." },
          { term: "Privileged Mode", def: "Container leh full host access — khatar weyn." }
        ],

        quiz: [
          {
            q: "Containers ka duwan yihiin VMs sababtoo ah?",
            options: [
              "Waxay wadaagaan host OS kernel-ka, ma laha OS gooni ah",
              "Isku mid VMs",
              "Ma jiro farqi",
              "Containers waa VMs kale oo nooc ah"
            ],
            answer: 0,
            explain: "Container isolation-ku waa mid ka daciifsan VM isolation (hypervisor-based)."
          },
          {
            q: "Image scanning waxaa loo isticmaalaa?",
            options: [
              "Ogaanshaha vulnerabilities dependencies container image-ka ka hor deployment",
              "Kordhinta speed",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Scanning-ku wuxuu ka hortagaa deployment images vulnerable ah."
          },
          {
            q: "Container escape waxaa sababa?",
            options: [
              "Privileged containers, kernel vulnerabilities, misconfigured volume mounts",
              "Kaliya network issues",
              "Ma jiro sabab caadi ah",
              "Kaliya storage issues"
            ],
            answer: 0,
            explain: "Kuwan waxay u oggolaadaan attacker inuu ka baxo isolation-ka container-ka."
          },
          {
            q: "Privileged mode containers waa?",
            options: [
              "Khatar weyn, full host access",
              "Best practice",
              "Waajib container kasta",
              "Ma jiro khatar"
            ],
            answer: 0,
            explain: "Privileged containers waxay ka dhigaan container escape mid fudud."
          }
        ],

        exercise: {
          title: "Container Security Review",
          steps: [
            "Sharax farqiga containers iyo VMs isolation ahaan.",
            "Sharax sida image scanning loo isticmaalo (tools tusaale ah).",
            "Liis garee 3 sababood oo container escape ah.",
            "Naqshadee container runtime security checklist."
          ],
          deliverable: "Container security review checklist."
        }
      },


      {
        slug: "kubernetes-security",
        title: "Kubernetes Security",
        english: "Kubernetes Security",
        minutes: 13,

        summary:
          "Faham qoto dheer amniga Kubernetes — RBAC, network policies, iyo pod security.",

        sections: [
          {
            h: "Kubernetes Architecture Overview",
            p:
            "Kubernetes (K8s) waa orchestration platform containers ah. Control plane (API server, etcd) wuxuu maamulaa cluster-ka; worker nodes waxay fuliyaan pods (containers). Security-gu wuxuu daboolaa labada dhinac."
          },
          {
            h: "RBAC in Kubernetes",
            p:
            "Role-Based Access Control (RBAC) K8s ah wuxuu xakameeyaa cidda access u leh Kubernetes API-ga iyo waxa ay samayn karaan (create/delete pods, view secrets). Least privilege RBAC waa muhiim si loo yareeyo lateral movement."
          },
          {
            h: "Network Policies",
            p:
            "Default-ka Kubernetes ahaan, dhammaan pods way la wada hadli karaan (flat network). Network Policies waxay u oggolaadaan admin inuu xaddido traffic-ka u dhexeeya pods — micro-segmentation cluster-ka gudihiisa."
          },
          {
            h: "Pod Security & Secrets Management",
            p:
            "Pod Security Standards (baseline/restricted) waxay xannibaan pods aan ammaan ahayn (privileged, host network access). Kubernetes Secrets (base64-encoded, ma aha encrypted default ahaan) waa in la encrypt gareeyo etcd gudaheeda ama la isticmaalo external secrets manager."
          }
        ],

        terms: [
          { term: "RBAC (K8s)", def: "Role-Based Access Control — xakamaynta access Kubernetes API-ga." },
          { term: "Network Policy", def: "Rules xaddida traffic-ka u dhexeeya pods." },
          { term: "Kubernetes Secrets", def: "Objects kaydiya xog xasaasi ah, base64-encoded (ma aha encrypted default)." }
        ],

        quiz: [
          {
            q: "Default Kubernetes ahaan, pods-ku?",
            options: [
              "Dhammaantood way la wada hadli karaan (flat network)",
              "Waa isolated si otomaatig ah",
              "Ma jiro network access",
              "Kaliya hal pod ayaa la hadli kara"
            ],
            answer: 0,
            explain: "Network Policies waa loo baahan yahay in la xaddido traffic-ka."
          },
          {
            q: "Kubernetes Secrets default-ka ahaan waa?",
            options: [
              "Base64-encoded, ma aha encrypted",
              "Fully encrypted by default",
              "Ma jiro kaydin gaar ah",
              "Password-protected"
            ],
            answer: 0,
            explain: "Base64 ma aha encryption — waa waajib in la encrypt gareeyo si sax ah."
          },
          {
            q: "Least privilege RBAC wuxuu yareeyaa?",
            options: [
              "Lateral movement cluster-ka gudihiisa",
              "Speed-ka cluster-ka",
              "Ma jiro faa'iido",
              "Kordhinta cost oo keliya"
            ],
            answer: 0,
            explain: "Access xaddidan wuxuu xaddidaa waxa attacker uu sameyn karo access la helay."
          },
          {
            q: "Network Policies waxay u oggolaadaan?",
            options: [
              "Xaddidaadda traffic-ka u dhexeeya pods (micro-segmentation)",
              "Kordhinta traffic-ka",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Policies-ku waxay dhisaan segmentation cluster-ka gudihiisa."
          }
        ],

        exercise: {
          title: "Kubernetes Security Hardening",
          steps: [
            "Sharax RBAC role asaasi ah oo least privilege ah.",
            "Naqshadee Network Policy xaddidaysa traffic namespace-ka.",
            "Sharax sababta Kubernetes Secrets aysan ku filnayn base64 oo keliya.",
            "Naqshadee Kubernetes security checklist cluster ah."
          ],
          deliverable: "Kubernetes security hardening checklist."
        }
      },


      {
        slug: "serverless-security",
        title: "Serverless Security",
        english: "Serverless Security",
        minutes: 10,

        summary:
          "Faham risks-ka gaarka ah ee serverless (Lambda/Functions) iyo sida loo ilaaliyo.",

        sections: [
          {
            h: "Waa Maxay Serverless?",
            p:
            "Serverless (AWS Lambda, Azure Functions) wuxuu u oggolaadaa developers inay qoraan code iyada oo aan la maamulin servers — provider-ku wuxuu si otomaatig ah u maareeyaa infrastructure-ka, scaling-ka, iyo patching-ka OS."
          },
          {
            h: "Function-Level IAM Permissions",
            p:
            "Function kasta (Lambda) waa in uu leeyahay IAM role u gaar ah, oo leh kaliya permissions-ka waajibka ah — 'one function, one role' waa best practice, ma aha isla role oo dhammaan functions wadaagaan."
          },
          {
            h: "Event Injection & Input Validation",
            p:
            "Serverless functions waxay badanaa aqbalaan input events (HTTP requests, queue messages) — validation-ka input-ku waa in uu sii ahaado muhiim, sababtoo ah SQLi/injection attacks weli way khatar u yihiin serverless environments."
          },
          {
            h: "Dependency & Cold Start Security",
            p:
            "Dependencies-ka functions-ka (libraries) waa in la scan gareeyo vulnerabilities ahaan, sida containers. 'Cold starts' (function bilaabma marka hore) waxay dhaliyaan logging gaps ama timing issues oo la tixgelin karo security ahaan."
          }
        ],

        terms: [
          { term: "Serverless", def: "Compute model aan loo baahnayn in la maamulo servers (AWS Lambda, Azure Functions)." },
          { term: "One Function, One Role", def: "Best practice — function kasta IAM role u gaar ah." }
        ],

        quiz: [
          {
            q: "'One function, one role' best practice-gu wuxuu yareeyaa?",
            options: [
              "Over-permissioned functions haddii mid la jebiyo",
              "Speed-ka function-ka",
              "Ma jiro faa'iido",
              "Kordhinta cost oo keliya"
            ],
            answer: 0,
            explain: "Roles gaar ah waxay xaddidaan blast radius function kasta."
          },
          {
            q: "Serverless functions weli u baahan yihiin?",
            options: [
              "Input validation (SQLi/injection attacks weli waa khatar)",
              "Ma loo baahna validation",
              "Kaliya loo baahan yahay encryption",
              "Ma jiro khatar serverless ahaan"
            ],
            answer: 0,
            explain: "Serverless-ku ma bixiyo automatic protection injection attacks-ka."
          },
          {
            q: "Dependencies-ka functions-ka waa in la?",
            options: [
              "Scan gareeyo vulnerabilities ahaan, sida containers",
              "Iska indho tiro",
              "Kaliya loo isticmaalo production",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Libraries-ka vulnerable ah waa khatar xitaa serverless environments."
          },
          {
            q: "Serverless faa'iidadeeda ugu weyn security ahaan waa?",
            options: [
              "Provider-ku wuxuu maamulaa OS patching iyo infrastructure",
              "Ma jiro faa'iido security ah",
              "Wuxuu ka saarayaa baahida IAM",
              "Wuxuu ka saarayaa baahida input validation"
            ],
            answer: 0,
            explain: "Customer-ku ma mas'uulo OS-level security, laakiin weli wuxuu mas'uul ka yahay code iyo IAM."
          }
        ],

        exercise: {
          title: "Serverless Security Review",
          steps: [
            "Sharax faa'iidada 'one function, one role'.",
            "Naqshadee IAM role function Lambda ah oo least privilege ah.",
            "Sharax sababta input validation weli u baahan tahay serverless.",
            "Naqshadee serverless security checklist."
          ],
          deliverable: "Serverless security review checklist."
        }
      },


      {
        slug: "cicd-pipeline-security",
        title: "CI/CD Pipeline Security",
        english: "CI/CD Pipeline Security",
        minutes: 12,

        summary:
          "Faham sida CI/CD pipelines loo ilaaliyo — secrets management, code scanning, iyo supply chain security.",

        sections: [
          {
            h: "CI/CD Pipeline Attack Surface",
            p:
            "CI/CD pipelines (Jenkins, GitHub Actions, GitLab CI) waxay leeyihiin access xog xasaasi ah (deployment credentials, source code) — haddii pipeline la jebiyo, attacker-ku wuxuu heli karaa access production environment-ka oo dhan."
          },
          {
            h: "Secrets Management in Pipelines",
            p:
            "Secrets (API keys, credentials) marnaba waa inaan lagu hard-code gareyn source code ama pipeline configuration files — waxaa loo isticmaalaa secrets managers (AWS Secrets Manager, HashiCorp Vault) oo la inject gareeyo runtime ahaan."
          },
          {
            h: "Static & Dependency Scanning",
            p:
            "SAST (Static Application Security Testing) wuxuu falanqeeyaa source code vulnerabilities ka hor build-ka. Dependency scanning (tusaale Snyk, Dependabot) wuxuu ogaadaa libraries vulnerable ah pipeline-ka gudihiisa."
          },
          {
            h: "Supply Chain Security",
            p:
            "Supply chain attacks (tusaale SolarWinds-style) waxay bartilmaameedsadaan pipeline-ka laftiisa ama dependencies-ka si loo geliyo malicious code — signed commits, verified dependencies, iyo build reproducibility waxay caawiyaan ka hortagga."
          }
        ],

        terms: [
          { term: "CI/CD Pipeline", def: "Automation-ka build/test/deploy code-ka." },
          { term: "SAST", def: "Static Application Security Testing — falanqaynta code ka hor build." },
          { term: "Supply Chain Attack", def: "Weerar bartilmaameedsada pipeline/dependencies si loo geliyo code khaldan." }
        ],

        quiz: [
          {
            q: "Secrets marnaba waa in aan?",
            options: [
              "Lagu hard-code gareyn source code ama pipeline configs",
              "Lagu kaydiyo secrets manager",
              "Runtime la inject gareeyo",
              "La rotate gareeyo"
            ],
            answer: 0,
            explain: "Hard-coded secrets waxay noqdaan qayb source code history-ga, mar walba khatar leh."
          },
          {
            q: "SAST wuxuu sameeyaa?",
            options: [
              "Falanqeeyaa source code vulnerabilities ka hor build-ka",
              "Wuxuu fuliyaa application-ka runtime ahaan",
              "Ma jiro shaqo",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "SAST-ku wuxuu ogaadaa qaladaad code-ka ka hor deployment."
          },
          {
            q: "Supply chain attack-ku wuxuu bartilmaameedsadaa?",
            options: [
              "Pipeline-ka laftiisa ama dependencies-ka si loo geliyo malicious code",
              "Kaliya production servers",
              "Kaliya users-ka",
              "Ma jiro target gaar ah"
            ],
            answer: 0,
            explain: "SolarWinds-style attacks waxay geliyaan code khaldan bilowga pipeline-ka."
          },
          {
            q: "Haddii CI/CD pipeline la jebiyo, khatartu waa?",
            options: [
              "Access production environment-ka oo dhan",
              "Kaliya source code",
              "Ma jiro khatar weyn",
              "Kaliya development environment"
            ],
            answer: 0,
            explain: "Pipelines waxay leeyihiin deployment credentials aad u awood badan."
          }
        ],

        exercise: {
          title: "CI/CD Security Hardening",
          steps: [
            "Sharax sababta secrets aan la hard-code gareyn.",
            "Naqshadee secrets management approach (secrets manager).",
            "Sharax faa'iidada SAST iyo dependency scanning pipeline-ka gudihiisa.",
            "Naqshadee supply chain security checklist."
          ],
          deliverable: "CI/CD pipeline security hardening plan."
        }
      },


      {
        slug: "patch-management-cloud",
        title: "Patch Management in the Cloud",
        english: "Patch Management in the Cloud",
        minutes: 13,

        summary:
          "Faham sida patch management loo maareeyo cloud environments-ka, iyada oo lagu daray immutable infrastructure.",

        sections: [
          {
            h: "Traditional Patching vs Cloud Approaches",
            p:
            "On-premise-ka, patching-ku wuxuu badanaa ku lug leeyahay servers jira oo la update gareeyo. Cloud-ka gudihiisa, 'immutable infrastructure' approach-ku wuxuu talinayaa in la abuuro instances cusub (golden image cusub) oo la 'replace' gareeyo kuwa hore, ma aha in la patch-gareeyo kuwa jira."
          },
          {
            h: "Automated Patch Management Tools",
            p:
            "AWS Systems Manager Patch Manager, Azure Update Management waxay automate gareeyaan scanning iyo dabaqista patches instances-ka oo dhan — schedule-yada maintenance windows waxay yareeyaan downtime."
          },
          {
            h: "Container & Serverless Patching",
            p:
            "Containers waxaa la 'patch-gareeyaa' iyada oo la dhiso image cusub oo la deploy gareeyo (ma aha in la patch-gareeyo container running ah). Serverless-ka, provider-ku wuxuu maamulaa runtime patching, customer-ku wuxuu diiradda saaraa dependencies-ka."
          },
          {
            h: "Patch Prioritization",
            p:
            "CVSS scores iyo exploitability (CVE la yaqaan in la exploit-gareeyo 'in the wild') waxaa lagu kala hormariyaa patches-ka — Critical vulnerabilities (RCE) waa in la xaliyo 24-48 saac gudahood, ma aha in la sugo maintenance window caadiga ah."
          }
        ],

        terms: [
          { term: "Immutable Infrastructure", def: "Approach lagu beddelo instances halkii la patch-gareeyo." },
          { term: "Maintenance Window", def: "Waqti la go'aamiyay oo patches lagu dabaqo." }
        ],

        quiz: [
          {
            q: "Immutable infrastructure approach-ku wuxuu talinayaa?",
            options: [
              "Abuurista instances cusub (replace) halkii la patch-gareeyo kuwa jira",
              "Patch-gareynta instances jira oo keliya",
              "Ma jiro approach gaar ah",
              "Kaliya manual patching"
            ],
            answer: 0,
            explain: "Golden images cusub waxay xaqiijiyaan consistency iyo security."
          },
          {
            q: "Containers-ka patching-koodu wuxuu ku lug leeyahay?",
            options: [
              "Dhisidda image cusub oo la deploy gareeyo",
              "Patch-gareynta container running ah si toos ah",
              "Ma jiro patching loo baahan yahay",
              "Kaliya manual updates"
            ],
            answer: 0,
            explain: "Containers-ku waa immutable — image cusub ayaa loo baahan yahay."
          },
          {
            q: "Critical vulnerabilities (RCE) waa in la xaliyo?",
            options: [
              "24-48 saac gudahood",
              "Maintenance window caadiga ah oo keliya",
              "1 bil gudahood",
              "Ma jiro deadline"
            ],
            answer: 0,
            explain: "RCE vulnerabilities waa khatar sare, u baahan xal degdeg ah."
          },
          {
            q: "Serverless-ka, cidda mas'uul ka ah runtime patching?",
            options: [
              "Provider-ka",
              "Customer-ka",
              "Labadaba si isku mid ah",
              "Ma jiro mas'uul"
            ],
            answer: 0,
            explain: "Serverless-ku wuxuu ka saaraa customer mas'uuliyadda runtime/OS."
          }
        ],

        exercise: {
          title: "Patch Management Strategy",
          steps: [
            "Sharax farqiga traditional patching iyo immutable infrastructure.",
            "Naqshadee automated patch management plan (Systems Manager/Update Management).",
            "Sharax sida containers loo 'patch-gareeyo'.",
            "Naqshadee patch prioritization matrix (Critical/High/Medium)."
          ],
          deliverable: "Cloud patch management strategy."
        }
      },


      {
        slug: "compute-security-capstone",
        title: "Compute Security — Full Capstone",
        english: "Compute Security Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — naqshadee full compute security strategy.",

        sections: [
          {
            h: "Scenario",
            p:
            "Shirkad tech ah ayaa isticmaasha VMs, containers (Kubernetes), iyo serverless functions isku mar. Waxaad naqshadeynaysaa compute security strategy oo dhamaystiran."
          },
          {
            h: "VM & Container Hardening",
            p:
            "Naqshadee golden image strategy VMs, image scanning + runtime security containers."
          },
          {
            h: "Kubernetes & Serverless Security",
            p:
            "Naqshadee RBAC + Network Policies Kubernetes, iyo IAM role-per-function serverless."
          },
          {
            h: "Pipeline & Patch Management",
            p:
            "Naqshadee CI/CD security (secrets management, SAST) iyo patch management approach (immutable infrastructure)."
          }
        ],

        terms: [
          { term: "Full Compute Security Strategy", def: "Naqshad isugu jirta VMs, containers, Kubernetes, serverless, iyo CI/CD." }
        ],

        quiz: [
          {
            q: "Scenario-gan, VMs-ka approach-koodu waa in uu ahaado?",
            options: [
              "Golden images hardened ah, immutable replace approach",
              "Manual patching joogto ah",
              "Ma jiro approach loo baahan yahay",
              "Kaliya default configuration"
            ],
            answer: 0,
            explain: "Consistency iyo security waxay u baahan yihiin golden images."
          },
          {
            q: "Kubernetes cluster-ka, controls-ka aasaasiga ah waa?",
            options: [
              "RBAC + Network Policies",
              "Kaliya firewall",
              "Ma jiro control loo baahan yahay",
              "Kaliya encryption"
            ],
            answer: 0,
            explain: "Access control iyo network segmentation waa aasaaska Kubernetes security."
          },
          {
            q: "CI/CD pipeline-ka scenario-gan, tallaabada koowaad waa?",
            options: [
              "Xaqiijinta secrets aan hard-coded ahayn",
              "Isla markiiba deployment",
              "Ma jiro tallaabo",
              "Kaliya loo baahan yahay backup"
            ],
            answer: 0,
            explain: "Secrets management waa aasaaska pipeline security."
          }
        ],

        exercise: {
          title: "Full Compute Security Strategy",
          steps: [
            "Naqshadee VM hardening + golden image strategy.",
            "Naqshadee container/Kubernetes security (RBAC, Network Policies, image scanning).",
            "Naqshadee serverless security (IAM role-per-function, input validation).",
            "Diyaari CI/CD + patch management plan (portfolio-ready)."
          ],
          deliverable: "Full cloud compute security strategy (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "cs6",
    slug: "cloud-threats-attack-vectors",
    stage: "Sare",
    title: "Cloud Threats & Attack Vectors",
    english: "Cloud Threats & Attack Vectors",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa cloud attack patterns caanka ah — misconfiguration exploitation, credential theft, iyo cloud-specific MITRE ATT&CK techniques.",

    topics: [
      "Common Cloud Attack Patterns",
      "Misconfiguration Exploitation",
      "Cloud Credential Theft & Abuse",
      "Cross-Account & Privilege Escalation Attacks",
      "Cloud-Native Malware & Cryptomining",
      "MITRE ATT&CK for Cloud",
      "Cloud Threats Capstone",
    ],

    lessonList: [

      {
        slug: "common-cloud-attack-patterns",
        title: "Common Cloud Attack Patterns",
        english: "Common Cloud Attack Patterns",
        minutes: 15,

        summary:
          "Faham qaababka weerarka ugu caansan ee cloud environments-ka bartilmaameedsada.",

        sections: [
          {
            h: "Attack Pattern Overview",
            p:
            "Cloud attacks-yadu badanaa waxay raacaan pattern: 1) Recon (public exposure discovery), 2) Initial access (misconfiguration ama credential theft), 3) Privilege escalation, 4) Lateral movement, 5) Data exfiltration ama resource abuse."
          },
          {
            h: "Public-Facing Reconnaissance",
            p:
            "Attacker-yadu waxay isticmaalaan tools sida Shodan, ama automated scanners si ay u helaan resources cloud ah oo publicly exposed (S3 buckets, exposed APIs, misconfigured storage) — recon-kani wuxuu marka badan bilaabmaa aan authentication la beegsan."
          },
          {
            h: "Initial Access Vectors",
            p:
            "Leaked credentials (GitHub commits leh API keys), phishing (credential theft), exploited web applications (SQLi/RCE leading to cloud access), iyo public misconfigurations (open S3, exposed databases) waa dhammaantood habab caan ah."
          },
          {
            h: "Real-World Breach Patterns",
            p:
            "Breaches waaweyn (tusaale Capital One 2019) badanaa waxay isku daraan dhawr techniques: SSRF vulnerability → metadata service access → IAM credentials → S3 access → data exfiltration. Fahamka chain-kan wuxuu caawiyaa defense-ka."
          }
        ],

        terms: [
          { term: "Attack Chain", def: "Isku xigxiga tallaabooyinka weerarka laga bilaabo recon ilaa impact." }
        ],

        quiz: [
          {
            q: "Cloud attack pattern-ka guud wuxuu bilaabmaa?",
            options: [
              "Recon — ogaanshaha resources publicly exposed",
              "Data exfiltration si toos ah",
              "Privilege escalation oo keliya",
              "Ma jiro pattern la aqoonsan karo"
            ],
            answer: 0,
            explain: "Recon-ku wuxuu aqoonsadaa targets ka hor attacker-ku uu bilaabo initial access."
          },
          {
            q: "Leaked credentials GitHub commits ah waa tusaale?",
            options: [
              "Initial access vector caan ah",
              "Privilege escalation technique",
              "Data exfiltration method",
              "Ma jiro macno gaar ah"
            ],
            answer: 0,
            explain: "Developers-yadu badanaa si khaldan u ku daraan credentials source code gudaheeda."
          },
          {
            q: "Capital One-style breach-ku wuxuu isku daray?",
            options: [
              "SSRF → metadata → IAM credentials → S3 access → exfiltration",
              "Kaliya phishing",
              "Kaliya brute force",
              "Ma jiro chain la aqoonsan karo"
            ],
            answer: 0,
            explain: "Breach-yada waaweyn badanaa waxay isku daraan techniques badan."
          },
          {
            q: "Attack chain fahamkeedu wuxuu caawiyaa?",
            options: [
              "Defense-ka — la aqoonsado meesha lagu joojin lahaa weerarka",
              "Ma jiro faa'iido",
              "Kaliya attacker-yada ayaa faa'iidaysta",
              "Kaliya compliance ahaan"
            ],
            answer: 0,
            explain: "Defender-yadu waxay isticmaalaan fahamkan si ay u dhisaan detection/prevention layers."
          }
        ],

        exercise: {
          title: "Attack Pattern Mapping",
          steps: [
            "Naqshadee 5-ta tallaabo ee attack pattern guud.",
            "Sharax 3 initial access vectors caan ah.",
            "Falanqee Capital One-style breach chain-ka (concept ahaan).",
            "Sharax sida defense-ku ugu tijaabin lahaa in la joojiyo chain-kan marxalad kasta."
          ],
          deliverable: "Cloud attack pattern overview."
        }
      },


      {
        slug: "misconfiguration-exploitation",
        title: "Misconfiguration Exploitation",
        english: "Misconfiguration Exploitation",
        minutes: 11,

        summary:
          "Sii qoto dheeree fahamkaaga sida attacker-yadu u exploit-gareeyaan misconfigurations caanka ah.",

        sections: [
          {
            h: "Public Storage Buckets",
            p:
            "S3/Blob buckets oo publicly readable/writable waa mid ka mid ah misconfigurations-ka ugu badan la exploit-gareeyo — attacker-yadu waxay isticmaalaan automated scanners si ay u helaan buckets exposed ah bucket names guessing ahaan."
          },
          {
            h: "Overly Permissive Security Groups",
            p:
            "Security groups oggolaanaya 0.0.0.0/0 ports xasaasi ah (SSH, RDP, database ports) waxay u ogolaadaan attacker inuu si toos ah ula xiriiro resources — automated scanners waxay si joogto ah u baarayaan internet-ka dhammaan port-yada exposed."
          },
          {
            h: "Exposed APIs & Default Credentials",
            p:
            "APIs aan authentication lahayn, ama default credentials aan la beddelin (tusaale databases leh default admin/admin), waa targets caan ah oo attacker-yadu si degdeg ah u helaan initial access."
          },
          {
            h: "Automated Misconfiguration Scanning by Attackers",
            p:
            "Attacker-yadu waxay isticmaalaan tools automated ah (Shodan, custom scripts) si ay si joogto ah u baaraan internet-ka oo dhan misconfigurations ah — waqtiga u dhexeeya misconfiguration la sameeyo iyo la exploit-gareeyo waxaa laga yaabaa inuu ka yar yahay saacado."
          }
        ],

        terms: [
          { term: "Bucket Guessing", def: "Isku dayga magacyada buckets ah si loo helo kuwa exposed ah." }
        ],

        quiz: [
          {
            q: "Public S3 buckets waxaa lagu ogaan karaa?",
            options: [
              "Automated scanners oo bucket names guessing ah",
              "Kaliya manual searching",
              "Ma jiro hab la ogaan karo",
              "Kaliya law enforcement"
            ],
            answer: 0,
            explain: "Tools automated ah waxay si degdeg ah u baaraan buckets exposed ah."
          },
          {
            q: "Security groups oo 0.0.0.0/0 SSH oggol yahay waxay u ogolaadaan?",
            options: [
              "Attacker inuu si toos ah ula xiriiro internet-ka oo dhan",
              "Kaliya internal network access",
              "Ma jiro khatar",
              "Kaliya loo isticmaalo testing"
            ],
            answer: 0,
            explain: "Internet-ka oo dhan la oggol yahay waa red flag weyn."
          },
          {
            q: "Waqtiga u dhexeeya misconfiguration iyo exploitation waxaa laga yaabaa inuu?",
            options: [
              "Ka yar yahay saacado, sababtoo ah automated scanning joogto ah",
              "Waligiis dhan bilo",
              "Ma jiro waqti la qiyaasi karo",
              "Waligiis sanado"
            ],
            answer: 0,
            explain: "Automated attackers waxay si degdeg ah u helaan misconfigurations cusub."
          },
          {
            q: "Default credentials aan la beddelin waa?",
            options: [
              "Target caan ah oo initial access degdeg ah",
              "Ma jiro khatar",
              "Best practice",
              "Kaliya loo isticmaalo development"
            ],
            answer: 0,
            explain: "Credentials caan ah (admin/admin) waa kuwo attacker-yadu marka hore tijaabiyaan."
          }
        ],

        exercise: {
          title: "Misconfiguration Exploitation Analysis",
          steps: [
            "Sharax sida attacker-ku u ogaan lahaa S3 bucket exposed ah.",
            "Sharax khatarta security groups 0.0.0.0/0 ah ports xasaasi ah.",
            "Liis garee 3 default credentials tusaale ah oo la beddelo.",
            "Sharax sababta waqtiga exploitation-ku uu u yahay mid gaaban."
          ],
          deliverable: "Misconfiguration exploitation analysis notes."
        }
      },


      {
        slug: "cloud-credential-theft-abuse",
        title: "Cloud Credential Theft & Abuse",
        english: "Cloud Credential Theft and Abuse",
        minutes: 14,

        summary:
          "Faham habab caan ah oo credentials cloud ah loo xado, iyo sida loo isticmaalo weerarka kadib.",

        sections: [
          {
            h: "Sources of Credential Leakage",
            p:
            "Public code repositories (GitHub oo leh API keys hard-coded), phishing emails (credential harvesting), iyo malware oo laptops-ka developer-ka ka xada credentials — dhammaantood waa sources caan ah oo credential theft ah."
          },
          {
            h: "Access Key Abuse",
            p:
            "Marka access key la xado, attacker-ku wuxuu isticmaali karaa CLI/API si uu si toos ah ula xiriiro cloud account-ka — haddii aan MFA la haysan iyo permissions ay ballaaran yihiin, saameynta way weyn tahay."
          },
          {
            h: "Detecting Credential Abuse",
            p:
            "CloudTrail/Activity logs waxay muujin karaan signs: API calls ka yimid IP addresses aan caadi ahayn (geo-anomaly), API calls unusual ah (tusaale user caadi ah oo si degdeg ah u fuliyo dhawr admin actions), ama waqtiyo aan caadi ahayn."
          },
          {
            h: "Credential Rotation & Incident Response",
            p:
            "Marka credential theft la shakiyo, tallaabada degdegga ah waa in la rotate gareeyo/baabi'iyo credential-ka la xaday isla markiiba, kadibna la falanqeeyo logs si loo ogaado waxa la sameeyay muddadii access-ka la haystay."
          }
        ],

        terms: [
          { term: "Geo-Anomaly", def: "API calls ka yimid meelo aan caadi ahayn geographically ahaan." },
          { term: "Access Key", def: "Credential la isticmaalo CLI/API access cloud ah." }
        ],

        quiz: [
          {
            q: "Sources credential leakage caan ah waxaa ka mid ah?",
            options: [
              "Public GitHub repos oo API keys hard-coded ah",
              "Kaliya physical theft",
              "Ma jiro source caan ah",
              "Kaliya loo isticmaalo social media"
            ],
            answer: 0,
            explain: "Developers-yadu si khaldan ayay u ku darsadaan credentials source code."
          },
          {
            q: "Geo-anomaly logs gudahood wuxuu muujin karaa?",
            options: [
              "API calls ka yimid IP addresses aan caadi ahayn",
              "Caadi ahaan",
              "Backup process",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "Login/API calls dal aan caadi ahayn waa red flag credential abuse ah."
          },
          {
            q: "Marka credential theft la shakiyo, tallaabada degdegga ah waa?",
            options: [
              "Rotate/baabi'i credential-ka isla markiiba",
              "Sug ilaa maalinta xigta",
              "Iska dhaaf",
              "Kaliya beddel password-ka user-ka"
            ],
            answer: 0,
            explain: "Waqti degdeg ah ayaa yareeynaya window-ka access-ka attacker-ku haysto."
          },
          {
            q: "Access key oo la xaday, saameynta ugu weyn waxay ka dhalataa?",
            options: [
              "Aan MFA la haysan iyo permissions ballaaran",
              "MFA oo shid ah",
              "Ma jiro saameyn",
              "Kaliya haddii key-gu duqoobay yahay"
            ],
            answer: 0,
            explain: "Security controls la'aantoodu waxay kordhinayaan blast radius-ka."
          }
        ],

        exercise: {
          title: "Credential Theft Detection Practice",
          steps: [
            "Liis garee 3 sources oo credential leakage caan ah.",
            "Sharax sida geo-anomaly logs loo ogaan karo.",
            "Naqshadee incident response plan credential theft suspected ah.",
            "Sharax sababta MFA uu u yareeyo impact-ka access key theft."
          ],
          deliverable: "Credential theft detection and response notes."
        }
      },


      {
        slug: "cross-account-privilege-escalation",
        title: "Cross-Account & Privilege Escalation Attacks",
        english: "Cross-Account and Privilege Escalation Attacks",
        minutes: 12,

        summary:
          "Faham sida attacker-yadu u sii kordhiyaan awoodda cloud account gudaheeda ama u gudbaan accounts kale.",

        sections: [
          {
            h: "IAM Privilege Escalation Paths",
            p:
            "Haddii user-ku leeyahay permission uu ku beddeli karo IAM policies (iam:PutUserPolicy, iam:AttachUserPolicy), wuxuu u siin karaa naftiisa permissions ballaaran — kani waa privilege escalation path caan ah oo pentest-yada la baaro."
          },
          {
            h: "Cross-Account Role Assumption Abuse",
            p:
            "AssumeRole (AWS) wuxuu u ogolaadaa cross-account access legit ahaan (tusaale third-party vendors). Haddii trust policy uu ballaaran yahay (aan xaddidnayn cidda assume gareyn karta), attacker-ku wuxuu isticmaali karaa si uu ugu gudbo accounts kale."
          },
          {
            h: "Service-to-Service Privilege Chains",
            p:
            "Services (Lambda, EC2) leh IAM roles ah waxay mararka qaarkood leeyihiin trust chains dhaadheer — attacker-ku wuxuu jebin karaa hal service, kadibna wuxuu u isticmaali karaa role-kiisa si uu u helo access services kale."
          },
          {
            h: "Detecting & Preventing Privilege Escalation",
            p:
            "Regular IAM policy audits (tools sida AWS IAM Access Analyzer), monitoring IAM policy changes (CloudTrail), iyo xaddidaadda cidda leh permissions IAM management-ka (iam:* actions) waxay ka hortagaan escalation paths."
          }
        ],

        terms: [
          { term: "Privilege Escalation Path", def: "Sequence tallaabooyin ah oo attacker-ku ku sii kordhiyo awooddiisa." },
          { term: "AssumeRole", def: "AWS action u oggolaanaya cross-account role assumption." }
        ],

        quiz: [
          {
            q: "iam:PutUserPolicy permission-ku wuxuu u oggolaan karaa user-ka inuu?",
            options: [
              "U siiyo naftiisa permissions ballaaran (privilege escalation)",
              "Kaliya eegto policies",
              "Ma jiro khatar",
              "Kaliya loo isticmaalo read-only"
            ],
            answer: 0,
            explain: "Permission-kan wuxuu u ogolaadaa user-ka inuu beddelo policies-kiisa."
          },
          {
            q: "AssumeRole trust policy oo ballaaran wuxuu u ogolaan karaa?",
            options: [
              "Attacker inuu ugu gudbo accounts kale",
              "Ma jiro khatar",
              "Kaliya legit vendors ayaa access u leh",
              "Wuxuu xannibaa cross-account access"
            ],
            answer: 0,
            explain: "Trust policy aan xaddidnayn waa khatar cross-account ahaan."
          },
          {
            q: "AWS IAM Access Analyzer waxaa loo isticmaalaa?",
            options: [
              "Audit-ka IAM policies si loo ogaado privilege escalation paths",
              "Encrypt gareynta data",
              "Backup xogta",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "Access Analyzer wuxuu ogaadaa access unintended ah policies-ka gudahood."
          },
          {
            q: "Service-to-service privilege chains khatartu waa?",
            options: [
              "Attacker-ku wuxuu jebin karaa hal service, uu u isticmaalo role-kiisa services kale",
              "Ma jiro khatar",
              "Kaliya loo isticmaalo legit purposes",
              "Waligiis waa mid ammaan ah"
            ],
            answer: 0,
            explain: "Trust chains dhaadheer waxay kordhinayaan attack surface-ka."
          }
        ],

        exercise: {
          title: "Privilege Escalation Path Analysis",
          steps: [
            "Liis garee 3 IAM permissions oo privilege escalation u oggolaan kara.",
            "Sharax sida AssumeRole loo exploit-gareeyn karo trust policy ballaaran.",
            "Naqshadee IAM audit plan (Access Analyzer) organization ah.",
            "Sharax sida service-to-service chains loo xaddidi lahaa."
          ],
          deliverable: "Privilege escalation path analysis document."
        }
      },


      {
        slug: "cloud-native-malware-cryptomining",
        title: "Cloud-Native Malware & Cryptomining",
        english: "Cloud-Native Malware and Cryptomining",
        minutes: 10,

        summary:
          "Faham threats-ka gaarka ah ee cloud-ka — resource hijacking iyo cryptomining attacks.",

        sections: [
          {
            h: "Cryptomining/Cryptojacking Attacks",
            p:
            "Marka attacker-ku helo cloud access (credentials/misconfig), habka ugu caansan ee monetization-ka waa cryptomining — abuurista instances waaweyn (GPU/CPU-heavy) si loo isticmaalo compute-ka cryptocurrency mining ahaan, iyada oo victim-ku bixinayo kharashka."
          },
          {
            h: "Signs of Cryptomining Compromise",
            p:
            "Unexpected billing spikes, instances cusub oo aan la abuurin authorized user (unusual regions marka la abuuray), iyo high CPU/GPU utilization oo aan sabab caadi ah lahayn — dhammaantood waa red flags."
          },
          {
            h: "Fileless Cloud Attacks",
            p:
            "Cloud-native attacks badanaa waxay isticmaalaan native tools/APIs (living off the land cloud style) — tusaale: isticmaalka Lambda functions legit ah si loo fuliyo code khaldan, halkii la geli lahaa malware traditional ah."
          },
          {
            h: "Resource Abuse Detection & Prevention",
            p:
            "Billing alerts (unusual spend thresholds), service quotas/limits (xaddidaadda tirada instances la abuuri karo), iyo GuardDuty-style threat detection (specific findings cryptomining-ka la xiriira) waxay caawiyaan detection-ka."
          }
        ],

        terms: [
          { term: "Cryptojacking", def: "Weerar isticmaala cloud resources cryptocurrency mining ahaan." },
          { term: "Billing Spike", def: "Kordhin lama filaan ah oo kharash ah, calaamad compromise ah." }
        ],

        quiz: [
          {
            q: "Cryptomining attacks-ka ujeeddadoodu waa?",
            options: [
              "Isticmaalka compute-ka victim-ka cryptocurrency mining ahaan",
              "Data theft",
              "Ransomware deployment",
              "Ma jiro ujeeddo gaar ah"
            ],
            answer: 0,
            explain: "Attacker-ku wuxuu faa'iidaystaa resources-ka victim-ka, victim-kuna wuu bixiyaa kharashka."
          },
          {
            q: "Unexpected billing spike waa calaamad?",
            options: [
              "Cryptomining ama resource abuse suurtagal ah",
              "Caadi ahaan",
              "Backup process",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "Kordhin lama filaan ah kharash ahaan waa red flag weyn."
          },
          {
            q: "Living off the land cloud style-ku wuxuu isticmaalaa?",
            options: [
              "Native tools/APIs legit ah si loo fuliyo code khaldan",
              "Kaliya malware traditional ah",
              "Ma jiro technique",
              "Kaliya physical access"
            ],
            answer: 0,
            explain: "Cloud-native tools waxay ka dhigaan detection mid adag."
          },
          {
            q: "Service quotas/limits waxay ka hortagaan?",
            options: [
              "Tirada instances aan xaddidnayn oo attacker-ku abuuro",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo cost saving",
              "Kordhinta security oo kale"
            ],
            answer: 0,
            explain: "Limits-ku waxay xaddidaan blast radius resource abuse ah."
          }
        ],

        exercise: {
          title: "Cryptomining Detection Practice",
          steps: [
            "Liis garee 3 signs oo cryptomining compromise ah.",
            "Sharax sida living off the land cloud style u shaqeeyo.",
            "Naqshadee billing alert thresholds shirkad tusaale ah.",
            "Sharax faa'iidada service quotas resource abuse-ka ka hortagga."
          ],
          deliverable: "Cryptomining detection and prevention notes."
        }
      },


      {
        slug: "mitre-attack-for-cloud",
        title: "MITRE ATT&CK for Cloud",
        english: "MITRE ATT&CK for Cloud",
        minutes: 13,

        summary:
          "Faham sida MITRE ATT&CK Cloud Matrix loo isticmaalo si loo maareeyo cloud threats.",

        sections: [
          {
            h: "MITRE ATT&CK Cloud Matrix Overview",
            p:
            "MITRE ATT&CK wuxuu leeyahay matrix gaar ah oo Cloud ah (AWS, Azure, GCP, SaaS, Office 365, Google Workspace) — wuxuu u kala qaybiyaa tactics/techniques la xiriira cloud environments-ka."
          },
          {
            h: "Cloud-Specific Tactics",
            p:
            "Initial Access (exploit public-facing app, valid accounts), Persistence (create cloud account, IAM role manipulation), Privilege Escalation (IAM policy modification), Defense Evasion (disable logging), iyo Exfiltration (transfer to cloud account)."
          },
          {
            h: "Mapping Real Incidents to ATT&CK",
            p:
            "Marka la falanqeynayo incident, mapping-ka tallaabooyinka attacker-ku sameeyay ATT&CK techniques wuxuu caawiyaa communication-ka standardized ah (industry-wide) iyo aqoonsiga gaps-ka detection-ka."
          },
          {
            h: "Using ATT&CK for Detection Engineering",
            p:
            "Security teams waxay isticmaalaan ATT&CK Cloud Matrix si ay u dhisaan detection rules techniques kasta u gaar ah (tusaale: CloudTrail alert 'StopLogging' API call — Defense Evasion technique)."
          }
        ],

        terms: [
          { term: "MITRE ATT&CK Cloud Matrix", def: "Framework qeexaya tactics/techniques cloud-specific ah." }
        ],

        quiz: [
          {
            q: "MITRE ATT&CK Cloud Matrix wuxuu daboolaa?",
            options: [
              "AWS, Azure, GCP, SaaS, Office 365, Google Workspace",
              "Kaliya AWS",
              "Kaliya on-premise",
              "Ma jiro cloud coverage"
            ],
            answer: 0,
            explain: "Matrix-ku wuxuu ballaadhan yahay providers/services kala duwan."
          },
          {
            q: "'Disable logging' waa tusaale technique?",
            options: [
              "Defense Evasion",
              "Initial Access",
              "Exfiltration",
              "Persistence"
            ],
            answer: 0,
            explain: "Joojinta logging-ka waa isku day lagu qariyo dhaqanka attacker-ka."
          },
          {
            q: "Mapping incidents ATT&CK ahaan wuxuu caawiyaa?",
            options: [
              "Communication standardized ah iyo aqoonsiga detection gaps",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo reporting",
              "Kordhinta cost oo keliya"
            ],
            answer: 0,
            explain: "Standard-ka industry-wide-ka ah wuxuu fududeeyaa isgaarsiinta."
          },
          {
            q: "ATT&CK-ga la isticmaalo detection engineering ahaan wuxuu u ogolaadaa?",
            options: [
              "Dhisidda detection rules techniques kasta u gaar ah",
              "Ma jiro faa'iido",
              "Kaliya compliance",
              "Kordhinta speed oo keliya"
            ],
            answer: 0,
            explain: "Rules-ku waxay bartilmaameedsadaan techniques known ah."
          }
        ],

        exercise: {
          title: "MITRE ATT&CK Cloud Mapping",
          steps: [
            "Xulo scenario cloud breach ah, map dhacdada ATT&CK tactics.",
            "Liis garee 5 cloud-specific techniques iyo tusaalayaal.",
            "Naqshadee detection rule concept ah oo 'StopLogging' technique bartilmaameedsata.",
            "Sharax faa'iidada standardized mapping-ka team-ka security."
          ],
          deliverable: "MITRE ATT&CK cloud mapping exercise."
        }
      },


      {
        slug: "cloud-threats-capstone",
        title: "Cloud Threats — Full Capstone",
        english: "Cloud Threats Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — falanqee full cloud breach scenario.",

        sections: [
          {
            h: "Scenario",
            p:
            "SIEM-ku wuxuu muujinayaa: API calls ka yimid geo aan caadi ahayn, IAM policy changes lama filaan ah, iyo instances GPU-heavy oo cusub oo la abuuray."
          },
          {
            h: "Attack Chain Reconstruction",
            p:
            "Naqshadee sida aad u falanqeyn lahayd chain-ka: credential theft (geo-anomaly) → privilege escalation (IAM changes) → resource abuse (cryptomining instances)."
          },
          {
            h: "MITRE ATT&CK Mapping",
            p:
            "Map dhacdada ATT&CK Cloud Matrix techniques (Initial Access, Privilege Escalation, Impact)."
          },
          {
            h: "Response & Remediation",
            p:
            "Naqshadee tallaabooyinka: rotate credentials, hubi/hagaaji IAM policies, joojinaya/tirtir instances khaldan ah, iyo billing alert review."
          }
        ],

        terms: [
          { term: "Cloud Breach Investigation", def: "Falanqaynta isugu jirta attack chain, ATT&CK mapping, iyo response." }
        ],

        quiz: [
          {
            q: "Scenario-gan, evidence-ka koowaad (geo-anomaly) wuxuu tilmaamayaa?",
            options: [
              "Credential theft/abuse suurtagal ah",
              "Caadi ahaan",
              "Backup process",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "API calls geo aan caadi ahayn waa red flag credential abuse ah."
          },
          {
            q: "IAM policy changes lama filaan ah waxay ku xigaan geo-anomaly-ga waxay muujinayaan?",
            options: [
              "Privilege escalation kadib initial access",
              "Ma jiro xiriir",
              "Backup automatic ah",
              "Update software"
            ],
            answer: 0,
            explain: "Chain-ku wuxuu raacayaa pattern caadiga ah: access → escalation → abuse."
          },
          {
            q: "Instances GPU-heavy oo cusub waxay tilmaamayaan?",
            options: [
              "Cryptomining resource abuse",
              "Caadi ahaan",
              "Development testing",
              "Ma jiro macno"
            ],
            answer: 0,
            explain: "GPU instances waa target caan ah oo cryptomining ah."
          }
        ],

        exercise: {
          title: "Full Cloud Breach Investigation",
          steps: [
            "Naqshadee attack chain reconstruction (geo-anomaly → IAM changes → cryptomining).",
            "Map dhacdada MITRE ATT&CK Cloud Matrix techniques.",
            "Naqshadee response plan (credential rotation, IAM audit, resource cleanup).",
            "Diyaari warbixin buuxda oo IOCs iyo timeline leh (portfolio-ready)."
          ],
          deliverable: "Full cloud breach investigation report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "cs7",
    slug: "cloud-monitoring-logging",
    stage: "Sare",
    title: "Cloud Monitoring & Logging",
    english: "Cloud Monitoring & Logging",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa CloudTrail/Azure Monitor, log aggregation, SIEM integration, iyo cloud-native detection tools.",

    topics: [
      "CloudTrail & Activity Logs",
      "Azure Monitor & Log Analytics",
      "Log Aggregation & Centralization",
      "Cloud-Native Threat Detection",
      "SIEM Integration for Cloud",
      "Alerting & Automated Response",
      "Monitoring Capstone",
    ],

    lessonList: [

      {
        slug: "cloudtrail-activity-logs",
        title: "CloudTrail & Activity Logs",
        english: "CloudTrail and Activity Logs",
        minutes: 10,

        summary:
          "Faham qoto dheer AWS CloudTrail — sida uu u diiwaan geliyo API calls, iyo sida loo falanqeeyo.",

        sections: [
          {
            h: "Waa Maxay CloudTrail?",
            p:
            "AWS CloudTrail wuxuu diiwaan geliyaa API calls oo dhan account-ka lagu sameeyay — cidda (who), waxa la sameeyay (what), goorma (when), iyo halka laga sameeyay (where — IP address). Waa audit trail-ka aasaasiga ah ee AWS."
          },
          {
            h: "Management Events vs Data Events",
            p:
            "Management events waxay diiwaan geliyaan control plane actions (create/delete resources, IAM changes). Data events waxay diiwaan geliyaan resource-level operations (tusaale S3 GetObject/PutObject) — data events waa optional, waxaana kordhiya volume-ka logs-ka."
          },
          {
            h: "CloudTrail Log Integrity",
            p:
            "CloudTrail wuxuu bixiyaa log file validation (SHA256 hashing) si loo xaqiijiyo logs-ku aysan la beddelin. Logs-ku waa in la kaydiyo S3 bucket go'doonsan oo leh MFA delete oo shid ah, si loo iska ilaaliyo attacker inuu tirtiro evidence."
          },
          {
            h: "CloudTrail Insights",
            p:
            "CloudTrail Insights wuxuu si automatic ah u ogaadaa unusual API activity (tusaale spike-yada calls-ka aan caadi ahayn) — anomaly detection-kani wuxuu caawiyaa aqoonsiga dhaqdhaqaaqa shaki leh iyada oo aan la baahnayn manual review."
          }
        ],

        terms: [
          { term: "CloudTrail", def: "AWS service diiwaan geliya API calls account-ka gudihiisa." },
          { term: "Management Events", def: "Diiwaanka control plane actions (create/delete resources)." },
          { term: "Data Events", def: "Diiwaanka resource-level operations (tusaale S3 object access)." }
        ],

        quiz: [
          {
            q: "CloudTrail wuxuu diiwaan geliyaa?",
            options: [
              "Who, what, when, where ee API calls oo dhan",
              "Kaliya failed logins",
              "Kaliya network traffic",
              "Kaliya file contents"
            ],
            answer: 0,
            explain: "CloudTrail waa audit trail-ka comprehensive-ka ah ee AWS."
          },
          {
            q: "Data events waxay diiwaan geliyaan?",
            options: [
              "Resource-level operations (tusaale S3 GetObject)",
              "Kaliya control plane actions",
              "Ma jiro faa'iido",
              "Kaliya IAM changes"
            ],
            answer: 0,
            explain: "Data events-ku waa granular, waxaana optional ah sababtoo ah volume-koodu weyn yahay."
          },
          {
            q: "Sababta logs loo kaydiyo bucket leh MFA delete waa?",
            options: [
              "Si loo iska ilaaliyo attacker inuu tirtiro evidence",
              "Ma jiro sabab",
              "Kaliya loo isticmaalo compliance",
              "Kordhinta speed"
            ],
            answer: 0,
            explain: "MFA delete-ku wuxuu ka hortagaa attacker inuu si fudud u tirtiro logs."
          },
          {
            q: "CloudTrail Insights wuxuu si automatic ah u ogaadaa?",
            options: [
              "Unusual API activity (spikes aan caadi ahayn)",
              "Kaliya failed logins",
              "Ma jiro faa'iido detection ah",
              "Kaliya loo isticmaalo cost tracking"
            ],
            answer: 0,
            explain: "Anomaly detection-ku wuxuu caawiyaa aqoonsiga dhaqdhaqaaqa shaki leh."
          }
        ],

        exercise: {
          title: "CloudTrail Configuration Practice",
          steps: [
            "Sharax farqiga management events iyo data events.",
            "Naqshadee CloudTrail setup oo daboolaya log file validation.",
            "Sharax faa'iidada MFA delete S3 bucket-ka logs-ka.",
            "Sharax sida CloudTrail Insights loo isticmaali lahaa anomaly detection."
          ],
          deliverable: "CloudTrail configuration and monitoring plan."
        }
      },


      {
        slug: "azure-monitor-log-analytics",
        title: "Azure Monitor & Log Analytics",
        english: "Azure Monitor and Log Analytics",
        minutes: 12,

        summary:
          "Faham Azure Monitor iyo Log Analytics — sida ay u dhigmaan CloudTrail, laakiin Azure ecosystem gudihiisa.",

        sections: [
          {
            h: "Azure Activity Log",
            p:
            "Azure Activity Log wuxuu u dhigmaa CloudTrail — wuxuu diiwaan geliyaa subscription-level events (resource creation/deletion, policy changes). Waa control plane logging, la mid ah AWS management events."
          },
          {
            h: "Azure Monitor & Log Analytics Workspace",
            p:
            "Azure Monitor waa platform dhamaystiran oo la socda performance/health/security. Log Analytics Workspace waa central repository-ga logs-ka laga soo ururiyo sources kala duwan (VMs, applications, network) — query language-ku waa KQL (Kusto Query Language)."
          },
          {
            h: "Diagnostic Settings",
            p:
            "Resources Azure ah (VMs, storage, databases) waxay u baahan yihiin 'diagnostic settings' oo la shido si logs-koodu ugu socdaan Log Analytics ama storage account — default ahaan, resource-yadu ma diri karaan logs iyada oo aan la shidin."
          },
          {
            h: "KQL Query Basics",
            p:
            "KQL (Kusto Query Language) waa language lagu falanqeeyo logs Log Analytics gudaheeda. Tusaale: SigninLogs | where ResultType != 0 | summarize count() by UserPrincipalName — wuxuu soo saaraa failed sign-ins user kasta."
          }
        ],

        terms: [
          { term: "Azure Activity Log", def: "Diiwaanka subscription-level events, u dhigma CloudTrail." },
          { term: "KQL", def: "Kusto Query Language — language falanqaynta logs Azure." }
        ],

        quiz: [
          {
            q: "Azure Activity Log wuxuu u dhigmaa AWS?",
            options: [
              "CloudTrail (management events)",
              "S3",
              "IAM",
              "VPC"
            ],
            answer: 0,
            explain: "Labaduba waa control plane audit logs."
          },
          {
            q: "Diagnostic settings waxay u baahan yihiin?",
            options: [
              "In la shido si resources logs-kooda ugu socdaan Log Analytics",
              "Ma loo baahna hawlgal gaar ah",
              "Default-ka ahaan way shaqeeyaan",
              "Kaliya loo isticmaalo VMs"
            ],
            answer: 0,
            explain: "Resources-ku default ahaan ma diri karaan logs iyada oo aan la shidin."
          },
          {
            q: "KQL waxaa loo isticmaalaa?",
            options: [
              "Falanqaynta logs Log Analytics gudaheeda",
              "Encrypt gareynta data",
              "Backup xogta",
              "Ma jiro isticmaal"
            ],
            answer: 0,
            explain: "KQL waa query language-ka Azure logs analysis-ka."
          },
          {
            q: "Log Analytics Workspace waa?",
            options: [
              "Central repository logs laga soo ururiyo sources kala duwan",
              "Kaliya loo isticmaalo VMs",
              "Ma jiro faa'iido",
              "Kaliya backup storage"
            ],
            answer: 0,
            explain: "Workspace-ku wuxuu isku daraa logs sources badan halkii single view ah."
          }
        ],

        exercise: {
          title: "Azure Monitor Setup Practice",
          steps: [
            "Sharax sida Azure Activity Log uga duwan yahay CloudTrail (terminology ahaan).",
            "Sharax sababta diagnostic settings loo shido resources.",
            "Qor tusaale KQL query ah oo raadinaya failed sign-ins.",
            "Naqshadee Log Analytics Workspace setup shirkad tusaale ah."
          ],
          deliverable: "Azure Monitor and Log Analytics setup guide."
        }
      },


      {
        slug: "log-aggregation-centralization",
        title: "Log Aggregation & Centralization",
        english: "Log Aggregation and Centralization",
        minutes: 13,

        summary:
          "Faham sida logs multi-account/multi-cloud loo isku dari lahaa hal muuqaal.",

        sections: [
          {
            h: "Sababta Centralization Muhiim u Tahay",
            p:
            "Shirkadaha waaweyn waxay leeyihiin accounts/subscriptions badan (dev, staging, prod, business units kala duwan). Logs go'doonsan account kasta waxay adkeeyaan detection-ka threats-ka isugu jira accounts badan."
          },
          {
            h: "AWS Organizations & Centralized CloudTrail",
            p:
            "AWS Organizations wuxuu u oggolaadaa 'organization trail' — hal CloudTrail configuration oo si automatic ah logs uga soo ururiya accounts member-ka oo dhan, oo lagu kaydiyo central logging account."
          },
          {
            h: "Multi-Cloud Log Aggregation",
            p:
            "Shirkadaha multi-cloud ah (AWS + Azure) waxay u baahan yihiin tools/platforms u ogolaada logs labada provider in lagu isku daro (tusaale SIEM ama data lake), sababtoo ah CloudTrail iyo Azure Monitor waa systems kala duwan oo aan si toos ah isula shaqeynayn."
          },
          {
            h: "Log Retention & Storage Tiering",
            p:
            "Logs 'hot' (dhawaan, si degdeg ah loo baahan yahay) waxaa lagu kaydiyaa storage degdeg ah (SIEM, hot storage). Logs hore (compliance retention, 1-7 sano) waxaa loo dhaqaajiyaa storage jaban (S3 Glacier, Azure Archive) si loo yareeyo kharashka."
          }
        ],

        terms: [
          { term: "Centralized Logging", def: "Isku darka logs accounts/sources badan hal muuqaal." },
          { term: "Storage Tiering", def: "U kala qaybinta logs storage kala duwan iyadoo lagu saleynayo baahida." }
        ],

        quiz: [
          {
            q: "Sababta centralized logging muhiim u tahay waa?",
            options: [
              "Adkeynta detection-ka threats-ka isugu jira accounts badan",
              "Ma jiro sabab",
              "Kaliya loo baahan yahay compliance",
              "Kordhinta cost oo keliya"
            ],
            answer: 0,
            explain: "Logs go'doonsan waxay ka dhigaan detection mid adag."
          },
          {
            q: "AWS Organization trail wuxuu bixiyaa?",
            options: [
              "Hal CloudTrail configuration oo accounts member-ka oo dhan daboosha",
              "Kaliya hal account logging",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Organization trail-ku wuxuu fududeeyaa maamulka logging accounts badan."
          },
          {
            q: "Storage tiering-ku wuxuu yareeyaa?",
            options: [
              "Kharashka logs hore ee aan si degdeg ah loo baahan",
              "Ma jiro faa'iido",
              "Speed-ka access-ka logs hadda ah",
              "Security-ga logs-ka"
            ],
            answer: 0,
            explain: "Logs jaban oo hore u jira ma khuseeyo speed sare."
          },
          {
            q: "Multi-cloud log aggregation waxay u baahan tahay?",
            options: [
              "Tools/platforms u ogolaada isku darka logs providers kala duwan",
              "Ma loo baahna isku darid",
              "Kaliya hal provider ayaa la isticmaalaa",
              "Kaliya manual copying"
            ],
            answer: 0,
            explain: "CloudTrail iyo Azure Monitor waa systems kala duwan oo u baahan integration."
          }
        ],

        exercise: {
          title: "Centralized Logging Architecture",
          steps: [
            "Naqshadee AWS Organization trail setup accounts badan ah.",
            "Sharax sida multi-cloud logs loo isku dari lahaa (SIEM/data lake).",
            "Naqshadee storage tiering strategy (hot/cold logs).",
            "Sharax faa'iidada centralized logging incident response ahaan."
          ],
          deliverable: "Centralized logging architecture plan."
        }
      },


      {
        slug: "cloud-native-threat-detection",
        title: "Cloud-Native Threat Detection",
        english: "Cloud-Native Threat Detection",
        minutes: 15,

        summary:
          "Faham tools-ka cloud-native ee threat detection — GuardDuty, Microsoft Defender for Cloud.",

        sections: [
          {
            h: "AWS GuardDuty",
            p:
            "GuardDuty waa threat detection service machine-learning-based ah oo si automatic ah u falanqeeya CloudTrail, VPC Flow Logs, iyo DNS logs si loo ogaado threats (crypto mining, compromised credentials, recon activity)."
          },
          {
            h: "Microsoft Defender for Cloud",
            p:
            "Microsoft Defender for Cloud (hore Azure Security Center) wuxuu bixiyaa Cloud Security Posture Management (CSPM) iyo threat detection VMs, containers, databases, iyo services kale — wuxuu bixiyaa secure score oo qiimeeya security posture-ka guud."
          },
          {
            h: "Understanding Findings & Severity",
            p:
            "Findings-ku waxay leeyihiin severity levels (Low/Medium/High/Critical). Analyst-ku waa in uu falanqeeyo finding kasta context ahaan (business impact) ka hor uu go'aamiyo response, ma aha kaliya severity score-ka raw ah."
          },
          {
            h: "Reducing False Positives",
            p:
            "Cloud-native detection tools waxay mararka qaarkood soo saaraan false positives (tusaale: developer legit ah oo access ka sameeya dal cusub travel ahaan). Suppression rules iyo context enrichment (tusaale known traveler lists) waxay yareeyaan noise-ka."
          }
        ],

        terms: [
          { term: "GuardDuty", def: "AWS threat detection service ML-based ah." },
          { term: "CSPM", def: "Cloud Security Posture Management — qiimaynta configuration security-ga." }
        ],

        quiz: [
          {
            q: "GuardDuty wuxuu falanqeeyaa?",
            options: [
              "CloudTrail, VPC Flow Logs, DNS logs",
              "Kaliya CloudTrail",
              "Kaliya network traffic",
              "Ma jiro data source"
            ],
            answer: 0,
            explain: "GuardDuty wuxuu isticmaalaa data sources badan si loo helo threats."
          },
          {
            q: "Microsoft Defender for Cloud wuxuu bixiyaa?",
            options: [
              "CSPM iyo threat detection",
              "Kaliya backup",
              "Kaliya storage",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Wuxuu isku daraa qiimaynta configuration iyo detection threats."
          },
          {
            q: "Analyst-ku waa in uu falanqeeyo findings?",
            options: [
              "Context ahaan (business impact), ma aha kaliya severity score raw",
              "Kaliya severity score",
              "Kaliya waqtiga",
              "Ma jiro factor la tixgelin karo"
            ],
            answer: 0,
            explain: "Context-ku wuxuu hagaa mudnaanta dhabta ah ee response-ka."
          },
          {
            q: "Suppression rules waxay yareeyaan?",
            options: [
              "False positives noise-ka",
              "True positives",
              "Ma jiro faa'iido",
              "Detection capability oo dhan"
            ],
            answer: 0,
            explain: "Context enrichment-ku wuxuu ka caawiyaa in la kala saaro true/false positives."
          }
        ],

        exercise: {
          title: "Cloud-Native Detection Setup",
          steps: [
            "Sharax sida GuardDuty loo shido oo loo falanqeeyo findings-ka.",
            "Sharax faa'iidada Defender for Cloud secure score.",
            "Xulo finding tusaale ah, sharax habka context-enrichment loo isticmaali lahaa.",
            "Naqshadee suppression rule tusaale ah oo false positive yareeynaya."
          ],
          deliverable: "Cloud-native threat detection setup guide."
        }
      },


      {
        slug: "siem-integration-cloud",
        title: "SIEM Integration for Cloud",
        english: "SIEM Integration for Cloud",
        minutes: 11,

        summary:
          "Faham sida cloud logs loogu daro SIEM (Splunk, Sentinel, iwm) si loo helo unified visibility.",

        sections: [
          {
            h: "Sababta SIEM Integration Muhiim u Tahay",
            p:
            "Cloud-native tools (GuardDuty, Defender) waxay bixiyaan detection cloud-specific ah, laakiin SOC-yada badankood waxay u baahan yihiin unified view isugu jira cloud + on-premise + endpoint data — SIEM-ku wuxuu bixiyaa correlation-kan."
          },
          {
            h: "Cloud-to-SIEM Connectors",
            p:
            "SIEMs casriga ah (Splunk, Microsoft Sentinel, Azure Sentinel) waxay bixiyaan built-in connectors AWS/Azure ah oo si otomaatig ah logs uga soo saara CloudTrail/Activity Logs oo SIEM-ka geliya, iyada oo aan manual export loo baahnayn."
          },
          {
            h: "Normalizing Cloud Logs",
            p:
            "Cloud providers kala duwan waxay isticmaalaan log formats kala duwan — normalization (beddelidda format isku mid ah, tusaale CIM — Common Information Model) waxay u ogolaataa detection rules inay shaqeeyaan providers oo dhan."
          },
          {
            h: "Correlation Rules Across Cloud & On-Premise",
            p:
            "Detection rules-ku waxay isku dari karaan cloud iyo on-premise data (tusaale: VPN login on-premise ku xigta API call cloud-ka ah IP kale ka yimid — 'impossible travel' correlation)."
          }
        ],

        terms: [
          { term: "SIEM Connector", def: "Integration u ogolaada cloud logs inay si otomaatig ah SIEM-ka u galaan." },
          { term: "Log Normalization", def: "Beddelidda logs format isku mid ah (CIM) providers kala duwan." }
        ],

        quiz: [
          {
            q: "SIEM integration ujeeddadeedu waa?",
            options: [
              "Unified view isugu jira cloud + on-premise + endpoint",
              "Kaliya cloud data",
              "Ma jiro ujeeddo",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Correlation cross-source-ka ah wuxuu muujiyaa attacks kaliya cloud-only tools aysan arki karin."
          },
          {
            q: "Log normalization waxay u ogolaataa?",
            options: [
              "Detection rules inay shaqeeyaan providers cloud oo dhan",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo storage",
              "Kordhinta volume-ka logs"
            ],
            answer: 0,
            explain: "Format isku mid ah wuxuu fududeeyaa rule-writing generic ah."
          },
          {
            q: "Impossible travel correlation rule-ku wuxuu isticmaalaa?",
            options: [
              "VPN login on-premise + API call cloud IP kale (waqti isku dhow)",
              "Kaliya cloud data",
              "Kaliya on-premise data",
              "Ma jiro data loo baahan yahay"
            ],
            answer: 0,
            explain: "Kani waa tusaale correlation isugu jira sources kala duwan."
          },
          {
            q: "SIEM connectors waxay yareeyaan?",
            options: [
              "Baahida manual export logs-ka",
              "Ma jiro faa'iido",
              "Detection capability",
              "Kordhinta manual work oo keliya"
            ],
            answer: 0,
            explain: "Automation-ku wuxuu xaqiijiyaa logs joogtada ah oo aan la iloobin."
          }
        ],

        exercise: {
          title: "SIEM Integration Planning",
          steps: [
            "Sharax sababta SIEM integration muhiim u tahay cloud-native tools kaliya kama filna.",
            "Naqshadee connector setup CloudTrail → SIEM.",
            "Sharax faa'iidada log normalization (CIM).",
            "Qor tusaale correlation rule ah oo cloud + on-premise isku darta."
          ],
          deliverable: "SIEM integration plan for cloud environments."
        }
      },


      {
        slug: "alerting-automated-response",
        title: "Alerting & Automated Response",
        english: "Alerting and Automated Response",
        minutes: 14,

        summary:
          "Faham sida alerting loo naqshadeeyo iyo sida automated response (SOAR-style) loo hirgeliyo cloud-ka.",

        sections: [
          {
            h: "Alert Fatigue & Tuning",
            p:
            "Alerts badan oo aan la kala hormarin waxay keenaan 'alert fatigue' — analyst-yadu waxay bilaabaan inay iska indho tiraan alerts, oo ay ku jiraan kuwa muhiimka ah. Tuning joogtada ah (severity thresholds, suppression) waa muhiim."
          },
          {
            h: "Automated Remediation (SOAR-Style)",
            p:
            "Cloud-native automation (AWS Lambda triggered by GuardDuty finding, Azure Logic Apps triggered by Sentinel alert) wuxuu u oggolaadaa automatic response (tusaale: isolate compromised instance, revoke credentials) iyada oo aan sugin analyst manual intervention."
          },
          {
            h: "Playbooks for Common Cloud Incidents",
            p:
            "Playbooks predefined ah (tusaale: 'Compromised IAM credentials' playbook — rotate key, review recent API calls, check for new resources created) waxay u ogolaadaan response consistent ah oo dhaqso ah."
          },
          {
            h: "Balancing Automation & Human Oversight",
            p:
            "Automated actions xoog badan (tusaale: account suspension, resource deletion) waa in ay leeyihiin human approval step (semi-automated), ma aha fully automatic — si loo iska ilaaliyo false positive oo keenaya business disruption."
          }
        ],

        terms: [
          { term: "Alert Fatigue", def: "Marka analyst-yadu iska indho tiraan alerts badan oo aan la kala hormarin." },
          { term: "SOAR", def: "Security Orchestration, Automation, and Response." }
        ],

        quiz: [
          {
            q: "Alert fatigue wuxuu keenaa?",
            options: [
              "Analyst-yadu inay iska indho tiraan alerts muhiimka ah",
              "Kordhinta detection accuracy",
              "Ma jiro saameyn",
              "Yareynta alerts oo dhan"
            ],
            answer: 0,
            explain: "Noise badan wuxuu qariyaa signal-ka muhiimka ah."
          },
          {
            q: "Automated remediation tusaale ahaan waa?",
            options: [
              "Lambda function oo GuardDuty finding uu kicin karo",
              "Kaliya manual scripts",
              "Ma jiro tusaale",
              "Kaliya email alerts"
            ],
            answer: 0,
            explain: "Automation-ku wuxuu ka dhigayaa response mid degdeg ah, aan sugin analyst."
          },
          {
            q: "Playbooks waxay bixiyaan?",
            options: [
              "Response consistent ah oo dhaqso ah incidents caanka ah",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo documentation",
              "Kordhinta cost oo keliya"
            ],
            answer: 0,
            explain: "Predefined steps waxay yareeyaan waqtiga la go'aamiyo response-ka."
          },
          {
            q: "Actions xoog badan (account suspension) waa in ay leeyihiin?",
            options: [
              "Human approval step, ma aha fully automatic",
              "Fully automatic oo keliya",
              "Ma jiro shuruud",
              "Kaliya manual oo keliya"
            ],
            answer: 0,
            explain: "False positives waxay keeni karaan business disruption haddii aan la xakamayn."
          }
        ],

        exercise: {
          title: "Automated Response Playbook Design",
          steps: [
            "Sharax sababta alert fatigue uu u yahay khatar security ahaan.",
            "Naqshadee automated remediation flow (finding → Lambda → action).",
            "Qor playbook 'Compromised IAM Credentials' ah.",
            "Sharax sababta human approval loo baahan yahay actions xoog badan."
          ],
          deliverable: "Automated incident response playbook."
        }
      },


      {
        slug: "monitoring-capstone",
        title: "Monitoring — Full Capstone",
        english: "Cloud Monitoring Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — naqshadee full monitoring & detection strategy.",

        sections: [
          {
            h: "Scenario",
            p:
            "Shirkad multi-cloud ah (AWS + Azure) ayaa u baahan tahay monitoring strategy dhamaystiran oo la isku daro SIEM."
          },
          {
            h: "Logging Foundation",
            p:
            "Naqshadee CloudTrail (AWS) iyo Activity Log/Diagnostic Settings (Azure) setup, oo ay ku jirto centralization."
          },
          {
            h: "Detection & SIEM Integration",
            p:
            "Naqshadee GuardDuty + Defender for Cloud setup, iyo SIEM integration (normalization, correlation rules)."
          },
          {
            h: "Alerting & Response",
            p:
            "Naqshadee alert tuning strategy iyo automated response playbook incident caan ah."
          }
        ],

        terms: [
          { term: "Full Monitoring Strategy", def: "Naqshad isugu jirta logging, detection, SIEM, iyo response." }
        ],

        quiz: [
          {
            q: "Multi-cloud scenario-gan, logging foundation-ku waa in uu daboolo?",
            options: [
              "CloudTrail iyo Azure Activity Log/Diagnostic Settings labadaba",
              "Kaliya AWS",
              "Kaliya Azure",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Multi-cloud environment-ku wuxuu u baahan yahay coverage providers oo dhan."
          },
          {
            q: "SIEM integration-ku muhiim u yahay sababtoo ah?",
            options: [
              "Unified visibility isugu jira providers kala duwan",
              "Ma jiro sabab",
              "Kaliya loo baahan yahay compliance",
              "Kordhinta cost oo keliya"
            ],
            answer: 0,
            explain: "Cloud-native tools kaliya kuma filna multi-cloud visibility."
          },
          {
            q: "Alert tuning strategy-gu wuxuu ka hortagaa?",
            options: [
              "Alert fatigue oo keenaya in signal muhiimka ah la seego",
              "Ma jiro faa'iido",
              "Kordhinta alerts",
              "Kaliya loo isticmaalo cost"
            ],
            answer: 0,
            explain: "Tuning-ku wuxuu xaqiijiyaa in analyst-yadu diiradda saaraan waxa muhiimka ah."
          }
        ],

        exercise: {
          title: "Full Cloud Monitoring Strategy",
          steps: [
            "Naqshadee logging foundation (CloudTrail + Azure Activity Log).",
            "Naqshadee detection setup (GuardDuty + Defender for Cloud).",
            "Naqshadee SIEM integration plan (normalization, correlation rules).",
            "Diyaari alerting/response playbook (portfolio-ready)."
          ],
          deliverable: "Full cloud monitoring and detection strategy (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "cs8",
    slug: "cloud-compliance-governance",
    stage: "Sare",
    title: "Cloud Compliance & Governance",
    english: "Cloud Compliance & Governance",
    hours: 1,

    outcome:
      "Waxaad si adag u fahmi doontaa CSPM, compliance frameworks (SOC 2, ISO 27001, GDPR), policy as code, iyo cloud governance strategies.",

    topics: [
      "Cloud Security Posture Management (CSPM)",
      "Compliance Frameworks Overview",
      "Policy as Code",
      "Tagging & Resource Governance",
      "Cost Governance & Security",
      "Third-Party & Vendor Risk",
      "Compliance Capstone",
    ],

    lessonList: [

      {
        slug: "cloud-security-posture-management",
        title: "Cloud Security Posture Management (CSPM)",
        english: "Cloud Security Posture Management (CSPM)",
        minutes: 12,

        summary:
          "Faham sida CSPM tools u falanqeeyaan configuration security-ga cloud environments-ka oo dhan.",

        sections: [
          {
            h: "Waa Maxay CSPM?",
            p:
            "CSPM tools (AWS Security Hub, Azure Defender for Cloud, third-party sida Wiz/Prisma Cloud) si joogto ah ayay u falanqeeyaan configuration-ka cloud resources oo dhan, kuna barbardhigaan best practices/compliance standards, si loo ogaado misconfigurations."
          },
          {
            h: "Continuous Compliance Monitoring",
            p:
            "Halka manual audits ay dhacaan hal mar sanadkii, CSPM wuxuu bixiyaa monitoring joogto ah — misconfiguration cusub oo la sameeyay maanta waa la ogaan karaa maanta, ma aha audit xigta ee mustaqbalka."
          },
          {
            h: "Security Score & Benchmarking",
            p:
            "CSPM tools badankood waxay bixiyaan security score (tusaale AWS Security Hub, Azure Secure Score) oo isku daraya findings-ka dhammaan — score-kani wuxuu u oggolaadaa organizations inay la socdaan horumarka waqti ka dib."
          },
          {
            h: "CIS Benchmarks for Cloud",
            p:
            "CIS (Center for Internet Security) Benchmarks waxay bixiyaan configuration guidelines detailed ah providers kala duwan (AWS, Azure, GCP) — CSPM tools badankood waxay isticmaalaan CIS Benchmarks sida baseline-ka la barbardhigo."
          }
        ],

        terms: [
          { term: "CSPM", def: "Cloud Security Posture Management — falanqaynta joogtada ah ee configuration security." },
          { term: "CIS Benchmarks", def: "Guidelines configuration security ah oo providers kala duwan." }
        ],

        quiz: [
          {
            q: "CSPM tools waxay sameeyaan?",
            options: [
              "Falanqaynta joogtada ah ee configuration, barbardhigga best practices",
              "Kaliya hal mar sanadkii",
              "Ma jiro faa'iido",
              "Kaliya backup"
            ],
            answer: 0,
            explain: "Continuous monitoring-ku wuxuu ogaadaa misconfigurations dhaqso ahaan."
          },
          {
            q: "Continuous compliance monitoring faa'iidadeeda ugu weyn waa?",
            options: [
              "Misconfiguration cusub waa la ogaan karaa maanta, ma aha audit xigta",
              "Ma jiro faa'iido",
              "Kordhinta cost oo keliya",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Waqtiga u dhexeeya misconfiguration iyo detection wuxuu yaraadaa."
          },
          {
            q: "Security score (AWS Security Hub) wuxuu u oggolaadaa?",
            options: [
              "La socodka horumarka waqti ka dib",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo reporting",
              "Kordhinta speed"
            ],
            answer: 0,
            explain: "Score-ku wuxuu bixiyaa muuqaal guud oo horumarinta security-ga."
          },
          {
            q: "CIS Benchmarks waxay bixiyaan?",
            options: [
              "Configuration guidelines detailed ah providers kala duwan",
              "Kaliya loo isticmaalo AWS",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "CIS waa standard industry-wide ah oo CSPM tools isticmaalaan."
          }
        ],

        exercise: {
          title: "CSPM Setup Practice",
          steps: [
            "Sharax farqiga manual audits iyo continuous CSPM monitoring.",
            "Sharax sida security score loo isticmaali lahaa la socodka horumarka.",
            "Liis garee 3 misconfigurations CIS Benchmarks bartilmaameedsan.",
            "Naqshadee CSPM implementation plan organization ah."
          ],
          deliverable: "CSPM setup and monitoring plan."
        }
      },


      {
        slug: "compliance-frameworks-overview",
        title: "Compliance Frameworks Overview",
        english: "Compliance Frameworks Overview",
        minutes: 10,

        summary:
          "Faham qoto dheer compliance frameworks caanka ah — SOC 2, ISO 27001, GDPR, HIPAA.",

        sections: [
          {
            h: "SOC 2",
            p:
            "SOC 2 (System and Organization Controls) waa framework badanaa loo isticmaalo SaaS/technology companies — wuxuu falanqeeyaa controls-ka la xiriira Security, Availability, Processing Integrity, Confidentiality, iyo Privacy (Trust Service Criteria)."
          },
          {
            h: "ISO 27001",
            p:
            "ISO 27001 waa standard caalami ah oo ISMS (Information Security Management System) ah. Wuxuu diiradda saaraa risk-based approach — organizations waxay dhisaan ISMS oo ku habboon risks-kooda gaarka ah, ma aha checklist adag."
          },
          {
            h: "GDPR (General Data Protection Regulation)",
            p:
            "GDPR waa xeer privacy ah oo Europe ah oo saameeya organization kasta oo xogta EU residents-ka maareysa, xitaa haddii organization-ku uusan ku jirin Europe. Wuxuu u baahan yahay data minimization, consent, iyo breach notification 72 saacadood gudahood."
          },
          {
            h: "HIPAA & Industry-Specific Compliance",
            p:
            "HIPAA (US healthcare) wuxuu qeexayaa sida xogta bukaanka loo ilaaliyo. PCI DSS wuxuu qeexayaa sida payment card data loo ilaaliyo. Industry kasta wuxuu leeyahay compliance requirements gaarka ah oo cloud security-gu waa in uu daboolo."
          }
        ],

        terms: [
          { term: "SOC 2", def: "Framework controls ah, badanaa SaaS companies." },
          { term: "ISO 27001", def: "Standard caalami ah oo ISMS ah, risk-based approach." },
          { term: "GDPR", def: "Xeer privacy Europe ah oo saameeya xogta EU residents." }
        ],

        quiz: [
          {
            q: "SOC 2 wuxuu falanqeeyaa?",
            options: [
              "Security, Availability, Processing Integrity, Confidentiality, Privacy",
              "Kaliya Security",
              "Kaliya Privacy",
              "Ma jiro criteria gaar ah"
            ],
            answer: 0,
            explain: "Trust Service Criteria-ga ayaa dhisa aasaaska SOC 2."
          },
          {
            q: "ISO 27001 wuxuu diiradda saaraa?",
            options: [
              "Risk-based approach, ma aha checklist adag",
              "Checklist adag oo keliya",
              "Kaliya technical controls",
              "Ma jiro approach gaar ah"
            ],
            answer: 0,
            explain: "ISMS-ku wuxuu ku habboon yahay risks-ka organization gaarka ah."
          },
          {
            q: "GDPR wuxuu saameeyaa?",
            options: [
              "Organization kasta oo xogta EU residents maareysa, xitaa haddii uusan Europe ku jirin",
              "Kaliya organizations Europe ku jira",
              "Kaliya government agencies",
              "Ma jiro saameyn dibadda ah"
            ],
            answer: 0,
            explain: "GDPR-gu wuxuu leeyahay extraterritorial scope."
          },
          {
            q: "GDPR breach notification-ku waa in uu dhaco?",
            options: [
              "72 saacadood gudahood",
              "30 maalmood gudahood",
              "Ma jiro deadline",
              "1 sanad gudahood"
            ],
            answer: 0,
            explain: "GDPR-gu wuxuu qeexayaa deadline cad oo breach notification ah."
          }
        ],

        exercise: {
          title: "Compliance Framework Mapping",
          steps: [
            "Naqshadee jaantus barbardhig ah SOC 2, ISO 27001, GDPR.",
            "Xulo scenario shirkad healthcare ah, aqoonso compliance frameworks khuseeya.",
            "Sharax sababta GDPR uu u saameeyo shirkad Somaliland ah oo customers EU ah leh.",
            "Sharax sida cloud security-gu u taageero compliance requirements-kan."
          ],
          deliverable: "Compliance frameworks comparison sheet."
        }
      },


      {
        slug: "policy-as-code",
        title: "Policy as Code",
        english: "Policy as Code",
        minutes: 13,

        summary:
          "Faham sida security policies loo qoro code, si loo automate gareeyo compliance enforcement.",

        sections: [
          {
            h: "Waa Maxay Policy as Code?",
            p:
            "Policy as Code wuxuu qeexayaa security/compliance rules code-form ahaan (ma aha documents PDF ah oo la akhriyo), taasoo u ogolaanaysa in la automate gareeyo enforcement-ka iyo testing-ka — tools sida Open Policy Agent (OPA), AWS Config Rules."
          },
          {
            h: "Preventive vs Detective Controls",
            p:
            "Preventive controls (policy as code deployment-ka gudihiisa) waxay xannibaan resources aan compliant ahayn ka hor inay la abuuraan (tusaale: 'deny' resource creation haddii aan encryption la shidin). Detective controls waxay ogaadaan aan compliant ahayn kadib abuurista."
          },
          {
            h: "AWS Config Rules & Azure Policy",
            p:
            "AWS Config Rules waxay si joogto ah u falanqeeyaan resources iyada oo lagu barbardhigayo rules la qeexay (tusaale: 's3-bucket-public-read-prohibited'). Azure Policy wuxuu leeyahay concept la mid ah — policies-ka waxaa lagu dabaqi karaa 'deny' ama 'audit' effect."
          },
          {
            h: "Integrating Policy as Code into CI/CD",
            p:
            "Policy as code waxaa lagu daraa CI/CD pipeline-ka (tusaale: Terraform plan la scan gareeyo OPA ka hor deployment) — kani wuxuu u ogolaadaa 'shift left' security, aqoonsiga violations ka hor infrastructure-ku uu deploy gareeyo."
          }
        ],

        terms: [
          { term: "Policy as Code", def: "Qorista security/compliance rules code-form ahaan." },
          { term: "Shift Left", def: "Aqoonsiga violations marxaladda hore (ka hor deployment)." }
        ],

        quiz: [
          {
            q: "Policy as code wuxuu u ogolaadaa?",
            options: [
              "Automation-ka enforcement/testing compliance rules",
              "Ma jiro faa'iido",
              "Kaliya documentation",
              "Kordhinta cost oo keliya"
            ],
            answer: 0,
            explain: "Code-based policies waa la automate gareyn karaa, ma aha documents la akhriyo oo keliya."
          },
          {
            q: "Preventive control (deny resource creation) wuxuu ka duwan yahay detective sababtoo ah?",
            options: [
              "Wuxuu xannibaa ka hor abuurista, detective-ku wuxuu ogaadaa kadib",
              "Isku mid",
              "Ma jiro farqi",
              "Preventive kaliya waa detective kale"
            ],
            answer: 0,
            explain: "Preventive-ku wuxuu joojiyaa dhaqan khaldan ka hor uu dhaco."
          },
          {
            q: "Shift left security macnaheedu waa?",
            options: [
              "Aqoonsiga violations marxaladda hore (ka hor deployment)",
              "Aqoonsiga violations kadib production",
              "Ma jiro macno",
              "Kaliya loo isticmaalo testing"
            ],
            answer: 0,
            explain: "Kadib deployment-ka waa mid ka gaabis fixing marka la barbardhigo hore."
          },
          {
            q: "AWS Config Rules waxay sameeyaan?",
            options: [
              "Falanqaynta joogtada ah ee resources la barbardhigayo rules la qeexay",
              "Kaliya backup",
              "Kaliya storage",
              "Ma jiro shaqo gaar ah"
            ],
            answer: 0,
            explain: "Config Rules waa mid ka mid ah tools policy as code AWS ah."
          }
        ],

        exercise: {
          title: "Policy as Code Implementation",
          steps: [
            "Qor tusaale AWS Config Rule ah (concept ahaan) oo xannibaya public S3 buckets.",
            "Sharax farqiga preventive iyo detective controls.",
            "Sharax sida policy as code loogu daro CI/CD pipeline.",
            "Naqshadee shift left security strategy organization ah."
          ],
          deliverable: "Policy as code implementation guide."
        }
      },


      {
        slug: "tagging-resource-governance",
        title: "Tagging & Resource Governance",
        english: "Tagging and Resource Governance",
        minutes: 10,

        summary:
          "Faham sida resource tagging loo isticmaalo governance, security, iyo cost management.",

        sections: [
          {
            h: "Sababta Tagging Muhiim u Yahay",
            p:
            "Tags (key-value pairs, tusaale Environment=Production, Owner=TeamA) waxay u ogolaadaan organizations inay kala saaraan, kala hormariyaan, oo la socdaan resources — aan tags la isticmaalin, resources waxay noqdaan 'orphaned' oo aan la maamulin."
          },
          {
            h: "Security Use Cases for Tagging",
            p:
            "Tags waxay u ogolaadaan security policies inay isbeddesho iyadoo lagu saleynayo tag (tusaale: resources leh Environment=Production waxay u baahan yihiin encryption waajib ah, Environment=Dev laga yaabo inay leeyihiin xeerar dhib yar)."
          },
          {
            h: "Mandatory Tagging Policies",
            p:
            "Organizations waxay hirgeliyaan mandatory tagging policies (policy as code lagu dabaqo) — resources aan lahayn tags waajibka ah (Owner, Environment, CostCenter) waa la xannibaa in la abuuro."
          },
          {
            h: "Resource Lifecycle Management",
            p:
            "Tags waxay taageeraan lifecycle management — tags sida 'ExpirationDate' waxay u oggolaadaan automation inuu tirtiro resources ku meel gaadhka ah (tusaale dev/test resources) automatic ahaan, yareynaya attack surface iyo cost."
          }
        ],

        terms: [
          { term: "Resource Tagging", def: "Key-value pairs lagu calaamadeeyo resources cloud ah." },
          { term: "Mandatory Tagging Policy", def: "Policy u baahan tags waajibka ah resource kasta." }
        ],

        quiz: [
          {
            q: "Resources aan tags lahayn waxay noqon karaan?",
            options: [
              "Orphaned, aan la maamulin",
              "Mid ka ammaan badan",
              "Ma jiro saameyn",
              "Kaliya loo isticmaalo backup"
            ],
            answer: 0,
            explain: "Tags-la'aanta waxay adkeeysaa la socodka iyo maamulka resources."
          },
          {
            q: "Security policies iyadoo lagu saleynayo tags waxay u ogolaadaan?",
            options: [
              "Xeerar kala duwan iyadoo lagu saleynayo environment (Production vs Dev)",
              "Isla xeer dhammaan resources",
              "Ma jiro flexibility",
              "Kaliya loo isticmaalo cost"
            ],
            answer: 0,
            explain: "Tag-based policies waxay siiyaan flexibility granular ah."
          },
          {
            q: "Mandatory tagging policies waxay sameeyaan?",
            options: [
              "Xannibaan abuurista resources aan lahayn tags waajibka ah",
              "Ma jiro enforcement",
              "Kaliya suggest gareeyaan",
              "Kaliya loo isticmaalo reporting"
            ],
            answer: 0,
            explain: "Enforcement-ku wuxuu xaqiijiyaa tagging consistency-ga."
          },
          {
            q: "ExpirationDate tag-ku wuxuu u oggolaadaa?",
            options: [
              "Automation inuu tirtiro resources ku meel gaadhka ah automatic ahaan",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo billing",
              "Kordhinta lifespan resources"
            ],
            answer: 0,
            explain: "Lifecycle automation-ku wuxuu yareeyaa attack surface iyo cost."
          }
        ],

        exercise: {
          title: "Tagging Strategy Design",
          steps: [
            "Naqshadee mandatory tags 4 ah (Owner, Environment, CostCenter, ExpirationDate).",
            "Sharax security policy tag-based ah (Production vs Dev).",
            "Sharax sida policy as code loogu enforce gareeyo mandatory tagging.",
            "Sharax faa'iidada resource lifecycle automation."
          ],
          deliverable: "Resource tagging and governance strategy."
        }
      },


      {
        slug: "cost-governance-security",
        title: "Cost Governance & Security",
        english: "Cost Governance and Security",
        minutes: 12,

        summary:
          "Faham xiriirka u dhexeeya cost governance iyo security cloud-ka gudihiisa.",

        sections: [
          {
            h: "Cost as a Security Signal",
            p:
            "Sida hore loo sharaxay, kordhin cost ah oo lama filaan ah waxay noqon kartaa signal security ah (cryptomining, resource abuse). Cost monitoring-ku waa qayb ka mid ah security posture-ka guud, ma aha kaliya finance."
          },
          {
            h: "Budgets & Alerts",
            p:
            "AWS Budgets, Azure Cost Management alerts waxay bixiyaan digniin marka spend-ku dhaafo threshold la go'aamiyay — kuwaan waxay u adeegaan labadaba cost control iyo security detection ahaan."
          },
          {
            h: "Resource Quotas & Limits",
            p:
            "Service quotas (tirada instances la abuuri karo, API rate limits) waxay ka hortagaan labadaba runaway costs iyo resource abuse attacks — limits-ku waa control dual-purpose ah."
          },
          {
            h: "FinOps & Security Collaboration",
            p:
            "FinOps (Financial Operations) team-yada iyo security team-yada waa in ay la shaqeeyaan — cost anomalies waxay noqon karaan security incidents, security incidents-na (resource abuse) waxay noqon karaan cost issues."
          }
        ],

        terms: [
          { term: "FinOps", def: "Financial Operations — maamulka kharashka cloud-ka joogtada ah." },
          { term: "Service Quota", def: "Xaddidaadda tirada resources la abuuri karo." }
        ],

        quiz: [
          {
            q: "Kordhin cost ah oo lama filaan ah waxay noqon kartaa?",
            options: [
              "Signal security ah (cryptomining, resource abuse)",
              "Kaliya finance issue",
              "Ma jiro saameyn security ah",
              "Caadi ahaan"
            ],
            answer: 0,
            explain: "Cost anomalies-ku waxay isku dhex jiraan security incidents badan."
          },
          {
            q: "Service quotas waxay ka hortagaan?",
            options: [
              "Runaway costs iyo resource abuse attacks labadaba",
              "Kaliya cost",
              "Kaliya security",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "Limits-ku waa control dual-purpose ah."
          },
          {
            q: "FinOps iyo security team-yadu waa in ay?",
            options: [
              "La shaqeeyaan, sababtoo ah cost anomalies waxay isku dhex jiraan security",
              "Si gooni ah u shaqeeyaan",
              "Ma jiro xiriir u dhexeeya",
              "Kaliya security ayaa mas'uul ka ah"
            ],
            answer: 0,
            explain: "Collaboration-ku wuxuu kordhinayaa detection capability-ga guud."
          },
          {
            q: "Budgets/alerts waxay u adeegaan?",
            options: [
              "Cost control iyo security detection labadaba",
              "Kaliya cost control",
              "Kaliya security",
              "Ma jiro faa'iido dual-purpose ah"
            ],
            answer: 0,
            explain: "Threshold breaches waxay muujin karaan compromise ama misconfiguration."
          }
        ],

        exercise: {
          title: "Cost-Security Collaboration Plan",
          steps: [
            "Sharax xiriirka u dhexeeya cost anomalies iyo security incidents.",
            "Naqshadee budget alert thresholds shirkad tusaale ah.",
            "Sharax sida service quotas u yareeyaan risk labadaba dhinac.",
            "Naqshadee collaboration process FinOps iyo security team-yada."
          ],
          deliverable: "Cost governance and security collaboration plan."
        }
      },


      {
        slug: "third-party-vendor-risk",
        title: "Third-Party & Vendor Risk",
        english: "Third-Party and Vendor Risk",
        minutes: 13,

        summary:
          "Faham sida third-party integrations/vendors loo qiimeeyo risk-ka cloud environment-ka gudihiisa.",

        sections: [
          {
            h: "Third-Party Access Risks",
            p:
            "SaaS integrations, third-party APIs, iyo contractors leh cloud access waxay kordhinayaan attack surface-ka — supply chain attacks (tusaale third-party tool la jebiyo) waxay siin karaan attacker access indirect ah environment-kaaga."
          },
          {
            h: "Vendor Security Assessment",
            p:
            "Ka hor la oggolaado third-party integration, waa in la falanqeeyo: SOC 2 report-ka vendor-ka, security questionnaire (tusaale CAIQ — Consensus Assessments Initiative Questionnaire), iyo data handling practices-kooda."
          },
          {
            h: "Least Privilege for Third-Party Integrations",
            p:
            "Third-party tools waa in la siiyaa kaliya permissions-ka waajibka ah (tusaale: analytics tool uu u baahan yahay read-only access, ma aha write/delete). API keys third-party ah waa in la la socdo si gaar ah."
          },
          {
            h: "Continuous Vendor Monitoring",
            p:
            "Vendor risk assessment maaha hal-mar oo keliya — waa in la la socdo joogtada ah (tusaale: vendor breach news, security posture changes). Contracts-ku waa in ay ku jiraan breach notification requirements vendor-ka."
          }
        ],

        terms: [
          { term: "Vendor Security Assessment", def: "Falanqaynta security posture-ka third-party vendor kasta." },
          { term: "CAIQ", def: "Consensus Assessments Initiative Questionnaire — standard security questionnaire." }
        ],

        quiz: [
          {
            q: "Third-party integrations waxay kordhinayaan?",
            options: [
              "Attack surface-ka (supply chain attack risk)",
              "Ma jiro khatar",
              "Kaliya cost",
              "Kaliya performance"
            ],
            answer: 0,
            explain: "Access indirect ah wuxuu siiyaa attacker vector cusub."
          },
          {
            q: "Vendor security assessment-ku waa in uu daboolo?",
            options: [
              "SOC 2 report, security questionnaire (CAIQ), data handling practices",
              "Kaliya price-ka vendor-ka",
              "Ma jiro shuruud",
              "Kaliya company size-ka"
            ],
            answer: 0,
            explain: "Faahfaahin dhamaystiran waa loo baahan yahay in la go'aamiyo risk-ka."
          },
          {
            q: "Third-party tools waa in la siiyaa?",
            options: [
              "Kaliya permissions-ka waajibka ah (least privilege)",
              "Access buuxa always",
              "Ma jiro xaddid",
              "Kaliya admin access"
            ],
            answer: 0,
            explain: "Least privilege-ku wuxuu yareeyaa saameynta haddii vendor la jebiyo."
          },
          {
            q: "Vendor risk assessment waa in ay ahaato?",
            options: [
              "Joogto ah, ma aha hal-mar oo keliya",
              "Hal mar sanadkii oo keliya",
              "Ma loo baahna assessment",
              "Kaliya marka la bilaabo contract-ka"
            ],
            answer: 0,
            explain: "Vendor-ku wuxuu isbeddeli karaa, waa in la la socdo joogtada ah."
          }
        ],

        exercise: {
          title: "Vendor Risk Assessment Practice",
          steps: [
            "Xulo scenario third-party tool ah (tusaale analytics service).",
            "Naqshadee vendor security assessment checklist.",
            "Sharax permissions-ka least privilege loogu siin lahaa tool-kaas.",
            "Naqshadee ongoing vendor monitoring plan."
          ],
          deliverable: "Third-party vendor risk assessment guide."
        }
      },


      {
        slug: "compliance-capstone",
        title: "Compliance & Governance — Full Capstone",
        english: "Compliance and Governance Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — naqshadee full compliance/governance program.",

        sections: [
          {
            h: "Scenario",
            p:
            "Shirkad SaaS ah (leh customers EU ah) ayaa u baahan tahay SOC 2 certification iyo GDPR compliance, iyadoo isticmaasha third-party vendors dhawr ah."
          },
          {
            h: "CSPM & Policy as Code",
            p:
            "Naqshadee CSPM implementation iyo policy as code rules SOC 2/GDPR requirements taageera."
          },
          {
            h: "Governance Structure",
            p:
            "Naqshadee mandatory tagging policy iyo cost governance approach."
          },
          {
            h: "Vendor Risk Management",
            p:
            "Naqshadee vendor risk assessment process third-party integrations-ka."
          }
        ],

        terms: [
          { term: "Full Compliance Program", def: "Naqshad isugu jirta CSPM, policy as code, governance, iyo vendor risk." }
        ],

        quiz: [
          {
            q: "Scenario-gan, GDPR-gu wuxuu khusaysaa sababtoo ah?",
            options: [
              "Customers EU ah — extraterritorial scope",
              "Ma khuseeyo",
              "Kaliya haddii shirkadu Europe ku taal",
              "Kaliya government agencies"
            ],
            answer: 0,
            explain: "Xogta EU residents-ka waxay keentaa GDPR applicability."
          },
          {
            q: "SOC 2 certification-ku wuxuu u baahan yahay?",
            options: [
              "Controls Security, Availability, Processing Integrity, Confidentiality, Privacy",
              "Kaliya technical controls",
              "Ma jiro shuruud",
              "Kaliya loo baahan yahay backup"
            ],
            answer: 0,
            explain: "Trust Service Criteria-ga ayaa la falanqeeyaa."
          },
          {
            q: "Third-party vendors scenario-gan waxay u baahan yihiin?",
            options: [
              "Vendor risk assessment iyo least privilege access",
              "Ma loo baahna assessment",
              "Kaliya price comparison",
              "Access buuxa oo aan xaddidnayn"
            ],
            answer: 0,
            explain: "Vendor risk-ku wuxuu saameeyaa compliance posture-ka guud."
          }
        ],

        exercise: {
          title: "Full Compliance & Governance Program",
          steps: [
            "Naqshadee CSPM + policy as code (SOC 2/GDPR requirements).",
            "Naqshadee mandatory tagging + cost governance.",
            "Naqshadee vendor risk assessment process.",
            "Diyaari compliance/governance program summary (portfolio-ready)."
          ],
          deliverable: "Full cloud compliance and governance program (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "cs9",
    slug: "cloud-incident-response",
    stage: "Sare",
    title: "Cloud Incident Response",
    english: "Cloud Incident Response",
    hours: 2,

    outcome:
      "Waxaad si adag u fahmi doontaa cloud-specific IR lifecycle, containment strategies, forensics cloud-ka gudihiisa, iyo multi-account IR.",

    topics: [
      "Cloud IR Lifecycle",
      "Containment in Cloud Environments",
      "Cloud Forensics Fundamentals",
      "Credential Compromise Response",
      "Multi-Account/Multi-Cloud IR",
      "Post-Incident Activities",
      "Incident Response Capstone",
    ],

    lessonList: [

      {
        slug: "cloud-ir-lifecycle",
        title: "Cloud IR Lifecycle",
        english: "Cloud IR Lifecycle",
        minutes: 15,

        summary:
          "Faham sida NIST IR lifecycle-ka loogu dabaqo cloud environments, iyo caqabadaha gaarka ah.",

        sections: [
          {
            h: "NIST IR Lifecycle Cloud-ka",
            p:
            "Preparation, Detection & Analysis, Containment/Eradication/Recovery, iyo Post-Incident Activity — labo lifecycle-ka guud ee IR-ku waa isku mid, laakiin cloud-ku wuxuu keenaa caqabado/faa'iidooyin gaarka ah marxalad kasta."
          },
          {
            h: "Preparation Cloud-Specific",
            p:
            "Preparation-ku wuxuu daboolaa: IAM roles IR-specific ah (pre-provisioned, ma aha la abuuro incident-ka gudihiisa), runbooks cloud-native ah, iyo tooling (CloudTrail, forensic snapshot capabilities) diyaar ah ka hor loo baahdo."
          },
          {
            h: "Detection & Analysis Advantages",
            p:
            "Cloud-ku wuxuu bixiyaa advantages detection ahaan: comprehensive API logging (CloudTrail), automated tooling (GuardDuty), iyo awoodda in la falanqeeyo resources iyada oo aan la taaban jireedka — kuwaan waxay dedejin karaan analysis marka la barbardhigo on-premise."
          },
          {
            h: "Speed of Cloud IR",
            p:
            "Cloud-ku wuxuu u oggolaadaa IR mid dhaqso ah — snapshot forensic ah waxaa la sameyn karaa daqiiqado gudahood (marka la barbardhigo physical imaging saacado qaadan karta), oo isolation-ku (security group changes) wuxuu ka dhici karaa daqiiqado."
          }
        ],

        terms: [
          { term: "Cloud IR", def: "Incident response cloud environments ku dhaca." },
          { term: "IR Runbook", def: "Dukumeenti qeexaya tallaabooyinka la raaco incident nooc gaar ah." }
        ],

        quiz: [
          {
            q: "NIST IR lifecycle-ka afarta marxaladood waa?",
            options: [
              "Preparation, Detection/Analysis, Containment/Eradication/Recovery, Post-Incident",
              "Kaliya Detection iyo Response",
              "Kaliya Preparation",
              "Ma jiro marxalado la qeexay"
            ],
            answer: 0,
            explain: "Kani waa framework standard-ka ah oo IR-ku raaco, cloud iyo on-premise labadaba."
          },
          {
            q: "IAM roles IR-specific ah waa in ay?",
            options: [
              "Pre-provisioned, ma aha la abuuro incident-ka gudihiisa",
              "La abuuro kaliya incident-ka gudihiisa",
              "Ma jiro baahi loo qabo",
              "Kaliya loo isticmaalo development"
            ],
            answer: 0,
            explain: "Waqti degdeg ah waa muhiim — diyaarin hore ayaa dedejinaysa response-ka."
          },
          {
            q: "Cloud-ku wuxuu ka dedejiyaa snapshot forensic ah sababtoo ah?",
            options: [
              "Waxaa la sameyn karaa daqiiqado gudahood, marka la barbardhigo physical imaging",
              "Ma jiro farqi cloud iyo on-premise",
              "Cloud-ku wuu ka gaabis yahay",
              "Ma jiro faa'iido"
            ],
            answer: 0,
            explain: "API-driven snapshots way ka dhaqso badan yihiin physical hardware imaging."
          },
          {
            q: "GuardDuty/comprehensive logging faa'iidadooda detection ahaan waa?",
            options: [
              "Automated tooling dedejinaysa analysis-ka",
              "Ma jiro faa'iido",
              "Kordhinta manual work",
              "Kaliya loo isticmaalo billing"
            ],
            answer: 0,
            explain: "Automation-ku wuxuu yareeyaa waqtiga u dhexeeya detection iyo analysis."
          }
        ],

        exercise: {
          title: "Cloud IR Lifecycle Mapping",
          steps: [
            "Naqshadee afarta marxaladood ee NIST IR lifecycle-ka.",
            "Marxalad kasta u qor cloud-specific considerations.",
            "Sharax faa'iidooyinka speed ee cloud IR.",
            "Naqshadee IAM role IR-specific ah oo pre-provisioned ah."
          ],
          deliverable: "Cloud IR lifecycle reference guide."
        }
      },


      {
        slug: "containment-cloud-environments",
        title: "Containment in Cloud Environments",
        english: "Containment in Cloud Environments",
        minutes: 11,

        summary:
          "Faham strategies-ka containment-ka cloud-ka gudihiisa — isolation, credential revocation, iyo snapshot preservation.",

        sections: [
          {
            h: "Network Isolation Techniques",
            p:
            "Security group modification (xayirid dhammaan traffic marka laga reebo forensic access) waa habka ugu dhaqsaha badan ee la go'doomiyo instance shaki leh — ka duwan on-premise (physically unplug), cloud isolation-ku wuxuu ka dhici karaa daqiiqado API call ahaan."
          },
          {
            h: "Credential Revocation",
            p:
            "Marka credential compromise la shakiyo, tallaabada degdegga ah waa in la baabi'iyo/rotate gareeyo access keys, la disable gareeyo IAM users, ama la revoke gareeyo temporary credentials (roles) — kani wuxuu joojinayaa attacker access-ka isla markiiba."
          },
          {
            h: "Snapshot Preservation for Forensics",
            p:
            "Ka hor la joojiyo ama la tirtiro resource shaki leh, waa waajib in la qaado snapshot (disk + memory haddii macquul ah) forensic ahaan — snapshot-kani wuxuu ilaalinayaa evidence xitaa haddii la go'doomiyo ama la tirtiro production resource-ka."
          },
          {
            h: "Balancing Containment & Business Continuity",
            p:
            "Containment aggressive ah (tusaale: xiritaanka account oo dhan) wuxuu khatar gelin karaa business operations — waa in la isku dheellitiraa u baahanka joojinta attacker iyo yareynta business disruption, gaar ahaan production-critical systems."
          }
        ],

        terms: [
          { term: "Network Isolation (Cloud)", def: "Xayirida traffic security group modification ah, daqiiqado ku dhaca." },
          { term: "Credential Revocation", def: "Baabi'inta/rotate-ka credentials si loo joojiyo attacker access." }
        ],

        quiz: [
          {
            q: "Cloud isolation-ku (security group modification) wuxuu ka dhici karaa?",
            options: [
              "Daqiiqado, API call ahaan",
              "Saacado, physical unplug ahaan",
              "Maalmo",
              "Ma jiro waqti la qiyaasi karo"
            ],
            answer: 0,
            explain: "Cloud API-du wuxuu u ogolaadaa isolation degdeg ah marka la barbardhigo physical actions."
          },
          {
            q: "Credential revocation tallaabada koowaad ee credential compromise waa?",
            options: [
              "Baabi'inta/rotate-ka credentials si toos ah",
              "Sug ilaa maalinta xigta",
              "Iska dhaaf",
              "Kaliya beddel password-ka user-ka"
            ],
            answer: 0,
            explain: "Waqti degdeg ah wuxuu yareeynayaa window-ka access-ka."
          },
          {
            q: "Snapshot forensic ah waa in la qaado?",
            options: [
              "Ka hor la joojiyo ama la tirtiro resource-ka shaki leh",
              "Kadib la tirtiro resource-ka",
              "Ma loo baahna snapshot",
              "Kaliya haddii law enforcement loo baahdo"
            ],
            answer: 0,
            explain: "Evidence-ka waa in la ilaaliyaa ka hor wax kasta oo isbeddel ah."
          },
          {
            q: "Aggressive containment (account suspension) wuxuu khatar gelin karaa?",
            options: [
              "Business continuity/operations",
              "Ma jiro khatar",
              "Kaliya security-ga",
              "Kaliya cost-ka"
            ],
            answer: 0,
            explain: "Balance-ku waa muhiim marka la go'aaminayo containment strategy."
          }
        ],

        exercise: {
          title: "Containment Strategy Practice",
          steps: [
            "Sharax sida security group modification loo isticmaalo isolation degdeg ah.",
            "Naqshadee credential revocation checklist compromise suspected ah.",
            "Sharax sababta snapshot forensic ah loo qaado ka hor containment.",
            "Xulo scenario production-critical ah, isku dheellitir containment vs business continuity."
          ],
          deliverable: "Cloud containment strategy playbook."
        }
      },


      {
        slug: "cloud-forensics-fundamentals-ir",
        title: "Cloud Forensics Fundamentals",
        english: "Cloud Forensics Fundamentals",
        minutes: 14,

        summary:
          "Faham sida forensics loo sameeyo cloud environments-ka gudahood — snapshot analysis, log-based forensics.",

        sections: [
          {
            h: "Volatile vs Persistent Cloud Evidence",
            p:
            "Cloud-ku wuxuu keenaa caqabado gaarka ah forensics ahaan: instances waxaa laga yaabaa in la 'terminate' gareeyo (auto-scaling), taasoo lumin karta evidence haddii aan degdeg loo qaadan. Logs (CloudTrail) waxay bixiyaan evidence 'persistent' ah, xitaa haddii instance la tirtiro."
          },
          {
            h: "Disk Snapshot Forensics",
            p:
            "EBS snapshots (AWS), managed disk snapshots (Azure) waxaa loo sameyn karaa daqiiqado gudahood — snapshot-ka waxaa la 'mount' gareyn karaa forensic workstation ah oo isolated ah si loo falanqeeyo, la mid ah disk imaging on-premise."
          },
          {
            h: "Memory Forensics in Cloud",
            p:
            "Memory forensics cloud-ka gudihiisa waa mid ka adag on-premise — waa in la qabtaa memory ka hor la 'terminate' gareeyo instance-ka (ma aha 'stop', 'terminate' wuxuu lumiyaa memory), iyada oo la isticmaalayo agent ama specialized tooling."
          },
          {
            h: "Log-Based Forensics",
            p:
            "Marka disk/memory aan la heli karin (tusaale serverless functions), CloudTrail/Activity Logs waxay noqdaan source-ka forensic-ka ugu weyn — falanqaynta API calls sequence-ka waxay dhisi kartaa timeline dhamaystiran xitaa iyada oo aan disk access la haysan."
          }
        ],

        terms: [
          { term: "EBS Snapshot", def: "Snapshot disk AWS ah, la mount gareyn karo forensic analysis ahaan." },
          { term: "Log-Based Forensics", def: "Falanqaynta API call logs marka disk/memory aan la heli karin." }
        ],

        quiz: [
          {
            q: "Sababta CloudTrail loo yiraahdo evidence 'persistent' waa?",
            options: [
              "Way sii jirtaa xitaa haddii instance la tirtiro",
              "Way lumaan instance-ka la tirtiro",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo compliance"
            ],
            answer: 0,
            explain: "Logs-ku waa storage gaar ah oo aan ku xirnayn instance-ka."
          },
          {
            q: "EBS snapshot waxaa loo sameyn karaa?",
            options: [
              "Daqiiqado gudahood",
              "Saacado",
              "Maalmo",
              "Ma jiro waqti la qiyaasi karo"
            ],
            answer: 0,
            explain: "Cloud snapshots waa mid ka dhaqso badan physical imaging."
          },
          {
            q: "Memory forensics cloud-ka waa in la qabtaa?",
            options: [
              "Ka hor la terminate gareeyo instance-ka",
              "Kadib la terminate gareeyo",
              "Ma loo baahna memory forensics",
              "Kaliya la stop gareeyo (ma aha terminate)"
            ],
            answer: 0,
            explain: "Terminate-ku wuxuu lumiyaa memory, ka duwan stop (mararka qaarkood)."
          },
          {
            q: "Log-based forensics waxaa loo isticmaalaa marka?",
            options: [
              "Disk/memory aan la heli karin (tusaale serverless)",
              "Marwalba, ma aha kaliya xaaladaha gaarka ah",
              "Ma jiro isticmaal",
              "Kaliya loo isticmaalo VMs"
            ],
            answer: 0,
            explain: "Serverless functions ma laha disk/memory la image-gareyn karo directly."
          }
        ],

        exercise: {
          title: "Cloud Forensics Approach Planning",
          steps: [
            "Sharax farqiga volatile iyo persistent cloud evidence.",
            "Sharax habka EBS snapshot loo qaado oo loo falanqeeyo.",
            "Sharax sababta memory forensics loo qaado ka hor terminate.",
            "Naqshadee log-based forensics approach scenario serverless ah."
          ],
          deliverable: "Cloud forensics approach guide."
        }
      },


      {
        slug: "credential-compromise-response",
        title: "Credential Compromise Response",
        english: "Credential Compromise Response",
        minutes: 12,

        summary:
          "Baro playbook dhamaystiran oo lagu maareeyo credential compromise incidents cloud-ka gudihiisa.",

        sections: [
          {
            h: "Initial Detection & Triage",
            p:
            "Alerts (GuardDuty finding, geo-anomaly, unusual API activity) waxay kicin karaan investigation-ka. Triage-ku wuxuu daboolaa: xaqiijinta finding-ka run ah (ma aha false positive), iyo qiimaynta scope-ka (credential kee, waxa la sameeyay)."
          },
          {
            h: "Immediate Containment",
            p:
            "1) Rotate/baabi'i credential-ka la xaday. 2) Review recent API calls (CloudTrail) si loo ogaado waxa la sameeyay. 3) Check for new resources created (persistence attempts). 4) Review IAM policy changes."
          },
          {
            h: "Scope Assessment",
            p:
            "Falanqaynta CloudTrail waxay caawisaa go'aaminta: ma kaliya hal credential ayaa la xaday, mise waxaa jira lateral movement (assumed roles, created users)? Ma jira data exfiltration (S3 GetObject calls badan)?"
          },
          {
            h: "Eradication & Recovery",
            p:
            "Ka saar dhammaan persistence mechanisms (users/roles cusub attacker-ku abuuray), hubi/hagaaji IAM policies affected, oo dib u soo celi normal operations kaliya kadib la xaqiijiyo in attacker-ku uusan haysan access sii socda."
          }
        ],

        terms: [
          { term: "Scope Assessment", def: "Go'aaminta baaxadda saameynta credential compromise-ka." }
        ],

        quiz: [
          {
            q: "Immediate containment-ka, tallaabada koowaad waa?",
            options: [
              "Rotate/baabi'i credential-ka la xaday",
              "Review IAM policies oo keliya",
              "Isla markiiba warbixin",
              "Sug xaqiijin dheeraad ah"
            ],
            answer: 0,
            explain: "Joojinta access-ka attacker-ka waa mudnaanta ugu sarreysa."
          },
          {
            q: "Scope assessment-ku wuxuu go'aamiyaa?",
            options: [
              "Lateral movement iyo data exfiltration suurtagalka ah",
              "Kaliya cost-ka incident-ka",
              "Ma jiro faa'iido",
              "Kaliya magaca attacker-ka"
            ],
            answer: 0,
            explain: "Fahamka baaxadda saameynta waa muhiim eradication-ka sax ah."
          },
          {
            q: "Eradication-ka waa in uu ku jiro?",
            options: [
              "Ka saarista persistence mechanisms attacker-ku abuuray",
              "Kaliya beddelidda password hal user ah",
              "Ma jiro tallaabo dheeraad ah",
              "Kaliya loo baahan yahay warbixin"
            ],
            answer: 0,
            explain: "Persistence-ku waa in la nadiifiyo si dhammaystiran ka hor la xaqiijiyo eradication."
          },
          {
            q: "Recovery-ku waa in uu dhaco marka?",
            options: [
              "La xaqiijiyo attacker-ku uusan haysan access sii socda",
              "Isla markiiba containment kadib",
              "Ma jiro shuruud",
              "Kaliya 24 saac ka dib"
            ],
            answer: 0,
            explain: "Recovery early ah wuxuu khatar gelin karaa haddii access uusan si buuxda loo joojin."
          }
        ],

        exercise: {
          title: "Credential Compromise Playbook",
          steps: [
            "Naqshadee triage steps GuardDuty finding kadib.",
            "Qor immediate containment checklist (4 tallaabo).",
            "Sharax habka scope assessment loo sameeyo (CloudTrail analysis).",
            "Naqshadee eradication/recovery checklist buuxa."
          ],
          deliverable: "Credential compromise response playbook."
        }
      },


      {
        slug: "multi-account-multi-cloud-ir",
        title: "Multi-Account/Multi-Cloud IR",
        english: "Multi-Account and Multi-Cloud IR",
        minutes: 10,

        summary:
          "Faham caqabadaha IR ee shirkadaha leh accounts/clouds badan.",

        sections: [
          {
            h: "Cross-Account Lateral Movement",
            p:
            "Attacker oo helay access account hal ah wuxuu isku dayi karaa inuu ugu gudbo accounts kale (AssumeRole abuse, ama shared credentials). IR-ku waa in uu falanqeeyo dhammaan accounts-ka la xiriira, ma aha hal account oo keliya."
          },
          {
            h: "Centralized IR Tooling",
            p:
            "AWS Organizations, Azure Management Groups waxay u oggolaadaan centralized visibility/response accounts/subscriptions badan — IR team-ku wuxuu u baahan yahay access (roles) accounts-ka oo dhan si uu si dhaqso ah u falanqeeyo."
          },
          {
            h: "Multi-Cloud IR Coordination",
            p:
            "Shirkadaha AWS + Azure isku mar isticmaala waxay u baahan yihiin IR playbooks labada provider daboolaya, iyo team members leh xirfado labada platform — tooling/terminology kala duwan wuxuu adkeeyaa coordination-ka."
          },
          {
            h: "Communication During Multi-Account Incidents",
            p:
            "Incidents-ka baaxadda leh (accounts/clouds badan) waxay u baahan yihiin communication cad oo la isku daro stakeholders kala duwan (security, IT, business units kala duwan oo accounts kala duwan leh) — war-bixin joogto ah waa muhiim."
          }
        ],

        terms: [
          { term: "Cross-Account Lateral Movement", def: "Attacker uga gudbaya account hal ah account kale." },
          { term: "Multi-Cloud IR Coordination", def: "Isku daridda response providers cloud kala duwan." }
        ],

        quiz: [
          {
            q: "Cross-account lateral movement suurtagal ma noqon karaan sababtoo ah?",
            options: [
              "AssumeRole abuse ama shared credentials",
              "Accounts-ku waligood waa go'doonsan gebi ahaanba",
              "Ma jiro sabab",
              "Kaliya haddii hal account la isticmaalo"
            ],
            answer: 0,
            explain: "Trust relationships u dhexeeya accounts waxay u oggolaadaan lateral movement haddii aan la xakamayn."
          },
          {
            q: "AWS Organizations/Azure Management Groups waxay u oggolaadaan?",
            options: [
              "Centralized visibility/response accounts badan",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo billing",
              "Kaliya hal account access"
            ],
            answer: 0,
            explain: "IR team-ku wuxuu u baahan yahay access dhammaan accounts-ka la xiriira."
          },
          {
            q: "Multi-cloud IR-ka caqabadiisa waa?",
            options: [
              "Tooling/terminology kala duwan providers-ka u dhexeeya",
              "Ma jiro caqabado",
              "Kaliya cost-ka",
              "Kaliya loo baahan yahay hal team"
            ],
            answer: 0,
            explain: "Providers kala duwan waxay adkeeyaan coordination iyo consistency response-ka."
          },
          {
            q: "Incidents baaxadda leh waxay u baahan yihiin?",
            options: [
              "Communication cad oo la isku daro stakeholders kala duwan",
              "Ma loo baahna communication gaar ah",
              "Kaliya security team-ka",
              "Kaliya hal report kadib incident-ka"
            ],
            answer: 0,
            explain: "Coordination-ku wuxuu u baahan yahay isgaarsiin joogto ah dhammaan dhinacyada."
          }
        ],

        exercise: {
          title: "Multi-Account IR Planning",
          steps: [
            "Sharax sida cross-account lateral movement u dhici karto.",
            "Naqshadee centralized IR access strategy (roles accounts oo dhan).",
            "Sharax caqabadaha multi-cloud IR coordination.",
            "Naqshadee communication plan incident baaxad leh."
          ],
          deliverable: "Multi-account/multi-cloud IR coordination plan."
        }
      },


      {
        slug: "post-incident-activities-cloud",
        title: "Post-Incident Activities",
        english: "Post-Incident Activities",
        minutes: 13,

        summary:
          "Faham tallaabooyinka kadib incident-ka — lessons learned, remediation, iyo hardening.",

        sections: [
          {
            h: "Lessons Learned Meeting",
            p:
            "Kadib incident-ka la xaliyo, waa in la sameeyo 'lessons learned' meeting oo blameless ah — ujeeddadu waa in la hagaajiyo processes, ma aha in la eedeeyo shakhsi gaar ah. Su'aalo: maxaa u shaqeeyay? Maxaa aan u shaqeynin? Maxaa la hagaajin karaa?"
          },
          {
            h: "Root Cause Analysis",
            p:
            "Root cause analysis wuxuu tagaa hore ka baxsan 'immediate cause' (tusaale credential theft) ilaa 'root cause' (tusaale: aan MFA loo baahnayn dhammaan accounts, ama aan security awareness training la bixin)."
          },
          {
            h: "Systemic Remediation",
            p:
            "Fixes-ku waa in ay ka baxsan yihiin hal incident (tusaale kaliya rotate credential hal user ah) — waa in la fiiriyo systemic issues (tusaale: dhammaan users aan MFA lahayn, policies-ka guud ee la hagaajin karo)."
          },
          {
            h: "Updating IR Playbooks",
            p:
            "Waxa laga bartay incident-ka waa in lagu daro IR playbooks-ka mustaqbalka — haddii detection gap la helay, ama containment step aan cad ahayn, playbook-ku waa in la cusboonaysiiyo si loo hagaajiyo response-ka xigga."
          }
        ],

        terms: [
          { term: "Lessons Learned Meeting", def: "Kulan blameless ah oo diiradda saarta hagaajinta processes." },
          { term: "Root Cause Analysis", def: "Falanqaynta sababta asalka ah, ka baxsan immediate cause." }
        ],

        quiz: [
          {
            q: "Lessons learned meeting-ku waa in uu ahaado?",
            options: [
              "Blameless, diiradda saarta hagaajinta processes",
              "Eedeynta shakhsi gaar ah",
              "Ma loo baahna meeting",
              "Kaliya loo isticmaalo documentation"
            ],
            answer: 0,
            explain: "Blame culture-ku wuxuu ka hortagaa in la sheego khaladaadka run ahaantiisa."
          },
          {
            q: "Root cause analysis wuxuu tagaa?",
            options: [
              "Hore ka baxsan immediate cause ilaa sababta asalka ah",
              "Kaliya immediate cause",
              "Ma jiro faa'iido",
              "Kaliya technical details"
            ],
            answer: 0,
            explain: "Fahamka root cause-ku wuxuu ka hortagaa dib u dhac mustaqbalka."
          },
          {
            q: "Systemic remediation-ku wuxuu daboolaa?",
            options: [
              "Issues ka baxsan hal incident (tusaale dhammaan users aan MFA lahayn)",
              "Kaliya hal user oo credential la xaday",
              "Ma jiro faa'iido ballaaran",
              "Kaliya technical fix hal ah"
            ],
            answer: 0,
            explain: "Fix-ku waa in uu daboolo ballaaran, ma aha kaliya symptom-ka gaarka ah."
          },
          {
            q: "IR playbooks waa in la cusboonaysiiyo sababtoo ah?",
            options: [
              "Waxa laga bartay incident-ka waa in lagu daro response-ka xigga",
              "Ma jiro sabab",
              "Kaliya loo baahan yahay compliance",
              "Hal mar sanadkii oo keliya"
            ],
            answer: 0,
            explain: "Playbooks-ku waa in ay noqdaan documents nool oo si joogto ah loo hagaajiyo."
          }
        ],

        exercise: {
          title: "Post-Incident Review Practice",
          steps: [
            "Naqshadee agenda lessons learned meeting ah (blameless).",
            "Xulo incident tusaale ah, samee root cause analysis (immediate vs root).",
            "Sharax farqiga systemic remediation iyo symptom-level fix.",
            "Naqshadee playbook update process kadib incident kasta."
          ],
          deliverable: "Post-incident review process document."
        }
      },


      {
        slug: "ir-capstone",
        title: "Incident Response — Full Capstone",
        english: "Incident Response Capstone",
        minutes: 15,

        summary:
          "Ku dar dhammaan waxa aad baratay module-kan — samee full cloud incident response oo dhamaystiran.",

        sections: [
          {
            h: "Scenario",
            p:
            "GuardDuty wuxuu bixiyay finding 'UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration' — credential IAM ah oo laga yaabo in la xaday oo la isticmaalayo dal kale."
          },
          {
            h: "Detection & Triage",
            p:
            "Naqshadee triage approach (xaqiijinta finding-ka, aqoonsiga credential-ka saameysan)."
          },
          {
            h: "Containment & Forensics",
            p:
            "Naqshadee immediate containment (credential revocation) iyo forensic evidence preservation (snapshot ka hor cleanup)."
          },
          {
            h: "Recovery & Post-Incident",
            p:
            "Naqshadee scope assessment, eradication, recovery, iyo lessons learned plan."
          }
        ],

        terms: [
          { term: "Full Cloud IR", def: "Habraaca isugu jira detection, containment, forensics, recovery, post-incident." }
        ],

        quiz: [
          {
            q: "Finding-kan (Instance Credential Exfiltration), tallaabada koowaad waa?",
            options: [
              "Xaqiijinta finding-ka iyo aqoonsiga credential-ka saameysan",
              "Isla markiiba tirtir instance-ka",
              "Sug 24 saac",
              "Ma jiro tallaabo la qaadan karo"
            ],
            answer: 0,
            explain: "Triage-ku waa waajib ka hor containment aggressive ah."
          },
          {
            q: "Containment-ka scenario-gan waa in uu ku jiro?",
            options: [
              "Credential revocation isla markiiba",
              "Kaliya monitoring dheeraad ah",
              "Ma jiro tallaabo",
              "Kaliya email alert"
            ],
            answer: 0,
            explain: "Credential-ka la xaday waa in la baabi'iyo isla markiiba si loo joojiyo access-ka."
          },
          {
            q: "Forensic snapshot-ka waa in la qaado marka?",
            options: [
              "Ka hor cleanup/termination-ka resource-ka",
              "Kadib cleanup-ka",
              "Ma loo baahna snapshot",
              "Kaliya haddii legal loo baahdo"
            ],
            answer: 0,
            explain: "Evidence-ka waa in la ilaaliyaa ka hor wax kasta oo isbeddel ah."
          }
        ],

        exercise: {
          title: "Full Cloud Incident Response Exercise",
          steps: [
            "Naqshadee detection/triage steps GuardDuty finding-kan.",
            "Naqshadee immediate containment (credential revocation + isolation).",
            "Naqshadee forensic evidence preservation (snapshot) ka hor cleanup.",
            "Diyaari full IR report oo scope, root cause, iyo lessons learned leh (portfolio-ready)."
          ],
          deliverable: "Full cloud incident response report (portfolio-ready)."
        }
      },

    ],
  }),
  m({
    id: "cs10",
    slug: "cloud-security-capstone-career",
    stage: "Sare",
    title: "Cloud Security Capstone & Career Readiness",
    english: "Cloud Security Capstone & Career Readiness",
    hours: 2,

    outcome:
      "Waxaad dhammaystiri doontaa career readiness (certs, portfolio, interview prep) iyo full end-to-end cloud security capstone.",

    topics: [
      "AZ-500 & AWS Security Specialty Overview",
      "Building Your Cloud Security Portfolio",
      "Cloud Security Career Paths",
      "Resume & LinkedIn for Cloud Security",
      "Interview Prep: Technical Questions",
      "Interview Prep: Scenario Questions",
      "Final Capstone: Full Cloud Security Review",
    ],

    lessonList: [

      {
        slug: "az500-aws-security-specialty-overview",
        title: "AZ-500 & AWS Security Specialty Overview",
        english: "AZ-500 and AWS Security Specialty Overview",
        minutes: 10,

        summary:
          "Faham qaab-dhismeedka labada certification ee ugu caansan cloud security, iyo sida koorsadan ula xiriirto.",

        sections: [
          {
            h: "AZ-500: Microsoft Azure Security Technologies",
            p:
            "AZ-500 wuxuu daboolaa: identity/access management (Modules 2), platform protection (Module 3, 5), security operations (Module 7), iyo data/applications protection (Module 4) — Azure-specific ahaan."
          },
          {
            h: "AWS Certified Security – Specialty",
            p:
            "AWS Security Specialty wuxuu daboolaa domains: Incident Response (Module 9), Logging/Monitoring (Module 7), Infrastructure Security (Module 3, 5), Identity/Access Management (Module 2), Data Protection (Module 4)."
          },
          {
            h: "Overlap Between Certifications",
            p:
            "In kastoo AZ-500 uu Azure-specific yahay iyo AWS Security Specialty uu AWS-specific yahay, mabaadi'da guud (IAM, network security, monitoring, incident response) way isku mid yihiin — koorsadan wuxuu ku dhisay mabaadi'daas provider-agnostic ahaan."
          },
          {
            h: "Choosing Your Certification Path",
            p:
            "Haddii shirkaddaada ay isticmaasho Azure, AZ-500 ayaa ku habboon. Haddii AWS, AWS Security Specialty. Haddii aadan hadda haysan shirkad, tixgeli suuqa shaqada goobtaada (AWS badanaa waa mid caan ah globally)."
          }
        ],

        terms: [
          { term: "AZ-500", def: "Microsoft Azure Security Technologies certification." },
          { term: "AWS Security Specialty", def: "AWS certification heer sare ah oo security-focused ah." }
        ],

        quiz: [
          {
            q: "AZ-500 waa certification?",
            options: [
              "Microsoft Azure security-specific",
              "AWS-specific",
              "Provider-agnostic",
              "GCP-specific"
            ],
            answer: 0,
            explain: "AZ-500 wuxuu diiradda saaraa Azure security technologies."
          },
          {
            q: "AWS Security Specialty domains waxaa ka mid ah?",
            options: [
              "Incident Response, Logging/Monitoring, IAM, Data Protection",
              "Kaliya IAM",
              "Kaliya networking",
              "Ma jiro domains la qeexay"
            ],
            answer: 0,
            explain: "Certification-ku wuxuu ballaadhan yahay dhinacyo badan oo security ah."
          },
          {
            q: "Mabaadi'da guud (IAM, monitoring, IR) waxay?",
            options: [
              "Isku mid yihiin providers oo dhan, xitaa haddii terminology-du kala duwan tahay",
              "Waligeed kala duwan yihiin",
              "Ma jiro overlap",
              "Kaliya khuseeya hal provider"
            ],
            answer: 0,
            explain: "Koorsadan wuxuu ku dhisay mabaadi' provider-agnostic ah."
          },
          {
            q: "Doorashada certification-ka waxay ku xiran tahay?",
            options: [
              "Provider-ka shirkaddaada ama suuqa shaqada goobtaada",
              "Kaliya rabitaanka gaarka ah",
              "Ma jiro factors",
              "Kaliya price-ka certification-ka"
            ],
            answer: 0,
            explain: "Context-ka shaqsiga ah wuxuu hagaa doorashada saxda ah."
          }
        ],

        exercise: {
          title: "Certification Path Mapping",
          steps: [
            "Naqshadee jaantus AZ-500 domains vs koorsadan modules.",
            "Naqshadee jaantus AWS Security Specialty domains vs koorsadan modules.",
            "Xulo certification path (AZ-500 ama AWS), sharax sababta.",
            "Naqshadee study plan 8-12 toddobaad ah certification-ka la doortay."
          ],
          deliverable: "Certification path plan."
        }
      },


      {
        slug: "building-cloud-security-portfolio",
        title: "Building Your Cloud Security Portfolio",
        english: "Building Your Cloud Security Portfolio",
        minutes: 12,

        summary:
          "Baro sida loo dhiso portfolio xirfadeed oo cloud security ah oo employers ay arki karaan.",

        sections: [
          {
            h: "Sababta Portfolio Muhiim u Yahay Cloud Security",
            p:
            "Cloud security roles waxay u baahan yihiin hands-on demonstration — portfolio-gu wuxuu muujiyaa awoodda dhabta ah iyada oo aan la baahnayn production access shirkad dhab ah."
          },
          {
            h: "Free-Tier Practice Labs",
            p:
            "AWS Free Tier, Azure Free Account waxay bixiyaan resources bilaash ah (xaddidan) oo lagu tijaabin karo IAM policies, VPC configuration, iyo security tools iyada oo aan lacag la bixin."
          },
          {
            h: "Waxa Portfolio-gu Ku Jiro",
            p:
            "3-5 architecture diagrams (VPC design, IAM structure), 1-2 policy as code samples (Terraform/CloudFormation security rules), labs-kaaga ugu fiican, iyo hal full capstone report (portfolio centerpiece)."
          },
          {
            h: "Documenting Cloud Projects",
            p:
            "GitHub repo wuxuu u baahan yahay: README cad, architecture diagrams (draw.io ama Lucidchart), iyo code samples (IaC) — waligaa ha isticmaalin real API keys ama account IDs dhab ah GitHub gudaheeda."
          }
        ],

        terms: [
          { term: "Free-Tier Practice", def: "Isticmaalka resources bilaash ah (xaddidan) cloud providers bixiyaan." }
        ],

        quiz: [
          {
            q: "AWS Free Tier/Azure Free Account waxay u ogolaadaan?",
            options: [
              "Tijaabinta hands-on iyada oo aan lacag la bixin",
              "Access buuxa production ah",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo billing testing"
            ],
            answer: 0,
            explain: "Free tiers-ku waa xal wanaagsan oo lagu barto iyada oo aan risk lahayn."
          },
          {
            q: "Portfolio-gu waa in uu ku jiro?",
            options: [
              "Architecture diagrams, policy as code samples, labs, capstone report",
              "Kaliya certificates",
              "Kaliya resume",
              "Ma jiro shuruud"
            ],
            answer: 0,
            explain: "Faahfaahin practical ah ayaa muujinaya xirfado dhab ah."
          },
          {
            q: "GitHub repo-ga waa in aan marnaba ku jirin?",
            options: [
              "Real API keys ama account IDs dhab ah",
              "README",
              "Architecture diagrams",
              "Code samples"
            ],
            answer: 0,
            explain: "Credentials dhab ah waa khatar security ah, xitaa portfolio ahaan."
          },
          {
            q: "Sababta portfolio-gu muhiim u yahay waa?",
            options: [
              "Muujinta awoodda hands-on iyada oo aan production access la haysan",
              "Waa shuruud rasmi ah oo keliya",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo social media"
            ],
            answer: 0,
            explain: "Employers-yadu waxay rabaan inay arkaan xirfado dhab ah."
          }
        ],

        exercise: {
          title: "Cloud Security Portfolio Planning",
          steps: [
            "Dib u eeg labs-ka module-yada hore, xulo 3 ugu fiican.",
            "Naqshadee architecture diagram VPC design ah.",
            "Qor README template GitHub repo ah.",
            "Naqshadee liis waxa portfolio-gaaga ku jiri doona."
          ],
          deliverable: "Cloud security portfolio plan."
        }
      },


      {
        slug: "cloud-security-career-paths",
        title: "Cloud Security Career Paths",
        english: "Cloud Security Career Paths",
        minutes: 13,

        summary:
          "Faham career paths-ka cloud security iyo sida ay ula xiriiraan takhasuska kale.",

        sections: [
          {
            h: "Cloud Security Analyst/Engineer",
            p:
            "Entry-to-mid level role — diiradda saara configuration security, monitoring, iyo compliance. Wuxuu badanaa u baahan yahay hands-on experience labada dhinac IAM iyo network security."
          },
          {
            h: "Cloud Security Architect",
            p:
            "Heer sare — naqshadeynta security architecture cloud environments waaweyn, decision-making strategic ah (multi-cloud strategy, zero trust implementation). Wuxuu u baahan yahay experience dheer iyo business acumen."
          },
          {
            h: "DevSecOps Engineer",
            p:
            "Wuxuu isku daraa development, security, iyo operations — diiradda saara CI/CD security, policy as code, iyo security automation. Wuxuu u baahan yahay coding skills marka la barbardhigo cloud security roles caadiga ah."
          },
          {
            h: "Cross-Path Synergies",
            p:
            "Cloud security wuxuu isku dhex jiraa SOC Analyst (cloud incident detection), Ethical Hacking (cloud pentesting), iyo Digital Forensics (cloud forensics) — xirfadaha koorsooyinkan oo dhan waxay isku dhisaan skillset dhamaystiran."
          }
        ],

        terms: [
          { term: "DevSecOps", def: "Isku darka development, security, iyo operations." }
        ],

        quiz: [
          {
            q: "Cloud Security Architect wuxuu u baahan yahay?",
            options: [
              "Experience dheer iyo business acumen (strategic decision-making)",
              "Kaliya entry-level skills",
              "Ma jiro shuruud gaar ah",
              "Kaliya coding skills"
            ],
            answer: 0,
            explain: "Architect role-ku waa heer sare, u baahan aqoon ballaaran."
          },
          {
            q: "DevSecOps Engineer wuxuu diiradda saaraa?",
            options: [
              "CI/CD security, policy as code, security automation",
              "Kaliya network security",
              "Kaliya compliance",
              "Ma jiro focus gaar ah"
            ],
            answer: 0,
            explain: "DevSecOps wuxuu isku daraa development iyo security."
          },
          {
            q: "Cloud security wuxuu isku dhex jiraa?",
            options: [
              "SOC, Ethical Hacking, Digital Forensics (cross-path synergies)",
              "Kaliya keligiis, ma jiro xiriir",
              "Ma jiro synergy",
              "Kaliya loo isticmaalo takhasus hal ah"
            ],
            answer: 0,
            explain: "Xirfadaha kala duwan waxay isku dhisaan security professional dhamaystiran."
          },
          {
            q: "Cloud Security Analyst/Engineer waa role?",
            options: [
              "Entry-to-mid level, diiradda saara configuration/monitoring",
              "Kaliya heer sare",
              "Kaliya management",
              "Ma jiro heer la qeexay"
            ],
            answer: 0,
            explain: "Waa qaab wanaagsan oo lagu bilaabo cloud security career."
          }
        ],

        exercise: {
          title: "Career Path Exploration",
          steps: [
            "Sharax saddexda role (Analyst, Architect, DevSecOps).",
            "Xulo hal role, sharax sababta doorashada.",
            "Sharax sida cloud security ula xiriirto SOC/Ethical Hacking/Forensics.",
            "Naqshadee career roadmap 18-bilood ah role-ka aad doorattay."
          ],
          deliverable: "Cloud security career exploration document."
        }
      },


      {
        slug: "resume-linkedin-cloud-security",
        title: "Resume & LinkedIn for Cloud Security",
        english: "Resume and LinkedIn for Cloud Security",
        minutes: 15,

        summary:
          "Baro sida resume/LinkedIn loo qoro oo cloud security recruiters ay u soo jeedaan.",

        sections: [
          {
            h: "Resume Keywords for Cloud Security",
            p:
            "Ku dar keywords sida 'IAM', 'VPC/VNet', 'CloudTrail', 'GuardDuty', 'CSPM', 'Terraform/CloudFormation', 'CIS Benchmarks' — ATS systems iyo recruiters waxay raadiyaan terminology-kan cloud-specific ah."
          },
          {
            h: "Showcasing Portfolio Projects",
            p:
            "Resume-gaaga, ku dar link GitHub portfolio-ga oo leh 2-3 tallaabo kooban oo sharaxaya projects-ka (tusaale: 'Designed VPC architecture with three-tier segmentation and least-privilege IAM policies')."
          },
          {
            h: "LinkedIn Profile for Cloud Security",
            p:
            "Headline cad ('Aspiring Cloud Security Engineer | AWS/Azure | IAM & Network Security'). Summary sharaxaya waddadaada. Ku dar certifications (xitaa haddii ay ku jiraan 'in progress')."
          },
          {
            h: "Following Cloud Security Community",
            p:
            "La xiriir cloud security professionals, follow cloud provider blogs (AWS Security Blog, Microsoft Security Blog), oo ku biir communities (Reddit r/AWS, Cloud Security Alliance) si aad u sii wado barashada."
          }
        ],

        terms: [
          { term: "Resume Keywords", def: "Erayo gaarka ah oo ATS systems iyo recruiters raadiyaan." }
        ],

        quiz: [
          {
            q: "Resume keywords cloud security ah waxaa ka mid ah?",
            options: [
              "IAM, VPC, CloudTrail, CSPM, Terraform",
              "Kaliya 'cybersecurity'",
              "Kaliya 'computer skills'",
              "Ma jiro keywords gaar ah"
            ],
            answer: 0,
            explain: "Terminology cloud-specific ah waxay muujisaa aqoon dhab ah."
          },
          {
            q: "Portfolio projects resume-ga lagu sharaxo waa in ay ahaadaan?",
            options: [
              "Kooban oo specific ah (tusaale VPC architecture design)",
              "Aad u dheer",
              "Guud oo aan faahfaahin lahayn",
              "Ma loo baahna sharaxaad"
            ],
            answer: 0,
            explain: "Specificity-du waxay muujisaa xirfado dhab ah."
          },
          {
            q: "Certifications 'in progress' waa in?",
            options: [
              "Lagu daro LinkedIn/resume xitaa haddii aan la dhammaystirin",
              "La iska daayo ilaa la dhammaystiro",
              "Ma jiro faa'iido lagu daro",
              "Kaliya loo isticmaalo interviews"
            ],
            answer: 0,
            explain: "Wuxuu muujiyaa xamaasad iyo progress joogto ah."
          },
          {
            q: "Cloud security community-ga ku biirista waxay u adeegtaa?",
            options: [
              "Sii wadidda barashada iyo networking",
              "Ma jiro faa'iido",
              "Kaliya social media",
              "Kaliya entertainment"
            ],
            answer: 0,
            explain: "Industry-gu wuu isbeddelayaa si degdeg ah — community-gu wuxuu kaa caawiyaa la socodka."
          }
        ],

        exercise: {
          title: "Cloud Security Resume & LinkedIn Build",
          steps: [
            "Qor 8 keywords cloud security ah oo aad ku darsan lahayd resume-gaaga.",
            "Qor 2-3 bullet points portfolio project ah oo specific ah.",
            "Naqshadee LinkedIn headline iyo summary.",
            "Liis garee 3 resources/communities aad raac lahayd."
          ],
          deliverable: "Cloud security resume and LinkedIn draft."
        }
      },


      {
        slug: "interview-prep-technical-cloud",
        title: "Interview Prep: Technical Questions",
        english: "Interview Preparation: Technical Questions",
        minutes: 11,

        summary:
          "Diyaari nafaqaysiga su'aalaha technical ee ugu badan interview-yada cloud security ah.",

        sections: [
          {
            h: "IAM & Identity Questions",
            p:
            "'Sharax shared responsibility model', 'Farqiga IAM role iyo user', 'Sida MFA loo hirgeliyo waajib ahaan' — diyaari jawaabo gaaban oo cad ah su'aalahan oo kale ah."
          },
          {
            h: "Network & Storage Questions",
            p:
            "'Sharax farqiga security groups iyo NACLs', 'Sida S3 bucket loo ilaaliyo public exposure', 'Sharax encryption at rest vs in transit'."
          },
          {
            h: "Scenario-Based Questions",
            p:
            "'Waxaad heshay S3 bucket public ah oo xog xasaasi ah leh, maxaad marka hore samayn lahayd?' — jawaabta waa in ay muujiso process-kaaga triage (containment → assessment → remediation)."
          },
          {
            h: "Hands-On/Whiteboard Questions",
            p:
            "Interviewers-ku mararka qaarkood waxay ku weydiin karaan inaad naqsheeyso VPC architecture ama IAM policy live-ka ahaan (whiteboard ama shared screen) — practice-ka fikirka joogtada ah waa muhiim."
          }
        ],

        terms: [
          { term: "Whiteboard Interview", def: "Su'aal la weydiiyo oo lagu naqshadeeyo architecture live ahaan." }
        ],

        quiz: [
          {
            q: "Scenario-based questions waxay tijaabiyaan?",
            options: [
              "Process-kaaga triage (containment → assessment → remediation)",
              "Kaliya typing speed",
              "Kaliya aqoon academic ah",
              "Ma jiro ujeeddo"
            ],
            answer: 0,
            explain: "Interviewers-yadu waxay rabaan inay arkaan habka aad u fikirto."
          },
          {
            q: "Whiteboard interview su'aalku wuxuu tijaabiyaa?",
            options: [
              "Awoodda aad u naqshadeyso architecture live ahaan",
              "Kaliya memorization",
              "Kaliya typing speed",
              "Ma jiro ujeeddo"
            ],
            answer: 0,
            explain: "Practical demonstration-ku wuxuu muujiyaa fahamka dhabta ah."
          },
          {
            q: "IAM questions waxay daboolaan?",
            options: [
              "Shared responsibility, roles vs users, MFA",
              "Kaliya passwords",
              "Kaliya encryption",
              "Ma jiro topic gaar ah"
            ],
            answer: 0,
            explain: "IAM waa control-ka aasaasiga ah, badanaa la weydiiyo interviews."
          },
          {
            q: "Diyaarinta hands-on questions waxay u baahan tahay?",
            options: [
              "Practice fikirka joogtada ah, ma aha kaliya memorization",
              "Kaliya cram-ka xogta",
              "Ma loo baahna diyaarin",
              "Kaliya theory akhriska"
            ],
            answer: 0,
            explain: "Live problem-solving-ku wuxuu u baahan yahay practice hands-on ah."
          }
        ],

        exercise: {
          title: "Technical Interview Practice",
          steps: [
            "Qor jawaabo 5 su'aalood technical ah oo kor lagu sharaxay-la mid ah.",
            "Isticmaal STAR method su'aal scenario ah (S3 bucket exposed).",
            "Practice naqshadaynta VPC architecture whiteboard-style ahaan.",
            "La wadaag jawaabahaaga qof kale oo feedback ka hel."
          ],
          deliverable: "Cloud security technical interview practice sheet."
        }
      },


      {
        slug: "interview-prep-scenario-cloud",
        title: "Interview Prep: Scenario Questions",
        english: "Interview Preparation: Scenario Questions",
        minutes: 14,

        summary:
          "Diyaari su'aalaha scenario-based iyo behavioral ee interview-yada cloud security-gu badanaa weydiiyaan.",

        sections: [
          {
            h: "Incident Response Scenarios",
            p:
            "'Waxaad heshay GuardDuty finding oo muujinaya credential compromise, maxaad samaynaysaa?' — jawaabtu waa in ay muujiso IR lifecycle knowledge (containment, scope assessment, eradication)."
          },
          {
            h: "Compliance & Governance Scenarios",
            p:
            "'Shirkaddu waxay u baahan tahay SOC 2 certification, maxaad ka bilaabi lahayd?' — jawaabtu waa in ay muujiso fahamka CSPM, policy as code, iyo continuous compliance monitoring."
          },
          {
            h: "Behavioral Questions",
            p:
            "'Sheeg waqti aad khilaaf la yeelatay developer team ku saabsan security requirement' — cloud security-gu badanaa waxay u baahan tahay balance u dhexeeya security iyo velocity development, jawaabtu waa in ay muujiso diplomacy."
          },
          {
            h: "Culture Fit & Motivation Questions",
            p:
            "'Sababta aad u doorbidayso cloud security?' — fursad aad ku muujiso xamaasadaada iyo waddadaada barashada, isla markaana ku xirid xirfadaha koorsooyinka kale (SOC/EH/Forensics) aad baratay."
          }
        ],

        terms: [
          { term: "Behavioral Interview", def: "Su'aal tijaabisa habka aad u maamusho xaaladaha kala duwan." }
        ],

        quiz: [
          {
            q: "IR scenario question-ku wuxuu tijaabiyaa?",
            options: [
              "IR lifecycle knowledge (containment, assessment, eradication)",
              "Kaliya typing speed",
              "Kaliya certifications",
              "Ma jiro ujeeddo"
            ],
            answer: 0,
            explain: "Fahamka process-ka dhamaystiran waa muhiim, ma aha kaliya facts."
          },
          {
            q: "Compliance scenario question-ku wuxuu weydiiyaa?",
            options: [
              "Fahamka CSPM, policy as code, continuous monitoring",
              "Kaliya magaca frameworks",
              "Kaliya price-ka certifications",
              "Ma jiro ujeeddo"
            ],
            answer: 0,
            explain: "Practical approach-ku waa muhiim, ma aha kaliya knowledge theoretical ah."
          },
          {
            q: "Behavioral question (khilaaf developer team) waxay tijaabisaa?",
            options: [
              "Balance-ka security iyo velocity, diplomacy",
              "Kaliya technical skills",
              "Ma jiro ujeeddo",
              "Kaliya coding ability"
            ],
            answer: 0,
            explain: "Soft skills-ku waa muhiim xitaa technical roles ahaan."
          },
          {
            q: "Motivation questions waa fursad?",
            options: [
              "Lagu muujiyo xamaasad iyo waddo barasho",
              "Kaliya loo isticmaalo filler",
              "Ma jiro faa'iido",
              "Kaliya loo isticmaalo small talk"
            ],
            answer: 0,
            explain: "Culture fit-ku waa qayb muhiim ah oo interviews ah."
          }
        ],

        exercise: {
          title: "Scenario & Behavioral Interview Practice",
          steps: [
            "Diyaari jawaab IR scenario ah (GuardDuty finding).",
            "Diyaari jawaab compliance scenario ah (SOC 2 kickoff).",
            "Diyaari jawaab behavioral ah (developer conflict) STAR method ahaan.",
            "Diyaari jawaab 'sababta cloud security' oo shakhsi ah."
          ],
          deliverable: "Scenario and behavioral interview practice sheet."
        }
      },


      {
        slug: "final-capstone-cloud-security-review",
        title: "Final Capstone: Full Cloud Security Review",
        english: "Final Capstone: Full Cloud Security Review",
        minutes: 15,

        summary:
          "Isku dar dhammaan xirfadaha koorsadan oo dhan — samee full cloud security assessment shirkad tusaale ah.",

        sections: [
          {
            h: "Scenario Overview",
            p:
            "Shirkad fintech ah (AWS + Azure hybrid) ayaa kula soo xiriirtay si aad u samayso full cloud security assessment — daboolaya IAM, network, storage, compute, monitoring, iyo compliance."
          },
          {
            h: "IAM & Network Assessment",
            p:
            "Isticmaal xirfadaha modules 2-3 si aad u falanqeyso IAM policies (least privilege, MFA) iyo network architecture (segmentation, security groups)."
          },
          {
            h: "Data, Compute & Threat Assessment",
            p:
            "Isticmaal xirfadaha modules 4-6 si aad u falanqeyso storage security, compute hardening, iyo threat exposure (misconfigurations, attack vectors)."
          },
          {
            h: "Monitoring, Compliance & Response Readiness",
            p:
            "Isticmaal xirfadaha modules 7-9 si aad u falanqeyso monitoring/detection capability, compliance posture (SOC 2/GDPR haddii khuseeyo), iyo IR readiness."
          }
        ],

        terms: [
          { term: "Full Cloud Security Assessment", def: "Baaritaan isugu jira dhammaan xirfadaha cloud security laga bilaabo IAM ilaa IR readiness." }
        ],

        quiz: [
          {
            q: "Full assessment-kan wuxuu isku darayaa?",
            options: [
              "Dhammaan xirfadaha module-yada hore (IAM, network, storage, compute, monitoring, compliance, IR)",
              "Kaliya IAM",
              "Kaliya network security",
              "Kaliya reporting"
            ],
            answer: 0,
            explain: "Capstone-ku wuxuu isku daraa dhammaan waxa aad baratay 10-ka module."
          },
          {
            q: "Hybrid AWS + Azure environment-ku wuxuu u baahan yahay?",
            options: [
              "Fahamka labada provider terminology iyo tools",
              "Kaliya AWS knowledge",
              "Kaliya Azure knowledge",
              "Ma jiro shuruud gaar ah"
            ],
            answer: 0,
            explain: "Multi-cloud environments-ku waxay u baahan yihiin skillset ballaaran."
          },
          {
            q: "Sababta capstone-kani muhiim u yahay portfolio-gaaga waa?",
            options: [
              "Wuxuu muujiyaa awoodaada dhammaystirka cloud security assessment oo dhan",
              "Wuxuu kaliya muujiyaa aqoon academic ah",
              "Ma jiro faa'iido",
              "Wuxuu kaliya muujiyaa typing speed"
            ],
            answer: 0,
            explain: "Employers-yadu waxay rabaan inay arkaan awoodda dhammaystirka assessment oo dhan."
          }
        ],

        exercise: {
          title: "Full End-to-End Cloud Security Assessment",
          steps: [
            "Falanqee IAM policies iyo network architecture scenario-ga (least privilege, segmentation).",
            "Falanqee storage/compute security (encryption, hardening).",
            "Aqoonso threat exposure iyo misconfigurations suurtagalka ah.",
            "Qiimee monitoring/compliance/IR readiness.",
            "Diyaari full cloud security assessment report oo executive summary, findings, iyo remediation roadmap leh (final portfolio centerpiece)."
          ],
          deliverable: "Complete cloud security assessment report — final program deliverable (portfolio centerpiece)."
        }
      },

    ],
  }),
];

export function findCSModule(slug: string) {
  return cloudSecurityModules.find((x) => x.slug === slug);
}

export function findCSLesson(moduleSlug: string, lessonSlug: string) {
  const mod = findCSModule(moduleSlug);
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

export const cloudSecurityTotalLessons = cloudSecurityModules.reduce((n, x) => n + x.lessons, 0);
export const cloudSecurityTotalHours = cloudSecurityModules.reduce((n, x) => n + x.hours, 0);
