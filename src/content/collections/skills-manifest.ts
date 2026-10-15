import { z } from "astro/zod";
import type { CollectionConfig } from "astro/content/config";

import { middlecacheLoader } from "../../util/custom-loaders";

const skillManifestEntrySchema = z.object({
	name: z.string(),
	description: z.string(),
});

type SkillManifestEntry = z.infer<typeof skillManifestEntrySchema>;

const skillsManifestCollectionConfig: CollectionConfig<
	typeof skillManifestEntrySchema
> = {
	loader: middlecacheLoader("v1/cloudflare-skills/skills-manifest.json", {
		parser: (fileContent: string) => {
			const data = JSON.parse(fileContent) as {
				skills: SkillManifestEntry[];
			};

			const lookup: Record<string, SkillManifestEntry> = {};

			for (const skill of data.skills) {
				lookup[skill.name] = {
					name: skill.name,
					description: skill.description,
				};
			}

			return lookup;
		},
	}),
	schema: skillManifestEntrySchema,
};

export { skillsManifestCollectionConfig, skillManifestEntrySchema };
