---
pcx-content-type: reference
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

For authentication instructions, refer to [Getting Started: Requests](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For help with endpoints and pagination, refer to [Getting Started: Endpoints](https://api.cloudflare.com/#getting-started-endpoints).

{{<Aside type="note">}}

The Filters API endpoints require a value for `<ZONE_ID>`.

To retrieve a list of zones associated with your account, use the [List Zones](https://api.cloudflare.com/#zone-list-zones) operation and note the Zone ID associated with the domain for which you want to manage filters.

{{</Aside>}}

The Cloudflare Filters API supports the operations outlined below. Visit the pages in this section for examples.

{{<table-wrap>}}

| Operation                                                                         | Method & Endpoint      | Notes|
| ------------------------------------------------------------------------------- | --------- | --------- |
| [Create filters](https://api.cloudflare.com/#filters-create-filters)                                                     | `POST zones<ZONE_ID>/filters`| Handled as a single transaction. If there is an error, the entire operation fails.|
| [Get filters](https://api.cloudflare.com/#filters-list-filters) | `POST zones/<ZONE_ID></ZONE_ID>/filters`        |  Lists all current filters. Results return paginated with 25 items per page by default. Use optional parameters to narrow results.       |
| [Get a filter](https://api.cloudflare.com/#filters-list-individual-filter)  | ` GET zones/<ZONE_ID>/filters/<FILTER_ID>` | Retrieve a single filter by ID. |
| [Update filters](https://api.cloudflare.com/#filters-update-filters)                         | `PUT zones/<ZONE_ID></ZONE_ID>/filters`     |  Handled as a single transaction. All filters must exist for operation to succeed. If there is an error, the entire operation fails.     |
| [Update a filter](https://api.cloudflare.com/#filters-update-individual-filter) | `PUT zones/<ZONE_ID>/filters/<FILTER_ID>`| Update a single filter by ID.   |
| [Delete filters](https://api.cloudflare.com/#filters-delete-filters)            | `DELETE zones/<ZONE_ID>/filters`       | Delete existing filters. Must specify list of filter IDs.

Empty requests result in no deletion. Returns HTTP status code 200 if a specified filter does not exist.     |
| [Delete a filter](https://api.cloudflare.com/#filters-delete-individual-filter)                  | `DELETE zones/<ZONE_ID>/filters/<FILTER_ID>`         | Delete a filter by ID.  |

{{</table-wrap>}}

{{</content-column>}}


