---
title: List and view rulesets
alwaysopen: true
order: 783
---

# List and view rulesets

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

* [List existing rulesets](#list-existing-rulesets)
* [View a specific ruleset](#view-a-specific-ruleset)
* [List all versions of a ruleset](#list-all-versions-of-a-ruleset)
* [View a specific version of a ruleset](#view-a-specific-version-of-a-ruleset)
* [List rules in a Managed Ruleset with a specific tag](#list-rules-in-a-managed-ruleset-with-a-specific-tag)

## List existing rulesets

Returns the list of existing rulesets at the account level or at the zone level.

```bash
---
header: Account-level endpoint
---
GET /accounts/{account-id}/rulesets
```

```bash
---
header: Zone-level endpoint
---
GET /zones/{zone-id}/rulesets
```

The result includes rulesets across all Phases at a given level (account or zone). The `phase` field in each result element indicates the Phase where that ruleset is defined.

Also, the list of rulesets at the zone level includes the account-level rulesets you may want to deploy at the specified zone.

<Aside type='warning' header='Important'>

Not all zone-level Phases support all types of rulesets, even if they are presented in the list returned by this API method. Check the documentation for each Cloudflare product for more information on what ruleset types are allowed in that product’s supported Phases.

</Aside>

The result does not include the list of rules in the ruleset. Check [View a specific version of a ruleset](#view-a-specific-version-of-a-ruleset) to learn how to obtain the list of rules.

### Example

```bash
---
header: Request
---
curl -X GET \
  -H "X-Auth-Email: user@cloudflare.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets"
```

```json
---
header: Response
---
{
  "result": [
    {
      "id": "{phase-ruleset-id}",
      "name": "Zone-level Phase ruleset",
      "description": "",
      "kind": "zone",
      "version": "5",
      "last_updated": "2021-03-18T18:30:08.122758Z",
      "phase": "http_request_firewall_managed"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

## View a specific ruleset

Returns the properties of the most recent version of a specific ruleset.

```bash
---
header: Account-level endpoint
---
GET /accounts/{account-id}/rulesets/{ruleset-id}
```

```bash
---
header: Zone-level endpoint
---
GET /zones/{zone-id}/rulesets/{ruleset-id}
```

<Aside type='warning' header='Important'>

Note: You can only use the zone-level endpoint for zone-level rulesets, that is, Phases where `kind` is set to `zone`.

</Aside>

You can also use the following specific endpoints for viewing the ruleset of a Phase:

```bash
---
header: Account-level Phase endpoint
---
GET /accounts/{account-id}/rulesets/phases/{phase-name}/entrypoint
```

```bash
---
header: Zone-level Phase endpoint
---
GET /zones/{zone-id}/rulesets/phases/{phase-name}/entrypoint
```

Returns the ruleset with the specified Ruleset ID.

The API returns a 404 HTTP Status Code under these conditions:

* When a ruleset cannot be found.
* When the specified ruleset is not a Managed Ruleset the calling account is entitled to deploy.

### Example

```bash
---
header: Request
---
curl -X GET \
  -H "X-Auth-Email: user@cloudflare.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/{ruleset-id}"
```

```json
---
header: Response
---
{
  "result": {
    "id": "{ruleset-id}",
    "name": "Zone-level Phase ruleset",
    "description": "This ruleset deploys a Managed Ruleset.",
    "kind": "zone",
    "version": "3",
    "rules": [
      {
        "id": "{rule-id}",
        "version": "1",
        "action": "execute",
        "expression": "true",
        "action_parameters": {
          "id": "{managed-ruleset-id}"
        },
        "last_updated": "2021-03-17T15:42:37.917815Z"
      }
    ],
    "last_updated": "2021-03-17T15:42:37.917815Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## List all versions of a ruleset

Returns a list of all the versions of a ruleset.

For Managed Rulesets, this method returns a list with one item with the information about the most recent version of the ruleset.

```bash
---
header: Account-level endpoint
---
GET /accounts/{account-id}/rulesets/{ruleset-id}/versions
```

```bash
---
header: Zone-level endpoint
---
GET /zones/{zone-id}/rulesets/{ruleset-id}/versions
```

The result contains the ruleset properties of each version but it does not include the list of rules. Check [View a specific version of a ruleset](#view-a-specific-version-of-a-ruleset) to get this information.

You can also use the following specific endpoints for the ruleset of a Phase:

```bash
---
header: Account-level Phase endpoint
---
GET /accounts/{account-id}/rulesets/phases/{phase-name}/entrypoint/versions
```

```bash
---
header: Zone-level Phase endpoint
---
GET /zones/{zone-id}/rulesets/phases/{phase-name}/entrypoint/versions
```

When the specified Phase ruleset does not exist, this API method returns an empty array in the `result` field.

### Example

```bash
---
header: Request
---
curl -X GET \
  -H "X-Auth-Email: user@cloudflare.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/{ruleset-id}/versions"
```

```json
---
header: Response
---
{
  "result": [
    {
      "id": "{ruleset-id}",
      "name": "Zone Ruleset 1",
      "description": "",
      "kind": "zone",
      "version": "1",
      "last_updated": "2021-02-17T11:15:13.128705Z",
      "phase": "http_request_firewall_managed"
    },
    {
      "id": "{ruleset-id}",
      "name": "Zone Ruleset 1",
      "description": "",
      "kind": "zone",
      "version": "2",
      "last_updated": "2021-02-17T11:24:06.869326Z",
      "phase": "http_request_firewall_managed"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

## View a specific version of a ruleset

Returns the configuration of a specific version of a ruleset, including its rules.

You can view the rules in all the versions of a custom ruleset. However, you can only view the rules of the latest version of a Managed Ruleset.

```bash
---
header: Account-level endpoint
---
GET /account/{account-id}/rulesets/{ruleset-id}/versions/{version-number}
```

```bash
---
header: Zone-level endpoint
---
GET /zones/{zone-id}/rulesets/{ruleset-id}/versions/{version-number}
```

You can also use the following specific endpoints for the ruleset of a Phase:

```bash
---
header: Account-level Phase endpoint
---
GET /accounts/{account-id}/rulesets/phases/{phase-name}/entrypoint/versions/{version-number}
```

```bash
---
header: Zone-level Phase endpoint
---
GET /zones/{zone-id}/rulesets/phases/{phase-name}/entrypoint/versions/{version-number}
```

When the specified Phase ruleset does not exist, this API method returns returns a 404 HTTP Status Code.

### Example

```bash
---
header: Request
---
curl -X GET \
  -H "X-Auth-Email: user@cloudflare.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/{ruleset-id}/versions/{version-number}"
```

```json
---
header: Response
---
{
  "result": {
    "id": "{ruleset-id}",
    "name": "Zone-level Phase ruleset",
    "description": "This ruleset deploys a Managed Ruleset.",
    "kind": "zone",
    "version": "3",
    "rules": [
      {
        "id": "{rule-id}",
        "version": "1",
        "action": "execute",
        "expression": "true",
        "action_parameters": {
          "id": "{managed-ruleset-id}"
        },
        "last_updated": "2021-03-17T15:42:37.917815Z"
      }
    ],
    "last_updated": "2021-03-17T15:42:37.917815Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

<Aside type='note' header='Note'>

When you view a specific version of a Managed Ruleset, each rule listed in the result has one or more associated categories/tags and it does not contain an expression.

</Aside>

## List rules in a Managed Ruleset with a specific tag

Returns a list of all the rules in a Managed Ruleset with a specific tag.

```bash
GET /accounts/{account-id}/rulesets/{managed-ruleset-id}/{version-number}/by_category/{category-name}
```

### Example

```bash
---
header: Request
---
curl -X GET \
  -H "X-Auth-Email: user@cloudflare.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{ruleset-id}/versions/2/by_category/wordpress"
```

```json
---
header: Response
---
{
  "result": {
    "id": "{managed-ruleset-id}",
    "name": "Cloudflare Managed Ruleset",
    "description": "Managed Ruleset created by Cloudflare",
    "kind": "managed",
    "version": "4",
    "rules": [
      {
        "id": "{rule-id-1}",
        "version": "3",
        "action": "log",
        "categories": [
          "cve-2014-5265",
          "cve-2014-5266",
          "cve-2014-5267",
          "dos",
          "drupal",
          "wordpress"
        ],
        "description": "Drupal, Wordpress - DoS - XMLRPC - CVE:CVE-2014-5265, CVE:CVE-2014-5266, CVE:CVE-2014-5267",
        "last_updated": "2021-03-19T16:54:32.942986Z",
        "ref": "{rule-ref-1}",
        "enabled": true
      },
      {
        "id": "{rule-id-2}",
        "version": "3",
        "action": "block",
        "categories": [
          "broken-access-control",
          "cve-2018-12895",
          "wordpress"
        ],
        "description": "Wordpress - Broken Access Control - CVE:CVE-2018-12895",
        "last_updated": "2021-03-19T16:54:32.942986Z",
        "ref": "{rule-ref-2}",
        "enabled": true
      },
      // (...)
    ],
    "last_updated": "2021-03-19T16:54:32.942986Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```
