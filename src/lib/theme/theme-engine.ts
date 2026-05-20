/**
 * MEARH Theme Engine
 *
 * Centralized theme logic:
 *   - OS preference detection
 *   - localStorage persistence
 *   - CSS custom property injection onto <html>
 *   - .dark class toggle for CSS selectors
 *
 * CSS properties injected:
 *   --color-bg, --color-surface, --color-mist
 *   --color-text-primary, --color-text-secondary, --color-text-body
 *   --color-brass, --color-brass-glow, --color-brass-bright
 *   --color-border, --color-border-strong
 *   --color-nav-bg, --color-overlay
 *   --grain-opacity, --vignette-strength, --ambient-opacity
 */

import {
  LIGHT_PALETTE,
  DARK_PALETTE,
  type ThemeMode,
  type ThemePalette,
} from './palettes';

export type { ThemeMode };

const STORAGE_KEY = 'mearh-theme';

// ─── Persistence ──────────────────────────────────────────────────────────────

export function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  if (stored === 'dark' || stored === 'light') return stored;
  // Fall back to OS preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function storeTheme(mode: ThemeMode): void {
  localStorage.setItem(STORAGE_KEY, mode);
}

// ─── Palette accessor ─────────────────────────────────────────────────────────

export function getPalette(mode: ThemeMode): ThemePalette {
  return mode === 'dark' ? DARK_PALETTE : LIGHT_PALETTE;
}

// ─── DOM injection ────────────────────────────────────────────────────────────

/**
 * Writes all theme values as CSS custom properties to <html>.
 * Every component that wants theme-reactive CSS reads var(--color-*).
 * GPU-safe: no layout-triggering properties.
 */
export function applyThemeToDom(mode: ThemeMode): void {
  const root = document.documentElement;
  const p    = getPalette(mode);

  // Backgrounds
  root.style.setProperty('--color-bg',           p.bg);
  root.style.setProperty('--color-surface',       p.bgSurface);
  root.style.setProperty('--color-mist',          p.bgMist);

  // Typography
  root.style.setProperty('--color-text-primary',   p.textPrimary);
  root.style.setProperty('--color-text-secondary', p.textSecondary);
  root.style.setProperty('--color-text-body',      p.textBody);

  // Brass accent
  root.style.setProperty('--color-brass',         p.brass);
  root.style.setProperty('--color-brass-glow',    p.brassGlow);
  root.style.setProperty('--color-brass-bright',  p.brassBright);

  // Borders
  root.style.setProperty('--color-border',        p.border);
  root.style.setProperty('--color-border-strong', p.borderStrong);

  // Navigation / overlays
  root.style.setProperty('--color-nav-bg',        p.navBg);
  root.style.setProperty('--color-overlay',       p.overlay);

  // Atmospheric floats
  root.style.setProperty('--grain-opacity',      String(p.grainOpacity));
  root.style.setProperty('--vignette-strength',  String(p.vignetteStrength));
  root.style.setProperty('--ambient-opacity',    String(p.ambientOpacity));

  // CSS class for selectors
  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
