/**
 * ParallaxLayer — Reusable Scroll-driven Parallax Wrapper
 *
 * Wraps any children with GSAP scroll parallax.
 * Uses createParallaxLayer from the scroll engine.
 * 100% GPU-safe (transform only).
 *
 * Usage:
 *   <ParallaxLayer yStart={0} yEnd={20}>
 *     <img ... />
 *   </ParallaxLayer>
 */

import { useRef, useEffect, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '../../../lib/gsap';

interface ParallaxLayerProps {
  children: ReactNode;
  yStart?: number;
  yEnd?: number;
  start?: string;
  end?: string;
  scrub?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxLayer({
  children,
  yStart = 0,
  yEnd = 20,
  start = 'top bottom',
  end = 'bottom top',
  scrub = 1.2,
  className = '',
  style,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: yStart },
        {
          yPercent: yEnd,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
            invalidateOnRefresh: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [yStart, yEnd, start, end, scrub]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
