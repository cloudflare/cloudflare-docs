/**
 * Product data for the Accelerate section. Consumed by
 * AccelerateSection.astro to render a grid of product cards.
 */

export type ProductCategory = "compute" | "ai" | "storage" | "media";

export interface AccelerateProduct {
	id: string;
	product: string;
	icon: string;
	href: string;
	outcome: string;
	detail: string;
	cta: string;
	category?: ProductCategory;
}

export const products: readonly AccelerateProduct[] = [
	{
		id: "dns",
		product: "DNS",
		icon: "dns",
		href: "/dns/",
		outcome: "Fast, reliable and resilient DNS queries",
		detail:
			"World's fastest authoritative DNS, consistently ranked #1 by DNSPerf; free, fully API-managed, DNSSEC supported.",
		cta: "Set up Authoritative DNS",
	},
	{
		id: "smart-shield",
		product: "Smart Shield",
		icon: "smart-shield",
		href: "/smart-shield/",
		outcome: "Minimize origin load and accelerate dynamic content",
		detail:
			"Intelligently manage traffic, optimize content delivery, and safeguard origin infrastructure.",
		cta: "Enable Smart Shield",
	},
	{
		id: "cdn",
		product: "CDN",
		icon: "cache",
		href: "/cache/get-started/",
		outcome:
			"Default caching for static assets, with cache rules for full control",
		detail:
			"Caches content in 330+ cities worldwide, with instant purging and granular Cache Rules.",
		cta: "Set up Cache Rules",
	},
	{
		id: "speed",
		product: "Speed",
		icon: "speed",
		href: "/speed/",
		outcome: "Assess your site speed and apply recommended optimizations",
		detail:
			"Application delivery optimizations including minification, Brotli compression, Early Hints, and HTTP/3.",
		cta: "Improve your site speed",
	},
	{
		id: "images",
		product: "Images",
		icon: "images",
		href: "/images/",
		outcome: "Transform, optimize, and deliver images worldwide",
		detail:
			"Cloudflare Images handles format conversion, responsive sizing, and intelligent caching.",
		cta: "Optimize image delivery",
		category: "media",
	},
	{
		id: "web-analytics",
		product: "Web Analytics",
		icon: "web-analytics",
		href: "/web-analytics/",
		outcome: "Understand the performance of your web pages",
		detail:
			"Cloudflare Web Analytics collects Core Web Vitals and performance data from 100% of page views without cookies or sampling.",
		cta: "Track real user metrics",
	},
];
