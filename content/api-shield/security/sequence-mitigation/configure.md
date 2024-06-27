---
title: Configure
pcx_content_type: how-to
type: overview
layout: wide
meta:
  title: Configure Sequence Mitigation
---

# Configure Sequence Mitigation

Configuring Sequence Mitigation via the API consists of building a rule object by choosing the sequence and setting the type of rule and its action. 

``` json
---
header: Example of a rule object
---
{
    "id": "d4909253-390f-4956-89fd-92a5b0cd86d8",
    "title": "<RULE_TITLE>",
    "kind": "allow",
    "action": "block",
    "sequence": [
     "0d9bf70c-92e1-4bb3-9411-34a3bcc59003",
     "b704ab4d-5be0-46e0-9875-b2b3d1ab42f9"
    ],
    "priority": 0,
    "last_updated": "2023-07-24T12:06:51.796286Z",
    "created_at": "2023-07-24T12:06:51.796286Z"
}
```

This rule enforces that a request to endpoint `0d9bf70c-92e1-4bb3-9411-34a3bcc59003` must come before a request to endpoint `b704ab4d-5be0-46e0-9875-b2b3d1ab42f9`. 

Otherwise, the request to endpoint `b704ab4d-5be0-46e0-9875-b2b3d1ab42f9` is blocked.

### Fields

|  <div style="width:115px">Field name</div> | Description | Possible Values | Example |
| --- | --- | --- | --- |
| `id` | An opaque identifier that identifies a rule.  | A UUID |  `"d4909253-390f-4956-89fd-92a5b0cd86d8"` |
| `title` | A string that helps to identify the rule. | A value between 1 and 50 characters | `"Allow checkout sequence"` |
| `kind` | Defines the semantics of this rule. Block rules have a negative security model and allow to explicitly deny a sequence. Allow rules have a positive security model and deny everything but the configured sequence. | `block`, `allow` | `"block"` |
| `action` | What firewall action should we do when the rule matches. | `block`,`log` | `"log"` |
| `sequence` | Denotes the operations (from Endpoint Management) that make up the sequence for this rule. We currently only support sequences of length two. The first operation will be the starting endpoint and the second operation will be the ending endpoint. | An array with two valid operation IDs from Endpoint Management |`["0d9bf70c-92e1-4bb3-9411-34a3bcc59003", "b704ab4d-5be0-46e0-9875-b2b3d1ab42f9"]` |
| `priority` | Denotes the precedence of this rule in relation to all other rules. Rules with a higher priority value are evaluated before those with a lower value. If two rules have the same priority, they are evaluated in the order in which they were added. | A valid integer | `10` |
| `last_updated` | When this rule was last changed. | A date string | `2023-05-02T12:06:51.796286Z` |
| `created_at` | When this rule was created. | A date string | `2023-05-02T12:06:51.796286Z` |

You can find an endpoint's operation ID by exporting the schema in [Endpoint Management](/api-shield/management-and-monitoring/#export-a-schema) or via the [API](/api/operations/api-shield-endpoint-management-retrieve-information-about-all-operations-on-a-zone).

### List sequence rules

Use the `GET` command to list rules.

```bash
---
header: cURL command
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/seqrules"
```

### Add a single sequence rule

Use the `POST` command to create a single rule.

This adds a single rule to all existing rules. Priority can be used to place the rule between, before, or after another rule.

The response will reflect the rule that has been written with its ID. In case something is not right with the rule, an appropriate error message with a `json` path pointing towards the issue will be provided.

```bash
---
header: Example using cURL
---
curl POST "https://api.cloudflare.com/client/v4/zones/{zoneID}/api_gateway/seqrules/rules" \
--header "Content-Type: application/json" \
--data '{
  "title": "string",
  "kind": "block",
  "action": "block",
  "sequence": [
    "0d9bf70c-92e1-4bb3-9411-34a3bcc59003",
    "b704ab4d-5be0-46e0-9875-b2b3d1ab42f9"
  ],
  "priority": 0
}'
```

### Add multiple sequence rules

Use the `PUT` command to set up new rules in bulk.

This will overwrite any existing rules and replace them with the rules specified in the body. Setting an empty array for the rules removes all rules.

The response will reflect the rules that have been written with their IDs in case something is not right with the rules, an appropriate error message with a `json` path pointing towards the issue will be provided.

```bash
---
header: Example using cURL
---
curl --request PUT "https://api.cloudflare.com/client/v4/zones/{zoneID}/api_gateway/seqrules" \
--header "Content-Type: application/json" \
--data '{
  "rules": [
    {
      "title": "<RULE_TITLE>",
      "kind": "block",
      "action": "block",
      "sequence": [
        "0d9bf70c-92e1-4bb3-9411-34a3bcc59003",
        "b704ab4d-5be0-46e0-9875-b2b3d1ab42f9"
      ],
      "priority": 0
    }
  ]
}'
```

### Delete a rule

Use the `DELETE` command with its rule ID to delete a rule.

```bash
---
header: cURL command
---
curl --request DELETE "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/seqrules/rules/d4909253-390f-4956-89fd-92a5b0cd86d8"
```
