---
pcx_content_type: reference
title: Cookies
---

# Cookies

A waiting room only uses the `__cfwaitingroom` cookie when a visitor requests access to a host and path combination with an enabled and associated waiting room. When the waiting room is suspended, traffic goes to the origin and the `__cfwaitingroom` cookie is not created. The `__cfwaitingroom` cookie is encrypted to prevent modification by users.

{{<Aside type="warning" header="Important:">}}

Cloudflare Waiting Room requires the `__cfwaitingroom` cookie. When a waiting room is actively queueing, users cannot visit that host and path combination without enabling cookies.

{{</Aside>}}

## Cookie expiration time

- While a visitor stays in a waiting room, `__cfwaitingroom` cookie expiration is always set to five minutes, but renews every 20 seconds automatically as long as the visitor does not close the tab or leaves your application.
- When the visitor accesses the application, the `__cfwaitingroom` cookie expires after an interval (specified by [session_duration](/waiting-room/reference/configuration-settings/#session-duration)).

## Cookie function

The `__cfwaitingroom` cookie is used to:

- Track a user's position in the waiting room queue and serve them in the correct order.
- Monitor each visitor's duration in the application to provide an [accurate entry time](#estimated-wait-time-fifo-queueing-method) to visitors queueing in the waiting room.
- To allow re-entry for a period of time (specified by [session_duration](/waiting-room/reference/configuration-settings/#session-duration)) without going back in the waiting room.

## Estimated wait time (FIFO queueing method)

When a visitor first enters the host and path combination for your waiting room, they receive the `__cfwaitingroom` cookie. That cookie contains a unique group ID, which corresponds to the minute your visitor entered the waiting room. Using this value, we can tell how many visitors are in front of a specific group.

Each cookie also contains a value for `acceptedAt`, which corresponds to the minute your visitor entered your application. This value lets us know how many visitors per minute are leaving the waiting room to enter your application.

```txt
visitorsAhead ÷ activeUsersToWebApplication = estimatedWaitTime
```

We combine these pieces of information to calculate estimated wait time for each group of visitors.

For more details about the technical implementation of Cloudflare Waiting Room, refer to the [blog post](https://blog.cloudflare.com/building-waiting-room-on-workers-and-durable-objects/).
