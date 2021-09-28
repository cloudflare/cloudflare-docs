---
title: List and view rulesets
pcx-content-type: reference
order: 783
type: overview
---

# List and view rulesets

* [List existing rulesets](#list-existing-rulesets)
* [View a specific ruleset](#view-a-specific-ruleset)
* [List all versions of a ruleset](#list-all-versions-of-a-ruleset)
* [View a specific version of a ruleset](#view-a-specific-version-of-a-ruleset)
* [List rules in a Managed Ruleset with a specific tag](#list-rules-in-a-managed-ruleset-with-a-specific-tag)

## List existing rulesets

Returns the list of existing rulesets at the account level or at the zone level.

Use one of the following API endpoints:

| Operation                           | Method + Endpoint                     |
|-------------------------------------|---------------------------------------|
| [List account rulesets][lr-account] | `GET /accounts/{account-id}/rulesets` |
| [List zone rulesets][lr-zone]       | `GET /zones/{zone-id}/rulesets`       |

[lr-account]: https://api.cloudflare.com/#account-rulesets-list-account-rulesets
[lr-zone]: https://api.cloudflare.com/#zone-rulesets-list-zone-rulesets

The result includes rulesets across all phases at a given level (account or zone). The `phase` field in each result element indicates the phase where that ruleset is defined.

Also, the list of rulesets at the zone level includes the account-level rulesets you may want to deploy to the specified zone.

<Aside type='warning' header='Important'>

Not all zone-level phases support all types of rulesets, even if they are presented in the list returned by this API method. Check the documentation for each Cloudflare product for more information on which ruleset types are allowed in that product’s supported phases.

</Aside>

The result does not include the list of rules in the ruleset. Check [View a specific version of a ruleset](#view-a-specific-version-of-a-ruleset) to learn how to obtain the list of rules.

### Example

<details open>
<summary>Request</summary>
<div>

```bash
curl -X GET \
  -H "X-Auth-Email: user@example.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets"
```

</div>
</details>

<details open>
<summary>Response</summary>
<div>

```json
{
  "result": [
    {
      "id": "{phase-ruleset-id}",
      "name": "Zone-level phase entry point",
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

</div>
</details>

## View a specific ruleset

Returns the properties of the most recent version of the ruleset with the specified ruleset ID.

Use one of the following API endpoints:

| Operation | Method + Endpoint |
|-----------|-------------------|
| [Get an account ruleset][gr-account] | `GET /accounts/{account-id}/rulesets/{ruleset-id}` |
| [Get a zone ruleset][gr-zone] | `GET /zones/{zone-id}/rulesets/{ruleset-id}` |
| [Get account entry point ruleset][gep-account] | `GET /accounts/{account-id}/rulesets/phases/{phase-name}/entrypoint` |
| [Get zone entry point ruleset][gep-zone] | `GET /zones/{zone-id}/rulesets/phases/{phase-name}/entrypoint` |

[gr-account]: https://api.cloudflare.com/#account-rulesets-get-an-account-ruleset
[gr-zone]: https://api.cloudflare.com/#zone-rulesets-get-a-zone-ruleset
[gep-account]: https://api.cloudflare.com/#account-rulesets-get-entrypoint-ruleset
[gep-zone]: https://api.cloudflare.com/#zone-rulesets-get-entrypoint-ruleset

<Aside type='warning' header='Important'>

Note: You can only use the _Get a zone ruleset_ operation for zone-level phase entry points, that is, entry points where `kind` is set to `zone`.

</Aside>

The API returns a `404 Not Found` HTTP status code under these conditions:

* When a ruleset cannot be found.
* When the specified ruleset is not a Managed Ruleset the calling account is entitled to execute.

### Example

<details open>
<summary>Request</summary>
<div>

```bash
curl -X GET \
  -H "X-Auth-Email: user@example.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/{ruleset-id}"
```

</div>
</details>

<details open>
<summary>Response</summary>
<div>

```json
{
  "result": {
    "id": "{ruleset-id}",
    "name": "Zone-level phase entry point",
    "description": "Executes a Managed Ruleset.",
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

</div>
</details>

## List all versions of a ruleset

Returns a list of all the versions of a ruleset.

Use one of the following API endpoints:

| Operation | Method + Endpoint |
|-----------|-------------------|
| [List versions of an account ruleset][lv-account] | `GET /accounts/{account-id}/rulesets/{ruleset-id}/versions` |
| List versions of a zone ruleset | `GET /zones/{zone-id}/rulesets/{ruleset-id}/versions` |
| [List versions of an account entry point ruleset][lvep-account] | `GET /accounts/{account-id}/rulesets/phases/{phase-name}/entrypoint/versions`|
| [List versions of a zone entry point ruleset][lvep-zone] | `GET /zones/{zone-id}/rulesets/phases/{phase-name}/entrypoint/versions` |

[lv-account]: https://api.cloudflare.com/#account-rulesets-list-versions-of-an-account-ruleset
[lvep-account]: https://api.cloudflare.com/#account-rulesets-list-versions-of-an-entrypoint-ruleset
[lvep-zone]: https://api.cloudflare.com/#zone-rulesets-list-versions-of-an-entrypoint-ruleset

The result contains the ruleset properties of each version, but it does not include the list of rules. Check [View a specific version of a ruleset](#view-a-specific-version-of-a-ruleset) to get this information.

For Managed Rulesets, this method returns a list with one item with the information about the most recent version of the ruleset.

When the specified phase entry point ruleset does not exist, this API method returns an empty array in the `result` field.

### Example

<details open>
<summary>Request</summary>
<div>

```bash
curl -X GET \
  -H "X-Auth-Email: user@example.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/{ruleset-id}/versions"
```

</div>
</details>

<details open>
<summary>Response</summary>
<div>

```json
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

</div>
</details>

## View a specific version of a ruleset

Returns the configuration of a specific version of a ruleset, including its rules.

Use one of the following API endpoints:

| Operation | Method + Endpoint |
|-----------|-------------------|
| [Get an account ruleset version][grv-account] | `GET /account/{account-id}/rulesets/{ruleset-id}/versions/{version-number}` |
| [Get a zone ruleset version][grv-zone] | `GET /zones/{zone-id}/rulesets/{ruleset-id}/versions/{version-number}`
| [Get account entry point ruleset version][gepv-account] | `GET /accounts/{account-id}/rulesets/phases/{phase-name}/entrypoint/versions/{version-number}` |
| [Get zone entry point ruleset version][gepv-zone] | `GET /zones/{zone-id}/rulesets/phases/{phase-name}/entrypoint/versions/{version-number}` |

[grv-account]: https://api.cloudflare.com/#account-rulesets-get-an-account-ruleset-version
[grv-zone]: https://api.cloudflare.com/#zone-rulesets-get-a-zone-ruleset-version
[gepv-account]: https://api.cloudflare.com/#account-rulesets-get-an-entrypoint-ruleset-version
[gepv-zone]: https://api.cloudflare.com/#zone-rulesets-get-an-entrypoint-ruleset-version

You can view the rules in all the versions of a custom ruleset. However, you can only view the rules of the latest version of a Managed Ruleset.

When the specified phase entry point ruleset does not exist, this API method returns a `404 Not Found` HTTP status code.

### Example

<details open>
<summary>Request</summary>
<div>

```bash
curl -X GET \
  -H "X-Auth-Email: user@example.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/{ruleset-id}/versions/{version-number}"
```

</div>
</details>

<details open>
<summary>Response</summary>
<div>

```json
{
  "result": {
    "id": "{ruleset-id}",
    "name": "Zone-level phase entry point",
    "description": "Executes a Managed Ruleset.",
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

</div>
</details>

<Aside type='note' header='Note'>

When you view a specific version of a Managed Ruleset, each rule listed in the result can have one or more associated categories/tags, and it will not contain an expression.

</Aside>

## List rules in a Managed Ruleset with a specific tag

Returns a list of all the rules in a Managed Ruleset with a specific tag.

| Operation | Method + Endpoint |
|-----------|-------------------|
| List rules in ruleset by tag | `GET /accounts/{account-id}/rulesets/{managed-ruleset-id}/{version-number}/by_tag/{tag-name}` |

### Example

<details open>
<summary>Request</summary>
<div>

```bash
curl -X GET \
  -H "X-Auth-Email: user@example.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{ruleset-id}/versions/2/by_tag/wordpress"
```

</div>
</details>

<details open>
<summary>Response</summary>
<div>

```json
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

</div>
</details>
