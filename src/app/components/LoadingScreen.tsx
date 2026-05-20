import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    const steps = [15, 35, 55, 72, 88, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase("reveal"), 400);
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 1800);
      }
    }, 280);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#1E1C1A" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Curtain panels */}
          <motion.div
            className="absolute inset-0 flex"
            animate={phase === "reveal" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="flex-1 origin-left"
              style={{ backgroundColor: "#1E1C1A" }}
              animate={phase === "reveal" ? { scaleX: 0 } : { scaleX: 1 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0 }}
            />
            <motion.div
              className="flex-1 origin-right"
              style={{ backgroundColor: "#1E1C1A" }}
              animate={phase === "reveal" ? { scaleX: 0 } : { scaleX: 1 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            />
          </motion.div>

          {/* Logo */}
          <motion.div
            className="relative z-10 text-center"
            animate={phase === "reveal" ? { y: -20, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-[#F7F4EE] uppercase tracking-[0.5em] mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 300,
              }}
            >
              MEARH
            </motion.div>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 0.4, width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="h-px mx-auto mb-6"
              style={{ backgroundColor: "#B5924C", maxWidth: 200 }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-[#9B9185] tracking-[0.3em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 300 }}
            >
              Architecture · Interior · Space
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2"
            style={{ width: "min(240px, 40vw)" }}
            animate={phase === "reveal" ? { opacity: 0 } : { opacity: 1 }}
          >
            <div className="h-px w-full" style={{ backgroundColor: "rgba(155,145,133,0.2)" }}>
              <motion.div
                className="h-full origin-left"
                style={{ backgroundColor: "#B5924C" }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <div
              className="mt-3 text-right"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.6rem",
                color: "#9B9185",
                letterSpacing: "0.1em",
              }}
            >
              {progress}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
