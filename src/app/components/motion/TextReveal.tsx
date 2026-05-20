/**
 * TextReveal
 * Drop-in cinematic text reveal component.
 * Wraps any heading or paragraph with GSAP-powered entrance.
 *
 * Usage:
 *   <TextReveal as="h1" mode="mask" delay={0.2}>
 *     Architecture is memory.
 *   </TextReveal>
 *
 * Note: Only works with string children (no nested JSX).
 * For rich content, use the useTextReveal hook directly.
 */

import React, { useEffect, useRef, type CSSProperties } from 'react';
import { gsap } from '../../../lib/gsap';
import {
  splitLines,
  splitWords,
  splitChars,
  animateMaskReveal,
  animateFadeUp,
  animateCharReveal,
} from '../../../lib/gsap/text';

type TagName = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
type RevealMode = 'mask' | 'fade-up' | 'chars';

interface TextRevealProps {
  children: string;
  as?: TagName;
  mode?: RevealMode;
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  className?: string;
  style?: CSSProperties;
}

export function TextReveal({
  children,
  as: Tag = 'div',
  mode = 'mask',
  delay = 0,
  stagger = 0.07,
  duration = 1.0,
  start = 'top 85%',
  className,
  style,
}: TextRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let split: { elements: HTMLElement[]; revert: () => void } | null = null;

    const ctx = gsap.context(() => {
      if (mode === 'mask') {
        split = splitLines(el);
        animateMaskReveal(split.elements, { delay, stagger, duration, trigger: el, start });
      } else if (mode === 'fade-up') {
        split = splitWords(el);
        animateFadeUp(split.elements, { delay, stagger, duration, trigger: el, start });
      } else if (mode === 'chars') {
        split = splitChars(el);
        animateCharReveal(split.elements, {
          delay,
          stagger: stagger * 0.4,
          duration: duration * 0.75,
          trigger: el,
          start,
        });
      }
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [children, mode, delay, stagger, duration, start]);

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}
