---
title: Bindings, databases and storage
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

## Cloudflare Developer Platform

The [Cloudflare Developer Platform](https://www.cloudflare.com/developer-platform/products/) consists of compute, storage and application development products that allow you to build full-stack applications on Cloudflare's global network.

It is important to note that the developer platform product offering is growing with new releases and features updates. To review a list of product documentation related to Cloudflare Developer Platform:

1. Go to [Cloudflare Docs](https://developers.cloudflare.com).
2. Select **Product directory** in the top menu.
3. Select the **Developer platform** filter to view [product documentation for Cloudflare Developer Platform products](https://developers.cloudflare.com/products/?product-group=Developer+platform).

### Bindings

Workers interact with other products on the Cloudflare Developer Platform through [bindings](/workers/runtime-apis/bindings/).

You can configure bindings through the Cloudflare dashboard or `wrangler.toml`. After you configure your bindings, access them through the `env` parameter that is provided at the entry point to your Worker. Refer to [Bindings in ES modules format](/workers/reference/migrate-to-module-workers/#bindings-in-es-modules-format) to learn more.

### Application development

Some application development products include:

* [Pages](/pages/): Build front-end applications.
* [Stream](/stream/): Live and on-demand video streaming.
* [Images](/images/): Image optimization.

#### Pages

Pages allows developers to deploy front-end applications by connecting to a Git provider, using Wrangler or directly uploading assets. Pages supports popular frameworks such as React, Hugo and others, though you do not need a framework to build with Pages. Pages is the only Cloudflare developer product that does not require a binding to interact with Workers. Instead, [Pages Functions](/pages/functions/) allows you to use Workers directly within your Pages project.

Workers and Pages are converging into a unified product, but for now, remain a separate experience. Read the [announcement blog post](https://blog.cloudflare.com/pages-and-workers-are-converging-into-one-experience) for more details.

### Storage

Some Cloudflare Developer storage products include:

* [R2](/r2/): Object storage for all your data.
* [KV](/kv/): Global, low-latency, key-value data storage.
* [Durable Objects](/durable-objects/): Globally distributed coordination API with strongly consistent storage.
* [D1](/d1/): Cloudflare’s native serverless database.

To understand which storage option is right for you, refer to the [Storage options guide](/workers/platform/storage-options/).

To explore possible database integrations, refer to [Databases](/workers/databases/) in the Workers documentation.

To configure a database integration through the Cloudflare dashboard with a supported third-party (such as Turso, Neon and more), refer to [Database Integrations](/workers/databases/native-integrations/).

### Related resources

Review projects you can build with Workers in [Tutorials](/workers/tutorials/).

### Feedback

If your learning journey was hindered by inaccurate or missing documentation, [file an issue on GitHub](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) so we can update the documentation with accurate and helpful instructions.

### Community

Connect with the [Cloudflare Developer Platform community on Discord](https://discord.cloudflare.com) to ask questions, share what you are building, and discuss the platform with other developers.