---
title: Firewall rules are becoming custom rules
pcx_content_type: reference
weight: 2
---

# Firewall rules are becoming WAF custom rules

Cloudflare started converting existing firewall rules into [WAF custom rules](/waf/custom-rules/). With custom rules you get the same level of protection and a few additional features. Custom rules are available in the Cloudflare dashboard under **Security** > **WAF** > **Custom rules**.

Cloudflare started this conversion as a phased rollout on February 28, 2023. Your zones will soon have WAF custom rules instead of firewall rules.

**Cloudflare Firewall Rules are now deprecated.** For most users, their firewall rules will now be displayed as WAF custom rules in the Cloudflare dashboard. In the future, you will no longer be able to manage firewall rules via Firewall Rules API or through firewall rules' Terraform resources. All remaining active firewall rules will be disabled.

{{<Aside type="note" header="Note for early adopters">}}
If you were among the users who got early access to Custom Rules before December 2022, you might still have both firewall rules and WAF custom rules running in parallel. Reach out to your account team which will help you migrate your firewall rules to custom rules.
{{</Aside>}}

## Main differences

The main differences between firewall rules and WAF custom rules are the following:

* [Improved response for Block action](#improved-response-for-block-action)
* [New Skip action replacing both Allow and Bypass actions](#new-skip-action-replacing-both-allow-and-bypass-actions)
* [Custom rules are evaluated in order](#custom-rules-are-evaluated-in-order)
* [Logs and events](#logs-and-events)
* [New API and Terraform resources](#new-api-and-terraform-resources)

### Improved response for Block action

In WAF custom rules you can [customize the response of the _Block_ action](/waf/custom-rules/create-dashboard/#configuring-a-custom-response-for-blocked-requests).

The default block response is a Cloudflare standard HTML page. If you need to send a custom response for _Block_ actions, configure the custom rule to return a fixed response with a custom response code (403, by default) and a custom body (HTML, JSON, XML, or plain text).

{{<Aside type="note">}}
Custom block response configurations will not be returned by the Firewall Rules API. You must use the [Rulesets API](/waf/custom-rules/create-api/#example-b) to manage this new feature.
{{</Aside>}}

### New Skip action replacing both Allow and Bypass actions

Firewall Rules support the _Allow_ and _Bypass_ actions, often used together. These actions are commonly used for handling known legitimate requests — for example, requests coming from trusted IP addresses.

When a request triggers _Allow_, all remaining firewall rules are not evaluated, effectively allowing the request to continue to the next security product. The _Bypass_ action is designed to specify which security products (such as WAF managed rules, rate limiting rules, and User Agent Blocking) should not run on the request triggering the action.

With Firewall Rules, if you wanted to stop running all security products for a given request, you would create two rules:

* One rule with _Bypass_ action (selecting all security products).
* One rule with _Allow_ action (to stop executing other firewall rules).

The requirement of having two rules to address this common scenario no longer applies to WAF custom rules. You should now [use the _Skip_ action](/waf/custom-rules/skip/), which combines the _Allow_ and _Bypass_ actions. The _Skip_ action fully replaces the _Allow_ and _Bypass_ actions, which are not supported in WAF custom rules.

With the _Skip_ action you can do the following:

* Stop running all the remaining custom rules (equivalent to the _Allow_ action)
* Avoid running other security products (equivalent to the _Bypass_ action)
* A combination of the above.

You can also select whether you want to log events matching the custom rule with the _Skip_ action or not. This is especially useful when creating a positive security model to avoid logging large amounts of legitimate traffic.

{{<Aside type="note">}}
The Firewall Rules API does not support the _Skip_ action. When you create a custom rule with _Skip_ action, it is translated to _Allow_ and _Bypass_ in the Firewall Rules API. You must use the [Rulesets API](/waf/custom-rules/skip/api-examples/) to fully use the new _Skip_ action functionality.
{{</Aside>}}

### Custom rules are evaluated in order

Firewall rules actions have a specific [order of precedence](/firewall/cf-firewall-rules/actions/) when using [priority ordering](/firewall/cf-firewall-rules/order-priority/#managing-rule-evaluation-by-priority-order). In contrast, custom rules actions do not have such an order. Custom rules are always evaluated in order, and some actions like _Block_ will stop the evaluation of other rules.

For example, if you were using priority ordering and had the following firewall rules with the same priority both matching an incoming request:

* Firewall rule #1 — Priority: 2 / Action: _Block_
* Firewall rule #2 — Priority: 2 / Action: _Allow_

The request would be allowed, since the _Allow_ action in Firewall Rules takes precedence over the _Block_ action.

In contrast, if you create two custom rules where both rules match an incoming request:

* Custom rule #1 — Action: _Block_
* Custom rule #2 — Action: _Skip_ (configured to skip all remaining custom rules)

The request would be blocked, since custom rules are evaluated in order and the _Block_ action will stop the evaluation of other rules.

### Logs and events

Events logged by custom rules are shown in [Security Events](/waf/security-events/), available at **Security** > **Events**, with `Custom Rules` as their source.

You may still find events generated by Firewall Rules in the Security Events page when you select a time frame including the days when the transition to custom rules occurred. Similarly, you may still find events with both _Skip_ and _Allow_ actions in the same view during the transition period.

### New API and Terraform resources

The preferred API for managing WAF custom rules is the [Rulesets API](/waf/custom-rules/create-api/). The Rulesets API is used on all recent Cloudflare security products to provide a uniform user experience when interacting with our API. For more information on migrating to the Rulesets API, refer to [Relevant changes for API users](#relevant-changes-for-api-users).

The Firewall Rules API and Filters API will still work for now. There will be a single list of rules for both firewall rules and WAF custom rules, and this list contains WAF custom rules. Thanks to an internal conversion process, the Firewall Rules API and Filters API will return firewall rules/filters converted from these WAF custom rules.

If you are using Terraform, the preferred way of configuring WAF custom rules is using [`cloudflare_ruleset`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resources configured with the `http_request_firewall_custom` phase. For more information on updating your Terraform configuration, refer to [Relevant changes for Terraform users](#relevant-changes-for-terraform-users).

## Relevant changes for dashboard users

If you are currently using firewall rules, your rules will be displayed as WAF custom rules in the Cloudflare dashboard, available at **Security** > **WAF** > **Custom rules**.

![The Custom rules tab, available in the Cloudflare dashboard under Security > WAF.](/waf/static/reference/custom-rules-tab.png)

Most customers will have access to the **Custom rules** tab instead of the **Firewall rules** tab in the Cloudflare dashboard, which will display the rules that Cloudflare automatically converted from existing firewall rules.

If you are a customer with access to both products, you will see both tabs in the Cloudflare dashboard, and you can edit rules in any tab (you will be editing the same set of rules). It is recommended that you start configuring custom rules instead of firewall rules. Even though there is an internal conversion process (for now) between firewall rules and custom rules, in the future only the WAF custom rules interface will be available in the dashboard. There is a single list of rules for both firewall rules and WAF custom rules.

**Cloudflare Firewall Rules are now deprecated**. For most users, their firewall rules will now be displayed as WAF custom rules in the Cloudflare dashboard. For users that had access to both products, the **Firewall rules** tab will eventually disappear from the Cloudflare dashboard.

## Relevant changes for API users

If you are currently using the [Firewall Rules API](/firewall/api/cf-firewall-rules/) and [Filters API](/firewall/api/cf-filters/), you can keep using these APIs for now. Cloudflare will internally convert your API calls into the corresponding [Rulesets API](/waf/custom-rules/create-api/) calls. However, going forward you will only be able to manage WAF custom rules via API using the [Rulesets API](/waf/custom-rules/create-api/).

**The [Firewall Rules API](/firewall/api/cf-firewall-rules/) and the associated [Cloudflare Filters API](/firewall/api/cf-filters/) are now deprecated.** You should start planning the migration of any automation based on the Firewall Rules API or Cloudflare Filters API to the Rulesets API.

For the time being, all three APIs will be available (Firewall Rules API, Filters API, and Rulesets API). There will be a single list of rules for both firewall rules and WAF custom rules. Some new features of WAF custom rules, like custom responses for blocked requests and the _Skip_ action, are not supported in the Firewall Rules API. To take advantage of the new features, Cloudflare recommends that you use the custom rules page in the Cloudflare dashboard or the Rulesets API.

Refer to the WAF documentation for [examples of managing WAF custom rules using the Rulesets API](/waf/custom-rules/create-api/).

## Relevant changes for Terraform users

If you are currently using the [`cloudflare_firewall_rule`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/firewall_rule) and [`cloudflare_filter`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/filter) Terraform resources from the Cloudflare provider to manage your Firewall Rules configuration, you can keep using these resources for now. However, going forward you will only be able to manage WAF custom rules via Terraform using the [`cloudflare_ruleset`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) Terraform resource.

**The following Terraform resources are now deprecated:**

* [`cloudflare_firewall_rule`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/firewall_rule)
* [`cloudflare_filter`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/filter)

You should start planning the manual migration of any Terraform configuration based on these resources to [`cloudflare_ruleset`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resources to prevent any issues.

For the time being, all three Terraform resources will be available (`cloudflare_firewall_rule`, `cloudflare_filter`, and `cloudflare_ruleset`). There will be a single list of rules for both firewall rules and WAF custom rules. Some features of WAF custom rules are not supported in the deprecated Terraform resources. To take advantage of the new features, Cloudflare recommends that you use the `cloudflare_ruleset` resource.

Refer to the documentation about Terraform for [examples of configuring WAF custom rules using Terraform](/terraform/additional-configurations/waf-custom-rules/).

### Replace your configuration using `cf-terraforming`

You can use the [`cf-terraforming`](https://github.com/cloudflare/cf-terraforming) tool to generate the Terraform configuration for your current WAF custom rules (converted by Cloudflare from your firewall rules). Then, import the new resources to Terraform state.

The recommended steps for replacing your firewall rules (and filters) configuration in Terraform with a new ruleset configuration are the following.

1. Run the following command to generate all ruleset configurations for a zone:

    ```sh
    ---
    highlight: [3,6]
    ---
    $ cf-terraforming generate --zone <ZONE_ID> --resource-type "cloudflare_ruleset"

    resource "cloudflare_ruleset" "terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31" {
      kind    = "zone"
      name    = "default"
      phase   = "http_request_firewall_custom"
      zone_id = "<ZONE_ID>"
      rules {
        [...]
      }
      [...]
    }
    [...]
    ```

2. The previous command may return additional ruleset configurations for other Cloudflare products also based on the [Ruleset Engine](/ruleset-engine/). Since you are migrating firewall rules to custom rules, keep only the Terraform resource for the `http_request_firewall_custom` phase and save it to a `.tf` configuration file. You will need the full resource name in the next step.

3. Import the `cloudflare_ruleset` resource you previously identified into Terraform state using the `terraform import` command. For example:

    ```sh
    $ terraform import cloudflare_ruleset.terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31 zone/<ZONE_ID>/3c0b456bc2aa443089c5f40f45f51b31

    cloudflare_ruleset.terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31: Importing from ID "zone/<ZONE_ID>/3c0b456bc2aa443089c5f40f45f51b31"...
    cloudflare_ruleset.terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31: Import prepared!
      Prepared cloudflare_ruleset for import
    cloudflare_ruleset.terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31: Refreshing state... [id=3c0b456bc2aa443089c5f40f45f51b31]

    Import successful!

    The resources that were imported are shown above. These resources are now in
    your Terraform state and will henceforth be managed by Terraform.
    ```

4. Run `terraform plan` to validate that Terraform now checks the state of the new `cloudflare_ruleset` resource, in addition to other existing resources already managed by Terraform. For example:

    ```sh
    $ terraform plan

    cloudflare_ruleset.terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31: Refreshing state... [id=3c0b456bc2aa443089c5f40f45f51b31]
    [...]
    cloudflare_filter.my_filter: Refreshing state... [id=14a2524fd75c419f8d273116815b6349]
    cloudflare_firewall_rule.my_firewall_rule: Refreshing state... [id=0580eb5d92e344ddb2374979f74c3ddf]
    [...]
    ```

5. Remove any state related to firewall rules and filters from your Terraform state:

    {{<Aside type="warning" header="Important">}}
You must remove firewall rules and filters from Terraform state before deleting their configuration from `.tf` configuration files to prevent issues.
    {{</Aside>}}

    1. Run the following command to find all resources related to firewall rules and filters:

        ```sh
        $ terraform state list | grep -E '^cloudflare_(filter|firewall_rule)\.'

        cloudflare_filter.my_filter
        cloudflare_firewall_rule.my_firewall_rule
        ```

    2. Run the `terraform state rm ...` command in dry-run mode to understand the impact of removing those resources without performing any changes:

        ```sh
        $ terraform state rm -dry-run cloudflare_filter.my_filter cloudflare_firewall_rule.my_firewall_rule

        Would remove cloudflare_filter.my_filter
        Would remove cloudflare_firewall_rule.my_firewall_rule
        ```

    3. If the impact looks correct, run the same command without the `-dry-run` parameter to actually remove the resources from Terraform state:

        ```sh
        $ terraform state rm cloudflare_filter.my_filter cloudflare_firewall_rule.my_firewall_rule

        Removed cloudflare_filter.my_filter
        Removed cloudflare_firewall_rule.my_firewall_rule
        Successfully removed 2 resource instance(s).
        ```

6. After removing firewall rules and filters resources from Terraform state, delete `cloudflare_filter` and `cloudflare_firewall_rule` resources from `.tf` configuration files.

7. Run `terraform plan` to verify that the resources you deleted from configuration files no longer appear. You should not have any pending changes.

    ```sh
    $ terraform plan

    cloudflare_ruleset.terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31: Refreshing state... [id=3c0b456bc2aa443089c5f40f45f51b31]
    [...]

    No changes. Your infrastructure matches the configuration.

    Terraform has compared your real infrastructure against your configuration and found no differences, so no changes are needed.
    ```

For details on importing Cloudflare resources to Terraform and using the `cf-terraforming` tool, refer to the following resources:

* [Import Cloudflare resources](/terraform/advanced-topics/import-cloudflare-resources/)
* [`cf-terraforming` GitHub repository](https://github.com/cloudflare/cf-terraforming)
