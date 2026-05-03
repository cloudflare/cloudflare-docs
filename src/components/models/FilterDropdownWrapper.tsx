import { useState, useEffect } from "react";
import { FilterDropdown, type FilterItem } from "./FilterDropdown";

/**
 * Self-contained wrapper that reads initial selection from URL params on mount
 * and fires "model-catalog-filter" CustomEvents when the selection changes.
 * The Astro catalog script listens to these events to update card visibility.
 */
export function FilterDropdownWrapper({
	label,
	filterKey,
	items,
}: {
	label: string;
	filterKey: string;
	items: FilterItem[];
}) {
	const [selected, setSelected] = useState<string[]>([]);

	// Self-initialise from URL on mount; also listen for clear events
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const initial = params.getAll(filterKey);
		if (initial.length > 0) {
			setSelected(initial);
			// Fire event so the Astro script applies the initial filter pass
			document.dispatchEvent(
				new CustomEvent("model-catalog-filter", {
					detail: { key: filterKey, value: initial },
				}),
			);
		}

		function onClear() {
			setSelected([]);
		}
		document.addEventListener("model-catalog-clear", onClear);
		return () => document.removeEventListener("model-catalog-clear", onClear);
	}, []);

	function handleChange(next: string[]) {
		setSelected(next);
		document.dispatchEvent(
			new CustomEvent("model-catalog-filter", {
				detail: { key: filterKey, value: next },
			}),
		);
	}

	return (
		<FilterDropdown
			label={label}
			filterKey={filterKey}
			items={items}
			selected={selected}
			onChange={handleChange}
		/>
	);
}
