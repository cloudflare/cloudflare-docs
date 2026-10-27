import { createHarness, type JsonValue } from "vitest-evals";

export interface ClefHarnessOptions {
	baseUrl: string;
	kind: "item" | "comment";
	token?: string;
}

/** POSTs the input to the Clef eval route and returns the verdict as output. */
export function createClefHarness<TInput = unknown>(
	options: ClefHarnessOptions,
) {
	return createHarness<TInput, JsonValue>({
		name: `clef-${options.kind}`,
		run: async ({ input, signal }) => {
			const base = options.baseUrl.replace(/\/+$/, "");
			const response = await fetch(`${base}/eval/clef/${options.kind}`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					...(options.token ? { "x-dev-secret": options.token } : {}),
				},
				body: JSON.stringify(input),
				signal,
			});
			if (!response.ok) {
				const body = await response.text().catch(() => "");
				throw new Error(
					`Clef eval failed: ${response.status} ${response.statusText}${body ? ` — ${body}` : ""}`,
				);
			}
			const output = (await response.json()) as JsonValue;
			// vitest-evals needs at least one transcript event per run.
			return {
				output,
				events: [
					{
						type: "message",
						role: "user",
						content: JSON.stringify(input),
					},
					{
						type: "message",
						role: "assistant",
						content: JSON.stringify(output),
					},
				],
			};
		},
	});
}
