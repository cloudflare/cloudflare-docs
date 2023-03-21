---
pcx_content_type: reference
title: Querying basics
weight: 21
---

# Querying basics

## Structure of a GraphQL query

GraphQL structures data as a graph. GraphQL uses a schema to define the objects
and their hierarchy in your data graph. You can explore the edges of the graph
by using queries to get the needed data. These queries must respect the
structure of the schema.

A **node**, followed by its **fields**, is at the core of a GraphQL query. A
node is an object of a specific **type**; the type specifies the fields that
make up the object.

A field can be another node where the appropriate query would contain nested
elements. Some nodes look like functions that can take on arguments to limit the
scope of what they can act on. You can apply filters at each node.

## Cloudflare GraphQL schema

A typical query against the Cloudflare GraphQL schema is made up of four main
components:

* `viewer` - is the root node,
* `zones` or `accounts` - indicate the scope of the query, that is the domain
  area or account you want to query. The `viewer` can access one `zones` or
  `accounts`, or both,
* **data node** or **dataset** - represent the data you want to query. `zones`
  or `accounts` may contain one or more datasets. To find out more about
  discovering nodes, please refer to [introspection][1],
* **fieldset** - a set of fields or nested fields of the **dataset**.

The query to Cloudflare GraphQL API must be sent over HTTP POST request with
payload in JSON format that consists of these fields:

```json
{
  "query": "",
  "variables": {}
}
```

From the above structure, the `query` field must contain a GraphQL query
formatted as a **single line** string (meaning all newline symbols should be
stripped / escaped), when `variables` is an object that contains all values of
used placeholders in the query itself.

## A single dataset example

In the following example, the GraphQL query fetches a `datetime`, `action`, and
client request HTTP host as `host` field of 2 WAF events from zone-scoped
`firewallEventsAdaptive` dataset.

```graphql
---
header: A GraphQL query
---
{
  viewer {
    zones(filter: { zoneTag: $tag }) {
      firewallEventsAdaptive(
        filter: {
          datetime_gt: $start
          datetime_lt: $end
        }
        limit: 2
        orderBy: [
          datetime_DESC
        ]
      ) {
        action
        datetime
        host: clientRequestHTTPHost
      }
    }
  }
}
```

In the query above, we have variable placeholders: $tag, $start, and $end. We
provide values for those placeholders alongside the query by placing them into
`variables` field of the payload.

```json
---
header: A set of variables
---
{
  "tag": "<zone-tag>",
  "start": "2020-08-03T02:07:05Z",
  "end": "2020-08-03T17:07:05Z"
}
```

There are multiple ways to send your query to Cloudflare GraphQL API. You can
use you favourite GraphQL client or CLI to send a request via curl. We have a
[how-to guide][2] about using GraphiQL client, also check a guide on how to
execute a query with a curl [here][3].

```json
---
header: A sample of a response for a query above
---
{
  "data": {
    "viewer": {
      "zones": [
        {
          "firewallEventsAdaptive": [
            {
              "action": "log",
              "host": "cloudflare.guru",
              "datetime": "2020-08-03T17:07:03Z"
            },
            {
              "action": "log",
              "host": "cloudflare.guru",
              "datetime": "2020-08-03T17:07:01Z"
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```

## Query multiple datasets in a single GraphQL API request

As previously mentioned, a query might contain one or multiple nodes (datasets).
At the API level, the data extraction would be done simultaneously, but the
response would be delayed until all dataset queries got their results. If any
fails during the execution, the entire query will be terminated, and the error
will be returned.

```graphql
---
header: A sample query for two datasets in a one go
---
{
  viewer {
    zones(filter: { zoneTag: $tag }) {
      last10Events: firewallEventsAdaptive(
        filter: {
          datetime_gt: $start
          datetime_lt: $end
        }
        limit: 10
        orderBy: [
          datetime_DESC
        ]
      ) {
        action
        datetime
        host: clientRequestHTTPHost
      }
      top3DeviceTypes: httpRequestsAdaptiveGroups(
        filter: {
          date: $ts
        }
        limit: 10
        orderBy: [
          count_DESC
        ]
      ) {
        count
        dimensions {
          device: clientDeviceType
        }
      }
    }
  }
}
```

```json
---
header: A set of variables for the query above
---
{
  "tag": "<zone-tag>",
  "start": "2022-10-02T00:26:49Z",
  "end": "2022-10-04T14:26:49Z",
  "ts": "2022-10-04"
}
```

```json
---
header: A sample response for the query with variables above
---
{
  "data": {
    "viewer": {
      "zones": [
        {
          "last10Events": [
            {
              "action": "block",
              "country": "TR",
              "datetime": "2022-10-04T08:41:09Z"
            },
            {
              "action": "block",
              "country": "TR",
              "datetime": "2022-10-04T08:41:09Z"
            },
            {
              "action": "block",
              "country": "RU",
              "datetime": "2022-10-04T01:09:36Z"
            },
            {
              "action": "block",
              "country": "US",
              "datetime": "2022-10-03T14:26:49Z"
            },
            {
              "action": "block",
              "country": "US",
              "datetime": "2022-10-03T14:26:46Z"
            },
            {
              "action": "block",
              "country": "CN",
              "datetime": "2022-10-02T23:51:26Z"
            },
            {
              "action": "block",
              "country": "TR",
              "datetime": "2022-10-02T23:39:41Z"
            },
            {
              "action": "block",
              "country": "TR",
              "datetime": "2022-10-02T23:39:41Z"
            }
          ],
          "top3DeviceTypes": [
            {
              "count": 4580,
              "dimensions": {
                "device": "desktop"
              }
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```

## Helpful Resources

Here are some helpful articles about working with the Cloudflare Analytics API and GraphQL.

### Cloudflare specific

* [Understanding the Cloudflare dashboard][4]
* [How to find your zoneTag using the API][5]

### General info on the GraphQL framework

* [How to use GraphQL (tutorials)][6]
* [Thinking in Graphs][7]
* [What data can you can query in the GraphQL type system (schemas)][8]
* [How to pass variables in GraphiQL (Medium article with quick tips)][9]

[1]: </analytics/graphql-api/features/discovery/introspection/>
[2]: </analytics/graphql-api/getting-started/compose-graphql-query/>
[3]: </analytics/graphql-api/getting-started/execute-graphql-query/>
[4]: <https://support.cloudflare.com/hc/en-us/articles/205075117-Understanding-the-Cloudflare-dashboard>
[5]: </fundamentals/get-started/basic-tasks/find-account-and-zone-ids/>
[6]: <https://www.howtographql.com/>
[7]: <https://graphql.org/learn/thinking-in-graphs/>
[8]: <https://graphql.org/learn/schema/>
[9]: <https://medium.com/graphql-mastery/graphql-quick-tip-how-to-pass-variables-into-a-mutation-in-graphiql-23ecff4add57>
