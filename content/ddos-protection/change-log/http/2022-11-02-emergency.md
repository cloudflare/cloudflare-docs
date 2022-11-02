---
title: 2022-11-02 - Emergency
pcx_content_type: changelog
weight: 28184
layout: list
---

# 2022-11-02 - Emergency

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
      <td>...06a46ce3</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #18).</td>
      <td>N/A</td>
      <td>block</td>
      <td>N/A</td>
    </tr>
<tr>
      <td>...81b5405c</td>
      <td>HTTP requests from known botnet (signature #3).</td>
      <td>block</td>
      <td>block</td>
      <td>Extend the rule to catch more attacks.</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}
