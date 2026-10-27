import type {
	Finding,
	ReviewPlan,
	Specialist,
	SpecialistFinding,
} from "../types";
import { SPECIALIST_ID_PREFIX } from "../types";
import { hash8 } from "../hash";

export function normalizeTitle(title: string): string {
	return title.trim().replace(/\s+/g, " ").toLowerCase();
}

/** Accept only findings grounded in the exact target set that the specialist received. */
export function acceptSpecialistFindings(
	specialist: Specialist,
	raw: SpecialistFinding[],
	plan: ReviewPlan,
	headSha: string,
): { accepted: Finding[]; droppedOffTarget: number } {
	const target = plan.targets[specialist];
	if (!target) return { accepted: [], droppedOffTarget: raw.length };
	const byPath = new Map(
		target.files.map((path) => [path, new Set(target.lines[path] ?? [])]),
	);
	const accepted = new Map<string, Finding>();
	let droppedOffTarget = 0;
	for (const finding of raw) {
		const allowed =
			finding.path === null
				? specialist === "conventions"
				: finding.line
					? byPath.get(finding.path)?.has(finding.line)
					: byPath.has(finding.path);
		if (!allowed) {
			droppedOffTarget++;
			continue;
		}
		const fingerprint =
			finding.path && finding.line
				? target.fingerprints[`${finding.path}:${finding.line}`]
				: undefined;
		const id = `${SPECIALIST_ID_PREFIX[specialist]}-${hash8(`${specialist}|${finding.path}|${fingerprint ?? "file"}|${normalizeTitle(finding.title)}`)}`;
		accepted.set(id, {
			...finding,
			id,
			specialist,
			fingerprint,
			firstSeenSha: headSha,
			lastSeenSha: headSha,
		});
	}
	return { accepted: [...accepted.values()], droppedOffTarget };
}
