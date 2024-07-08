---
title: Manage pools
pcx_content_type: how-to
weight: 2
meta:
  title: Manage pools
  description: Learn how to set up and maintain pools.
---

# Manage pools

{{<glossary-definition term_id="pool">}}

For more background information on pools, refer to [Pools](/load-balancing/pools/).

{{<Aside type="warning">}}
{{<render file="_endpoints-introduction-callout.md">}}
{{</Aside>}}

---

## Create a pool

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

{{<render file="_pool-create.md">}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="_pool-create-api.md">}}

{{</tab>}}
{{</tabs>}}

---

## Edit a pool

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To edit a pool in the dashboard:

1.  Go to **Traffic** > **Load Balancing**.
2.  Click **Manage Pools**.
3.  On a specific pool, click **Edit**.
4.  Update settings as needed.
5.  Click **Save**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

When you edit a pool with the API, your request type depends on how much you want to edit.

To update specific settings without having to resubmit the entire configuration, use a [PATCH](/api/operations/account-load-balancer-pools-patch-pool) request. For broader changes, use a [PUT](/api/operations/account-load-balancer-pools-update-pool) request.

{{</tab>}}
{{</tabs>}}

---

## Delete a pool

You cannot delete pools that are in use by load balancers. This includes [geo steering regions](/load-balancing/understand-basics/traffic-steering/steering-policies/geo-steering/#region-steering) pools as well as [fallback pools](/load-balancing/understand-basics/health-details/#fallback-pools).

If you get an error when trying to delete a pool, consider the hostnames listed in the error and [edit the respective load balancers](/load-balancing/load-balancers/create-load-balancer/), making sure to remove all references to the pool.

{{<Aside type="note">}}
If the pool is referenced by geo steering, the configuration is **not** automatically removed when you change to a different **Traffic Steering** method. To make sure you remove it, select **Geo Steering**, remove the pool, and then apply and save any other necessary changes.
{{</Aside>}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To delete a pool in the dashboard:

1.  Go to **Traffic** > **Load Balancing**.
2.  Click **Manage Pools**.
3.  On a specific pool, click **Delete**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To delete a pool using the API, send a [DELETE](/api/operations/account-load-balancer-pools-delete-pool) request.

{{</tab>}}
{{</tabs>}}

---

## Set up alerts

You can configure alerts to receive notifications for changes in the status of your pools.

{{<available-notifications product="Load Balancing">}}

{{<render file="_get-started.md" productFolder="notifications" >}}