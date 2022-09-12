---
title: Create a rule via API
pcx_content_type: how-to
type: overview
weight: 4
layout: list
meta:
  title: Create a Configuration Rule via API
---

# Create a Configuration Rule via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create Configuration Rules via API. Define the [configuration settings](/rules/configuration-rules/settings/) in the `action_parameters` field.

When creating a Configuration Rule via API, make sure you:

* Set the rule action to `set_config`.
* Define the [parameters](/rules/configuration-rules/parameters/) in the `action_parameters` field according to the [settings](/rules/configuration-rules/settings/) you wish to override for matching requests.
* Deploy the rule to the `http_config_settings` phase at the zone level.

***

Follow this workflow to create a Configuration Rule for a given zone via API:

1. Use the [List existing rulesets](/ruleset-engine/rulesets-api/view/#list-existing-rulesets) method to check if there is already a ruleset for the `http_config_settings` phase at the zone level.

2. If the phase ruleset does not exist, create it using the [Create ruleset](/ruleset-engine/rulesets-api/create/) method with the zone-level endpoint. In the new ruleset properties, set the following values:

    * **kind**: `zone`
    * **phase**: `http_config_settings`

3. Use the [Update ruleset](/ruleset-engine/rulesets-api/update/) method to add a Configuration Rule to the list of ruleset rules (check the examples below). Alternatively, include the rule in the [Create ruleset](/ruleset-engine/rulesets-api/create/) request mentioned in the previous step.

## Required API token permissions

The API token used in API requests to manage Configuration Rules must have at least the following permission:

* _Zone_ > _Config Settings_ > _Edit_

## Examples

<details>
<summary>Example: Add a rule that enables Auto Minify for CSS files and enables Hotlink Protection</summary>
<div>

The following example sets the rules of an existing phase ruleset (`<RULESET_ID>`) to a single Configuration Rule — enabling Auto Minify for CSS files and Hotlink Protection for the `assets.example.com` hostname — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) method:

```json
---
header: cURL example request
---
$ curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rules": [
    {
      "expression": "http.host eq \"assets.example.com\"",
      "description": "Minifies CSS files and enables Hotlink Protection for assets.example.com",
      "action": "set_config",
      "action_parameters": {
        "autominify": {
          "html": false,
          "css": true,
          "js": false
        },
        "hotlink_protection": true
      }
    }
  ]
}'
```

</div>
</details>

<details>
<summary>Example: Add a rule that enables Email Obfuscation and Browser Integrity Check</summary>
<div>

The following example sets the rules of an existing phase ruleset (`<RULESET_ID>`) to a single Configuration Rule — enabling Email Obfuscation and Browser Integrity Check for the contacts page — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) method:

```json
---
header: cURL example request
---
$ curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rules": [
    {
      "expression": "starts_with(http.request.uri.path, \"/contact-us/\")",
      "description": "Obfuscates email addresses and enables BIC in contacts page",
      "action": "set_config",
      "action_parameters": {
        "email_obfuscation": true,
        "bic": true
      }
    }
  ]
}'
```

</div>
</details>

<details>
<summary>Example: Add a rule that sets the Security Level to <em>High</em></summary>
<div>

The following example sets the rules of an existing phase ruleset (`<RULESET_ID>`) to a single Configuration Rule — changing the Security Level to _High_ for the administration area — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) method:

```json
---
header: cURL example request
---
$ curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rules": [
    {
      "expression": "http.host eq \"admin.example.com\"",
      "description": "Change Security Level for admin area",
      "action": "set_config",
      "action_parameters": {
        "security_level": "high"
      }
    }
  ]
}'
```

</div>
</details>