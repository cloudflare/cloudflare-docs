---
title: Enable IDS
pcx_content_type: how-to
weight: 5
---

# Enable IDS

Cloudflare's IDS takes advantage of the threat intelligence powered by our global network and extends the capabilities of the Cloudflare Firewall to monitor and protect your network from malicious actors.

To start using IDS, first create a new ruleset in the `magic-transit-ids-managed` phase with a rule which is enabled.

## Create a new ruleset

Follow instructions in the [Rulesets Engine Page](/ruleset-engine/basic-operations/view-rulesets/) to view all rulesets for your account. You must see a ruleset with phase `magic-transit-ids-managed` and kind `managed`. If not, please contact your account team. The managed ruleset ID will be used in the next step.

Next, create a root ruleset with a single rule in the `magic_transit_ids_managed` phase by running:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${account_id}/rulesets" \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' \
--data '{
  "name": "IDS Execute ruleset",
  "description": "Ruleset to enable IDS",
  "kind": "root",
  "phase": "magic_transit_ids_managed",
  "rules": [
    {
      "enabled": true,
      "expression": "true",
      "action": "execute",
      "description": "enable ids",
      "action_parameters": {
        "id": "${managed_ruleset_id}"
      }
    }
  ]
}'
```

With this ruleset added, IDS will start inspecting packets and report any anomalous traffic. Next, you can [configure Logpush](/magic-firewall/how-to/use-logpush-with-ids/) to start receiving details about the anomalous traffic.

## Enable or Disable IDS

Use the rule created in the previous step to enable or disable IDS. The Rulesets API documentation describes [how to patch a rule](/ruleset-engine/rulesets-api/update-rule/).

For example, the following patch request to set the `enabled` field to `false` will disable IDS. The ruleset and rule ID from the ruleset created in the previous step are used below.

```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/${account_id}/rulesets/${root_ruleset_id}/rules/${rule_id}" \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' \
--data '{
  "enabled": false,
  "expression": "true",
  "action": "execute",
  "action_parameters": {
    "id": "${managed_ruleset_id}"
  }
}'
```

Similarly, sending a patch request with the `enabled` field set to `true` will enable IDS.
