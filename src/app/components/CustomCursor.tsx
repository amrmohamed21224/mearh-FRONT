import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type CursorState = "default" | "hover" | "material" | "view" | "drag";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [cursorLabel, setCursorLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 40, stiffness: 700, mass: 0.15 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const trailX = useSpring(cursorX, { damping: 38, stiffness: 350, mass: 0.45 });
  const trailY = useSpring(cursorY, { damping: 38, stiffness: 350, mass: 0.45 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      const label = target.closest("[data-cursor-label]")?.getAttribute("data-cursor-label");
      if (cursorType) setCursorState(cursorType as CursorState);
      if (label) setCursorLabel(label);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hasCursorAttr = target.closest("[data-cursor]");
      if (hasCursorAttr) {
        setCursorState("default");
        setCursorLabel("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  const isHovered = cursorState !== "default";

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Trail dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 0.3 : 0,
          width: 4,
          height: 4,
          backgroundColor: "var(--color-brass)",
        }}
      />

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovered ? 1 : 1,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center rounded-full border animate-cursor-transition"
          style={{
            borderColor: "var(--color-brass)",
            backgroundColor: "var(--color-brass)",
          }}
          animate={{
            width: cursorState === "view" || cursorState === "material" ? 80 : isHovered ? 48 : 12,
            height: cursorState === "view" || cursorState === "material" ? 80 : isHovered ? 48 : 12,
            borderColor:
              cursorState === "material"
                ? "var(--color-brass)"
                : isHovered
                ? "var(--color-text-primary)"
                : "var(--color-brass)",
            backgroundColor:
              cursorState === "default"
                ? "var(--color-brass)"
                : cursorState === "hover"
                ? "var(--color-brass-glow)"
                : "var(--color-brass-glow)",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 400 }}
        >
          {(cursorState === "view" || cursorState === "material") && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[9px] tracking-[0.2em] uppercase font-light"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--color-text-primary)" }}
            >
              {cursorLabel || (cursorState === "material" ? "Touch" : "View")}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
