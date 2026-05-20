/**
 * useTextReveal
 * GSAP-powered text reveal hook.
 * Attaches to any text element and animates on scroll entry.
 *
 * Usage:
 *   const ref = useTextReveal<HTMLHeadingElement>({ mode: 'mask' });
 *   <h1 ref={ref}>Architecture is memory.</h1>
 */

import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import {
  splitLines,
  splitWords,
  splitChars,
  animateMaskReveal,
  animateFadeUp,
  animateCharReveal,
  type TextRevealMode,
} from '../lib/gsap/text';

export type { TextRevealMode };

interface UseTextRevealOptions {
  mode?: TextRevealMode;
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  once?: boolean;
}

export function useTextReveal<T extends HTMLElement>({
  mode = 'mask',
  delay = 0,
  stagger = 0.07,
  duration = 1.0,
  start = 'top 85%',
  once = true,
}: UseTextRevealOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let split: { elements: HTMLElement[]; revert: () => void } | null = null;

    const ctx = gsap.context(() => {
      if (mode === 'mask') {
        split = splitLines(el);
        animateMaskReveal(split.elements, { delay, stagger, duration, trigger: el, start, once });
      } else if (mode === 'fade-up') {
        split = splitWords(el);
        animateFadeUp(split.elements, { delay, stagger, duration, trigger: el, start, once });
      } else if (mode === 'chars') {
        split = splitChars(el);
        animateCharReveal(split.elements, { delay, stagger: stagger * 0.4, duration: duration * 0.75, trigger: el, start, once });
      }
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [mode, delay, stagger, duration, start, once]);

  return ref;
}
