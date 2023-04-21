---
title: 2023-04-21 - Emergency
pcx_content_type: changelog
weight: 28014
layout: list
---

# 2023-04-21 - Emergency

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
      <td>...d2f294d7</td>
      <td>HTTP requests trying to impersonate browsers.</td>
      <td>ddos_dynamic</td>
      <td>ddos_dynamic</td>
      <td>Remove some rare false positives</td>
    </tr>
<tr>
      <td>...d3fb9259</td>
      <td>HTTP requests from known botnet (signature #51).</td>
      <td>N/A</td>
      <td>block</td>
      <td></td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}