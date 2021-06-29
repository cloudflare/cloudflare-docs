---
order: 14
pcx-content-type: tutorial
---

# Load shedding

Enable load shedding to prevent an origin pool from becoming [unhealthy](/understand-basics/monitors) and starting the failover process. Your pool will begin diverting traffic to other origins (determined by your load shedding settings and the load balancer's steering policy).

## Step 1 — Identify at-risk pools

Using your internal metrics, identify pools at risk of reaching their failure threshold:
- If your pool is seeing increased traffic but not yet at risk of failure, start with [Step 2](#step-2--shed-default-traffic).
- If your pool is about to fail, start with [Step 4](#step-4--shed-additional-traffic-optional).

## Step 2 — Shed default traffic

Once you have identified an at-risk pool, you should likely start by shedding a small amount of **Default** traffic. This traffic is not affiliated with existing [Session affinity](/understand-basics/session-affinity) sessions.

Configure load shedding via the [dashboard](#configure-via-dashboard) or the [API](#configure-via-api).

### Configure via dashboard

To enable load shedding for a specific pool via the dashboard:
1. Navigate to **Traffic** > **Load Balancing**.
1. Click **Manage Pools**.
1. On a pool, click **Edit**.
1. Click the **Configure Load Shedding** dropdown.
1. For **Default traffic**, select a **Policy** and a **Shed %**:
   
    <details>
    <summary>Policy options</summary>
    <div>
    When setting up shedding for <strong>Default traffic</strong>, you have two <strong>Policy</strong> options:

    - **Random**: Randomly selects requests to shed based on the *Shed %*. The actual percentage of requests shed aligns more closely to the *Shed %*, but this option may cause requests from the same IP to hit different origins.
    - **IP Hash**: Selects a percentage of IP addresses to shed based on the *Shed %*. Ensures requests from the same IP will hit the same origin, but may lead to a significantly higher or lower percentage of requests being shed than specified in your *Shed %*.

    For more details on these policies, see [Shedding policies](#shedding-policies).
    </div>
    </details>

    <details>
    <summary>Shed %</summary>
    <div>
    When choosing a <strong>Shed %</strong>, it's best to start small and increase gradually. This advice is particularly important if you are shedding based on <a href="#shedding-policies">IP Hash</a> as you might shed more traffic than expected.
    </div>
    </details>

### Configure via API

TBD on Jeremy's answer.

## Step 3 — Monitor traffic

Once you have started shedding default traffic, evaluate the effects on specific origin pools by reviewing the [**Overview** metrics](/load-balancing-analytics#overview-metrics) in Load Balancing analytics. Based on these numbers and your internal metrics, you will know whether enough traffic is being diverted to prevent your pool from failing.

If you see increased traffic to a pool, you may also need to shed additional traffic. Your pool sheds a percentage of total traffic, so any increase in total traffic may send more traffic to your pool and lead to failure.

## Step 4 — Shed additional traffic (optional)

If you need to shed additional pool traffic:
1. Follow the steps outlined in [Step 2](#step-2--shed-default-traffic).
1. For **Default traffic** and/or **Session affinity traffic**, increase the **Shed %**.

Since shedding **Session Affinity traffic** will disrupt [existing sessions](/understand-basics/session-affinity) and may degrade the customer experience, only enable this option if your pool is in imminent danger of becoming unhealthy or is not seeing reduced traffic when you are adjusting the **Default traffic** percentages.

## Step 5 — Disable load shedding

Once an origin pool is no longer at risk, remove load shedding from the pool.

To remove load shedding in the dashboard, perform the same steps as [Configure load shedding via the dashboard](#configure-via-dashboard) but set the **Shed %** to `0` for both **Default traffic** and **Session affinity traffic**.

To remove load shedding via the API, perform the same steps as [Configure load shedding via the API](#configure-via-api) but set `default_percent` and `session_percent` to `0`.

## Additional notes

### Shedding policies