---
title: Map routes for prefixes smaller than /24
alwaysopen: true
order: 3
hidden: false
---

## Map route prefixes smaller than /24

In order for Cloudflare to route your traffic from the edge to your data center(s) via GRE tunnels, you must provide your prefixes and the tunnels to which they should be mapped, similar to the example in the table below.

<table>
 <thead>
  <tr>
   <th>Prefix</th>
   <th>GRE Tunnel</th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td>103.21.244.0/29</td>
   <td>GRE_1_IAD</td>
  </tr>
  <tr>
   <td>103.21.244.8/29
   </td>
   <td>GRE_2_ATL
   </td>
  </tr>
</tbody>
</table>

The minimum advertising prefix is /24. However, since we use GRE tunnels as an outer wrapper for your traffic, we can route prefixes within that /24 to different tunnel end points.

For example, you can send `x.x.x.0/29` to Datacenter 1 and `x.x.x.8/29` to Datacenter 2. This is helpful when you operate in an environment with constrained IP resources.
