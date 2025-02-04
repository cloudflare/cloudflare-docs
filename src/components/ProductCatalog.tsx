import { useEffect, useState, type ChangeEvent } from "react";
import type { CollectionEntry } from "astro:content";
import type { IconifyIconBuildResult } from "@iconify/utils";

export type ProductData = CollectionEntry<"products"> & {
	icon?: IconifyIconBuildResult;
	groups: string[];
};

type Filters = {
	search: string;
	groups: string[];
};

const ProductCatalog = ({ products }: { products: ProductData[] }) => {
	const [filters, setFilters] = useState<Filters>({
		search: "",
		groups: [],
	});

	const groups = [...new Set(products.map((product) => product.groups).flat())];

	const productList = products.filter((product) => {
		if (filters.groups.length > 0) {
			if (
				filters.groups.filter((val) => product.groups.includes(val)).length ===
				0
			) {
				return false;
			}
		}

		if (filters.search) {
			if (
				!product.data.name.toLowerCase().includes(filters.search.toLowerCase())
			) {
				return false;
			}
		}

		return true;
	});

	useEffect(() => {
		// On component load, check for deep-links to groups in the query param
		const params = new URLSearchParams(window.location.search);
		const groups = params.get("product-group");

		if (!groups) return;

		setFilters({
			...filters,
			groups: [groups],
		});
	}, []);

	return (
		<div className="md:flex">
			<div className="mr-8 w-full md:w-1/4">
				<input
					type="text"
					className="mb-8 w-full rounded-md border-2 border-gray-200 bg-white px-2 py-2 dark:border-gray-700 dark:bg-gray-800"
					placeholder="Search products"
					value={filters.search}
					onChange={(e) => setFilters({ ...filters, search: e.target.value })}
				/>

				<div className="!mb-8 hidden md:block">
					<span className="text-sm font-bold uppercase text-gray-600 dark:text-gray-200">
						Groups
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
			</div>

			<div className="!mt-0 grid w-full grid-cols-1 items-stretch gap-2 self-start md:grid-cols-2 lg:w-3/4 lg:grid-cols-3 lg:gap-4">
				{productList.length === 0 && (
					<div className="flex w-full flex-col justify-center rounded-md border bg-gray-50 py-6 text-center align-middle dark:border-gray-500 dark:bg-gray-800 md:col-span-2 lg:col-span-3">
						<span className="text-lg !font-bold">No products found</span>
						<p>
							Try a different search term, or broaden your search by removing
							filters.
						</p>
					</div>
				)}
				{productList.map((product) => {
					return (
						<a
							key={product.data.name}
							href={product.data.product.url}
							className="block self-stretch rounded-md border border-solid border-gray-200 p-3 !text-inherit no-underline hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
						>
							<div className="flex items-start">
								{product.icon && (
									<div className="mr-2 rounded-full bg-orange-50 p-1 text-orange-500 dark:bg-orange-950">
										<svg
											{...product.icon.attributes}
											width={24}
											height={24}
											dangerouslySetInnerHTML={{ __html: product.icon.body }}
										/>
									</div>
								)}
								{!product.icon && (
									<div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 p-1 text-lg font-bold leading-none text-[color:var(--orange-accent-200)] dark:bg-orange-950">
										{product.data.name.substr(0, 1)}
									</div>
								)}
								<span className="text-md mt-0.5 font-semibold">
									{product.data.name}
								</span>
							</div>
							{product.data.meta && (
								<p className="!mt-2 line-clamp-2 text-sm leading-6">
									{product.data.meta.description}
								</p>
							)}
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default ProductCatalog;
