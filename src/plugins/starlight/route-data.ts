import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { tags as allowedTags } from "~/schemas/tags";

export const onRequest = defineRouteMiddleware(({ locals }) => {
	const { entry } = locals.starlightRoute;
	const { tags } = entry.data;

	if (tags) {
		const transformed = tags.map((tag) => {
			const values = Object.values(allowedTags).flat();

			const match = values.find(
				(val) =>
					val.label.toLowerCase() === tag.toLowerCase() ||
					val.variants?.find((v) => v.toLowerCase() === tag.toLowerCase()),
			);

			if (!match) {
				throw new Error(
					`Invalid tag on ${entry.id}: ${tag}, please refer to the style guide: https://developers.cloudflare.com/style-guide/frontmatter/tags/`,
				);
			}

			return match.label;
		});

		entry.data.tags = transformed;
	}
});
