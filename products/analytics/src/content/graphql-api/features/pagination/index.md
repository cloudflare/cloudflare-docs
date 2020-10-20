---
title: Pagination
order: 14
---

# Pagination


Pagination--breaking up your query results into smaller parts--can be done using `limit`, `orderBy`, and filtering parameters. The GraphQL Analytics API does not support cursors for pagination.

- `limit` (integer) defines how many records to return
- `orderBy` (string) defines the sort order for the data

## Query pages without cursors

Our examples assume that the `date` and `clientCountryName` relationships are unique.

### Get the first _n_ results of a query

To limit results, add the `limit` parameter as an integer. For example, query the first two records:

```javascript

firewallEventsAdaptive (limit: 2, orderBy: [datetime_ASC, clientCountryName_ASC]) {
    datetime
    clientCountryName
}
```

<Aside type="info" header="Info">

Specifying a sort order by date returns less specific results than specifying a sort order by date and country.
</Aside>

**Response**

```javascript

{
  "firewallEventsAdaptive" : [
    {
      "datetime": "2018-11-12T00:00:00Z",
      "clientCountryName": "UM"
    },
    {
      "datetime": "2018-11-12T00:00:00Z",
      "clientCountryName": "US"
    }
  ]
}
```

### Query for the next page using filters
To get the next _n_ results, specify a filter to exclude the last result from the previous query. Taking the previous example, you can do this by appending the greater-than operator (`_gt`) to the `clientCountryName` field and the greater-or-equal operator (`_geq`) to the `datetime` field. This is where being specific about sort order comes into play. You are less likely to miss results using a more granular sort order.

```javascript

firewallEventsAdaptive (limit: 2, orderBy: [datetime_ASC, clientCountryName_ASC], filter: {date_geq: "2018-11-12T00:00:00Z", clientCounterName_gt: "US"}) {
    date
    clientCountryName
}
```

**Response**

```javascript

{
  "firewallEventsAdaptive" : [
    {
      "datetime": "2018-11-12T00:00:00Z",
      "clientCountryName": "UY"
    },
    {
      "datetime": "2018-11-12T00:00:00Z",
      "clientCountryName": "UZ"
    }
  ]
}
```

### Query the previous page
To get the previous _n_ results, reverse the filters and sort order.

```javascript

firewallEventsAdaptive (limit: 2, orderBy: [datetime_DESC, clientCountryName_DESC, filter: {date_leq: "2018-11-12T00:00:00Z", clientCountryName_lt: "UY"}]) {
  datetime
  clientCountryName
}
```

**Response**

```javascript

{
  "firewallEventsAdaptive" : [
    {
      "datetime": "2018-11-12T00:00:00Z",
      "clientCountryName": "US"
    },
    {
      "datetime": "2018-11-12T00:00:00Z",
      "clientCountryName": "UM"
    }
  ]
}
```
