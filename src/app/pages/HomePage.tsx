import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Footer } from "../components/Footer";
import { CinematicHero } from "../components/hero/CinematicHero";
import { ScrollProgress } from "../components/cinematic/ScrollProgress";
import { FeaturedProjectsSection } from "../sections/home/FeaturedProjectsSection";
import { MaterialStripSection } from "../sections/home/MaterialStripSection";
import { gsap } from "../../lib/gsap";
import '../../styles/globals.css';

const heroImages = [
  "https://images.unsplash.com/photo-1682184805271-11671b7ecf4c?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1541848212-388760a351b9?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?auto=format&fit=crop&w=2400&q=90",
];

const featuredProjects = [
  {
    id: "casa-pietra",
    title: "Casa Pietra",
    subtitle: "Tuscany Villa Restoration",
    year: "2024",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1683290844875-0eee4089069a?auto=format&fit=crop&w=1200&q=85",
    description: "A 16th-century stone farmhouse reimagined through the lens of contemporary minimalism.",
  },
  {
    id: "arc-lumineux",
    title: "Arc Lumineux",
    subtitle: "Parisian Penthouse",
    year: "2025",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1777603371625-fe9aa715dc39?auto=format&fit=crop&w=1200&q=85",
    description: "Light as architecture. Brass and marble in dialogue with Haussmann geometry.",
  },
  {
    id: "void-collective",
    title: "Void Collective",
    subtitle: "Tokyo Gallery Space",
    year: "2025",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1758448756362-e323282ccbcc?auto=format&fit=crop&w=1200&q=85",
    description: "Negative space as the primary material. An essay in architectural restraint.",
  },
];

const editorialProducts = [
  {
    id: "meridian-chair",
    title: "Meridian Chair",
    material: "Patinated Brass & Boucle",
    price: "€4,800",
    image: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "solstice-lamp",
    title: "Solstice Floor Lamp",
    material: "Oxidized Bronze",
    price: "€2,200",
    image: "https://images.unsplash.com/photo-1552858725-2758b5fb1286?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "strata-table",
    title: "Strata Side Table",
    material: "Calacatta Marble",
    price: "€3,400",
    image: "https://images.unsplash.com/photo-1724582586495-d050726cf354?auto=format&fit=crop&w=800&q=85",
  },
];

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background images */}
      {heroImages.map((img, i) => (
        <motion.div
          key={img}
          className="absolute inset-0"
          animate={{ opacity: i === currentImage ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ zIndex: i === currentImage ? 1 : 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${img})`, y: imageY }}
          />
        </motion.div>
      ))}

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(30,28,26,0.35) 0%, rgba(30,28,26,0.1) 50%, rgba(30,28,26,0.55) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col justify-end pb-24 px-8 md:px-16"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-8" style={{ backgroundColor: "#B5924C" }} />
            <span
              className="tracking-[0.3em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "rgba(247,244,238,0.6)" }}
            >
              Architecture Studio — Florence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.5rem, 9vw, 9rem)",
              fontWeight: 300,
              color: "#F7F4EE",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
            }}
          >
            Space that<br />
            <em style={{ fontStyle: "italic", color: "rgba(247,244,238,0.7)" }}>remembers</em><br />
            you.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9, duration: 1 }}
            className="mt-12 flex items-center gap-8"
          >
            <Link to="/projects" data-cursor="view" data-cursor-label="Explore">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    color: "#F7F4EE",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  View Projects
                </span>
                <ArrowRight size={14} color="#B5924C" />
              </motion.div>
            </Link>
            <Link to="/consultation" data-cursor="hover">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    color: "rgba(247,244,238,0.5)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Begin Consultation
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Image counter */}
      <motion.div
        className="absolute right-8 md:right-16 bottom-8 z-20 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        {heroImages.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentImage(i)}
            className="h-px transition-all"
            animate={{
              width: i === currentImage ? 32 : 12,
              backgroundColor: i === currentImage ? "#B5924C" : "rgba(247,244,238,0.3)",
            }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={16} color="rgba(247,244,238,0.4)" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function ManifestoSection() {
  const ref = useRef<HTMLElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = ref.current;
    const decor = decorRef.current;
    if (!section || !decor) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(decor,
        { y: 80 },
        {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-40 px-8 md:px-16 overflow-hidden" style={{ backgroundColor: "#F7F4EE" }}>
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px w-12" style={{ backgroundColor: "#B5924C" }} />
            <span
              className="tracking-[0.3em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185" }}
            >
              Our Philosophy
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              fontWeight: 300,
              color: "#1E1C1A",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
            }}
          >
            We believe architecture is not the design of space, but the design of{" "}
            <em style={{ color: "#9B9185", fontStyle: "italic" }}>time within space</em>. Every material chosen is a sentence. Every proportion, a paragraph. Every room — a world that the body learns to inhabit.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="mt-16 flex items-center gap-8">
            <Link to="/about" data-cursor="hover">
              <div
                className="flex items-center gap-2"
                style={{ transition: 'transform 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: "#B5924C",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  About the Studio
                </span>
                <ArrowUpRight size={14} color="#B5924C" />
              </div>
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Decorative number — GSAP scrub parallax */}
      <div
        ref={decorRef}
        className="absolute right-16 top-1/2 -translate-y-1/2 select-none pointer-events-none"
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "20rem",
            fontWeight: 300,
            color: "rgba(155,145,133,0.06)",
            lineHeight: 1,
          }}
        >
          I
        </span>
      </div>
    </section>
  );
}



function EditorialProductSection() {
  return (
    <section className="py-32 px-8 md:px-16" style={{ backgroundColor: "#E4E0D8" }}>
      <ScrollReveal>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-8" style={{ backgroundColor: "#B5924C" }} />
          <span
            className="tracking-[0.3em] uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185" }}
          >
            The Collection
          </span>
        </div>
        <div className="flex items-end justify-between mb-16">
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 300,
              color: "#1E1C1A",
              letterSpacing: "-0.01em",
            }}
          >
            Objects of<br />
            <em style={{ fontStyle: "italic", color: "#9B9185" }}>enduring form</em>
          </h2>
          <Link to="/collections" data-cursor="hover" className="hidden md:block">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#9B9185", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                All Objects
              </span>
              <ArrowRight size={13} color="#9B9185" />
            </motion.div>
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {editorialProducts.map((product, i) => (
          <ScrollReveal key={product.id} delay={i * 0.12}>
            <Link to={`/collections/${product.id}`} data-cursor="view">
              <motion.div className="group" whileHover={{ y: -4 }} transition={{ duration: 0.4 }}>
                <div className="overflow-hidden mb-5">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full aspect-[3/4] object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                  />
                </div>
                <div className="px-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.2rem",
                          fontWeight: 400,
                          color: "#1E1C1A",
                        }}
                      >
                        {product.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.65rem",
                          fontWeight: 300,
                          color: "#9B9185",
                          marginTop: 3,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {product.material}
                      </p>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1rem",
                        fontWeight: 400,
                        color: "#B5924C",
                      }}
                    >
                      {product.price}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function ConsultationCTASection() {
  return (
    <section
      className="relative py-48 px-8 md:px-16 overflow-hidden"
      style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1757439402190-99b73ac8e807?auto=format&fit=crop&w=2400&q=85)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(30,28,26,0.85) 0%, rgba(30,28,26,0.5) 60%, rgba(30,28,26,0.7) 100%)",
        }}
      />
      <div className="relative z-10 max-w-3xl">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px w-8" style={{ backgroundColor: "#B5924C" }} />
            <span
              className="tracking-[0.3em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "rgba(247,244,238,0.5)" }}
            >
              Begin Your Journey
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 300,
              color: "#F7F4EE",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Every extraordinary<br />
            space begins with<br />
            <em style={{ fontStyle: "italic", color: "rgba(181,146,76,0.9)" }}>a conversation.</em>
          </h2>
          <p
            className="mt-8"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 300,
              color: "rgba(247,244,238,0.55)",
              maxWidth: 400,
              lineHeight: 1.8,
            }}
          >
            Our consultation process is designed to understand not just your space, but your life within it.
          </p>
          <div className="mt-12 flex flex-wrap gap-5">
            <Link to="/consultation" data-cursor="hover">
              <motion.div
                className="px-10 py-4 tracking-[0.2em] uppercase"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  backgroundColor: "#B5924C",
                  color: "#F7F4EE",
                }}
                whileHover={{ backgroundColor: "#9B7A3C" }}
                transition={{ duration: 0.2 }}
              >
                Begin Consultation
              </motion.div>
            </Link>
            <Link to="/ai-analyzer" data-cursor="hover">
              <motion.div
                className="px-10 py-4 tracking-[0.2em] uppercase border"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  borderColor: "rgba(247,244,238,0.3)",
                  color: "rgba(247,244,238,0.7)",
                }}
                whileHover={{ borderColor: "#F7F4EE", color: "#F7F4EE" }}
                transition={{ duration: 0.2 }}
              >
                AI Space Analysis
              </motion.div>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function MaterialTeaser() {
  const materials = [
    { name: "Calacatta Oro", type: "Marble", color: "#EDE8E0" },
    { name: "Brushed Brass", type: "Metal", color: "#C9A86C" },
    { name: "Smoked Oak", type: "Wood", color: "#6B5C4A" },
    { name: "Pietra Serena", type: "Stone", color: "#8A8078" },
    { name: "Nero Marquina", type: "Marble", color: "#1A1A1A" },
  ];

  return (
    <section className="py-32 px-8 md:px-16" style={{ backgroundColor: "#F7F4EE" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <ScrollReveal>
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8" style={{ backgroundColor: "#B5924C" }} />
              <span
                className="tracking-[0.3em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185" }}
              >
                Material Lab
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                color: "#1E1C1A",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              Touch the<br />
              materials that<br />
              <em style={{ color: "#9B9185", fontStyle: "italic" }}>shape worlds.</em>
            </h2>
            <p
              className="mt-8"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 300,
                color: "#9B9185",
                lineHeight: 1.9,
                maxWidth: 360,
              }}
            >
              Our material explorer lets you feel the weight, warmth, and character of each element before it enters your space.
            </p>
            <Link to="/materials" data-cursor="hover" className="inline-block mt-10">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.7rem",
                    color: "#B5924C",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  Explore Materials
                </span>
                <ArrowRight size={13} color="#B5924C" />
              </motion.div>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="space-y-2">
            {materials.map((material, i) => (
              <Link key={material.name} to="/materials" data-cursor="material" data-cursor-label="Touch">
                <motion.div
                  className="flex items-center gap-5 py-4 px-5 group"
                  style={{ borderBottom: "1px solid rgba(155,145,133,0.15)" }}
                  whileHover={{ x: 8, backgroundColor: "rgba(155,145,133,0.06)" }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className="w-10 h-10 flex-shrink-0 rounded-sm"
                    style={{ backgroundColor: material.color, border: "1px solid rgba(155,145,133,0.15)" }}
                  />
                  <div className="flex-1">
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.1rem",
                        fontWeight: 400,
                        color: "#1E1C1A",
                      }}
                    >
                      {material.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.6rem",
                        color: "#9B9185",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      {material.type}
                    </p>
                  </div>
                  <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} color="#B5924C" />
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div style={{ backgroundColor: "#F7F4EE" }}>
      {/* Global cinematic scroll progress — hides during hero, appears after */}
      <ScrollProgress />

      <CinematicHero />
      <ManifestoSection />

      {/* Phase 2C: GSAP horizontal gallery with clip-scrub + parallax */}
      <FeaturedProjectsSection />

      <EditorialProductSection />

      {/* Phase 2C: Direction-aware material swatch strip */}
      <MaterialStripSection />

      <ConsultationCTASection />
      <Footer />
    </div>
  );
}
