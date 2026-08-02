import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { PageShell } from "@/components/site/Shell";

export const Route = createFileRoute("/_authenticated/mentor")({
  head: () => ({
    meta: [
      { title: "AI Cyber Mentor — SomTrust Cyber Academy" },
      {
        name: "description",
        content: "Weydii AI Cyber Mentor su'aalo cybersecurity af Soomaali oo leh ereyada Ingiriisiga.",
      },
      { property: "og:title", content: "AI Cyber Mentor — SomTrust Cyber Academy" },
      { property: "og:description", content: "Macalin AI ah oo kaa caawiya barashada SOC skills." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MentorPage,
});

function MentorPage() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!busy) inputRef.current?.focus();
  }, [busy]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await sendMessage({ text });
  }

  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold">
        AI <span className="text-gradient-indigo">Cyber Mentor</span>
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Weydii wax kasta oo ku saabsan casharrada, labs-ka ama waddada shaqada — af Soomaali oo leh
        ereyada farsamada Ingiriisiga.
      </p>

      <div className="bento-card mt-6 flex min-h-[440px] flex-col p-5">
        <div className="flex-1 space-y-4 overflow-y-auto">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
              <Sparkles className="size-6 text-primary" />
              Tusaale: “Sharax farqiga u dhexeeya IDS iyo IPS”
            </div>
          )}
          {messages.map((m) => {
            const text = m.parts
              .map((p) => (p.type === "text" ? p.text : ""))
              .join("");
            return (
              <div
                key={m.id}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-surface text-foreground"
                }`}
              >
                <div className="prose prose-sm prose-invert max-w-none">
                  <ReactMarkdown>{text}</ReactMarkdown>
                </div>
              </div>
            );
          })}
          {status === "submitted" && (
            <p className="text-sm text-muted-foreground">Mentor-ku wuu qorayaa…</p>
          )}
          {error && (
            <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              Khalad dhacay. Fadlan isku day mar kale.
            </p>
          )}
        </div>

        <form onSubmit={send} className="mt-4 flex items-end gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) void send(e);
            }}
            rows={2}
            maxLength={1000}
            placeholder="Qor su'aashaada…"
            className="input-base resize-none"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-xl bg-primary p-3 text-primary-foreground hover:opacity-90 disabled:opacity-50"
            aria-label="Dir"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </PageShell>
  );
}
