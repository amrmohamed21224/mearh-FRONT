/**
 * useClipReveal
 * GSAP clip-path reveal hook for images and block elements.
 *
 * Usage:
 *   const ref = useClipReveal<HTMLDivElement>({ direction: 'up' });
 *   <div ref={ref}><img src={...} /></div>
 */

import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { clipReveal, type ClipDirection } from '../lib/gsap/clip';

export type { ClipDirection };

interface UseClipRevealOptions {
  direction?: ClipDirection;
  duration?: number;
  ease?: string;
  delay?: number;
  start?: string;
  once?: boolean;
}

export function useClipReveal<T extends HTMLElement>({
  direction = 'up',
  duration = 1.2,
  ease = 'power4.out',
  delay = 0,
  start = 'top 80%',
  once = true,
}: UseClipRevealOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      clipReveal(el, { direction, duration, ease, delay, trigger: el, start, once });
    }, el);

    return () => ctx.revert();
  }, [direction, duration, ease, delay, start, once]);

  return ref;
}
