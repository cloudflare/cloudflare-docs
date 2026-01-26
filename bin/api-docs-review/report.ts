import { COMMENT_IDENTIFIER } from "./constants";
import type { FileReviewResult, ReviewReport } from "./types";

/**
 * Generates a markdown report from the review results
 */
export function generateReport(report: ReviewReport): string {
	const lines: string[] = [
		COMMENT_IDENTIFIER,
		"## API Documentation Review",
		"",
	];

	if (report.totalWithSchemaEndpoint === 0) {
		// This shouldn't happen since we only post when there are findings,
		// but handle it gracefully
		lines.push("No issues found.");
		return lines.join("\n");
	}

	lines.push(
		`Found **${report.totalWithSchemaEndpoint}** manual curl example${report.totalWithSchemaEndpoint === 1 ? "" : "s"} that can be replaced with the \`<APIRequest>\` component.`,
		"",
	);

	for (const file of report.files) {
		const relevantCommands = file.curlCommands.filter(
			(cmd) => cmd.hasSchemaEndpoint,
		);
		if (relevantCommands.length === 0) continue;

		lines.push(`### ${file.relativePath}`);
		lines.push("");

		for (const cmd of relevantCommands) {
			lines.push(
				`- **Line ${cmd.line}**: \`${cmd.method}\` request to \`${cmd.path}\``,
			);
			lines.push(
				`  - This endpoint exists in the [API schema](https://developers.cloudflare.com/api/). Consider replacing with:`,
			);
			lines.push("  ```jsx");
			lines.push(`  <APIRequest path="${cmd.path}" method="${cmd.method}" />`);
			lines.push("  ```");
			lines.push("");
		}
	}

	lines.push("---");
	lines.push(
		"*Using `<APIRequest>` provides automatic schema validation, consistent formatting, and keeps examples up-to-date. See the [style guide](https://developers.cloudflare.com/style-guide/components/api-request/) for details.*",
	);

	return lines.join("\n");
}

/**
 * Aggregates multiple file results into a single report
 */
export function aggregateResults(
	fileResults: FileReviewResult[],
): ReviewReport {
	const totalCurlCommands = fileResults.reduce(
		(sum, f) => sum + f.curlCommands.length,
		0,
	);

	const totalWithSchemaEndpoint = fileResults.reduce(
		(sum, f) => sum + f.curlCommands.filter((c) => c.hasSchemaEndpoint).length,
		0,
	);

	return {
		files: fileResults,
		totalCurlCommands,
		totalWithSchemaEndpoint,
	};
}
