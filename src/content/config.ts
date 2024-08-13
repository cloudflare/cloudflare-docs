import { z, defineCollection } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";
import {
	appsSchema,
	changelogsSchema,
	baseSchema,
	notificationsSchema,
	pagesBuildEnvironmentSchema,
	pagesFrameworkPresetsSchema,
	compatibilityDatesSchema,
	glossarySchema,
	learningPathsSchema,
	videosSchema,
	workersAiSchema,
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
	changelogs: defineCollection({
		schema: changelogsSchema,
		type: "data",
	}),
	"compatibility-dates": defineCollection({
		schema: compatibilityDatesSchema,
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
		schema: workersAiSchema,
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
};
