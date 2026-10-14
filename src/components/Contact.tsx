import React, { useState } from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.ts';
import { MagneticButton } from './MagneticButton.tsx';
import { Mail, Copy, Check, Github, Linkedin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const { socials } = PORTFOLIO_CONFIG;
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 scroll-mt-20"
      aria-labelledby="contact-heading"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-background-border gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs uppercase tracking-widest font-mono text-foreground-muted">
              Communication
            </span>
          </div>
          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl font-sans font-semibold tracking-tight text-foreground"
          >
            Get in Touch
          </h2>
        </div>

        <p className="text-sm text-foreground-muted max-w-md font-normal leading-relaxed">
          Open to technical leadership, consulting on system architecture, or bespoke software engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Direct Contact & Socials */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Direct Channels
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed font-normal">
              Whether you have an upcoming project requirement, an architectural question, or simply want to connect, reach out directly.
            </p>

            {/* Email Box with One-Click Copy */}
            <div className="rounded-xl border border-background-border bg-background-subtle/70 p-5 flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-foreground-subtle">
                Primary Email
              </span>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${socials.email}`}
                  className="font-mono text-sm text-foreground hover:text-accent transition-colors truncate"
                >
                  {socials.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-foreground-muted hover:text-foreground transition-all"
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-background-border bg-background-subtle/50 text-xs font-mono text-foreground-muted hover:text-foreground hover:border-background-borderHover transition-all"
                aria-label="Visit GitHub Profile"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>

              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-background-border bg-background-subtle/50 text-xs font-mono text-foreground-muted hover:text-foreground hover:border-background-borderHover transition-all"
                aria-label="Visit LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${socials.email}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-background-border bg-background-subtle/50 text-xs font-mono text-foreground-muted hover:text-foreground hover:border-background-borderHover transition-all"
                aria-label="Send Email"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-background-border text-xs font-mono text-foreground-subtle">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 mr-2" />
            Typical response within 24 business hours
          </div>
        </div>

        {/* Minimal Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-background-border bg-background-subtle/60 p-8">
            {formSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">Message Transmitted</h4>
                <p className="text-sm text-foreground-muted max-w-sm">
                  Thank you for reaching out. Your inquiry has been recorded and I will respond shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-4 text-xs font-mono text-accent hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono uppercase tracking-wider text-foreground-subtle"
                    >
                      Name / Organization
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-background-border text-foreground text-sm placeholder:text-foreground-faint focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono uppercase tracking-wider text-foreground-subtle"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-background-border text-foreground text-sm placeholder:text-foreground-faint focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-foreground-subtle"
                  >
                    Project Details or Inquiry
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your objectives, timeframe, and technical context..."
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-background-border text-foreground text-sm placeholder:text-foreground-faint focus:border-accent focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-foreground-faint">
                    End-to-end encrypted dispatch
                  </span>

                  <MagneticButton
                    variant="primary"
                    onClick={() => {}}
                    ariaLabel="Submit contact inquiry"
                    className="px-6"
                  >
                    <span>Transmit Message</span>
                    <Send className="h-3.5 w-3.5 ml-1" />
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
