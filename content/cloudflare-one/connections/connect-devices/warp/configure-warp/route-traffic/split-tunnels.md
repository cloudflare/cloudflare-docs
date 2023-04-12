---
pcx_content_type: how-to
title: Split Tunnels
weight: 6
---

# Configure Split Tunnels

Split Tunnels can be configured to exclude or include IP addresses or domains from going through WARP. This feature is commonly used to run WARP alongside a VPN (in Exclude mode) or to provide access to a specific private network (in Include mode).

{{<Aside type="warning">}}

Split Tunnels only impacts the flow of IP traffic. DNS requests are still resolved by Gateway and subject to DNS policies unless you add the domains to your [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) configuration.

{{</Aside>}}

Changes made to your Split Tunnel configuration are immediately propagated to clients. Because Split Tunnels controls what Gateway has visibility on at the network level, we recommend testing all changes before rolling out updates to end users.

## Change Split Tunnels mode

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **WARP Client**.

2. Under **Device settings**, locate the [device profile](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) you would like to modify and select **Configure**.

3. Scroll down to **Split Tunnels**.

3. (Optional) To view your existing Split Tunnel configuration, select **Manage**. You will see a list of the IPs and domains Cloudflare Zero Trust excludes or includes, depending on the mode you have selected. We recommend making a copy of your Split Tunnel entries, as they will revert to the default upon switching modes.

4. Under **Split Tunnels**, choose a mode:

   - **Exclude IPs and domains** — (Default) All traffic will be sent to Cloudflare Gateway except for the IPs and domains you specify.
   - **Include IPs and Domains** — Only traffic destined to the IPs or domains you specify will be sent to Cloudflare Gateway. All other traffic will bypass Gateway and will no longer be filtered by your network or HTTP policies. In order to use certain features, you will need to manually add [Zero Trust domains](#cloudflare-zero-trust-domains).

All clients with this device profile will now switch to the new mode and its default route configuration. Next, [add](#add-a-route) or [remove](#remove-a-route) routes from your Split Tunnel configuration.

## Add a route

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

When a user navigates to the domain, the domain gets resolved according to your Local Domain Fallback configuration (either by Gateway or by your private DNS server). WARP Split Tunnels will then dynamically include or exclude the IP address returned in the DNS lookup.

{{</tab>}}
{{</tabs>}}

You can add up to 1000 combined Split Tunnel and [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) entries to a given device profile.

We recommend keeping the Split Tunnels list short, as each entry takes time for the client to parse. In particular, domains are slower to action than IP addresses because they require on-the-fly IP lookups and routing table / local firewall changes. A shorter list will also make it easier to understand and debug your configuration.

### When to use Split Tunnels

Use Split Tunnels when you need to bypass Gateway entirely for a site. Common scenarios include:

- Connect to a third-party application which requires the actual IP address of the end-user device (for example, [Office 365](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#directly-route-office-365-traffic)).
- Optimize voice and video.
- Connect to a [third-party VPN](/cloudflare-one/connections/connect-devices/warp/deployment/vpn/) endpoint.

### When not to use Split Tunnels

Do not exclude a site from Split Tunnels if you want to see the traffic in your Gateway logs. In particular, we do not recommend using Split Tunnels to:

- Solve connectivity issues with a specific website. For configuration guidance, refer to our [troubleshooting guide](/cloudflare-one/connections/connect-devices/warp/troubleshooting/common-issues/#cannot-connect-to-a-specific-app-or-website).
- Solve performance issues with a specific website. Since Cloudflare operates within 50 milliseconds of 95% of the Internet-connected population, it is usually faster to send traffic through us. If you are encountering a performance-related issue, it is best to first explore your Gateway policies or reach out to Support.

## Cloudflare Zero Trust domains

Many Cloudflare Zero Trust services rely on traffic going through WARP, such as [device posture checks](/cloudflare-one/identity/devices/) and [WARP sesssion durations](/cloudflare-one/policies/filtering/enforce-sessions/). If you are using Split Tunnels in Include mode, you will need to manually add the following domains in order for these features to function:

- The IdP used to authenticate to Cloudflare Zero Trust
- `<your-team-name>.cloudflareaccess.com`
- The application protected by the Access or Gateway policy
- `edge.browser.run` if using [Browser Isolation](/cloudflare-one/policies/browser-isolation/)

## Domain-based Split Tunnels

Domain-based split tunneling has a few ramifications you should be aware of before deploying in your organization:.

- Routes excluded or included from WARP and Gateway visibility may change day to day, and may be different for each user depending on where they are.
- You may inadvertently exclude or include additional hostnames that happen to share an IP address. This commonly occurs if you add a domain hosted by a CDN or large Internet provider such as Cloudflare, AWS, or Azure. For example, if you wanted to exclude a VPN hosted on AWS, do not add `*.amazonaws.com` as that will open up your devices to all traffic on AWS. Instead, add the specific VPN endpoint (`*.cvpn-endpoint-<UUID>.prod.clientvpn.us-west-2.amazonaws.com`).
- Most services are a collection of hostnames. Until Split Tunnels mode supports [App Types](/cloudflare-one/policies/filtering/application-app-types/), you will need to manually add all domains used by a particular app or service.
- WARP must handle the DNS lookup request for the domain. If a DNS result has been previously cached by the operating system or otherwise intercepted (for example, via your browser's secure DNS settings), the IP address will not be dynamically added to your Split Tunnel.

### Valid domains

{{<table-wrap>}}
| Split tunnel domain | Matches | Does not match |
| ------------------- | -------------- | --------------- |
| `example.com` | exact match of `example.com` | subdomains such as `www.example.com` |
| `example.example.com` | exact match of `example.example.com` | `example.com` or subdomains such as `www.example.example.com` |
| `*.example.com` | subdomains such as `www.example.com` and `sub2.sub1.example.com` | `example.com` |
{{</table-wrap>}}

### Platform differences

Domain-based Split Tunnels work differently on mobile clients than on desktop clients. If both mobile and desktop clients will connect to your organization, it is recommended to use Split Tunnels based on IP addresses or CIDR, which work the same across all platforms.

#### Windows, Linux and macOS

Clients on these platforms work by dynamically inserting the IP address of the domain immediately after it is resolved into the routing table for split tunneling. This allows the desktop clients to support wildcard domain prefixes (for example, `*.example.com`), not just a singular domain (like `example.com` or `www.example.com`).

#### iOS, Android and ChromeOS

Due to platform differences, mobile clients can only apply Split Tunnels rules when the tunnel is initially started. This means:

- Domain-based Split Tunnels rules are created when the tunnel is established based on the IP address for that domain at that time. The route is refreshed each time the tunnel is established.

- Wildcard domain prefixes (for example, `*.example.com`) are supported only if they have valid wildcard DNS records. Other wildcard domains are not supported because the client is unable to match wildcard domains to hostnames when starting up the tunnel. Unsupported wildcard domain prefixes can still exist in your configuration, but they will be ignored on mobile platforms.

## Remove a route

{{<Aside type="warning">}}
Removing default Split Tunnel entries may cause users to lose Internet connectivity or block their access to local resources.
{{</Aside>}}

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **WARP Client**.

2. Under **Device settings**, locate the [device profile](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) you would like to modify and select **Configure**.

3. Under **Split Tunnels**. select **Manage**.

4. Find the IP address or hostname in the list and select **Delete**.

If you need to revert to the default Split Tunnels entries, select **Restore default entries**.
