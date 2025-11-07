/**
 * Inline script to prevent FOUC
 * Now uses the library's built-in function for better compatibility
 */

import { getInlineThemeScript, DarkModeNamingStrategy, type InlineThemeScriptConfig } from '@cloudflare/style-const';
import type { DarkModeConfig } from './types';

export function getInlineScript(config: DarkModeConfig = {}): string {
	const { storageKey = 'starlight-theme', themeAttribute = 'data-theme' } = config;
	
	const scriptConfig: InlineThemeScriptConfig = {
		namingStrategy: DarkModeNamingStrategy.ASTRO,
		storageKey,
		themeAttribute
	};
	
	return getInlineThemeScript(undefined, scriptConfig);
}
