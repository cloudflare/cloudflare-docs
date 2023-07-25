---
pcx_content_type: configuration
title: Update custom rules for customers or partners
---

# Update custom rules for customers or partners

You may want to adjust your custom rules to increase access by customers or partners.

Potential examples include:

- Removing rate limiting for an API
- Sharing brand assets and marketing materials

{{<Aside type="warning">}}
The example rules in this page can bypass Cloudflare's security features and are generally not recommended. Use with caution.
{{</Aside>}}

## Use ASN in custom rules

If a customer or partner is large enough, you could set up a custom rule based on an [autonomous system number (ASN)](https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/).

### Allow traffic by ASN

This example uses:

- The [`ip.geoip.asnum`](/ruleset-engine/rules-language/fields/#field-ip-src-asnum) field to specify the general region.
- The [`cf.bot_management.score`](/ruleset-engine/rules-language/fields/#field-cf-bot_management-score) field to ensure partner traffic does not come from bots.

<table style="table-layout:fixed; width:100%">
  <thead>
    <tr>
      <th>Expression</th>
      <th style="width:20%">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>(ip.geoip.asnum eq 64496 and cf.bot_management.score gt 30)</code>
      </td>
      <td>
        <em>Skip:</em><br>
        — <em>All remaining custom rules</em>
      </td>
    </tr>
  </tbody>
</table>

{{<Aside type="warning" header="Important">}}

Access to [Bot Management](/bots/plans/bm-subscription/) requires a Cloudflare Enterprise plan with Bot Management.

{{</Aside>}}

### Adjust rules by ASN

This example uses:

- The [`ip.geoip.asnum`](/ruleset-engine/rules-language/fields/#field-ip-src-asnum) field to specify the general region.
- The [`cf.threat_score`](/ruleset-engine/rules-language/fields/#field-cf-threat_score) dynamic field to ensure requests are not high-risk traffic.

If a request meets these criteria, your custom rule skips [User Agent Blocking](/waf/tools/user-agent-blocking/) rules.

<table style="table-layout:fixed; width:100%">
  <thead>
    <tr>
      <th>Expression</th>
      <th style="width:20%">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>(ip.geoip.asnum eq 64496 and cf.threat_score lt 14)</code>
      </td>
      <td>
        <em>Skip:</em><br>
        — <em>User Agent Blocking</em>
      </td>
    </tr>
  </tbody>
</table>

## Use IP addresses in custom rules

For smaller organizations, you could set up custom rules based on IP addresses.

### Allow traffic by IP address

This example:

- Specifies the source IP address and the host.
- Uses the [`cf.bot_management.score`](/ruleset-engine/rules-language/fields/#field-cf-bot_management-score) field to ensure requests are not high-risk traffic.

<table style="table-layout:fixed; width:100%">
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
          (ip.src eq 203.0.113.1 and http.host eq "example.com" and cf.bot_management.score gt 30)
        </code>
      </td>
      <td>
        <em>Skip:</em><br>
        — <em>All remaining custom rules</em>
      </td>
    </tr>
  </tbody>
</table>

### Adjust rules by IP address

This example specifies the source IP address and the host.

If a request meets these criteria, it will skip [rate limiting rules](/waf/rate-limiting-rules/).

<table style="table-layout:fixed; width:100%">
  <thead>
    <tr>
      <th>Expression</th>
      <th style="width:20%">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>(ip.src eq 203.0.113.1 and http.host eq "example.com")</code>
      </td>
      <td>
        <em><em>Skip:</em><br>
        — <em>All rate limiting rules</em></em>
      </td>
    </tr>
  </tbody>
</table>
