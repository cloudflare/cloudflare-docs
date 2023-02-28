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
      <td>2023-02-27</td>
      <td>2023-03-06</td>
      <td>...97003a74</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #17).</td>
      <td>N/A</td>
      <td>log</td>
      <td>Detect new attacks with unusual HTTP attributes.</td>
    </tr>
<tr>
      <td>2023-02-27</td>
      <td>2023-03-06</td>
      <td>...d2f294d7</td>
      <td>HTTP requests trying to impersonate browsers.</td>
      <td>ddos_dynamic</td>
      <td>ddos_dynamic</td>
      <td>Expanded the filter to catch more attacks.</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}
