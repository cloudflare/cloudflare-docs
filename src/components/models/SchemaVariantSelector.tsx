import { useState } from "react";
import SchemaTree from "./SchemaTree.tsx";
import type { SchemaRowData } from "./types";

interface SchemaVariant {
	title: string;
	description?: string;
	rows: SchemaRowData[];
}

interface SchemaVariantSelectorProps {
	variants: SchemaVariant[];
	schemaId: string;
	hideRequired?: boolean;
}

// Map variant titles to descriptions
const variantDescriptions: Record<string, string> = {
	Prompt: "Simple text input for single-turn interactions",
	Messages:
		"Structured conversation format with roles (user, assistant, system)",
};

export default function SchemaVariantSelector({
	variants,
	schemaId,
	hideRequired,
}: SchemaVariantSelectorProps) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const selectedVariant = variants[selectedIndex];

	return (
		<div>
			{/* Variant selector */}
			<fieldset className="p-0">
				<legend className="sr-only">Input format</legend>
				<div className="mt-0 flex gap-x-3">
					{variants.map((variant, index) => {
						const isSelected = selectedIndex === index;
						const description = variantDescriptions[variant.title];
						return (
							<button
								key={variant.title}
								type="button"
								onClick={() => setSelectedIndex(index)}
								className={`mt-0 flex flex-1 cursor-pointer flex-col justify-start rounded-lg border p-3 text-left transition-colors ${
									isSelected
										? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950"
										: "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
								}`}
							>
								<span
									className={`text-sm font-medium ${isSelected ? "text-blue-700 dark:text-blue-300" : "text-gray-900 dark:text-gray-100"}`}
								>
									{variant.title}
								</span>
								{description && (
									<p
										className={`text-xs ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}
									>
										{description}
									</p>
								)}
							</button>
						);
					})}
				</div>
			</fieldset>

			{/* Selected variant content */}
			{selectedVariant.rows.length === 0 ? (
				<p className="text-sm text-gray-500 dark:text-gray-400">
					No parameters defined.
				</p>
			) : (
				<SchemaTree
					rows={selectedVariant.rows}
					schemaId={`${schemaId}-${selectedVariant.title.toLowerCase().replace(/\s+/g, "-")}`}
					hideRequired={hideRequired}
				/>
			)}
		</div>
	);
}
