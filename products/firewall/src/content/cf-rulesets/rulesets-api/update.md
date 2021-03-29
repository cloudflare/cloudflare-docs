---
title: Update and deploy rulesets
alwaysopen: true
order: 785
---

# Update and deploy rulesets

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

The following endpoints support both updating the **basic properties** of a ruleset (currently only the description) and the **list of rules** in the ruleset. 

Use one of the following API endpoints to configure a ruleset at the account level or at the zone level.

```bash
---
header: Account-level endpoint
---
PUT /accounts/{account-id}/rulesets/{root-ruleset-id}
```

```bash
---
header: Zone-level endpoint
---
PUT /zones/{zone-id}/rulesets/{root-ruleset-id}
```

Alternatively, you can use one of the following endpoints when updating the ruleset of a Phase:

```bash
---
header: Account-level Phase endpoint
---
PUT /accounts/{account-id}/rulesets/phases/{phase-name}/entrypoint
```

```bash
---
header: Zone-level Phase endpoint
---
PUT /zones/{zone-id}/rulesets/phases/{phase-name}/entrypoint
```

<Aside type='warning' header='Important'>

You cannot update the name of the ruleset or its type. Do not include these fields in the `data` field of your PUT request.

</Aside>

## Example - Set the rules of a ruleset

Use this API method to set the rules of a ruleset. You must include all the rules you want to associate with the ruleset in every PUT request.

```json
---
header: Request
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{ruleset-id}" \
-d '{
    "rules": [{
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "action": "challenge",
        "description": "challenge not /api"
    }]
}'
```

```json
---
header: Response
---
"result": {
    "id": "{ruleset-id}",
    "name": "Custom Ruleset 1",
    "kind": "custom",
    "version": "2",
    "rules": [
    {
        "id": "{custom-rule-id-2}",
        "version": "1",
        "action": "challenge",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "description": "challenge not /api",
        "last_updated": "2021-03-18T18:25:08.122758Z",
        "ref": "{custom-rule-ref-2}",
        "enabled": true
    }],
    "last_updated": "2021-03-18T18:25:08.122758Z",
    "phase": "http_request_firewall_custom"
}
```

## Example - Deploy a ruleset

To deploy a ruleset, create a rule with the `action` field set to `execute` and add the ruleset ID to the `action_parameters` field in the `id` parameter. You deploy rulesets to a Phase.

This example deploys a Managed Ruleset to the zone-level `http_request_firewall_managed` Phase of a zone (`{zone-id}`).

```json
---
header: Request
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
    "rules": [
    {
        "action": "execute",
        "action_parameters": {
            "id": "{managed-ruleset-id}"
        },
        "expression": "true",
        "description": "Execute Cloudflare Managed Ruleset on my Phase ruleset"
    }]
}'
```

```json
---
header: Response
---
{
    "result": {
        "id": "{phase-ruleset-id}",
        "name": "Zone-level Phase ruleset",
        "description": "",
        "kind": "zone",
        "version": "4",
        "rules": [
            {
                "id": "{rule-id-1}",
                "version": "1",
                "action": "execute",
                "action_parameters": {
                    "id": "{managed-ruleset-id}",
                    "version": "latest"
                },
                "expression": "true",
                "description": "Execute Cloudflare Managed Ruleset on my Phase ruleset",
                "last_updated": "2021-03-21T11:02:08.769537Z",
                "ref": "{rule-ref-1}",
                "enabled": true
            }
        ],
        "last_updated": "2021-03-21T11:02:08.769537Z",
        "phase": "http_request_firewall_managed"
    },
    "success": true,
    "errors": [],
    "messages": []
}
```

<Aside type='warning' header='Important'>

You must set the `expression` field to `true` when deploying a ruleset to a zone-level Phase.

</Aside>

For more information on deploying rulesets, check [Deploy rulesets](/cf-rulesets/deploy-rulesets).


## Example - Update ruleset description

You can use this API method to update the description of an existing ruleset. 

<Aside type='warning' header='Important'>

You cannot update the description or the rules in a Managed Ruleset. You can only define overrides to customize the ruleset behavior.

</Aside>

```json
---
header: Request
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{ruleset-id}" \
-d '{ 
    "description": "My custom ruleset"
}'
```

```json
---
header: Response
---
{
    "result": {
        "id": "{ruleset-id}",
        "name": "Custom Ruleset 1",
        "description": "My custom ruleset",
        "kind": "custom",
        "version": "2",
        "rules": [
            // (...)
        ],
        "last_updated": "2021-03-20T10:49:11.006109Z",
        "phase": "http_request_firewall_custom"
    },
    "success": true,
    "errors": [],
    "messages": []
}
```

The response includes the complete ruleset definition, including all the rules.
