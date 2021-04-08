---
order: 710
type: overview
---

# View rulesets

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

## View available rulesets

You can list the available rulesets for a zone, account, or Phase. 

<details>
<summary>Example: View available rulesets at the zone level</summary>
<div>

```bash
---
header: Request
---
curl -X GET \
  -H "X-Auth-Email: user@cloudflare.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets"
```

The response displays the following rulesets:

* Managed rulesets you can deploy, indicated by `"kind": "managed"`
* Rulesets for zone-level Phases, if configured, indicated by `"kind": "zone"`
* Custom rulesets, if configured, indicated by `"kind": "custom"`

```json
---
header: Response
---
{
  "result": [
    {
      "id": "{zone-level-phase-ruleset-id}",
      "name": "Zone-level Ruleset 1",
      "description": "Ruleset for http_request_firewall_managed Phase at the zone level",
      "kind": "zone",
      "version": "2",
      "last_updated": "2021-03-12T14:11:59.754817Z",
      "phase": "http_request_firewall_managed"
    },
    {
      "id": "{cloudflare-managed-ruleset-id}",
      "name": "Cloudflare Managed Ruleset",
      "description": "Created by the Cloudflare security team, this ruleset is designed to provide fast and effective protection for all your applications. It is frequently updated to cover new vulnerabilities and reduce false positives",
      "kind": "managed",
      "version": "2",
      "last_updated": "2021-03-18T14:42:40.972022Z",
      "phase": "http_request_firewall_managed"
    },
    {
      "id": "{cloudflare-owasp-core-ruleset-id}",
      "name": "Cloudflare OWASP Core Ruleset",
      "description": "Cloudflare's implementation of the Open Web Application Security Project (OWASP) ModSecurity Core Rule Set. We routinely monitor for updates from OWASP based on the latest version available from the official code repository",
      "kind": "managed",
      "version": "3",
      "last_updated": "2021-03-18T14:42:42.993211Z",
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

<details>
<summary>Example: View available rulesets at the account level</summary>
<div>

```bash
---
header: Request
---
curl -X GET \
  -H "X-Auth-Email: user@cloudflare.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets"
```

The response displays the following rulesets:

* Managed Rulesets that you can deploy, indicated by `"kind": "managed"`
* Rulesets for account-level Phases, if configured, indicated by `"kind": "root"`
* Custom rulesets, if configured, indicated by `"kind": "custom"`

```json
---
header: Response
---
{
  "result": [
    {
      "id": "{custom-ruleset-id}",
      "name": "Custom Ruleset 1",
      "description": "My custom ruleset",
      "kind": "custom",
      "version": "10",
      "last_updated": "2020-11-23T11:36:24.192361Z",
      "phase": "http_request_firewall_custom"
    },
    {
      "id": "{account-level-phase-ruleset-id}",
      "name": "Account-level Ruleset for http_request_firewall_managed Phase",
      "description": "Account level ruleset for executing one or more Managed Rulesets",
      "kind": "root",
      "version": "2",
      "last_updated": "2021-03-12T14:06:41.323932Z",
      "phase": "http_request_firewall_managed"
    },
    {
      "id": "{cloudflare-managed-ruleset-id}",
      "name": "Cloudflare Managed Ruleset",
      "description": "Created by the Cloudflare security team, this ruleset is designed to provide fast and effective protection for all your applications. It is frequently updated to cover new vulnerabilities and reduce false positives",
      "kind": "managed",
      "version": "5",
      "last_updated": "2021-03-18T14:42:40.972022Z",
      "phase": "http_request_firewall_managed"
    },
    {
      "id": "{cloudflare-owasp-core-ruleset-id}",
      "name": "Cloudflare OWASP Core Ruleset",
      "description": "Cloudflare's implementation of the Open Web Application Security Project (OWASP) ModSecurity Core Rule Set. We routinely monitor for updates from OWASP based on the latest version available from the official code repository",
      "kind": "managed",
      "version": "3",
      "last_updated": "2021-03-18T14:42:42.993211Z",
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

## View the rules included in a ruleset

You can view all versions in Phase rulesets (both account-level and zone-level) and custom rulesets, but you can only view the most recent version of Managed Rulesets.

<details>
<summary>Example: View rules in a Phase ruleset at the zone level</summary>
<div>

The following example lists the rules in version `2` of the `http_request_firewall_managed` Phase ruleset at the zone level.

```bash
---
header: Request
---
curl -X GET \
  -H "X-Auth-Email: user@cloudflare.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/phases/http_request_firewall_managed/entrypoint/versions/2"
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
    "version": "2",
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

<details>
<summary>Example: View rules in a Managed Ruleset</summary>
<div>

The following example lists the rules in version `2` of a Managed Ruleset (the most recent version of that ruleset).

```bash
---
header: Request
---
curl -X GET \
  -H "X-Auth-Email: user@cloudflare.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{managed-ruleset-id}/versions/2"
```

```json
---
header: Response
---
{
  "result": {
    "id": "{managed-ruleset-id}",
    "name": "Cloudflare Managed Ruleset",
    "description": "Created by the Cloudflare security team, this ruleset is designed to provide fast and effective protection for all your applications. It is frequently updated to cover new vulnerabilities and reduce false positives",
    "kind": "managed",
    "version": "2",
    "rules": [
      {
        "id": "{rule-1-id}",
        "version": "1",
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
        "last_updated": "2021-03-18T14:42:40.972022Z",
        "ref": "{rule-1-ref}",
        "enabled": true
      },
      {
        "id": "{rule-2-id}",
        "version": "1",
        "action": "block",
        "categories": [
          "broken-access-control",
          "cve-2018-12895",
          "wordpress"
        ],
        "description": "Wordpress - Broken Access Control - CVE:CVE-2018-12895",
        "last_updated": "2021-03-18T14:42:40.972022Z",
        "ref": "{rule-2-ref}",
        "enabled": true
      },
      // (...)
    ],
    "last_updated": "2021-03-18T14:42:40.972022Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

Each rule in a Managed Ruleset can have associated tags or categories, listed in the `categories` field.

</div>
</details>

---

For more information on the available API methods for viewing rulesets, check [List and view rulesets](/cf-rulesets/rulesets-api/view).
