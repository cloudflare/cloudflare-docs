---
pcx_content_type: concept
title: Dedicated egress IPs
weight: 1
---

# Dedicated egress IPs

{{<Aside type="note">}}
Only available as an add-on to Zero Trust Enterprise plans.
{{</Aside>}}

Dedicated egress IPs are static IP addresses that can be used to allowlist traffic from your organization. These IPs are unique to your account and are not used by any other customers routing traffic through Cloudflare’s network. Each dedicated egress IP consists of an IPv4 address and an IPv6 range that are assigned to a specific Cloudflare data center. At minimum, Cloudflare will provision your account with two dedicated egress IPs corresponding to data centers in two different cities.

An account can have any number of additional dedicated egress IPs. To request additional dedicated egress IPs, contact your account team to schedule a service window.

## Turn on egress IPs

To start routing traffic through dedicated egress IPs:

1. Contact your account team to obtain a dedicated egress IP.
2. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Network**.
3. Turn on **Proxy** for TCP.
4. (Optional) Select **UDP**. This will allow HTTP/3 traffic to egress with your dedicated IPs.

Dedicated egress IPs are now turned on for all network and HTTP traffic proxied by Gateway. To selectively turn on dedicated egress IPs for a subset of your traffic, refer to [egress policies](/cloudflare-one/policies/gateway/egress-policies/).

## Verify egress IPs

To check if your device is using the correct dedicated egress IP:

1. Verify that the device is connected to your Zero Trust organization through the WARP client.
2. Determine the source IPv4 address of your device by going to `https://ipv4.icanhazip.com/`.
3. Determine the source IPv6 address of your device by going to `https://ipv6.icanhazip.com/`.
4. Verify that the source IPv4 and IPv6 addresses match your dedicated egress IP.

When testing against another origin, you may see either an IPv4 or IPv6 address. Gateway has no control over whether connections are made over IPv4 or IPv6. Some origins are only available over IPv4, while others are only available over IPv6. When both protocols are supported, the decision is made by the operating system and browser on the client device. For example, Windows will by default [favor IPv6](https://docs.microsoft.com/en-us/troubleshoot/windows-server/networking/configure-ipv6-in-windows) over IPv4.

## Limitations

### Concurrent connections

Each dedicated egress IP assigned to your organization supports 40,000 concurrent connections per origin. You can configure multiple origins for each combination of dedicated egress IP and source port.

### Unsupported traffic

Dedicated egress IPs do not apply to:

- DNS queries resolved through Gateway
- Zero Trust networks connected via Cloudflare Tunnel or Magic WAN
- ICMP traffic (such as `ping`)

These origins will see the default shared IPs instead of the dedicated egress IPs. This is because Cloudflare can filter traffic to these origins by identifiers other than source IP.

### Traffic resilience

To improve traffic resilience, assign your dedicated egress IPs to different Cloudflare data center locations. If you have multiple IPs in the same city, choose different data centers within that city. For more information, contact your account team.

When creating egress policies with dedicated egress IPs, set your secondary IPv4 address to either _Default Cloudflare egress_ or a Cloudflare location different from your primary IPv4 address. If the physical location of your primary IPv4 address is not available, traffic will be routed to either the location closest to the user (_Default Cloudflare egress_ option) or another location of your choice.

### IP geolocation

{{<Aside type="note">}}
IP geolocation will take at least six weeks to update.
{{</Aside>}}

Your egress traffic will geolocate to the city selected in your [egress policies](/cloudflare-one/policies/gateway/egress-policies/). If the traffic does not match an egress policy, IP geolocation defaults to the closest dedicated egress location to the user.

When you turn on dedicated egress IPs, Gateway updates the [MaxMind GeoIP2 database](https://www.maxmind.com/en/geoip2-services-and-databases). Other websites, such as Google Search, will check the MaxMind database to geolocate a user's source IP. For example, if your users are in India, Google will direct them to the United States Google landing page instead of the India landing page until Google recognizes the updated IP geolocation.

We recommend you create a [catch-all egress policy](/cloudflare-one/policies/gateway/egress-policies/#catch-all-policy) before dedicated egress IPs are assigned to your account. This will prevent incorrect geolocation for your users' traffic while geolocation databases update.

#### Verify IP geolocation

To verify that the IP geolocation has updated on MaxMind, go to [MaxMind GeoIP](https://www.maxmind.com/en/geoip2-precision-demo) and enter your dedicated egress IP.

### Egress location

Your users' physical egress location will vary depending on whether their connection is over IPv4 or IPv6.

| Destination IP | Destination proxied by Cloudflare | Physical egress location                      |
| -------------- | --------------------------------- | --------------------------------------------- |
| IPv4           | No                                | Egresses data center with dedicated egress IP |
| IPv4           | Yes                               | Egresses locally connected data center        |
| IPv6           | No                                | Egresses locally connected data center        |
| IPv6           | Yes                               | Egresses locally connected data center        |

Regardless of egress location, the IP geolocation will match the assigned dedicated egress IP.

#### IPv4

To physically egress from a specific location, traffic must be proxied to Cloudflare via IPv4. The end user connects to the nearest Cloudflare data center, but Cloudflare will internally route their traffic to egress from the dedicated location configured in your [egress policies](/cloudflare-one/policies/gateway/egress-policies/). Therefore, the connected data center shown in the user's WARP client preferences may not match their actual egress location.

We are able to offer better IPv4 performance when users visit domains proxied by Cloudflare (also known as an [orange-clouded](/dns/manage-dns-records/reference/proxied-dns-records/#proxied-records) domain). In this scenario, IPv4 traffic will physically egress from the most performant data center in our network while still appearing to egress from your dedicated location.

For example, assume you have a primary dedicated egress IP in Los Angeles and a secondary dedicated egress IP in New York. A user in Las Vegas would see Las Vegas as their connected data center. If they go to a site not proxied by Cloudflare ([gray-clouded](/dns/manage-dns-records/reference/proxied-dns-records/#dns-only-records)), such as `espn.com`, they will egress from Los Angeles (or whichever city is in the matching egress policy). If they go to an orange-clouded site such as `cloudflare.com`, they will physically egress from Las Vegas but use Los Angeles as their IP geolocation.

#### IPv6

Traffic proxied via IPv6, unlike IPv4, will physically egress from the connected data center but logically egress with one of your dedicated IP geolocations. In the example above, the Las Vegas user would egress from Las Vegas but IP geolocate from Los Angeles.

## Frequently asked questions (FAQ)

### Can I provision the same egress IP address to multiple data centers?

No, egress IPs are limited to a single data center.

### Can my users in different locations egress from their closest data center via a single egress IP?

No, traffic will only egress from the data center where the egress IP is provisioned. If you have users in locations far apart, we recommend reserving multiple egress IPs across different data centers and provisioning your users to their closest data centers.

### Can I use dedicated egress IPs with traffic proxied via [PAC files](/cloudflare-one/connections/connect-devices/agentless/pac-files/)?

Yes, your users will egress via their provisioned IP address.

### What happens when I use dedicated egress IPs with [Cloudflare Browser Isolation](/cloudflare-one/policies/browser-isolation/)?

Your users will connect to the nearest data center, where the remote browser session will load. The remote browser will then egress via the data center with their provisioned egress IP.

### Do dedicated egress IPs work on the [Cloudflare China Network](/china-network/)?

No, Gateway does not support dedicated egress IPs on the China Network.
