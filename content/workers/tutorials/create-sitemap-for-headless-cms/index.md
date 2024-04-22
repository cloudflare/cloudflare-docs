---
updated: 2024-04-21
pcx_content_type: tutorial
difficulty: Beginner
content_type: 📝 Tutorial
title: Create a sitemap for a headless CMS with Workers
---

# Create a sitemap for a headless CMS with Workers

In this tutorial, you will put together a Cloudflare Worker that creates and serves a sitemap using data from your headless CMS.

While this tutorial is CMS agnostic, you may need to adjust some of the code to work with the query language and schema of your CMS.

Here is a high-level overview of how this will work:

1. A URL on your domain will be routed to a Cloudflare Worker (e.g., `cms.example.com/sitemap.xml`).
2. The Worker will fetch your CMS data such as slugs and last modified dates.
3. The Worker will use that data to assemble a sitemap.
4. Finally, it will return the XML sitemap ready for search engines.

{{<tutorial>}}

{{<tutorial-prereqs>}}
## Prerequisites

1. Sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Use Cloudflare DNS.
3. Install [npm](https://docs.npmjs.com/getting-started) and [Node.js](https://nodejs.org/en/).
5. Knowledge of installing node packages and importing them into code (necessary for importing the client library for your CMS).
{{</tutorial-prereqs>}}

{{<tutorial-step title="Create a new Worker">}}
## 1. Create a new Worker

Cloudflare Workers provides a serverless execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure.

While Workers can be created in the UI, it is best practice to create them locally, where you can use version control and Wrangler CLI to deploy them.

Create a new Worker with the following command:

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

Choose the options in the CLI that work best for you such as JavasScript or TypeScript. The starter template you choose does not matter as this tutorial provides code to paste in.
{{</tutorial-step>}}

{{<tutorial-step title="Configure wrangler.toml">}}
## 2. Configure `wrangler.toml`

A default `wrangler.toml` was generated in the previous step.

The `wrangler.toml` file is a configuration file used to specify project settings and deployment configurations in a structured format.

Here is what this tutorial is using:

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
# Add whatever info you need to call your CMS API.
SANITY_PROJECT_ID = "5z5j5z5j"
SANITY_DATASET = "production"
```
The `[vars]` section needs to be updated to match your needs. See the inline comments to understand their purposes.

The headless CMS in this example is Sanity, however, any CMS can be used. Add, remove, or modify the variables to meet the requirements of calling your CMS's API.

{{<Aside type="warning" title="Warning">}}

Secrets do not belong in `wrangler.toml`. If you need to add secrets, use `.dev.vars` for local secrets and `wranger secret put` for deploying secrets. For more information, refer to [Secrets](https://developers.cloudflare.com/workers/configuration/secrets/).

{{</Aside>}}
{{</tutorial-step>}}

{{<tutorial-step title="Add code">}}
## 3. Add code

In this step, you will set up the boilerplate code that will get you very close to the complete solution.

For the purpose of this tutorial, the code has been condensed into two files:

1. `index.ts|js` – This serves as the entry point for requests to the Worker and routes them to the proper place.
2. `Sitemap.ts|js` – This is where the CMS data will be retrieved and turned into a sitemap. For a better separation of concerns and organization, it may be best to move CMS logic into a separate file.

Paste the following code into the existing `index.ts|js` file:

Index.ts|js

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
You don't need to modify anything in this file.

Next, create a new file named `Sitemap.ts|js` and paste in the following code:

```ts
---
filename: src/Sitemap.ts
---
// Remove this if you are not using Sanity and add your own CMS client.
import { createClient, SanityClient } from '@sanity/client'

export class Sitemap {

	private env: Env;
	private ctx: ExecutionContext;

	constructor(request: Request, env: Env, ctx: ExecutionContext) {
		this.env = env;
		this.ctx = ctx;
	}

	async fetch(): Promise<Response> {
		// Modify the query to use your CMS's API/syntax.
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
		// Replace this with your own CMS client.
		const client: SanityClient = createClient({
            projectId: this.env.SANITY_PROJECT_ID,
            dataset: this.env.SANITY_DATASET,
            useCdn: true,
            apiVersion: '2024-01-01',
        });

		try {
			// Replace this if the client API is different.
			const data = await client.fetch(query);
			return data;
		}
		catch (error) {
			console.error(error);
		}
	}
};
```

At this point in the tutorial, you need to modify the API client if you are using anything but Sanity.

The client is referenced in the following places:

- The import statement.
- The `fetchCmsData` method (initializing the client and calling the client).
{{</tutorial-step>}}

{{<tutorial-step title="Query CMS data">}}
## 4. Query CMS data

Now it is time to retrieve the data from the CMS.

The query will depend on your schema and the headless CMS you are using, but here are important considerations:

1. The query must return two properties: slug and lastmod, as those properties are referenced when creating the sitemap. Many CMSs support GraphQL, which enables naming properties (e.g., `"lastmod": _updatedAt`). However, if you are using REST, then you may need to adjust the Worker code to use the exact properties the API returns.
2. You will likely need to prefix each slug with the base path so, for `www.example.com/posts/my-post`, the slug returned is `my-post`, but the base path (`/posts/`) is what needs to be prefixed (the domain is automatically added).
3. Add a sort to the query to provide a consistent order.

Once the query is running, its data is used to generate an XML sitemap.
{{</tutorial-step>}}

{{<tutorial-step title="Create the sitemap from the CMS data">}}
## 5. Create the sitemap from the CMS data

The sitemap is automatically generated from the results of the query.

If you were able to name the slug and lastmod accordingly, no additional work is needed. However, as mentioned above, if you cannot name the properties, then modify the `sitemapXml` constant to use your properties (e.g., from `item.lastmod` to `item._updatedAt`).

The URL and when it was updated are the only two properties added to the sitemap because [according to Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#additional-notes-about-xml-sitemaps), they ignore other properties such as `priority` and `changefreq`.

Finally, the sitemap is returned with the content type of `application/xml`.

At this point, you can test the Worker locally by running `wrangler dev` and visiting the localhost URL it logs with `/sitemap.xml` appended. You should see a proper sitemap display in your browser. If there are any errors, they will be logged in your terminal.

Once you confirm the sitemap is working, move on to the next step.
{{</tutorial-step>}}

{{<tutorial-step title="Deploy the Worker">}}
## 6. Deploy the Worker

Now that this is working locally, there are just two steps left:

1. Deploy the Worker.
2. Bind it to a domain.

To deploy the worker, run `wrangler deploy` in your terminal.

The terminal will log information about the deployment, including a new custom URL in the format `{worker-name}.{account-subdomain}.workers.dev`. While this URL will output your sitemap, it is best practice to host the sitemap on the same domain your content is on.
{{</tutorial-step>}}

{{<tutorial-step title="Route a URL to the Worker">}}
## 7. Route a URL to the Worker

In this step, you will make the Worker available on a new subdomain using a simple built-in Cloudflare feature.

One of the benefits of using a subdomain is that you do not have to worry about this sitemap conflicting with your root domain's sitemap as they both are likely using `/sitemap.xml`.

Head over to the Worker Settings in the Cloudflare Dashboard (Cloudflare Account > Worker > Your Worker > Settings).

Then click "Add Custom Domain" which will prompt you to enter a domain.

It is important you use a subdomain on the domain that is in your sitemap. If your sitemap outputs URLs of `www.example.com` then a suitable subdomain is `cms.example.com`.

As soon as you add this, Cloudflare automatically adds the proper DNS record binding the Worker to the subdomain.

You can verify this by heading over to your new subdomain and appending `/sitemap.xml`.

You should see the sitemap as you did when testing locally.
{{</tutorial-step>}}

Now you have a sitemap for your headless CMS using a highly maintainable and serverless setup.
{{</tutorial>}}
