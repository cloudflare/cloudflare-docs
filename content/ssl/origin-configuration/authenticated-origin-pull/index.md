---
order: 4
pcx-content-type: navigation
---

# Authenticated origin pull

Authenticated origin pulls ensure requests to your origin server come from the Cloudflare network.

This authentication becomes particularly important with the Cloudflare Web Application Firewall (WAF). Together with the WAF, you can make sure that **all traffic** is evaluated before receiving a response from your origin server.

If you want your domain to be FIPS compliant, you must [upload your own certificate](set-up#per-hostname--customer-certificates).

<ButtonGroup>
    <Button type="primary" href="set-up">Get started</Button>
    <Button type="secondary" href="explanation">Learn more</Button>
</ButtonGroup>

<Aside type='warning' header='Important'>

Authenticated Origin Pull is incompatible with Railgun.

</Aside>
