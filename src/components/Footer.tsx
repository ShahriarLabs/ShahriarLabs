import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 w-full border-t border-background-border bg-background py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-white/[0.04] border border-white/[0.08]">
            <span className="font-mono text-[10px] font-semibold text-accent">SL</span>
          </div>
          <span className="text-xs font-mono text-foreground-subtle">
            &copy; {new Date().getFullYear()} ShahriarLabs. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-foreground-subtle">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Operational &bull; 99.9% Uptime</span>
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-foreground-muted hover:text-foreground transition-colors p-1"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
