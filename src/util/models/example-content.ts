/**
 * Pulls the human-readable parts out of a catalog example so the page can show
 * what went in (the user's prompt and images) and what came out (a tool call or
 * a runnable HTML document) instead of only the request code and raw JSON.
 */

export interface ExampleInputParts {
	prompt?: string;
	imageUrls: string[];
}

export interface LayerView {
	id: string;
	type: string;
	subtype?: string;
	text?: string;
	imageUrl?: string;
	font?: string;
	color?: string;
}

export interface ToolCallView {
	name: string;
	args: string;
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
	typeof v === "object" && v !== null && !Array.isArray(v);

const isHttpsUrl = (v: unknown): v is string =>
	typeof v === "string" && /^https:\/\//.test(v);

// Request fields that carry input images on non-chat (image, video, document)
// models, in the order providers commonly use them.
const IMAGE_INPUT_FIELDS = [
	"image",
	"images",
	"image_url",
	"image_urls",
	"input_image",
	"reference_images",
] as const;

/**
 * The prompt and input image URLs of an example request. Chat-style inputs use
 * the last user message; other inputs use a top-level `prompt` and any of the
 * common image fields. Only `https://` images are returned.
 */
export function getInputParts(input: unknown): ExampleInputParts {
	const empty: ExampleInputParts = { imageUrls: [] };
	if (!isRecord(input)) return empty;
	if (Array.isArray(input.messages)) return getChatInputParts(input.messages);

	const imageUrls = IMAGE_INPUT_FIELDS.flatMap((field) => {
		const value = input[field];
		return (Array.isArray(value) ? value : [value]).filter(isHttpsUrl);
	});
	const prompt =
		typeof input.prompt === "string" && input.prompt.trim()
			? input.prompt
			: undefined;
	return { prompt, imageUrls };
}

function getChatInputParts(messages: unknown[]): ExampleInputParts {
	const empty: ExampleInputParts = { imageUrls: [] };
	const user = [...messages]
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
			isHttpsUrl(part.image_url.url)
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

/**
 * Layers of a layered design document (for example Bria Ad Delayer output),
 * in paint order. Hidden layers and layers with nothing to show are skipped.
 */
export function getDocumentLayers(
	output: Record<string, unknown> | undefined,
): LayerView[] {
	const doc = output?.document;
	if (!isRecord(doc) || !Array.isArray(doc.layers)) return [];
	return doc.layers
		.filter((l): l is Record<string, unknown> => isRecord(l) && !l.hidden)
		.sort((a, b) => Number(a.z_order ?? 0) - Number(b.z_order ?? 0))
		.flatMap((l) => {
			const text = typeof l.text === "string" ? l.text : undefined;
			const imageUrl = isHttpsUrl(l.asset_path) ? l.asset_path : undefined;
			if (!text && !imageUrl) return [];
			const style = isRecord(l.text_style) ? l.text_style : {};
			const family =
				typeof style.font_family === "string"
					? style.font_family.split(",")[0]
					: undefined;
			const font = family
				? [
						family,
						style.font_weight,
						style.font_size_px && `${style.font_size_px}px`,
					]
						.filter(Boolean)
						.join(" ")
				: undefined;
			return [
				{
					id: String(l.id ?? ""),
					type: String(l.type ?? ""),
					subtype: typeof l.subtype === "string" ? l.subtype : undefined,
					text,
					imageUrl,
					font,
					color: typeof style.color === "string" ? style.color : undefined,
				},
			];
		});
}
