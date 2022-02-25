---
order:
pcx-content-type: how-to
---

# Assign tunnel routes

Magic Transit uses a static configuration to route your traffic through [Generic Routing Encapsulation (GRE) tunnels](/about/tunnels-and-encapsulation) from Cloudflare’s edge to your data centers.

You must assign a route priority to each GRE tunnel–subnet pair in your GRE configuration using the following guidelines:

*   Lower values have greater priority.
*   When the priority values for prefix entries match, Cloudflare uses equal-cost multi-path (ECMP) packet forwarding to route traffic. You can refer to an example of this scenario with the **103.21.244.0/24** subnet in the edge routing configuration example below.

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

## Map route prefixes smaller than /24

You must provide your prefixes and the tunnels they should be mapped to in order for Cloudflare to route your traffic from the edge to your data centers via GRE tunnels. Use the table below as reference.

| Prefix          | GRE Tunnel |
| --------------- | ---------- |
| 103.21.244.0/29 | GRE\_1\_IAD  |
| 103.21.244.8/29 | GRE\_2\_ATL  |

The minimum advertising prefix is /24, but because Cloudflare uses GRE tunnels as an outer wrapper for your traffic, we can route prefixes within that /24 to different tunnel end points.

For example, you can send `x.x.x.0/29` to Datacenter 1 and `x.x.x.8/29` to Datacenter 2. This is helpful when you operate in an environment with constrained IP resources.

## Static routes

Magic Transit uses the static routes you provide to route traffic through GRE tunnels. A route with a lower **Priority** value is used as the preferred route, and routes with the same priority value use equal-cost multi-path (ECMP) packet forwarding to route traffic.

You can also create and edit static routes using [Magic Transit Static Routes API](https://api.cloudflare.com/#magic-transit-static-routes-properties).

### Create a static route

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic Transit**.
2.  Next to **Static routes configuration**, click **Configure**.
3.  On the **Static Routes** page, click **Create** to add a new route.
4.  Enter the information for your route.
5.  While optional, we highly recommend testing your route before adding it by clicking **Test routes**.
6.  If your test was successful, click **Add routes** when you are done.

### Edit a static route

1.  After navigating to the **Static routes configuration** page, click **Edit** next to the route you want to modify.
2.  Enter the updated route information and click **Edit routes** when you are done.

## Scoped routes for GRE tunnels

To reduce latency for your GRE tunnel configurations, especially if you operate your own Anycast network, Cloudflare can steer your traffic by scoping it to specific Cloudflare data center regions. Valid Cloudflare regions include AFR, APAC, EEUR, ENAM, ME, OC, SAM, WEUR, and WNAM.

To configure scoping for your traffic, you must provide Cloudflare with GRE tunnel data for each Cloudflare region.

<details>
<summary>
  Scoping configuration data example
</summary>
<div>
<table>
 <thead>
  <tr>
   <th>GRE tunnel</th>
   <th>Region code</th>
   </tr>
  </thead>
  <tbody>
  <tr>
     <td>GRE_1_IAD</td>
     <td>AFR</td>
  </tr>
  <tr>
    <td>GRE_2_IAD</td>
    <td>EEUR</td>
  </tr>
  <tr>
    <td>GRE_3_ATL</td>
    <td>ENAM</td>
  </tr>
  <tr>
    <td>GRE_4_ATL</td>
    <td>ME</td>
    </tr>
</tbody>
</table>
</div>
</details>

Cloudflare has nine geographic regions across the world which are listed below.

<details>
<summary>
  Region codes and associated regions
</summary>
<div>
<table>
  <thead>
    <tr>
      <th>Region code</th>
      <th>Region</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>AFR</td>
    <td>Africa
    </td>
    </tr>
    <tr>
    <td>APAC</td>
    <td>Asia Pacific
    </td>
    </tr>
    <tr>
    <td>EEUR</td>
    <td>Eastern Europe
    </td>
    </tr>
    <tr>
    <td>ENAM</td>
    <td>Eastern North America
    </td>
    </tr>
    <tr>
    <td>ME</td>
    <td>Middle East
    </td>
    </tr>
    <tr>
    <td>OC</td>
    <td>Oceania
    </td>
    </tr>
    <tr>
    <td>SAM</td>
    <td>South America
    </td>
    </tr>
    <tr>
    <td>WEUR</td>
    <td>Western Europe
    </td>
    </tr>
    <tr>
    <td>WNAM</td>
    <td>Western North America
    </td>
    </tr>
  </tbody>
</table>
</div>
</details>
