---
pcx-content-type: concept
title: Load balancers
weight: 3
---

# Load balancers

{{<render file="_load-balancer-definition.md">}}

{{<Aside type="note">}}

For more background information on what load balancers are and how they work, check out our <a href="https://www.cloudflare.com/learning/performance/what-is-load-balancing/">Learning Center</a>.

{{</Aside>}}

***

## Common configurations

For suggestions, refer to [Common load balancer configurations](/load-balancing/reference/common-configurations/).

## Load balancing and existing DNS records

For details about DNS records, refer to [DNS records for load balancing](/load-balancing/reference/dns-records/).

## HTTP keep-alive (persistent HTTP connection)

Cloudflare maintains keep-alive connections to improve performance and reduce cost of recurring TCP connects in the request transaction as Cloudflare proxies customer traffic from its edge network to the site's origin.

Ensure HTTP Keep-Alive connections are enabled on your origin. Cloudflare reuses open TCP connections for up to 15 minutes (900 seconds) after the last HTTP request. Origin web servers close TCP connections if too many are open. HTTP Keep-Alive helps avoid premature reset of connections for requests proxied by Cloudflare.

### Session cookies

**When using HTTP cookies to track and bind user sessions to a specific server**, configure [Session Affinity](/load-balancing/session-affinity/) to parse HTTP requests by cookie header. Doing so directs each request to the correct application server even when HTTP requests share the same TCP connection due to keep-alive.

**For example, F5 BIG-IP load balancers set a session cookie at the beginning of a TCP connection** (if none exists) and then ignore all cookies from subsequent HTTP requests on the same TCP connection. This tends to break session affinity because Cloudflare sends multiple HTTP sessions on the same TCP connection. Configuring the load balancer to parse HTTP requests by cookie headers avoids this issue.

***

## Create load balancers

For step-by-step guidance, refer to [Create a load balancer](/load-balancing/how-to/create-load-balancer/).

***

## Properties

For an up-to-date list of load balancer properties, refer to [Load balancer properties](https://api.cloudflare.com/#load-balancers-properties) in the Cloudflare API documentation.

***

## API commands

The Cloudflare API supports the following commands for load balancers.

{{<table-wrap>}}

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
   <td>{{<code>}}GET{{</code>}}
   </td>
   <td>{{<code>}}/zones/:zone_id/load_balancers{{</code>}}
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancers-delete-load-balancer">Delete Load Balancer</a>
   </td>
   <td>{{<code>}}DELETE{{</code>}}
   </td>
   <td>{{<code>}}/zones/:zone_id/load_balancers/:id{{</code>}}
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancers-list-load-balancers">List Load Balancers</a>
   </td>
   <td>{{<code>}}GET{{</code>}}
   </td>
   <td>{{<code>}}/zones/:zone_id/load_balancers{{</code>}}
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancers-load-balancer-details">Load Balancer Details</a>
   </td>
   <td>{{<code>}}POST{{</code>}}
   </td>
   <td>{{<code>}}/zones/:zone_id/load_balancers/:id{{</code>}}
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancers-patch-load-balancer">Overwrite specific properties</a>
   </td>
   <td>{{<code>}}PATCH{{</code>}}
   </td>
   <td>{{<code>}}/zones/:zone_id/load_balancers/:id{{</code>}}
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancers-update-load-balancer">Overwrite entire Load Balancer</a>
   </td>
   <td>{{<code>}}PUT{{</code>}}
   </td>
   <td>{{<code>}}/zones/:zone_id/load_balancers/:id{{</code>}}
   </td>
  </tr>
  </tbody>
</table>

{{</table-wrap>}}
