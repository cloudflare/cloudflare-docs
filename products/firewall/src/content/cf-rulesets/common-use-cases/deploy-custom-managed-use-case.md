---
title:  Deploy managed and custom rulesets
alwaysopen: true
order: 775
---

# Deploy managed rulesets and a custom ruleset

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

Use a single API request to add rules to your root ruleset and deploy Managed and custom rulesets.

In the example below, the ruleset configuration for a Phase contains a rule to deploy a ruleset. To keep the rule in the new version of the Phase ruleset, you must include the rule in the request along with the rulesets you want to deploy.

1. View the usable rulesets and Managed Rulesets. Use the [`jq`](https://stedolan.github.io/jq/) JSON processor to filter the `name` and `id` parameters of the rulesets.

    ```bash
    curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets" | jq .result[] | jq '.name, .id'
    ```
    
    The response lists the `name` and `id` parameters for the rulesets that you can use:
    
    ```json
    "Cloudflare OWASP Core Ruleset"
    "{Cloudflare-owasp-ruleset-id}"
    "Cloudflare Managed Ruleset"
    "{Cloudflare-managed-ruleset-id}"
    "Custom Ruleset 2"
    "{custom-ruleset-2-id}"
    "Custom Ruleset 1"
    "{custom-ruleset-1-id}"
    "Root ruleset for my account"
    "{root-ruleset-id}"
    ```

1. [Fetch the ruleset of the Phase](/cf-rulesets/view-rulesets/) to view the `id` of the existing rules to keep in the new version.

    ```bash
    $ curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{root-ruleset-id}/versions/{version-number}"
    ```

    The reponse indicates that the only ruleset deployed is the Cloudflare OWASP Managed Ruleset.
    
    ```json
    {
        "result": {
            "id": "{ruleset-id}",
            "name": "Phase ruleset",
            "kind": "root",
            "version": "49",
            "rules": [
            {
                "id": "{rule-deploying-cloudflare-owasp-id}",
                "version": "1",
                "action": "execute",
                "action_parameters": {
                    "id": "{cloudflare-owasp-ruleset-id}",
                    "version": "latest"
                },
                "expression": "cf.zone.name eq  \"example.com\"",
                "last_updated": "2020-11-20T15:50:29.861157Z",
                "ref": "{rule-deploying-cloudflare-owasp-id}",
                "enabled": true
            }]
        }
    }
    ```

Use the [Update ruleset](/cf-rulesets/rulesets-api/update/) endpoint to preserve the rule that deploys the OWASP Managed Ruleset. Deploy the Cloudflare Managed Ruleset with an override and deploy a custom ruleset.

```json
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{ruleset-id}" -d'
{
    "rules": [
    {
        "id": "{cloudflare-owasp-ruleset-id}"
    },
    {
        "action": "execute",
        "expression": "cf.zone.name eq \"example.com\"",
        "action_parameters": {
            "id": "{custom-ruleset-1-id}"
        }
    },
    {
        "action": "execute",
        "expression": "cf.zone.name eq  \"example.com\"",
        "action_parameters": {
            "id": "{cloudflare-managed-ruleset-id}",
            "overrides": {
                "categories": [
                {
                    "category": "joomla",
                    "action": "block"
                }]
            }
        }  
    }]
}'
```

The response displays the new version of your root ruleset. The `rules[]` array in the ruleset contains three rules.

* `{rule-deploying-cloudflare-owasp-id}`: The rule that deploys the OWASP ruleset.
* `{rule-deploying-custom-ruleset-1-id}`: The rule that deploys the custom ruleset.
* `{rule-deploying-cloudflare-managed-ruleset-id}`: The rule that deploys the Cloudflare Managed Ruleset. This rule contains overrides.

```json
{
    "result": {
        "id": "{phase-ruleset-id}",
        "name": "Phase ruleset",
        "kind": "root",
        "version": "56",
        "rules": [
        {
            "id": "{rule-deploying-cloudflare-owasp-id}",
            "version": "1",
            "action": "execute",
            "action_parameters": {
                "id": "{cloudflare-owasp-ruleset-id}",
                "version": "latest"
            },
            "expression": "cf.zone.name eq  \"example.com\"",
            "last_updated": "2020-11-23T11:58:47.421464Z",
            "ref": "{rule-deploying-owasp-id}",
            "enabled": true
        },
        {
          "id": "{rule-deploying-custom-ruleset-1-id}",
          "version": "1",
          "action": "execute",
          "action_parameters": {
              "id": "{custom-ruleset-1-id}",
              "version": "latest"
          },
          "expression": "cf.zone.name eq  \"example.com\"",
          "last_updated": "2020-11-23T13:28:09.793359Z",
          "ref": "{rule-deploying-custom-ruleset-1-id}",
          "enabled": true
        },
        {
          "id": "{rule-deploying-cloudflare-managed-ruleset-id}",
          "version": "1",
          "action": "execute",
          "action_parameters": {
              "id": "{cloudflare-managed-ruleset-id}",
              "version": "latest",
              "overrides": {
                  "categories": [
                  {
                    "category": "joomla",
                    "action": "block"
                  }]
              }
          },
          "expression": "cf.zone.name eq  \"example.com\"",
          "last_updated": "2021-02-23T13:28:09.793359Z",
          "ref": "{rule-deploying-cloudflare-managed-ruleset-id}",
          "enabled": true
        }]
    }
}
```