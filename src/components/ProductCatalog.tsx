import { useEffect, useState, type ChangeEvent } from "react";
import type { CollectionEntry } from "astro:content";
import type { IconifyIconBuildResult } from "@iconify/utils";

export type ProductData = CollectionEntry<"products"> & {
	icon?: IconifyIconBuildResult;
	groups: string[];
};

const ProductCatalog = ({ products }: { products: ProductData[] }) => {
	const [filters, setFilters] = useState<{
		search: string;
		groups: string[];
	}>({
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
			<div className="md:w-1/4 w-full mr-8">
				<input
					type="text"
					className="w-full mb-8 rounded-md bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 px-2 py-2"
					placeholder="Search products"
					value={filters.search}
					onChange={(e) => setFilters({ ...filters, search: e.target.value })}
				/>

				<div className="!mb-8 md:block hidden">
					<span className="uppercase text-gray-600 dark:text-gray-200 text-sm font-bold">
						Groups
					</span>

					{groups.map((group) => (
						<label key={group} className="block !my-2">
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

			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 lg:gap-4 lg:w-3/4 w-full items-stretch self-start !mt-0">
				{productList.length === 0 && (
					<div className="border lg:col-span-3 md:col-span-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-500 rounded-md w-full flex-col flex align-middle justify-center text-center py-6">
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
							href={product.data.product.url}
							className="self-stretch p-3 border-gray-200 dark:border-gray-700 border-solid border rounded-md block !text-inherit no-underline hover:bg-gray-50 dark:hover:bg-black"
						>
							<div className="flex items-start">
								{product.icon && (
									<div className="rounded-full p-1 bg-orange-50 mr-2 text-orange-500 dark:bg-orange-950">
										<svg
											{...product.icon.attributes}
											width={24}
											height={24}
											dangerouslySetInnerHTML={{ __html: product.icon.body }}
										/>
									</div>
								)}
								{!product.icon && (
									<div className="flex items-center justify-center leading-none rounded-full p-1 bg-orange-50 dark:bg-orange-950 mr-2 text-[color:var(--orange-accent-200)] text-lg font-bold w-8 h-8">
										{product.data.name.substr(0, 1)}
									</div>
								)}
								<span className="font-semibold text-md mt-0.5">
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
