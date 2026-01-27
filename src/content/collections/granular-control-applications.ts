import { z } from "astro/zod";

import { middlecacheLoader } from "../../util/custom-loaders";

const applicationSchema = z.object({
	name: z.string(),
	display_name: z.string(),
});

const categorySchema = z.object({
	id: z.string(),
	applications: z.array(applicationSchema),
});

const granularControlApplicationsSchema = z.array(categorySchema);

const granularControlApplicationsCollectionConfig = {
	loader: middlecacheLoader("v1/application-controls/applications.json", {
		parser: (fileContent: string) => {
			const data = JSON.parse(fileContent);

			//console.log(data);

			const categoryArray = [];

			for (const entry of data) {
				const display_id = entry.category
					.split("-")
					.map((w: string) => w[0].toUpperCase() + w.substring(1).toLowerCase())
					.join(" ");

				categoryArray.push({
					id: entry.category,
					display_id: display_id,
					applications: entry.applications,
				});
			}
			return categoryArray;
		},
	}),
	granularControlApplicationsSchema,
};

export {
	granularControlApplicationsCollectionConfig,
	granularControlApplicationsSchema,
};
