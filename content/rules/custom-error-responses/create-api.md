---
title: Create via API
pcx_content_type: how-to
weight: 2
meta:
  title: Create custom error responses via API
layout: list
---

# Create via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create custom error responses via API. Define the response configuration in the `action_parameters` field.

When creating a custom error response via API, make sure you:
* Set the rule action to `serve_error`.
* Define the [parameters](/rules/custom-error-responses/parameters/) in the `action_parameters` field according to response type.
* Deploy the rule to the `http_custom_errors` phase at the zone level.

The first rule in the `http_custom_errors` phase ruleset that matches will be applied. No other rules in the ruleset will be matched or applied.

---

Follow this workflow to create a custom error response rule for a given zone via API:

1. Use the [List existing rulesets](/ruleset-engine/rulesets-api/view/#list-existing-rulesets) operation to check if there is already a ruleset for the `http_custom_errors` phase at the zone level.
2. If the phase ruleset does not exist, create it using the [Update zone entry point ruleset](/ruleset-engine/rulesets-api/update/) operation, which allows you to create a ruleset if it does not exist and update all the rules in the ruleset. Use `http_custom_errors` as the `<PHASE_NAME>` in the API endpoint.

    If the phase ruleset already exists, use the [Update zone entry point ruleset](/ruleset-engine/rulesets-api/update/) operation to replace all the rules in the ruleset, or the [Add rule to ruleset](/ruleset-engine/rulesets-api/add-rule/) operation to add a rule to the existing rules in the ruleset.

## ​​Required API token permissions

The API token used in API requests to manage custom error responses must have at least the following permission:

* Custom Error Rules > Edit

## Example API calls

### Custom JSON response for all Cloudflare 1xxx errors

This example configures a custom JSON error response for all [Cloudflare 1xxx errors](https://support.cloudflare.com/hc/articles/360029779472) in the zone with ID `<ZONE_ID>`. The HTTP status code of the custom error response will be set to `530`.

```json
$ curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_custom_errors/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rules": [
    {
      "action": "serve_error",
      "action_parameters": {
        "content": "{\"message\": \"A 1xxx error occurred.\"}",
        "content_type": "application/json",
        "status_code": 530
      },
      "expression": "cf.response.error_type eq \"1xxx\"",
      "enabled": true
    }
  ]
}'
```

Note that this `PUT` request, corresponding to the [Update zone entry point ruleset](/ruleset-engine/rulesets-api/update/) operation, replaces any existing rules in the `http_custom_errors` phase entry point ruleset.

### Custom HTML response for 1020 errors

This example configures a custom HTML error response for [Cloudflare error 1020](https://support.cloudflare.com/hc/articles/360029779472#error1020) (Access Denied).

```json
$ curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_custom_errors/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rules": [
    {
      "action": "serve_error",
      "action_parameters": {
        "content": "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Access denied</title></head><body><h1>You do not have access to this page</h1><p>Contact us if you think this is an error.</p></body></html>",
        "content_type": "text/html"
      },
      "expression": "cf.response.1xxx_error eq 1020",
      "enabled": true
    }
  ]
}'
```

Note that this `PUT` request, corresponding to the [Update zone entry point ruleset](/ruleset-engine/rulesets-api/update/) operation, replaces any existing rules in the `http_custom_errors` phase entry point ruleset.

### Custom HTML response with updated status code

This example configures a custom HTML error response for origin responses with a `500` HTTP status code, and redefines the response status code to `503`.

```json
$ curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_custom_errors/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rules": [
    {
      "action": "serve_error",
      "action_parameters": {
        "content": "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Application unavailable</title></head><body><h1>Application temporarily unavailable</h1><p>Please try again later.</p></body></html>",
        "content_type": "text/html"
      },
      "expression": "http.response.code eq 500",
      "enabled": true,
      "status_code": 503
    }
  ]
}'
```

Note that this `PUT` request, corresponding to the [Update zone entry point ruleset](/ruleset-engine/rulesets-api/update/) operation, replaces any existing rules in the `http_custom_errors` phase entry point ruleset.
