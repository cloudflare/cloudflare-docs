import { EXTERNAL_LINK_ARROW as DEFAULT_EXTERNAL_LINK_ARROW } from "@cloudflare/nimbus-docs/markdown";

// U+FE0E requests text presentation so ↗ does not render as an emoji.
export const EXTERNAL_LINK_ARROW = `${DEFAULT_EXTERNAL_LINK_ARROW}\uFE0E`;

export function stripExternalLinkArrow(value: string): string {
	return value
		.replaceAll(EXTERNAL_LINK_ARROW, "")
		.replaceAll(DEFAULT_EXTERNAL_LINK_ARROW, "");
}
