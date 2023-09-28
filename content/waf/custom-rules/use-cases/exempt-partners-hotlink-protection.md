---
pcx_content_type: configuration
title: Exempt partners from Hotlink Protection
---

# Exempt partners from Hotlink Protection

When enabled, [Cloudflare Hotlink Protection](/support/more-dashboard-apps/cloudflare-scrape-shield/understanding-cloudflare-hotlink-protection/) blocks all HTTP referrers that are not part of your domain or zone. That presents a problem if you allow partners to use inline links to your assets.

## Allow requests from partners using custom rules

You can use custom rules to protect against hotlinking while allowing inline links from your partners. In this case, you will need to disable [Hotlink Protection](/support/more-dashboard-apps/cloudflare-scrape-shield/understanding-cloudflare-hotlink-protection/) within the **Scrape Shield** app so that partner referrals are not blocked by that feature.

This example uses the [`http.referer`](/ruleset-engine/rules-language/fields/#field-http-referer) field to target HTTP referrals from partner sites.

The `not` operator matches HTTP referrals that are not from partner sites, and the action blocks them:

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
          not (http.referer contains "example.com" or http.referer eq "www.example.net" or
          http.referer eq "www.cloudflare.com")
        </code>
      </td>
      <td>
        <em>Block</em>
      </td>
    </tr>
  </tbody>
</table>

## Allow requests from partners using Configuration Rules

Alternatively, you can create a [configuration rule](/rules/configuration-rules/) to exclude HTTP referrals from partner sites from Hotlink Protection. In this case, you would keep the Hotlink Protection feature enabled.
