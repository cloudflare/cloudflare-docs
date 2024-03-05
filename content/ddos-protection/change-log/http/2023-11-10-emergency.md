---
title: 2023-11-10 - Emergency
pcx_content_type: changelog
weight: 27811
layout: wide
---

# 2023-11-10 - Emergency

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
      <td>...7d0f1e5f</td>
      <td>HTTP requests from known botnet (signature #72).</td>
      <td>N/A</td>
      <td>block</td>
      <td></td>
    </tr>
<tr>
      <td>...94547a95</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #59).</td>
      <td>N/A</td>
      <td>ddos_dynamic</td>
      <td></td>
    </tr>
<tr>
      <td>...e269dfd6</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #56).</td>
      <td>log</td>
      <td>block</td>
      <td>Enable filter early to mitigate widespread impact.</td>
    </tr>
<tr>
      <td>...f35a42a0</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #57).</td>
      <td>log</td>
      <td>block</td>
      <td>Enable filter early to mitigate widespread impact.</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}
