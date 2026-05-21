/**
 * FloatingProductCard — Atmospheric Interactive Object Card
 * 
 * Provides:
 *   - Continuous weighted float movement (Drift) using applyDriftEffect
 *   - 3D mouse axis deflection to simulate structural weight
 *   - Magnetic CTA arrow vectors
 *   - High-fidelity typography styling
 */

import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';
import { applyDriftEffect, applyMagneticEffect } from '../../../lib/product-motion';
import { gsap } from '../../../lib/gsap';

interface FloatingProductCardProps {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
  driftIntensity?: number;
}

export function FloatingProductCard({
  id,
  title,
  category,
  price,
  image,
  driftIntensity = 12,
}: FloatingProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const magneticArrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const img = imageContainerRef.current;
    const arrow = magneticArrowRef.current;
    if (!card || !img || !arrow) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // 1. Slow ambient drift
    const driftTween = applyDriftEffect(img, { intensity: driftIntensity, duration: 7 });

    // 2. Magnetic CTA Arrow vector pull
    const cleanupMagnetic = applyMagneticEffect(arrow, card, 0.4);

    // 3. Mouse move 3D tilt coordinates
    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateX: yPct * -10,
        rotateY: xPct * 10,
        transformPerspective: 1000,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      driftTween.kill();
      cleanupMagnetic();
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [driftIntensity]);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col justify-between p-8 md:p-12 w-full h-[480px] bg-stone-04 border border-stone-12 transition-colors duration-500 hover:border-amber-500/20"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Decorative ambient lighting back grid */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] to-white/[0.04] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* 1. HEADER INFO */}
      <div className="flex justify-between items-start z-10">
        <div>
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.labelSm,
              color: colors.brass,
              letterSpacing: typeTokens.tracking.mid,
              textTransform: 'uppercase',
            }}
          >
            {category}
          </span>
          <h3
            className="mt-2"
            style={{
              fontFamily: fonts.serif,
              fontSize: typeTokens.h3,
              fontWeight: 300,
              color: colors.parchment,
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h3>
        </div>

        {/* Magnetic Hover Indicator */}
        <div
          ref={magneticArrowRef}
          className="w-10 h-10 flex items-center justify-center border rounded-full border-stone-40 transition-colors duration-300 group-hover:bg-parchment group-hover:border-parchment"
        >
          <ArrowUpRight size={15} color={colors.parchment} className="group-hover:text-charcoal" />
        </div>
      </div>

      {/* 2. FLOATING IMAGE WORKSPACE */}
      <div className="relative flex-1 flex items-center justify-center my-6 z-10 pointer-events-none">
        <div
          ref={imageContainerRef}
          className="w-4/5 h-4/5 flex items-center justify-center will-change-transform filter drop-shadow-[0_24px_40px_rgba(0,0,0,0.3)] transition-transform duration-500"
        >
          <img
            src={image}
            alt={title}
            className="max-w-full max-h-full object-contain pointer-events-none select-none"
          />
        </div>
      </div>

      {/* 3. FOOTER INFO */}
      <div className="flex justify-between items-end z-10">
        <div>
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.labelSm,
              color: colors.parchment40,
              letterSpacing: '0.1em',
            }}
          >
            Price
          </span>
          <p
            style={{
              fontFamily: fonts.serif,
              fontSize: typeTokens.h3Xs,
              fontWeight: 300,
              color: colors.parchment,
            }}
          >
            {price}
          </p>
        </div>

        <Link
          to={`/products/${id}`}
          className="overflow-hidden relative"
          data-cursor="hover"
        >
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.labelSm,
              color: colors.brass,
              letterSpacing: typeTokens.tracking.normal,
              textTransform: 'uppercase',
            }}
            className="inline-block relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-amber-500 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-left"
          >
            Inspect Space
          </span>
        </Link>
      </div>
    </div>
  );
}
