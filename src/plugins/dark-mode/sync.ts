/**
 * Core dark mode synchronization logic
 */

import { 
  initDarkMode, 
  addDarkModeChangeListener,
  DarkModeNamingStrategy,
  setDarkModeFromStrategy,
  type DarkModeChangeEventDetail 
} from '@cloudflare/style-const';

import type { DarkModeConfig } from './types';

export function initDarkModeSync(config: DarkModeConfig = {}): () => void {
  if (typeof window === 'undefined') return () => {};

  const {
    storageKey = 'starlight-theme',
    themeAttribute = 'data-theme',
    autoInit = true
  } = config;

  let isUpdating = false;

  // Initialize with Astro naming strategy
  const cleanup1 = initDarkMode({ 
    namingStrategy: DarkModeNamingStrategy.ASTRO 
  });

  // Listen for changes from library
  const cleanup2 = addDarkModeChangeListener((detail: DarkModeChangeEventDetail) => {
    if (isUpdating) return;
    
    const theme = detail.value; // Already in Astro format ('dark', 'light', 'auto')
    
    isUpdating = true;
    
    // For "auto", determine the actual theme to apply to DOM
    let domTheme = theme;
    if (theme === 'auto') {
      domTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Update DOM with the actual theme (auto -> dark/light)
    document.documentElement.setAttribute(themeAttribute, domTheme);
    
    // Update localStorage with user's intent (preserve auto)
    try {
      localStorage.setItem(storageKey, theme);
    } catch (_e) {
      // Ignore localStorage errors (e.g., private browsing mode)
    }
    
    // Update Starlight UI with user's intent
    if (typeof (window as any).StarlightThemeProvider !== 'undefined') {
      (window as any).StarlightThemeProvider.updatePickers(theme);
    }
    
    isUpdating = false;
  });

  // Watch for Starlight theme changes from user interaction
  const observer = new MutationObserver(() => {
    if (isUpdating) return;
    
    const domTheme = document.documentElement.getAttribute(themeAttribute);
    if (domTheme && ['dark', 'light', 'auto'].includes(domTheme)) {
      // Check if this is a user-initiated change by looking at localStorage
      const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem(storageKey) : null;
      
      // If DOM theme doesn't match stored theme, this might be a user change
      if (storedTheme !== domTheme) {
        isUpdating = true;
        // Use the new library function to automatically handle strategy conversion
        setDarkModeFromStrategy(domTheme, DarkModeNamingStrategy.ASTRO);
        isUpdating = false;
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [themeAttribute],
  });

  // Listen for system preference changes when in auto mode
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemChange = () => {
    if (isUpdating) return;
    
    // Check if user selected auto by looking at localStorage
    const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem(storageKey) : null;
    
    if (storedTheme === 'auto') {
      isUpdating = true;
      const newDomTheme = mediaQuery.matches ? 'dark' : 'light';
      document.documentElement.setAttribute(themeAttribute, newDomTheme);
      isUpdating = false;
    }
  };
  
  mediaQuery.addEventListener('change', handleSystemChange);

  // Auto-initialize current theme
  if (autoInit) {
    // Get user's intent from localStorage first
    const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem(storageKey) : null;
    
    if (storedTheme) {
      // Use the new library function to initialize from stored theme
      setDarkModeFromStrategy(storedTheme, DarkModeNamingStrategy.ASTRO);
    } else {
      // Fallback to current DOM theme
      const currentTheme = document.documentElement.getAttribute(themeAttribute);
      if (currentTheme) {
        setDarkModeFromStrategy(currentTheme, DarkModeNamingStrategy.ASTRO);
      }
    }
  }

  return () => {
    cleanup1?.();
    cleanup2?.();
    observer.disconnect();
    mediaQuery.removeEventListener('change', handleSystemChange);
  };
}
