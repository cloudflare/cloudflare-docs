---
pcx_content_type: concept
title: Queueing method
---

# Queueing method

The **queueing method** determines the order that visitors exit an active waiting room and reach your application.

Only certain customers can use queue methods besides First In First Out (FIFO). For more details, refer to [Plans](/waiting-room/plans/) page.

{{<Aside type="note" header="Note:">}}

Regardless of the queueing method, if `queueAll` is enabled or an event is prequeueing, users in the waiting room will not be accepted to the origin. These users will always see a waiting room page that refreshes automatically.

{{</Aside>}}

## First In First Out (FIFO)

Your waiting room orders visitors according to when they entered the waiting room.

![First In First Out flow showing visitors entering the origin by order of arrival to the waiting room](/waiting-room/static/fifo-queueing-method.png)

Technically, each user receives a [cookie](/waiting-room/reference/waiting-room-cookie/) that contains a timestamp of when their request first hit an actively queueing waiting room. Cloudflare uses that timestamp to order visitors and provide the estimated wait time.

Use this method when you want to reward visitors who get in the queue first and wait longer.

## Random

When your application has open spots, your waiting room chooses visitors at random to exit the waiting room and enter your application.

![Random queueing flow showing visitors randomly exiting the waiting room and entering an origin](/waiting-room/static/random-queueing-method.png)

Use this method when you want to distribute products or services more equitably. Earlier users have a better chance of exiting the waiting room before the estimated wait time because they have more chances to be selected.

## Passthrough

Allow all traffic to pass immediately through your waiting room and into your application by setting its `queueing_method` to **passthrough**.

Use this setup when you only want to use your waiting room for events — where you can update the queueing method — and otherwise avoid queueing during low-traffic hours.

## Reject

Prevent any traffic from reaching your application by setting its `queueing_method` to **reject**. Users will see a static page.

Use this setup for event-only endpoints or to perform application maintenance.

## Changing queueing methods

{{<render file="_change-queueing-method.md">}}
