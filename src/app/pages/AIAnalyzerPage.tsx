/**
 * AIAnalyzerPage — Phase 2E Cinematic AI Experience
 *
 * Three-phase flow:
 *   upload   → UploadZone (luxury drag-drop)
 *   scanning → AIScanSequence (cinematic loading)
 *   results  → CompatibilityMeter grid + MaterialRecommendation grid
 *
 * Motion:
 *   AnimatePresence mode="wait" between phases — no hard cuts
 *   All phase transitions use opacity + y + clipPath
 *   Results reveal is staggered via delay prop
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Footer } from '../components/Footer';
import { UploadZone } from '../components/ai/UploadZone';
import { AIScanSequence } from '../components/ai/AIScanSequence';
import { CompatibilityMeter } from '../components/ai/CompatibilityMeter';
import { MaterialRecommendation } from '../components/ai/MaterialRecommendation';
import { colors, fonts, type as typeTokens } from '../../lib/tokens';

// ─── Data ─────────────────────────────────────────────────────────────────────

const ANALYSIS_RESULTS = [
  {
    category: 'Spatial Quality',
    score: 78,
    label: 'Well-proportioned',
    insights: [
      'Strong natural light from west-facing windows',
      'Ceiling height creates excellent volume',
      'Awkward transition between living and dining zones',
    ],
  },
  {
    category: 'Material Palette',
    score: 52,
    label: 'Developing',
    insights: [
      'Current palette lacks warmth cohesion',
      'Wood tones compete rather than harmonize',
      'Opportunity for a unifying stone or textile element',
    ],
  },
  {
    category: 'Circulation',
    score: 85,
    label: 'Excellent',
    insights: [
      'Clear sightlines throughout',
      'Entry sequence is well-defined',
      'Consider furniture placement near north wall',
    ],
  },
  {
    category: 'Atmospheric Depth',
    score: 44,
    label: 'Requires Attention',
    insights: [
      'Lighting scheme is functional but not layered',
      'Textural contrast is insufficient',
      'No acoustic material — consider soft elements',
    ],
  },
];

const SUGGESTIONS = [
  {
    title:  'Calacatta Oro Surface',
    reason: 'Would unify existing warm wood tones with the cooler architectural shell.',
    image:  'https://images.unsplash.com/photo-1757439402103-fc35542f96f8?auto=format&fit=crop&w=800&q=85',
    type:   'Material',
  },
  {
    title:  'Meridian Chair',
    reason: 'Patinated brass frame bridges existing metal hardware with the warm textile zone.',
    image:  'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=800&q=85',
    type:   'Object',
  },
  {
    title:  'Natural Linen Drapery',
    reason: 'Introduces acoustic softness and warm texture to counterbalance stone floor.',
    image:  'https://images.unsplash.com/photo-1587023705100-8094f8d47e86?auto=format&fit=crop&w=800&q=85',
    type:   'Textile',
  },
];

// ─── Phase types ──────────────────────────────────────────────────────────────

type Phase = 'upload' | 'scanning' | 'results';

// ─── Page ─────────────────────────────────────────────────────────────────────

export function AIAnalyzerPage() {
  const [phase,    setPhase]    = useState<Phase>('upload');
  const [image,    setImage]    = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'analysis' | 'recommendations'>('analysis');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runAnalysis = (src: string) => {
    setImage(src);
    setProgress(0);
    setPhase('scanning');

    const steps = [8, 22, 38, 55, 67, 79, 88, 95, 100];
    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setPhase('results'), 500);
      }
    }, 340);
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => runAnalysis(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDemo = () => {
    runAnalysis(
      'https://images.unsplash.com/photo-1682184805271-11671b7ecf4c?auto=format&fit=crop&w=1600&q=85'
    );
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase('upload');
    setImage(null);
    setProgress(0);
    setActiveTab('analysis');
  };

  // Shared transition
  const phaseTransition = {
    initial:  { opacity: 0, y: 20 },
    animate:  { opacity: 1, y: 0 },
    exit:     { opacity: 0, y: -12 },
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as [number,number,number,number] },
  };

  return (
    <div style={{ backgroundColor: colors.parchment, minHeight: '100vh' }}>
      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="pt-44 pb-16 px-8 md:px-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-8" style={{ backgroundColor: colors.brass }} />
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: typeTokens.label,
              color: colors.stoneTaupe,
              letterSpacing: typeTokens.tracking.wide,
              textTransform: 'uppercase',
            }}
          >
            AI Space Intelligence
          </span>
        </div>

        <h1
          style={{
            fontFamily: fonts.serif,
            fontSize: typeTokens.heroMd,
            fontWeight: 300,
            color: colors.charcoal,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          Space<br />
          <em style={{ fontStyle: 'italic', color: colors.stoneTaupe }}>Analyzer</em>
        </h1>

        <AnimatePresence mode="wait">
          {phase === 'upload' && (
            <motion.p
              key="upload-desc"
              {...phaseTransition}
              className="mt-6"
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.bodyMd,
                fontWeight: 300,
                color: colors.stoneTaupe,
                lineHeight: 2.0,
                maxWidth: 480,
              }}
            >
              Upload an image of your space and receive a detailed architectural
              and material analysis, with curated recommendations from the Mearh collection.
            </motion.p>
          )}
          {phase === 'scanning' && (
            <motion.p
              key="scan-desc"
              {...phaseTransition}
              className="mt-6"
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.bodyMd,
                fontWeight: 300,
                color: colors.stoneTaupe,
                lineHeight: 2.0,
              }}
            >
              Our AI is reading the spatial geometry, material palette, and atmospheric conditions of your space.
            </motion.p>
          )}
          {phase === 'results' && (
            <motion.div key="results-desc" {...phaseTransition} className="mt-6 flex items-center gap-4">
              <Sparkles size={14} color={colors.brass} />
              <p
                style={{
                  fontFamily: fonts.sans,
                  fontSize: typeTokens.labelMd,
                  color: colors.brass,
                  letterSpacing: typeTokens.tracking.mid,
                  textTransform: 'uppercase',
                }}
              >
                Analysis Complete
              </p>
              <button
                onClick={reset}
                className="flex items-center gap-2 ml-4"
                data-cursor="hover"
                style={{
                  fontFamily: fonts.sans,
                  fontSize: typeTokens.labelSm,
                  color: colors.stone40,
                  letterSpacing: typeTokens.tracking.mid,
                }}
              >
                <RotateCcw size={11} />
                Analyze another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Phase content ────────────────────────────────────────────── */}
      <div className="px-8 md:px-16 pb-32">
        <AnimatePresence mode="wait">
          {/* UPLOAD */}
          {phase === 'upload' && (
            <motion.div key="upload" {...phaseTransition}>
              <UploadZone onFile={handleFile} onDemo={handleDemo} />
            </motion.div>
          )}

          {/* SCANNING */}
          {phase === 'scanning' && (
            <motion.div key="scanning" {...phaseTransition}>
              <AIScanSequence image={image} progress={progress} />
            </motion.div>
          )}

          {/* RESULTS */}
          {phase === 'results' && (
            <motion.div key="results" {...phaseTransition}>
              {/* Uploaded image thumbnail + summary */}
              <div className="flex items-start gap-8 mb-14">
                {image && (
                  <div
                    className="w-48 flex-shrink-0 overflow-hidden"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <h2
                    style={{
                      fontFamily: fonts.serif,
                      fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                      fontWeight: 300,
                      color: colors.charcoal,
                      marginBottom: '0.8rem',
                    }}
                  >
                    Spatial Report
                  </h2>
                  <p
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: typeTokens.bodyMd,
                      fontWeight: 300,
                      color: colors.stoneTaupe,
                      lineHeight: 1.9,
                      maxWidth: 520,
                    }}
                  >
                    This space has strong bones — proportionate volumes and good natural light —
                    but is underserving its potential through material inconsistency and
                    insufficient atmospheric layering.
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div
                className="flex gap-0 mb-12"
                style={{ borderBottom: '1px solid rgba(155,145,133,0.15)' }}
              >
                {(['analysis', 'recommendations'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-6 py-3 transition-colors duration-200"
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: typeTokens.labelSm,
                      letterSpacing: typeTokens.tracking.mid,
                      textTransform: 'uppercase',
                      color: activeTab === tab ? colors.charcoal : colors.stoneTaupe,
                      borderBottom: activeTab === tab
                        ? `1px solid ${colors.brass}`
                        : '1px solid transparent',
                      marginBottom: -1,
                    }}
                    data-cursor="hover"
                  >
                    {tab === 'analysis' ? 'Space Analysis' : 'Curated Recommendations'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Analysis tab */}
                {activeTab === 'analysis' && (
                  <motion.div
                    key="analysis"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {ANALYSIS_RESULTS.map((r, i) => (
                        <CompatibilityMeter
                          key={r.category}
                          category={r.category}
                          score={r.score}
                          label={r.label}
                          insights={r.insights}
                          delay={i * 0.1}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Recommendations tab */}
                {activeTab === 'recommendations' && (
                  <motion.div
                    key="recs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {SUGGESTIONS.map((s, i) => (
                        <MaterialRecommendation
                          key={s.title}
                          {...s}
                          delay={i * 0.12}
                        />
                      ))}
                    </div>

                    {/* CTA */}
                    <div
                      className="mt-14 pt-8"
                      style={{ borderTop: '1px solid rgba(155,145,133,0.12)' }}
                    >
                      <Link to="/consultation" data-cursor="hover">
                        <motion.div
                          className="inline-flex items-center gap-4 px-10 py-5 tracking-[0.2em] uppercase"
                          style={{
                            fontFamily: fonts.sans,
                            fontSize: typeTokens.labelSm,
                            backgroundColor: colors.charcoal,
                            color: colors.parchment,
                          }}
                          whileHover={{ backgroundColor: colors.warmStoneDark }}
                          transition={{ duration: 0.2 }}
                        >
                          Discuss This Analysis With The Studio
                          <ArrowRight size={13} />
                        </motion.div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
