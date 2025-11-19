// Label formatting utilities
import type { Schema } from "./schema-formats";

export function formatLabel(option: Schema): string {
	// Check async formats
	if (option.properties?.requests) return "Async Batch";
	if (
		option.properties?.request_id &&
		option.title?.toLowerCase().includes("async")
	) {
		return "Async Batch";
	}

	// Handle title-based labels
	if (option.title) {
		const lower = option.title.toLowerCase();
		if (lower.includes("gpt_oss")) return "Responses";

		let label = option.title
			.replace(/\s+Response$/i, "")
			.replace(/\bOuput\b/g, "Output")
			.replace(/^[A-Z0-9\s]+\s+(Input|Output)\s+/i, "");

		if (label.includes(" ")) return label;

		// Handle underscore-separated titles
		const parts = label.split("_");
		const keywords = [
			"Messages",
			"Prompt",
			"Async",
			"Responses",
			"Batch",
			"Inner",
		];
		const idx = parts.findIndex((p) =>
			keywords.some((k) => k.toLowerCase() === p.toLowerCase()),
		);
		const start = idx === -1 ? Math.max(0, parts.length - 2) : idx;

		return parts
			.slice(start)
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
			.join(" ");
	}

	// Fallback to contentType or structure
	if (option.contentType === "application/json") return "JSON";
	if (option.contentType === "text/event-stream") return "Streaming";
	if (option.type === "string" && option.format === "binary") return "Binary";
	if (option.type === "object") return "JSON";

	return "Format";
}

// Sorting priority for formats
export function getFormatPriority(
	title: string,
	label: string,
	type: "input" | "output",
): number {
	const lowerTitle = title.toLowerCase();
	const lowerLabel = label.toLowerCase();

	if (type === "output") {
		// Output priority: Chat Completion, Text Completion, Streaming, others, then Async last
		if (lowerTitle.includes("chat completion")) return 1;
		if (lowerTitle.includes("text completion")) return 2;
		if (lowerTitle.includes("stream")) return 3;
		if (lowerTitle.includes("async") || lowerLabel.includes("async")) return 99;
		return 5;
	} else {
		// Input priority: JSON, Embedding, Query and Contexts, Messages, Prompt, Responses, Binary, Async Batch
		if (lowerLabel === "json") return 1;
		if (lowerLabel.includes("embedding")) return 2;
		if (lowerLabel.includes("query") || lowerLabel.includes("context"))
			return 3;
		if (lowerTitle.includes("messages")) return 4;
		if (lowerTitle.includes("prompt")) return 5;
		if (lowerTitle.includes("responses")) return 6;
		if (lowerLabel === "binary") return 8;
		if (lowerTitle.includes("async") || lowerTitle.includes("batch")) return 9;
		return 7;
	}
}
