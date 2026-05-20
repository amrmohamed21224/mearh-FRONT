/**
 * AmbientLighting — Cinematic Theme Transition Flash Overlay
 *
 * Renders a full-viewport overlay that briefly flashes during theme switching.
 * This creates the "slow atmospheric interpolation" feel rather than
 * an abrupt color inversion.
 *
 * Behavior:
 *   - isTransitioning → overlay fades IN (opacity 0 → 0.12)
 *   - !isTransitioning → overlay fades OUT (0.12 → 0)
 * Duration is timed to match the CSS transition on body (1200ms)
 *
 * GPU-safe: opacity only, no layout, no blur.
 * pointer-events-none — never blocks interaction.
 */

import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../../providers/ThemeProvider';

export function AmbientLighting() {
  const { isTransitioning, isDark } = useTheme();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="ambient-flash"
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex:          9997,
            backgroundColor: isDark ? '#0D0C0B' : '#F7F4EE',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{    opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      )}
    </AnimatePresence>
  );
}
