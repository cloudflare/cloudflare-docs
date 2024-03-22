---
title: Cloudflare Developer Platform
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

The [Cloudflare Developer Platform](https://www.cloudflare.com/developer-platform/products/) offers various services to empower developers to build full-stack serverless applications, including: [compute](https://www.cloudflare.com/developer-platform/products/#compute), [storage](https://www.cloudflare.com/developer-platform/products/#storage), [web development, image optimization, video streaming](https://www.cloudflare.com/developer-platform/products/#webdev) and [AI](https://ai.cloudflare.com/).

Browse the Developer Platform offerings before you dive into creating your first Worker in the next module.

## Compute

**Cloudflare Workers**

As you have learned in previous sections, Cloudflare Workers allow you to build and deploy serverless applications instantly across the globe. In the following sections, you will build your first Worker and experiment with configuration options like Cron Triggers and set up your first route.

**Email Routing**

[Cloudflare Email Routing](/email-routing/) allows you to create custom email addresses for your domain and route incoming emails to your preferred mailbox. If you already have a website, refer to [Enable Email Routing](/email-routing/get-started/enable-email-routing/) to set up a custom email address for your site.

## Storage

Cloudflare storage offerings differ per use case.

{{<render file="/_storage-products-table.md" productFolder="/workers/">}}

For a detailed guide to choosing the correct storage option, refer to [Choose a data or storage product](/workers/platform/storage-options/).

## Web development

[Cloudflare Pages](/pages/) allows you to build full-stack applications at scale. [Pages Functions](/pages/functions/) (which are Workers under the hood) allow you to add dynamic functionality from within Pages project without setting up an additional Worker.

## Image optimization and video streaming

[Cloudflare Stream](https://developers.cloudflare.com/stream/) and [Cloudflare Images](https://developers.cloudflare.com/images/) deliver videos and pictures to your end-users without configuring or maintaining infrastructure.

## AI

[Workers AI](/workers-ai/) allow you to build and deploy AI applications that run machine learning models powered by serverless GPUs. Deploying your first large language model takes less than 3 minutes with Cloudflare, refer to the [Get started guide](/workers-ai/get-started/workers-wrangler/) to test it yourself.

## Summary

At this point, you have learned:

- More about what the Cloudflare Developer Platform offers.
- The difference between compute, storage, application development, and AI products.

In the next section, you will build and deploy your first Worker.

### Feedback

If your learning journey was hindered by inaccurate or missing documentation, [file an issue on GitHub](https://github.com/cloudflare/cloudflare-docs/issues/new/choose).

### Community

Connect with the [Cloudflare Developer Platform community on Discord](https://discord.cloudflare.com) to ask questions, share what you are building, and discuss the platform with other developers.


