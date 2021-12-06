---
order: 5
pcx-content-type: how-to
---

# Perform planned maintenance

When you change application settings or add new assets, you will likely want to make these changes on one origin server at a time. Going server by server reduces the risk of changes and ensures a more consistent user experience.

To take servers out of rotation gradually (important for session-based load balancing), [enable origin drain](#gradual-rotation) on your load balancer. This option is only available for [proxied load balancers (orange-clouded)](/understand-basics/proxy-modes).

To direct traffic away from your origin server immediately, [adjust settings on the pool or monitor](#immediate-rotation).

<Aside type="note">

If you want to divert traffic from an origin to prevent it from becoming unhealthy, use [Load Shedding](/additional-options/load-shedding) instead.

</Aside>

## Before you begin

Before disabling any origin server, review the settings for any affected load balancers and pools. 

If a pool falls below its **Health Threshold**, it will be considered **Unhealthy** and — depending on the load balancer setup and steering policy — a load balancer may begin routing traffic away from that pool.

## Gradual rotation

<Aside type="note">

Origin drain is only available for [proxied load balancers (orange-clouded)](/understand-basics/proxy-modes).

</Aside>

With [session-based load balancing](/understand-basics/session-affinity), it is important to direct all requests from a particular end user to a specific origin server. Otherwise, information about the user session — such as items in their shopping cart — may be lost and lead to negative business outcomes.

To remove a server from rotation while still preserving session continuity, set up **Origin drain** on a load balancer:

1. On a new or existing load balancer, go to the **Hostname** step.
1. Make sure you have enabled **Session Affinity**.
1. For **Origin drain duration**, enter a time in seconds. If this value is less than the **Session TTL** value, you will affect existing sessions.
    ![Session affinity configuration with origin drain](../static/images/session-affinity-3.png)
1. Save your changes to the load balancer.
1. Click **Manage Pools**.
1. Disable an origin. Your load balancer will gradually drain sessions from that origin.
1. On your load balancer, expand your pools to find the disabled origin. You will see the estimated **Drain Time** counting down.
    ![Manage Load Balancer table with draining in progress](../static/images/session-affinity-4.png)
1. When a drain is **Complete**, there are no longer any connections to that origin.
    ![Manage Load Balancer table with draining complete](../static/images/session-affinity-5.png)
1. Perform your required maintenance or upgrades.
1. To bring your origin back online, re-enable the origin.

## Immediate rotation

To direct traffic away from an origin server immediately: 

1. Do one of the following actions:
    - On the origin's [monitor](/understand-basics/monitors), update the monitor settings so the origin will fail health checks, such as putting an incorrect value for the **Response Body** or **Response Code**.
    - On the pool, disable the origin.
    - On the pool, set the [origin weight](/understand-basics/weighted-load-balancing) to `0` (though traffic may still reach the origin if it is included in multiple pools).
1. Monitor [Load Balancing Analytics](/load-balancing-analytics) to make sure no requests are reaching the pool.
    - If you are using [DNS-only load balancing (gray-clouded)](/understand-basics/proxy-modes), changes may be delayed due to DNS resolver caching.
1. Perform your required maintenance or upgrades.
1. Undo the changes you made in **Step 1**.
