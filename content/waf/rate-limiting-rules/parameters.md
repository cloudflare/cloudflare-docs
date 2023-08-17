---
pcx_content_type: reference
title: Rate limiting parameters
weight: 18
---

# Rate limiting parameters

The available rate limiting rule parameters are the following:

{{<definitions>}}

- **If incoming requests match** {{<type>}}String{{</type>}}

  - Field name in the API: `expression` (rule field).
  - Defines the criteria for the rate limiting rule to match a request.

- **Cache status** > **Also apply rate limiting to cached assets** {{<type>}}Boolean{{</type>}}

  - Field name in the API: `requests_to_origin` (optional, with the opposite meaning of the Cloudflare dashboard option).
  - If this parameter is disabled (or when the `requests_to_origin` API field is set to `true`), only the requests going to the origin (that is, requests that are not cached) will be considered when determining the request rate.
  - In some cases, you cannot disable the **Also apply rate limiting to cached assets** parameter due to configuration restrictions. Refer to [Configuration restrictions](#configuration-restrictions) for details.

- **With the same characteristics** {{<type>}}Array&lt;String&gt;{{</type>}}

  - Field name in the API: `characteristics`.
  - Set of parameters defining how Cloudflare tracks the request rate for the rule.
  - Use one or more of the following characteristics:

    | Dashboard value                           | API value                                             |
    |-------------------------------------------|------------------------------------------------------ |
    | N/A (implicitly included)                 | `cf.colo.id` (mandatory)                              |
    | _IP_                                      | `ip.src`                                              |
    | _IP with NAT support_                     | `cf.unique_visitor_id`                                |
    | _Header value of_ (enter header name)     | `http.request.headers["<header_name>"]`               |
    | _Cookie value of_ (enter cookie name)     | `http.request.cookies["<cookie_name>"]`               |
    | _Query value of_ (enter parameter name)   | `http.request.uri.args["<query_param_name>"]`         |
    | _Host_                                    | `http.host`                                           |
    | _Path_                                    | `http.request.uri.path`                               |
    | _AS Num_                                  | `ip.geoip.asnum`                                      |
    | _Country_                                 | `ip.geoip.country`                                    |
    | _JA3 Fingerprint_                         | `cf.bot_management.ja3_hash`                          |
    | _JSON string value of_ (enter key)        | `lookup_json_string(http.request.body.raw, "<key>")`  |
    | N/A (API only)                            | `lookup_json_integer(http.request.body.raw, "<key>")` |
    | _Body_                                    | `http.request.body.raw`                               |
    | _Body size_ (select operator, enter size) | `http.request.body.size`                              |
    | _Form input value of_ (enter field name)  | `http.request.body.form["<input_field_name>"]`        |
    | N/A (API only)                            | `substring(<field>, <start>[, <end>])`                |

  - The available characteristics depend on your Cloudflare plan. Refer to [Availability](/waf/rate-limiting-rules/#availability) for more information.
  - You cannot use both _IP with NAT support_ and _IP_ as characteristics of the same rate limiting rule.
  - If you use `http.request.headers["<header_name>"]` in an API request, you must enter the header name in lower case, since Cloudflare normalizes header names on the Cloudflare global network.
  - If you use _Cookie value of_, refer to [Recommendations](#recommendations) for additional validations you should implement.
  - You should not use _Header value of_ or _Cookie value of_ as the only characteristic of a rate limiting rule. Refer to [Recommendations](#recommendations) for details.
  - For more information on the `lookup_json_string`, `lookup_json_integer`, and `substring` functions, refer to [Functions](/ruleset-engine/rules-language/functions/) in the Ruleset Engine documentation.
  - You should not use the `cf.colo.id` characteristic (data center ID) as a field in rule expressions. Additionally, `cf.colo.id` values may change without warning. For more information about this rate limiting characteristic, refer to [Determining the rate](/waf/rate-limiting-rules/request-rate/).
  - Cloudflare will consider entire `/64` prefixes as the same IPv6 source address for the purpose of tracking the request rate.

{{<Aside type="note">}}

Use _IP with NAT support_ to handle situations such as requests under NAT sharing the same IP address. Cloudflare uses a variety of privacy-preserving techniques to identify unique visitors, which may include use of session cookies — refer to [Cloudflare Cookies](/fundamentals/get-started/reference/cloudflare-cookies/) for details.

{{</Aside>}}

- **Use custom counting expression** > **Increment counter when** {{<type>}}String{{</type>}}

  - Field name in the API: `counting_expression` (optional).
  - Only available in the Cloudflare dashboard when you enable **Use custom counting expression**.
  - Defines the criteria used for determining the request rate. By default, the counting expression is the same as the rule expression. This default is also applied when you set this field to an empty string (`""`).
  - The counting expression does not extend the rule matching expression defined in **If incoming requests match**. Therefore, you may wish to include the matching expression in the counting expression. For example, you might want to perform rate limiting for clients sending more than five requests to `/api/` resulting in a `403` HTTP status code from the origin server. In this case, the matching expression would be `starts_with(http.request.uri.path, "/api/")` and the counting expression would be `http.response.code eq 403 and starts_with(http.request.uri.path, "/api/")`. If the counting expression did not include the matching expression (that is, if you had set the counting expression to `http.response.code eq 403`), any response with a `403` status code on any URL would increase the counter.
  - The counting expression can include [HTTP response fields](/ruleset-engine/rules-language/fields/#http-response-fields). When there are response fields in the counting expression, the counting will happen after the response is sent.
  - In some cases, you cannot include HTTP response fields in the counting expression due to configuration restrictions. Refer to [Configuration restrictions](#configuration-restrictions) for details.

- **When rate exceeds** > **Requests** {{<type>}}Number{{</type>}}

  - Field name in the API: `requests_per_period`.
  - The number of requests over the period of time that will trigger the rule.

- **When rate exceeds** > **Period** {{<type>}}Number{{</type>}}

  - Field name in the API: `period`.
  - The period of time to consider (in seconds) when evaluating the request rate. The available values [vary according to your Cloudflare plan](/waf/rate-limiting-rules/#availability).
  - The available API values are: `10`, `60` (one minute), `120` (two minutes), `300` (five minutes), `600` (10 minutes), or `3600` (one hour).

- **Then take action** {{<type>}}String{{</type>}}

  - Field name in the API: `action` (rule field).
  - Action to perform when the rate specified in the rule is reached.
  - Use one of the following values: `block`, `challenge`, `js_challenge`, `managed_challenge`, or `log`.

- **For duration** {{<type>}}Number{{</type>}}

  - Field name in the API: `mitigation_timeout`.
  - Once the rate is reached, the rate limiting rule applies the rule action to further requests for the period of time defined in this field (in seconds).
  - In the dashboard, select one of the available values, which [vary according to your Cloudflare plan](/waf/rate-limiting-rules/#availability). The available API values are: `10`, `60` (one minute), `120` (two minutes), `300` (five minutes), `600` (10 minutes), `3600` (one hour), or `86400` (one day).
  - You cannot define a duration when using one of the challenge actions. In this case, when visitors pass a challenge, their corresponding [request counter](/waf/rate-limiting-rules/request-rate/) is set to zero. When visitors with the same values for the rule characteristics make enough requests to trigger the rate limiting rule again, they will receive a new challenge.
  - When using the API, you must set the `mitigation_timeout` value to `0` when the action is `managed_challenge`, `js_challenge`, or `challenge`.

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

## Configuration restrictions

* If the rule expression includes [IP Lists](/fundamentals/global-configurations/lists/ip-lists/), you must enable the **Also apply rate limiting to cached assets** parameter.

* The rule counting expression, defined in the **Increment counter when** parameter, cannot include both [HTTP response fields](/ruleset-engine/rules-language/fields/#http-response-fields) and [IP Lists](/fundamentals/global-configurations/lists/ip-lists/). If you use IP Lists, you must enable the **Also apply rate limiting to cached assets** parameter.

## Recommendations

- If you use _Cookie value of_ as a rate limiting rule characteristic, follow these recommendations:

  - Create a [custom rule](/waf/custom-rules/) that blocks requests with more than one value for the cookie.
  - Validate the cookie value at the origin before performing any demanding server operations.

- Do not use _Header value of_ or _Cookie value of_ as the only characteristic of a rate limiting rule, since in some occasions these characteristics have no value. In this case, the requests would fit in the same [rate limiting counter](/waf/rate-limiting-rules/request-rate/), which could unexpectedly trigger the rule for many visitors.

  To prevent this situation, Cloudflare recommends that you use a second characteristic in your rate limiting rule that always has a defined value, such as _IP_ or _AS Num_.
