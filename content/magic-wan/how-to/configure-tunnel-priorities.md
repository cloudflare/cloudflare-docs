---
title: Create static routes
pcx-content-type: how-to
weight: 0
meta:
  title: Assign tunnel route priorities
---

# Assign tunnel route priorities

Magic WAN uses a static configuration to route your traffic through [Generic Routing Encapsulation (GRE) tunnels](/magic-transit/about/tunnels-and-encapsulation) from Cloudflare’s edge to your locations

You must assign a route priority to each Anycast GRE or IPsec tunnel–subnet pair in your GRE configuration, as follows:

- Lower values have greater priority.
- When the priority values for prefix entries match—as illustrated by the 103.21.244.0/24 subnet in the example routing configuration (in boldface)—Cloudflare uses equal-cost multi-path (ECMP) packet forwarding to route traffic.

For more on how Cloudflare uses ECMP packet forwarding, see [Traffic steering](/magic-transit/about/traffic-steering).

For an example edge routing configuration, refer to this table:

<table>
  <thead>
    <tr>
      <th>
        <strong>Anycast GRE or IPsec tunnel</strong>
      </th>
      <th>
        <strong>Subnet</strong>
      </th>
      <th>
        <strong>Priority</strong>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GRE_1_IAD</td>
      <td>
        <strong>103.21.244.0/24</strong>
      </td>
      <td>100</td>
    </tr>
    <tr>
      <td>GRE_2_IAD</td>
      <td>
        <strong>103.21.244.0/24</strong>
      </td>
      <td>100</td>
    </tr>
    <tr>
      <td>GRE_3_ATL</td>
      <td>
        <strong>103.21.244.0/24</strong>
      </td>
      <td>100</td>
    </tr>
    <tr>
      <td>GRE_4_ATL</td>
      <td>
        <strong>103.21.244.0/24</strong>
      </td>
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

## Static routes

Magic WAN uses the static routes you provide to route traffic through Anycast tunnels. A route with a lower **Priority** value is used as the preferred route, and routes with the same priority value use equal-cost multi-path (ECMP) packet forwarding to route traffic.

You can also create and edit static routes using [Magic Transit Static Routes API](https://api.cloudflare.com/#magic-transit-static-routes-properties).

### Create a static route

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic Transit**.
2.  Next to **Static routes configuration**, click **Configure**.
3.  On the **Static Routes** page, click **Create** to add a new route.
4.  Enter the information for your route.
5.  _(Optional)_ We highly recommend testing your route before adding it by clicking **Test routes**.
6.  If your test was successful, click **Add routes** when you are done.

### Edit a static route

1.  After navigating to the **Static routes configuration** page, click **Edit** next to the route you want to modify.
2.  Enter the updated route information and click **Edit routes** when you are done.