---
pcx-content-type: reference
type: overview
title: Endpoints
weight: 456
layout: list
---

# Endpoints

{{<content-column>}}

To invoke a Cloudflare Filters API operation, append the endpoint to the Cloudflare API base URL:

```txt
https://api.cloudflare.com/client/v4/
```

For authentication instructions, refer to [Getting Started: Requests](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For help with endpoints and pagination, refer to [Getting Started: Endpoints](https://api.cloudflare.com/#getting-started-endpoints).

{{<Aside type="warning" header="Important">}}

The Filters API endpoints require a value for `<ZONE_ID>`.

To retrieve a list of zones associated with your account, use the [List Zones](https://api.cloudflare.com/#zone-list-zones) operation and note the Zone ID associated with the domain for which you want to manage filters.

{{</Aside>}}

The Cloudflare Filters API supports the operations outlined below. Visit the pages in this section for examples.

{{</content-column>}}

<table style='table-layout:fixed; width:100%'>
  <thead>
    <tr>
        <th style="width: 20%">Operation</th>
        <th>Method & Endpoint</th>
        <th style='width: 30%'>Notes</th>
    </tr>
  </thead>
  <tbody>
      <tr>
          <td><a href='https://api.cloudflare.com/#filters-create-filters'>Create filters</a></td>
          <td><code class="InlineCode">POST zones/{'<ZONE_ID>'}/filters</code></td>
          <td>Handled as a single transaction. If there is an error, the entire operation fails.</td>
      </tr>
      <tr>
          <td><a href='https://api.cloudflare.com/#filters-list-filters'>Get filters</a></td>
          <td><code class="InlineCode">GET zones/{'<ZONE_ID>'}/filters</code></td>
          <td>Lists all current filters. Results return paginated with 25 items per page by default. Use optional parameters to narrow results.</td>
      </tr>
      <tr>
          <td><a href='https://api.cloudflare.com/#filters-list-individual-filter'>Get a filter</a></td>
          <td><code class="InlineCode">GET zones/{'<ZONE_ID>'}/filters/{'<FILTER_ID>'}</code></td>
          <td>Retrieve a single filter by ID.</td>
      </tr>
      <tr>
          <td><a href='https://api.cloudflare.com/#filters-update-filters'>Update filters</a></td>
          <td><code class="InlineCode">PUT zones/{'<ZONE_ID>'}/filters</code></td>
          <td>Handled as a single transaction. All filters must exist for operation to succeed. If there is an error, the entire operation fails.</td>
      </tr>
      <tr>
          <td><a href='https://api.cloudflare.com/#filters-update-individual-filter'>Update a filter</a></td>
          <td><code class="InlineCode">PUT zones/{'<ZONE_ID>'}/filters/{'<FILTER_ID>'}</code></td>
          <td>Update a single filter by ID.</td>
      </tr>
      <tr>
          <td><a href='https://api.cloudflare.com/#filters-delete-filters'>Delete filters</a></td>
          <td><code class="InlineCode">DELETE zones/{'<ZONE_ID>'}/filters</code></td>
          <td><p>Delete existing filters. Must specify list of filter IDs.</p>
          <p>Empty requests result in no deletion. Returns HTTP status code 200 if a specified filter does not exist.</p></td>
      </tr>
      <tr>
          <td><a href='https://api.cloudflare.com/#filters-delete-individual-filter'>Delete a filter</a></td>
          <td><code class="InlineCode">DELETE zones/{'<ZONE_ID>'}/filters/{'<FILTER_ID>'}</code></td>
          <td>Delete a filter by ID.</td>
      </tr>
  </tbody>
</table>
