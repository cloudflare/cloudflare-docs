---
pcx_content_type: tutorial
title: Perform planned maintenance
weight: 6
---

# Perform planned maintenance

When you change application settings or add new assets, you will likely want to make these changes on one endpoint at a time. Going endpoint by endpoint reduces the risk of changes and ensures a more consistent user experience.

To take endpoints out of rotation gradually (important for session-based load balancing), [enable endpoint drain](#gradual-rotation) on your load balancer. This option is only available for [proxied load balancers (orange-clouded)](/load-balancing/understand-basics/proxy-modes/).

To direct traffic away from your endpoint immediately, [adjust settings on the pool or monitor](#immediate-rotation).

{{<Aside type="note">}}

If you want to divert traffic from an endpoint to prevent it from becoming unhealthy, use [Load Shedding](/load-balancing/additional-options/load-shedding/) instead.

{{</Aside>}}

## Before you begin

Before disabling any endpoint, review the settings for any affected load balancers and pools.

If a pool falls below its **Health Threshold**, it will be considered **Unhealthy** and — depending on the load balancer setup and steering policy — a load balancer may begin routing traffic away from that pool.

## Gradual rotation

{{<Aside type="note">}}

Endpoint drain is only available for [proxied load balancers (orange-clouded)](/load-balancing/understand-basics/proxy-modes/).

{{</Aside>}}

With [session-based load balancing](/load-balancing/understand-basics/session-affinity/), it is important to direct all requests from a particular end user to a specific endpoint. Otherwise, information about the user session — such as items in their shopping cart — may be lost and lead to negative business outcomes.

To remove an endpoint from rotation while still preserving session continuity, set up **Endpoint drain** on a load balancer:

1.  On a new or existing load balancer, go to the **Hostname** step.
2.  Make sure you have enabled **Session Affinity**.
3.  For **Endpoint drain duration**, enter a time in seconds. If this value is less than the **Session TTL** value, you will affect existing sessions.
    ![Example configuration of session affinity with endpoint drain](/images/load-balancing/session-affinity-3.png)
4.  Save your changes to the load balancer.
5.  Click **Manage Pools**.
6.  Disable an endpoint. Your load balancer will gradually drain sessions from that endpoint.
7.  On your load balancer, expand your pools to find the disabled endpoint. You will see the estimated **Drain Time** counting down.
    ![Example showing load balancer draining in progress](/images/load-balancing/session-affinity-4.png)
8.  When a drain is **Complete**, there are no longer any connections to that endpoint.
    ![Example showing load balancer draining complete](/images/load-balancing/session-affinity-5.png)
9.  Perform your required maintenance or upgrades.
10. To bring your endpoint back online, re-enable the endpoint.

## Immediate rotation

To direct traffic away from an endpoint immediately:

1.  Do one of the following actions:
    - On the endpoint's [monitor](/load-balancing/monitors/), update the monitor settings so the endpoint will fail health monitor requests, such as putting an incorrect value for the **Response Body** or **Response Code**.
    - On the pool, disable the endpoint.
    - On the pool, set the [endpoint weight](/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights) to `0` (though traffic may still reach the endpoint if it is included in multiple pools).
2.  Monitor [Load Balancing Analytics](/load-balancing/reference/load-balancing-analytics/) to make sure no requests are reaching the pool.
    - If you are using [DNS-only load balancing (gray-clouded)](/load-balancing/understand-basics/proxy-modes/), changes may be delayed due to DNS resolver caching.
3.  Perform your required maintenance or upgrades.
4.  Undo the changes you made in **Step 1**.
