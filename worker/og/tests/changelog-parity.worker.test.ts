import {
	createExecutionContext,
	env,
	waitOnExecutionContext,
} from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { changelogOgVersion } from "../../../src/util/og/changelog";
import { readChangelogCard } from "../cards/changelog";
import { serveOg } from "../serve";

const bindings = env as unknown as Env;
const ORIGIN = "https://developers.cloudflare.com";

// Fresh Inter renders of the reference posts, frozen before the move to
// worker/og/. Kunst parity is checked against production renders before merge.
const BASELINES: Record<string, string> = {
	"2026-09-25-unified-routing-managed-rulesets":
		"9dd9481727d973fe9939bdcad72104943a012bbae973220aac6685a8f65eee3d",
	"2026-09-25-sending-domain-suppressions":
		"10d65b9ad1864226d16d07da7884e69e32f02a1117344ad7232bc25139f7df09",
	"2026-09-25-release-flows-workers-metrics":
		"979b0e116bc47a841db7d55ab207137c932efdbe18ef62b77e0480a75e088fe7",
	"2026-09-25-emergency-waf-release":
		"f3a5f112104b6837692f99e6edf35c1850b98e1e569d81ba8a5c383b70bf7cde",
	"2026-09-25-custom-span-apis":
		"b9983d16f02a18dece83565f453c9e1f4baeb77d2822cd12806d558a4dca8a43",
	"2026-09-25-crawl-event-subscriptions":
		"c394dd0f030c66a1364279db705f9eba81a0f7c6c0d91d87ae75d824faf320c1",
	"2025-02-11-custom-errors-beta":
		"7f9287fe9221c846d6d8c832fdb58c513dd13e30ddeaf153178a97a5e9f7d1ca",
	"2025-08-25-secrets-store-ai-gateway":
		"2fc09fcef7a7761ed4b036407f3a494993f448e7a6979ba02092bb308a83d217",
	"2025-08-25-workers-assets-javascript-content-type":
		"9b05acc4a20bc722a0def824dfeaef14f3d93f52374498a87a6c34953b2f011c",
	"2026-05-21-vpc-networks-cloudflare-wan":
		"b283897135fd6c8f7466c4070273812bda5a262883de503e099285e774ebc75c",
};

const sha256 = async (body: ArrayBuffer) =>
	Array.from(
		new Uint8Array(await crypto.subtle.digest("SHA-256", body)),
		(byte) => byte.toString(16).padStart(2, "0"),
	).join("");

async function serve(path: string, options?: { cache?: boolean }) {
	const ctx = createExecutionContext();
	const response = await serveOg(
		new Request(`${ORIGIN}${path}`),
		bindings,
		ctx,
		options,
	);
	await waitOnExecutionContext(ctx);
	return response;
}

describe("changelog parity", () => {
	it.each(Object.entries(BASELINES))(
		"renders %s identically, bypassing caches",
		async (id, hash) => {
			const response = await serve(`/changelog/post/${id}/og.png`, {
				cache: false,
			});
			expect(response.headers.get("X-OG-Image")).toBe("rendered; font=inter");
			expect(await sha256(await response.arrayBuffer())).toBe(hash);
		},
		15_000,
	);

	it("serves images stored by earlier deploys", async () => {
		const post = "/changelog/post/2025-02-11-custom-errors-beta/";
		const card = await readChangelogCard(
			await bindings.ASSETS.fetch(`${ORIGIN}${post}`),
		);
		const stored = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 1, 2, 3]);
		await bindings.PRIVATE_ASSETS.put(
			`og/changelog/${await changelogOgVersion(card!)}.png`,
			stored,
		);

		const response = await serve(`${post}og.png`);
		expect(response.headers.get("X-OG-Image")).toBe("stored; font=kunst");
		expect(new Uint8Array(await response.arrayBuffer())).toEqual(stored);
	});
});
