export type PricingModel = "subscription" | "byok" | "hybrid";
export type ModelFlexibility = "locked" | "multi_provider";
export type ContextApproach = "session" | "project_memory" | "indexed_codebase";
export type AgentSetupWorkflow = "terminal" | "desktop" | "cloud" | "extension";

export interface AgentData {
	name: string;
	vendor: string;
	slug: string;
	icon: string;
	description: string;
	capabilities: {
		terminal: boolean;
		desktop: boolean;
		cloud: boolean;
		extension: boolean;
		open_source: boolean;
	};
	features: string[];
	pricing_model?: PricingModel;
	model_flexibility?: ModelFlexibility;
	context_approach?: ContextApproach;
	workflow_links?: Partial<Record<AgentSetupWorkflow, string>>;
	links: {
		skills?: string;
		mcp_server?: string;
		cli?: string;
		docs?: string;
		website?: string;
	};
}
