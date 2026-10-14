import React, { useRef, useState, useCallback } from 'react';
import { useReducedMotion, useIsTouchDevice } from '../hooks/useReducedMotion.ts';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'subtle';
  className?: string;
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  ariaLabel,
}) => {
  const buttonRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion || isTouch) return;
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Restrained pull: max 7px offset
      const maxDistance = 7;
      const rawX = (e.clientX - centerX) * 0.22;
      const rawY = (e.clientY - centerY) * 0.22;

      const clampedX = Math.max(-maxDistance, Math.min(maxDistance, rawX));
      const clampedY = Math.max(-maxDistance, Math.min(maxDistance, rawY));

      setOffset({ x: clampedX, y: clampedY });
    },
    [prefersReducedMotion, isTouch]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  // Base styling for minimal, sophisticated design
  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles =
      'bg-foreground text-background font-medium hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,255,0.12)] border border-white/90 active:scale-[0.98]';
  } else if (variant === 'secondary') {
    variantStyles =
      'bg-background-card/90 text-foreground-muted hover:text-foreground hover:bg-background-cardHover border border-background-border hover:border-background-borderHover active:scale-[0.98]';
  } else {
    variantStyles =
      'bg-transparent text-foreground-muted hover:text-foreground border border-transparent hover:border-background-border active:scale-[0.98]';
  }

  const commonClasses = `inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm tracking-tight transition-colors duration-200 outline-none select-none ${variantStyles} ${className}`;

  const transformStyle = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    transition: isHovered ? 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={transformStyle}
        className={commonClasses}
        aria-label={ariaLabel}
        data-interactive="true"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      className={commonClasses}
      aria-label={ariaLabel}
      data-interactive="true"
    >
      {children}
    </button>
  );
};
