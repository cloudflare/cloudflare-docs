import { existsSync, readFileSync } from "node:fs";

import * as core from "@actions/core";

interface LinkValidationReport {
	errorCount: number;
	errorFileCount: number;
}

async function run(): Promise<void> {
	const reportPath =
		process.env.REPORT_PATH ?? ".starlight-links-validator/errors.json";

	if (!existsSync(reportPath)) {
		core.info("No broken links found.");
		return;
	}

	let report: LinkValidationReport;
	try {
		report = JSON.parse(readFileSync(reportPath, "utf8"));
	} catch {
		core.setFailed(`Could not read report at ${reportPath}`);
		process.exit();
	}

	core.setFailed(
		`Found ${report.errorCount} broken link(s) across ${report.errorFileCount} file(s).`,
	);
}

run();
