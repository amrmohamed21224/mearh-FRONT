/**
 * MEARH Atmospheric Configuration
 *
 * Per-theme atmosphere settings for:
 *   - radial ambient light gradient (top of page)
 *   - cinematic vignette gradient (edges)
 *   - grain intensity CSS var
 *   - CSS class applied to grain layer
 */

import type { ThemeMode } from './palettes';

export interface AtmosphereConfig {
  /** Warm radial light bloom from the top-center */
  radialLight: string;
  /** Cinematic vignette darkening toward edges */
  vignette:    string;
  /** CSS animation class for grain layer */
  grainClass:  string;
  /** Background transition duration in ms */
  transitionMs: number;
}

export const ATMOSPHERE: Record<ThemeMode, AtmosphereConfig> = {
  light: {
    radialLight:  'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(181,146,76,0.05) 0%, transparent 70%)',
    vignette:     'radial-gradient(ellipse 130% 110% at 50% 50%, transparent 60%, rgba(30,28,26,0.08) 100%)',
    grainClass:   'grain-shift',
    transitionMs: 1200,
  },
  dark: {
    radialLight:  'radial-gradient(ellipse 75% 50% at 50% 0%, rgba(201,164,90,0.08) 0%, transparent 65%)',
    vignette:     'radial-gradient(ellipse 130% 110% at 50% 50%, transparent 38%, rgba(0,0,0,0.55) 100%)',
    grainClass:   'grain-shift grain-dark',
    transitionMs: 1200,
  },
};
