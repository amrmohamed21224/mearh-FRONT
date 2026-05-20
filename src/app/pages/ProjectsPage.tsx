import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Footer } from "../components/Footer";
import { projectList } from "../../data";
import { colors } from "../../lib/tokens";

const categories = ["All", "Residential", "Interior", "Commercial", "Hospitality"];


export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? projectList : projectList.filter(p => p.category === activeCategory);

  return (
    <div style={{ backgroundColor: colors.charcoal, minHeight: "100vh" }}>
      {/* Dark header */}
      <div className="pt-44 pb-20 px-8 md:px-16">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-8" style={{ backgroundColor: "#B5924C" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "rgba(155,145,133,0.7)", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Built Work
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 300,
              color: "#F7F4EE",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Projects<br />
            <em style={{ fontStyle: "italic", color: "rgba(247,244,238,0.3)" }}>Archive</em>
          </h1>
        </ScrollReveal>
      </div>

      {/* Filter */}
      <div className="sticky top-[73px] z-40 px-8 md:px-16 py-4" style={{ backgroundColor: "rgba(30,28,26,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(155,145,133,0.1)" }}>
        <div className="flex items-center gap-1">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: activeCategory === cat ? "#F7F4EE" : "rgba(155,145,133,0.5)",
                borderBottom: activeCategory === cat ? "1px solid #B5924C" : "1px solid transparent",
              }}
              data-cursor="hover"
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Project list */}
      <div className="px-8 md:px-16 py-16">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link to={`/projects/${project.id}`} data-cursor="view">
                <motion.div
                  className="group py-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-12"
                  style={{ borderBottom: "1px solid rgba(155,145,133,0.1)" }}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="w-full md:w-56 flex-shrink-0 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-video md:aspect-[4/3] object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", color: "#B5924C", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>
                          {project.category} — {project.location} — {project.year}
                        </p>
                        <h2
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                            fontWeight: 300,
                            color: "#F7F4EE",
                            lineHeight: 1.1,
                          }}
                        >
                          {project.title}
                        </h2>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "rgba(155,145,133,0.7)", marginTop: 4 }}>
                          {project.subtitle}
                        </p>
                        <p className="mt-4 hidden md:block" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 300, color: "rgba(155,145,133,0.5)", lineHeight: 1.8, maxWidth: 420 }}>
                          {project.description}
                        </p>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity mt-2"
                        whileHover={{ x: 2, y: -2 }}
                      >
                        <ArrowUpRight size={18} color="#B5924C" />
                      </motion.div>
                    </div>

                    <div className="mt-5 flex gap-6">
                      <div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", color: "rgba(155,145,133,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 2 }}>Area</p>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "rgba(247,244,238,0.5)" }}>{project.area}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dark footer */}
      <Footer />
    </div>
  );
}
