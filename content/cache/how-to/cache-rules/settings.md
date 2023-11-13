---
title: Available settings
pcx_content_type: reference
weight: 6
meta:
  title: Cache Rules settings
---

# Available settings

These are the settings that you can configure when creating a cache rule.

## Fields 

The fields available for Cache Rule matching expressions in the Expression Builder are:

* Cookie - `http.cookie`
* Hostname - `http.host`
* Referer - `http.referer`
* SSL/HTTPS - `ssl`
* URI Full - `http.request.full_uri`
* URI - `http.request.uri`
* URI Path - `http.request.uri.path`
* URI Query String - `http.request.uri.query`
* User Agent - `http.user_agent`
* X-Forwarded-For - `http.x_forwarded_for`
* Request Headers - `http.request.headers`
* Cookie value of - `http.request.cookies`

For a list of all available fields refer to [Fields](/ruleset-engine/rules-language/fields/).

{{<Aside type="note">}}
Not all fields are available as a trigger for Cache Rules due to incompatibility with [Purge](/cache/how-to/purge-cache/).
{{</Aside>}}

## Operators

The operators available for Cache Rule expressions are:

* equals 
* does not equal 
* contains 
* does not contain 
* matches regex 
* does not match regex
* is in
* is not in
* starts with
* ends with
* does not start with
* does not end with

{{<Aside type="note">}}
Not all operators are available for every selected field.
{{</Aside>}}

## Cache eligibility

In cache eliginility, you have the option to select Bypass cache if you want matching requests to not be cached, or Eligible for cache if you want Cloudflare to attempt to cache them.

### Bypass cache

When creating a cache rule, you have the option to select Bypass cache if you want matching requests to not be cached. Alternatively, you can use [Development Mode](/cache/reference/development-mode/), if you want to bypass cache for shorter periods.

### Eligible for cache settings

When you select eligible for cache, you can change the configuration settings described below.

{{<Aside type="note">}}
Currently, Cache Rules are not compatible with Image Resizing. Cache Rules will not be applied to Image Resizing requests. Page Rules are supported.
{{</Aside>}}

#### Edge TTL 

Edge Cache TTL refers to the maximum cache time-to-live (TTL), or how long an asset should be considered fresh or available to serve from Cloudflare’s cache in response to requests.

You can choose to bypass cache if cache-control is not present, by selecting **Use cache control-header if present, bypass cache if not**. You can also select to **Use cache-control header if present, use default Cloudflare caching behavior if not**. Alternatively, select **Ignore cache-control header and use this TTL** and choose how long you want to cache resources from the available timing dropdown.

Additionally, in the **Edge Cache TTL** section, you can select how long you would like a particular matching status code’s content to be cached in Cloudflare’s global network. In **Status Code TTL** you can define the TTL duration for one or more response status codes received from the origin server. This setting can be applied to a _Single code_ status code, to a _Greater than or equal_ or _Less than or equal_ status code, or to a _Range_ of status codes. For more information, refer to [Status code TTL](/cache/how-to/configure-cache-status-code/).

{{<details header="API information">}}

API configuration object name: `"edge_ttl"`.

{{<table-wrap>}}
API values | Configuration
---------- | ------------
`respect_origin` | Use cache-control header if present, use default [Cloudflare caching behavior](/cache/concepts/default-cache-behavior/) if not.
`override_origin` | Ignore cache-control header and use this TTL.
`bypass_by_default` | Use cache control-header if present, bypass cache if not.
{{</table-wrap>}}

```json
---
header: API configuration example
---
"action_parameters": {
    "cache": true,
    "edge_ttl": {
        "status_code_ttl": [
            {
                "status_code_range": {
                    "to": 299
                },
                "value": 86400
            },
            {
                "status_code_range": {
                    "from": 300,
                    "to": 499
                },
                "value": 0  // no-cache
            },
            {
                "status_code_range": {
                    "from": 500
                },
                "value": -1  // no-store
            }
        ],
        "mode": "respect_origin"
    }
}


```

Refer to [Create a cache rule via API](/cache/how-to/cache-rules/create-api/#example-requests) for complete API examples.

{{</details>}}

#### Browser TTL

Browser TTL refers to the maximum cache time-to-live (TTL) that an asset should be considered available to serve from the browser’s cache.

Select if you want to **Bypass cache**, **Respect origin**, or **Override origin**. If you wish to override the browser TTL value, define how long resources cached by client browsers will remain valid from the dropdown menu. For more information, refer to [Browser Cache TTL](/cache/how-to/edge-browser-cache-ttl/#browser-cache-ttl).

{{<details header="API information">}}

API configuration object name: `"browser_ttl"`.

API values for the `"mode"` property: `"respect_origin"`, `"override_origin"`, `"bypass_by_default"`.
<br>

API values for the `"default"` property (integer): values available depend on your plan. Refer to [Browser Cache TTL](/cache/how-to/edge-browser-cache-ttl/#browser-cache-ttl).

```json
---
header: API configuration example
---
"action_parameters": {
  "cache": true,
  "browser_ttl" : {
    "mode": "override_origin",
    "default": 1000
  }
}
```

Refer to [Create a cache rule via API](/cache/how-to/cache-rules/create-api/#example-requests) for complete API examples.

{{</details>}}

#### Cache Key

Cache keys refer to the criteria that Cloudflare uses to determine how to store resources in our cache. Customizing the cache key allows you to determine how Cloudflare can reuse particular cache entries across requests or share the cache entries for more granularity for end users.

Define the request components used to define a [custom cache key](/cache/how-to/cache-keys/), customizing the following options:

* You can switch on or off [Cache by device type](/automatic-platform-optimization/reference/cache-device-type/), [Cache deception armor](/cache/cache-security/cache-deception-armor/), [Ignore query string](/cache/troubleshooting/cache-everything-ignore-query-strings/), and [Sort query string](/cache/how-to/cache-keys/#query-string).

Enterprise customers have these additional options for custom cache keys:

* In the **Query string** section, you can select **All query string parameters**, **All query string parameters except** and enter an exception, **Only these parameters** and enter the parameters, or **Ignore query string** (also available for pay-as-you-go customers).
* In the **Headers** section, you can include headers names and their values, check the presence of another header, and **Include origin header**.
* In the **Cookie** section, you can include cookie names and their values, and check for the presence of another cookie.
* In the **Host** section, you can select **Use original host** and **Resolved host**. In the **User** section, you can select **Device type**, **Country**, and **Language**.

{{<details header="API information">}}

API configuration object name: `"cache_key"`.

API values: `"ignore_query_strings_order"`, `"cache_deception_armor"`, `"cache_by_device_type"`, `"custom_key"` (`"header"`, `"cookie"`, `"host"`, `"query_string"`, `"user"`).

```json
---
header: API configuration example
---
"action_parameters": {
  "cache": true,
  "cache_key": {
    "ignore_query_strings_order": true,
    "cache_deception_armor": true,
    "custom_key": {
      "query_string": {
        "include": [
          "*"
        ]
      },
      "header": {
        "include": [
          "header1"
        ],
        "check_presence": [
          "header_1"
        ]
      },
      "cookie": {
        "include": [
          "cookieName1"
        ],
        "check_presence": [
          "cookie_1"
        ]
      },
      "user": {
        "device_type": true,
        "geo": true,
        "lang": true
      },
      "host": {
        "resolved": false
      }
    }
  }
}
```

Refer to [Create a cache rule via API](/cache/how-to/cache-rules/create-api/#example-requests) for complete API examples.

{{</details>}}

#### Cache Reserve Eligibility

Cache Reserve eligibility allows you to specify which website resources should be eligible for our persistent cache called [Cache Reserve](/cache/advanced-configuration/cache-reserve/). If the request matches and also meets [eligibility criteria](/cache/advanced-configuration/cache-reserve/#cache-reserve-asset-eligibility), Cloudflare will write the resource to cache reserve. This requires an add-on cache reserve plan.

This rule can also be used to specify Cache Reserve eligibility for website resources based on their size. For example, by specifying that all assets which are eligible be 100 MB and above, Cloudflare will look for eligible assets at or above 100 MB for Cache Reserve eligibility and only persistently store those assets.

{{<Aside type="note">}}
Cloudflare will still enforce the plan-based [cacheable file limits](/cache/concepts/default-cache-behavior/#customization-options-and-limits) when using this configuration.
{{</Aside>}}

{{<details header="API information">}}

API configuration object name: `"cache_reserve"`.

API property name for enabling Cache Reserve: `"enabled"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "cache": true
  "cache_reserve": {
    "enabled": true,
    "minimum_file_size": 100000
  }
}
```

Refer to [Create a cache rule via API](/cache/how-to/cache-rules/create-api/#example-requests) for complete API examples.

{{</details>}}

#### Caching on Port (Enterprise-only)

Cloudflare supports several [network ports](/fundamentals/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy) by default, like 80 or 443. Some ports, traditionally admin ports, are supported but have caching disabled as they are used to manage sensitive information that should be ineligible for cache. Enterprise customers wanting to enable caching on these admin ports can cache on these ports by entering their desired port.

{{<Aside type="note">}}
Cloudflare supports many ports by default and will cache on them without needing this rule to be configured. For ports that Cloudflare supports, but for which caching is disabled, use this rule.
{{</Aside>}}

{{<details header="API information">}}

API configuration property name: `"additional_cacheable_ports"` (array of integer values).

```json
---
header: API configuration example
---
"action_parameters": {
    "cache": true 
    "additional_cacheable_ports": [8443, 8080]
  }
}
```

Refer to [Create a cache rule via API](/cache/how-to/cache-rules/create-api/#example-requests) for complete API examples.

{{</details>}}

#### Proxy Read Timeout (Enterprise-only)

Define a timeout value between two successive read operations to your origin server. Historically, the timeout value between two read options from Cloudflare to an origin server is 100 seconds. If you are attempting to reduce `HTTP 524` errors because of timeouts from an origin server, try increasing this timeout value.

{{<details header="API information">}}

API configuration property name: `"read_timeout"` (integer).

```json
---
header: API configuration example
---
"action_parameters": {
  "cache": true,
  "read_timeout": 900
}
```

Refer to [Create a cache rule via API](/cache/how-to/cache-rules/create-api/#example-requests) for complete API examples.

{{</details>}}

#### Serve stale content while revalidating

Defines if Cloudflare will serve stale content while updating from the origin server. If serving stale content is disabled, origin cache-control headers will be used to tell Cloudflare how to handle content from the origin.

{{<details header="API information">}}

API configuration property name: `"serve_stale"` > `"disable_stale_while_updating"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "cache": true,
  "serve_stale": {
    "disable_stale_while_updating": true
  }
}
```

Refer to [Create a cache rule via API](/cache/how-to/cache-rules/create-api/#example-requests) for complete API examples.

{{</details>}}

#### Respect Strong ETags

Turn on or off byte-for-byte equivalency checks between the Cloudflare cache and the origin server. When enabled, Cloudflare will use [strong ETag](/cache/reference/etag-headers/#strong-etags) header validation to ensure that resources in the Cloudflare cache and on the origin server are byte-for-byte identical. If disabled, Cloudflare converts ETag headers into [weak ETag](/cache/reference/etag-headers/#weak-etags) headers.

{{<details header="API information">}}

API configuration property name: `"respect_strong_etags"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "cache": true,
  "respect_strong_etags": true
}
```

Refer to [Create a cache rule via API](/cache/how-to/cache-rules/create-api/#example-requests) for complete API examples.

{{</details>}}

#### Origin error page pass-through

Turn on or off Cloudflare error pages generated from error HTTP status codes sent from the origin server. If enabled, this setting enables the use of error pages issued by the origin.

{{<details header="API information">}}

API configuration property name: `"origin_error_page_passthru"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "cache": true,
  "origin_error_page_passthru": true
}
```

Refer to [Create a cache rule via API](/cache/how-to/cache-rules/create-api/#example-requests) for complete API examples.

{{</details>}}

#### Origin Cache Control (Enterprise-only)

When this option is enabled, Cloudflare will aim to strictly adhere to [RFC 7234](https://datatracker.ietf.org/doc/html/rfc7234). Enterprise customers have the ability to select if Cloudflare will adhere to this behavior. Free, Pro, and Business customers have this option enabled by default and cannot disable it.

{{<details header="API information">}}

API configuration property name: `"origin_cache_control"` (boolean).

```json
---
header: API configuration example
---
"action_parameters": {
  "cache": true
  "origin_cache_control": true
}
```

Refer to [Create a cache rule via API](/cache/how-to/cache-rules/create-api/#example-requests) for complete API examples.

{{</details>}}