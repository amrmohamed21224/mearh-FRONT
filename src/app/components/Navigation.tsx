import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { colors, fonts, motion as motionTokens, zIndex, blur } from "../../lib/tokens";

const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Projects",    href: "/projects" },
  { label: "Materials",   href: "/materials" },
  { label: "Studio",      href: "/about" },
];

export function Navigation() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location                   = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isLight = location.pathname === "/" && !scrolled;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 px-8 md:px-16"
        style={{ zIndex: zIndex.nav }}
        animate={{
          paddingTop:      scrolled ? "20px" : "32px",
          paddingBottom:   scrolled ? "20px" : "32px",
          backgroundColor: scrolled ? colors.parchmentFilter : colors.transparent,
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
                color: isLight ? colors.parchment : colors.charcoal,
              }}
              animate={{ color: isLight ? colors.parchment : colors.charcoal }}
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
                    style={{
                      fontFamily: fonts.sans,
                      fontWeight: fonts.weights.normal,
                      color: isLight ? colors.parchment55 : colors.stoneTaupe,
                    }}
                    animate={{ color: isLight ? colors.parchment55 : colors.stoneTaupe }}
                    whileHover={{ color: isLight ? colors.parchment : colors.charcoal }}
                    transition={{ duration: motionTokens.duration.fast }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-px"
                        style={{ backgroundColor: colors.brass }}
                        aria-hidden="true"
                      />
                    )}
                  </motion.span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/consultation" data-cursor="hover">
              <motion.div
                className="px-6 py-2.5 tracking-[0.15em] uppercase text-[10px] border"
                style={{
                  fontFamily:  fonts.sans,
                  fontWeight:  fonts.weights.normal,
                  borderColor: isLight ? colors.parchment40 : colors.brass,
                  color:       isLight ? colors.parchment : colors.brass,
                }}
                animate={{
                  borderColor: isLight ? colors.parchment40 : colors.brass,
                  color:       isLight ? colors.parchment : colors.brass,
                }}
                whileHover={{
                  backgroundColor: colors.brass,
                  borderColor:     colors.brass,
                  color:           colors.parchment,
                }}
                transition={{ duration: motionTokens.duration.fast }}
              >
                Consult
              </motion.div>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            data-cursor="hover"
          >
            <motion.div
              animate={{ color: isLight ? colors.parchment : colors.charcoal }}
              transition={{ duration: motionTokens.duration.normal }}
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </motion.div>
          </button>
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
            style={{ backgroundColor: colors.charcoal, zIndex: zIndex.mobileMenu }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.duration.normal }}
          >
            <nav aria-label="Mobile navigation" className="p-12 pb-20">
              <div className="h-px w-full mb-16" style={{ backgroundColor: colors.stone20 }} aria-hidden="true" />
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
                        borderColor: colors.stone10,
                        fontFamily:  fonts.serif,
                        fontSize:    "clamp(2rem, 8vw, 3.5rem)",
                        fontWeight:  fonts.weights.light,
                        color:       colors.parchment,
                        letterSpacing: "0.05em",
                      }}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0,   opacity: 1 }}
                      transition={{ delay: i * motionTokens.spring.cursorTrail.damping / 1000, duration: motionTokens.duration.slow, ease: motionTokens.ease.sharp }}
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
                      borderColor: colors.brass,
                      color:       colors.brass,
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

      {/* Focus ring styles alongside custom cursor */}
      <style>{`
        /* Restore focus visibility for keyboard users without breaking cursor aesthetics */
        *:focus-visible {
          outline: 2px solid ${colors.brass};
          outline-offset: 3px;
          border-radius: 1px;
        }
        /* Only hide cursor on devices that can hover (has pointer) */
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
