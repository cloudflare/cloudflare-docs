import { z } from "astro/zod";

// Capabilities shown on cards / in the comparison table.
// MCP + Skills are omitted because every listed agent supports them
// (a footnote below the table mentions this).
const capabilitiesSchema = z.object({
	ide: z.boolean().default(false),
	terminal: z.boolean().default(false),
	standalone: z.boolean().default(false),
	cloud: z.boolean().default(false),
	extension: z.boolean().default(false),
	open_source: z.boolean().default(false),
});

const linksSchema = z.object({
	skills: z.string().optional(),
	mcp_server: z.string().optional(),
	cli: z.string().optional(),
	docs: z.string().optional(),
	website: z.string().optional(),
});

export const pricingModelSchema = z.enum(["subscription", "byok", "hybrid"]);

export const modelFlexibilitySchema = z.enum(["locked", "multi_provider"]);

export const contextApproachSchema = z.enum([
	"session",
	"project_memory",
	"indexed_codebase",
]);

// Structured data for each agent.
// All rich prose — tips, FAQ, troubleshooting, platform-access text — lives
// in the matching MDX file at src/content/docs/agent-setup/{slug}.mdx.
export const agentSetupSchema = z.object({
	name: z.string(),
	vendor: z.string(),
	slug: z.string(),
	icon: z.string(),
	description: z.string(),
	primary_type: z.enum(["ide", "terminal", "extension", "cloud"]).optional(),
	capabilities: capabilitiesSchema,
	features: z.array(z.string()),
	// Decision-support metadata shown in the comparison table.
	pricing_model: pricingModelSchema.optional(),
	pricing_detail: z.string().optional(),
	model_flexibility: modelFlexibilitySchema.optional(),
	context_approach: contextApproachSchema.optional(),
	links: linksSchema,
});

export type AgentSetup = z.infer<typeof agentSetupSchema>;
