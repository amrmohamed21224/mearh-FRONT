/**
 * ConsultationPage — Phase 2E: Architectural Brief Builder
 *
 * Full cinematic one-question-per-screen UX.
 * Typography-first interaction.
 * Ambient background layers.
 * Smooth fullscreen step transitions via AnimatePresence.
 *
 * Architecture:
 *   - Each step is a fullscreen panel (min-h-screen)
 *   - Progress is a thin brass line at top (fixed)
 *   - Options animate in with staggered fade-up
 *   - Selecting an option auto-advances after 350ms
 *   - Contact + summary step after all selections made
 *   - Submitted state: cinematic confirmation screen
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { colors, fonts, type as typeTokens } from '../../lib/tokens';

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    id: 'intent',
    label: 'Your Vision',
    question: 'What are you creating?',
    hint: 'Define the nature of your project',
    options: [
      { id: 'new-build',    label: 'New Build',       desc: 'Ground-up architecture and interior design' },
      { id: 'renovation',   label: 'Renovation',      desc: 'Transforming an existing space' },
      { id: 'interior',     label: 'Interior Only',   desc: 'Furnishing and styling a completed shell' },
      { id: 'single-room',  label: 'Single Room',     desc: 'A focused intervention on one space' },
    ],
  },
  {
    id: 'space',
    label: 'Space Type',
    question: 'What type of space?',
    hint: 'Help us understand the context',
    options: [
      { id: 'residential-private', label: 'Private Residence',      desc: 'Home, villa, apartment' },
      { id: 'hospitality',         label: 'Hospitality',            desc: 'Hotel, retreat, spa' },
      { id: 'commercial',          label: 'Cultural or Commercial',  desc: 'Gallery, office, retail' },
      { id: 'secondary',           label: 'Secondary Residence',     desc: 'Weekend home, pied-à-terre' },
    ],
  },
  {
    id: 'scale',
    label: 'Project Scale',
    question: 'What is the scale?',
    hint: 'Approximate floor area guides our team allocation',
    options: [
      { id: 'under-200', label: 'Under 200 m²',   desc: 'Apartment or compact home' },
      { id: '200-600',   label: '200–600 m²',     desc: 'Large home or small hospitality' },
      { id: '600-2000',  label: '600–2,000 m²',   desc: 'Villa or boutique hotel' },
      { id: 'over-2000', label: 'Over 2,000 m²',  desc: 'Estate or commercial property' },
    ],
  },
  {
    id: 'aesthetic',
    label: 'Aesthetic Direction',
    question: 'What aesthetic resonates?',
    hint: 'This shapes our material and spatial language',
    options: [
      { id: 'minimal',    label: 'Architectural Minimalism',  desc: 'Clarity, restraint, precision' },
      { id: 'warm',       label: 'Warm Organicism',           desc: 'Natural materials, texture, warmth' },
      { id: 'classical',  label: 'Contemporary Classical',    desc: 'Historical references, new craft' },
      { id: 'bold',       label: 'Expressive Modernism',      desc: 'Bold forms, curated contrast' },
    ],
  },
  {
    id: 'timeline',
    label: 'Timeline',
    question: 'When would you like to begin?',
    hint: 'We take on a limited number of projects annually',
    options: [
      { id: 'immediately', label: 'Immediately',        desc: 'Ready to start discussions now' },
      { id: '3months',     label: 'Within 3 months',    desc: 'Still in early planning phase' },
      { id: '6months',     label: '3–6 months',         desc: 'Exploring possibilities' },
      { id: 'later',       label: '6+ months',          desc: 'Long-term planning' },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StepScreenProps {
  step: typeof STEPS[0];
  stepIndex: number;
  totalSteps: number;
  selection?: string;
  onSelect: (id: string) => void;
  onBack: () => void;
}

function StepScreen({ step, stepIndex, totalSteps, selection, onSelect, onBack }: StepScreenProps) {
  return (
    <motion.div
      key={step.id}
      className="min-h-screen flex flex-col justify-center px-8 md:px-20 lg:px-32 py-28"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {/* Step counter */}
      <p
        className="mb-4"
        style={{
          fontFamily: fonts.sans,
          fontSize: typeTokens.labelSm,
          color: colors.stone40,
          letterSpacing: typeTokens.tracking.wide,
          textTransform: 'uppercase',
        }}
      >
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} — {step.label}
      </p>

      {/* Question */}
      <h2
        className="mb-3"
        style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
          fontWeight: 300,
          color: colors.charcoal,
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
        }}
      >
        {step.question}
      </h2>

      {/* Hint */}
      <p
        className="mb-12"
        style={{
          fontFamily: fonts.sans,
          fontSize: typeTokens.bodyMd,
          fontWeight: 300,
          color: colors.stoneTaupe,
        }}
      >
        {step.hint}
      </p>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
        {step.options.map((option, i) => {
          const isSelected = selection === option.id;
          return (
            <motion.button
              key={option.id}
              className="text-left p-7 border relative group"
              style={{
                borderColor: isSelected ? colors.brass : 'rgba(155,145,133,0.18)',
                backgroundColor: isSelected ? 'rgba(181,146,76,0.04)' : 'transparent',
              }}
              whileHover={{ borderColor: colors.brass, x: 4 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelect(option.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              data-cursor="hover"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              custom={i}
            >
              {isSelected && (
                <div className="absolute top-5 right-5">
                  <Check size={11} color={colors.brass} />
                </div>
              )}
              <p
                style={{
                  fontFamily: fonts.serif,
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  color: colors.charcoal,
                  marginBottom: '0.35rem',
                }}
              >
                {option.label}
              </p>
              <p
                style={{
                  fontFamily: fonts.sans,
                  fontSize: typeTokens.bodyMd,
                  fontWeight: 300,
                  color: colors.stoneTaupe,
                }}
              >
                {option.desc}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Back */}
      {stepIndex > 0 && (
        <button
          className="flex items-center gap-2 mt-10"
          onClick={onBack}
          data-cursor="hover"
          style={{
            fontFamily: fonts.sans,
            fontSize: typeTokens.labelSm,
            color: colors.stone40,
            letterSpacing: typeTokens.tracking.mid,
          }}
        >
          <ArrowLeft size={11} />
          Previous
        </button>
      )}
    </motion.div>
  );
}

// ─── Contact screen ───────────────────────────────────────────────────────────

interface ContactScreenProps {
  onSubmit: (name: string, email: string) => void;
  onBack: () => void;
}

function ContactScreen({ onSubmit, onBack }: ContactScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <motion.div
      key="contact"
      className="min-h-screen flex flex-col justify-center px-8 md:px-20 lg:px-32 py-28"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <p
        className="mb-4"
        style={{
          fontFamily: fonts.sans,
          fontSize: typeTokens.labelSm,
          color: colors.brass,
          letterSpacing: typeTokens.tracking.wide,
          textTransform: 'uppercase',
        }}
      >
        Final Step
      </p>

      <h2
        className="mb-2"
        style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
          fontWeight: 300,
          color: colors.charcoal,
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
        }}
      >
        How should we reach you?
      </h2>
      <p
        className="mb-14"
        style={{
          fontFamily: fonts.sans,
          fontSize: typeTokens.bodyMd,
          fontWeight: 300,
          color: colors.stoneTaupe,
        }}
      >
        We'll respond within 24 hours with a tailored proposal.
      </p>

      <div className="max-w-xl space-y-8">
        {[
          { label: 'Full Name', type: 'text', value: name, set: setName, placeholder: 'Your full name' },
          { label: 'Email Address', type: 'email', value: email, set: setEmail, placeholder: 'your@email.com' },
        ].map((field) => (
          <div key={field.label}>
            <label
              style={{
                fontFamily: fonts.sans,
                fontSize: typeTokens.labelSm,
                color: colors.stone40,
                letterSpacing: typeTokens.tracking.wide,
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.6rem',
              }}
            >
              {field.label}
            </label>
            <input
              type={field.type}
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              className="w-full bg-transparent outline-none py-3 border-b"
              style={{
                fontFamily: fonts.serif,
                fontSize: '1.35rem',
                fontWeight: 300,
                color: colors.charcoal,
                borderBottom: `1px solid rgba(155,145,133,0.28)`,
              }}
              placeholder={field.placeholder}
            />
          </div>
        ))}

        <motion.button
          onClick={() => onSubmit(name, email)}
          className="mt-6 w-full py-5 tracking-[0.25em] uppercase"
          style={{
            fontFamily: fonts.sans,
            fontSize: typeTokens.labelSm,
            backgroundColor: colors.charcoal,
            color: colors.parchment,
          }}
          whileHover={{ backgroundColor: colors.warmStoneDark }}
          transition={{ duration: 0.2 }}
          data-cursor="hover"
        >
          Submit Consultation Request
        </motion.button>

        <button
          className="flex items-center gap-2 mt-4"
          onClick={onBack}
          data-cursor="hover"
          style={{
            fontFamily: fonts.sans,
            fontSize: typeTokens.labelSm,
            color: colors.stone40,
          }}
        >
          <ArrowLeft size={11} />
          Previous
        </button>
      </div>
    </motion.div>
  );
}

// ─── Submitted screen ─────────────────────────────────────────────────────────

function SubmittedScreen() {
  return (
    <motion.div
      key="submitted"
      className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated brass rule */}
      <motion.div
        className="mx-auto mb-14"
        style={{ height: 1, backgroundColor: colors.brass }}
        initial={{ width: 0 }}
        animate={{ width: '4rem' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />

      <h1
        style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 300,
          color: colors.charcoal,
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          marginBottom: '1.5rem',
        }}
      >
        Your journey<br />
        <em style={{ fontStyle: 'italic', color: colors.stoneTaupe }}>begins.</em>
      </h1>

      <p
        style={{
          fontFamily: fonts.sans,
          fontSize: typeTokens.bodyMd,
          fontWeight: 300,
          color: colors.stoneTaupe,
          maxWidth: 400,
          lineHeight: 2.0,
        }}
      >
        We've received your brief. A member of the MEARH studio will be in touch
        within 24 hours with a thoughtfully prepared response.
      </p>

      <motion.div
        className="mx-auto mt-14"
        style={{ height: 1, backgroundColor: colors.brass }}
        initial={{ width: 0 }}
        animate={{ width: '2rem' }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ConsultationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const progress = (currentStep / (STEPS.length + 1)) * 100;

  const select = (optionId: string) => {
    setSelections((prev) => ({ ...prev, [STEPS[currentStep].id]: optionId }));
    setTimeout(() => setCurrentStep((p) => p + 1), 320);
  };

  const handleSubmit = (name: string, email: string) => {
    if (name && email) setSubmitted(true);
  };

  const isContactStep = currentStep === STEPS.length;

  return (
    <div style={{ backgroundColor: colors.parchment, minHeight: '100vh', position: 'relative' }}>

      {/* Global ambient background geometry */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border rounded-full"
            style={{
              width:  400 + i * 240,
              height: 400 + i * 240,
              borderColor: `rgba(181,146,76,${0.025 - i * 0.008})`,
              left: `${[15, 70][i]}%`,
              top:  `${[20, 60][i]}%`,
              transform: 'translate(-50%,-50%)',
            }}
            animate={{ rotate: i % 2 === 0 ? [0, 360] : [360, 0] }}
            transition={{ duration: 60 + i * 20, ease: 'linear', repeat: Infinity }}
          />
        ))}
      </div>

      {/* Fixed brass progress bar */}
      {!submitted && (
        <div
          className="fixed top-0 left-0 right-0 z-50"
          style={{ height: 1.5, backgroundColor: 'rgba(155,145,133,0.1)' }}
        >
          <motion.div
            className="h-full"
            style={{ backgroundColor: colors.brass }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      )}

      {/* Step dots — top right */}
      {!submitted && (
        <div className="fixed top-8 right-8 md:right-12 z-50 hidden md:flex items-center gap-2">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => i <= currentStep && setCurrentStep(i)}
              data-cursor="hover"
            >
              <div
                style={{
                  width:           currentStep === i ? 6 : 4,
                  height:          currentStep === i ? 6 : 4,
                  borderRadius:    '50%',
                  backgroundColor: i < currentStep
                    ? colors.brass
                    : currentStep === i
                    ? colors.charcoal
                    : 'rgba(155,145,133,0.3)',
                  transition: 'all 0.35s ease',
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {submitted ? (
            <SubmittedScreen key="submitted" />
          ) : isContactStep ? (
            <ContactScreen
              key="contact"
              onSubmit={handleSubmit}
              onBack={() => setCurrentStep((p) => p - 1)}
            />
          ) : (
            <StepScreen
              key={STEPS[currentStep].id}
              step={STEPS[currentStep]}
              stepIndex={currentStep}
              totalSteps={STEPS.length}
              selection={selections[STEPS[currentStep].id]}
              onSelect={select}
              onBack={() => setCurrentStep((p) => p - 1)}
            />
          )}
        </AnimatePresence>
      </div>

      {submitted && <Footer />}
    </div>
  );
}
