/**
 * StoryProgress — Cinematic Vertical Progress Rail
 *
 * Fixed right-side vertical rail showing chapter progression.
 * Each chapter maps to a dot; active one is highlighted in brass.
 * Driven by IntersectionObserver (zero scroll listeners, zero layout thrash).
 *
 * Desktop: right-side vertical rail
 * Mobile:  hides (bottom compact progress bar is handled by ScrollProgress)
 */

import { useEffect, useRef, useState } from 'react';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';

interface StoryProgressProps {
  chapters: { label: string }[];
  chapterRefs: React.RefObject<HTMLElement | null>[];
}

export function StoryProgress({ chapters, chapterRefs }: StoryProgressProps) {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chapterRefs.length) return;

    const observers: IntersectionObserver[] = [];

    chapterRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { threshold: 0.35, rootMargin: '-10% 0px -10% 0px' }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [chapterRefs]);

  if (!chapters.length) return null;

  return (
    <div
      ref={railRef}
      className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-50
                 flex-col items-center gap-4"
      role="navigation"
      aria-label="Chapter navigation"
    >
      {/* Top bracket */}
      <div
        style={{
          width: 1,
          height: 32,
          backgroundColor: `rgba(181,146,76,0.25)`,
        }}
      />

      {chapters.map((chapter, i) => (
        <button
          key={i}
          onClick={() => {
            chapterRefs[i]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="group relative flex items-center justify-end gap-3"
          aria-label={chapter.label}
          aria-current={active === i ? 'true' : undefined}
        >
          {/* Chapter label — appears on hover */}
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                       pointer-events-none select-none"
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.labelSm,
              color: active === i ? colors.brass : colors.stoneTaupe,
              letterSpacing: typeTokens.tracking.mid,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {chapter.label}
          </span>

          {/* Dot */}
          <div
            style={{
              width: active === i ? 6 : 3,
              height: active === i ? 6 : 3,
              borderRadius: '50%',
              backgroundColor: active === i ? colors.brass : 'rgba(181,146,76,0.35)',
              transition: 'all 0.4s cubic-bezier(0.21,0.47,0.32,0.98)',
              flexShrink: 0,
            }}
          />
        </button>
      ))}

      {/* Bottom bracket */}
      <div
        style={{
          width: 1,
          height: 32,
          backgroundColor: `rgba(181,146,76,0.25)`,
        }}
      />
    </div>
  );
}
