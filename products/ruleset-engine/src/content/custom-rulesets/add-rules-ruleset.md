---
title: Add rules to a custom ruleset
pcx-content-type: how-to
alwaysopen: true
order: 762
---

# Add rules to a custom ruleset

To add rules to an existing custom ruleset, use the [Update ruleset](/rulesets-api/update) API method and pass the rules in an array. Each rule contains an expression and action.

<Aside type='note' header='Choosing the appropriate API method'>

When you add rules to a ruleset using the [Update ruleset](/rulesets-api/update) method, you replace all the rules in the ruleset with the rules in the request. Use this API method when adding or updating several rules at once. This method updates the ruleset version number only once.

You can use other API methods depending on the type of operation:

* Add a single rule to an existing custom ruleset — use the [Add rule to ruleset](/rulesets-api/add-rule) method.
* Update a single rule in a custom ruleset — use the [Update rule](/rulesets-api/update-rule) method.

</Aside>

The following request adds two rules to a custom ruleset. These will be the only two rules in the ruleset.

```json
---
header: Request
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/<CUSTOM_RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
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
    "id": "<CUSTOM_RULESET_ID>",
    "name": "Custom Ruleset 1",
    "kind": "custom",
    "version": "2",
    "rules": [
      {
        "id": "<CUSTOM_RULE_ID_1>",
        "version": "1",
        "action": "challenge",
        "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score \u003e 0",
        "description": "challenge GB and FR or based on IP Reputation",
        "last_updated": "2021-03-18T18:25:08.122758Z",
        "ref": "<CUSTOM_RULE_REF_1>",
        "enabled": true
      },
      {
        "id": "<CUSTOM_RULE_ID_2>",
        "version": "1",
        "action": "challenge",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "description": "challenge not /api",
        "last_updated": "2021-03-18T18:25:08.122758Z",
        "ref": "<CUSTOM_RULE_REF_2>",
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

To update one or more rules in a custom ruleset, use the [Update ruleset](/rulesets-api/update) API method. Include the ID of the rules you want to modify in the rules array and add the fields you want to update. The request replaces the entire ruleset with a new version. Therefore, you must include the ID of all the rules you want to keep.

The following request edits one rule in a custom ruleset and updates the execution order of the rules.

```json
---
header: Request
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "rules": [
    {
      "id": "<CUSTOM_RULE_ID_2>",
      "expression": "not http.request.uri.path matches \"^/api/.*$\"",
      "action": "js_challenge",
      "description": "js_challenge when not /api"
    },
    {
      "id": "<CUSTOM_RULE_ID_1>"
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
    "id": "<CUSTOM_RULESET_ID>",
    "name": "Custom Ruleset 1",
    "kind": "custom",
    "version": "3",
    "rules": [
      {
        "id": "<CUSTOM_RULE_ID_2>",
        "version": "2",
        "action": "js_challenge",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "description": "js_challenge when not /api",
        "last_updated": "2021-03-18T18:30:08.122758Z",
        "ref": "<CUSTOM_RULE_ID_2>",
        "enabled": true
      },
      {
        "id": "<CUSTOM_RULE_ID_1>",
        "version": "1",
        "action": "challenge",
        "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score \u003e 0",
        "description": "challenge GB and FR or based on IP Reputation",
        "last_updated": "2021-03-18T18:25:08.122758Z",
        "ref": "<CUSTOM_RULE_ID_1>",
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

The request above completely replaces the list of rules in the ruleset. If you omit an existing rule from the `rules` array, it will not appear in the new version of the ruleset.
