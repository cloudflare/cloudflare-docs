import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from "astro";
import { getLegacyModels } from "~/util/model-resolver";
import { detectApiModes } from "~/util/model-schema";

export const getStaticPaths = (async () => {
	const models = await getLegacyModels();
	const paths = [];

	for (const model of models) {
		// Short slug is the last segment of the model name, matching the
		// URL structure used by /workers-ai/models/[...name].astro
		const slug = model.name.split("/").at(-1)!;
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
