import {
	defineTool,
	useAgentFinish,
	useDataWriter,
	useTool,
} from "@flue/runtime";
import * as v from "valibot";

/**
 * Give an agent one structured-result tool and keep it responding until that
 * tool succeeds. `terminate` avoids an unnecessary model turn after success.
 */
export function useSubmitResult<
	TSchema extends v.GenericSchema<Record<string, unknown>, unknown>,
>(
	dataName: string,
	toolName: string,
	schema: TSchema,
	description: string,
): void {
	const writeResult = useDataWriter(dataName, { schema });

	useTool(
		defineTool({
			name: toolName,
			description,
			input: schema,
			run: ({ data }) => {
				writeResult(data);
				return { output: "Result recorded.", terminate: true };
			},
		}),
	);

	useAgentFinish(({ response, append }) => {
		const submissions = response.toolCalls.filter(
			(call) => call.tool === toolName,
		);
		if (submissions.some((call) => !call.isError)) return;
		append({
			kind: "signal",
			type: "reminder",
			body: submissions.some((call) => call.isError)
				? `Your last call to ${toolName} was invalid. Fix the data and call it again.`
				: `You ended without calling ${toolName}. Call it now to record your result.`,
		});
	});
}
