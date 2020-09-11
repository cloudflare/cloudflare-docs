---
type: overview
---

# Settings by plan

<ContentColumn>

Certain fields in Spectrum request and response bodies require an Enterprise plan.  To upgrade your plan, contact your Customer Success Manager or the [Customer Success Team](mailto:success@cloudflare.com).

Spectrum properties requiring an Enterprise plan:

</ContentColumn>

<TableWrap>

Name          | Type         | Description                                                                              | Example
--------------|--------------|------------------------------------------------------------------------------------------|-------------------
origin_dns    | object       | Method and parameters used to discover the origin server address via DNS. Valid record types are A, AAAA, SRV and empty(both A and AAA).<br />A request must contain either an "origin_dns" parameter or an "origin_direct" parameter. When both are specified the service returns an HTTP 400 Bad Request. | "origin_dns": {"type": "A", "name": "mqtt.example.com", ttl: 1200}
origin_port   | integer      | The destination port at the origin.                                                      | 22
proxy_protocol | string       | Enables Proxy Protocol to the origin. Spectrum supports "v1", "v2", and "simple" proxy protocols. See [Proxy Protocol](../getting-started/proxy-protocol/) for more details.                                                  | "off"
ip_firewall    | boolean      | Enables IP Access Rules for this application.                                                                                                                                                                                 | true
tls            | string       | Type of TLS termination for the application. Options are "off" (default, aka Passthrough), "flexible", "full", and "strict". See [Configuration Options](../getting-started/configuration-options/) for descriptions of each. | "full"

</TableWrap>

<ContentColumn>

Review the [Spectrum API documentation](https://api.cloudflare.com/#spectrum-applications-properties) for example API requests.

</ContentColumn>
