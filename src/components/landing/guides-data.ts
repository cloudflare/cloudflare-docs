// Guides highlighted in the home page "Guides" section.
//
// Each entry points at a page in the docs collection by its slug. The card's
// title and description come from that page's frontmatter, so they stay in
// sync with the guide. The build fails if a slug does not exist.
//
// The first entry is the featured card. Keep the list to five entries so the
// grid stays balanced (one featured card plus a 2x2 grid).

export interface HomeGuide {
	/** Docs collection id, for example `use-cases/solutions/stop-malicious-bots`. */
	slug: string;
	/** Short audience or topic label shown above the title. */
	eyebrow: string;
	/**
	 * Overrides the page `title`. Without it, the page title is used with any
	 * trailing plan note such as "(Free, Pro, and Business)" removed.
	 */
	title?: string;
}

export const guides: readonly HomeGuide[] = [
	{
		slug: "use-cases/solutions/prepare-storefront-for-ai-agents",
		eyebrow: "E-commerce",
		title: "Get your storefront ready for AI shopping agents",
	},
	{
		slug: "use-cases/solutions/stop-malicious-bots",
		eyebrow: "Security",
	},
	{
		slug: "use-cases/solutions/stop-account-takeover-attacks",
		eyebrow: "Security",
	},
	{
		slug: "use-cases/solutions/protect-sensitive-forms-fraud-abuse",
		eyebrow: "Security",
	},
	{
		slug: "use-cases/solutions/encrypt-all-keep-site-secure",
		eyebrow: "Websites",
	},
];
