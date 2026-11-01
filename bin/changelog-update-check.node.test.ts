import { describe, expect, test } from "vitest";
import {
	checkChangelogChange,
	diffRules,
	extractRuleActions,
	readableWords,
} from "./changelog-update-check";

const PATH =
	"src/content/changelog/waf/2026-10-21-emergency-waf-release-cfmr.mdx";
const NOW = new Date("2026-10-28T00:00:00Z");

type Row = { id: string; previous?: string; next: string };

function post({
	rows,
	date = "2026-10-21",
	updates = "",
}: {
	rows: Row[];
	date?: string;
	updates?: string;
}) {
	const body = rows
		.map(
			({ id, previous = "N/A", next }) => `		<tr>
			<td>Cloudflare Managed Ruleset</td>
			<td>
				<RuleID id="${id}" />
			</td>
			<td>N/A</td>
			<td>Generic Rules - ${id}</td>
			<td>${previous}</td>
			<td>${next}</td>
			<td>This is a new detection.</td>
		</tr>`,
		)
		.join("\n");

	return `---
title: "WAF Release - ${date} - Emergency"
description: Emergency release
date: ${date}
${updates}---

import { RuleID } from "~/components";

<table style="width: 100%">
	<thead>
		<tr>
			<th>Ruleset</th>
			<th>Rule ID</th>
			<th>Legacy Rule ID</th>
			<th>Description</th>
			<th>Previous Action</th>
			<th>New Action</th>
			<th>Comments</th>
		</tr>
	</thead>
	<tbody>
${body}
	</tbody>
</table>
`;
}

const FOUR_RULES: Row[] = [
	{ id: "r1", next: "Block" },
	{ id: "r2", next: "Block" },
	{ id: "r3", next: "Log" },
	{ id: "r4", next: "Log" },
];

const UPDATE = `updates:
  - date: 2026-10-21T12:34:00Z
    summary: Added three rules.
`;

describe("extractRuleActions", () => {
	test("maps each rule ID to its action columns", () => {
		const rules = extractRuleActions(post({ rows: FOUR_RULES }));
		expect(rules.size).toBe(4);
		expect(rules.get("r3")).toBe("Previous Action: N/A | New Action: Log");
	});
});

describe("diffRules", () => {
	test("reports added, removed, and action-changed rules", () => {
		const head = post({
			rows: [
				{ id: "r1", next: "Block" },
				{ id: "r3", next: "Block" },
				{ id: "r4", next: "Log" },
				{ id: "r5", next: "Block" },
			],
		});
		expect(diffRules(post({ rows: FOUR_RULES }), head)).toEqual({
			added: ["r5"],
			removed: ["r2"],
			actionChanged: ["r3"],
		});
	});
});

describe("readableWords", () => {
	test("ignores link targets, punctuation, case, and imports", () => {
		const before = `---\ntitle: Example\ndate: 2026-10-01\n---\n\nimport { A } from "~/components";\n\nRead the [guide](/old/path/).`;
		const after = `---\ntitle: Example\ndate: 2026-10-01\n---\n\nimport { A, B } from "~/components";\n\nread the  [Guide](/new/path/)`;
		expect(readableWords(before)).toEqual(readableWords(after));
	});

	test("includes the title and description", () => {
		expect(readableWords(`---\ntitle: Limit raised\n---\n`)).toEqual([
			"limit",
			"raised",
		]);
	});
});

describe("checkChangelogChange", () => {
	const base = post({ rows: FOUR_RULES });
	const check = (
		head: string,
		options: { path?: string; base?: string } = {},
	) =>
		checkChangelogChange({
			path: options.path ?? PATH,
			base: "base" in options ? options.base : base,
			head,
			now: NOW,
		});

	test("fails when rules are added without an updates entry (the 2026-10-21 incident)", () => {
		const result = check(
			post({ rows: [...FOUR_RULES, { id: "r5", next: "Block" }] }),
		);
		expect(result.status).toBe("error");
		if (result.status === "error") {
			expect(result.message).toContain("added rules: r5");
		}
	});

	test("fails when an action changes without an updates entry", () => {
		const result = check(
			post({
				rows: FOUR_RULES.map((row) =>
					row.id === "r3" ? { ...row, next: "Block" } : row,
				),
			}),
		);
		expect(result.status).toBe("error");
		if (result.status === "error") {
			expect(result.message).toContain("changed actions: r3");
		}
	});

	test("passes when the change adds an updates entry", () => {
		const head = post({
			rows: [...FOUR_RULES, { id: "r5", next: "Block" }],
			updates: UPDATE,
		});
		expect(check(head)).toEqual({ status: "ok" });
	});

	test("fails when the updates list does not grow", () => {
		const baseWithUpdate = post({ rows: FOUR_RULES, updates: UPDATE });
		const head = post({
			rows: [...FOUR_RULES, { id: "r6", next: "Block" }],
			updates: UPDATE,
		});
		expect(check(head, { base: baseWithUpdate }).status).toBe("error");
	});

	test("reminds, without failing, for wording edits to WAF posts", () => {
		const head = base.replace("Emergency release", "Emergency release notes");
		expect(check(head).status).toBe("reminder");
	});

	test("reminds for content edits to published posts in other products", () => {
		const path = "src/content/changelog/workers/2026-10-21-limits.mdx";
		const before = `---\ntitle: Limits\ndate: 2026-10-21\n---\n\nThe limit is 10 MB.`;
		const after = before.replace("10 MB", "100 MB");
		expect(check(after, { path, base: before }).status).toBe("reminder");
		expect(check(`${after}\n`, { path, base: after })).toEqual({
			status: "ok",
		});
	});

	test("passes for mechanical edits", () => {
		const path = "src/content/changelog/workers/limits.md";
		const before = `---\ntitle: Limits\ndate: 2026-10-21\n---\n\nRead the [docs](/workers/old/).`;
		const after = `---\ntitle: Limits\ndate: 2026-10-21\n---\n\nRead the [Docs](/workers/new/)`;
		expect(check(after, { path, base: before })).toEqual({ status: "ok" });
	});

	test("passes for new files", () => {
		expect(check(base, { base: undefined })).toEqual({ status: "ok" });
	});

	test("passes for posts that are not published yet", () => {
		const futureBase = post({ rows: FOUR_RULES, date: "2026-11-02" });
		const head = post({
			rows: [...FOUR_RULES, { id: "r5", next: "Block" }],
			date: "2026-11-02",
		});
		expect(check(head, { base: futureBase })).toEqual({ status: "ok" });
	});

	test("passes for hidden posts", () => {
		const hiddenBase = base.replace(
			"date: 2026-10-21",
			"date: 2026-10-21\nhidden: true",
		);
		expect(
			check(post({ rows: [...FOUR_RULES, { id: "r5", next: "Block" }] }), {
				base: hiddenBase,
			}),
		).toEqual({ status: "ok" });
	});

	test("ignores living pages and files outside the changelog", () => {
		const head = post({ rows: [...FOUR_RULES, { id: "r5", next: "Block" }] });
		for (const path of [
			"src/content/changelog/waf/scheduled-waf-release.mdx",
			"src/content/docs/waf/2026-10-21-something.mdx",
		]) {
			expect(check(head, { path })).toEqual({ status: "ok" });
		}
	});

	test("only reminds for rule changes outside WAF", () => {
		const head = post({ rows: [...FOUR_RULES, { id: "r5", next: "Block" }] });
		const path = "src/content/changelog/ddos-protection/2026-10-21-rules.mdx";
		expect(check(head, { path }).status).toBe("reminder");
	});
});
