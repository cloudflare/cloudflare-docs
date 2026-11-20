import { describe, expect, it } from "vitest";
import { hasValidInternalToken } from "./dev-review-routes";
describe("dev review route guards", () => {
	it("rejects missing tokens", async () => {
		expect(await hasValidInternalToken(undefined, "secret")).toBe(false);
	});
});
