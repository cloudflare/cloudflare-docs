import { readdir } from "fs/promises";

export function sortBySidebarOrder(a: any, b: any): number {
	const collator = new Intl.Collator("en");

	if (a.data.sidebar.order !== b.data.sidebar.order)
		return a.data.sidebar.order - b.data.sidebar.order;

	return collator.compare(a.data.title, b.data.title);
}

async function autogenSections() {
	const sections = (
		await readdir("./src/content/docs/", {
			withFileTypes: true,
		})
	)
		.filter((x) => x.isDirectory())
		.map((x) => x.name);
	return sections.map((x) => {
		return {
			label: x,
			autogenerate: {
				directory: x,
				collapsed: true,
			},
		};
	});
}

export const sidebar = await autogenSections();
