---
order: 0
pcx-content-type: concept
---

import UniversalSSLDefinition from "../../\_partials/\_universal-ssl-definition.md"

# Universal SSL

<UniversalSSLDefinition/>

When you change your authoritative nameservers to point to Cloudflare, this process happens **automatically** and between **15 minutes to 24 hours** of domain activation. Provisioning time depends on certain security checks and other requirements mandated by Certificate Authorities (CA).

If you **do not** use Cloudflare for your authoritative nameservers (a CNAME setup), you will need to perform the additional steps described in [Enable Universal SSL](enable-universal-ssl#non-authoritative-partial-domains).

<ButtonGroup>
    <Button type='primary' href='enable-universal-ssl'>Get started</Button>
    <Button type='secondary' href="https://www.cloudflare.com/learning/ssl/what-is-an-ssl-certificate/" target="_blank">Learn more</Button>
</ButtonGroup>

<Aside type="note">

For sites that require an SSL certificate prior to migrating traffic to Cloudflare or need to disable certain cipher suites, purchase an <a href="../advanced-certificate-manager">advanced certificate</a> or upload a <a href="../custom-certificates">Custom SSL certificate</a> before proxying traffic to Cloudflare.

</Aside>
