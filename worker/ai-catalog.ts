export type AiCatalogEntry = {
	identifier: string;
	displayName: string;
	type: string;
	url: string;
	description: string;
	tags?: string[];
	representativeQueries?: [string, string, ...string[]];
};

export type AiCatalogManifest = {
	specVersion: "1.0";
	host: {
		displayName: string;
		identifier: string;
		documentationUrl: string;
	};
	entries: AiCatalogEntry[];
};

export const AI_CATALOG_MANIFEST: AiCatalogManifest = {
	specVersion: "1.0",
	host: {
		displayName: "Cloudflare Developer Documentation",
		identifier: "did:web:developers.cloudflare.com",
		documentationUrl: "https://developers.cloudflare.com/",
	},
	entries: [
		{
			identifier: "urn:air:developers.cloudflare.com:api:openapi",
			displayName: "Cloudflare API OpenAPI Specification",
			type: "application/vnd.oai.openapi+json",
			url: "https://developers.cloudflare.com/openapi.json",
			description: "OpenAPI specification for the Cloudflare REST API (v4).",
			tags: ["cloudflare", "api", "openapi"],
			representativeQueries: [
				"Find Cloudflare API endpoints and request/response shapes",
				"How do I update a DNS record using the Cloudflare API?",
			],
		},
		{
			identifier: "urn:air:developers.cloudflare.com:mcp:server-card",
			displayName: "Cloudflare MCP Servers",
			type: "application/mcp-server-card+json",
			url: "https://developers.cloudflare.com/.well-known/mcp/server-card.json",
			description:
				"Server card listing Cloudflare MCP server endpoints and connection details.",
			tags: ["cloudflare", "mcp"],
			representativeQueries: [
				"How do I connect to Cloudflare's MCP servers?",
				"What Cloudflare MCP servers are available?",
			],
		},
		{
			identifier: "urn:air:developers.cloudflare.com:skills:index",
			displayName: "Cloudflare Agent Skills Index",
			type: "application/agent-skills+json",
			url: "https://developers.cloudflare.com/.well-known/agent-skills/index.json",
			description:
				"Index of Cloudflare-published agent skills (metadata and download links).",
			tags: ["cloudflare", "agent-skills"],
			representativeQueries: [
				"What agent skills does Cloudflare publish?",
				"Where can I download Cloudflare agent skills?",
			],
		},
		{
			identifier: "urn:air:developers.cloudflare.com:docs:llms-txt",
			displayName: "Cloudflare Docs LLM Index (llms.txt)",
			type: "text/plain",
			url: "https://developers.cloudflare.com/llms.txt",
			description:
				"Text index for AI systems: a structured list of Cloudflare docs sections and per-product llms.txt links.",
			tags: ["cloudflare", "documentation", "llms.txt"],
			representativeQueries: [
				"Where is the Cloudflare docs llms.txt index?",
				"List Cloudflare products and their documentation roots",
			],
		},
	],
};

export const AI_CATALOG_BODY = JSON.stringify(AI_CATALOG_MANIFEST);

export const AI_CATALOG_HEADERS: Record<string, string> = {
	"Content-Type": "application/ai-catalog+json; charset=utf-8",
	// The ARD / AI Catalog serving guidance calls out permissive CORS so
	// discovery clients (including in-browser ones) can fetch this document.
	"Access-Control-Allow-Origin": "*",
};
