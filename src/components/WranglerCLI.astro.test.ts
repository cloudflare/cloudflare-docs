import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test, describe } from "vitest";
import WranglerCLI from "./WranglerCLI.astro";

type Options = Parameters<(typeof container)["renderToString"]>[1];

const container = await AstroContainer.create();

const renderWithOptions = (options?: Options) => {
	return container.renderToString(WranglerCLI, options);
};

describe("WranglerCLI", () => {
	test("succeeds with valid input", async () => {
		await expect(
			renderWithOptions({
				props: {
					command: "deploy",
				},
			}),
		).resolves.toContain("pnpm wrangler deploy");
	});

	test("errors with no props", async () => {
		await expect(renderWithOptions()).rejects
			.toThrowErrorMatchingInlineSnapshot(`
			[ZodError: [
			  {
			    "code": "invalid_type",
			    "expected": "string",
			    "received": "undefined",
			    "path": [
			      "command"
			    ],
			    "message": "Required"
			  }
			]]
		`);
	});

	test("errors with non-existent command", async () => {
		await expect(
			renderWithOptions({
				props: {
					command: "not-a-valid-command",
				},
			}),
		).rejects.toThrowErrorMatchingInlineSnapshot(
			`[Error: [wrangler.ts] Command "not-a-valid-command" not found]`,
		);
	});

	test("errors with bad flags for 'deploy'", async () => {
		await expect(
			renderWithOptions({
				props: {
					command: "deploy",
					flags: {
						foo: "bar",
					},
				},
			}),
		).rejects.toThrowErrorMatchingInlineSnapshot(
			`[Error: [WranglerCLI] Received "foo" for "deploy" but no such arg exists]`,
		);
	});

	test("errors with bad value for 'container-rollout' flag", async () => {
		await expect(
			renderWithOptions({
				props: {
					command: "deploy",
					flags: {
						"containers-rollout": "not-a-valid-option",
					},
				},
			}),
		).rejects.toThrowErrorMatchingInlineSnapshot(
			`[Error: [WranglerCLI] Expected "immediate,gradual" for "containers-rollout" but got "string"]`,
		);
	});
});
