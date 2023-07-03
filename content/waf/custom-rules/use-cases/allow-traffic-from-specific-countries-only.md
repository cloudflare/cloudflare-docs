---
pcx_content_type: configuration
title: Allow traffic from specific countries only
---

# Allow traffic from specific countries only

This example blocks requests based on country code ([ISO 3166-1 Alpha 2](https://www.iso.org/obp/ui/#search/code/) format), only allowing requests from two countries: United States and Mexico.

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
