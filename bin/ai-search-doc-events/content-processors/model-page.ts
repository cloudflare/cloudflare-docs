import { join } from "node:path";
import type { ContentTransformer, RawSection } from "../types";
import { MAX_SECTION_TEXT_LENGTH, sha256, truncateText } from "../shared";
import {
	asArray,
	asRecord,
	asString,
	compactLine,
	excerpt,
	readJsonFile,
} from "./data";

function collectSchemaFields(
	schema: unknown,
	prefix = "",
	limit = 40,
): string[] {
	const fields: string[] = [];
	const visit = (value: unknown, path: string) => {
		if (fields.length >= limit) return;
		const record = asRecord(value);
		if (!record) return;

		const properties = asRecord(record.properties);
		if (properties) {
			for (const [name, prop] of Object.entries(properties)) {
				if (fields.length >= limit) break;
				const propRecord = asRecord(prop) ?? {};
				const fieldPath = path ? `${path}.${name}` : name;
				const type = asString(propRecord.type);
				const description = asString(propRecord.description);
				fields.push(
					[fieldPath, type ? `(${type})` : undefined, description]
						.filter(Boolean)
						.join(" "),
				);
				visit(prop, fieldPath);
			}
		}

		for (const key of ["oneOf", "anyOf", "allOf"] as const) {
			for (const item of asArray(record[key])) visit(item, path);
		}
		if (record.items) visit(record.items, path ? `${path}[]` : "[]");
	};

	visit(schema, prefix);
	return fields;
}

function codeSnippetSummary(snippets: unknown, limit = 2) {
	return asArray(snippets)
		.slice(0, limit)
		.map((snippet) => {
			const record = asRecord(snippet) ?? {};
			return [
				asString(record.label) ?? asString(record.language) ?? "Code",
				excerpt(record.code, 1_200),
			]
				.filter(Boolean)
				.join("\n");
		})
		.filter(Boolean);
}

async function modelSectionsForPath(
	path: string,
	pageTitle: string,
): Promise<RawSection[] | undefined> {
	const aiModelMatch = path.match(/^\/ai\/models\/(.+)\/$/);
	const workersAiMatch = path.match(/^\/workers-ai\/models\/([^/]+)\/$/);
	const modelPath = aiModelMatch?.[1] ?? workersAiMatch?.[1];
	if (!modelPath) throw new Error(`Invalid model page path: ${path}`);
	const catalogPath = join(
		"src/content/catalog-models",
		`${modelPath.split("/").join("-")}.json`,
	);
	const workersAiPath = join(
		"src/content/workers-ai-models",
		`${modelPath.split("/").at(-1)}.json`,
	);
	const raw =
		(await readJsonFile(catalogPath)) ?? (await readJsonFile(workersAiPath));
	const model = asRecord(raw);
	if (!model) return undefined;

	const modelId = asString(model.model_id) ?? asString(model.name) ?? modelPath;
	const task =
		asString(model.task) ?? asString(asRecord(model.task)?.name) ?? undefined;
	const overview = [
		compactLine("Model", modelId),
		compactLine("Display name", model.name),
		compactLine("Provider", model.provider_id),
		compactLine("Task", task),
		compactLine("Tags", model.tags),
		compactLine("Context length", model.context_length),
		compactLine("Max output tokens", model.max_output_tokens),
		compactLine("Request formats", model.request_formats),
		compactLine("Zero data retention", model.zdr),
		compactLine("External info", model.external_info),
		compactLine("Terms", model.terms),
		asString(model.description),
	]
		.filter(Boolean)
		.join("\n");

	const schemaRecord = asRecord(model.schema);
	const schemaFields = [
		...collectSchemaFields(schemaRecord?.input, "input", 30),
		...collectSchemaFields(schemaRecord?.output, "output", 20),
	];
	const schemaText = schemaFields.length
		? [
				"Schema field summary",
				...schemaFields.map((field) => `- ${field}`),
			].join("\n")
		: undefined;

	const exampleLines = asArray(model.examples)
		.slice(0, 8)
		.flatMap((example, index) => {
			const record = asRecord(example) ?? {};
			const input = excerpt(record.input, 500);
			const outputRecord = asRecord(record.output);
			const output = excerpt(outputRecord?.text ?? outputRecord?.response, 700);
			return [
				`Example ${index + 1}: ${asString(record.name) ?? "Unnamed example"}`,
				asString(record.description),
				input ? `Input: ${input}` : undefined,
				output ? `Output excerpt: ${output}` : undefined,
				...codeSnippetSummary(record.code_snippets, 1).map(
					(snippet) => `Snippet:\n${snippet}`,
				),
			]
				.filter(Boolean)
				.join("\n");
		});
	const examplesText = exampleLines.length
		? ["Examples", ...exampleLines].join("\n\n")
		: undefined;

	const sections = [
		{ anchor: "overview", heading: pageTitle, text: overview },
		{ anchor: "schema", heading: "Schema summary", text: schemaText },
		{ anchor: "examples", heading: "Examples", text: examplesText },
	]
		.filter(
			(section): section is { anchor: string; heading: string; text: string } =>
				Boolean(section.text),
		)
		.map((section) => {
			const text = truncateText(section.text, MAX_SECTION_TEXT_LENGTH);
			return {
				...section,
				text,
				hash: sha256(text),
			};
		});

	return sections.length ? sections : undefined;
}

export const modelPageProcessor: ContentTransformer = {
	name: "model-page",
	transform: ({ path, title }) => modelSectionsForPath(path, title),
};
