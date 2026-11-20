import { CONFIG_REFERENCE } from "./config-reference.generated";

export interface ReferenceProperty {
	name: string;
	type: string;
	required: boolean;
	description: string;
	default?: string;
	links?: ReferenceLink[];
	children: ReferenceProperty[];
}

export interface ReferenceLink {
	label: string;
	url: string;
}

export interface ConfigReference {
	id: string;
	name: string;
	type?: string;
	required?: boolean;
	description: string;
	default?: string;
	links?: ReferenceLink[];
	internal?: boolean;
	signature?: string;
	parameterType?: string;
	parameterOptional?: boolean;
	children: ReferenceProperty[];
}

export interface CodeLineSegment {
	text: string;
	ref?: string;
}

export interface CodeLine {
	text: string;
	segments: CodeLineSegment[];
}

interface ReferenceSegment {
	ref: ConfigReference;
	label?: string;
}

type CodeSegment = string | ReferenceSegment;

interface ExampleObjectProperty {
	name: string;
	value: string | ExampleObjectProperty[];
}

export const CATEGORY_LABELS = {
	config: "defineConfig",
	worker: "Worker",
	bindings: "Bindings",
	triggers: "Triggers",
	exports: "Exports",
};
export type Category = keyof typeof CATEGORY_LABELS;
const CONFIG_IMPORT_SOURCE = "cf/config";
const MAX_IMPORT_LINE_LENGTH = 70;

export const escapeHtml = (value = "") =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");

function argumentFor(ref: ConfigReference): CodeSegment[] {
	if (!ref.parameterType || ref.parameterType === "unknown") {
		return [];
	}
	if (ref.name === "text") {
		return ['"production"'];
	}
	if (ref.name === "json") {
		return ["{ feature: true }"];
	}
	if (ref.name === "secret") {
		return [];
	}
	if (ref.parameterOptional) {
		return [];
	}
	const required = uniqueRequiredChildren(ref.children);
	return required.length ? [] : ["{ /* settings */ }"];
}

function scalarExamplePropertyValue(
	property: ReferenceProperty,
	parentName?: string,
): string {
	// The default `exportName` suits `durableObject()`. A Workflow binding must
	// name a `WorkflowEntrypoint` class instead.
	if (property.name === "exportName" && parentName === "workflow") {
		return '"MyWorkflow"';
	}
	const namedValues: Record<string, string> = {
		destination: '"my-destination"',
		exportName: '"MyDurableObject"',
		id: '"resource-id"',
		name: '"my-resource"',
		namespace: '"my-namespace"',
		networkId: '"network-id"',
		secretName: '"my-secret"',
		storeId: '"store-id"',
		tunnelId: '"tunnel-id"',
		worker: '"my-worker"',
	};
	if (namedValues[property.name]) {
		return namedValues[property.name];
	}
	const stringLiteral = property.type.match(/^"([^"]+)"/);
	if (stringLiteral) {
		return `"${stringLiteral[1]}"`;
	}
	const numberLiteral = property.type.match(/^\d+/);
	if (numberLiteral) {
		return numberLiteral[0];
	}
	if (property.type.includes("[]")) {
		return "[]";
	}
	if (property.type.includes("number")) {
		return "1";
	}
	if (property.type.includes("boolean")) {
		return "true";
	}
	return '"value"';
}

function uniqueRequiredChildren(children: ReferenceProperty[]) {
	return children.filter(
		(child, index) =>
			child.required &&
			children.findIndex((candidate) => candidate.name === child.name) ===
				index,
	);
}

function refLine(
	indent: number,
	before: string,
	ref: ConfigReference,
	after: string,
): CodeLine {
	return refsLine(indent, [before, { ref }, after]);
}

function refsLine(indent: number, segments: CodeSegment[]): CodeLine {
	const indentation = " ".repeat(indent);
	return {
		text:
			indentation +
			segments
				.map((segment) =>
					typeof segment === "string"
						? segment
						: (segment.label ?? segment.ref.name),
				)
				.join(""),
		segments: [
			{ text: indentation },
			...segments.map((segment) =>
				typeof segment === "string"
					? { text: segment }
					: { text: segment.label ?? segment.ref.name, ref: segment.ref.id },
			),
		].filter((segment) => segment.text),
	};
}

function plainLine(indent: number, text: string): CodeLine {
	return {
		text: `${" ".repeat(indent)}${text}`,
		segments: text ? [{ text: `${" ".repeat(indent)}${text}` }] : [],
	};
}

function indentLines(lines: CodeLine[], indent: number): CodeLine[] {
	const indentation = " ".repeat(indent);
	return lines.map((line) => ({
		text: `${indentation}${line.text}`,
		segments: line.segments.length
			? [{ text: indentation }, ...line.segments]
			: [],
	}));
}

function configImportLines(names: string[]): CodeLine[] {
	const singleLine = `import { ${names.join(", ")} } from "${CONFIG_IMPORT_SOURCE}";`;
	if (singleLine.length <= MAX_IMPORT_LINE_LENGTH) {
		return [plainLine(0, singleLine)];
	}
	return [
		plainLine(0, "import {"),
		...names.map((name) => plainLine(2, `${name},`)),
		plainLine(0, `} from "${CONFIG_IMPORT_SOURCE}";`),
	];
}

function entrypointImportLine() {
	return plainLine(
		0,
		'import * as entrypoint from "./src/index" with { type: "cf-worker" };',
	);
}

function workerConfigLines(
	workerLines: CodeLine[],
	opening: CodeSegment[] = ["export default defineConfig({"],
	closing = "});",
) {
	const worker = requireReference(CONFIG_REFERENCE.config, "worker");
	return [
		refsLine(0, opening),
		refLine(2, "", worker, ": {"),
		...indentLines(workerLines, 2),
		plainLine(2, "},"),
		plainLine(0, closing),
	];
}

function requireReference(
	references: readonly ConfigReference[],
	name: string,
	idSuffix?: string,
) {
	const reference = references.find(
		(candidate) =>
			candidate.name === name &&
			(!idSuffix || candidate.id.endsWith(`.${idSuffix}`)),
	);
	if (!reference) {
		throw new Error(`Missing generated reference for ${name}`);
	}
	return reference;
}

export function toChildReference(
	parent: ConfigReference,
	property: ReferenceProperty,
): ConfigReference {
	return {
		id: `${parent.id}.${property.name}`,
		name: property.name,
		type: property.type,
		required: property.required,
		description: property.description,
		default: property.default,
		links: property.links,
		children: property.children,
	};
}

function requireChildReference(parent: ConfigReference, name: string) {
	const property = parent.children.find((child) => child.name === name);
	if (!property) {
		throw new Error(`Missing generated reference for ${parent.id}.${name}`);
	}
	return toChildReference(parent, property);
}

function exampleObjectLines(
	parent: ConfigReference,
	properties: ExampleObjectProperty[],
	indent: number,
	opening: CodeSegment[],
	closing: string,
): CodeLine[] {
	return [
		refsLine(indent, [...opening, "{"]),
		...properties.flatMap((property) => {
			const ref = requireChildReference(parent, property.name);
			if (Array.isArray(property.value)) {
				return exampleObjectLines(
					ref,
					property.value,
					indent + 2,
					[{ ref }, ": "],
					"},",
				);
			}
			return refsLine(indent + 2, [{ ref }, `: ${property.value},`]);
		}),
		plainLine(indent, closing),
	];
}

function generatedObjectLines(
	parent: ConfigReference,
	properties: ReferenceProperty[],
	indent: number,
	opening: CodeSegment[],
	closing: string,
): CodeLine[] {
	return [
		refsLine(indent, [...opening, "{"]),
		...properties.flatMap((property) => {
			const ref = toChildReference(parent, property);
			const required = uniqueRequiredChildren(property.children);
			if (property.children.length) {
				if (!required.length) {
					return refsLine(indent + 2, [{ ref }, ": { /* settings */ },"]);
				}
				return generatedObjectLines(
					ref,
					required,
					indent + 2,
					[{ ref }, ": "],
					"},",
				);
			}
			return refsLine(indent + 2, [
				{ ref },
				`: ${scalarExamplePropertyValue(property, parent.name)},`,
			]);
		}),
		plainLine(indent, closing),
	];
}

function workerLines() {
	const mode = requireReference(CONFIG_REFERENCE.context, "mode");
	const textBinding = requireReference(CONFIG_REFERENCE.bindings, "text");
	const d1Binding = requireReference(CONFIG_REFERENCE.bindings, "d1");
	const r2Binding = requireReference(CONFIG_REFERENCE.bindings, "r2");
	const scheduledTrigger = requireReference(
		CONFIG_REFERENCE.triggers,
		"scheduled",
	);
	const workerExport = requireReference(
		CONFIG_REFERENCE.exports,
		"worker",
		"default",
	);
	const durableObjectExport = requireReference(
		CONFIG_REFERENCE.exports,
		"durableObject",
		"created",
	);
	const value: Record<string, string> = {
		name: 'mode === "staging" ? "images-staging" : "images"',
		compatibilityDate: '"<COMPATIBILITY_DATE>"',
		compatibilityFlags: '["nodejs_compat"]',
		domains: '["images.example.com"]',
		logpush: "true",
		workersDev: "false",
		previewUrls: "true",
	};
	return [
		...configImportLines(["bindings", "defineConfig", "exports", "triggers"]),
		entrypointImportLine(),
		plainLine(0, ""),
		...workerConfigLines(
			CONFIG_REFERENCE.worker.flatMap((ref) => {
				if (ref.name === "entrypoint") {
					return refLine(2, "", ref, ",");
				}
				if (ref.name === "env") {
					return [
						refLine(2, "", ref, ": {"),
						refLine(
							4,
							"API_ORIGIN: bindings.",
							textBinding,
							'("https://api.example.com"),',
						),
						...exampleObjectLines(
							d1Binding,
							[{ name: "name", value: '"images-db"' }],
							4,
							["DATABASE: bindings.", { ref: d1Binding }, "("],
							"}),",
						),
						...exampleObjectLines(
							r2Binding,
							[{ name: "name", value: '"source-images"' }],
							4,
							["IMAGES: bindings.", { ref: r2Binding }, "("],
							"}),",
						),
						plainLine(2, "},"),
					];
				}
				if (ref.name === "triggers") {
					return [
						refLine(2, "", ref, ": ["),
						...exampleObjectLines(
							scheduledTrigger,
							[{ name: "schedule", value: '"0 * * * *"' }],
							4,
							["triggers.", { ref: scheduledTrigger }, "("],
							"}),",
						),
						plainLine(2, "],"),
					];
				}
				if (ref.name === "exports") {
					return [
						refLine(2, "", ref, ": {"),
						...exampleObjectLines(
							workerExport,
							[
								{
									name: "cache",
									value: [{ name: "enabled", value: "true" }],
								},
							],
							4,
							["Admin: exports.", { ref: workerExport }, "("],
							"}),",
						),
						...exampleObjectLines(
							durableObjectExport,
							[{ name: "storage", value: '"sqlite"' }],
							4,
							["Counter: exports.", { ref: durableObjectExport }, "("],
							"}),",
						),
						plainLine(2, "},"),
					];
				}
				if (ref.name === "assets") {
					return exampleObjectLines(
						ref,
						[{ name: "htmlHandling", value: '"auto-trailing-slash"' }],
						2,
						[{ ref }, ": "],
						"},",
					);
				}
				if (ref.name === "tailConsumers") {
					return [
						refLine(2, "", ref, ": ["),
						...exampleObjectLines(
							ref,
							[
								{ name: "worker", value: '"log-sink"' },
								{ name: "streaming", value: "true" },
							],
							4,
							[],
							"},",
						),
						plainLine(2, "],"),
					];
				}
				if (ref.name === "cache") {
					return exampleObjectLines(
						ref,
						[
							{ name: "enabled", value: "true" },
							{ name: "crossVersionCache", value: "true" },
						],
						2,
						[{ ref }, ": "],
						"},",
					);
				}
				if (ref.name === "placement") {
					return exampleObjectLines(
						ref,
						[{ name: "mode", value: '"smart"' }],
						2,
						[{ ref }, ": "],
						"},",
					);
				}
				if (ref.name === "limits") {
					return exampleObjectLines(
						ref,
						[
							{ name: "cpuMs", value: "50" },
							{ name: "subrequests", value: "100" },
						],
						2,
						[{ ref }, ": "],
						"},",
					);
				}
				if (ref.name === "observability") {
					return exampleObjectLines(
						ref,
						[
							{ name: "enabled", value: "true" },
							{
								name: "logs",
								value: [{ name: "persist", value: "true" }],
							},
							{
								name: "traces",
								value: [{ name: "persist", value: "true" }],
							},
						],
						2,
						[{ ref }, ": "],
						"},",
					);
				}
				if (ref.name === "unsafe") {
					return exampleObjectLines(
						ref,
						[{ name: "metadata", value: '{ build: "docs-example" }' }],
						2,
						[{ ref }, ": "],
						"},",
					);
				}
				return refLine(2, "", ref, `: ${value[ref.name] ?? "undefined"},`);
			}),
			["export default defineConfig(({ ", { ref: mode }, " }) => ({"],
			"}));",
		),
	];
}

function bindingLines(): CodeLine[] {
	const name = requireReference(CONFIG_REFERENCE.worker, "name");
	const entrypoint = requireReference(CONFIG_REFERENCE.worker, "entrypoint");
	const compatibilityDate = requireReference(
		CONFIG_REFERENCE.worker,
		"compatibilityDate",
	);
	const env = requireReference(CONFIG_REFERENCE.worker, "env");
	return [
		...configImportLines(["bindings", "defineConfig"]),
		entrypointImportLine(),
		plainLine(0, ""),
		...workerConfigLines([
			refLine(2, "", name, ': "binding-showcase",'),
			refLine(2, "", entrypoint, ","),
			refLine(2, "", compatibilityDate, ': "<COMPATIBILITY_DATE>",'),
			refLine(2, "", env, ": {"),
			...CONFIG_REFERENCE.bindings.flatMap((ref) => {
				const binding = `MY_${ref.name.replace(/([a-z])([A-Z])/g, "$1_$2").toUpperCase()}`;
				const required = uniqueRequiredChildren(ref.children);
				if (required.length) {
					return generatedObjectLines(
						ref,
						required,
						4,
						[`${binding}: bindings.`, { ref }, "("],
						"}),",
					);
				}
				return refsLine(4, [
					`${binding}: bindings.`,
					{ ref },
					"(",
					...argumentFor(ref),
					"),",
				]);
			}),
			plainLine(2, "},"),
		]),
	];
}

function triggerLines() {
	const name = requireReference(CONFIG_REFERENCE.worker, "name");
	const entrypoint = requireReference(CONFIG_REFERENCE.worker, "entrypoint");
	const compatibilityDate = requireReference(
		CONFIG_REFERENCE.worker,
		"compatibilityDate",
	);
	const triggers = requireReference(CONFIG_REFERENCE.worker, "triggers");
	const args: Record<string, ExampleObjectProperty[]> = {
		fetch: [
			{ name: "pattern", value: '"example.com/*"' },
			{ name: "zone", value: '"example.com"' },
		],
		queue: [
			{ name: "name", value: '"jobs"' },
			{ name: "maxBatchSize", value: "20" },
		],
		scheduled: [{ name: "schedule", value: '"0 * * * *"' }],
		email: [{ name: "addresses", value: '["support@example.com"]' }],
		connect: [
			{ name: "protocol", value: '"tcp"' },
			{ name: "port", value: "5432" },
		],
	};
	return [
		...configImportLines(["defineConfig", "triggers"]),
		entrypointImportLine(),
		plainLine(0, ""),
		...workerConfigLines([
			refLine(2, "", name, ': "trigger-showcase",'),
			refLine(2, "", entrypoint, ","),
			refLine(2, "", compatibilityDate, ': "<COMPATIBILITY_DATE>",'),
			refLine(2, "", triggers, ": ["),
			...CONFIG_REFERENCE.triggers.flatMap((ref) =>
				args[ref.name]
					? exampleObjectLines(
							ref,
							args[ref.name],
							4,
							["triggers.", { ref }, "("],
							"}),",
						)
					: refLine(4, "triggers.", ref, "({ /* settings */ }),"),
			),
			plainLine(2, "],"),
		]),
	];
}

function exportLines() {
	const name = requireReference(CONFIG_REFERENCE.worker, "name");
	const entrypoint = requireReference(CONFIG_REFERENCE.worker, "entrypoint");
	const compatibilityDate = requireReference(
		CONFIG_REFERENCE.worker,
		"compatibilityDate",
	);
	const exports = requireReference(CONFIG_REFERENCE.worker, "exports");
	const examples: Record<string, [string, ExampleObjectProperty[]]> = {
		created: ["LiveClass: exports.", [{ name: "storage", value: '"sqlite"' }]],
		deleted: [
			"RemovedClass: exports.",
			[{ name: "state", value: '"deleted"' }],
		],
		renamed: [
			"OldClass: exports.",
			[
				{ name: "state", value: '"renamed"' },
				{ name: "renamedTo", value: '"NewClass"' },
			],
		],
		transferred: [
			"OutgoingClass: exports.",
			[
				{ name: "state", value: '"transferred"' },
				{ name: "transferredTo", value: '"target-worker"' },
			],
		],
		"expecting-transfer": [
			"IncomingClass: exports.",
			[
				{ name: "state", value: '"expecting-transfer"' },
				{ name: "storage", value: '"sqlite"' },
				{ name: "transferFrom", value: '"source-worker"' },
			],
		],
		default: [
			"ApiEntrypoint: exports.",
			[
				{
					name: "cache",
					value: [{ name: "enabled", value: "true" }],
				},
			],
		],
		workflow: [
			"CheckoutWorkflow: exports.",
			[
				{ name: "name", value: '"checkout-workflow"' },
				{
					name: "limits",
					value: [{ name: "steps", value: "100" }],
				},
			],
		],
	};
	return [
		...configImportLines(["defineConfig", "exports"]),
		entrypointImportLine(),
		plainLine(0, ""),
		...workerConfigLines([
			refLine(2, "", name, ': "export-showcase",'),
			refLine(2, "", entrypoint, ","),
			refLine(2, "", compatibilityDate, ': "<COMPATIBILITY_DATE>",'),
			refLine(2, "", exports, ": {"),
			...CONFIG_REFERENCE.exports.flatMap((ref) => {
				const suffix = ref.id.split(".").at(-1) ?? "default";
				// Builders without overloads share the "default" suffix, so look up
				// builder-specific examples by name first.
				const [before, properties] =
					examples[ref.name] ?? examples[suffix] ?? examples.default;
				return exampleObjectLines(
					ref,
					properties,
					4,
					[before, { ref }, "("],
					"}),",
				);
			}),
			plainLine(2, "},"),
		]),
	];
}

function configLines() {
	const context = CONFIG_REFERENCE.context.flatMap(
		(ref, index): CodeSegment[] => (index ? [", ", { ref }] : [{ ref }]),
	);
	const name = requireReference(CONFIG_REFERENCE.worker, "name");
	const entrypoint = requireReference(CONFIG_REFERENCE.worker, "entrypoint");
	const compatibilityDate = requireReference(
		CONFIG_REFERENCE.worker,
		"compatibilityDate",
	);
	const exampleValues: Record<string, string> = {
		accountId: '"<ACCOUNT_ID>"',
		complianceRegion: 'mode === "fedramp" ? "fedramp-high" : "public"',
		containers: "[]",
	};
	return [
		...configImportLines(["defineConfig"]),
		entrypointImportLine(),
		plainLine(0, ""),
		refsLine(0, ["export default defineConfig(({ ", ...context, " }) => ({"]),
		...CONFIG_REFERENCE.config.flatMap((ref) => {
			if (ref.name === "worker") {
				return [
					refLine(2, "", ref, ": {"),
					refLine(
						4,
						"",
						name,
						': isPreview ? "example-preview" : "example-worker",',
					),
					refLine(4, "", entrypoint, ","),
					refLine(4, "", compatibilityDate, ': "<COMPATIBILITY_DATE>",'),
					plainLine(2, "},"),
				];
			}
			return refLine(
				2,
				"",
				ref,
				`: ${exampleValues[ref.name] ?? "undefined"},`,
			);
		}),
		plainLine(0, "}));"),
	];
}

const LINE_FACTORIES: Record<Category, () => CodeLine[]> = {
	config: configLines,
	worker: workerLines,
	bindings: bindingLines,
	triggers: triggerLines,
	exports: exportLines,
};

export function buildCategoryLines(category: Category): CodeLine[] {
	const factory = LINE_FACTORIES[category];
	if (!factory) {
		throw new Error(`Unknown config explorer category: ${category}`);
	}
	return factory();
}

export function allReferences(): ConfigReference[] {
	const topLevel = [
		...CONFIG_REFERENCE.config,
		...CONFIG_REFERENCE.worker,
		...CONFIG_REFERENCE.bindings,
		...CONFIG_REFERENCE.triggers,
		...CONFIG_REFERENCE.exports,
		...CONFIG_REFERENCE.context,
	];
	const references = new Map<string, ConfigReference>();

	function addReference(ref: ConfigReference) {
		if (!references.has(ref.id)) {
			references.set(ref.id, ref);
		}
		for (const property of ref.children) {
			addReference(toChildReference(ref, property));
		}
	}

	for (const ref of topLevel) {
		addReference(ref);
	}
	return [...references.values()];
}

export function categoryCount(category: Category) {
	if (category === "config") {
		return CONFIG_REFERENCE.config.length + CONFIG_REFERENCE.context.length;
	}
	return CONFIG_REFERENCE[category].length;
}

export const CONFIG_SOURCE = {
	package: CONFIG_REFERENCE.package,
	version: CONFIG_REFERENCE.version,
};
