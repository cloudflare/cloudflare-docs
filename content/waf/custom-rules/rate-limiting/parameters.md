---
pcx-content-type: reference
title: Rate limiting parameters
weight: 18
---

# Rate limiting parameters

{{<Aside type="warning">}}

This feature is only available for selected customers on an Enterprise plan.

{{</Aside>}}

The available Rate Limiting rule parameters are the following:

{{<definitions>}}

*   `expression` {{<type>}}String{{</type>}}
    *   Field name in the dashboard: **If incoming requests match** (use the Rule Builder or the Expression Editor).
    *   Expression you are matching traffic on.

*   `action` {{<type>}}String{{</type>}}
    *   Field name in the dashboard: **Choose action**.
    *   Action to perform when the request rate specified in the rule is reached.
    *   Use one of the following values: `block`, `challenge`, `js_challenge`, `managed_challenge`, or `log`.

*   `characteristics` {{<type>}}Array\<String>{{</type>}}
    *   Field name in the dashboard: **With the same**.

    *   Set of parameters defining how Cloudflare tracks the request rate for the rule.

    *   Use one or more of the following characteristics:

        API value                                     | UI value
        \----------------------------------------------|--------------------------
        `cf.colo.id` (mandatory)                      | N/A (implicitly included)
        `cf.unique_visitor_id`                        | *IP with NAT support*
        `ip.src`                                      | *IP*
        `ip.geoip.country`                            | *Country*
        `ip.geoip.asnum`                              | *AS Num*
        `http.request.headers["<header_name>"]`       | *Headers*
        `http.request.cookies["<cookie_name>"]`       | *Cookie*
        `http.request.uri.args["<query_param_name>"]` | *Query*

    *   You cannot use both `cf.unique_visitor_id` and `ip.src` as characteristics of the same Rate Limiting rule.

    *   If you use `http.request.headers["<header_name>"]`, you must enter the header name in lower case, since Cloudflare normalizes header names at the edge.

    *   If you use `http.request.cookies["<cookie_name>"]`, refer to [Recommendations](#recommendations) for additional validations you should implement.

    *   You should not use `http.request.headers["<header_name>"]` or `http.request.cookies["<cookie_name>"]` as the only characteristic of a Rate Limiting rule. Refer to [Recommendations](#recommendations) for details.

    *   {{<Aside type="note">}}

        Use `cf.unique_visitor_id` to handle situations such as requests under NAT sharing the same IP address. Cloudflare uses a variety of privacy-preserving techniques to identify unique visitors, which may include use of session cookies — refer to [Cloudflare Cookies](/fundamentals/get-started/cloudflare-cookies) for details.

        {{</Aside>}}

*   `period` {{<type>}}Number{{</type>}}
    *   Field name in the dashboard: **Period**.
    *   The period of time to consider (in seconds) when evaluating the request rate.
    *   Use one of the following values: `10`, `60` (one minute), `120` (two minutes), `300` (five minutes), `600` (ten minutes), or `3600` (one hour).

*   `requests_per_period` {{<type>}}Number{{</type>}}
    *   Field name in the dashboard: **Requests**.
    *   The number of requests over the period of time that will trigger the rule.

*   `mitigation_timeout` {{<type>}}Number{{</type>}}
    *   Field name in the dashboard: **Duration**.
    *   Once the request rate is reached, the Rate Limiting rule blocks further requests for the period of time defined in this field (in seconds).
    *   Use one of the following values: `30`, `60` (one minute), `600` (ten minutes), `3600` (one hour), or `86400` (one day).
    *   The value must be `0` when action is `challenge`, `js_challenge`, or `managed_challenge`.

{{</definitions>}}

## Recommendations

*   If you use `http.request.cookies["<cookie_name>"]` as a Rate Limiting rule characteristic, follow these recommendations:

    *   Create a [Custom Firewall rule](/waf/custom-rules/custom-firewall/) that blocks requests with more than one value for the cookie.
    *   Validate the cookie value at the origin before performing any demanding server operations.

*   Do not use `http.request.headers["<header_name>"]` or `http.request.cookies["<cookie_name>"]` as the only characteristic of a Rate Limiting rule, since in some occasions these characteristics have no value. In this case, the requests would fit in the same [rate limiting counter](/waf/custom-rules/rate-limiting/request-rate/), which could unexpectedly trigger the rule for many visitors.

    To prevent this situation, Cloudflare recommends that you use a second characteristic in your Rate Limiting rule that always has a defined value, such as `ip.src` or `ip.geoip.asnum`.
