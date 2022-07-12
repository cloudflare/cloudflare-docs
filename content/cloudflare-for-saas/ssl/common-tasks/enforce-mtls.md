---
title: Enforce mTLS
pcx-content-type: reference
weight: 4
meta:
  title: Enforce mTLS — Cloudflare for SaaS
---

# Enforce mTLS — Cloudflare for SaaS

[Mutual TLS (mTLS)](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/) adds an extra layer of protection to application connections by validating certificates on the server and the client.

When building a SaaS application, you may want to enforce mTLS to protect sensitive endpoints — those related to payment processing, database updates, and more — from external or even other customer traffic.

## Enable mTLS

Once you have [added a custom hostname](/cloudflare-for-saas/getting-started/), you can enable mTLS by using Cloudflare Access. Go to the Cloudflare Zero Trust dashboard and [add mTLS authentication](/cloudflare-one/identity/devices/mutual-tls-authentication/) with a few clicks.

{{<Aside type="note">}}Currently, you cannot add mTLS policies for custom hostnames using [API Shield](/api-shield/security/mtls/). However, this functionality will be available in the future.{{</Aside>}}