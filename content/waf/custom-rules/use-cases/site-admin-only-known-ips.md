---
pcx_content_type: configuration
title: Require known IP addresses in site admin area
---

# Require known IP addresses in site admin area

If an attack compromises the administrative area of your website, the consequences can be severe. With custom rules, you can protect your site’s admin area by blocking requests for access to admin paths that do not come from a known IP address.

The example below limits access to the WordPress admin area, `/wp-admin/`, by blocking requests that do not originate from a specified set of IP addresses.

To prevent attackers from successfully using a permutation of `/wp-admin/` such as `/wP-AdMiN/`, use the [`lower()`](/ruleset-engine/rules-language/functions/#function-lower) transformation function to convert the URI path to lowercase:

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
          (not ip.src in {10.20.30.40 192.168.1.0/24} and starts_with(lower(http.request.uri.path), "/wp-admin"))
        </code>
      </td>
      <td>
        <em>Block</em>
      </td>
    </tr>
  </tbody>
</table>

## Other resources

* [Use case: Allow traffic from IP addresses in allowlist only](/waf/custom-rules/use-cases/allow-traffic-from-ips-in-allowlist/)
