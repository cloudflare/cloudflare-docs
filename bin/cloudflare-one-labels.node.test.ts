import { describe, expect, it } from "vitest";
import {
	classifyProductPath,
	pathGlobsExcluding,
} from "./cloudflare-one-labels";

describe("Cloudflare One product path classifier", () => {
	it("uses the most-specific confirmed leaf", () => {
		expect(
			classifyProductPath(
				"/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/",
			),
		).toBe("product:zt-access-for-infrastructure");
		expect(
			classifyProductPath(
				"src/content/docs/cloudflare-one/team-and-resources/app-library.mdx",
			),
		).toBe("product:application-library");
	});

	it("keeps unmatched Cloudflare One paths on their parent", () => {
		expect(
			classifyProductPath("/cloudflare-one/team-and-resources/devices/"),
		).toBe("product:cloudflare-one");
		expect(classifyProductPath("/cloudflare-wan/analytics/")).toBe(
			"product:cloudflare-wan",
		);
	});

	it("classifies the nested Network Interconnect connector page", () => {
		expect(
			classifyProductPath(
				"/cloudflare-one/networks/connectors/cloudflare-wan/network-interconnect/",
			),
		).toBe("product:network-interconnect");
	});

	it("classifies Cloudflare One product paths with separate labels", () => {
		expect(
			classifyProductPath("/cloudflare-one/cloud-and-saas-findings/"),
		).toBe("product:casb");
		expect(
			classifyProductPath(
				"/cloudflare-one/networks/connectors/cloudflare-mesh/",
			),
		).toBe("product:mesh");
		expect(
			classifyProductPath(
				"/cloudflare-one/networks/connectors/cloudflare-wan/analytics/",
			),
		).toBe("product:cloudflare-wan");
	});

	it("keeps Email Security aggregate except exact PhishNet pages", () => {
		expect(
			classifyProductPath("/cloudflare-one/email-security/settings/"),
		).toBe("product:email-security");
		expect(
			classifyProductPath(
				"/cloudflare-one/email-security/settings/phish-submissions/phishnet-365/",
			),
		).toBe("product:phishnet");
	});

	it("uses the top-level product for paths outside the explicit map", () => {
		expect(classifyProductPath("/r2/buckets/")).toBe("product:r2");
		expect(classifyProductPath("/")).toBeUndefined();
	});

	it("builds positive fallback partitions for nested leaf paths", () => {
		expect(
			pathGlobsExcluding("docs/cloudflare-one", [
				"email-security",
				"team-and-resources/app-library",
			]),
		).toEqual([
			"docs/cloudflare-one/!(email-security.*)",
			"docs/cloudflare-one/!(email-security|team-and-resources)/**",
			"docs/cloudflare-one/team-and-resources/!(app-library.*)",
			"docs/cloudflare-one/team-and-resources/!(app-library)/**",
		]);
	});
});
