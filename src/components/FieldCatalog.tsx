import { useState } from "react";
import FieldBadges from "./fields/FieldBadges";
import Markdown from "react-markdown";
import type { CollectionEntry } from "astro:content";

type Fields = CollectionEntry<"fields">["data"]["entries"];

type Filters = {
	search: string;
	categories: string[];
	keywords: string[];
};

const FieldCatalog = ({ fields }: { fields: Fields }) => {
	const [filters, setFilters] = useState<Filters>({
		search: "",
		categories: [],
		keywords: [],
	});

	const mapped = fields.sort((f1, f2) => {
		return f1.name < f2.name ? -1 : 1;
	});

	const categories = [
		...new Set(
			fields
				.map((field) => field.categories)
				.flat()
				.sort(),
		),
	];

	// apply filters to the fields list
	const fieldList = mapped.filter((field) => {
		if (filters.categories.length > 0) {
			if (!field.categories?.some((c) => filters.categories.includes(c))) {
				return false;
			}
		}

		if (filters.search) {
			// search keywords
			const keywordFound = field.keywords?.some(
				(kw) => kw.indexOf(filters.search) >= 0,
			);

			if (
				!field.name.toLowerCase().includes(filters.search.toLowerCase()) &&
				!field.summary.toLowerCase().includes(filters.search.toLowerCase()) &&
				!keywordFound
			) {
				return false;
			}
		}

		return true;
	});

	return (
		<div className="md:flex">
			<div className="mr-8 w-full md:w-1/4">
				<input
					type="text"
					className="mb-8 w-full rounded-md border-2 border-gray-200 bg-white px-2 py-2 dark:border-gray-700 dark:bg-gray-800"
					placeholder="Search fields"
					value={filters.search}
					onChange={(e) => setFilters({ ...filters, search: e.target.value })}
				/>

				<div className="!mb-8 hidden md:block">
					<span className="text-sm font-bold uppercase text-gray-600 dark:text-gray-200">
						▼ Categories
					</span>

					{categories.map((category) => (
						<label key={category} className="!my-2 block">
							<input
								type="checkbox"
								className="mr-2"
								value={category}
								onClick={(e) => {
									const target = e.target as HTMLInputElement;

									if (target.checked) {
										setFilters({
											...filters,
											categories: [...filters.categories, target.value],
										});
									} else {
										setFilters({
											...filters,
											categories: filters.categories.filter(
												(f) => f !== target.value,
											),
										});
									}
								}}
							/>{" "}
							{category}
						</label>
					))}
				</div>
			</div>

			<div className="!mt-0 flex w-full flex-wrap items-stretch gap-[1%] self-start md:w-3/4">
				{fieldList.length === 0 && (
					<div className="flex w-full flex-col justify-center rounded-md border bg-gray-50 py-6 text-center align-middle dark:border-gray-500 dark:bg-gray-800">
						<span className="text-lg !font-bold">No fields found</span>
						<p>
							Try a different search term, or broaden your search by removing
							filters.
						</p>
					</div>
				)}
				{fieldList.map((field) => {
					return (
						<a
							key={field.name}
							className="mb-3 block w-full self-stretch rounded-md border border-solid border-gray-200 p-3 !text-inherit no-underline hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 lg:w-[48%]"
							href={`/ruleset-engine/rules-language/fields/reference/${field.name}/`}
						>
							<div className="-mb-1 flex items-center">
								<span
									className="font-semibold text-lg text-ellipsis overflow-hidden whitespace-nowrap"
									title={`${field.name}: ${field.data_type}`}
								>
									{field.name}
								</span>
							</div>
							<Markdown
								className="!mt-2 line-clamp-2 text-sm leading-6"
								disallowedElements={["a"]}
								unwrapDisallowed={true}
							>
								{field.summary}
							</Markdown>

							{field.plan_info_label && (
								<div className="!mt-2 text-xs">
									<FieldBadges badges={[field.plan_info_label]} />
								</div>
							)}
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default FieldCatalog;
