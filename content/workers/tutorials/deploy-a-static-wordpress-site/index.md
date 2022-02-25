---
updated: 2020-07-25
difficulty: Intermediate
content_type: 📝 Tutorial
pcx-content-type: tutorial
title: Deploy a static WordPress site
---

# Deploy a static WordPress site

{{<Aside type="warning" header="Warning">}}

As of August 2020, the WP2Static plugin is closed for downloads on WordPress.org but is still available [on GitHub](https://github.com/leonstafford/wp2static).

{{</Aside>}}

{{<render file="_tutorials-before-you-start.md">}}

## Overview

In this tutorial, you will migrate a WordPress site to Cloudflare Workers, making use of [Workers Sites](/workers/platform/sites/). Serving a static version of your WordPress site has many advantages over directly exposing your WordPress site. While WordPress is extremely powerful and easy to use, the consistent discovery of new vulnerabilities make it a target for hackers to attack. Because WordPress is built on PHP, each incoming request to your site regenerates a new response on the server – for most websites this is not necessary and leads to scaling issues when your site receives a lot of traffic.

You will use the free WordPress plugin [WP2Static](https://wordpress.org/plugins/static-html-output-plugin/), which generates a completely static (HTML, CSS, and JavaScript) version of your WordPress site. Using [Wrangler](https://github.com/cloudflare/wrangler), you will publish the site to Cloudflare Workers. The Workers Sites functionality built into Wrangler includes support for serving and caching your site directly in Cloudflare’s CDN, enabling users to view your site quickly and securely.

## Prerequisites

This tutorial assumes that you are:

*   The Administrator account on your WordPress site.
*   Able to install WordPress plugins on the site.

## Setup

To start, install the [WP2Static](https://wordpress.org/plugins/static-html-output-plugin/) plugin to export your WordPress site to a ZIP file. In your WordPress admin, go to the **Add Plugins** page, by default at `/wp-admin/plugin-install.php`. In the search bar, search for `WP2Static` and confirm that the resulting plugin that you will be installing matches the plugin below.

![Installing the plugin](../media/wordpress--install-plugin.png)

Select **Install** on the plugin. After it has finished installing, select **Activate**.

### Export your WordPress site

When your application refreshes, you should see a new section in your sidebar called **WP2Static**. Go to that section to begin your first static WordPress export.

From the **Where will you host...** dropdown on the page, select *ZIP archive (.zip)*. WP2Static supports a number of different export types, including manual and automated exports. To make deployment easier, select **Allow offline usage** – this will make all the URLs in your WordPress export relative: `/logo.png` versus `https://mysite.com/logo.png`. It will also reduce the number of asset errors that could occur depending on your theme and WordPress setup.

To do your first export, select **Start static site export** (this operation may take a while), and when it completes, save the ZIP file somewhere you can easily find later.

![Exporting your WordPress site](../media/wordpress--export.png)

## Creating the Workers project

With an export ready of your site, it is time to deploy. To do this, use [Wrangler](https://github.com/cloudflare/wrangler), the command-line tool for Cloudflare Workers. If you have not yet installed and configured Wrangler, refer to the [Get started](/workers/get-started/guide/) guide.

Once Wrangler is installed and configured, create a new project for deploying your static WordPress site to Workers. To generate a new project, run:

```sh
---
header: Generate a new project
---
$ wrangler generate --site wp-static
```

The [`--site`](/workers/platform/sites/configuration/) flag indicates that you want to deploy a static site: your static WordPress site.

### Port the WordPress site

The newly generated `wp-static` directory will contain three components:

1.  A `public` directory, representing the site you want to deploy to Workers. This will be the location of your WordPress site.
2.  A `workers-site` directory, which contains the Workers script that will serve your website content. In this tutorial, you will not change anything in this folder.
3.  A `wrangler.toml` file, which contains the configuration details for your `wp-static` directory. You will populate this file with some information before the project is deployed.

When deploying a website using Workers Sites, your static code – your HTML, CSS, and JavaScript – will be uploaded to Workers KV. The location of these files is by default the `public` folder mentioned above.

Open the ZIP file downloaded from your WordPress static export, and extract the contents of the ZIP into the `public` folder:

```sh
---
header: Copy files into the public directory
---
$ cp -R ~/Downloads/wp-static-html-output-<some-tag>/ ./public
```

Your directory structure should look something like this:

```sh
---
header: Listing the files in wp-static
---
$ tree wp-static
├── public
│   ├── 2018
│   ├── 2019
│   ├── 404.html
│   └── # More exported WordPress files
├── workers-site
│   ├── index.js
│   ├── node_modules
│   └── # More Workers script files
└── wrangler.toml
```

## Deploying

To preview and deploy your application, fill out the fields in your `wrangler.toml` file — the configuration file for this project. Fill out the [`account_id`](/workers/get-started/guide/#6a-obtaining-your-account-id-and-zone-id) field in `wrangler.toml` with your Cloudflare account ID.

Using Wrangler’s preview feature, you can quickly upload a version of your site to the Cloudflare Workers preview service and review that the static export looks as expected. Running `wrangler dev` will upload your static site and preview it in a browser window.

When your site looks correct in Wrangler’s preview, you can move onto publishing your project to a domain. For a guide on how to do this, refer to [Get started](/workers/get-started/guide/#6-configure-your-project-for-deployment).

[![Demo site](../media/wordpress--demo.png)](https://wp-static.signalnerve.workers.dev)

## Limitations

There are some features available in WordPress sites that will not be supported in a static site environment:

*   WordPress Forms
*   WordPress Comments
*   Any links to `/wp-admin` or similar internal WordPress routes

## Conclusion

Deploying your WordPress site to Workers has benefits for your site’s performance, security, and cost. With a static version of your site being served, you can do a number of things with your live WordPress installation:

*   Move your WordPress install to a private URL or subdomain, and serve the static version of your site by deploying the Workers application to your domain. Refer to [Deploying to a Domain](/workers/get-started/guide/#optional-configure-for-deploying-to-a-registered-domain) to learn more.
*   Run your WordPress instance locally, or put your now-hidden WordPress instance behind [Cloudflare Access](https://www.cloudflare.com/teams/access/) to only give access to your contributors. This has a significant effect on the number of attack vectors for your WordPress site and its content.
*   Downgrade your WordPress hosting plan to a cheaper plan. Because the memory and bandwidth requirements for your WordPress instance are now smaller, you can often host it on a cheaper plan, or moving to shared hosting. Your Cloudflare Workers plan is priced per-request and because you can host up to thirty sites on your account, serving a high number of static WordPress sites can be an order of magnitude cheaper on Workers.

Connect with the [Workers community on Discord](https://discord.gg/cloudflaredev) to ask questions, show off what you are building, and discuss the platform with other developers.
