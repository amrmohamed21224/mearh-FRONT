/**
 * MEARH Motion System
 * Centralized Framer Motion variant and transition presets.
 * All values exactly match the current production codebase.
 * Future: GSAP timeline hooks will live in src/lib/gsap/
 */

import type { Variants, Transition } from 'motion/react';
import { motion as tokens } from './tokens';

// ─── TRANSITIONS ─────────────────────────────────────────────────────────────

export const transitions = {
  luxury: {
    duration: tokens.duration.slow,
    ease: tokens.ease.luxury,
  } satisfies Transition,

  sharp: {
    duration: tokens.duration.normal,
    ease: tokens.ease.sharp,
  } satisfies Transition,

  fast: {
    duration: tokens.duration.fast,
  } satisfies Transition,

  cinematic: {
    duration: tokens.duration.cinematic,
    ease: tokens.ease.luxury,
  } satisfies Transition,

  dramatic: {
    duration: tokens.duration.dramatic,
    ease: tokens.ease.luxury,
  } satisfies Transition,

  page: {
    duration: 0.5,
    ease: tokens.ease.luxury,
  } satisfies Transition,

  spring: tokens.spring.snappy satisfies Transition,
  springGentle: tokens.spring.gentle satisfies Transition,
  springBouncy: tokens.spring.bouncy satisfies Transition,
};

// ─── PAGE TRANSITIONS ─────────────────────────────────────────────────────────

/** Used in App.tsx PageWrapper — wraps every route */
export const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
};

export const pageTransition: Transition = {
  duration: 0.5,
  ease: tokens.ease.luxury,
};

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────

/** Base scroll reveal — matches current ScrollReveal.tsx behavior exactly */
export const revealUp = (delay = 0): { initial: object; animate: object } => ({
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: tokens.duration.cinematic,
      delay,
      ease: tokens.ease.luxury,
    },
  },
});

export const revealLeft = (delay = 0): { initial: object; animate: object } => ({
  initial: { opacity: 0, x: -40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: tokens.duration.cinematic,
      delay,
      ease: tokens.ease.luxury,
    },
  },
});

export const revealRight = (delay = 0): { initial: object; animate: object } => ({
  initial: { opacity: 0, x: 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: tokens.duration.cinematic,
      delay,
      ease: tokens.ease.luxury,
    },
  },
});

export const revealFade = (delay = 0): { initial: object; animate: object } => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: tokens.duration.cinematic,
      delay,
      ease: tokens.ease.luxury,
    },
  },
});

// ─── STAGGER HELPERS ─────────────────────────────────────────────────────────

/** Wraps a list of children with staggered entrance */
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  initial: {},
  animate: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Index-based delay — used for nav items, team grid, etc. */
export const itemDelay = (i: number, base = 0.07): number => i * base;

// ─── COMMON HOVER PRESETS ────────────────────────────────────────────────────

export const hover = {
  /** Slide right on hover — links, CTAs */
  slideRight: (amount = 4) => ({ x: amount }),
  /** Slide left on hover — back buttons */
  slideLeft: (amount = -3) => ({ x: amount }),
  /** Scale up slightly — gallery images */
  scaleUp: (amount = 1.06) => ({ scale: amount }),
  scaleUpSlight: () => ({ scale: 1.01 }),
  /** Lift card — product grid */
  liftCard: (amount = -4) => ({ y: amount }),
  liftCardSm: (amount = -3) => ({ y: amount }),
} as const;

// ─── COMPONENT-SPECIFIC VARIANTS ─────────────────────────────────────────────

/** Navigation mobile menu backdrop */
export const mobileMenuVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.4 } },
};

/** Navigation mobile menu items (indexed) */
export const mobileMenuItemStyle = (i: number) => ({
  initial:    { x: -30, opacity: 0 },
  animate:    { x: 0, opacity: 1 },
  transition: { delay: i * 0.07, duration: 0.5, ease: tokens.ease.sharp },
});

/** Material detail panel — slides in from right */
export const slidePanelVariants: Variants = {
  initial: { x: '100%' },
  animate: { x: 0,      transition: { duration: 0.6, ease: tokens.ease.luxury } },
  exit:    { x: '100%', transition: { duration: 0.6, ease: tokens.ease.luxury } },
};

/** Step wizard (Consultation, AI Analyzer, Checkout) */
export const stepVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.4, ease: tokens.ease.luxury } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

/** Filter grid items (AnimatePresence popLayout) */
export const filterItemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0 },
};

/** Product / collection card entrance */
export const cardEntranceVariants: Variants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  exit:    { opacity: 0, scale: 0.95 },
};

/** Loading screen curtain panel */
export const curtainVariants = {
  reveal: { scaleX: 0 },
  hidden: { scaleX: 1 },
};

/** Loading screen content exit */
export const loadingContentExit = {
  reveal: { y: -20, opacity: 0 },
  hidden: { y: 0, opacity: 1 },
};

/** Generic backdrop overlay fade */
export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
};

// ─── FUTURE GSAP BRIDGE ──────────────────────────────────────────────────────
// GSAP timeline presets will live in: src/lib/gsap/timelines.ts
// Lenis scroll integration: src/providers/SmoothScrollProvider.tsx
// ScrollTrigger hooks: src/hooks/useScrollTrigger.ts
