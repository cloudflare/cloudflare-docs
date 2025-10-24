/* This is the allowlist for the tags we allow
in our page frontmatter. Refer to https://developers.cloudflare.com/style-guide/frontmatter/custom-properties/#tags
and https://developers.cloudflare.com/style-guide/frontmatter/tags/ for more details.
*/

type Tag = { label: string; variants?: string[] };

const data_structures: Array<Tag> = [
	{ label: "JSON" },
	{ label: "TOML" },
	{ label: "XML" },
	{ label: "YAML" },
];

const frameworks: Array<Tag> = [
	{ label: "Angular" },
	{ label: "Astro" },
	{ label: "Hono" },
	{ label: "Next.js", variants: ["nextjs"] },
	{ label: "Node.js", variants: ["node", "nodejs"] },
	{ label: "Nuxt" },
	{ label: "Remix" },
	{ label: "Ruby", variants: ["rb", "ruby on rails"] },
	{ label: "Svelte" },
	{ label: "SvelteKit" },
	{ label: "Vue.js", variants: ["vue", "vuejs"] },
	{ label: ".NET" },
];

const integrations: Array<Tag> = [
	{ label: "Azure", variants: ["Microsoft Azure", "MS Azure"] },
	{ label: "AWS", variants: ["Amazon Web Services"] },
	{ label: "GCP", variants: ["Google Cloud", "Google Cloud Platform"] },
	{ label: "Google" },
	{ label: "G Suite Group", variants: ["gsuite", "g suite"] },
	{ label: "GitHub" },
	{
		label: "Microsoft Entra ID",
		variants: ["AzureAD", "Azure Active Directory", "MS Entra ID", "Entra ID"],
	},
	{ label: "Microsoft" },
	{ label: "MotherDuck" },
	{ label: "Postgres", variants: ["PostgreSQL"] },
	{ label: "S3" },
	{ label: "Sentry" },
	{ label: "Stripe" },
	{ label: "Sumo Logic", variants: ["sumo"] },
	{ label: "Okta" },
	{ label: "WordPress" },
];

const languages: Array<Tag> = [
	{ label: "Go" },
	{ label: "GraphQL" },
	{ label: "Java" },
	{ label: "JavaScript", variants: ["js"] },
	{ label: "MySQL" },
	{ label: "NoSQL" },
	{ label: "PowerShell", variants: ["ps"] },
	{ label: "Python", variants: ["py"] },
	{ label: "Rust", variants: ["rs"] },
	{ label: "Shell", variants: ["sh"] },
	{ label: "SQL" },
	{ label: "TypeScript", variants: ["ts"] },
	{ label: "WebAssembly", variants: ["Web Assembly", "wasm"] },
];

const operating_systems: Array<Tag> = [
	{ label: "Android", variants: ["ChromeOS"] },
	{ label: "iOS" },
	{ label: "Linux" },
	{ label: "MacOS", variants: ["OS X"] },
	{ label: "Windows", variants: ["ms windows"] },
];

const presentation: Array<Tag> = [{ label: "Video" }];

const product_features: Array<Tag> = [
	{ label: "Web Crypto", variants: ["webcrypto"] },
	{ label: "RPC" },
];

const protocols: Array<Tag> = [
	{ label: "FTP", variants: ["file transfer protocol", "ftps"] },
	{ label: "ICMP" },
	{ label: "IPsec" },
	{ label: "IPv4" },
	{ label: "IPv6" },
	{ label: "JSON web token (JWT)", variants: ["jwt"] },
	{ label: "MASQUE" },
	{ label: "mTLS" },
	{ label: "NetFlow" },
	{ label: "MQTT" },
	{ label: "Post-quantum", variants: ["pqc", "post-quantum cryptography"] },
	{ label: "QUIC" },
	{ label: "RDP" },
	{ label: "SAML" },
	{ label: "SCIM" },
	{ label: "SMTP" },
	{ label: "SFTP" },
	{ label: "SSH" },
	{ label: "SSO" },
	{ label: "TCP" },
	{ label: "TLS" },
	{ label: "UDP" },
	{ label: "WebSockets", variants: ["websocket"] },
	{ label: "Wireguard" },
];

const use_cases: Array<Tag> = [
	{ label: "AI" },
	{ label: "Authentication", variants: ["auth"] },
	{ label: "A/B testing", variants: ["ab test"] },
	{ label: "Bindings", variants: ["binding"] },
	{ label: "Caching", variants: ["cache"] },
	{ label: "CMS" },
	{ label: "Cookies" },
	{ label: "CORS" },
	{ label: "Debugging", variants: ["debug", "troubleshooting"] },
	{ label: "Forms" },
	{ label: "Full stack", variants: ["full-stack"] },
	{ label: "Geolocation" },
	{ label: "Headers", variants: ["header"] },
	{ label: "LLM", variants: ["llms"] },
	{ label: "Localization" },
	{ label: "Logging" },
	{ label: "Middleware" },
	{ label: "MCP" },
	{ label: "Playback" },
	{ label: "Prisma ORM" },
	{ label: "Privacy" },
	{ label: "Redirects", variants: ["redirect"] },
	{ label: "Request modification", variants: ["request"] },
	{ label: "Response modification", variants: ["response"] },
	{ label: "Security" },
	{ label: "SPA" },
	{ label: "SSG" },
	{ label: "URL rewrite", variants: ["rewrite"] },
];

export const tags = {
	data_structures,
	frameworks,
	integrations,
	languages,
	presentation,
	product_features,
	protocols,
	operating_systems,
	use_cases,
};
