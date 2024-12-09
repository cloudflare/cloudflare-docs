import { useState } from "react";
// import ModelInfo from "./fields/ModelInfo";
// import ModelBadges from "./fields/ModelBadges";
// import { authorData } from "./fields/data";
import { marked } from "marked";

const FieldCatalog = ({ fields }) => {
	const [filters, setFilters] = useState({
		search: "",
		categories: [],
		keywords: [],
		// capabilities: [],
	});
	const mapped = fields; //fields.map((field) => ({
	// 	field: {
	// 		...field,
	// 	},
	// 	field_display_name: field.name,
	// }));

	const categories = [
		...new Set(fields.map((field) => field.categories).flat()),
	];
	const keywords = [...new Set(fields.map((field) => field.keywords).flat())];
	// const capabilities = [
	// 	...new Set(
	// 		fields
	// 			.map((model) =>
	// 				model.properties
	// 					.flatMap(({ property_id, value }) => {
	// 						if (property_id === "lora" && value === "true") {
	// 							return "LoRA";
	// 						}

	// 						if (property_id === "function_calling" && value === "true") {
	// 							return "Function calling";
	// 						}
	// 					})
	// 					.filter((p) => Boolean(p)),
	// 			)
	// 			.flat(),
	// 	),
	// ];

	// apply filters to the fields list
	const fieldList = mapped.filter((field) => {
		if (filters.categories.length > 0) {
			if (!field.categories?.some((c) => filters.categories.includes(c))) {
				return false;
			}
		}

		// if (filters.tasks.length > 0) {
		// 	if (!filters.tasks.includes(field.task.name)) {
		// 		return false;
		// 	}
		// }

		// if (filters.capabilities.length > 0) {
		// 	if (!field.capabilities.some((c) => filters.capabilities.includes(c))) {
		// 		return false;
		// 	}
		// }

		if (filters.search) {
			// search keywords
			let keywordFound = field.keywords?.some(
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
			<div className="md:w-1/4 w-full mr-8">
				<input
					type="text"
					className="w-full mb-8 rounded-md bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 px-2 py-2"
					placeholder="Search fields"
					value={filters.search}
					onChange={(e) => setFilters({ ...filters, search: e.target.value })}
				/>

				<div className="!mb-8 md:block hidden">
					<span className="uppercase text-gray-600 dark:text-gray-200 text-sm font-bold">
						▼ Categories
					</span>

					{categories.map((category) => (
						<label key={category} className="block !my-2">
							<input
								type="checkbox"
								className="mr-2"
								value={category}
								onClick={(e) => {
									if (e.target.checked) {
										setFilters({
											...filters,
											categories: [...filters.categories, e.target.value],
										});
									} else {
										setFilters({
											...filters,
											categories: filters.categories.filter(
												(f) => f !== e.target.value,
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

			<div className="flex md:w-3/4 w-full gap-[1%] items-stretch self-start flex-wrap !mt-0">
				{fieldList.length === 0 && (
					<div className="border bg-gray-50 dark:bg-gray-800 dark:border-gray-500 rounded-md w-full flex-col flex align-middle justify-center text-center py-6">
						<span className="text-lg !font-bold">No fields found</span>
						<p>
							Try a different search term, or broaden your search by removing
							filters.
						</p>
					</div>
				)}
				{fieldList.map((field) => {
					// removed lg:w-[48%] from anchor classes below
					return (
						<a
							key={field.name}
							className="p-3 border-gray-200 dark:border-gray-700 border-solid border rounded-md lg:w-[48%] w-full block !text-inherit no-underline self-start hover:bg-gray-50 dark:hover:bg-black mb-3"
							href={`/ruleset-engine/rules-language/fields/reference/${field.name}`}
						>
							<div className="-mb-1 flex items-center">
								<span className="font-semibold text-lg text-ellipsis overflow-hidden whitespace-nowrap">
									{field.name}
								</span>
							</div>
							{/* <div className="text-xs !m-0">
								<ModelInfo model={field.model} />
							</div> */}
							<p
								className="!mt-2 line-clamp-2 text-sm leading-6"
								dangerouslySetInnerHTML={{
									__html: marked.parseInline(field.summary),
								}}
							/>
							{/* <div className="text-xs !mt-2">
								<ModelBadges model={model.model} />
							</div> */}
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default FieldCatalog;
