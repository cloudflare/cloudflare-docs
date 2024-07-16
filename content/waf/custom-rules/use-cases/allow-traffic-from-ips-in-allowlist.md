---
pcx_content_type: configuration
title: Allow traffic from IP addresses in allowlist only
meta:
  title: Allow traffic from IP addresses in allowlist only
---

# Allow traffic from IP addresses in allowlist only

This example skips WAF rules for requests from IP addresses in an allowlist (defined using an [IP list](/waf/tools/lists/custom-lists/#ip-lists)).

1. [Create an IP list](/waf/tools/lists/create-dashboard/) with the IP addresses for which you want to allow access.<br>
    For example, create an IP list named `allowed_ips` with one or more IP addresses. For more information on the accepted IP address formats, refer to [IP lists](/waf/tools/lists/custom-lists/#ip-lists).

2. Create a custom rule skipping all rules for any request from the IPs in the list you created (`allowed_ips` in the current example).

<table>
  <thead>
    <tr>
      <th>Expression</th>
      <th style="width:40%">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>
          (ip.src in $allowed_ips)
        </code>
      </td>
      <td>
        <em>Skip:</em><br>
        <ul>
          <li><em>All remaining custom rules</em></li>
          <li><em>Skip phases:</em>
            <ul>
              <li><em>All rate limiting rules</em></li>
              <li><em>All Super Bot Fight Mode rules</em></li>
              <li><em>All managed rules</em></li>
            </ul>
          </li>
        </ul>
        </em>
      </td>
    </tr>
  </tbody>
</table>

Make sure the new rule appears before any other custom rules in the rules list.

## Other resources

* [Use case: Require known IP addresses in site admin area](/waf/custom-rules/use-cases/site-admin-only-known-ips/)
* [Available skip options](/waf/custom-rules/skip/options/)