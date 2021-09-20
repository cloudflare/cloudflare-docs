---
order: 0
pcx-content-type: concept
---

# Universal SSL

Cloudflare issues — and renews — free, unshared, publicly trusted SSL certificates to all Cloudflare domains.

When you change your authoritative nameservers to point to Cloudflare, this process happens **automatically and within 24 hours of domain activation**. Provisioning time depends on certain security checks and other requirements mandated by Certificate Authorities (CA).

If you **do not** use Cloudflare for your authoritative nameservers (a CNAME setup), you will need to perform the additional steps described in [Enable Universal SSL](enable-universal-ssl#non-authoritative-partial-domains).

<ButtonGroup>
    <Button type='primary' href='enable-universal-ssl'>Get started</Button>
    <Button type='secondary' href="https://www.cloudflare.com/learning/ssl/what-is-an-ssl-certificate/">Learn more</Button>
</ButtonGroup>

<Aside type="note">

For sites that require an SSL certificate prior to migrating traffic to Cloudflare, purchase <a href="../advanced-certificate-manager">Advanced Certificate Manager</a> or upload a <a href="../custom-certificates">Custom SSL certificate</a> before proxying traffic to Cloudflare.

</Aside>