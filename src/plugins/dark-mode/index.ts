/**
 * Dark Mode Plugin for Cloudflare Docs
 * 
 * Handles cross-subdomain dark mode synchronization using @cloudflare/style-const
 * Integrates with Starlight's theme system
 */

import { initDarkModeSync } from './sync';
import { getInlineScript } from './inline-script';
import type { DarkModeConfig } from './types';

/**
 * Initialize dark mode plugin
 */
export function initDarkModePlugin(config?: DarkModeConfig): () => void {
  return initDarkModeSync(config);
}

/**
 * Get inline script to prevent FOUC
 */
export function getDarkModeInlineScript(config?: DarkModeConfig): string {
  return getInlineScript(config);
}

// Re-export commonly used functions from the library
export { 
  DarkModeSettings, 
  setDarkMode, 
  isDarkMode, 
  getDarkModeSetting 
} from '@cloudflare/style-const';

// Export type for external use
export type { DarkModeConfig } from './types';
