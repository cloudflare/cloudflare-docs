---
title: Enforce mTLS
pcx-content-type: reference
weight: 4
meta:
  title: Enforce mTLS — SSL for SaaS
---

# Enforce mTLS — SSL for SaaS

[Mutual TLS (mTLS)](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/) adds an extra layer of protection to application connections by validating certificates on the server and the client.

When building a SaaS application, you may want to enforce mTLS to protect sensitive endpoints — those related payment processing, database updates, and more — from external or even other customer traffic.

## Enable mTLS

Once you have [added a custom hostname](/ssl/ssl-for-saas/getting-started/), go to the Cloudflare Zero Trust dashboard and [add mTLS authentication](/cloudflare-one/identity/devices/mutual-tls-authentication/#add-mtls-authentication-to-your-access-configuration) with a few clicks.