---
order:
pcx-content-type: how-to
---

import StaticRoutesApi from "../../_partials/_static-routes-api.md"

# Assign tunnel route priorities

Magic Transit uses a static configuration to route your traffic through [Generic Routing Encapsulation (GRE) tunnels](/about/tunnels-and-encapsulation) from Cloudflare’s edge to your data centers.

You must assign a route priority to each GRE tunnel–subnet pair in your GRE configuration using the following guidelines:

- Lower values have greater priority.
- When the priority values for prefix entries match, Cloudflare uses equal-cost multi-path (ECMP) packet forwarding to route traffic. You can refer to an example of this scenario with the **103.21.244.0/24** subnet in the edge routing configuration example below.

<details>
<summary>
    Edge routing configuration example
</summary>
<div>
<table>
  <thead>
    <tr>
      <th><strong>GRE tunnel</strong></th>
      <th><strong>Subnet</strong></th>
      <th><strong>Priority</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GRE_1_IAD</td>
      <td><strong>103.21.244.0/24</strong></td>
      <td>100</td>
    </tr>
    <tr>
      <td>GRE_2_IAD</td>
      <td><strong>103.21.244.0/24</strong></td>
      <td>100</td>
    </tr>
    <tr>
      <td>GRE_3_ATL</td>
      <td><strong>103.21.244.0/24</strong></td>
      <td>100</td>
    </tr>
    <tr>
      <td>GRE_4_ATL</td>
      <td><strong>103.21.244.0/24</strong></td>
      <td>100</td>
    </tr>
    <tr>
      <td>GRE_1_IAD</td>
      <td>103.21.245.0/24</td>
      <td>200</td>
    </tr>
    <tr>
      <td>GRE_2_IAD</td>
      <td>103.21.245.0/24</td>
      <td>200</td>
    </tr>
    <tr>
      <td>GRE_3_ATL</td>
      <td>103.21.245.0/24</td>
      <td>100</td>
    </tr>
    <tr>
      <td>GRE_4_ATL</td>
      <td>103.21.245.0/24</td>
      <td>100</td>
    </tr>
  </tbody>
</table>
</div>
</details>

For more on how Cloudflare uses ECMP packet forwarding, refer to [Traffic steering](/about/traffic-steering).

## Create and edit static routes

<StaticRoutesApi/>
