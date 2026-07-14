import type { ModelCardData } from "./model-types";

export type PropertyCategory = "model" | "platform";

// "model" badges describe what a model can do; "platform" badges describe
// Workers AI platform features.
export const CAPABILITY_PROPERTIES: Record<
  string,
  { label: string; category: PropertyCategory }
> = {
  function_calling: { label: "Function calling", category: "model" },
  reasoning: { label: "Reasoning", category: "model" },
  vision: { label: "Vision", category: "model" },
  zdr: { label: "Zero data retention", category: "model" },
  lora: { label: "LoRA", category: "platform" },
  partner: { label: "Partner", category: "platform" },
  async_queue: { label: "Batch", category: "platform" },
  realtime: { label: "Real-time", category: "platform" },
};

/**
 * Unique capability labels for a category, in first-seen order across the
 * given models. Used to build the category-grouped Capabilities facet.
 */
export function getLabelsByCategory(
  models: ModelCardData[],
  category: PropertyCategory,
): string[] {
  const ids = Object.entries(CAPABILITY_PROPERTIES)
    .filter(([, def]) => def.category === category)
    .map(([id]) => id);
  const seen = new Set<string>();
  for (const m of models)
    for (const p of m.propertiesList)
      if (ids.includes(p.property_id) && p.value === "true")
        seen.add(CAPABILITY_PROPERTIES[p.property_id].label);
  return [...seen];
}
