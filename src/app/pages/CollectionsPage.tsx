import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Footer } from "../components/Footer";
import { productList } from "../../data";
import { colors } from "../../lib/tokens";

const categories = ["All", "Seating", "Tables", "Lighting", "Objects", "Textiles"];

export function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = activeCategory === "All" ? productList : productList.filter(p => p.category === activeCategory);

  return (
    <div style={{ backgroundColor: colors.parchment, minHeight: "100vh" }}>
      {/* Header */}
      <div className="pt-44 pb-20 px-8 md:px-16">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-8" style={{ backgroundColor: "#B5924C" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Objects & Furniture
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 300,
              color: "#1E1C1A",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            The<br />
            <em style={{ fontStyle: "italic", color: "#9B9185" }}>Collection</em>
          </h1>
        </ScrollReveal>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[73px] z-40 px-8 md:px-16 py-4" style={{ backgroundColor: "rgba(247,244,238,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(155,145,133,0.15)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 whitespace-nowrap"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: activeCategory === cat ? "#1E1C1A" : "#9B9185",
                  borderBottom: activeCategory === cat ? "1px solid #B5924C" : "1px solid transparent",
                }}
                whileHover={{ color: "#1E1C1A" }}
                data-cursor="hover"
              >
                {cat}
              </motion.button>
            ))}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#9B9185", letterSpacing: "0.1em" }}>
            {filtered.length} objects
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-8 md:px-16 py-16">
        <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-1">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <Link to={`/collections/${product.id}`} data-cursor="view">
                  <motion.div
                    className="group"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="overflow-hidden mb-4">
                      <motion.img
                        src={product.image}
                        alt={product.title}
                        className="w-full aspect-[3/4] object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                      />
                    </div>
                    <div className="px-1">
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", color: "#B5924C", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>
                        {product.category}
                      </p>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 400, color: "#1E1C1A" }}>
                        {product.title}
                      </p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 300, color: "#9B9185", marginTop: 2 }}>
                        {product.material}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "#1E1C1A" }}>
                          {product.price}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
