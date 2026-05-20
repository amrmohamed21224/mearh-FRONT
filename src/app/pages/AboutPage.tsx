import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Footer } from "../components/Footer";

const team = [
  {
    name: "Marco Vesper",
    role: "Principal Architect",
    bio: "Trained at the Politecnico di Milano and the Architectural Association, London. Twenty years of practice across residential, cultural, and hospitality typologies.",
    image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Elena Montis",
    role: "Director of Interiors",
    bio: "A material philosopher as much as a designer. Elena's work is defined by her obsessive understanding of how surfaces and textiles inhabit light across hours.",
    image: "https://images.unsplash.com/photo-1662919247374-531b4fa13e63?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Jun Sato",
    role: "Head of Technology",
    bio: "Brings computational thinking to spatial design. Jun developed MEARH's proprietary AI analysis system, trained on decades of architectural photography and material data.",
    image: "https://images.unsplash.com/photo-1587023705100-8094f8d47e86?auto=format&fit=crop&w=600&q=80",
  },
];

const values = [
  { number: "01", title: "Permanence over trend", body: "We design for the decade, not the season. Every decision is asked to justify itself against time." },
  { number: "02", title: "Material as emotion", body: "Stone doesn't just look a certain way — it feels a certain way underfoot, in hand, at 3 in the afternoon. We design for that feeling." },
  { number: "03", title: "Restraint as luxury", body: "True luxury is not more. It is precisely enough. Our spaces practice the art of the well-chosen element." },
  { number: "04", title: "Client as co-author", body: "We do not impose visions. We develop them in dialogue, through a process that respects the client's interior life as much as their built one." },
];

export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div style={{ backgroundColor: "#1E1C1A" }}>
      {/* Cinematic hero */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1758448756362-e323282ccbcc?auto=format&fit=crop&w=2400&q=90)",
            y: heroY,
            scale: 1.1,
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(30,28,26,0.5) 0%, rgba(30,28,26,0.15) 40%, rgba(30,28,26,0.85) 100%)" }} />
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-24 z-10"
          style={{ opacity: heroOpacity }}
        >
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#B5924C", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>
              Since 2008 — Florence, Italy
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 9vw, 8rem)",
                fontWeight: 300,
                color: "#F7F4EE",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
              }}
            >
              The<br />
              Studio
            </h1>
          </motion.div>
        </motion.div>
      </div>

      {/* Manifesto */}
      <div className="px-8 md:px-16 py-32">
        <div className="max-w-4xl">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px w-8" style={{ backgroundColor: "#B5924C" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "rgba(155,145,133,0.6)", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Who We Are
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 300,
                color: "#F7F4EE",
                lineHeight: 1.4,
                letterSpacing: "-0.01em",
              }}
            >
              MEARH is an architecture and interior design studio founded in Florence in 2008. We work across scales — from a single object to an entire estate — guided by a shared conviction that the built environment is one of the most intimate expressions of human life.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p
              className="mt-10"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 300,
                color: "rgba(155,145,133,0.7)",
                lineHeight: 2,
                maxWidth: 680,
              }}
            >
              Over fifteen years, we have completed over 60 projects across Europe, Asia, and the Americas. Our work has appeared in Architectural Digest, Wallpaper*, Domus, and the Financial Times. But we measure our success not in coverage, but in clients who return — who invite us back to add a room, or to design a home for their children.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Stats */}
      <div className="px-8 md:px-16 py-16" style={{ borderTop: "1px solid rgba(155,145,133,0.1)", borderBottom: "1px solid rgba(155,145,133,0.1)" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { value: "60+", label: "Completed Projects" },
            { value: "18", label: "Countries" },
            { value: "15", label: "Years of Practice" },
            { value: "3", label: "Studio Locations" },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 300, color: "#F7F4EE", lineHeight: 1 }}>
                {stat.value}
              </p>
              <p className="mt-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "rgba(155,145,133,0.5)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="px-8 md:px-16 py-32">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px w-8" style={{ backgroundColor: "#B5924C" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "rgba(155,145,133,0.6)", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Our Principles
            </span>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {values.map((value, i) => (
            <ScrollReveal key={value.number} delay={i * 0.1}>
              <div
                className="py-10 pr-10"
                style={{ borderBottom: "1px solid rgba(155,145,133,0.1)", borderRight: i % 2 === 0 ? "1px solid rgba(155,145,133,0.1)" : "none" }}
              >
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "#B5924C", letterSpacing: "0.1em" }}>
                  {value.number}
                </span>
                <h3
                  className="mt-4"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.8rem",
                    fontWeight: 300,
                    color: "#F7F4EE",
                    marginBottom: 12,
                  }}
                >
                  {value.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 300, color: "rgba(155,145,133,0.6)", lineHeight: 1.9 }}>
                  {value.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="px-8 md:px-16 py-24" style={{ borderTop: "1px solid rgba(155,145,133,0.1)" }}>
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px w-8" style={{ backgroundColor: "#B5924C" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "rgba(155,145,133,0.6)", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              The Team
            </span>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((person, i) => (
            <ScrollReveal key={person.name} delay={i * 0.1}>
              <div>
                <div className="overflow-hidden mb-6" style={{ backgroundColor: "#2E2C2A" }}>
                  <motion.img
                    src={person.image}
                    alt={person.name}
                    className="w-full aspect-[3/4] object-cover opacity-80"
                    whileHover={{ scale: 1.04, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    data-cursor="view"
                  />
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", color: "#B5924C", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>
                  {person.role}
                </p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: "#F7F4EE", marginBottom: 10 }}>
                  {person.name}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "rgba(155,145,133,0.6)", lineHeight: 1.8 }}>
                  {person.bio}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-8 md:px-16 py-24" style={{ borderTop: "1px solid rgba(155,145,133,0.1)" }}>
        <ScrollReveal>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "#F7F4EE", marginBottom: 24 }}>
            Begin a conversation.
          </h2>
          <Link to="/consultation" data-cursor="hover">
            <motion.div
              className="inline-flex items-center gap-3 px-10 py-4 tracking-[0.2em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", backgroundColor: "#B5924C", color: "#F7F4EE" }}
              whileHover={{ backgroundColor: "#9B7A3C" }}
            >
              Start Consultation <ArrowRight size={13} />
            </motion.div>
          </Link>
        </ScrollReveal>
      </div>

      <Footer />
    </div>
  );
}
