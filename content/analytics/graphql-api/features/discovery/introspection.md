---
pcx_content_type: reference
title: Introspection
weight: 41
---

# Introspection

Cloudflare GraphQL API has a dynamic schema. We expose more than 70 datasets
across zone and account scopes and constantly expand the list. We also deprecate
datasets to replace existing datasets with more capable alternatives.

To tackle the schema question, GraphQL provides an [introspection][1] mechanism.
It is part of GraphQL specification and allows you to explore the graph of the
datasets and fields.

The introspection results provide an overview of ALL available nodes and fields,
their descriptions and deprecation status.

Although GraphQL has `query`, `subscription`, and `mutation` operations,
Cloudflare GraphQL API supports only `query` operation.

## Description and Beta mode

With details on data exposed by a given node or a field, descriptions also
indicate whether it's in the Beta mode or not. Beta nodes are for testing and
exploration and are usually available for customers on more extensive plans.
Please do not rely on beta data nodes since they are subject to change or
removal without notice.

## Deprecation

Introspection provides information about deprecation status. We use it as a
notification about replacement plans. If the sunset date is provided, please
migrate to a replacement node(s) before that date to avoid disruption.

## Availability

Some of the nodes might only be available to query for some users. Please refer
to the [settings][2] node to get a comprehensive picture of availability and
personal limits on a given node.

## Explore documentation

The most convenient way to introspect the schema is to use a documentation
[explorer][3] that usually is a part of a GraphQL client (like GraphiQL, Altair,
etc).

Alternatively, you can do it manually by using `__schema` node with needed
directives.

```graphql
---
header: A typical introspection query
---
{
  __schema {
    queryType { name }
    mutationType { name }
    subscriptionType { name }
    types {
        ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}
fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
fragment InputValue on __InputValue {
  name
  description
  type { ...TypeRef }
  defaultValue
}
fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}
```

To get more details on how to send a GraphQL request with curl, please check
[this guide][4].

[1]: <https://graphql.org/learn/introspection/>
[2]: </analytics/graphql-api/features/discovery/settings/>
[3]: </analytics/graphql-api/getting-started/explore-graphql-schema/>
[4]: </analytics/graphql-api/getting-started/execute-graphql-query/>
