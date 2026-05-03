import { useState, useEffect } from "react";
import { SortSelect, type SortOrder } from "./SortSelect";

/**
 * Self-contained wrapper that reads initial sort order from URL params on mount
 * and fires "model-catalog-sort" CustomEvents when the value changes.
 * The Astro catalog script listens to these events to re-sort card order.
 */
export function SortSelectWrapper() {
	const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

	// Self-initialise from URL on mount
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const initial = params.get("sort");
		if (initial === "oldest" || initial === "newest") {
			setSortOrder(initial);
			document.dispatchEvent(
				new CustomEvent("model-catalog-sort", { detail: { value: initial } }),
			);
		}
	}, []);

	function handleChange(next: SortOrder) {
		setSortOrder(next);
		document.dispatchEvent(
			new CustomEvent("model-catalog-sort", { detail: { value: next } }),
		);
	}

	return <SortSelect sortOrder={sortOrder} onChange={handleChange} />;
}
