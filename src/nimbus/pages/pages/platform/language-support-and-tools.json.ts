import { getCollection } from "astro:content";

export async function GET() {
	const entries = await getCollection("pages-build-environment");

	const data = entries.flatMap((x) => {
		x.data.enable_date = new Date(x.data.enable_date).toISOString();

		return {
			...x.data,
			status: x.data.status ?? null,
		};
	});

	return Response.json(data);
}
