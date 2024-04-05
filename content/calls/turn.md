---
pcx_content_type: get-started
title: TURN Service
weight: 10
---

# TURN Service

Separately from the SFU, Calls also offers a managed TURN service. TURN acts as relay points for traffic between WebRTC clients like the browser and SFUs, particularly in scenarios where direct communication is obstructed by NATs or firewalls. TURN maintains an allocation of public IP addresses and ports for each session, ensuring connectivity even in restrictive network environments.

Using Cloudflare Calls TURN service is available free of charge when used together with the Calls SFU. Otherwise, it costs $0.05/real-time GB outbound from Cloudflare to the TURN client.

{{<Aside type="warning">}}
Calls TURN service is in open beta, rolling out between April 4 and 24, 2024 in batches. If you're an enterprise customer, please reach out to your account team requesting access.
{{</Aside>}}

## Service address and ports

|    Protocol   |           Primary address          | Primary port |  Alternate port |
|---------------|------------------------------------|--------------|-----------------|
| STUN over UDP | stun.cloudflare.com                | 3478/udp     | 53/udp          |
| TURN over UDP | turn.cloudflare.com                | 3478/udp     | 53 udp          |
| TURN over TCP | turn.cloudflare.com                | 3478/tcp     | 80/tcp          |
| TURN over TLS | turn.cloudflare.com                | 5349/tcp     | 443/tcp         |

## Regions

Calls TURN service is available in every Cloudflare datacenter. 

When a client tries to connect to turn.cloudflare.com, it *automatically* connects to the Cloudflare location closest to them. We acheive this using Anycast. 

To learn more about the architecture that makes this possible, read this [technical deep-dive about Calls](https://blog.cloudflare.com/cloudflare-calls-anycast-webrtc).

## IP Addresses

Communication between TURN clients and the TURN server (as defined in [RFC5766](https://datatracker.ietf.org/doc/html/rfc5766)) which is the traffic that needs to traverse restrictive network environments, is done over a very small set of IPv6 and IPv4 addresses. If you are making adjustments to your firewalls to allow Calls TURN traffic, you must query `turn.cloudflare.com` (A and AAAA records) regularly and allowlist the resulting IP address(es). For static IPs and guarantees, please discuss with a your enterprise account team.

TURN server relay allocations are done using a larger set of [IP address ranges](https://www.cloudflare.com/ips/). Calls relay allocations will be in the 9024-65535 port range.


## Protocols and Ciphers for TURN over TLS

TLS versions supported include TLS 1.1, TLS 1.2, and TLS 1.3.


| OpenSSL Name                        | TLS 1.1 | TLS 1.2 | TLS 1.3 |
| ----------------------------------- | ------- | ------- | ------- |
| AEAD-AES128-GCM-SHA256              | No      | No      | ✅      |
| AEAD-AES256-GCM-SHA384              | No      | No      | ✅      |
| AEAD-CHACHA20-POLY1305-SHA256       | No      | No      | ✅      |
| ECDHE-ECDSA-AES128-GCM-SHA256       | No      | ✅      | No      |
| ECDHE-RSA-AES128-GCM-SHA256         | No      | ✅      | No      |
| ECDHE-RSA-AES128-SHA                | ✅      | ✅      | No      |
| AES128-GCM-SHA256                   | No      | ✅      | No      |
| AES128-SHA                          | ✅      | ✅      | No      |
| AES256-SHA                          | ✅      | ✅      | No      |

## MTU

There is no specific MTU limit for Cloudflare Calls TURN service.

## Limits

Cloudflare Calls TURN service places limits on:

- Unique IP address you can communicate with
- Packet rate outbound and inbound to the relay allocation
- Data rate outbound and inbound to the relay allocation

These limits are set quite high and suitable for high-demand applications.

## Example configuration

```
var myPeerConnection = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:stun.cloudflare.com:3478",
    },
    {
      urls: "turn:turn.cloudflare.com:3478",
      username: "REPLACE_WITH_USERNAME",
      credential: "REPLACE_WITH_CREDENTIAL",
    },
    {
      urls: "turns:turn.cloudflare.com:443?transport=tcp",
      username: "REPLACE_WITH_USERNAME",
      credential: "REPLACE_WITH_CREDENTIAL",
    },
    {
      urls: "turn:turn.cloudflare.com:3478?transport=tcp",
      username: "REPLACE_WITH_USERNAME",
      credential: "REPLACE_WITH_CREDENTIAL",
    },
  ],
});
```
