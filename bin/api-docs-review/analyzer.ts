import type { OpenAPI, OpenAPIV3 } from "openapi-types";
import type { CurlCommand, FileReviewResult } from "./types";

/**
 * Parses a curl command to extract method and URL
 */
function parseCurlCommand(curlLines: string[]): {
	method: string;
	url: string;
	rawCommand: string;
} | null {
	const fullCommand = curlLines.join(" ").replace(/\\\s*\n\s*/g, " ");

	// Extract URL - curl typically has the URL as a positional argument or after flags
	const urlMatch = fullCommand.match(
		/curl\s+(?:[^"'\s]+\s+)*["']?(https?:\/\/[^\s"']+)["']?/,
	);
	if (!urlMatch) {
		// Try another pattern: URL without quotes
		const urlMatch2 = fullCommand.match(/curl\s+.*?(https?:\/\/[^\s\\]+)/);
		if (!urlMatch2) return null;
	}

	const url = urlMatch?.[1] || fullCommand.match(/https?:\/\/[^\s"'\\]+/)?.[0];
	if (!url) return null;

	// Extract method from -X or --request flag, default to GET (or POST if there's data)
	let method = "GET";
	const methodMatch = fullCommand.match(/-X\s+["']?(\w+)["']?/);
	if (methodMatch) {
		method = methodMatch[1].toUpperCase();
	} else if (
		fullCommand.includes("--data") ||
		fullCommand.includes("-d ") ||
		fullCommand.includes("-d'") ||
		fullCommand.includes('-d"')
	) {
		method = "POST";
	}

	return { method, url, rawCommand: fullCommand.trim() };
}

/**
 * Extracts the API path from a full Cloudflare API URL
 */
function extractApiPath(url: string): string | null {
	if (!url.includes("api.cloudflare.com")) return null;

	// Remove base URL and extract path
	const pathMatch = url.match(/api\.cloudflare\.com\/client\/v4(\/[^\s?#"']+)/);
	if (!pathMatch) return null;

	let path = pathMatch[1];

	// Normalize path parameters - replace actual IDs and placeholders with OpenAPI format
	path = path
		// Shell variable placeholders like $ACCOUNT_ID or ${ACCOUNT_ID}
		.replace(/\/\$\{?([A-Z_]+)\}?(?=\/|$)/g, (_, name) => {
			return `/{${name.toLowerCase()}}`;
		})
		// Angle bracket placeholders like <ACCOUNT_ID>
		.replace(/\/<([A-Z_]+)>(?=\/|$)/g, (_, name) => {
			return `/{${name.toLowerCase()}}`;
		})
		// 32-char hex (zone_id, account_id, etc.)
		.replace(/\/[a-f0-9]{32}(?=\/|$)/gi, "/{id}")
		// UUIDs
		.replace(
			/\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(?=\/|$)/gi,
			"/{id}",
		)
		// Numeric IDs
		.replace(/\/\d+(?=\/|$)/g, "/{id}");

	return path;
}

/**
 * Detects raw curl commands in bash code blocks
 */
export function detectCurlCommands(content: string): CurlCommand[] {
	const commands: CurlCommand[] = [];
	const lines = content.split("\n");

	let inBashBlock = false;
	let curlLines: string[] = [];
	let curlStartLine = 0;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		// Detect start of bash/shell code block
		if (line.match(/^```(?:bash|sh|shell)?\s*$/)) {
			inBashBlock = true;
			continue;
		}

		// Detect end of code block
		if (line.startsWith("```") && inBashBlock) {
			// Process any pending curl command
			if (curlLines.length > 0) {
				const parsed = parseCurlCommand(curlLines);
				if (parsed && parsed.url.includes("api.cloudflare.com")) {
					const path = extractApiPath(parsed.url);
					commands.push({
						line: curlStartLine,
						method: parsed.method,
						path: path || "",
						fullUrl: parsed.url,
						rawCommand: parsed.rawCommand,
						hasSchemaEndpoint: false, // Will be set later
					});
				}
				curlLines = [];
			}
			inBashBlock = false;
			continue;
		}

		if (inBashBlock) {
			// Check if this line starts a curl command
			if (line.trim().startsWith("curl ") || line.trim() === "curl") {
				// Save any previous curl command first
				if (curlLines.length > 0) {
					const parsed = parseCurlCommand(curlLines);
					if (parsed && parsed.url.includes("api.cloudflare.com")) {
						const path = extractApiPath(parsed.url);
						commands.push({
							line: curlStartLine,
							method: parsed.method,
							path: path || "",
							fullUrl: parsed.url,
							rawCommand: parsed.rawCommand,
							hasSchemaEndpoint: false,
						});
					}
				}
				curlLines = [line];
				curlStartLine = i + 1; // 1-indexed
			} else if (curlLines.length > 0) {
				// Continue collecting multi-line curl command
				curlLines.push(line);
			}
		}
	}

	return commands;
}

/**
 * Checks if an endpoint exists in the OpenAPI schema
 */
export function checkEndpointInSchema(
	path: string,
	method: string,
	schema: OpenAPI.Document,
): boolean {
	const paths = (schema as OpenAPIV3.Document).paths;
	if (!paths) return false;

	// Try exact match first
	if (paths[path]) {
		const pathItem = paths[path] as OpenAPIV3.PathItemObject;
		if (pathItem[method.toLowerCase() as keyof OpenAPIV3.PathItemObject]) {
			return true;
		}
	}

	// Try to match with path parameters
	// Convert our normalized path back to OpenAPI format
	const normalizedPath = path.replace(/\{id\}/g, "{$1}");

	for (const schemaPath of Object.keys(paths)) {
		// Create a regex pattern from the schema path
		const pattern = schemaPath
			.replace(/\{[^}]+\}/g, "[^/]+")
			.replace(/\//g, "\\/");
		const regex = new RegExp(`^${pattern}$`);

		if (regex.test(path) || regex.test(normalizedPath)) {
			const pathItem = paths[schemaPath] as OpenAPIV3.PathItemObject;
			if (pathItem[method.toLowerCase() as keyof OpenAPIV3.PathItemObject]) {
				return true;
			}
		}
	}

	return false;
}

/**
 * Analyzes a file for raw curl commands
 */
export function analyzeFile(
	filePath: string,
	content: string,
): FileReviewResult {
	const relativePath = filePath.replace(/.*src\/content\//, "src/content/");
	const curlCommands = detectCurlCommands(content);

	return {
		filePath,
		relativePath,
		curlCommands,
	};
}

/**
 * Enriches curl commands with schema information
 */
export async function enrichWithSchemaInfo(
	results: FileReviewResult[],
	schema: OpenAPI.Document,
): Promise<void> {
	for (const result of results) {
		for (const cmd of result.curlCommands) {
			if (cmd.path) {
				cmd.hasSchemaEndpoint = checkEndpointInSchema(
					cmd.path,
					cmd.method,
					schema,
				);
			}
		}
	}
}
