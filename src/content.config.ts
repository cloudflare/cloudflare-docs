import { defineCollection } from "astro:content";

import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

import { glob, file } from "astro/loaders";
import { skillsLoader } from "astro-skills";

import { productAvailabilityCollectionConfig } from "./content/collections/product-availability";
import { granularControlApplicationsCollectionConfig } from "./content/collections/granular-control-applications";

import { middlecacheLoader } from "./util/custom-loaders";

import {
	appsSchema,
	catalogModelsSchema,
	changelogSchema,
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
	releaseNotesSchema,
	fieldsSchema,
	partialsSchema,
	streamSchema,
	cloudflareSkillSchema,
	mcpServerSchema,
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
	changelog: defineCollection({
		loader: contentLoader("changelog"),
		schema: changelogSchema,
	}),
	"compatibility-flags": defineCollection({
		loader: contentLoader("compatibility-flags"),
		schema: compatibilityFlagsSchema,
	}),
	partials: defineCollection({
		loader: contentLoader("partials"),
		schema: partialsSchema,
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
	directory: defineCollection({
		loader: glob({
			pattern: "**/*.(json|yml|yaml)",
			base: "./src/content/directory",
			generateId: ({ entry }) => entry.replace(/\.(json|yml|yaml)$/, ""),
		}),
	}),
	"workers-ai-models": defineCollection({
		loader: dataLoader("workers-ai-models"),
		schema: workersAiModelsSchema,
	}),
	"catalog-models": defineCollection({
		loader: dataLoader("catalog-models"),
		schema: catalogModelsSchema,
	}),
	videos: defineCollection({
		loader: file("src/content/videos/index.yaml"),
		schema: videosSchema,
	}),
	apps: defineCollection({
		loader: file("src/content/apps/index.yaml"),
		schema: appsSchema,
	}),
	"warp-releases": defineCollection({
		loader: dataLoader("warp-releases"),
		schema: warpReleasesSchema,
	}),
	"release-notes": defineCollection({
		loader: dataLoader("release-notes"),
		schema: releaseNotesSchema,
	}),
	fields: defineCollection({
		loader: dataLoader("fields"),
		schema: fieldsSchema,
	}),
	stream: defineCollection({
		loader: dataLoader("stream"),
		schema: streamSchema,
	}),
	"product-availability": defineCollection(productAvailabilityCollectionConfig),
	"granular-control-applications": defineCollection(
		granularControlApplicationsCollectionConfig,
	),
	skills: defineCollection({
		loader: skillsLoader({ base: "./skills" }),
	}),
	"cloudflare-skills-manifest": defineCollection({
		loader: middlecacheLoader("v1/cloudflare-skills/skills-manifest.json", {
			parser: (fileContent: string) => {
				const data = JSON.parse(fileContent) as {
					skills: Array<{ name: string; description: string; files: string[] }>;
				};
				return Object.fromEntries(data.skills.map((s) => [s.name, s]));
			},
		}),
		schema: cloudflareSkillSchema,
	}),
	"cloudflare-mcps-manifest": defineCollection({
		loader: middlecacheLoader("v1/cloudflare-mcps/mcps-manifest.json", {
			parser: (fileContent: string) => {
				const data = JSON.parse(fileContent) as {
					servers: Array<{ name: string; description: string; url: string }>;
				};
				return Object.fromEntries(data.servers.map((s) => [s.url, s]));
			},
		}),
		schema: mcpServerSchema,
	}),
};
