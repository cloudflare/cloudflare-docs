import { z, defineCollection } from "astro:content";

import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

import { glob } from "astro/loaders";

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

function contentLoader(name: string) {
	return glob({
		pattern: "**/*.(md|mdx)",
		base: "./src/content/" + name,
	});
}

function dataLoader(name: string) {
	return glob({
		pattern: "**/*.(json|yml|yaml)",
		base: "./src/content/" + name,
	});
}

const partialSchema = z.object({
	params: z.string().array().optional(),
});

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: baseSchema,
		}),
	}),
	i18n: defineCollection({
		loader: i18nLoader(),
		schema: i18nSchema(),
	}),
	changelogs: defineCollection({
		loader: dataLoader("changelogs"),
		schema: changelogsSchema,
	}),
	"compatibility-flags": defineCollection({
		loader: contentLoader("compatibility-flags"),
		schema: compatibilityFlagsSchema,
	}),
	partials: defineCollection({
		loader: contentLoader("partials"),
		schema: partialSchema,
	}),
	glossary: defineCollection({
		loader: dataLoader("glossary"),
		schema: glossarySchema,
	}),
	plans: defineCollection({
		loader: dataLoader("plans"),
		// untyped due to https://github.com/colinhacks/zod/issues/2195
	}),
	"pages-framework-presets": defineCollection({
		loader: dataLoader("pages-framework-presets"),
		schema: pagesFrameworkPresetsSchema,
	}),
	"pages-build-environment": defineCollection({
		loader: dataLoader("pages-build-environment"),
		schema: pagesBuildEnvironmentSchema,
	}),
	notifications: defineCollection({
		loader: dataLoader("notifications"),
		schema: notificationsSchema,
	}),
	"learning-paths": defineCollection({
		loader: dataLoader("learning-paths"),
		schema: learningPathsSchema,
	}),
	products: defineCollection({
		loader: dataLoader("products"),
	}),
	"workers-ai-models": defineCollection({
		loader: dataLoader("workers-ai-models"),
		schema: workersAiModelsSchema,
	}),
	videos: defineCollection({
		loader: dataLoader("videos"),
		schema: videosSchema,
	}),
	apps: defineCollection({
		loader: dataLoader("apps"),
		schema: appsSchema,
	}),
	"warp-releases": defineCollection({
		loader: dataLoader("warp-releases"),
		schema: warpReleasesSchema,
	}),
	"changelogs-next": defineCollection({
		loader: contentLoader("changelogs-next"),
		schema: changelogsNextSchema,
	}),
	fields: defineCollection({
		loader: dataLoader("fields"),
		schema: fieldsSchema,
	}),
};
