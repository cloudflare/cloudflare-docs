---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
meta:
  title: Cloudflare Load Balancing
---

# Cloudflare Load Balancing

{{<description>}}
Maximize application performance and availability
{{</description>}}

{{<plan id="traffic.load_balancing.properties.availability.summary">}}

Cloudflare Load Balancing distributes traffic across your servers, which reduces server strain and latency and improves the experience for end users.

{{<render file="_non-contract-enablement.md" productFolder="fundamentals" >}}

---

## Features

{{<feature header="Load balancing and failover" href="/load-balancing/understand-basics/load-balancers/">}}

Distribute traffic evenly across your healthy servers, automatically failing over when a server is unhealthy or unresponsive.

{{</feature>}}

{{<feature header="Active monitoring" href="/load-balancing/understand-basics/monitors/">}}

Monitor your servers at configurable intervals and across multiple data centers to look for specific status codes, response text, and timeouts.

{{</feature>}}

{{<feature header="Intelligent routing" href="/load-balancing/understand-basics/traffic-steering/">}}

Choose whether to distribute requests based on server latency, a visitor's geographic region, or even a visitor's GPS coordinates.

{{</feature>}}

{{<feature header="Custom rules" href="/load-balancing/additional-options/load-balancing-rules/">}}

Customize the behavior of your load balancer based on the characteristics of individual requests.

{{</feature>}}

{{<feature header="Analytics" href="/load-balancing/reference/load-balancing-analytics/">}}

Review comprehensive analytics to evaluate traffic flow, assess origin health status, and review changes in pools and pool health over time.

{{</feature>}}

---

## Related products

{{<related header="Standalone Health Checks" href="/health-checks/" product="health-checks">}}
Actively monitor whether your origin server is online by sending specific requests at regular intervals.
{{</related>}}

{{<related header="DNS" href="/dns/" product="dns">}}
Get enterprise-grade authoritative DNS service with the fastest response time, unparalleled redundancy, and advanced security with built-in DDoS mitigation and DNSSEC.
{{</related>}}

{{<related header="Waiting Room" href="/waiting-room/" product="waiting-room">}}
Route excess users to a custom-branded waiting room, helping preserve customer experience and protect origin servers from being overwhelmed with requests.
{{</related>}}

---

## More resources

{{<resource-group>}}

{{<resource header="Plans" href="https://www.cloudflare.com/plans/#overview" icon="documentation-clipboard">}}Compare available Cloudflare plans{{</resource>}}

{{<resource header="Pricing" href="https://dash.cloudflare.com/?to=/:account/:zone/traffic/load-balancing/" icon="price">}}Explore pricing options for Load Balancing in the dashboard{{</resource>}}

{{</resource-group>}}