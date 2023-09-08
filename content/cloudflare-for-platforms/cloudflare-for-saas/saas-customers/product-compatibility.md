---
pcx_content_type: reference
title: Product compatibility
layout: list
weight: 3
meta:
    title: Product compatibility | Orange-to-Orange zones
---

# Product compatibility

The following table provides a list of compatibility guidelines for various Cloudflare products and features.

As a general rule, settings on the customer zone will override settings on the SaaS zone.

{{<Aside type="note">}}

This is not an exhaustive list of Cloudflare products and features.

{{</Aside>}}

{{<table-wrap>}}

| Product | Customer zone | Saas provider zone | Notes |
| --- | --- | --- | --- |
| [Access](/cloudflare-for-platforms/cloudflare-for-saas/security/secure-with-access/) | Yes | Yes |
| [API Shield](/api-shield/) | Yes | No |
| [Argo Smart Routing](/argo-smart-routing/) | No | Yes | Customer zones can still use Smart Routing for non-O2O traffic. |
| [Bot Management](/bots/plans/bm-subscription/) | Yes* | Yes* | Bot Management cannot be enabled on both the customer zone and the SaaS zone |
| [Browser Integrity Check](/fundamentals/security/browser-integrity-check/) | Yes | Yes |
| [Cache](/cache/) | Yes* | Yes | Though caching is possible on a customer zone, it is generally discouraged (especially for HTML).<br/><br/>Your SaaS provider likely performs its own caching outside of Cloudflare and caching on your zone might lead to out-of-sync or stale cache states.<br/><br/>Customer zones can still cache content that are not routed through a SaaS provider's zone.|
| [China Network](/china-network/) | No | No |
| [DNS](/dns/) | Yes* | Yes | As a SaaS customer, do not remove the records related to your Cloudflare for SaaS setup.<br/><br/>Otherwise, your traffic will begin routing away from your SaaS provider. |
| [HTTP/2 prioritization](https://blog.cloudflare.com/better-http-2-prioritization-for-a-faster-web/) | Yes | Yes* | This feature must be enabled on the customer zone to function. |
| [Image resizing](/images/image-resizing/) | Yes | Yes |
| IPv6 | Yes | Yes |
| [IPv6 Compatibility](/support/network/understanding-and-configuring-cloudflares-ipv6-support/) | Yes | Yes* | If the customer zone has **IPv6 Compatibility** enabled, generally the SaaS zone should as well.<br/><br/>If not, make sure the SaaS zone enables [Pseudo IPv4](/support/network/understanding-and-configuring-cloudflares-ipv6-support/#enable-pseudo-ipv4). |
| [Load Balancing](/load-balancing/) | No | Yes | Customer zones can still use Load Balancing for non-O2O traffic. |
| [Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/) | Yes* | Yes | Page Rules that match the subdomain used for O2O may block or interfere with the flow of visitors to your website. |
| [Mirage](/speed/optimization/images/mirage/) | Yes | Yes |
| [Origin Rules](/rules/origin-rules/) | No | Yes | Origin Rules that match the subdomain used for O2O may block or interfere with the flow of visitors to your website. |
| [Polish](/images/polish/) | Yes* | Yes | Polish only runs on cached assets. If the customer zone is bypassing cache for SaaS zone destined traffic, then images optimized by Polish will not be loaded from origin. |
| [Rate Limiting](/waf/rate-limiting-rules/) | Yes* | Yes | Rate Limiting rules that match the subdomain used for O2O may block or interfere with the flow of visitors to your website. |
| [Security Level](/fundamentals/security/security-level/) | Yes | Yes |
| [Spectrum](/spectrum/) | No | No |
| [Transform Rules](/rules/transform/) | Yes* | Yes | Transform Rules that match the subdomain used for O2O may block or interfere with the flow of visitors to your website. |
| [WAF custom rules](/waf/custom-rules/) | Yes | Yes | WAF custom rules that match the subdomain used for O2O may block or interfere with the flow of visitors to your website. |
| [WAF managed rules](/waf/managed-rules/) | Yes | Yes |
| [Waiting Room](/waiting-room/) | Yes | Yes |
| [Websockets](/support/network/using-cloudflare-with-websockets/) | No | No |
| [Workers](/workers/) | Yes* | Yes | Similar to Page Rules, Workers that match the subdomain used for O2O may block or interfere with the flow of visitors to your website. |
| [Zaraz](/zaraz/) | Yes | No | 

{{</table-wrap>}}
