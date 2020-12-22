---
title: Use GraphQL to create widgets
order: 45
---

# Use GraphQL to create widgets

This article presents examples of queries you can use to populate your own dashboard.

* [Timeseries graph](#timeseries-graph)
* [Activity log](#activity-log)
* [Top N cards - source](#top-n-cards---source)
* [Top N cards - destination](#top-n-cards---destination)
* [TCP flags](#tcp-flags)
* [Executive summary](#executive-summary)

Use the following workflow to build and test queries:

* Configure a GraphQL client with the Cloudflare GraphQL endpoint and your authorization information. Cloudflare recommends token authentication. _[Configure an Analytics API token](/graphql-api/getting-started/authentication/api-token-auth/)_ outlines how to create authentication tokens for the GraphQL Analytics API.
* Construct the queries in the GraphQL client. You can use the introspective documentation in the GraphQL client to explore the nodes available. For further information about queries, refer to  _[Querying basics](/graphql-api/getting-started/querying-basics/)_.
* Once you have constructed your queries, test them by running them from the GraphiQL client or by passing them as the payload in a cURL request to the GraphQL API endpoint. _[Querying Firewall Events with GraphQL](/graphql-api/tutorials/querying-firewall-events)_ presents an example of running a query using `curl`.
* Use the queries to configure the widgets that you want in your dashboard.

## Parameters and filters

These examples use the account ID for the Cloudflare account that you are querying. You can define this as a variable (`accountTag`) and reference it in your queries.

The queries also use a filter to specify the time interval that you want to query. The filter uses a start time and end time to define the time interval. You use different attributes to specify the start and end times, depending on the time period that you want to query. Refer to  _[Filtering](/graphql-api/features/filtering)_ for further information about filters.

The following code shows the settings for a query against an account for data recorded on dates greater than or equal to `date_geq` and less then or equal to `date_leq`: 

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

This table lists the node names for the Network Analytics data sets that you can query. These represent the time ranges that you are interested in. Query nodes with the `Groups` suffix are rollups of aggregated data in a time interval. For more information about aggregated data sets, see _[Data Sets (tables)](/graphql-api/features/data-sets)_.

When you want an aggregated view of data, use the Groups query nodes. For example, the ipFlows1mAttacksGroups data set represents minute-wise rollup reports of attack activity. _[Available data sets](/graphql-api/features/data-sets#available-data-sets)_ lists the data sets (and associated nodes) available in Cloudflare Analytics.

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

This query returns an activity log summarizing minute-wise rollups of attack traffic in IP flows, and grouping the data by the fields listed in the `dimensions` field.

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

The executive summary query summarizes overall activity, therefore it only filters by the selected time range, and ignores all filters applied to the analytics.
This section makes different queries, depending on the time range selected and what kind of traffic the account is seeing.
If the time interval is absolute, for example March 25th 09:00 to March 25th 17:00, the query returns data about attacks within that time period. The query node that you need to use depends on the time range.

```json
---
header: Executive summary query
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

If the time interval is relative to the current time, for example, the last 24 hours or the last 30 minutes
First make a query to the ipFlows1mGroup node to check whether there were attacks in the past 5 minutes. Attacks within the previous 5 minutes are classed as ongoing or `Present` in the Activity Log. The response lists the `attackID` values of ongoing attacks.

```json
---
header: Query to check for ongoing attacks
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

If there are ongoing attacks, query the `ipFlows1mAttacksGroups` table, filtering with the `attackID` values from the previous query, showing the maximum bit/packet rate in the summary.

```json
---
header: Query to display the max bit/packet rate in an angoing attack
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

If there are no ongoing attacks, use the `GetPreviousAttacks` node, with an absolute time range, to query for any traffic in the time range.
