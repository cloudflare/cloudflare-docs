---
title: Add rules to a custom ruleset
alwaysopen: true
order: 762
---

# Add rules to a custom ruleset

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

To add rules to an existing custom ruleset, execute a `PUT` request to the custom ruleset and pass the rules in an array. Each rule contains an expression and action.

<Aside type='info' header='Info'>

When you modify a ruleset using a `PUT` request, you replace the entire content of the ruleset with the request's payload. You must include in the request all existing rules you want to keep in addition to any new rules. 

If you are updating several rules at once, use the `PUT` request described in this section. It allows you to make changes to several rules in bulk, while changing the version number of the updated rules and of the ruleset only once. However, if you are updating a single rule, consider using the [Update rule](/cf-rulesets/rulesets-api/update-rule) method instead.

</Aside>

The following request adds two rules to a custom ruleset.

```json
---
header: Request
---
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{custom-ruleset-id}" \
-d '{
  "rules": [
    {
      "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
      "action": "challenge",
      "description": "challenge GB and FR or based on IP Reputation"
    },
    {
      "expression": "not http.request.uri.path matches \"^/api/.*$\"",
      "action": "challenge",
      "description": "challenge not /api"
    }
  ]
}'
```

The response includes the rule ID of the new rules in the `id` field:

```json
---
header: Response
---
{
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
        "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score \u003e 0",
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
        "description": "challenge not /api",
        "last_updated": "2021-03-18T18:25:08.122758Z",
        "ref": "{custom-rule-ref-2}",
        "enabled": true
      }
    ],
    "last_updated": "2021-03-18T18:25:08.122758Z",
    "phase": "http_request_firewall_custom"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Update rules in a custom ruleset

To update one or more rules in a custom ruleset, execute a `PUT` request to the custom ruleset. Include the ID of the rules you want to modify in the rules array and add the fields you want to update. The request replaces the entire ruleset with a new version. Therefore, you must include the ID of all the rules you want to keep.

The following request edits one rule in a custom ruleset and updates the execution order of the rules.

```json
---
header: Request
---
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{ruleset-id}" \
-d '{
  "rules": [
    {
      "id": "{custom-rule-id-2}",
      "expression": "not http.request.uri.path matches \"^/api/.*$\"",
      "action": "js_challenge",
      "description": "js_challenge when not /api"
    },
    {
      "id": "{custom-rule-id-1}"
    }
  ]
}'
```

The response returns the modified custom ruleset. Note that the updated rule and ruleset version number increment.

```json
---
header: Response
---
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
        "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score \u003e 0",
        "description": "challenge GB and FR or based on IP Reputation",
        "last_updated": "2021-03-18T18:25:08.122758Z",
        "ref": "{custom-rule-id-1}",
        "enabled": true
      }
    ],
    "last_updated": "2021-03-18T18:30:08.122758Z",
    "phase": "http_request_firewall_custom"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

The `PUT` request completely replaces the existing contents of the ruleset. If you omit an existing rule from the `rules` array, it will not appear in the new version of the ruleset.
