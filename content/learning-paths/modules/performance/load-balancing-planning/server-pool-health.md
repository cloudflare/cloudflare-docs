---
title: Server and pool health
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

As discussed before, a monitor issues health checks periodically to evaluate the health of a each server within a pool.

{{<render file="../../load-balancing/_partials/_health-check-diagram.md">}}
<br/>

{{<render file="../../load-balancing/_partials/_health-check-definition.md">}}

---

## Customizations

Based on the characteristics of your server pools, you have several customization options that affect how and whether a server is considered unhealthy.

### Pool-level settings

#### Health threshold

{{<render file="../../load-balancing/_partials/_pool-health-threshold.md">}}
<br/>

#### Health check regions

{{<render file="../../load-balancing/_partials/_health-check-regions.md">}}

##### Configurations

{{<render file="../../load-balancing/_partials/_monitor-health-check-regions-options.md">}}

---

### Monitor-level settings

When you [create a monitor](/load-balancing/how-to/create-monitor/), there are several configuration settings you can adjust based on the characteristics of the attached pools:

<details>
<summary>Basic settings</summary>
<div>

{{<render file="../../load-balancing/_partials/_monitor-settings-basic.md">}}

</div>
</details>

<details>
<summary>Advanced settings</summary>
<div>

{{<render file="../../load-balancing/_partials/_monitor-settings-advanced.md">}}

</div>
</details>

{{<render file="../../load-balancing/_partials/_monitor-settings-consecutive.md">}}

---

### Fallback pool

You also need to decide which of the associated pools in a load balancer should be the fallback pool.

{{<render file="../../load-balancing/_partials/_fallback-pools.md">}}