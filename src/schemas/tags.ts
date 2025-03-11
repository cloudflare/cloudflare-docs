const data_structures: Array<Object> = [
	{ label: "JSON" },
	{ label: "TOML" },
	{ label: "XML" },
	{ label: "YAML" },
];

const frameworks: Array<Object> = [
	{ label: "Angular" },
	{ label: "Astro" },
	{ label: "Hono" },
	{ label: "Next.js", variants: ["nextjs"] },
	{ label: "Node.js", variants: ["node", "nodejs"] },
	{ label: "Nuxt" },
	{ label: "RPC" },
	{ label: "Ruby", variants: ["rb", "ruby on rails"] },
	{ label: "Svelte" },
	{ label: "SvelteKit" },
	{ label: "Vue.js", variants: ["vue", "vuejs"] },
	{ label: "Web Crypto", variants: ["webcrypto"] },
];

const integrations: Array<Object> = [
	{ label: "Azure", variants: ["Microsoft Azure", "MS Azure"] },
	{ label: "AWS", variants: ["Amazon Web Services"] },
	{ label: "GCP", variants: ["Google Cloud", "Google Cloud Platform"] },
	{ label: "G Suite Group", variants: ["gsuite", "g suite"] },
	{ label: "GitHub" },
	{
		label: "Microsoft Entra ID",
		variants: ["AzureAD", "Azure Active Directory", "MS Entra ID", "Entra ID"],
	},
	{ label: "Postgres", variants: ["PostgresSQL"] },
	{ label: "S3" },
	{ label: "Sentry" },
	{ label: "Stripe" },
	{ label: "Sumo Logic", variants: ["sumo"] },
	{ label: "Okta" },
	{ label: "WordPress" },
];

const languages: Array<Object> = [
	{ label: "Go" },
	{ label: "GraphQL" },
	{ label: "JavaScript", variants: ["js"] },
	{ label: "MySQL" },
	{ label: "NoSQL" },
	{ label: "PowerShell", variants: ["js"] },
	{ label: "Python", variants: ["py"] },
	{ label: "Rust", variants: ["rs"] },
	{ label: "SQL" },
	{ label: "TypeScript", variants: ["ts"] },
	{ label: "WebAssembly", variants: ["Web Assembly", "wasm"] },
];

const protocols: Array<Object> = [
	{ label: "FTP", variants: ["file transfer protocol"] },
	{ label: "IPsec" },
	{ label: "IPv4" },
	{ label: "IPv6" },
	{ label: "JSON web token (JWT)", variants: ["jwt"] },
	{ label: "MASQUE" },
	{ label: "mTLS" },
	{ label: "NetFlow" },
	{ label: "MQTT" },
	{ label: "RDP" },
	{ label: "SAML" },
	{ label: "SCIM" },
	{ label: "SMTP" },
	{ label: "SSH" },
	{ label: "UDP" },
	{ label: "WebSockets", variants: ["websocket"] },
	{ label: "Wireguard" },
];

const operating_systems: Array<Object> = [
	{ label: "Linux" },
	{ label: "MacOS", variants: ["OS X"] },
	{ label: "Windows", variants: ["ms windows"] },
];

const use_cases: Array<Object> = [
	{ label: "Authentication", variants: ["auth"] },
	{ label: "A/B testing", variants: ["ab test"] },
	{ label: "Caching", variants: ["cache"] },
	{ label: "CMS" },
	{ label: "Cookies" },
	{ label: "CORS" },
	{ label: "Debugging", variants: ["debug"] },
	{ label: "Forms" },
	{ label: "Geolocation" },
	{ label: "HTMLRewriter" },
	{ label: "Headers", variants: ["header"] },
	{ label: "Localization" },
	{ label: "Logging" },
	{ label: "Middleware" },
	{ label: "Playback" },
	{ label: "Redirects", variants: ["redirect"] },
	{ label: "Request modification", variants: ["request"] },
	{ label: "Response modification", variants: ["response"] },
	{ label: "Security" },
	{ label: "URL rewrite", variants: ["rewrite"] },
];

export const tags = {
	data_structures,
	frameworks,
	integrations,
	languages,
	protocols,
	operating_systems,
	use_cases,
};
