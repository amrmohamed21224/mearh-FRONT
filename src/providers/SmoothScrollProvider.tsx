import type { ReactNode } from 'react';
import { useLenis } from '../hooks/useLenis';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * SmoothScrollProvider
 * Activates Lenis smooth scroll + GSAP ScrollTrigger sync globally.
 * Mounted once at the app root in App.tsx.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useLenis();
  return <>{children}</>;
}
