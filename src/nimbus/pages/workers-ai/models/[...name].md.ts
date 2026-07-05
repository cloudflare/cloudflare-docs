/**
 * TODO(migration): replace this build-time `.md` route with edge "Markdown for
 * Agents" (HTML→Markdown at request time) at cutover. See the migration plan.
 */
/**
 * /workers-ai/models/<short-slug>.md — markdown rendering of a model page.
 *
 * Backs the page-actions row (Copy page / View as Markdown). Same per-route
 * binding as `[...name].astro`: `getLegacyModels` + the short slug.
 */
import type { APIRoute, GetStaticPaths } from "astro";
import { getLegacyModels, type ModelView } from "~/util/models";
import { renderModelMarkdown } from "~/util/model-markdown";

export const prerender = true;

export const getStaticPaths = (async () => {
  const models = await getLegacyModels();
  return models.map((model) => {
    const slug = model.name.split("/").at(-1)!;
    return { params: { name: slug }, props: { model, slug } };
  });
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const { model, slug } = props as { model: ModelView; slug: string };
  return new Response(renderModelMarkdown(model, "/workers-ai/models", slug), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
};
