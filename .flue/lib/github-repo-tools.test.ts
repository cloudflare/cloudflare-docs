import { describe, expect, it } from "vitest";
import { renderRepoFile } from "./github-repo-tools";

const lines = (count: number, width = 10) =>
	Array.from({ length: count }, (_, i) => `${i + 1}`.padStart(width, "x")).join(
		"\n",
	);

describe("renderRepoFile", () => {
	it("returns a small whole file unchanged", () => {
		expect(renderRepoFile("a.ts", "one\ntwo\n")).toBe("one\ntwo\n");
	});

	it("returns a line range with a span header", () => {
		expect(
			renderRepoFile("a.ts", "one\ntwo\nthree\nfour\n", {
				start_line: 2,
				end_line: 3,
			}),
		).toBe("[a.ts: lines 2-3 of 4]\ntwo\nthree");
	});

	it("clamps end_line to the file length", () => {
		expect(
			renderRepoFile("a.ts", "one\ntwo", { start_line: 2, end_line: 99 }),
		).toBe("[a.ts: lines 2-2 of 2]\ntwo");
	});

	it("reports a start_line past the end", () => {
		expect(renderRepoFile("a.ts", "one\ntwo\n", { start_line: 5 })).toBe(
			"a.ts has 2 lines; start_line 5 is past the end.",
		);
	});

	it("reports end_line before start_line", () => {
		expect(
			renderRepoFile("a.ts", "one\ntwo\nthree", {
				start_line: 3,
				end_line: 2,
			}),
		).toBe("end_line 2 is before start_line 3.");
	});

	it("cuts an oversized file at a line boundary and says where to continue", () => {
		const text = lines(4000);
		const out = renderRepoFile("big.ts", text);
		const [header, ...body] = out.split("\n");
		const note = body.pop();

		expect(header).toBe(`[big.ts: lines 1-${body.length} of 4000]`);
		expect(body.at(-1)).toBe(`${body.length}`.padStart(10, "x"));
		expect(note).toBe(
			`[Output capped at 32768 characters. Request start_line=${body.length + 1} to continue.]`,
		);
		expect(body.join("\n").length).toBeLessThanOrEqual(32_768);
	});

	it("reaches the end of an oversized file by following the note", () => {
		const text = lines(4000);
		let start = 1;
		let reads = 0;
		let last = "";
		while (reads < 10) {
			reads++;
			const out = renderRepoFile("big.ts", text, { start_line: start });
			const next = out.match(/start_line=(\d+) to continue/);
			last = out;
			if (!next) break;
			start = Number(next[1]);
		}

		expect(last.split("\n").at(-1)).toBe("4000".padStart(10, "x"));
		expect(reads).toBeGreaterThan(1);
	});
});
