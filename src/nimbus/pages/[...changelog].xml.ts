/**
 * Per-product changelog RSS — one feed per docs page tagged
 * `pcx_content_type: changelog` that has a `release_notes_file_name`.
 * Served at `/<docs-page-id>/index.xml`, which is exactly where the
 * <RSSButton /> rendered by ProductReleaseNotes points.
 *
 * CF source: cloudflare-docs/src/pages/[...changelog].xml.ts
 *
 * Faithful port with two adaptations to this app's conventions:
 *   - Site origin comes from `virtual:nimbus/config` (`config.site`) — the
 *     same source the llms.txt routes use — rather than `context.site`.
 *   - Heading anchors use a local slugify matching `AnchorHeading.astro`
 *     instead of `github-slugger`, so no extra dependency is pulled in.
 */
import rss from "@astrojs/rss";
import { getCollection, getEntry } from "astro:content";
import type { APIRoute } from "astro";
import { marked, type Token } from "marked";
import { config } from "virtual:nimbus/config";
import { entryToString } from "~/util/container";

export const prerender = true;

// Mirrors src/components/cf/AnchorHeading.astro so RSS anchors line up with
// the ids rendered on the changelog page.
function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function getStaticPaths() {
  const releaseNotes = await getCollection("docs", (entry) => {
    return (
      entry.data.pcx_content_type === "changelog" &&
      Boolean(entry.data.release_notes_file_name)
    );
  });

  return releaseNotes.map((entry) => {
    return {
      params: {
        changelog: entry.id + `/index`,
      },
      props: {
        entry,
      },
    };
  });
}

export const GET: APIRoute = async (context) => {
  function walkTokens(token: Token) {
    if (token.type === "image" || token.type === "link") {
      if (token.href.startsWith("/")) {
        token.href = new URL(token.href, config.site).href;
      }
    }
  }

  marked.use({ walkTokens });

  const entry = context.props.entry;

  if (!entry.data.release_notes_file_name) {
    throw new Error(
      `release_notes_file_name is required on ${entry.id}, to generate RSS feeds.`,
    );
  }

  const releaseNotes = await getCollection("release-notes", (releaseNote) => {
    return entry.data.release_notes_file_name?.includes(releaseNote.id);
  });

  const mapped = await Promise.all(
    releaseNotes.flatMap((product) => {
      return product.data.entries.map(async (entry) => {
        let description;
        if (entry.individual_page) {
          const link = entry.link;

          if (!link)
            throw new Error(
              `Changelog entry points to individual page but no link is provided`,
            );

          const page = await getEntry("docs", link.slice(1, -1));

          if (!page)
            throw new Error(
              `Changelog entry points to ${link.slice(1, -1)} but unable to find entry with that slug`,
            );

          description = (await entryToString(page, context.locals)) ?? page.body;
        } else {
          description = entry.description;
        }

        let link;
        if (entry.link) {
          link = entry.link;
        } else {
          const anchor = slugify(entry.title ?? entry.publish_date);
          link = product.data.link.concat(`#${anchor}`);
        }

        let title;
        if (entry.scheduled) {
          title = `Scheduled for ${entry.scheduled_date}`;
        } else {
          title = entry.title;
        }

        return {
          product: product.data.productName,
          link,
          date: entry.publish_date,
          description,
          title,
        };
      });
    }),
  );

  const entries = mapped.sort((a, b) => {
    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  });

  const rssName = releaseNotes[0].data.productName;

  const site = new URL(config.site);
  site.pathname = entry.id.concat("/");

  return rss({
    title: `Changelog | ${rssName}`,
    description: `Updates to ${rssName}`,
    site,
    trailingSlash: false,
    items: entries.map((entry) => {
      return {
        title: `${entry.product} - ${entry.title ?? entry.date}`,
        description: marked.parse(entry.description ?? "", {
          async: false,
        }) as string,
        pubDate: new Date(entry.date),
        link: entry.link,
      };
    }),
  });
};
