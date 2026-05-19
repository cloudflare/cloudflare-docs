/**
 * Shared data for the Accelerate section. Consumed by:
 *   - Waterfall.astro       (toggle + per-phase rows + summary)
 *   - AccelerateSection.astro (product card grid below the waterfall)
 *
 * Both halves share `id` + `--phase-color` so the cross-highlight CSS in
 * AccelerateSection can tint the matching product card when a waterfall
 * row is hovered (and vice-versa).
 */

export type WaterfallPhaseCategory = "compute" | "ai" | "storage" | "media";

export interface WaterfallPhase {
	id: string;
	phase: string;
	before: { offset: number; width: number };
	after: { offset: number; width: number };
	product: string;
	icon: string;
	href: string;
	outcome: string;
	detail: string;
	cta: string;
	tags: string[];
	color: string;
	colorMuted: string;
	category?: WaterfallPhaseCategory;
}

export const phases: readonly WaterfallPhase[] = [
	{
		id: "dns",
		phase: "DNS Lookup",
		before: { offset: 0, width: 12.5 },
		after: { offset: 0, width: 0.69 },
		product: "DNS",
		icon: "dns",
		href: "/dns/",
		outcome: "Fast, reliable and resilient DNS queries",
		detail:
			"The world's fastest and most reliable DNS — 11ms average. DNSSEC, wildcard records, proxy control.",
		cta: "Set up Authoritative DNS",
		tags: ["Authoritative DNS", "DNSSEC"],
		color: "bg-orange-400",
		colorMuted: "bg-orange-400/20",
	},
	{
		id: "connect",
		phase: "TCP + TLS",
		before: { offset: 0, width: 25 },
		after: { offset: 0, width: 3.06 },
		product: "Argo Smart Routing",
		icon: "argo-smart-routing",
		href: "/argo-smart-routing/",
		outcome: "Durable and fast origin access for APIs and dynamic content",
		detail:
			"Detects and routes around real-time network congestion. On average, makes web applications 30% faster.",
		cta: "Integrate Argo Smart Routing",
		tags: ["Smart Routing", "Tiered Caching"],
		color: "bg-amber-500",
		colorMuted: "bg-amber-500/20",
	},
	{
		id: "wait",
		phase: "Server Wait (TTFB)",
		before: { offset: 0, width: 31.25 },
		after: { offset: 0, width: 0.31 },
		product: "CDN",
		icon: "cache",
		href: "/cache/get-started/",
		outcome:
			"Clever caching for faster user experiences and lower infrastructure costs",
		detail:
			"CDN caches content in 330+ cities worldwide with cache rules, tiered caching, and zero-configuration setup.",
		cta: "Set up Cache Rules",
		tags: ["Cache Rules", "Tiered Cache", "Cache Reserve"],
		color: "bg-yellow-500",
		colorMuted: "bg-yellow-500/20",
	},
	{
		id: "db",
		phase: "Database Query",
		before: { offset: 0, width: 87.5 },
		after: { offset: 0, width: 14.56 },
		product: "Hyperdrive",
		icon: "hyperdrive",
		href: "/hyperdrive/",
		outcome: "Make your database feel instant, everywhere",
		detail:
			"Connection pooling, query caching, and global routing for PostgreSQL and MySQL databases.",
		cta: "Make regional databases feel global",
		tags: ["Connection Pooling", "Query Caching"],
		color: "bg-lime-500",
		colorMuted: "bg-lime-500/20",
		category: "storage",
	},
	{
		id: "assets",
		phase: "Asset Optimization",
		before: { offset: 0, width: 17.5 },
		after: { offset: 0, width: 9.06 },
		product: "Images",
		icon: "images",
		href: "/images/",
		outcome: "Streamlined image infrastructure built for scale",
		detail:
			"Build scalable, reliable media pipelines to store, optimize, and deliver images.",
		cta: "Upload and optimize images",
		tags: ["Transform", "Polish", "WebP/AVIF"],
		color: "bg-teal-500",
		colorMuted: "bg-teal-500/20",
		category: "media",
	},
	{
		id: "scripts",
		phase: "Third-party Scripts",
		before: { offset: 0, width: 31.25 },
		after: { offset: 0, width: 0 },
		product: "Zaraz",
		icon: "zaraz",
		href: "/zaraz/",
		outcome: "Load third-party tools without weighing down web apps",
		detail:
			"Load analytics tools, advertising pixels, widgets, and other third-party tools without slowing down your applications.",
		cta: "Improve page load with minimal effort",
		tags: ["Server-side Tags", "Consent Mgmt"],
		color: "bg-sky-500",
		colorMuted: "bg-sky-500/20",
	},
];

export const CATEGORY_COLOR: Record<WaterfallPhaseCategory, string> = {
	compute: "#0a95ff",
	ai: "#19e306",
	storage: "#ee0ddb",
	media: "#9616ff",
};

export const phaseColor = (p: WaterfallPhase) =>
	p.category ? CATEGORY_COLOR[p.category] : "var(--color-accent-100)";
