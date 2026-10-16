/**
 * Pulls the human-readable parts out of a catalog example so the page can show
 * what went in (the user's prompt and images) and what came out (a tool call or
 * a runnable HTML document) instead of only the request code and raw JSON.
 */

export interface ExampleInputParts {
	prompt?: string;
	imageUrls: string[];
}

export interface ToolCallView {
	name: string;
	args: string;
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
	typeof v === "object" && v !== null && !Array.isArray(v);

/** The last user message's text and image URLs from a chat-style input. */
export function getInputParts(input: unknown): ExampleInputParts {
	const empty: ExampleInputParts = { imageUrls: [] };
	if (!isRecord(input) || !Array.isArray(input.messages)) return empty;
	const user = [...input.messages]
		.reverse()
		.find((m) => isRecord(m) && m.role === "user");
	if (!isRecord(user)) return empty;

	if (typeof user.content === "string")
		return { prompt: user.content, imageUrls: [] };
	if (!Array.isArray(user.content)) return empty;

	const texts: string[] = [];
	const imageUrls: string[] = [];
	for (const part of user.content) {
		if (!isRecord(part)) continue;
		if (part.type === "text" && typeof part.text === "string")
			texts.push(part.text);
		if (
			part.type === "image_url" &&
			isRecord(part.image_url) &&
			typeof part.image_url.url === "string" &&
			/^https:\/\//.test(part.image_url.url)
		) {
			imageUrls.push(part.image_url.url);
		}
	}
	return { prompt: texts.join("\n\n") || undefined, imageUrls };
}

/** OpenAI-style tool calls rendered as `name` plus pretty-printed arguments. */
export function getToolCalls(
	output: Record<string, unknown> | undefined,
): ToolCallView[] {
	const calls = output?.tool_calls;
	if (!Array.isArray(calls)) return [];
	return calls.flatMap((call) => {
		if (!isRecord(call) || !isRecord(call.function)) return [];
		const { name, arguments: rawArgs } = call.function;
		if (typeof name !== "string") return [];
		let args =
			typeof rawArgs === "string" ? rawArgs : JSON.stringify(rawArgs ?? {});
		try {
			args = JSON.stringify(JSON.parse(args), null, 2);
		} catch {
			// Keep the provider's string as-is when it isn't valid JSON.
		}
		return [{ name, args }];
	});
}

/**
 * A complete HTML document returned in a fenced ```html block, for the live
 * preview. Returns undefined for snippets that aren't a full page.
 */
export function getHtmlDocument(text: string | undefined): string | undefined {
	if (!text) return undefined;
	const match = text.match(/```html\s*\n([\s\S]*?)```/i);
	const doc = match?.[1]?.trim();
	if (!doc || !/<html[\s>]/i.test(doc)) return undefined;
	return doc;
}
