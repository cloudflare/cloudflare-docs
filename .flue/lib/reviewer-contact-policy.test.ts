import { describe, expect, it } from "vitest";
import {
	CODEOWNERS_ONLY_CONTACT_PATTERNS,
	isCodeownersOnlyContactPattern,
} from "./reviewer-contact-policy";

describe("isCodeownersOnlyContactPattern", () => {
	it.each(CODEOWNERS_ONLY_CONTACT_PATTERNS)(
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
