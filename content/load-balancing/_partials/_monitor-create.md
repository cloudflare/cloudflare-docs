---
_build:
  publishResources: false
  render: never
  list: never
---

You can create a monitor within the [load balancer workflow](/load-balancing/how-to/create-load-balancer/) or in the **Monitors** section of the dashboard:

1.  Go to **Traffic** > **Load Balancing**.

2.  Click **Manage Monitors**.

3.  Click **Create**.

4.  Add the following information:
    {{<render file="../../load-balancing/_partials/_monitor-settings-basic.md">}}

5.  For additional settings, select **Advanced health check settings**:
    {{<render file="../../load-balancing/_partials/_monitor-settings-advanced.md">}}
    
6.  Select **Save**.

{{<render file="../../load-balancing/_partials/_monitor-settings-consecutive.md">}}
