/**
 * MEARH Theme Palettes
 *
 * Two complete palette definitions:
 *   LIGHT_PALETTE — warm editorial daylight
 *   DARK_PALETTE  — architectural nocturnal atmosphere
 *
 * Not a simple inversion — each value is hand-tuned for
 * the brand's editorial luxury language at its respective time of day.
 */

export type ThemeMode = 'light' | 'dark';

// ─── Light: Warm Editorial Daylight ──────────────────────────────────────────

export const LIGHT_PALETTE = {
  // Backgrounds
  bg:          '#F7F4EE',
  bgSurface:   '#EDE8DF',
  bgMist:      '#E4E0D8',

  // Typography
  textPrimary:   '#1E1C1A',
  textSecondary: '#9B9185',
  textBody:      '#6B6560',

  // Accent
  brass:         '#B5924C',
  brassGlow:     'rgba(181,146,76,0.10)',
  brassBright:   '#B5924C',

  // Borders / dividers
  border:        'rgba(155,145,133,0.20)',
  borderStrong:  'rgba(155,145,133,0.40)',

  // Navigation
  navBg:         'rgba(247,244,238,0.95)',

  // Overlays
  overlay:       'rgba(30,28,26,0.55)',

  // Atmosphere
  grainOpacity:       0.022,
  vignetteStrength:   0.10,
  ambientOpacity:     0.06,
} as const;

// ─── Dark: Architectural Nocturnal Atmosphere ─────────────────────────────────

export const DARK_PALETTE = {
  // Backgrounds — deep warm architectural black, not cold
  bg:          '#0D0C0B',
  bgSurface:   '#191714',
  bgMist:      '#131210',

  // Typography — warm parchment, never pure white
  textPrimary:   '#E8E3D8',
  textSecondary: '#6B6560',
  textBody:      '#9B9185',

  // Accent — brass glows slightly brighter at night
  brass:         '#C9A45A',
  brassGlow:     'rgba(201,164,90,0.18)',
  brassBright:   '#D4AF65',

  // Borders — warm dark, never cold grey
  border:        'rgba(115,107,97,0.18)',
  borderStrong:  'rgba(115,107,97,0.35)',

  // Navigation — near-opaque architectural black
  navBg:         'rgba(13,12,11,0.97)',

  // Overlays — deep cinematic black
  overlay:       'rgba(0,0,0,0.65)',

  // Atmosphere — grain more visible at night (film effect)
  grainOpacity:     0.065,
  vignetteStrength: 0.50,
  ambientOpacity:   0.12,
} as const;

export type ThemePalette = typeof LIGHT_PALETTE;
