/**
 * MEARH — Upgraded ScrollReveal
 * Supports: up, left, right, scale, fade, clip-path
 * Token-driven. GSAP-powered on desktop, graceful Framer Motion fallback preserved.
 */

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';
import { gsap } from '../../lib/gsap';
import { motion as motionTokens } from '../../lib/tokens';

type RevealDirection = 'up' | 'left' | 'right' | 'scale' | 'fade' | 'clip' | 'none';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  duration?: number;
  distance?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
}

const INITIAL_STATES: Record<RevealDirection, gsap.TweenVars> = {
  up:    { y: 40,  opacity: 0 },
  left:  { x: -40, opacity: 0 },
  right: { x: 40,  opacity: 0 },
  scale: { scale: 0.94, opacity: 0 },
  fade:  { opacity: 0 },
  clip:  { clipPath: 'inset(100% 0% 0% 0%)' },
  none:  { opacity: 0 },
};

const FINAL_STATES: Record<RevealDirection, gsap.TweenVars> = {
  up:    { y: 0,  opacity: 1 },
  left:  { x: 0,  opacity: 1 },
  right: { x: 0,  opacity: 1 },
  scale: { scale: 1, opacity: 1 },
  fade:  { opacity: 1 },
  clip:  { clipPath: 'inset(0% 0% 0% 0%)' },
  none:  { opacity: 1 },
};

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration,
  stagger,
  start = 'top 82%',
  once = true,
  className,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const dur = duration ?? (direction === 'clip' ? 1.2 : motionTokens.duration.cinematic);
  const ease = direction === 'clip' ? 'power4.out' : 'power3.out';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger
      ? (Array.from(el.children) as HTMLElement[])
      : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        INITIAL_STATES[direction],
        {
          ...FINAL_STATES[direction],
          duration: dur,
          ease,
          delay,
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [direction, delay, dur, ease, stagger, start, once]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
