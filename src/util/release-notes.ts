import { z } from "astro:schema";
import { getCollection } from "astro:content";
import { type CollectionEntry } from "astro:content";

export async function getReleaseNotes(opts?: {
	filter?: Parameters<typeof getCollection<"release-notes">>[1];
	wranglerOnly?: boolean;
	deprecationsOnly?: boolean;
}) {
	let releaseNotes;

	if (opts?.wranglerOnly) {
		releaseNotes = [await getWranglerReleases()];
	} else if (opts?.filter) {
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

export async function getWranglerReleases(): Promise<
	CollectionEntry<"release-notes">
> {
	const response = await fetch(
		"https://api.github.com/repos/cloudflare/workers-sdk/releases?per_page=100",
	);

	if (!response.ok) {
		throw new Error(
			`[GetWranglerReleases] Received ${response.status} response from GitHub API.`,
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

	releases = releases.filter((x) => x.name.startsWith("wrangler@"));

	return {
		id: "wrangler",
		collection: "release-notes",
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
