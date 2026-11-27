export type ProductPathRule = {
	label: string;
	paths: string[];
};

// Keep this ordered from most-specific to least-specific. Paths not listed here
// intentionally retain their public top-level product label.
export const cloudflareOneLeafRules: ProductPathRule[] = [
	{
		label: "product:zt-access-for-infrastructure",
		paths: [
			"cloudflare-one/access-controls/applications/non-http/infrastructure-apps",
		],
	},
	{
		label: "product:dns-filtering",
		paths: ["cloudflare-one/traffic-policies/get-started/dns"],
	},
	{
		label: "product:phishguard",
		paths: ["cloudflare-one/email-security/phishguard"],
	},
	{
		label: "product:phishnet",
		paths: [
			"cloudflare-one/email-security/settings/phish-submissions/phishnet-365",
			"cloudflare-one/email-security/settings/phish-submissions/phishnet-google-workspace",
			"email-security/email-configuration/phish-submissions/phishnet-gworkspace",
			"email-security/email-configuration/phish-submissions/phishnet-o365",
		],
	},
	{
		label: "product:application-library",
		paths: ["cloudflare-one/team-and-resources/app-library"],
	},
	{
		label: "product:cloudflare-one-appliance",
		paths: ["cloudflare-wan/configuration/appliance"],
	},
	{
		label: "product:network-interconnect",
		paths: [
			"cloudflare-one/networks/connectors/cloudflare-wan/network-interconnect",
		],
	},
	{
		label: "product:cloudflare-wan",
		paths: ["cloudflare-one/networks/connectors/cloudflare-wan"],
	},
	{
		label: "product:access",
		paths: ["cloudflare-one/access-controls"],
	},
	{
		label: "product:gateway",
		paths: ["cloudflare-one/traffic-policies"],
	},
	{
		label: "product:dlp",
		paths: ["cloudflare-one/data-loss-prevention"],
	},
	{
		label: "product:casb",
		paths: [
			"cloudflare-one/cloud-and-saas-findings",
			"cloudflare-one/integrations/cloud-and-saas",
			"cloudflare-one/casb",
		],
	},
	{
		label: "product:mesh",
		paths: [
			"cloudflare-one/networks/connectors/cloudflare-mesh",
			"cloudflare-one/mesh",
		],
	},
	{
		label: "product:browser-isolation",
		paths: ["cloudflare-one/remote-browser-isolation"],
	},
	{
		label: "product:dex",
		paths: ["cloudflare-one/insights/dex"],
	},
	{
		label: "product:zt-art-analytics",
		paths: ["cloudflare-one/insights/analytics-overview"],
	},
	{
		label: "product:risk-score",
		paths: ["cloudflare-one/team-and-resources/users/risk-score"],
	},
	{
		label: "product:posture-checks",
		paths: ["cloudflare-one/reusable-components/posture-checks"],
	},
	{
		label: "product:cloudflare-one-client",
		paths: ["cloudflare-one/team-and-resources/devices/cloudflare-one-client"],
	},
	{
		label: "product:email-security",
		paths: ["cloudflare-one/email-security"],
	},
	{
		label: "product:tunnel",
		paths: ["cloudflare-one/networks/connectors/cloudflare-tunnel"],
	},
];

export const cloudflareOneParentPaths = [
	"cloudflare-one",
	"cloudflare-wan",
	"email-security",
] as const;

type PathTrie = {
	terminal: boolean;
	children: Map<string, PathTrie>;
};

function pathTrie(paths: string[]): PathTrie {
	const root: PathTrie = { terminal: false, children: new Map() };
	for (const pathname of paths) {
		let node = root;
		for (const segment of pathname.split("/")) {
			let child = node.children.get(segment);
			if (!child) {
				child = { terminal: false, children: new Map() };
				node.children.set(segment, child);
			}
			node = child;
		}
		node.terminal = true;
	}
	return root;
}

// Produce positive globs for everything below basePath except the listed
// directories. excludedPaths are directory paths relative to basePath, not files
// or full paths. Positive partitions avoid negations matching a different file
// in a multi-file PR.
export function pathGlobsExcluding(
	basePath: string,
	excludedPaths: string[],
): string[] {
	function visit(pathname: string, node: PathTrie): string[] {
		if (node.terminal) return [];
		if (node.children.size === 0) return [`${pathname}/**`];

		const children = [...node.children].sort(([a], [b]) => a.localeCompare(b));
		const childNames = children.map(([name]) => name);
		const terminalNames = children
			.filter(([, child]) => child.terminal)
			.map(([name]) => `${name}.*`);
		const directFiles =
			terminalNames.length === 0
				? `${pathname}/*`
				: `${pathname}/!(${terminalNames.join("|")})`;
		const otherDirectories = `${pathname}/!(${childNames.join("|")})/**`;

		return [
			directFiles,
			otherDirectories,
			...children.flatMap(([name, child]) =>
				child.terminal ? [] : visit(`${pathname}/${name}`, child),
			),
		];
	}

	return visit(basePath, pathTrie(excludedPaths));
}

function normalizePath(pathname: string): string {
	let normalized = pathname.toLowerCase().split(/[?#]/, 1)[0];
	normalized = normalized.replace(
		/^https?:\/\/developers\.cloudflare\.com/i,
		"",
	);
	normalized = normalized.replace(/^src\/content\/docs\//, "");
	return normalized.replace(/^\/+|\/+$/g, "");
}

function matchesPath(pathname: string, rulePath: string): boolean {
	return (
		pathname === rulePath ||
		pathname.startsWith(`${rulePath}/`) ||
		pathname.startsWith(`${rulePath}.`)
	);
}

export function classifyProductPath(pathname: string): string | undefined {
	const normalized = normalizePath(pathname);
	if (!normalized) return undefined;

	for (const rule of cloudflareOneLeafRules) {
		if (rule.paths.some((rulePath) => matchesPath(normalized, rulePath))) {
			return rule.label;
		}
	}

	const [product] = normalized.split("/");
	return product ? `product:${product}` : undefined;
}
