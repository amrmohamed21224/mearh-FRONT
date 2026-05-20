/**
 * FeaturedProjectsSection (Home)
 *
 * Horizontal scroll gallery powered by GSAP ScrollTrigger.
 * Uses the reusable HorizontalGallery + ParallaxLayer infrastructure.
 *
 * Architecture:
 *   - Intro slide (editorial title + CTA)
 *   - N project cards, each with:
 *       clip-path scroll-scrub reveal
 *       inner image parallax (slower than card)
 *       editorial text fade-up
 *
 * Motion tokens from tokens.ts — no magic numbers inline.
 */

import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../../lib/gsap';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';
import { clipScrubReveal } from '../../../lib/gsap/clip';
import { HorizontalGallery } from '../../components/cinematic/HorizontalGallery';

const projects = [
  {
    id: 'casa-pietra',
    title: 'Casa Pietra',
    subtitle: 'Tuscany Villa Restoration',
    year: '2024',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1683290844875-0eee4089069a?auto=format&fit=crop&w=1600&q=90',
    description: 'A 16th-century stone farmhouse reimagined through the lens of contemporary minimalism.',
  },
  {
    id: 'arc-lumineux',
    title: 'Arc Lumineux',
    subtitle: 'Parisian Penthouse',
    year: '2025',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1777603371625-fe9aa715dc39?auto=format&fit=crop&w=1600&q=90',
    description: 'Light as architecture. Brass and marble in dialogue with Haussmann geometry.',
  },
  {
    id: 'void-collective',
    title: 'Void Collective',
    subtitle: 'Tokyo Gallery Space',
    year: '2025',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1758448756362-e323282ccbcc?auto=format&fit=crop&w=1600&q=90',
    description: 'Negative space as the primary material. An essay in architectural restraint.',
  },
];

// ─── Project Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card  = cardRef.current;
    const image = imageRef.current;
    const text  = textRef.current;
    if (!card || !image || !text) return;

    const ctx = gsap.context(() => {
      // 1. Image clip-path reveal — scrubbed (reveals as card enters viewport)
      clipScrubReveal(image, {
        direction: 'up',
        trigger: card,
        start: 'top 80%',
        end: 'top 20%',
      });

      // 2. Inner image parallax (slower than card — depth illusion)
      const img = image.querySelector('img');
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 3. Text fade-up when card is in view
      gsap.fromTo(
        text.children,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="w-full md:w-[680px] flex-shrink-0 flex flex-col justify-center
                 py-12 md:py-0 px-4 md:px-12 first:md:pl-24"
    >
      <Link to={`/projects/${project.id}`} data-cursor="view">
        <div className="group">
          {/* Image container */}
          <div
            ref={imageRef}
            className="overflow-hidden relative"
            style={{ clipPath: 'inset(100% 0% 0% 0%)' }} // initial state for clip-scrub
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover scale-[1.12]
                           transition-transform duration-700
                           group-hover:scale-[1.08]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.21,0.47,0.32,0.98)' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Text block */}
          <div ref={textRef} className="mt-8">
            <p
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.labelSm,
                color: colors.brass,
                letterSpacing: typeTokens.tracking.mid,
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}
            >
              {project.category} — {project.year}
            </p>
            <h3
              style={{
                fontFamily: fonts.serif,
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 300,
                color: colors.charcoal,
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.bodyMd,
                fontWeight: 300,
                color: colors.stoneTaupe,
                lineHeight: 1.7,
                marginTop: '0.6rem',
                maxWidth: '26rem',
              }}
            >
              {project.description}
            </p>

            {/* Hover CTA */}
            <div
              className="flex items-center gap-2 mt-5
                         opacity-0 group-hover:opacity-100
                         translate-x-[-8px] group-hover:translate-x-0
                         transition-all duration-300"
            >
              <span
                style={{
                  fontFamily: fonts.sans,
                  fontSize: typeTokens.labelSm,
                  color: colors.brass,
                  letterSpacing: typeTokens.tracking.mid,
                  textTransform: 'uppercase',
                }}
              >
                View Project
              </span>
              <ArrowUpRight size={13} color={colors.brass} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function FeaturedProjectsSection() {
  return (
    <HorizontalGallery
      scrollDuration="280%"
      showProgress
      label="01"
      total={projects.length}
      className="bg-[#F7F4EE]"
    >
      {/* Intro slide */}
      <div
        className="w-full md:w-[420px] flex-shrink-0 flex flex-col justify-center
                   px-8 md:px-24 py-24 md:py-0"
      >
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
            Selected Work
          </span>
        </div>

        <h2
          style={{
            fontFamily: fonts.serif,
            fontSize: typeTokens.sectionXl,
            fontWeight: 300,
            color: colors.charcoal,
            letterSpacing: '-0.01em',
            lineHeight: 1.08,
          }}
        >
          Featured<br />
          <em style={{ fontStyle: 'italic', color: colors.stoneTaupe }}>
            Projects
          </em>
        </h2>

        <Link to="/projects" data-cursor="hover" className="inline-block mt-10">
          <div
            className="flex items-center gap-2
                       transition-transform duration-300
                       hover:translate-x-1"
          >
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.labelMd,
                color: colors.brass,
                letterSpacing: typeTokens.tracking.normal,
                textTransform: 'uppercase',
              }}
            >
              All Projects
            </span>
            <ArrowRight size={13} color={colors.brass} />
          </div>
        </Link>
      </div>

      {/* Cards */}
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}

      {/* End spacer */}
      <div className="w-16 md:w-24 flex-shrink-0" aria-hidden="true" />
    </HorizontalGallery>
  );
}
