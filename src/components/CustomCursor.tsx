import React, { useEffect, useRef } from 'react';
import { useReducedMotion, useIsTouchDevice } from '../hooks/useReducedMotion.ts';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (prefersReducedMotion || isTouch) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isVisible = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], [data-interactive="true"]');
        isHovering = !!interactive;
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const animate = () => {
      // Direct dot positioning
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Smooth damped ring positioning
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        const scale = isHovering ? 1.6 : 1;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.borderColor = isHovering
          ? 'rgba(56, 189, 248, 0.45)'
          : 'rgba(255, 255, 255, 0.2)';
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion, isTouch]);

  if (prefersReducedMotion || isTouch) return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-1.5 w-1.5 rounded-full bg-accent transition-opacity duration-300 opacity-0"
        style={{ willChange: 'transform' }}
      />
      {/* Soft trailing micro-ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-7 w-7 rounded-full border border-white/20 transition-[opacity,border-color] duration-200 ease-out opacity-0"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};
