// Label formatting utilities

export function formatLabel(option: any): string {
	// Check for async formats first (before any title processing)
	if (option.properties) {
		// Async batch format (has requests array)
		if (option.properties.requests) {
			return 'Async Batch';
		}
		// Async response format (has request_id for outputs)
		if (
			option.properties.request_id &&
			option.title &&
			option.title.toLowerCase().includes('async')
		) {
			return 'Async Batch';
		}
	}

	// Try to use the title first
	if (option.title) {
		// Special case for GPT_OSS models - always show "Responses"
		if (option.title.toLowerCase().includes('gpt_oss')) {
			return 'Responses';
		}

		let label = option.title;

		// If title contains spaces, it's likely already human-readable
		if (label.includes(' ')) {
			// Remove "Response" suffix if present (e.g., "Chat Completion Response" -> "Chat Completion")
			label = label.replace(/\s+Response$/i, '');

			// Fix common typos
			label = label.replace(/\bOuput\b/g, 'Output');

			// Remove model-specific prefix (e.g., "BGE M3 Input Query and Contexts" -> "Query and Contexts")
			// Match patterns like "Model Name Input/Output ..." and extract the rest
			label = label.replace(/^[A-Z0-9\s]+\s+(Input|Output|Ouput)\s+/i, '');

			return label;
		}

		// Remove model-specific prefixes by taking only the last part after the last known format keyword
		// Examples:
		// "Ai_Cf_Meta_Llama_4_Prompt" -> "Prompt"
		// "GPT_OSS_120B_Responses" -> "Responses"
		// "Ai_Cf_Meta_Llama_4_Messages" -> "Messages"

		const parts = label.split('_');

		// Common format keywords that indicate where the actual format name starts
		// Order matters: Messages should be checked before Prompt
		const formatKeywords = ['Messages', 'Prompt', 'Async', 'Responses', 'Batch', 'Inner'];

		// Find the first occurrence of a format keyword
		let startIndex = parts.findIndex((part: string) =>
			formatKeywords.some((keyword) => part.toLowerCase() === keyword.toLowerCase())
		);

		// If no keyword found, just take the last 1-2 parts
		if (startIndex === -1) {
			startIndex = Math.max(0, parts.length - 2);
		}

		// Get the relevant parts and convert to Title Case
		const relevantParts = parts.slice(startIndex);
		return relevantParts
			.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
	}

	// Use contentType if available
	if (option.contentType) {
		if (option.contentType === 'application/json') {
			return 'JSON';
		} else if (option.contentType === 'text/event-stream') {
			return 'Streaming';
		}
	}

	// Infer from structure only when we have clear indicators
	if (option.type === 'string' && option.format === 'binary') {
		return 'Binary';
	}

	if (option.type === 'object') {
		return 'JSON';
	}

	return 'Format';
}

// Sorting priority for formats
export function getFormatPriority(title: string, label: string, type: 'input' | 'output'): number {
	const lowerTitle = title.toLowerCase();
	const lowerLabel = label.toLowerCase();

	if (type === 'output') {
		// Output priority: Chat Completion, Text Completion, Streaming, others, then Async last
		if (lowerTitle.includes('chat completion')) return 1;
		if (lowerTitle.includes('text completion')) return 2;
		if (lowerTitle.includes('stream')) return 3;
		if (lowerTitle.includes('async') || lowerLabel.includes('async')) return 99;
		return 5;
	} else {
		// Input priority: JSON, Embedding, Query and Contexts, Messages, Prompt, Responses, Binary, Async Batch
		if (lowerLabel === 'json') return 1;
		if (lowerLabel.includes('embedding')) return 2;
		if (lowerLabel.includes('query') || lowerLabel.includes('context')) return 3;
		if (lowerTitle.includes('messages')) return 4;
		if (lowerTitle.includes('prompt')) return 5;
		if (lowerTitle.includes('responses')) return 6;
		if (lowerLabel === 'binary') return 8;
		if (lowerTitle.includes('async') || lowerTitle.includes('batch')) return 9;
		return 7;
	}
}
