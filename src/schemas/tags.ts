/* This is the allowlist for the tags we allow
in our page frontmatter. Refer to https://developers.cloudflare.com/style-guide/frontmatter/custom-properties/#tags
and https://developers.cloudflare.com/style-guide/frontmatter/tags/ for more details.
*/

const data_structures: Array<object> = [
	{ label: "JSON" },
	{ label: "TOML" },
	{ label: "XML" },
	{ label: "YAML" },
];

const frameworks: Array<object> = [
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
];

const integrations: Array<object> = [
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
	{ label: "Postgres", variants: ["PostgresSQL"] },
	{ label: "S3" },
	{ label: "Sentry" },
	{ label: "Stripe" },
	{ label: "Sumo Logic", variants: ["sumo"] },
	{ label: "Okta" },
	{ label: "WordPress" },
];

const languages: Array<object> = [
	{ label: "Go" },
	{ label: "GraphQL" },
	{ label: "JavaScript", variants: ["js"] },
	{ label: "MySQL" },
	{ label: "NoSQL" },
	{ label: "PowerShell", variants: ["js"] },
	{ label: "Python", variants: ["py"] },
	{ label: "Rust", variants: ["rs"] },
	{ label: "Shell", variants: ["sh"] },
	{ label: "SQL" },
	{ label: "TypeScript", variants: ["ts"] },
	{ label: "WebAssembly", variants: ["Web Assembly", "wasm"] },
];

const operating_systems: Array<object> = [
	{ label: "Android", variants: ["ChromeOS"] },
	{ label: "iOS" },
	{ label: "Linux" },
	{ label: "MacOS", variants: ["OS X"] },
	{ label: "Windows", variants: ["ms windows"] },
];

const presentation: Array<object> = [{ label: "Video" }];

const product_features: Array<object> = [
	{ label: "Web Crypto", variants: ["webcrypto"] },
	{ label: "RPC" },
];

const protocols: Array<object> = [
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
	{ label: "QUIC" },
	{ label: "RDP" },
	{ label: "SAML" },
	{ label: "SCIM" },
	{ label: "SMTP" },
	{ label: "SFTP" },
	{ label: "SSH" },
	{ label: "TCP" },
	{ label: "TLS" },
	{ label: "UDP" },
	{ label: "WebSockets", variants: ["websocket"] },
	{ label: "Wireguard" },
];

const use_cases: Array<object> = [
	{ label: "AI" },
	{ label: "Authentication", variants: ["auth"] },
	{ label: "A/B testing", variants: ["ab test"] },
	{ label: "Caching", variants: ["cache"] },
	{ label: "CMS" },
	{ label: "Cookies" },
	{ label: "CORS" },
	{ label: "Debugging", variants: ["debug", "troubleshooting"] },
	{ label: "Forms" },
	{ label: "Geolocation" },
	{ label: "Headers", variants: ["header"] },
	{ label: "Localization" },
	{ label: "Logging" },
	{ label: "Middleware" },
	{ label: "Playback" },
	{ label: "Privacy" },
	{ label: "Redirects", variants: ["redirect"] },
	{ label: "Request modification", variants: ["request"] },
	{ label: "Response modification", variants: ["response"] },
	{ label: "RPC" },
	{ label: "Security" },
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
