import { Rocket, Sparkles } from "lucide-react";

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 md:py-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
          <span>Powered by Claude</span>
        </div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
          Build stunning websites in minutes with AI
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
          Describe what you want. Our Claude‑driven builder designs responsive pages,
          generates copy, and suggests structure—ready to publish.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <Rocket className="h-4 w-4" />
            Get started free
          </button>
          <a
            href="#builder"
            className="text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
          >
            Try the AI builder
          </a>
        </div>
      </div>
    </section>
  );
}
