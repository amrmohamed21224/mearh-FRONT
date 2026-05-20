/**
 * ThemeProvider — React context for the Mearh theme engine.
 *
 * Provides:
 *   - mode         ('light' | 'dark')
 *   - palette      (full ThemePalette object for JS-side access)
 *   - isDark       (boolean shortcut)
 *   - toggle()     (cinematic switch with transition flag)
 *   - setTheme()   (explicit mode setter)
 *   - isTransitioning (true for 1.4s during switch — use to trigger overlay)
 *
 * On every mode change:
 *   1. isTransitioning → true
 *   2. CSS custom properties applied to <html> via theme-engine
 *   3. After 1400ms, isTransitioning → false
 *
 * This file is the ONLY place that calls applyThemeToDom.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  getStoredTheme,
  storeTheme,
  applyThemeToDom,
  getPalette,
  type ThemeMode,
} from '../lib/theme/theme-engine';
import { type ThemePalette } from '../lib/theme/palettes';

// ─── Context shape ────────────────────────────────────────────────────────────

interface ThemeContextValue {
  mode:            ThemeMode;
  palette:         ThemePalette;
  isDark:          boolean;
  toggle:          () => void;
  setTheme:        (mode: ThemeMode) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode,            setMode]            = useState<ThemeMode>(() => getStoredTheme());
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Apply CSS vars to DOM every time mode changes
  useEffect(() => {
    applyThemeToDom(mode);
  }, [mode]);

  const setTheme = useCallback((next: ThemeMode) => {
    if (next === mode) return;
    setIsTransitioning(true);
    // rAF ensures the flash overlay renders before the bg changes
    requestAnimationFrame(() => {
      setMode(next);
      storeTheme(next);
      setTimeout(() => setIsTransitioning(false), 1400);
    });
  }, [mode]);

  const toggle = useCallback(() => {
    setTheme(mode === 'light' ? 'dark' : 'light');
  }, [mode, setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        palette:   getPalette(mode),
        isDark:    mode === 'dark',
        toggle,
        setTheme,
        isTransitioning,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
