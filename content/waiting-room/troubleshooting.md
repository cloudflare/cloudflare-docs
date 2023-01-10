---
title: FAQ
pcx_content_type: faq
weight: 11
meta:
    description: Review FAQs for the Waiting Room.
---

# FAQ

## Configuration

### Can I display my waiting room page in another language?

Yes. For more details, refer to [Customize a waiting room](/waiting-room/how-to/customize-waiting-room/).

### Why does my waiting room look different than how I designed it?

If you have [customized your waiting room template](/waiting-room/how-to/customize-waiting-room):

1. Preview your template before deploying it to production.
2. If you encounter any issues, check for proper syntax and a closing backslash (/).

{{<Aside type="note" header="Note">}}

Only Enterprise customers can customize the appearance of their waiting room.

{{</Aside>}}

### What can I update when my waiting room is actively queueing?

You can update a [waiting room's template](/waiting-room/how-to/customize-waiting-room) and those changes will be visible to users in near-real time. We recommend these updates as a way to engage with users and provide updated information or expectations.

You can also update the [configuration settings](/waiting-room/reference/configuration-settings) of a waiting room, but only make these changes when necessary. These changes may impact the estimated wait time shown to end users and cause unnecessary confusion.

## Features and products

### Which features are included in my Waiting Room plan?

To check which features are available to different plan types, refer to [Plans](/waiting-room/plans/).

### How does Waiting Room interact with other Cloudflare products?

Some Cloudflare products run before a waiting room acts on traffic:

- DDos Mitigation
- Web Application Firewall (WAF)
- Bot Management
- Page Rules

Other Cloudflare products run after a waiting room acts on traffic:

- Workers

## User behavior

### What happens if a user refreshes their tab when in a waiting room?

A manual tab refresh has no effect on a user's position in your waiting room.

However, if they close their tab and then try to access the application again during active queueing, they will lose their spot and have to go to the back of the queue.

## Monitorizing your waiting room

### Why do I see a few users being queued in the dashboard?

Some users might be queued before your waiting room reaches is limit due to architectural designs. For more details on the behavior and how to fix it, refer to [​​Queueing activation](/waiting-room/how-to/monitor-waiting-room#queueing-activation).

### Why are some users not being queued in my waiting room?

If you notice users not being queued to your waiting room, make sure the path you defined exactly matches the path of your website.

The path is case-sensitive, so if you have a waiting room set up for `/Black-Friday-Sale` and users go to `/black-friday-sale`, they will bypass your waiting room.

For more details, refer to [Best practices](/waiting-room/reference/best-practices).

### Why are users being blocked from entering my waiting room?

If you have Rate Limiting, check your [rate limiting rules](/waf/rate-limiting-rules/).

The Waiting Room queue page refreshes every 20 seconds by populating the refresh header. If you have a rule set to block requests from a specific IP within 20 seconds, the user in the waiting room will be blocked. Make sure your rules allow at least one request every 20 seconds.

Your user also might not have [cookies](/waiting-room/reference/waiting-room-cookie) enabled. If they do not enable cookies and your waiting room is actively queueing traffic, they will not reach your end point until the queueing stops.