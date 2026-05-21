/**
 * ProductSceneShell — Future React Three Fiber 3D Canvas wrapper.
 * 
 * Provides:
 *   - CSS-based atmospheric viewport rendering (GPU-safe scale, tilt, filter)
 *   - Depth backdrop mesh simulation (CSS gradients mimicking real shadow catchers)
 *   - Unified loading state for three-dimensional assets
 *   - Clean React slot hooks to insert `<Canvas>` when ready.
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { colors, fonts, motion as motionTokens } from '../../../lib/tokens';

interface ProductSceneShellProps {
  children?: React.ReactNode;
  fallbackImage: string;
  productName: string;
  ambientOpacity?: number;
  isLoading?: boolean;
}

export function ProductSceneShell({
  children,
  fallbackImage,
  productName,
  ambientOpacity = 0.85,
  isLoading = false,
}: ProductSceneShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt drift for micro-interaction depth
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
      setRotate({ x: y * -15, y: x * 15 });
    };

    const onMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
      setIsHovered(false);
    };

    const onMouseEnter = () => {
      setIsHovered(true);
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseenter', onMouseEnter);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      style={{
        backgroundColor: 'transparent',
        perspective: '1200px',
      }}
    >
      {/* 3D scene grid / shadow catcher plate */}
      <div 
        className="absolute bottom-10 w-2/3 h-12 bg-black opacity-15 rounded-full filter blur-xl transition-transform duration-700 ease-out"
        style={{
          transform: `scale(${isHovered ? 1.08 : 1}) rotateX(80deg) translateY(${rotate.x * 0.4}px)`,
        }}
      />

      {/* Atmospheric space background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 40%, rgba(247, 244, 238, 0.03) 0%, rgba(30, 28, 26, 0.15) 100%)`,
          opacity: ambientOpacity,
        }}
      />

      {/* Main interactive node */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center will-change-transform"
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 120,
          mass: 0.8,
        }}
      >
        {children ? (
          /* Renders future R3F Canvas when injected */
          <div className="absolute inset-0 w-full h-full z-10">
            {children}
          </div>
        ) : (
          /* Immersive fallback layer with cinematic depth shadow */
          <div className="relative w-4/5 h-4/5 flex items-center justify-center">
            <img
              src={fallbackImage}
              alt={productName}
              className="max-w-full max-h-full object-contain pointer-events-none drop-shadow-[0_32px_64px_rgba(0,0,0,0.22)]"
            />
          </div>
        )}
      </motion.div>

      {/* Interactive 3D indicators */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 border rounded-full backdrop-blur-md opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          backgroundColor: 'rgba(30, 28, 26, 0.4)',
          borderColor: 'rgba(247, 244, 238, 0.15)',
        }}
      >
        <span 
          className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
        />
        <span
          style={{
            fontFamily: fonts.sans,
            fontSize: '0.55rem',
            color: 'rgba(247, 244, 238, 0.7)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Perspective Active
        </span>
      </div>

      {/* Loading state spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-10 h-10 border-2 border-dashed rounded-full animate-spin border-amber-500 mb-4" />
            <p
              style={{
                fontFamily: fonts.serif,
                fontStyle: 'italic',
                fontSize: '0.85rem',
                color: colors.parchment,
                letterSpacing: '0.05em',
              }}
            >
              Calibrating viewport details...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
