import type { PatchFile, ReviewPlan, TrackedFinding } from "../types";
import { addedLineFingerprints } from "./fingerprint";

/** Locate persisted findings in the current patch without relying on unstable line numbers. */
export function relocateFindings(
	prior: TrackedFinding[],
	files: PatchFile[],
	plan: ReviewPlan,
): { untouched: TrackedFinding[]; touched: TrackedFinding[] } {
	const locations = new Map<string, { path: string; line: number }>();
	for (const file of files) {
		if (file.disposition !== "reviewable") continue;
		for (const location of addedLineFingerprints(file)) {
			locations.set(location.fingerprint, {
				path: file.path,
				line: location.newLine,
			});
		}
	}
	const untouched: TrackedFinding[] = [];
	const touched: TrackedFinding[] = [];
	for (const finding of prior) {
		const location = finding.fingerprint
			? locations.get(finding.fingerprint)
			: undefined;
		if (location) {
			const relocated = {
				...finding,
				path: location.path,
				line: location.line,
			};
			if (
				plan.fullReview &&
				finding.status === "active" &&
				plan.targets[finding.specialist]
			)
				touched.push(relocated);
			else untouched.push(relocated);
		} else if (finding.fingerprint) {
			touched.push(finding);
		} else if (
			finding.path
				? Object.values(plan.targets).some(
						(target) => target?.lines[finding.path!]?.length,
					)
				: !!plan.targets.conventions
		) {
			touched.push(finding);
		} else {
			untouched.push(finding);
		}
	}
	return { untouched, touched };
}
