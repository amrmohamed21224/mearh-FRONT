/**
 * MEARH — Cinematic Text Reveal Engine
 * Manual text splitting + GSAP animation.
 * No SplitText dependency (free GSAP tier compatible).
 *
 * Three reveal modes:
 *   mask    — line slides up from inside overflow:hidden (editorial/Apple style)
 *   fade-up — words fade up (editorial body text)
 *   chars   — character stagger (hero wordmarks)
 */

import { gsap, ScrollTrigger } from './index';

export type TextRevealMode = 'mask' | 'fade-up' | 'chars';

export interface SplitResult {
  elements: HTMLElement[];
  revert: () => void;
}

export interface TextAnimOptions {
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  y?: number;
  trigger?: Element | null;
  start?: string;
  once?: boolean;
  onComplete?: () => void;
}

// ─── Splitters ────────────────────────────────────────────────────────────────

/**
 * Split element into word spans wrapped in overflow:hidden containers.
 * Each word is independently animatable.
 */
export function splitWords(el: HTMLElement): SplitResult {
  const original = el.innerHTML;
  const words = (el.textContent ?? '').split(/\s+/).filter(Boolean);

  el.innerHTML = words
    .map(
      (w) =>
        `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
        `<span class="gsap-word" style="display:inline-block;">${w}</span>` +
        `</span>&nbsp;`
    )
    .join('');

  return {
    elements: Array.from(el.querySelectorAll<HTMLElement>('.gsap-word')),
    revert: () => { el.innerHTML = original; },
  };
}

/**
 * Split element into character spans.
 * For hero wordmarks and short labels.
 */
export function splitChars(el: HTMLElement): SplitResult {
  const original = el.innerHTML;
  const chars = (el.textContent ?? '').split('');

  el.innerHTML = chars
    .map((c) =>
      c === ' '
        ? `<span style="display:inline-block;width:0.3em;"> </span>`
        : `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
          `<span class="gsap-char" style="display:inline-block;">${c}</span>` +
          `</span>`
    )
    .join('');

  return {
    elements: Array.from(el.querySelectorAll<HTMLElement>('.gsap-char')),
    revert: () => { el.innerHTML = original; },
  };
}

/**
 * Split element into lines by detecting word Y positions.
 * Wraps each detected line in overflow:hidden for mask reveal.
 * Most impactful for large editorial headings.
 */
export function splitLines(el: HTMLElement): SplitResult {
  const original = el.innerHTML;
  const words = (el.textContent ?? '').split(/\s+/).filter(Boolean);

  // Phase 1: temp word spans to detect line breaks
  el.innerHTML = words
    .map((w) => `<span class="line-probe" style="display:inline;">${w} </span>`)
    .join('');

  const probes = Array.from(el.querySelectorAll<HTMLElement>('.line-probe'));
  const lines: string[][] = [];
  let currentLine: string[] = [];
  let prevY = -1;

  probes.forEach((probe) => {
    const y = Math.round(probe.getBoundingClientRect().top);
    if (prevY === -1 || Math.abs(y - prevY) < 4) {
      currentLine.push(probe.textContent?.trim() ?? '');
    } else {
      if (currentLine.length) lines.push(currentLine);
      currentLine = [probe.textContent?.trim() ?? ''];
    }
    prevY = y;
  });
  if (currentLine.length) lines.push(currentLine);

  // Phase 2: rebuild with overflow:hidden line wrappers
  el.innerHTML = lines
    .map(
      (words) =>
        `<span style="display:block;overflow:hidden;line-height:inherit;">` +
        `<span class="gsap-line" style="display:block;">${words.join(' ')}</span>` +
        `</span>`
    )
    .join('');

  return {
    elements: Array.from(el.querySelectorAll<HTMLElement>('.gsap-line')),
    revert: () => { el.innerHTML = original; },
  };
}

// ─── Animators ────────────────────────────────────────────────────────────────

/**
 * MASK REVEAL — elements slide up from y=100% inside overflow:hidden parent.
 * This is the primary editorial reveal. Apple/luxury editorial style.
 */
export function animateMaskReveal(
  elements: HTMLElement[],
  options: TextAnimOptions = {}
) {
  const {
    delay = 0,
    stagger = 0.07,
    duration = 1.0,
    ease = 'power4.out',
    trigger,
    start = 'top 85%',
    once = true,
    onComplete,
  } = options;

  return gsap.fromTo(
    elements,
    { yPercent: 105 },
    {
      yPercent: 0,
      duration,
      ease,
      stagger,
      delay,
      onComplete,
      scrollTrigger: trigger
        ? { trigger, start, toggleActions: once ? 'play none none none' : 'play none none reverse' }
        : undefined,
    }
  );
}

/**
 * FADE-UP REVEAL — words fade in and rise.
 * For body text, captions, supporting copy.
 */
export function animateFadeUp(
  elements: HTMLElement[],
  options: TextAnimOptions = {}
) {
  const {
    delay = 0,
    stagger = 0.04,
    duration = 0.9,
    ease = 'power3.out',
    y = 30,
    trigger,
    start = 'top 88%',
    once = true,
    onComplete,
  } = options;

  return gsap.fromTo(
    elements,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      ease,
      stagger,
      delay,
      onComplete,
      scrollTrigger: trigger
        ? { trigger, start, toggleActions: once ? 'play none none none' : 'play none none reverse' }
        : undefined,
    }
  );
}

/**
 * CHAR REVEAL — staggered character entrance.
 * For hero wordmarks, short labels, MEARH logotype.
 */
export function animateCharReveal(
  elements: HTMLElement[],
  options: TextAnimOptions = {}
) {
  const {
    delay = 0,
    stagger = 0.025,
    duration = 0.65,
    ease = 'power3.out',
    y = 20,
    trigger,
    start = 'top 90%',
    once = true,
  } = options;

  return gsap.fromTo(
    elements,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      ease,
      stagger: { each: stagger, from: 'start' },
      delay,
      scrollTrigger: trigger
        ? { trigger, start, toggleActions: once ? 'play none none none' : 'play none none reverse' }
        : undefined,
    }
  );
}

// ─── Cleanup ──────────────────────────────────────────────────────────────────

/** Kill all ScrollTriggers associated with a trigger element */
export function killTextReveal(trigger: HTMLElement) {
  ScrollTrigger.getAll()
    .filter((st) => st.trigger === trigger)
    .forEach((st) => st.kill());
}
