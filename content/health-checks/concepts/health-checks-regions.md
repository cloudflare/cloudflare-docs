---
title: Health Checks regions
pcx_content_type: concept
weight: 4
meta:
  title: Health Checks
---

# Health Checks regions

Cloudflare has data centers in more than 200 cities across 90+ countries throughout the world. Health checks do not run from every single of these data centers as this would result in numerous requests to your servers. Instead, you are able to choose between one and thirteen regions from which to run health checks. Cloudflare will run Health Checks from three data centers in each region that you select.

{{<Aside type="Note">}}

The exact location of these data centers are subject to change at any moment.

{{</Aside>}}

The Internet is not the same everywhere around the world and your users may not have the same experience on your application according to where they are. Running Health Checks from different regions lets you know the health of your application from the point of view of the Cloudflare network in each of these regions.
