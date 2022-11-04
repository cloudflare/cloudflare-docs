---
_build:
  publishResources: false
  render: never
  list: never
---

*   `cf.edge.server_ip`
*   `cf.edge.server_port`
*   `cf.edge.client_port`
*   `cf.zone.name`
*   `cf.metal.id`
*   `cf.ray_id`
*   `cf.tls_client_auth.*`
*   `http.cookie`
*   `http.host`
*   `http.referer`
*   `http.request.headers`
*   `http.request.headers.*`
*   `http.request.accepted_languages`
*   `http.request.method`
*   `http.request.timestamp.sec`
*   `http.request.timestamp.msec`
*   `http.request.full_uri`
*   `http.request.uri`
*   `http.request.uri.*`
*   `http.request.version`
*   `raw.http.request.full_uri`
*   `raw.http.request.uri`
*   `raw.http.request.uri.*`
*   `http.user_agent`
*   `http.x_forwarded_for`
*   `ip.src`
*   `ip.src.lat`
*   `ip.src.lon`
*   `ip.src.city`
*   `ip.geoip.*`
*   `ssl`

Refer to [Fields](/ruleset-engine/rules-language/fields/) for reference information on these fields.

{{<Aside type="warning" header="Important">}}

* To obtain the value of an HTTP request header using the [`http.request.headers`](/ruleset-engine/rules-language/fields/#field-http-request-headers) field, specify the header name in **lowercase**. For example, to get the first value of the `Accept-Encoding` request header in an expression, use: `http.request.headers["accept-encoding"][0]`.

* Use the `to_string()` function to get the string representation of a non-string value like an Integer value.

{{</Aside>}}
