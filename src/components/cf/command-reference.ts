export interface CommandArgumentDefinition {
	type?: string;
	choices?: ReadonlyArray<string | number>;
	description?: string;
	describe?: string;
	demandOption?: boolean;
	default?: unknown;
	alias?: string | readonly string[];
	hidden?: boolean;
	positional?: boolean;
}

export function formatCommandArgumentName(
	key: string,
	definition: CommandArgumentDefinition,
) {
	if (!definition.positional) return `--${key}`;
	return definition.demandOption
		? `<${key.toUpperCase()}>`
		: `[${key.toUpperCase()}]`;
}

export function formatCommandInvocation(
	command: string,
	positionals: readonly string[] = [],
	args: Record<string, CommandArgumentDefinition> = {},
) {
	const suffix = positionals
		.map((key) =>
			formatCommandArgumentName(key, { ...args[key], positional: true }),
		)
		.join(" ");
	return suffix ? `${command} ${suffix}` : command;
}
