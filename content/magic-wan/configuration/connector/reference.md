---
pcx_content_type: reference
title: Reference
weight: 8
---

# Magic WAN Connector device information

Magic WAN Connector software is certified for use on the [Dell Networking Virtual Edge Platform](https://www.dell.com/support/home/en-us/product-support/product/dell-emc-networking-vep1445-vep1485/docs). It can be purchased with software pre-installed through our partner network for plug-and-play connectivity to Cloudflare One.

## Security and other information

- Cloudflare ensures the Magic WAN Connector device is secure and is not altered via TPM/Secure boot (does not apply to Virtual Connector).
- Connectivity to the Cloudflare global network is secure and all traffic is encrypted through {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} tunneling.
- The Magic WAN Connector does not support fail open.
- Customers have the ability to layer on additional security features/policies that are enforced at the Cloudflare network.

---

## ICMP traffic

{{<glossary-tooltip term_id="ICMP">}}ICMP traffic{{</glossary-tooltip>}} is routed through the Internet and bypasses [Cloudflare Gateway](/cloudflare-one/policies/gateway/). This enables you to ping resources on the Internet from the Magic WAN connector directly, which can be useful for debugging.

---

## VLAN ID

This feature allows you to have multiple [virtual LANs](https://www.cloudflare.com/learning/network-layer/what-is-a-lan/) (VLANs) configured over the same physical port on your Magic WAN Connector. VLAN tagging adds an extra header to packets in order to identify which VLAN the packet belongs to and to route it appropriately. This effectively allows you to run multiple networks over the same physical port.

A non-zero value set up for the VLAN ID field in your WAN/LAN is used to handle VLAN-tagged traffic. Cloudflare uses the VLAN ID to handle traffic coming into your Magic WAN Connector device, and applies a VLAN tag with the configured VLAN ID for traffic going out of your Connector through WAN/LAN.

You can setup VLAN IDs both for WAN and LAN. Refer to [Configure hardware connector](/magic-wan/configuration/connector/configure-hardware-connector/) or [Configure software connector](/magic-wan/configuration/connector/configure-virtual-connector/) to learn where you can set up VLAN IDs.

---

## Device metrics

Cloudflare customers can inspect metrics for a specific Magic WAN Connector in the Cloudflare dashboard. The Magic WAN Connector device metrics measured by Cloudflare include:

- Average CPU load
- Average temperature (this is always zero for Virtual Connector)
- Average disk utilization
- Average memory utilization

To check for Connector metrics:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Select the Connector you want to check metrics for.
4. In the side panel that opens, scroll down to **​​Usage information**.

### Query metrics with GraphQL

Customers can query Cloudflare’s GraphQL API to fetch their Magic WAN Connector device metrics. The Cloudflare dashboard displays Magic WAN Connector device metrics over the past one hour. Via the GraphQL API, customers can query for up to 30 days of historical Magic WAN Connector device metrics.

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