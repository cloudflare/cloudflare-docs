---
_build:
  publishResources: false
  render: never
  list: never
---

Before directing any traffic to your pools, make sure that your pools and monitors are set up correctly. The status of your health check will be _unknown_ until the results of the first check are available.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To confirm pool health using the dashboard:

1.  Navigate to **Traffic** > **Load Balancing**.
2.  Click **Manage Pools**.
3.  For pools and individual origins, review the values in the **Health** and **Origin Health** columns.

For more information on pool and origin health statuses, refer to [How a pool becomes unhealthy](/load-balancing/understand-basics/health-details/#how-a-pool-becomes-unhealthy).

{{</tab>}}
{{<tab label="api" no-code="true">}}

To fetch the latest health status of all pools, use the [List Pools](/api/operations/account-load-balancer-pools-list-pools) command, paying attention to the `healthy` value for pools and origins.

For troubleshooting a specific pool's health, use the [Pool Health Details](/api/operations/account-load-balancer-pools-pool-health-details) command.

{{</tab>}}
{{</tabs>}}