---
order: 17
---

# Rate limiting parameters

<Aside type='warning' header='Important'>

This feature is only available for selected customers on an Enterprise plan.

</Aside>

The available Rate Limiting Rule parameters are the following:

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
        - `ip.src`
        - `ip.geoip.country`
        - `ip.geoip.asnum`
        - `http.request.headers["<header_name>"]`

- `period` <Type>Number</Type>
    - The period of time to consider (in seconds) when evaluating the request rate.
    - Use one of the following values: `10`, `60` (one minute), `600` (ten minutes), or `3600` (one hour).

- `requests_per_period` <Type>Number</Type>
    - The number of requests over the period of time that will trigger the rule.

- `mitigation_timeout` <Type>Number</Type>
    - Once the request rate is reached, the Rate Limiting rule blocks further requests for the period of time defined in this field (in seconds).
    - Use one of the following values: `10`, `60` (one minute), `600` (ten minutes), `3600` (one hour), or `86400` (one day).
    - The value must be `0` when action is `challenge` or `js_challenge`.

- `mitigation_expression` <Type>String</Type> <PropMeta>optional</PropMeta>
    - Scope of the mitigation action. Currently, this field is only available via API.
    - Allows you to specify an action scope different from the rule scope. For example, you can count login attempts at the `/login` URI path using the `expression` field and then perform rate limiting on the entire site using the `mitigation_expression` field.
    - The default value is `""` (empty string). When set to the default value, Cloudflare uses the value of the `expression` field as the mitigation expression.
    - The value must be the same as the `expression` value or `""` when action is `challenge` or `js_challenge`.

</Definitions>
