import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send, Loader2, Sparkles } from "lucide-react";

// This component provides an interactive chat-like UI for designing a page using Claude-style prompts.
// No network calls are made; responses are locally simulated so the UI works instantly.

export default function AIBuilder() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I’m your AI site designer. Tell me about the website you want—purpose, audience, vibe—and I’ll propose a layout, copy, and color theme.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const viewportRef = useRef(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", content: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate an AI response locally for demo purposes.
    const reply = await mockClaudeReply(trimmed);
    setMessages((m) => [...m, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  const proposedPalette = useMemo(() => pickPaletteFromConversation(messages), [messages]);

  return (
    <section id="builder" className="relative bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Bot className="h-4 w-4 text-violet-300" />
              <span>Claude website builder</span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Describe your site. See a plan instantly.
            </h2>

            <div className="mt-4 flex h-[28rem] flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div
                ref={viewportRef}
                className="flex-1 space-y-4 overflow-auto p-4 pr-3"
              >
                {messages.map((m, i) => (
                  <div key={i} className="flex gap-3">
                    <div
                      className={
                        "mt-1 h-6 w-6 shrink-0 rounded-full ring-1 " +
                        (m.role === "assistant"
                          ? "bg-violet-500/20 ring-violet-500/40"
                          : "bg-slate-600/30 ring-white/20")
                      }
                    />
                    <div
                      className={
                        "max-w-[48ch] rounded-lg px-3 py-2 text-sm leading-relaxed " +
                        (m.role === "assistant"
                          ? "bg-white/5 text-white"
                          : "bg-slate-800/60 text-white/90")
                      }
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Thinking with Claude…
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 p-3">
                <div className="flex items-end gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="E.g. A landing page for a fitness coaching app in a bold, energetic style"
                    className="min-h-[46px] flex-1 resize-none rounded-lg border border-white/10 bg-slate-900/60 p-3 text-sm text-white placeholder:text-white/50 focus:border-violet-400/40 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
                  />
                  <button
                    onClick={handleSend}
                    className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-medium text-white transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-white/60">
              This demo simulates Claude responses locally. Connect a backend with your Anthropic key to enable real generations.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Sparkles className="h-4 w-4 text-amber-300" />
                Suggested theme
              </div>

              <div className="mt-4 grid grid-cols-5 gap-2">
                {proposedPalette.colors.map((c) => (
                  <div key={c} className="space-y-1">
                    <div
                      className="h-12 w-full rounded border border-white/10"
                      style={{ backgroundColor: c }}
                    />
                    <div className="text-[10px] text-white/70">{c}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-white/90">Suggested layout</h4>
                <ul className="mt-2 list-inside list-disc text-sm text-white/70">
                  {proposedPalette.sections.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-lg border border-white/10 bg-slate-900/40 p-4">
                <h5 className="text-sm font-semibold text-white">Sample headline</h5>
                <p className="mt-1 text-sm text-white/80">{proposedPalette.sampleHeadline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function pickPaletteFromConversation(messages) {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const text = (lastUser?.content || "").toLowerCase();

  let colors = ["#7c3aed", "#22d3ee", "#0ea5e9", "#06b6d4", "#a78bfa"]; // violet + cyan family
  if (/(eco|nature|green|sustain)/.test(text)) colors = ["#0f766e", "#10b981", "#22c55e", "#84cc16", "#a3e635"]; // greens
  if (/(luxury|premium|gold|fashion)/.test(text)) colors = ["#0f172a", "#1f2937", "#334155", "#fbbf24", "#eab308"]; // dark + gold
  if (/(playful|kids|fun|creative)/.test(text)) colors = ["#2563eb", "#22c55e", "#ef4444", "#f59e0b", "#a855f7"]; // bright mix
  if (/(health|fitness|energy|bold)/.test(text)) colors = ["#ef4444", "#f97316", "#22c55e", "#0ea5e9", "#a855f7"]; // energetic

  const sections = [
    "Hero with headline + CTA",
    "Feature grid",
    "Social proof",
    "Pricing",
    "FAQ",
    "Footer",
  ];

  const sampleHeadline = suggestHeadline(text);

  return { colors, sections, sampleHeadline };
}

function suggestHeadline(text) {
  if (!text) return "Launch your next idea with an AI‑crafted website.";
  if (/fitness|gym|coach/.test(text)) return "Train smarter online with a site that converts sessions into signups.";
  if (/saas|startup|b2b|product/.test(text)) return "Turn product value into clear storytelling that drives trials.";
  if (/portfolio|designer|photography/.test(text)) return "Show your work with a crisp, fast portfolio that stands out.";
  if (/restaurant|cafe|food/.test(text)) return "A tasty site that makes bookings and orders effortless.";
  if (/agency|studio|consult/.test(text)) return "Pitch, prove, and book clients with a conversion‑first site.";
  return "Launch your next idea with an AI‑crafted website.";
}

function mockClaudeReply(prompt) {
  return new Promise((resolve) => {
    const base = prompt.trim();
    const plan = `Here’s a quick plan based on your idea:\n\n` +
      `1) Structure: Hero, features, social proof, pricing/CTA, FAQ, footer.\n` +
      `2) Tone: ${pickTone(base)}.\n` +
      `3) Colors: Derived from brand mood; see palette on the right.\n` +
      `4) Copy: I’ll draft a strong headline and scannable bullets.\n\n` +
      `Want me to generate section copy next?`;

    setTimeout(() => resolve(plan), 650);
  });
}

function pickTone(text) {
  if (/playful|fun|friendly/.test(text.toLowerCase())) return "playful and friendly";
  if (/bold|energetic|strong/.test(text.toLowerCase())) return "bold and energetic";
  if (/calm|minimal|clean|simple/.test(text.toLowerCase())) return "calm and minimal";
  if (/premium|luxury/.test(text.toLowerCase())) return "refined and premium";
  return "clear and confident";
}
