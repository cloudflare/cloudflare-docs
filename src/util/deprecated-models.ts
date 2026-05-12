export interface DeprecatedModelInfo {
	slug: string;
	name: string;
	deprecationDate: string;
	status: "deprecated" | "planned-deprecation";
}

export const DEPRECATED_MODELS: DeprecatedModelInfo[] = [
	// Already deprecated — October 1, 2025
	{
		slug: "deepseek-coder-6.7b-base-awq",
		name: "@hf/thebloke/deepseek-coder-6.7b-base-awq",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "deepseek-coder-6.7b-instruct-awq",
		name: "@hf/thebloke/deepseek-coder-6.7b-instruct-awq",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "deepseek-math-7b-instruct",
		name: "@cf/deepseek-ai/deepseek-math-7b-instruct",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "discolm-german-7b-v1-awq",
		name: "@cf/thebloke/discolm-german-7b-v1-awq",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "falcon-7b-instruct",
		name: "@cf/tiiuae/falcon-7b-instruct",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "llama-2-13b-chat-awq",
		name: "@hf/thebloke/llama-2-13b-chat-awq",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "llamaguard-7b-awq",
		name: "@hf/thebloke/llamaguard-7b-awq",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "mistral-7b-instruct-v0.1-awq",
		name: "@hf/thebloke/mistral-7b-instruct-v0.1-awq",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "neural-chat-7b-v3-1-awq",
		name: "@hf/thebloke/neural-chat-7b-v3-1-awq",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "openchat-3.5-0106",
		name: "@cf/openchat/openchat-3.5-0106",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "openhermes-2.5-mistral-7b-awq",
		name: "@hf/thebloke/openhermes-2.5-mistral-7b-awq",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "qwen1.5-0.5b-chat",
		name: "@cf/qwen/qwen1.5-0.5b-chat",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "qwen1.5-1.8b-chat",
		name: "@cf/qwen/qwen1.5-1.8b-chat",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "qwen1.5-14b-chat-awq",
		name: "@cf/qwen/qwen1.5-14b-chat-awq",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "qwen1.5-7b-chat-awq",
		name: "@cf/qwen/qwen1.5-7b-chat-awq",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "starling-lm-7b-beta",
		name: "@hf/nexusflow/starling-lm-7b-beta",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "tinyllama-1.1b-chat-v1.0",
		name: "@cf/tinyllama/tinyllama-1.1b-chat-v1.0",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "una-cybertron-7b-v2-bf16",
		name: "@cf/fblgit/una-cybertron-7b-v2-bf16",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},
	{
		slug: "zephyr-7b-beta-awq",
		name: "@hf/thebloke/zephyr-7b-beta-awq",
		deprecationDate: "2025-10-01",
		status: "deprecated",
	},

	// Planned deprecations — May 30, 2026
	{
		slug: "kimi-k2.5",
		name: "@cf/moonshotai/kimi-k2.5",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "meta-llama-3-8b-instruct",
		name: "@hf/meta-llama/meta-llama-3-8b-instruct",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "llama-3-8b-instruct",
		name: "@cf/meta/llama-3-8b-instruct",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "llama-3-8b-instruct-awq",
		name: "@cf/meta/llama-3-8b-instruct-awq",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "llama-3.1-8b-instruct",
		name: "@cf/meta/llama-3.1-8b-instruct",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "llama-3.1-8b-instruct-awq",
		name: "@cf/meta/llama-3.1-8b-instruct-awq",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "llama-3.1-70b-instruct",
		name: "@cf/meta/llama-3.1-70b-instruct",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "llama-2-7b-chat-int8",
		name: "@cf/meta/llama-2-7b-chat-int8",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "llama-2-7b-chat-fp16",
		name: "@cf/meta/llama-2-7b-chat-fp16",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "mistral-7b-instruct-v0.1",
		name: "@cf/mistral/mistral-7b-instruct-v0.1",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "mistral-7b-instruct-v0.2",
		name: "@hf/mistral/mistral-7b-instruct-v0.2",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "gemma-7b-it",
		name: "@hf/google/gemma-7b-it",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "gemma-3-12b-it",
		name: "@cf/google/gemma-3-12b-it",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "hermes-2-pro-mistral-7b",
		name: "@hf/nousresearch/hermes-2-pro-mistral-7b",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "phi-2",
		name: "@cf/microsoft/phi-2",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "sqlcoder-7b-2",
		name: "@cf/defog/sqlcoder-7b-2",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "uform-gen2-qwen-500m",
		name: "@cf/unum/uform-gen2-qwen-500m",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
	{
		slug: "bart-large-cnn",
		name: "@cf/facebook/bart-large-cnn",
		deprecationDate: "2026-05-30",
		status: "planned-deprecation",
	},
];

export function getDeprecatedModelInfoByName(
	name: string,
): DeprecatedModelInfo | undefined {
	return DEPRECATED_MODELS.find((m) => m.name === name);
}
