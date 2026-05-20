/**
 * MaterialStripSection (Home)
 *
 * Luxury material interaction strip.
 * Mouse-driven direction-aware texture parallax on each swatch.
 * Brass hover line expands on entry.
 *
 * Motion:
 *   - Swatch clip-path reveal on scroll entry (staggered)
 *   - Mouse movement shifts texture image (GPU translate3d)
 *   - Brass underline expands from left on hover
 *   - Cursor switches to "material mode" via data-cursor
 *
 * Performance:
 *   - All transforms via translate3d (compositor thread)
 *   - clip-path reveal is CSS-transition only (no JS layout)
 *   - useRef-based local mouse coords (no global state)
 */

import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { gsap } from '../../../lib/gsap';
import { clipRevealStagger } from '../../../lib/gsap/clip';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';

const MATERIALS = [
  {
    name: 'Calacatta Oro',
    family: 'Marble',
    color: '#EDE8E0',
    accent: '#C8B99A',
    image: 'https://images.unsplash.com/photo-1683290844875-0eee4089069a?auto=format&fit=crop&w=600&q=85',
  },
  {
    name: 'Brushed Brass',
    family: 'Metal',
    color: '#C9A86C',
    accent: '#8B6E3C',
    image: 'https://images.unsplash.com/photo-1552858725-2758b5fb1286?auto=format&fit=crop&w=600&q=85',
  },
  {
    name: 'Smoked Oak',
    family: 'Wood',
    color: '#6B5C4A',
    accent: '#8B7355',
    image: 'https://images.unsplash.com/photo-1757439402103-fc35542f96f8?auto=format&fit=crop&w=600&q=85',
  },
  {
    name: 'Pietra Serena',
    family: 'Stone',
    color: '#8A8078',
    accent: '#5A5350',
    image: 'https://images.unsplash.com/photo-1599968164773-c01cf3159a67?auto=format&fit=crop&w=600&q=85',
  },
  {
    name: 'Nero Marquina',
    family: 'Marble',
    color: '#1E1C1A',
    accent: '#3C3830',
    image: 'https://images.unsplash.com/photo-1743708282103-99ca20d4803f?auto=format&fit=crop&w=600&q=85',
  },
];

// ─── Single Material Swatch ───────────────────────────────────────────────────

interface SwatchProps {
  material: typeof MATERIALS[0];
  index: number;
}

function MaterialSwatch({ material, index }: SwatchProps) {
  const rootRef   = useRef<HTMLDivElement>(null);
  const imageRef  = useRef<HTMLDivElement>(null);
  const lineRef   = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    const image = imageRef.current;
    if (!root || !image) return;

    const rect = root.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -18;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -18;

    image.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.12)`;
  };

  const handleMouseLeave = () => {
    const image = imageRef.current;
    if (image) image.style.transform = 'translate3d(0,0,0) scale(1.12)';
    setHovered(false);
  };

  return (
    <Link
      to="/materials"
      data-cursor="material"
      data-cursor-label="Touch"
    >
      <div
        ref={rootRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden cursor-none"
        style={{
          height: 180,
          backgroundColor: material.color,
          transition: 'height 0.5s cubic-bezier(0.21,0.47,0.32,0.98)',
        }}
      >
        {/* Texture image — direction-aware parallax */}
        <div
          ref={imageRef}
          className="absolute -inset-4"
          style={{
            transition: 'transform 0.15s ease-out',
            transform: 'translate3d(0,0,0) scale(1.12)',
          }}
        >
          <img
            src={material.image}
            alt={material.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Color overlay (fades out on hover) */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundColor: material.color,
            opacity: hovered ? 0.15 : 0.8,
          }}
        />

        {/* Text content */}
        <div
          className="absolute bottom-0 left-0 right-0 p-5 z-10"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
          }}
        >
          <p
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.labelSm,
              color: 'rgba(247,244,238,0.55)',
              letterSpacing: typeTokens.tracking.mid,
              textTransform: 'uppercase',
              marginBottom: '0.2rem',
            }}
          >
            {material.family}
          </p>
          <p
            style={{
              fontFamily: fonts.serif,
              fontSize: '1.15rem',
              fontWeight: 300,
              color: '#F7F4EE',
            }}
          >
            {material.name}
          </p>

          {/* Brass hover line */}
          <div
            ref={lineRef}
            className="mt-2 h-px origin-left transition-all duration-500"
            style={{
              backgroundColor: colors.brass,
              transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
              width: '100%',
            }}
          />
        </div>
      </div>
    </Link>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function MaterialStripSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const swatchesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section  = sectionRef.current;
    const swatches = swatchesRef.current;
    if (!section || !swatches) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const swatchEls = Array.from(
        swatches.querySelectorAll<HTMLDivElement>('.swatch-item')
      );

      // Staggered clip-path reveal as section enters
      clipRevealStagger(swatchEls, {
        direction: 'up',
        duration: 1.0,
        stagger: 0.08,
        trigger: section,
        start: 'top 75%',
        once: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-8 md:px-16"
      style={{ backgroundColor: '#F7F4EE' }}
    >
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end mb-16">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8" style={{ backgroundColor: colors.brass }} />
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.label,
                color: colors.stoneTaupe,
                letterSpacing: typeTokens.tracking.wide,
                textTransform: 'uppercase',
              }}
            >
              Material Lab
            </span>
          </div>

          <h2
            style={{
              fontFamily: fonts.serif,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              color: colors.charcoal,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            Touch the materials<br />
            <em style={{ color: colors.stoneTaupe, fontStyle: 'italic' }}>
              that shape worlds.
            </em>
          </h2>
        </div>

        <div>
          <p
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.bodyMd,
              fontWeight: 300,
              color: colors.stoneTaupe,
              lineHeight: 1.9,
              maxWidth: '28rem',
              marginBottom: '2rem',
            }}
          >
            Our material explorer lets you feel the weight, warmth,
            and character of each element before it enters your space.
          </p>
          <Link to="/materials" data-cursor="hover">
            <div className="inline-flex items-center gap-2 hover:translate-x-1 transition-transform duration-300">
              <span
                style={{
                  fontFamily: fonts.sans,
                  fontSize: typeTokens.labelMd,
                  color: colors.brass,
                  letterSpacing: typeTokens.tracking.normal,
                  textTransform: 'uppercase',
                }}
              >
                Explore Materials
              </span>
              <ArrowRight size={13} color={colors.brass} />
            </div>
          </Link>
        </div>
      </div>

      {/* Swatch strip */}
      <div
        ref={swatchesRef}
        className="grid grid-cols-2 md:grid-cols-5 gap-2"
      >
        {MATERIALS.map((material, i) => (
          <div key={material.name} className="swatch-item" style={{ clipPath: 'inset(100% 0% 0% 0%)' }}>
            <MaterialSwatch material={material} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
