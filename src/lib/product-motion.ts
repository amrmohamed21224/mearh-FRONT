/**
 * MEARH — Luxury Product Motion Engine
 * GPU-safe, high-performance physical interaction utilities for product immersion.
 * 
 * Includes:
 *   - applyMagneticEffect       — Smooth magnetic hover magnetic pull
 *   - applyDriftEffect          — Micro-floating physics for object cards
 *   - simulateTactileReflect    — Brass / marble light sheen tracking mouse / scroll
 *   - buildRevealSpecsTimeline  — Segment-by-segment specification entrance
 */

import { gsap } from './gsap';
import { motion as motionTokens } from './tokens';

/**
 * applyMagneticEffect
 * Pulls an element towards the cursor within a bounding area.
 * Returns a cleanup function.
 */
export function applyMagneticEffect(
  element: HTMLElement,
  trigger: HTMLElement = element,
  strength: number = 0.35
): () => void {
  const onMouseMove = (e: MouseEvent) => {
    const rect = trigger.getBoundingClientRect();
    const triggerX = rect.left + rect.width / 2;
    const triggerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - triggerX;
    const deltaY = e.clientY - triggerY;
    
    gsap.to(element, {
      x: deltaX * strength,
      y: deltaY * strength,
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const onMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
      overwrite: 'auto',
    });
  };

  trigger.addEventListener('mousemove', onMouseMove);
  trigger.addEventListener('mouseleave', onMouseLeave);

  return () => {
    trigger.removeEventListener('mousemove', onMouseMove);
    trigger.removeEventListener('mouseleave', onMouseLeave);
  };
}

/**
 * applyDriftEffect
 * Subtly floats an element to simulate weightlessness / atmosphere.
 */
export function applyDriftEffect(
  element: HTMLElement,
  options: {
    intensity?: number;
    duration?: number;
    rotateMax?: number;
  } = {}
): gsap.core.Tween {
  const { intensity = 15, duration = 6, rotateMax = 2 } = options;

  gsap.set(element, { transformPerspective: 1000 });
  
  return gsap.to(element, {
    y: `+=${intensity}`,
    x: `+=${intensity / 2}`,
    rotationZ: `+=${rotateMax}`,
    rotationY: `+=${rotateMax / 2}`,
    duration,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

/**
 * simulateTactileReflect
 * Adjusts a gradient lighting overlay based on cursor movements or scroll position
 * to simulate authentic luxury material finishes (brass reflections, marble deep light).
 */
export function simulateTactileReflect(
  reflectOverlay: HTMLElement,
  trigger: HTMLElement,
  type: 'brass' | 'marble' | 'glass' = 'brass'
): () => void {
  const isBrass = type === 'brass';
  
  const handleMove = (xPct: number, yPct: number) => {
    // xPct: -0.5 to 0.5, yPct: -0.5 to 0.5
    const angle = Math.atan2(yPct, xPct) * (180 / Math.PI);
    const opacity = 0.15 + (Math.abs(xPct) + Math.abs(yPct)) * 0.15;
    
    if (isBrass) {
      reflectOverlay.style.background = `linear-gradient(${angle + 90}deg, 
        rgba(255, 255, 255, 0) 0%, 
        rgba(255, 230, 180, ${opacity * 1.5}) 50%, 
        rgba(255, 255, 255, 0) 100%)`;
    } else {
      // Marble/glass soft specular reflection
      reflectOverlay.style.background = `radial-gradient(circle at ${50 + xPct * 100}% ${50 + yPct * 100}%, 
        rgba(255, 255, 255, ${opacity}) 0%, 
        rgba(255, 255, 255, 0) 70%)`;
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    const rect = trigger.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = (x / rect.width) - 0.5;
    const yPct = (y / rect.height) - 0.5;
    
    handleMove(xPct, yPct);
  };

  const onMouseLeave = () => {
    gsap.to(reflectOverlay, {
      opacity: 0.2,
      duration: 0.9,
      ease: 'power2.out',
    });
  };

  trigger.addEventListener('mousemove', onMouseMove);
  trigger.addEventListener('mouseleave', onMouseLeave);

  return () => {
    trigger.removeEventListener('mousemove', onMouseMove);
    trigger.removeEventListener('mouseleave', onMouseLeave);
  };
}

/**
 * buildRevealSpecsTimeline
 * Orchestrates a luxury specification list slide-in/fade sequence.
 */
export function buildRevealSpecsTimeline(
  rows: HTMLElement[],
  trigger: HTMLElement
): gsap.core.Timeline {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top 85%',
      toggleActions: 'play none none none',
    }
  });

  rows.forEach((row, i) => {
    const label = row.querySelector('.spec-label');
    const value = row.querySelector('.spec-value');
    const line = row.querySelector('.spec-line');

    if (line) {
      tl.fromTo(line, 
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.0, ease: 'power3.inOut' },
        i * 0.12
      );
    }
    
    if (label) {
      tl.fromTo(label,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        (i * 0.12) + 0.2
      );
    }

    if (value) {
      tl.fromTo(value,
        { opacity: 0, x: 16 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        (i * 0.12) + 0.2
      );
    }
  });

  return tl;
}
