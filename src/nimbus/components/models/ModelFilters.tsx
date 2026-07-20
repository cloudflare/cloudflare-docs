/**
 * ModelFilters — the model catalog toolbar as a React island.
 *
 * Replaces the vanilla `<details>` dropdowns (models.client.ts) with base-ui
 * Combobox multi-selects + a Select sort control, matching production's
 * `ModelCatalog.tsx` interaction model but restyled to Nimbus design tokens
 * (border / card / foreground / primary / accent) so light + dark mode track
 * the rest of the site.
 *
 * The cards stay server-rendered by ModelCatalog.astro (SEO-friendly + keeps
 * the Directory corner-mark grid). This island is the *controller*: it owns
 * search / facet / sort state, reflects it to the URL, and re-flows the sibling
 * `[data-models-grid]` — filter → pinned-first sort → recompute corner marks —
 * reusing the shared grid geometry (grid.ts), exactly as the old vanilla
 * controller did.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Combobox } from "@base-ui/react/combobox";
import { Select } from "@base-ui/react/select";
import { setSearchParams } from "~/util/url";
import {
	LG_GRID_CLASS,
	resolveCols,
	cornersFor,
	cellClass,
	cornerSpansHTML,
} from "~/components/directory/grid";

interface FilterItem {
	value: string;
	label: string;
}

interface FacetGroup {
	key: string;
	label: string;
	options: { value: string; label: string; match: string }[];
}

type SortOrder = "newest" | "oldest";

const sortOptions: { value: SortOrder; label: string }[] = [
	{ value: "newest", label: "Newest first" },
	{ value: "oldest", label: "Oldest first" },
];

// `data-facet-tasks` on a cell → `cell.dataset.facetTasks`.
const datasetKey = (key: string): string =>
	`facet${key.charAt(0).toUpperCase()}${key.slice(1)}`;

function ChevronUpDownIcon() {
	return (
		<svg
			width="8"
			height="12"
			viewBox="0 0 8 12"
			fill="none"
			stroke="currentcolor"
			strokeWidth="1.5"
			className="text-muted-foreground"
		>
			<path d="M0.5 4.5L4 1.5L7.5 4.5" />
			<path d="M0.5 7.5L4 10.5L7.5 7.5" />
		</svg>
	);
}

function CheckIcon() {
	return (
		<svg fill="currentcolor" width="10" height="10" viewBox="0 0 10 10">
			<path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
		</svg>
	);
}

function FilterDropdown({
	label,
	items,
	selected,
	onChange,
}: {
	label: string;
	items: FilterItem[];
	selected: string[];
	onChange: (selected: string[]) => void;
}) {
	const hasSelection = selected.length > 0;
	const triggerContent = (
		<span className="inline-flex items-center gap-1.5">
			{label}
			{hasSelection && (
				<span className="bg-primary text-primary-foreground grid min-w-[1.25rem] place-items-center rounded-full px-1.5 text-[0.6875rem] font-semibold">
					{selected.length}
				</span>
			)}
		</span>
	);

	const selectedItems = items.filter((item) => selected.includes(item.value));

	return (
		<Combobox.Root
			multiple
			value={selectedItems}
			onValueChange={(value) =>
				onChange((value as FilterItem[]).map((item) => item.value))
			}
			items={items}
			isItemEqualToValue={(a, b) => a.value === b.value}
		>
			<Combobox.Trigger
				className={`bg-card flex h-10 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-sm whitespace-nowrap transition-colors select-none ${
					hasSelection
						? "border-primary text-primary"
						: "border-border text-foreground hover:border-border-strong"
				}`}
			>
				<Combobox.Value placeholder={triggerContent}>
					{() => triggerContent}
				</Combobox.Value>
				<Combobox.Icon className="flex">
					<ChevronUpDownIcon />
				</Combobox.Icon>
			</Combobox.Trigger>
			<Combobox.Portal>
				<Combobox.Positioner
					className="z-50 outline-hidden"
					align="start"
					sideOffset={8}
				>
					<Combobox.Popup
						className="border-border bg-card max-h-[24rem] max-w-[var(--available-width)] origin-[var(--transform-origin)] rounded-lg border shadow-lg transition-[transform,scale,opacity] [--input-height:2.75rem] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0"
						aria-label={label}
					>
						<div className="w-64 p-2">
							<Combobox.Input
								placeholder={`Search ${label.toLowerCase()}...`}
								className="border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:outline-ring h-9 w-full rounded-md border px-3 text-sm font-normal focus-visible:border-transparent focus-visible:outline-2 focus-visible:outline-offset-2"
							/>
						</div>
						<Combobox.Empty>
							<div className="text-muted-foreground px-4 py-3 text-sm">
								No results found.
							</div>
						</Combobox.Empty>
						<Combobox.List className="max-h-[min(calc(24rem-var(--input-height)),calc(var(--available-height)-var(--input-height)))] scroll-py-1 overflow-y-auto overscroll-contain py-1">
							{(item: FilterItem) => (
								<Combobox.Item
									key={item.value}
									value={item}
									className="group data-[highlighted]:bg-accent grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 px-3 py-2 text-sm leading-4 outline-hidden select-none"
								>
									<span className="border-border group-data-[selected]:border-primary group-data-[selected]:bg-primary group-data-[selected]:text-primary-foreground col-start-1 flex h-4 w-4 items-center justify-center rounded border">
										<Combobox.ItemIndicator>
											<CheckIcon />
										</Combobox.ItemIndicator>
									</span>
									<span className="text-foreground col-start-2">
										{item.label}
									</span>
								</Combobox.Item>
							)}
						</Combobox.List>
					</Combobox.Popup>
				</Combobox.Positioner>
			</Combobox.Portal>
		</Combobox.Root>
	);
}

function SortSelect({
	sortOrder,
	onChange,
}: {
	sortOrder: SortOrder;
	onChange: (value: SortOrder) => void;
}) {
	return (
		<Select.Root
			value={sortOrder}
			onValueChange={(value) => onChange(value as SortOrder)}
			items={sortOptions}
		>
			<Select.Trigger className="border-border bg-card text-foreground hover:border-border-strong flex h-10 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-sm whitespace-nowrap transition-colors select-none">
				<Select.Value>
					{() =>
						sortOptions.find((o) => o.value === sortOrder)?.label ??
						"Newest first"
					}
				</Select.Value>
				<Select.Icon className="flex">
					<ChevronUpDownIcon />
				</Select.Icon>
			</Select.Trigger>
			<Select.Portal>
				<Select.Positioner
					className="z-50 outline-hidden"
					sideOffset={8}
					align="start"
					alignItemWithTrigger={false}
				>
					<Select.Popup className="border-border bg-card min-w-[var(--anchor-width)] origin-[var(--transform-origin)] rounded-lg border py-1 shadow-lg transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
						{sortOptions.map((option) => (
							<Select.Item
								key={option.value}
								value={option.value}
								className="data-[highlighted]:bg-accent grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 px-3 py-2 text-sm leading-4 outline-hidden select-none"
							>
								<Select.ItemIndicator className="col-start-1">
									<CheckIcon />
								</Select.ItemIndicator>
								<Select.ItemText className="text-foreground col-start-2">
									{option.label}
								</Select.ItemText>
							</Select.Item>
						))}
					</Select.Popup>
				</Select.Positioner>
			</Select.Portal>
		</Select.Root>
	);
}

export default function ModelFilters({
	facets,
	total,
}: {
	facets: FacetGroup[];
	total: number;
}) {
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState<Record<string, string[]>>({});
	const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
	const [count, setCount] = useState(total);
	const initializedRef = useRef(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const facetKeys = useMemo(() => facets.map((f) => f.key), [facets]);

	// value → match per facet (authors: value=id, match=display name).
	const matchMaps = useMemo(() => {
		const maps: Record<string, Record<string, string>> = {};
		for (const facet of facets) {
			maps[facet.key] = Object.fromEntries(
				facet.options.map((o) => [o.value, o.match]),
			);
		}
		return maps;
	}, [facets]);

	// Toolbar items are {value,label}; `match` is looked up separately.
	const itemsByKey = useMemo(() => {
		const map: Record<string, FilterItem[]> = {};
		for (const facet of facets) {
			map[facet.key] = facet.options.map((o) => ({
				value: o.value,
				label: o.label,
			}));
		}
		return map;
	}, [facets]);

	// Filter → pinned-first sort → re-flow the sibling grid + corner marks.
	function relayout(next: {
		search: string;
		selected: Record<string, string[]>;
		sortOrder: SortOrder;
	}): number {
		const root = rootRef.current?.closest<HTMLElement>("[data-models]");
		const grid = root?.querySelector<HTMLElement>("[data-models-grid]");
		const empty = root?.querySelector<HTMLElement>("[data-models-empty]");
		if (!grid) return count;

		const cells = Array.from(
			grid.querySelectorAll<HTMLElement>("[data-models-cell]"),
		);
		const query = next.search.trim().toLowerCase();

		// Selected option values → the `match` strings stamped on the cells.
		const selMatch: Record<string, string[]> = {};
		for (const key of facetKeys)
			selMatch[key] = (next.selected[key] ?? []).map(
				(v) => matchMaps[key]?.[v] ?? v,
			);

		const matches = cells.filter((cell) => {
			const nameOk = !query || (cell.dataset.name ?? "").includes(query);
			if (!nameOk) return false;
			return facetKeys.every((key) => {
				const chosen = selMatch[key];
				if (chosen.length === 0) return true;
				const vals = (cell.dataset[datasetKey(key)] ?? "")
					.split("|")
					.filter(Boolean);
				return chosen.some((c) => vals.includes(c));
			});
		});

		// Pinned models sort to the top (by pin index) in both directions; the
		// rest sort by date.
		const dir = next.sortOrder === "oldest" ? 1 : -1;
		matches.sort((a, b) => {
			const pa = Number(a.dataset.pinnedIndex ?? -1);
			const pb = Number(b.dataset.pinnedIndex ?? -1);
			const aPinned = pa >= 0;
			const bPinned = pb >= 0;
			if (aPinned && !bPinned) return -1;
			if (!aPinned && bPinned) return 1;
			if (aPinned && bPinned) return pa - pb;
			const da = Number(a.dataset.date ?? 0);
			const db = Number(b.dataset.date ?? 0);
			return da === db ? 0 : (da < db ? -1 : 1) * dir;
		});

		const lgCols = resolveCols(matches.length);
		grid.className = LG_GRID_CLASS[lgCols] ?? LG_GRID_CLASS[1];
		const cols =
			typeof window !== "undefined" &&
			window.matchMedia("(min-width: 1024px)").matches
				? lgCols
				: 1;

		for (const cell of cells) cell.style.display = "none";
		matches.forEach((cell, i) => {
			cell.style.display = "";
			cell.className = cellClass;
			grid.appendChild(cell); // reorder DOM so visual order = sorted order
			const marks = cell.querySelector<HTMLElement>("[data-corner-marks]");
			if (marks) marks.innerHTML = cornerSpansHTML(cornersFor(i, cols));
		});

		if (empty) empty.hidden = matches.length > 0;
		return matches.length;
	}

	// Hydrate state from the URL once, then reflow.
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const nextSelected: Record<string, string[]> = {};
		for (const key of facetKeys) {
			const known = new Set(itemsByKey[key]?.map((i) => i.value));
			nextSelected[key] = params.getAll(key).filter((v) => known.has(v));
		}
		const nextSearch = params.get("search") ?? "";

		setSearch(nextSearch);
		setSelected(nextSelected);
		initializedRef.current = true;
		setCount(
			relayout({ search: nextSearch, selected: nextSelected, sortOrder }),
		);
	}, []);

	// Reflow + URL sync on every change after init.
	useEffect(() => {
		if (!initializedRef.current) return;
		setCount(relayout({ search, selected, sortOrder }));

		// URL: search + repeated facet keys (`?tasks=a&tasks=b`). Sort is
		// ephemeral — never written.
		const params = new URLSearchParams();
		if (search.trim()) params.set("search", search);
		for (const key of facetKeys)
			for (const v of selected[key] ?? []) params.append(key, v);
		setSearchParams(params);
	}, [search, selected, sortOrder]);

	// Below `lg` the grid is 1 column, so corner marks must be recomputed on
	// breakpoint changes (no URL write).
	useEffect(() => {
		const mq = window.matchMedia("(min-width: 1024px)");
		const onChange = () => {
			if (initializedRef.current)
				setCount(relayout({ search, selected, sortOrder }));
		};
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, [search, selected, sortOrder]);

	const hasActiveFilters = facetKeys.some(
		(k) => (selected[k] ?? []).length > 0,
	);

	return (
		<div ref={rootRef}>
			{/* Toolbar */}
			<div className="mb-4 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
				{/* Search */}
				<div className="relative flex-1 md:min-w-[300px]">
					<svg
						className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						type="text"
						className="border-border bg-card text-foreground placeholder:text-muted-foreground hover:border-border-strong focus-visible:outline-ring h-10 w-full rounded-lg border pr-3 pl-9 text-sm focus-visible:border-transparent focus-visible:outline-2 focus-visible:outline-offset-2"
						placeholder="Search models"
						aria-label="Search models"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				{/* Filter dropdowns + sort */}
				<div className="flex flex-wrap items-center gap-2">
					{facets.map((facet) => (
						<FilterDropdown
							key={facet.key}
							label={facet.label}
							items={itemsByKey[facet.key] ?? []}
							selected={selected[facet.key] ?? []}
							onChange={(values) =>
								setSelected((prev) => ({ ...prev, [facet.key]: values }))
							}
						/>
					))}
					<SortSelect sortOrder={sortOrder} onChange={setSortOrder} />
				</div>
			</div>

			{/* Count + clear */}
			<div className="text-muted-foreground mb-4 flex items-center gap-3 text-sm">
				<span aria-live="polite">
					We found{" "}
					<span className="text-foreground font-semibold">{count}</span>{" "}
					{count === 1 ? "model" : "models"}
				</span>
				{hasActiveFilters && (
					<button
						type="button"
						onClick={() => setSelected({})}
						className="text-primary cursor-pointer underline-offset-2 hover:underline"
					>
						Clear filters
					</button>
				)}
			</div>
		</div>
	);
}
