---
title: C3 & Wrangler
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

Before deploying your first Worker, learn about the tools you will to build and deploy your Worker project.

## Cloudflare dashboard

You can build and develop your Worker on the Cloudflare dashboard, without needing to install and use C3 and Wrangler. Continue to the next page to get started with Workers on the Cloudflare dashboard.

## CLI

The Cloudflare Developer Platform ecosystem has two command-line interfaces (CLI): 

- C3: To create new projects.
- Wrangler: To build and deploy your projects.

## C3

{{<render file="/_c3-description.md" productFolder="/workers/" >}}
<br/><br/>
You will use C3 only for new project creation.

## Wrangler

[Wrangler](/workers/wrangler/) is a command-line tool for building with Cloudflare developer products.

With Wrangler, you can [develop](/workers/wrangler/commands/#dev) your Worker locally and remotely, [roll back](/workers/wrangler/commands/#rollback) to a previous deployment of your Worker, [delete](/workers/wrangler/commands/#delete-3) a Worker and its bound Developer Platform resources, and more. Refer to [Wrangler Commands](/workers/wrangler/commands/) to view the full reference of Wrangler commands.

When you run C3 to create your project, C3 will install the latest version of Wrangler and you do not need to install Wrangler again. You can [update Wrangler](/workers/wrangler/install-and-update/#update-wrangler) to a newer version in your project to access new Wrangler capabilities and features.

## Source of truth

If you are building your Worker on the Cloudflare dashboard, you will set up your project configuration (such as environemnt variables, bindings, and routes) through the dashboard. If you are building your project programmatically using C3 and Wrangler, you will rely on a [`wrangler.toml`](/workers/wrangler/configuration/) file to configure your Worker.

Cloudflare recommends choosing and using one [source of truth](/workers/wrangler/configuration/#source-of-truth), the dashboard or `wrangler.toml`, to avoid errors in your project.

## Summary

By reading this page, you have learned:

- How to use C3 to create new Workers and Pages projects.
- How to use Wrangler to develop, configure, and delete your projects.

In the next section, you will learn more about the Cloudflare dashboard before moving on to deploy your first Worker.




