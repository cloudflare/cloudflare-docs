---
title: Application protocol detection
pcx_content_type: how-to
weight: 2
---

# Application protocol detection

{{<Aside header="Availability">}}Application protocol detection is available in early access for Enterprise customers. For more information, contact your Cloudflare Customer Success Manager.{{</Aside>}}

Gateway supports the detection, logging, and filtering of application protocols using packet attributes.

## Enable application protocol detection

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Network** > **Firewall**.
2. Enable **Protocol Detection**.

You can now use **Detected Protocol** as a selector in a [Network policy](/cloudflare-one/policies/gateway/network-policies/#detected-protocol).

## Supported protocols

Gateway supports detection and filtering of the following protocols:

| Protocol | Notes                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------- |
| HTTP     | All cleartext HTTP. Multiple selectors. One is `HTTP` for 1.1, the other is `HTTP2` for HTTP/2. |
| SSH      |                                                                                                 |
| TLS      | Single selector which can map to version 1.1 through 1.3.                                       |
| DCE/RPC  |                                                                                                 |
| MQTT     |                                                                                                 |
| TPKT     | Typically used to initiate RDP sessions. Use this to filter RDP.                                |
| DNP3     |                                                                                                 |

## Example

You can create network policies using detections rather than relying on common ports. For example, you can block all SSH traffic without blocking port 22 or any non-default ports:

| Selector          | Operator | Value | Action |
| ----------------- | -------- | ----- | ------ |
| Detected Protocol | in       | SSH   | Block  |
