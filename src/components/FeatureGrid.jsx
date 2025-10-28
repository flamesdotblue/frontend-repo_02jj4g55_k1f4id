import { Layout, Bot, Palette, Wand2 } from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "Smart layouts",
    desc: "Beautiful, responsive sections—hero, features, pricing, FAQ—auto arranged for your goal.",
  },
  {
    icon: Bot,
    title: "Claude copy",
    desc: "On-brand headlines, CTAs, and microcopy crafted with context-aware tone control.",
  },
  {
    icon: Palette,
    title: "Brand theming",
    desc: "Instant palettes and typography systems with live previews and accessibility checks.",
  },
  {
    icon: Wand2,
    title: "One‑click export",
    desc: "Ship to clean React + Tailwind code or publish instantly on our edge hosting.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What you get</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-violet-400/40 hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-violet-500/20 p-2 text-violet-300 ring-1 ring-inset ring-violet-500/30">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold">{title}</h3>
              </div>
              <p className="mt-3 text-sm text-white/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
