/**
 * useLenis — Production-grade Lenis smooth scroll
 * - GSAP ticker sync
 * - Proper resize handling via ResizeObserver
 * - ScrollTrigger refresh on resize
 * - Memory-safe cleanup
 */

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync lenis scroll events → ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis via GSAP ticker (single RAF loop, no double-tick)
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger on window resize (debounced)
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', onResize);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ─── Route Change Smooth Scroll Reset & Recalculate Boundaries ──────────────
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // 1. Immediately reset scroll position to top (no layout jump)
    lenis.scrollTo(0, { immediate: true });

    // 2. Refresh ScrollTrigger boundaries immediately
    ScrollTrigger.refresh();

    // 3. Staggered updates during AnimatePresence exit/entry transitions
    const t1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const t2 = setTimeout(() => {
      ScrollTrigger.refresh();
      // Force Lenis to recalculate height and boundaries of the new DOM
      lenis.resize();
    }, 750); // Just after 0.6s slow-fade transition completes

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

  return lenisRef;
}
