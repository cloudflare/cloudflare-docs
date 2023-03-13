---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360038696631-Understanding-Cloudflare-Network-Analytics-v1
title: Understanding Cloudflare Network Analytics v1
---

# Understanding Cloudflare Network Analytics v1

## Overview

Access to Network Analytics requires the following:

-   A Cloudflare Enterprise plan
-   Cloudflare [Magic Transit](/magic-transit/) or [Spectrum](/spectrum/).

Cloudflare’s **Network Analytics** view provides near real-time visibility into network- and transport-layer traffic patterns and DDoS attacks. Network Analytics visualizes packet and bit-level data, the same data available via the [GraphQL Analytics API](/analytics/graphql-api/).

{{<Aside type="note">}}
-   **The Network Analytics v2 (NAv2) dashboard is now available.** For
    more information, refer to [Cloudflare Network
    Analytics](/analytics/network-analytics/)
    in the developer documentation.
-   There is also new version of the Network Analytics GraphQL API. If
    you are still using NAv1, you should migrate from NAv1 to NAv2 by
    following the [migration
    guide](/analytics/graphql-api/migration-guides/network-analytics-v2/).
{{</Aside>}}

![Analytics panel showing packets summary per type](/support/static/na-main-dashboard.png)

Network Analytics accelerates reporting and investigation of malicious traffic. You can filter data by these parameters:

-   Mitigation action taken by Cloudflare
-   Source IP, port, ASN
-   Destination IP and port
-   The Cloudflare data center city and country of where the traffic was observed
-   Attack size, type, rate, and duration
-   TCP flag 
-   IP version
-   Protocol

Use Network Analytics to quickly identify key intelligence:

-   Top attack vectors targeting the network 
-   Traffic mitigation over time, broken down by action 
-   Attack source, by country or data center

___

You can access the **Network Analytics** view from your Cloudflare account’s Home page.

To access the **Network Analytics** view, follow these steps:

1.  Log in to your Cloudflare account.
2.  If you have multiple accounts, select an account that has access to Magic Transit or Spectrum.
3.  On the account’s **Home** page, click **Network Analytics**.

{{<Aside type="note">}}
Source IPs are stored for 30 days. Report periods older than 30 days do
not include source IP data.
{{</Aside>}}

___

## Navigate Network Analytics

### Headline summary and side panels

The headline and the side panels provide a summary of activity over the period selected in the **timeframe** drop-down list.

![Headline and side panel summarizing activity over the last 24 hours](/support/static/na-navigate.png)

The headline provides the total packets or bits and the number of attacks detected and mitigated. When there is an attack in progress, the headline displays the maximum rate of packets (or bits) rather than the total count.

To toggle your view of the data, click the **Packets** or **Bits** side panels.

### Set the timeframe for the view

Use the **timeframe** drop-down list to change the time range over which Network Analytics displays data. When you select a timeframe, the entire view is updated to reflect your choice.

When you select _Last 30 minutes_, the **Network Analytics** view displays the data from the last 30 minutes, refreshing every 20 seconds. A _Live_ notification appears next to the statistic drop-down list to let you know that the view keeps updating automatically:

![Auto-refresh enabled in Network Analytics](/support/static/hc-dash-Network_Analytics-auto_refresh.png)

When you select the _Custom range_ option, you can specify a time range of up to 30 days throughout any period during the last 365 days.

### View by average rate or total volume 

Choose a statistic from the drop-down list to toggle between plotting _Average rate_ and _Total count_. 

### Show IP prefix advertisement/withdrawal events

Enable the **Show annotations** toggle to show or hide annotations for advertised/withdrawn IP prefix events in the **Network Analytics** view. Click each annotation to get more details.

![Toggle button for displaying annotations in Network Analytics chart](/support/static/hc-dash-Network_Analytics-show_annotations.png)

### Zoom into the Packets summary 

Click and drag your mouse on a region of the chart to zoom in. Using this technique you can zoom into a time range as short as 3 minutes.

![Zooming into the Packets summary ](/support/static/unnamed.gif)

To zoom out, click the **X** icon in the **time range** selector.

___

## Apply filters to data

You can apply multiple filters and exclusions to adjust the scope of the data displayed in Network Analytics.

Filters affect all of the data displayed in the Network Analytics page.

There are two ways to filter Network Analytics data—use the **Add filter** button or click on one of the **stat filters**.

### Use the Add filter button

Click the **Add filter** button to open the **New filter** popover. Specify a field, an operator, and a value to complete your filter expression. Click **Apply** to update the view.

When applying filters, observe these guidelines:

-   Wildcards are not supported.
-   You do not need to wrap values in quotes.
-   When specifying an ASN number, leave out the _AS_ prefix. For example, enter _1423_ instead of _AS1423_.

### Use a stat filter

To filter based on the type of data associated with one of the Network Analytics stats, use the **Filter** and **Exclude** buttons that display when you hover your pointer over the stat. 

In this example, clicking the **Filter** button narrows the scope of the view to only traffic associated with the _Allow_ action.

### Create a Magic Firewall rule from the applied filters

{{<Aside type="note">}}
This feature is only available for Magic Transit users.
{{</Aside>}}

You can create a [Magic Firewall](/magic-firewall/) rule that blocks all traffic matching the selected filters in Network Analytics. The currently supported filters are:

-   Destination IP
-   Protocol
-   Source data center
-   Source IP
-   TCP flags

Other types of Network Analytics filters will not be added to the new rule definition. However, you can further configure the rule in Magic Firewall.

Do the following:

1\. Apply one or more filters in Network Analytics.

2\. Click **Create Magic Firewall rule**. 

![Creating a Firewall Rule link in Network Analytics](/support/static/hc-dash-Network_Analytics-create_firewall_rule.png)

The Magic Firewall rule editor displays with the selected filters and values.

3\. Review the rule definition in the Magic Firewall rule editor.

4\. Click **Add new**.

### Supported filter fields, operators, and values 

The table below shows the range of fields, operators, and values you can use to filter Network Analytics.

| Field | Operators | Value |
| --- | --- | --- |
| Action | Equals<br/>Does not equal | **Allow:** Traffic allowed through Cloudflare's automated DDoS protection systems. May also include traffic mitigated by Firewall Rules, flowtrackd and L7 rules.<br/>**Block:** Traffic blocked by Cloudflare's automated DDoS protection systems.<br/>**Connection-tracking:** Applies only exclusively to L7, as Magic Transit is excluded from scope and no conntrack ever runs for Magic Transit prefixes.<br/>**Rate-limit:** Can be applied per source IP, subnet or any connection. The decision is made programmatically based on heuristics.<br/>**Monitor:** Attacks which were identified but have chosen to simply observe and not mitigate with any rule. |
| Attack ID | Equals<br/>Does not equal | Attack number |
| Attack Type | Equals<br/>Does not equal | UDP Flood<br/>SYN Flood<br/>ACK Flood<br/>RST Flood<br/>LDAP Flood<br/>Christmas Flood<br/>FIN Flood<br/>GRE Flood<br/>ICMP Flood |
| Destination IP | Equals<br/>Does not equal| IP address |
| Destination Port | Equals<br/>Does not equal<br/>Greater than<br/>Greater than or equals<br/>Less than<br/>Less than or equals | Port number Port range |
| Destination IP range | Equals Does not equal | IP range & mask |
| IP Version | Equals Does not equal | 4 or 6 |
| Protocol | Equals Does not equal | TCP<br/>UDP<br/>ICMP<br/>GRE |
| Source ASN | Equals Does not equal | AS Number |
| Source Country | Equals Does not equal | Country name |
| Source data center | Equals Does not equal | Data center location |
| Source IP | Equals Does not equal | IP address |
| Source port | Equals Does not equal<br/>Greater than<br/>Greater than or equals<br/>Less than<br/>Less than or equals | Port number<br/>Port range |
| TCP Flag | Equals<br/>Does not equal<br/>Contains | SYN, SYN-ACK, FIN, ACK, RST |

___

## Select a dimension to plot

You can plot Network Analytics data along a variety of dimensions. By default, Network Analytics displays data broken down by Action.

Select one of the **Summary** tabs to view the data along a different dimension.

![Visualizing data across multiple dimensions](/support/static/unnamed__1_.gif)

You can choose from these options: 

-   Action
-   Attack type
-   Destination IP
-   Destination port
-   IP version
-   Protocol
-   Source ASN
-   Source country
-   Source data center
-   Source IP
-   Source port
-   TCP flag

{{<Aside type="note">}}
Data for source ASN, source IP, source port, and TCP flag is only
available over the last 24 hours.
{{</Aside>}}

### Share Network Analytics filters 

When you add filters and specify a time range in the Network Analytics page, the URL changes to reflect those parameters.

To share your view of the data, copy the URL and send it to other users so that they can work with the same view.

![Selecting the URL of the Network Analytics page](/support/static/hc-dashboard-network-analytics-6.png)

___

## View the Activity log

The Network Analytics **Activity log** shows up to 500 log events in the currently selected time range, paginated with 10 results per page per time range view. (The [GraphQL Analytics API](/analytics/graphql-api/) does not have this limitation.) 

To display event details, click the expansion widget associated with the events.

### Configure columns

To configure which columns display in the Activity log, click the **Edit columns** button. 

This is particularly useful when you would like to identify a DDoS attack, during which you can specify the desired attributes such as IP addresses, max bit rate, and attack ID among others.

### View top items

The **Source Country,** **Source**, and **Destination** panels display the top items in each view.

To select the number of items to display, use the drop-down list associated with the view.

To review the top data centers, select _Data center_ from the drop-down list in the **Source country** view. The **Source data center** view replaces the **Source country** view.

___

## Export log data and reports

### Export activity log data 

You can export up to 500 raw events from the Activity log at a time. This option is useful when you need to combine and analyze Cloudflare data with data stored in a separate system or database, such as a security information and event management system (SIEM).

To export log data, click **Export**.

Choose either CSV or JSON format for rendering exported data. The downloaded file name will reflect the selected time range, using this pattern:

_network-analytics-attacks-\[start time\]-\[end time\].json_

### Export a Network Analytics report 

To print or download a snapshot report from **Network Analytics**, follow these steps:

Click **Print report**. Your web browser's print interface displays options for printing or saving as a PDF.

___

## Limitations

Network Analytics currently has these limitations:

-   Network Analytics v1 provides insights on [denial of service daemon (dosd)](https://blog.cloudflare.com/who-ddosd-austin/) attacks. Although it provides a timely view of the data, it does not have a complete view of all events. 
-   The following data sources are not available in Network Analytics v1:
    -   Firewall Rules _(available in Network Analytics v2)_
    -   Application layer rules
    -   Gatekeeper and manually applied rules
    -   [flowtrackd](https://blog.cloudflare.com/announcing-flowtrackd/) (Advanced TCP protection) _(available in Network Analytics v2)_
    -   WARP traffic and [Orange-clouded traffic](https://support.cloudflare.com/hc/en-us/articles/205177068)
-   Data from Cloudflare services that proxy traffic, such as CDN, is not available in Network Analytics.

___

## Related resources

-   [Cloudflare Network Analytics v2](/analytics/network-analytics/)
-   [Migrating from Network Analytics v1 to Network Analytics v2](/analytics/graphql-api/migration-guides/network-analytics-v2)
-   [Cloudflare GraphQL API](/analytics/graphql-api/)
-   [Cloudflare Analytics: a quick overview](https://support.cloudflare.com/hc/articles/360037684111)
-   [IANA port numbers and service names](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?&page=1)

___

## Frequently asked questions

### How long does Cloudflare retain data in the Network Analytics portal?

If you are using Network Analytics v2 (NAv2), the range of historical data you can query is **90 days**.

Network Analytics v1 (NAv1) uses GraphQL nodes to roll up data into 1 minute, 1 hour, and 1 day IP flows. For example, the ipFlows1mGroups node stores data in minute-wise aggregations.

To identify the range of historical data you can query in NAv1, refer to this table. Use the _**notOlderThan**_ column as an indicator of retention time.

| 
GraphQL data node

 | 

maxDuration\*

 | 

notOlderThan\*\*

 | 

time range selections in Network Analytics

 | 

Number of data points

 |
| --- | --- | --- | --- | --- |
| 

ipFlows1mGroups

 | 

25 hours

 | 

30 days

 | 

30 minutes

 | 

30

 |
| 

6 hours

 | 

71

 |
| 

12 hours

 | 

48

 |
| 

24 hours

 | 

96

 |
| 

ipFlows1dGroups

 | 

6 months

 | 

1 year

 | 

1 week

 | 

168

 |
| 

1 month

 | 

30

 |

_**\*maxDuration**_ _defines the time window that can be requested in one query (varies by data node)._

_**\*\*notOlderThan**_ _limits how far back in the record a query can search. It is indicative of how long the data stays in our database._ 

When working with attack logs in the dashboard, keep the following in mind:

-   Attack logs are stored with start and end timestamps, packet and bit statistics for minimum, maximum, and average data rate, as well as totals, attack type, and action taken. 
-   Source IP addresses are considered personally identifiable information. Therefore, Cloudflare only stores them for 30 days. After 30 days, source IP addresses are discarded, and the logs are rolled up first into 1-hour groups, then 1-day groups. The 1-hour rollups are stored for 6 month. The one day rollups are stored for 1 year.

For more information on querying and accessing log data, refer to the [GraphQL Analytics API](/analytics/graphql-api/limits). 

### Why does Network Analytics say the destination IP is “unavailable”?

The destination IP is indicated as _Unavailable_, when the destination IP was not included in the real-time signature generated by our [DDoS protection systems](https://blog.cloudflare.com/mitigating-a-754-million-pps-ddos-attack-automatically/). 

To view the destination IP, filter by **Attack ID** and scroll to the **Destination** section in the top items lists. When you filter on a specific Attack ID, the entire Network Analytics dashboard becomes an attack report.
