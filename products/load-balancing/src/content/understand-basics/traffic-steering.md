---
order: 12
---

# Traffic steering

## Overview

Load Balancing provides several traffic steering modes, which allow customers to optimize how load balancers route traffic.

Configure traffic steering from the Load Balancing dashboard — in either the **Create a Load Balancer** wizard or the **Edit Load Balancer** panel — or via the Cloudflare API. Available steering options include standard failover (**Off**), Dynamic steering, Geo steering, and Random.

---

## Off - Standard failover

Standard failover directs traffic from unhealthy pools to the next healthy pool in the configuration.

Standard failover uses the pool order to determine failover priority (the failover order).

If all pools are marked unhealthy, Load Balancing will direct traffic to the fallback pool. The default fallback pool is the last pool listed in the Load Balancing configuration.

To specify a fallback pool via the API, use the Update Load Balancers command and set the `fallback_pool` parameter. See _[Load Balancers](/understand-basics/load-balancers/)_ for details.

If no monitors are attached to the load balancer, it will direct traffic to the primary pool exclusively.

---

## Dynamic Steering

Dynamic Steering uses health check data to identify the fastest pool for a given Cloudflare Region or data center.

Dynamic Steering creates Round Trip Time (RTT) profiles based on an exponential weighted moving average (EWMA) of RTT to determine the fastest pool. If there is no current RTT data for your pool in a region or colocation center, Cloudflare directs traffic to the pools in failover order.

When enabling Dynamic Steering the first time for a server pool, allow 10 minutes for the change to take effect while Cloudflare builds an RTT profile for that pool.

For TCP health checks, calculated latency may not reflect the true latency to the origin if you are terminating TCP at a cloud provider edge location.

The diagram below shows how Cloudflare would route traffic to the pool with the lowest EWMA among three regions: Eastern North America, Europe, and Australia. In this case, the ENAM pool is selected, because it has the lowest RTT.

![](../static/images/traffic-steering-2.png)

---

## Geo Steering

Geo Steering directs traffic to pools to a specific geographical region or — for Enterprise customers only — data center. This option is extremely useful when you want site visitors to access the origin server closest to them, which improves page-loading performance.

You can assign multiple pools to the same region and the load balancer will use them in failover order. If there is no configuration for a region or pool, the load balancer will use the default failover order.

Cloudflare has 13 geographic regions that span the world. The region of a client is determined by the region of the Cloudflare data center that answers the client’s DNS query. These regions are listed below, along with their region codes.

<table>
  <thead>
  <tr>
   <th>Region Code
   </th>
   <th>Region
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td><strong>WNAM</strong>
   </td>
   <td>Western North America
   </td>
  </tr>
  <tr>
   <td><strong>ENAM</strong>
   </td>
   <td>Eastern North America
   </td>
  </tr>
  <tr>
   <td><strong>WEU</strong>
   </td>
   <td>Western Europe
   </td>
  </tr>
  <tr>
   <td><strong>EEU</strong>
   </td>
   <td>Eastern Europe
   </td>
  </tr>
  <tr>
   <td><strong>NSAM</strong>
   </td>
   <td>Northern South America
   </td>
  </tr>
  <tr>
   <td><strong>SSAM</strong>
   </td>
   <td>Southern South America
   </td>
  </tr>
  <tr>
   <td><strong>OC</strong>
   </td>
   <td>Oceania
   </td>
  </tr>
  <tr>
   <td><strong>ME</strong>
   </td>
   <td>Middle East
   </td>
  </tr>
  <tr>
   <td><strong>NAF</strong>
   </td>
   <td>Northern Africa
   </td>
  </tr>
  <tr>
   <td><strong>SAF</strong>
   </td>
   <td>Southern Africa
   </td>
  </tr>
  <tr>
   <td><strong>SAS</strong>
   </td>
   <td>Southern Asia
   </td>
  </tr>
  <tr>
   <td><strong>SEAS</strong>
   </td>
   <td>Southeast Asia
   </td>
  </tr>
  <tr>
   <td><strong>NEAS</strong>
   </td>
   <td>Northeast Asia
   </td>
  </tr>
  </tbody>
</table>
