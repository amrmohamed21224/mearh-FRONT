/**
 * SplitScene — Asymmetric Editorial Chapter
 *
 * Left: editorial typography (label, title, body, optional CTA)
 * Right: cinematic media (image with clip reveal + parallax)
 *
 * Used for: 'text' chapter type with image companion
 *           'dual-image' chapter type
 *
 * Motion:
 *   - Left text: staggered fade-up on scroll entry
 *   - Right image: clip-path reveal (left direction) + inner parallax
 *   - Brass vertical divider animates scaleY from 0→1
 */

import { useRef, useEffect, forwardRef } from 'react';
import { gsap } from '../../../lib/gsap';
import { buildRevealSequence, buildClipTransition } from '../../../lib/gsap/story';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';

interface SplitSceneProps {
  label?:    string;
  title?:    string;
  body?:     string;
  image?:    string;
  images?:   [string, string];
  captions?: [string?, string?];
  caption?:  string;
  /** flip: image left, text right */
  flipped?:  boolean;
}

export const SplitScene = forwardRef<HTMLElement, SplitSceneProps>(
  function SplitScene(
    { label, title, body, image, images, captions, caption, flipped = false },
    ref
  ) {
    const rootRef    = useRef<HTMLElement>(null);
    const textRef    = useRef<HTMLDivElement>(null);
    const mediaRef   = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const imgRef     = useRef<HTMLDivElement>(null);

    const setRef = (el: HTMLElement | null) => {
      (rootRef as React.MutableRefObject<HTMLElement | null>).current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = el;
    };

    useEffect(() => {
      const root    = rootRef.current;
      const text    = textRef.current;
      const media   = mediaRef.current;
      const divider = dividerRef.current;
      const img     = imgRef.current;
      if (!root || !text || !media) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const ctx = gsap.context(() => {
        // 1. Text children — staggered fade-up
        const textEls = Array.from(text.children) as HTMLElement[];
        buildRevealSequence({
          elements: textEls,
          trigger:  root,
          start:    'top 75%',
          stagger:  0.12,
          y:        36,
        });

        // 2. Brass divider — scaleY 0 → 1
        if (divider) {
          gsap.fromTo(divider,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: root,
                start:   'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // 3. Media clip reveal (direction opposite to text side)
        if (img) {
          buildClipTransition(img, root, {
            direction: flipped ? 'left' : 'left',
            start: 'top 80%',
            end:   'top 25%',
          });

          // 4. Inner image parallax
          const innerImg = img.querySelector<HTMLElement>('img, .media-bg');
          if (innerImg) {
            gsap.fromTo(innerImg,
              { yPercent: -6 },
              {
                yPercent: 6,
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
          }
        }
      }, root);

      return () => ctx.revert();
    }, [flipped]);

    const textBlock = (
      <div className="flex flex-col justify-center py-16 md:py-24 px-8 md:px-12 lg:px-16">
        <div ref={textRef} className="max-w-xl">
          {label && (
            <p
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.labelSm,
                color: colors.brass,
                letterSpacing: typeTokens.tracking.mid,
                textTransform: 'uppercase',
                marginBottom: '1.2rem',
              }}
            >
              {label}
            </p>
          )}
          {title && (
            <h2
              style={{
                fontFamily: fonts.serif,
                fontSize: typeTokens.sectionMd,
                fontWeight: 300,
                color: colors.parchment,
                lineHeight: 1.18,
                letterSpacing: '-0.01em',
                marginBottom: '1.8rem',
              }}
            >
              {title}
            </h2>
          )}
          {body && (
            <p
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.bodyLg,
                fontWeight: 300,
                color: colors.stone50,
                lineHeight: 2.0,
              }}
            >
              {body}
            </p>
          )}
        </div>
      </div>
    );

    const mediaBlock = (
      <div
        ref={mediaRef}
        className="relative overflow-hidden min-h-[360px] md:min-h-0"
      >
        {/* Single image */}
        {image && (
          <div
            ref={imgRef}
            className="absolute inset-0"
            style={{ clipPath: 'inset(0% 0% 0% 100%)' }}
          >
            <img
              src={image}
              alt=""
              className="media-bg w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Dual images */}
        {images && (
          <div ref={imgRef} className="grid grid-cols-2 h-full gap-1">
            {images.map((src, i) => (
              <div key={i} className="relative overflow-hidden">
                <img
                  src={src}
                  alt={captions?.[i] ?? ''}
                  className="w-full h-full object-cover"
                  style={{ minHeight: 240 }}
                  loading="lazy"
                />
                {captions?.[i] && (
                  <p
                    className="absolute bottom-3 left-3"
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: typeTokens.labelSm,
                      color: colors.parchment40,
                    }}
                  >
                    {captions[i]}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Single caption */}
        {caption && !images && (
          <p
            className="absolute bottom-4 left-4"
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.labelMd,
              color: colors.parchment40,
            }}
          >
            {caption}
          </p>
        )}
      </div>
    );

    return (
      <section
        ref={setRef}
        className="relative grid grid-cols-1 md:grid-cols-2 min-h-[60vh]"
        style={{ backgroundColor: colors.charcoal }}
      >
        {/* Vertical brass divider */}
        <div
          ref={dividerRef}
          className="hidden md:block absolute top-0 bottom-0 z-10 pointer-events-none"
          style={{
            left: '50%',
            width: 1,
            backgroundColor: `rgba(181,146,76,0.2)`,
            transformOrigin: 'top center',
            transform: 'scaleY(0)',
          }}
        />

        {flipped ? (
          <>
            {mediaBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {mediaBlock}
          </>
        )}
      </section>
    );
  }
);
