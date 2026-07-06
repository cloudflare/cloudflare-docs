import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { CollectionEntry } from "astro:content";
import ReactSelect from "./ReactSelect";
import { setSearchParams } from "~/util/url";
import { formatContentType } from "~/util/content-type";
import Markdown from "react-markdown";
// Shared corner-mark grid geometry — same source of truth as the /directory
// page, so resource cards render with the identical blueprint treatment.
import { cellClass, cornerSpansHTML, cornersFor } from "~/components/directory/grid";

type DocsData = keyof CollectionEntry<"docs">["data"];
type VideosData = keyof CollectionEntry<"stream">["data"];
type LearningPathsData = keyof CollectionEntry<"learning-paths">["data"];

type ResourcesData = DocsData | VideosData | LearningPathsData;

interface Props {
	resources: Array<
		(
			| CollectionEntry<"docs">
			| CollectionEntry<"stream">
			| CollectionEntry<"learning-paths">
		) & {
			data: any & { productTitles?: string[] };
		}
	>;
	facets: Record<string, string[]>;
	filters?: ResourcesData[];
	columns: number;
	showDescriptions: boolean;
	showLastUpdated: boolean;
	filterPlacement: string;
}

// Phosphor glyphs, inlined because astro-icon's <Icon> is Astro-only and this
// is a React island. viewBox + currentColor mirror the `ph:` set used elsewhere.
function IconSearch({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden className={className}>
			<path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
		</svg>
	);
}
function IconX({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden className={className}>
			<path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
		</svg>
	);
}
function IconCheck({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden className={className}>
			<path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z" />
		</svg>
	);
}

const FACET_LABELS: Record<string, string> = {
	pcx_content_type: "Content type",
	products: "Products",
};

export default function ResourcesBySelector({
	resources,
	facets,
	filters,
	showDescriptions,
	filterPlacement,
}: Props) {
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
	const [leftFilters, setLeftFilters] = useState<{
		search: string;
		selectedValues: Record<string, string[]>;
	}>({
		search: "",
		selectedValues: {},
	});
	const searchRef = useRef<HTMLInputElement>(null);
	// Skip the URL-writer effect on first render so deep links (seeded from the
	// URL by the reader effect) aren't transiently stripped or double-pushed
	// into history — mirrors directory.client.ts's `update(false)` init.
	const didMount = useRef(false);

	const handleFilterChange = (option: any) => {
		setSelectedFilter(option?.value || null);
	};

	// Only the `top` (ReactSelect) placement consumes this; compute lazily and
	// without mutating the `facets` prop arrays (`.slice()` before `.sort()`).
	const options =
		filterPlacement === "top"
			? Object.entries(facets).map(([key, values]) => ({
					label: key,
					options: values
						.slice()
						.sort((a, b) =>
							a.localeCompare(b, undefined, { sensitivity: "base" }),
						)
						.map((v) => ({
							value: v,
							label:
								key === "pcx_content_type" ? formatContentType(v) : v,
						})),
				}))
			: [];

	// [DEVIATION D5] Upstream sorts on `Number(reviewed ?? 600)`, which assumes
	// `reviewed` is always a Date. In cf-nimbus `docs.reviewed` may be a string
	// (`Number("2024-01-01")` → NaN). Parse robustly to epoch millis instead,
	// defaulting any missing/unparseable value to 0. Output order is faithful
	// for Date-typed values and well-defined for string dates.
	const toTime = (r: unknown): number =>
		r instanceof Date ? r.getTime() : Date.parse(r as string) || 0;

	const visibleResources = resources
		.filter((resource) => {
			// Handle top filter (ReactSelect)
			if (filterPlacement === "top" && selectedFilter && filters) {
				const filterableValues: string[] = [];
				for (const filter of filters) {
					if (filter === "products" && resource.data.productTitles) {
						// Use resolved product titles for products filter
						filterableValues.push(...resource.data.productTitles);
					} else {
						const val = resource.data[filter as keyof typeof resource.data];
						if (val) {
							if (
								Array.isArray(val) &&
								val.every((v) => typeof v === "string")
							) {
								filterableValues.push(...val);
							} else if (
								Array.isArray(val) &&
								val.every((v) => typeof v === "object")
							) {
								filterableValues.push(...val.map((v) => v.id));
							} else if (typeof val === "string") {
								filterableValues.push(val);
							}
						}
					}
				}
				if (!filterableValues.includes(selectedFilter)) return false;
			}

			// Handle left sidebar filters
			if (filterPlacement === "left" && filters) {
				// Check each filterable field separately
				for (const [filterField, selectedValues] of Object.entries(
					leftFilters.selectedValues,
				)) {
					if (selectedValues.length > 0) {
						const resourceValues: string[] = [];
						if (filterField === "products" && resource.data.productTitles) {
							// Use resolved product titles for products filter
							resourceValues.push(...resource.data.productTitles);
						} else {
							const val =
								resource.data[filterField as keyof typeof resource.data];
							if (val) {
								if (
									Array.isArray(val) &&
									val.every((v) => typeof v === "string")
								) {
									resourceValues.push(...val);
								} else if (
									Array.isArray(val) &&
									val.every((v) => typeof v === "object")
								) {
									resourceValues.push(...val.map((v) => v.id));
								} else if (typeof val === "string") {
									resourceValues.push(val);
								}
							}
						}
						if (!resourceValues.some((v) => selectedValues.includes(v))) {
							return false;
						}
					}
				}

				// Search filter
				if (leftFilters.search) {
					const searchTerm = leftFilters.search.toLowerCase();
					const title = resource.data.title?.toLowerCase() || "";
					const description = resource.data.description?.toLowerCase() || "";

					if (
						!title.includes(searchTerm) &&
						!description.includes(searchTerm)
					) {
						return false;
					}
				}
			}

			return true;
		})
		.sort((a, b) => toTime(b?.data?.reviewed) - toTime(a?.data?.reviewed));

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);

		if (filterPlacement === "top") {
			const value = params.get("filters");
			if (value) {
				setSelectedFilter(value);
			}
		} else if (filterPlacement === "left") {
			// Handle left sidebar URL params
			const searchTerm = params.get("search-term") ?? "";
			const selectedValues: Record<string, string[]> = {};

			// Get values for each filterable field from URL params
			if (filters) {
				for (const filter of filters) {
					const values = params.getAll(`filter-${filter}`);
					if (values.length > 0) {
						selectedValues[filter] = values;
					}
				}
			}

			if (Object.keys(selectedValues).length > 0 || searchTerm) {
				setLeftFilters({
					search: searchTerm,
					selectedValues: selectedValues,
				});
			}
		}
	}, [filterPlacement]);

	// Update URL params for left sidebar filters
	useEffect(() => {
		if (!didMount.current) {
			didMount.current = true;
			return;
		}
		if (filterPlacement === "left") {
			const params = new URLSearchParams();

			if (leftFilters.search) {
				params.set("search-term", leftFilters.search);
			}

			// Add URL params for each filterable field
			for (const [filterField, selectedValues] of Object.entries(
				leftFilters.selectedValues,
			)) {
				selectedValues.forEach((value) =>
					params.append(`filter-${filterField}`, value),
				);
			}

			setSearchParams(params);
		}
	}, [leftFilters, filterPlacement]);

	// Keyboard parity with the directory rail: `/` or ⌘K / Ctrl+K focuses the
	// search; Escape clears it (handled inline on the input too).
	useEffect(() => {
		if (filterPlacement !== "left") return;
		const onKeyDown = (e: globalThis.KeyboardEvent) => {
			const target = e.target as HTMLElement | null;
			const typing =
				target &&
				(target.tagName === "INPUT" ||
					target.tagName === "TEXTAREA" ||
					target.isContentEditable);
			if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
				e.preventDefault();
				searchRef.current?.focus();
				searchRef.current?.select();
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [filterPlacement]);

	const activeFilterCount = Object.values(leftFilters.selectedValues).reduce(
		(n, vals) => n + vals.length,
		0,
	);
	const hasActiveFilters = activeFilterCount > 0 || leftFilters.search !== "";

	const clearAll = () =>
		setLeftFilters({ search: "", selectedValues: {} });

	const toggleValue = (field: string, value: string, checked: boolean) =>
		setLeftFilters((prev) => {
			const current = prev.selectedValues[field] || [];
			return {
				...prev,
				selectedValues: {
					...prev.selectedValues,
					[field]: checked
						? [...current, value]
						: current.filter((v) => v !== value),
				},
			};
		});

	const resourceHref = (page: Props["resources"][number]) => {
		switch (page.collection) {
			case "docs":
				return `/${page.id}/`;
			case "learning-paths":
				return page.data.path ? `${page.data.path}/` : `/${page.id}/`;
			case "stream":
				return `/videos/${page.data.url}/`;
			default:
				return `/${(page as any).id}/`;
		}
	};

	const resourceTitle = (page: Props["resources"][number]) => {
		if (page.collection === "docs") {
			const titleItem = page.data.head?.find(
				(item: any) => item.tag === "title",
			);
			return titleItem ? titleItem.content : page.data.title;
		}
		return page.data.title;
	};

	return (
		<div className={filterPlacement === "left" ? "md:grid md:grid-cols-[208px_1fr] md:gap-10" : ""}>
			{filterPlacement === "left" && filters && (
				<aside className="mb-8 md:mb-0 md:sticky md:top-20 md:self-start">
					{/* Search */}
					<div className="relative mb-6">
						<IconSearch className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
						<input
							ref={searchRef}
							type="text"
							className="h-10 w-full rounded-lg border border-border bg-card pr-9 pl-9 text-sm text-foreground placeholder:text-muted-foreground hover:border-border-strong focus-visible:border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
							placeholder="Search resources"
							aria-label="Search resources"
							value={leftFilters.search}
							onChange={(e) =>
								setLeftFilters({ ...leftFilters, search: e.target.value })
							}
							onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
								if (e.key === "Escape") {
									setLeftFilters({ ...leftFilters, search: "" });
								}
							}}
						/>
						{leftFilters.search && (
							<button
								type="button"
								aria-label="Clear search"
								onClick={() => setLeftFilters({ ...leftFilters, search: "" })}
								className="absolute top-1/2 right-1.5 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
							>
								<IconX className="size-3.5" />
							</button>
						)}
					</div>

					{/* Facets — visible on every breakpoint (matches the directory rail);
					     on mobile the rail stacks above results. */}
					<div className="flex flex-col gap-7">
						{Object.entries(facets).map(([filterField, values]) => (
							<fieldset key={filterField} className="m-0 min-w-0 border-0 p-0">
								<legend className="mb-3 font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
									{FACET_LABELS[filterField] ??
										filterField
											.replace(/_/g, " ")
											.replace(/\b\w/g, (l) => l.toUpperCase())}
								</legend>
								<div className="flex flex-col gap-1">
									{values
										.slice()
										.sort((a, b) =>
											a.localeCompare(b, undefined, { sensitivity: "base" }),
										)
										.map((value) => {
											const checked =
												leftFilters.selectedValues[filterField]?.includes(
													value,
												) || false;
											return (
												<label
													key={`${filterField}-${value}`}
													className="group/checkbox flex cursor-pointer items-start gap-2 py-1"
												>
													<input
														type="checkbox"
														className="peer sr-only"
														value={value}
														checked={checked}
														onChange={(e: ChangeEvent<HTMLInputElement>) =>
															toggleValue(
																filterField,
																e.target.value,
																e.target.checked,
															)
														}
													/>
													<span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-sm bg-background ring-1 ring-inset ring-border transition-[background-color,box-shadow] peer-checked:bg-foreground peer-checked:ring-foreground peer-hover:ring-border-strong peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
														<IconCheck className="size-3 text-background opacity-0 transition-opacity group-has-[:checked]/checkbox:opacity-100" />
													</span>
													<span className="text-sm leading-snug text-foreground select-none">
														{filterField === "pcx_content_type"
															? formatContentType(value)
															: value}
													</span>
												</label>
											);
										})}
								</div>
							</fieldset>
						))}

						{hasActiveFilters && (
							<button
								type="button"
								onClick={clearAll}
								className="-mt-2 self-start text-sm text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
							>
								Clear all filters
							</button>
						)}
					</div>
				</aside>
			)}

			{filterPlacement === "top" && filters && (
				<div className="not-content">
					<ReactSelect
						className="mt-2"
						value={
							selectedFilter
								? {
										value: selectedFilter,
										label: selectedFilter.includes("-")
											? formatContentType(selectedFilter)
											: selectedFilter,
									}
								: null
						}
						options={options}
						onChange={handleFilterChange}
						isClearable
						placeholder="Filter resources..."
					/>
				</div>
			)}

			<div className={filterPlacement === "left" ? "min-w-0" : ""}>
				{filterPlacement === "left" && visibleResources.length === 0 ? (
					<div className="rounded-lg py-12 text-center ring-1 ring-border">
						<p className="text-lg font-medium text-foreground">
							No resources found
						</p>
						<p className="mx-auto mt-1 max-w-sm text-pretty text-muted-foreground">
							Try a different search term, or broaden your search by removing
							filters.
						</p>
						{hasActiveFilters && (
							<button
								type="button"
								onClick={clearAll}
								className="mt-4 text-sm text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
							>
								Clear all filters
							</button>
						)}
					</div>
				) : (
					/* One row per item, rendered as the /directory blueprint grid:
					   the wrapper draws the top + left edges, each cell closes its
					   own right + bottom edge, and corner marks sit on the line
					   intersections. No gap — cells share single-width lines. */
					<div className="relative w-full border-t border-l border-border">
						<div className="grid grid-cols-1 lg:grid-cols-1">
							{visibleResources.map((page, i) => (
								<div key={page.id} className={cellClass}>
									<div
										className="pointer-events-none absolute inset-0 z-10 select-none"
										aria-hidden="true"
										dangerouslySetInnerHTML={{
											__html: cornerSpansHTML(cornersFor(i, 1)),
										}}
									/>
									<a
										href={resourceHref(page)}
										className="group/card flex h-full flex-col p-4 text-inherit! no-underline lg:p-5"
									>
										<p className="pb-0.5">
											<strong className="text-base font-semibold text-foreground transition-colors group-hover/card:text-primary">
												{resourceTitle(page)}
											</strong>
										</p>
										{showDescriptions && page.data.description && (
											<div className="text-sm leading-relaxed text-muted-foreground [&_p]:m-0 [&_p]:line-clamp-2">
												<Markdown
													disallowedElements={["a"]}
													unwrapDisallowed={true}
												>
													{page.data.description}
												</Markdown>
											</div>
										)}
									</a>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
