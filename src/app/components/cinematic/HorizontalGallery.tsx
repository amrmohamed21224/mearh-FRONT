/**
 * HorizontalGallery — Reusable Pinned Horizontal Scroll Gallery
 *
 * Wraps a track of children in a scroll-pinned horizontal gallery.
 * Uses the existing createHorizontalScroll engine from scroll.ts.
 * Supports progress indicator, responsive fallback to vertical on mobile.
 *
 * Usage:
 *   <HorizontalGallery label="01" total={5} showProgress>
 *     <GalleryCard /> × N
 *   </HorizontalGallery>
 */

import { useRef, useEffect, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '../../../lib/gsap';
import { colors, fonts, type as typeTokens, motion as motionTokens } from '../../../lib/tokens';

interface HorizontalGalleryProps {
  children: ReactNode;
  /** Scroll distance multiplier — default "300%" */
  scrollDuration?: string;
  /** Show "01 / 05" progress counter */
  showProgress?: boolean;
  label?: string;
  total?: number;
  className?: string;
}

export function HorizontalGallery({
  children,
  scrollDuration = '300%',
  showProgress = false,
  label = '01',
  total = 3,
  className = '',
}: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Only pin on desktop (md+)
    const mq = window.matchMedia('(min-width: 768px)');
    let ctx: gsap.Context | null = null;

    const init = () => {
      if (!mq.matches) return;

      ctx = gsap.context(() => {
        const getScrollWidth = () => track.scrollWidth - track.clientWidth;

        const tl = gsap.timeline();
        tl.to(track, {
          x: () => -getScrollWidth(),
          ease: 'none',
          invalidateOnRefresh: true,
        });

        // Update progress counter
        if (showProgress && progressLabelRef.current) {
          const label = progressLabelRef.current;
          tl.to({}, {
            duration: 1,
            onUpdate() {
              const progress = this.progress();
              const current = Math.round(progress * (total - 1)) + 1;
              label.textContent = String(current).padStart(2, '0');
            },
          }, 0);
        }

        ScrollTrigger.create({
          trigger: container,
          pin: true,
          start: 'top top',
          end: `+=${scrollDuration}`,
          scrub: 1.2,
          animation: tl,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }, container);
    };

    init();

    const onMqChange = (e: MediaQueryListEvent) => {
      if (ctx) { ctx.revert(); ctx = null; }
      if (e.matches) init();
    };
    mq.addEventListener('change', onMqChange);

    return () => {
      if (ctx) ctx.revert();
      mq.removeEventListener('change', onMqChange);
    };
  }, [scrollDuration, showProgress, total]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden md:h-screen md:flex md:items-center ${className}`}
    >
      {/* Progress counter — top right */}
      {showProgress && (
        <div
          className="hidden md:flex absolute top-8 right-12 z-20 items-center gap-2"
          style={{ fontFamily: fonts.sans }}
        >
          <span
            ref={progressLabelRef}
            style={{
              fontSize: typeTokens.labelMd,
              color: colors.brass,
              letterSpacing: typeTokens.tracking.mid,
            }}
          >
            {label}
          </span>
          <span style={{ fontSize: typeTokens.labelSm, color: colors.stoneTaupe }}>
            /
          </span>
          <span style={{ fontSize: typeTokens.labelSm, color: colors.stoneTaupe, letterSpacing: typeTokens.tracking.mid }}>
            {String(total).padStart(2, '0')}
          </span>
        </div>
      )}

      {/* Track */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:flex-nowrap w-full"
        style={{ willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  );
}
