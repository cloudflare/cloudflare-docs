import { useState } from "react";
import SchemaTree from "./SchemaTree.tsx";
import type { SchemaRowData } from "./types";

/**
 * SchemaVariantSelector — inline request-format picker (e.g. Prompt vs
 * Messages) that owns its own tree rendering.
 */

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
										? "border-primary bg-primary/10"
										: "border-border bg-card hover:border-muted-foreground/40"
								}`}
							>
								<span
									className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}
								>
									{variant.title}
								</span>
								{description && (
									<p
										className={`text-xs ${isSelected ? "text-primary/80" : "text-muted-foreground"}`}
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
				<p className="text-sm text-muted-foreground">No parameters defined.</p>
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
