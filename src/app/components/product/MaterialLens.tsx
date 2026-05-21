/**
 * MaterialLens — Specular detail magnifier lens.
 * 
 * Provides:
 *   - Mouse-responsive circular magnification aperture (Lens)
 *   - Custom coordinates scaling mapping back onto full resolution imagery
 *   - Simulated real-time specular brass line reflections and light shears
 *   - Multi-material presets (Patinated Brass, French Boucle, Smoked Oak)
 */

import { useState, useRef, useEffect } from 'react';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';
import { simulateTactileReflect } from '../../../lib/product-motion';

interface MaterialLensProps {
  lensImage: string;
  zoomImage: string;
  materialName: string;
  description: string;
  reflectType?: 'brass' | 'marble' | 'glass';
}

export function MaterialLens({
  lensImage,
  zoomImage,
  materialName,
  description,
  reflectType = 'brass',
}: MaterialLensProps) {
  const [showLens, setShowLens] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const reflectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const reflect = reflectRef.current;
    if (!el || !reflect) return;

    // Apply tactile sheen dynamics
    const cleanupReflect = simulateTactileReflect(reflect, el, reflectType);

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Ensure lens stays bounded
      setLensPos({ x, y });

      // Calculate percentage positions for zoom image backdrop displacement
      const xPct = (x / rect.width) * 100;
      const yPct = (y / rect.height) * 100;
      setBgPos({ x: xPct, y: yPct });
    };

    el.addEventListener('mousemove', onMouseMove);

    return () => {
      cleanupReflect();
      el.removeEventListener('mousemove', onMouseMove);
    };
  }, [reflectType]);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Viewport Frame */}
      <div
        ref={containerRef}
        className="relative overflow-hidden w-full aspect-[4/3] bg-stone-15 border border-stone-10 cursor-none"
        onMouseEnter={() => setShowLens(true)}
        onMouseLeave={() => setShowLens(false)}
      >
        {/* Base texture image */}
        <img
          src={lensImage}
          alt={materialName}
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Specular sheen layer */}
        <div
          ref={reflectRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-10 opacity-70"
          style={{ mixBlendMode: 'plus-lighter' }}
        />

        {/* Tactile Magnification Lens Aperture */}
        {showLens && (
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-amber-500/40 pointer-events-none overflow-hidden z-20 shadow-[0_24px_50px_rgba(0,0,0,0.35)]"
            style={{
              left: `${lensPos.x}px`,
              top: `${lensPos.y}px`,
              backgroundImage: `url(${zoomImage})`,
              backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
              backgroundSize: '250%', // Magnification multiplier
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Specular light highlight ring */}
            <div className="absolute inset-0 rounded-full border-[1.5px] border-white/25 pointer-events-none" />
          </div>
        )}

        {/* Floating instruction pill */}
        <div 
          className="absolute bottom-5 left-5 px-3 py-1.5 rounded-full border backdrop-blur-md transition-opacity duration-300 pointer-events-none"
          style={{
            backgroundColor: 'rgba(30, 28, 26, 0.45)',
            borderColor: 'rgba(247, 244, 238, 0.1)',
          }}
        >
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: '0.52rem',
              color: colors.parchment70,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Tactile Lens Active
          </span>
        </div>
      </div>

      {/* Description block */}
      <div className="flex flex-col gap-2">
        <h4
          style={{
            fontFamily: fonts.serif,
            fontSize: typeTokens.h3Xs,
            fontWeight: 300,
            color: colors.parchment,
          }}
        >
          {materialName}
        </h4>
        <p
          style={{
            fontFamily: fonts.sans,
            fontSize: typeTokens.bodySm,
            fontWeight: 300,
            color: colors.parchment50,
            lineHeight: 1.8,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
