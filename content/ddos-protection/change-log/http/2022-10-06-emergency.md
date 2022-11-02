---
title: 2022-10-06 - Emergency
pcx_content_type: changelog
weight: 28211
layout: list
---

# 2022-10-06 - Emergency

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
      <td>...6fa59d23</td>
      <td>HTTP requests that are very likely coming from bots.</td>
      <td>managed_challenge</td>
      <td>ddos_dynamic</td>
      <td>Block very large attacks instead of challenging them.</td>
    </tr>
<tr>
      <td>...91b2849e</td>
      <td>HTTP requests with unusual HTTP headers (signature #13).</td>
      <td>block</td>
      <td>block</td>
      <td>Some attacks were only partially mitigated. Now the rule should stop
attacks completely.</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}
