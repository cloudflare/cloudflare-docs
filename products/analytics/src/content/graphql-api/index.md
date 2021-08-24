---
order: 2
pcx-content-type: interim
---

# GraphQL Analytics API

The GraphQL Analytics API provides data regarding HTTP requests passing through Cloudflare’s network, as well as data from specific products, such as Firewall or Load Balancing. Network Analytics users also have access to packet-level data. Use the GraphQL Analytics API to select specific data sets and metrics of interest, filter and aggregate the data along various dimensions, and integrate the results with other applications.

The basis of the API is the [GraphQL framework](https://graphql.org/), created and open-sourced by Facebook. There is an active developer community for GraphQL and powerful clients for running queries, which makes it easy to get started. GraphQL is especially useful for building visualizations and powers the analytics in Cloudflare's Dashboard.

GraphQL models a business domain as a graph using a schema. In the schema, there are logical definitions for different types of nodes and their connections (edges). These nodes are the data sets you use for your analytics. You write queries in GraphQL much like in SQL: you specify the data set (table), the metrics to retrieve (such as requests and bytes), and filter or group by dimensions (for example, a time period).

GraphQL differs from a traditional API: it has one single endpoint:

```
https://api.cloudflare.com/client/v4/graphql
```

You pass the query parameters as a JSON object in the payload of a `POST` request to this endpoint.

You can use `curl` to make requests to the GraphQL Analytics API. Alternatively, you can use a GraphQL client to construct queries and pass requests to the GraphQL Analytics API.

## Clients

We are using [_GraphiQL_](https://electronjs.org/apps/graphiql) for our example GraphQL queries. There are many other popular open-source clients that you can find online, such as [_Altair_](https://altair.sirmuel.design) and [_Insomnia_](https://insomnia.rest).
