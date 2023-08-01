---
title: Application protocol detection
pcx_content_type: how-to
weight: 2
---

# Application protocol detection

{{<Aside header="Availability">}}Application protocol detection is available in early access for Enterprise users. For more information, contact your account team.{{</Aside>}}

Gateway supports the detection, logging, and filtering of application protocols using packet attributes.

## Enable application protocol detection

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Network** > **Firewall**.
2. Enable **Protocol Detection**.

You can now use **Detected Protocol** as a selector in a [Network policy](/cloudflare-one/policies/gateway/network-policies/#detected-protocol).

## Supported protocols

Gateway supports detection and filtering of the following protocols:

| Protocol | Notes                                                                               |
| -------- | ----------------------------------------------------------------------------------- |
| HTTP     | The policy builder includes separate values for HTTP/1.1 and HTTP/2.                |
| SSH      |                                                                                     |
| TLS      | Gateway detects TLS versions 1.1 through 1.3 with the _TLS_ value.                  |
| DCE/RPC  |                                                                                     |
| MQTT     |                                                                                     |
| TPKT     | Because TPKT initiates RDP sessions, you can filter RDP traffic with this protocol. |
| DNP3     |                                                                                     |

## Example network policy

You can create network policies that filter traffic based on protocol detections rather than common ports. For example, you can block all SSH traffic on your network without blocking port 22 or any other non-default ports:

| Selector          | Operator | Value | Action |
| ----------------- | -------- | ----- | ------ |
| Detected Protocol | in       | SSH   | Block  |
