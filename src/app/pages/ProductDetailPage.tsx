import { useState } from "react";
import { useParams } from "react-router";
import { AnimatePresence } from "motion/react";
import { products } from "../../data";
import { colors, fonts, type as typeTokens } from "../../lib/tokens";
import { PageLayout } from "../components/layout/PageLayout";
import { ScrollReveal } from "../components/ScrollReveal";
import { Footer } from "../components/Footer";

// Immersive Cinematic Product Sections
import { ProductHero } from "../sections/product/ProductHero";
import { ProductGallery } from "../sections/product/ProductGallery";
import { MaterialDetailSection } from "../sections/product/MaterialDetailSection";
import { ProductStorySection } from "../sections/product/ProductStorySection";
import { ProductComparisonSection } from "../sections/product/ProductComparisonSection";
import { FloatingProductCard } from "../components/product/FloatingProductCard";

const defaultProduct = products["meridian-chair"];

export function ProductDetailPage() {
  const { id } = useParams();
  const product = products[id || ""] || defaultProduct;
  const [quantity, setQuantity] = useState(1);

  // Map AI Suggestion string names to actual Product data objects
  const rawSuggestions = product.aiSuggestions ?? [];
  const suggestionObjects = rawSuggestions
    .map(name => {
      // Find the first product that has this name or matches substring
      return Object.values(products).find(
        p => p.title.toLowerCase() === name.toLowerCase()
      );
    })
    .filter(Boolean); // Filter undefined/null

  return (
    <PageLayout background={colors.charcoal}>
      {/* 1. Immersive Product Hero Section */}
      <ProductHero
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
      />

      {/* 2. Fullscreen Interactive Gallery */}
      <ProductGallery product={product} />

      {/* 3. Tactical Material Detail Study (Mag Lens) */}
      <MaterialDetailSection product={product} />

      {/* 4. Story chapters (Craftsmanship, Loom, placement) */}
      <ProductStorySection product={product} />

      {/* 5. Dimensional specs comparison */}
      <ProductComparisonSection product={product} />

      {/* 6. Premium AI-Driven Spatial Recommendations */}
      {suggestionObjects.length > 0 && (
        <section
          className="relative py-28 px-6 md:px-16"
          style={{
            backgroundColor: colors.charcoal,
            borderTop: `1px solid rgba(155, 145, 133, 0.08)`,
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-16">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-6" style={{ backgroundColor: colors.brass }} />
                <span
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: typeTokens.labelSm,
                    color: colors.brass,
                    letterSpacing: typeTokens.tracking.wide,
                    textTransform: "uppercase",
                  }}
                >
                  AI Space Intelligence
                </span>
              </div>
              <h3
                style={{
                  fontFamily: fonts.serif,
                  fontSize: typeTokens.sectionLg,
                  fontWeight: 300,
                  color: colors.parchment,
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                }}
              >
                Objects that complete this sanctuary
              </h3>
            </ScrollReveal>

            {/* Suggestions list utilizing Interactive Floating Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestionObjects.map((item, idx) => {
                if (!item) return null;
                return (
                  <ScrollReveal key={item.id} delay={idx * 0.12}>
                    <FloatingProductCard
                      id={item.id}
                      title={item.title}
                      category={item.category}
                      price={item.price}
                      image={item.image}
                      driftIntensity={8 + idx * 4}
                    />
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </PageLayout>
  );
}
