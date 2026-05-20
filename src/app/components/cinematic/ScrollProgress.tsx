/**
 * ScrollProgress — Cinematic Global Progress Indicator
 *
 * A thin brass line at the very top of the viewport.
 * Hidden during hero intro, appears after 1vh of scrolling.
 * Smoothly tracks scroll position from 0→1 across entire page.
 *
 * Built on GSAP ScrollTrigger — no RAF duplication.
 */

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../../lib/gsap';
import { colors } from '../../../lib/tokens';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const wrap = wrapRef.current;
    if (!bar || !wrap) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Track the overall page scroll progress
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        }
      );

      // Hide on hero, appear after 100vh
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: '100vh top',
        onEnter: () => gsap.to(wrap, { opacity: 1, duration: 0.4 }),
        onLeaveBack: () => gsap.to(wrap, { opacity: 0, duration: 0.4 }),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed top-0 left-0 right-0 z-[200] pointer-events-none"
      style={{ opacity: 0 }}
    >
      <div
        ref={barRef}
        className="h-[1.5px] w-full origin-left"
        style={{ backgroundColor: colors.brass }}
      />
    </div>
  );
}
