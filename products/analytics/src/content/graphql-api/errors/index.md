---
title: Error responses
order: 25
---

# Error responses

The GraphQL Analytics API is a RESTful API based on HTTPS requests and JSON responses and will return familiar HTTP status codes (e.g., `404`, `500`, `504`). However, in contrast to the common REST approach, a `200` response can contain an error, conforming to the [GraphQL specification](https://graphql.github.io/graphql-spec/June2018/#sec-Errors).

All responses contain an `errors` array, which will be `null` if there are no errors, and include at least one error object if there was an error. Non-null error objects will contain the following fields:

- `message`: a string describing the error
- `path`: the nodes associated with the error, starting from the root. Note that the number included in the path array, e.g., `0` or `1`, specifies to which zone the error applies; `0` indicates the first zone in the list (or only zone, if only one is being queried).
- `timestamp`: UTC datetime when the error occurred

## Example
```json
{
  "data": null,
  "errors": [
    {
      "message": "cannot request data older than 2678400s",
      "path": [
        "viewer",
        "zones",
        "0",
        "firewallEventsAdaptiveGroups"
      ],
      "extensions": {
        "timestamp": "2019-12-09T21:27:19.195060142Z"
      }
    }
  ]
}
```

## Common error types

### Data set accessibility limits (entitlements) exceeded

Sample error messages:

- "cannot request data older than..."
- "number of fields can't be more than..."

Indicate that the query exceeds what's allowed for the particular data set under your plan. _See [Data set accessibility](/graphql-api/limits/#data-set-accessibility)_ for details.

### Parsing issues

Sample error messages:

- "error parsing args..."
- "scalar fields must have not selections"

Indicate that the query can't be processed because it's malformed.

### Rate limits exceeded

Sample error messages:

- "limit reached, please try reduced time period"
- "quota exceeded, please repeat your request in the next minute"
