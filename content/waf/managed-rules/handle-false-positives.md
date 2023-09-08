---
pcx_content_type: concept
title: Handle false positives
weight: 9
---

# Handle false positives

If you encounter a false positive caused by a managed rule, do one of the following:

- **Add a WAF exception**: [WAF exceptions](/waf/managed-rules/waf-exceptions/) allow you to skip the execution of WAF managed rulesets or some of their rules for certain requests.

- **Adjust the OWASP managed ruleset**: A request blocked by rule with ID `...843b323c` and description `949110: Inbound Anomaly Score Exceeded` refers to the [Cloudflare OWASP Core Ruleset](/waf/managed-rules/reference/owasp-core-ruleset/). To resolve the issue, [configure the OWASP managed ruleset](/waf/managed-rules/reference/owasp-core-ruleset/#configure-in-the-dashboard).

- **Disable the corresponding managed rule(s)**: Create an override to disable specific rules. This may avoid false positives, but you will also reduce the overall site security. Refer to the [dashboard instructions](/waf/managed-rules/deploy-zone-dashboard/#configure-a-managed-ruleset) on configuring a managed ruleset, or to the [API instructions](/ruleset-engine/managed-rulesets/override-managed-ruleset/) on creating an override.

{{<Aside type="note">}}
If you contact Cloudflare Support to verify whether a WAF managed rule triggers as expected, [provide a HAR file](/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#generate-a-har-file) captured while sending the specific request of concern.
{{</Aside>}}

## Additional recommendations

- If one specific rule causes false positives, disable that specific rule and not the entire ruleset.

- For false positives with the administrator area of your website, add a WAF exception disabling a managed rule for the admin section of your site resources. You can use an expression similar to the following:

    `http.host eq "example.com" and starts_with(http.request.uri.path, "/admin")`
