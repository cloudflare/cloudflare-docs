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
  const paths: { params: { schema: string }; props: { schema: unknown } }[] = [];

  for (const model of models) {
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

export const GET: APIRoute<Props> = ({ props }) => Response.json(props.schema);
