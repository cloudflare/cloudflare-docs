---
pcx_content_type: how-to
title: Static HTML
---

# Static HTML

Cloudflare supports deploying any static HTML website to Cloudflare Pages. If you manage your website without using a framework or static site generator, or if your framework is not listed in [Framework guides](/pages/framework-guides/), you can still deploy it using this guide.

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="/_framework-guides/_create-github-repository.md">}}

## Deploy with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option     | Value                 |
| ------------------------ | --------------------- |
| Production branch        | `main`                |
| Build command (optional) | `exit 0`              |
| Build output directory   | `<YOUR_BUILD_DIR>`    |

</div>

Unlike many of the framework guides, the build command and build output directory for your site are going to be completely custom. If you are not using a preset and do not need to build your site, use `exit 0` as your **Build command**. Cloudflare recommends using `exit 0` as your **Build command** to access features such as Pages Functions. The **Build output directory** is where your application's content lives.

After configuring your site, you can begin your first deploy. Your custom build command (if provided) will run, and Pages will deploy your static site.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After you have deployed your site, you will receive a unique subdomain for your project on `*.pages.dev`. Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/configuration/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

{{<details header="Getting 404 errors on *.pages.dev?" >}}

If you are getting `404` errors when visiting your `*.pages.dev` domain, make sure your website has a top-level file for `index.html`. This `index.html` is what Pages will serve on your on your apex with no page specified.

{{</details>}}

{{<render file="/_framework-guides/_learn-more.md" withParameters=" ">}}