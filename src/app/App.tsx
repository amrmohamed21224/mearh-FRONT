import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";

import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";
import { Navigation } from "./components/Navigation";
import { SmoothScrollProvider } from "../providers/SmoothScrollProvider";
import { ThemeProvider } from "../providers/ThemeProvider";
import { AmbientLighting } from "./components/theme/AmbientLighting";
import { AtmosphericLayer } from "./components/theme/AtmosphericLayer";
import { NightCursorEnhancement } from "./components/theme/NightCursorEnhancement";

import { HomePage } from "./pages/HomePage";
import { CollectionsPage } from "./pages/CollectionsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectStoryPage } from "./pages/ProjectStoryPage";
import { MaterialExplorerPage } from "./pages/MaterialExplorerPage";
import { ConsultationPage } from "./pages/ConsultationPage";
import { AIAnalyzerPage } from "./pages/AIAnalyzerPage";
import { AboutPage } from "./pages/AboutPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { motion as motionTokens, fonts, colors } from "../lib/tokens";

/** Page fade wrapper — reads duration and easing from the token system */
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: motionTokens.duration.slow,
        ease: motionTokens.ease.luxury,
      }}
    >
      {children}
    </motion.div>
  );
}

/** Scrolls to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      {location.pathname !== "/checkout" && <Navigation />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"               element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/collections"    element={<PageWrapper><CollectionsPage /></PageWrapper>} />
          <Route path="/collections/:id" element={<PageWrapper><ProductDetailPage /></PageWrapper>} />
          <Route path="/projects"       element={<PageWrapper><ProjectsPage /></PageWrapper>} />
          <Route path="/projects/:id"   element={<PageWrapper><ProjectStoryPage /></PageWrapper>} />
          <Route path="/materials"      element={<PageWrapper><MaterialExplorerPage /></PageWrapper>} />
          <Route path="/consultation"   element={<PageWrapper><ConsultationPage /></PageWrapper>} />
          <Route path="/ai-analyzer"    element={<PageWrapper><AIAnalyzerPage /></PageWrapper>} />
          <Route path="/about"          element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="/checkout"       element={<PageWrapper><CheckoutPage /></PageWrapper>} />
          {/* 404 — graceful fallback */}
          <Route path="*" element={
            <PageWrapper>
              <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: colors.parchment }}>
                <p style={{ fontFamily: fonts.serif, fontSize: "clamp(3rem,8vw,6rem)", fontWeight: fonts.weights.light, color: colors.charcoal, lineHeight: 1 }}>404</p>
                <p style={{ fontFamily: fonts.sans, fontSize: "0.75rem", color: colors.stoneTaupe, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "1.5rem" }}>Page not found</p>
              </div>
            </PageWrapper>
          } />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <SmoothScrollProvider>
          {/* Cinematic theme transition flash — above everything */}
          <AmbientLighting />

          {/* Fixed atmospheric layer: grain + vignette + radial bloom */}
          <AtmosphericLayer />

          <div
            className="relative"
            style={{
              fontFamily: fonts.sans,
              /* backgroundColor is now driven by var(--color-bg) via body in globals.css */
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            {/* Custom cursor — desktop only */}
            <div className="hidden md:block">
              <NightCursorEnhancement />
              <CustomCursor />
            </div>

            {/* Cinematic loading screen */}
            {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

            <AppRoutes />
          </div>
        </SmoothScrollProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

