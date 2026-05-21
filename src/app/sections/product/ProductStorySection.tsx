/**
 * ProductStorySection — Narrative chapters on craftsmanship and placement
 * 
 * Provides:
 *   - Alternating editorial layout sequences (Chapters)
 *   - Scroll-triggered structural entrance transitions
 *   - Micro-parallax picture frame drift
 *   - Luxury typesetting parameters
 */

import { motion } from 'motion/react';
import { Product } from '../../../types/product';
import { colors, fonts, type as typeTokens, motion as motionTokens } from '../../../lib/tokens';

interface ProductStorySectionProps {
  product: Product;
}

export function ProductStorySection({ product }: ProductStorySectionProps) {
  const chapters = [
    {
      num: '01',
      title: 'Monolithic Casting',
      subtitle: 'The Cast & Oxidation',
      desc: 'Every structural curve begins in a dry silica sand mold. Searing molten brass is poured manually at 1,080°C, cooling slowly to capture micro-imperfections. Next, the raw metal undergoes a custom patination sequence over 72 hours, using organic oxides to draw forth a deep spectrum of rich carbon and gold hues that grow more complex with time.',
      image: 'https://images.unsplash.com/photo-1576016770956-debb63d90029?auto=format&fit=crop&w=800&q=85',
    },
    {
      num: '02',
      title: 'French Pyrenees Looming',
      subtitle: 'Weave Architecture',
      desc: 'The upholstery boucle is structured on shuttle looms from a historic woolen mill in France. Selecting organic wool and linen threads, the weavers warp a dense, three-dimensional boucle texture. Free from synthetic coatings, it breathes organically, maintaining its spring-like loft and structural integrity across decades.',
      image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=800&q=85',
    },
    {
      num: '03',
      title: 'Architectural Sanctuary',
      subtitle: 'Spatial Resonance',
      desc: 'This piece is designed to command a quiet authority within a space. Set it against textured limestone walls, concrete slabs, or wide plank timber flooring. It acts as an anchor of calm, absorbing bright natural sunlight and releasing a warm, golden specular reflection that grounds the entire room.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=85',
    }
  ];

  return (
    <section
      className="relative w-full py-28 px-6 md:px-16"
      style={{ backgroundColor: colors.charcoal, borderTop: `1px solid rgba(155, 145, 133, 0.08)` }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        {chapters.map((ch, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={ch.num}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
            >
              {/* Image Frame Column */}
              <div 
                className={`lg:col-span-6 overflow-hidden bg-stone-15 aspect-[4/3] relative group ${
                  isEven ? 'order-1' : 'order-1 lg:order-2'
                }`}
              >
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.8, ease: motionTokens.ease.luxury }}
                >
                  <img
                    src={ch.image}
                    alt={ch.title}
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700"
                  />
                </motion.div>
                {/* Micro reflection sweep overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] to-white/[0.05] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Narratives details column */}
              <div 
                className={`lg:col-span-6 flex flex-col items-start ${
                  isEven ? 'order-2' : 'order-2 lg:order-1'
                }`}
              >
                {/* Chapter sequence */}
                <span
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: '1.8rem',
                    fontStyle: 'italic',
                    color: colors.brass,
                  }}
                >
                  Chapter {ch.num}
                </span>

                <span
                  className="mt-3"
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: typeTokens.labelSm,
                    color: colors.parchment40,
                    letterSpacing: typeTokens.tracking.wide,
                    textTransform: 'uppercase',
                  }}
                >
                  {ch.subtitle}
                </span>

                <h3
                  className="mt-2 mb-6"
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: typeTokens.sectionSm,
                    fontWeight: 300,
                    color: colors.parchment,
                    lineHeight: 1.2,
                  }}
                >
                  {ch.title}
                </h3>

                <p
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: typeTokens.bodyMd,
                    fontWeight: 300,
                    color: colors.parchment70,
                    lineHeight: 1.9,
                  }}
                >
                  {ch.desc}
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
