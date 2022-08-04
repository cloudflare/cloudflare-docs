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

All traffic proxied by Gateway will route via these dedicated egress IPs.

## IP geolocation

Each dedicated egress IP is associated with a Cloudflare data center, and your egress traffic will share the same IP geolocation as the data center. When you purchase a dedicated egress IP, you can request a specific city to egress from. If you have multiple egress IPs, your end users will be automatically routed to the closest one.

It can take anywhere from one week to up to four weeks for websites to recognize the updated IP geolocation. For example, if your users are in India, they would get a U.S. Google landing page instead of the Indian Google landing page until Google picks up the updated IP geolocation.

## TCP/UDP support

At this time, only TCP traffic can be proxied through dedicated egress IPs. UDP traffic will egress from the default shared IP ranges instead of your dedicated IPs.

Google Chrome by default uses the UDP-based QUIC protocol to connect to websites. In order to route traffic from Chrome through your dedicated egress IPs, you must [disable QUIC in Google Chrome](/cloudflare-one/policies/filtering/http-policies/incompatible-traffic/#disable-quic-in-google-chrome).  This forces the browser to connect using TCP instead of UDP.
