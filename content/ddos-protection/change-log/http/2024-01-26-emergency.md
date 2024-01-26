---
title: 2024-01-26 - Emergency
pcx_content_type: changelog
weight: 27734
layout: wide
---

# 2024-01-26 - Emergency

{{<table-wrap>}}
<table style="width: 100%">
  <thead>
    <tr>
      <th>Rule ID</th>
      <th>Description</th>
      <th>Previous Action</th>
      <th>New Action</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>...3ad719cd</td>
      <td>HTTP requests from known botnet (signature #79).</td>
      <td>N/A</td>
      <td>ddos_dynamic</td>
      <td></td>
    </tr>
    <tr>
      <td>...61bc58d5</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #55).</td>
      <td>managed_challenge</td>
      <td>managed_challenge</td>
      <td>Expanded the scope of the rule to catch attacks more consistently.</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}
