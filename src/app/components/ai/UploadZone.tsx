/**
 * UploadZone — Luxury Drag & Drop Upload
 *
 * Cinematic upload zone with:
 *   - editorial oversized typography
 *   - brass corner markers that animate on hover/drag
 *   - animated perimeter scan line on drag enter
 *   - ambient floating geometry in background
 *   - cursor changes to "drag" mode via data-cursor
 */

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload } from 'lucide-react';
import { colors, fonts, type as typeTokens } from '../../../lib/tokens';

interface UploadZoneProps {
  onFile: (file: File) => void;
  onDemo: () => void;
}

export function UploadZone({ onFile, onDemo }: UploadZoneProps) {
  const inputRef    = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) onFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Drop zone */}
      <motion.div
        className="relative w-full cursor-none"
        style={{ maxWidth: 820 }}
        data-cursor="drag"
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        animate={{
          borderColor: dragging ? colors.brass : 'rgba(155,145,133,0.22)',
        }}
      >
        {/* Outer frame */}
        <div
          className="relative border transition-colors duration-500"
          style={{
            borderColor: dragging ? colors.brass : 'rgba(155,145,133,0.22)',
            minHeight: 420,
            backgroundColor: dragging ? 'rgba(181,146,76,0.025)' : 'transparent',
          }}
        >
          {/* Brass corner accents */}
          {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-5 h-5 pointer-events-none`}
              style={{
                borderTop:    i < 2   ? `1px solid ${colors.brass}` : 'none',
                borderBottom: i >= 2  ? `1px solid ${colors.brass}` : 'none',
                borderLeft:   i % 2 === 0 ? `1px solid ${colors.brass}` : 'none',
                borderRight:  i % 2 !== 0 ? `1px solid ${colors.brass}` : 'none',
              }}
              animate={{ opacity: dragging ? 1 : 0.45 }}
              transition={{ duration: 0.3 }}
            />
          ))}

          {/* Scan sweep on drag */}
          <AnimatePresence>
            {dragging && (
              <motion.div
                key="scan"
                className="absolute left-0 right-0 h-px pointer-events-none"
                style={{ backgroundColor: colors.brass, opacity: 0.6 }}
                initial={{ top: 0 }}
                animate={{ top: '100%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
              />
            )}
          </AnimatePresence>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-16">
            {/* Floating geometry */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border rounded-full"
                  style={{
                    width:  80 + i * 60,
                    height: 80 + i * 60,
                    borderColor: `rgba(181,146,76,${0.04 - i * 0.01})`,
                    left: `${[20, 65, 40][i]}%`,
                    top:  `${[25, 55, 75][i]}%`,
                    transform: 'translate(-50%,-50%)',
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? [0, 360] : [360, 0],
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    rotate: { duration: 24 + i * 8, ease: 'linear', repeat: Infinity },
                    scale:  { duration: 5 + i * 2, ease: 'easeInOut', repeat: Infinity },
                  }}
                />
              ))}
            </div>

            {/* Icon */}
            <motion.div
              animate={{ y: dragging ? -4 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <Upload
                size={28}
                strokeWidth={1}
                color={dragging ? colors.brass : colors.stoneTaupe}
                style={{ transition: 'color 0.3s' }}
              />
            </motion.div>

            {/* Typography */}
            <div className="text-center relative z-10">
              <p
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  fontWeight: 300,
                  color: colors.charcoal,
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  marginBottom: '0.8rem',
                }}
              >
                {dragging
                  ? 'Release to begin analysis'
                  : <>Drop your <em style={{ fontStyle: 'italic', color: colors.stoneTaupe }}>space</em> here</>}
              </p>
              <p
                style={{
                  fontFamily: fonts.sans,
                  fontSize: typeTokens.labelMd,
                  fontWeight: 300,
                  color: colors.stoneTaupe,
                  letterSpacing: typeTokens.tracking.mid,
                }}
              >
                JPG · PNG · WEBP · up to 20MB
              </p>
            </div>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </motion.div>

      {/* Separator */}
      <div className="flex items-center gap-6 my-8 w-full" style={{ maxWidth: 820 }}>
        <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(155,145,133,0.15)' }} />
        <span
          style={{
            fontFamily: fonts.sans,
            fontSize: typeTokens.labelSm,
            color: colors.stone40,
            letterSpacing: typeTokens.tracking.mid,
          }}
        >
          or
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(155,145,133,0.15)' }} />
      </div>

      {/* Demo button */}
      <motion.button
        onClick={onDemo}
        className="w-full py-5 border text-center tracking-[0.25em] uppercase"
        style={{
          maxWidth: 820,
          fontFamily: fonts.sans,
          fontSize: typeTokens.labelSm,
          borderColor: 'rgba(155,145,133,0.2)',
          color: colors.stoneTaupe,
        }}
        whileHover={{
          borderColor: colors.brass,
          color: colors.brass,
          backgroundColor: 'rgba(181,146,76,0.03)',
        }}
        transition={{ duration: 0.25 }}
        data-cursor="hover"
      >
        Analyze a Demo Space
      </motion.button>
    </div>
  );
}
