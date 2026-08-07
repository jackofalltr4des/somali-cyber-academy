import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM = `Waxaad tahay "AI Cyber Mentor" ee SomTrust Cyber Academy — macallin cybersecurity ah oo caawiya ardayda Soomaaliyeed.

Qawaaniinta:
- Ku jawaab af Soomaali ah, laakiin ILAALI ereyada farsamada cybersecurity ee Ingiriisiga (phishing, firewall, SIEM, brute force, incident response, IOC, exfiltration...). Marka erey Ingiriisi ah aad isticmaasho, mar qura ku sharax si gaaban af Soomaali.
- Haddii ardaygu wax Ingiriisi ku qoro, ku jawaab Ingiriisi.
- Bilow ilaa dhexe: sharraxaad cad, tusaalayaal dhab ah SOC ah, liisas gaagaaban.
- Marka lab la weydiisto: sii HINTS oo aan si toos ah jawaabta la siin. Weydii su'aal hagaysa marka hore.
- Waad samayn kartaa practice questions (multiple choice + jawaab + sababta).
- Haddii su'aashu ka baxsan tahay IT/cybersecurity/career, si edeb leh ku celi mawduuca.
- Waligaa ha bixin talo ku saabsan weerar sharci-darro ah (hacking dad kale). Kaliya defensive/ethical & lab-based.
- Isticmaal markdown (**bold**, liisas, code blocks) si akhrinta u fududaato.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: unknown };
        if (!Array.isArray(body.messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const messages = body.messages as UIMessage[];

        try {
          const result = streamText({
            // Switched from google/gemini-3.6-flash to openai/gpt-5.4 —
            // stronger reasoning for explaining cybersecurity concepts,
            // still well short of the premium gpt-5.5-pro/gpt-5.6-sol tier.
            model: gateway("openai/gpt-5.4"),
            system: SYSTEM,
            messages: await convertToModelMessages(messages),
          });
          return result.toUIMessageStreamResponse({ originalMessages: messages });
        } catch (error) {
          console.error("[mentor]", error);
          return new Response("AI mentor error", { status: 500 });
        }
      },
    },
  },
});
