/**
 * HeroScene — Project Story Hero
 *
 * Full-screen cinematic hero for ProjectStoryPage.
 * Migrated fully to GSAP — no Framer Motion scroll hooks.
 *
 * Motion sequence:
 *   0.0s  curtain reveal (clip-path inset)
 *   0.3s  atmospheric overlay
 *   1.1s  studio label
 *   1.5s  h1 mask reveals (line by line)
 *   2.3s  meta bar
 *
 * Scroll parallax:
 *   bg image: yPercent -10 → 20 (scrub)
 *   content: opacity 1 → 0, y: 0 → 40 (scrub)
 */

import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { gsap } from '../../../lib/gsap';
import { buildHeroTimeline, buildParallaxScene } from '../../../lib/gsap/story';
import { AmbientOverlay } from '../../components/cinematic/AmbientOverlay';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';
import type { Project } from '../../../types/project';

interface HeroSceneProps {
  project: Project;
}

export function HeroScene({ project }: HeroSceneProps) {
  const rootRef     = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLDivElement>(null);
  const metaRef     = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);

  // ── Mount: cinematic entrance
  useEffect(() => {
    const root    = rootRef.current;
    const image   = imageRef.current;
    const overlay = overlayRef.current;
    const label   = labelRef.current;
    const title   = titleRef.current;
    const meta    = metaRef.current;
    if (!root || !image || !overlay || !label || !title || !meta) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([image, overlay, label, title, meta], { opacity: 1, clipPath: 'none', y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const titleLines = Array.from(
        title.querySelectorAll<HTMLElement>('.story-line')
      );

      buildHeroTimeline({
        imageLayer:   image,
        overlayLayer: overlay,
        labelEl:      label,
        titleLines,
        metaEl:       meta,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // ── Scroll: parallax depth
  useEffect(() => {
    const root    = rootRef.current;
    const image   = imageRef.current;
    const content = contentRef.current;
    if (!root || !image || !content) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      buildParallaxScene({
        trigger:    root,
        background: image,
        foreground: content,
        bgYEnd:     22,
        fgYEnd:     40,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: colors.charcoal }}
    >
      {/* Background image layer */}
      <div
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${project.heroImage || project.image})`,
          scale: 1.12,
          clipPath: 'inset(100% 0% 0% 0%)',
        }}
      />

      {/* Atmospheric overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            ${colors.charcoalHeroTop} 0%,
            ${colors.charcoalHeroMid} 40%,
            ${colors.charcoalHeroBottom} 100%
          )`,
          opacity: 0,
          zIndex: 2,
        }}
      />

      {/* Ambient grain + vignette */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        <AmbientOverlay grain={0.03} vignette={0.5} zIndex={1} />
      </div>

      {/* Content layer */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-end pb-20 px-8 md:px-16"
        style={{ zIndex: 10 }}
      >
        {/* Label */}
        <div
          ref={labelRef}
          className="flex items-center gap-3 mb-8"
          style={{ opacity: 0 }}
        >
          <div
            className="h-px w-8"
            style={{ backgroundColor: colors.brass }}
          />
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.label,
              color: colors.parchment55,
              letterSpacing: typeTokens.tracking.wide,
              textTransform: 'uppercase',
            }}
          >
            {project.category} — {project.location} — {project.year}
          </span>
        </div>

        {/* H1 — line mask container */}
        <div ref={titleRef} className="overflow-hidden">
          {/* Line 1 */}
          <div
            className="story-line overflow-hidden"
            style={{ display: 'block' }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: fonts.serif,
                fontSize: typeTokens.heroLg,
                fontWeight: 300,
                color: colors.parchment,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
              }}
            >
              {project.title}
            </span>
          </div>
          {/* Line 2 */}
          <div
            className="story-line overflow-hidden"
            style={{ display: 'block' }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: fonts.serif,
                fontSize: typeTokens.heroLg,
                fontWeight: 300,
                color: colors.parchment50,
                lineHeight: 0.92,
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
              }}
            >
              {project.subtitle}
            </span>
          </div>
        </div>

        {/* Meta bar */}
        <div
          ref={metaRef}
          className="mt-10 flex items-center gap-8"
          style={{ opacity: 0 }}
        >
          {[
            { label: 'Location', value: project.location },
            { label: 'Area',     value: project.area },
            { label: 'Year',     value: project.year },
          ].map((item) => (
            <div key={item.label}>
              <p
                style={{
                  fontFamily: fonts.sans,
                  fontSize: typeTokens.labelSm,
                  color: colors.stone50,
                  letterSpacing: typeTokens.tracking.mid,
                  textTransform: 'uppercase',
                  marginBottom: '0.3rem',
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  fontFamily: fonts.serif,
                  fontSize: '1.2rem',
                  fontWeight: 300,
                  color: colors.parchment70,
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
