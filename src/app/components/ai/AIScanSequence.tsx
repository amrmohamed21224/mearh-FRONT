/**
 * AIScanSequence — Cinematic Analysis Loading State
 *
 * Plays while "AI" processes the uploaded image.
 * Layers:
 *   1. Uploaded image with atmospheric overlay
 *   2. Horizontal scan sweep (brass shimmer)
 *   3. Vertical grid lines that appear progressively
 *   4. Status messages cycling through analysis stages
 *   5. Progress bar (brass, scrubbed)
 *   6. Floating corner coordinate labels (architectural drafting aesthetic)
 *
 * GPU-safe: all CSS transforms, no canvas.
 */

import { motion } from 'motion/react';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';

const STAGES = [
  { threshold: 0,   label: 'Mapping spatial geometry...' },
  { threshold: 25,  label: 'Identifying material palette...' },
  { threshold: 48,  label: 'Analyzing light conditions...' },
  { threshold: 65,  label: 'Cross-referencing collection...' },
  { threshold: 82,  label: 'Generating recommendations...' },
  { threshold: 95,  label: 'Preparing your report...' },
];

function getStageLabel(progress: number): string {
  return [...STAGES].reverse().find((s) => progress >= s.threshold)?.label
    ?? STAGES[0].label;
}

interface AIScanSequenceProps {
  image:    string | null;
  progress: number;
}

export function AIScanSequence({ image, progress }: AIScanSequenceProps) {
  return (
    <div className="flex flex-col items-center w-full" style={{ maxWidth: 820, margin: '0 auto' }}>
      {/* Image + scan overlay */}
      {image && (
        <div className="relative w-full overflow-hidden mb-10">
          <img
            src={image}
            alt="Analyzing"
            className="w-full object-cover"
            style={{ aspectRatio: '16/9', display: 'block' }}
          />

          {/* Dark atmospheric overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(30,28,26,0.55)' }}
          />

          {/* Horizontal scan sweep */}
          <motion.div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              height: 1,
              background: `linear-gradient(90deg, transparent, ${colors.brass}, transparent)`,
            }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2.8, ease: 'linear', repeat: Infinity }}
          />

          {/* Shimmer wash */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to right, transparent 0%, rgba(181,146,76,0.08) 50%, transparent 100%)`,
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2.2, ease: 'linear', repeat: Infinity }}
          />

          {/* Vertical grid lines — progressive reveal */}
          <div className="absolute inset-0 pointer-events-none">
            {[25, 50, 75].map((left, i) => (
              <motion.div
                key={left}
                className="absolute top-0 bottom-0"
                style={{
                  left: `${left}%`,
                  width: 1,
                  backgroundColor: `rgba(181,146,76,0.2)`,
                }}
                initial={{ scaleY: 0, transformOrigin: 'top center' }}
                animate={{ scaleY: progress > 20 + i * 15 ? 1 : 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            ))}
          </div>

          {/* Corner coordinate labels — architectural drafting */}
          {[
            { pos: 'top-3 left-4',     label: '0,0' },
            { pos: 'top-3 right-4',    label: 'W,0' },
            { pos: 'bottom-3 left-4',  label: '0,H' },
            { pos: 'bottom-3 right-4', label: 'W,H' },
          ].map(({ pos, label }) => (
            <motion.p
              key={label}
              className={`absolute ${pos} pointer-events-none`}
              style={{
                fontFamily: fonts.sans,
                fontSize: '0.5rem',
                color: `rgba(181,146,76,0.5)`,
                letterSpacing: '0.1em',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 10 ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {label}
            </motion.p>
          ))}

          {/* Centre status overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
                className="inline-block mb-4"
              >
                {/* Architectural spinner: rotating square */}
                <div
                  style={{
                    width: 20,
                    height: 20,
                    border: `1px solid ${colors.brass}`,
                    transform: 'rotate(45deg)',
                  }}
                />
              </motion.div>
              <motion.p
                key={getStageLabel(progress)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontFamily: fonts.sans,
                  fontSize: typeTokens.labelSm,
                  color: colors.parchment55,
                  letterSpacing: typeTokens.tracking.wide,
                  textTransform: 'uppercase',
                }}
              >
                {getStageLabel(progress)}
              </motion.p>
            </div>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="w-full" style={{ maxWidth: 480 }}>
        <div
          className="relative h-px w-full mb-4"
          style={{ backgroundColor: 'rgba(155,145,133,0.15)' }}
        >
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{ backgroundColor: colors.brass }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.labelSm,
              color: colors.stoneTaupe,
              letterSpacing: typeTokens.tracking.mid,
            }}
          >
            {getStageLabel(progress)}
          </p>
          <p
            style={{
              fontFamily: fonts.serif,
              fontSize: '1.4rem',
              fontWeight: 300,
              color: colors.brass,
            }}
          >
            {progress}
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.labelSm,
                color: colors.stone40,
              }}
            >
              %
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
