---
title: About Cloudflare Waiting Room
alwaysopen: true
weight: 1
hidden: false
showNew: false
---

# About Cloudflare Waiting Room

Cloudflare Waiting Rooms redirect visitors to virtual waiting rooms when they are trying to access web pages that have high volumes of traffic.

When the amount of traffic to a host/path combination on your site exceeds a user-defined threshold, all subsequent requests are queued in a Waiting Room. A [cookie](/about/waiting-room-cookie) is used to manage the dynamic outflow of requests from the Waiting Room to the origin website in First In First Out (FIFO) order.

The main advantage of Waiting Room is to protect websites from surges in legitimate traffic that may otherwise bring an application down.

Furthermore, Cloudflare Waiting Room improves customer experience and confidence in your website:

* Instead of seeing error pages, site visitors see a page informing them that they are in a Waiting Room.
* You can customize the Waiting Room to use your own website branding and style, enhancing visitors' trust.
* The Waiting Room page provides an estimate of when site visitors will be allowed to access the application. The Waiting Room browser page refreshes to update the estimated time.
* Once a site visitor reaches the application from the Waiting Room, they are given known-user status for an amount of time that you can configure during setup: during this period, visitors can leave the site and re-enter without needing to queue again.

Cloudflare Waiting Room is straightforward to set up. You only need to configure 5 settings, and Cloudflare provides editable template content for your waiting room page.

You can set up, manage, and monitor your waiting rooms in the **Traffic** app on the Cloudflare dashboard, or the Waiting Room API.

## Prerequisites

* Cloudflare’s CDN is required to use the Waiting Room feature.
* Configure a [proxied DNS record or a proxied load balancer](/load-balancing/understand-basics/proxy-modes/) for the waiting room’s hostname: a DNS record is not auto-configured after a waiting room is created.
* Visitors must enable cookies. Refer to [_Waiting room cookie_](/about/waiting-room-cookie) for information on how cookies are used in Cloudflare Waiting Rooms.
