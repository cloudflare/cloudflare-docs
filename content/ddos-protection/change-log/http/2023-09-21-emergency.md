---
title: 2023-09-21 - Emergency
pcx_content_type: changelog
weight: 27861
layout: list
---

# 2023-09-21 - Emergency

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
      <td>...1d73128d</td>
      <td>HTTP requests from known botnet (signature #56).</td>
      <td>block</td>
      <td>block</td>
      <td>Make the rule customizable as it might cause false positive in rare cases.</td>
    </tr>
<tr>
      <td>...4a95ba67</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #32).</td>
      <td>ddos_dynamic</td>
      <td>ddos_dynamic</td>
      <td>Expand the scope of the rule to catch more attacks.</td>
    </tr>
<tr>
      <td>...6fe7a312</td>
      <td>HTTP requests from known botnet (signature #70).</td>
      <td>block</td>
      <td>block</td>
      <td>Update the rule to remove some rare false positives.</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}