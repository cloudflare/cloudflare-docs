---
pcx_content_type: concept
title: Dedicated egress IPs
layout: single
weight: 1
---

# Dedicated egress IPs

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

Dedicated egress IPs are static IP addresses that can be used to allowlist traffic from your organization. These IPs are unique to your account and are not used by any other customers routing traffic through Cloudflare’s network. Each dedicated egress IP consists of an IPv4 address and an IPv6 range that are assigned to a specific Cloudflare data center. At minimum, Cloudflare will provision your account with two dedicated egress IPs corresponding to data centers in two different cities. An account can have any number of additional dedicated egress IPs.

## Enable egress IPs

To start routing traffic through dedicated egress IPs:

1. Contact your account team to obtain a dedicated egress IP.
2. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Network**.
3. Enable **Proxy** for TCP.
4. (Optional) Select **UDP**. This will allow HTTP/3 traffic to egress with your dedicated IPs.

Dedicated egress IPs are now enabled for all network and HTTP traffic proxied by Gateway. To selectively enable dedicated egress IPs for a subset of your traffic, refer to [egress policies](/cloudflare-one/policies/gateway/egress-policies/).

## Verify egress IPs

To check if your device is using the correct dedicated egress IP:

1. Verify that the device is connected to your Zero Trust organization through the WARP client.
2. Determine the source IPv4 address of your device by going to `https://ipv4.icanhazip.com/`.
3. Determine the source IPv6 address of your device by going to `https://ipv6.icanhazip.com/`.
4. Verify that the source IPv4 and IPv6 addresses match your dedicated egress IP.

When testing against another origin, you may see either an IPv4 or IPv6 address. Gateway has no control over whether connections are made over IPv4 or IPv6. Some origins are only available over IPv4, while others are only available over IPv6. When both protocols are supported, the decision is made by the operating system and browser on the client device. For example, Windows will by default [favor IPv6](https://docs.microsoft.com/en-us/troubleshoot/windows-server/networking/configure-ipv6-in-windows) over IPv4.

## Limitations

- [DNS queries and tunnel-backed origins](#unsupported-traffic) do not use dedicated egress IPs.
- [IP geolocation](#ip-geolocation) may take up to four weeks to update.
- [Physical egress location](#egress-location) varies depending on whether the connection is over IPv4 or IPv6.

### Unsupported traffic

Dedicated egress IPs do not apply to:

- DNS queries resolved through Gateway
- Zero Trust networks connected via Cloudflare Tunnel or Magic WAN

These origins will see the default shared IPs instead of the dedicated egress IPs. This is because Cloudflare can filter traffic to these origins by identifiers other than source IP.

### IP geolocation

Your egress traffic will geolocate to the city selected in your [egress policies](/cloudflare-one/policies/gateway/egress-policies/). If the traffic does not match an egress policy, IP geolocation defaults to the closest dedicated egress location to the user.

When you enable dedicated egress IPs, Gateway updates the [MaxMind GeoIP2 database](https://www.maxmind.com/en/geoip2-services-and-databases). Other websites such as Google will check the MaxMind database to geolocate a user's source IP. This process can take anywhere from one week to up to four weeks. For example, if your users are in India, they would get a U.S. Google landing page instead of the Indian Google landing page until Google picks up the updated IP geolocation.

#### Verify IP geolocation

To verify that the IP geolocation has updated on MaxMind, go to [MaxMind GeoIP](https://www.maxmind.com/en/geoip2-precision-demo) and enter your dedicated egress IP.

### Egress location

| Destination IP | Destination proxied by Cloudflare | Physical egress location                      | IP geolocation              |
| -------------- | --------------------------------- | --------------------------------------------- | --------------------------- |
| IPv4           | No                                | Egresses data center with dedicated egress IP | Matches dedicated egress IP |
| IPv4           | Yes                               | Egresses locally connected data center        | Matches dedicated egress IP |
| IPv6           | No                                | Egresses locally connected data center        | Matches dedicated egress IP |
| IPv6           | Yes                               | Egresses locally connected data center        | Matches dedicated egress IP |

#### IPv4

To physically egress from a specific location, traffic must be proxied to Cloudflare via IPv4. The end user connects to the nearest Cloudflare data center, but Cloudflare will internally route their traffic to egress from the dedicated location configured in your [egress policies](/cloudflare-one/policies/gateway/egress-policies/). Therefore, the connected data center shown in the user's WARP client preferences may not match their actual egress location.

We are able to offer better IPv4 performance when users visit domains proxied by Cloudflare (also known as an [orange-clouded](/dns/manage-dns-records/reference/proxied-dns-records/) domain). In this scenario, IPv4 traffic will physically egress from the most performant data center in our network while still appearing to egress from your dedicated location.

For example, assume you have a primary dedicated egress IP in Los Angeles and a secondary dedicated egress IP in New York. A user in Las Vegas would see Las Vegas as their connected data center. If they go to a grey-clouded site such as `espn.com`, they will egress from Los Angeles (or whichever city is in the matching egress policy). If they go to an orange-clouded site such as `cloudflare.com`, they will physically egress from Las Vegas but use Los Angeles as their IP geolocation.

#### IPv6

Traffic proxied via IPv6, unlike IPv4, will physically egress from the connected data center but logically egress with one of your dedicated IP geolocations. In the example above, the Las Vegas user would egress from Las Vegas but IP geolocate from Los Angeles.
