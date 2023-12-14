---
title: Get started
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

## Get started

Understand the difference between C3 and Wrangler, command-line tools for building with Cloudflare, and create your first Worker. If you prefer to work in the Cloudflare dashboard rather than programmatically, [follow the dashboard instructions to get started](/workers/get-started/guide/#get-started-in-the-dashboard).

### C3 and Wrangler

You will use two command-line tools when building with Workers: C3 and Wrangler. You will use C3 to create your Worker and Wrangler to develop, test and deploy it.

[C3](https://www.npmjs.com/package/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare. C3 leverages officially developed templates for Workers and framework-specific setup guides to ensure each new application that you set up follows Cloudflare and any third-party best practices for deployment on the Cloudflare network.

When you install C3, it also installs [Wrangler](/workers/wrangler/), a command-line tool for building with Cloudflare developer products. Wrangler allows you to perform [commands](/workers/wrangler/commands/) to build with Workers as well as other developer product projects.

After you create your Worker, you can customize configuration via the [`wrangler.toml` file](/workers/wrangler/configuration/) or the Cloudflare dashboard. It is important to note that even though you can make changes to your Worker on the Cloudflare dashboard if you start building programmatically, `wrangler.toml` should remain the [source of truth](/workers/wrangler/configuration/#source-of-truth) if you are using Wrangler.

### Build your first Worker

Create your first Worker by following the [Get started guide](/workers/get-started/guide/).
