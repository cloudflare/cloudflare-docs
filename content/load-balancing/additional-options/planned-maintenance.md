---
pcx_content_type: tutorial
title: Perform planned maintenance
weight: 6
---

# Perform planned maintenance

When you change application settings or add new assets, you will likely want to make these changes on one origin server at a time. Going server by server reduces the risk of changes and ensures a more consistent user experience.

To take servers out of rotation gradually (important for session-based load balancing), [enable origin drain](#gradual-rotation) on your load balancer. This option is only available for [proxied load balancers (orange-clouded)](/load-balancing/understand-basics/proxy-modes/).

To direct traffic away from your origin server immediately, [adjust settings on the pool or monitor](#immediate-rotation).

{{<Aside type="note">}}

If you want to divert traffic from an origin to prevent it from becoming unhealthy, use [Load Shedding](/load-balancing/additional-options/load-shedding/) instead.

{{</Aside>}}

## Before you begin

Before disabling any origin server, review the settings for any affected load balancers and pools.

If a pool falls below its **Health Threshold**, it will be considered **Unhealthy** and — depending on the load balancer setup and steering policy — a load balancer may begin routing traffic away from that pool.

## Gradual rotation

{{<Aside type="note">}}

Origin drain is only available for [proxied load balancers (orange-clouded)](/load-balancing/understand-basics/proxy-modes/).

{{</Aside>}}

With [session-based load balancing](/load-balancing/understand-basics/session-affinity/), it is important to direct all requests from a particular end user to a specific origin server. Otherwise, information about the user session — such as items in their shopping cart — may be lost and lead to negative business outcomes.

To remove a server from rotation while still preserving session continuity, set up **Origin drain** on a load balancer:

1.  On a new or existing load balancer, go to the **Hostname** step.
2.  Make sure you have enabled **Session Affinity**.
3.  For **Origin drain duration**, enter a time in seconds. If this value is less than the **Session TTL** value, you will affect existing sessions.
    ![Example configuration of session affinity with origin drain](/images/load-balancing/session-affinity-3.png)
4.  Save your changes to the load balancer.
5.  Click **Manage Pools**.
6.  Disable an origin. Your load balancer will gradually drain sessions from that origin.
7.  On your load balancer, expand your pools to find the disabled origin. You will see the estimated **Drain Time** counting down.
    ![Example showing load balancer draining in progress](/images/load-balancing/session-affinity-4.png)
8.  When a drain is **Complete**, there are no longer any connections to that origin.
    ![Example showing load balancer draining complete](/images/load-balancing/session-affinity-5.png)
9.  Perform your required maintenance or upgrades.
10. To bring your origin back online, re-enable the origin.

## Immediate rotation

To direct traffic away from an origin server immediately:

1.  Do one of the following actions:
    - On the origin's [monitor](/load-balancing/understand-basics/monitors/), update the monitor settings so the origin will fail health monitor requests, such as putting an incorrect value for the **Response Body** or **Response Code**.
    - On the pool, disable the origin.
    - On the pool, set the [origin weight](/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights) to `0` (though traffic may still reach the origin if it is included in multiple pools).
2.  Monitor [Load Balancing Analytics](/load-balancing/reference/load-balancing-analytics/) to make sure no requests are reaching the pool.
    - If you are using [DNS-only load balancing (gray-clouded)](/load-balancing/understand-basics/proxy-modes/), changes may be delayed due to DNS resolver caching.
3.  Perform your required maintenance or upgrades.
4.  Undo the changes you made in **Step 1**.
