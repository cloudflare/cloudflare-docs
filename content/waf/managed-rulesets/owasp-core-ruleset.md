---
pcx-content-type: configuration
title: Cloudflare OWASP Core Ruleset
weight: 3
---

# Cloudflare OWASP Core Ruleset

The Cloudflare OWASP Core Ruleset is Cloudflare's implementation of the [OWASP ModSecurity Core Rule Set](https://owasp.org/www-project-modsecurity-core-rule-set/) (CRS). Cloudflare routinely monitors for updates from OWASP based on the latest version available from the official code repository.

The Cloudflare OWASP Core Ruleset is designed to work as a single entity to calculate a threat score and execute an action based on that score. When a rule in the ruleset matches a request, the threat score increases according to the rule score. If the final threat score is greater than the configured score threshold, Cloudflare executes the action configured in the last rule of the ruleset.

Configuring a *Low* threshold means having a high threshold value (60 or higher). This means that, when using a *Low* threshold, more rules have to match the current request for the Managed Ruleset to perform the configured action (the request threat score is the sum of the individual scores of rules that match).

Each rule in the Managed Ruleset is associated with a certain paranoia level (PL). Paranoia levels vary from PL1 to PL4. Higher paranoia levels provide increased protection, but can cause more legitimate traffic to get blocked due to false positives. If you use the highest paranoia level (PL4) you will probably need to disable some of its rules for applications that need to receive complex input patterns.

## Configure in the dashboard

You can configure the following settings of the Cloudflare OWASP Core Ruleset in the dashboard:

*   **Set the paranoia level.** The available levels are *PL1*, *PL2*, *PL3*, and *PL4* (default).
*   **Define the score threshold.** The available thresholds are: *Low* (60 and higher), *Medium* (40 and higher – default), or *High* (25 and higher).
*   **Set the action to perform.** The action is executed when the calculated threat score is greater than the score threshold. The available actions are: *Block* (default), *Managed Challenge*, *JS Challenge*, *Log*, and *Legacy CAPTCHA*.
*   **Disable specific rules or rules with specific tags.**
*   **Customize the filter expression.** With a custom expression, the Cloudflare OWASP Core Ruleset applies only to a subset of the incoming requests.
*   **Configure [payload logging](/waf/managed-rulesets/payload-logging/configure/)**.

For details on configuring a Managed Ruleset in the dashboard, refer to [Configure a Managed Ruleset](/waf/managed-rulesets/deploy-zone-dashboard/#configure-a-managed-ruleset).

## Configure via API

To enable the Cloudflare OWASP Core Ruleset for a given zone via API, create a rule with `execute` action in the entry point ruleset for the `http_request_firewall_managed` phase. For more information on deploying a Managed Ruleset, refer to [Deploy a Managed Ruleset](/ruleset-engine/managed-rulesets/deploy-managed-ruleset/).

To configure the Cloudflare OWASP Core Ruleset via API, create [overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset/) using the Rulesets API. You can perform the following configurations:

*   [Set the paranoia level](#setting-the-paranoia-level).
*   [Configure the score threshold](#configuring-the-score-threshold-and-the-action).
*   [Specify the action to perform](#configuring-the-score-threshold-and-the-action) when the threat score is greater than the threshold.

You can also disable specific rules in the Managed Ruleset using [rule overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset/).

### Setting the paranoia level

To enable all the rules up to a specific paranoia level, create tag overrides that disable all the rules associated with higher paranoia levels. For example, to enable all the rules associated with Paranoia Level 2 (PL2), disable the rules associated with tags `paranoia-level-3` and `paranoia-level-4`. All rules associated with paranoia levels up to the desired paranoia level will be enabled (in this example, all the rules associated with PL1 and PL2).

#### Example

This example sets the Cloudflare OWASP Core Ruleset's paranoia level for a zone to PL2. To perform this configuration, you must disable the tags associated with levels PL3 and PL4 (`paranoia-level-3` and `paranoia-level-4`) using tag overrides.

1.  Get the ID of the Cloudflare OWASP Core Ruleset using the [List account rulesets](https://api.cloudflare.com/#account-rulesets-list-account-rulesets) method, since WAF Managed Rulesets exist at the account level. Alternatively, use the following ruleset ID directly: `4814384a9e5d4991b9815dcfc25d2f1f`.

    <details>
      <summary>Request</summary>
      <div>
      {{<markdown>}}
```bash
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets" \
  -H "Authorization: Bearer <API_TOKEN>"
```
      {{</markdown>}}
      </div>
    </details>

    <details>
      <summary>Response</summary>
      <div>
      {{<markdown>}}
```json
---
highlight: [4,5]
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
      {{</markdown>}}
      </div>
    </details>

2.  Get the ID of the rule that deploys the OWASP ruleset to your zone using the [Get zone entry point ruleset](https://api.cloudflare.com/#zone-rulesets-get-entrypoint-ruleset). Search for a rule with `"action": "execute"` configured with the OWASP ruleset's ID in the `action_parameters` object. This rule will only exist if you have already deployed the OWASP ruleset.

    <details>
      <summary>Request</summary>
      <div>
      {{<markdown>}}
```bash
curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>"
```
      {{</markdown>}}
      </div>
    </details>

    <details>
      <summary>Response</summary>
      <div>
      {{<markdown>}}
```json
---
highlight: [12,14,15,16]
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
      {{</markdown>}}
      </div>
    </details>

3.  Update the rule you just identified using the [Patch individual rule](/ruleset-engine/rulesets-api/update-rule/) method, adding tag overrides that disable the rules with tags `paranoia-level-3` and `paranoia-level-4`.

     <details>
      <summary>Request</summary>
      <div>
      {{<markdown>}}
```json
---
highlight: [9,10,11,12,13,14,15,16,17,18,19,20]
---
curl -X PATCH \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<ENTRY_POINT_RULESET_ID>/rules/<EXECUTE_RULE_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
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
      {{</markdown>}}
      </div>
    </details>

For more information on creating overrides, refer to [Override a Managed Ruleset](/ruleset-engine/managed-rulesets/override-managed-ruleset/).

### Configuring the score threshold and the action

To define the score threshold value, or to specify the action to perform when the threat score is greater than the threshold, create a rule override for the last rule in the Managed Ruleset that:

*   Specifies the action to take in the `action` property.
*   Defines the desired threat score threshold (an integer value) in the `score_threshold` property.

#### Example

This example configures the Managed Ruleset score threshold and the performed action by creating a rule override for the last rule of the Managed Ruleset.

1.  Get the ID of the Cloudflare OWASP Core Ruleset using the [List account rulesets](https://api.cloudflare.com/#account-rulesets-list-account-rulesets) method, since Managed Rulesets exist at the account level. Alternatively, use the following ruleset ID directly: `4814384a9e5d4991b9815dcfc25d2f1f`.

    <details>
      <summary>Request</summary>
      <div>
      {{<markdown>}}
```bash
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets" \
-H "Authorization: Bearer <API_TOKEN>"
```
      {{</markdown>}}
      </div>
    </details>

    <details>
      <summary>Response</summary>
      <div>
      {{<markdown>}}
```json
---
highlight: [4,5]
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
      {{</markdown>}}
      </div>
    </details>

2.  Get the ID of the **last rule** in the Cloudflare OWASP Core Ruleset. Use the [Get an account ruleset](https://api.cloudflare.com/#account-rulesets-get-an-account-ruleset) method to obtain the list of rules in the ruleset. Alternatively, use the following rule ID directly: `6179ae15870a4bb7b2d480d4843b323c`.

    <details>
      <summary>Request</summary>
      <div>
      {{<markdown>}}
```bash
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/<OWASP_RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>"
```
      {{</markdown>}}
     </div>
    </details>

    <details>
      <summary>Response</summary>
      <div>
      {{<markdown>}}
```json
---
highlight: [12]
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
      {{</markdown>}}
      </div>
    </details>

3.  Get the ID of the rule that deploys the OWASP ruleset to your zone using the [Get zone entry point ruleset](https://api.cloudflare.com/#zone-rulesets-get-entrypoint-ruleset) (in this example, `<EXECUTE_RULE_ID>`). Search for a rule with `"action": "execute"` configured with the OWASP ruleset's ID in the `action_parameters` object. This rule will only exist if you have already deployed the OWASP ruleset.

    <details>
      <summary>Request</summary>
      <div>
      {{<markdown>}}
```bash
curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>"
```
      {{</markdown>}}
      </div>
    </details>

    <details>
      <summary>Response</summary>
      <div>
      {{<markdown>}}
```json
---
highlight: [12,14,15,16]
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
      {{</markdown>}}
      </div>
    </details>

4.  Update the rule you just identified in the entry point ruleset using the [Patch individual rule](/ruleset-engine/rulesets-api/update-rule/) method, adding a rule override for the last rule in the OWASP ruleset (identified in step 2) with the following properties and values:

    *   `"score_threshold": 60`
    *   `"action": "managed_challenge"`

    <details>
      <summary>Request</summary>
      <div>
      {{<markdown>}}
```json
---
highlight: [9,10,11,12,13,14,15,16,17]
---
curl -X PATCH \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<ENTRY_POINT_RULESET_ID>/rules/<EXECUTE_RULE_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
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
      {{</markdown>}}
      </div>
    </details>

### Additional resources

For more API examples, refer to [Managed Ruleset override examples](/ruleset-engine/managed-rulesets/override-examples/) in the Ruleset Engine documentation.
