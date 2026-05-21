/**
 * CameraMotionLayer — Scroll-linked camera / perspective wrapper.
 * 
 * Future-ready synchronization layers to map scroll delta values into
 * webGL camera position coordinates (e.g., camera.position.lerp).
 * 
 * Works today as a smooth CSS 3D viewport displacement layer.
 */

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from '../../../lib/gsap';

interface CameraMotionLayerProps {
  children: React.ReactNode;
  scrollTriggerElement?: HTMLElement | null;
  /** Range of movement in percentage units */
  rangeX?: number;
  rangeY?: number;
  /** Speed / damping of movement on scroll update */
  damping?: number;
}

export function CameraMotionLayer({
  children,
  scrollTriggerElement,
  rangeX = 40,
  rangeY = 20,
  damping = 1.2,
}: CameraMotionLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;

    // Default trigger is the layer parent section if none passed
    const trigger = scrollTriggerElement || el.parentElement || el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { 
          transformPerspective: 1200,
          rotateY: -rangeX / 2, 
          translateZ: -50,
          opacity: 0.9 
        },
        {
          rotateY: rangeX / 2,
          translateZ: 30,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger as Element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: damping,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
            },
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [scrollTriggerElement, rangeX, rangeY, damping]);

  return (
    <div
      ref={layerRef}
      className="relative w-full h-full will-change-transform"
      style={{
        transformStyle: 'preserve-3d',
      }}
      data-camera-scroll-pct={scrollProgress.toFixed(3)}
    >
      {/* 3D Depth coordinate helpers (invisible in production but tags variables) */}
      <div 
        className="hidden" 
        data-r3f-target-x={(scrollProgress * rangeX - rangeX/2).toFixed(2)}
        data-r3f-target-y={(scrollProgress * rangeY - rangeY/2).toFixed(2)}
      />
      {children}
    </div>
  );
}
