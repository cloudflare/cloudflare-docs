---
title: Cloudflare dashboard
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

The Cloudflare dashboard offers a graphical user interface (GUI) for creating, developing, and deploying your Workers without needing to install Wrangler or C3. This page offers you a brief introduction into how you will be able to use the dashboard to manage your Workers.

## Build with the dashboard

If you would like to build with the Cloudflare dashboard instead of C3 and Wrangler, log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select **Workers & Pages** to begin. The Cloudflare dashboard provides instructions that guide users through their build and deployment process.

## Edit and develop locally with Quick Editor

Instead of using [`wrangler dev`](/workers/wrangler/commands/#dev) to develop your Worker, dashboard users will use the [Quick Editor](https://blog.cloudflare.com/improved-quick-edit).

## Source of truth

If you are building your Worker on the Cloudflare dashboard, you will set up your project configuration (such as environemnt variables, bindings, and routes) through the dashboard. If you are building your project programmatically using C3 and Wrangler, you will rely on a [`wrangler.toml`](/workers/wrangler/configuration/) file to configure your Worker.

Cloudflare recommends choosing and using one [source of truth](/workers/wrangler/configuration/#source-of-truth), the dashboard or `wrangler.toml`, to avoid errors in your project.

## Summary

By reading this page, you have learned:

- How to use the dashboard as an alternative or complement to the CLIs.
- Best practice for your Worker project's configuration and establishing a source of truth for your project.

In the next section, you will build and deploy your first Worker.