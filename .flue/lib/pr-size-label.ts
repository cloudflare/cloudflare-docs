import { addLabels, removeLabel, type GitHubPullRequest } from "./github";

export const SIZE_LABELS = [
	"size/xs",
	"size/s",
	"size/m",
	"size/l",
	"size/xl",
] as const;

export type SizeLabel = (typeof SIZE_LABELS)[number];

/** Exclusive upper bounds on additions + deletions. */
const SIZE_THRESHOLDS: ReadonlyArray<[number, SizeLabel]> = [
	[10, "size/xs"],
	[100, "size/s"],
	[500, "size/m"],
	[1000, "size/l"],
];

export function sizeLabelFor(totalChanges: number): SizeLabel {
	for (const [max, label] of SIZE_THRESHOLDS) {
		if (totalChanges < max) return label;
	}
	return "size/xl";
}

/** Add the target label if missing and remove every other size label. */
export function planSizeLabelChanges(
	currentLabels: string[],
	target: SizeLabel,
): { add: SizeLabel | null; remove: string[] } {
	return {
		add: currentLabels.includes(target) ? null : target,
		remove: currentLabels.filter(
			(name) =>
				name !== target && (SIZE_LABELS as readonly string[]).includes(name),
		),
	};
}

/**
 * Make the PR carry exactly one size label. Labels are added and removed
 * individually (never replaced wholesale) so product labels managed by other
 * automations are untouched. Throws on API failure; the caller owns logging.
 */
export async function reconcileSizeLabel(
	token: string,
	pr: GitHubPullRequest,
	options: { dryRun?: boolean } = {},
): Promise<{
	target: SizeLabel;
	added: boolean;
	removed: string[];
	dryRun: boolean;
}> {
	const target = sizeLabelFor(pr.additions + pr.deletions);
	const plan = planSizeLabelChanges(
		pr.labels.map((l) => l.name),
		target,
	);
	const dryRun = options.dryRun === true;
	if (!dryRun) {
		if (plan.add) await addLabels(token, pr.number, [plan.add]);
		for (const name of plan.remove) await removeLabel(token, pr.number, name);
	}
	return { target, added: plan.add !== null, removed: plan.remove, dryRun };
}
