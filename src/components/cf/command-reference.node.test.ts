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
		expect(getCfCommandMetadataVersion()).toBe("0.11.0");
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
		expect(() => resolveCfCommand("d1 query")).toThrow(
			"is hidden by the installed CF CLI",
		);
		expect(resolveCfCommand("d1 query", { includeHidden: true }).key).toBe(
			"d1 query",
		);
	});

	test("filters hidden commands from native CF namespaces", () => {
		const visibleCommands = resolveCfNamespace("d1").map(
			(command) => command.key,
		);

		expect(visibleCommands.length).toBeGreaterThan(0);
		expect(visibleCommands).not.toContain("d1 query");
		expect(
			resolveCfNamespace("d1", { includeHidden: true }).map(
				(command) => command.key,
			),
		).toContain("d1 query");
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
});
