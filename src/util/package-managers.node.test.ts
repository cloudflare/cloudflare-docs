import { describe, expect, test } from "vitest";

import { getCommand, getTabs, MANAGERS } from "./package-managers";

describe("getTabs", () => {
	test("create-cloudflare shows only npm/yarn/pnpm (no bun tab)", () => {
		const tabs = getTabs("create", "cloudflare@latest", {
			args: "my-project",
		});
		expect(tabs.map((t) => t.mgr)).toEqual(["npm", "yarn", "pnpm"]);
		expect(tabs).toEqual([
			{ mgr: "npm", cmd: "npm create cloudflare@latest -- my-project" },
			{ mgr: "yarn", cmd: "yarn create cloudflare my-project" },
			{ mgr: "pnpm", cmd: "pnpm create cloudflare@latest my-project" },
		]);
	});

	test("add commands include all four managers", () => {
		const tabs = getTabs("add", "pg");
		expect(tabs.map((t) => t.mgr)).toEqual(MANAGERS);
		expect(tabs.map((t) => t.cmd)).toEqual([
			"npm i pg",
			"yarn add pg",
			"pnpm add pg",
			"bun add pg",
		]);
	});

	test("dev flag maps to -D (npm/yarn/pnpm) and -d (bun)", () => {
		expect(
			getTabs("add", "@types/pg", { dev: true }).map((t) => t.cmd),
		).toEqual([
			"npm i -D @types/pg",
			"yarn add -D @types/pg",
			"pnpm add -D @types/pg",
			"bun add -d @types/pg",
		]);
	});
});

describe("getCommand", () => {
	test("bun is omitted from create/dlx/exec/run", () => {
		for (const type of ["create", "dlx", "exec", "run"] as const) {
			expect(getCommand("bun", type)).toBeUndefined();
		}
	});

	test("pnpm dlx renders as pnpx (not `pnpm dlx`)", () => {
		expect(getCommand("pnpm", "dlx", "wrangler")).toBe("pnpx wrangler");
	});

	test("npm inserts `--` before args, except for dlx/exec/run", () => {
		expect(getCommand("npm", "add", "pg", { args: "--save-exact" })).toBe(
			"npm i pg -- --save-exact",
		);
		expect(getCommand("npm", "exec", "wrangler", { args: "deploy" })).toBe(
			"npx wrangler deploy",
		);
	});

	test("comment substitutes {PKG} with the manager and sits above the command", () => {
		expect(
			getCommand("npm", "add", "pg", { comment: "install with {PKG}" }),
		).toBe("# install with npm\nnpm i pg");
	});

	test("prefix sits on the command line, below any comment line", () => {
		expect(
			getCommand("npm", "exec", "vite", {
				args: "dev",
				prefix: "CLOUDFLARE_ENV=staging",
			}),
		).toBe("CLOUDFLARE_ENV=staging npx vite dev");
		expect(
			getCommand("pnpm", "run", "build", {
				comment: "build with {PKG}",
				prefix: "NODE_ENV=production",
			}),
		).toBe("# build with pnpm\nNODE_ENV=production pnpm run build");
	});
});
