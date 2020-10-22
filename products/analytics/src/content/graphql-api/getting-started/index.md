---
title: Getting started
order: 10
---

# Getting started

This section describes setting up authentication for _GraphiQL_ and GraphQL Analytics API querying basics.

## Setting up authentication in _GraphiQL_

To ensure that the GraphQL Analytics API authenticates your queries, retrieve your Cloudflare Global API Key.

- Learn how to [find your API Key](https://support.cloudflare.com/hc/articles/200167836) in the Cloudflare Dashboard

- Learn how to [retrieve your API Key](https://api.cloudflare.com/#getting-started-requests) using the Cloudflare API

**To edit HTTP headers for authentication in _GraphiQL_:**

1. Launch _GraphiQL_

2. Click **Edit HTTP Headers**
   ![ ](../../static/images/GraphiQL-edit-http-headers.png)
   The _Edit HTTP Headers_ window appears.
   ![ ](../../static/images/GraphiQL-edit-http-headers-window.png)

3. Click **Add Header**
   ![ ](../../static/images/GraphiQL-add-header.png)

4. Enter **X-AUTH-EMAIL** in the _Header name_ field and your email address registered with Cloudflare in the _Header value_ field, and click **Save**

5. Click **Add Header**

6. Enter **X-AUTH-KEY** in the _Header Name_ field, paste your Global API Key in the \_Header value \_field, and click **Save**
   ![ ](../../static/images/GraphiQL-edit-http-headers-complete.png)

7. Click anywhere outside the _Edit HTTP Headers_ window in _GraphiQL_ to return to the _Untitled Query 1_ tab

8. Enter `https://api.cloudflare.com/client/v4/graphql` in the _GraphQL Endpoint_ field
   ![ ](../../static/images/GraphiQL-response-pane.png)

The right-side response pane is empty if you entered your information correctly. An error displays if there are problems with your header credentials.

That's it! You’re ready to run queries using _GraphiQL_.

## Querying basics

GraphQL structures data as a graph. You can explore the edges of the graph (using queries) to get the data you need. This is an example query format:

```javascript
viewer {
      zones(filter:...) {
         requests(filter:...) {
           date, time, bytes,...
         }
      }
}
```

where `viewer` represents the initial node of the user running the query.

The viewer can access one or more zones (domains) or accounts. Each zone or account contains various data sets, such as HTTP requests for a zone. There are numerous metrics and dimensions about requests, such as the the response bytes or the time at which the requests were received. You can apply filters at each node.

This example query shows a range of GraphQL functionality. Two data sets for the specified zone are queried simultaneously, filters and aggregations are applied, and a limit is set on the number of records returned (note that the `limit` argument must be included and can be equal to up to 10,000).

```javascript

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

<Aside type="note" header="Note">

This is only an example. You must specify the `zoneTag` for your domain. Your Cloudflare dashboard lists your Zone ID (`zoneTag`) on the _Overview_ page.

</Aside>

How can you tell what data sets, metrics, dimensions, operators, and functions are available? One of the great features of a GraphQL API is that it offers "introspection": you can explore the graph (by making API calls) to see the available data sets, the fields and their types, and the operations you can perform. _GraphiQL_ users this functionality to provide a "Documentation Explorer" that you can use to understand the schema. Click on the _Docs_ link on the right-hand side and then drill down starting with `Query` and proceeding to `viewer` and then `zone`. Introspection is also used to provide query auto-complete and syntax validation.

## Helpful Resources

Handy links for setting up the GraphQL Analytics API and learning about GraphQL.

### Cloudflare specifc

- [Understanding the Cloudflare Dashboard](https://support.cloudflare.com/hc/en-us/articles/205075117-Understanding-the-Cloudflare-dashboard) (explains where to find your Zone ID and API Key)

- [How to find your zoneTag using the API](https://api.cloudflare.com/#getting-started-resource-ids)

### General info on the GraphQL framework

- [How to use GraphQL (tutorials)](https://www.howtographql.com/)

- [Thinking in Graphs](https://graphql.org/learn/thinking-in-graphs/)

- [What data can you can query in the GraphQL type system (schemas)](https://graphql.org/learn/schema/)

- [How to pass variables in GraphiQL (Medium article with quick tips)](https://medium.com/graphql-mastery/graphql-quick-tip-how-to-pass-variables-into-a-mutation-in-graphiql-23ecff4add57)
