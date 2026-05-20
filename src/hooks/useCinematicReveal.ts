/**
 * useCinematicReveal
 * Multi-element orchestrated reveal with configurable timeline.
 * Higher-level than useScrollReveal — coordinates a sequence of elements.
 *
 * Usage:
 *   const containerRef = useCinematicReveal({
 *     items: [
 *       { selector: '.label',   animation: { opacity: 0, y: 20 }, delay: 0 },
 *       { selector: '.heading', animation: { yPercent: 100 },      delay: 0.1, mask: true },
 *       { selector: '.body',    animation: { opacity: 0, y: 30 }, delay: 0.3 },
 *     ]
 *   });
 *   <section ref={containerRef}>...</section>
 */

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

interface RevealItem {
  selector: string;
  animation: gsap.TweenVars;
  delay?: number;
  duration?: number;
  ease?: string;
  /** Wrap each matched element in overflow:hidden for mask-style reveal */
  mask?: boolean;
}

interface UseCinematicRevealOptions {
  items: RevealItem[];
  start?: string;
  once?: boolean;
  stagger?: number;
}

export function useCinematicReveal<T extends HTMLElement>({
  items,
  start = 'top 80%',
  once = true,
}: UseCinematicRevealOptions) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });

      items.forEach(({ selector, animation, delay = 0, duration = 0.9, ease = 'power3.out', mask }) => {
        const els = Array.from(container.querySelectorAll<HTMLElement>(selector));
        if (!els.length) return;

        if (mask) {
          // Wrap each element's parent in overflow:hidden if not already
          els.forEach(el => {
            const parent = el.parentElement;
            if (parent && getComputedStyle(parent).overflow !== 'hidden') {
              parent.style.overflow = 'hidden';
            }
          });
        }

        tl.fromTo(
          els,
          animation,
          {
            ...Object.fromEntries(
              Object.keys(animation).map(k => [k, k === 'yPercent' || k === 'y' ? 0 : k === 'opacity' ? 1 : 0])
            ),
            duration,
            ease,
          },
          delay
        );
      });
    }, container);

    return () => ctx.revert();
  }, [items, start, once]);

  return containerRef;
}

/**
 * useParallax
 * Simple scroll-scrubbed vertical parallax.
 * Drop-in replacement for Framer Motion useScroll + useTransform.
 *
 * Usage:
 *   const ref = useParallax<HTMLDivElement>({ speed: 0.2 });
 *   <div ref={ref} style={{ willChange: 'transform' }}>
 */
export function useParallax<T extends HTMLElement>({
  speed = 0.2,
  start = 'top bottom',
  end = 'bottom top',
}: { speed?: number; start?: string; end?: string } = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: 'none',
          scrollTrigger: { trigger: el, start, end, scrub: 1 },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed, start, end]);

  return ref;
}
