---
pcx-content-type: how-to
title: Configure exposed credentials checks via API
weight: 4
---

# Configure exposed credentials checks via API

Configure exposed credentials checks using the [Rulesets API](/ruleset-engine/rulesets-api/). You can do the following:

*   [Deploy the Cloudflare Exposed Credentials Check Managed Ruleset](/waf/managed-rulesets/exposed-credentials-check/#configure-via-api).
*   Create custom rules that check for exposed credentials.

## Create a custom rule checking for exposed credentials

{{<Aside type="note">}}

This feature is only available to customers on an Enterprise plan.

{{</Aside>}}

You can create rules that check for exposed credentials using the [Rulesets API](/ruleset-engine/rulesets-api/). Include these rules in a custom ruleset, which you must create at the account level, and then deploy the custom ruleset to a phase.

A rule with exposed credentials check has a match when both the rule expression and the result from the exposed credentials check are true.

To check for exposed credentials in a custom rule, include the `exposed_credential_check` object in the rule definition. This object must have the following properties:

*   `username_expression` — Expression that selects the user ID used in the credentials check. This property can have up to 1024 characters.
*   `password_expression` — Expression that selects the password used in the credentials check. This property can have up to 1024 characters.

{{<Aside type="warning" header="Important">}}

These properties have additional requirements:

*   Each expression must evaluate to a string.
*   You can only use the [`upper()`](/ruleset-engine/rules-language/functions/#function-upper), [`lower()`](/ruleset-engine/rules-language/functions/#function-lower), [`url_decode()`](/ruleset-engine/rules-language/functions/#function-url_decode), and [`lookup_json_string()`](/ruleset-engine/rules-language/functions/#function-lookup_json_string) functions, and you cannot nest these functions.

{{</Aside>}}

You can use the `exposed_credential_check` object in rules with one of the following actions: `rewrite`, `log`, `block`, `challenge`, or `js_challenge`. Cloudflare recommends that you only use exposed credential checks with the following actions: `rewrite` and `log`.

To create and deploy a custom ruleset, follow the workflow described in [Work with custom rulesets](/ruleset-engine/custom-rulesets/).

### Example A 

This example creates a new custom ruleset with a rule that checks for exposed credentials. The rule has a match if both the rule expression and the `exposed_credential_check` result are `true`. When there is a match, the rule will log the request with exposed credentials in the Cloudflare logs.

```json
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "name": "Custom Ruleset A",
  "kind": "custom",
  "description": "This ruleset includes a rule checking for exposed credentials.",
  "rules": [
    {
      "action": "log",
      "expression": "http.request.method == \"POST\" && http.request.uri == \"/login.php\"",
      "exposed_credential_check": {
        "username_expression": "url_decode(http.request.body.form[\"username\"][0])",
        "password_expression": "url_decode(http.request.body.form[\"password\"][0])"
      }
    }
  ],
  "phase": "http_request_firewall_custom"
}'
```

The response returns the created ruleset. Note the presence of the `exposed_credential_check` object on the rule definition.

```json
---
highlight: [14,15,16,17]
---
{
  "result": {
    "id": "<CUSTOM_RULESET_ID>",
    "name": "Custom Ruleset A",
    "description": "This ruleset includes a rule checking for exposed credentials.",
    "kind": "custom",
    "version": "1",
    "rules": [
      {
        "id": "<CUSTOM_RULE_ID>",
        "version": "1",
        "action": "log",
        "expression": "http.request.method == \"POST\" && http.request.uri == \"/login.php\"",
        "exposed_credential_check": {
          "username_expression": "url_decode(http.request.body.form[\"username\"][0])",
          "password_expression": "url_decode(http.request.body.form[\"password\"][0])"
        },
        "last_updated": "2021-03-19T10:48:04.057775Z",
        "ref": "<CUSTOM_RULE_REF>",
        "enabled": true
      }
    ],
    "last_updated": "2021-03-19T10:48:04.057775Z",
    "phase": "http_request_firewall_custom"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

This example uses the `url_decode()` function because fields in the request body (available in `http.request.body.form`) are URL-encoded when the content type is `application/x-www-form-urlencoded`.

After creating a custom ruleset, deploy it to a phase so that it executes. Refer to [Deploy a custom ruleset](/ruleset-engine/custom-rulesets/deploy-custom-ruleset/) for more information.

### Example B

This example creates a new custom ruleset with a rule that checks for exposed credentials in JSON responses. The rule has a match if both the rule expression and the `exposed_credential_check` result are `true`. When there is a match, the rule will add an `Exposed-Credential-Check` HTTP header to the request with value `1`.

```json
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "name": "Custom Ruleset B",
  "kind": "custom",
  "description": "This ruleset includes a rule checking for exposed credentials.",
  "rules": [
    {
      "action": "rewrite",
      "action_parameters": {
        "headers": {
          "Exposed-Credential-Check": {
            "operation": "set",
            "value": "1"
          }
        }
      },      
      "expression": "http.request.method == \"POST\" && http.request.uri == \"/login.php\" && any(http.request.headers[\"content-type\"][*] == \"application/json\")",
      "exposed_credential_check": {
        "username_expression": "lookup_json_string(http.request.body.raw, \"username\")",
        "password_expression": "lookup_json_string(http.request.body.raw, \"password\")"
      }
    }
  ],
  "phase": "http_request_firewall_custom"
}'
```

The response returns the created ruleset. Note the presence of the following elements in the rule definition:

* The `rewrite` action.
* The `action_parameters` object configuring the HTTP header added to requests with exposed credentials.
* The `exposed_credential_check` object.

```json
---
highlight: [12,13,14,15,16,17,18,19,20,22,23,24,25]
---
{
  "result": {
    "id": "<CUSTOM_RULESET_ID>",
    "name": "Custom Ruleset B",
    "description": "This ruleset includes a rule checking for exposed credentials.",
    "kind": "custom",
    "version": "1",
    "rules": [
      {
        "id": "<CUSTOM_RULE_ID>",
        "version": "1",
        "action": "rewrite",
        "action_parameters": {
          "headers": {
            "Exposed-Credential-Check": {
              "operation": "set",
              "value": "1"
            }
          }
        },      
        "expression": "http.request.method == \"POST\" && http.request.uri == \"/login.php\" && any(http.request.headers[\"content-type\"][*] == \"application/json\")",
        "exposed_credential_check": {
          "username_expression": "lookup_json_string(http.request.body.raw, \"username\")",
          "password_expression": "lookup_json_string(http.request.body.raw, \"password\")"
        },
        "last_updated": "2022-03-19T12:48:04.057775Z",
        "ref": "<CUSTOM_RULE_REF>",
        "enabled": true
      }
    ],
    "last_updated": "2022-03-19T12:48:04.057775Z",
    "phase": "http_request_firewall_custom"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

After creating a custom ruleset, deploy it to a phase so that it executes. Refer to [Deploy a custom ruleset](/ruleset-engine/custom-rulesets/deploy-custom-ruleset/) for more information.