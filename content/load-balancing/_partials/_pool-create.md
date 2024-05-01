---
_build:
  publishResources: false
  render: never
  list: never
---

You can create a pool within the [load balancer workflow](/load-balancing/load-balancers/create-load-balancer/) or in the **Origin Pools** section of the dashboard:

1.  Go to **Traffic** > **Load Balancing**.

2.  Select **Manage Pools** and then **Create**.

3.  For your pool, enter the following information:
    *   A name (must be unique)
    *   A description to provide more detail on the name
    *   A choice for [**Origin Steering**](/load-balancing/understand-basics/traffic-steering/origin-level-steering/), which affects how your pool routes traffic to each origin

4.  For each origin, enter the following information:
    *   A name (must be unique)
    *   The origin server address or associated hostname
    *   (Optional) A [**Virtual Network**](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/). Required when the origin has a private IP address.
    *   A [**Weight**](/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights)
    *   (Optional) A [hostname](/load-balancing/additional-options/override-http-host-headers/) by clicking **Add host header**

{{<Aside type="note" header="Note">}}

If your origin is pointing to [Cloudflare Pages](/pages/), you will need to fill in the host header field with the project domain for it to resolve correctly.

{{</Aside>}}

5.  Repeat this process for additional origins in the pool.

6.  (Optional) Set up coordinates for [Proximity Steering](/load-balancing/understand-basics/traffic-steering/steering-policies/proximity-steering/) on the pool.

7.  On the origin pool, update the following information:
    *   **Health Threshold**: {{<render file=_pool-health-threshold.md productFolder="load-balancing">}}
    *   **Monitor**: Attach a [monitor](/load-balancing/monitors/create-monitor/)
    *   **Health Monitor Regions**: Choose whether to check pool health from [multiple locations](/load-balancing/monitors/#health-monitor-regions), which increases accuracy but can lead to probe traffic to your origin
    *   **Pool Notifications**: You can set up new alerts - and view existing alerts - to be notified when pools are enabled or disabled, or pools or origins have changes in their [health status](/load-balancing/understand-basics/health-details/).

8.  When finished, select **Save**.
