---
title: 2023-02-28 - Emergency
pcx_content_type: changelog
weight: 28066
layout: list
---

# 2023-02-28 - Emergency

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
      <td>...97003a74</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #17).</td>
      <td>log</td>
      <td>ddos_dynamic</td>
      <td>Enable mitigation on a subset of this rule that is known to only match
attacks.</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}