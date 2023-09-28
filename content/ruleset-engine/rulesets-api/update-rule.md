---
title: Update a rule in a ruleset
pcx_content_type: reference
type: overview
weight: 8
layout: list
---

# Update a rule in a ruleset

Applies one or more changes to an existing rule in a ruleset at the account or zone level.

Use one of the following API endpoints:

| Operation | Method + Endpoint |
|-----------|-------------------|
| [Update an account ruleset rule][ur-account] | `PATCH /accounts/{account_id}/rulesets/{ruleset_id}/rules/{rule_id}` |
| [Update a zone ruleset rule][ur-zone] | `PATCH /zones/{zone_id}/rulesets/{ruleset_id}/rules/{rule_id}` |

[ur-account]: /api/operations/updateAccountRulesetRule
[ur-zone]: /api/operations/updateZoneRulesetRule

You can update the definition of the rule, changing its fields, or change the order of the rule in the ruleset. Invoking this method creates a new version of the ruleset.

## Update the definition of a rule

To update the definition of a rule, include the new rule definition in the request body. You must include all the rule fields that you want to be part of the new rule definition, even if you are not changing their values.

<details open>
<summary>Request</summary>
<div>

```bash
curl --request PATCH \
https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{ruleset_id}/rules/{rule_id_1} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "action": "js_challenge",
  "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
  "description": "challenge GB and FR or based on IP Reputation"
}'
```

</div>
</details>

The response includes the complete ruleset after updating the rule.

<details>
<summary>Response</summary>
<div>

```json
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "Custom Ruleset 1",
    "description": "My first custom ruleset",
    "kind": "custom",
    "version": "11",
    "rules": [
      {
        "id": "<RULE_ID_1>",
        "version": "2",
        "action": "js_challenge",
        "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
        "description": "challenge GB and FR or based on IP Reputation",
        "last_updated": "2023-03-22T12:54:58.144683Z",
        "ref": "<RULE_REF_1>",
        "enabled": true
      },
      {
        "id": "<RULE_ID_2>",
        "version": "1",
        "action": "challenge",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "last_updated": "2022-11-23T11:36:24.192361Z",
        "ref": "<RULE_REF_2>",
        "enabled": true
      }
    ],
    "last_updated": "2023-03-22T12:54:58.144683Z",
    "phase": "http_request_firewall_custom"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

## Change the order of a rule in a ruleset

To reorder a rule in a list of ruleset rules, include a `position` object in the request, containing one of the following:

*   `"before": "<RULE_ID>"` — Places the rule before rule `<RULE_ID>`. Use this argument with an empty rule ID value (`""`) to set the rule as the first rule in the ruleset.

*   `"after": "<RULE_ID>"` — Places the rule after rule `<RULE_ID>`. Use this argument with an empty rule ID value (`""`) to set the rule as the last rule in the ruleset.

*   `"index": <POSITION_NUMBER>` — Places the rule in the exact position specified by the integer number `<POSITION_NUMBER>`. Position numbers start with `1`. Existing rules in the ruleset from the specified position number onward are shifted one position (no rule is overwritten). For example, when you place a rule in position <var>n</var> using `index`, existing rules with index <var>n</var>, <var>n</var>+1, <var>n</var>+2, and so on, are shifted one position — their new position will be <var>n</var>+1, <var>n</var>+2, <var>n</var>+3, and so forth. If the index is out of range, the method returns 400 HTTP Status Code.

{{<Aside type="warning" header="Important">}}

You can only use one of the `before`, `after`, and `index` fields at a time.

{{</Aside>}}

Reorder a rule without changing its definition by including only the `position` object in the `PATCH` request body. You can also update a rule definition and reorder it in the same `PATCH` request by including both the `rule` object and the `position` object.

The following examples build upon the following (abbreviated) ruleset:

```json
{
  "rules": [
    { "id": "<RULE_ID_1>" },
    { "id": "<RULE_ID_2>" },
    { "id": "<RULE_ID_3>" },
    { "id": "<RULE_ID_4>" }
  ]
}
```

### Example #1

The following request with the `position` object places rule `<RULE_ID_2>` as the first rule:

```bash
---
header: Request
---
curl --request PATCH \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules/{rule_id_2} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "position": {
    "before": ""
  }
}
```

In this case, the new rule order would be:

`<RULE_ID_2>`, `<RULE_ID_1>`, `<RULE_ID_3>`, `<RULE_ID_4>`

### Example #2

The following request with the `position` object places rule `<RULE_ID_2>` after rule 3:

```bash
---
header: Request
---
curl --request PATCH \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules/{rule_id_2} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "position": {
    "after": "<RULE_ID_3>"
  }
}
```

In this case, the new rule order would be:

`<RULE_ID_1>`, `<RULE_ID_3>`, `<RULE_ID_2>`, `<RULE_ID_4>`

### Example #3

The following request with the `position` object places rule `<RULE_ID_1>` in position 3, becoming the third rule in the ruleset:

```bash
---
header: Request
---
curl --request PATCH \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules/{rule_id_1} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "position": {
    "index": 3
  }
}'
```

In this case, the new rule order would be:

`<RULE_ID_2>`, `<RULE_ID_3>`, `<RULE_ID_1>`, `<RULE_ID_4>`
