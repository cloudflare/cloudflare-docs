---
pcx_content_type: changelog
title: Scheduled changes
weight: 2
layout: list
---

# Scheduled changes

{{<table-wrap>}}
<table style="width: 100%">
  <thead>
    <tr>
      <th>Announcement Date</th>
      <th>Change Date</th>
      <th>Rule ID</th>
      <th>Description</th>
      <th>Previous Action</th>
      <th>New Action</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2023-06-16</td>
      <td>2023-06-27</td>
      <td>...c86adf25</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #38). Only for zones on PRO plan and above.</td>
      <td>log</td>
      <td>ddos_dynamic</td>
      <td></td>
    </tr>
    <tr>
      <td>2023-06-16</td>
      <td>2023-06-27</td>
      <td>...95f78bf0</td>
      <td>HTTP requests trying to impersonate browsers (pattern #2).</td>
      <td>log</td>
      <td>ddos_dynamic</td>
      <td></td>
    </tr>
    <tr>
      <td>2023-06-19</td>
      <td>2023-06-27</td>
      <td>...22807318</td>
      <td>HTTP requests from known botnets.</td>
      <td>log</td>
      <td>ddos_dynamic</td>
      <td>Detect new attacks from identified botnets.</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}
