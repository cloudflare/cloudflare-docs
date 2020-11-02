---
type: table
order: 415
---

# Endpoints

<ContentColumn>

To invoke a Cloudflare Firewall Rules API operation, append the endpoint to the Cloudflare API base URL:

```html
https://api.cloudflare.com/client/v4/
```

For authentication instructions, see [_Getting Started: Requests_](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For help with endpoints and pagination, see [_Getting Started: Endpoints_](https://api.cloudflare.com/#getting-started-endpoints).

<Aside type='warning' header='Important'>

The Firewall Rules API endpoints require a value for _{zone_id}_.

To retrieve a list of zones associated with your account, use the [List Zones](https://api.cloudflare.com/#zone-list-zones) operation and note the Zone ID associated with the domain whose firewall rules you want to manage.

</Aside>

The Cloudflare Firewall Rules API supports the operations outlined below. Visit the associated links for examples.

</ContentColumn>

<TableWrap style='width:100%'>
<table style='table-layout:fixed; width:100%'>
  <thead>
      <tr>
          <th>Operation</th>
          <th>Method & Endpoint</th>
          <th>Notes</th>
      </tr>
  </thead>
  <tbody>
      <tr>
        <td><a href='/api/cf-firewall-rules/post/'>Create firewall rules</a></td>
        <td><code class="InlineCode">POST&nbsp;zones/{'{zone_id}'}/firewall/rules</code></td>
        <td>Handled as a single transaction. If there is an error, the entire operation fails.</td>
      </tr>
      <tr>
        <td><a href='/api/cf-firewall-rules/get/#get-all-rules'>List firewall rules</a></td>
        <td><code class="InlineCode">GET&nbsp;zones/{'{zone_id}'}/firewall/rules</code></td>
        <td>Lists all current firewall rules. Results return paginated with 25 items per page by default. Use optional parameters to narrow results. </td>
      </tr>
      <tr>
        <td><a href='/api/cf-firewall-rules/get/#get-rule-by-id'>Get firewall rule by ID</a></td>
        <td><code class="InlineCode">GET&nbsp;zones/{'{zone_id}'}/firewall/rules/{'{id}'}</code></td>
        <td>Retrieve a single firewall rule by ID.</td>
      </tr>
      <tr>
        <td><a href='/api/cf-firewall-rules/put/#update-multiple-rules'>Update firewall rules</a></td>
        <td><code class="InlineCode">PUT&nbsp;zones/{'{zone_id}'}/firewall/rules</code></td>
        <td>Handled as a single transaction. All rules must exist for operation to succeed. If there is an error, the entire operation fails.</td>
      </tr>
      <tr>
        <td><a href='/api/cf-firewall-rules/put/#update-a-single-rule'>Update a firewall rule by ID</a></td>
        <td><code class="InlineCode">PUT&nbsp;zones/{'{zone_id}'}/firewall/rules/{'{id}'}</code></td>
        <td>Update a single firewall rule by ID.</td>
      </tr>
      <tr>
        <td><a href='/api/cf-firewall-rules/delete/#delete-all-rules'>Delete firewall rules</a></td>
        <td><code class="InlineCode">DELETE&nbsp;zones/{'{zone_id}'}/firewall/rules</code></td>
        <td><p>Delete existing firewall rules. Must specify list of firewall rule IDs.</p>
        <p>Empty requests result in no deletion. Returns HTTP status code 200 if a specified rule does not exist.</p>
        </td>
      </tr>
      <tr>
        <td><a href='/api/cf-firewall-rules/delete/#delete-a-single-rule'>Delete firewall rule by ID</a></td>
        <td><code class="InlineCode">DELETE&nbsp;zones/{'{zone_id}'}/firewall/rules/{'{id}'}</code></td>
        <td><p>Delete a firewall rule by ID.</p></td>
      </tr>
  </tbody>
</table>
</TableWrap>
