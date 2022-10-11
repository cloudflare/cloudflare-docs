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

1. In **Settings** > **Network**, verify that **Proxy** is enabled for both TCP and UDP.
2. Verify that the device is connected to your Zero Trust organization through the WARP client.
3. Determine the source IPv4 address of your device by going to `https://ipv4.icanhazip.com/`.
4. Determine the source IPv6 address of your device by going to `https://ipv6.icanhazip.com/`.
5. Verify that the source IPv4 and IPv6 addresses match your dedicated egress IPs.

When testing against another origin, you may see either an IPv4 or IPv6 address. Gateway has no control over whether connections are made over IPv4 or IPv6. Some origins are only available over IPv4, while others are only available over IPv6. When both protocols are supported, the decision is made by the operating system and browser on the client device. For example, Windows will by default [favor IPv6](https://docs.microsoft.com/en-us/troubleshoot/windows-server/networking/configure-ipv6-in-windows) over IPv4.

## Egress behavior

Each dedicated egress IP is associated with a specific Cloudflare data center, which you can request at the time of purchase. For redundancy, you will be assigned a minimum of two dedicated egress IPs corresponding to two different data centers. Your egress traffic will share the same IP geolocation as the closest assigned data center.

{{<Aside type="note">}}
It can take anywhere from one week to up to four weeks for websites to recognize the updated IP geolocation. For example, if your users are in India, they would get a U.S. Google landing page instead of the Indian Google landing page until Google picks up the updated IP geolocation.
{{</Aside>}}

### Domains proxied by Cloudflare

When a user navigates to a domain proxied by Cloudflare (also known as an [orange-clouded](https://community.cloudflare.com/t/step-3-enabling-the-orange-cloud/52715) domain), their request egresses from the closest Cloudflare data center. For optimal performance, egress is not restricted to the data centers assigned to your account. However, the user's source IP will still match the dedicated egress IP of the closest assigned data center.

For example, assume you have purchased a primary dedicated egress IP in Los Angeles and a secondary dedicated egress IP in New York. When a user in Las Vegas navigates to `cloudflare.com`, they will egress from the Las Vegas data center but use Los Angeles as their source IP.

### Domains not proxied by Cloudflare

If the destination domain is not proxied by Cloudflare (grey-clouded), egress behavior depends on the connection protocol.

#### IPv4

When a user navigates to a grey-clouded domain over IPv4, Cloudflare first connects them to the closest data center in our network. We then route their request to the closest dedicated egress IP data center. If the Las Vegas user in the example above visits `espn.com`, their traffic would egress from Los Angeles and use the Los Angeles source IP.

{{<Aside type="note">}}
IPv4 UDP connections to grey-clouded sites may experience increased latency. This is because Cloudflare wraps UDP packets in TCP when forwarding traffic between data centers.
{{</Aside>}}

#### IPv6

Gateway splits the assigned IPv6 range between all Cloudflare data centers, unlike IPv4 which is restricted to a single data center per IPv4 address. This means that when a user navigates to a grey-clouded domain over IPv6, their request can egress directly from the closest Cloudflare data center. The user's source IP will still match one of your dedicated egress IPs.
