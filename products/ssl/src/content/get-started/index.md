---
title: Get started
order: 1
pcx-content-type: tutorial
---

import UniversalSSLDefinition from "../_partials/_universal-ssl-definition.md"
import ACMDefinition from "../_partials/_acm-definition.md"
import CustomCertificateDefinition from "../_partials/_custom-certificates-definition.md"
import KeylessSSLDefinition from "../_partials/_keyless-ssl-definition.md"
import SSLforSaaSDefinition from "../_partials/_ssl-for-saas-definition.md"

# Get started with SSL/TLS

Follow the steps below to enable SSL/TLS protection for your application.

---

## Prerequisites

- [Create an account and register an application](https://support.cloudflare.com/hc/articles/360059655691)

---

## Step 1 — Choose an edge certificate

Cloudflare offers a variety of options for your application's edge certificates:

- [**Universal certificates**](/edge-certificates/universal-ssl): <UniversalSSLDefinition/>
- [**Advanced certificates**](/edge-certificates/advanced-certificate-manager) (which supercede legacy [Dedicated Certificates](https://support.cloudflare.com/hc/articles/228009108)): <ACMDefinition/>
- [**Custom certificates**](/edge-certificates/custom-certificates): <CustomCertificateDefinition/>
- [**Keyless certificates**](/keyless-ssl) (Enterprise only): <KeylessSSLDefinition/>

<Aside type="note" header="Note:">

<SSLforSaaSDefinition/>

For more details, refer to [SSL for SaaS (managed hostnames)](/ssl-for-saas).

</Aside>

## Step 2 — Choose your encryption mode

Once you have chosen your edge certificate, [choose an encryption mode](/origin-configuration/ssl-modes) to specify how Cloudflare should encrypt connections between a) visitors and Cloudflare and b) Cloudflare and your origin server.

<Aside type="warning" header="Warning:">

Before choosing an encryption mode, make sure you have changed relevant settings on your application or origin server. Otherwise, visitors may encounter errors on your site.

</Aside>

## Step 3 (optional) — Enable additional features

After you have chosen your edge certificate and updated your encryption mode, review the following Cloudflare settings:

- [Edge certificates](/edge-certificates/additional-options): Customize different aspects of your edge certificates, from enabling **Opportunistic Encryption** to specifying a **Minimum TLS Version**.
- [Authenticated origin pull](/origin-configuration/authenticated-origin-pull): Ensure all requests to your origin server originate from the Cloudflare network.
- [Notifications](/notifications): Set up alerts related to certificate validation status, issuance, deployment, renewal, and expiration.
