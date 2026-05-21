/**
 * ProductHero — Immersive Cinematic Product Hero Showcase
 * 
 * Houses:
 *   - Specular background lighting layers (SceneLighting)
 *   - Scroll-linked camera rotations (CameraMotionLayer)
 *   - High-fidelity 3D-ready viewport shell (ProductSceneShell)
 *   - Ultra-premium cinematic typography reveals
 *   - Responsive, layered depth layouts
 */

import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { Product } from '../../../types/product';
import { colors, fonts, type as typeTokens, spacing, motion as motionTokens } from '../../../lib/tokens';
import { ProductSceneShell } from '../../components/3d/ProductSceneShell';
import { CameraMotionLayer } from '../../components/3d/CameraMotionLayer';
import { SceneLighting } from '../../components/3d/SceneLighting';

interface ProductHeroProps {
  product: Product;
  quantity: number;
  setQuantity: (q: number) => void;
}

export function ProductHero({ product, quantity, setQuantity }: ProductHeroProps) {
  return (
    <section 
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-32 pb-16 px-6 md:px-16"
      style={{ backgroundColor: colors.charcoal }}
    >
      {/* 1. Global Ambient Sheen Backlighting */}
      <SceneLighting interactive={true} intensity={1.2} />

      {/* 2. Top Bar / Breadcrumb Navigation */}
      <div className="relative w-full flex justify-between items-center z-30">
        <Link to="/collections" data-cursor="hover">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ x: -4 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ArrowLeft size={13} color={colors.parchment50} />
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: '0.62rem',
                color: colors.parchment50,
                letterSpacing: typeTokens.tracking.wide,
                textTransform: 'uppercase',
              }}
            >
              Collections Catalog
            </span>
          </motion.div>
        </Link>

        {/* Vintage year details */}
        <span
          style={{
            fontFamily: fonts.serif,
            fontSize: '0.9rem',
            fontStyle: 'italic',
            color: colors.brass,
          }}
        >
          Circa {product.year || '2025'}
        </span>
      </div>

      {/* 3. Layered Interactive Core Grid */}
      <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto z-20">
        
        {/* Left Side: Editorial Typography & Context */}
        <div className="lg:col-span-5 flex flex-col items-start text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: motionTokens.ease.luxury, delay: 0.15 }}
          >
            {/* Category / Subtitle */}
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.labelMd,
                color: colors.brass,
                letterSpacing: typeTokens.tracking.wide,
                textTransform: 'uppercase',
              }}
            >
              {product.subtitle || `${product.category} Section`}
            </span>

            {/* Title */}
            <h1
              className="mt-3 mb-4"
              style={{
                fontFamily: fonts.serif,
                fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                fontWeight: 300,
                color: colors.parchment,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              {product.title}
            </h1>

            {/* Primary material specification */}
            <p
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.bodySm,
                color: colors.parchment50,
                fontWeight: 300,
                letterSpacing: '0.05em',
              }}
            >
              {product.material}
            </p>

            {/* Large Price Display */}
            <div className="mt-8 mb-6 flex items-baseline gap-3">
              <span
                style={{
                  fontFamily: fonts.serif,
                  fontSize: typeTokens.priceXl,
                  fontWeight: 300,
                  color: colors.parchment,
                }}
              >
                {product.price}
              </span>
              <span
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.58rem',
                  color: colors.parchment40,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Inquiries Inclusive
              </span>
            </div>

            {/* Narrative description snippet */}
            <p
              className="max-w-md"
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.bodyMd,
                fontWeight: 300,
                color: colors.parchment70,
                lineHeight: 1.85,
              }}
            >
              {product.description}
            </p>

            {/* Quantity Controller */}
            <div className="mt-10 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center border border-stone-50 transition-colors duration-300 hover:border-amber-500"
                  data-cursor="hover"
                >
                  <Minus size={11} color={colors.parchment} />
                </button>
                <span
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: '1.15rem',
                    color: colors.parchment,
                    minWidth: 28,
                    textAlign: 'center',
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center border border-stone-50 transition-colors duration-300 hover:border-amber-500"
                  data-cursor="hover"
                >
                  <Plus size={11} color={colors.parchment} />
                </button>
              </div>
              <span
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.62rem',
                  color: colors.parchment40,
                  letterSpacing: '0.12em',
                }}
              >
                Lead time: {product.lead || '8–10 weeks'}
              </span>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Link to="/checkout" className="flex-1" data-cursor="hover">
                <button
                  className="w-full py-4 text-center tracking-[0.2em] uppercase transition-colors duration-300"
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: typeTokens.labelMd,
                    backgroundColor: colors.parchment,
                    color: colors.charcoal,
                  }}
                >
                  Acquire Piece
                </button>
              </Link>
              <Link to="/consultation" className="flex-1" data-cursor="hover">
                <button
                  className="w-full py-4 text-center tracking-[0.2em] uppercase border transition-colors duration-300"
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: typeTokens.labelMd,
                    borderColor: 'rgba(247, 244, 238, 0.2)',
                    color: colors.parchment70,
                  }}
                >
                  Request Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Oversized Product Showcase Viewport */}
        <div className="lg:col-span-7 h-[50vh] lg:h-[75vh] flex items-center justify-center order-1 lg:order-2">
          <CameraMotionLayer rangeX={35} rangeY={15} damping={1.2}>
            <ProductSceneShell 
              fallbackImage={product.image} 
              productName={product.title}
              ambientOpacity={0.9}
            />
          </CameraMotionLayer>
        </div>

      </div>

      {/* 4. Downwards scroll-indicator hint */}
      <div className="relative w-full flex justify-between items-center z-20">
        <span
          style={{
            fontFamily: fonts.sans,
            fontSize: '0.55rem',
            color: colors.parchment40,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Mearh Studio Edition
        </span>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: '0.55rem',
              color: colors.parchment50,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Scroll to study details
          </span>
        </div>
      </div>
    </section>
  );
}
