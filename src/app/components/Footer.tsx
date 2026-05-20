import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-24 pb-12 px-8 md:px-16"
      style={{ backgroundColor: "#1E1C1A" }}
    >
      <div className="h-px w-full mb-16" style={{ backgroundColor: "rgba(155,145,133,0.15)" }} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
        {/* Brand column */}
        <div className="md:col-span-4">
          <div
            className="tracking-[0.4em] uppercase mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.4rem",
              fontWeight: 300,
              color: "#F7F4EE",
            }}
          >
            MEARH
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 300,
              color: "#9B9185",
              lineHeight: 1.9,
              maxWidth: 280,
            }}
          >
            A studio at the intersection of architecture, material intelligence, and spatial emotion. We design spaces that remember you.
          </p>
          <div className="mt-8 h-px w-16" style={{ backgroundColor: "#B5924C" }} />
        </div>

        {/* Nav columns */}
        <div className="md:col-span-2 md:col-start-6">
          <p
            className="uppercase tracking-[0.2em] mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185" }}
          >
            Explore
          </p>
          {[
            { label: "Collections", href: "/collections" },
            { label: "Projects", href: "/projects" },
            { label: "Materials", href: "/materials" },
            { label: "About Studio", href: "/about" },
          ].map((link) => (
            <Link key={link.label} to={link.href}>
              <motion.div
                className="block py-1.5"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 300,
                  color: "#9B9185",
                }}
                whileHover={{ color: "#F7F4EE", x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="md:col-span-2">
          <p
            className="uppercase tracking-[0.2em] mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185" }}
          >
            Services
          </p>
          {[
            { label: "Consultation", href: "/consultation" },
            { label: "AI Analyzer", href: "/ai-analyzer" },
            { label: "Space Builder", href: "/consultation" },
            { label: "Checkout", href: "/checkout" },
          ].map((link) => (
            <Link key={link.label} to={link.href}>
              <motion.div
                className="block py-1.5"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 300,
                  color: "#9B9185",
                }}
                whileHover={{ color: "#F7F4EE", x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="md:col-span-2">
          <p
            className="uppercase tracking-[0.2em] mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#9B9185" }}
          >
            Contact
          </p>
          <motion.a
            href="mailto:studio@mearh.com"
            className="flex items-center gap-1 py-1.5"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 300,
              color: "#9B9185",
            }}
            whileHover={{ color: "#B5924C" }}
            transition={{ duration: 0.2 }}
          >
            studio@mearh.com <ArrowUpRight size={12} />
          </motion.a>
          <p
            className="mt-4 py-1.5"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 300,
              color: "#9B9185",
              lineHeight: 1.7,
            }}
          >
            22 Via della Spezieria<br />
            Florence, Italy 50123
          </p>
        </div>
      </div>

      <div className="h-px w-full mb-8" style={{ backgroundColor: "rgba(155,145,133,0.1)" }} />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 300,
            color: "rgba(155,145,133,0.5)",
            letterSpacing: "0.1em",
          }}
        >
          © 2026 MEARH Studio. All rights reserved.
        </p>
        <div className="flex items-center gap-8">
          {["Privacy", "Terms", "Cookies"].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 300,
                color: "rgba(155,145,133,0.4)",
                letterSpacing: "0.1em",
                cursor: "none",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
