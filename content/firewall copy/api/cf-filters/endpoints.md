---
pcx_content_type: reference
title: Endpoints
weight: 3
layout: list
---

# Endpoints

{{<content-column>}}

To invoke a Cloudflare Filters API operation, append the endpoint to the Cloudflare API base URL:

```txt
https://api.cloudflare.com/client/v4/
```

For authentication instructions, refer to [Getting Started: Requests](/fundamentals/api/) in the Cloudflare API documentation.

For help with endpoints and pagination, refer to [Getting Started: Endpoints](/fundamentals/api/).

{{<Aside type="note">}}

The Filters API endpoints require a value for `<ZONE_ID>`.

To retrieve a list of zones associated with your account, use the [List Zones](/api/operations/zones-get) operation and note the Zone ID associated with the domain for which you want to manage filters.

{{</Aside>}}

The Cloudflare Filters API supports the operations outlined below. Visit the pages in this section for examples.

{{</content-column>}}

<table style="table-layout:fixed; width:100%">
  <thead>
    <tr>
      <th style="width: 20%">Operation</th>
      <th>Method & Endpoint</th>
      <th style="width: 30%">Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="/api/operations/filters-create-filters">Create filters</a>
      </td>
      <td>
        <code class="InlineCode">POST zones/&lt;ZONE_ID&gt;/filters</code>
      </td>
      <td>Handled as a single transaction. If there is an error, the entire operation fails.</td>
    </tr>
    <tr>
      <td>
        <a href="/api/operations/filters-list-filters">Get filters</a>
      </td>
      <td>
        <code class="InlineCode">GET zones/&lt;ZONE_ID&gt;/filters</code>
      </td>
      <td>
        Lists all current filters. Results return paginated with 25 items per page by default. Use
        optional parameters to narrow results.
      </td>
    </tr>
    <tr>
      <td>
        <a href="/api/operations/filters-get-a-filter">Get a filter</a>
      </td>
      <td>
        <code class="InlineCode">
          GET zones/&lt;ZONE_ID&gt;/filters/&lt;FILTER_ID&gt;
        </code>
      </td>
      <td>Retrieve a single filter by ID.</td>
    </tr>
    <tr>
      <td>
        <a href="/api/operations/filters-update-filters">Update filters</a>
      </td>
      <td>
        <code class="InlineCode">PUT zones/&lt;ZONE_ID&gt;/filters</code>
      </td>
      <td>
        Handled as a single transaction. All filters must exist for operation to succeed. If there
        is an error, the entire operation fails.
      </td>
    </tr>
    <tr>
      <td>
        <a href="/api/operations/filters-update-a-filter">Update a filter</a>
      </td>
      <td>
        <code class="InlineCode">
          PUT zones/&lt;ZONE_ID&gt;/filters/&lt;FILTER_ID&gt;
        </code>
      </td>
      <td>Update a single filter by ID.</td>
    </tr>
    <tr>
      <td>
        <a href="/api/operations/filters-delete-filters">Delete filters</a>
      </td>
      <td>
        <code class="InlineCode">DELETE zones/&lt;ZONE_ID&gt;/filters</code>
      </td>
      <td>
        <p>Delete existing filters. Must specify list of filter IDs.</p>
        <p>
          Empty requests result in no deletion. Returns HTTP status code 200 if a specified filter
          does not exist.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/api/operations/filters-delete-a-filter">Delete a filter</a>
      </td>
      <td>
        <code class="InlineCode">
          DELETE zones/&lt;ZONE_ID&gt;/filters/&lt;FILTER_ID&gt;
        </code>
      </td>
      <td>Delete a filter by ID.</td>
    </tr>
  </tbody>
</table>
