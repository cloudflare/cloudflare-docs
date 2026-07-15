// Landing mega-nav structure (sections → links / collapsible groups).

export interface SidebarLink {
	type: "link";
	label: string;
	href: string;
}

export interface SidebarGroup {
	type: "group";
	label: string;
	/** Product icon name (src/icons/<icon>.svg). */
	icon?: string;
	collapsed?: boolean;
	nodes: SidebarNode[];
}

export type SidebarNode = SidebarLink | SidebarGroup;

export interface SidebarSection {
	heading: string;
	nodes: SidebarNode[];
}

const link = (label: string, href: string): SidebarLink => ({
	type: "link",
	label,
	href,
});

export const sidebarSections: SidebarSection[] = [
	{
		heading: "Get started",
		nodes: [
			link("Overview", "/"),
			link("API", "/api/"),
			link("Agent Setup", "/agent-setup/"),
			link("Directory", "/directory/"),
			link("Changelog", "/changelog/"),
			{
				type: "group",
				label: "Resources",
				collapsed: true,
				nodes: [
					link(
						"Learning paths",
						"/resources/?filter-pcx_content_type=learning-path",
					),
					link("Use cases", "/use-cases/"),
					link("Reference architecture", "/reference-architecture/"),
				],
			},
			{
				type: "group",
				label: "API & IaC",
				collapsed: true,
				nodes: [
					link("API reference", "/api/"),
					link("Terraform", "/terraform/"),
					link("Pulumi", "/pulumi/"),
					link("SDKs", "/fundamentals/api/reference/sdks/"),
				],
			},
			link("Support", "/support/"),
		],
	},
	{
		heading: "Build",
		nodes: [
			{
				type: "group",
				label: "Compute",
				icon: "workers",
				collapsed: true,
				nodes: [
					link("Workers", "/workers/"),
					link("Containers", "/containers/"),
					link("Durable Objects", "/durable-objects/"),
					link("Queues", "/queues/"),
					link("Workflows", "/workflows/"),
					link("Browser Run", "/browser-run/"),
					link("Workers VPC", "/workers-vpc/"),
					link("Cloudflare for Platforms", "/cloudflare-for-platforms/"),
					link("Email Service", "/email-service/"),
				],
			},
			{
				type: "group",
				label: "AI",
				icon: "workers-ai",
				collapsed: true,
				nodes: [
					link("Models", "/ai/models/"),
					link("Workers AI", "/workers-ai/"),
					link("AI Gateway", "/ai-gateway/"),
					link("Agents", "/agents/"),
					link("Agent Memory", "/agent-memory/"),
					link("Sandbox SDK", "/sandbox/"),
					link("Vectorize", "/vectorize/"),
					link("AI Search", "/ai-search/"),
					link("AI Crawl Control", "/ai-crawl-control/"),
				],
			},
			{
				type: "group",
				label: "Storage & Database",
				icon: "kv",
				collapsed: true,
				nodes: [
					link("R2", "/r2/"),
					link("R2 Data Catalog", "/r2/data-catalog/"),
					link("R2 SQL", "/r2-sql/"),
					link("Pipelines", "/pipelines/"),
					link("D1", "/d1/"),
					link("KV", "/kv/"),
					link("Hyperdrive", "/hyperdrive/"),
				],
			},
			{
				type: "group",
				label: "Media",
				icon: "images",
				collapsed: true,
				nodes: [
					link("Images", "/images/"),
					link("Stream", "/stream/"),
					link("Realtime", "/realtime/"),
				],
			},
		],
	},
	{
		heading: "Protect & Connect",
		nodes: [
			{
				type: "group",
				label: "Application Security",
				icon: "waf",
				collapsed: true,
				nodes: [
					link("WAF", "/waf/"),
					link("DDoS Protection", "/ddos-protection/"),
					link("SSL/TLS", "/ssl/"),
					link("Bots", "/bots/"),
					link("API Shield", "/api-shield/"),
					link("Page Shield", "/page-shield/"),
					link("Turnstile", "/turnstile/"),
					link("Security Center", "/security-center/"),
				],
			},
			{
				type: "group",
				label: "Cloudflare One",
				icon: "cloudflare-one",
				collapsed: true,
				nodes: [
					link("Overview", "/cloudflare-one/"),
					link("Insights & Logs", "/cloudflare-one/insights/"),
					link("Team & Resources", "/cloudflare-one/team-and-resources/"),
					link("Networks", "/cloudflare-one/networks/"),
					link("Access controls", "/cloudflare-one/access-controls/"),
					link("Traffic policies", "/cloudflare-one/traffic-policies/"),
					link(
						"Cloud & SaaS findings",
						"/cloudflare-one/cloud-and-saas-findings/",
					),
					link("Email security", "/cloudflare-one/email-security/"),
					link(
						"Data loss prevention",
						"/cloudflare-one/data-loss-prevention/",
					),
					link("Browser isolation", "/cloudflare-one/remote-browser-isolation/"),
					link("Reusable components", "/cloudflare-one/reusable-components/"),
					link("Integrations", "/cloudflare-one/integrations/"),
				],
			},
			{
				type: "group",
				label: "Domains & DNS",
				icon: "dns",
				collapsed: true,
				nodes: [
					link("DNS", "/dns/"),
					link("1.1.1.1", "/1.1.1.1/"),
					link("Registrar", "/registrar/"),
					link("Email Routing", "/email-service/"),
					link("DMARC Management", "/dmarc-management/"),
				],
			},
			{
				type: "group",
				label: "Networking",
				icon: "network",
				collapsed: true,
				nodes: [
					link("Tunnel", "/tunnel/"),
					link("Mesh", "/mesh/"),
					link("Magic Transit", "/magic-transit/"),
					link("Magic WAN", "/cloudflare-wan/"),
					link("Network Interconnect", "/network-interconnect/"),
					link("Spectrum", "/spectrum/"),
					link("BYOIP", "/byoip/"),
				],
			},
			{
				type: "group",
				label: "Delivery & Performance",
				icon: "speed",
				collapsed: true,
				nodes: [
					link("Cache", "/cache/"),
					link("Speed", "/speed/"),
					link("Load Balancing", "/load-balancing/"),
					link("Waiting Room", "/waiting-room/"),
					link("Argo Smart Routing", "/argo-smart-routing/"),
					link("Zaraz", "/zaraz/"),
				],
			},
		],
	},
	{
		heading: "Manage & Observe",
		nodes: [
			{
				type: "group",
				label: "Observe",
				icon: "analytics",
				collapsed: true,
				nodes: [
					link("Analytics", "/analytics/"),
					link("Web Analytics", "/web-analytics/"),
					link("Logs", "/logs/"),
					link("Log Explorer", "/log-explorer/"),
					link("Health Checks", "/health-checks/"),
				],
			},
		],
	},
];
