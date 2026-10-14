import React, { useEffect, useRef, useState } from 'react';
import { PROJECT_COUNT } from '../config/portfolio.ts';
import { useReducedMotion } from '../hooks/useReducedMotion.ts';
import { Layers, Terminal, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const ProjectCounter: React.FC = () => {
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayCount(PROJECT_COUNT);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();
          const duration = 1800; // 1.8 seconds smooth count-up

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out expo curve for refined deceleration
            const easeOutProgress =
              progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            const currentVal = Math.round(easeOutProgress * PROJECT_COUNT);
            setDisplayCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayCount(PROJECT_COUNT);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    const currentEl = containerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [hasAnimated, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16"
      aria-labelledby="metrics-heading"
    >
      <div className="relative rounded-2xl border border-background-border bg-background-subtle/80 backdrop-blur-sm p-8 md:p-12 transition-all duration-300 hover:border-background-borderHover">
        {/* Subtle grid accent background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.06),transparent)] pointer-events-none"
        />

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Counter Display */}
          <div className="md:col-span-5 flex flex-col justify-center border-b md:border-b-0 md:border-r border-background-border pb-8 md:pb-0 md:pr-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              <span
                id="metrics-heading"
                className="text-xs uppercase tracking-widest font-mono text-foreground-muted"
              >
                Project Trajectory
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-mono text-6xl md:text-7xl font-semibold tracking-tighter text-foreground">
                {displayCount}
                <span className="text-accent font-sans text-4xl md:text-5xl ml-1">+</span>
              </span>
            </div>

            <p className="mt-3 text-sm text-foreground-muted font-normal leading-relaxed">
              Curated software builds spanning distributed services, modern web apps, and developer platforms.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-foreground-subtle">
              <span>Variable:</span>
              <code className="px-1.5 py-0.5 rounded bg-background border border-background-border text-foreground-muted">
                PROJECT_COUNT = {PROJECT_COUNT}
              </code>
            </div>
          </div>

          {/* Core Technical Pillars (Credible, No Fabrication) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 md:pl-4">
            {/* Pillar 1 */}
            <div className="flex flex-col p-4 rounded-xl border border-white/[0.04] bg-background-card/40 hover:bg-background-card/70 transition-colors">
              <div className="p-2 w-fit rounded-lg bg-white/[0.03] border border-white/[0.06] text-accent mb-3">
                <Terminal className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-medium text-foreground">Engineering Focus</h3>
              <p className="mt-1 text-xs text-foreground-subtle leading-relaxed">
                Full-stack web systems, microservices, and high-reliability APIs.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col p-4 rounded-xl border border-white/[0.04] bg-background-card/40 hover:bg-background-card/70 transition-colors">
              <div className="p-2 w-fit rounded-lg bg-white/[0.03] border border-white/[0.06] text-accent mb-3">
                <Layers className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-medium text-foreground">Clean Architecture</h3>
              <p className="mt-1 text-xs text-foreground-subtle leading-relaxed">
                Strict type discipline, deterministic state, and modular decomposition.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col p-4 rounded-xl border border-white/[0.04] bg-background-card/40 hover:bg-background-card/70 transition-colors">
              <div className="p-2 w-fit rounded-lg bg-white/[0.03] border border-white/[0.06] text-accent mb-3">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-medium text-foreground">Production Rigor</h3>
              <p className="mt-1 text-xs text-foreground-subtle leading-relaxed">
                Comprehensive testing, predictable telemetry, and sub-second performance.
              </p>
            </div>
          </div>
        </div>

        {/* View Selected Work CTA link */}
        <div className="mt-8 pt-6 border-t border-background-border flex items-center justify-between text-xs font-mono text-foreground-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Verified & production active
          </span>
          <a
            href="#work"
            className="group flex items-center gap-1 text-foreground-muted hover:text-accent transition-colors"
          >
            <span>Review selected projects</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
