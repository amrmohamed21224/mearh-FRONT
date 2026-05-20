import { useEffect, useRef, RefObject } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { gsapEase } from '../lib/gsap/presets';

interface UseScrollRevealOptions {
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Y-axis start offset (px) */
  yOffset?: number;
  /** GSAP ease string */
  ease?: string;
  /** Animation duration */
  duration?: number;
  /** Play once or reverse on scroll out */
  once?: boolean;
}

/**
 * useScrollReveal
 * GSAP-powered scroll reveal for individual elements.
 * Future replacement for the Framer Motion ScrollReveal component
 * when more complex animations are needed (clip-path, stagger, etc.)
 *
 * For now, ScrollReveal.tsx (Framer Motion) handles standard reveals.
 * Use this hook for cinematic/GSAP-specific reveals.
 *
 * Usage:
 *   const ref = useScrollReveal<HTMLDivElement>({ delay: 0.1 });
 *   <div ref={ref}>...</div>
 */
export function useScrollReveal<T extends HTMLElement>({
  delay = 0,
  yOffset = 40,
  ease = gsapEase.out,
  duration = 0.9,
  once = true,
}: UseScrollRevealOptions = {}): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: yOffset },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, [delay, yOffset, ease, duration, once]);

  return ref;
}

/**
 * useParallax
 * GSAP scrub-based parallax for hero images and background layers.
 * Future replacement for Framer Motion useScroll + useTransform.
 *
 * Usage:
 *   const ref = useParallax<HTMLDivElement>({ speed: 0.4 });
 *   <div ref={ref} style={{ willChange: 'transform' }}>...</div>
 */
export function useParallax<T extends HTMLElement>(
  { speed = 0.3 }: { speed?: number } = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, [speed]);

  return ref;
}
