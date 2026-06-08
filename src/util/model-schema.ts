/**
 * Schema utilities for Workers AI models.
 * Extracted here so they can be shared between model-resolver.ts (build-time)
 * and the static JSON endpoint pages without circular imports.
 */

import type { ApiMode } from "./model-types";

/**
 * Detect and split a model's schema into logical API modes.
 * Handles common patterns like:
 * - Sync vs Batch (anyOf with requests array)
 * - Prompt vs Messages input formats
 * - JSON vs Streaming output
 *
 * Returns undefined when the schema has no meaningful splits (flat schema).
 */
export function detectApiModes(schema: {
	input: Record<string, unknown>;
	output: Record<string, unknown>;
}): ApiMode[] | undefined {
	const { input, output } = schema;
	const modes: ApiMode[] = [];

	// Check for anyOf/oneOf at the input level
	const inputVariants =
		(input.anyOf as Record<string, unknown>[]) ||
		(input.oneOf as Record<string, unknown>[]);

	// Check for anyOf/oneOf at the output level
	const outputVariants =
		(output.anyOf as Record<string, unknown>[]) ||
		(output.oneOf as Record<string, unknown>[]);

	if (!inputVariants || inputVariants.length === 0) {
		// No variants to split - return undefined to use combined schema
		return undefined;
	}

	// Find batch input (has "requests" property)
	const batchInputIndex = inputVariants.findIndex((v) => {
		const props = v.properties as Record<string, unknown> | undefined;
		return props && "requests" in props;
	});

	// Find sync input (not batch)
	const syncInputIndex = inputVariants.findIndex(
		(_, i) => i !== batchInputIndex,
	);

	// Find JSON output (contentType: application/json or has properties)
	const jsonOutputIndex =
		outputVariants?.findIndex((v) => {
			return (
				v.contentType === "application/json" ||
				(v.type === "object" && v.properties)
			);
		}) ?? -1;

	// Find streaming output (type: string, or format: binary for SSE)
	const streamOutputIndex =
		outputVariants?.findIndex((v) => {
			return v.type === "string" || v.format === "binary";
		}) ?? -1;

	// Build sync mode
	if (syncInputIndex !== -1) {
		const syncInput = inputVariants[syncInputIndex];
		const syncOutput =
			jsonOutputIndex !== -1 && outputVariants
				? outputVariants[jsonOutputIndex]
				: output;

		modes.push({
			id: "sync",
			name: "Synchronous",
			description: "Send a request and receive a complete response",
			input: syncInput,
			output: syncOutput,
		});

		// Build streaming mode (same input as sync, different output)
		if (streamOutputIndex !== -1 && outputVariants) {
			modes.push({
				id: "streaming",
				name: "Streaming",
				description:
					"Send a request with `stream: true` and receive server-sent events",
				input: syncInput,
				output: outputVariants[streamOutputIndex],
			});
		}
	}

	// Build batch mode
	if (batchInputIndex !== -1) {
		const batchInput = inputVariants[batchInputIndex];
		// Batch typically uses the same JSON output format
		const batchOutput =
			jsonOutputIndex !== -1 && outputVariants
				? outputVariants[jsonOutputIndex]
				: output;

		modes.push({
			id: "batch",
			name: "Batch",
			description: "Send multiple requests in a single API call",
			input: batchInput,
			output: batchOutput,
		});
	}

	// Only return modes if we found meaningful splits
	return modes.length > 1 ? modes : undefined;
}
