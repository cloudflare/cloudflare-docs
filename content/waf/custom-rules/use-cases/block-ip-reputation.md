---
pcx_content_type: configuration
title: Block requests by Threat Score
---

# Block requests by Threat Score

Cloudflare’s Threat Score ranks requests based on IP reputation. The [`cf.threat_score`](/ruleset-engine/rules-language/fields/#field-cf-threat_score) field can contain a score from 0 to 100. These scores are collected from [Project Honeypot](https://www.projecthoneypot.org/).

This example blocks requests based on country code ([ISO 3166-1 Alpha 2](https://www.iso.org/obp/ui/#search/code/) format), from IP addresses that score greater than 0. This is equivalent to setting the Security Level in **Security** > **Settings** to _High_. For more information, refer to [Security Level](/fundamentals/security/security-level/).

<table>
  <thead>
    <tr>
      <th>Expression</th>
      <th style="width:20%">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>
          (ip.geoip.country in {"CN" "TW" "US" "GB"} and cf.threat_score gt 0)
        </code>
      </td>
      <td>
        <em>Block</em>
      </td>
    </tr>
  </tbody>
</table>
