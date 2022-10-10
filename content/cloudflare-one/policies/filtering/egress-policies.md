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

The dedicated egress IPs apply to all network and HTTP traffic proxied by Gateway. They do not apply to DNS queries resolved through Gateway.

Origins connected with Cloudflare Tunnel or Cloudflare Magic WAN will see the default shared IPs instead of the dedicated egress IPs.  This is because all traffic through these connections are already filtered by Gateway and do not need a source IP identifier.

## Verify source IP

To check if your proxied traffic is using the dedicated egress IPs:

1. In **Settings** > **Network**, verify that **Proxy** is enabled for both TCP and UDP.
2. Determine your source IPv4 address:
    ```sh
    $ curl -4 https://ifconfig.me
    ```
3. Determine your source IPv6 address:
    ```sh
    $ curl -6 https://ifconfig.me
    ```
    -------note: this didn't work ------------

4. Go to an IP checking website such as [whatismyip.com](https://www.whatismyip.com/).
5. Verify that the public IPv4 and IPv6 addresses match your assigned egress IPs.

When testing against another origin, you may see either an IPv4 or IPv6 address.  Gateway has no control over whether connections are made over IPv4 or IPv6. Some origins are only available over IPv4, while others are only available over IPv6. When both protocols are supported, the decision is made by the operating system and browser on the client device. For example, Windows will by default [favor IPv6](https://docs.microsoft.com/en-us/troubleshoot/windows-server/networking/configure-ipv6-in-windows) over IPv4.

## IP geolocation

Each dedicated egress IP is associated with a Cloudflare data center, and your egress traffic will share the same IP geolocation as the data center. When you purchase a dedicated egress IP, you can request a specific city to egress from. If you have multiple egress IPs, your end users will be automatically routed to the closest one.

It can take anywhere from one week to up to four weeks for websites to recognize the updated IP geolocation. For example, if your users are in India, they would get a U.S. Google landing page instead of the Indian Google landing page until Google picks up the updated IP geolocation.

## Egress behavior
