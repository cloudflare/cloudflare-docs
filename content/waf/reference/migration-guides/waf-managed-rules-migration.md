---
pcx_content_type: reference
title: Migrating to the new WAF Managed Rules
weight: 1
---

# Migrating to the new WAF Managed Rules

On May 4, 2022, Cloudflare started phase 1 of the WAF migration from [WAF managed rules](https://support.cloudflare.com/hc/articles/200172016) to the new [WAF Managed Rules](/waf/managed-rules/), allowing a first set of eligible zones to migrate. Phase 2, available since September 19, 2022, allows the remaining zones to migrate to WAF Managed Rules.

You can start the update process for a zone in the Cloudflare dashboard or via API. Currently, the update process is always started by you. **The migration is irreversible** — once you update to the new WAF Managed Rules, you cannot go back to using WAF managed rules.

Once the migration finishes, the **Managed rules** tab in the Cloudflare dashboard (available in **Security** > **WAF** > **Managed rules**) will display a new interface, and the WAF managed rules APIs will stop working.

## Main benefits

The new version of WAF Managed Rules provides the following benefits over the previous version:

- **New matching engine** – WAF Managed Rules are powered by the Ruleset Engine, which allows faster managed rule deployments and the ability to check even more traffic without scaling issues. The rules follow the same syntax used in other Cloudflare security products like WAF custom rules and firewall rules.

- **Updated Managed Rulesets** – The Cloudflare OWASP Core Ruleset, one of WAF's Managed Rulesets, is based on the latest version of the OWASP Core Ruleset (v3.x), which adds paranoia levels and improves false positives rates compared to the version used in WAF managed rules (2.x). You also have more control over the sensitivity score, with a clear indication of how much each rule contributes to the score and what was the total score of a triggered request.

- **Better rule browsing and configuration** – Deploy Managed Rulesets with a single click to get immediate protection. Override the behavior of entire rulesets, or customize a single rule. Apply overrides to all rules with a specific tag to adjust rules applicable to a given software or attack vector. You can deploy configurations like the following:

    - Deploy the Cloudflare Managed Ruleset across all my zones.
    - Deploy the Cloudflare OWASP Core Ruleset on all traffic that does not contain `/api/*` in the path.
    - Disable Managed Rulesets across my account for traffic coming from my IP.

For more information on the benefits of WAF Managed Rules, refer to our [blog post](https://blog.cloudflare.com/new-cloudflare-waf/).

___

## Migration impact

You will be able to migrate all your zones that do not have URI-based WAF overrides. The same protection will apply to your zone once you move to the new WAF.

Most configuration settings from the previous version of WAF managed rules will be migrated to the new version, but some specific configurations originally defined in the OWASP ModSecurity Core Rule Set will be lost — you will have to create these configurations in the new WAF Managed Rules, if needed.

For API users, the APIs for managing the previous version of WAF managed rules will stop working once you migrate. You must use the Rulesets API to manage the new WAF Managed Rules.

### Configurations that will be migrated

The update process will create an equivalent configuration for the following settings of WAF managed rules:

- Global settings of OWASP ModSecurity Core Rule Set.
- Firewall rules configured with _Bypass_ > _WAF Managed Rules_.
- Page Rules configured with _Disable Security_.
- Page Rules configured with _Web Application Firewall: Off_ or _Web Application Firewall: On_.

### Configurations that will be lost in the update process

The update process will not migrate specific settings at the rule or group level of the OWASP ModSecurity Core Rule Set, available in WAF managed rules.

The OWASP version supporting WAF managed rules and WAF Managed Rules is quite different, and there is no direct equivalence between rules in the two versions. You will need to configure specific OWASP rules again in the Cloudflare OWASP Core Ruleset, available in WAF Managed Rules. For more information on configuring this Managed Ruleset, refer to [Cloudflare OWASP Core Ruleset](/waf/managed-rules/reference/owasp-core-ruleset/).

### Configurations that will prevent you from updating

If a zone has [URI-based WAF overrides](/api/operations/waf-overrides-list-waf-overrides) (only available via API), you will not have the option to migrate to WAF Managed Rules. To update to WAF Managed Rules you must:

1. Delete any existing URI-based WAF overrides using the [Delete a WAF override](/api/operations/waf-overrides-delete-a-waf-override) API operation.
2. Follow the update process described below.

### Cloudflare dashboard changes

After the update process is complete, the Cloudflare dashboard will display the new WAF Managed Rules interface in **Security** > **WAF** > **Managed rules**, where you can deploy managed rulesets and adjust their configuration.

![After migrating to WAF Managed Rules, the Cloudflare dashboard will display a new interface where you can deploy managed rulesets to your zone.](/waf/static/reference/waf-migration-dashboard-differences.png)

Unlike the WAF managed rules, there is no global on/off setting to enable the WAF in the new interface. Instead, you deploy each managed ruleset individually in your zone.

For more information about configuring WAF Managed Rules in the dashboard, refer to [Deploy Managed Rulesets for a zone in the dashboard](/waf/managed-rules/deploy-zone-dashboard/).

### API changes

Once the migration is complete, the APIs for interacting with WAF managed rules **will stop working**. These APIs are the following:

- [WAF packages](/api/operations/waf-packages-list-waf-packages)
- [WAF rule groups](/api/operations/waf-rule-groups-list-waf-rule-groups)
- [WAF rules](/api/operations/waf-rules-list-waf-rules)

{{<Aside type="warning">}}
If you have any integrations using the WAF managed rules APIs stated above, you must update them before migrating to the new WAF Managed Rules.
{{</Aside>}}

To work with WAF Managed Rules you must use the [Rulesets API](/ruleset-engine/managed-rulesets/). For more information on deploying WAF Managed Rules via API, refer to [Deploy managed rulesets via API](/waf/managed-rules/deploy-api/).

___

## Eligible zones

### Phase 2 (since September 19, 2022)

In phase 2 all zones are eligible for migration. The exact migration procedure varies according to your Cloudflare plan.

- **Pro** and **Business** customers can update to the new WAF Managed Rules in the Cloudflare dashboard or via API. Once the new version is enabled, the previous version of WAF managed rules will be automatically disabled.

- **Enterprise** customers can enable the new WAF Managed Rules configuration while keeping the previous version of WAF managed rules enabled, allowing them to check the impact of the new WAF configuration. After reviewing the behavior of the new configuration and making any required adjustments to specific managed rules, Enterprise users can then finish the migration, which will disable the previous version of WAF managed rules.

**Note:** Zones that have [URI-based WAF overrides](/api/operations/waf-overrides-list-waf-overrides), which you could only manage via API, will not be able to migrate immediately to the new WAF Managed Rules. You must delete these overrides before migrating.

### Phase 1 (since May 4, 2022)

In phase 1 the migration became available to a subset of eligible zones, which had to meet the following requirements:

- The zone has:

    - WAF disabled, or
    - WAF enabled and only the Cloudflare Managed Ruleset is enabled (the OWASP ModSecurity Core Rule Set must be disabled).

- The zone has no [firewall rules](/firewall/cf-dashboard/) or [Page Rules](https://support.cloudflare.com/hc/articles/218411427) bypassing, enabling, or disabling WAF managed rules:

    - Firewall rules configured with _Bypass_ > _WAF Managed Rules_.
    - Page Rules configured with _Disable Security_.
    - Page Rules configured with _Web Application Firewall: Off_ or _Web Application Firewall: On._

- The zone has no [URI-based WAF overrides](/api/operations/waf-overrides-list-waf-overrides) (only available via API).

___

## Starting the migration

You can start the WAF update in the Cloudflare dashboard or via API.

### Using the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and zone.

2. Go to **Security** > **WAF** > **Managed rules**.

    If you are an Enterprise customer, the dashboard will show the following banner:

    ![The migration banner displayed to Enterprise customers in WAF > Managed rules.](/waf/static/reference/waf-migration-ent-banner.png)

    If you are a Professional/Business customer, the dashboard will show the following banner:

    ![The migration banner displayed to Pro/Business customers in WAF > Managed rules.](/waf/static/reference/waf-migration-biz-banner.png)

3. In the update banner, select **Review configuration**. This banner is only displayed in eligible zones.

4. Review the proposed WAF configuration rules. You can make adjustments to the proposed configuration, like [editing the WAF Managed Rules configuration](/waf/managed-rules/deploy-zone-dashboard/#configure-a-managed-ruleset) or creating [WAF exceptions](/waf/managed-rules/waf-exceptions/) to skip the execution of rulesets or specific rules.

5. When you are done reviewing, select **Deploy** to deploy the new WAF Managed Rules configuration.

    If you are a Professional/Business customer, Cloudflare will deploy the new WAF configuration and then disable the previous WAF version. The migration process may take a couple of minutes. When the migration finishes, the dashboard will display the new WAF Managed Rules interface in **Security** > **WAF** > **Managed rules**. To check if the migration has finished, refresh the dashboard.

    If you are an Enterprise customer, both WAF implementations will be enabled simultaneously when you select Deploy, so that you can validate your new configuration. Refer to the steps in the next section for additional guidance.

#### Validate your new WAF configuration and finish the upgrade (Enterprise customers only)

If you are an Enterprise customer, after deploying your new WAF configuration both WAF implementations will be enabled simultaneously. During this stage (called validation mode), the Cloudflare dashboard will display both WAF Managed Rules, old and new, in the **Managed rules** tab. The new WAF Managed Rules will run before the previous version.

1. Use the current validation mode to check the behavior of the new WAF configuration in Security Events (**Security** > **Events**). For more information, refer to [Analyzing the new WAF behavior in Security Events](#analyzing-the-new-waf-behavior-in-security-events).

2. When you are done reviewing your configuration with both WAFs enabled, select **Ready to update** in the update banner, and then select **Turn off previous version**. This operation will complete the migration and disable the previous WAF version.

When the migration finishes, the dashboard will only display the new WAF Managed Rules interface in **Security** > **WAF** > **Managed rules**. To check if the migration has finished, refresh the dashboard.

{{<Aside type="note">}}
The update process can take up to an hour. During this period you may observe security events from both versions of WAF managed rules.
{{</Aside>}}

### Using the API

1. Use the [Check WAF update compatibility](#api-operations) API operation to determine if the zone can update to the new WAF, given its current configuration:

    ```bash
    $ curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/waf_migration/check?phase_two=1" \
    -H "Authorization: Bearer <API_TOKEN>"
    ```

    Example response:

    ```json
    {
      "result": {
        "compatible": true,
        "migration_state": "start"
      },
      "success": true,
      "errors": [],
      "messages": []
    }
    ```

    If the response includes `"compatible": true`, this means that the zone can update to the new WAF and you can proceed with the update process. If the response includes `"compatible": false`, this means that your zone is not eligible for the update, given its current configuration. Refer to [Eligible zones](#eligible-zones) for details.

2. To get the new WAF configuration corresponding to your current configuration, use the [Get new WAF configuration](#api-operations) API operation:

    ```bash
    $ curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/waf_migration/config?phase_two=1" \
    -H "Authorization: Bearer <API_TOKEN>"
    ```

    Example response:

    ```json
    {
      "result": {
        "name": "default",
        "rules": [
          {
            "id": "",
            "version": "",
            "action": "execute",
            "expression": "true",
            "description": "",
            "ref": "",
            "enabled": true,
            "action_parameters": {
              "id": "efb7b8c949ac4650a09736fc376e9aee",
              "overrides": {
                "rules": [
                  {
                    "id": "23ee7cebe6e8443e99ecf932ab579455",
                    "action": "log",
                    "enabled": false
                  }
                ]
              }
            }
          }
        ]
      },
      "success": true,
      "errors": [],
      "messages": []
    }
    ```


The returned configuration in the example above, which would match the existing configuration for the previous WAF version, contains:

- A rule that executes the Cloudflare Managed Ruleset (ruleset with ID `efb7b8c949ac4650a09736fc376e9aee`).
- A single override for the rule "Apache Struts - Open Redirect - CVE:CVE-2013-2248" (rule with ID `23ee7cebe6e8443e99ecf932ab579455`) in the same ruleset, setting the action to `log` and disabling the rule.

3. (Optional, for Enterprise customers only) If you are migrating an Enterprise zone to WAF Managed Rules, you can enter validation mode before finishing the migration. In this mode, both WAF implementations will be enabled. Use the Update zone entry point ruleset API operation, making sure you include the `waf_migration=validation&phase_two=1` query string parameters:

    ```bash
    $ curl -X PUT \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_firewall_managed/entrypoint?waf_migration=validation&phase_two=1" \
    -H "Authorization: Bearer <API_TOKEN>" \
    -d '{
      "name": "default",
      "rules": [
        {
          "action": "execute",
          "expression": "true",
          "description": "",
          "enabled": true,
          "action_parameters": {
            "id": "efb7b8c949ac4650a09736fc376e9aee",
            "overrides": {
              "rules": [
                {
                  "id": "23ee7cebe6e8443e99ecf932ab579455",
                  "action": "log",
                  "enabled": false
                }
              ]
            }
          }
        }
      ]
    }'
    ```


    After invoking this API endpoint, both WAF managed rules and WAF Managed Rules will be enabled. Check the [Activity log](/waf/security-events/paid-plans/#activity-log) in Security Events for any legitimate traffic getting blocked, and perform any required adjustments to the WAF Managed Rules configuration. For example, you can [add an override](/ruleset-engine/managed-rulesets/override-managed-ruleset/) for a single rule that disables it or changes its action.

4. To finish the migration and disable WAF managed rules, set the configuration for the new WAF using the settings you obtained in step 2 and possibly adjusted in step 3. Make sure you include the `waf_migration=pending&phase_two=1` query string parameters.

    ```bash
    $ curl -X PUT \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_firewall_managed/entrypoint?waf_migration=pending&phase_two=1" \
    -H "Authorization: Bearer <API_TOKEN>" \
    -d '{
      "name": "default",
      "rules": [
        {
          "id": "",
          "version": "",
          "action": "execute",
          "expression": "true",
          "description": "",
          "ref": "",
          "enabled": true,
          "action_parameters": {
            "id": "efb7b8c949ac4650a09736fc376e9aee",
            "overrides": {
              "rules": [
                {
                  "id": "23ee7cebe6e8443e99ecf932ab579455",
                  "action": "log",
                  "enabled": false
                }
              ]
            }
          }
        }
      ]
    }'
    ```

Once the provided configuration is saved and the new WAF Managed Rules are enabled, the previous version of the WAF managed rules will be automatically disabled, due to the presence of the `waf_migration=pending&phase_two=1` parameters. This will make sure that your zone stays protected by one of the WAF versions during the update process.

{{<Aside type="note">}}
Pro and Business customers, which do not have access to the validation mode described in step 3, can update the rules (and overrides) in their zone entry point ruleset without triggering the migration by omitting the `waf_migration=pending&phase_two=1` parameters. However, all the rules in their configuration must be disabled (`"enabled": false`). Only Enterprise customers can configure (enabled) rules deploying Managed Rulesets without triggering the migration.
{{</Aside>}}

___

## Analyzing the new WAF behavior in Security Events

### For Enterprise customers

If you are an Enterprise customer, use the **validation mode** of the WAF migration process to check the behavior of the new WAF Managed Rules configuration. Cloudflare enables validation mode after you deploy the new WAF configuration. In this mode, the previous WAF version is still enabled, so that you can validate the behavior of your new configuration during the migration process. The new WAF Managed Rules will run before the previous version.

Go to the [Activity log](/waf/security-events/paid-plans/#activity-log) in Security Events during validation mode and check the following:

- Look for any requests allowed by the new WAF that are being handled by the previous WAF version (for example, by a challenge or block action). If this happens, consider writing a [firewall rule](/firewall/cf-dashboard/create-edit-delete-rules/#create-a-firewall-rule) or a [WAF custom rule](/waf/custom-rules/create-dashboard/) to handle the requests you previously identified.

- Look for legitimate requests being blocked by the new WAF. In this situation, edit the WAF managed rule that is blocking these requests, changing the performed action or disabling the rule. For more information, refer to [Configure a managed ruleset](/waf/managed-rules/deploy-zone-dashboard/#configure-a-managed-ruleset) in the WAF documentation.

### For Business/Professional customers

Business and Professional customers do not have access to validation mode, which means that they will be able to check the new WAF behavior after they migrate to the new WAF Managed Rules.

In the days following the migration, check the [Activity log](/waf/security-events/paid-plans/#activity-log) in Security Events looking for any legitimate requests being blocked by WAF Managed Rules. If you identify any incorrectly blocked requests, adjust the corresponding WAF rule action to Log. For more information on changing the action of a managed ruleset rule, refer to [Configure a single rule in a managed ruleset](/waf/managed-rules/deploy-zone-dashboard/#configure-a-single-rule-in-a-managed-ruleset) in the WAF documentation.

Additionally, check for requests that should have been blocked. In this situation, consider creating a [firewall rule](/firewall/cf-dashboard/create-edit-delete-rules/#create-a-firewall-rule) or a [WAF custom rule](/waf/custom-rules/create-dashboard/) to block these requests.

___

## API operations

Updating to the new WAF Managed Rules via API requires invoking the following API operations:

{{<table-wrap style="font-size:88%">}}

| Name | Method + Endpoint | Description |
| --- | --- | --- |
| Check WAF<br>update compatibility | `GET` `/zones/<ZONE_ID>/waf_migration/check?phase_two=1` | Checks if the current zone can be updated to the new WAF, given its current configuration. |
| Get new WAF<br>configuration | `GET` `/zones/<ZONE_ID>/waf_migration/config?phase_two=1` | Obtains the new WAF Managed Rules configuration that is equivalent to the current configuration (previous version of WAF managed rules). |
| [Update zone<br>entry point ruleset](/ruleset-engine/rulesets-api/update/) | `PUT` `/zones/<ZONE_ID>/rulesets/` `phases/http_request_firewall_managed/entrypoint?waf_migration=<VALUE>&phase_two=1` | Updates the configuration of the zone entry point ruleset for the `http_request_firewall_managed` phase.<br/>Available values for the `waf_migration` query string parameter:<br/>– `pending` / `1`: Defines the new WAF Managed Rules configuration and disables the previous version of WAF managed rules as soon as the provided configuration is saved and the new WAF is enabled.<br/>– `validation` / `2`: (Enterprise zones only) Defines the new WAF Managed Rules configuration and enables the new WAF Managed Rules side by side with the previous version, entering validation mode. To exit validation mode and finish the migration, invoke the same API endpoint with `waf_migration=pending`. |
| Get WAF status | `GET` `/zones/<ZONE_ID>/waf_migration/status` | Obtains the status of old and new WAF managed rules for a zone (enabled/disabled). The response also includes the current migration state (or mode). |

{{</table-wrap>}}

You must prepend the Cloudflare API base URL to the endpoints listed above to obtain the full endpoint:

`https://api.cloudflare.com/client/v4`

___

## Possible migration errors

Contact Cloudflare Support to get help with the following errors:

- The number of firewall rules to migrate exceeds 200.
- The length of a firewall rule expression is longer than 4 KB.

---

## Additional resources

### Configuring the new WAF Managed Rules using the Cloudflare API

Instead of using the previous APIs for managing WAF packages, rule groups, and rules, you must now use the [Rulesets API](/ruleset-engine/rulesets-api/) to programmatically configure WAF Managed Rules.

You can also create [overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset/) to specify changes to be executed on top of the default WAF Managed Rules configuration. These changes will take precedence over the managed ruleset’s default behavior.

For more information, refer to the following resources:

- [Deploy a managed ruleset to a phase at the zone level](/ruleset-engine/managed-rulesets/deploy-managed-ruleset/#deploy-a-managed-ruleset-to-a-phase-at-the-zone-level)
- [Override a managed ruleset](/ruleset-engine/managed-rulesets/override-managed-ruleset/)

### Configuring the new WAF Managed Rules using Terraform

You can use Terraform to configure WAF Managed Rules. For configuration examples, refer to [Configure WAF Managed Rules](/terraform/additional-configurations/waf-managed-rulesets/).

___

## Final remarks

The concept of paranoia level did not exist in the OWASP version (2.x) used in WAF managed rules. Based on the OWASP guide recommendations, the WAF migration process will set the paranoia level of the Cloudflare OWASP Core Ruleset to _PL2_.

You cannot disable the new version of WAF Managed Rules using [Page Rules](https://support.cloudflare.com/hc/articles/218411427), since the _Web Application Firewall: Off_ setting in Page Rules only applies to the previous version of WAF managed rules. To disable the new WAF Managed Rules you must [configure WAF exceptions](/waf/managed-rules/waf-exceptions/) (also known as skip rules).
