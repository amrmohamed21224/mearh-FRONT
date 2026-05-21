/**
 * DepthContainer — Three-dimensional parallax perspective viewport.
 * 
 * Embeds children in a high-fidelity 3D workspace.
 * Automatically respects user prefers-reduced-motion preferences,
 * resizing bounds smoothly with GPU acceleration.
 */

import React, { useRef, useEffect } from 'react';
import { gsap } from '../../../lib/gsap';

interface DepthContainerProps {
  children: React.ReactNode;
  className?: string;
  perspective?: number;
  hoverScale?: number;
  triggerOnScroll?: boolean;
}

export function DepthContainer({
  children,
  className = '',
  perspective = 1000,
  hoverScale = 1.03,
  triggerOnScroll = true,
}: DepthContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. Hover Tilt + Depth effect
      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const xVal = e.clientX - rect.left;
        const yVal = e.clientY - rect.top;
        
        // Convert to ranges -0.5 to 0.5
        const xPct = (xVal / rect.width) - 0.5;
        const yPct = (yVal / rect.height) - 0.5;
        
        gsap.to(content, {
          rotateX: yPct * -12,
          rotateY: xPct * 12,
          scale: hoverScale,
          transformOrigin: 'center center',
          duration: 0.6,
          ease: 'power2.out',
        });
      };

      const onMouseLeave = () => {
        gsap.to(content, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        });
      };

      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseLeave);

      // 2. Scroll Parallax depth separation
      if (triggerOnScroll) {
        gsap.fromTo(content,
          { z: -30 },
          {
            z: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            }
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, [hoverScale, triggerOnScroll]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        ref={contentRef}
        className="w-full h-full will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  );
}
