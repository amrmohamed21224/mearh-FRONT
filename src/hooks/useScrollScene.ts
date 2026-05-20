/**
 * useScrollScene
 * Creates a pinned GSAP scroll scene attached to a container ref.
 * Returns a timeline ref to add animations against.
 *
 * Usage:
 *   const { containerRef, timelineRef } = useScrollScene({ duration: '200%' });
 *
 *   useEffect(() => {
 *     const tl = timelineRef.current;
 *     if (!tl) return;
 *     tl.to(titleEl, { opacity: 0, y: -60 });
 *     tl.from(imgEl, { scale: 1.3, ease: 'none' }, 0);
 *   }, []);
 */

import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { createScrollScene, type ScrollSceneConfig } from '../lib/gsap/scroll';

type SceneConfig = Omit<ScrollSceneConfig, 'trigger'>;

export function useScrollScene(config: SceneConfig = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef  = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const scene = createScrollScene({ trigger: el, ...config });
      timelineRef.current = scene.timeline;
    }, el);

    return () => {
      ctx.revert();
      timelineRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { containerRef, timelineRef };
}
