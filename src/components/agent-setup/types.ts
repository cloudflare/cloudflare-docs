export interface AgentData {
	name: string;
	vendor: string;
	slug: string;
	icon: string;
	description: string;
	capabilities: {
		ide: boolean;
		terminal: boolean;
		standalone: boolean;
		cloud: boolean;
		extension: boolean;
		mcp: boolean;
		skills: boolean;
		open_source: boolean;
	};
	features: string[];
	quick_start: {
		title: string;
		description: string;
		command?: string;
		link?: string;
	}[];
	mcp_config: string;
	skills_install: {
		method: string;
		command?: string;
		directory?: string;
		docs_url?: string;
	};
	example_prompts: string[];
	workflows: {
		title: string;
		steps: string[];
	}[];
	tips: string[];
	faq: {
		question: string;
		answer: string;
	}[];
	troubleshooting: {
		issue: string;
		solution: string;
	}[];
	related_agents: string[];
	links: {
		skills?: string;
		mcp_server?: string;
		cli?: string;
		docs?: string;
		website?: string;
	};
}
