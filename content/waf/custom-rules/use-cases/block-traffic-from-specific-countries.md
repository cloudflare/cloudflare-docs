---
pcx_content_type: configuration
title: Block traffic from specific countries
---

# Block traffic from specific countries

This example blocks requests based on country code using the [`ip.geoip.country`](/ruleset-engine/rules-language/fields/#field-ip-src-country) field.

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
          (ip.geoip.country in {"KN" "SY"})
        </code>
      </td>
      <td>
        <em>Block</em>
      </td>
    </tr>
  </tbody>
</table>

## Other resources

* [Use case: Allow traffic from specific countries only](/waf/custom-rules/use-cases/allow-traffic-from-specific-countries/)