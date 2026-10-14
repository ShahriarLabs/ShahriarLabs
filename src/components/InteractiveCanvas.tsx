import React, { useEffect, useRef } from 'react';
import { useReducedMotion, useIsTouchDevice } from '../hooks/useReducedMotion.ts';

interface Dot {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
}

export const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];

    // Pointer state with smooth interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const SPACING = 44; // refined dot grid spacing
    const INTERACTION_RADIUS = 140; // proximity threshold
    const RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Rebuild grid dots
      dots = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;
          dots.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
          });
        }
      }

      // If static mode, render once
      if (prefersReducedMotion || isTouch) {
        renderStatic();
      }
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft ambient light top center
      const ambient = ctx.createRadialGradient(width / 2, 120, 0, width / 2, 120, 600);
      ambient.addColorStop(0, 'rgba(56, 189, 248, 0.03)');
      ambient.addColorStop(1, 'transparent');
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, width, height);

      // Subtle base dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.055)';
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.beginPath();
        ctx.arc(dot.originX, dot.originY, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion && !isTouch) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Main animation loop
    const render = () => {
      // Smooth lerp mouse towards target
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      // 1. Subtle cursor-following light (radial spotlight)
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const spotlight = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          480
        );
        spotlight.addColorStop(0, 'rgba(56, 189, 248, 0.05)');
        spotlight.addColorStop(0.4, 'rgba(129, 140, 248, 0.02)');
        spotlight.addColorStop(1, 'transparent');

        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Interactive grid dots with spring return & proximity glow
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Spring force toward origin
        const k = 0.08;
        const damping = 0.82;
        const ax = (dot.originX - dot.x) * k;
        const ay = (dot.originY - dot.y) * k;

        dot.vx = (dot.vx + ax) * damping;
        dot.vy = (dot.vy + ay) * damping;

        // Interaction displacement with cursor
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const distSq = dx * dx + dy * dy;

        let dotAlpha = 0.06; // standard resting opacity
        let dotColor = 'rgba(255, 255, 255, 0.06)';

        if (distSq < RADIUS_SQ && mouse.active) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / INTERACTION_RADIUS);
          const push = force * 6; // restrained displacement

          dot.x += (dx / (dist || 1)) * push * 0.15;
          dot.y += (dy / (dist || 1)) * push * 0.15;

          // Reactive brightness
          dotAlpha = 0.06 + force * 0.28;
          dotColor = `rgba(56, 189, 248, ${dotAlpha.toFixed(3)})`;
        } else {
          dot.x += dot.vx;
          dot.y += dot.vy;
        }

        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    resize();

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (!prefersReducedMotion && !isTouch) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
      document.addEventListener('mouseleave', handlePointerLeave);
      animationFrameId = requestAnimationFrame(render);
    } else {
      renderStatic();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [prefersReducedMotion, isTouch]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full select-none"
    />
  );
};
