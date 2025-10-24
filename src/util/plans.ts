import { getEntry } from "astro:content";
import { getProperty } from "dot-prop";

export async function indexPlans(id: string) {
	const entry = await getEntry("plans", "index");

	if (!entry) {
		throw new Error(`[IndexPlans] Failed to load plans JSON.`);
	}

	const plan = getProperty(entry.data, id);

	if (!plan) {
		throw new Error(`[IndexPlans] Failed to find ${id} in plans JSON.`);
	}

	return plan;
}
