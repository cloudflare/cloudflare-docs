---
pcx_content_type: reference
title: Product compatibility
layout: wide
weight: 3
meta:
    title: Product compatibility | Orange-to-Orange zones
---

# Product compatibility

As a general rule, settings on the customer zone will override settings on the SaaS zone. In addition, [Orange-to-Orange](/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/) does not permit traffic directed to a custom hostname zone into another custom hostname zone.

The following table provides a list of compatibility guidelines for various Cloudflare products and features.

{{<Aside type="note">}}

This is not an exhaustive list of Cloudflare products and features.

{{</Aside>}}

| Product | Customer zone | SaaS provider zone | Notes |
| --- | --- | --- | --- |
| [Access](/cloudflare-for-platforms/cloudflare-for-saas/security/secure-with-access/) | Yes | Yes |
| [API Shield](/api-shield/) | Yes | No |
| [Argo Smart Routing](/argo-smart-routing/) | No | Yes | Customer zones can still use Smart Routing for non-O2O traffic. |
| [Bot Management](/bots/plans/bm-subscription/) | Yes* | Yes* | Bot Management cannot be enabled on both the customer zone and the SaaS zone |
| [Browser Integrity Check](/waf/tools/browser-integrity-check/) | Yes | Yes |
| [Cache](/cache/) | Yes* | Yes | Though caching is possible on a customer zone, it is generally discouraged (especially for HTML).<br/><br/>Your SaaS provider likely performs its own caching outside of Cloudflare and caching on your zone might lead to out-of-sync or stale cache states.<br/><br/>Customer zones can still cache content that are not routed through a SaaS provider's zone.|
| [China Network](/china-network/) | No | No |
| [DNS](/dns/) | Yes* | Yes | As a SaaS customer, do not remove the records related to your Cloudflare for SaaS setup.<br/><br/>Otherwise, your traffic will begin routing away from your SaaS provider. |
| [HTTP/2 prioritization](https://blog.cloudflare.com/better-http-2-prioritization-for-a-faster-web/) | Yes | Yes* | This feature must be enabled on the customer zone to function. |
| [Image resizing](/images/transform-images/) | Yes | Yes |
| IPv6 | Yes | Yes |
| [IPv6 Compatibility](/network/ipv6-compatibility/) | Yes | Yes* | If the customer zone has **IPv6 Compatibility** enabled, generally the SaaS zone should as well.<br/><br/>If not, make sure the SaaS zone enables [Pseudo IPv4](/network/pseudo-ipv4/). |
| [Load Balancing](/load-balancing/) | No | Yes | Customer zones can still use Load Balancing for non-O2O traffic. |
| [Page Rules](/rules/page-rules/) | Yes* | Yes | Page Rules that match the subdomain used for O2O may block or interfere with the flow of visitors to your website. |
| [Mirage](/speed/optimization/images/mirage/) | Yes | Yes |
| [Origin Rules](/rules/origin-rules/) | Yes | Yes | Enterprise zones can configure Origin Rules, by setting the Host Header and DNS Overrides to direct traffic to a SaaS zone. |
| [Polish](/images/polish/) | Yes* | Yes | Polish only runs on cached assets. If the customer zone is bypassing cache for SaaS zone destined traffic, then images optimized by Polish will not be loaded from origin. |
| [Rate Limiting](/waf/rate-limiting-rules/) | Yes* | Yes | Rate Limiting rules that match the subdomain used for O2O may block or interfere with the flow of visitors to your website. |
| [Security Level](/waf/tools/security-level/) | Yes | Yes |
| [Spectrum](/spectrum/) | No | No |
| [Transform Rules](/rules/transform/) | Yes* | Yes | Transform Rules that match the subdomain used for O2O may block or interfere with the flow of visitors to your website. |
| [WAF custom rules](/waf/custom-rules/) | Yes | Yes | WAF custom rules that match the subdomain used for O2O may block or interfere with the flow of visitors to your website. |
| [WAF managed rules](/waf/managed-rules/) | Yes | Yes |
| [Waiting Room](/waiting-room/) | Yes | Yes |
| [Websockets](/network/websockets/) | No | No |
| [Workers](/workers/) | Yes* | Yes | Similar to Page Rules, Workers that match the subdomain used for O2O may block or interfere with the flow of visitors to your website. |
| [Zaraz](/zaraz/) | Yes | No |
