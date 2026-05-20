/**
 * AmbientOverlay
 * Reusable atmospheric layer: grain + vignette + optional grid.
 *
 * Stacks above content via pointer-events:none.
 * GPU-safe: all CSS, no JS animation.
 * Drop into any dark or light section.
 */

import { colors } from '../../../lib/tokens';

interface AmbientOverlayProps {
  /** Grain intensity 0–1. Default 0.028 (editorial subtle) */
  grain?: number;
  /** Vignette strength 0–1. Default 0.4 */
  vignette?: number;
  /** Architectural grid overlay (very faint guide lines) */
  grid?: boolean;
  /** z-index, default 20 */
  zIndex?: number;
  /** Override blend mode for different bg colours */
  blendMode?: 'screen' | 'overlay' | 'multiply';
}

export function AmbientOverlay({
  grain    = 0.028,
  vignette = 0.4,
  grid     = false,
  zIndex   = 20,
  blendMode = 'screen',
}: AmbientOverlayProps) {
  return (
    <>
      {/* SVG noise filter — single definition per page via id */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: 'absolute', pointerEvents: 'none' }}
      >
        <filter id="mearh-story-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.70"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Grain layer */}
      {grain > 0 && (
        <div
          aria-hidden="true"
          className="grain-shift"
          style={{
            position: 'absolute',
            inset: '-50%',
            width: '200%',
            height: '200%',
            zIndex,
            pointerEvents: 'none',
            filter: 'url(#mearh-story-grain)',
            opacity: grain,
            mixBlendMode: blendMode,
            backgroundColor: colors.charcoal,
            userSelect: 'none',
          }}
        />
      )}

      {/* Vignette layer */}
      {vignette > 0 && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: zIndex + 1,
            pointerEvents: 'none',
            background: `radial-gradient(ellipse at center, transparent 40%, rgba(30,28,26,${vignette}) 100%)`,
          }}
        />
      )}

      {/* Architectural grid (optional) */}
      {grid && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: zIndex + 2,
            pointerEvents: 'none',
            opacity: 0.03,
            backgroundImage: `
              linear-gradient(rgba(247,244,238,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(247,244,238,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      )}
    </>
  );
}
