import { getImage } from "astro:assets";
import { type CollectionEntry, getEntry } from "astro:content";

const DEFAULT_OG_IMAGE = "/cf-twitter-card.png";

const CHANGELOG_OG_IMAGE = "/changelog-preview.png";

const PRODUCT_AREA_OG_IMAGES: Record<string, string> = {
	"cloudflare essentials": "/core-services-preview.png",
	"cloudflare one": "/zt-preview.png",
	"developer platform": "/dev-products-preview.png",
	"network security": "/core-services-preview.png",
	"application performance": "/core-services-preview.png",
	"application security": "/core-services-preview.png",
};

export async function getOgImage(entry: CollectionEntry<"docs" | "changelog">) {
	if (entry.data.preview_image) {
		if (!entry.data.preview_image.src) {
			throw new Error(
				`${entry.id} has a preview_image property in frontmatter that is not a valid image path`,
			);
		}

		const image = await getImage({
			src: entry.data.preview_image,
			format: "png",
		});

		return image.src;
	}

	if (entry.collection === "changelog") {
		return CHANGELOG_OG_IMAGE;
	}

	const section = entry.id.split("/").filter(Boolean).at(0);

	if (!section) {
		return DEFAULT_OG_IMAGE;
	}

	const product = await getEntry("products", section);

	if (product && product.data.product.group) {
		const image =
			PRODUCT_AREA_OG_IMAGES[product.data.product.group.toLowerCase()];

		if (image) {
			return image;
		}
	}

	return DEFAULT_OG_IMAGE;
}
