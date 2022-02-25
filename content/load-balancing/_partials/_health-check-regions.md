---
---

For each option selected in a pool's **Health Check Regions**, Cloudflare sends health checks from three separate data centers in that region.

![Health checks come from three data centers within each selected region.](../static/images/health-check-component.png)

If the majority of data centers for that region pass the health checks, that region is considered healthy. If the majority of regions is healthy, then the origin itself will be considered healthy.
