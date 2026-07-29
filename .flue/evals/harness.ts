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

interface TextPart {
	type: "text";
	text: string;
}

interface DataPart {
	type: `data-${string}`;
	data: unknown;
}

interface ToolPart {
	type: "dynamic-tool";
	toolName: string;
	toolCallId: string;
	input?: unknown;
	output?: unknown;
	errorText?: string;
	state: string;
}

type ConversationPart = TextPart | DataPart | ToolPart;

interface ConversationMessage {
	id: string;
	role: "user" | "assistant" | "system";
	parts: ConversationPart[];
	metadata?: Record<string, unknown>;
}

interface ConversationHistory {
	messages: ConversationMessage[];
	settlements: Array<{ submissionId: string; outcome: string }>;
}

function isTerminalSettlement(s: { outcome: string }): boolean {
	return (
		s.outcome === "completed" ||
		s.outcome === "failed" ||
		s.outcome === "aborted"
	);
}

function isTextPart(p: ConversationPart): p is TextPart {
	return p.type === "text";
}

function isToolPart(p: ConversationPart): p is ToolPart {
	return p.type === "dynamic-tool";
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
			.filter(isTextPart)
			.map((p) => p.text)
			.join("");
		if (text) {
			events.push({
				type: "message",
				role: msg.role,
				content: text,
			});
		}
		for (const part of msg.parts) {
			if (!isToolPart(part)) continue;
			events.push({
				type: "tool_call",
				id: part.toolCallId,
				name: part.toolName,
				arguments: part.input as Record<string, JsonValue> | undefined,
			});
			if (part.state === "output-error") {
				events.push({
					type: "tool_result",
					toolCallId: part.toolCallId,
					name: part.toolName,
					error: { message: part.errorText ?? "unknown error" },
				});
			} else if (part.state === "output-available") {
				events.push({
					type: "tool_result",
					toolCallId: part.toolCallId,
					name: part.toolName,
					content: part.output as JsonValue,
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
			const base = options.baseUrl.replace(/\/+$/, "");
			const agentPath = encodeURIComponent(options.agentName);
			const conversationUrl = `${base}/eval/agents/${agentPath}/${conversationId}`;
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
			let terminal: { submissionId: string; outcome: string } | undefined;
			let lastHistoryError: string | undefined;
			while (Date.now() < deadline) {
				if (signal?.aborted) throw new Error("Aborted");

				const historyResponse = await fetch(`${conversationUrl}?view=history`, {
					headers,
					signal,
				});

				if (historyResponse.ok) {
					history = (await historyResponse.json()) as ConversationHistory;
					terminal = history.settlements.findLast(isTerminalSettlement);
					if (terminal) break;
				} else {
					lastHistoryError = `${historyResponse.status} ${historyResponse.statusText}`;
				}

				await new Promise((r) => setTimeout(r, 1000));
			}

			if (!history) {
				throw new Error(
					`Timed out waiting for agent to settle${lastHistoryError ? ` (last history fetch error: ${lastHistoryError})` : ""}`,
				);
			}

			if (!terminal) {
				throw new Error(
					`Timed out waiting for agent to settle (last outcome: ${history.settlements.at(-1)?.outcome ?? "none"})`,
				);
			}
			if (terminal.outcome === "failed") {
				throw new Error("Agent run failed");
			}
			if (terminal.outcome === "aborted") {
				throw new Error("Agent run was aborted");
			}

			const reply = history.messages.findLast((m) => m.role === "assistant");

			const dataPart = reply?.parts.find(
				(p) => p.type === `data-${options.dataKey}`,
			) as DataPart | undefined;

			return {
				output: (dataPart?.data ?? undefined) as JsonValue | undefined,
				events: toTranscriptEvents(history.messages),
			};
		},
	});
}
