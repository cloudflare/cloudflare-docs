---
title: Cache Rules (beta)
pcx_content_type: concept
---

# Cache Rules (beta)

Use cache rules to customize cache properties of your HTTP requests. For example, create a rule to specify how long to cache a resource in the Cloudflare edge network.

## Availability

The following table describes Cache Rules availability per plan.

<table>
  <tbody>
    <th>Plan</th>
    <th>Cache Rules</th>
    <tr>
      <td>Enterprise</td>
      <td>125</td>
    </tr>
    <tr>
      <td>Business</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Pro</td>
      <td>25</td>
    </tr>
    <tr>
      <td>Free</td>
      <td>10</td>
    </tr>
  </tbody>
</table>

## Create Cache Rules in the dashboard

To create a new cache rule:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Caching** > **Cache Rules**.
3. Select **Create cache rule**.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, define the [rule expression](/firewall/cf-dashboard/edit-expressions/#expression-builder). Use the **Field** drop-down list to choose an HTTP property (refer to [Available fields](/cache/about/cache-rules/#available-fields) for the list of available fields). For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.
6. Under **Then**, in the **Cache status** section, select **Bypass cache**, if matching requests will bypass cache and fetch a response from the origin server or **Eligible for cache** if requests will be eligible for cache. Note that proper [origin cache-control headers](/cache/about/cache-control/) are also required for cache eligibility.
7. If you select **Eligible for cache**, you can customize the following options:
    - **Edge TTL** - Select **Respect origin** if matching requests will respect cache headers received from the origin server, or **Override origin**. If you wish to override the Edge TTL value, you need to select how long you want to cache resources in the Cloudflare edge network.
        - In **Status code TTL** you can define the cache time-to-live (TTL) duration for one or more response status codes received from the origin server. This setting can be applied to a **single** status code, to a **greater than** or **less than** status code or to a **range** of status codes. For more information, refer to [Status code TTL](/cache/how-to/configure-cache-status-code/).
    - **Browser TTL** - Select if you want to **Respect origin** or **Override origin**. If you wish to override the browser TTL value, define how long resources cached by client browsers will remain valid. For more information, refer to [Browser Cache TTL](/cache/about/edge-browser-cache-ttl/#browser-cache-ttl).
    - **Cache Key** - Define the request components used to define a [custom cache key](/cache/about/cache-keys/). A cache key is an identifier that Cloudflare uses for a file stored in the cache. These are the options that you can customize:
        - You can switch on or off [Cache by device type](/automatic-platform-optimization/reference/cache-device-type/), [Cache deception armor](/cache/about/cache-deception-armor/), and [Ignore query string order](https://support.cloudflare.com/hc/articles/360023040812).
        - In the **Query string** section, you can select **All query string parameters**, **All query string parameters except** and enter an exception, **Only these parameters** and enter the parameters or **Ignore query string**.
        - In the **Headers** section, you can include headers names and their values, and check the presence of another header, and **Include origin header**.
        - In the **Cookie** section, you can include cookie names and their values, and check the presence of another cookie.
        - In the **Host** section, you can select **Use original host** and **Resolved host**.
        - In the **User** section, you can select **Device type**, **Country**, and **Language**.
    - **Serve stale content** - Turn on or off if you want to serve stale content while updating from the origin server. If serving stale content is disabled, origin cache-control headers will be used to tell Cloudflare how to handle content from the origin.
    - **Respect Strong ETags** - Turn on or off byte-for-byte equivalency checks between the Cloudflare cache and the origin server. When enabled, Cloudflare will use strong ETag header validation to ensure that resources in the Cloudflare cache and on the origin server are byte-by-byte identical. If disabled, Cloudflare converts ETag headers into weak ETag headers.
    - **Origin error page pass-thru** - Turn on or off Cloudflare error pages generated from issues sent from the origin server. If enabled, this setting triggers error pages issued by the origin.
8. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

### Available fields

These are the fields available for Cache Rules:

- Cookie - `http.cookie`
- Hostname - `http.host`
- Referer - `http.referer`
- SSL/HTTPS - `ssl`
- URI Full - `http.request.full_uri`
- URI - `http.request.uri`
- URI Path - `http.request.uri.path`
- URI Query String - `http.request.uri.query`
- User Agent - `http.user_agent`
- X-Forwarded-For - `http.x_forwarded_for`

Refer to [Fields](/ruleset-engine/rules-language/fields/) for reference information on these fields.

## Create Cache Rules via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create a Cache Rule via API.

When creating a Configuration Rule via API, make sure you:

- Set the rule action to `set_cache_settings`.
- Define the parameters in the `action_parameters` field according to the settings you wish to override for matching requests.
- You deploy the cache rule to the `http_request_cache_settings` phase entry point ruleset.

### Create a Cache Rule

1. Use the [List existing rulesets](/ruleset-engine/rulesets-api/view/#list-existing-rulesets) method to obtain the list of rules already present in the `http_request_cache_settings` phase entry point ruleset.
2. If the phase ruleset does not exist, create it using the [Create ruleset](/ruleset-engine/rulesets-api/create/) method with the zone-level endpoint. In the new ruleset properties, set the following values:
    - kind: `zone`
    - phase: `set_cache_settings`
3. Alternatively, you can also use the [Update ruleset](/ruleset-engine/rulesets-api/update/) method to add a Cache Rule to the list of ruleset rules.

### Required API token permissions

The API token used in API requests to manage Cache Rules must have the following permissions:

- Zone > Config Rules > Edit
- Account Rulesets > Edit  
- Account Filter Lists > Edit

### API examples

<details>
<summary>Edge cache TTL</summary>
<div>

In this example, `edge_ttl` is set to override origin and cache resources will be cached the Cloudflare edge network for 10 seconds. In this setting, you can choose either to `trust_origin` or `override_origin`. In this example, `status_code_ttl` is also defined for the code `404` with the duration of 30 seconds. Instead of a single status code, you can also define a range.

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_cache_settings/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
    "rules": [
        {
            "description": "example-cache-rule",
            "expression": "http.cookie eq \"a=b\" and http.host eq \"example.com\"",
            "action": "set_cache_settings",
            "action_parameters": {
                "cache": true,
                "edge_ttl": {
                    "mode": "override_origin",
                    "default": 10,
                    "status_code_ttl": [
                        {
                            "status_code": 404,
                            "value": 30
                        }
                    ]
                }
            }
        }
    ]
}
'
```

</div>
</details>

<details>
<summary>Browser Cache TTL</summary>
<div>

In this example, `browser_ttl` is set to cache a resource in the Cloudflare edge network for 30 seconds. In this setting, you can choose either to `respect_origin` or `override_origin`. Like in the example, if you select to override the origin, you need to define how long resources cached by client browsers will remain valid.

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_cache_settings/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
    "rules": [
        {
            "description": "example-cache-rule",
            "expression": "http.cookie eq \"a=b\" and http.host eq \"example.com\"",
            "action": "set_cache_settings",
            "action_parameters": {
                "cache": true,
                "browser_ttl": {
                    "mode": "override_origin",
                    "default": 30
                }
            }
        }
    ]
}
'
```

</div>
</details>

<details>
<summary>Cache Key</summary>
<div>

In this example, `cache_deception_armor` and `ignore_query_strings_order` parameters are set to `true`. `query_string` is set to query all query string parameters. The `header` parameter is set to include `header1` and check presence of `header_1` and the `origin header` is also included. The `cookie` parameter is set to include `cookie1` and check the presence of `cookie_1` and the `origin header` is also included. The parameter `host : resolved` is set to `false`, `geo`, and `lang` are also set to `false`.

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_cache_settings/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
    "rules": [
        {
            "description": "example-cache-rule",
            "expression": "http.cookie eq \"a=b\" and http.host eq \"example.com\"",
            "action": "set_cache_settings",
            "action_parameters": {
                "cache": true,
                "cache_key": {
                    "ignore_query_strings_order": true,
                    "cache_deception_armor": true,
                    "custom_key": {
                        "query_string": {
                            "include": "*"
                        },
                        "header": {
                            "include": [
                                "header1"
                            ],
                            "check_presence": [
                                "header_1"
                            ]
                        },
                         "host": {
                                "resolved": false
                        },
                        "user": {
                            "device_type": true,
                            "geo": false,
                            "lang": false
                        }
                        "cookie": {
                            "include": [
                                "cookie1"
                            ],
                            "check_presence": [
                                "cookie_1"
                            ],
                        }
                    }
                }
            }
        }
    ]
}
'
```

</div>
</details>

<details>
<summary>Serve stale content</summary>
<div>

In this example, `serve_stale` is set to serve stale content while updating from the origin server.

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_cache_settings/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
    "rules": [
        {
            "description": "example-cache-rule",
            "expression": "http.cookie eq \"a=b\" and http.host eq \"example.com\"",
            "action": "set_cache_settings",
            "action_parameters": {
                "cache": true,
                "serve_stale": {
                    "disable_stale_while_updating": true
                }
            }
        }
    ]
}
'
```

</div>
</details>

<details>
<summary>Respect strong ETags</summary>
<div>

In this example, `respect_strong_etags` is set to `true` to ensure that resources in the Cloudflare cache and on the origin server are byte-by-byte identical.

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_cache_settings/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
    "rules": [
        {
            "description": "example-cache-rule",
            "expression": "http.cookie eq \"a=b\" and http.host eq \"example.com\"",
            "action": "set_cache_settings",
            "action_parameters": {
                "cache": true,
                "respect_strong_etags": true
            }
        }
    ]
}
'
```

</div>
</details>

<details>
<summary>Origin error page pass-thru</summary>
<div>

In this example, `origin_error_page_passthru` is set to `true` to trigger error pages issued by the origin.

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_cache_settings/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
    "rules": [
        {
            "description": "example-cache-rule",
            "expression": "http.cookie eq \"a=b\" and http.host eq \"example.com\"",
            "action": "set_cache_settings",
            "action_parameters": {
                "cache": true,
                "origin_error_page_passthru": true
            }
        }
    ]
}
'
```

</div>
</details>