---
title: Explore the GraphQL schema
order: 40
---

# Explore the GraphQL schema in the GraphQL client

You can explore the schema of the Coudflare GraphQL endpoint in the the GraphQL client. The examples below use the GraphiQL client.

Before you begin, configure the API endpoint and HTTP headers in the GraphQL client.

Click **Docs** to open the _Documentation Explorer_ pane.

A list of available nodes displays. The nodes in the list follow this syntax:

```
node-name: node-type-definition
```

Click on the _type definition_ of a node to view the fields that it provides. The _Documentation Explorer_ pane also displays descriptions of the nodes.

When you first open the _Documentation Explorer_ pane, the **mutation** and **query** nodes display:

![Mutation and query nodes](../../static/images/docs-query.png)

* **query** is the name of the node.
* **Query** is the type definition of the node.

Click the **Query** type definition. The _Documentation Explorer_ panel displays the fields that the **query** node provides: **cost** and **viewer**.

![Cost and viewer fields](../../static/images/docs-viewer.png)

Click on the type definition of **viewer** to list the fields of the **viewer** node. The **viewer** node fields include nodes that allow you to query **accounts** or **zones** data:

![viewer fields](../../static/images/docs-zone-filter.png)

The **accounts** and **zones** nodes take arguments to specify what data set to query.
For the **zones** node you can provide a **filter** of **ZoneFilter_InputObject** type. To view the fields to specify in the filter, click **ZoneFilter_InputObject**.

To limit the amount of search results that the query returns, click **limit**.

To view a list of the fields within a zone, click on the **zones** type definition after the colon in the **zones** field:

![Zones type definition](../../static/images/docs-zone.png)

A list of _search nodes_ appears, with a brief description of their behavior and a list of valid arguments.
Arguments that end with an exclamation mark ("!") are required.

![Search nodes](../../static/images/docs-fw-data-set.png)

Refer to [Data Sets (tables)](/graphql-api/features/data-sets) for details on nomenclature and behavior of these nodes.

To view the fields that a node provides, click on its type definition. If you click on the **ZoneFirewallEventsAdaptive** type definition in the  **firewallEventsAdaptive** node, a list of fields is displayed:

![ZoneFirewallEventsAdaptive type definition](../../static/images/docs-fw-fields-list.png)
