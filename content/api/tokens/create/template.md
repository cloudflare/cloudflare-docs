---
type: overview
pcx-content-type: reference
title: API token templates
weight: 6
layout: list
---

# API token templates

{{<content-column>}}

Below is a table of the currently available API token templates and the default [token permissions](/api/tokens/create/permissions/) they grant. You can start creating a token with one of these templates and modify the permissions and resources from there.

{{</content-column>}}

{{<table-wrap>}}

<table>
  <tbody>
    <tr>
      <th>Template Name</th>
      <th>Permission</th>
      <th>Resource</th>
    </tr>
    <tr>
      <td>Edit Zone DNS</td>
      <td>DNS Write</td>
      <td>Zone</td>
    </tr>
    <tr>
      <td rowspan="2">Read billing info</td>
      <td>Billing Read</td>
      <td>Account</td>
    </tr>
    <tr>
      <td>Account resources: Include all accounts</td>
      <td></td>
    </tr>
    <tr>
      <td rowspan="2">Read analytics and logs</td>
      <td>Analytics Read</td>
      <td>Zone</td>
    </tr>
    <tr>
      <td>Logs Read</td>
      <td>Zone</td>
    </tr>
    <tr>
      <td rowspan="7">Edit Cloudflare Workers</td>
      <td>Workers Routes Write</td>
      <td>Zone</td>
    </tr>
    <tr>
      <td>Workers Scripts Write</td>
      <td>Account</td>
    </tr>
    <tr>
      <td>Workers KV Storage Write</td>
      <td>Account</td>
    </tr>
    <tr>
      <td>Workers Tail Read</td>
      <td>Account</td>
    </tr>
    <tr>
      <td>Workers R2 Storage Write</td>
      <td>Account</td>
    </tr>
    <tr>
      <td>Account Settings Read</td>
      <td>Account</td>
    </tr>
    <tr>
      <td>User Details Read</td>
      <td>User</td>
    </tr>
    <tr>
      <td rowspan="2">Edit load balancing configuration</td>
      <td>Load Balancing: Monitors and Pools Write</td>
      <td>Account</td>
    </tr>
    <tr>
      <td>Load Balancers Write</td>
      <td>Zone</td>
    </tr>
    <tr>
      <td rowspan="8">WordPress</td>
      <td>Analytics Read</td>
      <td>Zone</td>
    </tr>
    <tr>
      <td>Zone Read</td>
      <td>Zone</td>
    </tr>
    <tr>
      <td>Zone Settings Write</td>
      <td>Zone</td>
    </tr>
    <tr>
      <td>Account Settings Read</td>
      <td>Account</td>
    </tr>
    <tr>
      <td>DNS Read</td>
      <td>Zone</td>
    </tr>
    <tr>
      <td>Cache Purge</td>
      <td>Zone</td>
    </tr>
    <tr>
      <td>Account resources: Include all accounts</td>
      <td></td>
    </tr>
    <tr>
      <td>Zone resources: Include all zones</td>
      <td></td>
    </tr>
    <tr>
      <td>Create Additional Tokens</td>
      <td>API Tokens Write</td>
      <td>User</td>
    </tr>
    <tr>
      <td rowspan="3">Read All Resources</td>
      <td><em>(All read permissions)</em></td>
      <td>Account, Zone, User</td>
    </tr>
    <tr>
      <td>Account resources: Include all accounts</td>
      <td></td>
    </tr>
    <tr>
      <td>Zone resources: Include all zones</td>
      <td></td>
    </tr>
  </tbody>
</table>

{{</table-wrap>}}
