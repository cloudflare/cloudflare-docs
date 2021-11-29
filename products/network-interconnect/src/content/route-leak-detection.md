---
title: Route Leak Detection
pcx-content-type: how-to
order: 4
---

# Route Leak Detection

Route Leak Detection protects your routes on the Internet by notifying you when your traffic is routed somewhere it should not go, which could indicate a possible attack. Route Leak Detection also reduces the amount of time needed to mitigate leaks by providing you with timely notifications.


Cloudflare detects route leaks by using several sources of routing data to create a synthesis of how the Internet sees routes to BYOIP users. Cloudflare then watches these views to track any sudden changes that occur on the Internet. If the changes can be correlated to actions Cloudflare has taken, no further action is required. However, if changes have not been made, Cloudflare notifies you to inform you that your routes and users may be at risk.

## Enable Route Leak Detection

You must be a user who has brought your own IP address to Cloudflare, which includes Magic Transit, Spectrum, and WAF users. Only prefixes advertised by Cloudflare qualify for Route Leak Detection.

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
1. Click **Manage Account** > **Notifications**.
1. From **Notifications**, click **Add**.
1. Locate **Route Leak Detection** from the list and click **Select**.
1. Enter a name and description for the notification.
1. Enter one or more email addresses to receive the notifications.
1. Click **Create**.