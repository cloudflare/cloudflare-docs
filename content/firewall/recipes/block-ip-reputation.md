---
pcx-content-type: configuration
title: Block requests by Threat Score
---

# Block requests by Threat Score

A powerful feature of firewall rules is its support for Cloudflare’s Threat Score, which ranks requests based on IP reputation. The [`cf.threat_score`](/ruleset-engine/rules-language/fields/#field-cf-threat_score) field can contain a score from 0 to 100. These scores are collected from [Project Honeypot](https://www.projecthoneypot.org/).

This example blocks requests based on country code ([ISO 3166-1 Alpha 2](https://www.iso.org/obp/ui/#search/code/) format), from IP addresses that score greater than 0. This is equivalent to setting the Security Level in **Security** > **Settings** to _High_. For more, refer to [Understanding the Cloudflare Security Level](https://support.cloudflare.com/hc/articles/200170056).

<table>
  <thead>
    <tr>
      <th>Expression</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>
          (ip.geoip.country in {"CN" "TW" "US" "GB"}) and cf.threat_score > 0
        </code>
      </td>
      <td>
        <em>Block</em>
      </td>
    </tr>
  </tbody>
</table>
