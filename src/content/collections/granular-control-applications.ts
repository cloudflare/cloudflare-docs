import { z } from "astro/zod";
import type { CollectionConfig } from "astro/content/config";

import { middlecacheLoader } from "../../util/custom-loaders";

const applicationSchema = z.object({
	name: z.string(),
	display_name: z.string(),
});

const granularControlApplicationsSchema = z.object({
	display_id: z.string(),
	applications: z.array(applicationSchema),
});

//const granularControlApplicationsSchema = z.array(categorySchema);

const granularControlApplicationsCollectionConfig: CollectionConfig<
	typeof granularControlApplicationsSchema
> = {
	loader: middlecacheLoader("v1/application-controls/applications.json", {
		parser: (fileContent: string) => {
			const data = JSON.parse(fileContent);
			const lookup: Record<
				string,
				{
					display_id: string;
					applications: [{ name: string; display_name: string }];
				}
			> = {};

			for (const item of data) {
				const display_id = item.category
					.split("-")
					.map((w: string) => w[0].toUpperCase() + w.substring(1).toLowerCase())
					.join(" ");

				lookup[item.category] = {
					display_id: display_id,
					applications: item.applications,
				};
			}
			return lookup;
		},
	}),
	schema: granularControlApplicationsSchema,
};

export {
	granularControlApplicationsCollectionConfig,
	granularControlApplicationsSchema,
};
