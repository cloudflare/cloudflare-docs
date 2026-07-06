/**
 * getReleaseNotes — load the `release-notes` collection and reshape it into
 * the date-grouped, newest-first structure that ProductReleaseNotes renders.
 *
 * CF source: cloudflare-docs/src/util/release-notes.ts
 *
 * Faithful port — the only adaptation is `import("astro:content")` typing.
 * `api-deprecations` is special-cased exactly as upstream (it has no entry
 * here today, but the contract is preserved so dropping in the upstream YAML
 * "just works"). `individual_page: entry.individual_page && entry.link`
 * carries the link string through so the renderer can resolve the page.
 */
import { getCollection, type CollectionEntry } from "astro:content";

export async function getReleaseNotes(opts?: {
  filter?: (entry: CollectionEntry<"release-notes">) => boolean;
  deprecationsOnly?: boolean;
}) {
  let releaseNotes;

  if (opts?.filter) {
    releaseNotes = await getCollection("release-notes", opts.filter);
  } else {
    releaseNotes = await getCollection("release-notes");
  }

  if (!releaseNotes) {
    throw new Error(
      `[getReleaseNotes] Unable to find any releaseNotes with ${JSON.stringify(opts)}`,
    );
  }

  if (opts?.deprecationsOnly) {
    releaseNotes = releaseNotes.filter((x) => x.id === "api-deprecations");
  } else {
    releaseNotes = releaseNotes.filter((x) => x.id !== "api-deprecations");
  }

  const products = [...new Set(releaseNotes.flatMap((x) => x.data.productName))];

  const mapped = releaseNotes.flatMap((product) => {
    return product.data.entries.map((entry) => {
      return {
        product: product.data.productName,
        link: product.data.link,
        date: entry.publish_date,
        description: entry.description,
        title: entry.title,
        scheduled: entry.scheduled,
        productLink: product.data.productLink,
        individual_page: entry.individual_page && entry.link,
      };
    });
  });

  const grouped = Object.entries(Object.groupBy(mapped, (entry) => entry.date));
  const entries = grouped.sort().reverse();

  return { products, releaseNotes: entries };
}
