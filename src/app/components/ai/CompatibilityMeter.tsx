/**
 * CompatibilityMeter — Animated Score Visualization
 *
 * Luxury score bar replacing dashboard-style charts.
 * Features:
 *   - Brass score number (Cormorant Garamond)
 *   - Thin animated fill bar with color gradient by score
 *   - Subtle label + qualifier text
 *   - GSAP-free: uses CSS transition + Framer motion only
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';

interface CompatibilityMeterProps {
  category: string;
  score:    number;
  label:    string;
  insights: string[];
  delay?:   number;
}

function scoreColor(s: number): string {
  if (s >= 75) return colors.brass;
  if (s >= 55) return colors.warmSienna;
  return colors.stoneTaupe;
}

export function CompatibilityMeter({
  category,
  score,
  label,
  insights,
  delay = 0,
}: CompatibilityMeterProps) {
  const [expanded, setExpanded] = useState(false);
  const [visible,  setVisible]  = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="group cursor-none"
      data-cursor="hover"
      onClick={() => setExpanded((v) => !v)}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div
        className="p-7 transition-colors duration-300"
        style={{ backgroundColor: 'rgba(155,145,133,0.06)' }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.labelSm,
                color: colors.stoneTaupe,
                letterSpacing: typeTokens.tracking.wide,
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}
            >
              {category}
            </p>
            <p
              style={{
                fontFamily: fonts.serif,
                fontSize: '1.3rem',
                fontWeight: 400,
                color: colors.charcoal,
              }}
            >
              {label}
            </p>
          </div>
          {/* Oversized score number */}
          <p
            style={{
              fontFamily: fonts.serif,
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 300,
              color: scoreColor(score),
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            {score}
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="h-px w-full relative"
          style={{ backgroundColor: 'rgba(155,145,133,0.15)' }}
        >
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{ backgroundColor: scoreColor(score) }}
            initial={{ width: 0 }}
            animate={visible ? { width: `${score}%` } : {}}
            transition={{ duration: 1.2, delay: delay + 0.1, ease: 'easeOut' }}
          />
        </div>

        {/* Insights — collapsible */}
        <motion.div
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ overflow: 'hidden' }}
        >
          <ul className="mt-5 space-y-2">
            {insights.map((insight, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className="mt-2 flex-shrink-0 rounded-full"
                  style={{ width: 3, height: 3, backgroundColor: colors.brass }}
                />
                <p
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: typeTokens.bodyMd,
                    fontWeight: 300,
                    color: colors.warmSienna,
                    lineHeight: 1.8,
                  }}
                >
                  {insight}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Expand hint */}
        <p
          className="mt-4"
          style={{
            fontFamily: fonts.sans,
            fontSize: typeTokens.labelSm,
            color: colors.stone40,
            letterSpacing: typeTokens.tracking.mid,
            textTransform: 'uppercase',
          }}
        >
          {expanded ? '— collapse' : '+ insights'}
        </p>
      </div>
    </motion.div>
  );
}
