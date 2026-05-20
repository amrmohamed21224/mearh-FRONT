import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Plus, Minus } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Footer } from "../components/Footer";
import { products } from "../../data";
import { colors } from "../../lib/tokens";

const defaultProduct = products["meridian-chair"];

export function ProductDetailPage() {
  const { id } = useParams();
  const product = products[id || ""] || defaultProduct;
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div style={{ backgroundColor: colors.parchment, minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div className="pt-36 pb-8 px-8 md:px-16">
        <Link to="/collections" data-cursor="hover">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ x: -3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft size={13} color="#9B9185" />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#9B9185", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Collections
            </span>
          </motion.div>
        </Link>
      </div>

      {/* Main product section */}
      <div className="px-8 md:px-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Image column */}
          <div className="md:col-span-7">
            {/* Main image */}
            <div className="relative overflow-hidden mb-3" style={{ backgroundColor: "#EDE8DF" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.images?.[activeImage]}
                  alt={product.title}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                  data-cursor="view"
                />
              </AnimatePresence>

              {/* Navigation arrows — only show if multiple images */}
              {(product.images?.length ?? 0) > 1 && (
                <div className="absolute bottom-5 right-5 flex gap-2">
                  <motion.button
                    onClick={() => setActiveImage((p) => (p - 1 + (product.images!.length)) % product.images!.length)}
                    className="w-9 h-9 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(247,244,238,0.9)" }}
                    whileHover={{ backgroundColor: "#F7F4EE" }}
                    data-cursor="hover"
                  >
                    <ArrowLeft size={14} color="#1E1C1A" />
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveImage((p) => (p + 1) % product.images!.length)}
                    className="w-9 h-9 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(247,244,238,0.9)" }}
                    whileHover={{ backgroundColor: "#F7F4EE" }}
                    data-cursor="hover"
                  >
                    <ArrowRight size={14} color="#1E1C1A" />
                  </motion.button>
                </div>
              )}
            </div>

            {/* Thumbnails — only render if multiple images exist */}
            {(product.images?.length ?? 0) > 1 && (
              <div className="flex gap-2">
                {product.images!.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="relative overflow-hidden"
                    style={{
                      border: i === activeImage ? "1px solid #B5924C" : "1px solid transparent",
                    }}
                    data-cursor="hover"
                  >
                    <img src={img} alt="" className="w-20 aspect-square object-cover" loading="lazy" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Info column */}
          <div className="md:col-span-5">
            <ScrollReveal>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#B5924C", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>
                {product.subtitle}
              </p>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 300,
                  color: "#1E1C1A",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                {product.title}
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "#9B9185", marginTop: 8 }}>
                {product.material}
              </p>

              {/* Price */}
              <div className="mt-8 flex items-end gap-4">
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.2rem",
                    fontWeight: 300,
                    color: "#1E1C1A",
                  }}
                >
                  {product.price}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185", letterSpacing: "0.1em", marginBottom: 6 }}>
                  Excluding delivery & installation
                </p>
              </div>

              {/* Description */}
              <p
                className="mt-8"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 300,
                  color: "#6B6560",
                  lineHeight: 1.9,
                }}
              >
                {product.description}
              </p>

              {/* Quantity */}
              <div className="mt-10 flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center border"
                    style={{ borderColor: "rgba(155,145,133,0.3)" }}
                    whileHover={{ borderColor: "#B5924C" }}
                    data-cursor="hover"
                  >
                    <Minus size={12} color="#9B9185" />
                  </motion.button>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#1E1C1A", minWidth: 20, textAlign: "center" }}>
                    {quantity}
                  </span>
                  <motion.button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border"
                    style={{ borderColor: "rgba(155,145,133,0.3)" }}
                    whileHover={{ borderColor: "#B5924C" }}
                    data-cursor="hover"
                  >
                    <Plus size={12} color="#9B9185" />
                  </motion.button>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185", letterSpacing: "0.1em" }}>
                  Lead time: {product.lead}
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3">
                <Link to="/checkout" data-cursor="hover">
                  <motion.div
                    className="w-full py-4 text-center tracking-[0.2em] uppercase"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.7rem",
                      backgroundColor: "#1E1C1A",
                      color: "#F7F4EE",
                    }}
                    whileHover={{ backgroundColor: "#2E2C2A" }}
                    transition={{ duration: 0.2 }}
                  >
                    Reserve This Piece
                  </motion.div>
                </Link>
                <Link to="/consultation" data-cursor="hover">
                  <motion.div
                    className="w-full py-4 text-center tracking-[0.2em] uppercase border"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.7rem",
                      borderColor: "rgba(155,145,133,0.3)",
                      color: "#9B9185",
                    }}
                    whileHover={{ borderColor: "#B5924C", color: "#B5924C" }}
                    transition={{ duration: 0.2 }}
                  >
                    Discuss With Studio
                  </motion.div>
                </Link>
              </div>

              {/* Specs accordion */}
              <div className="mt-12 space-y-0">
                {[
                  { key: "details",   label: "Craftsmanship",       content: product.details },
                  { key: "dims",      label: "Dimensions & Weight",  content: [product.dimensions, product.weight].filter(Boolean).join("\n") },
                  { key: "materials", label: "Materials",            content: product.relatedMaterials?.join(" · ") },
                ]
                  .filter((s) => Boolean(s.content)) // hide accordion sections with no data
                  .map((section) => (
                  <div key={section.key} style={{ borderTop: "1px solid rgba(155,145,133,0.2)" }}>
                    <button
                      className="w-full flex items-center justify-between py-4"
                      onClick={() => toggleSection(section.key)}
                      data-cursor="hover"
                    >
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#1E1C1A" }}>
                        {section.label}
                      </span>
                      <motion.div animate={{ rotate: expandedSection === section.key ? 45 : 0 }} transition={{ duration: 0.2 }}>
                        <Plus size={13} color="#9B9185" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedSection === section.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: "hidden" }}
                        >
                          <p className="pb-5" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 300, color: "#6B6560", lineHeight: 1.9, whiteSpace: "pre-line" }}>
                            {section.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: "#EDE8DF" }}>
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-6" style={{ backgroundColor: "#B5924C" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185", letterSpacing: "0.25em", textTransform: "uppercase" }}>
              AI Style Intelligence
            </span>
          </div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 300,
              color: "#1E1C1A",
              marginBottom: 40,
            }}
          >
            Objects that complete this space
          </h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {(product.aiSuggestions ?? []).map((name, i) => (
            <ScrollReveal key={name} delay={i * 0.1}>
              <Link to="/collections" data-cursor="view">
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.35 }}>
                  <div className="overflow-hidden mb-4" style={{ backgroundColor: "#E4E0D8" }}>
                    <img
                      src={`https://images.unsplash.com/photo-${i === 0 ? "1599696848652-f0ff23bc911f" : i === 1 ? "1724582586495-d050726cf354" : "1552858725-a19e7fcd3ac4"}?auto=format&fit=crop&w=600&q=80`}
                      alt={name}
                      className="w-full aspect-square object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#1E1C1A" }}>{name}</p>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
