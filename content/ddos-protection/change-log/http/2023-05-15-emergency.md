---
title: 2023-05-15 - Emergency
pcx_content_type: changelog
weight: 27990
layout: wide
---

# 2023-05-15 - Emergency

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
      <td>...1fc1e601</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #31).</td>
      <td>N/A</td>
      <td>block</td>
      <td></td>
    </tr>
<tr>
      <td>...863134d5</td>
      <td>HTTP requests from known bad user agents.</td>
      <td>block</td>
      <td>block</td>
      <td>Widen detection scope.</td>
    </tr>
<tr>
      <td>...bb3cefd0</td>
      <td>HTTP requests with unusual HTTP headers or URI path (signature #53).</td>
      <td>N/A</td>
      <td>block</td>
      <td></td>
    </tr>
<tr>
      <td>...d2f294d7</td>
      <td>HTTP requests trying to impersonate browsers.</td>
      <td>ddos_dynamic</td>
      <td>ddos_dynamic</td>
      <td>Extend the rule to catch attacks across multiple subdomains.</td>
    </tr>
<tr>
      <td>...d2f294d7</td>
      <td>HTTP requests trying to impersonate browsers.</td>
      <td>ddos_dynamic</td>
      <td>ddos_dynamic</td>
      <td>Expand the filter to catch more attacks.</td>
    </tr>
<tr>
      <td>...f2494447</td>
      <td>HTTP requests attempting to bypass the cache.</td>
      <td>ddos_dynamic</td>
      <td>ddos_dynamic</td>
      <td>Make rule more accurate when blocking attacks.</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}