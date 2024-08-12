---
title: How it works
pcx_content_type: concept
weight: 1
---

# How it works

Waiting Room queues visitors when your traffic exceeds a previously defined threshold that might otherwise bring an application down.

![Waiting Room process flow showing how a request is managed by Cloudflare and placed in a waiting room before reaching the origin website](/images/waiting-room/waiting-room-process-flow.png)

## User flow

Once you have [created and activated a waiting room](/waiting-room/get-started/) for a specific application page:

- If a page is not experiencing heavy traffic, a visitor accesses the page directly.
- If page traffic crosses a [user-defined threshold](/waiting-room/reference/configuration-settings/#session-duration), a visitor enters a virtual waiting room until it is their turn to access the page:

  - Each user receives a [cookie](/waiting-room/reference/waiting-room-cookie/) to manage the dynamic outflow of requests from the waiting room to the origin website in [First In First Out (FIFO)](/waiting-room/reference/queueing-methods/#first-in-first-out-fifo) order.
  - While in the waiting room, the user's browser automatically refreshes every 20 seconds to give them updated information about their estimated wait time.
  - When a user exits the waiting room and reaches your application, they can leave and re-enter without waiting for the length of time specified by the [session duration](/waiting-room/reference/configuration-settings/#session-duration).
  - Because waiting rooms support dynamic inflow and [outflow](/waiting-room/reference/configuration-settings/#session-duration), new spots appear more quickly and estimated wait times are lower and more accurate.

## Architecture

Waiting Room is built on [Workers](/workers/) that runs across a global network of Cloudflare data centers.

When a request comes to a host or path covered by a Waiting Room, that request goes to a Waiting Room Worker in closest geographic data center. The Worker then needs to make a decision: whether to send users to the queue or the website.

That decision itself depends on two factors: [admin-defined thresholds](/waiting-room/reference/configuration-settings/) and the Waiting Room state.

For admin-defined thresholds, the two measures that matter are `total active users` and `new users per minute`:

- `total active users` is a target threshold for how many simultaneous users you want to allow on the pages covered by your waiting room.
- `New users per minute` defines the target threshold for the maximum rate of user influx to your website per minute.

A sharp spike in either of these values might result in queuing. Another configuration that affects how we calculate `the total active users` is `session duration`. A user is considered active for `session duration` minutes since the request is made to any page covered by a waiting room.

The other factor is the Waiting Room state. The waiting room state changes continuously based on the traffic around the world. Storing this information in a central location can add significant latency to each request as the central location can be really far from where the request is originating from. For this reason, every data center works with its own waiting room state which is a snapshot of the traffic pattern for the website around the world available at that point in time. Before letting a user into the website, we do not want to wait for information from everywhere else in the world as that adds significant latency to the request. This is the reason why we chose not to have a central location but have a pipeline[^1] where changes in traffic get propagated eventually around the world.

For more details around the architecture and why we made these decisions, refer to our [deep-dive technical blog](https://blog.cloudflare.com/how-waiting-room-queues).

[^1]: This pipeline which aggregates the waiting room state in the background is built on Cloudflare [Durable Objects](/durable-objects/). This pipeline ensures that every data center gets updated information about changes in traffic within a few seconds.