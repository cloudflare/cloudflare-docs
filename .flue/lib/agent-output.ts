import {
	defineTool,
	useAgentFinish,
	useDataWriter,
	useTool,
	type ToolInputSchema,
} from "@flue/runtime";
import * as v from "valibot";

/** One shared structured-output contract for every reasoning agent. */
export function useResult<T extends ToolInputSchema>(
	name: string,
	schema: T,
	validate?: (data: v.InferOutput<T>) => void,
): void {
	const write = useDataWriter(name, { schema });
	useTool(
		defineTool({
			name: `submit_${name}`,
			description:
				"Submit the final structured result. Submit once, including an empty findings array when no issues were found.",
			input: schema,
			run: ({ data }) => {
				if (new TextEncoder().encode(JSON.stringify(data)).byteLength > 350_000)
					throw new Error(
						"Result too large for a durable checkpoint; make the findings more concise.",
					);
				validate?.(data);
				write(data);
				return "Result recorded.";
			},
		}),
	);
	useAgentFinish(({ response, append }) => {
		if (
			!response.toolCalls.some(
				(call) => call.tool === `submit_${name}` && !call.isError,
			)
		) {
			append({
				kind: "signal",
				type: "result-required",
				body: `Call submit_${name} with the completed result.`,
			});
		}
	});
}
