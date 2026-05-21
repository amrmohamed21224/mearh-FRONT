/**
 * CinematicSpecReveal — Editorial specification list with orchestrated reveals.
 * 
 * Provides:
 *   - High-precision typography mapping
 *   - Animated border/divider lines (scaleX sweep)
 *   - Staggered label and value slide-ins
 *   - Clean reactive scroll-linked trigger
 */

import { useRef, useEffect } from 'react';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';
import { buildRevealSpecsTimeline } from '../../../lib/product-motion';

interface SpecRow {
  label: string;
  value: string;
}

interface CinematicSpecRevealProps {
  title: string;
  specs: SpecRow[];
}

export function CinematicSpecReveal({ title, specs }: CinematicSpecRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Filter valid non-null rows
    const validRows = rowsRef.current.filter((row): row is HTMLDivElement => row !== null);
    
    // Orchestrate GSAP timeline entrance
    const timeline = buildRevealSpecsTimeline(validRows, el);

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [specs]);

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-8">
      {/* Title */}
      <h3
        style={{
          fontFamily: fonts.serif,
          fontSize: typeTokens.h3Sm,
          fontWeight: 300,
          color: colors.parchment,
          letterSpacing: '0.02em',
        }}
      >
        {title}
      </h3>

      {/* Grid container */}
      <div className="flex flex-col w-full">
        {specs.map((spec, i) => (
          <div
            key={spec.label}
            ref={(el) => {
              rowsRef.current[i] = el;
            }}
            className="relative flex justify-between py-5 items-center overflow-hidden"
          >
            {/* Staggered label */}
            <span
              className="spec-label opacity-0"
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.labelLg,
                color: colors.parchment50,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {spec.label}
            </span>

            {/* Staggered value */}
            <span
              className="spec-value opacity-0"
              style={{
                fontFamily: fonts.serif,
                fontSize: typeTokens.bodyLg,
                fontWeight: 300,
                color: colors.parchment,
              }}
            >
              {spec.value}
            </span>

            {/* Animated divider line */}
            <div
              className="spec-line absolute bottom-0 left-0 w-full h-px"
              style={{
                backgroundColor: 'rgba(155, 145, 133, 0.12)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
