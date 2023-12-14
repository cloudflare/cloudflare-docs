---
title: Bindings, databases and storage
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

## Cloudflare Developer Platform

The [Cloudflare Developer Platform](https://www.cloudflare.com/developer-platform/products/) consists of compute, storage and application development products.

### Bindings

Workers interact with other products on the Cloudflare Developer Platform through [bindings](/workers/configuration/bindings/). Bindings can be configured through the Cloudflare dashboard or `wrangler.toml`.

### Compute

Computer is comprised of [Workers](/workers/) and [Email Routing's Email Workers](/email-routing/email-workers/).


### Storage

Storage is comprised of [R2](/r2/), [KV](/kv/), [Durable Objects](/durable-objects/), [D1](/d1/) and [Hyperdrive](/hyperdrive/).

To understand which storage option is right for you, refer to the [Storage options guide](/workers/platform/storage-options/).

To explore possible database integrations, refer to [Databases](/workers/databases/) in the Workers documentation.

To configure a database integration through the Cloudflare dashboard with a supported third-party (such as Turso, Neon and more), refer to [Database Integrations](/workers/databases/native-integrations/).

### Application development

Application development is comprised of [Pages](/pages/), [Stream](/stream/), and [Images](/images/).


#### Pages

Pages allows developers to deploy front-end applications by connecting to a Git provider, using Wrangler or directly uploading assets. Pages supports popular frameworks such as React, Hugo and others, though you do not need a framework to build with Pages. Pages is the only Cloudflare developer product that does not require a binding to interact with Workers. Insteead, [Pages Functions](/pages/functions/) allows you to use Workers directly within your Pages project.

Workers and Pages are converging into a unified product, but for now, remain a separate experience. Read the [announcement blog post](https://blog.cloudflare.com/pages-and-workers-are-converging-into-one-experience) for more details.


### Feedback

If your learning journey was hindered by inaccurate or missing documentation, [file an issue on GitHub](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) so we can update the documentation with accurate and helpful instructions.