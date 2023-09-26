---
title: 2023-09-05 - Emergency
pcx_content_type: changelog
weight: 27877
layout: list

---

# 2023-09-05 - Emergency

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
      <td>...22807318</td>
      <td>HTTP requests from known botnets.</td>
      <td>ddos_dynamic</td>
      <td>ddos_dynamic</td>
      <td>Expand filter to catch attacks more comprehensively.</td>
    </tr>
<tr>
      <td>...4346874d</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #46).</td>
      <td>N/A</td>
      <td>block</td>
      <td></td>
    </tr>
<tr>
      <td>...6fe7a312</td>
      <td>HTTP requests from known botnet (signature #70).</td>
      <td>N/A</td>
      <td>block</td>
      <td>Expand filter to catch more attacks. It is now configurable.</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}