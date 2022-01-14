---
pcx-content-type: reference
type: overview
order: 415
---

# Endpoints

<ContentColumn>

To invoke a Cloudflare Firewall Rules API operation, append the endpoint to the Cloudflare API base URL:

```txt
https://api.cloudflare.com/client/v4/
```

For authentication instructions, refer to [Getting Started: Requests](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For help with endpoints and pagination, refer to [Getting Started: Endpoints](https://api.cloudflare.com/#getting-started-endpoints).

<Aside type='warning' header='Important'>

The Firewall Rules API endpoints require a value for `<ZONE_ID>`.

To retrieve a list of zones associated with your account, use the [List Zones](https://api.cloudflare.com/#zone-list-zones) operation and note the zone ID associated with the domain whose Firewall Rules you want to manage.

</Aside>

The Cloudflare Firewall Rules API supports the operations outlined below. Visit the associated links for examples.

</ContentColumn>

<table style='table-layout:fixed; width:100%'>
  <thead>
      <tr>
          <th style='width: 20%'>Operation</th>
          <th>Method & Endpoint</th>
          <th style='width: 30%'>Notes</th>
      </tr>
  </thead>
  <tbody>
      <tr>
        <td><a href='/api/cf-firewall-rules/post/'>Create Firewall Rules</a></td>
        <td><code class="InlineCode">POST&nbsp;zones/{'<ZONE_ID>'}/firewall/rules</code></td>
        <td>Handled as a single transaction. If there is an error, the entire operation fails.</td>
      </tr>
      <tr>
        <td><a href='/api/cf-firewall-rules/get/#get-all-rules'>List Firewall Rules</a></td>
        <td><code class="InlineCode">GET&nbsp;zones/{'<ZONE_ID>'}/firewall/rules</code></td>
        <td>Lists all current Firewall Rules. Results return paginated with 25 items per page by default. Use optional parameters to narrow results. </td>
      </tr>
      <tr>
        <td><a href='/api/cf-firewall-rules/get/#get-rule-by-id'>Get a Firewall Rule</a></td>
        <td><code class="InlineCode">GET&nbsp;zones/{'<ZONE_ID>'}/firewall/rules/{'<RULE_ID>'}</code></td>
        <td>Retrieve a single Firewall Rule by ID.</td>
      </tr>
      <tr>
        <td><a href='/api/cf-firewall-rules/put/#update-multiple-rules'>Update Firewall Rules</a></td>
        <td><code class="InlineCode">PUT&nbsp;zones/{'<ZONE_ID>'}/firewall/rules</code></td>
        <td>Handled as a single transaction. All rules must exist for operation to succeed. If there is an error, the entire operation fails.</td>
      </tr>
      <tr>
        <td><a href='/api/cf-firewall-rules/put/#update-a-single-rule'>Update a Firewall Rule</a></td>
        <td><code class="InlineCode">PUT&nbsp;zones/{'<ZONE_ID>'}/firewall/rules/{'<RULE_ID>'}</code></td>
        <td>Update a single Firewall Rule by ID.</td>
      </tr>
      <tr>
        <td><a href='/api/cf-firewall-rules/delete/#delete-multiple-rules'>Delete Firewall Rules</a></td>
        <td><code class="InlineCode">DELETE&nbsp;zones/{'<ZONE_ID>'}/firewall/rules</code></td>
        <td><p>Delete existing Firewall Rules. Must specify list of Firewall Rule IDs.</p>
        <p>Empty requests result in no deletion. Returns HTTP status code 200 if a specified rule does not exist.</p>
        </td>
      </tr>
      <tr>
        <td><a href='/api/cf-firewall-rules/delete/#delete-a-single-rule'>Delete a Firewall Rule</a></td>
        <td><code class="InlineCode">DELETE&nbsp;zones/{'<ZONE_ID>'}/firewall/rules/{'<RULE_ID>'}</code></td>
        <td><p>Delete a Firewall Rule by ID.</p></td>
      </tr>
  </tbody>
</table>
