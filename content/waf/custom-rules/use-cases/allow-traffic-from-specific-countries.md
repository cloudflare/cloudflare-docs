---
pcx_content_type: configuration
title: Allow traffic from specific countries only
---

# Allow traffic from specific countries only

This example blocks requests based on country code using the [`ip.geoip.country`](/ruleset-engine/rules-language/fields/#field-ip-src-country) field, only allowing requests from two countries: United States and Mexico.

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
          (not ip.geoip.country in {"US" "MX"})
        </code>
      </td>
      <td>
        <em>Block</em>
      </td>
    </tr>
  </tbody>
</table>
