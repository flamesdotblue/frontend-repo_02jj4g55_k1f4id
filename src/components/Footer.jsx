import { Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="text-sm text-white/70">
          © {new Date().getFullYear()} NovaSites. Built with love and Claude‑inspired AI.
        </div>
        <div className="flex items-center gap-3 text-white/70">
          <a
            className="rounded-md p-2 hover:bg-white/10"
            href="#"
            aria-label="Twitter"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a
            className="rounded-md p-2 hover:bg-white/10"
            href="#"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
