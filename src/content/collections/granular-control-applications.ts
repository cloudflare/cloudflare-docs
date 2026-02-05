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

type GranularControlApplications = z.infer<
	typeof granularControlApplicationsSchema
>;

const granularControlApplicationsCollectionConfig: CollectionConfig<
	typeof granularControlApplicationsSchema
> = {
	loader: middlecacheLoader("v1/application-controls/applications.json", {
		parser: (fileContent: string) => {
			const data = JSON.parse(fileContent);

			const lookup: Record<string, GranularControlApplications> = {};

			for (const item of data) {
				let display_id = "Uncategorized";
				if (item.category && typeof item.category === "string")
					display_id = item.category
						.replace(/-/g, " ")
						.replace(
							/\w\S*/g,
							(txt: string) =>
								txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
						);

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
