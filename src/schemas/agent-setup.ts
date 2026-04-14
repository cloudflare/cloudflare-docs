import { z } from "astro/zod";

const quickStartStepSchema = z.object({
	title: z.string(),
	description: z.string(),
	command: z.string().optional(),
	link: z.string().optional(),
});

const workflowSchema = z.object({
	title: z.string(),
	steps: z.array(z.string()),
});

const faqSchema = z.object({
	question: z.string(),
	answer: z.string(),
});

const troubleshootingSchema = z.object({
	issue: z.string(),
	solution: z.string(),
});

const capabilitiesSchema = z.object({
	ide: z.boolean().default(false),
	terminal: z.boolean().default(false),
	standalone: z.boolean().default(false),
	cloud: z.boolean().default(false),
	extension: z.boolean().default(false),
	mcp: z.boolean().default(false),
	skills: z.boolean().default(false),
	open_source: z.boolean().default(false),
});

const skillsInstallSchema = z.object({
	method: z.enum([
		"plugin_marketplace",
		"cursor_marketplace",
		"npx_skills",
		"manual_copy",
		"copilot_instructions",
	]),
	command: z.string().optional(),
	directory: z.string().optional(),
	docs_url: z.string().optional(),
});

const linksSchema = z.object({
	skills: z.string().optional(),
	mcp_server: z.string().optional(),
	cli: z.string().optional(),
	docs: z.string().optional(),
	website: z.string().optional(),
});

export const agentSetupSchema = z.object({
	name: z.string(),
	vendor: z.string(),
	slug: z.string(),
	icon: z.string(),
	description: z.string(),
	capabilities: capabilitiesSchema,
	features: z.array(z.string()),
	quick_start: z.array(quickStartStepSchema),
	mcp_config: z.string(),
	skills_install: skillsInstallSchema,
	example_prompts: z.array(z.string()),
	workflows: z.array(workflowSchema),
	tips: z.array(z.string()),
	faq: z.array(faqSchema),
	troubleshooting: z.array(troubleshootingSchema),
	related_agents: z.array(z.string()),
	links: linksSchema,
});

export type AgentSetup = z.infer<typeof agentSetupSchema>;
