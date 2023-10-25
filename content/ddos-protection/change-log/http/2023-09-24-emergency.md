---
title: 2023-09-24 - Emergency
pcx_content_type: changelog
weight: 27858
layout: list
---

# 2023-09-24 - Emergency

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
      <td>...0fb54442</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #49).</td>
      <td>N/A</td>
      <td>block</td>
      <td></td>
    </tr>
<tr>
      <td>...3dd5f188</td>
      <td>HTTP requests from known botnet (signature #71).</td>
      <td>N/A</td>
      <td>block</td>
      <td></td>
    </tr>
<tr>
      <td>...97003a74</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #17).</td>
      <td>block</td>
      <td>block</td>
      <td>Expand rule to catch more attacks.</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}