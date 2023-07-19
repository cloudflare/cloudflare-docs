---
title: 2023-05-16 - Emergency
pcx_content_type: changelog
weight: 27989
layout: list
---

# 2023-05-16 - Emergency

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
      <td>...311e414e</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #33).</td>
      <td>N/A</td>
      <td>ddos_dynamic</td>
      <td>Stop attacks from an active botnet.</td>
    </tr>
<tr>
      <td>...ad16b3fb</td>
      <td>HTTP requests from known botnet (signature #54).</td>
      <td>N/A</td>
      <td>block</td>
      <td></td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}