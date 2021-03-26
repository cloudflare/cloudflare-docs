---
title: Querying basics
order: 20
---

# Querying basics

## Structure of a GraphQL query

GraphQL structures data as a graph. GraphQL uses a schema to define the objects and their hierarchy in your data graph. You can explore the edges of the graph by using queries to get the data you need. These queries must respect the structure of the schema.

At the core of a GraphQL query is a _node_, followed by its _fields_. The node is an object of a certain _type_; the type specifies the fields that make up the object.

A field can be another node, in which case the appropriate query would contain nested elements. Some nodes look like functions that can take on arguments to limit the scope of what they can act on. You can apply filters at each node.

## Query against the Cloudflare GraphQL schema

A typical query against the Cloudflare GraphQL schema is made up of five components:

* `query` - The root node.
* `viewer` - A nested node indicating to GraphQL that you want to view the results. The `viewer` component represents the initial node of the user running the query.
* `zones` or `account` - A nested node indicating the domain area or account you want to query against. The `viewer` can access one or more zones or accounts. Each zone or account contains a collection of data sets.
* **Leaf node** - This specifies the data set you want to query against in a zone or account. `firewallEventsAdaptive` is an example of a leaf node that represents a data set for firewall events in a `zone` node.
* **Field** - The fields in a query specify the set of metrics that you want to fetch. The `firewallEventsAdaptive` leaf node includes the `clientIP` field. If your leaf node queries requests, possible fields would include response bytes or the time at which requests were received.

The following example shows the format for a firewall query:

```code

query{
  viewer {
      zones(filter: {...}) {
         firewallEventsAdaptive( limit: 10, orderBy: [...], filter: {...} ) {
           datetime, clientCountryName, action, ...
         }
      }
  }
}
```

### Example Query

The following query searches data from a zone for firewall events that occurred during a time interval. It sorts the results, limits the amount of results returned, and displays a set of fields for each firewall event.

```json
---
header: Query Firewall events for a specific time interval
---
query
{
  viewer
  {
    zones(filter: { zoneTag: "11111111"})
    {
      firewallEventsAdaptive(
          filter: {
            datetime_gt: "2020-08-03T02:07:05Z",
            datetime_lt: "2020-08-03T17:07:05Z" 
          },
          limit: 2,
          orderBy: [datetime_DESC, rayName_DESC])
      {
        action
        datetime
        rayName
        clientRequestHTTPHost
        userAgent
      }
    }
  }
}
```

* `zones(filter: { zoneTag: "11111111"})` confines the query to search to one zone.
* `firewallEventsAdaptive` is the large data set that you want to query against. The set of data returned is defined by the following:
    * `filter:{}` limits the scope to firewall events between two times: `datetime_gt` (greater than) and `datetime_lt` (less than).
    * `limit: 2` limits the results to 2 (the maximum value is 10,000).
    * `orderBy` sorts the results, first by `datetime_DESC`, the datetime field , in descending order, and then by the rayname, also in descending order.
    * The list of fields: `action` (Allow, Block, Challenge), `datetime`, `rayName` (the RayID), `clientRequestHTTPHost` (the host the client requested), and `userAgent`.

You can send the query with an API call or by clicking **Play** in the GraphiQL client. The format of the response is in JSON:

```json
---
header: Query response from firewallEventsAdaptive
---
{
  "data": {
    "viewer": {
      "zones": [
        {
          "firewallEventsAdaptive": [
            {
              "action": "log",
              "clientRequestHTTPHost": "cloudflare.guru",
              "datetime": "2020-08-03T17:07:03Z",
              "rayName": "5bd1a1fc584357ed",
              "userAgent": "Mozilla/5.0 (compatible;Cloudflare-Healthchecks/1.0;+https://www.cloudflare.com/; healthcheck-id: 08c774cde2f3c385)"
            },
            {
              "action": "log",
              "clientRequestHTTPHost": "cloudflare.guru",
              "datetime": "2020-08-03T17:07:01Z",
              "rayName": "5bd1a1ef3bb5d296",
              "userAgent": "Mozilla/5.0 (compatible;Cloudflare-Healthchecks/1.0;+https://www.cloudflare.com/; healthcheck-id: 764497f790f6a070)"
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```

## Query two data sets in a single API call

This example query employs a broad range of GraphQL functionality. The example queries two data sets for the specified zone simultaneously, applies filters and aggregations, and sets a limit on the number of records returned. (Note that you must include the `limit` argument, which can be equal or up to 10,000.)

```json
---
header: Query two data sets simultaneously
---
query {
  viewer {
    zones(filter: {zoneTag: "<your zone ID>"}) {
      httpRequests1mGroups(limit: 5, filter: { datetime_gt: "2019-02-01T04:00:00Z", datetime_lt: "2019-02-01T06:00:00Z"}) {
        sum {
          countryMap {
            bytes
            clientCountryName
          }
        }
        dimensions {
          date
          datetime
        }
      }
      firewallEventsAdaptiveGroups(limit: 10, filter: { datetime_gt: "2019-02-01T04:00:00Z", datetime_lt: "2019-02-01T06:00:00Z"}) {
        count
        dimensions {
          clientCountryName
          clientAsn
          datetimeHour
        }
      }
    }
  }
}
```

<Aside type='note' header='Note'>

This is only an example. You must specify the <code>zoneTag</code> for your domain. Your Cloudflare dashboard lists your Zone ID (<code>zoneTag</code>) on the <em>Overview</em> page.

</Aside>

## Introspection

The GraphQL API offers [introspection](https://graphql.org/learn/introspection/), which allows you to explore the graph (by making API calls) to see the available data sets, fields, and operations you can perform.

For an introduction to browsing the Analytics GraphQL API, see [_Explore the Analytics schema with GraphiQL_](/graphql-api/getting-started/explore-graphql-schema).

## Helpful Resources

Here are some helpful articles about working with the Cloudflare Analytics API and GraphQL.

### Cloudflare specific

* [_Understanding the Cloudflare Dashboard_](https://support.cloudflare.com/hc/en-us/articles/205075117-Understanding-the-Cloudflare-dashboard)
* [_How to find your zoneTag using the API_](https://api.cloudflare.com/#getting-started-resource-ids)

### General info on the GraphQL framework

* [_How to use GraphQL (tutorials)_](https://www.howtographql.com/)
* [_Thinking in Graphs_](https://graphql.org/learn/thinking-in-graphs/)
* [_What data can you can query in the GraphQL type system (schemas)_](https://graphql.org/learn/schema/)
* [_How to pass variables in GraphiQL (Medium article with quick tips)_](https://medium.com/graphql-mastery/graphql-quick-tip-how-to-pass-variables-into-a-mutation-in-graphiql-23ecff4add57)
