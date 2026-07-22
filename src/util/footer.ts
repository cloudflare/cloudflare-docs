export type FooterLink = {
	text: string;
	href: string;
};

export type FooterColumn = {
	title: string;
	links: FooterLink[];
};

export type FooterConfig = {
	columns?: FooterColumn[];
	legalLinks?: FooterLink[];
	copyright?: string;
};

/** Stacks a secondary column beneath a primary one in the same grid cell. */
export type StackedColumnPair = {
	primary: string;
	secondary: string;
};

export const DASHBOARD_SIGN_UP_URL = "https://dash.cloudflare.com/sign-up";
export const DASHBOARD_LOGIN_URL = "https://dash.cloudflare.com/login";

// Links use absolute https://www.cloudflare.com URLs so they resolve
// correctly from the docs origin.
export const defaultFooterConfig: FooterConfig = {
	columns: [
		{
			title: "Getting started",
			links: [
				{ text: "Plans", href: "https://www.cloudflare.com/plans/" },
				{
					text: "Contact sales",
					href: "https://www.cloudflare.com/resource/contact-enterprise-sales/",
				},
				{ text: "Partners", href: "https://www.cloudflare.com/partners/" },
				{
					text: "Find a partner",
					href: "https://partnerlocator.cloudflare.com/dashboard",
				},
				{ text: "Startups", href: "https://www.cloudflare.com/startups/" },
				{
					text: "Under attack?",
					href: "https://www.cloudflare.com/under-attack-hotline/",
				},
				{
					text: "Domain name search",
					href: "https://domains.cloudflare.com/",
				},
			],
		},
		{
			title: "Company",
			links: [
				{ text: "About", href: "https://www.cloudflare.com/about/" },
				{ text: "Careers", href: "https://www.cloudflare.com/careers/" },
				{ text: "Investors", href: "https://cloudflare.net/" },
				{ text: "Press", href: "https://www.cloudflare.com/press/" },
				{
					text: "Press kit",
					href: "https://www.cloudflare.com/press/press-kit/",
				},
				{ text: "Global network", href: "https://www.cloudflare.com/network/" },
			],
		},
		{
			title: "Public interest",
			links: [
				{
					text: "Project Galileo",
					href: "https://www.cloudflare.com/galileo/",
				},
				{
					text: "Athenian Project",
					href: "https://www.cloudflare.com/athenian/",
				},
				{
					text: "Cloudflare for Campaigns",
					href: "https://www.cloudflare.com/campaigns/",
				},
				{
					text: "Project Fairshot",
					href: "https://www.cloudflare.com/fair-shot/",
				},
				{ text: "Impact/ESG", href: "https://www.cloudflare.com/impact/" },
			],
		},
		{
			title: "Compliance",
			links: [
				{
					text: "Compliance resources",
					href: "https://www.cloudflare.com/trust-hub/compliance-resources/",
				},
				{ text: "Trust Hub", href: "https://www.cloudflare.com/trust-hub/" },
				{
					text: "Data Protection",
					href: "https://www.cloudflare.com/trust-hub/gdpr/",
				},
				{
					text: "Responsible AI",
					href: "https://www.cloudflare.com/trust-hub/responsible-ai/",
				},
				{
					text: "Transparency report",
					href: "https://www.cloudflare.com/transparency/",
				},
				{
					text: "Report abuse",
					href: "https://www.cloudflare.com/trust-hub/abuse-approach/",
				},
			],
		},
		{
			title: "Resources",
			links: [
				{
					text: "App innovation report",
					href: "https://www.cloudflare.com/resource/app-innovation-report/",
				},
				{ text: "Cloudflare Radar", href: "https://radar.cloudflare.com/" },
				{
					text: "Case studies",
					href: "https://www.cloudflare.com/case-studies/",
				},
				{ text: "Status", href: "https://www.cloudflarestatus.com/" },
				{ text: "Support", href: "https://support.cloudflare.com/" },
				{ text: "Events", href: "https://www.cloudflare.com/events/" },
				{ text: "Blog", href: "https://blog.cloudflare.com/" },
			],
		},
		{
			title: "Developers",
			links: [
				{ text: "Documentation", href: "https://developers.cloudflare.com/" },
				{
					text: "Learning center",
					href: "https://www.cloudflare.com/learning/",
				},
				{ text: "Community", href: "https://community.cloudflare.com/" },
			],
		},
		{
			title: "Solutions",
			links: [
				{
					text: "SSE and SASE platform",
					href: "https://www.cloudflare.com/sase/",
				},
				{
					text: "Cloudflare AI Cloud",
					href: "https://www.cloudflare.com/solutions/ai/",
				},
				{
					text: "AI Security",
					href: "https://www.cloudflare.com/solutions/ai-security/",
				},
				{
					text: "Frontend Development Platform",
					href: "https://www.cloudflare.com/solutions/frontends/",
				},
				{
					text: "Multi-Tenant Platform Development",
					href: "https://www.cloudflare.com/solutions/platforms/",
				},
				{
					text: "Web Security Platform",
					href: "https://www.cloudflare.com/solutions/security/",
				},
			],
		},
	],
	legalLinks: [
		{
			text: "Privacy policy",
			href: "https://www.cloudflare.com/policies/privacy/",
		},
		{
			text: "Report security issues",
			href: "https://www.cloudflare.com/disclosure/",
		},
		{
			text: "Terms of use",
			href: "https://www.cloudflare.com/policies/terms/",
		},
		{ text: "Trademark", href: "https://www.cloudflare.com/trademark/" },
	],
	copyright: "© {year} Cloudflare, Inc.",
};

// Collapses the seven sections into the four-cell grid; Solutions stands
// alone in the final cell.
export const defaultStackedColumnPairs: StackedColumnPair[] = [
	{ primary: "Getting started", secondary: "Company" },
	{ primary: "Public interest", secondary: "Compliance" },
	{ primary: "Resources", secondary: "Developers" },
];
