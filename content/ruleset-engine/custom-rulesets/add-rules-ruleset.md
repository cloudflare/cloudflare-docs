---
title: Add rules to a custom ruleset
pcx_content_type: how-to
weight: 3
---

# Add rules to a custom ruleset

To add rules to an existing custom ruleset, use the [Update an account ruleset](/api/operations/account-rulesets-update-an-account-ruleset) API operation and pass the rules in an array. Each rule has an expression and an action.

{{<Aside type="note" header="Choosing the appropriate API method">}}

When you add rules to a custom ruleset using the [Update an account ruleset](/api/operations/account-rulesets-update-an-account-ruleset) API operation, you replace all the rules in the ruleset with the rules in the request. Use this API method when adding or updating several rules at once. This method will update the ruleset version number only once.

You can use other API operations depending on the type of operation:

* Add a single rule to an existing custom ruleset — use the [Create account ruleset rule](/api/operations/account-rulesets-create-an-account-ruleset-rule) operation.
* Update a single rule in a custom ruleset — use the [Update an account ruleset rule](/api/operations/account-rulesets-update-an-account-ruleset-rule) operation.

{{</Aside>}}

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

To update one or more rules in a custom ruleset, use the [Update an account ruleset](/api/operations/account-rulesets-update-an-account-ruleset) API operation. Include the ID of the rules you want to modify in the rules array and add the fields you wish to update. The request replaces the entire ruleset with a new version. Therefore, you must include the ID of all the rules you wish to keep.

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
