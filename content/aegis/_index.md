---
title: Overview
pcx_content_type: overview
weight: 1
layout: overview
---

# Cloudflare Aegis

{{<description>}}
Leverage dedicated IPs to improve your origin security and implement Zero Trust.
{{</description>}}

{{<plan type="enterprise">}}

Cloudflare Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 [WAF](/waf/) and {{<glossary-tooltip term_id="content delivery network (CDN)">}}CDN{{</glossary-tooltip>}} services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

---

## Related products

{{<related header="Cloudflare Access" href="/cloudflare-one/policies/access/" product="cloudflare-one">}}
Cloudflare Access determines who can reach your application by applying the Access policies you configure.
{{</related>}}

{{<related header="Cloudflare Tunnel" href="/cloudflare-one/connections/connect-networks/" product="cloudflare-one">}}
Cloudflare Tunnel provides you with a secure way to connect your resources to Cloudflare without a publicly routable IP address.
{{</related>}}

{{<related header="Authenticated Origin Pulls" href="/ssl/origin-configuration/authenticated-origin-pull/" product="ssl">}}
Authenticated Origin Pulls gives you the ability to perform mutual TLS between Cloudflare and your origin environment, providing cryptographically verifiable proof of the source of the traffic you receive.
{{</related>}}

---

## More resources

{{<resource-group>}}

{{<resource header="Introductory blog post" href="https://blog.cloudflare.com/cloudflare-aegis/" icon="learning-center-book">}}
Deep dive into use cases where Aegis can help secure enterprise origins.
{{</resource>}}

{{<resource header="Multi-Vendor Architecture" href="/reference-architecture/architectures/multi-vendor/#connectivity-options" icon="documentation-clipboard">}}
Reference Architecture for multi-vendor application security and performance.
{{</resource>}}

{{</resource-group>}}