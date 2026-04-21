import { z } from "astro/zod";

const quickStartStepSchema = z.object({
	title: z.string(),
	description: z.string(),
	command: z.string().optional(),
	link: z.string().optional(),
});

const faqSchema = z.object({
	question: z.string(),
	answer: z.string(),
});

const troubleshootingSchema = z.object({
	issue: z.string(),
	solution: z.string(),
});

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

const skillsInstallSchema = z.object({
	command: z.string().optional(),
	directory: z.string().optional(),
	docs_url: z.string().optional(),
});

// Bundled install that pulls in Cloudflare's MCP servers + Skills together
// via the cloudflare/skills plugin. Some agents (like Windsurf) don't support
// the Agent Skills standard, in which case `supported: false` + the MCP-only
// path in mcp_config is used instead.
const skillsPluginInstallSchema = z.object({
	supported: z.boolean().default(true),
	command: z.string().optional(),
	note: z.string().optional(),
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

export const agentSetupSchema = z.object({
	name: z.string(),
	vendor: z.string(),
	slug: z.string(),
	icon: z.string(),
	description: z.string(),
	capabilities: capabilitiesSchema,
	features: z.array(z.string()),
	// Decision-support metadata shown in the comparison table.
	pricing_model: pricingModelSchema.optional(),
	pricing_detail: z.string().optional(),
	model_flexibility: modelFlexibilitySchema.optional(),
	context_approach: contextApproachSchema.optional(),
	quick_start: z.array(quickStartStepSchema),
	mcp_config: z.string(),
	skills_plugin_install: skillsPluginInstallSchema,
	skills_install: skillsInstallSchema,
	example_prompts: z.array(z.string()),
	tips: z.array(z.string()),
	faq: z.array(faqSchema),
	troubleshooting: z.array(troubleshootingSchema),
	links: linksSchema,
});

export type AgentSetup = z.infer<typeof agentSetupSchema>;
