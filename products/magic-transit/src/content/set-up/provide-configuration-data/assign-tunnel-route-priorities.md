---
order: 2
---

# Assign tunnel route priorities

Magic Transit uses a static configuration to route your traffic through [Generic Routing Encapsulation (GRE) tunnels](/about/tunnels-and-encapsulation) from Cloudflare’s edge to your data center(s).

You must assign a route priority to each GRE tunnel–subnet pair in your GRE configuration, as follows:

- Lower values have greater priority.
- When the priority values for prefix entries match—as illustrated by the 103.21.244.0/24 subnet in the example routing configuration (in boldface)—Cloudflare uses equal-cost multi-path (ECMP) packet forwarding to route traffic.

For more on how Cloudflare uses ECMP packet forwarding, see [_Traffic steering_](/about/traffic-steering).

For an example edge routing configuration, refer to this table:

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
