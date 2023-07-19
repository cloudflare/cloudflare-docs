---
pcx_content_type: overview
title: Cloudflare for SaaS
weight: 6
---

# Cloudflare for SaaS

{{<render file="_ssl-for-saas-definition.md">}} <br>

As a SaaS provider, you may want to support subdomains under your own zone in addition to letting your customers use their own domain names with your services. For example, a customer may want to use their vanity domain `app.customer.com` to point to an application hosted on your Cloudflare zone `service.saas.com`. Cloudflare for SaaS allows you to increase security, performance, and reliability of your customers' domains.

{{<render file="_non-contract-enablement.md" productFolder="fundamentals" >}}

## Benefits

When you use Cloudflare for SaaS, it helps you to:

*   Provide custom domain support.
*   Keep your customers' traffic encrypted.
*   Keep your customers online.
*   Facilitate fast load times of your customers' domains.
*   Gain insight through traffic analytics.

## Limitations

If your customers already have their applications on Cloudflare, they cannot control some Cloudflare features for hostnames managed by your Custom Hostnames configuration, including:

*   Wildcard DNS
*   Spectrum
*   Argo
*   Page Shield

## How it works

As the SaaS provider, you can extend Cloudflare's products to customer-owned custom domains by adding them to your zone [as custom hostnames](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/). Through a suite of easy-to-use products, Cloudflare for SaaS routes traffic from custom hostnames to an origin, set up on your domain. Cloudflare for SaaS is highly customizable. Three possible configurations are shown below.

### Standard Cloudflare for SaaS configuration:

Custom hostnames are routed to a default origin server called fallback origin. This configuration is available on all plans.

![Standard case](/images/cloudflare-for-platforms/use-cases/Standard.png)

### Cloudflare for SaaS with Apex Proxying:

This allows you to support apex domains even if your customers are using a DNS provider that does not allow a CNAME at the apex. This is available as an add-on for Enterprise plans. For more details, refer to [Apex Proxying](/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/).

![Advanced case](/images/cloudflare-for-platforms/use-cases/Advanced.png)

### Cloudflare for SaaS with BYOIP:

This allows you to support apex domains even if your customers are using a DNS provider that does not allow a CNAME at the apex. Also, you can point to your own IPs if you want to bring an IP range to Cloudflare (instead of Cloudflare provided IPs). This is available as an add-on for Enterprise plans.

![Pro Case](/images/cloudflare-for-platforms/use-cases/Pro.png)

## Availability

Cloudflare for SaaS is bundled with non-Enterprise plans and available as an add-on for Enterprise plans. For more details, refer to [Plans](/cloudflare-for-platforms/cloudflare-for-saas/plans/).

## Next steps

{{<button-group>}}
  {{<button type="primary" href="start/getting-started/">}}Get started{{</button>}}
  {{<button type="secondary" href="https://blog.cloudflare.com/introducing-ssl-for-saas/" target="_blank">}}Learn more{{</button>}}
{{</button-group>}}
