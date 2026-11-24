import { describe, expect, test } from "vitest";
import {
	getCfCommandMetadataVersion,
	resolveCfCommand,
	resolveCfNamespace,
} from "./cf-command-metadata";
import {
	formatCommandArgumentName,
	formatCommandInvocation,
} from "./command-reference";

describe("CF command metadata", () => {
	test("uses the pinned CF package version", () => {
		expect(getCfCommandMetadataVersion()).toBe("1.0.0-rc.4");
	});

	test("resolves a command from generated metadata", () => {
		const command = resolveCfCommand("deploy");
		expect(command).toMatchObject({
			key: "deploy",
			invocation: "cf deploy [directory] [options]",
			description:
				"Deploy a Worker, static site, or full-stack application to Cloudflare",
		});
		expect(command.args["dry-run"]).toMatchObject({
			type: "boolean",
			positional: false,
		});
	});

	test("does not expose hidden CF commands without explicit opt-in", () => {
		expect(() => resolveCfCommand("ips list")).toThrow(
			"is hidden by the installed CF CLI",
		);
		expect(resolveCfCommand("ips list", { includeHidden: true }).key).toBe(
			"ips list",
		);
	});

	test("filters hidden commands from native CF namespaces", () => {
		// Every `ips` command is hidden, so the namespace is empty by default.
		expect(() => resolveCfNamespace("ips")).toThrow(
			'does not contain namespace "ips"',
		);
		expect(
			resolveCfNamespace("ips", { includeHidden: true }).map(
				(command) => command.key,
			),
		).toContain("ips list");
		expect(() => resolveCfNamespace("deploy")).toThrow(
			'does not contain namespace "deploy"',
		);
	});

	test("expands a CF namespace deterministically", () => {
		expect(
			resolveCfNamespace("cf hyperdrive").map((command) => command.key),
		).toEqual([
			"hyperdrive create",
			"hyperdrive delete",
			"hyperdrive edit",
			"hyperdrive get",
			"hyperdrive integration planetscale signature",
			"hyperdrive list",
			"hyperdrive replace",
			"hyperdrive restart",
		]);
	});
});

describe("formatCommandArgumentName", () => {
	test("formats flags and positional arguments", () => {
		expect(formatCommandArgumentName("env", {})).toBe("--env");
		expect(
			formatCommandArgumentName("file", {
				positional: true,
			}),
		).toBe("[FILE]");
		expect(
			formatCommandArgumentName("file", {
				positional: true,
				demandOption: true,
			}),
		).toBe("<FILE>");
	});

	test("formats command invocations from positional definitions", () => {
		expect(
			formatCommandInvocation("secret put", ["key", "value"], {
				key: { demandOption: true },
				value: {},
			}),
		).toBe("secret put <KEY> [VALUE]");
	});

	test("rejects a positional without an argument definition", () => {
		expect(() => formatCommandInvocation("secret put", ["key"])).toThrow(
			'is missing its positional argument definition for "key"',
		);
	});
});
