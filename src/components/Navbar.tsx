import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.ts';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-background-border py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Wordmark & Monogram */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-foreground hover:text-white transition-colors select-none"
          aria-label="ShahriarLabs Home"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.05] border border-white/[0.1] group-hover:border-accent/40 group-hover:bg-accent/[0.08] transition-all">
            <span className="font-mono text-xs font-semibold text-accent tracking-tighter">SL</span>
          </div>
          <span className="font-sans font-semibold tracking-tight text-sm text-foreground group-hover:text-white transition-colors">
            Shahriar<span className="text-foreground-muted font-normal">Labs</span>
          </span>
        </a>

        {/* Availability Badge (Center-Right on Desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-foreground-muted">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{PORTFOLIO_CONFIG.brand.availabilityText}</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          <a
            href="#work"
            className="text-xs uppercase tracking-widest text-foreground-muted hover:text-foreground transition-colors font-mono"
          >
            Work
          </a>
          <a
            href="#about"
            className="text-xs uppercase tracking-widest text-foreground-muted hover:text-foreground transition-colors font-mono"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-xs uppercase tracking-widest text-foreground-muted hover:text-foreground transition-colors font-mono"
          >
            Contact
          </a>

          {/* Minimal Resume or Direct Contact pill */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] text-foreground border border-white/[0.08] hover:border-white/[0.18] transition-all"
          >
            <span>Inquire</span>
            <ArrowUpRight className="h-3 w-3 text-foreground-muted" />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-foreground-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>Available</span>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-foreground-muted hover:text-foreground bg-white/[0.04] border border-white/[0.08] focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-background-border bg-background-subtle/95 backdrop-blur-xl px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono tracking-wider uppercase text-foreground-muted hover:text-white py-1 transition-colors"
            >
              Work
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono tracking-wider uppercase text-foreground-muted hover:text-white py-1 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono tracking-wider uppercase text-foreground-muted hover:text-white py-1 transition-colors"
            >
              Contact
            </a>
            <div className="pt-2 border-t border-background-border">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider bg-white/[0.06] hover:bg-white/[0.1] text-foreground border border-white/[0.1]"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
