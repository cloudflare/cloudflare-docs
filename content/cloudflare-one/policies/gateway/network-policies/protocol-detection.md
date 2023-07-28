---
title: Application protocol detection
pcx_content_type: concept
weight: 2
---

# Application protocol detection

{{<Aside header="Availability">}}Application protocol detection is available in early access for Enterprise customers. For more information, contact your Cloudflare Customer Success Manager.{{</Aside>}}

Gateway allows the detection, logging, and filtering of application protocols based on network packet attributes rather than common ports.

## Enable application protocol detection

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Network** > **Gateway Logging**.
2. Enable **Application protocol detection**.

You can now use protocol detection as a selector in a [Network policy](/cloudflare-one/policies/gateway/network-policies/#protocol-detection).

## Supported protocols

Gateway supports detection and filtering of the following protocols:

- SSH
- HTTP/1.1 and HTTP/2
- TLS 1.1-1.3
- QUIC
- RDP
- Unencrypted DNS (UDP and TCP)
- DCE/RPC
- MQTT
- DNP3
