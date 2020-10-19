---
title: Block Microsoft Exchange Autodiscover requests
---

In some cases, Microsoft Exchange Autodiscover service requests can be “noisy,” triggering large numbers of 404 errors.

This example uses the `matches` [comparison operator](/firewall/cf-firewall-language/operators/#comparison-operators) and a regular expression to block `autodiscover.xml` and `autodiscover.src` requests.

<TableWrap><table style="width: 100%;">

  <thead>
    <tr>
        <td><strong>Expression</strong></td>
        <td><strong>Action</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td valign="top">
            <pre><code>http.request.uri.path matches "/autodiscover\.(xml|src)$"</code></pre>
        </td>
        <td><em>Block</em></td>
    </tr>
  </tbody>
</table>
</TableWrap>
