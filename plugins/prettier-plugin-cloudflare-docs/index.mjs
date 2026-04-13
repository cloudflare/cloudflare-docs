/**
 * prettier-plugin-cloudflare-docs
 *
 * Custom prettier plugin for the cloudflare-docs repository.
 * Prevents prettier from reformatting specific JSX elements in MDX files.
 *
 * Two types of protection are available:
 *
 * 1. Inline elements (mdxInlineElements): Elements like <code> and
 *    <GlossaryTooltip> that render inline HTML. Prettier wraps their
 *    children onto new lines, causing MDX v2+ to inject <p> tags —
 *    producing broken HTML like <code><p>...</p></code>. These elements
 *    are kept on a single line and any existing multi-line formatting
 *    is collapsed.
 *
 * 2. Preserve elements (mdxPreserveElements): Block elements like <Steps>
 *    whose markdown content (ordered lists, code blocks, tables) is
 *    destroyed by prettier's JSX formatter. These are replaced with
 *    same-length HTML comment placeholders so that AST positions remain
 *    valid, then the original content is restored in the AST before the
 *    printer outputs it.
 *
 * Configuration (.prettierrc.mjs):
 *
 *   overrides: [{
 *     files: "*.mdx",
 *     options: {
 *       parser: "mdx-cloudflare-docs",
 *       mdxInlineElements: "code,GlossaryTooltip",
 *       mdxPreserveElements: "Steps",
 *     },
 *   }],
 */

// -- Inline element helpers --------------------------------------------------

function getElementName(value) {
	const match = value.trim().match(/^<([a-zA-Z][a-zA-Z0-9]*)/);
	return match ? match[1] : null;
}

/**
 * Collapse a multi-line inline JSX element onto a single line.
 * Handles {" "} spacers, newlines, and trailing content after the closing tag.
 */
function collapseInlineJsx(value) {
	let result = value.replace(/\{" "\}/g, " ");

	const elementName = getElementName(result);
	if (!elementName) return result;

	let inString = false;
	let stringChar = "";
	let openTagEnd = -1;

	for (let i = 0; i < result.length; i++) {
		const ch = result[i];
		if (inString) {
			if (ch === stringChar && result[i - 1] !== "\\") inString = false;
		} else if (ch === '"' || ch === "'") {
			inString = true;
			stringChar = ch;
		} else if (ch === ">") {
			openTagEnd = i;
			break;
		}
	}

	if (openTagEnd === -1) return result;

	const closeTag = `</${elementName}>`;
	const closeTagIndex = result.indexOf(closeTag, openTagEnd);
	if (closeTagIndex === -1) return result;

	const openTag = result.substring(0, openTagEnd + 1);
	const content = result.substring(openTagEnd + 1, closeTagIndex);
	const trailing = result.substring(closeTagIndex + closeTag.length);

	const collapsed = content
		.replace(/\n\s*/g, " ")
		.replace(/\s{2,}/g, " ")
		.trim();

	return openTag + collapsed + closeTag + trailing;
}

// -- Shared helpers ----------------------------------------------------------

function parseElementList(value) {
	if (!value || typeof value !== "string") return [];
	return value
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
}

function matchesElement(value, elements) {
	const trimmed = value.trim();
	for (const el of elements) {
		if (trimmed.startsWith(`<${el}>`) || trimmed.startsWith(`<${el} `)) {
			return true;
		}
	}
	return false;
}

// -- Preserve element helpers ------------------------------------------------

const PRESERVE_PREFIX = "<!--MDXPRESERVE:";
const PRESERVE_SUFFIX = "-->";
const PRESERVE_REGEX = /<!--MDXPRESERVE:(\d+)-*-->/;

/**
 * Replace preserve element regions with same-length HTML comment
 * placeholders. The placeholder is padded with dashes so that byte
 * offsets of all subsequent AST nodes remain valid.
 */
function extractPreserveRegions(text, preserveElements) {
	const regions = [];
	let processed = text;

	for (const el of preserveElements) {
		const regex = new RegExp(`<${el}[\\s>][\\s\\S]*?</${el}>`, "g");
		processed = processed.replace(regex, (match) => {
			const idx = regions.length;
			regions.push(match);

			const tag = `${PRESERVE_PREFIX}${idx}`;
			const padLen = match.length - tag.length - PRESERVE_SUFFIX.length;
			return tag + "-".repeat(Math.max(0, padLen)) + PRESERVE_SUFFIX;
		});
	}

	return { processed, regions };
}

/**
 * Walk the AST and restore placeholder nodes with original content.
 */
function restorePreserveNodes(ast, regions) {
	function walk(node) {
		if (node.value) {
			const match = node.value.match(PRESERVE_REGEX);
			if (match) {
				node.type = "html";
				node.value = regions[parseInt(match[1])];
				return;
			}
		}
		if (node.children) {
			node.children.forEach(walk);
		}
	}
	walk(ast);
}

// -- AST transform for inline elements ---------------------------------------

function transformInlineElements(ast, inlineElements) {
	function walk(node) {
		if (node.type === "jsx" && matchesElement(node.value, inlineElements)) {
			node.type = "html";
			node.value = collapseInlineJsx(node.value);
		}
		if (node.children) {
			node.children.forEach(walk);
		}
	}
	walk(ast);
}

// -- Plugin ------------------------------------------------------------------

/** @type {import("prettier").Plugin} */
export default {
	options: {
		mdxInlineElements: {
			type: "string",
			category: "MDX",
			default: "",
			description:
				"Comma-separated list of inline JSX element names that should be " +
				"kept on a single line (e.g., code, GlossaryTooltip).",
		},
		mdxPreserveElements: {
			type: "string",
			category: "MDX",
			default: "",
			description:
				"Comma-separated list of block JSX element names whose content " +
				"should be preserved verbatim (e.g., Steps).",
		},
	},

	parsers: {
		"mdx-cloudflare-docs": {
			async parse(text, options) {
				const inlineElements = parseElementList(options.mdxInlineElements);
				const preserveElements = parseElementList(options.mdxPreserveElements);

				// Replace preserve regions with same-length HTML comment
				// placeholders. This keeps byte offsets valid for the mdast
				// printer, which uses originalText + positions for some nodes.
				const { processed, regions } = extractPreserveRegions(
					text,
					preserveElements,
				);

				// Parse with the built-in MDX parser
				const { parsers } = await import("prettier/plugins/markdown");
				const ast = await parsers.mdx.parse(processed, options);

				// Restore placeholder nodes with original content.
				// Nodes stay as `html` type so the printer outputs node.value
				// verbatim (the printer uses node.value for html nodes, not
				// originalText slicing).
				restorePreserveNodes(ast, regions);

				// Handle inline elements
				transformInlineElements(ast, inlineElements);

				return ast;
			},
			astFormat: "mdast",
			locStart: (node) => node.position?.start?.offset ?? 0,
			locEnd: (node) => node.position?.end?.offset ?? 0,
		},
	},
};
