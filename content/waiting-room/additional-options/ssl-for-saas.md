---
pcx_content_type: reference
title: Combine with Cloudflare for SaaS
weight: 7
---

# Combine with Cloudflare for SaaS

If your application is using a custom hostname — meaning your SaaS provider is using [Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/) — your application can support a waiting room.

## Applications on Cloudflare

If your application is already using Cloudflare, create a waiting room using the [typical process](/waiting-room/how-to/create-waiting-room/).

## Applications not on Cloudflare

If your application is not using Cloudflare, you need to ask your SaaS provider to configure a waiting room on [your Cloudflare for SaaS zone](/waiting-room/how-to/place-waiting-room/#custom-hostnames).
