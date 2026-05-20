/**
 * ProjectStoryPage — Phase 2D Cinematic Story Experience
 *
 * Architecture:
 *   HeroScene         — full-screen entrance with GSAP timeline + scroll parallax
 *   Chapter mapping   — each ProjectChapter type → a cinematic scene component
 *   StoryProgress     — fixed right-side IntersectionObserver-driven progress rail
 *   ScrollProgress    — global brass bar (imported from cinematic/)
 *   AmbientOverlay    — reusable grain + vignette
 *   Credits block     — staggered reveal at page end
 *
 * Chapter type → Scene mapping:
 *   text              → QuoteScene (if short/emotional) or SplitScene (text-only)
 *   image             → SplitScene (text + image side-by-side)
 *   dual-image        → SplitScene (dual-image layout)
 *   fullscreen-image  → FullscreenScene
 *   stats             → StatsScene
 *
 * Performance:
 *   - All GSAP inside gsap.context() → cleaned up on unmount
 *   - prefers-reduced-motion checked in each scene
 *   - IntersectionObserver for progress (no scroll listeners)
 *   - will-change: transform only on image layers
 */

import { useRef, createRef } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { ScrollProgress } from '../components/cinematic/ScrollProgress';
import { StoryProgress } from '../components/cinematic/StoryProgress';
import { HeroScene } from '../sections/project-story/HeroScene';
import { FullscreenScene } from '../sections/project-story/FullscreenScene';
import { SplitScene } from '../sections/project-story/SplitScene';
import { QuoteScene } from '../sections/project-story/QuoteScene';
import { StatsScene } from '../sections/project-story/StatsScene';
import { projects, defaultProject } from '../../data';
import { colors, fonts, type as typeTokens } from '../../lib/tokens';
import type { ProjectChapter } from '../../types';

// ─── Chapter index → progress rail label ─────────────────────────────────────

function getChapterLabel(chapter: ProjectChapter, index: number): string {
  if (chapter.type === 'text')             return chapter.label ?? `${index + 1}`;
  if (chapter.type === 'stats')            return 'Data';
  if (chapter.type === 'fullscreen-image') return 'View';
  if (chapter.type === 'dual-image')       return 'Study';
  if (chapter.type === 'image')            return 'Image';
  return `${index + 1}`;
}

// ─── Chapter renderer ─────────────────────────────────────────────────────────

interface ChapterRendererProps {
  chapter:   ProjectChapter;
  index:     number;
  sceneRef:  React.RefObject<HTMLElement | null>;
}

function ChapterRenderer({ chapter, index, sceneRef }: ChapterRendererProps) {
  // TEXT chapters — alternate between QuoteScene and SplitScene
  if (chapter.type === 'text') {
    // Short text (≤ 120 chars body) → cinematic quote
    const isQuote = chapter.body.length <= 160;
    if (isQuote) {
      return (
        <QuoteScene
          ref={sceneRef}
          label={chapter.label}
          title={chapter.title}
          body={chapter.body}
          theme={index % 2 === 0 ? 'dark' : 'light'}
        />
      );
    }
    // Long text → split layout (text only, no image partner)
    return (
      <SplitScene
        ref={sceneRef}
        label={chapter.label}
        title={chapter.title}
        body={chapter.body}
        flipped={index % 2 !== 0}
      />
    );
  }

  // IMAGE chapters → split layout with image partner
  if (chapter.type === 'image') {
    return (
      <SplitScene
        ref={sceneRef}
        image={chapter.image}
        caption={chapter.caption}
        flipped={index % 2 !== 0}
      />
    );
  }

  // DUAL-IMAGE → split with two images
  if (chapter.type === 'dual-image') {
    return (
      <SplitScene
        ref={sceneRef}
        images={chapter.images}
        captions={chapter.captions as [string?, string?]}
        flipped={index % 2 !== 0}
      />
    );
  }

  // FULLSCREEN IMAGE
  if (chapter.type === 'fullscreen-image') {
    return (
      <FullscreenScene
        ref={sceneRef}
        image={chapter.image}
        caption={chapter.caption}
      />
    );
  }

  // STATS
  if (chapter.type === 'stats') {
    return (
      <StatsScene
        ref={sceneRef}
        items={chapter.items}
      />
    );
  }

  return null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ProjectStoryPage() {
  const { id } = useParams();
  const project = (id && projects[id]) || defaultProject;
  const chapters = project.chapters ?? [];

  // Create stable refs for each chapter (for StoryProgress IntersectionObserver)
  const chapterRefs = useRef(
    chapters.map(() => createRef<HTMLElement>())
  ).current;

  // Build progress labels
  const progressChapters = chapters.map((ch, i) => ({
    label: getChapterLabel(ch, i),
  }));

  return (
    <div
      style={{ backgroundColor: colors.charcoal, minHeight: '100vh' }}
    >
      {/* Global brass scroll bar */}
      <ScrollProgress />

      {/* Chapter progress rail — desktop only */}
      <StoryProgress
        chapters={progressChapters}
        chapterRefs={chapterRefs}
      />

      {/* Back button */}
      <motion.div
        className="fixed top-24 left-8 md:left-16 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        <Link to="/projects" data-cursor="hover">
          <motion.div
            className="flex items-center gap-2 px-4 py-2"
            style={{
              backgroundColor: 'rgba(30,28,26,0.75)',
              backdropFilter: 'blur(10px)',
            }}
            whileHover={{ x: -3 }}
          >
            <ArrowLeft size={13} color={colors.parchment55} />
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.labelSm,
                color: colors.parchment50,
                letterSpacing: typeTokens.tracking.mid,
                textTransform: 'uppercase',
              }}
            >
              Projects
            </span>
          </motion.div>
        </Link>
      </motion.div>

      {/* ── Hero Scene ─────────────────────────────────────────────── */}
      <HeroScene project={project} />

      {/* ── Story Chapters ─────────────────────────────────────────── */}
      {chapters.map((chapter, i) => (
        <ChapterRenderer
          key={i}
          chapter={chapter}
          index={i}
          sceneRef={chapterRefs[i]}
        />
      ))}

      {/* ── Credits ────────────────────────────────────────────────── */}
      {project.credits && project.credits.length > 0 && (
        <section
          className="px-8 md:px-16 py-24"
          style={{ borderTop: `1px solid rgba(155,145,133,0.1)` }}
        >
          <p
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.labelSm,
              color: colors.stone40,
              letterSpacing: typeTokens.tracking.wide,
              textTransform: 'uppercase',
              marginBottom: '2.5rem',
            }}
          >
            Project Credits
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-0">
            {project.credits.map((credit) => (
              <div
                key={credit.role}
                className="flex items-baseline justify-between py-4"
                style={{ borderBottom: `1px solid rgba(155,145,133,0.08)` }}
              >
                <p
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: typeTokens.labelMd,
                    color: colors.stone40,
                    letterSpacing: typeTokens.tracking.tight,
                  }}
                >
                  {credit.role}
                </p>
                <p
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: '1.1rem',
                    fontWeight: 300,
                    color: colors.parchment70,
                  }}
                >
                  {credit.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
