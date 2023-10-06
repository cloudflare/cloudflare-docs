---
pcx_content_type: reference
title: Device information
weight: 3
---

# Magic WAN Connector device information

Magic WAN Connector software is certified for use on the [Dell Networking Virtual Edge Platform](https://www.dell.com/support/home/en-us/product-support/product/dell-emc-networking-vep1445-vep1485/docs). It can be purchased with software pre-installed through our partner network for plug-and-play connectivity to Cloudflare One.

## Security and other information

- Cloudflare ensures the Magic WAN Connector device is secure and is not altered via TPM/Secure boot.
- Connectivity to the Cloudflare global network is secure and all traffic is encrypted through IPsec tunneling.
- The Magic WAN Connector does not support fail open.
- Customers have the ability to layer on additional security features/policies that are enforced at the Cloudflare network.

## Heartbeat

Magic WAN Connector communicates periodically with Cloudflare. This is also known as a heartbeat, and lets Cloudflare know that the Connector in question is connected to the Internet and reachable.

### Access Magic WAN Connector's heartbeat

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Find your Connector. Move your mouse over to the `i` icon right after the **Status** column. This will show a timestamp with the last time that specific Connector successfully contacted Cloudflare.

## Device metrics

Cloudflare customers can inspect metrics for a specific Magic WAN Connector in the Cloudflare dashboard. The Magic WAN Connector device metrics measured by Cloudflare include:

- Average CPU load
- Average temperature
- Average disk utilization
- Average memory utilization

To check for Connector metrics:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Select the Connector you want to check metrics for.
4. In the side panel that opens, scroll down to **​​Usage information**.

### Query metrics with GraphQL

Customers can query Cloudfare’s GraphQL API to fetch their Magic WAN Connector device metrics. The Cloudflare dashboard displays Magic WAN Connector device metrics over the past one hour. Via the GraphQL API, customers can query for up to 30 days of historical Magic WAN Connector device metrics.

For example:

```graphql
query GetResults($accountTag: string, $datetimeStart: string, $datetimeEnd: string) {
    viewer {
        accounts(filter: {accountTag: $accountTag}) {
            MagicWANConnectorMetricsAdaptiveGroups(
                limit: 100,
                filter: {
                    mconnInterfaceType: "system",
                    datetime_geq: $datetimeStart,
                    datetime_lt:  $datetimeEnd,
                }
            ){
                avg {
                    cpuTemperature
                    cpuLoadPercentage
                    diskUsagePercentage
                    memoryUsagePercentage
                }
                dimensions {
                    mconnInterfaceName
                }
            }
        }
    }
}
```

### Average CPU load explained

The metric `average CPU load` is unique and distinctly different from `CPU utilization` which is another common CPU metric. The Magic WAN connector uses a [Unix-style CPU load calculation](https://en.wikipedia.org/wiki/Load_(computing)).

CPU load is a measure of the number of processes that are currently running and that are waiting to be run on the CPU. Cloudflare collects the one minute load average from the device and converts that into a percentage based on the total number of cores in the CPU. If the Magic WAN Connector CPU has eight cores, and a one minute load average of two, then the average CPU load is 25%. If the average CPU load is above 100%, then there are processes in the queue that are waiting to be executed on the CPU.

Cloudflare is still evaluating the typical CPU load operating range on the MWAN Connector. In general, a healthy range for average CPU load on any device is between 30% and 70%. Customers may experience decreased MWAN Connector performance if the average CPU load is consistently above 100%. 