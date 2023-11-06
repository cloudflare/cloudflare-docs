---
pcx_content_type: changelog
title: Scheduled changes
weight: 2
layout: list
meta:
    title: Scheduled changes — HTTP DDoS
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
      <td>2023-10-30</td>
      <td>2023-11-13</td>
      <td>...e269dfd6</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #56).</td>
      <td>N/A</td>
      <td>block</td>
      <td>This rule might cause false positives in case the requests go through a
third party proxy before reaching the Cloudflare network.</td>
    </tr>
<tr>
      <td>2023-10-30</td>
      <td>2023-11-13</td>
      <td>...f35a42a0</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #57).</td>
      <td>N/A</td>
      <td>block</td>
      <td>This rule might cause false positives in case the requests go through a
third party proxy before reaching the Cloudflare network.</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}
