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

export function kebabCaseFlagNames(
	args: Record<string, CommandArgumentDefinition> = {},
	positionals: readonly string[] = [],
) {
	const positionalSet = new Set(positionals);
	return Object.fromEntries(
		Object.entries(args).map(([key, definition]) => {
			const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
			return positionalSet.has(key) || definition.positional || kebabKey in args
				? [key, definition]
				: [kebabKey, definition];
		}),
	);
}

export function formatCommandInvocation(
	command: string,
	positionals: readonly string[] = [],
	args: Record<string, CommandArgumentDefinition> = {},
) {
	const positionalParts = positionals.map((key) => {
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
	});
	const positionalSet = new Set(positionals);
	const requiredFlagParts = Object.entries(args)
		.filter(
			([key, definition]) =>
				definition.demandOption &&
				!definition.hidden &&
				!definition.positional &&
				!positionalSet.has(key),
		)
		.map(([key, definition]) =>
			definition.type === "boolean"
				? `--${key}`
				: `--${key} <${key.toUpperCase()}>`,
		);
	return [command, ...positionalParts, ...requiredFlagParts].join(" ");
}
