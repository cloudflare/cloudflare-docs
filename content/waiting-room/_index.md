---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
---

# Cloudflare Waiting Room

{{<description>}}
A virtual waiting room to manage peak traffic.
{{</description>}}

{{<plan type="business">}}

Cloudflare Waiting Room allows you to route excess users of your website to a customized waiting room, helping preserve customer experience and protect origin servers from being overwhelmed with requests.

---

## Benefits

Waiting Room protects your origin server by preventing surges in legitimate traffic that may overload your origin.

Waiting Room also benefits your visitors by:

- Keeping your application online and preventing them from reaching error pages.
- Showing estimated wait times that are continuously updated.
- Opening up new spots more quickly by tracking dynamic inflow and [outflow](/waiting-room/reference/configuration-settings/#session-duration).
- Remembering each visitor's status to prevent someone from losing their place in line or having to re-queue if they leave your site.
- Appearing in your own [branding and style](/waiting-room/how-to/customize-waiting-room/), which enhances trust and lets you provide additional information as needed.

---

## Features

{{<feature header="Scheduled Event" href="/waiting-room/additional-options/create-events/">}}
Customize the behavior of a waiting room for a specific period of time.
{{</feature>}}

{{<feature header="Waiting Room Rules" href="/waiting-room/additional-options/waiting-room-rules/">}}
Create rules to indicate specific traffic or areas of your site or application that you do not want a waiting room to apply to.
{{</feature>}}

{{<feature header="Waiting Room Analytics" href="/waiting-room/waiting-room-analytics/">}}
Get insights into the traffic going through your waiting room.
{{</feature>}}

{{<feature header="Additional hostname and path coverage" href="/waiting-room/how-to/place-waiting-room/">}}
Apply a single waiting room to multiple hostnames and paths within the same zone.
{{</feature>}}

---

## Availability

The following customers have access to Cloudflare Waiting Room:

- Those qualified under [Project Fair Shot](https://www.cloudflare.com/fair-shot/)
- Customers on a Business or Enterprise plan

Access to certain features depends on a customer's [plan type](/waiting-room/plans/).

{{<render file="_non-contract-enablement.md" productFolder="fundamentals" >}}

---

## Prerequisites

- [Cloudflare’s CDN](/cache/) is required to use the Waiting Room feature.
- Configure a [proxied DNS record](/dns/manage-dns-records/how-to/create-dns-records/) or a [proxied load balancer](/load-balancing/understand-basics/proxy-modes/) for the waiting room’s hostname. A DNS record is not auto-configured after a waiting room is created.
- Visitors must enable cookies. Refer to [Waiting Room cookies](/waiting-room/reference/waiting-room-cookie/) for information on how cookies are used in Cloudflare Waiting Room.

---

## Related products

{{<related header="Cloudflare for SaaS" href="/cloudflare-for-platforms/cloudflare-for-saas/" product="cloudflare-for-platforms">}}
Cloudflare for SaaS allows you to extend the security and performance benefits of Cloudflare’s network to your customers via their own custom or vanity domains.
{{</related>}}

{{<related header="Rules" href="/rules/" product="rules">}}
Cloudflare Rules allows you to make adjustments to requests and responses, configure Cloudflare settings, and trigger specific actions for matching requests.
{{</related>}}

{{<related header="SSL/TLS" href="/ssl/" product="ssl">}}
Cloudflare SSL/TLS encrypts your web traffic to prevent data theft and other tampering.
{{</related>}}

---

## More resources

{{<resource-group>}}

{{<resource header="Pricing" href="https://www.cloudflare.com/plans/" icon="price">}}Explore pricing options for Waiting Room.{{</resource>}}

{{</resource-group>}}

