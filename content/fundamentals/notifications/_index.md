---
type: overview
pcx_content_type: overview
title: Cloudflare Notifications
weight: 6
layout: list
---

{{<content-column>}}

# Cloudflare Notifications

Cloudflare Notifications help you stay up to date with your Cloudflare account. Manage your Notifications to define what you want to be warned about and how, be it a denial-of-service attack or an issue with your server.

The available Notification features vary according to your plan:

* Free plans can set up email-based Notifications.
* Business and higher plans can also [access PagerDuty](/fundamentals/notifications/create-notifications/create-pagerduty/).
* Professional and higher plans can also [use webhooks](/fundamentals/notifications/create-notifications/configure-webhooks/).
  
The notification service only works on the [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) domains because Cloudflare needs enough information necessary to decide if we need to trigger a notification or not.

{{<Aside type="note" header="Note">}}

The availability of delivery methods like PagerDuty and webhooks in Free or Professional zones depends on the highest zone plan in your Cloudflare account:

* PagerDuty is available in zones on a Free/Professional plan if your Cloudflare account has at least one zone in a Business plan (or higher).
* Webhooks are available in zones on a Free plan if your Cloudflare account has at least one zone in a Professional plan (or higher).

{{</Aside>}}

## Where to find the Notifications section

Cloudflare Notifications is available in your [Cloudflare dashboard](https://dash.cloudflare.com/login). After logging in and choosing your account:

* If you are using the new navigation interface, Cloudflare Notifications is available from the menu bar.
* If you are using the original interface, Cloudflare Notifications is available on the top of your account's dashboard.

## What to do when receiving Notifications

Go to our [Types of Notifications](/fundamentals/notifications/notification-available/) section to know more about what each Notification does and what do to when receiving one.

{{</content-column>}}
