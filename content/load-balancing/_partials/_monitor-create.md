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
    {{<render file=_monitor-settings-basic.md productFolder="load-balancing">}}

5.  For additional settings, select **Advanced health check settings**:
    {{<render file=_monitor-settings-advanced.md productFolder="load-balancing">}}
    
6.  Select **Save**.

{{<render file=_monitor-settings-consecutive.md productFolder="load-balancing">}}
