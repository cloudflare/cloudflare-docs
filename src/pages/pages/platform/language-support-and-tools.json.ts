import { getCollection } from "astro:content";

export async function GET() {
	const entries = await getCollection("pages-build-environment");

	const data = entries.flatMap((x) => {
		// enable_date/status are passthrough YAML fields, not declared in the
		// collection schema, so Zod types them as `unknown`.
		x.data.enable_date = new Date(
			x.data.enable_date as string | number | Date,
		).toISOString();

		return {
			...x.data,
			status: x.data.status ?? null,
		};
	});

	return Response.json(data);
}
