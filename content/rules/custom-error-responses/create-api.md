---
title: Create via API
pcx_content_type: how-to
weight: 2
meta:
  title: Create a custom error response via API
---

# Create a custom error response via API

Configure custom error responses as [rules](/ruleset-engine/about/rules/) belonging to the `http_custom_errors` phase. Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create custom error responses via API.

## Basic rule settings

When creating a custom error response via API, make sure you:

* Set the rule action to `serve_error`.
* Define the [parameters](/rules/custom-error-responses/parameters/) in the `action_parameters` field according to response type.
* Deploy the custom error response rule to the `http_custom_errors` phase at the zone level.

The first rule in the `http_custom_errors` phase ruleset that matches will be applied. No other rules in the ruleset will be matched or applied.

## Procedure

Follow this workflow to create a custom error response rule for a given zone via API:

1. Use the [List zone rulesets](/api/operations/listZoneRulesets) operation to check if there is already a ruleset for the `http_custom_errors` phase at the zone level.
2. If the phase ruleset does not exist, create it using the [Update a zone entry point ruleset](/api/operations/updateZoneEntrypointRuleset) operation, which allows you to create a ruleset if it does not exist and update all the rules in the ruleset. Create the ruleset in the `http_custom_errors` phase.

    If the phase ruleset already exists, use the [Update a zone entry point ruleset](/api/operations/updateZoneEntrypointRuleset) operation to replace all the rules in the ruleset, or the [Add rule to ruleset](/ruleset-engine/rulesets-api/add-rule/) operation to add a rule to the existing rules in the ruleset.

## Example API calls

### Custom JSON response for all Cloudflare 1xxx errors

This example configures a custom JSON error response for all [Cloudflare 1xxx errors](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-1xxx-errors/) in the zone with ID `{zone_id}`. The HTTP status code of the custom error response will be set to `530`.

```bash
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_custom_errors/entrypoint \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
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

Note that this `PUT` request, corresponding to the [Update a zone entry point ruleset](/api/operations/updateZoneEntrypointRuleset) operation, replaces any existing rules in the `http_custom_errors` phase entry point ruleset.

### Custom HTML response for 1020 errors

This example configures a custom HTML error response for [Cloudflare error 1020](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-1xxx-errors/#error-1020-access-denied) (Access Denied).

```bash
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_custom_errors/entrypoint \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "rules": [
    {
      "action": "serve_error",
      "action_parameters": {
        "content": "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Access denied</title></head><body><h1>You do not have access to this page</h1><p>Contact us if you think this is an error.</p></body></html>",
        "content_type": "text/html"
      },
      "expression": "cf.response.1xxx_code eq 1020",
      "enabled": true
    }
  ]
}'
```

Note that this `PUT` request, corresponding to the [Update a zone entry point ruleset](/api/operations/updateZoneEntrypointRuleset) operation, replaces any existing rules in the `http_custom_errors` phase entry point ruleset.

### Custom HTML response with updated status code

This example configures a custom HTML error response for responses with a `500` HTTP status code, and redefines the response status code to `503`.

```bash
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_custom_errors/entrypoint \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "rules": [
    {
      "action": "serve_error",
      "action_parameters": {
        "content": "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Application unavailable</title></head><body><h1>Application temporarily unavailable</h1><p>Please try again later.</p></body></html>",
        "content_type": "text/html",
        "status_code": 503
      },
      "expression": "http.response.code eq 500",
      "enabled": true
    }
  ]
}'
```

Note that this `PUT` request, corresponding to the [Update a zone entry point ruleset](/api/operations/updateZoneEntrypointRuleset) operation, replaces any existing rules in the `http_custom_errors` phase entry point ruleset.

---

## ​​Required API token permissions

The API token used in API requests to manage custom error responses must have at least the following permission:

* _Custom Error Rules_ > _Edit_
