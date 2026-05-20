/**
 * MEARH Design Token System
 * Single source of truth for all brand values.
 * Import from here — never hardcode hex strings in components.
 */

// ─── COLORS ────────────────────────────────────────────────────────────────

export const colors = {
  // ── Backgrounds
  charcoal: '#1E1C1A',         // Primary dark bg (pages, footer, mobile menu)
  parchment: '#F7F4EE',        // Primary light bg
  warmMist: '#E4E0D8',         // Section bg alternate (editorial product section)
  warmStone: '#EDE8DF',        // Card bg / analysis blocks
  warmStoneDark: '#2E2C2A',    // Charcoal hover state

  // ── Text
  stoneTaupe: '#9B9185',       // Secondary text, muted labels
  warmSienna: '#6B6560',       // Body text (light mode)

  // ── Brand Accent
  brass: '#B5924C',            // Primary brand accent — CTA, dividers, highlights
  brassDeep: '#9B7A3C',        // Brass hover / pressed state

  // ── Semantic overlays (rgba variants — use for backgrounds and borders)
  brassSubtle: 'rgba(181,146,76,0.05)',
  brassSubtleHover: 'rgba(181,146,76,0.1)',
  brassLine: 'rgba(181,146,76,0.4)',

  // ── Parchment opacity stack (text on dark)
  parchment70: 'rgba(247,244,238,0.7)',
  parchment55: 'rgba(247,244,238,0.55)',
  parchment50: 'rgba(247,244,238,0.5)',
  parchment40: 'rgba(247,244,238,0.4)',
  parchment30: 'rgba(247,244,238,0.3)',

  // ── Stone opacity stack (borders, dividers, subtle UI)
  stone60: 'rgba(155,145,133,0.6)',
  stone50: 'rgba(155,145,133,0.5)',
  stone40: 'rgba(155,145,133,0.4)',
  stone20: 'rgba(155,145,133,0.2)',
  stone15: 'rgba(155,145,133,0.15)',
  stone12: 'rgba(155,145,133,0.12)',
  stone10: 'rgba(155,145,133,0.1)',
  stone08: 'rgba(155,145,133,0.08)',
  stone06: 'rgba(155,145,133,0.06)',
  stone04: 'rgba(155,145,133,0.04)',

  // ── Charcoal opacity stack (overlays, glassmorphism)
  charcoalNav: 'rgba(30,28,26,0.92)',
  charcoalFilterDark: 'rgba(30,28,26,0.95)',
  charcoalBackdrop: 'rgba(30,28,26,0.7)',
  charcoalHeroTop: 'rgba(30,28,26,0.35)',
  charcoalHeroMid: 'rgba(30,28,26,0.1)',
  charcoalHeroBottom: 'rgba(30,28,26,0.55)',

  // ── Parchment opacity stack (glassmorphism light)
  parchmentFilter: 'rgba(247,244,238,0.95)',

  // ── Utility
  transparent: 'transparent',
} as const;

// ─── TYPOGRAPHY ─────────────────────────────────────────────────────────────

export const fonts = {
  serif: "'Cormorant Garamond', serif",
  sans: "'DM Sans', sans-serif",
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
  },
} as const;

export const type = {
  // Hero scales (clamp — fluid responsive)
  heroXl:   'clamp(3.5rem, 9vw, 9rem)',      // HomePage hero H1
  heroLg:   'clamp(3rem, 9vw, 8rem)',        // About/Projects hero H1
  heroMd:   'clamp(2.5rem, 6vw, 5.5rem)',    // AI Analyzer, Consultation H1
  heroSm:   'clamp(2.5rem, 5vw, 4rem)',      // Product detail H1

  // Section headlines
  sectionXl: 'clamp(2.5rem, 5vw, 4.5rem)',  // Featured projects, collections
  sectionLg: 'clamp(2rem, 4vw, 3.5rem)',    // Material explorer
  sectionMd: 'clamp(2rem, 4vw, 3.2rem)',    // Manifesto, story chapters
  sectionSm: 'clamp(1.8rem, 3.5vw, 2.8rem)', // About manifesto body

  // Component-level
  h3:        '1.8rem',
  h3Sm:      '1.5rem',
  h3Xs:      '1.2rem',
  price:     '2.2rem',
  priceXl:   '2.4rem',
  stat:      'clamp(2.5rem, 5vw, 4.5rem)',
  statXl:    'clamp(3rem, 5vw, 4.5rem)',

  // Body
  bodyLg:    '0.88rem',
  bodyMd:    '0.82rem',
  bodySm:    '0.78rem',
  bodyXs:    '0.75rem',

  // UI labels
  labelLg:   '0.72rem',
  labelMd:   '0.65rem',
  label:     '0.6rem',
  labelSm:   '0.55rem',

  // Letter spacing
  tracking: {
    brand:   '0.4em',    // MEARH wordmark
    wide:    '0.3em',    // Section labels
    mid:     '0.2em',    // Step labels
    normal:  '0.15em',   // Nav links, CTAs
    tight:   '0.1em',    // Misc labels
    xs:      '0.05em',   // Captions
  },

  lineHeight: {
    hero:    0.9,
    headline: 1.1,
    title:   1.2,
    body:    1.8,
    bodyWide: 1.9,
    bodyXl:  2.0,
  },
} as const;

// ─── SPACING ────────────────────────────────────────────────────────────────

export const spacing = {
  // Section vertical rhythm
  sectionXl:  '12rem',   // py-48
  sectionLg:  '10rem',   // py-40
  sectionMd:  '8rem',    // py-32
  sectionSm:  '6rem',    // py-24
  sectionXs:  '4rem',    // py-16

  // Nav clearance (top padding for pages under fixed nav)
  navClear:   '11rem',   // pt-44 (most pages)
  navClearLg: '10rem',   // pt-40 (homepage)
  navClearSm: '9rem',    // pt-36

  // Container max-widths
  containerXl: '80rem',
  containerLg: '64rem',
  containerMd: '56rem',
  containerSm: '48rem',
  containerXs: '40rem',
} as const;

// ─── Z-INDEX ────────────────────────────────────────────────────────────────

export const zIndex = {
  loading:       10000,  // LoadingScreen overlay
  cursorMain:     9999,  // CustomCursor primary dot
  cursorTrail:    9998,  // CustomCursor trail dot
  materialPanel:   600,  // Material detail slide-in panel
  nav:             500,  // Fixed navigation header
  mobileMenu:      499,  // Mobile fullscreen menu
  backButton:       50,  // Floating back button (ProjectStoryPage)
  stickyFilter:     40,  // Sticky filter bars (Projects, Collections, Materials)
  sectionOverlay:   10,  // Hero/section dark overlays
  base:              0,
} as const;

// ─── BLUR ───────────────────────────────────────────────────────────────────

export const blur = {
  nav:       'blur(20px)',
  filter:    'blur(12px)',
  backdrop:  'blur(8px)',
  material:  'blur(10px)',
} as const;

// ─── MOTION ─────────────────────────────────────────────────────────────────

export const motion = {
  duration: {
    instant:    0.15,
    fast:       0.2,
    normal:     0.4,
    slow:       0.6,
    cinematic:  0.9,
    dramatic:   1.2,
    epic:       1.5,
  },

  ease: {
    /** Primary luxury ease — all reveals, transitions, panels */
    luxury:  [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    /** Sharp cubic — nav scrolled state, curtain, hard cuts */
    sharp:   [0.76, 0, 0.24, 1] as [number, number, number, number],
    /** Smooth in-out — general purpose */
    smooth:  [0.45, 0, 0.55, 1] as [number, number, number, number],
    /** Ease out — entrances */
    out:     [0, 0, 0.2, 1] as [number, number, number, number],
    /** Ease in — exits */
    in:      [0.4, 0, 1, 1] as [number, number, number, number],
    linear:  'linear' as const,
    easeOut: 'easeOut' as const,
    easeInOut: 'easeInOut' as const,
  },

  spring: {
    /** Cursor main — light, responsive */
    cursorPrimary: { damping: 40, stiffness: 700, mass: 0.15 },
    /** Cursor trail — heavier, delayed */
    cursorTrail:   { damping: 38, stiffness: 350, mass: 0.45 },
    /** Snappy UI — buttons, accordion */
    snappy:        { type: 'spring' as const, damping: 20, stiffness: 400 },
    /** Gentle layout — panels, reveals */
    gentle:        { type: 'spring' as const, damping: 25, stiffness: 200 },
    /** Bouncy confirm — success states */
    bouncy:        { type: 'spring' as const, stiffness: 300, damping: 20 },
  },

  // Scroll parallax range definitions (for useTransform)
  parallax: {
    heroImage:    { input: [0, 1] as [number, number], output: ['0%', '25%'] as [string, string] },
    heroText:     { input: [0, 1] as [number, number], output: ['0%', '40%'] as [string, string] },
    heroOpacity:  { input: [0, 0.6] as [number, number], output: [1, 0] as [number, number] },
    heroOpacityLg:{ input: [0, 0.7] as [number, number], output: [1, 0] as [number, number] },
    sectionFloat: { input: [0, 1] as [number, number], output: [80, -80] as [number, number] },
  },
} as const;
