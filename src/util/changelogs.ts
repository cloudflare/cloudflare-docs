import { getCollection, z } from "astro:content";
import { type CollectionEntry } from "astro:content";

export async function getChangelogs(filter?: Function) {
	const changelogs = await getCollection("changelogs", filter);

	const products = [...new Set(changelogs.flatMap((x) => x.data.productName))];
	const productAreas = [...new Set(changelogs.flatMap((x) => x.data.productArea))];

	const mapped = changelogs.flatMap((product) => {
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
			};
		});
	});

	const grouped = Object.entries(Object.groupBy(mapped, (entry) => entry.date));
	const entries = grouped.sort().reverse();

	return { products, productAreas, changelogs: entries };
}

export async function getWranglerChangelog(): Promise<
	CollectionEntry<"changelogs">
> {
	const response = await fetch(
		"https://api.github.com/repos/cloudflare/workers-sdk/releases",
	);

	if (!response.ok) {
		throw new Error(
			`[GetWranglerChangelog] Received ${response.status} response from GitHub API.`,
		);
	}

	const json = await response.json();

	let releases = z
		.object({
			published_at: z.coerce.date(),
			name: z.string(),
			body: z.string(),
		})
		.array()
		.parse(json);

	releases = releases.filter(x => x.name.startsWith("wrangler@"))

	return {
		// @ts-expect-error id is a union of on-disk YAML files but we're adding this one dynamically
		id: "wrangler",
		collection: "changelogs",
		data: {
			link: "/workers/platform/changelog/wrangler/",
			productName: "wrangler",
			productLink: "/workers/wrangler/",
			productArea: "Developer platform",
			productAreaLink: "/workers/platform/changelog/platform/",
			entries: releases.map((release) => {
				return {
					publish_date: release.published_at.toISOString().substring(0, 10),
					title: release.name.split("@")[1],
					link: `https://github.com/cloudflare/workers-sdk/releases/tag/wrangler%40${release.name.split("@")[1]}`,
					description: release.body,
				};
			}),
		},
	};
}
