---
pcx_content_type: how-to
title: Deploy a Gatsby site
---

# Deploy a Gatsby site

[Gatsby](https://www.gatsbyjs.com/) is an open-source React framework for creating websites and apps. In this guide, you will create a new Gatsby application and deploy it using Cloudflare Pages. You will be using the `gatsby` CLI to create a new Gatsby site.

## Installing Gatsby

Install the `gatsby` CLI by running the following command in your terminal:

```sh
$ npm install -g gatsby-cli
```

## Creating a new project

With Gatsby installed, you can create a new project using `gatsby new`. The `new` command accepts a GitHub URL for using an existing template. As an example, use the `gatsby-starter-lumen` template by running the following command in your terminal. You can find more in [Gatsby's Starters section](https://www.gatsbyjs.com/starters/?v=2):

```sh
$ gatsby new my-gatsby-site https://github.com/alxshelepenok/gatsby-starter-lumen
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository_no_init.md">}}

## Deploying with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option | Value          |
| -------------------- | -------------- |
| Production branch    | `main`         |
| Build command        | `gatsby build` |
| Build directory      | `public`       |

</div>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `gatsby`, your project dependencies, and building your site, before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Gatsby site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Handling dynamic routes

If your Gatsby site uses dynamic routes, you'll need to do some additional setup for your site on Cloudflare Pages.

Dynamic routes are pages on your site which use URL path parameters as an input. In Gatsby, these are usually defined by creating files under the `pages` directory, such as `pages/posts/[...].tsx` or `pages/blog/authors/[name].jsx`. These function by rewriting all requests to paths that match the URL template to HTML files named, in this example, `[...]` or `[name]`.

Cloudflare Pages doesn't support page rewrites yet, but the same behaviour can be reproduced using [Pages Functions](/pages/platform/functions/). The example function code below will handle rewriting dynamic route requests to the specified HTML files compiled by Gatsby. 

1. Create a `functions/` directory at the root of your Git repository. This folder stores all Pages Functions for your project. These functions are automatically uploaded as part of the standard Pages build and deploy process.
2. Create a matching Page Worker functions for each dynamic route on your site:
   
   {{<table-wrap>}}

   | Gatsby dynamic route path           | Pages Function path                    |
   | ----------------------------------- | -------------------------------------- |
   | `src/pages/blog/authors/[name].tsx` | `functions/blog/authors/[name].ts`     |
   | `src/pages/blog/[pages].tsx`        | `functions/blog/authors/[pages].ts`    |
   | `src/pages/blog/posts/[...].jsx`    | `functions/blog/posts/[[catchall]].ts` |

   {{</table-wrap>}}
3. Copy the Page Worker code from below, editing the `REWRITE_URI` variable at the top of the file to match the Gatsby dynamic route path.

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: functions/blog/posts/[[catchall]].js
---
const REWRITE_URI = '/blog/posts/[...]/';

export function onRequestGet({ env, request }) {
  return env.ASSETS.fetch(new Request(new URL(REWRITE_URI, request.url).toString(), request));
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: functions/blog/posts/[[catchall]].ts
---
import type { EventContext, Fetcher } from '@cloudflare/workers-types';

const REWRITE_URI = '/blog/posts/[...]/';

export function onRequestGet({ env, request }: EventContext<Env, string, unknown>) {
  return env.ASSETS.fetch(new Request(new URL(REWRITE_URI, request.url).toString(), request));
}

interface Env {
  ASSETS: Fetcher;
}
```

{{</tab>}}
{{</tabs>}}

{{<render file="_learn-more.md" withParameters="Gatsby">}}
