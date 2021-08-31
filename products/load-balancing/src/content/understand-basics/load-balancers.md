---
order: 2
pcx-content-type: concept
---

import LBDefinition from "../_partials/_load-balancer-definition.md"

# Load balancers

<LBDefinition/>

<Aside type="note">

For more background information on what load balancers are and how they work, check out our <a href="https://www.cloudflare.com/learning/performance/what-is-load-balancing/">Learning Center</a>.

</Aside>

---

## Common configurations

### Active - Passive Failover

An **active-passive failover** sends traffic to the servers in your active pool until a failure threshold (configurable) is reached. At the point of failure, your load balancer then redirects traffic to the passive pool.

This setup ensures uninterrupted service and helps with planned outtages, but it might lead to slower traffic overall.

To set up a load balancer with **active-passive failover**:
1. Create a load balancer with two origin pools (`primary` and `secondary`).
1. In the list of origin pools, set the following order:
    1. `primary`
    1. `secondary`
1. For **Traffic Steering**, select [**Off**](/understand-basics/traffic-steering#off---standard-failover).

With this setup, your load balancer will direct all traffic to `primary` until `primary` has fewer available origins than specified in its **Health Threshold**. Only then will your load balancer direct traffic to `secondary`.

In the event that all pools are marked down, Cloudflare uses the **fallback pool**, which is the option of last resort for successfully sending traffic to an origin. Since the fallback pool is a last resort, its health is not taken into account, and Cloudflare reports  its status as **No Health**. You can select the fallback pool via the API or in the Cloudflare dashboard. For more on working with fallback pools, see [_Traffic steering_](/understand-basics/traffic-steering).

### Active - Active Failover

An **active-active failover** distributes traffic to servers in the same pool until the pool reaches its failure threshold (configurable). At the point of failure, your load balancer would then re-direct traffic to the **fallback pool**.

This setup speeds up overall requests, but is more vulnerable to planned or unplanned outtages.

To set up a load balancer with **active-active failover**, either:
- Create a load balancer with a single origin pool (`primary`) with multiple origins (`origin-1` and `origin-2`) and set the same [**Weight**](/understand-basics/weighted-load-balancing) for each origin.
- Create a load balancer with two origin pools (`primary` and `secondary`) and — for [**Traffic Steering**](/understand-basics/traffic-steering) — select any option except for **Off**. 

<Aside type='note'>

For more background reading on server failover and common configurations, see our <a href="https://www.cloudflare.com/learning/performance/what-is-server-failover/">Learning Center</a>.

</Aside>

## Load balancing and existing DNS records

For details about DNS records, refer to [DNS records for load balancing](/reference/dns-records).

## HTTP keep-alive (persistent HTTP connection)

Cloudflare maintains keep-alive connections to improve performance and reduce cost of recurring TCP connects in the request transaction as Cloudflare proxies customer traffic from its edge network to the site's origin.

Ensure HTTP Keep-Alive connections are enabled on your origin. Cloudflare reuses open TCP connections for up to 15 minutes (900 seconds) after the last HTTP request. Origin web servers close TCP connections if too many are open. HTTP Keep-Alive helps avoid premature reset of connections for requests proxied by Cloudflare.

### Session cookies

**When using HTTP cookies to track and bind user sessions to a specific server**, configure [Session Affinity](../session-affinity) to parse HTTP requests by cookie header. Doing so directs each request to the correct application server even when HTTP requests share the same TCP connection due to keep-alive.

**For example, F5 BIG-IP load balancers set a session cookie at the beginning of a TCP connection** (if none exists) and then ignore all cookies from subsequent HTTP requests on the same TCP connection. This tends to break session affinity because Cloudflare sends multiple HTTP sessions on the same TCP connection. Configuring the load balancer to parse HTTP requests by cookie headers avoids this issue.

---

## Create load balancers

For step-by-step guidance, refer to [Create a load balancer](/how-to/create-load-balancer).

---

## Properties

For an up-to-date list of load balancer properties, refer to [Load balancer properties](https://api.cloudflare.com/#load-balancers-properties) in the Cloudflare API documentation.

---

## API commands

The Cloudflare API supports the following commands for load balancers.

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Command</strong>
   </th>
   <th><strong>Method</strong>
   </th>
   <th><strong>Endpoint</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancers-create-load-balancer">Create Load Balancer</a>
   </td>
   <td><Code>GET</Code>
   </td>
   <td><Code>/zones/:identifier/load_balancers</Code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancers-delete-load-balancer">Delete Load Balancer</a>
   </td>
   <td><Code>DELETE</Code>
   </td>
   <td><Code>/zones/:identifier/load_balancers/:identifier</Code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancers-list-load-balancers">List Load Balancers</a>
   </td>
   <td><Code>GET</Code>
   </td>
   <td><Code>/zones/:identifier/load_balancers</Code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancers-load-balancer-details">Load Balancer Details</a>
   </td>
   <td><Code>POST</Code>
   </td>
   <td><Code>/zones/:identifier/load_balancers/:identifier</Code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancers-update-load-balancer">Update Load Balancer</a>
   </td>
   <td><Code>PUT</Code>
   </td>
   <td><Code>/zones/:identifier/load_balancers/:identifier</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>
