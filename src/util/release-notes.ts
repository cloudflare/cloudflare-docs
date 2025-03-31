import { getCollection } from "astro:content";

export async function getReleaseNotes(opts?: {
	filter?: Parameters<typeof getCollection<"release-notes">>[1];
	wranglerOnly?: boolean;
	deprecationsOnly?: boolean;
}) {
	let releaseNotes;

	if (opts?.filter) {
		releaseNotes = await getCollection("release-notes", opts.filter);
	} else {
		releaseNotes = await getCollection("release-notes");
	}

	if (!releaseNotes) {
		throw new Error(
			`[getReleaseNotes] Unable to find any releaseNotes with ${JSON.stringify(opts)}`,
		);
	}

	if (opts?.deprecationsOnly) {
		releaseNotes = releaseNotes.filter((x) => x.id === "api-deprecations");
	} else {
		releaseNotes = releaseNotes.filter((x) => x.id !== "api-deprecations");
	}

	const products = [
		...new Set(releaseNotes.flatMap((x) => x.data.productName)),
	];
	const productAreas = [
		...new Set(releaseNotes.flatMap((x) => x.data.productArea)),
	];

	const mapped = releaseNotes.flatMap((product) => {
		return product.data.entries.map((entry) => {
			return {
				product: product.data.productName,
				link: product.data.link,
				date: entry.publish_date,
				description: entry.description,
				title: entry.title,
				scheduled: entry.scheduled,
				productLink: product.data.productLink,
				productAreaName: product.data.productArea,
				productAreaLink: product.data.productAreaLink,
				individual_page: entry.individual_page && entry.link,
			};
		});
	});

	const grouped = Object.entries(Object.groupBy(mapped, (entry) => entry.date));
	const entries = grouped.sort().reverse();

	return { products, productAreas, releaseNotes: entries };
}
