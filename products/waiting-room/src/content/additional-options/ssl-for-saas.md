---
order:
pcx-content-type: reference
---

# Combine with SSL for SaaS

If you are using a custom hostname (part of [SSL for SaaS](https://developers.cloudflare.com/ssl/ssl-for-saas)), your application can support a waiting room.

## Applications on Cloudflare

If your application is already using Cloudflare, create a waiting room using the [normal process](/how-to/create-via-dashboard).

## Applications not on Cloudflare

If your application is not using Cloudflare, you need to ask your SaaS provider to [configure a waiting room](/how-to/create-via-dashboard) using your custom hostname as the **Hostname** value.