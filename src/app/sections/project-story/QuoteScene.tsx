/**
 * QuoteScene — Manifesto / Oversized Typography Chapter
 *
 * Used for: 'text' chapters that are short and emotionally charged.
 * Full-section centered oversized text with atmospheric fades.
 *
 * Motion:
 *   - Background dark vignette fades in on scroll entry
 *   - Label slides up (fade-up)
 *   - H2 word-by-word stagger reveal
 *   - Brass horizontal rule expands from center
 */

import { useRef, useEffect, forwardRef } from 'react';
import { gsap } from '../../../lib/gsap';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';

interface QuoteSceneProps {
  label?:  string;
  title:   string;
  body?:   string;
  /** Light (parchment) or dark (charcoal) background */
  theme?: 'dark' | 'light';
}

export const QuoteScene = forwardRef<HTMLElement, QuoteSceneProps>(
  function QuoteScene({ label, title, body, theme = 'dark' }, ref) {
    const rootRef    = useRef<HTMLElement>(null);
    const labelRef   = useRef<HTMLParagraphElement>(null);
    const titleRef   = useRef<HTMLHeadingElement>(null);
    const ruleRef    = useRef<HTMLDivElement>(null);
    const bodyRef    = useRef<HTMLParagraphElement>(null);

    const setRef = (el: HTMLElement | null) => {
      (rootRef as React.MutableRefObject<HTMLElement | null>).current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = el;
    };

    const isDark = theme === 'dark';
    const bg     = isDark ? colors.charcoal    : colors.parchment;
    const fg     = isDark ? colors.parchment   : colors.charcoal;
    const muted  = isDark ? colors.stone50     : colors.stoneTaupe;

    useEffect(() => {
      const root  = rootRef.current;
      const label = labelRef.current;
      const title = titleRef.current;
      const rule  = ruleRef.current;
      const body  = bodyRef.current;
      if (!root || !title) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const ctx = gsap.context(() => {
        const ST_CONFIG = {
          trigger: root,
          start:   'top 72%',
          toggleActions: 'play none none none',
        };

        // Label
        if (label) {
          gsap.fromTo(label,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: ST_CONFIG }
          );
        }

        // Brass rule — expand from center
        if (rule) {
          gsap.fromTo(rule,
            { scaleX: 0, transformOrigin: 'center center' },
            { scaleX: 1, duration: 1.0, ease: 'power3.inOut', delay: 0.1, scrollTrigger: ST_CONFIG }
          );
        }

        // Title — word stagger
        const words = Array.from(title.querySelectorAll<HTMLElement>('.q-word'));
        if (words.length) {
          gsap.fromTo(words,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.06,
              ease: 'power3.out',
              delay: 0.15,
              scrollTrigger: ST_CONFIG,
            }
          );
        }

        // Body
        if (body) {
          gsap.fromTo(body,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.4, scrollTrigger: ST_CONFIG }
          );
        }
      }, root);

      return () => ctx.revert();
    }, [theme]);

    // Split title into word spans for stagger
    const wordSpans = title.split(' ').map((word, i) => (
      <span
        key={i}
        className="q-word"
        style={{ display: 'inline-block', marginRight: '0.28em', opacity: 0 }}
      >
        {word}
      </span>
    ));

    return (
      <section
        ref={setRef}
        className="relative flex flex-col items-center justify-center
                   py-36 md:py-48 px-8 md:px-16 text-center overflow-hidden"
        style={{ backgroundColor: bg }}
      >
        {/* Label */}
        {label && (
          <p
            ref={labelRef}
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.labelSm,
              color: colors.brass,
              letterSpacing: typeTokens.tracking.wide,
              textTransform: 'uppercase',
              marginBottom: '2rem',
              opacity: 0,
            }}
          >
            {label}
          </p>
        )}

        {/* Brass rule */}
        <div
          ref={ruleRef}
          style={{
            width: '4rem',
            height: 1,
            backgroundColor: colors.brass,
            marginBottom: '2.5rem',
            transform: 'scaleX(0)',
          }}
        />

        {/* Title */}
        <h2
          ref={titleRef}
          style={{
            fontFamily: fonts.serif,
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: 300,
            color: fg,
            lineHeight: 1.22,
            letterSpacing: '-0.01em',
            maxWidth: '52rem',
          }}
        >
          {wordSpans}
        </h2>

        {/* Body */}
        {body && (
          <p
            ref={bodyRef}
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.bodyLg,
              fontWeight: 300,
              color: muted,
              lineHeight: 2.0,
              maxWidth: '38rem',
              marginTop: '2.5rem',
              opacity: 0,
            }}
          >
            {body}
          </p>
        )}
      </section>
    );
  }
);
