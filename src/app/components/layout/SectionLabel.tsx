import type { ReactNode } from 'react';
import { colors, fonts, type } from '../../../lib/tokens';

interface SectionLabelProps {
  children: ReactNode;
  /** Color of the brass divider line — defaults to brand brass */
  lineColor?: string;
  /** Label text color — defaults to stoneTaupe */
  textColor?: string;
}

/**
 * SectionLabel
 * The ubiquitous "brass line + uppercase label" pattern used in every section.
 * Replaces ~30 identical inline implementations across the codebase.
 *
 * Usage:
 *   <SectionLabel>Selected Work</SectionLabel>
 *   <SectionLabel textColor={colors.parchment50}>Our Philosophy</SectionLabel>
 */
export function SectionLabel({
  children,
  lineColor = colors.brass,
  textColor = colors.stoneTaupe,
}: SectionLabelProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px w-8 flex-shrink-0" style={{ backgroundColor: lineColor }} />
      <span
        className="tracking-[0.3em] uppercase"
        style={{
          fontFamily: fonts.sans,
          fontSize: type.label,
          color: textColor,
        }}
      >
        {children}
      </span>
    </div>
  );
}
