/**
 * CinematicHero — Phase 2B
 * Layered architectural hero experience.
 *
 * Architecture:
 *   Layer 0 — Image stack (crossfade, clip-path reveal, GSAP parallax)
 *   Layer 1 — Cinematic grain overlay (CSS noise filter + animation)
 *   Layer 2 — Directional overlay gradients (atmospheric depth)
 *   Layer 3 — Typography + CTAs (GSAP mask reveal sequence)
 *   Layer 4 — Counter + scroll indicator
 *
 * Motion sequence:
 *   0.0s  — image clip-path reveal (inset 100% → 0%, power4.inOut, 1.8s)
 *   0.3s  — overlay fades in
 *   1.2s  — label slides up
 *   1.6s  — h1 lines mask reveal (stagger 0.12s)
 *   2.5s  — CTAs fade up
 *   3.0s  — counter + scroll indicator appear
 *
 * Scroll timeline (scrub):
 *   image layer: yPercent 0 → 15 (slow, deep)
 *   text layer:  yPercent 0 → 30 + fade
 */

import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../../lib/gsap';
import { colors, fonts, type as typeTokens, motion as motionTokens } from '../../../lib/tokens';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1682184805271-11671b7ecf4c?auto=format&fit=crop&w=2400&q=90',
  'https://images.unsplash.com/photo-1541848212-388760a351b9?auto=format&fit=crop&w=2400&q=90',
  'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?auto=format&fit=crop&w=2400&q=90',
];

export function CinematicHero() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);

  // ─── Image crossfade cycle ─────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      setActiveImage(prev => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // ─── Mount cinematic sequence ──────────────────────────────────────────────
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // 1. Image reveal — architectural curtain
      tl.fromTo('.hero-image-layer',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'power4.inOut' },
        0
      );

      // 2. Overlay atmosphere
      tl.fromTo('.hero-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 1.4 },
        0.2
      );

      // 3. Studio label
      tl.fromTo('.hero-label',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.9 },
        1.2
      );

      // 4. H1 line mask reveals — each line slides up from behind overflow:hidden
      tl.fromTo('.hero-line',
        { yPercent: 110, opacity: 1 },
        { yPercent: 0, duration: 1.05, ease: 'power4.out', stagger: 0.13 },
        1.55
      );

      // 5. Divider line grow
      tl.fromTo('.hero-divider',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.9 },
        2.4
      );

      // 6. CTAs
      tl.fromTo('.hero-cta',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        2.55
      );

      // 7. Counter + scroll indicator
      tl.fromTo(['.hero-counter', '.hero-scroll-indicator'],
        { opacity: 0 },
        { opacity: 1, duration: 0.7, stagger: 0.1 },
        3.0
      );

    }, el);

    return () => ctx.revert();
  }, []);

  // ─── Scroll-driven parallax ────────────────────────────────────────────────
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Background image — deepest layer, moves slowest
      gsap.to('.hero-bg-parallax', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        },
      });

      // Text + overlay — closer layer, moves faster
      gsap.to('.hero-content-layer', {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Opacity fade out as user scrolls
      gsap.to('.hero-content-layer', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '55% top',
          scrub: 1,
        },
      });

      // Grain layer moves at its own pace — adds depth
      gsap.to('.hero-grain-layer', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });

    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: colors.charcoal }}
    >

      {/* ── SVG Noise Filter Definition ─────────────────────────────────── */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <filter id="mearh-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.68"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* ── Layer 0: Image stack ─────────────────────────────────────────── */}
      <div className="hero-image-layer absolute inset-0" style={{ zIndex: 1 }}>
        {HERO_IMAGES.map((img, i) => (
          <div
            key={img}
            className="absolute inset-0 transition-opacity"
            style={{
              opacity: i === activeImage ? 1 : 0,
              transitionDuration: '1.6s',
              transitionTimingFunction: 'cubic-bezier(0.45,0,0.55,1)',
              zIndex: i === activeImage ? 1 : 0,
            }}
          >
            <div
              className="hero-bg-parallax absolute inset-0"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: 'scale(1.12)',
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Layer 1: Cinematic grain ─────────────────────────────────────── */}
      <div
        className="hero-grain-layer absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          opacity: 0.038,
          filter: 'url(#mearh-grain)',
          backgroundColor: colors.stoneTaupe,
          width: '120%',
          height: '120%',
          top: '-10%',
          left: '-10%',
        }}
        aria-hidden="true"
      />

      {/* ── Layer 2: Atmospheric gradient overlay ───────────────────────── */}
      <div
        className="hero-overlay absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background: [
            'linear-gradient(to bottom,',
            `  ${colors.charcoalHeroTop} 0%,`,
            `  ${colors.charcoalHeroMid} 40%,`,
            `  rgba(30,28,26,0.65) 100%`,
            ')',
          ].join(''),
        }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Typography + CTAs ───────────────────────────────────── */}
      <div
        className="hero-content-layer absolute inset-0 flex flex-col justify-end"
        style={{ zIndex: 4, paddingBottom: '5.5rem', paddingLeft: '4rem', paddingRight: '4rem' }}
      >
        <div style={{ maxWidth: '64rem' }}>

          {/* Studio label */}
          <div
            className="hero-label flex items-center gap-3 mb-8"
            style={{ opacity: 0 }}
          >
            <div
              className="hero-divider h-px w-8"
              style={{ backgroundColor: colors.brass, display: 'block' }}
            />
            <span
              className="tracking-[0.3em] uppercase"
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.label,
                color: colors.parchment55,
              }}
            >
              Architecture Studio — Florence
            </span>
          </div>

          {/* H1 — mask reveal per line */}
          <h1
            style={{
              fontFamily: fonts.serif,
              fontSize: typeTokens.heroXl,
              fontWeight: fonts.weights.light,
              color: colors.parchment,
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            <span className="hero-line-wrap">
              <span className="hero-line">Space that</span>
            </span>
            <span className="hero-line-wrap">
              <em
                className="hero-line"
                style={{ fontStyle: 'italic', color: colors.parchment70 }}
              >
                remembers
              </em>
            </span>
            <span className="hero-line-wrap">
              <span className="hero-line">you.</span>
            </span>
          </h1>

          {/* CTAs */}
          <div className="mt-12 flex items-center gap-8">
            <Link to="/projects" data-cursor="view" data-cursor-label="Explore">
              <div
                className="hero-cta group flex items-center gap-3"
                style={{ opacity: 0 }}
              >
                <span
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: '0.75rem',
                    fontWeight: fonts.weights.normal,
                    color: colors.parchment,
                    letterSpacing: typeTokens.tracking.normal,
                    textTransform: 'uppercase',
                    transition: 'color 0.3s',
                  }}
                >
                  View Projects
                </span>
                <ArrowRight
                  size={13}
                  color={colors.brass}
                  style={{ transition: 'transform 0.35s', marginTop: 1 }}
                />
              </div>
            </Link>

            <Link to="/consultation" data-cursor="hover">
              <div
                className="hero-cta flex items-center gap-3"
                style={{ opacity: 0 }}
              >
                <span
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: '0.75rem',
                    fontWeight: fonts.weights.normal,
                    color: colors.parchment50,
                    letterSpacing: typeTokens.tracking.normal,
                    textTransform: 'uppercase',
                    transition: 'color 0.35s',
                  }}
                >
                  Begin Consultation
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Layer 4: Image counter ───────────────────────────────────────── */}
      <div
        className="hero-counter absolute right-8 md:right-16 bottom-8"
        style={{ zIndex: 5, opacity: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}
      >
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            aria-label={`View image ${i + 1}`}
            style={{
              height: '1px',
              width: i === activeImage ? '2rem' : '0.75rem',
              backgroundColor: i === activeImage ? colors.brass : colors.parchment30,
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 0.5s cubic-bezier(0.45,0,0.55,1), background-color 0.5s',
            }}
          />
        ))}
      </div>

      {/* ── Layer 4: Scroll indicator ────────────────────────────────────── */}
      <div
        className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 5, opacity: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}
        aria-hidden="true"
      >
        <ChevronDown size={15} color={colors.parchment40} />
      </div>

    </div>
  );
}
