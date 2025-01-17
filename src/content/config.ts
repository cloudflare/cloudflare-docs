import { z, defineCollection } from "astro:content";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";
import {
	appsSchema,
	changelogsSchema,
	baseSchema,
	notificationsSchema,
	pagesBuildEnvironmentSchema,
	pagesFrameworkPresetsSchema,
	compatibilityFlagsSchema,
	glossarySchema,
	learningPathsSchema,
	videosSchema,
	workersAiModelsSchema,
	warpReleasesSchema,
	changelogsNextSchema,
	fieldsSchema,
} from "~/schemas";

const partialSchema = z.object({
	params: z.string().array().optional(),
});

export const collections = {
	docs: defineCollection({
		schema: docsSchema({
			extend: baseSchema,
		}),
	}),
	i18n: defineCollection({ type: "data", schema: i18nSchema() }),
	changelogs: defineCollection({
		schema: changelogsSchema,
		type: "data",
	}),
	"compatibility-flags": defineCollection({
		schema: compatibilityFlagsSchema,
	}),
	partials: defineCollection({
		schema: partialSchema,
	}),
	glossary: defineCollection({
		schema: glossarySchema,
		type: "data",
	}),
	plans: defineCollection({
		// untyped due to https://github.com/colinhacks/zod/issues/2195
		type: "data",
	}),
	"pages-framework-presets": defineCollection({
		schema: pagesFrameworkPresetsSchema,
		type: "data",
	}),
	"pages-build-environment": defineCollection({
		schema: pagesBuildEnvironmentSchema,
		type: "data",
	}),
	notifications: defineCollection({
		schema: notificationsSchema,
		type: "data",
	}),
	"learning-paths": defineCollection({
		schema: learningPathsSchema,
		type: "data",
	}),
	products: defineCollection({
		type: "data",
	}),
	"workers-ai-models": defineCollection({
		schema: workersAiModelsSchema,
		type: "data",
	}),
	videos: defineCollection({
		schema: videosSchema,
		type: "data",
	}),
	apps: defineCollection({
		schema: appsSchema,
		type: "data",
	}),
	"warp-releases": defineCollection({
		schema: warpReleasesSchema,
		type: "data",
	}),
	"changelogs-next": defineCollection({
		schema: changelogsNextSchema,
	}),
	fields: defineCollection({
		schema: fieldsSchema,
		type: "data",
	}),
};
