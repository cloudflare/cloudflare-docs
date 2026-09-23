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

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

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
		.map((key) => {
			const definition = args[key];
			if (!definition) {
				throw new Error(
					`Command "${command}" is missing its positional argument definition for "${key}".`,
				);
			}
			return formatCommandArgumentName(key, {
				...definition,
				positional: true,
			});
		})
		.join(" ");
	return suffix ? `${command} ${suffix}` : command;
}
