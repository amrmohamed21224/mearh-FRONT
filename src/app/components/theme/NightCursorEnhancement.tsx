/**
 * NightCursorEnhancement — Architectural Nocturnal Cursor Upgrade
 *
 * Exclusively active in dark mode. Renders a soft, diffuse, warm brass
 * light bloom that follows the cursor using responsive springs.
 *
 * Features:
 *   - Soft glow edge (radial gradient)
 *   - Ambient blend effect (mix-blend-mode: screen / plus-lighter)
 *   - Subtle trailing diffusion (lagged spring)
 *
 * Under the hood, this simulates an architectural night spotlight or candlelight
 * illuminating details as the user sweeps across the page.
 */

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useTheme } from '../../../providers/ThemeProvider';

export function NightCursorEnhancement() {
  const { isDark } = useTheme();
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [isHovering, setIsHovering] = useState(false);

  // Soft slow spring for trailing diffusion feel
  const springX = useSpring(mouseX, { damping: 45, stiffness: 220, mass: 0.8 });
  const springY = useSpring(mouseY, { damping: 45, stiffness: 220, mass: 0.8 });

  useEffect(() => {
    if (!isDark) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="hover"]') || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="hover"]') || target.closest('a') || target.closest('button')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [isDark, mouseX, mouseY]);

  if (!isDark) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9996] rounded-full hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: isHovering ? 220 : 150,
        height: isHovering ? 220 : 150,
        // Premium warm brass radial light bloom
        background: 'radial-gradient(circle, rgba(201,164,90,0.14) 0%, rgba(201,164,90,0.04) 45%, transparent 70%)',
        mixBlendMode: 'screen',
        willChange: 'transform, width, height',
      }}
      animate={{
        scale: isHovering ? 1.25 : 1,
        opacity: isHovering ? 0.95 : 0.8,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 180 }}
    />
  );
}
