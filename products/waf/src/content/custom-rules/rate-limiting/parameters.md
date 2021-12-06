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
     - Field name in the dashboard: **If incoming requests match** (use the Rule Builder or the Expression Editor).
     - Expression you are matching traffic on.

- `action` <Type>String</Type>
    - Field name in the dashboard: **Choose action**.
    - Action to perform when the request rate specified in the rule is reached.
    - Use one of the following values: `block`, `challenge`, `js_challenge`, or `log`.

- `characteristics` <Type>Array&lt;String&gt;</Type>
    - Field name in the dashboard: **With the same**.
    - Set of parameters defining how Cloudflare tracks the request rate for the rule.
    - Use one or more of the following characteristics:

        API value                                     | UI value
        ----------------------------------------------|--------------------------
        `cf.colo.id` (mandatory)                      | N/A (implicitly included)
        `cf.unique_visitor_id`                        | _IP with NAT support_
        `ip.src`                                      | _IP_
        `ip.geoip.country`                            | _Country_
        `ip.geoip.asnum`                              | _AS Num_
        `http.request.headers["<header_name>"]`       | _Headers_
        `http.request.cookies["<cookie_name>"]`       | _Cookie_
        `http.request.uri.args["<query_param_name>"]` | _Query_

    - You cannot use both `cf.unique_visitor_id` and `ip.src` as characteristics of the same Rate Limiting rule.
    - If you use `http.request.headers["<header_name>"]`, you must enter the header name in lower case, since Cloudflare normalizes header names at the edge.
    - If you use `http.request.cookies["<cookie_name>"]`, refer to [Recommendations](#recommendations) for additional validations you should implement.

    - <Aside type="note">

      Use `cf.unique_visitor_id` to handle situations such as requests under NAT sharing the same IP address. Cloudflare uses a variety of privacy-preserving techniques to identify unique visitors, which may include use of session cookies — refer to [Cloudflare Cookies](https://developers.cloudflare.com/fundamentals/get-started/cloudflare-cookies) for details.

      </Aside>

- `period` <Type>Number</Type>
    - Field name in the dashboard: **Period**.
    - The period of time to consider (in seconds) when evaluating the request rate.
    - Use one of the following values: `10`, `60` (one minute), `120` (two minutes), `300` (five minutes), `600` (ten minutes), or `3600` (one hour).

- `requests_per_period` <Type>Number</Type>
    - Field name in the dashboard: **Requests**.
    - The number of requests over the period of time that will trigger the rule.

- `mitigation_timeout` <Type>Number</Type>
    - Field name in the dashboard: **Duration**.
    - Once the request rate is reached, the Rate Limiting rule blocks further requests for the period of time defined in this field (in seconds).
    - Use one of the following values: `30`, `60` (one minute), `600` (ten minutes), `3600` (one hour), or `86400` (one day).
    - The value must be `0` when action is `challenge` or `js_challenge`.

- `mitigation_expression` <Type>String</Type> <PropMeta>optional</PropMeta>
    - Field name in the dashboard: N/A (currently only available via API).
    - Scope of the mitigation action.
    - Allows you to specify an action scope different from the rule scope. For example, you can count login attempts at the `/login` URI path using the `expression` field and then perform rate limiting on the entire site using the `mitigation_expression` field.
    - The default value is `""` (empty string). When set to the default value, Cloudflare uses the value of the `expression` field as the mitigation expression.
    - The value must be the same as the `expression` value or `""` when action is `challenge` or `js_challenge`.

</Definitions>

## Recommendations

If you use `http.request.cookies["<cookie_name>"]` as a Rate Limiting rule characteristic, follow these recommendations:

* Create a [Custom Firewall rule](/custom-rules/custom-firewall) that blocks requests with more than one value for the cookie.
* Validate the cookie value at the origin before performing any demanding server operations.
