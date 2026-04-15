/**
 * prettier-plugin-mdx-inline
 *
 * Prevents prettier from reformatting specific JSX elements in MDX files.
 *
 * Problem: Prettier's MDX formatter treats standalone JSX elements (like
 * `<code>`) as block-level and wraps their children
 * onto new lines when they exceed printWidth. MDX v2+ then interprets those
 * newlines as markdown paragraph boundaries, injecting <p> tags inside inline
 * elements — producing broken HTML like `<code><p>...</p></code>`.
 *
 * Solution: This plugin intercepts the parsed MDX AST and converts matching
 * JSX nodes to opaque HTML nodes that prettier outputs verbatim. It also
 * collapses any existing multi-line formatting back to a single line.
 *
 * Configuration (.prettierrc.mjs):
 *
 *   export default {
 *     plugins: ["./prettier-plugin-mdx-inline/index.mjs"],
 *     overrides: [{
 *       files: "*.mdx",
 *       options: { parser: "mdx-inline" },
 *     }],
 *   };
 *
 * You must specify which elements to protect via `mdxInlineElements`:
 *
 *   overrides: [{
 *     files: "*.mdx",
 *     options: {
 *       parser: "mdx-inline",
 *       mdxInlineElements: "code,GlossaryTooltip",
 *     },
 *   }],
 */

/**
 * Extract the element name from the start of a JSX string.
 * e.g., "<code>" → "code", "<GlossaryTooltip term="x">" → "GlossaryTooltip"
 */
function getElementName(value) {
	const match = value.trim().match(/^<([a-zA-Z][a-zA-Z0-9]*)/);
	return match ? match[1] : null;
}

/**
 * Collapse a multi-line JSX element value onto a single line.
 *
 * Handles:
 * - {" "} spacer expressions inserted by prettier
 * - Newlines with surrounding whitespace from indentation
 * - Multiple consecutive spaces from collapsing
 * - Trailing content after the closing tag (e.g., in list items)
 *
 * Preserves:
 * - Attribute values (strings in the opening tag)
 * - Self-closing tags within content (e.g., <Type text="..." />)
 */
function collapseInlineJsx(value) {
	// Remove {" "} spacers — these are prettier artifacts for preserving spaces
	let result = value.replace(/\{" "\}/g, " ");

	const elementName = getElementName(result);
	if (!elementName) return result;

	// Find the end of the opening tag by tracking string context.
	// We need to skip over attribute values that may contain '>' characters.
	let inString = false;
	let stringChar = "";
	let openTagEnd = -1;

	for (let i = 0; i < result.length; i++) {
		const ch = result[i];
		if (inString) {
			if (ch === stringChar && result[i - 1] !== "\\") {
				inString = false;
			}
		} else if (ch === '"' || ch === "'") {
			inString = true;
			stringChar = ch;
		} else if (ch === ">") {
			openTagEnd = i;
			break;
		}
	}

	if (openTagEnd === -1) return result;

	// Find the matching closing tag — it may not be at the very end of the
	// value if there is trailing content (e.g., in a list item where the
	// description text follows the </code> within the same JSX node).
	const closeTag = `</${elementName}>`;
	const closeTagIndex = result.indexOf(closeTag, openTagEnd);
	if (closeTagIndex === -1) return result;

	const openTag = result.substring(0, openTagEnd + 1);
	const content = result.substring(openTagEnd + 1, closeTagIndex);
	const trailing = result.substring(closeTagIndex + closeTag.length);

	// Collapse whitespace in the content between tags
	const collapsed = content
		.replace(/\n\s*/g, " ") // newlines + indentation → single space
		.replace(/\s{2,}/g, " ") // multiple spaces → single space
		.trim();

	return openTag + collapsed + closeTag + trailing;
}

/**
 * Parse the configured element list from the options.
 */
function getInlineElements(options) {
	const configured = options.mdxInlineElements;
	if (!configured || typeof configured !== "string") {
		return [];
	}
	return configured
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
}

/**
 * Check if a JSX node value starts with one of the inline element names.
 */
function isInlineElement(value, elements) {
	const trimmed = value.trim();
	for (const el of elements) {
		if (trimmed.startsWith(`<${el}>`) || trimmed.startsWith(`<${el} `)) {
			return true;
		}
	}
	return false;
}

/**
 * Walk the AST and convert matching JSX nodes to HTML nodes.
 */
function transformAst(ast, elements) {
	function walk(node) {
		if (node.type === "jsx" && isInlineElement(node.value, elements)) {
			// Convert to HTML type so prettier outputs it verbatim
			node.type = "html";
			// Collapse multi-line content back to a single line
			node.value = collapseInlineJsx(node.value);
		}
		if (node.children) {
			node.children.forEach(walk);
		}
	}
	walk(ast);
	return ast;
}

/** @type {import("prettier").Plugin} */
const plugin = {
	options: {
		mdxInlineElements: {
			type: "string",
			category: "MDX",
			default: "",
			description:
				"Comma-separated list of JSX element names that should not be reformatted.",
		},
	},

	parsers: {
		"mdx-inline": {
			async parse(text, options) {
				// Delegate to the built-in MDX parser via prettier's stable plugin export
				const { parsers } = await import("prettier/plugins/markdown");
				const ast = await parsers.mdx.parse(text, options);

				// Transform matching JSX nodes to prevent reformatting
				const elements = getInlineElements(options);
				transformAst(ast, elements);

				return ast;
			},
			// Use the built-in mdast printer — we only modify the AST
			astFormat: "mdast",
			locStart: (node) => node.position?.start?.offset ?? 0,
			locEnd: (node) => node.position?.end?.offset ?? 0,
		},
	},
};

export default plugin;
