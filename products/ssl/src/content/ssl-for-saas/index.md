---
order: 8
pcx-content-type: overview
---

import SSLforSaaSDefinition from "../_partials/_ssl-for-saas-definition.md"

# SSL for SaaS

<SSLforSaaSDefinition/>

For example, a customer may want to use their vanity domain `app.customer.com` to point to an application hosted on your Cloudflare zone `service.saas.com`.

## Benefits

When you use SSL for SaaS, it helps you:

- Efficiently manage the entire SSL lifecycle, including initial issuance and renewal.
- Offer a branded visitor experience, leading to increased trust.
- Improve SEO rankings.
- Increase site speed via HTTP/2.


## Limitations

If your customers already have their applications on Cloudflare, they cannot control some Cloudflare features for hostnames managed by your Custom Hostnames configuration, including:

- Page Rules
- Firewall Settings
- Web Application Firewall (WAF)
- SSL settings

For more information on these features, refer to [hostname specific behavior](hostname-specific-behavior).

## Availability

SSL for SaaS is available as an add-on purchase for customers on any plan. For more details, refer to [Plans](/ssl-for-saas/plans).

## Next steps

<ButtonGroup>
  <Button type="primary" href="getting-started">Get started</Button>
  <Button type="secondary" href="https://blog.cloudflare.com/introducing-ssl-for-saas/" target="_blank">Learn more</Button>
</ButtonGroup>
