import { readFile } from "node:fs/promises";
import { parse as parseYaml } from "yaml";
import type { ContentTransformer, RawSection } from "../types";
import { asArray, asRecord, asString, compactLine } from "./data";
import { makeSections } from "./utils";

async function rulesetFieldSectionsForPath(
	path: string,
): Promise<RawSection[] | undefined> {
	const fieldName = path.match(
		/^\/ruleset-engine\/rules-language\/fields\/reference\/([^/]+)\/$/,
	)?.[1];
	if (!fieldName) throw new Error(`Invalid ruleset field path: ${path}`);

	const source = await readFile("src/content/fields/index.yaml", "utf8");
	const entries = asArray(asRecord(parseYaml(source))?.entries);
	const entry = asRecord(
		entries.find((item) => asRecord(item)?.name === fieldName),
	);
	if (!entry) return undefined;

	const exampleValue = asString(entry.example_value);
	const exampleBlock = asString(entry.example_block);
	const text = [
		compactLine("Field", fieldName),
		compactLine("Data type", entry.data_type),
		compactLine("Categories", entry.categories),
		compactLine("Keywords", entry.keywords),
		compactLine("Plan information", entry.plan_info_label),
		asString(entry.summary),
		asString(entry.description),
		exampleValue ? `Example value:\n${exampleValue}` : undefined,
		exampleBlock ? `Example usage:\n${exampleBlock}` : undefined,
	]
		.filter(Boolean)
		.join("\n\n");

	return makeSections([{ anchor: "", heading: fieldName, text }]);
}

export const rulesetFieldProcessor: ContentTransformer = {
	name: "ruleset-field",
	transform: ({ path }) => rulesetFieldSectionsForPath(path),
};
