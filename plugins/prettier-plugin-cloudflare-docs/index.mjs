/**
 * prettier-plugin-cloudflare-docs
 *
 * Custom prettier plugin for the cloudflare-docs repository.
 * Prevents prettier from reformatting specific JSX elements in MDX files.
 *
 * Elements listed in `mdxPreserveElements` are replaced with same-length
 * HTML comment placeholders before parsing, so prettier never sees their
 * content. After parsing, the original content is restored in the AST
 * and the printer outputs it verbatim.
 *
 * When preserve elements are nested (e.g., <Steps> inside <Tabs>),
 * only the outermost match is replaced — the inner content is captured
 * verbatim as part of the outer region.
 *
 * Configuration (.prettierrc.mjs):
 *
 *   overrides: [{
 *     files: "*.mdx",
 *     options: {
 *       parser: "mdx-cloudflare-docs",
 *       mdxPreserveElements: "code,GlossaryTooltip,Steps,Tabs,TabItem,FileTree",
 *     },
 *   }],
 */

// -- Helpers -----------------------------------------------------------------

function parseElementList(value) {
	if (!value || typeof value !== "string") return [];
	return value
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
}

// -- Preserve element helpers ------------------------------------------------

const PRESERVE_PREFIX = "<!--MDXPRESERVE:";
const PRESERVE_SUFFIX = "-->";

/**
 * Find fenced code blocks that contain any preserve element, and return
 * their ranges. These entire blocks should be preserved verbatim to prevent
 * prettier's embedded MDX formatter from reformatting the content inside.
 */
function findCodeBlocksWithPreserveElements(text, preserveElements) {
	const ranges = [];
	const fenceRegex = /^(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\1/gm;
	let m;
	while ((m = fenceRegex.exec(text)) !== null) {
		const blockText = m[0];
		const containsPreserveElement = preserveElements.some((el) =>
			new RegExp(`<${el}[\\s>]`).test(blockText),
		);
		if (containsPreserveElement) {
			ranges.push({
				start: m.index,
				end: m.index + blockText.length,
				text: blockText,
			});
		}
	}
	return ranges;
}

/**
 * Replace preserve element regions with same-length HTML comment
 * placeholders. The placeholder is padded with dashes so that byte
 * offsets of all subsequent AST nodes remain valid.
 *
 * Fenced code blocks that contain preserve elements are also replaced
 * as complete units — this prevents prettier's embedded MDX formatter
 * from reformatting their content.
 *
 * When preserve elements are nested (e.g., <Steps> inside <Tabs>),
 * only the outermost match is replaced — the inner content is captured
 * verbatim as part of the outer region.
 */
function extractPreserveRegions(text, preserveElements) {
	// Find fenced code blocks that contain preserve elements — treat
	// the whole block as a preserve region to prevent embedded formatting
	const codeBlockMatches = findCodeBlocksWithPreserveElements(
		text,
		preserveElements,
	);

	// Find all preserve element matches in the text
	const allMatches = [...codeBlockMatches];
	for (const el of preserveElements) {
		const regex = new RegExp(`<${el}[\\s>][\\s\\S]*?</${el}>`, "g");
		let m;
		while ((m = regex.exec(text)) !== null) {
			// Skip matches that are already inside a code block we're preserving
			const insideCodeBlock = codeBlockMatches.some(
				(r) => m.index >= r.start && m.index + m[0].length <= r.end,
			);
			if (!insideCodeBlock) {
				allMatches.push({
					start: m.index,
					end: m.index + m[0].length,
					text: m[0],
				});
			}
		}
	}

	// Sort by start position, outermost (longest) first at same position
	allMatches.sort((a, b) => a.start - b.start || b.end - a.end);

	// Keep only outermost matches (skip any nested inside an accepted region)
	const accepted = [];
	for (const m of allMatches) {
		const isNested = accepted.some((a) => m.start >= a.start && m.end <= a.end);
		if (!isNested) {
			accepted.push(m);
		}
	}

	// Replace in reverse order so earlier offsets stay valid
	const regions = [];
	let processed = text;
	for (const m of accepted.reverse()) {
		const tag = `${PRESERVE_PREFIX}${regions.length}`;
		const minLen = tag.length + PRESERVE_SUFFIX.length;

		// Skip elements shorter than the minimum placeholder length —
		// they don't need protection and can't fit a same-length placeholder.
		if (m.text.length < minLen) continue;

		regions.push(m.text);

		const padLen = m.text.length - tag.length - PRESERVE_SUFFIX.length;
		const placeholder = tag + "-".repeat(padLen) + PRESERVE_SUFFIX;
		processed =
			processed.substring(0, m.start) +
			placeholder +
			processed.substring(m.end);
	}

	return { processed, regions };
}

/**
 * Walk the AST and restore placeholders with original content.
 * A single node may contain multiple placeholders (e.g., when the MDX
 * parser merges sibling elements into one node), so we replace all
 * occurrences within each node's value.
 *
 * For fenced code blocks (type "code"), we also suppress embedded language
 * formatting by clearing the lang temporarily — prettier's embedded formatter
 * would otherwise re-format the restored content. We store the original lang
 * in a custom property and reset it so the printer outputs the correct fence.
 */
function restorePreserveNodes(ast, regions) {
	const globalRegex = /<!--MDXPRESERVE:(\d+)-*-->/g;

	function walk(node) {
		if (node.value && globalRegex.test(node.value)) {
			globalRegex.lastIndex = 0;
			node.type = "html";
			node.value = node.value.replace(globalRegex, (_, idx) => {
				return regions[parseInt(idx)];
			});
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
		mdxPreserveElements: {
			type: "string",
			category: "MDX",
			default: "",
			description:
				"Comma-separated list of JSX element names whose content " +
				"should be preserved verbatim by prettier.",
		},
	},

	parsers: {
		"mdx-cloudflare-docs": {
			async parse(text, options) {
				const preserveElements = parseElementList(options.mdxPreserveElements);

				// Replace preserve regions with same-length HTML comment
				// placeholders so prettier never sees their content.
				const { processed, regions } = extractPreserveRegions(
					text,
					preserveElements,
				);

				// Parse with the built-in MDX parser
				const { parsers } = await import("prettier/plugins/markdown");
				const ast = await parsers.mdx.parse(processed, options);

				// Restore placeholders with original content. Nodes are set
				// to `html` type so the printer outputs node.value verbatim.
				restorePreserveNodes(ast, regions);

				return ast;
			},
			astFormat: "mdast",
			locStart: (node) => node.position?.start?.offset ?? 0,
			locEnd: (node) => node.position?.end?.offset ?? 0,
		},
	},
};
