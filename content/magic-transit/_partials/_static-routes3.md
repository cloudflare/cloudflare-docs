---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: createPath;;tunnelEndpoints
---

## Scoped routes for Anycast GRE or IPsec tunnels

To reduce latency for your Anycast GRE or IPsec tunnel configurations, especially if you operate your own Anycast network, Cloudflare can steer your traffic by scoping it to specific Cloudflare data center regions. Equal cost routes maintain an equal cost on a global scale so long as the routes are not scoped to specific regions. For example, if you use region-scoped routes, traffic from end users in New York will always land at their Ashburn network unless that tunnel is unhealthy.

When you scope static routes to specific regions, the routes will only exist in the specified regions, and traffic that lands outside the specified regions will not have anywhere to go.

To configure scoping for your traffic, you must provide static routes to Cloudflare with Anycast GRE or IPsec tunnel data such that all Cloudflare regions have a route for your prefixes.

{{<Aside type="note">}}Regions and regional objects are automatically updated. If you route traffic through specific data centers, you will need to manually update your rules when Cloudflare adds or removes data centers.{{</Aside>}}

### Scoping configuration data example

Prefix          | NextHop      | Priority | Region code
---             | ---          | ---      | ---
`10.10.10.100/24` | `TUNNEL_1_IAD` | `100`      | _AFR_
`10.10.10.100/24` | `TUNNEL_2_IAD` | `100`      | _EEUR_
`10.10.10.100/24` | `TUNNEL_3_ATL` | `100`      | _ENAM_
`10.10.10.100/24` | `TUNNEL_4_ATL` | `100`      | _ME_

**Region codes and associated regions**

Cloudflare has nine geographic regions across the world which are listed below.

Region code | Region
---         | ---
_AFR_         | Africa
_APAC_        | Asia Pacific
_EEUR_        | Eastern Europe
_ENAM_        | Eastern North America
_ME_          | Middle East
_OC_          | Oceania
_SAM_         | South America
_WEUR_        | Western Europe
_WNAM_        | Western North America

Configure scoping for your traffic in the **Region code** section when adding or editing a static route. Refer to [Create a static route](#create-a-static-route) and [Edit a static route](#edit-a-static-route) more information.

## ​​Create a static route

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Go to $1.
3. Go to **Static Routes** > **Create** to add a new route.
4. Enter a descriptive name for your route in **Description**.
5. In **Prefix**, enter your range of IP addresses. For example, `10.10.10.100/24`.
6. In **Tunnel/Next hop** select which tunnel you want your route to go through. Choose from the tunnels you have created in [Configure tunnel endpoints]($2).
7. Choose the **Priority** for your route. Lower numbers have higher priorities.
8. (Optional) Choose a **Weight** for your route. Refer to [Edge routing configuration example](#edge-routing-configuration-example) for examples.
9. (Optional) If you need to scope your route to a specific region, you can do it in **Region code**.
10. (Optional) We highly recommend testing your route before adding it by selecting **Test routes**.
11. Select **Add routes** when you are done.

## ​​Edit a static route

1. In **Static routes**, select **Edit** next to the route you want to modify.
2. Enter the updated route information.
3. (Optional) We highly recommend testing your route before adding it by selecting **Test routes**.
4. Select **Edit routes** to save the new information when you are done.

## ​​Delete static route

1. In **Static routes**, locate the static route you want to modify and select **Delete**.
2. Confirm the action by selecting the checkbox and select **Delete**.