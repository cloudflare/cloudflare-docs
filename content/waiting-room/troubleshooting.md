---
pcx_content_type: faq
title: FAQ
weight: 11
structured_data: true
---

# FAQ

Below you will find answers to our most commonly asked questions about the Waiting Room.

- [Configuration](#configuration)
- [Features and products](#features-and-products)
- [User behavior](#user-behavior)
- [Monitor your waiting room](#monitor-your-waiting-room)

---

## Configuration

{{<faq-item>}}
{{<faq-question level=3 text="Can I display my waiting room page in another language?" >}}

{{<faq-answer>}}

Yes. For more details, refer to [Customize a waiting room](/waiting-room/how-to/customize-waiting-room/).

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="Why does my waiting room look different than how I designed it?" >}}

{{<faq-answer>}}

If you have [customized your waiting room template](/waiting-room/how-to/customize-waiting-room):

1. Preview your template before deploying it to production.
2. If you encounter any issues, check for proper syntax and a closing backslash (/).

{{<Aside type="note" header="Note">}}

Only Enterprise customers can customize the appearance of their waiting room.

{{</Aside>}}

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="What can I update when my waiting room is actively queueing?" >}}

{{<faq-answer>}}

You can update a [waiting room's template](/waiting-room/how-to/customize-waiting-room) and those changes will be visible to users in near-real time. We recommend these updates as a way to engage with users and provide updated information or expectations.

You can also update the [configuration settings](/waiting-room/reference/configuration-settings) of a waiting room, but only make these changes when necessary. These changes may impact the estimated wait time shown to end users and cause unnecessary confusion.

{{</faq-answer>}}
{{</faq-item>}}

## Features and products

{{<faq-item>}}
{{<faq-question level=3 text="Which features are included in my Waiting Room plan?" >}}

{{<faq-answer>}}

To check which features are available to different plan types, refer to [Plans](/waiting-room/plans/).

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="How does Waiting Room interact with other Cloudflare products?" >}}

{{<faq-answer>}}

Some Cloudflare products run before a waiting room acts on traffic:

- DDoS Mitigation
- Web Application Firewall (WAF)
- Bot Management
- Page Rules

Other Cloudflare products run after a waiting room acts on traffic:

- Workers

{{</faq-answer>}}
{{</faq-item>}}

## User behavior

{{<faq-item>}}
{{<faq-question level=3 text="What happens if a user refreshes their tab when in a waiting room?" >}}

{{<faq-answer>}}

A manual tab refresh has no effect on a user's position in your waiting room.

However, if they close their tab and then try to access the application again during active queueing, they will lose their spot and have to go to the back of the queue.

{{</faq-answer>}}
{{</faq-item>}}

## Monitor your waiting room

{{<faq-item>}}
{{<faq-question level=3 text="Why do I observe a few users being queued in the dashboard?" >}}

{{<faq-answer>}}

Some users might be queued before your waiting room reaches is limit due to architectural designs. For more details on the behavior and how to fix it, refer to [​​Queueing activation](/waiting-room/how-to/monitor-waiting-room#queueing-activation).

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="Why are some users not being queued in my waiting room?" >}}

{{<faq-answer>}}

If you notice users not being queued to your waiting room, make sure the path you defined exactly matches the path of your website.

The path is case-sensitive, so if you have a waiting room set up for `/Black-Friday-Sale` and users go to `/black-friday-sale`, they will bypass your waiting room.

For more details, refer to [Best practices](/waiting-room/reference/best-practices).

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="Why are users being blocked from entering my waiting room?" >}}

{{<faq-answer>}}

If you have Rate Limiting, check your [rate limiting rules](/waf/rate-limiting-rules/).

The Waiting Room queue page refreshes every 20 seconds by populating the refresh header. If you have a rule set to block requests from a specific IP within 20 seconds, the user in the waiting room will be blocked. Make sure your rules allow at least one request every 20 seconds.

Your user also might not have [cookies](/waiting-room/reference/waiting-room-cookie) enabled. If they do not enable cookies and your waiting room is actively queueing traffic, they will not reach your endpoint until the queueing stops.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="Why is the estimated wait time increasing for some users?" >}}

{{<faq-answer>}}

Estimated wait times may increase if the rate of users leaving your site decreases. The estimated wait time is updated upon each page refresh based on the most recently available information about the rate of slots opening up on your site and the number of users ahead of the user in line. To make this increase less likely, you could limit the amount of time users are allowed to spend on your site by disabling session renewal. Be aware that if you change your traffic settings, estimated wait times will change as well.

{{</faq-answer>}}
{{</faq-item>}}