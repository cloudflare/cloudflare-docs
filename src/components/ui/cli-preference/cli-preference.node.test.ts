import { describe, expect, test } from "vitest";
import { getCliPreferenceDefault } from "./cli-preference";

describe("CLI route defaults", () => {
	test.each(["/cf", "/cf/", "/cf/get-started/"])(
		"defaults %s to CF",
		(pathname) => {
			expect(getCliPreferenceDefault(pathname)).toBe("cf");
		},
	);

	test.each([
		"/",
		"/workers/wrangler",
		"/workers/wrangler/commands/",
		"/d1/wrangler-commands/",
		"/cf-workers/",
	])("defaults %s to Wrangler", (pathname) => {
		expect(getCliPreferenceDefault(pathname)).toBe("wrangler");
	});
});
