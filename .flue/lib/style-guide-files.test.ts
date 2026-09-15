import { describe, expect, it } from "vitest";
import { selectStyleGuideFiles } from "./style-guide-files";

const file = (filename: string, additions = 1) => ({
	sha: "abc",
	filename,
	status: "modified",
	additions,
	deletions: 0,
	changes: additions,
	patch: "@@ -1 +1 @@\n+changed",
});

describe("selectStyleGuideFiles", () => {
	it("returns every eligible MDX file in stable largest-first order", () => {
		const files = [
			file("src/content/docs/a/index.mdx", 1),
			file("src/content/docs/b/index.mdx", 4),
			file("src/content/partials/a.mdx", 1),
			file("src/content/changelog/a.mdx", 1),
			file("src/components/a.mdx", 99),
		];

		expect(selectStyleGuideFiles(files)).toMatchObject([
			{ filename: "src/content/docs/b/index.mdx" },
			{ filename: "src/content/changelog/a.mdx" },
			{ filename: "src/content/docs/a/index.mdx" },
			{ filename: "src/content/partials/a.mdx" },
		]);
	});
});
