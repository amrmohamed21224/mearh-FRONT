/**
 * CinematicReveal
 * Advanced multi-element orchestrated entrance.
 * Replaces the basic Framer Motion ScrollReveal for complex sections.
 *
 * Usage:
 *   <CinematicReveal
 *     stagger={0.1}
 *     direction="up"
 *     clip={false}
 *   >
 *     <div>Item 1</div>
 *     <div>Item 2</div>
 *     <div>Item 3</div>
 *   </CinematicReveal>
 */

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';
import { gsap } from '../../../lib/gsap';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

interface CinematicRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  stagger?: number;
  delay?: number;
  duration?: number;
  ease?: string;
  start?: string;
  once?: boolean;
  /** Apply clip-path reveal instead of transform */
  clip?: boolean;
  className?: string;
  style?: CSSProperties;
}

const INITIAL: Record<RevealDirection, gsap.TweenVars> = {
  up:    { y: 50, opacity: 0 },
  down:  { y: -50, opacity: 0 },
  left:  { x: -50, opacity: 0 },
  right: { x: 50, opacity: 0 },
  scale: { scale: 0.92, opacity: 0 },
  fade:  { opacity: 0 },
};

const FINAL: Record<RevealDirection, gsap.TweenVars> = {
  up:    { y: 0, opacity: 1 },
  down:  { y: 0, opacity: 1 },
  left:  { x: 0, opacity: 1 },
  right: { x: 0, opacity: 1 },
  scale: { scale: 1, opacity: 1 },
  fade:  { opacity: 1 },
};

export function CinematicReveal({
  children,
  direction = 'up',
  stagger = 0.08,
  delay = 0,
  duration = 0.9,
  ease = 'power3.out',
  start = 'top 82%',
  once = true,
  clip = false,
  className,
  style,
}: CinematicRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    if (!children.length) return;

    const ctx = gsap.context(() => {
      if (clip) {
        gsap.fromTo(
          children,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration,
            ease: 'power4.out',
            stagger,
            delay,
            scrollTrigger: {
              trigger: container,
              start,
              toggleActions: once ? 'play none none none' : 'play none none reverse',
            },
          }
        );
      } else {
        gsap.fromTo(
          children,
          INITIAL[direction],
          {
            ...FINAL[direction],
            duration,
            ease,
            stagger,
            delay,
            scrollTrigger: {
              trigger: container,
              start,
              toggleActions: once ? 'play none none none' : 'play none none reverse',
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, [direction, stagger, delay, duration, ease, start, once, clip]);

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  );
}
