import { Combobox } from "@base-ui/react/combobox";

export interface FilterItem {
	value: string;
	label: string;
}

/**
 * Searchable multi-select dropdown for catalog filter controls.
 * Controlled — parent owns selection state and event dispatching.
 */
export function FilterDropdown({
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
	const triggerContent = (
		<span className="inline-flex items-center gap-1.5">
			{label}
			{hasSelection && (
				<span className="bg-primary text-primary-foreground grid min-w-[1.25rem] place-items-center rounded-full px-1.5 text-[0.6875rem] font-semibold">
					{selected.length}
				</span>
			)}
		</span>
	);
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
				className={`bg-card flex h-10 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-sm whitespace-nowrap transition-colors select-none ${
					hasSelection
						? "border-primary text-primary"
						: "border-border text-foreground hover:border-border-strong"
				}`}
			>
				<Combobox.Value placeholder={triggerContent}>
					{() => triggerContent}
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
						className="border-border bg-card max-h-[24rem] max-w-[var(--available-width)] origin-[var(--transform-origin)] rounded-lg border shadow-lg transition-[transform,scale,opacity] [--input-height:2.75rem] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0"
						aria-label={label}
					>
						<div className="w-64 p-2">
							<Combobox.Input
								placeholder={`Search ${label.toLowerCase()}...`}
								className="border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:outline-ring h-9 w-full rounded-md border px-3 text-sm font-normal focus-visible:border-transparent focus-visible:outline-2 focus-visible:outline-offset-2"
							/>
						</div>
						<Combobox.Empty>
							<div className="text-muted-foreground px-4 py-3 text-sm">
								No results found.
							</div>
						</Combobox.Empty>
						<Combobox.List className="max-h-[min(calc(24rem-var(--input-height)),calc(var(--available-height)-var(--input-height)))] scroll-py-1 overflow-y-auto overscroll-contain py-1">
							{(item: FilterItem) => (
								<Combobox.Item
									key={item.value}
									value={item}
									className="group data-[highlighted]:bg-accent grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 px-3 py-2 text-sm leading-4 outline-hidden select-none"
								>
									<span className="border-border group-data-[selected]:border-primary group-data-[selected]:bg-primary group-data-[selected]:text-primary-foreground col-start-1 flex h-4 w-4 items-center justify-center rounded border">
										<Combobox.ItemIndicator>
											<CheckIcon />
										</Combobox.ItemIndicator>
									</span>
									<span className="text-foreground col-start-2">
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
			strokeWidth={1.5}
			className="text-muted-foreground"
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
