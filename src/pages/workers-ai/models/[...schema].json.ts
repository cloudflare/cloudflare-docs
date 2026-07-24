/**
 * /workers-ai/models/<short-slug>/<schema>.json — raw JSON-Schema endpoints.
 *
 * `detectApiModes` splits the schema into per-mode `{mode.id}-input/-output.json`
 * when it has modes, else a single `schema-input/-output.json`. Bound to
 * `getLegacyModels` with the short slug.
 */
import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from "astro";
import { getLegacyModels, detectApiModes } from "~/util/models";

export const prerender = true;

export const getStaticPaths = (async () => {
	const models = await getLegacyModels();
	const paths: {
		params: { schema: string };
		props: { schema: unknown };
		cacheKey?: string;
	}[] = [];

	for (const model of models) {
		const slug = model.name.split("/").at(-1)!;
		const modes = detectApiModes(model.schema);
		// All schema outputs for a model derive from the same source entry,
		// so they share its digest as the incremental-build cache key.
		const cacheKey = model.digest;

		if (modes) {
			for (const mode of modes) {
				paths.push({
					params: { schema: `${slug}/${mode.id}-input` },
					props: { schema: mode.input },
					cacheKey,
				});
				paths.push({
					params: { schema: `${slug}/${mode.id}-output` },
					props: { schema: mode.output },
					cacheKey,
				});
			}
		} else {
			paths.push({
				params: { schema: `${slug}/schema-input` },
				props: { schema: model.schema.input },
				cacheKey,
			});
			paths.push({
				params: { schema: `${slug}/schema-output` },
				props: { schema: model.schema.output },
				cacheKey,
			});
		}
	}

	return paths;
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = ({ props }) => Response.json(props.schema);
