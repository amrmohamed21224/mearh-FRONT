import type { ReactNode, CSSProperties, ElementType } from 'react';

interface ContainerProps {
  children: ReactNode;
  /** Render as a different element (default: div) */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/**
 * Container
 * Applies the universal horizontal gutter: px-8 md:px-16
 * Replaces the repeated padding pattern on every page section.
 */
export function Container({ children, as: Tag = 'div', className = '', style }: ContainerProps) {
  return (
    <Tag className={`px-8 md:px-16 ${className}`} style={style}>
      {children}
    </Tag>
  );
}
