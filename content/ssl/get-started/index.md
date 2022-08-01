---
title: Get started
pcx_content_type: get-started
weight: 2
layout: single
meta:
  title: Get started with SSL/TLS
---

# Get started with SSL/TLS

Follow the steps below to enable SSL/TLS protection for your application.

---

## Prerequisites

- [Create an account and register an application](https://support.cloudflare.com/hc/articles/360059655691)

---

## Step 1 — Choose an edge certificate

Cloudflare offers a variety of options for your application's edge certificates:

- [**Universal certificates**](/ssl/edge-certificates/universal-ssl/): {{<render file="_universal-ssl-definition.md">}}
- [**Advanced certificates**](/ssl/edge-certificates/advanced-certificate-manager/): {{<render file="_acm-definition.md">}}
- [**Custom certificates**](/ssl/edge-certificates/custom-certificates/): {{<render file="_custom-certificates-definition.md">}}
- [**Keyless certificates**](/ssl/keyless-ssl/) (Enterprise only): {{<render file="_keyless-ssl-definition.md">}}

{{<Aside type="note" header="Note:">}}

{{<render file="../../cloudflare-for-saas/_partials/_ssl-for-saas-definition.md">}}

For more details, refer to [Cloudflare for SaaS (managed hostnames)](/cloudflare-for-saas/security/certificate-management/).

{{</Aside>}}

## Step 2 — Choose your encryption mode

Once you have chosen your edge certificate, [choose an encryption mode](/ssl/origin-configuration/ssl-modes/) to specify how Cloudflare should encrypt connections between a) visitors and Cloudflare and b) Cloudflare and your origin server.

{{<Aside type="warning" header="Warning:">}}

Before choosing an encryption mode, make sure you have changed relevant settings on your application or origin server. Otherwise, visitors may encounter errors on your site.

{{</Aside>}}

## Step 3 — Enforce HTTPS connections

Even if your application has an active edge certificate, visitors can still access resources over unsecured HTTP connections.

Using various Cloudflare settings, however, you can force all or most visitor connections to [use HTTPS](/ssl/edge-certificates/encrypt-visitor-traffic/).

## Step 4 (optional) — Enable additional features

After you have chosen your edge certificate and updated your encryption mode, review the following Cloudflare settings:

- [Edge certificates](/ssl/edge-certificates/additional-options/): Customize different aspects of your edge certificates, from enabling **Opportunistic Encryption** to specifying a **Minimum TLS Version**.
- [Authenticated origin pull](/ssl/origin-configuration/authenticated-origin-pull/): Ensure all requests to your origin server originate from the Cloudflare network.
- [Notifications](/fundamentals/notifications/notification-available/): Set up alerts related to certificate validation status, issuance, deployment, renewal, and expiration.
