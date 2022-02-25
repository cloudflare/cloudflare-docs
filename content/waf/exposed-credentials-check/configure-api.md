---
pcx-content-type: how-to
title: Configure exposed credentials checks via API
weight: 4
---

# Configure exposed credentials checks via API

Configure exposed credentials checks using the [Rulesets API](/ruleset-engine/rulesets-api). You can do the following:

*   [Deploy the Cloudflare Exposed Credentials Check Managed Ruleset](/waf/managed-rulesets/exposed-credentials-check/#configure-via-api).
*   Create custom rules that check for exposed credentials.

## Create a custom rule checking for exposed credentials

<Aside type="note">

This feature is only available to customers on an Enterprise plan.

</Aside>

You can create rules that check for exposed credentials using the [Rulesets API](/ruleset-engine/rulesets-api). Include these rules in a custom ruleset, which you must create at the account level, and then deploy the custom ruleset to a phase.

A rule with exposed credentials check has a match when both the rule expression and the result from the exposed credentials check are true.

To check for exposed credentials in a custom rule, include the field `exposed_credential_check` in the rule definition. This field requires the following options:

*   `username_expression` — Expression that selects the user ID used in the credentials check. This field can have up to 1024 characters.
*   `password_expression` — Expression that selects the password used in the credentials check. This field can have up to 1024 characters.

\<Aside type='warning' header='Important'>

These options have additional requirements:

*   Each expression must evaluate to a string.
*   You can only use the `upper()`, `lower()`, and `url_decode()` functions, and you cannot nest these functions.

</Aside>

You can use the `exposed_credential_check` field in rules with one of the following actions: `rewrite`, `log`, `block`, `challenge`, or `js_challenge`.

To create and deploy a custom ruleset, follow the workflow described in [Work with custom rulesets](/ruleset-engine/custom-rulesets).

### Example

The following `POST` example creates a new custom ruleset with a rule that checks for exposed credentials. The rule has a match if both the rule expression and the `exposed_credential_check` result are `true`.

```json
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "name": "Custom Ruleset 1",
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

The response returns the created ruleset. Note the presence of the `exposed_credential_check` field on the rule definition.

```json
---
highlight: [14,15,16,17]
---
{
  "result": {
    "id": "<CUSTOM_RULESET_ID>",
    "name": "Custom Ruleset 1",
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

The example above uses the `url_decode()` function because fields in the request body (available in `http.request.body.form`) are URL-encoded when the content type is `application/x-www-form-urlencoded`.

After creating a custom ruleset, deploy it to a phase so that it executes. Refer to [Deploy a custom ruleset](/ruleset-engine/custom-rulesets/deploy-custom-ruleset) for more information.
