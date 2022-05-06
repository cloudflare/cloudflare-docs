---
pcx-content-type: reference
title: Rate limiting parameters
weight: 18
---

# Rate limiting parameters

The available rate limiting rule parameters are the following:

{{<definitions>}}

- **If incoming requests match** {{<type>}}String{{</type>}}

  - Field name in the API: `expression` (rule field).
  - Defines the criteria for the rate limiting rule to match a request.

- **Choose action** {{<type>}}String{{</type>}}

  - Field name in the API: `action` (rule field).
  - Action to perform when the rate specified in the rule is reached.
  - Use one of the following values: `block`, `challenge`, `js_challenge`, `managed_challenge`, or `log`.

- **Duration** {{<type>}}Number{{</type>}}

  - Field name in the API: `mitigation_timeout`.
  - Once the rate is reached, the rate limiting rule applies the rule action to further requests for the period of time defined in this field (in seconds).
  - In the dashboard, select one of the available values, which may vary according to your Cloudflare plan. The available API values are: `30`, `60` (one minute), `600` (ten minutes), `3600` (one hour), or `86400` (one day).
  - You cannot define a duration when using one of the challenge actions. In this case, when visitors pass a challenge, their corresponding [request counter](/waf/rate-limiting-rules/request-rate/) is set to zero. When visitors with the same values for the rule characteristics make enough requests to trigger the rate limiting rule again, they will receive a new challenge.
  - When using the API, you must set the `mitigation_timeout` value to `0` when the action is `managed_challenge`, `js_challenge`, or `challenge`.

- **Requests** {{<type>}}Number{{</type>}}

  - Field name in the API: `requests_per_period`.
  - The number of requests over the period of time that will trigger the rule.

- **Period** {{<type>}}Number{{</type>}}

  - Field name in the dashboard: `period`.
  - The period of time to consider (in seconds) when evaluating the request rate.
  - Use one of the following values: `10`, `60` (one minute), `120` (two minutes), `300` (five minutes), `600` (ten minutes), or `3600` (one hour).

- **With the same** {{<type>}}Array&lt;String&gt;{{</type>}}

  - Field name in the API: `characteristics`.
  - Set of parameters defining how Cloudflare tracks the request rate for the rule.
  - Use one or more of the following characteristics:

    | Dashboard value           | API value                                     |
    | ------------------------- | --------------------------------------------- |
    | N/A (implicitly included) | `cf.colo.id` (mandatory)                      |
    | _IP with NAT support_     | `cf.unique_visitor_id`                        |
    | _IP_                      | `ip.src`                                      |
    | _Country_                 | `ip.geoip.country`                            |
    | _AS Num_                  | `ip.geoip.asnum`                              |
    | _Headers_                 | `http.request.headers["<header_name>"]`       |
    | _Cookie_                  | `http.request.cookies["<cookie_name>"]`       |
    | _Query_                   | `http.request.uri.args["<query_param_name>"]` |
    | _JA3 Fingerprint_         | `cf.bot_management.ja3_hash`                  |

  - The available characteristics depend on your Cloudflare plan. Refer to [Availability](/waf/rate-limiting-rules/#availability) for more information.
  - You cannot use both _IP with NAT support_ and _IP_ as characteristics of the same rate limiting rule.
  - If you use `http.request.headers["<header_name>"]` in an API request, you must enter the header name in lower case, since Cloudflare normalizes header names at the edge.
  - If you use _Cookie_, refer to [Recommendations](#recommendations) for additional validations you should implement.
  - You should not use _Headers_ or _Cookie_ as the only characteristic of a rate limiting rule. Refer to [Recommendations](#recommendations) for details.

{{<Aside type="note">}}

Use _IP with NAT support_ to handle situations such as requests under NAT sharing the same IP address. Cloudflare uses a variety of privacy-preserving techniques to identify unique visitors, which may include use of session cookies — refer to [Cloudflare Cookies](/fundamentals/get-started/reference/cloudflare-cookies/) for details.

{{</Aside>}}

- **Increment counter when** {{<type>}}String{{</type>}}

  - Field name in the API: `counting_expression` (optional).
  - Only available in the Cloudflare dashboard when you enable **Use custom counting expression**.
  - Defines the criteria used for determining the request rate. By default, the counting expression is the same as the rule expression. This default is also applied when you set this field to an empty string (`""`).
  - The counting expression can include [HTTP response fields](/ruleset-engine/rules-language/fields/#http-response-fields). When there are response fields in the counting expression, the counting will happen after the response is sent.

- **Also apply rate limiting to cached assets** {{<type>}}Boolean{{</type>}}

  - Field name in the API: `requests_to_origin` (optional, with the opposite meaning of the Cloudflare dashboard option).
  - If this field is disabled (or when the `requests_to_origin` API field is set to `true`), only the requests going to the origin (that is, requests that are not cached) will be considered when determining the request rate.

- **With response type** {{<type>}}String{{</type>}}

  - Field name in the API: `response` > `content_type` (optional).
  - Only available when the rule action is _Block_. 
  - Allows you to define the content type of a custom response when blocking a request due to rate limiting.
  - Available API values: `application/json`, `text/html`, `text/xml`, or `text/plain`.

- **With response code** {{<type>}}Integer{{</type>}}

  - Field name in the API: `response` > `status_code` (optional).
  - Only available when the rule action is _Block_. 
  - Allows you to define the HTTP status code returned to the visitor when blocking the request due to rate limiting.
  - You must enter a value between `400` and `499`. The default value is `429` (`Too many requests`).

- **Response body** {{<type>}}String{{</type>}}

  - Field name in the API: `response` > `content` (optional).
  - Only available when the rule action is _Block_.
  - Allows you to define the body of the returned HTTP response when the request is blocked due to rate limiting.
  - The maximum field size is 30 KB.

{{</definitions>}}

## Recommendations

- If you use _Cookie_ as a rate limiting rule characteristic, follow these recommendations:

  - Create a [custom rule](/waf/custom-rules/) that blocks requests with more than one value for the cookie.
  - Validate the cookie value at the origin before performing any demanding server operations.

- Do not use _Headers_ or _Cookie_ as the only characteristic of a rate limiting rule, since in some occasions these characteristics have no value. In this case, the requests would fit in the same [rate limiting counter](/waf/rate-limiting-rules/request-rate/), which could unexpectedly trigger the rule for many visitors.

  To prevent this situation, Cloudflare recommends that you use a second characteristic in your rate limiting rule that always has a defined value, such as _IP_ or _AS Num_.
