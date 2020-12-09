---
title: Querying basics
order: 20
---

# Querying basics

GraphQL structures data as a graph. You can explore the edges of the graph by using queries to get the data you need. This is an example query format:

```code
viewer {
      zones(filter:...) {
         requests(filter:...) {
           date, time, bytes,...
         }
      }
}
```

 where the `viewer` represents the initial node of the user running the query.

The viewer can access one or more zones (domains) or accounts. Each zone or account contains various data sets, such as HTTP requests for a zone. There are numerous metrics and dimensions about requests, such as the the response bytes or the time at which the requests were received. You can apply filters at each node.

This example query shows a range of GraphQL functionality. Two data sets for the specified zone are queried simultaneously, filters and aggregations are applied, and a limit is set on the number of records returned (note that you must include the `limit` argument, which can be equal or up to 10,000).

```code
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

How can you tell what data sets, metrics, dimensions, operators, and functions are available? One of the great features of a GraphQL API is that it offers "introspection": you can explore the graph (by making API calls) to see the available data sets, the fields and their types, and the operations you can perform. _GraphiQL_ users this functionality to provide a "Documentation Explorer" that you can use to understand the schema. Click on the _Docs_ link on the right-hand side and then drill down starting with `Query` and proceeding to `viewer` and then `zone`. Introspection is also used to provide query auto-complete and syntax validation.

## Helpful Resources

Handy links for setting up the GraphQL Analytics API and learning about GraphQL.

### Cloudflare specific

* [_Understanding the Cloudflare Dashboard_](https://support.cloudflare.com/hc/en-us/articles/205075117-Understanding-the-Cloudflare-dashboard)
* [_How to find your zoneTag using the API_](https://api.cloudflare.com/#getting-started-resource-ids)

### General info on the GraphQL framework

* [_How to use GraphQL (tutorials)_](https://www.howtographql.com/)
* [_Thinking in Graphs_](https://graphql.org/learn/thinking-in-graphs/)
* [_What data can you can query in the GraphQL type system (schemas)_](https://graphql.org/learn/schema/)
* [_How to pass variables in GraphiQL (Medium article with quick tips)_](https://medium.com/graphql-mastery/graphql-quick-tip-how-to-pass-variables-into-a-mutation-in-graphiql-23ecff4add57)
