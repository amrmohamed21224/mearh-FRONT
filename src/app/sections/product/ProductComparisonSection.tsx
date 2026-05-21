/**
 * ProductComparisonSection — Cinematic Specification Comparison
 * 
 * Provides:
 *   - Twin-card editorial side-by-side comparison grids
 *   - Staggered spec details reveals (CinematicSpecReveal)
 *   - Fine-tuned typography typesetting parameters
 */

import { Product } from '../../../types/product';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';
import { CinematicSpecReveal } from '../../components/product/CinematicSpecReveal';

interface ProductComparisonSectionProps {
  product: Product;
  comparisonProduct?: Product;
}

export function ProductComparisonSection({
  product,
  comparisonProduct,
}: ProductComparisonSectionProps) {
  // If no comparison product is passed, fallback to default iconic lamp or chair
  const secondaryProduct: Product = comparisonProduct || {
    id: 'threshold-chair',
    title: 'Threshold Lounge',
    category: 'Seating',
    material: 'Hand-cast Concrete & Wool',
    price: '€5,400',
    priceNumeric: 5400,
    year: '2025',
    image: 'https://images.unsplash.com/photo-1757439402127-b786187f9bc2?auto=format&fit=crop&w=800&q=85',
    details: 'Cast from a proprietary concrete aggregate, yielding an extremely tactile surface that contrasts with structural wool inserts.',
    dimensions: 'H 78 × W 70 × D 80 cm',
    weight: '32 kg',
  };

  const primarySpecs = [
    { label: 'Footprint', value: product.dimensions || 'H 82 × W 65 × D 72 cm' },
    { label: 'Weight Class', value: product.weight || '18 kg' },
    { label: 'Lead Duration', value: product.lead || '8–10 weeks' },
    { label: 'Core Material', value: product.material },
    { label: 'Authenticity Stamp', value: `Mearh Studio © ${product.year}` },
  ];

  const secondarySpecs = [
    { label: 'Footprint', value: secondaryProduct.dimensions || 'H 78 × W 70 × D 80 cm' },
    { label: 'Weight Class', value: secondaryProduct.weight || '32 kg' },
    { label: 'Lead Duration', value: secondaryProduct.lead || '10–12 weeks' },
    { label: 'Core Material', value: secondaryProduct.material },
    { label: 'Authenticity Stamp', value: `Mearh Studio © ${secondaryProduct.year}` },
  ];

  return (
    <section
      className="relative w-full py-28 px-6 md:px-16"
      style={{ backgroundColor: colors.charcoal, borderTop: `1px solid rgba(155, 145, 133, 0.08)` }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="max-w-xl">
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
              Structural Analysis
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
            Dimensional Contrasts
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
            Compare structural footprints and weight properties against our neighboring studio pieces. Understand which form fits your specific layout parameters.
          </p>
        </div>

        {/* Dynamic side-by-side specification reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-28">
          {/* Active Product */}
          <CinematicSpecReveal
            title={`Piece 01 — ${product.title}`}
            specs={primarySpecs}
          />

          {/* Comparison Product */}
          <CinematicSpecReveal
            title={`Piece 02 — ${secondaryProduct.title}`}
            specs={secondarySpecs}
          />
        </div>

      </div>
    </section>
  );
}
