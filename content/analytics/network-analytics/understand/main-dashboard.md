---
title: Main dashboard
pcx_content_type: concept
weight: 3
meta:
  title: Network Analytics v2 main dashboard
---

# Main dashboard

The following sections are a guide on the different sections of the main Network Analytics dashboard.

## High-level metrics

The side panels in the Network Analytics page provide a summary of activity over the period selected in the timeframe drop-down list.

![Available high-level metrics in the Network Analytics dashboard.](/analytics/static/images/network-analytics/high-level-metrics.png)

Clicking one of the metrics in the sidebar will define the base unit (packets or bits) for the data displayed in the Network Analytics dashboard.

## Filters

Under **Network Analytics** you can apply filters to the data displayed in the dashboard.

You can filter by the following parameters:

- Mitigation action taken by Cloudflare
- Mitigation system that performed the action
- Source IP, port, ASN
- Destination IP, destination IP range (using `/24` prefixes), and destination port
- The Cloudflare data center city and country of where the traffic was observed
- TCP flag

## Packets summary or Bits summary

Displays a plot of the traffic (in terms of bits or packets) in the selected time range according to the values of a given dimension. By default, Network Analytics displays data broken down by **Action**.

### Available dimensions

You can choose one of the following dimensions:

- Action
- Destination IP
- Destination IP range
- Destination port
- Mitigation system
- Source ASN
- Source country
- Source data center
- Source IP
- Source port
- TCP flag

## Mitigation system distribution

The **Mitigation System Distribution** card displays the amount of traffic (in terms of packets or bits) that was mitigated by each mitigation system.

## Activity log

The Network Analytics **Activity log** shows up to 100 log events — including both allowed and dropped packets — in the currently selected time range, paginated with 10 results per page per time range view (the [GraphQL Analytics API](/analytics/graphql-api/) does not have this limitation).

To display event details, click the expansion widget associated with the events.

## Top items

The **Source country** / **Source data center**, **Source**, and **Destination** panels display the top items in each view.

To display the top data centers, select _Data center_ from the drop-down list in the **Source country** view. The **Source data center** view replaces the **Source country** view.

To select the number of items to display, use the drop-down list associated with the view.

## TCP flag

The **TCP Flag** panel displays the TCP flags set for all the traffic currently displayed in the dashboard, including both allowed and mitigated traffic.
