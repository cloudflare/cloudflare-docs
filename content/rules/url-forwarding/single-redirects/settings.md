---
title: Available settings
pcx_content_type: reference
weight: 10
meta:
  title: Available redirect rules settings
---

# Available settings

The following sections describe the settings of redirect rules to configure static and dynamic URL redirects.

## Static URL redirect

Performs a static URL redirect with a given HTTP status code and optionally preserves the query string.

A static URL redirect has the following configuration parameters:

* **URL**: A literal string that will be used in the `Location` HTTP header returned in the redirect response.

* **Status code**: The HTTP status code of the redirect response (_301_ by default). Must be one of the following: _301_ (Moved permanently), _302_ (Found, also known as Moved temporarily), _307_ (Temporary redirect), or _308_ (Permanent redirect).

* **Preserve query string**: Whether to preserve the query string when redirecting (disabled by default).

<details>
<summary>API information</summary>
<div>

The full syntax of the `"action_parameters"` field for a redirect rule performing a static URL redirect is the following:

```json
 "action_parameters": {
  "from_value": {
    "target_url": {
      "value": "<STATIC_URL_VALUE>"
    },
    "status_code": <STATUS_CODE>,
    "preserve_query_string": <BOOLEAN_VALUE>
  }
}
```

The only required parameter is `<STATIC_URL_VALUE>`.

{{<render file="url-forwarding/_optional-parameters.md">}}

</div>
</details>

## Dynamic URL redirect

Performs a dynamic URL redirect, where the target URL is determined by an expression. You can configure the redirect HTTP status code and whether to preserve the query string when redirecting.

A dynamic URL redirect has the following configuration parameters:

* **Expression**: An expression that defines the target URL of the redirect. The result of evaluating this expression will be used in the `Location` HTTP header returned in the redirect response.

* **Status code**: The HTTP status code of the redirect response (_301_ by default). Must be one of the following: _301_ (Moved permanently), _302_ (Found, also known as Moved temporarily), _307_ (Temporary redirect), or _308_ (Permanent redirect).

* **Preserve query string**: Whether to preserve the query string when redirecting (disabled by default).

<details>
<summary>API information</summary>
<div>

The full syntax of the `"action_parameters"` field for a redirect rule performing a dynamic URL redirect is the following:

```json
"action_parameters": {
  "from_value": {
    "target_url": {
      "expression": "<DYNAMIC_URL_EXPRESSION>"
    },
    "status_code": <STATUS_CODE>,
    "preserve_query_string": <BOOLEAN_VALUE>
  }
}
```

The only required parameter is `<DYNAMIC_URL_EXPRESSION>`.

{{<render file="url-forwarding/_optional-parameters.md">}}

</div>
</details>
