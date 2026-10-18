import { readFile, readdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { format, resolveConfig } from "prettier";

import { configExplorerMetadata } from "./config-explorer-jsdoc.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");

async function loadTypeScript() {
	const require = createRequire(import.meta.url);
	try {
		return require("typescript");
	} catch {
		const pnpmRoot = join(repoRoot, "node_modules/.pnpm");
		const entries = await readdir(pnpmRoot);
		const entry = entries
			.filter((name) => name.startsWith("typescript@"))
			.sort()
			.at(-1);
		if (!entry) {
			throw new Error("Unable to resolve TypeScript");
		}
		return import(
			pathToFileURL(
				join(pnpmRoot, entry, "node_modules/typescript/lib/typescript.js"),
			)
		);
	}
}

async function resolveDeclarations() {
	const explicit = process.argv.find((arg) =>
		arg.startsWith("--declarations="),
	);
	if (explicit) {
		return resolve(explicit.slice("--declarations=".length));
	}

	const packageRoot = resolve(repoRoot, "node_modules/@cloudflare/config");
	const dist = join(packageRoot, "dist");
	const declaration = (await readdir(dist)).find(
		(name) => name.startsWith("public-") && name.endsWith(".d.mts"),
	);
	if (!declaration) {
		throw new Error(`Unable to find bundled declarations in ${dist}`);
	}
	return join(dist, declaration);
}

function clean(value) {
	return value.replace(/\s+/g, " ").trim();
}

function jsDocText(ts, node) {
	const blocks = node.jsDoc ?? [];
	const description = blocks
		.map((block) =>
			typeof block.comment === "string"
				? block.comment
				: ts.displayPartsToString(block.comment ?? []),
		)
		.filter(Boolean)
		.join("\n\n");
	const tags = {};
	for (const block of blocks) {
		for (const tag of block.tags ?? []) {
			const value =
				typeof tag.comment === "string"
					? tag.comment
					: ts.displayPartsToString(tag.comment ?? []);
			(tags[tag.tagName.text] ??= []).push(clean(value || "true"));
		}
	}
	return { description: clean(description), tags };
}

function lastTag(docs, name) {
	return docs.tags[name]?.at(-1);
}

function propertyName(node, sourceFile) {
	return node.name?.getText(sourceFile).replace(/^['"]|['"]$/g, "") ?? "";
}

function typeText(node, sourceFile) {
	return clean(node.type?.getText(sourceFile) ?? "unknown");
}

function extractChildren(ts, typeNode, sourceFile, declarations, depth = 0) {
	if (depth >= 4) {
		return [];
	}
	function membersFor(node, seen = new Set()) {
		if (!node) {
			return [];
		}
		if (ts.isTypeLiteralNode(node)) {
			return [...node.members];
		}
		if (ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node)) {
			return node.types.flatMap((child) => membersFor(child, seen));
		}
		if (ts.isArrayTypeNode(node)) {
			return membersFor(node.elementType, seen);
		}
		if (ts.isTypeReferenceNode(node)) {
			const name = node.typeName.getText();
			if (name === "Array" && node.typeArguments?.[0]) {
				return membersFor(node.typeArguments[0], seen);
			}
			if (seen.has(name)) {
				return [];
			}
			seen.add(name);
			const declaration = declarations.get(name);
			if (declaration && ts.isInterfaceDeclaration(declaration)) {
				return [...declaration.members];
			}
			if (declaration && ts.isTypeAliasDeclaration(declaration)) {
				return membersFor(declaration.type, seen);
			}
		}
		return [];
	}

	const members = membersFor(typeNode);
	if (!members) {
		return [];
	}
	return members
		.filter((member) => member.name)
		.map((member) => {
			const docs = jsDocText(ts, member);
			const name = propertyName(member, sourceFile);
			return {
				name,
				type: typeText(member, sourceFile),
				required: !member.questionToken,
				...configExplorerMetadata(docs, name),
				default: lastTag(docs, "default"),
				children: extractChildren(
					ts,
					member.type,
					sourceFile,
					declarations,
					depth + 1,
				),
			};
		});
}

function extractProperties(ts, declaration, sourceFile, declarations) {
	return declaration.members
		.filter((member) => member.name)
		.map((member) => {
			const docs = jsDocText(ts, member);
			const name = propertyName(member, sourceFile);
			return {
				id: `${declaration.name.text}.${name}`,
				name,
				type: typeText(member, sourceFile),
				required: !member.questionToken,
				...configExplorerMetadata(docs, `${declaration.name.text}.${name}`),
				default: lastTag(docs, "default"),
				internal: Boolean(lastTag(docs, "internal")),
				children: extractChildren(ts, member.type, sourceFile, declarations),
			};
		});
}

function overloadSuffix(name, parameterType) {
	if (name !== "durableObject") {
		return "default";
	}
	if (parameterType.includes("Created")) {
		return "created";
	}
	if (parameterType.includes("Deleted")) {
		return "deleted";
	}
	if (parameterType.includes("Renamed")) {
		return "renamed";
	}
	if (
		parameterType.includes("Transferred") &&
		!parameterType.includes("Expecting")
	) {
		return "transferred";
	}
	if (parameterType.includes("Expecting")) {
		return "expecting-transfer";
	}
	return "all";
}

function extractMethods(ts, declaration, sourceFile, declarations) {
	return declaration.members
		.filter((member) => ts.isMethodSignature(member) && member.name)
		.map((member) => {
			const docs = jsDocText(ts, member);
			const parameter = member.parameters[0];
			const parameterType = typeText(parameter ?? {}, sourceFile);
			const name = propertyName(member, sourceFile);
			return {
				id: `${declaration.name.text}.${name}.${overloadSuffix(name, parameterType)}`,
				name,
				signature: clean(member.getText(sourceFile)),
				...configExplorerMetadata(docs, `${declaration.name.text}.${name}`),
				parameterType,
				parameterOptional: Boolean(parameter?.questionToken),
				children: extractChildren(
					ts,
					parameter?.type,
					sourceFile,
					declarations,
				),
			};
		});
}

const ts = await loadTypeScript();
const declarationPath = await resolveDeclarations();
const source = await readFile(declarationPath, "utf8");
const sourceFile = ts.createSourceFile(
	declarationPath,
	source,
	ts.ScriptTarget.Latest,
	true,
	ts.ScriptKind.TS,
);
const declarations = new Map();

function collect(node) {
	if (
		(ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
		node.name
	) {
		declarations.set(node.name.text, node);
	}
	ts.forEachChild(node, collect);
}
collect(sourceFile);

const packageJson = JSON.parse(
	await readFile(resolve(declarationPath, "../../package.json"), "utf8"),
);
const required = (name) => {
	const declaration = declarations.get(name);
	if (!declaration || !ts.isInterfaceDeclaration(declaration)) {
		throw new Error(`Missing interface ${name}`);
	}
	return declaration;
};

const reference = {
	package: packageJson.name,
	version: packageJson.version,
	config: [
		...extractProperties(ts, required("Settings"), sourceFile, declarations),
		...extractProperties(
			ts,
			required("CloudflareConfig"),
			sourceFile,
			declarations,
		),
	].filter((field) => field.name !== "type" && !field.internal),
	worker: extractProperties(
		ts,
		required("WorkerConfig"),
		sourceFile,
		declarations,
	).filter((field) => field.name !== "type" && !field.internal),
	context: extractProperties(
		ts,
		required("ConfigContext"),
		sourceFile,
		declarations,
	),
	bindings: extractMethods(ts, required("Bindings"), sourceFile, declarations),
	triggers: extractMethods(ts, required("Triggers"), sourceFile, declarations),
	exports: extractMethods(
		ts,
		required("Exports"),
		sourceFile,
		declarations,
	).filter((method) => !method.id.endsWith(".all")),
};

const outputPath = join(
	repoRoot,
	"src/components/config-explorer/config-reference.generated.ts",
);
const output = `// Generated by bin/generate-cf-config-reference.mjs from @cloudflare/config declarations.\nexport const CONFIG_REFERENCE = ${JSON.stringify(reference, null, 2)};\n`;
const prettierConfig = (await resolveConfig(outputPath)) ?? {};
await writeFile(
	outputPath,
	await format(output, { ...prettierConfig, filepath: outputPath }),
);
console.log(
	`Generated config reference from ${packageJson.name} ${packageJson.version}: ` +
		`${reference.config.length} config fields, ${reference.worker.length} worker fields, ` +
		`${reference.bindings.length} bindings, ${reference.triggers.length} triggers, ` +
		`${reference.exports.length} exports.`,
);
