---
pcx_content_type: get-started
title: Overview
weight: 5
---

# TURN Service

Separately from the SFU, Calls offers a managed TURN service. TURN acts as a relay point for traffic between WebRTC clients like the browser and SFUs, particularly in scenarios where direct communication is obstructed by NATs or firewalls. TURN maintains an allocation of public IP addresses and ports for each session, ensuring connectivity even in restrictive network environments.

Using Cloudflare Calls TURN service is available free of charge when used together with the Calls SFU. Otherwise, it costs $0.05/real-time GB outbound from Cloudflare to the TURN client.

## Service address and ports

| Protocol      | Primary address     | Primary port | Alternate port |
| ------------- | ------------------- | ------------ | -------------- |
| STUN over UDP | stun.cloudflare.com | 3478/udp     | 53/udp         |
| TURN over UDP | turn.cloudflare.com | 3478/udp     | 53 udp         |
| TURN over TCP | turn.cloudflare.com | 3478/tcp     | 80/tcp         |
| TURN over TLS | turn.cloudflare.com | 5349/tcp     | 443/tcp        |

## Regions

Calls TURN service is available in every Cloudflare datacenter.

When a client tries to connect to `turn.cloudflare.com`, it _automatically_ connects to the Cloudflare location closest to them. We achieve this using anycast routing.

To learn more about the architecture that makes this possible, read this [technical deep-dive about Calls](https://blog.cloudflare.com/cloudflare-calls-anycast-webrtc).

## Protocols and Ciphers for TURN over TLS

TLS versions supported include TLS 1.1, TLS 1.2, and TLS 1.3.

| OpenSSL Name                  | TLS 1.1 | TLS 1.2 | TLS 1.3 |
| ----------------------------- | ------- | ------- | ------- |
| AEAD-AES128-GCM-SHA256        | No      | No      | ✅      |
| AEAD-AES256-GCM-SHA384        | No      | No      | ✅      |
| AEAD-CHACHA20-POLY1305-SHA256 | No      | No      | ✅      |
| ECDHE-ECDSA-AES128-GCM-SHA256 | No      | ✅      | No      |
| ECDHE-RSA-AES128-GCM-SHA256   | No      | ✅      | No      |
| ECDHE-RSA-AES128-SHA          | ✅      | ✅      | No      |
| AES128-GCM-SHA256             | No      | ✅      | No      |
| AES128-SHA                    | ✅      | ✅      | No      |
| AES256-SHA                    | ✅      | ✅      | No      |

## MTU

There is no specific MTU limit for Cloudflare Calls TURN service.

## Limits

Cloudflare Calls TURN service places limits on:

- Unique IP address you can communicate with per relay allocation (>5 new IP/sec)
- Packet rate outbound and inbound to the relay allocation (>5-10 kpps)
- Data rate outbound and inbound to the relay allocation (>50-100 Mbps)

These limits are suitable for high-demand applications and also have burst rates higher than those documented above. Hitting these limits will result in packet drops.