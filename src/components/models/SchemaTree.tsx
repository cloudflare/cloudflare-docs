import { useState, useEffect, useCallback, useMemo } from "react";
import type { SchemaRowData } from "./types";

/**
 * SchemaTree - Interactive flex-based view for schema parameters
 *
 * Features:
 * - Flex layout (not table) for better spacing
 * - Collapsible nested objects/arrays with lazy rendering
 * - Search filter with auto-expand and highlight
 * - Essential params first (for Input), Advanced collapsed
 * - sessionStorage persistence for collapse state
 */

interface SchemaTreeProps {
	rows: SchemaRowData[];
	schemaId: string;
}

interface SchemaNodeProps {
	row: SchemaRowData;
	schemaId: string;
	searchTerm: string;
	forceExpand: boolean;
	expandedNodes: Set<string>;
	onToggle: (id: string) => void;
}

// Highlight matching text in search
function highlightMatch(text: string, searchTerm: string): React.ReactNode {
	if (!searchTerm || !text) return text;

	const lowerText = text.toLowerCase();
	const lowerSearch = searchTerm.toLowerCase();
	const index = lowerText.indexOf(lowerSearch);

	if (index === -1) return text;

	return (
		<>
			{text.slice(0, index)}
			<mark className="rounded bg-amber-200 px-0.5 dark:bg-amber-700">
				{text.slice(index, index + searchTerm.length)}
			</mark>
			{text.slice(index + searchTerm.length)}
		</>
	);
}

// Check if a row or its children match the search
function matchesSearch(row: SchemaRowData, searchTerm: string): boolean {
	if (!searchTerm) return true;

	const lower = searchTerm.toLowerCase();
	if (row.name.toLowerCase().includes(lower)) return true;
	if (row.description?.toLowerCase().includes(lower)) return true;
	if (row.type.toLowerCase().includes(lower)) return true;

	if (row.children) {
		return row.children.some((child) => matchesSearch(child, searchTerm));
	}

	return false;
}

// Get all node IDs that should be expanded due to search match in children
function getExpandedForSearch(
	rows: SchemaRowData[],
	searchTerm: string,
): Set<string> {
	const expanded = new Set<string>();

	function traverse(row: SchemaRowData, ancestors: string[]) {
		const lower = searchTerm.toLowerCase();
		const directMatch =
			row.name.toLowerCase().includes(lower) ||
			row.description?.toLowerCase().includes(lower);

		if (row.children) {
			for (const child of row.children) {
				traverse(child, [...ancestors, row.id]);
			}
		}

		if (directMatch || (row.children && matchesSearch(row, searchTerm))) {
			ancestors.forEach((id) => expanded.add(id));
			if (row.children) expanded.add(row.id);
		}
	}

	rows.forEach((row) => traverse(row, []));
	return expanded;
}

// OR divider component for oneOf children
function OrDivider({ depth }: { depth: number }) {
	const indentPx = depth * 24;
	return (
		<div
			className="flex items-center gap-2 py-0 text-xs text-gray-400 dark:text-gray-500"
			style={{ paddingLeft: indentPx + 16 }}
		>
			<span className="h-px flex-1 border-t border-dashed border-gray-200 dark:border-gray-800" />
			<span className="font-medium tracking-wider uppercase">or</span>
			<span className="h-px flex-1 border-t border-dashed border-gray-200 dark:border-gray-800" />
		</div>
	);
}

// Individual schema node component
function SchemaNode({
	row,
	schemaId,
	searchTerm,
	forceExpand,
	expandedNodes,
	onToggle,
}: SchemaNodeProps) {
	const hasChildren = row.children && row.children.length > 0;
	const isExpanded = forceExpand || expandedNodes.has(row.id);
	const [hasRenderedChildren, setHasRenderedChildren] = useState(false);

	useEffect(() => {
		if (isExpanded && !hasRenderedChildren) {
			setHasRenderedChildren(true);
		}
	}, [isExpanded, hasRenderedChildren]);

	const handleToggle = () => {
		onToggle(row.id);
	};

	const indentPx = 16 + row.depth * 24; // 16px base padding + depth indent

	// For oneOf children, use different styling
	// Skip OR divider for top-level oneOf (depth 0) - those use the variant selector instead
	if (row.isOneOfChild) {
		// Only show outer border when: last oneOf child AND (no children OR not expanded)
		const showOneOfBorder =
			row.isLastOneOfChild && (!hasChildren || !isExpanded);
		return (
			<>
				{/* Show OR divider before non-first options, but not at top level */}
				{!row.isFirstOneOfChild && row.depth > 0 && (
					<OrDivider depth={row.depth} />
				)}

				{/* Hide bottom border if OR divider will follow, or if expanded (children provide border) */}
				<div
					className={
						showOneOfBorder
							? "border-b border-gray-100 dark:border-gray-800"
							: ""
					}
				>
					<div
						className={`py-3 ${hasChildren ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50" : ""} ${hasChildren && isExpanded ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
						style={{ paddingLeft: indentPx }}
						onClick={hasChildren ? handleToggle : undefined}
						role={hasChildren ? "button" : undefined}
						aria-expanded={hasChildren ? isExpanded : undefined}
					>
						{/* Line 1: Name (non-mono for oneOf options) */}
						<div className="flex items-center gap-1 text-sm">
							<span className="w-4 flex-shrink-0 text-center">
								{hasChildren && (
									<span
										className={`inline-block text-xs text-gray-400 transition-transform ${
											isExpanded ? "rotate-90" : ""
										}`}
									>
										▶
									</span>
								)}
							</span>
							<span className="font-medium text-gray-900 dark:text-gray-100">
								{highlightMatch(row.name, searchTerm)}
							</span>
							{row.isArray && (
								<span className="font-mono text-gray-400 dark:text-gray-500">
									[]
								</span>
							)}
							{row.isObject && !row.isOneOf && (
								<span className="font-mono text-gray-400 dark:text-gray-500">
									{"{}"}
								</span>
							)}
						</div>

						{/* Line 2: Type + metadata */}
						<div className="mt-0.5 flex flex-wrap items-center gap-2 pl-5 text-xs text-gray-500 dark:text-gray-400">
							<span>{row.type}</span>
							{row.metadata &&
								Object.entries(row.metadata).map(([key, value]) => (
									<span key={key}>
										<span className="font-medium">{key}:</span> {String(value)}
									</span>
								))}
							{row.enumValues && row.enumValues.length > 0 && (
								<span>
									<span className="font-medium">enum:</span>{" "}
									{row.enumValues.join(", ")}
								</span>
							)}
						</div>

						{/* Line 3: Description if present */}
						{row.description && (
							<div className="mt-1 pl-5 text-sm text-gray-600 dark:text-gray-300">
								{highlightMatch(row.description, searchTerm)}
							</div>
						)}
					</div>

					{/* Children */}
					{hasChildren && hasRenderedChildren && isExpanded && (
						<div>
							{row.children!.map((child) => (
								<SchemaNode
									key={child.id}
									row={child}
									schemaId={schemaId}
									searchTerm={searchTerm}
									forceExpand={forceExpand}
									expandedNodes={expandedNodes}
									onToggle={onToggle}
								/>
							))}
						</div>
					)}
				</div>
			</>
		);
	}

	// Regular node styling
	// Only show outer border when collapsed or no children - expanded children provide their own closing border
	const showOuterBorder = !hasChildren || !isExpanded;
	return (
		<div
			className={
				showOuterBorder ? "border-b border-gray-100 dark:border-gray-800" : ""
			}
		>
			{/* Clickable row */}
			<div
				className={`py-3 ${hasChildren ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50" : ""} ${hasChildren && isExpanded ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
				style={{ paddingLeft: indentPx }}
				onClick={hasChildren ? handleToggle : undefined}
				role={hasChildren ? "button" : undefined}
				aria-expanded={hasChildren ? isExpanded : undefined}
			>
				{/* Line 1: Name with expand arrow and type indicators */}
				<div className="flex items-center gap-1 font-mono text-sm">
					<span className="w-4 flex-shrink-0 text-center">
						{hasChildren && (
							<span
								className={`inline-block text-xs text-gray-400 transition-transform ${
									isExpanded ? "rotate-90" : ""
								}`}
							>
								▶
							</span>
						)}
					</span>
					<span className="font-medium text-gray-900 dark:text-gray-100">
						{highlightMatch(row.name, searchTerm)}
					</span>
					{row.isArray && (
						<span className="text-gray-400 dark:text-gray-500">[]</span>
					)}
					{row.isObject && !row.isOneOf && (
						<span className="text-gray-400 dark:text-gray-500">{"{}"}</span>
					)}
				</div>

				{/* Line 2: Metadata and description */}
				<div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 pl-5 text-sm">
					{/* Type and badges */}
					<span className="flex flex-wrap items-center gap-3">
						<code className="text-xs text-gray-500 dark:text-gray-400">
							{row.type}
						</code>
						{row.required && (
							<span className="rounded border border-amber-200 bg-amber-100 px-1 py-0.5 text-xs leading-none text-amber-800 dark:border-amber-700 dark:bg-amber-900 dark:text-amber-200">
								required
							</span>
						)}
						{row.defaultValue !== undefined && (
							<span className="text-xs text-gray-400">
								<span className="font-medium">default:</span> {row.defaultValue}
							</span>
						)}
						{/* Render all metadata */}
						{row.metadata &&
							Object.entries(row.metadata).map(([key, value]) => (
								<span key={key} className="text-xs text-gray-400">
									<span className="font-medium">{key}:</span> {String(value)}
								</span>
							))}
						{/* Enum values */}
						{row.enumValues && row.enumValues.length > 0 && (
							<span className="text-xs text-gray-400">
								<span className="font-medium">enum:</span>{" "}
								{row.enumValues.join(", ")}
							</span>
						)}
					</span>

					{/* Description */}
					{row.description && (
						<span className="text-gray-600 dark:text-gray-300">
							{highlightMatch(row.description, searchTerm)}
						</span>
					)}
				</div>
			</div>

			{/* Children */}
			{hasChildren && hasRenderedChildren && isExpanded && (
				<div>
					{row.children!.map((child) => (
						<SchemaNode
							key={child.id}
							row={child}
							schemaId={schemaId}
							searchTerm={searchTerm}
							forceExpand={forceExpand}
							expandedNodes={expandedNodes}
							onToggle={onToggle}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default function SchemaTree({ rows, schemaId }: SchemaTreeProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

	useEffect(() => {
		try {
			const saved = sessionStorage.getItem(`schema-expanded-${schemaId}`);
			if (saved) {
				setExpandedNodes(new Set(JSON.parse(saved)));
			}
		} catch {
			// Ignore errors
		}
	}, [schemaId]);

	const saveExpandedState = useCallback(
		(nodes: Set<string>) => {
			try {
				sessionStorage.setItem(
					`schema-expanded-${schemaId}`,
					JSON.stringify([...nodes]),
				);
			} catch {
				// Ignore errors
			}
		},
		[schemaId],
	);

	const handleToggle = useCallback(
		(id: string) => {
			setExpandedNodes((prev) => {
				const next = new Set(prev);
				if (next.has(id)) {
					next.delete(id);
				} else {
					next.add(id);
				}
				saveExpandedState(next);
				return next;
			});
		},
		[saveExpandedState],
	);

	const searchExpandedNodes = useMemo(() => {
		if (!searchTerm) return new Set<string>();
		return getExpandedForSearch(rows, searchTerm);
	}, [rows, searchTerm]);

	const filteredRows = useMemo(() => {
		if (!searchTerm) return rows;
		return rows.filter((row) => matchesSearch(row, searchTerm));
	}, [rows, searchTerm]);

	const mergedExpandedNodes = useMemo(() => {
		return new Set([...expandedNodes, ...searchExpandedNodes]);
	}, [expandedNodes, searchExpandedNodes]);

	return (
		<div className="schema-tree">
			{/* Search filter */}
			<div className="mb-4">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Filter parameters..."
					className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-blue-400"
				/>
			</div>

			{filteredRows.length === 0 ? (
				<p className="py-4 text-sm text-gray-500 dark:text-gray-400">
					No parameters match your search.
				</p>
			) : (
				<div className="max-h-[500px] overflow-y-scroll rounded-md border border-gray-200 dark:border-gray-700">
					<div className="not-content divide-y divide-gray-100 dark:divide-gray-800">
						{filteredRows.map((row) => (
							<SchemaNode
								key={row.id}
								row={row}
								schemaId={schemaId}
								searchTerm={searchTerm}
								forceExpand={searchTerm.length > 0}
								expandedNodes={mergedExpandedNodes}
								onToggle={handleToggle}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
