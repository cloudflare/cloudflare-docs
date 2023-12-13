---
title: List and view rulesets
pcx_content_type: reference
type: overview
weight: 4
layout: list
---

# List and view rulesets

- [List existing rulesets](#list-existing-rulesets)
- [View a specific ruleset](#view-a-specific-ruleset)
- [List all versions of a ruleset](#list-all-versions-of-a-ruleset)
- [View a specific version of a ruleset](#view-a-specific-version-of-a-ruleset)
- [List rules in a managed ruleset with a specific tag](#list-rules-in-a-managed-ruleset-with-a-specific-tag)

## List existing rulesets

Returns the list of existing rulesets at the account level or at the zone level.

Use one of the following API endpoints:

| Operation                           | Method + Endpoint                     |
| ----------------------------------- | ------------------------------------- |
| [List account rulesets][lr-account] | `GET /accounts/{account_id}/rulesets` |
| [List zone rulesets][lr-zone]       | `GET /zones/{zone_id}/rulesets`       |

[lr-account]: /api/operations/listAccountRulesets
[lr-zone]: /api/operations/listZoneRulesets

The result includes rulesets across all phases at a given level (account or zone). The `phase` field in each result element indicates the [phase](/ruleset-engine/about/phases/) where that ruleset is defined.

Also, the list of rulesets at the zone level includes the account-level rulesets you may want to deploy to the specified zone.

{{<Aside type="warning" header="Important">}}

Not all zone-level phases support all types of rulesets, even if they are presented in the list returned by this API method. Check the documentation for each Cloudflare product for more information on which ruleset types are allowed in that product’s supported phases.

{{</Aside>}}

The result does not include the list of rules in the ruleset. Refer to [View a specific version of a ruleset](#view-a-specific-version-of-a-ruleset) to learn how to obtain the list of rules.

### Example

{{<details header="Request" open="true">}}

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets \
--header "Authorization: Bearer <API_TOKEN>"
```

{{</details>}}

{{<details header="Response" open="true">}}

```json
{
  "result": [
    {
      "id": "<PHASE_RULESET_ID>",
      "name": "Zone-level phase entry point",
      "description": "",
      "kind": "zone",
      "version": "5",
      "last_updated": "2023-03-18T18:30:08.122758Z",
      "phase": "http_request_firewall_managed"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

{{</details>}}

## View a specific ruleset

Returns the properties of the most recent version of the ruleset with the specified ruleset ID.

Use one of the following API endpoints:

| Operation                                      | Method + Endpoint                                                    |
| ---------------------------------------------- | -------------------------------------------------------------------- |
| [Get an account ruleset][gr-account]           | `GET /accounts/{account_id}/rulesets/{ruleset_id}`                   |
| [Get a zone ruleset][gr-zone]                  | `GET /zones/{zone_id}/rulesets/{ruleset_id}`                         |
| [Get an account entry point ruleset][gep-account] | `GET /accounts/{account_id}/rulesets/phases/{phase_name}/entrypoint` |
| [Get a zone entry point ruleset][gep-zone]       | `GET /zones/{zone_id}/rulesets/phases/{phase_name}/entrypoint`       |

[gr-account]: /api/operations/getAccountRuleset
[gr-zone]: /api/operations/getZoneRuleset
[gep-account]: /api/operations/getAccountEntrypointRuleset
[gep-zone]: /api/operations/getZoneEntrypointRuleset

{{<Aside type="warning" header="Important">}}

You can only use the _Get a zone ruleset_ operation for zone-level phase entry points, that is, entry points where `kind` is set to `zone`.

{{</Aside>}}

The API returns a `404 Not Found` HTTP status code under these conditions:

- When a ruleset cannot be found.
- When the specified ruleset is not a managed ruleset the calling account is entitled to execute.

### Example

{{<details header="Request" open="true">}}

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id} \
--header "Authorization: Bearer <API_TOKEN>"
```

{{</details>}}

{{<details header="Response" open="true">}}

```json
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "Zone-level phase entry point",
    "description": "Executes a managed ruleset.",
    "kind": "zone",
    "version": "3",
    "rules": [
      {
        "id": "<RULE_ID>",
        "version": "1",
        "action": "execute",
        "expression": "true",
        "action_parameters": {
          "id": "<MANAGED_RULESET_ID>"
        },
        "last_updated": "2023-03-17T15:42:37.917815Z"
      }
    ],
    "last_updated": "2023-03-17T15:42:37.917815Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

{{</details>}}

## List all versions of a ruleset

Returns a list of all the versions of a ruleset.

Use one of the following API endpoints:

| Operation                                                  | Method + Endpoint                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [List account ruleset versions][lv-account]                | `GET /accounts/{account_id}/rulesets/{ruleset_id}/versions`                   |
| [List zone ruleset versions][lv-zone]                      | `GET /zones/{zone_id}/rulesets/{ruleset_id}/versions`                         |
| [List account entry point ruleset versions][lev-account]   | `GET /accounts/{account_id}/rulesets/phases/{phase_name}/entrypoint/versions` |
| [List zone entry point ruleset versions][lev-zone]         | `GET /zones/{zone_id}/rulesets/phases/{phase_name}/entrypoint/versions`       |

[lv-account]: /api/operations/listAccountRulesetVersions
[lv-zone]: /api/operations/listZoneRulesetVersions
[lev-account]: /api/operations/listAccountEntrypointRulesetVersions
[lev-zone]: /api/operations/listZoneEntrypointRulesetVersions

The result contains the ruleset properties of each version, but it does not include the list of rules. Refer to [View a specific version of a ruleset](#view-a-specific-version-of-a-ruleset) for instructions on obtaining this information.

When the specified phase entry point ruleset does not exist, this API method returns an empty array in the `result` field.

### Example

{{<details header="Request" open="true">}}

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/versions \
--header "Authorization: Bearer <API_TOKEN>"
```

{{</details>}}

{{<details header="Response" open="true">}}

```json
{
  "result": [
    {
      "id": "<RULESET_ID>",
      "name": "Zone Ruleset 1",
      "description": "",
      "kind": "zone",
      "version": "1",
      "last_updated": "2023-02-17T11:15:13.128705Z",
      "phase": "http_request_firewall_managed"
    },
    {
      "id": "<RULESET_ID>",
      "name": "Zone Ruleset 1",
      "description": "",
      "kind": "zone",
      "version": "2",
      "last_updated": "2023-02-17T11:24:06.869326Z",
      "phase": "http_request_firewall_managed"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

{{</details>}}

## View a specific version of a ruleset

Returns the configuration of a specific version of a ruleset, including its rules.

Use one of the following API endpoints:

| Operation                                                  | Method + Endpoint                                                                              |
|------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| [Get an account ruleset version][grv-account]              | `GET /account/{account_id}/rulesets/{ruleset_id}/versions/{version_number}`                    |
| [Get a zone ruleset version][grv-zone]                     | `GET /zones/{zone_id}/rulesets/{ruleset_id}/versions/{version_number}`                         |
| [Get an account entry point ruleset version][gerv-account] | `GET /accounts/{account_id}/rulesets/phases/{phase_name}/entrypoint/versions/{version_number}` |
| [Get a zone entry point ruleset version][gerv-zone]        | `GET /zones/{zone_id}/rulesets/phases/{phase_name}/entrypoint/versions/{version_number}`       |

[grv-account]: /api/operations/getAccountRulesetVersion
[grv-zone]: /api/operations/getZoneRulesetVersion
[gerv-account]: /api/operations/getAccountEntrypointRulesetVersion
[gerv-zone]: /api/operations/getZoneEntrypointRulesetVersion

When the specified phase entry point ruleset does not exist, this API method returns a `404 Not Found` HTTP status code.

### Example

{{<details header="Request" open="true">}}

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/versions/{version_number} \
--header "Authorization: Bearer <API_TOKEN>"
```

{{</details>}}

{{<details header="Response" open="true">}}

```json
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "Zone-level phase entry point",
    "description": "Executes a managed ruleset.",
    "kind": "zone",
    "version": "3",
    "rules": [
      {
        "id": "<RULE_ID>",
        "version": "1",
        "action": "execute",
        "expression": "true",
        "action_parameters": {
          "id": "<MANAGED_RULESET_ID>"
        },
        "last_updated": "2023-03-17T15:42:37.917815Z"
      }
    ],
    "last_updated": "2023-03-17T15:42:37.917815Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

{{</details>}}

{{<Aside type="note" header="Note">}}

When you view a specific version of a managed ruleset, each rule listed in the result can have one or more associated categories/tags, and it will not contain an expression.

{{</Aside>}}

## List rules in a managed ruleset with a specific tag

Returns a list of all the rules in a managed ruleset with a specific tag.

| Operation                                            | Method + Endpoint                                                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [List rules in account ruleset version by tag][lrbt] | `GET /accounts/{account_id}/rulesets/{managed_ruleset_id}/versions/{version_number}/by_tag/{tag_name}` |

[lrbt]: /api/operations/listAccountRulesetVersionRulesByTag

### Example

{{<details header="Request" open="true">}}

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{ruleset_id}/versions/2/by_tag/wordpress \
--header "Authorization: Bearer <API_TOKEN>"
```

{{</details>}}

{{<details header="Response" open="true">}}

```json
{
  "result": {
    "id": "<MANAGED_RULESET_ID>",
    "name": "Cloudflare Managed Ruleset",
    "description": "Managed ruleset created by Cloudflare",
    "kind": "managed",
    "version": "4",
    "rules": [
      {
        "id": "<RULE_ID_1>",
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
        "description": "Drupal, WordPress - DoS - XMLRPC - CVE:CVE-2014-5265, CVE:CVE-2014-5266, CVE:CVE-2014-5267",
        "last_updated": "2023-03-19T16:54:32.942986Z",
        "ref": "<RULE_REF_1>",
        "enabled": true
      },
      {
        "id": "<RULE_ID_2>",
        "version": "3",
        "action": "block",
        "categories": ["broken-access-control", "cve-2018-12895", "wordpress"],
        "description": "WordPress - Broken Access Control - CVE:CVE-2018-12895",
        "last_updated": "2023-03-19T16:54:32.942986Z",
        "ref": "<RULE_REF_2>",
        "enabled": true
      }
      // (...)
    ],
    "last_updated": "2023-03-19T16:54:32.942986Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

{{</details>}}
