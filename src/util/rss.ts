/**
 * Feed helpers — kept free of changelog imports so RSS routes can rewrite
 * URLs without loading the changelog collections.
 */
import { config } from "virtual:nimbus/config";

const SITE_ORIGIN = new URL(config.site).origin;

// Rewrite root-relative URLs (href="/..", src="/..") to absolute so feed
// readers resolve them. Leaves protocol-relative (`//`) and absolute URLs
// untouched.
export function absolutizeUrls(html: string): string {
	return html.replace(
		/\b(href|src)="\/(?!\/)/g,
		(_match, attr) => `${attr}="${SITE_ORIGIN}/`,
	);
}
