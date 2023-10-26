---
pcx_content_type: changelog
title: Historical (2018)
weight: 10050
meta:
    description: Changes to WAF managed rulesets done in 2018, before the public changelog was available.
layout: list
---

# Historical — 2018

{{<table-wrap>}}
<table style="width: 100%">
  <thead>
    <tr>
      <th>Rule ID</th>
      <th>Description</th>
      <th>Announcement Date</th>
      <th>Change Date</th>
      <th>Old WAF Action</th>
      <th>New WAF action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>100038</td>
      <td>
        Blocks requests to /server_status, which g ives away information on how
        a server works.
      </td>
      <td>2018-08-30</td>
      <td>2018-08-06</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>100089</td>
      <td>Improved SQLi detection</td>
      <td>2018-07-16</td>
      <td>2018-07-30</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}
