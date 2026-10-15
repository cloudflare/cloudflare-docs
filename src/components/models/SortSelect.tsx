import { Select } from "@base-ui/react/select";

export type SortOrder = "newest" | "oldest";

const sortOptions: { value: SortOrder; label: string }[] = [
	{ value: "newest", label: "Newest first" },
	{ value: "oldest", label: "Oldest first" },
];

/**
 * Single-select dropdown for model sort order.
 * Controlled — parent owns state and event dispatching.
 */
export function SortSelect({
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
			<Select.Trigger className="border-border bg-card text-foreground hover:border-border-strong flex h-10 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-sm whitespace-nowrap transition-colors select-none">
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
					<Select.Popup className="border-border bg-card min-w-[var(--anchor-width)] origin-[var(--transform-origin)] rounded-lg border py-1 shadow-lg transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
						{sortOptions.map((option) => (
							<Select.Item
								key={option.value}
								value={option.value}
								className="data-[highlighted]:bg-accent grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 px-3 py-2 text-sm leading-4 outline-hidden select-none"
							>
								<Select.ItemIndicator className="col-start-1">
									<CheckIcon />
								</Select.ItemIndicator>
								<Select.ItemText className="text-foreground col-start-2">
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
