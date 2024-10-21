import { execSync } from "child_process";
import { writeFileSync } from "fs";

const TWO_OR_MORE_SPACES_REGEX = /[^\S\r\n]{2,}/;
const WORDS_IN_BRACKETS_REGEX = /\[([\s\S]+?)\]|\{([\s\S]+?)\}|<([\s\S]+?)>/g;
const COMMANDS_REGEX = /(?:\r?\n){2}COMMANDS\r?\n/;
const POSITIONALS_REGEX = /(?:\r?\n){2}POSITIONALS\r?\n/;
const GLOBAL_FLAGS_REGEX = /(?:\r?\n){2}GLOBAL FLAGS\r?\n/;
const OPTIONS_REGEX = /(?:\r?\n){2}OPTIONS\r?\n/;
const EXAMPLES_REGEX = /(?:\r?\n){2}EXAMPLES\r?\n/;
const HELP_END =
	"Please report any issues to https://github.com/cloudflare/workers-sdk/issues/new/choose";

function run(cmd: string) {
	return execSync(cmd).toString();
}

function removePositionalsFromCommand(str: string) {
	const matches = str.matchAll(WORDS_IN_BRACKETS_REGEX);

	if (matches) {
		let line = str;

		for (const match of matches) {
			const start = line.indexOf(match[0]);
			const end = start + match[0].length;

			line = (line.substring(0, start) + line.substring(end)).trim();
		}

		return line;
	}

	return str;
}

function handlePositionals(str: string) {
	const start = str.match(POSITIONALS_REGEX);
	const end = str.match(GLOBAL_FLAGS_REGEX);

	if (!start || !end) {
		throw new Error("Oops");
	}

	const output = str.substring(
		str.indexOf(start[0]) + start[0].length,
		str.indexOf(end[0]),
	);

	let lines = output.split("\n");

	lines = lines.filter(Boolean);
	lines = lines.map((x) => x.trim());

	return lines.map((x) => {
		const [name, description, type] = x.split(TWO_OR_MORE_SPACES_REGEX);

		return {
			name,
			description,
			type,
		};
	});
}

function handleOptions(str: string) {
	const start = str.match(OPTIONS_REGEX);
	const end = str.match(EXAMPLES_REGEX) ?? str.length;

	if (!start || !end) {
		throw new Error("Oops");
	}

	const output = str.substring(
		str.indexOf(start[0]) + start[0].length,
		typeof end === "number" ? end : str.indexOf(end[0]),
	);

	let lines = output.split("\n");

	lines = lines.filter(Boolean);
	lines = lines.map((x) => x.trim());

	const options: string[] = [];
	let multiLineBuffer: string[] = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		const isOptionLine = line.startsWith("-");
		const isLastLine = i + 1 === lines.length;

		if (isOptionLine || isLastLine) {
			if (isLastLine) {
				options.push([...multiLineBuffer, line].join("\n"));
			} else {
				const nextLineIsOptionLine = lines[i + 1].startsWith("-");

				if (nextLineIsOptionLine) {
					options.push(line);
					continue;
				}
			}
		}

		multiLineBuffer.push(line);
	}

	return options
		.filter((x) => !x.includes("--------------------"))
		.map((x) => {
			let [flags, ...rest] = x.split(/[^\S\r\n]{2,}/);
			let description = rest.join("\n");

			const match = description.match(/\[.*\]/g);

			let type;
			if (match) {
				[type] = match;

				const start = description.indexOf(type);
				const end = start + type.length;

				description =
					description.substring(0, start) + description.substring(end);
			}

			return {
				flags,
				description,
				type,
			};
		});
}

function handleSubcommands(str: string) {
	const start = str.match(COMMANDS_REGEX);
	const end = str.match(GLOBAL_FLAGS_REGEX);

	const isNamespace = start && end;

	if (isNamespace) {
		const output = str.substring(
			str.indexOf(start[0]) + start[0].length,
			str.indexOf(end[0]),
		);

		let lines = output.split("\n");

		lines = lines.filter(Boolean);
		lines = lines.map((x) => x.trim());
		lines = lines.map((x) => x.split(TWO_OR_MORE_SPACES_REGEX).at(0) as string);
		lines = lines.map(removePositionalsFromCommand);

		if (lines) {
			for (const line of lines) {
				handleSubcommands(run(`${line} --help`));
			}
		}
	} else {
		const [example, _, description] = str.split("\n");
		const command = removePositionalsFromCommand(example);

		json[command] = {
			example,
			description,
		};

		const hasPositionals = str.indexOf("POSITIONALS") !== -1;
		const hasOptions = str.indexOf("OPTIONS") !== -1;

		if (hasPositionals) {
			json[command]["positionals"] = handlePositionals(str);
		}

		if (hasOptions) {
			json[command]["options"] = handleOptions(str);
		}
	}
}

const json: Record<string, any> = {};

function main() {
	const topLevelHelp = run("wrangler --help");

	handleSubcommands(topLevelHelp);

	writeFileSync(
		"./src/content/wrangler-commands/index.json",
		JSON.stringify(json, null, "\t"),
	);
}

await main();
