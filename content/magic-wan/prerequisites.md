---
title: Prerequisites
pcx_content_type: reference
weight: 2
---

# Prerequisites

Before you can begin using Magic WAN, verify that you meet Cloudflare's onboarding requirements.

## Use compatible tunnel endpoint routers

Magic WAN relies on GRE and IPsec tunnels to transmit packets from Cloudflare’s global network to your origin network. To ensure compatibility with Magic WAN, the routers at your tunnel endpoints must:

- Allow configuration of at least one tunnel per Internet service provider (ISP).
- Support maximum segment size (MSS) clamping.

## Set maximum segment size

```mermaid
sequenceDiagram
accTitle: Magic WAN
accDescr: Maximum segment size
participant A as Client machine
participant B as Cloudflare Magic Transit
participant C as Origin router
A->>B: MSS = 1460 bytes <br> Protocol (20 bytes) <br> IP header (20 bytes)
Note left of A: SYN
B->>C: MSS = 1436 bytes <br> Protocol (20 bytes) <br> IP header (20 bytes) <br> GRE header (4 bytes) <br> IP header (20 bytes)
C->>A: MSS = 1436 bytes <br> IP <br> Protocol
Note right of C: SYN-ACK
A->>B: MSS = 1436 bytes <br> Protocol <br> IP
Note left of A: ACK
B->>C: Protocol <br> IP <br> GRE <br> IP
```
<br />

{{<render file="_maximum-segment-size.md" productFolder="magic-transit" withParameters="Magic WAN;;To accommodate the additional header data, **you must set the MSS value to 1436 bytes at your tunnel interfaces** (not the physical interfaces).">}}

{{<render file="_router-vendor-guidelines-mss-settings-origin.md" productFolder="magic-transit" withParameters="To verify that your routers have the correct MSS setting (1436 bytes) at your origin, run the following command on the servers egressing the prefixes you want to add to Magic WAN:">}}
