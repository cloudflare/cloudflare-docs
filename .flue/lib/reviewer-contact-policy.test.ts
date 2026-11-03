import { describe, expect, it } from "vitest";
import { isCodeownersOnlyContactPattern } from "./reviewer-contact-policy";

describe("isCodeownersOnlyContactPattern", () => {
	it.each(["*", "/.github/CODEOWNERS", "/public/__redirects"])(
		"matches configured pattern %s",
		(pattern) => {
			expect(isCodeownersOnlyContactPattern(pattern)).toBe(true);
		},
	);

	it.each([null, "/src/content/docs/workers/"])(
		"does not match unconfigured pattern %s",
		(pattern) => {
			expect(isCodeownersOnlyContactPattern(pattern)).toBe(false);
		},
	);
});
