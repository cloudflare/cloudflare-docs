import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import cfPackage from "cf/package.json";
import type { CommandArgumentDefinition } from "./command-reference";

type JsonRecord = Record<string, unknown>;

interface ParameterMetadata {
	name: string;
	type: string;
	required: boolean;
	description?: string;
	choices?: ReadonlyArray<string | number>;
	default?: unknown;
}

interface CommandMetadata {
	description: string;
	usage: string;
	arguments: ParameterMetadata[];
	options: ParameterMetadata[];
	hidden: boolean;
}

interface MetadataSnapshot {
	cfVersion: string;
	commands: Map<string, CommandMetadata>;
}

export interface ResolvedCfCommand {
	key: string;
	title: string;
	headingId: string;
	invocation: string;
	description: string;
	args: Record<string, CommandArgumentDefinition>;
}

function isRecord(value: unknown): value is JsonRecord {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

function requireRecord(value: unknown, context: string): JsonRecord {
	if (!isRecord(value)) throw new Error(`${context} must be an object.`);
	return value;
}

function requireString(value: unknown, context: string): string {
	if (typeof value !== "string" || value.length === 0) {
		throw new Error(`${context} must be a non-empty string.`);
	}
	return value;
}

function requireBoolean(value: unknown, context: string): boolean {
	if (typeof value !== "boolean")
		throw new Error(`${context} must be boolean.`);
	return value;
}

function requireArray(value: unknown, context: string): unknown[] {
	if (!Array.isArray(value)) throw new Error(`${context} must be an array.`);
	return value;
}

function parseParameter(value: unknown, context: string): ParameterMetadata {
	const parameter = requireRecord(value, context);
	const enumValues = Array.isArray(parameter.enum) ? parameter.enum : undefined;
	const choices = enumValues
		? enumValues.filter(
				(item): item is string | number =>
					typeof item === "string" || typeof item === "number",
			)
		: undefined;

	if (choices && choices.length !== enumValues?.length) {
		throw new Error(`${context}.enum must contain only strings or numbers.`);
	}

	return {
		name: requireString(parameter.name, `${context}.name`),
		type: requireString(parameter.type, `${context}.type`),
		required: requireBoolean(parameter.required, `${context}.required`),
		description:
			typeof parameter.description === "string"
				? parameter.description
				: undefined,
		choices,
		default: Object.hasOwn(parameter, "default")
			? parameter.default
			: undefined,
	};
}

function parseCommandMetadata(
	value: unknown,
	context: string,
): CommandMetadata {
	const command = requireRecord(value, context);
	return {
		description:
			typeof command.description === "string" ? command.description : "",
		usage: requireString(command.usage, `${context}.usage`),
		arguments: requireArray(command.arguments, `${context}.arguments`).map(
			(parameter, index) =>
				parseParameter(parameter, `${context}.arguments[${index}]`),
		),
		options: requireArray(command.options, `${context}.options`).map(
			(parameter, index) =>
				parseParameter(parameter, `${context}.options[${index}]`),
		),
		hidden:
			command.hideCommand === undefined
				? false
				: requireBoolean(command.hideCommand, `${context}.hideCommand`),
	};
}

function parseMetadataSnapshot(
	value: unknown,
	cfVersion: string,
): MetadataSnapshot {
	const snapshot = requireRecord(value, "CF command metadata");
	if (snapshot.version !== "1.0") {
		throw new Error("Unsupported CF package command metadata version.");
	}
	const sourceCommands = requireArray(
		snapshot.commands,
		"CF command metadata.commands",
	);
	const commands = new Map<string, CommandMetadata>();

	for (const [index, value] of sourceCommands.entries()) {
		const command = requireRecord(
			value,
			`CF command metadata.commands[${index}]`,
		);
		const fullCommand = requireString(
			command.command,
			`CF command metadata.commands[${index}].command`,
		);
		if (!fullCommand.startsWith("cf ")) {
			throw new Error(
				`CF command metadata.commands[${index}].command must begin with "cf ".`,
			);
		}
		const key = fullCommand.slice(3);
		if (commands.has(key)) {
			throw new Error(`Duplicate CF command metadata for "${key}".`);
		}
		commands.set(
			key,
			parseCommandMetadata(command, `CF command metadata.commands[${index}]`),
		);
	}

	return { cfVersion, commands };
}

const installedCfVersion = requireString(
	cfPackage.version,
	"cf/package.json version",
);
const require = createRequire(import.meta.url);
const cfPackagePath = require.resolve("cf/package.json");
const commandMetadataPath = resolve(
	dirname(cfPackagePath),
	"dist/_meta/commands.json",
);
const commandMetadata: unknown = JSON.parse(
	readFileSync(commandMetadataPath, "utf8"),
);
const metadata = parseMetadataSnapshot(commandMetadata, installedCfVersion);

function toArgumentDefinition(
	parameter: ParameterMetadata,
	positional: boolean,
): CommandArgumentDefinition {
	return {
		type: parameter.choices?.length ? undefined : parameter.type,
		choices: parameter.choices,
		description: parameter.description,
		demandOption: parameter.required,
		default: parameter.default,
		positional,
	};
}

interface ResolveOptions {
	includeHidden?: boolean;
}

function resolveCommandKey(
	key: string,
	{ includeHidden = false }: ResolveOptions = {},
): ResolvedCfCommand {
	const command = metadata.commands.get(key);
	if (!command)
		throw new Error(`CF command metadata does not contain "${key}".`);
	if (command.hidden && !includeHidden) {
		throw new Error(`CF command "${key}" is hidden by the installed CF CLI.`);
	}
	const args: Record<string, CommandArgumentDefinition> = {};
	for (const parameter of command.arguments) {
		if (Object.hasOwn(args, parameter.name)) {
			throw new Error(
				`CF command "${key}" repeats argument "${parameter.name}".`,
			);
		}
		args[parameter.name] = toArgumentDefinition(parameter, true);
	}
	for (const parameter of command.options) {
		if (Object.hasOwn(args, parameter.name)) {
			throw new Error(
				`CF command "${key}" repeats argument "${parameter.name}".`,
			);
		}
		args[parameter.name] = toArgumentDefinition(parameter, false);
	}

	return {
		key,
		title: key,
		headingId: `cf-${key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
		invocation: command.usage,
		description: command.description,
		args,
	};
}

export function resolveCfCommand(
	command: string,
	options?: ResolveOptions,
): ResolvedCfCommand {
	const key = command.trim().replace(/^cf\s+/, "");
	return resolveCommandKey(key, options);
}

export function resolveCfNamespace(
	namespace: string,
	{ includeHidden = false }: ResolveOptions = {},
): ResolvedCfCommand[] {
	const key = namespace.trim().replace(/^cf\s+/, "");
	const commands = [...metadata.commands.entries()]
		.filter(
			([commandKey, command]) =>
				commandKey.startsWith(`${key} `) && (includeHidden || !command.hidden),
		)
		.map(([commandKey]) => commandKey)
		.sort()
		.map((commandKey) => resolveCommandKey(commandKey, { includeHidden }));

	if (commands.length === 0) {
		throw new Error(`CF command metadata does not contain namespace "${key}".`);
	}
	return commands;
}

export function getCfCommandMetadataVersion(): string {
	return metadata.cfVersion;
}
