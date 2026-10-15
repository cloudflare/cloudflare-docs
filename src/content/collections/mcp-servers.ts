import { z } from "astro/zod";
import type { CollectionConfig } from "astro/content/config";
import { slug } from "github-slugger";

import { middlecacheLoader } from "../../util/custom-loaders";

const mcpServerSchema = z.object({
	name: z.string(),
	description: z.string(),
	url: z.string(),
});

type McpServer = z.infer<typeof mcpServerSchema>;

const mcpServersCollectionConfig: CollectionConfig<typeof mcpServerSchema> = {
	loader: middlecacheLoader("v1/cloudflare-mcps/mcps-manifest.json", {
		parser: (fileContent: string) => {
			const data = JSON.parse(fileContent) as {
				servers: McpServer[];
			};

			const lookup: Record<string, McpServer> = {};

			for (const server of data.servers) {
				const id = slug(server.name);
				if (id in lookup) {
					throw new Error(
						`mcp-servers: "${server.name}" and "${lookup[id]?.name}" both slugify to "${id}" — rename one to disambiguate.`,
					);
				}
				lookup[id] = server;
			}

			return lookup;
		},
	}),
	schema: mcpServerSchema,
};

export { mcpServersCollectionConfig, mcpServerSchema };
