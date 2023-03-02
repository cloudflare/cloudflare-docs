---
source: https://support.cloudflare.com/hc/en-us/articles/5995821690637-Migrating-from-WAF-managed-rules-to-WAF-Managed-Rulesets
title: Migrating from WAF managed rules to WAF Managed Rulesets
---

# Migrating from WAF managed rules to WAF Managed Rulesets



## Overview

On May 4, 2022, Cloudflare started phase 1 of the WAF migration from [WAF managed rules](https://support.cloudflare.com/hc/articles/200172016) to the new [WAF Managed Rulesets](https://developers.cloudflare.com/waf/managed-rulesets/), allowing a first set of eligible zones to migrate. Phase 2, available since September 19, 2022 for API users only, allows the remaining zones to migrate to WAF Managed Rulesets. In the coming months, zones included in phase 2 will also be able to start the update in the Cloudflare dashboard.

You can start the update process for a zone in the Cloudflare dashboard or via API. Currently, the update process is always started by you. **The migration is irreversible** — once you update to the new WAF Managed Rulesets, you cannot go back to using WAF managed rules.

Once the migration finishes, the **Managed rules** tab in the Cloudflare dashboard (available in **Security** > **WAF** > **Managed rules**) will display a new interface, and the WAF managed rules APIs will stop working.

## Main benefits

WAF Managed Rulesets provide the following benefits over WAF managed rules:

-   **New matching engine** – WAF Managed Rulesets are powered by the Ruleset Engine, which allows faster managed rule deployments and the ability to check even more traffic without scaling issues. The rules follow the same syntax used in other Cloudflare security products like WAF custom rules and firewall rules.
-   **Updated Managed Rulesets** – The Cloudflare OWASP Core Ruleset, one of WAF's Managed Rulesets, is based on the latest version of the OWASP Core Ruleset (v3.x), which adds paranoia levels and improves false positives rates compared to the version used in WAF managed rules (2.x). You also have more control over the sensitivity score, with a clear indication of how much each rule contributes to the score and what was the total score of a triggered request.
-   **Better rule browsing and configuration** – Deploy Managed Rulesets with a single click to get immediate protection. Override the behavior of entire rulesets, or customize a single rule. Apply overrides to all rules with a specific tag to adjust rules applicable to a given software or attack vector. You can deploy configurations like the following:
    -   Deploy the Cloudflare Managed Ruleset across all my zones.
    -   Deploy the Cloudflare OWASP Core Ruleset on all traffic that does not contain `/api/*` in the path.
    -   Disable Managed Rulesets across my account for traffic coming from my IP.

For more information on the benefits of WAF Managed Rulesets, refer to our [blog post](https://blog.cloudflare.com/new-cloudflare-waf/).

___

## Migration impact

### For migrations started in the dashboard

If your zone is eligible for migration (refer to the [phase 1 requirements](https://support.cloudflare.com/hc/en-us/articles/5995821690637-Migrating-from-WAF-managed-rules-to-WAF-Managed-Rulesets#eligible-zones)), when you start the update your current WAF managed rules configuration will be migrated to a WAF Managed Rulesets configuration. The same protection applies to your zone when you move to the new WAF.

### For migrations started via API

Users starting the migration process via API are no longer bound to the phase 1 requirements — they will be able to migrate all their zones that do not have URI-based WAF overrides.

Most WAF managed rules configuration settings will be migrated to WAF Managed Rulesets, but some specific configurations originally defined in the OWASP ModSecurity Core Rule Set will be lost — you will have to create these configurations in WAF Managed Rulesets, if needed.

#### **Configurations that will be migrated**

The update process via API will create an equivalent configuration for the following settings of WAF managed rules:

-   Global settings of OWASP ModSecurity Core Rule Set.
-   Firewall rules configured with _Bypass_ > _WAF Managed Rules_.
-   Page Rules configured with _Disable Security_.
-   Page Rules configured with _Web Application Firewall: Off_ or _Web Application Firewall: On_.

#### **Configurations that will be lost in the update process**

The update process started via API will not migrate specific settings at the rule or group level of the OWASP ModSecurity Core Rule Set, available in WAF managed rules.

The OWASP version supporting WAF managed rules and WAF Managed Rulesets is quite different, and there is no direct equivalence between rules in the two versions. You will need to configure specific OWASP rules again in the Cloudflare OWASP Core Ruleset, available in WAF Managed Rulesets. For more information on configuring this Managed Ruleset, refer to [Cloudflare OWASP Core Ruleset](https://developers.cloudflare.com/waf/managed-rulesets/reference/owasp-core-ruleset/) in the developer documentation.

#### **Configurations that will prevent you from updating**

If a zone has [URI-based WAF overrides](https://api.cloudflare.com/#waf-overrides-properties) (only available via API), you will not have the option to migrate to WAF Managed Rulesets. To update to WAF Managed Rulesets you must:

1.  Delete any existing URI-based WAF overrides using the [Delete a WAF override](https://api.cloudflare.com/#waf-overrides-delete-a-waf-override) API operation.
2.  Follow the update process described below.

### Cloudflare dashboard changes

After the update process is complete, the Cloudflare dashboard will display the WAF Managed Rulesets interface in **Security** > **WAF** > **Managed rules**, where you can deploy Managed Rulesets and adjust their configuration.

![After migrating to WAF Managed Rulesets, the Cloudflare dashboard will display a new interface where you can deploy Managed Rulesets to your zone.](/support/static/waf-migration-dashboard-differences.png)

Unlike the WAF managed rules, there is no global on/off setting to enable the WAF in the new interface. Instead, you deploy each WAF Managed Ruleset individually in your zone.

For more information about configuring WAF Managed Rulesets in the dashboard, refer to [Deploy Managed Rulesets for a zone in the dashboard](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/) in the developer documentation.

### API changes

Once the migration is complete, the APIs for interacting with WAF managed rules **will stop working**. These APIs are the following:

-   [WAF packages](https://api.cloudflare.com/#waf-packages-properties)
-   [WAF rule groups](https://api.cloudflare.com/#waf-rule-groups-properties)
-   [WAF rules](https://api.cloudflare.com/#waf-rules-properties)

To interact with WAF Managed Rulesets you must use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/). For more information on deploying WAF Managed Rulesets via API, refer to [Deploy rulesets via API](https://developers.cloudflare.com/waf/managed-rulesets/deploy-api/) in the developer documentation.

___

## Eligible zones

### Phase 1 (since May 4, 2022)

In phase 1 the migration became available to a subset of eligible zones. If you wish to start the migration in the Cloudflare dashboard, your zone must meet all phase 1 requirements, which are the following:

-   The zone has:
    -   WAF disabled, or
    -   WAF enabled and only the Cloudflare Managed Ruleset is enabled (the OWASP ModSecurity Core Rule Set must be disabled).
-   The zone has no [firewall rules](https://developers.cloudflare.com/firewall/cf-dashboard/) or [Page Rules](https://support.cloudflare.com/hc/articles/218411427) bypassing, enabling, or disabling WAF managed rules:
    -   Firewall rules configured with _Bypass_ > _WAF Managed Rules_.
    -   Page Rules configured with _Disable Security_.
    -   Page Rules configured with _Web Application Firewall: Off_ or _Web Application Firewall: On._
-   The zone has no [URI-based WAF overrides](https://api.cloudflare.com/#waf-overrides-properties) (only available via API).

### Phase 2 (since September 19, 2022 – for API users only)

In phase 2 all zones are eligible for migration. This phase is currently only available to customers that wish to migrate to WAF Managed Rulesets via API.

Pro and Business customers can update from WAF managed rules to WAF Managed Rulesets via API. Once WAF Managed Rulesets are enabled, the previous version (WAF managed rules) will be automatically disabled.

Enterprise customers can enable a new WAF Managed Rulesets configuration while keeping WAF managed rules (previous version) enabled, allowing them to check the impact of the new WAF configuration. After reviewing the behavior of the new configuration and making any required adjustments to specific Managed Ruleset rules, Enterprise users can then finish the migration, which will disable WAF managed rules.

**Note:** Zones that have URI-based WAF overrides, which you could only manage via API, will not be able to migrate immediately to WAF Managed Rulesets. You must delete these overrides before migrating.

___

## Starting the migration

You can start the WAF update in the Cloudflare dashboard or via API.

### Using the dashboard

1\. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and zone.

2\. Go to **Security** > **WAF** \> **Managed rules**.

![The migration banner displayed in WAF > Managed rules, available for eligible zones, allows you to update from managed rules to WAF Managed Rulesets.](/support/static/waf-migration-banner.png)

3\. In the update banner, click **Update now**. This banner is only displayed in eligible zones.

4\. In the pop-up dialog, confirm that you wish to start the migration from WAF managed rules to WAF Managed Rulesets by clicking **Update**. The migration is **irreversible.**

After confirming the operation, the migration will start.

The migration process may take a couple of minutes. When the migration finishes, the dashboard will display the new WAF Managed Rulesets interface in **Security** > **WAF** > **Managed rules**. To check if the migration has finished, refresh the dashboard.

### Using the API

1\. Use the [Check WAF update compatibility](https://support.cloudflare.com/hc/en-us/articles/5995821690637-Migrating-from-WAF-managed-rules-to-WAF-Managed-Rulesets#api-operations) API operation to determine if the zone can update to the new WAF, given its current configuration:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ curl &quot;https://api.cloudflare.com/client/v4/zones/&lt;ZONE_ID&gt;/waf_migration/check?phase_two=1&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-H &quot;Authorization: Bearer &lt;API_TOKEN&gt;&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Example response:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;result&quot;: {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &quot;compatible&quot;: true,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &quot;migration_state&quot;: &quot;start&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  },</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;success&quot;: true,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;errors&quot;: [],</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;messages&quot;: []</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}</span></div></span></span></span></code></pre>{{</raw>}}

If the response includes `"compatible": true`, this means that the zone can update to the new WAF and you can proceed with the update process. If the response includes `"compatible": false`, this means that your zone is not eligible for the update, given its current configuration. Refer to [Eligible zones](https://support.cloudflare.com/hc/en-us/articles/5995821690637-Migrating-from-WAF-managed-rules-to-WAF-Managed-Rulesets#eligible-zones) for details.

2\. To get the new WAF configuration corresponding to your current configuration, use the [Get new WAF configuration](https://support.cloudflare.com/hc/en-us/articles/5995821690637-Migrating-from-WAF-managed-rules-to-WAF-Managed-Rulesets#api-operations) API operation:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ curl &quot;https://api.cloudflare.com/client/v4/zones/&lt;ZONE_ID&gt;/waf_migration/config?phase_two=1&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-H &quot;Authorization: Bearer &lt;API_TOKEN&gt;&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Example response:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;result&quot;: {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &quot;name&quot;: &quot;default&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &quot;rules&quot;: [</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &quot;id&quot;: &quot;&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &quot;version&quot;: &quot;&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &quot;action&quot;: &quot;execute&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &quot;expression&quot;: &quot;true&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &quot;description&quot;: &quot;&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &quot;ref&quot;: &quot;&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &quot;enabled&quot;: true,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &quot;action_parameters&quot;: {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">          &quot;id&quot;: &quot;efb7b8c949ac4650a09736fc376e9aee&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">          &quot;overrides&quot;: {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">            &quot;rules&quot;: [</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">              {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">                &quot;id&quot;: &quot;23ee7cebe6e8443e99ecf932ab579455&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">                &quot;action&quot;: &quot;log&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">                &quot;enabled&quot;: false</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">              }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">            ]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">          }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    ]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  },</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;success&quot;: true,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;errors&quot;: [],</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;messages&quot;: []</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}</span></div></span></span></span></code></pre>{{</raw>}}

The returned configuration in the example above, which would match the existing configuration for the previous WAF version, contains:

-   A rule that executes the Cloudflare Managed Ruleset (ruleset with ID `efb7b8c949ac4650a09736fc376e9aee`).
-   A single override for the rule "Apache Struts - Open Redirect - CVE:CVE-2013-2248" (rule with ID `23ee7cebe6e8443e99ecf932ab579455`) in the same ruleset, setting the action to `log` and disabling the rule.

3\. (Optional, for Enterprise customers only) If you are migrating an Enterprise zone to WAF Managed Rulesets, you can enter validation mode before finishing the migration. In this mode, both WAF implementations will be enabled. Use the Update zone entry point ruleset API operation, making sure you include the `waf_migration=validation&phase_two=1` query string parameters:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ curl -X PUT \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&quot;https://api.cloudflare.com/client/v4/zones/&lt;ZONE_ID&gt;/rulesets/phases/http_request_firewall_managed/entrypoint?waf_migration=validation&amp;phase_two=1&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-H &quot;Authorization: Bearer &lt;API_TOKEN&gt;&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-d '{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;name&quot;: &quot;default&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;rules&quot;: [</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;action&quot;: &quot;execute&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;expression&quot;: &quot;true&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;description&quot;: &quot;&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;enabled&quot;: true,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;action_parameters&quot;: {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &quot;id&quot;: &quot;efb7b8c949ac4650a09736fc376e9aee&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &quot;overrides&quot;: {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">          &quot;rules&quot;: [</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">            {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">              &quot;id&quot;: &quot;23ee7cebe6e8443e99ecf932ab579455&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">              &quot;action&quot;: &quot;log&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">              &quot;enabled&quot;: false</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">            }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">          ]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  ]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}'</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

After invoking this API endpoint, both WAF managed rules and WAF Managed Rulesets will be enabled. Check the [Activity log](https://developers.cloudflare.com/waf/analytics/paid-plans/#activity-log) in Security Overview for any legitimate traffic getting blocked, and perform any required adjustments to the WAF Managed Rulesets configuration. For example, you can [add an override](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) for a single rule that disables it or changes its action.

4\. To finish the migration and disable WAF managed rules, set the configuration for the new WAF using the settings you obtained in step 2 and possibly adjusted in step 3. Make sure you include the `waf_migration=pending&phase_two=1` query string parameters.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ curl -X PUT \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&quot;https://api.cloudflare.com/client/v4/zones/&lt;ZONE_ID&gt;/rulesets/phases/http_request_firewall_managed/entrypoint?waf_migration=pending&amp;phase_two=1&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-H &quot;Authorization: Bearer &lt;API_TOKEN&gt;&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-d '{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;name&quot;: &quot;default&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;rules&quot;: [</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;id&quot;: &quot;&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;version&quot;: &quot;&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;action&quot;: &quot;execute&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;expression&quot;: &quot;true&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;description&quot;: &quot;&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;ref&quot;: &quot;&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;enabled&quot;: true,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      &quot;action_parameters&quot;: {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &quot;id&quot;: &quot;efb7b8c949ac4650a09736fc376e9aee&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        &quot;overrides&quot;: {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">          &quot;rules&quot;: [</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">            {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">              &quot;id&quot;: &quot;23ee7cebe6e8443e99ecf932ab579455&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">              &quot;action&quot;: &quot;log&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">              &quot;enabled&quot;: false</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">            }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">          ]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  ]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}'</span></div></span></span></span></code></pre>{{</raw>}}

Once the provided configuration is saved and the new WAF is enabled, the previous version of the WAF will be automatically disabled, due to the presence of the `waf_migration=pending&phase_two=1` parameters. This will make sure that your zone stays protected by one of the WAF versions during the update process.

___

## Post-migration recommendations

Check the [**Activity log**](https://developers.cloudflare.com/waf/analytics/paid-plans/#activity-log) in Security Events in the days following the migration, looking for any legitimate requests being blocked by WAF Managed Rulesets. If you identify any incorrectly blocked requests, you can adjust the corresponding WAF rule action to _Log_. For more information on changing the action of a Managed Ruleset rule, refer to [Configure a single rule in a Managed Ruleset](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/#configure-a-single-rule-in-a-managed-ruleset) in the WAF documentation.

___

## API operations

Updating to the new WAF via API requires invoking the following API operations:

| Name | Method + Endpoint | Description |
| --- | --- | --- |
| Check WAF update compatibility | `GET /zones/<ZONE_ID>/waf_migration/check?phase_two=1` | Checks if the current zone can be updated to the new WAF, given its current configuration. |
| Get new WAF configuration | `GET /zones/<ZONE_ID>/waf_migration/config?phase_two=1` | Obtains the new WAF configuration that is equivalent to the current configuration (previous WAF version). |
| [Update zone entry point ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/) | `PUT /zones/<ZONE_ID>/rulesets/phases/http_request_firewall_managed/entrypoint?waf_migration=<VALUE>&phase_two=1` | Updates the configuration of the zone entry point ruleset for the `http_request_firewall_managed` phase.<br/>Available values for the `waf_migration` query string parameter:<br/>`pending` or `1`: Defines the new WAF Managed Rulesets configuration and disables WAF managed rules as soon as the provided configuration is saved and the new WAF is enabled.<br/>`validation` or `2`: (Enterprise zones only) Defines the new WAF Managed Rulesets configuration and enables WAF Managed Rulesets side by side with WAF managed rules, entering validation mode. To exit validation mode and finish the migration, invoke the same API endpoint with `waf_migration=pending`. |
| Get WAF status | `GET /zones/<ZONE_ID>/waf_migration/status` | Obtains the old and new WAF status for a zone (enabled/disabled). The response also includes the current migration state (or mode). | You must prepend the Cloudflare API base URL to the endpoints listed above to obtain the full endpoint:<br/>`https://api.cloudflare.com/client/v4` |

___

## Possible migration errors

Contact Cloudflare Support to get help with the following errors:

-   The number of firewall rules to migrate exceeds 200.
-   The length of a firewall rule expression is longer than 4 KB.

___

The concept of paranoia level did not exist in the OWASP version (2.x) used in WAF managed rules. Based on the OWASP guide recommendations, the WAF migration process will set the paranoia level of the Cloudflare OWASP Core Ruleset to _PL2_.
