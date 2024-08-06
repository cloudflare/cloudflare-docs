---
title: Add rules
weight: 1
pcx_content_type: how-to
---

# Rules

You can check for an existing root ruleset from the dashboard or via the [Account rulesets API](/api/operations/listAccountRulesets). If you are a new Magic Transit customer, you may not have a root ruleset created for your account. To view examples for root rulesets, review the [Magic Firewall Terraform documentation](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/magic_firewall_ruleset).

By default, you can create a maximum of 200 rules. We recommend you create lists of IP addresses to reference within rules to streamline rule management.

## Add a rule

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic Firewall**.
3. In the **Custom rules** tab, select **Add a Rule**.
4. Fill out the information for your new rule.
5. When you are done, select **Add new rule**.

## Create a disabled rule

When you add a new rule, the rule is **Enabled** by default.

To create a **Disabled** rule, follow the steps in [Add a rule](#add-a-rule) above and toggle **Enabled** to off. When a rule is in the disabled state, the rule will not perform the action until is set to **Enabled**.

To disable an existing rule, from the **Magic Firewall Rules** page, set the **Enabled** toggle to off.

## Update a rule

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic Firewall** > **Custom rules**.
3. Locate the rule you want to edit, and select **Edit**.
4. Update the rule with your changes and select **Edit rule**.

## Delete an existing rule

1. Locate the rule you want to delete in the list.
2. From the end of the row, select **Delete**.
3. Select **Delete** again to confirm the deletion.


## API

Below, you can find examples of how to use the API to perform certain actions.

{{<Aside type="warning" header="Warning">}}

The examples on this page all use the `https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets` endpoint. This endpoint is intended to create rules from scratch and **might overwrite existing rules**.

If you have a ruleset already deployed, consider using the `https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{ruleset_id}/rules` endpoint instead.

Refer to [Add rule to ruleset](/ruleset-engine/rulesets-api/add-rule/) and [Create an account ruleset](/api/operations/createAccountRuleset) for more information.

{{</Aside>}}

### Skip action

The example below blocks all TCP ports, but allows one port (`8080`) by using the skip action.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "name": "Example ruleset",
  "kind": "root",
  "phase": "magic_transit",
  "description": "Example ruleset description",
  "rules": [
    {
      "action": "skip",
      "action_parameters": { "ruleset": "current" },
      "expression": "tcp.dstport in { 8080 } ",
      "description": "Allow port 8080"
    },
    {
      "action": "block",
      "expression": "tcp.dstport in { 1..65535 }",
      "description": "Block all TCP ports"
    }
  ]
}'
```

### Block a country

The example below blocks all packets with a source or destination IP address coming from Brazil by using its 2-letter country code in [ISO 3166-1 Alpha 2](https://www.iso.org/obp/ui/#search/code/) format.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "name": "Example ruleset",
  "kind": "root",
  "phase": "magic_transit",
  "description": "Example ruleset description",
  "rules": [
    {
      "action": "block",
      "expression": "ip.geoip.country == \"BR\"",
      "description": "Block traffic from Brazil"
    }
  ]
}'
```

### Use an IP list

Magic Firewall supports [using lists in expressions](/waf/tools/lists/use-in-expressions/) for the `ip.src` and `ip.dst` fields. The supported lists are:

- `$cf.anonymizer` - Anonymizer proxies
- `$cf.botnetcc` - Botnet command and control channel
- `$cf.malware` - Sources of malware
- `$<IP_LIST_NAME>` - The name of an account-level IP list

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "name": "Example ruleset",
  "kind": "root",
  "phase": "magic_transit",
  "description": "Example ruleset description",
  "rules": [
    {
      "action": "block",
      "expression": "ip.src in $cf.anonymizer",
      "description": "Block traffic from anonymizer proxies"
    }
  ]
}'
```

## Next steps

Refer to [Form expressions](/magic-firewall/how-to/form-expressions/) for more information on how to write rule expressions.