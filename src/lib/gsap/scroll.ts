/**
 * MEARH — Scroll Scene Engine
 * Reusable pinned scroll storytelling infrastructure.
 * Wraps GSAP ScrollTrigger in composable, cleanup-safe scene objects.
 *
 * Powers: ProjectStoryPage, hero storytelling, horizontal galleries,
 *         cinematic walkthroughs, ambient parallax layers.
 */

import { gsap, ScrollTrigger } from './index';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ScrollSceneConfig {
  trigger: HTMLElement;
  pin?: HTMLElement | boolean;
  /** Scroll distance. CSS string like '200%' or pixel value */
  duration?: string | number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  anticipatePin?: number;
  onUpdate?: (progress: number, direction: number) => void;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export interface ScrollScene {
  timeline: gsap.core.Timeline;
  scrollTrigger: ScrollTrigger;
  /** Add animation to the scene timeline */
  add: (animation: gsap.core.Tween | gsap.core.Timeline, position?: string | number) => void;
  kill: () => void;
}

// ─── Scene Factory ────────────────────────────────────────────────────────────

/**
 * createScrollScene
 * Creates a pinned scroll scene with an attached scrubbed timeline.
 *
 * Usage:
 *   const scene = createScrollScene({ trigger: sectionRef.current! });
 *   scene.add(gsap.to(imgEl, { scale: 1.2, ease: 'none' }));
 */
export function createScrollScene(config: ScrollSceneConfig): ScrollScene {
  const {
    trigger,
    pin = true,
    duration = '150%',
    start = 'top top',
    end,
    scrub = 1.2,
    anticipatePin = 1,
    onUpdate,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
  } = config;

  const timeline = gsap.timeline({ paused: true });

  const st = ScrollTrigger.create({
    trigger,
    pin: pin === true ? trigger : (pin || false),
    start,
    end: end ?? `+=${duration}`,
    scrub,
    anticipatePin,
    animation: timeline,
    onUpdate: self => onUpdate?.(self.progress, self.direction),
    onEnter: () => onEnter?.(),
    onLeave: () => onLeave?.(),
    onEnterBack: () => onEnterBack?.(),
    onLeaveBack: () => onLeaveBack?.(),
  });

  return {
    timeline,
    scrollTrigger: st,
    add: (anim, position) => { timeline.add(anim, position); },
    kill: () => { st.kill(); timeline.kill(); },
  };
}

// ─── Parallax Layer ───────────────────────────────────────────────────────────

/**
 * createParallaxLayer
 * Scroll-scrubbed vertical parallax for hero images and ambient layers.
 * Replaces Framer Motion useScroll+useTransform for better performance.
 *
 * Usage:
 *   createParallaxLayer(imgEl, { yStart: 0, yEnd: 25 });
 */
export function createParallaxLayer(
  element: HTMLElement,
  options: {
    yStart?: number;
    yEnd?: number;
    trigger?: HTMLElement;
    scrub?: number;
    start?: string;
    end?: string;
  } = {}
) {
  const {
    yStart = 0,
    yEnd = 20,
    trigger = element,
    scrub = 1,
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  return gsap.fromTo(
    element,
    { yPercent: yStart },
    {
      yPercent: yEnd,
      ease: 'none',
      scrollTrigger: { trigger, start, end, scrub },
    }
  );
}

// ─── Horizontal Scroll Gallery ────────────────────────────────────────────────

/**
 * createHorizontalScroll
 * Pins a section and scrolls a track horizontally.
 * For project showcases, material galleries, product collections.
 *
 * Usage:
 *   createHorizontalScroll(containerEl, trackEl, { duration: '300%' });
 */
export function createHorizontalScroll(
  container: HTMLElement,
  track: HTMLElement,
  options: { duration?: string; scrub?: number } = {}
) {
  const { duration = '300%', scrub = 1 } = options;

  // Calculate exact scroll distance from track's overflow width
  const getScrollWidth = () => track.scrollWidth - track.clientWidth;

  const tl = gsap.timeline();
  tl.to(track, {
    x: () => -getScrollWidth(),
    ease: 'none',
  });

  const st = ScrollTrigger.create({
    trigger: container,
    pin: true,
    start: 'top top',
    end: `+=${duration}`,
    scrub,
    animation: tl,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  });

  return {
    timeline: tl,
    scrollTrigger: st,
    kill: () => { st.kill(); tl.kill(); },
  };
}

// ─── Progress Tracker ─────────────────────────────────────────────────────────

/**
 * createProgressTracker
 * Calls onProgress(0–1) as user scrolls through a section.
 * For progress dots, reading indicators, chapter trackers.
 */
export function createProgressTracker(
  trigger: HTMLElement,
  onProgress: (progress: number) => void,
  options: { start?: string; end?: string } = {}
) {
  const { start = 'top top', end = 'bottom bottom' } = options;

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    onUpdate: self => onProgress(self.progress),
  });
}

// ─── Scene Sequence ───────────────────────────────────────────────────────────

/**
 * createSceneSequence
 * Orchestrates multiple scroll-triggered animations in a defined sequence.
 * Each step fires at a specific scroll progress threshold (0–1).
 *
 * Usage:
 *   createSceneSequence(trigger, [
 *     { progress: 0.0, animation: () => gsap.to(title, { opacity: 0 }) },
 *     { progress: 0.5, animation: () => gsap.from(img, { scale: 1.2 }) },
 *   ]);
 */
export function createSceneSequence(
  trigger: HTMLElement,
  steps: { progress: number; animation: () => void }[],
  options: { duration?: string; pin?: boolean } = {}
) {
  const { duration = '200%', pin = true } = options;

  const sorted = [...steps].sort((a, b) => a.progress - b.progress);
  let currentStep = -1;

  return ScrollTrigger.create({
    trigger,
    pin,
    start: 'top top',
    end: `+=${duration}`,
    onUpdate: (self) => {
      sorted.forEach((step, i) => {
        if (self.progress >= step.progress && i > currentStep) {
          currentStep = i;
          step.animation();
        }
      });
    },
    onLeaveBack: () => { currentStep = -1; },
  });
}
