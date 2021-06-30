---
order: 14
pcx-content-type: tutorial
---

# Load shedding

Use load shedding to prevent an at-risk origin from becoming [unhealthy](/understand-basics/monitors) and starting the failover process. 

Once you configure load shedding on a pool, that pool will begin diverting traffic to other pools according to your load shedding settings and the load balancer's [steering policy](/understand-basics/traffic-steering).

## Step 1 — Identify at-risk origins

Using your internal metrics, identify origins at risk of reaching their failure threshold:
- If your origin is seeing increased traffic but is not yet at risk of failure, start with [Step 2](#step-2--shed-default-traffic).
- If your origin is about to fail, start with [Step 4](#step-4--shed-additional-traffic-optional).

## Step 2 — Shed default traffic from a pool

Once you have identified an at-risk origin, shed a small amount of **Default** traffic from that origin's pool. This traffic is not affiliated with existing [Session affinity](/understand-basics/session-affinity) sessions.

Configure load shedding via the [dashboard](#configure-via-dashboard) or the [API](#configure-via-api).

### Configure via dashboard

To enable load shedding for a specific pool via the dashboard:
1. Go to **Traffic** > **Load Balancing**.
1. Click **Manage Pools**.
1. On a pool, click **Edit**.
1. Click the **Configure Load Shedding** dropdown.
1. For **Default traffic**, select a **Policy** and a **Shed %**:

    <details>
    <summary>Policy options</summary>
    <div>
    When shedding <strong>Default traffic</strong>, you have two <strong>Policy</strong> options:

    - **Random**: Randomly sheds the percentage of requests specified in the *Shed %*. Distributes traffic more accurately, but may cause requests from the same IP to hit different origins.
    - **IP hash**: Sheds the percentage of IP addresses specified in the *Shed %*. Ensures requests from the same IP will hit the same origin, but may shed a significantly higher or lower percentage of requests.

    For more guidance on choosing a policy, see [Shedding policies](#shedding-policies).
    </div>
    </details>

    <details>
    <summary>Shed %</summary>
    <div>
    When choosing a <strong>Shed %</strong>, start with a small percentage and increase gradually. Particularly if you choose the <a href="#shedding-policies">IP hash</a> shedding policy, you might shed more traffic than expected.
    </div>
    </details>

### Configure via API

To enable load shedding for a specific pool via the API, [update the values](https://api.cloudflare.com/#account-load-balancer-pools-update-pool) for the pool's `load_shedding` object.

<details>
<summary>Example request</summary>
<div>

```json
---
header: Request
---
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account-id}/load_balancers/pools/{pool-id}" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: REDACTED" \
     -H "Content-Type: application/json" \
     --data '{
         "load_shedding": {
             "default_percent": 20,
             "default_policy": "random",
             "session_percent": 0,
             "session_policy": "hash"
         }
     }'
```
</div>
</details>

For more guidance on choosing a shedding policy, see [Shedding policies](#shedding-policies).

## Step 3 — Monitor traffic

Once you have started shedding default traffic, evaluate the effects by reviewing the [**Overview** metrics](/load-balancing-analytics#overview-metrics) in Load Balancing analytics. Based on these numbers and your internal metrics, you will know whether you need to divert additional traffic from the pool.

If you see increased traffic to a pool, you may also need to shed additional traffic. Pools shed a percentage of total traffic, so any increase in total traffic will also increase the traffic reaching your pool.

## Step 4 — Shed additional traffic (optional)

If you need to shed additional pool traffic:
1. Follow the steps outlined in [Step 2](#step-2--shed-default-traffic).
1. For **Default traffic** and/or **Session affinity traffic**, increase the **Shed %**.

Since shedding **Session Affinity traffic** will disrupt [existing sessions](/understand-basics/session-affinity) and may degrade the customer experience, only enable this option if your pool is in imminent danger of becoming unhealthy or your pool has a high percentage of traffic related to existing sessions.

## Step 5 — Disable load shedding

Once an origin pool is no longer at risk, remove load shedding from the pool.

To remove load shedding in the dashboard, perform the same steps as [Configure load shedding via the dashboard](#configure-via-dashboard) but set the **Shed %** to `0` for both **Default traffic** and **Session affinity traffic**.

To remove load shedding via the API, perform the same steps as [Configure load shedding via the API](#configure-via-api) but set the `load_shedding` object to `null`.

## Additional notes

### Shedding policies