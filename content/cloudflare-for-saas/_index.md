---
pcx-content-type: overview
title: Cloudflare for SaaS
weight: 9
---

# Cloudflare for SaaS

{{<render file="_ssl-for-saas-definition.md">}} <br>

As a SaaS provider, you may want to support subdomains under your own zone in addition to letting your customers use their own domain names with your services. For example, a customer may want to use their vanity domain `app.customer.com` to point to an application hosted on your Cloudflare zone `service.saas.com`. Cloudflare for SaaS allows you to increase security, performance, and reliability of your customers' domains.

## Benefits

When you use Cloudflare for SaaS, it helps you to:

*   Provide custom domain support.
*   Keep your customers' traffic encrypted.
*   Keep your customers online.
*   Facilitate fast load times of your customers' domains.
*   Access analytics for all domains.

## Limitations

If your customers already have their applications on Cloudflare, they cannot control some Cloudflare features for hostnames managed by your Custom Hostnames configuration, including:

*   Page Rules
*   Firewall Settings
*   Web Application Firewall (WAF)
*   SSL settings

For more information on these features, refer to [Hostname management](/cloudflare-for-saas/ssl/hostname-specific-behavior/).

## How it works

Through a suite of easy-to-use products, Cloudflare for SaaS routes traffic from custom hostnames to the origin through a fallback domain. As the SaaS provider, you can extend Cloudflare's products to customer-owned custom domains by adding them to your zone [as custom hostnames](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/). Possible configurations include:

### Standard SSL:

Standard SSL is available on all plans.

![Standard case](/cloudflare-for-saas/static/use-cases/Standard.png)

### SSL with Apex Proxying:

This allows you to support apex domains even if your customers are using a DNS provider that doesn't allow a CNAME at the apex.

![Advanced case](/cloudflare-for-saas/static/use-cases/Advanced.png)

### SSL with BYOIP:

This allows you to support apex domains even if your customers are using a DNS provider that doesn't allow a CNAME at the apex. Also, you can point to your own IPs if you want to bring an IP range to Cloudflare (instead of Cloudflare provided IPs).

![Pro Case](/cloudflare-for-saas/static/use-cases/Pro.png)

## Availability

Cloudflare for SaaS is bundled with Enterprise plans and available as an add-on purchase for customers on any plan. For more details, refer to [Plans](/cloudflare-for-saas/plans/).

## Next steps

{{<button-group>}}
  {{<button type="primary" href="getting-started/">}}Get started{{</button>}}
  {{<button type="secondary" href="https://blog.cloudflare.com/introducing-ssl-for-saas/" target="_blank">}}Learn more{{</button>}}
{{</button-group>}}
