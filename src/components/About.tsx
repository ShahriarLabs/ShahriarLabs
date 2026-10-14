import React from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.ts';
import { Code2, Cpu, Database, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const { skills } = PORTFOLIO_CONFIG;

  const categoryIcons = [
    <Code2 key="code" className="h-4 w-4 text-accent" />,
    <Cpu key="cpu" className="h-4 w-4 text-accent" />,
    <Database key="db" className="h-4 w-4 text-accent" />,
    <CheckCircle2 key="check" className="h-4 w-4 text-accent" />,
  ];

  return (
    <section
      id="about"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 scroll-mt-20"
      aria-labelledby="about-heading"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-background-border gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs uppercase tracking-widest font-mono text-foreground-muted">
              Background & Principles
            </span>
          </div>
          <h2
            id="about-heading"
            className="text-3xl md:text-4xl font-sans font-semibold tracking-tight text-foreground"
          >
            Engineering Philosophy
          </h2>
        </div>

        <p className="text-sm text-foreground-muted max-w-md font-normal leading-relaxed">
          Committed to building deterministic, maintainable software systems through disciplined architecture and clean code.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Narrative Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-xl border border-background-border bg-background-subtle/50 p-8 space-y-4 text-sm text-foreground-muted leading-relaxed font-normal">
            <h3 className="text-base font-medium text-foreground">
              Clarity over cleverness.
            </h3>
            <p>
              I believe great software is defined by its resilience and readability. Rather than chasing ephemeral trends, I focus on building reliable systems with well-defined contracts and testable boundaries.
            </p>
            <p>
              From frontend interactions to backend data layers, every component is crafted with attention to performance, type safety, and graceful degradation.
            </p>
            <div className="pt-4 border-t border-white/[0.05] flex items-center gap-3 text-xs font-mono text-foreground-subtle">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              <span>Full lifecycle design & implementation</span>
            </div>
          </div>
        </div>

        {/* Technical Capabilities Matrix */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skillGroup, idx) => (
            <div
              key={skillGroup.category}
              className="rounded-xl border border-background-border bg-background-subtle/40 p-6 hover:border-background-borderHover transition-colors"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-1.5 rounded-md bg-white/[0.03] border border-white/[0.05]">
                  {categoryIcons[idx % categoryIcons.length]}
                </div>
                <h4 className="text-xs uppercase tracking-wider font-mono text-foreground font-medium">
                  {skillGroup.category}
                </h4>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-2 py-1 rounded bg-white/[0.02] border border-white/[0.05] text-foreground-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
