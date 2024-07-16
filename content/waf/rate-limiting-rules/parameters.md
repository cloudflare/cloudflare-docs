---
pcx_content_type: reference
title: Rate limiting parameters
weight: 18
---

# Rate limiting parameters

The available rate limiting rule parameters are described in the following sections.

## Parameter reference

### If incoming requests match

- Data type: `String`.
- Field name in the API: `expression` (rule field).

Defines the criteria for the rate limiting rule to match a request.

### Also apply rate limiting to cached assets

- Data type: `Boolean`.
- Field name in the API: `requests_to_origin` (optional, with the opposite meaning of the Cloudflare dashboard option).

If this parameter is disabled (or when the `requests_to_origin` API field is set to `true`), only the requests going to the origin (that is, requests that are not cached) will be considered when determining the request rate.

In some cases, you cannot disable the **Also apply rate limiting to cached assets** parameter due to configuration restrictions. Refer to [Configuration restrictions](#configuration-restrictions) for details.

### With the same characteristics

- Data type: `Array<String>`.
- Field name in the API: `characteristics`.

Set of parameters defining how Cloudflare tracks the request rate for the rule.

Use one or more of the following characteristics:

{{<table-wrap style="font-size: 87%">}}

<table>
  <thead>
    <tr>
      <th>Dashboard value</th>
      <th>API value</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>N/A<br />(implicitly included)</td>
      <td><code>cf.colo.id</code> (mandatory)</td>
      <td><ul><li><a href="#do-not-use-cfcoloid-as-a-field-in-expressions">Do not use in expressions</a></li></ul></td>
    </tr>
    <tr>
      <td><strong>IP</strong></td>
      <td><code>ip.src</code></td>
      <td>
        <ul>
          <li><a href="#incompatible-characteristics">Incompatible with <strong>IP with NAT support</strong></a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>IP with NAT support</strong></td>
      <td><code>cf.unique_visitor_id</code></td>
      <td>
        <ul>
          <li><a href="#incompatible-characteristics">Incompatible with <strong>IP</strong></a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <strong>Header value of</strong><br />
        (enter header name)
      </td>
      <td>
        <code>http.request.headers[&quot;&lt;header_name&gt;&quot;]</code>
      </td>
      <td><ul><li><a href="#use-a-lowercased-header-name-for-api-users">Use lowercased header name in API</a></li></ul><ul><li><a href="#missing-field-versus-empty-value">Missing field versus empty value</a></li></ul></td>
    </tr>
    <tr>
      <td>
        <strong>Cookie value of</strong><br />
        (enter cookie name)
      </td>
      <td>
        <code>http.request.cookies[&quot;&lt;cookie_name&gt;&quot;]</code>
      </td>
      <td>
        <ul>
          <li><a href="#recommended-configurations-when-using-cookie-value-of">Recommended configurations</a></li>
          <li><a href="#missing-field-versus-empty-value">Missing field versus empty value</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <strong>Query value of</strong><br />
        (enter parameter name)
      </td>
      <td>
        <code>http.request.uri.args[&quot;&lt;query_param_name&gt;&quot;]</code>
      </td>
      <td><ul><li><a href="#missing-field-versus-empty-value">Missing field versus empty value</a></li></ul></td>
    </tr>
    <tr>
      <td><strong>Host</strong></td>
      <td><code>http.host</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong>Path</strong></td>
      <td><code>http.request.uri.path</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong>AS Num</strong></td>
      <td><code>ip.geoip.asnum</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong>Country</strong></td>
      <td><code>ip.geoip.country</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong>JA3 Fingerprint</strong></td>
      <td><code>cf.bot_management.ja3_hash</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong>JA4</strong></td>
      <td><code>cf.bot_management.ja4</code></td>
      <td></td>
    </tr>
    <tr>
      <td>
        <strong>JSON string value of</strong><br />
        (enter key)
      </td>
      <td>
        <code>lookup_json_string(http.request.body.raw, &quot;&lt;key&gt;&quot;)</code>
      </td>
      <td>
        <ul>
          <li><a href="#missing-field-versus-empty-value">Missing field versus empty value</a></li>
          <li><a href="/ruleset-engine/rules-language/functions/#function-lookup_json_string"><code>lookup_json_string()</code> function reference</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>JSON integer value of</strong><br />
        (enter key)
      </td>
      <td>
        <code>lookup_json_integer(http.request.body.raw, &quot;&lt;key&gt;&quot;)</code>
      </td>
      <td>
        <ul>
          <li><a href="#missing-field-versus-empty-value">Missing field versus empty value</a></li>
          <li><a href="/ruleset-engine/rules-language/functions/#function-lookup_json_integer"><code>lookup_json_integer()</code> function reference</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Form input value of</strong><br />(enter field name)</td>
      <td>
        <code>http.request.body.form[&quot;&lt;input_field_name&gt;&quot;]</code>
      </td>
      <td><ul><li><a href="#missing-field-versus-empty-value">Missing field versus empty value</a></li></ul></td>
    </tr>
    <tr>
      <td>
        <strong>JWT claim of</strong><br />
        (enter token configuration ID, claim name)
      </td>
      <td>
        <code>lookup_json_string(http.request.jwt.claims[&quot;&lt;token_configuration_id&gt;&quot;][0], &quot;&lt;claim_name&gt;&quot;)</code>
      </td>
      <td>
        <ul>
          <li><a href="#missing-field-versus-empty-value">Missing field versus empty value</a></li>
          <li><a href="/api-shield/security/jwt-validation/transform-rules/">JWT Validation reference</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Body</strong></td>
      <td><code>http.request.body.raw</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong>Body size</strong><br />(select operator, enter size)</td>
      <td><code>http.request.body.size</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong>Custom</strong><br />
        (enter expression)
      </td>
      <td>
        Enter a custom expression. You can use a function such as <code>substring()</code> or <code>lower()</code>, or enter a more complex expression.
      </td>
      <td>
        <ul>
          <li><a href="/ruleset-engine/rules-language/functions/">Functions</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

{{</table-wrap>}}

The available characteristics depend on your Cloudflare plan. Refer to [Availability](/waf/rate-limiting-rules/#availability) for more information.

{{<Aside type="warning">}}
For important details about these characteristics, refer to [Notes about rate limiting characteristics](#notes-about-rate-limiting-characteristics).
{{</Aside>}}

### Increment counter when

- Data type: `String`.
- Field name in the API: `counting_expression` (optional).

Only available in the Cloudflare dashboard when you enable **Use custom counting expression**.

Defines the criteria used for determining the request rate. By default, the counting expression is the same as the rule matching expression (defined in **If incoming requests match**). This default is also applied when you set this field to an empty string (`""`).

The counting expression can include [HTTP response fields](/ruleset-engine/rules-language/fields/#http-response-fields). When there are response fields in the counting expression, the counting will happen after the response is sent.

In some cases, you cannot include HTTP response fields in the counting expression due to configuration restrictions. Refer to [Configuration restrictions](#configuration-restrictions) for details.

{{<Aside type="note" header="The counting expression does not extend the rule expression">}}
If you set a custom counting expression, it will not automatically extend the rule matching expression. Therefore, you may wish to include the matching expression in the counting expression.

For example, you might want to perform rate limiting for clients sending more than five requests to `/api/` resulting in a `403` HTTP status code from the origin server. In this case, the matching expression would be `starts_with(http.request.uri.path, "/api/")` and the counting expression would be `http.response.code eq 403 and starts_with(http.request.uri.path, "/api/")`. If the counting expression did not include the matching expression (that is, if you had set the counting expression to `http.response.code eq 403`), any response with a `403` status code on any URL would increase the counter.
{{</Aside>}}

### When rate exceeds > Requests

- Data type: `Integer`.
- Field name in the API: `requests_per_period`.

The number of requests over the period of time that will trigger the rule.

### When rate exceeds > Period

- Data type: `Integer`.
- Field name in the API: `period`.

The period of time to consider (in seconds) when evaluating the request rate. The available values [vary according to your Cloudflare plan](/waf/rate-limiting-rules/#availability).

The available API values are: `10`, `60` (one minute), `120` (two minutes), `300` (five minutes), `600` (10 minutes), or `3600` (one hour).

### Then take action

- Data type: `String`.
- Field name in the API: `action` (rule field).

Action to perform when the rate specified in the rule is reached.

Use one of the following values in the API: `block`, `challenge`, `js_challenge`, `managed_challenge`, or `log`.

If you select the _Block_ action, you can define a custom response using the following parameters:

- [**With response type**](#with-response-type)
- [**With response code**](#with-response-code)
- [**Response body**](#response-body)

#### With response type (for _Block_ action) { #with-response-type }

- Data type: `String`.
- Field name in the API: `response` > `content_type` (optional).

Defines the content type of a custom response when blocking a request due to rate limiting. Only available when you set the [rule action](#then-take-action) to _Block_.

Available API values: `application/json`, `text/html`, `text/xml`, or `text/plain`.

#### With response code (for _Block_ action)  { #with-response-code }

- Data type: `Integer`.
- Field name in the API: `response` > `status_code` (optional).

Defines the HTTP status code returned to the visitor when blocking the request due to rate limiting. Only available when you set the [rule action](#then-take-action) to _Block_.

You must enter a value between `400` and `499`. The default value is `429` (`Too many requests`).

#### Response body (for _Block_ action) { #response-body }

- Data type: `String`.
- Field name in the API: `response` > `content` (optional).

Defines the body of the returned HTTP response when the request is blocked due to rate limiting. Only available when you set the [rule action](#then-take-action) to _Block_.

The maximum field size is 30 KB.

### For duration

- Data type: `Integer`.
- Field name in the API: `mitigation_timeout`.

Once the rate is reached, the rate limiting rule applies the rule action to further requests for the period of time defined in this field (in seconds).

In the dashboard, select one of the available values, which [vary according to your Cloudflare plan](/waf/rate-limiting-rules/#availability). The available API values are: `0`, `10`, `60` (one minute), `120` (two minutes), `300` (five minutes), `600` (10 minutes), `3600` (one hour), or `86400` (one day).

Customers on Free, Pro, and Business plans cannot select a duration when using a [challenge action](/waf/reference/cloudflare-challenges/#available-challenges) — their rate limiting rule will always perform request throttling for these actions. With request throttling, you do not define a duration. When visitors pass a challenge, their corresponding [request counter](/waf/rate-limiting-rules/request-rate/) is set to zero. When visitors with the same values for the rule characteristics make enough requests to trigger the rate limiting rule again, they will receive a new challenge.

Enterprise customers can always configure a duration (or mitigation timeout), even when using one of the challenge actions.

{{<Aside type="note" header="Notes for API users">}}
* If you are on a Free, Pro, or Business plan and are using the API, you must enable request throttling by setting the `mitigation_timeout` value to `0` (zero) when using the actions `managed_challenge`, `js_challenge`, or `challenge`.
* Enterprise customers can use a `mitigation_timeout` value greater than or equal to `0` (zero), regardless of the rate limiting action they select.
{{</Aside>}}

### With the following behavior

- Data type: `Integer`.
- Field name in the API: `mitigation_timeout`.

Defines the exact behavior of the selected action.

{{<Aside type="note">}}
Only Enterprise customers can throttle requests using the _Block_ action.

Other users can throttle requests using a challenge action, or perform the action during a period of time. Refer to [For duration](#for-duration) for details.
{{</Aside>}}

The action behavior can be one of the following:

- **Perform action during the selected duration**: Applies the configured action to all requests received during the selected duration.<br>To configure this behavior via API, set `mitigation_timeout` to a value greater than zero. Refer to [For duration](#for-duration) for more information.

    ![Chart displaying the action of a rate limiting rule configured to apply its action during the entire mitigation period](/images/waf/rate-limiting-rules/behavior-apply-action-for-duration.png)

- **Throttle requests over the maximum configured rate**: Applies the selected action to incoming requests over the configured limit, allowing other requests.<br>To configure this behavior via API, set `mitigation_timeout` to `0` (zero).

    ![Chart displaying the behavior of a rate limiting configured to throttle requests above the configured limit](/images/waf/rate-limiting-rules/behavior-throttle.png)

## Notes about rate limiting characteristics

### Use cases of IP with NAT support

Use **IP with NAT support** to handle situations such as requests under NAT sharing the same IP address. Cloudflare uses a variety of privacy-preserving techniques to identify unique visitors, which may include use of session cookies. Refer to [Cloudflare Cookies](/fundamentals/reference/policies-compliances/cloudflare-cookies/) for details.

### Incompatible characteristics

You cannot use both **IP with NAT support** and **IP** as characteristics of the same rate limiting rule.

### Do not use `cf.colo.id` as a field in expressions

You should not use the `cf.colo.id` characteristic (data center ID) as a field in rule expressions. Additionally, `cf.colo.id` values may change without warning. For more information about this rate limiting characteristic, refer to [How Cloudflare determines the request rate](/waf/rate-limiting-rules/request-rate/).

### Use a lowercased header name (for API users)

If you use the **Header value of** characteristic in an API request (with `http.request.headers["<header_name>"]`), you must enter the header name in lower case, since Cloudflare normalizes header names on the Cloudflare global network.

### Missing field versus empty value

If you use the **Header value of**, **Cookie value of**, **Query value of**, **JSON string value of**, `lookup_json_integer(...)`, or **Form input value of** characteristic and the specific header/cookie/parameter/JSON key/form field name is not present in the request, the rate limiting rule may still apply to the request, depending on your counting expression.

If you do not filter out such requests, there will be a specific [request counter](/waf/rate-limiting-rules/request-rate/) for requests where the field is not present, which will be different from the request counter where the field is present with an empty value.

For example, to consider only requests where a specific HTTP header is present in the context of a specific rate limiting rule, adjust the rule counting expression so it contains something similar to the following:

`and len(http.request.headers["<header_name>"]) > 0`

Where `<header_name>` is the same header name used as a rate limiting characteristic.

### Recommended configurations when using Cookie value of

If you use **Cookie value of** as a rate limiting rule characteristic, follow these recommendations:

- Create a [custom rule](/waf/custom-rules/) that blocks requests with more than one value for the cookie.
- Validate the cookie value at the origin before performing any demanding server operations.

---

## Configuration restrictions

* If the rule expression [includes IP lists](/waf/tools/lists/use-in-expressions/), you must enable the **Also apply rate limiting to cached assets** parameter.

* The rule counting expression, defined in the **Increment counter when** parameter, cannot include both [HTTP response fields](/ruleset-engine/rules-language/fields/#http-response-fields) and [IP lists](/waf/tools/lists/custom-lists/#ip-lists). If you use IP lists, you must enable the **Also apply rate limiting to cached assets** parameter.
