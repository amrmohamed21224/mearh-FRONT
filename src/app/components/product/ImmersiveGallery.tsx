/**
 * ImmersiveGallery — Immersive Interactive Product Gallery
 * 
 * Provides:
 *   - Over-sized cinematic image viewport with cursor coordinate drift
 *   - Fullscreen modal theater mode with deep zoom & pan interactions
 *   - Micro-hover parallax tracking for material texture clarity
 *   - Sequential, responsive carousel layout with elegant slide fades
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Minimize2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { colors, fonts, type as typeTokens, motion as motionTokens } from '../../../lib/tokens';
import { gsap } from '../../../lib/gsap';

interface ImmersiveGalleryProps {
  images: string[];
  productName: string;
}

export function ImmersiveGallery({ images, productName }: ImmersiveGalleryProps) {
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  
  const viewportRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const nextImage = () => setIndex((p) => (p + 1) % images.length);
  const prevImage = () => setIndex((p) => (p - 1 + images.length) % images.length);

  // Mouse move parallax for micro-texture detail
  useEffect(() => {
    const el = viewportRef.current;
    if (!el || isFullscreen) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(imgRef.current, {
        x: xPct * 30,
        y: yPct * 30,
        scale: 1.05,
        rotationZ: xPct * 1.5,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(imgRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [index, isFullscreen]);

  // Handle theater zoom panning
  const handleMouseDown = () => {
    if (zoomScale > 1) {
      setIsPanning(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || zoomScale === 1) return;
    setPanOffset((prev) => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }));
  };

  const handleMouseUp = () => setIsPanning(false);

  const toggleZoom = () => {
    if (zoomScale > 1) {
      setZoomScale(1);
      setPanOffset({ x: 0, y: 0 });
    } else {
      setZoomScale(2.2);
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-4">
      {/* 1. VIEWPORT */}
      <div
        ref={viewportRef}
        className="relative overflow-hidden w-full aspect-[4/3] md:aspect-[16/11] bg-stone-15 border border-stone-10"
        data-cursor="view"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="w-full h-full flex items-center justify-center origin-center"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: motionTokens.ease.luxury }}
          >
            <img
              ref={imgRef}
              src={images[index]}
              alt={`${productName} view ${index + 1}`}
              className="w-full h-full object-cover select-none will-change-transform"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Shadow Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* Navigation Overlays */}
        <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20">
          <button
            onClick={prevImage}
            className="w-10 h-10 flex items-center justify-center border rounded-full backdrop-blur-md transition-all duration-300 hover:bg-parchment hover:border-parchment"
            style={{
              backgroundColor: 'rgba(30, 28, 26, 0.4)',
              borderColor: 'rgba(247, 244, 238, 0.12)',
            }}
            data-cursor="hover"
          >
            <ChevronLeft size={16} color={colors.parchment} className="hover:text-charcoal" />
          </button>
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: '0.65rem',
              color: colors.parchment,
              letterSpacing: '0.1em',
            }}
          >
            {index + 1} / {images.length}
          </span>
          <button
            onClick={nextImage}
            className="w-10 h-10 flex items-center justify-center border rounded-full backdrop-blur-md transition-all duration-300 hover:bg-parchment hover:border-parchment"
            style={{
              backgroundColor: 'rgba(30, 28, 26, 0.4)',
              borderColor: 'rgba(247, 244, 238, 0.12)',
            }}
            data-cursor="hover"
          >
            <ChevronRight size={16} color={colors.parchment} className="hover:text-charcoal" />
          </button>
        </div>

        {/* Fullscreen Expand CTA */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border rounded-full backdrop-blur-md transition-all duration-300 hover:bg-parchment hover:border-parchment"
          style={{
            backgroundColor: 'rgba(30, 28, 26, 0.4)',
            borderColor: 'rgba(247, 244, 238, 0.12)',
          }}
          data-cursor="hover"
        >
          <Maximize2 size={14} color={colors.parchment} className="hover:text-charcoal" />
        </button>
      </div>

      {/* 2. THUMBNAILS LIST */}
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="relative overflow-hidden w-20 aspect-square border transition-all duration-500 bg-stone-08"
            style={{
              borderColor: i === index ? colors.brass : 'transparent',
              opacity: i === index ? 1 : 0.65,
            }}
            data-cursor="hover"
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* 3. FULLSCREEN THEATER MODAL */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 w-screen h-screen z-[999] flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: colors.charcoal }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: motionTokens.ease.sharp }}
          >
            {/* Header / Controls */}
            <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50">
              <span
                style={{
                  fontFamily: fonts.serif,
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  color: colors.parchment,
                }}
              >
                {productName} — Immersive Detail View
              </span>
              <button
                onClick={() => {
                  setIsFullscreen(false);
                  setZoomScale(1);
                  setPanOffset({ x: 0, y: 0 });
                }}
                className="w-12 h-12 flex items-center justify-center border border-stone-50 rounded-full transition-all duration-300 hover:bg-parchment hover:border-parchment"
                data-cursor="hover"
              >
                <Minimize2 size={16} color={colors.parchment} className="hover:text-charcoal" />
              </button>
            </div>

            {/* Theatre viewport */}
            <div
              className={`relative w-4/5 h-[70vh] flex items-center justify-center overflow-hidden cursor-move ${
                isPanning ? 'active:cursor-grabbing' : 'active:cursor-grab'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onClick={toggleZoom}
            >
              <motion.img
                src={images[index]}
                alt=""
                className="max-w-full max-h-full object-contain pointer-events-none select-none transition-transform duration-300 ease-out"
                style={{
                  transform: `scale(${zoomScale}) translate(${panOffset.x / zoomScale}px, ${
                    panOffset.y / zoomScale
                  }px)`,
                }}
              />
            </div>

            {/* Footer / Info / Indicators */}
            <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col items-center justify-center gap-4 z-40">
              {/* Zoom interaction hints */}
              <p
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.65rem',
                  color: colors.parchment40,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {zoomScale > 1 ? 'Drag to inspect texture detail · Click to zoom out' : 'Click anyway on object to zoom in'}
              </p>

              {/* Slider Controls */}
              <div className="flex items-center gap-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="w-12 h-12 flex items-center justify-center border border-stone-50 rounded-full hover:bg-parchment"
                  data-cursor="hover"
                >
                  <ChevronLeft size={16} color={colors.parchment} className="hover:text-charcoal" />
                </button>
                <span
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: '0.8rem',
                    color: colors.parchment,
                  }}
                >
                  {index + 1} / {images.length}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="w-12 h-12 flex items-center justify-center border border-stone-50 rounded-full hover:bg-parchment"
                  data-cursor="hover"
                >
                  <ChevronRight size={16} color={colors.parchment} className="hover:text-charcoal" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
