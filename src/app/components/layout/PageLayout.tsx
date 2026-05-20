import type { ReactNode, CSSProperties } from 'react';
import { colors } from '../../../lib/tokens';

interface PageLayoutProps {
  children: ReactNode;
  /** Background color — defaults to parchment (light pages) */
  background?: string;
  style?: CSSProperties;
}

/**
 * PageLayout
 * Root wrapper for every page. Provides min-height and background.
 * Replaces the repeated <div style={{ backgroundColor: '...', minHeight: '100vh' }}> pattern.
 */
export function PageLayout({ children, background = colors.parchment, style }: PageLayoutProps) {
  return (
    <div style={{ backgroundColor: background, minHeight: '100vh', ...style }}>
      {children}
    </div>
  );
}
