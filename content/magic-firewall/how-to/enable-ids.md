---
title: Enable IDS
pcx_content_type: how-to
weight: 5
meta:
  title: Enable Intrusion Detection Systems (IDS)
---

# Enable Intrusion Detection Systems (IDS)

Cloudflare's IDS takes advantage of the threat intelligence powered by our global network and extends the capabilities of the Cloudflare Firewall to monitor and protect your network from malicious actors.

You can enable IDS through the dashboard or via the API.


{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic Firewall** > **IDS**.
3. Enable IDS.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To start using IDS via the API, first create a new ruleset in the `magic-transit-ids-managed` phase with a rule which is enabled.

1. Follow instructions in the [Rulesets Engine Page](/ruleset-engine/basic-operations/view-rulesets/) to view all rulesets for your account. You must see a ruleset with phase `magic-transit-ids-managed` and kind `managed`. If not, please contact your account team. The managed ruleset ID will be used in the next step.

2. Create a new root ruleset with a single rule in the `magic_transit_ids_managed` phase by running:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets \
--header 'Content-Type: application/json' \
--header 'X-Auth-Email: <YOUR_EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
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

3. Use the rule created in the previous step to enable or disable IDS. The Rulesets API documentation describes [how to patch a rule](/ruleset-engine/rulesets-api/update-rule/). <br> For example, the following patch request to set the `enabled` field to `false` will disable IDS. The ruleset and rule ID from the ruleset created in the previous step are used below.

```bash
curl --request PATCH \
https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{root_ruleset_id}/rules/{rule_id} \
--header 'Content-Type: application/json' \
--header 'X-Auth-Email: <YOUR_EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
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
 
{{</tab>}}
{{</tabs>}}

## Next steps

You must configure Logpush to log detected risks. Refer to [Configure a Logpush destination](/magic-firewall/how-to/use-logpush-with-ids/) for more information. Additionally, all traffic that is analyzed can be accessed via [network analytics](/analytics/network-analytics/). Refer to [GraphQL Analytics](/magic-firewall/tutorials/graphql-analytics/) to query the analytics data.