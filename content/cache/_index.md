---
title: Overview
pcx_content_type: overview
weight: 1
layout: overview
meta:
  title: Cloudflare Cache
---

# Cloudflare Cache

{{<description>}}
Cache content across Cloudflare's global server network.
{{</description>}}

{{<plan type="all">}}

Cache stores copies of frequently accessed content (such as images, videos, or webpages) in geographically distributed data centers that are located closer to end users than origin servers, reducing server load and improving website performance.

---

## Features

{{<feature header="Default cache behavior" href="/cache/concepts/default-cache-behavior/">}}

Learn about default cache behavior, default cached file extensions and cache responses.

{{</feature>}}

{{<feature header="Cache Rules" href="/cache/how-to/cache-rules/">}}

Configure Cache Rules to optimize your website by specifying which resources should be cached and for how long.

{{</feature>}}

{{<feature header="Tiered Cache" href="/cache/how-to/tiered-cache/">}}

Enable Tiered Cache to optimize content delivery by caching frequently accessed content in multiple locations for faster delivery and reduced origin traffic.

{{</feature>}}

{{<feature header="Cache Reserve" href="/cache/advanced-configuration/cache-reserve/">}}

Use Cloudflare's persistent storage to increase cache times.

{{</feature>}}

{{<feature header="Purge" href="/cache/how-to/purge-cache/">}}

Clear cached files to force Cloudflare to fetch a fresh version of those files from your web server. You can purge files selectively or all at once.

{{</feature>}}

---

## Related products

{{<related header="Load Balancing" href="/load-balancing/" product="load-balancing">}}
Cloudflare Load Balancing distributes traffic across your {{<glossary-tooltip term_id="endpoint">}}endpoints{{</glossary-tooltip>}}, reducing endpoint strain and latency and improving the end users experience.
{{</related>}}

{{<related header="Images" href="/images/" product="images">}}
A suite of products tailored to your image-processing needs.
{{</related>}}

{{<related header="Workers" href="/workers/" product="workers">}}
Cloudflare Workers allows developers to build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.
{{</related>}}

{{<related header="Rules" href="/rules/" product="rules">}}
Cloudflare Rules allows you to make adjustments to requests and responses, configure Cloudflare settings, and trigger specific actions for matching requests.
{{</related>}}

{{<related header="Cloudflare Network Interconnect" href="/network-interconnect/" product="network-interconnect">}}
Cloudflare Network Interconnect (CNI) allows you to connect your network infrastructure directly with Cloudflare – rather than using the public Internet – for a more reliable and secure experience.
{{</related>}}

{{<related header="R2" href="/r2/" product="r2">}}
Cloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.
{{</related>}}

{{<related header="Aegis" href="/aegis/" product="aegis">}}
Cloudflare Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services.
{{</related>}}

---

## More resources

{{<resource-group>}}

{{<resource header="Plans" href="https://www.cloudflare.com/cdn/" icon="documentation-clipboard">}}Compare available Cloudflare plans{{</resource>}}

{{<resource header="Pricing" href="https://www.cloudflare.com/plans/#overview" icon="price">}}Explore pricing options for Cache{{</resource>}}

{{</resource-group>}}