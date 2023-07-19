---
title: Get started
pcx_content_type: get-started
weight: 3
layout: single
meta:
  title: Get started with SSL/TLS
---

# Get started with SSL/TLS

Follow the steps below to enable SSL/TLS protection for your application.

{{<tutorial>}}

{{<tutorial-prereqs>}}

- [Create an account and register an application](/fundamentals/get-started/setup/)

{{</tutorial-prereqs>}}



{{<tutorial-step title="Choose an edge certificate" >}}

As explained in the [concepts page](/ssl/concepts/#ssltls-certificate), edge certificates are the SSL/TLS certificates that Cloudflare presents to your visitors.

Cloudflare offers a variety of options for your application's edge certificates:

- [**Universal certificates**](/ssl/edge-certificates/universal-ssl/): {{<render file="_universal-ssl-definition.md">}}
- [**Advanced certificates**](/ssl/edge-certificates/advanced-certificate-manager/): {{<render file="_acm-definition.md">}}
- [**Custom certificates**](/ssl/edge-certificates/custom-certificates/): {{<render file="_custom-certificates-definition.md">}}
- [**Keyless certificates**](/ssl/keyless-ssl/) (Enterprise only): {{<render file="_keyless-ssl-definition.md">}}

{{<Aside type="note" header="Note:">}}

{{<render file="_ssl-for-saas-definition.md" productFolder="cloudflare-for-platforms" >}}

For more details, refer to [Cloudflare for SaaS (managed hostnames)](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/).

{{</Aside>}}

{{</tutorial-step>}}

{{<tutorial-step title="Choose your encryption mode" >}}

Once you have chosen your edge certificate, [choose an encryption mode](/ssl/origin-configuration/ssl-modes/).

Encryption modes specify how Cloudflare encrypts connections between (a) visitors and Cloudflare, and (b) Cloudflare and your origin server. For more context about this two-part process refer to the [concepts page](/ssl/concepts/#ssltls-certificate).

Note that some encryption modes will require you to have a valid [origin certificate](/ssl/concepts/#origin-certificate), which is managed on your origin server. Each encryption mode setup page lists out this and other requirements and you can also [consider other Cloudflare options to use with your origin server](/ssl/origin-configuration/), such as [Origin CA certificates](/ssl/origin-configuration/origin-ca/).

{{</tutorial-step>}}

{{<tutorial-step title="Enforce HTTPS connections" >}}

{{<render file="_enforce-https-recommendation.md">}}

{{</tutorial-step>}}

{{<tutorial-step title="Enable additional features" optional=true >}}

{{<render file="_get-started-additional-features.md">}}

{{</tutorial-step>}}

{{</tutorial>}}