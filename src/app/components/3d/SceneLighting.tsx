/**
 * SceneLighting — Atmosphere lighting simulation system.
 * 
 * Houses directional specular spotlights, warm ambient light,
 * and mouse-controlled backlighting to create premium editorial ambiance.
 */

import { useRef, useEffect } from 'react';
import { gsap } from '../../../lib/gsap';

interface SceneLightingProps {
  glowColor?: string;
  intensity?: number;
  interactive?: boolean;
}

export function SceneLighting({
  glowColor = 'rgba(255, 235, 200, 0.16)', // Premium soft gold tone
  intensity = 1,
  interactive = true,
}: SceneLightingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;

    const el = containerRef.current;
    const spot = spotRef.current;
    if (!el || !spot) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(spot, {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    el.parentElement?.addEventListener('mousemove', onMouseMove);

    return () => {
      el.parentElement?.removeEventListener('mousemove', onMouseMove);
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-20"
      style={{ mixBlendMode: 'plus-lighter' }}
    >
      {/* 1. Global Ambient Backlight Fill */}
      <div
        className="absolute inset-0 opacity-40 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${glowColor} 0%, rgba(30,28,26,0) 80%)`,
          opacity: 0.3 * intensity,
        }}
      />

      {/* 2. SPECULAR KEY LIGHT: Subtle golden ray moving across the piece */}
      <div
        className="absolute -top-1/4 left-1/4 w-1/2 h-full rotate-[35deg] opacity-25 filter blur-3xl"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,244,225,0.4) 50%, rgba(255,255,255,0) 100%)',
          animation: 'specularSweep 12s ease-in-out infinite alternate',
        }}
      />

      {/* 3. INTERACTIVE SPOTLIGHT: Glides under user cursor */}
      {interactive && (
        <div
          ref={spotRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full pointer-events-none filter blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(181,146,76,0.06) 50%, rgba(0,0,0,0) 100%)`,
            opacity: 0.85 * intensity,
            transformStyle: 'preserve-3d',
          }}
        />
      )}

      {/* CSS Animation Keyframes for Specular Sweep */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes specularSweep {
            0% { transform: translateX(-30%) scaleY(1); opacity: 0.15; }
            100% { transform: translateX(30%) scaleY(1.15); opacity: 0.35; }
          }
        `
      }} />
    </div>
  );
}
