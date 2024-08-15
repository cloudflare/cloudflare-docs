import { getEntry } from "astro:content";
import { getProperty } from "dot-prop";

export async function indexPlans(id: string) {
	const { data } = await getEntry("plans", "index");

	const plan = getProperty(data, id);

	if (!plan) {
		throw new Error(`[IndexPlans] Failed to find ${id} in plans JSON.`);
	}

	return plan;
}
