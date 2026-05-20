/**
 * FullscreenScene — Immersive Image Chapter
 *
 * Full-viewport image with:
 *   - slow zoom breathe effect (GSAP keyframe loop)
 *   - scrubbed parallax (bg moves slower than viewport)
 *   - clip-path entrance from scroll
 *   - editorial caption overlay
 *   - atmospheric overlay
 *
 * Used for: 'fullscreen-image' chapter type
 */

import { useRef, useEffect, forwardRef } from 'react';
import { gsap } from '../../../lib/gsap';
import { buildClipTransition } from '../../../lib/gsap/story';
import { AmbientOverlay } from '../../components/cinematic/AmbientOverlay';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';

interface FullscreenSceneProps {
  image:    string;
  caption?: string;
  label?:   string;
}

export const FullscreenScene = forwardRef<HTMLElement, FullscreenSceneProps>(
  function FullscreenScene({ image, caption, label }, ref) {
    const rootRef   = useRef<HTMLElement>(null);
    const imageRef  = useRef<HTMLDivElement>(null);
    const wrapRef   = useRef<HTMLDivElement>(null);

    // Combine forwarded ref + local ref
    const setRef = (el: HTMLElement | null) => {
      (rootRef as React.MutableRefObject<HTMLElement | null>).current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = el;
    };

    useEffect(() => {
      const root  = rootRef.current;
      const image = imageRef.current;
      const wrap  = wrapRef.current;
      if (!root || !image || !wrap) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(wrap, { clipPath: 'inset(0% 0% 0% 0%)' });
        return;
      }

      const ctx = gsap.context(() => {
        // 1. Clip-path entrance (scroll-scrubbed)
        buildClipTransition(wrap, root, {
          direction: 'up',
          start: 'top 90%',
          end:   'top 20%',
        });

        // 2. Image parallax — bg moves slower than viewport
        gsap.fromTo(image,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end:   'bottom top',
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          }
        );

        // 3. Ambient breathe (slow scale loop)
        gsap.to(image, {
          scale: 1.06,
          duration: 8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }, root);

      return () => ctx.revert();
    }, []);

    return (
      <section
        ref={setRef}
        className="relative overflow-hidden"
        style={{ height: '90vh', backgroundColor: colors.charcoal }}
      >
        {/* Clip-path wrapper for entrance */}
        <div
          ref={wrapRef}
          className="absolute inset-0"
          style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        >
          {/* Image */}
          <div
            ref={imageRef}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${image})`, scale: 1.08 }}
          />

          {/* Overlay + ambient */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(30,28,26,0.1) 0%,
                rgba(30,28,26,0.05) 50%,
                rgba(30,28,26,0.65) 100%
              )`,
              zIndex: 2,
            }}
          />

          <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
            <AmbientOverlay grain={0.025} vignette={0.45} zIndex={1} />
          </div>

          {/* Caption + label */}
          <div
            className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12"
            style={{ zIndex: 10 }}
          >
            {label && (
              <p
                style={{
                  fontFamily: fonts.sans,
                  fontSize: typeTokens.labelSm,
                  color: colors.brass,
                  letterSpacing: typeTokens.tracking.mid,
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                {label}
              </p>
            )}
            {caption && (
              <p
                style={{
                  fontFamily: fonts.sans,
                  fontSize: typeTokens.labelMd,
                  fontWeight: 300,
                  color: colors.parchment40,
                  letterSpacing: typeTokens.tracking.xs,
                  maxWidth: '44rem',
                }}
              >
                {caption}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }
);
