import { useEffect, useState } from "react";
import ReactSelect from "./ReactSelect";
import type { CollectionEntry } from "astro:content";
import { formatDistance } from "date-fns";

type DocsData = keyof CollectionEntry<"docs">["data"];
type VideosData = keyof CollectionEntry<"stream">["data"];

type ResourcesData = DocsData | VideosData;

interface Props {
	resources: Array<CollectionEntry<"docs"> | CollectionEntry<"stream">>;
	facets: Record<string, string[]>;
	filters?: ResourcesData[];
	columns: number;
	showDescriptions: boolean;
	showLastUpdated: boolean;
}

export default function ResourcesBySelector({
	resources,
	facets,
	filters,
	columns,
	showDescriptions,
	showLastUpdated,
}: Props) {
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

	const timeAgo = (date?: Date) => {
		if (!date) return undefined;
		return formatDistance(date, new Date(), { addSuffix: true });
	};

	const handleFilterChange = (option: any) => {
		setSelectedFilter(option?.value || null);
	};

	const options = Object.entries(facets).map(([key, values]) => ({
		label: key,
		options: values.map((v) => ({
			value: v,
			label: v,
		})),
	}));

	const visibleResources = resources.filter((resource) => {
		if (!selectedFilter || !filters) return true;

		const filterableValues: string[] = [];
		for (const filter of filters) {
			const val = resource.data[filter as keyof typeof resource.data];
			if (val) {
				if (Array.isArray(val) && val.every((v) => typeof v === "string")) {
					filterableValues.push(...val);
				} else if (typeof val === "string") {
					filterableValues.push(val);
				}
			}
		}

		return filterableValues.includes(selectedFilter);
	});

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const value = params.get("filters");

		if (value) {
			setSelectedFilter(value);
		}
	}, []);

	return (
		<div>
			{filters && (
				<div className="not-content">
					<ReactSelect
						className="mt-2"
						value={
							selectedFilter
								? { value: selectedFilter, label: selectedFilter }
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
				className={`grid ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"} grid-cols-1 gap-4`}
			>
				{visibleResources.map((page) => {
					const href =
						page.collection === "stream"
							? `/videos/${page.data.url}/`
							: `/${page.id}/`;

					// title can either be set directly in title or added as a meta.title property when we want something different for sidebar and SEO titles
					let title;

					if (page.collection === "docs") {
						const titleItem = page.data.head.find(
							(item) => item.tag === "title",
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
									{page.data.description}
								</span>
							)}
							{showLastUpdated && "reviewed" in page.data && (
								<span className="line-clamp-3" title={page.data.description}>
									Updated {timeAgo(page.data.reviewed)}
								</span>
							)}
						</a>
					);
				})}
			</div>
		</div>
	);
}
