---
source: https://support.cloudflare.com/hc/en-us/articles/360061431012-Cloudflare-Waiting-Room-FAQ
title: Cloudflare Waiting Room — FAQ
                  7 months ago
---

# Cloudflare Waiting Room — FAQ



## Overview

Cloudflare Waiting Room keeps your site online during large surges of legitimate traffic.

For more information about waiting rooms and how to set them up, refer to the [developer documentation](https://developers.cloudflare.com/waiting-room/).

___

## Can I display my waiting room page in another language?

Yes. For more details, refer to [Customize Waiting Rooms](https://developers.cloudflare.com/waiting-room/how-to/customize-waiting-room#default-waiting-room).

___

## Which features are included in my Waiting Room plan?

For more details about which features are available to different plan types, refer to [Plans](https://developers.cloudflare.com/waiting-room/about/plans).

___

## Why are users being blocked from entering my waiting room?

If you have Rate Limiting, check your [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/).

The Waiting Room queue page refreshes every 20 seconds by populating the refresh header. If you have a rule set to block requests from a specific IP within 20 seconds, the user in the waiting room will be blocked. Make sure your rules allow at least one request every 20 seconds.

Your user also might not have [cookies enabled](https://developers.cloudflare.com/waiting-room/reference/waiting-room-cookie). If they do not enable cookies and your waiting room is actively queueing traffic, they will not reach your end point until the queueing stops.

___

## How does Waiting Room interact with other Cloudflare products?

Some Cloudflare products run _before_ a waiting room acts on traffic:

-   DDos Mitigation
-   Web Application Firewall (WAF)
-   Bot Management
-   Page Rules

Other Cloudflare products run _after_ a waiting room acts on traffic:

-   Workers

___

## Why does my waiting room look different than how I designed it?

If you have [customized your waiting room template](https://developers.cloudflare.com/waiting-room/how-to/customize-waiting-room):

1.  Preview your template before deploying it to production.
2.  If you see any issues, check for proper syntax and a closing backslash (**/**).

___

## Why are some users not being queued in my waiting room?

If you notice users not being queued to your waiting room, make sure the **path** exactly matches the **path** of your website.

The path is case-sensitive, so if you have a waiting room set up for **/Black-Friday-Sale** and users go to **/black-friday-sale**, they will bypass your waiting room.

For more details, refer to [Best practices for Waiting Rooms](https://developers.cloudflare.com/waiting-room/reference/best-practices).

___

## What happens if a user refreshes their tab when in a waiting room?

A manual tab refresh has no effect on a user's position in your waiting room.

However, if they close their tab and then try to access the application again during active queueing, they will lose their spot and have to go to the back of the queue.

___

## Why are a few users being queued in the dashboard?

Some users might be queued before your waiting room reaches is limit due to architectural designs. For more details on the behavior and how to fix it, refer to [Monitor Waiting Rooms](https://developers.cloudflare.com/waiting-room/how-to/monitor-waiting-room#queueing-activation).

___

## What can I update when my waiting room is actively queueing?

You can update a [waiting room's template](https://developers.cloudflare.com/waiting-room/how-to/customize-waiting-room) and those changes will be visible to users in near-real time. We recommend these updates as a way to engage with users and provide updated information or expectations.

You can also update the [configuration settings](https://developers.cloudflare.com/waiting-room/reference/configuration-settings) of a waiting room, but only make these changes when necessary. These changes may impact the **estimated wait time** shown to end users and cause unnecessary confusion.

___

## Related resources

-   [Cloudflare Waiting Room](https://developers.cloudflare.com/waiting-room/) (Developer Documentation)
-   [Blog post announcing Cloudflare Waiting Room](https://blog.cloudflare.com/cloudflare-waiting-room/)
