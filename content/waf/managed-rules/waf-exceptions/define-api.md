---
pcx_content_type: configuration
title: Add an exception via API
weight: 3
meta:
    title: Add an exception via API
---

# Add an exception via API

To add a managed rules exception via API, create a rule with `skip` action in a [phase entry point ruleset](/ruleset-engine/about/rulesets/#entry-point-ruleset) of the `http_request_firewall_managed` phase. You can define exceptions at the account level and at the zone level. Exceptions are also called skip rules.

To configure the exception, define the `action_parameters` object according to the exception type. Refer to the following examples:

- [Skip all remaining rules](#skip-all-remaining-rules)
- [Skip one or more WAF managed rulesets](#skip-one-or-more-waf-managed-rulesets)
- [Skip one or more rules of WAF managed rulesets](#skip-one-or-more-rules-of-waf-managed-rulesets)

For more information on creating exceptions via API, refer to [Create an exception](/ruleset-engine/managed-rulesets/create-exception/) in the Ruleset Engine documentation.

{{<Aside type="note" header="Rule execution order">}}
Rules with `skip` action only apply to rules with `execute` action listed **after** them. If you add a rule with `skip` action at the end of the rules list, nothing will be skipped.
{{</Aside>}}

## Examples

### Skip all remaining rules

The following example adds a rule that skips all remaining rules in the entry point ruleset for requests matching the `dev.example.com` hostname.

1. Invoke the [Get a zone entry point ruleset](/api/operations/getZoneEntrypointRuleset) operation to obtain the current configuration of the entry point ruleset of the `http_request_firewall_managed` phase.

    ```bash
    ---
    header: Request
    ---
    curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_request_firewall_managed/entrypoint \
    --header "Authorization: Bearer <API_TOKEN>"
    ```

    ```json
    ---
    header: Example response
    highlight: 3
    ---
    {
      "result": {
        "id": "060013b1eeb14c93b0dcd896537e0d2c", // entry point ruleset ID
        "name": "default",
        "description": "",
        "source": "firewall_managed",
        "kind": "zone",
        "version": "3",
        "rules": [
          // (...)
        ],
        "last_updated": "2024-01-20T14:29:00.190643Z",
        "phase": "http_request_firewall_managed"
      },
      "success": true,
      "errors": [],
      "messages": []
    }
    ```

    Save the entry point ruleset ID (`060013b1eeb14c93b0dcd896537e0d2c`) for the next step.

2. Invoke the [Create a zone ruleset rule](/api/operations/createZoneRulesetRule) operation (a `POST` request) to add an exception (or skip rule) at the beginning of the rules list, since a skip rule applies only to rules listed after it. The exact rule location is defined in the [`position` object](/ruleset-engine/rulesets-api/add-rule/#define-the-rule-position-in-the-ruleset).

    ```bash
    ---
    header: Request
    highlight: 5-12
    ---
    curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{entry_point_ruleset_id}/rules" \
    --header "Authorization: Bearer <API_TOKEN>" \
    --header "Content-Type: application/json" \
    --data '{
      "expression": "(http.host eq \"dev.example.com\")",
      "description": "Skip managed rules for dev.example.com",
      "action": "skip",
      "action_parameters": {
        "ruleset": "current"
      },
      "position": {
        "before": ""
      }
    }'
    ```

For more information on skipping all remaining rules via API, refer to [Create an exception](/ruleset-engine/managed-rulesets/create-exception/#skip-all-remaining-rules) in the Ruleset Engine documentation.

### Skip the Cloudflare Managed Ruleset

The following example adds a rule that skips the [Cloudflare Managed Ruleset](/waf/managed-rules/reference/cloudflare-managed-ruleset/) for requests matching the `dev.example.com` hostname.

1. Invoke the [Get a zone entry point ruleset](/api/operations/getZoneEntrypointRuleset) operation to obtain the current configuration of the entry point ruleset of the `http_request_firewall_managed` phase.

    ```bash
    ---
    header: Request
    ---
    curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_request_firewall_managed/entrypoint \
    --header "Authorization: Bearer <API_TOKEN>"
    ```

    ```json
    ---
    header: Example response
    highlight: 3,12,20
    ---
    {
      "result": {
        "id": "060013b1eeb14c93b0dcd896537e0d2c", // entry point ruleset ID
        "name": "default",
        "description": "",
        "source": "firewall_managed",
        "kind": "zone",
        "version": "3",
        "rules": [
          // (...)
          {
            "id": "1bdb49371c1f46958fc8b985efcb79e7", // `execute` rule ID
            "version": "1",
            "action": "execute",
            "expression": "true",
            "last_updated": "2024-01-20T14:21:28.643979Z",
            "ref": "1bdb49371c1f46958fc8b985efcb79e7",
            "enabled": true,
            "action_parameters": {
              "id": "efb7b8c949ac4650a09736fc376e9aee", // "Cloudflare Managed Ruleset" ID
              "version": "latest"
            }
          },
          // (...)
        ],
        "last_updated": "2024-01-20T14:29:00.190643Z",
        "phase": "http_request_firewall_managed"
      },
      "success": true,
      "errors": [],
      "messages": []
    }
    ```

    Identify the rule deploying the Cloudflare Managed Ruleset by searching for an `execute` rule with `action_parameters` > `id` equal to `efb7b8c949ac4650a09736fc376e9aee` (the managed ruleset ID).

    {{<Aside type="note">}}
To get the IDs of existing WAF managed rulesets, refer to [WAF Managed Rules](/waf/managed-rules/#managed-rulesets) or use the [List account rulesets](/api/operations/listAccountRulesets) operation.
    {{</Aside>}}

    Save the following IDs for the next step:

    - The ID of the entry point ruleset (`060013b1eeb14c93b0dcd896537e0d2c` in this example)
    - The ID of the `execute` rule deployment the managed ruleset (`1bdb49371c1f46958fc8b985efcb79e7` in this example)

2. Invoke the [Create a zone ruleset rule](/api/operations/createZoneRulesetRule) operation (a `POST` request) to add an exception (or skip rule) immediately before the `execute` rule deploying the Cloudflare Managed Ruleset, since a skip rule applies only to rules listed after it. The exact rule location is defined in the [`position` object](/ruleset-engine/rulesets-api/add-rule/#define-the-rule-position-in-the-ruleset).

    ```bash
    ---
    header: Request
    highlight: 5-12
    ---
    curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{entry_point_ruleset_id}/rules" \
    --header "Authorization: Bearer <API_TOKEN>" \
    --header "Content-Type: application/json" \
    --data '{
      "expression": "(http.host eq \"dev.example.com\")",
      "description": "Skip the Cloudflare Managed Ruleset for dev.example.com",
      "action": "skip",
      "action_parameters": {
        "rulesets": [
          "efb7b8c949ac4650a09736fc376e9aee"
        ]
      },
      "position": {
        "before": "1bdb49371c1f46958fc8b985efcb79e7"
      }
    }'
    ```

For more information on skipping one or more managed rulesets via API, refer to [Create an exception](/ruleset-engine/managed-rulesets/create-exception/#skip-one-or-more-managed-rulesets) in the Ruleset Engine documentation.

### Skip one or more rules of WAF managed rulesets

The following example adds a rule that skips a particular rule of the [Cloudflare Managed Ruleset](/waf/managed-rules/reference/cloudflare-managed-ruleset/) for requests matching the `dev.example.com` hostname.

1. Invoke the [Get a zone ruleset](/api/operations/getZoneRuleset) operation to obtain a list of rules in the Cloudflare Managed Ruleset (ruleset ID `efb7b8c949ac4650a09736fc376e9aee`).<br>
    You can get the managed ruleset details using the account-level endpoint ([Get an account ruleset](/api/operations/getAccountRuleset)) or the zone-level endpoint ([Get a zone ruleset](/api/operations/getZoneRuleset)).

    {{<Aside type="note">}}
To get the IDs of existing WAF managed rulesets, refer to [WAF Managed Rules](/waf/managed-rules/#managed-rulesets) or use the [List account rulesets](/api/operations/listAccountRulesets) operation.
    {{</Aside>}}

    ```bash
    ---
    header: Request
    ---
    curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/efb7b8c949ac4650a09736fc376e9aee \
    --header "Authorization: Bearer <API_TOKEN>"
    ```

    ```json
    ---
    header: Example response
    highlight: 12
    ---
    {
      "result": {
        "id": "efb7b8c949ac4650a09736fc376e9aee",
        "name": "Cloudflare Managed Ruleset",
        "description": "Created by the Cloudflare security team, this ruleset is designed to provide fast and effective protection for all your applications. It is frequently updated to cover new vulnerabilities and reduce false positives.",
        "source": "firewall_managed",
        "kind": "managed",
        "version": "180",
        "rules": [
          // (...)
          {
            "id": "d9e350f1b72d4730899c8a420e48a85d", // ID of rule to skip
            "version": "180",
            "action": "block",
            "categories": [
              "file-inclusion",
              "october-cms"
            ],
            "description": "October CMS - File Inclusion",
            "last_updated": "2024-02-05T07:12:54.565276Z",
            "ref": "adb550873eb92d32372ed08514d33241",
            "enabled": true
          },
          // (...)
        ],
        "last_updated": "2024-02-05T07:12:54.565276Z",
        "phase": "http_request_firewall_managed"
      },
      "success": true,
      "errors": [],
      "messages": []
    }
    ```

    Take note of the ID of the rule you want to skip (`d9e350f1b72d4730899c8a420e48a85d` in this example).

2. Invoke the [Get a zone entry point ruleset](/api/operations/getZoneEntrypointRuleset) operation to obtain the current configuration of the [entry point ruleset](/ruleset-engine/about/rulesets/#entry-point-ruleset) of the `http_request_firewall_managed` phase.

    ```bash
    ---
    header: Request
    ---
    curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_request_firewall_managed/entrypoint \
    --header "Authorization: Bearer <API_TOKEN>"
    ```

    ```json
    ---
    header: Example response
    highlight: 3,12,20
    ---
    {
      "result": {
        "id": "060013b1eeb14c93b0dcd896537e0d2c", // entry point ruleset ID
        "name": "default",
        "description": "",
        "source": "firewall_managed",
        "kind": "zone",
        "version": "3",
        "rules": [
          // (...)
          {
            "id": "1bdb49371c1f46958fc8b985efcb79e7", // `execute` rule ID
            "version": "1",
            "action": "execute",
            "expression": "true",
            "last_updated": "2024-01-20T14:21:28.643979Z",
            "ref": "1bdb49371c1f46958fc8b985efcb79e7",
            "enabled": true,
            "action_parameters": {
              "id": "efb7b8c949ac4650a09736fc376e9aee", // "Cloudflare Managed Ruleset" ID
              "version": "latest"
            }
          },
          // (...)
        ],
        "last_updated": "2024-01-20T14:29:00.190643Z",
        "phase": "http_request_firewall_managed"
      },
      "success": true,
      "errors": [],
      "messages": []
    }
    ```

    Identify the rule deploying the Cloudflare Managed Ruleset by searching for an `execute` rule with `action_parameters` > `id` equal to `efb7b8c949ac4650a09736fc376e9aee` (the managed ruleset ID).

    {{<Aside type="note">}}
To get the IDs of existing WAF managed rulesets, refer to [WAF Managed Rules](/waf/managed-rules/#managed-rulesets) or use the [List account rulesets](/api/operations/listAccountRulesets) operation.
    {{</Aside>}}

    Save the following IDs for the next step:

    - The ID of the entry point ruleset (`060013b1eeb14c93b0dcd896537e0d2c` in this example)
    - The ID of the `execute` rule deploying the Cloudflare Managed Ruleset (`1bdb49371c1f46958fc8b985efcb79e7` in this example)

    You will also use the following IDs:

    - The ID of the Cloudflare Managed Ruleset (`efb7b8c949ac4650a09736fc376e9aee`)
    - The ID of the rule to skip (`d9e350f1b72d4730899c8a420e48a85d` in this example)

3. Invoke the [Create a zone ruleset rule](/api/operations/createZoneRulesetRule) operation (a `POST` request) to add an exception (or skip rule) immediately before the `execute` rule deploying the Cloudflare Managed Ruleset, since a skip rule applies only to rules listed after it.

    ```bash
    ---
    header: Request
    ---
    curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{entry_point_ruleset_id}/rules" \
    --header "Authorization: Bearer <API_TOKEN>" \
    --header "Content-Type: application/json" \
    --data '{
      "expression": "(http.host eq \"dev.example.com\")",
      "description": "Skip a single rule for dev.example.com",
      "action": "skip",
      "action_parameters": {
        "rules": {
          "efb7b8c949ac4650a09736fc376e9aee": [
            "d9e350f1b72d4730899c8a420e48a85d"
          ]
        }
      },
      "position": {
        "before": "1bdb49371c1f46958fc8b985efcb79e7"
      }
    }'
    ```

    The `action_parameters` > `rules` object contains the ID of the Cloudflare Managed Ruleset with an associated list of rule IDs to skip (in this case, only one rule). The [`position` object](/ruleset-engine/rulesets-api/add-rule/#define-the-rule-position-in-the-ruleset) defines the exact rule placement in the entry point ruleset (before rule `1bdb49371c1f46958fc8b985efcb79e7`).

For more information on skipping one or more rules of managed rulesets via API, refer to [Create an exception](/ruleset-engine/managed-rulesets/create-exception/#skip-one-or-more-rules-of-managed-rulesets) in the Ruleset Engine documentation.
