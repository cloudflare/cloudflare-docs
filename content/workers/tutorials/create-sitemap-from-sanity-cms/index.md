---
updated: 2024-04-21
pcx_content_type: tutorial
difficulty: Beginner
content_type: 📝 Tutorial
title: Create a sitemap from Sanity CMS with Workers
spotlight:
  author: John Siciliano
  author_bio_link: https://www.linkedin.com/in/johnsicili/
  author_bio_source: LinkedIn
---

# Create a sitemap from Sanity CMS with Workers

{{<tutorial-date-info>}}

{{<spotlight-author>}}

In this tutorial, you will put together a Cloudflare Worker that creates and serves a sitemap using data from [Sanity.io](https://www.sanity.io), a headless CMS.

The high-level workflow of the solution you are going to build in this tutorial is the following:

1. A URL on your domain (for example, `cms.example.com/sitemap.xml`) will be routed to a Cloudflare Worker.
2. The Worker will fetch your CMS data such as slugs and last modified dates.
3. The Worker will use that data to assemble a sitemap.
4. Finally, The Worker will return the XML sitemap ready for search engines.

{{<tutorial>}}

{{<tutorial-prereqs>}}

Before you start, make sure you have:

- A Cloudflare account. If you do not have one, [sign up](https://dash.cloudflare.com/sign-up/workers-and-pages) before continuing.
- A domain added to your Cloudflare account using a [full setup](/dns/zone-setups/full-setup/setup/), that is, using Cloudflare for your authoritative DNS nameservers.
- [npm](https://docs.npmjs.com/getting-started) and [Node.js](https://nodejs.org/en/) installed on your machine.
{{</tutorial-prereqs>}}

{{<tutorial-step title="Create a new Worker">}}

Cloudflare Workers provides a serverless execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure.

While you can create Workers in the Cloudflare dashboard, it is a best practice to create them locally, where you can use version control and [Wrangler](/workers/wrangler/install-and-update/), the Workers command-line interface, to deploy them.

Create a new Worker project using [C3](/pages/get-started/c3/) (`create-cloudflare` CLI):

{{<tabs labels="pnpm | npm | yarn">}}
{{<tab label="pnpm" default="true">}}
```sh
$ pnpm create cloudflare@latest
```
{{</tab>}}
{{<tab label="npm">}}
```sh
$ npm create cloudflare@latest
```
{{</tab>}}
{{<tab label="yarn">}}
```sh
$ yarn create cloudflare@latest
```
{{</tab>}}
{{</tabs>}}

In this tutorial, the Worker will be named `cms-sitemap`.

Select the options in the command-line interface (CLI) that work best for you, such as using JavaScript or TypeScript. The starter template you choose does not matter as this tutorial provides all the required code for you to paste in your project.

Next, require the `@sanity/client` package.

{{<tabs labels="pnpm | npm | yarn">}}
{{<tab label="pnpm" default="true">}}
```sh
$ pnpm install @sanity/client
```
{{</tab>}}
{{<tab label="npm">}}
```sh
$ npm install @sanity/client
```
{{</tab>}}
{{<tab label="yarn">}}
```sh
$ yarn add @sanity/client
```
{{</tab>}}
{{</tabs>}}

{{</tutorial-step>}}

{{<tutorial-step title="Configure `wrangler.toml`">}}

A default `wrangler.toml` was generated in the previous step.

The `wrangler.toml` file is a configuration file used to specify project settings and deployment configurations in a structured format.

For this tutorial your `wrangler.toml` should be similar to the following:

```toml
---
filename: wrangler.toml
---
name = "cms-sitemap"
main = "src/index.ts"
compatibility_date = "2024-04-19"
minify = true

[vars]
# The CMS will return relative URLs, so we need to know the base URL of the site.
SITEMAP_BASE = "https://example.com"
# Modify to match your project ID.
SANITY_PROJECT_ID = "5z5j5z5j"
SANITY_DATASET = "production"
```

You must update the `[vars]` section to match your needs. See the inline comments to understand the purpose of each entry.

{{<Aside type="warning" title="Warning">}}

Secrets do not belong in `wrangler.toml`. If you need to add secrets, use `.dev.vars` for local secrets and the `wranger secret put` command for deploying secrets. For more information, refer to [Secrets](/workers/configuration/secrets/).

{{</Aside>}}
{{</tutorial-step>}}

{{<tutorial-step title="Add code">}}

In this step you will add the boilerplate code that will get you close to the complete solution.

For the purpose of this tutorial, the code has been condensed into two files:

- `index.ts|js`: Serves as the entry point for requests to the Worker and routes them to the proper place.
- `Sitemap.ts|js`: Retrieves the CMS data that will be turned into a sitemap. For a better separation of concerns and organization, the CMS logic should be in a separate file.

Paste the following code into the existing `index.ts|js` file:

```ts
---
filename: src/index.ts
---
/**
 * Welcome to Cloudflare Workers!
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Sitemap } from './Sitemap';

// Export a default object containing event handlers.
export default {
	// The fetch handler is invoked when this worker receives an HTTPS request
	// and should return a Response (optionally wrapped in a Promise).
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);

		// You can get pretty far with simple logic like if/switch-statements.
		// If you need more complex routing, consider Hono https://hono.dev/.
		if (url.pathname === '/sitemap.xml') {
			const handleSitemap = new Sitemap(request, env, ctx);
			return handleSitemap.fetch();
		}

		return new Response(
			`Try requesting /sitemap.xml`,
			{ headers: { 'Content-Type': 'text/html' } }
		);
	},
};
```

You do not need to modify anything in this file after pasting the above code.

Next, create a new file named `Sitemap.ts|js` and paste the following code:

```ts
---
filename: src/Sitemap.ts
---
import { createClient, SanityClient } from '@sanity/client';

export class Sitemap {

	private env: Env;
	private ctx: ExecutionContext;

	constructor(request: Request, env: Env, ctx: ExecutionContext) {
		this.env = env;
		this.ctx = ctx;
	}

	async fetch(): Promise<Response> {
		// Modify the query to use your CMS's schema.
		//
		// Request these:
		// - "slug": The slug of the post.
		// - "lastmod": When the post was updated.
		//
		// Notes:
		// - The slugs are prefixed to help form the full relative URL in the sitemap.
		// - Order the slugs to ensure the sitemap is in a consistent order.
		const query = `*[defined(postFields.slug.current)] {
			_type == 'articlePost' => {
				'slug': '/posts/' + postFields.slug.current,
				'lastmod': _updatedAt,
			},
			_type == 'examplesPost' => {
				'slug': '/examples/' + postFields.slug.current,
				'lastmod': _updatedAt,
			},
			_type == 'templatesPost' => {
				'slug': '/templates/' + postFields.slug.current,
				'lastmod': _updatedAt,
			}
		} | order(slug asc)`;

		const dataForSitemap = await this.fetchCmsData(query);

		if (!dataForSitemap) {
			console.error('Error fetching data for sitemap', JSON.stringify(dataForSitemap));
			return new Response('Error fetching data for sitemap', { status: 500 });
		}

		const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		  ${dataForSitemap.filter(Boolean).map((item: any) => `
			<url>
			  <loc>${this.env.SITEMAP_BASE}${item.slug}</loc>
			  <lastmod>${item.lastmod}</lastmod>
			</url>
		  `).join('')}
		</urlset>`;

		return new Response(sitemapXml, {
			headers: {
				'content-type': 'application/xml',
			},
		});
	}

	private async fetchCmsData(query: string) {
		const client: SanityClient = createClient({
            projectId: this.env.SANITY_PROJECT_ID,
            dataset: this.env.SANITY_DATASET,
            useCdn: true,
            apiVersion: '2024-01-01',
        });

		try {
			const data = await client.fetch(query);
			return data;
		}
		catch (error) {
			console.error(error);
		}
	}
};
```

In steps 4 and 5 you will modify the code you pasted into `src/Sitemap.ts` according to your needs.

{{</tutorial-step>}}

{{<tutorial-step title="Query CMS data">}}

The following query in `src/Sitemap.ts` defines which data will be retrieved from the CMS. The exact query depends on your schema:

```ts
const query = `*[defined(postFields.slug.current)] {
  _type == 'articlePost' => {
    'slug': '/posts/' + postFields.slug.current,
    'lastmod': _updatedAt,
  },
  _type == 'examplesPost' => {
    'slug': '/examples/' + postFields.slug.current,
    'lastmod': _updatedAt,
  },
  _type == 'templatesPost' => {
    'slug': '/templates/' + postFields.slug.current,
    'lastmod': _updatedAt,
  }
} | order(slug asc)`;
```

If necessary, adapt the provided query to your specific schema, taking the following into account:

- The query must return two properties: `slug` and `lastmod`, as these properties are referenced when creating the sitemap. [GROQ](https://www.sanity.io/docs/how-queries-work) (Graph-Relational Object Queries) and [GraphQL](https://www.sanity.io/docs/graphql) enable naming properties — for example, `"lastmod": _updatedAt` — allowing you to map custom field names to the required properties.
- You will likely need to prefix each slug with the base path. For `www.example.com/posts/my-post`, the slug returned is `my-post`, but the base path (`/posts/`) is what needs to be prefixed (the domain is automatically added).
- Add a sort to the query to provide a consistent order (`order(slug asc)` in the provided tutorial code).

The data returned by the query will be used to generate an XML sitemap.
{{</tutorial-step>}}

{{<tutorial-step title="Create the sitemap from the CMS data">}}

The relevant code from `src/Sitemap.ts` generating the sitemap and returning it with the correct content type is the following:

```ts
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${dataForSitemap.filter(Boolean).map((item: any) => `
  <url>
    <loc>${this.env.SITEMAP_BASE}${item.slug}</loc>
    <lastmod>${item.lastmod}</lastmod>
  </url>
  `).join('')}
</urlset>`;

return new Response(sitemapXml, {
  headers: {
    'content-type': 'application/xml',
  },
});
```

The URL (`loc`) and last modification date (`lastmod`) are the only two properties added to the sitemap because, [according to Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#additional-notes-about-xml-sitemaps), other properties such as `priority` and `changefreq` will be ignored.

Finally, the sitemap is returned with the content type of `application/xml`.

At this point, you can test the Worker locally by running the following command:

```sh
$ wrangler dev
```

This command will output a localhost URL in the terminal. Open this URL with `/sitemap.xml` appended to view the sitemap in your browser. If there are any errors, they will be shown in the terminal output.

Once you have confirmed the sitemap is working, move on to the next step.
{{</tutorial-step>}}

{{<tutorial-step title="Deploy the Worker">}}

Now that your project is working locally, there are two steps left:

1. Deploy the Worker.
2. Bind it to a domain.

To deploy the Worker, run the following command in your terminal:

```sh
$ wrangler deploy
```

The terminal will log information about the deployment, including a new custom URL in the format `{worker-name}.{account-subdomain}.workers.dev`. While you could use this hostname to obtain your sitemap, it is a best practice to host the sitemap on the same domain your content is on.
{{</tutorial-step>}}

{{<tutorial-step title="Route a URL to the Worker">}}

In this step, you will make the Worker available on a new subdomain using a built-in Cloudflare feature.

One of the benefits of using a subdomain is that you do not have to worry about this sitemap conflicting with your root domain's sitemap, since both are probably using the `/sitemap.xml` path.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**, and then select your Worker.
3. Go to **Settings** > **Triggers** > **Custom Domains** > **Add Custom Domain**.
4. Enter the domain or subdomain you want to configure for your Worker.

    For this tutorial, use a subdomain on the domain that is in your sitemap. For example, if your sitemap outputs URLs like `www.example.com` then a suitable subdomain is `cms.example.com`.

5. Select **Add Custom Domain**.

    After adding the subdomain, Cloudflare automatically adds the proper DNS record binding the Worker to the subdomain.

6. To verify your configuration, go to your new subdomain and append `/sitemap.xml`. For example:

    ```txt
    cms.example.com/sitemap.xml
    ```

The browser should show the sitemap as when you tested locally.

You now have a sitemap for your headless CMS using a highly maintainable and serverless setup.

{{</tutorial-step>}}
{{</tutorial>}}
