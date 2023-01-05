---
pcx_content_type: how-to
title: Split Tunnels
weight: 6
---

# Configure Split Tunnels

Split Tunnels mode can be configured to exclude or include IP addresses or domains from going through WARP. This feature is commonly used to run WARP alongside a VPN (in Exclude mode) or to provide access to a specific Tunnel (in Include mode).

{{<Aside type="warning">}}

Split Tunnel configuration only impacts the flow of IP traffic. DNS requests are still resolved by Gateway and subject to DNS policies unless you add the domains to your [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/exclude-traffic/local-domains/) configuration.

{{</Aside>}}

You can add or remove items from the Split Tunnels list at any time, but note that changes made to your Split Tunnel configuration are immediately propagated to clients. Because this setting controls what Gateway has visibility on at the network level, please review and test all changes immediately after making every change.

Also, changing between Include and Exclude modes will immediately delete your existing Split Tunnel configuration. Be sure to make a copy of any IP addresses or domains in your existing configuration, as they will be reverted to the default upon switching modes.

## Set up Split Tunnels

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com/), go to **Settings** > **WARP Client**.

2. Under **Device settings**, locate the [device profile](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) you would like to view or modify and select **Configure**.

3. Under **Split Tunnels**, choose a Split Tunnel mode:

    - **(default) Exclude IPs and domains** — All traffic will be sent to Cloudflare Gateway except for the IPs and domains you specify.
    - **Include IPs and Domains** — Only traffic destined to the IP address or domains you specify will be sent to Cloudflare Gateway. All other traffic will bypass Gateway and will no longer be filtered by your network or HTTP policies.

4. If you want to add or remove items from your Split Tunnels configuration, select **Manage**.

On this page, you will find a list of the IPs and domains Cloudflare Zero Trust excludes or includes, depending on the mode you have selected.

## Add an IP address

1. [Navigate](#set-up-split-tunnels) to the **Split Tunnels** page.
2. In the **Selector** dropdown, select _IP Address_.
3. Enter the IP address or CIDR you want to exclude or include.
4. Enter an optional description and then select **Save destination**.

The IP address will appear in the list of Split Tunnel entries. Traffic to these IP addresses will be excluded or included from WARP.

## Add a domain

1. [Navigate](#set-up-split-tunnels) to the **Split Tunnels** page.
2. In the **Selector** dropdown, select _Domain_.
3. Enter a [valid domain](#valid-domains) to exclude or include.
4. Enter an optional description and then select **Save destination**.
5. (Optional) If your domain does not have a public DNS record, create a [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/exclude-traffic/local-domains/) entry to allow a private DNS server to handle domain resolution.

When a user navigates to the domain, the domain gets resolved according to your Local Domain Fallback configuration (either by Gateway or by your private DNS server). WARP Split Tunnels will then dynamically include or exclude the IP address returned in the DNS lookup.

### Consequences of adding a domain

Domain-based split tunneling has a few ramifications you should be aware of before deploying in your organization:

- Routes excluded or included from WARP and Gateway visibility may change day to day, and may be different for each user depending on where they are.
- You may inadvertently exclude or include additional hostnames that happen to share an IP address. This commonly occurs if you exclude or include a domain hosted by a CDN, such as Cloudflare. If other domains resolve to that same IP, those domains will be excluded or included as well.
- Most services are a collection of hostnames. Until Split Tunnels mode supports [App Types](/cloudflare-one/policies/filtering/application-app-types/), you will need to ensure you add all domains used by a particular app or service.
- WARP must handle the DNS lookup request for the domain. If a DNS result has been previously cached by the operating system or otherwise intercepted (for example, via your browser's secure DNS settings), the IP address will not be dynamically added to your Split Tunnel.

### Valid domains

{{<table-wrap>}}
| Split tunnel domain | Matches        | Does not match |
| ------------------- | -------------- | --------------- |
| `example.com`       | exact match of `example.com` | subdomains such as `www.example.com` |
| `example.example.com` | exact match of `example.example.com` | `example.com` or subdomains such as `www.example.example.com` |
| `*.example.com`    | subdomains such as `www.example.com` | `example.com` |
{{</table-wrap>}}

### Cloudflare Zero Trust domains

Many Cloudflare Zero Trust services rely on traffic going through WARP, such as [device posture checks](/cloudflare-one/identity/devices/) and [WARP sesssion durations](/cloudflare-one/policies/filtering/enforce-sessions/). If you are using Split Tunnels in Include mode, you will need to manually add the following domains in order for these features to function:

- The IdP used to authenticate to Cloudflare Zero Trust
- `<your-team-name>.cloudflareaccess.com`
- The application protected by the Access or Gateway policy

## Remove an item from Split Tunnels

1. [Navigate](#set-up-split-tunnels) to the Split Tunnels page.
2. Find the IP address or hostname in the list and select **Delete**.

{{<Aside type="note">}}

If you need to revert to the default Split Tunnels entries, delete all entries from the list. Once the list is empty, the page will re-populate with the default values.

{{</Aside>}}

## Important platform differences

Domain-based Split Tunnels work differently on mobile clients than on desktop clients. If both mobile and desktop clients will connect to your organization, it is recommended to use Split Tunnels based on IP addresses or CIDR, which work the same across all platforms.

### Windows, Linux and macOS behavior

Clients on these platforms work by dynamically inserting the IP address of the domain immediately after it is resolved into the routing table for split tunneling. This allows the desktop clients to support wildcard domain prefixes (for example, `*.example.com`), not just a singular domain (like `example.com` or `www.example.com`).

### iOS, Android and ChromeOS behavior

Due to platform differences, mobile clients can only apply Split Tunnels rules when the tunnel is initially started. This means:

- Domain-based Split Tunnels rules are created when the tunnel is established based on the IP address for that domain at that time. The route is refreshed each time the tunnel is established.

- Wildcard domain prefixes (for example, `*.example.com`) are supported only if they have valid wildcard DNS records. Other wildcard domains are not supported because the client is unable to match wildcard domains to hostnames when starting up the tunnel. Unsupported wildcard domain prefixes can still exist in your configuration, but they will be ignored on mobile platforms.