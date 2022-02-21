---
pcx-content-type: concept
order: 4
---

# Managed Rulesets

Cloudflare provides the following Managed Rulesets in the WAF:

<TableWrap><table style="table-layout:fixed; width:100%;">
  <thead>
    <tr>
      <th style='width:30%; white-space:normal'><strong>Ruleset</strong></th>
      <th style='width:70%; word-wrap:break-word; white-space:normal'><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'><a href='/managed-rulesets/cloudflare-managed-ruleset'>Cloudflare Managed Ruleset</a></td>
      <td>Created by the Cloudflare security team, this ruleset provides fast and effective protection for all of your applications. The ruleset is updated frequently to cover new vulnerabilities and reduce false positives.</td>
    </tr>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'><a href='/managed-rulesets/owasp-core-ruleset'>Cloudflare OWASP Core Ruleset</a></td>
      <td>Cloudflare's implementation of the Open Web Application Security Project, or OWASP ModSecurity Core Rule Set. Cloudflare routinely monitors for updates from OWASP based on the latest version available from the official code repository.</td>
    </tr>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'><a href='/managed-rulesets/exposed-credentials-check'>Cloudflare Exposed Credentials Check</a></td>
      <td>Deploy an automated credentials check on your end-user authentication endpoints. For any credential pair, the Cloudflare WAF performs a lookup against a public database of stolen credentials.</td>
    </tr>
  </tbody>
</table></TableWrap>

The following rulesets run in the response phase:

<TableWrap><table style="table-layout:fixed; width:100%;">
  <thead>
    <tr>
      <th style='width:30%; white-space:normal'><strong>Ruleset</strong></th>
      <th style='width:70%; word-wrap:break-word; white-space:normal'><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'>Cloudflare Sensitive Data Detection (Beta)</td>
      <td>Created by Cloudflare to address common data loss threats. These rules monitor the download of specific sensitive data — for example, financial and personally identifiable information. Available in <strong>Firewall</strong> > <strong>Data</strong>.</td>
    </tr>
  </tbody>
</table></TableWrap>

## Phases of deployed Managed Rulesets

When you enable a Managed Ruleset in the **WAF** tab, you are deploying that Managed Ruleset to the zone-level `http_request_firewall_managed` phase.

Other Managed Rulesets, like DDoS Managed Rulesets, are deployed to a different phase. Refer to the specific Managed Ruleset documentation for details.

For more information on phases, refer to [Phases](https://developers.cloudflare.com/ruleset-engine/about#phases).
