---
title: 2023-08-25 - Emergency
pcx_content_type: changelog
weight: 27888
layout: wide
---

# 2023-08-25 - Emergency

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
      <td>...20c5afb5</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #36).</td>
      <td>block</td>
      <td>block</td>
      <td>This rule was previously readonly, but can cause false positives in rare
cases. It is now possible to override it.</td>
    </tr>
<tr>
      <td>...cb26e2e2</td>
      <td>HTTP requests from known botnet (signature #69).</td>
      <td>N/A</td>
      <td>block</td>
      <td></td>
    </tr>
<tr>
      <td>...ebff5ef1</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #43).</td>
      <td>N/A</td>
      <td>block</td>
      <td></td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}