---
order: 11
pcx-content-type: concept
---

# Load balancers

## Overview

A Cloudflare load balancer is identified by the DNS hostname whose traffic you want to balance (www.example.com, for example). The load balancer defines which origin server pools to use, the order in which they should be used, and how to geographically distribute traffic among pools.

<Aside type="note">

For more background information on what load balancers are and how they work, check out our <a href="https://www.cloudflare.com/learning/performance/what-is-load-balancing/">Learning Center</a>.

</Aside>

---

## Common configurations

### Active - Passive Failover

An **active-passive failover** sends traffic to the servers in your active pool until a failure threshold (configurable) is reached. At the point of failure, your load balancer then re-directs traffic to the passive pool.

This setup ensures uninterrupted service and helps with planned outtages, but it might lead to slower traffic overall.

To set up a load balancer with **active-passive failover**:
1. Create a load balancer with two origin pools (`primary` and `secondary`).
1. In the list of origin pools, set the following order:
    1. `primary`
    1. `secondary`

With this setup, your load balancer will direct all traffic to `primary` until `primary` has fewer available origins than specified in its **Health Threshold**. Only then will your load balancer direct traffic to `secondary`.

In the event that all pools are marked down, Cloudflare uses the **fallback pool**, which is the option of last resort for successfully sending traffic to an origin. Since the fallback pool is a last resort, its health is not taken into account, and Cloudflare reports  its status as **No Health**. You can select the fallback pool via the API or in the Cloudflare dashboard. For more on working with fallback pools, see [_Traffic steering_](/understand-basics/traffic-steering).

### Active - Active Failover

An **active-active failover** distributes traffic to servers in the same pool until the pool reaches its failure threshold (configurable). At the point of failure, your load balancer would then re-direct traffic to the **fallback pool**.

This setup speeds up overall requests, but is more vulnerable to planned or unplanned outtages.

To set up a load balancer with **active-active failover**:
1. Create a load balancer with a single origin pool (`primary`) with multiple origins (`origin-1` and `origin-2`).
1. For equal traffic, choose the same **Weight** for each origin. For guidance on other configurations, see [Weighted load balancers](../weighted-load-balancing).

With this setup, your load balancer will direct all traffic to `primary`, which then directs traffic to `origin-1` and `origin-2` according to their respective weights. If enough origins become so unhealthy that `primary` falls below its **Health Threshold**, traffic would then go to the **fallback pool**.

<Aside type='note'>

For more background reading on server failover and common configurations, see our <a href="https://www.cloudflare.com/learning/performance/what-is-server-failover/">Learning Center</a>.

</Aside>

## Important notes

### Load balancing and existing DNS records

**Adding a Load Balancer does not create a DNS record or SSL certificate.**  To generate an SSL certificate, create a proxied DNS record for the Load Balancer. The Load Balancer record takes precedence over a DNS record for the same host name.

**When you create a load balancer on Cloudflare**, you can either:

- Use a unique hostname with no existing DNS record, or
- Use a hostname that has an existing DNS record, either as an A, AAAA, or CNAME record.

**If a chosen hostname has an existing DNS record**, the load balancer will supersede the DNS record if the DNS record is an A, AAAA, or canonical name (CNAME) record. It will not supersede other record types.

**If the load balancer is disabled**, preexisting DNS records will be served.

**If there is no preexisting DNS record with the same name**, disabling the load balancer will prevent clients from resolving the host, and requests will fail.

**If a Load Balancer is manually disabled**, traffic is not served to the associated origins or the fallback. If all pools in a Load Balancer are manually disabled or unhealthy, traffic goes to the fallback pool. No health checks run on the fallback pool and it will return the same HTTP status as your origin.

If the pool serving as your fallback pool is also disabled:
- If Cloudflare proxies your hostname, you will see a 530 HTTP/1016 Origin DNS failure.
- If Cloudflare does not proxy your hostname, you will see the SOA record.

## HTTP keep-alive (persistent HTTP connection)

Cloudflare maintains keep-alive connections to improve performance and reduce cost of recurring TCP connects in the request transaction as Cloudflare proxies customer traffic from its edge network to the site's origin.

Ensure HTTP Keep-Alive connections are enabled on your origin. Cloudflare reuses open TCP connections for up to 15 minutes (900 seconds) after the last HTTP request. Origin web servers close TCP connections if too many are open. HTTP Keep-Alive helps avoid premature reset of connections for requests proxied by Cloudflare.

### Session cookies

**When using HTTP cookies to track and bind user sessions to a specific server**, configure [Session Affinity](../session-affinity) to parse HTTP requests by cookie header. Doing so directs each request to the correct application server even when HTTP requests share the same TCP connection due to keep-alive.

**For example, F5 BIG-IP load balancers set a session cookie at the beginning of a TCP connection** (if none exists) and then ignore all cookies from subsequent HTTP requests on the same TCP connection. This tends to break session affinity because Cloudflare sends multiple HTTP sessions on the same TCP connection. Configuring the load balancer to parse HTTP requests by cookie headers avoids this issue.

### Railgun (wide area network optimization)

**Railgun is a web proxy system built for Cloudflare**, that allows dynamic content for a website to be cached while also allowing changes to the site to take effect almost instantly. Railgun is currently available to customers with a Business or Enterprise plan, or via one of Cloudflare’s Optimised Partners.

**Railgun compresses web objects, even rapidly changing pages like news sites or personalized content**. Using Railgun in conjunction with Cloudflare Load Balancing speeds up connections between Cloudflare datacenters and DNS origin servers so that uncacheable requests have minimal latency.

**Set up a Railgun listener in front of the load balancer** so that the load balancer can handle HTTP connections normally. Load balancing long-lived TLS connections between the sender and listener is very difficult.

**Use the same load balancer settings as if Railgun were not in place** — for example, HTTP keep-alive connections should be enabled and set to a 90-second timeout, since Railgun is working as an HTTP reverse proxy.

**If Railgun is placed behind the load balancer**, observe the following guidelines to avoid interruptions with site traffic:

1. Use the `railgun-nat.conf` configuration file to set the **internal** addresses of the hosts Railgun will be optimizing (`localhost:8080`, for example). This is important to avoid looping the request outbound to the internet and back to the load balancer only to be forwarded to the origin.
1. Ensure no firewall rules are in place that will interfere with traffic between the listener and the origin server.
1. Ensure port 2408 is open and passed through the load balancer so that it does not interfere with the TLS connection between the listener and sender.

For additional guidance and diagrams, see [Best practices for Railgun with a Load Balancer](https://support.cloudflare.com/hc/articles/200168346).

---

## Properties

For a list of available load balancer properties, see our [API docs](https://api.cloudflare.com/#load-balancers-properties).

---

## Managing load balancers via the Cloudflare API

### Endpoint

The endpoint for managing load balancers is

```txt
zones/:identifier/load_balancers
```

### Commands

The Cloudflare API supports the following commands for load balancers. (Examples are given for the user-level endpoint but apply to the account-level endpoint as well.) For detailed instruction, see _[Cloudflare API v4: Load Balancers](https://api.cloudflare.com/#load-balancers-properties)_.

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
   <td>Create Load Balancer
   </td>
   <td><Code>GET</Code>
   </td>
   <td><Code>/zones/:identifier/load_balancers</Code>
   </td>
  </tr>
  <tr>
   <td>Delete Load Balancer
   </td>
   <td><Code>DELETE</Code>
   </td>
   <td><Code>/zones/:identifier/load_balancers/:identifier</Code>
   </td>
  </tr>
  <tr>
   <td>List Load Balancers
   </td>
   <td><Code>GET</Code>
   </td>
   <td><Code>/zones/:identifier/load_balancers</Code>
   </td>
  </tr>
  <tr>
   <td>Load Balancer Details
   </td>
   <td><Code>POST</Code>
   </td>
   <td><Code>/zones/:identifier/load_balancers/:identifier</Code>
   </td>
  </tr>
  <tr>
   <td>Update Load Balancer
   </td>
   <td><Code>PUT</Code>
   </td>
   <td><Code>/zones/:identifier/load_balancers/:identifier</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>
