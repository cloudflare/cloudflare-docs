---
title: Application protocol detection
pcx_content_type: how-to
weight: 2
---

# Application protocol detection

{{<Aside header="Availability">}}Application protocol detection is available in early access for Enterprise customers. For more information, contact your Cloudflare Customer Success Manager.{{</Aside>}}

Gateway supports the detection, logging, and filtering of application protocols using packet attributes.

## Enable application protocol detection

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Network** > **Gateway Logging**.
2. Enable **Application protocol detection**.

You can now use **Protocol Detection** as a selector in a [Network policy](/cloudflare-one/policies/gateway/network-policies/#protocol-detection).

## Supported protocols

Gateway supports detection and filtering of the following protocols:

- SSH
- HTTP/1.1 and HTTP/2
- TLS 1.0 to 1.3
- QUIC
- Unencrypted DNS (UDP and TCP)
- RDP
- DCE/RPC
- MQTT
- DNP3

## Example

You can create network policies using detections rather than relying on common ports. For example, you can block all SSH traffic without blocking port 22 or any non-default ports:

| Selector           | Operator | Value | Action |
| ------------------ | -------- | ----- | ------ |
| Protocol Detection | in       | SSH   | Block  |
