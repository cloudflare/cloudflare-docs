export type PricingModel = "subscription" | "byok" | "hybrid";
export type ModelFlexibility = "locked" | "multi_provider";
export type ContextApproach = "session" | "project_memory" | "indexed_codebase";

export interface AgentData {
	name: string;
	vendor: string;
	slug: string;
	icon: string;
	description: string;
	primary_type?: "ide" | "terminal" | "extension" | "cloud";
	capabilities: {
		ide: boolean;
		terminal: boolean;
		standalone: boolean;
		cloud: boolean;
		extension: boolean;
		open_source: boolean;
	};
	features: string[];
	// Decision-support metadata
	pricing_model?: PricingModel;
	pricing_detail?: string;
	model_flexibility?: ModelFlexibility;
	context_approach?: ContextApproach;
	quick_start: {
		title: string;
		description: string;
		command?: string;
		link?: string;
	}[];
	mcp_config: string;
	skills_plugin_install: {
		supported: boolean;
		command?: string;
		note?: string;
	};
	skills_install: {
		command?: string;
		directory?: string;
		docs_url?: string;
	};
	example_prompts: string[];
	tips: string[];
	faq: {
		question: string;
		answer: string;
	}[];
	troubleshooting: {
		issue: string;
		solution: string;
	}[];
	links: {
		skills?: string;
		mcp_server?: string;
		cli?: string;
		docs?: string;
		website?: string;
	};
}
