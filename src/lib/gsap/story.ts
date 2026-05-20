/**
 * MEARH — Story Scene Composition Engine
 * Extends scroll.ts with project storytelling primitives.
 *
 * Provides:
 *   buildHeroTimeline    — Cinematic hero entrance sequence
 *   buildParallaxScene   — Scrubbed image + text depth separation
 *   buildRevealSequence  — Staggered element entrance off scroll
 *   buildScrubProgress   — Ties a progress element to scroll position
 *   killStoryScenes      — Memory-safe cleanup for all story triggers
 */

import { gsap, ScrollTrigger } from './index';

// ─── Hero Entrance Timeline ───────────────────────────────────────────────────

/**
 * buildHeroTimeline
 * Plays a cinematic entrance sequence on mount.
 * Used by HeroScene — not scroll-driven, fires once on load.
 */
export interface HeroTimelineOptions {
  imageLayer:    HTMLElement;
  overlayLayer:  HTMLElement;
  labelEl:       HTMLElement;
  titleLines:    HTMLElement[];
  metaEl:        HTMLElement;
  onComplete?:   () => void;
}

export function buildHeroTimeline(opts: HeroTimelineOptions): gsap.core.Timeline {
  const { imageLayer, overlayLayer, labelEl, titleLines, metaEl, onComplete } = opts;

  const tl = gsap.timeline({
    defaults: { ease: 'power4.out' },
    onComplete,
  });

  // 1. Image curtain reveal — architectural inset wipe
  tl.fromTo(imageLayer,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'power4.inOut' },
    0
  );

  // 2. Atmospheric overlay fades in
  tl.fromTo(overlayLayer,
    { opacity: 0 },
    { opacity: 1, duration: 1.4 },
    0.3
  );

  // 3. Studio label
  tl.fromTo(labelEl,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.9 },
    1.1
  );

  // 4. H1 mask reveal — each line slides up
  if (titleLines.length) {
    tl.fromTo(titleLines,
      { yPercent: 110 },
      { yPercent: 0, duration: 1.05, stagger: 0.13 },
      1.5
    );
  }

  // 5. Meta bar fades up
  tl.fromTo(metaEl,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 },
    2.3
  );

  return tl;
}

// ─── Parallax Scene ───────────────────────────────────────────────────────────

/**
 * buildParallaxScene
 * Separates background and foreground elements at different scrub speeds.
 * Called inside gsap.context() — returns cleanup-safe triggers array.
 */
export interface ParallaxSceneOptions {
  trigger:     HTMLElement;
  background:  HTMLElement;
  foreground?: HTMLElement;
  bgYEnd?:     number;  // default 20
  fgYEnd?:     number;  // default 35
  scrub?:      number;
}

export function buildParallaxScene(opts: ParallaxSceneOptions): ScrollTrigger[] {
  const {
    trigger,
    background,
    foreground,
    bgYEnd  = 20,
    fgYEnd  = 35,
    scrub   = 1.2,
  } = opts;

  const triggers: ScrollTrigger[] = [];

  // Background — slower, creates depth
  const bgST = gsap.fromTo(background,
    { yPercent: -bgYEnd / 2 },
    {
      yPercent: bgYEnd / 2,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
        invalidateOnRefresh: true,
      },
    }
  ).scrollTrigger;
  if (bgST) triggers.push(bgST);

  // Foreground — faster, accentuates depth
  if (foreground) {
    const fgST = gsap.fromTo(foreground,
      { yPercent: 0 },
      {
        yPercent: fgYEnd,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: '60% top',
          scrub: 1,
        },
      }
    ).scrollTrigger;
    if (fgST) triggers.push(fgST);
  }

  return triggers;
}

// ─── Reveal Sequence ─────────────────────────────────────────────────────────

/**
 * buildRevealSequence
 * Staggered fade-up reveal for multiple elements triggered by scroll.
 * Used by text chapters, stat grids, credit sections.
 */
export interface RevealSequenceOptions {
  elements:  HTMLElement[] | NodeListOf<HTMLElement>;
  trigger?:  HTMLElement;
  start?:    string;
  stagger?:  number;
  duration?: number;
  y?:        number;
  once?:     boolean;
}

export function buildRevealSequence(opts: RevealSequenceOptions): ScrollTrigger | undefined {
  const {
    elements,
    trigger,
    start    = 'top 80%',
    stagger  = 0.1,
    duration = 0.9,
    y        = 32,
    once     = true,
  } = opts;

  const els = Array.from(elements) as HTMLElement[];
  if (!els.length) return;

  return gsap.fromTo(
    els,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            toggleActions: once
              ? 'play none none none'
              : 'play none none reverse',
          }
        : undefined,
    }
  ).scrollTrigger;
}

// ─── Scrub Progress ───────────────────────────────────────────────────────────

/**
 * buildScrubProgress
 * Ties a progress bar element's scaleX to a section's scroll position.
 * Used by StoryProgress rail and chapter progress bars.
 */
export function buildScrubProgress(
  progressEl: HTMLElement,
  trigger: HTMLElement,
  options: { start?: string; end?: string } = {}
): ScrollTrigger {
  const { start = 'top center', end = 'bottom center' } = options;

  gsap.set(progressEl, { scaleX: 0, transformOrigin: 'left center' });

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    scrub: 0.4,
    onUpdate: (self) => {
      gsap.set(progressEl, { scaleX: self.progress });
    },
  });
}

// ─── Clip Wipe Transition ────────────────────────────────────────────────────

/**
 * buildClipTransition
 * Scrubbed clip-path that reveals an element as user scrolls past its trigger.
 * Used between chapters for cinematic continuity.
 */
export function buildClipTransition(
  element: HTMLElement,
  trigger: HTMLElement,
  options: {
    direction?: 'up' | 'left' | 'center';
    start?: string;
    end?: string;
  } = {}
): ScrollTrigger {
  const { direction = 'up', start = 'top 85%', end = 'top 30%' } = options;

  const STATES = {
    up:     { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
    left:   { from: 'inset(0% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' },
    center: { from: 'inset(50% 50% 50% 50%)', to: 'inset(0% 0% 0% 0%)' },
  };

  const { from, to } = STATES[direction];

  return gsap.fromTo(
    element,
    { clipPath: from },
    {
      clipPath: to,
      ease: 'none',
      scrollTrigger: { trigger, start, end, scrub: 1.2 },
    }
  ).scrollTrigger!;
}

// ─── Cleanup ──────────────────────────────────────────────────────────────────

/** Kill all ScrollTriggers whose trigger is inside a given root element */
export function killStoryScenes(root: HTMLElement) {
  ScrollTrigger.getAll()
    .filter((st) => st.trigger instanceof Element && root.contains(st.trigger))
    .forEach((st) => st.kill());
}
