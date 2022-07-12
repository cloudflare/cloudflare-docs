---
pcx-content-type: reference
title: Combine with SSL for SaaS
weight: 7
---

# Combine with SSL for SaaS

If your application is using a custom hostname — meaning your SaaS provider is using [SSL for SaaS](/cloudflare-for-saas/ssl/) — your application can support a waiting room.

## Applications on Cloudflare

If your application is already using Cloudflare, create a waiting room using the [normal process](/waiting-room/how-to/create-waiting-room/).

## Applications not on Cloudflare

If your application is not using Cloudflare, you need to ask your SaaS provider to [configure a waiting room](/waiting-room/how-to/create-waiting-room/) on their SSL for SaaS zone (using your custom hostname as the **Hostname** value).
