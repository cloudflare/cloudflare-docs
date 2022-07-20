---
pcx-content-type: overview
title: Cloudflare for SaaS
weight: 9
---

# Cloudflare for SaaS

{{<render file="_ssl-for-saas-definition.md">}} <br>

For example, a customer may want to use their vanity domain `app.customer.com` to point to an application hosted on your Cloudflare zone `service.saas.com`.

## Benefits

When you use Cloudflare for SaaS, it helps you:

*   Efficiently manage the entire SSL lifecycle, including initial issuance and renewal.
*   Offer a branded visitor experience, leading to increased trust.
*   Improve SEO rankings.
*   Increase site speed via HTTP/2.

## Limitations

If your customers already have their applications on Cloudflare, they cannot control some Cloudflare features for hostnames managed by your Custom Hostnames configuration, including:

*   Page Rules
*   Firewall Settings
*   Web Application Firewall (WAF)
*   SSL settings

For more information on these features, refer to [Hostname Management](/cloudflare-for-saas/ssl/hostname-specific-behavior/).

## Availability

Cloudflare for SaaS is bundled with Enterprise plans and available as an add-on purchase for customers on any plan. For more details, refer to [Plans](/cloudflare-for-saas/plans/).

## Next steps

{{<button-group>}}
  {{<button type="primary" href="getting-started/">}}Get started{{</button>}}
  {{<button type="secondary" href="https://blog.cloudflare.com/introducing-ssl-for-saas/" target="_blank">}}Learn more{{</button>}}
{{</button-group>}}
