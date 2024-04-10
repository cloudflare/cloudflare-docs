---
pcx_content_type: configuration
title: Cloudflare OWASP Core Ruleset
weight: 3
---

# Cloudflare OWASP Core Ruleset

The Cloudflare OWASP Core Ruleset is Cloudflare's implementation of the [OWASP ModSecurity Core Rule Set](https://owasp.org/www-project-modsecurity-core-rule-set/) (CRS). Cloudflare routinely monitors for updates from OWASP based on the latest version available from the official code repository.

The Cloudflare OWASP Core Ruleset is designed to work as a single entity to calculate a threat score and execute an action based on that score. When a rule in the ruleset matches a request, the threat score increases according to the rule score. If the final threat score is greater than the configured score threshold, Cloudflare executes the action configured in the last rule of the ruleset.

## Concepts

### Request threat score

Each OWASP rule that matches the current request has an associated score. The request threat score is the sum of the individual scores of all OWASP rules that matched the request.

### Score threshold

The score threshold (or anomaly threshold) defines the minimum cumulative score — obtained from matching OWASP rules — for the WAF to apply the configured OWASP ruleset action.

Each threshold (_Low_, _Medium_, and _High_) has an associated value (_60_, _40_, and _25_, respectively). Configuring a _Low_ threshold means that more rules will have to match the current request for the WAF to apply the configured ruleset action.

### Paranoia level

The paranoia level (PL) classifies OWASP rules according to their agressiveness. Paranoia levels vary from PL1 to PL4, where PL4 is the most strict level.

Each rule in the OWASP managed ruleset is associated with a paranoia level. Rules associated with higher paranoia levels are considered more agressive and provide increased protection. However, they might cause more legitimate traffic to get blocked due to false positives.

When you configure the paranoia level of the OWASP ruleset you are enabling all the rules belonging to all paranoia levels up to the level you select. For example, if you configure the ruleset paranoia level to PL3, you are enabling rules belonging to paranoia levels PL1, PL2, and PL3.

When you set the ruleset paranoia level, the WAF enables the corresponding rules in bulk. You then can disable specific rules individually or by tag, if needed. If you use the highest paranoia level (PL4) you will probably need to disable some of its rules for applications that need to receive complex input patterns.

## Example

The following example calculates the OWASP request threat score for an incoming request. The OWASP managed ruleset configuration is the following:

* OWASP Anomaly Score Threshold: _High - 25 and higher_
* OWASP Paranoia Level: _PL3_
* OWASP Action: _Managed Challenge_

This table shows the progress of the OWASP ruleset evaluation:

Rule ID       | Paranoia level | Rule matched?   | Rule score | Cumulative<br>threat score
--------------|----------------|-----------------|-----------:|-----------------------:
–             | –              | –               | –          | 0
`...1813a269` | PL3            | Yes             | +5         | 5
`...ccc02be6` | PL3            | No              | –          | 5
`...96bfe867` | PL2            | Yes             | +5         | 10
`...48b74690` | PL1            | Yes             | +5         | 15
`...3297003f` | PL2            | Yes             | +3         | 18
`...317f28e1` | PL1            | No              | –          | 18
`...682bb405` | PL2            | Yes             | +5         | 23
`...56bb8946` | PL2            | No              | –          | 23
`...e5f94216` | PL3            | Yes             | +3         | 26
(...)         | (...)          | (...)           | (...)      | (...)
`...f3b37cb1` | PL4            | (not evaluated) | –          | 26

Final request threat score: `26`

Since `26` >= `25` — that is, the threat score is greater than the configured score threshold — the WAF will apply the configured action (_Managed Challenge_). If you had configured a score threshold of _Medium - 40 and higher_, the WAF would not apply the action, since the request threat score would be lower than the score threshold (`26` < `40`).

The [**Activity log** in Security Events](/waf/analytics/security-events/paid-plans/#activity-log) would display the following details for the example incoming request handled by the OWASP Core Ruleset:

![Event log for example incoming request mitigated by the WAF's OWASP Core Ruleset](/images/waf/owasp-example-event-log.png)

In the activity log, the rule associated with requests mitigated by the Cloudflare OWASP Core Ruleset is the last rule in this managed ruleset: `949110: Inbound Anomaly Score Exceeded`, with rule ID `6179ae15870a4bb7b2d480d4843b323c`. To get the scores of individual rules contributing to the final request threat score, expand **Additional logs** in the event details.

---

## Configure in the dashboard

You can configure the following settings of the Cloudflare OWASP Core Ruleset in the dashboard:

* **Set the [paranoia level](#paranoia-level).** The available levels are *PL1* (default), *PL2*, *PL3*, and *PL4*.
* **Set the [score threshold](#score-threshold).** The available thresholds are: *Low - 60 and higher*, *Medium - 40 and higher* (default), or *High - 25 and higher*.
* **Set the [action](/ruleset-engine/rules-language/actions/) to perform.** The action is executed when the calculated request threat score is greater than the score threshold. The available actions are: *Block* (default), *Managed Challenge*, *JS Challenge*, *Log*, and *Interactive Challenge*.
* **Disable specific rules or rules with specific tags.**
* **Customize the filter expression.** With a custom expression, the Cloudflare OWASP Core Ruleset applies only to a subset of the incoming requests.
* **Configure [payload logging](/waf/managed-rules/payload-logging/configure/)**.

For details on configuring a managed ruleset in the dashboard, refer to [Configure a managed ruleset](/waf/managed-rules/deploy-zone-dashboard/#configure-a-managed-ruleset).

## Configure via API

To enable the Cloudflare OWASP Core Ruleset for a given zone via API, create a rule with `execute` action in the entry point ruleset for the `http_request_firewall_managed` phase. For more information on deploying a managed ruleset, refer to [Deploy a managed ruleset](/ruleset-engine/managed-rulesets/deploy-managed-ruleset/).

To configure the Cloudflare OWASP Core Ruleset via API, create [overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset/) using the Rulesets API. You can perform the following configurations:

* [Set the paranoia level](#set-the-paranoia-level).
* [Configure the score threshold](#configure-the-score-threshold-and-the-action).
* [Specify the action to perform](#configure-the-score-threshold-and-the-action) when the threat score is greater than the threshold.

You can also disable specific rules in the managed ruleset using [rule overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset/).

### Set the paranoia level

To enable all the rules up to a specific [paranoia level](#paranoia-level), create [tag overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset/#working-with-overrides) that disable all the rules associated with higher paranoia levels.

The tags associated with the different paranoia levels are the following:

* `paranoia-level-1`
* `paranoia-level-2`
* `paranoia-level-3`
* `paranoia-level-4`

For example, to enable all the rules associated with Paranoia Level 2 (PL2), disable the rules associated with tags `paranoia-level-3` and `paranoia-level-4`. All rules associated with paranoia levels up to the desired paranoia level will be enabled (in this example, all the rules associated with PL1 and PL2).

#### Example

This example sets the Cloudflare OWASP Core Ruleset's paranoia level for a zone to PL2. To perform this configuration, you must disable the tags associated with levels PL3 and PL4 (`paranoia-level-3` and `paranoia-level-4`) using tag overrides.

1. Get the ID of the Cloudflare OWASP Core Ruleset using the [List account rulesets](/api/operations/listAccountRulesets) method, since WAF's managed rulesets exist at the account level. Alternatively, use the following ruleset ID directly: `4814384a9e5d4991b9815dcfc25d2f1f`.

{{<details header="Request">}}

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets" \
--header "Authorization: Bearer <API_TOKEN>"
```

{{</details>}}

{{<details header="Response">}}

```json
---
highlight: 4-5
---
{
  "result": [
    {
      "id": "4814384a9e5d4991b9815dcfc25d2f1f",
      "name": "Cloudflare OWASP Core Ruleset",
      "description": "Cloudflare's implementation of the Open Web Application Security Project (OWASP) ModSecurity Core Rule Set. We routinely monitor for updates from OWASP based on the latest version available from the official code repository",
      "source": "firewall_managed",
      "kind": "managed",
      "version": "35",
      "last_updated": "2022-01-24T21:08:20.293196Z",
      "phase": "http_request_firewall_managed"
    },
    // (...)
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

{{</details>}}

2. Get the ID of the rule that deploys the OWASP ruleset to your zone using the [Get a zone entry point ruleset](/api/operations/getZoneEntrypointRuleset). Search for a rule with `"action": "execute"` configured with the OWASP ruleset's ID in the `action_parameters` object. This rule will only exist if you have already deployed the OWASP ruleset.

{{<details header="Request">}}

```bash
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
--header "Authorization: Bearer <API_TOKEN>"
```

{{</details>}}

{{<details header="Response">}}

```json
---
highlight: 12,14-16
---
{
  "result": {
    "id": "<ENTRY_POINT_RULESET_ID>",
    "name": "zone",
    "description": "",
    "source": "firewall_managed",
    "kind": "zone",
    "version": "3",
    "rules": [
      // (...)
      {
        "id": "<EXECUTE_RULE_ID>",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "4814384a9e5d4991b9815dcfc25d2f1f",
          "version": "latest"
        },
        "expression": "true",
        "last_updated": "2022-02-04T16:27:58.930927Z",
        "ref": "<RULE_REF>",
        "enabled": true
      },
      // (...)
    ],
    "last_updated": "2022-02-07T10:41:31.702744Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

{{</details>}}

3. Update the rule you identified using the [Update a zone ruleset rule](/api/operations/updateZoneRulesetRule) operation, adding tag overrides that disable the rules with tags `paranoia-level-3` and `paranoia-level-4`.

{{<details header="Request">}}

```bash
---
highlight: 9-20
---
curl --request PATCH \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{entry_point_ruleset_id}/rules/{execute_rule_id}" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "action": "execute",
  "action_parameters": {
    "id": "4814384a9e5d4991b9815dcfc25d2f1f",
    "version": "latest",
    "overrides": {
      "categories": [
        {
          "category": "paranoia-level-3",
          "enabled": false
        },
        {
          "category": "paranoia-level-4",
          "enabled": false
        }
      ]
    }
  },
  "expression": "true",
  "enabled": true
}'
```

{{</details>}}

For more information on creating overrides, refer to [Override a managed ruleset](/ruleset-engine/managed-rulesets/override-managed-ruleset/).

### Configure the score threshold and the action

To define the [score threshold](#score-threshold), or to specify the [action](/ruleset-engine/rules-language/actions/) to perform when the threat score is greater than the threshold, create a [rule override](/ruleset-engine/managed-rulesets/override-managed-ruleset/#working-with-overrides) for the last rule in the managed ruleset that:

* Specifies the action to take in the `action` property. The available actions are: `block` (default), `managed_challenge`, `js_challenge`, `log`, and `challenge`.
* Defines the desired anomaly score threshold (an integer value) in the `score_threshold` property.

#### Example

This example configures the managed ruleset score threshold and the performed action by creating a rule override for the last rule of the managed ruleset.

1. Get the ID of the Cloudflare OWASP Core Ruleset using the [List account rulesets](/api/operations/listAccountRulesets) method, since WAF's managed rulesets exist at the account level. Alternatively, use the following ruleset ID directly: `4814384a9e5d4991b9815dcfc25d2f1f`.

{{<details header="Request">}}

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets" \
--header "Authorization: Bearer <API_TOKEN>"
```

{{</details>}}

{{<details header="Response">}}

```json
---
highlight: 4-5
---
{
  "result": [
    {
      "id": "4814384a9e5d4991b9815dcfc25d2f1f",
      "name": "Cloudflare OWASP Core Ruleset",
      "description": "Cloudflare's implementation of the Open Web Application Security Project (OWASP) ModSecurity Core Rule Set. We routinely monitor for updates from OWASP based on the latest version available from the official code repository",
      "source": "firewall_managed",
      "kind": "managed",
      "version": "35",
      "last_updated": "2022-01-24T21:08:20.293196Z",
      "phase": "http_request_firewall_managed"
    },
    // (...)
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

{{</details>}}

2. Get the ID of the **last rule** in the Cloudflare OWASP Core Ruleset. Use the [Get an account ruleset](/api/operations/getAccountRuleset) method to obtain the list of rules in the ruleset. Alternatively, use the following rule ID directly: `6179ae15870a4bb7b2d480d4843b323c`.

{{<details header="Request">}}

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{owasp_ruleset_id}" \
--header "Authorization: Bearer <API_TOKEN>"
```

{{</details>}}

{{<details header="Response">}}

```json
---
highlight: 12
---
{
  "result": {
    "id": "4814384a9e5d4991b9815dcfc25d2f1f",
    "name": "Cloudflare OWASP Core Ruleset",
    "description": "Cloudflare's implementation of the Open Web Application Security Project (OWASP) ModSecurity Core Rule Set. We routinely monitor for updates from OWASP based on the latest version available from the official code repository",
    "source": "firewall_managed",
    "kind": "managed",
    "version": "36",
    "rules": [
      // (...)
      {
        "id": "6179ae15870a4bb7b2d480d4843b323c",
        "version": "35",
        "action": "block",
        "score_threshold": 40,
        "description": "949110: Inbound Anomaly Score Exceeded",
        "last_updated": "2022-02-08T16:11:18.236676Z",
        "ref": "ad0beb2fce9f149e565ee78d6e659d47",
        "enabled": true
      }
    ],
    "last_updated": "2022-02-08T16:11:18.236676Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

{{</details>}}

3. Get the ID of the rule that deploys the OWASP ruleset to your zone using the [Get a zone entry point ruleset](/api/operations/getZoneEntrypointRuleset) (in this example, `<EXECUTE_RULE_ID>`). Search for a rule with `"action": "execute"` configured with the OWASP ruleset's ID in the `action_parameters` object. This rule will only exist if you have already deployed the OWASP ruleset.

{{<details header="Request">}}

```bash
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
--header "Authorization: Bearer <API_TOKEN>"
```

{{</details>}}

{{<details header="Response">}}

```json
---
highlight: 12,14-16
---
{
  "result": {
    "id": "<ENTRY_POINT_RULESET_ID>",
    "name": "zone",
    "description": "",
    "source": "firewall_managed",
    "kind": "zone",
    "version": "3",
    "rules": [
      // (...)
      {
        "id": "<EXECUTE_RULE_ID>",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "4814384a9e5d4991b9815dcfc25d2f1f",
          "version": "latest"
        },
        "expression": "true",
        "last_updated": "2022-02-04T16:27:58.930927Z",
        "ref": "<RULE_REF>",
        "enabled": true
      },
      // (...)
    ],
    "last_updated": "2022-02-07T10:41:31.702744Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

{{</details>}}

4. Update the rule you identified in the entry point ruleset using the [Update a zone ruleset rule](/api/operations/updateZoneRulesetRule) operation, adding a rule override for the last rule in the OWASP ruleset (identified in step 2) with the following properties and values:

    * `"score_threshold": 60`
    * `"action": "managed_challenge"`

{{<details header="Request">}}

```bash
---
highlight: 10-18
---
curl --request PATCH \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{entry_point_ruleset_id}/rules/{execute_rule_id}" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "action": "execute",
  "action_parameters": {
    "id": "4814384a9e5d4991b9815dcfc25d2f1f",
    "version": "latest",
    "overrides": {
      "rules": [
        {
          "id": "6179ae15870a4bb7b2d480d4843b323c",
          "score_threshold": 60,
          "action": "managed_challenge"
        }
      ]
    }
  },
  "expression": "true",
  "enabled": true
}'
```

{{</details>}}

### Additional resources

For more API examples, refer to [Managed ruleset override examples](/ruleset-engine/managed-rulesets/override-examples/) in the Ruleset Engine documentation.
