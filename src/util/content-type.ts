/**
 * Formats a content type string by capitalizing the first letter and replacing hyphens with spaces
 * @param contentType - The content type string to format
 * @returns The formatted content type string
 */
export function formatContentType(contentType: string): string {
	return contentType
		? (contentType.charAt(0).toUpperCase() + contentType.slice(1)).replaceAll(
				"-",
				" ",
			)
		: "";
}
