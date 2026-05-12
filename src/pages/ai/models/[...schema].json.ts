import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from "astro";
import { getResolvedModels } from "~/util/model-resolver";
import { detectApiModes } from "~/util/model-schema";

export const getStaticPaths = (async () => {
	const models = await getResolvedModels();
	const paths = [];

	for (const model of models) {
		// Catalog models use the full slug as the URL path segment
		// (e.g. "openai/gpt-5.4-mini"), matching /ai/models/[...name].astro
		const slug = model.slug;
		const modes = detectApiModes(model.schema);

		if (modes) {
			for (const mode of modes) {
				paths.push({
					params: { schema: `${slug}/${mode.id}-input` },
					props: { schema: mode.input },
				});
				paths.push({
					params: { schema: `${slug}/${mode.id}-output` },
					props: { schema: mode.output },
				});
			}
		} else {
			paths.push({
				params: { schema: `${slug}/schema-input` },
				props: { schema: model.schema.input },
			});
			paths.push({
				params: { schema: `${slug}/schema-output` },
				props: { schema: model.schema.output },
			});
		}
	}

	return paths;
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = ({ props }) => {
	return Response.json(props.schema);
};
