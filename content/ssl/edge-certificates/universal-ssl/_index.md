---
pcx-content-type: concept
title: Universal SSL
weight: 1
---

# Universal SSL

{{<render file="_universal-ssl-definition.md">}}

When you change your authoritative nameservers to point to Cloudflare, this process happens **automatically** and between **15 minutes to 24 hours** of domain activation. Provisioning time depends on certain security checks and other requirements mandated by Certificate Authorities (CA).

If you **do not** use Cloudflare for your authoritative nameservers (a CNAME setup), you will need to perform the additional steps described in [Enable Universal SSL](/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#non-authoritative-partial-domains).

{{<button-group>}}
    {{<button type="primary" href="/ssl/edge-certificates/universal-ssl/enable-universal-ssl">}}Get started{{</button>}}
    {{<button type="secondary" href="https://www.cloudflare.com/learning/ssl/what-is-an-ssl-certificate/" target="_blank">}}Learn more{{</button>}}
{{</button-group>}}

{{<Aside type="note">}}

For sites that require an SSL certificate prior to migrating traffic to Cloudflare or need to disable certain cipher suites, purchase an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager) or upload a [custom certificate](/ssl/edge-certificates/custom-certificates) before proxying traffic to Cloudflare.

{{</Aside>}}
