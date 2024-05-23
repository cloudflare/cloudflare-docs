---
pcx_content_type: concept
title: Managed rules
weight: 7
meta:
  title: WAF Managed Rules
layout: wide
---

# WAF Managed Rules

{{<render file="_waf-managed-rules-intro.md" productFolder="waf">}}

## Managed rulesets

Cloudflare provides the following managed rulesets in the WAF:

{{<table-wrap>}}
<table style="table-layout:fixed; width:100%;">
  <thead>
    <tr>
      <th style='width:30%; white-space:normal'><strong>Ruleset</strong></th>
      <th style='width:70%; word-wrap:break-word; white-space:normal'><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'><a href='/waf/managed-rules/reference/cloudflare-managed-ruleset/'>Cloudflare Managed Ruleset</a></td>
      <td><p>Created by the Cloudflare security team, this ruleset provides fast and effective protection for all of your applications. The ruleset is updated frequently to cover new vulnerabilities and reduce false positives.</p>
      <p>Ruleset ID: {{<rule-id>}}efb7b8c949ac4650a09736fc376e9aee{{</rule-id>}}</p></td>
    </tr>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'><a href='/waf/managed-rules/reference/owasp-core-ruleset/'>Cloudflare OWASP Core Ruleset</a></td>
      <td><p>Cloudflare's implementation of the Open Web Application Security Project, or OWASP ModSecurity Core Rule Set. Cloudflare routinely monitors for updates from OWASP based on the latest version available from the official code repository.</p>
      <p>Ruleset ID: {{<rule-id>}}4814384a9e5d4991b9815dcfc25d2f1f{{</rule-id>}}</p></td>
    </tr>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'><a href='/waf/managed-rules/reference/exposed-credentials-check/'>Cloudflare Exposed Credentials Check</a></td>
      <td><p>Deploy an automated credentials check on your end-user authentication endpoints. For any credential pair, the Cloudflare WAF performs a lookup against a public database of stolen credentials.</p>
      <p>Ruleset ID: {{<rule-id>}}c2e184081120413c86c3ab7e14069605{{</rule-id>}}</p></td>
    </tr>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'>Cloudflare Free Managed Ruleset</td>
      <td><p>Available on all Cloudflare plans. Designed to provide mitigation against high and wide impacting vulnerabilities. The rules are safe to deploy on most applications. If you deployed the Cloudflare Managed Ruleset for your site, you do not need to deploy this managed ruleset.</p>
      <p>Ruleset ID: {{<rule-id>}}77454fe2d30c4220b5701f6fdfb893ba{{</rule-id>}}</p></td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}

The following managed rulesets run in a response phase:

{{<table-wrap>}}
<table style="table-layout:fixed; width:100%;">
  <thead>
    <tr>
      <th style='width:30%; white-space:normal'><strong>Ruleset</strong></th>
      <th style='width:70%; word-wrap:break-word; white-space:normal'><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'><a href="/waf/managed-rules/reference/sensitive-data-detection/">Cloudflare Sensitive Data Detection</a></td>
      <td><p>Created by Cloudflare to address common data loss threats. These rules monitor the download of specific sensitive data — for example, financial and personally identifiable information. Available in <strong>Security</strong> > <strong>Sensitive Data</strong>.</p>
      <p>Ruleset ID: {{<rule-id>}}e22d83c647c64a3eae91b71b499d988e{{</rule-id>}}</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}

## Availability

The managed rulesets you can deploy depend on your Cloudflare plan.

{{<feature-table id="security.waf_a_managed_rules" skipAvailability="true">}}
