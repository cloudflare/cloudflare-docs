/**
 * Dark mode plugin types
 */

export interface DarkModeConfig {
	/** localStorage key for Starlight theme (default: 'starlight-theme') */
	storageKey?: string;
	/** Attribute on document element (default: 'data-theme') */
	themeAttribute?: string;
	/** Auto-initialize on call (default: true) */
	autoInit?: boolean;
}
