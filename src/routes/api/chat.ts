import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { verifyBearerToken } from "@/lib/verify-token.server";

const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_MESSAGES = 40;
const MAX_MESSAGE_CHARS = 4000;

/**
 * Per-instance sliding-window limiter. This is a real, meaningful cap (a
 * single Worker/Node instance can no longer be looped for unlimited AI
 * spend) but it is NOT a globally-consistent limit across every edge
 * instance — a proper fix needs a shared store (Cloudflare Rate Limiting
 * binding, KV, or similar), which requires infra/deploy config this repo
 * doesn't currently define. Flagging as a known follow-up rather than
 * quietly shipping a limiter that looks stronger than it is.
 */
const requestLog = new Map<string, number[]>();

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (requestLog.get(userId) ?? []).filter((t) => t > windowStart);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestLog.set(userId, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(userId, timestamps);
  return false;
}

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
        // C5: authentication required — this endpoint streams from a paid
        // LLM gateway, so it must never be reachable anonymously.
        const userId = await verifyBearerToken(request);
        if (!userId) {
          return new Response("Unauthorized", { status: 401 });
        }

        if (isRateLimited(userId)) {
          return new Response(
            "Waad soo dirtay fariimo badan. Fadlan sug daqiiqado kadib isku day.",
            {
              status: 429,
            },
          );
        }

        let body: { messages?: unknown };
        try {
          body = (await request.json()) as { messages?: unknown };
        } catch {
          return new Response("Invalid JSON body", { status: 400 });
        }

        if (!Array.isArray(body.messages) || body.messages.length === 0) {
          return new Response("Messages are required", { status: 400 });
        }
        if (body.messages.length > MAX_MESSAGES) {
          return new Response("Too many messages in this conversation", { status: 400 });
        }
        const messages = body.messages as UIMessage[];
        const tooLong = messages.some((m) =>
          (m.parts ?? []).some((p) => p.type === "text" && p.text.length > MAX_MESSAGE_CHARS),
        );
        if (tooLong) {
          return new Response("Message too long", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);

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
          return new Response("AI mentor error. Fadlan isku day mar kale.", { status: 500 });
        }
      },
    },
  },
});
