---
pcx-content-type: reference
order: 17
---

# Rate limiting parameters

<Aside type='warning'>

This feature is only available for selected customers on an Enterprise plan.

</Aside>

The available Rate Limiting rule parameters are the following:

<Definitions>

- `expression` <Type>String</Type>
     - Expression you are matching traffic on.

- `action` <Type>String</Type>
    - Action to perform when the request rate specified in the rule is reached.
    - Use one of the following values: `block`, `challenge`, `js_challenge`, or `log`.

- `characteristics` <Type>Array&lt;String&gt;</Type>

    - Set of parameters defining how Cloudflare tracks the request rate for the rule.
    - Use one or more of the following characteristics:

        - `cf.colo.id` (mandatory in the API; implicitly included when using the dashboard)
        - `cf.unique_visitor_id`
        - `ip.src`
        - `ip.geoip.country`
        - `ip.geoip.asnum`
        - `http.request.headers["<header_name>"]`
        - `http.request.cookies["<cookie_name>"]`
        - `http.request.uri.args["<query_parameter_name>"]`

    - You cannot use both `cf.unique_visitor_id` and `ip.src` as characteristics of the same Rate Limiting rule.

    - If you use `http.request.headers["<header_name>"]`, you must enter the header name in lower case, since Cloudflare normalizes header names at the edge.

    - If you use `http.request.cookies["<cookie_name>"]`, refer to [Recommendations](#recommendations) for additional validations you should implement.

    - <Aside type="note">

      Use `cf.unique_visitor_id` to handle situations such as requests under NAT sharing the same IP address. Cloudflare uses a variety of privacy-preserving techniques to identify unique visitors, which may include use of session cookies — refer to [Cloudflare Cookies](https://developers.cloudflare.com/fundamentals/get-started/cloudflare-cookies) for details.

      </Aside>

- `period` <Type>Number</Type>
    - The period of time to consider (in seconds) when evaluating the request rate.
    - Use one of the following values: `10`, `60` (one minute), `120` (two minutes), `300` (five minutes), `600` (ten minutes), or `3600` (one hour).

- `requests_per_period` <Type>Number</Type>
    - The number of requests over the period of time that will trigger the rule.

- `mitigation_timeout` <Type>Number</Type>
    - Once the request rate is reached, the Rate Limiting rule blocks further requests for the period of time defined in this field (in seconds).
    - Use one of the following values: `30`, `60` (one minute), `600` (ten minutes), `3600` (one hour), or `86400` (one day).
    - The value must be `0` when action is `challenge` or `js_challenge`.

- `mitigation_expression` <Type>String</Type> <PropMeta>optional</PropMeta>
    - Scope of the mitigation action. Currently, this field is only available via API.
    - Allows you to specify an action scope different from the rule scope. For example, you can count login attempts at the `/login` URI path using the `expression` field and then perform rate limiting on the entire site using the `mitigation_expression` field.
    - The default value is `""` (empty string). When set to the default value, Cloudflare uses the value of the `expression` field as the mitigation expression.
    - The value must be the same as the `expression` value or `""` when action is `challenge` or `js_challenge`.

</Definitions>

## Recommendations

If you use `http.request.cookies["<cookie_name>"]` as a Rate Limiting rule characteristic, follow these recommendations:

* Create a [Custom Firewall rule](/custom-rules/custom-firewall) that blocks requests with more than one value for the cookie.
* Validate the cookie value at the origin before performing any demanding server operations.
