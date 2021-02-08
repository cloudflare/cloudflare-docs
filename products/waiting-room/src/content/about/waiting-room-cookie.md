---
title: Waiting Room cookie
alwaysopen: true
weight: 110
hidden: false
---

# Waiting Room cookie

<Aside type='warning' header='Important'>

Cloudflare Waiting Room requires the `__cfwaitingroom` cookie; a host and path combination served by a Waiting Room cannot be visited using a browser that does not accept cookies.
</Aside>

The `__cfwaitingroom` cookie is used only when a visitor requests access to a host and path combination that has an enabled associated Waiting Room. When the waiting room is suspended, traffic goes to the origin and the `__cfwaitingroom` cookie is not created. The `__cfwaitingroom` cookie is encrypted, and cookies copied to another device won't work.

## Cookie expiration time

* While a visitor stays in a waiting room, the `__cfwaitingroom` cookie is set to expire in 24 hours.
* When the visitor accesses the application, the `__cfwaitingroom` cookie expires after an interval (`session_duration`) configured in [waiting room settings](/how-to/create-waiting-room/create-waiting-room-dashboard/configure-settings).

## Cookie function

The `__cfwaitingroom` cookie is used for the following functions:

* To keep track of a user's position in the waiting room queue, to serve the visitors in the correct order.
* To monitor the amount of time that visitors stay in the application, and track when they leave, so that an accurate entry time is available to visitors queueing in the waiting room.
* To provide known-user functionality: If a visitor leaves the application, the cookie allows re-entry within a specified amount of time (`session_duration`) without going back in the waiting room.
For example, if a visitor wishes to make a purchase at example.com, they queue in a waiting room before entering the online store app. However, if the visitor leaves the store app but forgets to add a note to the order or request a receipt, they can re-enter the application without re-entering the waiting room, if the cookie has not expired.
