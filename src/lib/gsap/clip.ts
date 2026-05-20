/**
 * MEARH — Clip-Path Reveal Library
 * GPU-accelerated reveals using CSS clip-path.
 * Zero layout thrashing — only clip-path is animated.
 *
 * Supported directions:
 *   up, down, left, right   — directional wipes
 *   center                  — radial expand
 *   split-v                 — left+right split open
 *   split-h                 — top+bottom split open
 */

import { gsap, ScrollTrigger } from './index';

export type ClipDirection =
  | 'up' | 'down' | 'left' | 'right'
  | 'center' | 'split-v' | 'split-h';

export interface ClipRevealOptions {
  direction?: ClipDirection;
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
  trigger?: Element | null;
  start?: string;
  once?: boolean;
  scrub?: boolean | number;
  onComplete?: () => void;
}

// Clip-path keyframe pairs for each reveal direction
const CLIP_STATES: Record<ClipDirection, { from: string; to: string }> = {
  up:        { from: 'inset(100% 0% 0% 0%)',   to: 'inset(0% 0% 0% 0%)' },
  down:      { from: 'inset(0% 0% 100% 0%)',   to: 'inset(0% 0% 0% 0%)' },
  left:      { from: 'inset(0% 0% 0% 100%)',   to: 'inset(0% 0% 0% 0%)' },
  right:     { from: 'inset(0% 100% 0% 0%)',   to: 'inset(0% 0% 0% 0%)' },
  center:    { from: 'inset(50% 50% 50% 50%)', to: 'inset(0% 0% 0% 0%)' },
  'split-v': { from: 'inset(0% 50% 0% 50%)',   to: 'inset(0% 0% 0% 0%)' },
  'split-h': { from: 'inset(50% 0% 50% 0%)',   to: 'inset(0% 0% 0% 0%)' },
};

// ─── Single Element ───────────────────────────────────────────────────────────

/**
 * Reveal a single element via clip-path.
 * Primary tool for images, cards, hero sections.
 */
export function clipReveal(
  element: HTMLElement,
  options: ClipRevealOptions = {}
) {
  const {
    direction = 'up',
    duration = 1.2,
    ease = 'power4.inOut',
    delay = 0,
    trigger,
    start = 'top 80%',
    once = true,
    onComplete,
  } = options;

  const { from, to } = CLIP_STATES[direction];

  return gsap.fromTo(
    element,
    { clipPath: from },
    {
      clipPath: to,
      duration,
      ease,
      delay,
      onComplete,
      scrollTrigger: trigger
        ? { trigger, start, toggleActions: once ? 'play none none none' : 'play none none reverse' }
        : undefined,
    }
  );
}

// ─── Staggered Group ─────────────────────────────────────────────────────────

/**
 * Reveal multiple elements with staggered clip-path.
 * For project grids, collection cards, material tiles.
 */
export function clipRevealStagger(
  elements: HTMLElement[],
  options: ClipRevealOptions = {}
) {
  const {
    direction = 'up',
    duration = 1.1,
    ease = 'power4.out',
    delay = 0,
    stagger = 0.1,
    trigger,
    start = 'top 80%',
    once = true,
  } = options;

  const { from, to } = CLIP_STATES[direction];

  return gsap.fromTo(
    elements,
    { clipPath: from },
    {
      clipPath: to,
      duration,
      ease,
      delay,
      stagger,
      scrollTrigger: trigger
        ? { trigger, start, toggleActions: once ? 'play none none none' : 'play none none reverse' }
        : undefined,
    }
  );
}

// ─── Timeline-based Wipe ─────────────────────────────────────────────────────

/**
 * Panel wipe — fullscreen overlay that sweeps across then away.
 * For cinematic page/section transitions.
 *
 * Usage:
 *   const tl = panelWipe(overlayEl, 'left-to-right', { onMidpoint: loadContent });
 */
export function panelWipe(
  panel: HTMLElement,
  direction: 'left-to-right' | 'right-to-left' | 'top-to-bottom' = 'left-to-right',
  options: { duration?: number; ease?: string; onMidpoint?: () => void } = {}
): gsap.core.Timeline {
  const { duration = 0.85, ease = 'power4.inOut', onMidpoint } = options;

  const states = {
    'left-to-right': {
      enter: { from: 'inset(0% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
      exit:  { from: 'inset(0% 0% 0% 0%)',   to: 'inset(0% 0% 0% 100%)' },
    },
    'right-to-left': {
      enter: { from: 'inset(0% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' },
      exit:  { from: 'inset(0% 0% 0% 0%)',   to: 'inset(0% 100% 0% 0%)' },
    },
    'top-to-bottom': {
      enter: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
      exit:  { from: 'inset(0% 0% 0% 0%)',   to: 'inset(0% 0% 100% 0%)' },
    },
  };

  const { enter, exit } = states[direction];
  const tl = gsap.timeline();

  tl.fromTo(panel, { clipPath: enter.from }, { clipPath: enter.to, duration, ease })
    .call(() => onMidpoint?.())
    .fromTo(panel, { clipPath: exit.from }, { clipPath: exit.to, duration, ease });

  return tl;
}

// ─── Scrub Reveal ────────────────────────────────────────────────────────────

/**
 * Scroll-scrubbed clip-path reveal.
 * Image reveals as user scrolls — architectural/cinematic feel.
 */
export function clipScrubReveal(
  element: HTMLElement,
  options: { direction?: ClipDirection; trigger?: HTMLElement; start?: string; end?: string } = {}
) {
  const {
    direction = 'up',
    trigger = element,
    start = 'top 90%',
    end = 'top 40%',
  } = options;

  const { from, to } = CLIP_STATES[direction];

  return gsap.fromTo(
    element,
    { clipPath: from },
    {
      clipPath: to,
      ease: 'none',
      scrollTrigger: { trigger, start, end, scrub: 1 },
    }
  );
}

// ─── Cleanup ──────────────────────────────────────────────────────────────────

export function killClipReveal(trigger: HTMLElement) {
  ScrollTrigger.getAll()
    .filter((st) => st.trigger === trigger)
    .forEach((st) => st.kill());
}
