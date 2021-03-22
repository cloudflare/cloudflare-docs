---
title: Add rules to a custom ruleset
alwaysopen: true
order: 762
---

# Add rules to a custom ruleset

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

To add rules to an existing custom ruleset, execute a PUT request to the custom ruleset and pass the rules in an array. Each rule contains an expression and action.

The following request adds two rules to a custom ruleset.

```json
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{custom-ruleset-id}" \
-d '{
    "rules": [{
        "expression": "(ip.geoip.country eq \"GB\" and ip.geoip.country eq \"FR\")  or cf.threat_score > 0",
        "action": "challenge",
        "description": "challenge GB and FR or based on IP Reputation"
    },
    {
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "action": "challenge",
        "description": "challenge not /api"
    }]
}'
```

The response includes the rule ID of the new rules in the `id` field:

```json
"result": {
    "id": "{custom-ruleset-id}",
    "name": "Custom Ruleset 1",
    "kind": "custom",
    "version": "2",
    "rules": [
    {
        "id": "{custom-rule-id-1}",
        "version": "1",
        "action": "challenge",
        "expression": "(ip.geoip.country eq \"GB\" and ip.geoip.country eq \"FR\")  or cf.threat_score \u003e 0",
        "description": "challenge GB and FR or based on IP Reputation",
        "last_updated": "2021-03-18T18:25:08.122758Z",
        "ref": "{custom-rule-ref-1}",
        "enabled": true
    },
    {
        "id": "{custom-rule-id-2}",
        "version": "1",
        "action": "challenge",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "description": "challenge not /api"
        "last_updated": "2021-03-18T18:25:08.122758Z",
        "ref": "{custom-rule-ref-2}",
        "enabled": true
    }],
    "last_updated": "2021-03-18T18:25:08.122758Z",
    "phase": "http_request_firewall_custom"
}
```

## Update a rule in a custom ruleset

To update a rule, execute a PUT request to the custom ruleset. Include the ID of the rule you want to modify in the rules array and add the fields you want to update. The request replaces the entire ruleset with a new version. Therefore, you must include the ID of all the rules you want to keep.

The following request edits a rule in a custom ruleset and updates the order of execution of the rules.

```json
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{ruleset-id}" \
-d '{
    "rules": [{
        "id": "{custom-rule-id-2}",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "action": "js_challenge",
        "description": "js_challenge when not /api"
    },
    {
        "id": "{custom-rule-id-1}"
    }]
}'
```

The response returns the modified custom ruleset. Note that the updated rule and ruleset version number increment.

```json
{
    "result": {
        "id": "{custom-ruleset-id}",
        "name": "Custom Ruleset 1",
        "kind": "custom",
        "version": "3",
        "rules": [
        {
            "id": "{custom-rule-id-2}",
            "version": "2",
            "action": "js_challenge",
            "expression": "not http.request.uri.path matches \"^/api/.*$\"",
            "description": "js_challenge when not /api",
            "last_updated": "2021-03-18T18:30:08.122758Z",
            "ref": "{custom-rule-id-2}",
            "enabled": true
        },
        {
            "id": "{custom-rule-id-1}",
            "version": "1",
            "action": "challenge",
            "expression": "(ip.geoip.country eq \"GB\" and ip.geoip.country eq \"FR\")  or cf.threat_score \u003e 0",
            "description": "challenge GB and FR or based on IP Reputation",
            "last_updated": "2021-03-18T18:25:08.122758Z",
            "ref": "{custom-rule-id-1}",
            "enabled": true
        }],
        "last_updated": "2021-03-18T18:30:08.122758Z",
        "phase": "http_request_firewall_custom"
    }
}
```

The PUT request completely replaces the existing contents of the ruleset. If you omit an existing rule from the `rules` array, it will not appear in the new version of the ruleset.
