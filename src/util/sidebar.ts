export function sortBySidebarOrder(a: any, b: any): number {
	const collator = new Intl.Collator("en");

	if (a.data.sidebar.order !== b.data.sidebar.order)
		return a.data.sidebar.order - b.data.sidebar.order;

	return collator.compare(a.data.title, b.data.title);
}
