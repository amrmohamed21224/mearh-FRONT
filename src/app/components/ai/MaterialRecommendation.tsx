/**
 * MaterialRecommendation — AI Recommendation Card
 *
 * Cinematic material/object recommendation card.
 * Features:
 *   - direction-aware hover texture parallax
 *   - clip-path reveal on mount
 *   - brass type + serif title
 *   - expandable reason panel (height animation)
 *   - cursor switches to "view" on hover
 */

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';

interface MaterialRecommendationProps {
  title:  string;
  reason: string;
  image:  string;
  type:   string;
  delay?: number;
  href?:  string;
}

export function MaterialRecommendation({
  title,
  reason,
  image,
  type,
  delay = 0,
  href  = '/collections',
}: MaterialRecommendationProps) {
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef          = useRef<HTMLImageElement>(null);
  const [hovered, setHovered]   = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = imgContainerRef.current;
    const img = imgRef.current;
    if (!el || !img) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * -14;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -14;
    img.style.transform = `translate3d(${x}px,${y}px,0) scale(1.1)`;
  };

  const handleMouseLeave = () => {
    const img = imgRef.current;
    if (img) img.style.transform = 'translate3d(0,0,0) scale(1.04)';
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, clipPath: 'inset(20% 0% 20% 0%)' }}
      animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
      transition={{ duration: 0.9, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Link to={href} data-cursor="view">
        <div
          className="group"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Image */}
          <div
            ref={imgContainerRef}
            className="overflow-hidden relative mb-5"
            style={{ aspectRatio: '4/3' }}
          >
            <img
              ref={imgRef}
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              style={{
                transform: 'translate3d(0,0,0) scale(1.04)',
                transition: 'transform 0.15s ease-out',
              }}
              loading="lazy"
            />

            {/* Brass bottom hover line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px origin-left transition-transform duration-500"
              style={{
                backgroundColor: colors.brass,
                transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
              }}
            />
          </div>

          {/* Text */}
          <p
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.labelSm,
              color: colors.brass,
              letterSpacing: typeTokens.tracking.mid,
              textTransform: 'uppercase',
              marginBottom: '0.35rem',
            }}
          >
            {type}
          </p>
          <p
            style={{
              fontFamily: fonts.serif,
              fontSize: '1.35rem',
              fontWeight: 400,
              color: colors.charcoal,
              marginBottom: '0.6rem',
            }}
          >
            {title}
          </p>

          {/* Reason — fade in on hover */}
          <motion.p
            animate={{ opacity: hovered ? 1 : 0.6, y: hovered ? 0 : 4 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.bodyMd,
              fontWeight: 300,
              color: colors.stoneTaupe,
              lineHeight: 1.8,
            }}
          >
            {reason}
          </motion.p>

          {/* Arrow CTA */}
          <motion.div
            className="flex items-center gap-2 mt-4"
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.3 }}
          >
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.labelSm,
                color: colors.brass,
                letterSpacing: typeTokens.tracking.mid,
                textTransform: 'uppercase',
              }}
            >
              View Object
            </span>
            <ArrowUpRight size={13} color={colors.brass} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
