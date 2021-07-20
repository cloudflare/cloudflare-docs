---
order: 45
pcx-content-type: interim
---

# Use GraphQL to create widgets

This article presents examples of queries you can use to populate your own dashboard.

- [Use GraphQL to create widgets](#use-graphql-to-create-widgets)
  - [Parameters and filters](#parameters-and-filters)
  - [Timeseries graph](#timeseries-graph)
  - [Activity log](#activity-log)
  - [Top N cards - source](#top-n-cards---source)
  - [Top N cards - destination](#top-n-cards---destination)
  - [TCP Flags](#tcp-flags)
  - [Executive summary](#executive-summary)

Use this workflow to build and test queries:

* Install and configure the [GraphiQL](https://www.electronjs.org/apps/graphiql) app to authenticate to the Cloudflare Analytics GraphQL API. Cloudflare recommends token authentication. (See _[Configure an Analytics API token](/graphql-api/getting-started/authentication/api-token-auth/)_.)
* Construct the queries in the GraphiQL. You can use the introspective documentation in the GraphQL client to explore the nodes available. For further information about queries, refer to  _[Querying basics](/graphql-api/getting-started/querying-basics/)_.
* Test your queries by running them from GraphiQL or by passing them as the payload in a cURL request to the GraphQL API endpoint.
* Use the queries in your application to provide data for your dashboard widgets.

## Parameters and filters

These examples use the account ID for the Cloudflare account that you are querying. You can define this as a variable (`accountTag`) and reference it in your queries.

The queries also use a filter to specify the time interval that you want to query. The filter uses a start time and end time to define the time interval. You use different attributes to specify the start and end times, depending on the time period that you want to query. Refer to  _[Filtering](/graphql-api/features/filtering)_ for further information about filters.

The following example queries for data with dates greater than or equal to `date_geq` and less than or equal to `date_leq`:

```json
---
header: Account and query time interval settings
---
{
  "accountTag": "{account-id}",
  "filter": {
    "AND":[
      {"date_geq": "2020-01-19"},
      {"date_leq": "2020-01-20"}
    ]
  }
}
```

This table lists Network Analytics data sets (nodes) and the `datetimeDimension` that you should use when querying data for a given time selection.

When you want an aggregated view of data, use the `Groups` query nodes. For example, the `ipFlows1mAttacksGroups` data set represents minute-wise rollup reports of attack activity. For more detail, see [_Data sets_](/graphql-api/features/data-sets).

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Time Selection</strong>
   </th>
   <th><strong>Query node</strong>
   </th>
   <th><strong>datetimeDimension</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td>Last week</td>
   <td>ipFlows1dGroups</td>
   <td>date</td>
  </tr>
  <tr>
   <td>Last month</td>
   <td>ipFlows1dGroups</td>
   <td>date</td>
  </tr>
  <tr>
   <td>24 hours</td>
   <td>ipFlows1mGroups</td>
   <td>datetimeFifteenMinutes</td>
  </tr>
  <tr>
   <td>12 hours</td>
   <td>ipFlows1mGroups</td>
   <td>datetimeFifteenMinutes</td>
  </tr>
  <tr>
   <td>6 hours</td>
   <td>ipFlows1mGroups</td>
   <td>datetimeFiveMinutes</td>
  </tr>
  <tr>
   <td>30 mins</td>
   <td>ipFlows1mGroups</td>
   <td>datetimeMinute</td>
  </tr>
  <tr>
   <td>Custom range</td>
   <td>Dependent on range selected</td>
   <td>Dependent on range selected</td>
  </tr>
  </tbody>
</table>

</TableWrap>

The table below lists the start and end time attributes that are valid for query nodes representing different time ranges.

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Query node</strong>
   </th>
   <th><strong>Start day / time filter</strong>
   </th>
   <th><strong>End day / time filter</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td>ipFlows1mGroups</td>
   <td>datetimeMinute_geq</td>
   <td>datetimeMinute_leq</td>
  </tr>
  <tr>
   <td>ipFlows1mAttacksGroups</td>
   <td>date_geq</td>
   <td>date_leq</td>
  </tr>
  <tr>
   <td>ipFlows1hGroups</td>
   <td>datetimeHour_geq </td>
   <td>datetimeHour_leq</td>
  </tr>
  <tr>
   <td>ipFlows1dGroups</td>
   <td>date_geq</td>
   <td>date_leq</td>
  </tr>
  </tbody>
</table>

</TableWrap>

## Timeseries graph

Use the following query to build the timeseries graph in network analytics:

```json
---
header: Timeseries graph
---
query ipFlowTimeseries(
    $accountTag: string
    $filter: AccountIpFlows1mGroupsFilter_InputObject
  ) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        ipFlows1mGroups(
          limit: 1000
          filter: $filter
          orderBy: datetimeMinute_ASC
        ) {
          dimensions {
            timestamp: datetimeMinute
            attackMitigationType
            attackId
          }
          sum {
            bits
            packets
          }
        }
      }
    }
  }
```

## Activity log

This query returns an activity log summarizing minute-wise rollups of attack traffic in IP flows. The query groups the data by the fields listed in the `dimensions` object.

```json
---
header: Activity log query
---
query ipFlowEventLog(
    $accountTag: string
    $filter: AccountIpFlows1mAttacksGroupsFilter_InputObject
  ) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        ipFlows1mAttacksGroups(
          limit: 10
          filter: $filter
          orderBy: [min_datetimeMinute_ASC]
        ) {
          dimensions {
            attackId
            attackDestinationIP
            attackDestinationPort
            attackMitigationType
            attackSourcePort
            attackType
          }
          avg {
            bitsPerSecond
            packetsPerSecond
          }
          min {
            datetimeMinute
            bitsPerSecond
            packetsPerSecond
          }
          max {
            datetimeMinute
            bitsPerSecond
            packetsPerSecond
          }
          sum {
            bits
            packets
          }
        }
      }
    }
  }

```

## Top N cards - source

This query returns data about the top source IPs.
The `limit` parameter controls the amount of records returned for each node. In the following code, the highlighted lines indicate where you configure `limit`.

```json
---
header: Top N Cards query
highlight: [9,22,35,47,60,72]
---
query GetTopNBySource(
    $accountTag: string
    $filter: AccountIpFlows1mGroupsFilter_InputObject
    $portFilter: AccountIpFlows1mGroupsFilter_InputObject
  ) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        topNPorts: ipFlows1mGroups(
        limit: 5
        filter: $portFilter
        orderBy: [sum_(bits/packets)_DESC]
      ) {
        sum {
          count: (bits/packets)
        }
        dimensions {
          metric: sourcePort
          ipProtocol
        }
      }
      topNASN: ipFlows1mGroups(
        limit: 5
        filter: $filter
        orderBy: [sum_(bits/packets)_DESC]
      ) {
        sum {
          count: (bits/packets)
        }
        dimensions {
          metric: sourceIPAsn
          description: sourceIPASNDescription
        }
      }
        topNIPs: ipFlows1mGroups(
        limit: 5
        filter: $filter
        orderBy: [sum_(bits/packets)_DESC]
      ) {
        sum {
          count: (bits/packets)
        }
        dimensions {
          metric: sourceIP
        }
      }
        topNColos: ipFlows1mGroups(
          limit: 10
          filter: $filter
          orderBy: [sum_(bits/packets)_DESC]
        ) {
          sum {
            count: (bits/packets)
          }
          dimensions {
            metric: coloCity
            coloCode
          }
        }
        topNCountries: ipFlows1mGroups(
          limit: 10
          filter: $filter
          orderBy: [sum_(bits/packets)_DESC]
        ) {
          sum {
            count: (bits/packets)
          }
          dimensions {
            metric: coloCountry
          }
        }
        topNIPVersions: ipFlows1mGroups(
          limit: 2
          filter: $filter
          orderBy: [sum_(bits/packets)_DESC]
        ) {
          sum {
            count: (bits/packets)
          }
          dimensions {
            metric: ipVersion
          }
        }
      }
    }
  }

```

## Top N cards - destination

This query returns data about the top destination IPs. The `limit` parameter controls the amount of records returned. In the following code, the highlighted lines indicate that the query returns the five highest results.

```json
---
header: Top N Cards - Destination
highlight: [10,22]
---
query GetTopNByDestination(
    $accountTag: string
    $filter: AccountIpFlows1mGroupsFilter_InputObject
    $portFilter: AccountIpFlows1mGroupsFilter_InputObject
  ) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        topNIPs: ipFlows1mGroups(
          filter: $filter
          limit: 5
          orderBy: [sum_(bits/packets)_DESC]
        ) {
          sum {
            count: (bits/packets)
          }
          dimensions {
            metric: destinationIP
          }
        }
        topNPorts: ipFlows1mGroups(
          filter: $portFilter
          limit: 5
          orderBy: [sum_(bits/packets)_DESC]
        ) {
          sum {
            count: (bits/packets)
          }
          dimensions {
            metric: destinationPort
            ipProtocol
          }
        }
      }
    }
  }
```

## TCP Flags

This query extracts the number of TCP packets from the minute-wise rollups of IP flows, and groups the results by TCP flag value. It uses `limit: 8` to display the top eight results, and presents them in descending order.

Add the following line to the filter to indicate that you want to view TCP data:

```json
{ ipProtocol: 'TCP' }
```

```json
---
header: TCP Flags query
---
query GetTCPFlags(
    $accountTag: string
    $filter: AccountIpFlows1mGroupsFilter_InputObject
  ) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        tcpFlags: ipFlows1mGroups(
          filter: $filter
          limit: 8
          orderBy: [sum_(bits/packets)_DESC]
        ) {
          sum {
            count: (bits/packets)
          }
          dimensions {
            tcpFlags
          }
        }
      }
    }
  }
```

## Executive summary

The executive summary query summarizes overall activity, therefore it only filters by the selected time interval, and ignores all filters applied to the analytics.
Use different queries, depending on the time interval you want to examine and what kind of traffic the account is seeing.

If the time interval is absolute, for example March 25th 09:00 to March 25th 17:00, then execute a query for attacks within those times. [Use the appropriate query node](#parameters-and-filters), for example `ipFlows1dGroups`, for the time interval.

```json
---
header: GetPreviousAttacks query - fetch previous attacks
---
query GetPreviousAttacks($accountTag: string, $filter: filter) {
  viewer {
    accounts(filter: {accountTag: $accountTag}) {
      ${queryNode}(limit: 1000, filter: $filter) {
        dimensions {
          attackId
        }
        sum {
          packets
          bits
        }
      }
    }
  }
}
```

If the time interval is relative to the current time, for example the last 24 hours or the last 30 minutes, then make a query to the `ipFlows1mGroup` node to check whether there were attacks in the past five minutes. Attacks within the past five minutes are classed as ongoing: the Activity Log displays `Present`.
The query response lists the `attackID` values of ongoing attacks.

```json
---
header: GetOngoingAttackIds query - check for ongoing attacks
---
query GetOngoingAttackIds($accountTag: string, $filter: filter) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        ipFlows1mGroups(limit: 1000, filter: $filter) {
          dimensions {
            attackId
          }
        }
      }
    }
  }
```

If there are ongoing attacks, query the `ipFlows1mAttacksGroups` node, filtering with the `attackID` values from the previous query. The query below returns the maximum bit and packet rates.

```json
---
header: GetOngoingAttacks query - fetch data for ongoing attacks
---
query GetOngoingAttacks($accountTag: string, $filter: filter) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        ipFlows1mAttacksGroups(limit: 1000, filter: $filter) {
          dimensions {
            attackId
          }
          max {
            bitsPerSecond
            packetsPerSecond
          }
        }
      }
    }
  }
```

If there are no ongoing attacks, use the `GetPreviousAttacks` query to display data for attacks within an absolute time interval.
