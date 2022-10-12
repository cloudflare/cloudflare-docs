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

## Verify egress IPs

To check if your device is using the dedicated egress IPs:

1. Confirm with your account team that dedicated egress IPs are enabled on your account.
2. In **Settings** > **Network**, verify that **Proxy** is enabled for both TCP and UDP.
3. Verify that the device is connected to your Zero Trust organization through the WARP client.
4. Determine the source IPv4 address of your device by going to `https://ipv4.icanhazip.com/`.
5. Determine the source IPv6 address of your device by going to `https://ipv6.icanhazip.com/`.
6. Verify that the source IPv4 and IPv6 addresses match your dedicated egress IPs.

When testing against another origin, you may see either an IPv4 or IPv6 address. Gateway has no control over whether connections are made over IPv4 or IPv6. Some origins are only available over IPv4, while others are only available over IPv6. When both protocols are supported, the decision is made by the operating system and browser on the client device. For example, Windows will by default [favor IPv6](https://docs.microsoft.com/en-us/troubleshoot/windows-server/networking/configure-ipv6-in-windows) over IPv4.

## Egress behavior

Each dedicated egress IP is associated with a specific Cloudflare data center. At minimum, you will be assigned two dedicated egress IPs corresponding to data centers in two different cities. You can buy any number of additional dedicated egress IPs and specify their locations at the time of purchase.

### IP geolocation

Your egress traffic will share the same IP geolocations as your dedicated egress IP data centers. If you have multiple dedicated egress IPs, Cloudflare will automatically connect your users to the most performant data center (usually the closest one). Their source IP will match the dedicated egress IP of the assigned data center.

{{<Aside type="note">}}
It can take anywhere from one week to up to four weeks for websites to recognize the updated IP geolocation. For example, if your users are in India, they would get a U.S. Google landing page instead of the Indian Google landing page until Google picks up the updated IP geolocation.
{{</Aside>}}

### Egress location

If you want your traffic to physically egress from a specific location, you must connect using IPv4 instead of IPv6. Each dedicated IPv4 address is assigned to a single data center, so IPv4 traffic will egress from one of your dedicated locations. Unlike IPv4, your IPv6 range is split across all data centers in our global network. IPv6 traffic is not guaranteed to physically egress from your dedicated locations — only IP geolocation is supported.

We are able to offer better IPv4 performance when users visit domains proxied by Cloudflare (also known as an [orange-clouded](https://community.cloudflare.com/t/step-3-enabling-the-orange-cloud/52715) domain). In this scenario, IPv4 traffic will physically egress from the most performant data center in our network while still appearing to egress from one of your dedicated locations.

For example, assume you have a primary dedicated egress IP in Los Angeles and a secondary dedicated egress IP in New York. When a user in Las Vegas navigates to an orange-clouded site such as `cloudflare.com`, they will connect to our Las Vegas data center but appear to egress from Los Angeles. If they navigate to a grey-clouded site such as `espn.com`, they will connect to and egress from Los Angeles.
