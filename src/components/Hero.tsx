import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.ts';
import { Typewriter } from './Typewriter.tsx';
import { MagneticButton } from './MagneticButton.tsx';
import { useReducedMotion, useIsTouchDevice } from '../hooks/useReducedMotion.ts';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { eyebrow, headline, subheadline, typewriterWords, primaryCta, secondaryCta } =
    PORTFOLIO_CONFIG.hero;

  const heroRef = useRef<HTMLElement | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (prefersReducedMotion || isTouch) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;

      // Restrained parallax range (max 7px)
      targetX = normX * 7;
      targetY = normY * 7;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setParallaxOffset({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion, isTouch]);

  return (
    <section
      ref={heroRef}
      className="relative z-10 min-h-[660px] md:min-h-[720px] max-h-[860px] flex flex-col justify-center items-center px-6 pt-24 pb-12 text-center select-none"
      aria-label="Hero Introduction"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow Label with Parallax */}
        <div className="animate-hero-eyebrow">
          <div
            style={{
              transform: `translate3d(${parallaxOffset.x * 0.4}px, ${parallaxOffset.y * 0.4}px, 0)`,
            }}
            className="mb-6 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-subtle" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-foreground-muted font-medium">
              {eyebrow}
            </span>
          </div>
        </div>

        {/* Large Typographic Headline with Parallax */}
        <div className="animate-hero-headline">
          <h1
            style={{
              transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`,
            }}
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-semibold tracking-tight text-foreground leading-[1.08] max-w-3xl"
          >
            {headline}
          </h1>
        </div>

        {/* Supporting Line */}
        <div className="animate-hero-subheadline">
          <p className="mt-6 text-base sm:text-lg md:text-xl text-foreground-muted max-w-2xl font-normal leading-relaxed">
            {subheadline}
          </p>
        </div>

        {/* Restrained Typewriter Indicator */}
        <div className="animate-hero-typewriter">
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-foreground-subtle">
            <span className="font-mono text-foreground-subtle tracking-wide">Focus:</span>
            <Typewriter words={typewriterWords} />
          </div>
        </div>

        {/* Understated Calls to Action */}
        <div className="animate-hero-cta">
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={primaryCta.href}
              variant="primary"
              ariaLabel="Explore selected projects"
            >
              <span>{primaryCta.label}</span>
              <ArrowDown className="h-3.5 w-3.5" />
            </MagneticButton>

            <MagneticButton
              href={secondaryCta.href}
              variant="secondary"
              ariaLabel="Get in touch"
            >
              <span>{secondaryCta.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-foreground-muted" />
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="mt-12 hidden md:flex flex-col items-center gap-2 text-foreground-subtle opacity-50">
        <span className="text-[10px] font-mono uppercase tracking-widest text-foreground-subtle">
          Scroll
        </span>
        <div className="h-4 w-[1px] bg-gradient-to-b from-foreground-subtle to-transparent" />
      </div>
    </section>
  );
};
