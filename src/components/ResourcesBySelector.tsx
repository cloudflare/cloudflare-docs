import { useEffect, useState } from "react";
import ReactSelect from "./ReactSelect";
import type { CollectionEntry } from "astro:content";

type Frontmatter = keyof CollectionEntry<"docs">["data"];

interface Props {
	resources: CollectionEntry<"docs">[];
	facets: Record<string, string[]>;
	filters?: Frontmatter[];
}

export default function ResourcesBySelector({
	resources,
	facets,
	filters,
}: Props) {
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

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
			const val = resource.data[filter];
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
						value={{ value: selectedFilter, label: selectedFilter }}
						options={options}
						onChange={handleFilterChange}
						isClearable
						placeholder="Filter resources..."
					/>
				</div>
			)}

			<div className="grid grid-cols-2 gap-4">
				{visibleResources.map((page) => (
					<a
						key={page.id}
						href={`/${page.id}/`}
						className="flex flex-col gap-2 rounded-sm border border-solid border-gray-200 p-6 text-black no-underline hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
					>
						<p className="decoration-accent underline decoration-2 underline-offset-4">
							{page.data.title}
						</p>
						<span className="line-clamp-3" title={page.data.description}>
							{page.data.description}
						</span>
					</a>
				))}
			</div>
		</div>
	);
}
