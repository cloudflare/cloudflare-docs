import { z } from "astro/zod";

import { middlecache } from "../util/custom-loaders";

const schema = z.string().nullable();

const collectionConfig = {
	loader: middlecache("v1/products/maturity_compliance.json", {
		parser: (fileContent: string) => {
			const data = JSON.parse(fileContent);
			const lookup: Record<string, string | null> = {};

			for (const item of data) {
				lookup[item.name] = item.maturity;
			}

			return lookup;
		},
	}),
	schema,
};

export { collectionConfig, schema };
