/**
 * StatsScene — Project Metrics Chapter
 *
 * Displays project statistics (area, materials, duration, craftspeople).
 * Used for: 'stats' chapter type.
 *
 * Motion:
 *   - Horizontal brass rule grows across the full width
 *   - Each stat counter fade-ups with increasing delay
 *   - Subtle number count-up animation (GSAP fromTo on opacity/y)
 */

import { useRef, useEffect, forwardRef } from 'react';
import { gsap } from '../../../lib/gsap';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';

interface StatsSceneProps {
  items: { label: string; value: string }[];
}

export const StatsScene = forwardRef<HTMLElement, StatsSceneProps>(
  function StatsScene({ items }, ref) {
    const rootRef  = useRef<HTMLElement>(null);
    const ruleRef  = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);

    const setRef = (el: HTMLElement | null) => {
      (rootRef as React.MutableRefObject<HTMLElement | null>).current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = el;
    };

    useEffect(() => {
      const root  = rootRef.current;
      const rule  = ruleRef.current;
      const grid  = itemsRef.current;
      if (!root) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const ctx = gsap.context(() => {
        const ST = {
          trigger: root,
          start:   'top 78%',
          toggleActions: 'play none none none',
        };

        // Horizontal rule expands
        if (rule) {
          gsap.fromTo(rule,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1.2, ease: 'power3.inOut', scrollTrigger: ST }
          );
        }

        // Stat items — staggered
        if (grid) {
          const statEls = Array.from(grid.children) as HTMLElement[];
          gsap.fromTo(statEls,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: 'power3.out',
              delay: 0.2,
              scrollTrigger: ST,
            }
          );
        }
      }, root);

      return () => ctx.revert();
    }, []);

    return (
      <section
        ref={setRef}
        className="relative py-24 md:py-32 px-8 md:px-16 overflow-hidden"
        style={{ backgroundColor: colors.charcoal }}
      >
        {/* Top brass rule */}
        <div
          ref={ruleRef}
          style={{
            width: '100%',
            height: 1,
            backgroundColor: `rgba(181,146,76,0.3)`,
            marginBottom: '4rem',
            transform: 'scaleX(0)',
          }}
        />

        {/* Stats grid */}
        <div
          ref={itemsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-12"
        >
          {items.map((item, i) => (
            <div key={i}>
              <p
                style={{
                  fontFamily: fonts.serif,
                  fontSize: typeTokens.statXl,
                  fontWeight: 300,
                  color: colors.parchment,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {item.value}
              </p>
              <p
                style={{
                  fontFamily: fonts.sans,
                  fontSize: typeTokens.labelSm,
                  color: colors.stone40,
                  letterSpacing: typeTokens.tracking.mid,
                  textTransform: 'uppercase',
                  marginTop: '0.75rem',
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom brass rule */}
        <div
          style={{
            width: '100%',
            height: 1,
            backgroundColor: `rgba(181,146,76,0.15)`,
            marginTop: '4rem',
          }}
        />
      </section>
    );
  }
);
