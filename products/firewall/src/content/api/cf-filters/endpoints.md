---
type: table
order: 455
---

# Endpoints

<ContentColumn>

To invoke a Cloudflare Filters API operation, append the endpoint to the Cloudflare API base URL:

```html

https://api.cloudflare.com/client/v4/
```

For authentication instructions, see [_Getting Started: Requests_](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For help with endpoints and pagination, see [_Getting Started: Endpoints_](https://api.cloudflare.com/#getting-started-endpoints).

<Aside type='warning' header='Important'>

The Filters API endpoints require a value for _{zone_id}_.

To retrieve a list of zones associated with your account, use the [List Zones](https://api.cloudflare.com/#zone-list-zones) operation and note the Zone ID associated with the domain for which you want to manage filters.

</Aside>

The Cloudflare Filters API supports the operations outlined below. Visit the associated links for examples.

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
          <td><a href='/api/cf-filters/post/'>Create filters</a></td>
          <td><code class="InlineCode">POST zones/{'{zone_id}'}/filters</code></td>
          <td>Handled as a single transaction. If there is an error, the entire operation fails.</td>
      </tr>
      <tr>
          <td><a href='/api/cf-filters/get/#get-all-filters'>Fetch all filters</a></td>
          <td><code class="InlineCode">GET zones/{'{zone_id}'}/filters</code></td>
          <td>Lists all current filters. Results return paginated with 25 items per page by default. Use optional parameters to narrow results.</td>
      </tr>
      <tr>
          <td><a href='/api/cf-filters/get/#get-by-filter-id'>Fetch a filter by ID</a></td>
          <td><code class="InlineCode">GET zones/{'{zone_id}'}/filters/{'{id}'}</code></td>
          <td>Retrieve a single filter by ID.</td>
      </tr>
      <tr>
          <td><a href='/api/cf-filters/put/#update-multiple-filters'>Update multiple filters</a></td>
          <td><code class="InlineCode">PUT zones/{'{zone_id}'}/filters</code></td>
          <td>Handled as a single transaction. All filters must exist for operation to succeed. If there is an error, the entire operation fails.</td>
      </tr>
      <tr>
          <td><a href='/api/cf-filters/put/#update-a-single-filter'>Update a single filter by ID</a></td>
          <td><code class="InlineCode">PUT zones/{'{zone_id}'}/filters/{'{id}'}</code></td>
          <td>Update a single filter by ID.</td>
      </tr>
      <tr>
          <td><a href='/api/cf-filters/delete/#delete-multiple-filters'>Delete multiple filters</a></td>
          <td><code class="InlineCode">DELETE zones/{'{zone_id}'}/filters</code></td>
          <td><p>Delete existing filters. Must specify list of filter IDs.</p>
          <p>Empty requests result in no deletion. Returns HTTP status code 200 if a specified filter does not exist.</p></td>
      </tr>
      <tr>
          <td><a href='/api/cf-filters/delete/#delete-a-single-filter'>Delete a single filter by ID</a></td>
          <td><code class="InlineCode">DELETE zones/{'{zone_id}'}/filters/{'{id}'}</code></td>
          <td>Delete a filter by ID.</td>
      </tr>
  </tbody>
</table>
</TableWrap>
