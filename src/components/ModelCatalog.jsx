import { useState } from "react";
import ModelInfo from "./models/ModelInfo";
import ModelBadges from "./models/ModelBadges";
import { authorData } from "./models/data";

const ModelCatalog = ({ models }) => {
	const [filters, setFilters] = useState({
		search: "",
		authors: [],
		tasks: [],
		capabilities: [],
	});
	const mapped = models.map((model) => ({
		model: {
			...model,
			capabilities: model.properties
				.flatMap(({ property_id, value }) => {
					if (property_id === "lora" && value === "true") {
						return "LoRA";
					}

					if (property_id === "function_calling" && value === "true") {
						return "Function calling";
					}
				})
				.filter((p) => Boolean(p)),
		},
		model_display_name: model.name.split("/").at(-1),
	}));

	const tasks = [...new Set(models.map((model) => model.task.name))];
	const authors = [...new Set(models.map((model) => model.name.split("/")[1]))];
	const capabilities = [
		...new Set(
			models
				.map((model) =>
					model.properties
						.flatMap(({ property_id, value }) => {
							if (property_id === "lora" && value === "true") {
								return "LoRA";
							}

							if (property_id === "function_calling" && value === "true") {
								return "Function calling";
							}
						})
						.filter((p) => Boolean(p)),
				)
				.flat(),
		),
	];

	const modelList = mapped.filter(({ model }) => {
		if (filters.authors.length > 0) {
			if (!filters.authors.includes(model.name.split("/")[1])) {
				return false;
			}
		}

		if (filters.tasks.length > 0) {
			if (!filters.tasks.includes(model.task.name)) {
				return false;
			}
		}

		if (filters.capabilities.length > 0) {
			if (!model.capabilities.some((c) => filters.capabilities.includes(c))) {
				return false;
			}
		}

		if (filters.search) {
			if (!model.name.includes(filters.search)) {
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
					placeholder="Search models"
					value={filters.search}
					onChange={(e) => setFilters({ ...filters, search: e.target.value })}
				/>

				<div className="!mb-8 md:block hidden">
					<span className="uppercase text-gray-600 dark:text-gray-200 text-sm font-bold">
						▼ Model Types
					</span>

					{tasks.map((task) => (
						<label key={task} className="block !my-2">
							<input
								type="checkbox"
								className="mr-2"
								value={task}
								onClick={(e) => {
									if (e.target.checked) {
										setFilters({
											...filters,
											tasks: [...filters.tasks, e.target.value],
										});
									} else {
										setFilters({
											...filters,
											tasks: filters.tasks.filter((f) => f !== e.target.value),
										});
									}
								}}
							/>{" "}
							{task}
						</label>
					))}
				</div>

				<div className="!mb-8 md:block hidden">
					<span className="uppercase text-gray-600 dark:text-gray-200 text-sm font-bold">
						▼ Capabilities
					</span>

					{capabilities.map((capability) => (
						<label key={capability} className="block !my-2">
							<input
								type="checkbox"
								value={capability}
								className="mr-2"
								onClick={(e) => {
									if (e.target.checked) {
										setFilters({
											...filters,
											capabilities: [...filters.capabilities, e.target.value],
										});
									} else {
										setFilters({
											...filters,
											capabilities: filters.capabilities.filter(
												(f) => f !== e.target.value,
											),
										});
									}
								}}
							/>{" "}
							{capability}
						</label>
					))}
				</div>

				<div className="md:block hidden">
					<span className="uppercase text-gray-600 dark:text-gray-200 text-sm font-bold">
						▼ Authors
					</span>

					{authors.map((author) => (
						<label key={author} className="block !my-2">
							<input
								type="checkbox"
								className="mr-2"
								value={author}
								onClick={(e) => {
									if (e.target.checked) {
										setFilters({
											...filters,
											authors: [...filters.authors, e.target.value],
										});
									} else {
										setFilters({
											...filters,
											authors: filters.authors.filter(
												(f) => f !== e.target.value,
											),
										});
									}
								}}
							/>{" "}
							{authorData[author] ? authorData[author].name : author}
						</label>
					))}
				</div>
			</div>
			<div className="flex md:w-3/4 w-full gap-[1%] items-stretch self-start flex-wrap !mt-0">
				{modelList.length === 0 && (
					<div className="border bg-gray-50 dark:bg-gray-800 dark:border-gray-500 rounded-md w-full flex-col flex align-middle justify-center text-center py-6">
						<span className="text-lg !font-bold">No models found</span>
						<p>
							Try a different search term, or broaden your search by removing
							filters.
						</p>
					</div>
				)}
				{modelList.map((model) => {
					const isBeta = model.model.properties.find(
						({ property_id, value }) =>
							property_id === "beta" && value === "true",
					);

					const author =
						authorData[model.model.name.split("/")[1]]?.name ??
						model.model.name.split("/")[1];

					return (
						<a
							key={model.model.id}
							className="p-3 border-gray-200 dark:border-gray-700 border-solid border rounded-md lg:w-[48%] w-full block !text-inherit no-underline self-start hover:bg-gray-50 dark:hover:bg-black mb-3"
							href={`/workers-ai/models/${model.model_display_name}`}
						>
							<div className="-mb-1 flex items-center">
								{authorData[model.model.name.split("/")[1]]?.logo ? (
									<img
										className="block w-6 mr-2"
										src={authorData[model.model.name.split("/")[1]]?.logo}
									/>
								) : (
									<div className="w-6 h-6 rounded-md bg-gray-100 text-gray-400 uppercase text-sm font-black flex justify-center items-center mr-2">
										{author.substr(0, 1)}
									</div>
								)}
								<span className="font-semibold text-lg text-ellipsis overflow-hidden whitespace-nowrap">
									{model.model_display_name}
								</span>
								{isBeta && (
									<span className="ml-1 bg-orange-200 text-orange-900 rounded-full px-2 py-0.5 text-xs">
										Beta
									</span>
								)}
							</div>
							<div className="text-xs !m-0">
								<ModelInfo model={model.model} />
							</div>
							<p className="!mt-2 line-clamp-2 text-sm leading-6">
								{model.model.description}
							</p>
							<div className="text-xs !mt-2">
								<ModelBadges model={model.model} />
							</div>
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default ModelCatalog;
