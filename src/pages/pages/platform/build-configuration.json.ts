import { getEntry } from "astro:content";

export async function GET() {
	const entries = await getEntry("pages-framework-presets", "index");

	if (!entries) {
		throw new Error("Failed to load data");
	}

	const sorted = Object.fromEntries(
		Object.entries(entries.data.build_configs).sort(),
	);

	return Response.json(sorted);
}
