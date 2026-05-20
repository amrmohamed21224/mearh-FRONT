/**
 * GSAP Registration Module
 * Import this ONCE at the app root before using any GSAP plugins.
 * Adding plugins here automatically makes them available project-wide.
 *
 * Future plugins to add as needed:
 *   ScrollTrigger, TextPlugin, SplitText, DrawSVGPlugin, MorphSVGPlugin
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register all plugins once
gsap.registerPlugin(ScrollTrigger);

// ─── Global GSAP defaults ───────────────────────────────────────────────────
// These match the brand motion values from tokens.ts
gsap.defaults({
  ease: 'power3.out',  // Closest standard GSAP ease to our luxury cubic
  duration: 0.9,
});

// ─── ScrollTrigger defaults ──────────────────────────────────────────────────
ScrollTrigger.config({
  // Prevent scroll jumps when ScrollTrigger refreshes
  ignoreMobileResize: true,
});

export { gsap, ScrollTrigger };
