---
order: 17
---

# Rate limiting parameters

The available Rate Limiting Rule parameters are the following:

<Definitions>

- **Expression**: `expression` <Type>String</Type>
     - Expression you are matching traffic on.

- **Action**: `action` <Type>String</Type>
    - Action to perform when the request rate specified in the rule is reached.
    - When using the API, you must use one of the following values: `block`, `challenge`, `js_challenge`, or `log`.

- **Characteristics**: `characteristics` <Type>Array&lt;String&gt;</Type>
    - Set of parameters defining how Cloudflare tracks the request rate for the rule.
    - Use one or more of the following characteristics:
        - _Data center ID_ or `cf.colo.id` (**mandatory** in the API; implicitly included when using the dashboard)
        - _IP Address_, or `ip.src` in the API
        - _Country_, or `ip.geoip.country` in the API
        - _ASN_, or `ip.geoip.asnum` in the API
        - _HTTP Header_ > `<HEADER_NAME>`, or `http.request.headers["<HEADER_NAME>"]` in the API

- **Period**: `period` <Type>Number</Type>
    - The period of time to consider (in seconds) when evaluating the request rate.
    - When using the API, you must use one of the following values: `10`, `60` (one minute), `600` (ten minutes), or `3600` (one hour).

- **Requests per period**: `requests_per_period` <Type>Number</Type>
    - The number of requests over the period of time that will trigger the rule.

- **Mitigation timeout**: `mitigation_timeout` <Type>Number</Type>
    - Once the request rate is reached, the Rate Limiting rule blocks further requests for the period of time defined in this field (in seconds).
    - When using the API, you must use one of the following values: `10`, `60` (one minute), `600` (ten minutes), `3600` (one hour), or `86400` (one day).

- **Mitigation expression**: `mitigation_expression` <Type>String</Type> <PropMeta>optional</PropMeta>
    - Scope of the mitigation action. Currently, this field is only available via API.
    - Allows you to specify an action scope different from the rule scope. For example, you can count login attempts at the `/login` URI path using the `expression` field and then perform rate limiting on the entire site using the `mitigation_expression` field.
    - The default value is `""` (empty string). When set to the default value, Cloudflare uses the value of the `expression` field as the mitigation expression.
    - The value must be `""` when action is `challenge` or `js_challenge`.

</Definitions>
