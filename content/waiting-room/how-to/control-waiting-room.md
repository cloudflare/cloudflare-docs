---
pcx_content_type: how-to
title: Control waiting room traffic
weight: 4
---

# Control waiting room traffic

To change whether and how traffic reaches a waiting room, update the values for **Enabled**, **Queue All**, and **Queueing Method** on your waiting room.

## Enable a waiting room

To enable a waiting room:

1.  Go to **Traffic** > **Waiting Rooms**.
2.  On a waiting room, set **Enabled** to **On**.

## Queue options

By default, an active waiting room puts visitors in a queue when traffic approaches the target thresholds defined in **Total active users** and **New users per minute**. Refer to [Queuing activation](/waiting-room/how-to/monitor-waiting-room/#queueing-activation) for more information.

However, if you want all visitors to be queued for a predefined amount of time — in preparation for a product release or other time-based event — use the Waiting Room [event prequeuing](/waiting-room/additional-options/create-events/) option.

You may also use the **Queue All** option on a waiting room as an emergency stop to all traffic during unexpected or temporary downtime. As long as the waiting room is active and **Queue All** is enabled, no traffic will reach your application.

### Queue visitors when necessary

{{<render file="_queue-some.md">}}

### Queue all visitors

{{<render file="_queue-all.md">}}

## Queueing method

For more details about queueing method, refer to [Queueing methods](/waiting-room/reference/queueing-methods/).
