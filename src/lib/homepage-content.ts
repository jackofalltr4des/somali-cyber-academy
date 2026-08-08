/**
 * Static marketing copy for the public homepage — split out of
 * curriculum.ts (H3 perf fix) so the homepage doesn't need to import that
 * file (and, transitively, all four ~7,000-line curriculum modules) just
 * for these two small hardcoded arrays. See getPlatformStats in
 * learning.functions.ts for the rest of the homepage's data (module/lab
 * counts and summaries), which is computed server-side instead.
 */

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
