---
title: About
pcx_content_type: concept
weight: 2
meta:
  title: About Waiting Room
---

# About Waiting Room

Cloudflare Waiting Room protects websites by queueing site visitors when a website experiences unmanageable surges in legitimate traffic that may otherwise bring an application down.

{{<render file="_non-contract-enablement.md" productFolder="fundamentals" >}}

## Benefits

Waiting Room protects your origin server by preventing surges in legitimate traffic that may overload your origin.

Waiting Room also benefits your visitors by:

- Keeping your application online and preventing them from reaching error pages.
- Showing estimated wait times that are continuously updated.
- Opening up new spots more quickly by tracking dynamic inflow and [outflow](/waiting-room/reference/configuration-settings/#session-duration).
- Remembering each visitor's status to prevent someone from losing their place in line or having to re-queue if they leave your site.
- Appearing in your own [branding and style](/waiting-room/how-to/customize-waiting-room/), which enhances trust and lets you provide additional information as needed.

## How it works

Once you have [created and activated a waiting room](/waiting-room/get-started/) for a specific application page:

- If a page is not experiencing heavy traffic, a visitor accesses the page directly.
- If page traffic crosses a [user-defined threshold](/waiting-room/reference/configuration-settings/#session-duration), a visitor enters a virtual waiting room until it is their turn to access the page:
  - Each user receives a [cookie](/waiting-room/reference/waiting-room-cookie/) to manage the dynamic outflow of requests from the waiting room to the origin website in [First In First Out (FIFO)](/waiting-room/reference/queueing-methods/#first-in-first-out-fifo) order.
  - While in the waiting room, the user's browser automatically refreshes every 20 seconds to give them updated information about their estimated wait time.
  - When a user exits the waiting room and reaches your application, they can leave and re-enter without waiting for the length of time specified by the [session duration](/waiting-room/reference/configuration-settings/#session-duration).
  - Because waiting rooms support dynamic inflow and [outflow](/waiting-room/reference/configuration-settings/#session-duration), new spots appear more quickly and estimated wait times are lower and more accurate.

![Waiting Room process flow showing how a request is managed by Cloudflare and placed in a waiting room before reaching the origin website](/images/waiting-room/waiting-room-process-flow.png)

## Availability

The following customers have access to Cloudflare Waiting Room:

- Those qualified under [Project Fair Shot](https://www.cloudflare.com/fair-shot/)
- Customers on a Business or Enterprise plan

Access to certain features depends on a customer's [plan type](/waiting-room/plans/).

## Prerequisites

- [Cloudflare’s CDN](/cache/) is required to use the Waiting Room feature.
- Configure a [proxied DNS record](/dns/manage-dns-records/how-to/create-dns-records/) or a [proxied load balancer](/load-balancing/understand-basics/proxy-modes/) for the waiting room’s hostname. A DNS record is not auto-configured after a waiting room is created.
- Visitors must enable cookies. Refer to [Waiting Room cookies](/waiting-room/reference/waiting-room-cookie/) for information on how cookies are used in Cloudflare Waiting Room.

{{<button-group>}}
  {{<button type="primary" href="/waiting-room/get-started/">}}Get started{{</button>}}
{{</button-group>}}
