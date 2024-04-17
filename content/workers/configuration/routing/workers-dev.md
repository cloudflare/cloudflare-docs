---
pcx_content_type: concept
title: workers.dev
---

# `workers.dev`

Cloudflare Workers accounts come with a `workers.dev` subdomain that is configurable in the Cloudflare dashboard. Your `workers.dev` subdomain allows you to deploy Workers without attaching your domain as a Cloudflare zone. 

The first time you visit the **Workers & Pages** in the Cloudflare dashboard, a `workers.dev` subdomain is automatically assigned to your account.

## Configure `workers.dev`

To change the name of your `workers.dev` account subdomain, such as `<YOUR_ACCOUNT_SUBDOMAIN>.workers.dev`:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages**.
3. Select **Change** next to **Your subdomain**.

All Workers are assigned a `workers.dev` route when they are created or renamed following the syntax `<YOUR_WORKER_NAME>.<YOUR_SUBDOMAIN>.workers.dev.`. The [`name`](/workers/wrangler/configuration/#inheritable-keys) field in your Worker configuration is used as the subdomain for the deployed Worker, (for example, `<YOUR_WORKER_NAME>.<YOUR_SUBDOMAIN>.workers.dev.`).

## Routes with `workers.dev`

Refer to [Routes with `workers.dev`](/workers/configuration/routing/routes/#routes-with-workersdev) to learn more.

## Related resources

- [Announcing `workers.dev`](https://blog.cloudflare.com/announcing-workers-dev)
- [`wrangler.toml` routes configuration](/workers/wrangler/configuration/#types-of-routes)
