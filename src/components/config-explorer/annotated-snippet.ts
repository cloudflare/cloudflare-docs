import {
	annotateReference,
	KEYWORDS,
	slug,
	type AnnotatedLine,
	type AnnotatedReference,
} from "./annotated-config";
import {
	escapeHtml,
	toChildReference,
	type ConfigReference,
	type ReferenceProperty,
} from "./config-examples";
import { CONFIG_REFERENCE } from "./config-reference.generated";

/**
 * Annotates a hand-written `cloudflare.config.ts` snippet with references from
 * the generated `@cloudflare/config` metadata.
 *
 * The annotator is a small tokenizer plus a bracket-aware scanner, not a
 * TypeScript parser. It recognises the shapes used in documentation examples
 * and leaves everything else as plain, highlighted text. It never throws on
 * unfamiliar syntax.
 */

export interface AnnotatedSnippet {
	/** The dedented source, used for copying. Tabs are preserved. */
	code: string;
	lines: AnnotatedLine[];
}

type TokenType =
	| "comment"
	| "identifier"
	| "newline"
	| "number"
	| "punctuation"
	| "string"
	| "whitespace";

interface Token {
	type: TokenType;
	text: string;
}

type KeyScope = Map<string, ConfigReference>;

interface Frame {
	close: ")" | "]" | "}";
	kind: "array" | "block" | "object" | "paren" | "params";
	/** Object frames: references for keys and shorthand properties. */
	keys?: KeyScope;
	/** Array frames: references for keys of objects inside the array. */
	elementKeys?: KeyScope;
	/** Block frames: references for keys of an object after `return`. */
	returnKeys?: KeyScope;
	/** Params frames: the scope of the object the function returns. */
	result?: KeyScope;
	/** Params frames: `function (...)` rather than an arrow function. */
	functionKeyword?: boolean;
}

/** What the next significant token may start. */
type Expectation =
	| { kind: "value"; keys?: KeyScope; result?: KeyScope }
	| { kind: "arrow"; result: KeyScope }
	| { kind: "arrow-body"; result: KeyScope }
	| { kind: "function-name"; result: KeyScope }
	| { kind: "function-body"; result: KeyScope };

/** Visual width of a tab in the rendered example. */
const TAB_WIDTH = 2;

/** Builder namespaces exported from `cf/config`. */
const BUILDER_NAMESPACES = new Map<string, readonly ConfigReference[]>([
	["bindings", CONFIG_REFERENCE.bindings],
	["triggers", CONFIG_REFERENCE.triggers],
	["exports", CONFIG_REFERENCE.exports],
]);

/**
 * Keys whose values hold user-chosen names (bindings, exports) or builder
 * calls (triggers). Objects inside them are not annotated as config fields.
 */
const USER_KEYED_FIELDS = new Set([
	"WorkerConfig.env",
	"WorkerConfig.exports",
	"WorkerConfig.triggers",
]);

const SNIPPET_KEYWORDS = new Set([
	...KEYWORDS,
	"async",
	"await",
	"break",
	"case",
	"const",
	"else",
	"function",
	"if",
	"let",
	"new",
	"return",
	"satisfies",
	"switch",
	"throw",
	"typeof",
	"var",
]);

const FUNCTION_IDS = new Set([
	"defineConfig",
	"defineContainer",
	"defineWorker",
]);

/** Tokens after which `{` opens a block rather than an object literal. */
const BLOCK_PRECEDERS = new Set([
	")",
	";",
	"{",
	"}",
	"do",
	"else",
	"finally",
	"try",
]);

const TOKEN_PATTERNS: [TokenType, RegExp][] = [
	["newline", /\n/y],
	["whitespace", /[^\S\n]+/y],
	["comment", /\/\/[^\n]*/y],
	["comment", /\/\*[\s\S]*?(?:\*\/|$)/y],
	["string", /"(?:[^"\\\n]|\\.)*"?/y],
	["string", /'(?:[^'\\\n]|\\.)*'?/y],
	["string", /`(?:[^`\\]|\\[\s\S])*`?/y],
	["identifier", /[A-Za-z_$][\w$]*/y],
	["number", /\d[\w.]*/y],
	["punctuation", /=>|\.\.\.|\?\./y],
];

/** Removes surrounding blank lines and the indentation shared by all lines. */
export function dedentSnippet(code: string) {
	const lines = code
		.replace(/\r\n?/g, "\n")
		.split("\n")
		.map((line) => line.trimEnd());
	while (lines.length && !lines[0]) {
		lines.shift();
	}
	while (lines.length && !lines[lines.length - 1]) {
		lines.pop();
	}
	const indents = lines
		.filter(Boolean)
		.map((line) => /^[ \t]*/.exec(line)?.[0] ?? "");
	let prefix = indents[0] ?? "";
	for (const indent of indents) {
		while (!indent.startsWith(prefix)) {
			prefix = prefix.slice(0, -1);
		}
	}
	return lines.map((line) => line.slice(prefix.length)).join("\n");
}

export function tokenize(code: string): Token[] {
	const tokens: Token[] = [];
	let index = 0;
	while (index < code.length) {
		let matched: Token | undefined;
		for (const [type, pattern] of TOKEN_PATTERNS) {
			pattern.lastIndex = index;
			const match = pattern.exec(code);
			if (match?.[0]) {
				matched = { type, text: match[0] };
				break;
			}
		}
		// Anything else is a single character (or surrogate pair) of punctuation.
		matched ??= {
			type: "punctuation",
			text: String.fromCodePoint(code.codePointAt(index) ?? 0),
		};
		tokens.push(matched);
		index += matched.text.length;
	}
	return tokens;
}

function mergeProperties(
	parent: ConfigReference,
	properties: ReferenceProperty[],
): ConfigReference {
	const [first] = properties;
	// `never` marks a property that another union member excludes.
	const types = [
		...new Set(
			properties
				.map((property) => property.type)
				.filter((type) => type !== "never"),
		),
	];
	return {
		...toChildReference(parent, first),
		type: types.join(" | ") || "never",
		required: properties.every((property) => property.required),
		description: [
			...new Set(
				properties.flatMap((property) =>
					property.description ? [property.description] : [],
				),
			),
		].join(" "),
		default: properties.find((property) => property.default)?.default,
		links: properties.find((property) => property.links)?.links,
		children: properties.flatMap((property) => property.children),
	};
}

/**
 * Child references keyed by name. Union types can list the same property
 * more than once (for example `protocol: "tcp"` and `protocol: "udp"`), so
 * duplicates are merged into one reference.
 */
function childScope(parent: ConfigReference): KeyScope {
	const groups = new Map<string, ReferenceProperty[]>();
	for (const child of parent.children) {
		groups.set(child.name, [...(groups.get(child.name) ?? []), child]);
	}
	return new Map(
		[...groups].map(([name, properties]) => [
			name,
			properties.length === 1
				? toChildReference(parent, properties[0])
				: mergeProperties(parent, properties),
		]),
	);
}

function scopeOf(references: readonly ConfigReference[]): KeyScope {
	return new Map(references.map((ref) => [ref.name, ref]));
}

function asProperty(ref: ConfigReference): ReferenceProperty {
	return {
		name: ref.name,
		type: ref.type ?? "unknown",
		required: Boolean(ref.required),
		description: ref.description,
		children: [],
	};
}

/**
 * `cf/config` helpers. The generated reference covers their arguments but not
 * the helpers themselves, so their notes are written here from the
 * `@cloudflare/config` declarations.
 */
function functionReferences() {
	const context = new Intl.ListFormat("en", { type: "conjunction" }).format(
		CONFIG_REFERENCE.context.map((ref) => `\`${ref.name}\``),
	);
	const input = `a promise that resolves to one, or a function that receives the config context (${context}) and returns either.`;
	return {
		defineConfig: {
			id: "defineConfig",
			name: "defineConfig",
			signature:
				"defineConfig<T extends ConfigInput<CloudflareConfig>>(config: T): T;",
			description: `Defines the default export of \`cloudflare.config.ts\`. Pass a configuration object, ${input}`,
			children: CONFIG_REFERENCE.config.map(asProperty),
		},
		defineWorker: {
			id: "defineWorker",
			name: "defineWorker",
			signature:
				"defineWorker<T extends ConfigInput<WorkerConfig>>(config: T): T;",
			description: `Defines a Worker configuration that you can pass to \`worker\` in \`defineConfig()\`. Pass a Worker configuration object, ${input}`,
			children: CONFIG_REFERENCE.worker.map(asProperty),
		},
		// The generated reference does not include Container fields yet.
		defineContainer: {
			id: "defineContainer",
			name: "defineContainer",
			signature:
				"defineContainer<T extends ConfigInput<ContainerConfig>>(config: T): T;",
			description:
				"Defines a Container application that you can list in `containers` in `defineConfig()` or attach to a Durable Object export with its `container` option.",
			children: [],
		},
	} satisfies Record<string, ConfigReference>;
}

function stringValue(token: Token) {
	return token.type === "string" ? token.text.slice(1, -1) : token.text;
}

const OPENERS = new Set(["(", "[", "{"]);
const CLOSERS = new Set([")", "]", "}"]);
/** Tokens that end a line before a new statement, property, or element. */
const LINE_ENDINGS = new Set([",", ";", ...OPENERS]);

interface LineShape {
	/** The indentation level that the brackets imply for this line. */
	level: number;
	/** The line starts a statement, property, or element, or closes a bracket. */
	structural: boolean;
	/** The line continues a JSDoc comment that started on an earlier line. */
	docComment: boolean;
}

/** Works out the indentation level each line would have if formatted. */
function lineShapes(source: string): LineShape[] {
	const tokens = tokenize(source).filter(
		(token) => token.type !== "whitespace",
	);
	const shapes = source.split("\n").map(() => ({
		level: 0,
		structural: false,
		docComment: false,
	}));
	// The level of the line on which each open bracket appears.
	const open: number[] = [];
	let line = 0;
	let lineStarted = false;
	let lineLevel = 0;
	let lastSignificant = "";

	tokens.forEach((token, index) => {
		if (token.type === "newline") {
			line++;
			lineStarted = false;
			return;
		}
		if (!lineStarted) {
			lineStarted = true;
			let closers = 0;
			while (
				tokens[index + closers]?.type === "punctuation" &&
				CLOSERS.has(tokens[index + closers].text)
			) {
				closers++;
			}
			const enclosing = open[open.length - 1 - closers];
			lineLevel = enclosing === undefined ? 0 : enclosing + 1;
			shapes[line].level = lineLevel;
			shapes[line].structural =
				line > 0 && (closers > 0 || LINE_ENDINGS.has(lastSignificant));
		}
		if (token.type === "punctuation" && OPENERS.has(token.text)) {
			open.push(lineLevel);
		} else if (token.type === "punctuation" && CLOSERS.has(token.text)) {
			open.pop();
		}
		if (token.type !== "comment") {
			lastSignificant = token.type === "punctuation" ? token.text : "";
		}
		// Lines inside block comments and template literals keep the level of
		// the line on which the token started.
		const breaks = token.text.split("\n").length - 1;
		const docComment = token.type === "comment" && token.text.startsWith("/**");
		for (let count = 0; count < breaks && shapes[line + 1]; count++) {
			line++;
			shapes[line].level = lineLevel;
			shapes[line].docComment = docComment;
		}
	});
	return shapes;
}

/**
 * How many leading tabs the MDX compiler removes from each line after the
 * first. It depends on where the component sits: one tab at the top level, in
 * a `-` list, or inside another component, and two in a numbered list.
 */
const MDX_REMOVED_TABS = [1, 2];

/**
 * Restores indentation that MDX removes from JSX attribute expressions.
 *
 * MDX strips leading tabs from every line of an attribute expression after
 * its first line. For a `code={\`...\`}` template literal that starts right
 * after the backtick, this collapses the outer indentation levels. When every
 * structural line sits the same number of tabs short of the level its
 * brackets imply, this re-indents the snippet. Other input, including
 * correctly indented code and code indented with spaces, is returned
 * unchanged.
 */
export function restoreMdxIndentation(source: string) {
	const lines = source.split("\n");
	const shapes = lineShapes(source);
	const leads = lines.map((line) => /^[ \t]*/.exec(line)?.[0] ?? "");
	// Lines that start a property, element, or statement inside brackets have
	// a known level, so they show whether and how far MDX moved the code.
	const anchors = lines.flatMap((line, index) =>
		line.trim() && shapes[index].structural && shapes[index].level > 0
			? [index]
			: [],
	);
	// Any other indentation, including spaces, is left as written.
	if (!anchors.length || anchors.some((index) => leads[index].includes(" "))) {
		return source;
	}
	const fits = (removed: number) =>
		anchors.every(
			(index) =>
				leads[index].length === Math.max(0, shapes[index].level - removed),
		);
	const removed = fits(0) ? undefined : MDX_REMOVED_TABS.find(fits);
	if (!removed) {
		return source;
	}
	return lines
		.map((line, index) => {
			const { level, structural, docComment } = shapes[index];
			const content = line.slice(leads[index].length);
			if (index === 0 || !content) {
				return line;
			}
			if (structural && level > 0) {
				return "\t".repeat(level) + content;
			}
			// MDX also removes the space before each `*` of a JSDoc comment, such
			// as the TODO comments `cf migrate` writes.
			if (docComment && content.startsWith("*")) {
				return `${"\t".repeat(level)} ${content}`;
			}
			// Continuation lines, such as the branches of a ternary.
			if (leads[index]) {
				return "\t".repeat(removed) + line;
			}
			return level > 0
				? "\t".repeat(Math.min(removed, level + 1)) + line
				: line;
		})
		.join("\n");
}

/**
 * Annotates `code` and returns one entry per line. Line IDs start with
 * `idPrefix`, which must be unique on the page.
 */
export function buildAnnotatedSnippet(
	code: string,
	idPrefix: string,
): AnnotatedSnippet {
	const source = restoreMdxIndentation(dedentSnippet(code));
	try {
		return { code: source, lines: annotate(source, idPrefix) };
	} catch (error) {
		// The scanner is written not to throw. If it does, render plain lines
		// rather than failing the build over an annotation.
		console.warn(
			`[AnnotatedConfigExplorer] Could not annotate "${idPrefix}":`,
			error,
		);
		return { code: source, lines: plainLines(source) };
	}
}

function plainLines(source: string): AnnotatedLine[] {
	return source.split("\n").map((line) => {
		const lead = /^[ \t]*/.exec(line)?.[0] ?? "";
		return {
			indent: indentWidth(lead),
			html: escapeHtml(line.slice(lead.length)),
			references: [],
		};
	});
}

function indentWidth(lead: string) {
	return [...lead].reduce(
		(width, char) => width + (char === "\t" ? TAB_WIDTH : 1),
		0,
	);
}

function annotate(source: string, idPrefix: string): AnnotatedLine[] {
	const tokens = tokenize(source);
	const significant = tokens.flatMap((token, index) =>
		token.type === "whitespace" ||
		token.type === "newline" ||
		token.type === "comment"
			? []
			: [index],
	);
	const at = (position: number): Token | undefined =>
		position >= 0 && position < significant.length
			? tokens[significant[position]]
			: undefined;
	const is = (position: number, ...texts: string[]) => {
		const token = at(position);
		return Boolean(
			token && token.type !== "string" && texts.includes(token.text),
		);
	};

	const functions = functionReferences();
	const configScope = scopeOf(CONFIG_REFERENCE.config);
	const workerScope = scopeOf(CONFIG_REFERENCE.worker);
	const contextScope = scopeOf(CONFIG_REFERENCE.context);

	const references = new Map<number, ConfigReference>();
	const plainIdentifiers = new Set<number>();
	const contextNames = new Set<string>();
	const stack: Frame[] = [];
	let expectation: Expectation | undefined;
	let pendingCall: { keys?: KeyScope; result?: KeyScope } | undefined;

	const top = () => stack[stack.length - 1];
	const annotateToken = (position: number, ref: ConfigReference) =>
		references.set(significant[position], ref);

	function valueScope(ref: ConfigReference) {
		if (ref.id === "CloudflareConfig.worker") {
			return { keys: workerScope, result: workerScope };
		}
		if (USER_KEYED_FIELDS.has(ref.id) || ref.type?.startsWith("Record<")) {
			return {};
		}
		return ref.children.length ? { keys: childScope(ref) } : {};
	}

	/** Returns the position of `(` after an optional `<...>` type argument. */
	function callParen(position: number) {
		if (is(position, "(")) {
			return position;
		}
		if (!is(position, "<")) {
			return -1;
		}
		let depth = 0;
		for (
			let cursor = position;
			cursor < significant.length && cursor < position + 200;
			cursor++
		) {
			if (is(cursor, "<")) {
				depth++;
			} else if (is(cursor, ">")) {
				depth--;
				if (depth === 0) {
					return is(cursor + 1, "(") ? cursor + 1 : -1;
				}
			}
		}
		return -1;
	}

	/** Picks the `exports.durableObject()` overload from its `state` option. */
	function durableObjectOverload(paren: number) {
		const overloads = CONFIG_REFERENCE.exports.filter(
			(ref) => ref.name === "durableObject",
		);
		let state = "created";
		if (is(paren + 1, "{")) {
			let depth = 0;
			for (let cursor = paren + 1; cursor < significant.length; cursor++) {
				if (is(cursor, "{", "(", "[")) {
					depth++;
				} else if (is(cursor, "}", ")", "]")) {
					depth--;
					if (depth <= 0) {
						break;
					}
				} else if (
					depth === 1 &&
					stringValue(at(cursor)!) === "state" &&
					is(cursor + 1, ":") &&
					at(cursor + 2)?.type === "string"
				) {
					state = stringValue(at(cursor + 2)!);
					break;
				}
			}
		}
		return (
			overloads.find((ref) => ref.id.endsWith(`.${state}`)) ?? overloads[0]
		);
	}

	/** Whether the `:` at `colon` ends a `case ...:` or `default:` clause. */
	function endsSwitchClause(colon: number) {
		if (!is(colon, ":")) {
			return false;
		}
		for (let cursor = colon - 1; cursor >= 0 && cursor > colon - 50; cursor--) {
			if (is(cursor, "case", "default")) {
				return true;
			}
			if (is(cursor, ";", "{", "}", "?", ":", ",")) {
				return false;
			}
		}
		return false;
	}

	function pushOpening(
		text: string,
		frame: Omit<Frame, "close" | "kind"> & { kind?: Frame["kind"] },
	) {
		const close = text === "{" ? "}" : text === "[" ? "]" : ")";
		const kind =
			frame.kind ??
			(text === "{" ? "object" : text === "[" ? "array" : "paren");
		stack.push({ ...frame, close, kind });
	}

	function popTo(close: string) {
		for (let index = stack.length - 1; index >= 0; index--) {
			if (stack[index].close === close) {
				return stack.splice(index)[0];
			}
		}
		return undefined;
	}

	for (let position = 0; position < significant.length; position++) {
		const token = at(position)!;
		const previous = at(position - 1);
		const expected = expectation;
		expectation = undefined;
		const call = pendingCall;
		pendingCall = undefined;
		const text = token.type === "string" ? "" : token.text;

		if (text === "{") {
			const frame = top();
			if (expected?.kind === "value") {
				pushOpening(text, { keys: expected.keys ?? expected.result });
			} else if (
				expected?.kind === "arrow-body" ||
				expected?.kind === "function-body"
			) {
				pushOpening(text, { kind: "block", returnKeys: expected.result });
			} else if (frame?.kind === "params") {
				// A destructured config context: `({ mode }) => ...`
				pushOpening(text, { keys: contextScope });
			} else if (frame?.kind === "array" && is(position - 1, "[", ",")) {
				pushOpening(text, { keys: frame.elementKeys });
			} else if (
				(!frame || frame.kind === "block") &&
				(!previous ||
					is(position - 1, ...BLOCK_PRECEDERS) ||
					// `case "staging": { return { ... }; }`
					endsSwitchClause(position - 1))
			) {
				pushOpening(text, { kind: "block", returnKeys: frame?.returnKeys });
			} else {
				pushOpening(text, {});
			}
			continue;
		}

		if (text === "[") {
			pushOpening(text, {
				elementKeys: expected?.kind === "value" ? expected.keys : undefined,
			});
			continue;
		}

		if (text === "(") {
			if (call) {
				pushOpening(text, {});
				expectation = { kind: "value", ...call };
			} else if (expected?.kind === "value" && expected.result) {
				pushOpening(text, { kind: "params", result: expected.result });
			} else if (expected?.kind === "function-name") {
				pushOpening(text, {
					kind: "params",
					result: expected.result,
					functionKeyword: true,
				});
			} else if (expected?.kind === "arrow-body") {
				// `=> ({ ... })`
				pushOpening(text, {});
				expectation = { kind: "value", keys: expected.result };
			} else if (expected?.kind === "value" && expected.keys) {
				// `return ({ ... })`
				pushOpening(text, {});
				expectation = { kind: "value", keys: expected.keys };
			} else {
				pushOpening(text, {});
			}
			continue;
		}

		if (text === "}" || text === "]" || text === ")") {
			const frame = popTo(text);
			if (frame?.kind === "params" && frame.result) {
				expectation = frame.functionKeyword
					? { kind: "function-body", result: frame.result }
					: { kind: "arrow", result: frame.result };
			}
			continue;
		}

		if (text === "=>") {
			if (expected?.kind === "arrow") {
				expectation = { kind: "arrow-body", result: expected.result };
			}
			continue;
		}

		if (token.type !== "identifier" && token.type !== "string") {
			continue;
		}

		const frame = top();
		const afterMember = is(position - 1, ".", "?.");
		const startsProperty = is(position - 1, "{", ",");

		// Object keys, including quoted keys: `name: "my-worker"`.
		if (frame?.kind === "object" && startsProperty && is(position + 1, ":")) {
			const ref = frame.keys?.get(stringValue(token));
			if (token.type === "identifier") {
				plainIdentifiers.add(position);
			}
			if (ref) {
				annotateToken(position, ref);
				expectation = { kind: "value", ...valueScope(ref) };
			} else {
				expectation = { kind: "value" };
			}
			// Skip the colon so the expectation applies to the value.
			position++;
			continue;
		}

		if (token.type === "string") {
			continue;
		}

		// Shorthand properties: `entrypoint,` or `{ mode }`.
		if (
			frame?.kind === "object" &&
			startsProperty &&
			is(position + 1, ",", "}", "=")
		) {
			const ref = frame.keys?.get(token.text);
			if (ref) {
				annotateToken(position, ref);
			}
			plainIdentifiers.add(position);
			continue;
		}

		// A config function can start with `async` or `function`.
		if (
			token.text === "async" &&
			expected?.kind === "value" &&
			expected.result
		) {
			expectation = expected;
			continue;
		}
		if (
			token.text === "function" &&
			expected?.kind === "value" &&
			expected.result
		) {
			expectation = { kind: "function-name", result: expected.result };
			continue;
		}
		if (expected?.kind === "function-name") {
			// The optional function name.
			expectation = expected;
			continue;
		}

		// A context parameter: `(ctx) =>`, `ctx =>`, or `function (ctx)`.
		if (
			expected?.kind === "value" &&
			expected.result &&
			is(position + 1, "=>")
		) {
			contextNames.add(token.text);
			expectation = { kind: "arrow", result: expected.result };
			continue;
		}
		if (
			frame?.kind === "params" &&
			is(position - 1, "(", ",") &&
			is(position + 1, ")", ",", ":", "=")
		) {
			contextNames.add(token.text);
			continue;
		}

		// `return { ... }` inside a config function body.
		if (token.text === "return" && frame?.kind === "block") {
			if (frame.returnKeys) {
				expectation = { kind: "value", keys: frame.returnKeys };
			}
			continue;
		}

		if (afterMember) {
			plainIdentifiers.add(position);
			continue;
		}

		// `defineConfig(...)`, `defineWorker(...)`, and `defineContainer(...)`.
		if (Object.hasOwn(functions, token.text)) {
			const paren = callParen(position + 1);
			if (paren !== -1) {
				const name = token.text as keyof typeof functions;
				const scope = {
					defineConfig: configScope,
					defineWorker: workerScope,
					defineContainer: undefined,
				}[name];
				annotateToken(position, functions[name]);
				pendingCall = scope ? { keys: scope, result: scope } : {};
				position = paren - 1;
			}
			continue;
		}

		// Builder calls: `bindings.d1(`, `triggers.queue(`, `exports.workflow(`.
		const namespace = BUILDER_NAMESPACES.get(token.text);
		if (namespace && is(position + 1, ".")) {
			const name = at(position + 2);
			const paren = callParen(position + 3);
			if (name?.type === "identifier" && paren !== -1) {
				const builder =
					token.text === "exports" && name.text === "durableObject"
						? durableObjectOverload(paren)
						: namespace.find((ref) => ref.name === name.text);
				if (builder) {
					annotateToken(position + 2, builder);
					plainIdentifiers.add(position + 2);
					pendingCall = { keys: childScope(builder) };
					position = paren - 1;
				}
			}
			continue;
		}

		// Context values read from a parameter: `ctx.mode`.
		if (contextNames.has(token.text) && is(position + 1, ".", "?.")) {
			const property = at(position + 2);
			const ref = property && contextScope.get(property.text);
			if (property?.type === "identifier" && ref) {
				annotateToken(position + 2, ref);
				plainIdentifiers.add(position + 2);
				position += 2;
			}
		}
	}

	const plainTokens = new Set(
		[...plainIdentifiers].map((position) => significant[position]),
	);
	return renderLines(source, tokens, references, plainTokens, idPrefix);
}

function tokenHtml(token: Token, annotated: boolean, plain: boolean) {
	const html = escapeHtml(token.text);
	if (annotated) {
		return `<span class="ace-token">${html}</span>`;
	}
	if (token.type === "string") {
		return `<span class="ace-string">${html}</span>`;
	}
	if (token.type === "comment") {
		return `<span class="ace-comment">${html}</span>`;
	}
	if (
		token.type === "identifier" &&
		!plain &&
		SNIPPET_KEYWORDS.has(token.text)
	) {
		return `<span class="ace-keyword">${html}</span>`;
	}
	return html;
}

function renderLines(
	source: string,
	tokens: Token[],
	references: Map<number, ConfigReference>,
	plainTokens: Set<number>,
	idPrefix: string,
): AnnotatedLine[] {
	const rawLines = source.split("\n");
	const pieces: { token: Token; index: number }[][] = rawLines.map(() => []);
	let line = 0;
	tokens.forEach((token, index) => {
		if (token.type === "newline") {
			line++;
			return;
		}
		// Block comments and template literals can span lines.
		token.text.split("\n").forEach((text, part) => {
			if (part > 0) {
				line++;
			}
			if (text) {
				pieces[line]?.push({ token: { ...token, text }, index });
			}
		});
	});

	const usedIds = new Set<string>();
	return rawLines.map((raw, lineIndex): AnnotatedLine => {
		const lead = /^[ \t]*/.exec(raw)?.[0] ?? "";
		let skip = lead.length;
		const lineReferences = new Map<string, ConfigReference>();
		const html = pieces[lineIndex]
			.map(({ token, index }) => {
				let text = token.text;
				if (skip > 0) {
					const removed = Math.min(skip, text.length);
					text = text.slice(removed);
					skip -= removed;
				}
				if (!text) {
					return "";
				}
				const ref = references.get(index);
				if (ref) {
					lineReferences.set(ref.id, ref);
				}
				return tokenHtml(
					{ ...token, text },
					Boolean(ref),
					plainTokens.has(index),
				);
			})
			.join("");
		const indent = indentWidth(lead);
		if (!lineReferences.size) {
			return { indent, html, references: [] };
		}
		const refs = [...lineReferences.values()];
		const baseId = `${idPrefix}-${slug(refs[0].id)}`;
		let id = baseId;
		for (let index = 2; usedIds.has(id); index++) {
			id = `${baseId}-${index}`;
		}
		usedIds.add(id);
		return {
			id,
			indent,
			html,
			references: refs.map((ref): AnnotatedReference =>
				FUNCTION_IDS.has(ref.id)
					? { ...annotateReference(ref), kind: "Function" }
					: annotateReference(ref),
			),
		};
	});
}
