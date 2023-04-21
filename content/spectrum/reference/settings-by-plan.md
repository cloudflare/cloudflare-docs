---
type: overview
pcx_content_type: reference
title: Settings by plan
weight: 0
layout: list
---

# Settings by plan

{{<content-column>}}

Certain fields in Spectrum request and response bodies require an Enterprise plan. To upgrade your plan, contact your account team.

Spectrum properties requiring an Enterprise plan:

{{</content-column>}}

{{<table-wrap>}}

| Name           | Type    | Description                                                                                                                                                                                                                                                                                                 | Example                                                            |
| -------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| origin_dns     | object  | Method and parameters used to discover the origin server address via DNS. Valid record types are A, AAAA, SRV and empty(both A and AAA).<br />A request must contain either an "origin_dns" parameter or an "origin_direct" parameter. When both are specified the service returns an HTTP 400 Bad Request. | "origin_dns": {"type": "A", "name": "mqtt.example.com", ttl: 1200} |
| origin_port    | integer | The destination port at the origin.                                                                                                                                                                                                                                                                         | 22                                                                 |
| proxy_protocol | string  | Enables Proxy Protocol to the origin. Spectrum supports "v1", "v2", and "simple" proxy protocols. See [Proxy Protocol](/spectrum/how-to/enable-proxy-protocol/) for more details.                                                                                                                           | "off"                                                              |
| ip_firewall    | boolean | Enables IP Access rules for this application.                                                                                                                                                                                                                                                               | true                                                               |
| tls            | string  | Type of TLS termination for the application. Options are "off" (default, aka Passthrough), "flexible", "full", and "strict". See [Configuration Options](/spectrum/reference/configuration-options/) for descriptions of each.                                                                                        | "full"                                                             |

{{</table-wrap>}}

{{<content-column>}}

Review the [Spectrum API documentation](/api/operations/spectrum-applications-list-spectrum-applications) for example API requests.

{{</content-column>}}
