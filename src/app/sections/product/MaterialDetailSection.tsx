/**
 * MaterialDetailSection — Immersive Material Tactility Study
 * 
 * Provides:
 *   - Twin-aperture comparison grid using MaterialLens
 *   - Dynamic cursor lens coordinate mapping
 *   - Custom material specular sheen selections
 */

import { Product } from '../../../types/product';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';
import { MaterialLens } from '../../components/product/MaterialLens';

interface MaterialDetailSectionProps {
  product: Product;
}

export function MaterialDetailSection({ product }: MaterialDetailSectionProps) {
  // Pull materials lists or fall back to defaults
  const mats = product.relatedMaterials || ['Patinated Brass', 'Natural Boucle'];

  // Statically mapped high-density macro photography textures
  const textureDatabase: Record<string, { lens: string; zoom: string; desc: string; type: 'brass' | 'marble' | 'glass' }> = {
    'Patinated Brass': {
      lens: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85',
      zoom: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=95',
      desc: 'Formed via custom casting plates, each brass element undergoes a deliberate 72-hour chemical oxidation sequence, producing a non-repeating depth spectrum ranging from bright copper gold to charcoal carbon.',
      type: 'brass'
    },
    'Natural Boucle': {
      lens: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85',
      zoom: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1400&q=95',
      desc: 'Sourced from a traditional Pyrenees mill, the loop loops are structured to an extreme weight density of 850g/m, yielding an incredibly soft, structural depth that defies standard wears.',
      type: 'marble' // smooth Radial specular
    },
    'Smoked Oak': {
      lens: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=85',
      zoom: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1400&q=95',
      desc: 'Fumed with reactive minerals, the oak fibers harden and darken to a deep chocolate grain. Sealed with natural beeswax to retain a matte, tactile surface signature.',
      type: 'glass'
    },
    'Calacatta Marble': {
      lens: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=85',
      zoom: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=95',
      desc: 'Quarried in Apuan Alps, containing deep crystalline quartz veining that refracts soft directional light inside the material layers.',
      type: 'marble'
    }
  };

  const fallbacks = [
    {
      name: 'Patinated Brass',
      data: textureDatabase['Patinated Brass']
    },
    {
      name: 'Natural Boucle',
      data: textureDatabase['Natural Boucle']
    }
  ];

  const activeMaterials = mats.map(name => ({
    name,
    data: textureDatabase[name] || fallbacks[0].data
  })).slice(0, 2); // Show top 2 core materials

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
              Tactility Study
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
            Material Integrity
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
            Hover anywhere over the viewports to activate the lens magnifier. Study the granular complexity of raw elements that formulate this custom space.
          </p>
        </div>

        {/* Lens Comparative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {activeMaterials.map((mat) => (
            <MaterialLens
              key={mat.name}
              lensImage={mat.data.lens}
              zoomImage={mat.data.zoom}
              materialName={mat.name}
              description={mat.data.desc}
              reflectType={mat.data.type}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
