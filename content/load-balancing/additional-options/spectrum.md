---
pcx_content_type: navigation
title: Spectrum
weight: 2
meta:
  title: Add load balancing to Spectrum applications
---

# Add load balancing to Spectrum applications

You can configure [Spectrum](/spectrum/) with Load Balancing to bring resiliency to your TCP or UDP based applications.

Leverage health monitors, failover, and traffic steering by selecting a load balancer as **Origin** when creating your Spectrum application.

The exact settings will vary depending on your use case. Refer to the following steps to understand the workflow.

---

## Set up

### 1. Configure your load balancer

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select an account where the Load Balancing add-on is [enabled](/load-balancing/get-started/enable-load-balancing/).

1. Go to **Traffic** > **Load Balancing**.

2. Select **Create Load Balancer**.

3.  On the **Hostname** page, define the settings presented and select **Next**.
    *   Enter a **Hostname**, which is the DNS name at which the load balancer is available. For more details on record priority, refer to [DNS records for load balancing](/load-balancing/load-balancers/dns-records/).
    {{<Aside type="warning">}}
  To prevent issues with DNS resolution, the load balancer hostname should be different from the hostname (or domain) you intend to define for your Spectrum application.
    {{</Aside>}}
    *   Keep the orange cloud icon enabled, meaning the load balancer is proxied. This refers to the [proxy mode](/load-balancing/understand-basics/proxy-modes/) and, with Spectrum, traffic is always proxied.
    *   Keep **Session Affinity** and **Failover across pools** disabled as these features are not supported with Spectrum.

4.  On the **Add a Pool** page, define the settings presented and select **Next**.
    *   Select one or more existing pools or [create a new pool](/load-balancing/pools/create-pool/#create-a-pool) [^1].
    *   If needed, update the [fallback pool](/load-balancing/understand-basics/health-details/#fallback-pools) [^2].

5.  On the **Monitors** page, define the settings presented and select **Next**.
    *   Review the monitors attached to your pools.
    *   If needed, you can attach an existing monitor or [create a new monitor](/load-balancing/monitors/create-monitor/#create-a-monitor).

6.  On the **Traffic Steering** page, choose an option for [Traffic steering](/load-balancing/understand-basics/traffic-steering/steering-policies/) and select **Next**.

7. Keep **Custom Rules** page empty as this feature is not supported with Spectrum.

8. On the **Review** page:
    *   Review your configuration and make any changes.
        * If you set traffic steering to **Off**, re-order the pools in your load balancer to adjust the fallback order.
        * If you chose to set traffic steering to Random, you can [set weights to your pools](/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/#random-steering) (via the [API](/api/operations/load-balancers-create-load-balancer)) to determine the percentage of traffic sent to each pool.
    *   Choose whether to **Save as Draft** or **Save and Deploy**.

### 2. Configure your Spectrum application

{{<render file="_spectrum-with-load-balancer-dash.md" productFolder="spectrum">}}

---

## Limitations

{{<render file="_spectrum-lb-limitations.md">}}

[^1]: Within Cloudflare, pools represent your endpoints and how they are organized. As such, a pool can be a group of several endpoints, or you could also have only one endpoint (an origin server, for example) per pool.
[^2]: A fallback pool is the pool of last resort. When all pools are disabled or unhealthy, this is where the load balancer will send traffic.