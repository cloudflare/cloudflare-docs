import { z } from "astro/zod";
import type { CollectionConfig } from "astro/content/config";

import { middlecacheLoader } from "../../util/custom-loaders";

const productAvailabilityCollectionSchema = z.object({
	availability: z.string().nullable(),
});

const productAvailabilityCollectionConfig: CollectionConfig<
	typeof productAvailabilityCollectionSchema
> = {
	loader: middlecacheLoader("v1/products/availability_certification.json", {
		parser: (fileContent: string) => {
			const data = JSON.parse(fileContent);
			const lookup: Record<string, { availability: string | null }> = {};

			for (const item of data) {
				lookup[item.name] = { availability: item.availability };
			}

			return lookup;
		},
	}),
	schema: productAvailabilityCollectionSchema,
};

export {
	productAvailabilityCollectionConfig,
	productAvailabilityCollectionSchema,
};
