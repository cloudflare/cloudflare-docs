---
title: Manage pools
pcx_content_type: how-to
weight: 2
meta:
  title: Manage origin server pools
  description: Learn how to set up and maintain origin server pools.
---

# Manage origin server pools

{{<glossary-definition term_id="origin pool">}}

For more background information on pools, refer to [Origin pools](/load-balancing/pools/).

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