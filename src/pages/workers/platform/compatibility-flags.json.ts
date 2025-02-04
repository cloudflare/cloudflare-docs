import { getCollection } from "astro:content";

export async function GET() {
	const entries = await getCollection("compatibility-flags");

	entries.sort((a, b) => a.data.sort_date.localeCompare(b.data.sort_date));

	const flags = entries.flatMap((x) => {
		if (!x.data.enable_flag) {
			x.data.enable_flag = null;
		}

		if (!x.data.enable_date) {
			x.data.enable_date = null;
		}

		if (!x.data.disable_flag) {
			x.data.disable_flag = null;
		}

		// omit sort_date from output
		const { sort_date: _, ...data } = x.data;
		return {
			...data,
			description: x.body?.trim(),
			experimental: x.data.experimental ?? false,
		};
	});

	return Response.json(flags);
}
