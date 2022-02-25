---
title: Manage pools
pcx-content-type: how-to
weight: 2
meta:
  title: Manage origin server pools
---

import PoolDefinition from "../\_partials/\_pool-definition.md"
import PoolCreate from "../\_partials/\_pool-create.md"
import PoolCreateAPI from "../\_partials/\_pool-create-api.md"

# Manage origin server pools

<PoolDefinition/>

For more background information on pools, refer to [Origin pools](/load-balancing/understand-basics/pools/).

***

## Create a pool

### Via the dashboard

<PoolCreate/>

### Via the API

<PoolCreateAPI/>

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
