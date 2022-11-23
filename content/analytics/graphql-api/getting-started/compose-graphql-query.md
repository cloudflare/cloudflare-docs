---
pcx_content_type: how-to
title: Compose a query in GraphiQL
weight: 51
---

# Compose a query in GraphiQL

Many clients might need help using [the semantics][1] of GraphQL and exploring
the possibilities of Cloudflare GraphQL API.

This page details how to use a [GraphiQL client][2] to compose and execute a
GraphQL query.

## Prerequisites

You can find all details on how to [configure][3] a client here.

## Set up a query and choose a dataset

Click on the editing pane of GraphiQL and add this base query, replacing
`zone-id` with your Cloudflare zone ID:

![Adding a base query in the GraphiQL pane][4]

{{<Aside type="note" header="Note">}}

To find the zone's tag, log in to your Cloudflare account and click the site for
which you want to obtain the tag. In the Cloudflare dashboard **Overview** page,
scroll to the **API** section in the right sidebar, which displays your zone and
account tags.

{{</Aside>}}

To assist query building, the GraphiQL client has word completion. Insert your
cursor in the query, in this case on the line below `zones`, and start entering
a value to engage the feature. For example, when you type `firewall`, a popup
menu displays the datasets that return firewall information:

![GraphiQL word completion assistant to query building][5]

The text at the bottom of the list displays a short description of the data that
the node returns.

Select the dataset you want to query and insert it. Either click the item in the
list, or scroll using arrow keys and press <kbd>Return</kbd>.

## Supply required parameters

Hover your mouse over a field to display a tooltip that describes the dataset.
In this example, hovering over the `firewallEventsAdaptive` node displays this
description:

![Hovering the mouse over a field to display its description][6]

To display information about the dataset, including required parameters, click
the dataset name (blue text). The **Documentation Explorer** opens and displays
details about the dataset:

![Documentation Explorer window displaying dataset details][7]

Note that the `filter` and `limit` arguments are required, as indicated by the
exclamation mark (`!`) after their type definitions (gold text). In this
example, the `orderBy` argument is not required, though when used it requires a
value of type `ZoneFirewallEventsAdaptiveOrderBy`.

To browse a list of supported filter fields, click the filter type definition
(gold text) in the Documentation Explorer. In this example, the type is
`ZoneFirewallEventsAdaptiveFilter_InputObject`:

![Browsing GraphiQL filter fields][8]

This example query shows the required `filter` and `limit` arguments for
`firewallEventsAdaptive` (as well as for the rest of GraphQL nodes):

![Example of GraphiQL query arguments][9]

## Define the fields used by your query

To browse the fields you can use with your query, hover your cursor over the
dataset name in your query, and in the tooltip that displays, click the data
type definition (gold text):

![Hovering the mouse over a dataset to display available fields][10]

**The Documentation Explorer** opens and displays a list of fields:

![Documentation Explorer window displaying list of fields][11]

To add the data fields that you want to read, type an opening brace (`{`) after
the closing parenthesis for the parameters, then start typing the name of a
field that you want to fetch. Use word completion to choose a field.

This example query returns the `action`, `datetime`, `clientRequestHTTPHost`,
and `userAgent` fields:

![Example query with return fields][12]

Once you have entered all the fields you want to query, click the **Play**
button to submit the query. The response pane will contain the data fetched from
the configured GraphQL API endpoint:

![GraphiQL response pane][13]

## Variable substitution

The GraphiQL client allows you to use placeholders for value and supply them via
the `variables` part of the payload.

Placeholder names should start with `$` character, and you do not need to wrap
placeholders in quotes when you use them in the query.

Values for placeholders should be provided in JSON format, in which placeholders
are addressed without `$` character. As an example, for a placeholder `$zoneTag`
GraphQL API will read a value from the `zoneTag` field of supplied variables
object.

To supply a value for a placeholder, click the **Query Variables** pane and edit
a JSON object that defines your variables.

This example query uses the `zoneTag` query variable to represent the zone ID:

![Example of GraphiQL query variables][14]

[1]: </analytics/graphql-api/getting-started/querying-basics/>
[2]: <https://github.com/graphql/graphiql/tree/main/packages/graphiql#readme>
[3]: </analytics/graphql-api/getting-started/authentication/graphql-client-headers/>
[4]: </analytics/static/images/graphiql-base-query.png>
[5]: </analytics/static/images/graphiql-word-completion.png>
[6]: </analytics/static/images/graphiql-set-up-base-query.png>
[7]: </analytics/static/images/graphiql-parameters.png>
[8]: </analytics/static/images/graphiql-filter-fields.png>
[9]: </analytics/static/images/graphiql-filter-values.png>
[10]: </analytics/static/images/graphiql-set-up-base-query.png>
[11]: </analytics/static/images/graphiql-return-fields.png>
[12]: </analytics/static/images/graphiql-query-return-field-values.png>
[13]: </analytics/static/images/create-query-fw-data-set-play.png>
[14]: </analytics/static/images/graphiql-query-variables.png>
