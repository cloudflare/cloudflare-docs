import {
	createHarness,
	type JsonValue,
	type TranscriptEvent,
} from "vitest-evals";

export interface FlueAgentHarnessOptions {
	baseUrl: string;
	agentName: string;
	dataKey: string;
	message: string;
	token?: string;
	headers?: Record<string, string>;
}

interface ConversationMessage {
	id: string;
	role: "user" | "assistant" | "system";
	parts: Array<
		| { type: "text"; text: string }
		| { type: `data-${string}`; data: unknown }
		| {
				type: "dynamic-tool";
				toolName: string;
				toolCallId: string;
				input?: unknown;
				output?: unknown;
				errorText?: string;
				state: string;
		  }
	>;
	metadata?: Record<string, unknown>;
}

interface ConversationHistory {
	messages: ConversationMessage[];
	settlements: Array<{ submissionId: string; outcome: string }>;
}

function authHeaders(options: FlueAgentHarnessOptions): Record<string, string> {
	return {
		"content-type": "application/json",
		...(options.token ? { "x-dev-secret": options.token } : {}),
		...options.headers,
	};
}

function toTranscriptEvents(
	messages: ConversationMessage[],
): TranscriptEvent[] {
	const events: TranscriptEvent[] = [];
	for (const msg of messages) {
		const text = msg.parts
			.filter((p) => p.type === "text")
			.map((p) => (p as { type: "text"; text: string }).text)
			.join("");
		if (text) {
			events.push({
				type: "message",
				role: msg.role as "user" | "assistant" | "system",
				content: text,
			});
		}
		for (const part of msg.parts) {
			if (part.type !== "dynamic-tool") continue;
			const tool = part as Extract<
				ConversationMessage["parts"][number],
				{ type: "dynamic-tool" }
			>;
			events.push({
				type: "tool_call",
				id: tool.toolCallId,
				name: tool.toolName,
				arguments: tool.input as Record<string, JsonValue> | undefined,
			});
			if (tool.state === "output-error") {
				events.push({
					type: "tool_result",
					toolCallId: tool.toolCallId,
					name: tool.toolName,
					error: { message: tool.errorText ?? "unknown error" },
				});
			} else if (tool.state === "output-available") {
				events.push({
					type: "tool_result",
					toolCallId: tool.toolCallId,
					name: tool.toolName,
					content: tool.output as JsonValue,
				});
			}
		}
	}
	return events;
}

export function createFlueAgentHarness<TInput = unknown>(
	options: FlueAgentHarnessOptions,
) {
	return createHarness<TInput, JsonValue | undefined>({
		name: `flue-${options.agentName}`,
		run: async ({ input, signal }) => {
			const conversationId = `eval-${crypto.randomUUID()}`;
			const base = `${options.baseUrl}/eval/agents/${options.agentName}`;
			const conversationUrl = `${base}/${conversationId}`;
			const headers = authHeaders(options);

			// Fire-and-forget: POST without ?wait=result
			const sendResponse = await fetch(conversationUrl, {
				method: "POST",
				headers,
				body: JSON.stringify({
					kind: "user",
					body: options.message,
					initialData: input,
				}),
				signal,
			});

			if (!sendResponse.ok) {
				const body = await sendResponse.text().catch(() => "");
				throw new Error(
					`Agent send failed: ${sendResponse.status} ${sendResponse.statusText}${body ? ` — ${body}` : ""}`,
				);
			}

			// Poll history until the submission settles
			const deadline = Date.now() + 120_000;
			let history: ConversationHistory | undefined;
			while (Date.now() < deadline) {
				if (signal?.aborted) throw new Error("Aborted");

				const historyResponse = await fetch(`${conversationUrl}?view=history`, {
					headers,
					signal,
				});

				if (historyResponse.ok) {
					history = (await historyResponse.json()) as ConversationHistory;
					const settled = history.settlements.some(
						(s) =>
							s.outcome === "completed" ||
							s.outcome === "failed" ||
							s.outcome === "aborted",
					);
					if (settled) break;
				}

				await new Promise((r) => setTimeout(r, 1000));
			}

			if (!history) {
				throw new Error("Timed out waiting for agent to settle");
			}

			const reply = history.messages.findLast((m) => m.role === "assistant");

			const dataPart = reply?.parts.find(
				(p) => p.type === `data-${options.dataKey}`,
			) as { type: string; data: unknown } | undefined;

			return {
				output: (dataPart?.data ?? undefined) as JsonValue | undefined,
				events: toTranscriptEvents(history.messages),
			};
		},
	});
}
