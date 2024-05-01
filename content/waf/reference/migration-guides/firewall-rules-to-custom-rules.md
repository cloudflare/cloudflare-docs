---
title: Firewall Rules to WAF custom rules migration
pcx_content_type: reference
weight: 2
---

# Firewall Rules to WAF custom rules migration

Cloudflare converted existing [firewall rules](/firewall/) into [WAF custom rules](/waf/custom-rules/). With custom rules, you get the same level of protection and a few additional features. Custom rules are available in the Cloudflare dashboard at **Security** > **WAF** > **Custom rules**.

{{<Aside type="warning" header="Deprecation notice">}}

**Cloudflare Firewall Rules is now deprecated.** The Firewall Rules API and Filters API, as well as the `cloudflare_firewall_rule` and `cloudflare_filter` Terraform resources, will only be available until 2024-07-01. If you have any automation based on these APIs and resources, you must migrate to the new APIs and resources before 2024-07-01 to avoid any issues.

On 2024-07-01, the APIs and resources mentioned above will stop working. Any remaining active firewall rules will be disabled, and the **Firewall rules** tab in the dashboard will be removed.

If you have not migrated to WAF custom rules yet, you may have some invalid configuration that prevents the migration from happening. In this case, contact your account team to get help with the migration to WAF custom rules.

{{</Aside>}}

## Main differences

The main differences between firewall rules and WAF custom rules are the following:

* [Improved response for Block action](#improved-response-for-block-action)
* [Different error page for blocked requests](#different-error-page-for-blocked-requests)
* [New Skip action replacing both Allow and Bypass actions](#new-skip-action-replacing-both-allow-and-bypass-actions)
* [Custom rules are evaluated in order](#custom-rules-are-evaluated-in-order)
* [Logs and events](#logs-and-events)
* [New API and Terraform resources](#new-api-and-terraform-resources)

### Improved response for Block action

In WAF custom rules you can [customize the response of the _Block_ action](/waf/custom-rules/create-dashboard/#configuring-a-custom-response-for-blocked-requests).

The default block response is a Cloudflare standard HTML page. If you need to send a custom response for _Block_ actions, configure the custom rule to return a fixed response with a custom response code (403, by default) and a custom body (HTML, JSON, XML, or plain text).

To define a custom response for a single rule, go to **Security** > **WAF** > [**Custom rules**](https://dash.cloudflare.com/?to=/:account/:zone/security/waf/custom-rules), edit the custom rule, and fill in the block-related options.

{{<Aside type="note">}}
Custom block response configurations will not be returned by the Firewall Rules API. You must use the [Rulesets API](/waf/custom-rules/create-api/#example-b) to manage this new feature.
{{</Aside>}}

### Different error page for blocked requests

Requests blocked by a firewall rule with a _Block_ action would get a Cloudflare [1020 error code](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-1xxx-errors/#error-1020-access-denied) response. Cloudflare users could customize this error page in **Custom Pages** > **1000 Class Errors**.

Requests blocked by a WAF custom rule will get a different response: the WAF block response. To customize the default block response, you can either:
* Define a custom WAF block response for your entire zone in [**Custom Pages**](https://dash.cloudflare.com/?to=/:account/:zone/custom-pages) > **WAF Block**. This custom page will always have an HTML content type.
* [Define a custom response](/waf/custom-rules/create-dashboard/#configuring-a-custom-response-for-blocked-requests) for requests blocked by a specific WAF custom rule. This custom response supports other content types besides HTML.

If you have customized your 1xxx error page in Custom Pages for requests blocked by firewall rules, you will need to create a new response page for blocked requests using one of the above methods.

For more information on Custom Pages, refer to [Configuring Custom Pages](/support/more-dashboard-apps/cloudflare-custom-pages/configuring-custom-pages-error-and-challenge/).

### New Skip action replacing both Allow and Bypass actions

Firewall Rules supported the _Allow_ and _Bypass_ actions, often used together. These actions were commonly used for handling known legitimate requests — for example, requests coming from trusted IP addresses.

When a request triggered _Allow_, all remaining firewall rules were not evaluated, effectively allowing the request to continue to the next security product. The _Bypass_ action was designed to specify which security products (such as WAF managed rules, rate limiting rules, and User Agent Blocking) should not run on the request triggering the action.

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

Firewall rules actions had a specific [order of precedence](/firewall/cf-firewall-rules/actions/) when using [priority ordering](/firewall/cf-firewall-rules/order-priority/#managing-rule-evaluation-by-priority-order). In contrast, custom rules actions do not have such an order. Custom rules are always evaluated in order, and some actions like _Block_ will stop the evaluation of other rules.

For example, if you were using priority ordering and had the following firewall rules with the same priority both matching an incoming request:

* Firewall rule #1 — Priority: 2 / Action: _Block_
* Firewall rule #2 — Priority: 2 / Action: _Allow_

The request would be allowed, since the _Allow_ action in Firewall Rules would have precedence over the _Block_ action.

In contrast, if you create two custom rules where both rules match an incoming request:

* Custom rule #1 — Action: _Block_
* Custom rule #2 — Action: _Skip_ (configured to skip all remaining custom rules)

The request would be blocked, since custom rules are evaluated in order and the _Block_ action will stop the evaluation of other rules.

{{<Aside type="note">}}
For the custom rules converted from your existing firewall rules, Cloudflare will preserve your current order of execution.
{{</Aside>}}

### Logs and events

Events logged by custom rules are shown in [Security Events](/waf/analytics/security-events/), available at **Security** > **Events**, with `Custom Rules` as their source.

You may still find events generated by Firewall Rules in the Security Events page when you select a time frame including the days when the transition to custom rules occurred. Similarly, you may still find events with both _Skip_ and _Allow_ actions in the same view during the transition period.

### New API and Terraform resources

The preferred API for managing WAF custom rules is the [Rulesets API](/waf/custom-rules/create-api/). The Rulesets API is used on all recent Cloudflare security products to provide a uniform user experience when interacting with our API. For more information on migrating to the Rulesets API, refer to [Relevant changes for API users](#relevant-changes-for-api-users).

The Firewall Rules API and Filters API will still work until 2024-07-01. There will be a single list of rules for both firewall rules and WAF custom rules, and this list contains WAF custom rules. Thanks to an internal conversion process, the Firewall Rules API and Filters API will return firewall rules/filters converted from these WAF custom rules.

If you are using Terraform, the preferred way of configuring WAF custom rules is using [`cloudflare_ruleset`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resources configured with the `http_request_firewall_custom` phase. For more information on updating your Terraform configuration, refer to [Relevant changes for Terraform users](#relevant-changes-for-terraform-users).

## Relevant changes for dashboard users

**The Firewall Rules tab in the Cloudflare dashboard is now deprecated**. Firewall rules are displayed as WAF custom rules in the Cloudflare dashboard at **Security** > **WAF** > **Custom rules**.

![The Custom rules tab, available in the Cloudflare dashboard under Security > WAF.](/images/waf/custom-rules/custom-rules-tab.png)

For users that still have access to both products, the **Firewall rules** tab will only be available until 2024-07-01.

## Relevant changes for API users

**The [Firewall Rules API](/firewall/api/cf-firewall-rules/) and the associated [Cloudflare Filters API](/firewall/api/cf-filters/) are now deprecated.** These APIs will stop working on 2024-07-01. You must migrate any automation based on the Firewall Rules API or Cloudflare Filters API to the [Rulesets API](/waf/custom-rules/create-api/) before this date to prevent any issues. Rule IDs are different between firewall rules and custom rules, which may affect automated processes dealing with specific rule IDs.

For the time being, all three APIs will be available (Firewall Rules API, Filters API, and Rulesets API). Cloudflare will internally convert your [Firewall Rules API](/firewall/api/cf-firewall-rules/) and [Filters API](/firewall/api/cf-filters/) calls into the corresponding [Rulesets API](/waf/custom-rules/create-api/) calls. The converted API calls between the Firewall Rules API/Filters API and the Rulesets API appear in audit logs as generated by Cloudflare and not by the actual user making the requests. There will be a single list of rules for both firewall rules and WAF custom rules.

Some new features of WAF custom rules, like custom responses for blocked requests and the _Skip_ action, are not supported in the Firewall Rules API. To take advantage of these features, Cloudflare recommends that you use the custom rules page in the Cloudflare dashboard or the Rulesets API.

Refer to the WAF documentation for [examples of managing WAF custom rules using the Rulesets API](/waf/custom-rules/create-api/).

## Relevant changes for Terraform users

**The following Terraform resources from the Cloudflare provider are now deprecated:**

* [`cloudflare_firewall_rule`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/firewall_rule)
* [`cloudflare_filter`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/filter)

These resources will stop working on 2024-07-01. If you are currently using these resources to manage your Firewall Rules configuration, you must manually migrate any Terraform configuration to [`cloudflare_ruleset`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resources before this date to prevent any issues.

For the time being, all three Terraform resources will be available (`cloudflare_firewall_rule`, `cloudflare_filter`, and `cloudflare_ruleset`). There will be a single list of rules for both firewall rules and WAF custom rules.

Some new features of WAF custom rules are not supported in the deprecated Terraform resources. To take advantage of these features, Cloudflare recommends that you use the `cloudflare_ruleset` resource.

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
