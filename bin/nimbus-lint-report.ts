/**
 * Reports `nimbus-docs lint --format json` output and gates the CI step:
 *   - findings in the log, grouped by rule
 *   - `::error` annotations (GitHub shows at most 10 per step)
 *   - per-rule counts in the GitHub step summary
 *
 * Exits 1 if lint failed or reported errors.
 *
 * Usage: LINT_EXIT_CODE=<code> tsx bin/nimbus-lint-report.ts <lint.json>
 */
import { appendFileSync, readFileSync } from "node:fs";

interface Diagnostic {
	code: string;
	severity: "error" | "warn" | "warning" | "info";
	message: string;
	file: string;
	line: number;
	column: number;
	endLine?: number;
	endColumn?: number;
}

interface LintOutput {
	summary: { errors: number; warnings: number; total: number; files: number };
	diagnostics: Diagnostic[];
}

const [inputPath] = process.argv.slice(2);
if (!inputPath) {
	console.error("Usage: tsx bin/nimbus-lint-report.ts <lint.json>");
	process.exit(2);
}

const lintExitCode = process.env.LINT_EXIT_CODE ?? "0";

// Workflow command escaping: https://docs.github.com/en/actions/reference/workflow-commands-for-github-actions
const escapeData = (s: string) =>
	s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
const escapeProperty = (s: string) =>
	escapeData(s).replace(/:/g, "%3A").replace(/,/g, "%2C");

const raw = readFileSync(inputPath, "utf-8");
let output: LintOutput;
try {
	output = JSON.parse(raw);
} catch {
	// Lint crashed before producing JSON, so show whatever it wrote.
	console.log(raw);
	console.log(
		`::error::nimbus-docs lint exited with code ${lintExitCode} and did not produce valid JSON.`,
	);
	process.exit(1);
}

const { diagnostics, summary } = output;

const byRule = new Map<string, Diagnostic[]>();
for (const d of diagnostics) {
	byRule.set(d.code, [...(byRule.get(d.code) ?? []), d]);
}

for (const [code, items] of byRule) {
	console.log(`::group::${code} (${items.length})`);
	for (const d of items) {
		console.log(`${d.file}:${d.line}:${d.column} ${d.severity} ${d.message}`);
	}
	console.log("::endgroup::");
}

// GitHub shows only the first 10 annotations per step; the log has the rest.
for (const d of diagnostics) {
	const level = d.severity === "error" ? "error" : "warning";
	console.log(
		`::${level} file=${escapeProperty(d.file)},line=${d.line},col=${d.column},title=${escapeProperty(d.code)}::${escapeData(d.message)}`,
	);
}

console.log(
	`\n${summary.errors} errors, ${summary.warnings} warnings in ${summary.files} files`,
);

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (summaryPath) {
	const rows = [...byRule.entries()]
		.sort((a, b) => b[1].length - a[1].length)
		.map(([code, items]) => `| \`${code}\` | ${items.length} |`);
	appendFileSync(
		summaryPath,
		[
			"### Nimbus lint",
			"",
			`${summary.errors} errors, ${summary.warnings} warnings in ${summary.files} files`,
			"",
			"| Rule | Findings |",
			"| --- | --- |",
			...(rows.length ? rows : ["| none | 0 |"]),
			"",
		].join("\n"),
	);
}

if (lintExitCode !== "0" || summary.errors > 0) {
	console.log(
		`::error::nimbus-docs lint found ${summary.errors} errors (exit code ${lintExitCode}). See the grouped log and job summary.`,
	);
	process.exit(1);
}
