---
pcx_content_type: how-to
title: Explore the GraphQL schema
weight: 41
---

# Explore the GraphQL schema

Many GraphQL clients are support browsing GraphQL schema by taking care of
[introspection][1]. In this page, we will cover GraphiQL and Altair clients.

[GraphiQL][2] and [Altair][3] are open-source GraphQL clients that provide a
descent tool to compose a query, execute it, and inspect the results. And as a
bonus, they also allow you to browse GraphQL schema.

## Prerequisites

Before you begin, do not forget to [configure][4] the API endpoint and HTTP
headers.

The screenshots below are done from GraphiQL. However, Altair provides the same
functionality and you will not find any difficulties following the same
instructions to explore the schema.

## Open the Documentation Explorer

To open the GraphiQL Documentation Explorer, click the **Docs** link in the
header of the response pane:

![Clicking GraphiQL Docs link to open Documentation Explorer][5]

The **Documentation Explorer** opens and displays a list of available objects:

![GraphiQl Doc Explorer pane][6]

Objects in the **Documentation Explorer** use this syntax:

```txt
  object-name: object-type-definition
```

## Find the type definition of an object

When you first open the **Documentation Explorer** pane, the `mutation` and
`query` root types display:

![Documentation Explorer displaying mutation and query nodes][7]

In this example, `query` is the name of a root, and `Query` is the type
definition.

## Find the fields available for a type definition

Click on the **type definition** of a node to view the fields that it provides.
The **Documentation Explorer** also displays descriptions of the nodes.

For example, click the **Query** type definition. The **Documentation Explorer**
displays the fields that `Query` provides. In this example, the fields are
`cost` and `viewer`:

![Documentation Explorer displaying cost and viewer fields][8]

To explore the schema, click the names of objects and definitions. You can also
use the search input (magnifying glass icon) and breadcrumb links in the header.

## Find the arguments associated with a field

Click the type definition of the `viewer` field (gold text) to list its
sub-fields. The `viewer` field provides sub-fields that allow you to query
`accounts` or `zones` data:

![Displaying viewer fields][9]

The `accounts` and `zones` nodes take arguments to specify which dataset to
query.

For example, `zones` can take a filter of `ZoneFilter_InputObject` type as an
argument. To view the fields available to filter, click
**ZoneFilter_InputObject**.

## Find the datasets available for a zone

To view a list of the datasets available to query, click the **zone** type
definition (gold text):

![Clicking zone type definition][10]

A list of datasets displays in the **Fields** section, each with list of valid
arguments and a brief description. Arguments that end with an exclamation mark
(`!`) are required.

![Fields section displaying datasets available][11]

Use the search input (magnifying glass icon) to find specific datasets:

![Searching a dataset in the Documentation Explorer][12]

To select a dataset, click its name.

The definition for the dataset displays. This example shows the
`firewallEventsAdaptive` dataset:

![Example of a dataset definition][13]

## Find the fields available for a dataset

To view the fields available for a particular dataset, click on its type
definition (gold text).

For example, click the **ZoneFirewallEventsAdaptive** type definition to view
the fields available for the `firewallEventsAdaptive` dataset:

![Clicking type definition to visualize fields available for a dataset][14]

The list of fields displays:

![Displaying available fields for a dataset][15]

For more information on using GraphiQL, please visit this [guide][16].

[1]: </analytics/graphql-api/features/discovery/introspection/>
[2]: <https://github.com/graphql/graphiql/tree/main/packages/graphiql#readme>
[3]: <https://altairgraphql.dev/#download>
[4]: </analytics/graphql-api/getting-started/authentication/graphql-client-headers/>
[5]: </analytics/static/images/graphiql-docs-link.png>
[6]: </analytics/static/images/graphiql-doc-explorer.png>
[7]: </analytics/static/images/graphiql-doc-explorer-query-mutations.png>
[8]: </analytics/static/images/graphiql-doc-explorer-view-cost.png>
[9]: </analytics/static/images/graphiql-doc-explorer-viewer-fields.png>
[10]: </analytics/static/images/graphiql-doc-explorer-zones.png>
[11]: </analytics/static/images/graphiql-doc-explorer-zone-fields.png>
[12]: </analytics/static/images/graphiql-doc-explorer-find-firewall.png>
[13]: </analytics/static/images/graphiql-doc-explorer-firewallevents-definition.png>
[14]: </analytics/static/images/graphiql-doc-explorer-firewall-type-definition.png>
[15]: </analytics/static/images/graphiql-doc-explorer-firewall-fields.png>
[16]: </analytics/graphql-api/getting-started/compose-graphql-query/>
