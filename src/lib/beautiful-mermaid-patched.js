/**
 * Patched version of beautiful-mermaid v0.3.0
 *
 * PATCH: Added note spacing in sequence diagrams (lines ~4269-4283)
 * - Notes are positioned below their reference message but subsequent messages
 *   don't account for note height, causing overlap
 * - This patch pre-calculates note heights and adds them to extraSpaceBefore
 *   for the message following each note
 *
 * Consider upstreaming this fix if the library accepts contributions.
 */
import dagre from "@dagrejs/dagre/dist/dagre.js";

// src/theme.ts
var DEFAULTS = {
	bg: "#FFFFFF",
	fg: "#27272A",
};
var MIX = {
	// just use --fg directly
	/** Secondary text (group headers): fg mixed at 60% */
	textSec: 60,
	/** Muted text (edge labels, notes): fg mixed at 40% */
	textMuted: 40,
	/** Faint text (de-emphasized): fg mixed at 25% */
	textFaint: 25,
	/** Edge/connector lines: fg mixed at 30% */
	line: 30,
	/** Arrow head fill: fg mixed at 50% */
	arrow: 50,
	/** Node fill tint: fg mixed at 3% */
	nodeFill: 3,
	/** Node/group stroke: fg mixed at 20% */
	nodeStroke: 20,
	/** Group header band tint: fg mixed at 5% */
	groupHeader: 5,
	/** Inner divider strokes: fg mixed at 12% */
	innerStroke: 12,
	/** Key badge background opacity (ER diagrams) */
	keyBadge: 10,
};
var THEMES = {
	"zinc-dark": {
		bg: "#18181B",
		fg: "#FAFAFA",
	},
	"tokyo-night": {
		bg: "#1a1b26",
		fg: "#a9b1d6",
		line: "#3d59a1",
		accent: "#7aa2f7",
		muted: "#565f89",
	},
	"tokyo-night-storm": {
		bg: "#24283b",
		fg: "#a9b1d6",
		line: "#3d59a1",
		accent: "#7aa2f7",
		muted: "#565f89",
	},
	"tokyo-night-light": {
		bg: "#d5d6db",
		fg: "#343b58",
		line: "#34548a",
		accent: "#34548a",
		muted: "#9699a3",
	},
	"catppuccin-mocha": {
		bg: "#1e1e2e",
		fg: "#cdd6f4",
		line: "#585b70",
		accent: "#cba6f7",
		muted: "#6c7086",
	},
	"catppuccin-latte": {
		bg: "#eff1f5",
		fg: "#4c4f69",
		line: "#9ca0b0",
		accent: "#8839ef",
		muted: "#9ca0b0",
	},
	nord: {
		bg: "#2e3440",
		fg: "#d8dee9",
		line: "#4c566a",
		accent: "#88c0d0",
		muted: "#616e88",
	},
	"nord-light": {
		bg: "#eceff4",
		fg: "#2e3440",
		line: "#aab1c0",
		accent: "#5e81ac",
		muted: "#7b88a1",
	},
	dracula: {
		bg: "#282a36",
		fg: "#f8f8f2",
		line: "#6272a4",
		accent: "#bd93f9",
		muted: "#6272a4",
	},
	"github-light": {
		bg: "#ffffff",
		fg: "#1f2328",
		line: "#d1d9e0",
		accent: "#0969da",
		muted: "#59636e",
	},
	"github-dark": {
		bg: "#0d1117",
		fg: "#e6edf3",
		line: "#3d444d",
		accent: "#4493f8",
		muted: "#9198a1",
	},
	"solarized-light": {
		bg: "#fdf6e3",
		fg: "#657b83",
		line: "#93a1a1",
		accent: "#268bd2",
		muted: "#93a1a1",
	},
	"solarized-dark": {
		bg: "#002b36",
		fg: "#839496",
		line: "#586e75",
		accent: "#268bd2",
		muted: "#586e75",
	},
	"one-dark": {
		bg: "#282c34",
		fg: "#abb2bf",
		line: "#4b5263",
		accent: "#c678dd",
		muted: "#5c6370",
	},
};
function fromShikiTheme(theme) {
	const c = theme.colors ?? {};
	const dark = theme.type === "dark";
	const tokenColor = (scope) =>
		theme.tokenColors?.find((t) =>
			Array.isArray(t.scope) ? t.scope.includes(scope) : t.scope === scope,
		)?.settings?.foreground;
	return {
		bg: c["editor.background"] ?? (dark ? "#1e1e1e" : "#ffffff"),
		fg: c["editor.foreground"] ?? (dark ? "#d4d4d4" : "#333333"),
		line: c["editorLineNumber.foreground"] ?? void 0,
		accent: c["focusBorder"] ?? tokenColor("keyword") ?? void 0,
		muted: tokenColor("comment") ?? c["editorLineNumber.foreground"] ?? void 0,
		surface: c["editor.selectionBackground"] ?? void 0,
		border: c["editorWidget.border"] ?? void 0,
	};
}
function buildStyleBlock(font, hasMonoFont) {
	const fontImports = [
		`@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;500;600;700&amp;display=swap');`,
		...(hasMonoFont
			? [
					`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&amp;display=swap');`,
				]
			: []),
	];
	const derivedVars = `
    /* Derived from --bg and --fg (overridable via --line, --accent, etc.) */
    --_text:          var(--fg);
    --_text-sec:      var(--muted, color-mix(in srgb, var(--fg) ${MIX.textSec}%, var(--bg)));
    --_text-muted:    var(--muted, color-mix(in srgb, var(--fg) ${MIX.textMuted}%, var(--bg)));
    --_text-faint:    color-mix(in srgb, var(--fg) ${MIX.textFaint}%, var(--bg));
    --_line:          var(--line, color-mix(in srgb, var(--fg) ${MIX.line}%, var(--bg)));
    --_arrow:         var(--accent, color-mix(in srgb, var(--fg) ${MIX.arrow}%, var(--bg)));
    --_node-fill:     var(--surface, color-mix(in srgb, var(--fg) ${MIX.nodeFill}%, var(--bg)));
    --_node-stroke:   var(--border, color-mix(in srgb, var(--fg) ${MIX.nodeStroke}%, var(--bg)));
    --_group-fill:    var(--bg);
    --_group-hdr:     color-mix(in srgb, var(--fg) ${MIX.groupHeader}%, var(--bg));
    --_inner-stroke:  color-mix(in srgb, var(--fg) ${MIX.innerStroke}%, var(--bg));
    --_key-badge:     color-mix(in srgb, var(--fg) ${MIX.keyBadge}%, var(--bg));`;
	return [
		"<style>",
		`  ${fontImports.join("\n  ")}`,
		`  text { font-family: '${font}', system-ui, sans-serif; }`,
		...(hasMonoFont
			? [
					`  .mono { font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', ui-monospace, monospace; }`,
				]
			: []),
		`  svg {${derivedVars}`,
		`  }`,
		"</style>",
	].join("\n");
}
function svgOpenTag(width, height, colors, transparent) {
	const vars = [
		`--bg:${colors.bg}`,
		`--fg:${colors.fg}`,
		colors.line ? `--line:${colors.line}` : "",
		colors.accent ? `--accent:${colors.accent}` : "",
		colors.muted ? `--muted:${colors.muted}` : "",
		colors.surface ? `--surface:${colors.surface}` : "",
		colors.border ? `--border:${colors.border}` : "",
	]
		.filter(Boolean)
		.join(";");
	const bgStyle = transparent ? "" : ";background:var(--bg)";
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="${vars}${bgStyle}">`;
}

// src/parser.ts
function parseMermaid(text) {
	const lines = text
		.split("\n")
		.map((l) => l.trim())
		.filter((l) => l.length > 0 && !l.startsWith("%%"));
	if (lines.length === 0) {
		throw new Error("Empty mermaid diagram");
	}
	const header = lines[0];
	if (/^stateDiagram(-v2)?\s*$/i.test(header)) {
		return parseStateDiagram(lines);
	}
	return parseFlowchart(lines);
}
function parseFlowchart(lines) {
	const headerMatch = lines[0].match(
		/^(?:graph|flowchart)\s+(TD|TB|LR|BT|RL)\s*$/i,
	);
	if (!headerMatch) {
		throw new Error(
			`Invalid mermaid header: "${lines[0]}". Expected "graph TD", "flowchart LR", "stateDiagram-v2", etc.`,
		);
	}
	const direction = headerMatch[1].toUpperCase();
	const graph = {
		direction,
		nodes: /* @__PURE__ */ new Map(),
		edges: [],
		subgraphs: [],
		classDefs: /* @__PURE__ */ new Map(),
		classAssignments: /* @__PURE__ */ new Map(),
		nodeStyles: /* @__PURE__ */ new Map(),
	};
	const subgraphStack = [];
	for (let i = 1; i < lines.length; i++) {
		const line = lines[i];
		const classDefMatch = line.match(/^classDef\s+(\w+)\s+(.+)$/);
		if (classDefMatch) {
			const name = classDefMatch[1];
			const propsStr = classDefMatch[2];
			const props = parseStyleProps(propsStr);
			graph.classDefs.set(name, props);
			continue;
		}
		const classAssignMatch = line.match(/^class\s+([\w,-]+)\s+(\w+)$/);
		if (classAssignMatch) {
			const nodeIds = classAssignMatch[1].split(",").map((s) => s.trim());
			const className = classAssignMatch[2];
			for (const id of nodeIds) {
				graph.classAssignments.set(id, className);
			}
			continue;
		}
		const styleMatch = line.match(/^style\s+([\w,-]+)\s+(.+)$/);
		if (styleMatch) {
			const nodeIds = styleMatch[1].split(",").map((s) => s.trim());
			const props = parseStyleProps(styleMatch[2]);
			for (const id of nodeIds) {
				graph.nodeStyles.set(id, { ...graph.nodeStyles.get(id), ...props });
			}
			continue;
		}
		const dirMatch = line.match(/^direction\s+(TD|TB|LR|BT|RL)\s*$/i);
		if (dirMatch && subgraphStack.length > 0) {
			subgraphStack[subgraphStack.length - 1].direction =
				dirMatch[1].toUpperCase();
			continue;
		}
		const subgraphMatch = line.match(/^subgraph\s+(.+)$/);
		if (subgraphMatch) {
			const rest = subgraphMatch[1].trim();
			const bracketMatch = rest.match(/^([\w-]+)\s*\[(.+)\]$/);
			let id;
			let label;
			if (bracketMatch) {
				id = bracketMatch[1];
				label = bracketMatch[2];
			} else {
				label = rest;
				id = rest.replace(/\s+/g, "_").replace(/[^\w]/g, "");
			}
			const sg = { id, label, nodeIds: [], children: [] };
			subgraphStack.push(sg);
			continue;
		}
		if (line === "end") {
			const completed = subgraphStack.pop();
			if (completed) {
				if (subgraphStack.length > 0) {
					subgraphStack[subgraphStack.length - 1].children.push(completed);
				} else {
					graph.subgraphs.push(completed);
				}
			}
			continue;
		}
		parseEdgeLine(line, graph, subgraphStack);
	}
	return graph;
}
function parseStateDiagram(lines) {
	const graph = {
		direction: "TD",
		nodes: /* @__PURE__ */ new Map(),
		edges: [],
		subgraphs: [],
		classDefs: /* @__PURE__ */ new Map(),
		classAssignments: /* @__PURE__ */ new Map(),
		nodeStyles: /* @__PURE__ */ new Map(),
	};
	const compositeStack = [];
	let startCount = 0;
	let endCount = 0;
	for (let i = 1; i < lines.length; i++) {
		const line = lines[i];
		const dirMatch = line.match(/^direction\s+(TD|TB|LR|BT|RL)\s*$/i);
		if (dirMatch) {
			if (compositeStack.length > 0) {
				compositeStack[compositeStack.length - 1].direction =
					dirMatch[1].toUpperCase();
			} else {
				graph.direction = dirMatch[1].toUpperCase();
			}
			continue;
		}
		const compositeMatch = line.match(
			/^state\s+(?:"([^"]+)"\s+as\s+)?(\w+)\s*\{$/,
		);
		if (compositeMatch) {
			const label = compositeMatch[1] ?? compositeMatch[2];
			const id = compositeMatch[2];
			const sg = { id, label, nodeIds: [], children: [] };
			compositeStack.push(sg);
			continue;
		}
		if (line === "}") {
			const completed = compositeStack.pop();
			if (completed) {
				if (compositeStack.length > 0) {
					compositeStack[compositeStack.length - 1].children.push(completed);
				} else {
					graph.subgraphs.push(completed);
				}
			}
			continue;
		}
		const stateAliasMatch = line.match(/^state\s+"([^"]+)"\s+as\s+(\w+)\s*$/);
		if (stateAliasMatch) {
			const label = stateAliasMatch[1];
			const id = stateAliasMatch[2];
			registerStateNode(graph, compositeStack, { id, label, shape: "rounded" });
			continue;
		}
		const transitionMatch = line.match(
			/^(\[\*\]|[\w-]+)\s*(-->)\s*(\[\*\]|[\w-]+)(?:\s*:\s*(.+))?$/,
		);
		if (transitionMatch) {
			let sourceId = transitionMatch[1];
			let targetId = transitionMatch[3];
			const edgeLabel = transitionMatch[4]?.trim() || void 0;
			if (sourceId === "[*]") {
				startCount++;
				sourceId = `_start${startCount > 1 ? startCount : ""}`;
				registerStateNode(graph, compositeStack, {
					id: sourceId,
					label: "",
					shape: "state-start",
				});
			} else {
				ensureStateNode(graph, compositeStack, sourceId);
			}
			if (targetId === "[*]") {
				endCount++;
				targetId = `_end${endCount > 1 ? endCount : ""}`;
				registerStateNode(graph, compositeStack, {
					id: targetId,
					label: "",
					shape: "state-end",
				});
			} else {
				ensureStateNode(graph, compositeStack, targetId);
			}
			graph.edges.push({
				source: sourceId,
				target: targetId,
				label: edgeLabel,
				style: "solid",
				hasArrowStart: false,
				hasArrowEnd: true,
			});
			continue;
		}
		const stateDescMatch = line.match(/^([\w-]+)\s*:\s*(.+)$/);
		if (stateDescMatch) {
			const id = stateDescMatch[1];
			const label = stateDescMatch[2].trim();
			registerStateNode(graph, compositeStack, { id, label, shape: "rounded" });
			continue;
		}
	}
	return graph;
}
function registerStateNode(graph, compositeStack, node) {
	const isNew = !graph.nodes.has(node.id);
	if (isNew) {
		graph.nodes.set(node.id, node);
	}
	if (compositeStack.length > 0) {
		const current = compositeStack[compositeStack.length - 1];
		if (!current.nodeIds.includes(node.id)) {
			current.nodeIds.push(node.id);
		}
	}
}
function ensureStateNode(graph, compositeStack, id) {
	if (!graph.nodes.has(id)) {
		registerStateNode(graph, compositeStack, {
			id,
			label: id,
			shape: "rounded",
		});
	} else {
		if (compositeStack.length > 0) {
			const current = compositeStack[compositeStack.length - 1];
			if (!current.nodeIds.includes(id)) {
				current.nodeIds.push(id);
			}
		}
	}
}
function parseStyleProps(propsStr) {
	const props = {};
	for (const pair of propsStr.split(",")) {
		const colonIdx = pair.indexOf(":");
		if (colonIdx > 0) {
			const key = pair.slice(0, colonIdx).trim();
			const val = pair.slice(colonIdx + 1).trim();
			if (key && val) {
				props[key] = val;
			}
		}
	}
	return props;
}
var ARROW_REGEX = /^(<)?(-->|-.->|==>|---|-\.-|===)(?:\|([^|]*)\|)?/;
var NODE_PATTERNS = [
	// Triple delimiters (must be first)
	{ regex: /^([\w-]+)\(\(\((.+?)\)\)\)/, shape: "doublecircle" },
	// A(((text)))
	// Double delimiters with mixed brackets
	{ regex: /^([\w-]+)\(\[(.+?)\]\)/, shape: "stadium" },
	// A([text])
	{ regex: /^([\w-]+)\(\((.+?)\)\)/, shape: "circle" },
	// A((text))
	{ regex: /^([\w-]+)\[\[(.+?)\]\]/, shape: "subroutine" },
	// A[[text]]
	{ regex: /^([\w-]+)\[\((.+?)\)\]/, shape: "cylinder" },
	// A[(text)]
	// Trapezoid variants — must come before plain [text]
	{ regex: /^([\w-]+)\[\/(.+?)\\\]/, shape: "trapezoid" },
	// A[/text\]
	{ regex: /^([\w-]+)\[\\(.+?)\/\]/, shape: "trapezoid-alt" },
	// A[\text/]
	// Asymmetric flag shape
	{ regex: /^([\w-]+)>(.+?)\]/, shape: "asymmetric" },
	// A>text]
	// Double curly braces (hexagon) — must come before single {text}
	{ regex: /^([\w-]+)\{\{(.+?)\}\}/, shape: "hexagon" },
	// A{{text}}
	// Single-char delimiters (last — most common, least specific)
	{ regex: /^([\w-]+)\[(.+?)\]/, shape: "rectangle" },
	// A[text]
	{ regex: /^([\w-]+)\((.+?)\)/, shape: "rounded" },
	// A(text)
	{ regex: /^([\w-]+)\{(.+?)\}/, shape: "diamond" },
	// A{text}
];
var BARE_NODE_REGEX = /^([\w-]+)/;
var CLASS_SHORTHAND_REGEX = /^:::([\w][\w-]*)/;
function parseEdgeLine(line, graph, subgraphStack) {
	let remaining = line.trim();
	const firstGroup = consumeNodeGroup(remaining, graph, subgraphStack);
	if (!firstGroup || firstGroup.ids.length === 0) return;
	remaining = firstGroup.remaining.trim();
	let prevGroupIds = firstGroup.ids;
	while (remaining.length > 0) {
		const arrowMatch = remaining.match(ARROW_REGEX);
		if (!arrowMatch) break;
		const hasArrowStart = Boolean(arrowMatch[1]);
		const arrowOp = arrowMatch[2];
		const edgeLabel = arrowMatch[3]?.trim() || void 0;
		remaining = remaining.slice(arrowMatch[0].length).trim();
		const style = arrowStyleFromOp(arrowOp);
		const hasArrowEnd = arrowOp.endsWith(">");
		const nextGroup = consumeNodeGroup(remaining, graph, subgraphStack);
		if (!nextGroup || nextGroup.ids.length === 0) break;
		remaining = nextGroup.remaining.trim();
		for (const sourceId of prevGroupIds) {
			for (const targetId of nextGroup.ids) {
				graph.edges.push({
					source: sourceId,
					target: targetId,
					label: edgeLabel,
					style,
					hasArrowStart,
					hasArrowEnd,
				});
			}
		}
		prevGroupIds = nextGroup.ids;
	}
}
function consumeNodeGroup(text, graph, subgraphStack) {
	const first = consumeNode(text, graph, subgraphStack);
	if (!first) return null;
	const ids = [first.id];
	let remaining = first.remaining.trim();
	while (remaining.startsWith("&")) {
		remaining = remaining.slice(1).trim();
		const next = consumeNode(remaining, graph, subgraphStack);
		if (!next) break;
		ids.push(next.id);
		remaining = next.remaining.trim();
	}
	return { ids, remaining };
}
function consumeNode(text, graph, subgraphStack) {
	let id = null;
	let remaining = text;
	for (const { regex, shape } of NODE_PATTERNS) {
		const match = text.match(regex);
		if (match) {
			id = match[1];
			const label = match[2];
			registerNode(graph, subgraphStack, { id, label, shape });
			remaining = text.slice(match[0].length);
			break;
		}
	}
	if (id === null) {
		const bareMatch = text.match(BARE_NODE_REGEX);
		if (bareMatch) {
			id = bareMatch[1];
			if (!graph.nodes.has(id)) {
				registerNode(graph, subgraphStack, {
					id,
					label: id,
					shape: "rectangle",
				});
			} else {
				trackInSubgraph(subgraphStack, id);
			}
			remaining = text.slice(bareMatch[0].length);
		}
	}
	if (id === null) return null;
	const classMatch = remaining.match(CLASS_SHORTHAND_REGEX);
	if (classMatch) {
		graph.classAssignments.set(id, classMatch[1]);
		remaining = remaining.slice(classMatch[0].length);
	}
	return { id, remaining };
}
function registerNode(graph, subgraphStack, node) {
	const isNew = !graph.nodes.has(node.id);
	if (isNew) {
		graph.nodes.set(node.id, node);
	}
	trackInSubgraph(subgraphStack, node.id);
}
function trackInSubgraph(subgraphStack, nodeId) {
	if (subgraphStack.length > 0) {
		const current = subgraphStack[subgraphStack.length - 1];
		if (!current.nodeIds.includes(nodeId)) {
			current.nodeIds.push(nodeId);
		}
	}
}
function arrowStyleFromOp(op) {
	if (op === "-.->") return "dotted";
	if (op === "-.-") return "dotted";
	if (op === "==>") return "thick";
	if (op === "===") return "thick";
	return "solid";
}

// src/ascii/types.ts
var Up = { x: 1, y: 0 };
var Down = { x: 1, y: 2 };
var Left = { x: 0, y: 1 };
var Right = { x: 2, y: 1 };
var UpperRight = { x: 2, y: 0 };
var UpperLeft = { x: 0, y: 0 };
var LowerRight = { x: 2, y: 2 };
var LowerLeft = { x: 0, y: 2 };
var Middle = { x: 1, y: 1 };
function gridCoordEquals(a, b) {
	return a.x === b.x && a.y === b.y;
}
function drawingCoordEquals(a, b) {
	return a.x === b.x && a.y === b.y;
}
function gridCoordDirection(c, dir) {
	return { x: c.x + dir.x, y: c.y + dir.y };
}
function gridKey(c) {
	return `${c.x},${c.y}`;
}
var EMPTY_STYLE = { name: "", styles: {} };

// src/ascii/canvas.ts
function mkCanvas(x, y) {
	const canvas = [];
	for (let i = 0; i <= x; i++) {
		const col = [];
		for (let j = 0; j <= y; j++) {
			col.push(" ");
		}
		canvas.push(col);
	}
	return canvas;
}
function copyCanvas(source) {
	const [maxX, maxY] = getCanvasSize(source);
	return mkCanvas(maxX, maxY);
}
function getCanvasSize(canvas) {
	return [canvas.length - 1, (canvas[0]?.length ?? 1) - 1];
}
function increaseSize(canvas, newX, newY) {
	const [currX, currY] = getCanvasSize(canvas);
	const targetX = Math.max(newX, currX);
	const targetY = Math.max(newY, currY);
	const grown = mkCanvas(targetX, targetY);
	for (let x = 0; x < grown.length; x++) {
		for (let y = 0; y < grown[0].length; y++) {
			if (x < canvas.length && y < canvas[0].length) {
				grown[x][y] = canvas[x][y];
			}
		}
	}
	canvas.length = 0;
	canvas.push(...grown);
	return canvas;
}
var JUNCTION_CHARS = /* @__PURE__ */ new Set([
	"\u2500",
	"\u2502",
	"\u250C",
	"\u2510",
	"\u2514",
	"\u2518",
	"\u251C",
	"\u2524",
	"\u252C",
	"\u2534",
	"\u253C",
	"\u2574",
	"\u2575",
	"\u2576",
	"\u2577",
]);
function isJunctionChar(c) {
	return JUNCTION_CHARS.has(c);
}
var JUNCTION_MAP = {
	"\u2500": {
		"\u2502": "\u253C",
		"\u250C": "\u252C",
		"\u2510": "\u252C",
		"\u2514": "\u2534",
		"\u2518": "\u2534",
		"\u251C": "\u253C",
		"\u2524": "\u253C",
		"\u252C": "\u252C",
		"\u2534": "\u2534",
	},
	"\u2502": {
		"\u2500": "\u253C",
		"\u250C": "\u251C",
		"\u2510": "\u2524",
		"\u2514": "\u251C",
		"\u2518": "\u2524",
		"\u251C": "\u251C",
		"\u2524": "\u2524",
		"\u252C": "\u253C",
		"\u2534": "\u253C",
	},
	"\u250C": {
		"\u2500": "\u252C",
		"\u2502": "\u251C",
		"\u2510": "\u252C",
		"\u2514": "\u251C",
		"\u2518": "\u253C",
		"\u251C": "\u251C",
		"\u2524": "\u253C",
		"\u252C": "\u252C",
		"\u2534": "\u253C",
	},
	"\u2510": {
		"\u2500": "\u252C",
		"\u2502": "\u2524",
		"\u250C": "\u252C",
		"\u2514": "\u253C",
		"\u2518": "\u2524",
		"\u251C": "\u253C",
		"\u2524": "\u2524",
		"\u252C": "\u252C",
		"\u2534": "\u253C",
	},
	"\u2514": {
		"\u2500": "\u2534",
		"\u2502": "\u251C",
		"\u250C": "\u251C",
		"\u2510": "\u253C",
		"\u2518": "\u2534",
		"\u251C": "\u251C",
		"\u2524": "\u253C",
		"\u252C": "\u253C",
		"\u2534": "\u2534",
	},
	"\u2518": {
		"\u2500": "\u2534",
		"\u2502": "\u2524",
		"\u250C": "\u253C",
		"\u2510": "\u2524",
		"\u2514": "\u2534",
		"\u251C": "\u253C",
		"\u2524": "\u2524",
		"\u252C": "\u253C",
		"\u2534": "\u2534",
	},
	"\u251C": {
		"\u2500": "\u253C",
		"\u2502": "\u251C",
		"\u250C": "\u251C",
		"\u2510": "\u253C",
		"\u2514": "\u251C",
		"\u2518": "\u253C",
		"\u2524": "\u253C",
		"\u252C": "\u253C",
		"\u2534": "\u253C",
	},
	"\u2524": {
		"\u2500": "\u253C",
		"\u2502": "\u2524",
		"\u250C": "\u253C",
		"\u2510": "\u2524",
		"\u2514": "\u253C",
		"\u2518": "\u2524",
		"\u251C": "\u253C",
		"\u252C": "\u253C",
		"\u2534": "\u253C",
	},
	"\u252C": {
		"\u2500": "\u252C",
		"\u2502": "\u253C",
		"\u250C": "\u252C",
		"\u2510": "\u252C",
		"\u2514": "\u253C",
		"\u2518": "\u253C",
		"\u251C": "\u253C",
		"\u2524": "\u253C",
		"\u2534": "\u253C",
	},
	"\u2534": {
		"\u2500": "\u2534",
		"\u2502": "\u253C",
		"\u250C": "\u253C",
		"\u2510": "\u253C",
		"\u2514": "\u2534",
		"\u2518": "\u2534",
		"\u251C": "\u253C",
		"\u2524": "\u253C",
		"\u252C": "\u253C",
	},
};
function mergeJunctions(c1, c2) {
	return JUNCTION_MAP[c1]?.[c2] ?? c1;
}
function mergeCanvases(base, offset, useAscii, ...overlays) {
	let [maxX, maxY] = getCanvasSize(base);
	for (const overlay of overlays) {
		const [oX, oY] = getCanvasSize(overlay);
		maxX = Math.max(maxX, oX + offset.x);
		maxY = Math.max(maxY, oY + offset.y);
	}
	const merged = mkCanvas(maxX, maxY);
	for (let x = 0; x <= maxX; x++) {
		for (let y = 0; y <= maxY; y++) {
			if (x < base.length && y < base[0].length) {
				merged[x][y] = base[x][y];
			}
		}
	}
	for (const overlay of overlays) {
		for (let x = 0; x < overlay.length; x++) {
			for (let y = 0; y < overlay[0].length; y++) {
				const c = overlay[x][y];
				if (c !== " ") {
					const mx = x + offset.x;
					const my = y + offset.y;
					const current = merged[mx][my];
					if (!useAscii && isJunctionChar(c) && isJunctionChar(current)) {
						merged[mx][my] = mergeJunctions(current, c);
					} else {
						merged[mx][my] = c;
					}
				}
			}
		}
	}
	return merged;
}
function canvasToString(canvas) {
	const [maxX, maxY] = getCanvasSize(canvas);
	const lines = [];
	for (let y = 0; y <= maxY; y++) {
		let line = "";
		for (let x = 0; x <= maxX; x++) {
			line += canvas[x][y];
		}
		lines.push(line);
	}
	return lines.join("\n");
}
var VERTICAL_FLIP_MAP = {
	// Unicode arrows
	"\u25B2": "\u25BC",
	"\u25BC": "\u25B2",
	"\u25E4": "\u25E3",
	"\u25E3": "\u25E4",
	"\u25E5": "\u25E2",
	"\u25E2": "\u25E5",
	// ASCII arrows
	"^": "v",
	v: "^",
	// Unicode corners
	"\u250C": "\u2514",
	"\u2514": "\u250C",
	"\u2510": "\u2518",
	"\u2518": "\u2510",
	// Unicode junctions (T-pieces flip vertically)
	"\u252C": "\u2534",
	"\u2534": "\u252C",
	// Box-start junctions (exit points from node boxes)
	"\u2575": "\u2577",
	"\u2577": "\u2575",
};
function flipCanvasVertically(canvas) {
	for (const col of canvas) {
		col.reverse();
	}
	for (const col of canvas) {
		for (let y = 0; y < col.length; y++) {
			const flipped = VERTICAL_FLIP_MAP[col[y]];
			if (flipped) col[y] = flipped;
		}
	}
	return canvas;
}
function drawText(canvas, start, text) {
	increaseSize(canvas, start.x + text.length, start.y);
	for (let i = 0; i < text.length; i++) {
		canvas[start.x + i][start.y] = text[i];
	}
}
function setCanvasSizeToGrid(canvas, columnWidth, rowHeight) {
	let maxX = 0;
	let maxY = 0;
	for (const w of columnWidth.values()) maxX += w;
	for (const h of rowHeight.values()) maxY += h;
	increaseSize(canvas, maxX - 1, maxY - 1);
}

// src/ascii/converter.ts
function convertToAsciiGraph(parsed, config) {
	const nodeMap = /* @__PURE__ */ new Map();
	let index = 0;
	for (const [id, mNode] of parsed.nodes) {
		const asciiNode = {
			// Use the parser ID as the unique identity key to avoid collisions
			// when multiple nodes share the same label (e.g. A[Web Server], C[Web Server]).
			name: id,
			// The label is used for rendering inside the box.
			displayLabel: mNode.label,
			index,
			gridCoord: null,
			drawingCoord: null,
			drawing: null,
			drawn: false,
			styleClassName: "",
			styleClass: EMPTY_STYLE,
		};
		nodeMap.set(id, asciiNode);
		index++;
	}
	const nodes = [...nodeMap.values()];
	const edges = [];
	for (const mEdge of parsed.edges) {
		const from = nodeMap.get(mEdge.source);
		const to = nodeMap.get(mEdge.target);
		if (!from || !to) continue;
		edges.push({
			from,
			to,
			text: mEdge.label ?? "",
			path: [],
			labelLine: [],
			startDir: { x: 0, y: 0 },
			endDir: { x: 0, y: 0 },
		});
	}
	const subgraphs = [];
	for (const mSg of parsed.subgraphs) {
		convertSubgraph(mSg, null, nodeMap, subgraphs);
	}
	deduplicateSubgraphNodes(parsed.subgraphs, subgraphs, nodeMap);
	for (const [nodeId, className] of parsed.classAssignments) {
		const node = nodeMap.get(nodeId);
		const classDef = parsed.classDefs.get(className);
		if (node && classDef) {
			node.styleClassName = className;
			node.styleClass = { name: className, styles: classDef };
		}
	}
	return {
		nodes,
		edges,
		canvas: mkCanvas(0, 0),
		grid: /* @__PURE__ */ new Map(),
		columnWidth: /* @__PURE__ */ new Map(),
		rowHeight: /* @__PURE__ */ new Map(),
		subgraphs,
		config,
		offsetX: 0,
		offsetY: 0,
	};
}
function convertSubgraph(mSg, parent, nodeMap, allSubgraphs) {
	const sg = {
		name: mSg.label,
		nodes: [],
		parent,
		children: [],
		minX: 0,
		minY: 0,
		maxX: 0,
		maxY: 0,
	};
	for (const nodeId of mSg.nodeIds) {
		const node = nodeMap.get(nodeId);
		if (node) sg.nodes.push(node);
	}
	allSubgraphs.push(sg);
	for (const childMSg of mSg.children) {
		const child = convertSubgraph(childMSg, sg, nodeMap, allSubgraphs);
		sg.children.push(child);
		for (const childNode of child.nodes) {
			if (!sg.nodes.includes(childNode)) {
				sg.nodes.push(childNode);
			}
		}
	}
	return sg;
}
function deduplicateSubgraphNodes(
	mermaidSubgraphs,
	asciiSubgraphs,
	nodeMap,
	parsed,
) {
	const sgMap = /* @__PURE__ */ new Map();
	buildSgMap(mermaidSubgraphs, asciiSubgraphs, sgMap);
	const nodeOwner = /* @__PURE__ */ new Map();
	function claimNodes(mSg) {
		const asciiSg = sgMap.get(mSg);
		if (!asciiSg) return;
		for (const child of mSg.children) {
			claimNodes(child);
		}
		for (const nodeId of mSg.nodeIds) {
			if (!nodeOwner.has(nodeId)) {
				nodeOwner.set(nodeId, asciiSg);
			}
		}
	}
	for (const mSg of mermaidSubgraphs) {
		claimNodes(mSg);
	}
	for (const asciiSg of asciiSubgraphs) {
		asciiSg.nodes = asciiSg.nodes.filter((node) => {
			let nodeId;
			for (const [id, n] of nodeMap) {
				if (n === node) {
					nodeId = id;
					break;
				}
			}
			if (!nodeId) return false;
			const owner = nodeOwner.get(nodeId);
			if (!owner) return true;
			return isAncestorOrSelf(asciiSg, owner);
		});
	}
}
function isAncestorOrSelf(candidate, target) {
	let current = target;
	while (current !== null) {
		if (current === candidate) return true;
		current = current.parent;
	}
	return false;
}
function buildSgMap(mSgs, aSgs, result) {
	const flatMermaid = [];
	function flatten(sgs) {
		for (const sg of sgs) {
			flatMermaid.push(sg);
			flatten(sg.children);
		}
	}
	flatten(mSgs);
	for (let i = 0; i < flatMermaid.length && i < aSgs.length; i++) {
		result.set(flatMermaid[i], aSgs[i]);
	}
}

// src/ascii/pathfinder.ts
var MinHeap = class {
	items = [];
	get length() {
		return this.items.length;
	}
	push(item) {
		this.items.push(item);
		this.bubbleUp(this.items.length - 1);
	}
	pop() {
		if (this.items.length === 0) return void 0;
		const top = this.items[0];
		const last = this.items.pop();
		if (this.items.length > 0) {
			this.items[0] = last;
			this.sinkDown(0);
		}
		return top;
	}
	bubbleUp(i) {
		while (i > 0) {
			const parent = (i - 1) >> 1;
			if (this.items[i].priority < this.items[parent].priority) {
				[this.items[i], this.items[parent]] = [
					this.items[parent],
					this.items[i],
				];
				i = parent;
			} else {
				break;
			}
		}
	}
	sinkDown(i) {
		const n = this.items.length;
		while (true) {
			let smallest = i;
			const left = 2 * i + 1;
			const right = 2 * i + 2;
			if (
				left < n &&
				this.items[left].priority < this.items[smallest].priority
			) {
				smallest = left;
			}
			if (
				right < n &&
				this.items[right].priority < this.items[smallest].priority
			) {
				smallest = right;
			}
			if (smallest !== i) {
				[this.items[i], this.items[smallest]] = [
					this.items[smallest],
					this.items[i],
				];
				i = smallest;
			} else {
				break;
			}
		}
	}
};
function heuristic(a, b) {
	const absX = Math.abs(a.x - b.x);
	const absY = Math.abs(a.y - b.y);
	if (absX === 0 || absY === 0) {
		return absX + absY;
	}
	return absX + absY + 1;
}
var MOVE_DIRS = [
	{ x: 1, y: 0 },
	{ x: -1, y: 0 },
	{ x: 0, y: 1 },
	{ x: 0, y: -1 },
];
function isFreeInGrid(grid, c) {
	if (c.x < 0 || c.y < 0) return false;
	return !grid.has(gridKey(c));
}
function getPath(grid, from, to) {
	const pq = new MinHeap();
	pq.push({ coord: from, priority: 0 });
	const costSoFar = /* @__PURE__ */ new Map();
	costSoFar.set(gridKey(from), 0);
	const cameFrom = /* @__PURE__ */ new Map();
	cameFrom.set(gridKey(from), null);
	while (pq.length > 0) {
		const current = pq.pop().coord;
		if (gridCoordEquals(current, to)) {
			const path = [];
			let c = current;
			while (c !== null) {
				path.unshift(c);
				c = cameFrom.get(gridKey(c)) ?? null;
			}
			return path;
		}
		const currentCost = costSoFar.get(gridKey(current));
		for (const dir of MOVE_DIRS) {
			const next = { x: current.x + dir.x, y: current.y + dir.y };
			if (!isFreeInGrid(grid, next) && !gridCoordEquals(next, to)) {
				continue;
			}
			const newCost = currentCost + 1;
			const nextKey = gridKey(next);
			const existingCost = costSoFar.get(nextKey);
			if (existingCost === void 0 || newCost < existingCost) {
				costSoFar.set(nextKey, newCost);
				const priority = newCost + heuristic(next, to);
				pq.push({ coord: next, priority });
				cameFrom.set(nextKey, current);
			}
		}
	}
	return null;
}
function mergePath(path) {
	if (path.length <= 2) return path;
	const toRemove = /* @__PURE__ */ new Set();
	let step0 = path[0];
	let step1 = path[1];
	for (let idx = 2; idx < path.length; idx++) {
		const step2 = path[idx];
		const prevDx = step1.x - step0.x;
		const prevDy = step1.y - step0.y;
		const dx = step2.x - step1.x;
		const dy = step2.y - step1.y;
		if (prevDx === dx && prevDy === dy) {
			toRemove.add(idx - 1);
		}
		step0 = step1;
		step1 = step2;
	}
	return path.filter((_, i) => !toRemove.has(i));
}

// src/ascii/edge-routing.ts
function getOpposite(d) {
	if (d === Up) return Down;
	if (d === Down) return Up;
	if (d === Left) return Right;
	if (d === Right) return Left;
	if (d === UpperRight) return LowerLeft;
	if (d === UpperLeft) return LowerRight;
	if (d === LowerRight) return UpperLeft;
	if (d === LowerLeft) return UpperRight;
	return Middle;
}
function dirEquals(a, b) {
	return a.x === b.x && a.y === b.y;
}
function determineDirection(from, to) {
	if (from.x === to.x) {
		return from.y < to.y ? Down : Up;
	} else if (from.y === to.y) {
		return from.x < to.x ? Right : Left;
	} else if (from.x < to.x) {
		return from.y < to.y ? LowerRight : UpperRight;
	} else {
		return from.y < to.y ? LowerLeft : UpperLeft;
	}
}
function selfReferenceDirection(graphDirection) {
	if (graphDirection === "LR") return [Right, Down, Down, Right];
	return [Down, Right, Right, Down];
}
function determineStartAndEndDir(edge, graphDirection) {
	if (edge.from === edge.to) return selfReferenceDirection(graphDirection);
	const d = determineDirection(edge.from.gridCoord, edge.to.gridCoord);
	let preferredDir;
	let preferredOppositeDir;
	let alternativeDir;
	let alternativeOppositeDir;
	const isBackwards =
		graphDirection === "LR"
			? dirEquals(d, Left) || dirEquals(d, UpperLeft) || dirEquals(d, LowerLeft)
			: dirEquals(d, Up) || dirEquals(d, UpperLeft) || dirEquals(d, UpperRight);
	if (dirEquals(d, LowerRight)) {
		if (graphDirection === "LR") {
			preferredDir = Down;
			preferredOppositeDir = Left;
			alternativeDir = Right;
			alternativeOppositeDir = Up;
		} else {
			preferredDir = Right;
			preferredOppositeDir = Up;
			alternativeDir = Down;
			alternativeOppositeDir = Left;
		}
	} else if (dirEquals(d, UpperRight)) {
		if (graphDirection === "LR") {
			preferredDir = Up;
			preferredOppositeDir = Left;
			alternativeDir = Right;
			alternativeOppositeDir = Down;
		} else {
			preferredDir = Right;
			preferredOppositeDir = Down;
			alternativeDir = Up;
			alternativeOppositeDir = Left;
		}
	} else if (dirEquals(d, LowerLeft)) {
		if (graphDirection === "LR") {
			preferredDir = Down;
			preferredOppositeDir = Down;
			alternativeDir = Left;
			alternativeOppositeDir = Up;
		} else {
			preferredDir = Left;
			preferredOppositeDir = Up;
			alternativeDir = Down;
			alternativeOppositeDir = Right;
		}
	} else if (dirEquals(d, UpperLeft)) {
		if (graphDirection === "LR") {
			preferredDir = Down;
			preferredOppositeDir = Down;
			alternativeDir = Left;
			alternativeOppositeDir = Down;
		} else {
			preferredDir = Right;
			preferredOppositeDir = Right;
			alternativeDir = Up;
			alternativeOppositeDir = Right;
		}
	} else if (isBackwards) {
		if (graphDirection === "LR" && dirEquals(d, Left)) {
			preferredDir = Down;
			preferredOppositeDir = Down;
			alternativeDir = Left;
			alternativeOppositeDir = Right;
		} else if (graphDirection === "TD" && dirEquals(d, Up)) {
			preferredDir = Right;
			preferredOppositeDir = Right;
			alternativeDir = Up;
			alternativeOppositeDir = Down;
		} else {
			preferredDir = d;
			preferredOppositeDir = getOpposite(d);
			alternativeDir = d;
			alternativeOppositeDir = getOpposite(d);
		}
	} else {
		preferredDir = d;
		preferredOppositeDir = getOpposite(d);
		alternativeDir = d;
		alternativeOppositeDir = getOpposite(d);
	}
	return [
		preferredDir,
		preferredOppositeDir,
		alternativeDir,
		alternativeOppositeDir,
	];
}
function determinePath(graph, edge) {
	const [
		preferredDir,
		preferredOppositeDir,
		alternativeDir,
		alternativeOppositeDir,
	] = determineStartAndEndDir(edge, graph.config.graphDirection);
	const prefFrom = gridCoordDirection(edge.from.gridCoord, preferredDir);
	const prefTo = gridCoordDirection(edge.to.gridCoord, preferredOppositeDir);
	let preferredPath = getPath(graph.grid, prefFrom, prefTo);
	if (preferredPath === null) {
		edge.startDir = alternativeDir;
		edge.endDir = alternativeOppositeDir;
		edge.path = [];
		return;
	}
	preferredPath = mergePath(preferredPath);
	const altFrom = gridCoordDirection(edge.from.gridCoord, alternativeDir);
	const altTo = gridCoordDirection(edge.to.gridCoord, alternativeOppositeDir);
	let alternativePath = getPath(graph.grid, altFrom, altTo);
	if (alternativePath === null) {
		edge.startDir = preferredDir;
		edge.endDir = preferredOppositeDir;
		edge.path = preferredPath;
		return;
	}
	alternativePath = mergePath(alternativePath);
	if (preferredPath.length <= alternativePath.length) {
		edge.startDir = preferredDir;
		edge.endDir = preferredOppositeDir;
		edge.path = preferredPath;
	} else {
		edge.startDir = alternativeDir;
		edge.endDir = alternativeOppositeDir;
		edge.path = alternativePath;
	}
}
function determineLabelLine(graph, edge) {
	if (edge.text.length === 0) return;
	const lenLabel = edge.text.length;
	let prevStep = edge.path[0];
	let largestLine = [prevStep, edge.path[1]];
	let largestLineSize = 0;
	for (let i = 1; i < edge.path.length; i++) {
		const step = edge.path[i];
		const line = [prevStep, step];
		const lineWidth = calculateLineWidth(graph, line);
		if (lineWidth >= lenLabel) {
			largestLine = line;
			break;
		} else if (lineWidth > largestLineSize) {
			largestLineSize = lineWidth;
			largestLine = line;
		}
		prevStep = step;
	}
	const minX = Math.min(largestLine[0].x, largestLine[1].x);
	const maxX = Math.max(largestLine[0].x, largestLine[1].x);
	const middleX = minX + Math.floor((maxX - minX) / 2);
	const current = graph.columnWidth.get(middleX) ?? 0;
	graph.columnWidth.set(middleX, Math.max(current, lenLabel + 2));
	edge.labelLine = [largestLine[0], largestLine[1]];
}
function calculateLineWidth(graph, line) {
	let total = 0;
	const startX = Math.min(line[0].x, line[1].x);
	const endX = Math.max(line[0].x, line[1].x);
	for (let x = startX; x <= endX; x++) {
		total += graph.columnWidth.get(x) ?? 0;
	}
	return total;
}

// src/ascii/draw.ts
function drawBox(node, graph) {
	const gc = node.gridCoord;
	const useAscii = graph.config.useAscii;
	let w = 0;
	for (let i = 0; i < 2; i++) {
		w += graph.columnWidth.get(gc.x + i) ?? 0;
	}
	let h = 0;
	for (let i = 0; i < 2; i++) {
		h += graph.rowHeight.get(gc.y + i) ?? 0;
	}
	const from = { x: 0, y: 0 };
	const to = { x: w, y: h };
	const box = mkCanvas(Math.max(from.x, to.x), Math.max(from.y, to.y));
	if (!useAscii) {
		for (let x = from.x + 1; x < to.x; x++) box[x][from.y] = "\u2500";
		for (let x = from.x + 1; x < to.x; x++) box[x][to.y] = "\u2500";
		for (let y = from.y + 1; y < to.y; y++) box[from.x][y] = "\u2502";
		for (let y = from.y + 1; y < to.y; y++) box[to.x][y] = "\u2502";
		box[from.x][from.y] = "\u250C";
		box[to.x][from.y] = "\u2510";
		box[from.x][to.y] = "\u2514";
		box[to.x][to.y] = "\u2518";
	} else {
		for (let x = from.x + 1; x < to.x; x++) box[x][from.y] = "-";
		for (let x = from.x + 1; x < to.x; x++) box[x][to.y] = "-";
		for (let y = from.y + 1; y < to.y; y++) box[from.x][y] = "|";
		for (let y = from.y + 1; y < to.y; y++) box[to.x][y] = "|";
		box[from.x][from.y] = "+";
		box[to.x][from.y] = "+";
		box[from.x][to.y] = "+";
		box[to.x][to.y] = "+";
	}
	const label = node.displayLabel;
	const textY = from.y + Math.floor(h / 2);
	const textX = from.x + Math.floor(w / 2) - Math.ceil(label.length / 2) + 1;
	for (let i = 0; i < label.length; i++) {
		box[textX + i][textY] = label[i];
	}
	return box;
}
function drawMultiBox(sections, useAscii, padding = 1) {
	let maxTextWidth = 0;
	for (const section of sections) {
		for (const line of section) {
			maxTextWidth = Math.max(maxTextWidth, line.length);
		}
	}
	const innerWidth = maxTextWidth + 2 * padding;
	const boxWidth = innerWidth + 2;
	let totalLines = 0;
	for (const section of sections) {
		totalLines += Math.max(section.length, 1);
	}
	const numDividers = sections.length - 1;
	const boxHeight = totalLines + numDividers + 2;
	const hLine = useAscii ? "-" : "\u2500";
	const vLine = useAscii ? "|" : "\u2502";
	const tl = useAscii ? "+" : "\u250C";
	const tr = useAscii ? "+" : "\u2510";
	const bl = useAscii ? "+" : "\u2514";
	const br = useAscii ? "+" : "\u2518";
	const divL = useAscii ? "+" : "\u251C";
	const divR = useAscii ? "+" : "\u2524";
	const canvas = mkCanvas(boxWidth - 1, boxHeight - 1);
	canvas[0][0] = tl;
	for (let x = 1; x < boxWidth - 1; x++) canvas[x][0] = hLine;
	canvas[boxWidth - 1][0] = tr;
	canvas[0][boxHeight - 1] = bl;
	for (let x = 1; x < boxWidth - 1; x++) canvas[x][boxHeight - 1] = hLine;
	canvas[boxWidth - 1][boxHeight - 1] = br;
	for (let y = 1; y < boxHeight - 1; y++) {
		canvas[0][y] = vLine;
		canvas[boxWidth - 1][y] = vLine;
	}
	let row = 1;
	for (let s = 0; s < sections.length; s++) {
		const section = sections[s];
		const lines = section.length > 0 ? section : [""];
		for (const line of lines) {
			const startX = 1 + padding;
			for (let i = 0; i < line.length; i++) {
				canvas[startX + i][row] = line[i];
			}
			row++;
		}
		if (s < sections.length - 1) {
			canvas[0][row] = divL;
			for (let x = 1; x < boxWidth - 1; x++) canvas[x][row] = hLine;
			canvas[boxWidth - 1][row] = divR;
			row++;
		}
	}
	return canvas;
}
function drawLine(canvas, from, to, offsetFrom, offsetTo, useAscii) {
	const dir = determineDirection(from, to);
	const drawnCoords = [];
	const hChar = useAscii ? "-" : "\u2500";
	const vChar = useAscii ? "|" : "\u2502";
	const bslash = useAscii ? "\\" : "\u2572";
	const fslash = useAscii ? "/" : "\u2571";
	if (dirEquals(dir, Up)) {
		for (let y = from.y - offsetFrom; y >= to.y - offsetTo; y--) {
			drawnCoords.push({ x: from.x, y });
			canvas[from.x][y] = vChar;
		}
	} else if (dirEquals(dir, Down)) {
		for (let y = from.y + offsetFrom; y <= to.y + offsetTo; y++) {
			drawnCoords.push({ x: from.x, y });
			canvas[from.x][y] = vChar;
		}
	} else if (dirEquals(dir, Left)) {
		for (let x = from.x - offsetFrom; x >= to.x - offsetTo; x--) {
			drawnCoords.push({ x, y: from.y });
			canvas[x][from.y] = hChar;
		}
	} else if (dirEquals(dir, Right)) {
		for (let x = from.x + offsetFrom; x <= to.x + offsetTo; x++) {
			drawnCoords.push({ x, y: from.y });
			canvas[x][from.y] = hChar;
		}
	} else if (dirEquals(dir, UpperLeft)) {
		for (
			let x = from.x, y = from.y - offsetFrom;
			x >= to.x - offsetTo && y >= to.y - offsetTo;
			x--, y--
		) {
			drawnCoords.push({ x, y });
			canvas[x][y] = bslash;
		}
	} else if (dirEquals(dir, UpperRight)) {
		for (
			let x = from.x, y = from.y - offsetFrom;
			x <= to.x + offsetTo && y >= to.y - offsetTo;
			x++, y--
		) {
			drawnCoords.push({ x, y });
			canvas[x][y] = fslash;
		}
	} else if (dirEquals(dir, LowerLeft)) {
		for (
			let x = from.x, y = from.y + offsetFrom;
			x >= to.x - offsetTo && y <= to.y + offsetTo;
			x--, y++
		) {
			drawnCoords.push({ x, y });
			canvas[x][y] = fslash;
		}
	} else if (dirEquals(dir, LowerRight)) {
		for (
			let x = from.x, y = from.y + offsetFrom;
			x <= to.x + offsetTo && y <= to.y + offsetTo;
			x++, y++
		) {
			drawnCoords.push({ x, y });
			canvas[x][y] = bslash;
		}
	}
	return drawnCoords;
}
function drawArrow(graph, edge) {
	if (edge.path.length === 0) {
		const empty = copyCanvas(graph.canvas);
		return [empty, empty, empty, empty, empty];
	}
	const labelCanvas = drawArrowLabel(graph, edge);
	const [pathCanvas, linesDrawn, lineDirs] = drawPath(graph, edge.path);
	const boxStartCanvas = drawBoxStart(graph, edge.path, linesDrawn[0]);
	const arrowHeadCanvas = drawArrowHead(
		graph,
		linesDrawn[linesDrawn.length - 1],
		lineDirs[lineDirs.length - 1],
	);
	const cornersCanvas = drawCorners(graph, edge.path);
	return [
		pathCanvas,
		boxStartCanvas,
		arrowHeadCanvas,
		cornersCanvas,
		labelCanvas,
	];
}
function drawPath(graph, path) {
	const canvas = copyCanvas(graph.canvas);
	let previousCoord = path[0];
	const linesDrawn = [];
	const lineDirs = [];
	for (let i = 1; i < path.length; i++) {
		const nextCoord = path[i];
		const prevDC = gridToDrawingCoord(graph, previousCoord);
		const nextDC = gridToDrawingCoord(graph, nextCoord);
		if (drawingCoordEquals(prevDC, nextDC)) {
			previousCoord = nextCoord;
			continue;
		}
		const dir = determineDirection(previousCoord, nextCoord);
		const segment = drawLine(
			canvas,
			prevDC,
			nextDC,
			1,
			-1,
			graph.config.useAscii,
		);
		if (segment.length === 0) segment.push(prevDC);
		linesDrawn.push(segment);
		lineDirs.push(dir);
		previousCoord = nextCoord;
	}
	return [canvas, linesDrawn, lineDirs];
}
function drawBoxStart(graph, path, firstLine) {
	const canvas = copyCanvas(graph.canvas);
	if (graph.config.useAscii) return canvas;
	const from = firstLine[0];
	const dir = determineDirection(path[0], path[1]);
	if (dirEquals(dir, Up)) canvas[from.x][from.y + 1] = "\u2534";
	else if (dirEquals(dir, Down)) canvas[from.x][from.y - 1] = "\u252C";
	else if (dirEquals(dir, Left)) canvas[from.x + 1][from.y] = "\u2524";
	else if (dirEquals(dir, Right)) canvas[from.x - 1][from.y] = "\u251C";
	return canvas;
}
function drawArrowHead(graph, lastLine, fallbackDir) {
	const canvas = copyCanvas(graph.canvas);
	if (lastLine.length === 0) return canvas;
	const from = lastLine[0];
	const lastPos = lastLine[lastLine.length - 1];
	let dir = determineDirection(from, lastPos);
	if (lastLine.length === 1 || dirEquals(dir, Middle)) dir = fallbackDir;
	let char;
	if (!graph.config.useAscii) {
		if (dirEquals(dir, Up)) char = "\u25B2";
		else if (dirEquals(dir, Down)) char = "\u25BC";
		else if (dirEquals(dir, Left)) char = "\u25C4";
		else if (dirEquals(dir, Right)) char = "\u25BA";
		else if (dirEquals(dir, UpperRight)) char = "\u25E5";
		else if (dirEquals(dir, UpperLeft)) char = "\u25E4";
		else if (dirEquals(dir, LowerRight)) char = "\u25E2";
		else if (dirEquals(dir, LowerLeft)) char = "\u25E3";
		else {
			if (dirEquals(fallbackDir, Up)) char = "\u25B2";
			else if (dirEquals(fallbackDir, Down)) char = "\u25BC";
			else if (dirEquals(fallbackDir, Left)) char = "\u25C4";
			else if (dirEquals(fallbackDir, Right)) char = "\u25BA";
			else if (dirEquals(fallbackDir, UpperRight)) char = "\u25E5";
			else if (dirEquals(fallbackDir, UpperLeft)) char = "\u25E4";
			else if (dirEquals(fallbackDir, LowerRight)) char = "\u25E2";
			else if (dirEquals(fallbackDir, LowerLeft)) char = "\u25E3";
			else char = "\u25CF";
		}
	} else {
		if (dirEquals(dir, Up)) char = "^";
		else if (dirEquals(dir, Down)) char = "v";
		else if (dirEquals(dir, Left)) char = "<";
		else if (dirEquals(dir, Right)) char = ">";
		else {
			if (dirEquals(fallbackDir, Up)) char = "^";
			else if (dirEquals(fallbackDir, Down)) char = "v";
			else if (dirEquals(fallbackDir, Left)) char = "<";
			else if (dirEquals(fallbackDir, Right)) char = ">";
			else char = "*";
		}
	}
	canvas[lastPos.x][lastPos.y] = char;
	return canvas;
}
function drawCorners(graph, path) {
	const canvas = copyCanvas(graph.canvas);
	for (let idx = 1; idx < path.length - 1; idx++) {
		const coord = path[idx];
		const dc = gridToDrawingCoord(graph, coord);
		const prevDir = determineDirection(path[idx - 1], coord);
		const nextDir = determineDirection(coord, path[idx + 1]);
		let corner;
		if (!graph.config.useAscii) {
			if (
				(dirEquals(prevDir, Right) && dirEquals(nextDir, Down)) ||
				(dirEquals(prevDir, Up) && dirEquals(nextDir, Left))
			) {
				corner = "\u2510";
			} else if (
				(dirEquals(prevDir, Right) && dirEquals(nextDir, Up)) ||
				(dirEquals(prevDir, Down) && dirEquals(nextDir, Left))
			) {
				corner = "\u2518";
			} else if (
				(dirEquals(prevDir, Left) && dirEquals(nextDir, Down)) ||
				(dirEquals(prevDir, Up) && dirEquals(nextDir, Right))
			) {
				corner = "\u250C";
			} else if (
				(dirEquals(prevDir, Left) && dirEquals(nextDir, Up)) ||
				(dirEquals(prevDir, Down) && dirEquals(nextDir, Right))
			) {
				corner = "\u2514";
			} else {
				corner = "+";
			}
		} else {
			corner = "+";
		}
		canvas[dc.x][dc.y] = corner;
	}
	return canvas;
}
function drawArrowLabel(graph, edge) {
	const canvas = copyCanvas(graph.canvas);
	if (edge.text.length === 0) return canvas;
	const drawingLine = lineToDrawing(graph, edge.labelLine);
	drawTextOnLine(canvas, drawingLine, edge.text);
	return canvas;
}
function drawTextOnLine(canvas, line, label) {
	if (line.length < 2) return;
	const minX = Math.min(line[0].x, line[1].x);
	const maxX = Math.max(line[0].x, line[1].x);
	const minY = Math.min(line[0].y, line[1].y);
	const maxY = Math.max(line[0].y, line[1].y);
	const middleX = minX + Math.floor((maxX - minX) / 2);
	const middleY = minY + Math.floor((maxY - minY) / 2);
	const startX = middleX - Math.floor(label.length / 2);
	drawText(canvas, { x: startX, y: middleY }, label);
}
function drawSubgraphBox(sg, graph) {
	const width = sg.maxX - sg.minX;
	const height = sg.maxY - sg.minY;
	if (width <= 0 || height <= 0) return mkCanvas(0, 0);
	const from = { x: 0, y: 0 };
	const to = { x: width, y: height };
	const canvas = mkCanvas(width, height);
	if (!graph.config.useAscii) {
		for (let x = from.x + 1; x < to.x; x++) canvas[x][from.y] = "\u2500";
		for (let x = from.x + 1; x < to.x; x++) canvas[x][to.y] = "\u2500";
		for (let y = from.y + 1; y < to.y; y++) canvas[from.x][y] = "\u2502";
		for (let y = from.y + 1; y < to.y; y++) canvas[to.x][y] = "\u2502";
		canvas[from.x][from.y] = "\u250C";
		canvas[to.x][from.y] = "\u2510";
		canvas[from.x][to.y] = "\u2514";
		canvas[to.x][to.y] = "\u2518";
	} else {
		for (let x = from.x + 1; x < to.x; x++) canvas[x][from.y] = "-";
		for (let x = from.x + 1; x < to.x; x++) canvas[x][to.y] = "-";
		for (let y = from.y + 1; y < to.y; y++) canvas[from.x][y] = "|";
		for (let y = from.y + 1; y < to.y; y++) canvas[to.x][y] = "|";
		canvas[from.x][from.y] = "+";
		canvas[to.x][from.y] = "+";
		canvas[from.x][to.y] = "+";
		canvas[to.x][to.y] = "+";
	}
	return canvas;
}
function drawSubgraphLabel(sg, graph) {
	const width = sg.maxX - sg.minX;
	const height = sg.maxY - sg.minY;
	if (width <= 0 || height <= 0) return [mkCanvas(0, 0), { x: 0, y: 0 }];
	const canvas = mkCanvas(width, height);
	const labelY = 1;
	let labelX = Math.floor(width / 2) - Math.floor(sg.name.length / 2);
	if (labelX < 1) labelX = 1;
	for (let i = 0; i < sg.name.length; i++) {
		if (labelX + i < width) {
			canvas[labelX + i][labelY] = sg.name[i];
		}
	}
	return [canvas, { x: sg.minX, y: sg.minY }];
}
function sortSubgraphsByDepth(subgraphs) {
	function getDepth(sg) {
		return sg.parent === null ? 0 : 1 + getDepth(sg.parent);
	}
	const sorted = [...subgraphs];
	sorted.sort((a, b) => getDepth(a) - getDepth(b));
	return sorted;
}
function drawGraph(graph) {
	const useAscii = graph.config.useAscii;
	const sortedSgs = sortSubgraphsByDepth(graph.subgraphs);
	for (const sg of sortedSgs) {
		const sgCanvas = drawSubgraphBox(sg, graph);
		const offset = { x: sg.minX, y: sg.minY };
		graph.canvas = mergeCanvases(graph.canvas, offset, useAscii, sgCanvas);
	}
	for (const node of graph.nodes) {
		if (!node.drawn && node.drawingCoord && node.drawing) {
			graph.canvas = mergeCanvases(
				graph.canvas,
				node.drawingCoord,
				useAscii,
				node.drawing,
			);
			node.drawn = true;
		}
	}
	const lineCanvases = [];
	const cornerCanvases = [];
	const arrowHeadCanvases = [];
	const boxStartCanvases = [];
	const labelCanvases = [];
	for (const edge of graph.edges) {
		const [pathC, boxStartC, arrowHeadC, cornersC, labelC] = drawArrow(
			graph,
			edge,
		);
		lineCanvases.push(pathC);
		cornerCanvases.push(cornersC);
		arrowHeadCanvases.push(arrowHeadC);
		boxStartCanvases.push(boxStartC);
		labelCanvases.push(labelC);
	}
	const zero = { x: 0, y: 0 };
	graph.canvas = mergeCanvases(graph.canvas, zero, useAscii, ...lineCanvases);
	graph.canvas = mergeCanvases(graph.canvas, zero, useAscii, ...cornerCanvases);
	graph.canvas = mergeCanvases(
		graph.canvas,
		zero,
		useAscii,
		...arrowHeadCanvases,
	);
	graph.canvas = mergeCanvases(
		graph.canvas,
		zero,
		useAscii,
		...boxStartCanvases,
	);
	graph.canvas = mergeCanvases(graph.canvas, zero, useAscii, ...labelCanvases);
	for (const sg of graph.subgraphs) {
		if (sg.nodes.length === 0) continue;
		const [labelCanvas, offset] = drawSubgraphLabel(sg);
		graph.canvas = mergeCanvases(graph.canvas, offset, useAscii, labelCanvas);
	}
	return graph.canvas;
}

// src/ascii/grid.ts
function gridToDrawingCoord(graph, c, dir) {
	const target = c;
	let x = 0;
	for (let col = 0; col < target.x; col++) {
		x += graph.columnWidth.get(col) ?? 0;
	}
	let y = 0;
	for (let row = 0; row < target.y; row++) {
		y += graph.rowHeight.get(row) ?? 0;
	}
	const colW = graph.columnWidth.get(target.x) ?? 0;
	const rowH = graph.rowHeight.get(target.y) ?? 0;
	return {
		x: x + Math.floor(colW / 2) + graph.offsetX,
		y: y + Math.floor(rowH / 2) + graph.offsetY,
	};
}
function lineToDrawing(graph, line) {
	return line.map((c) => gridToDrawingCoord(graph, c));
}
function reserveSpotInGrid(graph, node, requested) {
	if (graph.grid.has(gridKey(requested))) {
		if (graph.config.graphDirection === "LR") {
			return reserveSpotInGrid(graph, node, {
				x: requested.x,
				y: requested.y + 4,
			});
		} else {
			return reserveSpotInGrid(graph, node, {
				x: requested.x + 4,
				y: requested.y,
			});
		}
	}
	for (let dx = 0; dx < 3; dx++) {
		for (let dy = 0; dy < 3; dy++) {
			const reserved = { x: requested.x + dx, y: requested.y + dy };
			graph.grid.set(gridKey(reserved), node);
		}
	}
	node.gridCoord = requested;
	return requested;
}
function setColumnWidth(graph, node) {
	const gc = node.gridCoord;
	const padding = graph.config.boxBorderPadding;
	const colWidths = [1, 2 * padding + node.displayLabel.length, 1];
	const rowHeights = [1, 1 + 2 * padding, 1];
	for (let idx = 0; idx < colWidths.length; idx++) {
		const xCoord = gc.x + idx;
		const current = graph.columnWidth.get(xCoord) ?? 0;
		graph.columnWidth.set(xCoord, Math.max(current, colWidths[idx]));
	}
	for (let idx = 0; idx < rowHeights.length; idx++) {
		const yCoord = gc.y + idx;
		const current = graph.rowHeight.get(yCoord) ?? 0;
		graph.rowHeight.set(yCoord, Math.max(current, rowHeights[idx]));
	}
	if (gc.x > 0) {
		const current = graph.columnWidth.get(gc.x - 1) ?? 0;
		graph.columnWidth.set(gc.x - 1, Math.max(current, graph.config.paddingX));
	}
	if (gc.y > 0) {
		let basePadding = graph.config.paddingY;
		if (hasIncomingEdgeFromOutsideSubgraph(graph, node)) {
			const subgraphOverhead = 4;
			basePadding += subgraphOverhead;
		}
		const current = graph.rowHeight.get(gc.y - 1) ?? 0;
		graph.rowHeight.set(gc.y - 1, Math.max(current, basePadding));
	}
}
function increaseGridSizeForPath(graph, path) {
	for (const c of path) {
		if (!graph.columnWidth.has(c.x)) {
			graph.columnWidth.set(c.x, Math.floor(graph.config.paddingX / 2));
		}
		if (!graph.rowHeight.has(c.y)) {
			graph.rowHeight.set(c.y, Math.floor(graph.config.paddingY / 2));
		}
	}
}
function isNodeInAnySubgraph(graph, node) {
	return graph.subgraphs.some((sg) => sg.nodes.includes(node));
}
function getNodeSubgraph(graph, node) {
	for (const sg of graph.subgraphs) {
		if (sg.nodes.includes(node)) return sg;
	}
	return null;
}
function hasIncomingEdgeFromOutsideSubgraph(graph, node) {
	const nodeSg = getNodeSubgraph(graph, node);
	if (!nodeSg) return false;
	let hasExternalEdge = false;
	for (const edge of graph.edges) {
		if (edge.to === node) {
			const sourceSg = getNodeSubgraph(graph, edge.from);
			if (sourceSg !== nodeSg) {
				hasExternalEdge = true;
				break;
			}
		}
	}
	if (!hasExternalEdge) return false;
	for (const otherNode of nodeSg.nodes) {
		if (otherNode === node || !otherNode.gridCoord) continue;
		let otherHasExternal = false;
		for (const edge of graph.edges) {
			if (edge.to === otherNode) {
				const sourceSg = getNodeSubgraph(graph, edge.from);
				if (sourceSg !== nodeSg) {
					otherHasExternal = true;
					break;
				}
			}
		}
		if (otherHasExternal && otherNode.gridCoord.y < node.gridCoord.y) {
			return false;
		}
	}
	return true;
}
function calculateSubgraphBoundingBox(graph, sg) {
	if (sg.nodes.length === 0) return;
	let minX = 1e6;
	let minY = 1e6;
	let maxX = -1e6;
	let maxY = -1e6;
	for (const child of sg.children) {
		calculateSubgraphBoundingBox(graph, child);
		if (child.nodes.length > 0) {
			minX = Math.min(minX, child.minX);
			minY = Math.min(minY, child.minY);
			maxX = Math.max(maxX, child.maxX);
			maxY = Math.max(maxY, child.maxY);
		}
	}
	for (const node of sg.nodes) {
		if (!node.drawingCoord || !node.drawing) continue;
		const nodeMinX = node.drawingCoord.x;
		const nodeMinY = node.drawingCoord.y;
		const nodeMaxX = nodeMinX + node.drawing.length - 1;
		const nodeMaxY = nodeMinY + node.drawing[0].length - 1;
		minX = Math.min(minX, nodeMinX);
		minY = Math.min(minY, nodeMinY);
		maxX = Math.max(maxX, nodeMaxX);
		maxY = Math.max(maxY, nodeMaxY);
	}
	const subgraphPadding = 2;
	const subgraphLabelSpace = 2;
	sg.minX = minX - subgraphPadding;
	sg.minY = minY - subgraphPadding - subgraphLabelSpace;
	sg.maxX = maxX + subgraphPadding;
	sg.maxY = maxY + subgraphPadding;
}
function ensureSubgraphSpacing(graph) {
	const minSpacing = 1;
	const rootSubgraphs = graph.subgraphs.filter(
		(sg) => sg.parent === null && sg.nodes.length > 0,
	);
	for (let i = 0; i < rootSubgraphs.length; i++) {
		for (let j = i + 1; j < rootSubgraphs.length; j++) {
			const sg1 = rootSubgraphs[i];
			const sg2 = rootSubgraphs[j];
			if (sg1.minX < sg2.maxX && sg1.maxX > sg2.minX) {
				if (sg1.maxY >= sg2.minY - minSpacing && sg1.minY < sg2.minY) {
					sg2.minY = sg1.maxY + minSpacing + 1;
				} else if (sg2.maxY >= sg1.minY - minSpacing && sg2.minY < sg1.minY) {
					sg1.minY = sg2.maxY + minSpacing + 1;
				}
			}
			if (sg1.minY < sg2.maxY && sg1.maxY > sg2.minY) {
				if (sg1.maxX >= sg2.minX - minSpacing && sg1.minX < sg2.minX) {
					sg2.minX = sg1.maxX + minSpacing + 1;
				} else if (sg2.maxX >= sg1.minX - minSpacing && sg2.minX < sg1.minX) {
					sg1.minX = sg2.maxX + minSpacing + 1;
				}
			}
		}
	}
}
function calculateSubgraphBoundingBoxes(graph) {
	for (const sg of graph.subgraphs) {
		calculateSubgraphBoundingBox(graph, sg);
	}
	ensureSubgraphSpacing(graph);
}
function offsetDrawingForSubgraphs(graph) {
	if (graph.subgraphs.length === 0) return;
	let minX = 0;
	let minY = 0;
	for (const sg of graph.subgraphs) {
		minX = Math.min(minX, sg.minX);
		minY = Math.min(minY, sg.minY);
	}
	const offsetX = -minX;
	const offsetY = -minY;
	if (offsetX === 0 && offsetY === 0) return;
	graph.offsetX = offsetX;
	graph.offsetY = offsetY;
	for (const sg of graph.subgraphs) {
		sg.minX += offsetX;
		sg.minY += offsetY;
		sg.maxX += offsetX;
		sg.maxY += offsetY;
	}
	for (const node of graph.nodes) {
		if (node.drawingCoord) {
			node.drawingCoord.x += offsetX;
			node.drawingCoord.y += offsetY;
		}
	}
}
function createMapping(graph) {
	const dir = graph.config.graphDirection;
	const highestPositionPerLevel = new Array(100).fill(0);
	const nodesFound = /* @__PURE__ */ new Set();
	const rootNodes = [];
	for (const node of graph.nodes) {
		if (!nodesFound.has(node.name)) {
			rootNodes.push(node);
		}
		nodesFound.add(node.name);
		for (const child of getChildren(graph, node)) {
			nodesFound.add(child.name);
		}
	}
	let hasExternalRoots = false;
	let hasSubgraphRootsWithEdges = false;
	for (const node of rootNodes) {
		if (isNodeInAnySubgraph(graph, node)) {
			if (getChildren(graph, node).length > 0) hasSubgraphRootsWithEdges = true;
		} else {
			hasExternalRoots = true;
		}
	}
	const shouldSeparate =
		dir === "LR" && hasExternalRoots && hasSubgraphRootsWithEdges;
	let externalRootNodes;
	let subgraphRootNodes = [];
	if (shouldSeparate) {
		externalRootNodes = rootNodes.filter((n) => !isNodeInAnySubgraph(graph, n));
		subgraphRootNodes = rootNodes.filter((n) => isNodeInAnySubgraph(graph, n));
	} else {
		externalRootNodes = rootNodes;
	}
	for (const node of externalRootNodes) {
		const requested =
			dir === "LR"
				? { x: 0, y: highestPositionPerLevel[0] }
				: { x: highestPositionPerLevel[0], y: 0 };
		reserveSpotInGrid(graph, graph.nodes[node.index], requested);
		highestPositionPerLevel[0] = highestPositionPerLevel[0] + 4;
	}
	if (shouldSeparate && subgraphRootNodes.length > 0) {
		const subgraphLevel = 4;
		for (const node of subgraphRootNodes) {
			const requested =
				dir === "LR"
					? { x: subgraphLevel, y: highestPositionPerLevel[subgraphLevel] }
					: { x: highestPositionPerLevel[subgraphLevel], y: subgraphLevel };
			reserveSpotInGrid(graph, graph.nodes[node.index], requested);
			highestPositionPerLevel[subgraphLevel] =
				highestPositionPerLevel[subgraphLevel] + 4;
		}
	}
	for (const node of graph.nodes) {
		const gc = node.gridCoord;
		const childLevel = dir === "LR" ? gc.x + 4 : gc.y + 4;
		let highestPosition = highestPositionPerLevel[childLevel];
		for (const child of getChildren(graph, node)) {
			if (child.gridCoord !== null) continue;
			const requested =
				dir === "LR"
					? { x: childLevel, y: highestPosition }
					: { x: highestPosition, y: childLevel };
			reserveSpotInGrid(graph, graph.nodes[child.index], requested);
			highestPositionPerLevel[childLevel] = highestPosition + 4;
			highestPosition = highestPositionPerLevel[childLevel];
		}
	}
	for (const node of graph.nodes) {
		setColumnWidth(graph, node);
	}
	for (const edge of graph.edges) {
		determinePath(graph, edge);
		increaseGridSizeForPath(graph, edge.path);
		determineLabelLine(graph, edge);
	}
	for (const node of graph.nodes) {
		node.drawingCoord = gridToDrawingCoord(graph, node.gridCoord);
		node.drawing = drawBox(node, graph);
	}
	setCanvasSizeToGrid(graph.canvas, graph.columnWidth, graph.rowHeight);
	calculateSubgraphBoundingBoxes(graph);
	offsetDrawingForSubgraphs(graph);
}
function getEdgesFromNode(graph, node) {
	return graph.edges.filter((e) => e.from.name === node.name);
}
function getChildren(graph, node) {
	return getEdgesFromNode(graph, node).map((e) => e.to);
}

// src/sequence/parser.ts
function parseSequenceDiagram(lines) {
	const diagram = {
		actors: [],
		messages: [],
		blocks: [],
		notes: [],
	};
	const actorIds = /* @__PURE__ */ new Set();
	const blockStack = [];
	for (let i = 1; i < lines.length; i++) {
		const line = lines[i];
		const actorMatch = line.match(
			/^(participant|actor)\s+(\S+?)(?:\s+as\s+(.+))?$/,
		);
		if (actorMatch) {
			const type = actorMatch[1];
			const id = actorMatch[2];
			const label = actorMatch[3]?.trim() ?? id;
			if (!actorIds.has(id)) {
				actorIds.add(id);
				diagram.actors.push({ id, label, type });
			}
			continue;
		}
		const noteMatch = line.match(
			/^Note\s+(left of|right of|over)\s+([^:]+):\s*(.+)$/i,
		);
		if (noteMatch) {
			const posStr = noteMatch[1].toLowerCase();
			const actorsStr = noteMatch[2].trim();
			const text = noteMatch[3].trim();
			const noteActorIds = actorsStr.split(",").map((s) => s.trim());
			for (const aid of noteActorIds) {
				ensureActor(diagram, actorIds, aid);
			}
			let position = "over";
			if (posStr === "left of") position = "left";
			else if (posStr === "right of") position = "right";
			diagram.notes.push({
				actorIds: noteActorIds,
				text,
				position,
				afterIndex: diagram.messages.length - 1,
			});
			continue;
		}
		const blockMatch = line.match(
			/^(loop|alt|opt|par|critical|break|rect)\s*(.*)$/,
		);
		if (blockMatch) {
			const blockType = blockMatch[1];
			const label = blockMatch[2]?.trim() ?? "";
			blockStack.push({
				type: blockType,
				label,
				startIndex: diagram.messages.length,
				dividers: [],
			});
			continue;
		}
		const dividerMatch = line.match(/^(else|and)\s*(.*)$/);
		if (dividerMatch && blockStack.length > 0) {
			const label = dividerMatch[2]?.trim() ?? "";
			blockStack[blockStack.length - 1].dividers.push({
				index: diagram.messages.length,
				label,
			});
			continue;
		}
		if (line === "end" && blockStack.length > 0) {
			const completed = blockStack.pop();
			diagram.blocks.push({
				type: completed.type,
				label: completed.label,
				startIndex: completed.startIndex,
				endIndex: Math.max(diagram.messages.length - 1, completed.startIndex),
				dividers: completed.dividers,
			});
			continue;
		}
		const msgMatch = line.match(
			/^(\S+?)\s*(--?>?>|--?[)x]|--?>>|--?>)\s*([+-]?)(\S+?)\s*:\s*(.+)$/,
		);
		if (msgMatch) {
			const from = msgMatch[1];
			const arrow = msgMatch[2];
			const activationMark = msgMatch[3];
			const to = msgMatch[4];
			const label = msgMatch[5].trim();
			ensureActor(diagram, actorIds, from);
			ensureActor(diagram, actorIds, to);
			const lineStyle = arrow.startsWith("--") ? "dashed" : "solid";
			const arrowHead =
				arrow.includes(">>") || arrow.includes("x") ? "filled" : "open";
			const msg = {
				from,
				to,
				label,
				lineStyle,
				arrowHead,
			};
			if (activationMark === "+") msg.activate = true;
			if (activationMark === "-") msg.deactivate = true;
			diagram.messages.push(msg);
			continue;
		}
		const simpleMsgMatch = line.match(
			/^(\S+?)\s*(->>|-->>|-\)|--\)|-x|--x|->|-->)\s*([+-]?)(\S+?)\s*:\s*(.+)$/,
		);
		if (simpleMsgMatch) {
			const from = simpleMsgMatch[1];
			const arrow = simpleMsgMatch[2];
			const activationMark = simpleMsgMatch[3];
			const to = simpleMsgMatch[4];
			const label = simpleMsgMatch[5].trim();
			ensureActor(diagram, actorIds, from);
			ensureActor(diagram, actorIds, to);
			const lineStyle = arrow.startsWith("--") ? "dashed" : "solid";
			const arrowHead =
				arrow.includes(">>") || arrow.includes("x") ? "filled" : "open";
			const msg = { from, to, label, lineStyle, arrowHead };
			if (activationMark === "+") msg.activate = true;
			if (activationMark === "-") msg.deactivate = true;
			diagram.messages.push(msg);
			continue;
		}
	}
	return diagram;
}
function ensureActor(diagram, actorIds, id) {
	if (!actorIds.has(id)) {
		actorIds.add(id);
		diagram.actors.push({ id, label: id, type: "participant" });
	}
}

// src/ascii/sequence.ts
function renderSequenceAscii(text, config) {
	const lines = text
		.split("\n")
		.map((l) => l.trim())
		.filter((l) => l.length > 0 && !l.startsWith("%%"));
	const diagram = parseSequenceDiagram(lines);
	if (diagram.actors.length === 0) return "";
	const useAscii = config.useAscii;
	const H = useAscii ? "-" : "\u2500";
	const V = useAscii ? "|" : "\u2502";
	const TL = useAscii ? "+" : "\u250C";
	const TR = useAscii ? "+" : "\u2510";
	const BL = useAscii ? "+" : "\u2514";
	const BR = useAscii ? "+" : "\u2518";
	const JT = useAscii ? "+" : "\u252C";
	const JB = useAscii ? "+" : "\u2534";
	const JL = useAscii ? "+" : "\u251C";
	const JR = useAscii ? "+" : "\u2524";
	const actorIdx = /* @__PURE__ */ new Map();
	diagram.actors.forEach((a, i) => actorIdx.set(a.id, i));
	const boxPad = 1;
	const actorBoxWidths = diagram.actors.map(
		(a) => a.label.length + 2 * boxPad + 2,
	);
	const halfBox = actorBoxWidths.map((w) => Math.ceil(w / 2));
	const actorBoxH = 3;
	const adjMaxWidth = new Array(Math.max(diagram.actors.length - 1, 0)).fill(0);
	for (const msg of diagram.messages) {
		const fi = actorIdx.get(msg.from);
		const ti = actorIdx.get(msg.to);
		if (fi === ti) continue;
		const lo = Math.min(fi, ti);
		const hi = Math.max(fi, ti);
		const needed = msg.label.length + 4;
		const numGaps = hi - lo;
		const perGap = Math.ceil(needed / numGaps);
		for (let g = lo; g < hi; g++) {
			adjMaxWidth[g] = Math.max(adjMaxWidth[g], perGap);
		}
	}
	const llX = [halfBox[0]];
	for (let i = 1; i < diagram.actors.length; i++) {
		const gap = Math.max(
			halfBox[i - 1] + halfBox[i] + 2,
			adjMaxWidth[i - 1] + 2,
			10,
		);
		llX[i] = llX[i - 1] + gap;
	}
	const msgArrowY = [];
	const msgLabelY = [];
	const blockStartY = /* @__PURE__ */ new Map();
	const blockEndY = /* @__PURE__ */ new Map();
	const divYMap = /* @__PURE__ */ new Map();
	const notePositions = [];
	let curY = actorBoxH;
	for (let m = 0; m < diagram.messages.length; m++) {
		for (let b = 0; b < diagram.blocks.length; b++) {
			if (diagram.blocks[b].startIndex === m) {
				curY += 2;
				blockStartY.set(b, curY - 1);
			}
		}
		for (let b = 0; b < diagram.blocks.length; b++) {
			for (let d = 0; d < diagram.blocks[b].dividers.length; d++) {
				if (diagram.blocks[b].dividers[d].index === m) {
					curY += 1;
					divYMap.set(`${b}:${d}`, curY);
					curY += 1;
				}
			}
		}
		curY += 1;
		const msg = diagram.messages[m];
		const isSelf = msg.from === msg.to;
		if (isSelf) {
			msgLabelY[m] = curY + 1;
			msgArrowY[m] = curY;
			curY += 3;
		} else {
			msgLabelY[m] = curY;
			msgArrowY[m] = curY + 1;
			curY += 2;
		}
		for (let n = 0; n < diagram.notes.length; n++) {
			if (diagram.notes[n].afterIndex === m) {
				curY += 1;
				const note = diagram.notes[n];
				const nLines = note.text.split("\\n");
				const nWidth = Math.max(...nLines.map((l) => l.length)) + 4;
				const nHeight = nLines.length + 2;
				const aIdx = actorIdx.get(note.actorIds[0]) ?? 0;
				let nx;
				if (note.position === "left") {
					nx = llX[aIdx] - nWidth - 1;
				} else if (note.position === "right") {
					nx = llX[aIdx] + 2;
				} else {
					if (note.actorIds.length >= 2) {
						const aIdx2 = actorIdx.get(note.actorIds[1]) ?? aIdx;
						nx =
							Math.floor((llX[aIdx] + llX[aIdx2]) / 2) - Math.floor(nWidth / 2);
					} else {
						nx = llX[aIdx] - Math.floor(nWidth / 2);
					}
				}
				nx = Math.max(0, nx);
				notePositions.push({
					x: nx,
					y: curY,
					width: nWidth,
					height: nHeight,
					lines: nLines,
				});
				curY += nHeight;
			}
		}
		for (let b = 0; b < diagram.blocks.length; b++) {
			if (diagram.blocks[b].endIndex === m) {
				curY += 1;
				blockEndY.set(b, curY);
				curY += 1;
			}
		}
	}
	curY += 1;
	const footerY = curY;
	const totalH = footerY + actorBoxH;
	const lastLL = llX[llX.length - 1] ?? 0;
	const lastHalf = halfBox[halfBox.length - 1] ?? 0;
	let totalW = lastLL + lastHalf + 2;
	for (let m = 0; m < diagram.messages.length; m++) {
		const msg = diagram.messages[m];
		if (msg.from === msg.to) {
			const fi = actorIdx.get(msg.from);
			const selfRight = llX[fi] + 6 + 2 + msg.label.length;
			totalW = Math.max(totalW, selfRight + 1);
		}
	}
	for (const np of notePositions) {
		totalW = Math.max(totalW, np.x + np.width + 1);
	}
	const canvas = mkCanvas(totalW, totalH - 1);
	function drawActorBox(cx, topY, label) {
		const w = label.length + 2 * boxPad + 2;
		const left = cx - Math.floor(w / 2);
		canvas[left][topY] = TL;
		for (let x = 1; x < w - 1; x++) canvas[left + x][topY] = H;
		canvas[left + w - 1][topY] = TR;
		canvas[left][topY + 1] = V;
		canvas[left + w - 1][topY + 1] = V;
		const ls = left + 1 + boxPad;
		for (let i = 0; i < label.length; i++) canvas[ls + i][topY + 1] = label[i];
		canvas[left][topY + 2] = BL;
		for (let x = 1; x < w - 1; x++) canvas[left + x][topY + 2] = H;
		canvas[left + w - 1][topY + 2] = BR;
	}
	for (let i = 0; i < diagram.actors.length; i++) {
		const x = llX[i];
		for (let y = actorBoxH; y <= footerY; y++) {
			canvas[x][y] = V;
		}
	}
	for (let i = 0; i < diagram.actors.length; i++) {
		const actor = diagram.actors[i];
		drawActorBox(llX[i], 0, actor.label);
		drawActorBox(llX[i], footerY, actor.label);
		if (!useAscii) {
			canvas[llX[i]][actorBoxH - 1] = JT;
			canvas[llX[i]][footerY] = JB;
		}
	}
	for (let m = 0; m < diagram.messages.length; m++) {
		const msg = diagram.messages[m];
		const fi = actorIdx.get(msg.from);
		const ti = actorIdx.get(msg.to);
		const fromX = llX[fi];
		const toX = llX[ti];
		const isSelf = fi === ti;
		const isDashed = msg.lineStyle === "dashed";
		const isFilled = msg.arrowHead === "filled";
		const lineChar = isDashed ? (useAscii ? "." : "\u254C") : H;
		if (isSelf) {
			const y0 = msgArrowY[m];
			const loopW = Math.max(4, 4);
			canvas[fromX][y0] = JL;
			for (let x = fromX + 1; x < fromX + loopW; x++) canvas[x][y0] = lineChar;
			canvas[fromX + loopW][y0] = useAscii ? "+" : "\u2510";
			canvas[fromX + loopW][y0 + 1] = V;
			const labelX = fromX + loopW + 2;
			for (let i = 0; i < msg.label.length; i++) {
				if (labelX + i < totalW) canvas[labelX + i][y0 + 1] = msg.label[i];
			}
			const arrowChar = isFilled
				? useAscii
					? "<"
					: "\u25C0"
				: useAscii
					? "<"
					: "\u25C1";
			canvas[fromX][y0 + 2] = arrowChar;
			for (let x = fromX + 1; x < fromX + loopW; x++)
				canvas[x][y0 + 2] = lineChar;
			canvas[fromX + loopW][y0 + 2] = useAscii ? "+" : "\u2518";
		} else {
			const labelY = msgLabelY[m];
			const arrowY = msgArrowY[m];
			const leftToRight = fromX < toX;
			const midX = Math.floor((fromX + toX) / 2);
			const labelStart = midX - Math.floor(msg.label.length / 2);
			for (let i = 0; i < msg.label.length; i++) {
				const lx = labelStart + i;
				if (lx >= 0 && lx < totalW) canvas[lx][labelY] = msg.label[i];
			}
			if (leftToRight) {
				for (let x = fromX + 1; x < toX; x++) canvas[x][arrowY] = lineChar;
				const ah = isFilled
					? useAscii
						? ">"
						: "\u25B6"
					: useAscii
						? ">"
						: "\u25B7";
				canvas[toX][arrowY] = ah;
			} else {
				for (let x = toX + 1; x < fromX; x++) canvas[x][arrowY] = lineChar;
				const ah = isFilled
					? useAscii
						? "<"
						: "\u25C0"
					: useAscii
						? "<"
						: "\u25C1";
				canvas[toX][arrowY] = ah;
			}
		}
	}
	for (let b = 0; b < diagram.blocks.length; b++) {
		const block = diagram.blocks[b];
		const topY = blockStartY.get(b);
		const botY = blockEndY.get(b);
		if (topY === void 0 || botY === void 0) continue;
		let minLX = totalW;
		let maxLX = 0;
		for (let m = block.startIndex; m <= block.endIndex; m++) {
			if (m >= diagram.messages.length) break;
			const msg = diagram.messages[m];
			const f = actorIdx.get(msg.from) ?? 0;
			const t = actorIdx.get(msg.to) ?? 0;
			minLX = Math.min(minLX, llX[Math.min(f, t)]);
			maxLX = Math.max(maxLX, llX[Math.max(f, t)]);
		}
		const bLeft = Math.max(0, minLX - 4);
		const bRight = Math.min(totalW - 1, maxLX + 4);
		canvas[bLeft][topY] = TL;
		for (let x = bLeft + 1; x < bRight; x++) canvas[x][topY] = H;
		canvas[bRight][topY] = TR;
		const hdrLabel = block.label
			? `${block.type} [${block.label}]`
			: block.type;
		for (let i = 0; i < hdrLabel.length && bLeft + 1 + i < bRight; i++) {
			canvas[bLeft + 1 + i][topY] = hdrLabel[i];
		}
		canvas[bLeft][botY] = BL;
		for (let x = bLeft + 1; x < bRight; x++) canvas[x][botY] = H;
		canvas[bRight][botY] = BR;
		for (let y = topY + 1; y < botY; y++) {
			canvas[bLeft][y] = V;
			canvas[bRight][y] = V;
		}
		for (let d = 0; d < block.dividers.length; d++) {
			const dY = divYMap.get(`${b}:${d}`);
			if (dY === void 0) continue;
			const dashChar = isDashedH();
			canvas[bLeft][dY] = JL;
			for (let x = bLeft + 1; x < bRight; x++) canvas[x][dY] = dashChar;
			canvas[bRight][dY] = JR;
			const dLabel = block.dividers[d].label;
			if (dLabel) {
				const dStr = `[${dLabel}]`;
				for (let i = 0; i < dStr.length && bLeft + 1 + i < bRight; i++) {
					canvas[bLeft + 1 + i][dY] = dStr[i];
				}
			}
		}
	}
	for (const np of notePositions) {
		increaseSize(canvas, np.x + np.width, np.y + np.height);
		canvas[np.x][np.y] = TL;
		for (let x = 1; x < np.width - 1; x++) canvas[np.x + x][np.y] = H;
		canvas[np.x + np.width - 1][np.y] = TR;
		for (let l = 0; l < np.lines.length; l++) {
			const ly = np.y + 1 + l;
			canvas[np.x][ly] = V;
			canvas[np.x + np.width - 1][ly] = V;
			for (let i = 0; i < np.lines[l].length; i++) {
				canvas[np.x + 2 + i][ly] = np.lines[l][i];
			}
		}
		const by = np.y + np.height - 1;
		canvas[np.x][by] = BL;
		for (let x = 1; x < np.width - 1; x++) canvas[np.x + x][by] = H;
		canvas[np.x + np.width - 1][by] = BR;
	}
	return canvasToString(canvas);
	function isDashedH() {
		return useAscii ? "-" : "\u254C";
	}
}

// src/class/parser.ts
function parseClassDiagram(lines) {
	const diagram = {
		classes: [],
		relationships: [],
		namespaces: [],
	};
	const classMap = /* @__PURE__ */ new Map();
	let currentNamespace = null;
	let currentClass = null;
	let braceDepth = 0;
	for (let i = 1; i < lines.length; i++) {
		const line = lines[i];
		if (currentClass && braceDepth > 0) {
			if (line === "}") {
				braceDepth--;
				if (braceDepth === 0) {
					currentClass = null;
				}
				continue;
			}
			const annotMatch = line.match(/^<<(\w+)>>$/);
			if (annotMatch) {
				currentClass.annotation = annotMatch[1];
				continue;
			}
			const member = parseMember(line);
			if (member) {
				if (member.isMethod) {
					currentClass.methods.push(member.member);
				} else {
					currentClass.attributes.push(member.member);
				}
			}
			continue;
		}
		const nsMatch = line.match(/^namespace\s+(\S+)\s*\{$/);
		if (nsMatch) {
			currentNamespace = { name: nsMatch[1], classIds: [] };
			continue;
		}
		if (line === "}" && currentNamespace) {
			diagram.namespaces.push(currentNamespace);
			currentNamespace = null;
			continue;
		}
		const classBlockMatch = line.match(/^class\s+(\S+?)(?:\s*~(\w+)~)?\s*\{$/);
		if (classBlockMatch) {
			const id = classBlockMatch[1];
			const generic = classBlockMatch[2];
			const cls = ensureClass(classMap, id);
			if (generic) {
				cls.label = `${id}<${generic}>`;
			}
			currentClass = cls;
			braceDepth = 1;
			if (currentNamespace) {
				currentNamespace.classIds.push(id);
			}
			continue;
		}
		const classOnlyMatch = line.match(/^class\s+(\S+?)(?:\s*~(\w+)~)?\s*$/);
		if (classOnlyMatch) {
			const id = classOnlyMatch[1];
			const generic = classOnlyMatch[2];
			const cls = ensureClass(classMap, id);
			if (generic) {
				cls.label = `${id}<${generic}>`;
			}
			if (currentNamespace) {
				currentNamespace.classIds.push(id);
			}
			continue;
		}
		const inlineAnnotMatch = line.match(
			/^class\s+(\S+?)\s*\{\s*<<(\w+)>>\s*\}$/,
		);
		if (inlineAnnotMatch) {
			const cls = ensureClass(classMap, inlineAnnotMatch[1]);
			cls.annotation = inlineAnnotMatch[2];
			continue;
		}
		const inlineAttrMatch = line.match(/^(\S+?)\s*:\s*(.+)$/);
		if (inlineAttrMatch) {
			const rest = inlineAttrMatch[2];
			if (!rest.match(/<\|--|--|\*--|o--|-->|\.\.>|\.\.\|>/)) {
				const cls = ensureClass(classMap, inlineAttrMatch[1]);
				const member = parseMember(rest);
				if (member) {
					if (member.isMethod) {
						cls.methods.push(member.member);
					} else {
						cls.attributes.push(member.member);
					}
				}
				continue;
			}
		}
		const rel = parseRelationship(line);
		if (rel) {
			ensureClass(classMap, rel.from);
			ensureClass(classMap, rel.to);
			diagram.relationships.push(rel);
			continue;
		}
	}
	diagram.classes = [...classMap.values()];
	return diagram;
}
function ensureClass(classMap, id) {
	let cls = classMap.get(id);
	if (!cls) {
		cls = { id, label: id, attributes: [], methods: [] };
		classMap.set(id, cls);
	}
	return cls;
}
function parseMember(line) {
	const trimmed = line.trim().replace(/;$/, "");
	if (!trimmed) return null;
	let visibility = "";
	let rest = trimmed;
	if (/^[+\-#~]/.test(rest)) {
		visibility = rest[0];
		rest = rest.slice(1).trim();
	}
	const methodMatch = rest.match(/^(.+?)\(([^)]*)\)(?:\s*(.+))?$/);
	if (methodMatch) {
		const name2 = methodMatch[1].trim();
		const type2 = methodMatch[3]?.trim();
		const isStatic2 = name2.endsWith("$") || rest.includes("$");
		const isAbstract2 = name2.endsWith("*") || rest.includes("*");
		return {
			member: {
				visibility,
				name: name2.replace(/[$*]$/, ""),
				type: type2 || void 0,
				isStatic: isStatic2,
				isAbstract: isAbstract2,
			},
			isMethod: true,
		};
	}
	const parts = rest.split(/\s+/);
	let name;
	let type;
	if (parts.length >= 2) {
		type = parts[0];
		name = parts.slice(1).join(" ");
	} else {
		name = parts[0] ?? rest;
	}
	const isStatic = name.endsWith("$");
	const isAbstract = name.endsWith("*");
	return {
		member: {
			visibility,
			name: name.replace(/[$*]$/, ""),
			type: type || void 0,
			isStatic,
			isAbstract,
		},
		isMethod: false,
	};
}
function parseRelationship(line) {
	const match = line.match(
		/^(\S+?)\s+(?:"([^"]*?)"\s+)?(<\|--|<\|\.\.|\*--|o--|-->|--\*|--o|--|>\s*|\.\.>|\.\.\|>|--)\s+(?:"([^"]*?)"\s+)?(\S+?)(?:\s*:\s*(.+))?$/,
	);
	if (!match) return null;
	const from = match[1];
	const fromCardinality = match[2] || void 0;
	const arrow = match[3].trim();
	const toCardinality = match[4] || void 0;
	const to = match[5];
	const label = match[6]?.trim() || void 0;
	const parsed = parseArrow(arrow);
	if (!parsed) return null;
	return {
		from,
		to,
		type: parsed.type,
		markerAt: parsed.markerAt,
		label,
		fromCardinality,
		toCardinality,
	};
}
function parseArrow(arrow) {
	switch (arrow) {
		case "<|--":
			return { type: "inheritance", markerAt: "from" };
		case "<|..":
			return { type: "realization", markerAt: "from" };
		case "*--":
			return { type: "composition", markerAt: "from" };
		case "--*":
			return { type: "composition", markerAt: "to" };
		case "o--":
			return { type: "aggregation", markerAt: "from" };
		case "--o":
			return { type: "aggregation", markerAt: "to" };
		case "-->":
			return { type: "association", markerAt: "to" };
		case "..>":
			return { type: "dependency", markerAt: "to" };
		case "..|>":
			return { type: "realization", markerAt: "to" };
		case "--":
			return { type: "association", markerAt: "to" };
		default:
			return null;
	}
}

// src/ascii/class-diagram.ts
function formatMember(m) {
	const vis = m.visibility || "";
	const type = m.type ? `: ${m.type}` : "";
	return `${vis}${m.name}${type}`;
}
function buildClassSections(cls) {
	const header = [];
	if (cls.annotation) header.push(`<<${cls.annotation}>>`);
	header.push(cls.label);
	const attrs = cls.attributes.map(formatMember);
	const methods = cls.methods.map(formatMember);
	if (attrs.length === 0 && methods.length === 0) return [header];
	if (methods.length === 0) return [header, attrs];
	return [header, attrs, methods];
}
function getRelMarker(type, markerAt) {
	const dashed = type === "dependency" || type === "realization";
	return { type, markerAt, dashed };
}
function getMarkerShape(type, useAscii, direction) {
	switch (type) {
		case "inheritance":
		case "realization":
			if (direction === "down") {
				return useAscii ? "^" : "\u25B3";
			} else if (direction === "up") {
				return useAscii ? "v" : "\u25BD";
			} else if (direction === "left") {
				return useAscii ? ">" : "\u25C1";
			} else {
				return useAscii ? "<" : "\u25B7";
			}
		case "composition":
			return useAscii ? "*" : "\u25C6";
		case "aggregation":
			return useAscii ? "o" : "\u25C7";
		case "association":
		case "dependency":
			if (direction === "down") {
				return useAscii ? "v" : "\u25BC";
			} else if (direction === "up") {
				return useAscii ? "^" : "\u25B2";
			} else if (direction === "left") {
				return useAscii ? "<" : "\u25C0";
			} else {
				return useAscii ? ">" : "\u25B6";
			}
	}
}
function renderClassAscii(text, config) {
	const lines = text
		.split("\n")
		.map((l) => l.trim())
		.filter((l) => l.length > 0 && !l.startsWith("%%"));
	const diagram = parseClassDiagram(lines);
	if (diagram.classes.length === 0) return "";
	const useAscii = config.useAscii;
	const hGap = 4;
	const vGap = 3;
	const classSections = /* @__PURE__ */ new Map();
	const classBoxW = /* @__PURE__ */ new Map();
	const classBoxH = /* @__PURE__ */ new Map();
	for (const cls of diagram.classes) {
		const sections = buildClassSections(cls);
		classSections.set(cls.id, sections);
		let maxTextW = 0;
		for (const section of sections) {
			for (const line of section) maxTextW = Math.max(maxTextW, line.length);
		}
		const boxW = maxTextW + 4;
		let totalLines = 0;
		for (const section of sections) totalLines += Math.max(section.length, 1);
		const boxH = totalLines + (sections.length - 1) + 2;
		classBoxW.set(cls.id, boxW);
		classBoxH.set(cls.id, boxH);
	}
	const classById = /* @__PURE__ */ new Map();
	for (const cls of diagram.classes) classById.set(cls.id, cls);
	const parents = /* @__PURE__ */ new Map();
	const children = /* @__PURE__ */ new Map();
	for (const rel of diagram.relationships) {
		const isHierarchical =
			rel.type === "inheritance" || rel.type === "realization";
		const parentId =
			isHierarchical && rel.markerAt === "to" ? rel.to : rel.from;
		const childId = isHierarchical && rel.markerAt === "to" ? rel.from : rel.to;
		if (!parents.has(childId)) parents.set(childId, /* @__PURE__ */ new Set());
		parents.get(childId).add(parentId);
		if (!children.has(parentId))
			children.set(parentId, /* @__PURE__ */ new Set());
		children.get(parentId).add(childId);
	}
	const level = /* @__PURE__ */ new Map();
	const roots = diagram.classes.filter(
		(c) => !parents.has(c.id) || parents.get(c.id).size === 0,
	);
	const queue = roots.map((c) => c.id);
	for (const id of queue) level.set(id, 0);
	const levelCap = diagram.classes.length - 1;
	let qi = 0;
	while (qi < queue.length) {
		const id = queue[qi++];
		const childSet = children.get(id);
		if (!childSet) continue;
		for (const childId of childSet) {
			const newLevel = (level.get(id) ?? 0) + 1;
			if (newLevel > levelCap) continue;
			if (!level.has(childId) || level.get(childId) < newLevel) {
				level.set(childId, newLevel);
				queue.push(childId);
			}
		}
	}
	for (const cls of diagram.classes) {
		if (!level.has(cls.id)) level.set(cls.id, 0);
	}
	const maxLevel = Math.max(...[...level.values()], 0);
	const levelGroups = Array.from({ length: maxLevel + 1 }, () => []);
	for (const cls of diagram.classes) {
		levelGroups[level.get(cls.id)].push(cls.id);
	}
	const placed = /* @__PURE__ */ new Map();
	let currentY = 0;
	for (let lv = 0; lv <= maxLevel; lv++) {
		const group = levelGroups[lv];
		if (group.length === 0) continue;
		let currentX = 0;
		let maxH = 0;
		for (const id of group) {
			const cls = classById.get(id);
			const w = classBoxW.get(id);
			const h = classBoxH.get(id);
			placed.set(id, {
				cls,
				sections: classSections.get(id),
				x: currentX,
				y: currentY,
				width: w,
				height: h,
			});
			currentX += w + hGap;
			maxH = Math.max(maxH, h);
		}
		currentY += maxH + vGap;
	}
	let totalW = 0;
	let totalH = 0;
	for (const p of placed.values()) {
		totalW = Math.max(totalW, p.x + p.width);
		totalH = Math.max(totalH, p.y + p.height);
	}
	totalW += 4;
	totalH += 2;
	const canvas = mkCanvas(totalW - 1, totalH - 1);
	for (const p of placed.values()) {
		const boxCanvas = drawMultiBox(p.sections, useAscii);
		for (let bx = 0; bx < boxCanvas.length; bx++) {
			for (let by = 0; by < boxCanvas[0].length; by++) {
				const ch = boxCanvas[bx][by];
				if (ch !== " ") {
					const cx = p.x + bx;
					const cy = p.y + by;
					if (cx < totalW && cy < totalH) {
						canvas[cx][cy] = ch;
					}
				}
			}
		}
	}
	const H = useAscii ? "-" : "\u2500";
	const V = useAscii ? "|" : "\u2502";
	const dashH = useAscii ? "." : "\u254C";
	const dashV = useAscii ? ":" : "\u250A";
	for (const rel of diagram.relationships) {
		const fromP = placed.get(rel.from);
		const toP = placed.get(rel.to);
		if (!fromP || !toP) continue;
		const marker = getRelMarker(rel.type, rel.markerAt);
		const lineH = marker.dashed ? dashH : H;
		const lineV = marker.dashed ? dashV : V;
		const fromCX = fromP.x + Math.floor(fromP.width / 2);
		const fromBY = fromP.y + fromP.height - 1;
		const toCX = toP.x + Math.floor(toP.width / 2);
		const toTY = toP.y;
		if (fromBY < toTY) {
			const midY = fromBY + Math.floor((toTY - fromBY) / 2);
			for (let y = fromBY + 1; y <= midY; y++) {
				if (y < totalH) canvas[fromCX][y] = lineV;
			}
			if (fromCX !== toCX) {
				const lx = Math.min(fromCX, toCX);
				const rx = Math.max(fromCX, toCX);
				for (let x = lx; x <= rx; x++) {
					if (x < totalW && midY < totalH) canvas[x][midY] = lineH;
				}
				if (!useAscii && midY < totalH) {
					if (fromCX < toCX) {
						canvas[fromCX][midY] = "\u2514";
						canvas[toCX][midY] = "\u2510";
					} else {
						canvas[fromCX][midY] = "\u2518";
						canvas[toCX][midY] = "\u250C";
					}
				}
			}
			for (let y = midY + 1; y < toTY; y++) {
				if (y < totalH) canvas[toCX][y] = lineV;
			}
			if (marker.markerAt === "to") {
				const markerChar = getMarkerShape(marker.type, useAscii, "down");
				const my = toTY - 1;
				if (my >= 0 && my < totalH) {
					for (let i = 0; i < markerChar.length; i++) {
						const mx = toCX - Math.floor(markerChar.length / 2) + i;
						if (mx >= 0 && mx < totalW) canvas[mx][my] = markerChar[i];
					}
				}
			}
			if (marker.markerAt === "from") {
				const markerChar = getMarkerShape(marker.type, useAscii, "down");
				const my = fromBY + 1;
				if (my < totalH) {
					for (let i = 0; i < markerChar.length; i++) {
						const mx = fromCX - Math.floor(markerChar.length / 2) + i;
						if (mx >= 0 && mx < totalW) canvas[mx][my] = markerChar[i];
					}
				}
			}
		} else if (toP.y + toP.height - 1 < fromP.y) {
			const fromTY = fromP.y;
			const toBY = toP.y + toP.height - 1;
			const midY = toBY + Math.floor((fromTY - toBY) / 2);
			for (let y = fromTY - 1; y >= midY; y--) {
				if (y >= 0 && y < totalH) canvas[fromCX][y] = lineV;
			}
			if (fromCX !== toCX) {
				const lx = Math.min(fromCX, toCX);
				const rx = Math.max(fromCX, toCX);
				for (let x = lx; x <= rx; x++) {
					if (x < totalW && midY >= 0 && midY < totalH) canvas[x][midY] = lineH;
				}
				if (!useAscii && midY >= 0 && midY < totalH) {
					if (fromCX < toCX) {
						canvas[fromCX][midY] = "\u250C";
						canvas[toCX][midY] = "\u2518";
					} else {
						canvas[fromCX][midY] = "\u2510";
						canvas[toCX][midY] = "\u2514";
					}
				}
			}
			for (let y = midY - 1; y > toBY; y--) {
				if (y >= 0 && y < totalH) canvas[toCX][y] = lineV;
			}
			if (marker.markerAt === "from") {
				const markerChar = getMarkerShape(marker.type, useAscii, "up");
				const my = fromTY - 1;
				if (my >= 0 && my < totalH) {
					for (let i = 0; i < markerChar.length; i++) {
						const mx = fromCX - Math.floor(markerChar.length / 2) + i;
						if (mx >= 0 && mx < totalW) canvas[mx][my] = markerChar[i];
					}
				}
			}
			if (marker.markerAt === "to") {
				const isHierarchical =
					marker.type === "inheritance" || marker.type === "realization";
				const markerDir = isHierarchical ? "down" : "up";
				const markerChar = getMarkerShape(marker.type, useAscii, markerDir);
				const my = toBY + 1;
				if (my < totalH) {
					for (let i = 0; i < markerChar.length; i++) {
						const mx = toCX - Math.floor(markerChar.length / 2) + i;
						if (mx >= 0 && mx < totalW) canvas[mx][my] = markerChar[i];
					}
				}
			}
		} else {
			const detourY = Math.max(fromBY, toP.y + toP.height - 1) + 2;
			increaseSize(canvas, totalW, detourY + 1);
			for (let y = fromBY + 1; y <= detourY; y++) {
				canvas[fromCX][y] = lineV;
			}
			const lx = Math.min(fromCX, toCX);
			const rx = Math.max(fromCX, toCX);
			for (let x = lx; x <= rx; x++) {
				canvas[x][detourY] = lineH;
			}
			for (let y = detourY - 1; y >= toP.y + toP.height; y--) {
				canvas[toCX][y] = lineV;
			}
			if (marker.markerAt === "from") {
				const markerChar = getMarkerShape(marker.type, useAscii, "down");
				const my = fromBY + 1;
				if (my < totalH) {
					for (let i = 0; i < markerChar.length; i++) {
						const mx = fromCX - Math.floor(markerChar.length / 2) + i;
						if (mx >= 0 && mx < totalW) canvas[mx][my] = markerChar[i];
					}
				}
			}
			if (marker.markerAt === "to") {
				const markerChar = getMarkerShape(marker.type, useAscii, "up");
				const my = toP.y + toP.height;
				if (my < totalH) {
					for (let i = 0; i < markerChar.length; i++) {
						const mx = toCX - Math.floor(markerChar.length / 2) + i;
						if (mx >= 0 && mx < totalW) canvas[mx][my] = markerChar[i];
					}
				}
			}
		}
		if (rel.label) {
			const paddedLabel = ` ${rel.label} `;
			const midX = Math.floor((fromCX + toCX) / 2);
			let midY;
			if (fromBY < toTY) {
				midY = Math.floor((fromBY + 1 + toTY - 1) / 2);
			} else if (toP.y + toP.height - 1 < fromP.y) {
				const toBY = toP.y + toP.height - 1;
				midY = Math.floor((toBY + 1 + fromP.y - 1) / 2);
			} else {
				midY = Math.max(fromBY, toP.y + toP.height - 1) + 2;
			}
			const labelStart = midX - Math.floor(paddedLabel.length / 2);
			for (let i = 0; i < paddedLabel.length; i++) {
				const lx = labelStart + i;
				if (lx >= 0 && lx < totalW && midY >= 0 && midY < totalH) {
					canvas[lx][midY] = paddedLabel[i];
				}
			}
		}
	}
	return canvasToString(canvas);
}

// src/er/parser.ts
function parseErDiagram(lines) {
	const diagram = {
		entities: [],
		relationships: [],
	};
	const entityMap = /* @__PURE__ */ new Map();
	let currentEntity = null;
	for (let i = 1; i < lines.length; i++) {
		const line = lines[i];
		if (currentEntity) {
			if (line === "}") {
				currentEntity = null;
				continue;
			}
			const attr = parseAttribute(line);
			if (attr) {
				currentEntity.attributes.push(attr);
			}
			continue;
		}
		const entityBlockMatch = line.match(/^(\S+)\s*\{$/);
		if (entityBlockMatch) {
			const id = entityBlockMatch[1];
			const entity = ensureEntity(entityMap, id);
			currentEntity = entity;
			continue;
		}
		const rel = parseRelationshipLine(line);
		if (rel) {
			ensureEntity(entityMap, rel.entity1);
			ensureEntity(entityMap, rel.entity2);
			diagram.relationships.push(rel);
			continue;
		}
	}
	diagram.entities = [...entityMap.values()];
	return diagram;
}
function ensureEntity(entityMap, id) {
	let entity = entityMap.get(id);
	if (!entity) {
		entity = { id, label: id, attributes: [] };
		entityMap.set(id, entity);
	}
	return entity;
}
function parseAttribute(line) {
	const match = line.match(/^(\S+)\s+(\S+)(?:\s+(.+))?$/);
	if (!match) return null;
	const type = match[1];
	const name = match[2];
	const rest = match[3]?.trim() ?? "";
	const keys = [];
	let comment;
	const commentMatch = rest.match(/"([^"]*)"/);
	if (commentMatch) {
		comment = commentMatch[1];
	}
	const restWithoutComment = rest.replace(/"[^"]*"/, "").trim();
	for (const part of restWithoutComment.split(/\s+/)) {
		const upper = part.toUpperCase();
		if (upper === "PK" || upper === "FK" || upper === "UK") {
			keys.push(upper);
		}
	}
	return { type, name, keys, comment };
}
function parseRelationshipLine(line) {
	const match = line.match(
		/^(\S+)\s+([|o}{]+(?:--|\.\.)[|o}{]+)\s+(\S+)\s*:\s*(.+)$/,
	);
	if (!match) return null;
	const entity1 = match[1];
	const cardinalityStr = match[2];
	const entity2 = match[3];
	const label = match[4].trim();
	const lineMatch = cardinalityStr.match(/^([|o}{]+)(--|\.\.?)([|o}{]+)$/);
	if (!lineMatch) return null;
	const leftStr = lineMatch[1];
	const lineStyle = lineMatch[2];
	const rightStr = lineMatch[3];
	const cardinality1 = parseCardinality(leftStr);
	const cardinality2 = parseCardinality(rightStr);
	const identifying = lineStyle === "--";
	if (!cardinality1 || !cardinality2) return null;
	return { entity1, entity2, cardinality1, cardinality2, label, identifying };
}
function parseCardinality(str) {
	const sorted = str.split("").sort().join("");
	if (sorted === "||") return "one";
	if (sorted === "o|") return "zero-one";
	if (sorted === "|}" || sorted === "{|") return "many";
	if (sorted === "{o" || sorted === "o{") return "zero-many";
	return null;
}

// src/ascii/er-diagram.ts
function formatAttribute(attr) {
	const keyStr = attr.keys.length > 0 ? attr.keys.join(",") + " " : "   ";
	return `${keyStr}${attr.type} ${attr.name}`;
}
function buildEntitySections(entity) {
	const header = [entity.label];
	const attrs = entity.attributes.map(formatAttribute);
	if (attrs.length === 0) return [header];
	return [header, attrs];
}
function getCrowsFootChars(card, useAscii) {
	if (useAscii) {
		switch (card) {
			case "one":
				return "||";
			case "zero-one":
				return "o|";
			case "many":
				return "}|";
			case "zero-many":
				return "o{";
		}
	} else {
		switch (card) {
			case "one":
				return "\u2551";
			case "zero-one":
				return "o\u2551";
			case "many":
				return "\u255F";
			case "zero-many":
				return "o\u255F";
		}
	}
}
function renderErAscii(text, config) {
	const lines = text
		.split("\n")
		.map((l) => l.trim())
		.filter((l) => l.length > 0 && !l.startsWith("%%"));
	const diagram = parseErDiagram(lines);
	if (diagram.entities.length === 0) return "";
	const useAscii = config.useAscii;
	const hGap = 6;
	const vGap = 4;
	const entitySections = /* @__PURE__ */ new Map();
	const entityBoxW = /* @__PURE__ */ new Map();
	const entityBoxH = /* @__PURE__ */ new Map();
	for (const ent of diagram.entities) {
		const sections = buildEntitySections(ent);
		entitySections.set(ent.id, sections);
		let maxTextW = 0;
		for (const section of sections) {
			for (const line of section) maxTextW = Math.max(maxTextW, line.length);
		}
		const boxW = maxTextW + 4;
		let totalLines = 0;
		for (const section of sections) totalLines += Math.max(section.length, 1);
		const boxH = totalLines + (sections.length - 1) + 2;
		entityBoxW.set(ent.id, boxW);
		entityBoxH.set(ent.id, boxH);
	}
	const maxPerRow = Math.max(2, Math.ceil(Math.sqrt(diagram.entities.length)));
	const placed = /* @__PURE__ */ new Map();
	let currentX = 0;
	let currentY = 0;
	let maxRowH = 0;
	let colCount = 0;
	for (const ent of diagram.entities) {
		const w = entityBoxW.get(ent.id);
		const h = entityBoxH.get(ent.id);
		if (colCount >= maxPerRow) {
			currentY += maxRowH + vGap;
			currentX = 0;
			maxRowH = 0;
			colCount = 0;
		}
		placed.set(ent.id, {
			entity: ent,
			sections: entitySections.get(ent.id),
			x: currentX,
			y: currentY,
			width: w,
			height: h,
		});
		currentX += w + hGap;
		maxRowH = Math.max(maxRowH, h);
		colCount++;
	}
	let totalW = 0;
	let totalH = 0;
	for (const p of placed.values()) {
		totalW = Math.max(totalW, p.x + p.width);
		totalH = Math.max(totalH, p.y + p.height);
	}
	totalW += 4;
	totalH += 2;
	const canvas = mkCanvas(totalW - 1, totalH - 1);
	for (const p of placed.values()) {
		const boxCanvas = drawMultiBox(p.sections, useAscii);
		for (let bx = 0; bx < boxCanvas.length; bx++) {
			for (let by = 0; by < boxCanvas[0].length; by++) {
				const ch = boxCanvas[bx][by];
				if (ch !== " ") {
					const cx = p.x + bx;
					const cy = p.y + by;
					if (cx < totalW && cy < totalH) {
						canvas[cx][cy] = ch;
					}
				}
			}
		}
	}
	const H = useAscii ? "-" : "\u2500";
	const V = useAscii ? "|" : "\u2502";
	const dashH = useAscii ? "." : "\u254C";
	const dashV = useAscii ? ":" : "\u250A";
	for (const rel of diagram.relationships) {
		const e1 = placed.get(rel.entity1);
		const e2 = placed.get(rel.entity2);
		if (!e1 || !e2) continue;
		const lineH = rel.identifying ? H : dashH;
		const lineV = rel.identifying ? V : dashV;
		const e1CX = e1.x + Math.floor(e1.width / 2);
		const e1CY = e1.y + Math.floor(e1.height / 2);
		const e2CX = e2.x + Math.floor(e2.width / 2);
		const e2CY = e2.y + Math.floor(e2.height / 2);
		const sameRow = Math.abs(e1CY - e2CY) < Math.max(e1.height, e2.height);
		if (sameRow) {
			const [left, right] = e1CX < e2CX ? [e1, e2] : [e2, e1];
			const [leftCard, rightCard] =
				e1CX < e2CX
					? [rel.cardinality1, rel.cardinality2]
					: [rel.cardinality2, rel.cardinality1];
			const startX = left.x + left.width;
			const endX = right.x - 1;
			const lineY = left.y + Math.floor(left.height / 2);
			for (let x = startX; x <= endX; x++) {
				if (x < totalW) canvas[x][lineY] = lineH;
			}
			const leftChars = getCrowsFootChars(leftCard, useAscii);
			for (let i = 0; i < leftChars.length; i++) {
				const mx = startX + i;
				if (mx < totalW) canvas[mx][lineY] = leftChars[i];
			}
			const rightChars = getCrowsFootChars(rightCard, useAscii);
			for (let i = 0; i < rightChars.length; i++) {
				const mx = endX - rightChars.length + 1 + i;
				if (mx >= 0 && mx < totalW) canvas[mx][lineY] = rightChars[i];
			}
			if (rel.label) {
				const gapMid = Math.floor((startX + endX) / 2);
				const labelStart = Math.max(
					startX,
					gapMid - Math.floor(rel.label.length / 2),
				);
				const labelY = lineY - 1;
				if (labelY >= 0) {
					for (let i = 0; i < rel.label.length; i++) {
						const lx = labelStart + i;
						if (lx >= startX && lx <= endX && lx < totalW) {
							canvas[lx][labelY] = rel.label[i];
						}
					}
				}
			}
		} else {
			const [upper, lower] = e1CY < e2CY ? [e1, e2] : [e2, e1];
			const [upperCard, lowerCard] =
				e1CY < e2CY
					? [rel.cardinality1, rel.cardinality2]
					: [rel.cardinality2, rel.cardinality1];
			const startY = upper.y + upper.height;
			const endY = lower.y - 1;
			const lineX = upper.x + Math.floor(upper.width / 2);
			for (let y = startY; y <= endY; y++) {
				if (y < totalH) canvas[lineX][y] = lineV;
			}
			const lowerCX = lower.x + Math.floor(lower.width / 2);
			if (lineX !== lowerCX) {
				const midY = Math.floor((startY + endY) / 2);
				const lx = Math.min(lineX, lowerCX);
				const rx = Math.max(lineX, lowerCX);
				for (let x = lx; x <= rx; x++) {
					if (x < totalW && midY < totalH) canvas[x][midY] = lineH;
				}
				for (let y = midY + 1; y <= endY; y++) {
					if (y < totalH) canvas[lowerCX][y] = lineV;
				}
			}
			const upperChars = getCrowsFootChars(upperCard, useAscii);
			if (startY < totalH) {
				for (let i = 0; i < upperChars.length; i++) {
					const mx = lineX - Math.floor(upperChars.length / 2) + i;
					if (mx >= 0 && mx < totalW) canvas[mx][startY] = upperChars[i];
				}
			}
			const targetX = lineX !== lowerCX ? lowerCX : lineX;
			const lowerChars = getCrowsFootChars(lowerCard, useAscii);
			if (endY >= 0 && endY < totalH) {
				for (let i = 0; i < lowerChars.length; i++) {
					const mx = targetX - Math.floor(lowerChars.length / 2) + i;
					if (mx >= 0 && mx < totalW) canvas[mx][endY] = lowerChars[i];
				}
			}
			if (rel.label) {
				const midY = Math.floor((startY + endY) / 2);
				const labelX = lineX + 2;
				if (midY >= 0) {
					for (let i = 0; i < rel.label.length; i++) {
						const lx = labelX + i;
						if (lx >= 0) {
							increaseSize(canvas, lx + 1, midY + 1);
							canvas[lx][midY] = rel.label[i];
						}
					}
				}
			}
		}
	}
	return canvasToString(canvas);
}

// src/ascii/index.ts
function detectDiagramType(text) {
	const firstLine = text.trim().split("\n")[0]?.trim().toLowerCase() ?? "";
	if (/^sequencediagram\s*$/.test(firstLine)) return "sequence";
	if (/^classdiagram\s*$/.test(firstLine)) return "class";
	if (/^erdiagram\s*$/.test(firstLine)) return "er";
	return "flowchart";
}
function renderMermaidAscii(text, options = {}) {
	const config = {
		useAscii: options.useAscii ?? false,
		paddingX: options.paddingX ?? 5,
		paddingY: options.paddingY ?? 5,
		boxBorderPadding: options.boxBorderPadding ?? 1,
		graphDirection: "TD",
		// default, overridden for flowcharts below
	};
	const diagramType = detectDiagramType(text);
	switch (diagramType) {
		case "sequence":
			return renderSequenceAscii(text, config);
		case "class":
			return renderClassAscii(text, config);
		case "er":
			return renderErAscii(text, config);
		case "flowchart":
		default: {
			const parsed = parseMermaid(text);
			if (parsed.direction === "LR" || parsed.direction === "RL") {
				config.graphDirection = "LR";
			} else {
				config.graphDirection = "TD";
			}
			const graph = convertToAsciiGraph(parsed, config);
			createMapping(graph);
			drawGraph(graph);
			if (parsed.direction === "BT") {
				flipCanvasVertically(graph.canvas);
			}
			return canvasToString(graph.canvas);
		}
	}
}

// src/styles.ts
function estimateTextWidth(text, fontSize, fontWeight) {
	const widthRatio = fontWeight >= 600 ? 0.58 : fontWeight >= 500 ? 0.55 : 0.52;
	return text.length * fontSize * widthRatio;
}
function estimateMonoTextWidth(text, fontSize) {
	return text.length * fontSize * 0.6;
}
var FONT_SIZES = {
	/** Node label text */
	nodeLabel: 13,
	/** Edge label text */
	edgeLabel: 11,
	/** Subgraph header text */
	groupHeader: 12,
};
var FONT_WEIGHTS = {
	nodeLabel: 500,
	edgeLabel: 400,
	groupHeader: 600,
};
var GROUP_HEADER_CONTENT_PAD = 8;
var NODE_PADDING = {
	/** Horizontal padding inside rectangles/rounded/stadium */
	horizontal: 16,
	/** Vertical padding inside rectangles/rounded/stadium */
	vertical: 10,
	/** Extra padding for diamond shapes (they need more space due to rotation) */
	diamondExtra: 24,
};
var STROKE_WIDTHS = {
	outerBox: 1,
	innerBox: 0.75,
	connector: 0.75,
};
var TEXT_BASELINE_SHIFT = "0.35em";
var ARROW_HEAD = {
	width: 8,
	height: 4.8,
};

// src/dagre-adapter.ts
function centerToTopLeft(cx, cy, width, height) {
	return { x: cx - width / 2, y: cy - height / 2 };
}
function clipToDiamondBoundary(point, cx, cy, hw, hh) {
	const dx = point.x - cx;
	const dy = point.y - cy;
	if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return point;
	const scale = 1 / (Math.abs(dx) / hw + Math.abs(dy) / hh);
	return { x: cx + scale * dx, y: cy + scale * dy };
}
function clipToCircleBoundary(point, cx, cy, r) {
	const dx = point.x - cx;
	const dy = point.y - cy;
	const dist2 = Math.sqrt(dx * dx + dy * dy);
	if (dist2 < 0.5) return point;
	const scale = r / dist2;
	return { x: cx + scale * dx, y: cy + scale * dy };
}
function snapToOrthogonal(points, verticalFirst = true) {
	if (points.length < 2) return points;
	const result = [points[0]];
	for (let i = 1; i < points.length; i++) {
		const prev = result[result.length - 1];
		const curr = points[i];
		const dx = Math.abs(curr.x - prev.x);
		const dy = Math.abs(curr.y - prev.y);
		if (dx < 1 || dy < 1) {
			result.push(curr);
			continue;
		}
		if (verticalFirst) {
			result.push({ x: prev.x, y: curr.y });
		} else {
			result.push({ x: curr.x, y: prev.y });
		}
		result.push(curr);
	}
	return removeCollinear(result);
}
function removeCollinear(pts) {
	if (pts.length < 3) return pts;
	const out = [pts[0]];
	for (let i = 1; i < pts.length - 1; i++) {
		const a = out[out.length - 1];
		const b = pts[i];
		const c = pts[i + 1];
		const sameX = Math.abs(a.x - b.x) < 1 && Math.abs(b.x - c.x) < 1;
		const sameY = Math.abs(a.y - b.y) < 1 && Math.abs(b.y - c.y) < 1;
		if (sameX || sameY) continue;
		out.push(b);
	}
	out.push(pts[pts.length - 1]);
	return out;
}
function clipEndpointsToNodes(points, sourceNode, targetNode) {
	if (points.length < 2) return points;
	const result = points.map((p) => ({ ...p }));
	if (targetNode) {
		const last = result.length - 1;
		if (points.length === 2) {
			const first = result[0];
			const curr = result[last];
			const dx = Math.abs(curr.x - first.x);
			const dy = Math.abs(curr.y - first.y);
			if (dy >= dx) {
				const approachFromTop = curr.y > first.y;
				const sideY = approachFromTop
					? targetNode.cy - targetNode.hh
					: targetNode.cy + targetNode.hh;
				result[last] = { x: curr.x, y: sideY };
			} else {
				const approachFromLeft = curr.x > first.x;
				const sideX = approachFromLeft
					? targetNode.cx - targetNode.hw
					: targetNode.cx + targetNode.hw;
				result[last] = { x: sideX, y: curr.y };
			}
		} else {
			const prev = result[last - 1];
			const curr = result[last];
			const dx = Math.abs(curr.x - prev.x);
			const dy = Math.abs(curr.y - prev.y);
			const isStrictlyHorizontal = dy < 1 && dx >= 1;
			const isStrictlyVertical = dx < 1 && dy >= 1;
			const isPrimarilyHorizontal =
				!isStrictlyHorizontal && !isStrictlyVertical && dy < dx;
			const isPrimarilyVertical =
				!isStrictlyHorizontal && !isStrictlyVertical && dx < dy;
			if (isStrictlyHorizontal) {
				const approachFromLeft = curr.x > prev.x;
				const sideX = approachFromLeft
					? targetNode.cx - targetNode.hw
					: targetNode.cx + targetNode.hw;
				result[last] = { x: sideX, y: targetNode.cy };
				result[last - 1] = { ...prev, y: targetNode.cy };
			} else if (isStrictlyVertical) {
				const approachFromTop = curr.y > prev.y;
				const sideY = approachFromTop
					? targetNode.cy - targetNode.hh
					: targetNode.cy + targetNode.hh;
				result[last] = { x: targetNode.cx, y: sideY };
				result[last - 1] = { ...prev, x: targetNode.cx };
			} else if (isPrimarilyHorizontal) {
				const approachFromLeft = curr.x > prev.x;
				const sideX = approachFromLeft
					? targetNode.cx - targetNode.hw
					: targetNode.cx + targetNode.hw;
				const withinVerticalBounds =
					prev.y >= targetNode.cy - targetNode.hh &&
					prev.y <= targetNode.cy + targetNode.hh;
				if (withinVerticalBounds) {
					result[last] = { x: sideX, y: prev.y };
				} else {
					result[last] = { x: sideX, y: targetNode.cy };
					result[last - 1] = { ...prev, y: targetNode.cy };
				}
			} else if (isPrimarilyVertical) {
				const approachFromTop = curr.y > prev.y;
				const sideY = approachFromTop
					? targetNode.cy - targetNode.hh
					: targetNode.cy + targetNode.hh;
				const withinHorizontalBounds =
					prev.x >= targetNode.cx - targetNode.hw &&
					prev.x <= targetNode.cx + targetNode.hw;
				if (withinHorizontalBounds) {
					result[last] = { x: prev.x, y: sideY };
				} else {
					result[last] = { x: targetNode.cx, y: sideY };
					result[last - 1] = { ...prev, x: targetNode.cx };
				}
			}
		}
	}
	if (sourceNode && points.length >= 3) {
		const first = result[0];
		const next = result[1];
		const dx = Math.abs(next.x - first.x);
		const dy = Math.abs(next.y - first.y);
		const isStrictlyHorizontal = dy < 1 && dx >= 1;
		const isStrictlyVertical = dx < 1 && dy >= 1;
		const isPrimarilyHorizontal =
			!isStrictlyHorizontal && !isStrictlyVertical && dy < dx;
		const isPrimarilyVertical =
			!isStrictlyHorizontal && !isStrictlyVertical && dx < dy;
		if (isStrictlyHorizontal) {
			const exitToRight = next.x > first.x;
			const sideX = exitToRight
				? sourceNode.cx + sourceNode.hw
				: sourceNode.cx - sourceNode.hw;
			result[0] = { x: sideX, y: sourceNode.cy };
			result[1] = { ...result[1], y: sourceNode.cy };
		} else if (isStrictlyVertical) {
			const exitDownward = next.y > first.y;
			const sideY = exitDownward
				? sourceNode.cy + sourceNode.hh
				: sourceNode.cy - sourceNode.hh;
			result[0] = { x: sourceNode.cx, y: sideY };
			result[1] = { ...result[1], x: sourceNode.cx };
		} else if (isPrimarilyHorizontal) {
			const exitToRight = next.x > first.x;
			const sideX = exitToRight
				? sourceNode.cx + sourceNode.hw
				: sourceNode.cx - sourceNode.hw;
			const withinVerticalBounds =
				next.y >= sourceNode.cy - sourceNode.hh &&
				next.y <= sourceNode.cy + sourceNode.hh;
			if (withinVerticalBounds) {
				result[0] = { x: sideX, y: next.y };
			} else {
				result[0] = { x: sideX, y: sourceNode.cy };
				result[1] = { ...result[1], y: sourceNode.cy };
			}
		} else if (isPrimarilyVertical) {
			const exitDownward = next.y > first.y;
			const sideY = exitDownward
				? sourceNode.cy + sourceNode.hh
				: sourceNode.cy - sourceNode.hh;
			const withinHorizontalBounds =
				next.x >= sourceNode.cx - sourceNode.hw &&
				next.x <= sourceNode.cx + sourceNode.hw;
			if (withinHorizontalBounds) {
				result[0] = { x: next.x, y: sideY };
			} else {
				result[0] = { x: sourceNode.cx, y: sideY };
				result[1] = { ...result[1], x: sourceNode.cx };
			}
		}
	}
	return result;
}

// src/layout.ts
var CIRCULAR_SHAPES = /* @__PURE__ */ new Set([
	"circle",
	"doublecircle",
	"state-start",
	"state-end",
]);
var NON_RECT_SHAPES = /* @__PURE__ */ new Set([
	"diamond",
	"circle",
	"doublecircle",
	"state-start",
	"state-end",
]);
var DEFAULTS2 = {
	font: "Inter",
	padding: 40,
	nodeSpacing: 24,
	layerSpacing: 40,
};
function preComputeSubgraphLayout(sg, graph, opts) {
	const subG = new dagre.graphlib.Graph({ directed: true, compound: true });
	subG.setGraph({
		rankdir: directionToDagre(sg.direction),
		acyclicer: "greedy",
		nodesep: opts.nodeSpacing,
		ranksep: opts.layerSpacing,
		// Tighter margins for subgraph internals — the parent group provides outer padding
		marginx: 16,
		marginy: 12,
	});
	subG.setDefaultEdgeLabel(() => ({}));
	const nodeIds = /* @__PURE__ */ new Set();
	nodeIds.add(sg.id);
	collectSubgraphNodeIds(sg, nodeIds);
	for (const nodeId of sg.nodeIds) {
		const node = graph.nodes.get(nodeId);
		if (node) {
			const size = estimateNodeSize(nodeId, node.label, node.shape);
			subG.setNode(nodeId, {
				label: node.label,
				width: size.width,
				height: size.height,
			});
		}
	}
	for (const child of sg.children) {
		addSubgraphToDagre(subG, child, graph);
	}
	const internalEdgeIndices = /* @__PURE__ */ new Set();
	for (let i = 0; i < graph.edges.length; i++) {
		const edge = graph.edges[i];
		if (nodeIds.has(edge.source) && nodeIds.has(edge.target)) {
			internalEdgeIndices.add(i);
			const edgeLabel = { _index: i };
			if (edge.label) {
				edgeLabel.label = edge.label;
				edgeLabel.width =
					estimateTextWidth(
						edge.label,
						FONT_SIZES.edgeLabel,
						FONT_WEIGHTS.edgeLabel,
					) + 8;
				edgeLabel.height = FONT_SIZES.edgeLabel + 6;
				edgeLabel.labelpos = "c";
			}
			subG.setEdge(edge.source, edge.target, edgeLabel);
		}
	}
	dagre.layout(subG);
	const verticalFirst =
		sg.direction === "TD" || sg.direction === "TB" || sg.direction === "BT";
	const nestedSubgraphIds = /* @__PURE__ */ new Set();
	for (const child of sg.children) {
		collectAllSubgraphIds(child, nestedSubgraphIds);
	}
	const nodes = [];
	for (const nodeId of subG.nodes()) {
		if (nestedSubgraphIds.has(nodeId)) continue;
		const mNode = graph.nodes.get(nodeId);
		if (!mNode) continue;
		const dagreNode = subG.node(nodeId);
		if (!dagreNode) continue;
		const topLeft = centerToTopLeft(
			dagreNode.x,
			dagreNode.y,
			dagreNode.width,
			dagreNode.height,
		);
		nodes.push({
			id: nodeId,
			label: mNode.label,
			shape: mNode.shape,
			x: topLeft.x,
			y: topLeft.y,
			width: dagreNode.width,
			height: dagreNode.height,
			inlineStyle: resolveNodeStyle(graph, nodeId),
		});
	}
	const edges = subG.edges().map((edgeObj) => {
		const dagreEdge = subG.edge(edgeObj);
		const originalEdge = graph.edges[dagreEdge._index];
		const rawPoints = dagreEdge.points ?? [];
		if (rawPoints.length > 0) {
			const srcShape2 = graph.nodes.get(edgeObj.v)?.shape;
			if (srcShape2 === "diamond") {
				const sn = subG.node(edgeObj.v);
				rawPoints[0] = clipToDiamondBoundary(
					rawPoints[0],
					sn.x,
					sn.y,
					sn.width / 2,
					sn.height / 2,
				);
			} else if (srcShape2 && CIRCULAR_SHAPES.has(srcShape2)) {
				const sn = subG.node(edgeObj.v);
				rawPoints[0] = clipToCircleBoundary(
					rawPoints[0],
					sn.x,
					sn.y,
					Math.min(sn.width, sn.height) / 2,
				);
			}
			const tgtShape2 = graph.nodes.get(edgeObj.w)?.shape;
			if (tgtShape2 === "diamond") {
				const tn = subG.node(edgeObj.w);
				const last = rawPoints.length - 1;
				rawPoints[last] = clipToDiamondBoundary(
					rawPoints[last],
					tn.x,
					tn.y,
					tn.width / 2,
					tn.height / 2,
				);
			} else if (tgtShape2 && CIRCULAR_SHAPES.has(tgtShape2)) {
				const tn = subG.node(edgeObj.w);
				const last = rawPoints.length - 1;
				rawPoints[last] = clipToCircleBoundary(
					rawPoints[last],
					tn.x,
					tn.y,
					Math.min(tn.width, tn.height) / 2,
				);
			}
		}
		const orthoPoints = snapToOrthogonal(rawPoints, verticalFirst);
		const srcShape = graph.nodes.get(edgeObj.v)?.shape;
		const tgtShape = graph.nodes.get(edgeObj.w)?.shape;
		const srcRect =
			(srcShape && !NON_RECT_SHAPES.has(srcShape)) || !srcShape
				? (() => {
						const sn = subG.node(edgeObj.v);
						return sn
							? { cx: sn.x, cy: sn.y, hw: sn.width / 2, hh: sn.height / 2 }
							: null;
					})()
				: null;
		const tgtRect =
			(tgtShape && !NON_RECT_SHAPES.has(tgtShape)) || !tgtShape
				? (() => {
						const tn = subG.node(edgeObj.w);
						return tn
							? { cx: tn.x, cy: tn.y, hw: tn.width / 2, hh: tn.height / 2 }
							: null;
					})()
				: null;
		const points = clipEndpointsToNodes(orthoPoints, srcRect, tgtRect);
		let labelPosition;
		if (originalEdge.label && dagreEdge.x != null && dagreEdge.y != null) {
			labelPosition = { x: dagreEdge.x, y: dagreEdge.y };
		}
		return {
			source: originalEdge.source,
			target: originalEdge.target,
			label: originalEdge.label,
			style: originalEdge.style,
			hasArrowStart: originalEdge.hasArrowStart,
			hasArrowEnd: originalEdge.hasArrowEnd,
			points,
			labelPosition,
		};
	});
	const groups = sg.children.map((child) => extractGroup(subG, child));
	const graphInfo = subG.graph();
	return {
		id: sg.id,
		label: sg.label,
		width: graphInfo.width ?? 200,
		height: graphInfo.height ?? 100,
		nodes,
		edges,
		groups,
		nodeIds,
		internalEdgeIndices,
	};
}
async function layoutGraph(graph, options = {}) {
	const opts = { ...DEFAULTS2, ...options };
	const preComputed = /* @__PURE__ */ new Map();
	for (const sg of graph.subgraphs) {
		if (sg.direction && sg.direction !== graph.direction) {
			preComputed.set(sg.id, preComputeSubgraphLayout(sg, graph, opts));
		}
	}
	const g = new dagre.graphlib.Graph({ directed: true, compound: true });
	g.setGraph({
		rankdir: directionToDagre(graph.direction),
		acyclicer: "greedy",
		nodesep: opts.nodeSpacing,
		ranksep: opts.layerSpacing,
		marginx: opts.padding,
		marginy: opts.padding,
	});
	g.setDefaultEdgeLabel(() => ({}));
	const subgraphNodeIds = /* @__PURE__ */ new Set();
	for (const sg of graph.subgraphs) {
		subgraphNodeIds.add(sg.id);
		collectSubgraphNodeIds(sg, subgraphNodeIds);
	}
	for (const [id, node] of graph.nodes) {
		if (!subgraphNodeIds.has(id)) {
			const size = estimateNodeSize(id, node.label, node.shape);
			g.setNode(id, {
				label: node.label,
				width: size.width,
				height: size.height,
			});
		}
	}
	for (const sg of graph.subgraphs) {
		if (preComputed.has(sg.id)) {
			const pc = preComputed.get(sg.id);
			g.setNode(sg.id, { width: pc.width, height: pc.height });
		} else {
			addSubgraphToDagre(g, sg, graph);
		}
	}
	const subgraphEntryNode = /* @__PURE__ */ new Map();
	const subgraphExitNode = /* @__PURE__ */ new Map();
	for (const sg of graph.subgraphs) {
		if (!preComputed.has(sg.id)) {
			buildSubgraphRedirects(sg, subgraphEntryNode, subgraphExitNode);
		}
	}
	for (const [sgId, pc] of preComputed) {
		for (const nodeId of pc.nodeIds) {
			subgraphEntryNode.set(nodeId, sgId);
			subgraphExitNode.set(nodeId, sgId);
		}
	}
	const allInternalIndices = /* @__PURE__ */ new Set();
	for (const pc of preComputed.values()) {
		for (const idx of pc.internalEdgeIndices) allInternalIndices.add(idx);
	}
	const introducedTargets = /* @__PURE__ */ new Set();
	for (let i = 0; i < graph.edges.length; i++) {
		if (allInternalIndices.has(i)) continue;
		const edge = graph.edges[i];
		const source = subgraphExitNode.get(edge.source) ?? edge.source;
		const target = subgraphEntryNode.get(edge.target) ?? edge.target;
		const edgeLabel = { _index: i };
		if (edge.label) {
			edgeLabel.label = edge.label;
			edgeLabel.width =
				estimateTextWidth(
					edge.label,
					FONT_SIZES.edgeLabel,
					FONT_WEIGHTS.edgeLabel,
				) + 8;
			edgeLabel.height = FONT_SIZES.edgeLabel + 6;
			edgeLabel.labelpos = "c";
		}
		if (!introducedTargets.has(target)) {
			edgeLabel.weight = 2;
			introducedTargets.add(target);
		}
		g.setEdge(source, target, edgeLabel);
	}
	try {
		dagre.layout(g);
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		throw new Error(`Dagre layout failed: ${message}`);
	}
	return extractPositionedGraph(g, graph, opts.padding, preComputed);
}
function directionToDagre(dir) {
	switch (dir) {
		case "LR":
			return "LR";
		case "RL":
			return "RL";
		case "BT":
			return "BT";
		case "TD":
		case "TB":
		default:
			return "TB";
	}
}
function estimateNodeSize(id, label, shape) {
	const textWidth = estimateTextWidth(
		label,
		FONT_SIZES.nodeLabel,
		FONT_WEIGHTS.nodeLabel,
	);
	let width = textWidth + NODE_PADDING.horizontal * 2;
	let height = FONT_SIZES.nodeLabel + NODE_PADDING.vertical * 2;
	if (shape === "diamond") {
		const side = Math.max(width, height) + NODE_PADDING.diamondExtra;
		width = side;
		height = side;
	}
	if (shape === "circle" || shape === "doublecircle") {
		const diameter = Math.ceil(Math.sqrt(width * width + height * height)) + 8;
		width = shape === "doublecircle" ? diameter + 12 : diameter;
		height = width;
	}
	if (shape === "hexagon") {
		width += NODE_PADDING.horizontal;
	}
	if (shape === "trapezoid" || shape === "trapezoid-alt") {
		width += NODE_PADDING.horizontal;
	}
	if (shape === "asymmetric") {
		width += 12;
	}
	if (shape === "cylinder") {
		height += 14;
	}
	if (shape === "state-start" || shape === "state-end") {
		width = 28;
		height = 28;
	}
	width = Math.max(width, 60);
	height = Math.max(height, 36);
	return { width, height };
}
function addSubgraphToDagre(g, sg, graph, parentId) {
	g.setNode(sg.id, { label: sg.label });
	if (parentId) {
		g.setParent(sg.id, parentId);
	}
	for (const nodeId of sg.nodeIds) {
		const node = graph.nodes.get(nodeId);
		if (node) {
			const size = estimateNodeSize(nodeId, node.label, node.shape);
			g.setNode(nodeId, {
				label: node.label,
				width: size.width,
				height: size.height,
			});
			g.setParent(nodeId, sg.id);
		}
	}
	for (const child of sg.children) {
		addSubgraphToDagre(g, child, graph, sg.id);
	}
}
function buildSubgraphRedirects(sg, entryMap, exitMap) {
	for (const child of sg.children) {
		buildSubgraphRedirects(child, entryMap, exitMap);
	}
	const childIds = [...sg.nodeIds, ...sg.children.map((c) => c.id)];
	if (childIds.length === 0) {
		entryMap.set(sg.id, sg.id);
		exitMap.set(sg.id, sg.id);
		return;
	}
	const firstChild = childIds[0];
	const lastChild = childIds[childIds.length - 1];
	entryMap.set(sg.id, entryMap.get(firstChild) ?? firstChild);
	exitMap.set(sg.id, exitMap.get(lastChild) ?? lastChild);
}
function resolveNodeStyle(graph, nodeId) {
	const className = graph.classAssignments.get(nodeId);
	const classProps = className ? graph.classDefs.get(className) : void 0;
	const inlineProps = graph.nodeStyles.get(nodeId);
	if (!classProps && !inlineProps) return void 0;
	return { ...classProps, ...inlineProps };
}
function collectSubgraphNodeIds(sg, out) {
	for (const id of sg.nodeIds) {
		out.add(id);
	}
	for (const child of sg.children) {
		collectSubgraphNodeIds(child, out);
	}
}
function extractPositionedGraph(g, graph, padding, preComputed) {
	const nodes = [];
	const groups = [];
	const subgraphIds = /* @__PURE__ */ new Set();
	for (const sg of graph.subgraphs) {
		collectAllSubgraphIds(sg, subgraphIds);
	}
	const preComputedNodeIds = /* @__PURE__ */ new Set();
	if (preComputed) {
		for (const pc of preComputed.values()) {
			for (const nodeId of pc.nodeIds) preComputedNodeIds.add(nodeId);
		}
	}
	for (const nodeId of g.nodes()) {
		if (subgraphIds.has(nodeId)) continue;
		const mNode = graph.nodes.get(nodeId);
		if (!mNode) continue;
		const dagreNode = g.node(nodeId);
		if (!dagreNode) continue;
		const topLeft = centerToTopLeft(
			dagreNode.x,
			dagreNode.y,
			dagreNode.width,
			dagreNode.height,
		);
		nodes.push({
			id: nodeId,
			label: mNode.label,
			shape: mNode.shape,
			x: topLeft.x,
			y: topLeft.y,
			width: dagreNode.width,
			height: dagreNode.height,
			inlineStyle: resolveNodeStyle(graph, nodeId),
		});
	}
	for (const sg of graph.subgraphs) {
		groups.push(extractGroup(g, sg));
	}
	const verticalFirst =
		graph.direction === "TD" ||
		graph.direction === "TB" ||
		graph.direction === "BT";
	const edges = g.edges().map((edgeObj) => {
		const dagreEdge = g.edge(edgeObj);
		const originalEdge = graph.edges[dagreEdge._index];
		const rawPoints = dagreEdge.points ?? [];
		if (rawPoints.length > 0) {
			const srcShape = graph.nodes.get(edgeObj.v)?.shape;
			if (srcShape === "diamond") {
				const sn = g.node(edgeObj.v);
				rawPoints[0] = clipToDiamondBoundary(
					rawPoints[0],
					sn.x,
					sn.y,
					sn.width / 2,
					sn.height / 2,
				);
			} else if (srcShape && CIRCULAR_SHAPES.has(srcShape)) {
				const sn = g.node(edgeObj.v);
				rawPoints[0] = clipToCircleBoundary(
					rawPoints[0],
					sn.x,
					sn.y,
					Math.min(sn.width, sn.height) / 2,
				);
			}
			const tgtShape = graph.nodes.get(edgeObj.w)?.shape;
			if (tgtShape === "diamond") {
				const tn = g.node(edgeObj.w);
				const last = rawPoints.length - 1;
				rawPoints[last] = clipToDiamondBoundary(
					rawPoints[last],
					tn.x,
					tn.y,
					tn.width / 2,
					tn.height / 2,
				);
			} else if (tgtShape && CIRCULAR_SHAPES.has(tgtShape)) {
				const tn = g.node(edgeObj.w);
				const last = rawPoints.length - 1;
				rawPoints[last] = clipToCircleBoundary(
					rawPoints[last],
					tn.x,
					tn.y,
					Math.min(tn.width, tn.height) / 2,
				);
			}
		}
		const orthoPoints = snapToOrthogonal(rawPoints, verticalFirst);
		const srcShapeForClip = graph.nodes.get(edgeObj.v)?.shape;
		const tgtShapeForClip = graph.nodes.get(edgeObj.w)?.shape;
		const srcRect =
			(srcShapeForClip && !NON_RECT_SHAPES.has(srcShapeForClip)) ||
			!srcShapeForClip
				? (() => {
						const sn = g.node(edgeObj.v);
						return sn
							? { cx: sn.x, cy: sn.y, hw: sn.width / 2, hh: sn.height / 2 }
							: null;
					})()
				: null;
		const tgtRect =
			(tgtShapeForClip && !NON_RECT_SHAPES.has(tgtShapeForClip)) ||
			!tgtShapeForClip
				? (() => {
						const tn = g.node(edgeObj.w);
						return tn
							? { cx: tn.x, cy: tn.y, hw: tn.width / 2, hh: tn.height / 2 }
							: null;
					})()
				: null;
		const points = clipEndpointsToNodes(orthoPoints, srcRect, tgtRect);
		let labelPosition;
		if (originalEdge.label && dagreEdge.x != null && dagreEdge.y != null) {
			labelPosition = { x: dagreEdge.x, y: dagreEdge.y };
		}
		return {
			source: originalEdge.source,
			target: originalEdge.target,
			label: originalEdge.label,
			style: originalEdge.style,
			hasArrowStart: originalEdge.hasArrowStart,
			hasArrowEnd: originalEdge.hasArrowEnd,
			points,
			labelPosition,
		};
	});
	if (preComputed && preComputed.size > 0) {
		const nodePositionMap = /* @__PURE__ */ new Map();
		for (const n of nodes) {
			nodePositionMap.set(n.id, {
				cx: n.x + n.width / 2,
				cy: n.y + n.height / 2,
			});
		}
		for (const [sgId, pc] of preComputed) {
			const placeholder = g.node(sgId);
			if (!placeholder) continue;
			const topLeft = centerToTopLeft(
				placeholder.x,
				placeholder.y,
				placeholder.width,
				placeholder.height,
			);
			for (const pcNode of pc.nodes) {
				const composed = {
					...pcNode,
					x: pcNode.x + topLeft.x,
					y: pcNode.y + topLeft.y,
				};
				nodes.push(composed);
				nodePositionMap.set(composed.id, {
					cx: composed.x + composed.width / 2,
					cy: composed.y + composed.height / 2,
				});
			}
			for (const pcEdge of pc.edges) {
				edges.push({
					...pcEdge,
					points: pcEdge.points.map((p) => ({
						x: p.x + topLeft.x,
						y: p.y + topLeft.y,
					})),
					labelPosition: pcEdge.labelPosition
						? {
								x: pcEdge.labelPosition.x + topLeft.x,
								y: pcEdge.labelPosition.y + topLeft.y,
							}
						: void 0,
				});
			}
			const group = findGroupById(groups, sgId);
			if (group && pc.groups.length > 0) {
				group.children = pc.groups.map((cg) =>
					offsetGroup(cg, topLeft.x, topLeft.y),
				);
			}
		}
		for (const edge of edges) {
			if (
				preComputedNodeIds.has(edge.source) &&
				preComputedNodeIds.has(edge.target)
			)
				continue;
			let modified = false;
			if (preComputedNodeIds.has(edge.source)) {
				const pos = nodePositionMap.get(edge.source);
				if (pos && edge.points.length > 0) {
					edge.points[0] = { x: pos.cx, y: pos.cy };
					modified = true;
				}
			}
			if (preComputedNodeIds.has(edge.target)) {
				const pos = nodePositionMap.get(edge.target);
				if (pos && edge.points.length > 0) {
					edge.points[edge.points.length - 1] = { x: pos.cx, y: pos.cy };
					modified = true;
				}
			}
			if (modified) {
				edge.points = snapToOrthogonal(edge.points, verticalFirst);
			}
		}
	}
	const headerHeight = FONT_SIZES.groupHeader + 16;
	expandGroupsForHeaders(groups, headerHeight);
	const flatGroups = flattenAllGroups(groups);
	const allYs = [...nodes.map((n) => n.y), ...flatGroups.map((g2) => g2.y)];
	const currentMinY = allYs.length > 0 ? Math.min(...allYs) : padding;
	let graphWidth = g.graph().width ?? 800;
	let graphHeight = g.graph().height ?? 600;
	if (currentMinY < padding) {
		const dy = padding - currentMinY;
		for (const n of nodes) n.y += dy;
		for (const e of edges) {
			for (const p of e.points) p.y += dy;
			if (e.labelPosition) e.labelPosition.y += dy;
		}
		for (const fg of flatGroups) fg.y += dy;
		graphHeight += dy;
	}
	const maxBottom = Math.max(
		...nodes.map((n) => n.y + n.height),
		...flatGroups.map((g2) => g2.y + g2.height),
		...edges.flatMap((e) => e.points.map((p) => p.y)),
	);
	if (maxBottom + padding > graphHeight) {
		graphHeight = maxBottom + padding;
	}
	return {
		width: graphWidth,
		height: graphHeight,
		nodes,
		edges,
		groups,
	};
}
function extractGroup(g, sg) {
	const dagreNode = g.node(sg.id);
	const topLeft = dagreNode
		? centerToTopLeft(
				dagreNode.x,
				dagreNode.y,
				dagreNode.width,
				dagreNode.height,
			)
		: { x: 0, y: 0 };
	return {
		id: sg.id,
		label: sg.label,
		x: topLeft.x,
		y: topLeft.y,
		width: dagreNode?.width ?? 0,
		height: dagreNode?.height ?? 0,
		children: sg.children.map((child) => extractGroup(g, child)),
	};
}
function expandGroupsForHeaders(groups, headerHeight) {
	for (const group of groups) {
		expandGroupForHeader(group, headerHeight);
	}
}
function expandGroupForHeader(group, headerHeight) {
	for (const child of group.children) {
		expandGroupForHeader(child, headerHeight);
	}
	if (group.children.length > 0) {
		let minY = group.y;
		let maxY = group.y + group.height;
		for (const child of group.children) {
			minY = Math.min(minY, child.y);
			maxY = Math.max(maxY, child.y + child.height);
		}
		group.height = maxY - minY;
		group.y = minY;
	}
	if (group.label) {
		const expansion = headerHeight + GROUP_HEADER_CONTENT_PAD;
		group.y -= expansion;
		group.height += expansion;
	}
}
function flattenAllGroups(groups) {
	const result = [];
	for (const g of groups) {
		result.push(g);
		result.push(...flattenAllGroups(g.children));
	}
	return result;
}
function findGroupById(groups, id) {
	for (const g of groups) {
		if (g.id === id) return g;
		const found = findGroupById(g.children, id);
		if (found) return found;
	}
	return void 0;
}
function offsetGroup(group, dx, dy) {
	return {
		...group,
		x: group.x + dx,
		y: group.y + dy,
		children: group.children.map((c) => offsetGroup(c, dx, dy)),
	};
}
function collectAllSubgraphIds(sg, out) {
	out.add(sg.id);
	for (const child of sg.children) {
		collectAllSubgraphIds(child, out);
	}
}

// src/renderer.ts
function renderSvg(graph, colors, font = "Inter", transparent = false) {
	const parts = [];
	parts.push(svgOpenTag(graph.width, graph.height, colors, transparent));
	parts.push(buildStyleBlock(font, false));
	parts.push("<defs>");
	parts.push(arrowMarkerDefs());
	parts.push("</defs>");
	for (const group of graph.groups) {
		parts.push(renderGroup(group));
	}
	for (const edge of graph.edges) {
		parts.push(renderEdge(edge));
	}
	for (const edge of graph.edges) {
		if (edge.label) {
			parts.push(renderEdgeLabel(edge));
		}
	}
	for (const node of graph.nodes) {
		parts.push(renderNodeShape(node));
	}
	for (const node of graph.nodes) {
		parts.push(renderNodeLabel(node));
	}
	parts.push("</svg>");
	return parts.join("\n");
}
function arrowMarkerDefs() {
	const w = ARROW_HEAD.width;
	const h = ARROW_HEAD.height;
	return (
		// Forward arrow (marker-end) — orient="auto" ensures arrow points along line direction
		`  <marker id="arrowhead" markerWidth="${w}" markerHeight="${h}" refX="${w}" refY="${h / 2}" orient="auto">
    <polygon points="0 0, ${w} ${h / 2}, 0 ${h}" fill="var(--_arrow)" />
  </marker>
  <marker id="arrowhead-start" markerWidth="${w}" markerHeight="${h}" refX="0" refY="${h / 2}" orient="auto-start-reverse">
    <polygon points="${w} 0, 0 ${h / 2}, ${w} ${h}" fill="var(--_arrow)" />
  </marker>`
	);
}
function renderGroup(group, font) {
	const headerHeight = FONT_SIZES.groupHeader + 16;
	const parts = [];
	parts.push(
		`<rect x="${group.x}" y="${group.y}" width="${group.width}" height="${group.height}" rx="0" ry="0" fill="var(--_group-fill)" stroke="var(--_node-stroke)" stroke-width="${STROKE_WIDTHS.outerBox}" />`,
	);
	parts.push(
		`<rect x="${group.x}" y="${group.y}" width="${group.width}" height="${headerHeight}" rx="0" ry="0" fill="var(--_group-hdr)" stroke="var(--_node-stroke)" stroke-width="${STROKE_WIDTHS.outerBox}" />`,
	);
	parts.push(
		`<text x="${group.x + 12}" y="${group.y + headerHeight / 2}" dy="${TEXT_BASELINE_SHIFT}" font-size="${FONT_SIZES.groupHeader}" font-weight="${FONT_WEIGHTS.groupHeader}" fill="var(--_text-sec)">${escapeXml(group.label)}</text>`,
	);
	for (const child of group.children) {
		parts.push(renderGroup(child));
	}
	return parts.join("\n");
}
function renderEdge(edge) {
	if (edge.points.length < 2) return "";
	const pathData = pointsToPolylinePath(edge.points);
	const dashArray = edge.style === "dotted" ? ' stroke-dasharray="4 4"' : "";
	const strokeWidth =
		edge.style === "thick"
			? STROKE_WIDTHS.connector * 2
			: STROKE_WIDTHS.connector;
	let markers = "";
	if (edge.hasArrowEnd) markers += ' marker-end="url(#arrowhead)"';
	if (edge.hasArrowStart) markers += ' marker-start="url(#arrowhead-start)"';
	return `<polyline points="${pathData}" fill="none" stroke="var(--_line)" stroke-width="${strokeWidth}"${dashArray}${markers} />`;
}
function pointsToPolylinePath(points) {
	return points.map((p) => `${p.x},${p.y}`).join(" ");
}
function renderEdgeLabel(edge, font) {
	const mid = edge.labelPosition ?? edgeMidpoint(edge.points);
	const label = edge.label;
	const textWidth = estimateTextWidth(
		label,
		FONT_SIZES.edgeLabel,
		FONT_WEIGHTS.edgeLabel,
	);
	const padding = 8;
	const bgWidth = textWidth + padding * 2;
	const bgHeight = FONT_SIZES.edgeLabel + padding * 2;
	return `<rect x="${mid.x - bgWidth / 2}" y="${mid.y - bgHeight / 2}" width="${bgWidth}" height="${bgHeight}" rx="4" ry="4" fill="var(--bg)" stroke="var(--_inner-stroke)" stroke-width="0.5" />
<text x="${mid.x}" y="${mid.y}" text-anchor="middle" dy="${TEXT_BASELINE_SHIFT}" font-size="${FONT_SIZES.edgeLabel}" font-weight="${FONT_WEIGHTS.edgeLabel}" fill="var(--_text-muted)">${escapeXml(label)}</text>`;
}
function edgeMidpoint(points) {
	if (points.length === 0) return { x: 0, y: 0 };
	if (points.length === 1) return points[0];
	let totalLength = 0;
	for (let i = 1; i < points.length; i++) {
		totalLength += dist(points[i - 1], points[i]);
	}
	let remaining = totalLength / 2;
	for (let i = 1; i < points.length; i++) {
		const segLen = dist(points[i - 1], points[i]);
		if (remaining <= segLen) {
			const t = remaining / segLen;
			return {
				x: points[i - 1].x + t * (points[i].x - points[i - 1].x),
				y: points[i - 1].y + t * (points[i].y - points[i - 1].y),
			};
		}
		remaining -= segLen;
	}
	return points[points.length - 1];
}
function dist(a, b) {
	return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}
function renderNodeShape(node) {
	const { x, y, width, height, shape, inlineStyle } = node;
	const fill = escapeXml(inlineStyle?.fill ?? "var(--_node-fill)");
	const stroke = escapeXml(inlineStyle?.stroke ?? "var(--_node-stroke)");
	const sw = escapeXml(
		inlineStyle?.["stroke-width"] ?? String(STROKE_WIDTHS.innerBox),
	);
	switch (shape) {
		case "diamond":
			return renderDiamond(x, y, width, height, fill, stroke, sw);
		case "rounded":
			return renderRoundedRect(x, y, width, height, fill, stroke, sw);
		case "stadium":
			return renderStadium(x, y, width, height, fill, stroke, sw);
		case "circle":
			return renderCircle(x, y, width, height, fill, stroke, sw);
		case "subroutine":
			return renderSubroutine(x, y, width, height, fill, stroke, sw);
		case "doublecircle":
			return renderDoubleCircle(x, y, width, height, fill, stroke, sw);
		case "hexagon":
			return renderHexagon(x, y, width, height, fill, stroke, sw);
		case "cylinder":
			return renderCylinder(x, y, width, height, fill, stroke, sw);
		case "asymmetric":
			return renderAsymmetric(x, y, width, height, fill, stroke, sw);
		case "trapezoid":
			return renderTrapezoid(x, y, width, height, fill, stroke, sw);
		case "trapezoid-alt":
			return renderTrapezoidAlt(x, y, width, height, fill, stroke, sw);
		case "state-start":
			return renderStateStart(x, y, width, height);
		case "state-end":
			return renderStateEnd(x, y, width, height);
		case "rectangle":
		default:
			return renderRect(x, y, width, height, fill, stroke, sw);
	}
}
function renderRect(x, y, w, h, fill, stroke, sw) {
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="0" ry="0" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function renderRoundedRect(x, y, w, h, fill, stroke, sw) {
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" ry="6" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function renderStadium(x, y, w, h, fill, stroke, sw) {
	const r = h / 2;
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ry="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function renderCircle(x, y, w, h, fill, stroke, sw) {
	const cx = x + w / 2;
	const cy = y + h / 2;
	const r = Math.min(w, h) / 2;
	return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function renderDiamond(x, y, w, h, fill, stroke, sw) {
	const cx = x + w / 2;
	const cy = y + h / 2;
	const hw = w / 2;
	const hh = h / 2;
	const points = [
		`${cx},${cy - hh}`,
		// top
		`${cx + hw},${cy}`,
		// right
		`${cx},${cy + hh}`,
		// bottom
		`${cx - hw},${cy}`,
		// left
	].join(" ");
	return `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function renderSubroutine(x, y, w, h, fill, stroke, sw) {
	const inset = 8;
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="0" ry="0" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />
<line x1="${x + inset}" y1="${y}" x2="${x + inset}" y2="${y + h}" stroke="${stroke}" stroke-width="${sw}" />
<line x1="${x + w - inset}" y1="${y}" x2="${x + w - inset}" y2="${y + h}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function renderDoubleCircle(x, y, w, h, fill, stroke, sw) {
	const cx = x + w / 2;
	const cy = y + h / 2;
	const outerR = Math.min(w, h) / 2;
	const innerR = outerR - 5;
	return `<circle cx="${cx}" cy="${cy}" r="${outerR}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />
<circle cx="${cx}" cy="${cy}" r="${innerR}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function renderHexagon(x, y, w, h, fill, stroke, sw) {
	const inset = h / 4;
	const points = [
		`${x + inset},${y}`,
		// top-left
		`${x + w - inset},${y}`,
		// top-right
		`${x + w},${y + h / 2}`,
		// mid-right
		`${x + w - inset},${y + h}`,
		// bottom-right
		`${x + inset},${y + h}`,
		// bottom-left
		`${x},${y + h / 2}`,
		// mid-left
	].join(" ");
	return `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function renderCylinder(x, y, w, h, fill, stroke, sw) {
	const ry = 7;
	const cx = x + w / 2;
	const bodyTop = y + ry;
	const bodyH = h - 2 * ry;
	return (
		// Body rectangle (no top border — covered by top ellipse)
		`<rect x="${x}" y="${bodyTop}" width="${w}" height="${bodyH}" fill="${fill}" stroke="none" />
<line x1="${x}" y1="${bodyTop}" x2="${x}" y2="${bodyTop + bodyH}" stroke="${stroke}" stroke-width="${sw}" />
<line x1="${x + w}" y1="${bodyTop}" x2="${x + w}" y2="${bodyTop + bodyH}" stroke="${stroke}" stroke-width="${sw}" />
<ellipse cx="${cx}" cy="${y + h - ry}" rx="${w / 2}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />
<ellipse cx="${cx}" cy="${bodyTop}" rx="${w / 2}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`
	);
}
function renderAsymmetric(x, y, w, h, fill, stroke, sw) {
	const indent = 12;
	const points = [
		`${x + indent},${y}`,
		// top-left (indented)
		`${x + w},${y}`,
		// top-right
		`${x + w},${y + h}`,
		// bottom-right
		`${x + indent},${y + h}`,
		// bottom-left (indented)
		`${x},${y + h / 2}`,
		// left point
	].join(" ");
	return `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function renderTrapezoid(x, y, w, h, fill, stroke, sw) {
	const inset = w * 0.15;
	const points = [
		`${x + inset},${y}`,
		// top-left (indented)
		`${x + w - inset},${y}`,
		// top-right (indented)
		`${x + w},${y + h}`,
		// bottom-right (full width)
		`${x},${y + h}`,
		// bottom-left (full width)
	].join(" ");
	return `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function renderTrapezoidAlt(x, y, w, h, fill, stroke, sw) {
	const inset = w * 0.15;
	const points = [
		`${x},${y}`,
		// top-left (full width)
		`${x + w},${y}`,
		// top-right (full width)
		`${x + w - inset},${y + h}`,
		// bottom-right (indented)
		`${x + inset},${y + h}`,
		// bottom-left (indented)
	].join(" ");
	return `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
}
function renderStateStart(x, y, w, h) {
	const cx = x + w / 2;
	const cy = y + h / 2;
	const r = Math.min(w, h) / 2 - 2;
	return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--_text)" stroke="none" />`;
}
function renderStateEnd(x, y, w, h) {
	const cx = x + w / 2;
	const cy = y + h / 2;
	const outerR = Math.min(w, h) / 2 - 2;
	const innerR = outerR - 4;
	return `<circle cx="${cx}" cy="${cy}" r="${outerR}" fill="none" stroke="var(--_text)" stroke-width="${STROKE_WIDTHS.innerBox * 2}" />
<circle cx="${cx}" cy="${cy}" r="${innerR}" fill="var(--_text)" stroke="none" />`;
}
function renderNodeLabel(node, font) {
	if (node.shape === "state-start" || node.shape === "state-end") {
		if (!node.label) return "";
	}
	const cx = node.x + node.width / 2;
	const cy = node.y + node.height / 2;
	const textColor = escapeXml(node.inlineStyle?.color ?? "var(--_text)");
	return `<text x="${cx}" y="${cy}" text-anchor="middle" dy="${TEXT_BASELINE_SHIFT}" font-size="${FONT_SIZES.nodeLabel}" font-weight="${FONT_WEIGHTS.nodeLabel}" fill="${textColor}">${escapeXml(node.label)}</text>`;
}
function escapeXml(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

// src/sequence/layout.ts
var SEQ = {
	/** Padding around the entire diagram */
	padding: 30,
	/** Minimum gap between actor centers */
	actorGap: 140,
	/** Actor box height */
	actorHeight: 40,
	/** Horizontal padding inside actor boxes */
	actorPadX: 16,
	/** Vertical space between actor boxes and first message */
	headerGap: 20,
	/** Vertical space per message row */
	messageRowHeight: 40,
	/** Extra vertical space for self-messages (they loop back) */
	selfMessageHeight: 30,
	/** Activation box width (narrow rectangle on lifeline) */
	activationWidth: 10,
	/** Block padding (loop/alt borders) */
	blockPadX: 10,
	blockPadTop: 40,
	blockPadBottom: 8,
	/** Extra vertical space before the first message in a block (room for the header label) */
	blockHeaderExtra: 28,
	/** Extra vertical space before a message at a divider boundary (room for else/and label) */
	dividerExtra: 24,
	/** Note dimensions */
	noteWidth: 120,
	notePadding: 8,
	noteGap: 10,
};
function layoutSequenceDiagram(diagram, _options = {}) {
	if (diagram.actors.length === 0) {
		return {
			width: 0,
			height: 0,
			actors: [],
			lifelines: [],
			messages: [],
			activations: [],
			blocks: [],
			notes: [],
		};
	}
	const actorWidths = diagram.actors.map((a) => {
		const textW = estimateTextWidth(
			a.label,
			FONT_SIZES.nodeLabel,
			FONT_WEIGHTS.nodeLabel,
		);
		return Math.max(textW + SEQ.actorPadX * 2, 80);
	});
	const actorCenterX = [];
	let currentX = SEQ.padding + actorWidths[0] / 2;
	for (let i = 0; i < diagram.actors.length; i++) {
		if (i > 0) {
			const minGap = Math.max(
				SEQ.actorGap,
				(actorWidths[i - 1] + actorWidths[i]) / 2 + 40,
			);
			currentX += minGap;
		}
		actorCenterX.push(currentX);
	}
	const actorIndex = /* @__PURE__ */ new Map();
	for (let i = 0; i < diagram.actors.length; i++) {
		actorIndex.set(diagram.actors[i].id, i);
	}
	const actorY = SEQ.padding;
	const actors = diagram.actors.map((a, i) => ({
		id: a.id,
		label: a.label,
		type: a.type,
		x: actorCenterX[i],
		y: actorY,
		width: actorWidths[i],
		height: SEQ.actorHeight,
	}));
	let messageY = actorY + SEQ.actorHeight + SEQ.headerGap;
	const messages = [];
	const extraSpaceBefore = /* @__PURE__ */ new Map();
	for (const block of diagram.blocks) {
		const prev = extraSpaceBefore.get(block.startIndex) ?? 0;
		extraSpaceBefore.set(
			block.startIndex,
			Math.max(prev, SEQ.blockHeaderExtra),
		);
		for (const div of block.dividers) {
			const prevDiv = extraSpaceBefore.get(div.index) ?? 0;
			extraSpaceBefore.set(div.index, Math.max(prevDiv, SEQ.dividerExtra));
		}
	}
	// PATCH: Pre-calculate note heights to reserve space for messages after notes
	// Notes are positioned 4px below their reference message, so we need to ensure
	// the next message has enough space below the note.
	// Edge case: notes declared before any messages have afterIndex = -1, which is
	// handled safely by the condition check (afterIndex + 1 = 0, not < messages.length
	// when no messages exist, or becomes index 0 which is valid)
	for (const note of diagram.notes) {
		const noteH = FONT_SIZES.edgeLabel + SEQ.notePadding * 2;
		const noteTopOffset = 4; // notes start 4px below ref message
		const noteBottomGap = 8; // minimum gap between note bottom and next message
		// Total space the note occupies below the reference message's baseline
		const noteSpaceNeeded = noteTopOffset + noteH + noteBottomGap;
		// If this exceeds the normal row height, we need extra space before the next message
		const extraNeeded = noteSpaceNeeded - SEQ.messageRowHeight;
		if (extraNeeded > 0 && note.afterIndex + 1 < diagram.messages.length) {
			const nextMsgIdx = note.afterIndex + 1;
			const prevExtra = extraSpaceBefore.get(nextMsgIdx) ?? 0;
			extraSpaceBefore.set(nextMsgIdx, Math.max(prevExtra, extraNeeded));
		}
	}
	const activationStacks = /* @__PURE__ */ new Map();
	const activations = [];
	for (let msgIdx = 0; msgIdx < diagram.messages.length; msgIdx++) {
		const msg = diagram.messages[msgIdx];
		const fromIdx = actorIndex.get(msg.from) ?? 0;
		const toIdx = actorIndex.get(msg.to) ?? 0;
		const isSelf = msg.from === msg.to;
		const extra = extraSpaceBefore.get(msgIdx) ?? 0;
		if (extra > 0) messageY += extra;
		const x1 = actorCenterX[fromIdx];
		const x2 = actorCenterX[toIdx];
		messages.push({
			from: msg.from,
			to: msg.to,
			label: msg.label,
			lineStyle: msg.lineStyle,
			arrowHead: msg.arrowHead,
			x1,
			x2,
			y: messageY,
			isSelf,
		});
		if (msg.activate) {
			if (!activationStacks.has(msg.to)) {
				activationStacks.set(msg.to, []);
			}
			activationStacks.get(msg.to).push(messageY);
		}
		if (msg.deactivate) {
			const stack = activationStacks.get(msg.from);
			if (stack && stack.length > 0) {
				const startY = stack.pop();
				const idx = actorIndex.get(msg.from) ?? 0;
				activations.push({
					actorId: msg.from,
					x: actorCenterX[idx] - SEQ.activationWidth / 2,
					topY: startY,
					bottomY: messageY,
					width: SEQ.activationWidth,
				});
			}
		}
		messageY += isSelf
			? SEQ.selfMessageHeight + SEQ.messageRowHeight
			: SEQ.messageRowHeight;
	}
	for (const [actorId, stack] of activationStacks) {
		for (const startY of stack) {
			const idx = actorIndex.get(actorId) ?? 0;
			activations.push({
				actorId,
				x: actorCenterX[idx] - SEQ.activationWidth / 2,
				topY: startY,
				bottomY: messageY - SEQ.messageRowHeight / 2,
				width: SEQ.activationWidth,
			});
		}
	}
	const blocks = diagram.blocks.map((block) => {
		const startMsg = messages[block.startIndex];
		const endMsg = messages[block.endIndex];
		const blockTop = (startMsg?.y ?? messageY) - SEQ.blockPadTop;
		const blockBottom = (endMsg?.y ?? messageY) + SEQ.blockPadBottom + 12;
		const involvedActors = /* @__PURE__ */ new Set();
		for (let mi = block.startIndex; mi <= block.endIndex; mi++) {
			const m = diagram.messages[mi];
			if (m) {
				involvedActors.add(actorIndex.get(m.from) ?? 0);
				involvedActors.add(actorIndex.get(m.to) ?? 0);
			}
		}
		if (involvedActors.size === 0) {
			for (let ai = 0; ai < diagram.actors.length; ai++) involvedActors.add(ai);
		}
		const minIdx = Math.min(...involvedActors);
		const maxIdx = Math.max(...involvedActors);
		const blockLeft =
			actorCenterX[minIdx] - actorWidths[minIdx] / 2 - SEQ.blockPadX;
		const blockRight =
			actorCenterX[maxIdx] + actorWidths[maxIdx] / 2 + SEQ.blockPadX;
		const dividers = block.dividers.map((d) => {
			const msg = messages[d.index];
			const msgY = msg?.y ?? messageY;
			let offset = 28;
			if (d.label && msg?.label) {
				const divLabelText = `[${d.label}]`;
				const divLabelW = estimateTextWidth(
					divLabelText,
					FONT_SIZES.edgeLabel,
					FONT_WEIGHTS.edgeLabel,
				);
				const divLabelLeft = blockLeft + 8;
				const divLabelRight = divLabelLeft + divLabelW;
				const msgLabelW = estimateTextWidth(
					msg.label,
					FONT_SIZES.edgeLabel,
					FONT_WEIGHTS.edgeLabel,
				);
				const msgLabelLeft = msg.isSelf
					? msg.x1 + 36
					: (msg.x1 + msg.x2) / 2 - msgLabelW / 2;
				const msgLabelRight = msgLabelLeft + msgLabelW;
				if (divLabelRight > msgLabelLeft && divLabelLeft < msgLabelRight) {
					offset = 36;
				}
			}
			return { y: msgY - offset, label: d.label };
		});
		return {
			type: block.type,
			label: block.label,
			x: blockLeft,
			y: blockTop,
			width: blockRight - blockLeft,
			height: blockBottom - blockTop,
			dividers,
		};
	});
	const notes = diagram.notes.map((note) => {
		const noteW = Math.max(
			SEQ.noteWidth,
			estimateTextWidth(
				note.text,
				FONT_SIZES.edgeLabel,
				FONT_WEIGHTS.edgeLabel,
			) +
				SEQ.notePadding * 2,
		);
		const noteH = FONT_SIZES.edgeLabel + SEQ.notePadding * 2;
		const refMsg = messages[note.afterIndex];
		const noteY = (refMsg?.y ?? actorY + SEQ.actorHeight) + 4;
		const firstActorIdx = actorIndex.get(note.actorIds[0] ?? "") ?? 0;
		let noteX;
		if (note.position === "left") {
			noteX =
				actorCenterX[firstActorIdx] -
				actorWidths[firstActorIdx] / 2 -
				noteW -
				SEQ.noteGap;
		} else if (note.position === "right") {
			noteX =
				actorCenterX[firstActorIdx] +
				actorWidths[firstActorIdx] / 2 +
				SEQ.noteGap;
		} else {
			if (note.actorIds.length > 1) {
				const lastActorIdx =
					actorIndex.get(note.actorIds[note.actorIds.length - 1] ?? "") ??
					firstActorIdx;
				noteX =
					(actorCenterX[firstActorIdx] + actorCenterX[lastActorIdx]) / 2 -
					noteW / 2;
			} else {
				noteX = actorCenterX[firstActorIdx] - noteW / 2;
			}
		}
		return { text: note.text, x: noteX, y: noteY, width: noteW, height: noteH };
	});
	const diagramBottom = messageY + SEQ.padding;
	let globalMinX = SEQ.padding;
	let globalMaxX = 0;
	for (const a of actors) {
		globalMinX = Math.min(globalMinX, a.x - a.width / 2);
		globalMaxX = Math.max(globalMaxX, a.x + a.width / 2);
	}
	for (const b of blocks) {
		globalMinX = Math.min(globalMinX, b.x);
		globalMaxX = Math.max(globalMaxX, b.x + b.width);
	}
	for (const n of notes) {
		globalMinX = Math.min(globalMinX, n.x);
		globalMaxX = Math.max(globalMaxX, n.x + n.width);
	}
	const shiftX = globalMinX < SEQ.padding ? SEQ.padding - globalMinX : 0;
	if (shiftX > 0) {
		for (const a of actors) a.x += shiftX;
		for (const m of messages) {
			m.x1 += shiftX;
			m.x2 += shiftX;
		}
		for (const act of activations) act.x += shiftX;
		for (const b of blocks) {
			b.x += shiftX;
		}
		for (const n of notes) n.x += shiftX;
		for (let i = 0; i < actorCenterX.length; i++) actorCenterX[i] += shiftX;
	}
	const lifelines = diagram.actors.map((a, i) => ({
		actorId: a.id,
		x: actorCenterX[i],
		topY: actorY + SEQ.actorHeight,
		bottomY: diagramBottom - SEQ.padding,
	}));
	const diagramWidth = globalMaxX + shiftX + SEQ.padding;
	const diagramHeight = diagramBottom;
	return {
		width: Math.max(diagramWidth, 200),
		height: Math.max(diagramHeight, 100),
		actors,
		lifelines,
		messages,
		activations,
		blocks,
		notes,
	};
}

// src/sequence/renderer.ts
function renderSequenceSvg(
	diagram,
	colors,
	font = "Inter",
	transparent = false,
) {
	const parts = [];
	parts.push(svgOpenTag(diagram.width, diagram.height, colors, transparent));
	parts.push(buildStyleBlock(font, false));
	parts.push("<defs>");
	parts.push(arrowMarkerDefs2());
	parts.push("</defs>");
	for (const block of diagram.blocks) {
		parts.push(renderBlock(block));
	}
	for (const lifeline of diagram.lifelines) {
		parts.push(renderLifeline(lifeline));
	}
	for (const activation of diagram.activations) {
		parts.push(renderActivation(activation));
	}
	for (const message of diagram.messages) {
		parts.push(renderMessage(message));
	}
	for (const note of diagram.notes) {
		parts.push(renderNote(note));
	}
	for (const actor of diagram.actors) {
		parts.push(renderActor(actor));
	}
	parts.push("</svg>");
	return parts.join("\n");
}
function arrowMarkerDefs2() {
	const w = ARROW_HEAD.width;
	const h = ARROW_HEAD.height;
	return `  <marker id="seq-arrow" markerWidth="${w}" markerHeight="${h}" refX="${w}" refY="${h / 2}" orient="auto-start-reverse">
    <polygon points="0 0, ${w} ${h / 2}, 0 ${h}" fill="var(--_arrow)" />
  </marker>
  <marker id="seq-arrow-open" markerWidth="${w}" markerHeight="${h}" refX="${w}" refY="${h / 2}" orient="auto-start-reverse">
    <polyline points="0 0, ${w} ${h / 2}, 0 ${h}" fill="none" stroke="var(--_arrow)" stroke-width="1" />
  </marker>`;
}
function renderActor(actor) {
	const { x, y, width, height, label, type } = actor;
	if (type === "actor") {
		const s = (height / 24) * 0.9;
		const tx = x - 12 * s;
		const ty = y + (height - 24 * s) / 2;
		const sw = STROKE_WIDTHS.outerBox / s;
		const iconStroke = "var(--_line)";
		return `<g transform="translate(${tx},${ty}) scale(${s})">
  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="none" stroke="${iconStroke}" stroke-width="${sw}" />
  <path d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" fill="none" stroke="${iconStroke}" stroke-width="${sw}" />
  <path d="M5.62842 18.3563C7.08963 17.0398 9.39997 16 12 16C14.6 16 16.9104 17.0398 18.3716 18.3563" fill="none" stroke="${iconStroke}" stroke-width="${sw}" />
</g>
<text x="${x}" y="${y + height + 14}" text-anchor="middle" font-size="${FONT_SIZES.nodeLabel}" font-weight="${FONT_WEIGHTS.nodeLabel}" fill="var(--_text)">${escapeXml2(label)}</text>`;
	}
	const boxX = x - width / 2;
	return `<rect x="${boxX}" y="${y}" width="${width}" height="${height}" rx="4" ry="4" fill="var(--_node-fill)" stroke="var(--_node-stroke)" stroke-width="${STROKE_WIDTHS.outerBox}" />
<text x="${x}" y="${y + height / 2}" text-anchor="middle" dy="${TEXT_BASELINE_SHIFT}" font-size="${FONT_SIZES.nodeLabel}" font-weight="${FONT_WEIGHTS.nodeLabel}" fill="var(--_text)">${escapeXml2(label)}</text>`;
}
function renderLifeline(lifeline) {
	return `<line x1="${lifeline.x}" y1="${lifeline.topY}" x2="${lifeline.x}" y2="${lifeline.bottomY}" stroke="var(--_line)" stroke-width="0.75" stroke-dasharray="6 4" />`;
}
function renderActivation(activation) {
	return `<rect x="${activation.x}" y="${activation.topY}" width="${activation.width}" height="${activation.bottomY - activation.topY}" fill="var(--_node-fill)" stroke="var(--_node-stroke)" stroke-width="${STROKE_WIDTHS.innerBox}" />`;
}
function renderMessage(msg) {
	const parts = [];
	const dashArray = msg.lineStyle === "dashed" ? ' stroke-dasharray="6 4"' : "";
	const markerId = msg.arrowHead === "filled" ? "seq-arrow" : "seq-arrow-open";
	if (msg.isSelf) {
		const loopW = 30;
		const loopH = 20;
		parts.push(
			`<polyline points="${msg.x1},${msg.y} ${msg.x1 + loopW},${msg.y} ${msg.x1 + loopW},${msg.y + loopH} ${msg.x2},${msg.y + loopH}" fill="none" stroke="var(--_line)" stroke-width="${STROKE_WIDTHS.connector}"${dashArray} marker-end="url(#${markerId})" />`,
		);
		parts.push(
			`<text x="${msg.x1 + loopW + 6}" y="${msg.y + loopH / 2}" dy="${TEXT_BASELINE_SHIFT}" font-size="${FONT_SIZES.edgeLabel}" font-weight="${FONT_WEIGHTS.edgeLabel}" fill="var(--_text-muted)">${escapeXml2(msg.label)}</text>`,
		);
	} else {
		parts.push(
			`<line x1="${msg.x1}" y1="${msg.y}" x2="${msg.x2}" y2="${msg.y}" stroke="var(--_line)" stroke-width="${STROKE_WIDTHS.connector}"${dashArray} marker-end="url(#${markerId})" />`,
		);
		const midX = (msg.x1 + msg.x2) / 2;
		parts.push(
			`<text x="${midX}" y="${msg.y - 6}" text-anchor="middle" font-size="${FONT_SIZES.edgeLabel}" font-weight="${FONT_WEIGHTS.edgeLabel}" fill="var(--_text-muted)">${escapeXml2(msg.label)}</text>`,
		);
	}
	return parts.join("\n");
}
function renderBlock(block) {
	const parts = [];
	parts.push(
		`<rect x="${block.x}" y="${block.y}" width="${block.width}" height="${block.height}" rx="0" ry="0" fill="none" stroke="var(--_node-stroke)" stroke-width="${STROKE_WIDTHS.outerBox}" />`,
	);
	const labelText = `${block.type}${block.label ? ` [${block.label}]` : ""}`;
	const tabWidth =
		estimateTextWidth(
			labelText,
			FONT_SIZES.edgeLabel,
			FONT_WEIGHTS.groupHeader,
		) + 16;
	const tabHeight = 18;
	parts.push(
		`<rect x="${block.x}" y="${block.y}" width="${tabWidth}" height="${tabHeight}" fill="var(--_group-hdr)" stroke="var(--_node-stroke)" stroke-width="${STROKE_WIDTHS.outerBox}" />`,
	);
	parts.push(
		`<text x="${block.x + 6}" y="${block.y + tabHeight / 2}" dy="${TEXT_BASELINE_SHIFT}" font-size="${FONT_SIZES.edgeLabel}" font-weight="${FONT_WEIGHTS.groupHeader}" fill="var(--_text-sec)">${escapeXml2(labelText)}</text>`,
	);
	for (const divider of block.dividers) {
		parts.push(
			`<line x1="${block.x}" y1="${divider.y}" x2="${block.x + block.width}" y2="${divider.y}" stroke="var(--_line)" stroke-width="0.75" stroke-dasharray="6 4" />`,
		);
		if (divider.label) {
			parts.push(
				`<text x="${block.x + 8}" y="${divider.y + 14}" font-size="${FONT_SIZES.edgeLabel}" font-weight="${FONT_WEIGHTS.edgeLabel}" fill="var(--_text-muted)">[${escapeXml2(divider.label)}]</text>`,
			);
		}
	}
	return parts.join("\n");
}
function renderNote(note) {
	const foldSize = 6;
	return `<rect x="${note.x}" y="${note.y}" width="${note.width}" height="${note.height}" fill="var(--_group-hdr)" stroke="var(--_node-stroke)" stroke-width="${STROKE_WIDTHS.innerBox}" />
<polygon points="${note.x + note.width - foldSize},${note.y} ${note.x + note.width},${note.y + foldSize} ${note.x + note.width - foldSize},${note.y + foldSize}" fill="var(--_inner-stroke)" />
<text x="${note.x + note.width / 2}" y="${note.y + note.height / 2}" text-anchor="middle" dy="${TEXT_BASELINE_SHIFT}" font-size="${FONT_SIZES.edgeLabel}" font-weight="${FONT_WEIGHTS.edgeLabel}" fill="var(--_text-muted)">${escapeXml2(note.text)}</text>`;
}
function escapeXml2(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}
var CLS = {
	/** Padding around the diagram */
	padding: 40,
	/** Horizontal padding inside class boxes — used by both layout and renderer */
	boxPadX: 8,
	/** Header height (class name + annotation) */
	headerBaseHeight: 32,
	/** Extra height when annotation is present */
	annotationHeight: 16,
	/** Height per member row (attribute or method) */
	memberRowHeight: 20,
	/** Vertical padding around member sections (4px top + 4px bottom) */
	sectionPadY: 8,
	/** Minimum empty section height (when no attrs or no methods) */
	emptySectionHeight: 8,
	/** Minimum box width */
	minWidth: 120,
	/** Font size for member text */
	memberFontSize: 11,
	/** Spacing between class nodes */
	nodeSpacing: 40,
	/** Spacing between layers */
	layerSpacing: 60,
};
async function layoutClassDiagram(diagram, _options = {}) {
	if (diagram.classes.length === 0) {
		return { width: 0, height: 0, classes: [], relationships: [] };
	}
	const classSizes = /* @__PURE__ */ new Map();
	for (const cls of diagram.classes) {
		const headerHeight = cls.annotation
			? CLS.headerBaseHeight + CLS.annotationHeight
			: CLS.headerBaseHeight;
		const attrHeight =
			cls.attributes.length > 0
				? cls.attributes.length * CLS.memberRowHeight + CLS.sectionPadY
				: CLS.emptySectionHeight;
		const methodHeight =
			cls.methods.length > 0
				? cls.methods.length * CLS.memberRowHeight + CLS.sectionPadY
				: CLS.emptySectionHeight;
		const headerTextW = estimateTextWidth(
			cls.label,
			FONT_SIZES.nodeLabel,
			FONT_WEIGHTS.nodeLabel,
		);
		const maxAttrW = maxMemberWidth(cls.attributes);
		const maxMethodW = maxMemberWidth(cls.methods);
		const width = Math.max(
			CLS.minWidth,
			headerTextW + CLS.boxPadX * 2,
			maxAttrW + CLS.boxPadX * 2,
			maxMethodW + CLS.boxPadX * 2,
		);
		const height = headerHeight + attrHeight + methodHeight;
		classSizes.set(cls.id, {
			width,
			height,
			headerHeight,
			attrHeight,
			methodHeight,
		});
	}
	const g = new dagre.graphlib.Graph({ directed: true });
	g.setGraph({
		rankdir: "TB",
		acyclicer: "greedy",
		// break cycles before ranking to prevent infinite loop on bidirectional edges
		nodesep: CLS.nodeSpacing,
		ranksep: CLS.layerSpacing,
		marginx: CLS.padding,
		marginy: CLS.padding,
	});
	g.setDefaultEdgeLabel(() => ({}));
	for (const cls of diagram.classes) {
		const size = classSizes.get(cls.id);
		g.setNode(cls.id, { width: size.width, height: size.height });
	}
	for (let i = 0; i < diagram.relationships.length; i++) {
		const rel = diagram.relationships[i];
		const edgeLabel = { _index: i };
		if (rel.label) {
			edgeLabel.label = rel.label;
			edgeLabel.width =
				estimateTextWidth(
					rel.label,
					FONT_SIZES.edgeLabel,
					FONT_WEIGHTS.edgeLabel,
				) + 8;
			edgeLabel.height = FONT_SIZES.edgeLabel + 6;
			edgeLabel.labelpos = "c";
		}
		g.setEdge(rel.from, rel.to, edgeLabel);
	}
	try {
		dagre.layout(g);
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		throw new Error(`Dagre layout failed (class diagram): ${message}`);
	}
	const classLookup = /* @__PURE__ */ new Map();
	for (const cls of diagram.classes) classLookup.set(cls.id, cls);
	const positionedClasses = diagram.classes.map((cls) => {
		const dagreNode = g.node(cls.id);
		const size = classSizes.get(cls.id);
		const topLeft = centerToTopLeft(
			dagreNode.x,
			dagreNode.y,
			dagreNode.width,
			dagreNode.height,
		);
		return {
			id: cls.id,
			label: cls.label,
			annotation: cls.annotation,
			attributes: cls.attributes,
			methods: cls.methods,
			x: topLeft.x,
			y: topLeft.y,
			width: dagreNode.width ?? size.width,
			height: dagreNode.height ?? size.height,
			headerHeight: size.headerHeight,
			attrHeight: size.attrHeight,
			methodHeight: size.methodHeight,
		};
	});
	const relationships = g.edges().map((edgeObj) => {
		const dagreEdge = g.edge(edgeObj);
		const rel = diagram.relationships[dagreEdge._index];
		const rawPoints = dagreEdge.points ?? [];
		const orthoPoints = snapToOrthogonal(rawPoints, true);
		const srcNode = g.node(edgeObj.v);
		const tgtNode = g.node(edgeObj.w);
		const points = clipEndpointsToNodes(
			orthoPoints,
			srcNode
				? {
						cx: srcNode.x,
						cy: srcNode.y,
						hw: srcNode.width / 2,
						hh: srcNode.height / 2,
					}
				: null,
			tgtNode
				? {
						cx: tgtNode.x,
						cy: tgtNode.y,
						hw: tgtNode.width / 2,
						hh: tgtNode.height / 2,
					}
				: null,
		);
		let labelPosition;
		if (rel.label && dagreEdge.x != null && dagreEdge.y != null) {
			labelPosition = { x: dagreEdge.x, y: dagreEdge.y };
		}
		return {
			from: rel.from,
			to: rel.to,
			type: rel.type,
			markerAt: rel.markerAt,
			label: rel.label,
			fromCardinality: rel.fromCardinality,
			toCardinality: rel.toCardinality,
			points,
			labelPosition,
		};
	});
	return {
		width: g.graph().width ?? 600,
		height: g.graph().height ?? 400,
		classes: positionedClasses,
		relationships,
	};
}
function maxMemberWidth(members) {
	if (members.length === 0) return 0;
	let maxW = 0;
	for (const m of members) {
		const text = memberToString(m);
		const w = estimateMonoTextWidth(text, CLS.memberFontSize);
		if (w > maxW) maxW = w;
	}
	return maxW;
}
function memberToString(m) {
	const vis = m.visibility ? `${m.visibility} ` : "";
	const type = m.type ? `: ${m.type}` : "";
	return `${vis}${m.name}${type}`;
}

// src/class/renderer.ts
var CLS_FONT = {
	memberSize: 11,
	memberWeight: 400,
	annotationSize: 10,
	annotationWeight: 500,
};
function renderClassSvg(diagram, colors, font = "Inter", transparent = false) {
	const parts = [];
	parts.push(svgOpenTag(diagram.width, diagram.height, colors, transparent));
	parts.push(buildStyleBlock(font, true));
	parts.push("<defs>");
	parts.push(relationshipMarkerDefs());
	parts.push("</defs>");
	for (const rel of diagram.relationships) {
		parts.push(renderRelationship(rel));
	}
	for (const cls of diagram.classes) {
		parts.push(renderClassBox(cls));
	}
	for (const rel of diagram.relationships) {
		parts.push(renderRelationshipLabels(rel));
	}
	parts.push("</svg>");
	return parts.join("\n");
}
function relationshipMarkerDefs() {
	return (
		// Hollow triangle (inheritance, realization) — points at target
		`  <marker id="cls-inherit" markerWidth="12" markerHeight="10" refX="12" refY="5" orient="auto-start-reverse">
    <polygon points="0 0, 12 5, 0 10" fill="var(--bg)" stroke="var(--_arrow)" stroke-width="1.5" />
  </marker>
  <marker id="cls-composition" markerWidth="12" markerHeight="10" refX="0" refY="5" orient="auto-start-reverse">
    <polygon points="6 0, 12 5, 6 10, 0 5" fill="var(--_arrow)" stroke="var(--_arrow)" stroke-width="1" />
  </marker>
  <marker id="cls-aggregation" markerWidth="12" markerHeight="10" refX="0" refY="5" orient="auto-start-reverse">
    <polygon points="6 0, 12 5, 6 10, 0 5" fill="var(--bg)" stroke="var(--_arrow)" stroke-width="1.5" />
  </marker>
  <marker id="cls-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto-start-reverse">
    <polyline points="0 0, 8 3, 0 6" fill="none" stroke="var(--_arrow)" stroke-width="1.5" />
  </marker>`
	);
}
function renderClassBox(cls) {
	const { x, y, width, height, headerHeight, attrHeight, methodHeight } = cls;
	const parts = [];
	parts.push(
		`<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="0" ry="0" fill="var(--_node-fill)" stroke="var(--_node-stroke)" stroke-width="${STROKE_WIDTHS.outerBox}" />`,
	);
	parts.push(
		`<rect x="${x}" y="${y}" width="${width}" height="${headerHeight}" rx="0" ry="0" fill="var(--_group-hdr)" stroke="var(--_node-stroke)" stroke-width="${STROKE_WIDTHS.outerBox}" />`,
	);
	let nameY = y + headerHeight / 2;
	if (cls.annotation) {
		const annotY = y + 12;
		parts.push(
			`<text x="${x + width / 2}" y="${annotY}" text-anchor="middle" dy="${TEXT_BASELINE_SHIFT}" font-size="${CLS_FONT.annotationSize}" font-weight="${CLS_FONT.annotationWeight}" font-style="italic" fill="var(--_text-muted)">&lt;&lt;${escapeXml3(cls.annotation)}&gt;&gt;</text>`,
		);
		nameY = y + headerHeight / 2 + 6;
	}
	parts.push(
		`<text x="${x + width / 2}" y="${nameY}" text-anchor="middle" dy="${TEXT_BASELINE_SHIFT}" font-size="${FONT_SIZES.nodeLabel}" font-weight="700" fill="var(--_text)">${escapeXml3(cls.label)}</text>`,
	);
	const attrTop = y + headerHeight;
	parts.push(
		`<line x1="${x}" y1="${attrTop}" x2="${x + width}" y2="${attrTop}" stroke="var(--_node-stroke)" stroke-width="${STROKE_WIDTHS.innerBox}" />`,
	);
	const memberRowH = 20;
	for (let i = 0; i < cls.attributes.length; i++) {
		const member = cls.attributes[i];
		const memberY = attrTop + 4 + i * memberRowH + memberRowH / 2;
		parts.push(renderMember(member, x + CLS.boxPadX, memberY));
	}
	const methodTop = attrTop + attrHeight;
	parts.push(
		`<line x1="${x}" y1="${methodTop}" x2="${x + width}" y2="${methodTop}" stroke="var(--_node-stroke)" stroke-width="${STROKE_WIDTHS.innerBox}" />`,
	);
	for (let i = 0; i < cls.methods.length; i++) {
		const member = cls.methods[i];
		const memberY = methodTop + 4 + i * memberRowH + memberRowH / 2;
		parts.push(renderMember(member, x + CLS.boxPadX, memberY));
	}
	return parts.join("\n");
}
function renderMember(member, x, y) {
	const fontStyle = member.isAbstract ? ' font-style="italic"' : "";
	const decoration = member.isStatic ? ' text-decoration="underline"' : "";
	const spans = [];
	if (member.visibility) {
		spans.push(
			`<tspan fill="var(--_text-faint)">${escapeXml3(member.visibility)} </tspan>`,
		);
	}
	spans.push(
		`<tspan fill="var(--_text-sec)">${escapeXml3(member.name)}</tspan>`,
	);
	if (member.type) {
		spans.push(`<tspan fill="var(--_text-faint)">: </tspan>`);
		spans.push(
			`<tspan fill="var(--_text-muted)">${escapeXml3(member.type)}</tspan>`,
		);
	}
	return `<text x="${x}" y="${y}" class="mono" dy="${TEXT_BASELINE_SHIFT}" font-size="${CLS_FONT.memberSize}" font-weight="${CLS_FONT.memberWeight}"${fontStyle}${decoration}>${spans.join("")}</text>`;
}
function renderRelationship(rel) {
	if (rel.points.length < 2) return "";
	const pathData = rel.points.map((p) => `${p.x},${p.y}`).join(" ");
	const isDashed = rel.type === "dependency" || rel.type === "realization";
	const dashArray = isDashed ? ' stroke-dasharray="6 4"' : "";
	const markers = getRelationshipMarkers(rel.type, rel.markerAt);
	return `<polyline points="${pathData}" fill="none" stroke="var(--_line)" stroke-width="${STROKE_WIDTHS.connector}"${dashArray}${markers} />`;
}
function getRelationshipMarkers(type, markerAt) {
	const markerId = getMarkerDefId(type);
	if (!markerId) return "";
	if (markerAt === "from") {
		return ` marker-start="url(#${markerId})"`;
	} else {
		return ` marker-end="url(#${markerId})"`;
	}
}
function getMarkerDefId(type) {
	switch (type) {
		case "inheritance":
		case "realization":
			return "cls-inherit";
		case "composition":
			return "cls-composition";
		case "aggregation":
			return "cls-aggregation";
		case "association":
		case "dependency":
			return "cls-arrow";
		default:
			return null;
	}
}
function renderRelationshipLabels(rel) {
	if (!rel.label && !rel.fromCardinality && !rel.toCardinality) return "";
	if (rel.points.length < 2) return "";
	const parts = [];
	if (rel.label) {
		const pos = rel.labelPosition ?? midpoint(rel.points);
		parts.push(
			`<text x="${pos.x}" y="${pos.y - 8}" text-anchor="middle" font-size="${FONT_SIZES.edgeLabel}" font-weight="${FONT_WEIGHTS.edgeLabel}" fill="var(--_text-muted)">${escapeXml3(rel.label)}</text>`,
		);
	}
	if (rel.fromCardinality) {
		const p = rel.points[0];
		const next = rel.points[1];
		const offset = cardinalityOffset(p, next);
		parts.push(
			`<text x="${p.x + offset.x}" y="${p.y + offset.y}" text-anchor="middle" font-size="${FONT_SIZES.edgeLabel}" font-weight="${FONT_WEIGHTS.edgeLabel}" fill="var(--_text-muted)">${escapeXml3(rel.fromCardinality)}</text>`,
		);
	}
	if (rel.toCardinality) {
		const p = rel.points[rel.points.length - 1];
		const prev = rel.points[rel.points.length - 2];
		const offset = cardinalityOffset(p, prev);
		parts.push(
			`<text x="${p.x + offset.x}" y="${p.y + offset.y}" text-anchor="middle" font-size="${FONT_SIZES.edgeLabel}" font-weight="${FONT_WEIGHTS.edgeLabel}" fill="var(--_text-muted)">${escapeXml3(rel.toCardinality)}</text>`,
		);
	}
	return parts.join("\n");
}
function midpoint(points) {
	if (points.length === 0) return { x: 0, y: 0 };
	const mid = Math.floor(points.length / 2);
	return points[mid];
}
function cardinalityOffset(from, to) {
	const dx = to.x - from.x;
	const dy = to.y - from.y;
	if (Math.abs(dx) > Math.abs(dy)) {
		return { x: dx > 0 ? 14 : -14, y: -10 };
	}
	return { x: -14, y: dy > 0 ? 14 : -14 };
}
function escapeXml3(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}
var ER = {
	padding: 40,
	boxPadX: 12,
	headerHeight: 32,
	rowHeight: 22,
	minWidth: 140,
	attrFontSize: 11,
	nodeSpacing: 50,
	layerSpacing: 70,
};
async function layoutErDiagram(diagram, _options = {}) {
	if (diagram.entities.length === 0) {
		return { width: 0, height: 0, entities: [], relationships: [] };
	}
	const entitySizes = /* @__PURE__ */ new Map();
	for (const entity of diagram.entities) {
		const headerTextW = estimateTextWidth(
			entity.label,
			FONT_SIZES.nodeLabel,
			FONT_WEIGHTS.nodeLabel,
		);
		let maxAttrW = 0;
		for (const attr of entity.attributes) {
			const attrText = `${attr.type}  ${attr.name}${attr.keys.length > 0 ? "  " + attr.keys.join(",") : ""}`;
			const w = estimateMonoTextWidth(attrText, ER.attrFontSize);
			if (w > maxAttrW) maxAttrW = w;
		}
		const width = Math.max(
			ER.minWidth,
			headerTextW + ER.boxPadX * 2,
			maxAttrW + ER.boxPadX * 2,
		);
		const height =
			ER.headerHeight + Math.max(entity.attributes.length, 1) * ER.rowHeight;
		entitySizes.set(entity.id, { width, height });
	}
	const g = new dagre.graphlib.Graph({ directed: true });
	g.setGraph({
		rankdir: "LR",
		acyclicer: "greedy",
		// break cycles before ranking to prevent infinite loop on bidirectional edges
		nodesep: ER.nodeSpacing,
		ranksep: ER.layerSpacing,
		marginx: ER.padding,
		marginy: ER.padding,
	});
	g.setDefaultEdgeLabel(() => ({}));
	for (const entity of diagram.entities) {
		const size = entitySizes.get(entity.id);
		g.setNode(entity.id, { width: size.width, height: size.height });
	}
	for (let i = 0; i < diagram.relationships.length; i++) {
		const rel = diagram.relationships[i];
		g.setEdge(rel.entity1, rel.entity2, {
			_index: i,
			label: rel.label,
			width:
				estimateTextWidth(
					rel.label,
					FONT_SIZES.edgeLabel,
					FONT_WEIGHTS.edgeLabel,
				) + 8,
			height: FONT_SIZES.edgeLabel + 6,
			labelpos: "c",
		});
	}
	try {
		dagre.layout(g);
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		throw new Error(`Dagre layout failed (ER diagram): ${message}`);
	}
	const entityLookup = /* @__PURE__ */ new Map();
	for (const entity of diagram.entities) entityLookup.set(entity.id, entity);
	const positionedEntities = diagram.entities.map((entity) => {
		const dagreNode = g.node(entity.id);
		const topLeft = centerToTopLeft(
			dagreNode.x,
			dagreNode.y,
			dagreNode.width,
			dagreNode.height,
		);
		return {
			id: entity.id,
			label: entity.label,
			attributes: entity.attributes,
			x: topLeft.x,
			y: topLeft.y,
			width: dagreNode.width ?? entitySizes.get(entity.id).width,
			height: dagreNode.height ?? entitySizes.get(entity.id).height,
			headerHeight: ER.headerHeight,
			rowHeight: ER.rowHeight,
		};
	});
	const relationships = g.edges().map((edgeObj) => {
		const dagreEdge = g.edge(edgeObj);
		const rel = diagram.relationships[dagreEdge._index];
		const rawPoints = dagreEdge.points ?? [];
		const orthoPoints = snapToOrthogonal(rawPoints, false);
		const srcNode = g.node(edgeObj.v);
		const tgtNode = g.node(edgeObj.w);
		const points = clipEndpointsToNodes(
			orthoPoints,
			srcNode
				? {
						cx: srcNode.x,
						cy: srcNode.y,
						hw: srcNode.width / 2,
						hh: srcNode.height / 2,
					}
				: null,
			tgtNode
				? {
						cx: tgtNode.x,
						cy: tgtNode.y,
						hw: tgtNode.width / 2,
						hh: tgtNode.height / 2,
					}
				: null,
		);
		return {
			entity1: rel.entity1,
			entity2: rel.entity2,
			cardinality1: rel.cardinality1,
			cardinality2: rel.cardinality2,
			label: rel.label,
			identifying: rel.identifying,
			points,
		};
	});
	return {
		width: g.graph().width ?? 600,
		height: g.graph().height ?? 400,
		entities: positionedEntities,
		relationships,
	};
}

// src/er/renderer.ts
var ER_FONT = {
	attrSize: 11,
	attrWeight: 400,
	keySize: 9,
	keyWeight: 600,
};
function renderErSvg(diagram, colors, font = "Inter", transparent = false) {
	const parts = [];
	parts.push(svgOpenTag(diagram.width, diagram.height, colors, transparent));
	parts.push(buildStyleBlock(font, true));
	parts.push("<defs>");
	parts.push("</defs>");
	for (const rel of diagram.relationships) {
		parts.push(renderRelationshipLine(rel));
	}
	for (const entity of diagram.entities) {
		parts.push(renderEntityBox(entity));
	}
	for (const rel of diagram.relationships) {
		parts.push(renderCardinality(rel));
	}
	for (const rel of diagram.relationships) {
		parts.push(renderRelationshipLabel(rel));
	}
	parts.push("</svg>");
	return parts.join("\n");
}
function renderEntityBox(entity) {
	const { x, y, width, height, headerHeight, rowHeight, label, attributes } =
		entity;
	const parts = [];
	parts.push(
		`<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="0" ry="0" fill="var(--_node-fill)" stroke="var(--_node-stroke)" stroke-width="${STROKE_WIDTHS.outerBox}" />`,
	);
	parts.push(
		`<rect x="${x}" y="${y}" width="${width}" height="${headerHeight}" rx="0" ry="0" fill="var(--_group-hdr)" stroke="var(--_node-stroke)" stroke-width="${STROKE_WIDTHS.outerBox}" />`,
	);
	parts.push(
		`<text x="${x + width / 2}" y="${y + headerHeight / 2}" text-anchor="middle" dy="${TEXT_BASELINE_SHIFT}" font-size="${FONT_SIZES.nodeLabel}" font-weight="700" fill="var(--_text)">${escapeXml4(label)}</text>`,
	);
	const attrTop = y + headerHeight;
	parts.push(
		`<line x1="${x}" y1="${attrTop}" x2="${x + width}" y2="${attrTop}" stroke="var(--_node-stroke)" stroke-width="${STROKE_WIDTHS.innerBox}" />`,
	);
	for (let i = 0; i < attributes.length; i++) {
		const attr = attributes[i];
		const rowY = attrTop + i * rowHeight + rowHeight / 2;
		parts.push(renderAttribute(attr, x, rowY, width));
	}
	if (attributes.length === 0) {
		parts.push(
			`<text x="${x + width / 2}" y="${attrTop + rowHeight / 2}" text-anchor="middle" dy="${TEXT_BASELINE_SHIFT}" font-size="${ER_FONT.attrSize}" fill="var(--_text-faint)" font-style="italic">(no attributes)</text>`,
		);
	}
	return parts.join("\n");
}
function renderAttribute(attr, boxX, y, boxWidth) {
	const parts = [];
	let keyWidth = 0;
	if (attr.keys.length > 0) {
		const keyText = attr.keys.join(",");
		keyWidth =
			estimateTextWidth(keyText, ER_FONT.keySize, ER_FONT.keyWeight) + 8;
		parts.push(
			`<rect x="${boxX + 6}" y="${y - 7}" width="${keyWidth}" height="14" rx="2" ry="2" fill="var(--_key-badge)" />`,
		);
		parts.push(
			`<text x="${boxX + 6 + keyWidth / 2}" y="${y}" text-anchor="middle" dy="${TEXT_BASELINE_SHIFT}" font-size="${ER_FONT.keySize}" font-weight="${ER_FONT.keyWeight}" fill="var(--_text-sec)">${attr.keys.join(",")}</text>`,
		);
	}
	const typeX = boxX + 8 + (keyWidth > 0 ? keyWidth + 6 : 0);
	parts.push(
		`<text x="${typeX}" y="${y}" class="mono" dy="${TEXT_BASELINE_SHIFT}" font-size="${ER_FONT.attrSize}" font-weight="${ER_FONT.attrWeight}"><tspan fill="var(--_text-muted)">${escapeXml4(attr.type)}</tspan></text>`,
	);
	const nameX = boxX + boxWidth - 8;
	parts.push(
		`<text x="${nameX}" y="${y}" class="mono" text-anchor="end" dy="${TEXT_BASELINE_SHIFT}" font-size="${ER_FONT.attrSize}" font-weight="${ER_FONT.attrWeight}"><tspan fill="var(--_text-sec)">${escapeXml4(attr.name)}</tspan></text>`,
	);
	return parts.join("\n");
}
function renderRelationshipLine(rel) {
	if (rel.points.length < 2) return "";
	const pathData = rel.points.map((p) => `${p.x},${p.y}`).join(" ");
	const dashArray = !rel.identifying ? ' stroke-dasharray="6 4"' : "";
	return `<polyline points="${pathData}" fill="none" stroke="var(--_line)" stroke-width="${STROKE_WIDTHS.connector}"${dashArray} />`;
}
function renderRelationshipLabel(rel) {
	if (!rel.label || rel.points.length < 2) return "";
	const mid = midpoint2(rel.points);
	const textWidth = estimateTextWidth(
		rel.label,
		FONT_SIZES.edgeLabel,
		FONT_WEIGHTS.edgeLabel,
	);
	const bgW = textWidth + 8;
	const bgH = FONT_SIZES.edgeLabel + 6;
	return `<rect x="${mid.x - bgW / 2}" y="${mid.y - bgH / 2}" width="${bgW}" height="${bgH}" rx="2" ry="2" fill="var(--bg)" stroke="var(--_inner-stroke)" stroke-width="0.5" />
<text x="${mid.x}" y="${mid.y}" text-anchor="middle" dy="${TEXT_BASELINE_SHIFT}" font-size="${FONT_SIZES.edgeLabel}" font-weight="${FONT_WEIGHTS.edgeLabel}" fill="var(--_text-muted)">${escapeXml4(rel.label)}</text>`;
}
function renderCardinality(rel) {
	if (rel.points.length < 2) return "";
	const parts = [];
	const p1 = rel.points[0];
	const p2 = rel.points[1];
	parts.push(renderCrowsFoot(p1, p2, rel.cardinality1));
	const pN = rel.points[rel.points.length - 1];
	const pN1 = rel.points[rel.points.length - 2];
	parts.push(renderCrowsFoot(pN, pN1, rel.cardinality2));
	return parts.join("\n");
}
function renderCrowsFoot(point, toward, cardinality) {
	const parts = [];
	const sw = STROKE_WIDTHS.connector + 0.25;
	const dx = point.x - toward.x;
	const dy = point.y - toward.y;
	const len = Math.sqrt(dx * dx + dy * dy);
	if (len === 0) return "";
	const ux = dx / len;
	const uy = dy / len;
	const px = -uy;
	const py = ux;
	const tipX = point.x - ux * 4;
	const tipY = point.y - uy * 4;
	const backX = point.x - ux * 16;
	const backY = point.y - uy * 16;
	const hasOneLine = cardinality === "one" || cardinality === "zero-one";
	const hasCrowsFoot = cardinality === "many" || cardinality === "zero-many";
	const hasCircle = cardinality === "zero-one" || cardinality === "zero-many";
	if (hasOneLine) {
		const halfW = 6;
		parts.push(
			`<line x1="${tipX + px * halfW}" y1="${tipY + py * halfW}" x2="${tipX - px * halfW}" y2="${tipY - py * halfW}" stroke="var(--_line)" stroke-width="${sw}" />`,
		);
		const line2X = tipX - ux * 4;
		const line2Y = tipY - uy * 4;
		parts.push(
			`<line x1="${line2X + px * halfW}" y1="${line2Y + py * halfW}" x2="${line2X - px * halfW}" y2="${line2Y - py * halfW}" stroke="var(--_line)" stroke-width="${sw}" />`,
		);
	}
	if (hasCrowsFoot) {
		const fanW = 7;
		const cfTipX = tipX;
		const cfTipY = tipY;
		parts.push(
			// Top fan line
			`<line x1="${cfTipX + px * fanW}" y1="${cfTipY + py * fanW}" x2="${backX}" y2="${backY}" stroke="var(--_line)" stroke-width="${sw}" />`,
		);
		parts.push(
			// Center line
			`<line x1="${cfTipX}" y1="${cfTipY}" x2="${backX}" y2="${backY}" stroke="var(--_line)" stroke-width="${sw}" />`,
		);
		parts.push(
			// Bottom fan line
			`<line x1="${cfTipX - px * fanW}" y1="${cfTipY - py * fanW}" x2="${backX}" y2="${backY}" stroke="var(--_line)" stroke-width="${sw}" />`,
		);
	}
	if (hasCircle) {
		const circleOffset = hasCrowsFoot ? 20 : 12;
		const circleX = point.x - ux * circleOffset;
		const circleY = point.y - uy * circleOffset;
		parts.push(
			`<circle cx="${circleX}" cy="${circleY}" r="4" fill="var(--bg)" stroke="var(--_line)" stroke-width="${sw}" />`,
		);
	}
	return parts.join("\n");
}
function midpoint2(points) {
	if (points.length === 0) return { x: 0, y: 0 };
	if (points.length === 1) return points[0];
	let totalLen = 0;
	for (let i = 1; i < points.length; i++) {
		const dx = points[i].x - points[i - 1].x;
		const dy = points[i].y - points[i - 1].y;
		totalLen += Math.sqrt(dx * dx + dy * dy);
	}
	if (totalLen === 0) return points[0];
	const halfLen = totalLen / 2;
	let walked = 0;
	for (let i = 1; i < points.length; i++) {
		const dx = points[i].x - points[i - 1].x;
		const dy = points[i].y - points[i - 1].y;
		const segLen = Math.sqrt(dx * dx + dy * dy);
		if (walked + segLen >= halfLen) {
			const t = segLen > 0 ? (halfLen - walked) / segLen : 0;
			return {
				x: points[i - 1].x + dx * t,
				y: points[i - 1].y + dy * t,
			};
		}
		walked += segLen;
	}
	return points[points.length - 1];
}
function escapeXml4(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

// src/index.ts
function detectDiagramType2(text) {
	const firstLine = text.trim().split("\n")[0]?.trim().toLowerCase() ?? "";
	if (/^sequencediagram\s*$/.test(firstLine)) return "sequence";
	if (/^classdiagram\s*$/.test(firstLine)) return "class";
	if (/^erdiagram\s*$/.test(firstLine)) return "er";
	return "flowchart";
}
function buildColors(options) {
	return {
		bg: options.bg ?? DEFAULTS.bg,
		fg: options.fg ?? DEFAULTS.fg,
		line: options.line,
		accent: options.accent,
		muted: options.muted,
		surface: options.surface,
		border: options.border,
	};
}
async function renderMermaid(text, options = {}) {
	const colors = buildColors(options);
	const font = options.font ?? "Inter";
	const transparent = options.transparent ?? false;
	const diagramType = detectDiagramType2(text);
	const lines = text
		.split("\n")
		.map((l) => l.trim())
		.filter((l) => l.length > 0 && !l.startsWith("%%"));
	switch (diagramType) {
		case "sequence": {
			const diagram = parseSequenceDiagram(lines);
			const positioned = layoutSequenceDiagram(diagram, options);
			return renderSequenceSvg(positioned, colors, font, transparent);
		}
		case "class": {
			const diagram = parseClassDiagram(lines);
			const positioned = await layoutClassDiagram(diagram, options);
			return renderClassSvg(positioned, colors, font, transparent);
		}
		case "er": {
			const diagram = parseErDiagram(lines);
			const positioned = await layoutErDiagram(diagram, options);
			return renderErSvg(positioned, colors, font, transparent);
		}
		case "flowchart":
		default: {
			const graph = parseMermaid(text);
			const positioned = await layoutGraph(graph, options);
			return renderSvg(positioned, colors, font, transparent);
		}
	}
}

export {
	DEFAULTS,
	THEMES,
	fromShikiTheme,
	parseMermaid,
	renderMermaid,
	renderMermaidAscii,
};
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
