---
pcx_content_type: concept
title: Dedicated egress IPs
layout: single
weight: 12
---

# Dedicated egress IPs

{{<Aside type="note">}}
Dedicated egress IPs are only available on Enterprise plans.
{{</Aside>}}

When your users connect to the Internet through Cloudflare Gateway, by default their traffic is assigned a source IP address that is shared across all Cloudflare WARP users. Enterprise customers can purchase dedicated egress IPs to ensure that egress traffic from your organization is assigned a unique, static IP. These source IPs are dedicated to your account and can be used within allowlists on upstream services.

The dedicated egress IPs apply to all network and HTTP traffic proxied by Gateway.

They do not apply to DNS queries resolved through Gateway, nor do they apply to origins connected with Cloudflare Tunnel or Magic WAN. These origins will see the default shared IPs instead of the dedicated egress IPs.

## Enable egress IPs

Once you have received dedicated egress IPs for your account, enable the feature in the Zero Trust dashboard:

1. Go to **Settings** > **Network**.
2. Enable **Proxy** for TCP.
3. (Optional) Select **UDP**. This will allow HTTP/3 traffic to egress with your dedicated IPs.

## Verify egress IPs

To check if your device is using the dedicated egress IPs:

1. Verify that the device is connected to your Zero Trust organization through the WARP client.
2. Determine the source IPv4 address of your device by going to `https://ipv4.icanhazip.com/`.
3. Determine the source IPv6 address of your device by going to `https://ipv6.icanhazip.com/`.
4. Verify that the source IPv4 and IPv6 addresses match your dedicated egress IPs.

When testing against another origin, you may see either an IPv4 or IPv6 address. Gateway has no control over whether connections are made over IPv4 or IPv6. Some origins are only available over IPv4, while others are only available over IPv6. When both protocols are supported, the decision is made by the operating system and browser on the client device. For example, Windows will by default [favor IPv6](https://docs.microsoft.com/en-us/troubleshoot/windows-server/networking/configure-ipv6-in-windows) over IPv4.

## Egress behavior

Each dedicated egress IP is associated with a specific Cloudflare data center. At minimum, Cloudflare will provision your account with two dedicated egress IPs corresponding to data centers in two different cities. An account can have any number of additional dedicated egress IPs.

### IP geolocation

Your egress traffic will share the same IP geolocations as your dedicated egress IP data centers. If you have multiple dedicated egress IPs, traffic will egress with the IP geolocation of the most performant data center (usually the closest one to the user).

{{<Aside type="note">}}
It can take anywhere from one week to up to four weeks for websites to recognize the updated IP geolocation. For example, if your users are in India, they would get a U.S. Google landing page instead of the Indian Google landing page until Google picks up the updated IP geolocation.
{{</Aside>}}

### Egress location

#### IPv4

To physically egress from a specific location, traffic must be proxied to Cloudflare via IPv4. The end user connects to the nearest Cloudflare data center, but Cloudflare will internally route their traffic to egress from one of your dedicated locations. Therefore, the connected data center shown in the user's WARP client preferences may not match their actual egress location.

We are able to offer better IPv4 performance when users visit domains proxied by Cloudflare (also known as an [orange-clouded](https://community.cloudflare.com/t/step-3-enabling-the-orange-cloud/52715) domain). In this scenario, IPv4 traffic will physically egress from the most performant data center in our network while still appearing to egress from one of your dedicated locations.

For example, assume you have a primary dedicated egress IP in Los Angeles and a secondary dedicated egress IP in New York. A user in Las Vegas would see Las Vegas as their connected data center. If they navigate to a grey-clouded site such as `espn.com`, they will egress from Los Angeles. If they navigate to an orange-clouded site such as `cloudflare.com`, they will egress from Las Vegas but appear to egress from Los Angeles.

#### IPv6

Traffic proxied via IPv6, unlike IPv4, will physically egress from the connected data center but logically egress with one of your dedicated IP geolocations. In the example above, the Las Vegas user would egress from Las Vegas but appear to egress from Los Angeles.
