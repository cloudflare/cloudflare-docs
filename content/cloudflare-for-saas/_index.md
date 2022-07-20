---
pcx-content-type: overview
title: Cloudflare for SaaS
weight: 9
---

# Cloudflare for SaaS

{{<render file="_ssl-for-saas-definition.md">}} <br>

For example, a customer may want to use their vanity domain `app.customer.com` to point to an application hosted on your Cloudflare zone `service.saas.com`. As a SaaS provider, you can not only manage custom hostnames but also increase security, performance, and reliability for your end customer through Clooudflare products.

## Benefits

When you use Cloudflare for SaaS, it helps you to:

*   Provide custom domain support.
*   Keep your customers' traffic encrypted.
*   Keep your customers online.
*   Facilitate fast load times of your customers' domains.

## Limitations

If your customers already have their applications on Cloudflare, they cannot control some Cloudflare features for hostnames managed by your Custom Hostnames configuration, including:

*   Page Rules
*   Firewall Settings
*   Web Application Firewall (WAF)
*   SSL settings

For more information on these features, refer to [Hostname management](/cloudflare-for-saas/ssl/hostname-specific-behavior/).

## How it works

Through a suite of easy-to-use products, Cloudflare for SaaS routes traffic from custom hostnames to the origin through a fallback domain. As the SaaS provider, you can extend Cloudflare's products to customer-owned custom domains by adding them to your zone [as custom hostnames](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/). Refer to [Configurations](/cloudflare-for-saas/plans/#configurations) for more detail.

![Pro Case](/cloudflare-for-saas/static/use-cases/Pro.png)

## Availability

Cloudflare for SaaS is bundled with Enterprise plans and available as an add-on purchase for customers on any plan. For more details, refer to [Plans](/cloudflare-for-saas/plans/).

## Next steps

{{<button-group>}}
  {{<button type="primary" href="getting-started/">}}Get started{{</button>}}
  {{<button type="secondary" href="https://blog.cloudflare.com/introducing-ssl-for-saas/" target="_blank">}}Learn more{{</button>}}
{{</button-group>}}
