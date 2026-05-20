import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { fonts, motion as motionTokens, zIndex, blur } from "../../lib/tokens";
import { useTheme } from "../../providers/ThemeProvider";
import { ThemeToggle } from "./theme/ThemeToggle";

const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Projects",    href: "/projects" },
  { label: "Materials",   href: "/materials" },
  { label: "Studio",      href: "/about" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location                = useLocation();
  const { palette, isDark }     = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // On homepage hero before scroll: always show light text
  const isHeroLight = location.pathname === "/" && !scrolled && !isDark;

  // Nav background: theme-aware
  const navBg = scrolled ? palette.navBg : "transparent";

  // Text colors
  const logoColor  = isHeroLight ? "rgba(247,244,238,1)"   : palette.textPrimary;
  const linkColor  = isHeroLight ? "rgba(247,244,238,0.55)" : palette.textSecondary;
  const linkHover  = isHeroLight ? "rgba(247,244,238,1)"   : palette.textPrimary;
  const ctaBorder  = isHeroLight ? "rgba(247,244,238,0.4)" : palette.brass;
  const ctaColor   = isHeroLight ? "rgba(247,244,238,1)"   : palette.brass;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 px-8 md:px-16"
        style={{ zIndex: zIndex.nav }}
        animate={{
          paddingTop:      scrolled ? "20px" : "32px",
          paddingBottom:   scrolled ? "20px" : "32px",
          backgroundColor: navBg,
          backdropFilter:  scrolled ? blur.nav : "blur(0px)",
        }}
        transition={{ duration: motionTokens.duration.normal, ease: motionTokens.ease.sharp }}
      >
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" aria-label="MEARH — Return to home" data-cursor="hover">
            <motion.div
              className="tracking-[0.4em] uppercase"
              style={{
                fontFamily: fonts.serif,
                fontWeight: fonts.weights.normal,
                fontSize: "1.1rem",
              }}
              animate={{ color: logoColor }}
              transition={{ duration: motionTokens.duration.normal }}
            >
              MEARH
            </motion.div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-12" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  aria-current={isActive ? "page" : undefined}
                  data-cursor="hover"
                >
                  <motion.span
                    className="relative tracking-[0.15em] uppercase text-[10px]"
                    style={{ fontFamily: fonts.sans, fontWeight: fonts.weights.normal }}
                    animate={{ color: linkColor }}
                    whileHover={{ color: linkHover }}
                    transition={{ duration: motionTokens.duration.fast }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-px"
                        style={{ backgroundColor: palette.brass }}
                        aria-hidden="true"
                      />
                    )}
                  </motion.span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop right — CTA + theme toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme toggle */}
            <ThemeToggle />

            {/* Consult CTA */}
            <Link to="/consultation" data-cursor="hover">
              <motion.div
                className="px-6 py-2.5 tracking-[0.15em] uppercase text-[10px] border"
                style={{ fontFamily: fonts.sans, fontWeight: fonts.weights.normal }}
                animate={{
                  borderColor: ctaBorder,
                  color:       ctaColor,
                }}
                whileHover={{
                  backgroundColor: palette.brass,
                  borderColor:     palette.brass,
                  color:           "#F7F4EE",
                }}
                transition={{ duration: motionTokens.duration.fast }}
              >
                Consult
              </motion.div>
            </Link>
          </div>

          {/* Mobile: theme toggle + menu toggle */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              data-cursor="hover"
            >
              <motion.div
                animate={{ color: logoColor }}
                transition={{ duration: motionTokens.duration.normal }}
              >
                {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 flex flex-col justify-end"
            style={{ backgroundColor: palette.bg === "#0D0C0B" ? "#0D0C0B" : "#1E1C1A", zIndex: zIndex.mobileMenu }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.duration.normal }}
          >
            <nav aria-label="Mobile navigation" className="p-12 pb-20">
              <div
                className="h-px w-full mb-16"
                style={{ backgroundColor: palette.border }}
                aria-hidden="true"
              />
              {navLinks.map((link, i) => {
                const isActive = location.pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <motion.div
                      className="py-5 border-b"
                      style={{
                        borderColor:   palette.border,
                        fontFamily:    fonts.serif,
                        fontSize:      "clamp(2rem, 8vw, 3.5rem)",
                        fontWeight:    fonts.weights.light,
                        color:         "rgba(247,244,238,0.9)",
                        letterSpacing: "0.05em",
                      }}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0,   opacity: 1 }}
                      transition={{
                        delay:    i * 0.06,
                        duration: motionTokens.duration.slow,
                        ease:     motionTokens.ease.sharp,
                      }}
                    >
                      {link.label}
                    </motion.div>
                  </Link>
                );
              })}

              <motion.div
                className="mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link to="/consultation">
                  <div
                    className="inline-block px-8 py-3 border tracking-[0.2em] uppercase text-[11px]"
                    style={{
                      borderColor: palette.brass,
                      color:       palette.brass,
                      fontFamily:  fonts.sans,
                    }}
                  >
                    Begin Consultation
                  </div>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Focus ring styles */}
      <style>{`
        *:focus-visible {
          outline: 2px solid ${palette.brass};
          outline-offset: 3px;
          border-radius: 1px;
        }
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
