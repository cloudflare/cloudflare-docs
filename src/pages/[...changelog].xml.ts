import rss from '@astrojs/rss';
import { getCollection, getEntry } from "astro:content";
import type { APIRoute } from 'astro';
import { marked } from 'marked';
import { getWranglerChangelog } from '~/util/changelogs';
import { slug } from "github-slugger"

export async function getStaticPaths() {
    const changelogs = await getCollection("docs", (entry) => {
        return entry.data.pcx_content_type === "changelog" && entry.data.changelog_file_name || entry.data.changelog_product_area_name
    });

    return changelogs.map((entry) => {
        return {
            params: {
                changelog: entry.slug + `/index`
            },
            props: {
                entry
            }
        }
    })
}

export const GET: APIRoute = async (context) => {
    const entry = context.props.entry;

    if (!entry.data.changelog_file_name && !entry.data.changelog_product_area_name) {
        throw new Error(`One of changelog_file_name or changelog_product_area_name is required on ${entry.id}, to generate RSS feeds.`)
    }

    const changelogs = await getCollection("changelogs", (changelog) => {
        return entry.data.changelog_file_name?.includes(changelog.id) || changelog.data.productArea === entry.data.changelog_product_area_name
    })

    if (entry.data.changelog_file_name?.includes("wrangler")) {
        changelogs.push(await getWranglerChangelog());
    }

    const mapped = await Promise.all(changelogs.flatMap((product) => {
        return product.data.entries.map(async (entry) => {
            let description;
            if (entry.individual_page) {
                const link = entry.link;

                const page = await getEntry("docs", link.slice(1, -1));

                if (!page) throw new Error(`Changelog entry points to ${link.slice(1, -1)} but unable to find entry with that slug`)

                description = page.body;
            } else {
                description = entry.description;
            }

            let link;
            if (entry.link) {
                link = entry.link
            } else {
                const anchor = slug(entry.title ?? entry.date);
                link = product.data.link.concat(`#${anchor}`);
            }

            let title;
            if (entry.scheduled) {
                title = `Scheduled for ${entry.scheduled_date}`
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
    }));

    const entries = mapped.sort((a, b) => {
        return (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0);
    });

    const rssName = entry.data.changelog_product_area_name || changelogs[0].data.productName;

    const site = new URL(context.site);
    site.pathname = entry.slug.concat("/");

    const isArea = Boolean(entry.data.changelog_product_area_name);

    return rss({
        title: `Changelog | ${rssName}`,
        description: `Updates to ${rssName}`,
        site,
        items: entries.map((entry) => {
            return {
                title: `${entry.product} - ${entry.title ?? entry.date}`,
                description: marked.parse(entry.description),
                pubDate: new Date(entry.date),
                link: entry.link,
                customData: isArea ? `<product>${entry.product}</product>` : undefined,
            }
        })
    })
}