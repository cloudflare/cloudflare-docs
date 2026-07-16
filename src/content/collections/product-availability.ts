import { z } from "astro/zod";
import type { CollectionConfig } from "astro/content/config";

import { middlecacheLoader } from "../../util/custom-loaders";

const productAvailabilitySchema = z.object({
	availability: z.string().nullable(),
});

type ProductAvailability = z.infer<typeof productAvailabilitySchema>;

const productAvailabilityCollectionConfig: CollectionConfig<
	typeof productAvailabilitySchema
> = {
	loader: middlecacheLoader(
		"v1/products/reconciled-availability-certification.json",
		{
			parser: (fileContent: string) => {
				const data = JSON.parse(fileContent);
				const lookup: Record<string, ProductAvailability> = {};

				for (const item of data) {
					lookup[item.id] = { availability: item.availability };
				}

				return lookup;
			},
		},
	),
	schema: productAvailabilitySchema,
};

export { productAvailabilityCollectionConfig, productAvailabilitySchema };
