import rss from '@astrojs/rss';
import { getCollection, getEntry } from "astro:content";
import type { APIRoute } from 'astro';
import { marked } from 'marked';
import { getWranglerChangelog } from '~/util/changelogs';
import { slug } from "github-slugger"
import { entryToString } from '~/util/container';

export const GET: APIRoute = async (context) => {
    function walkTokens(token: Token) {
        if (token.type === 'image' || token.type === 'link') {
            if (token.href.startsWith("/")) {
                token.href = context.site + token.href.slice(1);
            }
        }
    }

    marked.use({ walkTokens });

    const changelogs = await getCollection("changelogs")

    changelogs.push(await getWranglerChangelog());

    const mapped = await Promise.all(changelogs.flatMap((product) => {
        return product.data.entries.map(async (entry) => {
            let description;
            if (entry.individual_page) {
                const link = entry.link;

                const page = await getEntry("docs", link.slice(1, -1));

                if (!page) throw new Error(`Changelog entry points to ${link.slice(1, -1)} but unable to find entry with that slug`)

                description = await entryToString(page) ?? page.body;
            } else {
                description = entry.description;
            }

            let link;
            if (entry.link) {
                link = entry.link
            } else {
                const anchor = slug(entry.title ?? entry.publish_date);
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

    return rss({
        title: `Cloudflare product changelog`,
        description: `Updates to various Cloudflare products.`,
        site: "https://developers.cloudflare.com/changelog/",
        trailingSlash: false,
        items: entries.map((entry) => {
            return {
                title: `${entry.product} - ${entry.title ?? entry.date}`,
                description: marked.parse(entry.description),
                pubDate: new Date(entry.date),
                link: entry.link,
                customData: `<product>${entry.product}</product>`
            }
        })
    })
}