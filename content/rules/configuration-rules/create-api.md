---
title: Create a rule via API
pcx_content_type: how-to
type: overview
weight: 4
meta:
  title: Create a Configuration Rule via API
---

# Create a Configuration Rule via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create Configuration Rules via API.

When creating a Configuration Rule via API, make sure you:

* Set the rule action to `set_config`.
* Define the parameters in the `action_parameters` field according to the [settings](/rules/configuration-rules/settings/) you wish to override for matching requests.
* Deploy the rule to the `http_config_settings` phase at the zone level.

***

{{<render file="_rules-creation-workflow.md" withParameters="a configuration rule;;http_config_settings">}}

## Required API token permissions

The API token used in API requests to manage Configuration Rules must have at least the following permission:

* _Zone_ > _Config Rules_ > _Edit_

## Examples

<details>
<summary>Example: Add a rule that enables Auto Minify for CSS files and enables Hotlink Protection</summary>
<div>

The following example sets the rules of an existing phase ruleset (`{ruleset_id}`) to a single Configuration Rule — enabling Auto Minify for CSS files and Hotlink Protection for the `assets.example.com` hostname — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) method:

```bash
---
header: Request
---
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
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

The following example sets the rules of an existing phase ruleset (`{ruleset_id}`) to a single Configuration Rule — enabling Email Obfuscation and Browser Integrity Check for the contacts page — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) method:

```bash
---
header: Request
---
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
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

The following example sets the rules of an existing phase ruleset (`{ruleset_id}`) to a single Configuration Rule — changing the Security Level to _High_ for the administration area — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) method:

```bash
---
header: Request
---
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
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