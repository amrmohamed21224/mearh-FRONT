/**
 * ScrollScene
 * Pinned scroll scene wrapper component.
 * Children receive access to the scene timeline via render prop.
 *
 * Usage (simple):
 *   <ScrollScene duration="200%">
 *     <div className="h-screen">...</div>
 *   </ScrollScene>
 *
 * Usage (with timeline control):
 *   <ScrollScene duration="200%" onReady={(tl) => {
 *     tl.to(titleRef.current, { opacity: 0, y: -60 });
 *   }}>
 *     <section>...</section>
 *   </ScrollScene>
 */

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from '../../../lib/gsap';
import { createScrollScene, type ScrollSceneConfig } from '../../../lib/gsap/scroll';

type SceneConfig = Omit<ScrollSceneConfig, 'trigger'>;

interface ScrollSceneProps extends SceneConfig {
  children: ReactNode;
  onReady?: (timeline: gsap.core.Timeline) => void;
  className?: string;
}

export function ScrollScene({
  children,
  onReady,
  className,
  ...sceneConfig
}: ScrollSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const scene = createScrollScene({ trigger: el, ...sceneConfig });
      onReady?.(scene.timeline);
    }, el);

    return () => ctx.revert();
  // onReady is excluded intentionally — it's a stable callback
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
