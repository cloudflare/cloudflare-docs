import { useEffect, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { CollectionEntry } from "astro:content";
import ReactSelect from "./ReactSelect";
import { formatDistance } from "date-fns";
import { setSearchParams } from "~/util/url";
import { formatContentType } from "~/util/content-type";
import Markdown from "react-markdown";

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

export default function ResourcesBySelector({
	resources,
	facets,
	filters,
	columns,
	showDescriptions,
	showLastUpdated,
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

	const timeAgo = (date?: Date) => {
		if (!date) return undefined;
		return formatDistance(date, new Date(), { addSuffix: true });
	};

	const handleFilterChange = (option: any) => {
		setSelectedFilter(option?.value || null);
	};

	const options = Object.entries(facets).map(([key, values]) => ({
		label: key,
		options: values
			.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
			.map((v) => ({
				value: v,
				label: (() => {
					if (key === "pcx_content_type") return formatContentType(v);
					return v;
				})(),
			})),
	}));

	// Keep facets organized by filterable field for left sidebar

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
		.sort(
			(a, b) =>
				Number(b?.data?.reviewed ?? 600) - Number(a?.data?.reviewed ?? 600),
		);

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

	return (
		<div className={filterPlacement === "left" ? "md:flex" : ""}>
			{filterPlacement === "left" && filters && (
				<div className="mr-8 w-full md:w-1/4">
					<input
						type="text"
						className="mb-8 w-full rounded-md border-2 border-gray-200 bg-white px-2 py-2 dark:border-gray-700 dark:bg-gray-800"
						placeholder="Search resources"
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

					{Object.entries(facets).map(([filterField, values]) => (
						<div key={filterField} className="mb-8! hidden md:block">
							<span className="text-sm font-bold text-gray-600 uppercase dark:text-gray-200">
								{filterField === "pcx_content_type"
									? "Content Type"
									: filterField
											.replace(/_/g, " ")
											.replace(/\b\w/g, (l) => l.toUpperCase())}
							</span>

							{values.map((value) => (
								<label key={`${filterField}-${value}`} className="my-2! block">
									<input
										type="checkbox"
										className="mr-2"
										value={value}
										checked={
											leftFilters.selectedValues[filterField]?.includes(
												value,
											) || false
										}
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											const currentValues =
												leftFilters.selectedValues[filterField] || [];
											if (e.target.checked) {
												setLeftFilters({
													...leftFilters,
													selectedValues: {
														...leftFilters.selectedValues,
														[filterField]: [...currentValues, e.target.value],
													},
												});
											} else {
												setLeftFilters({
													...leftFilters,
													selectedValues: {
														...leftFilters.selectedValues,
														[filterField]: currentValues.filter(
															(v) => v !== e.target.value,
														),
													},
												});
											}
										}}
									/>{" "}
									{filterField === "pcx_content_type"
										? formatContentType(value)
										: value}
								</label>
							))}
						</div>
					))}
				</div>
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

			<div
				className={filterPlacement === "left" ? "mt-0! w-full md:w-3/4" : ""}
			>
				{filterPlacement === "left" && visibleResources.length === 0 && (
					<div className="flex w-full flex-col justify-center rounded-md border bg-gray-50 py-6 text-center align-middle dark:border-gray-500 dark:bg-gray-800">
						<span className="text-lg font-bold!">No resources found</span>
						<p>
							Try a different search term, or broaden your search by removing
							filters.
						</p>
					</div>
				)}

				<div
					className={`grid ${columns === 1 ? "md:grid-cols-1" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"} grid-cols-1 gap-4`}
				>
					{visibleResources.map((page) => {
						let href;
						switch (page.collection) {
							case "docs":
								href = `/${page.id}/`;
								break;
							case "learning-paths":
								href = `${page.data.path}/`;
								break;
							case "stream":
								href = `/videos/${page.data.url}/`;
								break;
							default:
								href = `/${(page as any).id}/`;
								break;
						}

						// title can either be set directly in title or added as a meta.title property when we want something different for sidebar and SEO titles
						let title;

						if (page.collection === "docs") {
							const titleItem = page.data.head.find(
								(item: any) => item.tag === "title",
							);
							title = titleItem ? titleItem.content : page.data.title;
						} else {
							title = page.data.title;
						}

						return (
							<a
								key={page.id}
								href={href}
								className="flex flex-col gap-2 rounded-sm border border-solid border-gray-200 p-6 text-black no-underline hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
							>
								<p className="decoration-accent underline decoration-2 underline-offset-4">
									{title}
								</p>
								{showDescriptions && (
									<span className="line-clamp-3" title={page.data.description}>
										<Markdown
											disallowedElements={["a"]}
											unwrapDisallowed={true}
										>
											{page.data.description}
										</Markdown>
									</span>
								)}
								{showLastUpdated && "reviewed" in page.data && (
									<span
										className="line-clamp-3"
										title={`Updated ${timeAgo(page.data.reviewed)}`}
									>
										Updated {timeAgo(page.data.reviewed)}
									</span>
								)}
							</a>
						);
					})}
				</div>
			</div>
		</div>
	);
}
