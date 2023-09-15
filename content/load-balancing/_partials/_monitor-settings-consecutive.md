---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="note" header="Note">}}

To increase confidence in pool status, you can also increase the `consecutive_up` and `consecutive_down` fields when [creating a monitor with the API](/api/operations/account-load-balancer-monitors-create-monitor). 

To become healthy or unhealthy, monitored origins must pass this health monitor request the consecutive number of times specified in these parameters.

{{</Aside>}}