import { Combobox } from "@base-ui/react/combobox";

export interface FilterItem {
	value: string;
	label: string;
}

/**
 * Searchable multi-select dropdown for catalog filter controls.
 *
 * Fires a "model-catalog-filter" CustomEvent on the document when the
 * selection changes, so the Astro catalog script can respond without
 * React owning catalog state.
 */
export function FilterDropdown({
	label,
	filterKey,
	items,
	selected,
	onChange,
}: {
	label: string;
	filterKey: string;
	items: FilterItem[];
	selected: string[];
	onChange: (selected: string[]) => void;
}) {
	const hasSelection = selected.length > 0;
	const triggerLabel = hasSelection ? `${label} (+${selected.length})` : label;
	const selectedItems = items.filter((item) => selected.includes(item.value));

	function handleChange(value: unknown) {
		const next = (value as FilterItem[]).map((item) => item.value);
		onChange(next);
		document.dispatchEvent(
			new CustomEvent("model-catalog-filter", {
				detail: { key: filterKey, value: next },
			}),
		);
	}

	return (
		<Combobox.Root
			multiple
			value={selectedItems}
			onValueChange={handleChange}
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
