---
title: Work with Cloudflare Waiting Rooms
alwaysopen: true
weight: 150
hidden: false
---

## Before you begin

Before you begin to work with waiting rooms, review the [prerequisites](/about#prerequisites) and [entitlements](/about#entitlements).

Before configuring a waiting room, consider the following:

* How you want the waiting room to operate
* The appearance of the waiting room

### Waiting room operation

First, decide which routes must be served by a waiting room. Routes are pages or applications in your website. You can link a route with only one waiting room, so you need to identify the high-traffic areas of your website. These routes are represented by the following parameters in Cloudflare Waiting Rooms:

* _Hostname_ - The hostname or subdomain in your zone.
* _Path_ (optional) - The path where you want to enable the waiting room.

Next, determine the maximum amount of traffic that you want to allow into these routes at any given time. You will use these specifications to set the following parameters for your waiting room:

* _Total active users_ - The total number of active user sessions allowed on the route at a point in time. Cloudflare recommends setting `Total active users` no higher than 80% to 85% of the traffic capacity that your origin can handle.
* _New users per minute_ - The number of new users admitted into the route every minute.
* _Session duration_ (optional) - Lifetime of a cookie set for users who get access to the route.

### What your waiting room will look like

Consider the appearance of your waiting room. This is what the visitor will see when queuing to access a route.
Cloudflare provides a template waiting room page to get you started, but you can edit this or upload your own HTML file. In the waiting room template, Cloudflare provides code that presents visitors with an estimated entry time to the route: including this in your waiting room page improves customer experience.

## Get started

You can [create](/how-to/create-waiting-room/), [edit](/how-to/edit-delete-waiting-room), [delete](/how-to/edit-delete-waiting-room#delete-a-waiting-room-in-the-cloudflare-dashboard), [manage](/how-to/control-waiting-room), and [monitor](/how-to/monitor-waiting-room) Cloudflare Waiting Rooms using the **Traffic** app on the [Cloudflare dashboard](/how-to/waiting-room-dashboard) or with the [Waiting Room API](/how-to/use-waiting-room-api).
