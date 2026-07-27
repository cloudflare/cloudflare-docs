import { describe, expect, it } from "vitest";
import { addSectionRecordFields, sha256 } from "./shared";
import type { RawSection } from "./types";

const section = (anchor: string, heading: string): RawSection => ({
	anchor,
	heading,
	text: heading,
	hash: sha256(heading),
});

describe("AI Search section records", () => {
	it("gives an intro and same-named heading different keys", () => {
		const sections = addSectionRecordFields("/security/rules/", [
			section("", "Security rules"),
			section("security-rules", "Security rules"),
		]);

		expect(new Set(sections.map(({ key }) => key)).size).toBe(sections.length);
	});

	it("avoids collisions with existing suffixed anchors", () => {
		const sections = addSectionRecordFields("/example/", [
			section("foo", "Foo"),
			section("foo-1", "Foo 1"),
			section("foo", "Foo"),
		]);

		expect(new Set(sections.map(({ key }) => key)).size).toBe(sections.length);
	});
});
