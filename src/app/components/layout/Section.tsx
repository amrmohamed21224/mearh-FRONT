import type { ReactNode, CSSProperties } from 'react';

interface SectionProps {
  children: ReactNode;
  /** Background color */
  background?: string;
  /** Vertical padding class (default: py-32) */
  padding?: string;
  /** Whether to include horizontal padding (px-8 md:px-16) */
  withGutter?: boolean;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

/**
 * Section
 * Semantic <section> with standardized vertical rhythm.
 * Optionally includes horizontal gutter.
 */
export function Section({
  children,
  background,
  padding = 'py-32',
  withGutter = true,
  className = '',
  style,
  id,
}: SectionProps) {
  const gutterClass = withGutter ? 'px-8 md:px-16' : '';
  return (
    <section
      id={id}
      className={`${padding} ${gutterClass} ${className}`}
      style={{ backgroundColor: background, ...style }}
    >
      {children}
    </section>
  );
}
