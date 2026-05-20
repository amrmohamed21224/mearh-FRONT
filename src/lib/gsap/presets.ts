/**
 * MEARH — Expanded GSAP Presets
 * Cinematic easing, timeline configs, ScrollTrigger presets.
 * All values reference brand motion tokens.
 */

// ─── Easing ───────────────────────────────────────────────────────────────────

export const gsapEase = {
  /** Primary luxury — all major reveals, panels, page transitions */
  luxury:     'power4.inOut',
  /** Sharp architectural — curtain, hard cuts, nav state */
  sharp:      'power4.out',
  /** Soft out — body text, captions, supporting elements */
  soft:       'power2.out',
  /** Standard out — most UI transitions */
  out:        'power3.out',
  /** Standard in — exits */
  in:         'power3.in',
  /** None — scrub parallax, scroll-linked values */
  linear:     'none',
  /** Elastic — very sparingly, success states only */
  elastic:    'elastic.out(1, 0.5)',
} as const;

// ─── Duration Presets ─────────────────────────────────────────────────────────

export const gsapDuration = {
  instant:    0.15,
  fast:       0.25,
  ui:         0.4,
  reveal:     0.9,
  cinematic:  1.2,
  dramatic:   1.6,
  epic:       2.0,
} as const;

// ─── Timeline Defaults ────────────────────────────────────────────────────────

export const timelineDefaults = {
  reveal: {
    defaults: { ease: gsapEase.soft,    duration: gsapDuration.reveal    },
  },
  stagger: {
    defaults: { ease: gsapEase.out,     duration: gsapDuration.reveal    },
    stagger:  0.08,
  },
  cinematic: {
    defaults: { ease: gsapEase.luxury,  duration: gsapDuration.cinematic },
  },
  dramatic: {
    defaults: { ease: gsapEase.luxury,  duration: gsapDuration.dramatic  },
  },
} as const;

// ─── ScrollTrigger Config Presets ─────────────────────────────────────────────

export const scrollTriggerPresets = {
  /** Standard scroll reveal — element enters at 80% viewport */
  reveal: {
    start: 'top 80%',
    toggleActions: 'play none none none',
  },
  /** Reverse-capable — plays in and out */
  revealReverse: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },
  /** Scrub parallax — synced to scroll position */
  scrub: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
  /** Fast scrub — tighter sync, less lag */
  scrubFast: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: 0.3,
  },
  /** Pinned scene — element stays fixed while timeline plays */
  pin: {
    start: 'top top',
    end: '+=200%',
    pin: true,
    anticipatePin: 1,
    scrub: 1.2,
  },
  /** Pinned hero — shorter duration */
  pinHero: {
    start: 'top top',
    end: '+=100%',
    pin: true,
    anticipatePin: 1,
    scrub: 1,
  },
} as const;

// ─── Stagger Presets ──────────────────────────────────────────────────────────

export const stagger = {
  /** Fine — chars, micro elements */
  fine:     0.025,
  /** Tight — words, small icons */
  tight:    0.05,
  /** Normal — list items, grid cards */
  normal:   0.08,
  /** Wide — large sections, project tiles */
  wide:     0.12,
  /** Dramatic — hero sequences */
  dramatic: 0.18,
} as const;

// ─── Reveal Presets ───────────────────────────────────────────────────────────

/** Pre-built fromTo config pairs. Spread into gsap.fromTo() calls. */
export const revealPresets = {
  fadeUp: {
    from: { opacity: 0, y: 40 },
    to:   { opacity: 1, y: 0 },
  },
  fadeLeft: {
    from: { opacity: 0, x: -40 },
    to:   { opacity: 1, x: 0 },
  },
  fadeRight: {
    from: { opacity: 0, x: 40 },
    to:   { opacity: 1, x: 0 },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.92 },
    to:   { opacity: 1, scale: 1 },
  },
  maskUp: {
    from: { yPercent: 105 },
    to:   { yPercent: 0 },
  },
  clipUp: {
    from: { clipPath: 'inset(100% 0% 0% 0%)' },
    to:   { clipPath: 'inset(0% 0% 0% 0%)' },
  },
  clipSplit: {
    from: { clipPath: 'inset(0% 50% 0% 50%)' },
    to:   { clipPath: 'inset(0% 0% 0% 0%)' },
  },
} as const;
