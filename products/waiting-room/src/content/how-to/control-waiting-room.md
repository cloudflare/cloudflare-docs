---
order: 3
pcx-content-type: how-to
---

import QueueAll from "../_partials/_queue-all.md"
import QueueSome from "../_partials/_queue-some.md"

# Control waiting room traffic

To change whether and how traffic reaches a waiting room, update the values for **Enabled**, **Queue All**, and **Queueing Method** on your waiting room.

## Enable a waiting room

To enable a waiting room:

1. Go to **Traffic** > **Waiting Rooms**.
1. On a waiting room, set **Enabled** to **On**. 

## Queue activation

By default, an active waiting room only puts visitors in a queue when traffic reaches the thresholds defined in **Total active users** and **New users per minute**. 

However, if you want all visitors to be queued — in preparation for a product release or other time-based event — use the **Queue All** option on a waiting room. So long as the waiting room is active and **Queue All** is enabled, no traffic will reach your application.

### Queue visitors when necessary

<QueueSome/>

### Queue all visitors

<QueueAll/>

## Queueing method

For more details about queueing method, refer to [Queueing methods](/reference/queueing-methods).
