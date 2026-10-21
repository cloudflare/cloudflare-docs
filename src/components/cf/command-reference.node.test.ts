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
		expect(getCfCommandMetadataVersion()).toBe("0.15.0");
	});

	test("resolves a command from generated metadata", () => {
		const command = resolveCfCommand("deploy");
		expect(command).toMatchObject({
			key: "deploy",
			invocation: "cf deploy [options]",
			description: "Deploy a worker to Cloudflare",
		});
		expect(command.args["dry-run"]).toMatchObject({
			type: "boolean",
			positional: false,
		});
	});

	test("does not expose hidden CF commands without explicit opt-in", () => {
		expect(() => resolveCfCommand("tunnels create")).toThrow(
			"is hidden by the installed CF CLI",
		);
		expect(
			resolveCfCommand("tunnels create", { includeHidden: true }).key,
		).toBe("tunnels create");
	});

	test("filters hidden commands from native CF namespaces", () => {
		const visibleCommands = resolveCfNamespace("tunnels").map(
			(command) => command.key,
		);

		expect(visibleCommands.length).toBeGreaterThan(0);
		expect(visibleCommands).not.toContain("tunnels create");
		expect(
			resolveCfNamespace("tunnels", { includeHidden: true }).map(
				(command) => command.key,
			),
		).toContain("tunnels create");
		expect(() => resolveCfNamespace("deploy")).toThrow(
			'does not contain namespace "deploy"',
		);
	});

	test("expands a CF namespace deterministically", () => {
		expect(
			resolveCfNamespace("cf hyperdrive").map((command) => command.key),
		).toEqual([
			"hyperdrive create",
			"hyperdrive create-database-signature",
			"hyperdrive delete",
			"hyperdrive get",
			"hyperdrive list",
			"hyperdrive replace",
			"hyperdrive restart",
			"hyperdrive update",
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
