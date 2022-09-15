---
title: Create a rule via API
pcx_content_type: how-to
weight: 3
meta:
  title: Create an Origin Rule via API
---

# Create an Origin Rule via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create Origin Rules via API. Define the route configuration in the `action_parameters` field.

When creating an Origin Rule via API, make sure you:

* Set the rule action to `route`.
* Define the [parameters](/rules/origin-rules/parameters/) in the `action_parameters` field according to the type of origin override.
* Deploy the rule to the `http_request_origin` phase at the zone level.

***

Follow this workflow to create an Origin Rule for a given zone via API:

1. Use the [List existing rulesets](/ruleset-engine/rulesets-api/view/#list-existing-rulesets) method to check if there is already a ruleset for the `http_request_origin` phase at the zone level.

2. If the phase ruleset does not exist, create it using the [Create ruleset](/ruleset-engine/rulesets-api/create/) method with the zone-level endpoint. In the new ruleset properties, set the following values:

    * **kind**: `zone`
    * **phase**: `http_request_origin`

3. Use the [Update ruleset](/ruleset-engine/rulesets-api/update/) method to add an Origin Rule to the list of ruleset rules (check the examples below). Alternatively, include the rule in the [Create ruleset](/ruleset-engine/rulesets-api/create/) request mentioned in the previous step.

## Required API token permissions

The API token used in API requests to manage Origin Rules must have at least the following permission:

* _Origin_ > _Edit_

## Examples

<details>
<summary>Example: Add a rule that overrides the HTTP <code>Host</code> header</summary>
<div>

The following example sets the rules of an existing phase ruleset (`<RULESET_ID>`) to a single Origin Rule — overriding the HTTP `Host` header — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) method:

```json
---
header: cURL example request
---
$ curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rules": [
    {
      "expression": "(http.request.uri.query contains \"/eu/\")",
      "description": "My first Origin Rule",
      "action": "route",
      "action_parameters": {
        "host_header": "eu_server.example.net"
      }
    }
  ]
}'
```

The response contains the complete definition of the ruleset you updated.

```json
---
header: Response
---
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "Origin Rules ruleset",
    "description": "Zone-level ruleset that will execute Origin Rules.",
    "kind": "zone",
    "version": "2",
    "rules": [
      {
        "id": "<RULE_ID>",
        "version": "1",
        "action": "route",
        "action_parameters": {
          "host_header": "eu_server.example.net"
        },
        "expression": "(http.request.uri.query contains \"/eu/\")",
        "description": "My first Origin Rule",
        "last_updated": "2022-06-02T14:42:04.219025Z",
        "ref": "<RULE_REF>"
      }
    ],
    "last_updated": "2022-06-02T14:42:04.219025Z",
    "phase": "http_request_origin"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

<details>
<summary>Example: Add a rule that overrides the URL and port of incoming requests</summary>
<div>

The following example sets the rules of an existing phase ruleset (`<RULESET_ID>`) to a single Origin Rule — overriding the URL and port of incoming requests — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) method:

```json
---
header: cURL example request
---
$ curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rules": [
    {
      "expression": "starts_with(http.request.uri.path, \"/team/calendar/\")",
      "description": "Origin Rule for the team calendar application",
      "action": "route",
      "action_parameters": {
        "origin": {
          "host": "internalserver.example.com",
          "port": 9000
        }
      }
    }
  ]
}'
```

The response contains the complete definition of the ruleset you updated.

```json
---
header: Response
---
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "Origin Rules ruleset",
    "description": "Zone-level ruleset that will execute Origin Rules.",
    "kind": "zone",
    "version": "2",
    "rules": [
      {
        "id": "<RULE_ID>",
        "version": "1",
        "action": "route",
        "action_parameters": {
          "origin": {
            "host": "internalserver.example.com",
            "port": 9000
          }
        },
        "expression": "starts_with(http.request.uri.path, \"/team/calendar/\")",
        "description": "Origin Rule for the team calendar application",
        "last_updated": "2022-06-03T14:42:04.219025Z",
        "ref": "<RULE_REF>"
      }
    ],
    "last_updated": "2022-06-03T14:42:04.219025Z",
    "phase": "http_request_origin"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

<details>
<summary>Example: Add a rule that overrides the SNI value of incoming requests</summary>
<div>

The following example sets the rules of an existing phase ruleset (`<RULESET_ID>`) to a single Origin Rule — overriding the SNI value of incoming requests addressed at `admin.example.com` — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) method:

```json
---
header: cURL example request
---
$ curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rules": [
    {
      "expression": "http.host eq \"admin.example.com\"",
      "description": "SNI Override for the admin area",
      "action": "route",
      "action_parameters": {
        "sni": {
          "value": "sni.example.com"
        }
      }
    }
  ]
}'
```

</div>
</details>