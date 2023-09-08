---
title: Cache Rules (beta)
pcx_content_type: concept
---

{{<beta>}} Cache Rules {{</beta>}}

Use Cache Rules to customize cache properties of your HTTP requests. For example, create a rule to specify how long to cache a resource in the Cloudflare global network.

## Availability

The following table describes Cache Rules availability per plan.

{{<feature-table id="cache.cache_rules">}}

## Order and priority

Cache rules are unique, unlike Page Rules. This is how they are applied:

1. Cache Rules are stackable. This means that multiple matching rules will be combined and applied. So if multiple cache rules match the same URL, then the features set in those cache rules will all be applied. If several matching rules set a value for the same setting, the value in the last matching rule wins. For an example of a similar scenario where multiple rules match, refer to the [Origin Rules FAQ](/rules/origin-rules/faq/#what-happens-if-more-than-one-origin-rule-matches-the-current-request).

2. For conflicting settings (for example, bypass cache versus eligible for cache), the last matching rule wins. For example, if Cache Rule #1 is set to cache everything on `example.com/images` and Cache Rule #2 is set to bypass cache on `example.com`, then cache will be bypassed for all URLs that match `example.com`, since rule #2 is the last matching rule.

3. If you have Page Rules implemented for caching on the same path, Cache Rules will take precedence by design. In the near future, Cloudflare plans on releasing a one-click migration tool for Page Rules.

## Execution order of Rules products

{{<render file="_product_execution_order.md" productFolder="rules">}}

## Create Cache Rules in the dashboard

To create a new cache rule:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Caching** > **Cache Rules**.
3. Select **Create cache rule**.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, define the [rule expression](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-builder). Use the **Field** drop-down list to choose an HTTP property (refer to [Available fields](/cache/how-to/cache-rules/#available-fields) for the list of available fields). For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.
    To create a wildcard rule that applies to everything under a URI directory (for example, `/images`), select the option _URI_ in **Field**, _starts with_ in **Operator**, and `/images` in **Value**.
6. Under **Then**, in the **Cache status** section, select **Bypass cache**, if matching requests will bypass cache and fetch a response from the origin server or **Eligible for cache** if requests will be eligible for cache. Note that proper [origin cache-control headers](/cache/concepts/cache-control/) are also required for cache eligibility.

{{<Aside type="note">}}

Be aware that when you select **Eligible for cache** in Cache Rules, this is equivalent to [cache everything](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#cache-everything) cache level. If you do not enable eligible for cache, the expected behavior is the standard cache level present in Page Rules.

{{</Aside>}}

7. If you select **Eligible for cache**, you can customize the following options:

<details>
<summary>Edge TTL</summary>
<div>

Select **Respect origin** if matching requests will respect cache headers received from the origin server, or **Override origin**. If you wish to override the Edge TTL value, you need to select how long you want to cache resources in the Cloudflare global network.
- In **Status code TTL** you can define the cache time-to-live (TTL) duration for one or more response status codes received from the origin server. This setting can be applied to a _Single code_ status code, to a _Greater than_ or _Less than_ status code or to a _Range_ of status codes. For more information, refer to [Status code TTL](/cache/how-to/configure-cache-status-code/).

</div>
</details>

<details>
<summary>Browser TTL</summary>
<div>

Select if you want to **Respect origin** or **Override origin**. If you wish to override the browser TTL value, define how long resources cached by client browsers will remain valid. For more information, refer to [Browser Cache TTL](/cache/how-to/edge-browser-cache-ttl/#browser-cache-ttl).

</div>
</details>

<details>
<summary>Cache Key</summary>
<div>

Define the request components used to define a [custom cache key](/cache/how-to/cache-keys/). A cache key is an identifier that Cloudflare uses for a file stored in the cache. These are the options that you can customize:
 - You can switch on or off [Cache by device type](/automatic-platform-optimization/reference/cache-device-type/), [Cache deception armor](/cache/cache-security/cache-deception-armor/), [Ignore query string](/cache/troubleshooting/cache-everything-ignore-query-strings/), and [Enable query string sort](/cache/how-to/cache-keys/#query-string).

Enterprise customers have these additional options for custom cache keys:

 - In the **Query string** section, you can select **All query string parameters**, **All query string parameters except** and enter an exception, **Only these parameters** and enter the parameters, or **Ignore query string**.
 - In the **Headers** section, you can include headers names and their values, check the presence of another header, and **Include origin header**.
 - In the **Cookie** section, you can include cookie names and their values, and check the presence of another cookie.
 - In the **Host** section, you can select **Use original host** and **Resolved host**.
 - In the **User** section, you can select **Device type**, **Country**, and **Language**.

</div>
</details>

<details>
<summary>Serve stale content</summary>
<div>

Enable or disable serving stale content while updating from the origin server. If serving stale content is disabled, origin cache-control headers will be used to tell Cloudflare how to handle content from the origin.

</div>
</details>

<details>
<summary>Respect Strong ETags</summary>
<div>

Turn on or off byte-for-byte equivalency checks between the Cloudflare cache and the origin server. When enabled, Cloudflare will use strong ETag header validation to ensure that resources in the Cloudflare cache and on the origin server are byte-by-byte identical. If disabled, Cloudflare converts ETag headers into weak ETag headers.

</div>
</details>

<details>
<summary>Origin error page pass-thru</summary>
<div>

Turn on or off Cloudflare error pages generated from issues sent from the origin server. If enabled, this setting triggers error pages issued by the origin.

</div>
</details>

8. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

### Available fields

These are the fields available for Cache Rule expressions:

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
    - phase: `http_request_cache_settings`
3. Alternatively, you can also use the [Update ruleset](/ruleset-engine/rulesets-api/update/) method to add a Cache Rule to the list of ruleset rules.

### Required API token permissions

The API token used in API requests to manage Cache Rules must have the following permissions:

- _Zone_ > _Config Rules_ > _Edit_
- _Account Rulesets_ > _Edit_
- _Account Filter Lists_ > _Edit_

### API examples

These examples are setting all the Cache Rules of a zone to a single rule, since using these examples directly will cause any existing rules to be deleted.

<details>
<summary>Edge cache TTL</summary>
<div>

In this setting, you can choose either to `respect_origin` (first example) or `override_origin` (second example). In this first example, `edge_ttl` is set to `respect_origin` and cache TTL is set by status code `404` with a duration of 30 seconds.

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
                    "mode": "respect_origin",
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

In this second example, `status_code_ttl` is set to `override_origin` and cache TTL is set by status code `404` with a duration of 30 seconds. Instead of a single status code, you can also define a range.


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

For `set_cache_settings`, you can choose either to `respect_origin` (first example) or `override_origin` (second example).

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
                    "mode": "respect_origin"
                }
            }
        }
    ]
}
'
```

In this second example, `override_origin` is selected, so you need to define how long resources cached by client browsers will remain valid, in this case 30 seconds.

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

In this example, `cache_deception_armor` and `ignore_query_strings_order` parameters are set to `true`. `query_string` is set to query all query string parameters. The `header` parameter is set to include `header1`, check presence of `header_1` and the `origin header` is also included. The `cookie` parameter is set to include `cookie1`, check the presence of `cookie_1` and the `origin header` is also included. The parameter `host : resolved` is set to `false`, `geo`, and `lang` are also set to `false`.

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

In this example, `serve_stale` is set to not serve stale content while updating from the origin server.

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

## Terraform example

The following example defines a single cache rule for a zone using Terraform. The rule configures several cache settings and sets a custom cache key for incoming requests addressed at `example.net`.

<details>
<summary>Terraform <code>cloudflare_ruleset</code> resource</summary>
<div>

```tf
# Cache rule configuring cache settings and defining custom cache keys
resource "cloudflare_ruleset" "cache_rules_example" {
  zone_id     = "<ZONE_ID>"
  name        = "Set cache settings"
  description = "Set cache settings for incoming requests"
  kind        = "zone"
  phase       = "http_request_cache_settings"

  rules {
    action = "set_cache_settings"
    action_parameters {
      edge_ttl {
        mode    = "override_origin"
        default = 60
        status_code_ttl {
          status_code = 200
          value       = 50
        }
        status_code_ttl {
          status_code_range {
            from = 201
            to   = 300
          }
          value = 30
        }
      }
      browser_ttl {
        mode = "respect_origin"
      }
      serve_stale {
        disable_stale_while_updating = true
      }
      respect_strong_etags = true
      cache_key {
        ignore_query_strings_order = false
        cache_deception_armor      = true
        custom_key {
          query_string {
            exclude = ["*"]
          }
          header {
            include        = ["habc", "hdef"]
            check_presence = ["habc_t", "hdef_t"]
            exclude_origin = true
          }
          cookie {
            include        = ["cabc", "cdef"]
            check_presence = ["cabc_t", "cdef_t"]
          }
          user {
            device_type = true
            geo         = false
          }
          host {
            resolved = true
          }
        }
      }
      origin_error_page_passthru = false
    }
    expression  = "(http.host eq \"example.net\")"
    description = "Set cache settings and custom cache key for example.net"
    enabled     = true
  }
}
```

</div>
</details>

For additional guidance on using Terraform with Cloudflare, refer to [Terraform](/terraform/).
