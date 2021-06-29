---
title: Available fields and functions
pcx-content-type: reference
order: 2
---

# Available fields and functions for HTTP request header modification

The available fields when setting an HTTP request header value using an expression are the following:

* `cf.bot_detection.js_check_score`
* `cf.bot_management.*`
* `cf.client.bot`
* `cf.client_trust_score`
* `cf.threat_score`
* `cf.colo.id`
* `cf.edge.server_port`
* `cf.zone.name`
* `cf.metal.id`
* `cf.tls_client_auth.*`
* `http.cookie`
* `http.host`
* `http.referer`
* `http.request.headers`
* `http.request.method`
* `http.request.timestamp.sec`
* `http.request.timestamp.msec`
* `http.request.full_uri`
* `http.request.uri`
* `http.request.uri.*`
* `http.request.version`
* `raw.http.request.full_uri`
* `raw.http.request.uri`
* `http.user_agent`
* `http.x_forwarded_for`
* `ip.src`
* `ip.geoip.*`
* `ssl`

Use the `to_string()` function to get the string representation of a non-string value like an Integer value. For example, `to_string(cf.bot_management.score)`.

See [Fields](https://developers.cloudflare.com/firewall/cf-firewall-language/fields) for reference information on these fields.

For information on the available functions, see [Functions](https://developers.cloudflare.com/firewall/cf-firewall-language/functions).
