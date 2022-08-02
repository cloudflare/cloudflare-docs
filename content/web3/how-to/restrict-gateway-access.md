---
pcx_content_type: reference
title: Restrict gateway access
weight: 6
---

# Restrict gateway access

If you are using a [Web3 gateway](/web3/about/) for internal application calls, you may want to restrict gateway access to specific backend services.

You can achieve this goal by [creating general Access policies](/cloudflare-one/policies/access/) to block normal traffic and then [creating service tokens](/cloudflare-one/identity/service-tokens/) to allow access by your backend service.