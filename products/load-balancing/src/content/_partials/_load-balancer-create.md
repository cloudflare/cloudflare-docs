1. Go to **Traffic** > **Load Balancing**.
1. Click **Create Load Balancer**.
1. On the **Hostname** page:
    - Enter a **Hostname**, which is the DNS name at which the load balancer is available. For more details on record priority, refer to [DNS records for load balancing](/reference/dns-records).
    - Toggle the orange cloud icon to update the [proxy mode](/understand-basics/proxy-modes), which affects how traffic is routed and which IP addresses are advertised.
    - If you want [session-based load balancing](/understand-basics/session-affinity), toggle the **Session Affinity** switch.

1. Click **Next**.
1. On the **Add an Origin Pool** page:
    - Select one or more existing pools or [create a new pool](/how-to/create-pool#via-the-dashboard).
    - If you are going to set [traffic steering](/understand-basics/traffic-steering) to **Off**, re-order the pools in your load balancer to adjust the fallback order.
    - If needed, update the [**Fallback Pool**](/understand-basics/health-details#fallback-pools).

1. Click **Next**.
1. On the **Monitors** page:
    - Review the monitors attached to your pools.
    - If needed, you can attach an existing monitor or [create a new monitor](/how-to/create-monitor#via-the-dashboard).
1. Click **Next**.
1. On the **Traffic Steering** page, choose an option for [Traffic steering](/understand-basics/traffic-steering/).
1. Click **Next**.
1. On the **Custom Rules** page, select an existing rule or [create a new rule](/additional-options/load-balancing-rules).
1. Click **Next**.
1. On the **Review** page:
    - Review your configuration and make any changes.
    - Choose whether to **Save as Draft** or **Save and Deploy**.