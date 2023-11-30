---
_build:
  publishResources: false
  render: never
  list: never
---

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **WARP Client**.

2. Under **Device settings**, locate the [device profile](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) you would like to modify and select **Configure**.

3. Under **Split Tunnels**, check whether your [Split Tunnels mode](#change-split-tunnels-mode) is set to **Exclude** or **Include**.

4. Select **Manage**.

5. You can exclude or include routes based on either their IP address or domain. When possible we recommend adding an IP address instead of a domain. To learn about the consequences of adding a domain, refer to [Domain-based Split Tunnels](#domain-based-split-tunnels).

{{<tabs labels="Add an IP | Add a domain">}}
{{<tab label="add an ip" no-code="true">}}

To add an IP address to Split Tunnels:

1. Select _IP Address_.
2. Enter the IP address or CIDR you want to exclude or include.
3. Select **Save destination**.

Traffic to this IP address is now excluded or included from the WARP tunnel.

{{</tab>}}
{{<tab label="add a domain" no-code="true">}}

To add a domain to Split Tunnels:

1. Select _Domain_.
2. Enter a [valid domain](#valid-domains) to exclude or include.
3. Select **Save destination**.
4. (Optional) If your domain does not have a public DNS record, create a [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) entry to allow a private DNS server to handle domain resolution.

When a user goes to the domain, the domain gets resolved according to your Local Domain Fallback configuration (either by Gateway or by your private DNS server). WARP Split Tunnels will then dynamically include or exclude the IP address returned in the DNS lookup.

{{</tab>}}
{{</tabs>}}

You can add up to 1000 combined Split Tunnel and [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) entries to a given device profile.

We recommend keeping the Split Tunnels list short, as each entry takes time for the client to parse. In particular, domains are slower to action than IP addresses because they require on-the-fly IP lookups and routing table / local firewall changes. A shorter list will also make it easier to understand and debug your configuration.
