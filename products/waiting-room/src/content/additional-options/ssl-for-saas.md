---
order: 6
pcx-content-type: reference
---

# Combine with SSL for SaaS

If your application is using a custom hostname — meaning your SaaS provider is using [SSL for SaaS](https://developers.cloudflare.com/ssl/ssl-for-saas) — your application can support a waiting room.

## Applications on Cloudflare

If your application is already using Cloudflare, create a waiting room using the [normal process](/how-to/create-via-dashboard).

## Applications not on Cloudflare

If your application is not using Cloudflare, you need to ask your SaaS provider to [configure a waiting room](/how-to/create-via-dashboard) on their SSL for SaaS zone (using your custom hostname as the **Hostname** value).