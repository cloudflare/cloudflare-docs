/**
 * Read documentation intended only for the interactive config explorer.
 *
 * Type declarations may use these repeatable, namespaced JSDoc tags:
 *
 * @configExplorerDescription A concise description for the explorer.
 * @configExplorerLink https://developers.cloudflare.com/example/ Link label
 */
export function configExplorerMetadata(docs, subject) {
	const descriptions = docs.tags.configExplorerDescription ?? [];
	if (descriptions.length > 1) {
		throw new Error(
			`${subject} has more than one @configExplorerDescription tag`,
		);
	}
	const description = descriptions[0] || docs.description;
	const links = (docs.tags.configExplorerLink ?? []).map((value) => {
		const separator = value.search(/\s/);
		const url = separator === -1 ? value : value.slice(0, separator);
		const label = separator === -1 ? "" : value.slice(separator).trim();
		let parsed;
		try {
			parsed = new URL(url);
		} catch {
			throw new Error(
				`${subject} has an invalid @configExplorerLink URL: ${url}`,
			);
		}
		if (parsed.protocol !== "https:" || !label) {
			throw new Error(
				`${subject} must use @configExplorerLink <https-url> <label>`,
			);
		}
		return { label, url };
	});
	return {
		description,
		...(links.length ? { links } : {}),
	};
}
