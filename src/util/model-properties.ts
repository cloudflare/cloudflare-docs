import type { WorkersAIModelsSchema } from "~/schemas";

export type PropertyCategory = "model" | "platform";

type PropertyDef = {
	label: string;
	category: PropertyCategory;
};

/**
 * Boolean properties surfaced as badges and sidebar filters.
 *
 * - "model" properties describe what a model can do (blue badges).
 * - "model" properties describe what a model can do (gray badges).
 * - "platform" properties describe Workers AI platform features (orange badges).
 *
 * Add a new property here and it propagates to ModelCatalog, ModelBadges,
 * and the sidebar filters automatically.
 */
export const CAPABILITY_PROPERTIES: Record<string, PropertyDef> = {
	// Model properties
	function_calling: { label: "Function calling", category: "model" },
	reasoning: { label: "Reasoning", category: "model" },
	vision: { label: "Vision", category: "model" },
	// Platform properties
	lora: { label: "LoRA", category: "platform" },
	partner: { label: "Partner", category: "platform" },
	async_queue: { label: "Batch", category: "platform" },
	realtime: { label: "Real-time", category: "platform" },
};

type Property = WorkersAIModelsSchema["properties"][number];

/** Extract display-name capabilities from a model's properties array. */
export function getCapabilities(properties: Property[]): string[] {
	return properties
		.filter(
			({ property_id, value }) =>
				property_id in CAPABILITY_PROPERTIES && value === "true",
		)
		.map(({ property_id }) => CAPABILITY_PROPERTIES[property_id].label);
}

/** Check if a model has a specific boolean property set to "true". */
export function hasProperty(properties: Property[], id: string): boolean {
	return properties.some(
		({ property_id, value }) => property_id === id && value === "true",
	);
}

/** Get all unique capability labels across a set of models. */
export function getAllCapabilityLabels(
	models: WorkersAIModelsSchema[],
): string[] {
	return [...new Set(models.flatMap((m) => getCapabilities(m.properties)))];
}

/** Get all unique labels for a given category across a set of models. */
export function getLabelsByCategory(
	models: WorkersAIModelsSchema[],
	category: PropertyCategory,
): string[] {
	const categoryProps = Object.entries(CAPABILITY_PROPERTIES)
		.filter(([, def]) => def.category === category)
		.map(([id]) => id);

	return [
		...new Set(
			models.flatMap((m) =>
				m.properties
					.filter(
						({ property_id, value }) =>
							categoryProps.includes(property_id) && value === "true",
					)
					.map(({ property_id }) => CAPABILITY_PROPERTIES[property_id].label),
			),
		),
	];
}

/** Look up the category for a given label. */
export function getCategoryForLabel(
	label: string,
): PropertyCategory | undefined {
	const entry = Object.values(CAPABILITY_PROPERTIES).find(
		(def) => def.label === label,
	);
	return entry?.category;
}
