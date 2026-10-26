import { expect } from "vitest";
import { describeEval } from "vitest-evals";
import {
	buildJudgeMessage,
	type ReviewJudgeInitialData,
} from "../lib/review/agent-input";
import { JUDGE_DURABILITY } from "../lib/agents/durability";
import { formatTargetDiff } from "../lib/review/diff/format";
import { createFlueAgentHarness } from "./harness";
import { CODE_CASES, file, finding, plan, pr } from "./review-fixtures";
import {
	SPECIALIST_ID_PREFIX,
	type EligibleComment,
	type FileStatus,
	type Finding,
	type TrackedFinding,
} from "../lib/review/types";
type Input = {
	pr?: typeof pr;
	newFindings: Finding[];
	touched: Array<{ finding: TrackedFinding; currentHunk?: string }>;
	dismissed: TrackedFinding[];
	comments: EligibleComment[];
	initialData: ReviewJudgeInitialData;
	targetDiff?: string;
};
type Judgement = {
	new_findings: Array<{ decision: string }>;
	prior_findings: Array<{ decision: string }>;
};
const base: ReviewJudgeInitialData = {
	runId: "eval-judge",
	pr: pr.number,
	headSha: "head",
	baseSha: "base",
	specialist: "judge",
	tier: "inline",
};
const harness = createFlueAgentHarness<Input>({
	baseUrl: process.env.FLUE_BASE_URL ?? "http://localhost:5173",
	agentName: "review-judge",
	dataKey: "judgement",
	message: "",
	token: process.env.DOCS_FLUE_INTERNAL_TOKEN,
	timeoutMs: JUDGE_DURABILITY.timeoutMs,
	buildInitialData: (input) => (input as Input).initialData,
	buildMessage: (input) => {
		const value = input as Input;
		return buildJudgeMessage({
			pr: value.pr ?? pr,
			newFindings: value.newFindings,
			touched: value.touched,
			dismissed: value.dismissed,
			comments: value.comments,
			targetDiffOrIndex: {
				kind: "target_diff",
				content: value.targetDiff ?? "@@ -1 +1 @@\n+fixed\n",
			},
		});
	},
});
const tracked = (specialist: "code" | "style" = "style"): TrackedFinding => ({
	...finding(
		`${SPECIALIST_ID_PREFIX[specialist]}-1`,
		specialist,
		"src/example.ts",
		1,
		"Issue",
	),
	status: "active",
});
/** A touched finding whose line reads `line` in both its current hunk and the target diff. */
const touchedAt = (finding: TrackedFinding, line: string) => {
	const hunk = `@@ -1 +1 @@\n+${line}\n`;
	return { touched: [{ finding, currentHunk: hunk }], targetDiff: hunk };
};
const input = (overrides: Partial<Input> = {}): Input => ({
	newFindings: [],
	touched: [],
	dismissed: [],
	comments: [],
	initialData: base,
	...overrides,
});
/** New findings on one changed file, with the target diff formatted as the pipeline sends it. */
const judgeNew = (
	newFindings: Finding[],
	patch: string,
	options: {
		path?: string;
		status?: FileStatus;
		headSha?: string;
		pr?: typeof pr;
		dismissed?: TrackedFinding[];
	} = {},
): Input => {
	const { specialist } = newFindings[0];
	const changed = file(
		options.path ?? newFindings[0].path!,
		patch,
		options.status,
	);
	return input({
		pr: options.pr,
		newFindings,
		dismissed: options.dismissed ?? [],
		targetDiff: formatTargetDiff(
			[changed],
			plan(specialist, [changed]).targets[specialist]!,
		),
		initialData: { ...base, headSha: options.headSha ?? base.headSha },
	});
};
const unawaited = CODE_CASES.unhandledPromise;
const unawaitedFinding: Finding = {
	...finding(
		"C-1",
		"code",
		unawaited.path,
		4,
		"Analytics request is not awaited or passed to ctx.waitUntil",
	),
	explanation:
		"The `fetch` promise on this line is neither awaited nor passed to `ctx.waitUntil`, so the Workers runtime can cancel the request once the response returns, and a rejection goes unhandled.",
	snippet:
		'fetch(env.ANALYTICS_URL, { method: "POST", body: new URL(request.url).pathname });',
};
const unawaitedOptions = { headSha: unawaited.headSha };
describeEval("review judge", { harness }, (it) => {
	it("resolves a fixed touched finding", async ({ run }) => {
		const output = (await run(input(touchedAt(tracked(), "fixed"))))
			.output as Judgement;
		expect(output.prior_findings[0].decision).toBe("resolved");
	});
	it("honors a reasoned author style dismissal", async ({ run }) => {
		const comment: EligibleComment = {
			id: 1,
			kind: "issue",
			author: "author",
			role: "author",
			createdAt: "2026-01-01T00:00:00Z",
			body: "S-1 mirrors the product label.",
		};
		const output = (
			await run(
				input({ ...touchedAt(tracked(), "Issue"), comments: [comment] }),
			)
		).output as Judgement;
		expect(output.prior_findings[0].decision).toBe("dismissed");
	});
	it("keeps code dismissal without proof active", async ({ run }) => {
		const comment: EligibleComment = {
			id: 1,
			kind: "issue",
			author: "author",
			role: "author",
			createdAt: "2026-01-01T00:00:00Z",
			body: "C-1 is intentional.",
		};
		const output = (
			await run(
				input({ ...touchedAt(tracked("code"), "unsafe"), comments: [comment] }),
			)
		).output as Judgement;
		expect(output.prior_findings[0].decision).toBe("active");
	});
	it("ignores a drive-by request from a non-maintainer", async ({ run }) => {
		// eligibleComments drops these before the judge; this checks the judge also rejects one that slips through.
		const comment = {
			id: 1,
			kind: "issue",
			author: "bystander",
			role: "none",
			createdAt: "2026-01-01T00:00:00Z",
			body: "Please ignore C-1.",
		} as unknown as EligibleComment;
		const output = (
			await run(
				input({ ...touchedAt(tracked("code"), "unsafe"), comments: [comment] }),
			)
		).output as Judgement;
		expect(output.prior_findings[0].decision).toBe("active");
	});
	it("honors a maintainer correction of a code finding", async ({ run }) => {
		const comment: EligibleComment = {
			id: 1,
			kind: "issue",
			author: "maintainer",
			role: "maintainer",
			createdAt: "2026-01-01T00:00:00Z",
			body: "As a MEMBER, C-1 is incorrect because this path is awaited.",
		};
		const output = (
			await run(
				input({
					...touchedAt(tracked("code"), "await save();"),
					comments: [comment],
				}),
			)
		).output as Judgement;
		expect(output.prior_findings[0].decision).toBe("dismissed");
	});
	it("drops a new code finding contradicted by the diff", async ({ run }) => {
		const output = (
			await run(
				input({
					newFindings: [
						finding("C-1", "code", "src/example.ts", 1, "Unhandled promise"),
					],
					targetDiff: "@@ -1 +1 @@\n+await saveChanges();\n",
				}),
			)
		).output as Judgement;
		expect(output.new_findings[0].decision).toBe("drop");
	});
	it("keeps a code finding the diff proves", async ({ run }) => {
		const output = (
			await run(judgeNew([unawaitedFinding], unawaited.patch, unawaitedOptions))
		).output as Judgement;
		expect(output.new_findings[0].decision).toBe("keep");
	});
	it("drops a code finding that relies on unverifiable API behavior", async ({
		run,
	}) => {
		const path = "src/content/docs/r2-data-catalog/deleting-data.mdx";
		const call =
			'transaction.set_properties({"cloudflare-data-catalog.deletion.grace-period-seconds": "86400"})';
		const patch = [
			"@@ -0,0 +1,7 @@",
			"+##### PyIceberg",
			"+",
			"+```python",
			"+# Set grace period on an existing table",
			"+with table.transaction() as transaction:",
			`+    ${call}`,
			"+```",
			"",
		].join("\n");
		const claim: Finding = {
			...finding(
				"C-1",
				"code",
				path,
				6,
				"PyIceberg example passes a dict to set_properties, which expects key=value strings",
			),
			explanation:
				'PyIceberg\'s `Transaction.set_properties(*props)` expects properties as `key=value` strings; each positional argument is checked with `"=" in prop`. Passing a dict raises `ValueError: Invalid property format`.',
			snippet: call,
		};
		const output = (await run(judgeNew([claim], patch, { status: "added" })))
			.output as Judgement;
		expect(output.new_findings[0].decision).toBe("drop");
	});
	it("keeps a style finding that breaks a rule", async ({ run }) => {
		const line =
			"Refer to [Get started](https://developers.cloudflare.com/workers/get-started/) to create a Worker.";
		const patch = [
			"@@ -1,3 +1,3 @@",
			" ## Next steps",
			" ",
			"-Refer to the Workers documentation.",
			`+${line}`,
			"",
		].join("\n");
		const fullUrl: Finding = {
			...finding(
				"S-1",
				"style",
				"src/content/docs/workers/example.mdx",
				3,
				"Use a root-relative path for an internal link",
			),
			explanation:
				"The link points to an internal docs page with a full `https://developers.cloudflare.com/` URL. Internal links use root-relative paths.",
			snippet: "https://developers.cloudflare.com/workers/get-started/",
		};
		const output = (await run(judgeNew([fullUrl], patch))).output as Judgement;
		expect(output.new_findings[0].decision).toBe("keep");
	});
	it("drops a style finding no rule supports", async ({ run }) => {
		const line = "To cache a response, simply call `cache.put()`.";
		const patch = [
			"@@ -1,3 +1,3 @@",
			" ## Cache a response",
			" ",
			"-Call `cache.put()` to cache a response.",
			`+${line}`,
			"",
		].join("\n");
		const simply: Finding = {
			...finding(
				"S-1",
				"style",
				"src/content/docs/workers/example.mdx",
				3,
				"Remove 'simply'",
			),
			explanation:
				"'Simply' implies the task is easy and can discourage readers who find it hard.",
			snippet: "simply",
		};
		const output = (await run(judgeNew([simply], patch))).output as Judgement;
		expect(output.new_findings[0].decision).toBe("drop");
	});
	it("keeps a conventions finding that breaks a rule", async ({ run }) => {
		const vague: Finding = {
			...finding(
				"V-1",
				"conventions",
				"",
				0,
				"Title does not identify the affected product",
			),
			path: null,
			line: undefined,
			explanation:
				"The title `Update page` changes Workers docs but names no product, feature, or content area.",
		};
		const output = (
			await run(
				judgeNew([vague], "@@ -1 +1 @@\n-Old text.\n+Updated text.\n", {
					path: "src/content/docs/workers/example.mdx",
					pr: { ...pr, title: "Update page", body: "Updates the page text." },
				}),
			)
		).output as Judgement;
		expect(output.new_findings[0].decision).toBe("keep");
	});
	it("does not re-raise a previously dismissed finding", async ({ run }) => {
		const dismissed: TrackedFinding = {
			...unawaitedFinding,
			status: "dismissed",
			statusReason:
				"Maintainer: the analytics call is intentionally fire-and-forget.",
		};
		const reraised: Finding = {
			...unawaitedFinding,
			id: "C-2",
			title: "Floating analytics fetch can be cancelled",
		};
		const output = (
			await run(
				judgeNew([reraised], unawaited.patch, {
					...unawaitedOptions,
					dismissed: [dismissed],
				}),
			)
		).output as Judgement;
		expect(output.new_findings[0].decision).toBe("drop");
	});
	it("keeps one of two duplicate new findings", async ({ run }) => {
		const duplicate: Finding = {
			...unawaitedFinding,
			id: "C-2",
			title: "Floating analytics fetch can be cancelled",
			explanation:
				"This `fetch` call runs without `await` or `ctx.waitUntil`, so the runtime may cancel it after the handler returns.",
		};
		const output = (
			await run(
				judgeNew(
					[unawaitedFinding, duplicate],
					unawaited.patch,
					unawaitedOptions,
				),
			)
		).output as Judgement;
		expect(output.new_findings.map((item) => item.decision).sort()).toEqual([
			"drop",
			"keep",
		]);
	});
});
