import { z } from "astro/zod";

import { middlecacheLoader } from "../../util/custom-loaders";

const productAvailabilityCollectionSchema = z.string().nullable();

const productAvailabilityCollectionConfig = {
	loader: middlecacheLoader("v1/products/availability_certification.json", {
		parser: (fileContent: string) => {
			const data = JSON.parse(fileContent);
			const lookup: Record<string, string | null> = {};

			for (const item of data) {
				lookup[item.name] = item.availability;
			}

			return lookup;
		},
	}),
	productAvailabilityCollectionSchema,
};

export {
	productAvailabilityCollectionConfig,
	productAvailabilityCollectionSchema,
};
