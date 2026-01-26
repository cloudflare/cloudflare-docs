import { COMMENT_IDENTIFIER, COMMENT_PREFIX } from "./constants";
import type { FileReviewResult, ReviewReport } from "./types";

/**
 * Generates a markdown report from the review results
 */
export function generateReport(report: ReviewReport): string {
	const lines: string[] = [
		COMMENT_IDENTIFIER,
		COMMENT_PREFIX,
		"",
		`> Automated review of API documentation in changed files.`,
		"",
	];

	// Overall summary
	lines.push("### Summary");
	lines.push("");
	lines.push(
		`| Metric | Value |`,
		`| ------ | ----- |`,
		`| Files reviewed | ${report.summary.totalFiles} |`,
		`| Total errors | ${report.summary.totalErrors} |`,
		`| Total warnings | ${report.summary.totalWarnings} |`,
		`| Total suggestions | ${report.summary.totalSuggestions} |`,
		`| Average score | ${report.summary.averageScore.toFixed(0)}/100 |`,
	);
	lines.push("");

	// API Coverage summary
	if (report.summary.totalActionsFound > 0) {
		const coveragePercent =
			(report.summary.totalActionsWithApi / report.summary.totalActionsFound) *
			100;
		lines.push("### API Coverage");
		lines.push("");
		lines.push(
			`| Metric | Value |`,
			`| ------ | ----- |`,
			`| Actions identified | ${report.summary.totalActionsFound} |`,
			`| Actions with API examples | ${report.summary.totalActionsWithApi} (${coveragePercent.toFixed(0)}%) |`,
			`| Actions missing API examples | ${report.summary.totalActionsMissingApi} |`,
		);
		lines.push("");
	}

	// If no issues at all, show success message
	if (
		report.summary.totalErrors === 0 &&
		report.summary.totalWarnings === 0 &&
		report.summary.totalSuggestions === 0
	) {
		lines.push("### Result");
		lines.push("");
		lines.push("No API documentation issues found in the changed files.");
		lines.push("");
		return lines.join("\n");
	}

	// Per-file details
	lines.push("### Details");
	lines.push("");

	for (const file of report.files) {
		if (file.issues.length === 0) continue;

		lines.push(`<details>`);
		lines.push(
			`<summary><strong>${file.relativePath}</strong> (Score: ${file.score}/100)</summary>`,
		);
		lines.push("");

		// Group issues by severity
		const errors = file.issues.filter((i) => i.severity === "error");
		const warnings = file.issues.filter((i) => i.severity === "warning");
		const suggestions = file.issues.filter((i) => i.severity === "suggestion");

		if (errors.length > 0) {
			lines.push("**Errors:**");
			for (const issue of errors) {
				const lineInfo = issue.line ? ` (line ${issue.line})` : "";
				lines.push(`- ${issue.message}${lineInfo}`);
				if (issue.suggestion) {
					lines.push(`  - Suggestion: ${issue.suggestion}`);
				}
			}
			lines.push("");
		}

		if (warnings.length > 0) {
			lines.push("**Warnings:**");
			for (const issue of warnings) {
				const lineInfo = issue.line ? ` (line ${issue.line})` : "";
				lines.push(`- ${issue.message}${lineInfo}`);
				if (issue.suggestion) {
					lines.push(`  - Suggestion: ${issue.suggestion}`);
				}
			}
			lines.push("");
		}

		if (suggestions.length > 0) {
			lines.push("**Suggestions:**");
			for (const issue of suggestions) {
				const lineInfo = issue.line ? ` (line ${issue.line})` : "";
				lines.push(`- ${issue.message}${lineInfo}`);
				if (issue.suggestion) {
					lines.push(`  - ${issue.suggestion}`);
				}
			}
			lines.push("");
		}

		lines.push("</details>");
		lines.push("");
	}

	// Footer with help link
	lines.push("---");
	lines.push(
		"*This review was generated automatically. For more information, see the [API documentation style guide](https://developers.cloudflare.com/style-guide/api-content-strategy/).*",
	);

	return lines.join("\n");
}

/**
 * Aggregates multiple file results into a single report
 */
export function aggregateResults(
	fileResults: FileReviewResult[],
): ReviewReport {
	const totalErrors = fileResults.reduce(
		(sum, f) => sum + f.issues.filter((i) => i.severity === "error").length,
		0,
	);
	const totalWarnings = fileResults.reduce(
		(sum, f) => sum + f.issues.filter((i) => i.severity === "warning").length,
		0,
	);
	const totalSuggestions = fileResults.reduce(
		(sum, f) =>
			sum + f.issues.filter((i) => i.severity === "suggestion").length,
		0,
	);
	const averageScore =
		fileResults.length > 0
			? fileResults.reduce((sum, f) => sum + f.score, 0) / fileResults.length
			: 100;

	const totalActionsFound = fileResults.reduce(
		(sum, f) => sum + f.summary.actionsFound,
		0,
	);
	const totalActionsWithApi = fileResults.reduce(
		(sum, f) => sum + f.summary.actionsWithApi,
		0,
	);
	const totalActionsMissingApi = fileResults.reduce(
		(sum, f) =>
			sum +
			f.summary.actionsMissingApiAvailable +
			f.summary.actionsMissingApiUnavailable,
		0,
	);

	return {
		files: fileResults,
		summary: {
			totalFiles: fileResults.length,
			totalErrors,
			totalWarnings,
			totalSuggestions,
			averageScore,
			totalActionsFound,
			totalActionsWithApi,
			totalActionsMissingApi,
		},
	};
}
