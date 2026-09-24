import { describe, expect, it } from "vitest";
import { stripFrontmatter } from "./instructions";

describe("stripFrontmatter", () => {
	it("removes a leading YAML frontmatter block", () => {
		expect(stripFrontmatter("---\ntitle: Bot\n---\nUse concise prose.\n")).toBe(
			"Use concise prose.",
		);
	});

	it("leaves markdown without frontmatter unchanged except surrounding whitespace", () => {
		expect(stripFrontmatter("\n# Instructions\n")).toBe("# Instructions");
	});
});
