---
title: Manage pools
pcx-content-type: how-to
weight: 2
meta:
  title: Manage origin server pools
---

# Manage origin server pools

{{<render file="_pool-definition.md">}}

For more background information on pools, refer to [Origin pools](/load-balancing/understand-basics/pools/).

***

## Create a pool

### Via the dashboard

{{<render file="_pool-create.md">}}

### Via the API

{{<render file="_pool-create-api.md">}}

***

## Edit a pool

### Via the dashboard

To edit a pool in the dashboard:

1.  Go to **Traffic** > **Load Balancing**.
2.  Click **Manage Pools**.
3.  On a specific pool, click **Edit**.
4.  Update settings as needed.
5.  Click **Save**.

### Via the API

To update specific settings without having to resubmit the entire configuration, use a [PATCH](https://api.cloudflare.com/#account-load-balancer-pools-patch-pool) request. For broader changes, use a [PUT](https://api.cloudflare.com/#account-load-balancer-pools-update-pool) request.

***

## Delete a pool

### Via the dashboard

To delete a pool in the dashboard:

1.  Go to **Traffic** > **Load Balancing**.
2.  Click **Manage Pools**.
3.  On a specific pool, click **Delete**.

### Via the API

To delete a pool using the API, send a [DELETE](https://api.cloudflare.com/#account-load-balancer-pools-delete-pool) request.
