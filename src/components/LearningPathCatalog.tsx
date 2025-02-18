import { useState, type ChangeEvent } from "react";
import Markdown from "react-markdown";
import type { CollectionEntry } from "astro:content";
import type { IconifyIconBuildResult } from "@iconify/utils";

type LearningPaths = CollectionEntry<"learning-paths">["data"][];
type Icons = Record<string, IconifyIconBuildResult>;

type Filters = {
	products: string[];
	groups: string[];
};

const LearningPathCatalog = ({
	paths,
	icons,
}: {
	paths: LearningPaths;
	icons: Icons;
}) => {
	const [filters, setFilters] = useState<Filters>({
		products: [],
		groups: [],
	});

	const sorted = paths.sort((lp1, lp2) => {
		return lp1.priority < lp2.priority ? -1 : 1;
	});

	const mapped = sorted.map((lp) => {
		const icon = icons[lp.product_group];
		const groups = [lp.product_group];

		if (lp.additional_groups) {
			groups.push(...lp.additional_groups);
		}

		return {
			title: lp.title,
			icon,
			link: lp.path,
			description: lp.description,
			products: lp.products,
			groups,
		};
	});

	const products = [...new Set(mapped.flatMap((lp) => lp.products).sort())];
	const groups = [...new Set(mapped.flatMap((lp) => lp.groups).sort())];

	// apply filters to the fields list
	const filtered = mapped.filter((path) => {
		if (filters.groups.length > 0) {
			if (!path.groups.some((c) => filters.groups.includes(c))) {
				return false;
			}
		}

		if (filters.products.length > 0) {
			if (!path.products.some((c) => filters.products.includes(c))) {
				return false;
			}
		}

		return true;
	});

	return (
		<div className="md:flex">
			<div className="mr-8 w-full md:w-1/4">
				<div className="!mb-8 hidden md:block">
					<span className="text-sm font-bold uppercase text-gray-600 dark:text-gray-200">
						Product groups
					</span>

					{groups.map((group) => (
						<label key={group} className="!my-2 block">
							<input
								type="checkbox"
								className="mr-2"
								value={group}
								checked={filters.groups.includes(group)}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									if (e.target.checked) {
										setFilters({
											...filters,
											groups: [...filters.groups, e.target.value],
										});
									} else {
										setFilters({
											...filters,
											groups: filters.groups.filter(
												(f) => f !== e.target.value,
											),
										});
									}
								}}
							/>{" "}
							{group}
						</label>
					))}
				</div>

				<div className="!mb-8 hidden md:block">
					<span className="text-sm font-bold uppercase text-gray-600 dark:text-gray-200">
						Products
					</span>

					{products.map((product) => (
						<label key={product} className="!my-2 block">
							<input
								type="checkbox"
								className="mr-2"
								value={product}
								checked={filters.products.includes(product)}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									if (e.target.checked) {
										setFilters({
											...filters,
											products: [...filters.products, e.target.value],
										});
									} else {
										setFilters({
											...filters,
											products: filters.products.filter(
												(f) => f !== e.target.value,
											),
										});
									}
								}}
							/>{" "}
							{product}
						</label>
					))}
				</div>
			</div>

			<div className="!mt-0 grid w-full grid-cols-1 items-stretch gap-2 self-start lg:w-3/4 lg:grid-cols-2 lg:gap-4">
				{filtered.length === 0 && (
					<div className="flex w-full flex-col justify-center rounded-md border bg-gray-50 py-6 text-center align-middle dark:border-gray-500 dark:bg-gray-800 md:col-span-2 lg:col-span-3">
						<span className="text-lg !font-bold">No products found</span>
						<p>
							Try a different search term, or broaden your search by removing
							filters.
						</p>
					</div>
				)}
				{filtered.map((path) => {
					return (
						<a
							key={path.title}
							href={path.link}
							className="rounded-md border border-solid border-gray-200 p-6 !text-inherit no-underline hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
						>
							{path.icon && (
								<div className="w-fit rounded-full bg-orange-50 p-1 text-orange-500 dark:bg-orange-950">
									<svg
										{...path.icon.attributes}
										width={24}
										height={24}
										dangerouslySetInnerHTML={{ __html: path.icon.body }}
									/>
								</div>
							)}
							<p className="!mt-3 font-semibold">{path.title}</p>
							<Markdown
								className="!mt-1 text-sm leading-6"
								disallowedElements={["a"]}
								unwrapDisallowed={true}
							>
								{path.description}
							</Markdown>
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default LearningPathCatalog;
