import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Footer } from "../components/Footer";
import { Link } from "react-router";

const materials = [
  {
    id: "calacatta-oro",
    name: "Calacatta Oro",
    family: "Marble",
    origin: "Apuan Alps, Italy",
    color: "#EDE8E0",
    accent: "#C8B99A",
    texture: "Fine crystalline, with gold and warm grey veining",
    hardness: "Mohs 3–4",
    finish: ["Polished", "Honed", "Brushed"],
    applications: ["Kitchen surfaces", "Bathroom cladding", "Feature walls", "Flooring"],
    character: "The warmth of Italian sunlight made solid. Calacatta Oro carries gold veins that shift in quality with the light — domestic in morning, ceremonial at dusk.",
    image: "https://images.unsplash.com/photo-1683290844875-0eee4089069a?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "brushed-brass",
    name: "Brushed Brass",
    family: "Metal",
    origin: "Northern Europe",
    color: "#C9A86C",
    accent: "#8B6E3C",
    texture: "Directional matte grain with warm gold tone",
    hardness: "Brinell 60",
    finish: ["Brushed", "Polished", "Patinated", "Oxidized"],
    applications: ["Hardware", "Lighting", "Furniture frames", "Architectural details"],
    character: "A material that ages into biography. The brush marks left during finishing catch light differently each hour, creating a surface that is simultaneously industrial and intimate.",
    image: "https://images.unsplash.com/photo-1552858725-2758b5fb1286?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "smoked-oak",
    name: "Smoked Oak",
    family: "Wood",
    origin: "Central Europe",
    color: "#6B5C4A",
    accent: "#8B7355",
    texture: "Tight, even grain with deep chocolate tones",
    hardness: "Janka 1290 lbf",
    finish: ["Oiled", "Lacquered", "Waxed"],
    applications: ["Flooring", "Joinery", "Furniture", "Cabinetry"],
    character: "The ammonia fuming process transforms oak's tannins into deep espresso tones, creating a visual weight that anchors any room without heaviness.",
    image: "https://images.unsplash.com/photo-1757439402103-fc35542f96f8?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "pietra-serena",
    name: "Pietra Serena",
    family: "Stone",
    origin: "Fiesole, Italy",
    color: "#8A8078",
    accent: "#5A5350",
    texture: "Fine grey-blue grain with subtle schist lines",
    hardness: "Mohs 5–6",
    finish: ["Honed", "Bush-hammered", "Sandblasted"],
    applications: ["Flooring", "Stair treads", "Exterior cladding", "Window sills"],
    character: "The stone of Renaissance Florence. Pietra Serena's restrained grey-blue tone has defined Florentine architecture for five centuries — a material simultaneously humble and eternal.",
    image: "https://images.unsplash.com/photo-1599968164773-c01cf3159a67?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "nero-marquina",
    name: "Nero Marquina",
    family: "Marble",
    origin: "Basque Country, Spain",
    color: "#1E1C1A",
    accent: "#3C3830",
    texture: "Deep black with stark white calcite veining",
    hardness: "Mohs 3",
    finish: ["Polished", "Honed"],
    applications: ["Feature walls", "Bathroom", "Flooring inlays", "Furniture tops"],
    character: "The drama of deep space rendered in stone. Nero Marquina's intense blackness with explosive white veins creates spaces of profound emotional presence.",
    image: "https://images.unsplash.com/photo-1743708282103-99ca20d4803f?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "natural-linen",
    name: "Natural Linen",
    family: "Textile",
    origin: "Normandy, France",
    color: "#D4C9B5",
    accent: "#9B8E78",
    texture: "Loose weave, slight slub, breathing structure",
    hardness: "N/A",
    finish: ["Raw", "Washed", "Stonewashed"],
    applications: ["Upholstery", "Drapery", "Cushioning", "Wall panels"],
    character: "The most honest textile. Linen carries the memory of the flax plant — its slight irregularities are not flaws but proof of origin, a material that softens without surrendering its character.",
    image: "https://images.unsplash.com/photo-1587023705100-8094f8d47e86?auto=format&fit=crop&w=800&q=85",
  },
];

const families = ["All", "Marble", "Metal", "Wood", "Stone", "Textile"];

interface MaterialCardProps {
  material: typeof materials[0];
  index: number;
  onSelect: (m: typeof materials[0]) => void;
}

function MaterialCard({ material, index, onSelect }: MaterialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    // Normalize coordinates: -0.5 is left/top, 0.5 is right/bottom
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Translation values: shift in opposite direction (intensity up to 20px)
  const shiftX = mousePos.x * -20;
  const shiftY = mousePos.y * -20;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(material)}
      className="relative cursor-none overflow-hidden group"
      style={{
        borderBottom: "1px solid rgba(155,145,133,0.12)",
        borderRight: index % 2 === 0 ? "1px solid rgba(155,145,133,0.12)" : "none",
        backgroundColor: "transparent",
      }}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.06 }}
      data-cursor="material"
      data-cursor-label="Explore"
    >
      <div className="flex items-stretch min-h-[180px]">
        {/* Left container: swatches and texture reveal */}
        <div className="w-28 md:w-36 flex-shrink-0 relative overflow-hidden bg-stone-200">
          {/* Static color swatch */}
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundColor: material.color }}
          />

          {/* High-res texture mask reveal */}
          <div
            className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)]"
            style={{
              clipPath: hovered ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)",
            }}
          >
            {/* The actual image shifting to create 3D parallax */}
            <div
              className="absolute -inset-4 transition-transform duration-200 ease-out"
              style={{
                transform: `translate3d(${shiftX}px, ${shiftY}px, 0) scale(1.15)`,
              }}
            >
              <img
                src={material.image}
                alt={material.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Subtle shadow overlay on texture */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-black/15 to-transparent pointer-events-none mix-blend-overlay"
            />
          </div>
        </div>

        {/* Right container: textual information */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between transition-colors duration-500 group-hover:bg-[rgba(155,145,133,0.03)]">
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", color: "#B5924C", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>
              {material.family}
            </p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.6rem",
                fontWeight: 300,
                color: "#1E1C1A",
              }}
            >
              {material.name}
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 300, color: "#9B9185", marginTop: 4 }}>
              {material.origin}
            </p>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 300, color: "#6B6560", lineHeight: 1.7, maxWidth: 280 }}>
              {material.texture}
            </p>

            <div
              className="flex items-center gap-2 transition-all duration-300"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateX(0)" : "translateX(-8px)",
              }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#B5924C", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Explore
              </span>
              <ArrowRight size={11} color="#B5924C" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function MaterialExplorerPage() {
  const [activeFamily, setActiveFamily] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState<typeof materials[0] | null>(null);

  const filtered = activeFamily === "All" ? materials : materials.filter(m => m.family === activeFamily);

  return (
    <div style={{ backgroundColor: "#F7F4EE", minHeight: "100vh" }}>
      {/* Header */}
      <div className="pt-44 pb-12 px-8 md:px-16">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-8" style={{ backgroundColor: "#B5924C" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Material Intelligence
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
            Material<br />
            <em style={{ fontStyle: "italic", color: "#9B9185" }}>Explorer</em>
          </h1>
          <p className="mt-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 300, color: "#9B9185", lineHeight: 1.9, maxWidth: 500 }}>
            Each material in our library has been selected for its character, longevity, and emotional resonance. Explore the properties and nature of each element.
          </p>
        </ScrollReveal>
      </div>

      {/* Family filter */}
      <div className="sticky top-[73px] z-40 px-8 md:px-16 py-4" style={{ backgroundColor: "rgba(247,244,238,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(155,145,133,0.15)" }}>
        <div className="flex items-center gap-1">
          {families.map((fam) => (
            <motion.button
              key={fam}
              onClick={() => setActiveFamily(fam)}
              className="px-5 py-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: activeFamily === fam ? "#1E1C1A" : "#9B9185",
                borderBottom: activeFamily === fam ? "1px solid #B5924C" : "1px solid transparent",
              }}
              data-cursor="hover"
            >
              {fam}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Material grid */}
      <div className="px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 animate-grid">
          {filtered.map((material, i) => (
            <MaterialCard
              key={material.id}
              material={material}
              index={i}
              onSelect={setSelectedMaterial}
            />
          ))}
        </div>
      </div>

      {/* Material detail panel */}
      <AnimatePresence>
        {selectedMaterial && (
          <motion.div
            className="fixed inset-0 z-[600] flex items-end md:items-center justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(30,28,26,0.7)", backdropFilter: "blur(8px)" }}
              onClick={() => setSelectedMaterial(null)}
            />
            <motion.div
              className="relative z-10 w-full md:w-[560px] h-full overflow-y-auto"
              style={{ backgroundColor: "#F7F4EE" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-6" style={{ backgroundColor: "#F7F4EE", borderBottom: "1px solid rgba(155,145,133,0.15)" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                  Material Profile
                </p>
                <button onClick={() => setSelectedMaterial(null)} data-cursor="hover">
                  <X size={16} color="#9B9185" />
                </button>
              </div>

              {/* Hero color */}
              <div className="h-48 w-full relative overflow-hidden" style={{ backgroundColor: selectedMaterial.color }}>
                <img src={selectedMaterial.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply" />
              </div>

              <div className="p-8">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#B5924C", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>
                  {selectedMaterial.family} — {selectedMaterial.origin}
                </p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 300, color: "#1E1C1A", marginBottom: 20 }}>
                  {selectedMaterial.name}
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 300, color: "#6B6560", lineHeight: 1.9 }}>
                  {selectedMaterial.character}
                </p>

                <div className="mt-10 space-y-6">
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
                      Available Finishes
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedMaterial.finish.map((f: string) => (
                        <span key={f} className="px-4 py-1.5" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#1E1C1A", border: "1px solid rgba(155,145,133,0.3)" }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
                      Applications
                    </p>
                    <ul className="space-y-2">
                      {selectedMaterial.applications.map((a: string) => (
                        <li key={a} className="flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#B5924C" }} />
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "#6B6560" }}>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4" style={{ backgroundColor: "#EDE8DF" }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", color: "#9B9185", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Hardness</p>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#1E1C1A" }}>{selectedMaterial.hardness}</p>
                    </div>
                    <div className="p-4" style={{ backgroundColor: "#EDE8DF" }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", color: "#9B9185", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Family</p>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#1E1C1A" }}>{selectedMaterial.family}</p>
                    </div>
                  </div>
                </div>

                <Link to="/consultation" data-cursor="hover">
                  <motion.div
                    className="mt-10 w-full py-4 text-center tracking-[0.2em] uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", backgroundColor: "#1E1C1A", color: "#F7F4EE" }}
                    whileHover={{ backgroundColor: "#2E2C2A" }}
                  >
                    Specify This Material
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
