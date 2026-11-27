import { describe, expect, test } from "vitest";
import {
	getCfCommandMetadataVersion,
	resolveCfCommand,
	resolveCfNamespace,
} from "./cf-command-metadata";
import {
	formatCommandArgumentName,
	formatCommandInvocation,
	kebabCaseFlagNames,
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

	test("includes required flags after positionals in command invocations", () => {
		expect(
			formatCommandInvocation("secrets-store secret create", ["store-id"], {
				"store-id": { type: "string", demandOption: true },
				name: { type: "string", demandOption: true },
				value: { type: "string" },
				scopes: { type: "string", demandOption: true },
				comment: { type: "string" },
				remote: { type: "boolean" },
			}),
		).toBe(
			"secrets-store secret create <STORE-ID> --name <NAME> --scopes <SCOPES>",
		);
	});

	test("formats required boolean, choice, and array flags", () => {
		expect(
			formatCommandInvocation("example", [], {
				force: { type: "boolean", demandOption: true },
				type: { type: "string", choices: ["a", "b"], demandOption: true },
				"event-types": { choices: ["x"], demandOption: true },
			}),
		).toBe("example --force --type <TYPE> --event-types <EVENT-TYPES>");
	});

	test("omits hidden required flags from command invocations", () => {
		expect(
			formatCommandInvocation("example", [], {
				internal: { type: "string", demandOption: true, hidden: true },
			}),
		).toBe("example");
	});

	test("renders camelCase flags in kebab-case", () => {
		const args = kebabCaseFlagNames(
			{
				name: { type: "string", demandOption: true },
				propertyName: { type: "string", demandOption: true },
				type: { type: "string", demandOption: true },
			},
			["name"],
		);
		expect(Object.keys(args)).toEqual(["name", "property-name", "type"]);
		expect(
			formatCommandInvocation(
				"vectorize create-metadata-index",
				["name"],
				args,
			),
		).toBe(
			"vectorize create-metadata-index <NAME> --property-name <PROPERTY-NAME> --type <TYPE>",
		);
	});

	test("keeps positional and colliding camelCase names unchanged", () => {
		expect(
			Object.keys(
				kebabCaseFlagNames(
					{
						objectPath: { type: "string", demandOption: true },
						dryRun: { type: "boolean" },
						"dry-run": { type: "boolean" },
					},
					["objectPath"],
				),
			),
		).toEqual(["objectPath", "dryRun", "dry-run"]);
	});

	test("rejects a positional without an argument definition", () => {
		expect(() => formatCommandInvocation("secret put", ["key"])).toThrow(
			'is missing its positional argument definition for "key"',
		);
	});
});
