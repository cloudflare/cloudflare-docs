---
_build:
  publishResources: false
  render: never
  list: never
---

To create a load balancer in the dashboard:

1.  Go to **Traffic** > **Load Balancing**.

2.  Click **Create Load Balancer**.

3.  On the **Hostname** page:
    *   Enter a **Hostname**, which is the DNS name at which the load balancer is available. For more details on record priority, refer to [DNS records for load balancing](/load-balancing/reference/dns-records/).
    *   Toggle the orange cloud icon to update the [proxy mode](/load-balancing/understand-basics/proxy-modes/), which affects how traffic is routed and which IP addresses are advertised.
    *   If you want [session-based load balancing](/load-balancing/understand-basics/session-affinity/), toggle the **Session Affinity** switch.

4.  Click **Next**.

5.  On the **Add an Origin Pool** page:
    *   Select one or more existing pools or [create a new pool](/load-balancing/how-to/create-pool/#create-a-pool).
    *   If you are going to set [traffic steering](/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/) to **Off**, re-order the pools in your load balancer to adjust the fallback order.
    *   If needed, update the [**Fallback Pool**](/load-balancing/understand-basics/health-details/#fallback-pools).
    *   If you choose to set traffic steering to **Random**, you can set [Weights](/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/#random-steering) (via the API) to your pools to determine the percentage of traffic sent to each pool.

6.  Click **Next**.

7.  On the **Monitors** page:
    *   Review the monitors attached to your pools.
    *   If needed, you can attach an existing monitor or [create a new monitor](/load-balancing/how-to/create-monitor/#create-a-monitor).

8.  Click **Next**.

9.  On the **Traffic Steering** page, choose an option for [Traffic steering](/load-balancing/understand-basics/traffic-steering/steering-policies/).

10. Click **Next**.

11. On the **Custom Rules** page, select an existing rule or [create a new rule](/load-balancing/additional-options/load-balancing-rules/).

12. Click **Next**.

13. On the **Review** page:
    *   Review your configuration and make any changes.
    *   Choose whether to **Save as Draft** or **Save and Deploy**.
