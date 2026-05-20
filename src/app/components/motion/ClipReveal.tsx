/**
 * ClipReveal
 * Wraps any element with a GSAP clip-path reveal on scroll entry.
 * Ideal for images, cards, panels, hero sections.
 *
 * Usage:
 *   <ClipReveal direction="up" delay={0.1}>
 *     <img src={heroImage} alt="..." />
 *   </ClipReveal>
 */

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';
import { gsap } from '../../../lib/gsap';
import { clipReveal, type ClipDirection } from '../../../lib/gsap/clip';

interface ClipRevealProps {
  children: ReactNode;
  direction?: ClipDirection;
  duration?: number;
  ease?: string;
  delay?: number;
  start?: string;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function ClipReveal({
  children,
  direction = 'up',
  duration = 1.2,
  ease = 'power4.out',
  delay = 0,
  start = 'top 80%',
  once = true,
  className,
  style,
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      clipReveal(el, { direction, duration, ease, delay, trigger: el, start, once });
    }, el);

    return () => ctx.revert();
  }, [direction, duration, ease, delay, start, once]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
