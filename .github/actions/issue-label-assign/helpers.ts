export function extractDeveloperDocsPaths(content: string): string[] {
	const regex = /https?:\/\/developers\.cloudflare\.com([^\s|)]*)/gm;
	const links: string[] = [];
	let match;

	while ((match = regex.exec(content)) !== null) {
		const pathname = match[1]?.replace(/[.,;:!?]+$/, "");
		if (pathname !== undefined) links.push(pathname.toLowerCase());
	}

	return links;
}

export function shouldSkipEditedEvent(
	action: string | undefined,
	changes: { body?: unknown } | undefined,
): boolean {
	return action === "edited" && changes?.body === undefined;
}

export async function removeStaleProductLabels(
	currentLabels: Iterable<string>,
	newLabels: ReadonlySet<string>,
	removeLabel: (label: string) => Promise<unknown>,
): Promise<void> {
	if (newLabels.size === 0) return;

	for (const label of currentLabels) {
		if (newLabels.has(label)) continue;

		try {
			await removeLabel(label);
		} catch (error) {
			if (
				typeof error === "object" &&
				error !== null &&
				"status" in error &&
				error.status === 404
			) {
				continue;
			}
			throw error;
		}
	}
}
