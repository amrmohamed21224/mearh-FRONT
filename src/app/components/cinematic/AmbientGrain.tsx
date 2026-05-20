/**
 * AmbientGrain — CSS-only Film Grain Overlay
 *
 * Ultra-light animated noise texture that sits above all content.
 * Uses a pre-existing SVG fractal noise filter with GPU-safe CSS animation.
 * Creates tactile, editorial, luxury feel — no canvas required.
 *
 * Reusable: wrap any section or use globally.
 */

import { colors } from '../../../lib/tokens';

interface AmbientGrainProps {
  /** Opacity 0–1, default 0.025 (ultra subtle) */
  opacity?: number;
  /** CSS z-index, default 30 */
  zIndex?: number;
  /** pointer-events: none always for accessibility */
  className?: string;
}

export function AmbientGrain({
  opacity = 0.025,
  zIndex = 30,
  className = '',
}: AmbientGrainProps) {
  return (
    <>
      {/* SVG filter definition — rendered once, reused by all grain layers */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: 'absolute', pointerEvents: 'none' }}
      >
        <filter id="mearh-ambient-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Animated grain layer */}
      <div
        aria-hidden="true"
        className={`grain-shift ${className}`}
        style={{
          position: 'absolute',
          inset: '-50%',
          width: '200%',
          height: '200%',
          zIndex,
          pointerEvents: 'none',
          filter: 'url(#mearh-ambient-grain)',
          opacity,
          mixBlendMode: 'screen',
          userSelect: 'none',
          backgroundColor: colors.charcoal,
        }}
      />
    </>
  );
}
