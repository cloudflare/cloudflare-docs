---
order: 3
---

# Configure exposed credentials checks via API

Configure exposed credentials checks using the [Rulesets API](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api). You can deploy the Exposed Credentials Check Managed Ruleset and create custom rules that check for exposed credentials.

## Deploy the Exposed Credentials Check Managed Ruleset

<Aside type='warning' header='Important'>

You must deploy the Managed Ruleset to the `http_request_firewall_managed` Phase.

</Aside>

To deploy the Managed Ruleset for a given zone, do the following:

1. Obtain the zone ID of the zone where you want to deploy the Managed Ruleset.
1. Use the [List existing rulesets](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api/view#list-existing-rulesets) method to obtain the following ruleset IDs:
    * The ruleset ID of the ruleset for the `http_request_firewall_managed` Phase at the zone level
    * The ruleset ID of the Exposed Credentials Check Managed Ruleset
1. If the `http_request_firewall_managed` Phase ruleset does not exist, create it using the Create ruleset method.
1. Use the [View ruleset](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api/view#view-a-specific-ruleset) method to get the rules already associated with the Phase ruleset where you want to deploy the Managed Ruleset.
1. Use the [Update ruleset](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api/update) method to add a rule to the Phase ruleset deploying the Exposed Credentials Check Managed Ruleset. Make sure you include the existing rules in the Phase ruleset in your `PUT` request.

For more information on deploying a Managed Ruleset, check [Deploy a Managed Ruleset](https://developers.cloudflare.com/firewall/cf-rulesets/managed-rulesets/deploy-managed-ruleset).


## Configure an override for the Exposed Credentials Check Managed Ruleset

An override allows you to define an action or status different from the default values as configured by Cloudflare. You can define overrides at the ruleset, tag, and rule level for all Managed Rulesets, including the Exposed Credentials Check Managed Ruleset.

For more information on defining overrides for Managed Rulesets using the Rulesets API, check [Override a Managed Ruleset](https://developers.cloudflare.com/firewall/cf-rulesets/managed-rulesets/override-managed-ruleset).

## Create a custom rule checking for exposed credentials

You can create rules that check for exposed credentials using the [Rulesets API](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api).

A rule with exposed credentials check has a match when both the rule expression and the result from the exposed credentials check are true.

To check for exposed credentials in a custom rule, include the field `exposed_credential_check` in the rule definition. This field requires the following options:

* `username_expression` — Expression that selects the user ID used in the credentials check. This field can have up to 1024 characters.
* `password_expression` — Expression that selects the password used in the credentials check. This field can have up to 1024 characters.

<Aside type='warning' header='Important'>

These options have additional requirements:

* Each expression must evaluate to a string.
* You can only use the `upper()`, `lower()`, and `url_decode()` functions, and you cannot nest these functions.

</Aside>

You can use the `exposed_credential_check` field in rules with one of the following actions: `rewrite`, `log`, `block`, `challenge`, or `js_challenge`. 

To create and deploy a custom ruleset, follow the workflow described in [Work with custom rulesets](https://developers.cloudflare.com/firewall/cf-rulesets/custom-rulesets). 

### Example

The following `POST` example creates a new custom ruleset with a rule that checks for exposed credentials. The rule has a match if both the rule expression and the `exposed_credential_check` result are `true`.

```json
curl -X POST \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets" \
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
  "phase": "http_request_firewall_managed"
}
```

The response returns the created ruleset. Note the presence of the `exposed_credential_check` field on the rule definition.

```json
{
  "result": {
    "id": "{custom-ruleset-id}",
    "name": "Custom Ruleset 1",
    "description": "This ruleset includes a rule checking for exposed credentials.",
    "kind": "custom",
    "version": "3",
    "rules": [
      {
        "id": "{custom-rule-id}",
        "version": "1",
        "action": "log",
        "expression": "http.request.method == \"POST\" && http.request.uri == \"/login.php\"",
        "exposed_credential_check": {
          "username_expression": "url_decode(http.request.body.form[\"username\"][0])",
          "password_expression": "url_decode(http.request.body.form[\"password\"][0])"
        },
        "last_updated": "2021-03-19T10:48:04.057775Z",
        "ref": "{custom-rule-ref}",
        "enabled": true
      }
    ]
  }
}
```

The example above uses the `url_decode()` function because fields in the request body (available in `http.request.body.form`) are URL-encoded when the content type is `application/x-www-form-urlencoded`.

See [Deploy a custom ruleset](https://developers.cloudflare.com/firewall/cf-rulesets/custom-rulesets/deploy-custom-ruleset/) for more information on deploying custom rulesets using the Rulesets API.
