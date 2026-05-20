/**
 * AtmosphericLayer — Global cinematic ambiance layer
 *
 * Fixed, full-viewport, pointer-events-none overlay.
 * Two sub-layers:
 *   1. Ambient radial light bloom from the top (brass warmth)
 *   2. Cinematic vignette (edge darkening)
 *   3. Film grain (CSS animated, opacity driven by --grain-opacity)
 *
 * All three adapt when theme changes via CSS custom properties.
 * No JS required after initial mount — pure CSS transitions handle the change.
 *
 * GPU-safe: opacity + background only, no blur, no transform stacks.
 */

import { useTheme } from '../../../providers/ThemeProvider';
import { ATMOSPHERE } from '../../../lib/theme/atmosphere';

export function AtmosphericLayer() {
  const { mode } = useTheme();
  const atmo = ATMOSPHERE[mode];

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, isolation: 'isolate' }}
      aria-hidden="true"
    >
      {/* ① Radial ambient light — brass bloom from top */}
      <div
        className="absolute inset-0 theme-atmosphere-light"
        style={{
          background: atmo.radialLight,
          opacity: 1,
        }}
      />

      {/* ② Cinematic vignette — edges darken */}
      <div
        className="absolute inset-0 theme-atmosphere-vignette"
        style={{
          background: atmo.vignette,
          opacity: 1,
        }}
      />

      {/* ③ Film grain — ultra-subtle, GPU animated */}
      <div
        className={`absolute inset-0 ${atmo.grainClass} theme-grain-layer`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize:   '200px 200px',
          opacity:          'var(--grain-opacity, 0.025)',
          mixBlendMode:     'overlay',
        }}
      />
    </div>
  );
}
