---
title: Available fields and functions
pcx-content-type: reference
order: 2
---

import HeaderFields from "../../../_partials/transform/_header-modification-fields.md"

# Available fields and functions for HTTP response header modification

The available fields when setting an HTTP response header value using an expression are the following:

<HeaderFields/>

Use the `to_string()` function to get the string representation of a non-string value like an Integer value. For example, `to_string(cf.bot_management.score)`.

Refer to [Fields](https://developers.cloudflare.com/firewall/cf-firewall-language/fields) for reference information on these fields.

<Aside type="warning" header="Important">

To obtain the value of an HTTP request header using the [`http.request.headers`](https://developers.cloudflare.com/firewall/cf-firewall-language/fields#field-http-request-headers) field, specify the header name in **lowercase**.

For example, to get the first value of the `Accept-Encoding` request header in an expression, use: `http.request.headers["accept-encoding"][0]`.

</Aside>

For information on the available functions, refer to [Functions](https://developers.cloudflare.com/firewall/cf-firewall-language/functions).
