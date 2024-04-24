---
type: overview
pcx_content_type: overview
title: Notifications
weight: 1
---

# Cloudflare Notifications

{{<plan type="all">}}

Cloudflare Notifications help you stay up to date with your Cloudflare account. Manage your Notifications to define what you want to be warned about and how, be it a denial-of-service attack or an issue with your server.

The available Notification features vary according to your plan:

* Free plans can set up email-based Notifications.
* Business and higher plans can also [access PagerDuty](/notifications/get-started/configure-pagerduty/).
* Professional and higher plans can also [use webhooks](/notifications/get-started/configure-webhooks/).
  
The notification service only works on the [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) domains because Cloudflare needs enough information necessary to decide if we need to trigger a notification or not.

{{<Aside type="note">}}
The availability of delivery methods like PagerDuty and webhooks in Free or Professional zones depends on the highest zone plan in your Cloudflare account:

* PagerDuty is available in zones on a Free/Professional plan if your Cloudflare account has at least one zone in a Business plan (or higher).
* Webhooks are available in zones on a Free plan if your Cloudflare account has at least one zone in a Professional plan (or higher).
{{</Aside>}}
