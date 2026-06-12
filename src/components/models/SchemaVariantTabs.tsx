import { useEffect, useRef, useState } from "react";

interface Props {
	titles: string[];
	/**
	 * Optional ID of an element whose `data-active-variant` attribute should
	 * be updated. Defaults to the closest ancestor with `data-variant-section`.
	 */
	targetId?: string;
}

/**
 * Top-level variant selector used to drive both the Input and Output schema
 * panels from a single control. This component owns no schema rendering — it
 * just toggles `data-active-variant` on its scoping ancestor (or the element
 * referenced by `targetId`). CSS in the parent then shows/hides the matching
 * server-rendered schema panels.
 *
 * Server-rendered default: the first variant is visible without JS.
 */
export default function SchemaVariantTabs({ titles, targetId }: Props) {
	const [selected, setSelected] = useState(0);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const title = titles[selected];
		if (!title) return;
		const target = targetId
			? document.getElementById(targetId)
			: rootRef.current?.closest<HTMLElement>("[data-variant-section]");
		if (!target) return;
		target.dataset.activeVariant = title;
		// Toggle visibility of every variant pane under this section. The
		// server-rendered `hidden` attribute provides a correct default before
		// hydration; this just keeps it in sync when the user switches.
		const panes = target.querySelectorAll<HTMLElement>("[data-variant-pane]");
		panes.forEach((pane) => {
			pane.hidden = pane.dataset.variantPane !== title;
		});
	}, [selected, titles, targetId]);

	return (
		<div ref={rootRef}>
			<fieldset className="p-0">
				<legend className="sr-only">Schema variant</legend>
				<div className="mt-0 flex gap-x-3">
					{titles.map((title, index) => {
						const isSelected = selected === index;
						return (
							<button
								key={title}
								type="button"
								onClick={() => setSelected(index)}
								aria-pressed={isSelected}
								className={`mt-0 flex flex-1 cursor-pointer flex-col justify-start rounded-lg border p-3 text-left transition-colors ${
									isSelected
										? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950"
										: "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
								}`}
							>
								<span
									className={`text-sm font-medium ${isSelected ? "text-blue-700 dark:text-blue-300" : "text-gray-900 dark:text-gray-100"}`}
								>
									{title}
								</span>
							</button>
						);
					})}
				</div>
			</fieldset>
		</div>
	);
}
