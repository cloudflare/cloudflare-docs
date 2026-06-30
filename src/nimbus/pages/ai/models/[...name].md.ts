/**
 * TODO(migration): replace this build-time `.md` route with edge "Markdown for
 * Agents" (HTML→Markdown at request time) at cutover. See the migration plan.
 */
/**
 * /ai/models/<slug>.md — markdown rendering of a unified-catalog model page.
 *
 * Backs the page-actions row (Copy page / View as Markdown). Same per-route
 * binding as the `/ai` `[...name].astro`: `getResolvedModels` + `model.slug`.
 */
import type { APIRoute, GetStaticPaths } from "astro";
import { getResolvedModels, type ModelView } from "~/util/models";
import { renderModelMarkdown } from "~/util/model-markdown";

export const prerender = true;

export const getStaticPaths = (async () => {
  const models = await getResolvedModels();
  return models.map((model) => ({
    params: { name: model.slug },
    props: { model, slug: model.slug },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const { model, slug } = props as { model: ModelView; slug: string };
  return new Response(renderModelMarkdown(model, "/ai/models", slug), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
};
