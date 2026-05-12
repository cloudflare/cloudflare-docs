import { useEffect, useRef, useState, useMemo } from "react";
import { Combobox } from "@base-ui/react/combobox";
import { Select } from "@base-ui/react/select";
import ModelInfo from "./models/ModelInfo";
import ModelBadges from "./models/ModelBadges";
import { authorData } from "./models/data";
import type { ModelCardData } from "~/util/model-types";
import { getModelAuthor } from "~/util/model-helpers";
import { setSearchParams } from "~/util/url";
import {
	getCapabilities,
	getLabelsByCategory,
	hasProperty,
} from "~/util/model-properties";

type Filters = {
	search: string;
	authors: string[];
	tasks: string[];
	capabilities: string[];
};

type SortOrder = "newest" | "oldest";

interface FilterItem {
	value: string;
	label: string;
}

function FilterDropdown({
	label,
	items,
	selected,
	onChange,
}: {
	label: string;
	items: FilterItem[];
	selected: string[];
	onChange: (selected: string[]) => void;
}) {
	const hasSelection = selected.length > 0;
	const triggerLabel = hasSelection ? `${label} (+${selected.length})` : label;

	const selectedItems = items.filter((item) => selected.includes(item.value));

	return (
		<Combobox.Root
			multiple
			value={selectedItems}
			onValueChange={(value) =>
				onChange((value as FilterItem[]).map((item) => item.value))
			}
			items={items}
			isItemEqualToValue={(a, b) => a.value === b.value}
		>
			<Combobox.Trigger
				className={`flex cursor-pointer items-center gap-1.5 rounded-lg border bg-white px-3 py-2 text-sm whitespace-nowrap transition-colors select-none dark:bg-gray-800 ${
					hasSelection
						? "border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-300"
						: "border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
				}`}
			>
				<Combobox.Value placeholder={<span>{label}</span>}>
					{() => triggerLabel}
				</Combobox.Value>
				<Combobox.Icon className="flex">
					<ChevronUpDownIcon />
				</Combobox.Icon>
			</Combobox.Trigger>
			<Combobox.Portal>
				<Combobox.Positioner
					className="z-50 outline-hidden"
					align="start"
					sideOffset={8}
				>
					<Combobox.Popup
						className="max-h-[24rem] max-w-[var(--available-width)] origin-[var(--transform-origin)] rounded-lg border border-gray-200 bg-white shadow-lg transition-[transform,scale,opacity] [--input-height:2.75rem] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 dark:border-gray-600 dark:bg-gray-800"
						aria-label={label}
					>
						<div className="w-64 p-2">
							<Combobox.Input
								placeholder={`Search ${label.toLowerCase()}...`}
								className="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-sm font-normal text-gray-900 outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
							/>
						</div>
						<Combobox.Empty>
							<div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
								No results found.
							</div>
						</Combobox.Empty>
						<Combobox.List className="max-h-[min(calc(24rem-var(--input-height)),calc(var(--available-height)-var(--input-height)))] scroll-py-1 overflow-y-auto overscroll-contain py-1">
							{(item: FilterItem) => (
								<Combobox.Item
									key={item.value}
									value={item}
									className="group grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 px-3 py-2 text-sm leading-4 outline-hidden select-none data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-700"
								>
									<span className="col-start-1 flex h-4 w-4 items-center justify-center rounded border border-gray-300 group-data-[selected]:border-blue-600 group-data-[selected]:bg-blue-600 group-data-[selected]:text-white dark:border-gray-500 dark:group-data-[selected]:border-blue-500 dark:group-data-[selected]:bg-blue-500">
										<Combobox.ItemIndicator>
											<CheckIcon />
										</Combobox.ItemIndicator>
									</span>
									<span className="col-start-2 text-gray-700 dark:text-gray-200">
										{item.label}
									</span>
								</Combobox.Item>
							)}
						</Combobox.List>
					</Combobox.Popup>
				</Combobox.Positioner>
			</Combobox.Portal>
		</Combobox.Root>
	);
}

const sortOptions = [
	{ value: "newest", label: "Newest first" },
	{ value: "oldest", label: "Oldest first" },
];

function SortSelect({
	sortOrder,
	onChange,
}: {
	sortOrder: SortOrder;
	onChange: (value: SortOrder) => void;
}) {
	return (
		<Select.Root
			value={sortOrder}
			onValueChange={(value) => onChange(value as SortOrder)}
			items={sortOptions}
		>
			<Select.Trigger className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm whitespace-nowrap text-gray-700 transition-colors select-none hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
				<Select.Value>
					{() =>
						sortOptions.find((o) => o.value === sortOrder)?.label ??
						"Newest first"
					}
				</Select.Value>
				<Select.Icon className="flex">
					<ChevronUpDownIcon />
				</Select.Icon>
			</Select.Trigger>
			<Select.Portal>
				<Select.Positioner
					className="z-50 outline-hidden"
					sideOffset={8}
					align="start"
					alignItemWithTrigger={false}
				>
					<Select.Popup className="min-w-[var(--anchor-width)] origin-[var(--transform-origin)] rounded-lg border border-gray-200 bg-white py-1 shadow-lg transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 dark:border-gray-600 dark:bg-gray-800">
						{sortOptions.map((option) => (
							<Select.Item
								key={option.value}
								value={option.value}
								className="grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 px-3 py-2 text-sm leading-4 outline-hidden select-none data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-700"
							>
								<Select.ItemIndicator className="col-start-1">
									<CheckIcon />
								</Select.ItemIndicator>
								<Select.ItemText className="col-start-2 text-gray-700 dark:text-gray-200">
									{option.label}
								</Select.ItemText>
							</Select.Item>
						))}
					</Select.Popup>
				</Select.Positioner>
			</Select.Portal>
		</Select.Root>
	);
}

function ChevronUpDownIcon() {
	return (
		<svg
			width="8"
			height="12"
			viewBox="0 0 8 12"
			fill="none"
			stroke="currentcolor"
			strokeWidth="1.5"
		>
			<path d="M0.5 4.5L4 1.5L7.5 4.5" />
			<path d="M0.5 7.5L4 10.5L7.5 7.5" />
		</svg>
	);
}

function CheckIcon() {
	return (
		<svg fill="currentcolor" width="10" height="10" viewBox="0 0 10 10">
			<path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
		</svg>
	);
}

// List of model names to pin at the top
const pinnedModelNames = [
	"@cf/moonshotai/kimi-k2.6",
	"@cf/zai-org/glm-4.7-flash",
	"@cf/openai/gpt-oss-120b",
	"@cf/meta/llama-4-scout-17b-16e-instruct",
];

const ModelCatalog = ({
	models,
	basePath = "/ai/models",
}: {
	models: ModelCardData[];
	basePath?: string;
}) => {
	const [filters, setFilters] = useState<Filters>({
		search: "",
		authors: [],
		tasks: [],
		capabilities: [],
	});
	const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
	const initializedRef = useRef(false);

	// Sort models by pinned status first, then by created_at date
	const sortedModels = useMemo(() => {
		return [...models].sort((a, b) => {
			// First check if either model is pinned
			const isPinnedA = pinnedModelNames.includes(a.name);
			const isPinnedB = pinnedModelNames.includes(b.name);

			// If pinned status differs, prioritize pinned models
			if (isPinnedA && !isPinnedB) return -1;
			if (!isPinnedA && isPinnedB) return 1;

			// If both are pinned, sort by position in pinnedModelNames array (for manual ordering)
			if (isPinnedA && isPinnedB) {
				return (
					pinnedModelNames.indexOf(a.name) - pinnedModelNames.indexOf(b.name)
				);
			}

			// If neither is pinned, sort by created_at date
			const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
			const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
			return sortOrder === "newest"
				? dateB.getTime() - dateA.getTime()
				: dateA.getTime() - dateB.getTime();
		});
	}, [models, sortOrder]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);

		const search = params.get("search") ?? "";
		const authors = params.getAll("authors");
		const tasks = params.getAll("tasks");
		const capabilities = params.getAll("capabilities");

		setFilters({
			search,
			authors,
			tasks,
			capabilities,
		});
		initializedRef.current = true;
	}, []);

	useEffect(() => {
		if (!initializedRef.current) return;

		const params = new URLSearchParams();

		if (filters.search) {
			params.set("search", filters.search);
		}

		if (filters.authors.length > 0) {
			filters.authors.forEach((author) => params.append("authors", author));
		}

		if (filters.tasks.length > 0) {
			filters.tasks.forEach((task) => params.append("tasks", task));
		}

		if (filters.capabilities.length > 0) {
			filters.capabilities.forEach((capability) =>
				params.append("capabilities", capability),
			);
		}

		setSearchParams(params);
	}, [filters]);

	const mapped = sortedModels.map((model) => ({
		model: {
			...model,
			capabilities: getCapabilities(model.properties),
		},
		model_display_name: model.name.split("/").at(-1),
	}));

	const getAuthorDisplayName = (id: string) => authorData[id]?.name ?? id;

	const taskItems: FilterItem[] = useMemo(
		() =>
			[...new Set(models.map((model) => model.task.name))]
				.sort()
				.map((t) => ({ value: t, label: t })),
		[models],
	);

	const authorItems: FilterItem[] = useMemo(
		() =>
			[
				...new Map(
					models
						.map((model) => getModelAuthor(model.name))
						.map((id) => [getAuthorDisplayName(id), id] as const),
				).values(),
			]
				.sort((a, b) =>
					getAuthorDisplayName(a).localeCompare(getAuthorDisplayName(b)),
				)
				.map((a) => ({ value: a, label: getAuthorDisplayName(a) })),
		[models],
	);

	const capabilityItems: FilterItem[] = useMemo(
		() =>
			[
				...getLabelsByCategory(models, "model"),
				...getLabelsByCategory(models, "platform"),
			].map((c) => ({ value: c, label: c })),
		[models],
	);

	const modelList = mapped.filter(({ model }) => {
		if (filters.authors.length > 0) {
			const selectedAuthorNames = new Set(
				filters.authors.map(getAuthorDisplayName),
			);
			const modelAuthorName = getAuthorDisplayName(getModelAuthor(model.name));
			if (!selectedAuthorNames.has(modelAuthorName)) {
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
			if (!model.name.toLowerCase().includes(filters.search.toLowerCase())) {
				return false;
			}
		}

		return true;
	});

	const hasActiveFilters =
		filters.authors.length > 0 ||
		filters.tasks.length > 0 ||
		filters.capabilities.length > 0;

	return (
		<div className="not-content">
			{/* Toolbar */}
			<div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
				{/* Search input */}
				<div className="relative flex-1">
					<svg
						className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						type="text"
						className="w-full rounded-lg border border-gray-200 bg-white py-2 pr-3 pl-9 text-sm outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						placeholder="Search models"
						value={filters.search}
						onChange={(e) => setFilters({ ...filters, search: e.target.value })}
					/>
				</div>

				{/* Filter dropdowns */}
				<div className="flex flex-wrap items-center gap-2">
					<FilterDropdown
						label="Task Types"
						items={taskItems}
						selected={filters.tasks}
						onChange={(tasks) => setFilters({ ...filters, tasks })}
					/>
					<FilterDropdown
						label="Capabilities"
						items={capabilityItems}
						selected={filters.capabilities}
						onChange={(capabilities) =>
							setFilters({ ...filters, capabilities })
						}
					/>
					<FilterDropdown
						label="Authors"
						items={authorItems}
						selected={filters.authors}
						onChange={(authors) => setFilters({ ...filters, authors })}
					/>
					<SortSelect sortOrder={sortOrder} onChange={setSortOrder} />
				</div>
			</div>

			{/* Active filters + count */}
			<div className="mb-4 flex items-center gap-3">
				<span className="text-sm text-gray-600 dark:text-gray-400">
					We found{" "}
					<span className="font-semibold text-gray-900 dark:text-gray-100">
						{modelList.length}
					</span>{" "}
					{modelList.length === 1 ? "model" : "models"}
				</span>
				{hasActiveFilters && (
					<button
						type="button"
						onClick={() =>
							setFilters({
								...filters,
								authors: [],
								tasks: [],
								capabilities: [],
							})
						}
						className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
					>
						Clear filters
					</button>
				)}
			</div>

			{/* Model cards grid */}
			<div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
				{modelList.length === 0 && (
					<div className="col-span-full flex w-full flex-col justify-center rounded-md border bg-gray-50 py-6 text-center align-middle dark:border-gray-500 dark:bg-gray-800">
						<span className="text-lg font-bold">No models found</span>
						<p>
							Try a different search term, or broaden your search by removing
							filters.
						</p>
					</div>
				)}
				{modelList.map((model) => {
					const isBeta = hasProperty(model.model.properties, "beta");

					const author = getModelAuthor(model.model.name);
					const authorInfo = authorData[author];
					const isPinned = pinnedModelNames.includes(model.model.name);

					return (
						<a
							key={model.model.id}
							className="relative flex flex-col rounded-md border border-solid border-gray-200 p-3 text-inherit no-underline hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
							href={`${basePath}/${basePath === "/workers-ai/models" ? model.model.name.split("/").at(-1) : model.model.name}/`}
						>
							{isPinned && (
								<span className="absolute top-1 right-2" title="Pinned model">
									📌
								</span>
							)}
							<div className="-mb-1 flex items-center">
								{authorInfo?.logo ? (
									<img
										className="mr-2 block w-6 rounded-xs p-0.5 dark:bg-gray-200 dark:ring-2 dark:ring-gray-200"
										src={authorInfo.logo}
										alt={`${authorInfo.name} logo`}
									/>
								) : (
									<div className="mr-2 flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-sm font-black text-gray-400 uppercase">
										{author.slice(0, 1)}
									</div>
								)}
								<span className="overflow-hidden text-lg font-semibold text-ellipsis whitespace-nowrap">
									{model.model_display_name}
								</span>
								{isBeta && <span className="sl-badge caution ml-1">Beta</span>}
							</div>
							<div className="text-xs">
								<ModelInfo model={model.model} />
							</div>
							<p className="mt-2 line-clamp-2 flex-1 text-sm leading-6">
								{model.model.description}
							</p>
							<div className="mt-2 min-h-6 text-xs">
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
