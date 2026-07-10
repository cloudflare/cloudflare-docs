/**
 * /changelog/rss/index.xml — RSS feed of all (non-hidden) changelog entries.
 * CF source: cloudflare-docs/src/pages/changelog/rss/index.xml.ts
 */
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { config } from "virtual:nimbus/config";
import { getChangelogs, getRSSItems } from "~/util/changelog";

export const prerender = true;

export const GET: APIRoute = async ({ locals }) => {
  const notes = await getChangelogs({
    filter: (entry) => !entry.data.hidden,
  });

  const items = await getRSSItems({ notes, locals });

  return rss({
    title: "Cloudflare changelogs",
    description: "Updates to various Cloudflare products",
    site: new URL("/changelog/", config.site).href,
    items,
  });
};
