/**
 * ProductGallery — Immersive gallery section of the product space.
 * 
 * Provides:
 *   - Editorial typography descriptions of photography captures
 *   - Integration with the fullscreen interactive ImmersiveGallery component
 *   - GPU-accelerated entrance reveals
 */

import { motion } from 'motion/react';
import { Product } from '../../../types/product';
import { colors, fonts, type as typeTokens, spacing, motion as motionTokens } from '../../../lib/tokens';
import { ImmersiveGallery } from '../../components/product/ImmersiveGallery';

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = product.images || [product.image];

  return (
    <section
      className="relative w-full py-28 px-6 md:px-16"
      style={{ backgroundColor: colors.charcoal, borderTop: `1px solid rgba(155, 145, 133, 0.08)` }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Editorial Text Column */}
        <div className="lg:col-span-4 flex flex-col justify-center h-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-6 h-px" style={{ backgroundColor: colors.brass }} />
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.labelSm,
                color: colors.brass,
                letterSpacing: typeTokens.tracking.wide,
                textTransform: 'uppercase',
              }}
            >
              Visual Study
            </span>
          </div>

          <h2
            style={{
              fontFamily: fonts.serif,
              fontSize: typeTokens.sectionLg,
              fontWeight: 300,
              color: colors.parchment,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            Atmospheric Composition
          </h2>

          <p
            className="mt-6"
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.bodyMd,
              fontWeight: 300,
              color: colors.parchment50,
              lineHeight: 1.85,
            }}
          >
            Study the interplay of light and shade across every radius. Each angle reveals the structural intent behind this piece — capturing the physical essence of hand-finished patinated surfaces and refined textile layers.
          </p>

          {/* Gallery controls / metadata */}
          <div className="mt-10 flex flex-col gap-4 border-t border-stone-12 pt-8">
            <div className="flex justify-between">
              <span style={{ fontFamily: fonts.sans, fontSize: '0.62rem', color: colors.parchment40, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Resolution
              </span>
              <span style={{ fontFamily: fonts.serif, fontSize: '0.8rem', color: colors.parchment }}>
                High-Density Specular
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ fontFamily: fonts.sans, fontSize: '0.62rem', color: colors.parchment40, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Angles Captured
              </span>
              <span style={{ fontFamily: fonts.serif, fontSize: '0.8rem', color: colors.parchment }}>
                {images.length} Perspectives
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Gallery Column */}
        <div className="lg:col-span-8">
          <ImmersiveGallery images={images} productName={product.title} />
        </div>

      </div>
    </section>
  );
}
