import type {
	ContentTransformer,
	ContentTransformerContext,
	RawSection,
} from "./types";
import { changelogPostProcessor } from "./content-processors/changelog-post";
import { generatedLandingProcessor } from "./content-processors/generated-landing";
import { modelPageProcessor } from "./content-processors/model-page";
import { renderedHtmlProcessor } from "./content-processors/rendered-html";
import { rulesetFieldProcessor } from "./content-processors/ruleset-field";
import { sourceMarkdownProcessor } from "./content-processors/source-markdown";
import { thirdPartyLicenseProcessor } from "./content-processors/third-party-license";
import { videoProcessor } from "./content-processors/video";

type Matcher =
	| string
	| RegExp
	| ((context: ContentTransformerContext) => boolean);

type ProcessorRoute = {
	processor: ContentTransformer;
	match: Matcher | Matcher[];
};

// Ordered list: the first route whose matcher accepts the page wins.
const routes: ProcessorRoute[] = [
	{ processor: thirdPartyLicenseProcessor, match: /\/legal\/3rdparty\/$/ },
	{
		processor: modelPageProcessor,
		match: [/^\/ai\/models\/.+\/$/, /^\/workers-ai\/models\/[^/]+\/$/],
	},
	{ processor: changelogPostProcessor, match: /^\/changelog\/post\/[^/]+\/$/ },
	{
		processor: rulesetFieldProcessor,
		match: /^\/ruleset-engine\/rules-language\/fields\/reference\/[^/]+\/$/,
	},
	{ processor: videoProcessor, match: /^\/videos\/[^/]+\/$/ },
	{
		processor: generatedLandingProcessor,
		match: [
			"/directory/",
			"/glossary/",
			"/plans/",
			"/resources/",
			"/agent-setup/",
		],
	},
	{
		processor: sourceMarkdownProcessor,
		match: (context) => Boolean(context.sourceMarkdown),
	},
	{ processor: renderedHtmlProcessor, match: () => true },
];

function matcherMatches(matcher: Matcher, context: ContentTransformerContext) {
	if (typeof matcher === "function") return matcher(context);
	if (typeof matcher === "string") return matcher === context.path;
	return matcher.test(context.path);
}

function routeMatches(
	route: ProcessorRoute,
	context: ContentTransformerContext,
) {
	const matchers = Array.isArray(route.match) ? route.match : [route.match];
	return matchers.some((matcher) => matcherMatches(matcher, context));
}

export async function transformContent(
	context: ContentTransformerContext,
): Promise<RawSection[]> {
	const route = routes.find((route) => routeMatches(route, context));
	if (!route) return [];
	return (await route.processor.transform(context)) ?? [];
}
