/**
 * ThemeToggle — Luxury Architectural Night/Day Toggle
 *
 * A minimal editorial icon button for the Navigation bar.
 * In light mode: shows a thin crescent moon (night invitation)
 * In dark mode:  shows a thin sunrise circle (day invitation)
 *
 * Motion:
 *   - icon swaps via AnimatePresence scale + opacity
 *   - brass accent dot animates on hover
 *   - cursor switches to "hover" mode
 *
 * Sizing is intentionally compact to not compete with nav wordmark.
 */

import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../providers/ThemeProvider';
import { colors as staticColors } from '../../../lib/tokens';

export function ThemeToggle() {
  const { isDark, toggle, palette } = useTheme();

  return (
    <motion.button
      onClick={toggle}
      data-cursor="hover"
      aria-label={isDark ? 'Switch to daylight mode' : 'Switch to night mode'}
      className="relative flex items-center justify-center"
      style={{
        width:  36,
        height: 36,
        border: `1px solid ${isDark ? palette.borderStrong : staticColors.stone20}`,
        backgroundColor: 'transparent',
        borderRadius: 0,
        flexShrink: 0,
      }}
      whileHover={{
        borderColor: palette.brass,
        backgroundColor: palette.brassGlow,
      }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
            animate={{ opacity: 1, scale: 1,   rotate: 0 }}
            exit={{    opacity: 0, scale: 0.6, rotate: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Sun
              size={13}
              strokeWidth={1.5}
              color={palette.brass}
              aria-hidden="true"
            />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, scale: 0.6, rotate: 30 }}
            animate={{ opacity: 1, scale: 1,   rotate: 0 }}
            exit={{    opacity: 0, scale: 0.6, rotate: -30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Moon
              size={13}
              strokeWidth={1.5}
              color={isDark ? palette.textSecondary : staticColors.stoneTaupe}
              aria-hidden="true"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
