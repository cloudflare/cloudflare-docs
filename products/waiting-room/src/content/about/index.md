---
title: About
order: 1
pcx-content-type: concept
---

# About Cloudflare Waiting Room

Cloudflare Waiting Room protects websites from surges in legitimate traffic that may otherwise bring an application down:
- If a page is not experiencing heavy traffic, a visitor accesses the page directly.
- If page traffic crosses a [user-defined threshold](/reference/configuration-settings#session-duration), a visitor enters a virtual waiting room until it's their turn to access the page:
    - Each user receives a [cookie](/reference/waiting-room-cookie) to manage the dynamic outflow of requests from the waiting room to the origin website in First In First Out (FIFO) order.
    - While in the waiting room, the user's browser automatically refreshes every 20 seconds to give them updated information about their estimated wait time.
    - When a user exits the waiting room and reaches your application, they can leave and re-enter without waiting for the length of time specified by the [session duration](/reference/configuration-settings#session-duration).

![Waiting room process flow](../static/waiting-room-process-flow.png)

## Benefits

Cloudflare Waiting Room improves customer experience and confidence in your website:

* Instead of seeing error pages, site visitors see a page informing them that they are in a waiting room.
* You can [customize the waiting room](../how-to/customize-waiting-room) to use your own website branding and style, enhancing visitors' trust.
* The waiting room page provides an estimated wait time for visitors and automatically refreshes the browser page every 20 seconds to update the estimated time.
* Once a site visitor reaches the application from the waiting room, they are given [known-user status](/reference/configuration-settings#session-duration) so they can leave the site and re-enter without needing to queue again.
* Because waiting rooms support dynamic inflow and [outflow](/reference/configuration-settings#session-duration), new spots appear more quickly and estimated wait times are lower and more accurate.

## Availability

The following customers have access to Cloudflare Waiting Room:
- Those qualified under [Project Fair Shot](https://www.cloudflare.com/fair-shot/)
- Business customers

Access to certain features depends on a customer's [plan type](plans).

## Prerequisites

* Cloudflare’s CDN is required to use the waiting room feature.
* Configure a [proxied DNS record or a proxied load balancer](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/) for the waiting room’s hostname: a DNS record is not auto-configured after a waiting room is created.
* Visitors must enable cookies. Refer to [Waiting room cookie](/reference/waiting-room-cookie) for information on how cookies are used in Cloudflare Waiting Rooms.

## Get started

To learn how to use Cloudflare Waiting Rooms, check out:
- The [setup guide](../get-started)
- Various [how-to guides](../how-to)
