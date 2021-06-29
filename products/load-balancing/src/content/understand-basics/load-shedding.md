---
order: 14
pcx-content-type: concept
---

# Load shedding

Load shedding can prevent an origin pool from becoming [unhealthy](/understand-basics/monitors) — and starting the failover process — in the first place. 

When you notice a pool getting close to its failure threshold, use load shedding to divert traffic load to other origins (determined by load shedding settings and the load balancer's steering policy).

## Step 1 — Identify at-risk pools

Using your internal metrics, identify pools at risk of reaching their failure threshold.

## Step 2 — Configure load shedding

Once you have identified a pool that might be getting overloaded, configure load shedding via the [dashboard](#configure-via-dashboard) or the [API](#configure-via-api).

### Configure via dashboard

To enable load shedding for a specific pool via the dashboard:
1. Navigate to **Traffic** > **Load Balancing**.
2. Click **Manage Pools**.
3. On a pool, click **Edit**.


### Configure via API