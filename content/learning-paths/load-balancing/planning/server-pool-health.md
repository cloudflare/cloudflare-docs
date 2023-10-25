---
title: Server and pool health
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

As discussed before, a monitor issues health checks periodically to evaluate the health of a each server within a pool.

{{<render file=_health-check-diagram.md productFolder="load-balancing">}}
<br/>

{{<glossary-definition term_id="health check" prepend="These health checks are ">}}

---

## Customizations

Based on the characteristics of your server pools, you have several customization options that affect how and whether a server is considered unhealthy.

### Pool-level settings

#### Health threshold

{{<render file=_pool-health-threshold.md productFolder="load-balancing">}}
<br/>

#### Health monitor regions

{{<render file=_health-check-regions.md productFolder="load-balancing">}}

##### Configurations

{{<render file=_monitor-health-check-regions-options.md productFolder="load-balancing">}}

---

### Monitor-level settings

When you [create a monitor](/load-balancing/monitors/create-monitor/), there are several configuration settings you can adjust based on the characteristics of the attached pools:

{{<details header="Basic settings">}}

{{<render file=_monitor-settings-basic.md productFolder="load-balancing">}}

{{</details>}}

{{<details header="Advanced settings">}}

{{<render file=_monitor-settings-advanced.md productFolder="load-balancing">}}

{{</details>}}

{{<render file=_monitor-settings-consecutive.md productFolder="load-balancing">}}

---

### Fallback pool

You also need to decide which of the associated pools in a load balancer should be the fallback pool.

{{<render file=_fallback-pools.md productFolder="load-balancing">}}
