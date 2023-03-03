---
_build:
  publishResources: false
  render: never
  list: never
---

**All Data Centers (Enterprise only)**

Health check probes are sent from every single data center in Cloudflare’s network to the origins within the associated pool. This allows probes to hit each origin during intervals set by the customer. 

**All Regions**

Three health check probes per region are sent to each origin in the associated pool. There are a total of 13 regions, resulting in 39 probes.

**Regional**

Three health check probes are sent from each specified region within the pool configuration.

{{<Aside type="warning">}}

Because of how Cloudflare checks health from [multiple regions](#health-check-regions), adding multiple regions — or choosing to check health from **All Data Centers** — can send a lot of traffic to your origin.

The same problem can occur when setting low values for a monitor's **Interval**.

{{</Aside>}}