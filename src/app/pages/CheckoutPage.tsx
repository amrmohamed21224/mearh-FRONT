import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

const cartItems = [
  {
    id: "meridian-chair",
    title: "Meridian Chair",
    material: "Patinated Brass & Natural Boucle",
    price: 4800,
    quantity: 1,
    lead: "8–10 weeks",
    image: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "solstice-lamp",
    title: "Solstice Floor Lamp",
    material: "Oxidized Bronze",
    price: 2200,
    quantity: 1,
    lead: "4–6 weeks",
    image: "https://images.unsplash.com/photo-1552858725-2758b5fb1286?auto=format&fit=crop&w=400&q=80",
  },
];

type Step = "review" | "details" | "delivery" | "confirm";

const steps: Step[] = ["review", "details", "delivery", "confirm"];
const stepLabels: Record<Step, string> = {
  review: "Review",
  details: "Details",
  delivery: "Delivery",
  confirm: "Confirmed",
};

export function CheckoutPage() {
  const [step, setStep] = useState<Step>("review");
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", country: "Italy", phone: "" });
  const [delivery, setDelivery] = useState("white-glove");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCost = delivery === "white-glove" ? 450 : delivery === "standard" ? 120 : 0;
  const total = subtotal + deliveryCost;

  const next = () => {
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
  };

  return (
    <div style={{ backgroundColor: "#F7F4EE", minHeight: "100vh" }}>
      {/* Header */}
      <div className="px-8 md:px-16 py-8" style={{ borderBottom: "1px solid rgba(155,145,133,0.15)" }}>
        <div className="flex items-center justify-between">
          <Link to="/collections" data-cursor="hover">
            <motion.div className="flex items-center gap-2" whileHover={{ x: -3 }}>
              <ArrowLeft size={14} color="#9B9185" />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#9B9185", letterSpacing: "0.15em" }}>Continue Shopping</span>
            </motion.div>
          </Link>
          <div
            className="tracking-[0.4em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.1rem", color: "#1E1C1A" }}
          >
            MEARH
          </div>
          <div className="flex items-center gap-1">
            <Lock size={11} color="#9B9185" />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185", letterSpacing: "0.1em" }}>Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div className="px-8 md:px-16 py-8" style={{ borderBottom: "1px solid rgba(155,145,133,0.1)" }}>
        <div className="flex items-center gap-0 max-w-md">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <motion.div
                className="flex items-center gap-2"
                animate={{
                  opacity: steps.indexOf(step) >= i ? 1 : 0.35,
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: step === s ? "#1E1C1A" : steps.indexOf(step) > i ? "#B5924C" : "transparent",
                    border: `1px solid ${step === s ? "#1E1C1A" : steps.indexOf(step) > i ? "#B5924C" : "rgba(155,145,133,0.3)"}`,
                  }}
                >
                  {steps.indexOf(step) > i ? (
                    <Check size={10} color="#F7F4EE" />
                  ) : (
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.5rem", color: step === s ? "#F7F4EE" : "#9B9185" }}>{i + 1}</span>
                  )}
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: step === s ? "#1E1C1A" : "#9B9185" }}>
                  {stepLabels[s]}
                </span>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="mx-4 h-px w-8" style={{ backgroundColor: "rgba(155,145,133,0.2)" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Main content */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              {step === "review" && (
                <motion.div key="review" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, color: "#1E1C1A", marginBottom: 32 }}>
                    Your Selection
                  </h2>
                  <div className="space-y-0">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-6 py-8" style={{ borderBottom: "1px solid rgba(155,145,133,0.12)" }}>
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 400, color: "#1E1C1A" }}>{item.title}</p>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 300, color: "#9B9185", marginTop: 3 }}>{item.material}</p>
                          <p className="mt-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#B5924C", letterSpacing: "0.1em" }}>Lead time: {item.lead}</p>
                        </div>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#1E1C1A" }}>€{item.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    onClick={next}
                    className="mt-10 w-full py-4 tracking-[0.2em] uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", backgroundColor: "#1E1C1A", color: "#F7F4EE" }}
                    whileHover={{ backgroundColor: "#2E2C2A" }}
                    data-cursor="hover"
                  >
                    Continue to Details
                  </motion.button>
                </motion.div>
              )}

              {step === "details" && (
                <motion.div key="details" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, color: "#1E1C1A", marginBottom: 32 }}>
                    Your Details
                  </h2>
                  <div className="space-y-8">
                    {[
                      { key: "name", label: "Full Name", placeholder: "Your name", type: "text" },
                      { key: "email", label: "Email Address", placeholder: "your@email.com", type: "email" },
                      { key: "phone", label: "Phone Number", placeholder: "+39 000 000 0000", type: "tel" },
                      { key: "address", label: "Delivery Address", placeholder: "Street address", type: "text" },
                      { key: "city", label: "City", placeholder: "City", type: "text" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                          placeholder={field.placeholder}
                          className="w-full mt-2 py-3 bg-transparent border-0 border-b outline-none"
                          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#1E1C1A", borderBottom: "1px solid rgba(155,145,133,0.3)" }}
                        />
                      </div>
                    ))}
                  </div>
                  <motion.button
                    onClick={next}
                    className="mt-10 w-full py-4 tracking-[0.2em] uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", backgroundColor: "#1E1C1A", color: "#F7F4EE" }}
                    whileHover={{ backgroundColor: "#2E2C2A" }}
                    data-cursor="hover"
                  >
                    Continue to Delivery
                  </motion.button>
                </motion.div>
              )}

              {step === "delivery" && (
                <motion.div key="delivery" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, color: "#1E1C1A", marginBottom: 32 }}>
                    Delivery Method
                  </h2>
                  <div className="space-y-3">
                    {[
                      { id: "white-glove", label: "White Glove Delivery", desc: "Expert delivery, installation, and debris removal. Scheduled at your convenience.", price: "€450" },
                      { id: "standard", label: "Standard Delivery", desc: "Delivery to door. Ground-floor access required.", price: "€120" },
                      { id: "studio", label: "Studio Collection", desc: "Collect from our Florence studio. By appointment.", price: "Complimentary" },
                    ].map((option) => (
                      <motion.button
                        key={option.id}
                        onClick={() => setDelivery(option.id)}
                        className="w-full text-left p-6 border flex items-start justify-between"
                        style={{
                          borderColor: delivery === option.id ? "#B5924C" : "rgba(155,145,133,0.2)",
                          backgroundColor: delivery === option.id ? "rgba(181,146,76,0.04)" : "transparent",
                        }}
                        whileHover={{ borderColor: "#B5924C" }}
                        data-cursor="hover"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center border"
                            style={{ borderColor: delivery === option.id ? "#B5924C" : "rgba(155,145,133,0.3)" }}
                          >
                            {delivery === option.id && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#B5924C" }} />}
                          </div>
                          <div>
                            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#1E1C1A" }}>{option.label}</p>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 300, color: "#9B9185", marginTop: 3 }}>{option.desc}</p>
                          </div>
                        </div>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#B5924C", flexShrink: 0, marginLeft: 12 }}>{option.price}</p>
                      </motion.button>
                    ))}
                  </div>
                  <motion.button
                    onClick={next}
                    className="mt-10 w-full py-4 tracking-[0.2em] uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", backgroundColor: "#1E1C1A", color: "#F7F4EE" }}
                    whileHover={{ backgroundColor: "#2E2C2A" }}
                    data-cursor="hover"
                  >
                    Confirm Order
                  </motion.button>
                </motion.div>
              )}

              {step === "confirm" && (
                <motion.div key="confirm" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
                    style={{ backgroundColor: "#B5924C" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                  >
                    <Check size={24} color="#F7F4EE" />
                  </motion.div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", fontWeight: 300, color: "#1E1C1A", marginBottom: 16 }}>
                    Your order is placed.
                  </h2>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 300, color: "#9B9185", lineHeight: 1.9, maxWidth: 400, margin: "0 auto 32px" }}>
                    You'll receive a confirmation by email. Your dedicated MEARH contact will reach out within 24 hours to coordinate delivery and installation details.
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#B5924C", letterSpacing: "0.15em" }}>
                    Order Ref: MEARH-2026-04782
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="md:col-span-5">
            <div className="sticky top-28">
              <div className="p-8" style={{ backgroundColor: "#EDE8DF" }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#9B9185", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>
                  Order Summary
                </h3>
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#1E1C1A" }}>{item.title}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185", marginTop: 2 }}>Qty {item.quantity}</p>
                      </div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#1E1C1A" }}>€{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="h-px w-full mb-5" style={{ backgroundColor: "rgba(155,145,133,0.2)" }} />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 300, color: "#9B9185" }}>Subtotal</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#1E1C1A" }}>€{subtotal.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between">
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 300, color: "#9B9185" }}>Delivery</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#1E1C1A" }}>
                      {deliveryCost === 0 ? "Complimentary" : `€${deliveryCost}`}
                    </p>
                  </div>
                </div>
                <div className="h-px w-full my-5" style={{ backgroundColor: "rgba(155,145,133,0.2)" }} />
                <div className="flex justify-between">
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#1E1C1A", letterSpacing: "0.1em", textTransform: "uppercase" }}>Total</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 300, color: "#1E1C1A" }}>€{total.toLocaleString()}</p>
                </div>
                <p className="mt-4" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 300, color: "#9B9185", lineHeight: 1.7 }}>
                  All pieces are made to order. A 50% deposit is required to commence production, with the balance due prior to delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
