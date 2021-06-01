---
title: Waiting Room cookie
pcx-content-type: reference
---

# Cloudflare Waiting Room cookie

<Aside type='warning' header='Important:'>

Cloudflare Waiting Room requires the `__cfwaitingroom` cookie. When a waiting room is actively queueing, users cannot visit that host and path combination without enabling cookies.

</Aside>

A waiting room only uses the `__cfwaitingroom` cookie when a visitor requests access to a host and path combination with an enabled and associated waiting room. When the waiting room is suspended, traffic goes to the origin and the `__cfwaitingroom` cookie is not created. The `__cfwaitingroom` cookie is encrypted and cookies copied to another device will not work.

## Cookie expiration time

* While a visitor stays in a waiting room, the `__cfwaitingroom` cookie is set to expire in 24 hours.
* When the visitor accesses the application, the `__cfwaitingroom` cookie expires after an interval (specified by [session_duration](/reference/configuration-settings#session-duration)).

## Cookie function

The `__cfwaitingroom` cookie is used to:

* Track a user's position in the waiting room queue and serve them in the correct order.
* Monitor each visitor's duration in the application to provide an accurate entry time to visitors queueing in the waiting room.
* To allow re-entry for a period of time (specified by [session_duration](/reference/configuration-settings#session-duration)) without going back in the waiting room.
